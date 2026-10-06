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
  title: "ម៉ាស៊ីនគណនាថ្ងៃមង្គលការតាមរាសីចក្រចិន",
  sub: "ស្វែងរកខែមង្គលការដែលល្អតាមប្រពៃណី ដោយផ្អែកលើរាសីឆ្នាំរបស់អ្នកទាំងពីរ។",
  support: "បញ្ចូលថ្ងៃខែឆ្នាំកំណើតទាំងពីរ និងឆ្នាំដែលអ្នកគ្រោងរៀបការ ដើម្បីស្វែងយល់ពីខែ និងថ្ងៃដែលល្អតាមប្រពៃណីរាសីចក្រចិន។",
  formH: "ស្វែងរកថ្ងៃមង្គលការរបស់អ្នក",
  p1: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទី ១", p2: "ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកទី ២",
  yearL: "ឆ្នាំរៀបការ", regionL: "តំបន់អាកាសធាតុទូទៅ",
  submit: "ស្វែងរកថ្ងៃមង្គលការល្អបំផុត →",
  hint: "មិនត្រូវការឈ្មោះ ឬម៉ោងកំណើតទេ។ ការគណនាធ្វើនៅក្នុងកម្មវិធីរុករករបស់អ្នក។",
  guideH: "មគ្គុទ្ទេសក៍ថ្ងៃមង្គលការរបស់អ្នក",
  partner1: "អ្នកទី ១", partner2: "អ្នកទី ២",
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
    ["សត្វរាសីចក្រចិន", "ថ្ងៃកំណើតរបស់អ្នកនីមួយៗត្រូវបានប្រៀបធៀបជាមួយថ្ងៃចូលឆ្នាំចិនពិតប្រាកដ ដើម្បីរកសត្វរាសី។ ខែនីមួយៗក៏មានសត្វតាមប្រពៃណីដែរ។"],
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
    ["ពិនិត្យរាសីចក្រចិន", "ពិនិត្យរាសីចក្រចិនរបស់អ្នក។", "checker.html"],
    ["ពិនិត្យគូព្រងជោគជតារាសី", "ប្រៀបធៀបថ្ងៃខែឆ្នាំកំណើតពីរ។", "compatibility.html"],
    ["ភាពជាគូសម្រាប់ដៃគូអាជីវកម្ម", "ស្វែងយល់ពីភាពជាគូអាជីវកម្មតាមប្រពៃណី។", "business-partner.html"],
    ["មគ្គុទ្ទេសក៍រាសីចក្រចិន", "ស្វែងយល់អំពីសត្វរាសីទាំង ១២។", "animals.html"]
  ],
  faqH: "សំណួរដែលសួរញឹកញាប់",
  faq: [
    ["តើម៉ាស៊ីនគណនាថ្ងៃមង្គលការតាមរាសីចក្រចិនដំណើរការយ៉ាងដូចម្តេច?", "វារកសត្វរាសីរបស់អ្នកនីមួយៗពីថ្ងៃកំណើត ហើយវាយតម្លៃខែនីមួយៗក្នុងឆ្នាំរៀបការ ដោយមើលថាសត្វតាមប្រពៃណីរបស់ខែនោះទាក់ទងនឹងសត្វរបស់អ្នកទាំងពីរយ៉ាងដូចម្តេច។ វាក៏បង្ហាញតួលេខភាពជាគូសរុប ពីសត្វ ធាតុ និងយិន-យ៉ាងរបស់អ្នកដែរ។"],
    ["ហេតុអ្វីបានជាថ្ងៃកំណើតរបស់អ្នកទាំងពីរសំខាន់?", "ខែមួយទទួលបានការវាយតម្លៃល្អ ពេលវាសមស្របនឹងអ្នកទាំងពីរ។ ខែដែលស៊ីសង្វាក់នឹងម្នាក់ ប៉ុន្តែប្រឆាំងនឹងម្នាក់ទៀត នឹងទទួលបានការវាយតម្លៃទាបជាង។"],
    ["ហេតុអ្វីបានជាឆ្នាំរៀបការសំខាន់?", "ឆ្នាំកំណត់ថាខែ និងថ្ងៃសៅរ៍ណាត្រូវបង្ហាញ ហើយថ្ងៃបុណ្យណាស្ថិតនៅជិត។ ឆ្នាំរាសីក៏ប្រែនៅថ្ងៃចូលឆ្នាំចិនដែរ ដូច្នេះការរៀបចំផែនការជុំវិញថ្ងៃនោះអាចសំខាន់។"],
    ["តើថ្ងៃចូលឆ្នាំចិនមានឥទ្ធិពលលើការគណនាទេ?", "មាន សម្រាប់ថ្ងៃកំណើត៖ អ្នកដែលកើតក្នុងខែមករា ឬដើមខែកុម្ភៈ អាចជាសត្វរាសីនៃឆ្នាំមុន ដូច្នេះថ្ងៃកំណើតនីមួយៗត្រូវបានប្រៀបធៀបជាមួយថ្ងៃចូលឆ្នាំចិនពិតប្រាកដ។"],
    ["តើម៉ាស៊ីនគណនាអាចណែនាំថ្ងៃមង្គលការជាក់លាក់បានទេ?", "វាណែនាំថ្ងៃសៅរ៍ក្នុងខែដែលល្អបំផុតរបស់អ្នក។ វាមិនអះអាងអំពីថ្ងៃសំណាងរៀងៗខ្លួនទេ ព្រោះឧបករណ៍នេះមិនគណនាប្រតិទិនចន្ទគតិតាមថ្ងៃទេ។"],
    ["តើថ្ងៃមង្គលការតាមរាសីចក្រចិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រឬទេ?", "ទេ។ វាជាប្រពៃណីវប្បធម៌ ដែលចែករំលែកនៅទីនេះសម្រាប់កម្សាន្ត និងការឆ្លុះបញ្ចាំង។ គ្មានភស្តុតាងវិទ្យាសាស្ត្រថាខែរៀបការមានឥទ្ធិពលលើអាពាហ៍ពិពាហ៍ទេ។"],
    ["តើខ្ញុំគួរប្រើថ្ងៃដែលបានណែនាំជាកត្តាតែមួយគត់ក្នុងការជ្រើសថ្ងៃមង្គលការឬទេ?", "ទេ។ កន្លែងរៀបការ ថវិកា អាកាសធាតុ គ្រួសារ និងភ្ញៀវសំខាន់ជាងច្រើនក្នុងការអនុវត្តជាក់ស្តែង។ សូមប្រើលទ្ធផលជាកត្តាមួយ ហើយសម្រេចចិត្តរួមគ្នា។"]
  ],
  disclaimer: "ការណែនាំថ្ងៃមង្គលការតាមរាសីចក្រចិនផ្អែកលើការបកស្រាយវប្បធម៌តាមប្រពៃណី ហើយត្រូវបានផ្តល់ជូនសម្រាប់កម្សាន្ត ការស្វែងយល់វប្បធម៌ និងការឆ្លុះបញ្ចាំងផ្ទាល់ខ្លួន។ វាមិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ ហើយមិនគួរចាត់ទុកថាជាការធានាភាពជោគជ័យនៃអាពាហ៍ពិពាហ៍ ឬជំនួសការរៀបចំផែនការមង្គលការជាក់ស្តែងបានឡើយ។",
  errDates: "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតទាំងពីរ។",
  errFuture: "ថ្ងៃកំណើតមិនអាចនៅអនាគតបានទេ។ សូមពិនិត្យថ្ងៃដែលបានបញ្ចូលឡើងវិញ។",
  noHol: "—",
  suggested: "ថ្ងៃសៅរ៍ដែលបានណែនាំ",
  shareHeading: "ខែមង្គលការសម្រាប់ឆ្នាំ {year}",
  starsLabel: "{n} ផ្កាយក្នុងចំណោម ៥"
}
};
