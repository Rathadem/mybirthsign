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
// Scroll-position fix: browsers sometimes restore the scroll position a page
// had the last time it was open (back/forward cache, or scroll restoration
// on reload), which can land a fresh page-to-page link click part-way down
// the new page instead of at the top -- hiding the header entirely if the
// restored position happens to match its height. Force every plain
// navigation (one with no #anchor in the URL) to start at the top, while
// leaving real anchor links (e.g. animals.html#animal-pig) free to scroll to
// their target.
//
// A single pageshow-time scrollTo isn't always enough: some mobile browsers
// re-apply their own remembered scroll position *after* pageshow fires, and
// the Khmer web font finishing its (async) load can reflow the page and
// nudge the scroll position again. So this re-asserts scroll-to-top on
// several events/timings rather than just once.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
function zsForceScrollTop() {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
}
window.addEventListener("pageshow", zsForceScrollTop);
window.addEventListener("load", function () {
  zsForceScrollTop();
  setTimeout(zsForceScrollTop, 50);
  setTimeout(zsForceScrollTop, 300);
});
document.addEventListener("DOMContentLoaded", zsForceScrollTop);

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
    traits: "ឆ្លាតវៃ ប៉ិនប្រសប់ និងចូលចិត្តសេពគប់។ ជូតចេះរកឱកាសដែលអ្នកដទៃមើលមិនឃើញ។",
    weaknesses: "ជួនកាលមិនស្ងប់ស្ងាត់ ឬប្រុងប្រយ័ត្នខ្លាំងពេកចំពោះប្រាក់កាស និងទំនុកចិត្ត។",
    overview: "ជូតជាសត្វទី1ក្នុងនិមិត្តសញ្ញា ហើយតាមរឿងព្រេងបានមកដល់ត្រឹមតែដោយភាពឆ្លាតវៃ មិនមែនកម្លាំងកាយទេ — ល្បីល្បាញក្នុងការជិះលើខ្នងគោដើម្បីដល់មុនគេ។ រឿងនេះបង្ហាញពីជូតយ៉ាងច្បាស់៖ ចេះសម្របខ្លួន សម្លឹងមើលយ៉ាងល្អិតល្អន់ និងដើរមុនគេជានិច្ច។ ក្នុងសង្គម ជូតមានភាពទាក់ទាញ និងងាយនឹងសម្របខ្លួន ទោះនៅចំពោះមុខគេ ឬកំពុងប្រមូលព័ត៌មានពីចំហៀង។",
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
    traits: "ជឿជាក់លើខ្លួនឯង ទាក់ទាញចំណាប់អារម្មណ៍ និងមានមហិច្ឆតា។ រោងជាអ្នកដឹកនាំដោយធម្មជាតិ ហើយតែងទទួលបានការគោរពពីអ្នកដទៃ។",
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
  11: { label: "អ្នកវិចារណញាណ (លេខមេ)", blurb: "មានភាពរសើប និងវិចារណញាណខ្លាំង ដោយផ្ទុកនូវឯករាជ្យនៃលេខ 1 ជាមួយនឹងការយល់ដឹងខាងវិញ្ញាណ និងអារម្មណ៍កម្រិតខ្ពស់។" },
  22: { label: "អ្នកសាងសង់មេ (លេខមេ)", blurb: "ឧត្តមគតិជាក់ស្តែង — វិន័យនៃលេខ 4 រួមផ្សំជាមួយចិត្តគំនិតសម្រាប់សមិទ្ធិផលធំ និងមានន័យ។" },
  33: { label: "គ្រូមេ (លេខមេ)", blurb: "ការថែទាំនៃលេខ 6 ពង្រីកទៅជាការហៅឱ្យបង្រៀន ព្យាបាល ឬលើកកម្ពស់លើវិសាលភាពធំជាង។" }
};

