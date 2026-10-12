// Extra per-animal content for the redesigned checker page (English).
// Traditional cultural associations, for entertainment and reflection only.
const CHECKER_EXTRA = {
  Rat: { kanji:"鼠", yin:"Yang",
    personality:["Quick-witted and resourceful","Charming and sociable","Observant of opportunities","Adaptable under pressure","Careful with security and money"],
    love:["Loyal once trust is built","Enjoys lively conversation","Protective of loved ones","Can be guarded at first","Needs honesty and reassurance"],
    career:["Strategic and sharp-minded","Strong at research and trading","Good at spotting trends","Thrives in business and writing","Prefers clever, flexible work"],
    directions:"West, Northwest, North", months:"January, June, September" },
  Ox: { kanji:"牛", yin:"Yin",
    personality:["Reliable and honest","Patient and determined","Practical and grounded","Strong sense of duty","Slow to change, hard to move"],
    love:["Steady and devoted","Shows love through actions","Values stability and tradition","Slow to open up","Needs a patient partner"],
    career:["Hardworking and disciplined","Excels in long-term projects","Dependable team member","Strong in farming, finance, building","Builds success step by step"],
    directions:"North, Northeast, South", months:"February, May, August" },
  Tiger: { kanji:"虎", yin:"Yang",
    personality:["Brave and confident","Passionate and competitive","Natural risk-taker","Charismatic presence","Can be impulsive"],
    love:["Intense and romantic","Loves adventure together","Fiercely loyal","Needs freedom and respect","Dislikes being controlled"],
    career:["Born to lead and inspire","Thrives on challenge","Bold decision-maker","Good in sports, law, entrepreneurship","Needs room to act independently"],
    directions:"East, South, Southeast", months:"March, July, November" },
  Rabbit: { kanji:"兔", yin:"Yin",
    personality:["Gentle and thoughtful","Diplomatic and kind","Artistic and refined","Cautious by nature","Seeks harmony"],
    love:["Caring and affectionate","Creates a warm home","Avoids conflict","Sensitive to criticism","Needs calm and security"],
    career:["Tactful negotiator","Good with design and the arts","Detail-oriented and careful","Works well in teams","Thrives in peaceful settings"],
    directions:"East, Southeast, South", months:"January, April, October" },
  Dragon: { kanji:"龍", yin:"Yang",
    personality:["Bold and charismatic","Ambitious and energetic","Confident and generous","Natural center of attention","Can be proud or impatient"],
    love:["Passionate and magnetic","Loves grand gestures","Expects loyalty","Needs a partner with confidence","Dislikes feeling restricted"],
    career:["Visionary leader","Thinks big","Excels in business and creative fields","Inspires others","Takes charge of new ventures"],
    directions:"East, Southeast, West", months:"March, June, December" },
  Snake: { kanji:"蛇", yin:"Yin",
    personality:["Wise and intuitive","Calm and deeply private","Elegant and observant","Determined in pursuit of goals","Slow to trust"],
    love:["Deeply loyal and intense","Enjoys meaningful connection","Can be possessive","Values intellect and depth","Needs trust and honesty"],
    career:["Analytical and strategic","Excels in research and finance","Works well alone","Strong in planning","Prefers thoughtful, quality work"],
    directions:"Southwest, West, South", months:"April, August, September" },
  Horse: { kanji:"馬", yin:"Yang",
    personality:["Energetic and optimistic","Independent and confident","Loves freedom and adventure","Charismatic and outgoing","Quick thinker and adaptable"],
    love:["Passionate and romantic","Likes excitement and fun","Values honesty and freedom","Attracts many admirers","Needs a supportive partner"],
    career:["Ambitious and hardworking","Great at leadership","Good communicator","Excels in creative industries","Enjoys variety and new challenges"],
    directions:"South, Southeast, Southwest", months:"March, June, September" },
  Goat: { kanji:"羊", yin:"Yin",
    personality:["Gentle and creative","Compassionate and kind","Artistic and imaginative","Easygoing but sensitive","Prefers peace over conflict"],
    love:["Tender and romantic","Devoted to family","Needs emotional security","Can be indecisive","Values harmony at home"],
    career:["Creative and intuitive","Shines in arts, design, caring work","Works best in supportive teams","Dislikes rigid pressure","Brings warmth to any workplace"],
    directions:"South, Southeast, East", months:"February, July, October" },
  Monkey: { kanji:"猴", yin:"Yang",
    personality:["Clever and curious","Playful and witty","Inventive problem-solver","Quick to learn","Can get restless"],
    love:["Fun and flirtatious","Loves laughter and variety","Needs mental stimulation","Can fear commitment","Values a playful partner"],
    career:["Innovative and versatile","Great at sales and communication","Thrives in technology and media","Learns new skills fast","Enjoys solving puzzles"],
    directions:"West, Northwest, North", months:"February, August, December" },
  Rooster: { kanji:"雞", yin:"Yin",
    personality:["Hardworking and observant","Confident and organized","Honest and direct","Takes pride in appearance","Perfectionist streak"],
    love:["Loyal and devoted","Shows care through effort","Direct about feelings","Can be critical","Needs appreciation"],
    career:["Detail-focused and diligent","Excels in management and service","Strong planner","Good in finance and media","Takes pride in quality"],
    directions:"West, Southwest, Northwest", months:"May, September, November" },
  Dog: { kanji:"狗", yin:"Yang",
    personality:["Loyal and honest","Fair-minded and responsible","Protective of friends","Cautious and thoughtful","Can worry too much"],
    love:["Faithful and sincere","Values trust above all","Deeply protective","Slow but steady in love","Needs loyalty in return"],
    career:["Trustworthy and ethical","Excels in service, law, teaching","Strong team player","Reliable under pressure","Driven by purpose"],
    directions:"East, South, Southeast", months:"March, July, October" },
  Pig: { kanji:"豬", yin:"Yin",
    personality:["Generous and warm-hearted","Easygoing and sincere","Enjoys comfort and good company","Patient and diligent","Can be too trusting"],
    love:["Affectionate and giving","Loves cozy time together","Loyal and tolerant","Avoids conflict","Needs a sincere partner"],
    career:["Dedicated and hardworking","Great with people and hospitality","Generous team supporter","Good in food, care, and creative work","Enjoys a pleasant workplace"],
    directions:"East, Southeast, North", months:"January, May, August" }
};

