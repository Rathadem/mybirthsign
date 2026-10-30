"""Build the Zodiac Stories & Legends section.

    python3 scripts/content/stories/build.py

1. Writes scripts/content/weekly/<slug>.json for the eight articles in specs.py and builds each page with
   scripts/content/weekly-article.py (pages are not listed one by one on blog.html; the landing page lists them).
2. Builds the landing page blog/zodiac-stories-legends.html (same header, footer and styles as the other guides).
3. Puts one card for the landing page at the top of the English "Latest Articles" on blog.html and adds the
   landing page to sitemap.xml. Re-running updates everything without duplicates.
"""
import html, json, math, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
sys.path.insert(0, HERE)
from specs import ARTICLES, LANDING, NOTE, PUBLISHED, SRC  # noqa: E402

SITE = "https://mybirthsign.com"
ADS = "ca-pub-9939402104083173"
e = lambda s: html.escape(s, quote=False).replace('"', "&quot;")
strip = lambda s: re.sub(r"<[^>]+>", "", s)

# ---- 1. articles
read_min = {}
for a in ARTICLES:
    spec = {k: v for k, v in a.items() if k not in ("animals", "after_all", "sources")}
    spec["published"] = PUBLISHED
    spec["sources"] = [SRC[k] for k in a["sources"]]
    spec["note"] = NOTE
    spec["back"] = ["Back to Zodiac Stories & Legends", LANDING]
    spec["listing"] = False
    spec["og_image"] = a["image"]["src"].replace(".webp", "-og.jpg")
    spec["related"] = a["related"] + [["All Zodiac Stories & Legends", LANDING]]
    secs = [dict(s) for s in a["sections"]]
    if a.get("after_all"):
        secs[-1]["after"] = secs[-1].get("after", []) + [a["after_all"]]
    spec["sections"] = secs
    words = len(strip(" ".join(p for s in secs for p in s.get("paras", []) + s.get("list", []) + s.get("after", []))).split())
    words += len(strip(" ".join(q + " " + ans for q, ans in a["faq"])).split()) + len(a["lead"].split())
    read_min[a["slug"]] = max(3, math.ceil(words / 200))
    path = os.path.join(ROOT, "scripts", "content", "weekly", f"{a['slug']}.json")
    json.dump(spec, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "content", "weekly-article.py"), path], check=True)

# ---- 2. landing page
tpl = open(os.path.join(ROOT, "blog", "cambodia-peace-day-december-29.html"), encoding="utf-8").read()
header = re.search(r'<header class="site-header">.*?</header>', tpl, re.S).group(0)
TITLE = "Zodiac Stories & Legends"
DESC = ("Folk tales and history behind the Chinese zodiac: the Great Race, why the Rat came first, the Dragon's kindness, "
        "the Rabbit's crossing, and why there are twelve animals. Clearly labelled as legend or history.")

def card(a, featured=False):
    img = a["image"]["src"].replace(".webp", "-card.webp")
    tags = "".join(f'<span class="sl-tag">{e(t)}</span>' for t in a["animals"])
    cls = "sl-card sl-featured" if featured else "sl-card"
    return (f'<a class="{cls}" href="{a["slug"]}"><img src="../{img}" alt="{e(a["image"]["alt"])}" width="880" height="520" loading="{"eager" if featured else "lazy"}" decoding="async">'
            f'<div class="sl-body"><p class="sl-meta">{tags}<span>{read_min[a["slug"]]} min read</span></p>'
            f'<h{2 if featured else 3}>{e(a["title"])}</h{2 if featured else 3}><p>{e(a["card_text"])}</p><span class="sl-read">Read the story →</span></div></a>')

