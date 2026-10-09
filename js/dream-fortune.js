// dream-fortune.js — "Dream Fortune" on the Checker page: a fortune wheel and six dream buttons below the
// zodiac result. Everything comes from the visitor's existing result (animal, element) and the site's own
// zodiac engine (js/zodiac-data.js); nothing is sent anywhere and no birth date is used or stored.
//   - Text: fixed English / Khmer templates + a per-sign phrase table (no AI calls).
//   - "Supportive years": the next years whose animal is the same as, or in the harmony triangle with, the
//     visitor's sign (getCompatibilityType "same" / "triangle") — traditional, shown as a symbol, never a promise.
//   - Lucky colors: ANIMAL_INFO / KM_ANIMAL_INFO.
//   - The wheel only chooses a CATEGORY at random; it predicts nothing.
// Listens for the "mbs:checker-result" event that js/app.js fires after showing a result.
(function () {
  "use strict";
  var CATS = ["wealth", "car", "home", "love", "career", "years", "opportunity", "growth"];   // wheel order
  var BUTTONS = ["car", "wealth", "home", "love", "career", "years"];
  var EMOJI = { wealth: "💰", car: "🏎️", home: "🏡", love: "❤️", career: "💼", years: "🍀", opportunity: "🚪", growth: "🌱" };

  var SIGN = {
    en: {
      Rat: ["quick thinking", "a smart, compact coupe packed with clever tech", "a cosy, well-organised home close to the city", "loyal, attentive and full of small surprises", "spotting opportunities before anyone else"],
      Ox: ["patience and steady effort", "a strong, reliable grand tourer built to last", "a solid family house with a garden", "steady, protective and deeply loyal", "building something solid, step by step"],
      Tiger: ["courage", "a powerful, head-turning sports car", "a bold, open home with room to roam", "passionate, protective and adventurous", "leading bravely when others hesitate"],
      Rabbit: ["kindness and good taste", "an elegant, comfortable convertible in a soft colour", "a calm, beautiful home full of plants and light", "gentle, caring and romantic", "creating harmony and beautiful results"],
      Dragon: ["confidence and big vision", "a bold, gold-trimmed supercar", "a grand home with a view over the city", "generous, warm and larger than life", "inspiring people and leading big plans"],
      Snake: ["wisdom and calm focus", "a sleek, quiet luxury car in a deep colour", "a private, stylish home with a peaceful study", "deep, thoughtful and quietly devoted", "careful planning and smart decisions"],
      Horse: ["energy and love of freedom", "a fast open-top roadster made for long drives", "a bright home near open roads and nature", "lively, honest and full of adventure", "moving fast and taking on new challenges"],
      Goat: ["creativity and a gentle heart", "a stylish, cosy car with a beautiful interior", "an artistic home with a garden and soft colours", "tender, caring and devoted to family", "creative ideas and teamwork"],
      Monkey: ["cleverness and quick ideas", "a high-tech electric sports car full of gadgets", "a smart home with clever gadgets everywhere", "fun, playful and full of laughter", "solving problems in creative ways"],
      Rooster: ["hard work and an eye for detail", "a polished, perfectly kept classic car", "a neat, elegant home where everything has its place", "honest, dependable and proud of their partner", "doing every job carefully and well"],
      Dog: ["loyalty and a fair heart", "a safe, dependable SUV ready for family trips", "a warm, welcoming home full of friends", "faithful, protective and sincere", "earning trust and helping the team"],
      Pig: ["generosity and joy", "a comfortable luxury car with room for everyone", "a spacious, happy home with a big kitchen", "kind, generous and easy to love", "steady effort and good relationships"]
    },
    km: {
      Rat: ["ការគិតរហ័ស", "រថយន្តតូចស្អាត ឆ្លាតវៃ មានបច្ចេកវិទ្យាទំនើប", "ផ្ទះកក់ក្តៅ រៀបចំស្អាត នៅជិតទីក្រុង", "ស្មោះត្រង់ យកចិត្តទុកដាក់ និងចូលចិត្តផ្តល់ការភ្ញាក់ផ្អើលតូចៗ", "ការមើលឃើញឱកាសមុនគេ"],
      Ox: ["ការអត់ធ្មត់ និងការខិតខំជាប់លាប់", "រថយន្តរឹងមាំ ទុកចិត្តបាន ប្រើបានយូរ", "ផ្ទះគ្រួសាររឹងមាំ មានសួនច្បារ", "នឹងនរ ចេះការពារ និងស្មោះត្រង់ជ្រាលជ្រៅ", "ការកសាងអ្វីដែលរឹងមាំ មួយជំហានម្តងៗ"],
      Tiger: ["ភាពក្លាហាន", "រថយន្តស្ព័រខ្លាំង ដែលធ្វើឱ្យមនុស្សងាកមើល", "ផ្ទះធំទូលាយ មានកន្លែងដើរលេងច្រើន", "ងប់ងល់ ចេះការពារ និងចូលចិត្តផ្សងព្រេង", "ការដឹកនាំដោយក្លាហាន ពេលអ្នកដទៃស្ទាក់ស្ទើរ"],
      Rabbit: ["ចិត្តល្អ និងរសនិយមល្អ", "រថយន្តបើកដំបូលឆើតឆាយ ស្រួលជិះ ពណ៌ទន់ភ្លន់", "ផ្ទះស្ងប់ស្ងាត់ ស្រស់ស្អាត ពោរពេញដោយរុក្ខជាតិ និងពន្លឺ", "ទន់ភ្លន់ យកចិត្តទុកដាក់ និងរ៉ូមែនទិក", "ការបង្កើតភាពសុខដុម និងលទ្ធផលស្អាតៗ"],
      Dragon: ["ទំនុកចិត្ត និងចក្ខុវិស័យធំ", "រថយន្តស្ព័រទំនើប តុបតែងពណ៌មាស", "ផ្ទះធំស្កឹមស្កៃ មើលឃើញទេសភាពទីក្រុង", "ចិត្តទូលាយ កក់ក្តៅ និងពោរពេញដោយថាមពល", "ការបំផុសគំនិតមនុស្ស និងការដឹកនាំគម្រោងធំៗ"],
      Snake: ["ប្រាជ្ញា និងការផ្តោតអារម្មណ៍ដោយស្ងប់ស្ងាត់", "រថយន្តប្រណីតរលោង ស្ងាត់ ពណ៌ជ្រៅ", "ផ្ទះឯកជនទាន់សម័យ មានបន្ទប់អានសៀវភៅស្ងប់ស្ងាត់", "ជ្រាលជ្រៅ គិតគូរ និងស្មោះស្ម័គ្រដោយស្ងៀមស្ងាត់", "ការរៀបចំផែនការប្រុងប្រយ័ត្ន និងការសម្រេចចិត្តឆ្លាតវៃ"],
      Horse: ["ថាមពល និងការស្រឡាញ់សេរីភាព", "រថយន្តបើកដំបូលលឿន សម្រាប់ធ្វើដំណើរឆ្ងាយ", "ផ្ទះភ្លឺស្វាង នៅជិតផ្លូវធំ និងធម្មជាតិ", "រស់រវើក ស្មោះត្រង់ និងពោរពេញដោយការផ្សងព្រេង", "ការធ្វើការលឿន និងការទទួលយកបញ្ហាប្រឈមថ្មីៗ"],
      Goat: ["ភាពច្នៃប្រឌិត និងចិត្តទន់ភ្លន់", "រថយន្តទាន់សម័យ ផាសុកភាព មានផ្ទៃខាងក្នុងស្អាត", "ផ្ទះបែបសិល្បៈ មានសួនច្បារ និងពណ៌ទន់ៗ", "ទន់ភ្លន់ យកចិត្តទុកដាក់ និងស្រឡាញ់គ្រួសារ", "គំនិតច្នៃប្រឌិត និងការងារជាក្រុម"],
      Monkey: ["ភាពឆ្លាតវៃ និងគំនិតរហ័ស", "រថយន្តស្ព័រអគ្គិសនី បច្ចេកវិទ្យាខ្ពស់ ពោរពេញដោយឧបករណ៍", "ផ្ទះឆ្លាតវៃ មានឧបករណ៍ទំនើបគ្រប់កន្លែង", "សប្បាយ ចូលចិត្តលេងសើច និងពោរពេញដោយសំណើច", "ការដោះស្រាយបញ្ហាដោយច្នៃប្រឌិត"],
      Rooster: ["ការខិតខំ និងការយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត", "រថយន្តបុរាណដែលថែទាំបានល្អឥតខ្ចោះ", "ផ្ទះស្អាតឆើតឆាយ ដែលអ្វីៗនៅកន្លែងរបស់វា", "ស្មោះត្រង់ ទុកចិត្តបាន និងមានមោទនភាពចំពោះដៃគូ", "ការធ្វើការងារនីមួយៗដោយប្រុងប្រយ័ត្ន និងល្អ"],
      Dog: ["ភាពស្មោះត្រង់ និងចិត្តយុត្តិធម៌", "រថយន្ត SUV មានសុវត្ថិភាព ទុកចិត្តបាន សម្រាប់ដំណើរកម្សាន្តគ្រួសារ", "ផ្ទះកក់ក្តៅ ស្វាគមន៍ ពោរពេញដោយមិត្តភក្តិ", "ស្មោះស្ម័គ្រ ចេះការពារ និងស្មោះត្រង់", "ការទទួលបានការទុកចិត្ត និងការជួយក្រុម"],
      Pig: ["ចិត្តទូលាយ និងភាពរីករាយ", "រថយន្តប្រណីតស្រួលជិះ មានកន្លែងសម្រាប់គ្រប់គ្នា", "ផ្ទះធំទូលាយ រីករាយ មានផ្ទះបាយធំ", "ចិត្តល្អ ចិត្តទូលាយ និងងាយស្រឡាញ់", "ការខិតខំជាប់លាប់ និងទំនាក់ទំនងល្អ"]
    }
  };

  // {A} animal, {S} strength, {C} car, {H} home, {L} love style, {W} work style
  var T = {
    en: {
      h: "✨ Dream Fortune", sub: "A playful look at your dreams through your {A} sign — for fun and inspiration, not a prediction or financial advice.",
      spin: "🎡 Spin for My Future", spinning: "Spinning…", again: "🎡 Spin again", pick: "Or choose a dream:", wheel: "Fortune wheel", stopped: "The wheel stopped on: {C}",
      card: "✨ Create My Fortune Card", making: "Creating your card…", ready: "Your card is ready — share it or download it with the Share button.", fail: "Couldn't create the card. Please try again.",
      tip: "Try this", years: "Traditionally supportive years", symYear: "Symbolic green-light year", symNote: "A traditionally supportive year for your sign — a fun symbol, not a promise.",
      colors: "Lucky colors", fun: "For entertainment and inspiration only.", shareTitle: "My Dream Fortune: {C} · {A}",
      names: { wealth: "Wealth & Money", car: "Dream Sports Car", home: "Dream Home", love: "Love & Relationships", career: "Career Success", years: "Lucky Years", opportunity: "Unexpected Opportunity", growth: "Personal Growth" },
      buttons: { car: "When Will I Get My Dream Sports Car?", wealth: "My Wealth Journey", home: "My Dream Home", love: "My Love Story", career: "My Career Success", years: "My Lucky Years" },
      titles: { car: "The {A}'s Dream Ride", wealth: "The {A}'s Wealth Journey", home: "The {A}'s Dream Home", love: "The {A}'s Love Story", career: "The {A}'s Road to Success", years: "The {A}'s Lucky Years", opportunity: "A Surprise Door Opens", growth: "The {A} Grows Stronger" },
      desc: {
        car: ["Your {A} spirit pictures {C}. Tradition says your {S} turns goals into reality — so treat this dream like a destination on a map, not a lottery ticket.",
              "{C} — that's a ride made for a {A}! Use your {S} to plan it one step at a time, and the dream gets closer."],
        wealth: ["As a {A}, your path to wealth runs on {S}. Small, steady moves suit you better than big gambles — let your money grow the way a garden does.",
                 "Your {A} sign shines when it uses {S}. Money tends to follow focus: one clear goal, one simple plan, steady progress."],
        home: ["Your {A} heart dreams of {H}. Picture the colours, the light and the people around the table — dreams with details are easier to work toward.",
               "For a {A}, home is the place that recharges your {S}. Your dream: {H}."],
        love: ["In love, the {A} is {L}. Your sign's best chapters are written with patience, kindness and honest words.",
               "Your love story as a {A} shines through your {S}. The right person will love you exactly for it."],
        career: ["The {A} rises through {W}. Your {S} is your best career asset — the people who notice it will open the next door.",
                 "Success for a {A} looks like {W}. Keep using your {S}, and let your results speak for you."],
        years: ["By Chinese zodiac tradition, the {A} feels most supported in the years of its harmony signs. Your next ones are below — treat them as friendly milestones for fresh starts.",
                "Lucky years don't do the work for you — they reward the {A} who is ready. Use your {S} to prepare for the years below."],
        opportunity: ["Keep your eyes open, {A}! Your {S} helps you notice chances other people miss — a new contact, an idea, an invitation.",
                      "Surprises love a {A} who says yes. Your {S} can turn a small chance into something bigger."],
        growth: ["Your {A} journey is about growing your {S} even further. Small daily habits will shape the person you're becoming.",
                 "The best version of a {A} is calm, curious and kind. Your {S} is the seed — keep watering it."]
      },
      tips: {
        car: ["Give your dream car its own savings jar and add a little every week.", "Write the exact model on a card and keep it where you see it every day.", "Look up its real price and break it into small monthly steps."],
        wealth: ["Save first, spend second: put a small amount aside the day you get paid.", "Learn one new money skill this month, like budgeting or saving.", "Skip \"get rich quick\" offers — your sign's real luck is patience."],
        home: ["Save photos of homes you love — your style will become clear.", "Start a small home fund, even if it grows slowly.", "Make today's space a little more like the dream: one plant, one lamp, one tidy corner."],
        love: ["Say one honest, kind thing to someone you care about today.", "Plan a small, simple date — attention matters more than money.", "Listen fully before you reply; it's the most romantic skill there is."],
        career: ["Pick one skill and practise it for 15 minutes a day.", "Share your goal with one mentor or manager.", "Finish one unfinished task this week — momentum is lucky."],
        years: ["Mark these years in your calendar as checkpoints for big goals.", "Use the year before each one to plan and save.", "Start one small habit now so you're ready when they arrive."],
        opportunity: ["Say yes to one new invitation this month.", "Keep a note of the ideas that pop into your head.", "Reconnect with an old friend — doors often open through people."],
        growth: ["Read 10 pages a day.", "Try one new thing that feels a little outside your comfort zone.", "End each day by writing down one thing you did well."]
      }
    },
    km: {
      h: "✨ ជោគជតាក្តីស្រមៃ", sub: "ការមើលក្តីស្រមៃរបស់អ្នកបែបកម្សាន្ត តាមរាសី{A} — សម្រាប់ការកម្សាន្ត និងការលើកទឹកចិត្ត មិនមែនជាការទស្សន៍ទាយ ឬដំបូន្មានហិរញ្ញវត្ថុទេ។",
      spin: "🎡 បង្វិលកង់សំណាងរបស់ខ្ញុំ", spinning: "កំពុងបង្វិល…", again: "🎡 បង្វិលម្តងទៀត", pick: "ឬជ្រើសរើសក្តីស្រមៃ៖", wheel: "កង់សំណាង", stopped: "កង់បានឈប់នៅ៖ {C}",
      card: "✨ បង្កើត​រូបភាព", making: "កំពុងបង្កើតរូបភាព…", ready: "រូបភាពរបស់អ្នករួចរាល់ — ចុចប៊ូតុងចែករំលែក ដើម្បីចែករំលែក ឬទាញយក។", fail: "មិនអាចបង្កើតរូបភាពបានទេ។ សូមព្យាយាមម្តងទៀត។",
      tip: "សាកល្បងធ្វើ", years: "ឆ្នាំដែលគាំទ្រតាមប្រពៃណី", symYear: "ឆ្នាំភ្លើងបៃតង (និមិត្តរូប)", symNote: "ជាឆ្នាំដែលតាមប្រពៃណីគាំទ្ររាសីរបស់អ្នក — គ្រាន់តែជានិមិត្តរូបសម្រាប់ការកម្សាន្ត មិនមែនជាការសន្យាទេ។",
      colors: "ពណ៌សំណាង", fun: "សម្រាប់ការកម្សាន្ត និងការលើកទឹកចិត្តប៉ុណ្ណោះ។", shareTitle: "ជោគជតាក្តីស្រមៃរបស់ខ្ញុំ៖ {C} · {A}",
      names: { wealth: "ទ្រព្យសម្បត្តិ និងលុយកាក់", car: "រថយន្តស្ព័រក្នុងក្តីស្រមៃ", home: "ផ្ទះក្នុងក្តីស្រមៃ", love: "ស្នេហា និងទំនាក់ទំនង", career: "ភាពជោគជ័យក្នុងអាជីព", years: "ឆ្នាំសំណាង", opportunity: "ឱកាសដែលមិននឹកស្មានដល់", growth: "ការរីកចម្រើនផ្ទាល់ខ្លួន" },
      buttons: { car: "ពេលណាខ្ញុំនឹងមានរថយន្តស្ព័រក្នុងក្តីស្រមៃ?", wealth: "ដំណើរទ្រព្យសម្បត្តិរបស់ខ្ញុំ", home: "ផ្ទះក្នុងក្តីស្រមៃរបស់ខ្ញុំ", love: "រឿងស្នេហារបស់ខ្ញុំ", career: "ភាពជោគជ័យក្នុងអាជីពរបស់ខ្ញុំ", years: "ឆ្នាំសំណាងរបស់ខ្ញុំ" },
      titles: { car: "រថយន្តក្នុងក្តីស្រមៃរបស់{A}", wealth: "ដំណើរទ្រព្យសម្បត្តិរបស់{A}", home: "ផ្ទះក្នុងក្តីស្រមៃរបស់{A}", love: "រឿងស្នេហារបស់{A}", career: "ផ្លូវឆ្ពោះទៅភាពជោគជ័យរបស់{A}", years: "ឆ្នាំសំណាងរបស់{A}", opportunity: "ទ្វារឱកាសដ៏គួរឱ្យភ្ញាក់ផ្អើល", growth: "{A}កាន់តែរឹងមាំ" },
      desc: {
        car: ["ស្មារតី{A}របស់អ្នកស្រមៃឃើញ{C}។ តាមប្រពៃណី {S}របស់អ្នកជួយប្រែក្តីស្រមៃឱ្យក្លាយជាការពិត — ចូរចាត់ទុកក្តីស្រមៃនេះជាគោលដៅនៅលើផែនទី មិនមែនជាសំបុត្រឆ្នោតទេ។",
              "{C} — នេះជារថយន្តដែលសមនឹង{A}! ចូរប្រើ{S}របស់អ្នក ដើម្បីរៀបចំផែនការមួយជំហានម្តងៗ ហើយក្តីស្រមៃនឹងកាន់តែខិតជិត។"],
        wealth: ["ក្នុងនាមជា{A} ផ្លូវឆ្ពោះទៅរកទ្រព្យសម្បត្តិរបស់អ្នកពឹងលើ{S}។ ជំហានតូចៗ ជាប់លាប់ សាកសមនឹងអ្នកជាងការប្រថុយធំៗ — ចូរឱ្យលុយរបស់អ្នករីកលូតលាស់ដូចសួនច្បារ។",
                 "រាសី{A}របស់អ្នកភ្លឺចែងចាំងពេលប្រើ{S}។ លុយកាក់តែងតាមការផ្តោតអារម្មណ៍៖ គោលដៅច្បាស់មួយ ផែនការសាមញ្ញមួយ និងការរីកចម្រើនជាប់លាប់។"],
        home: ["ចិត្ត{A}របស់អ្នកស្រមៃចង់បាន{H}។ ចូរស្រមៃមើលពណ៌ ពន្លឺ និងមនុស្សជុំវិញតុអាហារ — ក្តីស្រមៃដែលមានព័ត៌មានលម្អិត ងាយស្រួលខិតខំឆ្ពោះទៅរកជាង។",
               "សម្រាប់{A} ផ្ទះគឺជាកន្លែងបញ្ចូលថាមពលដល់{S}របស់អ្នក។ ក្តីស្រមៃរបស់អ្នក៖ {H}។"],
        love: ["ក្នុងស្នេហា {A}គឺ{L}។ ជំពូកដ៏ល្អបំផុតរបស់រាសីអ្នក ត្រូវបានសរសេរដោយការអត់ធ្មត់ ចិត្តល្អ និងពាក្យសម្តីស្មោះត្រង់។",
               "រឿងស្នេហារបស់{A}ភ្លឺចែងចាំងតាមរយៈ{S}របស់អ្នក។ មនុស្សដែលត្រូវគ្នានឹងស្រឡាញ់អ្នក ដោយសារចំណុចនេះឯង។"],
        career: ["{A}រីកចម្រើនតាមរយៈ{W}។ {S}របស់អ្នកជាទ្រព្យដ៏ល្អបំផុតក្នុងអាជីព — អ្នកដែលមើលឃើញវានឹងបើកទ្វារបន្ទាប់ឱ្យអ្នក។",
                 "ភាពជោគជ័យរបស់{A}គឺ{W}។ ចូរបន្តប្រើ{S}របស់អ្នក ហើយឱ្យលទ្ធផលនិយាយជំនួសអ្នក។"],
        years: ["តាមប្រពៃណីរាសីចិន {A}ទទួលបានការគាំទ្រច្រើនបំផុតក្នុងឆ្នាំនៃសត្វដែលសុខដុមជាមួយខ្លួន។ ឆ្នាំបន្ទាប់របស់អ្នកមាននៅខាងក្រោម — ចូរចាត់ទុកវាជាចំណុចសម្គាល់សម្រាប់ការចាប់ផ្តើមថ្មី។",
                "ឆ្នាំសំណាងមិនធ្វើការជំនួសអ្នកទេ — វាផ្តល់រង្វាន់ដល់{A}ដែលត្រៀមខ្លួនរួច។ ចូរប្រើ{S}របស់អ្នក ដើម្បីត្រៀមសម្រាប់ឆ្នាំខាងក្រោម។"],
        opportunity: ["សូមបើកភ្នែកឱ្យធំ {A}! {S}របស់អ្នកជួយឱ្យអ្នកមើលឃើញឱកាសដែលអ្នកដទៃមើលរំលង — ទំនាក់ទំនងថ្មី គំនិតថ្មី ឬការអញ្ជើញមួយ។",
                      "ការភ្ញាក់ផ្អើលល្អៗចូលចិត្ត{A}ដែលហ៊ានទទួលយក។ {S}របស់អ្នកអាចប្រែឱកាសតូចមួយ ឱ្យក្លាយជាអ្វីដែលធំជាង។"],
        growth: ["ដំណើររបស់{A}គឺការពង្រីក{S}របស់អ្នកឱ្យកាន់តែខ្លាំង។ ទម្លាប់តូចៗប្រចាំថ្ងៃ នឹងបង្កើតមនុស្សដែលអ្នកកំពុងក្លាយជា។",
                 "{A}ដ៏ល្អបំផុតគឺស្ងប់ចិត្ត ចង់ដឹងចង់ឃើញ និងចិត្តល្អ។ {S}របស់អ្នកគឺជាគ្រាប់ពូជ — ចូរបន្តស្រោចទឹកវា។"]
      },
      tips: {
        car: ["បង្កើតកូនជ្រូកសន្សំសម្រាប់រថយន្តក្នុងក្តីស្រមៃ ហើយដាក់បន្តិចរៀងរាល់សប្តាហ៍។", "សរសេរម៉ូដែលរថយន្តនោះលើក្រដាស ហើយដាក់នៅកន្លែងដែលអ្នកឃើញរាល់ថ្ងៃ។", "ស្វែងរកតម្លៃពិតរបស់វា ហើយបែងចែកជាជំហានតូចៗប្រចាំខែ។"],
        wealth: ["សន្សំមុន ចាយក្រោយ៖ ទុកលុយមួយចំនួនតូចនៅថ្ងៃដែលអ្នកទទួលប្រាក់ខែ។", "រៀនជំនាញលុយកាក់ថ្មីមួយក្នុងខែនេះ ដូចជាការធ្វើថវិកា ឬការសន្សំ។", "ជៀសវាងការផ្តល់ជូន \"មានបានលឿន\" — សំណាងពិតរបស់រាសីអ្នកគឺការអត់ធ្មត់។"],
        home: ["រក្សាទុករូបភាពផ្ទះដែលអ្នកចូលចិត្ត — រចនាប័ទ្មរបស់អ្នកនឹងកាន់តែច្បាស់។", "ចាប់ផ្តើមមូលនិធិផ្ទះតូចមួយ ទោះបីវាកើនឡើងយឺតក៏ដោយ។", "ធ្វើឱ្យកន្លែងរស់នៅបច្ចុប្បន្នកាន់តែដូចក្តីស្រមៃ៖ រុក្ខជាតិមួយ ចង្កៀងមួយ ជ្រុងស្អាតមួយ។"],
        love: ["និយាយពាក្យស្មោះត្រង់ និងល្អមួយ ទៅកាន់មនុស្សដែលអ្នកស្រឡាញ់ថ្ងៃនេះ។", "រៀបចំការណាត់ជួបតូចសាមញ្ញមួយ — ការយកចិត្តទុកដាក់សំខាន់ជាងលុយ។", "ស្តាប់ឱ្យចប់មុននឹងឆ្លើយ — នេះជាជំនាញរ៉ូមែនទិកបំផុត។"],
        career: ["ជ្រើសរើសជំនាញមួយ ហើយហាត់ ១៥ នាទីរៀងរាល់ថ្ងៃ។", "ប្រាប់គោលដៅរបស់អ្នកទៅអ្នកណែនាំ ឬប្រធានម្នាក់។", "បញ្ចប់ការងារមួយដែលនៅសល់ក្នុងសប្តាហ៍នេះ — សន្ទុះគឺជាសំណាង។"],
        years: ["កត់ឆ្នាំទាំងនេះក្នុងប្រតិទិន ជាចំណុចពិនិត្យសម្រាប់គោលដៅធំៗ។", "ប្រើឆ្នាំមុននីមួយៗ ដើម្បីរៀបចំផែនការ និងសន្សំ។", "ចាប់ផ្តើមទម្លាប់តូចមួយឥឡូវនេះ ដើម្បីត្រៀមខ្លួនពេលឆ្នាំទាំងនោះមកដល់។"],
        opportunity: ["ទទួលយកការអញ្ជើញថ្មីមួយក្នុងខែនេះ។", "កត់ត្រាគំនិតដែលលេចឡើងក្នុងក្បាលរបស់អ្នក។", "ទាក់ទងមិត្តចាស់ម្តងទៀត — ទ្វារឱកាសតែងបើកតាមរយៈមនុស្ស។"],
        growth: ["អានសៀវភៅ ១០ ទំព័ររៀងរាល់ថ្ងៃ។", "សាកល្បងរឿងថ្មីមួយ ដែលនៅក្រៅតំបន់ស្រួលរបស់អ្នកបន្តិច។", "បញ្ចប់ថ្ងៃនីមួយៗ ដោយសរសេររឿងល្អមួយដែលអ្នកបានធ្វើ។"]
      }
    }
  };

  var KD = "០១២៣៤៥៦៧៨៩";
  function kmd(v) { return String(v).replace(/\d/g, function (c) { return KD[c]; }); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function an(s) { return s.replace(/\b([Aa]) (?=[AEIOU])/g, "$1n "); }      // "a Ox" -> "an Ox"
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function fill(t, v) { return t.replace(/\{(\w)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); }
  function rnd(n) {
    try { var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; } catch (e) { return Math.floor(Math.random() * n); }
  }
  function reducedMotion() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }

  // next `n` years (from the current zodiac year) whose animal is the sign itself or one of its triangle partners
  function supportiveYears(animal, n) {
    var out = [];
    if (typeof animalForYear !== "function" || typeof getCompatibilityType !== "function" || typeof getZodiac !== "function") return out;
    var now = getZodiac(new Date()).zodiacYear;
    for (var y = now; y < now + 13 && out.length < n; y++) {
      var t = getCompatibilityType(animal, animalForYear(y));
      if (t === "same" || t === "triangle") out.push(y);
    }
    return out;
  }

  var state = null;          // { animal, element, lang, root, spins, picks, spinning, rot }

  function mount(detail) {
    var host = document.getElementById("dream-fortune");
    if (!host || !detail || !detail.animal || !SIGN.en[detail.animal]) { if (host) host.hidden = true; return; }
    var lang = detail.lang === "km" ? "km" : "en", S = T[lang];
    var name = lang === "km" ? (typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[detail.animal] : detail.animal) : detail.animal;
    state = { animal: detail.animal, name: name, lang: lang, spins: 0, picks: {}, spinning: false, rot: 0, host: host };
    var seg = 360 / CATS.length;
    var slices = CATS.map(function (c, i) {
      var a0 = (i * seg - seg / 2 - 90) * Math.PI / 180, a1 = ((i + 1) * seg - seg / 2 - 90) * Math.PI / 180;
      var x0 = 100 + 96 * Math.cos(a0), y0 = 100 + 96 * Math.sin(a0), x1 = 100 + 96 * Math.cos(a1), y1 = 100 + 96 * Math.sin(a1);
      var mid = (i * seg - 90) * Math.PI / 180, ex = 100 + 64 * Math.cos(mid), ey = 100 + 64 * Math.sin(mid);
      return '<path d="M100 100L' + x0.toFixed(2) + " " + y0.toFixed(2) + "A96 96 0 0 1 " + x1.toFixed(2) + " " + y1.toFixed(2) + 'Z" class="df-slice df-s' + (i % 2) + '"/>' +
        '<text x="' + ex.toFixed(1) + '" y="' + ey.toFixed(1) + '" class="df-ico" transform="rotate(' + (i * seg) + " " + ex.toFixed(1) + " " + ey.toFixed(1) + ')">' + EMOJI[c] + "</text>";
    }).join("");
    host.innerHTML =
      '<div class="df-card">' +
        '<h2 class="df-h" id="df-h">' + esc(S.h) + "</h2>" +
        '<p class="df-sub">' + esc(fill(S.sub, { A: name })) + "</p>" +
        '<div class="df-stage">' +
          '<div class="df-wheel" role="img" aria-label="' + esc(S.wheel) + '">' +
            '<span class="df-pointer" aria-hidden="true"></span>' +
            '<svg viewBox="0 0 200 200" aria-hidden="true"><g class="df-rot">' +
              '<circle cx="100" cy="100" r="99" class="df-rim"/>' + slices +
              '<circle cx="100" cy="100" r="22" class="df-hub"/><text x="100" y="101" class="df-hub-t">✦</text>' +
            "</g></svg>" +
          "</div>" +
          '<button type="button" class="df-spin">' + esc(S.spin) + "</button>" +
          '<p class="df-live" role="status" aria-live="polite"></p>' +
        "</div>" +
        '<p class="df-pick">' + esc(S.pick) + "</p>" +
        '<div class="df-grid">' + BUTTONS.map(function (c) {
          return '<button type="button" class="df-dream" data-df="' + c + '"><span aria-hidden="true">' + EMOJI[c] + "</span><span>" + esc(S.buttons[c]) + "</span></button>";
        }).join("") + "</div>" +
        '<div class="df-out" hidden></div>' +
      "</div>";
    host.hidden = false;
    host.setAttribute("aria-labelledby", "df-h");
    host.querySelector(".df-spin").addEventListener("click", spin);
    host.querySelectorAll(".df-dream").forEach(function (b) { b.addEventListener("click", function () { if (!state.spinning) reveal(b.getAttribute("data-df"), b); }); });
  }

  function spin() {
    if (!state || state.spinning) return;
    var S = T[state.lang], host = state.host, btn = host.querySelector(".df-spin"), g = host.querySelector(".df-rot");
    var i = rnd(CATS.length), seg = 360 / CATS.length, jitter = rnd(Math.floor(seg * 0.5)) - Math.floor(seg * 0.25);
    var base = Math.ceil(state.rot / 360) * 360;
    var target = base + (reducedMotion() ? 0 : 360 * 5) + (360 - i * seg) + jitter;
    state.spinning = true; state.spins++;
    btn.disabled = true; btn.textContent = S.spinning; btn.setAttribute("aria-busy", "true");
    host.querySelectorAll(".df-dream").forEach(function (b) { b.disabled = true; });
    var ms = reducedMotion() ? 0 : 3200;
    g.style.transition = ms ? "transform " + ms + "ms cubic-bezier(.12,.72,.18,1)" : "none";
    g.style.transform = "rotate(" + target + "deg)";
    state.rot = target;
    setTimeout(function () {
      state.spinning = false;
      btn.disabled = false; btn.textContent = S.again; btn.removeAttribute("aria-busy");
      host.querySelectorAll(".df-dream").forEach(function (b) { b.disabled = false; });
      host.querySelector(".df-live").textContent = fill(S.stopped, { C: S.names[CATS[i]] });
      host.querySelector(".df-wheel").classList.add("df-glow");
      setTimeout(function () { var w = host.querySelector(".df-wheel"); if (w) w.classList.remove("df-glow"); }, 1200);
      reveal(CATS[i], null);
    }, ms + 60);
  }

  function content(cat) {
    var L = state.lang, S = T[L], P = SIGN[L][state.animal];
    var n = (state.picks[cat] = (state.picks[cat] || 0) + 1);          // a different wording on each visit to the same dream
    var idx = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"].indexOf(state.animal);
    var v = { A: state.name, S: P[0], C: P[1], H: P[2], L: P[3], W: P[4] };
    var desc = fill(S.desc[cat][(idx + n - 1) % S.desc[cat].length], v);
    if (L === "en") desc = cap(an(desc));
    var years = supportiveYears(state.animal, 3);
    var info = (typeof ANIMAL_INFO !== "undefined" && ANIMAL_INFO[state.animal]) || null;
    var kmInfo = (typeof KM_ANIMAL_INFO !== "undefined" && KM_ANIMAL_INFO[state.animal]) || null;
    var colors = L === "km" ? (kmInfo && kmInfo.luckyColors) : (info && info.luckyColors);
    return {
      cat: cat, emoji: EMOJI[cat], catName: S.names[cat], title: fill(S.titles[cat], v), desc: desc,
      tip: S.tips[cat][(idx + n) % S.tips[cat].length],
      years: cat === "car" ? years.slice(0, 1) : (cat === "years" || cat === "wealth" || cat === "career" || cat === "opportunity") ? years : [],
      colors: (cat === "home" || cat === "love" || cat === "growth" || cat === "car") && colors ? colors.slice(0, 3) : []
    };
  }

  function reveal(cat, fromBtn) {
    var L = state.lang, S = T[L], R = content(cat), out = state.host.querySelector(".df-out");
    var yearsHtml = "";
    if (R.years.length) {
      var ys = R.years.map(function (y) { return L === "km" ? kmd(y) : y; });
      yearsHtml = cat === "car"
        ? '<div class="df-chip"><b>' + esc(S.symYear) + "</b><span>" + esc(ys[0]) + '</span><small>' + esc(S.symNote) + "</small></div>"
        : '<div class="df-chip"><b>' + esc(S.years) + "</b><span>" + esc(ys.join(" · ")) + "</span></div>";
    }
    var colorHtml = R.colors.length ? '<div class="df-chip"><b>' + esc(S.colors) + "</b><span>" + esc(R.colors.join(", ")) + "</span></div>" : "";
    out.innerHTML =
      '<article class="df-result" aria-labelledby="df-rt">' +
        '<p class="df-cat"><span aria-hidden="true">' + R.emoji + "</span> " + esc(R.catName) + "</p>" +
        '<h3 class="df-title" id="df-rt" tabindex="-1">' + esc(R.title) + "</h3>" +
        '<p class="df-desc">' + esc(R.desc) + "</p>" +
        (yearsHtml || colorHtml ? '<div class="df-chips">' + yearsHtml + colorHtml + "</div>" : "") +
        '<p class="df-tip"><b>' + esc(S.tip) + ":</b> " + esc(R.tip) + "</p>" +
        '<p class="df-fun">' + esc(S.fun) + "</p>" +
        '<button type="button" class="df-make">' + esc(S.card) + "</button>" +
        '<p class="df-cardmsg" role="status" aria-live="polite"></p>' +
        '<div class="df-cardbox" hidden></div>' +
      "</article>";
    out.hidden = false;
    out.classList.remove("df-in"); void out.offsetWidth; out.classList.add("df-in");
    state.host.querySelectorAll(".df-dream").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-df") === cat)); });
    out.querySelector(".df-make").addEventListener("click", function () { makeCard(R, out); });
    var t = out.querySelector(".df-title");
    try { out.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "nearest" }); } catch (e) { /* ignore */ }
    if (fromBtn) t.focus({ preventScroll: true });
  }

  function makeCard(R, out) {
    var L = state.lang, S = T[L], btn = out.querySelector(".df-make"), msg = out.querySelector(".df-cardmsg"), box = out.querySelector(".df-cardbox");
    if (typeof _buildCardBlob !== "function" || typeof shareRowHtml !== "function") { msg.textContent = S.fail; return; }
    var spec = {
      cardType: "dream", lang: L, animal: state.animal, name: state.name, emoji: R.emoji, category: R.catName, title: R.title, desc: R.desc, tip: R.tip,
      yearsLabel: R.years.length ? (R.cat === "car" ? S.symYear : S.years) : "", years: R.years.map(function (y) { return L === "km" ? kmd(y) : String(y); }),
      colorsLabel: R.colors.length ? S.colors : "", colors: R.colors, tipLabel: S.tip
    };
    btn.disabled = true; msg.textContent = S.making;
    _buildCardBlob(spec, "portrait").then(function (blob) {
      if (!blob) throw new Error("no image");
      var shareTitle = fill(S.shareTitle, { C: R.catName, A: state.name });
      box.innerHTML = '<div class="df-preview"><img alt="' + esc(R.title) + '" src="' + URL.createObjectURL(blob) + '"></div>' + shareRowHtml(shareTitle, spec, "/checker");
      box.hidden = false;
      if (typeof wireShareRows === "function") wireShareRows(box);
      msg.textContent = S.ready;
      btn.disabled = false;
    }).catch(function () { msg.textContent = S.fail; btn.disabled = false; });
  }

  document.addEventListener("mbs:checker-result", function (e) { try { mount(e.detail); } catch (err) { /* the checker result stays as it is */ } });
  window.MBSDreamFortune = { _supportiveYears: supportiveYears, _CATS: CATS, _show: function (c) { if (state && CATS.indexOf(c) > -1) reveal(c, null); } };
})();
