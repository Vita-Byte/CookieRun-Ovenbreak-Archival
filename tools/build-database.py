#!/usr/bin/env python3
"""
build-database.py  -  keep every cookie / pet / treasure in its own .json file, then merge them for the website.

    database/
      cookies/     allulose-nova.json, sea-fairy.json, ...   <- you edit THESE (one file per entry)
      pets/        wave-drop.json, ...
      treasures/   ...
      cookies.js, pets.js, treasures.js                      <- GENERATED for index.html (never edit by hand)

Usage:
    python tools/build-database.py --split    one-time: convert your old cookies.js / pets.js / treasures.js into the folders above
    python tools/build-database.py            check everything, then rebuild database/cookies.js, pets.js, treasures.js
    python tools/build-database.py --check    only check (changes nothing)
(Run these from the project folder, or drop "tools/" and run them from inside the tools folder - both work.)

Order: entries are always sorted by rarity first (RARITY_ORDER below), then by "released" date inside each rarity
(newest first; set NEWEST_FIRST = False below for oldest first). Entries without a readable date go at the end of their rarity. _order.json is rewritten with the sorted order on every build.

Safety: if ANY .json file has a mistake, nothing is rebuilt and the old generated files stay as they were,
and you get the file name + line + column of the problem. Warnings (missing images, unknown combo ids, ...) never block the build.
Works with a double-clicked index.html because the website still loads plain .js files. Needs Python 3.8+, no packages.
"""
import json, os, re, sys
from datetime import datetime

# Entries are always sorted by rarity first (in the order below), then by their "released" date inside each rarity.
# NEWEST_FIRST: True = newest first, False = oldest first (only affects the date part).
# Entries with no (or an unreadable) date go to the end of their rarity; unknown rarities go after all listed ones.
RARITY_ORDER = ["legendary", "epic", "rare", "common", "special", "teenieping", "ppg", "sanrio"]
RANK = {r: n for n, r in enumerate(RARITY_ORDER)}
NEWEST_FIRST = True 
DATE_FORMATS = ("%B %d, %Y", "%b %d, %Y", "%B %d %Y", "%b %d %Y", "%d %B %Y", "%d %b %Y", "%Y-%m-%d", "%Y/%m/%d", "%Y.%m.%d", "%m/%d/%Y", "%B %Y", "%b %Y", "%Y")


def parse_date(s):
    """'March 23, 2025' / '2025-03-23' / 'March 2025' / '2025' -> datetime, or None if empty/unreadable."""
    if not isinstance(s, str): return None
    s = re.sub(r"\(.*?\)", "", s)                       # drop "(KST)" etc.
    s = re.sub(r"(?<=\d)(st|nd|rd|th)\b", "", s.strip(), flags=re.I)  # 1st -> 1
    s = re.sub(r"\s+", " ", re.sub(r"\bSept\b", "Sep", s)).strip(" .,")
    for f in DATE_FORMATS:
        try: return datetime.strptime(s, f)
        except ValueError: pass
    return None


HERE = os.path.dirname(os.path.abspath(__file__))
# Works from the project folder or from a tools/ subfolder: data (database/, images/) is always in the project folder,
# the tool's own scratch folders (.cache, drafts, backup) stay next to the script.
ROOT = os.path.dirname(HERE) if os.path.basename(HERE).lower() == "tools" else HERE
RUN = "python tools/" if ROOT != HERE else "python "
DB = os.path.join(ROOT, "database")
KINDS = {"cookies": ("COOKIES", "cookie"), "pets": ("PETS", "pet"), "treasures": ("TREASURES", "treasure")}
RARITIES = {"legendary", "epic", "rare", "common", "special", "teenieping", "ppg", "sanrio"}
RELT = {"Friendly", "Family", "Trust", "Admiration", "Tension", "Rival"}

TOK = re.compile(r"""(?P<c>//[^\n]*|/\*.*?\*/)|(?P<s>"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(?P<k>[A-Za-z_$][\w$]*)(?=\s*:)|(?P<w>\s+|[A-Za-z_$][\w$]*|[^\sA-Za-z_$"'`/]+|/)""", re.S)


