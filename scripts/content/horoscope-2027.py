"""Write the twelve "<Animal> Horoscope 2027" article specs (scripts/content/weekly/<animal>-horoscope-2027.json).

    python3 scripts/content/horoscope-2027.py

Every fact comes from the site's own data or the sources listed in each page:
  - year starts: the Lunar New Year table in js/zodiac-data.js (CNY_DATES), the same table as the zodiac checker;
  - elements: the last digit of the year (Wikipedia, "Wuxing"), and the five-element cycles quoted from the same article;
  - relationships (triangle, clash, own year): the rules this site's calculators use (see the 2027 predictions hub);
  - lucky colors, numbers, days, matches and careers: ANIMAL_INFO in js/zodiac-data.js;
  - months: each zodiac month starts at a "jie" solar term (Wikipedia, "Solar term"); the 2027 dates were calculated for
    Beijing time with the ephem library and checked against the Hong Kong Observatory (Lichun on 4 February 2027).
The articles are published on a schedule (twice a week from Monday 2 November 2026) by the normal scheduled-article system:
build-site.mjs hides each one until 06:00 Cambodia time on its date.
After running this, build each page with:  python3 scripts/content/weekly-article.py scripts/content/weekly/<slug>.json
"""
import json, os, re, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
A = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
data = json.loads(subprocess.run(["node", "-e", """
const fs=require('fs'); const s=fs.readFileSync(process.argv[1],'utf8');
const AI=eval('('+s.match(/const ANIMAL_INFO = (\\{[\\s\\S]*?\\n\\});/)[1]+')');
const C=eval('('+s.match(/const CNY_DATES = (\\{[^}]*\\})/)[1]+')');
console.log(JSON.stringify({AI, C}));""", os.path.join(ROOT, "js", "zodiac-data.js")], capture_output=True, text=True, check=True).stdout)
AI, CNY = data["AI"], {int(k): v for k, v in data["C"].items()}
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
ELEM = {0: "Metal", 1: "Metal", 2: "Water", 3: "Water", 4: "Wood", 5: "Wood", 6: "Fire", 7: "Fire", 8: "Earth", 9: "Earth"}
WITH_FIRE = {   # how each birth element meets the year's Fire, in the words of the five-element cycles (Wikipedia, "Wuxing")
    "Wood": "Wood feeds Fire: your element feeds the year",
    "Fire": "Fire meets Fire: the same element as the year",
    "Earth": "Fire produces Earth: the year feeds your element",
    "Metal": "Fire melts (or refines) Metal: the year works on your element",
    "Water": "Water dampens Fire: your element works on the year",
}
TRI = [["Rat", "Dragon", "Monkey"], ["Ox", "Snake", "Rooster"], ["Tiger", "Horse", "Dog"], ["Rabbit", "Goat", "Pig"]]
tri = lambda a: next(t for t in TRI if a in t)
clash = lambda a: A[(A.index(a) + 6) % 12]
# zodiac months of the Goat year 2027: each starts at a "jie" solar term (dates calculated for Beijing time)
ZMONTHS = [("Tiger", "4 Feb", "5 Mar"), ("Rabbit", "6 Mar", "4 Apr"), ("Dragon", "5 Apr", "5 May"), ("Snake", "6 May", "5 Jun"),
           ("Horse", "6 Jun", "6 Jul"), ("Goat", "7 Jul", "7 Aug"), ("Monkey", "8 Aug", "7 Sep"), ("Rooster", "8 Sep", "7 Oct"),
           ("Dog", "8 Oct", "6 Nov"), ("Pig", "7 Nov", "6 Dec"), ("Rat", "7 Dec", "5 Jan 2028"), ("Ox", "6 Jan 2028", "3 Feb 2028")]
REL = {"Ox": "clash", "Rabbit": "triangle", "Pig": "triangle", "Horse": "supportive", "Goat": "own"}
REL_LABEL = {"clash": "Clash year", "triangle": "Same triangle as the Goat", "supportive": "Supportive match", "own": "Your own year", "neutral": "Neutral year"}
SCHEDULE = ["2026-11-02", "2026-11-05", "2026-11-09", "2026-11-12", "2026-11-16", "2026-11-19",
            "2026-11-23", "2026-11-26", "2026-11-30", "2026-12-03", "2026-12-07", "2026-12-10"]

