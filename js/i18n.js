// i18n.js — Khmer / English language support for MyBirthSign.
// Loaded before zodiac-data.js and app.js on every page.
//
// Exposes:
//   KM_ANIMAL_NAMES, KM_ELEMENT_NAMES   (English key -> Khmer display name)
//   KM_ANIMAL_INFO, KM_ELEMENT_INFO, KM_COMPAT_INFO   (Khmer content, same
//     shape as ANIMAL_INFO / ELEMENT_INFO / COMPAT_INFO in zodiac-data.js)
//   UI_STRINGS.en / UI_STRINGS.km       (static UI copy)
//   getLang(), setLang(lang), t(key)    (language-state helpers)
//   ZodiacI18N.applyStaticTranslations(), ZodiacI18N.initLangToggle(), ZodiacI18N.fmt()

// ---------------------------------------------------------------------------
// Animal / element display names
// ---------------------------------------------------------------------------
const KM_ANIMAL_NAMES = {
  Rat: "ជូត", Ox: "ឆ្លូវ", Tiger: "ខាល", Rabbit: "ថោះ", Dragon: "រោង", Snake: "ម្សាញ់",
  Horse: "មមី", Goat: "មមែ", Monkey: "វក", Rooster: "រកា", Dog: "ច", Pig: "កុរ"
};

// The everyday Khmer word for each animal (what you'd call it in normal
// speech), as opposed to KM_ANIMAL_NAMES above, which holds the traditional
// zodiac-cycle year names (e.g. "មមី" for the Horse year). Used for the
// "ឆ្នាំ{year name} ធាតុ {element} សត្វ{common name}" result heading.
const KM_ANIMAL_COMMON_NAMES = {
  Rat: "កណ្ដុរ", Ox: "គោ", Tiger: "ខ្លា", Rabbit: "ទន្សាយ", Dragon: "នាគ", Snake: "ពស់",
  Horse: "សេះ", Goat: "ពពែ", Monkey: "ស្វា", Rooster: "មាន់", Dog: "ឆ្កែ", Pig: "ជ្រូក"
};

const KM_ELEMENT_NAMES = {
  Wood: "ឈើ", Fire: "ភ្លើង", Earth: "ដី", Metal: "លោហធាតុ", Water: "ទឹក"
};

const KM_COLOR_NAMES = {
  blue: "ខៀវ", gold: "មាស", green: "បៃតង", white: "ស", yellow: "លឿង",
  gray: "ប្រផេះ", orange: "ទឹកក្រូច", pink: "ផ្កាឈូក", red: "ក្រហម",
  purple: "ស្វាយ", black: "ខ្មៅ", silver: "ប្រាក់", brown: "ត្នោត"
};

const KM_DAY_NAMES = {
  Monday: "ថ្ងៃច័ន្ទ", Tuesday: "ថ្ងៃអង្គារ", Wednesday: "ថ្ងៃពុធ",
  Thursday: "ថ្ងៃព្រហស្បតិ៍", Friday: "ថ្ងៃសុក្រ", Saturday: "ថ្ងៃសៅរ៍", Sunday: "ថ្ងៃអាទិត្យ"
};

