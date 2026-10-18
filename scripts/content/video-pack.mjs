// Daily video prompt pack (Google Flow / Veo + captions + subtitles) for the MyBirthSign Khmer video channel.
//
//   node scripts/content/video-pack.mjs 2026-10-26            one day
//   node scripts/content/video-pack.mjs 2026-10-26 7          seven days from that date
//
// Writes docs/video-prompts/<date>.md and <date>.srt (docs/ is not published). Everything comes from the same
// rules the website uses, so it can be made weeks ahead: ratings, lucky signs and the careful sign from
// computeFacts() in scripts/daily-data-lib.mjs, lucky numbers from js/lucky-digits.js, Khmer animal names
// and labels from the site's own data. The Khmer voice-over uses a fixed standard script (the site's
// AI-written daily wording only exists a day ahead).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { computeFacts, ROOT, KM_NAMES } from "../daily-data-lib.mjs";

const LUCKY = createRequire(import.meta.url)("../../js/lucky-digits.js");
const [start, nDays = "1"] = process.argv.slice(2);
if (!/^\d{4}-\d{2}-\d{2}$/.test(start || "")) { console.error("Usage: node scripts/content/video-pack.mjs YYYY-MM-DD [days]"); process.exit(1); }

const EMO = { Rat: "🐀", Ox: "🐂", Tiger: "🐯", Rabbit: "🐇", Dragon: "🐉", Snake: "🐍", Horse: "🐎", Goat: "🐐", Monkey: "🐒", Rooster: "🐓", Dog: "🐕", Pig: "🐖" };
const LOOK = {
  Rat: "a small, clever golden rat with bright eyes and finely engraved fur",
  Ox: "a strong, calm golden ox with curved horns and engraved patterns",
  Tiger: "a majestic golden tiger with engraved stripes",
  Rabbit: "a gentle golden rabbit with long ears and engraved patterns",
  Dragon: "a long, coiling golden dragon with flowing whiskers and engraved scales",
  Snake: "an elegant coiled golden snake with engraved scales",
  Horse: "a proud golden horse with a flowing golden mane",
  Goat: "a gentle golden goat with curled horns and engraved patterns",
  Monkey: "a small, playful golden monkey with engraved patterns",
  Rooster: "a proud golden rooster with a tall comb and flowing tail feathers",
  Dog: "a loyal, friendly golden dog with engraved patterns",
  Pig: "a cheerful, round golden pig with engraved patterns",
};
const POSE = {
  Rat: "sits up on its hind legs, whiskers twitching", Ox: "stands firm with its head raised", Tiger: "raises its head proudly",
  Rabbit: "lifts its ears and looks up at the moon", Dragon: "uncoils and rises into the air", Snake: "slowly uncoils and lifts its head",
  Horse: "lifts one front hoof and tosses its mane", Goat: "lifts its head and looks out calmly", Monkey: "looks around with bright curiosity",
  Rooster: "spreads its wings and lifts its head", Dog: "sits alert and wags its tail", Pig: "looks up happily with a gentle smile",
};
const STYLE = "Vertical 9:16. Ornate golden Chinese zodiac animal figures decorated with pink lotus flowers, deep indigo night sky with soft stars, a glowing full moon, silhouettes of Khmer temple roofs, warm gold light, gentle slow camera movement, cinematic, high detail. No text, no letters, no subtitles, no logos.";
const SITE_IMG = (a) => `https://mybirthsign.com/images/profile/spirit-${a.toLowerCase()}.webp`;
const dmy = (iso) => iso.split("-").reverse().join("/");
const list = (arr) => (arr.length <= 1 ? arr.join("") : arr.length === 2 ? `${arr[0]} and ${arr[1]}` : `${arr.slice(0, -1).join(", ")} and ${arr.at(-1)}`);
const lowerList = (arr) => list(arr.map((a) => `a golden ${a.toLowerCase()}`));
const kmList = (arr) => (arr.length === 1 ? arr[0] : `${arr.slice(0, -1).join(" ")} និង${arr.at(-1)}`);