# ---- the text that is different for every sign: the year in one line, how the sign meets the Goat year, love, work ----
T = {
 "Rat": dict(
  lead="2027 is the year of the Fire Goat, and for the Rat it is a neutral year: tradition gives the Rat no special tie to the Goat, for better or worse. Here is how the Rat is read in 2027, what your birth element adds, and the months to watch.",
  rel=["In the rules our calculators use, the Rat has no traditional relationship with the Goat. It is not in the Goat's triangle (Rabbit, Goat and Pig) and it is not the Goat's opposite, the Ox. A neutral year is usually read as one shaped more by your own choices than by the year's animal.",
       "The Goat year also follows the Horse year of 2026, and the Horse sits directly opposite the Rat, so 2026 was the Rat's clash year. Read that way, 2027 is a calmer stretch after a bumpy one. For a quick-witted, resourceful sign, a slower year is a chance to finish what the Horse year started rather than chase every new opening."],
  love="The Rat's natural matches in our guide are the Dragon and the Monkey, which share its triangle, and the Ox. A Goat year is usually described as gentle and sociable, which suits relationships built on care more than excitement. The Rat's watch-out is caution with trust: in a warm year it can pay to let people in a little sooner. The Horse, the Rat's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Rat with business, writing, research and trading, work that rewards spotting what others miss. In a year that favours cooperation over speed, openings are more likely to come through people than through quick deals. The Rat's care with money is an asset in any year; 2027 is a good time to put it into a plan rather than a gamble."),
 "Ox": dict(
  lead="For the Ox, 2027 is a clash year: the Goat sits directly opposite the Ox in the zodiac circle. Tradition reads a clash as friction and change rather than bad luck. Here is what that means for the Ox, what your birth element adds, and the months to watch.",
  rel=["The Ox and the Goat stand six places apart in the circle of twelve, the pairing tradition calls a clash. Our <a href=\"zodiac-clashes-explained\">guide to zodiac clashes</a> explains how a clash is read: plans get shaken up and stubbornness meets resistance. For the Ox, a sign built on steady routine, that points to a year asking for more flexibility than usual.",
       "A practical way to use that reading: leave room in your plans, check agreements twice, and let small disagreements go before they harden. The Ox's own strengths, patience and reliability, are exactly what help in a changeable year."],
  love="The Ox's natural matches in our guide are the Snake and the Rooster, its triangle partners, and the Rat. In a clash year, tradition advises patience at home, where the Ox's directness can sound blunter than intended. The Goat itself is the Ox's most challenging match in our guide, so Ox and Goat couples may find 2027 asks for extra listening.",
  work="Our guide links the Ox with agriculture, engineering, finance and medicine, fields that reward persistence. A clash year is often read as a time of change at work: a new role, a new team, or a project that has to be rebuilt. The Ox does best treating change as a project in itself, one steady step at a time, and keeping its usual caution with money in a less predictable year."),
 "Tiger": dict(
  lead="2027, the Fire Goat year, is a neutral year for the Tiger: tradition gives the two signs no special tie. After a lively 2026, it is read as a quieter year. Here is how the Tiger is read in 2027, what your birth element adds, and the months to watch.",
  rel=["In the rules our calculators use, the Tiger has no traditional relationship with the Goat: it is neither in the Goat's triangle nor its opposite. The Horse year of 2026, by contrast, shared the Tiger's own triangle (Tiger, Horse and Dog), which tradition counts as one of the Tiger's friendlier years.",
       "So 2027 is usually read as a change of pace: less speed, more people. The Tiger's courage still counts, but a Goat year tends to reward those who bring others along. The Tiger's usual watch-out, impatience with slower people, is the thing to manage."],
  love="The Tiger's natural matches in our guide are the Horse and the Dog, its triangle partners, and the Pig. A gentle year suits slowing down in love: listening as much as leading. The Monkey, the Tiger's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Tiger with entrepreneurship, sports, law and management, where bold decisions matter. In a Goat year, the strongest moves are likely to be the ones made with a team rather than alone. With money, the Tiger's appetite for risk is worth balancing with a plan that still works if a bet does not pay off."),
 "Rabbit": dict(
  lead="Good news for the Rabbit: 2027, the Fire Goat year, is traditionally one of its friendlier years, because the Rabbit and the Goat share a triangle. Here is how the Rabbit is read in 2027, what your birth element adds, and the months to watch.",
  rel=["The Rabbit, the Goat and the Pig form one of the zodiac's four triangles of signs that traditionally get on well. A year ruled by your triangle partner is read as supportive: things tend to flow more easily and people are more willing to help.",
       "A calm, creative Goat year suits the Rabbit's love of harmony. The Rabbit's watch-out is avoiding hard conversations; a supportive year is a good time to say what needs saying, gently, before small problems grow."],
  love="The Rabbit's natural matches in our guide are the Goat and the Pig, its triangle partners, and the Dog. With the Goat ruling the year, tradition reads 2027 as a warm year for relationships: a good time to deepen a bond or to meet people through friends. The Rooster, the Rabbit's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Rabbit with diplomacy, counseling, design and hospitality, work that needs a careful, caring touch, which is exactly what a Goat year is said to reward. A friendly year is a good time to ask for the opportunity you want rather than wait to be noticed. With money, the Rabbit's caution is sensible; the risk is being too cautious to act on a good idea."),
 "Dragon": dict(
  lead="2027, the Fire Goat year, is a neutral year for the Dragon: no special tie with the Goat in tradition. Big ambitions still have room, but the year is read as favouring care over force. Here is how the Dragon is read in 2027, what your birth element adds, and the months to watch.",
  rel=["In the rules our calculators use, the Dragon has no traditional relationship with the Goat: it is neither in the Goat's triangle (Rabbit, Goat and Pig) nor its opposite, the Ox. A neutral year leaves the Dragon's own strengths, confidence and ambition, to set the pace.",
       "What changes is the mood. A Goat year is usually described as gentle and cooperative, and the Dragon's high standards can read as impatience to others. Sharing credit and slowing down to listen are the habits most likely to help plans land."],
  love="The Dragon's natural matches in our guide are the Rat and the Monkey, its triangle partners, and the Rooster. In love, a Goat year rewards attention to small, everyday things more than grand gestures. The Dog, the Dragon's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Dragon with leadership, entrepreneurship, entertainment and real estate. 2027 can still be a year of big projects, but ones built with partners rather than pushed through alone. With money, the Dragon's confidence works best with a second opinion on large decisions."),
 "Snake": dict(
  lead="For the Snake, 2027, the Fire Goat year, is a neutral year in tradition, with no special tie to the Goat. Its steady pace suits the Snake's careful style. Here is how the Snake is read in 2027, what your birth element adds, and the months to watch.",
  rel=["In the rules our calculators use, the Snake has no traditional relationship with the Goat: it is neither in the Goat's triangle nor its opposite. A neutral year is read as one where results follow your own planning, and planning is the Snake's strength.",
       "The risk is keeping plans too private. In a year that favours warmth and cooperation, letting trusted people in early can open doors the Snake would not find alone."],
  love="The Snake's natural matches in our guide are the Ox and the Rooster, its triangle partners, and the Monkey. The Snake's watch-out in love is secrecy: in a warm Goat year, sharing a little more of what you think and feel tends to bring people closer. The Pig, the Snake's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Snake with finance, research, psychology and strategy, work that rewards patience and judgment. 2027 is a good year for long-term plans and careful study. With money, the Snake's caution fits a calm year; the watch-out is overthinking a decision until the moment passes."),
 "Horse": dict(
  lead="After its own year in 2026, the Horse hands over to the Goat on 6 February 2027, and tradition reads the Goat year as friendly for the Horse. Here is how the Horse is read in 2027, what your birth element adds, and the months to watch.",
  rel=["2026 was the Horse's own year, which tradition treats with some caution. The Goat year that follows is read more kindly: our Goat guide lists the Horse as one of the Goat's supportive matches, so 2027 is counted among the Horse's friendlier years.",
       "A good use of that support is to turn last year's energy into something lasting. The Horse loves new starts; 2027 rewards finishing, settling and building on what is already moving."],
  love="The Horse's natural matches in our guide are the Tiger and the Dog, its triangle partners, and the Goat itself. With a supportive partner sign ruling the year, tradition reads 2027 as a good year for commitment, the area the Horse often finds hardest. The Rat, the Horse's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Horse with travel, sales, sports and media, work with movement and variety. In 2027, the advice is to stay with a good project long enough to see it pay off rather than jumping to the next one. With money, the Horse's impatience is the thing to watch; slow, steady saving suits the year."),
 "Goat": dict(
  lead="2027 is the Goat's own year, called ben ming nian. Tradition treats your own animal's year with some caution, but reads it as a custom, not a curse. Here is how the Goat is read in 2027, what your birth element adds, and the months to watch.",
  rel=["China Highlights explains the belief that people in their own zodiac year offend Tai Sui, and describes customs such as wearing red, ideally a gift from family or friends, and jade. Read them as culture, not as a warning.",
       "Being in your own year also puts the Goat's character center stage. A practical reading is to build on the Goat's creativity and care, and to ask for support rather than carrying everything alone. Our <a href=\"year-of-the-goat-sheep-or-ram-2027\">Goat, Sheep or Ram guide</a> explains the sign's names and dates."],
  love="The Goat's natural matches in our guide are the Rabbit and the Pig, its triangle partners, and the Horse. Goats are said to thrive in secure, supportive relationships, and their own year is a good time to lean on the people who provide that. The Ox, the Goat's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Goat with art, design, counseling and nonprofit work. In its own year, the Goat's watch-out is indecision and taking on too much for others; choosing a few things and saying no to the rest leaves room for the creative work Goats do best. With money, a simple budget helps when generosity runs ahead of the plan."),
 "Monkey": dict(
  lead="2027, the Fire Goat year, is a neutral year for the Monkey in tradition. Ideas will not be in short supply; finishing them is the challenge. Here is how the Monkey is read in 2027, what your birth element adds, and the months to watch.",
  rel=["In the rules our calculators use, the Monkey has no traditional relationship with the Goat: it is neither in the Goat's triangle nor its opposite. A neutral year leaves the Monkey's quick mind free to set its own direction.",
       "A calmer Goat year is a good time to pick one or two projects and see them through instead of hopping to the next clever idea. The Monkey's gift for problem-solving goes furthest when it is pointed at one goal."],
  love="The Monkey's natural matches in our guide are the Rat and the Dragon, its triangle partners, and the Snake. In a gentle year, attention is the best gift: the Monkey's playful side wins hearts, but steady presence keeps them. The Tiger, the Monkey's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Monkey with technology, marketing, comedy and consulting, work that rewards quick thinking. In 2027, the edge comes from focus: finishing and polishing rather than starting. With money, the Monkey's love of a clever shortcut is worth checking against the plain numbers."),
 "Rooster": dict(
  lead="For the Rooster, 2027, the Fire Goat year, is a neutral year in tradition, with no special tie to the Goat. The Rooster's eye for detail suits a year that values care and craft. Here is how the Rooster is read in 2027, what your birth element adds, and the months to watch.",
  rel=["In the rules our calculators use, the Rooster has no traditional relationship with the Goat: it is neither in the Goat's triangle nor its opposite. A neutral year lets the Rooster's own standards set the tone.",
       "The watch-out is criticism. In a gentle Goat year, how you point out a mistake matters as much as finding it, and a kind word goes further than a correct one."],
  love="The Rooster's natural matches in our guide are the Ox and the Snake, its triangle partners, and the Dragon. In love, 2027 rewards appreciation: noticing what is right as readily as what is wrong. The Rabbit, the Rooster's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Rooster with accounting, journalism, quality control and public speaking, work where precision counts. A Goat year values craft, so careful, well-made work stands out. With money, the Rooster's attention to detail is a strength; the watch-out is spending on perfection where good enough will do."),
 "Dog": dict(
  lead="2027, the Fire Goat year, is a neutral year for the Dog in tradition. After a friendly 2026, it is read as a steady year built on relationships, where loyalty counts. Here is how the Dog is read in 2027, what your birth element adds, and the months to watch.",
  rel=["In the rules our calculators use, the Dog has no traditional relationship with the Goat: it is neither in the Goat's triangle nor its opposite. The Horse year of 2026 shared the Dog's own triangle (Tiger, Horse and Dog), which tradition counts as one of the Dog's friendlier years.",
       "Loyalty and honesty fit a year built on relationships. The Dog's usual worry about new people or situations is worth testing: a quieter year is a good time to give someone new a fair chance."],
  love="The Dog's natural matches in our guide are the Tiger and the Horse, its triangle partners, and the Rabbit. A gentle year suits the Dog's devoted side, as long as worry does not crowd out trust. The Dragon, the Dog's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Dog with law, security, social work and education, work grounded in fairness and protecting others. In 2027, steady effort and good relationships at work are likely to count for more than bold moves. With money, the Dog's caution is sensible; worry about the future is best answered with a simple plan."),
 "Pig": dict(
  lead="Good news for the Pig: 2027, the Fire Goat year, is traditionally one of its friendlier years, because the Pig and the Goat share a triangle. Here is how the Pig is read in 2027, what your birth element adds, and the months to watch.",
  rel=["The Rabbit, the Goat and the Pig form one of the zodiac's four triangles of signs that traditionally get on well. A year ruled by your triangle partner is read as supportive, with more help from others and fewer obstacles.",
       "A warm, sociable Goat year suits the Pig's generous nature. The watch-out is over-trusting or over-spending: enjoy the good company, and keep an eye on the budget."],
  love="The Pig's natural matches in our guide are the Rabbit and the Goat, its triangle partners, and the Tiger. With a partner sign ruling the year, tradition reads 2027 as a warm year for love and friendship. The Snake, the Pig's opposite, is the pairing tradition marks as the hardest.",
  work="Our guide links the Pig with hospitality, the food industry, teaching and healthcare, work built on care for others. A supportive year is a good time to take on more responsibility or to start something with people you trust. With money, the Pig's generosity is a strength that needs limits; a budget protects it."),
}


