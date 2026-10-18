#!/usr/bin/env python3
"""Builds blog/khmer-leap-months.html (EN / KM / ZH).
Every leap year, month range and festival date on the page was computed with js/vendor/momentkh.min.js
(scratchpad leap.js / pb.js runs, 1990-2045). Month lengths: 29/30 alternating, Jesth 30 in a leap-day year,
Asadh repeated in a leap-month year. The year checker uses momentkh in the browser."""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from guide_common import *

SLUG = "khmer-leap-months"
MK = "https://github.com/ThyrithSor/momentkh"
WIKI_BE = "https://en.wikipedia.org/wiki/Buddhist_calendar"

# year -> ("m", 1st Asadh start, 1st end, 2nd start, 2nd end) or ("d", date of 15 waning Jesth)
LEAP = {2015: ("m", "2015-06-16", "2015-07-15", "2015-07-16", "2015-08-14"), 2016: ("d", "2016-07-04"), 2018: ("m", "2018-06-13", "2018-07-12", "2018-07-13", "2018-08-11"),
        2020: ("d", "2020-06-20"), 2021: ("m", "2021-06-10", "2021-07-09", "2021-07-10", "2021-08-08"), 2023: ("m", "2023-06-18", "2023-07-17", "2023-07-18", "2023-08-16"),
        2025: ("d", "2025-06-25"), 2026: ("m", "2026-06-15", "2026-07-14", "2026-07-15", "2026-08-13"), 2029: ("m", "2029-06-11", "2029-07-10", "2029-07-11", "2029-08-09"),
        2030: ("d", "2030-06-30"), 2031: ("m", "2031-06-20", "2031-07-19", "2031-07-20", "2031-08-18"), 2034: ("m", "2034-06-16", "2034-07-15", "2034-07-16", "2034-08-14"),
        2035: ("d", "2035-07-05"), 2037: ("m", "2037-06-13", "2037-07-12", "2037-07-13", "2037-08-11"), 2040: ("m", "2040-06-09", "2040-07-08", "2040-07-09", "2040-08-07")}
