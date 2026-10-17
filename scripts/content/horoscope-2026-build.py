#!/usr/bin/env python3
"""Rebuilds the article body of blog/2026-horoscope-predictions.html (EN / KM / ZH blocks).

   python3 scripts/content/horoscope-2026-build.py

Facts used (no invented rules):
  * 2026 zodiac year = Bing-Wu Fire Horse, 17 Feb 2026 - 5 Feb 2027; 2027 = Fire Goat from 6 Feb 2027
    (dates from CNY_DATES in js/zodiac-data.js, element from the same stem formula as getZodiac()).
  * Sign relations = the site's own rules: same triangle (ZODIAC_TRIANGLES), six-harmony partner
    (ANIMAL_INFO.compatible outside the triangle), clash = opposite sign.
  * Element relations = ELEMENT_GENERATES / ELEMENT_CONTROLS in js/business-data.js.
Everything else is traditional context, framed as such.
"""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
PAGE = ROOT / "blog/2026-horoscope-predictions.html"
SRC = "https://randalolson.com/2016/05/08/why-did-so-many-japanese-families-avoid-having-children-in-1966/"
G = lambda a: f"/blog/zodiac-year-{a.lower()}"

ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
KM = dict(zip(ORDER, ["ជូត", "ឆ្លូវ", "ខាល", "ថោះ", "រោង", "ម្សាញ់", "មមី", "មមែ", "វក", "រកា", "ច", "កុរ"]))
ZH = dict(zip(ORDER, ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]))

# relation of each sign to a Horse year, by the site's rules
REL = {"Horse": "own", "Tiger": "tri", "Dog": "tri", "Goat": "six", "Rat": "clash"}

