"""Chinese zodiac birth-year pages: one English page per year (blog/chinese-zodiac-<year>.html) and a hub page
(blog/chinese-zodiac-years-chart.html) that links them all and is the only one listed on the blog.

    python3 scripts/content/year-pages.py            # writes the specs and builds every page with weekly-article.py

Every fact comes from the site's own data (js/zodiac-data.js): the Lunar New Year date that starts each year (the same
table the zodiac checker uses), the animal's traits, lucky colors, numbers and days, best matches and clash sign.
The element follows the last digit of the year and Yin/Yang follows odd/even, as on the five-elements pages; the
traditional stem-branch name is counted from 1984, a Jia-zi year. Specs go to scripts/content/years/.
"""
import json, os, re, subprocess, datetime as dt

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(HERE, "years")
FIRST, LAST = 1960, 2027
PUB = "2026-10-29"

src = open(os.path.join(ROOT, "js", "zodiac-data.js"), encoding="utf-8").read()
CNY = {int(k): v for k, v in re.findall(r'(\d{4}):"(\d\d-\d\d)"', src.split("const CNY_DATES")[1].split("};")[0])}
A = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
an = lambda y: A[(y - 1900) % 12]
EL = ["Metal", "Metal", "Water", "Water", "Wood", "Wood", "Fire", "Fire", "Earth", "Earth"]
STEMS = ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"]
BR = ["zi", "chou", "yin", "mao", "chen", "si", "wu", "wei", "shen", "you", "xu", "hai"]
pillar = lambda y: f"{STEMS[(y - 4) % 10]}-{BR[(y - 4) % 12]}"
assert pillar(1984) == "Jia-zi" and pillar(2026) == "Bing-wu" and pillar(2027) == "Ding-wei"

INFO = {}
for a in A:
    blk = re.search(r"\n  %s: \{(.*?)\n  \}" % a, src, re.S).group(1)
    g = lambda k: json.loads(re.search(r"%s: (\[[^\]]*\])" % k, blk).group(1))
    t = lambda k: re.search(r'%s: "([^"]*)"' % k, blk).group(1)
    INFO[a] = dict(nums=g("luckyNumbers"), colors=g("luckyColors"), days=g("luckyDays"), compat=g("compatible"),
                   clash=g("clash"), traits=t("traits"), weak=t("weaknesses"), careers=t("careers"))
ELB = {}
eb = src.split("const ELEMENT_INFO")[1].split("const ANIMAL_INFO")[0]
for e in ["Wood", "Fire", "Earth", "Metal", "Water"]:
    ELB[e] = re.search(r'%s: \{\s*blurb: "([^"]*)"' % e, eb).group(1)
TRI = [["Rat", "Dragon", "Monkey"], ["Ox", "Snake", "Rooster"], ["Tiger", "Horse", "Dog"], ["Rabbit", "Goat", "Pig"]]

def rel(a, year_animal):
    """the site's own rule: same / triangle / clash / neutral (plus the listed supportive matches)"""
    if a == year_animal: return "own"
    if year_animal in INFO[a]["clash"]: return "clash"
    if any(a in t and year_animal in t for t in TRI): return "triangle"
    if year_animal in INFO[a]["compat"] or a in INFO[year_animal]["compat"]: return "support"
    return "neutral"

def d(y, md):
    x = dt.date(y, int(md[:2]), int(md[3:])); return f"{x.day} {x.strftime('%B')} {x.year}"
def dminus(y, md):
    x = dt.date(y, int(md[:2]), int(md[3:])) - dt.timedelta(days=1); return f"{x.day} {x.strftime('%B')} {x.year}"
def join(xs):
    xs = [str(x) for x in xs]; return xs[0] if len(xs) == 1 else ", ".join(xs[:-1]) + " and " + xs[-1]
art = lambda w: "an" if w[0] in "AEIOU" else "a"

REL26 = {"own": "2026 is a Horse year, so Horse people are in their own year (ben ming nian) until 5 February 2027.",
         "clash": "it sits directly opposite the Horse, so 2026 is its clash year: a year to stay flexible and check plans twice.",
         "triangle": "it shares the Horse's triangle, so 2026 is traditionally one of its friendlier years.",
         "support": "it is listed as a supportive match of the Horse, so 2026 is traditionally a friendly year.",
         "neutral": "it has no special traditional relationship with the Horse, so 2026 is a neutral year."}
