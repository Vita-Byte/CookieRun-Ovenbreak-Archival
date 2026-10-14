#!/usr/bin/env python3
"""
find-missing.py  -  list everything that is still missing in your database, in one text report.

Checks every file in database/cookies, database/pets and database/treasures and writes  tools/reports/missing-report.txt  :
  * empty or absent fields (release date, story, skill text, tags, emoji, ...)
  * placeholders such as ?  ??  ???  TBD
  * levels / candy levels / enhancements that are shorter than the others in your database
  * quote sections that are missing (General: New, Cookie Info & Loading, Tired - Lobby: Daily Reward, Tap, Gift - Cookie Trials: Trial Info)
  * costumes without bonus / release date / story / sprite / quotes, and Super Epic+ costumes without an illustration
  * images that are still web links (not downloaded) or whose local file does not exist
Every gap is tagged:   [wiki]  could appear on the wiki later - re-fetch the item
                       [hand]  never on the wiki (emoji, ...) - fill in yourself
                       [tool]  run a tool (download-images.py)
Some gaps are normal: very old cookies have no illustration, some items have no combo bonus, and so on.

Each run is compared with the previous report, so after the wiki gets updated you can see what got filled (and what is new).

Usage:   python tools/find-missing.py                  (python3 on Mac/Linux; run from the project folder, or from inside tools/)
         python tools/find-missing.py --only cookies   (or pets / treasures)
         python tools/find-missing.py --out my-report.txt
Needs:   Python 3.8+ (no extra packages). Reads only - it never changes your data.
"""
import datetime, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
# Works from the project folder or from a tools/ subfolder: data is always in the project folder, reports stay next to the script.
ROOT = os.path.dirname(HERE) if os.path.basename(HERE).lower() == "tools" else HERE
RUN = "python tools/" if ROOT != HERE else "python "
DB = os.path.join(ROOT, "database")
REPORTS = os.path.join(HERE, "reports")
KINDS = (("cookies", "cookie"), ("pets", "pet"), ("treasures", "treasure"))
DEFAULT_N = {"cookie": 15, "pet": 15, "treasure": 12}          # used when your data has nothing to learn from
DEFAULT_CANDY, DEFAULT_ENH = 5, 6
BIG = ("superepic", "champion", "legendary")                    # costume rarities that have an illustration
PH_LINE = re.compile(r"^[\s?*]*\?[\s?*]*$")                     # ?  ??  ???
PH_WORD = re.compile(r"^\s*(tbd|n/?a|unknown|coming soon|to be added|todo)\s*$", re.I)
IMG_URL = re.compile(r"^https?://\S+\.(?:png|jpe?g|webp|gif)", re.I)
EXPECT_BASE = {"General": ["New", "Cookie Info & Loading", "Tired"], "Lobby": ["Daily Reward", "Tap", "Gift"], "Cookie Trials": ["Trial Info"]}
EXPECT_COSTUME = {"General": ["Cookie Info & Loading", "Tired"], "Lobby": ["Daily Reward", "Tap", "Gift"]}


def empty(v):
    return v is None or v == [] or v == {} or (isinstance(v, str) and not v.strip())


class Issues:
    def __init__(s): s.items = []
    def add(s, section, topic, msg, tag="wiki"): s.items.append((section, topic, msg, tag))


def spans(nums):
    """[1,2,3,5] -> '1-3, 5'"""
    nums, out, i = sorted(nums), [], 0
    while i < len(nums):
        j = i
        while j + 1 < len(nums) and nums[j + 1] == nums[j] + 1: j += 1
        out.append(str(nums[i]) if i == j else f"{nums[i]}-{nums[j]}"); i = j + 1
    return ", ".join(out)