// Khmer versions of the per-animal lists, plus direction / month words.
const CHECKER_EXTRA_KM = {
  Rat: {
    personality:["ឆ្លាតវៃ និងមានល្បិចល្អ","ទាក់ទាញ និងចូលចិត្តសង្គម","មើលឃើញឱកាសបានលឿន","សម្របខ្លួនបានល្អក្នុងសម្ពាធ","ប្រុងប្រយ័ត្នខាងលុយកាក់"],
    love:["ស្មោះត្រង់ពេលទុកចិត្តហើយ","ចូលចិត្តសន្ទនាសប្បាយៗ","ការពារមនុស្សជាទីស្រឡាញ់","ពេលដំបូងអាចរក្សាខ្លួន","ត្រូវការភាពស្មោះត្រង់ និងការធានា"],
    career:["មានយុទ្ធសាស្ត្រ និងឆ្លាតវៃ","ពូកែស្រាវជ្រាវ និងជួញដូរ","ចាប់បានទំនោរទីផ្សារឆាប់","រីកចម្រើនក្នុងអាជីវកម្ម និងការសរសេរ","ចូលចិត្តការងារបត់បែន"] },
  Ox: {
    personality:["អាចទុកចិត្តបាន និងស្មោះត្រង់","អត់ធ្មត់ និងមានការតាំងចិត្ត","ជាក់ស្តែង និងស្ថិតស្ថេរ","មានស្មារតីទទួលខុសត្រូវខ្ពស់","យឺតក្នុងការផ្លាស់ប្តូរ"],
    love:["ស្មោះស្ម័គ្រ និងស្ថិតស្ថេរ","បង្ហាញស្នេហាតាមរយៈទង្វើ","ឲ្យតម្លៃស្ថិរភាព និងប្រពៃណី","យឺតក្នុងការបើកចិត្ត","ត្រូវការដៃគូដែលអត់ធ្មត់"],
    career:["ឧស្សាហ៍ និងមានវិន័យ","ពូកែគម្រោងរយៈពេលវែង","ជាសមាជិកក្រុមដែលទុកចិត្តបាន","ពូកែកសិកម្ម ហិរញ្ញវត្ថុ សំណង់","បង្កើតជោគជ័យមួយជំហានម្តងៗ"] },
  Tiger: {
    personality:["ក្លាហាន និងមានទំនុកចិត្ត","ចំណង់ចំណូលចិត្តខ្លាំង និងចូលចិត្តប្រកួត","ហ៊ានប្រថុយ","មានមន្តស្នេហ៍ទាក់ទាញ","ពេលខ្លះរហ័សរហួនពេក"],
    love:["ស្នេហាខ្លាំង និងរ៉ូមែនទិក","ចូលចិត្តដំណើរផ្សងព្រេងជាមួយគ្នា","ស្មោះត្រង់ខ្លាំង","ត្រូវការសេរីភាព និងការគោរព","មិនចូលចិត្តត្រូវបានគ្រប់គ្រង"],
    career:["កើតមកដើម្បីដឹកនាំ និងជំរុញ","រីកចម្រើនពេលជួបបញ្ហាប្រឈម","ហ៊ានសម្រេចចិត្ត","ពូកែកីឡា ច្បាប់ ជំនួញ","ត្រូវការទំហំធ្វើការដោយឯករាជ្យ"] },
  Rabbit: {
    personality:["ទន់ភ្លន់ និងគិតគូរ","ចេះចរចា និងសប្បុរស","មានសិល្បៈ និងឧត្តុង្គឧត្តម","ប្រុងប្រយ័ត្នតាមធម្មជាតិ","ស្វែងរកភាពសុខដុម"],
    love:["យកចិត្តទុកដាក់ និងស្និទ្ធស្នាល","បង្កើតផ្ទះដ៏កក់ក្តៅ","គេចវៀងជម្លោះ","រងគ្រោះងាយពេលត្រូវគេរិះគន់","ត្រូវការភាពស្ងប់ និងសុវត្ថិភាព"],
    career:["អ្នកចរចាមានល្បិចល្អ","ពូកែរចនា និងសិល្បៈ","យកចិត្តទុកដាក់លើព័ត៌មានលម្អិត","ធ្វើការល្អជាក្រុម","រីកចម្រើនក្នុងបរិយាកាសស្ងប់ស្ងាត់"] },
  Dragon: {
    personality:["ក្លាហាន និងមានមន្តស្នេហ៍","មានមហិច្ឆតា និងថាមពល","ទំនុកចិត្ត និងសប្បុរស","ជាចំណុចទាក់ទាញការយកចិត្តទុកដាក់","ពេលខ្លះអំនួត ឬអត់ធ្មត់មិនបាន"],
    love:["ចំណង់ខ្លាំង និងទាក់ទាញ","ចូលចិត្តកាយវិការធំៗ","រំពឹងភាពស្មោះត្រង់","ត្រូវការដៃគូដែលមានទំនុកចិត្ត","មិនចូលចិត្តត្រូវបានរឹតត្បិត"],
    career:["អ្នកដឹកនាំមានចក្ខុវិស័យ","គិតការធំៗ","ពូកែអាជីវកម្ម និងវិស័យច្នៃប្រឌិត","ជំរុញទឹកចិត្តអ្នកដទៃ","ទទួលបន្ទុកគម្រោងថ្មីៗ"] },
  Snake: {
    personality:["ប្រាជ្ញា និងមានវិចារណញាណ","ស្ងប់ស្ងាត់ និងចូលចិត្តភាពឯកជន","ឆើតឆាយ និងឈ្លាសវៃសង្កេត","ប្តេជ្ញាចិត្តលើគោលដៅ","យឺតក្នុងការទុកចិត្ត"],
    love:["ស្មោះត្រង់ និងស្នេហាជ្រៅ","ចូលចិត្តទំនាក់ទំនងមានអត្ថន័យ","អាចច្រណែនខ្លាំង","ឲ្យតម្លៃបញ្ញា និងភាពជ្រៅជ្រះ","ត្រូវការទំនុកចិត្ត និងភាពស្មោះត្រង់"],
    career:["វិភាគ និងមានយុទ្ធសាស្ត្រ","ពូកែស្រាវជ្រាវ និងហិរញ្ញវត្ថុ","ធ្វើការតែម្នាក់ឯងបានល្អ","ពូកែរៀបចំផែនការ","ចូលចិត្តការងារគុណភាព"] },
  Horse: {
    personality:["សកម្ម និងសុទិដ្ឋិនិយម","ឯករាជ្យ និងមានទំនុកចិត្ត","ស្រលាញ់សេរីភាព និងដំណើរផ្សងព្រេង","មានមន្តស្នេហ៍ និងចូលចិត្តសង្គម","គិតលឿន និងសម្របខ្លួនបាន"],
    love:["ចំណង់ខ្លាំង និងរ៉ូមែនទិក","ចូលចិត្តភាពរំភើប និងសប្បាយ","ឲ្យតម្លៃភាពស្មោះត្រង់ និងសេរីភាព","មានអ្នកចូលចិត្តច្រើន","ត្រូវការដៃគូដែលគាំទ្រ"],
    career:["មានមហិច្ឆតា និងឧស្សាហ៍","ពូកែដឹកនាំ","ទំនាក់ទំនងល្អ","ពូកែក្នុងវិស័យច្នៃប្រឌិត","ចូលចិត្តភាពចម្រុះ និងបញ្ហាប្រឈមថ្មី"] },
  Goat: {
    personality:["ទន់ភ្លន់ និងច្នៃប្រឌិត","មានមេត្តា និងសប្បុរស","មានសិល្បៈ និងការស្រមើស្រមៃ","ស្រួលនិយាយ ប៉ុន្តែងាយប្រតិកម្ម","ចូលចិត្តសន្តិភាពជាងជម្លោះ"],
    love:["ទន់ភ្លន់ និងរ៉ូមែនទិក","លះបង់ដើម្បីគ្រួសារ","ត្រូវការសុវត្ថិភាពផ្លូវចិត្ត","អាចសម្រេចចិត្តមិនបាន","ឲ្យតម្លៃភាពសុខដុមក្នុងផ្ទះ"],
    career:["ច្នៃប្រឌិត និងមានវិចារណញាណ","ភ្លឺស្វាងក្នុងសិល្បៈ រចនា និងការថែទាំ","ធ្វើការល្អក្នុងក្រុមគាំទ្រគ្នា","មិនចូលចិត្តសម្ពាធតឹងរ៉ឹង","នាំភាពកក់ក្តៅមកកន្លែងធ្វើការ"] },
  Monkey: {
    personality:["ឆ្លាត និងចង់ដឹងចង់ឃើញ","រីករាយ និងប្រាជ្ញាវៃ","ពូកែដោះស្រាយបញ្ហាថ្មីៗ","រៀនបានលឿន","ពេលខ្លះមិនស្ងប់"],
    love:["សប្បាយរីករាយ និងចូលចិត្តជេរលេង","ចូលចិត្តសំណើច និងភាពចម្រុះ","ត្រូវការការជំរុញផ្នែកគំនិត","ពេលខ្លះខ្លាចការតាំងចិត្ត","ឲ្យតម្លៃដៃគូរីករាយ"],
    career:["ច្នៃប្រឌិត និងអាចធ្វើបានច្រើន","ពូកែលក់ និងទំនាក់ទំនង","រីកចម្រើនក្នុងបច្ចេកវិទ្យា និងប្រព័ន្ធផ្សព្វផ្សាយ","រៀនជំនាញថ្មីបានលឿន","ចូលចិត្តដោះស្រាយល្បែងផ្គុំ"] },
  Rooster: {
    personality:["ឧស្សាហ៍ និងចេះសង្កេត","ទំនុកចិត្ត និងមានរបៀបរៀបរយ","ស្មោះត្រង់ និងត្រង់ៗ","មានមោទនភាពលើរូបរាង","ចូលចិត្តភាពល្អឥតខ្ចោះ"],
    love:["ស្មោះត្រង់ និងលះបង់","បង្ហាញការយកចិត្តតាមរយៈការខិតខំ","និយាយត្រង់ពីអារម្មណ៍","អាចរិះគន់ខ្លាំង","ត្រូវការការដឹងគុណ"],
    career:["យកចិត្តទុកដាក់លើព័ត៌មានលម្អិត","ពូកែគ្រប់គ្រង និងសេវាកម្ម","ពូកែរៀបចំផែនការ","ល្អក្នុងហិរញ្ញវត្ថុ និងប្រព័ន្ធផ្សព្វផ្សាយ","មានមោទនភាពលើគុណភាព"] },
  Dog: {
    personality:["ស្មោះត្រង់ និងស្មោះសរ","យុត្តិធម៌ និងទទួលខុសត្រូវ","ការពារមិត្តភក្តិ","ប្រុងប្រយ័ត្ន និងគិតគូរ","អាចបារម្ភច្រើនពេក"],
    love:["ស្មោះត្រង់ និងស្មោះស្ម័គ្រ","ឲ្យតម្លៃទំនុកចិត្តលើសអ្វីទាំងអស់","ការពារខ្លាំង","យឺត ប៉ុន្តែស្ថិតស្ថេរក្នុងស្នេហា","ត្រូវការភាពស្មោះត្រង់ត្រឡប់មកវិញ"],
    career:["អាចទុកចិត្តបាន និងមានសីលធម៌","ពូកែសេវាកម្ម ច្បាប់ ការបង្រៀន","ជាសមាជិកក្រុមដ៏ល្អ","ទុកចិត្តបានក្រោមសម្ពាធ","ជំរុញដោយគោលបំណង"] },
  Pig: {
    personality:["សប្បុរស និងចិត្តកក់ក្តៅ","ស្រួលនិយាយ និងស្មោះសរ","ចូលចិត្តភាពស្រួល និងមិត្តភាព","អត់ធ្មត់ និងឧស្សាហ៍","អាចទុកចិត្តអ្នកដទៃពេក"],
    love:["ស្និទ្ធស្នាល និងចូលចិត្តផ្តល់","ចូលចិត្តពេលវេលាកក់ក្តៅជាមួយគ្នា","ស្មោះត្រង់ និងអត់ឱន","គេចវៀងជម្លោះ","ត្រូវការដៃគូដែលស្មោះត្រង់"],
    career:["ខិតខំ និងលះបង់","ពូកែជាមួយមនុស្ស និងបដិសណ្ឋារកិច្ច","គាំទ្រក្រុមដោយចិត្តសប្បុរស","ល្អក្នុងអាហារ ការថែទាំ និងការងារច្នៃប្រឌិត","ចូលចិត្តកន្លែងធ្វើការរីករាយ"] }
};
const CHECKER_KM_WORDS = {
  East:"ខាងកើត", West:"ខាងលិច", North:"ខាងជើង", South:"ខាងត្បូង",
  Northeast:"ឦសាន", Southeast:"អាគ្នេយ៍", Southwest:"និរតី", Northwest:"ពាយ័ព្យ",
  January:"មករា", February:"កុម្ភៈ", March:"មីនា", April:"មេសា", May:"ឧសភា", June:"មិថុនា",
  July:"កក្កដា", August:"សីហា", September:"កញ្ញា", October:"តុលា", November:"វិច្ឆិកា", December:"ធ្នូ"
};
function checkerKmWords(str) {
  return str.split(", ").map(function (w) { return CHECKER_KM_WORDS[w] || w; }).join(", ");
}