// ---------------------------------------------------------------------------
// Khmer content data, parallel to ANIMAL_INFO / ELEMENT_INFO / COMPAT_INFO
// ---------------------------------------------------------------------------
const KM_ANIMAL_INFO = {
  Rat: {
    traits: "ឆ្លាតវៃ ឆបោក និងចូលចិត្តសេពគប់។ ជូតចេះរកឱកាសដែលអ្នកដទៃមើលមិនឃើញ។",
    weaknesses: "ជួនកាលមិនស្ងប់ស្ងាត់ ឬប្រុងប្រយ័ត្នខ្លាំងពេកចំពោះប្រាក់កាស និងទំនុកចិត្ត។",
    overview: "ជូតជាសត្វទី១ក្នុងនិមិត្តសញ្ញា ហើយតាមរឿងព្រេងបានមកដល់ត្រឹមតែដោយភាពឆ្លាតវៃ មិនមែនកម្លាំងកាយទេ — ល្បីល្បាញក្នុងការជិះលើខ្នងគោដើម្បីដល់មុនគេ។ រឿងនេះបង្ហាញពីជូតយ៉ាងច្បាស់៖ ចេះសម្របខ្លួន សម្លឹងមើលយ៉ាងល្អិតល្អន់ និងដើរមុនគេជានិច្ច។ ក្នុងសង្គម ជូតមានភាពទាក់ទាញ និងងាយនឹងសម្របខ្លួន ទោះនៅចំពោះមុខគេ ឬកំពុងប្រមូលព័ត៌មានពីចំហៀង។",
    careers: "អាជីវកម្ម ការសរសេរ ការស្រាវជ្រាវ ការជួញដូរ",
    luckyColors: ["ខៀវ", "មាស", "បៃតង"],
    luckyDays: ["ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ"]
  },
  Ox: {
    traits: "ទុកចិត្តបាន ស្មោះត្រង់ និងឧស្សាហ៍ព្យាយាម។ ឆ្លូវសាងជោគជ័យបន្តិចម្តងៗដោយការតស៊ូមិនឈប់ឈរ។",
    weaknesses: "ជួនកាលរឹងរូស និងយឺតក្នុងការសម្របខ្លួនទៅនឹងការផ្លាស់ប្តូរភ្លាមៗ។",
    overview: "ឆ្លូវជាកម្លាំងស្ងប់ស្ងាត់នៃនិមិត្តសញ្ញា — មិនភ្លឺចែងចាំងទេ ប៉ុន្តែពិបាកនឹងឈ្នះក្នុងភាពស៊ូទ្រាំ។ ជំនួសការប្រណាំងរកជោគជ័យលឿនៗ ឆ្លូវជ្រើសផ្លូវវែង ដោយខិតខំប្រឹងប្រែងឆ្នាំមួយទៅឆ្នាំមួយ រហូតដល់ទទួលបានលទ្ធផលមិនអាចបំភាន់បាន។ ភាពត្រង់របស់គេជាទីពេញចិត្តចំពោះអ្នកដែលស្រឡាញ់ភាពស្មោះត្រង់ ប៉ុន្តែអាចមើលទៅរដិបរដុសសម្រាប់អ្នកដែលរំពឹងលើភាពទន់ភ្លន់ជាង។",
    careers: "កសិកម្ម វិស្វកម្ម ហិរញ្ញវត្ថុ វេជ្ជសាស្ត្រ",
    luckyColors: ["ស", "លឿង", "បៃតង"],
    luckyDays: ["ថ្ងៃពុធ", "ថ្ងៃសុក្រ"]
  },
  Tiger: {
    traits: "ក្លាហាន ជឿជាក់លើខ្លួនឯង និងចូលចិត្តប្រកួតប្រជែង។ ខាលជាអ្នកដឹកនាំធម្មជាតិដែលសម្រេចចិត្តដោយក្លាហាន។",
    weaknesses: "ជួនកាលប្រញាប់ប្រញាល់ ឬអត់ធ្មត់ពេកចំពោះអ្នកធ្វើការយឺត។",
    overview: "ខាលជាអ្នកក្លាហានបំផុតនៃនិមិត្តសញ្ញា — ទាក់ទាញ និងមិនខ្លាចដើរមុនគេ។ ក្នុងបន្ទប់ដែលមនុស្សនៅស្ទាក់ស្ទើរ ខាលជាធម្មតាអ្នកដែលលើកឡើង ឬធ្វើសកម្មភាពមុនគេ។ ភាពក្លាហាននោះធ្វើឱ្យខាលជាអ្នកដឹកនាំគួរឱ្យចូលចិត្ត ប៉ុន្តែអាចក្លាយជាភាពអត់ធ្មត់ទាបចំពោះគោលការណ៍ ឬមនុស្សដែលត្រូវការពេលវេលាបន្ថែម។",
    careers: "ការបង្កើតអាជីវកម្ម កីឡា នីតិសាស្ត្រ ការគ្រប់គ្រង",
    luckyColors: ["ខៀវ", "ប្រផេះ", "ទឹកក្រូច"],
    luckyDays: ["ថ្ងៃអង្គារ", "ថ្ងៃពុធ"]
  },
  Rabbit: {
    traits: "សុភាពរាបសា គិតដល់អ្នកដទៃ និងចេះសន្តិវិធី។ ថោះឱនភាពសុខដុមរមនា និងជំនាញក្នុងការចៀសវាងទំនាស់។",
    weaknesses: "ជួនកាលប្រុងប្រយ័ត្នខ្លាំងពេក និងចៀសវាងការប្រឈមមុខដែលចាំបាច់។",
    overview: "ថោះឆ្លងកាត់ពិភពលោកដោយភាពល្អិតល្អន់ និងសមរម្យ ច្បាស់ជាសម្គាល់ភាពតានតឹងក្នុងបន្ទប់មុននឹងមានអ្នកនិយាយអ្វីម្តង។ នេះធ្វើឱ្យថោះជាអ្នកសន្តិវិធីដ៏ល្អ និងគួរឱ្យចូលចិត្តក្នុងការនៅជិត — ពួកគេតែងតែមិនបង្កការឈ្លោះ ហើយច្រើនតែបន្ធូរបន្ថយអ្វីដែលបានចាប់ផ្តើមរួចទៅហើយ។ ប៉ុន្តែអាចនាំឱ្យចៀសវាងការប្រឈមមុខចាំបាច់ទាំងស្រុង បណ្តាលឱ្យបញ្ហាតូចៗកាន់តែធំឡើងពីព្រោះនិយាយបន្តិចមានអារម្មណ៍មិនស្រួល។",
    careers: "ការទូត ការប្រឹក្សា ការរចនា សេវាកម្មបដិសណ្ឋារកិច្ច",
    luckyColors: ["ផ្កាឈូក", "ក្រហម", "ស្វាយ"],
    luckyDays: ["ថ្ងៃច័ន្ទ", "ថ្ងៃព្រហស្បតិ៍"]
  },
  Dragon: {
    traits: "ជឿជាក់លើខ្លួនឯង ទាក់ទាញចំណាប់អារម្មណ៍ និងមានមហិច្ឆតា។ រោងទាញចំណាប់អារម្មណ៍ និងច្រើនឡើងជាអ្នកដឹកនាំដោយធម្មជាតិ។",
    weaknesses: "ជួនកាលមើលទៅអំនួត ឬអត់ធ្មត់ទាបចំពោះដែនកំណត់។",
    overview: "រោងជាសត្វតែមួយគត់ក្នុងនិមិត្តសញ្ញាដែលជាសត្វព្រេងនិទាន ហើយផ្ទុកនូវកម្លាំងធំដ៏នោះ។ រោងអាចដើរចូលបន្ទប់ ហើយផ្លាស់ប្តូរចំណុចកណ្តាលចំណាប់អារម្មណ៍ដោយមិនចាំបាច់ព្យាយាម — មនុស្សសម្គាល់ ជឿជាក់ និងច្រើនតែប្រគល់តួនាទីជាអ្នកដឹកនាំឱ្យមុននឹងសុំផង។ ភាពជាអ្នកដឹកនាំធម្មជាតិនោះមកជាមួយនឹងស្តង់ដារខ្ពស់ ទាំងចំពោះខ្លួនឯង និងអ្នកដទៃ ដែលអាចមើលទៅដូចជាអត់ធ្មត់ទាបនៅពេលការពិតមិនទាន់ដល់ចក្ខុវិស័យរបស់ពួកគេ។",
    careers: "ភាពជាអ្នកដឹកនាំ ការបង្កើតអាជីវកម្ម ការកម្សាន្ត អចលនទ្រព្យ",
    luckyColors: ["មាស", "ប្រាក់", "ប្រផេះ"],
    luckyDays: ["ថ្ងៃអង្គារ", "ថ្ងៃសៅរ៍"]
  },
  Snake: {
    traits: "ឈ្លាសវៃ ចេះវិភាគ និងសមរម្យ។ ម្សាញ់គិតដិតដល់មុននឹងធ្វើសកម្មភាព។",
    weaknesses: "ជួនកាលសម្ងាត់ខ្លួន ឬគិតច្រើនពេក។",
    overview: "ម្សាញ់ជាអ្នកគិតយុទ្ធសាស្ត្រនៃនិមិត្តសញ្ញា — ស្ងប់ស្ងាត់ ប្រុងប្រយ័ត្ន និងមិនប្រញាប់បង្ហាញគំនិតរបស់ខ្លួន។ ខុសពីសត្វផ្សេងដែលឆ្លើយតបភ្លាមៗ ម្សាញ់ចូលចិត្តគិតពិចារណាលើបញ្ហាដោយស្ងាត់ៗ រហូតដល់ឃើញផែនការច្បាស់លាស់។ នេះធ្វើឱ្យម្សាញ់មានកិត្យានុភាពក្នុងការគិតដិតដល់ និងការវិនិច្ឆ័យល្អ ជាពិសេសក្នុងស្ថានភាពដែលត្រូវការការអត់ធ្មត់ជាងល្បឿន។ ភាពសម្ងាត់ខ្លួននេះក៏អាចក្លាយជាការលាក់បាំង ធ្វើឱ្យអ្នកដែលនៅជិតម្សាញ់មិនដឹងច្បាស់ពីអ្វីដែលកំពុងកើតឡើងពីក្រោម។",
    careers: "ហិរញ្ញវត្ថុ ការស្រាវជ្រាវ ចិត្តវិទ្យា យុទ្ធសាស្ត្រ",
    luckyColors: ["ខ្មៅ", "ក្រហម", "លឿង"],
    luckyDays: ["ថ្ងៃពុធ", "ថ្ងៃសៅរ៍"]
  },
  Horse: {
    traits: "ឆ្អែតថាមពល មានឯករាជ្យ និងចូលចិត្តការងារថ្មី។ មមីស្រឡាញ់សេរីភាព និងបទពិសោធន៍ថ្មីៗ។",
    weaknesses: "ជួនកាលប្រញាប់ប្រញាល់ ឬពិបាកក្នុងការសន្យារយៈពេលវែង។",
    overview: "មមីដើរទៅមុខដោយសន្ទុះ — មិនស្ងប់ស្ងាត់ មានឯករាជ្យ និងសប្បាយបំផុតនៅពេលមានចន្លោះទូលាយខាងមុខ។ ទម្លាប់ប្រចាំថ្ងៃតែងតែមិនសមនឹងមមីយូរ — ពួកគេចូលចិត្តការធ្វើដំណើរ គម្រោងថ្មី និងមនុស្សថ្មី ហើយនាំមកនូវថាមពលឆ្លងដែលមិនថាទៅកន្លែងណា។ ភាពស្រឡាញ់សេរីភាពដូចគ្នានេះអាចធ្វើឱ្យការសន្យារយៈពេលវែងមានអារម្មណ៍ថាបង្អាក់ ដូច្នេះមមីធ្វើការបានល្អបំផុតក្នុងស្ថានភាពដែលផ្តល់ចន្លោះឱ្យពួកគេផ្លាស់ទី ជាជាងព្យាយាមដាក់ចុះឱ្យនៅនឹងកន្លែង។",
    careers: "ការធ្វើដំណើរ ការលក់ កីឡា ផ្សព្វផ្សាយ",
    luckyColors: ["លឿង", "បៃតង", "ស្វាយ"],
    luckyDays: ["ថ្ងៃច័ន្ទ", "ថ្ងៃពុធ"]
  },
  Goat: {
    traits: "សុភាពរាបសា ច្នៃប្រឌិត និងអាណិតអាសូរ។ មមែមានអារម្មណ៍សិល្បៈខ្លាំង និងយកចិត្តទុកដាក់ចំពោះអ្នកដទៃ។",
    weaknesses: "ជួនកាលស្ទាក់ស្ទើរក្នុងការសម្រេចចិត្ត ឬពឹងផ្អែកលើអ្នកដទៃពេក។",
    overview: "មមែ (ជួនកាលហៅថា ចៀម) ជាសិល្បករទន់ភ្លន់នៃនិមិត្តសញ្ញា ទាក់ទាញទៅរកសោភណភាព សុខដុមរមនា និងអារម្មណ៍ជ្រៅ។ មមែសម្គាល់អារម្មណ៍ដែលអ្នកដទៃមើលមិនឃើញ ធ្វើឱ្យពួកគេជាមិត្តភក្តិកក់ក្តៅ និងពូកែក្នុងវិស័យច្នៃប្រឌិត។ ពួកគេធ្វើការបានល្អបំផុតក្នុងបរិយាកាសដែលមានសុវត្ថិភាព និងការគាំទ្រ ហើយងាយនឹងពិបាកនៅក្នុងបរិយាកាសប្រកួតប្រជែងខ្លាំង។ ដោយគ្មានការគាំទ្រនោះ មមែអាចក្លាយជាស្ទាក់ស្ទើរ ឬពឹងផ្អែកលើអ្នកដទៃឱ្យធ្វើការសម្រេចចិត្តពិបាកៗជំនួសគេ។",
    careers: "សិល្បៈ ការរចនា ការប្រឹក្សា ការងារសង្គម",
    luckyColors: ["បៃតង", "ក្រហម", "ស្វាយ"],
    luckyDays: ["ថ្ងៃសុក្រ", "ថ្ងៃអាទិត្យ"]
  },
  Monkey: {
    traits: "ឆ្លាតវៃ ចង់ដឹងចង់ឃើញ និងកំប្លែង។ វកសិក្សារហ័ស និងចូលចិត្តដោះស្រាយបញ្ហាប្រកបដោយភាពច្នៃប្រឌិត។",
    weaknesses: "ជួនកាលលេងកំប្លែងពេក ឬពិបាកផ្តោតលើរឿងតែមួយ។",
    overview: "វកជាគំនិតរហ័សបំផុតនៃនិមិត្តសញ្ញា — ចង់ដឹងចង់ឃើញ លេងសប្បាយ និងសប្បាយរីករាយជាមួយបញ្ហាលំបាក។ វកសិក្សាជំនាញថ្មីបានលឿន និងចូលចិត្តរកវិធីផ្លូវកាត់ដែលអ្នកដទៃមិនបានគិតដល់ ធ្វើឱ្យពួកគេជាអ្នកបន្សំដ៏ល្អ និងអ្នកកំសាន្តធម្មជាតិ។ ចំណុចខ្វះខាតនៃគំនិតរហ័សនេះគឺការផ្តោតខ្លី៖ វកអាចផ្លាស់ទីពីគំនិតមួយទៅគំនិតមួយទៀត លឿនម្រាល់ ធ្វើឱ្យគំនិតល្អៗមិនបានបញ្ចប់។",
    careers: "បច្ចេកវិទ្យា ទីផ្សារ កំប្លែង ការប្រឹក្សា",
    luckyColors: ["ស", "មាស", "ខៀវ"],
    luckyDays: ["ថ្ងៃពុធ", "ថ្ងៃសុក្រ"]
  },
  Rooster: {
    traits: "ល្អិតល្អន់ ឧស្សាហ៍ព្យាយាម និងជឿជាក់លើខ្លួនឯង។ រកាយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត និងមានមោទនភាពក្នុងការធ្វើការអ្វីមួយឱ្យបានល្អ។",
    weaknesses: "ជួនកាលថ្លែងយោបល់រិះគន់ខ្លាំង ឬត្រង់ពេក។",
    overview: "រកាមានមោទនភាពពិតប្រាកដក្នុងការធ្វើការអ្វីមួយឱ្យបានត្រឹមត្រូវ រហូតដល់ចំណុចលម្អិតតូចបំផុតដែលអ្នកដទៃមិនដែលគិតពិនិត្យ។ នេះធ្វើឱ្យរកាពូកែក្នុងការងារដែលត្រូវការភាពត្រឹមត្រូវ និងស្តង់ដារខ្ពស់ — ជាមនុស្សដែលក្រុមពឹងផ្អែកដើម្បីចាប់កំហុសដែលអ្នកដទៃមើលរំលង។ ភ្នែកដែលចាប់កំហុសនោះក៏អាចបែរជាការរិះគន់ ចូលក្នុងខ្លួនឯង ឬចំពោះអ្នកដទៃ ដូច្នេះរកាគួរចាំថាមិនមែនគ្រប់កំហុសតូចៗទាំងអស់ត្រូវការលើកឡើងនោះទេ។",
    careers: "គណនេយ្យ សារព័ត៌មាន ការត្រួតពិនិត្យគុណភាព ការនិយាយជាសាធារណៈ",
    luckyColors: ["មាស", "ត្នោត", "លឿង"],
    luckyDays: ["ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសៅរ៍"]
  },
  Dog: {
    traits: "ស្មោះត្រង់ ត្រង់ និងការពារអ្នកដទៃ។ ចជាទីទុកចិត្តបាន និងតែងតែការពារអ្វីដែលខ្លួនជឿជាក់។",
    weaknesses: "ជួនកាលព្រួយបារម្ភ ឬសង្ស័យស្ថានភាពថ្មីពេក។",
    overview: "ចជាអ្នកការពារស្មោះត្រង់បំផុតនៃនិមិត្តសញ្ញា — មិត្តដែលចូលមកដោយមិនចាំបាច់ហៅ និងអ្នកដែលហ៊ាននិយាយការពារអ្នកដទៃទោះបីវាធ្វើឱ្យខ្លួនឯងខាតបង់។ ចមានអារម្មណ៍ត្រឹមត្រូវ-ខុសខ្លាំង ហើយកម្រនឹងសម្របសម្រួលគោលការណ៍នោះដើម្បីរក្សាសន្តិភាព។ ភាពប្រុងប្រយ័ត្ននេះក៏អាចបែរជាការព្រួយបារម្ភ ឬសង្ស័យ ជាពិសេសចំពោះមនុស្ស ឬស្ថានភាពថ្មីដែលមិនទាន់ទទួលបានទំនុកចិត្តពីពួកគេ។",
    careers: "នីតិសាស្ត្រ សន្តិសុខ ការងារសង្គម ការអប់រំ",
    luckyColors: ["ក្រហម", "បៃតង", "ស្វាយ"],
    luckyDays: ["ថ្ងៃច័ន្ទ", "ថ្ងៃព្រហស្បតិ៍"]
  },
  Pig: {
    traits: "កក់ក្តៅ សន្ដោស និងសុខដុម។ កុរឱនភាពផាសុកភាព សេចក្តីសប្បុរស និងទំនាក់ទំនងស្មោះត្រង់។",
    weaknesses: "ជួនកាលជឿគេពេក ឬធ្វេសប្រហែសខ្លួនឯង។",
    overview: "កុរបិទវដ្តនិមិត្តសញ្ញាដោយភាពកក់ក្តៅ និងអារម្មណ៍រីករាយ — សន្ដោស សុខដុម និងសប្បាយចិត្តពិតប្រាកដក្នុងការចែករំលែក។ កុរមានទំនោរជឿលើពាក្យសម្តីរបស់អ្នកដទៃ និងគិតល្អចំពោះអ្នកដទៃ ធ្វើឱ្យពួកគេជាដៃគូដែលល្អ និងគ្មានបញ្ហា។ ភាពជឿទុកចិត្តនេះក៏ជាភាពទន់ខ្សោយធំបំផុតរបស់គេ៖ កុរអាចយឺតក្នុងការសម្គាល់ឃើញនៅពេលមាននរណាម្នាក់កំពុងកេងប្រវ័ញ្ចភាពសន្ដោសរបស់គេ ហើយជួនកាលធ្វេសប្រហែសខ្លួនឯង (ឬអ្នកដទៃ) ហួសកំរិតសមរម្យ។",
    careers: "សេវាកម្មបដិសណ្ឋារកិច្ច ឧស្សាហកម្មម្ហូបអាហារ ការបង្រៀន សុខភាព",
    luckyColors: ["លឿង", "ប្រផេះ", "ត្នោត"],
    luckyDays: ["ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃអាទិត្យ"]
  }
};