feat = ARTICLES[0]
grid = "\n".join(card(a) for a in ARTICLES[1:])
STYLE = (".sl{max-width:1100px;margin:36px auto;padding:0 22px;color:var(--text,#f3efff);line-height:1.7}"
         ".sl-hero{text-align:center;max-width:760px;margin:0 auto 30px}"
         ".sl-hero .eyebrow{color:#e2bd61;text-transform:uppercase;letter-spacing:.13em;font-weight:700;font-size:.85rem}"
         ".sl-hero h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.3rem,5.5vw,3.8rem);line-height:1.1;color:#ffe4a0;margin:.2em 0}"
         ".sl-hero p{color:#d7d1e8;font-size:1.06rem}"
         ".sl-key{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:14px 0 0;font-size:.9rem;color:#cfc6ee}"
         ".sl-key span{border:1px solid #6f5a9e;border-radius:999px;padding:4px 12px;background:#1b1734}"
         ".sl-card{display:flex;flex-direction:column;text-decoration:none;color:inherit;background:#1b1734;border:1px solid #3d3266;border-radius:18px;overflow:hidden;transition:border-color .2s,transform .2s}"
         ".sl-card:hover{border-color:#d8b962;transform:translateY(-2px)}"
         ".sl-card img{display:block;width:100%;height:auto;aspect-ratio:880/520;object-fit:cover}"
         ".sl-body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:6px;flex:1}"
         ".sl-body h2,.sl-body h3{font-family:'Playfair Display',Georgia,serif;color:#ffe4a0;margin:0;line-height:1.25}"
         ".sl-body h3{font-size:1.2rem}.sl-body h2{font-size:clamp(1.5rem,3vw,2rem)}"
         ".sl-body p{margin:0;color:#d7d1e8}.sl-read{margin-top:auto;padding-top:8px;color:#f2d27d;font-weight:600}"
         ".sl-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:.82rem;color:#b4a9d6}"
         ".sl-tag{background:#2b2150;color:#f2d27d;border-radius:999px;padding:2px 10px;font-weight:600}"
         ".sl-featured{margin:0 0 28px}"
         "@media(min-width:860px){.sl-featured{display:grid;grid-template-columns:1.25fr 1fr}.sl-featured img{height:100%}.sl-featured .sl-body{padding:28px 30px;justify-content:center}}"
         ".sl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}"
         ".sl h2.sl-h{font-family:'Playfair Display',Georgia,serif;color:#e9ca79;margin:42px 0 14px}"
         ".sl-links{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;padding:0;list-style:none}"
         ".sl-links a{display:block;padding:12px 14px;border:1px solid #3d3266;border-radius:12px;background:#15122e;color:#f2d27d;text-decoration:none}"
         ".sl-links a:hover{border-color:#d8b962}"
         ".sl .note{border-left:3px solid #d8b962;padding:12px 16px;background:#211a39;color:#d7d1e8;margin-top:30px}"
         ".sl a.back{display:inline-block;margin:24px 0;color:#f2d27d}")
LINKS = [["Find your zodiac animal", "../checker"], ["All 12 zodiac animals", "../animals.html"], ["Year of the Rat guide", "zodiac-year-rat"],
         ["Year of the Dragon guide", "zodiac-year-dragon"], ["Khmer animal years", "khmer-animal-year-sak"], ["Zodiac compatibility guide", "zodiac-compatibility-guide"],
         ["How to calculate your zodiac sign", "how-to-calculate-zodiac-sign"], ["Today's zodiac fortune", "../blog.html"]]
links = "".join(f'<li><a href="{h}">{e(l)} →</a></li>' for l, h in LINKS)

# Khmer version of the landing page (published at /km/blog/zodiac-stories-legends): the cards take each story's Khmer
# title, card text and picture text from scripts/content/km/<slug>.json (the Khmer versions of the articles)
KM_DIR = os.path.join(ROOT, "scripts", "content", "km")
KM = {a["slug"]: json.load(open(os.path.join(KM_DIR, a["slug"] + ".json"), encoding="utf-8")) for a in ARTICLES
      if os.path.exists(os.path.join(KM_DIR, a["slug"] + ".json"))}
KM_ANIMAL = {"Rat": "ជូត", "Ox": "ឆ្លូវ", "Tiger": "ខាល", "Rabbit": "ថោះ", "Dragon": "រោង", "Snake": "ម្សាញ់", "Horse": "មមី",
             "Goat": "មមែ", "Monkey": "វក", "Rooster": "រកា", "Dog": "ច", "Pig": "កុរ"}
TITLE_KM = "រឿងនិទាន និងរឿងព្រេងរាសីចិន"
NOTE_KM = ("ការប្រណាំងដ៏ធំ (Great Race) និងរឿងផ្សេងៗទៀតនៅទីនេះ ជារឿងនិទានប្រជាប្រិយ ដែលគេនិទានតៗគ្នាច្រើនបែបខុសៗគ្នា មិនមែនជាព្រឹត្តិការណ៍ប្រវត្តិសាស្ត្រទេ។ "
           "បុគ្គលិកលក្ខណៈរបស់សត្វរាសីនីមួយៗ ជាជំនឿតាមប្រពៃណី ដែលយើងចែករំលែកសម្រាប់ការស្វែងយល់វប្បធម៌ និងការកម្សាន្ត។")