// ---------------------------------------------------------------------------
// Static UI copy
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Simplified Chinese (zh) display names and content — same keys as the KM_ tables above
// ---------------------------------------------------------------------------
const ZH_ANIMAL_NAMES = {
  Rat: "鼠", Ox: "牛", Tiger: "虎", Rabbit: "兔", Dragon: "龙", Snake: "蛇",
  Horse: "马", Goat: "羊", Monkey: "猴", Rooster: "鸡", Dog: "狗", Pig: "猪"
};
const ZH_ELEMENT_NAMES = { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" };
const ZH_COLOR_NAMES = {
  blue: "蓝色", gold: "金色", green: "绿色", white: "白色", yellow: "黄色", gray: "灰色", orange: "橙色",
  pink: "粉色", red: "红色", purple: "紫色", black: "黑色", silver: "银色", brown: "棕色"
};
const ZH_DAY_NAMES = {
  Monday: "星期一", Tuesday: "星期二", Wednesday: "星期三", Thursday: "星期四",
  Friday: "星期五", Saturday: "星期六", Sunday: "星期日"
};
const ZH_ANIMAL_INFO = {
  Rat: {
    traits: "机智、足智多谋、善于交际。属鼠的人天生擅长解决问题，常能发现别人错过的机会。",
    weaknesses: "可能比较焦躁，或在金钱和信任上过于谨慎。",
    overview: "鼠是十二生肖之首。传说它靠的是聪明而不是力气——骑在牛背上抢先冲过终点。这个故事很能说明鼠的特点：足智多谋、善于观察，总是快人一步。属鼠的人往往最先察觉市场、谈话或感情中的变化，很少措手不及。在人际交往中，他们迷人又灵活，既能在人群中游刃有余，也能在一旁安静地收集信息。",
    careers: "商业、写作、研究、贸易"
  },
  Ox: {
    traits: "可靠、诚实、勤劳。属牛的人靠坚持不懈，一步一步稳稳地取得成功。",
    weaknesses: "可能比较固执，面对突然的变化时适应得慢。",
    overview: "牛是十二生肖中安静的实力派——不张扬，却几乎没人能比它更持久。别的生肖追求速胜，牛则着眼长远，年复一年默默付出，直到成果无可否认。所以属牛的人擅长一切需要耐心的事：创业、钻研手艺、经营家庭。他们的直率让重视诚实的人感到清新，但在期待委婉的人看来，可能显得有些生硬。",
    careers: "农业、工程、金融、医学"
  },
  Tiger: {
    traits: "勇敢、自信、好胜。属虎的人是天生的领导者，做事果断。",
    weaknesses: "可能比较冲动，对节奏慢的人缺乏耐心。",
    overview: "虎是十二生肖中天生敢于冒险的一个——大胆、有魅力，敢为人先。当大家都在犹豫时，往往是虎第一个开口或采取行动。这种勇气让他们成为有号召力的领导者，和他们在一起总是充满活力；但也可能让他们对流程、规则或需要更多时间的人失去耐心。属虎的人如果在行动力之外再多一点克制，带着大家一起前进，会做得最好。",
    careers: "创业、体育、法律、管理"
  },
  Rabbit: {
    traits: "温和、体贴、善于协调。属兔的人重视和谐，擅长避免冲突。",
    weaknesses: "可能过于谨慎，回避必要的正面沟通。",
    overview: "兔做事细腻优雅，往往在别人开口之前就能感觉到气氛的紧张。所以属兔的人是天生的调解者，与他们相处非常愉快——他们很少挑起争端，还常常平息已经开始的争执。代价是他们有时会完全回避必要的冲突，因为当下开口太难，小问题就这样慢慢变大。",
    careers: "外交、心理咨询、设计、酒店服务"
  },
  Dragon: {
    traits: "自信、有魅力、有抱负。属龙的人引人注目，常常自然而然地成为领导者。",
    weaknesses: "可能显得骄傲，或对限制缺乏耐心。",
    overview: "龙是十二生肖中唯一的神兽，也带着那种非凡的气场。属龙的人一走进房间，往往不费力气就成了焦点——人们注意他们、信任他们，常常在他们开口之前就把领导的位置交给他们。这种天生的威信伴随着很高的标准，对自己和身边的人都是如此；当现实的进度跟不上他们的远见时，就可能显得不耐烦。",
    careers: "领导管理、创业、娱乐、房地产"
  },
  Snake: {
    traits: "睿智、直觉敏锐、优雅。属蛇的人思考深入，行动之前会周密计划。",
    weaknesses: "可能比较神秘，或容易想得太多。",
    overview: "蛇是十二生肖中的谋略家——安静、警觉，从不急于亮出底牌。别的生肖当场反应，蛇则会把问题放在心里反复思考，直到想出清晰的计划。因此属蛇的人以智慧和判断力著称，尤其在需要耐心而不是速度的时候。同样的保密本能也可能变成隐瞒，让身边的人看不清平静外表下真正发生了什么。",
    careers: "金融、研究、心理学、战略规划"
  },
  Horse: {
    traits: "精力充沛、独立、爱冒险。属马的人热爱自由和新鲜体验。",
    weaknesses: "可能缺乏耐心，或难以长期投入。",
    overview: "马靠一股冲劲前进——好动、独立，前方有广阔天地时最快乐。一成不变的生活很难长久适合属马的人；他们喜欢旅行、新项目和新朋友，走到哪里都带来感染人的活力。同样对自由的热爱，也可能让长期承诺显得束缚，所以属马的人在有活动空间的环境里，往往比在被束缚得太紧的环境里做得更好。",
    careers: "旅游、销售、体育、媒体"
  },
  Goat: {
    traits: "温柔、有创意、富有同情心。属羊的人艺术感强，非常关心他人。",
    weaknesses: "可能优柔寡断，或过于依赖别人。",
    overview: "羊是十二生肖中温柔的艺术家，向往美、和谐与情感的深度。属羊的人常能察觉别人忽略的感受，所以是温暖的朋友，在创意领域也很有才华。他们在安全、支持的环境中表现最好，在残酷或竞争激烈的环境中则比较吃力。如果缺少这种支持，属羊的人可能变得犹豫不决，或过于依赖别人替他们做艰难的决定。",
    careers: "艺术、设计、心理咨询、公益事业"
  },
  Monkey: {
    traits: "聪明、好奇、风趣。属猴的人学东西快，喜欢用创意解决问题。",
    weaknesses: "可能比较调皮，或难以专注于一件事。",
    overview: "猴是十二生肖中头脑最灵活的——好奇、爱玩，遇到难题反而很开心。属猴的人学新技能很快，喜欢找到别人没想到的巧妙捷径，所以是出色的随机应变者和天生的开心果。灵活头脑的另一面是注意力不够持久：属猴的人在想法之间跳得太快，最有希望的点子有时反而没能完成。",
    careers: "科技、市场营销、喜剧表演、咨询"
  },
  Rooster: {
    traits: "观察力强、勤劳、自信。属鸡的人注重细节，做事追求做好。",
    weaknesses: "可能对别人过于挑剔或说话太直。",
    overview: "鸡对把事情做好非常自豪，连大多数人想不到要检查的细节都不放过。所以属鸡的人擅长一切要求精确和高标准的工作——是团队中能发现别人都没看到的错误的那个人。同样挑毛病的眼光也可能变成对自己或别人的批评，所以属鸡的人要记住，不是每个不完美都需要指出来。",
    careers: "会计、新闻、质量管理、公开演讲"
  },
  Dog: {
    traits: "忠诚、诚实、有保护欲。属狗的人非常值得信赖，会为自己相信的事挺身而出。",
    weaknesses: "可能容易焦虑，或对新环境过于警惕。",
    overview: "狗是十二生肖中最忠诚的守护者——是不用开口就会出现的朋友，也是即使要付出代价也会为别人说话的人。属狗的人有强烈的是非观，很少为了息事宁人而妥协。同样的警觉也可能变成担忧或怀疑，尤其是对还没赢得他们信任的新人或新环境。",
    careers: "法律、安保、社会工作、教育"
  },
  Pig: {
    traits: "热心、慷慨、随和。属猪的人重视舒适、善良和真诚的关系。",
    weaknesses: "可能过于轻信，或容易放纵。",
    overview: "猪以温暖和幽默为十二生肖画上句号——慷慨、随和，乐于分享自己拥有的一切。属猪的人往往相信别人说的话，总往好处想，所以是非常好相处、少有是非的伙伴。同样的信任也是他们最大的弱点：属猪的人可能很晚才发现有人在利用他们的慷慨，有时也会对自己（或别人）放纵过头。",
    careers: "酒店服务、餐饮业、教育、医疗保健"
  }
};
const ZH_ELEMENT_INFO = {
  Wood: {
    blurb: "木年带来成长、创意和开创新事物的动力。这个五行的人通常善于合作、慷慨、富有理想。",
    overview: "木是春天的五行——扩展、新枝、新计划。木年出生的人通常是推动团队前进的人，上一个点子还没完成，下一个就已经提出来。他们是热情的合作者，真心希望身边的人和自己一起成长。慷慨的另一面是容易答应太多：接下太多项目，或难以对占便宜的人设立界限。"
  },
  Fire: {
    blurb: "火年带来热情、活力和勇气。这个五行的人通常充满干劲、爱冒险、乐于带头。",
    overview: "火带来热度、动力和存在感。火年出生的人很少默默无闻——他们说话有信念，行动迅速，能激励身边的人行动起来。所以他们在危机或大胆的新事业中是天生的领导者。挑战在于保持这份热度：火型性格如果不把热情和耐心结合起来，可能很快耗尽人际关系或机会。"
  },
  Earth: {
    blurb: "土年带来稳定、务实和耐心。这个五行的人通常可靠、踏实，擅长长远规划。",
    overview: "土是收获的五行——稳定、耐心、经久耐用。土年出生的人通常是最可靠的人：准时出现、说到做到，考虑的是几年后而不是几天后。同样的踏实也可能变成过度谨慎，让土型性格在真正需要冒险的时候难以迈出一步。"
  },
  Metal: {
    blurb: "金年带来纪律、抱负和坚强的意志。这个五行的人通常坚定、独立、重视原则。",
    overview: "金是刀剑与钟的五行——锋利、响亮、不肯弯曲。金年出生的人清楚自己坚持什么，一旦做出决定就很少妥协。这让他们在谈判和领导中拥有一种安静而强大的力量。在比较灵活的人看来，这可能显得死板，所以金型性格有意识地练习变通时，往往做得最好。"
  },
  Water: {
    blurb: "水年带来直觉、适应力和冷静的智慧。这个五行的人通常善于思考、圆融、观察敏锐。",
    overview: "水是河流的五行——永远流动，总能找到阻力最小的路。水年出生的人开口之前会先观察气氛，根据对象调整自己的方式。所以他们是出色的协调者，也是不动声色就能说服别人的沟通者。风险在于被动：水型性格可能随波逐流，没有及时对本该反对的事情表态。"
  }
};
const ZH_COMPAT_INFO = {
  same: {
    label: "同一生肖",
    text: {
      romantic: "你们属同一个生肖，彼此有一种深刻而直接的理解——不用解释就能读懂对方的本能。风险是两个强势又相似的性格争同一个角色，而不是互相平衡。有意识地分工“谁负责什么”会很有帮助。",
      business: "同一生肖意味着价值观和节奏相同，早期合作会感觉毫不费力。想要长久合作，最好及早明确分工——否则两个本能相同的人可能都抢着做同样的事，而忽略了其他工作。"
    }
  },
  triangle: {
    label: "三合天然相配",
    text: {
      romantic: "你们的生肖属于同一个“三合”——十二生肖中四个天然相合的组合之一。传统上这是最容易、最和谐的配对之一，彼此能直觉地理解对方的节奏和价值观。",
      business: "传统上这是最强的合作配对之一——对节奏和优先事项的共同直觉让日常合作顺畅，而三合之中互补的优势往往能弥补彼此的盲点。"
    }
  },
  clash: {
    label: "六冲",
    text: {
      romantic: "你们的生肖在生肖轮上正好相对——是典型的“相冲”配对。这并不代表不合适，而是说明你们看待生活的角度很可能真的不同；一旦学会跨越这种差异去沟通，它既可能带来摩擦，也可能成为感情最大的优势。",
      business: "相冲的配对其实可能成为很强的商业伙伴，因为你们常从相反的角度看问题，能补上对方漏掉的部分。最好的方式是明确分工，并且刻意、经常地沟通，而不是想当然地以为彼此想法一致。"
    }
  },
  neutral: {
    label: "普通配对",
    text: {
      romantic: "你们的生肖不属于同一个三合，但也不是直接相冲。传统的生肖配对对这一组既不特别看好，也不特别担心——实际上，你们相处得好不好，更多取决于个人性格，而不只是生肖。",
      business: "这里没有来自生肖的强烈吸引或摩擦——是真正可行的组合，成功更多取决于清楚的沟通和明确的分工，而不是生肖是否相合。"
    }
  }
};
const ZH_LIFE_PATH_INFO = {
  1: { label: "领导者", blurb: "独立、有干劲，按照自己的方向前进时最快乐，而不是跟随别人。" },
  2: { label: "和平使者", blurb: "圆融、敏感，在亲密而合作的关系中最有满足感。" },
  3: { label: "沟通者", blurb: "善于表达、富有创意，喜欢表现自己——需要玩乐和创作的空间。" },
  4: { label: "建设者", blurb: "务实、自律，重视结构、安全感和把事情做好。" },
  5: { label: "自由灵魂", blurb: "爱冒险、适应力强、讨厌一成不变——需要变化和自由才觉得有活力。" },
  6: { label: "照顾者", blurb: "有责任心、充满爱，天生愿意照顾家庭、亲人和社区。" },
  7: { label: "探索者", blurb: "内省、善于分析，喜欢深度、独处，以及弄明白“为什么”。" },
  8: { label: "成就者", blurb: "有抱负、有商业头脑，追求成就、地位和物质上的成功。" },
  9: { label: "人道主义者", blurb: "富有同情心、理想主义，关注大局多于个人得失。" },
  11: { label: "直觉者（主数）", blurb: "非常敏感、直觉强，拥有 1 的独立，又有更高的精神与情感感知力。" },
  22: { label: "大建设者（主数）", blurb: "务实的理想主义——把 4 的自律与实现大规模、有意义成就的远见结合在一起。" },
  33: { label: "大导师（主数）", blurb: "把 6 的关怀放大成一种使命：在更大的范围内教导、疗愈或鼓舞他人。" }
};
// lucky colors / days in Chinese, built from the English lists (js/zodiac-data.js loads after this file)
function fillZhLucky() {
  if (fillZhLucky.done || typeof ANIMAL_INFO === "undefined") return;
  Object.keys(ZH_ANIMAL_INFO).forEach(function (a) {
    const src = ANIMAL_INFO[a] || {};
    ZH_ANIMAL_INFO[a].luckyColors = (src.luckyColors || []).map(function (c) { return ZH_COLOR_NAMES[c] || c; });
    ZH_ANIMAL_INFO[a].luckyDays = (src.luckyDays || []).map(function (d) { return ZH_DAY_NAMES[d] || d; });
  });
  fillZhLucky.done = true;
}
// One place to look up a name or table in the page language (en / km / zh).
const LOC = {
  animal: function (a, lang) { lang = lang || getLang(); return lang === "km" ? KM_ANIMAL_NAMES[a] : lang === "zh" ? ZH_ANIMAL_NAMES[a] : a; },
  element: function (e, lang) { lang = lang || getLang(); return lang === "km" ? KM_ELEMENT_NAMES[e] : lang === "zh" ? ZH_ELEMENT_NAMES[e] : e; },
  color: function (c, lang) { lang = lang || getLang(); return lang === "km" ? (KM_COLOR_NAMES[c] || c) : lang === "zh" ? (ZH_COLOR_NAMES[c] || c) : c; },
  day: function (d, lang) { lang = lang || getLang(); return lang === "km" ? (KM_DAY_NAMES[d] || d) : lang === "zh" ? (ZH_DAY_NAMES[d] || d) : d; },
  /** the table for this language: "ANIMAL_INFO", "ELEMENT_INFO", "COMPAT_INFO" or "LIFE_PATH_INFO" */
  table: function (name, lang) {
    lang = lang || getLang();
    const T = {
      km: { ANIMAL_INFO: KM_ANIMAL_INFO, ELEMENT_INFO: KM_ELEMENT_INFO, COMPAT_INFO: KM_COMPAT_INFO, LIFE_PATH_INFO: KM_LIFE_PATH_INFO },
      zh: { ANIMAL_INFO: ZH_ANIMAL_INFO, ELEMENT_INFO: ZH_ELEMENT_INFO, COMPAT_INFO: ZH_COMPAT_INFO, LIFE_PATH_INFO: ZH_LIFE_PATH_INFO }
    };
    if (lang === "zh" && name === "ANIMAL_INFO") fillZhLucky();
    if (T[lang] && T[lang][name]) return T[lang][name];
    if (name === "ANIMAL_INFO" && typeof ANIMAL_INFO !== "undefined") return ANIMAL_INFO;
    if (name === "ELEMENT_INFO" && typeof ELEMENT_INFO !== "undefined") return ELEMENT_INFO;
    if (name === "COMPAT_INFO" && typeof COMPAT_INFO !== "undefined") return COMPAT_INFO;
    if (name === "LIFE_PATH_INFO" && typeof LIFE_PATH_INFO !== "undefined") return LIFE_PATH_INFO;
    return undefined;
  }
};

const UI_STRINGS = {
  en: {
    nav_checker: "Home",
    nav_checker_page: "MyBirthSign",
    nav_tools: "Horoscope",
    nav_animals: "Zodiac Guide",
    nav_compatibility: "Compatibility",
    nav_wedding: "Wedding Dates",
    nav_blog: "Blog",
    nav_about: "About",
    nav_contact: "Contact",
    nav_more: "More",
    lang_toggle_en: "EN",
    lang_toggle_km: "ខ្មែរ",
    lang_toggle_zh: "中文",

    animals_hero_title: "The Complete Chinese Zodiac Animal Guide",
    animals_hero_subtitle: "All 12 zodiac animals — personality, luck, and compatibility at a glance. Tap any animal to read the full profile.",
    animals_read_more: "Read full personality",
    animals_cta: "Check your own sign →",
    animals_blog_cta: "See full year guide →",

    compat_page_hero_title: "Zodiac Compatibility Checker",
    compat_page_hero_subtitle: "Enter two birthdays to see how your signs match up — for romance or for business.",
    compat_page_cta: "Check your own sign →",

    romance_hero_title: "💞 Chinese Zodiac Compatibility Calculator",
    romance_hero_subtitle: "Enter two birth dates to reveal a complete Chinese Zodiac compatibility reading — love, friendship, business, financial, communication, attraction, and long-term potential.",
    romance_p1_dob_label: "Person 1 — Date of birth",
    romance_p2_dob_label: "Person 2 — Date of birth",
    romance_submit_btn: "❤️ Reveal Our Compatibility",
    romance_err_required: "Please enter both people's dates of birth.",
    romance_err_invalid: "One of the dates entered isn't valid — please re-check it.",
    romance_err_future: "Birth dates can't be in the future — please check the date entered.",
    romance_compat_label: "Compatibility",
    romance_strengths_label: "Strengths",
    romance_challenges_label: "Possible challenges",
    romance_advice_label: "Advice",
    romance_weaknesses_label: "Weaknesses",
    romance_person1_label: "Person 1",
    romance_person2_label: "Person 2",
    romance_categories_heading: "Detailed Compatibility Breakdown",
    romance_profiles_heading: "Zodiac Profiles",
    romance_overall_heading: "Overall Compatibility",
    romance_disclaimer: "This result is based on traditional Chinese zodiac astrology, for entertainment purposes only — not a scientific prediction.",
    romance_reset: "🔄 Check Another Match",

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
    rc_quick_check_intro: "Want a simpler star-rating style match instead? Use the quick check below.",
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
    rc_card_eyebrow: "RELATIONSHIP COMPATIBILITY",
    rc_card_overall_label: "Compatibility",
    rc_card_tagline_high: "You two have a genuine strength together — this connection can be a real anchor for the relationship.",
    rc_card_tagline_medium: "You have real potential together — it just takes a little conscious effort to fully click.",
    rc_card_tagline_low: "This takes real, deliberate effort — but couples who put in the work often find it worthwhile.",
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
    nav_business_guide: "Business Guide",
    biz_hero_title: "💼 Business Partnership Compatibility",
    biz_hero_subtitle: "Chinese Zodiac • Five Elements • Business Personality",
    biz_person1_legend: "Person 1",
    biz_person2_legend: "Person 2",
    biz_name_label: "Full name / business name (optional)",
    biz_dob_label_req: "Date of birth (required)",
    biz_time_label: "Birth time (optional)",
    biz_location_label: "Birth location (optional)",
    biz_location_placeholder: "City, Country",
    biz_submit: "Check Business Compatibility →",
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
    biz_guide_cta: "Read our full guide: Chinese Zodiac Business Compatibility →",
    biz_h1_a: "Horoscope",
    biz_h1_b: "Business Partner",
    biz_h1_c: "Compatibility",
    biz_hero_sub2: "Compare Two Birth Dates for Business Compatibility",
    biz_hero_desc: "Discover how two Chinese zodiac signs may work together in business, including teamwork, communication, leadership, financial approach, and growth potential.",
    biz_time_toggle: "Add birth time (optional)",
    biz_ov_title: "Your Business Compatibility Result",
    biz_ov_match: "Business Match",
    biz_ov_el_label: "Element",
    biz_ov_year_label: "Zodiac Year",
    biz_ov_c_partnership: "Partnership",
    biz_ov_c_communication: "Communication",
    biz_ov_c_leadership: "Leadership",
    biz_ov_c_finance: "Financial Potential",
    biz_ov_c_decision: "Decision Making",
    biz_ov_c_growth: "Growth Potential",
    biz_ov_d_high: "Strong match in this area.",
    biz_ov_d_mid: "Workable with clear agreements.",
    biz_ov_d_low: "Needs deliberate structure.",
    biz_ov_strengths: "Business Strengths",
    biz_ov_challenges: "Potential Challenges",
    biz_ov_roles: "Best Business Roles",
    biz_ov_elem_title: "Element Compatibility",
    biz_ov_harm_high: "Strong Business Harmony",
    biz_ov_harm_mid: "Balanced Business Harmony",
    biz_ov_harm_low: "Needs Deliberate Balance",
    biz_ov_disclaimer: "These interpretations are based on traditional Chinese zodiac and element concepts and are for entertainment and personal reflection only.",

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

    checker_hero_title: "What Is My Zodiac Sign?",
    checker_hero_subtitle: "Enter your date of birth to discover your zodiac animal, element, personality, and more.",
    chk_form_hint: "Your birth date determines your zodiac sign, element, and traditional zodiac characteristics.",
    chk_sample_note: "Example result shown below — enter your date of birth above to see your own sign.",
    chk_foot_tag: "Zodiac • Compatibility • Business Partners • Zodiac Guides",
    chk_foot_checker: "Zodiac Checker",
    chk_your_sign: "Your Zodiac Sign",
    chk_animal_years: "Birth years",
    chk_same_sign: "Same sign (deep understanding, watch for rivalry)",
    chk_full_guide: "Read the full guide →",
    chk_close: "Close",
    chk_birth_year: "Birth Year", chk_element: "Element", chk_yinyang: "Yin / Yang", chk_zodiac_year: "Zodiac Year",
    chk_yang: "Yang", chk_yin: "Yin",
    chk_personality: "Personality", chk_love: "Love & Relationships", chk_career: "Career & Work", chk_luck: "Luck & Tradition",
    chk_directions: "Lucky directions", chk_months: "Best months",
    chk_cta_title: "Check Your Compatibility",
    chk_cta_sub: "Find out how well you match with a partner, friend, or business partner.",
    chk_cta_btn: "Check Compatibility →",
    chk_explore_title: "Explore All 12 Zodiac Signs",
    chk_disclaimer: "Zodiac interpretations are based on traditional cultural beliefs and are provided for entertainment, cultural exploration, and personal reflection. They should not be considered scientific predictions or professional advice.",

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
    reveal_button: "My Horoscope",
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
    share_download: "Download image",
    share_more_apps: "More apps…",
    share_menu_label: "Share options",
    share_fb_steps: "Choose Facebook in the list — your result picture goes into a new post (its QR code leads to MyBirthSign).",
    share_fb_link_steps: "Choose Facebook in the list to post the link.",
    share_fb_ready: "Facebook — tap again to share",
    share_tap_again: "Ready — tap again",
    share_in_app: "This app's built-in browser can't save or share pictures. Tap ⋯ and choose “Open in browser” (Safari or Chrome), then try again.",
    share_ig_steps: "Instagram doesn't accept website links. Post the image instead: pick Instagram in the share list, or open Instagram, tap +, choose Story or Post and select the saved image.",
    share_tt_steps: "TikTok doesn't accept website links. Post the image instead: pick TikTok in the share list, or open TikTok, tap +, then Upload and select the saved image.",
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
    nav_checker_page: "ជោគជតារាសីខ្ញុំ",
    nav_tools: "ជោគជតារាសី",
    nav_animals: "មគ្គុទ្ទេសក៍និមិត្តសញ្ញា",
    nav_compatibility: "គួរស្រករ",
    nav_wedding: "ថ្ងៃមង្គល",
    nav_blog: "ប្លុក",
    nav_about: "អំពីយើង",
    nav_contact: "ទាក់ទង",
    nav_more: "ផ្សេងៗ",
    lang_toggle_en: "EN",
    lang_toggle_km: "ខ្មែរ",
    lang_toggle_zh: "中文",

    animals_hero_title: "មគ្គុទ្ទេសក៍ពេញលេញនៃសត្វនិមិត្តសញ្ញាចិនទាំង12",
    animals_hero_subtitle: "សត្វនិមិត្តសញ្ញាទាំង12 — បុគ្គលិកលក្ខណៈ សំណាង និងភាពសមស្របជាមួយអ្នកដទៃ។ ចុចលើសត្វនីមួយៗដើម្បីអានព័ត៌មានពេញលេញ។",
    animals_read_more: "អានបុគ្គលិកលក្ខណៈពេញលេញ",
    animals_cta: "ពិនិត្យនិមិត្តសញ្ញារបស់អ្នក →",
    animals_blog_cta: "មគ្គុទ្ទេសក៍ប្រចាំឆ្នាំពេញលេញ →",

    compat_page_hero_title: "ឧបករណ៍ពិនិត្យភាពសមស្របនិមិត្តសញ្ញា",
    compat_page_hero_subtitle: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតពីរ ដើម្បីមើលថានិមិត្តសញ្ញារបស់អ្នកសមគ្នាកម្រិតណា — សម្រាប់ស្នេហា ឬអាជីវកម្ម។",
    compat_page_cta: "ពិនិត្យនិមិត្តសញ្ញារបស់អ្នក →",

    romance_hero_title: "💞 ឧបករណ៍គណនាភាពសមស្របនិមិត្តសញ្ញាចិន",
    romance_hero_subtitle: "បញ្ចូលកាលបរិច្ឆេទកំណើតអ្នកទាំងពីរ ដើម្បីទទួលបានលទ្ធផលភាពស៊ីគ្នាតាមនិមិត្តសញ្ញាចិនពេញលេញ — ស្នេហា មិត្តភាព អាជីវកម្ម ហិរញ្ញវត្ថុ ការប្រាស្រ័យទាក់ទង ទំនាញ និងសក្តានុពលរយៈពេលវែង។",
    romance_p1_dob_label: "អ្នកទី 1 — ថ្ងៃខែឆ្នាំកំណើត",
    romance_p2_dob_label: "អ្នកទី 2 — ថ្ងៃខែឆ្នាំកំណើត",
    romance_submit_btn: "❤️ បង្ហាញភាពស៊ីគ្នារបស់យើង",
    romance_err_required: "សូមបញ្ចូលកាលបរិច្ឆេទកំណើតរបស់អ្នកទាំងពីរ។",
    romance_err_invalid: "កាលបរិច្ឆេទមួយមិនត្រឹមត្រូវទេ — សូមពិនិត្យម្តងទៀត។",
    romance_err_future: "កាលបរិច្ឆេទកំណើតមិនអាចនៅថ្ងៃអនាគតបានទេ — សូមពិនិត្យកាលបរិច្ឆេទដែលបានបញ្ចូល។",
    romance_compat_label: "កម្រិតស៊ីគ្នា",
    romance_strengths_label: "ភាពខ្លាំង",
    romance_challenges_label: "បញ្ហាប្រឈម",
    romance_advice_label: "ដំបូន្មាន",
    romance_weaknesses_label: "ចំណុចខ្សោយ",
    romance_person1_label: "អ្នកទី 1",
    romance_person2_label: "អ្នកទី 2",
    romance_categories_heading: "លំអិតកម្រិតស៊ីគ្នា",
    romance_profiles_heading: "ទម្រង់និមិត្តសញ្ញានីមួយៗ",
    romance_overall_heading: "កម្រិតស៊ីគ្នាទាំងមូល",
    romance_disclaimer: "លទ្ធផលនេះផ្អែកលើនិមិត្តសញ្ញាចិនប្រពៃណី សម្រាប់គោលបំណងកម្សាន្តតែប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រនោះទេ។",
    romance_reset: "🔄 ពិនិត្យគូផ្សេងទៀត",

    rc_hero_title: "💞 ឧបករណ៍គណនាភាពសមស្របនៃទំនាក់ទំនង",
    rc_hero_subtitle: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតទាំងពីរ ដើម្បីទទួលបានរបាយការណ៍ភាពសមស្របពេញលេញ — រាសន៍លោកខាងលិច លេខវិទ្យាផ្លូវជីវិត និងការវិភាគទំនាក់ទំនងចំនួន11ផ្នែក។",
    rc_person1_legend: "អ្នកទី1",
    rc_person2_legend: "អ្នកទី2",
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
    rc_quick_check_intro: "ចង់បានការផ្គូផ្គងបែបផ្កាយសាមញ្ញជាជំនួសទេ? សូមប្រើការពិនិត្យរហ័សខាងក្រោម។",
    rc_err_required: "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទាំងពីរ។",
    rc_err_future: "ថ្ងៃកំណើតមិនអាចនៅថ្ងៃអនាគតបានទេ — សូមពិនិត្យថ្ងៃដែលបានបញ្ចូល។",
    rc_err_invalid: "ថ្ងៃមួយក្នុងចំណោមថ្ងៃដែលបានបញ្ចូលមិនត្រឹមត្រូវទេ — សូមពិនិត្យមើលម្តងទៀត។",
    rc_western_zodiac_heading: "រាសន៍លោកខាងលិច",
    rc_chinese_zodiac_heading: "រាសន៍ចិន",
    rc_numerology_heading: "លេខវិទ្យា",
    rc_life_path_label: "លេខផ្លូវជីវិត",
    rc_birthday_number_label: "លេខថ្ងៃកំណើត",
    rc_attitude_number_label: "លេខឥរិយាបថ",
    rc_numerology_method_note: "វិធីសាស្ត្រប្រើប្រាស់៖ ខែ ថ្ងៃ និងឆ្នាំ ត្រូវបានកាត់បន្ថយដោយឡែកពីគ្នា ដោយរក្សាលេខមេ 11 22 និង33 នៅគ្រប់ដំណាក់កាល បន្ទាប់មកបូកនិងកាត់បន្ថយលទ្ធផលទាំងបីតាមវិធីដូចគ្នា។",
    rc_summary_heading: "សេចក្តីសង្ខេបភាពសមស្រប",
    rc_summary_disclaimer: "ចំណុចភាពសមស្របទាំងនេះផ្អែកលើប្រព័ន្ធតារាសាស្ត្រ និងលេខវិទ្យាបែបប្រពៃណី សម្រាប់ការកម្សាន្ត/ការពិចារណាខ្លួនឯង មិនមែនជាវិធីសាស្ត្រវិទ្យាសាស្ត្រដែលបានបញ្ជាក់ទេ។",
    rc_card_eyebrow: "ភាពសមស្របនៃទំនាក់ទំនង",
    rc_card_overall_label: "ភាពសមស្រប",
    rc_card_tagline_high: "ជាចំណុចខ្លាំងពិតប្រាកដសម្រាប់អ្នកទាំងពីរ ជាគោលគាំទ្រដ៏ល្អសម្រាប់ទំនាក់ទំនង។",
    rc_card_tagline_medium: "មានសក្តានុពលពិតប្រាកដ គ្រាន់តែត្រូវការការខិតខំដឹងខ្លួនបន្តិចដើម្បីឱ្យចូលគ្នាបានល្អ។",
    rc_card_tagline_low: "ត្រូវការការខិតខំដែលមានគោលបំណងពិតប្រាកដ ប៉ុន្តែគូស្នេហ៍ដែលខិតខំនេះច្រើនតែឃើញថាវាសក្តិសម។",
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
    nav_business_guide: "មគ្គុទ្ទេសក៍អាជីវកម្ម",
    biz_hero_title: "💼 ភាពសមស្របដៃគូអាជីវកម្ម",
    biz_hero_subtitle: "រាសន៍ចិន • ធាតុទាំងប្រាំ • បុគ្គលិកលក្ខណៈអាជីវកម្ម",
    biz_person1_legend: "អ្នកទី1",
    biz_person2_legend: "អ្នកទី2",
    biz_name_label: "ឈ្មោះពេញ / ឈ្មោះអាជីវកម្ម (មិនបង្ខំ)",
    biz_dob_label_req: "ថ្ងៃខែឆ្នាំកំណើត (ត្រូវការ)",
    biz_time_label: "ម៉ោងកំណើត (មិនបង្ខំ)",
    biz_location_label: "ទីកន្លែងកំណើត (មិនបង្ខំ)",
    biz_location_placeholder: "ទីក្រុង ប្រទេស",
    biz_submit: "ពិនិត្យភាពសមស្របអាជីវកម្ម →",
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
    biz_guide_cta: "អានការណែនាំពេញលេញ៖ ភាពសមស្របអាជីវកម្មតាមនិមិត្តសញ្ញាចិន →",
    biz_h1_a: "ហោរាសាស្ត្រ",
    biz_h1_b: "ដៃគូអាជីវកម្ម",
    biz_h1_c: "ភាពសមស្រប",
    biz_hero_sub2: "ប្រៀបធៀបថ្ងៃកំណើតពីរសម្រាប់ភាពសមស្របអាជីវកម្ម",
    biz_hero_desc: "ស្វែងយល់ពីរបៀបដែលរាសន៍ចិនពីរអាចធ្វើការជាមួយគ្នាក្នុងអាជីវកម្ម រួមមានការធ្វើការជាក្រុម ការប្រាស្រ័យទាក់ទង ភាពជាអ្នកដឹកនាំ វិធីសាស្ត្រហិរញ្ញវត្ថុ និងសក្តានុពលរីកចម្រើន។",
    biz_time_toggle: "បន្ថែមម៉ោងកំណើត (មិនបង្ខំ)",
    biz_ov_title: "លទ្ធផលភាពសមស្របអាជីវកម្មរបស់អ្នក",
    biz_ov_match: "ភាពត្រូវគ្នាអាជីវកម្ម",
    biz_ov_el_label: "ធាតុ",
    biz_ov_year_label: "ឆ្នាំកំណើត",
    biz_ov_c_partnership: "ភាពជាដៃគូ",
    biz_ov_c_communication: "ការប្រាស្រ័យទាក់ទង",
    biz_ov_c_leadership: "ភាពជាអ្នកដឹកនាំ",
    biz_ov_c_finance: "សក្តានុពលហិរញ្ញវត្ថុ",
    biz_ov_c_decision: "ការសម្រេចចិត្ត",
    biz_ov_c_growth: "សក្តានុពលរីកចម្រើន",
    biz_ov_d_high: "ស៊ីគ្នាខ្លាំងក្នុងផ្នែកនេះ។",
    biz_ov_d_mid: "អាចដំណើរការបានជាមួយកិច្ចព្រមព្រៀងច្បាស់លាស់។",
    biz_ov_d_low: "ត្រូវការរចនាសម្ព័ន្ធដោយចេតនា។",
    biz_ov_strengths: "ភាពខ្លាំងអាជីវកម្ម",
    biz_ov_challenges: "បញ្ហាប្រឈមដែលអាចមាន",
    biz_ov_roles: "តួនាទីអាជីវកម្មសមស្រប",
    biz_ov_elem_title: "ភាពសមស្របធាតុ",
    biz_ov_harm_high: "ភាពសុខដុមអាជីវកម្មខ្លាំង",
    biz_ov_harm_mid: "ភាពសុខដុមអាជីវកម្មមានតុល្យភាព",
    biz_ov_harm_low: "ត្រូវការតុល្យភាពដោយចេតនា",
    biz_ov_disclaimer: "ការបកស្រាយទាំងនេះផ្អែកលើគំនិតរាសន៍ចិន និងធាតុបែបប្រពៃណី ហើយសម្រាប់ការកម្សាន្ត និងការពិចារណាផ្ទាល់ខ្លួនប៉ុណ្ណោះ។",

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

    checker_hero_title: "តើឆ្នាំកំណើតរបស់ខ្ញុំមានជោគតារាសីយ៉ាងណា?",
    checker_hero_subtitle: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នក ដើម្បីដឹងពីសត្វនិមិត្តសញ្ញា ធាតុ និងបុគ្គលិកលក្ខណៈរបស់អ្នក។",
    chk_form_hint: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកកំណត់សត្វ ធាតុ និងលក្ខណៈប្រពៃណីនៃឆ្នាំកំណើតចិនរបស់អ្នក។",
    chk_sample_note: "ខាងក្រោមជាឧទាហរណ៍លទ្ធផល — បញ្ចូលថ្ងៃកំណើតខាងលើដើម្បីដឹងសត្វរបស់អ្នក។",
    chk_foot_tag: "ហោរាសាស្ត្រតាមឆ្នាំកំណើត • ភាពសមស្រប • ដៃគូអាជីវកម្ម • មគ្គុទ្ទេសក៍សត្វ",
    chk_foot_checker: "ពិនិត្យឆ្នាំកំណើត",
    chk_your_sign: "សត្វឆ្នាំចិនរបស់អ្នក",
    chk_animal_years: "ឆ្នាំកំណើត",
    chk_same_sign: "សត្វដូចគ្នា (យល់គ្នាជ្រៅ ប៉ុន្តែប្រយ័ត្នការប្រកួតប្រជែង)",
    chk_full_guide: "អានមគ្គុទ្ទេសក៍ពេញលេញ →",
    chk_close: "បិទ",
    chk_birth_year: "ឆ្នាំកំណើត", chk_element: "ធាតុ", chk_yinyang: "យិន / យ៉ាង", chk_zodiac_year: "",
    chk_yang: "យ៉ាង", chk_yin: "យិន",
    chk_personality: "បុគ្គលិកលក្ខណៈ", chk_love: "ស្នេហា និងទំនាក់ទំនង", chk_career: "អាជីព និងការងារ", chk_luck: "សំណាង និងប្រពៃណី",
    chk_directions: "ទិសសំណាង", chk_months: "ខែល្អ",
    chk_cta_title: "ពិនិត្យគួព្រេង",
    chk_cta_sub: "ដឹងថាអ្នកសមស្របនឹងដៃគូ មិត្តភក្តិ ឬដៃគូអាជីវកម្មប៉ុណ្ណា។",
    chk_cta_btn: "ពិនិត្យគួព្រេង →",
    chk_explore_title: "ស្វែងយល់ពីសត្វឆ្នាំចិនទាំង 12",
    chk_disclaimer: "ការបកស្រាយតាមឆ្នាំកំណើតចិនផ្អែកលើជំនឿវប្បធម៌ប្រពៃណី ហើយមានសម្រាប់ការកម្សាន្ត ការស្វែងយល់វប្បធម៌ និងការឆ្លុះបញ្ចាំងផ្ទាល់ខ្លួនប៉ុណ្ណោះ។ មិនមែនជាការទស្សន៍ទាយវិទ្យាសាស្ត្រ ឬដំបូន្មានអាជីពទេ។",

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
    reveal_button: "តារាសីថ្ងៃកំណើតរបស់ខ្ញុំ",
    hero_cta_button: "ថ្ងៃ​កំណើត​របស់ខ្ញុំ",

    compat_heading: "ពិនិត្យភាពសមស្រប",
    compat_intro: "មើលថាកំណើតទាំងពីរសមស្របគ្នាកម្រិតណា — សម្រាប់ទំនាក់ទំនងស្នេហា ឬដៃគូអាជីវកម្ម។",
    doba_label: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទី1",
    dobb_label: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទី2",
    relationship_legend: "ប្រភេទទំនាក់ទំនង",
    romantic_option: "ដៃគូស្នេហា",
    business_option: "ដៃគូអាជីវកម្ម",
    compat_submit: "ពិនិត្យភាពសមស្រប",

    how_heading: "របៀបដែលវាដំណើរការ",
    how_p1: "ឆ្នាំកំណើតរបស់អ្នកត្រូវនឹងសត្វនិមិត្តសញ្ញាមួយក្នុងចំណោម12 និងធាតុមួយក្នុងចំណោម5 ដោយដើរតាមវដ្តនិមិត្តសញ្ញាអាស៊ីបូព៌ាបែបប្រពៃណី។ សត្វនិមិត្តសញ្ញាបង្ហាញពីគុណសម្បត្តិបុគ្គលិកលក្ខណៈដែលគេនិយាយថាវិលត្រឡប់មកវិញរៀងរាល់12ឆ្នាំ ចំណែកធាតុបន្ថែមស្រទាប់រស់ជាតិដែលវិលត្រឡប់មកវិញរៀងរាល់10ឆ្នាំ — រួមគ្នាផ្តល់ជាការផ្សំពិសេសមួយរយៈពេល60ឆ្នាំ (ឧទាហរណ៍ \"រោងដី\" ឬ \"ខាលទឹក\")។",
    how_p2: "ឧបករណ៍នេះត្រូវបានរចនាឡើងសម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងពីខ្លួនឯង។ អ្នកដែលកើតនៅចុងខែមករា ឬខែកុម្ភៈ អាចស្ថិតនៅជិតកាលបរិច្ឆេទផ្តាច់ចូលឆ្នាំចន្ទគតិ ដែលអាចផ្លាស់ប្តូរលទ្ធផលមួយឆ្នាំក្នុងប្រព័ន្ធបុរាណខ្លះ — យើងកត់សម្គាល់ករណីនេះនៅពេលដែលវាពាក់ព័ន្ធ។",

    blog_heading: "ពីប្លុករបស់យើង",
    blog_link: "អានបន្ថែមអំពីភាពសមស្របនិមិត្តសញ្ញា ទស្សន៍ទាយប្រចាំឆ្នាំ និងធាតុទាំងប្រាំ →",

    footer_about: "អំពីយើង",
    footer_privacy: "គោលការណ៍ឯកជនភាព",
    footer_contact: "ទាក់ទង",
    footer_copyright: "© 2026 MyBirthSign។ សម្រាប់តែការកម្សាន្តប៉ុណ្ណោះ។",

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
    share_download: "ទាញយករូបភាព",
    share_more_apps: "កម្មវិធីផ្សេងទៀត…",
    share_menu_label: "ជម្រើសចែករំលែក",
    share_fb_steps: "សូមជ្រើសរើស Facebook ក្នុងបញ្ជី — រូបភាពលទ្ធផលរបស់អ្នក នឹងចូលទៅក្នុងការបង្ហោះថ្មី (កូដ QR នាំទៅកាន់ផ្កាយកំណើត)។",
    share_fb_link_steps: "សូមជ្រើសរើស Facebook ក្នុងបញ្ជី ដើម្បីបង្ហោះតំណ។",
    share_fb_ready: "Facebook — ចុចម្តងទៀតដើម្បីចែករំលែក",
    share_tap_again: "រួចរាល់ — ចុចម្តងទៀត",
    share_in_app: "កម្មវិធីរុករកក្នុងកម្មវិធីនេះ មិនអាចរក្សាទុក ឬចែករំលែករូបភាពបានទេ។ សូមចុច ⋯ ហើយជ្រើស «បើកក្នុងកម្មវិធីរុករក» (Safari ឬ Chrome) រួចសាកល្បងម្តងទៀត។",
    share_ig_steps: "Instagram មិនទទួលតំណគេហទំព័រទេ។ សូមបង្ហោះរូបភាពជំនួសវិញ៖ ជ្រើសរើស Instagram ក្នុងបញ្ជីចែករំលែក ឬបើក Instagram ចុច + ជ្រើសរើស Story ឬ Post ហើយជ្រើសរូបភាពដែលបានរក្សាទុក។",
    share_tt_steps: "TikTok មិនទទួលតំណគេហទំព័រទេ។ សូមបង្ហោះរូបភាពជំនួសវិញ៖ ជ្រើសរើស TikTok ក្នុងបញ្ជីចែករំលែក ឬបើក TikTok ចុច + រួចចុច Upload ហើយជ្រើសរូបភាពដែលបានរក្សាទុក។",
    needs_patience: "ឆ្នាំខុង",
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
    needs_patience_note_tpl: "ឆ្នាំខុង — {animal}: {years}",
    ad_space: "ទំនេរសម្រាប់ផ្សាយពាណិជ្ជកម្ម",

    followup_heading: "បន្តស្វែងយល់",
    followup_year_ahead: "ឆ្នាំនេះនឹងនាំអ្វីមកខ្ញុំ?",
    followup_luck_boost: "តើខ្ញុំអាចបង្កើនសំណាងរបស់ខ្ញុំយ៉ាងណា?",
    followup_career_fit: "មុខរបរអ្វីសមនឹងខ្ញុំជាងគេ?",
    followup_clash_relationship_tpl: "តើខ្ញុំត្រូវរស់នៅជាមួយ {animal} យ៉ាងណាឱ្យសុខដុម?",
    followup_loading: "✨ កំពុងគិត…",
    followup_luck_fallback_tpl: "ពឹងផ្អែកលើលេខសំណាង ({numbers}) ពណ៌សំណាង ({colors}) និងប្រើ{days}នៅពេលចាំបាច់ត្រូវការពេលវេលាត្រឹមត្រូវ។",
    followup_career_fallback_tpl: "មុខរបរដែលសមស្រប៖ {careers}។"
  },
  zh: {
    nav_checker: "首页",
    nav_checker_page: "我的生肖运势",
    nav_tools: "运势",
    nav_animals: "生肖指南",
    nav_compatibility: "生肖配对",
    nav_wedding: "结婚吉日",
    nav_blog: "博客",
    nav_about: "关于我们",
    nav_contact: "联系我们",
    nav_more: "更多",
    lang_toggle_en: "EN",
    lang_toggle_km: "ខ្មែរ",
    lang_toggle_zh: "中文",
    animals_hero_title: "十二生肖完整指南",
    animals_hero_subtitle: "十二生肖一览——性格、运气与配对。点击任意生肖查看完整介绍。",
    animals_read_more: "查看完整性格",
    animals_cta: "查询你的生肖 →",
    animals_blog_cta: "查看完整年份指南 →",
    compat_page_hero_title: "生肖配对查询",
    compat_page_hero_subtitle: "输入两个生日，看看你们的生肖是否相配——适用于恋爱或合作。",
    compat_page_cta: "查询你的生肖 →",
    romance_hero_title: "💞 生肖配对计算器",
    romance_hero_subtitle: "输入两个人的出生日期，获取完整的生肖配对解读——爱情、友情、事业、财务、沟通、吸引力与长期潜力。",
    romance_p1_dob_label: "第一个人——出生日期",
    romance_p2_dob_label: "第二个人——出生日期",
    romance_submit_btn: "❤️ 查看我们的配对",
    romance_err_required: "请输入两个人的出生日期。",
    romance_err_invalid: "其中一个日期无效，请重新检查。",
    romance_err_future: "出生日期不能是未来的日期，请检查输入。",
    romance_compat_label: "配对度",
    romance_strengths_label: "优势",
    romance_challenges_label: "可能的挑战",
    romance_advice_label: "建议",
    romance_weaknesses_label: "弱点",
    romance_person1_label: "第一个人",
    romance_person2_label: "第二个人",
    romance_categories_heading: "详细配对分析",
    romance_profiles_heading: "生肖资料",
    romance_overall_heading: "整体配对",
    romance_disclaimer: "本结果基于传统中国生肖命理，仅供娱乐，并非科学预测。",
    romance_reset: "🔄 查询另一对",
    rc_hero_title: "💞 恋爱配对计算器",
    rc_hero_subtitle: "输入双方生日，获取完整配对报告——西方太阳星座、数字命理生命灵数，以及 11 个方面的关系分析。",
    rc_person1_legend: "第一个人",
    rc_person2_legend: "第二个人",
    rc_name_label: "姓名或昵称（可选）",
    rc_dob_label_req: "出生日期（必填）",
    rc_time_label: "出生时间（可选）",
    rc_location_label: "出生地点（可选）",
    rc_location_placeholder: "城市，国家",
    rc_gender_label: "性别（可选）",
    rc_gender_prefer_not: "不愿透露",
    rc_gender_woman: "女",
    rc_gender_man: "男",
    rc_gender_nonbinary: "非二元",
    rc_submit: "❤️ 计算配对",
    rc_privacy_note: "你的信息仅用于计算本次配对结果。出生资料无需保存，你输入的内容也不会发送到任何外部服务——全部在你自己的浏览器中计算。",
    rc_quick_check_heading: "想快速查看生肖配对？",
    rc_quick_check_intro: "想要更简单的星级配对？请使用下面的快速查询。",
    rc_err_required: "请输入两个人的出生日期。",
    rc_err_future: "出生日期不能是未来的日期，请检查输入。",
    rc_err_invalid: "其中一个日期无效，请重新检查。",
    rc_western_zodiac_heading: "西方星座",
    rc_chinese_zodiac_heading: "中国生肖",
    rc_numerology_heading: "数字命理",
    rc_life_path_label: "生命灵数",
    rc_birthday_number_label: "生日数",
    rc_attitude_number_label: "态度数",
    rc_numerology_method_note: "计算方法：月、日、年分别化简，每一步都保留主数 11、22 和 33，然后把三个结果相加，再用同样的方法化简。",
    rc_summary_heading: "配对总结",
    rc_summary_disclaimer: "这些配对分数基于传统星座与数字命理，仅供娱乐与自我反思，并未经过科学验证。",
    rc_card_eyebrow: "恋爱配对",
    rc_card_overall_label: "配对度",
    rc_card_tagline_high: "你们之间有真正的优势——这份缘分可以成为感情的坚实依靠。",
    rc_card_tagline_medium: "你们很有潜力——只需要多一点用心，就能更加默契。",
    rc_card_tagline_low: "这需要双方认真付出——但愿意经营的情侣，往往会觉得值得。",
    rc_analysis_heading: "关系分析",
    rc_works_well_label: "可能顺利的地方",
    rc_challenge_label: "可能出现挑战的地方",
    rc_insights_heading: "个性化解读",
    rc_strengths_heading: "💚 最大优势",
    rc_challenges_heading: "⚠️ 可能的挑战",
    rc_tips_heading: "💡 相处建议",
    rc_needs_heading: "❤️ 双方各自的需要",
    rc_comm_tip_heading: "💬 沟通建议",
    rc_love_tip_heading: "💕 爱情建议",
    rc_extra_astro_heading: "月亮、上升、金星与火星",
    rc_extra_astro_missing: "没有提供出生时间和地点，因此本部分主要基于太阳星座配对。",
    rc_extra_astro_unavailable: "月亮、上升、金星和火星星座需要精确的天文（星历）计算，本工具暂不提供，因此即使输入了出生时间和地点，我们也不会猜测。以上内容仅基于太阳星座与数字命理配对。",
    rc_disclaimer: "星座与数字命理是传统信仰体系，仅供娱乐与自我反思。它们并不是经过科学验证的性格、感情或未来预测方法。",
    rc_narrative_lang_note: "下面的详细说明目前仅提供英文版。",
    rc_pair_header_tpl: "{p1} {symbol1} {p1sign}  ❤️  {p2} {symbol2} {p2sign}",
    nav_business: "合作伙伴",
    nav_business_guide: "商业指南",
    biz_hero_title: "💼 商业合作配对",
    biz_hero_subtitle: "中国生肖 • 五行 • 商业性格",
    biz_person1_legend: "第一个人",
    biz_person2_legend: "第二个人",
    biz_name_label: "姓名 / 公司名称（可选）",
    biz_dob_label_req: "出生日期（必填）",
    biz_time_label: "出生时间（可选）",
    biz_location_label: "出生地点（可选）",
    biz_location_placeholder: "城市，国家",
    biz_submit: "查看商业配对 →",
    biz_privacy_note: "出生信息仅用于生成本次解读，无需保存。所有计算都在你自己的浏览器中完成。",
    biz_err_required: "请输入两个人的出生日期。",
    biz_err_future: "出生日期不能是未来的日期，请检查输入。",
    biz_err_invalid: "其中一个日期无效，请重新检查。",
    biz_heavenly_stem_label: "天干",
    biz_earthly_branch_label: "地支",
    biz_five_elements_heading: "五行",
    biz_elements_disclaimer: "五行相互关系是一种传统框架，并非科学预测商业结果的方法。",
    biz_dashboard_heading: "配对概览",
    biz_dashboard_disclaimer: "基于传统中国命理的娱乐性分数，并非科学测量，不能代替对真实合作伙伴的评估。",
    biz_analysis_heading: "商业配对分析",
    biz_narrative_lang_note: "下面的详细说明目前仅提供英文版。",
    biz_works_well_label: "可能顺利的地方",
    biz_challenge_label: "可能出现挑战的地方",
    biz_roles_heading: "👥 角色配对",
    biz_role_intro: "根据传统生肖解读，以下角色可能与双方各自的特点互补——但不保证一定合适。",
    biz_could_focus_on_tpl: "{name} 可以考虑负责：",
    biz_strengths_heading: "💎 互补优势",
    biz_what_may_bring_tpl: "{name} 可能带来的",
    biz_what_together: "双方可能共同打造的",
    biz_top_strengths_heading: "💚 最大优势",
    biz_challenges_heading: "⚠️ 可能的商业挑战",
    biz_challenges_intro: "这些是合作之前值得讨论的实际商业问题——不是生肖预测。",
    biz_checklist_heading: "📋 合作清单",
    biz_checklist_intro: "在正式合作之前，请把这些事项写成书面约定——最好请专业法律人士协助。",
    biz_summary_heading: "🧧 商业合作总结",
    biz_summary_complementary: "主要互补特点：",
    biz_summary_discuss: "需要讨论的主要方面：",
    biz_summary_roles: "可能的分工：",
    biz_extra_heading: "出生时间与地点",
    biz_extra_unavailable: "已输入出生时间和地点，但这里不会用于额外计算——只计算上面显示的、以农历新年为准的生肖、五行和天干地支。",
    biz_extra_missing: "没有提供出生时间和地点，因此本解读只基于出生日期。",
    biz_privacy_inline: "出生信息仅用于生成本次解读，无需保存。",
    biz_disclaimer: "中国命理与五行是传统信仰体系，用于文化探索、娱乐与自我反思。它们不是经过科学验证的商业表现、性格、财务结果或合作成功的预测方法。真正的商业决定应基于资历、经验、财务分析、合同以及专业意见。",
    biz_reset: "🔄 分析另一组合作",
    biz_page_cta: "试试我们的恋爱与综合配对计算器 →",
    biz_guide_cta: "阅读完整指南：中国生肖商业配对 →",
    biz_h1_a: "运势",
    biz_h1_b: "合作伙伴",
    biz_h1_c: "配对",
    biz_hero_sub2: "比较两个出生日期的商业配对",
    biz_hero_desc: "了解两个生肖在商业上如何合作，包括团队协作、沟通、领导力、理财方式和成长潜力。",
    biz_time_toggle: "添加出生时间（可选）",
    biz_ov_title: "你们的商业配对结果",
    biz_ov_match: "商业配对",
    biz_ov_el_label: "五行",
    biz_ov_year_label: "生肖年",
    biz_ov_c_partnership: "合作关系",
    biz_ov_c_communication: "沟通",
    biz_ov_c_leadership: "领导力",
    biz_ov_c_finance: "财务潜力",
    biz_ov_c_decision: "决策",
    biz_ov_c_growth: "成长潜力",
    biz_ov_d_high: "这方面非常相配。",
    biz_ov_d_mid: "有清楚的约定就能顺利合作。",
    biz_ov_d_low: "需要刻意建立规则。",
    biz_ov_strengths: "商业优势",
    biz_ov_challenges: "可能的挑战",
    biz_ov_roles: "最适合的商业角色",
    biz_ov_elem_title: "五行配对",
    biz_ov_harm_high: "商业非常和谐",
    biz_ov_harm_mid: "商业平衡和谐",
    biz_ov_harm_low: "需要刻意平衡",
    biz_ov_disclaimer: "这些解读基于传统中国生肖与五行概念，仅供娱乐与个人反思。",
    wedding_hero_title: "结婚吉月挑选",
    wedding_hero_subtitle: "输入双方生日和年份，我们会根据每个月与你们两人生肖的相合程度来评分——作为挑选日子的有趣传统参考。",
    wedding_year_label: "计划结婚的年份",
    wedding_submit: "查找好月份",
    wedding_results_heading: "{year} 年各月",
    wedding_month_col: "月份",
    wedding_animal_col: "当月生肖",
    wedding_rating_col: "评分",
    wedding_note_col: "原因",
    rating_excellent: "极佳",
    rating_good: "良好",
    rating_workable: "可以",
    rating_avoid: "避免",
    wedding_note_excellent: "本月生肖与你们两人的生肖都属于“三合”——传统上是最和谐的组合之一。",
    wedding_note_good: "本月生肖与其中一人三合，与另一人无冲——总体上是不错的月份。",
    wedding_note_workable: "与你们两人既不相冲也不三合——是可行、少摩擦的月份。",
    wedding_note_avoid: "本月生肖与你们至少一人直接相冲——传统上需要谨慎，或最好避开。",
    wedding_disclaimer: "这是一个简化的趣味指南，基于传统的生肖月份规律和一般季节规律——并非精确的农历择日，也不是真实的天气预报。如需精确日期，可以参考专业通书或请教命理师，并查看你所在城市的历史天气。仅供娱乐。",
    wedding_region_label: "你所在的大致气候区",
    region_northern: "北半球（如美国、欧洲、中国）",
    region_southern: "南半球（如澳大利亚、南非、南美）",
    region_tropical: "热带 / 近赤道地区（如柬埔寨、东南亚）",
    wedding_season_col: "一般季节",
    wedding_holiday_col: "附近节日",
    season_spring: "春季",
    season_summer: "夏季",
    season_fall: "秋季",
    season_winter: "冬季",
    season_tropical: "热带",
    season_note_mild: "通常气候温和——热门婚礼季节",
    season_note_hot: "可能较热",
    season_note_cold: "可能较冷或多雨",
    season_note_tropical: "请查看当地的旱季 / 雨季",
    no_holidays: "—",
    wedding_top_picks_heading: "综合最佳月份",
    wedding_top_picks_note: "结合了生肖相合与通常较温和的天气。列出的节日前后，场地和价格可能更紧张、更贵——如果正好在你的月份，请提早预订。",
    wedding_top_picks_none: "今年没有在生肖和季节两方面都特别突出的月份——下面的完整表格仍有不错的选择。",
    wedding_suggested_dates_label: "建议的星期六",
    hero_title: "你的生日透露了什么？",
    hero_subtitle: "输入你的出生日期，查看你的生肖、五行、幸运数字等。",
    checker_hero_title: "我属什么生肖？",
    checker_hero_subtitle: "输入你的出生日期，了解你的生肖、五行、性格等。",
    chk_form_hint: "你的出生日期决定你的生肖、五行以及传统生肖特点。",
    chk_sample_note: "下面显示的是示例结果——在上方输入你的出生日期，查看你自己的生肖。",
    chk_foot_tag: "生肖 • 配对 • 合作伙伴 • 生肖指南",
    chk_foot_checker: "生肖查询",
    chk_your_sign: "你的生肖",
    chk_animal_years: "出生年份",
    chk_same_sign: "同一生肖（彼此深刻理解，但要注意竞争）",
    chk_full_guide: "阅读完整指南 →",
    chk_close: "关闭",
    chk_birth_year: "出生年份",
    chk_element: "五行",
    chk_yinyang: "阴 / 阳",
    chk_zodiac_year: "生肖年",
    chk_yang: "阳",
    chk_yin: "阴",
    chk_personality: "性格",
    chk_love: "爱情与关系",
    chk_career: "事业与工作",
    chk_luck: "运气与传统",
    chk_directions: "幸运方位",
    chk_months: "最佳月份",
    chk_cta_title: "查看你的配对",
    chk_cta_sub: "看看你和伴侣、朋友或合作伙伴有多相配。",
    chk_cta_btn: "查看配对 →",
    chk_explore_title: "探索全部十二生肖",
    chk_disclaimer: "生肖解读基于传统文化信仰，仅供娱乐、文化探索与个人反思，不应视为科学预测或专业建议。",
    today_label: "今天",
    today_number_label: "今日数字",
    today_luck_heading: "你今天的运气",
    today_luck_date_tpl: "用你的{animal}运势来看 {date}：",
    today_luck_weekday_match_tpl: "✅ 今天（{weekday}）是你的幸运日之一。",
    today_luck_weekday_nomatch_tpl: "➖ 今天（{weekday}）不是你常见的幸运日——是平静的一天，并不是坏日子。",
    today_luck_number_match_tpl: "✅ 今天的通用数字（{number}）是你的幸运数字之一。",
    today_luck_number_nomatch_tpl: "➖ 今天的通用数字是 {number}——不是你常见的幸运数字。",
    today_luck_month_same_tpl: "✅ 本月带有{animal}的能量——正是你自己的生肖——对你来说是特别旺的一个月。",
    today_luck_month_triangle_tpl: "✅ 本月带有{animal}的能量，与你属于同一三合组——是顺利、有助力的一个月。",
    today_luck_month_clash_tpl: "⚠️ 本月带有{animal}的能量，与你的生肖相冲——这个月要谨慎行事，避免大的风险。",
    today_luck_month_neutral_tpl: "➖ 本月带有{animal}的能量——对你的生肖来说属于中性，既无加分也无需特别小心。",
    today_luck_verdict_great: "总体：今天对你来说是大吉的一天——适合行动。✨",
    today_luck_verdict_good: "总体：今天是好日子——好好把握。",
    today_luck_verdict_ordinary: "总体：今天是平常的一天——稳稳地过。",
    today_luck_verdict_caution: "总体：今天放轻松一些，尽量避免做重大决定。",
    dob_label: "你的出生日期",
    reveal_button: "我的运势",
    hero_cta_button: "我的生肖运势",
    compat_heading: "查看配对",
    compat_intro: "看看两个生日有多相配——适用于恋爱或商业合作。",
    doba_label: "A 的出生日期",
    dobb_label: "B 的出生日期",
    relationship_legend: "关系类型",
    romantic_option: "恋人",
    business_option: "合作伙伴",
    compat_submit: "查看配对",
    how_heading: "计算方法",
    how_p1: "按照传统的东亚生肖周期，你的出生年份对应十二生肖之一和五行之一。生肖代表据说每 12 年重复一次的性格特点，五行则每 10 年重复一次，为性格增添另一层色彩——两者组合成独特的 60 年周期（例如“土龙”或“水虎”）。",
    how_p2: "本工具供娱乐与自我反思。1 月下旬或 2 月出生的人可能正好在农历新年前后，在某些传统体系中结果可能会相差一年——遇到这种情况我们会特别说明。",
    blog_heading: "博客文章",
    blog_link: "阅读更多关于生肖配对、年度运势和五行的文章 →",
    footer_about: "关于我们",
    footer_privacy: "隐私政策",
    footer_contact: "联系我们",
    footer_copyright: "© 2026 MyBirthSign。仅供娱乐。",
    result_born: "出生",
    result_zodiac_year: "生肖年",
    ai_loading: "✨ 正在为你撰写个人解读…",
    strengths: "优点",
    watch_out: "需要注意",
    lucky_numbers: "幸运数字",
    lucky_colors: "幸运颜色",
    lucky_days: "幸运日",
    best_matches: "最相配的生肖",
    share_button: "分享",
    share_copy_link: "复制链接",
    share_copied: "链接已复制！",
    share_paste_note_tpl: "已复制——请在 {network} 中粘贴",
    share_image_option: "分享图片",
    share_image_preparing: "正在生成图片…",
    share_image_saved: "图片已保存！",
    share_image_failed: "无法生成图片",
    share_download: "下载图片",
    share_more_apps: "更多应用…",
    share_menu_label: "分享选项",
    share_fb_steps: "在列表中选择 Facebook——你的结果图片会放进新帖子（图片上的二维码会打开 MyBirthSign）。",
    share_fb_link_steps: "在列表中选择 Facebook 来发布链接。",
    share_fb_ready: "Facebook——再点一次即可分享",
    share_tap_again: "准备好了——再点一次",
    share_in_app: "这个应用的内置浏览器无法保存或分享图片。请点击 ⋯ 并选择“在浏览器中打开”（Safari 或 Chrome），然后再试一次。",
    share_ig_steps: "Instagram 不支持网站链接。请改为发布图片：在分享列表中选择 Instagram，或打开 Instagram，点击 +，选择快拍或帖子，再选择已保存的图片。",
    share_tt_steps: "TikTok 不支持网站链接。请改为发布图片：在分享列表中选择 TikTok，或打开 TikTok，点击 +，选择上传，再选择已保存的图片。",
    needs_patience: "需要多一些耐心的生肖",
    careers_heading: "通常适合的职业",
    best_match_years_heading: "最相配的出生年份",
    disclaimer: "仅供娱乐。",
    compat_disclaimer: "仅供娱乐——不能代替真正的沟通。",
    romantic_label: "恋人",
    business_label: "合作伙伴",
    born_sub_tpl: "出生于 {date} · 生肖年 {year}",
    lunar_note_with_cny_tpl: "根据 {year} 年真实的农历新年日期（{cny}）计算——而不只是公历年份。",
    lunar_note_no_cny_tpl: "根据 {year} 年真实的农历新年日期计算——而不只是公历年份。",
    same_sign_note_tpl: "同一生肖（{animal}，彼此深刻理解，但要注意竞争）：{years}",
    needs_patience_note_tpl: "需要多一些耐心——{animal}：{years}",
    ad_space: "广告位",
    followup_heading: "继续探索",
    followup_year_ahead: "今年对我来说会怎样？",
    followup_luck_boost: "我现在怎样提升运气？",
    followup_career_fit: "什么职业最适合我？",
    followup_clash_relationship_tpl: "我和属{animal}的人怎么相处？",
    followup_loading: "✨ 思考中…",
    followup_luck_fallback_tpl: "多借助你的幸运数字（{numbers}）、幸运颜色（{colors}），需要挑时间时优先选择{days}。",
    followup_career_fallback_tpl: "通常适合的职业：{careers}。"
  }
};

// ---------------------------------------------------------------------------
// Language-state helpers
// ---------------------------------------------------------------------------
const LANG_STORAGE_KEY = "siteLang";
// English, Khmer and Simplified Chinese. A page or tool without Chinese text yet shows its English text.
const SITE_LANGS = ["en", "km", "zh"];
/** the language a piece of content has: `lang` when the table has it, otherwise English */
function pickLang(table, lang) { lang = lang || getLang(); return table && table[lang] !== undefined ? table[lang] : (table ? table.en : undefined); }

function getLang() {
  // a shared Khmer/English link (?lang=km / ?lang=en) opens in that language and remembers it
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (SITE_LANGS.indexOf(q) > -1) {
      try { window.localStorage.setItem(LANG_STORAGE_KEY, q); } catch (e) { /* storage blocked */ }
      return q;
    }
  } catch (e) { /* old browser */ }
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (SITE_LANGS.indexOf(stored) > -1) return stored;
  } catch (e) {
    // localStorage unavailable (private mode, etc.) — fall through to auto-detect.
  }
  try {
    const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.indexOf("km") === 0) return "km";
    if (nav.indexOf("zh") === 0) return "zh";
  } catch (e) {
    // navigator unavailable
  }
  return "en";
}

