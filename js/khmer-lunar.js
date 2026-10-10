/* Khmer Lunar Birth Date — "Your Khmer Lunar Birth Date" card on /checker, under the zodiac results.
 *
 * Uses the birthday the visitor already entered (js/app.js sends it with the "mbs:checker-date" event; it is
 * never put in a link or sent anywhere). The Khmer date comes from the open-source momentkh library
 * (js/vendor/momentkh.min.js, MIT), which implements the traditional Khmer lunisolar calendar rules
 * (Chhankitek / Soryatra: 29- and 30-day months, the leap month អធិកមាស with បឋមាសាឍ / ទុតិយាសាឍ,
 * the leap day ចន្ទ្រាធិមាស, Khmer New Year from Moha Songkran). It is NOT the Chinese zodiac and not
 * an astronomical moon-phase guess. Checked against official Cambodian holiday dates (see docs/KHMER-LUNAR.md).
 * Dates outside 1900–2100 (the range we cross-checked) show a fallback message instead of a guess.
 */
(function () {
  "use strict";
  var LIB = "/js/vendor/momentkh.min.js", MIN = 1900, MAX = 2100;
  var libPromise = null;
  function loadLib() {
    if (window.momentkh) return Promise.resolve(window.momentkh);
    if (!libPromise) libPromise = new Promise(function (ok, fail) {
      var s = document.createElement("script"); s.src = LIB; s.async = true;
      s.onload = function () { window.momentkh ? ok(window.momentkh) : fail(new Error("no lib")); };
      s.onerror = function () { libPromise = null; fail(new Error("load failed")); };
      document.head.appendChild(s);
    });
    return libPromise;
  }

  var KD = "០១២៣៤៥៦៧៨៩";
  function kmNum(n) { return String(n).replace(/\d/g, function (d) { return KD[d]; }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var MONTH_EN = ["Migasir", "Boss", "Meak", "Phalkun", "Chet", "Pisak", "Jesth", "Asadh", "Srap", "Phatrabot", "Assoch", "Kadeuk", "Pathamasadh (1st Asadh)", "Tutiyasadh (2nd Asadh)"];
  var ANIMAL_EN = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var SAK_EN = ["Samrithisak", "Ekasak", "Tosak", "Treisak", "Chattvasak", "Panchasak", "Chhasak", "Saptasak", "Atthasak", "Noppasak"];
  var KM_SOLAR = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
  var KM_WEEK = ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"];
  function ord(n) { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }

  var T = {
    en: {
      title: "Your Khmer Lunar Birth Date", sub: "Your birthday on the traditional Khmer lunar calendar (ចន្ទគតិ).",
      greg: "Gregorian birthday", lunar: "Khmer lunar date", phase: "Moon phase", be: "Buddhist Era year", year: "Khmer calendar year",
      waxing: "Waxing moon", waning: "Waning moon",
      dayOf: function (d, ph, m) { return "the " + ord(d) + " day of the " + (ph ? "waning" : "waxing") + " moon, month of " + m; },
      yearTxt: function (a, s, js) { return "Year of the " + a + " · " + s + " · Chula Sakarat " + js; },
      full: "In Khmer",
      leap: "That year had a leap month (អធិកមាស): the month Asadh was repeated, as the Khmer calendar does every few years.",
      ny: "Born before Khmer New Year (mid-April), so the Khmer animal year is the one that began the previous April.",
      visak: function (a, b) { return "Born on Visak Bochea: the Buddhist Era year turns over around this day, so calendars may show " + a + " or " + b + " BE."; },
      nyDays: "Born on Moha Songkran, the first day of Khmer New Year: the new animal year begins at a set hour that day, so it depends on the time of birth.",
      differs: function (z) { return "The Khmer calendar changes animal year at Khmer New Year, not at Chinese New Year, so it can differ from your Chinese zodiac sign (" + z + ") shown above."; },
      today: "Today's Khmer lunar date (Cambodia) — for comparison, not your birthday:",
      method: "Calculated with the traditional Khmer lunisolar calendar rules (open-source momentkh library) and checked against official Cambodian holiday dates. For fun and culture; check a printed Khmer calendar for ceremonies.",
      fallback: "We can't show a reliable Khmer lunar date for this birthday. The calculation is only shown for birthdays from 1900 to 2100.",
      loadFail: "The Khmer lunar date couldn't load. Please try again."
    },
    km: {
      title: "ថ្ងៃខែកំណើតតាមចន្ទគតិខ្មែរ", sub: "ថ្ងៃកំណើតរបស់អ្នក តាមប្រតិទិនចន្ទគតិខ្មែរ។",
      greg: "ថ្ងៃកំណើត (សុរិយគតិ)", lunar: "ថ្ងៃខែតាមចន្ទគតិ", phase: "កើត ឬ រោច", be: "ពុទ្ធសករាជ", year: "ឆ្នាំ និងស័ក",
      waxing: "កើត (ខ្នើត)", waning: "រោច (រនោច)",
      full: "ពេញ",
      leap: "ឆ្នាំនោះមានអធិកមាស (ខែអាសាឍពីរដង៖ បឋមាសាឍ និងទុតិយាសាឍ)។",
      ny: "កើតមុនបុណ្យចូលឆ្នាំខ្មែរ (ខែមេសា) ដូច្នេះឆ្នាំសត្វខ្មែរ គឺជាឆ្នាំដែលចាប់ផ្តើមពីខែមេសាមុន។",
      visak: function (a, b) { return "កើតនៅថ្ងៃពិសាខបូជា៖ ពុទ្ធសករាជប្តូរនៅជុំវិញថ្ងៃនេះ ដូច្នេះប្រតិទិនអាចបង្ហាញ ព.ស. " + a + " ឬ " + b + "។"; },
      nyDays: "កើតនៅថ្ងៃមហាសង្ក្រាន្ត (ថ្ងៃទីមួយនៃបុណ្យចូលឆ្នាំខ្មែរ)៖ ឆ្នាំសត្វថ្មីចាប់ផ្តើមនៅម៉ោងកំណត់ក្នុងថ្ងៃនោះ ដូច្នេះអាស្រ័យលើម៉ោងកំណើត។",
      differs: function (z) { return "ឆ្នាំសត្វខ្មែរប្តូរនៅពេលចូលឆ្នាំខ្មែរ មិនមែននៅចូលឆ្នាំចិនទេ ដូច្នេះអាចខុសពីរាសីចិនរបស់អ្នក (" + z + ") ខាងលើ។"; },
      today: "ថ្ងៃនេះតាមចន្ទគតិ (កម្ពុជា) — សម្រាប់ប្រៀបធៀប មិនមែនថ្ងៃកំណើតរបស់អ្នកទេ៖",
      method: "គណនាតាមវិធានប្រតិទិនចន្ទគតិខ្មែរ (បណ្ណាល័យកូដចំហ momentkh) ហើយបានផ្ទៀងផ្ទាត់ជាមួយថ្ងៃបុណ្យផ្លូវការរបស់កម្ពុជា។ សម្រាប់ការកម្សាន្ត និងវប្បធម៌ — សូមពិនិត្យប្រតិទិនខ្មែរបោះពុម្ពសម្រាប់ពិធីផ្សេងៗ។",
      fallback: "មិនអាចបង្ហាញថ្ងៃខែចន្ទគតិដែលគួរឱ្យទុកចិត្តសម្រាប់ថ្ងៃកំណើតនេះបានទេ។ ការគណនាបង្ហាញតែថ្ងៃកំណើតពីឆ្នាំ ១៩០០ ដល់ ២១០០ ប៉ុណ្ណោះ។",
      loadFail: "មិនអាចបង្ហាញថ្ងៃខែចន្ទគតិបានទេ។ សូមព្យាយាមម្តងទៀត។"
    }
  };

  function ppToday() {
    try {
      return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-").map(Number);
    } catch (e) { var d = new Date(); return [d.getFullYear(), d.getMonth() + 1, d.getDate()]; }
  }
  function lunarText(k, lang) {                     // "៨រោច ខែភទ្របទ"
    return kmNum(k.day) + k.moonPhaseName + " ខែ" + k.monthName;
  }

  function row(label, main, extra) {
    return '<div class="kl-row"><dt>' + esc(label) + '</dt><dd><strong>' + main + "</strong>" + (extra ? '<span class="kl-extra">' + extra + "</span>" : "") + "</dd></div>";
  }

  function render(box, info, M) {
    var lang = info.lang === "km" ? "km" : "en", S = T[lang], p = info.iso.split("-").map(Number), y = p[0], m = p[1], d = p[2];
    var head = '<div class="kl-card"><div class="kl-head"><span class="kl-moon" aria-hidden="true"></span><div><h2>' + esc(S.title) + "</h2><p>" + esc(S.sub) + "</p></div></div>";
    if (!(y >= MIN && y <= MAX)) { box.innerHTML = head + '<p class="kl-fallback">' + esc(S.fallback) + "</p></div>"; box.hidden = false; return; }
    var r;
    try { r = M.fromGregorian(y, m, d); } catch (e) { r = null; }
    if (!r || !r.khmer || !r.khmer.monthName) { box.innerHTML = head + '<p class="kl-fallback">' + esc(S.fallback) + "</p></div>"; box.hidden = false; return; }
    var k = r.khmer, wd = new Date(y, m - 1, d).getDay();
    var gregTxt = lang === "km"
      ? "ថ្ងៃ" + KM_WEEK[wd] + " ទី" + kmNum(d) + " ខែ" + KM_SOLAR[m - 1] + " ឆ្នាំ" + kmNum(y)
      : new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(y, m - 1, d));
    var phaseTxt = k.moonPhase ? S.waning : S.waxing;
    var lunar = '<span lang="km">' + esc(lunarText(k)) + "</span>";
    var lunarExtra = lang === "en" ? esc(S.dayOf(k.day, k.moonPhase, MONTH_EN[k.monthIndex])) : "";
    var beTxt = lang === "km" ? "ព.ស. " + kmNum(k.beYear) : k.beYear + " BE";
    var beExtra = lang === "en" ? '<span lang="km">ព.ស. ' + kmNum(k.beYear) + "</span>" : "";
    var yearTxt = lang === "km"
      ? "ឆ្នាំ" + k.animalYearName + " " + k.sakName
      : esc(S.yearTxt(ANIMAL_EN[k.animalYear], SAK_EN[k.sak], k.jsYear));
    var yearExtra = lang === "km" ? "ចុល្លសករាជ " + kmNum(k.jsYear) : '<span lang="km">ឆ្នាំ' + esc(k.animalYearName) + " " + esc(k.sakName) + "</span>";
    if (lang === "km") yearTxt = '<span lang="km">' + esc(yearTxt) + "</span>";

    var notes = [];
    if (k.monthIndex === 12 || k.monthIndex === 13) notes.push(S.leap);
    // Visak Bochea (15 កើត ពិសាខ): calendars differ on whether the new BE year starts on this day or the next, so say both
    if (k.monthIndex === 5 && k.moonPhase === 0 && k.day === 15) notes.push(S.visak(lang === "km" ? kmNum(k.beYear) : k.beYear, lang === "km" ? kmNum(k.beYear + 1) : k.beYear + 1));
    var ny = null; try { ny = M.getNewYear(y); } catch (e) { /* no note */ }
    // Lerng Sak (3rd/4th day of New Year) is when the animal year has changed; before Moha Songkran it is the previous year
    if (ny) {
      var bd = Date.UTC(y, m - 1, d), nyd = Date.UTC(ny.year, ny.month - 1, ny.day);
      if (bd < nyd) notes.push(S.ny);
      // during the New Year days the animal year / ស័ក change at a set hour; without a birth time we say so instead of guessing
      else if (bd === nyd) notes.push(S.nyDays);
    }
    if (info.animal && ANIMAL_EN[k.animalYear] !== info.animal) notes.push(S.differs(lang === "km" && typeof KM_ANIMAL_NAMES !== "undefined" ? (KM_ANIMAL_NAMES[info.animal] || info.animal) : info.animal));

    var t = ppToday(), todayLine = "";
    try { todayLine = M.format(M.fromGregorian(t[0], t[1], t[2])); } catch (e) { todayLine = ""; }

    box.innerHTML = head +
      '<div class="kl-main"><p class="kl-main-label">' + esc(S.lunar) + '</p><p class="kl-main-date">' + lunar + "</p>" + (lunarExtra ? '<p class="kl-main-extra">' + lunarExtra + "</p>" : "") + "</div>" +
      '<dl class="kl-grid">' +
        row(S.greg, esc(gregTxt)) +
        row(S.phase, esc(phaseTxt), lang === "en" ? '<span lang="km">' + esc(k.moonPhaseName) + "</span>" : "") +
        row(S.be, esc(beTxt), beExtra) +
        row(S.year, yearTxt, yearExtra) +
      "</dl>" +
      '<p class="kl-full"><span>' + esc(S.full) + '</span> <span lang="km">' + esc(M.format(r)) + "</span></p>" +
      (notes.length ? '<ul class="kl-notes">' + notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>" : "") +
      (todayLine ? '<p class="kl-today">' + esc(S.today) + ' <span lang="km">' + esc(todayLine) + "</span></p>" : "") +
      '<p class="kl-method">' + esc(S.method) + "</p></div>";
    box.hidden = false;
  }

  function show(info) {
    var box = document.getElementById("khmer-lunar");
    if (!box || !info || !/^\d{4}-\d{2}-\d{2}$/.test(info.iso || "")) return;
    loadLib().then(function (M) { render(box, info, M); }, function () {
      var S = T[info.lang === "km" ? "km" : "en"];
      box.innerHTML = '<div class="kl-card"><p class="kl-fallback">' + esc(S.loadFail) + "</p></div>"; box.hidden = false;
    });
  }
  document.addEventListener("mbs:checker-date", function (e) { show(e.detail); });
  if (window.MBS_LAST_CHECKER_DATE) show(window.MBS_LAST_CHECKER_DATE);
  window.MBSKhmerLunar = { _show: show };
})();
