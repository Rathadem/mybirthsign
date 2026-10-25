// Every voice line in the two 80-second daily videos must fit its 10-second clip, and the animals must never speak.
//   node tests/video-timing-test.mjs
// Checks 400 days. Limits (a rough guide for a calm voice with a short breath at the end of the clip):
// English at most 23 spoken words (numbers counted as the words that are said), Khmer at most 125 characters
// as spoken (numbers already written out in Khmer words).
import { computeFacts, INFO, KM_INFO } from "../scripts/daily-data-lib.mjs";
import { buildPack } from "../scripts/content/video-pack-lib.mjs";
import { createRequire } from "node:module";
const { forSign } = createRequire(import.meta.url)("../js/lucky-digits.js");

const EN_MAX = 23, KM_MAX = 125;
// words a number takes to say in English, e.g. 349 -> "three hundred forty-nine" = 3
const numWords = (n) => { n = Number(n); if (n < 21) return 1; if (n < 100) return 1; if (n < 1000) return 1 + (n % 100 ? 2 : 0); return 2 + numWords(n % 1000) * (n % 1000 ? 1 : 0); };
const enWords = (s) => s.split(/\s+/).filter(Boolean).reduce((t, w) => t + (/^\d+[,.!?]?$/.test(w) ? numWords(w.replace(/\D/g, "")) : 1), 0);
const start = Date.parse("2026-10-01T00:00:00Z");
let bad = 0, worst = { en: 0, km: 0 }, checked = 0;
for (let i = 0; i < 400; i++) {
  const d = new Date(start + i * 86400000).toISOString().slice(0, 10);
  const md = buildPack(d, computeFacts(d), forSign, null, { INFO, KM_INFO }).md;
  for (const part of md.split(/^## /m)) {
    if (!/^(60-second|Take-it-easy)/.test(part)) continue;
    for (const m of part.matchAll(/### (Scene [^\n]+)\n(.*?)\nEnglish voice:.*?says: "(.*?)" .*?\nKhmer voice:.*?says in Khmer: "(.*?)" /gs)) {
      checked++;
      const [, title, prompt, en, km] = m, ew = enWords(en), kc = [...km].length;
      worst.en = Math.max(worst.en, ew); worst.km = Math.max(worst.km, kc);
      if (ew > EN_MAX || kc > KM_MAX) { bad++; if (bad <= 8) console.error(`TOO LONG ${d} ${part.slice(0, 12)} ${title}: EN ${ew} words, KM ${kc} chars`); }
      if (/\b(roar|roars|crow|crows|crowing|barks?|barking)\b/i.test(prompt.replace(/do(es)? not speak|never speak|without speaking/gi, ""))) { bad++; console.error(`ANIMAL SOUND ${d} ${title}`); }
    }
  }
}
if (bad) { console.error(`${bad} problems`); process.exit(1); }
console.log(`video timing OK: ${checked} scenes over 400 days fit 10 seconds (longest: EN ${worst.en} words, KM ${worst.km} chars)`);