function ts(t) { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, "0")}:${String(Math.floor(ms / 60000) % 60).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`; }
function srt(lines, total = 45) {
  const w = lines.map((l) => Math.max(l.length, 12)), sum = w.reduce((a, b) => a + b, 0);
  let t = 0;
  return lines.map((l, i) => { const d = (total * w[i]) / sum; const s = `${i + 1}\n${ts(t)} --> ${ts(t + d - 0.05)}\n${l}\n`; t += d; return s; }).join("\n");
}

function pack(iso) {
  const F = computeFacts(iso);
  const sign = (a) => F.signs.find((s) => s.animal === a);
  const day = F.dayAnimal, dayKm = F.dayAnimalKm, lucky = F.highlights.topLucky, careful = F.highlights.careful;
  const km = (a) => KM_NAMES[a];
  const nums = lucky.map((a) => { const v = LUCKY.forSign(a, iso); if (String(v.d1) !== String(sign(a).lucky.number)) throw new Error(`${iso} ${a}: lucky number mismatch`); return { a, ...v }; });
  const inVideo = [...new Set([day, ...lucky, ...careful])];
  const numLine = (n) => `${km(n.a)}  ${n.d1} · ${n.d2} · ${n.d3} · ${n.d4} · ${n.d5}`;
  const D = dmy(iso);

  const summary = [
    `ថ្ងៃនេះជាថ្ងៃ${dayKm}។`,
    `ឆ្នាំ${kmList(lucky.map(km))} មានសំណាងល្អជាងគេនៅថ្ងៃនេះ។`,
    ...(careful.length ? [`ចំណែកឆ្នាំ${kmList(careful.map(km))} គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។`] : []),
  ];
  const voice = [
    `ជោគជតារាសីប្រចាំថ្ងៃនេះ ថ្ងៃទី ${D}។`,
    ...summary,
    "លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖",
    ...nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2} និង ${n.d3}។`),
    "លេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការណែនាំឱ្យភ្នាល់ទេ។",
    "ចូលមើលលេខសំណាង និងលម្អិតសម្រាប់រាសីទាំង 12 នៅ mybirthsign.com",
  ];
  const luckyLabels = lucky.map((a) => `${km(a)} – ${sign(a).label.km}`).join(" · ");
  const carefulLine = careful.map((a) => `${km(a)} – ${sign(a).label.km} · គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ`).join("\n   ");
  const disclaimerNums = "លេខសំណាង (1 ដល់ 5 ខ្ទង់) សម្រាប់ថ្ងៃនេះ គឺសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការទស្សន៍ទាយ ឬការណែនាំឱ្យភ្នាល់ទេ។";
  const disclaimer = "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រទេ។";
  const tags = `#ជោគជតារាសី #រាសីប្រចាំថ្ងៃ #ឆ្នាំ${dayKm} #ផ្កាយកំណើត`;
  const subtitles = srt(voice);

  const charPrompt = (a) => `- **${a}:** A single ornate ${LOOK[a].replace(/^an? /, "")}, full body, three-quarter view. A few pink lotus flowers around it. Plain deep indigo background with a soft gold glow behind it. Warm golden light, high detail, square 1:1. No text, no letters, no logos.`;

  const md = `# Daily video prompt pack — ${D} · ${day} day (ថ្ងៃ${dayKm})

Lucky signs: ${lucky.join(", ")}${careful.length ? ` · Careful: ${careful.join(", ")}` : ""}
Format: vertical 9:16 (YouTube Shorts, Facebook Reels, TikTok), about 45 seconds: 4 Veo scenes of about 8 seconds, then a lucky-numbers scene of about 10–12 seconds.
Made ahead from the site's fixed rules: the ratings, lucky signs and lucky numbers match the website's daily fortune for this date.

## Style (paste first in every scene)
${STYLE}

## Reference pictures (make or download these first)
Using the same pictures every day keeps each animal looking the same from video to video.

### Site reference images (download and add as references / "ingredients" in Flow)
${inVideo.map((a) => `- ${a}: ${SITE_IMG(a)}`).join("\n")}
- Zodiac wheel (for scene 5): https://mybirthsign.com/images/profile/zodiac-wheel.webp

These are your site's own golden artworks. You can also use one as the starting image of a scene.

### Character reference image prompts (if you want fresh art)
${inVideo.map(charPrompt).join("\n")}

### Start-frame image prompts (make the picture, then animate it with "frames to video")
1. Vertical 9:16. ${LOOK[day][0].toUpperCase() + LOOK[day].slice(1)} stands on a moonlit stone terrace in front of silhouettes of Khmer temple roofs, pink lotus flowers around it, a glowing full moon and soft stars in a deep indigo sky, warm golden light on its body. Cinematic, high detail. No text.
2. Vertical 9:16. ${lowerList(lucky).replace(/^a/, "A")}, each decorated with pink lotus flowers, stand side by side on a glowing terrace beneath a large full moon, warm golden light around them, small sparkles rising into the indigo night sky. Cinematic, high detail. No text.
${careful.length ? `3. Vertical 9:16. ${LOOK[careful[0]][0].toUpperCase() + LOOK[careful[0]].slice(1)} rests peacefully beside a still lotus pond under a full moon, soft blue and gold reflections on the water, faint Khmer temple silhouettes in the distance. Calm, restful mood. Cinematic, high detail. No text.` : "3. Vertical 9:16. A still lotus pond under a full moon with soft blue and gold reflections and faint Khmer temple silhouettes. Calm mood. Cinematic. No text."}
4. Vertical 9:16. A wide, calm view of a glowing full moon over a lotus pond, Khmer temple roof silhouettes on the horizon, pink lotus flowers in the foreground, golden reflections on the water, soft stars in a deep indigo sky, open sky at the top of the frame. Cinematic. No text.
5. Vertical 9:16. A large ornate golden zodiac wheel with all twelve golden animals around its rim, glowing under a full moon in a deep indigo sky, pink lotus flowers along the bottom, soft gold light, open space in the middle and lower part of the frame for captions. Cinematic, high detail. No text.

### YouTube thumbnail image prompt
Vertical 9:16 (can be cropped to 16:9). A large, bright ${LOOK[day].replace(/^an? /, "")} in the center facing the viewer with a confident expression, ${lowerList(lucky.filter((a) => a !== day))} smaller behind it, pink lotus flowers in front, a glowing full moon and sparkles in a deep indigo sky, strong warm gold light, vivid and eye-catching. No text, no letters, no logos. (Add the Khmer title and date in your editor.)

## Scene 1 – ${day} day
${LOOK[day][0].toUpperCase() + LOOK[day].slice(1)}, decorated with pink lotus flowers, steps forward onto a moonlit stone terrace in front of Khmer temple silhouettes and ${POSE[day]} as warm golden light sweeps across its body. Soft stars twinkle in the indigo sky and lotus petals drift slowly through the air. The camera starts low and slowly rises to a heroic close-up. The ${day.toLowerCase()} matches the reference image.

## Scene 2 – Lucky signs
${lowerList(lucky).replace(/^a/, "A")}, each richly decorated with pink lotus flowers, stand together on a glowing terrace beneath a large full moon. Warm golden light pulses gently around them, like a blessing, and small sparkles rise into the indigo night sky. Each animal moves gently in its own way. The camera glides slowly from left to right across them. The animals match the reference images.

## Scene 3 – ${careful.length ? `${careful.join(", ")}, take it easy` : "A calm moment"}
${careful.length ? `${LOOK[careful[0]][0].toUpperCase() + LOOK[careful[0]].slice(1)}, decorated with pink lotus flowers, rests calmly beside a still lotus pond under the full moon, breathing slowly. Soft blue and gold reflections ripple across the water, and the Khmer temple silhouettes glow faintly in the distance. The mood is peaceful and restful, not sad. The camera moves in slowly as a few petals float down onto the water. The ${careful[0].toLowerCase()} matches the reference image.` : "A still lotus pond under the full moon, soft blue and gold reflections rippling across the water, Khmer temple silhouettes glowing faintly in the distance. The camera moves in slowly as a few petals float down."}

## Scene 4 – Outro
A wide, calm view of a glowing full moon over a lotus pond, with silhouettes of Khmer temple roofs on the horizon and pink lotus flowers in the foreground. Golden light reflects on the gently rippling water and soft stars fill the indigo sky. The camera slowly pulls back and tilts up, leaving open sky at the top of the frame for a title.

## Scene 5 – Lucky numbers (about 10–12 seconds)
A large ornate golden zodiac wheel with all twelve golden animals around its rim turns slowly under a glowing full moon in a deep indigo sky. Soft golden light pulses from its center, pink lotus flowers sway along the bottom of the frame and small sparkles drift upward. The camera slowly pushes in, keeping open space in the middle and lower part of the frame for the number captions. (Loop this clip, or use the zodiac wheel picture with a slow zoom in your editor, to fill the time.)

## Khmer captions (add in the editor)
1. ជោគជតារាសីប្រចាំថ្ងៃនេះ · ${D} · ថ្ងៃ${dayKm}
2. ${luckyLabels}
${careful.length ? `3. ${carefulLine}` : "3. —"}
4. ចូលមើលលម្អិតនៅ mybirthsign.com
5. លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង
${nums.map(numLine).join("\n")}
   សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ

## Khmer voice-over (about 45 seconds)
${voice[0]}
${summary.join(" ")}
លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖ ${nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2} និង ${n.d3}។`).join(" ")}
${voice.at(-2)}
${voice.at(-1)}

