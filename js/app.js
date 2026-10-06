document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("birthday-form");
  const resultBox = document.getElementById("result");
  const dobInput = document.getElementById("dob");

  function dateLocale(lang) {
    return lang === "km" ? "km-KH" : "en-US";
  }

  // Many mobile browsers ship with reduced ICU data and silently fall back
  // to English when asked to format a date in "km-KH", instead of throwing.
  // So for Khmer we format manually with known-good month/weekday names
  // rather than relying on the browser's Intl support.
  const KM_WEEKDAYS = ["អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"];
  const KM_MONTHS = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];

  function localeDate(date, lang, opts) {
    if (lang === "km") {
      const segments = [];
      if (opts.weekday) segments.push("ថ្ងៃ" + KM_WEEKDAYS[date.getDay()]);
      if (opts.day) segments.push("ទី" + date.getDate());
      if (opts.month) segments.push("ខែ" + KM_MONTHS[date.getMonth()]);
      if (opts.year) segments.push("ឆ្នាំ" + date.getFullYear());
      return segments.join(" ");
    }
    try {
      return date.toLocaleDateString(dateLocale(lang), opts);
    } catch (e) {
      return date.toLocaleDateString("en-US", opts);
    }
  }

  // Today's date widgets
  const todayEl = document.getElementById("today-date");
  if (todayEl) {
    const lang = getLang();
    const today = new Date();
    todayEl.textContent = localeDate(today, lang, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }
  const todayNumberEl = document.getElementById("today-number");
  if (todayNumberEl) {
    const today = new Date();
    const digits = (today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString();
    let sum = digits.split("").reduce((a, b) => a + parseInt(b, 10), 0);
    while (sum > 9) {
      sum = sum.toString().split("").reduce((a, b) => a + parseInt(b, 10), 0);
    }
    todayNumberEl.textContent = sum;
  }

  const heroBtn = document.getElementById("hero-reveal-btn");
  if (heroBtn) {
    heroBtn.addEventListener("click", function () {
      window.location.href = "checker.html";
    });
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = dobInput.value;
    if (!value) return;

    const lang = getLang();
    const S = UI_STRINGS[lang];

    const date = new Date(value + "T00:00:00");
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const { animal, element, zodiacYear } = getZodiac(date);
    const info = ANIMAL_INFO[animal];
    const elInfo = ELEMENT_INFO[element];
    const kmInfo = KM_ANIMAL_INFO[animal];
    const kmElInfo = KM_ELEMENT_INFO[element];
    const cny = CNY_DATES[date.getFullYear()];

    const animalDisplay = lang === "km" ? KM_ANIMAL_NAMES[animal] : animal;
    const elementDisplay = lang === "km" ? KM_ELEMENT_NAMES[element] : element;
    // In Khmer, spell the result out as "ឆ្នាំ{zodiac year name} ធាតុ
    // {element} សត្វ{everyday animal name}" (e.g. "ឆ្នាំមមី ធាតុ ភ្លើង
    // សត្វសេះ") rather than the terser "{element} {animal}" used in English.
    const resultHeading = lang === "km"
      ? "ឆ្នាំ" + animalDisplay + " ធាតុ " + elementDisplay + " សត្វ" + KM_ANIMAL_COMMON_NAMES[animal]
      : elementDisplay + " " + animalDisplay;

    const trianglePartners = getTrianglePartners(animal);
    const trianglePartnersDisplay = trianglePartners.map((a) => (lang === "km" ? KM_ANIMAL_NAMES[a] : a));

    const matchYearsHtml = trianglePartners
      .map((a, i) => `<li><strong>${trianglePartnersDisplay[i]}</strong>: ${nearbyYearsForAnimal(a, zodiacYear).join(", ")}</li>`)
      .join("");
    const sameSignYears = nearbyYearsForAnimal(animal, zodiacYear).filter((y) => y !== zodiacYear);
    const clashAnimal = info.clash[0];
    const clashAnimalDisplay = lang === "km" ? KM_ANIMAL_NAMES[clashAnimal] : clashAnimal;
    const clashYears = nearbyYearsForAnimal(clashAnimal, zodiacYear);

    const traits = lang === "km" ? kmInfo.traits : info.traits;
    const weaknesses = lang === "km" ? kmInfo.weaknesses : info.weaknesses;
    const overview = lang === "km" ? kmInfo.overview : info.overview;
    const careers = lang === "km" ? kmInfo.careers : info.careers;
    const luckyColors = lang === "km" ? kmInfo.luckyColors : info.luckyColors;
    const luckyDays = lang === "km" ? kmInfo.luckyDays : info.luckyDays;
    const elOverview = lang === "km" ? kmElInfo.overview : elInfo.overview;
    const elBlurb = lang === "km" ? kmElInfo.blurb : elInfo.blurb;

    const bornSub = fmt(S.born_sub_tpl, {
      date: localeDate(date, lang, { year: "numeric", month: "long", day: "numeric" }),
      year: zodiacYear
    });

    const lunarNote = cny
      ? fmt(S.lunar_note_with_cny_tpl, {
          year: date.getFullYear(),
          cny: localeDate(new Date(date.getFullYear() + "-" + cny + "T00:00:00"), lang, { month: "long", day: "numeric" })
        })
      : fmt(S.lunar_note_no_cny_tpl, { year: date.getFullYear() });

    const sameSignNote = fmt(S.same_sign_note_tpl, { animal: animalDisplay, years: sameSignYears.join(", ") });
    const needsPatienceNote = fmt(S.needs_patience_note_tpl, { animal: clashAnimalDisplay, years: clashYears.join(", ") });

    // --- Today's luck for this sign ---
    const ENGLISH_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const todayWeekdayEn = ENGLISH_WEEKDAYS[today.getDay()];
    const todayWeekdayDisplay = localeDate(today, lang, { weekday: "long" });
    const todayDateDisplay = localeDate(today, lang, { year: "numeric", month: "long", day: "numeric" });

    const todayDigits = (today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString();
    let todayNumber = todayDigits.split("").reduce((a, b) => a + parseInt(b, 10), 0);
    while (todayNumber > 9) {
      todayNumber = todayNumber.toString().split("").reduce((a, b) => a + parseInt(b, 10), 0);
    }

    const todayMonthAnimal = MONTH_ANIMALS[today.getMonth()];
    const todayMonthAnimalDisplay = lang === "km" ? KM_ANIMAL_NAMES[todayMonthAnimal] : todayMonthAnimal;
    const monthRelation = getCompatibilityType(animal, todayMonthAnimal);

    const isLuckyWeekday = luckyDays.includes(todayWeekdayEn);
    const isLuckyNumber = info.luckyNumbers.includes(todayNumber);

    let luckScore = 0;
    if (isLuckyWeekday) luckScore += 1;
    if (isLuckyNumber) luckScore += 1;
    if (monthRelation === "same") luckScore += 2;
    else if (monthRelation === "triangle") luckScore += 1;
    else if (monthRelation === "clash") luckScore -= 2;

    let verdictKey;
    if (luckScore <= -1) verdictKey = "today_luck_verdict_caution";
    else if (luckScore >= 3) verdictKey = "today_luck_verdict_great";
    else if (luckScore >= 1) verdictKey = "today_luck_verdict_good";
    else verdictKey = "today_luck_verdict_ordinary";

    const monthRelationKeyMap = {
      same: "today_luck_month_same_tpl",
      triangle: "today_luck_month_triangle_tpl",
      clash: "today_luck_month_clash_tpl",
      neutral: "today_luck_month_neutral_tpl"
    };

    const todayLuckHtml = `
      <div class="today-luck-card">
        <h3>${S.today_luck_heading}</h3>
        <p class="today-luck-intro">${fmt(S.today_luck_date_tpl, { date: todayDateDisplay, animal: animalDisplay })}</p>
        <ul class="today-luck-list">
          <li>${fmt(isLuckyWeekday ? S.today_luck_weekday_match_tpl : S.today_luck_weekday_nomatch_tpl, { weekday: todayWeekdayDisplay })}</li>
          <li>${fmt(isLuckyNumber ? S.today_luck_number_match_tpl : S.today_luck_number_nomatch_tpl, { number: todayNumber })}</li>
          <li>${fmt(S[monthRelationKeyMap[monthRelation]], { animal: todayMonthAnimalDisplay })}</li>
        </ul>
        <p class="today-luck-verdict today-luck-verdict-${verdictKey.replace("today_luck_verdict_", "")}">${S[verdictKey]}</p>
      </div>
    `;

    // --- Redesigned result: hero card + four info cards ---
    const X = (typeof CHECKER_EXTRA !== "undefined" && CHECKER_EXTRA[animal]) || null;
    const slug = animal.toLowerCase();
    const li = (arr) => '<ul class="chk-list">' + arr.map((t) => "<li>" + t + "</li>").join("") + "</ul>";
    const yinyang = X ? (X.yin === "Yang" ? S.chk_yang : S.chk_yin) : "";
    const yearsList = nearbyYearsForAnimal(animal, 1990, 12).filter((y) => y >= 1950 && y <= 2031).join(", ");
    const XK = typeof CHECKER_EXTRA_KM !== "undefined" ? CHECKER_EXTRA_KM[animal] : null;
    const XL = lang === "km" ? XK : X;
    const useEn = !!XL;
    const persBody = useEn ? li(XL.personality) : "<p>" + traits + "</p>";
    const loveTitle = S.chk_love;
    const loveBody = useEn ? li(XL.love) : "<p>" + weaknesses + "</p>";
    const careerBody = useEn ? li(XL.career) : "<p>" + careers + "</p>";
    const dirText = lang === "km" ? checkerKmWords(X.directions) : X.directions;
    const monthText = lang === "km" ? checkerKmWords(X.months) : X.months;
    const luckRows = [
      [S.lucky_numbers, info.luckyNumbers.join(", ")],
      [S.lucky_colors, renderLuckyColorChips(luckyColors, info.luckyColors)]
    ];
    if (X) luckRows.push([S.chk_directions, dirText], [S.chk_months, monthText]);
    else luckRows.push([S.lucky_days, luckyDays.join(", ")]);
    luckRows.push([S.best_matches, trianglePartnersDisplay.join(", ")], [S.needs_patience, clashAnimalDisplay]);
    const luckBody = '<ul class="chk-list chk-list-kv">' + luckRows.map((r) => "<li><div><span>" + r[0] + "</span> " + r[1] + "</div></li>").join("") + "</ul>";
    const ICO = {
      cal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 14h2M12 14h2M16 14h0M8 17.5h2M12 17.5h2"/></svg>',
      yy: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M12 2.5a4.75 4.75 0 0 1 0 9.5 4.75 4.75 0 0 0 0 9.5" /><circle cx="12" cy="7.25" r="1.2" fill="currentColor"/><circle cx="12" cy="16.75" r="1.2" fill="currentColor" stroke="none"/></svg>',
      star: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M12 3.5l2 8.5 8.5 0-8.5 0-2 8.5-2-8.5-8.5 0 8.5 0z"/></svg>'
    };
    const tile = (ico, label, value, sub) =>
      '<div class="chk-tile"><span class="chk-tile-ico">' + ico + '</span><div><div class="chk-tile-l">' + label + '</div><div class="chk-tile-v">' + value + "</div>" + (sub ? '<div class="chk-tile-s">' + sub + "</div>" : "") + "</div></div>";
    let outlookHtml = "";
    if (typeof CHECKER_OUTLOOK !== "undefined") {
      const nowAnimal = getZodiac(new Date()).animal;
      const rel = getCompatibilityType(animal, nowAnimal);
      const tier = rel === "same" ? "same" : (rel === "triangle" ? "triangle" : (rel === "clash" ? "clash" : "neutral"));
      const lines = (CHECKER_OUTLOOK[lang] || CHECKER_OUTLOOK.en)[tier];
      outlookHtml = '<ul class="chk-outlook chk-outlook-' + tier + '">' + lines.map((t) => "<li>" + t + "</li>").join("") + "</ul>";
    }
    const topHtml = `
      <section class="chk-hero-card" aria-labelledby="chk-res-h">
        <div class="chk-medal-lg">
          <img src="images/business/animals/${slug}.webp" alt="Golden ${animal} zodiac medallion" width="320" height="320">
          ${X ? `<span class="chk-kanji" lang="zh" aria-hidden="true">${X.kanji}</span>` : ""}
        </div>
        <div class="chk-hero-copy">
          ${lang === "km" ? "" : `<p class="chk-eyebrow">${S.chk_your_sign}</p>`}
          <h2 id="chk-res-h" class="chk-animal">${lang === "km" ? "ឆ្នាំ" + animalDisplay + " សត្វ" + KM_ANIMAL_COMMON_NAMES[animal] : animalDisplay}</h2>
          <p class="chk-years">${yearsList}</p>
          <p class="chk-desc">${traits}</p>
          ${outlookHtml}
        </div>
        <div class="chk-tiles">
          ${tile(ICO.cal, S.chk_birth_year, date.getFullYear())}
          ${tile('<img src="images/business/el-' + element.toLowerCase() + '.webp" alt="" width="40" height="40">', S.chk_element, elementDisplay)}
          ${X ? tile(ICO.yy, S.chk_yinyang, yinyang) : ""}
          ${tile(ICO.star, S.chk_zodiac_year, zodiacYear, resultHeading)}
        </div>
      </section>
      <div class="chk-four">
        <article class="chk-card chk-c-pers"><h3><img src="images/checker/personality.webp" alt="" width="36" height="36" class="chk-ico-new">${S.chk_personality}</h3>${persBody}<img class="chk-art" src="images/checker/art-pers.webp" alt="" width="282" height="99" loading="lazy"></article>
        <article class="chk-card chk-c-love"><h3><img src="images/checker/love.webp" alt="" width="36" height="36" class="chk-ico-new">${loveTitle}</h3>${loveBody}<img class="chk-art" src="images/checker/art-love.webp" alt="" width="282" height="99" loading="lazy"></article>
        <article class="chk-card chk-c-career"><h3><img src="images/checker/career.webp" alt="" width="37" height="30">${S.chk_career}</h3>${careerBody}<img class="chk-art" src="images/checker/art-career.webp" alt="" width="282" height="99" loading="lazy"></article>
        <article class="chk-card chk-c-luck"><h3><img src="images/checker/luck.webp" alt="" width="32" height="32">${S.chk_luck}</h3>${luckBody}<img class="chk-art" src="images/checker/art-luck.webp" alt="" width="282" height="99" loading="lazy"></article>
      </div>
    `;

    resultBox.innerHTML = topHtml + `
      <div class="result-card chk-details">

        <p class="lunar-note">${lunarNote}</p>

        ${todayLuckHtml}

        <p class="overview-text">${overview}</p>
        <p class="overview-text">${elOverview}</p>

        <div id="ai-reading" class="ai-reading" data-element-blurb="${encodeURIComponent(elBlurb)}">
          <p class="ai-loading">${S.ai_loading}</p>
        </div>

        <div class="followup-section">
          <h3>${S.followup_heading}</h3>
          <div class="followup-chips">
            <button type="button" class="chip" data-q="year_ahead">${S.followup_year_ahead}</button>
            <button type="button" class="chip" data-q="luck_boost">${S.followup_luck_boost}</button>
            <button type="button" class="chip" data-q="career_fit">${S.followup_career_fit}</button>
            <button type="button" class="chip" data-q="clash_relationship">${fmt(S.followup_clash_relationship_tpl, { animal: clashAnimalDisplay })}</button>
          </div>
          <div id="followup-answer" class="followup-answer"></div>
        </div>

        <div class="result-grid">
          <div class="result-block" style="grid-column: 1 / -1;">
            <h3>${S.watch_out}</h3>
            <p>${weaknesses}</p>
          </div>
        </div>

        <div class="match-years">
          <h3>${S.best_match_years_heading}</h3>
          <ul class="match-years-list">
            ${matchYearsHtml}
          </ul>
          <p class="match-years-note">${sameSignNote}</p>
          <p class="match-years-note">${needsPatienceNote}</p>
        </div>

        <p class="disclaimer">${S.disclaimer}</p>
      </div>
    `;
    wireShareRows(resultBox);
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });

    // Fetch a personalized AI-written reading. Falls back to the static
    // element blurb if the function isn't deployed yet or the call fails.
    const aiBox = document.getElementById("ai-reading");
    fetch("/.netlify/functions/zodiac-reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ animal, element, month, day, lang })
    })
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data) => {
        if (data.reading) {
          aiBox.innerHTML = data.reading
            .trim()
            .split(/\n+/)
            .map((p) => `<p>${p}</p>`)
            .join("");
        } else {
          throw new Error("no reading");
        }
      })
      .catch(() => {
        // Fallback: static element blurb, so the page never looks broken.
        aiBox.innerHTML = `<p class="element-blurb">${elBlurb}</p>`;
      });

    // Follow-up question chips: ask the AI a more specific question about
    // this exact sign, with a static fallback built from the data we
    // already have if the AI function isn't deployed or the call fails.
    const followupAnswer = document.getElementById("followup-answer");
    const compatForClash = lang === "km" ? KM_COMPAT_INFO.clash : COMPAT_INFO.clash;
    const fallbackFor = {
      year_ahead: elBlurb,
      luck_boost: fmt(S.followup_luck_fallback_tpl, {
        numbers: info.luckyNumbers.join(", "),
        colors: luckyColors.join(", "),
        days: luckyDays.join(", ")
      }),
      career_fit: fmt(S.followup_career_fallback_tpl, { careers }),
      clash_relationship: compatForClash.text.romantic
    };

    resultBox.querySelectorAll(".followup-section .chip").forEach((btn) => {
      btn.addEventListener("click", function () {
        const q = btn.getAttribute("data-q");
        const chips = resultBox.querySelectorAll(".followup-section .chip");
        chips.forEach((b) => (b.disabled = true));
        followupAnswer.innerHTML = `<p class="ai-loading">${S.followup_loading}</p>`;

        fetch("/.netlify/functions/zodiac-reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animal, element, month, day, lang, question: q })
        })
          .then((res) => {
            if (!res.ok) throw new Error("bad response");
            return res.json();
          })
          .then((data) => {
            if (data.reading) {
              followupAnswer.innerHTML = data.reading
                .trim()
                .split(/\n+/)
                .map((p) => `<p>${p}</p>`)
                .join("");
            } else {
              throw new Error("no reading");
            }
          })
          .catch(() => {
            followupAnswer.innerHTML = `<p class="element-blurb">${fallbackFor[q] || ""}</p>`;
          })
          .finally(() => {
            chips.forEach((b) => (b.disabled = false));
          });
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const compatForm = document.getElementById("compat-form");
  const compatResult = document.getElementById("compat-result");
  if (!compatForm) return;

  compatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const valueA = document.getElementById("dob-a").value;
    const valueB = document.getElementById("dob-b").value;
    if (!valueA || !valueB) return;

    const lang = getLang();
    const S = UI_STRINGS[lang];

    const context = compatForm.querySelector('input[name="context"]:checked').value;
    const contextLabel = context === "business" ? S.business_label : S.romantic_label;

    const dateA = new Date(valueA + "T00:00:00");
    const dateB = new Date(valueB + "T00:00:00");
    const za = getZodiac(dateA);
    const zb = getZodiac(dateB);

    const type = getCompatibilityType(za.animal, zb.animal);
    const compat = COMPAT_INFO[type];
    const kmCompat = KM_COMPAT_INFO[type];
    const compatLabel = lang === "km" ? kmCompat.label : compat.label;
    const compatText = lang === "km" ? kmCompat.text[context] : compat.text[context];
    const stars = compat.stars[context];
    const starDisplay = "★".repeat(stars) + "☆".repeat(5 - stars);

    const animalADisplay = lang === "km" ? KM_ANIMAL_NAMES[za.animal] : za.animal;
    const animalBDisplay = lang === "km" ? KM_ANIMAL_NAMES[zb.animal] : zb.animal;
    const elementADisplay = lang === "km" ? KM_ELEMENT_NAMES[za.element] : za.element;
    const elementBDisplay = lang === "km" ? KM_ELEMENT_NAMES[zb.element] : zb.element;

    compatResult.innerHTML = `
      <div class="card compat-card">
        <div class="compat-pair">
          <div class="compat-person">
            <img class="result-badge" src="images/zodiac-badges/${za.animal.toLowerCase()}.webp" alt="" loading="lazy" width="64" height="64">
            <p>${elementADisplay} ${animalADisplay}</p>
          </div>
          <div class="compat-plus">+</div>
          <div class="compat-person">
            <img class="result-badge" src="images/zodiac-badges/${zb.animal.toLowerCase()}.webp" alt="" loading="lazy" width="64" height="64">
            <p>${elementBDisplay} ${animalBDisplay}</p>
          </div>
        </div>

        ${shareRowHtml(animalADisplay + " + " + animalBDisplay, { emoji: ZODIAC_EMOJI[za.animal] + " " + ZODIAC_EMOJI[zb.animal], heading: animalADisplay + " + " + animalBDisplay, subheading: compatLabel + " — " + contextLabel, badge: starDisplay })}

        <h3 class="compat-label">${compatLabel} — ${contextLabel}</h3>
        <div class="compat-stars">${starDisplay}</div>

        <p>${compatText}</p>
        <p class="disclaimer">${S.compat_disclaimer}</p>
      </div>
    `;
    wireShareRows(compatResult);
    compatResult.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