def yrs(a):   # birth years of the sign from 1936 to 2027, with the date each year starts
    base = 1936 + (A.index(a) - A.index("Rat")) % 12
    out = []
    for y in range(base, 2028, 12):
        md = CNY[y]; m, d = int(md[:2]), int(md[3:])
        out.append((y, f"{d} {MONTHS[m - 1]}", ELEM[y % 10]))
    return out


def page(a, published):
    s = a.lower(); info = AI[a]; rel = REL.get(a, "neutral"); t = T[a]
    mates = [x for x in tri(a) if x != a]; opp = clash(a)
    nums = ", ".join(str(n) for n in info["luckyNumbers"]); cols = ", ".join(info["luckyColors"])
    years = yrs(a)
    trow = "".join(f'<tr><th scope="row">{y}</th><td>{d} {y}</td><td>{el} {a}</td><td>{"born in 2027" if y == 2027 else f"turns {2027 - y}"}</td><td>{WITH_FIRE[el]}</td></tr>' for y, d, el in years)
    ytable = ('<div class="table-wrap"><table class="data"><thead><tr><th scope="col">Born</th><th scope="col">Year starts</th><th scope="col">Element</th>'
              '<th scope="col">In 2027</th><th scope="col">Your element and the year\'s Fire</th></tr></thead><tbody>' + trow + "</tbody></table></div>")
    def mark(m):
        if m == a: return "<strong>Your own month</strong>"
        if m in mates: return "<strong>Triangle month</strong>: traditionally smoother"
        if m == opp: return "<strong>Clash month</strong>: take extra care"
        return ""
    mrow = "".join(f'<tr><th scope="row">{m}</th><td>{f} – {to}</td><td>{mark(m)}</td></tr>' for m, f, to in ZMONTHS)
    mtable = ('<div class="table-wrap"><table class="data narrow"><thead><tr><th scope="col">Month</th><th scope="col">2027 dates</th>'
              f'<th scope="col">For the {a}</th></tr></thead><tbody>' + mrow + "</tbody></table></div>")
    om = next(x for x in ZMONTHS if x[0] == opp); tm = [x for x in ZMONTHS if x[0] in mates]
    tm_sorted = {x[0]: x for x in tm}
    month_note = (f"Read with the same rules as the year, the months of your triangle partners, the {mates[0]} ({tm_sorted[mates[0]][1]} – {tm_sorted[mates[0]][2]}) "
                  f"and the {mates[1]} ({tm_sorted[mates[1]][1]} – {tm_sorted[mates[1]][2]}), are traditionally the smoother ones for the {a}, and the month of your opposite sign, "
                  f"the {opp} ({om[1]} – {om[2]}), is the one to take extra care in.")
    extra_month = {"Ox": " In 2027 that is also the Goat month, when the month's animal matches the year's: tradition would count it as the Ox's most sensitive stretch of the year.",
                   "Goat": " The Goat month (7 July – 7 August) is your own month inside your own year.",
                   "Horse": " The Horse month (6 June – 6 July) is your own month."}.get(a, "")
    rel_short = {"clash": f"2027 is the {a}'s clash year: the Goat is its opposite sign. Tradition reads that as a year of change and friction, not of bad luck.",
                 "triangle": f"Yes, traditionally: the {a} shares the Goat's triangle (Rabbit, Goat and Pig), so 2027 is read as one of its friendlier years.",
                 "supportive": "Traditionally yes: our Goat guide lists the Horse as one of the Goat's supportive matches, and 2027 follows the Horse's own year.",
                 "own": "It is the Goat's own year, ben ming nian. Tradition treats it with some caution and suggests customs such as wearing red, but reads it as culture, not misfortune.",
                 "neutral": f"In tradition it is a neutral year: the {a} has no special relationship with the Goat, so the year is read as shaped more by your own choices."}[rel]
    born_note = (f"Born in January or early February? The zodiac year starts at Chinese New Year, so check the start date in the table; if you were born before it, "
                 f"you belong to the sign before the {a}. Our <a href=\"chinese-zodiac-born-in-january\">born in January guide</a> and the <a href=\"../checker\">zodiac checker</a> explain.")
    sources = [
        ["Hong Kong Observatory: Gregorian-Lunar Calendar Conversion Table of 2027", "https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2027e.txt",
         "6 February 2027 as the first day of the Ding-wei year of the Goat, and Spring Commences (Lichun) on 4 February 2027."],
        ["Wikipedia: “Wuxing (Chinese philosophy)”", "https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)",
         "the generating and overcoming cycles of the five elements, Ding as a Fire stem, and the element of each year by its last digit."],
        ["Wikipedia: “Solar term”", "https://en.wikipedia.org/wiki/Solar_term",
         "the twelve zodiac months, from the Tiger month at Lichun to the Ox month at Xiaohan, each starting at a jie solar term."],
        ["Chinese Idioms: “Chinese Zodiac Compatibility: The Trines, the Clashes, and Your Best Match” (15 July 2026)", "https://www.chineseidioms.com/blog/chinese-zodiac-compatibility-guide",
         "the four triangles of compatible signs and the six clashing pairs."],
    ]
    if a == "Goat":
        sources.append(["China Highlights: “Ben Ming Nian — Zodiac Year”", "https://www.chinahighlights.com/travelguide/ben-ming-nian.htm",
                        "the belief that people in their zodiac year offend Tai Sui, and the customs of wearing red and jade."])
    return {
        "slug": f"{s}-horoscope-2027",
        "title": f"{a} Horoscope 2027: What the Fire Goat Year Means for the {a}",
        "seo_title": f"{a} Horoscope 2027: Chinese Zodiac Forecast for the Year of the Goat",
        "description": f"How the {a} is traditionally read in 2027, the Fire Goat year: the {a}'s relationship with the Goat, your element by birth year, love and work, the months to watch, and lucky colors and numbers.",
        "eyebrow": "2027 Horoscope", "kicker": "2027 Horoscope",
        "lead": t["lead"],
        "card_text": f"The {a} in the 2027 Fire Goat year: love, work, your element by birth year and the months to watch.",
        "published": published,
        "facts": [["The year", "Fire Goat, from 6 February 2027"], [f"The {a} in 2027", REL_LABEL[rel]], ["Lucky numbers", nums]],
        "image": {"src": f"images/guides/year-{s}.webp", "alt": f"Golden {a} of the Chinese zodiac in front of a moonlit temple", "width": 900, "height": 373,
                  "caption": "Illustration from MyBirthSign's zodiac artwork; it is not a photograph."},
        "sections": [
            {"h2": f"The {a} and the Goat year", "paras": t["rel"],
             "after": ["2027 is a <strong>Ding-wei</strong> year, according to the Hong Kong Observatory: Ding is a Fire stem and Wei is the Goat, so it is the year of the <strong>Fire Goat</strong>, from 6 February 2027 to 25 January 2028. "
                       "These are cultural readings, not forecasts: no evidence shows a year's animal decides anyone's luck. Use them as a prompt to think about your own plans."]},
            {"h2": f"Your element in 2027: every {a} year since {years[0][0]}",
             "paras": [f"Each {a} year has its own element, set by the last digit of the year. In 2027 that element meets the year's Fire, and the five-element cycles describe how:"],
             "html": ytable,
             "after": ["In the five-element cycles, as Wikipedia sets them out, Wood feeds Fire, Fire produces Earth, Fire melts (or refines) Metal, and Water dampens (or regulates) Fire. "
                       "These links are a traditional way of describing how each element meets the year, not a prediction.",
                       born_note]},
            {"h2": f"Love and relationships for the {a}", "paras": [t["love"]]},
            {"h2": f"Work and money for the {a}", "paras": [t["work"]]},
            {"h2": f"Months to watch in 2027",
             "paras": ["Each zodiac year is also divided into twelve zodiac months. Each one starts at a solar term rather than at the new moon, beginning with the Tiger month at Spring Commences (Lichun) on 4 February 2027. "
                       "The dates below are the 2027 solar terms, calculated for Beijing time; they can differ by a day in other time zones."],
             "html": mtable,
             "after": [month_note + extra_month]},
            {"h2": f"Lucky colors, numbers and days for the {a}",
             "paras": [f"In our {a} guide, the {a}'s lucky colors are <strong>{cols}</strong>, its lucky numbers are <strong>{nums}</strong>, and its lucky days are <strong>{' and '.join(info['luckyDays'])}</strong>. "
                       f"For the full profile, read the <a href=\"zodiac-year-{s}\">Year of the {a} guide</a>; for every sign in 2027, see the <a href=\"chinese-zodiac-2027-predictions\">2027 predictions</a>."]},
        ],
        "faq": [
            [f"Is 2027 a good year for the {a}?", rel_short],
            [f"What is the {a}'s clash month in 2027?", f"The {opp} month, from {om[1]} to {om[2]}{'' if '2028' in om[2] else ' 2027'}. The {opp} is the {a}'s opposite sign, and tradition marks its month as the one to take extra care in."],
            [f"What element is my {a} year?", "It depends on the year you were born: " + "; ".join(f"{y} is {'an' if el == 'Earth' else 'a'} {el} {a}" for y, d, el in years if y < 2027) + (". 2027 is a Fire Goat year." if a == "Goat" else ".")],
            [f"What are the {a}'s lucky colors and numbers?", f"In our {a} guide: colors {cols}; numbers {nums}; days {' and '.join(info['luckyDays'])}."],
        ],
        "sources": sources,
        "related": [["2027 predictions for every sign", "chinese-zodiac-2027-predictions"], [f"Year of the {a} guide", f"zodiac-year-{s}"],
                    ["Chinese New Year 2027", "chinese-new-year-2027-year-of-the-goat"], ["Compatibility calculator", "../compatibility.html"]],
        "note": "Readings follow the same rules as this site's calculators; year start dates come from the Lunar New Year table used by our zodiac checker. The zodiac is shared as culture and tradition, not as a prediction.",
    }


if __name__ == "__main__":
    for a, day in zip(A, SCHEDULE):
        sp = page(a, day)
        p = os.path.join(HERE, "weekly", sp["slug"] + ".json")
        json.dump(sp, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(day, sp["slug"])
