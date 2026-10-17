#!/usr/bin/env python3
"""Builds blog/chol-vassa-buddhist-lent.html (EN / KM / ZH) on the site's guide design.

   python3 scripts/content/chol-vassa-build.py

Every date comes from scripts/content/vassa-data.json, computed with js/vendor/momentkh.min.js
(traditional Khmer calendar). Rules used:
  Chol Vassa  = 1st waning day of Asadh (of the 2nd Asadh, Tutiyasadh, in years with a leap month)
  Pchum Ben   = last waning day of Phatrabot
  Chenh Vassa = full moon (15th waxing day) of Assoch
  Kathin      = from the day after Chenh Vassa to the full moon of Kadeuk
2026 and 2027 dates were cross-checked with published Buddhist Lent dates (see the sources list).
Nothing on the page is guessed: the checker computes the same rules in the browser with momentkh."""
import json, html, re, os, datetime as dt

R = "/home/claude/mybirthsign/"
D = json.load(open(os.path.join(os.path.dirname(__file__), "vassa-data.json")))
SLUG = "chol-vassa-buddhist-lent"
URL = f"https://mybirthsign.com/blog/{SLUG}.html"
OG = "https://mybirthsign.com/images/og/chol-vassa.jpg"
ENM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
KMM = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]
ENW = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
KMW = ["ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍", "អាទិត្យ"]
ZHW = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]

def dfmt(lang, g, year=True, wd=False):
    y, m, d = g
    w = dt.date(y, m, d).weekday()
    if lang == "zh": return (f"{y}年" if year else "") + f"{m}月{d}日" + (f"（{ZHW[w]}）" if wd else "")
    if lang == "km": return (f"ថ្ងៃ{KMW[w]} " if wd else "") + f"{d} {KMM[m-1]}" + (f" {y}" if year else "")
    return (f"{ENW[w]} " if wd else "") + f"{d} {ENM[m-1]}" + (f" {y}" if year else "")

def ndays(a, b): return (dt.date(*b) - dt.date(*a)).days + 1
Y = {r["y"]: r for r in D}
Y26 = Y[2026]
S26, E26, B26, K26 = Y26["starts"][0]["g"], Y26["end"]["g"], Y26["benLast"]["g"], Y26["kathinEnd"]
S25 = Y[2025]["starts"][0]["g"]
LEN26 = ndays(S26, E26)
K26S = list((dt.date(*E26) + dt.timedelta(days=1)).timetuple()[:3])

