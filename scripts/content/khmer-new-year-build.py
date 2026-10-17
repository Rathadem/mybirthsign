"""Builds blog/khmer-new-year-animal-year.html (EN / KM / ZH) on the site's guide design.
Dates in the table come from data.json (computed with js/vendor/momentkh.min.js and js/zodiac-data.js CNY_DATES)."""
import json, html, re, os
R = "/home/claude/mybirthsign/"
D = json.load(open(os.path.join(os.path.dirname(__file__), "khmer-new-year-data.json")))
SLUG = "khmer-new-year-animal-year"
URL = f"https://mybirthsign.com/blog/{SLUG}.html"
AN = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"]
KM = {"Rat":"ជូត","Ox":"ឆ្លូវ","Tiger":"ខាល","Rabbit":"ថោះ","Dragon":"រោង","Snake":"ម្សាញ់","Horse":"មមី","Goat":"មមែ","Monkey":"វក","Rooster":"រកា","Dog":"ច","Pig":"កុរ"}
ZH = {"Rat":"鼠","Ox":"牛","Tiger":"虎","Rabbit":"兔","Dragon":"龙","Snake":"蛇","Horse":"马","Goat":"羊","Monkey":"猴","Rooster":"鸡","Dog":"狗","Pig":"猪"}
ENM = ["January","February","March","April","May","June","July","August","September","October","November","December"]
KMM = ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"]
med = lambda a, s=72: f'<img src="../images/business/animals/s144/{a.lower()}.webp" width="{s}" height="{s}" alt="" loading="lazy" decoding="async">'

def dfmt(lang, m, d, y=None):
    if lang == "zh": return (f"{y}年" if y else "") + f"{m}月{d}日"
    if lang == "km": return f"{d} {KMM[m-1]}" + (f" {y}" if y else "")
    return f"{d} {ENM[m-1]}" + (f" {y}" if y else "")
def rng(lang, m, d1, d2):
    if lang == "zh": return f"{m}月{d1}日–{d2}日"
    if lang == "km": return f"{d1}–{d2} {KMM[m-1]}"
    return f"{d1}–{d2} {ENM[m-1]}"
def name(lang, a): return {"en": a, "km": KM[a], "zh": ZH[a]}[lang]

