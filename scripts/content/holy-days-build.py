#!/usr/bin/env python3
"""Builds blog/cambodian-buddhist-holy-days.html (EN / KM / ZH) on the site's guide design.

   python3 scripts/content/holy-days-build.py

Dates: scripts/content/holy-days-data.json, computed with js/vendor/momentkh.min.js for 2000-2040
(the same Khmer calendar rules as the Khmer Calendar page). 2026 public-holiday status comes from
Sub-Decree No. 167 as published by Andersen Cambodia. Festival meanings follow Access to Insight
("Uposatha Observance Days"). The "next holy days" box computes the same rules live in the browser.
"""
import json, html, re, os

R = "/home/claude/mybirthsign/"
D = json.load(open(os.path.join(os.path.dirname(__file__), "holy-days-data.json")))
SLUG = "cambodian-buddhist-holy-days"
URL = f"https://mybirthsign.com/blog/{SLUG}"
OG = "https://mybirthsign.com/images/og/buddhist-holy-days.jpg"
SRC_ATI = "https://accesstoinsight.org/ptf/dhamma/sila/uposatha.html"
SRC_GOV = "https://kh.andersen.com/publications/cambodia-sets-official-2026-public-holiday-schedule/"

ENM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
KMM = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]
ZHM = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
LUN_EN = ["Migasir", "Boss", "Meak", "Phalkun", "Chet", "Pisak", "Jesth", "Asadh", "Srap", "Phatrabot", "Assoch", "Kadeuk", "1st Asadh", "2nd Asadh"]
LUN_KM = ["មិគសិរ", "បុស្ស", "មាឃ", "ផល្គុន", "ចេត្រ", "ពិសាខ", "ជេស្ឋ", "អាសាឍ", "ស្រាពណ៍", "ភទ្របទ", "អស្សុជ", "កត្ដិក", "បឋមាសាឍ", "ទុតិយាសាឍ"]
LUN_ORDER = [0, 1, 2, 3, 4, 5, 6, 12, 7, 13, 8, 9, 10, 11]

def d_en(s, year=True):
    y, m, d = map(int, s.split("-")) if s.count("-") == 2 else (None, *map(int, s.split("-")))
    return f"{d} {ENM[m-1]}" + (f" {y}" if year and y else "")
def d_km(s, year=True):
    y, m, d = map(int, s.split("-")) if s.count("-") == 2 else (None, *map(int, s.split("-")))
    return f"{d} {KMM[m-1]}" + (f" {y}" if year and y else "")
def d_zh(s, year=True):
    y, m, d = map(int, s.split("-")) if s.count("-") == 2 else (None, *map(int, s.split("-")))
    return (f"{y}年" if year and y else "") + f"{m}月{d}日"
DF = {"en": d_en, "km": d_km, "zh": d_zh}

def rng(lang, key):
    a, b = D["ranges"][key]; f = DF[lang]
    return {"en": f"{f(a)} – {f(b)}", "km": f"{f(a)} – {f(b)}", "zh": f"{f(a)}至{f(b)}"}[lang]
def y26(key): return D["y2026"][key][0]
def y27(key): return D["y2027"][key][0]