T = {}
T["en"] = dict(
  eyebrow="Khmer Culture &amp; Calendar",
  h1="Chol Vassa: Buddhist Lent in Cambodia",
  sub="the three-month rains retreat, its dates, and what it means for family plans",
  lead=f"Chol Vassa begins the three months when Buddhist monks stay in one monastery for the rainy season. In 2026 it began on {dfmt('en', S26, wd=True)}, and it ends at Chenh Vassa on {dfmt('en', E26, wd=True)}.",
  meta='Published <time datetime="2026-10-17">October 17, 2026</time> · MyBirthSign',
  intro=[
    "Every year, on the day after the full moon of the month of Asadh, monks across Cambodia begin <em>Vassa</em>, the rains retreat. For about three lunar months they stay at their own monastery to study, meditate and teach. Lay families visit the pagoda more often, and many quietly change their plans for the season.",
    "This guide explains where the custom comes from, how its dates are worked out, what families in Cambodia traditionally do during these months, and why the start date moves so much from year to year. There is a table for 2024 to 2030 and a checker for any date.",
  ],
  whatH="Where the rains retreat comes from",
  what=[
    "In the Buddha's time, monks walked from village to village all year. Buddhist texts tell that during the rainy season people complained: wandering monks trampled young rice plants and small creatures in the wet fields. The Buddha then asked monks to stay in one place for the three months of the rains.",
    "The rule is still followed. A monk who enters Vassa promises to spend the season at one monastery. He may leave for up to seven days for a real need, such as caring for a sick parent, but he must return before the seventh dawn. A monk's seniority is still counted in the number of Vassa seasons he has completed.",
  ],
  twoH="How the start and end dates are set",
  start_t="Chol Vassa", start_when="1st waning day of Asadh",
  start_p="The retreat begins on the day after the full moon of Asadh, the eighth Khmer lunar month. The full moon itself is Asalha Puja, which remembers the Buddha's first sermon. In years with a leap month there are two Asadh months, and Vassa begins in the second one (Tutiyasadh).",
  end_t="Chenh Vassa", end_when="Full moon of Assoch",
  end_p="The retreat ends three lunar months later, on the full moon of Assoch. That day is Chenh Vassa. From the next day until the full moon of Kadeuk is the Kathin season, when communities offer new robes to the monks.",
  leapH="Why the date jumps around",
  leap=[
    f"The Khmer lunar year is about 11 days shorter than the solar year, so Chol Vassa usually comes about 11 days earlier than the year before. To stop the months drifting away from the seasons, the calendar adds a leap month (Adhikameas) every two or three years by repeating Asadh.",
    f"That is why the dates swing: in 2025 Vassa began on {dfmt('en', S25)}, but 2026 had two Asadh months, so it began almost three weeks later, on {dfmt('en', S26)}. The next leap year in the table is 2029.",
  ],
  tableH="Vassa dates, 2024–2030",
  th=["Year", "Chol Vassa begins", "Pchum Ben day", "Chenh Vassa ends", "Kathin season until"],
  leapTag="leap year",
  tableNote="Dates are calculated with the traditional Khmer calendar rules (the momentkh library our Zodiac Checker uses). The 2026 and 2027 dates match published Buddhist Lent dates. A temple or national calendar may announce a different day in rare cases, so check with your pagoda before a ceremony.",
  doH="What families traditionally do",
  do=[
    ("Before the retreat", "Ordinations", "Many young men are ordained in the weeks before Chol Vassa, so they can spend the whole retreat as monks. For the family it is a merit-making event, often celebrated with relatives."),
    ("At Chol Vassa", "Candles and rain cloths", "Families and villages offer large Vassa candles to light the temple through the season, and rain-bathing cloths for the monks. Some places carry the candles to the pagoda in a procession."),
    ("During Vassa", "Precepts and Pchum Ben", "Many lay people keep the precepts more strictly on holy days, and some give up alcohol for the season. Pchum Ben, the 15 days for ancestors, falls inside Vassa, ending on the day shown in the table."),
    ("After Chenh Vassa", "Kathin", "The month after the retreat is for Kathin: a community offers new robes and gifts to a temple in a procession. Each temple can receive the Kathin offering once a season."),
  ],
  planH="Weddings and other plans",
  plan=[
    "Many Cambodian families do not hold weddings during the three months of Vassa, and the wedding season traditionally picks up again after Chenh Vassa. The Buddhist rule binds the monks, not lay people, so this is a family custom rather than a religious law. How strictly it is kept differs between families and regions, so ask your elders or the achar who will lead the ceremony.",
    f"If you are using our <a href=\"../wedding-date.html\">Wedding Date tool</a>, it does not check Vassa. Compare the months it suggests with the table above, or test a date in the checker below. For example, any date from {dfmt('en', S26)} to {dfmt('en', E26)} falls inside the 2026 retreat.",
    "The same thinking is often applied to housewarmings and shop openings, which families tend to plan for the dry season. Our guide to <a href=\"lucky-days-opening-business.html\">lucky days to open a business</a> covers how Cambodian families choose those days.",
  ],
  calcH="Is a date inside Vassa?",
  calcP="Enter any date from 1900 to 2059. The checker works out that year's Vassa with the same Khmer calendar rules and tells you where your date falls. It runs in your browser; nothing is saved or sent.",
  calcLabel="Date", calcBtn="Check the date",
  faqH="Frequently Asked Questions",
  faq=[
    (f"When is Chol Vassa in 2026?", f"Chol Vassa 2026 was on {dfmt('en', S26, wd=True)}. The retreat ends at Chenh Vassa on {dfmt('en', E26, wd=True)}, and the Kathin season runs until {dfmt('en', K26)}."),
    ("Why does Chol Vassa fall on a different date every year?", "It follows the Khmer lunar calendar: it is always the day after the full moon of Asadh. Lunar months do not line up with the Gregorian calendar, and some years add a second Asadh, which moves Vassa about three weeks later."),
    ("How long does Vassa last?", f"Three lunar months, from the 1st waning day of Asadh to the full moon of Assoch. In 2026 that was {LEN26} days, counting both the first and last day."),
    ("Can monks leave the temple during Vassa?", "Only for a real need, such as a sick parent or an important duty, and for no more than seven days. Otherwise a monk spends the whole season at the monastery where he entered Vassa."),
    ("Can you get married during Vassa?", "There is no Buddhist rule against lay weddings, but many Cambodian families avoid them during Vassa by custom and wait until after Chenh Vassa. Ask your family's elders or achar what they follow."),
    ("Is Pchum Ben part of Vassa?", "Yes. Pchum Ben falls inside the retreat, at the end of the month of Phatrabot. Chenh Vassa comes about two weeks after Pchum Ben day."),
  ],
  next='Read next: <a href="khmer-lunar-calendar-birth-date.html">how the Khmer lunar calendar counts waxing and waning days</a>, <a href="khmer-new-year-animal-year.html">when the Khmer animal year changes</a>, or try the <a href="../checker.html">Zodiac Checker</a> to see your own Khmer lunar birth date.',
  disc="For cultural interest. Customs during Vassa differ between families, temples and regions; follow the guidance of your own pagoda.",
  srcH="Sources",
  src=[
    'Khmer calendar rules as implemented in the open-source <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a> library (all dates on this page).',
    'Published 2026 Buddhist Lent dates, 30 July to 26 October: <a href="https://www.thailandnow.in.th/?p=5031" rel="noopener" target="_blank">Thailand NOW, “Khao Phansa (Buddhist Lent Day) 2026”</a>.',
    'End of Buddhist Lent, 26 October 2026 and 15 October 2027: <a href="https://www.officeholidays.com/amp/holidays/lao/boun-ok-phansa" rel="noopener" target="_blank">Office Holidays, “End of Buddhist Lent Day”</a>.',
  ],
  calc=dict(
    range="Enter a date between 1900 and 2059.",
    lunar="Khmer lunar date",
    before="Before Vassa. This year's retreat begins on {s}, {n} days later.",
    inside="Inside Vassa: day {k} of {n}. The retreat ends at Chenh Vassa on {e}.",
    ben="This date is also within the 15 days of Pchum Ben.",
    first="This is Chol Vassa, the first day of the retreat.",
    last="This is Chenh Vassa, the last day of the retreat.",
    kathin="After Vassa, in the Kathin season, which lasts until {k}.",
    after="After Vassa and the Kathin season. The next retreat begins on {s}.",
    season="{y} Vassa: {s} to {e}",
  ),
)

