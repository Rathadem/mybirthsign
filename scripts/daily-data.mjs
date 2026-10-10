#!/usr/bin/env node
// Daily zodiac data: one small JSON record per date for the website and Kru Toch.
//
//   node scripts/daily-data.mjs                     today (Asia/Phnom_Penh), writes data/daily/<date>.json + latest.json
//   node scripts/daily-data.mjs --date 2026-10-10   a specific date
//   node scripts/daily-data.mjs --mock --out DIR    test run without AI (placeholder wording), never into data/daily
//   node scripts/daily-data.mjs --validate FILE     check an existing record
//
// Facts (ratings, lucky items, highlight pairs) come from scripts/daily-data-lib.mjs rules.
// Claude only writes the wording. A record is written ONLY if validateRecord() finds no problems;
// otherwise the script exits with code 2 and yesterday's data stays in place.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { ROOT, INFO, KM_INFO, KM_NAMES, ORDER, TEXT_FIELDS, DISCLAIMER, computeFacts, validateRecord } from "./daily-data-lib.mjs";

const args = process.argv.slice(2);
const argVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const TZ = process.env.FORTUNE_TZ || "Asia/Phnom_Penh";
const MODEL = process.env.DAILY_DATA_MODEL || "claude-sonnet-5-5";
const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

if (args.includes("--validate")) {
  const file = argVal("--validate");
  const errs = validateRecord(JSON.parse(fs.readFileSync(file, "utf8")));
  if (errs.length) { console.error("INVALID:\n- " + errs.join("\n- ")); process.exit(2); }
  console.log("valid:", file); process.exit(0);
}

const iso = argVal("--date") || process.env.FORTUNE_DATE || today();
const MOCK = args.includes("--mock");
const OUT = argVal("--out") || (MOCK ? null : path.join(ROOT, "data/daily"));
if (MOCK && !argVal("--out")) { console.error("--mock needs --out <dir> (mock wording is never published)"); process.exit(1); }
const facts = computeFacts(iso);

// ------------------------------------------------------------------ prompt
const REL = { great: "today IS its day (its own animal rules the day)", good: "in harmony with the day animal (same compatibility triangle)", ordinary: "neutral with the day animal", caution: "the traditional clash of the day animal" };
function signBrief(s) {
  const a = s.animal, i = INFO[a];
  return `- ${a} (Khmer name ${s.nameKm}): rating "${s.label.en}" — ${REL[s.tier]}. Traits: ${i.traits} Weak points: ${i.weaknesses} Careers: ${i.careers}. Today's harmony animal: ${s.lucky.helperAnimal}.`;
}
function systemPrompt(lang) {
  const L = lang === "km"
    ? `Write in natural, warm, modern KHMER (ភាសាខ្មែរ) as a native Cambodian writer would — simple everyday words, correct spelling, no English words, no transliterated English. Use Khmer animal names (e.g. ជូត ឆ្លូវ ខាល ថោះ រោង ម្សាញ់ មមី មមែ វក រកា ច កុរ).`
    : `Write in clear, warm, natural ENGLISH for a general audience (many readers are Cambodian).`;
  return `You write the daily Chinese zodiac reading for MyBirthSign (mybirthsign.com), a bilingual English/Khmer site.
${L}
STRICT RULES
- The facts are already decided: each sign's rating, the day animal, the lucky items. Never change them and never add other predictions of fact.
- NO digits at all (no numbers, times, dates, percentages). Lucky numbers, colors, directions and times are shown separately by the website.
- Traditional/cultural entertainment tone: "traditionally", "a good day to…", "consider…". Never promise outcomes. Never use: guaranteed, will definitely, 100%, destined, cure, diagnose, lottery, gambling, get rich, death, disaster, curse.
- No medical, legal or financial instructions. Money lines are about everyday habits (budgeting, careful spending, patience), never investments or amounts.
- Match the rating: "Great Day"/"Good Day" = encouraging; "Ordinary Day" = calm, steady; "Take It Easy" = gentle, reassuring, practical (never scary).
- Every sign must sound different: vary openings, verbs and images; no copy-paste between signs; no filler like "the stars align".
- Plain text only: no markdown, emoji, quotes around sentences, links or HTML.
OUTPUT: only one JSON object, nothing before or after it.`;
}
const LEN = (lang) => lang === "km"
  ? `Length (Khmer characters): fortune 120-300; love, career, money, compat, careful 60-220; advice 40-180.`
  : `Length (English words): fortune 25-55; love, career, money, compat, careful 12-35; advice 10-30.`;
