#!/usr/bin/env python3
"""Builds blog/cambodian-public-holidays.html (EN / KM / ZH).
2026 list: Sub-Decree No. 167 (as published by Andersen Cambodia). 2027 dates of the moving holidays are calculated with
momentkh (same rules as the Khmer Calendar page) and are labelled as expected until the 2027 sub-decree confirms them.
Peace Day background: Cambodjanews. Nothing else about holiday status is assumed."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from guide_common import *

SLUG = "cambodian-public-holidays"
GOV = "https://kh.andersen.com/publications/cambodia-sets-official-2026-public-holiday-schedule/"
PEACE = "https://cambojanews.com/win-win-policy-day-re-named-peace-day-in-cambodia-now-a-national-holiday/"

# key, 2026 dates, kind, group
ROWS = [
    ("newyear", ["2026-01-01"], "fixed", "intl"), ("victory", ["2026-01-07"], "fixed", "nation"), ("women", ["2026-03-08"], "fixed", "intl"),
    ("kny", ["2026-04-14", "2026-04-16"], "solar", "faith"), ("labour", ["2026-05-01"], "fixed", "intl"), ("visak", ["2026-05-01"], "lunar", "faith"),
    ("ploughing", ["2026-05-05"], "lunar", "royal"), ("king", ["2026-05-14"], "fixed", "royal"), ("queen", ["2026-06-18"], "fixed", "royal"),
    ("constitution", ["2026-09-24"], "fixed", "nation"), ("pchumben", ["2026-10-10", "2026-10-12"], "lunar", "faith"), ("kingfather", ["2026-10-15"], "fixed", "royal"),
    ("coronation", ["2026-10-29"], "fixed", "royal"), ("independence", ["2026-11-09"], "fixed", "nation"), ("water", ["2026-11-23", "2026-11-25"], "lunar", "faith"),
    ("peace", ["2026-12-29"], "fixed", "nation"),
]
MOVING = [("kny", "2026-04-14", "2026-04-16", "2027-04-14", "2027-04-16"), ("visak", "2026-05-01", None, "2027-05-20", None),
          ("ploughing", "2026-05-05", None, "2027-05-24", None), ("pchumben", "2026-10-10", "2026-10-12", "2027-09-29", "2027-10-01"),
          ("water", "2026-11-23", "2026-11-25", "2027-11-12", "2027-11-14")]

N = {
 "newyear": ("International New Year's Day", "ទិវាចូលឆ្នាំសកល", "元旦"),
 "victory": ("Victory over Genocide Day", "ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍", "战胜种族灭绝纪念日"),
 "women": ("International Women's Day", "ទិវានារីអន្តរជាតិ", "国际妇女节"),
 "kny": ("Khmer New Year", "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ", "高棉新年"),
 "labour": ("International Labour Day", "ទិវាពលកម្មអន្តរជាតិ", "国际劳动节"),
 "visak": ("Visak Bochea", "ពិធីបុណ្យវិសាខបូជា", "卫塞节"),
 "ploughing": ("Royal Ploughing Ceremony", "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល", "御耕节"),
 "king": ("King Norodom Sihamoni's Birthday", "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ នរោត្តម សីហមុនី", "西哈莫尼国王诞辰"),
 "queen": ("Queen Mother Norodom Monineath Sihanouk's Birthday", "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចព្រះមហាក្សត្រី នរោត្តម មុនិនាថ សីហនុ", "莫尼列太后诞辰"),
 "constitution": ("Constitution Day", "ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ", "宪法日"),
 "pchumben": ("Pchum Ben", "ពិធីបុណ្យភ្ជុំបិណ្ឌ", "亡人节"),
 "kingfather": ("King Father Norodom Sihanouk Commemoration Day", "ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ", "西哈努克太皇纪念日"),
 "coronation": ("Coronation Day of King Norodom Sihamoni", "ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិ", "西哈莫尼国王登基纪念日"),
 "independence": ("Independence Day", "ពិធីបុណ្យឯករាជ្យជាតិ", "独立日"),
 "water": ("Water Festival (Bon Om Touk)", "ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក", "送水节"),
 "peace": ("Peace Day", "ទិវាសន្តិភាព", "和平日"),
}
MEAN = {
 "newyear": ("The start of the Gregorian year.", "ការចាប់ផ្តើមឆ្នាំសុរិយគតិ។", "公历新年的开始。"),
 "victory": ("Marks 7 January 1979, when the Khmer Rouge regime was driven from Phnom Penh.", "រំលឹកថ្ងៃ 7 មករា 1979 ដែលរបបខ្មែរក្រហមត្រូវបានដេញចេញពីភ្នំពេញ។", "纪念1979年1月7日红色高棉政权被逐出金边。"),
 "women": ("Honours women's rights and contributions.", "លើកតម្កើងសិទ្ធិ និងការចូលរួមរបស់ស្ត្រី។", "表彰女性的权利与贡献。"),
 "kny": ("The traditional New Year, beginning at Moha Songkran in mid-April.", "ឆ្នាំថ្មីប្រពៃណី ដែលចាប់ផ្តើមនៅមហាសង្ក្រាន្ត ពាក់កណ្តាលខែមេសា។", "传统新年，从四月中旬的 Moha Songkran 开始。"),
 "labour": ("Honours workers; in 2026 it falls on the same day as Visak Bochea.", "លើកតម្កើងកម្មករ ហើយឆ្នាំ 2026 ត្រូវនឹងថ្ងៃវិសាខបូជា។", "向劳动者致敬；2026年与卫塞节同一天。"),
 "visak": ("Remembers the Buddha's birth, enlightenment and passing, on the full moon of Pisak.", "រំលឹកការប្រសូត ការត្រាស់ដឹង និងការបរិនិព្វានរបស់ព្រះពុទ្ធ នៅថ្ងៃពេញបូណ៌មីខែពិសាខ។", "在 Pisak 月满月纪念佛陀的诞生、成道和涅槃。"),
 "ploughing": ("A royal rite at the start of the rice season, held four days after Visak Bochea.", "ព្រះរាជពិធីនៅដើមរដូវធ្វើស្រែ ប្រារព្ធបួនថ្ងៃក្រោយវិសាខបូជា។", "在稻作季节开始时举行的王室仪式，于卫塞节后四天举行。"),
 "king": ("The birthday of the reigning King, born 14 May 1953.", "ព្រះជន្មរបស់ព្រះមហាក្សត្រ ដែលប្រសូតថ្ងៃ 14 ឧសភា 1953។", "在位国王的生日，他生于1953年5月14日。"),
 "queen": ("The birthday of the Queen Mother, the King's mother.", "ព្រះជន្មរបស់សម្តេចព្រះមហាក្សត្រី ព្រះវររាជមាតា។", "太后（国王的母亲）的生日。"),
 "constitution": ("Marks the 1993 Constitution, which restored the constitutional monarchy.", "រំលឹកដល់រដ្ឋធម្មនុញ្ញឆ្នាំ 1993 ដែលស្តាររាជាធិបតេយ្យអាស្រ័យរដ្ឋធម្មនុញ្ញឡើងវិញ។", "纪念1993年宪法，该宪法恢复了君主立宪制。"),
 "pchumben": ("Cambodia's festival for the dead, at the end of the month of Phatrabot.", "ពិធីបុណ្យឧទ្ទិសដល់បុព្វបុរស នៅចុងខែភទ្របទ។", "柬埔寨的祭祖节，在 Phatrabot 月末。"),
 "kingfather": ("King Father Norodom Sihanouk died on 15 October 2012.", "ព្រះបរមរតនកោដ្ឋ នរោត្តម សីហនុ បានសោយទិវង្គតនៅថ្ងៃ 15 តុលា 2012។", "西哈努克太皇于2012年10月15日逝世。"),
 "coronation": ("King Norodom Sihamoni was crowned on 29 October 2004.", "ព្រះមហាក្សត្រ នរោត្តម សីហមុនី បានគ្រងរាជ្យនៅថ្ងៃ 29 តុលា 2004។", "西哈莫尼国王于2004年10月29日登基。"),
 "independence": ("Independence from France on 9 November 1953.", "ឯករាជ្យពីប្រទេសបារាំង នៅថ្ងៃ 9 វិច្ឆិកា 1953។", "1953年11月9日脱离法国独立。"),
 "water": ("Boat races, illuminated floats and the salute to the moon, at the full moon of Kadeuk.", "ប្រណាំងទូក បណ្តែតប្រទីប និងសំពះព្រះខែ នៅថ្ងៃពេញបូណ៌មីខែកត្ដិក។", "在 Kadeuk 月满月举行龙舟赛、灯船和拜月。"),
 "peace": ("Marks the end of the civil war on 29 December 1998; a public holiday since 2024.", "រំលឹកការបញ្ចប់សង្គ្រាមស៊ីវិល នៅថ្ងៃ 29 ធ្នូ 1998 ហើយជាថ្ងៃឈប់សម្រាកតាំងពីឆ្នាំ 2024។", "纪念1998年12月29日内战结束；自2024年起成为公共假期。"),
}
LI = {"en": 0, "km": 1, "zh": 2}

T = {}
T["en"] = dict(
  eyebrow="Khmer Culture &amp; Calendar", h1="Cambodian Public Holidays 2026",
  sub="every official holiday, what it means, and which dates move each year",
  lead="In 2026 Cambodia has 15 public holidays covering 22 days off, set by Sub-Decree No. 167. Some keep the same date every year, some follow the moon and one follows the sun. Here is the full list, what each one marks, and the expected 2027 dates of the moving ones.",
  meta='Published <time datetime="2026-10-18">October 18, 2026</time> · MyBirthSign', alt="Pagodas lit at night under a full moon and a zodiac wheel",
  listH="All 2026 public holidays", th=["Date", "Holiday", "Date type"], kind={"fixed": "Fixed", "lunar": "Lunar", "solar": "Solar"},
  listNote=f'Source: Sub-Decree No. 167, as published by <a href="{GOV}" rel="noopener" target="_blank">Andersen Cambodia</a>. Visak Bochea and International Labour Day fall on the same day in 2026.',
  kindsH="Three kinds of holiday date",
  kinds=[("Fixed date", "Same Gregorian date every year, such as Independence Day on 9 November."),
         ("Lunar date", "Visak Bochea, the Royal Ploughing Ceremony, Pchum Ben and the Water Festival follow the Khmer lunar calendar, so they move by up to about a month from year to year."),
         ("Solar date", "Khmer New Year follows the sun's move into Aries, so it stays on 13–16 April.")],
  movingH="The moving holidays in 2027", movingTh=["Holiday", "2026 (official)", "2027 (expected)"],
  movingNote="The 2027 dates are calculated with the traditional Khmer calendar rules (the same ones as our Khmer Calendar). The government confirms each year's list by sub-decree, so treat them as expected until then.",
  groupsH="What each holiday marks",
  groups={"nation": "History and nation", "royal": "Royal days", "faith": "Religious and traditional", "intl": "International days"},
  tipsH="Planning around the holidays",
  tips=["Government offices, schools and banks close on public holidays.", "Pchum Ben and Khmer New Year are the big travel times: many people go home to their province, buses fill up and Phnom Penh becomes quiet.",
        "During the Water Festival, boat races on the river draw large crowds to the Phnom Penh riverside.", "Lunar holidays can move by weeks, so check the year before booking. Our <a href=\"../khmer-calendar.html\">Khmer Calendar</a> shows them for any month."],
  faqH="Frequently Asked Questions",
  faq=[("How many public holidays does Cambodia have in 2026?", "Fifteen holidays covering 22 days, because Khmer New Year, Pchum Ben and the Water Festival last three days each, and Visak Bochea shares 1 May with Labour Day."),
       ("Which Cambodian holidays change date every year?", "Visak Bochea, the Royal Ploughing Ceremony, Pchum Ben and the Water Festival, because they follow the lunar calendar. Khmer New Year stays in mid-April."),
       ("Is Meak Bochea a public holiday in Cambodia?", "Not in 2026: it is not on the official list, although it remains an important Buddhist day. See our guide to Cambodian Buddhist holy days."),
       ("Is Chinese New Year a public holiday in Cambodia?", "It is not on the official 2026 list."),
       ("When will the 2027 holidays be confirmed?", "When the government publishes the 2027 sub-decree. Until then, the 2027 dates on this page are calculated from the lunar calendar rules."),
       ("What is Peace Day?", "Peace Day on 29 December marks the end of Cambodia's civil war on 29 December 1998. It became a national holiday by a sub-decree in 2024.")],
  next='Read next: <a href="cambodian-buddhist-holy-days.html">Cambodian Buddhist holy days</a>, <a href="khmer-new-year-animal-year.html">Khmer New Year and the animal year</a>, or open the <a href="../khmer-calendar.html">Khmer Calendar</a>.',
  disc="For information. Holiday lists are set by the Royal Government of Cambodia; check the official announcement before planning.",
  srcH="Sources", src=[f'2026 public holidays (Sub-Decree No. 167): <a href="{GOV}" rel="noopener" target="_blank">Andersen Cambodia</a>.',
                      f'Peace Day: <a href="{PEACE}" rel="noopener" target="_blank">Cambojanews, “Win-Win Policy Day re-named Peace Day”</a>.',
                      'Lunar dates for 2027: traditional Khmer calendar rules in the open-source <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a> library.'],
)
T["km"] = dict(
  eyebrow="វប្បធម៌ និងប្រតិទិនខ្មែរ", h1="ថ្ងៃឈប់សម្រាកផ្លូវការនៅកម្ពុជា ឆ្នាំ 2026",
  sub="ថ្ងៃឈប់សម្រាកផ្លូវការទាំងអស់ អត្ថន័យ និងថ្ងៃណាដែលប្រែប្រួលរៀងរាល់ឆ្នាំ",
  lead="ក្នុងឆ្នាំ 2026 កម្ពុជាមានថ្ងៃបុណ្យ 15 ដែលស្មើនឹងថ្ងៃឈប់សម្រាក 22 ថ្ងៃ តាមអនុក្រឹត្យលេខ 167។ ខ្លះនៅថ្ងៃដដែលរៀងរាល់ឆ្នាំ ខ្លះតាមព្រះចន្ទ ហើយមួយតាមព្រះអាទិត្យ។ នេះជាបញ្ជីពេញលេញ អត្ថន័យនៃថ្ងៃនីមួយៗ និងកាលបរិច្ឆេទរំពឹងទុកឆ្នាំ 2027 សម្រាប់ថ្ងៃដែលប្រែប្រួល។",
  meta='ចុះផ្សាយ <time datetime="2026-10-18">ថ្ងៃទី18 ខែតុលា ឆ្នាំ2026</time> · MyBirthSign', alt="វត្តអារាមភ្លឺពេលយប់ ក្រោមព្រះចន្ទពេញវង់ និងកង់រាសី",
  listH="ថ្ងៃឈប់សម្រាកផ្លូវការទាំងអស់ឆ្នាំ 2026", th=["កាលបរិច្ឆេទ", "ថ្ងៃបុណ្យ", "ប្រភេទកាលបរិច្ឆេទ"], kind={"fixed": "ថេរ", "lunar": "ចន្ទគតិ", "solar": "សុរិយគតិ"},
  listNote=f'ប្រភព៖ អនុក្រឹត្យលេខ 167 ដែលផ្សព្វផ្សាយដោយ <a href="{GOV}" rel="noopener" target="_blank">Andersen Cambodia</a>។ ពិធីបុណ្យវិសាខបូជា និងទិវាពលកម្មអន្តរជាតិ ធ្លាក់ចំថ្ងៃតែមួយក្នុងឆ្នាំ 2026។',
  kindsH="ប្រភេទកាលបរិច្ឆេទបីយ៉ាង",
  kinds=[("ថ្ងៃថេរ", "កាលបរិច្ឆេទសុរិយគតិដដែលរៀងរាល់ឆ្នាំ ដូចជាពិធីបុណ្យឯករាជ្យជាតិ ថ្ងៃ 9 វិច្ឆិកា។"),
         ("តាមចន្ទគតិ", "វិសាខបូជា ច្រត់ព្រះនង្គ័ល ភ្ជុំបិណ្ឌ និងបុណ្យអុំទូក ដើរតាមប្រតិទិនចន្ទគតិខ្មែរ ដូច្នេះប្រែប្រួលរហូតដល់ប្រហែលមួយខែពីមួយឆ្នាំទៅមួយឆ្នាំ។"),
         ("តាមសុរិយគតិ", "ចូលឆ្នាំខ្មែរដើរតាមពេលព្រះអាទិត្យចូលរាសីមេស ដូច្នេះនៅចន្លោះថ្ងៃ 13–16 មេសា។")],
  movingH="ថ្ងៃបុណ្យដែលប្រែប្រួល ក្នុងឆ្នាំ 2027", movingTh=["ថ្ងៃបុណ្យ", "2026 (ផ្លូវការ)", "2027 (រំពឹងទុក)"],
  movingNote="កាលបរិច្ឆេទឆ្នាំ 2027 គណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី (ដូចប្រតិទិនខ្មែររបស់យើង)។ រដ្ឋាភិបាលបញ្ជាក់បញ្ជីប្រចាំឆ្នាំដោយអនុក្រឹត្យ ដូច្នេះសូមចាត់ទុកថាជាការរំពឹងទុក រហូតដល់ពេលនោះ។",
  groupsH="អត្ថន័យនៃថ្ងៃបុណ្យនីមួយៗ",
  groups={"nation": "ប្រវត្តិសាស្ត្រ និងជាតិ", "royal": "ថ្ងៃព្រះរាជពិធី", "faith": "សាសនា និងប្រពៃណី", "intl": "ទិវាអន្តរជាតិ"},
  tipsH="ការរៀបចំផែនការជុំវិញថ្ងៃបុណ្យ",
  tips=["ស្ថាប័នរដ្ឋ សាលារៀន និងធនាគារ បិទនៅថ្ងៃឈប់សម្រាកផ្លូវការ។", "ភ្ជុំបិណ្ឌ និងចូលឆ្នាំខ្មែរ ជាពេលធ្វើដំណើរធំ៖ មនុស្សជាច្រើនទៅស្រុកកំណើត ឡានក្រុងពេញ ហើយភ្នំពេញស្ងាត់។",
        "ក្នុងបុណ្យអុំទូក ការប្រណាំងទូកលើទន្លេ ទាក់ទាញមនុស្សយ៉ាងច្រើនមកមាត់ទន្លេភ្នំពេញ។", "ថ្ងៃបុណ្យតាមចន្ទគតិអាចប្រែប្រួលច្រើនសប្តាហ៍ ដូច្នេះសូមពិនិត្យឆ្នាំមុនកក់។ <a href=\"../khmer-calendar.html\">ប្រតិទិនខ្មែរ</a>របស់យើងបង្ហាញសម្រាប់ខែណាមួយ។"],
  faqH="សំណួរដែលសួរញឹកញាប់",
  faq=[("តើកម្ពុជាមានថ្ងៃឈប់សម្រាកផ្លូវការប៉ុន្មានក្នុងឆ្នាំ 2026?", "ថ្ងៃបុណ្យ 15 ដែលស្មើនឹង 22 ថ្ងៃ ព្រោះចូលឆ្នាំខ្មែរ ភ្ជុំបិណ្ឌ និងបុណ្យអុំទូក មានរយៈពេលបីថ្ងៃម្នាក់ៗ ហើយវិសាខបូជាត្រូវនឹងថ្ងៃ 1 ឧសភា ជាមួយទិវាពលកម្ម។"),
       ("តើថ្ងៃបុណ្យណាខ្លះប្រែប្រួលរៀងរាល់ឆ្នាំ?", "វិសាខបូជា ច្រត់ព្រះនង្គ័ល ភ្ជុំបិណ្ឌ និងបុណ្យអុំទូក ព្រោះដើរតាមប្រតិទិនចន្ទគតិ។ ចូលឆ្នាំខ្មែរនៅពាក់កណ្តាលខែមេសា។"),
       ("តើមាឃបូជាជាថ្ងៃឈប់សម្រាកផ្លូវការឬទេ?", "មិនមែនក្នុងឆ្នាំ 2026 ទេ៖ វាមិនមាននៅក្នុងបញ្ជីផ្លូវការ ទោះបីវានៅតែជាថ្ងៃបុណ្យព្រះពុទ្ធសាសនាសំខាន់ក៏ដោយ។"),
       ("តើបុណ្យចូលឆ្នាំចិនជាថ្ងៃឈប់សម្រាកផ្លូវការឬទេ?", "វាមិនមាននៅក្នុងបញ្ជីផ្លូវការឆ្នាំ 2026 ទេ។"),
       ("តើថ្ងៃឈប់សម្រាកឆ្នាំ 2027 នឹងត្រូវបញ្ជាក់នៅពេលណា?", "នៅពេលរដ្ឋាភិបាលចេញអនុក្រឹត្យឆ្នាំ 2027។ រហូតដល់ពេលនោះ កាលបរិច្ឆេទឆ្នាំ 2027 នៅលើទំព័រនេះ គណនាតាមវិធានប្រតិទិនចន្ទគតិ។"),
       ("តើទិវាសន្តិភាពជាអ្វី?", "ទិវាសន្តិភាព ថ្ងៃ 29 ធ្នូ រំលឹកការបញ្ចប់សង្គ្រាមស៊ីវិលនៅកម្ពុជា នៅថ្ងៃ 29 ធ្នូ 1998។ វាក្លាយជាថ្ងៃឈប់សម្រាកជាតិ តាមអនុក្រឹត្យឆ្នាំ 2024។")],
  next='អានបន្ត៖ <a href="cambodian-buddhist-holy-days.html">ថ្ងៃសីល និងបុណ្យព្រះពុទ្ធសាសនាខ្មែរ</a> <a href="khmer-new-year-animal-year.html">ចូលឆ្នាំខ្មែរ និងឆ្នាំសត្វ</a> ឬបើក<a href="../khmer-calendar.html">ប្រតិទិនខ្មែរ</a>។',
  disc="សម្រាប់ព័ត៌មាន។ បញ្ជីថ្ងៃឈប់សម្រាក កំណត់ដោយរាជរដ្ឋាភិបាលកម្ពុជា សូមពិនិត្យសេចក្តីប្រកាសផ្លូវការមុនរៀបចំផែនការ។",
  srcH="ប្រភព", src=[f'ថ្ងៃឈប់សម្រាកឆ្នាំ 2026 (អនុក្រឹត្យលេខ 167)៖ <a href="{GOV}" rel="noopener" target="_blank">Andersen Cambodia</a>។',
                   f'ទិវាសន្តិភាព៖ <a href="{PEACE}" rel="noopener" target="_blank">Cambojanews</a>។',
                   'កាលបរិច្ឆេទចន្ទគតិឆ្នាំ 2027៖ វិធានប្រតិទិនខ្មែរ ក្នុងបណ្ណាល័យកូដចំហ <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a>។'],
)
T["zh"] = dict(
  eyebrow="高棉文化与历法", h1="2026年柬埔寨公共假期",
  sub="所有官方假期、它们的意义，以及哪些日期每年变化",
  lead="根据第167号次级法令，柬埔寨2026年共有15个公共假期，合计22天。有些每年日期固定，有些随月亮变化，还有一个跟随太阳。下面是完整名单、每个假期的意义，以及会变动的假期在2027年的预计日期。",
  meta='发布于 <time datetime="2026-10-18">2026年10月18日</time> · MyBirthSign', alt="满月与生肖轮下夜色中灯火通明的寺院",
  listH="2026年全部公共假期", th=["日期", "假期", "日期类型"], kind={"fixed": "固定", "lunar": "农历", "solar": "阳历"},
  listNote=f'来源：第167号次级法令，由 <a href="{GOV}" rel="noopener" target="_blank">Andersen Cambodia</a> 公布。2026年卫塞节与国际劳动节在同一天。',
  kindsH="三种假期日期",
  kinds=[("固定日期", "每年公历日期相同，例如11月9日的独立日。"),
         ("农历日期", "卫塞节、御耕节、亡人节和送水节按高棉农历计算，每年可相差约一个月。"),
         ("阳历日期", "高棉新年跟随太阳进入白羊宫的时间，所以固定在4月13日至16日之间。")],
  movingH="2027年会变动的假期", movingTh=["假期", "2026年（官方）", "2027年（预计）"],
  movingNote="2027年的日期按传统高棉历法规则计算（与我们的高棉日历相同）。政府每年以次级法令确认名单，在此之前请视为预计日期。",
  groupsH="每个假期纪念什么",
  groups={"nation": "历史与国家", "royal": "王室纪念日", "faith": "宗教与传统", "intl": "国际节日"},
  tipsH="假期出行与安排",
  tips=["公共假期期间政府机关、学校和银行休息。", "亡人节和高棉新年是出行高峰：许多人回乡，巴士爆满，金边变得冷清。",
        "送水节期间，河上的龙舟赛吸引大批人群前往金边河滨。", "农历假期每年可能相差几周，订票前请先查看。我们的<a href=\"../khmer-calendar.html\">高棉日历</a>可显示任意月份的假期。"],
  faqH="常见问题",
  faq=[("柬埔寨2026年有多少个公共假期？", "15个假期，合计22天，因为高棉新年、亡人节和送水节各放三天，而卫塞节与劳动节同在5月1日。"),
       ("哪些柬埔寨假期每年日期不同？", "卫塞节、御耕节、亡人节和送水节，因为它们按农历计算。高棉新年固定在四月中旬。"),
       ("万佛节是柬埔寨的公共假期吗？", "2026年不是：它不在官方名单中，但仍是重要的佛教节日。"),
       ("春节是柬埔寨的公共假期吗？", "它不在2026年的官方名单中。"),
       ("2027年的假期何时确认？", "在政府公布2027年次级法令时。在此之前，本页的2027年日期是按农历规则计算的。"),
       ("和平日是什么？", "12月29日的和平日纪念1998年12月29日柬埔寨内战结束。它于2024年通过次级法令成为国家假日。")],
  next='延伸阅读：<a href="cambodian-buddhist-holy-days.html">柬埔寨佛教斋日与节日</a>、<a href="khmer-new-year-animal-year.html">高棉新年与生肖年</a>，或打开<a href="../khmer-calendar.html">高棉日历</a>。',
  disc="仅供参考。假期名单由柬埔寨王国政府制定，出行前请查看官方公告。",
  srcH="来源", src=[f'2026年公共假期（第167号次级法令）：<a href="{GOV}" rel="noopener" target="_blank">Andersen Cambodia</a>。',
                  f'和平日：<a href="{PEACE}" rel="noopener" target="_blank">Cambojanews</a>。',
                  '2027年农历日期：开源程序库 <a href="https://github.com/ThyrithSor/momentkh" rel="noopener" target="_blank">momentkh</a> 中的传统高棉历法规则。'],
)


def span(lang, a, b=None, yr=True):
    if not b: return dfmt(lang, a, yr)
    if a[:7] == b[:7]:
        y, m, d1 = map(int, a.split("-")); d2 = int(b[8:])
        Y = f" {y}" if yr else ""
        return {"en": f"{d1}–{d2} {ENM[m-1]}{Y}", "km": f"{d1}–{d2} {KMM[m-1]}{Y}", "zh": (f"{y}年" if yr else "") + f"{m}月{d1}日至{d2}日"}[lang]
    return f"{dfmt(lang, a, yr)} – {dfmt(lang, b, yr)}"


def body(lang):
    t = T[lang]; i = LI[lang]; o = []
    o.append(hero(t, "cambodian-holidays-hero.webp", t["alt"]))
    o.append(share(t, lang, SLUG, [N["pchumben"][i] + ": " + span(lang, "2026-10-10", "2026-10-12"), N["water"][i].split(" (")[0] + ": " + span(lang, "2026-11-23", "2026-11-25")]))
    o.append(h2(t["listH"]))
    rows = "".join(f'<tr><td>{span(lang, ds[0], ds[1] if len(ds) > 1 else None, False)}</td><td><b>{N[k][i]}</b></td><td><span class="hd-tag hd-tag-{kind}">{t["kind"][kind]}</span></td></tr>' for k, ds, kind, g in ROWS)
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table kny-table ph-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["th"])}</tr></thead><tbody>{rows}</tbody></table></div>')
    o.append(f'  <p class="kny-note">{t["listNote"]}</p>')
    o.append(h2(t["kindsH"]))
    o.append('  <ul class="hd-kinds ph-kinds">' + "".join(f'<li class="hd-k hd-k-{c}"><span class="hd-dot" aria-hidden="true"></span><div><b>{a}</b><p>{b}</p></div></li>' for (a, b), c in zip(t["kinds"], ["hol", "fest", "moon"])) + "</ul>")
    o.append('  <div class="ad-slot">Ad space</div>')
    o.append(h2(t["movingH"]))
    mr = "".join(f'<tr><td><b>{N[k][i]}</b></td><td>{span(lang, a, b, False)}</td><td>{span(lang, c, d, False)}</td></tr>' for k, a, b, c, d in MOVING)
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table kny-table ph-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["movingTh"])}</tr></thead><tbody>{mr}</tbody></table></div>')
    o.append(f'  <p class="kny-note">{t["movingNote"]}</p>')
    o.append(h2(t["groupsH"]))
    cards = []
    for g, gname in t["groups"].items():
        items = "".join(f'<li><b>{N[k][i]}</b> — {MEAN[k][i]}</li>' for k, ds, kind, gg in ROWS if gg == g)
        cards.append(f'<section class="zc-box ph-group"><h3>{gname}</h3><ul>{items}</ul></section>')
    o.append('  <div class="ph-groups">' + "".join(cards) + "</div>")
    o.append(h2(t["tipsH"]))
    o.append('  <div class="fe-text"><ul class="ph-tips">' + "".join(f"<li>{x}</li>" for x in t["tips"]) + "</ul></div>")
    o.append(h2(t["faqH"])); o.append(faq(t["faq"]))
    o.append(f'  <div class="fe-text"><p>{t["next"]}</p></div>')
    o.append(f'  <p class="disclaimer">{t["disc"]}</p>'); o.append(sources(t))
    return "\n".join(o)


build_page(SLUG, "Cambodian Public Holidays 2026: Full List, Meanings and 2027 Dates",
           "All 15 Cambodian public holidays in 2026 (22 days off) from the official sub-decree, what each one marks, which follow the lunar calendar, and the expected 2027 dates.",
           f"https://mybirthsign.com/images/og/{SLUG.replace('public-', '')}.jpg", {l: body(l) for l in T}, T["en"]["faq"], "cambodian-holidays-hero.webp", crumb="Cambodian public holidays 2026")
