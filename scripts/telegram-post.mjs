// Posts the day's zodiac fortune to the MyBirthSign Telegram channel (Khmer first, then English).
//
//   node scripts/telegram-post.mjs --date 2026-10-22          send (needs the two secrets below)
//   node scripts/telegram-post.mjs --date 2026-10-22 --dry    print the message only, send nothing
//
// Secrets (GitHub → Settings → Secrets and variables → Actions; never put them in code or chat):
//   TELEGRAM_BOT_TOKEN  the bot token from @BotFather
//   TELEGRAM_CHAT_ID    the channel, e.g. @mybirthsign or -100xxxxxxxxxx
// Without them the script does nothing and exits normally, so the daily job never fails because of Telegram.
// Each date is posted once: data/telegram/posted.json remembers the last date sent.
// Facts (lucky signs, careful sign, lucky numbers) come from the same rules as the website.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { computeFacts, ROOT } from "./daily-data-lib.mjs";

const { forSign } = createRequire(import.meta.url)("../js/lucky-digits.js");
const args = process.argv.slice(2);
const date = args[args.indexOf("--date") + 1];
const dry = args.includes("--dry");
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) { console.error("Usage: node scripts/telegram-post.mjs --date YYYY-MM-DD [--dry]"); process.exit(1); }

const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
if (!dry && (!token || !chat)) { console.log("Telegram secrets are not set; nothing posted."); process.exit(0); }

const markFile = path.join(ROOT, "data", "telegram", "posted.json");
let mark = {};
try { mark = JSON.parse(fs.readFileSync(markFile, "utf8")); } catch (e) { /* first post */ }
if (!dry && mark.lastDate === date) { console.log(`Already posted ${date}; nothing to do.`); process.exit(0); }

const F = computeFacts(date);
const sign = (a) => F.signs.find((s) => s.animal === a);
const lucky = F.highlights.topLucky, careful = F.highlights.careful;
const D = date.split("-").reverse().join("/");
const EMO = { Rat: "🐀", Ox: "🐂", Tiger: "🐯", Rabbit: "🐇", Dragon: "🐉", Snake: "🐍", Horse: "🐎", Goat: "🐐", Monkey: "🐒", Rooster: "🐓", Dog: "🐕", Pig: "🐖" };
const nums = lucky.map((a) => ({ a, ...forSign(a, date) }));
const yr = (a) => `ឆ្នាំ${sign(a).nameKm}`;
const enUrl = `https://mybirthsign.com/blog/daily-fortune-${date}`;
const kmUrl = `https://mybirthsign.com/km/blog/daily-fortune-${date}`;

const km = [
  `🌙 <b>ជោគជតារាសីប្រចាំថ្ងៃ – ${D}</b>`,
  `${EMO[F.dayAnimal]} ថ្ងៃនេះជាថ្ងៃ${yr(F.dayAnimal)}`,
  "",
  `✨ ឆ្នាំសំណាងថ្ងៃនេះ៖ ${lucky.map((a) => `${yr(a)} (${sign(a).label.km})`).join(" · ")}`,
  `🔢 លេខសំណាង៖ ${nums.map((n) => `${yr(n.a)} ${n.d2} · ${n.d3}`).join(" | ")}`,
  ...(careful.length ? [`🌿 គួរប្រុងប្រយ័ត្ន៖ ${careful.map(yr).join(" ")} – គួរសម្រាកឲ្យស្រួលខ្លួន និងកុំប្រញាប់សម្រេចចិត្ត។`] : []),
  "",
  `👉 មើលរាសីទាំង 12៖ <a href="${kmUrl}">mybirthsign.com/km</a>`,
];
const en = [
  `<b>Daily Chinese Zodiac Fortune – ${D}</b>`,
  `${EMO[F.dayAnimal]} Today is ${/^[AEIOU]/.test(F.dayAnimal) ? "an" : "a"} ${F.dayAnimal} day.`,
  `✨ Lucky signs: ${lucky.map((a) => `${a} (${sign(a).label.en})`).join(" · ")}`,
  `🔢 Lucky numbers: ${nums.map((n) => `${n.a} ${n.d2} · ${n.d3}`).join(" | ")}`,
  ...(careful.length ? [`🌿 Take it easy: ${careful.join(", ")}`] : []),
  `👉 All 12 signs: <a href="${enUrl}">mybirthsign.com</a>`,
  "",
  "<i>Lucky numbers are for fun only. Traditional zodiac reading for entertainment.</i>",
];
const text = [...km, "", "—", "", ...en].join("\n");   // all text is our own (no < or &), only the tags are HTML

if (dry) { console.log(text); process.exit(0); }

const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML", link_preview_options: { url: enUrl, prefer_large_media: true, show_above_text: true } }),
});
const out = await res.json().catch(() => ({}));
if (!out.ok) { console.error(`Telegram did not accept the post: ${out.description || res.status}`); process.exit(1); }
fs.mkdirSync(path.dirname(markFile), { recursive: true });
fs.writeFileSync(markFile, JSON.stringify({ lastDate: date, messageId: out.result && out.result.message_id }, null, 2) + "\n");
console.log(`Posted ${date} to Telegram (message ${out.result && out.result.message_id}).`);
