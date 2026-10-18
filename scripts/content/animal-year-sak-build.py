#!/usr/bin/env python3
"""Builds blog/khmer-animal-year-sak.html (EN / KM / ZH).
Every year name, Sak, Buddhist Era and Chula Sakarat number on the page was computed with js/vendor/momentkh.min.js
(after the 1 waning Pisak fix): animal = (year - 2020) % 12 from Khmer New Year, Sak = C.S. % 10 from Loeng Sak,
B.E. = year + 544 from the 1st waning day of Pisak, C.S. = year - 638 from Loeng Sak. The checker uses momentkh in the browser."""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from guide_common import *

SLUG = "khmer-animal-year-sak"
WIKI_CS = "https://en.wikipedia.org/wiki/Chula_Sakarat"
WIKI_BE = "https://en.wikipedia.org/wiki/Buddhist_calendar"
MK = "https://github.com/ThyrithSor/momentkh"

AEN = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
AROM = ["Choot", "Chlov", "Khal", "Thos", "Rong", "Msanh", "Momee", "Momae", "Vok", "Roka", "Cho", "Kor"]
AKM = ["ជូត", "ឆ្លូវ", "ខាល", "ថោះ", "រោង", "ម្សាញ់", "មមី", "មមែ", "វក", "រកា", "ច", "កុរ"]
AZH = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
SROM = ["Samrithisak", "Ekasak", "Tosak", "Treisak", "Chattvasak", "Panchasak", "Chhasak", "Saptasak", "Atthasak", "Noppasak"]
SKM = ["សំរឹទ្ធិស័ក", "ឯកស័ក", "ទោស័ក", "ត្រីស័ក", "ចត្វាស័ក", "បញ្ចស័ក", "ឆស័ក", "សប្តស័ក", "អដ្ឋស័ក", "នព្វស័ក"]
LI = {"en": 0, "km": 1, "zh": 2}


def aname(lang, a):
    return {"en": f"{AEN[a]} ({AROM[a]})", "km": f"ឆ្នាំ{AKM[a]}", "zh": f"{AZH[a]}年（{AROM[a]}）"}[lang]


def sname(lang, s): return SKM[s] if lang == "km" else SROM[s]