# Pchum Ben day (15 waning Phatrabot) and Chol Vassa, momentkh
FEST = [(2024, "2024-10-02", "2024-07-21"), (2025, "2025-09-22", "2025-07-11"), (2026, "2026-10-11", "2026-07-30"), (2027, "2027-09-30", "2027-07-19"), (2028, "2028-09-18", "2028-07-07"), (2029, "2029-10-07", "2029-07-26")]
MROM = ["Migasir", "Boss", "Meak", "Phalkun", "Chet", "Pisak", "Jesth", "Asadh", "Srap", "Phatrabot", "Assoch", "Kadeuk"]
MKM = ["មិគសិរ", "បុស្ស", "មាឃ", "ផល្គុន", "ចេត្រ", "ពិសាខ", "ជេស្ឋ", "អាសាឍ", "ស្រាពណ៍", "ភទ្របទ", "អស្សុជ", "កត្ដិក"]
DAYS = [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
LI = {"en": 0, "km": 1, "zh": 2}


def mname(lang, i): return MKM[i] if lang == "km" else MROM[i]


T = {}
T["en"] = dict(
  eyebrow="Khmer Culture &amp; Calendar", h1="Khmer Leap Months and Leap Days",
  sub="why some Khmer years have 384 days, and how that moves the festivals",
  lead="Twelve moons make only about 354 days, eleven short of a solar year. The Khmer calendar fixes this by sometimes adding one day and sometimes a whole second month of Asadh. 2026 is one of those leap-month years, and it is the reason Pchum Ben came so late this year.",
  meta='Published <time datetime="2026-10-18">October 18, 2026</time> · MyBirthSign', alt="Thirteen moon phases across a starry night sky",
  share=["2026: a leap-month year with two Asadh", "Next leap month: 2029"],
  typesH="Three kinds of Khmer year",
  types=[("Normal year · 354 days", "Twelve months that alternate between 29 and 30 days."),
         ("Leap-day year · 355 days", "Called Chantreathimeas. The month of Jesth gets 30 days instead of 29, keeping the months in step with the real moon."),
         ("Leap-month year · 384 days", "Called Athikameas. Asadh is repeated: Pathamasadh (1st Asadh) and Tutiyasadh (2nd Asadh), 30 days each, which keeps the festivals in their season.")],
  monthsH="The twelve months and their days", monthsP="The bars show one Khmer lunar year. Months alternate 29 and 30 days; the gold month is the one that changes in a leap year.",
  rowN="Normal · 354", rowD="Leap day · 355", rowM="Leap month · 384",
  whyH="Why the calendar needs leap months",
  why=["A month runs from one new moon to the next, about 29½ days. Twelve of them come to about 354 days, but the sun takes about 365¼ days to bring the seasons round. Without a correction, Khmer months would drift eleven days earlier every year and, after about 16 years, Pchum Ben would fall in the hot season.",
       "Adding a 30-day month every two or three years pulls the calendar back. Over 19 solar years the gap adds up to almost exactly seven months, because 19 solar years and 235 lunar months (19 × 12 + 7) are both about 6,940 days. In every 19-year stretch from 1990 to 2045, the calendar rules give exactly seven leap-month years.",
       "The leap day does a smaller job. A lunar month is a little longer than 29½ days, so a 354-day year runs about a third of a day short of twelve real moons. Every few years Jesth gets a 30th day to make that up."],
  y26H="2026: a year with two Asadh",
  y26=["In 2026 the first Asadh ran from 15 June to 14 July and the second Asadh from 15 July to 13 August. The rains retreat follows the second Asadh in a leap-month year, so Chol Vassa came on 30 July 2026, nineteen days later than in 2025.",
       "Everything after it moved too: Pchum Ben day was 22 September in 2025, 11 October in 2026, and the calendar rules give 30 September for 2027. Read more in our guide to <a href=\"chol-vassa-buddhist-lent.html\">Chol Vassa</a>."],
  festTh=["Year", "Leap", "Chol Vassa", "Pchum Ben day"], lm="Leap month", ld="Leap day", nn="—",
  listH="Leap years from 2015 to 2040", listTh=["Year", "Type", "Extra time"],
  m2="2nd Asadh: {a} – {b}", d2="Jesth has 30 days (15th waning day: {a})",
  listNote="Calculated with the traditional Khmer calendar rules. In these years a leap day and a leap month never fall in the same year. Years not listed are normal 354-day years.",
  calcH="Is a year a Khmer leap year?", calcP="Enter a year from 1900 to 2059. The checker looks through that year with the Khmer calendar rules and shows whether it has an extra month, an extra day, or neither.",
  calcL="Year", calcB="Check the year",
  faqH="Frequently Asked Questions",
  faq=[("What is Athikameas?", "Athikameas is a Khmer leap-month year. The month of Asadh is repeated, as Pathamasadh (1st Asadh) and Tutiyasadh (2nd Asadh), so the year has 13 months and 384 days."),
       ("What is Chantreathimeas?", "Chantreathimeas is a Khmer leap-day year: the month of Jesth has 30 days instead of 29, and the year has 355 days."),
       ("Is 2026 a leap year in the Khmer calendar?", "Yes. 2026 has a leap month: the second Asadh ran from 15 July to 13 August 2026."),
       ("Is 2027 a Khmer leap year?", "No. The calendar rules give 2027 as a normal year, with one Asadh from 4 July to 2 August. The next leap month comes in 2029."),
       ("Why was Pchum Ben so late in 2026?", "Because of the second Asadh. Every month after it was pushed back by 30 days compared with a normal year, so Pchum Ben came on 11 October instead of in September."),
       ("Why is the extra month always Asadh?", "That is the rule of the traditional Khmer calendar: in a leap-month year Asadh is the month that repeats, and the rains retreat, Chol Vassa, then begins after the second Asadh."),
       ("How do I find whether my birth year had a leap month?", "Enter it in the checker above. The <a href=\"../khmer-calendar.html\">Khmer Calendar</a> shows the months of any year, including 1st and 2nd Asadh.")],
  next='Read next: <a href="khmer-lunar-calendar-birth-date.html">how the Khmer lunar calendar counts days</a>, <a href="khmer-animal-year-sak.html">Khmer animal year and Sak</a>, or <a href="cambodian-public-holidays.html">Cambodian public holidays 2026</a>.',
  disc="For cultural interest. Leap years are calculated with the traditional Khmer calendar rules; a national or pagoda calendar is the final word for ceremonies.",
  srcH="Sources", src=[f'All leap years, month ranges and festival dates: traditional Khmer calendar rules in the open-source <a href="{MK}" rel="noopener" target="_blank">momentkh</a> library.',
                      f'Seven extra months in every 19 years in the Buddhist lunisolar calendars: <a href="{WIKI_BE}" rel="noopener" target="_blank">Wikipedia, “Buddhist calendar”</a>.'],
  js=dict(range="Please enter a year from 1900 to 2059.", m="{y} is a leap-month year (Athikameas, 384 days). 1st Asadh: {a} – {b}. 2nd Asadh: {c} – {d}.",
          d="{y} is a leap-day year (Chantreathimeas, 355 days). Jesth has 30 days; its last day is {a}.", n="{y} is a normal year (354 days). Asadh runs from {a} to {b}.",
          next="Next leap month after {y}: {n}."),
)
T["km"] = dict(
  eyebrow="វប្បធម៌ និងប្រតិទិនខ្មែរ", h1="អធិកមាស និងចន្ទ្រាធិមាស ក្នុងប្រតិទិនខ្មែរ",
  sub="ហេតុអ្វីឆ្នាំខ្មែរខ្លះមាន 384 ថ្ងៃ និងរបៀបដែលវាធ្វើឱ្យបុណ្យទានផ្លាស់ទី",
  lead="ព្រះចន្ទដប់ពីរដងមានត្រឹមប្រហែល 354 ថ្ងៃ ខ្វះ 11 ថ្ងៃធៀបនឹងឆ្នាំសុរិយគតិ។ ប្រតិទិនខ្មែរដោះស្រាយដោយបន្ថែមមួយថ្ងៃ ឬបន្ថែមខែអាសាឍទីពីរទាំងមូល នៅឆ្នាំខ្លះ។ ឆ្នាំ 2026 ជាឆ្នាំអធិកមាស ហើយនោះជាមូលហេតុដែលភ្ជុំបិណ្ឌឆ្នាំនេះមកយឺត។",
  meta='ចុះផ្សាយ <time datetime="2026-10-18">ថ្ងៃទី18 ខែតុលា ឆ្នាំ2026</time> · MyBirthSign', alt="ដំណាក់កាលព្រះចន្ទដប់បីនៅលើមេឃពោរពេញដោយផ្កាយ",
  share=["2026៖ ឆ្នាំអធិកមាស មានអាសាឍពីរ", "អធិកមាសបន្ទាប់៖ 2029"],
  typesH="ឆ្នាំខ្មែរបីប្រភេទ",
  types=[("ឆ្នាំធម្មតា · 354 ថ្ងៃ", "ដប់ពីរខែ ឆ្លាស់គ្នារវាង 29 និង 30 ថ្ងៃ។"),
         ("ចន្ទ្រាធិមាស · 355 ថ្ងៃ", "ខែជេស្ឋមាន 30 ថ្ងៃ ជំនួសឱ្យ 29 ថ្ងៃ ដើម្បីឱ្យខែនៅត្រូវនឹងព្រះចន្ទពិត។"),
         ("អធិកមាស · 384 ថ្ងៃ", "ខែអាសាឍមានពីរដង៖ បឋមាសាឍ និងទុតិយាសាឍ ម្នាក់ៗ 30 ថ្ងៃ ដើម្បីឱ្យបុណ្យទាននៅក្នុងរដូវរបស់វា។")],
  monthsH="ខែទាំងដប់ពីរ និងចំនួនថ្ងៃ", monthsP="របារទាំងនេះបង្ហាញឆ្នាំចន្ទគតិខ្មែរមួយ។ ខែឆ្លាស់គ្នា 29 និង 30 ថ្ងៃ ខែពណ៌មាសគឺខែដែលប្រែប្រួលក្នុងឆ្នាំបន្ថែម។",
  rowN="ធម្មតា · 354", rowD="ចន្ទ្រាធិមាស · 355", rowM="អធិកមាស · 384",
  whyH="ហេតុអ្វីប្រតិទិនត្រូវការអធិកមាស",
  why=["ខែមួយចាប់ពីព្រះចន្ទងងឹតមួយ ដល់ព្រះចន្ទងងឹតបន្ទាប់ ប្រហែល 29 ថ្ងៃកន្លះ។ ដប់ពីរខែស្មើនឹងប្រហែល 354 ថ្ងៃ ប៉ុន្តែព្រះអាទិត្យត្រូវការប្រហែល 365 ថ្ងៃកន្លះ ទើបរដូវវិលមកវិញ។ បើគ្មានការកែតម្រូវ ខែខ្មែរនឹងរំកិលមុន 11 ថ្ងៃរៀងរាល់ឆ្នាំ ហើយក្រោយប្រហែល 16 ឆ្នាំ ភ្ជុំបិណ្ឌនឹងធ្លាក់ក្នុងរដូវក្តៅ។",
       "ការបន្ថែមខែ 30 ថ្ងៃ រៀងរាល់ពីរ ឬបីឆ្នាំម្តង ទាញប្រតិទិនមកវិញ។ ក្នុងរយៈពេល 19 ឆ្នាំសុរិយគតិ គម្លាតនេះកើនដល់ស្ទើរតែប្រាំពីរខែពិតប្រាកដ ព្រោះ 19 ឆ្នាំសុរិយគតិ និង 235 ខែចន្ទគតិ (19 × 12 + 7) មានប្រហែល 6,940 ថ្ងៃដូចគ្នា។ ក្នុងរយៈពេល 19 ឆ្នាំណាមួយពីឆ្នាំ 1990 ដល់ 2045 វិធានប្រតិទិនផ្តល់ឆ្នាំអធិកមាសប្រាំពីរឆ្នាំគត់។",
       "ថ្ងៃបន្ថែមធ្វើការងារតូចជាង។ ខែចន្ទគតិមួយវែងជាង 29 ថ្ងៃកន្លះបន្តិច ដូច្នេះឆ្នាំ 354 ថ្ងៃ ខ្លីជាងព្រះចន្ទពិតដប់ពីរដងប្រហែលមួយភាគបីថ្ងៃ។ រៀងរាល់ពីរបីឆ្នាំម្តង ខែជេស្ឋទទួលបានថ្ងៃទី 30 ដើម្បីបំពេញ។"],
  y26H="ឆ្នាំ 2026៖ ឆ្នាំដែលមានអាសាឍពីរ",
  y26=["ក្នុងឆ្នាំ 2026 បឋមាសាឍចាប់ពីថ្ងៃ 15 មិថុនា ដល់ 14 កក្កដា ហើយទុតិយាសាឍចាប់ពីថ្ងៃ 15 កក្កដា ដល់ 13 សីហា។ ក្នុងឆ្នាំអធិកមាស ការចូលព្រះវស្សាធ្វើតាមទុតិយាសាឍ ដូច្នេះចូលព្រះវស្សាឆ្នាំ 2026 ត្រូវនឹងថ្ងៃ 30 កក្កដា យឺតជាងឆ្នាំ 2025 ចំនួន 19 ថ្ងៃ។",
       "អ្វីៗបន្ទាប់ពីនោះក៏ផ្លាស់ទីដែរ៖ ថ្ងៃភ្ជុំបិណ្ឌគឺថ្ងៃ 22 កញ្ញា ក្នុងឆ្នាំ 2025 ថ្ងៃ 11 តុលា ក្នុងឆ្នាំ 2026 ហើយវិធានប្រតិទិនផ្តល់ថ្ងៃ 30 កញ្ញា សម្រាប់ឆ្នាំ 2027។ អានបន្ថែមក្នុងអត្ថបទ<a href=\"chol-vassa-buddhist-lent.html\">ចូលព្រះវស្សា</a>។"],
  festTh=["ឆ្នាំ", "បន្ថែម", "ចូលព្រះវស្សា", "ថ្ងៃភ្ជុំបិណ្ឌ"], lm="អធិកមាស", ld="ចន្ទ្រាធិមាស", nn="—",
  listH="ឆ្នាំបន្ថែម ពីឆ្នាំ 2015 ដល់ 2040", listTh=["ឆ្នាំ", "ប្រភេទ", "ពេលវេលាបន្ថែម"],
  m2="ទុតិយាសាឍ៖ {a} – {b}", d2="ខែជេស្ឋមាន 30 ថ្ងៃ (15រោច៖ {a})",
  listNote="គណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី។ ក្នុងឆ្នាំទាំងនេះ ចន្ទ្រាធិមាស និងអធិកមាស មិនដែលធ្លាក់ក្នុងឆ្នាំតែមួយទេ។ ឆ្នាំដែលមិនមានក្នុងបញ្ជី ជាឆ្នាំធម្មតា 354 ថ្ងៃ។",
  calcH="តើឆ្នាំណាមួយជាឆ្នាំបន្ថែមឬទេ?", calcP="បញ្ចូលឆ្នាំពី 1900 ដល់ 2059។ ម៉ាស៊ីនពិនិត្យនឹងមើលឆ្នាំនោះតាមវិធានប្រតិទិនខ្មែរ ហើយបង្ហាញថាវាមានខែបន្ថែម ថ្ងៃបន្ថែម ឬគ្មាន។",
  calcL="ឆ្នាំ", calcB="ពិនិត្យឆ្នាំ",
  faqH="សំណួរដែលសួរញឹកញាប់",
  faq=[("តើអធិកមាសជាអ្វី?", "អធិកមាសជាឆ្នាំខ្មែរដែលមានខែបន្ថែម។ ខែអាសាឍមានពីរដង គឺបឋមាសាឍ និងទុតិយាសាឍ ដូច្នេះឆ្នាំនោះមាន 13 ខែ និង 384 ថ្ងៃ។"),
       ("តើចន្ទ្រាធិមាសជាអ្វី?", "ចន្ទ្រាធិមាសជាឆ្នាំខ្មែរដែលមានថ្ងៃបន្ថែម៖ ខែជេស្ឋមាន 30 ថ្ងៃ ជំនួសឱ្យ 29 ថ្ងៃ ហើយឆ្នាំនោះមាន 355 ថ្ងៃ។"),
       ("តើឆ្នាំ 2026 ជាឆ្នាំបន្ថែមក្នុងប្រតិទិនខ្មែរឬទេ?", "បាទ/ចាស។ ឆ្នាំ 2026 មានអធិកមាស៖ ទុតិយាសាឍចាប់ពីថ្ងៃ 15 កក្កដា ដល់ 13 សីហា 2026។"),
       ("តើឆ្នាំ 2027 ជាឆ្នាំបន្ថែមឬទេ?", "ទេ។ វិធានប្រតិទិនផ្តល់ឆ្នាំ 2027 ជាឆ្នាំធម្មតា មានខែអាសាឍមួយ ពីថ្ងៃ 4 កក្កដា ដល់ 2 សីហា។ អធិកមាសបន្ទាប់នៅឆ្នាំ 2029។"),
       ("ហេតុអ្វីភ្ជុំបិណ្ឌយឺតម្ល៉េះក្នុងឆ្នាំ 2026?", "ដោយសារទុតិយាសាឍ។ ខែទាំងអស់បន្ទាប់ពីវា ត្រូវរុញក្រោយ 30 ថ្ងៃ ធៀបនឹងឆ្នាំធម្មតា ដូច្នេះភ្ជុំបិណ្ឌមកដល់ថ្ងៃ 11 តុលា ជំនួសឱ្យខែកញ្ញា។"),
       ("ហេតុអ្វីខែបន្ថែមតែងតែជាអាសាឍ?", "នោះជាវិធាននៃប្រតិទិនខ្មែរបែបប្រពៃណី៖ ក្នុងឆ្នាំអធិកមាស ខែអាសាឍជាខែដែលមានពីរដង ហើយការចូលព្រះវស្សាចាប់ផ្តើមក្រោយទុតិយាសាឍ។"),
       ("តើខ្ញុំដឹងដោយរបៀបណាថាឆ្នាំកំណើតខ្ញុំមានអធិកមាស?", "បញ្ចូលវាក្នុងម៉ាស៊ីនពិនិត្យខាងលើ។ <a href=\"../khmer-calendar.html\">ប្រតិទិនខ្មែរ</a>បង្ហាញខែនៃឆ្នាំណាមួយ រួមទាំងបឋមាសាឍ និងទុតិយាសាឍ។")],
  next='អានបន្ត៖ <a href="khmer-lunar-calendar-birth-date.html">របៀបដែលប្រតិទិនចន្ទគតិខ្មែររាប់ថ្ងៃ</a> <a href="khmer-animal-year-sak.html">ឆ្នាំសត្វ និងស័ក</a> ឬ<a href="cambodian-public-holidays.html">ថ្ងៃឈប់សម្រាកផ្លូវការឆ្នាំ 2026</a>។',
  disc="សម្រាប់ចំណេះដឹងវប្បធម៌។ ឆ្នាំបន្ថែមគណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី ប្រតិទិនជាតិ ឬប្រតិទិនវត្ត ជាសេចក្តីសម្រេចចុងក្រោយសម្រាប់ពិធីបុណ្យ។",
  srcH="ប្រភព", src=[f'ឆ្នាំបន្ថែម រយៈពេលខែ និងកាលបរិច្ឆេទបុណ្យទាំងអស់៖ វិធានប្រតិទិនខ្មែរ ក្នុងបណ្ណាល័យកូដចំហ <a href="{MK}" rel="noopener" target="_blank">momentkh</a>។',
                   f'ខែបន្ថែមប្រាំពីរ ក្នុងរៀងរាល់ 19 ឆ្នាំ ក្នុងប្រតិទិនចន្ទគតិ-សុរិយគតិព្រះពុទ្ធសាសនា៖ <a href="{WIKI_BE}" rel="noopener" target="_blank">Wikipedia, “Buddhist calendar”</a>។'],
  js=dict(range="សូមបញ្ចូលឆ្នាំពី 1900 ដល់ 2059។", m="ឆ្នាំ {y} ជាឆ្នាំអធិកមាស (384 ថ្ងៃ)។ បឋមាសាឍ៖ {a} – {b}។ ទុតិយាសាឍ៖ {c} – {d}។",
          d="ឆ្នាំ {y} ជាឆ្នាំចន្ទ្រាធិមាស (355 ថ្ងៃ)។ ខែជេស្ឋមាន 30 ថ្ងៃ ថ្ងៃចុងក្រោយគឺ {a}។", n="ឆ្នាំ {y} ជាឆ្នាំធម្មតា (354 ថ្ងៃ)។ ខែអាសាឍចាប់ពី {a} ដល់ {b}។",
          next="អធិកមាសបន្ទាប់ក្រោយឆ្នាំ {y}៖ {n}។"),
)
T["zh"] = dict(
  eyebrow="高棉文化与历法", h1="高棉历的闰月与闰日",
  sub="为什么有些高棉年有384天，以及它如何让节日移动",
  lead="十二次月圆只有约354天，比一个太阳年少11天。高棉历的解决办法是在某些年份增加一天，或者增加整整一个第二 Asadh 月。2026年正是这样的闰月年，这也是今年亡人节来得这么晚的原因。",
  meta='发布于 <time datetime="2026-10-18">2026年10月18日</time> · MyBirthSign', alt="星空中排成一列的十三个月相",
  share=["2026年：有两个 Asadh 月的闰月年", "下一个闰月：2029年"],
  typesH="三种高棉年",
  types=[("平年 · 354天", "十二个月，在29天和30天之间交替。"),
         ("闰日年 · 355天", "称为 Chantreathimeas。Jesth 月有30天而不是29天，使月份与真实月相保持一致。"),
         ("闰月年 · 384天", "称为 Athikameas。Asadh 月重复一次：Pathamasadh（第一个 Asadh）和 Tutiyasadh（第二个 Asadh），各30天，使节日保持在应有的季节。")],
  monthsH="十二个月及其天数", monthsP="下面的条形图表示一个高棉农历年。月份在29天和30天之间交替；金色的月份就是闰年中会变化的月份。",
  rowN="平年 · 354", rowD="闰日 · 355", rowM="闰月 · 384",
  whyH="为什么历法需要闰月",
  why=["一个月从一次新月到下一次新月，约29天半。十二个月合计约354天，但太阳要约365又1/4天才让季节轮回一次。如果不加修正，高棉月份每年会提前11天，大约16年后亡人节就会落在热季。",
       "每两三年加一个30天的月，就能把历法拉回来。19个太阳年中，差距累积起来几乎正好是七个月，因为19个太阳年和235个朔望月（19 × 12 + 7）都约为6,940天。按历法规则，从1990年到2045年的任何连续19年里，都正好有七个闰月年。",
       "闰日的作用较小。一个朔望月比29天半略长，所以354天的一年比十二个真实月相少约三分之一天。每隔几年，Jesth 月就会多出第30天来补足。"],
  y26H="2026年：有两个 Asadh 月的一年",
  y26=["2026年，第一个 Asadh 月从6月15日到7月14日，第二个 Asadh 月从7月15日到8月13日。在闰月年，守夏安居跟随第二个 Asadh 月，所以2026年的入夏节在7月30日，比2025年晚了19天。",
       "之后的一切也随之推后：亡人节当天在2025年是9月22日，2026年是10月11日，按历法规则2027年是9月30日。详见我们的<a href=\"chol-vassa-buddhist-lent.html\">入夏节指南</a>。"],
  festTh=["年份", "闰", "入夏节", "亡人节当天"], lm="闰月", ld="闰日", nn="—",
  listH="2015–2040年的闰年", listTh=["年份", "类型", "增加的时间"],
  m2="第二个 Asadh：{a} – {b}", d2="Jesth 月有30天（下弦第15日：{a}）",
  listNote="按传统高棉历法规则计算。在这些年份中，闰日和闰月从未出现在同一年。未列出的年份都是354天的平年。",
  calcH="某一年是高棉闰年吗？", calcP="输入1900年至2059年之间的年份。查询工具会按高棉历法规则检查这一年，显示它是否有闰月、闰日，或两者都没有。",
  calcL="年份", calcB="查询年份",
  faqH="常见问题",
  faq=[("什么是 Athikameas？", "Athikameas 是高棉的闰月年。Asadh 月重复一次，分为 Pathamasadh（第一个 Asadh）和 Tutiyasadh（第二个 Asadh），所以这一年有13个月、384天。"),
       ("什么是 Chantreathimeas？", "Chantreathimeas 是高棉的闰日年：Jesth 月有30天而不是29天，全年355天。"),
       ("2026年是高棉历的闰年吗？", "是的。2026年有闰月：第二个 Asadh 月从2026年7月15日到8月13日。"),
       ("2027年是高棉闰年吗？", "不是。按历法规则，2027年是平年，只有一个 Asadh 月，从7月4日到8月2日。下一个闰月在2029年。"),
       ("为什么2026年的亡人节这么晚？", "因为有第二个 Asadh 月。与平年相比，它之后的每个月都推后了30天，所以亡人节在10月11日，而不是九月。"),
       ("为什么闰月总是 Asadh？", "这是传统高棉历法的规则：在闰月年，重复的月份就是 Asadh，而守夏安居（入夏节）在第二个 Asadh 月之后开始。"),
       ("怎样知道我的出生年份有没有闰月？", "在上面的查询工具中输入年份。<a href=\"../khmer-calendar.html\">高棉日历</a>可显示任何一年的月份，包括第一个和第二个 Asadh 月。")],
  next='延伸阅读：<a href="khmer-lunar-calendar-birth-date.html">高棉农历如何计算日子</a>、<a href="khmer-animal-year-sak.html">高棉生肖年与 Sak 纪年</a>，或<a href="cambodian-public-holidays.html">2026年柬埔寨公共假期</a>。',
  disc="仅供文化参考。闰年按传统高棉历法规则计算；举行仪式时请以国家或寺院的历书为准。",
  srcH="来源", src=[f'所有闰年、月份起止和节日日期：开源程序库 <a href="{MK}" rel="noopener" target="_blank">momentkh</a> 中的传统高棉历法规则。',
                  f'佛教阴阳历每19年加七个闰月：<a href="{WIKI_BE}" rel="noopener" target="_blank">Wikipedia, “Buddhist calendar”</a>。'],
  js=dict(range="请输入1900年至2059年之间的年份。", m="{y}年是闰月年（Athikameas，384天）。第一个 Asadh：{a} – {b}。第二个 Asadh：{c} – {d}。",
          d="{y}年是闰日年（Chantreathimeas，355天）。Jesth 月有30天，最后一天是{a}。", n="{y}年是平年（354天）。Asadh 月从{a}到{b}。",
          next="{y}年之后的下一个闰月年：{n}年。"),
)


def bars(lang, t):
    def row(label, kind):
        cells = []
        for i in range(12):
            d = DAYS[i]; gold = ""
            if kind == "d" and i == 6: d, gold = 30, " lm-gold"
            if kind == "m" and i == 7:
                cells.append(f'<span class="lm-m lm-gold" style="flex:30"><b>{mname(lang, 7)} 1</b><small>30</small></span>')
                cells.append(f'<span class="lm-m lm-gold" style="flex:30"><b>{mname(lang, 7)} 2</b><small>30</small></span>'); continue
            cells.append(f'<span class="lm-m{gold}" style="flex:{d}"><b>{mname(lang, i)}</b><small>{d}</small></span>')
        return f'<div class="lm-row"><p class="lm-lab">{label}</p><div class="lm-bar">{"".join(cells)}</div></div>'
    return '  <div class="lm-bars" role="img" aria-label="' + html.escape(t["monthsP"]) + '">' + row(t["rowN"], "n") + row(t["rowD"], "d") + row(t["rowM"], "m") + "</div>"


def body(lang):
    t = T[lang]; o = []
    o.append(hero(t, "khmer-leap-months-hero.webp", t["alt"]))
    o.append(share(t, lang, SLUG, t["share"]))
    o.append(h2(t["typesH"]))
    o.append('  <ul class="hd-kinds ph-kinds">' + "".join(f'<li class="hd-k hd-k-{c}"><span class="hd-dot" aria-hidden="true"></span><div><b>{a}</b><p>{b}</p></div></li>' for (a, b), c in zip(t["types"], ["sil", "moon", "fest"])) + "</ul>")
    o.append(h2(t["monthsH"])); o.append(text([t["monthsP"]])); o.append(bars(lang, t))
    o.append('  <div class="ad-slot">Ad space</div>')
    o.append(h2(t["whyH"])); o.append(text(t["why"]))
    o.append(h2(t["y26H"])); o.append(text(t["y26"]))
    fr = []
    for y, pb, cv in FEST:
        k = LEAP.get(y, (None,))[0]
        fr.append(f'<tr{" class=\"ys-now\"" if y == 2026 else ""}><td><b>{y}</b></td><td>{t["lm"] if k == "m" else t["ld"] if k == "d" else t["nn"]}</td><td>{dfmt(lang, cv, False)}</td><td>{dfmt(lang, pb, False)}</td></tr>')
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table kny-table ys-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["festTh"])}</tr></thead><tbody>{"".join(fr)}</tbody></table></div>')
    o.append(h2(t["listH"]))
    lr = []
    for y in sorted(LEAP):
        v = LEAP[y]
        extra = t["m2"].format(a=dfmt(lang, v[3], False), b=dfmt(lang, v[4], False)) if v[0] == "m" else t["d2"].format(a=dfmt(lang, v[1], False))
        lr.append(f'<tr{" class=\"ys-now\"" if y == 2026 else ""}><td><b>{y}</b></td><td>{t["lm"] if v[0] == "m" else t["ld"]}</td><td>{extra}</td></tr>')
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table kny-table ys-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["listTh"])}</tr></thead><tbody>{"".join(lr)}</tbody></table></div>')
    o.append(f'  <p class="kny-note">{t["listNote"]}</p>')
    o.append(f'''  <section class="zc-box hc-calc kny-calc vs-calc" data-lm-calc data-lang="{lang}">
    <h2 class="zc-bh">{t["calcH"]}</h2>
    <p>{t["calcP"]}</p>
    <form class="hc-form" novalidate>
      <label for="lm-year-{lang}">{t["calcL"]}</label>
      <input id="lm-year-{lang}" type="number" inputmode="numeric" min="1900" max="2059" step="1" value="2026" required>
      <button type="submit" class="fe-btn">{t["calcB"]}</button>
    </form>
    <div class="kny-out lm-res-box" aria-live="polite" hidden></div>
  </section>''')
    o.append(h2(t["faqH"])); o.append(faq(t["faq"]))
    o.append(f'  <div class="fe-text"><p>{t["next"]}</p></div>')
    o.append(f'  <p class="disclaimer">{t["disc"]}</p>'); o.append(sources(t))
    return "\n".join(o)