# ------------------------------------------------------------------ text
T = {}
T["en"] = dict(
  eyebrow="Khmer Culture &amp; Calendar",
  h1="Cambodian Buddhist Holy Days",
  sub="A guide to Thngai Sil, full-moon observances and Buddhist festivals throughout the year",
  lead="Four days in every lunar month are Thngai Sil, Buddhist holy days kept at pagodas across Cambodia. A few full moons a year are major festivals. This guide explains both, month by month, and shows how to find the exact dates.",
  meta='Published <time datetime="2026-10-18">October 18, 2026</time> · MyBirthSign',
  heroAlt="A monk seated beside lotus offerings while lay people in white pray in front of a lit pagoda at night",
  introH="Buddhism in everyday Cambodian life",
  intro=[
    "Theravada Buddhism runs through Cambodian life: the pagoda (wat) is a place of worship, a community hall and, for many families, the place where children first learn to read. The rhythm of the year follows the lunar calendar, and so does the rhythm of the month.",
    "That monthly rhythm is <em>Thngai Sil</em>, literally \"precept day\". On these days many Buddhists visit the pagoda, offer food to the monks, listen to a Dharma talk, meditate and keep the Five Precepts, and some keep the Eight Precepts. Not every family observes every holy day, and customs differ between pagodas and regions, but almost every Cambodian knows when a Sil day falls.",
  ],
  whatH="What is Thngai Sil?",
  what=[
    "Thngai Sil follows the Khmer lunar calendar, not the Gregorian one, so the dates move every year. A lunar month has a waxing half (koeut) and a waning half (roach). The holy days are the 8th waxing day, the full moon (15th waxing day), the 8th waning day and the last waning day (the 14th or 15th, the new moon).",
    f"The custom goes back to the <em>uposatha</em>, the observance days of early Buddhism. On full-moon and new-moon days monks gather to recite their monastic rules, and lay people take the precepts as a support for practice (<a href=\"{SRC_ATI}\" rel=\"noopener\">Access to Insight</a>). How many of the four days a family keeps, and how strictly, is a personal and local choice.",
  ],
  stripH="The four holy days of a lunar month",
  strip=[("8", "8th waxing day", "Quarter moon"), ("15", "Full moon", "15th waxing day"), ("8", "8th waning day", "Quarter moon"), ("14/15", "Last waning day", "New moon")],
  kindsH="Four kinds of day — not the same thing",
  kinds=[
    ("sil", "Regular holy days", "Thngai Sil: the four lunar days above, every month of the year."),
    ("moon", "Full-moon observances", "Every full moon is a Sil day and usually the best attended. Most are ordinary holy days."),
    ("fest", "Major Buddhist festivals", "A few particular full moons (Meak, Visak, Asalha) and the seasons of Vassa and Pchum Ben."),
    ("hol", "Public holidays", "Set each year by the government. Some are Buddhist (Visak Bochea, Pchum Ben); others are royal or cultural (Royal Ploughing, Water Festival, Khmer New Year)."),
  ],
  monthsH="Month by month",
  monthsP="Lunar months do not line up with Gregorian months, so the same festival can fall in different months in different years. Each card shows which lunar full moons can fall in that month, the holy days and the festivals that can land there, with this year's and next year's dates.",
  fullOf="Full moon of", orWord="or", silLine="Thngai Sil: about 4 days (sometimes 5)",
  noFest="No major Buddhist festival — regular holy days only.",
  notThis="Not in this month in 2026 or 2027",
  tagLunar="Lunar date · varies", tagSolar="Solar date", tagRange="Can fall",
  y26="2026", y27="2027",
  festH="Major Cambodian Buddhist festivals",
  festP="These are the special days of the Buddhist year. All follow the lunar calendar, so the Gregorian date changes every year; the range shows the earliest and latest dates between 2000 and 2040.",
  lbl=dict(when="When", do="What people do", holiday="Public holiday 2026", varies="Date changes every year", range="Range 2000–2040"),
  fest=[
    ("meak", "Meak Bochea", "🪷",
     "Remembers the day 1,250 enlightened monks gathered before the Buddha without being called, and he gave them the Ovada Patimokkha, a short summary of the teaching: avoid evil, do good, purify the mind.",
     "Full moon of Meak, the 3rd lunar month.",
     "Morning offerings to the monks, a Dharma talk, and in the evening a candle procession, walking three times around the vihara with candles, incense and flowers.",
     "No (not on the 2026 list)."),
    ("visak", "Visak Bochea", "🪷",
     "The most important day of the Buddhist year: it remembers the Buddha's birth, his enlightenment and his passing away, which tradition places on the same full-moon day.",
     "Full moon of Pisak, the 6th lunar month.",
     "Merit-making at the pagoda, keeping the precepts, Dharma talks and an evening candle procession around the vihara.",
     "Yes (1 May 2026, the same day as Labour Day)."),
    ("asalha", "Asalha Bochea", "🪷",
     "Remembers the Buddha's first sermon to five ascetics. One of them, Kondañña, understood it and became the first monk, so the Buddha, his teaching and the community of monks were complete.",
     "Full moon of Asadh, the 8th lunar month (the 2nd Asadh in years with a leap month).",
     "Offerings and a Dharma talk at the pagoda; it is also the eve of the rains retreat.",
     "No."),
    ("chol", "Chol Vassa (Buddhist Lent begins)", "🕯️",
     "Monks begin the three-month rains retreat and stay at one monastery for the season.",
     "1st waning day of Asadh, the day after Asalha Bochea.",
     "Young men are ordained before the retreat; families offer large Vassa candles and rain-bathing cloths. <a href=\"chol-vassa-buddhist-lent.html\">Read our Chol Vassa guide</a>.",
     "No."),
    ("pchumben", "Pchum Ben", "🏯",
     "Cambodia's festival for the dead: 15 days at the end of Phatrabot when merit is dedicated to parents, grandparents and all ancestors. Tradition holds that spirits of the dead, some of them suffering, return to seek food and merit from their relatives.",
     "The first 14 waning days of Phatrabot are Kan Ben, when families take turns bringing food to the pagoda; the 15th (last waning day) is Pchum Ben day.",
     "Food offerings to the monks in the names of the dead, and before dawn rice balls (bay ben) offered around the vihara. Families travel home, so cities empty.",
     "Yes (10–12 October 2026)."),
    ("chenh", "Chenh Vassa and the Kathin season", "🕯️",
     "The rains retreat ends; in the month that follows, communities offer new robes and gifts to the monks in the Kathin ceremony (Kathin Teann).",
     "Chenh Vassa is the full moon of Assoch; the Kathin season runs until the full moon of Kadeuk.",
     "Kathin processions with music, robes and gifts. Each pagoda can receive the Kathin offering once a season, so groups often travel to a pagoda in their home village.",
     "No."),
  ],
  relH="Related days that are not Buddhist holy days",
  rel=[
    ("Khmer New Year", "Solar date: 13 or 14 April, for three or four days.", "A national, cultural New Year with Buddhist customs: visiting the pagoda, building sand stupas and bathing Buddha statues and elders. Public holiday (14–16 April 2026)."),
    ("Royal Ploughing Ceremony", "4th waning day of Pisak, four days after Visak Bochea.", "A royal agricultural rite that forecasts the harvest. Public holiday (5 May 2026)."),
    ("Water Festival (Bon Om Touk)", "The full moon of Kadeuk and the days around it.", "A royal and cultural festival of boat races, illuminated floats and saluting the moon; it falls on the last day of the Kathin season. Public holiday (23–25 November 2026)."),
  ],
  doH="What people do on Thngai Sil",
  doAlt="A monk with an alms bowl watches lay people kneeling with candles and flowers in front of a golden pagoda under the full moon",
  do=[
    ("Visit the pagoda", "often early in the morning, many people dressed in white."),
    ("Offer food to the monks", "rice, dishes and fruit, given before midday."),
    ("Listen to a Dharma talk", "and join the chanting led by the monks."),
    ("Meditate", "alone or with the community, at the pagoda or at home."),
    ("Keep the precepts", "the Five Precepts: no killing, no stealing, no sexual misconduct, no lying, no intoxicants. Some keep the Eight, adding no food after midday, no entertainment or adornment, and no luxurious beds."),
    ("Give and help", "donations to the pagoda and help for people in need."),
    ("Reflect", "a quieter day: many avoid parties and alcohol."),
  ],
  doNote="Customs vary: some families keep every holy day, others only the full moon or the big festivals, and practice differs between pagodas and regions.",
  findH="How to find the dates for this year",
  findP="Thngai Sil and the festivals are worked out from the Khmer lunar calendar. Our <a href=\"../khmer-calendar.html\">Khmer Lunar Calendar</a> shows every holy day and festival for any month, calculated with the traditional rules. Pagodas occasionally announce a different day, so check with your local pagoda for ceremonies.",
  nextH="Next holy days", nextBtn="Open the Khmer Calendar →",
  faqH="Frequently Asked Questions",
  faq=[
    ("What does Thngai Sil mean in Cambodia?", "Thngai means day and sil means the Buddhist precepts, so Thngai Sil is a precept day: a lunar holy day for visiting the pagoda, making offerings and keeping the precepts."),
    ("How many Thngai Sil days are there in a lunar month?", "Four: the 8th waxing day, the full moon, the 8th waning day and the last waning day (new moon). A Gregorian month usually contains four, sometimes five."),
    ("Is every full-moon day a Buddhist holy day?", "Every full moon is a Thngai Sil day, and the best attended one each month. Only some full moons are major festivals, such as Meak, Visak and Asalha Bochea."),
    ("Do Thngai Sil dates change every year?", "Yes. They follow the lunar calendar, so the Gregorian dates move each year, and years with a leap month shift the summer and autumn dates by about three weeks."),
    ("What do Cambodian Buddhists do on a holy day?", "Many visit the pagoda, offer food to the monks, listen to a Dharma talk, meditate and keep the Five or Eight Precepts. Customs differ between families and pagodas."),
    ("What is the difference between Thngai Sil and Meak Bochea?", "Thngai Sil comes four times every lunar month. Meak Bochea is one particular full moon, in the month of Meak, that remembers the gathering of 1,250 monks before the Buddha; it is also a Sil day, but with special ceremonies."),
    ("How can I find Cambodian Buddhist holy days for this year?", "Open our Khmer Lunar Calendar: it marks every Thngai Sil day and festival for any month. For ceremonies, confirm with your local pagoda."),
    ("Can people observe Thngai Sil while living outside Cambodia?", "Yes. Khmer pagodas abroad follow the same lunar days, and anyone can keep the precepts, meditate or make offerings at home. The lunar date is the same; the Gregorian date can differ by a day across time zones."),
  ],
  endH="In short",
  end="Thngai Sil gives the Cambodian month a steady rhythm of generosity, reflection and community, and the great festivals mark the Buddhist year. Use the <a href=\"../khmer-calendar.html\">Khmer Lunar Calendar</a> to plan the next holy day, and share this guide with family and friends.",
  disc="For cultural interest. Practices differ between families, pagodas and regions; follow the guidance of your own pagoda.",
  srcH="Sources",
  src=[
    f'Uposatha days and the meaning of Magha, Visakha and Asalha Puja: <a href="{SRC_ATI}" rel="noopener" target="_blank">Access to Insight, “Uposatha Observance Days”</a>.',
    f'2026 public holidays (Sub-Decree No. 167): <a href="{SRC_GOV}" rel="noopener" target="_blank">Andersen Cambodia, “Cambodia Sets Official 2026 Public Holiday Schedule”</a>.',
    'All lunar dates: traditional Khmer calendar rules in the open-source <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a> library.',
  ],
  js=dict(full="Full-moon holy day", new="Holy day · new moon", eighth="Holy day · 8th day", waxing="waxing", waning="waning",
          meak="Meak Bochea", visak="Visak Bochea", asalha="Asalha Bochea", chol="Chol Vassa", kanben="Kan Ben begins", pchumben="Pchum Ben", chenh="Chenh Vassa"),
)