// "This year" outlook shown under the animal description. Framed as traditional
// guidance for entertainment only. Tier comes from the relationship between the
// visitor's animal and the animal of the CURRENT zodiac year (computed from today's
// date, so it updates itself every Lunar New Year).
const CHECKER_OUTLOOK = {
  en: {
    triangle: ["This year looks favorable for you — a good time to plan a new car, a home move, or a bold step forward.", "Traditionally, luck supports big plans, so choose carefully and act with confidence."],
    same: ["Your own sign's year is traditionally a time to take extra care with big commitments.", "Keep plans steady, avoid rushing purchases like a car or a house, and look after your health and savings."],
    clash: ["This year is traditionally a more challenging one for your sign, so be careful with big purchases.", "Hold off on a new car or house if you can, save more, and avoid risky moves."],
    neutral: ["This year is traditionally an ordinary one for you — no big luck, but no big obstacles either.", "Results will depend mostly on your own effort and money habits, so small purchases and gradual improvements fit best; think carefully before any big decision."]
  },
  km: {
    triangle: ["ឆ្នាំនេះមើលទៅអំណោយផលសម្រាប់អ្នក — ជាពេលល្អក្នុងការគ្រោងទិញឡាន ផ្ទះថ្មី ឬចាប់ផ្តើមជំហានធំៗ។", "តាមប្រពៃណី សំណាងគាំទ្រផែនការធំៗ ដូច្នេះសូមជ្រើសរើសដោយប្រុងប្រយ័ត្ន ហើយធ្វើដោយទំនុកចិត្ត។"],
    same: ["ឆ្នាំរាសីរបស់អ្នកផ្ទាល់ តាមប្រពៃណីគឺជាពេលដែលគួរប្រុងប្រយ័ត្នបន្ថែមចំពោះការសម្រេចចិត្តធំៗ។", "រក្សាផែនការឱ្យមានស្ថិរភាព ជៀសវាងការប្រញាប់ទិញឡាន ឬផ្ទះ ហើយថែរក្សាសុខភាព និងប្រាក់សន្សំ។"],
    clash: ["ឆ្នាំនេះតាមប្រពៃណីមានបញ្ហាប្រឈមជាងសម្រាប់រាសីរបស់អ្នក — គួរប្រុងប្រយ័ត្នចំពោះការទិញធំៗ។", "ប្រសិនបើអាច សូមពន្យារពេលទិញឡាន ឬផ្ទះថ្មី សន្សំឱ្យបានច្រើនជាង ហើយជៀសវាងជំហានប្រថុយប្រថាន។"],
    neutral: ["ឆ្នាំនេះតាមប្រពៃណីជាឆ្នាំធម្មតាសម្រាប់អ្នក — គ្មានសំណាងធំ ហើយក៏គ្មានឧបសគ្គធំដែរ។", "លទ្ធផលភាគច្រើនអាស្រ័យលើការខិតខំ និងការគ្រប់គ្រងលុយរបស់អ្នកផ្ទាល់ ដូច្នេះការទិញតូចតាច និងការកែលម្អជីវភាពបន្តិចម្តងៗសមស្របជាង ហើយគួរពិចារណាឱ្យបានល្អមុនសម្រេចចិត្តធំៗ។"]
  }
};

