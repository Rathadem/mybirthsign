document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("wedding-form");
  const resultBox = document.getElementById("wedding-result");
  if (!form) return;

  const RATING_KEY = {
    excellent: "rating_excellent",
    good: "rating_good",
    workable: "rating_workable",
    avoid: "rating_avoid"
  };
  const NOTE_KEY = {
    excellent: "wedding_note_excellent",
    good: "wedding_note_good",
    workable: "wedding_note_workable",
    avoid: "wedding_note_avoid"
  };

  // Standard meteorological seasons, by month index (0 = January).
  const SEASON_BY_REGION = {
    northern: ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "fall", "fall", "fall", "winter"],
    southern: ["summer", "summer", "fall", "fall", "fall", "winter", "winter", "winter", "spring", "spring", "spring", "summer"],
    tropical: ["tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical", "tropical"]
  };
  const SEASON_LABEL_KEY = {
    spring: "season_spring", summer: "season_summer", fall: "season_fall",
    winter: "season_winter", tropical: "season_tropical"
  };
  const SEASON_NOTE_KEY = {
    spring: "season_note_mild", fall: "season_note_mild",
    summer: "season_note_hot", winter: "season_note_cold",
    tropical: "season_note_tropical"
  };
  // "Mild" seasons are the traditionally favored wedding-season months.
  const MILD_SEASONS = ["spring", "fall"];

  // All Saturdays in a given month (practical day-of-week suggestion;
  // this tool doesn't claim precise lunar day-animal accuracy).
  function saturdaysInMonth(year, monthIndex) {
    const dates = [];
    const d = new Date(year, monthIndex, 1);
    while (d.getMonth() === monthIndex) {
      if (d.getDay() === 6) dates.push(d.getDate());
      d.setDate(d.getDate() + 1);
    }
    return dates;
  }

  function holidaysInMonth(year, monthIndex, lang) {
    const names = [];
    if (monthIndex === 0) names.push(lang === "km" ? "ទិវាចូលឆ្នាំសាកល" : "New Year's Day");
    if (monthIndex === 1) names.push(lang === "km" ? "ទិវាស្នេហា" : "Valentine's Day");
    if (monthIndex === 3) names.push(lang === "km" ? "បុណ្យចូលឆ្នាំខ្មែរ" : "Khmer New Year");
    if (monthIndex === 11) names.push(lang === "km" ? "បុណ្យណូអែល" : "Christmas");
    const cny = CNY_DATES[year];
    if (cny) {
      const cnyMonth = parseInt(cny.split("-")[0], 10);
      if (cnyMonth - 1 === monthIndex) names.push(lang === "km" ? "បុណ្យចូលឆ្នាំចិន" : "Lunar New Year");
    }
    return names;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const valueA = document.getElementById("dob-a").value;
    const valueB = document.getElementById("dob-b").value;
    const year = parseInt(document.getElementById("wedding-year").value, 10);
    const regionSelect = document.getElementById("wedding-region");
    const region = regionSelect ? regionSelect.value : "tropical";
    if (!valueA || !valueB || !year) return;

    const lang = getLang();
    const S = UI_STRINGS[lang];
    const dateLocale = lang === "km" ? "km-KH" : "en-US";

    const dateA = new Date(valueA + "T00:00:00");
    const dateB = new Date(valueB + "T00:00:00");
    const za = getZodiac(dateA);
    const zb = getZodiac(dateB);

    const animalADisplay = lang === "km" ? KM_ANIMAL_NAMES[za.animal] : za.animal;
    const animalBDisplay = lang === "km" ? KM_ANIMAL_NAMES[zb.animal] : zb.animal;

    const seasons = SEASON_BY_REGION[region] || SEASON_BY_REGION.tropical;

    const rows = MONTH_ANIMALS.map(function (monthAnimal, i) {
      const rating = rateWeddingMonth(monthAnimal, za.animal, zb.animal);
      let monthName;
      try {
        monthName = new Date(year, i, 1).toLocaleDateString(dateLocale, { month: "long" });
      } catch (err) {
        monthName = new Date(year, i, 1).toLocaleDateString("en-US", { month: "long" });
      }
      const monthAnimalDisplay = lang === "km" ? KM_ANIMAL_NAMES[monthAnimal] : monthAnimal;
      const season = seasons[i];
      const holidays = holidaysInMonth(year, i, lang);
      return { monthIndex: i, monthName, monthAnimal, monthAnimalDisplay, rating, season, holidays };
    });

    const rowsHtml = rows
      .map(function (r) {
        const holidayText = r.holidays.length ? r.holidays.join(", ") : S.no_holidays;
        return `
          <tr class="wedding-row wedding-row-${r.rating}">
            <td>${r.monthName}</td>
            <td>${ZODIAC_EMOJI[r.monthAnimal] || ""} ${r.monthAnimalDisplay}</td>
            <td><span class="wedding-badge wedding-badge-${r.rating}">${S[RATING_KEY[r.rating]]}</span></td>
            <td>${S[NOTE_KEY[r.rating]]}</td>
            <td>${S[SEASON_LABEL_KEY[r.season]]}<br><span class="wedding-season-note">${S[SEASON_NOTE_KEY[r.season]]}</span></td>
            <td>${holidayText}</td>
          </tr>
        `;
      })
      .join("");

    // Top picks: best zodiac rating, and (outside the tropics) a mild season too.
    const bestRatingRank = { excellent: 0, good: 1, workable: 2, avoid: 3 };
    const topPicks = rows
      .filter(function (r) {
        const ratingOk = r.rating === "excellent" || r.rating === "good";
        const seasonOk = region === "tropical" || MILD_SEASONS.includes(r.season);
        return ratingOk && seasonOk;
      })
      .sort(function (a, b) { return bestRatingRank[a.rating] - bestRatingRank[b.rating]; });

    const topPicksHtml = topPicks.length
      ? `<ul class="wedding-top-picks-list">${topPicks
          .map(function (r) {
            const sats = saturdaysInMonth(year, r.monthIndex);
            const satDates = sats.map(function (day) { return `${r.monthName} ${day}, ${year}`; });
            return `<li><strong>${r.monthName}</strong> — ${S[RATING_KEY[r.rating]]}, ${S[SEASON_LABEL_KEY[r.season]]}${r.holidays.length ? " · " + r.holidays.join(", ") : ""}<br><span class="wedding-season-note">${S.wedding_suggested_dates_label}: ${satDates.join(" · ")}</span></li>`;
          })
          .join("")}</ul>`
      : `<p class="wedding-top-picks-empty">${S.wedding_top_picks_none}</p>`;

    const headingText = fmt(S.wedding_results_heading, { year: year });

    resultBox.innerHTML = `
      <div class="card compat-card">
        <div class="compat-pair">
          <div class="compat-person">
            <img class="result-badge" src="images/zodiac-badges/${za.animal.toLowerCase()}.webp" alt="" loading="lazy" width="64" height="64">
            <p>${animalADisplay}</p>
          </div>
          <div class="compat-plus">+</div>
          <div class="compat-person">
            <img class="result-badge" src="images/zodiac-badges/${zb.animal.toLowerCase()}.webp" alt="" loading="lazy" width="64" height="64">
            <p>${animalBDisplay}</p>
          </div>
        </div>

        ${shareRowHtml(headingText, { emoji: "💍", heading: headingText, subheading: animalADisplay + " & " + animalBDisplay })}

        <div class="wedding-top-picks">
          <h3>${S.wedding_top_picks_heading}</h3>
          ${topPicksHtml}
          <p class="wedding-top-picks-note">${S.wedding_top_picks_note}</p>
        </div>

        <h3 class="compat-label">${headingText}</h3>
        <div class="wedding-table-wrap">
          <table class="wedding-table">
            <thead>
              <tr>
                <th>${S.wedding_month_col}</th>
                <th>${S.wedding_animal_col}</th>
                <th>${S.wedding_rating_col}</th>
                <th>${S.wedding_note_col}</th>
                <th>${S.wedding_season_col}</th>
                <th>${S.wedding_holiday_col}</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
        <p class="disclaimer">${S.wedding_disclaimer}</p>
      </div>
    `;
    wireShareRows(resultBox);
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
