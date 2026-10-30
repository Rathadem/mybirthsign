// Lucky numbers (1–5 digits): node tests/lucky-digits-test.mjs
import { createRequire } from "node:module";
import { computeFacts, INFO, ORDER } from "../scripts/daily-data-lib.mjs";
const L = createRequire(import.meta.url)("../js/lucky-digits.js");
let pass = 0, fail = 0; const ok = (n, c, x = "") => { if (c) pass++; else { fail++; console.log("FAIL", n, x); } };
for (const a of ORDER) ok(`${a}: lucky numbers match js/zodiac-data.js`, JSON.stringify(L.LUCKY[a]) === JSON.stringify(INFO[a].luckyNumbers));
let d1Bad = 0, shapeBad = 0, startBad = 0, sameBad = 0;
for (let i = 0; i < 800; i++) {
  const iso = new Date(Date.UTC(2025, 0, 1 + i)).toISOString().slice(0, 10), f = computeFacts(iso);
  for (const s of f.signs) {
    const v = L.forSign(s.animal, iso);
    if (v.d1 !== String(s.lucky.number)) d1Bad++;                                   // 1 digit = the daily "Number"
    for (let n = 1; n <= 5; n++) { if (!new RegExp("^\\d{" + n + "}$").test(v["d" + n])) shapeBad++; if (!L.LUCKY[s.animal].includes(+v["d" + n][0])) startBad++; }
    if (JSON.stringify(v) !== JSON.stringify(L.forSign(s.animal, iso))) sameBad++;   // never changes on reload
  }
}
ok("1-digit number = the daily lucky number (800 days × 12 signs)", d1Bad === 0, d1Bad);
ok("each number has exactly 1/2/3/4/5 digits", shapeBad === 0, shapeBad);
ok("each number starts with one of the sign's lucky numbers", startBad === 0, startBad);
ok("same sign + date always gives the same numbers", sameBad === 0, sameBad);
ok("numbers change from day to day", JSON.stringify(L.forSign("Rat", "2026-10-11")) !== JSON.stringify(L.forSign("Rat", "2026-10-12")));
ok("bad input gives null", L.forSign("Cat", "2026-10-11") === null && L.forSign("Rat", "x") === null);
// the homepage's 3-digit "Today's Number": 3 digits, the same all day, and its digits add up to the date's one-digit number
// (month + day + year digits added up, the rule js/app.js uses for "today's luck")
const root = (t) => { let n = String(t); while (n.length > 1) n = String([...n].reduce((x, c) => x + +c, 0)); return +n; };
let t3Bad = 0, t3Same = 0, t3Repeat = 0, prev = null;
for (let i = 0; i < 800; i++) {
  const iso = new Date(Date.UTC(2025, 0, 1 + i)).toISOString().slice(0, 10), [y, m, d] = iso.split("-").map(Number), t = L.todayNumber3(iso);
  if (!/^[1-9]\d\d$/.test(t) || root(t) !== root(String(m) + String(d) + String(y))) t3Bad++;
  if (t !== L.todayNumber3(iso)) t3Same++;
  if (t === prev) t3Repeat++; prev = t;
}
ok("today's 3-digit number: 3 digits, adds up to the date's number (800 days)", t3Bad === 0, t3Bad);
ok("today's 3-digit number never changes on reload", t3Same === 0, t3Same);
ok("today's 3-digit number differs from yesterday's (almost always)", t3Repeat < 20, t3Repeat);
ok("bad date gives null", L.todayNumber3("x") === null);
console.log(`lucky digits tests: ${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