// "This year's luck" box (replaces the day-by-day luck box). Same four tiers as
// CHECKER_OUTLOOK: triangle (favorable), neutral (steady), same (own sign's year), clash (careful).
const CHECKER_YEARLUCK = {
  en: {
    heading: "This Year's Luck for You",
    intro: "Reading {year} (year of the {ya}) against your {a} sign:",
    verdict: { triangle: "good", neutral: "ordinary", same: "caution", clash: "caution" },
    tiers: {
      triangle: { items: ["Money: good chances to grow your savings or make a planned purchase.", "Work: new opportunities and supportive people; a good year to take the lead.", "Health and relationships: steady energy and warm support from those close to you."], summary: "Overall: a favorable year — move forward with confidence, but stay sensible." },
      neutral: { items: ["Money: income and spending stay ordinary. Save gradually, keep an emergency fund, and buy what you need rather than counting on a windfall or a lucky break.", "Work: slow, steady progress that follows your effort. Don't expect a sudden promotion or big change — consistent work and learning one useful skill will pay off over time.", "Health and relationships: sleep, food and time with family matter more than luck. Keep regular habits, check in with the people close to you, and don't put off check-ups."], summary: "Overall: an ordinary, steady year — results depend more on your effort and planning than on luck, so small, consistent steps work best." },
      same: { items: ["Money: avoid impulse spending and big risks; keep a reserve.", "Work: steady progress beats big changes; double-check your commitments.", "Health and relationships: rest well, watch your health, and be patient with loved ones."], summary: "Overall: a year for caution and consolidation — slow and steady wins." },
      clash: { items: ["Money: delay big purchases like a car or a house and save more.", "Work: expect some friction; stay flexible and avoid risky moves.", "Health and relationships: look after your health and stay calm in disagreements."], summary: "Overall: a more challenging year — patience and care will carry you through." }
    }
  },
  km: {
    heading: "សំណាងឆ្នាំនេះសម្រាប់អ្នក",
    intro: "ប្រៀបធៀបឆ្នាំ {year} (ឆ្នាំ{ya}) ជាមួយរាសី{a}របស់អ្នក៖",
    verdict: { triangle: "good", neutral: "ordinary", same: "caution", clash: "caution" },
    tiers: {
      triangle: { items: ["លុយកាក់៖ មានឱកាសល្អក្នុងការបង្កើនប្រាក់សន្សំ ឬទិញរបស់ដែលបានគ្រោងទុក។", "ការងារ៖ មានឱកាសថ្មីៗ និងមនុស្សគាំទ្រ ជាឆ្នាំល្អក្នុងការដឹកនាំ។", "សុខភាព និងទំនាក់ទំនង៖ មានថាមពលស្ថិរភាព និងការគាំទ្រកក់ក្តៅពីមនុស្សជិតស្និទ្ធ។"], summary: "សរុប៖ ជាឆ្នាំអំណោយផល — ឆ្ពោះទៅមុខដោយទំនុកចិត្ត ប៉ុន្តែនៅតែត្រូវសមហេតុផល។" },
      neutral: { items: ["លុយកាក់៖ ចំណូលចំណាយនៅធម្មតា — សន្សំបន្តិចម្តងៗ រក្សាទុកប្រាក់បម្រុងសម្រាប់ពេលចាំបាច់ ហើយទិញតែរបស់ដែលត្រូវការ ជាជាងរំពឹងលើសំណាងធំ។", "ការងារ៖ រីកចម្រើនយឺតៗតាមការខិតខំរបស់អ្នក — កុំរំពឹងការដំឡើងតំណែង ឬការផ្លាស់ប្តូរធំភ្លាមៗ ការខិតខំជាប្រចាំ និងការរៀនជំនាញមានប្រយោជន៍មួយនឹងផ្តល់ផលល្អតាមពេលវេលា។", "សុខភាព និងទំនាក់ទំនង៖ ការគេង ការញ៉ាំ និងពេលជាមួយគ្រួសារសំខាន់ជាងសំណាង — រក្សាទម្លាប់ជាប្រចាំ សួរសុខទុក្ខមនុស្សជិតខាង ហើយកុំពន្យារការពិនិត្យសុខភាព។"], summary: "សរុប៖ ជាឆ្នាំធម្មតា និងមានស្ថិរភាព — លទ្ធផលអាស្រ័យលើការខិតខំ និងផែនការរបស់អ្នកជាងសំណាង ដូច្នេះជំហានតូចៗជាប់លាប់ល្អបំផុត។" },
      same: { items: ["លុយកាក់៖ ជៀសវាងការចាយដោយមិនបានគិត និងហានិភ័យធំៗ ហើយរក្សាទុកប្រាក់បម្រុង។", "ការងារ៖ ដំណើរការបន្តិចម្តងៗល្អជាងការផ្លាស់ប្តូរធំៗ ត្រូវពិនិត្យកិច្ចសន្យាម្តងទៀត។", "សុខភាព និងទំនាក់ទំនង៖ សម្រាកឱ្យបានល្អ ថែសុខភាព ហើយអត់ធ្មត់ចំពោះមនុស្សជាទីស្រឡាញ់។"], summary: "សរុប៖ ជាឆ្នាំសម្រាប់ការប្រុងប្រយ័ត្ន និងការបង្រួបបង្រួម — យឺតៗតែជាប់លាប់ទើបឈ្នះ។" },
      clash: { items: ["លុយកាក់៖ ពន្យារពេលការទិញធំៗ ដូចជាឡាន ឬផ្ទះ ហើយសន្សំឱ្យបានច្រើន។", "ការងារ៖ រំពឹងថាមានការតានតឹងខ្លះ ត្រូវបត់បែន ហើយជៀសវាងជំហានប្រថុយប្រថាន។", "សុខភាព និងទំនាក់ទំនង៖ ថែរក្សាសុខភាព ហើយរក្សាភាពស្ងប់ស្ងាត់នៅពេលមិនចុះសម្រុងគ្នា។"], summary: "សរុប៖ ជាឆ្នាំដែលមានបញ្ហាប្រឈមជាង — ការអត់ធ្មត់ និងការប្រុងប្រយ័ត្ននឹងនាំអ្នកឆ្លងកាត់។" }
    }
  }
};