REL27 = {"own": "2027 is a Goat year, so Goat people are in their own year (ben ming nian).",
         "clash": "it sits directly opposite the Goat, so 2027 is its clash year.",
         "triangle": "it shares the Goat's triangle (Rabbit, Goat and Pig), so 2027 is traditionally favourable.",
         "support": "it is listed as a supportive match of the Goat, so 2027 is traditionally a friendly year.",
         "neutral": "it has no special traditional relationship with the Goat, so 2027 is a neutral year."}

SOURCES = [
    ["Hong Kong Observatory: “Heavenly Stems and Earthly Branches”", "https://www.hko.gov.hk/en/gts/time/stemsandbranches.htm", "the 60-part Gan-Zhi cycle used to name years, months, days and hours."],
    ["Wikipedia: “Sexagenary cycle”", "https://en.wikipedia.org/wiki/Sexagenary_cycle", "the ten stems and twelve branches, 1984 as the start of the present cycle, and the year changing at Lunar New Year."],
    ["Farmers' Almanac: “When Is Lunar New Year 2027?”", "https://www.farmersalmanac.com/when-chinese-new-year", "Lunar New Year falls on the second new moon after the winter solstice, between 21 January and 21 February."],
    ["New World Encyclopedia: “Wu xing”", "https://www.newworldencyclopedia.org/entry/Wu_xing", "the five elements and the generating and overcoming cycles."],
    ["Britannica: Chinese zodiac", "https://www.britannica.com/topic/Chinese-zodiac", "the zodiac as a classification of years in a repeating twelve-year cycle."],
]
NOTE = "Traditional Chinese zodiac reading for culture and entertainment, not a scientific prediction. Year dates follow the Lunar New Year table used by our zodiac checker."

