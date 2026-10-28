// Draws the day's share cards for the Telegram channel: the same 5 cards as the Video Studio (lucky signs of the day,
// the Great Day sign, the two Good Day signs and the sign to take it easy), in Khmer and in English, "Feed post" size.
// It opens the built site (dist/) in a headless browser and uses the site's own js/share-cards.js, so the cards are
// exactly the ones the Studio shows. The daily GitHub job runs it and stores the pictures on the "telegram-cards"
// branch; netlify/functions/telegram-daily.mjs sends them after the day's text post.
//
//   node scripts/build-site.mjs && node scripts/telegram-cards.mjs --date 2026-10-29 --out tg-cards
//
// Writes <out>/<date>/1-km.jpg … 5-km.jpg, 1-en.jpg … 5-en.jpg and <out>/<date>/cards.json (file list with titles).
// If the fortune page for the date is not built, it writes nothing and exits normally (the text post still goes out).
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIST = path.join(ROOT, "dist");
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const date = opt("--date"), out = path.resolve(opt("--out", "tg-cards"));
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) { console.error("Usage: node scripts/telegram-cards.mjs --date YYYY-MM-DD [--out dir]"); process.exit(1); }

let chromium;
try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = await import("playwright")); }

// the card specs, exactly as the fortune page publishes them for the Studio (data-share-card="…")
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const RANK = { great: 1, good: 2, caution: 3 };
function specsFor(lang) {
  const file = path.join(DIST, lang === "en" ? "" : lang, "blog", `daily-fortune-${date}.html`);
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8"), specs = [], seen = new Set();
  for (const m of html.matchAll(/data-share-card="([^"]+)"/g)) {
    let sp; try { sp = JSON.parse(decode(m[1])); } catch (e) { continue; }
    if (!(sp.cardType === "lucky" || (sp.cardType === "daily" && RANK[sp.tier]))) continue;
    const key = sp.cardType + ":" + (sp.animal || "");
    if (seen.has(key)) continue;
    seen.add(key); sp.iso = sp.iso || date; specs.push(sp);
  }
  return specs.sort((a, b) => (a.cardType === "lucky" ? 0 : RANK[a.tier]) - (b.cardType === "lucky" ? 0 : RANK[b.tier]));
}
const langs = ["km", "en"].map((l) => [l, specsFor(l)]).filter(([, s]) => s && s.length);
if (!langs.length) { console.log(`telegram-cards: no fortune page for ${date} in dist/; nothing drawn.`); process.exit(0); }

// a small static server for dist/ (the Khmer and Chinese folders share the root css/js/images, like on Netlify)
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]).replace(/^\/(km|zh)\/(css|js|images|data)\//, "/$2/");
  if (p.endsWith("/")) p += "index.html";
  let f = path.join(DIST, p);
  if (!f.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(f) && fs.existsSync(f + ".html")) f += ".html";
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("page error:", e.message));
await page.goto(base + "/", { waitUntil: "domcontentloaded" });
await page.addStyleTag({ url: "https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Kantumruy+Pro:wght@400;600;700&family=Moul&display=block" }).catch(() => {});
await page.addScriptTag({ url: base + "/js/lucky-digits.js" }).catch(() => {});
await page.addScriptTag({ url: base + "/js/share-cards.js" });
await page.waitForFunction(() => !!window.MBSShareCards);

const dir = path.join(out, date);
fs.mkdirSync(dir, { recursive: true });
const list = [];
// the Khmer web fonts must be loaded, or Khmer letters come out broken: never send broken Khmer cards
const khmerOk = await page.evaluate(async () => {
  const want = ['400 30px "Noto Sans Khmer"', '700 30px "Noto Sans Khmer"', '400 30px "Kantumruy Pro"', '700 30px "Kantumruy Pro"', '400 30px "Moul"'];
  try { await Promise.all(want.map((f) => document.fonts.load(f, "ក្ខ"))); await document.fonts.ready; } catch (e) { /* checked below */ }
  const loaded = (fam) => [...document.fonts].some((f) => f.family.replace(/["']/g, "") === fam && f.status === "loaded");
  return loaded("Noto Sans Khmer") && loaded("Kantumruy Pro");
});
for (const [lang, specs] of langs) {
  if (lang === "km" && !khmerOk) { console.error("telegram-cards: Khmer fonts did not load; Khmer cards skipped."); continue; }
  const jpgs = await page.evaluate(async (specs) => {
    try { await document.fonts.ready; } catch (e) { /* drawn with fallback fonts */ }
    const res = [];
    for (const sp of specs) {
      const png = await window.MBSShareCards[sp.cardType](sp, "portrait");
      const im = await createImageBitmap(png), c = document.createElement("canvas");
      c.width = im.width; c.height = im.height;
      const x = c.getContext("2d"); x.fillStyle = "#0b0826"; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0);
      res.push(c.toDataURL("image/jpeg", 0.9));
    }
    return res;
  }, specs);
  jpgs.forEach((d, i) => {
    const sp = specs[i], file = `${i + 1}-${lang}.jpg`;
    fs.writeFileSync(path.join(dir, file), Buffer.from(d.split(",")[1], "base64"));
    list.push({ file, lang, title: sp.cardType === "lucky" ? "Lucky signs today" : `${sp.name || sp.animal} · ${sp.label || ""}` });
  });
}
fs.writeFileSync(path.join(dir, "cards.json"), JSON.stringify({ date, cards: list }, null, 2) + "\n");
await browser.close();
server.close();
console.log(`telegram-cards: ${list.length} cards for ${date} in ${dir}`);
