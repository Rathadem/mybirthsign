/* Lucky numbers of 1 to 5 digits, per zodiac sign, per day (Cambodia date).
 *
 * Same answer for everyone with that sign on that day, on every page and in the daily blog post.
 *   - 1 digit: the sign's lucky number of the day — exactly the "Number" already shown in the daily data
 *     (traditional lucky numbers from js/zodiac-data.js, picked by the same day rule as scripts/daily-data-lib.mjs).
 *   - 2–5 digits: start with one of the sign's traditional lucky numbers; the other digits come from a fixed
 *     pseudo-random sequence seeded by sign + date (no Math.random, so it never changes on reload).
 * For fun only: these are not predictions and not betting advice (the pages say so next to the numbers).
 *
 * Browser: fills every [data-lucky-digits][data-animal] (optional data-date="YYYY-MM-DD", default today in
 * Cambodia; optional data-lang). window.MBSLuckyDigits = { forSign, fill }.  Node: module.exports = { forSign }.
 */
(function (root) {
  "use strict";
  var ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  // traditional lucky numbers — must match ANIMAL_INFO[...].luckyNumbers in js/zodiac-data.js (tests/lucky-digits-test.mjs checks)
  var LUCKY = { Rat: [2, 3], Ox: [1, 4], Tiger: [1, 3, 4], Rabbit: [3, 4, 6], Dragon: [1, 6, 7], Snake: [2, 8, 9], Horse: [2, 3, 7], Goat: [2, 7], Monkey: [4, 9], Rooster: [5, 7, 8], Dog: [3, 4, 9], Pig: [2, 5, 8] };

  function dayNumber(iso) { var p = iso.split("-").map(Number); return Math.floor(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000); }
  function seedOf(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {                               // mulberry32
    return function () { seed = (seed + 0x6D2B79F5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  /** { d1, d2, d3, d4, d5 } as strings for this sign on this date (YYYY-MM-DD, Cambodia) */
  function forSign(animal, iso) {
    var nums = LUCKY[animal], idx = ORDER.indexOf(animal);
    if (!nums || idx < 0 || !/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return null;
    var dn = dayNumber(iso), r = rng(seedOf(animal + "|" + iso));
    var out = { d1: String(nums[(dn + idx) % nums.length]) };
    for (var len = 2; len <= 5; len++) {
      var s = String(nums[Math.floor(r() * nums.length)]);
      while (s.length < len) s += r() < 0.5 ? String(nums[Math.floor(r() * nums.length)]) : String(Math.floor(r() * 10));
      out["d" + len] = s;
    }
    return out;
  }

  if (typeof module === "object" && module.exports) { module.exports = { forSign: forSign, LUCKY: LUCKY }; return; }

  var KD = "0123456789";
  function kmNum(s) { return String(s).replace(/\d/g, function (d) { return KD[d]; }); }
  function ppToday() {
    try { return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
    catch (e) { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  }
  var T = {
    en: { h: "Lucky numbers today", d: function (n) { return n + (n === 1 ? " digit" : " digits"); }, note: "For fun only, not a prediction or betting advice." },
    km: { h: "លេខសំណាងថ្ងៃនេះ", d: function (n) { return kmNum(n) + " ខ្ទង់"; }, note: "សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការទស្សន៍ទាយ ឬការណែនាំឱ្យភ្នាល់ទេ។" }
  };
  function html(v, lang, opts) {
    var S = T[lang], km = lang === "km";
    var chips = [1, 2, 3, 4, 5].map(function (n) {
      return '<li><span class="ld-l">' + S.d(n) + '</span><b class="ld-n">' + (km ? kmNum(v["d" + n]) : v["d" + n]) + "</b></li>";
    }).join("");
    return (opts.noHead ? "" : '<p class="ld-h">' + S.h + "</p>") + '<ul class="ld-list">' + chips + "</ul>" + (opts.noNote ? "" : '<p class="ld-note">' + S.note + "</p>");
  }
  function fill(scope) {
    var els = (scope || document).querySelectorAll("[data-lucky-digits][data-animal]");
    Array.prototype.forEach.call(els, function (el) {
      var iso = el.getAttribute("data-date") || ppToday();
      var lang = el.getAttribute("data-lang") || (document.documentElement.lang === "km" ? "km" : "en");
      var v = forSign(el.getAttribute("data-animal"), iso);
      if (!v) { el.hidden = true; return; }
      el.innerHTML = html(v, lang, { noHead: el.hasAttribute("data-no-head"), noNote: el.hasAttribute("data-no-note") });
      el.setAttribute("data-lucky-day", iso);
    });
  }
  root.MBSLuckyDigits = { forSign: forSign, fill: fill, html: html };
  function boot() { fill(document); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  // the numbers follow the Cambodia date: refresh when the tab comes back on a new day
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) return;
    var today = ppToday();
    if ([].some.call(document.querySelectorAll("[data-lucky-digits]:not([data-date])"), function (el) { return el.getAttribute("data-lucky-day") !== today; })) fill(document);
  });
})(typeof window !== "undefined" ? window : this);