(Record the voice yourself or use a Khmer text-to-speech voice; AI video tools may not pronounce Khmer well.)

## YouTube
Title: ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃ${dayKm}

Description:
${summary.join(" ")}

${inVideo.map((a) => `${km(a)}៖ ពណ៌${sign(a).lucky.color.km} · ${sign(a).lucky.time}`).join("\n")}

លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង (1 ដល់ 5 ខ្ទង់)៖
${nums.map(numLine).join("\n")}

${disclaimerNums}

មើលរាសីទាំង 12៖ https://mybirthsign.com/km/

${disclaimer}

Hashtags: ${tags} #ChineseZodiac #DailyHoroscope #Shorts

## Facebook post caption
🌙 ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃ${dayKm} ${EMO[day]}

✨ ឆ្នាំសំណាងថ្ងៃនេះ៖ ${lucky.map((a) => `${km(a)} (${sign(a).label.km})`).join(" · ")}
${careful.length ? `🌿 គួរប្រុងប្រយ័ត្ន៖ ${careful.map(km).join(" ")} – គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។\n` : ""}
🔢 លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖
${nums.map(numLine).join("\n")}

👉 មើលរាសីទាំង 12 និងលេខសំណាងពេញលេញ៖ https://mybirthsign.com/km/

${disclaimerNums}