LINKS_KM = [["រករាសីរបស់អ្នក", "../checker"], ["សត្វរាសីទាំង 12", "../animals.html"], ["មគ្គុទ្ទេសក៍ឆ្នាំជូត", "zodiac-year-rat"],
            ["មគ្គុទ្ទេសក៍ឆ្នាំរោង", "zodiac-year-dragon"], ["ឆ្នាំសត្វខ្មែរ (ស័ក)", "khmer-animal-year-sak"], ["មគ្គុទ្ទេសក៍គូស្រករតាមរាសី", "zodiac-compatibility-guide"],
            ["របៀបគណនារាសីចិនរបស់អ្នក", "how-to-calculate-zodiac-sign"], ["ជោគជតារាសីប្រចាំថ្ងៃ", "../blog.html"]]
assert [h for _, h in LINKS_KM] == [h for _, h in LINKS], "LINKS_KM must have the same links as LINKS"

def card_km(a, featured=False):
    k = KM[a["slug"]]
    img = a["image"]["src"].replace(".webp", "-card.webp")
    tags = "".join(f'<span class="sl-tag">{e(KM_ANIMAL.get(t, t))}</span>' for t in a["animals"])
    cls = "sl-card sl-featured" if featured else "sl-card"
    return (f'<a class="{cls}" href="{a["slug"]}"><img src="../{img}" alt="{e(k["image"]["alt"])}" width="880" height="520" loading="{"eager" if featured else "lazy"}" decoding="async">'
            f'<div class="sl-body"><p class="sl-meta">{tags}<span>អានប្រហែល {read_min[a["slug"]]} នាទី</span></p>'
            f'<h{2 if featured else 3}>{e(k["title"])}</h{2 if featured else 3}><p>{e(k["card_text"])}</p><span class="sl-read">អានរឿងនេះ →</span></div></a>')

HAS_KM = len(KM) == len(ARTICLES)
if HAS_KM:
    STYLE += ("html[lang=km] .sl-hero h1,html[lang=km] .sl-body h2,html[lang=km] .sl-body h3,html[lang=km] .sl h2.sl-h{font-family:'Kantumruy Pro','Noto Sans Khmer',sans-serif;line-height:1.45}"
              "html[lang=km] .sl-hero h1{font-size:clamp(1.9rem,4.6vw,3rem)}html[lang=km] .sl-hero .eyebrow{letter-spacing:0}")
