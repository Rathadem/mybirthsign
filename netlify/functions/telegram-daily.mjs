// netlify/functions/telegram-daily.mjs
//
// Scheduled: posts the day's zodiac fortune to the MyBirthSign Telegram channel (Khmer first, then English),
// every day at 23:00 UTC = 06:00 in Cambodia (the owner's chosen time), well after the new day's fortune page and cards are live.
//
// Netlify environment variables (Site configuration > Environment variables, marked secret; never in code):
//   TELEGRAM_BOT_TOKEN  the bot token from @BotFather
//   TELEGRAM_CHAT_ID    optional: the channel's @username or numeric id. If it is not set, the function finds
//                       the channel the bot was most recently made admin of (Telegram keeps that notice for
//                       about 24 hours), so setting it is recommended.
// The facts come from the day's published data file (/data/daily/<date>.json, made by the daily GitHub job from
// the site's fixed rules); lucky numbers from js/lucky-digits.js, the same as on the website.
// After the text, the day's share cards (the Video Studio's 5 cards, Khmer and English) go out as one photo album. They are
// drawn by the daily GitHub job (scripts/telegram-cards.mjs) and kept on the "telegram-cards" branch of the site's
// public repository; if they are missing, only the text is posted.
// The response status shows the outcome in Netlify's request logs: 200 posted, 503 no token, 409 no channel,
// 424 no data file, 425 old data, 401 bad token, 403 bot is not allowed to post, 400 channel not found, 502 other.
import luckyDigits from "../../js/lucky-digits.js";
import momentkh from "../../js/vendor/momentkh.min.js";
import khmerEvents from "../../js/khmer-events.js";

// Khmer calendar lines (same rules as the Khmer Calendar page): lunar date, holy day, today's holiday, the next 7 days
const KE = khmerEvents.make(momentkh);
const addDays = (iso, n) => new Date(Date.parse(iso + "T00:00:00Z") + n * 864e5).toISOString().slice(0, 10);
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function calendarLines(date) {
  const today = KE.eventsOn(date), EV = KE.EV, url = (e, l) => `${SITE}${l === "km" ? "/km" : ""}/blog/${EV[e].blog}`;
  const soon = KE.upcoming(addDays(date, 1), 2, 7).filter(([, e]) => !today.includes(e));
  const daysTo = (d) => Math.round((Date.parse(d) - Date.parse(date)) / 864e5);
  const dm = (d) => d.slice(8, 10) + "/" + d.slice(5, 7);
  const km = [`🌙 ចន្ទគតិ៖ ${KE.lunarKm(date)}`];
  const en = [`🌙 Khmer lunar date: ${KE.lunarEn(date)}`];
  // holy days (Thngai Sil): 8th and 15th waxing, 8th waning and the last waning day; reminded the day before too
  const SIL = `${SITE}/blog/cambodian-buddhist-holy-days`, SIL_KM = `${SITE}/km/blog/cambodian-buddhist-holy-days`;
  const moon = (d) => { const k = momentkh.fromGregorian(...d.split("-").map(Number)).khmer; return k.moonPhase === 0 ? (k.day === 15 ? "🌕" : "🌓") : k.day === 8 ? "🌗" : "🌑"; };
  if (KE.isSil(date)) { km.push(`🙏 ថ្ងៃនេះជាថ្ងៃសីល ${moon(date)} – <a href="${SIL_KM}">អានបន្ថែម</a>`); en.push(`🙏 Today is a Buddhist holy day (Thngai Sil) ${moon(date)} – <a href="${SIL}">read more</a>`); }
  else if (KE.isSil(addDays(date, 1))) { km.push(`🙏 ថ្ងៃស្អែកជាថ្ងៃសីល ${moon(addDays(date, 1))}`); en.push(`🙏 Tomorrow is a Buddhist holy day (Thngai Sil) ${moon(addDays(date, 1))}`); }
  for (const e of today) {
    km.push(`${EV[e].i} ថ្ងៃនេះ៖ ${EV[e].km}${EV[e].blog ? ` – <a href="${url(e, "km")}">អានបន្ថែម</a>` : ""}`);
    en.push(`${EV[e].i} Today: ${EV[e].en}${EV[e].blog ? ` – <a href="${url(e, "en")}">read more</a>` : ""}`);
  }
  for (const [d, e] of soon) {
    const n = daysTo(d);
    km.push(`📅 ជិតមកដល់៖ ${EV[e].km} – ${dm(d)} (${n === 1 ? "ថ្ងៃស្អែក" : `${n} ថ្ងៃទៀត`})`);
    en.push(`📅 Coming up: ${EV[e].en} – ${Number(d.slice(8, 10))} ${MON[Number(d.slice(5, 7)) - 1]} (${n === 1 ? "tomorrow" : `in ${n} days`})`);
  }
  return { km, en };
}