const KM_ELEMENT_INFO = {
  Wood: {
    blurb: "ឆ្នាំឈើនាំមកការលូតលាស់ ភាពច្នៃប្រឌិត និងកម្លាំងចិត្តក្នុងការបង្កើតអ្វីថ្មី។ អ្នកមានធាតុនេះចូលចិត្តសហការ សន្ដោស និងមានឧត្តមគតិ។",
    overview: "ឈើជាធាតុនៃរដូវផ្ការីក — ការរីកធំ មែកថ្មី គម្រោងថ្មី។ អ្នកកើតក្នុងឆ្នាំឈើជាធម្មតាអ្នកដែលជំរុញក្រុមទៅមុខ ហើយលើកគំនិតថ្មីមុននឹងគំនិតចាស់បានបញ្ចប់ផង។ ពួកគេជាដៃគូកក់ក្តៅដែលចង់ឃើញអ្នកដទៃលូតលាស់ជាមួយ មិនមែនគ្រាន់តែខ្លួនឯងទេ។ ចំណុចខ្វះខាតនៃសេចក្តីសន្ដោសនេះគឺទំនោរទទួលខុសត្រូវច្រើនពេក ឬពិបាកនឹងបដិសេធអ្នកដែលយកចំណេញពីចិត្តល្អរបស់ពួកគេ។"
  },
  Fire: {
    blurb: "ឆ្នាំភ្លើងនាំមកនូវចំណង់ចំណូលចិត្ត ថាមពល និងភាពក្លាហាន។ អ្នកមានធាតុនេះសកម្ម ចូលចិត្តការប្រថុយប្រថាន និងដឹកនាំបានរហ័ស។",
    overview: "ភ្លើងនាំមកកម្តៅ ចលនា និងភាពលេចធ្លោ។ អ្នកកើតក្នុងឆ្នាំភ្លើងកម្រនៅស្ងៀមក្នុងផ្ទៃក្រោយ — ពួកគេនិយាយដោយជំនឿ ផ្លាស់ទីយ៉ាងលឿន និងញុះញង់អ្នកដទៃឱ្យធ្វើសកម្មភាព។ នេះធ្វើឱ្យពួកគេជាអ្នកដឹកនាំធម្មជាតិក្នុងវិបត្តិ ឬគម្រោងថ្មីដ៏ក្លាហាន។ ការលំបាកគឺការរក្សាកម្លាំងនោះឱ្យស្ថិតស្ថេរ៖ ភ្លើងអាចឆេះទំនាក់ទំនង ឬឱកាសលឿនពេកបើមិនផ្សំជាមួយការអត់ធ្មត់។"
  },
  Earth: {
    blurb: "ឆ្នាំដីនាំមកស្ថេរភាព ការអនុវត្តជាក់ស្តែង និងការអត់ធ្មត់។ អ្នកមានធាតុនេះទុកចិត្តបាន មានមូលដ្ឋានមុតមាំ និងពូកែក្នុងការរៀបចំផែនការរយៈពេលវែង។",
    overview: "ដីជាធាតុនៃការច្រូតកាត់ — ស្ថិតស្ថេរ អត់ធ្មត់ និងសាងសង់ដើម្បីស្ថិតស្ថេរយូរអង្វែង។ អ្នកកើតក្នុងឆ្នាំដីជាធម្មតាជាមនុស្សដែលទុកចិត្តបានជាងគេក្នុងបន្ទប់ — អ្នកដែលមកដល់ទាន់ពេល រក្សាពាក្យសម្តី និងគិតទៅមុខច្រើនឆ្នាំជាជាងច្រើនថ្ងៃ។ ភាពមានមូលដ្ឋានមុតមាំនោះអាចបែរជាការប្រុងប្រយ័ត្នខ្លាំងពេក ធ្វើឱ្យពិបាកក្នុងការលោតចូលឱកាសនៅពេលការប្រថុយប្រថានពិតជាចាំបាច់។"
  },
  Metal: {
    blurb: "ឆ្នាំលោហធាតុនាំមកវិន័យ មហិច្ឆតា និងឆន្ទៈខ្លាំង។ អ្នកមានធាតុនេះប្តេជ្ញា មានឯករាជ្យ និងប្រកាន់ខ្ជាប់នូវគុណតម្លៃ។",
    overview: "លោហធាតុជាធាតុនៃដងកាំបិត និងឃ្លោង — មុត និងបន្លឺឮមិនបត់បែន។ អ្នកកើតក្នុងឆ្នាំលោហធាតុដឹងច្បាស់ពីអ្វីដែលខ្លួនឯងប្រកាន់ ហើយកម្រសម្របសម្រួលនៅពេលសម្រេចចិត្តរួចហើយ។ នេះផ្តល់ឱ្យពួកគេនូវកម្លាំងស្ងប់ស្ងាត់ក្នុងការចចារ និងភាពជាអ្នកដឹកនាំ។ វាក៏អាចមើលទៅរឹងរូសសម្រាប់អ្នកដែលផ្លាស់ប្តូរបានងាយជាង ដូច្នេះអ្នកមានធាតុលោហៈធ្វើការបានល្អបំផុតនៅពេលហាត់អនុវត្តភាពបត់បែនដោយដឹងខ្លួន។"
  },
  Water: {
    blurb: "ឆ្នាំទឹកនាំមកការយល់ដឹងដោយវាចនា ការសម្របខ្លួន និងប្រាជ្ញាស្ងប់ស្ងាត់។ អ្នកមានធាតុនេះគិតដិតដល់ ចេះការទូត និងសម្រាលចិត្ត។",
    overview: "ទឹកជាធាតុនៃទន្លេ — ហូរជានិច្ច រកផ្លូវដែលងាយបំផុតជានិច្ច។ អ្នកកើតក្នុងឆ្នាំទឹកតែងតែអាចអានបន្ទប់មុននឹងនិយាយអ្វីនៅក្នុងនោះ ដោយសម្របវិធីសាស្ត្ររបស់ខ្លួនទៅតាមអ្នកដែលនៅជាមួយ។ នេះធ្វើឱ្យពួកគេជាអ្នកការទូតដ៏ល្អ និងអ្នកនិយាយបញ្ចុះបញ្ចូលស្ងាត់ៗ។ គ្រោះថ្នាក់គឺភាពអសកម្ម៖ អ្នកមានធាតុទឹកអាចអណ្តែតទៅតាមស្ថានភាពដែលគួរតែច្របាច់ទប់លឿនជាង។"
  }
};

const KM_COMPAT_INFO = {
  same: {
    label: "និមិត្តសញ្ញាដូចគ្នា",
    text: {
      romantic: "អ្នកទាំងពីរមាននិមិត្តសញ្ញាដូចគ្នា ដែលមានន័យថាការយល់ដឹងគ្នាស៊ីជម្រៅ និងភ្លាមៗ — អ្នកអានចិត្តគ្នាដោយមិនចាំបាច់ពន្យល់។ គ្រោះថ្នាក់គឺបុគ្គលិកលក្ខណៈខ្លាំងពីរនាក់ប្រកួតប្រជែងគ្នាលើតួនាទីដូចគ្នា ជាជាងអាចធ្វើឱ្យគ្នាឈ្វេងយល់គ្នា។ ការបែងចែក \"អ្នកណាដឹកនាំលើអ្វី\" យ៉ាងច្បាស់អាចជួយបានច្រើន។",
      business: "ការមាននិមិត្តសញ្ញាដូចគ្នាមានន័យថាមានតម្លៃ និងល្បឿនដូចគ្នា ដែលធ្វើឱ្យកិច្ចសហការដំបូងមានអារម្មណ៍ស្រួល។ សម្រាប់ដៃគូភាពយូរអង្វែង គួរបែងចែកតួនាទីឱ្យច្បាស់តាំងពីដើម — ពីព្រោះមនុស្សពីរនាក់ដែលមានសភាវគតិដូចគ្នាអាចខិតទៅរកការងារដូចគ្នា ហើយធ្វេសប្រហែសការងារផ្សេង។"
    }
  },
  triangle: {
    label: "ត្រូវគ្នាធម្មជាតិ (ត្រីកោណ)",
    text: {
      romantic: "និមិត្តសញ្ញារបស់អ្នកទាំងពីរស្ថិតនៅក្នុង \"ត្រីកោណ\" ភាពសមស្របដូចគ្នា — មួយក្នុងចំណោមក្រុមត្រូវគ្នាធម្មជាតិទាំងបួននៃនិមិត្តសញ្ញា។ នេះត្រូវបានចាត់ទុកជាការផ្គូផ្គងដ៏សុខដុមរមនា និងងាយស្រួលបំផុតមួយ ជាមួយនឹងការយល់ដឹងដោយវាចនាអំពីល្បឿន និងតម្លៃគ្នាទៅវិញទៅមក។",
      business: "នេះជាធម្មតាមួយក្នុងចំណោមការផ្គូផ្គងដៃគូអាជីវកម្មដ៏រឹងមាំបំផុត — សភាវគតិដូចគ្នាអំពីល្បឿន និងអាទិភាពធ្វើឱ្យកិច្ចសហការប្រចាំថ្ងៃរលូន ហើយភាពខ្លាំងផ្គូផ្គងគ្នាក្នុងត្រីកោណជួយគ្របដណ្តប់ចំណុចខ្វះខាតគ្នាទៅវិញទៅមក។"
    }
  },
  clash: {
    label: "ប្រឆាំងផ្ទាល់",
    text: {
      romantic: "និមិត្តសញ្ញារបស់អ្នកទាំងពីរស្ថិតនៅទល់មុខគ្នាផ្ទាល់លើកង់និមិត្តសញ្ញា — ការផ្គូផ្គងប្រឆាំងបែបបុរាណ។ នេះមិនមានន័យថាមិនសមគ្នាទេ វាមានន័យថាអ្នកទាំងពីរមានទំនោរចូលទៅរកជីវិតខុសគ្នាពិតប្រាកដ ដែលអាចបង្កការប៉ះទង្គិច ឬក្លាយជាភាពខ្លាំងបំផុតរបស់ទំនាក់ទំនងនៅពេលអ្នកទាំងពីរចេះប្រាស្រ័យទាក់ទងឆ្លងកាត់ភាពខុសគ្នានោះ។",
      business: "ការផ្គូផ្គងប្រឆាំងអាចធ្វើឱ្យជាដៃគូអាជីវកម្មដ៏រឹងមាំពិតប្រាកដ ពីព្រោះអ្នកទាំងពីរមានទំនោរឃើញបញ្ហាពីមុំខុសគ្នា និងគ្របដណ្តប់ចំណុចដែលម្នាក់ទៀតនឹងខកខាន។ វាដំណើរការល្អបំផុតជាមួយនឹងការបែងចែកតួនាទីយ៉ាងច្បាស់ និងការប្រាស្រ័យទាក់ទងញឹកញាប់ ជាជាងសន្មតថាគិតដូចគ្នា។"
    }
  },
  neutral: {
    label: "ត្រូវគ្នាធម្យម",
    text: {
      romantic: "និមិត្តសញ្ញារបស់អ្នកទាំងពីរមិននៅក្នុងត្រីកោណភាពសមស្របដូចគ្នា ប៉ុន្តែក៏មិនមែនការប្រឆាំងផ្ទាល់ដែរ។ ភាពសមស្របនិមិត្តសញ្ញាបែបបុរាណមិនផ្តល់អត្ថប្រយោជន៍ ឬបញ្ហាខ្លាំងចំពោះការផ្គូផ្គងនេះទេ — ជាក់ស្តែង ភាពសមគ្នាអាស្រ័យលើបុគ្គលិកលក្ខណៈផ្ទាល់ខ្លួនជាងសត្វនិមិត្តសញ្ញា។",
      business: "គ្មានទំនោរខ្លាំង ឬការប៉ះទង្គិចខ្លាំងពីនិមិត្តសញ្ញានៅទីនេះទេ — ជាការផ្គូផ្គងដែលអាចដំណើរការបានល្អ ដែលជោគជ័យអាស្រ័យលើការប្រាស្រ័យទាក់ទងច្បាស់លាស់ និងតួនាទីដែលបានកំណត់ច្បាស់ ជាងនិមិត្តសញ្ញារបស់អ្នក។"
    }
  }
};

