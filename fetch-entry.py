#!/usr/bin/env python3
"""
fetch-entry.py  -  draft a cookies.js / pets.js / treasures.js entry from the Cookie Run Wiki.

Usage:
    python fetch-entry.py cookie   "Allulose Nova Cookie"
    python fetch-entry.py pet      "Grand Beehive"
    python fetch-entry.py treasure "Noble Crown of Allulose"

Options:
    --file page.html   parse a saved copy of the main page instead of downloading it
    --refresh          ignore the .cache/ folder and download again
    --force            overwrite an existing entry file in database/
    --debug            also write .cache/<page>.blocks.txt (what the script "saw") - send me that if a section comes out empty

Output: database/<cookies|pets|treasures>/<id>.json  (a finished entry file; nothing to paste).
        An existing entry is never overwritten: the new one goes to drafts/ instead (use --force to overwrite).
        If there is no database/ folder yet, it goes to drafts/. Then run:  python build-database.py
Levels the wiki skips are calculated (equal steps between the levels it shows); level-up rewards, the first 3 affection tiers and
the candy name follow the rules/paths found in your own data files. Anything else the wiki lacks (emoji, ...) is left out.
Needs Python 3.8+, no extra packages. Pages are cached in .cache/ and requests are spaced 1 s apart.
Wiki text is CC BY-SA (cookierun.wiki); images belong to the game's publisher.
"""
import json, os, re, sys, time, urllib.parse, urllib.request, urllib.error
from decimal import Decimal, ROUND_HALF_UP
from fractions import Fraction
from html.parser import HTMLParser

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE, OUT = os.path.join(HERE, ".cache"), os.path.join(HERE, "drafts")
BASE = "https://cookierun.wiki/w/"
UA = "Mozilla/5.0 (compatible; personal-archive-fetcher)"
RAR = {"legendary": "legendary", "epic": "epic", "rare": "rare", "common": "common", "special": "special", "teenieping": "teenieping",
       "the powerpuff girls": "ppg", "powerpuff girls": "ppg", "sanrio characters": "sanrio", "sanrio": "sanrio"}
TIER = {"legendary": "legendary", "champion": "champion", "super epic": "superepic", "epic": "epic", "rare": "rare", "common": "common"}
RELT = ["Friendly", "Family", "Trust", "Admiration", "Tension", "Rival"]
ORDER = {
    "cookie": ["id","name","rarity","released","illust","jelly","img","emoji","avatar","tags","bonus","levels","skillFull","story","quote","quotes","affection","relations","costumes","combi","candy"],
    "pet": ["id","name","rarity","released","emoji","img","tags","bonus","levels","skillFull","story","combi","costumes"],
    "treasure": ["id","name","rarity","released","emoji","img","avatar","tags","bonus","skillFull","levels","story","combi","enhancements"],
}
NOTES = []
DEFLV = {"cookie": 15, "pet": 15, "treasure": 12}
BIGTIERS = ("superepic", "champion", "legendary")  # costume illustrations are only kept for these
COSORDER = ["name", "img", "illust", "desc", "bonus", "released", "quotes", "tier", "emoji", "info", "equipped"]

# ------------------------------------------------------------------ HTML -> blocks
VOID = {"br", "img", "hr", "input", "meta", "link", "wbr", "col", "source", "area", "base", "param"}
SKIPC = ("navbox", "toc", "mw-editsection", "catlinks", "printfooter", "mw-jump-link", "reference")


def fin(c):
    ls = [re.sub(r"[ \t\xa0]+", " ", l).strip() for l in c["t"].split("\n")]
    c["t"] = "\n".join(l for l in ls if l)
    return c


