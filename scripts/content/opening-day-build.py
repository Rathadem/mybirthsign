"""Builds blog/lucky-days-opening-business.html (EN / KM / ZH) on the site's guide design.
The day ratings use the same traditional rules as the site's Daily Fortune: the day's animal (12-day cycle),
the owner's triangle of friends (三合), the six-harmony 'secret friend' (六合) and the clash (opposite sign)."""
import json, html, re
R = "/home/claude/mybirthsign/"
SLUG = "lucky-days-opening-business"
URL = f"https://mybirthsign.com/blog/{SLUG}.html"
AN = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"]
KM = {"Rat":"ជូត","Ox":"ឆ្លូវ","Tiger":"ខាល","Rabbit":"ថោះ","Dragon":"រោង","Snake":"ម្សាញ់","Horse":"មមី","Goat":"មមែ","Monkey":"វក","Rooster":"រកា","Dog":"ច","Pig":"កុរ"}
ZH = {"Rat":"鼠","Ox":"牛","Tiger":"虎","Rabbit":"兔","Dragon":"龙","Snake":"蛇","Horse":"马","Goat":"羊","Monkey":"猴","Rooster":"鸡","Dog":"狗","Pig":"猪"}
TRI = [["Rat","Dragon","Monkey"],["Ox","Snake","Rooster"],["Tiger","Horse","Dog"],["Rabbit","Goat","Pig"]]
SIX = {"Rat":"Ox","Ox":"Rat","Tiger":"Pig","Pig":"Tiger","Rabbit":"Dog","Dog":"Rabbit","Dragon":"Rooster","Rooster":"Dragon","Snake":"Monkey","Monkey":"Snake","Horse":"Goat","Goat":"Horse"}
def tri(a): return [x for t in TRI if a in t for x in t if x != a]
def clash(a): return AN[(AN.index(a) + 6) % 12]
def name(lang, a): return {"en": a, "km": KM[a], "zh": ZH[a]}[lang]
med = lambda a, s=40: f'<img src="../images/business/animals/s144/{a.lower()}.webp" width="{s}" height="{s}" alt="" loading="lazy" decoding="async">'

