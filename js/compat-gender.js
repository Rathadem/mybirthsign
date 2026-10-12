// compat-gender.js — optional "Gender" notes for the Compatibility page (EN + KM).
// Gender never changes the scores (those come from the birth dates). It only adds a
// personal, light-hearted note to the result. NOTE: Khmer text should be reviewed by a native speaker.
const CMP_GENDER = {
  en: {
    label: "Gender (optional)", opts: { "": "Gender (optional)", f: "Female", m: "Male" },
    who: { f: "Woman", m: "Man", n: "" },
    meta: "Gender",
    note: "Optional. It only adds a personal note below; the scores come from the birth dates alone.",
    h: "Gender & Chemistry: Your Personal Notes",
    showH: "How you show love", needH: "What your partner needs",
    cardTitle: "{W} · {AN}", cardTitleN: "{P} · {AN}",
    combo: {
      fm: "A woman and a man, as {A} and {B}. Tradition loves Yin–Yang language for this pairing, but real life is simpler: it comes down to who plans, who gives in first, and whether the small jobs are shared fairly. Make those things explicit and the signs matter far less.",
      ff: "Two women, as {A} and {B}. Zodiac tradition does not change with gender: the animals, elements and polarity read exactly the same. In practice, open talk about feelings and a bit of independent time help closeness from turning into merging.",
      mm: "Two men, as {A} and {B}. The traditional reading is the same for any pair; the animals and elements are what count. Pairs like this often find it helps to say feelings out loud rather than assume they are understood."
    },
    tryIt: {
      same: "Try this: swap your usual jobs for a weekend. When two similar people trade roles, you quickly learn where you are copies of each other and where you are not.",
      triangle: "Try this: plan one thing together that neither of you has done before. You already click; novelty keeps it from turning into routine.",
      neutral: "Try this: a weekly 20-minute check-in with no phones. With no strong pull either way, small regular rituals do the work.",
      clash: "Try this: agree one simple rule for arguments, such as no big decisions when angry and a 20-minute pause. Opposite signs usually have more heat than a plan for handling it."
    },
    show: {
      Rat: "By solving problems and remembering the small details.",
      Ox: "Through steady actions: showing up, fixing things, staying.",
      Tiger: "With big, protective energy and a taste for adventure.",
      Rabbit: "With gentleness, thoughtful gestures and a cosy home.",
      Dragon: "Generously and proudly, often with grand gestures.",
      Snake: "Quietly, with loyalty and deep attention.",
      Horse: "With enthusiasm, humour and spontaneous plans.",
      Goat: "Through care, creativity and sensitivity to your mood.",
      Monkey: "With playfulness, jokes and clever surprises.",
      Rooster: "By looking after the details, the plans and your wellbeing.",
      Dog: "With loyalty and protection, always in your corner.",
      Pig: "With warmth, generosity and good food."
    },
    need: {
      Rat: "Reassurance that their cleverness and effort are noticed.",
      Ox: "Patience and a calm routine; surprises stress them out.",
      Tiger: "Freedom and respect, plus honest, direct talk.",
      Rabbit: "Calm, kind words; harsh arguments hurt them deeply.",
      Dragon: "Admiration, and honest feedback delivered kindly.",
      Snake: "Privacy, trust and time to open up at their own pace.",
      Horse: "Space to roam and a partner who doesn't try to pin them down.",
      Goat: "Gentle encouragement and a sense of security.",
      Monkey: "Fun, mental stimulation and someone who laughs with them.",
      Rooster: "Appreciation for their effort, and feedback that is kind rather than harsh.",
      Dog: "Honesty and proof that they can trust you.",
      Pig: "Appreciation, and a partner who doesn't take their kindness for granted."
    }
  },
  km: {
    label: "ភេទ (ស្រេចចិត្ត)", opts: { "": "ភេទ (ស្រេចចិត្ត)", f: "ស្រី", m: "ប្រុស" },
    who: { f: "ស្រី", m: "ប្រុស", n: "" },
    meta: "ភេទ",
    note: "ស្រេចចិត្ត។ វាគ្រាន់តែបន្ថែមកំណត់ចំណាំផ្ទាល់ខ្លួននៅខាងក្រោម ពិន្ទុគណនាពីថ្ងៃកំណើតប៉ុណ្ណោះ។",
    h: "ភេទ និងគីមីស្នេហា៖ កំណត់ចំណាំផ្ទាល់ខ្លួន",
    showH: "របៀបបង្ហាញក្តីស្រលាញ់", needH: "អ្វីដែលដៃគូត្រូវការ",
    cardTitle: "{W} · {AN}", cardTitleN: "{P} · {AN}",
    combo: {
      fm: "ស្ត្រីម្នាក់ និងបុរសម្នាក់ ជា{A} និង{B}។ ប្រពៃណីចូលចិត្តនិយាយអំពីយិន-យ៉ាងសម្រាប់គូបែបនេះ ប៉ុន្តែជីវិតពិតសាមញ្ញជាងនេះ៖ វាអាស្រ័យលើអ្នកណាជាអ្នករៀបចំផែនការ អ្នកណាចេះបន្ធូរមុន និងថាតើការងារតូចៗត្រូវបានចែករំលែកដោយយុត្តិធម៌ដែរឬទេ។ ប្រសិនបើអ្នកបញ្ជាក់រឿងទាំងនេះឱ្យច្បាស់ រាសីនឹងសំខាន់តិចជាងមុនទៅទៀត។",
      ff: "ស្ត្រីពីរនាក់ ជា{A} និង{B}។ ប្រពៃណីរាសីមិនប្រែប្រួលតាមភេទទេ៖ សត្វ ធាតុ និងយិន-យ៉ាង អានដូចគ្នាទាំងស្រុង។ ក្នុងជីវិតពិត ការនិយាយអំពីអារម្មណ៍ដោយបើកចំហ និងរក្សាពេលវេលាឯករាជ្យខ្លះ ជួយកុំឱ្យភាពជិតស្និទ្ធក្លាយជាការលាយបញ្ចូលគ្នាទាំងស្រុង។",
      mm: "បុរសពីរនាក់ ជា{A} និង{B}។ ការអានតាមប្រពៃណីដូចគ្នាសម្រាប់គូណាក៏ដោយ ដោយសត្វ និងធាតុជារឿងសំខាន់។ គូបែបនេះច្រើនតែឃើញថា ការនិយាយអារម្មណ៍ចេញមកក្រៅជួយបាន ជាជាងសន្មតថាដៃគូយល់ហើយ។"
    },
    tryIt: {
      same: "សាកល្បងធ្វើបែបនេះ៖ ប្តូរការងារធម្មតារបស់គ្នាមួយចុងសប្តាហ៍។ ពេលមនុស្សស្រដៀងគ្នាប្តូរតួនាទី អ្នកនឹងដឹងលឿនថាកន្លែងណាដែលអ្នកដូចគ្នា និងកន្លែងណាដែលមិនដូច។",
      triangle: "សាកល្បងធ្វើបែបនេះ៖ រៀបចំអ្វីមួយរួមគ្នាដែលអ្នកទាំងពីរមិនធ្លាប់ធ្វើ។ អ្នកចុះសម្រុងគ្នារួចហើយ ភាពថ្មីជួយកុំឱ្យវាក្លាយជាទម្លាប់ធម្មតា។",
      neutral: "សាកល្បងធ្វើបែបនេះ៖ ជួបនិយាយគ្នា 20 នាទីរៀងរាល់សប្តាហ៍ ដោយមិនប្រើទូរស័ព្ទ។ ពេលគ្មានកម្លាំងទាញគ្នាខ្លាំង ទម្លាប់តូចៗជាប្រចាំគឺជាអ្វីដែលធ្វើឱ្យទំនាក់ទំនងរឹងមាំ។",
      clash: "សាកល្បងធ្វើបែបនេះ៖ ព្រមព្រៀងលើវិធានសាមញ្ញមួយសម្រាប់ពេលឈ្លោះគ្នា ដូចជាកុំសម្រេចចិត្តរឿងធំពេលកំពុងខឹង ហើយផ្អាក 20 នាទី។ រាសីជំទាស់គ្នាតែងមានភ្លើងច្រើនជាងផែនការដោះស្រាយ។"
    },
    show: {
      Rat: "ដោយជួយដោះស្រាយបញ្ហា និងចងចាំព័ត៌មានតូចៗ។",
      Ox: "តាមរយៈសកម្មភាពស្ថិរភាព៖ មានវត្តមាន ជួសជុល និងស្ថិតនៅក្បែរជានិច្ច។",
      Tiger: "ដោយថាមពលការពារដ៏ធំ និងចូលចិត្តការផ្សងព្រេង។",
      Rabbit: "ដោយភាពទន់ភ្លន់ កាយវិការគិតគូរ និងផ្ទះកក់ក្តៅ។",
      Dragon: "ដោយចិត្តទូលាយ និងមោទនភាព ជាញឹកញាប់ដោយកាយវិការធំៗ។",
      Snake: "ដោយស្ងៀមស្ងាត់ ដោយភាពស្មោះត្រង់ និងការយកចិត្តទុកដាក់ជ្រាលជ្រៅ។",
      Horse: "ដោយភាពរីករាយ ការលេងសើច និងផែនការភ្លាមៗ។",
      Goat: "តាមរយៈការថែទាំ ភាពច្នៃប្រឌិត និងការយល់អារម្មណ៍របស់អ្នក។",
      Monkey: "ដោយភាពរហ័សរហួន ពាក្យកំប្លែង និងការភ្ញាក់ផ្អើលដ៏ឆ្លាត។",
      Rooster: "ដោយយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត ផែនការ និងសុខុមាលភាពរបស់អ្នក។",
      Dog: "ដោយភាពស្មោះត្រង់ និងការការពារ ស្ថិតនៅខាងអ្នកជានិច្ច។",
      Pig: "ដោយភាពកក់ក្តៅ ចិត្តទូលាយ និងម្ហូបឆ្ងាញ់។"
    },
    need: {
      Rat: "ការធានាថាគេមើលឃើញពីភាពឆ្លាតវៃ និងការខិតខំរបស់ខ្លួន។",
      Ox: "ការអត់ធ្មត់ និងទម្លាប់ស្ងប់ស្ងាត់ ព្រោះការភ្ញាក់ផ្អើលធ្វើឱ្យពួកគេតានតឹង។",
      Tiger: "សេរីភាព និងការគោរព ព្រមទាំងការនិយាយត្រង់ៗដោយស្មោះត្រង់។",
      Rabbit: "ពាក្យសម្តីស្ងប់ និងសប្បុរស ព្រោះការឈ្លោះប្រកែកធ្ងន់ៗធ្វើឱ្យពួកគេឈឺចាប់ខ្លាំង។",
      Dragon: "ការកោតសរសើរ និងមតិត្រឡប់ដោយស្មោះត្រង់ ដែលនិយាយដោយសុជីវធម៌។",
      Snake: "ភាពឯកជន ទំនុកចិត្ត និងពេលវេលាដើម្បីបើកចិត្តតាមល្បឿនរបស់ខ្លួន។",
      Horse: "ទំហំសេរីភាព និងដៃគូដែលមិនព្យាយាមចងពួកគេទុក។",
      Goat: "ការលើកទឹកចិត្តដោយទន់ភ្លន់ និងអារម្មណ៍សុវត្ថិភាព។",
      Monkey: "ភាពសប្បាយ ការជំរុញគំនិត និងដៃគូដែលអាចសើចជាមួយពួកគេ។",
      Rooster: "ការកោតសរសើរចំពោះការខិតខំរបស់ពួកគេ និងមតិត្រឡប់ដែលសុភាព មិនធ្ងន់ធ្ងរ។",
      Dog: "ភាពស្មោះត្រង់ និងការធានាថាពួកគេអាចទុកចិត្តអ្នកបាន។",
      Pig: "ការកោតសរសើរ និងដៃគូដែលមិនចាត់ទុកចិត្តល្អរបស់ពួកគេជារឿងធម្មតា។"
    }
  }
};