T["km"] = dict(
  eyebrow="វប្បធម៌ និងប្រតិទិនខ្មែរ",
  h1="ថ្ងៃសីល និងបុណ្យព្រះពុទ្ធសាសនាខ្មែរ",
  sub="មគ្គុទ្ទេសក៍ស្តីពីថ្ងៃសីល ថ្ងៃពេញបូណ៌មី និងពិធីបុណ្យព្រះពុទ្ធសាសនាពេញមួយឆ្នាំ",
  lead="ក្នុងខែចន្ទគតិនីមួយៗ មានថ្ងៃសីលបួនថ្ងៃ ដែលពុទ្ធបរិស័ទទៅវត្តទូទាំងប្រទេសកម្ពុជា។ ថ្ងៃពេញបូណ៌មីខ្លះក្នុងមួយឆ្នាំ ជាពិធីបុណ្យធំៗ។ អត្ថបទនេះពន្យល់ទាំងពីរ តាមខែនីមួយៗ និងបង្ហាញពីរបៀបរកកាលបរិច្ឆេទពិតប្រាកដ។",
  meta='ចុះផ្សាយ <time datetime="2026-10-18">ថ្ងៃទី18 ខែតុលា ឆ្នាំ2026</time> · MyBirthSign',
  heroAlt="ព្រះសង្ឃគង់ក្បែរផ្កាឈូកបូជា ខណៈពុទ្ធបរិស័ទស្លៀកសពណ៌សបួងសួងនៅមុខវិហារដែលភ្លឺពេលយប់",
  introH="ព្រះពុទ្ធសាសនាក្នុងជីវិតប្រចាំថ្ងៃរបស់ខ្មែរ",
  intro=[
    "ព្រះពុទ្ធសាសនាថេរវាទ ជាផ្នែកមួយនៃជីវិតខ្មែរ៖ វត្តជាកន្លែងគោរពបូជា ជាសាលាសហគមន៍ ហើយសម្រាប់គ្រួសារជាច្រើន ជាកន្លែងដែលកូនៗរៀនអក្សរដំបូង។ ចង្វាក់នៃឆ្នាំដើរតាមប្រតិទិនចន្ទគតិ ហើយចង្វាក់នៃខែក៏ដូច្នោះដែរ។",
    "ចង្វាក់ប្រចាំខែនោះគឺ <em>ថ្ងៃសីល</em>។ នៅថ្ងៃទាំងនេះ ពុទ្ធបរិស័ទជាច្រើនទៅវត្ត ប្រគេនចង្ហាន់ព្រះសង្ឃ ស្តាប់ធម៌ ចម្រើនសមាធិ និងសមាទានសីលប្រាំ ហើយខ្លះសមាទានសីលប្រាំបី។ មិនមែនគ្រួសារទាំងអស់រក្សាគ្រប់ថ្ងៃសីលទេ ហើយទំនៀមខុសគ្នាតាមវត្ត និងតំបន់ ប៉ុន្តែស្ទើរតែគ្រប់ខ្មែរដឹងថាថ្ងៃណាជាថ្ងៃសីល។",
  ],
  whatH="តើថ្ងៃសីលជាអ្វី?",
  what=[
    "ថ្ងៃសីលដើរតាមប្រតិទិនចន្ទគតិខ្មែរ មិនមែនប្រតិទិនសុរិយគតិទេ ដូច្នេះកាលបរិច្ឆេទប្រែប្រួលរៀងរាល់ឆ្នាំ។ ខែចន្ទគតិមួយមានពាក់កណ្តាលខែកើត និងពាក់កណ្តាលខែរោច។ ថ្ងៃសីលគឺ ថ្ងៃ 8 កើត ថ្ងៃពេញបូណ៌មី (15 កើត) ថ្ងៃ 8 រោច និងថ្ងៃរោចចុងខែ (14 ឬ 15 រោច ខែរលត់)។",
    f"ទំនៀមនេះមានប្រភពពី <em>ឧបោសថ</em> ដែលជាថ្ងៃប្រតិបត្តិធម៌នៃព្រះពុទ្ធសាសនាដើម។ នៅថ្ងៃពេញបូណ៌មី និងថ្ងៃខែរលត់ ព្រះសង្ឃប្រជុំគ្នាសូត្របាតិមោក្ខ ហើយគ្រហស្ថសមាទានសីល ដើម្បីជាជំនួយដល់ការប្រតិបត្តិ (<a href=\"{SRC_ATI}\" rel=\"noopener\">Access to Insight</a>)។ ការរក្សាថ្ងៃសីលប៉ុន្មានថ្ងៃ និងតឹងរ៉ឹងប៉ុណ្ណា ជាជម្រើសផ្ទាល់ខ្លួន និងតាមតំបន់។",
  ],
  stripH="ថ្ងៃសីលទាំងបួនក្នុងខែចន្ទគតិមួយ",
  strip=[("8", "ថ្ងៃ 8 កើត", "ព្រះចន្ទកន្លះវង់"), ("15", "ពេញបូណ៌មី", "ថ្ងៃ 15 កើត"), ("8", "ថ្ងៃ 8 រោច", "ព្រះចន្ទកន្លះវង់"), ("14/15", "ថ្ងៃរោចចុងខែ", "ខែរលត់")],
  kindsH="ថ្ងៃបួនប្រភេទ — មិនដូចគ្នាទេ",
  kinds=[
    ("sil", "ថ្ងៃសីលធម្មតា", "ថ្ងៃចន្ទគតិទាំងបួនខាងលើ រៀងរាល់ខែពេញមួយឆ្នាំ។"),
    ("moon", "ថ្ងៃពេញបូណ៌មី", "ថ្ងៃពេញបូណ៌មីនីមួយៗជាថ្ងៃសីល ហើយជាធម្មតាមានមនុស្សទៅវត្តច្រើនជាងគេ។ ភាគច្រើនជាថ្ងៃសីលធម្មតា។"),
    ("fest", "ពិធីបុណ្យព្រះពុទ្ធសាសនាធំៗ", "ថ្ងៃពេញបូណ៌មីពិសេសមួយចំនួន (មាឃ វិសាខ អាសាឡ្ហ) និងរដូវព្រះវស្សា និងភ្ជុំបិណ្ឌ។"),
    ("hol", "ថ្ងៃឈប់សម្រាកផ្លូវការ", "កំណត់ដោយរដ្ឋាភិបាលរៀងរាល់ឆ្នាំ។ ខ្លះជាបុណ្យសាសនា (វិសាខបូជា ភ្ជុំបិណ្ឌ) ខ្លះទៀតជាព្រះរាជពិធី ឬបុណ្យប្រពៃណី (ច្រត់ព្រះនង្គ័ល បុណ្យអុំទូក ចូលឆ្នាំខ្មែរ)។"),
  ],
  monthsH="តាមខែនីមួយៗ",
  monthsP="ខែចន្ទគតិមិនស៊ីគ្នានឹងខែសុរិយគតិទេ ដូច្នេះពិធីបុណ្យដដែលអាចធ្លាក់ក្នុងខែផ្សេងគ្នាក្នុងឆ្នាំផ្សេងគ្នា។ កាតនីមួយៗបង្ហាញថាពេញបូណ៌មីខែណាអាចធ្លាក់ក្នុងខែនោះ ថ្ងៃសីល និងពិធីបុណ្យដែលអាចធ្លាក់ក្នុងខែនោះ ព្រមទាំងកាលបរិច្ឆេទឆ្នាំនេះ និងឆ្នាំក្រោយ។",
  fullOf="ពេញបូណ៌មីខែ", orWord="ឬ", silLine="ថ្ងៃសីល៖ ប្រហែល 4 ថ្ងៃ (ជួនកាល 5)",
  noFest="គ្មានពិធីបុណ្យធំទេ — មានតែថ្ងៃសីលធម្មតា។",
  notThis="មិនធ្លាក់ក្នុងខែនេះ ក្នុងឆ្នាំ 2026 ឬ 2027",
  tagLunar="តាមចន្ទគតិ · ប្រែប្រួល", tagSolar="តាមសុរិយគតិ", tagRange="អាចធ្លាក់",
  y26="2026", y27="2027",
  festH="ពិធីបុណ្យព្រះពុទ្ធសាសនាធំៗរបស់ខ្មែរ",
  festP="ទាំងនេះជាថ្ងៃពិសេសនៃឆ្នាំព្រះពុទ្ធសាសនា។ ទាំងអស់ដើរតាមប្រតិទិនចន្ទគតិ ដូច្នេះកាលបរិច្ឆេទសុរិយគតិប្រែប្រួលរៀងរាល់ឆ្នាំ។ ចន្លោះកាលបរិច្ឆេទបង្ហាញថ្ងៃដំបូង និងចុងក្រោយបំផុត ចន្លោះឆ្នាំ 2000 ដល់ 2040។",
  lbl=dict(when="ពេលណា", do="អ្វីដែលមនុស្សធ្វើ", holiday="ថ្ងៃឈប់សម្រាកឆ្នាំ 2026", varies="កាលបរិច្ឆេទប្រែប្រួលរៀងរាល់ឆ្នាំ", range="ចន្លោះឆ្នាំ 2000–2040"),
  fest=[
    ("meak", "មាឃបូជា", "🪷",
     "រំលឹកដល់ថ្ងៃដែលព្រះអរហន្ត 1,250 អង្គ មកប្រជុំគ្នាចំពោះព្រះពុទ្ធដោយមិនបាននិមន្ត ហើយព្រះអង្គទ្រង់សម្តែងឱវាទបាតិមោក្ខ ដែលជាសេចក្តីសង្ខេបនៃព្រះធម៌៖ មិនធ្វើបាប ធ្វើតែកុសល ធ្វើចិត្តឱ្យបរិសុទ្ធ។",
     "ថ្ងៃពេញបូណ៌មី ខែមាឃ ដែលជាខែចន្ទគតិទី 3។",
     "ពេលព្រឹកប្រគេនចង្ហាន់ព្រះសង្ឃ ស្តាប់ធម៌ ហើយពេលល្ងាចដើរប្រទក្សិណជុំវិញព្រះវិហារបីជុំ កាន់ទៀន ធូប និងផ្កា។",
     "ទេ (មិនមាននៅក្នុងបញ្ជីឆ្នាំ 2026)។"),
    ("visak", "វិសាខបូជា", "🪷",
     "ថ្ងៃសំខាន់បំផុតនៃឆ្នាំព្រះពុទ្ធសាសនា៖ រំលឹកដល់ការប្រសូត ការត្រាស់ដឹង និងការបរិនិព្វានរបស់ព្រះពុទ្ធ ដែលប្រពៃណីចាត់ទុកថាធ្លាក់ចំថ្ងៃពេញបូណ៌មីដូចគ្នា។",
     "ថ្ងៃពេញបូណ៌មី ខែពិសាខ ដែលជាខែចន្ទគតិទី 6។",
     "ធ្វើបុណ្យនៅវត្ត សមាទានសីល ស្តាប់ធម៌ និងដើរប្រទក្សិណជុំវិញព្រះវិហារពេលល្ងាច។",
     "បាទ/ចាស (1 ឧសភា 2026 ត្រូវនឹងទិវាពលកម្ម)។"),
    ("asalha", "អាសាឡ្ហបូជា", "🪷",
     "រំលឹកដល់ធម្មទេសនាដំបូងរបស់ព្រះពុទ្ធ ចំពោះបញ្ចវគ្គិយ៍ទាំងប្រាំ។ ព្រះកោណ្ឌញ្ញៈបានយល់ធម៌ ហើយក្លាយជាភិក្ខុដំបូង ធ្វើឱ្យព្រះរតនត្រ័យគឺ ព្រះពុទ្ធ ព្រះធម៌ និងព្រះសង្ឃ បានគ្រប់គ្រាន់។",
     "ថ្ងៃពេញបូណ៌មី ខែអាសាឍ ដែលជាខែចន្ទគតិទី 8 (ទុតិយាសាឍ ក្នុងឆ្នាំមានអធិកមាស)។",
     "ប្រគេនចង្ហាន់ និងស្តាប់ធម៌នៅវត្ត។ វាក៏ជាថ្ងៃមុនចូលព្រះវស្សាដែរ។",
     "ទេ។"),
    ("chol", "ចូលព្រះវស្សា", "🕯️",
     "ព្រះសង្ឃចាប់ផ្តើមគង់ចាំព្រះវស្សារយៈពេលបីខែ ហើយគង់នៅវត្តតែមួយពេញរដូវ។",
     "ថ្ងៃ 1 រោច ខែអាសាឍ គឺថ្ងៃបន្ទាប់ពីអាសាឡ្ហបូជា។",
     "យុវជនបួសមុនចូលព្រះវស្សា គ្រួសារប្រគេនទៀនព្រះវស្សាធំៗ និងសំពត់ងូតទឹកភ្លៀង។ <a href=\"chol-vassa-buddhist-lent.html\">អានអត្ថបទចូលព្រះវស្សារបស់យើង</a>។",
     "ទេ។"),
    ("pchumben", "ភ្ជុំបិណ្ឌ", "🏯",
     "ពិធីបុណ្យឧទ្ទិសដល់អ្នកដែលបានចែកឋានរបស់ខ្មែរ៖ 15 ថ្ងៃនៅចុងខែភទ្របទ ដែលកុសលត្រូវបានឧទ្ទិសដល់ឪពុកម្តាយ ជីដូនជីតា និងញាតិទាំងប្រាំពីរសន្តាន។ ប្រពៃណីជឿថា វិញ្ញាណក្ខន្ធអ្នកស្លាប់ ខ្លះកំពុងរងទុក្ខ ត្រឡប់មករកអាហារ និងកុសលពីញាតិមិត្ត។",
     "ថ្ងៃ 1 ដល់ 14 រោច ខែភទ្របទ ជាកាន់បិណ្ឌ ដែលគ្រួសារវេនគ្នាយកម្ហូបទៅវត្ត។ ថ្ងៃ 15 រោច (ថ្ងៃរោចចុងខែ) ជាថ្ងៃភ្ជុំបិណ្ឌ។",
     "ប្រគេនចង្ហាន់ព្រះសង្ឃឧទ្ទិសដល់អ្នកស្លាប់ ហើយមុនភ្លឺបោះបាយបិណ្ឌជុំវិញព្រះវិហារ។ មនុស្សធ្វើដំណើរទៅស្រុកកំណើត ធ្វើឱ្យទីក្រុងស្ងាត់។",
     "បាទ/ចាស (10–12 តុលា 2026)។"),
    ("chenh", "ចេញព្រះវស្សា និងរដូវកឋិន", "🕯️",
     "ការគង់ចាំព្រះវស្សាបញ្ចប់។ ក្នុងមួយខែបន្ទាប់ សហគមន៍ប្រគេនស្បង់ចីវរថ្មី និងទេយ្យវត្ថុដល់ព្រះសង្ឃក្នុងពិធីកឋិនទាន។",
     "ចេញព្រះវស្សា គឺថ្ងៃពេញបូណ៌មីខែអស្សុជ។ រដូវកឋិនរហូតដល់ពេញបូណ៌មីខែកត្ដិក។",
     "ហែកឋិនជាមួយភ្លេង ស្បង់ចីវរ និងទេយ្យវត្ថុ។ វត្តនីមួយៗអាចទទួលកឋិនបានតែម្តងក្នុងមួយរដូវ ដូច្នេះក្រុមនានាច្រើនតែទៅវត្តនៅភូមិកំណើត។",
     "ទេ។"),
  ],
  relH="ថ្ងៃដែលពាក់ព័ន្ធ ប៉ុន្តែមិនមែនជាថ្ងៃបុណ្យព្រះពុទ្ធសាសនា",
  rel=[
    ("ចូលឆ្នាំខ្មែរ", "តាមសុរិយគតិ៖ ថ្ងៃ 13 ឬ 14 មេសា រយៈពេលបី ឬបួនថ្ងៃ។", "ឆ្នាំថ្មីប្រពៃណីជាតិ ដែលមានទំនៀមព្រះពុទ្ធសាសនា៖ ទៅវត្ត ពូនភ្នំខ្សាច់ ស្រង់ព្រះ និងស្រង់ទឹកចាស់ទុំ។ ថ្ងៃឈប់សម្រាក (14–16 មេសា 2026)។"),
    ("ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល", "ថ្ងៃ 4 រោច ខែពិសាខ បួនថ្ងៃក្រោយវិសាខបូជា។", "ព្រះរាជពិធីកសិកម្ម ដែលទស្សន៍ទាយផលដំណាំ។ ថ្ងៃឈប់សម្រាក (5 ឧសភា 2026)។"),
    ("បុណ្យអុំទូក", "ថ្ងៃពេញបូណ៌មីខែកត្ដិក និងថ្ងៃជុំវិញ។", "ព្រះរាជពិធី និងបុណ្យប្រពៃណី ដែលមានប្រណាំងទូក បណ្តែតប្រទីប និងសំពះព្រះខែ។ វាធ្លាក់ចំថ្ងៃចុងក្រោយនៃរដូវកឋិន។ ថ្ងៃឈប់សម្រាក (23–25 វិច្ឆិកា 2026)។"),
  ],
  doH="អ្វីដែលមនុស្សធ្វើនៅថ្ងៃសីល",
  doAlt="ព្រះសង្ឃកាន់បាត្រ មើលពុទ្ធបរិស័ទលុតជង្គង់កាន់ទៀន និងផ្កា នៅមុខវិហារមាសក្រោមពន្លឺព្រះចន្ទពេញវង់",
  do=[
    ("ទៅវត្ត", "ច្រើនតែពេលព្រឹកព្រលឹម ហើយមនុស្សជាច្រើនស្លៀកពាក់ពណ៌ស។"),
    ("ប្រគេនចង្ហាន់ព្រះសង្ឃ", "បាយ ម្ហូប និងផ្លែឈើ ប្រគេនមុនថ្ងៃត្រង់។"),
    ("ស្តាប់ធម៌", "និងសូត្រធម៌តាមព្រះសង្ឃ។"),
    ("ចម្រើនសមាធិ", "ម្នាក់ឯង ឬជាមួយសហគមន៍ នៅវត្ត ឬនៅផ្ទះ។"),
    ("សមាទានសីល", "សីលប្រាំ៖ មិនសម្លាប់សត្វ មិនលួច មិនប្រព្រឹត្តខុសក្នុងកាម មិនកុហក មិនផឹកគ្រឿងស្រវឹង។ ខ្លះសមាទានសីលប្រាំបី ដោយបន្ថែម មិនបរិភោគក្រោយថ្ងៃត្រង់ មិនមើលល្បែង ឬតុបតែងខ្លួន និងមិនដេកលើគ្រែខ្ពស់ប្រណីត។"),
    ("ធ្វើទាន និងជួយអ្នកដទៃ", "បរិច្ចាគដល់វត្ត និងជួយអ្នកខ្វះខាត។"),
    ("ពិចារណាខ្លួន", "ជាថ្ងៃស្ងប់ស្ងាត់ មនុស្សជាច្រើនជៀសវាងពិធីជប់លៀង និងគ្រឿងស្រវឹង។"),
  ],
  doNote="ទំនៀមខុសគ្នា៖ គ្រួសារខ្លះរក្សាគ្រប់ថ្ងៃសីល ខ្លះទៀតតែថ្ងៃពេញបូណ៌មី ឬពិធីបុណ្យធំៗ ហើយការប្រតិបត្តិខុសគ្នាតាមវត្ត និងតំបន់។",
  findH="របៀបរកកាលបរិច្ឆេទសម្រាប់ឆ្នាំនេះ",
  findP="ថ្ងៃសីល និងពិធីបុណ្យទាំងនេះ គណនាតាមប្រតិទិនចន្ទគតិខ្មែរ។ <a href=\"../khmer-calendar.html\">ប្រតិទិនចន្ទគតិខ្មែរ</a>របស់យើងបង្ហាញគ្រប់ថ្ងៃសីល និងពិធីបុណ្យសម្រាប់ខែណាមួយ ដែលគណនាតាមវិធានប្រពៃណី។ ជួនកាលវត្តប្រកាសថ្ងៃខុសពីនេះ ដូច្នេះសូមសួរវត្តក្នុងតំបន់របស់អ្នកសម្រាប់ពិធីផ្សេងៗ។",
  nextH="ថ្ងៃសីលខាងមុខ", nextBtn="បើកប្រតិទិនខ្មែរ →",
  faqH="សំណួរដែលសួរញឹកញាប់",
  faq=[
    ("តើថ្ងៃសីលមានន័យដូចម្តេចនៅកម្ពុជា?", "ថ្ងៃសីល គឺជាថ្ងៃសមាទានសីល៖ ថ្ងៃបុណ្យតាមចន្ទគតិ សម្រាប់ទៅវត្ត ធ្វើបុណ្យ និងរក្សាសីល។"),
    ("តើក្នុងមួយខែចន្ទគតិមានថ្ងៃសីលប៉ុន្មានថ្ងៃ?", "បួនថ្ងៃ៖ ថ្ងៃ 8 កើត ថ្ងៃពេញបូណ៌មី ថ្ងៃ 8 រោច និងថ្ងៃរោចចុងខែ (ខែរលត់)។ ក្នុងមួយខែសុរិយគតិ ជាធម្មតាមានបួនថ្ងៃ ជួនកាលប្រាំ។"),
    ("តើថ្ងៃពេញបូណ៌មីទាំងអស់ជាថ្ងៃបុណ្យព្រះពុទ្ធសាសនាឬទេ?", "ថ្ងៃពេញបូណ៌មីនីមួយៗជាថ្ងៃសីល ហើយជាថ្ងៃដែលមានមនុស្សទៅវត្តច្រើនជាងគេក្នុងខែ។ មានតែពេញបូណ៌មីខ្លះប៉ុណ្ណោះដែលជាពិធីបុណ្យធំ ដូចជា មាឃបូជា វិសាខបូជា និងអាសាឡ្ហបូជា។"),
    ("តើថ្ងៃសីលប្រែប្រួលរៀងរាល់ឆ្នាំឬទេ?", "បាទ/ចាស។ វាដើរតាមប្រតិទិនចន្ទគតិ ដូច្នេះកាលបរិច្ឆេទសុរិយគតិប្រែប្រួលរៀងរាល់ឆ្នាំ ហើយឆ្នាំដែលមានអធិកមាស ធ្វើឱ្យថ្ងៃនៅរដូវក្តៅ និងរដូវស្លឹកឈើជ្រុះ រំកិលប្រហែលបីសប្តាហ៍។"),
    ("តើពុទ្ធបរិស័ទខ្មែរធ្វើអ្វីខ្លះនៅថ្ងៃសីល?", "ជាច្រើនទៅវត្ត ប្រគេនចង្ហាន់ព្រះសង្ឃ ស្តាប់ធម៌ ចម្រើនសមាធិ និងសមាទានសីលប្រាំ ឬប្រាំបី។ ទំនៀមខុសគ្នាតាមគ្រួសារ និងវត្ត។"),
    ("តើថ្ងៃសីល និងមាឃបូជាខុសគ្នាដូចម្តេច?", "ថ្ងៃសីលមកដល់បួនដងរៀងរាល់ខែចន្ទគតិ។ មាឃបូជាជាថ្ងៃពេញបូណ៌មីពិសេសមួយក្នុងខែមាឃ ដែលរំលឹកដល់ការប្រជុំនៃព្រះអរហន្ត 1,250 អង្គ ចំពោះព្រះពុទ្ធ។ វាក៏ជាថ្ងៃសីលដែរ ប៉ុន្តែមានពិធីពិសេស។"),
    ("តើខ្ញុំអាចរកថ្ងៃបុណ្យព្រះពុទ្ធសាសនាខ្មែរសម្រាប់ឆ្នាំនេះដោយរបៀបណា?", "បើកប្រតិទិនចន្ទគតិខ្មែររបស់យើង៖ វាសម្គាល់គ្រប់ថ្ងៃសីល និងពិធីបុណ្យសម្រាប់ខែណាមួយ។ សម្រាប់ពិធីផ្សេងៗ សូមបញ្ជាក់ជាមួយវត្តក្នុងតំបន់។"),
    ("តើអ្នករស់នៅក្រៅប្រទេសកម្ពុជាអាចរក្សាថ្ងៃសីលបានទេ?", "បាន។ វត្តខ្មែរនៅបរទេសដើរតាមថ្ងៃចន្ទគតិដដែល ហើយអ្នកណាក៏អាចរក្សាសីល ចម្រើនសមាធិ ឬធ្វើបុណ្យនៅផ្ទះបានដែរ។ ថ្ងៃចន្ទគតិដូចគ្នា ប៉ុន្តែកាលបរិច្ឆេទសុរិយគតិអាចខុសគ្នាមួយថ្ងៃ តាមម៉ោងតំបន់។"),
  ],
  endH="សរុបមក",
  end="ថ្ងៃសីលផ្តល់ឱ្យខែនីមួយៗរបស់ខ្មែរ នូវចង្វាក់ស្ថិរភាពនៃការធ្វើទាន ការពិចារណា និងសហគមន៍ ហើយពិធីបុណ្យធំៗសម្គាល់ឆ្នាំព្រះពុទ្ធសាសនា។ សូមប្រើ<a href=\"../khmer-calendar.html\">ប្រតិទិនចន្ទគតិខ្មែរ</a> ដើម្បីរៀបចំថ្ងៃសីលបន្ទាប់ ហើយចែករំលែកអត្ថបទនេះជាមួយគ្រួសារ និងមិត្តភក្តិ។",
  disc="សម្រាប់ចំណេះដឹងវប្បធម៌។ ការប្រតិបត្តិខុសគ្នាតាមគ្រួសារ វត្ត និងតំបន់។ សូមធ្វើតាមការណែនាំរបស់វត្តរបស់អ្នក។",
  srcH="ប្រភព",
  src=[
    f'ថ្ងៃឧបោសថ និងអត្ថន័យនៃមាឃបូជា វិសាខបូជា និងអាសាឡ្ហបូជា៖ <a href="{SRC_ATI}" rel="noopener" target="_blank">Access to Insight, “Uposatha Observance Days”</a>។',
    f'ថ្ងៃឈប់សម្រាកឆ្នាំ 2026 (អនុក្រឹត្យលេខ 167)៖ <a href="{SRC_GOV}" rel="noopener" target="_blank">Andersen Cambodia</a>។',
    'កាលបរិច្ឆេទចន្ទគតិទាំងអស់៖ វិធានប្រតិទិនខ្មែរបែបប្រពៃណី ក្នុងបណ្ណាល័យកូដចំហ <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a>។',
  ],
  js=dict(full="ថ្ងៃសីល · ពេញបូណ៌មី", new="ថ្ងៃសីល · ខែរលត់", eighth="ថ្ងៃសីល · ថ្ងៃ 8", waxing="កើត", waning="រោច",
          meak="មាឃបូជា", visak="វិសាខបូជា", asalha="អាសាឡ្ហបូជា", chol="ចូលព្រះវស្សា", kanben="ចាប់ផ្តើមកាន់បិណ្ឌ", pchumben="ភ្ជុំបិណ្ឌ", chenh="ចេញព្រះវស្សា"),
)