def load_js(path):
    """Read an old-style data file (window.X = [ ... ];) into Python lists/dicts."""
    t = open(path, encoding="utf-8").read()
    m = re.search(r"=\s*\[", t)
    if not m: raise ValueError("no 'window.X = [' found")
    t, out = t[m.end() - 1: t.rfind("]") + 1], []
    for m in TOK.finditer(t):
        if m.group("c"): continue
        if m.group("s"):
            s = m.group("s").replace("\\'", "'")
            out.append(s if s[0] == '"' else json.dumps(s[1:-1]))
        elif m.group("k"): out.append(json.dumps(m.group("k")))
        else: out.append(m.group("w"))
    return json.loads(re.sub(r",(\s*[}\]])", r"\1", "".join(out)), strict=False)


def head_comments(path):
    keep = []
    for ln in open(path, encoding="utf-8").read().splitlines():
        if ln.strip().startswith("//"): keep.append(ln.strip()[2:].strip())
        elif ln.strip().startswith("window."): break
    return keep


def slug(s): return re.sub(r"[^a-z0-9]+", "-", re.sub(r"\s+cookie$", "", s.lower())).strip("-")


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path + ".tmp", "w", encoding="utf-8", newline="\n") as f: f.write(text)
    os.replace(path + ".tmp", path)


def split(force):
    for folder, (var, kind) in KINDS.items():
        src, out = os.path.join(ROOT, folder + ".js"), os.path.join(DB, folder)
        if not os.path.exists(src): print(f"  (skipping {folder}.js: not found)"); continue
        if os.path.isdir(out) and any(f.endswith(".json") for f in os.listdir(out)) and not force:
            print(f"  {folder}: database/{folder}/ already has files - skipped (use --force to overwrite)"); continue
        try: entries = load_js(src)
        except ValueError as ex: print(f"  ! could not read {folder}.js: {ex}"); continue
        ids = []
        for e in entries:
            i = e.get("id") or slug(e.get("name", ""))
            if i in ids: print(f"  ! duplicate id '{i}' in {folder}.js - the second one was NOT written"); continue
            e = {"id": i, **{k: v for k, v in e.items() if k != "id"}}
            write(os.path.join(out, i + ".json"), json.dumps(e, ensure_ascii=False, indent=2) + "\n"); ids.append(i)
        write(os.path.join(out, "_order.json"), json.dumps(ids, ensure_ascii=False, indent=1) + "\n")
        notes = head_comments(src)
        if notes: write(os.path.join(out, "_notes.txt"), "\n".join(notes) + "\n")
        print(f"  {folder}: {len(ids)} entries -> database/{folder}/")
    print(f"\nNow run:  {RUN}build-database.py")


def rel(p): return os.path.relpath(p, ROOT).replace("\\", "/")


