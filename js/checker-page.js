// Reusable zodiac animal component for the checker page.
function zodiacAnimalHtml(animal) {
  const slug = animal.toLowerCase();
  const S = UI_STRINGS[getLang()];
  const name = getLang() === "km" && typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[animal] : animal;
  return '<li><a class="chk-animal-link" data-animal="' + animal + '" aria-expanded="false" href="animals.html#animal-' + slug + '">' +
    '<img src="images/business/animals/s144/' + slug + '.webp" alt="" width="72" height="72" loading="lazy">' +
    "<span>" + name + "</span></a></li>";
}
(function () {
  const ul = document.getElementById("chk-animals");
  if (!ul) return;
  function render() { ul.innerHTML = ZODIAC_ANIMALS.map(zodiacAnimalHtml).join(""); }
  render();
  document.querySelectorAll("[data-lang-switch]").forEach(function (a) { a.addEventListener("click", function () { setTimeout(render, 0); }); });
})();

// Click an animal to see its birth years and best-match years (no page navigation).
(function () {
  const ul = document.getElementById("chk-animals");
  const panel = document.getElementById("chk-animal-detail");
  if (!ul || !panel) return;
  const inRange = (y) => y >= 1950 && y <= 2031;
  const yearsOf = (a) => nearbyYearsForAnimal(a, 1990, 12).filter(inRange);
  const nm = (a) => (getLang() === "km" && typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[a] : a);
  const med = (a, n) => '<img src="images/business/animals/' + (n <= 72 ? "s144/" : "") + a.toLowerCase() + '.webp" alt="" width="' + n + '" height="' + n + '" loading="lazy">';
  let current = null;

  function row(a) {
    return '<li class="chk-d-row">' + med(a, 44) + "<div><strong>" + nm(a) + "</strong><span>" + yearsOf(a).join(", ") + "</span></div></li>";
  }
  function show(animal) {
    const S = UI_STRINGS[getLang()];
    const km = getLang() === "km";
    const info = ANIMAL_INFO[animal];
    const X = typeof CHECKER_EXTRA !== "undefined" ? CHECKER_EXTRA[animal] : null;
    const partners = getTrianglePartners(animal);
    const clash = info.clash[0];
    const blurb = km && typeof KM_ANIMAL_INFO !== "undefined" ? KM_ANIMAL_INFO[animal].traits : info.traits;
    current = animal;
    panel.innerHTML =
      '<div class="chk-d-head">' + med(animal, 84) +
        '<div><h3>' + nm(animal) + (X ? ' <span class="chk-d-kanji" lang="zh">' + X.kanji + "</span>" : "") + "</h3>" +
        '<p class="chk-d-years"><strong>' + S.chk_animal_years + ":</strong> " + yearsOf(animal).join(", ") + "</p>" +
        "<p>" + blurb + "</p></div>" +
        '<button type="button" class="chk-d-close" aria-label="' + S.chk_close + '">×</button></div>' +
      '<div class="chk-d-grid">' +
        '<section><h4>' + S.best_match_years_heading + '</h4><ul>' + partners.map(row).join("") + "</ul></section>" +
        '<section><h4>' + S.chk_same_sign + '</h4><ul><li class="chk-d-row">' + med(animal, 44) + "<div><strong>" + nm(animal) + "</strong><span>" + yearsOf(animal).join(", ") + "</span></div></li></ul>" +
        '<h4>' + S.needs_patience + '</h4><ul>' + row(clash) + "</ul></section>" +
      "</div>" +
      '<a class="chk-d-guide" href="animals.html#animal-' + animal.toLowerCase() + '">' + S.chk_full_guide + "</a>";
    panel.hidden = false;
    ul.querySelectorAll(".chk-animal-link").forEach(function (l) {
      l.setAttribute("aria-expanded", l.dataset.animal === animal ? "true" : "false");
      l.classList.toggle("is-active", l.dataset.animal === animal);
    });
    panel.querySelector(".chk-d-close").addEventListener("click", hide);
  }
  function hide() {
    panel.hidden = true; panel.innerHTML = ""; current = null;
    ul.querySelectorAll(".chk-animal-link").forEach(function (l) { l.setAttribute("aria-expanded", "false"); l.classList.remove("is-active"); });
  }
  ul.addEventListener("click", function (e) {
    const a = e.target.closest(".chk-animal-link");
    if (!a) return;
    e.preventDefault();
    if (current === a.dataset.animal) { hide(); return; }
    show(a.dataset.animal);
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();