T["zh"] = dict(
  eyebrow="高棉文化与历法",
  h1="柬埔寨佛教斋日与节日",
  sub="斋日（Thngai Sil）、满月纪念日与全年佛教节日指南",
  lead="每个农历月有四天是斋日（Thngai Sil），柬埔寨各地的寺院都会举行功德活动；一年中有几个满月是重大节日。本文按月介绍两者，并告诉你如何查到确切日期。",
  meta='发布于 <time datetime="2026-10-18">2026年10月18日</time> · MyBirthSign',
  heroAlt="一位僧人坐在莲花供品旁，身穿白衣的信众在夜晚灯火通明的寺院前祈祷",
  introH="佛教与柬埔寨人的日常生活",
  intro=[
    "上座部佛教贯穿柬埔寨人的生活：寺院（wat）既是礼佛之地，也是社区中心，对许多家庭来说还是孩子最早识字的地方。一年的节奏跟随农历，一个月的节奏也是如此。",
    "这个每月的节奏就是<em>斋日</em>（Thngai Sil，意为“持戒日”）。这些日子里，许多信众到寺院供僧、听法、禅修并受持五戒，有些人受持八戒。并非每个家庭都遵守每一个斋日，各寺院和地区的习俗也不同，但几乎每个柬埔寨人都知道哪天是斋日。",
  ],
  whatH="什么是斋日（Thngai Sil）？",
  what=[
    "斋日按高棉农历而不是公历计算，所以日期每年都在变。一个农历月分为上弦（koeut）和下弦（roach）两半。斋日是上弦第8天、满月（上弦第15天）、下弦第8天，以及下弦最后一天（第14或15天，即新月）。",
    f"这一习俗源于早期佛教的<em>布萨</em>（uposatha）。在满月和新月日，僧人集会诵戒，居士受持戒律以助修行（<a href=\"{SRC_ATI}\" rel=\"noopener\">Access to Insight</a>）。每个家庭遵守四天中的几天、遵守得多严格，取决于个人和当地习惯。",
  ],
  stripH="一个农历月的四个斋日",
  strip=[("8", "上弦第8天", "上弦月"), ("15", "满月", "上弦第15天"), ("8", "下弦第8天", "下弦月"), ("14/15", "下弦最后一天", "新月")],
  kindsH="四类日子——并不相同",
  kinds=[
    ("sil", "普通斋日", "上述四个农历日，全年每个月都有。"),
    ("moon", "满月纪念日", "每个满月都是斋日，通常也是一个月里去寺院的人最多的一天。大多数只是普通斋日。"),
    ("fest", "重大佛教节日", "几个特别的满月（万佛节、卫塞节、三宝佛节），以及雨安居和亡人节期间。"),
    ("hol", "公共假期", "由政府每年公布。有些是佛教节日（卫塞节、亡人节），有些是王室或传统节日（御耕节、送水节、高棉新年）。"),
  ],
  monthsH="逐月指南",
  monthsP="农历月与公历月并不对应，所以同一个节日在不同年份可能落在不同的月份。每张卡片列出该月可能出现的农历满月、斋日，以及可能落在该月的节日，并附上今年和明年的日期。",
  fullOf="满月：", orWord="或", silLine="斋日：约4天（有时5天）",
  noFest="没有重大佛教节日——只有普通斋日。",
  notThis="2026和2027年不在本月",
  tagLunar="农历 · 每年不同", tagSolar="阳历", tagRange="可能日期",
  y26="2026", y27="2027",
  festH="柬埔寨重大佛教节日",
  festP="这些是佛教年中的特别日子。它们都按农历计算，所以公历日期每年不同；日期范围显示2000至2040年间最早和最晚的日期。",
  lbl=dict(when="时间", do="人们做什么", holiday="2026年公共假期", varies="日期每年不同", range="2000–2040年范围"),
  fest=[
    ("meak", "万佛节（Meak Bochea）", "🪷",
     "纪念1,250位阿罗汉未经召集同时来到佛陀面前的那一天；佛陀为他们宣说了《教诫波罗提木叉》，概括佛法要义：诸恶莫作，众善奉行，自净其意。",
     "Meak 月（农历第3个月）的满月。",
     "上午供僧、听法，傍晚手持蜡烛、香和鲜花绕佛殿三圈。",
     "否（不在2026年名单中）。"),
    ("visak", "卫塞节（Visak Bochea）", "🪷",
     "佛教一年中最重要的日子：纪念佛陀的诞生、成道和涅槃，传统认为三者都在同一个满月日。",
     "Pisak 月（农历第6个月）的满月。",
     "到寺院做功德、受持戒律、听法，傍晚绕佛殿行烛光游行。",
     "是（2026年5月1日，与劳动节同一天）。"),
    ("asalha", "三宝佛节（Asalha Bochea）", "🪷",
     "纪念佛陀对五比丘的初转法轮。其中憍陈如听后证悟，成为第一位比丘，佛、法、僧三宝自此具足。",
     "Asadh 月（农历第8个月）的满月（闰月年为第二个 Asadh 月）。",
     "到寺院供僧、听法；这一天也是雨安居的前一天。",
     "否。"),
    ("chol", "入雨安居（Chol Vassa）", "🕯️",
     "僧人开始为期三个月的雨季安居，整季留在同一座寺院。",
     "Asadh 月下弦第1天，即三宝佛节的第二天。",
     "年轻男子在安居前出家；家庭供养大蜡烛和雨浴衣。<a href=\"chol-vassa-buddhist-lent.html\">阅读我们的入雨安居指南</a>。",
     "否。"),
    ("pchumben", "亡人节（Pchum Ben）", "🏯",
     "柬埔寨的祭祖节：Phatrabot 月末的15天里，把功德回向给父母、祖父母和所有祖先。传统相信，亡者的灵魂（其中一些正在受苦）会回来向亲人寻求食物和功德。",
     "Phatrabot 月下弦第1至14天是 Kan Ben，各家轮流送饭到寺院；第15天（下弦最后一天）是亡人节正日。",
     "以亡者名义供僧，黎明前绕佛殿抛撒饭团（bay ben）。人们纷纷回乡，城市变得冷清。",
     "是（2026年10月10日至12日）。"),
    ("chenh", "出雨安居与功德衣时节", "🕯️",
     "雨安居结束；随后一个月里，信众在功德衣节（Kathin）向僧人供养新袈裟和礼物。",
     "出雨安居是 Assoch 月的满月；功德衣时节持续到 Kadeuk 月满月。",
     "伴着音乐列队供养袈裟和礼物。每座寺院每季只能接受一次功德衣供养，所以人们常回到家乡的寺院。",
     "否。"),
  ],
  relH="相关但不属于佛教圣日的日子",
  rel=[
    ("高棉新年", "阳历：4月13日或14日，持续三或四天。", "带有佛教习俗的全国传统新年：去寺院、堆沙塔、为佛像和长辈浴水。公共假期（2026年4月14日至16日）。"),
    ("御耕节", "Pisak 月下弦第4天，卫塞节后四天。", "预测收成的王室农耕仪式。公共假期（2026年5月5日）。"),
    ("送水节", "Kadeuk 月满月及前后几天。", "王室与传统节日，有龙舟赛、灯船和拜月；正好是功德衣时节的最后一天。公共假期（2026年11月23日至25日）。"),
  ],
  doH="人们在斋日做什么",
  doAlt="一位托钵僧人望着跪拜的信众手持蜡烛和鲜花，背景是满月下的金色寺院",
  do=[
    ("去寺院", "通常一大早，很多人穿白衣。"),
    ("供僧", "米饭、菜肴和水果，在中午前供养。"),
    ("听法", "并跟随僧人诵经。"),
    ("禅修", "独自或与大家一起，在寺院或家中。"),
    ("受持戒律", "五戒：不杀生、不偷盗、不邪淫、不妄语、不饮酒。有些人受持八戒，另加过午不食、不娱乐不装饰、不坐卧高广大床。"),
    ("布施与助人", "向寺院捐献，帮助有需要的人。"),
    ("反省", "这是安静的一天，许多人不参加聚会、不喝酒。"),
  ],
  doNote="习俗各不相同：有的家庭遵守每个斋日，有的只在满月或大节日去寺院，各寺院和地区的做法也不同。",
  findH="如何查到今年的日期",
  findP="斋日和这些节日都按高棉农历计算。我们的<a href=\"../khmer-calendar.html\">高棉农历</a>按传统规则显示任意月份的每个斋日和节日。寺院偶尔会公布不同的日子，举行仪式前请向当地寺院确认。",
  nextH="接下来的斋日", nextBtn="打开高棉日历 →",
  faqH="常见问题",
  faq=[
    ("Thngai Sil 在柬埔寨是什么意思？", "Thngai 意为“日”，sil 意为佛教戒律，所以 Thngai Sil 就是持戒日：按农历去寺院、做功德、受持戒律的斋日。"),
    ("一个农历月有几个斋日？", "四个：上弦第8天、满月、下弦第8天和下弦最后一天（新月）。一个公历月通常有四个，有时五个。"),
    ("每个满月都是佛教圣日吗？", "每个满月都是斋日，也是每月去寺院的人最多的一天。只有部分满月是重大节日，例如万佛节、卫塞节和三宝佛节。"),
    ("斋日日期每年都会变吗？", "会。它们按农历计算，所以公历日期每年不同；有闰月的年份会让夏秋的日期推迟约三周。"),
    ("柬埔寨佛教徒在斋日做什么？", "许多人去寺院供僧、听法、禅修，并受持五戒或八戒。各家庭和寺院的习俗不同。"),
    ("斋日和万佛节有什么区别？", "斋日每个农历月有四次。万佛节是 Meak 月一个特别的满月，纪念1,250位比丘聚集在佛陀面前；它也是斋日，但有特别的仪式。"),
    ("怎样查到今年的柬埔寨佛教斋日？", "打开我们的高棉农历：它标出任意月份的每个斋日和节日。举行仪式前请向当地寺院确认。"),
    ("住在柬埔寨以外的人也能守斋日吗？", "可以。海外的高棉寺院遵循同样的农历日子，任何人都可以在家持戒、禅修或做功德。农历日期相同，但因时区不同，公历日期可能相差一天。"),
  ],
  endH="总结",
  end="斋日为柬埔寨人的每个月带来布施、反省和团聚的稳定节奏，而重大节日标记着佛教的一年。使用<a href=\"../khmer-calendar.html\">高棉农历</a>安排下一个斋日，并与家人朋友分享这篇指南。",
  disc="仅供文化参考。各家庭、寺院和地区的做法不同，请遵循你所在寺院的指导。",
  srcH="来源",
  src=[
    f'布萨日以及万佛节、卫塞节、三宝佛节的意义：<a href="{SRC_ATI}" rel="noopener" target="_blank">Access to Insight, “Uposatha Observance Days”</a>。',
    f'2026年公共假期（第167号次级法令）：<a href="{SRC_GOV}" rel="noopener" target="_blank">Andersen Cambodia</a>。',
    '所有农历日期：开源程序库 <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a> 中的传统高棉历法规则。',
  ],
  js=dict(full="斋日 · 满月", new="斋日 · 新月", eighth="斋日 · 第8天", waxing="上弦", waning="下弦",
          meak="万佛节", visak="卫塞节", asalha="三宝佛节", chol="入雨安居", kanben="亡人节供斋期开始", pchumben="亡人节", chenh="出雨安居"),
)