const SITE = "https://mybirthsign.com";
const CARDS = process.env.TELEGRAM_CARDS_BASE || "https://raw.githubusercontent.com/Rathadem/mybirthsign/telegram-cards";
const TG_API = process.env.TELEGRAM_API_BASE || "https://api.telegram.org";
const EMO = { Rat: "🐀", Ox: "🐂", Tiger: "🐯", Rabbit: "🐇", Dragon: "🐉", Snake: "🐍", Horse: "🐎", Goat: "🐐", Monkey: "🐒", Rooster: "🐓", Dog: "🐕", Pig: "🐖" };

const cambodiaToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

async function tg(token, method, body) {
  const res = await fetch(`${TG_API}/bot${token}/${method}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}),
  });
  return res.json().catch(() => ({ ok: false, description: `HTTP ${res.status}` }));
}

async function findChannel(token) {
  const up = await tg(token, "getUpdates", { allowed_updates: ["my_chat_member", "channel_post"] });
  if (!up.ok) return null;
  for (const u of (up.result || []).slice().reverse()) {
    const chat = (u.my_chat_member && u.my_chat_member.chat) || (u.channel_post && u.channel_post.chat);
    if (chat && chat.type === "channel") return chat.username ? `@${chat.username}` : chat.id;
  }
  return null;
}

export function buildMessage(date, data) {
  const sign = (a) => data.signs.find((s) => s.animal === a);
  const lucky = data.highlights.topLucky, careful = data.highlights.careful;
  const yr = (a) => `ឆ្នាំ${sign(a).nameKm}`;
  const nums = lucky.map((a) => ({ a, ...luckyDigits.forSign(a, date) }));
  const D = date.split("-").reverse().join("/");
  const day = data.dayAnimal;
  const enUrl = `${SITE}/blog/daily-fortune-${date}`, kmUrl = `${SITE}/km/blog/daily-fortune-${date}`;
  let cal = { km: [], en: [] };
  try { cal = calendarLines(date); } catch (e) { console.error(`telegram-daily: calendar lines skipped: ${e.message}`); }
  const km = [
    `🌙 <b>ជោគជតារាសីប្រចាំថ្ងៃ – ${D}</b>`,
    `${EMO[day]} ថ្ងៃនេះជាថ្ងៃ${yr(day)}`,
    ...cal.km,
    "",
    `✨ ឆ្នាំសំណាងថ្ងៃនេះ៖ ${lucky.map((a) => `${yr(a)} (${sign(a).label.km})`).join(" · ")}`,
    `🔢 លេខសំណាង៖ ${nums.map((n) => `${yr(n.a)} ${n.d2} · ${n.d3}`).join(" | ")}`,
    ...(careful.length ? [`🌿 គួរប្រុងប្រយ័ត្ន៖ ${careful.map(yr).join(" ")} – គួរសម្រាកឲ្យស្រួលខ្លួន និងកុំប្រញាប់សម្រេចចិត្ត។`] : []),
    "",
    `👉 មើលរាសីទាំង 12៖ <a href="${kmUrl}">mybirthsign.com/km</a>`,
  ];
  const en = [
    `<b>Daily Chinese Zodiac Fortune – ${D}</b>`,
    `${EMO[day]} Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day.`,
    ...cal.en,
    `✨ Lucky signs: ${lucky.map((a) => `${a} (${sign(a).label.en})`).join(" · ")}`,
    `🔢 Lucky numbers: ${nums.map((n) => `${n.a} ${n.d2} · ${n.d3}`).join(" | ")}`,
    ...(careful.length ? [`🌿 Take it easy: ${careful.join(", ")}`] : []),
    `👉 All 12 signs: <a href="${enUrl}">mybirthsign.com</a>`,
    "",
    "<i>Lucky numbers are for fun only. Traditional zodiac reading for entertainment.</i>",
  ];
  // the big picture above the text: the day animal (images/telegram/<animal>.jpg, from the site's own zodiac art)
  return { text: [...km, "", "—", "", ...en].join("\n"), previewUrl: `${SITE}/images/telegram/${day.toLowerCase()}.jpg` };
}

// the day's cards as one album (2 to 10 photos), uploaded straight to Telegram; returns a short note for the log
export async function sendCards(token, chat, date) {
  const r = await fetch(`${CARDS}/${date}/cards.json`, { headers: { "Cache-Control": "no-cache" } }).catch(() => null);
  if (!r || !r.ok) return `no cards for ${date} (${r ? r.status : "unreachable"})`;
  const { cards = [] } = await r.json().catch(() => ({}));
  const form = new FormData(), media = [];
  form.append("chat_id", String(chat));
  for (const c of cards.slice(0, 10)) {
    const im = await fetch(`${CARDS}/${date}/${c.file}`).catch(() => null);
    if (!im || !im.ok) continue;
    const key = `card${media.length}`;
    form.append(key, new Blob([await im.arrayBuffer()], { type: "image/jpeg" }), c.file);
    media.push({ type: "photo", media: `attach://${key}`, ...(media.length ? {} : { caption: "🃏 កាតសំណាងប្រចាំថ្ងៃ · Today's lucky cards" }) });
  }
  if (media.length < 2) return `only ${media.length} card(s) for ${date}; album not sent`;
  form.append("media", JSON.stringify(media));
  const res = await fetch(`${TG_API}/bot${token}/sendMediaGroup`, { method: "POST", body: form });
  const out = await res.json().catch(() => ({ ok: false, description: `HTTP ${res.status}` }));
  return out.ok ? `sent ${media.length} cards` : `cards refused: ${out.description}`;
}