class Doc(HTMLParser):
    """Turns the page into a flat list: heading / paragraph / list item / table (rows of cells)."""
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.blocks, s.stack, s.tables, s.sinks = [], [], [], []
        s.skip, s.cstart, s.done, s.imp, s.title, s.in_title = 0, None, False, None, "", False
        s.bold = s.alink = None

    live = property(lambda s: s.cstart is not None and not s.done and not s.skip)
    cell = staticmethod(lambda: {"t": "", "b": [], "im": [], "a": [], "th": False, "cs": 1})

    def top(s):
        if s.sinks: return s.sinks[-1][2]
        if s.imp is None: s.imp = s.cell()
        return s.imp

    def flush(s):
        if s.imp is not None:
            c, s.imp = fin(s.imp), None
            if c["t"] or c["im"]: s.blocks.append({"k": "p", "c": c})

    def intd(s): return any(k[0] == "td" for k in s.sinks)

    def pop_sink(s, kind):
        if s.sinks and s.sinks[-1][0] == kind:
            k, lv, c = s.sinks.pop(); c = fin(c)
            if k == "h": s.blocks.append({"k": "h", "lv": lv, "t": re.sub(r"\s*\[edit\]", "", c["t"].replace("\n", " ")).strip()})
            elif k in ("p", "li"): s.blocks.append({"k": k if k == "li" else "p", "c": c})
            return c
        return None

    def handle_starttag(s, tag, attrs):
        a = dict(attrs); cls = a.get("class") or ""
        if tag == "title": s.in_title = True
        if tag not in VOID:
            sk = any(x in cls for x in SKIPC) or a.get("id") in ("toc", "catlinks")
            s.stack.append((tag, sk)); s.skip += sk
            if a.get("id") == "mw-content-text" and s.cstart is None: s.cstart = len(s.stack)
        if not s.live: return
        if tag == "br": s.top()["t"] += "\n"; return
        if tag == "img": s.top()["im"].append((a.get("alt", ""), a.get("src") or a.get("data-src") or "")); return
        if tag in ("b", "strong"): s.bold = []
        elif tag == "a": s.alink = [a.get("href", ""), ""]
        elif tag == "table": s.flush(); s.tables.append({"rows": [], "row": None})
        elif tag == "tr" and s.tables: s.flush(); s.tables[-1]["row"] = []
        elif tag in ("td", "th") and s.tables:
            c = s.cell(); c["th"] = tag == "th"
            try: c["cs"] = int(a.get("colspan", 1))
            except ValueError: pass
            s.sinks.append(["td", 0, c])
        elif re.fullmatch(r"h[1-6]", tag):
            if s.intd(): s.top()["t"] += "\n"
            else: s.flush(); s.sinks.append(["h", int(tag[1]), s.cell()])
        elif tag in ("p", "li", "div", "ul", "ol", "dd", "dt", "section", "blockquote"):
            if s.intd(): s.top()["t"] += "\n"
            else:
                if tag in ("p", "li"):
                    s.pop_sink("p"); s.pop_sink("li"); s.flush(); s.sinks.append([tag, 0, s.cell()])
                else: s.flush()

    def handle_endtag(s, tag):
        if tag == "title": s.in_title = False
        was = s.live
        if any(t == tag for t, _ in s.stack):
            while True:
                t, sk = s.stack.pop(); s.skip -= sk
                if t == tag: break
        if s.cstart is not None and len(s.stack) < s.cstart: s.done = True
        if not was: return
        if tag in ("b", "strong") and s.bold is not None:
            t = " ".join(s.bold).strip()
            if t: s.top()["b"].append(t)
            s.bold = None
        elif tag == "a" and s.alink:
            s.top()["a"].append((s.alink[1].strip(), s.alink[0])); s.alink = None
        elif tag in ("td", "th") and s.tables:
            c = s.pop_sink("td")
            if c is not None and s.tables[-1]["row"] is not None: s.tables[-1]["row"].append(c)
        elif tag == "tr" and s.tables:
            t = s.tables[-1]
            if t["row"] is not None: t["rows"].append(t["row"]); t["row"] = None
        elif tag == "table" and s.tables:
            s.flush(); s.blocks.append({"k": "table", "rows": s.tables.pop()["rows"]})
        elif re.fullmatch(r"h[1-6]", tag): s.pop_sink("h")
        elif tag in ("p", "li"): s.pop_sink(tag)
        elif tag in ("div", "ul", "ol", "dd", "dt", "section", "blockquote") and not s.intd(): s.flush()

    def handle_data(s, data):
        if s.in_title: s.title += data
        if not s.live: return
        t = re.sub(r"\s+", " ", data)
        s.top()["t"] += t
        if s.bold is not None: s.bold.append(t.strip())
        if s.alink: s.alink[1] += t


def parse(html):
    d = Doc(); d.feed(html); d.close(); d.flush()
    return d.blocks, re.sub(r"\s+", " ", d.title).strip()


def dump(blocks, path):
    with open(path, "w", encoding="utf-8") as f:
        for b in blocks:
            if b["k"] == "h": f.write(f"\n{'#' * b['lv']} {b['t']}\n")
            elif b["k"] == "table":
                f.write("[table]\n")
                for r in b["rows"]: f.write("   | " + " | ".join(("<th>" if c["th"] else "") + c["t"].replace("\n", " / ")[:90] for c in r) + "\n")
            else: f.write(f"[{b['k']}] {b['c']['t'].replace(chr(10), ' / ')[:140]}   {[i[0] for i in b['c']['im']][:3]}\n")


