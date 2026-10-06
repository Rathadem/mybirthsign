// wedding.js — Chinese Zodiac Wedding Date Calculator (redesigned page).
// The calculation is unchanged: each month has a traditional animal, and
// rateWeddingMonth() rates it against both partners' animals. The overall
// harmony figure reuses getCompatibilityType() + elementRelation() (same
// traditional rules as the Compatibility page). Nothing here invents calendar facts.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("wedding-form");
  const resultBox = document.getElementById("wedding-result");
  if (!form || !resultBox) return;

  const lang = typeof getLang === "function" ? getLang() : "en";
  const isKm = lang === "km";
  const T = (typeof WED_TEXT !== "undefined" && (WED_TEXT[lang] || WED_TEXT.en)) || {};
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fill = (s, map) => String(s).replace(/\{(\w+)\}/g, (m, k) => (map[k] !== undefined ? map[k] : m));
  const aName = (a) => (isKm && typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[a] : a);
  const eName = (e) => (isKm && typeof KM_ELEMENT_NAMES !== "undefined" ? KM_ELEMENT_NAMES[e] : e);
  const errBox = document.getElementById("wed-error");
  const showErr = (m) => { if (errBox) { errBox.textContent = m; errBox.hidden = false; } };
  const clearErr = () => { if (errBox) { errBox.hidden = true; errBox.textContent = ""; } };

  // ---- static text (English is already in the HTML; Khmer replaces it) -------
  document.querySelectorAll("[data-wed]").forEach(function (el) {
    const k = el.getAttribute("data-wed");
    if (T[k] !== undefined) el.textContent = T[k];
  });
  if (isKm && T.title) document.title = T.title + " | MyBirthSign";
  function fillList(id, html) { const el = document.getElementById(id); if (el && isKm) el.innerHTML = html; }
  fillList("wed-why", (T.why || []).map(function (w) { return '<article class="wed-why-card"><h3>' + esc(w[0]) + "</h3><p>" + esc(w[1]) + "</p></article>"; }).join(""));
  fillList("wed-plan", (T.plan || []).map(function (w, i) { return '<article class="wed-plan-card"><span class="wed-plan-n" aria-hidden="true">' + (i + 1) + "</span><h3>" + esc(w[0]) + "</h3><p>" + esc(w[1]) + "</p></article>"; }).join(""));
  fillList("wed-tools", (T.tools || []).map(function (w) { return '<a class="wed-tool" href="' + w[2] + '"><strong>' + esc(w[0]) + "</strong><span>" + esc(w[1]) + "</span></a>"; }).join(""));
  fillList("wed-faq", (T.faq || []).map(function (q) { return '<details class="chk-faq-item"><summary>' + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p></details>"; }).join(""));

  // ---- existing logic (unchanged) ---------------------------------------------
  const RATING_KEY = { excellent: "rating_excellent", good: "rating_good", workable: "rating_workable", avoid: "rating_avoid" };
  const SEASON_BY_REGION = {
    northern: ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "fall", "fall", "fall", "winter"],
    southern: ["summer", "summer", "fall", "fall", "fall", "winter", "winter", "winter", "spring", "spring", "spring", "summer"],
    tropical: ["tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical"]
  };
  const SEASON_LABEL_KEY = { spring: "season_spring", summer: "season_summer", fall: "season_fall", winter: "season_winter", tropical: "season_tropical" };
  const SEASON_NOTE_KEY = { spring: "season_note_mild", fall: "season_note_mild", summer: "season_note_hot", winter: "season_note_cold", tropical: "season_note_tropical" };
  const MILD_SEASONS = ["spring", "fall"];

  function saturdaysInMonth(year, monthIndex) {
    const dates = [];
    const d = new Date(year, monthIndex, 1);
    while (d.getMonth() === monthIndex) {
      if (d.getDay() === 6) dates.push(d.getDate());
      d.setDate(d.getDate() + 1);
    }
    return dates;
  }

  function holidaysInMonth(year, monthIndex) {
    const names = [];
    if (monthIndex === 0) names.push(isKm ? "ទិវាចូលឆ្នាំសាកល" : "New Year's Day");
    if (monthIndex === 1) names.push(isKm ? "ទិវាស្នេហា" : "Valentine's Day");
    if (monthIndex === 3) names.push(isKm ? "បុណ្យចូលឆ្នាំខ្មែរ" : "Khmer New Year");
    if (monthIndex === 11) names.push(isKm ? "បុណ្យណូអែល" : "Christmas");
    const cny = typeof CNY_DATES !== "undefined" ? CNY_DATES[year] : null;
    if (cny) {
      const cnyMonth = parseInt(cny.split("-")[0], 10);
      if (cnyMonth - 1 === monthIndex) names.push(isKm ? "បុណ្យចូលឆ្នាំចិន" : "Lunar New Year");
    }
    return names;
  }

  // ---- overall harmony (traditional rules shared with the Compatibility page) ---
  const BASE = { high: 86, medium: 68, low: 52 };
  const ANIMAL_TIER = { same: "high", triangle: "high", neutral: "medium", clash: "low" };
  function harmonyScore(A, B) {
    const rel = getCompatibilityType(A.animal, B.animal);
    const el = elementRelation(A.element, B.element, "en");
    const yyDiff = A.yinYang !== B.yinYang;
    const raw = BASE[ANIMAL_TIER[rel] || "medium"] * 0.6 + BASE[el.tier] * 0.4 + (yyDiff ? 4 : -2);
    return Math.max(15, Math.min(97, Math.round(raw)));
  }
  const levelIdx = (s) => (s >= 85 ? 0 : s >= 70 ? 1 : s >= 55 ? 2 : 3);

  const LOTUS = { excellent: "green", good: "pink", workable: "gold", avoid: "gold" };
  const STARS = { excellent: 5, good: 4, workable: 3, avoid: 2 };
  const starsHtml = (n) => '<span class="wed-stars" role="img" aria-label="' + esc(fill(T.starsLabel, { n: n })) + '">' + "★".repeat(n) + "☆".repeat(5 - n) + "</span>";

  function partnerCard(label, bz) {
    const slug = bz.animal.toLowerCase();
    const info = isKm && typeof KM_ANIMAL_INFO !== "undefined" ? KM_ANIMAL_INFO[bz.animal] : (typeof ANIMAL_INFO !== "undefined" ? ANIMAL_INFO[bz.animal] : null);
    const traits = info && info.traits ? info.traits : "";
    const yy = bz.yinYang === "Yang" ? T.yang : T.yin;
    return '<div class="wed-partner">' +
      '<p class="wed-partner-l">' + esc(label) + "</p>" +
      '<div class="wed-medal"><img src="images/zodiac/' + slug + '.webp" alt="' + esc(aName(bz.animal)) + '" width="150" height="150" loading="eager"></div>' +
      '<h3 class="wed-partner-a">' + esc(aName(bz.animal)) + "</h3>" +
      '<ul class="wed-partner-meta"><li><span>' + esc(T.year) + "</span><b>" + bz.zodiacYear + "</b></li>" +
      "<li><span>" + esc(T.element) + "</span><b>" + esc(eName(bz.element)) + "</b></li>" +
      "<li><span>" + esc(T.yy) + "</span><b>" + esc(yy) + "</b></li></ul>" +
      (traits ? '<p class="wed-partner-t"><b>' + esc(T.traitsL) + ":</b> " + esc(traits) + "</p>" : "") + "</div>";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const valueA = document.getElementById("dob-a").value;
    const valueB = document.getElementById("dob-b").value;
    const year = parseInt(document.getElementById("wedding-year").value, 10);
    const regionSelect = document.getElementById("wedding-region");
    const region = regionSelect ? regionSelect.value : "tropical";
    if (!valueA || !valueB || !year) { showErr(T.errDates); return; }

    const dateA = new Date(valueA + "T00:00:00");
    const dateB = new Date(valueB + "T00:00:00");
    const end = new Date(); end.setHours(23, 59, 59, 999);
    if (isNaN(dateA) || isNaN(dateB)) { showErr(T.errDates); return; }
    if (dateA > end || dateB > end) { showErr(T.errFuture); return; }
    clearErr();

    const A = getBaZi(dateA), B = getBaZi(dateB);
    const dateLocale = isKm ? "km-KH" : "en-US";
    const seasons = SEASON_BY_REGION[region] || SEASON_BY_REGION.tropical;

    const rows = MONTH_ANIMALS.map(function (monthAnimal, i) {
      const rating = rateWeddingMonth(monthAnimal, A.animal, B.animal);
      let monthName;
      try { monthName = new Date(year, i, 1).toLocaleDateString(dateLocale, { month: "long" }); }
      catch (err) { monthName = new Date(year, i, 1).toLocaleDateString("en-US", { month: "long" }); }
      return { monthIndex: i, monthName: monthName, monthAnimal: monthAnimal, rating: rating, season: seasons[i], holidays: holidaysInMonth(year, i) };
    });

    const seasonLabel = (r) => S[SEASON_LABEL_KEY[r.season]] || "";
    const holText = (r) => (r.holidays.length ? r.holidays.join(", ") : T.noHol);

    // ---- guide panel ------------------------------------------------------
    const score = harmonyScore(A, B);
    const lvl = T.levels[levelIdx(score)];
    const guide =
      '<section class="wed-guide" aria-labelledby="wed-guide-h">' +
      '<img class="wed-guide-top" src="images/wedding/frame-top.webp" alt="" width="348" height="108" loading="eager">' +
      '<h2 id="wed-guide-h" class="wed-guide-h">' + esc(T.guideH) + "</h2>" +
      '<div class="wed-stage">' + partnerCard(T.partner1, A) +
      '<div class="wed-core"><div class="wed-heartwrap"><img src="images/wedding/heart.webp" alt="" width="194" height="86" loading="eager">' +
      '<div class="wed-pct" id="wed-pct" aria-label="' + score + '%">' + score + "%</div></div>" +
      '<p class="wed-harmony-h">' + esc(T.harmonyH) + '</p><p class="wed-level">' + esc(lvl) + "</p></div>" +
      partnerCard(T.partner2, B) + "</div>" +
      '<p class="wed-harmony-note">' + esc(T.harmonyNote) + "</p></section>";

    // ---- 12-month calendar --------------------------------------------------
    const headingText = fill(T.monthsH, { year: year });
    const cal = rows.map(function (r) {
      const sub = seasonLabel(r) + (r.holidays.length ? " · " + r.holidays.join(", ") : "");
      return '<li class="wed-m wed-m-' + r.rating + '">' +
        '<span class="wed-m-name">' + esc(r.monthName) + "</span>" +
        '<img src="images/wedding/lotus-' + LOTUS[r.rating] + '.webp" alt="" width="64" height="35" loading="lazy">' +
        '<b class="wed-m-rate">' + esc(T.rate[r.rating]) + "</b>" +
        '<span class="wed-m-note">' + esc(T.rateNote[r.rating]) + "</span>" +
        '<small class="wed-m-sub">' + esc(sub) + "</small></li>";
    }).join("");
    const months =
      '<section class="wed-months" aria-labelledby="wed-months-h"><h2 id="wed-months-h" class="cmp-h2">' + esc(headingText) + "</h2>" +
      '<p class="wed-lead">' + esc(T.monthsSub) + "</p>" +
      '<ul class="wed-cal">' + cal + "</ul></section>";

    // ---- recommended dates (Saturdays in the best months) ----------------------
    const rank = { excellent: 0, good: 1, workable: 2, avoid: 3 };
    const topPicks = rows.filter(function (r) {
      const ratingOk = r.rating === "excellent" || r.rating === "good";
      const seasonOk = region === "tropical" || MILD_SEASONS.includes(r.season);
      return ratingOk && seasonOk;
    }).sort(function (a, b) { return rank[a.rating] - rank[b.rating] || a.monthIndex - b.monthIndex; });

    const picks = [];
    topPicks.forEach(function (r) {
      const sats = saturdaysInMonth(year, r.monthIndex);
      [sats[1], sats[3]].forEach(function (day) { if (day) picks.push({ r: r, day: day }); });
    });
    const shown = picks.slice(0, 6);
    const dateItems = shown.map(function (p) {
      let label;
      try { label = new Date(year, p.r.monthIndex, p.day).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" }); }
      catch (err) { label = p.r.monthName + " " + p.day + ", " + year; }
      return '<li class="wed-d wed-d-' + p.r.rating + '"><div class="wed-d-date"><b>' + esc(label) + "</b>" +
        starsHtml(STARS[p.r.rating]) + '<span class="wed-d-rate">' + esc(T.rate[p.r.rating]) + "</span></div>" +
        '<p>' + esc(T.rateFull[p.r.rating]) + " " + esc(seasonLabel(p.r)) + ".</p></li>";
    }).join("");
    const dates =
      '<section class="wed-dates" aria-labelledby="wed-dates-h"><h2 id="wed-dates-h" class="cmp-h2">' + esc(T.datesH) + "</h2>" +
      '<p class="wed-lead">' + esc(T.datesSub) + "</p>" +
      (dateItems ? '<ul class="wed-dlist">' + dateItems + "</ul>" : '<p class="wed-none">' + esc(T.datesNone) + "</p>") + "</section>";

    // ---- full table (all the original columns are kept) -------------------------
    const tableRows = rows.map(function (r) {
      return '<tr class="wedding-row wedding-row-' + r.rating + '"><td>' + esc(r.monthName) + "</td>" +
        "<td>" + (ZODIAC_EMOJI[r.monthAnimal] || "") + " " + esc(aName(r.monthAnimal)) + "</td>" +
        '<td><span class="wedding-badge wedding-badge-' + r.rating + '">' + esc(T.rate[r.rating]) + "</span></td>" +
        "<td>" + esc(T.rateFull[r.rating]) + "</td>" +
        "<td>" + esc(seasonLabel(r)) + '<br><span class="wedding-season-note">' + esc(S[SEASON_NOTE_KEY[r.season]] || "") + "</span></td>" +
        "<td>" + esc(holText(r)) + "</td></tr>";
    }).join("");
    const table =
      '<details class="wed-table-box"><summary>' + esc(T.tableH) + "</summary>" +
      '<div class="wedding-table-wrap"><table class="wedding-table"><thead><tr><th>' + esc(T.colMonth) + "</th><th>" + esc(T.colAnimal) + "</th><th>" + esc(T.colRating) + "</th><th>" + esc(T.colWhy) + "</th><th>" + esc(T.colSeason) + "</th><th>" + esc(T.colHol) + "</th></tr></thead><tbody>" + tableRows + "</tbody></table></div>" +
      '<p class="disclaimer">' + esc(S.wedding_disclaimer || "") + "</p></details>";

    const shareHeading = fill(T.shareHeading, { year: year });
    const share = typeof shareRowHtml === "function"
      ? shareRowHtml(shareHeading, { emoji: "💍", heading: shareHeading, subheading: aName(A.animal) + " & " + aName(B.animal) })
      : "";

    resultBox.innerHTML = guide + share + months + dates + table;
    if (typeof wireShareRows === "function") wireShareRows(resultBox);
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