links_km = "".join(f'<li><a href="{h}">{e(l)} →</a></li>' for l, h in LINKS_KM)
main_km = f"""<div data-lang-content="km" lang="km">
<section class="sl-hero"><p class="eyebrow">ប្លុក MyBirthSign</p><h1>{e(TITLE_KM)}</h1>
<p>ហេតុអ្វីបានជាជូតនៅលំដាប់ទីមួយ? ហេតុអ្វីបានជានាគដែលចេះហោះ មកដល់ត្រឹមលំដាប់ទីប្រាំ? ទាំងនេះជារឿងដែលគេនិទានតៗគ្នាអំពីសត្វទាំងដប់ពីរនៃរាសីចិន ព្រមទាំងអ្វីដែលប្រវត្តិសាស្ត្របានកត់ត្រាទុកពិតប្រាកដ អំពីប្រភពដើមនៃសត្វទាំងនេះ។</p>
<div class="sl-key"><span>រឿងនិទានប្រជាប្រិយ ត្រូវបានបញ្ជាក់ថាជារឿងនិទាន</span><span>ផ្នែកប្រវត្តិសាស្ត្រ មានប្រភពឯកសារយោង</span><span>អានដោយឥតគិតថ្លៃ</span></div></section>
{card_km(feat, True)}
<div class="sl-grid">
{chr(10).join(card_km(a) for a in ARTICLES[1:])}
</div>
<h2 class="sl-h">ស្វែងយល់បន្ថែម</h2>
<ul class="sl-links">{links_km}</ul>
<p class="note">{e(NOTE_KM)}</p>
<a class="back" href="../blog.html">← ត្រឡប់ទៅប្លុក MyBirthSign</a>
</div>""" if HAS_KM else ""
page = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Zodiac Stories &amp; Legends: Chinese Zodiac Folk Tales | MyBirthSign</title><meta name="description" content="{e(DESC)}">
<link rel="canonical" href="{SITE}/blog/{LANDING}">
<meta property="og:type" content="website"><meta property="og:site_name" content="MyBirthSign"><meta property="og:title" content="{e(TITLE)}"><meta property="og:description" content="{e(DESC)}"><meta property="og:image" content="{SITE}/{feat['image']['src'].replace('.webp', '-og.jpg')}"><meta property="og:image:alt" content="{e(feat['image']['alt'])}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="{SITE}/{feat['image']['src'].replace('.webp', '-og.jpg')}">
<link rel="icon" href="../favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="../css/style.css">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADS}" crossorigin="anonymous"></script>
<style>{STYLE}</style></head>
<body class="fx-page">
{header}
<main class="sl">{'<div data-lang-content="en">' if HAS_KM else ''}
<section class="sl-hero"><p class="eyebrow">MyBirthSign Blog</p><h1>{e(TITLE)}</h1>
<p>Why does the Rat come first? Why did the flying Dragon finish fifth? These are the stories people tell about the twelve animals of the Chinese zodiac, alongside what history actually records about where the animals came from.</p>
<div class="sl-key"><span>Folk tales are labelled as folk tales</span><span>History comes with sources</span><span>Free to read</span></div></section>
{card(feat, True)}
<div class="sl-grid">
{grid}
</div>
<h2 class="sl-h">Explore more</h2>
<ul class="sl-links">{links}</ul>
<p class="note">{e(NOTE)}</p>
<a class="back" href="../blog.html">← Back to the MyBirthSign Blog</a>
{'</div>' if HAS_KM else ''}{main_km}
</main>
<footer class="site-footer"><div class="container"><a href="../about.html">About</a> · <a href="../privacy.html">Privacy Policy</a> · <a href="../terms.html">Terms of Use</a> · <a href="../contact.html">Contact</a><p>© 2026 MyBirthSign. Traditional zodiac stories for culture and entertainment.</p></div></footer><script src="../js/i18n.js"></script>
<script src="../js/app.js"></script></body></html>
"""
open(os.path.join(ROOT, "blog", f"{LANDING}.html"), "w", encoding="utf-8").write(page)

# ---- 3. blog.html card (top of English "Latest Articles") and sitemap
bp = os.path.join(ROOT, "blog.html")
b = open(bp, encoding="utf-8").read()
m = re.search(r'(<section class="bv2-section bv2-latest-section" id="latest-articles-en">.*?<div class="bv2-latest-grid">\n)(.*?)(  </div>\n</section>)', b, re.S)
assert m, "English latest-articles grid not found"
lcard = (f'    <a class="bv2-latest-card" href="blog/{LANDING}.html"><img src="{feat["image"]["src"].replace(".webp", "-card.webp")}" alt="{e(feat["image"]["alt"])}" loading="lazy" width="440" height="260">'
         f'<div class="bv2-latest-body"><p class="bv2-latest-kicker">Zodiac Stories &amp; Legends</p><h3>{e(TITLE)}</h3><p>The Great Race, the Rat\'s trick, the Dragon\'s kindness and more: eight stories behind the twelve animals.</p>'
         f'<span class="bv2-latest-read">Read the stories →</span></div></a>\n')
g = re.sub(rf'[ \t]*<a class="bv2-latest-card" href="blog/{LANDING}\.html">.*?</a>\n', "", m.group(2), flags=re.S)
b = b[:m.start(2)] + lcard + g + b[m.end(2):]
if HAS_KM:   # the same card in the Khmer "Latest Articles"
    mk = re.search(r'(<section class="bv2-section bv2-latest-section" id="latest-articles-km">.*?<div class="bv2-latest-grid">\n)(.*?)(  </div>\n</section>)', b, re.S)
    assert mk, "Khmer latest-articles grid not found"
    kcard = (f'    <a class="bv2-latest-card" href="blog/{LANDING}.html"><img src="{feat["image"]["src"].replace(".webp", "-card.webp")}" alt="{e(KM[feat["slug"]]["image"]["alt"])}" loading="lazy" width="440" height="260">'
             f'<div class="bv2-latest-body"><p class="bv2-latest-kicker">{e(TITLE_KM)}</p><h3>{e(TITLE_KM)}</h3><p>ការប្រណាំងដ៏ធំ ល្បិចរបស់កណ្ដុរ ចិត្តល្អរបស់នាគ និងរឿងផ្សេងៗទៀត៖ រឿងចំនួន 8 នៅពីក្រោយសត្វទាំងដប់ពីរ។</p>'
             f'<span class="bv2-latest-read">អានរឿង →</span></div></a>\n')
    gk = re.sub(rf'[ \t]*<a class="bv2-latest-card" href="blog/{LANDING}\.html">.*?</a>\n', "", mk.group(2), flags=re.S)
    b = b[:mk.start(2)] + kcard + gk + b[mk.end(2):]
open(bp, "w", encoding="utf-8").write(b)
sp = os.path.join(ROOT, "sitemap.xml")
sm = open(sp, encoding="utf-8").read()
loc = f"{SITE}/blog/{LANDING}.html"
if loc not in sm:
    open(sp, "w", encoding="utf-8").write(sm.replace("</urlset>", f"  <url><loc>{loc}</loc></url>\n</urlset>"))
print("landing page:", LANDING, "| reading times:", read_min)
