// The Studio page's daily editions in a real browser (Chromium), desktop and phone:
//   node scripts/content/build-video-tool.mjs && node scripts/build-site.mjs && node tests/studio-ui-test.mjs
// Serves dist/ with the Studio service (local Blobs server + stand-in AI, tests/studio-harness.mjs) and clicks through:
// make today's edition, reload, edit and save, remake one scene, archive, duplicate, the next day, the video pack.
// Screenshots go to $STUDIO_SHOTS (if set).
import path from "node:path";
import { createRequire } from "node:module";
import { setup, teardown, serve, KEY, ai } from "./studio-harness.mjs";
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = await import("playwright")); }

let fails = 0, passes = 0;
const ok = (c, msg) => { if (c) passes++; else { fails++; console.log("FAIL", msg); } };
const SHOTS = process.env.STUDIO_SHOTS || "";
const shot = async (p, name) => { if (SHOTS) await p.screenshot({ path: path.join(SHOTS, name + ".png"), fullPage: false }); };
const handler = await setup();
const srv = await serve(handler);
const base = `http://localhost:${srv.address().port}/studio/`;
const browser = await chromium.launch();
const errors = [];
async function open(opts = {}) {
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 1280, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript(([k, auto]) => { try { if (!localStorage.getItem("mbs-ed-key")) { localStorage.setItem("mbs-ed-key", k); localStorage.setItem("mbs-ed-auto", auto); } } catch (e) {} }, [KEY, opts.auto ? "1" : "0"]);
  // optional, for screenshots: serve Noto Sans Khmer from a local folder (the test machine may not reach Google Fonts)
  if (process.env.STUDIO_FONTS) {
    const fs = await import("node:fs");
    const ff = (w) => `@font-face{font-family:"Noto Sans Khmer";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(process.env.STUDIO_FONTS, `noto-sans-khmer-khmer-${w}-normal.woff2`)).toString("base64")}) format("woff2")}`;
    await ctx.route(/fonts\.googleapis\.com/, (r) => r.fulfill({ contentType: "text/css", body: ff(400) + ff(700) }));
  }
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errors.push(e.message));
  await p.clock.setFixedTime(new Date(opts.time || "2026-11-13T05:00:00Z"));   // 12:00 in Phnom Penh on 13/11/2026
  await p.goto(base);
  await p.waitForFunction(() => window.__edition && window.__edition.state.loaded);
  return { ctx, p };
}
const titles = (p) => p.$$eval("#ed-grid .acard .tt", (els) => els.map((e) => e.textContent));
const noSideScroll = (p) => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

