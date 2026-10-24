"""Build one weekly blog article from a JSON spec and list it on the site.

    python3 scripts/content/weekly-article.py scripts/content/weekly/<slug>.json

Writes blog/<slug>.html in the same layout as the Cambodian holiday guides (festival-article),
adds a card at the top of the English "Latest Articles" grid in blog.html, and adds the page to
sitemap.xml. Re-running with the same JSON updates the page and does not duplicate the card or
sitemap entry. English only (like the other holiday guides).

JSON fields:
  slug, title, seo_title (optional), description, eyebrow, lead, kicker, card_text,
  published (YYYY-MM-DD), facts: [[label, value], ...] (3 items),
  image: {src, alt, width, height, caption} (optional; src relative to the site root, e.g. images/guides/x.webp),
  sections: [{h2, paras: [html, ...], list: [html, ...] (optional)}, ...],
  faq: [[question, answer], ...], sources: [[title, url, note], ...],
  related: [[label, href], ...]   (href relative to /blog/, e.g. "chol-vassa-buddhist-lent")
Optional: listing (default true; false = do not add a card to blog.html), note (text of the closing note box,
  "" for none), back ([label, href] for the back link, href relative to /blog/),
  youtube (a real YouTube video ID; the video is embedded only when this is set),
  label_folklore (true = add a "Folk tale" / "History" key under the lead).
  km: an optional Khmer version of the article — {title, eyebrow, lead, published, facts, image, sections, faq,
  source_notes (one Khmer note per entry of "sources"; the source titles stay as published), related, note, back,
  kicker, card_text}. The page then carries an English and a Khmer language block; the site build publishes the
  Khmer one at /km/blog/<slug> (no ads there) and lists it in blog.html's Khmer "Latest Articles". Western digits,
  dates written dd/mm/yyyy.
"""
import html, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SITE = "https://mybirthsign.com"
ADS = "ca-pub-9939402104083173"

spec = json.load(open(sys.argv[1], encoding="utf-8"))
e = lambda s: html.escape(s, quote=False).replace('"', "&quot;")   # text and double-quoted attributes
slug = spec["slug"]
assert re.fullmatch(r"[a-z0-9-]+", slug), "slug must be lowercase letters, digits and dashes"
title, desc = spec["title"], spec["description"]
seo_title = spec.get("seo_title", title)
img = spec.get("image")

STYLE = (".festival-article{max-width:900px;margin:40px auto;padding:0 22px;color:var(--text,#f3efff);line-height:1.8}"
         ".festival-article h1,.festival-article h2{font-family:'Playfair Display',Georgia,serif;line-height:1.2}"
         ".festival-article h1{font-size:clamp(2.2rem,5vw,3.7rem);color:#ffe4a0}.festival-article h2{margin-top:2rem;color:#e9ca79}"
         ".festival-article h3{color:#f2d27d}"
         ".festival-article .eyebrow{color:#e2bd61;text-transform:uppercase;letter-spacing:.13em;font-weight:700}"
         ".festival-article figure{margin:26px 0 34px;border:1px solid #6f5a9e;border-radius:18px;overflow:hidden;background:#15122e}"
         ".festival-article figure img{display:block;width:100%;height:auto;object-fit:cover}"
         ".festival-article figcaption{padding:12px 16px;color:#d7d1e8;font-size:.92rem}"
         ".festival-article .facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:24px 0}"
         ".festival-article .fact{padding:16px;border:1px solid #7e673a;border-radius:12px;background:#1b1734}"
         ".festival-article .fact strong{display:block;color:#f2d27d}"
         ".festival-article .note{border-left:3px solid #d8b962;padding:12px 16px;background:#211a39}"
         ".festival-article .meta{color:#cfc6ee;font-size:.9rem}"
         ".festival-article a{color:#f2d27d}.festival-article .back{display:inline-block;margin:20px 0;color:#f2d27d}"
         ".festival-article .video{position:relative;aspect-ratio:16/9;margin:0 0 30px;border-radius:14px;overflow:hidden}"
         ".festival-article .video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}"
         ".festival-article .tale{border:1px solid #6f5a9e;border-radius:14px;padding:16px 18px;background:#1b1734;margin:20px 0}"
         "html[lang=km] .festival-article h1,html[lang=km] .festival-article h2,html[lang=km] .festival-article h3{font-family:'Kantumruy Pro','Noto Sans Khmer',sans-serif;line-height:1.5}"
         "html[lang=km] .festival-article h1{font-size:clamp(1.9rem,4.4vw,3rem)}html[lang=km] .festival-article .eyebrow{letter-spacing:0}"
         "@media(max-width:620px){.festival-article .facts{grid-template-columns:1fr}}")