T = {}
T["en"] = dict(
  eyebrow="Khmer Culture &amp; Calendar", h1="Khmer Animal Year and Sak",
  sub="how a Khmer year gets its full name: animal, Sak, Buddhist Era and Chula Sakarat",
  lead="A Khmer date often ends with a year name such as “Year of the Horse, Atthasak, B.E. 2570”. That one line holds four different year counts, and each changes on a different day. This guide explains all four, the ten Sak, and the year names from 2024 to 2035.",
  meta='Published <time datetime="2026-10-18">October 18, 2026</time> · MyBirthSign', alt="A horse in front of a golden zodiac wheel under the night sky",
  partsH="Four counts in one year name",
  parts=[("Animal · 12-year cycle", "One of the twelve animals, from Choot (Rat) to Kor (Pig). It changes at Moha Songkran, the start of Khmer New Year in mid-April. Printed calendars usually show the new animal from the second day."),
         ("Sak · 10-year cycle", "A number from one to ten, from Ekasak to Samrithisak. It moves up by one on Loeng Sak, the last day of Khmer New Year."),
         ("Buddhist Era (B.E.)", "Counts years from the Buddha's passing (parinibbana). In the Khmer calendar it changes on the 1st waning day of Pisak, the day after Visak Bochea."),
         ("Chula Sakarat (C.S.)", "The “Lesser Era”, whose year 0 began in 638 CE. It changes with the Sak on Loeng Sak, and its last digit gives the Sak.")],
  tlH="2026: three changes in three weeks", tlIntro="Here is how the year name of 2026 changed, day by day.",
  tl=[("2026-01-01", "Year of the Snake (Msanh), Saptasak, B.E. 2569, C.S. 1387. The Khmer year that began in April 2025 is still running."),
      ("2026-04-14", "Moha Songkran: Khmer New Year begins. The animal changes at the New Year moment."),
      ("2026-04-15", "Calendars now show the Year of the Horse (Momee)."),
      ("2026-04-16", "Loeng Sak: the Sak becomes Atthasak and the Chula Sakarat year 1388."),
      ("2026-05-02", "The day after Visak Bochea: the Buddhist Era becomes 2570.")],
  tlOut="From 2 May 2026 until Khmer New Year 2027 the full name is <b>Year of the Horse (Momee), Atthasak, B.E. 2570</b>.",
  sakH="The ten Sak", sakIntro="The Sak names are the numbers one to nine, plus Samrithisak for the tenth year that completes the cycle. Because the Sak moves with the Chula Sakarat year, the last digit of the C.S. year tells you the Sak.",
  sakTh=["No.", "Sak", "C.S. year ends in", "Years (from Loeng Sak)"],
  cycH="Why the same name returns every 60 years",
  cyc=["The animal and the Sak both move one step each year. Twelve animals and ten Sak line up again after 60 years, the smallest number that both 12 and 10 divide.",
       "So 2026 is a Horse year in Atthasak, and so were 1966 and, 60 years later, 2086. Only 60 of the 120 possible pairs ever occur: a Horse year is always an even Sak. The Chinese calendar also has a 60-year cycle, built from ten heavenly stems and twelve earthly branches, but the Sak is a Khmer count and is not the same as the Chinese stems or <a href=\"five-elements-explained.html\">five elements</a>."],
  tabH="Khmer year names, 2024–2035", tabTh=["Khmer year from April", "Animal", "Sak", "B.E. (from Visak)", "C.S. (from Loeng Sak)"],
  tabNote="Each row starts at Khmer New Year in that April. The B.E. number changes a few weeks later, on the 1st waning day of Pisak.",
  calcH="What was the Khmer year on a date?", calcP="Enter any date from 1900 to 2059 to see its animal, Sak, Buddhist Era and Chula Sakarat. It runs in your browser; nothing is saved or sent.",
  calcL="Date", calcB="Show the year name",
  faqH="Frequently Asked Questions",
  faq=[("What is Sak in the Khmer calendar?", "Sak is a ten-year count used next to the twelve animals. Each Khmer year has one, from Ekasak (first) to Samrithisak (tenth), and it moves up by one on Loeng Sak, the last day of Khmer New Year."),
       ("What Sak is 2026?", "Atthasak, the eighth Sak. It began on Loeng Sak, 16 April 2026, and lasts until Loeng Sak in April 2027, when Noppasak begins."),
       ("When does the Buddhist Era year change in Cambodia?", "On the 1st waning day of the month of Pisak, the day after Visak Bochea. It became B.E. 2570 on 2 May 2026, and the calendar rules give 21 May 2027 for B.E. 2571."),
       ("Why does Cambodia show B.E. 2570 when Thailand shows 2569?", "Thailand fixes its Buddhist Era at the Gregorian year plus 543 and starts it on 1 January. The Khmer calendar adds 544 after Visak Bochea and 543 before it."),
       ("Is the Khmer animal year the same as the Chinese zodiac animal?", "The animals are the same, but the Khmer year changes at Khmer New Year in April, while the Chinese year changes at Chinese New Year. Read <a href=\"khmer-new-year-animal-year.html\">when the Khmer animal year really changes</a>."),
       ("How do I find my own Khmer year name?", "Use the checker above with your birth date. For your full Khmer lunar birth date, try the <a href=\"../checker.html\">Zodiac Checker</a>.")],
  next='Read next: <a href="khmer-lunar-calendar-birth-date.html">how the Khmer lunar calendar counts days</a>, <a href="khmer-leap-months.html">Khmer leap months and leap days</a>, or open the <a href="../khmer-calendar.html">Khmer Calendar</a>.',
  disc="For cultural interest. Year names are calculated with traditional Khmer calendar rules; printed calendars may show the new animal a day later than the exact New Year moment.",
  srcH="Sources", src=[f'All year names, Sak and B.E./C.S. numbers: traditional Khmer calendar rules in the open-source <a href="{MK}" rel="noopener" target="_blank">momentkh</a> library.',
                      f'Chula Sakarat, the “Lesser Era” beginning in 638 CE: <a href="{WIKI_CS}" rel="noopener" target="_blank">Wikipedia, “Chula Sakarat”</a>.',
                      f'Buddhist Era counted from the parinibbana, and Thailand’s 543-year offset: <a href="{WIKI_BE}" rel="noopener" target="_blank">Wikipedia, “Buddhist calendar”</a>.'],
  js=dict(range="Please enter a date from 1900 to 2059.", lunar="Khmer date:", year="Year name:", animal="Animal", sak="Sak", be="Buddhist Era", cs="Chula Sakarat",
          ny="This date is in the Khmer New Year days, when the animal and the Sak change on different days.", cn="Before Khmer New Year: your Chinese zodiac animal may already be the next one."),
)
T["km"] = dict(
  eyebrow="វប្បធម៌ និងប្រតិទិនខ្មែរ", h1="ឆ្នាំសត្វ និងស័កក្នុងប្រតិទិនខ្មែរ",
  sub="របៀបដែលឆ្នាំខ្មែរមានឈ្មោះពេញ៖ ឆ្នាំសត្វ ស័ក ពុទ្ធសករាជ និងចុល្លសករាជ",
  lead="កាលបរិច្ឆេទខ្មែរតែងបញ្ចប់ដោយឈ្មោះឆ្នាំ ដូចជា «ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ 2570»។ ឃ្លាមួយនេះមានការរាប់ឆ្នាំបួនយ៉ាង ហើយនីមួយៗប្តូរនៅថ្ងៃខុសគ្នា។ អត្ថបទនេះពន្យល់ទាំងបួន ស័កទាំងដប់ និងឈ្មោះឆ្នាំពីឆ្នាំ 2024 ដល់ 2035។",
  meta='ចុះផ្សាយ <time datetime="2026-10-18">ថ្ងៃទី18 ខែតុលា ឆ្នាំ2026</time> · MyBirthSign', alt="សេះនៅមុខកង់រាសីពណ៌មាស ក្រោមមេឃពេលយប់",
  partsH="ការរាប់បួនយ៉ាង ក្នុងឈ្មោះឆ្នាំមួយ",
  parts=[("ឆ្នាំសត្វ · វដ្ត 12 ឆ្នាំ", "សត្វមួយក្នុងចំណោមសត្វទាំង 12 ពីជូត ដល់កុរ។ វាប្តូរនៅមហាសង្ក្រាន្ត ដែលជាការចាប់ផ្តើមចូលឆ្នាំខ្មែរ នៅពាក់កណ្តាលខែមេសា។ ប្រតិទិនបោះពុម្ពជាធម្មតាបង្ហាញសត្វថ្មីចាប់ពីថ្ងៃទីពីរ។"),
         ("ស័ក · វដ្ត 10 ឆ្នាំ", "លេខរៀងពីមួយដល់ដប់ ពីឯកស័ក ដល់សំរឹទ្ធិស័ក។ វាឡើងមួយលេខ នៅថ្ងៃឡើងស័ក ដែលជាថ្ងៃចុងក្រោយនៃចូលឆ្នាំខ្មែរ។"),
         ("ពុទ្ធសករាជ (ព.ស.)", "រាប់ឆ្នាំចាប់ពីព្រះពុទ្ធបរិនិព្វាន។ ក្នុងប្រតិទិនខ្មែរ វាប្តូរនៅថ្ងៃ 1រោច ខែពិសាខ គឺថ្ងៃបន្ទាប់ពីវិសាខបូជា។"),
         ("ចុល្លសករាជ (ច.ស.)", "«សករាជតូច» ដែលឆ្នាំទី 0 ចាប់ផ្តើមនៅគ.ស. 638។ វាប្តូរជាមួយស័ក នៅថ្ងៃឡើងស័ក ហើយលេខចុងក្រោយរបស់វាប្រាប់ពីស័ក។")],
  tlH="ឆ្នាំ 2026៖ ការប្តូរបីដង ក្នុងរយៈពេលបីសប្តាហ៍", tlIntro="នេះជារបៀបដែលឈ្មោះឆ្នាំ 2026 បានប្តូរ ពីមួយថ្ងៃទៅមួយថ្ងៃ។",
  tl=[("2026-01-01", "ឆ្នាំម្សាញ់ សប្តស័ក ព.ស. 2569 ច.ស. 1387។ ឆ្នាំខ្មែរដែលចាប់ផ្តើមខែមេសា 2025 នៅតែបន្ត។"),
      ("2026-04-14", "មហាសង្ក្រាន្ត៖ ចូលឆ្នាំខ្មែរចាប់ផ្តើម។ ឆ្នាំសត្វប្តូរនៅពេលចូលឆ្នាំ។"),
      ("2026-04-15", "ប្រតិទិនបង្ហាញឆ្នាំមមី។"),
      ("2026-04-16", "ថ្ងៃឡើងស័ក៖ ស័កក្លាយជាអដ្ឋស័ក ហើយចុល្លសករាជជា 1388។"),
      ("2026-05-02", "ថ្ងៃបន្ទាប់ពីវិសាខបូជា៖ ពុទ្ធសករាជក្លាយជា 2570។")],
  tlOut="ចាប់ពីថ្ងៃ 2 ឧសភា 2026 រហូតដល់ចូលឆ្នាំខ្មែរ 2027 ឈ្មោះពេញគឺ <b>ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ 2570</b>។",
  sakH="ស័កទាំងដប់", sakIntro="ឈ្មោះស័កគឺជាលេខមួយដល់ប្រាំបួន បូកនឹងសំរឹទ្ធិស័ក សម្រាប់ឆ្នាំទីដប់ដែលបញ្ចប់វដ្ត។ ដោយសារស័កប្តូរជាមួយឆ្នាំចុល្លសករាជ លេខចុងក្រោយនៃឆ្នាំ ច.ស. ប្រាប់អ្នកពីស័ក។",
  sakTh=["លេខ", "ស័ក", "ឆ្នាំ ច.ស. បញ្ចប់ដោយ", "ឆ្នាំ (ចាប់ពីថ្ងៃឡើងស័ក)"],
  cycH="ហេតុអ្វីឈ្មោះដដែលត្រឡប់មកវិញរៀងរាល់ 60 ឆ្នាំ",
  cyc=["ឆ្នាំសត្វ និងស័ក ទាំងពីរដើរមួយជំហានរៀងរាល់ឆ្នាំ។ សត្វ 12 និងស័ក 10 ត្រឡប់មកត្រូវគ្នាវិញក្រោយ 60 ឆ្នាំ ដែលជាលេខតូចបំផុតដែលចែកដាច់នឹង 12 និង 10។",
       "ដូច្នេះឆ្នាំ 2026 ជាឆ្នាំមមី អដ្ឋស័ក ហើយឆ្នាំ 1966 ក៏ដូច្នោះដែរ ហើយ 60 ឆ្នាំក្រោយគឺឆ្នាំ 2086។ ក្នុងចំណោមគូ 120 ដែលអាចមាន មានតែ 60 ប៉ុណ្ណោះដែលកើតឡើង៖ ឆ្នាំមមីតែងតែជាស័កលេខគូ។ ប្រតិទិនចិនក៏មានវដ្ត 60 ឆ្នាំដែរ ដែលកើតពីដើមមេឃ 10 និងមែកផែនដី 12 ប៉ុន្តែស័កជាការរាប់របស់ខ្មែរ មិនដូចដើមមេឃរបស់ចិន ឬ<a href=\"five-elements-explained.html\">ធាតុទាំងប្រាំ</a>ទេ។"],
  tabH="ឈ្មោះឆ្នាំខ្មែរ ពីឆ្នាំ 2024 ដល់ 2035", tabTh=["ឆ្នាំខ្មែរ ចាប់ពីខែមេសា", "ឆ្នាំសត្វ", "ស័ក", "ព.ស. (ចាប់ពីវិសាខ)", "ច.ស. (ចាប់ពីឡើងស័ក)"],
  tabNote="ជួរនីមួយៗចាប់ផ្តើមនៅចូលឆ្នាំខ្មែរ ខែមេសានៃឆ្នាំនោះ។ លេខ ព.ស. ប្តូរពីរបីសប្តាហ៍ក្រោយ នៅថ្ងៃ 1រោច ខែពិសាខ។",
  calcH="តើថ្ងៃណាមួយស្ថិតក្នុងឆ្នាំខ្មែរអ្វី?", calcP="បញ្ចូលកាលបរិច្ឆេទណាមួយពីឆ្នាំ 1900 ដល់ 2059 ដើម្បីមើលឆ្នាំសត្វ ស័ក ពុទ្ធសករាជ និងចុល្លសករាជ។ វាដំណើរការក្នុងកម្មវិធីរុករករបស់អ្នក គ្មានអ្វីត្រូវរក្សាទុក ឬផ្ញើចេញទេ។",
  calcL="កាលបរិច្ឆេទ", calcB="បង្ហាញឈ្មោះឆ្នាំ",
  faqH="សំណួរដែលសួរញឹកញាប់",
  faq=[("តើស័កក្នុងប្រតិទិនខ្មែរជាអ្វី?", "ស័កជាការរាប់ដប់ឆ្នាំ ដែលប្រើជាមួយសត្វទាំង 12។ ឆ្នាំខ្មែរនីមួយៗមានស័កមួយ ពីឯកស័ក (ទីមួយ) ដល់សំរឹទ្ធិស័ក (ទីដប់) ហើយវាឡើងមួយលេខនៅថ្ងៃឡើងស័ក ថ្ងៃចុងក្រោយនៃចូលឆ្នាំខ្មែរ។"),
       ("តើឆ្នាំ 2026 ជាស័កអ្វី?", "អដ្ឋស័ក ស័កទីប្រាំបី។ វាចាប់ផ្តើមនៅថ្ងៃឡើងស័ក 16 មេសា 2026 ហើយបន្តរហូតដល់ថ្ងៃឡើងស័កខែមេសា 2027 ពេលនព្វស័កចាប់ផ្តើម។"),
       ("តើឆ្នាំពុទ្ធសករាជប្តូរនៅពេលណានៅកម្ពុជា?", "នៅថ្ងៃ 1រោច ខែពិសាខ គឺថ្ងៃបន្ទាប់ពីវិសាខបូជា។ វាក្លាយជា ព.ស. 2570 នៅថ្ងៃ 2 ឧសភា 2026 ហើយវិធានប្រតិទិនផ្តល់ថ្ងៃ 21 ឧសភា 2027 សម្រាប់ ព.ស. 2571។"),
       ("ហេតុអ្វីកម្ពុជាបង្ហាញ ព.ស. 2570 ពេលថៃបង្ហាញ 2569?", "ថៃកំណត់ពុទ្ធសករាជស្មើនឹងឆ្នាំសុរិយគតិ បូក 543 ហើយចាប់ផ្តើមនៅថ្ងៃ 1 មករា។ ប្រតិទិនខ្មែរបូក 544 ក្រោយវិសាខបូជា និង 543 មុនវិសាខបូជា។"),
       ("តើឆ្នាំសត្វខ្មែរដូចនឹងសត្វរាសីចិនឬទេ?", "សត្វដូចគ្នា ប៉ុន្តែឆ្នាំខ្មែរប្តូរនៅចូលឆ្នាំខ្មែរខែមេសា ចំណែកឆ្នាំចិនប្តូរនៅបុណ្យចូលឆ្នាំចិន។ សូមអាន<a href=\"khmer-new-year-animal-year.html\">ពេលដែលឆ្នាំសត្វខ្មែរពិតជាប្តូរ</a>។"),
       ("តើខ្ញុំរកឈ្មោះឆ្នាំខ្មែររបស់ខ្ញុំដោយរបៀបណា?", "ប្រើម៉ាស៊ីនពិនិត្យខាងលើជាមួយថ្ងៃកំណើតរបស់អ្នក។ សម្រាប់ថ្ងៃខែកំណើតតាមចន្ទគតិពេញលេញ សាកល្បង<a href=\"../checker.html\">ម៉ាស៊ីនពិនិត្យរាសី</a>។")],
  next='អានបន្ត៖ <a href="khmer-lunar-calendar-birth-date.html">របៀបដែលប្រតិទិនចន្ទគតិខ្មែររាប់ថ្ងៃ</a> <a href="khmer-leap-months.html">អធិកមាស និងចន្ទ្រាធិមាស</a> ឬបើក<a href="../khmer-calendar.html">ប្រតិទិនខ្មែរ</a>។',
  disc="សម្រាប់ចំណេះដឹងវប្បធម៌។ ឈ្មោះឆ្នាំគណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី ប្រតិទិនបោះពុម្ពអាចបង្ហាញសត្វថ្មីយឺតមួយថ្ងៃ ធៀបនឹងពេលចូលឆ្នាំពិតប្រាកដ។",
  srcH="ប្រភព", src=[f'ឈ្មោះឆ្នាំ ស័ក និងលេខ ព.ស./ច.ស. ទាំងអស់៖ វិធានប្រតិទិនខ្មែរ ក្នុងបណ្ណាល័យកូដចំហ <a href="{MK}" rel="noopener" target="_blank">momentkh</a>។',
                   f'ចុល្លសករាជ «សករាជតូច» ចាប់ផ្តើមនៅគ.ស. 638៖ <a href="{WIKI_CS}" rel="noopener" target="_blank">Wikipedia, “Chula Sakarat”</a>។',
                   f'ពុទ្ធសករាជរាប់ពីព្រះពុទ្ធបរិនិព្វាន និងការបូក 543 របស់ថៃ៖ <a href="{WIKI_BE}" rel="noopener" target="_blank">Wikipedia, “Buddhist calendar”</a>។'],
  js=dict(range="សូមបញ្ចូលកាលបរិច្ឆេទពីឆ្នាំ 1900 ដល់ 2059។", lunar="ថ្ងៃខែខ្មែរ៖", year="ឈ្មោះឆ្នាំ៖", animal="ឆ្នាំសត្វ", sak="ស័ក", be="ពុទ្ធសករាជ", cs="ចុល្លសករាជ",
          ny="ថ្ងៃនេះស្ថិតក្នុងថ្ងៃចូលឆ្នាំខ្មែរ ពេលដែលឆ្នាំសត្វ និងស័កប្តូរនៅថ្ងៃខុសគ្នា។", cn="មុនចូលឆ្នាំខ្មែរ៖ សត្វរាសីចិនរបស់អ្នកប្រហែលជាសត្វបន្ទាប់រួចហើយ។"),
)
T["zh"] = dict(
  eyebrow="高棉文化与历法", h1="高棉生肖年与 Sak 纪年",
  sub="高棉年份的完整名称：生肖、Sak、佛历和小历",
  lead="高棉日期的末尾常写着年份名称，例如“马年 Atthasak 佛历2570年”。这一行包含四种不同的纪年，而且每一种在不同的日子更替。本指南解释这四种纪年、十个 Sak，以及2024年至2035年的年份名称。",
  meta='发布于 <time datetime="2026-10-18">2026年10月18日</time> · MyBirthSign', alt="夜空下金色生肖轮前的一匹马",
  partsH="一个年份名称里的四种纪年",
  parts=[("生肖 · 12年一轮", "十二生肖之一，从 Choot（鼠）到 Kor（猪）。它在四月中旬高棉新年开始的 Moha Songkran 更替。印刷的日历通常从第二天开始显示新生肖。"),
         ("Sak · 10年一轮", "从一到十的序数，从 Ekasak 到 Samrithisak。它在高棉新年最后一天 Loeng Sak 加一。"),
         ("佛历（B.E.）", "从佛陀涅槃起计算年份。在高棉历中，它在 Pisak 月下弦第1天，即卫塞节的第二天更替。"),
         ("小历（Chula Sakarat，C.S.）", "意为“小纪元”，元年始于公元638年。它与 Sak 同在 Loeng Sak 更替，其年份的最后一位数字就对应 Sak。")],
  tlH="2026年：三周内三次更替", tlIntro="下面按日期列出2026年年份名称的变化。",
  tl=[("2026-01-01", "蛇年（Msanh）、Saptasak、佛历2569年、小历1387年。从2025年4月开始的高棉年仍在继续。"),
      ("2026-04-14", "Moha Songkran：高棉新年开始。生肖在新年时刻更替。"),
      ("2026-04-15", "日历开始显示马年（Momee）。"),
      ("2026-04-16", "Loeng Sak：Sak 变为 Atthasak，小历变为1388年。"),
      ("2026-05-02", "卫塞节的第二天：佛历变为2570年。")],
  tlOut="从2026年5月2日到2027年高棉新年，完整名称是<b>马年（Momee）Atthasak 佛历2570年</b>。",
  sakH="十个 Sak", sakIntro="Sak 的名称是数字一到九，加上表示第十年、完成一轮的 Samrithisak。由于 Sak 与小历同步更替，小历年份的最后一位数字就能告诉你 Sak。",
  sakTh=["序号", "Sak", "小历年份尾数", "年份（自 Loeng Sak 起）"],
  cycH="为什么同一个名称每60年重现一次",
  cyc=["生肖和 Sak 每年各前进一步。十二生肖和十个 Sak 要过60年才会再次对齐，60是能同时被12和10整除的最小数。",
       "所以2026年是 Atthasak 马年，1966年也是，60年后的2086年也是。在120种可能的组合中只出现60种：马年总是偶数 Sak。中国历法也有60年一轮的周期，由十天干和十二地支组成，但 Sak 是高棉的纪年，与天干或<a href=\"five-elements-explained.html\">五行</a>不同。"],
  tabH="2024–2035年高棉年份名称", tabTh=["自四月起的高棉年", "生肖", "Sak", "佛历（自卫塞节起）", "小历（自 Loeng Sak 起）"],
  tabNote="每一行从当年四月的高棉新年开始。佛历年份要再过几周，在 Pisak 月下弦第1天才更替。",
  calcH="某一天属于哪个高棉年？", calcP="输入1900年至2059年之间的任意日期，查看它的生肖、Sak、佛历和小历。计算在你的浏览器中进行，不会保存或发送任何内容。",
  calcL="日期", calcB="显示年份名称",
  faqH="常见问题",
  faq=[("高棉历中的 Sak 是什么？", "Sak 是与十二生肖并用的十年一轮纪年。每个高棉年都有一个 Sak，从 Ekasak（第一）到 Samrithisak（第十），在高棉新年最后一天 Loeng Sak 加一。"),
       ("2026年是哪个 Sak？", "Atthasak，第八个 Sak。它从2026年4月16日 Loeng Sak 开始，持续到2027年4月的 Loeng Sak，届时 Noppasak 开始。"),
       ("柬埔寨的佛历年份何时更替？", "在 Pisak 月下弦第1天，即卫塞节的第二天。2026年5月2日变为佛历2570年；按历法规则，佛历2571年始于2027年5月21日。"),
       ("为什么柬埔寨是佛历2570年而泰国是2569年？", "泰国把佛历固定为公历年份加543，并从1月1日开始。高棉历在卫塞节之后加544，之前加543。"),
       ("高棉生肖年和中国生肖一样吗？", "生肖相同，但高棉年在四月的高棉新年更替，而中国农历年在春节更替。请阅读<a href=\"khmer-new-year-animal-year.html\">高棉生肖年究竟何时更替</a>。"),
       ("怎样查到我自己的高棉年份名称？", "在上面的查询工具中输入你的出生日期。要查看完整的高棉农历生日，请使用<a href=\"../checker.html\">生肖查询</a>。")],
  next='延伸阅读：<a href="khmer-lunar-calendar-birth-date.html">高棉农历如何计算日子</a>、<a href="khmer-leap-months.html">高棉闰月与闰日</a>，或打开<a href="../khmer-calendar.html">高棉日历</a>。',
  disc="仅供文化参考。年份名称按传统高棉历法规则计算；印刷的日历显示新生肖的时间可能比新年时刻晚一天。",
  srcH="来源", src=[f'所有年份名称、Sak 以及佛历和小历年份：开源程序库 <a href="{MK}" rel="noopener" target="_blank">momentkh</a> 中的传统高棉历法规则。',
                  f'小历（“小纪元”，始于公元638年）：<a href="{WIKI_CS}" rel="noopener" target="_blank">Wikipedia, “Chula Sakarat”</a>。',
                  f'佛历从佛陀涅槃起算，以及泰国的543年差：<a href="{WIKI_BE}" rel="noopener" target="_blank">Wikipedia, “Buddhist calendar”</a>。'],
  js=dict(range="请输入1900年至2059年之间的日期。", lunar="高棉日期：", year="年份名称：", animal="生肖", sak="Sak", be="佛历", cs="小历",
          ny="这一天在高棉新年期间，生肖和 Sak 在不同的日子更替。", cn="在高棉新年之前：你的中国生肖可能已经是下一个了。"),
)