function setLang(lang) {
  if (SITE_LANGS.indexOf(lang) < 0) return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    // best effort only
  }
  if (typeof window !== "undefined" && window.location && typeof window.location.reload === "function") {
    // drop a shared ?lang=… so the visitor's own choice wins after the reload
    try {
      const u = new URL(window.location.href);
      if (u.searchParams.has("lang")) { u.searchParams.delete("lang"); window.location.replace(u.toString()); return; }
    } catch (e) { /* fall back to a plain reload */ }
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
// Chinese text uses Noto Sans SC, loaded only when a visitor reads the site in Chinese
function loadChineseFont() {
  try {
    if (document.getElementById("font-zh")) return;
    const l = document.createElement("link");
    l.id = "font-zh"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap";
    document.head.appendChild(l);
  } catch (e) { /* the system Chinese font is used */ }
}

function applyStaticTranslations() {
  const lang = getLang();
  try {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
  } catch (e) { /* ignore */ }
  if (lang === "zh") loadChineseFont();

  const strings = UI_STRINGS[lang] || UI_STRINGS.en;
  const str = function (key) { return strings[key] !== undefined ? strings[key] : UI_STRINGS.en[key]; };

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const v = str(el.getAttribute("data-i18n"));
    if (v !== undefined) el.textContent = v;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    const v = str(el.getAttribute("data-i18n-placeholder"));
    if (v !== undefined) el.setAttribute("placeholder", v);
  });

  // a block shows when it is in the page language; in Chinese, an English block also shows
  // when the same place has no Chinese block yet
  document.querySelectorAll("[data-lang-content]").forEach(function (el) {
    const elLang = el.getAttribute("data-lang-content");
    let show = elLang === lang;
    if (!show && lang === "zh" && elLang === "en") {
      const sibs = el.parentNode ? el.parentNode.children : [];
      show = !Array.prototype.some.call(sibs, function (s) { return s.getAttribute && s.getAttribute("data-lang-content") === "zh"; });
    }
    el.style.display = show ? "" : "none";
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
  // for their calendar locale/numerals AND for the displayed field order.
  // Pin every date field to "en-GB" (dd/mm/yyyy) in both languages, and
  // keep Gregorian/English numerals always (so the picker UI doesn't flip
  // into Khmer numerals when the page does).
  document.querySelectorAll('input[type="date"]').forEach(function (el) {
    el.setAttribute("lang", "en-GB");
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

// Mobile hamburger menu: below the --nav-collapse-width breakpoint (see
// css/style.css), the header's <nav> collapses into a dropdown panel
// toggled by a hamburger button. Above that width the button is hidden by
// CSS and this is a no-op (the nav displays inline as before).
// Highlight the menu item for the page being viewed (pretty URLs, .html and blog posts all count).
function markCurrentNav() {
  const nav = document.querySelector("header.site-header nav");
  if (!nav) return;
  const norm = function (p) {
    p = String(p || "/").toLowerCase().replace(/\/index(\.html)?$/, "/").replace(/\.html$/, "").replace(/\/+$/, "");
    if (p === "/zodiac-guide") p = "/animals";
    return p || "/";
  };
  let here = norm(location.pathname);
  if (here.indexOf("/blog/") === 0) here = "/blog";
  nav.querySelectorAll("a[href]").forEach(function (a) {
    if (a.hasAttribute("data-lang-switch")) return;
    if (norm(a.pathname) !== here) return;
    a.setAttribute("aria-current", "page");
    const dd = a.closest(".nav-dropdown");
    if (dd) dd.classList.add("has-current");
  });
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("header.site-header nav");
  try { markCurrentNav(); } catch (e) { /* never block the menu */ }
  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after a nav link is actually followed (not a <summary>
  // that just opens a "Tools"/"More" submenu, and not the EN/KM language
  // switch, which stays on the same page).
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (!a.hasAttribute("data-lang-switch")) closeMenu();
    });
  });

  // Close if the person taps/clicks outside the open menu.
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("nav-open") && !nav.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Collapsing back to desktop width (e.g. rotating a tablet) shouldn't
  // leave the mobile panel stuck open underneath the now-inline nav.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 640 && !document.documentElement.classList.contains("nav-compact")) closeMenu();
  });
  fitNav();
}