def build(check_only):
    errors, warns, merged, ids = [], [], {}, {}
    for folder, (var, kind) in KINDS.items():
        d = os.path.join(DB, folder)
        if not os.path.isdir(d): errors.append(f"database/{folder}/ not found (run --split first, or create the folder)"); continue
        found = {}
        for fn in sorted(os.listdir(d)):
            if not fn.endswith(".json") or fn.startswith("_"): continue
            p = os.path.join(d, fn)
            try: obj = json.load(open(p, encoding="utf-8"))
            except json.JSONDecodeError as ex: errors.append(f"{rel(p)}: line {ex.lineno}, column {ex.colno}: {ex.msg}"); continue
            except UnicodeDecodeError: errors.append(f"{rel(p)}: not saved as UTF-8"); continue
            if not isinstance(obj, dict): errors.append(f"{rel(p)}: must contain one {{ ... }} object"); continue
            i = obj.get("id")
            if not i: errors.append(f"{rel(p)}: missing \"id\""); continue
            if i != fn[:-5]: errors.append(f"{rel(p)}: file name must match the id (\"{i}\" -> {i}.json)"); continue
            if not obj.get("name"): errors.append(f"{rel(p)}: missing \"name\"")
            if obj.get("rarity") not in RARITIES: warns.append(f"{rel(p)}: unusual rarity {obj.get('rarity')!r}")
            if not obj.get("levels") and kind != "treasure": warns.append(f"{rel(p)}: no levels")
            found[i] = (obj, os.path.getmtime(p))
        order, op = [], os.path.join(d, "_order.json")
        if os.path.exists(op):
            try: order = [x for x in json.load(open(op, encoding="utf-8")) if x in found]
            except json.JSONDecodeError as ex: errors.append(f"{rel(op)}: line {ex.lineno}: {ex.msg}")
        new = sorted((i for i in found if i not in order), key=lambda i: found[i][1])
        if new: print(f"  new in {folder}: {', '.join(new)} (added at the end)")
        order += new
        # always sort by release date (stable: ties and undated entries keep their previous relative order)
        dates = {i: parse_date(found[i][0].get("released")) for i in order}
        for i in order:
            if found[i][0].get("released") and dates[i] is None: warns.append(f"{kind} '{i}': could not read release date {found[i][0].get('released')!r} (placed at the end of its rarity)")
        key = lambda i: (RANK.get(found[i][0].get("rarity"), len(RANK)), dates[i] is None,
                         0 if dates[i] is None else -dates[i].toordinal() if NEWEST_FIRST else dates[i].toordinal())
        order = sorted(order, key=key)  # stable: entries with the same rarity + date keep their previous order
        if not check_only and not errors: write(op, json.dumps(order, ensure_ascii=False, indent=1) + "\n")
        merged[folder] = [found[i][0] for i in order]; ids[kind] = set(found)
    # warnings: references and images
    for folder, (var, kind) in KINDS.items():
        for e in merged.get(folder, []):
            for c in e.get("combi") or []:
                if c.get("type") in ids and c.get("id") not in ids[c["type"]]: warns.append(f"{kind} '{e['id']}': combo partner {c.get('type')} '{c.get('id')}' does not exist (yet)")
            for r in e.get("relations") or []:
                if r.get("type") not in RELT: warns.append(f"cookie '{e['id']}': relationship type {r.get('type')!r} is not one of {sorted(RELT)}")
    miss = []
    def walk(v, who):
        if isinstance(v, dict): [walk(x, who) for x in v.values()]
        elif isinstance(v, list): [walk(x, who) for x in v]
        elif isinstance(v, str) and v.startswith("images/") and not os.path.exists(os.path.join(ROOT, *v.split("/"))): miss.append(f"{who}: {v}")
    for folder in merged:
        for e in merged[folder]: walk(e, e["id"])
    if miss: warns += [f"missing image: {m}" for m in miss[:15]] + ([f"... and {len(miss) - 15} more missing images"] if len(miss) > 15 else [])
    cap = {}
    for w in warns:
        k = "combo" if "combo partner" in w else "image" if w.startswith("missing image") else "other"
        cap[k] = cap.get(k, 0) + 1
        if cap[k] <= (6 if k != "other" else 30): print("  warning:", w)
        elif cap[k] == (7 if k != "other" else 31): print(f"  warning: ... more {k} warnings hidden")
    if errors:
        print("\nNOTHING WAS REBUILT - fix these first:")
        for e in errors: print("  ERROR:", e)
        return 1
    if check_only:
        print("\nAll good (check only, nothing written)."); return 0
    for folder, (var, kind) in KINDS.items():
        notes = os.path.join(DB, folder, "_notes.txt")
        head = "// GENERATED by build-database.py - do not edit. Edit the files in database/%s/ and run the script again.\n" % folder
        if os.path.exists(notes): head += "".join("// " + l + "\n" for l in open(notes, encoding="utf-8").read().splitlines())
        body = ",\n".join(json.dumps(e, ensure_ascii=False, separators=(",", ":")) for e in merged[folder])
        write(os.path.join(DB, folder + ".js"), f"{head}window.{var} = [\n{body}\n];\n")
        print(f"  database/{folder}.js  <-  {len(merged[folder])} {folder}")
    print("\nDone. Refresh index.html (double-click works).")
    return 0


if __name__ == "__main__":
    a = sys.argv[1:]
    if "--split" in a: split("--force" in a); sys.exit(0)
    sys.exit(build("--check" in a))