T = {}
T["en"] = dict(
  eyebrow="Cambodian Traditions",
  h1="Lucky and Unlucky Days to Open a Shop or Business",
  sub="How Cambodian families choose an opening day",
  lead="From asking an achar to checking the owner's zodiac animal, here is how a good opening day is traditionally chosen — plus a tool that finds the favourable days for your sign this month.",
  meta='Published <time datetime="2026-10-17">October 17, 2026</time> · MyBirthSign',
  intro=[
    "In Cambodia, opening a new shop, restaurant or office is rarely done on just any day. Many families believe the first day sets the tone for the business, so they take care to start on a day that feels lucky — and to avoid one that does not.",
    "There is no single rulebook. Different families, regions and communities follow different customs, and many combine more than one. This guide explains the most common ways a good opening day is chosen, what is traditionally avoided, and how you can check the days that suit your own zodiac animal.",
  ],
  waysH="Four ways families choose a good day",
  ways=[
    ("1", "Ask an achar or a hora", "The most traditional way is to ask a respected achar (lay ceremony master at the pagoda) or a hora (Khmer astrologer). They usually ask for the owner's birth date and sometimes the birth time, then suggest a day and an auspicious hour to open the doors."),
    ("2", "Look at the Khmer lunar calendar", "Many people like to begin new things while the moon is waxing (Kaet), because the growing moon stands for growth and increase. Rules differ between families, so the waxing half is a preference rather than a fixed law."),
    ("3", "Match the day to the owner's zodiac animal", "Many Chinese-Cambodian families, and many others too, check the Chinese almanac. Every day has its own animal in a repeating 12-day cycle. A day whose animal is a friend of the owner's sign is favourable; a day that clashes with it is avoided."),
    ("4", "Think about customers too", "Tradition works best alongside common sense: a day when customers can come, a date after payday, good weather for an outdoor stall, and enough time to have everything ready."),
  ],
  rulesH="Which days are lucky — and which are not",
  rules=[
    "<strong>Favourable:</strong> a day whose animal is in the owner's triangle of friends (for example Rat, Dragon and Monkey), or the owner's “secret friend” sign (the six-harmony pair, such as Rat and Ox).",
    "<strong>Avoid:</strong> a day whose animal is directly opposite the owner's sign on the zodiac wheel — the clash day. For a Rat owner that is a Horse day; for a Tiger owner, a Monkey day.",
    "<strong>Neutral:</strong> every other day. It is not unlucky; it just has no special support.",
    "If two partners open the business together, families often look for a day that suits both, or at least one that clashes with neither.",
  ],
  tableH="Favourable and clash days for each owner's sign",
  th=["Owner's sign", "Favourable day animals", "Day to avoid"],
  toolH="Find favourable opening days this month",
  toolP="Choose your zodiac animal (the owner's sign). The list shows the next 30 days in Cambodia, the animal of each day, and the Khmer lunar day. Nothing is saved or sent anywhere.",
  toolLabel="Owner's zodiac animal", toolBtn="Show the next 30 days",
  toolHint="Not sure of your sign? Use the Zodiac Checker first.",
  ceremonyH="A typical opening ceremony",
  ceremony=[
    ("Prepare", "The shop is cleaned and decorated, often with flowers, banana-leaf offerings and fruit. Many families set up a small shrine for the spirit of the land."),
    ("Bless", "Monks are invited to chant blessings in the morning and are offered food. Holy water is sprinkled over the shop, the owners and the goods."),
    ("Open", "At the chosen hour the doors open. Owners often make the first sale to a family member or a friend whose sign suits the business, for good luck."),
  ],
  ceremonyNote="Customs differ from family to family; some keep the ceremony small and private, others invite neighbours and customers.",
  luckyH="Lucky numbers and colours",
  lucky="Some owners also choose a shop number, a sign colour or an opening date that matches the lucky numbers and colours of their zodiac animal. You can find yours on the <a href=\"../checker.html\">Zodiac Checker</a> or your <a href=\"../animals.html\">animal's page</a>.",
  faqH="Frequently Asked Questions",
  faq=[
    ("What is the luckiest day to open a business in Cambodia?", "There is no single luckiest day for everyone. Traditionally it depends on the owner: a day whose animal is in the owner's triangle of friends, or the owner's secret-friend sign, is favourable, and many people also prefer the waxing moon. An achar or hora can suggest a specific day and hour."),
    ("Which day should I avoid?", "The day whose animal clashes with the owner's sign — the sign directly opposite on the zodiac wheel. For example, Rat owners traditionally avoid Horse days."),
    ("Do I need an achar?", "No. Many families do ask one, especially for a big opening, but plenty of owners simply check the zodiac days and the lunar calendar themselves."),
    ("What if two partners have different signs?", "Look for a day that is favourable for at least one partner and clashes with neither. Our Business Partner tool also compares the two signs."),
  ],
  next='Read next: <a href="khmer-new-year-animal-year.html">Khmer New Year and the animal year</a>, <a href="khmer-lunar-calendar-birth-date.html">the Khmer lunar calendar</a>, and our <a href="../business-partner.html">Business Partner compatibility</a> tool.',
  disc="For cultural interest and entertainment, not business or financial advice. A good location, a sound plan and hard work matter more than the date. Traditions differ between families and regions.",
  calc=dict(day="Day animal", lunar="Khmer lunar day", fav="Favourable", avoid="Avoid", neutral="Neutral", own="Your own sign's day", kaet="waxing", roach="waning"),
)
T["km"] = dict(
  eyebrow="ប្រពៃណីខ្មែរ",
  h1="ថ្ងៃល្អ និងថ្ងៃមិនល្អសម្រាប់បើកហាង ឬអាជីវកម្ម",
  sub="របៀបដែលគ្រួសារខ្មែរជ្រើសរើសថ្ងៃបើកហាង",
  lead="ចាប់ពីការសួរអាចារ្យ រហូតដល់ការពិនិត្យឆ្នាំកំណើតរបស់ម្ចាស់ហាង នេះជារបៀបជ្រើសរើសថ្ងៃបើកហាងល្អតាមប្រពៃណី — ព្រមទាំងឧបករណ៍ស្វែងរកថ្ងៃល្អសម្រាប់ឆ្នាំរបស់អ្នកក្នុងខែនេះ។",
  meta='ចុះផ្សាយ <time datetime="2026-10-17">ថ្ងៃទី17 ខែតុលា ឆ្នាំ2026</time> · MyBirthSign',
  intro=[
    "នៅកម្ពុជា ការបើកហាង ភោជនីយដ្ឋាន ឬការិយាល័យថ្មី កម្រធ្វើនៅថ្ងៃណាក៏បានណាស់។ គ្រួសារជាច្រើនជឿថាថ្ងៃដំបូងកំណត់ទិសដៅរបស់អាជីវកម្ម ដូច្នេះពួកគេប្រុងប្រយ័ត្នចាប់ផ្តើមនៅថ្ងៃដែលល្អ — ហើយជៀសវាងថ្ងៃដែលមិនល្អ។",
    "មិនមានច្បាប់តែមួយទេ។ គ្រួសារ តំបន់ និងសហគមន៍ផ្សេងៗធ្វើតាមទំនៀមខុសៗគ្នា ហើយច្រើនរួមបញ្ចូលវិធីច្រើនជាងមួយ។ អត្ថបទនេះពន្យល់ពីវិធីទូទៅបំផុតក្នុងការជ្រើសរើសថ្ងៃបើកហាងល្អ អ្វីដែលគេជៀសវាងតាមប្រពៃណី និងរបៀបពិនិត្យថ្ងៃដែលសមនឹងឆ្នាំកំណើតរបស់អ្នក។",
  ],
  waysH="វិធីបួនយ៉ាងដែលគ្រួសារជ្រើសរើសថ្ងៃល្អ",
  ways=[
    ("1", "សួរអាចារ្យ ឬហោរា", "វិធីបែបប្រពៃណីបំផុតគឺសួរអាចារ្យ ឬហោរាដែលគេគោរព។ ពួកគាត់ជាធម្មតាសួរថ្ងៃខែឆ្នាំកំណើតរបស់ម្ចាស់ហាង ជួនកាលសួរម៉ោងកំណើតផង រួចណែនាំថ្ងៃ និងពេលល្អសម្រាប់បើកទ្វារហាង។"),
    ("2", "មើលប្រតិទិនចន្ទគតិខ្មែរ", "មនុស្សជាច្រើនចូលចិត្តចាប់ផ្តើមអ្វីថ្មីនៅពេលព្រះចន្ទកើត ព្រោះព្រះចន្ទដែលកំពុងភ្លឺឡើងតំណាងឱ្យការរីកចម្រើន។ ទំនៀមខុសគ្នាតាមគ្រួសារ ដូច្នេះថ្ងៃកើតជាការពេញចិត្ត មិនមែនជាច្បាប់ដាច់ខាតទេ។"),
    ("3", "ផ្គូផ្គងថ្ងៃជាមួយឆ្នាំកំណើតម្ចាស់ហាង", "គ្រួសារខ្មែរកាត់ចិនជាច្រើន និងអ្នកផ្សេងទៀតផងដែរ មើលសៀវភៅថ្ងៃល្អចិន។ ថ្ងៃនីមួយៗមានសត្វរបស់វាក្នុងវដ្ត12ថ្ងៃ។ ថ្ងៃដែលសត្វរបស់វាជាមិត្តនឹងឆ្នាំម្ចាស់ហាងគឺល្អ ថ្ងៃដែលឆុងគ្នាត្រូវជៀសវាង។"),
    ("4", "គិតពីអតិថិជនផងដែរ", "ប្រពៃណីដំណើរការល្អបំផុតជាមួយការគិតពិចារណា៖ ថ្ងៃដែលអតិថិជនអាចមកបាន ក្រោយថ្ងៃបើកប្រាក់ខែ អាកាសធាតុល្អសម្រាប់តូបខាងក្រៅ និងពេលវេលាគ្រប់គ្រាន់ដើម្បីរៀបចំអ្វីៗឱ្យរួចរាល់។"),
  ],
  rulesH="ថ្ងៃណាល្អ — ហើយថ្ងៃណាមិនល្អ",
  rules=[
    "<strong>ល្អ៖</strong> ថ្ងៃដែលសត្វរបស់វាស្ថិតក្នុងក្រុមមិត្តភក្តិ (ត្រីកោណ) របស់ម្ចាស់ហាង (ឧទាហរណ៍ ជូត រោង និងវក) ឬឆ្នាំ “មិត្តសម្ងាត់” (គូលក្ខណ៍ ដូចជា ជូត និងឆ្លូវ)។",
    "<strong>ជៀសវាង៖</strong> ថ្ងៃដែលសត្វរបស់វានៅទល់មុខឆ្នាំម្ចាស់ហាងផ្ទាល់លើកង់រាសី — គឺថ្ងៃឆុង។ សម្រាប់ម្ចាស់ឆ្នាំជូត គឺថ្ងៃមមី សម្រាប់ម្ចាស់ឆ្នាំខាល គឺថ្ងៃវក។",
    "<strong>ធម្មតា៖</strong> ថ្ងៃផ្សេងទៀតទាំងអស់។ វាមិនមែនជាថ្ងៃមិនល្អទេ គ្រាន់តែគ្មានការគាំទ្រពិសេស។",
    "ប្រសិនបើដៃគូពីរនាក់បើកអាជីវកម្មជាមួយគ្នា គ្រួសារច្រើនរកថ្ងៃដែលសមនឹងអ្នកទាំងពីរ ឬយ៉ាងហោចណាស់ថ្ងៃដែលមិនឆុងនឹងអ្នកណាម្នាក់។",
  ],
  tableH="ថ្ងៃល្អ និងថ្ងៃឆុងសម្រាប់ឆ្នាំកំណើតម្ចាស់ហាងនីមួយៗ",
  th=["ឆ្នាំម្ចាស់ហាង", "ថ្ងៃសត្វដែលល្អ", "ថ្ងៃត្រូវជៀសវាង"],
  toolH="ស្វែងរកថ្ងៃល្អសម្រាប់បើកហាងក្នុងខែនេះ",
  toolP="ជ្រើសរើសឆ្នាំកំណើតរបស់អ្នក (ឆ្នាំម្ចាស់ហាង)។ បញ្ជីបង្ហាញ30ថ្ងៃខាងមុខនៅកម្ពុជា សត្វនៃថ្ងៃនីមួយៗ និងថ្ងៃតាមចន្ទគតិខ្មែរ។ គ្មានអ្វីត្រូវបានរក្សាទុក ឬផ្ញើទៅណាទេ។",
  toolLabel="ឆ្នាំកំណើតម្ចាស់ហាង", toolBtn="បង្ហាញ30ថ្ងៃខាងមុខ",
  toolHint="មិនប្រាកដពីឆ្នាំរបស់អ្នក? សូមប្រើម៉ាស៊ីនពិនិត្យរាសីជាមុនសិន។",
  ceremonyH="ពិធីបើកហាងជាទូទៅ",
  ceremony=[
    ("រៀបចំ", "ហាងត្រូវបានសម្អាត និងតុបតែង ជាញឹកញាប់ដោយផ្កា បាយសី និងផ្លែឈើ។ គ្រួសារជាច្រើនរៀបចំខ្ទមតូចមួយសម្រាប់អ្នកតា ឬម្ចាស់ទឹកដី។"),
    ("ប្រសិទ្ធិពរ", "និមន្តព្រះសង្ឃមកសូត្រមន្តនៅពេលព្រឹក ហើយប្រគេនចង្ហាន់។ ប្រោះទឹកមន្តលើហាង ម្ចាស់ហាង និងទំនិញ។"),
    ("បើក", "នៅពេលដែលបានជ្រើសរើស ទ្វារហាងត្រូវបានបើក។ ម្ចាស់ហាងជាញឹកញាប់លក់លើកដំបូងឱ្យសាច់ញាតិ ឬមិត្តដែលឆ្នាំកំណើតសមនឹងអាជីវកម្ម ដើម្បីសំណាងល្អ។"),
  ],
  ceremonyNote="ទំនៀមខុសគ្នាតាមគ្រួសារ៖ ខ្លះធ្វើពិធីតូច និងឯកជន ខ្លះទៀតអញ្ជើញអ្នកជិតខាង និងអតិថិជន។",
  luckyH="លេខ និងពណ៌សំណាង",
  lucky="ម្ចាស់ហាងខ្លះក៏ជ្រើសរើសលេខហាង ពណ៌ស្លាកសញ្ញា ឬថ្ងៃបើកដែលត្រូវនឹងលេខ និងពណ៌សំណាងនៃឆ្នាំកំណើតរបស់ពួកគេ។ អ្នកអាចរកមើលរបស់អ្នកនៅលើ<a href=\"../checker.html\">ម៉ាស៊ីនពិនិត្យរាសី</a> ឬ<a href=\"../animals.html\">ទំព័រសត្វរបស់អ្នក</a>។",
  faqH="សំណួរដែលសួរញឹកញាប់",
  faq=[
    ("តើថ្ងៃណាល្អបំផុតសម្រាប់បើកអាជីវកម្មនៅកម្ពុជា?", "មិនមានថ្ងៃល្អបំផុតតែមួយសម្រាប់គ្រប់គ្នាទេ។ តាមប្រពៃណីវាអាស្រ័យលើម្ចាស់ហាង៖ ថ្ងៃដែលសត្វរបស់វាស្ថិតក្នុងក្រុមមិត្តភក្តិរបស់ម្ចាស់ហាង ឬឆ្នាំមិត្តសម្ងាត់ គឺល្អ ហើយមនុស្សជាច្រើនក៏ចូលចិត្តថ្ងៃកើតដែរ។ អាចារ្យ ឬហោរាអាចណែនាំថ្ងៃ និងម៉ោងជាក់លាក់។"),
    ("តើគួរជៀសវាងថ្ងៃណា?", "ថ្ងៃដែលសត្វរបស់វាឆុងនឹងឆ្នាំម្ចាស់ហាង — ឆ្នាំដែលនៅទល់មុខលើកង់រាសី។ ឧទាហរណ៍ ម្ចាស់ឆ្នាំជូតតាមប្រពៃណីជៀសវាងថ្ងៃមមី។"),
    ("តើខ្ញុំត្រូវការអាចារ្យទេ?", "មិនចាំបាច់ទេ។ គ្រួសារជាច្រើនសួរអាចារ្យ ជាពិសេសសម្រាប់ការបើកធំ ប៉ុន្តែម្ចាស់ហាងជាច្រើនគ្រាន់តែពិនិត្យថ្ងៃតាមរាសី និងប្រតិទិនចន្ទគតិដោយខ្លួនឯង។"),
    ("ចុះបើដៃគូពីរនាក់មានឆ្នាំខុសគ្នា?", "រកថ្ងៃដែលល្អសម្រាប់ដៃគូយ៉ាងហោចណាស់ម្នាក់ ហើយមិនឆុងនឹងអ្នកណាម្នាក់។ ឧបករណ៍ដៃគូអាជីវកម្មរបស់យើងក៏ប្រៀបធៀបឆ្នាំទាំងពីរដែរ។"),
  ],
  next='អានបន្ត៖ <a href="khmer-new-year-animal-year.html">ចូលឆ្នាំខ្មែរ និងឆ្នាំសត្វ</a> <a href="khmer-lunar-calendar-birth-date.html">ប្រតិទិនចន្ទគតិខ្មែរ</a> និងឧបករណ៍<a href="../business-partner.html">ភាពសមស្របដៃគូអាជីវកម្ម</a>របស់យើង។',
  disc="សម្រាប់ការស្វែងយល់វប្បធម៌ និងការកម្សាន្ត មិនមែនជាដំបូន្មានអាជីវកម្ម ឬហិរញ្ញវត្ថុទេ។ ទីតាំងល្អ ផែនការច្បាស់ និងការខិតខំ សំខាន់ជាងថ្ងៃ។ ប្រពៃណីខុសគ្នាតាមគ្រួសារ និងតំបន់។",
  calc=dict(day="សត្វនៃថ្ងៃ", lunar="ថ្ងៃចន្ទគតិ", fav="ល្អ", avoid="ជៀសវាង", neutral="ធម្មតា", own="ថ្ងៃឆ្នាំរបស់អ្នកផ្ទាល់", kaet="កើត", roach="រោច"),
)
T["zh"] = dict(
  eyebrow="柬埔寨传统",
  h1="开店或创业的吉日与忌日",
  sub="柬埔寨家庭如何选择开业日",
  lead="从请教阿佳（achar）到查看店主的生肖，下面介绍传统上如何挑选开业吉日——另附一个工具，帮你找出本月适合你生肖的日子。",
  meta='发布于 <time datetime="2026-10-17">2026年10月17日</time> · MyBirthSign',
  intro=[
    "在柬埔寨，开一家新店、餐馆或办公室，很少随便挑一天。许多家庭相信第一天会为生意定下基调，所以会小心地选一个吉利的日子开始——并避开不吉利的日子。",
    "这并没有统一的规则。不同的家庭、地区和社区遵循不同的习俗，很多人还会把几种方法结合起来。本指南介绍最常见的选日方法、传统上要避开什么，以及如何查看适合你自己生肖的日子。",
  ],
  waysH="家庭选择吉日的四种方法",
  ways=[
    ("1", "请教阿佳或星相师", "最传统的方法是请一位受人尊敬的阿佳（achar，寺庙里主持仪式的居士）或星相师（hora）。他们通常会问店主的出生日期，有时还问出生时间，然后建议一个开门营业的日子和吉时。"),
    ("2", "看高棉农历", "许多人喜欢在月亮渐盈（上弦，Kaet）时开始新的事情，因为逐渐变圆的月亮象征成长和增益。各家规矩不同，所以上弦只是一种偏好，并非硬性规定。"),
    ("3", "把日子和店主的生肖对照", "许多柬埔寨华裔家庭，以及其他很多人，会查看中国的通书（黄历）。每一天在12天的循环中都有自己的生肖。当天的生肖与店主生肖相合就是吉日；与之相冲的日子则要避开。"),
    ("4", "也要考虑顾客", "传统最好和常识一起用：选顾客方便来的日子、发薪日之后的日期、适合户外摊位的好天气，以及足够的准备时间。"),
  ],
  rulesH="哪些日子吉利，哪些不吉利",
  rules=[
    "<strong>吉：</strong>当天的生肖与店主同属三合（例如鼠、龙、猴），或是店主的“暗中贵人”生肖（六合，例如鼠与牛）。",
    "<strong>忌：</strong>当天的生肖在生肖轮盘上与店主生肖正好相对——即相冲日。属鼠的店主忌马日；属虎的店主忌猴日。",
    "<strong>平：</strong>其他所有日子。并非不吉，只是没有特别的助力。",
    "如果两位合伙人一起开业，家人通常会找一个对两人都合适的日子，或至少不与任何一人相冲的日子。",
  ],
  tableH="各生肖店主的吉日与冲日",
  th=["店主生肖", "吉利的日子生肖", "要避开的日子"],
  toolH="查找本月的开业吉日",
  toolP="选择你的生肖（店主的生肖）。列表会显示柬埔寨未来30天、每天的生肖以及高棉农历日期。不会保存或发送任何信息。",
  toolLabel="店主生肖", toolBtn="显示未来30天",
  toolHint="不确定自己的生肖？请先使用生肖查询。",
  ceremonyH="典型的开业仪式",
  ceremony=[
    ("准备", "把店铺打扫干净并装饰，常用鲜花、蕉叶供品和水果。许多家庭会设一个小神龛供奉土地神。"),
    ("祈福", "早上请僧侣来诵经祈福，并供养斋饭。在店铺、店主和货物上洒圣水。"),
    ("开门", "在选定的时刻打开店门。店主常把第一笔生意卖给生肖与生意相合的亲友，以求好运。"),
  ],
  ceremonyNote="习俗因家庭而异：有的仪式简单私密，有的会邀请邻居和顾客。",
  luckyH="幸运数字与颜色",
  lucky="有些店主还会选择与自己生肖的幸运数字和颜色相符的门牌号、招牌颜色或开业日期。你可以在<a href=\"../checker.html\">生肖查询</a>或你的<a href=\"../animals.html\">生肖页面</a>上找到自己的幸运数字和颜色。",
  faqH="常见问题",
  faq=[
    ("在柬埔寨开业最吉利的日子是哪天？", "并没有一个对所有人都最吉利的日子。传统上取决于店主：当天生肖与店主同属三合，或是店主的六合生肖，就是吉日；许多人也偏爱上弦月的日子。阿佳或星相师可以建议具体的日子和时辰。"),
    ("应该避开哪一天？", "当天生肖与店主生肖相冲的日子——即在生肖轮盘上正对的生肖。例如，属鼠的店主传统上避开马日。"),
    ("一定要请阿佳吗？", "不一定。许多家庭会请，尤其是大型开业，但也有很多店主只是自己查看生肖日和农历。"),
    ("如果两位合伙人生肖不同怎么办？", "找一个至少对一位合伙人吉利、且不与任何一人相冲的日子。我们的商业伙伴工具也能比较两个生肖。"),
  ],
  next='延伸阅读：<a href="khmer-new-year-animal-year.html">高棉新年与生肖年</a>、<a href="khmer-lunar-calendar-birth-date.html">高棉农历</a>，以及我们的<a href="../business-partner.html">商业伙伴配对</a>工具。',
  disc="仅供文化兴趣与娱乐，并非商业或理财建议。好的地点、可行的计划和努力比日期更重要。传统因家庭和地区而异。",
  calc=dict(day="当日生肖", lunar="高棉农历", fav="吉", avoid="忌", neutral="平", own="你本命生肖的日子", kaet="上弦", roach="下弦"),
)

