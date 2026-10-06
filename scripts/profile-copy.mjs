// Page wording (EN + KM) for the Year-of-the-<animal> profile pages, other than Tiger and Rat (those live in animal-profile.mjs).
// Everything here restates what js/zodiac-data.js and js/i18n.js already say about each animal (traits, weaknesses, careers), phrased as
// traditional associations. Khmer text is a first draft that needs a native-speaker review.
const MONEY_EN = "Traditional zodiac interpretation only — not financial advice.";
const HEALTH_EN = "General lifestyle interpretation only — not medical advice.";
const MONEY_KM = "ការបកស្រាយតាមប្រពៃណីរាសីប៉ុណ្ណោះ — មិនមែនជាដំបូន្មានហិរញ្ញវត្ថុទេ។";
const HEALTH_KM = "ការបកស្រាយទូទៅប៉ុណ្ណោះ — មិនមែនជាដំបូន្មានវេជ្ជសាស្ត្រទេ។";
const wellEN = "Healthy routines can support overall well-being.";
const wellKM = "ទម្លាប់ល្អអាចជួយគាំទ្រសុខុមាលភាពទូទៅ។";

const mk = (A, en, km) => ({
  en: { eyebrow: "CHINESE ZODIAC", h1: `Year of the ${A}`, moneyNote: MONEY_EN, healthNote: HEALTH_EN, ...en, cards: { ...en.cards, health: [...en.cards.health, wellEN] } },
  km: { eyebrow: "ជោគជតារាសី", moneyNote: MONEY_KM, healthNote: HEALTH_KM, ...km, cards: { ...km.cards, health: [...km.cards.health, wellKM] } },
});

