// Daily zodiac data — rules + validation (no AI in this file).
//
// The RULES decide every fact in a daily record: the day animal, each sign's rating,
// the top lucky signs, the careful signs, lucky number / color / direction / time and the
// highlight pairs. They come from the site's own data (js/zodiac-data.js, js/i18n.js) and
// the same day rule as the daily blog posts (proven equal by tests/daily-golden.mjs).
// Claude only writes the wording around these facts (scripts/daily-data.mjs), and
// validateRecord() refuses any record whose facts or wording break the rules below.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

function extractConst(src, name) {
  const start = src.indexOf(`const ${name} =`);
  if (start < 0) throw new Error(`const ${name} not found`);
  let i = src.indexOf("=", start) + 1;
  while (/\s/.test(src[i])) i++;
  const open = src[i], close = open === "{" ? "}" : "]";
  let depth = 0, str = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (str) { if (c === "\\") j++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === "`") { str = c; continue; }
    if (c === open) depth++;
    else if (c === close && --depth === 0) return vm.runInNewContext("(" + src.slice(i, j + 1) + ")");
  }
  throw new Error(`unterminated const ${name}`);
}

const zdata = read("js/zodiac-data.js"), i18n = read("js/i18n.js");
export const INFO = extractConst(zdata, "ANIMAL_INFO");
export const TRIANGLES = extractConst(zdata, "ZODIAC_TRIANGLES");
export const KM_NAMES = extractConst(i18n, "KM_ANIMAL_NAMES");
export const KM_INFO = extractConst(i18n, "KM_ANIMAL_INFO");
export const COLOR_HEX = extractConst(zdata, "LUCKY_COLOR_HEX");

export const ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
export const TIERS = ["great", "good", "ordinary", "caution"];
export const TIER_LABEL = {
  en: { great: "Great Day", good: "Good Day", ordinary: "Ordinary Day", caution: "Take It Easy" },
  km: { great: "ថ្ងៃល្អខ្លាំង", good: "ថ្ងៃល្អ", ordinary: "ថ្ងៃធម្មតា", caution: "ថ្ងៃគួរប្រុងប្រយ័ត្ន" },
};

// Traditional direction and two-hour period ("double hour") of each earthly-branch animal.
// Directions are the usual 8-point simplification of the 12 branches.
export const DIRECTION = {
  Rat: ["North", "ខាងជើង"], Ox: ["Northeast", "ឦសាន"], Tiger: ["Northeast", "ឦសាន"], Rabbit: ["East", "ខាងកើត"],
  Dragon: ["Southeast", "អាគ្នេយ៍"], Snake: ["Southeast", "អាគ្នេយ៍"], Horse: ["South", "ខាងត្បូង"], Goat: ["Southwest", "និរតី"],
  Monkey: ["Southwest", "និរតី"], Rooster: ["West", "ខាងលិច"], Dog: ["Northwest", "ពាយព្យ"], Pig: ["Northwest", "ពាយព្យ"],
};
export const HOURS = {
  Rat: "23:00–01:00", Ox: "01:00–03:00", Tiger: "03:00–05:00", Rabbit: "05:00–07:00", Dragon: "07:00–09:00", Snake: "09:00–11:00",
  Horse: "11:00–13:00", Goat: "13:00–15:00", Monkey: "15:00–17:00", Rooster: "17:00–19:00", Dog: "19:00–21:00", Pig: "21:00–23:00",
};

const sameTriangle = (a, b) => TRIANGLES.some((t) => t.includes(a) && t.includes(b));
const partnersOf = (a) => TRIANGLES.find((t) => t.includes(a)).filter((x) => x !== a);
const clashOf = (a) => ORDER[(ORDER.indexOf(a) + 6) % 12];
// the "supportive" match listed in the site data that is not a triangle partner (traditional six-harmony friend)
const supportOf = (a) => (INFO[a].compatible || []).find((b) => !sameTriangle(a, b)) || partnersOf(a)[0];

export function dayNumberOf(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}
export function dayAnimalOf(iso) {
  return ORDER[(dayNumberOf(iso) + 2440588 + 1) % 12];   // same rule as scripts/daily-fortune.mjs
}
export function tierOf(a, day) {
  if (a === day) return "great";
  if (sameTriangle(a, day)) return "good";
  if (clashOf(a) === day) return "caution";
  return "ordinary";
}