# header/nav: copied from an existing guide so menus stay identical across the site
tpl = open(os.path.join(ROOT, "blog", "cambodia-peace-day-december-29.html"), encoding="utf-8").read()
header = re.search(r'<header class="site-header">.*?</header>', tpl, re.S).group(0)

from datetime import date
pub = date.fromisoformat(spec["published"])
pub_txt = f"{pub.strftime('%B')} {pub.day}, {pub.year}"
og_img = f"{SITE}/{spec['og_image']}" if spec.get("og_image") else f"{SITE}/{img['src']}" if img else f"{SITE}/images/guides/cambodian-holidays-card.webp"

ld = {"@context": "https://schema.org", "@graph": [
    {"@type": "Article", "headline": title, "description": desc, "image": og_img, "datePublished": spec["published"],
     "dateModified": spec.get("modified", spec["published"]), "author": {"@type": "Organization", "name": "MyBirthSign"},
     "publisher": {"@type": "Organization", "name": "MyBirthSign"}, "mainEntityOfPage": f"{SITE}/blog/{slug}"},
    {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", "", a)}} for q, a in spec["faq"]]}]}

parts = []
for s in spec["sections"]:
    body = "".join(f"<p>{p}</p>" for p in s.get("paras", []))
    if s.get("list"):
        body += "<ul>" + "".join(f"<li>{li}</li>" for li in s["list"]) + "</ul>"
    for p in s.get("after", []):
        body += f"<p>{p}</p>"
    parts.append(f"<section><h2>{e(s['h2'])}</h2>\n{body}</section>")
facts = "".join(f'<div class="fact"><strong>{e(k)}</strong>{e(v)}</div>' for k, v in spec["facts"])
figure = (f'<figure><img src="../{img["src"]}" alt="{e(img["alt"])}" width="{img["width"]}" height="{img["height"]}" fetchpriority="high" decoding="async">'
          f'<figcaption>{e(img["caption"])}</figcaption></figure>') if img else ""
faq = "".join(f"<h3>{e(q)}</h3><p>{a}</p>" for q, a in spec["faq"])
DEFAULT_NOTE = "Dates for lunar observances follow the Khmer lunar calendar and can differ by a day locally. Check with your pagoda or official announcements for exact times."
note_txt = spec.get("note", DEFAULT_NOTE)
note = f'<p class="note">{note_txt}</p>' if note_txt else ""
back_label, back_href = spec.get("back", ["Back to the MyBirthSign Blog", "../blog.html"])
yt = spec.get("youtube")
assert not yt or re.fullmatch(r"[A-Za-z0-9_-]{11}", yt), "youtube must be a real 11-character video ID"
video = (f'<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/{yt}" title="{e(title)} (video)" loading="lazy" '
         f'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>') if yt else ""
sources = "".join(f'<li><a href="{e(u)}" target="_blank" rel="noopener">{e(t)}</a> — {e(n)}</li>' for t, u, n in spec["sources"])
related = " · ".join(f'<a href="{e(h)}">{e(l)}</a>' for l, h in spec["related"])

main_html = f"""<p class="eyebrow">{e(spec['eyebrow'])}</p><h1>{e(title)}</h1><p class="lead">{spec['lead']}</p><p class="meta">Published <time datetime="{spec['published']}">{pub_txt}</time> · MyBirthSign</p><div class="facts">{facts}</div>{figure}{video}
{chr(10).join(parts)}
<section><h2>Frequently asked questions</h2>{faq}</section>
<section><h2>Sources and further reading</h2><ul>{sources}</ul>
{note}</section>
<p><strong>Explore more:</strong> {related}</p><a class="back" href="{back_href}">← {back_label}</a>"""
K = spec.get("km")
if K:
    def secs(sl):
        out = []
        for s in sl:
            body = "".join(f"<p>{p}</p>" for p in s.get("paras", []))
            if s.get("list"): body += "<ul>" + "".join(f"<li>{li}</li>" for li in s["list"]) + "</ul>"
            for p in s.get("after", []): body += f"<p>{p}</p>"
            out.append(f"<section><h2>{e(s['h2'])}</h2>\n{body}</section>")
        return chr(10).join(out)
    kimg = K.get("image")
    kfig = (f'<figure><img src="../{kimg["src"]}" alt="{e(kimg["alt"])}" width="{kimg["width"]}" height="{kimg["height"]}" decoding="async">'
            f'<figcaption>{e(kimg["caption"])}</figcaption></figure>') if kimg else ""
    kpub = date.fromisoformat(K["published"])
    assert len(K["source_notes"]) == len(spec["sources"]), "km.source_notes needs one note per source"
    ksrc = "".join(f'<li><a href="{e(u)}" target="_blank" rel="noopener">{e(t)}</a> — {e(n)}</li>' for (t, u, _), n in zip(spec["sources"], K["source_notes"]))
    kback = K.get("back", ["ត្រឡប់ទៅប្លុក MyBirthSign", "../blog.html"])
    main_km = f"""<p class="eyebrow">{e(K['eyebrow'])}</p><h1>{e(K['title'])}</h1><p class="lead">{K['lead']}</p><p class="meta">ចុះផ្សាយ <time datetime="{K['published']}">{kpub.day:02d}/{kpub.month:02d}/{kpub.year}</time> · MyBirthSign</p><div class="facts">{"".join(f'<div class="fact"><strong>{e(k)}</strong>{e(v)}</div>' for k, v in K["facts"])}</div>{kfig}
{secs(K["sections"])}
<section><h2>សំណួរដែលគេសួរញឹកញាប់</h2>{"".join(f"<h3>{e(q)}</h3><p>{a}</p>" for q, a in K["faq"])}</section>
<section><h2>ប្រភព និងឯកសារអានបន្ថែម</h2><ul>{ksrc}</ul>
{f'<p class="note">{K["note"]}</p>' if K.get("note") else ""}</section>
<p><strong>អានបន្ថែម៖</strong> {" · ".join(f'<a href="{e(h)}">{e(l)}</a>' for l, h in K["related"])}</p><a class="back" href="{kback[1]}">← {kback[0]}</a>"""
    main_html = f'<div data-lang-content="en">{main_html}</div>\n<div data-lang-content="km" lang="km">{main_km}</div>'

page = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(seo_title)} | MyBirthSign</title><meta name="description" content="{e(desc)}">
<link rel="canonical" href="{SITE}/blog/{slug}">
<meta property="og:type" content="article"><meta property="og:site_name" content="MyBirthSign"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:image" content="{og_img}">{f'<meta property="og:image:alt" content="{e(img["alt"])}">' if img else ''}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="{og_img}">
<link rel="icon" href="../favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="../css/style.css">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADS}" crossorigin="anonymous"></script>
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>{STYLE}</style></head>
<body class="fx-page">
{header}
<main class="festival-article">{main_html}</main>
<footer class="site-footer"><div class="container"><a href="../about.html">About</a> · <a href="../privacy.html">Privacy Policy</a> · <a href="../terms.html">Terms of Use</a> · <a href="../contact.html">Contact</a><p>© {pub.year} MyBirthSign. Cultural information for education; verify official announcements for current events.</p></div></footer><script src="../js/i18n.js"></script>
<script src="../js/app.js"></script></body></html>
"""
open(os.path.join(ROOT, "blog", f"{slug}.html"), "w", encoding="utf-8").write(page)

# blog.html: newest first in the English "Latest Articles" grid
if spec.get("listing", True) is False:
    sp = os.path.join(ROOT, "sitemap.xml"); sm = open(sp, encoding="utf-8").read(); loc = f"{SITE}/blog/{slug}.html"
    if loc not in sm:
        open(sp, "w", encoding="utf-8").write(sm.replace("</urlset>", f"  <url><loc>{loc}</loc></url>\n</urlset>"))
    print("wrote blog/%s.html (not listed on blog.html), sitemap updated" % slug); sys.exit(0)
bp = os.path.join(ROOT, "blog.html")
b = open(bp, encoding="utf-8").read()
card_img = img["src"] if img else "images/guides/cambodian-holidays-card.webp"
card_alt = img["alt"] if img else "Cambodian holidays"
card = (f'    <a class="bv2-latest-card" href="blog/{slug}.html"><img src="{card_img}" alt="{e(card_alt)}" loading="lazy" width="440" height="260">'
        f'<div class="bv2-latest-body"><p class="bv2-latest-kicker">{e(spec["kicker"])}</p><h3>{e(title)}</h3><p>{e(spec["card_text"])}</p>'
        f'<span class="bv2-latest-read">Read article →</span></div></a>\n')
m = re.search(r'(<section class="bv2-section bv2-latest-section" id="latest-articles-en">.*?<div class="bv2-latest-grid">\n)(.*?)(  </div>\n</section>)', b, re.S)
assert m, "English latest-articles grid not found in blog.html"
grid = re.sub(rf'[ \t]*<a class="bv2-latest-card" href="blog/{re.escape(slug)}\.html">.*?</a>\n', "", m.group(2), flags=re.S)
b = b[:m.start(2)] + card + grid + b[m.end(2):]
if K:
    ki = K.get("image") or img
    kcard = (f'    <a class="bv2-latest-card" href="blog/{slug}.html"><img src="{ki["src"] if ki else card_img}" alt="{e(ki["alt"] if ki else card_alt)}" loading="lazy" width="440" height="260">'
             f'<div class="bv2-latest-body"><p class="bv2-latest-kicker">{e(K["kicker"])}</p><h3>{e(K["title"])}</h3><p>{e(K["card_text"])}</p>'
             f'<span class="bv2-latest-read">អានអត្ថបទ →</span></div></a>\n')
    mk = re.search(r'(<section class="bv2-section bv2-latest-section" id="latest-articles-km">.*?<div class="bv2-latest-grid">\n)(.*?)(  </div>\n</section>)', b, re.S)
    assert mk, "Khmer latest-articles grid not found in blog.html"
    gk = re.sub(rf'[ \t]*<a class="bv2-latest-card" href="blog/{re.escape(slug)}\.html">.*?</a>\n', "", mk.group(2), flags=re.S)
    b = b[:mk.start(2)] + kcard + gk + b[mk.end(2):]
open(bp, "w", encoding="utf-8").write(b)

# sitemap.xml
sp = os.path.join(ROOT, "sitemap.xml")
sm = open(sp, encoding="utf-8").read()
loc = f"{SITE}/blog/{slug}.html"
if loc not in sm:
    sm = sm.replace("</urlset>", f"  <url><loc>{loc}</loc></url>\n</urlset>")
    open(sp, "w", encoding="utf-8").write(sm)
print("wrote blog/%s.html, listed in blog.html and sitemap.xml" % slug)