# ---------------------------------------------------------------- checks
def check_quotes(I, groups, expect, label):
    if empty(groups):
        I.add("Quotes", f"{label}: no quotes", f"{label}: no quotes at all"); return
    by = {g.get("title"): {s.get("title"): s for s in g.get("sections") or []} for g in groups}
    for gt, secs in expect.items():
        if gt not in by: I.add("Quotes", f"{label}: missing section", f"{label}: group '{gt}' is missing"); continue
        for st in secs:
            s = by[gt].get(st)
            if s is None: I.add("Quotes", f"{label}: missing section", f"{label}: '{gt} > {st}' is missing")
            elif st == "Gift" and len(s.get("rows") or []) < 3: I.add("Quotes", f"{label}: missing section", f"{label}: 'Gift' has {len(s.get('rows') or [])} of 3 rows")
            elif st != "Gift" and empty(s.get("lines")): I.add("Quotes", f"{label}: missing section", f"{label}: '{gt} > {st}' has no lines")
    for g in groups:                                              # placeholders in every section that exists
        for s in g.get("sections") or []:
            lines = list(s.get("lines") or []) + [r.get("text", "") for r in s.get("rows") or []]
            ph = [l for l in lines if isinstance(l, str) and PH_LINE.match(l)]
            if ph: I.add("Quotes", f"{label}: placeholders", f"{label}: '{g.get('title')} > {s.get('title')}' has {len(ph)} of {len(lines)} lines that are only '?'")


def check_levels(I, e, n, energy):
    L = e.get("levels") or []
    if not L: I.add("Levels", "levels", "no levels at all"); return
    if len(L) < n: I.add("Levels", "levels short", f"only {len(L)} of {n} levels")
    bad = [l.get("lv", i + 1) for i, l in enumerate(L) if empty(l.get("desc"))]
    if bad: I.add("Levels", "level text", f"level text empty at level {spans(bad)}")
    norew = [l.get("lv", i + 1) for i, l in enumerate(L) if l.get("lv", i + 1) > 1 and empty(l.get("reward"))]
    if norew: I.add("Levels", "level-up rewards", f"level-up reward missing at level {spans(norew)}", "hand")
    if energy:
        noen = [l.get("lv", i + 1) for i, l in enumerate(L) if l.get("energy") is None and l.get("power") is None]
        if noen: I.add("Levels", "energy", f"energy missing at level {spans(noen)}")


def check_costumes(I, e, kind):
    cos = e.get("costumes") or []
    if not cos: I.add("Costumes", "no costumes", "no costume list (not even the default costume)", "hand"); return
    if not any(c.get("tier") == "default" for c in cos): I.add("Costumes", "no default costume", "no default costume entry", "hand")
    for i, c in enumerate(cos):
        nm = c.get("name") or f"#{i + 1}"
        if c.get("tier") == "default":
            if empty(c.get("img")): I.add("Costumes", "costume sprite", f"default costume: sprite missing")
            continue
        for key, label, tag in (("name", "name", "wiki"), ("tier", "rarity tier", "wiki"), ("img", "sprite", "wiki"), ("emoji", "emoji", "hand"),
                                ("released", "release date", "wiki"), ("bonus", "bonus", "wiki"), ("info", "story / info", "wiki")):
            if empty(c.get(key)): I.add("Costumes", f"costume {label}", f"costume '{nm}': {label} is empty", tag)
        if kind == "cookie" and c.get("tier") in BIG and empty(c.get("illust")): I.add("Costumes", "costume illustration", f"costume '{nm}' ({c.get('tier')}): illustration missing")
        if kind == "cookie":
            q = c.get("quotes")
            if empty(q): I.add("Quotes", "costume quotes", f"costume '{nm}': no quotes")
            else: check_quotes(I, q, EXPECT_COSTUME, f"costume '{nm}'")


