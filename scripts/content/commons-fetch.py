"""Fetch candidate pictures from Wikimedia Commons (free licences only) for a blog article.

The workspace that writes the articles cannot reach Wikimedia, so .github/workflows/commons-images.yml runs this on
GitHub when scripts/content/commons-request.json changes, and pushes the pictures plus their licence details to the
branch "commons-images" (never to main). A person then picks pictures from there, copies them into images/ and
credits the author and licence under each one.

    python3 scripts/content/commons-fetch.py scripts/content/commons-request.json out/
"""
import html, json, os, re, sys, time, urllib.parse, urllib.request

req = json.load(open(sys.argv[1], encoding="utf-8"))
out = sys.argv[2]
os.makedirs(out, exist_ok=True)
UA = "MyBirthSignImageFetcher/1.0 (https://mybirthsign.com; contact@mybirthsign.com)"
OK_LICENCE = re.compile(r"^(CC0|Public domain|PD|CC BY(-SA)? [0-9.]+( [a-z]+)?|CC BY(-SA)?)", re.I)
API = "https://commons.wikimedia.org/w/api.php"


def get(url, binary=False):
    r = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60)
    data = r.read()
    return data if binary else json.loads(data.decode("utf-8"))


def text(v):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", v or ""))).strip()


meta, seen, n = [], set(), 0
width = int(req.get("width", 1200))
for item in req["queries"]:
    q = item if isinstance(item, str) else item["q"]
    params = {"action": "query", "format": "json", "generator": "search", "gsrsearch": q, "gsrnamespace": "6",
              "gsrlimit": str(req.get("per_query", 8)), "prop": "imageinfo", "iiprop": "url|size|mime|extmetadata",
              "iiurlwidth": str(width)}
    try:
        res = get(API + "?" + urllib.parse.urlencode(params))
    except Exception as e:
        print("search failed:", q, e); continue
    pages = sorted((res.get("query") or {}).get("pages", {}).values(), key=lambda p: p.get("index", 0))
    for p in pages:
        if p["title"] in seen or not p.get("imageinfo"):
            continue
        ii = p["imageinfo"][0]; em = ii.get("extmetadata", {})
        lic = (em.get("LicenseShortName") or {}).get("value", "")
        if ii.get("mime") not in ("image/jpeg", "image/png", "image/webp") or not OK_LICENCE.match(lic):
            continue
        seen.add(p["title"]); n += 1
        ext = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}[ii["mime"]]
        fn = f"{n:02d}.{ext}"
        try:
            open(os.path.join(out, fn), "wb").write(get(ii.get("thumburl") or ii["url"], binary=True))
        except Exception as e:
            print("download failed:", p["title"], e); n -= 1; continue
        meta.append({"file": fn, "query": q, "title": p["title"], "page": ii.get("descriptionurl"),
                     "original": ii.get("url"), "width": ii.get("thumbwidth") or ii.get("width"),
                     "height": ii.get("thumbheight") or ii.get("height"), "licence": lic,
                     "licence_url": (em.get("LicenseUrl") or {}).get("value", ""),
                     "author": text((em.get("Artist") or {}).get("value")), "credit": text((em.get("Credit") or {}).get("value"))[:300],
                     "date": text((em.get("DateTimeOriginal") or {}).get("value")),
                     "description": text((em.get("ImageDescription") or {}).get("value"))[:400],
                     "attribution_required": (em.get("AttributionRequired") or {}).get("value", "")})
        time.sleep(0.5)
json.dump({"request": req, "pictures": meta}, open(os.path.join(out, "pictures.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(meta)} pictures with free licences")
