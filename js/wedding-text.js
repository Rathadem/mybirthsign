// wedding-text.js — English + Khmer copy for the redesigned Wedding Date page.
// Everything is framed as traditional / cultural / entertainment guidance.
// NOTE: the Khmer text should be reviewed by a native speaker.
const WED_TEXT = {
en: {
  title: "Chinese Zodiac Wedding Date Calculator",
  sub: "Find traditionally favorable wedding months based on both partners' Chinese zodiac signs.",
  support: "Enter both birth dates and your planned wedding year to explore traditionally favorable months and dates based on Chinese zodiac patterns.",
  formH: "Find Your Wedding Date",
  p1: "Partner 1 Date of Birth", p2: "Partner 2 Date of Birth",
  yearL: "Wedding Year", regionL: "General Climate Region",
  submit: "Find Best Wedding Dates →",
  hint: "No names or birth time needed. Everything is calculated in your browser.",
  guideH: "Your Wedding Date Guide",
  partner1: "Partner 1", partner2: "Partner 2",
  year: "Zodiac year", element: "Element", yy: "Polarity", yang: "Yang", yin: "Yin", traitsL: "Traditional characteristics",
  harmonyH: "Overall Wedding Harmony",
  levels: ["Excellent Harmony", "Very Good Harmony", "Balanced Harmony", "Growth-Oriented Harmony"],
  harmonyNote: "A traditional interpretation for entertainment. It is not a prediction of marriage success.",
  monthsH: "Best Wedding Months for {year}",
  monthsSub: "Each month has a traditional animal. A month rates higher when its animal is a natural match for both of you.",
  rate: { excellent: "Excellent", good: "Favorable", workable: "Neutral", avoid: "Take Care" },
  rateNote: {
    excellent: "Very favorable for marriage.",
    good: "Supportive energy for a union.",
    workable: "Average energy; works well in practice.",
    avoid: "Traditionally one to approach with care."
  },
  rateFull: {
    excellent: "This month's animal is a natural match for both of you, which tradition counts as one of the best arrangements.",
    good: "This month's animal is a natural match for one of you and neutral for the other, a generally supportive month.",
    workable: "Neither a clash nor a natural match for either of you, so a workable, low-friction month.",
    avoid: "This month's animal clashes with at least one of your signs, so tradition suggests extra care."
  },
  datesH: "Recommended Wedding Dates",
  datesSub: "Saturdays in your best months. These are practical suggestions from the month pattern, not individual lucky days.",
  datesNone: "No month stands out on both zodiac and season this year. The full month-by-month table below still shows workable options.",
  tableH: "Full month-by-month details",
  colMonth: "Month", colAnimal: "Month's animal", colRating: "Rating", colWhy: "Why", colSeason: "Typical season", colHol: "Nearby holidays",
  whyH: "Why These Wedding Dates?",
  whyIntro: "The calculator uses traditional patterns only. Here is exactly what goes into each result.",
  why: [
    ["Chinese zodiac animals", "Each partner's birth date is checked against the real Lunar New Year date to find their animal. Each month also carries a traditional animal."],
    ["Month ratings", "A month rates Excellent when its animal sits in the same compatibility triangle as both of you, and Take Care when it clashes with either of you."],
    ["Zodiac elements", "Wood, Fire, Earth, Metal and Water feed into the overall harmony figure, based on whether your elements nourish or restrain each other."],
    ["Yin and Yang", "Zodiac years alternate between Yin and Yang. Different polarities add a little balance to the harmony figure."],
    ["Wedding year", "The year you choose sets the calendar months and Saturdays shown, plus nearby holidays such as Lunar New Year."],
    ["Traditional, not scientific", "These are cultural interpretations. Treat them as a starting point for conversation, not a rule."]
  ],
  planH: "Wedding Date Planning Guidelines",
  plan: [
    ["Consider Both Partners", "Choose a date that works well for both people."],
    ["Consider Family Traditions", "Some families may follow additional cultural traditions."],
    ["Check Venue Availability", "A favorable traditional date still needs to work practically."],
    ["Consider Weather", "Use the selected climate region when planning outdoor events."],
    ["Consider Your Guests", "Make sure the date is convenient for important family members and guests."],
    ["Make the Final Decision Together", "The calculator should be a starting point, not the only factor."]
  ],
  toolsH: "Related Tools",
  tools: [
    ["Chinese Zodiac Checker", "Check your Chinese zodiac sign.", "checker.html"],
    ["Compatibility Calculator", "Compare two birth dates.", "compatibility.html"],
    ["Business Partner Compatibility", "Explore traditional business compatibility.", "business-partner.html"],
    ["Chinese Zodiac Guide", "Learn about all 12 zodiac animals.", "animals.html"]
  ],
  faqH: "Frequently Asked Questions",
  faq: [
    ["How does the Chinese zodiac wedding date calculator work?", "It finds each partner's zodiac animal from their birth date, then rates each month of your wedding year by how that month's traditional animal relates to both of your animals. It also shows an overall harmony figure from your animals, elements and Yin/Yang."],
    ["Why do both partners' birthdays matter?", "A month is only rated well when it suits both of you. A month that matches one partner but clashes with the other is rated lower."],
    ["Why does the wedding year matter?", "The year decides which calendar months and Saturdays are shown, and which holidays fall nearby. The zodiac year also changes at Lunar New Year, so planning around it can matter."],
    ["Does the Chinese Lunar New Year affect the calculation?", "Yes for birth dates: someone born in January or early February may belong to the previous animal year, so each birth date is checked against the actual Lunar New Year date."],
    ["Can the calculator recommend a specific wedding date?", "It suggests Saturdays within your best months. It does not claim individual lucky days, because the tool does not calculate lunar day-by-day calendars."],
    ["Are Chinese zodiac wedding dates scientifically proven?", "No. They are a cultural tradition, shared here for entertainment and reflection. No scientific evidence shows that a wedding month affects a marriage."],
    ["Should I use the recommended date as the only factor when choosing my wedding date?", "No. Venue, budget, weather, family and guests matter far more in practice. Use the result as one input and decide together."]
  ],
  disclaimer: "Chinese zodiac wedding-date recommendations are based on traditional cultural interpretations and are provided for entertainment, cultural exploration, and personal reflection. They are not scientifically proven and should not be considered a guarantee of marriage success or a substitute for practical wedding planning.",
  errDates: "Please enter both dates of birth.",
  errFuture: "Birth dates can't be in the future. Please check the dates entered.",
  noHol: "—",
  suggested: "Suggested Saturdays",
  shareHeading: "Wedding months for {year}",
  starsLabel: "{n} out of 5 stars"
},
km: {
  title: "ម៉ាស៊ីនគណនាថ្ងៃមង្គលការតាមជោគជតារាសី",
  sub: "ស្វែងរកខែមង្គលការដែលល្អតាមប្រពៃណី ដោយផ្អែកលើរាសីឆ្នាំរបស់អ្នកទាំងពីរ។",
  support: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតទាំងពីរ និងឆ្នាំដែលអ្នកគ្រោងរៀបការ ដើម្បីស្វែងយល់ពីខែ និងថ្ងៃដែលល្អតាមប្រពៃណីជោគជតារាសី។",
  formH: "ស្វែងរកថ្ងៃមង្គលការរបស់អ្នក",
  p1: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទី 1", p2: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទី 2",
  yearL: "ឆ្នាំរៀបការ", regionL: "តំបន់អាកាសធាតុទូទៅ",
  submit: "ស្វែងរកថ្ងៃមង្គលការល្អបំផុត →",
  hint: "មិនត្រូវការឈ្មោះ ឬម៉ោងកំណើតទេ។ ការគណនាធ្វើនៅក្នុងកម្មវិធីរុករករបស់អ្នក។",
  guideH: "មគ្គុទ្ទេសក៍ថ្ងៃមង្គលការរបស់អ្នក",
  partner1: "អ្នកទី 1", partner2: "អ្នកទី 2",
  year: "ឆ្នាំរាសី", element: "ធាតុ", yy: "យិន/យ៉ាង", yang: "យ៉ាង", yin: "យិន", traitsL: "លក្ខណៈតាមប្រពៃណី",
  harmonyH: "ភាពជាគូសរុបសម្រាប់ពិធីមង្គលការ",
  levels: ["ភាពជាគូល្អប្រសើរបំផុត", "ភាពជាគូល្អណាស់", "ភាពជាគូមធ្យម", "ភាពជាគូដែលត្រូវការខិតខំ"],
  harmonyNote: "ជាការបកស្រាយតាមប្រពៃណីសម្រាប់កម្សាន្ត មិនមែនជាការទស្សន៍ទាយភាពជោគជ័យនៃអាពាហ៍ពិពាហ៍ទេ។",
  monthsH: "ខែមង្គលការល្អបំផុតសម្រាប់ឆ្នាំ {year}",
  monthsSub: "ខែនីមួយៗមានសត្វតាមប្រពៃណី។ ខែមួយទទួលបានការវាយតម្លៃខ្ពស់ ពេលសត្វរបស់ខែនោះស៊ីសង្វាក់ជាមួយអ្នកទាំងពីរ។",
  rate: { excellent: "ល្អប្រសើរបំផុត", good: "ល្អប្រសើរ", workable: "មធ្យម", avoid: "ត្រូវប្រុងប្រយ័ត្ន" },
  rateNote: {
    excellent: "ល្អខ្លាំងសម្រាប់ពិធីមង្គលការ។",
    good: "មានថាមពលជួយជ្រោមជ្រែងដល់ការរួមរស់។",
    workable: "ថាមពលមធ្យម ប៉ុន្តែអាចប្រើបានល្អ។",
    avoid: "តាមប្រពៃណីគួរប្រុងប្រយ័ត្នបន្ថែម។"
  },
  rateFull: {
    excellent: "សត្វរបស់ខែនេះស៊ីសង្វាក់នឹងរាសីរបស់អ្នកទាំងពីរ ដែលប្រពៃណីរាប់ថាជាការផ្គួបផ្គងល្អបំផុតមួយ។",
    good: "សត្វរបស់ខែនេះស៊ីសង្វាក់នឹងរាសីរបស់ម្នាក់ ហើយអព្យាក្រឹតចំពោះម្នាក់ទៀត ជាខែដែលជួយជ្រោមជ្រែងជាទូទៅ។",
    workable: "មិនមែនជាការប្រឆាំង ហើយក៏មិនមែនជាការស៊ីសង្វាក់ជាមួយអ្នកណាម្នាក់ទេ ដូច្នេះជាខែដែលអាចប្រើបាន ហើយមិនសូវមានការតានតឹង។",
    avoid: "សត្វរបស់ខែនេះប្រឆាំងនឹងរាសីរបស់យ៉ាងហោចណាស់ម្នាក់ ដូច្នេះប្រពៃណីណែនាំឱ្យប្រុងប្រយ័ត្នបន្ថែម។"
  },
  datesH: "ថ្ងៃមង្គលការដែលបានណែនាំ",
  datesSub: "ថ្ងៃសៅរ៍ក្នុងខែដែលល្អបំផុតរបស់អ្នក។ ទាំងនេះជាការណែនាំជាក់ស្តែងពីលំនាំខែ មិនមែនជាថ្ងៃសំណាងរៀងៗខ្លួនទេ។",
  datesNone: "មិនមានខែណាលេចធ្លោទាំងខាងរាសី និងរដូវនៅឆ្នាំនេះទេ។ តារាងលម្អិតតាមខែខាងក្រោមនៅតែបង្ហាញជម្រើសដែលអាចប្រើបាន។",
  tableH: "ព័ត៌មានលម្អិតតាមខែ",
  colMonth: "ខែ", colAnimal: "សត្វប្រចាំខែ", colRating: "ការវាយតម្លៃ", colWhy: "មូលហេតុ", colSeason: "រដូវកាលធម្មតា", colHol: "ថ្ងៃបុណ្យនៅជិត",
  whyH: "ហេតុអ្វីបានជាថ្ងៃមង្គលការទាំងនេះ?",
  whyIntro: "ម៉ាស៊ីនគណនានេះប្រើតែលំនាំតាមប្រពៃណីប៉ុណ្ណោះ។ នេះជាអ្វីដែលប្រើក្នុងលទ្ធផលនីមួយៗ។",
  why: [
    ["សត្វជោគជតារាសី", "ថ្ងៃកំណើតរបស់អ្នកនីមួយៗត្រូវបានប្រៀបធៀបជាមួយថ្ងៃចូលឆ្នាំចិនពិតប្រាកដ ដើម្បីរកសត្វរាសី។ ខែនីមួយៗក៏មានសត្វតាមប្រពៃណីដែរ។"],
    ["ការវាយតម្លៃខែ", "ខែមួយទទួលបានការវាយតម្លៃល្អប្រសើរបំផុត ពេលសត្វរបស់ខែនោះស្ថិតក្នុងត្រីកោណភាពជាគូតែមួយជាមួយអ្នកទាំងពីរ ហើយត្រូវប្រុងប្រយ័ត្ន ពេលវាប្រឆាំងនឹងរាសីរបស់អ្នកណាម្នាក់។"],
    ["ធាតុរាសី", "ឈើ ភ្លើង ដី លោហធាតុ និងទឹក ត្រូវបានប្រើក្នុងតួលេខភាពជាគូសរុប ដោយមើលថាធាតុរបស់អ្នកទាំងពីរចិញ្ចឹមគ្នា ឬទប់គ្នា។"],
    ["យិន និងយ៉ាង", "ឆ្នាំរាសីជំនួសគ្នារវាងយិន និងយ៉ាង។ យិន-យ៉ាងខុសគ្នាបន្ថែមតុល្យភាពបន្តិចបន្តួចក្នុងតួលេខភាពជាគូ។"],
    ["ឆ្នាំរៀបការ", "ឆ្នាំដែលអ្នកជ្រើសកំណត់ខែ និងថ្ងៃសៅរ៍ដែលបង្ហាញ ព្រមទាំងថ្ងៃបុណ្យនៅជិតៗ ដូចជាចូលឆ្នាំចិន។"],
    ["តាមប្រពៃណី មិនមែនតាមវិទ្យាសាស្ត្រ", "ទាំងនេះជាការបកស្រាយតាមវប្បធម៌។ សូមចាត់ទុកវាជាចំណុចចាប់ផ្តើមនៃការពិភាក្សា មិនមែនជាច្បាប់ទេ។"]
  ],
  planH: "ការណែនាំសម្រាប់ការរៀបចំថ្ងៃមង្គលការ",
  plan: [
    ["ពិចារណាអ្នកទាំងពីរ", "ជ្រើសរើសថ្ងៃដែលសមស្របល្អសម្រាប់មនុស្សទាំងពីរនាក់។"],
    ["ពិចារណាប្រពៃណីគ្រួសារ", "គ្រួសារខ្លះអាចធ្វើតាមប្រពៃណីវប្បធម៌បន្ថែម។"],
    ["ពិនិត្យថាកន្លែងរៀបការទំនេរឬទេ", "ថ្ងៃល្អតាមប្រពៃណីនៅតែត្រូវតែអាចប្រើបានក្នុងការអនុវត្តជាក់ស្តែង។"],
    ["ពិចារណាអាកាសធាតុ", "ប្រើតំបន់អាកាសធាតុដែលបានជ្រើស នៅពេលរៀបចំពិធីនៅខាងក្រៅ។"],
    ["ពិចារណាភ្ញៀវរបស់អ្នក", "ត្រូវប្រាកដថាថ្ងៃនោះងាយស្រួលសម្រាប់សាច់ញាតិសំខាន់ៗ និងភ្ញៀវ។"],
    ["សម្រេចចិត្តចុងក្រោយរួមគ្នា", "ម៉ាស៊ីនគណនាគួរជាចំណុចចាប់ផ្តើម មិនមែនជាកត្តាតែមួយគត់ទេ។"]
  ],
  toolsH: "ឧបករណ៍ដែលពាក់ព័ន្ធ",
  tools: [
    ["ពិនិត្យជោគជតារាសី", "ពិនិត្យជោគជតារាសីរបស់អ្នក។", "checker.html"],
    ["ពិនិត្យគូព្រងជោគជតារាសី", "ប្រៀបធៀបថ្ងៃខែឆ្នាំកំណើតពីរ។", "compatibility.html"],
    ["ភាពជាគូសម្រាប់ដៃគូអាជីវកម្ម", "ស្វែងយល់ពីភាពជាគូអាជីវកម្មតាមប្រពៃណី។", "business-partner.html"],
    ["មគ្គុទ្ទេសក៍ជោគជតារាសី", "ស្វែងយល់អំពីសត្វរាសីទាំង 12។", "animals.html"]
  ],
  faqH: "សំណួរដែលសួរញឹកញាប់",
  faq: [
    ["តើម៉ាស៊ីនគណនាថ្ងៃមង្គលការតាមជោគជតារាសីដំណើរការយ៉ាងដូចម្តេច?", "វារកសត្វរាសីរបស់អ្នកនីមួយៗពីថ្ងៃកំណើត ហើយវាយតម្លៃខែនីមួយៗក្នុងឆ្នាំរៀបការ ដោយមើលថាសត្វតាមប្រពៃណីរបស់ខែនោះទាក់ទងនឹងសត្វរបស់អ្នកទាំងពីរយ៉ាងដូចម្តេច។ វាក៏បង្ហាញតួលេខភាពជាគូសរុប ពីសត្វ ធាតុ និងយិន-យ៉ាងរបស់អ្នកដែរ។"],
    ["ហេតុអ្វីបានជាថ្ងៃកំណើតរបស់អ្នកទាំងពីរសំខាន់?", "ខែមួយទទួលបានការវាយតម្លៃល្អ ពេលវាសមស្របនឹងអ្នកទាំងពីរ។ ខែដែលស៊ីសង្វាក់នឹងម្នាក់ ប៉ុន្តែប្រឆាំងនឹងម្នាក់ទៀត នឹងទទួលបានការវាយតម្លៃទាបជាង។"],
    ["ហេតុអ្វីបានជាឆ្នាំរៀបការសំខាន់?", "ឆ្នាំកំណត់ថាខែ និងថ្ងៃសៅរ៍ណាត្រូវបង្ហាញ ហើយថ្ងៃបុណ្យណាស្ថិតនៅជិត។ ឆ្នាំរាសីក៏ប្រែនៅថ្ងៃចូលឆ្នាំចិនដែរ ដូច្នេះការរៀបចំផែនការជុំវិញថ្ងៃនោះអាចសំខាន់។"],
    ["តើថ្ងៃចូលឆ្នាំចិនមានឥទ្ធិពលលើការគណនាទេ?", "មាន សម្រាប់ថ្ងៃកំណើត៖ អ្នកដែលកើតក្នុងខែមករា ឬដើមខែកុម្ភៈ អាចជាសត្វរាសីនៃឆ្នាំមុន ដូច្នេះថ្ងៃកំណើតនីមួយៗត្រូវបានប្រៀបធៀបជាមួយថ្ងៃចូលឆ្នាំចិនពិតប្រាកដ។"],
    ["តើម៉ាស៊ីនគណនាអាចណែនាំថ្ងៃមង្គលការជាក់លាក់បានទេ?", "វាណែនាំថ្ងៃសៅរ៍ក្នុងខែដែលល្អបំផុតរបស់អ្នក។ វាមិនអះអាងអំពីថ្ងៃសំណាងរៀងៗខ្លួនទេ ព្រោះឧបករណ៍នេះមិនគណនាប្រតិទិនចន្ទគតិតាមថ្ងៃទេ។"],
    ["តើថ្ងៃមង្គលការតាមជោគជតារាសីត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រឬទេ?", "ទេ។ វាជាប្រពៃណីវប្បធម៌ ដែលចែករំលែកនៅទីនេះសម្រាប់កម្សាន្ត និងការឆ្លុះបញ្ចាំង។ គ្មានភស្តុតាងវិទ្យាសាស្ត្រថាខែរៀបការមានឥទ្ធិពលលើអាពាហ៍ពិពាហ៍ទេ។"],
    ["តើខ្ញុំគួរប្រើថ្ងៃដែលបានណែនាំជាកត្តាតែមួយគត់ក្នុងការជ្រើសថ្ងៃមង្គលការឬទេ?", "ទេ។ កន្លែងរៀបការ ថវិកា អាកាសធាតុ គ្រួសារ និងភ្ញៀវសំខាន់ជាងច្រើនក្នុងការអនុវត្តជាក់ស្តែង។ សូមប្រើលទ្ធផលជាកត្តាមួយ ហើយសម្រេចចិត្តរួមគ្នា។"]
  ],
  disclaimer: "ការណែនាំថ្ងៃមង្គលការតាមជោគជតារាសីផ្អែកលើការបកស្រាយវប្បធម៌តាមប្រពៃណី ហើយត្រូវបានផ្តល់ជូនសម្រាប់កម្សាន្ត ការស្វែងយល់វប្បធម៌ និងការឆ្លុះបញ្ចាំងផ្ទាល់ខ្លួន។ វាមិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ ហើយមិនគួរចាត់ទុកថាជាការធានាភាពជោគជ័យនៃអាពាហ៍ពិពាហ៍ ឬជំនួសការរៀបចំផែនការមង្គលការជាក់ស្តែងបានឡើយ។",
  errDates: "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតទាំងពីរ។",
  errFuture: "ថ្ងៃកំណើតមិនអាចនៅអនាគតបានទេ។ សូមពិនិត្យថ្ងៃដែលបានបញ្ចូលឡើងវិញ។",
  noHol: "—",
  suggested: "ថ្ងៃសៅរ៍ដែលបានណែនាំ",
  shareHeading: "ខែមង្គលការសម្រាប់ឆ្នាំ {year}",
  starsLabel: "{n} ផ្កាយក្នុងចំណោម 5"
}
};