def check_cookie(I, e, N):
    for key, label, tag in (("released", "release date", "wiki"), ("emoji", "emoji", "hand"), ("img", "sprite", "wiki"), ("avatar", "head icon", "wiki"),
                            ("illust", "illustration / Highlight (very old cookies have none)", "wiki"), ("tags", "tags", "wiki"),
                            ("skillFull", "skill description", "wiki"), ("story", "story", "wiki"), ("quote", "quote line", "wiki")):
        if empty(e.get(key)): I.add("Basics", label.split(" (")[0], f"{label} is empty", tag)
    check_levels(I, e, N["cookie"], True)
    j = e.get("jelly") or {}
    for key, label in (("img", "image"), ("story", "story")):
        if empty(j.get(key)): I.add("Affection Jelly", f"jelly {label}", f"Affection Jelly {label} is empty")
    check_quotes(I, e.get("quotes"), EXPECT_BASE, "quotes")
    af = e.get("affection") or []
    if len(af) < 3: I.add("Affection", "affection", f"only {len(af)} affection tiers")
    if not any(a.get("bonus") for a in af): I.add("Affection", "affection bonus", "no affection tier with a bonus (the wiki's 800+ milestones)")
    nn = [a.get("n") for a in af if empty(a.get("name"))]
    if nn: I.add("Affection", "affection names", f"rank name missing at {spans([x for x in nn if isinstance(x, int)]) or 'some'} points", "hand")
    rel = e.get("relations") or []
    if not rel: I.add("Relationships", "relationships", "relationship chart is empty")
    for r in rel:
        for key in ("text", "type", "id"):
            if empty(r.get(key)): I.add("Relationships", f"relationship {key}", f"relationship '{r.get('who', '?')}': {key} is empty")
    cd = e.get("candy")
    if empty(cd): I.add("Magic Candy", "no candy", "no Magic Candy at all")
    else:
        for key, label, tag in (("name", "name", "wiki"), ("img", "image", "wiki"), ("skillFull", "skill description", "wiki"), ("emoji", "emoji", "hand")):
            if empty(cd.get(key)): I.add("Magic Candy", f"candy {label}", f"candy {label} is empty", tag)
        L = cd.get("levels") or []
        if len(L) < N["candy"]: I.add("Magic Candy", "candy levels", f"candy has {len(L)} of {N['candy']} levels")
        bad = [l.get("lv", i + 1) for i, l in enumerate(L) if empty(l.get("desc"))]
        if bad: I.add("Magic Candy", "candy level text", f"candy level text empty at level {spans(bad)}")
        ing = cd.get("ingredient") or {}
        for key, label, tag in (("name", "name", "wiki"), ("img", "image", "wiki"), ("text", "text", "hand")):
            if empty(ing.get(key)): I.add("Magic Candy", f"ingredient {label}", f"ingredient {label} is empty", tag)
    check_costumes(I, e, "cookie")


def check_pet(I, e, N):
    for key, label, tag in (("released", "release date", "wiki"), ("emoji", "emoji", "hand"), ("img", "sprite", "wiki"), ("tags", "tags", "wiki"),
                            ("skillFull", "skill description", "wiki"), ("story", "story", "wiki")):
        if empty(e.get(key)): I.add("Basics", label, f"{label} is empty", tag)
    check_levels(I, e, N["pet"], False)
    check_costumes(I, e, "pet")


def check_treasure(I, e, N):
    for key, label, tag in (("released", "release date", "wiki"), ("emoji", "emoji", "hand"), ("img", "sprite (with background)", "wiki"),
                            ("avatar", "icon", "wiki"), ("tags", "tags", "wiki"), ("skillFull", "skill description", "wiki"), ("story", "story", "wiki")):
        if empty(e.get(key)): I.add("Basics", label.split(" (")[0], f"{label} is empty", tag)
    check_levels(I, e, N["treasure"], False)
    en = e.get("enhancements") or []
    if len(en) < N["enh"]: I.add("Enhancements", "enhancements", f"only {len(en)} of {N['enh']} enhancement levels")


def check_any(I, e):
    """Generic: placeholder text and image links anywhere in the entry."""
    def walk(v, path, in_quotes):
        if isinstance(v, dict):
            for k, x in v.items(): walk(x, f"{path}.{k}" if path else k, in_quotes or k == "quotes")
        elif isinstance(v, list):
            for i, x in enumerate(v): walk(x, f"{path}[{i}]", in_quotes)
        elif isinstance(v, str):
            if IMG_URL.match(v): I.add("Images", "not downloaded", f"{path}: still a web link (run download-images.py)", "tool")
            elif v.startswith("images/") and not os.path.exists(os.path.join(ROOT, *v.split("/"))): I.add("Images", "missing file", f"{path}: file not found ({v})", "tool")
            elif not in_quotes and (PH_LINE.match(v) or PH_WORD.match(v)): I.add("Placeholders", "placeholders", f"{path} contains only a placeholder ({v.strip()!r})")
    walk(e, "", False)


# ---------------------------------------------------------------- main
def load_all(only):
    data, errors = {}, []
    for folder, kind in KINDS:
        if only and folder != only: continue
        d = os.path.join(DB, folder)
        if not os.path.isdir(d): errors.append(f"database/{folder}/ not found"); continue
        found = {}
        for fn in sorted(os.listdir(d)):
            if not fn.endswith(".json") or fn.startswith("_"): continue
            try: found[fn[:-5]] = json.load(open(os.path.join(d, fn), encoding="utf-8"))
            except (ValueError, OSError) as ex: errors.append(f"database/{folder}/{fn}: cannot be read ({ex})")
        order = []
        try: order = [x for x in json.load(open(os.path.join(d, "_order.json"), encoding="utf-8")) if x in found]
        except (ValueError, OSError): pass
        data[kind] = [(i, found[i]) for i in order + [x for x in found if x not in order]]
    return data, errors