T = {}
T["en"] = dict(
  eyebrow="Khmer Culture &amp; Calendar",
  h1="Khmer New Year: When the Animal Year Really Changes",
  sub="and why it is a different day from Chinese New Year",
  lead="Cambodia and China use the same twelve animals, but they start the new animal year at different times. Here is when each one changes, and what it means for your birthday.",
  meta='Published <time datetime="2026-10-17">October 17, 2026</time> · MyBirthSign',
  intro=[
    "Ask a Cambodian grandmother which animal year you were born in, then check a Chinese zodiac website, and sometimes you get two different answers. Neither of them is wrong. Cambodia and China share the same twelve animals, from the Rat to the Pig, but each calendar starts the new animal year on its own New Year — and those two New Years are about two months apart.",
    "This guide explains exactly when the animal year turns in the Khmer calendar, how that differs from Chinese New Year, and how to tell which animal you are in each system.",
  ],
  twoH="Two New Years, two different dates",
  cny_t="Chinese New Year", cny_when="Late January to mid-February",
  cny_p="Chinese New Year follows the moon. It falls on the second new moon after the winter solstice, so the date moves every year, always between about 21 January and 20 February. The Chinese zodiac animal changes on that day.",
  kny_t="Khmer New Year", kny_when="13 or 14 April",
  kny_p="Khmer New Year follows the sun. It begins at Moha Songkran, when the sun moves into the sign of Aries (Mesa) in the traditional Khmer reckoning. That is why it almost always starts on 13 or 14 April. The Khmer animal year changes at this moment, not in January or February.",
  daysH="The three days of Khmer New Year",
  days=[
    ("Day 1", "Moha Songkran", "The new year begins at an exact hour worked out by traditional astrologers. Families welcome the new Tevoda, the guardian angel who looks after the coming year, with offerings at home."),
    ("Day 2", "Virak Vanabat", "A day for giving: gifts for parents and grandparents, food for monks, and help for people in need. In some years there are two Vanabat days, so the holiday lasts four days."),
    ("Day 3", "Virak Loeng Sak", "The last day, when the year's Sak — its place in a ten-year cycle — moves up by one. Families bathe Buddha statues and pour scented water over the hands of their elders to ask for blessings."),
  ],
  whenH="So when exactly does the animal year change?",
  when=[
    "In the Khmer calendar, the new animal year starts at the moment of Moha Songkran on the first day of Khmer New Year. Because that moment can fall at any hour of the day, printed Khmer calendars usually show the new animal from the second day.",
    "Two things change during the New Year days, and they are easy to mix up. The <strong>animal</strong> (for example Chnam Momee, the Year of the Horse) changes at Moha Songkran. The <strong>Sak</strong> (for example Atthasak) changes on the last day, Loeng Sak. A full Khmer year name combines both: Chnam Momee Atthasak.",
    "If you were born on Moha Songkran itself, your Khmer animal depends on the time of birth: before the New Year hour you belong to the old animal, after it to the new one.",
  ],
  tableH="Chinese New Year and Khmer New Year, 2024–2030",
  th=["Year", "Chinese New Year", "Khmer New Year", "Different animals between"],
  tableNote="Khmer New Year dates are calculated with the traditional Khmer calendar rules, the same ones our Zodiac Checker uses; they match Cambodia's official holiday dates for 2024–2026. Official public holidays are announced by the government each year, so check the announcement before planning travel.",
  days_word=lambda n: f"{n} days",
  exH="Examples: one birthday, two animals?",
  ex=[
    ("Born 10 January 2026", "Before both New Years.", "Chinese: Snake · Khmer: Snake", "Snake", "Snake"),
    ("Born 1 March 2026", "After Chinese New Year (17 February) but before Khmer New Year (14 April).", "Chinese: Horse · Khmer: Snake", "Horse", "Snake"),
    ("Born 20 April 2026", "After both New Years.", "Chinese: Horse · Khmer: Horse", "Horse", "Horse"),
  ],
  exNote="Anyone born between Chinese New Year and Khmer New Year — roughly from February to mid-April — has a Khmer animal one year behind their Chinese zodiac animal.",
  calcH="Check your animal in both calendars",
  calcP="Enter your birth date. It is worked out in your browser and is not saved or sent anywhere.",
  calcLabel="Date of birth", calcBtn="Show both animals",
  useH="Which one should you use?",
  use=[
    "<strong>For Chinese zodiac readings</strong> — personality, compatibility, lucky colours and elements, as on this website — use the Chinese New Year rule. Our <a href=\"../checker.html\">Zodiac Checker</a> does this for you.",
    "<strong>For Khmer traditions</strong> — the year name elders use, ceremonies at the pagoda, and readings by a Khmer astrologer (hora) — the Khmer calendar is the one that counts, and its animal changes at Khmer New Year.",
    "Many Cambodian families use both without any problem. If your two animals differ, it simply means you were born in the weeks between the two New Years.",
  ],
  faqH="Frequently Asked Questions",
  faq=[
    ("Does the Khmer animal year change on 1 January?", "No. It changes at Khmer New Year in mid-April, at the moment of Moha Songkran. The Gregorian year and the Khmer animal year do not start on the same day."),
    ("Why is Khmer New Year in April when Chinese New Year is in January or February?", "Chinese New Year is set by the moon (the second new moon after the winter solstice). Khmer New Year is set by the sun entering Aries in the traditional Khmer reckoning, which happens in mid-April."),
    ("I was born in March. Which animal am I?", "In the Chinese zodiac you belong to the animal of that calendar year if you were born after Chinese New Year. In the Khmer calendar you still belong to the previous year's animal, because Khmer New Year has not happened yet."),
    ("Is the Khmer zodiac the same as the Chinese zodiac?", "They use the same twelve animals in the same order, and the Khmer names (Choot, Chlov, Khal … Kor) match the Chinese ones. The difference is when each new year starts, and the Khmer calendar adds a ten-year Sak cycle."),
  ],
  next='Read next: <a href="khmer-lunar-calendar-birth-date.html">the Khmer lunar calendar and your lunar birth date</a>, <a href="how-to-calculate-zodiac-sign.html">how your Chinese zodiac sign is calculated</a>, and <a href="../checker.html">find your sign</a>.',
  disc="For cultural interest and entertainment. Khmer New Year customs differ from family to family and region to region.",
  srcH="Sources",
  src=[
    'Royal Government of Cambodia, Sub-Decree No. 167 (2026 public holidays: Khmer New Year 14–16 April), as published by <a href="https://kh.andersen.com/publications/cambodia-sets-official-2026-public-holiday-schedule/" rel="noopener" target="_blank">Andersen in Cambodia</a>.',
    'Khmer New Year and calendar rules as implemented in the open-source <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a> library, which our Zodiac Checker uses.',
    'Chinese New Year dates: the table used by our Zodiac Checker (traditional Chinese calendar).',
  ],
  calc=dict(ch="Chinese zodiac", kh="Khmer calendar", same="Same animal in both calendars.", diff="Different animals: you were born between Chinese New Year and Khmer New Year.", ny="You were born on Moha Songkran, the first day of Khmer New Year — your Khmer animal depends on the time of birth (old animal before the New Year hour, new animal after it).", range="Please choose a date between 1900 and 2060."),
)
T["km"] = dict(
  eyebrow="វប្បធម៌ និងប្រតិទិនខ្មែរ",
  h1="ចូលឆ្នាំខ្មែរ៖ ពេលណាឆ្នាំសត្វពិតជាប្តូរ",
  sub="និងហេតុអ្វីវាខុសពីថ្ងៃចូលឆ្នាំចិន",
  lead="កម្ពុជា និងចិនប្រើសត្វ12ដូចគ្នា ប៉ុន្តែប្តូរឆ្នាំសត្វថ្មីនៅពេលខុសគ្នា។ នេះជាពេលដែលប្រតិទិននីមួយៗប្តូរ និងអត្ថន័យរបស់វាចំពោះថ្ងៃកំណើតរបស់អ្នក។",
  meta='ចុះផ្សាយ <time datetime="2026-10-17">ថ្ងៃទី17 ខែតុលា ឆ្នាំ2026</time> · MyBirthSign',
  intro=[
    "បើសួរលោកយាយថាអ្នកកើតឆ្នាំអ្វី ហើយពិនិត្យលើគេហទំព័ររាសីចិន ជួនកាលអ្នកបានចម្លើយពីរខុសគ្នា។ ចម្លើយទាំងពីរមិនខុសទេ។ កម្ពុជា និងចិនប្រើសត្វ12ដូចគ្នា ចាប់ពីជូតដល់កុរ ប៉ុន្តែប្រតិទិននីមួយៗចាប់ផ្តើមឆ្នាំសត្វថ្មីនៅថ្ងៃចូលឆ្នាំរបស់ខ្លួន — ហើយថ្ងៃចូលឆ្នាំទាំងពីរនេះឃ្លាតគ្នាប្រហែលពីរខែ។",
    "អត្ថបទនេះពន្យល់ថាពេលណាឆ្នាំសត្វប្តូរក្នុងប្រតិទិនខ្មែរ វាខុសពីចូលឆ្នាំចិនយ៉ាងដូចម្តេច និងរបៀបដឹងថាអ្នកកើតឆ្នាំអ្វីក្នុងប្រព័ន្ធនីមួយៗ។",
  ],
  twoH="ចូលឆ្នាំពីរ ថ្ងៃខុសគ្នា",
  cny_t="ចូលឆ្នាំចិន", cny_when="ចុងខែមករា ដល់ពាក់កណ្តាលខែកុម្ភៈ",
  cny_p="ចូលឆ្នាំចិនតាមព្រះចន្ទ។ វាធ្លាក់នៅថ្ងៃព្រះចន្ទថ្មីទីពីរ បន្ទាប់ពីរដូវរងាចាប់ផ្តើម (winter solstice) ដូច្នេះថ្ងៃប្តូររៀងរាល់ឆ្នាំ ជានិច្ចនៅចន្លោះប្រហែលថ្ងៃទី21 មករា ដល់ថ្ងៃទី20 កុម្ភៈ។ សត្វរាសីចិនប្តូរនៅថ្ងៃនោះ។",
  kny_t="ចូលឆ្នាំខ្មែរ", kny_when="ថ្ងៃទី13 ឬ 14 មេសា",
  kny_p="ចូលឆ្នាំខ្មែរតាមព្រះអាទិត្យ។ វាចាប់ផ្តើមនៅមហាសង្ក្រាន្ត ពេលព្រះអាទិត្យចូលរាសីមេស តាមការគណនាបែបខ្មែរ។ ដូច្នេះហើយវាស្ទើរតែចាប់ផ្តើមនៅថ្ងៃទី13 ឬ 14 មេសាជានិច្ច។ ឆ្នាំសត្វខ្មែរប្តូរនៅពេលនេះ មិនមែនក្នុងខែមករា ឬកុម្ភៈទេ។",
  daysH="បីថ្ងៃនៃបុណ្យចូលឆ្នាំខ្មែរ",
  days=[
    ("ថ្ងៃទី1", "មហាសង្ក្រាន្ត", "ឆ្នាំថ្មីចាប់ផ្តើមនៅម៉ោងជាក់លាក់ដែលហោរាគណនាតាមប្រពៃណី។ គ្រួសារនានារៀបចំតុរណ្តាប់ទទួលទេវតាឆ្នាំថ្មី ដែលថែរក្សាឆ្នាំខាងមុខ។"),
    ("ថ្ងៃទី2", "វិរៈវ័នបត", "ជាថ្ងៃនៃការផ្តល់៖ ជូនអំណោយដល់ឪពុកម្តាយ និងជីដូនជីតា ប្រគេនចង្ហាន់ព្រះសង្ឃ និងជួយអ្នកខ្វះខាត។ ឆ្នាំខ្លះមានថ្ងៃវ័នបតពីរថ្ងៃ ដូច្នេះបុណ្យមានរយៈពេលបួនថ្ងៃ។"),
    ("ថ្ងៃទី3", "វិរៈឡើងស័ក", "ជាថ្ងៃចុងក្រោយ ពេលស័កនៃឆ្នាំ — លំដាប់ក្នុងវដ្តដប់ឆ្នាំ — ឡើងមួយ។ គ្រួសារនានាស្រង់ព្រះពុទ្ធរូប និងស្រោចទឹកអប់លើដៃចាស់ទុំ ដើម្បីសុំពរ។"),
  ],
  whenH="ដូច្នេះ ពេលណាពិតប្រាកដដែលឆ្នាំសត្វប្តូរ?",
  when=[
    "ក្នុងប្រតិទិនខ្មែរ ឆ្នាំសត្វថ្មីចាប់ផ្តើមនៅពេលមហាសង្ក្រាន្ត ក្នុងថ្ងៃទីមួយនៃបុណ្យចូលឆ្នាំ។ ដោយសារពេលនោះអាចធ្លាក់នៅម៉ោងណាមួយក្នុងថ្ងៃ ប្រតិទិនខ្មែរបោះពុម្ពជាធម្មតាបង្ហាញឆ្នាំសត្វថ្មីចាប់ពីថ្ងៃទីពីរ។",
    "មានរឿងពីរប្តូរក្នុងថ្ងៃចូលឆ្នាំ ហើយងាយច្រឡំ។ <strong>សត្វ</strong> (ឧទាហរណ៍ ឆ្នាំមមី) ប្តូរនៅមហាសង្ក្រាន្ត។ <strong>ស័ក</strong> (ឧទាហរណ៍ អដ្ឋស័ក) ប្តូរនៅថ្ងៃចុងក្រោយ គឺថ្ងៃឡើងស័ក។ ឈ្មោះឆ្នាំខ្មែរពេញលេញរួមទាំងពីរ៖ ឆ្នាំមមី អដ្ឋស័ក។",
    "ប្រសិនបើអ្នកកើតនៅថ្ងៃមហាសង្ក្រាន្តផ្ទាល់ ឆ្នាំសត្វខ្មែររបស់អ្នកអាស្រ័យលើម៉ោងកំណើត៖ មុនម៉ោងចូលឆ្នាំ អ្នកនៅឆ្នាំសត្វចាស់ ក្រោយម៉ោងនោះ អ្នកនៅឆ្នាំសត្វថ្មី។",
  ],
  tableH="ចូលឆ្នាំចិន និងចូលឆ្នាំខ្មែរ ឆ្នាំ2024–2030",
  th=["ឆ្នាំ", "ចូលឆ្នាំចិន", "ចូលឆ្នាំខ្មែរ", "សត្វខុសគ្នាចន្លោះ"],
  tableNote="ថ្ងៃចូលឆ្នាំខ្មែរគណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី ដូចដែលម៉ាស៊ីនពិនិត្យរាសីរបស់យើងប្រើ ហើយត្រូវគ្នានឹងថ្ងៃឈប់សម្រាកផ្លូវការរបស់កម្ពុជាឆ្នាំ2024–2026។ ថ្ងៃឈប់សម្រាកផ្លូវការត្រូវបានប្រកាសដោយរាជរដ្ឋាភិបាលរៀងរាល់ឆ្នាំ សូមពិនិត្យសេចក្តីប្រកាសមុនរៀបចំការធ្វើដំណើរ។",
  days_word=lambda n: f"{n} ថ្ងៃ",
  exH="ឧទាហរណ៍៖ ថ្ងៃកំណើតមួយ សត្វពីរ?",
  ex=[
    ("កើតថ្ងៃទី10 មករា 2026", "មុនចូលឆ្នាំទាំងពីរ។", "ចិន៖ ម្សាញ់ · ខ្មែរ៖ ម្សាញ់", "Snake", "Snake"),
    ("កើតថ្ងៃទី1 មីនា 2026", "ក្រោយចូលឆ្នាំចិន (17 កុម្ភៈ) តែមុនចូលឆ្នាំខ្មែរ (14 មេសា)។", "ចិន៖ មមី · ខ្មែរ៖ ម្សាញ់", "Horse", "Snake"),
    ("កើតថ្ងៃទី20 មេសា 2026", "ក្រោយចូលឆ្នាំទាំងពីរ។", "ចិន៖ មមី · ខ្មែរ៖ មមី", "Horse", "Horse"),
  ],
  exNote="អ្នកដែលកើតចន្លោះចូលឆ្នាំចិន និងចូលឆ្នាំខ្មែរ — ប្រហែលពីខែកុម្ភៈ ដល់ពាក់កណ្តាលខែមេសា — មានឆ្នាំសត្វខ្មែរក្រោយឆ្នាំរាសីចិនមួយឆ្នាំ។",
  calcH="ពិនិត្យឆ្នាំសត្វរបស់អ្នកក្នុងប្រតិទិនទាំងពីរ",
  calcP="បញ្ចូលថ្ងៃកំណើតរបស់អ្នក។ ការគណនាធ្វើក្នុងកម្មវិធីរុករករបស់អ្នក ហើយមិនត្រូវបានរក្សាទុក ឬផ្ញើទៅណាទេ។",
  calcLabel="ថ្ងៃខែឆ្នាំកំណើត", calcBtn="បង្ហាញឆ្នាំសត្វទាំងពីរ",
  useH="តើគួរប្រើមួយណា?",
  use=[
    "<strong>សម្រាប់ការអានរាសីចិន</strong> — បុគ្គលិកលក្ខណៈ ភាពត្រូវគ្នា ពណ៌ និងធាតុសំណាង ដូចក្នុងគេហទំព័រនេះ — ប្រើវិធានចូលឆ្នាំចិន។ <a href=\"../checker.html\">ម៉ាស៊ីនពិនិត្យរាសី</a>របស់យើងធ្វើវាឱ្យអ្នក។",
    "<strong>សម្រាប់ប្រពៃណីខ្មែរ</strong> — ឈ្មោះឆ្នាំដែលចាស់ទុំប្រើ ពិធីនៅវត្ត និងការមើលដោយហោរាខ្មែរ — ប្រតិទិនខ្មែរជាអ្នកកំណត់ ហើយឆ្នាំសត្វរបស់វាប្តូរនៅពេលចូលឆ្នាំខ្មែរ។",
    "គ្រួសារខ្មែរជាច្រើនប្រើទាំងពីរដោយគ្មានបញ្ហា។ ប្រសិនបើឆ្នាំសត្វទាំងពីររបស់អ្នកខុសគ្នា វាគ្រាន់តែមានន័យថាអ្នកកើតក្នុងសប្តាហ៍ចន្លោះចូលឆ្នាំទាំងពីរ។",
  ],
  faqH="សំណួរដែលសួរញឹកញាប់",
  faq=[
    ("តើឆ្នាំសត្វខ្មែរប្តូរនៅថ្ងៃទី1 មករាឬ?", "ទេ។ វាប្តូរនៅពេលចូលឆ្នាំខ្មែរក្នុងពាក់កណ្តាលខែមេសា នៅពេលមហាសង្ក្រាន្ត។ ឆ្នាំសុរិយគតិ និងឆ្នាំសត្វខ្មែរមិនចាប់ផ្តើមថ្ងៃតែមួយទេ។"),
    ("ហេតុអ្វីចូលឆ្នាំខ្មែរនៅខែមេសា ចំណែកចូលឆ្នាំចិននៅខែមករា ឬកុម្ភៈ?", "ចូលឆ្នាំចិនកំណត់តាមព្រះចន្ទ (ព្រះចន្ទថ្មីទីពីរក្រោយរដូវរងាចាប់ផ្តើម)។ ចូលឆ្នាំខ្មែរកំណត់តាមព្រះអាទិត្យចូលរាសីមេស តាមការគណនាបែបខ្មែរ ដែលកើតឡើងនៅពាក់កណ្តាលខែមេសា។"),
    ("ខ្ញុំកើតក្នុងខែមីនា។ តើខ្ញុំកើតឆ្នាំអ្វី?", "ក្នុងរាសីចិន អ្នកជាសត្វនៃឆ្នាំនោះ ប្រសិនបើកើតក្រោយចូលឆ្នាំចិន។ ក្នុងប្រតិទិនខ្មែរ អ្នកនៅតែជាសត្វនៃឆ្នាំមុន ព្រោះមិនទាន់ចូលឆ្នាំខ្មែរនៅឡើយ។"),
    ("តើរាសីខ្មែរដូចរាសីចិនឬទេ?", "ពួកវាប្រើសត្វ12ដូចគ្នា តាមលំដាប់ដូចគ្នា ហើយឈ្មោះខ្មែរ (ជូត ឆ្លូវ ខាល … កុរ) ត្រូវនឹងឈ្មោះចិន។ ភាពខុសគ្នាគឺពេលដែលឆ្នាំថ្មីនីមួយៗចាប់ផ្តើម ហើយប្រតិទិនខ្មែរមានវដ្តស័កដប់ឆ្នាំបន្ថែម។"),
  ],
  next='អានបន្ត៖ <a href="khmer-lunar-calendar-birth-date.html">ប្រតិទិនចន្ទគតិខ្មែរ និងថ្ងៃខែកំណើតតាមចន្ទគតិ</a> <a href="how-to-calculate-zodiac-sign.html">របៀបគណនារាសីចិន</a> និង<a href="../checker.html">ស្វែងរករាសីរបស់អ្នក</a>។',
  disc="សម្រាប់ការស្វែងយល់វប្បធម៌ និងការកម្សាន្ត។ ទំនៀមទម្លាប់ចូលឆ្នាំខ្មែរខុសគ្នាពីគ្រួសារមួយទៅគ្រួសារមួយ និងពីតំបន់មួយទៅតំបន់មួយ។",
  srcH="ប្រភព",
  src=None,
  calc=dict(ch="រាសីចិន", kh="ប្រតិទិនខ្មែរ", same="ឆ្នាំសត្វដូចគ្នាក្នុងប្រតិទិនទាំងពីរ។", diff="ឆ្នាំសត្វខុសគ្នា៖ អ្នកកើតចន្លោះចូលឆ្នាំចិន និងចូលឆ្នាំខ្មែរ។", ny="អ្នកកើតនៅថ្ងៃមហាសង្ក្រាន្ត ថ្ងៃទីមួយនៃបុណ្យចូលឆ្នាំខ្មែរ — ឆ្នាំសត្វខ្មែររបស់អ្នកអាស្រ័យលើម៉ោងកំណើត (សត្វចាស់មុនម៉ោងចូលឆ្នាំ សត្វថ្មីក្រោយម៉ោងនោះ)។", range="សូមជ្រើសរើសថ្ងៃចន្លោះឆ្នាំ 1900 ដល់ 2060។"),
)
T["zh"] = dict(
  eyebrow="高棉文化与历法",
  h1="高棉新年：生肖年究竟何时更换",
  sub="以及为什么它和农历新年不是同一天",
  lead="柬埔寨和中国使用同样的十二生肖，但开始新生肖年的时间不同。下面说明两者各在何时更换，以及这对你的生日意味着什么。",
  meta='发布于 <time datetime="2026-10-17">2026年10月17日</time> · MyBirthSign',
  intro=[
    "问柬埔寨的奶奶你属什么，再去查中国生肖网站，有时会得到两个不同的答案。两个答案都没有错。柬埔寨和中国共用从鼠到猪的十二生肖，但各自的历法在自己的新年开始新的生肖年——而这两个新年相隔大约两个月。",
    "本指南说明高棉历中生肖年究竟何时更换、与农历新年有何不同，以及如何判断你在两种体系中各属什么。",
  ],
  twoH="两个新年，两个不同的日期",
  cny_t="农历新年", cny_when="1月下旬至2月中旬",
  cny_p="农历新年依据月亮。它落在冬至后的第二个新月，所以日期每年不同，总在大约1月21日至2月20日之间。中国生肖在这一天更换。",
  kny_t="高棉新年", kny_when="4月13日或14日",
  kny_p="高棉新年依据太阳。它从“大宋干”（Moha Songkran）开始，即按照高棉传统推算，太阳进入白羊宫（Mesa）的时刻。因此它几乎总是在4月13日或14日开始。高棉生肖年在这一刻更换，而不是在1月或2月。",
  daysH="高棉新年的三天",
  days=[
    ("第1天", "大宋干（មហាសង្ក្រាន្ត）", "新年在传统星相师推算出的确切时刻开始。家家户户在家中摆设供品，迎接守护来年的新年天神（Tevoda）。"),
    ("第2天", "万那巴日（វិរៈវ័នបត）", "布施的日子：给父母和祖父母送礼，为僧侣供斋，帮助有需要的人。有些年份有两天万那巴日，所以假期共四天。"),
    ("第3天", "升年日（វិរៈឡើងស័ក）", "最后一天，这一年的“萨”（Sak，十年周期中的序数）加一。家人为佛像沐浴，并把香水洒在长辈手上，祈求祝福。"),
  ],
  whenH="那么生肖年究竟何时更换？",
  when=[
    "在高棉历中，新的生肖年从新年第一天“大宋干”的那一刻开始。因为这个时刻可能落在一天中的任何时间，印刷的高棉日历通常从第二天起标注新的生肖。",
    "新年期间有两样东西会变，很容易混淆。<strong>生肖</strong>（例如 ឆ្នាំមមី，马年）在大宋干时更换。<strong>萨</strong>（例如 អដ្ឋស័ក，Atthasak）在最后一天升年日更换。完整的高棉年名包含两者：ឆ្នាំមមី អដ្ឋស័ក。",
    "如果你正好出生在大宋干当天，你的高棉生肖取决于出生时间：在新年时刻之前属旧生肖，之后属新生肖。",
  ],
  tableH="2024–2030年的农历新年与高棉新年",
  th=["年份", "农历新年", "高棉新年", "生肖不同的时段"],
  tableNote="高棉新年日期按照传统高棉历法规则计算，与我们的生肖查询所用规则相同；与柬埔寨2024–2026年的官方假期日期一致。官方公共假期每年由政府公布，安排出行前请查看公告。",
  days_word=lambda n: f"共{n}天",
  exH="例子：一个生日，两个生肖？",
  ex=[
    ("2026年1月10日出生", "在两个新年之前。", "中国：蛇 · 高棉：蛇", "Snake", "Snake"),
    ("2026年3月1日出生", "在农历新年（2月17日）之后，但在高棉新年（4月14日）之前。", "中国：马 · 高棉：蛇", "Horse", "Snake"),
    ("2026年4月20日出生", "在两个新年之后。", "中国：马 · 高棉：马", "Horse", "Horse"),
  ],
  exNote="凡是出生在农历新年和高棉新年之间——大约2月到4月中旬——的人，高棉生肖都比中国生肖晚一年。",
  calcH="查看你在两种历法中的生肖",
  calcP="输入你的出生日期。计算在你的浏览器中完成，不会被保存或发送到任何地方。",
  calcLabel="出生日期", calcBtn="显示两个生肖",
  useH="应该用哪一个？",
  use=[
    "<strong>中国生肖解读</strong>——性格、配对、幸运颜色和五行，就像本网站一样——请用农历新年的规则。我们的<a href=\"../checker.html\">生肖查询</a>会帮你算好。",
    "<strong>高棉传统</strong>——长辈说的年名、寺庙里的仪式，以及高棉星相师（ហោរា）的解读——以高棉历为准，它的生肖在高棉新年更换。",
    "许多柬埔寨家庭同时使用两者，毫无问题。如果你的两个生肖不同，只是说明你出生在两个新年之间的那几周。",
  ],
  faqH="常见问题",
  faq=[
    ("高棉生肖年是在1月1日更换的吗？", "不是。它在4月中旬高棉新年的大宋干时刻更换。公历年和高棉生肖年并不在同一天开始。"),
    ("为什么高棉新年在4月，而农历新年在1月或2月？", "农历新年由月亮决定（冬至后的第二个新月）。高棉新年由太阳进入白羊宫决定（高棉传统推算），这发生在4月中旬。"),
    ("我出生在3月，属什么？", "在中国生肖里，如果你出生在农历新年之后，就属当年的生肖。在高棉历里，你仍属上一年的生肖，因为高棉新年还没到。"),
    ("高棉生肖和中国生肖一样吗？", "两者使用同样的十二生肖、同样的顺序，高棉名称（ជូត、ឆ្លូវ、ខាល……កុរ）与中国名称一一对应。不同之处在于新年开始的时间，而且高棉历还多了一个十年的“萨”周期。"),
  ],
  next='延伸阅读：<a href="khmer-lunar-calendar-birth-date.html">高棉农历与你的农历生日</a>、<a href="how-to-calculate-zodiac-sign.html">生肖是如何推算的</a>，以及<a href="../checker.html">查找你的生肖</a>。',
  disc="仅供文化兴趣与娱乐。高棉新年的习俗因家庭和地区而异。",
  srcH="资料来源",
  src=None,
  calc=dict(ch="中国生肖", kh="高棉历", same="两种历法中生肖相同。", diff="生肖不同：你出生在农历新年和高棉新年之间。", ny="你出生在大宋干，即高棉新年的第一天——你的高棉生肖取决于出生时间（新年时刻之前为旧生肖，之后为新生肖）。", range="请选择1900年至2060年之间的日期。"),
)
T["km"]["src"] = [
  'រាជរដ្ឋាភិបាលកម្ពុជា អនុក្រឹត្យលេខ 167 (ថ្ងៃឈប់សម្រាកឆ្នាំ2026៖ ចូលឆ្នាំខ្មែរ 14–16 មេសា) ផ្សាយដោយ <a href="https://kh.andersen.com/publications/cambodia-sets-official-2026-public-holiday-schedule/" rel="noopener" target="_blank">Andersen in Cambodia</a>។',
  'វិធានចូលឆ្នាំ និងប្រតិទិនខ្មែរ តាមបណ្ណាល័យកូដចំហ <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a> ដែលម៉ាស៊ីនពិនិត្យរាសីរបស់យើងប្រើ។',
  'ថ្ងៃចូលឆ្នាំចិន៖ តារាងដែលម៉ាស៊ីនពិនិត្យរាសីរបស់យើងប្រើ (ប្រតិទិនចិនបែបប្រពៃណី)។',
]
T["zh"]["src"] = [
  '柬埔寨王国政府第167号次级法令（2026年公共假期：高棉新年4月14日至16日），由<a href="https://kh.andersen.com/publications/cambodia-sets-official-2026-public-holiday-schedule/" rel="noopener" target="_blank">Andersen in Cambodia</a>发布。',
  '高棉新年与历法规则依据开源库<a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a>的实现，我们的生肖查询使用的就是它。',
  '农历新年日期：我们的生肖查询所用的日期表（中国传统历法）。',
]