FEST_NAMES = {"meak": {"en": "Meak Bochea", "km": "មាឃបូជា", "zh": "万佛节"}, "visak": {"en": "Visak Bochea", "km": "វិសាខបូជា", "zh": "卫塞节"},
              "asalha": {"en": "Asalha Bochea", "km": "អាសាឡ្ហបូជា", "zh": "三宝佛节"}, "chol": {"en": "Chol Vassa", "km": "ចូលព្រះវស្សា", "zh": "入雨安居"},
              "kanben": {"en": "Kan Ben begins", "km": "ចាប់ផ្តើមកាន់បិណ្ឌ", "zh": "亡人节供斋期开始"}, "pchumben": {"en": "Pchum Ben", "km": "ភ្ជុំបិណ្ឌ", "zh": "亡人节"},
              "chenh": {"en": "Chenh Vassa", "km": "ចេញព្រះវស្សា", "zh": "出雨安居"}, "kathinEnd": {"en": "Kathin season ends", "km": "ផុតរដូវកឋិន", "zh": "功德衣时节结束"},
              "ploughing": {"en": "Royal Ploughing", "km": "ច្រត់ព្រះនង្គ័ល", "zh": "御耕节"}}
MONTH_EXTRA = {3: {"en": "Khmer New Year (13–14 April, solar)", "km": "ចូលឆ្នាំខ្មែរ (13–14 មេសា តាមសុរិយគតិ)", "zh": "高棉新年（4月13–14日，阳历）"},
               10: {"en": "Water Festival (Kadeuk full moon; cultural)", "km": "បុណ្យអុំទូក (ពេញបូណ៌មីខែកត្ដិក · បុណ្យប្រពៃណី)", "zh": "送水节（Kadeuk 月满月；传统节日）"}}