def body(lang):
    t = T[lang]; i = LI[lang]; o = []
    o.append(hero(t, "khmer-animal-year-sak-hero.webp", t["alt"]))
    o.append(share(t, lang, SLUG, [{"en": "2026: Year of the Horse, Atthasak", "km": "2026៖ ឆ្នាំមមី អដ្ឋស័ក", "zh": "2026年：马年 Atthasak"}[lang],
                                   {"en": "B.E. 2570 from 2 May 2026", "km": "ព.ស. 2570 ចាប់ពី 2 ឧសភា 2026", "zh": "2026年5月2日起为佛历2570年"}[lang]]))
    o.append(h2(t["partsH"]))
    o.append('  <ul class="hd-kinds">' + "".join(f'<li class="hd-k hd-k-{c}"><span class="hd-dot" aria-hidden="true"></span><div><b>{a}</b><p>{b}</p></div></li>' for (a, b), c in zip(t["parts"], ["moon", "fest", "sil", "hol"])) + "</ul>")
    o.append(h2(t["tlH"]))
    o.append(text([t["tlIntro"]]))
    o.append('  <ol class="ys-time">' + "".join(f'<li><time datetime="{d}">{dfmt(lang, d)}</time><p>{x}</p></li>' for d, x in t["tl"]) + "</ol>")
    o.append(f'  <p class="ys-out">{t["tlOut"]}</p>')
    o.append('  <div class="ad-slot">Ad space</div>')
    o.append(h2(t["sakH"])); o.append(text([t["sakIntro"]]))
    rows = []
    for n in range(1, 11):
        s = n % 10
        ys = [y for y in range(2020, 2040) if (y - 638) % 10 == s]
        rows.append(f'<tr><td>{n}</td><td><b>{sname(lang, s)}</b>{"" if lang != "zh" else ""}</td><td>{s}</td><td>{" · ".join(map(str, ys))}</td></tr>')
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table kny-table ys-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["sakTh"])}</tr></thead><tbody>{"".join(rows)}</tbody></table></div>')
    o.append(h2(t["cycH"])); o.append(text(t["cyc"]))
    o.append(h2(t["tabH"]))
    rows = []
    for y in range(2024, 2036):
        a, s = (y - 2020) % 12, (y - 638) % 10
        hl = ' class="ys-now"' if y == 2026 else ""
        rows.append(f'<tr{hl}><td><b>{y}</b></td><td>{aname(lang, a)}</td><td>{sname(lang, s)}</td><td>{y + 544}</td><td>{y - 638}</td></tr>')
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table kny-table ys-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["tabTh"])}</tr></thead><tbody>{"".join(rows)}</tbody></table></div>')
    o.append(f'  <p class="kny-note">{t["tabNote"]}</p>')
    o.append(f'''  <section class="zc-box hc-calc kny-calc vs-calc" data-ys-calc data-lang="{lang}">
    <h2 class="zc-bh">{t["calcH"]}</h2>
    <p>{t["calcP"]}</p>
    <form class="hc-form" novalidate>
      <label for="ys-date-{lang}">{t["calcL"]}</label>
      <input id="ys-date-{lang}" type="date" min="1900-01-01" max="2059-12-31" required>
      <button type="submit" class="fe-btn">{t["calcB"]}</button>
    </form>
    <div class="kny-out ys-res-box" aria-live="polite" hidden></div>
  </section>''')
    o.append(h2(t["faqH"])); o.append(faq(t["faq"]))
    o.append(f'  <div class="fe-text"><p>{t["next"]}</p></div>')
    o.append(f'  <p class="disclaimer">{t["disc"]}</p>'); o.append(sources(t))
    return "\n".join(o)