T = {}
T["en"] = dict(
    h1="2026 Fire Horse Year: What It Means for Each Zodiac Sign",
    lead="2026 is a <strong>Fire Horse</strong> year in the Chinese zodiac. It began on <strong>17 February 2026</strong> and runs until <strong>5 February 2027</strong>; the Fire Goat year starts the next day. This guide explains what “Fire Horse” means, how each of the 12 signs traditionally relates to a Horse year, what your own birth element adds, and what changes in February 2027.",
    facts=[("Zodiac year", "Fire Horse (Bing-Wu), a Yang year"), ("Starts", "17 February 2026"), ("Ends", "5 February 2027"), ("Next year", "Fire Goat, from 6 February 2027")],
    meaning_h="What a Fire Horse year means",
    meaning=[
        "Each zodiac year pairs one of the 12 animals with one of five elements, so a given pairing returns every 60 years. The last Fire Horse year was 1966 and the next is 2086. In the traditional names, 2026 is <em>Bing-Wu</em>: <em>Bing</em> is the Yang Fire stem and <em>Wu</em> is the Horse branch, which tradition also links to Fire and to midsummer. That doubled Fire is why the year is usually described as fast, bright and impatient.",
        f"The Fire Horse also carries folklore. In Japan, a belief that girls born in a Fire Horse year would be headstrong and unlucky in marriage led to a sharp fall in births in 1966 (<a href=\"{SRC}\" rel=\"noopener\">Randal Olson</a>). It is a good example of how much weight people have given these labels, and of why this site treats them as culture, not prediction: there is no evidence that birth year shapes personality or luck.",
    ],
    signs_h="How each sign relates to the Horse year",
    signs_p="The relation below uses the same rules as the site's calculators. Signs in the Horse's triangle (Tiger, Horse, Dog) are traditionally favoured. The Goat is the Horse's “six harmony” partner. The Rat sits directly opposite the Horse, the year's clash. The Horse itself is in its own year. Everyone else is neutral. Each note then looks at how your sign's usual strengths and watch-outs meet a fast, high-energy year.",
    rel={"own": "Own year", "tri": "Same triangle", "six": "Six harmony", "clash": "Clash", "neutral": "Neutral"},
    signs={
        "Rat": "The Rat sits directly opposite the Horse, so 2026 is its clash year. Tradition reads a clash as movement and friction: plans get reshuffled, and the Rat's careful, calculated style runs against a year that rewards fast action. A practical reading is to leave slack in schedules, check agreements before signing, and not take sudden changes personally.",
        "Ox": "The Ox is neutral to the Horse year in this site's system. The Ox wins through steady, patient work, and a quick Horse year may not reward that work as fast as it deserves. Keep doing the steady work, but say out loud what you need: quietly carrying the load is where misunderstandings start.",
        "Tiger": "The Tiger shares the Horse's triangle, so 2026 is traditionally one of its friendlier years, and the year's energy suits the Tiger's appetite for bold moves. The Tiger's usual watch-out, acting before checking, is amplified by a fast year. Decide quickly if you must, but verify slowly.",
        "Rabbit": "The Rabbit is neutral here. A sign that prefers calm and harmony can find a loud, fast year tiring. Protect some quiet time, choose fewer commitments, and don't let the wish to avoid conflict leave important things unsaid.",
        "Dragon": "The Dragon has no special bond or clash with the Horse. Two high-energy signs meet: the year's pace suits the Dragon's ambition, and that is also how it overcommits. Pick the one goal that matters most for the rest of the year and measure progress against it, not against everyone else.",
        "Snake": "The Snake is neutral, and its reflective style is the opposite of the year's pace. That can be an advantage: when others rush, the Snake's habit of thinking before acting catches mistakes. The watch-out is holding back so long that chances pass. Set yourself a deadline for decisions.",
        "Horse": "2026 is the Horse's own year, called <em>běnmìngnián</em> in Chinese. Many people expect their own year to be lucky, but tradition treats it as a year for care, and many people wear something red for protection. The year puts the Horse's restlessness in the spotlight, so finish what you start before chasing the next thing.",
        "Goat": "The Goat is the Horse's six-harmony partner, a supportive pairing, and it takes over as the ruling sign on 6 February 2027. Use the remaining months to finish creative work and settle plans, because tradition treats a sign's own year as one for caution, not celebration.",
        "Monkey": "The Monkey is neutral. Ideas come easily to the Monkey in a quick year; the usual watch-out is scattering energy across too many of them. Write the ideas down and choose one to finish before February.",
        "Rooster": "The Rooster is neutral. Its eye for detail is valuable in a year when many people move fast and skip steps. Be the one who checks, but don't let precision turn into criticism of people who work faster than you.",
        "Dog": "The Dog shares the Horse's triangle with the Tiger, so the year is traditionally supportive. Loyalty is the Dog's core trait, and a year of movement brings chances both to help friends and to be helped. Accept help as readily as you offer it.",
        "Pig": "The Pig is neutral. A sign that values comfort and sincerity may feel pushed to speed up in a hurried year. Keep the generous habits, but be careful with money promises made in someone else's excitement.",
    },
    guide="Read the full {a} guide",
    el_h="What your birth element adds",
    el_p="Your birth year also has an element, and tradition compares it with the year's Fire. The relations below are the same ones the Business Partner calculator uses. Check your element with the <a href=\"/checker\">Zodiac Checker</a>.",
    el_th=["Your element", "Relation to Fire", "Traditional reading"],
    el_rows=[
        ("Wood (years ending in 4, 5)", "Wood feeds Fire", "You give energy to the year: generous, but easy to wear yourself out."),
        ("Fire (6, 7)", "Same element", "The year matches your own pace: comfortable, with little to slow you down."),
        ("Earth (8, 9)", "Fire feeds Earth", "The year supports you: a traditionally steady combination."),
        ("Metal (0, 1)", "Fire restrains Metal", "You may feel pressure from the year; structure and patience help."),
        ("Water (2, 3)", "Water restrains Fire", "You push against the year's heat; expect friction, and pick your battles."),
    ],
    other_h="Other traditions you may come across",
    other=[
        "Chinese almanacs list more relations than this site uses. Many add a “harm” between Ox and Horse and a “break” between Rabbit and Horse. They also call a Horse year a “self-punishment” year for Horses. Our calculators do not score these rules; they are here so you recognise them when other sites mention them.",
        "Signs in conflict with the year are said to “offend Tai Sui”, the deity of the year. In Chinese communities many people visit a temple near Lunar New Year to pay respects. That is a custom, not a requirement, and nothing on this site depends on it.",
    ],
    km_h="If you follow the Khmer calendar",
    km_p="In Cambodia the animal year changes at Khmer New Year in mid-April, not at Chinese New Year. So someone born on 1 March 2026 is a Horse in the Chinese zodiac but still a Snake in Khmer reckoning. <a href=\"/blog/khmer-new-year-animal-year\">Khmer New Year and the animal year</a> explains both calendars, with a checker.",
    next_h="What changes on 6 February 2027",
    next_p="The Fire Goat year begins. By the same rules, the Goat enters its own year. The Rabbit and the Pig share its triangle. The Horse becomes the six-harmony partner. The Ox, directly opposite the Goat, has its clash year.",
    end_h="Next steps",
    end=[("/checker", "Find your exact sign and element (it matters if you were born in January or February)"), ("/compatibility", "Compare two birth dates"), ("/blog/five-elements-explained", "How the five elements work"), ("/blog/zodiac-compatibility-guide", "Triangles, six harmony pairs and clashes explained")],
    disc="These notes describe traditional cultural interpretations for reflection and entertainment. They are not predictions, and they are not financial, medical or relationship advice.",
    src_h="Source",
)

