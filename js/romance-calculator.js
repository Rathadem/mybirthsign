// romance-calculator.js — Chinese Zodiac Love & Relationship Compatibility
// (the romantic "MyBirthSign Compatibility" feature). Lives on
// compatibility.html only, under its own #romance-* IDs so it never
// touches the shared #compat-form widget used on index.html / wedding-date.html.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("romance-form");
  const resultBox = document.getElementById("romance-result");
  const errorBox = document.getElementById("romance-form-error");
  const formSection = document.getElementById("romance-form-section");
  if (!form || !resultBox) return;

  const lang = typeof getLang === "function" ? getLang() : "en";
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};
  const isKm = lang === "km";
  const animalName = (an) => (isKm && typeof KM_ANIMAL_NAMES !== "undefined") ? KM_ANIMAL_NAMES[an] : an;
  const elementName = (el) => (isKm && typeof KM_ELEMENT_NAMES !== "undefined") ? KM_ELEMENT_NAMES[el] : el;
  const yinYangWord = (yy) => isKm ? (yy === "Yang" ? "យ៉ាង" : "យិន") : yy;

  const todayIso = new Date().toISOString().slice(0, 10);
  ["romance-p1-dob", "romance-p2-dob"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) { el.setAttribute("max", todayIso); el.setAttribute("min", "1900-01-01"); }
  });

  function parseDobInput(value) {
    if (!value) return null;
    const d = new Date(value + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }
  function showError(msg) { if (errorBox) { errorBox.textContent = msg; errorBox.hidden = false; } }
  function clearError() { if (errorBox) { errorBox.hidden = true; errorBox.textContent = ""; } }

  // --- deterministic scoring helpers (shared site pattern: hash-based
  // jitter, never Math.random(), so the same two birth dates ALWAYS
  // produce the same score) -------------------------------------------------
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
    ["love", "❤️", "Love"],
    ["business", "💼", "Business"],
    ["friendship", "🤝", "Friendship"],
    ["financial", "💰", "Financial"],
    ["longterm", "🏠", "Long-Term Relationship"],
    ["attraction", "🔥", "Attraction"],
    ["communication", "💬", "Communication"]
  ];
  const CATEGORY_META_KM = [
    ["love", "❤️", "ស្នេហា"],
    ["business", "💼", "អាជីវកម្ម"],
    ["friendship", "🤝", "មិត្តភាព"],
    ["financial", "💰", "ហិរញ្ញវត្ថុ"],
    ["longterm", "🏠", "ទំនាក់ទំនងរយៈពេលវែង"],
    ["attraction", "🔥", "ទំនាញ"],
    ["communication", "💬", "ការប្រាស្រ័យទាក់ទង"]
  ];
  const CATEGORY_META = isKm ? CATEGORY_META_KM : CATEGORY_META_EN;
  const CATEGORY_LABEL = {};
  CATEGORY_META.forEach(function (c) { CATEGORY_LABEL[c[0]] = c[1] + " " + c[2]; });

  const WEIGHTS = {
    love: { a: 0.5, e: 0.3, yy: 0.2 },
    business: { a: 0.5, e: 0.5 },
    friendship: { a: 0.7, e: 0.3 },
    financial: { a: 0.3, e: 0.7 },
    longterm: { a: 0.6, e: 0.3, yy: 0.1 },
    attraction: { a: 0.6, e: 0.2, yy: 0.2 },
    communication: { a: 0.4, e: 0.2, yy: 0.4 }
  };
  const OVERALL_WEIGHTS = { love: 0.30, longterm: 0.25, communication: 0.15, attraction: 0.15, friendship: 0.15 };

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

  function computeOverall(scores, seedStr) {
    let total = 0;
    Object.keys(OVERALL_WEIGHTS).forEach(function (k) { total += scores[k] * OVERALL_WEIGHTS[k]; });
    return clampScore(total + jitterFor(seedStr, "overall") * 0.4);
  }

  // --- bilingual narrative banks (romance-framed, tier-keyed, reused
  // across all 7 categories the same way the rest of the site does) -------
  const WORKS_BANK = {
    en: {
      high: [
        "comes easily between the two of you — a genuine, natural strength in this pairing.",
        "flows naturally and brings out warmth and ease in both of you.",
        "is one of the clearest bright spots in this match, by the traditional zodiac reading."
      ],
      medium: [
        "can work well once you're both intentional about it, rather than assuming it just happens.",
        "has real potential — it tends to improve the more openly you talk about it.",
        "balances out reasonably, with each of you bringing something the other doesn't."
      ],
      low: [
        "is realistically where this pairing has to work the hardest, by the traditional zodiac reading.",
        "is a known friction point for this combination — worth naming early rather than ignoring.",
        "takes real effort here; left unaddressed, it's the likeliest source of tension."
      ]
    },
    km: {
      high: [
        "កើតឡើងដោយងាយស្រួលរវាងអ្នកទាំងពីរ — ជាភាពខ្លាំងពិតប្រាកដនៃការផ្គូផ្គងនេះ។",
        "ហូរចេញដោយធម្មជាតិ ហើយនាំមកនូវភាពកក់ក្តៅ និងភាពងាយស្រួលដល់អ្នកទាំងពីរ។",
        "ជាចំណុចភ្លឺច្បាស់បំផុតមួយនៃការផ្គូផ្គងនេះ តាមការបកស្រាយប្រពៃណី។"
      ],
      medium: [
        "អាចដំណើរការល្អនៅពេលអ្នកទាំងពីរមានចេតនាលើវា ជាជាងសន្មតថាវានឹងកើតឡើងដោយខ្លួនឯង។",
        "មានសក្តានុពលពិតប្រាកដ — វាទំនងជាប្រសើរឡើងកាន់តែច្រើន នៅពេលអ្នកទាំងពីរនិយាយគ្នាបើកចំហ។",
        "មានតុល្យភាពសមហេតុផល ដោយម្នាក់ៗនាំមកនូវអ្វីដែលម្នាក់ទៀតគ្មាន។"
      ],
      low: [
        "ជាក់ស្តែងនេះជាកន្លែងដែលការផ្គូផ្គងនេះត្រូវខិតខំខ្លាំងបំផុត តាមការបកស្រាយប្រពៃណី។",
        "ជាចំណុចតានតឹងដែលគេស្គាល់សម្រាប់ការផ្គូផ្គងនេះ — គួរនិយាយពីវាតាំងពីដើម។",
        "ត្រូវការការខិតខំប្រឹងប្រែងពិតប្រាកដ ទុកមិនដោះស្រាយវានឹងទំនងជាប្រភពនៃភាពតានតឹង។"
      ]
    }
  };
  const CHALLENGE_BANK = {
    en: {
      high: [
        "the main risk is taking it for granted and stopping the small gestures that made it work.",
        "conflict here is rare, but complacency can quietly wear it down over time."
      ],
      medium: [
        "differing instincts can cause friction under stress if you haven't talked about expectations.",
        "misread signals are the main risk — checking in with each other heads off most of it."
      ],
      low: [
        "this is realistically where most disagreements in this pairing would start.",
        "without patience and clear communication, this is likely to become a recurring sore point."
      ]
    },
    km: {
      high: [
        "ហានិភ័យចម្បងគឺការចាត់ទុកវាធម្មតាពេក ហើយឈប់ធ្វើកាយវិការតូចៗដែលធ្វើឱ្យវាដំណើរការ។",
        "ជម្លោះទីនេះកម្រកើតមាន ប៉ុន្តែការធ្វេសប្រហែសអាចធ្វើឱ្យវាចុះខ្សោយបន្តិចម្តងៗតាមពេលវេលា។"
      ],
      medium: [
        "សភាវគតិខុសគ្នាអាចបង្កភាពតានតឹងក្រោមសម្ពាធ ប្រសិនបើអ្នកមិនបាននិយាយពីការរំពឹងទុក។",
        "សញ្ញាយល់ច្រលំគឺជាហានិភ័យចម្បង — ការសាកសួរគ្នាទៀងទាត់ជួយដោះស្រាយបានភាគច្រើន។"
      ],
      low: [
        "ជាក់ស្តែងនេះជាកន្លែងដែលការមិនចុះសម្រុងគ្នាភាគច្រើននឹងកើតឡើង។",
        "បើគ្មានការអត់ធ្មត់ និងការប្រាស្រ័យទាក់ទងច្បាស់លាស់ នេះទំនងជាក្លាយជាចំណុចឈឺចាប់ដដែលៗ។"
      ]
    }
  };
  const ADVICE_BANK = {
    en: {
      high: [
        "keep nurturing it with small, regular gestures — don't let a good thing run on autopilot.",
        "lean on this strength during harder seasons of the relationship."
      ],
      medium: [
        "talk about it directly rather than assuming you're both on the same page.",
        "agree on a simple shared approach early, instead of improvising under pressure."
      ],
      low: [
        "be patient with each other here and revisit the topic calmly rather than in the heat of the moment.",
        "give each other room to be different on this one — it doesn't have to match to still work."
      ]
    },
    km: {
      high: [
        "បន្តថែរក្សាវាដោយកាយវិការតូចៗទៀងទាត់ — កុំទុកឱ្យវាដំណើរការដោយខ្លួនឯង។",
        "ពឹងផ្អែកលើភាពខ្លាំងនេះក្នុងអំឡុងពេលលំបាកនៃទំនាក់ទំនង។"
      ],
      medium: [
        "និយាយពីវាដោយផ្ទាល់ ជាជាងសន្មតថាអ្នកទាំងពីរយល់ដូចគ្នា។",
        "ព្រមព្រៀងលើវិធីសាស្ត្រសាមញ្ញរួមគ្នាតាំងពីដើម ជាជាងធ្វើឆាប់ៗក្រោមសម្ពាធ។"
      ],
      low: [
        "អត់ធ្មត់ចំពោះគ្នាទៅវិញទៅមកលើចំណុចនេះ ហើយលើកវាឡើងវិញដោយស្ងប់ស្ងាត់។",
        "ផ្តល់ចន្លោះឱ្យគ្នានៅលើចំណុចនេះ — វាមិនចាំបាច់ដូចគ្នាទេក៏នៅតែដំណើរការបាន។"
      ]
    }
  };
  function pick(seedStr, key, arr) { return arr[hashSeed(seedStr + "|" + key + "|pick") % arr.length]; }
  function worksSentence(seedStr, key, tier) { return pick(seedStr, key, (WORKS_BANK[lang] || WORKS_BANK.en)[tier] || WORKS_BANK.en.medium); }
  function challengeSentence(seedStr, key, tier) { return pick(seedStr, key + "c", (CHALLENGE_BANK[lang] || CHALLENGE_BANK.en)[tier] || CHALLENGE_BANK.en.medium); }
  function adviceSentence(seedStr, key, tier) { return pick(seedStr, key + "a", (ADVICE_BANK[lang] || ADVICE_BANK.en)[tier] || ADVICE_BANK.en.medium); }

  function tierOf(score) { return score >= 75 ? "high" : (score >= 50 ? "medium" : "low"); }

  function buildCategoryCards(bziA, bziB, scores, seedStr) {
    return CATEGORY_META.map(function (c) {
      const key = c[0], emoji = c[1], title = c[2];
      const tier = tierOf(scores[key]);
      const lead = isKm
        ? `រវាង${animalName(bziA.animal)} និង${animalName(bziB.animal)}`
        : `Between ${bziA.animal} and ${bziB.animal}`;
      return {
        key: key, emoji: emoji, title: title, score: scores[key],
        strengths: `${lead}, ${isKm ? title : title.toLowerCase()} ${worksSentence(seedStr, key, tier)}`,
        challenges: challengeSentence(seedStr, key, tier),
        advice: adviceSentence(seedStr, key, tier)
      };
    });
  }

  const LEVELS = [
    { min: 85, en: "Excellent", km: "ល្អប្រសើរបំផុត", emoji: "💞" },
    { min: 70, en: "Very Good", km: "ល្អណាស់", emoji: "💕" },
    { min: 55, en: "Good", km: "ល្អ", emoji: "💗" },
    { min: 40, en: "Average", km: "មធ្យម", emoji: "💛" },
    { min: 0, en: "Challenging", km: "មានបញ្ហាប្រឈម", emoji: "🧡" }
  ];
  function levelFor(score) { return LEVELS.find(function (l) { return score >= l.min; }); }

  function heartsRowHtml(score) {
    const filled = Math.max(0, Math.min(5, Math.round(score / 20)));
    let html = "";
    for (let i = 0; i < 5; i++) html += `<span class="romance-heart-pip${i < filled ? " is-filled" : ""}">${i < filled ? "❤️" : "🤍"}</span>`;
    return html;
  }

  function meterHtml(cat) {
    const deg = Math.round((cat.score / 100) * 360);
    return `
      <div class="romance-cat-card">
        <div class="romance-cat-head">
          <div class="romance-cat-ring" style="background: conic-gradient(var(--romance-gold) ${deg}deg, rgba(255,255,255,0.35) ${deg}deg);">
            <div class="romance-cat-ring-inner">${cat.score}%</div>
          </div>
          <h3>${cat.emoji} ${cat.title}</h3>
        </div>
        <p class="romance-cat-strengths"><strong>${S.romance_strengths_label || (isKm ? "ភាពខ្លាំង" : "Strengths")}:</strong> ${cat.strengths}</p>
        <p class="romance-cat-challenges"><strong>${S.romance_challenges_label || (isKm ? "បញ្ហាប្រឈម" : "Possible challenges")}:</strong> ${cat.challenges}</p>
        <p class="romance-cat-advice"><strong>${S.romance_advice_label || (isKm ? "ដំបូន្មាន" : "Advice")}:</strong> ${cat.advice}</p>
      </div>
    `;
  }

  function animateCount(el, to, duration) {
    if (!el) return;
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * to) + "%";
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function animalProfileHtml(name, bzi) {
    const info = (isKm && typeof KM_ANIMAL_INFO !== "undefined") ? KM_ANIMAL_INFO[bzi.animal] : ANIMAL_INFO[bzi.animal];
    const elInfo = (isKm && typeof KM_ELEMENT_INFO !== "undefined") ? KM_ELEMENT_INFO[bzi.element] : ELEMENT_INFO[bzi.element];
    const traits = (info && info.traits) || "";
    const weaknesses = (info && info.weaknesses) || "";
    return `
      <div class="romance-profile-card">
        <img class="romance-profile-badge" src="images/zodiac-badges/${bzi.animal.toLowerCase()}.webp" alt="" loading="lazy" width="72" height="72">
        <h3>${name}</h3>
        <p class="romance-profile-sub">${elementName(bzi.element)} ${animalName(bzi.animal)} · ☯️ ${yinYangWord(bzi.yinYang)}</p>
        <p class="romance-profile-overview">${(info && info.overview) || ""}</p>
        ${elInfo && elInfo.blurb ? `<p class="romance-profile-element">${elInfo.blurb}</p>` : ""}
        ${traits ? `<p class="romance-profile-list"><strong>${S.romance_strengths_label || (isKm ? "ភាពខ្លាំង" : "Strengths")}:</strong> ${traits}</p>` : ""}
        ${weaknesses ? `<p class="romance-profile-list"><strong>${S.romance_weaknesses_label || (isKm ? "ចំណុចខ្សោយ" : "Weaknesses")}:</strong> ${weaknesses}</p>` : ""}
      </div>
    `;
  }

  function setUrlParams(dob1Raw, dob2Raw) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("person1", dob1Raw);
      url.searchParams.set("person2", dob2Raw);
      window.history.replaceState(null, "", url.pathname + url.search);
    } catch (e) { /* best effort */ }
  }

  function renderResult(dob1Raw, dob2Raw) {
    const dob1 = parseDobInput(dob1Raw);
    const dob2 = parseDobInput(dob2Raw);
    if (!dob1 || !dob2) {
      showError(S.romance_err_invalid || (isKm ? "កាលបរិច្ឆេទមួយមិនត្រឹមត្រូវទេ — សូមពិនិត្យម្តងទៀត។" : "One of the dates entered isn't valid — please re-check it."));
      return;
    }
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    if (dob1 > now || dob2 > now) {
      showError(S.romance_err_future || (isKm ? "កាលបរិច្ឆេទកំណើតមិនអាចនៅថ្ងៃអនាគតបានទេ។" : "Birth dates can't be in the future — please check the date entered."));
      return;
    }
    clearError();

    const bziA = getBaZi(dob1);
    const bziB = getBaZi(dob2);
    const animalRelType = getCompatibilityType(bziA.animal, bziB.animal);
    const animalTier = ANIMAL_TIER_MAP[animalRelType] || "medium";
    const elRel = elementRelation(bziA.element, bziB.element, lang);
    const yinYangDifferent = bziA.yinYang !== bziB.yinYang;
    const seedStr = dob1Raw + "|" + dob2Raw;

    const scores = computeScores(animalTier, elRel.tier, yinYangDifferent, seedStr);
    const overall = computeOverall(scores, seedStr);
    const level = levelFor(overall);
    const levelLabel = isKm ? level.km : level.en;
    const cats = buildCategoryCards(bziA, bziB, scores, seedStr);
    const sortedCats = cats.slice().sort(function (a, b) { return b.score - a.score; });
    const topCat = sortedCats[0], bottomCat = sortedCats[sortedCats.length - 1];

    setUrlParams(dob1Raw, dob2Raw);

    const p1Label = S.romance_person1_label || (isKm ? "អ្នកទី ១" : "Person 1");
    const p2Label = S.romance_person2_label || (isKm ? "អ្នកទី ២" : "Person 2");

    const summaryText = isKm
      ? `${animalName(bziA.animal)} និង ${animalName(bziB.animal)} បង្កើតបានជាគូដែល${levelLabel} (${overall}%)។ ចំណុចខ្លាំងបំផុតគឺ${CATEGORY_LABEL[topCat.key]} ខណៈដែល${CATEGORY_LABEL[bottomCat.key]}ទាមទារការយកចិត្តទុកដាក់បន្ថែម។ ${elRel.note}`
      : `${bziA.animal} and ${bziB.animal} make a ${levelLabel.toLowerCase()} match (${overall}%). The strongest area is ${CATEGORY_LABEL[topCat.key]}, while ${CATEGORY_LABEL[bottomCat.key]} needs a little more attention. ${elRel.note}`;

    const overallExplain = isKm
      ? `ពិន្ទុនេះផ្អែកលើទំនាក់ទំនងនិមិត្តសញ្ញារវាង${animalName(bziA.animal)} និង${animalName(bziB.animal)} (${animalRelType === "same" ? "ដូចគ្នា" : animalRelType === "triangle" ? "ក្រុមសុខដុម" : animalRelType === "clash" ? "ប៉ះទង្គិច" : "អព្យាក្រឹត"}), ទំនាក់ទំនងធាតុ ${elementName(bziA.element)} ↔ ${elementName(bziB.element)} (${elRel.relation}), និងលក្ខណៈយិន-យ៉ាងរបស់អ្នកទាំងពីរ។ ជារួម នេះជាគូ${levelLabel} តាមការអានតាមប្រពៃណី។`
      : `This score is based on the traditional zodiac relationship between ${bziA.animal} and ${bziB.animal} (${animalRelType}), the Five-Element relationship between ${bziA.element} and ${bziB.element} (${elRel.relation}), and both partners' Yin/Yang polarity. Overall, this is a ${levelLabel.toLowerCase()} match by the traditional reading.`;

    resultBox.innerHTML = `
      <div class="romance-card">
        <div class="romance-floating-hearts" aria-hidden="true">
          <span>💗</span><span>💓</span><span>✨</span><span>💗</span><span>🌸</span><span>💓</span>
        </div>

        <div class="romance-pair-row">
          <div class="romance-zodiac-circle">
            <div class="romance-zodiac-ring"><img src="images/zodiac-badges/${bziA.animal.toLowerCase()}.webp" alt="${animalName(bziA.animal)}" width="88" height="88" loading="lazy"></div>
            <p class="romance-zodiac-name">${animalName(bziA.animal)}</p>
            <p class="romance-zodiac-sub">${p1Label} · ${bziA.birthYear} · ${elementName(bziA.element)}</p>
          </div>
          <div class="romance-link-heart">💗<span class="romance-ray romance-ray-l"></span><span class="romance-ray romance-ray-r"></span></div>
          <div class="romance-zodiac-circle">
            <div class="romance-zodiac-ring"><img src="images/zodiac-badges/${bziB.animal.toLowerCase()}.webp" alt="${animalName(bziB.animal)}" width="88" height="88" loading="lazy"></div>
            <p class="romance-zodiac-name">${animalName(bziB.animal)}</p>
            <p class="romance-zodiac-sub">${p2Label} · ${bziB.birthYear} · ${elementName(bziB.element)}</p>
          </div>
        </div>

        <div class="romance-big-heart">
          <div class="romance-big-heart-glyph">💖</div>
          <div class="romance-big-heart-score"><span class="romance-score-value" id="romance-score-counter">0%</span></div>
          <p class="romance-big-heart-label">${S.romance_compat_label || (isKm ? "កម្រិតស៊ីគ្នា" : "Compatibility")}</p>
          <div class="romance-hearts-row">${heartsRowHtml(overall)}</div>
        </div>

        ${shareRowHtml((isKm ? animalName(bziA.animal) + " + " + animalName(bziB.animal) : bziA.animal + " + " + bziB.animal) + " — " + overall + "%", { cardType: "compat", emoji: ZODIAC_EMOJI[bziA.animal] + " 💞 " + ZODIAC_EMOJI[bziB.animal], heading: (isKm ? animalName(bziA.animal) + " + " + animalName(bziB.animal) : bziA.animal + " + " + bziB.animal), subheading: levelLabel + " — " + overall + "%", badge: overall + "%" })}

        <div class="romance-summary-card">
          <h2>${level.emoji} ${levelLabel} — ${overall}%</h2>
          <p>${summaryText}</p>
        </div>

        <div class="ad-slot" data-i18n="ad_space">${S.ad_space || "Ad space"}</div>

        <h2 class="romance-section-heading">${S.romance_categories_heading || (isKm ? "លំអិតកម្រិតស៊ីគ្នា" : "Detailed Compatibility Breakdown")}</h2>
        <div class="romance-cat-grid">
          ${cats.map(meterHtml).join("")}
        </div>

        <div class="ad-slot" data-i18n="ad_space">${S.ad_space || "Ad space"}</div>

        <h2 class="romance-section-heading">${S.romance_profiles_heading || (isKm ? "ទម្រង់និមិត្តសញ្ញានីមួយៗ" : "Zodiac Profiles")}</h2>
        <div class="romance-profile-grid">
          ${animalProfileHtml(p1Label, bziA)}
          ${animalProfileHtml(p2Label, bziB)}
        </div>

        <div class="romance-overall-card">
          <h2>${S.romance_overall_heading || (isKm ? "កម្រិតស៊ីគ្នាទាំងមូល" : "Overall Compatibility")}</h2>
          <div class="romance-overall-score">${overall}%</div>
          <div class="romance-overall-rating">${level.emoji} ${levelLabel}</div>
          <p>${overallExplain}</p>
          <p class="romance-disclaimer">${S.romance_disclaimer || (isKm ? "លទ្ធផលនេះផ្អែកលើនិមិត្តសញ្ញាចិនប្រពៃណី សម្រាប់គោលបំណងកម្សាន្តតែប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រនោះទេ។" : "This result is based on traditional Chinese zodiac astrology, for entertainment purposes only — not a scientific prediction.")}</p>
        </div>

        <div class="romance-actions-row">
          <button type="button" id="romance-reset-btn" class="romance-reset-btn">${S.romance_reset || (isKm ? "🔄 ពិនិត្យគូផ្សេងទៀត" : "🔄 Check Another Match")}</button>
        </div>
      </div>
    `;

    wireShareRows(resultBox);
    animateCount(document.getElementById("romance-score-counter"), overall, 1200);

    const resetBtn = document.getElementById("romance-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        form.reset();
        resultBox.innerHTML = "";
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete("person1");
          url.searchParams.delete("person2");
          window.history.replaceState(null, "", url.pathname + (url.search || ""));
        } catch (e) { /* best effort */ }
        if (formSection) formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const dob1Raw = document.getElementById("romance-p1-dob").value;
    const dob2Raw = document.getElementById("romance-p2-dob").value;
    if (!dob1Raw || !dob2Raw) {
      showError(S.romance_err_required || (isKm ? "សូមបញ្ចូលកាលបរិច្ឆេទកំណើតរបស់អ្នកទាំងពីរ។" : "Please enter both people's dates of birth."));
      return;
    }
    renderResult(dob1Raw, dob2Raw);
  });

  // Auto-load from a shareable URL like
  // compatibility.html?person1=1989-01-01&person2=1990-05-20
  (function autoLoadFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const p1 = params.get("person1");
      const p2 = params.get("person2");
      if (p1 && p2 && parseDobInput(p1) && parseDobInput(p2)) {
        const f1 = document.getElementById("romance-p1-dob");
        const f2 = document.getElementById("romance-p2-dob");
        if (f1) f1.value = p1;
        if (f2) f2.value = p2;
        renderResult(p1, p2);
      }
    } catch (e) { /* best effort */ }
  })();
});
