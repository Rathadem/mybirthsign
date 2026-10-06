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
  title: "ពិនិត្យគូព្រងជោគតារាសី",
  sub: "ប្រៀបធៀបថ្ងៃខែឆ្នាំកំណើតពីរ ដើម្បីដឹងពីភាពស៊ីគ្នានៃជោគតារាសីរបស់អ្នកទាំងពីរ ក្នុងស្នេហា មិត្តភាព អាជីវកម្ម និងផ្សេងទៀត។",
  desc: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតពីរ ដើម្បីស្វែងយល់ពីភាពស៊ីគ្នាតាមប្រពៃណីរាសីចក្រចិន រួមមានចរិតលក្ខណៈ ការប្រាស្រ័យទាក់ទង ទំនុកចិត្ត និងភាពសុខដុមរមនាទាំងមូល។",
  p1: "អ្នកទី ១", p2: "អ្នកទី ២", dob: "ថ្ងៃខែឆ្នាំកំណើត",
  submit: "ពិនិត្យភាពស៊ីគ្នា →",
  hint: "ត្រូវការតែថ្ងៃខែឆ្នាំកំណើតពីរប៉ុណ្ណោះ។ មិនបាច់បញ្ចូលឈ្មោះ ឬម៉ោងកំណើតទេ។",
  err_required: "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទាំងពីរ។",
  err_future: "ថ្ងៃកំណើតមិនអាចនៅថ្ងៃអនាគតបានទេ — សូមពិនិត្យកាលបរិច្ឆេទម្តងទៀត។",
  err_invalid: "កាលបរិច្ឆេទមួយមិនត្រឹមត្រូវទេ — សូមពិនិត្យម្តងទៀត។",
  result_h: "លទ្ធផលភាពស៊ីគ្នារបស់អ្នក",
  year: "ឆ្នាំរាសី", element: "ធាតុ", yy: "ភាព",
  yang: "យ៉ាង", yin: "យិន",
  score_note: "ការបកស្រាយតាមប្រពៃណីសម្រាប់កម្សាន្ត — មិនមែនការវាស់វែងតាមវិទ្យាសាស្ត្រទេ។",
  levels: ["ស៊ីគ្នាខ្លាំងណាស់", "ស៊ីគ្នាល្អណាស់", "ស៊ីគ្នាមធ្យម", "គូដែលត្រូវរីកចម្រើនរួមគ្នា", "មានបញ្ហាប្រឈម ប៉ុន្តែអាចទៅរួច"],
  cats: { love: "ភាពស៊ីគ្នាក្នុងស្នេហា", communication: "ការប្រាស្រ័យទាក់ទង", trust: "ទំនុកចិត្ត", business: "សក្តានុពលអាជីវកម្ម", friendship: "មិត្តភាព", overall: "ភាពស៊ីគ្នាទាំងមូល" },
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
    triangle: "{A} និង {B} ស្ថិតក្នុងត្រីកោណភាពស៊ីគ្នាប្រពៃណីតែមួយ ដែលជាក្រុមសុខដុមបំផុតមួយក្នុងរាសីចក្រ។",
    neutral: "{A} និង {B} ជាគូអព្យាក្រឹត — មិនមែនគូស៊ីគ្នាបុរាណ ហើយក៏មិនមែនប៉ះទង្គិចដែរ ដូច្នេះលទ្ធផលអាស្រ័យច្រើនលើរបៀបដែលអ្នកទាំងពីរទាក់ទងគ្នា។",
    clash: "{A} និង {B} ស្ថិតនៅទល់មុខគ្នាលើរង្វង់រាសីចក្រ ជាការប៉ះទង្គិចតាមប្រពៃណី ដែលនាំមកនូវភាពផ្ទុយគ្នាខ្លាំង និងការរៀនសូត្រច្រើនពីគ្នា។"
  },
  tierLine: {
    high: "អ្នកទាំងពីរមានភាពស៊ីសង្វាក់ខ្លាំង និងភាពខ្លាំងបំពេញគ្នា ជាមួយសក្តានុពលល្អក្នុងការប្រាស្រ័យទាក់ទង និងសហការ។",
    medium: "មានសក្តានុពលពិតប្រាកដនៅទីនេះ ហើយវាកាន់តែរីកលូតលាស់ នៅពេលអ្នកទាំងពីរនិយាយគ្នាបើកចំហ និងអត់ធ្មត់។",
    low: "គូនេះត្រូវការការយល់ចិត្តគ្នាបន្ថែម ប៉ុន្តែមនុស្សជាច្រើនរកឃើញថា ការខិតខំធ្វើឱ្យចំណងកាន់តែរឹងមាំ។"
  },
  elementsH: "ភាពស៊ីគ្នានៃធាតុ",
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
  loveH: "ភាពស៊ីគ្នាក្នុងស្នេហា និងទំនាក់ទំនង",
  love: {
    high: "{A} និង {B} បង្ហាញរូបភាពស្នេហាដ៏កក់ក្តៅ និងមានសង្ឃឹម។ ការបកស្រាយតាមប្រពៃណីពណ៌នាអំពីចំណងអារម្មណ៍ដែលងាយស្រួល ភាពស្នេហាដោយធម្មជាតិ និងសក្តានុពលរយៈពេលវែងល្អ ដរាបណាអ្នកទាំងពីរបន្តចំណាយពេលឱ្យគ្នា។",
    medium: "{A} និង {B} មានរូបភាពស្នេហាប្រកបដោយតុល្យភាព។ ការបកស្រាយតាមប្រពៃណីបង្ហាញថា ចំណងរីកលូតលាស់តាមរយៈការសន្ទនាបើកចំហ ផែនការរួម និងកាយវិការតូចៗជាប់លាប់។",
    low: "{A} និង {B} អាចមានអារម្មណ៍ទាក់ទាញដោយភាពផ្ទុយគ្នាក្នុងស្នេហា។ ការបកស្រាយតាមប្រពៃណីបង្ហាញថា ទំនាក់ទំនងនេះត្រូវការការអត់ធ្មត់ ការនិយាយស្មោះត្រង់ និងការគោរពភាពខុសគ្នា ហើយអាចក្លាយជាទំនាក់ទំនងដែលមានតម្លៃជ្រាលជ្រៅ។"
  },
  loveFocus: [["ចំណងអារម្មណ៍", "ចែករំលែកអារម្មណ៍ជាប្រចាំ មិនត្រឹមតែនៅពេលលំបាកទេ។"], ["ភាពស្នេហា", "កាយវិការតូចៗដែលគិតគូរ សំខាន់ជាងរបស់ធំៗ។"], ["ការប្រាស្រ័យទាក់ទង", "និយាយអ្វីដែលអ្នកត្រូវការ ហើយសួរថាបានយល់ត្រូវឬអត់។"], ["ទំនុកចិត្ត", "គោរពពាក្យសន្យា និងស្មោះត្រង់តាំងពីដើម។"], ["ឯករាជ្យ", "ចំណាប់អារម្មណ៍ផ្ទាល់ខ្លួនរបស់ម្នាក់ៗ រក្សាទំនាក់ទំនងឱ្យស្រស់ថ្លា។"], ["សក្តានុពលរយៈពេលវែង", "និយាយអំពីគោលដៅរួម ហើយពិនិត្យឡើងវិញនៅពេលជីវិតផ្លាស់ប្តូរ។"]],
  friendH: "ភាពស៊ីគ្នាក្នុងមិត្តភាព",
  friend: {
    high: "ក្នុងនាមជាមិត្ត {A} និង {B} ទំនងជារីករាយនឹងការនៅជាមួយគ្នាដោយងាយស្រួល ភក្ដីភាព និងសំណើចរួមច្រើន។ ការបកស្រាយតាមប្រពៃណីមើលឃើញថានេះជាមិត្តភាពដែលអាចស្ថិតស្ថេរ។",
    medium: "ក្នុងនាមជាមិត្ត {A} និង {B} អាចបង្កើតចំណងមិត្តភាពដ៏ជាប់លាប់ និងរីករាយ ដែលកាន់តែស៊ីជម្រៅតាមរយៈចំណាប់អារម្មណ៍រួម និងពេលវេលាជាមួយគ្នា។",
    low: "ក្នុងនាមជាមិត្ត {A} និង {B} អាចមានចង្វាក់ខុសគ្នា។ ការបកស្រាយតាមប្រពៃណីបង្ហាញថា មិត្តភាពដំណើរការល្អបំផុតជាមួយចន្លោះ ភាពស្មោះត្រង់ និងអារម្មណ៍កំប្លែងចំពោះភាពខុសគ្នា។"
  },
  friendFocus: [["ការប្រាស្រ័យទាក់ទង", "ទាក់ទងគ្នាតាមរបៀបរបស់អ្នក ទោះជីវិតមមាញឹកក៏ដោយ។"], ["ចំណាប់អារម្មណ៍រួម", "រកសកម្មភាពដែលអ្នកទាំងពីរចូលចិត្ត ហើយសាកល្បងអ្វីថ្មីៗជាមួយគ្នា។"], ["ទំនុកចិត្ត", "ពឹងពាក់បាន និងរក្សាការសម្ងាត់។"], ["ភក្ដីភាព", "នៅក្បែរគ្នាក្នុងពេលដែលសំខាន់។"], ["ថាមពលសង្គម", "គោរពនៅពេលម្នាក់ត្រូវការមិត្តភាព ហើយម្នាក់ទៀតត្រូវការភាពស្ងប់ស្ងាត់។"], ["ការដោះស្រាយការមិនចុះសម្រុង", "និយាយឱ្យលឿន រក្សាភាពសុភាព ហើយបណ្តែតរឿងតូចៗ។"]],
  bizH: "ភាពស៊ីគ្នាក្នុងអាជីវកម្ម",
  biz: {
    high: "ក្នុងអាជីវកម្ម {A} និង {B} តាមប្រពៃណីត្រូវបានមើលឃើញថាជាក្រុមដែលមានសមត្ថភាព៖ ភាពខ្លាំងបំពេញគ្នា ការសហការរលូន និងសក្តានុពលល្អក្នុងការចែករំលែកភាពជាអ្នកដឹកនាំ។",
    medium: "ក្នុងអាជីវកម្ម {A} និង {B} អាចធ្វើការបានល្អ ជាមួយតួនាទីដែលបែងចែកច្បាស់លាស់ គោលដៅរួម និងការពិនិត្យជាប្រចាំ។",
    low: "ក្នុងអាជីវកម្ម {A} និង {B} អាចមានវិធីខុសគ្នាចំពោះហានិភ័យ និងការសម្រេចចិត្ត។ កិច្ចព្រមព្រៀងច្បាស់លាស់ និងតួនាទីកំណត់ អាចប្រែភាពខុសគ្នាទាំងនោះទៅជាអត្ថប្រយោជន៍។"
  },
  bizFocus: [["ភាពជាអ្នកដឹកនាំ", "សម្រេចថាអ្នកណាដឹកនាំផ្នែកណា ហើយគោរពវា។"], ["ការងារជាក្រុម", "ប្រើភាពខ្លាំងរបស់ម្នាក់ៗឱ្យបានល្អ។"], ["ការប្រាស្រ័យទាក់ទង", "ព្រមព្រៀងលើរបៀប និងពេលវេលាដែលអ្នកធ្វើបច្ចុប្បន្នភាពគ្នា។"], ["ការសម្រេចចិត្ត", "កំណត់ដំណើរការសាមញ្ញសម្រាប់ការសម្រេចចិត្តធំៗ។"], ["ការទទួលហានិភ័យ", "ពិភាក្សាអំពីដែនកំណត់មុនពេលមានលុយពាក់ព័ន្ធ។"], ["របៀបធ្វើការ", "គោរពចង្វាក់ និងវិធីធ្វើការខុសគ្នា។"]],
  bizCta: "ស្វែងយល់ពីភាពស៊ីគ្នាដៃគូអាជីវកម្ម →",
  exploreH: "ស្វែងយល់រាសីចក្រចិនទាំង ១២",
  guidesH: "មគ្គុទ្ទេសក៍ពាក់ព័ន្ធ",
  guides: [["មគ្គុទ្ទេសក៍ភាពស៊ីគ្នារាសីចក្រចិន", "blog/zodiac-compatibility-guide.html", "របៀបយល់ពីការផ្គូផ្គងតាមប្រពៃណី។"], ["តើឆ្នាំកំណើតរបស់ខ្ញុំជាសត្វអ្វី?", "checker.html", "រកសត្វ ធាតុ និងលក្ខណៈរបស់អ្នក។"], ["សត្វរាសីចក្រចិន", "animals.html", "ស្គាល់សត្វទាំង ១២។"], ["ធាតុរាសីចក្រចិន", "animals.html", "ឈើ ភ្លើង ដី លោហធាតុ និងទឹក។"], ["ឆ្នាំរាសីចក្រចិន", "animals.html", "ឆ្នាំកំណើតសម្រាប់សត្វនីមួយៗ។"], ["ភាពស៊ីគ្នាដៃគូអាជីវកម្ម", "business-partner.html", "ប្រៀបធៀបមនុស្សពីរនាក់ជាដៃគូអាជីវកម្ម។"]],
  quickH: "ចង់ពិនិត្យរហ័សតាមសត្វរាសីចក្រចិនឬ?",
  quickIntro: "ចង់បានការផ្គូផ្គងបែបផ្កាយសាមញ្ញជាងនេះឬ? សូមប្រើការពិនិត្យរហ័សខាងក្រោម។",
  faqH: "សំណួរដែលសួរញឹកញាប់",
  faq: [
    ["តើភាពស៊ីគ្នារាសីចក្រចិនត្រូវបានគណនាយ៉ាងដូចម្តេច?", "ភាពស៊ីគ្នាតាមប្រពៃណីប្រៀបធៀបសត្វរាសីរបស់មនុស្សពីរនាក់ បន្ទាប់មកធាតុ និងភាពយិន ឬយ៉ាងនៃឆ្នាំរាសីរបស់ពួកគេ។ សត្វក្នុងត្រីកោណតែមួយត្រូវបានចាត់ទុកថាសុខដុមដោយធម្មជាតិ សត្វទល់មុខគ្នាត្រូវបានចាត់ទុកថាប៉ះទង្គិច ហើយផ្សេងទៀតអព្យាក្រឹត។ កម្មវិធីនេះបំប្លែងគំនិតប្រពៃណីទាំងនេះទៅជាពិន្ទុសម្រាប់កម្សាន្ត និងការគិតពិចារណា។"],
    ["តើមនុស្សពីរនាក់ដែលមានរាសីខុសគ្នាអាចស៊ីគ្នាបានទេ?", "បាន។ គូភាគច្រើនមិនល្អឥតខ្ចោះ ហើយក៏មិនមែនអាក្រក់ទាំងស្រុងដែរ។ រាសីខុសគ្នាអាចនាំមកនូវភាពផ្ទុយគ្នាដែលមានប្រយោជន៍ ហើយរបៀបដែលអ្នកប្រាស្រ័យទាក់ទង និងប្រព្រឹត្តចំពោះគ្នាសំខាន់ជាងសត្វឆ្ងាយណាស់។"],
    ["ហេតុអ្វីបានជាចូលឆ្នាំចិនសំខាន់?", "ឆ្នាំរាសីចិនចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចិន មិនមែនថ្ងៃទី ១ មករាទេ។ អ្នកដែលកើតនៅខែមករា ឬដើមខែកុម្ភៈ អាចជាកម្មសិទ្ធិរបស់ឆ្នាំសត្វមុន ដូច្នេះកម្មវិធីនេះពិនិត្យថ្ងៃកំណើតនីមួយៗជាមួយកាលបរិច្ឆេទចូលឆ្នាំចិនពិតប្រាកដ។"],
    ["តើធាតុទាំងប្រាំនៃរាសីចក្រចិនជាអ្វីខ្លះ?", "ឈើ ភ្លើង ដី លោហធាតុ និងទឹក។ ឆ្នាំរាសីនីមួយៗមានធាតុមួយ ហើយប្រពៃណីពណ៌នាអំពីរបៀបដែលធាតុចិញ្ចឹម ទប់ទល់ ឬនៅអព្យាក្រឹតក្បែរគ្នា។"],
    ["តើយិន និងយ៉ាងមានន័យយ៉ាងណា?", "យិន និងយ៉ាងជាភាពបំពេញគ្នាក្នុងទស្សនវិជ្ជាចិន។ ឆ្នាំរាសីជំនួសគ្នារវាងពួកវា ហើយមនុស្សពីរនាក់ដែលមានភាពខុសគ្នា តាមប្រពៃណីត្រូវបានគេនិយាយថាធ្វើតុល្យភាពគ្នា។"],
    ["តើភាពស៊ីគ្នារាសីចក្រចិនអាចទស្សន៍ទាយទំនាក់ទំនងបានទេ?", "ទេ។ វាជាប្រពៃណីវប្បធម៌ដែលផ្តល់ប្រធានបទសន្ទនា មិនមែនការទស្សន៍ទាយទេ។ ទំនាក់ទំនងពិតអាស្រ័យលើការគោរព ការខិតខំ តម្លៃរួម និងការប្រាស្រ័យទាក់ទង។"],
    ["តើអាចប្រើភាពស៊ីគ្នារាសីសម្រាប់ដៃគូអាជីវកម្មបានទេ?", "មនុស្សជាច្រើនចូលចិត្តប្រើវាជាក្របខ័ណ្ឌវប្បធម៌ សម្រាប់គិតអំពីការងារជាក្រុម និងរបៀបធ្វើការ ប៉ុន្តែវាមិនគួរជំនួសការត្រួតពិនិត្យ កិច្ចសន្យាជាលាយលក្ខណ៍អក្សរ ឬដំបូន្មានអ្នកជំនាញឡើយ។"],
    ["តើភាពស៊ីគ្នារាសីចក្រចិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រឬទេ?", "ទេ។ គ្មានភស្តុតាងវិទ្យាសាស្ត្រថារាសីអាចទស្សន៍ទាយភាពស៊ីគ្នាបានទេ។ យើងបង្ហាញវាជាបេតិកភណ្ឌវប្បធម៌ និងការកម្សាន្ត។"]
  ],
  disclaimer: "ភាពស៊ីគ្នារាសីចក្រចិនផ្អែកលើជំនឿវប្បធម៌ប្រពៃណី ហើយត្រូវបានផ្តល់ជូនសម្រាប់ការកម្សាន្ត ការស្វែងយល់វប្បធម៌ និងការឆ្លុះបញ្ចាំងផ្ទាល់ខ្លួន។ វាមិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ ហើយមិនគួរប្រើជំនួសដំបូន្មានអ្នកជំនាញផ្នែកទំនាក់ទំនង ហិរញ្ញវត្ថុ ឬអាជីវកម្មឡើយ។",
  seo: [
    ["របៀបដែលភាពស៊ីគ្នារាសីចក្រចិនដំណើរការ", ["រាសីចក្រចិនជាវដ្តដដែលៗនៃសត្វ ១២៖ ជូត ឆ្លូវ ខាល ថោះ រោង ម្សាញ់ មមី មមែ វក រកា ច កុរ។ ភាពស៊ីគ្នាតាមប្រពៃណីប្រៀបធៀបសត្វនៃឆ្នាំកំណើតរបស់មនុស្សពីរនាក់។", "សត្វទាំង ១២ បង្កើតជាត្រីកោណសុខដុមបួន — ជូត រោង វក; ឆ្លូវ ម្សាញ់ រកា; ខាល មមី ច; ថោះ មមែ កុរ។ សញ្ញាក្នុងត្រីកោណតែមួយត្រូវបានគេនិយាយថាមានទស្សនៈ និងថាមពលស្រដៀងគ្នា ចំណែកសញ្ញាដែលទល់មុខគ្នាត្រូវបានគេនិយាយថាប៉ះទង្គិចគ្នា។ គូផ្សេងទៀតភាគច្រើនអព្យាក្រឹត។"]],
    ["ភាពស៊ីគ្នារាសីចក្រចិន និងធាតុទាំងប្រាំ", ["ឆ្នាំរាសីនីមួយៗក៏មានធាតុមួយក្នុងចំណោមធាតុទាំងប្រាំ៖ ឈើ ភ្លើង ដី លោហធាតុ ឬទឹក។ ឈើចិញ្ចឹមភ្លើង ភ្លើងបង្កើតដី ដីបង្កើតលោហធាតុ លោហធាតុនាំទឹក ហើយទឹកចិញ្ចឹមឈើ។ ធាតុដែលចិញ្ចឹមគ្នាត្រូវបានចាត់ទុកថាសុខដុម ចំណែកធាតុដែលទប់ទល់គ្នាត្រូវបានចាត់ទុកថាមានបញ្ហាប្រឈម។", "ឈើតំណាងឱ្យការលូតលាស់ និងភាពច្នៃប្រឌិត ភ្លើងតំណាងឱ្យចំណង់ និងថាមពល ដីតំណាងឱ្យស្ថិរភាព និងការអត់ធ្មត់ លោហធាតុតំណាងឱ្យវិន័យ និងភាពច្បាស់លាស់ ហើយទឹកតំណាងឱ្យភាពបត់បែន និងវិចារណញាណ។"]],
    ["ភាពស៊ីគ្នារាសីចក្រចិនក្នុងស្នេហា", ["មនុស្សតែងប្រើភាពស៊ីគ្នារាសីជាប្រធានបទសន្ទនាស្រាលៗក្នុងទំនាក់ទំនង ដើម្បីនិយាយអំពីចរិត របៀបប្រាស្រ័យទាក់ទង និងការរំពឹងទុក។ គូដែលសុខដុមតាមប្រពៃណីមិនមែនជាការសន្យាទេ ហើយការប៉ះទង្គិចតាមប្រពៃណីក៏មិនមែនជាការព្រមានដែរ ព្រោះមូលដ្ឋានពិតគឺរបៀបដែលមនុស្សពីរនាក់ប្រព្រឹត្តចំពោះគ្នា។"]],
    ["ភាពស៊ីគ្នារាសីចក្រចិនក្នុងអាជីវកម្ម", ["ប្រពៃណីរាសីអាចបម្រើជាក្របខ័ណ្ឌវប្បធម៌សម្រាប់គិតអំពីការងារជាក្រុម និងរបៀបធ្វើការ — អ្នកណាចូលចិត្តដឹកនាំ អ្នកណាចូលចិត្តលម្អិត និងម្នាក់ៗមានអារម្មណ៍យ៉ាងណាចំពោះហានិភ័យ។ សូមប្រើវាសម្រាប់ការគិត និងពិភាក្សាតែប៉ុណ្ណោះ ហើយពឹងលើកិច្ចព្រមព្រៀងច្បាស់លាស់ និងដំបូន្មានអ្នកជំនាញសម្រាប់ការសម្រេចចិត្តអាជីវកម្មពិតប្រាកដ។"]],
    ["ហេតុអ្វីបានជាចូលឆ្នាំចិនសំខាន់", ["ឆ្នាំរាសីចិនចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចិន ដែលធ្លាក់នៅចន្លោះចុងខែមករា និងពាក់កណ្តាលខែកុម្ភៈ។ ប្រសិនបើអ្នកកើតនៅខែមករា ឬដើមខែកុម្ភៈ សត្វរបស់អ្នកអាចជាសត្វនៃឆ្នាំមុន។ នោះជាមូលហេតុដែលកម្មវិធីនេះប្រៀបធៀបថ្ងៃកំណើតនីមួយៗជាមួយកាលបរិច្ឆេទចូលឆ្នាំចិនពិតប្រាកដនៃឆ្នាំនោះ ជំនួសឱ្យការប្រើតែឆ្នាំគ្រិស្តសករាជ។"]]
  ]
}
};
