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
// Pictures: photorealistic (real animals, real Cambodian temple and lotus-pond settings).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { computeFacts, ROOT, KM_NAMES } from "../daily-data-lib.mjs";

const LUCKY = createRequire(import.meta.url)("../../js/lucky-digits.js");
const [start, nDays = "1"] = process.argv.slice(2);
if (!/^\d{4}-\d{2}-\d{2}$/.test(start || "")) { console.error("Usage: node scripts/content/video-pack.mjs YYYY-MM-DD [days]"); process.exit(1); }

const EMO = { Rat: "🐀", Ox: "🐂", Tiger: "🐯", Rabbit: "🐇", Dragon: "🐉", Snake: "🐍", Horse: "🐎", Goat: "🐐", Monkey: "🐒", Rooster: "🐓", Dog: "🐕", Pig: "🐖" };
// realistic look of each animal (Cambodian where it makes sense; the dragon is the one mythical animal)
const LOOK = {
  Rat: "a real brown field rat with bright black eyes, soft fur and twitching whiskers",
  Ox: "a strong white Cambodian ox with a humped back and curved horns",
  Tiger: "a majestic Indochinese tiger with vivid orange and black stripes",
  Rabbit: "a soft brown rabbit with long upright ears",
  Dragon: "a majestic Asian dragon with a long serpentine body, golden-green scales, flowing whiskers and a pearl, rendered as realistic cinematic CGI",
  Snake: "a beautiful patterned python with glossy scales",
  Horse: "a strong chestnut horse with a flowing dark mane",
  Goat: "a white goat with gently curved horns",
  Monkey: "a long-tailed macaque monkey with expressive eyes",
  Rooster: "a proud rooster with a red comb and glossy bronze-green tail feathers",
  Dog: "a friendly, loyal golden-brown dog",
  Pig: "a healthy pink pig with a gentle face",
};
const POSE = {
  Rat: "sits up on its hind legs, whiskers twitching", Ox: "lifts its head and breathes out a soft mist", Tiger: "raises its head proudly and looks into the distance",
  Rabbit: "lifts its ears and sniffs the evening air", Dragon: "uncoils and rises slowly into the sky", Snake: "slowly uncoils and lifts its head",
  Horse: "tosses its mane and paws the ground", Goat: "lifts its head and looks out calmly", Monkey: "looks around with bright curiosity",
  Rooster: "spreads its wings and lifts its head", Dog: "sits alert and wags its tail", Pig: "looks up happily, ears twitching",
};
const STYLE = "Vertical 9:16. Photorealistic, cinematic, real animals in a real Cambodian setting: an ancient Khmer sandstone temple with carved towers, lotus ponds, palm trees, soft evening mist and a full moon rising in a deep blue dusk sky with the last golden light. Natural colors, shallow depth of field, gentle slow camera movement, 4K detail, like a nature documentary. No text, no letters, no subtitles, no logos, no cartoon or illustration style.";
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const dmy = (iso) => iso.split("-").reverse().join("/");
const longDate = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).replace(/^(\w+) /, "$1, ");
const list = (arr) => (arr.length <= 1 ? arr.join("") : arr.length === 2 ? `${arr[0]} and ${arr[1]}` : `${arr.slice(0, -1).join(", ")} and ${arr.at(-1)}`);
const kmList = (arr) => (arr.length === 1 ? arr[0] : `${arr.slice(0, -1).join(" ")} និង${arr.at(-1)}`);
const looks = (arr) => list(arr.map((a) => LOOK[a]));