// Desktop: every page sits on one line in the top menu. If that line does not fit (narrow window,
// longer Khmer labels) the page gets html.nav-compact and the menu turns into the ☰ panel (css/style.css).
function fitNav() {
  const root = document.documentElement;
  const header = document.querySelector("header.site-header");
  const box = header && header.querySelector(".container");
  const nav = header && header.querySelector("nav");
  if (!box || !nav) return;
  let raf = 0;
  function measure() {
    raf = 0;
    if (window.innerWidth <= 640) { root.classList.remove("nav-compact"); return; }   // phones use the media query
    const wasOpen = nav.classList.contains("nav-open");
    root.classList.remove("nav-compact");
    const tooWide = box.scrollWidth > box.clientWidth + 1 || nav.getBoundingClientRect().right > box.getBoundingClientRect().right + 1;
    root.classList.toggle("nav-compact", tooWide);
    if (!tooWide && wasOpen) { nav.classList.remove("nav-open"); const t = header.querySelector(".nav-toggle"); if (t) t.setAttribute("aria-expanded", "false"); }
  }
  function later() { if (!raf) raf = requestAnimationFrame(measure); }
  measure();
  // a soft shadow under the header once the page is scrolled
  const shade = function () { header.classList.toggle("is-scrolled", (window.scrollY || 0) > 8); };
  shade(); window.addEventListener("scroll", shade, { passive: true });
  // header height for bars that stick just below it (css: var(--hdr-h))
  const hh = function () { root.style.setProperty("--hdr-h", Math.round(header.getBoundingClientRect().height) + "px"); };
  hh(); window.addEventListener("resize", hh); window.addEventListener("load", hh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(hh).catch(function () {});
  window.addEventListener("resize", later);
  window.addEventListener("load", later);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(later).catch(function () {});
  // the EN / ខ្មែរ switch changes the labels (and their width)
  document.querySelectorAll("[data-lang-switch]").forEach(function (a) { a.addEventListener("click", function () { setTimeout(later, 0); }); });
}

// Phones: show the EN / ខ្មែរ switch in the top bar next to the menu button, so it is always
// visible without opening the menu (CSS shows this copy only at phone width and hides the one
// inside the menu there). Runs before applyStaticTranslations/initLangToggle so the copy gets
// the same labels, highlight and click handling.
function mountBarLangToggle() {
  const header = document.querySelector("header.site-header");
  const inner = header && header.querySelector("nav .lang-toggle");
  const btn = header && header.querySelector(".nav-toggle");
  if (!inner || !btn || header.querySelector(".lang-toggle-bar")) return;
  const copy = inner.cloneNode(true);
  copy.classList.add("lang-toggle-bar");
  copy.setAttribute("role", "group");
  copy.setAttribute("aria-label", "Language / ភាសា");
  btn.parentNode.insertBefore(copy, btn);
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    try { mountBarLangToggle(); } catch (e) { /* the switch inside the menu still works */ }
    applyStaticTranslations();
    initLangToggle();
    initNavToggle();
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
  ZH_ANIMAL_NAMES: ZH_ANIMAL_NAMES,
  ZH_ANIMAL_INFO: ZH_ANIMAL_INFO,
  LOC: LOC,
  UI_STRINGS: UI_STRINGS
};

// `const`/`let` declarations don't become properties of `window` the way
// `var` does, so expose the pieces a test harness (or any other script)
// might reach for via `window.X` explicitly.
if (typeof window !== "undefined") {
  window.ZodiacI18N = ZodiacI18N;
  window.getLang = getLang;
  window.pickLang = pickLang;
  window.SITE_LANGS = SITE_LANGS;
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
  window.ZH_ANIMAL_NAMES = ZH_ANIMAL_NAMES;
  window.ZH_ELEMENT_NAMES = ZH_ELEMENT_NAMES;
  window.ZH_ANIMAL_INFO = ZH_ANIMAL_INFO;
  window.ZH_ELEMENT_INFO = ZH_ELEMENT_INFO;
  window.ZH_COMPAT_INFO = ZH_COMPAT_INFO;
  window.ZH_LIFE_PATH_INFO = ZH_LIFE_PATH_INFO;
  window.ZH_COLOR_NAMES = ZH_COLOR_NAMES;
  window.ZH_DAY_NAMES = ZH_DAY_NAMES;
  window.LOC = LOC;
}