// Simplified Chinese (zh)
WED_TEXT.zh = {
  title: "生肖结婚吉日计算器",
  sub: "根据双方的中国生肖，找出传统上适合结婚的月份。",
  support: "输入双方的出生日期和计划结婚的年份，根据中国生肖规律，查看传统上适合结婚的月份和日期。",
  formH: "寻找你们的结婚日期",
  p1: "第一位伴侣的出生日期", p2: "第二位伴侣的出生日期",
  yearL: "结婚年份", regionL: "大致气候区",
  submit: "查找最佳结婚日期 →",
  hint: "不需要姓名或出生时间。所有计算都在你的浏览器中完成。",
  guideH: "你们的结婚日期指南",
  partner1: "第一位伴侣", partner2: "第二位伴侣",
  year: "生肖年", element: "五行", yy: "阴阳", yang: "阳", yin: "阴", traitsL: "传统特点",
  harmonyH: "整体婚姻和谐度",
  levels: ["非常和谐", "很和谐", "平衡和谐", "需共同成长的和谐"],
  harmonyNote: "传统解读，仅供娱乐，不能预测婚姻是否成功。",
  monthsH: "{year} 年最佳结婚月份",
  monthsSub: "每个月都有一个传统生肖。当月生肖与你们两人都相合时，评分会更高。",
  rate: { excellent: "极佳", good: "吉", workable: "中性", avoid: "需谨慎" },
  rateNote: {
    excellent: "非常适合结婚。",
    good: "对婚姻有助力的能量。",
    workable: "能量一般；实际上可行。",
    avoid: "传统上需要谨慎对待。"
  },
  rateFull: {
    excellent: "本月生肖与你们两人都天然相合，传统上被视为最好的安排之一。",
    good: "本月生肖与其中一人天然相合，与另一人中性，总体上是有助力的月份。",
    workable: "与你们两人既不相冲也不相合，是可行、少摩擦的月份。",
    avoid: "本月生肖与你们至少一人相冲，所以传统上建议多加小心。"
  },
  datesH: "推荐结婚日期",
  datesSub: "你们最佳月份中的星期六。这些是根据月份规律给出的实用建议，并不是单日的吉日。",
  datesNone: "今年没有在生肖和季节两方面都特别突出的月份。下面完整的逐月表格仍然有可行的选择。",
  tableH: "完整逐月详情",
  colMonth: "月份", colAnimal: "当月生肖", colRating: "评分", colWhy: "原因", colSeason: "一般季节", colHol: "附近节日",
  whyH: "为什么是这些结婚日期？",
  whyIntro: "本计算器只使用传统规律。下面清楚列出每个结果是怎么得出的。",
  why: [
    ["中国生肖", "把每位伴侣的出生日期与真实的农历新年日期比较，找出他们的生肖。每个月也有一个传统生肖。"],
    ["月份评分", "当月生肖与你们两人属于同一三合时评为“极佳”，与任一人相冲时评为“需谨慎”。"],
    ["生肖五行", "木、火、土、金、水会计入整体和谐度，取决于你们的五行是相生还是相克。"],
    ["阴阳", "生肖年在阴和阳之间交替。阴阳不同会为和谐度增加一点平衡。"],
    ["结婚年份", "你选择的年份决定显示哪些月份和星期六，以及附近的节日，例如农历新年。"],
    ["传统，而非科学", "这些是文化解读。请把它们当作讨论的起点，而不是规则。"]
  ],
  planH: "结婚日期规划建议",
  plan: [
    ["考虑双方", "选择对两个人都合适的日期。"],
    ["考虑家庭传统", "有些家庭可能还会遵循其他文化传统。"],
    ["确认场地档期", "传统上的好日子也需要在实际上行得通。"],
    ["考虑天气", "规划户外活动时，参考所选的气候区。"],
    ["考虑宾客", "确保这个日期对重要的家人和宾客都方便。"],
    ["一起做最后决定", "计算器只是起点，不应该是唯一的因素。"]
  ],
  toolsH: "相关工具",
  tools: [
    ["生肖查询", "查询你的中国生肖。", "checker.html"],
    ["配对计算器", "比较两个出生日期。", "compatibility.html"],
    ["合作伙伴配对", "了解传统的商业配对。", "business-partner.html"],
    ["生肖指南", "了解全部十二生肖。", "animals.html"]
  ],
  faqH: "常见问题",
  faq: [
    ["生肖结婚吉日计算器是怎么运作的？", "它根据每位伴侣的出生日期找出他们的生肖，再根据结婚年份中每个月的传统生肖与你们两人生肖的关系，为每个月评分。它还会根据你们的生肖、五行和阴阳，显示整体和谐度。"],
    ["为什么双方的生日都重要？", "只有对你们两人都合适的月份才会评分高。与一方相合、与另一方相冲的月份评分会较低。"],
    ["为什么结婚年份很重要？", "年份决定显示哪些月份和星期六，以及附近有哪些节日。生肖年也在农历新年更换，所以围绕它来规划可能很重要。"],
    ["农历新年会影响计算吗？", "对出生日期会：1 月或 2 月初出生的人可能属于上一年的生肖，所以每个出生日期都会与真实的农历新年日期比较。"],
    ["计算器能推荐具体的结婚日期吗？", "它会建议你们最佳月份中的星期六。它不会声称哪一天是吉日，因为本工具不计算逐日的农历黄历。"],
    ["生肖结婚吉日有科学依据吗？", "没有。它们是一种文化传统，在这里用于娱乐和思考。没有科学证据表明结婚月份会影响婚姻。"],
    ["选择结婚日期时，只看推荐日期就可以吗？", "不行。实际上，场地、预算、天气、家人和宾客重要得多。把结果当作参考之一，一起做决定。"]
  ],
  disclaimer: "生肖结婚吉日推荐基于传统文化解读，仅供娱乐、文化探索和个人反思。它们没有科学依据，不能保证婚姻成功，也不能代替实际的婚礼规划。",
  errDates: "请输入双方的出生日期。",
  errFuture: "出生日期不能是未来的日期，请检查输入。",
  noHol: "—",
  suggested: "建议的星期六",
  shareHeading: "{year} 年结婚月份",
  starsLabel: "{n} / 5 星"
};
