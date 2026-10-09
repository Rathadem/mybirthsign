// compare-signs.js — "Compare Two Signs" on the Compatibility page.
// Pick two zodiac animals (no birthdays) and see the TRADITIONAL animal-level match.
// Everything shown comes from the site's existing rules and copy:
//   getCompatibilityType()  (zodiac-data.js)  same / triangle / neutral / clash
//   COMPAT_INFO / KM_COMPAT_INFO              labels, quick star ratings, love & business text
//   CMP_TEXT (compat-text.js)                 intro, love / friendship / business text, strengths,
//                                             challenges, focus tips, guidelines
//   ANIMAL_TIER mapping (same as compat-page.js): same/triangle -> high, neutral -> medium, clash -> low
// No percentages: exact scores need both birth dates (elements and Yin/Yang change them).
// A shareable address is kept in the URL: /compatibility?pair=rat-dragon#compare
(function () {
  "use strict";
  var ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var ANIMAL_TIER = { same: "high", triangle: "high", neutral: "medium", clash: "low" };
  var UI = {
    en: {
      h: "Compare Two Signs", p: "Don't know the birthdays? Pick two zodiac animals to see their traditional match.",
      a: "First sign", b: "Second sign", pick: "Choose an animal", go: "Compare Signs", err: "Please choose two zodiac animals.",
      quick: "Traditional quick rating", love: "Love", business: "Business",
      loveH: "Love & Relationships", friendH: "Friendship", bizH: "Business Partnership", teamH: "Teamwork & Money",
      strengthsH: "Strengths", challengesH: "Watch Out For", adviceH: "Practical Advice",
      support: "{A} and {B} are also listed as a supportive match in our zodiac guide.",
      exact: "This compares the animals only. For exact percentage scores, enter both birth dates above.",
      exactBtn: "Enter Birthdays for Exact Scores ↑",
      note: "Traditional Chinese zodiac reading for entertainment and self-reflection, not a prediction.",
      stars: function (n) { return n + " of 5 stars"; }
    },
    km: {
      h: "ប្រៀបធៀបរាសីពីរ", p: "មិនដឹងថ្ងៃកំណើត? ជ្រើសរើសសត្វរាសីពីរ ដើម្បីមើលភាពត្រូវគ្នាតាមប្រពៃណី។",
      a: "រាសីទីមួយ", b: "រាសីទីពីរ", pick: "ជ្រើសរើសសត្វ", go: "ប្រៀបធៀប", err: "សូមជ្រើសរើសសត្វរាសីពីរ។",
      quick: "ការវាយតម្លៃរហ័សតាមប្រពៃណី", love: "ស្នេហា", business: "អាជីវកម្ម",
      loveH: "ស្នេហា និងទំនាក់ទំនង", friendH: "មិត្តភាព", bizH: "ដៃគូអាជីវកម្ម", teamH: "ការងារជាក្រុម និងលុយកាក់",
      strengthsH: "ចំណុចខ្លាំង", challengesH: "គួរប្រុងប្រយ័ត្ន", adviceH: "ដំបូន្មានជាក់ស្តែង",
      support: "{A} និង {B} ក៏ត្រូវបានរាយបញ្ជីជាគូដែលគាំទ្រគ្នា នៅក្នុងមគ្គុទ្ទេសក៍រាសីរបស់យើងផងដែរ។",
      exact: "នេះប្រៀបធៀបតែសត្វរាសីប៉ុណ្ណោះ។ ដើម្បីទទួលបានពិន្ទុជាភាគរយពិតប្រាកដ សូមបញ្ចូលថ្ងៃកំណើតទាំងពីរខាងលើ។",
      exactBtn: "បញ្ចូលថ្ងៃកំណើតសម្រាប់ពិន្ទុពិតប្រាកដ ↑",
      note: "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួន មិនមែនជាការព្យាករណ៍ទេ។",
      stars: function (n) { return n + " ក្នុងចំណោម ៥ ផ្កាយ"; }
    }
  };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fill(s, map) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return map[k] !== undefined ? map[k] : m; }); }
  function lang() { try { return typeof getLang === "function" && getLang() === "km" ? "km" : "en"; } catch (e) { return "en"; } }

  /** Pure: the full traditional comparison for two animals (also used by tests and sharing). */
  function compareSigns(a, b, L) {
    if (ANIMALS.indexOf(a) < 0 || ANIMALS.indexOf(b) < 0) return null;
    L = L === "km" ? "km" : "en";
    var T = (typeof CMP_TEXT !== "undefined" && (CMP_TEXT[L] || CMP_TEXT.en)) || null;
    if (!T || typeof getCompatibilityType !== "function" || typeof COMPAT_INFO === "undefined") return null;
    var type = getCompatibilityType(a, b), tier = ANIMAL_TIER[type];
    var CI = (L === "km" && typeof KM_COMPAT_INFO !== "undefined" ? KM_COMPAT_INFO : COMPAT_INFO)[type];
    var nm = function (x) { return L === "km" && typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[x] : x; };
    var names = { A: nm(a), B: nm(b) };
    var info = typeof ANIMAL_INFO !== "undefined" ? ANIMAL_INFO : {};
    var supportive = type !== "triangle" && type !== "same" && type !== "clash" &&
      ((info[a] && info[a].compatible.indexOf(b) > -1) || (info[b] && info[b].compatible.indexOf(a) > -1));
    var focus = function (list, idx) { return idx.map(function (i) { return list[i]; }).filter(Boolean); };
    return {
      a: a, b: b, type: type, tier: tier, lang: L, names: names,
      label: CI.label,
      stars: COMPAT_INFO[type].stars,
      intro: fill(T.intro[type], names),
      supportive: supportive,
      love: fill(T.love[tier], names),
      friendship: fill(T.friend[tier], names),
      business: fill(T.biz[tier], names),
      teamwork: CI.text.business,
      teamTips: focus(T.bizFocus, [1, 4]),              // Teamwork, Risk tolerance (money)
      strengths: T.strengths[type].slice(0, 3),
      challenges: T.challenges[type].slice(0, 3),
      advice: T.guide.slice(0, 3)
    };
  }
  window.MBSCompareSigns = compareSigns;

  function medal(a, L) {
    var n = L === "km" && typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[a] : a;
    return '<figure class="cs-sign"><img src="images/business/animals/' + a.toLowerCase() + '.webp" alt="" width="110" height="110" loading="lazy"><figcaption>' + esc(n) + "</figcaption></figure>";
  }
  function starRow(label, n, u) {
    return '<span class="cs-stars"><b>' + esc(label) + '</b> <span aria-label="' + esc(u.stars(n)) + '">' + "★★★★★".slice(0, n) + '<i aria-hidden="true">' + "★★★★★".slice(n) + "</i></span></span>";
  }
  function list(items) { return "<ul>" + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }

  function render(r) {
    var u = UI[r.lang];
    var tips = r.teamTips.map(function (t) { return "<li><strong>" + esc(t[0]) + "</strong> " + esc(t[1]) + "</li>"; }).join("");
    return '<article class="cs-result cs-type-' + r.type + '" data-share-kind="compare" data-pair="' + r.a.toLowerCase() + "-" + r.b.toLowerCase() + '">' +
      '<div class="cs-head">' + medal(r.a, r.lang) + '<div class="cs-mid"><span class="cs-badge">' + esc(r.label) + "</span>" +
      '<p class="cs-quick">' + esc(u.quick) + "</p>" + starRow(u.love, r.stars.romantic, u) + starRow(u.business, r.stars.business, u) + "</div>" + medal(r.b, r.lang) + "</div>" +
      '<p class="cs-intro">' + esc(r.intro) + (r.supportive ? " " + esc(fill(u.support, r.names)) : "") + "</p>" +
      '<div class="cs-grid">' +
      '<section class="cmp-panel"><h3 class="cmp-h3">' + esc(u.loveH) + "</h3><p>" + esc(r.love) + "</p></section>" +
      '<section class="cmp-panel"><h3 class="cmp-h3">' + esc(u.friendH) + "</h3><p>" + esc(r.friendship) + "</p></section>" +
      '<section class="cmp-panel"><h3 class="cmp-h3">' + esc(u.bizH) + "</h3><p>" + esc(r.business) + "</p></section>" +
      '<section class="cmp-panel"><h3 class="cmp-h3">' + esc(u.teamH) + "</h3><p>" + esc(r.teamwork) + '</p><ul class="cs-tips">' + tips + "</ul></section>" +
      "</div>" +
      '<div class="cs-grid cs-grid-3">' +
      '<section class="cmp-panel"><h3 class="cmp-h3">' + esc(u.strengthsH) + "</h3>" + list(r.strengths) + "</section>" +
      '<section class="cmp-panel"><h3 class="cmp-h3">' + esc(u.challengesH) + "</h3>" + list(r.challenges) + "</section>" +
      '<section class="cmp-panel"><h3 class="cmp-h3">' + esc(u.adviceH) + "</h3>" + list(r.advice) + "</section>" +
      "</div>" +
      '<p class="cs-exact">' + esc(u.exact) + ' <a href="#cmp-form" class="cs-exact-btn">' + esc(u.exactBtn) + "</a></p>" +
      '<p class="cs-note">' + esc(u.note) + "</p>" +
      '<div class="cs-share">' + (typeof shareRowHtml === "function" ? shareRowHtml(r.names.A + " + " + r.names.B + " — " + r.label,
        { cardType: "pair", lang: r.lang, a: r.a, b: r.b, nameA: r.names.A, nameB: r.names.B, type: r.type, label: r.label, starsLove: r.stars.romantic, starsBiz: r.stars.business,
          intro: r.intro, love: r.love, friendship: r.friendship, business: r.business },
        "/compatibility?pair=" + r.a.toLowerCase() + "-" + r.b.toLowerCase() + "#compare") : "") + "</div>" +
      "</article>";
  }

  function init() {
    var root = document.getElementById("compare");
    if (!root) return;
    var L = lang(), u = UI[L];
    var nm = function (x) { return L === "km" && typeof KM_ANIMAL_NAMES !== "undefined" ? KM_ANIMAL_NAMES[x] : x; };
    root.querySelectorAll("[data-cs]").forEach(function (el) { var k = el.getAttribute("data-cs"); if (u[k]) el.textContent = u[k]; });
    ["cs-a", "cs-b"].forEach(function (id) {
      var sel = document.getElementById(id); if (!sel) return;
      var keep = sel.value;
      sel.innerHTML = '<option value="">' + esc(u.pick) + "</option>" + ANIMALS.map(function (a) { return '<option value="' + a + '">' + esc(nm(a)) + "</option>"; }).join("");
      sel.value = keep;
    });
    var form = document.getElementById("cs-form"), out = document.getElementById("cs-result"), err = document.getElementById("cs-error");
    function show(a, b, push) {
      var r = compareSigns(a, b, L);
      if (!r) { err.textContent = u.err; err.hidden = false; return; }
      err.hidden = true;
      out.innerHTML = render(r);
      if (typeof wireShareRows === "function") { try { wireShareRows(out); } catch (e) { /* sharing is optional */ } }
      if (push && window.history && history.replaceState) {
        var q = new URLSearchParams(location.search); q.set("pair", a.toLowerCase() + "-" + b.toLowerCase());
        history.replaceState(null, "", location.pathname + "?" + q.toString() + "#compare");
      }
      document.dispatchEvent(new CustomEvent("mbs:compare", { detail: r }));
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      show(document.getElementById("cs-a").value, document.getElementById("cs-b").value, true);
      out.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    out.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".cs-exact-btn");
      if (!btn) return;
      e.preventDefault();
      var f = document.getElementById("cmp-form");
      if (f) { f.scrollIntoView({ behavior: "smooth", block: "center" }); var i = f.querySelector("input:not([type=hidden]), .dp-input"); if (i) setTimeout(function () { i.focus({ preventScroll: true }); }, 400); }
    });
    // shared link: /compatibility?pair=rat-dragon
    var m = /^([a-z]+)-([a-z]+)$/.exec(new URLSearchParams(location.search).get("pair") || "");
    if (m) {
      var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
      var a = cap(m[1]), b = cap(m[2]);
      if (ANIMALS.indexOf(a) > -1 && ANIMALS.indexOf(b) > -1) {
        document.getElementById("cs-a").value = a; document.getElementById("cs-b").value = b;
        show(a, b, false);
        setTimeout(function () { root.scrollIntoView({ block: "start" }); }, 300);
      }
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
