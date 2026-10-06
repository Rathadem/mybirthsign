// compat-page.js — redesigned Chinese Zodiac Compatibility Calculator.
// Zodiac year / animal / element come from getBaZi() -> getZodiac(), which
// compares each birth date with the real Lunar New Year date (CNY_DATES);
// never "year % 12" on the Gregorian year.
document.addEventListener("DOMContentLoaded", function () {
  const lang = typeof getLang === "function" ? getLang() : "en";
  const isKm = lang === "km";
  const T = (typeof CMP_TEXT !== "undefined" && (CMP_TEXT[lang] || CMP_TEXT.en)) || {};
  const ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  const ELEMS = ["Wood", "Fire", "Earth", "Metal", "Water"];
  const aName = (a) => (isKm && typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[a] : a);
  const eName = (e) => (isKm && typeof KM_ELEMENT_NAMES !== "undefined" ? KM_ELEMENT_NAMES[e] : e);
  const fill = (s, map) => String(s).replace(/\{(\w+)\}/g, (m, k) => (map[k] !== undefined ? map[k] : m));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---- reusable <ZodiacAnimal animal="rat" /> ------------------------------
  function zodiacAnimal(animal, opts) {
    opts = opts || {};
    const slug = animal.toLowerCase();
    const size = opts.size || 72;
    const img = '<img src="images/business/animals/' + slug + '.webp" alt="' + esc(aName(animal)) + '" width="' + size + '" height="' + size + '" loading="' + (opts.eager ? "eager" : "lazy") + '">';
    if (opts.plain) return img;
    return '<li><a class="chk-animal-link" href="animals.html#animal-' + slug + '">' + img + "<span>" + esc(aName(animal)) + "</span></a></li>";
  }
  window.zodiacAnimal = zodiacAnimal;

  // ---- static text (same keys in EN/KM) -----------------------------------
  document.querySelectorAll("[data-cmp]").forEach(function (el) {
    const k = el.getAttribute("data-cmp");
    if (T[k] !== undefined) el.innerHTML = T[k];
  });
  if (isKm && T.title) document.title = T.title + " | MyBirthSign";
  const lab1 = document.getElementById("cmp-l1"), lab2 = document.getElementById("cmp-l2");
  if (lab1) lab1.textContent = T.p1 + " — " + T.dob;
  if (lab2) lab2.textContent = T.p2 + " — " + T.dob;

  const ul = document.getElementById("cmp-animals");
  if (ul) ul.innerHTML = ANIMALS.map(function (a) { return zodiacAnimal(a); }).join("");

  const guides = document.getElementById("cmp-guides");
  if (guides && T.guides) guides.innerHTML = T.guides.map(function (g) {
    return '<a class="cmp-guide" href="' + g[1] + '"><strong>' + esc(g[0]) + "</strong><span>" + esc(g[2]) + "</span></a>";
  }).join("");

  const faq = document.getElementById("cmp-faq");
  if (faq && T.faq) faq.innerHTML = T.faq.map(function (q) {
    return '<details class="chk-faq-item"><summary>' + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p></details>";
  }).join("");

  const seo = document.getElementById("cmp-seo");
  if (seo && T.seo) seo.innerHTML = T.seo.map(function (s) {
    return "<section><h2>" + esc(s[0]) + "</h2>" + s[1].map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>";
  }).join("");

  // ---- calculator -----------------------------------------------------------
  const form = document.getElementById("cmp-form");
  const out = document.getElementById("cmp-result");
  const errBox = document.getElementById("cmp-error");
  if (!form || !out) return;
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};

  const todayIso = new Date().toISOString().slice(0, 10);
  ["cmp-dob1", "cmp-dob2"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) { el.setAttribute("min", "1900-01-01"); el.setAttribute("max", todayIso); }
  });

  const parse = (v) => { if (!v) return null; const d = new Date(v + "T00:00:00"); return isNaN(d.getTime()) ? null : d; };
  const showErr = (m) => { errBox.textContent = m; errBox.hidden = false; };
  const clearErr = () => { errBox.hidden = true; errBox.textContent = ""; };

  function hashSeed(str) { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; }
  const jitter = (seed, key) => (hashSeed(seed + "|" + key) % 11) - 5;
  const BASE = { high: 86, medium: 68, low: 52 };
  const clamp = (n) => Math.max(15, Math.min(97, Math.round(n)));
  const ANIMAL_TIER = { same: "high", triangle: "high", neutral: "medium", clash: "low" };
  const WEIGHTS = {
    love: { a: 0.5, e: 0.3, yy: 0.2 },
    communication: { a: 0.4, e: 0.2, yy: 0.4 },
    trust: { a: 0.5, e: 0.3, yy: 0.2 },
    business: { a: 0.5, e: 0.5 },
    friendship: { a: 0.7, e: 0.3 }
  };
  const OVERALL_W = { love: 0.25, communication: 0.2, trust: 0.2, business: 0.15, friendship: 0.2 };
  const KEYS = ["love", "communication", "trust", "business", "friendship"];
  const ICON = { love: "❤️", communication: "💬", trust: "🤝", business: "📈", friendship: "👥", overall: "⭐" };
  const tierOf = (s) => (s >= 75 ? "high" : s >= 50 ? "medium" : "low");
  const tierIdx = { high: 0, medium: 1, low: 2 };

  function shuffled(arr, seed, key) {
    return arr.map(function (v, i) { return { v: v, k: hashSeed(seed + "|" + key + "|" + i) }; })
      .sort(function (a, b) { return a.k - b.k; }).map(function (o) { return o.v; });
  }
  function levelIndex(s) { return s >= 85 ? 0 : s >= 70 ? 1 : s >= 55 ? 2 : s >= 40 ? 3 : 4; }

  function animateCount(el, to) {
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = to + "%"; return; }
    const t0 = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - t0) / 1100);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to) + "%";
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  const HEART_PATH = "M100 168 C 30 112 6 78 6 48 C 6 22 26 6 50 6 C 72 6 90 18 100 36 C 110 18 128 6 150 6 C 174 6 194 22 194 48 C 194 78 170 112 100 168 Z";

  function personCard(label, bz) {
    const yy = bz.yinYang === "Yang" ? T.yang : T.yin;
    return '<div class="cmp-person">' +
      '<p class="cmp-person-l">' + esc(label) + "</p>" +
      '<div class="cmp-medal">' + zodiacAnimal(bz.animal, { plain: true, size: 150, eager: true }) + "</div>" +
      '<p class="cmp-person-a">' + esc(aName(bz.animal)) + "</p>" +
      '<ul class="cmp-person-meta">' +
      "<li><span>" + T.year + "</span><b>" + bz.zodiacYear + "</b></li>" +
      "<li><span>" + T.element + "</span><b>" + esc(eName(bz.element)) + "</b></li>" +
      "<li><span>" + T.yy + "</span><b>" + esc(yy) + "</b></li></ul></div>";
  }

  function focusList(arr) {
    return '<ul class="cmp-focus">' + arr.map(function (f) { return "<li><strong>" + esc(f[0]) + "</strong><span>" + esc(f[1]) + "</span></li>"; }).join("") + "</ul>";
  }

  function render(raw1, raw2) {
    const d1 = parse(raw1), d2 = parse(raw2);
    if (!d1 || !d2) { showErr(T.err_invalid); return; }
    const end = new Date(); end.setHours(23, 59, 59, 999);
    if (d1 > end || d2 > end) { showErr(T.err_future); return; }
    clearErr();

    const A = getBaZi(d1), B = getBaZi(d2);
    const relType = getCompatibilityType(A.animal, B.animal);
    const aTier = ANIMAL_TIER[relType] || "medium";
    const elRel = elementRelation(A.element, B.element, "en");
    const yyDiff = A.yinYang !== B.yinYang;
    const seed = raw1 + "|" + raw2;

    const scores = {};
    KEYS.forEach(function (k) {
      const w = WEIGHTS[k];
      let base = BASE[aTier] * w.a + BASE[elRel.tier] * w.e;
      if (w.yy) base += (yyDiff ? 8 : -4) * w.yy;
      scores[k] = clamp(base + jitter(seed, k));
    });
    let tot = 0; KEYS.forEach(function (k) { tot += scores[k] * OVERALL_W[k]; });
    scores.overall = clamp(tot + jitter(seed, "overall") * 0.4);
    const overall = scores.overall;
    const lvl = T.levels[levelIndex(overall)];

    const ranked = KEYS.slice().sort(function (x, y) { return scores[y] - scores[x]; });
    const names = { A: aName(A.animal), B: aName(B.animal), EA: eName(A.element), EB: eName(B.element) };
    const desc = fill(T.intro[relType], names) + " " + T.tierLine[tierOf(overall)] + " " +
      fill(T.topLine, { T: T.cats[ranked[0]], W: T.cats[ranked[ranked.length - 1]] });

    // strengths / challenges (change with the pairing)
    const sb = shuffled(T.strengths[relType], seed, "s");
    const strengths = sb.slice(0, 3);
    if (elRel.relation !== "controls") strengths.push(T.strengthEl[elRel.relation]);
    if (yyDiff) strengths.push(T.strengthYY);
    if (strengths.length < 4) strengths.push(sb[3]);
    const cb = shuffled(T.challenges[relType], seed, "c");
    const challenges = cb.slice(0, 3);
    if (elRel.relation === "controls") challenges.push(T.challengeEl);
    if (!yyDiff) challenges.push(T.challengeYY);

    const elLabelKey = { generates: "harmonious", same: "supportive", neutral: "neutral", controls: "challenging" }[elRel.relation];
    const elText = fill(T.elText[elRel.relation], names);

    const cards = KEYS.concat(["overall"]).map(function (k) {
      const sc = scores[k];
      const tx = T.catText[k][tierIdx[tierOf(sc)]];
      return '<article class="cmp-score cmp-s-' + k + '"><div class="cmp-score-top"><span class="cmp-score-ico" aria-hidden="true">' + ICON[k] + "</span>" +
        "<h3>" + esc(T.cats[k]) + '</h3></div><p class="cmp-score-pct">' + sc + '%</p>' +
        '<div class="cmp-bar" role="presentation"><i style="width:' + sc + '%"></i></div><p class="cmp-score-tx">' + esc(tx) + "</p></article>";
    }).join("");

    const five = ELEMS.map(function (e) {
      const on = e === A.element || e === B.element;
      return '<li class="cmp-el' + (on ? " is-on" : "") + '"><img src="images/business/el-' + e.toLowerCase() + '.webp" alt="" width="56" height="56" loading="lazy"><b>' + esc(eName(e)) + "</b><span>" + esc(T.five[e]) + "</span></li>";
    }).join("");

    const shareText = (isKm ? names.A + " + " + names.B : A.animal + " + " + B.animal) + " — " + overall + "%";
    const shareHtml = typeof shareRowHtml === "function"
      ? shareRowHtml(shareText, { cardType: "compat", emoji: ZODIAC_EMOJI[A.animal] + " 💞 " + ZODIAC_EMOJI[B.animal], heading: isKm ? names.A + " + " + names.B : A.animal + " + " + B.animal, subheading: lvl + " — " + overall + "%", badge: overall + "%" })
      : "";

    out.innerHTML =
      '<section class="cmp-result" aria-labelledby="cmp-res-h">' +
      '<h2 id="cmp-res-h" class="cmp-h2">' + esc(T.result_h) + "</h2>" +
      '<div class="cmp-stage">' + personCard(T.p1, A) +
      '<div class="cmp-core"><div class="cmp-heartwrap">' +
      '<svg viewBox="0 0 200 176" aria-hidden="true"><defs><linearGradient id="cmpg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5fa5"/><stop offset="1" stop-color="#8a5cff"/></linearGradient></defs><path d="' + HEART_PATH + '" fill="rgba(20,12,52,.88)" stroke="url(#cmpg)" stroke-width="5"/><path d="' + HEART_PATH + '" fill="none" stroke="#e7c27a" stroke-width="1.5" transform="translate(100 88) scale(.93) translate(-100 -88)"/></svg>' +
      '<div class="cmp-pct" id="cmp-pct" aria-label="' + overall + '%">0%</div></div>' +
      '<p class="cmp-level">' + esc(lvl) + "</p></div>" + personCard(T.p2, B) + "</div>" +
      '<p class="cmp-desc-lg">' + esc(desc) + "</p>" +
      '<p class="cmp-note">' + esc(T.score_note) + "</p>" + shareHtml + "</section>" +

      '<section class="cmp-scores" aria-label="' + esc(T.result_h) + '">' + cards + "</section>" +

      '<section class="cmp-two"><div class="cmp-panel cmp-good"><h2 class="cmp-h3">' + esc(T.strengthsH) + '</h2><ul class="chk-list">' +
      strengths.slice(0, 5).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="cmp-panel cmp-care"><h2 class="cmp-h3">' + esc(T.challengesH) + '</h2><ul class="chk-list">' +
      challenges.slice(0, 5).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div></section>" +

      '<section class="cmp-panel cmp-elements"><h2 class="cmp-h3">' + esc(T.elementsH) + "</h2>" +
      '<div class="cmp-elpair"><span>' + esc(eName(A.element)) + '</span><i aria-hidden="true">+</i><span>' + esc(eName(B.element)) + '</span><em class="cmp-tag cmp-tag-' + elLabelKey + '">' + esc(T.elRel[elLabelKey]) + "</em></div>" +
      "<p>" + esc(elText) + "</p><h3 class=\"cmp-h4\">" + esc(T.fiveH) + '</h3><ul class="cmp-five">' + five + "</ul></section>" +

      '<section class="cmp-guidelines"><div class="cmp-guidelines-in"><h2 class="cmp-h3">' + esc(T.guideH) + '</h2><ul class="chk-list cmp-guide-list">' +
      T.guide.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ul></div></section>" +

      '<section class="cmp-panel cmp-deep cmp-deep-love"><h2 class="cmp-h3">' + esc(T.loveH) + "</h2><p>" + esc(fill(T.love[tierOf(scores.love)], names)) + "</p>" + focusList(T.loveFocus) + "</section>" +
      '<section class="cmp-panel cmp-deep cmp-deep-friend"><h2 class="cmp-h3">' + esc(T.friendH) + "</h2><p>" + esc(fill(T.friend[tierOf(scores.friendship)], names)) + "</p>" + focusList(T.friendFocus) + "</section>" +
      '<section class="cmp-panel cmp-deep cmp-deep-biz"><h2 class="cmp-h3">' + esc(T.bizH) + "</h2><p>" + esc(fill(T.biz[tierOf(scores.business)], names)) + "</p>" + focusList(T.bizFocus) +
      '<p class="cmp-cta-row"><a class="chk-btn" href="business-partner.html">' + esc(T.bizCta) + "</a></p></section>" +
      '<p class="cmp-reset-row"><button type="button" id="cmp-reset" class="cmp-reset">' + esc(T.reset) + "</button></p>";

    animateCount(document.getElementById("cmp-pct"), overall);
    if (typeof wireShareRows === "function") wireShareRows(out);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("person1", raw1); url.searchParams.set("person2", raw2);
      window.history.replaceState(null, "", url.pathname + url.search);
    } catch (e) { /* best effort */ }

    const reset = document.getElementById("cmp-reset");
    if (reset) reset.addEventListener("click", function () {
      form.reset(); setDates("", ""); out.innerHTML = "";
      try { const u = new URL(window.location.href); u.searchParams.delete("person1"); u.searchParams.delete("person2"); window.history.replaceState(null, "", u.pathname + u.search); } catch (e) { }
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const a = document.getElementById("cmp-dob1").value, b = document.getElementById("cmp-dob2").value;
    if (!a || !b) { showErr(T.err_required); return; }
    render(a, b);
  });

  function setDates(a, b) {
    [["cmp-dob1", a], ["cmp-dob2", b]].forEach(function (x) {
      const el = document.getElementById(x[0]);
      el.value = x[1];
      el.dispatchEvent(new Event("change", { bubbles: true }));
      // keep the custom date picker's visible text in sync with the value
      const kdp = el.closest(".kdp") || (el.parentNode && el.parentNode.querySelector(".kdp"));
      const txt = kdp && kdp.querySelector(".kdp-display-text");
      if (txt) {
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(x[1]);
        txt.textContent = m ? m[3] + "/" + m[2] + "/" + m[1] : "";
        kdp.classList.toggle("kdp-empty", !m);
      }
    });
  }

  (function autoLoad() {
    try {
      const p = new URLSearchParams(window.location.search);
      const a = p.get("person1"), b = p.get("person2");
      if (a && b && parse(a) && parse(b)) {
        setDates(a, b);
        render(a, b);
      }
    } catch (e) { /* best effort */ }
  })();
});
