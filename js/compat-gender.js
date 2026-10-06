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
      neutral: "សាកល្បងធ្វើបែបនេះ៖ ជួបនិយាយគ្នា ២០ នាទីរៀងរាល់សប្តាហ៍ ដោយមិនប្រើទូរស័ព្ទ។ ពេលគ្មានកម្លាំងទាញគ្នាខ្លាំង ទម្លាប់តូចៗជាប្រចាំគឺជាអ្វីដែលធ្វើឱ្យទំនាក់ទំនងរឹងមាំ។",
      clash: "សាកល្បងធ្វើបែបនេះ៖ ព្រមព្រៀងលើវិធានសាមញ្ញមួយសម្រាប់ពេលឈ្លោះគ្នា ដូចជាកុំសម្រេចចិត្តរឿងធំពេលកំពុងខឹង ហើយផ្អាក ២០ នាទី។ រាសីជំទាស់គ្នាតែងមានភ្លើងច្រើនជាងផែនការដោះស្រាយ។"
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
