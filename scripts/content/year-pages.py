"""Chinese zodiac birth-year pages: one English page per year (blog/chinese-zodiac-<year>.html) and a hub page
(blog/chinese-zodiac-years-chart.html) that links them all and is the only one listed on the blog.

    python3 scripts/content/year-pages.py            # writes the specs and builds every page with weekly-article.py

Every fact comes from the site's own data (js/zodiac-data.js): the Lunar New Year date that starts each year (the same
table the zodiac checker uses), the animal's traits, lucky colors, numbers and days, best matches and clash sign.
The element follows the last digit of the year and Yin/Yang follows odd/even, as on the five-elements pages; the
traditional stem-branch name is counted from 1984, a Jia-zi year. Specs go to scripts/content/years/.

Each page also gets a Khmer version, scripts/content/km/<slug>.json (format: scripts/content/km/README.md), written
from Khmer templates of the same sentences with the same data and the same logic (kpage() / khub() mirror page() /
hub(): change both together). The Khmer animal traits, careers, lucky colors / days and element blurbs are the ones
the Khmer zodiac checker shows (js/i18n.js). Check them with: python3 scripts/content/km-check.py <slug>
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
    ["Farmers' Almanac: “When Is Lunar New Year 2027?”", "https://www.farmersalmanac.com/when-chinese-new-year", "Lunar New Year usually falls on the second new moon after the winter solstice."],
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

# ---------------------------------------------------------------- Khmer versions (scripts/content/km/<slug>.json)
KPUB = "2026-10-30"   # the day the Khmer versions were written
i18n = open(os.path.join(ROOT, "js", "i18n.js"), encoding="utf-8").read()
def kmap(name):   # a flat {English key: "Khmer"} table of js/i18n.js
    blk = i18n.split(f"const {name} = {{")[1].split("};")[0]
    return {k: json.loads(f'"{v}"') for k, v in re.findall(r'(\w+): "((?:[^"\\]|\\.)*)"', blk)}
KA, KAC, KE = kmap("KM_ANIMAL_NAMES"), kmap("KM_ANIMAL_COMMON_NAMES"), kmap("KM_ELEMENT_NAMES")
KCOL, KDAY = kmap("KM_COLOR_NAMES"), kmap("KM_DAY_NAMES")
KINFO = {}
kb = i18n.split("const KM_ANIMAL_INFO")[1].split("const KM_ELEMENT_INFO")[0]
for a in A:
    blk = re.search(r"\n  %s: \{(.*?)\n  \}" % a, kb, re.S).group(1)
    t = lambda k: json.loads('"%s"' % re.search(r'\b%s: "((?:[^"\\]|\\.)*)"' % k, blk).group(1))
    g = lambda k: json.loads(re.search(r"%s: (\[[^\]]*\])" % k, blk).group(1))
    KINFO[a] = dict(traits=t("traits"), weak=t("weaknesses"), careers=t("careers"), colors=g("luckyColors"), days=g("luckyDays"))
    # the Khmer lists must say the same as the English ones, in the same order (the checker pairs them by position)
    assert KINFO[a]["colors"] == [KCOL[c] for c in INFO[a]["colors"]], f"{a}: Khmer lucky colors differ from the English"
    assert KINFO[a]["days"] == [KDAY[x] for x in INFO[a]["days"]], f"{a}: Khmer lucky days differ from the English"
KELB = {}
keb = i18n.split("const KM_ELEMENT_INFO")[1].split("const KM_COMPAT_INFO")[0]
for e in ["Wood", "Fire", "Earth", "Metal", "Water"]:
    KELB[e] = json.loads('"%s"' % re.search(r'%s: \{\s*blurb: "((?:[^"\\]|\\.)*)"' % e, keb).group(1))
KYY = {"Yang": "យ៉ាង", "Yin": "យិន"}

def kdate(x): return f"{x.day:02d}/{x.month:02d}/{x.year}"
def kd(y, md): return kdate(dt.date(y, int(md[:2]), int(md[3:])))
def kdminus(y, md): return kdate(dt.date(y, int(md[:2]), int(md[3:])) - dt.timedelta(days=1))
def kjoin(xs):   # «ខៀវ មាស និងបៃតង», numbers «1, 3 និង 4»
    xs = [str(x) for x in xs]
    if len(xs) == 1: return xs[0]
    num = xs[0][0].isdigit()
    return (", " if num else " ").join(xs[:-1]) + (" និង " if num else " និង") + xs[-1]
kyear = lambda a, el: f"ឆ្នាំ{KA[a]} ធាតុ{KE[el]}"   # «ឆ្នាំមមែ ធាតុភ្លើង»

# same relationships as REL26 / REL27; {A} is the sign's Khmer name (the English "for the {a}, " is part of each sentence)
KREL26 = {"own": "ចំពោះមមី ឆ្នាំ 2026 ជាឆ្នាំមមី ដូច្នេះអ្នកកើតឆ្នាំមមីស្ថិតក្នុងឆ្នាំរាសីខ្លួនឯង (ben ming nian) រហូតដល់ថ្ងៃទី 05/02/2027។",
          "clash": "{A}ស្ថិតនៅទល់មុខមមីផ្ទាល់ ដូច្នេះឆ្នាំ 2026 ជាឆ្នាំប៉ះទង្គិចរបស់{A}៖ ជាឆ្នាំដែលគួររក្សាភាពបត់បែន និងពិនិត្យផែនការពីរដង។",
          "triangle": "{A}ស្ថិតក្នុងត្រីកោណរបស់មមី ដូច្នេះតាមប្រពៃណី ឆ្នាំ 2026 ជាឆ្នាំមួយក្នុងចំណោមឆ្នាំដែលស្រួលជាងសម្រាប់{A}។",
          "support": "{A}ស្ថិតក្នុងបញ្ជីគូគាំទ្ររបស់មមី ដូច្នេះតាមប្រពៃណី ឆ្នាំ 2026 ជាឆ្នាំស្រួលសម្រាប់{A}។",
          "neutral": "{A}គ្មានទំនាក់ទំនងពិសេសតាមប្រពៃណីជាមួយមមីទេ ដូច្នេះឆ្នាំ 2026 ជាឆ្នាំអព្យាក្រឹតសម្រាប់{A}។"}
KREL27 = {"own": "ចំពោះមមែ ឆ្នាំ 2027 ជាឆ្នាំមមែ ដូច្នេះអ្នកកើតឆ្នាំមមែស្ថិតក្នុងឆ្នាំរាសីខ្លួនឯង (ben ming nian)។",
          "clash": "{A}ស្ថិតនៅទល់មុខមមែផ្ទាល់ ដូច្នេះឆ្នាំ 2027 ជាឆ្នាំប៉ះទង្គិចរបស់{A}។",
          "triangle": "{A}ស្ថិតក្នុងត្រីកោណរបស់មមែ (ថោះ មមែ និងកុរ) ដូច្នេះតាមប្រពៃណី ឆ្នាំ 2027 ជាឆ្នាំអំណោយផលសម្រាប់{A}។",
          "support": "{A}ស្ថិតក្នុងបញ្ជីគូគាំទ្ររបស់មមែ ដូច្នេះតាមប្រពៃណី ឆ្នាំ 2027 ជាឆ្នាំស្រួលសម្រាប់{A}។",
          "neutral": "{A}គ្មានទំនាក់ទំនងពិសេសតាមប្រពៃណីជាមួយមមែទេ ដូច្នេះឆ្នាំ 2027 ជាឆ្នាំអព្យាក្រឹតសម្រាប់{A}។"}
KSOURCE_NOTES = [   # one per entry of SOURCES, same order (the source titles stay in English)
    "វដ្ត Gan-Zhi ដែលមាន 60 ផ្នែក ប្រើសម្រាប់ដាក់ឈ្មោះឆ្នាំ ខែ ថ្ងៃ និងម៉ោង។",
    "ដើមមេឃទាំងដប់ និងមែកផែនដីទាំងដប់ពីរ ឆ្នាំ 1984 ជាឆ្នាំចាប់ផ្ដើមនៃវដ្តបច្ចុប្បន្ន និងការប្ដូរឆ្នាំនៅថ្ងៃចូលឆ្នាំចិន។",
    "ចូលឆ្នាំចិនធ្លាក់ចំថ្ងៃព្រះចន្ទថ្មីលើកទីពីរ ក្រោយថ្ងៃយប់វែងបំផុតនៃរដូវរងា (winter solstice)។",
    "ធាតុទាំងប្រាំ ព្រមទាំងវដ្តបង្កើត និងវដ្តទប់ស្កាត់។",
    "រាសីចិន ជាការចាត់ថ្នាក់ឆ្នាំ តាមវដ្តដប់ពីរឆ្នាំដែលវិលជុំជានិច្ច។",
]
assert len(KSOURCE_NOTES) == len(SOURCES)
KNOTE = "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់វប្បធម៌ និងការកម្សាន្ត មិនមែនជាការទស្សន៍ទាយបែបវិទ្យាសាស្ត្រទេ។ កាលបរិច្ឆេទនៃឆ្នាំនីមួយៗ អនុវត្តតាមតារាងថ្ងៃចូលឆ្នាំចិន ដែលកម្មវិធីពិនិត្យរាសីរបស់យើងប្រើ។"
KCAPTION = "រូបគំនូរពីស្នាដៃសិល្បៈរាសីរបស់ MyBirthSign មិនមែនជារូបថតទេ។"

def kpage(y):
    """the Khmer version of page(y): same logic, same data, Khmer words"""
    a, el, yy = an(y), EL[y % 10], "Yang" if y % 2 == 0 else "Yin"
    I, KI, start, end = INFO[a], KINFO[a], kd(y, CNY[y]), kdminus(y + 1, CNY[y + 1])
    prev_a, cny_jan = an(y - 1), CNY[y].startswith("01")
    Ak, Ek, YYk, PREVk = KA[a], KE[el], KYY[yy], KA[prev_a]
    # tense follows the dates exactly as in page(): past «បាន…», current year «គឺជា / បានចាប់ផ្ដើម / នឹងបញ្ចប់», future «នឹង…»
    today = dt.date.fromisoformat(PUB)
    t0 = dt.date(y, int(CNY[y][:2]), int(CNY[y][3:])); t1 = dt.date(y + 1, int(CNY[y + 1][:2]), int(CNY[y + 1][3:])) - dt.timedelta(days=1)
    was, began, ended, fell = (("គឺជា", "បានចាប់ផ្ដើម", "បានបញ្ចប់", "បានធ្លាក់ចំ") if t1 < today else
                               ("គឺជា", "បានចាប់ផ្ដើម", "នឹងបញ្ចប់", "បានធ្លាក់ចំ") if t0 <= today else
                               ("នឹងជា", "នឹងចាប់ផ្ដើម", "នឹងបញ្ចប់", "ធ្លាក់ចំ"))
    jan = (f"ចូលឆ្នាំចិន {y} {fell}ថ្ងៃទី <strong>{start}</strong>។ អ្នកដែលកើតចាប់ពីថ្ងៃទី 01/01/{y} រហូតដល់មួយថ្ងៃមុនថ្ងៃនោះ ស្ថិតក្នុងសត្វរាសីនៃឆ្នាំមុន គឺ<strong>{PREVk}</strong> ហើយចាប់ពីថ្ងៃទី {start} តទៅ ជា{Ak}។"
           if cny_jan else
           f"ចូលឆ្នាំចិន {y} {fell}ថ្ងៃទី <strong>{start}</strong> ដូច្នេះ<strong>អ្នកទាំងអស់ដែលកើតក្នុងខែមករា {y}</strong> ព្រមទាំងអ្នកកើតក្នុងខែកុម្ភៈ មុនថ្ងៃនោះ ស្ថិតក្នុងសត្វរាសីនៃឆ្នាំមុន គឺ<strong>{PREVk}</strong>។")
    same = [x for x in (y - 24, y - 12, y + 12, y + 24) if FIRST - 12 <= x <= 2040]
    r26, r27 = rel(a, "Horse"), rel(a, "Goat")
    sections = [
        {"h2": f"{y}៖ {kyear(a, el)} ({YYk})", "paras": [
            f"ឆ្នាំរាសីចិន {y} {was}<strong>ឆ្នាំ{Ak}</strong>។ ឆ្នាំនេះ{began}នៅថ្ងៃចូលឆ្នាំចិន គឺថ្ងៃទី <strong>{start}</strong> ហើយ{ended}នៅថ្ងៃទី <strong>{end}</strong> ដែលជាថ្ងៃមុនថ្ងៃចូលឆ្នាំចិនលើកបន្ទាប់។",
            f"ឆ្នាំនីមួយៗក៏មានធាតុមួយ និងលក្ខណៈយិន ឬយ៉ាងផងដែរ។ ឆ្នាំ {y} បញ្ចប់ដោយលេខ {y % 10} ដូច្នេះជាឆ្នាំ<strong>ធាតុ{Ek}</strong> ហើយដោយសារជាឆ្នាំ{'លេខគូ' if y % 2 == 0 else 'លេខសេស'} វាជាឆ្នាំ<strong>{YYk}</strong>។ តាមការរាប់ដើមមេឃ និងមែកផែនដីបែបប្រពៃណី ឆ្នាំ {y} គឺជាឆ្នាំ <strong>{pillar(y)}</strong>។ {kyear(a, el)} ដដែលនេះ វិលមកវិញតែម្ដងរៀងរាល់ 60 ឆ្នាំប៉ុណ្ណោះ៖ ឆ្នាំ {y - 60} មុននេះ និងឆ្នាំ {y + 60} ក្រោយនេះ។"]},
        {"h2": f"កើតក្នុងខែមករា ឬខែកុម្ភៈ ឆ្នាំ {y}?", "paras": [
            jan,
            "ឆ្នាំរាសីចាប់ផ្ដើមនៅថ្ងៃចូលឆ្នាំចិន មិនមែននៅថ្ងៃទី 1 ខែមករាទេ ហេតុនេះហើយបានជាថ្ងៃកំណើតនៅដើមឆ្នាំត្រូវពិនិត្យឱ្យច្បាស់។ មគ្គុទ្ទេសក៍ <a href=\"chinese-zodiac-born-in-january.html\">កើតក្នុងខែមករា?</a> របស់យើងពន្យល់ពីច្បាប់នេះ ហើយ<a href=\"../checker\">កម្មវិធីពិនិត្យរាសី</a>ផ្ដល់ចម្លើយត្រឹមត្រូវសម្រាប់ថ្ងៃកំណើតណាមួយ។"]},
        {"h2": f"បុគ្គលិកលក្ខណៈរបស់{Ak}", "paras": [
            f"មគ្គុទ្ទេសក៍ឆ្នាំ{Ak}របស់យើង ពិពណ៌នាអំពីរាសីនេះដូច្នេះ៖ <em>“{KI['traits']}”</em> ចំណុចដែលគួរប្រយ័ត្នជាទូទៅ៖ <em>“{KI['weak']}”</em>",
            f"ធាតុ{Ek}ក៏បន្ថែមលក្ខណៈផ្ទាល់ខ្លួនរបស់វាដែរ។ {KELB[el]} អានបន្ថែមនៅក្នុង<a href=\"{el.lower()}-element-chinese-zodiac.html\">មគ្គុទ្ទេសក៍ធាតុ{Ek}</a>របស់យើង ឬទំព័រពេញលេញអំពី<a href=\"zodiac-year-{a.lower()}.html\">ឆ្នាំ{Ak}</a>។",
            f"អាជីពដែលគេច្រើនភ្ជាប់ជាមួយ{Ak}៖ {KI['careers']}។"]},
        {"h2": f"ពណ៌សំណាង លេខសំណាង និងថ្ងៃសំណាងរបស់{Ak}", "list": [
            f"<strong>ពណ៌សំណាង៖</strong> {kjoin(KI['colors'])}",
            f"<strong>លេខសំណាង៖</strong> {kjoin(I['nums'])}",
            f"<strong>ថ្ងៃសំណាង៖</strong> {kjoin(KI['days'])}"],
         "after": ["ទាំងនេះជាតម្លៃដែលប្រើនៅទូទាំងគេហទំព័រនេះ។ សម្រាប់ពណ៌ លេខ និងម៉ោងសំណាងដែលប្ដូររៀងរាល់ថ្ងៃ សូមមើល<a href=\"../today\">ជោគជតារាសីប្រចាំថ្ងៃ</a>។"]},
        {"h2": f"គូដែលសមបំផុតសម្រាប់អ្នកកើតឆ្នាំ {y}", "paras": [
            f"តាមភាពសមស្របបែបប្រពៃណី គូដែលសមបំផុតរបស់{Ak} គឺ<strong>{kjoin([KA[x] for x in I['compat']])}</strong> ហើយរាសីប៉ះទង្គិចរបស់វាគឺ<strong>{kjoin([KA[x] for x in I['clash']])}</strong> ដែលស្ថិតនៅទល់មុខវាផ្ទាល់លើរង្វង់រាសី។ <a href=\"../compatibility.html\">កម្មវិធីគណនាភាពសមស្រប</a>របស់យើង ប្រៀបធៀបថ្ងៃខែឆ្នាំកំណើតពេញលេញពីរ ដោយរួមបញ្ចូលទាំងធាតុផង។"]},
        {"h2": f"{Ak} ក្នុងឆ្នាំ 2026 និង 2027", "paras": [
            "<strong>2026 (ឆ្នាំមមី ធាតុភ្លើង រហូតដល់ថ្ងៃទី 05/02/2027)៖</strong> " + KREL26[r26].format(A=Ak),
            "<strong>2027 (ឆ្នាំមមែ ធាតុភ្លើង ចាប់ពីថ្ងៃទី 06/02/2027)៖</strong> " + KREL27[r27].format(A=Ak) +
            " សូមអាន<a href=\"chinese-zodiac-2027-predictions.html\">ការទស្សន៍ទាយរាសីចិនឆ្នាំ 2027</a> សម្រាប់រាសីនីមួយៗ។"]},
        {"h2": f"ឆ្នាំ{Ak}ផ្សេងទៀត", "paras": [
            "ឆ្នាំនៃសត្វរាសីតែមួយ វិលមកវិញរៀងរាល់ដប់ពីរឆ្នាំម្ដង ហើយលើកនីមួយៗមានធាតុខុសគ្នា៖ " +
            ", ".join(f"<a href=\"chinese-zodiac-{x}.html\">{x}</a> ({Ak} ធាតុ{KE[EL[x % 10]]})" if FIRST <= x <= LAST else f"{x} ({Ak} ធាតុ{KE[EL[x % 10]]})" for x in same) +
            "។ បញ្ជីពេញលេញមាននៅក្នុង<a href=\"chinese-zodiac-years-chart.html\">តារាងឆ្នាំរាសីចិន</a>របស់យើង។"]},
    ]
    faq = [
        [f"ឆ្នាំ {y} ជាឆ្នាំរាសីចិនអ្វី?", f"ឆ្នាំ {y} គឺជា{kyear(a, el)} ដែលជាឆ្នាំ{YYk} ({pillar(y)})។"],
        [f"ឆ្នាំ{Ak} {y} ចាប់ផ្ដើម និងបញ្ចប់នៅថ្ងៃណា?", f"ឆ្នាំនេះចាប់ផ្ដើមនៅថ្ងៃទី {start} ហើយបញ្ចប់នៅថ្ងៃទី {end}។"],
        [f"ខ្ញុំកើតក្នុងខែមករា {y}។ តើរាសីចិនរបស់ខ្ញុំជាអ្វី?", (f"បើអ្នកកើតមុនថ្ងៃទី {start} អ្នកកើតឆ្នាំ{PREVk} ចំណែកបើកើតចាប់ពីថ្ងៃទី {start} តទៅ អ្នកកើតឆ្នាំ{Ak}។" if cny_jan else f"អ្នកកើតឆ្នាំ{PREVk}៖ ចូលឆ្នាំចិន {y} {'បានធ្លាក់ចំ' if t0 < today else 'ធ្លាក់ចំ'}ថ្ងៃទី {start} ដូច្នេះខែមករា {y} ទាំងមូលស្ថិតក្នុងឆ្នាំ{PREVk}។")],
        [f"ឆ្នាំ {y} ជាធាតុអ្វី?", f"ធាតុ{Ek}។ ឆ្នាំ {y} បញ្ចប់ដោយលេខ {y % 10} ដែលជាលេខនៃធាតុ{Ek} ហើយជាឆ្នាំ{YYk}។"],
        [f"{Ak}សមស្របនឹងរាសីណាខ្លះ?", f"តាមប្រពៃណី គឺ{kjoin([KA[x] for x in I['compat']])}។ រាសីប៉ះទង្គិចរបស់{Ak} គឺ{kjoin([KA[x] for x in I['clash']])}។"],
    ]
    return {
        "title": f"រាសីចិនឆ្នាំ {y}៖ {kyear(a, el)}",
        "eyebrow": "ឆ្នាំរាសីចិន", "kicker": "ឆ្នាំរាសីចិន",
        "card_text": f"{y}៖ {kyear(a, el)} ចាប់ពី {start} ដល់ {end}។",
        "lead": f"កើតក្នុងឆ្នាំ {y}? សត្វរាសីចិនរបស់អ្នកទំនងបំផុតគឺ{Ak} ប៉ុន្តែសូមពិនិត្យថ្ងៃខែឱ្យច្បាស់៖ ឆ្នាំ {y} ដែលជា{kyear(a, el)} {began}នៅថ្ងៃទី {start}។ ខាងក្រោមនេះជាព័ត៌មានទាំងអស់អំពីឆ្នាំនេះ ចាប់ពីធាតុរបស់វា រហូតដល់ពណ៌សំណាង និងគូដែលសមបំផុត។",
        "published": KPUB,
        "facts": [["សត្វរាសី", f"{Ak} (ធាតុ{Ek} {YYk})"], ["ចាប់ផ្ដើម", start], ["បញ្ចប់", end]],
        "image": {"src": f"images/guides/year-{a.lower()}.webp", "alt": f"{KAC[a]} ({Ak}) ពណ៌មាសនៃរាសីចិន នៅមុខប្រាសាទក្រោមពន្លឺព្រះចន្ទ", "width": 900, "height": 373, "caption": KCAPTION},
        "sections": sections, "faq": faq, "source_notes": KSOURCE_NOTES,
        "related": [["តារាងឆ្នាំរាសីចិន", "chinese-zodiac-years-chart"], [f"ឆ្នាំ{Ak}", f"zodiac-year-{a.lower()}"], ["កើតក្នុងខែមករា?", "chinese-zodiac-born-in-january"], ["កម្មវិធីពិនិត្យរាសី", "../checker"]],
        "back": ["ឆ្នាំទាំងអស់៖ តារាងឆ្នាំរាសីចិន", "chinese-zodiac-years-chart.html"],
        "note": KNOTE,
    }

def khub():
    """the Khmer version of hub()"""
    rows = []
    for decade in range(1960, LAST + 1, 10):
        ys = [y for y in range(decade, min(decade + 10, LAST + 1))]
        rows.append({"h2": f"ទសវត្សរ៍ {decade}", "list": [f"<a href=\"chinese-zodiac-{y}.html\"><strong>{y}</strong></a> – {kyear(an(y), EL[y % 10])} ({KYY['Yang' if y % 2 == 0 else 'Yin']}), {kd(y, CNY[y])} – {kdminus(y + 1, CNY[y + 1])}" for y in ys]})
    return {
        "title": "តារាងឆ្នាំរាសីចិន៖ ពីឆ្នាំ 1960 ដល់ 2027",
        "eyebrow": "មគ្គុទ្ទេសក៍រាសីចិន", "kicker": "មគ្គុទ្ទេសក៍រាសីចិន",
        "card_text": "គ្រប់ឆ្នាំពី 1960 ដល់ 2027៖ សត្វរាសី ធាតុ និងថ្ងៃចាប់ផ្ដើម និងថ្ងៃបញ្ចប់ច្បាស់លាស់។",
        "lead": "រកឆ្នាំកំណើតរបស់អ្នកខាងក្រោម ដើម្បីមើលសត្វរាសីចិន និងធាតុរបស់អ្នក ព្រមទាំងថ្ងៃខែច្បាស់លាស់ដែលឆ្នាំនោះចាប់ផ្ដើម និងបញ្ចប់។ ឆ្នាំនីមួយៗមានតំណភ្ជាប់ទៅទំព័រផ្ទាល់របស់វា ដែលនិយាយអំពីបុគ្គលិកលក្ខណៈ ពណ៌សំណាង និងគូដែលសមបំផុត។",
        "published": KPUB,
        "facts": [["ឆ្នាំ", f"{FIRST}–{LAST}"], ["សត្វរាសី", "12 ក្នុងវដ្ត 12 ឆ្នាំ"], ["ឆ្នាំចាប់ផ្ដើម", "នៅថ្ងៃចូលឆ្នាំចិន"]],
        "image": {"src": "images/guides/born-in-january-zodiac.webp", "alt": "កង់ពណ៌មាសនៃសត្វរាសីទាំងដប់ពីរ នៅពីលើបឹងក្រោមពន្លឺព្រះចន្ទ", "width": 900, "height": 373, "caption": "រូបគំនូរដែលធ្វើចេញពីស្នាដៃសិល្បៈរាសីរបស់ MyBirthSign មិនមែនជារូបថតទេ។"},
        "sections": [{"h2": "របៀបអានតារាង", "paras": [
            "ឆ្នាំរាសីចិននីមួយៗចាប់ផ្ដើមនៅថ្ងៃចូលឆ្នាំចិន ដែលធ្លាក់នៅចន្លោះថ្ងៃទី 21 ខែមករា ដល់ថ្ងៃទី 20 ខែកុម្ភៈ មិនមែននៅថ្ងៃទី 1 ខែមករាទេ។ ប្រសិនបើអ្នកកើតក្នុងខែមករា ឬដើមខែកុម្ភៈ សូមពិនិត្យថ្ងៃចាប់ផ្ដើមនៅក្បែរឆ្នាំកំណើតរបស់អ្នក៖ អ្នកប្រហែលជាស្ថិតក្នុងឆ្នាំមុន។ ធាតុអនុវត្តតាមលេខខ្ទង់ចុងក្រោយនៃឆ្នាំ (0–1 លោហធាតុ, 2–3 ទឹក, 4–5 ឈើ, 6–7 ភ្លើង, 8–9 ដី) ហើយឆ្នាំលេខគូជាឆ្នាំយ៉ាង ឆ្នាំលេខសេសជាឆ្នាំយិន។",
            "មិនច្បាស់? សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកក្នុង<a href=\"../checker\">កម្មវិធីពិនិត្យរាសី</a> ដើម្បីទទួលបានចម្លើយត្រឹមត្រូវ។"]}] + rows,
        "faq": [["តើខ្ញុំរករាសីចិនរបស់ខ្ញុំតាមឆ្នាំកំណើតដោយរបៀបណា?", "រកឆ្នាំកំណើតរបស់អ្នកក្នុងតារាង។ ប្រសិនបើអ្នកកើតមុនថ្ងៃចាប់ផ្ដើមនៃឆ្នាំនោះ (ខែមករា ឬដើមខែកុម្ភៈ) សូមយកសត្វរាសីនៃឆ្នាំមុន។"],
                ["ហេតុអ្វីរាសីចិនរបស់ខ្ញុំមិនត្រូវនឹងឆ្នាំកំណើតរបស់ខ្ញុំ?", "ព្រោះឆ្នាំរាសីចាប់ផ្ដើមនៅថ្ងៃចូលឆ្នាំចិន ក្នុងចន្លោះថ្ងៃទី 21 ខែមករា ដល់ថ្ងៃទី 20 ខែកុម្ភៈ។ ថ្ងៃកំណើតនៅដើមឆ្នាំ ស្ថិតក្នុងសត្វរាសីនៃឆ្នាំមុន។"],
                ["ឆ្នាំ 2027 ជាឆ្នាំរាសីចិនអ្វី?", "ឆ្នាំ 2027 គឺជាឆ្នាំមមែ ធាតុភ្លើង (Ding-wei) ចាប់ពីថ្ងៃទី 06/02/2027 ដល់ថ្ងៃទី 25/01/2028។"]],
        "source_notes": KSOURCE_NOTES,
        "related": [["កើតក្នុងខែមករា?", "chinese-zodiac-born-in-january"], ["ការទស្សន៍ទាយរាសីចិនឆ្នាំ 2027", "chinese-zodiac-2027-predictions"], ["ធាតុទាំងប្រាំ", "five-elements-explained"], ["កម្មវិធីពិនិត្យរាសី", "../checker"]],
        "note": KNOTE,
    }

def same_shape(en, km):   # the Khmer file mirrors the English spec (full check: scripts/content/km-check.py)
    assert len(km["facts"]) == len(en["facts"]) and len(km["faq"]) == len(en["faq"]) and len(km["source_notes"]) == len(en["sources"])
    assert [r[1] for r in km["related"]] == [r[1] for r in en["related"]] and km.get("back", [0, 0])[1] == en.get("back", [0, 0])[1]
    assert {k: v for k, v in km["image"].items() if k not in ("alt", "caption")} == {k: v for k, v in en["image"].items() if k not in ("alt", "caption")}
    assert len(km["sections"]) == len(en["sections"])
    for s, t in zip(en["sections"], km["sections"]):
        assert all(len(s.get(k, [])) == len(t.get(k, [])) for k in ("paras", "list", "after")), s["h2"]
        assert all(re.findall(r'href="[^"]*"', "".join(s.get(k, []))) == re.findall(r'href="[^"]*"', "".join(t.get(k, []))) for k in ("paras", "list", "after")), s["h2"]

KOUT = os.path.join(HERE, "km")
os.makedirs(OUT, exist_ok=True)
specs = [page(y) for y in range(FIRST, LAST + 1)] + [hub()]
kspecs = [kpage(y) for y in range(FIRST, LAST + 1)] + [khub()]
for s, k in zip(specs, kspecs):
    same_shape(s, k)
    p = os.path.join(OUT, s["slug"] + ".json")
    json.dump(s, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(k, open(os.path.join(KOUT, s["slug"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)   # read by weekly-article.py
    subprocess.run(["python3", os.path.join(HERE, "weekly-article.py"), p], check=True, stdout=subprocess.DEVNULL)
print(f"year pages: {len(specs) - 1} years ({FIRST}–{LAST}) and the chart page, each with its Khmer version (scripts/content/km/)")