def page(y):
    a, el, yy = an(y), EL[y % 10], "Yang" if y % 2 == 0 else "Yin"
    I, start, end = INFO[a], d(y, CNY[y]), dminus(y + 1, CNY[y + 1])
    prev_a, cny_jan = an(y - 1), CNY[y].startswith("01")
    # tense follows the dates: a past year "was", the current one "is" (began, ends), a future one "will be" (begins, ends)
    today = dt.date.fromisoformat(PUB)
    t0 = dt.date(y, int(CNY[y][:2]), int(CNY[y][3:])); t1 = dt.date(y + 1, int(CNY[y + 1][:2]), int(CNY[y + 1][3:])) - dt.timedelta(days=1)
    was, began, ended, fell = ("was", "began", "ended", "fell") if t1 < today else ("is", "began", "ends", "fell") if t0 <= today else ("will be", "begins", "ends", "falls")
    jan = (f"Lunar New Year {y} {fell} on <strong>{start}</strong>. Anyone born from 1 January {y} up to the day before belongs to the previous year's animal, the <strong>{prev_a}</strong>; from {start} on, the {a}."
           if cny_jan else
           f"Lunar New Year {y} {fell} on <strong>{start}</strong>, so <strong>everyone born in January {y}</strong>, and in February before that date, belongs to the previous year's animal, the <strong>{prev_a}</strong>.")
    same = [x for x in (y - 24, y - 12, y + 12, y + 24) if FIRST - 12 <= x <= 2040]
    r26, r27 = rel(a, "Horse"), rel(a, "Goat")
    sections = [
        {"h2": f"{y}: {art(yy)} {yy} {el} {a} year", "paras": [
            f"The Chinese zodiac year {y} {was} the <strong>Year of the {a}</strong>. It {began} with Lunar New Year on <strong>{start}</strong> and {ended} on <strong>{end}</strong>, the eve of the next Lunar New Year.",
            f"Each year also has an element and a Yin or Yang quality. {y} ends in {y % 10}, which makes it {art(el)} <strong>{el}</strong> year, and as {'an even' if y % 2 == 0 else 'an odd'} year it is <strong>{yy}</strong>. In the traditional stem-and-branch count, {y} is a <strong>{pillar(y)}</strong> year. The same {el} {a} combination comes round only once every 60 years: {y - 60} before it and {y + 60} after it."]},
        {"h2": f"Born in January or February {y}?", "paras": [
            jan,
            "The zodiac year starts at Lunar New Year, not on 1 January, which is why early-year birthdays need checking. Our guide <a href=\"chinese-zodiac-born-in-january.html\">Born in January?</a> explains the rule, and the <a href=\"../checker\">zodiac sign checker</a> gives the exact answer for any birth date."]},
        {"h2": f"The {a}'s personality", "paras": [
            f"Our {a} guide describes the sign like this: <em>“{I['traits']}”</em> The usual watch-out: <em>“{I['weak']}”</em>",
            f"The {el} element adds its own flavour. {ELB[el]} Read more in our <a href=\"{el.lower()}-element-chinese-zodiac.html\">{el} element guide</a>, or the full <a href=\"zodiac-year-{a.lower()}.html\">Year of the {a}</a> page.",
            f"Careers often linked with the {a}: {I['careers'].lower()}."]},
        {"h2": f"Lucky colors, numbers and days for the {a}", "list": [
            f"<strong>Lucky colors:</strong> {join(I['colors'])}",
            f"<strong>Lucky numbers:</strong> {join(I['nums'])}",
            f"<strong>Lucky days:</strong> {join(I['days'])}"],
         "after": ["These are the values used across this site. For a lucky color, number and time that change every day, see the <a href=\"../today\">daily fortune</a>."]},
        {"h2": f"Best matches for someone born in {y}", "paras": [
            f"In traditional compatibility, the {a}'s best matches are the <strong>{join(I['compat'])}</strong>, and its clash sign is the <strong>{join(I['clash'])}</strong>, which sits directly opposite it on the zodiac circle. Our <a href=\"../compatibility.html\">compatibility calculator</a> compares two full birth dates, elements included."]},
        {"h2": f"The {a} in 2026 and 2027", "paras": [
            f"<strong>2026 (Fire Horse, until 5 February 2027):</strong> for the {a}, " + (REL26[r26] if r26 != "own" else REL26["own"]),
            f"<strong>2027 (Fire Goat, from 6 February 2027):</strong> for the {a}, " + (REL27[r27] if r27 != "own" else REL27["own"]) +
            " See <a href=\"chinese-zodiac-2027-predictions.html\">Chinese zodiac 2027 predictions</a> for every sign."]},
        {"h2": f"Other Year of the {a} years", "paras": [
            "Years of the same animal come every twelve years, each with a different element: " +
            "; ".join(f"<a href=\"chinese-zodiac-{x}.html\">{x}</a> ({EL[x % 10]} {a})" if FIRST <= x <= LAST else f"{x} ({EL[x % 10]} {a})" for x in same) +
            ". The full list is in our <a href=\"chinese-zodiac-years-chart.html\">Chinese zodiac years chart</a>."]},
    ]
    faq = [
        [f"What Chinese zodiac is {y}?", f"{y} is the Year of the {a}, {art(yy)} {yy} {el} {a} year ({pillar(y)})."],
        [f"When does the {y} Year of the {a} start and end?", f"It starts on {start} and ends on {end}."],
        [f"I was born in January {y}. What is my Chinese zodiac?", (f"If you were born before {start}, you are a {prev_a}; from {start} on, a {a}." if cny_jan else f"A {prev_a}: Lunar New Year {y} {'was' if t0 < today else 'is'} on {start}, so all of January {y} belongs to the {prev_a} year.")],
        [f"What element is {y}?", f"{el}. {y} ends in {y % 10}, which belongs to {el}, and it is a {yy} year."],
        [f"Who is the {a} compatible with?", f"Traditionally the {join(I['compat'])}. The {a}'s clash sign is the {join(I['clash'])}."],
    ]
    return {
        "slug": f"chinese-zodiac-{y}", "title": f"{y} Chinese Zodiac: Year of the {el} {a}",
        "seo_title": f"{y} Chinese Zodiac: Year of the {el} {a} ({start.rsplit(' ', 1)[0]} – {end})",
        "description": f"{y} is the Year of the {el} {a} ({yy}, {pillar(y)}), from {start} to {end}. Personality, lucky colors and numbers, best matches, and what to know if you were born in January or February {y}.",
        "eyebrow": "Chinese Zodiac Years", "kicker": "Chinese Zodiac Years",
        "lead": f"Born in {y}? Your Chinese zodiac animal is most likely the {a}, but check the date: the {y} {el} {a} year {began} on {start}. Here is everything about the year, from its element to its lucky colors and best matches.",
        "card_text": f"{y}: Year of the {el} {a}, from {start} to {end}.",
        "published": PUB, "listing": False,
        "facts": [["Zodiac animal", f"{a} ({yy} {el})"], ["Starts", start], ["Ends", end]],
        "image": {"src": f"images/guides/year-{a.lower()}.webp", "alt": f"Golden {a} of the Chinese zodiac in front of a moonlit temple", "width": 900, "height": 373, "caption": "Illustration from MyBirthSign's zodiac artwork; it is not a photograph."},
        "sections": sections, "faq": faq, "sources": SOURCES,
        "related": [["Chinese zodiac years chart", "chinese-zodiac-years-chart"], [f"Year of the {a}", f"zodiac-year-{a.lower()}"], ["Born in January?", "chinese-zodiac-born-in-january"], ["Zodiac sign checker", "../checker"]],
        "back": ["All years: Chinese zodiac years chart", "chinese-zodiac-years-chart.html"],
        "note": NOTE,
    }