function ts(t) { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, "0")}:${String(Math.floor(ms / 60000) % 60).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`; }
function srt(lines, total = 45) {
  const w = lines.map((l) => Math.max(l.length, 12)), sum = w.reduce((a, b) => a + b, 0);
  let t = 0;
  return lines.map((l, i) => { const d = (total * w[i]) / sum; const s = `${i + 1}\n${ts(t)} --> ${ts(t + d - 0.05)}\n${l}\n`; t += d; return s; }).join("\n");
}
// split long sentences for subtitles (Khmer at a space after ~45 chars, English at ", ")
function splitLines(text, lang) {
  const sents = lang === "km" ? text.split(/(?<=។)\s*/) : text.split(/(?<=[.!?])\s+/);
  const out = [];
  for (const s of sents.filter(Boolean)) {
    if (s.length <= (lang === "km" ? 60 : 70)) { out.push(s); continue; }
    const cut = lang === "km" ? s.indexOf(" ", 40) : s.indexOf(", ", 30);
    if (cut > 0) { out.push(s.slice(0, lang === "km" ? cut : cut + 1).trim()); out.push(s.slice(cut + 1).trim()); } else out.push(s);
  }
  return out;
}

function pack(iso) {
  const F = computeFacts(iso);
  const sign = (a) => F.signs.find((s) => s.animal === a);
  const day = F.dayAnimal, dayKm = F.dayAnimalKm, lucky = F.highlights.topLucky, careful = F.highlights.careful;
  const km = (a) => KM_NAMES[a];
  const nums = lucky.map((a) => { const v = LUCKY.forSign(a, iso); if (String(v.d1) !== String(sign(a).lucky.number)) throw new Error(`${iso} ${a}: lucky number mismatch`); return { a, ...v }; });
  const inVideo = [...new Set([day, ...lucky, ...careful])];
  const numLine = (n, name) => `${name}  ${n.d1} · ${n.d2} · ${n.d3} · ${n.d4} · ${n.d5}`;
  const D = dmy(iso), LD = longDate(iso);

  // written summary: the site's own daily wording if it exists already, otherwise the standard script
  let data = null;
  try { data = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "daily", `${iso}.json`), "utf8")); } catch (e) { /* made ahead */ }
  const same = data && JSON.stringify(data.highlights.topLucky) === JSON.stringify(lucky) && JSON.stringify(data.highlights.careful) === JSON.stringify(careful);
  const summaryKm = same && data.highlights.summary?.km ? data.highlights.summary.km : [
    `ថ្ងៃនេះជាថ្ងៃ${dayKm}។`,
    `ឆ្នាំ${kmList(lucky.map(km))} មានសំណាងល្អជាងគេនៅថ្ងៃនេះ។`,
    ...(careful.length ? [`ចំណែកឆ្នាំ${kmList(careful.map(km))} គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។`] : []),
  ].join(" ");
  const summaryEn = same && data.highlights.summary?.en ? data.highlights.summary.en : [
    `Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day.`,
    `${list(lucky)} are the luckiest signs today.`,
    ...(careful.length ? [`${list(careful)} should take it easy, slow down and avoid rushing big decisions.`] : []),
  ].join(" ");

  const voiceKm = [
    `ជោគជតារាសីប្រចាំថ្ងៃនេះ ថ្ងៃទី ${D}។`,
    summaryKm,
    `លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖ ${nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2} និង ${n.d3}។`).join(" ")}`,
    "លេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការណែនាំឱ្យភ្នាល់ទេ។",
    "ចូលមើលលេខសំណាង និងលម្អិតសម្រាប់រាសីទាំង 12 នៅ mybirthsign.com",
  ];
  const voiceEn = [
    `Your Chinese zodiac fortune for ${LD}.`,
    summaryEn,
    `Today's lucky numbers for the lucky signs: ${nums.map((n) => `${n.a}, ${n.d2} and ${n.d3}.`).join(" ")}`,
    "Lucky numbers are for fun only, not betting advice.",
    "See all 12 signs and full lucky numbers at mybirthsign.com.",
  ];
  const srtKm = srt(voiceKm.flatMap((v) => splitLines(v, "km")));
  const srtEn = srt(voiceEn.flatMap((v) => splitLines(v, "en")));

  const luckyLabelsKm = lucky.map((a) => `${km(a)} – ${sign(a).label.km}`).join(" · ");
  const luckyLabelsEn = lucky.map((a) => `${a} – ${sign(a).label.en}`).join(" · ");
  const disclaimerNums = "លេខសំណាង (1 ដល់ 5 ខ្ទង់) សម្រាប់ថ្ងៃនេះ គឺសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការទស្សន៍ទាយ ឬការណែនាំឱ្យភ្នាល់ទេ។";
  const disclaimer = "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រទេ។";
  const tags = `#ជោគជតារាសី #រាសីប្រចាំថ្ងៃ #ឆ្នាំ${dayKm} #ផ្កាយកំណើត`;

  const md = `# Daily video prompt pack — ${D} · ${day} day (ថ្ងៃ${dayKm})

Lucky signs: ${lucky.join(", ")}${careful.length ? ` · Careful: ${careful.join(", ")}` : ""}
Format: vertical 9:16 (YouTube Shorts, Facebook Reels, TikTok), about 45 seconds: 4 Veo scenes of about 8 seconds, then a lucky-numbers scene of about 10–12 seconds.
Two versions: make the pictures once, then record a Khmer voice-over and an English voice-over (two videos, or one video with both subtitle tracks).
Ratings, lucky signs and lucky numbers come from the site's fixed rules and match the website's daily fortune for this date.${same ? "" : "\nVoice-over wording: standard script (this pack was made ahead; the site's own daily wording appears the day before)."}

## Style (paste first in every scene)
${STYLE}

## Reference pictures (make these first, so each animal looks the same in every scene)
Make each picture once, then add it as a reference image ("ingredient") in Flow, or use it as the starting image of a scene.

### Character reference image prompts
${inVideo.map((a) => `- **${a}:** Photorealistic portrait of ${LOOK[a]}, full body, three-quarter view, standing in the soft golden evening light of an ancient Khmer sandstone temple courtyard, temple towers softly blurred behind, a few pink lotus flowers nearby. Natural colors, sharp detail in the fur or scales, shallow depth of field, square 1:1. No text, no letters, no logos.`).join("\n")}

### Start-frame image prompts (make the picture, then animate it with "frames to video")
1. Vertical 9:16. Photorealistic. ${cap(LOOK[day])} stands on the worn stone steps of an ancient Khmer temple at dusk, carved sandstone towers behind it, a full moon rising in a deep blue sky, warm last light on its face. Shallow depth of field. No text.
2. Vertical 9:16. Photorealistic. ${cap(looks(lucky))} together on the grass in front of an ancient Khmer temple at golden hour, palm trees and soft mist behind them, warm light on their faces. Natural, calm, documentary style. No text.
${careful.length ? `3. Vertical 9:16. Photorealistic. ${cap(LOOK[careful[0]])} resting quietly beside a still lotus pond at dusk, pink lotus flowers in the foreground, the reflection of a temple tower and the full moon on the water. Peaceful mood. No text.` : "3. Vertical 9:16. Photorealistic. A still lotus pond at dusk, pink lotus flowers in the foreground, the reflection of a temple tower and the full moon on the water. Peaceful mood. No text."}
4. Vertical 9:16. Photorealistic. A full moon rising over a wide lotus pond, the silhouette of an ancient Khmer temple with carved towers on the horizon, palm trees, soft mist on the water, deep blue dusk sky with open space at the top of the frame. No text.
5. Vertical 9:16. Photorealistic. A large round sandstone relief carved with the twelve Chinese zodiac animals in a ring, set in an ancient temple wall, lit by warm candlelight and the moon, pink lotus offerings below, open space in the middle and lower part of the frame for captions. No text.

### YouTube thumbnail image prompt
Vertical 9:16 (can be cropped to 16:9). Photorealistic close-up of ${LOOK[day]} facing the viewer in warm golden evening light, an ancient Khmer temple and a glowing full moon softly blurred behind, ${lucky.filter((a) => a !== day).length ? `${looks(lucky.filter((a) => a !== day))} smaller in the background, ` : ""}vivid, sharp and eye-catching. No text, no letters, no logos. (Add the title and date in your editor.)

## Scene 1 – ${day} day
Photorealistic. ${cap(LOOK[day])} walks slowly onto the worn stone steps of an ancient Khmer temple at dusk and ${POSE[day]}. Warm last sunlight touches its face while a full moon rises behind the carved sandstone towers. Light mist drifts across the courtyard. The camera starts low and slowly rises to a close-up. Natural, documentary style, matching the reference image.

## Scene 2 – Lucky signs
Photorealistic. ${cap(looks(lucky))} stand calmly together on the grass in front of an ancient Khmer temple at golden hour. Soft warm light glows on their faces, palm trees sway gently and a few fireflies drift up into the evening air. Each animal moves naturally in its own way. The camera glides slowly from left to right across them. The animals match the reference images.

## Scene 3 – ${careful.length ? `${careful.join(", ")}, take it easy` : "A calm moment"}
${careful.length ? `Photorealistic. ${cap(LOOK[careful[0]])} rests quietly beside a still lotus pond at dusk, breathing slowly. Pink lotus flowers sway gently, and the reflection of a temple tower and the full moon shimmers on the water. The mood is peaceful and restful, not sad. The camera moves in slowly as a few petals float on the water. The ${careful[0].toLowerCase()} matches the reference image.` : "Photorealistic. A still lotus pond at dusk, pink lotus flowers swaying gently, the reflection of a temple tower and the full moon shimmering on the water. The camera moves in slowly."}

## Scene 4 – Outro
Photorealistic. A full moon rises over a wide lotus pond with the silhouette of an ancient Khmer temple on the horizon. Soft mist moves across the water, palm trees frame the scene and the moonlight sparkles on the ripples. The camera slowly pulls back and tilts up, leaving open sky at the top of the frame for a title.

## Scene 5 – Lucky numbers (about 10–12 seconds)
Photorealistic. A large round sandstone relief carved with the twelve Chinese zodiac animals in a ring, set in an ancient temple wall. Warm candlelight flickers across the carvings and moonlight falls from above; pink lotus offerings rest below. The camera slowly pushes in, keeping open space in the middle and lower part of the frame for the number captions. (Loop this clip, or slow-zoom a still picture, to fill the time.)

## On-screen captions (add in the editor)
### Khmer version
1. ជោគជតារាសីប្រចាំថ្ងៃនេះ · ${D} · ថ្ងៃ${dayKm}
2. ${luckyLabelsKm}
${careful.length ? `3. ${careful.map((a) => `${km(a)} – ${sign(a).label.km} · គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ`).join(" ")}` : "3. —"}
4. ចូលមើលលម្អិតនៅ mybirthsign.com
5. លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង
${nums.map((n) => numLine(n, km(n.a))).join("\n")}
   សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ

### English version
1. Daily Chinese Zodiac Fortune · ${D} · ${day} Day
2. ${luckyLabelsEn}
${careful.length ? `3. ${careful.map((a) => `${a} – ${sign(a).label.en} · slow down and rest`).join(" ")}` : "3. —"}
4. More at mybirthsign.com
5. Today's lucky numbers for the lucky signs
${nums.map((n) => numLine(n, n.a)).join("\n")}
   For fun only

## Voice-over – Khmer (about 45 seconds)
${voiceKm.join("\n")}

## Voice-over – English (about 45 seconds)
${voiceEn.join("\n")}

(Record the voices yourself or use text-to-speech; AI video tools may not pronounce Khmer well.)

## YouTube
Title (Khmer): ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃ${dayKm}
Title (English): Daily Chinese Zodiac Fortune – ${D} | ${day} Day

Description:
${summaryKm}

${inVideo.map((a) => `${km(a)}៖ ពណ៌${sign(a).lucky.color.km} · ${sign(a).lucky.time}`).join("\n")}

លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង (1 ដល់ 5 ខ្ទង់)៖
${nums.map((n) => numLine(n, km(n.a))).join("\n")}

${disclaimerNums}

មើលរាសីទាំង 12៖ https://mybirthsign.com/km/

${disclaimer}

English: ${summaryEn} Lucky numbers (for fun only): ${nums.map((n) => `${n.a} ${n.d1} · ${n.d2} · ${n.d3}`).join(" | ")}. All 12 signs: https://mybirthsign.com

Hashtags: ${tags} #ChineseZodiac #DailyHoroscope #Shorts

## Facebook post caption
🌙 ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃ${dayKm} ${EMO[day]}

✨ ឆ្នាំសំណាងថ្ងៃនេះ៖ ${lucky.map((a) => `${km(a)} (${sign(a).label.km})`).join(" · ")}
${careful.length ? `🌿 គួរប្រុងប្រយ័ត្ន៖ ${careful.map(km).join(" ")} – គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។\n` : ""}
🔢 លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖
${nums.map((n) => numLine(n, km(n.a))).join("\n")}

👉 មើលរាសីទាំង 12 និងលេខសំណាងពេញលេញ៖ https://mybirthsign.com/km/

${disclaimerNums}

${tags} #លេខសំណាង

## TikTok caption
ជោគជតារាសីថ្ងៃនេះ ${D} ${EMO[day]} ថ្ងៃ${dayKm}! ឆ្នាំសំណាង៖ ${lucky.map(km).join(" ")} ✨ លេខសំណាង៖ ${nums.map((n) => `${km(n.a)} ${n.d2}`).join(" · ")} 🔢 ឆ្នាំអ្នកជាអ្វី? Comment ប្រាប់ផង 👇 (សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ) Link នៅក្នុង bio 🌙
${tags} #fyp #ChineseZodiac

English version: ${EMO[day]} ${day} day, ${D}! Lucky signs: ${lucky.join(", ")} ✨ Lucky numbers: ${nums.map((n) => `${n.a} ${n.d2}`).join(" · ")} 🔢 What's your sign? 👇 (for fun only) Link in bio 🌙 #ChineseZodiac #DailyHoroscope #fyp

(TikTok links in captions are not clickable, so put https://mybirthsign.com/km/ in your profile bio.)

## YouTube subtitles (captions files)
Two files are saved next to this one: \`${iso}.srt\` (Khmer) and \`${iso}.en.srt\` (English).
Upload in YouTube Studio → Subtitles → Add language → choose Khmer or English → Upload file → "With timing". You can add both to the same video.
The timings are estimates for a 45-second voice-over; after you record the voice, drag each line to match in YouTube's subtitle editor, or use "Auto-sync".

### Khmer (${iso}.srt)
\`\`\`
${srtKm}\`\`\`

### English (${iso}.en.srt)
\`\`\`
${srtEn}\`\`\`
`;
  const dir = path.join(ROOT, "docs", "video-prompts");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${iso}.md`), md);
  fs.writeFileSync(path.join(dir, `${iso}.srt`), srtKm);
  fs.writeFileSync(path.join(dir, `${iso}.en.srt`), srtEn);
  return `${iso}: ${day} day · lucky ${lucky.join(", ")} · careful ${careful.join(", ") || "none"}${same ? " · site wording" : ""}`;
}

const t0 = new Date(start + "T00:00:00Z");
for (let i = 0; i < Number(nDays); i++) {
  const iso = new Date(t0.getTime() + i * 86400000).toISOString().slice(0, 10);
  console.log(pack(iso));
}