function signsPrompt(lang, part) {
  return `Date: ${iso}. Day animal: ${facts.dayAnimal} (${facts.dayAnimalKm}).
Write today's reading for these signs:
${part.map(signBrief).join("\n")}

For EACH sign give:
fortune (overall day), love (relationships), career (work and business, with a focus on daily trade: selling, buying, customers, stock, deals), money (today's trading money: sales, prices, spending, saving), compat (which animal to team up with today and why, using the sign's harmony animal above), careful (one thing to watch, kind tone), advice (one practical action for today).
${LEN(lang)}
Return JSON: {"signs":{"<Animal in English>":{"fortune":"","love":"","career":"","money":"","compat":"","careful":"","advice":""}, ...}} with exactly these animals: ${part.map((s) => s.animal).join(", ")}.`;
}
function highlightsPrompt(lang) {
  const H = facts.highlights;
  return `Date: ${iso}. Day animal: ${facts.dayAnimal}. Top lucky signs today (by tradition): ${H.topLucky.join(", ")}. Sign to take it easy: ${H.careful.join(", ")}.
Love highlight pair: ${H.lovePair.join(" & ")} (both in harmony with today). Business highlight pair: ${H.businessPair.join(" & ")} (the day animal and its traditional supportive friend).
Write:
theme: the day's theme in one short sentence (${lang === "km" ? "40-180 Khmer characters" : "8-25 words"}), inspired by the ${facts.dayAnimal}'s traditional character.
love: one sentence about the love pair (${lang === "km" ? "60-220 characters" : "12-35 words"}).
business: one sentence about the business pair (${lang === "km" ? "60-220 characters" : "12-35 words"}).
summary: a friendly 2-3 sentence overview of the whole day for a chatbot to tell visitors, naming the day animal, the lucky signs and the sign that should take it easy (${lang === "km" ? "150-500 characters" : "30-80 words"}).
Return JSON: {"theme":"","love":"","business":"","summary":""}`;
}

// ------------------------------------------------------------------ Claude
async function ask(system, user, maxTokens) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY is not set");
  for (let attempt = 1; attempt <= 3; attempt++) {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] }),
    });
    if (!r.ok) {
      const t = await r.text();
      console.error(`Claude error ${r.status} (attempt ${attempt}): ${t.slice(0, 300)}`);
      if (attempt < 3 && (r.status === 429 || r.status >= 500)) { await new Promise((ok) => setTimeout(ok, 4000 * attempt)); continue; }
      throw new Error("Claude request failed " + r.status);
    }
    const data = await r.json();
    usage.in += (data.usage && data.usage.input_tokens) || 0; usage.out += (data.usage && data.usage.output_tokens) || 0;
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    const m = text.match(/\{[\s\S]*\}/);
    try { return JSON.parse(m ? m[0] : text); }
    catch (e) { console.error(`Could not parse JSON (attempt ${attempt})`); if (attempt === 3) throw e; }
  }
}
const usage = { in: 0, out: 0 };

async function aiText() {
  const halves = [facts.signs.slice(0, 6), facts.signs.slice(6)];
  const jobs = [];
  for (const lang of ["en", "km"]) {
    for (const part of halves) jobs.push(ask(systemPrompt(lang), signsPrompt(lang, part), lang === "km" ? 12000 : 5000).then((j) => ({ lang, kind: "signs", j })));
    jobs.push(ask(systemPrompt(lang), highlightsPrompt(lang), lang === "km" ? 4000 : 1500).then((j) => ({ lang, kind: "hl", j })));
  }
  const res = await Promise.all(jobs);
  const out = { signs: {}, hl: {} };
  for (const r of res) {
    if (r.kind === "hl") out.hl[r.lang] = r.j;
    else for (const [a, t] of Object.entries(r.j.signs || {})) (out.signs[a] = out.signs[a] || {})[r.lang] = t;
  }
  return out;
}