T["km"] = dict(
  eyebrow="វប្បធម៌ និងប្រតិទិនខ្មែរ",
  h1="ចូលព្រះវស្សា៖ រដូវវស្សានៃព្រះពុទ្ធសាសនានៅកម្ពុជា",
  sub="រយៈពេលបីខែនៃការគង់ចាំវស្សា កាលបរិច្ឆេទ និងអត្ថន័យសម្រាប់គម្រោងគ្រួសារ",
  lead=f"ចូលព្រះវស្សា គឺជាការចាប់ផ្តើមនៃរយៈពេលបីខែ ដែលព្រះសង្ឃគង់នៅវត្តតែមួយក្នុងរដូវភ្លៀង។ ក្នុងឆ្នាំ 2026 ចូលព្រះវស្សានៅ{dfmt('km', S26, wd=True)} ហើយចេញព្រះវស្សានៅ{dfmt('km', E26, wd=True)}។",
  meta='ចុះផ្សាយ <time datetime="2026-10-17">ថ្ងៃទី17 ខែតុលា ឆ្នាំ2026</time> · MyBirthSign',
  intro=[
    "រៀងរាល់ឆ្នាំ នៅថ្ងៃបន្ទាប់ពីពេញបូណ៌មីខែអាសាឍ ព្រះសង្ឃទូទាំងប្រទេសកម្ពុជាចូលព្រះវស្សា។ ក្នុងរយៈពេលប្រហែលបីខែចន្ទគតិ ព្រះអង្គគង់នៅវត្តរបស់ខ្លួន ដើម្បីសិក្សា ចម្រើនសមាធិ និងបង្រៀនធម៌។ គ្រួសារពុទ្ធបរិស័ទទៅវត្តញឹកញាប់ជាងមុន ហើយជាច្រើនផ្លាស់ប្តូរគម្រោងរបស់ខ្លួនដោយស្ងាត់ៗក្នុងរដូវនេះ។",
    "អត្ថបទនេះពន្យល់ពីប្រភពនៃទំនៀមនេះ របៀបកំណត់កាលបរិច្ឆេទ អ្វីដែលគ្រួសារខ្មែរធ្វើតាមប្រពៃណីក្នុងរយៈពេលនេះ និងហេតុអ្វីបានជាថ្ងៃចូលព្រះវស្សាប្រែប្រួលខ្លាំងពីមួយឆ្នាំទៅមួយឆ្នាំ។ មានតារាងសម្រាប់ឆ្នាំ 2024 ដល់ 2030 និងឧបករណ៍ពិនិត្យសម្រាប់ថ្ងៃណាមួយ។",
  ],
  whatH="ប្រភពនៃការគង់ចាំវស្សា",
  what=[
    "នៅសម័យព្រះពុទ្ធ ព្រះសង្ឃនិមន្តពីភូមិមួយទៅភូមិមួយពេញមួយឆ្នាំ។ គម្ពីរពុទ្ធសាសនាតំណាលថា ក្នុងរដូវភ្លៀង ប្រជាជនបានត្អូញត្អែរថា ព្រះសង្ឃដែលនិមន្តចុះឡើង បានជាន់ស្រូវខ្ចី និងសត្វតូចៗនៅតាមវាលសើម។ ព្រះពុទ្ធទើបបង្គាប់ឱ្យព្រះសង្ឃគង់នៅកន្លែងតែមួយ ក្នុងរយៈពេលបីខែនៃរដូវភ្លៀង។",
    "ច្បាប់នេះនៅតែត្រូវបានគោរពរហូតមកដល់សព្វថ្ងៃ។ ព្រះសង្ឃដែលចូលព្រះវស្សា អធិដ្ឋានគង់នៅវត្តតែមួយពេញរដូវ។ ព្រះអង្គអាចចេញទៅបានមិនលើសពីប្រាំពីរថ្ងៃ សម្រាប់កិច្ចចាំបាច់ពិតប្រាកដ ដូចជាមើលថែឪពុកម្តាយដែលឈឺ (សត្តាហករណីយៈ) ប៉ុន្តែត្រូវត្រឡប់មកវិញមុនអរុណទីប្រាំពីរ។ វស្សារបស់ព្រះសង្ឃ នៅតែត្រូវបានរាប់តាមចំនួនព្រះវស្សាដែលព្រះអង្គបានគង់ចាំ។",
  ],
  twoH="របៀបកំណត់ថ្ងៃចូល និងចេញព្រះវស្សា",
  start_t="ចូលព្រះវស្សា", start_when="ថ្ងៃ 1 រោច ខែអាសាឍ",
  start_p="ការគង់ចាំវស្សាចាប់ផ្តើមនៅថ្ងៃបន្ទាប់ពីពេញបូណ៌មីខែអាសាឍ ដែលជាខែចន្ទគតិទីប្រាំបី។ ថ្ងៃពេញបូណ៌មីនោះជាបុណ្យអាសាឡ្ហបូជា ដែលរំលឹកដល់ធម្មទេសនាដំបូងរបស់ព្រះពុទ្ធ។ ក្នុងឆ្នាំដែលមានអធិកមាស មានខែអាសាឍពីរ ហើយចូលព្រះវស្សាក្នុងខែទីពីរ (ទុតិយាសាឍ)។",
  end_t="ចេញព្រះវស្សា", end_when="ពេញបូណ៌មីខែអស្សុជ",
  end_p="ការគង់ចាំវស្សាបញ្ចប់បីខែចន្ទគតិក្រោយមក នៅថ្ងៃពេញបូណ៌មីខែអស្សុជ គឺថ្ងៃចេញព្រះវស្សា។ ចាប់ពីថ្ងៃបន្ទាប់ រហូតដល់ពេញបូណ៌មីខែកត្ដិក ជារដូវកឋិន ដែលសហគមន៍នាំគ្នាប្រគេនស្បង់ចីវរថ្មីដល់ព្រះសង្ឃ។",
  leapH="ហេតុអ្វីបានជាថ្ងៃប្រែប្រួល",
  leap=[
    "ឆ្នាំចន្ទគតិខ្មែរខ្លីជាងឆ្នាំសុរិយគតិប្រហែល 11 ថ្ងៃ ដូច្នេះចូលព្រះវស្សាជាធម្មតាមកដល់មុនឆ្នាំមុនប្រហែល 11 ថ្ងៃ។ ដើម្បីកុំឱ្យខែរំកិលឆ្ងាយពីរដូវ ប្រតិទិនបន្ថែមខែអធិកមាស រៀងរាល់ពីរ ឬបីឆ្នាំម្តង ដោយមានខែអាសាឍពីរដង។",
    f"នេះហើយជាមូលហេតុដែលថ្ងៃប្រែប្រួល៖ ក្នុងឆ្នាំ 2025 ចូលព្រះវស្សានៅ {dfmt('km', S25)} ប៉ុន្តែឆ្នាំ 2026 មានខែអាសាឍពីរ ដូច្នេះចូលព្រះវស្សាយឺតជិតបីសប្តាហ៍ គឺនៅ {dfmt('km', S26)}។ ឆ្នាំអធិកមាសបន្ទាប់ក្នុងតារាងគឺឆ្នាំ 2029។",
  ],
  tableH="កាលបរិច្ឆេទព្រះវស្សា ឆ្នាំ 2024–2030",
  th=["ឆ្នាំ", "ចូលព្រះវស្សា", "ថ្ងៃភ្ជុំបិណ្ឌ", "ចេញព្រះវស្សា", "រដូវកឋិនរហូតដល់"],
  leapTag="អធិកមាស",
  tableNote="កាលបរិច្ឆេទគណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី (បណ្ណាល័យ momentkh ដែលម៉ាស៊ីនពិនិត្យរាសីរបស់យើងប្រើ)។ កាលបរិច្ឆេទឆ្នាំ 2026 និង 2027 ត្រូវគ្នានឹងកាលបរិច្ឆេទព្រះវស្សាដែលបានផ្សព្វផ្សាយ។ ក្នុងករណីកម្រ វត្ត ឬប្រតិទិនជាតិអាចប្រកាសថ្ងៃខុសពីនេះ ដូច្នេះសូមសួរវត្តរបស់អ្នកមុនធ្វើពិធី។",
  doH="អ្វីដែលគ្រួសារធ្វើតាមប្រពៃណី",
  do=[
    ("មុនចូលព្រះវស្សា", "ការបួស", "យុវជនជាច្រើនបួសក្នុងរយៈពេលប៉ុន្មានសប្តាហ៍មុនចូលព្រះវស្សា ដើម្បីគង់ចាំវស្សាពេញរដូវជាព្រះសង្ឃ។ សម្រាប់គ្រួសារ វាជាពិធីធ្វើបុណ្យ ដែលច្រើនតែប្រារព្ធជាមួយញាតិមិត្ត។"),
    ("ថ្ងៃចូលព្រះវស្សា", "ទៀនព្រះវស្សា និងសំពត់ងូតទឹកភ្លៀង", "គ្រួសារ និងភូមិនានាប្រគេនទៀនព្រះវស្សាធំៗ ដើម្បីបំភ្លឺវត្តពេញរដូវ និងសំពត់ងូតទឹកភ្លៀងដល់ព្រះសង្ឃ។ កន្លែងខ្លះហែទៀនទៅវត្តជាក្បួន។"),
    ("ក្នុងព្រះវស្សា", "សីល និងភ្ជុំបិណ្ឌ", "ពុទ្ធបរិស័ទជាច្រើនរក្សាសីលតឹងរ៉ឹងជាងមុននៅថ្ងៃសីល ហើយខ្លះឈប់ផឹកស្រាពេញរដូវ។ ភ្ជុំបិណ្ឌ ដែលជា 15 ថ្ងៃសម្រាប់បុព្វបុរស ធ្លាក់ក្នុងព្រះវស្សា ហើយបញ្ចប់នៅថ្ងៃដែលបង្ហាញក្នុងតារាង។"),
    ("ក្រោយចេញព្រះវស្សា", "បុណ្យកឋិនទាន", "មួយខែក្រោយចេញព្រះវស្សា ជារដូវកឋិនទាន៖ សហគមន៍ហែស្បង់ចីវរថ្មី និងទេយ្យវត្ថុទៅប្រគេនវត្ត។ វត្តនីមួយៗអាចទទួលកឋិនបានតែម្តងក្នុងមួយរដូវ។"),
  ],
  planH="អាពាហ៍ពិពាហ៍ និងគម្រោងផ្សេងៗ",
  plan=[
    "គ្រួសារខ្មែរជាច្រើនមិនរៀបការក្នុងរយៈពេលបីខែនៃព្រះវស្សាទេ ហើយរដូវរៀបការតាមប្រពៃណីចាប់ផ្តើមឡើងវិញក្រោយចេញព្រះវស្សា។ វិន័យពុទ្ធសាសនាសម្រាប់ព្រះសង្ឃ មិនមែនសម្រាប់គ្រហស្ថទេ ដូច្នេះនេះជាទំនៀមគ្រួសារ មិនមែនជាច្បាប់សាសនាទេ។ ការគោរពតឹងរ៉ឹងប៉ុណ្ណា ខុសគ្នាតាមគ្រួសារ និងតំបន់ ដូច្នេះសូមសួរចាស់ទុំ ឬលោកអាចារ្យដែលនឹងដឹកនាំពិធី។",
    f"ប្រសិនបើអ្នកប្រើ<a href=\"../wedding-date.html\">ឧបករណ៍ជ្រើសរើសថ្ងៃរៀបការ</a>របស់យើង វាមិនពិនិត្យព្រះវស្សាទេ។ សូមប្រៀបធៀបខែដែលវាណែនាំជាមួយតារាងខាងលើ ឬសាកល្បងថ្ងៃក្នុងឧបករណ៍ពិនិត្យខាងក្រោម។ ឧទាហរណ៍ ថ្ងៃណាមួយចាប់ពី {dfmt('km', S26)} ដល់ {dfmt('km', E26)} ស្ថិតក្នុងព្រះវស្សាឆ្នាំ 2026។",
    "គំនិតដដែលនេះ ច្រើនតែត្រូវបានប្រើសម្រាប់ការឡើងផ្ទះថ្មី និងការបើកហាង ដែលគ្រួសារនិយមរៀបចំនៅរដូវប្រាំង។ អត្ថបទ<a href=\"lucky-days-opening-business.html\">ថ្ងៃល្អសម្រាប់បើកហាង</a>របស់យើង ពន្យល់ពីរបៀបដែលគ្រួសារខ្មែរជ្រើសរើសថ្ងៃទាំងនោះ។",
  ],
  calcH="តើថ្ងៃនេះស្ថិតក្នុងព្រះវស្សាឬទេ?",
  calcP="បញ្ចូលថ្ងៃណាមួយពីឆ្នាំ 1900 ដល់ 2059។ ឧបករណ៍នេះគណនាព្រះវស្សានៃឆ្នាំនោះ តាមវិធានប្រតិទិនខ្មែរដដែល ហើយប្រាប់ថាថ្ងៃរបស់អ្នកស្ថិតនៅត្រង់ណា។ វាដំណើរការនៅក្នុងកម្មវិធីរុករករបស់អ្នក គ្មានអ្វីត្រូវបានរក្សាទុក ឬផ្ញើចេញទេ។",
  calcLabel="ថ្ងៃខែឆ្នាំ", calcBtn="ពិនិត្យថ្ងៃ",
  faqH="សំណួរដែលសួរញឹកញាប់",
  faq=[
    ("តើចូលព្រះវស្សាឆ្នាំ 2026 នៅថ្ងៃណា?", f"ចូលព្រះវស្សាឆ្នាំ 2026 នៅ{dfmt('km', S26, wd=True)}។ ចេញព្រះវស្សានៅ{dfmt('km', E26, wd=True)} ហើយរដូវកឋិនរហូតដល់ {dfmt('km', K26)}។"),
    ("ហេតុអ្វីបានជាថ្ងៃចូលព្រះវស្សាខុសគ្នារៀងរាល់ឆ្នាំ?", "វាតាមប្រតិទិនចន្ទគតិខ្មែរ៖ វាតែងតែជាថ្ងៃបន្ទាប់ពីពេញបូណ៌មីខែអាសាឍ។ ខែចន្ទគតិមិនស៊ីគ្នានឹងប្រតិទិនសុរិយគតិទេ ហើយឆ្នាំខ្លះមានខែអាសាឍទីពីរ ដែលធ្វើឱ្យចូលព្រះវស្សាយឺតប្រហែលបីសប្តាហ៍។"),
    ("តើព្រះវស្សាមានរយៈពេលប៉ុន្មាន?", f"បីខែចន្ទគតិ ចាប់ពីថ្ងៃ 1 រោច ខែអាសាឍ ដល់ពេញបូណ៌មីខែអស្សុជ។ ក្នុងឆ្នាំ 2026 គឺ {LEN26} ថ្ងៃ ដោយរាប់ទាំងថ្ងៃដំបូង និងថ្ងៃចុងក្រោយ។"),
    ("តើព្រះសង្ឃអាចចេញពីវត្តក្នុងព្រះវស្សាបានទេ?", "បានតែសម្រាប់កិច្ចចាំបាច់ពិតប្រាកដ ដូចជាឪពុកម្តាយឈឺ ឬភារកិច្ចសំខាន់ ហើយមិនលើសពីប្រាំពីរថ្ងៃ។ ក្រៅពីនោះ ព្រះសង្ឃគង់នៅវត្តដែលព្រះអង្គចូលព្រះវស្សាពេញរដូវ។"),
    ("តើអាចរៀបការក្នុងព្រះវស្សាបានទេ?", "គ្មានវិន័យពុទ្ធសាសនាហាមគ្រហស្ថរៀបការទេ ប៉ុន្តែគ្រួសារខ្មែរជាច្រើនជៀសវាងតាមទំនៀម ហើយរង់ចាំក្រោយចេញព្រះវស្សា។ សូមសួរចាស់ទុំ ឬលោកអាចារ្យរបស់គ្រួសារអ្នក ពីអ្វីដែលពួកគាត់គោរព។"),
    ("តើភ្ជុំបិណ្ឌជាផ្នែកនៃព្រះវស្សាឬទេ?", "បាទ/ចាស។ ភ្ជុំបិណ្ឌធ្លាក់ក្នុងព្រះវស្សា នៅចុងខែភទ្របទ។ ចេញព្រះវស្សាមកដល់ប្រហែលពីរសប្តាហ៍ក្រោយថ្ងៃភ្ជុំបិណ្ឌ។"),
  ],
  next='អានបន្ត៖ <a href="khmer-lunar-calendar-birth-date.html">របៀបដែលប្រតិទិនចន្ទគតិខ្មែររាប់ថ្ងៃកើត និងរោច</a> <a href="khmer-new-year-animal-year.html">ពេលណាឆ្នាំសត្វខ្មែរប្តូរ</a> ឬសាកល្បង<a href="../checker.html">ម៉ាស៊ីនពិនិត្យរាសី</a> ដើម្បីមើលថ្ងៃខែកំណើតតាមចន្ទគតិរបស់អ្នក។',
  disc="សម្រាប់ចំណេះដឹងវប្បធម៌។ ទំនៀមក្នុងព្រះវស្សាខុសគ្នាតាមគ្រួសារ វត្ត និងតំបន់។ សូមធ្វើតាមការណែនាំរបស់វត្តរបស់អ្នក។",
  srcH="ប្រភព",
  src=[
    'វិធានប្រតិទិនខ្មែរ តាមបណ្ណាល័យកូដចំហ <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a> (កាលបរិច្ឆេទទាំងអស់នៅលើទំព័រនេះ)។',
    'កាលបរិច្ឆេទព្រះវស្សាឆ្នាំ 2026 ដែលបានផ្សព្វផ្សាយ ពី 30 កក្កដា ដល់ 26 តុលា៖ <a href="https://www.thailandnow.in.th/?p=5031" rel="noopener" target="_blank">Thailand NOW, “Khao Phansa (Buddhist Lent Day) 2026”</a>។',
    'ចេញព្រះវស្សា 26 តុលា 2026 និង 15 តុលា 2027៖ <a href="https://www.officeholidays.com/amp/holidays/lao/boun-ok-phansa" rel="noopener" target="_blank">Office Holidays, “End of Buddhist Lent Day”</a>។',
  ],
  calc=dict(
    range="សូមបញ្ចូលថ្ងៃចន្លោះឆ្នាំ 1900 និង 2059។",
    lunar="ថ្ងៃខែតាមចន្ទគតិខ្មែរ",
    before="មុនព្រះវស្សា។ ចូលព្រះវស្សាឆ្នាំនេះនៅ {s} គឺ {n} ថ្ងៃទៀត។",
    inside="ក្នុងព្រះវស្សា៖ ថ្ងៃទី {k} ក្នុងចំណោម {n} ថ្ងៃ។ ចេញព្រះវស្សានៅ {e}។",
    ben="ថ្ងៃនេះក៏ស្ថិតក្នុង 15 ថ្ងៃនៃបុណ្យភ្ជុំបិណ្ឌដែរ។",
    first="នេះជាថ្ងៃចូលព្រះវស្សា ថ្ងៃដំបូងនៃការគង់ចាំវស្សា។",
    last="នេះជាថ្ងៃចេញព្រះវស្សា ថ្ងៃចុងក្រោយនៃការគង់ចាំវស្សា។",
    kathin="ក្រោយព្រះវស្សា ក្នុងរដូវកឋិន ដែលរហូតដល់ {k}។",
    after="ក្រោយព្រះវស្សា និងរដូវកឋិន។ ចូលព្រះវស្សាលើកក្រោយនៅ {s}។",
    season="ព្រះវស្សាឆ្នាំ {y}៖ {s} ដល់ {e}",
  ),
)