# ------------------------------------------------------------------ helpers
def slug(s):
    s = re.sub(r"/OvenBreak.*$", "", s).replace("_", " ").lower()
    return re.sub(r"[^a-z0-9]+", "-", re.sub(r"\s+cookie$", "", s)).strip("-")


def full(src):
    if src.startswith("//"): src = "https:" + src
    m = re.match(r"(https?://[^?#]*?/images)/thumb/(\w/\w\w/[^/]+)/[^/]+$", src)
    return f"{m.group(1)}/{m.group(2)}" if m else src


def num(s):
    try: return int(re.sub(r"[^\d]", "", s))
    except ValueError: return 0


def cells(b):
    if b["k"] == "table": return [c for r in b["rows"] for c in r]
    return [b["c"]] if "c" in b else []


def imgs(bl):
    return [full(src) for b in bl for c in cells(b) for _, src in c["im"] if src]


def first_img(bl, *needles, avoid=()):
    for u in imgs(bl):
        l = u.lower()
        if all(n in l for n in needles) and not any(a in l for a in avoid): return u
    return ""


def sect(bl, rx):
    """blocks under the first heading matching rx, up to the next heading of the same or higher level."""
    for i, b in enumerate(bl):
        if b["k"] == "h" and re.search(rx, b["t"], re.I):
            out = []
            for x in bl[i + 1:]:
                if x["k"] == "h" and x["lv"] <= b["lv"]: break
                out.append(x)
            return b["lv"], out
    return None, []


def lead(bl):
    """blocks before the next heading (the text directly under a heading)."""
    out = []
    for b in bl:
        if b["k"] == "h": break
        out.append(b)
    return out


def paras(bl): return [b["c"]["t"].replace("\n", " ") for b in bl if b["k"] == "p" and b["c"]["t"]]


def level_tables(bl):
    res = []
    for b in bl:
        if b["k"] != "table": continue
        for i, r in enumerate(b["rows"]):
            tx = [c["t"].strip().lower() for c in r]
            if "level" in tx and any(t.startswith("skill") for t in tx):
                res.append((b, i, tx)); break
    return res


def read_levels(tbl, hi, energy):
    rows, out = tbl["rows"], []
    for r in rows[hi + 1:]:
        t = [c["t"].strip() for c in r]
        if len(t) < 2 or not re.fullmatch(r"\d+", t[0]): continue
        o = {"lv": int(t[0])}
        if energy and len(t) >= 3: o["energy"] = num(t[1]); o["desc"] = t[2]
        else: o["desc"] = t[-1]
        out.append(o)
    desc = ""
    for r in rows[:hi]:
        for c in r:
            if len(c["t"]) > len(desc) and not re.search(r"skill$", c["t"].strip(), re.I): desc = c["t"].replace("\n", " ")
    return out, desc


def tier_of(txt):
    t = txt.lower().strip()
    return TIER.get(t) or next((v for k, v in TIER.items() if k in t), "")


# ------------------------------------------------------------------ extraction
TOK = re.compile(r"""(?P<c>//[^\n]*|/\*.*?\*/)|(?P<s>"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(?P<k>[A-Za-z_$][\w$]*)(?=\s*:)|(?P<w>\s+|[A-Za-z_$][\w$]*|[^\sA-Za-z_$"'`/]+|/)""", re.S)


def load_js(path):
    """Read one of your data files (window.X = [ ... ]) into Python lists/dicts."""
    if not os.path.exists(path): return []
    t = open(path, encoding="utf-8").read()
    m = re.search(r"=\s*\[", t)
    if not m: return []
    t, out = t[m.end() - 1: t.rfind("]") + 1], []
    for m in TOK.finditer(t):
        if m.group("c"): continue
        if m.group("s"):
            s = m.group("s").replace("\\'", "'")
            out.append(s if s[0] == '"' else json.dumps(s[1:-1]))
        elif m.group("k"): out.append(json.dumps(m.group("k")))
        else: out.append(m.group("w"))
    try: return json.loads(re.sub(r",(\s*[}\]])", r"\1", "".join(out)), strict=False)
    except ValueError as ex:
        print(f"  ! could not read {os.path.basename(path)} ({ex}); rewards/affection will not be copied"); return []


