// compat-text.js — English + Khmer copy for the redesigned compatibility page.
// Placeholders: {A} {B} = the two zodiac animals, {EA} {EB} = their elements.
// Everything is framed as traditional / cultural / entertainment guidance.
// NOTE: the Khmer text should be reviewed by a native speaker.
const CMP_TEXT = {
en: {
  title: "Zodiac Compatibility Calculator",
  sub: "Compare two birth dates to discover your Chinese zodiac compatibility in love, friendship, business, and more.",
  desc: "Enter two dates of birth to explore traditional Chinese zodiac compatibility, including personality dynamics, communication, trust, and overall harmony.",
  p1: "Person 1", p2: "Person 2", dob: "Date of Birth",
  submit: "Check Compatibility →",
  hint: "Only two birth dates are needed. No names or birth time required.",
  err_required: "Please enter both dates of birth.",
  err_future: "Birth dates can't be in the future — please check the dates entered.",
  err_invalid: "One of the dates isn't valid — please re-check it.",
  result_h: "Your Compatibility Result",
  year: "Zodiac year", element: "Element", yy: "Polarity",
  yang: "Yang", yin: "Yin",
  score_note: "A traditional, entertainment-style interpretation — not a scientific measurement.",
  levels: ["Highly Compatible", "Very Compatible", "Moderately Compatible", "Growth-Oriented Match", "Challenging but Workable"],
  cats: { love: "Love Compatibility", communication: "Communication", trust: "Trust", business: "Business Potential", friendship: "Friendship", overall: "Overall Compatibility" },
  catText: {
    love:          ["Warm, natural chemistry with strong emotional pull.", "Affection grows steadily when you make time for each other.", "Passion and patience are both needed to keep the spark steady."],
    communication: ["You tend to understand each other with little effort.", "Good conversations happen when you slow down and listen.", "Different styles — say things plainly and check you were understood."],
    trust:         ["A solid base of loyalty and mutual reliance.", "Trust builds through consistency and kept promises.", "Trust takes time here; honesty early on makes it easier."],
    business:      ["Complementary strengths make a capable working team.", "Workable together with clear roles and shared goals.", "Different risk styles — agree on rules before big decisions."],
    friendship:    ["Easy, loyal and enjoyable company for one another.", "A friendly bond that deepens with shared experiences.", "Different rhythms; respect for space keeps the bond healthy."],
    overall:       ["A harmonious pairing by the traditional reading.", "A balanced pairing with good potential.", "A pairing that rewards effort and understanding."]
  },
  topLine: "Strongest area: {T}. Area needing the most care: {W}.", reset: "Check Another Pair",
  strengthsH: "Strengths of This Match", challengesH: "Potential Challenges",
  strengths: {
    same: ["You instinctively understand each other's habits and moods.", "Shared values and a similar pace make daily life feel familiar.", "Each of you sees your own best qualities reflected in the other.", "Easy loyalty — you tend to defend and support one another.", "A strong sense of belonging and shared identity."],
    triangle: ["Good communication and natural understanding.", "Complementary personalities and working styles.", "Strong mutual support — you lift each other up.", "An ability to inspire and motivate one another.", "A balanced mix of creativity and practicality."],
    neutral: ["Neither sign pulls against the other, leaving space to be yourselves.", "Differences can be refreshing and bring new perspectives.", "Success depends on your choices more than on the signs — a flexible start.", "You can learn a lot from each other's different strengths.", "Room to build your own style of partnership."],
    clash: ["Strong attraction through contrast — you notice what the other lacks.", "Each of you sees problems from an angle the other would miss.", "Growth: you stretch each other beyond your comfort zones.", "Passion and energy run high when you channel them well.", "Willingness to work through differences builds a resilient bond."]
  },
  strengthYY: "Different polarities (Yin and Yang) add natural balance to your dynamic.",
  strengthEl: { generates: "Your elements nourish one another, which traditionally supports growth.", same: "Sharing an element gives you a similar rhythm and outlook.", neutral: "Your elements sit comfortably side by side without pressure." },
  challenges: {
    same: ["Two similar temperaments can compete or repeat the same blind spots.", "Familiarity may turn into routine if you stop making an effort.", "Both may be strong-willed when stressed.", "Need for patience and active listening.", "Balancing independence with togetherness."],
    triangle: ["Comfort can lead to taking each other for granted.", "Different approaches to decision-making may appear.", "Possible disagreements about financial matters.", "Need for patience and active listening.", "Balancing independence with togetherness."],
    neutral: ["Without a natural pull, the bond needs deliberate effort.", "Different priorities can show up under stress.", "Expectations may go unspoken — say them out loud.", "Different approaches to decision-making.", "Need for patience and active listening."],
    clash: ["Differences in temperament may cause friction when under pressure.", "You may read the same situation very differently.", "Strong opinions on both sides — compromise takes practice.", "Need for patience, respect and active listening.", "Different approaches to money, risk and decisions."]
  },
  challengeYY: "Sharing the same polarity can make you both push in one direction — invite the other view.",
  challengeEl: "Your elements traditionally restrain one another, so balance and flexibility matter.",
  intro: {
    same: "{A} with {B} is a pairing of the same sign: deep familiarity, shared instincts and a strong sense of understanding.",
    triangle: "{A} and {B} belong to the same traditional compatibility triangle, one of the most harmonious groupings in the zodiac.",
    neutral: "{A} and {B} sit in a neutral pairing — neither a classic match nor a clash, so the outcome depends largely on how you two relate.",
    clash: "{A} and {B} sit opposite each other on the zodiac wheel, a traditional clash that brings strong contrast and a lot to learn from each other."
  },
  tierLine: {
    high: "You have strong chemistry and complementary strengths, with good potential for communication and cooperation.",
    medium: "There is real potential here, and it grows when both of you communicate openly and stay patient.",
    low: "This pairing asks for extra understanding, but many people find that effort makes the bond stronger."
  },
  elementsH: "Element Compatibility",
  elRel: {
    harmonious: "Harmonious", supportive: "Supportive", neutral: "Neutral", challenging: "Challenging"
  },
  elText: {
    generates: "In the traditional Five Elements cycle, {EA} and {EB} nourish one another. This is regarded as a harmonious relationship — energy flows from one to the other and supports growth.",
    same: "You share the same element ({EA}). Traditionally this is supportive: similar instincts and a shared rhythm, though you may need to add balance where you have the same blind spots.",
    neutral: "{EA} and {EB} have no strong traditional pull toward or against each other. The pairing is considered neutral — it takes its character from the two of you.",
    controls: "In the Five Elements cycle, {EA} and {EB} traditionally restrain one another. This is seen as a challenging combination, which can turn into healthy balance when both people stay flexible."
  },
  fiveH: "The Five Elements",
  five: { Wood: "Growth, creativity, generosity", Fire: "Passion, energy, enthusiasm", Earth: "Stability, patience, practicality", Metal: "Discipline, clarity, determination", Water: "Adaptability, intuition, communication" },
  guideH: "Guidelines for a Successful Relationship",
  guide: ["Communicate openly and honestly.", "Respect each other's strengths and differences.", "Set clear goals and expectations.", "Be flexible and willing to compromise.", "Support each other's personal growth.", "Work as a team.", "Give each other appropriate independence."],
  loveH: "Love & Relationship Compatibility",
  love: {
    high: "{A} and {B} show a warm and promising romantic picture. Traditional readings describe an easy emotional connection, natural romance and good long-term potential, as long as the two of you keep making time for one another.",
    medium: "{A} and {B} have a balanced romantic picture. Traditional readings suggest the connection grows through open conversation, shared plans and small, steady gestures.",
    low: "{A} and {B} may feel the pull of contrast in love. Traditional readings suggest a relationship that needs patience, honest talk and respect for differences, and that can become deeply rewarding."
  },
  loveFocus: [["Emotional connection", "Share feelings regularly, not only in difficult moments."], ["Romance", "Small, thoughtful gestures matter more than grand ones."], ["Communication", "Say what you need and check you were understood."], ["Trust", "Keep promises and be honest early."], ["Independence", "Each person's own interests keep the relationship fresh."], ["Long-term potential", "Talk about shared goals and revisit them as life changes."]],
  friendH: "Friendship Compatibility",
  friend: {
    high: "As friends, {A} and {B} are likely to enjoy easy company, loyalty and plenty of shared laughter. Traditional readings see this as a friendship that can last.",
    medium: "As friends, {A} and {B} can build a steady and enjoyable bond, deepening through shared interests and time together.",
    low: "As friends, {A} and {B} may have different rhythms. Traditional readings suggest the friendship works best with space, honesty and a sense of humor about differences."
  },
  friendFocus: [["Communication", "Keep in touch in your own way, even when life is busy."], ["Shared interests", "Find activities you both enjoy and try new ones together."], ["Trust", "Be reliable and keep confidences."], ["Loyalty", "Show up in the moments that matter."], ["Social energy", "Respect when one of you needs company and the other needs quiet."], ["Handling disagreements", "Talk early, stay kind, and let small things go."]],
  bizH: "Business Compatibility",
  biz: {
    high: "In business, {A} and {B} are traditionally seen as a capable team: complementary strengths, smooth cooperation and good potential to share leadership.",
    medium: "In business, {A} and {B} can work well with clearly divided roles, shared goals and regular check-ins.",
    low: "In business, {A} and {B} may approach risk and decisions differently. Clear agreements and defined roles can turn those differences into an advantage."
  },
  bizFocus: [["Leadership", "Decide who leads which area and respect that."], ["Teamwork", "Play to each person's strengths."], ["Communication", "Agree on how and when you update each other."], ["Decision-making", "Set a simple process for big decisions."], ["Risk tolerance", "Discuss limits before money is involved."], ["Work styles", "Respect different paces and ways of working."]],
  bizCta: "Explore Business Partner Compatibility →",
  exploreH: "Explore All 12 Chinese Zodiac Signs",
  guidesH: "Related Guides",
  guides: [["Chinese Zodiac Compatibility Guide", "blog/zodiac-compatibility-guide.html", "How traditional pairings are understood."], ["What Is My Chinese Zodiac Sign?", "checker.html", "Find your animal, element and traits."], ["Chinese Zodiac Animals", "animals.html", "Meet all twelve animals."], ["Chinese Zodiac Elements", "animals.html", "Wood, Fire, Earth, Metal and Water."], ["Chinese Zodiac Years", "animals.html", "Birth years for every animal."], ["Business Partner Compatibility", "business-partner.html", "Compare two people as business partners."]],
  quickH: "Prefer a quick Chinese zodiac-animal check?",
  quickIntro: "Want a simpler star-rating style match instead? Use the quick check below.",
  faqH: "Frequently Asked Questions",
  faq: [
    ["Can I compare two zodiac signs without birth dates?", "Yes. Use Compare Two Signs on this page to pick two zodiac animals and see their traditional match type, with notes on love, friendship, business, teamwork and money. For exact percentage scores, enter both birth dates, because the element and Yin or Yang of each birth year also count."],
    ["How is Chinese zodiac compatibility calculated?", "Traditional compatibility compares the zodiac animals of two people, then the elements and the Yin or Yang polarity of their zodiac years. Animals in the same triangle are considered naturally harmonious, direct opposites are considered a clash, and everything else is neutral. This calculator turns those traditional ideas into scores for entertainment and reflection."],
    ["Can two people with different zodiac signs be compatible?", "Yes. Most pairings are neither perfect nor doomed. A different sign can bring useful contrast, and how you communicate and treat each other matters far more than the animals."],
    ["Why does the Chinese Lunar New Year matter?", "The Chinese zodiac year begins on the Lunar New Year, not on 1 January. Someone born in January or early February may belong to the previous animal year, so this calculator checks each birth date against the actual Lunar New Year date."],
    ["What are the five Chinese zodiac elements?", "Wood, Fire, Earth, Metal and Water. Each zodiac year carries one element, and tradition describes how elements nourish, restrain or sit neutrally beside one another."],
    ["What does Yin and Yang mean?", "Yin and Yang are complementary polarities in Chinese philosophy. Zodiac years alternate between them, and two people with different polarities are traditionally said to balance each other."],
    ["Can Chinese zodiac compatibility predict a relationship?", "No. It is a cultural tradition that offers conversation starters, not a prediction. Real relationships depend on respect, effort, shared values and communication."],
    ["Can zodiac compatibility be used for business partners?", "Many people enjoy using it as a cultural framework for thinking about teamwork and working styles, but it should never replace due diligence, written agreements or professional advice."],
    ["Is Chinese zodiac compatibility scientifically proven?", "No. There is no scientific evidence that zodiac signs predict compatibility. We present it as cultural heritage and entertainment."]
  ],
  disclaimer: "Chinese zodiac compatibility is based on traditional cultural beliefs and is provided for entertainment, cultural exploration, and personal reflection. It is not scientifically proven and should not be used as a substitute for professional relationship, financial, or business advice.",
  seo: [
    ["How Chinese Zodiac Compatibility Works", ["The Chinese zodiac is a repeating cycle of twelve animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig. Traditional compatibility compares the animals of two people's birth years.", "The twelve animals form four friendly triangles — Rat, Dragon and Monkey; Ox, Snake and Rooster; Tiger, Horse and Dog; Rabbit, Goat and Pig. Signs in the same triangle are said to share outlook and energy, while signs directly opposite on the wheel are said to clash. Most other pairings are neutral."]],
    ["Chinese Zodiac Compatibility and the Five Elements", ["Each zodiac year also carries one of five elements: Wood, Fire, Earth, Metal or Water. Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal carries Water and Water nourishes Wood. Elements that feed each other are considered harmonious, while those that restrain each other are considered challenging.", "Wood suggests growth and creativity, Fire passion and energy, Earth stability and patience, Metal discipline and clarity, and Water adaptability and intuition."]],
    ["Chinese Zodiac Compatibility in Love", ["People often use zodiac compatibility as a gentle conversation starter in relationships, to talk about temperaments, communication styles and expectations. A traditionally harmonious pairing is not a promise, and a traditional clash is not a warning; the real foundation is how two people treat each other."]],
    ["Chinese Zodiac Compatibility in Business", ["Zodiac traditions can serve as a cultural framework for reflecting on teamwork and working styles — who prefers to lead, who prefers detail, and how each person feels about risk. Use it for thought and discussion only, and rely on clear agreements and professional advice for real business decisions."]],
    ["Why the Chinese Lunar New Year Matters", ["The Chinese zodiac year begins on the Lunar New Year, which falls between late January and mid-February. If you were born in January or early February, your animal may be the one from the previous year. That is why this calculator compares each date of birth with the actual Lunar New Year date for that year instead of simply using the Gregorian calendar year."]]
  ]
},
km: {
  title: "ពិនិត្យគូព្រងជោគជតារាសី",
  sub: "ប្រៀបធៀបថ្ងៃខែឆ្នាំកំណើតពីរ ដើម្បីដឹងពីភាពជាគូនៃជោគជតារាសីរបស់អ្នកទាំងពីរ ក្នុងស្នេហា មិត្តភាព អាជីវកម្ម និងផ្សេងទៀត។",
  desc: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតពីរ ដើម្បីស្វែងយល់ពីភាពជាគូតាមប្រពៃណីជោគជតារាសី រួមមានចរិតលក្ខណៈ ការប្រាស្រ័យទាក់ទង ទំនុកចិត្ត និងភាពសុខដុមរមនាទាំងមូល។",
  p1: "អ្នកទី 1", p2: "អ្នកទី 2", dob: "ថ្ងៃខែឆ្នាំកំណើត",
  submit: "ពិនិត្យភាពជាគូ →",
  hint: "ត្រូវការតែថ្ងៃខែឆ្នាំកំណើតពីរប៉ុណ្ណោះ។ មិនបាច់បញ្ចូលឈ្មោះ ឬម៉ោងកំណើតទេ។",
  err_required: "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទាំងពីរ។",
  err_future: "ថ្ងៃកំណើតមិនអាចនៅថ្ងៃអនាគតបានទេ — សូមពិនិត្យកាលបរិច្ឆេទម្តងទៀត។",
  err_invalid: "កាលបរិច្ឆេទមួយមិនត្រឹមត្រូវទេ — សូមពិនិត្យម្តងទៀត។",
  result_h: "លទ្ធផលភាពជាគូរបស់អ្នក",
  year: "ឆ្នាំរាសី", element: "ធាតុ", yy: "ភាព",
  yang: "យ៉ាង", yin: "យិន",
  score_note: "ការបកស្រាយតាមប្រពៃណីសម្រាប់កម្សាន្ត — មិនមែនការវាស់វែងតាមវិទ្យាសាស្ត្រទេ។",
  levels: ["ជាគូខ្លាំងណាស់", "ជាគូល្អណាស់", "ជាគូមធ្យម", "គូដែលត្រូវរីកចម្រើនរួមគ្នា", "មានបញ្ហាប្រឈម ប៉ុន្តែអាចទៅរួច"],
  cats: { love: "ភាពជាគូក្នុងស្នេហា", communication: "ការប្រាស្រ័យទាក់ទង", trust: "ទំនុកចិត្ត", business: "សក្តានុពលអាជីវកម្ម", friendship: "មិត្តភាព", overall: "ភាពជាគូទាំងមូល" },
  catText: {
    love:          ["មានភាពកក់ក្តៅ និងចំណងអារម្មណ៍ខ្លាំងដោយធម្មជាតិ។", "ក្ដីស្រឡាញ់កាន់តែរីកលូតលាស់ នៅពេលអ្នកទាំងពីរចំណាយពេលឱ្យគ្នា។", "ត្រូវការទាំងចំណង់ និងការអត់ធ្មត់ ដើម្បីរក្សាភាពកក់ក្តៅ។"],
    communication: ["អ្នកទាំងពីរយល់គ្នាបានដោយងាយ។", "ការសន្ទនាល្អកើតឡើង នៅពេលអ្នកថយចុះ ហើយស្តាប់ឱ្យបានល្អ។", "របៀបនិយាយខុសគ្នា — និយាយឱ្យច្បាស់ ហើយសួរថាបានយល់ត្រូវឬអត់។"],
    trust:         ["មានមូលដ្ឋានរឹងមាំនៃភក្ដីភាព និងការពឹងពាក់គ្នា។", "ទំនុកចិត្តកើតឡើងតាមរយៈភាពជាប់លាប់ និងការគោរពពាក្យសន្យា។", "ទំនុកចិត្តត្រូវការពេល — ភាពស្មោះត្រង់តាំងពីដើមជួយបាន។"],
    business:      ["ភាពខ្លាំងបំពេញគ្នា បង្កើតបានជាក្រុមការងារដែលមានសមត្ថភាព។", "អាចធ្វើការជាមួយគ្នាបាន ប្រសិនបើមានតួនាទីច្បាស់លាស់ និងគោលដៅរួម។", "របៀបទទួលហានិភ័យខុសគ្នា — ព្រមព្រៀងលើច្បាប់មុនការសម្រេចចិត្តធំៗ។"],
    friendship:    ["ជាក្រុមហ៊ុនដែលងាយស្រួល ស្មោះត្រង់ និងរីករាយសម្រាប់គ្នាទៅវិញទៅមក។", "ចំណងមិត្តភាពដែលកាន់តែស៊ីជម្រៅតាមរយៈបទពិសោធន៍រួម។", "ចង្វាក់ខុសគ្នា — ការគោរពចន្លោះរបស់គ្នាជួយឱ្យចំណងរឹងមាំ។"],
    overall:       ["គូដែលសុខដុមរមនា តាមការបកស្រាយប្រពៃណី។", "គូដែលមានតុល្យភាព និងសក្តានុពលល្អ។", "គូដែលត្រូវការការខិតខំ និងការយល់ចិត្តគ្នា។"]
  },
  topLine: "ផ្នែកខ្លាំងបំផុត៖ {T}។ ផ្នែកដែលត្រូវការការយកចិត្តទុកដាក់បំផុត៖ {W}។", reset: "ពិនិត្យគូផ្សេងទៀត",
  strengthsH: "ភាពខ្លាំងនៃគូនេះ", challengesH: "បញ្ហាប្រឈមដែលអាចមាន",
  strengths: {
    same: ["អ្នកទាំងពីរយល់ពីទម្លាប់ និងអារម្មណ៍របស់គ្នាដោយសភាវគតិ។", "តម្លៃរួម និងចង្វាក់ដូចគ្នា ធ្វើឱ្យជីវិតប្រចាំថ្ងៃមានអារម្មណ៍ស្និទ្ធស្នាល។", "ម្នាក់ៗឃើញគុណសម្បត្តិល្អបំផុតរបស់ខ្លួនក្នុងអ្នកម្ខាងទៀត។", "ភក្ដីភាពងាយស្រួល — អ្នកទាំងពីរទំនងជាការពារ និងគាំទ្រគ្នា។", "អារម្មណ៍ខ្លាំងនៃការជាកម្មសិទ្ធិរួមគ្នា។"],
    triangle: ["ការប្រាស្រ័យទាក់ទងល្អ និងការយល់ចិត្តគ្នាដោយធម្មជាតិ។", "ចរិតលក្ខណៈ និងរបៀបធ្វើការបំពេញគ្នា។", "ការគាំទ្រគ្នាខ្លាំង — អ្នកទាំងពីរលើកទឹកចិត្តគ្នា។", "អាចបំផុសគំនិត និងលើកទឹកចិត្តគ្នាទៅវិញទៅមក។", "ការលាយបញ្ចូលគ្នាប្រកបដោយតុល្យភាពរវាងភាពច្នៃប្រឌិត និងភាពជាក់ស្តែង។"],
    neutral: ["គ្មានសញ្ញាណាមួយទាញប្រឆាំងគ្នាទេ ទុកចន្លោះឱ្យអ្នកទាំងពីរក្លាយជាខ្លួនឯង។", "ភាពខុសគ្នាអាចបង្កើតភាពស្រស់ថ្លា និងទស្សនៈថ្មីៗ។", "ជោគជ័យអាស្រ័យលើជម្រើសរបស់អ្នកទាំងពីរច្រើនជាងសញ្ញា — ការចាប់ផ្តើមដែលបត់បែនបាន។", "អ្នកអាចរៀនបានច្រើនពីភាពខ្លាំងខុសៗគ្នារបស់គ្នា។", "មានកន្លែងដើម្បីបង្កើតរបៀបភាពជាដៃគូរបស់អ្នកផ្ទាល់។"],
    clash: ["ទំនាញខ្លាំងតាមរយៈភាពផ្ទុយគ្នា — អ្នកឃើញអ្វីដែលអ្នកម្ខាងទៀតខ្វះ។", "ម្នាក់ៗមើលបញ្ហាពីមុំដែលម្នាក់ទៀតមើលមិនឃើញ។", "ការរីកចម្រើន៖ អ្នកទាំងពីរជំរុញគ្នាចេញពីតំបន់ស្រួលរបស់ខ្លួន។", "ចំណង់ និងថាមពលខ្ពស់ នៅពេលអ្នកដឹកនាំវាបានល្អ។", "ឆន្ទៈក្នុងការដោះស្រាយភាពខុសគ្នា បង្កើតចំណងដែលរឹងមាំ។"]
  },
  strengthYY: "ភាពផ្ទុយគ្នានៃយិន និងយ៉ាង បន្ថែមតុល្យភាពធម្មជាតិដល់ទំនាក់ទំនងរបស់អ្នក។",
  strengthEl: { generates: "ធាតុរបស់អ្នកចិញ្ចឹមគ្នាទៅវិញទៅមក ដែលតាមប្រពៃណីគាំទ្រការរីកចម្រើន។", same: "ការមានធាតុដូចគ្នា ផ្តល់ឱ្យអ្នកនូវចង្វាក់ និងទស្សនៈស្រដៀងគ្នា។", neutral: "ធាតុរបស់អ្នកនៅក្បែរគ្នាដោយស្រួល គ្មានសម្ពាធ។" },
  challenges: {
    same: ["ចរិតស្រដៀងគ្នាអាចប្រកួតប្រជែងគ្នា ឬមានចំណុចខ្វះខាតដូចគ្នា។", "ភាពស្និទ្ធស្នាលអាចក្លាយជាទម្លាប់ ប្រសិនបើអ្នកឈប់ខិតខំ។", "អ្នកទាំងពីរអាចមានឆន្ទៈខ្លាំងនៅពេលមានសម្ពាធ។", "ត្រូវការការអត់ធ្មត់ និងការស្តាប់ដោយយកចិត្តទុកដាក់។", "ការធ្វើតុល្យភាពរវាងឯករាជ្យ និងការនៅជាមួយគ្នា។"],
    triangle: ["ភាពស្រួលអាចនាំឱ្យចាត់ទុកគ្នាជារឿងធម្មតាពេក។", "អាចមានវិធីសម្រេចចិត្តខុសគ្នា។", "អាចមានការមិនចុះសម្រុងគ្នាអំពីរឿងលុយកាក់។", "ត្រូវការការអត់ធ្មត់ និងការស្តាប់ដោយយកចិត្តទុកដាក់។", "ការធ្វើតុល្យភាពរវាងឯករាជ្យ និងការនៅជាមួយគ្នា។"],
    neutral: ["បើគ្មានទំនាញធម្មជាតិ ចំណងត្រូវការការខិតខំដោយចេតនា។", "អាទិភាពខុសគ្នាអាចលេចឡើងនៅពេលមានសម្ពាធ។", "ការរំពឹងទុកអាចមិនត្រូវបាននិយាយចេញ — សូមនិយាយវាឱ្យឮ។", "វិធីសម្រេចចិត្តខុសគ្នា។", "ត្រូវការការអត់ធ្មត់ និងការស្តាប់ដោយយកចិត្តទុកដាក់។"],
    clash: ["ភាពខុសគ្នានៃចរិតអាចបង្កការតានតឹងនៅពេលមានសម្ពាធ។", "អ្នកអាចយល់ស្ថានភាពដូចគ្នាខុសគ្នាខ្លាំង។", "មានមតិរឹងមាំទាំងសងខាង — ការសម្របសម្រួលត្រូវការការហាត់។", "ត្រូវការការអត់ធ្មត់ ការគោរព និងការស្តាប់ដោយយកចិត្តទុកដាក់។", "វិធីខុសគ្នាចំពោះលុយកាក់ ហានិភ័យ និងការសម្រេចចិត្ត។"]
  },
  challengeYY: "ការមានភាពដូចគ្នា (យិនទាំងពីរ ឬយ៉ាងទាំងពីរ) អាចធ្វើឱ្យអ្នកទាំងពីរឆ្ពោះទៅទិសដៅតែមួយ — សូមស្វាគមន៍ទស្សនៈផ្សេង។",
  challengeEl: "តាមប្រពៃណី ធាតុរបស់អ្នកទប់ទល់គ្នា ដូច្នេះតុល្យភាព និងភាពបត់បែនមានសារៈសំខាន់។",
  intro: {
    same: "{A} ជាមួយ {B} ជាគូដែលមានសញ្ញាដូចគ្នា៖ ស្និទ្ធស្នាលជ្រៅ សភាវគតិរួម និងការយល់គ្នាខ្លាំង។",
    triangle: "{A} និង {B} ស្ថិតក្នុងត្រីកោណភាពជាគូប្រពៃណីតែមួយ ដែលជាក្រុមសុខដុមបំផុតមួយក្នុងជោគជតារាសី។",
    neutral: "{A} និង {B} ជាគូអព្យាក្រឹត — មិនមែនគូជាគូបុរាណ ហើយក៏មិនមែនប៉ះទង្គិចដែរ ដូច្នេះលទ្ធផលអាស្រ័យច្រើនលើរបៀបដែលអ្នកទាំងពីរទាក់ទងគ្នា។",
    clash: "{A} និង {B} ស្ថិតនៅទល់មុខគ្នាលើរង្វង់ជោគជតារាសី ជាការប៉ះទង្គិចតាមប្រពៃណី ដែលនាំមកនូវភាពផ្ទុយគ្នាខ្លាំង និងការរៀនសូត្រច្រើនពីគ្នា។"
  },
  tierLine: {
    high: "អ្នកទាំងពីរមានភាពស៊ីសង្វាក់ខ្លាំង និងភាពខ្លាំងបំពេញគ្នា ជាមួយសក្តានុពលល្អក្នុងការប្រាស្រ័យទាក់ទង និងសហការ។",
    medium: "មានសក្តានុពលពិតប្រាកដនៅទីនេះ ហើយវាកាន់តែរីកលូតលាស់ នៅពេលអ្នកទាំងពីរនិយាយគ្នាបើកចំហ និងអត់ធ្មត់។",
    low: "គូនេះត្រូវការការយល់ចិត្តគ្នាបន្ថែម ប៉ុន្តែមនុស្សជាច្រើនរកឃើញថា ការខិតខំធ្វើឱ្យចំណងកាន់តែរឹងមាំ។"
  },
  elementsH: "ភាពជាគូនៃធាតុ",
  elRel: { harmonious: "សុខដុមរមនា", supportive: "គាំទ្រគ្នា", neutral: "អព្យាក្រឹត", challenging: "មានបញ្ហាប្រឈម" },
  elText: {
    generates: "ក្នុងវដ្តធាតុទាំងប្រាំតាមប្រពៃណី {EA} និង {EB} ចិញ្ចឹមគ្នាទៅវិញទៅមក។ នេះត្រូវបានចាត់ទុកថាជាទំនាក់ទំនងសុខដុមរមនា — ថាមពលហូរពីមួយទៅមួយ ហើយគាំទ្រការរីកចម្រើន។",
    same: "អ្នកទាំងពីរមានធាតុដូចគ្នា ({EA})។ តាមប្រពៃណីនេះជាការគាំទ្រគ្នា៖ សភាវគតិស្រដៀងគ្នា និងចង្វាក់រួម ទោះបីអ្នកអាចត្រូវបន្ថែមតុល្យភាពនៅកន្លែងដែលអ្នកមានចំណុចខ្វះខាតដូចគ្នា។",
    neutral: "{EA} និង {EB} គ្មានទំនោរបុរាណខ្លាំងទៅរកគ្នា ឬប្រឆាំងគ្នាទេ។ គូនេះត្រូវបានចាត់ទុកថាអព្យាក្រឹត — វាទទួលលក្ខណៈពីអ្នកទាំងពីរ។",
    controls: "ក្នុងវដ្តធាតុទាំងប្រាំ តាមប្រពៃណី {EA} និង {EB} ទប់ទល់គ្នា។ នេះត្រូវបានមើលឃើញថាជាការផ្សំដែលមានបញ្ហាប្រឈម ដែលអាចក្លាយជាតុល្យភាពល្អ នៅពេលអ្នកទាំងពីរបត់បែន។"
  },
  fiveH: "ធាតុទាំងប្រាំ",
  five: { Wood: "ការលូតលាស់ ភាពច្នៃប្រឌិត ភាពសប្បុរស", Fire: "ចំណង់ ថាមពល ភាពក្លៀវក្លា", Earth: "ស្ថិរភាព ការអត់ធ្មត់ ភាពជាក់ស្តែង", Metal: "វិន័យ ភាពច្បាស់លាស់ ការតាំងចិត្ត", Water: "ភាពបត់បែន វិចារណញាណ ការប្រាស្រ័យទាក់ទង" },
  guideH: "គន្លឹះសម្រាប់ទំនាក់ទំនងជោគជ័យ",
  guide: ["ប្រាស្រ័យទាក់ទងដោយបើកចំហ និងស្មោះត្រង់។", "គោរពភាពខ្លាំង និងភាពខុសគ្នារបស់គ្នា។", "កំណត់គោលដៅ និងការរំពឹងទុកឱ្យច្បាស់លាស់។", "មានភាពបត់បែន ហើយសុខចិត្តសម្របសម្រួល។", "គាំទ្រការរីកចម្រើនផ្ទាល់ខ្លួនរបស់គ្នា។", "ធ្វើការជាក្រុម។", "ផ្តល់ឯករាជ្យសមរម្យដល់គ្នាទៅវិញទៅមក។"],
  loveH: "ភាពជាគូក្នុងស្នេហា និងទំនាក់ទំនង",
  love: {
    high: "{A} និង {B} បង្ហាញរូបភាពស្នេហាដ៏កក់ក្តៅ និងមានសង្ឃឹម។ ការបកស្រាយតាមប្រពៃណីពណ៌នាអំពីចំណងអារម្មណ៍ដែលងាយស្រួល ភាពស្នេហាដោយធម្មជាតិ និងសក្តានុពលរយៈពេលវែងល្អ ដរាបណាអ្នកទាំងពីរបន្តចំណាយពេលឱ្យគ្នា។",
    medium: "{A} និង {B} មានរូបភាពស្នេហាប្រកបដោយតុល្យភាព។ ការបកស្រាយតាមប្រពៃណីបង្ហាញថា ចំណងរីកលូតលាស់តាមរយៈការសន្ទនាបើកចំហ ផែនការរួម និងកាយវិការតូចៗជាប់លាប់។",
    low: "{A} និង {B} អាចមានអារម្មណ៍ទាក់ទាញដោយភាពផ្ទុយគ្នាក្នុងស្នេហា។ ការបកស្រាយតាមប្រពៃណីបង្ហាញថា ទំនាក់ទំនងនេះត្រូវការការអត់ធ្មត់ ការនិយាយស្មោះត្រង់ និងការគោរពភាពខុសគ្នា ហើយអាចក្លាយជាទំនាក់ទំនងដែលមានតម្លៃជ្រាលជ្រៅ។"
  },
  loveFocus: [["ចំណងអារម្មណ៍", "ចែករំលែកអារម្មណ៍ជាប្រចាំ មិនត្រឹមតែនៅពេលលំបាកទេ។"], ["ភាពស្នេហា", "កាយវិការតូចៗដែលគិតគូរ សំខាន់ជាងរបស់ធំៗ។"], ["ការប្រាស្រ័យទាក់ទង", "និយាយអ្វីដែលអ្នកត្រូវការ ហើយសួរថាបានយល់ត្រូវឬអត់។"], ["ទំនុកចិត្ត", "គោរពពាក្យសន្យា និងស្មោះត្រង់តាំងពីដើម។"], ["ឯករាជ្យ", "ចំណាប់អារម្មណ៍ផ្ទាល់ខ្លួនរបស់ម្នាក់ៗ រក្សាទំនាក់ទំនងឱ្យស្រស់ថ្លា។"], ["សក្តានុពលរយៈពេលវែង", "និយាយអំពីគោលដៅរួម ហើយពិនិត្យឡើងវិញនៅពេលជីវិតផ្លាស់ប្តូរ។"]],
  friendH: "ភាពជាគូក្នុងមិត្តភាព",
  friend: {
    high: "ក្នុងនាមជាមិត្ត {A} និង {B} ទំនងជារីករាយនឹងការនៅជាមួយគ្នាដោយងាយស្រួល ភក្ដីភាព និងសំណើចរួមច្រើន។ ការបកស្រាយតាមប្រពៃណីមើលឃើញថានេះជាមិត្តភាពដែលអាចស្ថិតស្ថេរ។",
    medium: "ក្នុងនាមជាមិត្ត {A} និង {B} អាចបង្កើតចំណងមិត្តភាពដ៏ជាប់លាប់ និងរីករាយ ដែលកាន់តែស៊ីជម្រៅតាមរយៈចំណាប់អារម្មណ៍រួម និងពេលវេលាជាមួយគ្នា។",
    low: "ក្នុងនាមជាមិត្ត {A} និង {B} អាចមានចង្វាក់ខុសគ្នា។ ការបកស្រាយតាមប្រពៃណីបង្ហាញថា មិត្តភាពដំណើរការល្អបំផុតជាមួយចន្លោះ ភាពស្មោះត្រង់ និងអារម្មណ៍កំប្លែងចំពោះភាពខុសគ្នា។"
  },
  friendFocus: [["ការប្រាស្រ័យទាក់ទង", "ទាក់ទងគ្នាតាមរបៀបរបស់អ្នក ទោះជីវិតមមាញឹកក៏ដោយ។"], ["ចំណាប់អារម្មណ៍រួម", "រកសកម្មភាពដែលអ្នកទាំងពីរចូលចិត្ត ហើយសាកល្បងអ្វីថ្មីៗជាមួយគ្នា។"], ["ទំនុកចិត្ត", "ពឹងពាក់បាន និងរក្សាការសម្ងាត់។"], ["ភក្ដីភាព", "នៅក្បែរគ្នាក្នុងពេលដែលសំខាន់។"], ["ថាមពលសង្គម", "គោរពនៅពេលម្នាក់ត្រូវការមិត្តភាព ហើយម្នាក់ទៀតត្រូវការភាពស្ងប់ស្ងាត់។"], ["ការដោះស្រាយការមិនចុះសម្រុង", "និយាយឱ្យលឿន រក្សាភាពសុភាព ហើយបណ្តែតរឿងតូចៗ។"]],
  bizH: "ភាពជាគូក្នុងអាជីវកម្ម",
  biz: {
    high: "ក្នុងអាជីវកម្ម {A} និង {B} តាមប្រពៃណីត្រូវបានមើលឃើញថាជាក្រុមដែលមានសមត្ថភាព៖ ភាពខ្លាំងបំពេញគ្នា ការសហការរលូន និងសក្តានុពលល្អក្នុងការចែករំលែកភាពជាអ្នកដឹកនាំ។",
    medium: "ក្នុងអាជីវកម្ម {A} និង {B} អាចធ្វើការបានល្អ ជាមួយតួនាទីដែលបែងចែកច្បាស់លាស់ គោលដៅរួម និងការពិនិត្យជាប្រចាំ។",
    low: "ក្នុងអាជីវកម្ម {A} និង {B} អាចមានវិធីខុសគ្នាចំពោះហានិភ័យ និងការសម្រេចចិត្ត។ កិច្ចព្រមព្រៀងច្បាស់លាស់ និងតួនាទីកំណត់ អាចប្រែភាពខុសគ្នាទាំងនោះទៅជាអត្ថប្រយោជន៍។"
  },
  bizFocus: [["ភាពជាអ្នកដឹកនាំ", "សម្រេចថាអ្នកណាដឹកនាំផ្នែកណា ហើយគោរពវា។"], ["ការងារជាក្រុម", "ប្រើភាពខ្លាំងរបស់ម្នាក់ៗឱ្យបានល្អ។"], ["ការប្រាស្រ័យទាក់ទង", "ព្រមព្រៀងលើរបៀប និងពេលវេលាដែលអ្នកធ្វើបច្ចុប្បន្នភាពគ្នា។"], ["ការសម្រេចចិត្ត", "កំណត់ដំណើរការសាមញ្ញសម្រាប់ការសម្រេចចិត្តធំៗ។"], ["ការទទួលហានិភ័យ", "ពិភាក្សាអំពីដែនកំណត់មុនពេលមានលុយពាក់ព័ន្ធ។"], ["របៀបធ្វើការ", "គោរពចង្វាក់ និងវិធីធ្វើការខុសគ្នា។"]],
  bizCta: "ស្វែងយល់ពីភាពជាគូដៃគូអាជីវកម្ម →",
  exploreH: "ស្វែងយល់ពីរាសីឆ្នាំទាំង 12",
  guidesH: "មគ្គុទ្ទេសក៍ពាក់ព័ន្ធ",
  guides: [["មគ្គុទ្ទេសក៍ភាពជាគូជោគជតារាសី", "blog/zodiac-compatibility-guide.html", "របៀបយល់ពីការផ្គូផ្គងតាមប្រពៃណី។"], ["តើឆ្នាំកំណើតរបស់ខ្ញុំជាសត្វអ្វី?", "checker.html", "រកសត្វ ធាតុ និងលក្ខណៈរបស់អ្នក។"], ["សត្វជោគជតារាសី", "animals.html", "ស្គាល់សត្វទាំង 12។"], ["ធាតុជោគជតារាសី", "animals.html", "ឈើ ភ្លើង ដី លោហធាតុ និងទឹក។"], ["ឆ្នាំជោគជតារាសី", "animals.html", "ឆ្នាំកំណើតសម្រាប់សត្វនីមួយៗ។"], ["ភាពជាគូដៃគូអាជីវកម្ម", "business-partner.html", "ប្រៀបធៀបមនុស្សពីរនាក់ជាដៃគូអាជីវកម្ម។"]],
  quickH: "ចង់ពិនិត្យរហ័សតាមសត្វជោគជតារាសីឬ?",
  quickIntro: "ចង់បានការផ្គូផ្គងបែបផ្កាយសាមញ្ញជាងនេះឬ? សូមប្រើការពិនិត្យរហ័សខាងក្រោម។",
  faqH: "សំណួរដែលសួរញឹកញាប់",
  faq: [
    ["តើខ្ញុំអាចប្រៀបធៀបរាសីពីរដោយមិនដឹងថ្ងៃកំណើតបានទេ?", "បាន។ ប្រើផ្នែក \"ប្រៀបធៀបរាសីពីរ\" នៅលើទំព័រនេះ ដើម្បីជ្រើសរើសសត្វរាសីពីរ ហើយមើលប្រភេទភាពត្រូវគ្នាតាមប្រពៃណី រួមទាំងស្នេហា មិត្តភាព អាជីវកម្ម ការងារជាក្រុម និងលុយកាក់។ ដើម្បីទទួលបានពិន្ទុជាភាគរយពិតប្រាកដ សូមបញ្ចូលថ្ងៃកំណើតទាំងពីរ ព្រោះធាតុ និងយិន ឬយ៉ាងនៃឆ្នាំកំណើតនីមួយៗក៏សំខាន់ដែរ។"],
    ["តើភាពជាគូជោគជតារាសីត្រូវបានគណនាយ៉ាងដូចម្តេច?", "ភាពជាគូតាមប្រពៃណីប្រៀបធៀបសត្វរាសីរបស់មនុស្សពីរនាក់ បន្ទាប់មកធាតុ និងភាពយិន ឬយ៉ាងនៃឆ្នាំរាសីរបស់ពួកគេ។ សត្វក្នុងត្រីកោណតែមួយត្រូវបានចាត់ទុកថាសុខដុមដោយធម្មជាតិ សត្វទល់មុខគ្នាត្រូវបានចាត់ទុកថាប៉ះទង្គិច ហើយផ្សេងទៀតអព្យាក្រឹត។ កម្មវិធីនេះបំប្លែងគំនិតប្រពៃណីទាំងនេះទៅជាពិន្ទុសម្រាប់កម្សាន្ត និងការគិតពិចារណា។"],
    ["តើមនុស្សពីរនាក់ដែលមានរាសីខុសគ្នាអាចជាគូបានទេ?", "បាន។ គូភាគច្រើនមិនល្អឥតខ្ចោះ ហើយក៏មិនមែនអាក្រក់ទាំងស្រុងដែរ។ រាសីខុសគ្នាអាចនាំមកនូវភាពផ្ទុយគ្នាដែលមានប្រយោជន៍ ហើយរបៀបដែលអ្នកប្រាស្រ័យទាក់ទង និងប្រព្រឹត្តចំពោះគ្នាសំខាន់ជាងសត្វឆ្ងាយណាស់។"],
    ["ហេតុអ្វីបានជាចូលឆ្នាំចិនសំខាន់?", "ឆ្នាំរាសីចិនចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចិន មិនមែនថ្ងៃទី 1 មករាទេ។ អ្នកដែលកើតនៅខែមករា ឬដើមខែកុម្ភៈ អាចជាកម្មសិទ្ធិរបស់ឆ្នាំសត្វមុន ដូច្នេះកម្មវិធីនេះពិនិត្យថ្ងៃកំណើតនីមួយៗជាមួយកាលបរិច្ឆេទចូលឆ្នាំចិនពិតប្រាកដ។"],
    ["តើធាតុទាំងប្រាំនៃជោគជតារាសីជាអ្វីខ្លះ?", "ឈើ ភ្លើង ដី លោហធាតុ និងទឹក។ ឆ្នាំរាសីនីមួយៗមានធាតុមួយ ហើយប្រពៃណីពណ៌នាអំពីរបៀបដែលធាតុចិញ្ចឹម ទប់ទល់ ឬនៅអព្យាក្រឹតក្បែរគ្នា។"],
    ["តើយិន និងយ៉ាងមានន័យយ៉ាងណា?", "យិន និងយ៉ាងជាភាពបំពេញគ្នាក្នុងទស្សនវិជ្ជាចិន។ ឆ្នាំរាសីជំនួសគ្នារវាងពួកវា ហើយមនុស្សពីរនាក់ដែលមានភាពខុសគ្នា តាមប្រពៃណីត្រូវបានគេនិយាយថាធ្វើតុល្យភាពគ្នា។"],
    ["តើភាពជាគូជោគជតារាសីអាចទស្សន៍ទាយទំនាក់ទំនងបានទេ?", "ទេ។ វាជាប្រពៃណីវប្បធម៌ដែលផ្តល់ប្រធានបទសន្ទនា មិនមែនការទស្សន៍ទាយទេ។ ទំនាក់ទំនងពិតអាស្រ័យលើការគោរព ការខិតខំ តម្លៃរួម និងការប្រាស្រ័យទាក់ទង។"],
    ["តើអាចប្រើភាពជាគូរាសីសម្រាប់ដៃគូអាជីវកម្មបានទេ?", "មនុស្សជាច្រើនចូលចិត្តប្រើវាជាក្របខ័ណ្ឌវប្បធម៌ សម្រាប់គិតអំពីការងារជាក្រុម និងរបៀបធ្វើការ ប៉ុន្តែវាមិនគួរជំនួសការត្រួតពិនិត្យ កិច្ចសន្យាជាលាយលក្ខណ៍អក្សរ ឬដំបូន្មានអ្នកជំនាញឡើយ។"],
    ["តើភាពជាគូជោគជតារាសីត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រឬទេ?", "ទេ។ គ្មានភស្តុតាងវិទ្យាសាស្ត្រថារាសីអាចទស្សន៍ទាយភាពជាគូបានទេ។ យើងបង្ហាញវាជាបេតិកភណ្ឌវប្បធម៌ និងការកម្សាន្ត។"]
  ],
  disclaimer: "ភាពជាគូជោគជតារាសីផ្អែកលើជំនឿវប្បធម៌ប្រពៃណី ហើយត្រូវបានផ្តល់ជូនសម្រាប់ការកម្សាន្ត ការស្វែងយល់វប្បធម៌ និងការឆ្លុះបញ្ចាំងផ្ទាល់ខ្លួន។ វាមិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ ហើយមិនគួរប្រើជំនួសដំបូន្មានអ្នកជំនាញផ្នែកទំនាក់ទំនង ហិរញ្ញវត្ថុ ឬអាជីវកម្មឡើយ។",
  seo: [
    ["របៀបដែលភាពជាគូជោគជតារាសីដំណើរការ", ["ជោគជតារាសីជាវដ្តដដែលៗនៃសត្វ 12៖ ជូត ឆ្លូវ ខាល ថោះ រោង ម្សាញ់ មមី មមែ វក រកា ច កុរ។ ភាពជាគូតាមប្រពៃណីប្រៀបធៀបសត្វនៃឆ្នាំកំណើតរបស់មនុស្សពីរនាក់។", "សត្វទាំង 12 បង្កើតជាត្រីកោណសុខដុមបួន — ជូត រោង វក; ឆ្លូវ ម្សាញ់ រកា; ខាល មមី ច; ថោះ មមែ កុរ។ សញ្ញាក្នុងត្រីកោណតែមួយត្រូវបានគេនិយាយថាមានទស្សនៈ និងថាមពលស្រដៀងគ្នា ចំណែកសញ្ញាដែលទល់មុខគ្នាត្រូវបានគេនិយាយថាប៉ះទង្គិចគ្នា។ គូផ្សេងទៀតភាគច្រើនអព្យាក្រឹត។"]],
    ["ភាពជាគូជោគជតារាសី និងធាតុទាំងប្រាំ", ["ឆ្នាំរាសីនីមួយៗក៏មានធាតុមួយក្នុងចំណោមធាតុទាំងប្រាំ៖ ឈើ ភ្លើង ដី លោហធាតុ ឬទឹក។ ឈើចិញ្ចឹមភ្លើង ភ្លើងបង្កើតដី ដីបង្កើតលោហធាតុ លោហធាតុនាំទឹក ហើយទឹកចិញ្ចឹមឈើ។ ធាតុដែលចិញ្ចឹមគ្នាត្រូវបានចាត់ទុកថាសុខដុម ចំណែកធាតុដែលទប់ទល់គ្នាត្រូវបានចាត់ទុកថាមានបញ្ហាប្រឈម។", "ឈើតំណាងឱ្យការលូតលាស់ និងភាពច្នៃប្រឌិត ភ្លើងតំណាងឱ្យចំណង់ និងថាមពល ដីតំណាងឱ្យស្ថិរភាព និងការអត់ធ្មត់ លោហធាតុតំណាងឱ្យវិន័យ និងភាពច្បាស់លាស់ ហើយទឹកតំណាងឱ្យភាពបត់បែន និងវិចារណញាណ។"]],
    ["ភាពជាគូជោគជតារាសីក្នុងស្នេហា", ["មនុស្សតែងប្រើភាពជាគូរាសីជាប្រធានបទសន្ទនាស្រាលៗក្នុងទំនាក់ទំនង ដើម្បីនិយាយអំពីចរិត របៀបប្រាស្រ័យទាក់ទង និងការរំពឹងទុក។ គូដែលសុខដុមតាមប្រពៃណីមិនមែនជាការសន្យាទេ ហើយការប៉ះទង្គិចតាមប្រពៃណីក៏មិនមែនជាការព្រមានដែរ ព្រោះមូលដ្ឋានពិតគឺរបៀបដែលមនុស្សពីរនាក់ប្រព្រឹត្តចំពោះគ្នា។"]],
    ["ភាពជាគូជោគជតារាសីក្នុងអាជីវកម្ម", ["ប្រពៃណីរាសីអាចបម្រើជាក្របខ័ណ្ឌវប្បធម៌សម្រាប់គិតអំពីការងារជាក្រុម និងរបៀបធ្វើការ — អ្នកណាចូលចិត្តដឹកនាំ អ្នកណាចូលចិត្តលម្អិត និងម្នាក់ៗមានអារម្មណ៍យ៉ាងណាចំពោះហានិភ័យ។ សូមប្រើវាសម្រាប់ការគិត និងពិភាក្សាតែប៉ុណ្ណោះ ហើយពឹងលើកិច្ចព្រមព្រៀងច្បាស់លាស់ និងដំបូន្មានអ្នកជំនាញសម្រាប់ការសម្រេចចិត្តអាជីវកម្មពិតប្រាកដ។"]],
    ["ហេតុអ្វីបានជាចូលឆ្នាំចិនសំខាន់", ["ឆ្នាំរាសីចិនចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចិន ដែលធ្លាក់នៅចន្លោះចុងខែមករា និងពាក់កណ្តាលខែកុម្ភៈ។ ប្រសិនបើអ្នកកើតនៅខែមករា ឬដើមខែកុម្ភៈ សត្វរបស់អ្នកអាចជាសត្វនៃឆ្នាំមុន។ នោះជាមូលហេតុដែលកម្មវិធីនេះប្រៀបធៀបថ្ងៃកំណើតនីមួយៗជាមួយកាលបរិច្ឆេទចូលឆ្នាំចិនពិតប្រាកដនៃឆ្នាំនោះ ជំនួសឱ្យការប្រើតែឆ្នាំគ្រិស្តសករាជ។"]]
  ]
}
};

