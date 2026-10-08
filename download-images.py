#!/usr/bin/env python3
"""
download-images.py  -  archive every wiki image locally, sorted into folders.

What it does (safe to run any number of times):
  1. Reads cookies.js, pets.js and treasures.js (next to this script).
  2. Finds every image link that starts with http(s):// (png/jpg/jpeg/webp/gif).
  3. Works out what each image is (cookie sprite, Magic Candy, costume, ...) from where it sits
     in your data, and downloads it into the matching folder under  images/ :

        images/cookies/                      cookie sprites
        images/cookie-heads/                 head icons (avatars, relationship icons)
        images/cookie-illustrations/         full cookie illustrations
        images/affection-jelly/              Affection Jelly sprites
        images/magic-candy/                  Magic Candy sprites
        images/magic-candy-ingredients/      Magic Candy ingredients
        images/costumes/cookie/              cookie costume sprites
        images/costumes/pet/                 pet costume sprites
        images/costume-illustrations/        full costume illustrations
        images/pets/                         pet sprites
        images/treasures/                    treasure sprites
        images/treasure-icons/               small treasure icons
        images/special-icon/                 Energy, Affection and Escape Point icons (fixed UI icons)
        images/rarity-tag/general/           rarity tags (Legendary, Epic, ... collabs)
        images/rarity-tag/costume/           costume rarity badges
        images/misc/                         anything it could not classify

  4. Rewrites each link in the .js file to the local path, e.g.  images/magic-candy/Crob_magic_candy_milky_way.png
  5. Keeps a backup of your original files in  backup/  (first run only).

Adding new entries later: paste the wiki links as usual, then run this script again.
It only touches links that are still http(s):// - already-converted ones are left alone.

Usage:   python download-images.py            (python3 on Mac/Linux)
         python download-images.py --dry-run  (just list what it would do)
Needs:   Python 3.8+ (no extra packages).
"""
import hashlib, os, re, shutil, sys, time, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
FILES = {"cookies.js": "cookie", "pets.js": "pet", "treasures.js": "treasure"}
IMG_DIR = "images"
URL_RE = re.compile(r'https?://[^\s"\'()<>]+?\.(?:png|jpe?g|webp|gif)(?=["\'\s)<>]|$)', re.I)
UA = "Mozilla/5.0 (compatible; personal-archive-downloader)"
DRY = "--dry-run" in sys.argv
# Fixed UI images used by index.html (not found in the .js data files): URL -> folder/file under images/
SPECIAL = {
    "https://cdn.wikimg.net/en/cookierunwiki/images/3/32/Energy_Potion.png": "special-icon/Energy_Potion.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/8/8c/Icon_affection.png/30px-Icon_affection.png": "special-icon/30px-Icon_affection.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/7/78/Escape_Level.png/42px-Escape_Level.png": "special-icon/42px-Escape_Level.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/e/e2/Legendary.png/120px-Legendary.png": "rarity-tag/general/120px-Legendary.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/2/26/Epic.png/120px-Epic.png": "rarity-tag/general/120px-Epic.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/2/24/Special.png/120px-Special.png": "rarity-tag/general/120px-Special.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/9/9f/Rare.png/120px-Rare.png": "rarity-tag/general/120px-Rare.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/5/5f/Common.png/120px-Common.png": "rarity-tag/general/120px-Common.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/5/50/Teenieping.png/120px-Teenieping.png": "rarity-tag/general/120px-Teenieping.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/d/dc/The_Powerpuff_Girls.png/120px-The_Powerpuff_Girls.png": "rarity-tag/general/120px-The_Powerpuff_Girls.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/b/b6/Sanrio_characters.png": "rarity-tag/general/Sanrio_characters.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/f/fb/OvenBreak_Legendary_Costume.png/53px-OvenBreak_Legendary_Costume.png": "rarity-tag/costume/53px-OvenBreak_Legendary_Costume.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/a/a2/OvenBreak_Champion_Costume.png/53px-OvenBreak_Champion_Costume.png": "rarity-tag/costume/53px-OvenBreak_Champion_Costume.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/5/5d/OvenBreak_Super_Epic_Costume.png/53px-OvenBreak_Super_Epic_Costume.png": "rarity-tag/costume/53px-OvenBreak_Super_Epic_Costume.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/1/1f/OvenBreak_Epic_Costume.png/53px-OvenBreak_Epic_Costume.png": "rarity-tag/costume/53px-OvenBreak_Epic_Costume.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/d/d1/OvenBreak_Rare_Costume.png/45px-OvenBreak_Rare_Costume.png": "rarity-tag/costume/45px-OvenBreak_Rare_Costume.png",
    "https://cdn.wikimg.net/en/cookierunwiki/images/thumb/1/1b/OvenBreak_Common_Costume.png/45px-OvenBreak_Common_Costume.png": "rarity-tag/costume/45px-OvenBreak_Common_Costume.png",
}

# comment | string | "key:" | opening bracket | closing bracket | comma
TOKEN = re.compile(
    r'(?P<c>//[^\n]*|/\*.*?\*/)|(?P<s>"(?:\\.|[^"\\\n])*"|\'(?:\\.|[^\'\\\n])*\'|`(?:\\.|[^`\\])*`)'
    r'|(?P<k>\b[A-Za-z_]\w*\s*:)|(?P<o>[{\[])|(?P<x>[}\]])|(?P<m>,)', re.S)