def entries(folder):
    """All existing entries of one type: database/<folder>/*.json, or the old <folder>.js file."""
    d = os.path.join(HERE, "database", folder)
    if os.path.isdir(d):
        out = []
        for fn in sorted(os.listdir(d)):
            if fn.endswith(".json") and not fn.startswith("_"):
                try: out.append(json.load(open(os.path.join(d, fn), encoding="utf-8")))
                except ValueError: print(f"  ! {fn} is not valid JSON - ignored")
        return out
    return load_js(os.path.join(HERE, folder + ".js"))


def reference():
    """Level-up reward paths per rarity, level counts and the shared affection tiers, taken from YOUR data files."""
    ref = {"lv": {}, "n": {}, "cand": {}, "n_cand": 5, "aff3": [], "names": {}}
    for kind, folder in (("cookie", "cookies"), ("pet", "pets"), ("treasure", "treasures")):
        for e in entries(folder):
            lv, r = e.get("levels") or [], e.get("rarity")
            if lv:
                ref["n"].setdefault(kind, len(lv)); ref["lv"].setdefault((kind, r), [l.get("reward") for l in lv])
            cd = e.get("candy") or {}
            if cd.get("levels"): ref["n_cand"] = len(cd["levels"]); ref["cand"].setdefault(r, [l.get("reward") for l in cd["levels"]])
            if kind == "cookie":
                af = e.get("affection") or []
                if not ref["aff3"] and len(af) >= 3: ref["aff3"] = af[:3]
                for a in af: ref["names"].setdefault(a.get("n"), a.get("name"))
    return ref


NUM = re.compile(r"\d+(?:,\d{3})*(?:\.\d+)?")


def lerp_num(x, y, t):
    """One number, t = how far (0..1) from x to y; nearest rounding, same decimals/commas as the wiki text."""
    a, b = Decimal(x.replace(",", "")), Decimal(y.replace(",", ""))
    dec = max(len(s.split(".")[1]) if "." in s else 0 for s in (x, y))
    v = (a + (b - a) * Decimal(t.numerator) / Decimal(t.denominator)).quantize(Decimal(1).scaleb(-dec), rounding=ROUND_HALF_UP)
    s = f"{v:,.{dec}f}" if ("," in x or "," in y) else f"{v:.{dec}f}"
    return re.sub(r"\.0+$", "", s)  # 48.0 -> 48, like your data


def lerp_desc(a, b, lv):
    """a, b = (level, text) pairs with the same wording; numbers that differ grow in equal steps."""
    (la, ta), (lb, tb) = a, b
    na, nb = NUM.findall(ta), NUM.findall(tb)
    if NUM.sub("#", ta) != NUM.sub("#", tb): return None
    parts = NUM.sub("\0", ta).split("\0")
    t = Fraction(lv - la, lb - la)
    out = [x if x == y else lerp_num(x, y, t) for x, y in zip(na, nb)]
    return "".join(s + (out[i] if i < len(out) else "") for i, s in enumerate(parts))


def complete(known, total, energy, rewards):
    """Fill every level 1..total from the levels the wiki shows (needs 2+). Adds your rarity reward path."""
    known = sorted(known, key=lambda k: k["lv"])
    total = max(total, known[-1]["lv"]) if known else total
    def rw(o):
        if rewards and o["lv"] <= len(rewards) and rewards[o["lv"] - 1]: o["reward"] = rewards[o["lv"] - 1]
        return o
    if len(known) < 2: return [rw(dict(k)) for k in known], f"only {len(known)} level found on the wiki, so nothing was calculated"
    have, out = {k["lv"]: k for k in known}, []
    for lv in range(1, total + 1):
        if lv in have: out.append(rw(dict(have[lv]))); continue
        i = next((i for i in range(len(known) - 1) if known[i]["lv"] < lv < known[i + 1]["lv"]), 0 if lv < known[0]["lv"] else len(known) - 2)
        a, b = known[i], known[i + 1]
        d = lerp_desc((a["lv"], a["desc"]), (b["lv"], b["desc"]), lv)
        if d is None: return [rw(dict(k)) for k in known], "level texts differ in wording, so nothing was calculated"
        o = {"lv": lv}
        if energy and "energy" in a and "energy" in b: o["energy"] = int((Fraction(a["energy"]) + Fraction(b["energy"] - a["energy"]) * Fraction(lv - a["lv"], b["lv"] - a["lv"])).__add__(Fraction(1, 2)).__floor__())
        o["desc"] = d; out.append(rw(o))
    return out, f"{len(known)} level(s) read from the wiki, {total - len(known)} calculated in equal steps (point values come out exact; small counters, % and Energy numbers can be off by one step, and skills that cap or jump are not straight lines)"