S = {l: T[l]["js"] for l in T}
CALC_JS = r"""<script src="../js/vendor/momentkh.min.js" defer></script>
<script>
/* Does a Gregorian year hold a Khmer leap month (2nd Asadh) or leap day (30-day Jesth)? Computed with js/vendor/momentkh.min.js. */
document.addEventListener("DOMContentLoaded", function () {
  var S = %S%, DAY = 864e5;
  var ENM = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var KMM = ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
  function fmt(lang, t) { var d = new Date(t), m = d.getUTCMonth(), dd = d.getUTCDate();
    return lang === "zh" ? (m + 1) + "月" + dd + "日" : dd + " " + (lang === "km" ? KMM[m] : ENM[m]); }
  function scan(M, y) {   /* Asadh months and Jesth sit in May-August */
    var r = {};
    for (var t = Date.UTC(y, 4, 1); t <= Date.UTC(y, 8, 30); t += DAY) {
      var d = new Date(t), k = M.fromGregorian(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()).khmer, n = k.monthIndex;
      if (n === 12) { r.a = r.a || t; r.b = t; }
      if (n === 13) { r.c = r.c || t; r.d = t; }
      if (n === 7) { r.a = r.a || t; r.b = t; }
      if (n === 6 && k.moonPhase === 1 && k.day === 15) r.j = t;
    }
    r.type = r.c ? "m" : r.j ? "d" : "n";
    return r;
  }
  document.querySelectorAll("[data-lm-calc]").forEach(function (box) {
    var lang = box.getAttribute("data-lang"), s = S[lang] || S.en;
    var form = box.querySelector("form"), input = box.querySelector("input"), out = box.querySelector(".lm-res-box");
    form.addEventListener("submit", function (e) {
      e.preventDefault(); out.hidden = false;
      var y = parseInt(input.value, 10);
      if (!(y >= 1900 && y <= 2059) || !window.momentkh) { out.innerHTML = '<p class="hc-err">' + s.range + "</p>"; return; }
      var M = window.momentkh, r = scan(M, y), f = function (x) { return fmt(lang, x); }, msg;
      if (r.type === "m") msg = s.m.replace("{a}", f(r.a)).replace("{b}", f(r.b)).replace("{c}", f(r.c)).replace("{d}", f(r.d));
      else if (r.type === "d") msg = s.d.replace("{a}", f(r.j));
      else msg = s.n.replace("{a}", f(r.a)).replace("{b}", f(r.b));
      var nx = "";
      for (var z = y + 1; z <= 2060; z++) if (scan(M, z).type === "m") { nx = s.next.replace("{y}", y).replace("{n}", z); break; }
      out.innerHTML = '<div class="vs-res ' + (r.type === "m" ? "vs-out-in" : r.type === "d" ? "vs-out-kathin" : "vs-out-out") + '"><p class="vs-msg">' + msg.replace(/\{y\}/g, y) + "</p>" +
        (nx ? '<p class="vs-season">' + nx + "</p>" : "") + "</div>";
    });
  });
});
</script>""".replace("%S%", json.dumps(S, ensure_ascii=False))

build_page(SLUG, "Khmer Leap Months and Leap Days: Why Some Years Have 384 Days",
           "How the Khmer lunar calendar adds a second Asadh (Athikameas) or a 30th day of Jesth (Chantreathimeas), why 2026 had two Asadh months, the leap years 2015–2040 and a year checker.",
           f"https://mybirthsign.com/images/og/{SLUG}.jpg", {l: body(l) for l in T}, T["en"]["faq"], "khmer-leap-months-hero.webp", extra_js=CALC_JS, crumb="Khmer leap months")