// Simplified Chinese (zh)
CMP_GENDER.zh = {
  label: "性别（可选）", opts: { "": "性别（可选）", f: "女", m: "男" },
  who: { f: "女", m: "男", n: "" },
  meta: "性别",
  note: "可选。只会在下面加一段个人说明；分数只根据出生日期计算。",
  h: "性别与化学反应：你们的个人说明",
  showH: "你表达爱的方式", needH: "你的伴侣需要什么",
  cardTitle: "{W} · {AN}", cardTitleN: "{P} · {AN}",
  combo: {
    fm: "一女一男，分别属{A}和{B}。传统喜欢用阴阳来形容这样的组合，但现实更简单：关键在于谁来计划、谁先让步，以及日常小事是否分担公平。把这些说清楚，生肖的影响就小多了。",
    ff: "两位女性，分别属{A}和{B}。生肖传统不因性别而改变：生肖、五行和阴阳的解读完全相同。实际上，坦诚地谈感受，再保留一些各自的时间，能让亲密不会变成过度依赖。",
    mm: "两位男性，分别属{A}和{B}。任何组合的传统解读都一样；重要的是生肖和五行。这样的组合常常发现，把感受说出口，比默认对方懂得更有帮助。"
  },
  tryIt: {
    same: "试试这样：找个周末互换平时负责的事情。两个相似的人交换角色时，很快就会发现你们哪里一模一样、哪里不同。",
    triangle: "试试这样：一起计划一件你们都没做过的事。你们本来就很合拍，新鲜感能让关系不变成一成不变。",
    neutral: "试试这样：每周一次 20 分钟不看手机的谈心。没有特别的吸引或摩擦时，小而固定的习惯最有用。",
    clash: "试试这样：约定一条简单的吵架规则，比如生气时不做重大决定，先暂停 20 分钟。相冲的生肖往往热度很高，却缺少处理分歧的方法。"
  },
  show: {
    Rat: "通过解决问题、记住小细节。", Ox: "用稳定的行动：一直在、帮忙修好东西、不离不弃。",
    Tiger: "用强大的保护欲和对冒险的热爱。", Rabbit: "用温柔、贴心的举动和温馨的家。",
    Dragon: "慷慨又自豪，常常用隆重的方式。", Snake: "安静地，用忠诚和深切的关注。",
    Horse: "用热情、幽默和说走就走的计划。", Goat: "用关怀、创意和对你情绪的敏感。",
    Monkey: "用俏皮、玩笑和聪明的惊喜。", Rooster: "照顾好细节、计划和你的身体。",
    Dog: "用忠诚和保护，永远站在你这边。", Pig: "用温暖、慷慨和美食。"
  },
  need: {
    Rat: "需要确认自己的聪明和付出被看见。", Ox: "需要耐心和平稳的日常；突如其来的惊喜会让他们紧张。",
    Tiger: "需要自由和尊重，以及坦诚直接的交流。", Rabbit: "需要平静、温和的话语；激烈的争吵会深深伤到他们。",
    Dragon: "需要欣赏，以及温和而诚实的意见。", Snake: "需要隐私、信任，以及按自己节奏敞开心扉的时间。",
    Horse: "需要自由活动的空间，和不想把他们绑住的伴侣。", Goat: "需要温柔的鼓励和安全感。",
    Monkey: "需要乐趣、思想上的交流，和能一起开怀大笑的人。", Rooster: "需要对他们努力的肯定，以及温和而不严厉的意见。",
    Dog: "需要诚实，以及能证明他们可以信任你。", Pig: "需要欣赏，以及不把他们的善良视为理所当然的伴侣。"
  }
};