def read(p):
    with open(p, encoding="utf-8", newline="") as f:  # newline="" keeps your line endings
        return f.read()


def folder_for(kind, key, stack):
    """kind = cookie|pet|treasure (which file); key = field holding the link; stack = enclosing blocks."""
    ctx = set(stack)
    if "ingredient" in ctx:
        return "magic-candy-ingredients"
    if "candy" in ctx:
        return "magic-candy"
    if "jelly" in ctx:
        return "affection-jelly"
    if "relations" in ctx:
        return "cookie-heads"
    if "costumes" in ctx:
        return "costume-illustrations" if key in ("illust", "illustration") else f"costumes/{kind}"
    if key in ("illust", "illustration"):
        return "cookie-illustrations" if kind == "cookie" else f"{kind}-illustrations"
    if key == "avatar":
        return "cookie-heads" if kind == "cookie" else f"{kind}-icons"
    if key in ("img", "image"):
        return {"cookie": "cookies", "pet": "pets", "treasure": "treasures"}[kind]
    return "misc"


def classify(text, kind):
    """Return {url: folder} using the first place each link appears."""
    found, stack, pending = {}, [], None
    for m in TOKEN.finditer(text):
        if m.lastgroup == "k":
            pending = m.group().rstrip(": \t").strip()
        elif m.lastgroup == "o":
            stack.append(pending)
            pending = None
        elif m.lastgroup == "x":
            if stack:
                stack.pop()
            pending = None
        elif m.lastgroup == "m":
            pending = None
        elif m.lastgroup == "s":
            val = m.group()[1:-1]
            if URL_RE.fullmatch(val):
                found.setdefault(val, folder_for(kind, pending, [k for k in stack if k]))
            pending = None
    return found


def local_name(url, folder, taken):
    """File name inside the folder; if two different links share a name, add a short hash."""
    base = urllib.parse.unquote(os.path.basename(urllib.parse.urlparse(url).path))
    base = re.sub(r"[^A-Za-z0-9._-]", "_", base)
    key = (folder, base.lower())  # Windows/macOS treat "Foo.png" and "foo.png" as the same file
    if taken.get(key, url) != url:
        stem, ext = os.path.splitext(base)
        base = f"{stem}-{hashlib.sha1(url.encode()).hexdigest()[:8]}{ext}"
        key = (folder, base.lower())
    taken[key] = url
    return base


def download(url, dest, tries=3):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://cookierunwiki.com/"})
    err = None
    for n in range(1, tries + 1):
        try:
            with urllib.request.urlopen(req, timeout=30) as r, open(dest + ".part", "wb") as f:
                shutil.copyfileobj(r, f)
            os.replace(dest + ".part", dest)
            return True
        except Exception as e:  # noqa
            err = e
            time.sleep(1.5 * n)
    print(f"   ! failed: {url}\n     ({err})")
    if os.path.exists(dest + ".part"):
        os.remove(dest + ".part")
    return False


def main():
    texts, cats = {}, {}
    for name, kind in FILES.items():
        p = os.path.join(HERE, name)
        if os.path.exists(p):
            texts[name] = read(p)
            for u, f in classify(texts[name], kind).items():
                cats.setdefault(u, f)
        else:
            print(f"(skipping {name}: not found)")
    # links the classifier could not place (e.g. unusual formatting) still get downloaded
    for t in texts.values():
        for u in URL_RE.findall(t):
            cats.setdefault(u, "misc")
    # fixed UI images: downloaded if missing, never rewritten in the .js files
    for u, rel in SPECIAL.items():
        dest = os.path.join(HERE, IMG_DIR, *rel.split("/"))
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            continue
        print(f"UI image: {rel}" + ("  (dry run)" if DRY else ""))
        if not DRY:
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            download(u, dest)
    if not cats:
        print("Nothing to do - no http(s) image links found. All images are already local.")
        return
    taken, mapping = {}, {}
    for u, folder in cats.items():
        mapping[u] = f"{folder}/{local_name(u, folder, taken)}"
    print(f"Found {len(mapping)} unique image links.")
    if DRY:
        for u, rel in mapping.items():
            print(f"  {rel}   <-  {u}")
        return
    ok = {}
    for k, (u, rel) in enumerate(mapping.items(), 1):
        dest = os.path.join(HERE, IMG_DIR, *rel.split("/"))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            print(f"[{k}/{len(mapping)}] have  {rel}")
            ok[u] = rel
            continue
        print(f"[{k}/{len(mapping)}] get   {rel}")
        if download(u, dest):
            ok[u] = rel
            time.sleep(0.3)  # be polite to the wiki
    bdir = os.path.join(HERE, "backup")  # backups: first run only, originals are never overwritten
    os.makedirs(bdir, exist_ok=True)
    for name, t in texts.items():
        b = os.path.join(bdir, name)
        if not os.path.exists(b):
            with open(b, "w", encoding="utf-8", newline="") as f:
                f.write(t)
        for u, rel in ok.items():
            t = t.replace(u, f"{IMG_DIR}/{rel}")  # only successfully downloaded links are rewritten
        with open(os.path.join(HERE, name), "w", encoding="utf-8", newline="") as f:
            f.write(t)
    bad = len(mapping) - len(ok)
    print(f"\nDone. {len(ok)} images saved under '{IMG_DIR}/', {bad} failed (those links were left as they were).")
    if bad:
        print("Run the script again to retry the failed ones.")
    print("Now upload the .js files and the images folder to GitHub.")


if __name__ == "__main__":
    main()