/** Every fact of the day, decided by rules only. */
export function computeFacts(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new Error("bad date " + iso);
  const day = dayAnimalOf(iso), dn = dayNumberOf(iso);
  const signs = ORDER.map((a, idx) => {
    const info = INFO[a], km = KM_INFO[a];
    const nums = info.luckyNumbers, cols = info.luckyColors;
    const n = nums[(dn + idx) % nums.length];
    const ci = (dn + idx) % cols.length;
    const helper = partnersOf(a)[dn % 2];                    // today's harmony animal for this sign
    const tier = tierOf(a, day);
    return {
      animal: a, nameKm: KM_NAMES[a], tier,
      label: { en: TIER_LABEL.en[tier], km: TIER_LABEL.km[tier] },
      lucky: {
        number: n,
        color: { en: cols[ci], km: km.luckyColors[ci], hex: COLOR_HEX[cols[ci]] || null },
        direction: { en: DIRECTION[helper][0], km: DIRECTION[helper][1] },
        time: HOURS[helper],
        helperAnimal: helper,
      },
    };
  });
  const top = [day, ...partnersOf(day)];
  const careful = ORDER.filter((a) => tierOf(a, day) === "caution");
  const loveP = partnersOf(day), bizP = [day, supportOf(day)];
  return {
    date: iso, dayAnimal: day, dayAnimalKm: KM_NAMES[day],
    signs,
    highlights: { topLucky: top, careful, lovePair: loveP, businessPair: bizP },
  };
}

// ------------------------------------------------------------------ validation
export const TEXT_FIELDS = ["fortune", "love", "career", "money", "compat", "careful", "advice"];
const LIMITS = { fortune: [12, 70], love: [6, 45], career: [6, 45], money: [6, 45], compat: [6, 45], careful: [6, 45], advice: [6, 40] };
const KM_CHARS = { fortune: [40, 450], other: [20, 320] };
const BANNED_EN = /\bguarantee[ds]?\b|\bwill definitely\b|\bcertainly will\b|\b100 ?%|\bnever fails?\b|\bdestined to\b|\bcure[sd]?\b|\bdiagnos|\bmedical\b|\binvest (all|everything)\b|\blottery\b|\bgambl|\bcasino\b|\bget rich\b|\bscientific(ally)? (proven|fact)\b|\bdeath\b|\bdie\b|\bdisaster\b|\bcurse[ds]?\b/i;
const BANNED_KM = /ធានា|ប្រាកដជានឹង|១០០%|ឆ្នោត|ល្បែង|កាស៊ីណូ|ស្លាប់|គ្រោះមហន្តរាយ|ព្យាបាល/;
const DIGITS = /[0-9០-៩]/;
const KHMER = /[ក-៿]/g;
const words = (s) => String(s).trim().split(/\s+/).filter(Boolean);
function jaccard(a, b) {
  const A = new Set(words(a.toLowerCase())), B = new Set(words(b.toLowerCase()));
  let inter = 0; A.forEach((w) => { if (B.has(w)) inter++; });
  return inter / Math.max(1, A.size + B.size - inter);
}
function checkText(errs, where, lang, field, s) {
  if (typeof s !== "string" || !s.trim()) { errs.push(`${where}: empty ${lang}.${field}`); return; }
  if (/[<>{}]|https?:/.test(s)) errs.push(`${where}: markup or link in ${lang}.${field}`);
  if (DIGITS.test(s)) errs.push(`${where}: digits in ${lang}.${field} (numbers come from the rules only)`);
  if (lang === "en") {
    const n = words(s).length, [lo, hi] = LIMITS[field] || [6, 60];
    if (n < lo || n > hi) errs.push(`${where}: en.${field} has ${n} words (allowed ${lo}-${hi})`);
    if ((s.match(KHMER) || []).length) errs.push(`${where}: Khmer letters in en.${field}`);
    if (BANNED_EN.test(s)) errs.push(`${where}: banned wording in en.${field}: "${s.match(BANNED_EN)[0]}"`);
  } else {
    const len = [...s].length, [lo, hi] = field === "fortune" ? KM_CHARS.fortune : KM_CHARS.other;
    if (len < lo || len > hi) errs.push(`${where}: km.${field} has ${len} characters (allowed ${lo}-${hi})`);
    const kh = (s.match(KHMER) || []).length, letters = (s.match(/[A-Za-z]/g) || []).length;
    if (kh < len * 0.5 || letters > 12) errs.push(`${where}: km.${field} is not mainly Khmer`);
    if (BANNED_KM.test(s)) errs.push(`${where}: banned wording in km.${field}: "${s.match(BANNED_KM)[0]}"`);
  }
}

