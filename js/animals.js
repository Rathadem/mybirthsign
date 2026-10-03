document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("animal-grid");
  if (!grid) return;

  const lang = getLang();
  const S = UI_STRINGS[lang];

  const cardsHtml = ZODIAC_ANIMALS.map(function (animal) {
    const info = ANIMAL_INFO[animal];
    const kmInfo = KM_ANIMAL_INFO[animal];
    const animalDisplay = lang === "km" ? KM_ANIMAL_NAMES[animal] : animal;
    const traits = lang === "km" ? kmInfo.traits : info.traits;
    const overview = lang === "km" ? kmInfo.overview : info.overview;
    const careers = lang === "km" ? kmInfo.careers : info.careers;
    const luckyColors = lang === "km" ? kmInfo.luckyColors : info.luckyColors;
    const luckyDays = lang === "km" ? kmInfo.luckyDays : info.luckyDays;
    const compatibleDisplay = getTrianglePartners(animal).map((a) => (lang === "km" ? KM_ANIMAL_NAMES[a] : a));

    return `
      <div class="animal-card" id="animal-${animal.toLowerCase()}">
        <div class="animal-card-head">
          <span class="result-emoji">${ZODIAC_EMOJI[animal]}</span>
          <h2>${animalDisplay}</h2>
        </div>
        <p class="animal-traits">${traits}</p>
        <div class="animal-meta">
          <div><h3>${S.lucky_numbers}</h3><p>${info.luckyNumbers.join(", ")}</p></div>
          <div><h3>${S.lucky_colors}</h3><p>${luckyColors.join(", ")}</p></div>
          <div><h3>${S.lucky_days}</h3><p>${luckyDays.join(", ")}</p></div>
          <div><h3>${S.best_matches}</h3><p>${compatibleDisplay.join(", ")}</p></div>
        </div>
        <details class="animal-details">
          <summary>${S.animals_read_more}</summary>
          <p class="overview-text">${overview}</p>
          <p><strong>${S.careers_heading}:</strong> ${careers}</p>
        </details>
        <a class="animal-cta" href="index.html">${S.animals_cta}</a>
      </div>
    `;
  }).join("");

  grid.innerHTML = cardsHtml;
});
