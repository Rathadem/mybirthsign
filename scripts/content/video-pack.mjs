// Daily video prompt pack (Google Flow / Veo + captions + subtitles) for the MyBirthSign video channel.
//
//   node scripts/content/video-pack.mjs 2026-10-26            one day
//   node scripts/content/video-pack.mjs 2026-10-26 7          seven days from that date
//
// Writes docs/video-prompts/<date>.md, <date>.srt (Khmer subtitles) and <date>.en.srt (English subtitles);
// docs/ is not published. Everything comes from the same rules the website uses, so it can be made weeks
// ahead: ratings, lucky signs and the careful sign from computeFacts() in scripts/daily-data-lib.mjs, lucky
// numbers from js/lucky-digits.js, Khmer names and labels from the site's own data. When the day's data file
// (data/daily/<date>.json) already exists, its written summary is used for the voice-overs; otherwise a fixed
// standard script is used (the site's AI-written daily wording is only made a day ahead).
// Pictures: cute but powerful golden 3D animals in a cinematic Khmer temple setting.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { computeFacts, ROOT, KM_NAMES, INFO, KM_INFO } from "../daily-data-lib.mjs";
import { buildPack, charactersMd } from "./video-pack-lib.mjs";

const LUCKY = createRequire(import.meta.url)("../../js/lucky-digits.js");
const [start, nDays = "1"] = process.argv.slice(2);
if (!/^\d{4}-\d{2}-\d{2}$/.test(start || "")) { console.error("Usage: node scripts/content/video-pack.mjs YYYY-MM-DD [days]"); process.exit(1); }
const dir = path.join(ROOT, "docs", "video-prompts");
fs.mkdirSync(dir, { recursive: true });

const t0 = new Date(start + "T00:00:00Z");
for (let i = 0; i < Number(nDays); i++) {
  const iso = new Date(t0.getTime() + i * 86400000).toISOString().slice(0, 10);
  let data = null;
  try { data = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "daily", `${iso}.json`), "utf8")); } catch (e) { /* made ahead */ }
  const p = buildPack(iso, computeFacts(iso), LUCKY.forSign, data, { INFO, KM_INFO });
  fs.writeFileSync(path.join(dir, `${iso}.md`), p.md);
  fs.writeFileSync(path.join(dir, `${iso}.srt`), p.srtKm);
  fs.writeFileSync(path.join(dir, `${iso}.en.srt`), p.srtEn);
  for (const [id, x] of Object.entries(p.srtVid)) { fs.writeFileSync(path.join(dir, `${iso}-${id}.srt`), x.km); fs.writeFileSync(path.join(dir, `${iso}-${id}.en.srt`), x.en); }
  console.log(p.line);
}
fs.writeFileSync(path.join(dir, "characters.md"), charactersMd(KM_NAMES));