T["km"] = dict(
    h1="ឆ្នាំមមីភ្លើង 2026៖ អត្ថន័យសម្រាប់រាសីនីមួយៗ",
    lead="ឆ្នាំ 2026 ជា<strong>ឆ្នាំមមីភ្លើង</strong>តាមរាសីចិន។ វាចាប់ផ្តើមនៅថ្ងៃ<strong>17 កុម្ភៈ 2026</strong> ហើយបញ្ចប់នៅថ្ងៃ<strong>5 កុម្ភៈ 2027</strong>។ ឆ្នាំមមែភ្លើងចាប់ផ្តើមនៅថ្ងៃបន្ទាប់។ អត្ថបទនេះពន្យល់ពីអត្ថន័យនៃ «មមីភ្លើង» របៀបដែលរាសីទាំង 12 ទាក់ទងនឹងឆ្នាំមមីតាមប្រពៃណី អ្វីដែលធាតុកំណើតរបស់អ្នកបន្ថែម និងអ្វីដែលផ្លាស់ប្តូរនៅខែកុម្ភៈ 2027។",
    facts=[("ឆ្នាំរាសី", "មមីភ្លើង (ប៊ីង-អ៊ូ) ឆ្នាំយ៉ាង"), ("ចាប់ផ្តើម", "17 កុម្ភៈ 2026"), ("បញ្ចប់", "5 កុម្ភៈ 2027"), ("ឆ្នាំបន្ទាប់", "មមែភ្លើង ចាប់ពី 6 កុម្ភៈ 2027")],
    meaning_h="អត្ថន័យនៃឆ្នាំមមីភ្លើង",
    meaning=[
        "ឆ្នាំរាសីនីមួយៗផ្គូផ្គងសត្វមួយក្នុងចំណោម 12 ជាមួយធាតុមួយក្នុងចំណោម 5 ដូច្នេះគូនីមួយៗវិលមកវិញរៀងរាល់ 60 ឆ្នាំម្តង។ ឆ្នាំមមីភ្លើងចុងក្រោយគឺឆ្នាំ 1966 ហើយលើកក្រោយគឺឆ្នាំ 2086។ តាមឈ្មោះប្រពៃណី ឆ្នាំ 2026 គឺ <em>ប៊ីង-អ៊ូ</em>៖ <em>ប៊ីង</em> ជាដើមភ្លើងយ៉ាង ហើយ <em>អ៊ូ</em> ជាមែកមមី ដែលតាមប្រពៃណីក៏ភ្ជាប់នឹងភ្លើង និងរដូវក្តៅកណ្តាលឆ្នាំដែរ។ ភ្លើងទ្វេដងនេះហើយ ដែលធ្វើឱ្យគេពិពណ៌នាឆ្នាំនេះថា លឿន ភ្លឺស្វាង និងមិនសូវអត់ធ្មត់។",
        f"មមីភ្លើងក៏មានរឿងព្រេងដែរ។ នៅប្រទេសជប៉ុន ជំនឿថាក្មេងស្រីដែលកើតក្នុងឆ្នាំមមីភ្លើងនឹងរឹងរូស និងគ្មានសំណាងក្នុងអាពាហ៍ពិពាហ៍ បាននាំឱ្យកំណើតទារកធ្លាក់ចុះខ្លាំងក្នុងឆ្នាំ 1966 (<a href=\"{SRC}\" rel=\"noopener\">Randal Olson</a>)។ នេះបង្ហាញថាមនុស្សឲ្យតម្លៃស្លាកទាំងនេះខ្លាំងប៉ុណ្ណា ហើយហេតុអ្វីបានជាគេហទំព័រនេះចាត់ទុកវាជាវប្បធម៌ មិនមែនជាការទស្សន៍ទាយ៖ គ្មានភស្តុតាងថាឆ្នាំកំណើតកំណត់បុគ្គលិកលក្ខណៈ ឬសំណាងទេ។",
    ],
    signs_h="របៀបដែលរាសីនីមួយៗទាក់ទងនឹងឆ្នាំមមី",
    signs_p="ទំនាក់ទំនងខាងក្រោមប្រើច្បាប់ដូចគ្នានឹងម៉ាស៊ីនគណនារបស់គេហទំព័រ។ រាសីក្នុងក្រុមបីរបស់មមី (ខាល មមី ច) ត្រូវបានគាំទ្រតាមប្រពៃណី។ មមែ ជាដៃគូ «ចុះសម្រុងទាំងប្រាំមួយ» របស់មមី។ ជូត នៅទល់មុខមមីផ្ទាល់ គឺជាការប៉ះទង្គិចនៃឆ្នាំ។ មមីខ្លួនឯងស្ថិតក្នុងឆ្នាំរបស់ខ្លួន។ រាសីផ្សេងទៀតគឺធម្មតា។ បន្ទាប់មក កំណត់ចំណាំនីមួយៗមើលពីរបៀបដែលចំណុចខ្លាំង និងចំណុចគួរប្រយ័ត្នរបស់រាសីអ្នក ជួបនឹងឆ្នាំដែលលឿន និងពោរពេញដោយថាមពល។",
    rel={"own": "ឆ្នាំរបស់ខ្លួន", "tri": "ក្រុមបីតែមួយ", "six": "ចុះសម្រុងទាំងប្រាំមួយ", "clash": "ប៉ះទង្គិច", "neutral": "ធម្មតា"},
    signs={
        "Rat": "ជូតនៅទល់មុខមមីផ្ទាល់ ដូច្នេះឆ្នាំ 2026 ជាឆ្នាំប៉ះទង្គិចរបស់វា។ តាមប្រពៃណី ការប៉ះទង្គិចមានន័យថាចលនា និងការកកិត៖ ផែនការត្រូវរៀបចំឡើងវិញ ហើយរបៀបប្រុងប្រយ័ត្ន និងគិតគូររបស់ជូត ផ្ទុយនឹងឆ្នាំដែលផ្តល់រង្វាន់ដល់សកម្មភាពរហ័ស។ ការអានជាក់ស្តែងគឺ ទុកពេលបន្ថែមក្នុងកាលវិភាគ ពិនិត្យកិច្ចព្រមព្រៀងមុនចុះហត្ថលេខា ហើយកុំយកការផ្លាស់ប្តូរភ្លាមៗមកធ្វើជាបញ្ហាផ្ទាល់ខ្លួន។",
        "Ox": "ឆ្លូវជាធម្មតាចំពោះឆ្នាំមមី ក្នុងប្រព័ន្ធរបស់គេហទំព័រនេះ។ ឆ្លូវទទួលជោគជ័យដោយការងារនឹងនរ និងអត់ធ្មត់ ហើយឆ្នាំមមីដែលលឿនប្រហែលជាមិនផ្តល់រង្វាន់ដល់ការងារនោះឆាប់ដូចដែលគួរ។ បន្តការងារនឹងនរ ប៉ុន្តែត្រូវនិយាយឱ្យច្បាស់ពីអ្វីដែលអ្នកត្រូវការ៖ ការលីបន្ទុកដោយស្ងាត់ៗ គឺជាកន្លែងដែលការយល់ច្រឡំចាប់ផ្តើម។",
        "Tiger": "ខាលស្ថិតក្នុងក្រុមបីតែមួយជាមួយមមី ដូច្នេះតាមប្រពៃណី ឆ្នាំ 2026 ជាឆ្នាំមួយដែលស្រួលសម្រាប់វា ហើយថាមពលនៃឆ្នាំនេះសមនឹងចំណង់ធ្វើរឿងធំៗរបស់ខាល។ ចំណុចគួរប្រយ័ត្នរបស់ខាល គឺធ្វើមុនពិនិត្យ ដែលកាន់តែខ្លាំងក្នុងឆ្នាំលឿន។ សម្រេចចិត្តឱ្យលឿនបើចាំបាច់ ប៉ុន្តែត្រូវពិនិត្យឱ្យយឺតៗ។",
        "Rabbit": "ថោះជាធម្មតានៅទីនេះ។ រាសីដែលចូលចិត្តភាពស្ងប់ និងសុខដុមរមនា អាចនឿយហត់នឹងឆ្នាំដែលអ៊ូអរ និងលឿន។ រក្សាពេលស្ងប់ស្ងាត់ខ្លះ ទទួលការងារឱ្យតិច ហើយកុំឱ្យបំណងចៀសវាងជម្លោះ ធ្វើឱ្យរឿងសំខាន់ៗមិនត្រូវបាននិយាយ។",
        "Dragon": "រោងគ្មានចំណងពិសេស ឬការប៉ះទង្គិចជាមួយមមីទេ។ រាសីពីរដែលមានថាមពលខ្លាំងជួបគ្នា៖ ល្បឿននៃឆ្នាំសមនឹងមហិច្ឆតារបស់រោង ហើយនោះក៏ជារបៀបដែលវាទទួលការងារច្រើនពេក។ ជ្រើសគោលដៅមួយដែលសំខាន់បំផុតសម្រាប់ពេលនៅសល់នៃឆ្នាំ ហើយវាស់វឌ្ឍនភាពធៀបនឹងគោលដៅនោះ មិនមែនធៀបនឹងអ្នកដទៃទេ។",
        "Snake": "ម្សាញ់ជាធម្មតា ហើយរបៀបគិតពិចារណារបស់វាផ្ទុយពីល្បឿននៃឆ្នាំ។ នោះអាចជាគុណសម្បត្តិ៖ ពេលអ្នកដទៃប្រញាប់ ទម្លាប់គិតមុនធ្វើរបស់ម្សាញ់ ចាប់កំហុសបាន។ ចំណុចគួរប្រយ័ត្នគឺរង់ចាំយូរពេក រហូតឱកាសកន្លងផុត។ កំណត់ថ្ងៃផុតកំណត់សម្រាប់ការសម្រេចចិត្តរបស់អ្នក។",
        "Horse": "ឆ្នាំ 2026 ជាឆ្នាំរបស់មមីខ្លួនឯង ដែលភាសាចិនហៅថា <em>ប៉េនមីងញៀន</em>។ មនុស្សជាច្រើនគិតថាឆ្នាំរបស់ខ្លួនជាឆ្នាំសំណាង ប៉ុន្តែប្រពៃណីចាត់ទុកវាជាឆ្នាំដែលត្រូវប្រុងប្រយ័ត្ន ហើយមនុស្សជាច្រើនពាក់អ្វីមួយពណ៌ក្រហមដើម្បីការពារ។ ឆ្នាំនេះដាក់ភាពមិនស្ងប់របស់មមីឱ្យលេចធ្លោ ដូច្នេះត្រូវបញ្ចប់អ្វីដែលអ្នកចាប់ផ្តើម មុននឹងដេញតាមរឿងថ្មី។",
        "Goat": "មមែជាដៃគូចុះសម្រុងទាំងប្រាំមួយរបស់មមី ជាគូដែលជួយគាំទ្រ ហើយវានឹងក្លាយជារាសីគ្រប់គ្រងឆ្នាំនៅថ្ងៃ 6 កុម្ភៈ 2027។ ប្រើខែដែលនៅសល់ដើម្បីបញ្ចប់ការងារច្នៃប្រឌិត និងរៀបចំផែនការ ព្រោះប្រពៃណីចាត់ទុកឆ្នាំរបស់ខ្លួនជាឆ្នាំដែលត្រូវប្រុងប្រយ័ត្ន មិនមែនជាឆ្នាំអបអរទេ។",
        "Monkey": "វកជាធម្មតា។ គំនិតមកដល់វកយ៉ាងងាយក្នុងឆ្នាំលឿន ចំណុចគួរប្រយ័ត្នធម្មតាគឺបែងចែកថាមពលទៅលើគំនិតច្រើនពេក។ សរសេរគំនិតទុក ហើយជ្រើសមួយដើម្បីបញ្ចប់មុនខែកុម្ភៈ។",
        "Rooster": "រកាជាធម្មតា។ ភ្នែកមើលលម្អិតរបស់វាមានតម្លៃណាស់ ក្នុងឆ្នាំដែលមនុស្សជាច្រើនធ្វើលឿន ហើយរំលងជំហាន។ ធ្វើជាអ្នកពិនិត្យ ប៉ុន្តែកុំឱ្យភាពហ្មត់ចត់ក្លាយជាការរិះគន់អ្នកដែលធ្វើការលឿនជាងអ្នក។",
        "Dog": "ចស្ថិតក្នុងក្រុមបីរបស់មមីជាមួយខាល ដូច្នេះតាមប្រពៃណី ឆ្នាំនេះជួយគាំទ្រ។ ភាពស្មោះត្រង់ជាលក្ខណៈស្នូលរបស់ច ហើយឆ្នាំនៃចលនានាំមកនូវឱកាសទាំងជួយមិត្តភក្តិ និងទទួលជំនួយ។ ទទួលជំនួយឱ្យងាយដូចដែលអ្នកផ្តល់ឱ្យអ្នកដទៃ។",
        "Pig": "កុរជាធម្មតា។ រាសីដែលឲ្យតម្លៃភាពសុខស្រួល និងភាពស្មោះស អាចមានអារម្មណ៍ថាត្រូវគេជំរុញឱ្យប្រញាប់ក្នុងឆ្នាំដែលមមាញឹក។ រក្សាទម្លាប់ចិត្តទូលាយ ប៉ុន្តែត្រូវប្រយ័ត្នជាមួយការសន្យាពីលុយកាក់ ដែលធ្វើឡើងក្នុងពេលអ្នកដទៃកំពុងរំភើប។",
    },
    guide="អានមគ្គុទ្ទេសក៍ឆ្នាំ{a}ពេញលេញ",
    el_h="អ្វីដែលធាតុកំណើតរបស់អ្នកបន្ថែម",
    el_p="ឆ្នាំកំណើតរបស់អ្នកក៏មានធាតុដែរ ហើយប្រពៃណីប្រៀបធៀបវាជាមួយភ្លើងនៃឆ្នាំនេះ។ ទំនាក់ទំនងខាងក្រោមដូចគ្នានឹងអ្វីដែលម៉ាស៊ីនគណនាដៃគូអាជីវកម្មប្រើ។ ពិនិត្យធាតុរបស់អ្នកជាមួយ<a href=\"/checker\">ម៉ាស៊ីនពិនិត្យរាសី</a>។",
    el_th=["ធាតុរបស់អ្នក", "ទំនាក់ទំនងនឹងភ្លើង", "ការបកស្រាយតាមប្រពៃណី"],
    el_rows=[
        ("ឈើ (ឆ្នាំបញ្ចប់ដោយ 4, 5)", "ឈើចិញ្ចឹមភ្លើង", "អ្នកផ្តល់ថាមពលដល់ឆ្នាំ៖ ចិត្តទូលាយ ប៉ុន្តែងាយហត់នឿយ។"),
        ("ភ្លើង (6, 7)", "ធាតុដូចគ្នា", "ឆ្នាំនេះស៊ីនឹងល្បឿនរបស់អ្នក៖ ស្រួល ហើយមានអ្វីតិចតួចដែលធ្វើឱ្យអ្នកយឺត។"),
        ("ដី (8, 9)", "ភ្លើងចិញ្ចឹមដី", "ឆ្នាំនេះគាំទ្រអ្នក៖ ជាគូដែលនឹងនរតាមប្រពៃណី។"),
        ("លោហធាតុ (0, 1)", "ភ្លើងគ្រប់គ្រងលោហធាតុ", "អ្នកអាចមានអារម្មណ៍ថាមានសម្ពាធពីឆ្នាំ៖ របៀបរៀបរយ និងការអត់ធ្មត់ជួយបាន។"),
        ("ទឹក (2, 3)", "ទឹកគ្រប់គ្រងភ្លើង", "អ្នករុញទល់នឹងកម្តៅនៃឆ្នាំ៖ រំពឹងថានឹងមានការកកិត ហើយជ្រើសរើសរឿងដែលត្រូវតស៊ូ។"),
    ],
    other_h="ប្រពៃណីផ្សេងទៀតដែលអ្នកអាចជួប",
    other=[
        "សៀវភៅប្រតិទិនចិនរាយទំនាក់ទំនងច្រើនជាងគេហទំព័រនេះប្រើ។ ជាច្រើនបន្ថែម «ការធ្វើបាប» រវាងឆ្លូវ និងមមី និង «ការបំបែក» រវាងថោះ និងមមី។ ពួកគេក៏ហៅឆ្នាំមមីថាជាឆ្នាំ «ដាក់ទោសខ្លួនឯង» សម្រាប់មមីដែរ។ ម៉ាស៊ីនគណនារបស់យើងមិនគិតពិន្ទុតាមច្បាប់ទាំងនេះទេ។ យើងដាក់វានៅទីនេះ ដើម្បីឱ្យអ្នកស្គាល់វា ពេលគេហទំព័រផ្សេងលើកឡើង។",
        "រាសីដែលប៉ះទង្គិចនឹងឆ្នាំ ត្រូវបានគេនិយាយថា «ប្រឆាំងនឹងតៃស៊ុយ» ដែលជាទេវតានៃឆ្នាំ។ ក្នុងសហគមន៍ចិន មនុស្សជាច្រើនទៅវត្តនៅជិតបុណ្យចូលឆ្នាំចិន ដើម្បីគោរពបូជា។ នោះជាទំនៀមទម្លាប់ មិនមែនជាកាតព្វកិច្ចទេ ហើយគ្មានអ្វីនៅលើគេហទំព័រនេះពឹងលើវាទេ។",
    ],
    km_h="ប្រសិនបើអ្នកប្រើប្រតិទិនខ្មែរ",
    km_p="នៅកម្ពុជា ឆ្នាំសត្វប្តូរនៅពេលចូលឆ្នាំខ្មែរ ពាក់កណ្តាលខែមេសា មិនមែននៅពេលចូលឆ្នាំចិនទេ។ ដូច្នេះអ្នកដែលកើតនៅថ្ងៃ 1 មីនា 2026 ជាមមីតាមរាសីចិន ប៉ុន្តែនៅតែជាម្សាញ់តាមការរាប់របស់ខ្មែរ។ អត្ថបទ <a href=\"/blog/khmer-new-year-animal-year\">ចូលឆ្នាំខ្មែរ និងឆ្នាំសត្វ</a> ពន្យល់ប្រតិទិនទាំងពីរ ជាមួយម៉ាស៊ីនពិនិត្យ។",
    next_h="អ្វីដែលផ្លាស់ប្តូរនៅថ្ងៃ 6 កុម្ភៈ 2027",
    next_p="ឆ្នាំមមែភ្លើងចាប់ផ្តើម។ តាមច្បាប់ដដែល មមែចូលឆ្នាំរបស់ខ្លួន។ ថោះ និងកុរ ស្ថិតក្នុងក្រុមបីរបស់វា។ មមីក្លាយជាដៃគូចុះសម្រុងទាំងប្រាំមួយ។ ឆ្លូវ ដែលនៅទល់មុខមមែផ្ទាល់ មានឆ្នាំប៉ះទង្គិចរបស់ខ្លួន។",
    end_h="ជំហានបន្ទាប់",
    end=[("/checker", "ស្វែងរករាសី និងធាតុពិតប្រាកដរបស់អ្នក (សំខាន់ ប្រសិនបើអ្នកកើតក្នុងខែមករា ឬកុម្ភៈ)"), ("/compatibility", "ប្រៀបធៀបថ្ងៃកំណើតពីរ"), ("/blog/five-elements-explained", "របៀបដែលធាតុទាំងប្រាំដំណើរការ"), ("/blog/zodiac-compatibility-guide", "ពន្យល់ពីក្រុមបី គូចុះសម្រុងទាំងប្រាំមួយ និងការប៉ះទង្គិច")],
    disc="កំណត់ចំណាំទាំងនេះពិពណ៌នាការបកស្រាយតាមវប្បធម៌ប្រពៃណី សម្រាប់ការពិចារណា និងការកម្សាន្ត។ វាមិនមែនជាការទស្សន៍ទាយ ហើយក៏មិនមែនជាដំបូន្មានហិរញ្ញវត្ថុ វេជ្ជសាស្ត្រ ឬទំនាក់ទំនងដែរ។",
    src_h="ប្រភព",
)