def combi_of(bl, kind):
    out = []
    for i, b in enumerate(bl):
        if b["k"] == "h" and "combi" in b["t"].lower():
            typ = "pet" if "pet" in b["t"].lower() else "cookie" if "cookie" in b["t"].lower() else "treasure" if "treasure" in b["t"].lower() else {"cookie": "pet", "pet": "cookie", "treasure": "cookie"}[kind]
            for x in bl[i + 1:]:
                if x["k"] == "h": break
                if x["k"] in ("p", "li"):
                    c = x["c"]; nm = next((t for t, _ in c["a"] if t), "")
                    if nm: out.append({"type": typ, "id": slug(nm), "desc": c["t"].replace(nm, "", 1).strip(" \n:").replace("\n", " ")})
    return out


KNOWN = {"new", "cookie info & loading", "tired", "pre-pull", "daily reward", "tap", "gift", "trial info", "new cookie cup end", "conditional"}


def gift_label(lbl):
    """Gift rows are fixed: Neutral / Given <u></u> (ingredient name left blank for you) / Given <u>Royal Golden Dough</u>."""
    l = lbl.strip()
    if re.match(r"neutral", l, re.I): return "Neutral"
    if "royal golden dough" in l.lower(): return "Given <u>Royal Golden Dough</u>"
    if re.match(r"given", l, re.I): return "Given <u></u>"
    return l


def parse_quotes(bl, cosnames):
    """Quotes tab -> (base groups, {costume name: groups}, [headings that matched no costume]).
    Section titles = rows with ONE non-empty cell that is a header cell or a known title; every other row is quote text."""
    base, cos, unmatched, target, grp, have_base = [], {}, [], None, None, False
    for b in bl:
        if b["k"] == "h":
            if b["lv"] <= 2:
                grp = None
                t = re.sub(r"^(.+?)\s+\1$", r"\1", b["t"].strip())  # "X X" -> "X"
                m = max((n for n in cosnames if n.lower() in t.lower()), key=len, default=None)
                if m: target = cos.setdefault(m, [])
                elif re.search(r"base", t, re.I) or (not have_base and not re.fullmatch(r"(ingredients|contents)", t, re.I)):
                    target, have_base = base, True
                else: target = cos.setdefault("?" + t, []); unmatched.append(t)  # never merged into the base quotes
            elif target is not None: grp = {"title": b["t"], "secs": []}; target.append(grp)
        elif b["k"] == "table" and target is not None:
            if grp is None: grp = {"title": "General", "secs": []}; target.append(grp)
            sec = None
            for r in b["rows"]:
                ne = [c["t"].strip().replace("\n", " ") for c in r if c["t"].strip()]
                if not ne: continue
                if len(ne) == 1 and (any(c["th"] for c in r) or ne[0].lower() in KNOWN or ne[0].lower().startswith("conditional")):
                    sec = {"title": re.sub(r"\s*\(.*$", "", ne[0]).strip(), "lines": [], "rows": []}; grp["secs"].append(sec); continue
                if sec is None: sec = {"title": grp["title"], "lines": [], "rows": []}; grp["secs"].append(sec)
                st = sec["title"].lower()
                if st.startswith("conditional"): continue  # lobby-condition quotes are not kept
                if st == "gift" and len(ne) >= 2: sec["rows"].append({"label": gift_label(ne[0]), "text": ne[1]})
                elif st == "new cookie cup end": sec["lines"] += [t for t in ne if not re.fullmatch(r"[?\s*]*", t)]  # blank / ? / ?? / ??? = skip this title
                else: sec["lines"] += ne  # (placeholder ??? lines elsewhere are kept, like in your data)
    def clean_g(gs):
        out = []
        for g in gs:
            secs = [{k: v for k, v in s.items() if k == "title" or v} for s in g["secs"] if not s["title"].lower().startswith("conditional") and (s["lines"] or s["rows"])]
            if secs: out.append({"title": g["title"], "sections": secs})
        return out
    return clean_g(base), {k: clean_g(v) for k, v in cos.items() if not k.startswith("?")}, unmatched