const KM_LIFE_PATH_INFO = {
  1: { label: "អ្នកដឹកនាំ", blurb: "មានឯករាជ្យ មានជំរុញចិត្ត និងសប្បាយបំផុតនៅពេលកំណត់ផ្លូវផ្ទាល់ខ្លួន ជាជាងដើរតាមអ្នកដទៃ។" },
  2: { label: "អ្នករក្សាសន្តិភាព", blurb: "ចេះការទូត រសើប និងពេញចិត្តបំផុតក្នុងទំនាក់ទំនងកិច្ចសហការជិតស្និទ្ធ។" },
  3: { label: "អ្នកប្រាស្រ័យទាក់ទង", blurb: "មានការបញ្ចេញមតិច្បាស់ ច្នៃប្រឌិត និងចូលចិត្តការបញ្ចេញមតិខ្លួនឯង — ត្រូវការចន្លោះសម្រាប់លេង និងបង្កើតថ្មី។" },
  4: { label: "អ្នកសាងសង់", blurb: "ជាក់ស្តែង មានវិន័យ និងឲ្យតម្លៃរចនាសម្ព័ន្ធ សុវត្ថិភាព និងការធ្វើអ្វីៗឱ្យបានត្រឹមត្រូវ។" },
  5: { label: "ព្រលឹងសេរី", blurb: "ចូលចិត្តការសាកល្បង បត់បែនបានល្អ និងមិនចូលចិត្តទម្លាប់ដដែលៗ — ត្រូវការភាពចម្រុះ និងសេរីភាពដើម្បីមានអារម្មណ៍រស់រវើក។" },
  6: { label: "អ្នកថែទាំ", blurb: "មានទំនួលខុសត្រូវ ចំពោះក្តីស្រលាញ់ និងមានទំនោរធម្មជាតិថែទាំផ្ទះ គ្រួសារ និងសហគមន៍។" },
  7: { label: "អ្នកស្វែងរក", blurb: "គិតពិចារណាខ្លួនឯង វិភាគ និងចូលចិត្តជម្រៅ ភាពឯកោ និងការយល់ដឹង 'ហេតុអ្វី'។" },
  8: { label: "អ្នកសម្រេចបាន", blurb: "មានមហិច្ឆតា មានគំនិតអាជីវកម្ម និងជំរុញដោយសមិទ្ធិផល ឋានៈ និងភាពជោគជ័យផ្នែកសម្ភារៈ។" },
  9: { label: "អ្នកមេត្តាករុណា", blurb: "មានមេត្តាករុណា ឧត្តមគតិ និងផ្តោតលើរូបភាពធំជាងការទទួលផលផ្ទាល់ខ្លួន។" },
  11: { label: "អ្នកវិចារណញាណ (លេខមេ)", blurb: "មានភាពរសើប និងវិចារណញាណខ្លាំង ដោយផ្ទុកនូវឯករាជ្យនៃលេខ ១ ជាមួយនឹងការយល់ដឹងខាងវិញ្ញាណ និងអារម្មណ៍កម្រិតខ្ពស់។" },
  22: { label: "អ្នកសាងសង់មេ (លេខមេ)", blurb: "ឧត្តមគតិជាក់ស្តែង — វិន័យនៃលេខ ៤ រួមផ្សំជាមួយចិត្តគំនិតសម្រាប់សមិទ្ធិផលធំ និងមានន័យ។" },
  33: { label: "គ្រូមេ (លេខមេ)", blurb: "ការថែទាំនៃលេខ ៦ ពង្រីកទៅជាការហៅឱ្យបង្រៀន ព្យាបាល ឬលើកកម្ពស់លើវិសាលភាពធំជាង។" }
};