def hub():
    rows = []
    for decade in range(1960, LAST + 1, 10):
        ys = [y for y in range(decade, min(decade + 10, LAST + 1))]
        rows.append({"h2": f"{decade}s", "list": [f"<a href=\"chinese-zodiac-{y}.html\"><strong>{y}</strong></a> – {EL[y % 10]} {an(y)} ({'Yang' if y % 2 == 0 else 'Yin'}), {d(y, CNY[y])} – {dminus(y + 1, CNY[y + 1])}" for y in ys]})
    return {
        "slug": "chinese-zodiac-years-chart", "title": "Chinese Zodiac Years Chart: 1960 to 2027",
        "seo_title": "Chinese Zodiac Years Chart 1960–2027 with Exact Dates and Elements",
        "description": "Every Chinese zodiac year from 1960 to 2027 with its animal, element, Yin or Yang, and the exact Lunar New Year dates it starts and ends. Find your birth year and your sign.",
        "eyebrow": "Chinese Zodiac Guide", "kicker": "Chinese Zodiac Guide",
        "lead": "Find your birth year below to see your Chinese zodiac animal and element, with the exact dates the year began and ended. Each year links to its own page with personality, lucky colors and best matches.",
        "card_text": "Every year from 1960 to 2027: animal, element and exact start and end dates.",
        "published": PUB,
        "facts": [["Years", f"{FIRST}–{LAST}"], ["Animals", "12, in a 12-year cycle"], ["Year starts", "at Lunar New Year"]],
        "image": {"src": "images/guides/born-in-january-zodiac.webp", "alt": "A golden wheel of the twelve zodiac animals above a moonlit lake", "width": 900, "height": 373, "caption": "Illustration made from MyBirthSign's zodiac artwork; it is not a photograph."},
        "sections": [{"h2": "How to read the chart", "paras": [
            "Each Chinese zodiac year starts at Lunar New Year, which falls between 21 January and 20 February, not on 1 January. If you were born in January or early February, check the start date next to your birth year: you may belong to the year before. The element follows the last digit of the year (0–1 Metal, 2–3 Water, 4–5 Wood, 6–7 Fire, 8–9 Earth), and even years are Yang, odd years Yin.",
            "Not sure? Enter your birth date in the <a href=\"../checker\">zodiac sign checker</a> for the exact answer."]}] + rows,
        "faq": [["How do I find my Chinese zodiac by birth year?", "Find your birth year in the chart. If you were born before that year's start date (January or early February), take the previous year's animal."],
                ["Why does my Chinese zodiac not match my birth year?", "Because the zodiac year starts at Lunar New Year, between 21 January and 20 February. Early-year birthdays belong to the previous animal."],
                ["What is the Chinese zodiac for 2027?", "2027 is the Year of the Fire Goat (Ding-wei), from 6 February 2027 to 25 January 2028."]],
        "sources": SOURCES,
        "related": [["Born in January?", "chinese-zodiac-born-in-january"], ["Chinese zodiac 2027 predictions", "chinese-zodiac-2027-predictions"], ["The five elements", "five-elements-explained"], ["Zodiac sign checker", "../checker"]],
        "note": NOTE,
    }

os.makedirs(OUT, exist_ok=True)
specs = [page(y) for y in range(FIRST, LAST + 1)] + [hub()]
for s in specs:
    p = os.path.join(OUT, s["slug"] + ".json")
    json.dump(s, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    subprocess.run(["python3", os.path.join(HERE, "weekly-article.py"), p], check=True, stdout=subprocess.DEVNULL)
print(f"year pages: {len(specs) - 1} years ({FIRST}–{LAST}) and the chart page")