${tags} #លេខសំណាង

## TikTok caption
ជោគជតារាសីថ្ងៃនេះ ${D} ${EMO[day]} ថ្ងៃ${dayKm}! ឆ្នាំសំណាង៖ ${lucky.map(km).join(" ")} ✨ លេខសំណាង៖ ${nums.map((n) => `${km(n.a)} ${n.d2}`).join(" · ")} 🔢 ឆ្នាំអ្នកជាអ្វី? Comment ប្រាប់ផង 👇 (សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ) Link នៅក្នុង bio 🌙
${tags} #fyp #ChineseZodiac

(TikTok links in captions are not clickable, so put https://mybirthsign.com/km/ in your profile bio.)

## YouTube subtitles (captions file)
Upload this in YouTube Studio → Subtitles → Add language: Khmer → Upload file → "With timing". It is also saved next to this file as \`${iso}.srt\`.
The timings are estimates for a 45-second voice-over; after you record the voice, open YouTube Studio's subtitle editor and drag each line to match, or let YouTube's "Auto-sync" align the text.

\`\`\`
${subtitles}\`\`\`
`;
  const dir = path.join(ROOT, "docs", "video-prompts");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${iso}.md`), md);
  fs.writeFileSync(path.join(dir, `${iso}.srt`), subtitles);
  return `${iso}: ${day} day · lucky ${lucky.join(", ")} · careful ${careful.join(", ") || "none"}`;
}

const t0 = new Date(start + "T00:00:00Z");
for (let i = 0; i < Number(nDays); i++) {
  const iso = new Date(t0.getTime() + i * 86400000).toISOString().slice(0, 10);
  console.log(pack(iso));
}
