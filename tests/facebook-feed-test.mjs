// The Khmer Facebook feed for PublishHub (scripts/facebook-feed.mjs), from the real card specs of built fortune pages:
//   node scripts/build-site.mjs && node tests/facebook-feed-test.mjs
import fs from "node:fs";
import path from "node:path";
import { facebookFeed } from "../scripts/facebook-feed.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
let fails = 0, passes = 0;
const ok = (c, msg) => { if (c) passes++; else { fails++; console.log("FAIL", msg); } };
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const RANK = { great: 1, good: 2, caution: 3 };
// the same selection and order as scripts/telegram-cards.mjs
function specsFor(date) {
  const f = path.join(ROOT, "dist", "km", "blog", `daily-fortune-${date}.html`);
  if (!fs.existsSync(f)) return null;
  const out = [], seen = new Set();
  for (const m of fs.readFileSync(f, "utf8").matchAll(/data-share-card="([^"]+)"/g)) {
    let sp; try { sp = JSON.parse(decode(m[1])); } catch (e) { continue; }
    if (!(sp.cardType === "lucky" || (sp.cardType === "daily" && RANK[sp.tier]))) continue;
    const k = sp.cardType + ":" + (sp.animal || ""); if (seen.has(k)) continue; seen.add(k); out.push(sp);
  }
  return out.sort((a, b) => (a.cardType === "lucky" ? 0 : RANK[a.tier]) - (b.cardType === "lucky" ? 0 : RANK[b.tier]));
}
const dates = fs.readdirSync(path.join(ROOT, "dist", "km", "blog")).map((f) => (/^daily-fortune-(\d{4}-\d{2}-\d{2})\.html$/.exec(f) || [])[1]).filter(Boolean).sort().slice(-20);
ok(dates.length >= 5, "built Khmer fortune pages found");
for (const date of dates) {
  // as scripts/telegram-cards.mjs: the daily cards are the Facebook copies without the lucky number
  const specs = specsFor(date), files = specs.map((s, i) => (s.cardType === "daily" ? `${i + 1}-km-fb.jpg` : `${i + 1}-km.jpg`));
  const feed = facebookFeed(date, specs, files);
  const dmy = date.split("-").reverse().join("/");
  ok(feed.time === "06:00" && feed.timezone === "Asia/Phnom_Penh" && feed.lang === "km", `${date}: 06:00 Cambodia time, Khmer`);
  ok(feed.posts.map((p) => p.key).join() === ["lucky", "good", "careful"].filter((k) => k !== "careful" || specs.some((s) => s.tier === "caution")).join(), `${date}: posts lucky, good, careful (${feed.posts.map((p) => p.key)})`);
  const used = feed.posts.flatMap((p) => p.images);
  ok(used.length === files.length && new Set(used).size === used.length, `${date}: every card is used once`);
  const good = feed.posts.find((p) => p.key === "good");
  ok(good && good.images.length === specs.filter((s) => s.tier === "great" || s.tier === "good").length, `${date}: the good post has all Great Day and Good Day cards`);
  for (const p of feed.posts) {
    ok(p.caption.includes(`https://mybirthsign.com/km/blog/daily-fortune-${date}`) && p.caption.includes(dmy), `${date} ${p.key}: link and date`);
    ok(/[ក-៿]/.test(p.caption) && p.caption.length < 2000, `${date} ${p.key}: Khmer caption of a sensible length`);
    // Facebook-safe: no lucky numbers (the only digits are the date, the link and "12" signs)
    const digits = p.caption.replace(/https?:\/\/\S+/g, "").replace(dmy, "").replace("ទាំង 12", "");
    ok(!/\d/.test(digits), `${date} ${p.key}: no numbers besides the date (Facebook-safe)`);
    ok(!/ភ្នាល់|ឆ្នោត|ល្បែង|lottery|betting|gambl/i.test(p.caption), `${date} ${p.key}: no betting words`);
    ok(p.images.every((f) => /^\d-km(-fb)?\.jpg$/.test(f)), `${date} ${p.key}: Khmer card files`);
    ok(p.key === "lucky" ? p.images.every((f) => /^\d-km\.jpg$/.test(f)) : p.images.every((f) => /-km-fb\.jpg$/.test(f)), `${date} ${p.key}: daily cards are the copies without the lucky number`);
  }
  const lucky = feed.posts[0], top = specs[0].topNames.map((n) => "ឆ្នាំ" + n);
  ok(top.every((n) => lucky.caption.includes(n)), `${date}: the lucky post names the lucky signs`);
}
// no Khmer cards that day: no posts
ok(facebookFeed("2026-11-15", [], []).posts.length === 0, "no cards, no posts");
console.log(fails ? `${fails} check(s) failed, ${passes} passed` : `facebook feed OK: ${passes} checks on ${dates.length} days`);
process.exit(fails ? 1 : 0);