export const EXTRA = {
  Ox: mk("Ox", {
    intro: "People born in the Year of the Ox are traditionally associated with reliability, patience, and steady hard work.",
    ovText: "The Ox is the second animal in the Chinese zodiac and is traditionally associated with reliability, honesty, and persistence.",
    traits: [["shield", "Reliable"], ["compass", "Patient"], ["peak", "Hard-working"], ["star", "Honest"], ["user", "Dependable"], ["spark", "Determined"]],
    cards: {
      strengths: ["Reliable and honest", "Hard-working and disciplined", "Patient and persistent", "Builds success steadily", "Dependable under pressure"],
      challenges: ["Can be stubborn", "Slow to adapt to sudden change", "May find it hard to express feelings", "Can be set in their ways"],
      love: ["Loyal and steady", "Shows care through actions", "Values long-term commitment", "Honest with partners", "Appreciates stability"],
      career: ["Agriculture", "Engineering", "Finance", "Medicine", "Long-term planning"],
      money: ["Tends to save carefully", "Prefers steady, proven paths", "Builds wealth gradually", "Benefits from patience", "Can resist change even when it helps"],
      health: ["Traditional interpretations often associate the Ox with steady, enduring energy.", "Balance steady effort with rest."],
    },
    spiritText: "The Ox traditionally represents reliability, patience, and the strength that comes from steady effort.",
  }, {
    h1: "ឆ្នាំឆ្លូវ",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំឆ្លូវ តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងភាពទុកចិត្តបាន ការអត់ធ្មត់ និងការខិតខំប្រឹងប្រែងជាប់លាប់។",
    ovText: "ឆ្លូវជាសត្វទី២ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយភាពទុកចិត្តបាន ភាពស្មោះត្រង់ និងការតស៊ូ។",
    traits: [["shield", "ទុកចិត្តបាន"], ["compass", "អត់ធ្មត់"], ["peak", "ឧស្សាហ៍ព្យាយាម"], ["star", "ស្មោះត្រង់"], ["user", "ពឹងពាក់បាន"], ["spark", "ចិត្តតាំងមាំ"]],
    cards: {
      strengths: ["ទុកចិត្តបាន និងស្មោះត្រង់", "ឧស្សាហ៍ព្យាយាម និងមានវិន័យ", "អត់ធ្មត់ និងតស៊ូ", "សាងជោគជ័យបន្តិចម្តងៗ", "ពឹងពាក់បានក្នុងពេលមានសម្ពាធ"],
      challenges: ["ជួនកាលរឹងរូស", "យឺតក្នុងការសម្របខ្លួនទៅនឹងការផ្លាស់ប្តូរភ្លាមៗ", "អាចពិបាកបង្ហាញអារម្មណ៍", "អាចជាប់នឹងទម្លាប់ចាស់"],
      love: ["ស្មោះត្រង់ និងមានស្ថិរភាព", "បង្ហាញក្តីស្រលាញ់តាមរយៈសកម្មភាព", "ឲ្យតម្លៃការប្តេជ្ញាចិត្តរយៈពេលវែង", "ស្មោះត្រង់ចំពោះដៃគូ", "ពេញចិត្តស្ថិរភាព"],
      career: ["កសិកម្ម", "វិស្វកម្ម", "ហិរញ្ញវត្ថុ", "វេជ្ជសាស្ត្រ", "ផែនការរយៈពេលវែង"],
      money: ["ជាធម្មតាសន្សំយ៉ាងប្រុងប្រយ័ត្ន", "ចូលចិត្តផ្លូវដែលមានស្ថិរភាព និងបានសាកល្បង", "កសាងទ្រព្យបន្តិចម្តងៗ", "ការអត់ធ្មត់ជួយបាន", "អាចប្រឆាំងការផ្លាស់ប្តូរ ទោះជាមានប្រយោជន៍ក៏ដោយ"],
      health: ["តាមប្រពៃណី ឆ្លូវតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលស្ថិរភាព និងស៊ូទ្រាំ។", "ធ្វើឱ្យមានតុល្យភាពរវាងការខិតខំ និងការសម្រាក។"],
    },
    spiritText: "តាមប្រពៃណី ឆ្លូវតំណាងឱ្យភាពទុកចិត្តបាន ការអត់ធ្មត់ និងកម្លាំងដែលកើតពីការខិតខំជាប់លាប់។",
  }),

  Rabbit: mk("Rabbit", {
    intro: "People born in the Year of the Rabbit are traditionally associated with gentleness, thoughtfulness, and diplomacy.",
    ovText: "The Rabbit is the fourth animal in the Chinese zodiac and is traditionally associated with gentleness, harmony, and diplomacy.",
    traits: [["heart", "Gentle"], ["user", "Thoughtful"], ["compass", "Diplomatic"], ["leaf", "Peaceful"], ["spark", "Graceful"], ["shield", "Careful"]],
    cards: {
      strengths: ["Gentle and thoughtful", "Diplomatic and tactful", "Values harmony", "Skilled at avoiding conflict", "Considerate of others"],
      challenges: ["Can be overly cautious", "May avoid necessary confrontation", "Can be hesitant to take risks", "May hold feelings back"],
      love: ["Caring and attentive", "Values peace at home", "Loyal and gentle", "Dislikes conflict", "Appreciates kindness"],
      career: ["Diplomacy", "Counseling", "Design", "Hospitality", "Working with people"],
      money: ["Tends to be careful", "Prefers security", "Values a calm approach", "Benefits from steady planning", "Can hesitate over bold choices"],
      health: ["Traditional interpretations often associate the Rabbit with a calm, gentle energy.", "Make time for quiet and rest."],
    },
    spiritText: "The Rabbit traditionally represents gentleness, harmony, and the quiet strength of a thoughtful mind.",
  }, {
    h1: "ឆ្នាំថោះ",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំថោះ តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងភាពសុភាពរាបសា ការគិតដល់អ្នកដទៃ និងចេះសន្តិវិធី។",
    ovText: "ថោះជាសត្វទី៤ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយភាពសុភាពរាបសា សុខដុមរមនា និងសន្តិវិធី។",
    traits: [["heart", "សុភាពរាបសា"], ["user", "គិតដល់អ្នកដទៃ"], ["compass", "ចេះសន្តិវិធី"], ["leaf", "សុខសាន្ត"], ["spark", "ទន់ភ្លន់"], ["shield", "ប្រុងប្រយ័ត្ន"]],
    cards: {
      strengths: ["សុភាពរាបសា និងគិតដល់អ្នកដទៃ", "ចេះសន្តិវិធី និងទន់ភ្លន់", "ឲ្យតម្លៃសុខដុមរមនា", "ជំនាញក្នុងការចៀសវាងទំនាស់", "យកចិត្តទុកដាក់ចំពោះអ្នកដទៃ"],
      challenges: ["ជួនកាលប្រុងប្រយ័ត្នខ្លាំងពេក", "អាចចៀសវាងការប្រឈមមុខដែលចាំបាច់", "អាចស្ទាក់ស្ទើរក្នុងការប្រថុយប្រថាន", "អាចលាក់អារម្មណ៍ក្នុងចិត្ត"],
      love: ["យកចិត្តទុកដាក់ និងគិតដល់អ្នកដទៃ", "ឲ្យតម្លៃភាពសុខសាន្តក្នុងគ្រួសារ", "ស្មោះត្រង់ និងទន់ភ្លន់", "មិនចូលចិត្តទំនាស់", "ពេញចិត្តសេចក្តីសប្បុរស"],
      career: ["ការទូត", "ការប្រឹក្សា", "ការរចនា", "សេវាកម្មបដិសណ្ឋារកិច្ច", "ការងារជាមួយមនុស្ស"],
      money: ["ជាធម្មតាប្រុងប្រយ័ត្ន", "ចូលចិត្តសុវត្ថិភាព", "ឲ្យតម្លៃវិធីសាស្ត្រស្ងប់ស្ងាត់", "ផែនការជាប់លាប់ជួយបាន", "អាចស្ទាក់ស្ទើរចំពោះការសម្រេចចិត្តក្លាហាន"],
      health: ["តាមប្រពៃណី ថោះតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលស្ងប់ស្ងាត់ និងទន់ភ្លន់។", "សូមមានពេលស្ងប់ស្ងាត់ និងសម្រាក។"],
    },
    spiritText: "តាមប្រពៃណី ថោះតំណាងឱ្យភាពទន់ភ្លន់ សុខដុមរមនា និងកម្លាំងស្ងប់ស្ងាត់នៃចិត្តដែលគិតពិចារណា។",
  }),

  Dragon: mk("Dragon", {
    intro: "People born in the Year of the Dragon are traditionally associated with confidence, charisma, and ambition.",
    ovText: "The Dragon is the fifth animal in the Chinese zodiac and is traditionally associated with confidence, charisma, and natural leadership.",
    traits: [["star", "Confident"], ["spark", "Charismatic"], ["peak", "Ambitious"], ["crown", "Leader"], ["bolt", "Energetic"], ["gem", "Lucky"]],
    cards: {
      strengths: ["Confident and charismatic", "Ambitious and driven", "Natural leadership", "Draws attention and respect", "Bold and energetic"],
      challenges: ["Can come across as proud", "Impatient with limitations", "May overreach", "Can be hard to advise"],
      love: ["Passionate and generous", "Admired by others", "Values a strong partner", "Loyal when committed", "Needs respect"],
      career: ["Leadership", "Entrepreneurship", "Entertainment", "Real estate", "Taking the lead"],
      money: ["Ambitious about goals", "Draws opportunities", "Comfortable thinking big", "Benefits from patience", "Needs to avoid overreaching"],
      health: ["Traditional interpretations often associate the Dragon with bold, high energy.", "Balance big ambitions with rest."],
    },
    spiritText: "The Dragon traditionally represents confidence, charisma, and the ambition to rise.",
  }, {
    h1: "ឆ្នាំរោង",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំរោង តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងទំនុកចិត្ត ភាពទាក់ទាញ និងមហិច្ឆតា។",
    ovText: "រោងជាសត្វទី៥ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយទំនុកចិត្ត ភាពទាក់ទាញ និងភាពជាអ្នកដឹកនាំតាមធម្មជាតិ។",
    traits: [["star", "ជឿជាក់លើខ្លួន"], ["spark", "ទាក់ទាញ"], ["peak", "មហិច្ឆតាខ្ពស់"], ["crown", "អ្នកដឹកនាំ"], ["bolt", "សកម្ម"], ["gem", "មានសំណាង"]],
    cards: {
      strengths: ["ជឿជាក់លើខ្លួនឯង និងទាក់ទាញ", "មានមហិច្ឆតា និងតាំងចិត្ត", "ជាអ្នកដឹកនាំតាមធម្មជាតិ", "ទាក់ទាញចំណាប់អារម្មណ៍ និងការគោរព", "ក្លាហាន និងសកម្ម"],
      challenges: ["ជួនកាលមើលទៅអំនួត", "អត់ធ្មត់ទាបចំពោះដែនកំណត់", "អាចប៉ងធំពេក", "អាចពិបាកទទួលយោបល់"],
      love: ["ចំណង់ចំណូលចិត្តខ្លាំង និងសប្បុរស", "ត្រូវបានអ្នកដទៃកោតសរសើរ", "ឲ្យតម្លៃដៃគូដែលមានអត្តចរិតរឹងមាំ", "ស្មោះត្រង់ពេលប្តេជ្ញាចិត្ត", "ត្រូវការការគោរព"],
      career: ["ភាពជាអ្នកដឹកនាំ", "ការបង្កើតអាជីវកម្ម", "ការកម្សាន្ត", "អចលនទ្រព្យ", "ការដើរមុនគេ"],
      money: ["មហិច្ឆតាខ្ពស់ចំពោះគោលដៅ", "ទាក់ទាញឱកាស", "ចូលចិត្តគិតធំ", "ការអត់ធ្មត់ជួយបាន", "ត្រូវចៀសវាងការប៉ងធំពេក"],
      health: ["តាមប្រពៃណី រោងតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលខ្ពស់ និងក្លាហាន។", "ធ្វើឱ្យមានតុល្យភាពរវាងមហិច្ឆតាធំៗ និងការសម្រាក។"],
    },
    spiritText: "តាមប្រពៃណី រោងតំណាងឱ្យទំនុកចិត្ត ភាពទាក់ទាញ និងមហិច្ឆតាដើម្បីឈានឡើង។",
  }),

  Snake: mk("Snake", {
    intro: "People born in the Year of the Snake are traditionally associated with wisdom, intuition, and elegance.",
    ovText: "The Snake is the sixth animal in the Chinese zodiac and is traditionally associated with wisdom, intuition, and careful thinking.",
    traits: [["star", "Wise"], ["compass", "Intuitive"], ["spark", "Elegant"], ["shield", "Discreet"], ["peak", "Strategic"], ["leaf", "Calm"]],
    cards: {
      strengths: ["Wise and intuitive", "Elegant and composed", "Deep thinker", "Plans carefully before acting", "Good at reading situations"],
      challenges: ["Can be secretive", "Prone to overthinking", "May be slow to trust", "Can keep distance"],
      love: ["Deeply devoted once committed", "Values privacy", "Thoughtful and attentive", "Needs trust", "Appreciates depth"],
      career: ["Finance", "Research", "Psychology", "Strategy", "Analysis"],
      money: ["Plans carefully", "Good at spotting value", "Prefers calculated moves", "Benefits from long-term thinking", "Can overanalyze choices"],
      health: ["Traditional interpretations often associate the Snake with a calm, reflective energy.", "Balance reflection with movement and rest."],
    },
    spiritText: "The Snake traditionally represents wisdom, intuition, and the grace of careful thought.",
  }, {
    h1: "ឆ្នាំម្សាញ់",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំម្សាញ់ តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងប្រាជ្ញា ញាណ និងភាពសមរម្យ។",
    ovText: "ម្សាញ់ជាសត្វទី៦ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយប្រាជ្ញា ញាណ និងការគិតដិតដល់។",
    traits: [["star", "ឈ្លាសវៃ"], ["compass", "មានញាណ"], ["spark", "សមរម្យ"], ["shield", "ចេះរក្សាការសម្ងាត់"], ["peak", "ចេះគ្រោងយុទ្ធសាស្ត្រ"], ["leaf", "ស្ងប់ស្ងាត់"]],
    cards: {
      strengths: ["ឈ្លាសវៃ និងមានញាណ", "សមរម្យ និងស្ងប់ស្ងាត់", "ជាអ្នកគិតស៊ីជម្រៅ", "គិតដិតដល់មុននឹងធ្វើសកម្មភាព", "ចេះអានស្ថានភាព"],
      challenges: ["ជួនកាលសម្ងាត់ខ្លួន", "ងាយគិតច្រើនពេក", "អាចយឺតក្នុងការទុកចិត្ត", "អាចរក្សាចម្ងាយ"],
      love: ["ឧទ្ទិសខ្លួនយ៉ាងជ្រាលជ្រៅពេលប្តេជ្ញាចិត្ត", "ឲ្យតម្លៃភាពឯកជន", "គិតពិចារណា និងយកចិត្តទុកដាក់", "ត្រូវការទំនុកចិត្ត", "ពេញចិត្តភាពជ្រាលជ្រៅ"],
      career: ["ហិរញ្ញវត្ថុ", "ការស្រាវជ្រាវ", "ចិត្តវិទ្យា", "យុទ្ធសាស្ត្រ", "ការវិភាគ"],
      money: ["គ្រោងផែនការយ៉ាងប្រុងប្រយ័ត្ន", "ចេះមើលឃើញតម្លៃ", "ចូលចិត្តជំហានដែលបានគណនា", "ការគិតរយៈពេលវែងជួយបាន", "អាចវិភាគការសម្រេចចិត្តច្រើនពេក"],
      health: ["តាមប្រពៃណី ម្សាញ់តែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលស្ងប់ស្ងាត់ និងចេះពិចារណា។", "ធ្វើឱ្យមានតុល្យភាពរវាងការពិចារណា ចលនា និងការសម្រាក។"],
    },
    spiritText: "តាមប្រពៃណី ម្សាញ់តំណាងឱ្យប្រាជ្ញា ញាណ និងភាពសមរម្យនៃការគិតដិតដល់។",
  }),

  Horse: mk("Horse", {
    intro: "People born in the Year of the Horse are traditionally associated with energy, independence, and a love of adventure.",
    ovText: "The Horse is the seventh animal in the Chinese zodiac and is traditionally associated with energy, independence, and a love of freedom.",
    traits: [["bolt", "Energetic"], ["compass", "Independent"], ["peak", "Adventurous"], ["spark", "Free-spirited"], ["user", "Sociable"], ["star", "Optimistic"]],
    cards: {
      strengths: ["Energetic and enthusiastic", "Independent and free-spirited", "Loves new experiences", "Adventurous", "Quick to take action"],
      challenges: ["Can be impatient", "May struggle to commit long-term", "Can lose interest quickly", "Dislikes restrictions"],
      love: ["Warm and lively", "Needs freedom and space", "Enjoys shared adventures", "Honest and direct", "Values independence"],
      career: ["Travel", "Sales", "Sports", "Media", "Roles with variety"],
      money: ["Open to new ventures", "Enjoys variety", "Acts quickly on opportunities", "Benefits from steady planning", "Can be impatient with slow gains"],
      health: ["Traditional interpretations often associate the Horse with active, free-spirited energy.", "Balance activity with rest."],
    },
    spiritText: "The Horse traditionally represents energy, independence, and the freedom to move forward.",
  }, {
    h1: "ឆ្នាំមមី",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំមមី តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងថាមពល ឯករាជ្យភាព និងការស្រឡាញ់ដំណើរផ្សងព្រេង។",
    ovText: "មមីជាសត្វទី៧ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពល ឯករាជ្យភាព និងការស្រឡាញ់សេរីភាព។",
    traits: [["bolt", "ពោរពេញដោយថាមពល"], ["compass", "ឯករាជ្យ"], ["peak", "ចូលចិត្តផ្សងព្រេង"], ["spark", "ចិត្តសេរី"], ["user", "ចូលចិត្តសង្គម"], ["star", "មានសុទិដ្ឋិនិយម"]],
    cards: {
      strengths: ["ពោរពេញដោយថាមពល និងចំណង់ចំណូលចិត្ត", "ឯករាជ្យ និងចិត្តសេរី", "ចូលចិត្តបទពិសោធន៍ថ្មីៗ", "ចូលចិត្តផ្សងព្រេង", "ឆាប់ចាត់វិធានការ"],
      challenges: ["ជួនកាលប្រញាប់ប្រញាល់", "ពិបាកក្នុងការសន្យារយៈពេលវែង", "អាចបាត់ចំណាប់អារម្មណ៍ឆាប់", "មិនចូលចិត្តការរឹតត្បិត"],
      love: ["កក់ក្តៅ និងរស់រវើក", "ត្រូវការសេរីភាព និងកន្លែងផ្ទាល់ខ្លួន", "ចូលចិត្តដំណើរផ្សងព្រេងរួមគ្នា", "ស្មោះត្រង់ និងត្រង់ៗ", "ឲ្យតម្លៃឯករាជ្យភាព"],
      career: ["ការធ្វើដំណើរ", "ការលក់", "កីឡា", "ផ្សព្វផ្សាយ", "តួនាទីដែលមានភាពចម្រុះ"],
      money: ["ចំហចំពោះគម្រោងថ្មី", "ចូលចិត្តភាពចម្រុះ", "ឆាប់ចាប់យកឱកាស", "ផែនការជាប់លាប់ជួយបាន", "អាចអត់ធ្មត់ទាបចំពោះផលចំណេញយឺត"],
      health: ["តាមប្រពៃណី មមីតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលសកម្ម និងចិត្តសេរី។", "ធ្វើឱ្យមានតុល្យភាពរវាងសកម្មភាព និងការសម្រាក។"],
    },
    spiritText: "តាមប្រពៃណី មមីតំណាងឱ្យថាមពល ឯករាជ្យភាព និងសេរីភាពក្នុងការឈានទៅមុខ។",
  }),

  Goat: mk("Goat", {
    intro: "People born in the Year of the Goat are traditionally associated with gentleness, creativity, and compassion.",
    ovText: "The Goat is the eighth animal in the Chinese zodiac and is traditionally associated with gentleness, creativity, and compassion.",
    traits: [["heart", "Gentle"], ["spark", "Creative"], ["user", "Compassionate"], ["star", "Artistic"], ["leaf", "Calm"], ["shield", "Caring"]],
    cards: {
      strengths: ["Gentle and compassionate", "Creative and artistic", "Cares deeply for others", "Calm and kind", "Strong sense of beauty"],
      challenges: ["Can be indecisive", "May depend on others too much", "Can be sensitive to stress", "May avoid decisions"],
      love: ["Tender and devoted", "Needs reassurance", "Values harmony", "Caring and supportive", "Appreciates gentleness"],
      career: ["Art", "Design", "Counseling", "Nonprofit work", "Creative fields"],
      money: ["Values comfort and security", "Enjoys beautiful things", "Benefits from clear plans", "Can hesitate over decisions", "Gains from trusted advice"],
      health: ["Traditional interpretations often associate the Goat with a gentle, sensitive energy.", "Make time for calm routines and rest."],
    },
    spiritText: "The Goat traditionally represents gentleness, creativity, and a caring heart.",
  }, {
    h1: "ឆ្នាំមមែ",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំមមែ តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងភាពសុភាពរាបសា ការច្នៃប្រឌិត និងចិត្តអាណិតអាសូរ។",
    ovText: "មមែជាសត្វទី៨ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយភាពសុភាពរាបសា ការច្នៃប្រឌិត និងចិត្តអាណិតអាសូរ។",
    traits: [["heart", "សុភាពរាបសា"], ["spark", "ច្នៃប្រឌិត"], ["user", "អាណិតអាសូរ"], ["star", "មានសិល្បៈ"], ["leaf", "ស្ងប់ស្ងាត់"], ["shield", "យកចិត្តទុកដាក់"]],
    cards: {
      strengths: ["សុភាពរាបសា និងអាណិតអាសូរ", "ច្នៃប្រឌិត និងមានសិល្បៈ", "យកចិត្តទុកដាក់ចំពោះអ្នកដទៃ", "ស្ងប់ស្ងាត់ និងសប្បុរស", "មានអារម្មណ៍ស្រស់ស្អាតខ្លាំង"],
      challenges: ["ជួនកាលស្ទាក់ស្ទើរក្នុងការសម្រេចចិត្ត", "អាចពឹងផ្អែកលើអ្នកដទៃពេក", "អាចងាយរងផលប៉ះពាល់ពីភាពតានតឹង", "អាចជៀសវាងការសម្រេចចិត្ត"],
      love: ["ទន់ភ្លន់ និងឧទ្ទិសខ្លួន", "ត្រូវការការធានាចិត្ត", "ឲ្យតម្លៃសុខដុមរមនា", "យកចិត្តទុកដាក់ និងគាំទ្រ", "ពេញចិត្តភាពទន់ភ្លន់"],
      career: ["សិល្បៈ", "ការរចនា", "ការប្រឹក្សា", "ការងារសង្គម", "វិស័យច្នៃប្រឌិត"],
      money: ["ឲ្យតម្លៃផាសុកភាព និងសុវត្ថិភាព", "ចូលចិត្តវត្ថុស្រស់ស្អាត", "ផែនការច្បាស់លាស់ជួយបាន", "អាចស្ទាក់ស្ទើរក្នុងការសម្រេចចិត្ត", "ទទួលបានប្រយោជន៍ពីដំបូន្មានអ្នកទុកចិត្ត"],
      health: ["តាមប្រពៃណី មមែតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលទន់ភ្លន់ និងប្រកបដោយអារម្មណ៍។", "សូមមានទម្លាប់ស្ងប់ស្ងាត់ និងការសម្រាក។"],
    },
    spiritText: "តាមប្រពៃណី មមែតំណាងឱ្យភាពទន់ភ្លន់ ការច្នៃប្រឌិត និងបេះដូងដែលយកចិត្តទុកដាក់។",
  }),

  Monkey: mk("Monkey", {
    intro: "People born in the Year of the Monkey are traditionally associated with cleverness, curiosity, and wit.",
    ovText: "The Monkey is the ninth animal in the Chinese zodiac and is traditionally associated with cleverness, curiosity, and quick learning.",
    traits: [["bolt", "Clever"], ["compass", "Curious"], ["spark", "Witty"], ["star", "Creative"], ["user", "Sociable"], ["peak", "Quick learner"]],
    cards: {
      strengths: ["Clever and curious", "Quick learner", "Witty and entertaining", "Creative problem-solver", "Adaptable"],
      challenges: ["Can be mischievous", "May struggle to focus on one thing", "Can get bored easily", "May start more than they finish"],
      love: ["Playful and fun", "Keeps things lively", "Needs mental connection", "Enjoys humor together", "Values honesty"],
      career: ["Technology", "Marketing", "Comedy", "Consulting", "Creative problem-solving"],
      money: ["Spots clever opportunities", "Enjoys new ideas", "Adapts quickly", "Benefits from focus", "Can spread attention too thin"],
      health: ["Traditional interpretations often associate the Monkey with a lively, curious energy.", "Balance curiosity and activity with rest."],
    },
    spiritText: "The Monkey traditionally represents cleverness, curiosity, and a playful, creative mind.",
  }, {
    h1: "ឆ្នាំវក",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំវក តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងភាពឆ្លាតវៃ ការចង់ដឹងចង់ឃើញ និងភាពកំប្លែង។",
    ovText: "វកជាសត្វទី៩ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយភាពឆ្លាតវៃ ការចង់ដឹងចង់ឃើញ និងការសិក្សារហ័ស។",
    traits: [["bolt", "ឆ្លាតវៃ"], ["compass", "ចង់ដឹងចង់ឃើញ"], ["spark", "កំប្លែង"], ["star", "ច្នៃប្រឌិត"], ["user", "ចូលចិត្តសេពគប់"], ["peak", "សិក្សារហ័ស"]],
    cards: {
      strengths: ["ឆ្លាតវៃ និងចង់ដឹងចង់ឃើញ", "សិក្សារហ័ស", "កំប្លែង និងធ្វើឱ្យអ្នកដទៃរីករាយ", "ដោះស្រាយបញ្ហាប្រកបដោយការច្នៃប្រឌិត", "ចេះសម្របខ្លួន"],
      challenges: ["ជួនកាលលេងកំប្លែងពេក", "ពិបាកផ្តោតលើរឿងតែមួយ", "អាចធុញឆាប់", "អាចចាប់ផ្តើមច្រើនជាងបញ្ចប់"],
      love: ["លេងសើច និងសប្បាយរីករាយ", "ធ្វើឱ្យទំនាក់ទំនងរស់រវើក", "ត្រូវការទំនាក់ទំនងផ្នែកគំនិត", "ចូលចិត្តកំប្លែងរួមគ្នា", "ឲ្យតម្លៃភាពស្មោះត្រង់"],
      career: ["បច្ចេកវិទ្យា", "ទីផ្សារ", "កំប្លែង", "ការប្រឹក្សា", "ការដោះស្រាយបញ្ហាប្រកបដោយការច្នៃប្រឌិត"],
      money: ["ចេះមើលឃើញឱកាសឆ្លាតវៃ", "ចូលចិត្តគំនិតថ្មីៗ", "សម្របខ្លួនរហ័ស", "ការផ្តោតអារម្មណ៍ជួយបាន", "អាចចែកការយកចិត្តទុកដាក់ច្រើនពេក"],
      health: ["តាមប្រពៃណី វកតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលរស់រវើក និងចង់ដឹងចង់ឃើញ។", "ធ្វើឱ្យមានតុល្យភាពរវាងការចង់ដឹងចង់ឃើញ សកម្មភាព និងការសម្រាក។"],
    },
    spiritText: "តាមប្រពៃណី វកតំណាងឱ្យភាពឆ្លាតវៃ ការចង់ដឹងចង់ឃើញ និងគំនិតដែលលេងសើច និងច្នៃប្រឌិត។",
  }),

  Rooster: mk("Rooster", {
    intro: "People born in the Year of the Rooster are traditionally associated with observation, hard work, and confidence.",
    ovText: "The Rooster is the tenth animal in the Chinese zodiac and is traditionally associated with observation, diligence, and confidence.",
    traits: [["star", "Observant"], ["peak", "Hard-working"], ["shield", "Confident"], ["compass", "Detail-oriented"], ["crown", "Proud"], ["spark", "Honest"]],
    cards: {
      strengths: ["Observant and detail-oriented", "Hard-working and diligent", "Confident", "Takes pride in good work", "Honest and direct"],
      challenges: ["Can be overly critical", "Can be blunt with others", "May be a perfectionist", "Can be hard to please"],
      love: ["Loyal and dependable", "Honest about feelings", "Values effort", "Protective", "Appreciates a partner who shares standards"],
      career: ["Accounting", "Journalism", "Quality control", "Public speaking", "Detail-focused work"],
      money: ["Careful with details", "Keeps good records", "Works steadily toward goals", "Benefits from budgeting", "Can be critical of spending"],
      health: ["Traditional interpretations often associate the Rooster with a disciplined, routine-loving energy.", "Balance hard work with rest."],
    },
    spiritText: "The Rooster traditionally represents diligence, honesty, and the pride of doing things well.",
  }, {
    h1: "ឆ្នាំរកា",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំរកា តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងការសង្កេត ភាពឧស្សាហ៍ព្យាយាម និងទំនុកចិត្ត។",
    ovText: "រកាជាសត្វទី១០ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយការសង្កេត ភាពឧស្សាហ៍ព្យាយាម និងទំនុកចិត្ត។",
    traits: [["star", "ចេះសង្កេត"], ["peak", "ឧស្សាហ៍ព្យាយាម"], ["shield", "ជឿជាក់លើខ្លួន"], ["compass", "ល្អិតល្អន់"], ["crown", "មានមោទនភាព"], ["spark", "ស្មោះត្រង់"]],
    cards: {
      strengths: ["ចេះសង្កេត និងល្អិតល្អន់", "ឧស្សាហ៍ព្យាយាម និងមានសមត្ថភាព", "ជឿជាក់លើខ្លួនឯង", "មានមោទនភាពចំពោះការងារល្អ", "ស្មោះត្រង់ និងត្រង់ៗ"],
      challenges: ["ជួនកាលរិះគន់ខ្លាំងពេក", "ជួនកាលត្រង់ពេកចំពោះអ្នកដទៃ", "អាចចង់ឱ្យល្អឥតខ្ចោះ", "អាចពិបាកផ្គាប់ចិត្ត"],
      love: ["ស្មោះត្រង់ និងពឹងពាក់បាន", "ស្មោះត្រង់អំពីអារម្មណ៍", "ឲ្យតម្លៃការខិតខំ", "ការពារអ្នកដែលខ្លួនស្រឡាញ់", "ពេញចិត្តដៃគូដែលមានស្តង់ដារដូចគ្នា"],
      career: ["គណនេយ្យ", "សារព័ត៌មាន", "ការត្រួតពិនិត្យគុណភាព", "ការនិយាយជាសាធារណៈ", "ការងារផ្តោតលើព័ត៌មានលម្អិត"],
      money: ["ប្រុងប្រយ័ត្នចំពោះព័ត៌មានលម្អិត", "រក្សាកំណត់ត្រាល្អ", "ខិតខំជាប់លាប់ឆ្ពោះទៅរកគោលដៅ", "ការធ្វើថវិកាជួយបាន", "អាចរិះគន់ការចំណាយ"],
      health: ["តាមប្រពៃណី រកាតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលមានវិន័យ និងចូលចិត្តទម្លាប់។", "ធ្វើឱ្យមានតុល្យភាពរវាងការខិតខំ និងការសម្រាក។"],
    },
    spiritText: "តាមប្រពៃណី រកាតំណាងឱ្យភាពឧស្សាហ៍ព្យាយាម ភាពស្មោះត្រង់ និងមោទនភាពនៃការធ្វើអ្វីឱ្យបានល្អ។",
  }),

  Dog: mk("Dog", {
    intro: "People born in the Year of the Dog are traditionally associated with loyalty, honesty, and a protective nature.",
    ovText: "The Dog is the eleventh animal in the Chinese zodiac and is traditionally associated with loyalty, honesty, and protectiveness.",
    traits: [["heart", "Loyal"], ["star", "Honest"], ["shield", "Protective"], ["user", "Trustworthy"], ["compass", "Principled"], ["spark", "Warm"]],
    cards: {
      strengths: ["Loyal and trustworthy", "Honest and straightforward", "Protective of others", "Stands up for beliefs", "Strong sense of fairness"],
      challenges: ["Can be anxious", "Can be suspicious of new situations", "May worry too much", "Can be stubborn about principles"],
      love: ["Deeply loyal", "Protective of loved ones", "Values honesty", "Needs trust", "Appreciates sincerity"],
      career: ["Law", "Security", "Social work", "Education", "Service to others"],
      money: ["Careful and responsible", "Values security", "Honest in dealings", "Benefits from reassurance", "Can worry about the future"],
      health: ["Traditional interpretations often associate the Dog with a loyal, watchful energy.", "Make time to unwind and relax."],
    },
    spiritText: "The Dog traditionally represents loyalty, honesty, and the courage to protect what matters.",
  }, {
    h1: "ឆ្នាំច",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំច តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងភាពស្មោះត្រង់ ភាពត្រង់ៗ និងចិត្តចង់ការពារអ្នកដទៃ។",
    ovText: "ចជាសត្វទី១១ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយភាពស្មោះត្រង់ ភាពត្រង់ៗ និងការការពារ។",
    traits: [["heart", "ស្មោះត្រង់"], ["star", "ត្រង់ៗ"], ["shield", "ការពារអ្នកដទៃ"], ["user", "ទុកចិត្តបាន"], ["compass", "មានគោលការណ៍"], ["spark", "កក់ក្តៅ"]],
    cards: {
      strengths: ["ស្មោះត្រង់ និងទុកចិត្តបាន", "ត្រង់ៗ និងស្មោះត្រង់", "ការពារអ្នកដទៃ", "ការពារអ្វីដែលខ្លួនជឿជាក់", "មានអារម្មណ៍យុត្តិធម៌ខ្លាំង"],
      challenges: ["ជួនកាលព្រួយបារម្ភ", "ជួនកាលសង្ស័យស្ថានភាពថ្មីពេក", "អាចបារម្ភច្រើន", "អាចរឹងរូសចំពោះគោលការណ៍"],
      love: ["ស្មោះត្រង់ជ្រាលជ្រៅ", "ការពារអ្នកដែលខ្លួនស្រឡាញ់", "ឲ្យតម្លៃភាពស្មោះត្រង់", "ត្រូវការទំនុកចិត្ត", "ពេញចិត្តភាពស្មោះសរ"],
      career: ["នីតិសាស្ត្រ", "សន្តិសុខ", "ការងារសង្គម", "ការអប់រំ", "ការបម្រើអ្នកដទៃ"],
      money: ["ប្រុងប្រយ័ត្ន និងទទួលខុសត្រូវ", "ឲ្យតម្លៃសុវត្ថិភាព", "ស្មោះត្រង់ក្នុងការជួញដូរ", "ការធានាចិត្តជួយបាន", "អាចបារម្ភអំពីអនាគត"],
      health: ["តាមប្រពៃណី ចតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលស្មោះត្រង់ និងប្រុងប្រយ័ត្ន។", "សូមមានពេលសម្រាក និងធូរស្បើយ។"],
    },
    spiritText: "តាមប្រពៃណី ចតំណាងឱ្យភាពស្មោះត្រង់ ភាពត្រង់ៗ និងចិត្តក្លាហានក្នុងការការពារអ្វីដែលសំខាន់។",
  }),

  Pig: mk("Pig", {
    intro: "People born in the Year of the Pig are traditionally associated with warmth, generosity, and an easygoing nature.",
    ovText: "The Pig is the twelfth animal in the Chinese zodiac and is traditionally associated with warmth, generosity, and kindness.",
    traits: [["heart", "Warm-hearted"], ["gem", "Generous"], ["leaf", "Easygoing"], ["user", "Kind"], ["star", "Honest"], ["spark", "Cheerful"]],
    cards: {
      strengths: ["Warm-hearted and generous", "Easygoing and kind", "Values honest relationships", "Enjoys sharing with others", "Cheerful and sincere"],
      challenges: ["Can be overly trusting", "Can be indulgent", "May neglect themselves", "Can avoid conflict"],
      love: ["Affectionate and devoted", "Values comfort together", "Honest and sincere", "Generous with loved ones", "Appreciates kindness"],
      career: ["Hospitality", "Food industry", "Teaching", "Healthcare", "Working with people"],
      money: ["Generous with others", "Enjoys comfort", "Benefits from budgeting", "Can overspend on pleasures", "Gains from trusted partners"],
      health: ["Traditional interpretations often associate the Pig with an easygoing, comfort-loving energy.", "Balance comfort with gentle activity."],
    },
    spiritText: "The Pig traditionally represents warmth, generosity, and the joy of kindness and comfort.",
  }, {
    h1: "ឆ្នាំកុរ",
    intro: "អ្នកដែលកើតក្នុងឆ្នាំកុរ តាមប្រពៃណីរាសី ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងភាពកក់ក្តៅ ចិត្តសប្បុរស និងអត្តចរិតងាយស្រួល។",
    ovText: "កុរជាសត្វទី១២ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយភាពកក់ក្តៅ ចិត្តសប្បុរស និងសេចក្តីមេត្តា។",
    traits: [["heart", "ចិត្តកក់ក្តៅ"], ["gem", "សប្បុរស"], ["leaf", "ងាយស្រួល"], ["user", "មេត្តា"], ["star", "ស្មោះត្រង់"], ["spark", "រីករាយ"]],
    cards: {
      strengths: ["ចិត្តកក់ក្តៅ និងសប្បុរស", "ងាយស្រួល និងមេត្តា", "ឲ្យតម្លៃទំនាក់ទំនងស្មោះត្រង់", "ចូលចិត្តចែករំលែកជាមួយអ្នកដទៃ", "រីករាយ និងស្មោះសរ"],
      challenges: ["ជួនកាលជឿគេពេក", "ជួនកាលបណ្តោយខ្លួន", "អាចធ្វេសប្រហែសខ្លួនឯង", "អាចចៀសវាងទំនាស់"],
      love: ["ស្រឡាញ់ និងឧទ្ទិសខ្លួន", "ឲ្យតម្លៃផាសុកភាពរួមគ្នា", "ស្មោះត្រង់ និងស្មោះសរ", "សប្បុរសចំពោះអ្នកដែលខ្លួនស្រឡាញ់", "ពេញចិត្តសេចក្តីសប្បុរស"],
      career: ["សេវាកម្មបដិសណ្ឋារកិច្ច", "ឧស្សាហកម្មម្ហូបអាហារ", "ការបង្រៀន", "សុខភាព", "ការងារជាមួយមនុស្ស"],
      money: ["សប្បុរសចំពោះអ្នកដទៃ", "ចូលចិត្តផាសុកភាព", "ការធ្វើថវិកាជួយបាន", "អាចចំណាយលើសក្នុងការសប្បាយ", "ទទួលបានប្រយោជន៍ពីដៃគូដែលទុកចិត្ត"],
      health: ["តាមប្រពៃណី កុរតែងត្រូវបានផ្សារភ្ជាប់ជាមួយថាមពលងាយស្រួល និងចូលចិត្តផាសុកភាព។", "ធ្វើឱ្យមានតុល្យភាពរវាងផាសុកភាព និងសកម្មភាពស្រាលៗ។"],
    },
    spiritText: "តាមប្រពៃណី កុរតំណាងឱ្យភាពកក់ក្តៅ ចិត្តសប្បុរស និងសេចក្តីរីករាយនៃផាសុកភាព។",
  }),
};