T["zh"] = dict(
  eyebrow="高棉文化与历法",
  h1="入雨安居：柬埔寨的佛教守夏节",
  sub="为期三个月的雨季安居、它的日期，以及对家庭安排的影响",
  lead=f"入雨安居（Chol Vassa）标志着僧人在雨季留在同一座寺院的三个月开始。2026年的入雨安居是{dfmt('zh', S26, wd=True)}，出雨安居是{dfmt('zh', E26, wd=True)}。",
  meta='发布于 <time datetime="2026-10-17">2026年10月17日</time> · MyBirthSign',
  intro=[
    "每年在阿沙荼月（Asadh）满月的第二天，柬埔寨各地的僧人开始“雨安居”（Vassa）。在大约三个农历月里，他们留在自己的寺院学习、禅修和讲法。居士家庭更常去寺院，许多人也会悄悄调整这一季的计划。",
    "本文介绍这一习俗的由来、日期如何推算、柬埔寨家庭在这几个月里传统上会做什么，以及为什么开始日期每年变化这么大。文中附有2024至2030年的日期表，以及可查询任意日期的工具。",
  ],
  whatH="雨安居的由来",
  what=[
    "在佛陀的时代，僧人一年四季在村落之间游行。佛经记载，雨季时人们抱怨四处行走的僧人踩坏了湿田里的秧苗和小生物。于是佛陀要求僧人在雨季的三个月里留在一处。",
    "这条戒律至今仍被遵守。进入安居的僧人发愿整季留在同一座寺院。若有真正的需要，例如照顾生病的父母，他可以离开最多七天，但必须在第七天黎明前回来。僧人的“戒腊”至今仍以完成的安居次数来计算。",
  ],
  twoH="开始和结束日期如何确定",
  start_t="入雨安居", start_when="阿沙荼月下弦第1天",
  start_p="安居在阿沙荼月（高棉第八个农历月）满月的第二天开始。满月当天是三宝佛节（Asalha Puja），纪念佛陀初转法轮。在有闰月的年份会有两个阿沙荼月，安居从第二个阿沙荼月（Tutiyasadh）开始。",
  end_t="出雨安居", end_when="阿说逝月满月",
  end_p="三个农历月后，在阿说逝月（Assoch）的满月日结束，这一天就是出雨安居（Chenh Vassa）。从第二天到迦提月（Kadeuk）满月是功德衣（Kathin）时节，信众在这段时间向僧人供养新袈裟。",
  leapH="为什么日期变化这么大",
  leap=[
    "高棉农历年比阳历年短约11天，所以入雨安居通常比前一年早约11天。为了不让月份偏离季节，历法每两三年加一个闰月（Adhikameas），也就是重复一次阿沙荼月。",
    f"这就是日期摆动的原因：2025年的安居从{dfmt('zh', S25)}开始，而2026年有两个阿沙荼月，所以晚了将近三周，在{dfmt('zh', S26)}开始。表中下一个闰年是2029年。",
  ],
  tableH="2024–2030年安居日期",
  th=["年份", "入雨安居", "亡人节正日", "出雨安居", "功德衣时节至"],
  leapTag="闰月年",
  tableNote="日期按传统高棉历法规则计算（即我们的生肖查询所用的 momentkh 程序库）。2026年和2027年的日期与公开的佛教守夏节日期一致。少数情况下寺院或国家历法可能公布不同的日子，举行仪式前请向寺院确认。",
  doH="家庭传统上会做什么",
  do=[
    ("安居之前", "出家", "许多年轻男子在入雨安居前几周出家，以便整季以僧人身份安居。对家庭来说这是积功德的大事，常常和亲友一起庆祝。"),
    ("入雨安居当天", "安居蜡烛与雨浴衣", "家庭和村落向寺院供养大蜡烛，让寺院整季都有灯光，也向僧人供养雨浴衣。有些地方会抬着蜡烛游行到寺院。"),
    ("安居期间", "持戒与亡人节", "许多居士在斋戒日更严格地持戒，有些人整季戒酒。为祖先而设的15天亡人节（Pchum Ben）也在安居期间，结束于表中所示的日子。"),
    ("出雨安居之后", "功德衣节", "安居结束后的一个月是功德衣（Kathin）时节：信众列队向寺院供养新袈裟和礼物。每座寺院每一季只能接受一次功德衣供养。"),
  ],
  planH="婚礼和其他安排",
  plan=[
    "许多柬埔寨家庭在安居的三个月里不办婚礼，传统上婚礼旺季在出雨安居之后才重新开始。佛教戒律约束的是僧人而不是居士，所以这是家庭习俗，而不是宗教法规。遵守的严格程度因家庭和地区而异，请向长辈或主持仪式的阿匝（achar）请教。",
    f"如果你使用我们的<a href=\"../wedding-date.html\">婚期工具</a>，请注意它不会检查安居期。请把它建议的月份与上表对照，或在下面的工具中查询日期。例如，从{dfmt('zh', S26)}到{dfmt('zh', E26)}之间的任何日期都在2026年的安居期内。",
    "乔迁和开业也常按同样的思路安排，家庭多会选在旱季。我们的<a href=\"lucky-days-opening-business.html\">开业吉日</a>一文介绍了柬埔寨家庭如何挑选这些日子。",
  ],
  calcH="某个日期在安居期内吗？",
  calcP="输入1900至2059年之间的任意日期。工具会用同样的高棉历法规则算出当年的安居期，并告诉你这个日期落在哪里。计算在你的浏览器中进行，不会保存或发送任何信息。",
  calcLabel="日期", calcBtn="查询日期",
  faqH="常见问题",
  faq=[
    ("2026年入雨安居是哪一天？", f"2026年入雨安居是{dfmt('zh', S26, wd=True)}，出雨安居是{dfmt('zh', E26, wd=True)}，功德衣时节一直到{dfmt('zh', K26)}。"),
    ("为什么入雨安居每年日期不同？", "它按高棉农历计算：永远是阿沙荼月满月的第二天。农历月份与阳历不对应，而且有些年份会多一个阿沙荼月，使安居推迟约三周。"),
    ("安居持续多久？", f"三个农历月，从阿沙荼月下弦第1天到阿说逝月满月。2026年共{LEN26}天（首尾两天都计算在内）。"),
    ("僧人在安居期间可以离开寺院吗？", "只有在真正需要时才可以，例如父母生病或重要事务，而且不超过七天。除此之外，僧人整季都留在他入安居的寺院。"),
    ("安居期间可以结婚吗？", "佛教戒律并不禁止居士结婚，但许多柬埔寨家庭按习俗避开安居期，等到出雨安居之后。请向家中长辈或阿匝请教你们家遵循的做法。"),
    ("亡人节是安居的一部分吗？", "是的。亡人节在安居期间，位于帕陀罗钵陀月（Phatrabot）月底。出雨安居大约在亡人节正日两周之后。"),
  ],
  next='延伸阅读：<a href="khmer-lunar-calendar-birth-date.html">高棉农历如何计算上弦和下弦日</a>、<a href="khmer-new-year-animal-year.html">高棉生肖年何时更换</a>，或使用<a href="../checker.html">生肖查询</a>看看你自己的高棉农历生日。',
  disc="仅供文化参考。安居期间的习俗因家庭、寺院和地区而异，请遵循你所在寺院的指导。",
  srcH="来源",
  src=[
    '高棉历法规则依据开源库 <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a>（本页所有日期）。',
    '公开的2026年佛教守夏节日期，7月30日至10月26日：<a href="https://www.thailandnow.in.th/?p=5031" rel="noopener" target="_blank">Thailand NOW, “Khao Phansa (Buddhist Lent Day) 2026”</a>。',
    '出雨安居：2026年10月26日、2027年10月15日：<a href="https://www.officeholidays.com/amp/holidays/lao/boun-ok-phansa" rel="noopener" target="_blank">Office Holidays, “End of Buddhist Lent Day”</a>。',
  ],
  calc=dict(
    range="请输入1900至2059年之间的日期。",
    lunar="高棉农历日期",
    before="安居之前。今年的安居从{s}开始，还有{n}天。",
    inside="安居期内：第{k}天，共{n}天。出雨安居是{e}。",
    ben="这一天也在亡人节的15天之内。",
    first="这一天是入雨安居，安居的第一天。",
    last="这一天是出雨安居，安居的最后一天。",
    kathin="安居已结束，正值功德衣时节，一直到{k}。",
    after="安居和功德衣时节都已结束。下一次安居从{s}开始。",
    season="{y}年安居：{s}至{e}",
  ),
)