// placeholder wording for pipeline tests only (clearly not real content, never published)
function mockText() {
  const out = { signs: {}, hl: {} };
  const w = "calm bright steady warm clear gentle patient lively careful kind quiet open brave honest tidy sunny fresh curious loyal humble playful wise neat simple cheerful hopeful thoughtful balanced grounded generous friendly focused relaxed creative sincere graceful modest polite eager lucid nimble sturdy tender witty zesty jolly merry vivid mellow serene noble frank daring keen bold".split(" ");
  const kmw = ["ស្ងប់", "ភ្លឺស្វាង", "ស្ថិរភាព", "កក់ក្តៅ", "ច្បាស់លាស់", "ទន់ភ្លន់", "អត់ធ្មត់", "រស់រវើក", "ប្រុងប្រយ័ត្ន", "សប្បុរស", "ស្ងាត់", "ចំហ"];
  facts.signs.forEach((s, i) => {
    const en = {}, km = {};
    TEXT_FIELDS.forEach((k, j) => {
      const n = k === "fortune" ? 30 : 15;
      en[k] = `Mock ${k}: ` + Array.from({ length: n - 2 }, (_, x) => w[(x * 7 + i * 3 + j) % w.length] + (x % 2 ? "" : "-" + s.animal.toLowerCase())).join(" ") + ".";
      km[k] = `សាកល្បង ${KM_NAMES[s.animal]} ` + Array.from({ length: k === "fortune" ? 18 : 9 }, (_, x) => kmw[(i * 5 + j + x) % 12]).join(" ") + "។";
    });
    out.signs[s.animal] = { en, km };
  });
  out.hl.en = { theme: "Mock theme sentence for testing the daily pipeline only.", love: "Mock love highlight sentence for testing the daily pipeline only, nothing more here.", business: "Mock business highlight sentence for testing the daily pipeline only, nothing more here.", summary: "Mock summary for testing the daily pipeline only. It names no real prediction and is never published to the website or shown to visitors in any form." };
  out.hl.km = { theme: "ប្រធានបទសាកល្បងសម្រាប់តែការធ្វើតេស្តប៉ុណ្ណោះ។", love: "ប្រយោគស្នេហាសាកល្បងសម្រាប់តែការធ្វើតេស្តប៉ុណ្ណោះ មិនមែនខ្លឹមសារពិតទេ។", business: "ប្រយោគអាជីវកម្មសាកល្បងសម្រាប់តែការធ្វើតេស្តប៉ុណ្ណោះ មិនមែនខ្លឹមសារពិតទេ។", summary: "សេចក្តីសង្ខេបសាកល្បងសម្រាប់តែការធ្វើតេស្តប៉ុណ្ណោះ។ វាមិនមែនជាការទស្សន៍ទាយពិតទេ ហើយមិនត្រូវបានបង្ហាញនៅលើគេហទំព័រឡើយ។" };
  return out;
}

// ------------------------------------------------------------------ assemble, validate, write
function trimAll(o) { if (typeof o === "string") return o.replace(/\s+/g, " ").trim(); if (o && typeof o === "object") for (const k of Object.keys(o)) o[k] = trimAll(o[k]); return o; }
function build(t) {
  const pick = (o) => Object.fromEntries(TEXT_FIELDS.map((k) => [k, o && o[k]]));
  return trimAll({
    version: 1,
    date: iso,
    generatedAt: new Date().toISOString(),
    source: MOCK ? "mock" : "rules+claude",
    dayAnimal: facts.dayAnimal,
    dayAnimalKm: facts.dayAnimalKm,
    signs: facts.signs.map((s) => ({ ...s, text: { en: pick(t.signs[s.animal] && t.signs[s.animal].en), km: pick(t.signs[s.animal] && t.signs[s.animal].km) } })),
    highlights: {
      ...facts.highlights,
      theme: { en: t.hl.en && t.hl.en.theme, km: t.hl.km && t.hl.km.theme },
      love: { en: t.hl.en && t.hl.en.love, km: t.hl.km && t.hl.km.love },
      business: { en: t.hl.en && t.hl.en.business, km: t.hl.km && t.hl.km.business },
      summary: { en: t.hl.en && t.hl.en.summary, km: t.hl.km && t.hl.km.summary },
    },
    disclaimer: DISCLAIMER,
  });
}

(async () => {
  const t = MOCK ? mockText() : await aiText();
  const rec = build(t);
  // lucky numbers etc. are numbers and stay numbers after trimAll
  const errs = validateRecord(rec);
  if (errs.length) {
    console.error(`NOT PUBLISHED: ${errs.length} problem(s) in the ${iso} record:\n- ` + errs.slice(0, 40).join("\n- "));
    // keep the rejected draft OUTSIDE the website folder so it can never be published
    const rejFile = path.join(os.tmpdir(), `daily-data-rejected-${iso}.json`);
    fs.writeFileSync(rejFile, JSON.stringify(rec, null, 1)); console.error("draft saved for inspection: " + rejFile);
    process.exit(2);
  }
  fs.mkdirSync(OUT, { recursive: true });
  const body = JSON.stringify(rec);
  fs.writeFileSync(path.join(OUT, `${iso}.json`), body);
  // latest.json only moves forward (re-running an old date never replaces a newer day)
  const latestFile = path.join(OUT, "latest.json");
  let latestDate = "";
  try { latestDate = JSON.parse(fs.readFileSync(latestFile, "utf8")).date || ""; } catch (e) { /* first run */ }
  if (iso >= latestDate) fs.writeFileSync(latestFile, body);
  console.log(`published ${iso} (${(Buffer.byteLength(body) / 1024).toFixed(1)} KB)` + (MOCK ? " [mock]" : ` tokens in ${usage.in} out ${usage.out}`));
})().catch((e) => { console.error("NOT PUBLISHED:", e.message); process.exit(2); });