// ---------------------------------------------------------------------------
// Static UI copy
// ---------------------------------------------------------------------------
const UI_STRINGS = {
  en: {
    nav_checker: "Home",
    nav_checker_page: "Checker",
    nav_tools: "Tools",
    nav_animals: "Zodiac Guide",
    nav_compatibility: "Compatibility",
    nav_wedding: "Wedding Dates",
    nav_blog: "Blog",
    nav_about: "About",
    nav_contact: "Contact",
    nav_more: "More",
    lang_toggle_en: "EN",
    lang_toggle_km: "ខ្មែរ",

    animals_hero_title: "The Complete Chinese Zodiac Animal Guide",
    animals_hero_subtitle: "All 12 zodiac animals — personality, luck, and compatibility at a glance. Tap any animal to read the full profile.",
    animals_read_more: "Read full personality",
    animals_cta: "Check your own sign →",

    compat_page_hero_title: "Zodiac Compatibility Checker",
    compat_page_hero_subtitle: "Enter two birthdays to see how your signs match up — for romance or for business.",
    compat_page_cta: "Check your own sign →",

    rc_hero_title: "💞 Relationship Compatibility Calculator",
    rc_hero_subtitle: "Enter both birthdays to get a full compatibility report — Western sun signs, numerology life path numbers, and an 11-part relationship breakdown.",
    rc_person1_legend: "Person 1",
    rc_person2_legend: "Person 2",
    rc_name_label: "Name or nickname (optional)",
    rc_dob_label_req: "Date of birth (required)",
    rc_time_label: "Birth time (optional)",
    rc_location_label: "Birth location (optional)",
    rc_location_placeholder: "City, Country",
    rc_gender_label: "Gender (optional)",
    rc_gender_prefer_not: "Prefer not to say",
    rc_gender_woman: "Woman",
    rc_gender_man: "Man",
    rc_gender_nonbinary: "Non-binary",
    rc_submit: "❤️ Calculate Compatibility",
    rc_privacy_note: "Your information is used to calculate this compatibility reading. Birth details are not required to be stored, and nothing you enter here is sent to an external service — everything is calculated in your own browser.",
    rc_quick_check_heading: "Prefer a quick Chinese zodiac-animal check?",
    rc_quick_check_intro: "The calculator above uses Western astrology and numerology. For the Chinese zodiac animal match used elsewhere on this site, use the quick check below.",
    rc_err_required: "Please enter both people's dates of birth.",
    rc_err_future: "Birth dates can't be in the future — please check the date entered.",
    rc_err_invalid: "One of the dates entered isn't valid — please re-check it.",
    rc_western_zodiac_heading: "Western Zodiac",
    rc_chinese_zodiac_heading: "Chinese Zodiac",
    rc_numerology_heading: "Numerology",
    rc_life_path_label: "Life Path",
    rc_birthday_number_label: "Birthday Number",
    rc_attitude_number_label: "Attitude Number",
    rc_numerology_method_note: "Method used: the month, day, and year are each reduced separately, preserving master numbers 11, 22, and 33 at every step, then the three results are summed and reduced the same way.",
    rc_summary_heading: "Compatibility Summary",
    rc_summary_disclaimer: "These compatibility scores are based on traditional astrology and numerology for entertainment/self-reflection and are not scientifically validated.",
    rc_analysis_heading: "Relationship Analysis",
    rc_works_well_label: "What may work well",
    rc_challenge_label: "What may create challenges",
    rc_insights_heading: "Personalized Insights",
    rc_strengths_heading: "💚 Biggest Strengths",
    rc_challenges_heading: "⚠️ Potential Challenges",
    rc_tips_heading: "💡 Relationship Tips",
    rc_needs_heading: "❤️ What Each Person May Need",
    rc_comm_tip_heading: "💬 Communication Tip",
    rc_love_tip_heading: "💕 Love Tip",
    rc_extra_astro_heading: "Moon, Rising, Venus & Mars",
    rc_extra_astro_missing: "Birth time/location wasn't provided, so this section is based primarily on Sun-sign compatibility.",
    rc_extra_astro_unavailable: "Moon, Rising, Venus, and Mars signs require precise astronomical (ephemeris) calculations that this tool doesn't perform yet, so we won't guess them even though a birth time and location were entered. Everything above is based on Sun-sign and numerology compatibility only.",
    rc_disclaimer: "Astrology and numerology are traditional belief systems intended for entertainment and self-reflection. They are not scientifically validated methods for predicting personality, relationship success, or future events.",
    rc_narrative_lang_note: "The detailed write-up below is currently shown in English only.",
    rc_pair_header_tpl: "{p1} {symbol1} {p1sign}  ❤️  {p2} {symbol2} {p2sign}",

    nav_business: "Business Partner",
    biz_hero_title: "💼 Business Partnership Compatibility",
    biz_hero_subtitle: "Chinese Zodiac • Five Elements • Business Personality",
    biz_person1_legend: "Person 1",
    biz_person2_legend: "Person 2",
    biz_name_label: "Full name / business name (optional)",
    biz_dob_label_req: "Date of birth (required)",
    biz_time_label: "Birth time (optional)",
    biz_location_label: "Birth location (optional)",
    biz_location_placeholder: "City, Country",
    biz_submit: "💼 Calculate Business Compatibility",
    biz_privacy_note: "Birth information is used to generate this reading and is not required to be stored. Calculations are performed in your own browser.",
    biz_err_required: "Please enter both people's dates of birth.",
    biz_err_future: "Birth dates can't be in the future — please check the date entered.",
    biz_err_invalid: "One of the dates entered isn't valid — please re-check it.",
    biz_heavenly_stem_label: "Heavenly Stem",
    biz_earthly_branch_label: "Earthly Branch",
    biz_five_elements_heading: "Five Elements",
    biz_elements_disclaimer: "Element interactions are a traditional framework, not a scientific predictor of business outcomes.",
    biz_dashboard_heading: "Compatibility Dashboard",
    biz_dashboard_disclaimer: "Entertainment-style scores based on traditional Chinese astrology. They are not scientific measurements and should not be used as a substitute for evaluating a real business partner.",
    biz_analysis_heading: "Business Compatibility Analysis",
    biz_narrative_lang_note: "The detailed write-up below is currently shown in English only.",
    biz_works_well_label: "What may work well",
    biz_challenge_label: "What may create challenges",
    biz_roles_heading: "👥 Role Compatibility",
    biz_role_intro: "Based on the traditional zodiac interpretation, these roles may complement each profile — not a guarantee of fit.",
    biz_could_focus_on_tpl: "{name} could potentially focus on:",
    biz_strengths_heading: "💎 Complementary Strengths",
    biz_what_may_bring_tpl: "What {name} May Bring",
    biz_what_together: "What They May Build Together",
    biz_top_strengths_heading: "💚 Biggest Strengths",
    biz_challenges_heading: "⚠️ Potential Business Challenges",
    biz_challenges_intro: "These are practical business considerations worth discussing before forming a partnership — not zodiac predictions.",
    biz_checklist_heading: "📋 Business Partnership Checklist",
    biz_checklist_intro: "Agree on these in writing — ideally with professional legal advice — before you formalize a partnership.",
    biz_summary_heading: "🧧 Business Partnership Summary",
    biz_summary_complementary: "Main complementary qualities:",
    biz_summary_discuss: "Main areas requiring discussion:",
    biz_summary_roles: "Potential role division:",
    biz_extra_heading: "Birth Time & Location",
    biz_extra_unavailable: "Birth time and location were entered but aren't used for additional calculations here — only the Chinese New Year-based zodiac, element, and stem/branch shown above are computed.",
    biz_extra_missing: "Birth time/location weren't provided, so this reading is based on date of birth alone.",
    biz_privacy_inline: "Birth information is used to generate this reading and is not required to be stored.",
    biz_disclaimer: "Chinese astrology and the Five Elements are traditional belief systems intended for cultural exploration, entertainment, and self-reflection. They are not scientifically validated methods for predicting business performance, personality, financial outcomes, or partnership success. Real business decisions should be based on qualifications, experience, financial analysis, contracts, and professional advice.",
    biz_reset: "🔄 Analyze Another Partnership",
    biz_page_cta: "Try our romance & general compatibility calculator →",

    wedding_hero_title: "Wedding Date Picker",
    wedding_hero_subtitle: "Enter both birthdays and a year, and we'll rate each month by how well it sits with both of your zodiac signs — a fun, traditional-pattern starting point for picking your date.",
    wedding_year_label: "Year you're planning to marry",
    wedding_submit: "Find Good Months",
    wedding_results_heading: "Months for {year}",
    wedding_month_col: "Month",
    wedding_animal_col: "Month's animal",
    wedding_rating_col: "Rating",
    wedding_note_col: "Why",
    rating_excellent: "Excellent",
    rating_good: "Good",
    rating_workable: "Workable",
    rating_avoid: "Avoid",
    wedding_note_excellent: "This month's animal sits in the natural \"triangle\" match with both of your signs — traditionally one of the most harmonious combinations.",
    wedding_note_good: "This month's animal is in the natural triangle match with one of you, and neutral with the other — a generally favorable month.",
    wedding_note_workable: "Neither a clash nor a natural match with either of you — a workable, low-friction month.",
    wedding_note_avoid: "This month's animal directly clashes with at least one of your signs — traditionally one to approach carefully, or avoid.",
    wedding_disclaimer: "This is a simplified, fun guide based on the traditional animal-to-month pattern plus general seasonal patterns — not an exact lunar-calendar day pick or a real weather forecast. For a precise date, consider consulting a professional almanac (Tong Shu) or astrologer, and check your specific city's historical weather. Entertainment purposes only.",

    wedding_region_label: "Your general climate region",
    region_northern: "Northern Hemisphere (e.g. USA, Europe, China)",
    region_southern: "Southern Hemisphere (e.g. Australia, South Africa, South America)",
    region_tropical: "Tropical / near the equator (e.g. Cambodia, Southeast Asia)",
    wedding_season_col: "Typical season",
    wedding_holiday_col: "Nearby holidays",
    season_spring: "Spring",
    season_summer: "Summer",
    season_fall: "Fall",
    season_winter: "Winter",
    season_tropical: "Tropical",
    season_note_mild: "Generally mild — a popular wedding season",
    season_note_hot: "Can run hot",
    season_note_cold: "Can be cold or rainy",
    season_note_tropical: "Check your local dry/rainy season",
    no_holidays: "—",
    wedding_top_picks_heading: "Best overall months",
    wedding_top_picks_note: "Combines zodiac compatibility with typically milder weather. Venues and prices can get busier and pricier around the holidays listed — book early if one falls on your month.",
    wedding_top_picks_none: "No month stands out on both zodiac and season this year — the full table below still has good options.",
    wedding_suggested_dates_label: "Suggested Saturdays",

    hero_title: "What Does Your Birthday Say About You?",
    hero_subtitle: "Enter your date of birth to reveal your zodiac animal, element, lucky numbers, and more.",

    checker_hero_title: "Chinese Zodiac Checker",
    checker_hero_subtitle: "Enter your date of birth to find your zodiac animal, element, lucky numbers, colors, and a personalized reading.",

    today_label: "Today",
    today_number_label: "Today's Number",

    today_luck_heading: "Today's Luck for You",
    today_luck_date_tpl: "Checking {date} against your {animal} chart:",
    today_luck_weekday_match_tpl: "✅ Today ({weekday}) is one of your lucky days.",
    today_luck_weekday_nomatch_tpl: "➖ Today ({weekday}) isn't one of your usual lucky days — a quieter day, not a bad one.",
    today_luck_number_match_tpl: "✅ Today's universal number ({number}) is one of your lucky numbers.",
    today_luck_number_nomatch_tpl: "➖ Today's universal number is {number} — not one of your usual lucky numbers.",
    today_luck_month_same_tpl: "✅ This month carries {animal} energy — your own sign — an extra-strong month for you.",
    today_luck_month_triangle_tpl: "✅ This month carries {animal} energy, which is in your natural affinity group — a smooth, supportive month.",
    today_luck_month_clash_tpl: "⚠️ This month carries {animal} energy, which clashes with your sign — a month to move carefully and avoid big risks.",
    today_luck_month_neutral_tpl: "➖ This month carries {animal} energy — neutral for your sign, neither a boost nor a caution.",
    today_luck_verdict_great: "Overall: a great day for you — good timing to act. ✨",
    today_luck_verdict_good: "Overall: a good day — lean into it.",
    today_luck_verdict_ordinary: "Overall: an ordinary day — steady as it goes.",
    today_luck_verdict_caution: "Overall: take it easy today and avoid big decisions if you can.",

    dob_label: "Your date of birth",
    reveal_button: "Reveal My Sign",
    hero_cta_button: "MyBirthSign",

    compat_heading: "Check Compatibility",
    compat_intro: "See how two birthdays match up — for a relationship or a business partnership.",
    doba_label: "Person A's date of birth",
    dobb_label: "Person B's date of birth",
    relationship_legend: "Relationship type",
    romantic_option: "Romantic Partner",
    business_option: "Business Partner",
    compat_submit: "Check Compatibility",

    how_heading: "How This Works",
    how_p1: "Your birth year maps to one of 12 zodiac animals and one of 5 elements, following the traditional East Asian zodiac cycle. The animal reflects personality traits that are said to repeat every 12 years, while the element adds a layer of flavor that repeats every 10 years — together giving a unique 60-year combination (for example, \"Earth Dragon\" or \"Water Tiger\").",
    how_p2: "This tool is designed for fun and self-reflection. Birthdays in late January or February may fall right around the lunar new year cutoff, which can shift the result by one year in some traditional systems — we note this when it applies.",

    blog_heading: "From the Blog",
    blog_link: "Read more about zodiac compatibility, yearly forecasts, and the five elements →",

    footer_about: "About",
    footer_privacy: "Privacy Policy",
    footer_contact: "Contact",
    footer_copyright: "© 2026 MyBirthSign. For entertainment purposes only.",

    result_born: "Born",
    result_zodiac_year: "Zodiac year",
    ai_loading: "✨ Writing your personal reading…",
    strengths: "Strengths",
    watch_out: "Watch out for",
    lucky_numbers: "Lucky numbers",
    lucky_colors: "Lucky colors",
    lucky_days: "Lucky days",
    best_matches: "Best matches with",
    share_button: "Share",
    share_copy_link: "Copy link",
    share_copied: "Link copied!",
    share_paste_note_tpl: "Copied — paste in {network}",
    share_image_option: "Share image",
    share_image_preparing: "Preparing image…",
    share_image_saved: "Image saved!",
    share_image_failed: "Couldn't create the image",
    needs_patience: "Needs extra patience with",
    careers_heading: "Careers that often fit well",
    best_match_years_heading: "Best Match Birth Years",
    disclaimer: "For entertainment purposes only.",
    compat_disclaimer: "For entertainment purposes only — not a substitute for real communication.",
    romantic_label: "Romantic Partner",
    business_label: "Business Partner",

    born_sub_tpl: "Born {date} · Zodiac year {year}",
    lunar_note_with_cny_tpl: "Calculated using the real Lunar New Year date for {year} ({cny}) — not just the calendar year.",
    lunar_note_no_cny_tpl: "Calculated using the real Lunar New Year date for {year} — not just the calendar year.",
    same_sign_note_tpl: "Same sign ({animal}, deep understanding but watch for rivalry): {years}",
    needs_patience_note_tpl: "Needs extra patience with — {animal}: {years}",
    ad_space: "Ad space",

    followup_heading: "Keep exploring",
    followup_year_ahead: "What does this year hold for me?",
    followup_luck_boost: "How can I boost my luck right now?",
    followup_career_fit: "What career path fits me best?",
    followup_clash_relationship_tpl: "How do I get along with a {animal}?",
    followup_loading: "✨ Thinking…",
    followup_luck_fallback_tpl: "Lean on your lucky numbers ({numbers}), lucky colors ({colors}), and favor {days} when timing matters.",
    followup_career_fallback_tpl: "Careers that often fit well: {careers}."
  },
  km: {
    nav_checker: "ទំព័រដើម",
    nav_checker_page: "ឧបករណ៍ពិនិត្យ",
    nav_tools: "ឧបករណ៍",
    nav_animals: "មគ្គុទ្ទេសក៍និមិត្តសញ្ញា",
    nav_compatibility: "គួរស្រករ",
    nav_wedding: "ថ្ងៃមង្គល",
    nav_blog: "ប្លុក",
    nav_about: "អំពីយើង",
    nav_contact: "ទាក់ទង",
    nav_more: "ផ្សេងៗ",
    lang_toggle_en: "EN",
    lang_toggle_km: "ខ្មែរ",

    animals_hero_title: "មគ្គុទ្ទេសក៍ពេញលេញនៃសត្វនិមិត្តសញ្ញាចិនទាំង១២",
    animals_hero_subtitle: "សត្វនិមិត្តសញ្ញាទាំង១២ — បុគ្គលិកលក្ខណៈ សំណាង និងភាពសមស្របជាមួយអ្នកដទៃ។ ចុចលើសត្វនីមួយៗដើម្បីអានព័ត៌មានពេញលេញ។",
    animals_read_more: "អានបុគ្គលិកលក្ខណៈពេញលេញ",
    animals_cta: "ពិនិត្យនិមិត្តសញ្ញារបស់អ្នក →",

    compat_page_hero_title: "ឧបករណ៍ពិនិត្យភាពសមស្របនិមិត្តសញ្ញា",
    compat_page_hero_subtitle: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតពីរ ដើម្បីមើលថានិមិត្តសញ្ញារបស់អ្នកសមគ្នាកម្រិតណា — សម្រាប់ស្នេហា ឬអាជីវកម្ម។",
    compat_page_cta: "ពិនិត្យនិមិត្តសញ្ញារបស់អ្នក →",

    rc_hero_title: "💞 ឧបករណ៍គណនាភាពសមស្របនៃទំនាក់ទំនង",
    rc_hero_subtitle: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតទាំងពីរ ដើម្បីទទួលបានរបាយការណ៍ភាពសមស្របពេញលេញ — រាសន៍លោកខាងលិច លេខវិទ្យាផ្លូវជីវិត និងការវិភាគទំនាក់ទំនងចំនួន១១ផ្នែក។",
    rc_person1_legend: "អ្នកទី១",
    rc_person2_legend: "អ្នកទី២",
    rc_name_label: "ឈ្មោះ ឬឈ្មោះហៅក្រៅ (មិនបង្ខំ)",
    rc_dob_label_req: "ថ្ងៃខែឆ្នាំកំណើត (ត្រូវការ)",
    rc_time_label: "ម៉ោងកំណើត (មិនបង្ខំ)",
    rc_location_label: "ទីកន្លែងកំណើត (មិនបង្ខំ)",
    rc_location_placeholder: "ទីក្រុង ប្រទេស",
    rc_gender_label: "ភេទ (មិនបង្ខំ)",
    rc_gender_prefer_not: "មិនចង់បញ្ជាក់",
    rc_gender_woman: "ស្រី",
    rc_gender_man: "ប្រុស",
    rc_gender_nonbinary: "មិនកំណត់ភេទ",
    rc_submit: "❤️ គណនាភាពសមស្រប",
    rc_privacy_note: "ព័ត៌មានរបស់អ្នកត្រូវបានប្រើដើម្បីគណនាលទ្ធផលនេះតែប៉ុណ្ណោះ។ ព័ត៌មានកំណើតមិនត្រូវការរក្សាទុកទេ ហើយអ្វីដែលអ្នកបញ្ចូលទីនេះមិនត្រូវបានផ្ញើទៅសេវាកម្មខាងក្រៅឡើយ — ការគណនាទាំងអស់ត្រូវបានធ្វើនៅក្នុងកម្មវិធីរុករករបស់អ្នកផ្ទាល់។",
    rc_quick_check_heading: "ចូលចិត្តការពិនិត្យសត្វនិមិត្តសញ្ញាចិនរហ័សជាង?",
    rc_quick_check_intro: "ឧបករណ៍គណនាខាងលើប្រើរាសន៍លោកខាងលិច និងលេខវិទ្យា។ សម្រាប់ការផ្គូផ្គងសត្វនិមិត្តសញ្ញាចិនដែលប្រើនៅកន្លែងផ្សេងលើគេហទំព័រនេះ សូមប្រើការពិនិត្យរហ័សខាងក្រោម។",
    rc_err_required: "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទាំងពីរ។",
    rc_err_future: "ថ្ងៃកំណើតមិនអាចនៅថ្ងៃអនាគតបានទេ — សូមពិនិត្យថ្ងៃដែលបានបញ្ចូល។",
    rc_err_invalid: "ថ្ងៃមួយក្នុងចំណោមថ្ងៃដែលបានបញ្ចូលមិនត្រឹមត្រូវទេ — សូមពិនិត្យមើលម្តងទៀត។",
    rc_western_zodiac_heading: "រាសន៍លោកខាងលិច",
    rc_chinese_zodiac_heading: "រាសន៍ចិន",
    rc_numerology_heading: "លេខវិទ្យា",
    rc_life_path_label: "លេខផ្លូវជីវិត",
    rc_birthday_number_label: "លេខថ្ងៃកំណើត",
    rc_attitude_number_label: "លេខឥរិយាបថ",
    rc_numerology_method_note: "វិធីសាស្ត្រប្រើប្រាស់៖ ខែ ថ្ងៃ និងឆ្នាំ ត្រូវបានកាត់បន្ថយដោយឡែកពីគ្នា ដោយរក្សាលេខមេ ១១ ២២ និង៣៣ នៅគ្រប់ដំណាក់កាល បន្ទាប់មកបូកនិងកាត់បន្ថយលទ្ធផលទាំងបីតាមវិធីដូចគ្នា។",
    rc_summary_heading: "សេចក្តីសង្ខេបភាពសមស្រប",
    rc_summary_disclaimer: "ចំណុចភាពសមស្របទាំងនេះផ្អែកលើប្រព័ន្ធតារាសាស្ត្រ និងលេខវិទ្យាបែបប្រពៃណី សម្រាប់ការកម្សាន្ត/ការពិចារណាខ្លួនឯង មិនមែនជាវិធីសាស្ត្រវិទ្យាសាស្ត្រដែលបានបញ្ជាក់ទេ។",
    rc_analysis_heading: "ការវិភាគទំនាក់ទំនង",
    rc_works_well_label: "អ្វីដែលអាចល្អ",
    rc_challenge_label: "អ្វីដែលអាចបង្កបញ្ហា",
    rc_insights_heading: "ការយល់ដឹងផ្ទាល់ខ្លួន",
    rc_strengths_heading: "💚 ចំណុចខ្លាំងសំខាន់",
    rc_challenges_heading: "⚠️ បញ្ហាប្រឈមដែលអាចកើតមាន",
    rc_tips_heading: "💡 គន្លឹះទំនាក់ទំនង",
    rc_needs_heading: "❤️ អ្វីដែលម្នាក់ៗអាចត្រូវការ",
    rc_comm_tip_heading: "💬 គន្លឹះទំនាក់ទំនងគ្នា",
    rc_love_tip_heading: "💕 គន្លឹះស្នេហា",
    rc_extra_astro_heading: "ខែ ចន្ទគតិ រាងកំណើត ភពសុក្រ និងភពអង្គារ",
    rc_extra_astro_missing: "ម៉ោង ឬទីកន្លែងកំណើតមិនត្រូវបានផ្តល់ទេ ដូច្នេះផ្នែកនេះផ្អែកជាចម្បងលើភាពសមស្របនៃរាសន៍ព្រះអាទិត្យ។",
    rc_extra_astro_unavailable: "រាសន៍ខែ ចន្ទគតិ រាងកំណើត ភពសុក្រ និងភពអង្គារ ទាមទារការគណនាតារាសាស្ត្រយ៉ាងជាក់លាក់ ដែលឧបករណ៍នេះមិនទាន់អាចធ្វើបានទេ ដូច្នេះយើងនឹងមិនស្មានវាទេ ទោះបីជាបានបញ្ចូលម៉ោង និងទីកន្លែងកំណើតក៏ដោយ។ អ្វីៗខាងលើផ្អែកលើភាពសមស្របនៃរាសន៍ព្រះអាទិត្យ និងលេខវិទ្យាតែប៉ុណ្ណោះ។",
    rc_disclaimer: "តារាសាស្ត្រ និងលេខវិទ្យាគឺជាប្រព័ន្ធជំនឿបែបប្រពៃណីដែលមានគោលបំណងសម្រាប់ការកម្សាន្ត និងការពិចារណាខ្លួនឯង។ វាមិនមែនជាវិធីសាស្ត្រវិទ្យាសាស្ត្រដែលបានបញ្ជាក់សម្រាប់ទស្សន៍ទាយបុគ្គលិកលក្ខណៈ ភាពជោគជ័យនៃទំនាក់ទំនង ឬព្រឹត្តិការណ៍អនាគតឡើយ។",
    rc_narrative_lang_note: "ការវិភាគលម្អិតខាងក្រោមបង្ហាញជាភាសាអង់គ្លេសតែប៉ុណ្ណោះនៅពេលនេះ។",
    rc_pair_header_tpl: "{p1} {symbol1} {p1sign}  ❤️  {p2} {symbol2} {p2sign}",

    nav_business: "ដៃគូអាជីវកម្ម",
    biz_hero_title: "💼 ភាពសមស្របដៃគូអាជីវកម្ម",
    biz_hero_subtitle: "រាសន៍ចិន • ធាតុទាំងប្រាំ • បុគ្គលិកលក្ខណៈអាជីវកម្ម",
    biz_person1_legend: "អ្នកទី១",
    biz_person2_legend: "អ្នកទី២",
    biz_name_label: "ឈ្មោះពេញ / ឈ្មោះអាជីវកម្ម (មិនបង្ខំ)",
    biz_dob_label_req: "ថ្ងៃខែឆ្នាំកំណើត (ត្រូវការ)",
    biz_time_label: "ម៉ោងកំណើត (មិនបង្ខំ)",
    biz_location_label: "ទីកន្លែងកំណើត (មិនបង្ខំ)",
    biz_location_placeholder: "ទីក្រុង ប្រទេស",
    biz_submit: "💼 គណនាភាពសមស្របអាជីវកម្ម",
    biz_privacy_note: "ព័ត៌មានកំណើតត្រូវបានប្រើដើម្បីបង្កើតលទ្ធផលនេះតែប៉ុណ្ណោះ ហើយមិនត្រូវការរក្សាទុកទេ។ ការគណនាត្រូវបានធ្វើនៅក្នុងកម្មវិធីរុករករបស់អ្នកផ្ទាល់។",
    biz_err_required: "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទាំងពីរ។",
    biz_err_future: "ថ្ងៃកំណើតមិនអាចនៅថ្ងៃអនាគតបានទេ — សូមពិនិត្យថ្ងៃដែលបានបញ្ចូល។",
    biz_err_invalid: "ថ្ងៃមួយក្នុងចំណោមថ្ងៃដែលបានបញ្ចូលមិនត្រឹមត្រូវទេ — សូមពិនិត្យមើលម្តងទៀត។",
    biz_heavenly_stem_label: "ដ៏ឋានសួគ៌ (Heavenly Stem)",
    biz_earthly_branch_label: "សាខាផែនដី (Earthly Branch)",
    biz_five_elements_heading: "ធាតុទាំងប្រាំ",
    biz_elements_disclaimer: "អន្តរកម្មធាតុគឺជាក្របខណ្ឌប្រពៃណី មិនមែនជាការទស្សន៍ទាយវិទ្យាសាស្ត្រចំពោះលទ្ធផលអាជីវកម្មទេ។",
    biz_dashboard_heading: "ផ្ទាំងគ្រប់គ្រងភាពសមស្រប",
    biz_dashboard_disclaimer: "ពិន្ទុបែបកម្សាន្តផ្អែកលើតារាសាស្ត្រចិនបែបប្រពៃណី។ វាមិនមែនជារង្វាស់វិទ្យាសាស្ត្រទេ និងមិនគួរប្រើជំនួសការវាយតម្លៃដៃគូអាជីវកម្មពិតប្រាកដឡើយ។",
    biz_analysis_heading: "ការវិភាគភាពសមស្របអាជីវកម្ម",
    biz_narrative_lang_note: "ការវិភាគលម្អិតខាងក្រោមបង្ហាញជាភាសាអង់គ្លេសតែប៉ុណ្ណោះនៅពេលនេះ។",
    biz_works_well_label: "អ្វីដែលអាចល្អ",
    biz_challenge_label: "អ្វីដែលអាចបង្កបញ្ហា",
    biz_roles_heading: "👥 ភាពសមស្របតួនាទី",
    biz_role_intro: "ផ្អែកលើការបកស្រាយតាមប្រពៃណីនៃរាសន៍ តួនាទីទាំងនេះអាចសមស្របនឹងប្រវត្តិរូបនីមួយៗ — មិនមែនជាការធានាភាពសមស្របទេ។",
    biz_could_focus_on_tpl: "{name} អាចផ្តោតលើ៖",
    biz_strengths_heading: "💎 ចំណុចខ្លាំងបំពេញគ្នា",
    biz_what_may_bring_tpl: "អ្វីដែល {name} អាចនាំមក",
    biz_what_together: "អ្វីដែលពួកគេអាចសាងសង់ជាមួយគ្នា",
    biz_top_strengths_heading: "💚 ចំណុចខ្លាំងសំខាន់",
    biz_challenges_heading: "⚠️ បញ្ហាប្រឈមអាជីវកម្មដែលអាចកើតមាន",
    biz_challenges_intro: "ទាំងនេះជាការពិចារណាអាជីវកម្មជាក់ស្តែងដែលគួរពិភាក្សាមុននឹងបង្កើតភាពជាដៃគូ — មិនមែនជាការទស្សន៍ទាយតាមរាសន៍ទេ។",
    biz_checklist_heading: "📋 បញ្ជីត្រួតពិនិត្យភាពជាដៃគូអាជីវកម្ម",
    biz_checklist_intro: "យល់ព្រមលើរឿងទាំងនេះជាលាយលក្ខណ៍អក្សរ — ល្អបំផុតជាមួយការប្រឹក្សាផ្នែកច្បាប់ — មុននឹងបង្កើតភាពជាដៃគូជាផ្លូវការ។",
    biz_summary_heading: "🧧 សេចក្តីសង្ខេបភាពជាដៃគូអាជីវកម្ម",
    biz_summary_complementary: "គុណភាពបំពេញគ្នាសំខាន់ៗ៖",
    biz_summary_discuss: "ផ្នែកសំខាន់ៗដែលត្រូវពិភាក្សា៖",
    biz_summary_roles: "ការបែងចែកតួនាទីប្រហែល៖",
    biz_extra_heading: "ម៉ោង និងទីកន្លែងកំណើត",
    biz_extra_unavailable: "ម៉ោង និងទីកន្លែងកំណើតត្រូវបានបញ្ចូល ប៉ុន្តែមិនត្រូវបានប្រើសម្រាប់ការគណនាបន្ថែមទីនេះទេ — មានតែរាសន៍ដោយផ្អែកលើឆ្នាំចូលថ្មីចិន ធាតុ និងដ និងសាខាដែលបង្ហាញខាងលើប៉ុណ្ណោះដែលត្រូវបានគណនា។",
    biz_extra_missing: "ម៉ោង/ទីកន្លែងកំណើតមិនត្រូវបានផ្តល់ទេ ដូច្នេះការអាននេះផ្អែកលើថ្ងៃខែឆ្នាំកំណើតតែប៉ុណ្ណោះ។",
    biz_privacy_inline: "ព័ត៌មានកំណើតត្រូវបានប្រើដើម្បីបង្កើតលទ្ធផលនេះតែប៉ុណ្ណោះ និងមិនត្រូវការរក្សាទុកទេ។",
    biz_disclaimer: "តារាសាស្ត្រចិន និងធាតុទាំងប្រាំគឺជាប្រព័ន្ធជំនឿបែបប្រពៃណីដែលមានគោលបំណងសម្រាប់ការស្វែងយល់វប្បធម៌ ការកម្សាន្ត និងការពិចារណាខ្លួនឯង។ វាមិនមែនជាវិធីសាស្ត្រវិទ្យាសាស្ត្រដែលបានបញ្ជាក់សម្រាប់ទស្សន៍ទាយការអនុវត្តអាជីវកម្ម បុគ្គលិកលក្ខណៈ លទ្ធផលហិរញ្ញវត្ថុ ឬភាពជោគជ័យនៃភាពជាដៃគូឡើយ។ ការសម្រេចចិត្តអាជីវកម្មពិតប្រាកដគួរផ្អែកលើគុណវុឌ្ឍិ បទពិសោធន៍ ការវិភាគហិរញ្ញវត្ថុ កិច្ចសន្យា និងការប្រឹក្សាវិជ្ជាជីវៈ។",
    biz_reset: "🔄 វិភាគភាពជាដៃគូមួយទៀត",
    biz_page_cta: "សាកល្បងឧបករណ៍គណនាភាពសមស្របស្នេហា និងទូទៅរបស់យើង →",

    wedding_hero_title: "ជ្រើសរើសថ្ងៃមង្គលការ",
    wedding_hero_subtitle: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតទាំងពីរ និងឆ្នាំ យើងនឹងវាយតម្លៃខែនីមួយៗតាមភាពសមស្របជាមួយនិមិត្តសញ្ញាទាំងពីររបស់អ្នក — ជាចំណុចចាប់ផ្តើមកម្សាន្តតាមបែបប្រពៃណីសម្រាប់ការជ្រើសរើសកាលបរិច្ឆេទរបស់អ្នក។",
    wedding_year_label: "ឆ្នាំដែលអ្នកគ្រោងនឹងរៀបការ",
    wedding_submit: "ស្វែងរកខែល្អ",
    wedding_results_heading: "ខែសម្រាប់ឆ្នាំ {year}",
    wedding_month_col: "ខែ",
    wedding_animal_col: "សត្វនិមិត្តសញ្ញាប្រចាំខែ",
    wedding_rating_col: "ការវាយតម្លៃ",
    wedding_note_col: "មូលហេតុ",
    rating_excellent: "ល្អប្រសើរបំផុត",
    rating_good: "ល្អ",
    rating_workable: "អាចប្រើបាន",
    rating_avoid: "គួរចៀសវាង",
    wedding_note_excellent: "សត្វនិមិត្តសញ្ញាប្រចាំខែនេះស្ថិតនៅក្នុង \"ត្រីកោណ\" ភាពសមស្របជាមួយនិមិត្តសញ្ញាទាំងពីររបស់អ្នក — ជាទូទៅចាត់ទុកជាការផ្សំដ៏សុខដុមរមនាបំផុតមួយតាមបែបប្រពៃណី។",
    wedding_note_good: "សត្វនិមិត្តសញ្ញាប្រចាំខែនេះស្ថិតនៅក្នុងត្រីកោណភាពសមស្របជាមួយម្នាក់ក្នុងចំណោមអ្នក និងធម្យមជាមួយម្នាក់ទៀត — ជាទូទៅជាខែល្អ។",
    wedding_note_workable: "មិនមែនជាការប្រឆាំង ហើយក៏មិនមែនជាការសមស្របធម្មជាតិជាមួយអ្នកទាំងពីរដែរ — ជាខែដែលអាចប្រើបាន មិនមានបញ្ហាច្រើន។",
    wedding_note_avoid: "សត្វនិមិត្តសញ្ញាប្រចាំខែនេះប្រឆាំងផ្ទាល់ជាមួយនិមិត្តសញ្ញាយ៉ាងហោចណាស់ម្នាក់ក្នុងចំណោមអ្នក — តាមបែបប្រពៃណីគួរប្រុងប្រយ័ត្ន ឬចៀសវាង។",
    wedding_disclaimer: "នេះជាមគ្គុទ្ទេសក៍សាមញ្ញ និងកម្សាន្ត ដោយផ្អែកលើលំនាំប្រពៃណីនៃការផ្គូផ្គងសត្វនិមិត្តសញ្ញាទៅនឹងខែ បូកនឹងលំនាំរដូវកាលទូទៅ — មិនមែនជាការជ្រើសរើសថ្ងៃតាមប្រតិទិនចន្ទគតិយ៉ាងពិតប្រាកដ ឬការទស្សន៍ទាយអាកាសធាតុពិតប្រាកដនោះទេ។ សម្រាប់កាលបរិច្ឆេទពិតប្រាកដ សូមពិគ្រោះជាមួយអ្នកជំនាញ ឬឆ្លុះបញ្ចាំងប្រតិទិនប្រពៃណី ហើយពិនិត្យអាកាសធាតុកន្លងមករបស់ទីក្រុងអ្នកផ្ទាល់។ សម្រាប់តែការកម្សាន្តប៉ុណ្ណោះ។",

    wedding_region_label: "តំបន់អាកាសធាតុទូទៅរបស់អ្នក",
    region_northern: "អឌ្ឍគោលខាងជើង (ឧ. សហរដ្ឋអាមេរិក អឺរ៉ុប ចិន)",
    region_southern: "អឌ្ឍគោលខាងត្បូង (ឧ. អូស្ត្រាលី អាហ្វ្រិកខាងត្បូង អាមេរិកខាងត្បូង)",
    region_tropical: "តំបន់ត្រូពិក / ជិតខ្សែអេក្វាទ័រ (ឧ. កម្ពុជា អាស៊ីអាគ្នេយ៍)",
    wedding_season_col: "រដូវកាលធម្មតា",
    wedding_holiday_col: "ថ្ងៃបុណ្យនៅជិត",
    season_spring: "រដូវផ្ការីក",
    season_summer: "រដូវក្តៅ",
    season_fall: "រដូវស្លឹកឈើជ្រុះ",
    season_winter: "រដូវរងា",
    season_tropical: "ត្រូពិក",
    season_note_mild: "ជាទូទៅមានអាកាសធាតុស្រួល — រដូវកាលមង្គលការដ៏ពេញនិយម",
    season_note_hot: "អាចក្តៅ",
    season_note_cold: "អាចត្រជាក់ ឬមានភ្លៀង",
    season_note_tropical: "សូមពិនិត្យរដូវវស្សា/រដូវប្រាំងនៅតំបន់របស់អ្នក",
    no_holidays: "—",
    wedding_top_picks_heading: "ខែដែលល្អបំផុតជារួម",
    wedding_top_picks_note: "រួមបញ្ចូលគ្នារវាងភាពសមស្របនិមិត្តសញ្ញា និងអាកាសធាតុទូទៅស្រួល។ កន្លែងរៀបការ និងតម្លៃអាចកើនឡើង ឬមមាញឹកនៅជិតថ្ងៃបុណ្យដែលបានរាយខាងលើ — គួរកក់ទុកមុន ប្រសិនបើខែរបស់អ្នកជាប់ថ្ងៃបុណ្យ។",
    wedding_top_picks_none: "មិនមានខែណាលេចធ្លោទាំងខាងនិមិត្តសញ្ញា និងរដូវកាលសម្រាប់ឆ្នាំនេះទេ — តារាងពេញលេញខាងក្រោមនៅតែមានជម្រើសល្អ។",
    wedding_suggested_dates_label: "ថ្ងៃសៅរ៍ដែលស្នើឡើង",

    hero_title: "ថ្ងៃកំណើតរបស់អ្នកបកស្រាយអំពីអ្នកយ៉ាងណា?",
    hero_subtitle: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នក ដើម្បីដឹងពីសត្វនិមិត្តសញ្ញា ធាតុ លេខសំណាង និងព័ត៌មានជាច្រើនទៀត។",

    checker_hero_title: "ឧបករណ៍ពិនិត្យនិមិត្តសញ្ញាចិន",
    checker_hero_subtitle: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នក ដើម្បីដឹងពីសត្វនិមិត្តសញ្ញា ធាតុ លេខសំណាង ពណ៌សំណាង និងការទស្សន៍ទាយផ្ទាល់ខ្លួន។",

    today_label: "ថ្ងៃនេះ",
    today_number_label: "លេខថ្ងៃនេះ",

    today_luck_heading: "សំណាងថ្ងៃនេះសម្រាប់អ្នក",
    today_luck_date_tpl: "ពិនិត្យ {date} ធៀបនឹងនិមិត្តសញ្ញា {animal} របស់អ្នក៖",
    today_luck_weekday_match_tpl: "✅ ថ្ងៃនេះ ({weekday}) គឺជាថ្ងៃសំណាងមួយរបស់អ្នក។",
    today_luck_weekday_nomatch_tpl: "➖ ថ្ងៃនេះ ({weekday}) មិនមែនជាថ្ងៃសំណាងធម្មតារបស់អ្នកទេ — ជាថ្ងៃស្ងប់ស្ងាត់ មិនមែនថ្ងៃអាក្រក់ទេ។",
    today_luck_number_match_tpl: "✅ លេខថ្ងៃនេះ ({number}) គឺជាលេខសំណាងមួយរបស់អ្នក។",
    today_luck_number_nomatch_tpl: "➖ លេខថ្ងៃនេះគឺ {number} — មិនមែនជាលេខសំណាងធម្មតារបស់អ្នកទេ។",
    today_luck_month_same_tpl: "✅ ខែនេះមានថាមពល {animal} — គឺជានិមិត្តសញ្ញារបស់អ្នកផ្ទាល់ — ជាខែដ៏រឹងមាំសម្រាប់អ្នក។",
    today_luck_month_triangle_tpl: "✅ ខែនេះមានថាមពល {animal} ដែលស្ថិតនៅក្នុងក្រុមដែលចូលគ្នាបានល្អជាមួយអ្នក — ជាខែរលូននិងគាំទ្រល្អ។",
    today_luck_month_clash_tpl: "⚠️ ខែនេះមានថាមពល {animal} ដែលប្រឆាំងនឹងនិមិត្តសញ្ញារបស់អ្នក — ជាខែដែលគួរប្រុងប្រយ័ត្ន និងជៀសវាងហានិភ័យធំៗ។",
    today_luck_month_neutral_tpl: "➖ ខែនេះមានថាមពល {animal} — អព្យាក្រឹតចំពោះនិមិត្តសញ្ញារបស់អ្នក មិនល្អមិនអាក្រក់។",
    today_luck_verdict_great: "សរុប៖ ជាថ្ងៃដ៏ល្អប្រសើរសម្រាប់អ្នក — ជាពេលវេលាល្អសម្រាប់សកម្មភាព។ ✨",
    today_luck_verdict_good: "សរុប៖ ជាថ្ងៃល្អ — ត្រូវប្រើឱកាសនេះ។",
    today_luck_verdict_ordinary: "សរុប៖ ជាថ្ងៃធម្មតា — បន្តទៅមុខដោយនឹងនរ។",
    today_luck_verdict_caution: "សរុប៖ ថ្ងៃនេះគួរធ្វើអ្វីៗដោយធម្មតា និងជៀសវាងការសម្រេចចិត្តធំៗបើអាចធ្វើបាន។",

    dob_label: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នក",
    reveal_button: "បង្ហាញនិមិត្តសញ្ញារបស់ខ្ញុំ",
    hero_cta_button: "ថ្ងៃ​កំណើត​របស់ខ្ញុំ",

    compat_heading: "ពិនិត្យភាពសមស្រប",
    compat_intro: "មើលថាកំណើតទាំងពីរសមស្របគ្នាកម្រិតណា — សម្រាប់ទំនាក់ទំនងស្នេហា ឬដៃគូអាជីវកម្ម។",
    doba_label: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទី១",
    dobb_label: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទី២",
    relationship_legend: "ប្រភេទទំនាក់ទំនង",
    romantic_option: "ដៃគូស្នេហា",
    business_option: "ដៃគូអាជីវកម្ម",
    compat_submit: "ពិនិត្យភាពសមស្រប",

    how_heading: "របៀបដែលវាដំណើរការ",
    how_p1: "ឆ្នាំកំណើតរបស់អ្នកត្រូវនឹងសត្វនិមិត្តសញ្ញាមួយក្នុងចំណោម១២ និងធាតុមួយក្នុងចំណោម៥ ដោយដើរតាមវដ្តនិមិត្តសញ្ញាអាស៊ីបូព៌ាបែបប្រពៃណី។ សត្វនិមិត្តសញ្ញាបង្ហាញពីគុណសម្បត្តិបុគ្គលិកលក្ខណៈដែលគេនិយាយថាវិលត្រឡប់មកវិញរៀងរាល់១២ឆ្នាំ ចំណែកធាតុបន្ថែមស្រទាប់រស់ជាតិដែលវិលត្រឡប់មកវិញរៀងរាល់១០ឆ្នាំ — រួមគ្នាផ្តល់ជាការផ្សំពិសេសមួយរយៈពេល៦០ឆ្នាំ (ឧទាហរណ៍ \"រោងដី\" ឬ \"ខាលទឹក\")។",
    how_p2: "ឧបករណ៍នេះត្រូវបានរចនាឡើងសម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងពីខ្លួនឯង។ អ្នកដែលកើតនៅចុងខែមករា ឬខែកុម្ភៈ អាចស្ថិតនៅជិតកាលបរិច្ឆេទផ្តាច់ចូលឆ្នាំចន្ទគតិ ដែលអាចផ្លាស់ប្តូរលទ្ធផលមួយឆ្នាំក្នុងប្រព័ន្ធបុរាណខ្លះ — យើងកត់សម្គាល់ករណីនេះនៅពេលដែលវាពាក់ព័ន្ធ។",

    blog_heading: "ពីប្លុករបស់យើង",
    blog_link: "អានបន្ថែមអំពីភាពសមស្របនិមិត្តសញ្ញា ទស្សន៍ទាយប្រចាំឆ្នាំ និងធាតុទាំងប្រាំ →",

    footer_about: "អំពីយើង",
    footer_privacy: "គោលការណ៍ឯកជនភាព",
    footer_contact: "ទាក់ទង",
    footer_copyright: "© ២០២៦ MyBirthSign។ សម្រាប់តែការកម្សាន្តប៉ុណ្ណោះ។",

    result_born: "កើតនៅថ្ងៃ",
    result_zodiac_year: "ឆ្នាំនិមិត្តសញ្ញា",
    ai_loading: "✨ កំពុងសរសេរការទស្សន៍ទាយផ្ទាល់ខ្លួនរបស់អ្នក…",
    strengths: "ភាពខ្លាំង",
    watch_out: "ប្រុងប្រយ័ត្នចំពោះ",
    lucky_numbers: "លេខសំណាង",
    lucky_colors: "ពណ៌សំណាង",
    lucky_days: "ថ្ងៃសំណាង",
    best_matches: "ត្រូវគ្នាបំផុតជាមួយ",
    share_button: "ចែករំលែក",
    share_copy_link: "ចម្លងតំណ",
    share_copied: "បានចម្លងតំណហើយ!",
    share_paste_note_tpl: "បានចម្លង — សូមបិទភ្ជាប់ក្នុង {network}",
    share_image_option: "ចែករំលែករូបភាព",
    share_image_preparing: "កំពុងរៀបចំរូបភាព...",
    share_image_saved: "បានរក្សាទុករូបភាព!",
    share_image_failed: "មិនអាចបង្កើតរូបភាពបានទេ",
    needs_patience: "ត្រូវការការអត់ធ្មត់បន្ថែមជាមួយ",
    careers_heading: "មុខរបរដែលសមស្រប",
    best_match_years_heading: "ឆ្នាំកំណើតដែលសមស្របបំផុត",
    disclaimer: "សម្រាប់តែការកម្សាន្តប៉ុណ្ណោះ។",
    compat_disclaimer: "សម្រាប់តែការកម្សាន្តប៉ុណ្ណោះ — មិនអាចជំនួសការប្រាស្រ័យទាក់ទងពិតប្រាកដបានទេ។",
    romantic_label: "ដៃគូស្នេហា",
    business_label: "ដៃគូអាជីវកម្ម",

    born_sub_tpl: "កើតនៅថ្ងៃ {date} · ឆ្នាំនិមិត្តសញ្ញា {year}",
    lunar_note_with_cny_tpl: "គណនាដោយប្រើកាលបរិច្ឆេទចូលឆ្នាំចន្ទគតិពិតប្រាកដសម្រាប់ {year} ({cny}) — មិនមែនគ្រាន់តែឆ្នាំសុរិយវិទ្យាទេ។",
    lunar_note_no_cny_tpl: "គណនាដោយប្រើកាលបរិច្ឆេទចូលឆ្នាំចន្ទគតិពិតប្រាកដសម្រាប់ {year} — មិនមែនគ្រាន់តែឆ្នាំសុរិយវិទ្យាទេ។",
    same_sign_note_tpl: "និមិត្តសញ្ញាដូចគ្នា ({animal} យល់ដឹងគ្នាស៊ីជម្រៅ ប៉ុន្តែប្រុងប្រយ័ត្នការប្រកួតប្រជែង): {years}",
    needs_patience_note_tpl: "ត្រូវការការអត់ធ្មត់បន្ថែមជាមួយ — {animal}: {years}",
    ad_space: "ទំនេរសម្រាប់ផ្សាយពាណិជ្ជកម្ម",

    followup_heading: "បន្តស្វែងយល់",
    followup_year_ahead: "ឆ្នាំនេះនឹងនាំអ្វីមកខ្ញុំ?",
    followup_luck_boost: "តើខ្ញុំអាចបង្កើនសំណាងរបស់ខ្ញុំយ៉ាងណា?",
    followup_career_fit: "មុខរបរអ្វីសមនឹងខ្ញុំជាងគេ?",
    followup_clash_relationship_tpl: "តើខ្ញុំត្រូវរស់នៅជាមួយ {animal} យ៉ាងណាឱ្យសុខដុម?",
    followup_loading: "✨ កំពុងគិត…",
    followup_luck_fallback_tpl: "ពឹងផ្អែកលើលេខសំណាង ({numbers}) ពណ៌សំណាង ({colors}) និងប្រើ{days}នៅពេលចាំបាច់ត្រូវការពេលវេលាត្រឹមត្រូវ។",
    followup_career_fallback_tpl: "មុខរបរដែលសមស្រប៖ {careers}។"
  }
};

