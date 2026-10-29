/* Khmer calendar events for one date: holidays, Buddhist days, holy days (Thngai Sil) and the Khmer lunar date.
   The same rules as the Khmer Calendar page (js/khmer-calendar.js); tests/khmer-events-test.mjs checks that both give
   the same "Coming up" list. Used by the Telegram daily post (netlify/functions/telegram-daily.mjs).
   Needs momentkh (js/vendor/momentkh.min.js), passed in as KM. Dates are "YYYY-MM-DD" (Cambodia days).
   Fixed-date national days are listed on their usual dates; the official public-holiday list is set each year by
   sub-decree (only 2026 is checked on the page), so callers should not call them official holidays. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.MBSKhmerEvents = factory();
})(typeof self !== "undefined" ? self : this, function () {
  var DAY = 864e5;
  var EV = {
    newyear: { i: "🎉", k: "holiday", en: "Khmer New Year", km: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ", blog: "khmer-new-year-animal-year" },
    meak: { i: "🪷", k: "buddhist", en: "Meak Bochea", km: "ពិធីបុណ្យមាឃបូជា", blog: "cambodian-buddhist-holy-days" },
    visak: { i: "🪷", k: "buddhist", en: "Visak Bochea", km: "ពិធីបុណ្យវិសាខបូជា", blog: "cambodian-buddhist-holy-days" },
    ploughing: { i: "🌾", k: "holiday", en: "Royal Ploughing Ceremony", km: "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល" },
    asalha: { i: "🪷", k: "buddhist", en: "Asalha Puja", km: "ពិធីបុណ្យអាសាឡ្ហបូជា", blog: "cambodian-buddhist-holy-days" },
    cholvassa: { i: "🕯️", k: "buddhist", en: "Chol Vassa (Lent begins)", km: "ចូលព្រះវស្សា", blog: "chol-vassa-buddhist-lent" },
    kanben: { i: "🍚", k: "minor", en: "Kan Ben", km: "កាន់បិណ្ឌ" },
    pchumben: { i: "🏯", k: "holiday", en: "Pchum Ben", km: "ពិធីបុណ្យភ្ជុំបិណ្ឌ" },
    chenhvassa: { i: "🕯️", k: "buddhist", en: "Chenh Vassa (Lent ends)", km: "ចេញព្រះវស្សា", blog: "kathen-robe-offering-season" },
    water: { i: "🚣", k: "holiday", en: "Water Festival", km: "ព្រះរាជពិធីបុណ្យអុំទូក", blog: "cambodia-water-festival-bon-om-touk" },
    newyearday: { i: "🎆", k: "national", en: "International New Year's Day", km: "ទិវាចូលឆ្នាំសកល" },
    queenmother: { i: "👑", k: "national", en: "Queen Mother's Birthday", km: "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចព្រះមហាក្សត្រី" },
    peace: { i: "🕊️", k: "national", en: "Peace Day", km: "ទិវាសន្តិភាព", blog: "cambodia-peace-day-december-29" },
    victory: { i: "🕊️", k: "national", en: "Victory over Genocide Day", km: "ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍" },
    women: { i: "💐", k: "national", en: "International Women's Day", km: "ទិវានារីអន្តរជាតិ" },
    labour: { i: "🛠️", k: "national", en: "International Labour Day", km: "ទិវាពលកម្មអន្តរជាតិ" },
    kingbday: { i: "👑", k: "national", en: "King's Birthday", km: "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ" },
    constitution: { i: "📜", k: "national", en: "Constitution Day", km: "ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ" },
    kingfather: { i: "🕯️", k: "national", en: "King Father Commemoration Day", km: "ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ" },
    coronation: { i: "👑", k: "national", en: "Coronation Day", km: "ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិ", blog: "coronation-day-king-norodom-sihamoni" },
    independence: { i: "🇰🇭", k: "national", en: "Independence Day", km: "ពិធីបុណ្យឯករាជ្យជាតិ", blog: "cambodia-independence-day" },
  };
  var ORDER = { holiday: 0, national: 1, buddhist: 2, minor: 3 };
  var FIXED = [[1, 1, "newyearday", 0], [1, 7, "victory", 1980], [3, 8, "women", 0], [5, 1, "labour", 0], [5, 14, "kingbday", 2005], [6, 18, "queenmother", 2005], [9, 24, "constitution", 1993], [10, 15, "kingfather", 2013], [10, 29, "coronation", 2005], [11, 9, "independence", 1953], [12, 29, "peace", 2024]];
  var MEN = ["Migasir", "Boss", "Meak", "Phalkun", "Chet", "Pisak", "Jesth", "Asadh", "Srap", "Phatrabot", "Assoch", "Kadeuk", "1st Asadh", "2nd Asadh"];
  var AEN = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var SAK_EN = ["Samrithisak", "Ekasak", "Tosak", "Treisak", "Chattvasak", "Panchasak", "Chhasak", "Saptasak", "Atthasak", "Noppasak"];

  function make(KM) {
    var memo = {}, yearCache = {};
    var keyOf = function (t) { return new Date(t).toISOString().slice(0, 10); };
    var tOf = function (iso) { var p = iso.split("-").map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); };
    function kh(t) { if (!memo[t]) { var d = new Date(t); memo[t] = KM.fromGregorian(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()); } return memo[t]; }
    function isLastWaning(t) { var k = kh(t).khmer, n = kh(t + DAY).khmer; return k.moonPhase === 1 && n.moonPhase === 0; }
    function isSilT(t) { var k = kh(t).khmer; return (k.moonPhase === 0 && (k.day === 8 || k.day === 15)) || (k.moonPhase === 1 && k.day === 8) || isLastWaning(t); }
    function eventsOf(y) {
      if (yearCache[y]) return yearCache[y];
      var E = {}, add = function (t, id) { var k = keyOf(t); (E[k] = E[k] || []).push(id); };
      FIXED.forEach(function (f) { if (y >= f[3]) add(Date.UTC(y, f[0] - 1, f[1]), f[2]); });
      var ny = KM.getNewYear(y);
      if (ny) { var t0 = Date.UTC(y, ny.month - 1, ny.day), s0 = kh(t0).khmer.sak; for (var i = 0; i < 5; i++) { add(t0 + i * DAY, "newyear"); if (kh(t0 + i * DAY).khmer.sak !== s0) break; } }
      for (var t = Date.UTC(y, 0, 1); t < Date.UTC(y + 1, 0, 1); t += DAY) {
        var k = kh(t).khmer, wax = k.moonPhase === 0, m = k.monthIndex, d = k.day;
        if (wax && d === 15 && m === 2) add(t, "meak");
        if (wax && d === 15 && m === 5) add(t, "visak");
        if (!wax && d === 4 && m === 5) add(t, "ploughing");
        if (wax && d === 15 && (m === 7 || m === 13)) add(t, "asalha");
        if (!wax && d === 1 && (m === 7 || m === 13)) add(t, "cholvassa");
        if (!wax && m === 9) { if (isLastWaning(t)) { add(t - DAY, "pchumben"); add(t, "pchumben"); add(t + DAY, "pchumben"); } else if (!isLastWaning(t + DAY)) add(t, "kanben"); }
        if (wax && d === 15 && m === 10) add(t, "chenhvassa");
        if (m === 11 && ((wax && (d === 14 || d === 15)) || (!wax && d === 1))) add(t, "water");
      }
      Object.keys(E).forEach(function (k) { E[k] = E[k].filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return ORDER[EV[a].k] - ORDER[EV[b].k]; }); });
      return (yearCache[y] = E);
    }
    function eventsOnT(t) { return eventsOf(new Date(t).getUTCFullYear())[keyOf(t)] || []; }
    var west = function (s) { return String(s).replace(/[០-៩]/g, function (c) { return String(c.charCodeAt(0) - 0x17E0); }); };
    var ord = function (n) { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
    return {
      EV: EV,
      eventsOn: function (iso) { return eventsOnT(tOf(iso)); },
      isSil: function (iso) { return isSilT(tOf(iso)); },
      // the next holidays and Buddhist days from a date (each event once per year, "minor" ones left out), like the
      // page's "Coming up" list: [[iso, id], ...]
      upcoming: function (iso, n, maxDays) {
        var up = [], seen = {}, s = tOf(iso);
        for (var i = 0; i < (maxDays || 400) && up.length < n; i++, s += DAY) eventsOnT(s).forEach(function (e) {
          var key = e + new Date(s).getUTCFullYear();
          if (EV[e].k !== "minor" && !seen[key] && up.length < n) { seen[key] = 1; up.push([keyOf(s), e]); }
        });
        return up;
      },
      lunarKm: function (iso) { return west(KM.format(kh(tOf(iso)))); },
      lunarEn: function (iso) { var k = kh(tOf(iso)).khmer; return ord(k.day) + " " + (k.moonPhase ? "waning" : "waxing") + " day of " + MEN[k.monthIndex] + ", Year of the " + AEN[k.animalYear] + " (" + SAK_EN[k.sak] + "), B.E. " + k.beYear; },
    };
  }
  return { make: make, EV: EV };
});
