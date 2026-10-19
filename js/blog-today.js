/* Blog page: keep the featured "Today's Chinese Zodiac Fortune" card on the current Cambodian day.
 * blog.html is rewritten once a day by a GitHub Action, which can start hours late. So, like the homepage
 * banner, the card checks in the browser whether today's post (Cambodia time) is already published and, if it
 * is, points the card at it with today's date and today's animal picture. If today's post is not up yet, the
 * card keeps the last published post and its tag says "Latest" instead of "Updated Today". */
(function () {
  var ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var EN_M = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var KM_M = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
  var EN_D = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var KM_D = ["ថ្ងៃអាទិត្យ", "ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"];
  var ZH_D = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  var TAGS = { en: ["Updated Today", "Latest"], km: ["ធ្វើបច្ចុប្បន្នភាពថ្ងៃនេះ", "ថ្មីបំផុត"], zh: ["今日更新", "最新"] };

  function today() {   // [y, m, d] in Cambodia
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-").map(Number);
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function longDate(p, lang) {
    var wd = new Date(Date.UTC(p[0], p[1] - 1, p[2])).getUTCDay();
    if (lang === "km") return KM_D[wd] + " ទី" + p[2] + " ខែ" + KM_M[p[1] - 1] + " ឆ្នាំ" + p[0];
    if (lang === "zh") return p[0] + "年" + p[1] + "月" + p[2] + "日 " + ZH_D[wd];
    return EN_D[wd] + ", " + EN_M[p[1] - 1] + " " + p[2] + ", " + p[0];
  }
  var cards = document.querySelectorAll("a.bv2-featured");
  if (!cards.length || !window.fetch) return;
  var p = today(), iso = p[0] + "-" + pad(p[1]) + "-" + pad(p[2]);
  var url = "blog/daily-fortune-" + iso + ".html";
  // already showing today's post: nothing to do
  if ((cards[0].getAttribute("href") || "").indexOf(iso) > -1) return;
  // day animal: same 12-day cycle as the posts (Julian Day Number + 1)
  var jdn = Math.floor(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000) + 2440588, day = ORDER[(jdn + 1) % 12];

  fetch(url, { method: "HEAD", cache: "no-cache" }).then(function (r) {
    cards.forEach(function (a) {
      var box = a.closest("[data-lang-content]"), lang = box ? box.getAttribute("data-lang-content") : (document.documentElement.lang || "en").slice(0, 2);
      if (!TAGS[lang]) lang = "en";
      var tag = a.querySelector(".bv2-tag-new");
      if (!r.ok) { if (tag) tag.textContent = TAGS[lang][1]; return; }
      a.setAttribute("href", url);
      var meta = a.querySelector(".bv2-featured-meta span");
      if (meta) meta.textContent = longDate(p, lang);
      if (tag) tag.textContent = TAGS[lang][0];
      var img = a.querySelector(".bv2-featured-art img");
      if (img) {
        img.setAttribute("src", "images/zodiac/" + day.toLowerCase() + ".webp");
        var alt = img.getAttribute("alt") || "";
        if (/^Illustration of the \w+,/.test(alt)) img.setAttribute("alt", alt.replace(/^Illustration of the \w+,/, "Illustration of the " + day + ","));
      }
    });
  }).catch(function () {});
})();