// CHECKER_TRAITS_MORE: one extra descriptive sentence per animal shown under the main traits.
const CHECKER_TRAITS_MORE = {
  en: {
    "Rat": "Rats read people well, spot opportunities early and find a way out of tight spots — just remember to rest and not overthink.",
    "Ox": "Oxen are dependable and keep their word, and they finish what they start even when it takes a long time.",
    "Tiger": "Tigers have strong drive, love to lead and protect the people they care about, but decide best when calm rather than in the heat of the moment.",
    "Rabbit": "Rabbits prefer calm, peaceful surroundings, listen well and build relationships that last.",
    "Dragon": "Dragons are confident and inspire others, but listening to the people around them helps big plans succeed in the long run.",
    "Snake": "Snakes have strong intuition, like to study things in depth before deciding, and keep a secret well.",
    "Horse": "Horses love to travel, meet new people and learn new things, but clear goals stop their energy from scattering.",
    "Goat": "Goats are gentle, creative and caring, and do their best work in a calm, supportive setting.",
    "Monkey": "Monkeys are quick-witted, solve problems in fresh ways and adapt easily, but do best when they focus on one thing at a time.",
    "Rooster": "Roosters like order, work with care and speak plainly, but should allow others to be imperfect too.",
    "Dog": "Dogs are loyal, protect their friends and family and have a strong sense of fairness, but should worry less and trust themselves more.",
    "Pig": "Pigs are generous, love to share and enjoy life, but should be careful not to trust too quickly or overspend."
},
  km: {
    "Rat": "ជូតចេះទាក់ទងមនុស្សបានល្អ ឃើញឱកាសមុនគេ ហើយចេះរកផ្លូវចេញពីបញ្ហា ប៉ុន្តែគួរសម្រាកឱ្យគ្រប់គ្រាន់ កុំគិតច្រើនពេក។",
    "Ox": "ឆ្លូវជាមនុស្សដែលទុកចិត្តបាន រក្សាពាក្យសន្យា ហើយតែងតែបញ្ចប់អ្វីដែលបានចាប់ផ្តើម ទោះត្រូវការពេលយូរក៏ដោយ។",
    "Tiger": "ខាលមានសន្ទុះខ្លាំង ចូលចិត្តបើកផ្លូវ និងការពារអ្នកដែលខ្លួនស្រឡាញ់ ប៉ុន្តែសម្រេចចិត្តបានល្អជាងនៅពេលចិត្តស្ងប់ មិនមែនដោយអារម្មណ៍ភ្លាមៗ។",
    "Rabbit": "ថោះចូលចិត្តភាពស្ងប់ស្ងាត់ និងបរិយាកាសសុខសាន្ត ជាអ្នកស្តាប់ល្អ ហើយចេះបង្កើតទំនាក់ទំនងដែលមានតម្លៃយូរអង្វែង។",
    "Dragon": "រោងមានទំនុកចិត្តខ្លាំង ហើយតែងបំផុសគំនិតអ្នកដទៃ ប៉ុន្តែការស្តាប់មតិអ្នកជុំវិញ ជួយឱ្យផែនការធំៗទទួលបានជោគជ័យយូរអង្វែង។",
    "Snake": "ម្សាញ់មានវិចារណញាណល្អ ចូលចិត្តសិក្សាឱ្យស៊ីជម្រៅមុនធ្វើការសម្រេចចិត្ត ហើយចេះរក្សាការសម្ងាត់។",
    "Horse": "មមីចូលចិត្តធ្វើដំណើរ ជួបមនុស្សថ្មី និងរៀនអ្វីថ្មីៗ ប៉ុន្តែការកំណត់គោលដៅឱ្យច្បាស់ ជួយកុំឱ្យថាមពលខ្ចាត់ខ្ចាយ។",
    "Goat": "មមែមានចិត្តទន់ភ្លន់ ច្នៃប្រឌិត និងយកចិត្តទុកដាក់ចំពោះអ្នកដទៃ ហើយធ្វើការបានល្អបំផុតក្នុងបរិយាកាសស្ងប់ស្ងាត់ និងជួយគាំទ្រគ្នា។",
    "Monkey": "វកឆ្លាតរហ័ស ចេះដោះស្រាយបញ្ហាតាមវិធីថ្មី និងសម្របខ្លួនបានឆាប់ ប៉ុន្តែធ្វើបានល្អជាងនៅពេលផ្តោតលើរឿងមួយៗ។",
    "Rooster": "រកាចូលចិត្តភាពមានរបៀបរៀបរយ ធ្វើការដោយយកចិត្តទុកដាក់ និងនិយាយត្រង់ៗ ប៉ុន្តែគួរទទួលយកភាពមិនល្អឥតខ្ចោះរបស់អ្នកដទៃផងដែរ។",
    "Dog": "ចស្មោះត្រង់ ការពារមិត្តភក្តិ និងគ្រួសារ ហើយមានយុត្តិធម៌ ប៉ុន្តែគួរបារម្ភតិចជាងនេះ ហើយទុកចិត្តខ្លួនឯងឱ្យបានច្រើនជាងនេះ។",
    "Pig": "កុរមានចិត្តទូលាយ ចូលចិត្តចែករំលែក និងរីករាយជាមួយជីវិត ប៉ុន្តែគួរប្រុងប្រយ័ត្នកុំជឿអ្នកដទៃលឿនពេក ឬចំណាយហួសប្រមាណ។"
}
};