// ---------------------------------------------------------------------------
// Language-state helpers
// ---------------------------------------------------------------------------
const LANG_STORAGE_KEY = "siteLang";

function getLang() {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "en" || stored === "km") return stored;
  } catch (e) {
    // localStorage unavailable (private mode, etc.) — fall through to auto-detect.
  }
  try {
    const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.indexOf("km") === 0) return "km";
  } catch (e) {
    // navigator unavailable
  }
  return "en";
}

function setLang(lang) {
  if (lang !== "en" && lang !== "km") return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    // best effort only
  }
  if (typeof window !== "undefined" && window.location && typeof window.location.reload === "function") {
    window.location.reload();
  }
}

function t(key) {
  const lang = getLang();
  return (UI_STRINGS[lang] && UI_STRINGS[lang][key]) || (UI_STRINGS.en && UI_STRINGS.en[key]) || "";
}

/** Replace {placeholders} in a template string with values from `vars`. */
function fmt(str, vars) {
  return str.replace(/\{(\w+)\}/g, function (match, key) {
    return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : match;
  });
}

// ---------------------------------------------------------------------------
// DOM wiring: static [data-i18n] text, [data-lang-content] blocks, toggle
// ---------------------------------------------------------------------------
function applyStaticTranslations() {
  const lang = getLang();
  try {
    document.documentElement.lang = lang;
  } catch (e) { /* ignore */ }

  const strings = UI_STRINGS[lang] || UI_STRINGS.en;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const key = el.getAttribute("data-i18n");
    if (strings[key] !== undefined) {
      el.textContent = strings[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    const key = el.getAttribute("data-i18n-placeholder");
    if (strings[key] !== undefined) {
      el.setAttribute("placeholder", strings[key]);
    }
  });

  document.querySelectorAll("[data-lang-content]").forEach(function (el) {
    const elLang = el.getAttribute("data-lang-content");
    el.style.display = elLang === lang ? "" : "none";
  });

  document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
    const btnLang = btn.getAttribute("data-lang-switch");
    if (btnLang === lang) {
      btn.classList.add("lang-active");
    } else {
      btn.classList.remove("lang-active");
    }
  });

  // Native <input type="date"> pickers follow the nearest `lang` attribute
  // for their calendar locale/numerals. Pin them to English/Gregorian so
  // the picker UI doesn't flip into Khmer numerals when the page does.
  document.querySelectorAll('input[type="date"]').forEach(function (el) {
    el.setAttribute("lang", "en");
  });
}