T["zh"] = dict(
    h1="2026丙午火马年：对十二生肖各意味着什么",
    lead="2026年是生肖中的<strong>火马年</strong>（丙午年），从<strong>2026年2月17日</strong>开始，到<strong>2027年2月5日</strong>结束，第二天进入火羊年。本文说明“火马”的含义、十二生肖在传统上与马年的关系、你自己的出生五行有什么影响，以及2027年2月会有什么变化。",
    facts=[("生肖年", "火马（丙午），阳年"), ("开始", "2026年2月17日"), ("结束", "2027年2月5日"), ("下一年", "火羊，2027年2月6日起")],
    meaning_h="火马年是什么意思",
    meaning=[
        "每个生肖年都把十二生肖之一与五行之一配在一起，所以同一个组合每60年才出现一次。上一个火马年是1966年，下一个是2086年。按传统干支，2026年是<em>丙午</em>：丙是阳火天干，午是马的地支，传统上也属火、对应仲夏。双重的火，正是人们常说这一年节奏快、明亮又急躁的原因。",
        f"火马也有不少民间说法。在日本，人们相信丙午年出生的女孩性格倔强、婚姻不顺，结果1966年的出生人数大幅下降（<a href=\"{SRC}\" rel=\"noopener\">Randal Olson</a>）。这说明人们曾多么看重这些标签，也说明了本站为什么把它们当作文化而不是预言：没有证据表明出生年份会决定性格或运气。",
    ],
    signs_h="各生肖与马年的关系",
    signs_p="下面的关系与本站计算器使用的规则相同：与马同属三合（虎、马、狗）的生肖在传统上较顺；羊是马的六合对象；鼠与马正好相对，是本年的相冲；马自己则是本命年；其余生肖为普通。每条说明再看看你的生肖常见的优点和需要注意的地方，在节奏快、能量高的一年里会怎样表现。",
    rel={"own": "本命年", "tri": "同属三合", "six": "六合", "clash": "相冲", "neutral": "普通"},
    signs={
        "Rat": "鼠与马正好相对，所以2026年是鼠的相冲之年。传统上，相冲代表变动和摩擦：计划容易被打乱，而鼠谨慎、精于计算的风格，与这一年奖励快速行动的节奏相反。实际一点的理解是：日程留出余地，签约前仔细核对，也不要把突如其来的变化当成针对自己。",
        "Ox": "在本站的体系中，牛与马年关系普通。牛靠稳扎稳打取胜，而快节奏的马年未必能及时回报这种付出。继续踏实做事，但要把自己的需要说出口：默默扛下一切，往往正是误会的开始。",
        "Tiger": "虎与马同属三合，所以2026年在传统上是虎较顺的一年，这一年的能量也符合虎敢作敢为的性格。虎常见的毛病是先行动后核实，在快节奏的一年里会被放大。必要时可以快速决定，但核实要慢一点。",
        "Rabbit": "兔在这里属普通。喜欢安静与和谐的兔，可能会觉得热闹又匆忙的一年很累。给自己留些安静的时间，少接一些事情，也别因为想避免冲突而把重要的话憋在心里。",
        "Dragon": "龙与马既不相合也不相冲。两个能量都很高的生肖相遇：这一年的节奏适合龙的雄心，而这也正是龙容易揽太多事的原因。为今年剩下的时间选定一个最重要的目标，用它来衡量进展，而不是和别人比。",
        "Snake": "蛇属普通，而它深思熟虑的风格与这一年的快节奏正好相反。这可能是优势：别人匆忙时，蛇先想后做的习惯能发现错误。需要注意的是犹豫太久、错过机会，不妨给自己的决定定一个期限。",
        "Horse": "2026年是马的本命年。很多人以为本命年会走运，但传统上本命年反而要多加小心，很多人会穿戴红色的东西来保平安。这一年会放大马好动的性格，所以先把手上的事做完，再去追下一件。",
        "Goat": "羊是马的六合对象，属于互相扶持的组合，并将在2027年2月6日成为当年的生肖。利用剩下的几个月完成创作、定好计划，因为传统上自己的本命年是要谨慎的一年，而不是庆祝的一年。",
        "Monkey": "猴属普通。节奏快的一年里，猴的点子来得很容易，常见的毛病是把精力分散在太多想法上。把想法记下来，选一个在明年二月之前完成。",
        "Rooster": "鸡属普通。在很多人求快、跳过步骤的一年里，鸡注重细节的眼光非常可贵。做那个负责检查的人，但别让严谨变成对做事比你快的人的批评。",
        "Dog": "狗与虎一样和马同属三合，所以这一年在传统上较为顺利。忠诚是狗的核心特质，变动的一年会带来帮助朋友、也被朋友帮助的机会。接受帮助要像给予帮助一样自然。",
        "Pig": "猪属普通。重视安逸与真诚的猪，在匆忙的一年里可能会觉得被催着加快脚步。保持慷慨的习惯，但对别人一时兴起时许下的金钱承诺要小心。",
    },
    guide="阅读完整的属{a}指南",
    el_h="你的出生五行有什么影响",
    el_p="你的出生年份也有五行，传统上会把它与本年的火相比较。下面的关系与商业伙伴计算器使用的相同。可以用<a href=\"/checker\">生肖查询</a>确认你的五行。",
    el_th=["你的五行", "与火的关系", "传统解读"],
    el_rows=[
        ("木（年份尾数4、5）", "木生火", "你在为这一年提供能量：慷慨，但容易把自己累垮。"),
        ("火（6、7）", "同一五行", "这一年与你的节奏一致：舒服自在，很少有东西让你慢下来。"),
        ("土（8、9）", "火生土", "这一年在支持你：传统上是较稳的组合。"),
        ("金（0、1）", "火克金", "你可能会感到这一年带来的压力，有条理和耐心会有帮助。"),
        ("水（2、3）", "水克火", "你在与这一年的热度对抗：难免有摩擦，要懂得取舍。"),
    ],
    other_h="你可能还会看到的其他传统说法",
    other=[
        "中国的通书列出的关系比本站使用的更多。很多通书还加上“丑午相害”和“卯午相破”，并把马年视为属马者的“午午自刑”之年。本站的计算器不计算这些规则；写在这里，是为了你在其他网站看到时能认得。",
        "与当年相冲的生肖被称为“犯太岁”。在华人社区，很多人会在春节前后到庙里拜太岁。这是一种习俗，并非必须，本站的任何内容也不依赖于它。",
    ],
    km_h="如果你按高棉历法",
    km_p="在柬埔寨，生肖年是在四月中旬的高棉新年更换的，而不是在春节。所以2026年3月1日出生的人，按中国生肖属马，按高棉算法却仍然属蛇。<a href=\"/blog/khmer-new-year-animal-year\">高棉新年与生肖年</a>一文介绍了两种历法，并附有查询工具。",
    next_h="2027年2月6日会有什么变化",
    next_p="火羊年开始。按同样的规则：羊进入本命年；兔和猪与羊同属三合；马成为羊的六合对象；与羊正好相对的牛则迎来相冲之年。",
    end_h="下一步",
    end=[("/checker", "查出你确切的生肖和五行（1月或2月出生的人尤其需要）"), ("/compatibility", "比较两个生日"), ("/blog/five-elements-explained", "五行是如何运作的"), ("/blog/zodiac-compatibility-guide", "三合、六合与六冲详解")],
    disc="以上内容介绍的是传统文化解读，供思考和娱乐之用。它们不是预言，也不是财务、医疗或感情方面的建议。",
    src_h="来源",
)