export default async () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) { console.log("telegram-daily: TELEGRAM_BOT_TOKEN is not set; nothing posted."); return new Response("not configured: TELEGRAM_BOT_TOKEN missing", { status: 503 }); }
  const chat = process.env.TELEGRAM_CHAT_ID || (await findChannel(token));
  if (!chat) { console.error("telegram-daily: no channel found. Set TELEGRAM_CHAT_ID to the channel @username."); return new Response("no channel: set TELEGRAM_CHAT_ID", { status: 409 }); }
  const date = cambodiaToday();
  // the post time moved from 00:30 to 06:00 on 30/10/2026; that day was already posted at 00:30, so it is not sent twice
  if (date === "2026-10-30") { console.log("telegram-daily: 2026-10-30 was already posted at 00:30 (before the move to 06:00); skipped."); return new Response("already posted 2026-10-30", { status: 200 }); }
  const res = await fetch(`${SITE}/data/daily/${date}.json`, { headers: { "Cache-Control": "no-cache" } });
  if (!res.ok) { console.error(`telegram-daily: no data file for ${date} (HTTP ${res.status}); nothing posted.`); return new Response(`no data file for ${date} (HTTP ${res.status})`, { status: 424 }); }
  const data = await res.json();
  if (data.date !== date) { console.error(`telegram-daily: data file is for ${data.date}, not ${date}; nothing posted.`); return new Response(`data file is for ${data.date}, not ${date}`, { status: 425 }); }
  const { text, previewUrl } = buildMessage(date, data);
  const out = await tg(token, "sendMessage", { chat_id: chat, text, parse_mode: "HTML", link_preview_options: { url: previewUrl, prefer_large_media: true, show_above_text: true } });
  if (!out.ok) { console.error(`telegram-daily: Telegram refused the post to ${chat}: ${out.description}`); return new Response(`Telegram refused (${out.error_code}): ${out.description}`, { status: out.error_code === 401 ? 401 : out.error_code === 403 ? 403 : out.error_code === 400 ? 400 : 502 }); }
  console.log(`telegram-daily: posted ${date} to ${chat} (message ${out.result.message_id}).`);
  const cards = await sendCards(token, chat, date).catch((e) => `cards failed: ${e.message}`);
  console.log(`telegram-daily: ${cards}`);
  return new Response(`posted ${date} (message ${out.result.message_id}); ${cards}`, { status: 200 });
};

export const config = { schedule: "0 23 * * *" };   // 06:00 in Cambodia (UTC+7, no daylight saving)