def main():
    a = sys.argv[1:]
    only = a[a.index("--only") + 1] if "--only" in a and a.index("--only") + 1 < len(a) else None
    out = a[a.index("--out") + 1] if "--out" in a and a.index("--out") + 1 < len(a) else os.path.join(REPORTS, "missing-report.txt")
    if only and only not in dict(KINDS): print("--only must be cookies, pets or treasures"); return 1
    data, errors = load_all(only)
    if not any(data.values()): print("No entries found in database/ (run build-database.py --split first)."); return 1
    # what a "complete" entry looks like = the longest lists found in your own data
    N = {k: max([len(e.get("levels") or []) for _, e in data.get(k, [])] + [0]) or DEFAULT_N[k] for k in DEFAULT_N}
    cands = [len((e.get("candy") or {}).get("levels") or []) for _, e in data.get("cookie", [])]
    N["candy"] = max(cands + [0]) or DEFAULT_CANDY
    N["enh"] = max([len(e.get("enhancements") or []) for _, e in data.get("treasure", [])] + [0]) or DEFAULT_ENH
    results = []                                                  # (kind, id, entry, issues)
    for kind in ("cookie", "pet", "treasure"):
        for i, e in data.get(kind, []):
            I = Issues()
            for key, tag in (("name", "wiki"), ("rarity", "wiki")):
                if empty(e.get(key)): I.add("Basics", key, f"{key} is empty", tag)
            {"cookie": check_cookie, "pet": check_pet, "treasure": check_treasure}[kind](I, e, N)
            check_any(I, e)
            results.append((kind, i, e, I.items))

    # ---- compare with the previous run
    os.makedirs(REPORTS, exist_ok=True)
    state_path = os.path.join(REPORTS, "last-state.json")
    now = {f"{k}:{i}": sorted(f"{s} | {m}" for s, t, m, g in iss) for k, i, e, iss in results}
    try: before = json.load(open(state_path, encoding="utf-8"))
    except (ValueError, OSError): before = None
    resolved, new = [], []
    if before is not None:
        for key in now:
            if key not in before: continue                        # an entry added since the last run is not a "new gap"
            old, cur = set(before[key]), set(now[key])
            resolved += [(key, x.split(" | ", 1)[1]) for x in sorted(old - cur)]
            new += [(key, x.split(" | ", 1)[1]) for x in sorted(cur - old)]

    # ---- build the report
    L = []
    W = L.append
    total = sum(len(r[3]) for r in results)
    withgaps = sum(1 for r in results if r[3])
    tags = {"wiki": 0, "hand": 0, "tool": 0}
    for r in results:
        for s, t, m, g in r[3]: tags[g] += 1
    W("COOKIE RUN OVENBREAK ARCHIVE - MISSING CONTENT REPORT")
    W(f"Generated: {datetime.datetime.now():%Y-%m-%d %H:%M}    " + "   ".join(f"{len(data.get(k, []))} {k}s" for k in ("cookie", "pet", "treasure")))
    W("")
    W("HOW TO READ THIS")
    W("  [wiki]  could appear on the wiki later - re-fetch the item (commands are at the end)")
    W("  [hand]  never on the wiki (emoji, ingredient text, ...) - fill in yourself")
    W("  [tool]  run a tool, e.g. download-images.py for links that are not downloaded yet")
    W("  Some gaps are normal: very old cookies have no illustration/Highlight, some items have no combo bonus.")
    W("  A 'complete' entry is measured against your own data: " + f"{N['cookie']} cookie levels, {N['pet']} pet levels, {N['treasure']} treasure levels, {N['candy']} candy levels, {N['enh']} enhancement levels.")
    W("")
    W("SUMMARY")
    W(f"  Entries checked: {len(results)}   with gaps: {withgaps}   complete: {len(results) - withgaps}   total gaps: {total}")
    W(f"  by kind of gap:  [wiki] {tags['wiki']}   [hand] {tags['hand']}   [tool] {tags['tool']}")
    for kind in ("cookie", "pet", "treasure"):
        rs = [r for r in results if r[0] == kind]
        if rs: W(f"  {kind + 's':10} {len(rs):3} entries, {sum(1 for r in rs if r[3]):3} with gaps, {sum(len(r[3]) for r in rs):4} gaps")
    secs = {}
    for r in results:
        for s, t, m, g in r[3]: secs[s] = secs.get(s, 0) + 1
    W("  by section:      " + ", ".join(f"{s} {n}" for s, n in sorted(secs.items(), key=lambda x: -x[1])))
    W("")
    W("CHANGES SINCE THE LAST REPORT")
    if before is None: W("  This is the first report - nothing to compare with yet.")
    else:
        W(f"  {len(resolved)} gap(s) filled in, {len(new)} new gap(s).")
        for key, m in resolved[:60]: W(f"    filled   {key}: {m}")
        if len(resolved) > 60: W(f"    ... and {len(resolved) - 60} more")
        for key, m in new[:60]: W(f"    new      {key}: {m}")
        if len(new) > 60: W(f"    ... and {len(new) - 60} more")
    if errors:
        W(""); W("FILES THAT COULD NOT BE READ (fix these first)")
        for x in errors: W("  " + x)
    W("")
    for kind in ("cookie", "pet", "treasure"):
        rs = [r for r in results if r[0] == kind]
        if not rs: continue
        W("=" * 78); W(f"{kind.upper()}S  ({len(rs)})"); W("=" * 78)
        for k, i, e, iss in rs:
            if not iss: continue
            W("")
            W(f"{e.get('name', i)}   [{i}]   {e.get('rarity', '?')}   released: {e.get('released') or '-'}   ({len(iss)} gaps)")
            bysec = {}
            for s, t, m, g in iss: bysec.setdefault(s, {}).setdefault((t, g), []).append(m)
            for s, topics_ in bysec.items():
                W(f"  {s}")
                for (t, g), ms in topics_.items():
                    for m in ms[:6]: W(f"    [{g}] {m}")
                    if len(ms) > 6: W(f"    [{g}] ... and {len(ms) - 6} more: {t}")
        done = [i for k, i, e, iss in rs if not iss]
        if done: W(""); W(f"No gaps found: {', '.join(done)}")
        W("")
    # ---- by topic
    W("=" * 78); W("BY TOPIC  (the same gap across items - handy for batch work)"); W("=" * 78)
    topics = {}
    for k, i, e, iss in results:
        for s, t, m, g in iss: topics.setdefault((s, t, g), []).append(f"{i}")
    for (s, t, g), who in sorted(topics.items(), key=lambda x: (-len(set(x[1])), x[0])):
        names = sorted(set(who))
        W(f"  [{g}] {s}: {t}  - {len(names)} item(s)")
        line = "      "
        for n in names:
            if len(line) + len(n) > 96: W(line.rstrip(", ")); line = "      "
            line += n + ", "
        W(line.rstrip(", "))
    W("")
    # ---- re-fetch commands
    W("=" * 78); W("RE-FETCH COMMANDS  (items with [wiki] gaps)"); W("=" * 78)
    W("  fetch-entry.py never overwrites an existing entry: if the entry already exists, the fresh version is saved in tools/drafts/")
    W("  so you can compare it with yours and copy over what is new. Then run download-images.py and build-database.py.")
    W("")
    any_cmd = False
    for k, i, e, iss in results:
        if any(g == "wiki" for s, t, m, g in iss):
            any_cmd = True; W(f'  {RUN}fetch-entry.py {k} "{e.get("name", i)}"')
    if not any_cmd: W("  (nothing to re-fetch)")
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f: f.write("\n".join(L) + "\n")
    if not only:  # a partial run (--only) must not replace the baseline of the full report
        with open(state_path, "w", encoding="utf-8") as f: json.dump(now, f, ensure_ascii=False, indent=1)
    print(f"Report written: {os.path.relpath(out, ROOT)}")
    print(f"  {len(results)} entries checked, {withgaps} with gaps, {total} gaps  ([wiki] {tags['wiki']}, [hand] {tags['hand']}, [tool] {tags['tool']})")
    if before is not None: print(f"  since the last report: {len(resolved)} filled in, {len(new)} new")
    return 0


if __name__ == "__main__":
    sys.exit(main())