def extract(kind, bl, title, name, gal, cbl, qbl, ref):
    e, rep = {}, []
    t0 = re.split(r"\s+[|\u2013-]\s+", title)
    nm = t0[0] if t0[0].lower() != "ovenbreak" or len(t0) < 2 else t0[1]
    e["name"] = nm or name; e["id"] = slug(e["name"])
    r = ""
    for b in bl[:15]:
        for c in cells(b):
            for alt, _ in c["im"]:
                r = r or RAR.get(alt.lower().strip(), "")
    if not r:
        m = re.search(r"\bis an? (legendary|epic|rare|common|special)\b", " ".join(paras(bl)[:4]), re.I)
        r = m.group(1).lower() if m else ""
    e["rarity"] = r or ""
    rep.append(("rarity", bool(r)))
    tags = []
    for b in bl:
        for c in cells(b):
            for t, h in c["a"]:
                m = re.match(r"^[\uff03#]\s*(\S.*)$", t)
                if m and "Category:" in h and m.group(1) not in tags: tags.append(m.group(1))
    e["tags"] = tags
    _, rel = sect(bl, r"release date")
    rd = next(iter(paras(rel) or [c["t"] for b in rel for c in cells(b) if c["t"]]), "")
    e["released"] = re.sub(r"\s*\(.*?\)", "", rd).strip()
    rep.append(("release date", bool(e["released"])))
    e["img"] = first_img(bl[:25], "crob_standard_") or first_img(bl[:25], avoid=("icon", "_head_", "rarit"))
    if kind == "cookie": e["illust"] = first_img(bl[:25], "crob_illustration_")
    _, st = sect(bl, r"^story$")
    e["story"] = "\n\n".join(paras(lead(st)))
    rep.append(("story", bool(e["story"])))
    _, jl = sect(bl, r"affection jelly")
    if kind == "cookie" and (jl or gal):
        e["jelly"] = {"img": first_img(jl + gal, "affection_jelly"), "story": " ".join(paras(jl))}
    lts, cand = level_tables(bl), None
    if kind == "cookie":
        main = next((x for x in lts if "energy" in x[2]), None)
        cand = next((x for x in lts if x is not main and "energy" not in x[2]), None)
    else: main = lts[0] if lts else None
    if main:
        lv, desc = read_levels(main[0], main[1], kind == "cookie")
        e["levels"], note = complete(lv, ref["n"].get(kind) or DEFLV[kind], kind == "cookie", ref["lv"].get((kind, e["rarity"])))
        e["skillFull"] = desc; NOTES.append("levels: " + note)
        if not ref["lv"].get((kind, e["rarity"])): NOTES.append(f"no level-up reward path for {e['rarity']} {kind}s in your data files, so rewards were left out")
    rep.append(("levels", bool(main)))
    if kind == "cookie":
        cd = {}
        if cand:
            lv, desc = read_levels(cand[0], cand[1], False)
            cd["img"] = first_img([cand[0]], "magic_candy", avoid=("ingredient",)) or first_img(bl, "magic_candy_", avoid=("ingredient",))
            cd["levels"], note = complete(lv, ref["n_cand"], False, ref["cand"].get(e["rarity"]))
            cd["skillFull"] = desc; NOTES.append("candy levels: " + note)
        ing = first_img(gal, "magic_candy_ingredient")
        if ing:
            cap = next((b["c"]["t"].split("\n")[0].strip() for b in gal if b["k"] != "h" and "c" in b and any("magic_candy_ingredient" in s.lower() for _, s in b["c"]["im"]) and b["c"]["t"].strip()), "")
            cd["ingredient"] = {"img": ing, **({"name": cap} if cap else {})}
        if cd:
            cd["emoji"] = "\U0001f36c"; e["candy"] = cd
            cd["name"] = re.sub(r"\s+Cookie$", "", e["name"]) + " Cookie's Magic Candy"
        rep.append(("magic candy", bool(cand)))
        av = [u for u in imgs(gal) if "/crob_head_" in u.lower()]
        if av: e["avatar"] = av[0]
        names, aff = ref["names"], []
        _, ab = sect(bl, r"^affection$")
        for ln in "\n".join(c["t"] for b in ab for c in cells(b)).split("\n"):
            m = re.match(r"^(.*?)\s*\(\s*([\d,]+)\s*\)\s*$", ln.strip())
            if m: n = num(m.group(2)); aff.append({k: v for k, v in (("n", n), ("name", names.get(n, "")), ("bonus", m.group(1).strip())) if v != ""})
        got = {a["n"] for a in ref["aff3"]}
        e["affection"] = [dict(a) for a in ref["aff3"]] + sorted((a for a in aff if a["n"] not in got), key=lambda a: a["n"])
        if not ref["aff3"]: NOTES.append("first 3 affection tiers not found in your cookies.js, so they were left out")
        rep.append(("affection", bool(aff)))
        _, rc = sect(bl, r"^relationship chart$")
        rels = []
        for b in lead(rc):
            if b["k"] != "li": continue
            c = b["c"]; who = next((t for t, _ in c["a"] if t), "")
            if not who: continue
            href = next((h for t, h in c["a"] if t == who), "")
            typ = next((x for x in reversed(c["b"]) if x in RELT), "") or next((x for x in RELT if c["t"].endswith(x)), "")
            txt = c["t"].replace("\n", " ")
            txt = re.sub(r"^\s*" + re.escape(who) + r"\s*:\s*", "", txt)
            if typ: txt = re.sub(r"\s*" + typ + r"\s*$", "", txt)
            rels.append({"who": who, "id": slug(urllib.parse.unquote(href.split("/w/")[-1])) if "/w/" in href else slug(who), "text": txt.strip(), "type": typ})
        e["relations"] = rels
        rep.append(("relations", bool(rels)))
    cb = combi_of(bl, kind)
    if cb: e["combi"] = cb; e["bonus"] = True
    rep.append(("combi", bool(cb)))
    # costumes (cookies + pets)
    cos = []
    if kind in ("cookie", "pet"):
        _, cs = sect(bl, r"^costumes$"); tier = ""
        for b in cs:
            if b["k"] == "h": tier = tier_of(b["t"])
            elif b["k"] == "li" and b["c"]["t"]: cos.append({"name": b["c"]["t"].split("\n")[0].strip(), "tier": tier})
        us = lambda s: re.sub(r"[^a-z0-9]+", "_", s.lower()).strip("_")
        allimg = imgs(cbl) + imgs(gal)
        for c in cos:
            _, sc = sect(cbl, "^" + re.escape(c["name"]) + "$")
            sc = sc or cbl
            _, sy = sect(sc, r"^story$")
            c["info"] = "\n\n".join(paras(lead(sy))) or (max(paras(lead(sc)) or [""], key=len) if len(cos) == 1 else "")
            mine = [u for u in allimg if us(c["name"]) in u.lower() and "_head_" not in u.lower()]
            c["img"] = next((u for u in mine if "illustration" not in u.lower()), "")
            ill = next((u for u in mine if "illustration" in u.lower()), "")
            if ill and kind == "cookie" and c["tier"] in BIGTIERS: c["illust"] = ill
        rep.append(("costumes", bool(cos)))
        if qbl:
            base, cq, unm = parse_quotes(qbl, [c["name"] for c in cos])
            e["quotes"] = base
            gen = next((g for g in base if g["title"].lower() == "general"), base[0] if base else None)
            nw = next((s for s in gen["sections"] if s["title"].lower() == "new"), None) if gen else None
            s0 = nw or (gen["sections"][0] if gen else None)
            e["quote"] = (s0.get("lines") or [""])[0] if s0 else ""
            for c in cos:
                if cq.get(c["name"]): c["quotes"] = cq[c["name"]]
            NOTES.append(f"quotes: {sum(len(g['sections']) for g in base)} base sections; costume quotes found for {sum(1 for c in cos if c.get('quotes'))} of {len(cos)} costume(s)" + (f"; headings matching no costume (not added): {unm}" if unm else ""))
            rep.append(("quotes", bool(base)))
        d = {"name": e["name"], "img": e.get("img", ""), "desc": "Default Costume", "tier": "default", "equipped": True}
        e["costumes"] = [d] + cos
    if kind == "treasure":
        _, en = sect(bl, r"enhance")
        rows = [[c["t"].strip() for c in r] for b in en if b["k"] == "table" for r in b["rows"]]
        enh = [{"lv": int(r[0]), "effect": r[-1]} for r in rows if len(r) >= 2 and re.fullmatch(r"\d+", r[0])]
        if enh: e["enhancements"] = enh
        rep.append(("enhancements", bool(enh)))
    return e, rep