MONTH_FEST = {0: ["meak"], 1: ["meak"], 3: ["visak"], 4: ["visak"], 6: ["asalha", "chol"], 7: ["asalha", "chol"],
              8: ["kanben", "pchumben"], 9: ["pchumben", "chenh"], 10: ["kathinEnd"]}


def month_cards(lang):
    t = T[lang]; out = []
    for gm in range(12):
        lun = sorted({7 if i in (12, 13) else i for i in D["monthsLunar"][str(gm)]}, key=LUN_ORDER.index)   # 1st / 2nd Asadh shown as Asadh
        if 11 in lun and 0 in lun: lun = [11, 0]   # November: Kadeuk comes before Migasir
        names = [LUN_KM[i] if lang == "km" else LUN_EN[i] for i in lun]
        full = f' {t["orWord"]} '.join(names)
        head = {"en": ENM[gm], "km": KMM[gm], "zh": ZHM[gm]}[lang]
        sub = {"en": "", "km": "", "zh": ENM[gm]}[lang]
        items = []
        for k in MONTH_FEST.get(gm, []):
            r = D["ranges"][k]
            d26 = [s for s in D["y2026"][k]]; d27 = [s for s in D["y2027"][k]]
            dates = []
            for s in d26 + d27:
                if int(s[5:7]) - 1 == gm: dates.append(DF[lang](s))
            when = (" · ".join(dates)) if dates else t["notThis"]
            items.append(f'<li class="hd-mf"><b>{html.escape(FEST_NAMES[k][lang])}</b><span class="hd-tag">{t["tagLunar"]}</span><small>{t["tagRange"]} {rng(lang, k)}</small><small class="hd-dates">{when}</small></li>')
        if gm in MONTH_EXTRA:
            items.append(f'<li class="hd-mf hd-mf-cult"><b>{MONTH_EXTRA[gm][lang]}</b></li>')
        body = "<ul>" + "".join(items) + "</ul>" if items else f'<p class="hd-none">{t["noFest"]}</p>'
        out.append(f'''<li class="hd-month"><h3>{head}{f' <small>{sub}</small>' if sub else ''}</h3>
      <p class="hd-ml"><span aria-hidden="true">🌕</span> {t["fullOf"]} {full}</p>
      <p class="hd-ml"><span aria-hidden="true">🪷</span> {t["silLine"]}</p>{body}</li>''')
    return "\n".join(out)