def body(lang):
    t = T[lang]; o = []
    o.append(f'<div data-lang-content="{lang}">')
    o.append('<article class="post container fe hc kny lod">')
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
            "icons": [["images/business/animals/s144/dragon.webp", name(lang, "Dragon"), "#f6dc9b"], ["images/business/animals/s144/rat.webp", name(lang, "Rat"), "#f6dc9b"], ["images/business/animals/s144/monkey.webp", name(lang, "Monkey"), "#f6dc9b"]],
            "points": [re.sub("<[^>]+>", "", t["rules"][0]), re.sub("<[^>]+>", "", t["rules"][1])]}
    o.append(f'  <div class="share-row" data-share data-share-card="{html.escape(json.dumps(card, ensure_ascii=False), quote=True)}" data-share-url="/blog/{SLUG}.html"></div>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["intro"]) + "</div>")
    o.append(f'  <h2 class="fe-h2">{t["waysH"]}</h2>')
    o.append('  <ol class="lod-ways">' + "".join(f'<li class="zc-box"><span class="lod-num">{n}</span><h3>{h}</h3><p>{p}</p></li>' for n, h, p in t["ways"]) + "</ol>")
    o.append(f'  <h2 class="fe-h2">{t["rulesH"]}</h2>')
    o.append('  <div class="fe-text">' + "".join(f"<p>{p}</p>" for p in t["rules"]) + "</div>")
    o.append(f'  <h2 class="fe-h2">{t["tableH"]}</h2>')
    sep = "、" if lang == "zh" else (" " if lang == "km" else ", ")
    rows = "".join(
        f'<tr><td><span class="lod-sign">{med(a)}{name(lang, a)}</span></td>'
        f'<td>{sep.join(name(lang, x) for x in tri(a) + [SIX[a]])}</td><td>{name(lang, clash(a))}</td></tr>' for a in AN)
    o.append(f'  <div class="klb-table-wrap"><table class="klb-table lod-table"><thead><tr>{"".join(f"<th>{h}</th>" for h in t["th"])}</tr></thead><tbody>{rows}</tbody></table></div>')
    o.append('  <div class="ad-slot">Ad space</div>')
    opts = "".join(f'<option value="{a}">{name(lang, a)}</option>' for a in AN)
    o.append(f'''  <section class="zc-box hc-calc lod-calc" data-lod-calc data-lang="{lang}">
    <h2 class="zc-bh">{t["toolH"]}</h2>
    <p>{t["toolP"]}</p>
    <form class="hc-form" novalidate>
      <label for="lod-sign-{lang}">{t["toolLabel"]}</label>
      <select id="lod-sign-{lang}">{opts}</select>
      <button type="submit" class="fe-btn">{t["toolBtn"]}</button>
    </form>
    <p class="kny-note"><a href="../checker.html">{t["toolHint"]}</a></p>
    <div class="lod-out" aria-live="polite" hidden></div>
  </section>''')
    o.append(f'  <h2 class="fe-h2">{t["ceremonyH"]}</h2>')
    o.append('  <ol class="kny-days">' + "".join(f'<li class="zc-box"><span class="kny-day">{i+1}</span><h3>{h}</h3><p>{p}</p></li>' for i, (h, p) in enumerate(t["ceremony"])) + "</ol>")
    o.append(f'  <p class="kny-note">{t["ceremonyNote"]}</p>')
    o.append(f'  <h2 class="fe-h2">{t["luckyH"]}</h2>')
    o.append(f'  <div class="fe-text"><p>{t["lucky"]}</p></div>')
    o.append(f'  <h2 class="fe-h2">{t["faqH"]}</h2>')
    o.append('  <div class="klb-faq">' + "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in t["faq"]) + "</div>")
    o.append(f'  <div class="fe-text"><p>{t["next"]}</p></div>')
    o.append(f'  <p class="disclaimer">{t["disc"]}</p>')
    o.append("</article>")
    o.append("</div>")
    return "\n".join(o)

CALC_JS = r"""<script src="../js/vendor/momentkh.min.js" defer></script>
<script>
/* Next 30 days for an owner's sign. Day animal: the same 12-day cycle as the Daily Fortune (Julian Day Number,
   Cambodia date). Favourable = triangle of friends, six-harmony friend or own sign; Avoid = clash (opposite sign).
   Khmer lunar day from js/vendor/momentkh.min.js. Nothing is saved or sent. */
document.addEventListener("DOMContentLoaded", function () {
  var AN = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  var TRI = [["Rat","Dragon","Monkey"],["Ox","Snake","Rooster"],["Tiger","Horse","Dog"],["Rabbit","Goat","Pig"]];
  var SIX = {"Rat":"Ox","Ox":"Rat","Tiger":"Pig","Pig":"Tiger","Rabbit":"Dog","Dog":"Rabbit","Dragon":"Rooster","Rooster":"Dragon","Snake":"Monkey","Monkey":"Snake","Horse":"Goat","Goat":"Horse"};
  var NM = { en: null, km: %KM%, zh: %ZH% };
  var S = %S%;
  var EN_WD = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], KM_WD = ["អាទិត្យ","ចន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"], ZH_WD = ["周日","周一","周二","周三","周四","周五","周六"];
  var EN_M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], KM_M = ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
  var KMONTH_EN = ["Migasir","Boss","Meak","Phalkun","Chet","Pisak","Jesth","Asadh","Srap","Phatrabot","Assoch","Kadeuk","Pathamasadh","Tutiyasadh"];
  function today() { var p = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-").map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); }
  function dayAnimal(ms) { var n = Math.floor(ms / 86400000) + 2440588; return AN[(n + 1) % 12]; }
  function rate(owner, d) {
    if (AN[(AN.indexOf(owner) + 6) % 12] === d) return "avoid";
    if (d === owner) return "own";
    if (SIX[owner] === d || TRI.some(function (t) { return t.indexOf(owner) > -1 && t.indexOf(d) > -1; })) return "fav";
    return "neutral";
  }
  document.querySelectorAll("[data-lod-calc]").forEach(function (box) {
    var lang = box.getAttribute("data-lang"), s = S[lang] || S.en, nm = function (a) { return NM[lang] ? NM[lang][a] : a; };
    var form = box.querySelector("form"), sel = box.querySelector("select"), out = box.querySelector(".lod-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var owner = sel.value, M = window.momentkh, t0 = today(), rows = [];
      for (var i = 0; i < 30; i++) {
        var ms = t0 + i * 86400000, dt = new Date(ms), y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1, d = dt.getUTCDate(), wd = dt.getUTCDay();
        var a = dayAnimal(ms), r = rate(owner, a), lunar = "";
        try { if (M) { var k = M.fromGregorian(y, m, d).khmer; lunar = lang === "km" ? k.day + k.moonPhaseName + " ខែ" + k.monthName : lang === "zh" ? (k.moonPhase ? s.roach : s.kaet) + " " + k.day + " · " + KMONTH_EN[k.monthIndex] : k.day + " " + (k.moonPhase ? s.roach : s.kaet) + " · " + KMONTH_EN[k.monthIndex]; } } catch (err) { lunar = ""; }
        var date = lang === "zh" ? m + "月" + d + "日 " + ZH_WD[wd] : lang === "km" ? KM_WD[wd] + " " + d + " " + KM_M[m - 1] : EN_WD[wd] + " " + d + " " + EN_M[m - 1];
        var lab = r === "fav" ? s.fav : r === "avoid" ? s.avoid : r === "own" ? s.fav : s.neutral;
        rows.push('<li class="lod-d lod-' + r + '"><span class="lod-date">' + date + '</span><span class="lod-an"><img src="../images/business/animals/s144/' + a.toLowerCase() + '.webp" width="28" height="28" alt="">' + nm(a) + '</span><span class="lod-lunar">' + lunar + '</span><b class="lod-tag">' + lab + (r === "own" ? " · " + s.own : "") + "</b></li>");
      }
      out.hidden = false;
      out.innerHTML = '<ul class="lod-list">' + rows.join("") + "</ul>";
    });
  });
});
</script>"""

def build():
    src = open(R + "blog/how-to-calculate-zodiac-sign.html").read()
    head, rest = src.split('<div data-lang-content="en">', 1)
    foot = rest[rest.index('<footer class="site-footer">'):]
    foot = foot[:foot.index('<script src="../js/zodiac-data.js" defer></script>') + len('<script src="../js/zodiac-data.js" defer></script>')] + "\n" + \
        CALC_JS.replace("%KM%", json.dumps(KM, ensure_ascii=False)).replace("%ZH%", json.dumps(ZH, ensure_ascii=False)).replace("%S%", json.dumps({l: T[l]["calc"] for l in T}, ensure_ascii=False)) + \
        '\n<script src="../js/khmer-lunar.js" defer></script>\n</body>\n</html>\n'
    t = T["en"]
    title = "Lucky and Unlucky Days to Open a Shop or Business in Cambodian Tradition"
    desc = "How Cambodian families choose a lucky day to open a shop or business: asking an achar, the Khmer lunar calendar, the owner's zodiac animal, clash days to avoid, the opening ceremony and a 30-day finder for your sign."
    head = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)} | MyBirthSign</title>", head, flags=re.S)
    head = head.replace("https://mybirthsign.com/blog/how-to-calculate-zodiac-sign.html", URL)
    head = re.sub(r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + html.escape(title, quote=True), head)
    head = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + html.escape(desc, quote=True), head)
    head = head.replace("https://mybirthsign.com/images/og/calculate-zodiac.jpg", "https://mybirthsign.com/images/og/opening-day.jpg")
    head = head.replace('href="../images/guides/khmer-lunar-wide.webp"', 'href="../images/fortune/hero-night.webp"')
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "headline": title, "description": desc, "image": "https://mybirthsign.com/images/og/opening-day.jpg",
         "datePublished": "2026-10-17", "dateModified": "2026-10-17", "inLanguage": "en", "author": {"@type": "Organization", "name": "MyBirthSign"},
         "publisher": {"@type": "Organization", "name": "MyBirthSign", "url": "https://mybirthsign.com/"}, "mainEntityOfPage": URL},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mybirthsign.com/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mybirthsign.com/blog"},
            {"@type": "ListItem", "position": 3, "name": "Lucky days to open a business"}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub("<[^>]+>", "", a)}} for q, a in t["faq"]]}]}
    head = re.sub(r'<script type="application/ld\+json">.*?</script>', lambda m: '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace("<", "\\u003c") + "</script>", head, flags=re.S)
    out = head + "\n".join(body(l) for l in ("en", "km", "zh")) + "\n\n" + foot
    open(R + f"blog/{SLUG}.html", "w").write(out)
    for l in T:
        if l == "en":
            left = re.findall(r"[ក-៿가-힯]+", json.dumps(T[l], ensure_ascii=False, default=str))
            print("non-English script left in EN text:", left)
    print("wrote", SLUG, len(out))
build()
