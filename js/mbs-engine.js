/* MyBirthSign calculation engine for the AI Friend (pure functions, no DOM).
 *
 * It does NOT contain its own zodiac rules. It reuses the website's own data and rules from
 * js/zodiac-data.js and js/business-data.js (getBaZi, getCompatibilityType, elementRelation,
 * rateWeddingMonth, MONTH_ANIMALS), and applies the SAME scoring formulas that the live
 * calculators use (compat-page.js = /compatibility, business-calculator.js, wedding.js).
 * tests/engine-golden.mjs proves both give identical numbers on the live pages.
 *
 * Load order (browser or server): zodiac-data.js, business-data.js, mbs-engine.js.
 */
var MBSEngine = (function () {
  "use strict";

  var TIER_BASE = { high: 86, medium: 64, low: 42 };
  var ANIMAL_TIER_MAP = { same: "high", triangle: "high", neutral: "medium", clash: "low" };

  function hashSeed(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }
  function jitterFor(seedStr, key) { return (hashSeed(seedStr + "|" + key) % 11) - 5; }
  function tierScore(tier) { return TIER_BASE[tier] !== undefined ? TIER_BASE[tier] : 64; }
  function clampScore(n) { return Math.max(15, Math.min(97, Math.round(n))); }

  /* Love & Compatibility = the live /compatibility page (js/compat-page.js): own base values 86/68/52. */
  var CMP_BASE = { high: 86, medium: 68, low: 52 };
  var LOVE_KEYS = ["love", "communication", "trust", "business", "friendship"];
  var LOVE_WEIGHTS = {
    love: { a: 0.5, e: 0.3, yy: 0.2 }, communication: { a: 0.4, e: 0.2, yy: 0.4 }, trust: { a: 0.5, e: 0.3, yy: 0.2 },
    business: { a: 0.5, e: 0.5 }, friendship: { a: 0.7, e: 0.3 }
  };
  var LOVE_OVERALL = { love: 0.25, communication: 0.2, trust: 0.2, business: 0.15, friendship: 0.2 };
  var LOVE_LEVELS = [
    { min: 85, name: "Highly Compatible" }, { min: 70, name: "Very Compatible" }, { min: 55, name: "Moderately Compatible" },
    { min: 40, name: "Growth-Oriented Match" }, { min: 0, name: "Challenging but Workable" }
  ];

  var BIZ_KEYS = ["entrepreneurship", "leadership", "finance", "growth", "decision", "communication", "trust", "conflict", "operations", "sales", "innovation", "risk"];
  var BIZ_WEIGHTS = {
    entrepreneurship: { a: 0.6, e: 0.4 }, leadership: { a: 0.5, e: 0.3, yy: 0.2 }, finance: { a: 0.3, e: 0.7 },
    growth: { a: 0.5, e: 0.5 }, decision: { a: 0.6, e: 0.3, yy: 0.1 }, communication: { a: 0.5, e: 0.2, yy: 0.3 },
    trust: { a: 0.7, e: 0.3 }, conflict: { a: 0.6, e: 0.4 }, operations: { a: 0.4, e: 0.6 }, sales: { a: 0.6, e: 0.4 },
    innovation: { a: 0.5, e: 0.5 }, risk: { a: 0.4, e: 0.6 }
  };

  var WED_BASE = { high: 86, medium: 68, low: 52 };
  var WED_LEVELS = ["Excellent Harmony", "Very Good Harmony", "Balanced Harmony", "Growth-Oriented Harmony"];
  var WED_RATING_NAME = { excellent: "Excellent", good: "Favorable", workable: "Neutral", avoid: "Take Care" };

  /* "YYYY-MM-DD" -> Date at local midnight (same as the calculators), or null if not a real calendar date in 1900..today. */
  function parseIso(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
    if (!m) return null;
    var y = +m[1], mo = +m[2], d = +m[3];
    var dt = new Date(iso + "T00:00:00");
    if (isNaN(dt.getTime()) || dt.getFullYear() !== y || dt.getMonth() + 1 !== mo || dt.getDate() !== d) return null;
    var end = new Date(); end.setHours(23, 59, 59, 999);
    if (y < 1900 || dt > end) return null;
    return dt;
  }

  function zodiac(iso) {
    var dt = parseIso(iso); if (!dt) return null;
    var b = getBaZi(dt);
    return {
      date: iso, animal: b.animal, element: b.element, yinYang: b.yinYang, zodiacYear: b.zodiacYear,
      birthYear: b.birthYear, lunarNewYear: b.cny ? b.cny : null, bornBeforeLunarNewYear: !!b.beforeCNY,
      stem: b.stem, branch: b.branch
    };
  }

  function pair(isoA, isoB) {
    var da = parseIso(isoA), db = parseIso(isoB); if (!da || !db) return null;
    var A = getBaZi(da), B = getBaZi(db);
    var rel = getCompatibilityType(A.animal, B.animal);
    var el = elementRelation(A.element, B.element, "en");
    return { A: A, B: B, rel: rel, el: el, yyDiff: A.yinYang !== B.yinYang, seed: isoA + "|" + isoB };
  }

  function weighted(keys, W, p, table) {
    var tv = table ? function (t) { return table[t]; } : tierScore;
    var aS = tv(ANIMAL_TIER_MAP[p.rel] || "medium"), eS = tv(p.el.tier), out = {};
    keys.forEach(function (k) {
      var w = W[k], base = aS * w.a + eS * w.e;
      if (w.yy) base += (p.yyDiff ? 8 : -4) * w.yy;
      out[k] = clampScore(base + jitterFor(p.seed, k));
    });
    return out;
  }

  function describe(p) {
    return {
      person1: { animal: p.A.animal, element: p.A.element, yinYang: p.A.yinYang, zodiacYear: p.A.zodiacYear },
      person2: { animal: p.B.animal, element: p.B.element, yinYang: p.B.yinYang, zodiacYear: p.B.zodiacYear },
      animalRelationship: p.rel,              // same | triangle | neutral | clash
      elementRelationship: p.el.relation,     // same | generates | controls | neutral
      yinYangDifferent: p.yyDiff
    };
  }

  function love(isoA, isoB) {
    var p = pair(isoA, isoB); if (!p) return null;
    var scores = weighted(LOVE_KEYS, LOVE_WEIGHTS, p, CMP_BASE), total = 0;
    Object.keys(LOVE_OVERALL).forEach(function (k) { total += scores[k] * LOVE_OVERALL[k]; });
    var overall = clampScore(total + jitterFor(p.seed, "overall") * 0.4);
    var level = LOVE_LEVELS.filter(function (l) { return overall >= l.min; })[0].name;
    var r = describe(p); r.scores = scores; r.overall = overall; r.level = level; return r;
  }

  function business(isoA, isoB) {
    var p = pair(isoA, isoB); if (!p) return null;
    var scores = weighted(BIZ_KEYS, BIZ_WEIGHTS, p), vals = BIZ_KEYS.map(function (k) { return scores[k]; });
    var overall = Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
    var sorted = BIZ_KEYS.slice().sort(function (a, b) { return scores[b] - scores[a]; });
    var r = describe(p); r.scores = scores; r.overall = overall;
    r.strongest = sorted.slice(0, 3); r.weakest = sorted.slice(-3).reverse(); return r;
  }

  function wedding(isoA, isoB, year) {
    var p = pair(isoA, isoB); if (!p) return null;
    year = +year; if (!(year >= 1900 && year <= 2100)) return null;
    var raw = WED_BASE[ANIMAL_TIER_MAP[p.rel] || "medium"] * 0.6 + WED_BASE[p.el.tier] * 0.4 + (p.yyDiff ? 4 : -2);
    var harmony = Math.max(15, Math.min(97, Math.round(raw)));
    var li = harmony >= 85 ? 0 : harmony >= 70 ? 1 : harmony >= 55 ? 2 : 3;
    var months = MONTH_ANIMALS.map(function (ma, i) {
      var rating = rateWeddingMonth(ma, p.A.animal, p.B.animal);
      return { month: i + 1, monthAnimal: ma, rating: rating, ratingName: WED_RATING_NAME[rating] };
    });
    var r = describe(p); r.year = year; r.harmony = harmony; r.harmonyLevel = WED_LEVELS[li]; r.months = months;
    r.bestMonths = months.filter(function (m) { return m.rating === "excellent" || m.rating === "good"; }).map(function (m) { return m.month; });
    r.takeCareMonths = months.filter(function (m) { return m.rating === "avoid"; }).map(function (m) { return m.month; });
    return r;
  }

  /* Daily Fortune: the same rule as scripts/daily-fortune.mjs (day animal from the Julian Day Number;
     great = same animal, good = same triangle, caution = direct opposite, otherwise ordinary). */
  var BRANCH_ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var TIER_INFO = {
    great: { label: "Great Day", goodFor: "Big decisions, bold moves, saying what's on your mind." },
    good: { label: "Good Day", goodFor: "Steady follow-through on something already in motion." },
    ordinary: { label: "Ordinary Day", goodFor: "Routine tasks, nothing special pulling for or against you today." },
    caution: { label: "Take It Easy", goodFor: "Low-key tasks only. Worth skipping anything high-stakes if you can." }
  };
  function dayAnimal(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || "")); if (!m) return null;
    var jdn = Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000) + 2440588;
    return BRANCH_ORDER[(jdn + 1) % 12];
  }
  function dailyLuck(isoToday, animal) {
    var da = dayAnimal(isoToday), idx = BRANCH_ORDER.indexOf(animal);
    if (!da || idx < 0) return null;
    var tier = animal === da ? "great" : sameTriangle(animal, da) ? "good"
      : Math.abs(idx - BRANCH_ORDER.indexOf(da)) === 6 ? "caution" : "ordinary";
    return { date: isoToday, dayAnimal: da, visitorAnimal: animal, tier: tier, label: TIER_INFO[tier].label, traditionallyGoodFor: TIER_INFO[tier].goodFor };
  }

  return { zodiac: zodiac, love: love, business: business, wedding: wedding, dailyLuck: dailyLuck, dayAnimal: dayAnimal, parseIso: parseIso };
})();
