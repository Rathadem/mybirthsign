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
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from next_steps import CSS as NEXT_CSS, box as next_box

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
         "@media(max-width:620px){.festival-article .facts{grid-template-columns:1fr}}" + NEXT_CSS)

# header/nav: copied from an existing guide so menus stay identical across the site
tpl = open(os.path.join(ROOT, "blog", "cambodia-peace-day-december-29.html"), encoding="utf-8").read()
header = re.search(r'<header class="site-header">.*?</header>', tpl, re.S).group(0)

from datetime import date
pub = date.fromisoformat(spec["published"])
pub_txt = f"{pub.strftime('%B')} {pub.day}, {pub.year}"
og_img = f"{SITE}/{spec['og_image']}" if spec.get("og_image") else f"{SITE}/{img['src']}" if img else f"{SITE}/images/guides/cambodian-holidays-card.webp"

ld = {"@context": "https://schema.org", "@graph": [
    {"@type": "Article", "headline": title, "description": desc, "image": og_img, "datePublished": spec["published"],
     "dateModified": spec.get("modified", spec["published"]), "author": {"@type": "Person", "name": "Ratha", "url": f"{SITE}/about"},
     "publisher": {"@type": "Organization", "name": "MyBirthSign"}, "mainEntityOfPage": f"{SITE}/blog/{slug}"},
    {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", "", a)}} for q, a in spec["faq"]]}]}

# Photos with a free licence (e.g. from Wikimedia Commons) carry "credit": {author, page, licence, licence_url, via, changes}.
# They get a gold photo frame and the author / licence / source line the licence asks for under the picture.
STYLE += (".festival-article figure.photo{position:relative;border:1px solid rgba(226,189,97,.75);box-shadow:0 0 0 5px rgba(226,189,97,.09),0 0 34px rgba(226,189,97,.16),0 22px 44px rgba(0,0,0,.5)}"
          ".festival-article figure.photo::before,.festival-article figure.photo::after{content:'';position:absolute;top:10px;width:30px;height:30px;border:2px solid #e9ca79;pointer-events:none;z-index:1;opacity:.9}"
          ".festival-article figure.photo::before{left:10px;border-right:0;border-bottom:0;border-radius:10px 0 0 0}"
          ".festival-article figure.photo::after{right:10px;border-left:0;border-bottom:0;border-radius:0 10px 0 0}"
          ".festival-article figure.photo figcaption{background:linear-gradient(180deg,#1f1a3c,#15122e);border-top:1px solid rgba(226,189,97,.4)}"
          ".festival-article figure.photo .credit{display:block;margin-top:4px;font-size:.8rem;line-height:1.5;color:#b9b0d6}"
          ".festival-article figure.photo .credit a{color:#e2bd61}"
          ".festival-article figure.graphic{border:0;background:none;border-radius:22px}.festival-article figure.graphic figcaption{padding:10px 4px 0}"
          # timeline block (class tl-box) and bar chart block (class bars-box), in the same gold frame as the photos
          ".festival-article .tl-box,.festival-article .bars-box{margin:26px 0 34px;padding:22px 24px 12px;border:1px solid rgba(226,189,97,.75);border-radius:18px;"
          "background:radial-gradient(120% 80% at 100% 0,rgba(226,189,97,.10),transparent 60%),#15122e;box-shadow:0 0 0 5px rgba(226,189,97,.09),0 18px 40px rgba(0,0,0,.45)}"
          ".festival-article .box-title{margin:0;font-family:'Playfair Display',Georgia,serif;font-size:1.45rem;line-height:1.3;color:#ffe4a0}"
          ".festival-article .box-sub{margin:2px 0 18px;color:#c9bff0;font-size:.9rem}"
          ".festival-article .tl{list-style:none;margin:0;padding:0}"
          ".festival-article .tl li{position:relative;display:grid;grid-template-columns:96px 1fr;column-gap:40px;padding:0 0 20px}"
          ".festival-article .tl li::before{content:'';position:absolute;left:109px;top:7px;width:14px;height:14px;border-radius:50%;background:#f2d27d;box-shadow:0 0 0 5px rgba(242,210,125,.18)}"
          ".festival-article .tl li::after{content:'';position:absolute;left:115px;top:26px;bottom:-4px;width:2px;background:#c9a54a}"
          ".festival-article .tl li:last-child::after{display:none}"
          ".festival-article .tl li.maybe::before{background:#15122e;border:2px solid #f2d27d;width:10px;height:10px}"
          ".festival-article .tl li.before-maybe::after{background:repeating-linear-gradient(#c9a54a 0 6px,transparent 6px 12px)}"
          ".festival-article .tl time{font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#f2d27d;text-align:right;line-height:1.6}"
          ".festival-article .tl b{display:block;color:#fff;font-size:1.05rem;line-height:1.5}"
          ".festival-article .tl span{display:block;color:#cfc6ee;font-size:.95rem;line-height:1.6}"
          "@media(max-width:560px){.festival-article .tl li{grid-template-columns:1fr;padding-left:32px}.festival-article .tl li::before{left:2px}"
          ".festival-article .tl li.maybe::before{left:4px}.festival-article .tl li::after{left:8px}.festival-article .tl time{text-align:left}}"
          ".festival-article .bar-row{display:grid;grid-template-columns:180px 1fr;gap:6px 18px;align-items:center;margin:0 0 16px}"
          ".festival-article .bar-l{color:#fff;font-weight:700;line-height:1.35}.festival-article .bar-l small{display:block;color:#b9b0d6;font-weight:400;font-size:.85rem}"
          ".festival-article .bar{position:relative;display:block;height:46px;border-radius:10px;background:rgba(255,255,255,.04)}"
          ".festival-article .bar i{position:absolute;top:0;bottom:0;left:0;border-radius:10px}"
          ".festival-article .bar i.lo{background:#9b88d6}.festival-article .bar i.hi{background:#d8b44a;border-radius:10px 0 0 10px}"
          ".festival-article .bar i.range{background:repeating-linear-gradient(135deg,rgba(216,180,74,.55) 0 8px,rgba(216,180,74,.3) 8px 16px);border:1px solid #d8b44a;border-left:0;border-radius:0 10px 10px 0}"
          ".festival-article .bar em{position:absolute;top:50%;transform:translateY(-50%);font-style:normal;font-weight:700;font-size:1.15rem;white-space:nowrap}"
          ".festival-article .bar em.out{color:#fff}.festival-article .bar em.in{left:14px;color:#1a1430}"
          ".festival-article .bars-note{margin:4px 0 8px;color:#cfc6ee;font-size:.9rem}"
          "@media(max-width:560px){.festival-article .bar-row{grid-template-columns:1fr}}")


def photo_cls(im):   # "cls": "graphic" for a drawn map or chart that has its own frame
    return f' class="{e(im["cls"])}"' if im.get("cls") else ' class="photo"' if im.get("credit") else ""


def credit_html(im):
    c = im.get("credit")
    if not c:
        return ""
    a = lambda href, txt, rel="noopener": f'<a href="{e(href)}" target="_blank" rel="{rel}">{e(txt)}</a>' if href else e(txt)
    return (f'<span class="credit">Photo: {a(c.get("page"), c["author"])} · {a(c.get("licence_url"), c["licence"], "noopener license")}'
            f', via {e(c.get("via", "Wikimedia Commons"))}{"; " + e(c["changes"]) if c.get("changes") else ""}</span>')


parts = []
for s in spec["sections"]:
    body = "".join(f"<p>{p}</p>" for p in s.get("paras", []))
    if s.get("list"):
        body += "<ul>" + "".join(f"<li>{li}</li>" for li in s["list"]) + "</ul>"
    for p in s.get("after", []):
        body += f"<p>{p}</p>"
    if s.get("html"):   # optional ready-made block after the text (a timeline, a small bar chart …), written as HTML
        body += s["html"]
    si = s.get("img")  # optional picture(s) after the section text (lazy-loaded); one picture or a list of them
    for im in (si if isinstance(si, list) else [si] if si else []):
        body += (f'<figure{photo_cls(im)}><img src="../{im["src"]}" alt="{e(im["alt"])}" width="{im["width"]}" height="{im["height"]}" loading="lazy" decoding="async">'
                 f'<figcaption>{e(im["caption"])}{credit_html(im)}</figcaption></figure>')
    parts.append(f"<section><h2>{e(s['h2'])}</h2>\n{body}</section>")
facts = "".join(f'<div class="fact"><strong>{e(k)}</strong>{e(v)}</div>' for k, v in spec["facts"])
FX = spec.get("fx")  # optional CSS-only particle animation over the main picture: wood, fire, earth, metal or water
if FX:
    import random
    assert FX in ("wood", "fire", "earth", "metal", "water")
    rnd = random.Random(slug)
    dots = "".join(f'<i style="--x:{rnd.randint(2, 97)}%;--y:{rnd.randint(8, 92)}%;--d:{rnd.uniform(5, 11):.1f}s;--t:-{rnd.uniform(0, 10):.1f}s;--s:{rnd.randint(6, 13)}px"></i>' for _ in range(28))
    STYLE += (".festival-article figure.fx{position:relative}.fx-layer{position:absolute;inset:0;bottom:auto;aspect-ratio:900/373;pointer-events:none;overflow:hidden}"
              ".fx-layer i{position:absolute;left:var(--x);top:var(--y);width:var(--s);height:var(--s);border-radius:50%;opacity:0;animation:var(--fx) var(--d) linear var(--t) infinite}"
              ".fx-wood i{--fx:fxRise;background:radial-gradient(circle,#d8ffb0,#5fc46e 55%,transparent 70%);box-shadow:0 0 14px 3px #7dff9a}"
              ".fx-wood i:nth-child(3n){--fx:fxLeaf;border-radius:0 80% 0 80%;background:#ff9fc0;box-shadow:none;top:-6%}"
              ".fx-fire i{--fx:fxEmber;top:auto;bottom:-4%;background:radial-gradient(circle,#fff3b0,#ff8a3d 50%,transparent 70%);box-shadow:0 0 16px 4px #ff7a2e}"
              ".fx-earth i{--fx:fxDrift;background:radial-gradient(circle,#fff0b8,#e3ab4b 55%,transparent 70%);box-shadow:0 0 14px 3px #ffd27a}"
              ".fx-metal i{--fx:fxTwinkle;border-radius:0;background:#fff;clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);filter:drop-shadow(0 0 6px #fff) drop-shadow(0 0 10px #c9d6ff)}"
              ".fx-metal i:nth-child(3n){--fx:fxLeaf;clip-path:none;border-radius:0 80% 0 80%;background:#e9963f;filter:none;top:-6%}"
              ".fx-water i{--fx:fxRipple;top:auto;bottom:calc(var(--y) / 4);width:calc(var(--s) * 4);height:calc(var(--s) * 1.3);background:none;border:2px solid rgba(190,228,255,.9);box-shadow:0 0 10px rgba(124,196,255,.6)}"
              ".fx-water i:nth-child(2n){--fx:fxRise;width:var(--s);height:var(--s);bottom:auto;border:0;background:radial-gradient(circle,#e6f6ff,#4ea2f0 55%,transparent 70%);box-shadow:0 0 14px 3px #7cc4ff}"
              "@keyframes fxRise{0%{opacity:0;transform:translate(0,0)}20%{opacity:.95}80%{opacity:.8}100%{opacity:0;transform:translate(14px,-70px)}}"
              "@keyframes fxLeaf{0%{opacity:0;transform:translate(0,0) rotate(0)}15%{opacity:.9}100%{opacity:0;transform:translate(-60px,320px) rotate(400deg)}}"
              "@keyframes fxEmber{0%{opacity:0;transform:translate(0,0) scale(1)}15%{opacity:1}100%{opacity:0;transform:translate(-18px,-340px) scale(.4)}}"
              "@keyframes fxDrift{0%,100%{opacity:0;transform:translate(0,0)}30%{opacity:.85}50%{transform:translate(22px,-16px)}70%{opacity:.7}}"
              "@keyframes fxTwinkle{0%,100%{opacity:0;transform:scale(.3) rotate(0)}50%{opacity:1;transform:scale(1.25) rotate(45deg)}}"
              "@keyframes fxRipple{0%{opacity:0;transform:scale(.3)}25%{opacity:.85}100%{opacity:0;transform:scale(2.2)}}"
              "@media(prefers-reduced-motion:reduce){.fx-layer{display:none}}")
fig_cls = ' class="fx"' if FX else (photo_cls(img) if img else "")
figure = (f'<figure{fig_cls}><img src="../{img["src"]}" alt="{e(img["alt"])}" width="{img["width"]}" height="{img["height"]}" fetchpriority="high" decoding="async">'
          + (f'<span class="fx-layer fx-{FX}" aria-hidden="true">{dots}</span>' if FX else "") + f'<figcaption>{e(img["caption"])}{credit_html(img)}</figcaption></figure>') if img else ""
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

main_html = f"""<p class="eyebrow">{e(spec['eyebrow'])}</p><h1>{e(title)}</h1><p class="lead">{spec['lead']}</p><p class="meta">Published <time datetime="{spec['published']}">{pub_txt}</time> · By <a href="../about">Ratha</a>, MyBirthSign</p><div class="facts">{facts}</div>{figure}{video}
{chr(10).join(parts)}
{next_box("en")}
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
    main_km = f"""<p class="eyebrow">{e(K['eyebrow'])}</p><h1>{e(K['title'])}</h1><p class="lead">{K['lead']}</p><p class="meta">ចុះផ្សាយ <time datetime="{K['published']}">{kpub.day:02d}/{kpub.month:02d}/{kpub.year}</time> · ដោយ <a href="../about">Ratha</a>, MyBirthSign</p><div class="facts">{"".join(f'<div class="fact"><strong>{e(k)}</strong>{e(v)}</div>' for k, v in K["facts"])}</div>{kfig}
{secs(K["sections"])}
{next_box("km")}
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
