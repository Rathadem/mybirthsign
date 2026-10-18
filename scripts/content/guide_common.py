"""Shared page assembly for the calendar guides (same head, header, footer and scripts as the other guides).
Used by cambodian-holidays-build.py, animal-year-sak-build.py and leap-months-build.py."""
import json, html, re

R = "/home/claude/mybirthsign/"
ENM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
KMM = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]


def dfmt(lang, iso, year=True):
    y, m, d = map(int, iso.split("-"))
    if lang == "zh": return (f"{y}年" if year else "") + f"{m}月{d}日"
    if lang == "km": return f"{d} {KMM[m-1]}" + (f" {y}" if year else "")
    return f"{d} {ENM[m-1]}" + (f" {y}" if year else "")


def hero(t, img, alt):
    return f'''  <header class="fe-hero hd-hero">
    <img class="fe-hero-bg" src="../images/guides/{img}" width="1600" height="560" alt="{html.escape(alt)}" fetchpriority="high">
    <div class="fe-hero-in">
      <p class="fe-eyebrow">{t["eyebrow"]}</p>
      <h1>{t["h1"]}</h1>
      <p class="fe-sub"><span aria-hidden="true">✦</span> {t["sub"]} <span aria-hidden="true">✦</span></p>
      <p class="fe-lead">{t["lead"]}</p>
      <p class="fe-meta">{t["meta"]}</p>
    </div>
  </header>'''


def share(t, lang, slug, points):
    card = {"cardType": "guide", "lang": lang, "eyebrow": html.unescape(t["eyebrow"]), "title": t["h1"], "sub": t["sub"], "points": points}
    return f'  <div class="share-row" data-share data-share-card="{html.escape(json.dumps(card, ensure_ascii=False), quote=True)}" data-share-url="/blog/{slug}.html"></div>'


def text(ps): return '  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in ps) + "</div>"
def h2(s): return f'  <h2 class="fe-h2">{s}</h2>'
def faq(items): return '  <div class="klb-faq">' + "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in items) + "</div>"
def sources(t): return f'  <h3 class="klb-src-h">{t["srcH"]}</h3>\n  <ul class="klb-src">' + "".join(f"<li>{s}</li>" for s in t["src"]) + "</ul>"


def build_page(slug, title, desc, og, bodies, faq_en, hero_img, extra_js="", date="2026-10-18", crumb=None):
    url = f"https://mybirthsign.com/blog/{slug}"
    src = open(R + "blog/how-to-calculate-zodiac-sign.html").read()
    head, rest = src.split('<div data-lang-content="en">', 1)
    foot = rest[rest.index('<footer class="site-footer">'):]
    foot = foot[:foot.index('<script src="../js/zodiac-data.js" defer></script>') + len('<script src="../js/zodiac-data.js" defer></script>')] + "\n" + extra_js + \
        '\n<script src="../js/khmer-lunar.js" defer></script>\n</body>\n</html>\n'
    head = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)} | MyBirthSign</title>", head, flags=re.S)
    head = head.replace("https://mybirthsign.com/blog/how-to-calculate-zodiac-sign.html", url)
    head = re.sub(r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + html.escape(title, quote=True), head)
    head = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = head.replace("https://mybirthsign.com/images/og/calculate-zodiac.jpg", og)
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "headline": title, "description": desc, "image": og, "datePublished": date, "dateModified": date, "inLanguage": "en",
         "author": {"@type": "Organization", "name": "MyBirthSign"}, "publisher": {"@type": "Organization", "name": "MyBirthSign", "url": "https://mybirthsign.com/"}, "mainEntityOfPage": url},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mybirthsign.com/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mybirthsign.com/blog"},
            {"@type": "ListItem", "position": 3, "name": crumb or title}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub("<[^>]+>", "", a)}} for q, a in faq_en]}]}
    head = re.sub(r'<script type="application/ld\+json">.*?</script>', lambda m: '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace("<", "\\u003c") + "</script>", head, flags=re.S)
    head = head.replace('href="../images/guides/khmer-lunar-wide.webp"', f'href="../images/guides/{hero_img}"')
    out = head + "\n".join(f'<div data-lang-content="{l}">\n<article class="post container fe hc kny hd">\n{bodies[l]}\n</article>\n</div>' for l in ("en", "km", "zh")) + "\n\n" + foot
    open(R + f"blog/{slug}.html", "w").write(out)
    print("wrote", slug, len(out))
