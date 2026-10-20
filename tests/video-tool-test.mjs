// The browser video tool must give exactly the same pack as the command line.
//   node scripts/content/build-video-tool.mjs && node tests/video-tool-test.mjs
// Loads docs/video-prompts/video-pack-tool.html in Chromium and compares window.__pack(iso) with
// buildPack(iso, computeFacts(iso), forSign, null) for 400 consecutive days.
import path from "node:path";
import { createRequire } from "node:module";
import { computeFacts, ROOT, INFO, KM_INFO } from "../scripts/daily-data-lib.mjs";
import { buildPack } from "../scripts/content/video-pack-lib.mjs";

const require = createRequire(import.meta.url);
const { forSign } = require("../js/lucky-digits.js");
let chromium;
try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = await import("playwright")); }

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("file://" + path.join(ROOT, "docs", "video-prompts", "video-pack-tool.html"));
await page.waitForFunction(() => typeof window.__pack === "function");

const start = Date.parse("2026-10-01T00:00:00Z");
const dates = Array.from({ length: 400 }, (_, i) => new Date(start + i * 86400000).toISOString().slice(0, 10));
const got = await page.evaluate((ds) => ds.map((d) => window.__pack(d)), dates);
let bad = 0;
dates.forEach((d, i) => {
  const want = buildPack(d, computeFacts(d), forSign, null, { INFO, KM_INFO });
  for (const k of ["md", "srtKm", "srtEn", "srtVid"]) if (JSON.stringify(got[i][k]) !== JSON.stringify(want[k])) { bad++; if (bad < 5) console.error(`DIFF ${d} ${k}`); }
});
const sections = await page.locator("details.sec").count();
await browser.close();
if (errors.length) { console.error("page errors:", errors); process.exit(1); }
if (bad) { console.error(`${bad} differences`); process.exit(1); }
if (sections < 10) { console.error(`only ${sections} sections rendered`); process.exit(1); }
console.log(`video tool OK: ${dates.length} days identical to the command line, ${sections} sections rendered`);
