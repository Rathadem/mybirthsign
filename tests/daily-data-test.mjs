// Tests for the daily data rules + validator:  node tests/daily-data-test.mjs <valid-record.json>
// 1) the rules match every current-format daily blog post, 2) a valid record passes,
// 3) each kind of broken record is rejected.
import fs from "node:fs";
import { computeFacts, validateRecord, ORDER } from "../scripts/daily-data-lib.mjs";
let pass = 0, fail = 0;
const ok = (name, cond, extra = "") => { if (cond) pass++; else { fail++; console.log("FAIL", name, extra); } };

// 1) parity with the published daily posts (same day rule, same ratings)
for (const f of fs.readdirSync("blog").filter((f) => /^daily-fortune-\d{4}-\d{2}-\d{2}\.html$/.test(f))) {
  const html = fs.readFileSync("blog/" + f, "utf8"), tiers = {};
  for (const m of html.matchAll(/fx-sign fx-sign-(\w+)">[\s\S]*?<h3>([^<]+)<\/h3>/g)) if (!tiers[m[2]]) tiers[m[2]] = m[1];
  if (Object.keys(tiers).length < 12) continue;                       // older post format
  const facts = computeFacts(f.slice(14, 24));
  ok("ratings match " + f, facts.signs.every((s) => tiers[s.animal] === s.tier));
}
// rules are sane for a whole year
for (let d = 0; d < 366; d++) {
  const iso = new Date(Date.UTC(2026, 0, 1 + d)).toISOString().slice(0, 10), f = computeFacts(iso);
  const n = (t) => f.signs.filter((s) => s.tier === t).length;
  if (!(n("great") === 1 && n("good") === 2 && n("caution") === 1 && f.highlights.topLucky.length === 3 && f.signs.every((s) => s.lucky.color.hex && s.lucky.direction.km && s.lucky.time))) { ok("rules sane " + iso, false); break; }
}
ok("rules sane for 366 days", true);

// 2) + 3)
const good = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
ok("valid record passes", validateRecord(good).length === 0, validateRecord(good).slice(0, 3).join(" | "));
const clone = () => JSON.parse(JSON.stringify(good));
const cases = {
  "wrong tier": (r) => { r.signs[0].tier = r.signs[0].tier === "great" ? "caution" : "great"; },
  "changed lucky number": (r) => { r.signs[3].lucky.number = 99; },
  "changed lucky color": (r) => { r.signs[3].lucky.color.en = "purple"; },
  "wrong day animal": (r) => { r.dayAnimal = r.dayAnimal === "Rat" ? "Ox" : "Rat"; },
  "missing sign": (r) => { r.signs.pop(); },
  "signs in wrong order": (r) => { [r.signs[0], r.signs[1]] = [r.signs[1], r.signs[0]]; },
  "digit in text": (r) => { r.signs[2].text.en.love += " Call 3 friends."; },
  "Khmer digit in Khmer text": (r) => { r.signs[2].text.km.love += " ៣"; },
  "guarantee wording": (r) => { r.signs[5].text.en.money = "This plan is guaranteed to make you rich today, so trust it fully and act now."; },
  "Khmer guarantee wording": (r) => { r.signs[5].text.km.money = "ថ្ងៃនេះធានាថាអ្នកនឹងមានលុយច្រើន សូមជឿជាក់ទាំងស្រុង ហើយធ្វើភ្លាមៗ។"; },
  "English inside Khmer": (r) => { r.signs[6].text.km.advice = "Take a short walk and drink some water today, then plan tomorrow calmly."; },
  "empty field": (r) => { r.signs[7].text.en.career = ""; },
  "too long": (r) => { r.signs[8].text.en.advice = "word ".repeat(80).trim() + "."; },
  "copy-paste between signs": (r) => { r.signs[9].text.en.career = r.signs[10].text.en.career; },
  "HTML in text": (r) => { r.signs[1].text.en.love = "Be kind <script>alert(1)</script> to people around you today, and listen well."; },
  "link in text": (r) => { r.signs[1].text.en.love = "Visit https://example.com for a special lucky charm that helps your love life today."; },
  "missing highlight": (r) => { delete r.highlights.summary; },
  "changed top lucky signs": (r) => { r.highlights.topLucky = ORDER.slice(0, 3); },
  "missing disclaimer": (r) => { delete r.disclaimer; },
  "extra field": (r) => { r.signs[0].text.en.lottery = "x"; },
  "medical claim": (r) => { r.signs[4].text.en.careful = "This herbal tea will cure your headache and fix any medical problem you have today."; },
};
for (const [name, fn] of Object.entries(cases)) { const r = clone(); fn(r); const e = validateRecord(r); ok("rejects: " + name, e.length > 0); }
console.log(`daily-data tests: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