def article(lang):
    t = T[lang]
    nm = (lambda a: a) if lang == "en" else (lambda a: KM[a]) if lang == "km" else (lambda a: ZH[a])
    facts = "".join(f"<div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in t["facts"])
    signs = []
    for a in ORDER:
        r = REL.get(a, "neutral")
        signs.append(f'''  <section class="hy-sign hy-{r}">
    <h3><span>{nm(a)}</span> <small class="hy-tag">{t["rel"][r]}</small></h3>
    <p>{t["signs"][a]}</p>
    <p class="hy-more"><a href="{G(a)}">{t["guide"].format(a=nm(a))} →</a></p>
  </section>''')
    rows = "".join(f"<tr><th scope=\"row\">{a}</th><td>{b}</td><td>{c}</td></tr>" for a, b, c in t["el_rows"])
    nexts = "".join(f'<li><a href="{h}">{x}</a></li>' for h, x in t["end"])
    return f'''<article class="post container hy26">
  <h1>{t["h1"]}</h1>

  <div class="share-row" data-share></div>

  <p class="hy-lead">{t["lead"]}</p>
  <dl class="hy-facts">{facts}</dl>

  <h2>{t["meaning_h"]}</h2>
  {"".join(f"<p>{p}</p>" for p in t["meaning"])}

  <div class="ad-slot">Ad space</div>

  <h2>{t["signs_h"]}</h2>
  <p>{t["signs_p"]}</p>
  <div class="hy-signs">
{chr(10).join(signs)}
  </div>

  <h2>{t["el_h"]}</h2>
  <p>{t["el_p"]}</p>
  <div class="hy-tablewrap"><table class="hy-table"><thead><tr>{"".join(f"<th scope=\"col\">{h}</th>" for h in t["el_th"])}</tr></thead><tbody>{rows}</tbody></table></div>

  <h2>{t["other_h"]}</h2>
  {"".join(f"<p>{p}</p>" for p in t["other"])}

  <h2>{t["km_h"]}</h2>
  <p>{t["km_p"]}</p>

  <h2>{t["next_h"]}</h2>
  <p>{t["next_p"]}</p>

  <h2>{t["end_h"]}</h2>
  <ul class="hy-next">{nexts}</ul>

  <p class="disclaimer">{t["disc"]}</p>
  <p class="hy-src"><strong>{t["src_h"]}:</strong> <a href="{SRC}" rel="noopener">Randal Olson, “Why did so many Japanese families avoid having children in 1966?”</a></p>
</article>'''


html = PAGE.read_text(encoding="utf8")
for lang in ("en", "km", "zh"):
    pat = re.compile(r'(<div data-lang-content="%s">\n)<article class="post container[^"]*">.*?</article>' % lang, re.S)
    assert len(pat.findall(html)) == 1, lang
    html = pat.sub(lambda m: m.group(1) + article(lang), html)

# head: descriptive title / description
TITLE = "2026 Fire Horse Year: What It Means for Each Chinese Zodiac Sign | MyBirthSign"
DESC = "2026 is a Fire Horse year (17 Feb 2026 to 5 Feb 2027). How each of the 12 signs relates to it, what your birth element adds, and what changes in the 2027 Fire Goat year."
html = re.sub(r"<title>.*?</title>", f"<title>{TITLE}</title>", html, count=1)
html = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{DESC}">', html, count=1)
html = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{DESC}">', html, count=1)
html = re.sub(r'<meta property="og:title" content="[^"]*">', '<meta property="og:title" content="2026 Fire Horse Year: What It Means for Each Chinese Zodiac Sign">', html, count=1)
PAGE.write_text(html, encoding="utf8")
print("wrote", PAGE.relative_to(ROOT))