def window(lang, r):
    a, b = dfmt(lang, *r["cny"]), dfmt(lang, r["kny"][0], r["kny"][1] - 1)
    return f"{a} – {b}"

def body(lang):
    t = T[lang]
    o = []
    o.append(f'<div data-lang-content="{lang}">')
    o.append('<article class="post container fe hc kny">')
    o.append(f'''  <header class="fe-hero">
    <img class="fe-hero-bg" src="../images/fortune/hero-night.webp" width="1400" height="580" alt="" fetchpriority="high">
    <div class="fe-hero-in">
      <p class="fe-eyebrow">{t["eyebrow"]}</p>
      <h1>{t["h1"]}</h1>
      <p class="fe-sub"><span aria-hidden="true">✦</span> {t["sub"]} <span aria-hidden="true">✦</span></p>
      <p class="fe-lead">{t["lead"]}</p>
      <p class="fe-meta">{t["meta"]}</p>
    </div>
  </header>''')
    card = {"cardType": "guide", "lang": lang, "eyebrow": html.unescape(t["eyebrow"]), "title": t["h1"], "sub": t["sub"],
            "icons": [["images/business/animals/s144/horse.webp", name(lang, "Horse"), "#f6dc9b"], ["images/business/animals/s144/snake.webp", name(lang, "Snake"), "#f6dc9b"]],
            "points": [t["cny_t"] + ": " + t["cny_when"], t["kny_t"] + ": " + t["kny_when"]]}
    o.append(f'  <div class="share-row" data-share data-share-card="{html.escape(json.dumps(card, ensure_ascii=False), quote=True)}" data-share-url="/blog/{SLUG}.html"></div>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["intro"]) + "</div>")
    o.append(f'  <h2 class="fe-h2">{t["twoH"]}</h2>')
    o.append(f'''  <div class="kny-two">
    <section class="zc-box kny-card kny-cny"><p class="kny-tag">{t["cny_when"]}</p><h3>{t["cny_t"]}</h3><p>{t["cny_p"]}</p></section>
    <section class="zc-box kny-card kny-kny"><p class="kny-tag">{t["kny_when"]}</p><h3>{t["kny_t"]}</h3><p>{t["kny_p"]}</p></section>
  </div>''')
    o.append(f'  <h2 class="fe-h2">{t["daysH"]}</h2>')
    o.append('  <ol class="kny-days">' + "".join(f'<li class="zc-box"><span class="kny-day">{d}</span><h3>{n}</h3><p>{p}</p></li>' for d, n, p in t["days"]) + "</ol>")
    o.append(f'  <h2 class="fe-h2">{t["whenH"]}</h2>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["when"]) + "</div>")
    o.append('  <div class="ad-slot">Ad space</div>')
    o.append(f'  <h2 class="fe-h2">{t["tableH"]}</h2>')
    rows = "".join(
        f'<tr><td>{r["y"]}</td><td>{dfmt(lang, *r["cny"])}<span class="kny-an">{name(lang, r["chin"])}</span></td>'
        f'<td>{rng(lang, r["kny"][0], r["kny"][1], r["knyEnd"][1])}<span class="kny-an">{name(lang, r["chin"])} · {t["days_word"](r["nDays"])}</span></td>'
        f'<td>{window(lang, r)}<span class="kny-an">{name(lang, r["chin"])} / {name(lang, r["khPrev"])}</span></td></tr>'
        for r in D)
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table kny-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["th"])}</tr></thead><tbody>{rows}</tbody></table></div>')
    o.append(f'  <p class="kny-note">{t["tableNote"]}</p>')
    o.append(f'  <h2 class="fe-h2">{t["exH"]}</h2>')
    o.append('  <ul class="kny-exs">' + "".join(
        f'<li class="zc-box"><div class="kny-ex-meds">{med(c)}{med(k)}</div><h3>{h}</h3><p>{p}</p><b class="kny-your{" kny-diff" if c != k else ""}">{res}</b></li>'
        for h, p, res, c, k in t["ex"]) + "</ul>")
    o.append(f'  <p class="kny-note">{t["exNote"]}</p>')
    o.append(f'''  <section class="zc-box hc-calc kny-calc" data-kny-calc data-lang="{lang}">
    <h2 class="zc-bh">{t["calcH"]}</h2>
    <p>{t["calcP"]}</p>
    <form class="hc-form" novalidate>
      <label for="kny-dob-{lang}">{t["calcLabel"]}</label>
      <input id="kny-dob-{lang}" type="date" min="1900-01-01" max="2060-12-31" required>
      <button type="submit" class="fe-btn">{t["calcBtn"]}</button>
    </form>
    <div class="kny-out" aria-live="polite" hidden></div>
  </section>''')
    o.append(f'  <h2 class="fe-h2">{t["useH"]}</h2>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["use"]) + "</div>")
    o.append(f'  <h2 class="fe-h2">{t["faqH"]}</h2>')
    o.append('  <div class="klb-faq">' + "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in t["faq"]) + "</div>")
    o.append(f'  <div class="fe-text"><p>{t["next"]}</p></div>')
    o.append(f'  <p class="disclaimer">{t["disc"]}</p>')
    o.append(f'  <h3 class="klb-src-h">{t["srcH"]}</h3>')
    o.append('  <ul class="klb-src">' + "".join(f"<li>{s}</li>" for s in t["src"]) + "</ul>")
    o.append("</article>")
    o.append("</div>")
    return "\n".join(o)

CALC_JS = r"""<script src="../js/vendor/momentkh.min.js" defer></script>
<script>
/* Both calendars at once: Chinese animal from js/zodiac-data.js getZodiac (Lunar New Year dates 1900–2060),
   Khmer animal from js/vendor/momentkh.min.js (traditional Khmer calendar, changes at Khmer New Year). Nothing is saved or sent. */
document.addEventListener("DOMContentLoaded", function () {
  var AN = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  var NM = { en: null, km: %KM%, zh: %ZH% };
  var S = %S%;
  document.querySelectorAll("[data-kny-calc]").forEach(function (box) {
    var lang = box.getAttribute("data-lang"), s = S[lang] || S.en, nm = function (a) { return NM[lang] ? NM[lang][a] : a; };
    var form = box.querySelector("form"), input = box.querySelector("input"), out = box.querySelector(".kny-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.value || ""); out.hidden = false;
      if (!m || +m[1] < 1900 || +m[1] > 2060 || typeof getZodiac !== "function" || !window.momentkh) { out.innerHTML = '<p class="hc-err">' + s.range + "</p>"; return; }
      var y = +m[1], mo = +m[2], d = +m[3], M = window.momentkh;
      var ch = getZodiac(new Date(y, mo - 1, d)).animal, kh = AN[M.fromGregorian(y, mo, d).khmer.animalYear];
      var ny = M.getNewYear(y), onNy = ny && ny.month === mo && ny.day === d;
      var img = function (a) { return '<img src="../images/business/animals/s144/' + a.toLowerCase() + '.webp" width="64" height="64" alt="">'; };
      out.innerHTML = '<div class="kny-res"><div>' + img(ch) + "<span>" + s.ch + "</span><b>" + nm(ch) + '</b></div><div>' + img(kh) + "<span>" + s.kh + "</span><b>" + nm(kh) + "</b></div></div>" +
        "<p>" + (onNy ? s.ny : ch === kh ? s.same : s.diff) + "</p>";
    });
  });
});
</script>"""

def build():
    src = open(R + "blog/how-to-calculate-zodiac-sign.html").read()
    head, rest = src.split('<div data-lang-content="en">', 1)
    foot = rest[rest.index('<footer class="site-footer">'):]
    foot = foot[:foot.index("<script src=\"../js/zodiac-data.js\" defer></script>") + len("<script src=\"../js/zodiac-data.js\" defer></script>")] + "\n" + \
        CALC_JS.replace("%KM%", json.dumps(KM, ensure_ascii=False)).replace("%ZH%", json.dumps(ZH, ensure_ascii=False)).replace("%S%", json.dumps({l: T[l]["calc"] for l in T}, ensure_ascii=False)) + \
        "\n<script src=\"../js/khmer-lunar.js\" defer></script>\n</body>\n</html>\n"
    t = T["en"]
    title = "Khmer New Year: When the Animal Year Really Changes (and Why It Differs from Chinese New Year)"
    desc = "When the Khmer animal year really changes: Moha Songkran in mid-April, the three days of Khmer New Year, why it differs from Chinese New Year, a 2024–2030 table and a calculator for both calendars."
    head = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)} | MyBirthSign</title>", head, flags=re.S)
    head = head.replace("https://mybirthsign.com/blog/how-to-calculate-zodiac-sign.html", URL)
    head = re.sub(r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + html.escape(title, quote=True), head)
    head = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = head.replace("https://mybirthsign.com/images/og/calculate-zodiac.jpg", "https://mybirthsign.com/images/og/khmer-new-year.jpg")
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "headline": title, "description": desc, "image": "https://mybirthsign.com/images/og/khmer-new-year.jpg",
         "datePublished": "2026-10-17", "dateModified": "2026-10-17", "inLanguage": "en", "author": {"@type": "Organization", "name": "MyBirthSign"},
         "publisher": {"@type": "Organization", "name": "MyBirthSign", "url": "https://mybirthsign.com/"}, "mainEntityOfPage": URL},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mybirthsign.com/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mybirthsign.com/blog"},
            {"@type": "ListItem", "position": 3, "name": "Khmer New Year and the animal year"}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub("<[^>]+>", "", a)}} for q, a in t["faq"]]}]}
    head = re.sub(r'<script type="application/ld\+json">.*?</script>', lambda m: '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace("<", "\\u003c") + "</script>", head, flags=re.S)
    head = head.replace('href="../images/guides/khmer-lunar-wide.webp"', 'href="../images/fortune/hero-night.webp"')
    out = head + "\n".join(body(l) for l in ("en", "km", "zh")) + "\n\n" + foot
    open(R + f"blog/{SLUG}.html", "w").write(out)
    print("wrote", SLUG, len(out))
build()