function initLangToggle() {
  document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      setLang(btn.getAttribute("data-lang-switch"));
    });
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    applyStaticTranslations();
    initLangToggle();
  });
}

// Expose a namespaced object too, for callers that prefer it (e.g. app.js,
// or a test harness) while keeping the plain globals above for convenience.
const ZodiacI18N = {
  getLang: getLang,
  setLang: setLang,
  t: t,
  fmt: fmt,
  applyStaticTranslations: applyStaticTranslations,
  initLangToggle: initLangToggle,
  KM_ANIMAL_NAMES: KM_ANIMAL_NAMES,
  KM_ANIMAL_COMMON_NAMES: KM_ANIMAL_COMMON_NAMES,
  KM_ELEMENT_NAMES: KM_ELEMENT_NAMES,
  KM_ANIMAL_INFO: KM_ANIMAL_INFO,
  KM_ELEMENT_INFO: KM_ELEMENT_INFO,
  KM_COMPAT_INFO: KM_COMPAT_INFO,
  KM_LIFE_PATH_INFO: KM_LIFE_PATH_INFO,
  UI_STRINGS: UI_STRINGS
};

// `const`/`let` declarations don't become properties of `window` the way
// `var` does, so expose the pieces a test harness (or any other script)
// might reach for via `window.X` explicitly.
if (typeof window !== "undefined") {
  window.ZodiacI18N = ZodiacI18N;
  window.getLang = getLang;
  window.setLang = setLang;
  window.t = t;
  window.fmt = fmt;
  window.UI_STRINGS = UI_STRINGS;
  window.KM_ANIMAL_NAMES = KM_ANIMAL_NAMES;
  window.KM_ANIMAL_COMMON_NAMES = KM_ANIMAL_COMMON_NAMES;
  window.KM_ELEMENT_NAMES = KM_ELEMENT_NAMES;
  window.KM_ANIMAL_INFO = KM_ANIMAL_INFO;
  window.KM_ELEMENT_INFO = KM_ELEMENT_INFO;
  window.KM_COMPAT_INFO = KM_COMPAT_INFO;
  window.KM_LIFE_PATH_INFO = KM_LIFE_PATH_INFO;
}