// Simplified Chinese (zh)
CMP_TEXT.zh = {
  title: "生肖配对计算器",
  sub: "比较两个出生日期，了解你们在爱情、友情、事业等方面的中国生肖配对。",
  desc: "输入两个出生日期，探索传统中国生肖配对，包括性格互动、沟通、信任和整体和谐。",
  p1: "第一个人", p2: "第二个人", dob: "出生日期",
  submit: "查看配对 →",
  hint: "只需要两个出生日期，不需要姓名或出生时间。",
  err_required: "请输入两个人的出生日期。",
  err_future: "出生日期不能是未来的日期，请检查输入。",
  err_invalid: "其中一个日期无效，请重新检查。",
  result_h: "你们的配对结果",
  year: "生肖年", element: "五行", yy: "阴阳",
  yang: "阳", yin: "阴",
  score_note: "传统的娱乐性解读——并非科学测量。",
  levels: ["非常相配", "很相配", "中等相配", "需共同成长的配对", "有挑战但可行"],
  cats: { love: "爱情配对", communication: "沟通", trust: "信任", business: "事业潜力", friendship: "友情", overall: "整体配对" },
  catText: {
    love:          ["温暖自然的化学反应，情感吸引力强。", "多花时间陪伴彼此，感情会稳定增长。", "热情和耐心都需要，才能让火花持续。"],
    communication: ["你们往往不费力就能理解对方。", "放慢脚步、认真倾听时，就会有好的交流。", "沟通风格不同——把话说清楚，并确认对方理解了。"],
    trust:         ["有忠诚和互相依靠的坚实基础。", "信任来自一贯的表现和信守承诺。", "这里的信任需要时间；一开始就坦诚会更容易。"],
    business:      ["优势互补，是能干的工作团队。", "有明确的分工和共同目标，就能合作顺利。", "对风险的态度不同——重大决定前先约定规则。"],
    friendship:    ["相处轻松、忠诚，彼此都很愉快。", "友好的关系，会因共同经历而加深。", "节奏不同；尊重彼此的空间，关系才会健康。"],
    overall:       ["按传统解读，这是和谐的配对。", "平衡的配对，很有潜力。", "这个配对会回报努力和理解。"]
  },
  topLine: "最强的方面：{T}。最需要用心的方面：{W}。", reset: "查询另一对",
  strengthsH: "这对配对的优势", challengesH: "可能的挑战",
  strengths: {
    same: ["你们本能地了解对方的习惯和情绪。", "相同的价值观和相似的节奏，让日常生活很熟悉自在。", "你们都能在对方身上看到自己最好的特质。", "自然的忠诚——你们往往互相维护和支持。", "强烈的归属感和共同的身份认同。"],
    triangle: ["沟通良好，自然而然地理解对方。", "性格和工作方式互补。", "互相支持——你们能彼此成就。", "能互相激励、鼓舞对方。", "创意与务实平衡结合。"],
    neutral: ["两个生肖互不牵制，让你们可以做自己。", "差异可以带来新鲜感和新的视角。", "成功更取决于你们的选择而不是生肖——是灵活的起点。", "你们可以从对方不同的长处中学到很多。", "有空间建立属于你们自己的相处方式。"],
    clash: ["因反差而产生强烈吸引——你们能看到对方欠缺的东西。", "你们各自能从对方会忽略的角度看问题。", "成长：你们会推动彼此走出舒适圈。", "好好引导时，热情和能量都非常高。", "愿意一起面对差异，会建立坚韧的关系。"]
  },
  strengthYY: "不同的阴阳属性为你们的关系带来自然的平衡。",
  strengthEl: { generates: "你们的五行相生，传统上有利于共同成长。", same: "相同的五行让你们节奏相近、看法相似。", neutral: "你们的五行可以舒服地并存，没有压力。" },
  challenges: {
    same: ["两个相似的性格可能互相竞争，或重复同样的盲点。", "如果不再用心，熟悉可能变成一成不变。", "压力大时，双方可能都很固执。", "需要耐心和用心倾听。", "在独立和亲密之间取得平衡。"],
    triangle: ["太舒服可能让人把对方视为理所当然。", "做决定的方式可能出现差异。", "可能在金钱问题上有分歧。", "需要耐心和用心倾听。", "在独立和亲密之间取得平衡。"],
    neutral: ["没有天然的吸引，关系需要刻意经营。", "压力下可能显出不同的优先事项。", "期望可能没说出口——要把它说出来。", "做决定的方式不同。", "需要耐心和用心倾听。"],
    clash: ["压力下，性情差异可能带来摩擦。", "你们看待同一件事的方式可能很不一样。", "双方意见都很强——妥协需要练习。", "需要耐心、尊重和用心倾听。", "对金钱、风险和决定的态度不同。"]
  },
  challengeYY: "相同的阴阳属性可能让你们都往同一个方向用力——多听听另一种看法。",
  challengeEl: "你们的五行传统上相克，所以平衡和灵活很重要。",
  intro: {
    same: "{A}与{B}是同一生肖的配对：彼此非常熟悉，本能相同，有很强的理解感。",
    triangle: "{A}和{B}属于同一个传统三合，是十二生肖中最和谐的组合之一。",
    neutral: "{A}和{B}属于普通配对——既不是经典的相配，也不是相冲，所以结果很大程度上取决于你们两人如何相处。",
    clash: "{A}和{B}在生肖轮上正好相对，是传统的相冲，带来强烈的反差，也有很多可以向对方学习的地方。"
  },
  tierLine: {
    high: "你们有很强的化学反应和互补的优势，在沟通与合作上很有潜力。",
    medium: "这里确实有潜力，双方坦诚沟通、保持耐心时，潜力会越来越大。",
    low: "这个配对需要更多的理解，但很多人发现，这份努力会让关系更牢固。"
  },
  elementsH: "五行配对",
  elRel: { harmonious: "和谐", supportive: "相助", neutral: "中性", challenging: "有挑战" },
  elText: {
    generates: "在传统五行循环中，{EA}与{EB}相生。这被视为和谐的关系——能量从一方流向另一方，有利于成长。",
    same: "你们五行相同（{EA}）。传统上这是相助的：本能相似、节奏一致，不过在同样的盲点上需要多一些平衡。",
    neutral: "{EA}和{EB}在传统上没有明显的相生或相克，被视为中性的组合——它的特点取决于你们两人。",
    controls: "在五行循环中，{EA}和{EB}传统上相克。这被视为有挑战的组合；双方保持灵活时，可以变成健康的平衡。"
  },
  fiveH: "五行",
  five: { Wood: "成长、创意、慷慨", Fire: "热情、活力、干劲", Earth: "稳定、耐心、务实", Metal: "自律、清晰、决心", Water: "适应、直觉、沟通" },
  guideH: "经营好关系的建议",
  guide: ["坦诚、真诚地沟通。", "尊重彼此的长处和差异。", "设定清楚的目标和期望。", "保持灵活，愿意妥协。", "支持彼此的个人成长。", "像一个团队一样合作。", "给彼此适当的独立空间。"],
  loveH: "爱情与关系配对",
  love: {
    high: "{A}和{B}的爱情前景温暖而美好。传统解读认为你们情感连接自然、浪漫，长期潜力也不错——只要你们继续为彼此留出时间。",
    medium: "{A}和{B}的爱情前景比较平衡。传统解读认为，这份感情会通过坦诚的交流、共同的计划和小而稳定的关心而成长。",
    low: "{A}和{B}在爱情中可能感受到反差的吸引。传统解读认为这段关系需要耐心、坦诚的沟通和对差异的尊重，也可能因此变得非常有意义。"
  },
  loveFocus: [["情感连接", "经常分享感受，而不只是在困难的时候。"], ["浪漫", "小而用心的举动，比隆重的场面更重要。"], ["沟通", "说出你的需要，并确认对方理解了。"], ["信任", "信守承诺，及早坦诚。"], ["独立", "各自的兴趣会让感情保持新鲜。"], ["长期潜力", "谈谈共同的目标，并随着生活变化重新讨论。"]],
  friendH: "友情配对",
  friend: {
    high: "作为朋友，{A}和{B}很可能相处轻松、彼此忠诚，常常一起开怀大笑。传统解读认为这是一段可以长久的友谊。",
    medium: "作为朋友，{A}和{B}能建立稳定而愉快的关系，通过共同兴趣和相处时间而加深。",
    low: "作为朋友，{A}和{B}可能节奏不同。传统解读认为，这段友谊在有空间、坦诚并且能幽默看待差异时最好。"
  },
  friendFocus: [["沟通", "即使生活忙碌，也用自己的方式保持联系。"], ["共同兴趣", "找到两人都喜欢的活动，也一起尝试新的。"], ["信任", "可靠，并且保守秘密。"], ["忠诚", "在重要的时刻出现。"], ["社交能量", "尊重一方想要热闹、另一方想要安静的时候。"], ["处理分歧", "及早沟通，保持善意，小事就放下。"]],
  bizH: "事业配对",
  biz: {
    high: "在事业上，{A}和{B}传统上被视为能干的团队：优势互补、合作顺畅，很适合共同领导。",
    medium: "在事业上，{A}和{B}只要分工明确、目标一致并经常沟通，就能合作得很好。",
    low: "在事业上，{A}和{B}对风险和决定的态度可能不同。清楚的约定和明确的分工，可以把这些差异变成优势。"
  },
  bizFocus: [["领导", "决定谁负责哪个领域，并互相尊重。"], ["团队合作", "发挥每个人的长处。"], ["沟通", "约定怎样、什么时候互相汇报。"], ["决策", "为重大决定定一个简单的流程。"], ["风险承受", "在涉及金钱之前先讨论底线。"], ["工作方式", "尊重彼此不同的节奏和做事方式。"]],
  bizCta: "查看合作伙伴配对 →",
  exploreH: "探索全部十二生肖",
  guidesH: "相关指南",
  guides: [["生肖配对指南", "blog/zodiac-compatibility-guide.html", "传统配对是怎样理解的。"], ["我属什么生肖？", "checker.html", "找到你的生肖、五行和特点。"], ["十二生肖", "animals.html", "认识全部十二生肖。"], ["生肖五行", "animals.html", "木、火、土、金、水。"], ["生肖年份", "animals.html", "每个生肖的出生年份。"], ["合作伙伴配对", "business-partner.html", "把两个人作为商业伙伴来比较。"]],
  quickH: "想快速查看生肖配对？",
  quickIntro: "想要更简单的星级配对？请使用下面的快速查询。",
  faqH: "常见问题",
  faq: [
    ["不用出生日期也能比较两个生肖吗？", "可以。使用本页的“比较两个生肖”，选择两个生肖，就能看到它们的传统配对类型，以及关于爱情、友情、事业、团队合作和金钱的说明。如果想要精确的百分比分数，请输入两个出生日期，因为每个出生年的五行和阴阳也会计算在内。"],
    ["中国生肖配对是怎么计算的？", "传统配对先比较两个人的生肖，再比较他们生肖年的五行和阴阳。同一三合的生肖被视为天然和谐，正对面的生肖被视为相冲，其余则是中性。本计算器把这些传统观念转换成分数，供娱乐和思考。"],
    ["不同生肖的两个人也能相配吗？", "可以。大多数配对既不完美，也不注定失败。不同的生肖能带来有益的反差，而你们怎样沟通、怎样对待彼此，比生肖重要得多。"],
    ["为什么农历新年很重要？", "中国生肖年从农历新年开始，而不是 1 月 1 日。1 月或 2 月初出生的人可能属于上一年的生肖，所以本计算器会把每个出生日期与真实的农历新年日期作比较。"],
    ["中国生肖的五行是什么？", "木、火、土、金、水。每个生肖年对应一种五行，传统上描述五行如何相生、相克或互不干扰。"],
    ["阴阳是什么意思？", "阴和阳是中国哲学中互补的两极。生肖年在两者之间交替，传统上认为阴阳不同的两个人可以互相平衡。"],
    ["生肖配对能预测一段关系吗？", "不能。它是一种文化传统，可以作为聊天的话题，但不是预测。真正的关系取决于尊重、努力、共同的价值观和沟通。"],
    ["生肖配对可以用来选合作伙伴吗？", "很多人喜欢把它当作思考团队合作和工作方式的文化框架，但它绝不能代替尽职调查、书面协议或专业意见。"],
    ["生肖配对有科学依据吗？", "没有。没有科学证据表明生肖能预测配对。我们把它作为文化遗产和娱乐来介绍。"]
  ],
  disclaimer: "中国生肖配对基于传统文化信仰，仅供娱乐、文化探索和个人反思。它没有科学依据，不能代替专业的感情、财务或商业建议。",
  seo: [
    ["中国生肖配对如何运作", ["中国生肖是由十二种动物组成的循环：鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪。传统配对比较两个人出生年份的生肖。", "十二生肖组成四个友好的三合——鼠、龙、猴；牛、蛇、鸡；虎、马、狗；兔、羊、猪。同一三合的生肖被认为观念和能量相近，而在生肖轮上正对面的生肖被认为相冲。其余大多数配对属于中性。"]],
    ["中国生肖配对与五行", ["每个生肖年还对应五行之一：木、火、土、金或水。木生火，火生土，土生金，金生水，水生木。相生的五行被视为和谐，相克的五行被视为有挑战。", "木代表成长和创意，火代表热情和活力，土代表稳定和耐心，金代表自律和清晰，水代表适应力和直觉。"]],
    ["爱情中的生肖配对", ["人们常把生肖配对当作感情中轻松的话题，用来聊聊性情、沟通方式和期望。传统上和谐的配对不是保证，传统上的相冲也不是警告；真正的基础是两个人如何对待彼此。"]],
    ["事业中的生肖配对", ["生肖传统可以作为一种文化框架，帮助思考团队合作和工作方式——谁喜欢带头、谁注重细节、每个人对风险的感受如何。请只把它用于思考和讨论；真正的商业决定要依靠清楚的协议和专业意见。"]],
    ["为什么农历新年很重要", ["中国生肖年从农历新年开始，日期在 1 月下旬到 2 月中旬之间。如果你在 1 月或 2 月初出生，你的生肖可能是上一年的。所以本计算器会把每个出生日期与当年真实的农历新年日期作比较，而不是只用公历年份。"]]
  ]
};