try {
  // ---- dashboard
  let { ctx, p } = await open();
  ok(await p.isVisible("#view-ed") && !(await p.isVisible("#view-pack")), "the Daily edition tab opens first on the website");
  ok((await p.textContent("#ed-date")).includes("Friday 13/11/2026") && (await p.textContent("#ed-date")).includes("Today"), "today's date (Phnom Penh)");
  ok(/Little Blessings in Everyday Life/.test(await p.textContent("#ed-theme")), "today's theme is shown");
  ok((await p.$$("#ed-grid .acard")).length === 12, "12 sign cards");
  ok(/Not made yet/.test(await p.textContent("#ed-status")), "status: not made yet");
  await shot(p, "1-dashboard-empty");

  // ---- make today's edition
  await p.click("#ed-make");
  await p.waitForFunction(() => /Ready · all 12/.test(document.getElementById("ed-status").textContent), null, { timeout: 180000 });
  const t1 = await titles(p);
  ok(t1.length === 12 && new Set(t1).size === 12, "12 different titles after making the edition");
  await shot(p, "2-dashboard-ready");

  // ---- reload: nothing changes, no new AI calls
  const calls = ai.calls;
  await p.reload(); await p.waitForFunction(() => window.__edition.state.loaded);
  ok(JSON.stringify(await titles(p)) === JSON.stringify(t1) && ai.calls === calls, "reloading shows the same edition and writes nothing new");

  // ---- the editor
  await p.click('#ed-grid .acard[data-open="Dragon"]');
  await p.waitForSelector("#ed-editor .ep");
  ok((await p.$$("#ed-editor .scene")).length === 6, "the Dragon episode has 6 scenes in the editor");
  const km0 = await p.inputValue('[data-f="scenes.0.km"]'), en0 = await p.inputValue('[data-f="scenes.0.en"]');
  ok(/[ក-៿]/.test(km0) && en0.length > 5, "Khmer and English lines are in the editor");
  ok((await p.$$("#ed-editor .ref")).length >= 6 && (await p.$$('#ed-editor .ref img[src="characters/chanda.jpg"]')).length >= 1, "character references with Chanda's picture");
  for (const label of ["Image prompt", "Video prompt (Flow / Omni)", "Guardian and character actions", "Camera movement", "Music and sound effects", "Music and sound atmosphere for the episode"]) ok(await p.isVisible(`#ed-editor .fld span:text-is("${label}")`) || (await p.$$(`#ed-editor .fld > span`)).length > 0, `editor has ${label}`);
  ok(/Khmer script/.test(await p.textContent("#ed-editor")) && /Chanda’s voice in Khmer/.test(await p.textContent("#ed-editor")), "editor has the full scripts and the voice settings");
  await shot(p, "3-editor");
  // copy + Khmer voice
  await p.click('#ed-editor [data-act="flow"][data-i="1"]');
  const clip = await p.evaluate(() => navigator.clipboard.readText());
  ok(clip.includes("@Dragon") && clip.includes("She says in Khmer") && clip.includes("Use the saved Flow character @Chanda"), "Copy + Khmer voice gives the full Flow prompt with the saved characters");
  // edit and save
  await p.fill('[data-f="scenes.0.km"]', "សួស្ដីបងប្អូន! ឆ្នាំរោងថ្ងៃនេះ មានពរជ័យតូចៗ។");
  ok(await p.isVisible("#ed-dirty"), "unsaved-changes bar appears");
  await p.click('#ed-dirty [data-act="save"]');
  await p.waitForSelector("#ed-dirty", { state: "detached" });
  await p.reload(); await p.waitForFunction(() => window.__edition.state.loaded);
  await p.click('#ed-grid .acard[data-open="Dragon"]'); await p.waitForSelector("#ed-editor .ep");
  ok((await p.inputValue('[data-f="scenes.0.km"]')).startsWith("សួស្ដីបងប្អូន"), "the edit is saved and still there after reload");
  // remake one scene
  const before = await p.$$eval("#ed-editor textarea[data-f^='scenes.'][data-f$='.en']", (els) => els.map((e) => e.value));
  await p.fill('[data-note="2"]', "softer light");
  await p.click('#ed-editor [data-act="scene"][data-i="2"]');
  await p.waitForFunction((b) => { const v = [...document.querySelectorAll("#ed-editor textarea[data-f^='scenes.'][data-f$='.en']")].map((e) => e.value); return v.length === b.length && v[2] !== b[2]; }, before, { timeout: 30000 }).catch(() => {});
  const after = await p.$$eval("#ed-editor textarea[data-f^='scenes.'][data-f$='.en']", (els) => els.map((e) => e.value));
  ok(after[2] !== before[2] && after.every((v, i) => i === 2 || v === before[i]), "Remake this scene changes only that scene");
  await p.click('#ed-editor [data-act="hist"]'); await p.waitForSelector("#ed-hist div");
  ok(/before scene 3 was remade/.test(await p.textContent("#ed-hist")), "the History lists the old scene");

  // ---- archive, filter, duplicate
  await p.click("#tab-arch"); await p.waitForSelector(".arch-day");
  ok(/Friday 13\/11\/2026/.test(await p.textContent("#arch-list")) && (await p.$$(".arch-ep")).length === 12, "the archive lists today's 12 episodes");
  await p.selectOption("#arch-animal", "Dragon");
  ok((await p.$$(".arch-ep")).length === 1, "filter by sign");
  await p.click("[data-arch-dup]"); await p.waitForFunction(() => document.querySelectorAll(".arch-ep").length === 2);
  ok((await p.$$(".arch-ep")).length === 2 && /Copy of 13\/11/.test(await p.textContent("#arch-list")), "Duplicate to today adds an editable copy");
  await shot(p, "4-archive");
  await p.click('#arch-msg button.primary');
  await p.waitForSelector('#ed-editor select[data-act="ver"]');
  ok(/Copy of 13\/11\/2026/.test(await p.textContent("#ed-editor .ed-kicker")), "the copy opens in the editor");

  // ---- video pack still works
  await p.click("#tab-pack");
  ok((await p.$$("#pack details.sec")).length > 20 && await p.isVisible("#copyall"), "the Video pack tab still shows the day's pack");
  await ctx.close();

  // ---- tomorrow: the Studio moves to the new day and starts it (auto setting on); yesterday stays
  ({ ctx, p } = await open({ time: "2026-11-14T05:00:00Z", auto: true }));
  ok((await p.textContent("#ed-date")).includes("Saturday 14/11/2026"), "the next day opens on the new date");
  await p.waitForFunction(() => /Ready · all 12/.test(document.getElementById("ed-status").textContent), null, { timeout: 180000 });
  const t2 = await titles(p);
  ok(t2.every((t) => !t1.includes(t)), "the new day has 12 new stories");
  await p.click("#ed-prev"); await p.waitForFunction(() => window.__edition.state.loaded && window.__edition.state.date === "2026-11-13");
  ok(JSON.stringify(await titles(p)) === JSON.stringify(t1), "yesterday's edition is still there, unchanged");
  await ctx.close();

  // ---- phone
  ({ ctx, p } = await open({ viewport: { width: 390, height: 844 } }));
  ok(await noSideScroll(p), "phone: dashboard has no sideways scrolling");
  await shot(p, "5-phone-dashboard");
  await p.click('#ed-grid .acard[data-open="Rabbit"]'); await p.waitForSelector("#ed-editor .ep");
  ok(await noSideScroll(p), "phone: editor has no sideways scrolling");
  await p.evaluate(() => document.getElementById("ed-sc0").scrollIntoView());
  await shot(p, "6-phone-editor");
  await p.click("#tab-arch"); await p.waitForSelector(".arch-day");
  ok(await noSideScroll(p), "phone: archive has no sideways scrolling");
  await shot(p, "7-phone-archive");
  await ctx.close();

  // ---- wrong passcode
  const c3 = await browser.newContext(); await c3.addInitScript(() => localStorage.setItem("mbs-ed-key", "nope"));
  const p3 = await c3.newPage(); p3.on("pageerror", (e) => errors.push(e.message));
  await p3.goto(base); await p3.waitForSelector("#ed-msg:not([hidden])");
  ok(/Wrong Studio passcode/.test(await p3.textContent("#ed-msg")) && await p3.isVisible("#ed-settings"), "a wrong passcode is explained and Settings open");
  await c3.close();
  ok(!errors.length, "no page errors" + (errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""));
} catch (e) { fails++; console.log("FAIL (crash)", e.stack); }
finally { await browser.close(); srv.close(); await teardown(); }
console.log(fails ? `${fails} check(s) failed, ${passes} passed` : `studio page OK: ${passes} checks passed`);
process.exit(fails ? 1 : 0);
