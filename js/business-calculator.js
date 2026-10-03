// business-calculator.js — Two-Person Business Partnership Compatibility
// Calculator (Chinese Zodiac + Five Elements). Lives on
// business-partner.html only.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("biz-form");
  const resultBox = document.getElementById("biz-result");
  const errorBox = document.getElementById("biz-form-error");
  const formSection = document.getElementById("biz-form-section");
  if (!form) return;

  const lang = typeof getLang === "function" ? getLang() : "en";
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};
  const isKm = lang === "km";
  const animalBusinessSource = (isKm && typeof ANIMAL_BUSINESS !== "undefined" && ANIMAL_BUSINESS.km) ? ANIMAL_BUSINESS.km : ANIMAL_BUSINESS.en;
  const elementName = (el) => (isKm && typeof KM_ELEMENT_NAMES !== "undefined") ? KM_ELEMENT_NAMES[el] : el;
  const animalName = (an) => (isKm && typeof KM_ANIMAL_NAMES !== "undefined") ? KM_ANIMAL_NAMES[an] : an;
  const yinYangLabel = (yy) => isKm ? (yy === "Yang" ? "☯️ យ៉ាង" : "☯️ យិន") : (yy === "Yang" ? "☯️ Yang" : "☯️ Yin");

  const todayIso = new Date().toISOString().slice(0, 10);
  ["biz-p1-dob", "biz-p2-dob"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) { el.setAttribute("max", todayIso); el.setAttribute("min", "1900-01-01"); }
  });

  function parseDobInput(value) {
    if (!value) return null;
    const d = new Date(value + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }
  function showError(msg) { errorBox.textContent = msg; errorBox.hidden = false; }
  function clearError() { errorBox.hidden = true; errorBox.textContent = ""; }

  // --- scoring helpers ---------------------------------------------------
  function hashSeed(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }
  function jitterFor(seedStr, key) { return (hashSeed(seedStr + "|" + key) % 11) - 5; }
  const TIER_BASE = { high: 86, medium: 64, low: 42 };
  function tierScore(tier) { return TIER_BASE[tier] !== undefined ? TIER_BASE[tier] : 64; }
  function clampScore(n) { return Math.max(15, Math.min(97, Math.round(n))); }

  const ANIMAL_TIER_MAP = { same: "high", triangle: "high", neutral: "medium", clash: "low" };

  const CATEGORY_META_EN = [
    ["entrepreneurship", "🚀", "Entrepreneurship"],
    ["leadership", "👑", "Leadership"],
    ["finance", "💰", "Money & Finance"],
    ["growth", "📈", "Growth Strategy"],
    ["decision", "🧠", "Decision Making"],
    ["communication", "🗣️", "Communication"],
    ["trust", "🤝", "Trust & Reliability"],
    ["conflict", "⚡", "Conflict Management"],
    ["operations", "🏢", "Operations"],
    ["sales", "📣", "Sales & Marketing"],
    ["innovation", "💡", "Innovation"],
    ["risk", "🛡️", "Risk Management"]
  ];
  const CATEGORY_META_KM = [
    ["entrepreneurship", "🚀", "ភាពជាសហគ្រិន"],
    ["leadership", "👑", "ភាពជាអ្នកដឹកនាំ"],
    ["finance", "💰", "ប្រាក់កាស និងហិរញ្ញវត្ថុ"],
    ["growth", "📈", "យុទ្ធសាស្ត្ររីកចម្រើន"],
    ["decision", "🧠", "ការសម្រេចចិត្ត"],
    ["communication", "🗣️", "ការប្រាស្រ័យទាក់ទង"],
    ["trust", "🤝", "ទំនុកចិត្ត និងភាពអាចទុកចិត្តបាន"],
    ["conflict", "⚡", "ការគ្រប់គ្រងជម្លោះ"],
    ["operations", "🏢", "ប្រតិបត្តិការ"],
    ["sales", "📣", "ការលក់ និងទីផ្សារ"],
    ["innovation", "💡", "ភាពច្នៃប្រឌិតថ្មី"],
    ["risk", "🛡️", "ការគ្រប់គ្រងហានិភ័យ"]
  ];
  const CATEGORY_META = isKm ? CATEGORY_META_KM : CATEGORY_META_EN;

  const WEIGHTS = {
    entrepreneurship: { a: 0.6, e: 0.4 },
    leadership: { a: 0.5, e: 0.3, yy: 0.2 },
    finance: { a: 0.3, e: 0.7 },
    growth: { a: 0.5, e: 0.5 },
    decision: { a: 0.6, e: 0.3, yy: 0.1 },
    communication: { a: 0.5, e: 0.2, yy: 0.3 },
    trust: { a: 0.7, e: 0.3 },
    conflict: { a: 0.6, e: 0.4 },
    operations: { a: 0.4, e: 0.6 },
    sales: { a: 0.6, e: 0.4 },
    innovation: { a: 0.5, e: 0.5 },
    risk: { a: 0.4, e: 0.6 }
  };

  function computeScores(animalTier, elementTier, yinYangDifferent, seedStr) {
    const aS = tierScore(animalTier);
    const eS = tierScore(elementTier);
    const scores = {};
    CATEGORY_META.forEach(function (c) {
      const key = c[0];
      const w = WEIGHTS[key];
      let base = aS * w.a + eS * w.e;
      if (w.yy) base += (yinYangDifferent ? 8 : -4) * w.yy;
      scores[key] = clampScore(base + jitterFor(seedStr, key));
    });
    return scores;
  }

  // --- narrative snippet banks (business-framed) --------------------------
  const WORKS_BANK = {
    en: {
      high: [
        "tends to come together naturally between the two of you, without much friction.",
        "is a genuine structural strength for this partnership.",
        "lines up well — a solid foundation to build business habits on."
      ],
      medium: [
        "can work well with some explicit ground rules, rather than assuming you'll default to the same approach.",
        "has real potential, but benefits from being discussed openly early on.",
        "balances out reasonably, with each of you covering a gap the other has."
      ],
      low: [
        "is realistically where the two of you will need a documented process rather than relying on instinct.",
        "is a traditional friction point for this pairing — worth addressing in writing before it becomes a dispute.",
        "takes deliberate structure; left informal, it's the likeliest source of disagreement."
      ]
    },
    km: {
      high: [
        "ច្រើនតែកើតឡើងដោយធម្មជាតិរវាងអ្នកទាំងពីរ ដោយមិនមានភាពតានតឹងច្រើននោះទេ។",
        "ជាភាពខ្លាំងផ្នែករចនាសម្ព័ន្ធពិតប្រាកដសម្រាប់ដៃគូភាពនេះ។",
        "ស៊ីគ្នាល្អ — ជាមូលដ្ឋានរឹងមាំដើម្បីកសាងទម្លាប់អាជីវកម្ម។"
      ],
      medium: [
        "អាចដំណើរការបានល្អជាមួយនឹងក្បួនច្បាស់លាស់ ជាជាងសន្មតថាអ្នកទាំងពីរនឹងប្រើវិធីសាស្ត្រដូចគ្នា។",
        "មានសក្តានុពលពិតប្រាកដ ប៉ុន្តែទទួលផលពីការពិភាក្សាដោយបើកចំហនៅដើម។",
        "មានតុល្យភាពសមហេតុផល ដោយម្នាក់ៗគ្របដណ្តប់ចំណុចខ្វះខាតដែលម្នាក់ទៀតមាន។"
      ],
      low: [
        "ជាក់ស្តែងនេះជាកន្លែងដែលអ្នកទាំងពីរនឹងត្រូវការដំណើរការជាលាយលក្ខណ៍អក្សរ ជាជាងពឹងផ្អែកលើវិចារណញាណ។",
        "ជាចំណុចតានតឹងបែបប្រពៃណីសម្រាប់ការផ្គូផ្គងនេះ — គួរដោះស្រាយជាលាយលក្ខណ៍អក្សរមុននឹងវាក្លាយជាវិវាទ។",
        "ត្រូវការរចនាសម្ព័ន្ធដោយចេតនា ទុកមិនផ្លូវការវានឹងទំនងជាប្រភពនៃការមិនចុះសម្រុងគ្នាបំផុត។"
      ]
    }
  };
  const CHALLENGE_BANK = {
    en: {
      high: [
        "the main risk is assuming it'll always stay this easy and never formalizing it in writing.",
        "it's rarely a source of conflict, but an informal handshake approach can still bite you later — document it anyway."
      ],
      medium: [
        "differing instincts here can cause friction under pressure if you haven't agreed on a process in advance.",
        "misaligned expectations are the main risk — a short written agreement heads off most of it."
      ],
      low: [
        "this is realistically where most partnership disputes in this pairing would originate.",
        "without a clear, written agreement, this is likely to become a recurring sticking point."
      ]
    },
    km: {
      high: [
        "ហានិភ័យចម្បងគឺការសន្មតថាវានឹងងាយស្រួលជានិច្ច ហើយមិនដែលធ្វើឱ្យវាផ្លូវការជាលាយលក្ខណ៍អក្សរ។",
        "វាកម្រជាប្រភពនៃជម្លោះ ប៉ុន្តែវិធីសាស្ត្រចាប់ដៃគ្នាដោយមិនផ្លូវការនៅតែអាចបង្កបញ្ហានៅពេលក្រោយ — ឯកសារវាទោះបីយ៉ាងណាក៏ដោយ។"
      ],
      medium: [
        "សភាវគតិខុសគ្នានៅទីនេះអាចបង្កភាពតានតឹងក្រោមសម្ពាធ ប្រសិនបើអ្នកមិនបានព្រមព្រៀងលើដំណើរការជាមុន។",
        "ការរំពឹងទុកមិនត្រូវគ្នាគឺជាហានិភ័យចម្បង — កិច្ចព្រមព្រៀងជាលាយលក្ខណ៍អក្សរខ្លីជួយដោះស្រាយបានភាគច្រើន។"
      ],
      low: [
        "ជាក់ស្តែងនេះជាកន្លែងដែលវិវាទដៃគូភាគច្រើនក្នុងការផ្គូផ្គងនេះនឹងកើតឡើង។",
        "បើគ្មានកិច្ចព្រមព្រៀងជាលាយលក្ខណ៍អក្សរច្បាស់លាស់ នេះទំនងជាក្លាយជាចំណុចជាប់គាំងដែលកើតឡើងដដែលៗ។"
      ]
    }
  };
  function pick(seedStr, key, arr) { return arr[hashSeed(seedStr + "|" + key + "|pick") % arr.length]; }
  function worksSentence(seedStr, key, tier) {
    const bank = WORKS_BANK[lang] || WORKS_BANK.en;
    return pick(seedStr, key, bank[tier] || bank.medium);
  }
  function challengeSentence(seedStr, key, tier) {
    const bank = CHALLENGE_BANK[lang] || CHALLENGE_BANK.en;
    const s = pick(seedStr, key, bank[tier] || bank.medium);
    return isKm ? s : (s.charAt(0).toUpperCase() + s.slice(1));
  }

  function buildAnalysis(bziA, bziB, animalTier, elementTier, seedStr) {
    return CATEGORY_META.map(function (c) {
      const key = c[0], emoji = c[1], title = c[2];
      const lead = isKm
        ? `រវាង${animalName(bziA.animal)} (${elementName(bziA.element)}) និង${animalName(bziB.animal)} (${elementName(bziB.element)})`
        : `Between ${bziA.animal} (${bziA.element}) and ${bziB.animal} (${bziB.element})`;
      const titleLower = isKm ? title : title.toLowerCase();
      return {
        title: `${emoji} ${title}`,
        works: isKm
          ? `${lead} ទាក់ទងនឹង${titleLower} ${worksSentence(seedStr, key, animalTier)}`
          : `${lead}, ${titleLower} ${worksSentence(seedStr, key, animalTier)}`,
        challenge: challengeSentence(seedStr, key, key === "finance" || key === "operations" || key === "risk" ? elementTier : animalTier)
      };
    });
  }

  function topBottom(scores) {
    const entries = Object.entries(scores);
    entries.sort((a, b) => b[1] - a[1]);
    return { top: entries.slice(0, 3), bottom: entries.slice(-3).reverse() };
  }

  const CATEGORY_LABEL = {};
  CATEGORY_META.forEach(function (c) { CATEGORY_LABEL[c[0]] = c[2]; });

  function meterHtml(label, value) {
    const deg = Math.round((value / 100) * 360);
    return `
      <div class="biz-meter">
        <div class="biz-meter-circle" style="background: conic-gradient(var(--biz-gold) ${deg}deg, rgba(255,255,255,0.06) ${deg}deg);">
          <div class="biz-meter-inner">${value}%</div>
        </div>
        <div class="biz-meter-label">${label}</div>
      </div>
    `;
  }

  function sectionHtml(sec) {
    return `
      <details class="biz-analysis-item">
        <summary>${sec.title}</summary>
        <div class="biz-analysis-body">
          <p><strong>${S.biz_works_well_label || "What may work well"}:</strong> ${sec.works}</p>
          <p><strong>${S.biz_challenge_label || "What may create challenges"}:</strong> ${sec.challenge}</p>
        </div>
      </details>
    `;
  }

  const CHECKLIST_ITEMS_EN = [
    "Ownership percentage", "Initial investment", "Profit distribution", "Salary / owner draws",
    "Who controls the bank account", "Spending approval limits", "Hiring authority", "Major decision rules",
    "Debt / loans", "Intellectual property", "Customer ownership", "What happens if one partner leaves",
    "Buyout formula", "Dispute resolution", "Business sale rules"
  ];
  const CHECKLIST_ITEMS_KM = [
    "ភាគរយកម្មសិទ្ធិ", "ការវិនិយោគដំបូង", "ការបែងចែកប្រាក់ចំណេញ", "ប្រាក់ខែ / ការដកប្រាក់របស់ម្ចាស់",
    "អ្នកគ្រប់គ្រងគណនីធនាគារ", "កម្រិតអនុម័តការចំណាយ", "សិទ្ធិជួលបុគ្គលិក", "ច្បាប់សម្រេចចិត្តសំខាន់ៗ",
    "បំណុល / ប្រាក់កម្ចី", "កម្មសិទ្ធិបញ្ញា", "កម្មសិទ្ធិអតិថិជន", "ករណីដៃគូម្នាក់ចាកចេញ",
    "រូបមន្តទិញយកភាគហ៊ុន", "ការដោះស្រាយវិវាទ", "ច្បាប់លក់អាជីវកម្ម"
  ];
  const CHALLENGE_TOPICS_EN = ["Ownership", "Money", "Workload", "Decision authority", "Business strategy", "Hiring", "Expansion", "Personal withdrawals", "Debt", "Exit strategy"];
  const CHALLENGE_TOPICS_KM = ["កម្មសិទ្ធិ", "ប្រាក់កាស", "បន្ទុកការងារ", "សិទ្ធិសម្រេចចិត្ត", "យុទ្ធសាស្ត្រអាជីវកម្ម", "ការជួលបុគ្គលិក", "ការពង្រីក", "ការដកប្រាក់ផ្ទាល់ខ្លួន", "បំណុល", "យុទ្ធសាស្ត្រចាកចេញ"];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    const dob1Raw = document.getElementById("biz-p1-dob").value;
    const dob2Raw = document.getElementById("biz-p2-dob").value;
    const time1 = document.getElementById("biz-p1-time").value;
    const time2 = document.getElementById("biz-p2-time").value;
    const loc1 = "";
    const loc2 = "";
    const p1Name = S.biz_person1_legend || "Person 1";
    const p2Name = S.biz_person2_legend || "Person 2";

    if (!dob1Raw || !dob2Raw) {
      showError(S.biz_err_required || "Please enter both people's dates of birth.");
      return;
    }
    const dob1 = parseDobInput(dob1Raw);
    const dob2 = parseDobInput(dob2Raw);
    if (!dob1 || !dob2) {
      showError(S.biz_err_invalid || "One of the dates entered isn't valid — please re-check it.");
      return;
    }
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    if (dob1 > now || dob2 > now) {
      showError(S.biz_err_future || "Birth dates can't be in the future — please check the date entered.");
      return;
    }

    const bziA = getBaZi(dob1);
    const bziB = getBaZi(dob2);
    const animalRelType = getCompatibilityType(bziA.animal, bziB.animal); // same|triangle|clash|neutral
    const animalTier = ANIMAL_TIER_MAP[animalRelType] || "medium";
    const elRel = elementRelation(bziA.element, bziB.element, lang);
    const yinYangDifferent = bziA.yinYang !== bziB.yinYang;
    const seedStr = dob1Raw + "|" + dob2Raw;

    const scores = computeScores(animalTier, elRel.tier, yinYangDifferent, seedStr);
    const analysis = buildAnalysis(bziA, bziB, animalTier, elRel.tier, seedStr);
    const { top, bottom } = topBottom(scores);

    const dateLocale = lang === "km" ? "km-KH" : "en-US";
    function fmtDate(d) {
      try { return d.toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" }); }
      catch (err) { return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); }
    }

    const bizA = animalBusinessSource[bziA.animal];
    const bizB = animalBusinessSource[bziB.animal];

    const strengths = top.map(function (e) {
      return isKm
        ? `${CATEGORY_LABEL[e[0]]}គឺជាផ្នែកខ្លាំងបំផុតមួយរបស់អ្នក (${e[1]}/100) ដោយផ្អែកលើការបកស្រាយតាមប្រពៃណី — ពឹងផ្អែកលើវានៅពេលផ្នែកផ្សេងទៀតនៃដៃគូភាពមានអារម្មណ៍ពិបាក។`
        : `${CATEGORY_LABEL[e[0]]} is one of your strongest areas (${e[1]}/100) based on the traditional interpretation — lean on it when other parts of the partnership feel harder.`;
    });
    const challenges = bottom.map(function (e) {
      return isKm
        ? `${CATEGORY_LABEL[e[0]]}ទទួលបានពិន្ទុទាបជាង (${e[1]}/100) — នេះជាក់ស្តែងជាកន្លែងដែលដំណើរការ ឬកិច្ចព្រមព្រៀងជាលាយលក្ខណ៍អក្សរនឹងសំខាន់បំផុត។`
        : `${CATEGORY_LABEL[e[0]]} scores lower (${e[1]}/100) — this is realistically where a written process or agreement will matter most.`;
    });

    const checklistItems = isKm ? CHECKLIST_ITEMS_KM : CHECKLIST_ITEMS_EN;
    const challengeTopics = isKm ? CHALLENGE_TOPICS_KM : CHALLENGE_TOPICS_EN;

    const hasTimeLoc = !!time1 || !!time2 || !!loc1 || !!loc2;
    const beforeAfterA = isKm ? (bziA.beforeCNY ? "មុន" : "នៅ/ក្រោយ") : (bziA.beforeCNY ? "before" : "on/after");
    const beforeAfterB = isKm ? (bziB.beforeCNY ? "មុន" : "នៅ/ក្រោយ") : (bziB.beforeCNY ? "before" : "on/after");
    const cnyNoteA = bziA.cny
      ? (isKm
          ? `${fmtDate(dob1)} — ${beforeAfterA}ពិធីបុណ្យចូលឆ្នាំចិននៃឆ្នាំនោះ (${bziA.cny.replace("-", "/")}/${bziA.birthYear}) ដូច្នេះឆ្នាំនិមិត្តសញ្ញាដែលប្រើគឺ ${bziA.zodiacYear}។`
          : `${fmtDate(dob1)} — ${beforeAfterA} that year's Chinese New Year (${bziA.cny.replace("-", "/")}/${bziA.birthYear}), so the zodiac year used is ${bziA.zodiacYear}.`)
      : `${fmtDate(dob1)}.`;
    const cnyNoteB = bziB.cny
      ? (isKm
          ? `${fmtDate(dob2)} — ${beforeAfterB}ពិធីបុណ្យចូលឆ្នាំចិននៃឆ្នាំនោះ (${bziB.cny.replace("-", "/")}/${bziB.birthYear}) ដូច្នេះឆ្នាំនិមិត្តសញ្ញាដែលប្រើគឺ ${bziB.zodiacYear}។`
          : `${fmtDate(dob2)} — ${beforeAfterB} that year's Chinese New Year (${bziB.cny.replace("-", "/")}/${bziB.birthYear}), so the zodiac year used is ${bziB.zodiacYear}.`)
      : `${fmtDate(dob2)}.`;

    const meterOrder = CATEGORY_META;

    resultBox.innerHTML = `
      <div class="biz-result-card">
        <div class="biz-pair-header">
          <div class="biz-pair-person">
            <span class="biz-pair-symbol">${ZODIAC_EMOJI[bziA.animal]}</span>
            <div><strong>${p1Name}</strong></div>
            <div class="biz-pair-sub">${isKm ? KM_ELEMENT_NAMES[bziA.element] + " " + KM_ANIMAL_NAMES[bziA.animal] : bziA.element + " " + bziA.animal} · ${yinYangLabel(bziA.yinYang)}</div>
          </div>
          <div class="biz-pair-link">🤝</div>
          <div class="biz-pair-person">
            <span class="biz-pair-symbol">${ZODIAC_EMOJI[bziB.animal]}</span>
            <div><strong>${p2Name}</strong></div>
            <div class="biz-pair-sub">${isKm ? KM_ELEMENT_NAMES[bziB.element] + " " + KM_ANIMAL_NAMES[bziB.animal] : bziB.element + " " + bziB.animal} · ${yinYangLabel(bziB.yinYang)}</div>
          </div>
        </div>

        ${shareRowHtml(p1Name + " + " + p2Name, { emoji: ZODIAC_EMOJI[bziA.animal] + " 🤝 " + ZODIAC_EMOJI[bziB.animal], heading: p1Name + " + " + p2Name, subheading: CATEGORY_LABEL[top[0][0]] + " · " + CATEGORY_LABEL[top[1][0]] })}

        <h3 class="biz-subheading">${S.biz_summary_heading || "🧧 Business Partnership Summary"}</h3>
        <div class="biz-summary-box">
          <p><strong>${p1Name}:</strong> ${animalName(bziA.animal)} · ${elementName(bziA.element)} · ${isKm ? (bziA.yinYang === "Yang" ? "យ៉ាង" : "យិន") : bziA.yinYang}</p>
          <p><strong>${p2Name}:</strong> ${animalName(bziB.animal)} · ${elementName(bziB.element)} · ${isKm ? (bziB.yinYang === "Yang" ? "យ៉ាង" : "យិន") : bziB.yinYang}</p>
          <p>${S.biz_summary_complementary || "Main complementary qualities:"} ${CATEGORY_LABEL[top[0][0]]}, ${CATEGORY_LABEL[top[1][0]]}.</p>
          <p>${S.biz_summary_discuss || "Main areas requiring discussion:"} ${CATEGORY_LABEL[bottom[0][0]]}, ${CATEGORY_LABEL[bottom[1][0]]}.</p>
          <p>${S.biz_summary_roles || "Potential role division:"} ${p1Name} → ${bizA.roles[0]}; ${p2Name} → ${bizB.roles[0]}.</p>
        </div>

        <div class="biz-two-col">
          <div class="biz-profile-card">
            <h3>${p1Name}</h3>
            <p class="biz-sign-line">${ZODIAC_EMOJI[bziA.animal]} <strong>${elementName(bziA.element)} ${animalName(bziA.animal)}</strong></p>
            <p class="biz-bazi-line">${bziA.stem.name} ${bziA.stem.hanzi} (${S.biz_heavenly_stem_label || "Heavenly Stem"}) · ${bziA.branch.name} ${bziA.branch.hanzi} (${S.biz_earthly_branch_label || "Earthly Branch"}) · ${isKm ? (bziA.yinYang === "Yang" ? "យ៉ាង" : "យិន") : bziA.yinYang}</p>
            <p class="biz-born-sub">${cnyNoteA}</p>
            <p>${(isKm && typeof KM_ELEMENT_INFO !== "undefined" ? KM_ELEMENT_INFO : ELEMENT_INFO)[bziA.element].blurb}</p>
          </div>
          <div class="biz-profile-card">
            <h3>${p2Name}</h3>
            <p class="biz-sign-line">${ZODIAC_EMOJI[bziB.animal]} <strong>${elementName(bziB.element)} ${animalName(bziB.animal)}</strong></p>
            <p class="biz-bazi-line">${bziB.stem.name} ${bziB.stem.hanzi} (${S.biz_heavenly_stem_label || "Heavenly Stem"}) · ${bziB.branch.name} ${bziB.branch.hanzi} (${S.biz_earthly_branch_label || "Earthly Branch"}) · ${isKm ? (bziB.yinYang === "Yang" ? "យ៉ាង" : "យិន") : bziB.yinYang}</p>
            <p class="biz-born-sub">${cnyNoteB}</p>
            <p>${(isKm && typeof KM_ELEMENT_INFO !== "undefined" ? KM_ELEMENT_INFO : ELEMENT_INFO)[bziB.element].blurb}</p>
          </div>
        </div>

        <h3 class="biz-subheading">${S.biz_five_elements_heading || "Five Elements"}</h3>
        <p class="biz-element-note">${elRel.note}</p>
        <p class="biz-disclaimer-inline">${S.biz_elements_disclaimer || "Element interactions are a traditional framework, not a scientific predictor of business outcomes."}</p>

        <h3 class="biz-subheading">${S.biz_dashboard_heading || "Compatibility Dashboard"}</h3>
        <div class="biz-meter-grid">
          ${meterOrder.map(function (c) { return meterHtml(c[1] + " " + c[2], scores[c[0]]); }).join("")}
        </div>
        <p class="biz-disclaimer-inline">${S.biz_dashboard_disclaimer || "Entertainment-style scores based on traditional Chinese astrology. They are not scientific measurements and should not be used as a substitute for evaluating a real business partner."}</p>

        <div class="ad-slot">${S.ad_space || "Ad space"}</div>

        <h3 class="biz-subheading">${S.biz_analysis_heading || "Business Compatibility Analysis"}</h3>
        <div class="biz-analysis-list">
          ${analysis.map(sectionHtml).join("")}
        </div>

        <div class="ad-slot">${S.ad_space || "Ad space"}</div>

        <h3 class="biz-subheading">${S.biz_roles_heading || "Role Compatibility"}</h3>
        <p class="biz-role-intro">${S.biz_role_intro || "Based on the traditional zodiac interpretation, these roles may complement each profile — not a guarantee of fit."}</p>
        <div class="biz-two-col">
          <div class="biz-profile-card">
            <h4>${fmt(S.biz_could_focus_on_tpl || "{name} could potentially focus on:", { name: p1Name })}</h4>
            <ul>${bizA.roles.map((r) => `<li>${r}</li>`).join("")}</ul>
          </div>
          <div class="biz-profile-card">
            <h4>${fmt(S.biz_could_focus_on_tpl || "{name} could potentially focus on:", { name: p2Name })}</h4>
            <ul>${bizB.roles.map((r) => `<li>${r}</li>`).join("")}</ul>
          </div>
        </div>

        <h3 class="biz-subheading">${S.biz_strengths_heading || "💎 Complementary Strengths"}</h3>
        <div class="biz-insight-block">
          <h4>${fmt(S.biz_what_may_bring_tpl || "What {name} May Bring", { name: p1Name })}</h4>
          <p>${bizA.strength}</p>
        </div>
        <div class="biz-insight-block">
          <h4>${fmt(S.biz_what_may_bring_tpl || "What {name} May Bring", { name: p2Name })}</h4>
          <p>${bizB.strength}</p>
        </div>
        <div class="biz-insight-block">
          <h4>${S.biz_what_together || "What They May Build Together"}</h4>
          <p>${elRel.note}</p>
        </div>

        <h3 class="biz-subheading">${S.biz_top_strengths_heading || "💚 Biggest Strengths"}</h3>
        <ul class="biz-plain-list">${strengths.map((s) => `<li>${s}</li>`).join("")}</ul>

        <h3 class="biz-subheading">${S.biz_challenges_heading || "⚠️ Potential Business Challenges"}</h3>
        <p class="biz-role-intro">${S.biz_challenges_intro || "These are practical business considerations worth discussing before forming a partnership — not zodiac predictions."}</p>
        <ul class="biz-plain-list biz-challenge-topics">${challengeTopics.map((s) => `<li>${s}</li>`).join("")}</ul>
        <ul class="biz-plain-list">${challenges.map((s) => `<li>${s}</li>`).join("")}</ul>

        <h3 class="biz-subheading">${S.biz_checklist_heading || "📋 Business Partnership Checklist"}</h3>
        <p class="biz-role-intro">${S.biz_checklist_intro || "Agree on these in writing — ideally with professional legal advice — before you formalize a partnership."}</p>
        <ul class="biz-checklist">${checklistItems.map((s) => `<li><span class="biz-checkbox">☐</span> ${s}</li>`).join("")}</ul>

        <h3 class="biz-subheading">${S.biz_extra_heading || "Birth Time & Location"}</h3>
        <p>${hasTimeLoc ? (S.biz_extra_unavailable || "Birth time and location were entered but aren't used for additional calculations here — only the Chinese New Year-based zodiac, element, and stem/branch shown above are computed.") : (S.biz_extra_missing || "Birth time/location weren't provided, so this reading is based on date of birth alone.")}</p>

        <p class="biz-privacy-note">${S.biz_privacy_inline || "Birth information is used to generate this reading and is not required to be stored."}</p>
        <p class="biz-disclaimer">${S.biz_disclaimer || ""}</p>

        <button type="button" id="biz-reset-btn" class="biz-reset-btn">${S.biz_reset || "🔄 Analyze Another Partnership"}</button>
      </div>
    `;
    wireShareRows(resultBox);

    const resetBtn = document.getElementById("biz-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        form.reset();
        resultBox.innerHTML = "";
        if (formSection) formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