def body(lang):
    t = T[lang]; f = DF[lang]; o = []
    o.append(f'<div data-lang-content="{lang}">')
    o.append('<article class="post container fe hc kny hd">')
    o.append(f'''  <header class="fe-hero hd-hero">
    <img class="fe-hero-bg" src="../images/holy-days/hero-pagoda.webp" width="1536" height="546" alt="{html.escape(t["heroAlt"])}" fetchpriority="high">
    <div class="fe-hero-in">
      <p class="fe-eyebrow">{t["eyebrow"]}</p>
      <h1>{t["h1"]}</h1>
      <p class="fe-sub"><span aria-hidden="true">✦</span> {t["sub"]} <span aria-hidden="true">✦</span></p>
      <p class="fe-lead">{t["lead"]}</p>
      <p class="fe-meta">{t["meta"]}</p>
    </div>
  </header>''')
    card = {"cardType": "guide", "lang": lang, "eyebrow": html.unescape(t["eyebrow"]), "title": t["h1"], "sub": t["sub"],
            "points": [FEST_NAMES["visak"][lang] + ": " + f(y26("visak")), FEST_NAMES["pchumben"][lang] + ": " + f(y26("pchumben"))]}
    o.append(f'  <div class="share-row" data-share data-share-card="{html.escape(json.dumps(card, ensure_ascii=False), quote=True)}" data-share-url="/blog/{SLUG}.html"></div>')
    o.append(f'  <h2 class="fe-h2">{t["introH"]}</h2>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["intro"]) + "</div>")
    o.append(f'  <h2 class="fe-h2">{t["whatH"]}</h2>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["what"]) + "</div>")
    o.append(f'  <section class="zc-box hd-strip" aria-label="{html.escape(t["stripH"])}"><h3 class="zc-bh">{t["stripH"]}</h3><ol>' +
             "".join(f'<li class="hd-s{i}"><span class="hd-moon" aria-hidden="true"></span><b>{n}</b><span>{a}</span><small>{b}</small></li>' for i, (n, a, b) in enumerate(t["strip"])) + "</ol></section>")
    o.append(f'  <h2 class="fe-h2">{t["kindsH"]}</h2>')
    o.append('  <ul class="hd-kinds">' + "".join(f'<li class="hd-k hd-k-{k}"><span class="hd-dot" aria-hidden="true"></span><div><b>{a}</b><p>{b}</p></div></li>' for k, a, b in t["kinds"]) + "</ul>")
    o.append('  <div class="ad-slot">Ad space</div>')
    o.append(f'  <h2 class="fe-h2">{t["monthsH"]}</h2>')
    o.append(f'  <div class="fe-text"><p>{t["monthsP"]}</p></div>')
    o.append(f'  <ol class="hd-months">\n{month_cards(lang)}\n  </ol>')
    o.append(f'  <h2 class="fe-h2">{t["festH"]}</h2>')
    o.append(f'  <div class="fe-text"><p>{t["festP"]}</p></div>')
    L = t["lbl"]; cards = []
    for key, name, icon, meaning, when, do, hol in t["fest"]:
        k2 = "pchumben" if key == "pchumben" else key
        dates = f'{t["y26"]}: {f(y26(k2))} · {t["y27"]}: {f(y27(k2))}'
        if key == "pchumben":
            dates = f'{t["y26"]}: {f(y26("kanben"))} – {f(y26("pchumben"))} · {t["y27"]}: {f(y27("kanben"))} – {f(y27("pchumben"))}'
        if key == "chenh":
            dates = f'{t["y26"]}: {f(y26("chenh"))} – {f(y26("kathinEnd"))} · {t["y27"]}: {f(y27("chenh"))} – {f(y27("kathinEnd"))}'
        cards.append(f'''<article class="zc-box hd-fest hd-fest-{key}">
      <h3><span class="hd-fi" aria-hidden="true">{icon}</span>{name}</h3>
      <p>{meaning}</p>
      <dl>
        <div><dt>{L["when"]}</dt><dd>{when}<br><span class="hd-dates">{dates}</span><br><small>{L["range"]}: {rng(lang, k2)} · {L["varies"]}</small></dd></div>
        <div><dt>{L["do"]}</dt><dd>{do}</dd></div>
        <div><dt>{L["holiday"]}</dt><dd>{hol}</dd></div>
      </dl>
    </article>''')
    o.append('  <div class="hd-fests">\n    ' + "\n    ".join(cards) + "\n  </div>")
    o.append(f'  <h2 class="fe-h2">{t["relH"]}</h2>')
    o.append('  <ul class="hd-rel">' + "".join(f'<li class="zc-box"><b>{a}</b><small>{b}</small><p>{c}</p></li>' for a, b, c in t["rel"]) + "</ul>")
    o.append(f'  <h2 class="fe-h2">{t["doH"]}</h2>')
    o.append(f'''  <div class="hd-do">
    <figure><img src="../images/holy-days/temple-offerings.webp" width="736" height="448" alt="{html.escape(t["doAlt"])}" loading="lazy" decoding="async"></figure>
    <ul>{"".join(f"<li><b>{a}</b> — {b}</li>" for a, b in t["do"])}</ul>
  </div>
  <p class="kny-note hd-center">{t["doNote"]}</p>''')
    o.append(f'  <h2 class="fe-h2">{t["findH"]}</h2>')
    o.append(f'  <div class="fe-text"><p>{t["findP"]}</p></div>')
    o.append(f'''  <section class="zc-box hd-next" data-hd-next data-lang="{lang}">
    <h3 class="zc-bh">{t["nextH"]}</h3>
    <ol class="hd-next-list" aria-live="polite"></ol>
    <p class="hd-center"><a class="fe-btn" href="../khmer-calendar.html">{t["nextBtn"]}</a></p>
  </section>''')
    o.append(f'  <h2 class="fe-h2">{t["faqH"]}</h2>')
    o.append('  <div class="klb-faq">' + "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in t["faq"]) + "</div>")
    o.append(f'  <h2 class="fe-h2">{t["endH"]}</h2>')
    o.append(f'  <div class="fe-text"><p>{t["end"]}</p></div>')
    o.append(f'  <p class="disclaimer">{t["disc"]}</p>')
    o.append(f'  <h3 class="klb-src-h">{t["srcH"]}</h3>')
    o.append('  <ul class="klb-src">' + "".join(f"<li>{s}</li>" for s in t["src"]) + "</ul>")
    o.append("</article>")
    o.append("</div>")
    return "\n".join(o)


NEXT_JS = r"""<script src="../js/vendor/momentkh.min.js" defer></script>
<script>
/* "Next holy days": the next Thngai Sil days and festivals from today, worked out with js/vendor/momentkh.min.js
   (same rules as the Khmer Calendar page). Nothing is saved or sent. */
document.addEventListener("DOMContentLoaded", function () {
  var S = %S%, ENM = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], KMM = ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
  var MEN = ["Migasir","Boss","Meak","Phalkun","Chet","Pisak","Jesth","Asadh","Srap","Phatrabot","Assoch","Kadeuk","1st Asadh","2nd Asadh"];
  var DAY = 864e5;
  function go() {
    var M = window.momentkh; if (!M) return;
    var kh = function (t) { var d = new Date(t); return M.fromGregorian(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()).khmer; };
    var last = function (t) { return kh(t).moonPhase === 1 && kh(t + DAY).moonPhase === 0; };
    document.querySelectorAll("[data-hd-next]").forEach(function (box) {
      var lang = box.getAttribute("data-lang"), s = S[lang] || S.en, now = new Date(), t = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()), out = [];
      for (var i = 0; i < 120 && out.length < 8; i++, t += DAY) {
        var k = kh(t), w = k.moonPhase === 0, d = k.day, m = k.monthIndex, tags = [];
        if (w && d === 15 && m === 2) tags.push(s.meak);
        if (w && d === 15 && m === 5) tags.push(s.visak);
        if (w && d === 15 && (m === 7 || m === 13)) tags.push(s.asalha);
        if (!w && d === 1 && (m === 7 || m === 13)) tags.push(s.chol);
        if (!w && d === 1 && m === 9) tags.push(s.kanben);
        if (!w && m === 9 && last(t)) tags.push(s.pchumben);
        if (w && d === 15 && m === 10) tags.push(s.chenh);
        var sil = w && d === 15 ? s.full : last(t) ? s.new : d === 8 ? s.eighth : null;
        if (!sil && !tags.length) continue;
        var g = new Date(t), dd = g.getUTCDate(), mm = g.getUTCMonth(), yy = g.getUTCFullYear();
        var date = lang === "zh" ? (mm + 1) + "月" + dd + "日" : lang === "km" ? dd + " " + KMM[mm] : dd + " " + ENM[mm] + " " + yy;
        var lunar = lang === "km" ? d + s[w ? "waxing" : "waning"] + " " + k.monthName : lang === "zh" ? s[w ? "waxing" : "waning"] + d + "日 · " + MEN[m] : d + " " + s[w ? "waxing" : "waning"] + " · " + MEN[m];
        out.push('<li><b>' + date + '</b><span>' + (tags.concat(sil ? [sil] : [])).join(" · ") + '</span><small' + (lang === "km" ? ' lang="km"' : "") + '>' + lunar + "</small></li>");
      }
      box.querySelector(".hd-next-list").innerHTML = out.join("");
    });
  }
  if (window.momentkh) go(); else window.addEventListener("load", go);
});
</script>"""


def build():
    src = open(R + "blog/how-to-calculate-zodiac-sign.html").read()
    head, rest = src.split('<div data-lang-content="en">', 1)
    foot = rest[rest.index('<footer class="site-footer">'):]
    foot = foot[:foot.index('<script src="../js/zodiac-data.js" defer></script>') + len('<script src="../js/zodiac-data.js" defer></script>')] + "\n" + \
        NEXT_JS.replace("%S%", json.dumps({l: T[l]["js"] for l in T}, ensure_ascii=False)) + \
        '\n<script src="../js/khmer-lunar.js" defer></script>\n</body>\n</html>\n'
    t = T["en"]
    title = "Cambodian Buddhist Holy Days: Thngai Sil, Full Moons and Festivals by Month"
    desc = "Thngai Sil explained: the four Buddhist holy days of every Khmer lunar month, full-moon observances, Meak and Visak Bochea, Chol Vassa and Pchum Ben, with a month-by-month guide and this year's dates."
    head = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)} | MyBirthSign</title>", head, flags=re.S)
    head = head.replace("https://mybirthsign.com/blog/how-to-calculate-zodiac-sign.html", URL)
    head = re.sub(r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + html.escape(title, quote=True), head)
    head = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = head.replace("https://mybirthsign.com/images/og/calculate-zodiac.jpg", OG)
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "headline": title, "description": desc, "image": OG,
         "datePublished": "2026-10-18", "dateModified": "2026-10-18", "inLanguage": "en", "author": {"@type": "Organization", "name": "MyBirthSign"},
         "publisher": {"@type": "Organization", "name": "MyBirthSign", "url": "https://mybirthsign.com/"}, "mainEntityOfPage": URL},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mybirthsign.com/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mybirthsign.com/blog"},
            {"@type": "ListItem", "position": 3, "name": "Cambodian Buddhist Holy Days"}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub("<[^>]+>", "", a)}} for q, a in t["faq"]]}]}
    head = re.sub(r'<script type="application/ld\+json">.*?</script>', lambda m: '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace("<", "\\u003c") + "</script>", head, flags=re.S)
    head = head.replace('href="../images/guides/khmer-lunar-wide.webp"', 'href="../images/holy-days/hero-pagoda.webp"')
    out = head + "\n".join(body(l) for l in ("en", "km", "zh")) + "\n\n" + foot
    open(R + f"blog/{SLUG}.html", "w").write(out)
    print("wrote", SLUG, len(out))

build()