def body(lang):
    t = T[lang]
    o = [f'<div data-lang-content="{lang}">', '<article class="post container fe hc kny vs">']
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
            "points": [t["start_t"] + ": " + dfmt(lang, S26), t["end_t"] + ": " + dfmt(lang, E26)]}
    o.append(f'  <div class="share-row" data-share data-share-card="{html.escape(json.dumps(card, ensure_ascii=False), quote=True)}" data-share-url="/blog/{SLUG}.html"></div>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["intro"]) + "</div>")
    o.append(f'  <h2 class="fe-h2">{t["whatH"]}</h2>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["what"]) + "</div>")
    o.append(f'  <h2 class="fe-h2">{t["twoH"]}</h2>')
    o.append(f'''  <div class="kny-two">
    <section class="zc-box kny-card kny-cny"><p class="kny-tag">{t["start_when"]}</p><h3>{t["start_t"]}</h3><p>{t["start_p"]}</p></section>
    <section class="zc-box kny-card kny-kny"><p class="kny-tag">{t["end_when"]}</p><h3>{t["end_t"]}</h3><p>{t["end_p"]}</p></section>
  </div>''')
    o.append(f'  <h2 class="fe-h2">{t["leapH"]}</h2>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["leap"]) + "</div>")
    o.append('  <div class="ad-slot">Ad space</div>')
    o.append(f'  <h2 class="fe-h2">{t["tableH"]}</h2>')
    rows = "".join(
        f'<tr{" class=\"vs-now\"" if r["y"] == 2026 else ""}><td>{r["y"]}{f"<span class=\"kny-an\">{t['leapTag']}</span>" if r.get("leap") else ""}</td>'
        f'<td>{dfmt(lang, r["starts"][0]["g"], year=False)}</td><td>{dfmt(lang, r["benLast"]["g"], year=False)}</td>'
        f'<td>{dfmt(lang, r["end"]["g"], year=False)}</td><td>{dfmt(lang, r["kathinEnd"], year=False)}</td></tr>'
        for r in D)
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table kny-table vs-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["th"])}</tr></thead><tbody>{rows}</tbody></table></div>')
    o.append(f'  <p class="kny-note">{t["tableNote"]}</p>')
    o.append(f'  <h2 class="fe-h2">{t["doH"]}</h2>')
    o.append('  <ol class="kny-days vs-do">' + "".join(f'<li class="zc-box"><span class="kny-day">{w}</span><h3>{n}</h3><p>{p}</p></li>' for w, n, p in t["do"]) + "</ol>")
    o.append(f'  <h2 class="fe-h2">{t["planH"]}</h2>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["plan"]) + "</div>")
    o.append(f'''  <section class="zc-box hc-calc kny-calc vs-calc" data-vs-calc data-lang="{lang}">
    <h2 class="zc-bh">{t["calcH"]}</h2>
    <p>{t["calcP"]}</p>
    <form class="hc-form" novalidate>
      <label for="vs-date-{lang}">{t["calcLabel"]}</label>
      <input id="vs-date-{lang}" type="date" min="1900-01-01" max="2059-12-31" required>
      <button type="submit" class="fe-btn">{t["calcBtn"]}</button>
    </form>
    <div class="kny-out vs-out" aria-live="polite" hidden></div>
  </section>''')
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
/* Is a date inside Vassa? Same rules as the table, computed with js/vendor/momentkh.min.js. Nothing is saved or sent. */
document.addEventListener("DOMContentLoaded", function () {
  var S = %S%;
  var ENM = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var KMM = ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
  var MEN = ["Migasir","Boss","Meak","Phalkun","Chet","Pisak","Jesth","Asadh","Srap","Phatrabot","Assoch","Kadeuk","Pathamasadh (1st Asadh)","Tutiyasadh (2nd Asadh)"];
  function ord(n) { var s = ["th","st","nd","rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
  function west(t) { return String(t).replace(/[០-៩]/g, function (c) { return String(c.charCodeAt(0) - 0x17E0); }); }
  function fmt(lang, t) { var d = new Date(t); var y = d.getUTCFullYear(), m = d.getUTCMonth(), dd = d.getUTCDate();
    return lang === "zh" ? y + "年" + (m + 1) + "月" + dd + "日" : dd + " " + (lang === "km" ? KMM[m] : ENM[m]) + " " + y; }
  function season(M, y) {   /* start, Pchum Ben window, end and Kathin end of the Vassa that starts in year y */
    var r = {};
    for (var t = Date.UTC(y, 5, 1); t <= Date.UTC(y, 11, 31); t += 864e5) {
      var d = new Date(t), k = M.fromGregorian(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()).khmer, n = k.monthIndex, w = k.moonPhase === 1;
      if (w && k.day === 1 && (n === 7 || n === 13) && !r.s) r.s = t;
      if (w && n === 9) { if (k.day === 1) r.b0 = t; r.b1 = t; }
      if (!w && k.day === 15 && n === 10) r.e = t;
      if (!w && k.day === 15 && n === 11) r.k = t;
    }
    return r;
  }
  document.querySelectorAll("[data-vs-calc]").forEach(function (box) {
    var lang = box.getAttribute("data-lang"), s = S[lang] || S.en;
    var form = box.querySelector("form"), input = box.querySelector("input"), out = box.querySelector(".vs-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault(); out.hidden = false;
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.value || "");
      if (!m || +m[1] < 1900 || +m[1] > 2059 || !window.momentkh) { out.innerHTML = '<p class="hc-err">' + s.range + "</p>"; return; }
      var M = window.momentkh, y = +m[1], t = Date.UTC(y, +m[2] - 1, +m[3]), r = season(M, y), f = function (x) { return fmt(lang, x); };
      var res = M.fromGregorian(y, +m[2], +m[3]), k = res.khmer;
      var lunar = lang === "en" ? ord(k.day) + " " + (k.moonPhase ? "waning" : "waxing") + " day of " + MEN[k.monthIndex] + ", B.E. " + k.beYear : west(M.format(res));
      var day = 864e5, msg, extra = "", cls = "vs-out-out";
      if (t < r.s) msg = s.before.replace("{s}", f(r.s)).replace("{n}", Math.round((r.s - t) / day));
      else if (t <= r.e) { cls = "vs-out-in"; msg = s.inside.replace("{k}", Math.round((t - r.s) / day) + 1).replace("{n}", Math.round((r.e - r.s) / day) + 1).replace("{e}", f(r.e));
        if (t === r.s) extra = s.first; else if (t === r.e) extra = s.last; else if (t >= r.b0 && t <= r.b1) extra = s.ben; }
      else if (t <= r.k) { cls = "vs-out-kathin"; msg = s.kathin.replace("{k}", f(r.k)); }
      else msg = s.after.replace("{s}", y < 2059 ? f(season(M, y + 1).s) : "—");
      out.innerHTML = '<div class="vs-res ' + cls + '"><p class="vs-lunar"><span>' + s.lunar + '</span> <b' + (lang === "en" ? "" : ' lang="km"') + ">" + lunar + "</b></p>" +
        "<p class=\"vs-msg\">" + msg + (extra ? " " + extra : "") + '</p><p class="vs-season">' + s.season.replace("{y}", y).replace("{s}", f(r.s)).replace("{e}", f(r.e)) + "</p></div>";
    });
  });
});
</script>"""


def build():
    src = open(R + "blog/how-to-calculate-zodiac-sign.html").read()
    head, rest = src.split('<div data-lang-content="en">', 1)
    foot = rest[rest.index('<footer class="site-footer">'):]
    foot = foot[:foot.index('<script src="../js/zodiac-data.js" defer></script>') + len('<script src="../js/zodiac-data.js" defer></script>')] + "\n" + \
        CALC_JS.replace("%S%", json.dumps({l: T[l]["calc"] for l in T}, ensure_ascii=False)) + \
        '\n<script src="../js/khmer-lunar.js" defer></script>\n</body>\n</html>\n'
    t = T["en"]
    title = "Chol Vassa (Buddhist Lent) in Cambodia: 2026 Dates, Meaning and Traditions"
    desc = f"Chol Vassa 2026 began on {dfmt('en', S26)} and ends at Chenh Vassa on {dfmt('en', E26)}. Why the date moves, what families do during the rains retreat, a 2024–2030 table and a date checker."
    head = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)} | MyBirthSign</title>", head, flags=re.S)
    head = head.replace("https://mybirthsign.com/blog/how-to-calculate-zodiac-sign.html", URL)
    head = re.sub(r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + html.escape(title, quote=True), head)
    head = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = head.replace("https://mybirthsign.com/images/og/calculate-zodiac.jpg", OG)
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "headline": title, "description": desc, "image": OG,
         "datePublished": "2026-10-17", "dateModified": "2026-10-17", "inLanguage": "en", "author": {"@type": "Organization", "name": "MyBirthSign"},
         "publisher": {"@type": "Organization", "name": "MyBirthSign", "url": "https://mybirthsign.com/"}, "mainEntityOfPage": URL},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mybirthsign.com/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mybirthsign.com/blog"},
            {"@type": "ListItem", "position": 3, "name": "Chol Vassa (Buddhist Lent) in Cambodia"}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub("<[^>]+>", "", a)}} for q, a in t["faq"]]}]}
    head = re.sub(r'<script type="application/ld\+json">.*?</script>', lambda m: '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace("<", "\\u003c") + "</script>", head, flags=re.S)
    head = head.replace('href="../images/guides/khmer-lunar-wide.webp"', 'href="../images/fortune/hero-night.webp"')
    out = head + "\n".join(body(l) for l in ("en", "km", "zh")) + "\n\n" + foot
    open(R + f"blog/{SLUG}.html", "w").write(out)
    print("wrote", SLUG, len(out), "| 2026:", S26, E26, "ben", B26, "kathin", K26, "days", LEN26)

build()
