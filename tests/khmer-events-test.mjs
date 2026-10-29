// js/khmer-events.js (used by the Telegram post) must list the same holidays and Buddhist days as the Khmer Calendar
// page's own "Coming up" box (js/khmer-calendar.js).
//   node scripts/build-site.mjs && node tests/khmer-events-test.mjs
// Opens dist/khmer-calendar.html in Chromium, picks 40 dates across 2026–2027 and compares the six "Coming up" events.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIST = path.join(ROOT, "dist");
let chromium;
try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = await import("playwright")); }
const KE = require("../js/khmer-events.js").make(require("../js/vendor/momentkh.min.js"));

const server = http.createServer((req, res) => {
  let f = path.join(DIST, decodeURIComponent(req.url.split("?")[0]));
  if (!fs.existsSync(f) && fs.existsSync(f + ".html")) f += ".html";
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": f.endsWith(".js") ? "text/javascript" : f.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
await page.goto(`http://127.0.0.1:${server.address().port}/khmer-calendar.html`);
await page.waitForFunction(() => document.querySelectorAll("#upcoming li").length > 0);
const fmt = (iso) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));
let bad = 0, n = 0;
for (let i = 0; i < 40; i++) {
  const iso = new Date(Date.UTC(2026, 0, 3) + i * 18 * 864e5).toISOString().slice(0, 10);
  const got = await page.evaluate((iso) => {
    const el = document.getElementById("dateJump"); el.value = iso; el.dispatchEvent(new Event("change"));
    return [...document.querySelectorAll("#upcoming li")].map((li) => li.querySelector("span").textContent.replace(/^\S+\s+/, "") + " | " + li.querySelector("b").textContent);
  }, iso);
  const want = KE.upcoming(iso, 6).map(([d, e]) => `${KE.EV[e].en} | ${fmt(d)}`);
  n++;
  if (JSON.stringify(got) !== JSON.stringify(want)) { bad++; if (bad < 4) console.error(`DIFF ${iso}\n page: ${got.join("; ")}\n  lib: ${want.join("; ")}`); }
}
await browser.close(); server.close();
if (bad) { console.error(`${bad} of ${n} dates differ`); process.exit(1); }
console.log(`khmer events OK: ${n} dates, same "Coming up" list as the Khmer Calendar page`);