// ---------------------------------------------------------------------------
// Simplified Chinese (zh): per-animal lists, direction / month words, this-year outlook and luck, extra trait line
// ---------------------------------------------------------------------------
const CHECKER_EXTRA_ZH = {
  Rat: {
    personality: ["机智、足智多谋", "迷人、善于交际", "善于发现机会", "压力下也能灵活应变", "对安全感和金钱很谨慎"],
    love: ["一旦建立信任就很忠诚", "喜欢热闹的聊天", "保护所爱的人", "一开始可能比较防备", "需要诚实和安全感"],
    career: ["有策略、头脑敏锐", "擅长研究和贸易", "善于发现趋势", "适合商业和写作", "喜欢灵活、动脑的工作"]
  },
  Ox: {
    personality: ["可靠、诚实", "耐心、意志坚定", "务实、踏实", "责任感强", "不轻易改变，也很难被说动"],
    love: ["稳定、专一", "用行动表达爱", "重视稳定和传统", "慢热", "需要有耐心的伴侣"],
    career: ["勤奋、自律", "擅长长期项目", "可靠的团队成员", "适合农业、金融、建筑", "一步一步建立成功"]
  },
  Tiger: {
    personality: ["勇敢、自信", "热情、好胜", "天生敢于冒险", "有领袖魅力", "可能比较冲动"],
    love: ["热烈、浪漫", "喜欢一起冒险", "非常忠诚", "需要自由和尊重", "不喜欢被控制"],
    career: ["天生的领导者和激励者", "喜欢挑战", "做决定大胆果断", "适合体育、法律、创业", "需要独立行动的空间"]
  },
  Rabbit: {
    personality: ["温和、体贴", "圆融、善良", "有艺术气质、优雅", "天性谨慎", "追求和谐"],
    love: ["关心体贴、温柔", "营造温暖的家", "回避冲突", "对批评很敏感", "需要平静和安全感"],
    career: ["善于协调谈判", "擅长设计和艺术", "注重细节、细心", "善于团队合作", "在平和的环境中表现最好"]
  },
  Dragon: {
    personality: ["大胆、有魅力", "有抱负、精力充沛", "自信、大方", "天生的焦点人物", "可能骄傲或急躁"],
    love: ["热情、有吸引力", "喜欢浪漫的大举动", "期待对方忠诚", "需要有自信的伴侣", "不喜欢被束缚"],
    career: ["有远见的领导者", "格局大", "擅长商业和创意领域", "能激励别人", "敢于开创新事业"]
  },
  Snake: {
    personality: ["睿智、直觉敏锐", "冷静、非常注重隐私", "优雅、善于观察", "追求目标时很坚定", "不轻易信任别人"],
    love: ["深情而忠诚", "喜欢有意义的连结", "可能有占有欲", "重视智慧和深度", "需要信任和诚实"],
    career: ["善于分析、有谋略", "擅长研究和金融", "适合独立工作", "擅长规划", "喜欢深思熟虑、高质量的工作"]
  },
  Horse: {
    personality: ["精力充沛、乐观", "独立、自信", "热爱自由和冒险", "有魅力、外向", "思维敏捷、适应力强"],
    love: ["热情、浪漫", "喜欢刺激和欢乐", "重视诚实和自由", "很有异性缘", "需要支持自己的伴侣"],
    career: ["有抱负、勤奋", "领导能力强", "善于沟通", "擅长创意行业", "喜欢变化和新挑战"]
  },
  Goat: {
    personality: ["温柔、有创意", "富有同情心、善良", "有艺术感和想象力", "随和但敏感", "宁愿和平也不愿冲突"],
    love: ["温柔、浪漫", "全心照顾家庭", "需要情感上的安全感", "可能优柔寡断", "重视家庭和睦"],
    career: ["有创意、直觉好", "在艺术、设计、照护工作中表现出色", "在互相支持的团队中做得最好", "不喜欢死板的压力", "为工作环境带来温暖"]
  },
  Monkey: {
    personality: ["聪明、好奇", "爱玩、风趣", "善于发明创造、解决问题", "学东西快", "可能坐不住"],
    love: ["有趣、会调情", "喜欢欢笑和新鲜感", "需要思想上的交流", "可能害怕承诺", "喜欢会玩的伴侣"],
    career: ["有创新力、多才多艺", "擅长销售和沟通", "适合科技和媒体", "学新技能很快", "喜欢解决难题"]
  },
  Rooster: {
    personality: ["勤奋、观察力强", "自信、有条理", "诚实、直接", "注重形象", "有完美主义倾向"],
    love: ["忠诚、专一", "用付出表达关心", "直接表达感情", "可能比较挑剔", "需要被欣赏"],
    career: ["注重细节、勤勉", "擅长管理和服务", "规划能力强", "适合金融和媒体", "对品质很自豪"]
  },
  Dog: {
    personality: ["忠诚、诚实", "公正、有责任感", "保护朋友", "谨慎、体贴", "可能想太多、爱担心"],
    love: ["忠实、真诚", "把信任放在第一位", "非常有保护欲", "感情慢热但稳定", "需要对方同样忠诚"],
    career: ["值得信赖、有职业道德", "擅长服务、法律、教育", "很好的团队成员", "压力下依然可靠", "受使命感驱动"]
  },
  Pig: {
    personality: ["慷慨、热心", "随和、真诚", "喜欢舒适和好朋友", "耐心、勤奋", "可能过于轻信"],
    love: ["深情、乐于付出", "喜欢温馨的相处时光", "忠诚、包容", "回避冲突", "需要真诚的伴侣"],
    career: ["敬业、勤奋", "善于与人相处，适合服务业", "大方支持团队", "适合餐饮、照护和创意工作", "喜欢愉快的工作环境"]
  }
};
const CHECKER_ZH_WORDS = {
  East: "东", West: "西", North: "北", South: "南",
  Northeast: "东北", Southeast: "东南", Southwest: "西南", Northwest: "西北",
  January: "一月", February: "二月", March: "三月", April: "四月", May: "五月", June: "六月",
  July: "七月", August: "八月", September: "九月", October: "十月", November: "十一月", December: "十二月"
};
function checkerZhWords(str) {
  return str.split(", ").map(function (w) { return CHECKER_ZH_WORDS[w] || w; }).join("、");
}
CHECKER_OUTLOOK.zh = {
  triangle: ["今年对你来说运势不错——是计划买车、搬新家或迈出一大步的好时机。", "传统上，好运会支持大的计划，所以请谨慎选择，再充满信心地行动。"],
  same: ["传统上，本命年是需要对重大承诺格外小心的一年。", "让计划保持稳定，不要急着买车或买房，并照顾好健康和储蓄。"],
  clash: ["传统上，今年对你的生肖来说挑战较多，大笔支出要谨慎。", "如果可以，暂缓买车或买房，多存一些钱，避免冒险的举动。"],
  neutral: ["传统上，今年对你来说是平常的一年——没有大的好运，也没有大的阻碍。", "结果主要取决于你自己的努力和理财习惯，所以小额消费和逐步改善最合适；做任何重大决定之前都要仔细考虑。"]
};
CHECKER_YEARLUCK.zh = {
  heading: "你今年的运势",
  intro: "用你的属{a}来看 {year} 年（{ya}年）：",
  verdict: { triangle: "good", neutral: "ordinary", same: "caution", clash: "caution" },
  tiers: {
    triangle: { items: ["财运：很有机会增加储蓄，或完成计划中的购买。", "事业：有新机会和支持你的人；是适合带头的一年。", "健康与感情：精力稳定，身边的人给予温暖的支持。"], summary: "总体：顺利的一年——充满信心地前进，但要保持理智。" },
    neutral: { items: ["财运：收入和支出都比较平常。慢慢储蓄，留一笔应急资金，买需要的东西，而不是指望意外之财或好运。", "事业：随着努力稳步、缓慢地进步。不要期待突然升职或大变化——坚持工作并学会一项有用的技能，时间久了就会有回报。", "健康与感情：睡眠、饮食和陪伴家人比运气更重要。保持规律的作息，多关心身边的人，也不要拖延体检。"], summary: "总体：平常而稳定的一年——结果更多取决于你的努力和规划而不是运气，所以小而持续的步骤最有效。" },
    same: { items: ["财运：避免冲动消费和大的风险；留一些储备。", "事业：稳步前进胜过大的变动；再三确认你的承诺。", "健康与感情：好好休息，注意健康，对所爱的人多一些耐心。"], summary: "总体：需要谨慎和巩固的一年——慢慢来，稳稳赢。" },
    clash: { items: ["财运：暂缓买车或买房这类大额支出，多存钱。", "事业：可能会有一些摩擦；保持灵活，避免冒险的举动。", "健康与感情：照顾好身体，有分歧时保持冷静。"], summary: "总体：挑战较多的一年——耐心和谨慎会帮你顺利度过。" }
  }
};
CHECKER_TRAITS_MORE.zh = {
  Rat: "属鼠的人很会看人，能及早发现机会，也总能在困境中找到出路——只是记得要休息，不要想太多。",
  Ox: "属牛的人可靠、守信，即使需要很长时间，也会把开始的事情做完。",
  Tiger: "属虎的人干劲十足，喜欢带头并保护在乎的人，但在冷静时做决定比在冲动时更好。",
  Rabbit: "属兔的人喜欢平静、和平的环境，善于倾听，能建立长久的关系。",
  Dragon: "属龙的人自信、能激励别人，但多听身边人的意见，能让大计划走得更长远。",
  Snake: "属蛇的人直觉很强，喜欢深入研究后再做决定，也很能保守秘密。",
  Horse: "属马的人喜欢旅行、认识新朋友、学习新事物，但有清楚的目标才不会让精力分散。",
  Goat: "属羊的人温柔、有创意、懂得关心人，在平静、互相支持的环境中表现最好。",
  Monkey: "属猴的人反应快，能用新方法解决问题，适应力强，但一次专注一件事时做得最好。",
  Rooster: "属鸡的人喜欢有条理，做事细心，说话直接，但也应该允许别人不完美。",
  Dog: "属狗的人忠诚，保护朋友和家人，很有正义感，但应该少担心一些，多相信自己。",
  Pig: "属猪的人慷慨、乐于分享、享受生活，但要小心不要太快相信别人或花费过度。"
};
