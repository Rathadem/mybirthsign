/* Interactive lucky zodiac wheel for the checker page. Uses the site's existing
   traditional compatibility data; it does not invent or randomize lucky signs. */
(function () {
  function initLuckyWheel() {
    const mount = document.getElementById("lucky-zodiac-wheel");
    if (!mount || typeof ZODIAC_ANIMALS === "undefined" || typeof ANIMAL_INFO === "undefined") return;

    const copy = {
      en: {
        eyebrow: "A little zodiac magic", title: "Spin Your Lucky Zodiac Wheel",
        intro: "Choose your birth animal, spin the wheel, and discover your traditionally lucky matches and challenging sign.",
        label: "Your birth animal", spin: "Spin the lucky wheel ✨", spinning: "The wheel is spinning…",
        lucky: "Lucky animal years", avoid: "Year to be careful with",
        note: "Based on traditional Chinese zodiac compatibility. For cultural interest and entertainment, not a prediction.",
        years: "Birth years", choose: "Choose your animal"
      },
      km: {
        eyebrow: "អាថ៌កំបាំងហោរាសាស្ត្រ", title: "បង្វិលកង់ឆ្នាំនាំសំណាង",
        intro: "ជ្រើសរើសសត្វតំណាងឆ្នាំកំណើតរបស់អ្នក រួចចុចបង្វិលកង់ ដើម្បីស្វែងយល់ពីឆ្នាំសត្វដែលត្រូវគ្នា និងឆ្នាំដែលគួរប្រុងប្រយ័ត្ន តាមជំនឿប្រពៃណី។",
        label: "ជ្រើសរើសឆ្នាំកំណើតរបស់អ្នក", spin: "បង្វិលកង់នាំសំណាង ✨", spinning: "កង់កំពុងបង្វិល…",
        lucky: "ឆ្នាំសត្វដែលនាំសំណាង", avoid: "ឆ្នាំសត្វដែលគួរប្រុងប្រយ័ត្ន",
        note: "ផ្អែកលើជំនឿប្រពៃណីអំពីភាពសមស្របតាមឆ្នាំចិន សម្រាប់ការស្វែងយល់ពីវប្បធម៌ និងការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការទស្សន៍ទាយទេ។",
        years: "ឆ្នាំកំណើត", choose: "ជ្រើសរើសសត្វឆ្នាំ"
      },
      zh: {
        eyebrow: "生肖幸运小魔法", title: "转动你的生肖幸运轮",
        intro: "选择你的生肖，转动幸运轮，看看传统生肖配对中的相合生肖与需要留意的生肖。",
        label: "选择你的生肖", spin: "转动幸运轮 ✨", spinning: "幸运轮正在转动…",
        lucky: "相合生肖年份", avoid: "需要留意的生肖年份",
        note: "内容依据传统生肖配对，仅供文化了解与娱乐参考，并非预测。",
        years: "出生年份", choose: "选择生肖"
      }
    };
    const lang = (typeof getLang === "function" ? getLang() : document.documentElement.lang || "en").slice(0,2);
    const t = copy[lang] || copy.en;
    const animalName = a => typeof LOC !== "undefined" && LOC.animal ? LOC.animal(a) : a;
    const years = a => nearbyYearsForAnimal(a, 1990, 12).filter(y => y >= 1950 && y <= 2031);
    const options = ZODIAC_ANIMALS.map(a => '<option value="' + a + '">' + (ZODIAC_EMOJI[a] || "✦") + " " + animalName(a) + '</option>').join("");
    const wheelItems = ZODIAC_ANIMALS.map((a, i) => '<span class="lzw-wheel-animal" style="--i:' + i + '" aria-hidden="true">' + (ZODIAC_EMOJI[a] || "✦") + '</span>').join("");
    mount.innerHTML =
      '<div class="lzw-shell">' +
        '<p class="lzw-eyebrow">' + t.eyebrow + '</p>' +
        '<h2>' + t.title + '</h2>' +
        '<p class="lzw-intro">' + t.intro + '</p>' +
        '<div class="lzw-controls"><label for="lzw-animal">' + t.label + '</label>' +
          '<select id="lzw-animal"><option value="">' + t.choose + '</option>' + options + '</select>' +
          '<button type="button" id="lzw-spin" disabled>' + t.spin + '</button></div>' +
        '<div class="lzw-stage"><div class="lzw-orbit lzw-orbit-one"></div><div class="lzw-orbit lzw-orbit-two"></div>' +
          '<div class="lzw-wheel" id="lzw-wheel"><div class="lzw-wheel-core">✦</div>' + wheelItems + '</div>' +
          '<div class="lzw-pointer" aria-hidden="true">▼</div><div class="lzw-spark lzw-spark-a">✧</div><div class="lzw-spark lzw-spark-b">✦</div></div>' +
        '<p class="lzw-status" id="lzw-status" aria-live="polite"></p>' +
        '<div class="lzw-results" id="lzw-results" hidden></div>' +
        '<p class="lzw-note">' + t.note + '</p>' +
      '</div>';

    const select = mount.querySelector("#lzw-animal");
    const button = mount.querySelector("#lzw-spin");
    const wheel = mount.querySelector("#lzw-wheel");
    const status = mount.querySelector("#lzw-status");
    const results = mount.querySelector("#lzw-results");
    let busy = false;
    select.addEventListener("change", () => {
      button.disabled = !select.value || busy;
      results.hidden = true;
      status.textContent = "";
      wheel.classList.remove("is-spinning");
      wheel.style.transform = "rotate(0deg)";
    });
    button.addEventListener("click", () => {
      const animal = select.value;
      if (!animal || busy) return;
      busy = true;
      button.disabled = true;
      results.hidden = true;
      status.textContent = t.spinning;
      wheel.classList.remove("is-spinning");
      void wheel.offsetWidth;
      wheel.classList.add("is-spinning");
      const target = 1440 + Math.floor(Math.random() * 360);
      wheel.style.transform = "rotate(" + target + "deg)";
      window.setTimeout(() => {
        const matches = getTrianglePartners(animal);
        const clash = (ANIMAL_INFO[animal].clash || [])[0];
        const card = (a, bad) =>
          '<article class="lzw-result-card ' + (bad ? 'is-caution' : 'is-lucky') + '">' +
            '<div class="lzw-result-icon">' + (ZODIAC_EMOJI[a] || "✦") + '</div>' +
            '<div><h3>' + animalName(a) + '</h3><p>' + t.years + ': ' + years(a).join(" · ") + '</p></div></article>';
        results.innerHTML =
          '<section class="lzw-lucky"><h3>🍀 ' + t.lucky + '</h3><div class="lzw-result-grid">' + matches.map(a => card(a, false)).join("") + '</div></section>' +
          '<section class="lzw-caution"><h3>⚠️ ' + t.avoid + '</h3><div class="lzw-result-grid">' + card(clash, true) + '</div></section>';
        results.hidden = false;
        status.textContent = animalName(animal) + " ✨";
        busy = false;
        button.disabled = false;
      }, 3200);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initLuckyWheel);
  else initLuckyWheel();
})();