/** Returns a list of problems; an empty list means the record may be published. */
export function validateRecord(rec) {
  const errs = [];
  if (!rec || typeof rec !== "object") return ["record is not an object"];
  let facts;
  try { facts = computeFacts(rec.date); } catch (e) { return ["bad or missing date"]; }
  if (rec.version !== 1) errs.push("version must be 1");
  if (rec.dayAnimal !== facts.dayAnimal) errs.push(`dayAnimal ${rec.dayAnimal} != rule ${facts.dayAnimal}`);
  if (!Array.isArray(rec.signs) || rec.signs.length !== 12) return errs.concat("signs must have 12 entries");
  rec.signs.forEach((s, i) => {
    const f = facts.signs[i], where = `sign ${i + 1} (${s && s.animal})`;
    if (!s || s.animal !== f.animal) { errs.push(`${where}: expected ${f.animal}`); return; }
    if (s.tier !== f.tier) errs.push(`${where}: tier ${s.tier} != rule ${f.tier}`);
    if (JSON.stringify(s.lucky) !== JSON.stringify(f.lucky)) errs.push(`${where}: lucky items differ from the rules`);
    if (JSON.stringify(s.label) !== JSON.stringify(f.label)) errs.push(`${where}: label differs from the rules`);
    for (const lang of ["en", "km"]) {
      const t = s.text && s.text[lang];
      if (!t) { errs.push(`${where}: missing ${lang} text`); continue; }
      for (const k of TEXT_FIELDS) checkText(errs, where, lang, k, t[k]);
      const extra = Object.keys(t).filter((k) => !TEXT_FIELDS.includes(k));
      if (extra.length) errs.push(`${where}: unexpected ${lang} fields ${extra.join(",")}`);
    }
  });
  const H = rec.highlights || {}, FH = facts.highlights;
  for (const k of ["topLucky", "careful", "lovePair", "businessPair"]) if (JSON.stringify(H[k]) !== JSON.stringify(FH[k])) errs.push(`highlights.${k} differs from the rules`);
  for (const k of ["theme", "love", "business", "summary"]) for (const lang of ["en", "km"]) {
    const s = H[k] && H[k][lang];
    if (k === "summary") {
      if (typeof s !== "string" || !s.trim()) errs.push(`highlights.summary.${lang} empty`);
      else {
        if (lang === "en" && (words(s).length < 15 || words(s).length > 90)) errs.push(`highlights.summary.en length ${words(s).length} words`);
        if (lang === "en" && BANNED_EN.test(s)) errs.push(`highlights.summary.en banned wording`);
        if (lang === "km" && (!(s.match(KHMER) || []).length || BANNED_KM.test(s))) errs.push(`highlights.summary.km not valid Khmer`);
        if (DIGITS.test(s)) errs.push(`highlights.summary.${lang} contains digits`);
      }
    } else checkText(errs, "highlights", lang, k === "theme" ? "advice" : "compat", s);
  }
  // repetition: no copy-paste between signs, no near-identical fortunes
  for (const lang of ["en", "km"]) for (const k of TEXT_FIELDS) {
    const seen = new Map();
    rec.signs.forEach((s) => { const v = s.text && s.text[lang] && s.text[lang][k]; if (!v) return; const key = v.trim().toLowerCase(); if (seen.has(key)) errs.push(`repeated ${lang}.${k} for ${seen.get(key)} and ${s.animal}`); else seen.set(key, s.animal); });
  }
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) {
    const a = rec.signs[i].text && rec.signs[i].text.en, b = rec.signs[j].text && rec.signs[j].text.en;
    if (a && b && jaccard(a.fortune, b.fortune) > 0.6) errs.push(`en fortunes of ${rec.signs[i].animal} and ${rec.signs[j].animal} are nearly the same`);
  }
  if (!rec.disclaimer || !rec.disclaimer.en || !rec.disclaimer.km) errs.push("missing disclaimer");
  return errs;
}

export const DISCLAIMER = {
  en: "Traditional Chinese zodiac reading for entertainment and self-reflection only — not a scientific prediction.",
  km: "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រទេ។",
};
