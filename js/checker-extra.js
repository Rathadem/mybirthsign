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