S = {l: T[l]["js"] for l in T}
CALC_JS = r"""<script src="../js/vendor/momentkh.min.js" defer></script>
<script>
/* Khmer year name of a date: animal, Sak, Buddhist Era, Chula Sakarat, all from js/vendor/momentkh.min.js. Nothing is saved or sent. */
document.addEventListener("DOMContentLoaded", function () {
  var S = %S%;
  var AEN = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  var AROM = ["Choot","Chlov","Khal","Thos","Rong","Msanh","Momee","Momae","Vok","Roka","Cho","Kor"];
  var AZH = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
  var SROM = ["Samrithisak","Ekasak","Tosak","Treisak","Chattvasak","Panchasak","Chhasak","Saptasak","Atthasak","Noppasak"];
  var MEN = ["Migasir","Boss","Meak","Phalkun","Chet","Pisak","Jesth","Asadh","Srap","Phatrabot","Assoch","Kadeuk","Pathamasadh (1st Asadh)","Tutiyasadh (2nd Asadh)"];
  function ord(n) { var s = ["th","st","nd","rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
  function west(t) { return String(t).replace(/[០-៩]/g, function (c) { return String(c.charCodeAt(0) - 0x17E0); }); }
  document.querySelectorAll("[data-ys-calc]").forEach(function (box) {
    var lang = box.getAttribute("data-lang"), s = S[lang] || S.en;
    var form = box.querySelector("form"), input = box.querySelector("input"), out = box.querySelector(".ys-res-box");
    form.addEventListener("submit", function (e) {
      e.preventDefault(); out.hidden = false;
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.value || "");
      if (!m || +m[1] < 1900 || +m[1] > 2059 || !window.momentkh) { out.innerHTML = '<p class="hc-err">' + s.range + "</p>"; return; }
      var M = window.momentkh, y = +m[1], mo = +m[2], d = +m[3], res = M.fromGregorian(y, mo, d), k = res.khmer;
      var an = lang === "km" ? "ឆ្នាំ" + k.animalYearName : lang === "zh" ? AZH[k.animalYear] + "年（" + AROM[k.animalYear] + "）" : AEN[k.animalYear] + " (" + AROM[k.animalYear] + ")";
      var sk = lang === "km" ? k.sakName : SROM[k.sak];
      var lunar = lang === "en" ? ord(k.day) + " " + (k.moonPhase ? "waning" : "waxing") + " day of " + MEN[k.monthIndex] : west(M.format(res));
      var ny = M.getNewYear(y), note = "";
      if (ny) { var t = Date.UTC(y, mo - 1, d), t0 = Date.UTC(ny.year, ny.month - 1, ny.day);
        if (t >= t0 && t <= t0 + 3 * 864e5) note = s.ny; else if (t < t0 && mo <= 4 && (mo > 1 || d >= 21)) note = s.cn; }
      var row = function (a, b) { return '<div class="ys-cell"><small>' + a + "</small><b>" + b + "</b></div>"; };
      out.innerHTML = '<div class="vs-res ys-res"><p class="vs-lunar"><span>' + s.lunar + '</span> <b' + (lang === "en" ? "" : ' lang="km"') + ">" + lunar + "</b></p>" +
        '<div class="ys-grid">' + row(s.animal, an) + row(s.sak, sk) + row(s.be, k.beYear) + row(s.cs, k.jsYear) + "</div>" +
        (note ? '<p class="vs-season">' + note + "</p>" : "") + "</div>";
    });
  });
});
</script>""".replace("%S%", json.dumps(S, ensure_ascii=False))

build_page(SLUG, "Khmer Animal Year and Sak: The Full Name of a Khmer Year",
           "How a Khmer year is named: the 12 animals, the 10 Sak, the Buddhist Era and Chula Sakarat, when each one changes, the year names 2024–2035 and a free date checker.",
           f"https://mybirthsign.com/images/og/{SLUG}.jpg", {l: body(l) for l in T}, T["en"]["faq"], "khmer-animal-year-sak-hero.webp", extra_js=CALC_JS, crumb="Khmer animal year and Sak")