# ------------------------------------------------------------------ output
def ser(v, d=0):
    p, q = "  " * (d + 1), "  " * d
    if isinstance(v, list):
        if not v: return "[]"
        if all(not isinstance(x, (dict, list)) for x in v): return "[" + ", ".join(js(x) for x in v) + "]"
        return "[\n" + "".join(p + ser(x, d + 1) + ",\n" for x in v) + q + "]"
    if isinstance(v, dict):
        return "{\n" + "".join(p + (k if re.fullmatch(r"[A-Za-z_]\w*", k) else js(k)) + ": " + ser(x, d + 1) + ",\n" for k, x in v.items()) + q + "}"
    return js(v)


def js(x):
    import json
    return "true" if x is True else "false" if x is False else json.dumps(x, ensure_ascii=False)


def prune(o, order):
    out = {}
    for k in order:
        v = o.get(k)
        if v in (None, "", False, [], {}): continue
        out[k] = v
    return out


FOLDER = {"cookie": "cookies", "pet": "pets", "treasure": "treasures"}


def entry_obj(kind, e):
    e = dict(e)
    if "costumes" in e: e["costumes"] = [prune(c, COSORDER) for c in e["costumes"]]
    if "jelly" in e: e["jelly"] = prune(e["jelly"], ["img", "story"])
    if "candy" in e:
        c = e["candy"]; e["candy"] = prune({**c, "ingredient": prune(c.get("ingredient", {}), ["name", "img", "text"])}, ["name", "img", "levels", "ingredient", "skillFull", "emoji"])
    return prune(e, ORDER[kind])


