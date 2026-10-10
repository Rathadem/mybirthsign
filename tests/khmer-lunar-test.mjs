// Khmer lunar date checks for js/vendor/momentkh.min.js (used by js/khmer-lunar.js on /checker).
//   node tests/khmer-lunar-test.mjs            reference dates only
//   node tests/khmer-lunar-test.mjs --cross    + every day 1900–2100 against the npm original and a 2nd library (needs /tmp/claude-0/kh)
// Reference dates are official Cambodian public holidays fixed by the Khmer lunar calendar (sources in docs/KHMER-LUNAR.md).
import fs from "node:fs";
import vm from "node:vm";
const ctx = { self: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(new URL("../js/vendor/momentkh.min.js", import.meta.url), "utf8"), ctx);
const M = ctx.self.momentkh;
let pass = 0, fail = 0;
const ok = (n, c, x = "") => { if (c) pass++; else { fail++; console.log("FAIL", n, x); } };
const K = (iso) => { const [y, m, d] = iso.split("-").map(Number); return M.fromGregorian(y, m, d).khmer; };
const is = (iso, day, phase, month, what) => { const k = K(iso); ok(`${iso} = ${day}${phase ? "រោច" : "កើត"} ${M.constants.LunarMonthNames[month]} (${what})`, k.day === day && k.moonPhase === phase && k.monthIndex === month, `got ${k.day}${k.moonPhaseName} ${k.monthName}`); };
const PISAKH = 5, PHATRABOT = 9, ASSOCH = 10, KADEUK = 11;

// Visak Bochea = 15 កើត ពិសាខ
for (const d of ["2016-05-20", "2017-05-10", "2018-04-29", "2019-05-18", "2020-05-06", "2021-04-26", "2022-05-15", "2023-05-04", "2024-05-22", "2025-05-11", "2026-05-01"]) is(d, 15, 0, PISAKH, "Visak Bochea");
// Royal Ploughing Ceremony = 4 រោច ពិសាខ (2026 sub-decree)
is("2026-05-05", 4, 1, PISAKH, "Royal Ploughing 2026");
// Pchum Ben holiday starts on 14 រោច ភទ្របទ
for (const d of ["2016-09-30", "2017-09-19", "2018-10-08", "2019-09-27", "2020-09-16", "2021-10-05", "2022-09-24", "2023-10-13", "2024-10-01", "2025-09-21", "2026-10-10"]) is(d, 14, 1, PHATRABOT, "Pchum Ben day 1");
is("2026-10-11", 15, 1, PHATRABOT, "Pchum Ben day 2 (2026)"); is("2026-10-12", 1, 0, ASSOCH, "Pchum Ben day 3 (2026)");
// Water Festival starts on 14 កើត កត្តិក
for (const d of ["2015-11-24", "2016-11-13", "2017-11-02", "2018-11-21", "2019-11-10", "2020-10-30", "2021-11-18", "2022-11-07", "2023-11-26", "2024-11-14", "2025-11-04", "2026-11-23"]) is(d, 14, 0, KADEUK, "Water Festival day 1");
is("2010-11-22", 1, 1, KADEUK, "Water Festival 2010 last day (Koh Pich, 22 Nov 2010)");
// Khmer New Year 2026: 14–16 April (sub-decree 167)
const ny = M.getNewYear(2026); ok("Khmer New Year 2026 starts 14 April", ny.month === 4 && ny.day === 14, JSON.stringify(ny));
// leap-month (អធិកមាស) years: the lunar year that holds Pchum Ben 2018 / 2023 / 2026 has បឋមាសាឍ + ទុតិយាសាឍ
for (const y of [2018, 2023, 2026]) {
  let leap = false; for (let m = 6; m <= 8; m++) for (let d = 1; d <= 31; d++) { try { const k = M.fromGregorian(y, m, d).khmer; if (k.monthIndex === 12 || k.monthIndex === 13) leap = true; } catch (e) { } }
  ok(`${y} has the leap month (អធិកមាស)`, leap);
}
// BE changes on Visak Bochea; animal year changes at New Year
// library convention: the new BE year starts on 1 រោច ពិសាខ (the day after Visak Bochea) — the change day itself is NOT independently verified
ok("BE 2569 → 2570 the day after Visak Bochea 2026 (library convention)", K("2026-05-01").beYear === 2569 && K("2026-05-02").beYear === 2570);
ok("animal year Snake → Horse over Khmer New Year 2026", K("2026-04-13").animalYear === 5 && K("2026-04-17").animalYear === 6);

if (process.argv.includes("--cross")) {
  const { createRequire } = await import("node:module"); const require = createRequire("/tmp/claude-0/kh/x.js");
  const orig = require("@thyrith/momentkh"); const { lunar } = await import("/tmp/claude-0/kh/node_modules/khmercal/index.js");
  const MAP = { "MĬKÔSĔR": 0, "BŎSS": 1, "MÉAKH": 2, "PHÂLKŬN": 3, "CHÉTR": 4, "VĬSAKH": 5, "CHÉSTH": 6, "ASATH": 7, "SRAPÔNÂ": 8, "PHÔTRÔBÂT": 9, "ÂSSŎCH": 10, "KÂTDĔK": 11, "BÂTHÂMSATH": 12, "TŬTĔYÉASATH": 13 };
  let days = 0, vsOrig = 0, vsOther = 0, otherBad = [];
  for (let t = Date.UTC(1900, 0, 1); t <= Date.UTC(2100, 11, 31); t += 86400000) {
    const d = new Date(t), y = d.getUTCFullYear(), m = d.getUTCMonth() + 1, dd = d.getUTCDate(); days++;
    const a = M.fromGregorian(y, m, dd).khmer, b = orig.fromGregorian(y, m, dd).khmer;
    if (JSON.stringify(a) !== JSON.stringify(b)) vsOrig++;
    const c = lunar(new Date(y, m - 1, dd));
    if (!(a.day === c.period[0] && a.moonPhase === (c.period[1] === "K" ? 0 : 1) && a.monthIndex === MAP[c.month.name] && a.beYear === c.years.BE)) { vsOther++; otherBad.push(`${y}-${m}-${dd}`); }
  }
  console.log(`cross-check ${days} days 1900–2100: differs from npm original ${vsOrig}; differs from khmercal ${vsOther}` + (vsOther ? ` (${otherBad[0]} … ${otherBad[otherBad.length - 1]})` : ""));
  ok("minified copy identical to the npm original on every day", vsOrig === 0);
}
console.log(`khmer lunar tests: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
