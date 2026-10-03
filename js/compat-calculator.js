// compat-calculator.js — Relationship Compatibility Calculator
// (Western sun signs + numerology). Lives on compatibility.html only.
// Fully bilingual: every dynamically generated sentence below is produced
// in English or Khmer depending on the page's current language, not just
// the static labels/headings (which already come from UI_STRINGS).
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("relationship-form");
  const resultBox = document.getElementById("relationship-result");
  const errorBox = document.getElementById("rc-form-error");
  if (!form) return;

  const lang = typeof getLang === "function" ? getLang() : "en";
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};
  const isKm = lang === "km";
  const lifePathInfoSource = (isKm && typeof KM_LIFE_PATH_INFO !== "undefined") ? KM_LIFE_PATH_INFO : LIFE_PATH_INFO;

  // Pin date inputs to today's real max (no future birth dates) and a
  // sane minimum, computed at runtime rather than hard-coded.
  const todayIso = new Date().toISOString().slice(0, 10);
  ["rc-p1-dob", "rc-p2-dob"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute("max", todayIso);
      el.setAttribute("min", "1920-01-01");
    }
  });

  function parseDobInput(value) {
    if (!value) return null;
    const d = new Date(value + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }
  function clearError() {
    errorBox.hidden = true;
    errorBox.textContent = "";
  }

  // --- scoring helpers -------------------------------------------------
  function hashSeed(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }
  function jitterFor(seedStr, categoryKey) {
    const h = hashSeed(seedStr + "|" + categoryKey);
    return (h % 11) - 5; // -5..+5
  }
  const TIER_BASE = { high: 86, medium: 64, low: 42 };
  function tierScore(tier) {
    return TIER_BASE[tier] !== undefined ? TIER_BASE[tier] : 64;
  }
  function clampScore(n) {
    return Math.max(15, Math.min(97, Math.round(n)));
  }

  function hasElement(signA, signB, el) {
    return signA.element === el || signB.element === el;
  }

  function computeScores(signA, signB, elRel, modRel, numRel, seedStr) {
    const elS = tierScore(elRel.tier);
    const modS = tierScore(modRel.tier);
    const numS = tierScore(numRel.tier);

    function score(base, categoryKey, bonus) {
      return clampScore(base + (bonus || 0) + jitterFor(seedStr, categoryKey));
    }

    const earthWaterBonus = (hasElement(signA, signB, "Earth") && hasElement(signA, signB, "Water")) ? 4 : 0;
    const airBonus = hasElement(signA, signB, "Air") ? 3 : 0;

    const love = score(elS * 0.6 + numS * 0.4, "love");
    const emotional = score(elS * 0.65 + modS * 0.35, "emotional", hasElement(signA, signB, "Water") ? 4 : 0);
    const communication = score(modS * 0.55 + elS * 0.2 + numS * 0.25, "communication", airBonus);
    const trust = score(modS * 0.5 + numS * 0.5, "trust");
    const family = score(elS * 0.5 + modS * 0.5, "family", earthWaterBonus);
    const financial = score(numS * 0.7 + modS * 0.3, "financial");
    const chemistry = score(elS * 0.8 + numS * 0.2, "chemistry");
    const personality = score(modS * 0.5 + numS * 0.5, "personality");
    const conflict = score(modS * 0.7 + elS * 0.3, "conflict");
    const growth = score(numS * 0.6 + modS * 0.4, "growth");
    const longterm = score((love + trust + family + conflict + growth) / 5, "longterm");
    const intimacy = score((chemistry + emotional) / 2, "intimacy");

    return { love, emotional, communication, trust, family, financial, chemistry, personality, conflict, growth, longterm, intimacy };
  }

  // --- localization tables ------------------------------------------------
  const WESTERN_ELEMENT_LABEL = {
    en: { Fire: "Fire", Earth: "Earth", Air: "Air", Water: "Water" },
    km: { Fire: "ភ្លើង", Earth: "ដី", Air: "ខ្យល់", Water: "ទឹក" }
  };
  const MODALITY_LABEL = {
    en: { Cardinal: "Cardinal", Fixed: "Fixed", Mutable: "Mutable" },
    km: { Cardinal: "ខាងផ្តួចផ្តើម", Fixed: "ខាងស្ថិរភាព", Mutable: "ខាងបត់បែន" }
  };

  function elLabel(el) { return (WESTERN_ELEMENT_LABEL[lang] || WESTERN_ELEMENT_LABEL.en)[el] || el; }
  function modLabel(mod) { return (MODALITY_LABEL[lang] || MODALITY_LABEL.en)[mod] || mod; }
  function signName(sign) { return isKm ? sign.km : sign.name; }
  function signTraits(sign) { return isKm ? (sign.kmTraits || sign.traits) : sign.traits; }

  // --- narrative snippet banks ------------------------------------------
  const WORKS_BANK = {
    en: {
      high: [
        "tends to come naturally — the kind of thing you don't have to work hard at.",
        "is a genuine strength for the two of you, something that can anchor the relationship.",
        "flows easily between you, with little translation needed."
      ],
      medium: [
        "can work well once you both understand each other's different style here.",
        "has real potential — it just takes a bit of conscious effort to click.",
        "balances out reasonably well, with each of you filling a gap the other has."
      ],
      low: [
        "isn't the easiest area, but awareness of the difference goes a long way.",
        "takes real, deliberate work — but couples who put in that work often find it worthwhile.",
        "requires patience on both sides rather than assuming it'll sort itself out."
      ]
    },
    km: {
      high: [
        "ច្រើនតែកើតឡើងដោយធម្មជាតិ ដោយមិនចាំបាច់ខិតខំច្រើននោះទេ។",
        "ជាចំណុចខ្លាំងពិតប្រាកដសម្រាប់អ្នកទាំងពីរ ជាគោលគាំទ្រដ៏ល្អសម្រាប់ទំនាក់ទំនង។",
        "ហូរយ៉ាងរលូនរវាងអ្នកទាំងពីរ ដោយស្ទើរតែមិនចាំបាច់ពន្យល់គ្នា។"
      ],
      medium: [
        "អាចដំណើរការបានល្អ នៅពេលអ្នកទាំងពីរយល់ពីរបៀបខុសគ្នារបស់គ្នានៅទីនេះ។",
        "មានសក្តានុពលពិតប្រាកដ គ្រាន់តែត្រូវការការខិតខំដឹងខ្លួនបន្តិចដើម្បីឱ្យចូលគ្នាបានល្អ។",
        "មានតុល្យភាពសមហេតុផល ដោយម្នាក់ៗបំពេញចន្លោះដែលអ្នកម្នាក់ទៀតខ្វះ។"
      ],
      low: [
        "មិនមែនជាផ្នែកងាយស្រួលបំផុតទេ ប៉ុន្តែការដឹងពីភាពខុសគ្នាជួយបានច្រើន។",
        "ត្រូវការការខិតខំដែលមានគោលបំណងពិតប្រាកដ ប៉ុន្តែគូស្នេហ៍ដែលខិតខំនេះច្រើនតែឃើញថាវាសក្តិសម។",
        "ទាមទារការអត់ធ្មត់ពីភាគីទាំងពីរ ជាជាងសន្មតថាវានឹងដោះស្រាយដោយខ្លួនឯង។"
      ]
    }
  };
  const CHALLENGE_BANK = {
    en: {
      high: [
        "the main risk is complacency — things feel so easy that neither of you tends to it on purpose.",
        "it's rarely a source of conflict, though that can mean it's also easy to take for granted."
      ],
      medium: [
        "differences in pace or approach here can cause friction if left unaddressed.",
        "misreading each other's signals is the main risk — checking in explicitly helps."
      ],
      low: [
        "this is realistically where most friction in the relationship will show up.",
        "without deliberate effort, this can become a recurring source of tension."
      ]
    },
    km: {
      high: [
        "ហានិភ័យចម្បងគឺការធ្វេសប្រហែស — អ្វីៗមានអារម្មណ៍ងាយស្រួលពេក ដល់អ្នកទាំងពីរមិនខ្វល់ចំពោះវាដោយចេតនា។",
        "កម្រជាប្រភពជម្លោះណាស់ ប៉ុន្តែនោះអាចធ្វើឱ្យវាងាយត្រូវបានមើលរំលង។"
      ],
      medium: [
        "ភាពខុសគ្នានៃល្បឿន ឬវិធីសាស្ត្រទីនេះអាចបង្កភាពតានតឹង ប្រសិនបើមិនដោះស្រាយ។",
        "ការយល់ខុសសញ្ញារបស់គ្នាទៅវិញទៅមកគឺជាហានិភ័យចម្បង — ការពិនិត្យឡើងវិញដោយបើកចំហជួយបាន។"
      ],
      low: [
        "នេះជាកន្លែងជាក់ស្តែងដែលការប៉ះទង្គិចភាគច្រើននៅក្នុងទំនាក់ទំនងនឹងលេចឡើង។",
        "ដោយគ្មានការខិតខំដែលមានគោលបំណង នេះអាចក្លាយជាប្រភពភាពតានតឹងកើតឡើងដដែលៗ។"
      ]
    }
  };

  function pick(seedStr, categoryKey, arr) {
    const h = hashSeed(seedStr + "|" + categoryKey + "|pick");
    return arr[h % arr.length];
  }

  function worksSentence(seedStr, categoryKey, tier) {
    const bank = (WORKS_BANK[lang] || WORKS_BANK.en);
    return pick(seedStr, categoryKey, bank[tier] || bank.medium);
  }
  function challengeSentence(seedStr, categoryKey, tier) {
    const bank = (CHALLENGE_BANK[lang] || CHALLENGE_BANK.en);
    return pick(seedStr, categoryKey, bank[tier] || bank.medium);
  }

  const SECTION_TITLES = {
    en: {
      love: "❤️ Love & Romance", emotional: "💕 Emotional Connection", communication: "🗣️ Communication",
      trust: "🤝 Trust", family: "🏠 Family & Home", financial: "💰 Money & Financial Habits",
      chemistry: "🔥 Romantic/Physical Chemistry", personality: "🧠 Personality Compatibility",
      conflict: "⚡ Conflict & Arguments", longterm: "💍 Long-Term Relationship", growth: "🌱 Growth Together"
    },
    km: {
      love: "❤️ ស្នេហា និងមហាភិរម្យ", emotional: "💕 ទំនាក់ទំនងអារម្មណ៍", communication: "🗣️ ការប្រាស្រ័យទាក់ទង",
      trust: "🤝 ទំនុកចិត្ត", family: "🏠 គ្រួសារ និងផ្ទះសម្បែង", financial: "💰 លុយកាក់ និងទម្លាប់ហិរញ្ញវត្ថុ",
      chemistry: "🔥 គីមីស្នេហា/រាងកាយ", personality: "🧠 ភាពសមស្របបុគ្គលិកលក្ខណៈ",
      conflict: "⚡ ជម្លោះ និងការឈ្លោះប្រកែក", longterm: "💍 ទំនាក់ទំនងរយៈពេលវែង", growth: "🌱 ការរីកចម្រើនជាមួយគ្នា"
    }
  };

  function buildAnalysis(signA, signB, numA, numB, elRel, modRel, numRel, seedStr) {
    const rootA = typeof lifePathRoot === "function" ? lifePathRoot(numA.lifePath) : numA.lifePath;
    const rootB = typeof lifePathRoot === "function" ? lifePathRoot(numB.lifePath) : numB.lifePath;
    const nameA = signName(signA), nameB = signName(signB);
    const elA = elLabel(signA.element), elB = elLabel(signB.element);
    const modA = modLabel(signA.modality), modB = modLabel(signB.modality);
    const titles = SECTION_TITLES[lang] || SECTION_TITLES.en;

    function section(key, lead, tierForWorks, tierForChallenge) {
      const w = worksSentence(seedStr, key, tierForWorks);
      const c = challengeSentence(seedStr, key, tierForChallenge);
      return {
        title: titles[key],
        works: `${lead} ${w}`,
        challenge: c.charAt(0).toUpperCase() + c.slice(1)
      };
    }

    const leads = isKm
      ? {
          love: `ជាគូដែលផ្សំធាតុ${elA}-${elB} (${nameA} និង${nameB}) របៀបដែលអ្នកបង្ហាញស្នេហា`,
          emotional: `ខាងផ្នែកអារម្មណ៍ គូ${nameA}-${nameB}`,
          communication: `រវាង${nameA}ខាង${modA} និង${nameB}ខាង${modB} ការប្រាស្រ័យទាក់ទងប្រចាំថ្ងៃ`,
          trust: `ការកសាងទំនុកចិត្តរវាងអ្នកទាំងពីរ (ចរិតៈ ${modA}/${modB} លេខផ្លូវជីវិត ${rootA} និង ${rootB})`,
          family: `ចំពោះជីវិតគ្រួសារ និងផ្ទះសម្បែង`,
          financial: `ខាងហិរញ្ញវត្ថុ ជាមួយលេខផ្លូវជីវិត ${rootA} និង ${rootB}`,
          chemistry: `គីមីរវាងថាមពល${elA} និង${elB}`,
          personality: `ភាពសមស្របបុគ្គលិកលក្ខណៈរវាង${nameA} និង${nameB}`,
          conflict: `នៅពេលមានការមិនចុះសម្រុងគ្នារវាងនិមិត្តសញ្ញា${modA}/${modB}ទាំងពីរ`,
          longterm: `ចំពោះទស្សនវិស័យរយៈពេលវែង`,
          growth: `ក្នុងនាមជាបុគ្គលម្នាក់ៗដែលរីកចម្រើនជាមួយគ្នា (លេខផ្លូវជីវិត ${rootA} និង ${rootB})`
        }
      : {
          love: `As a ${signA.element}-${signB.element} pairing (${signA.name} and ${signB.name}), how you express affection`,
          emotional: `Emotionally, a ${signA.name}-${signB.name} pair`,
          communication: `Between ${signA.modality} ${signA.name} and ${signB.modality} ${signB.name}, day-to-day communication`,
          trust: `Building trust between you (modality: ${signA.modality}/${signB.modality}, life paths ${rootA} and ${rootB})`,
          family: `When it comes to home life and family`,
          financial: `Financially, with life path numbers ${rootA} and ${rootB} in the mix`,
          chemistry: `Chemistry between ${signA.element} and ${signB.element} energy`,
          personality: `Overall personality fit between a ${signA.name} and a ${signB.name}`,
          conflict: `When disagreements happen between two ${signA.modality}/${signB.modality} signs`,
          longterm: `Looking at the long run`,
          growth: `As individuals growing side by side (life paths ${rootA} & ${rootB})`
        };

    return [
      section("love", leads.love, elRel.tier, elRel.tier),
      section("emotional", leads.emotional, elRel.tier, elRel.tier),
      section("communication", leads.communication, modRel.tier, modRel.tier),
      section("trust", leads.trust, modRel.tier, numRel.tier),
      section("family", leads.family, elRel.tier, modRel.tier),
      section("financial", leads.financial, numRel.tier, numRel.tier),
      section("chemistry", leads.chemistry, elRel.tier, elRel.tier),
      section("personality", leads.personality, modRel.tier, numRel.tier),
      section("conflict", leads.conflict, modRel.tier, elRel.tier),
      section("longterm", leads.longterm, modRel.tier, elRel.tier),
      section("growth", leads.growth, numRel.tier, modRel.tier)
    ];
  }

  function topAndBottom(scores) {
    const entries = Object.entries(scores);
    entries.sort((a, b) => b[1] - a[1]);
    return { top: entries.slice(0, 3), bottom: entries.slice(-3).reverse() };
  }

  const CATEGORY_LABEL = {
    en: {
      love: "Love & Romance", emotional: "Emotional Connection", communication: "Communication",
      trust: "Trust", family: "Family & Home", financial: "Financial Compatibility",
      chemistry: "Romantic Chemistry", personality: "Personality Fit", conflict: "Conflict Handling",
      growth: "Growth Together", longterm: "Long-Term Outlook", intimacy: "Intimacy"
    },
    km: {
      love: "ស្នេហា និងមហាភិរម្យ", emotional: "ទំនាក់ទំនងអារម្មណ៍", communication: "ការប្រាស្រ័យទាក់ទង",
      trust: "ទំនុកចិត្ត", family: "គ្រួសារ និងផ្ទះសម្បែង", financial: "ភាពសមស្របហិរញ្ញវត្ថុ",
      chemistry: "គីមីស្នេហា", personality: "ភាពសមស្របបុគ្គលិកលក្ខណៈ", conflict: "ការដោះស្រាយជម្លោះ",
      growth: "ការរីកចម្រើនជាមួយគ្នា", longterm: "ទស្សនវិស័យរយៈពេលវែង", intimacy: "ភាពស្និទ្ធស្នាល"
    }
  };

  function catLabel(key) { return (CATEGORY_LABEL[lang] || CATEGORY_LABEL.en)[key] || key; }

  function buildInsights(signA, signB, numA, numB, scores, pA, pB) {
    const { top, bottom } = topAndBottom(scores);
    const nameA = signName(signA), nameB = signName(signB);
    const elA = elLabel(signA.element), elB = elLabel(signB.element);
    const modA = modLabel(signA.modality), modB = modLabel(signB.modality);

    const strengths = top.map(function (e) {
      return isKm
        ? `${catLabel(e[0])}គឺជាផ្នែកខ្លាំងបំផុតមួយរបស់អ្នក (${e[1]}/100) — ពឹងផ្អែកលើវានៅពេលផ្នែកផ្សេងទៀតមានអារម្មណ៍ពិបាក។`
        : `${catLabel(e[0])} is one of your strongest areas (${e[1]}/100) — lean on it when things feel hard elsewhere.`;
    });
    const challenges = bottom.map(function (e) {
      return isKm
        ? `${catLabel(e[0])}ទទួលបានពិន្ទុទាបជាង (${e[1]}/100) — នេះជាក់ស្តែងជាកន្លែងដែលអ្នកទាំងពីរនឹងត្រូវខិតខំដឹងខ្លួនបំផុត។`
        : `${catLabel(e[0])} scores lower (${e[1]}/100) — this is realistically where you'll both need to put in the most conscious effort.`;
    });

    const tips = isKm
      ? [
          `ដោយសារ${pA}ជា${nameA} ហើយ${pB}ជា${nameB} សូមព្យាយាមនិយាយពីល្បឿនខុសគ្នារបស់អ្នកដោយបើកចំហ ជាជាងសន្មតថាអ្នកម្នាក់ទៀតដឹងរួចស្រាប់ — ថាមពល${elA} និងថាមពល${elB}មិនអាចយល់គ្នាដោយស្វ័យប្រវត្តិទេ។`,
          `កំណត់ពេលជជែកពិភាក្សាទៀងទាត់ និងមិនមានហានិភ័យខ្ពស់ អំពីលុយកាក់ និងការរៀបចំជីវិតនៅផ្ទះ — លេខផ្លូវជីវិត ${numA.lifePath} និង ${numB.lifePath} មិនធានាថាអ្នកនឹងមានទម្លាប់ដូចគ្នានៅទីនេះទេ។`,
          `ប្រើប្រាស់ប្រភេទខ្លាំងបំផុតរបស់អ្នកខាងលើ នៅពេលម្នាក់ណាម្នាក់មានភាពតានតឹង — វាជាចំណុចភ្ជាប់ដែលអាចទុកចិត្តបានបំផុតដែលអ្នកមាន។`
        ]
      : [
          `Since ${pA} is a ${signA.name} and ${pB} is a ${signB.name}, try naming your different paces out loud instead of assuming the other should already know — ${signA.element.toLowerCase()} energy and ${signB.element.toLowerCase()} energy don't read each other automatically.`,
          `Schedule regular, low-stakes check-ins on money and home-life logistics — numerology life paths ${numA.lifePath} and ${numB.lifePath} don't guarantee you'll default to the same habits here.`,
          `Play to your strongest category above when either of you is stressed — it's the most reliable connector you have.`
        ];

    const needA = lifePathNeed(numA.lifePath);
    const needB = lifePathNeed(numB.lifePath);
    const needsA = isKm
      ? `${pA} (${nameA}) ទំនងជាឲ្យតម្លៃ${needA} ហើយទទួលផលពីដៃគូដែលផ្តល់ចន្លោះសម្រាប់វា ជាជាងរំពឹងឱ្យ${pA}បោះបង់វាចោល។`
      : `${pA} (${signA.name}) likely values ${needA}, and benefits from a partner who makes room for that rather than expecting ${pA} to drop it.`;
    const needsB = isKm
      ? `${pB} (${nameB}) ទំនងជាឲ្យតម្លៃ${needB} ហើយទទួលផលពីដៃគូដែលផ្តល់ចន្លោះសម្រាប់វា ជាជាងរំពឹងឱ្យ${pB}បោះបង់វាចោល។`
      : `${pB} (${signB.name}) likely values ${needB}, and benefits from a partner who makes room for that rather than expecting ${pB} to drop it.`;

    const commTip = isKm
      ? `ដោយសារម្នាក់ក្នុងចំណោមអ្នកមានចរិត${modA} ហើយម្នាក់ទៀតមានចរិត${modB} សូមព្រមព្រៀងគ្នាជាមុនអំពីរបៀបលើកយកបញ្ហាមិនចុះសម្រុងគ្នាមកនិយាយ — ជាជាងរកឃើញរចនាប័ទ្មខុសគ្នារបស់អ្នកនៅពាក់កណ្តាលវិវាទមួយ។`
      : `Because one of you leans ${signA.modality.toLowerCase()} and the other ${signB.modality.toLowerCase()}, agree ahead of time on how you'll raise a disagreement — rather than discovering your different styles in the middle of one.`;
    const loveTip = isKm
      ? `បង្កើតទម្លាប់យ៉ាងហោចណាស់មួយ ដែលសមស្របនឹងធាតុទាំងពីររបស់អ្នក (${elA} និង${elB}) — អ្វីមួយសកម្មប្រសិនបើម្នាក់ណាម្នាក់ជាភ្លើង អ្វីមួយយឺត និងទាក់ទងអារម្មណ៍ប្រសិនបើម្នាក់ណាម្នាក់ជាដី ឬទឹក អ្វីមួយថ្មីប្រសិនបើម្នាក់ណាម្នាក់ជាខ្យល់។`
      : `Make at least one ritual that plays to both of your elements (${signA.element} and ${signB.element}) — something active if either of you is Fire, something slow and sensory if either is Earth or Water, something novel if either is Air.`;

    return { strengths, challenges, tips, needsA, needsB, commTip, loveTip };
  }

  function lifePathNeed(n) {
    const map = isKm
      ? {
          1: "ឯករាជ្យភាព និងសេរីភាពក្នុងការដឹកនាំ",
          2: "ភាពសុខដុមរមនា និងអារម្មណ៍ត្រូវបានគេយល់ដឹងពិតប្រាកដ",
          3: "ចន្លោះសម្រាប់ការបញ្ចេញមតិខ្លួនឯង និងការលេង",
          4: "រចនាសម្ព័ន្ធ ភាពជឿទុកចិត្តបាន និងការធ្វើតាមការសន្យា",
          5: "ភាពចម្រុះ ភាពឆន្ទៈ និងសេរីភាពពីទម្លាប់",
          6: "ភាពជិតស្និទ្ធ ការថែទាំ និងផ្ទះដែលមានស្ថេរភាព",
          7: "ភាពឯកោ និងជម្រៅ មិនមែនគ្រាន់តែពេលវេលានៅលើផ្ទៃនោះទេ",
          8: "មហិច្ឆតាដែលត្រូវបានគោរព មិនមែនត្រូវបានមើលស្រាល",
          9: "ដៃគូដែលចែករំលែក ឬយ៉ាងហោចណាស់គោរពទស្សនៈធំទូលាយ",
          11: "ជម្រៅអារម្មណ៍ និងវិចារណញាណត្រូវបានយកចិត្តទុកដាក់យ៉ាងយកចិត្តទុកដាក់",
          22: "ការគាំទ្រសម្រាប់មហិច្ឆតាធំ និងរយៈពេលវែង",
          33: "ទំនាក់ទំនងដែលអនុញ្ញាតឱ្យពួកគេថែទាំ និងលើកស្ទួយអ្នកដទៃ"
        }
      : {
          1: "independence and the freedom to lead", 2: "harmony and feeling truly heard",
          3: "room for self-expression and play", 4: "structure, reliability, and follow-through",
          5: "variety, spontaneity, and freedom from routine", 6: "closeness, caretaking, and a stable home",
          7: "solitude and depth, not just surface-level time together", 8: "ambition being respected, not dismissed",
          9: "a partner who shares or at least respects a bigger-picture outlook",
          11: "emotional and intuitive depth to be taken seriously", 22: "support for big, long-term ambitions",
          33: "a relationship that lets them care for and uplift others"
        };
    return map[n] || (isKm ? "អារម្មណ៍ត្រូវបានយល់ដឹងតាមលក្ខខណ្ឌផ្ទាល់ខ្លួនរបស់ពួកគេ" : "to feel understood on their own terms");
  }

  // --- meter rendering ---------------------------------------------------
  function meterHtml(label, value) {
    const deg = Math.round((value / 100) * 360);
    return `
      <div class="rc-meter">
        <div class="rc-meter-circle" style="background: conic-gradient(var(--accent) ${deg}deg, rgba(255,255,255,0.08) ${deg}deg);">
          <div class="rc-meter-inner">${value}%</div>
        </div>
        <div class="rc-meter-label">${label}</div>
      </div>
    `;
  }

  function sectionHtml(sec) {
    return `
      <details class="rc-analysis-item">
        <summary>${sec.title}</summary>
        <div class="rc-analysis-body">
          <p><strong>${S.rc_works_well_label || "What may work well"}:</strong> ${sec.works}</p>
          <p><strong>${S.rc_challenge_label || "What may create challenges"}:</strong> ${sec.challenge}</p>
        </div>
      </details>
    `;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    const p1Name = S.rc_person1_legend || "Person 1";
    const p2Name = S.rc_person2_legend || "Person 2";
    const dob1Raw = document.getElementById("rc-p1-dob").value;
    const dob2Raw = document.getElementById("rc-p2-dob").value;
    const time1 = document.getElementById("rc-p1-time").value;
    const time2 = document.getElementById("rc-p2-time").value;
    const loc1 = "";
    const loc2 = "";

    if (!dob1Raw || !dob2Raw) {
      showError(S.rc_err_required || "Please enter both people's dates of birth.");
      return;
    }

    const dob1 = parseDobInput(dob1Raw);
    const dob2 = parseDobInput(dob2Raw);
    if (!dob1 || !dob2) {
      showError(S.rc_err_invalid || "One of the dates entered isn't valid — please re-check it.");
      return;
    }

    const now = new Date();
    now.setHours(23, 59, 59, 999);
    if (dob1 > now || dob2 > now) {
      showError(S.rc_err_future || "Birth dates can't be in the future — please check the date entered.");
      return;
    }

    const signA = getSunSign(dob1);
    const signB = getSunSign(dob2);
    const numA = calculateNumerology(dob1);
    const numB = calculateNumerology(dob2);
    const rel = sunSignRelation(signA, signB);
    const numRel = numerologyRelation(numA.lifePath, numB.lifePath);
    const seedStr = dob1Raw + "|" + dob2Raw;

    // Chinese zodiac (lunar calendar year/animal), reusing the site's
    // existing Chinese-zodiac data and compatibility logic.
    const hasChineseData = typeof getZodiac === "function";
    const chineseA = hasChineseData ? getZodiac(dob1) : null;
    const chineseB = hasChineseData ? getZodiac(dob2) : null;
    const chineseRel = (hasChineseData && chineseA && chineseB) ? getCompatibilityType(chineseA.animal, chineseB.animal) : null;
    const chineseCompatSource = (isKm && typeof KM_COMPAT_INFO !== "undefined") ? KM_COMPAT_INFO : COMPAT_INFO;

    const scores = computeScores(signA, signB, rel.element, rel.modality, numRel, seedStr);
    const analysis = buildAnalysis(signA, signB, numA, numB, rel.element, rel.modality, numRel, seedStr);
    const insights = buildInsights(signA, signB, numA, numB, scores, p1Name, p2Name);

    const dateLocale = isKm ? "km-KH" : "en-US";
    function fmtDate(d) {
      try { return d.toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" }); }
      catch (e) { return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); }
    }

    const hasTimeLoc = !!time1 || !!time2 || !!loc1 || !!loc2;
    const extraAstroHtml = hasTimeLoc
      ? `<p>${S.rc_extra_astro_unavailable || "Moon, Rising, Venus, and Mars signs require precise astronomical calculations this tool doesn't perform yet, so we won't guess them."}</p>`
      : `<p>${S.rc_extra_astro_missing || "Birth time/location wasn't provided, so this section is based primarily on Sun-sign compatibility."}</p>`;

    const meterOrder = isKm
      ? [
          ["love", "ស្នេហា"], ["communication", "ការប្រាស្រ័យទាក់ទង"], ["emotional", "ទំនាក់ទំនងអារម្មណ៍"],
          ["trust", "ទំនុកចិត្ត"], ["chemistry", "មហាភិរម្យ"], ["financial", "ភាពសមស្របហិរញ្ញវត្ថុ"],
          ["family", "ភាពសមស្របគ្រួសារ"], ["intimacy", "ភាពស្និទ្ធស្នាល"], ["conflict", "ការគ្រប់គ្រងជម្លោះ"],
          ["longterm", "ភាពសមស្របរយៈពេលវែង"]
        ]
      : [
          ["love", "Love"], ["communication", "Communication"], ["emotional", "Emotional Connection"],
          ["trust", "Trust"], ["chemistry", "Romance"], ["financial", "Financial Compatibility"],
          ["family", "Family Compatibility"], ["intimacy", "Intimacy"], ["conflict", "Conflict Management"],
          ["longterm", "Long-Term Compatibility"]
        ];

    resultBox.innerHTML = `
      <div class="rc-result-card">
        <h2 class="rc-result-title">${S.rc_hero_title || "💞 Relationship Compatibility Calculator"}</h2>
        <div class="rc-pair-header">
          <div class="rc-pair-person">
            <span class="rc-pair-symbol">${signA.symbol}${chineseA ? " " + ZODIAC_EMOJI[chineseA.animal] : ""}</span>
            <div><strong>${p1Name}</strong><br>${signName(signA)}${chineseA ? " · " + (isKm ? KM_ANIMAL_NAMES[chineseA.animal] : chineseA.animal) : ""}</div>
            <div class="rc-pair-lifepath">${S.rc_life_path_label || "Life Path"} ${masterDisplay(numA.lifePath)}</div>
          </div>
          <div class="rc-pair-heart">❤️</div>
          <div class="rc-pair-person">
            <span class="rc-pair-symbol">${signB.symbol}${chineseB ? " " + ZODIAC_EMOJI[chineseB.animal] : ""}</span>
            <div><strong>${p2Name}</strong><br>${signName(signB)}${chineseB ? " · " + (isKm ? KM_ANIMAL_NAMES[chineseB.animal] : chineseB.animal) : ""}</div>
            <div class="rc-pair-lifepath">${S.rc_life_path_label || "Life Path"} ${masterDisplay(numB.lifePath)}</div>
          </div>
        </div>

        <h3 class="rc-subheading">${S.rc_summary_heading || "Compatibility Summary"}</h3>
        <div class="rc-meter-grid">
          ${meterOrder.map(function (m) { return meterHtml(m[1], scores[m[0]]); }).join("")}
        </div>
        <p class="rc-disclaimer-inline">${S.rc_summary_disclaimer || ""}</p>

        <div class="rc-two-col">
          <div class="rc-profile-card">
            <h3>${S.rc_western_zodiac_heading || "Western Zodiac"} — ${p1Name}</h3>
            <p class="rc-sign-line">${signA.symbol} <strong>${signName(signA)}</strong> · ${elLabel(signA.element)} · ${modLabel(signA.modality)}</p>
            <p class="rc-born-sub">${fmtDate(dob1)}</p>
            <p>${signTraits(signA)}</p>
          </div>
          <div class="rc-profile-card">
            <h3>${S.rc_western_zodiac_heading || "Western Zodiac"} — ${p2Name}</h3>
            <p class="rc-sign-line">${signB.symbol} <strong>${signName(signB)}</strong> · ${elLabel(signB.element)} · ${modLabel(signB.modality)}</p>
            <p class="rc-born-sub">${fmtDate(dob2)}</p>
            <p>${signTraits(signB)}</p>
          </div>
        </div>

        ${chineseA && chineseB ? `
        <div class="rc-two-col">
          <div class="rc-profile-card">
            <h3>${S.rc_chinese_zodiac_heading || "Chinese Zodiac"} — ${p1Name}</h3>
            <p class="rc-sign-line">${ZODIAC_EMOJI[chineseA.animal]} <strong>${isKm ? KM_ELEMENT_NAMES[chineseA.element] + " " + KM_ANIMAL_NAMES[chineseA.animal] : chineseA.element + " " + chineseA.animal}</strong></p>
            <p class="rc-born-sub">${fmt(S.born_sub_tpl || "Born {date} — Year of the {year}", { date: fmtDate(dob1), year: chineseA.zodiacYear })}</p>
          </div>
          <div class="rc-profile-card">
            <h3>${S.rc_chinese_zodiac_heading || "Chinese Zodiac"} — ${p2Name}</h3>
            <p class="rc-sign-line">${ZODIAC_EMOJI[chineseB.animal]} <strong>${isKm ? KM_ELEMENT_NAMES[chineseB.element] + " " + KM_ANIMAL_NAMES[chineseB.animal] : chineseB.element + " " + chineseB.animal}</strong></p>
            <p class="rc-born-sub">${fmt(S.born_sub_tpl || "Born {date} — Year of the {year}", { date: fmtDate(dob2), year: chineseB.zodiacYear })}</p>
          </div>
        </div>
        <p class="rc-chinese-compat-note">${(chineseCompatSource[chineseRel] && chineseCompatSource[chineseRel].text && chineseCompatSource[chineseRel].text.romantic) || ""}</p>
        ` : ""}

        <div class="rc-two-col">
          <div class="rc-profile-card">
            <h3>${S.rc_numerology_heading || "Numerology"} — ${p1Name}</h3>
            <p class="rc-numerology-calc">${numA.month} + ${numA.day} + ${numA.year} → ${numA.monthReduced} + ${numA.dayReduced} + ${numA.yearReduced} = ${numA.lifePathTotal} → <strong>${masterDisplay(numA.lifePath)}</strong></p>
            <p>${S.rc_life_path_label || "Life Path"}: <strong>${masterDisplay(numA.lifePath)}</strong> — ${(lifePathInfoSource[numA.lifePath] || {}).label || ""}</p>
            <p>${(lifePathInfoSource[numA.lifePath] || {}).blurb || ""}</p>
            <p>${S.rc_birthday_number_label || "Birthday Number"}: <strong>${masterDisplay(numA.birthdayNumber)}</strong> &nbsp;·&nbsp; ${S.rc_attitude_number_label || "Attitude Number"}: <strong>${masterDisplay(numA.attitudeNumber)}</strong></p>
          </div>
          <div class="rc-profile-card">
            <h3>${S.rc_numerology_heading || "Numerology"} — ${p2Name}</h3>
            <p class="rc-numerology-calc">${numB.month} + ${numB.day} + ${numB.year} → ${numB.monthReduced} + ${numB.dayReduced} + ${numB.yearReduced} = ${numB.lifePathTotal} → <strong>${masterDisplay(numB.lifePath)}</strong></p>
            <p>${S.rc_life_path_label || "Life Path"}: <strong>${masterDisplay(numB.lifePath)}</strong> — ${(lifePathInfoSource[numB.lifePath] || {}).label || ""}</p>
            <p>${(lifePathInfoSource[numB.lifePath] || {}).blurb || ""}</p>
            <p>${S.rc_birthday_number_label || "Birthday Number"}: <strong>${masterDisplay(numB.birthdayNumber)}</strong> &nbsp;·&nbsp; ${S.rc_attitude_number_label || "Attitude Number"}: <strong>${masterDisplay(numB.attitudeNumber)}</strong></p>
          </div>
        </div>
        <p class="rc-method-note">${S.rc_numerology_method_note || ""}</p>

        <div class="ad-slot">${S.ad_space || "Ad space"}</div>

        <h3 class="rc-subheading">${S.rc_analysis_heading || "Relationship Analysis"}</h3>
        <div class="rc-analysis-list">
          ${analysis.map(sectionHtml).join("")}
        </div>

        <div class="ad-slot">${S.ad_space || "Ad space"}</div>

        <h3 class="rc-subheading">${S.rc_insights_heading || "Personalized Insights"}</h3>
        <div class="rc-insight-block">
          <h4>${S.rc_strengths_heading || "💚 Biggest Strengths"}</h4>
          <ul>${insights.strengths.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div class="rc-insight-block">
          <h4>${S.rc_challenges_heading || "⚠️ Potential Challenges"}</h4>
          <ul>${insights.challenges.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div class="rc-insight-block">
          <h4>${S.rc_tips_heading || "💡 Relationship Tips"}</h4>
          <ul>${insights.tips.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div class="rc-insight-block">
          <h4>${S.rc_needs_heading || "❤️ What Each Person May Need"}</h4>
          <p>${insights.needsA}</p>
          <p>${insights.needsB}</p>
        </div>
        <div class="rc-insight-block">
          <h4>${S.rc_comm_tip_heading || "💬 Communication Tip"}</h4>
          <p>${insights.commTip}</p>
        </div>
        <div class="rc-insight-block">
          <h4>${S.rc_love_tip_heading || "💕 Love Tip"}</h4>
          <p>${insights.loveTip}</p>
        </div>

        <h3 class="rc-subheading">${S.rc_extra_astro_heading || "Moon, Rising, Venus & Mars"}</h3>
        ${extraAstroHtml}

        <p class="rc-disclaimer">${S.rc_disclaimer || ""}</p>
      </div>
    `;
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