# ------------------------------------------------------------------ network
def fetch(title, refresh=False):
    os.makedirs(CACHE, exist_ok=True)
    cf = os.path.join(CACHE, re.sub(r"[^A-Za-z0-9._-]", "_", title) + ".html")
    if os.path.exists(cf) and not refresh: return open(cf, encoding="utf-8").read()
    url = BASE + urllib.parse.quote(title.replace(" ", "_"), safe="/:()',!")
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30) as r: txt = r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as ex:
        if ex.code == 404: return None
        raise
    open(cf, "w", encoding="utf-8").write(txt); time.sleep(1)
    return txt


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]
    fi = sys.argv.index("--file") if "--file" in sys.argv else -1
    if fi >= 0 and fi + 1 < len(sys.argv): args = [a for a in args if a != sys.argv[fi + 1]]
    if len(args) < 2 or args[0] not in ORDER:
        print(__doc__); return 1
    kind, name = args[0], args[1]
    refresh, debug = "--refresh" in flags, "--debug" in flags
    base = name if "/OvenBreak" in name else name + "/OvenBreak"
    html, used = None, base
    if fi >= 0: html = open(sys.argv[fi + 1], encoding="utf-8").read()
    else:
        for t in ([base] if kind == "cookie" else [base, name]):
            try: html = fetch(t, refresh)
            except (urllib.error.URLError, OSError) as ex:
                print(f"Could not reach the wiki ({ex}). Check your internet connection, or save the page as HTML and use --file."); return 1
            if html and "mw-content-text" in html: used = t; break
    if not html: print(f"Could not find a page for '{name}'. Check the spelling, or save the page as HTML and use --file."); return 1
    bl, title = parse(html)
    if debug: os.makedirs(CACHE, exist_ok=True); dump(bl, os.path.join(CACHE, "main.blocks.txt"))
    sub = {}
    if fi < 0:
        for s in (["Gallery", "Costumes", "Quotes"] if kind == "cookie" else ["Costumes"] if kind == "pet" else []):
            try: h = fetch(used + "/" + s, refresh)
            except Exception as ex: h = None; print(f"  ! {s}: {ex}")
            sub[s] = parse(h)[0] if h else []
            if debug and sub[s]: dump(sub[s], os.path.join(CACHE, s.lower() + ".blocks.txt"))
            if not h: print(f"  (no {s} subpage)")
    e, rep = extract(kind, bl, title, name, sub.get("Gallery", []), sub.get("Costumes", []), sub.get("Quotes", []), reference())
    folder = os.path.join(HERE, "database", FOLDER[kind])
    path = os.path.join(folder, e["id"] + ".json") if os.path.isdir(folder) else os.path.join(OUT, f"{kind}-{e['id']}.json")
    if os.path.exists(path) and "--force" not in flags:
        path = os.path.join(OUT, f"{kind}-{e['id']}.json")
        print(f"  note: '{e['id']}' already exists in database/ - not overwritten; the new version is saved as {os.path.relpath(path, HERE)}")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "w", encoding="utf-8", newline="\n").write(json.dumps(entry_obj(kind, e), ensure_ascii=False, indent=2) + "\n")
    print(f"\nEntry written: {os.path.relpath(path, HERE)}\n")
    for k, ok in rep: print(f"  {'ok     ' if ok else 'MISSING'}  {k}")
    for n in NOTES: print("  note:", n)
    print("\nNot on the wiki (fill in yourself): emoji" + (", ingredient text (and name if the Gallery has no caption), costume release dates" if kind == "cookie" else ""))
    print("Check by eye: tags spelling, combo type, quote groups/labels, and any skill whose growth is not a straight line.")
    print("Then run download-images.py to fetch the images, and build-database.py to update the website files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())