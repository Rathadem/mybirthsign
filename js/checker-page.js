// Reusable zodiac animal component for the checker page.
function zodiacAnimalHtml(animal) {
  const slug = animal.toLowerCase();
  const S = UI_STRINGS[getLang()];
  const name = getLang() === "km" && typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[animal] : animal;
  return '<li><a class="chk-animal-link" href="animals.html#animal-' + slug + '">' +
    '<img src="images/business/animals/' + slug + '.webp" alt="" width="72" height="72" loading="lazy">' +
    "<span>" + name + "</span></a></li>";
}
(function () {
  const ul = document.getElementById("chk-animals");
  if (!ul) return;
  function render() { ul.innerHTML = ZODIAC_ANIMALS.map(zodiacAnimalHtml).join(""); }
  render();
  document.querySelectorAll("[data-lang-switch]").forEach(function (a) { a.addEventListener("click", function () { setTimeout(render, 0); }); });
})();
