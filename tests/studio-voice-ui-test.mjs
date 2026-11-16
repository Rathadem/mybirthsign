// The Studio's "🎙 Update voice-over" panel in a real browser (Playwright), with the voice service on a local Blobs
// server and a stand-in AI (tests/studio-voice-test.mjs). Build first:
//   node scripts/content/build-video-tool.mjs && node scripts/build-site.mjs && node tests/studio-voice-ui-test.mjs
// STUDIO_SHOTS=<folder> saves screenshots.
import path from "node:path";
import { createRequire } from "node:module";
import { setup, teardown, serve, KEY } from "./studio-voice-test.mjs";
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = await import("playwright")); }
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else { fails++; console.log("FAIL", m); } };
const SHOTS = process.env.STUDIO_SHOTS || "";
const shot = async (p, n) => { if (SHOTS) await p.screenshot({ path: path.join(SHOTS, n + ".png") }); };
const handler = await setup(), srv = await serve(handler), base = `http://localhost:${srv.address().port}/studio/`;
const browser = await chromium.launch(), errors = [];
async function open(o = {}) {
  const ctx = await browser.newContext({ viewport: o.viewport || { width: 1280, height: 900 } });
  if (o.key !== null) await ctx.addInitScript((k) => { try { localStorage.setItem("mbs-studio-key", k); } catch (e) {} }, o.key || KEY);
  const p = await ctx.newPage(); p.on("pageerror", (e) => errors.push(e.message));
  await p.clock.setFixedTime(new Date("2026-11-15T05:00:00Z"));   // 12:00 in Phnom Penh on 15/11: the Studio opens on 16/11
  await p.goto(base); await p.waitForFunction(() => window.__lastPack && window.__lastPack.v60);
  return { ctx, p };
}
const sec60 = (p) => p.evaluate(() => { const d = [...document.querySelectorAll("details.sec")].find((x) => /^60-second video/.test(x.querySelector("h2").textContent)); return d ? d.innerText : ""; });
const scene4 = (p) => p.evaluate(() => { const d = [...document.querySelectorAll("details.sec")].find((x) => /^60-second video/.test(x.querySelector("h2").textContent)); const b = [...d.querySelectorAll(".block")].find((x) => (x.querySelector("h3") || {}).textContent?.startsWith("Scene 4 ")); return b ? b.querySelector("h3").textContent + "\n" + b.querySelector("pre").textContent : ""; });
try {
  let { ctx, p } = await open();
  ok(await p.isVisible("#vobtn") && /Update voice-over/.test(await p.textContent("#vobtn")), "the top bar has 🎙 Update voice-over");
  ok(!(await p.isVisible("#vo")), "the panel is closed at first");
  const orig = await p.evaluate(() => window.__lastPack.v60.scenes.map((s) => ({ km: s.km, en: s.en })));
  const before = await sec60(p), allBefore = await p.evaluate(() => window.__lastMd);
  await p.click("#vobtn"); await p.waitForSelector("#vo-scene");
  ok((await p.$$("#vo-vid option")).length === 6 && (await p.inputValue("#vo-vid")) === "60s" && /16\/11\/2026/.test(await p.textContent("#vo h2")), "the panel offers all 6 videos for 16/11/2026, starting with the 60-second video");
  ok((await p.$$("#vo-scene option")).length === 8, "the 60-second video has 8 scenes to choose from");
  await p.selectOption("#vo-scene", "3");
  ok((await p.textContent("#vo-old")) === orig[3].km && /Original voice-over · scene 4/.test(await p.textContent("#vo .now h3")), "choosing scene 4 shows its original Khmer voice-over in the first column");
  const km = "ត្រៀមបើកទ្វារផ្ទះ ដើម្បីទទួលមាសប្រាក់ និងសំណាង";
  await p.fill("#vo-new", km);
  ok(/spoken characters/.test(await p.textContent("#vo-count")), "the new words are counted against the 10-second clip");
  await shot(p, "vo-1-panel");
  await p.click('#vo [data-vo="go"]');
  await p.waitForSelector("#vo .res", { timeout: 30000 });
  ok(/^✓ Scene 4 now uses your words/.test(await p.textContent("#vo .res")) && /New picture:/.test(await p.textContent("#vo .res")), "the panel shows the result with the new picture");
  const s4 = await scene4(p);
  ok(/^Scene 4 – .* · your voice-over/.test(s4) && s4.includes("acts out the owner's words") && s4.includes(kmFlowLike(km)) && s4.includes("welcome gold"), "scene 4 in the 60s video has the new picture and both voice lines");
  const md = await p.evaluate(() => window.__lastMd), srt = await p.evaluate(() => window.__lastPack.srtVid["60s"].km);
  ok(md.includes(`Scene 4 (0:30–0:40)\n${km}`) && srt.includes("ត្រៀមបើកទ្វារផ្ទះ"), "the voice-over section and the Khmer subtitle file have the new words");
  const strip4 = (t) => t.split("\n### ").filter((b) => !/^Scene 4 /.test(b)).join("\n### ");
  const sec = (m, re) => (m.split(/\n(?=## )/).find((x) => re.test(x)) || "");
  ok(strip4(sec(md, /^## 60-second video/)) === strip4(sec(allBefore, /^## 60-second video/)), "the other 7 scenes did not change");
  ok(md.split(/\n(?=## )/).filter((x) => !/^## 60-second video|^## Voice-over – 80-second video/.test(x)).join() === allBefore.split(/\n(?=## )/).filter((x) => !/^## 60-second video|^## Voice-over – 80-second video/.test(x)).join(), "every other section of the pack is unchanged");
  await p.click('#vo [data-vo="see"]'); await p.waitForTimeout(400);
  ok(await p.evaluate(() => [...document.querySelectorAll("details.sec")].find((x) => /^60-second video/.test(x.querySelector("h2").textContent)).open), "See scene 4 opens the 60-second video");
  await shot(p, "vo-2-done");
  // another video: the long YouTube video (all 12 signs), English words
  await p.click("#vobtn"); await p.click("#vobtn"); await p.waitForSelector("#vo-vid");
  await p.selectOption("#vo-vid", "long");
  const longV = await p.evaluate(() => window.__lastPack.vids.find((v) => v.id === "long"));
  ok((await p.$$("#vo-scene option")).length === longV.scenes.length && (await p.inputValue("#vo-scene")) === "0", "choosing the long video lists its own scenes");
  await p.selectOption("#vo-scene", "6");
  ok((await p.textContent("#vo-old")) === longV.scenes[6].km, "its scene 7 shows its own voice-over");
  const enNew = "Rat friends, open your door today: good luck is on its way.";
  await p.fill("#vo-new", enNew); await p.click('#vo [data-vo="go"]'); await p.waitForSelector("#vo .res", { timeout: 30000 });
  const md2 = await p.evaluate(() => window.__lastMd);
  const longSec = md2.split(/\n(?=## )/).find((x) => x.startsWith("## " + longV.name)), b7 = longSec.split("\n### ").find((b) => b.startsWith("Scene 7 "));
  ok(/ · your voice-over\n/.test(b7) && b7.includes(`She says: "${enNew}"`) && b7.includes("acts out the owner's words") && (await p.evaluate(() => window.__lastPack.srtVid.long.en)).includes("open your door today"), "the long video's scene 7, its subtitles and voice lines have the new words");
  ok(/ · your voice-over/.test(await scene4(p)), "the 60-second video keeps its own change");
  ok(/1 changed/.test(await p.textContent('#vo-vid option[value="long"]')), "the video list shows how many scenes were changed");
  await p.click('#vo [data-vo="reset"]'); await p.waitForSelector("#vo .res");
  ok(!(await p.evaluate(() => window.__lastPack.vids.find((v) => v.id === "long").scenes[6].edited)), "Back to the original works for the long video too");
  await p.selectOption("#vo-vid", "60s");
  // copy + Khmer voice for scene 4 uses the new words
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
  const nineBtn = await p.evaluateHandle(() => { const d = [...document.querySelectorAll("details.sec")].find((x) => /^60-second video/.test(x.querySelector("h2").textContent)); const b = [...d.querySelectorAll(".block")].find((x) => (x.querySelector("h3") || {}).textContent?.startsWith("Scene 4 ")); return b.querySelector('[data-nine="km"]'); });
  await nineBtn.asElement().click();
  ok((await p.evaluate(() => navigator.clipboard.readText())).includes(kmFlowLike(km)), "Copy + Khmer voice copies the new words");
  // saved: another device / a reload sees it
  await ctx.close(); ({ ctx, p } = await open());
  await p.waitForFunction(() => window.__lastPack.v60.scenes[3].edited, null, { timeout: 10000 }).catch(() => {});
  ok(/· your voice-over/.test(await scene4(p)), "after reloading (or on another device) scene 4 still has the new words");
  // back to the original
  await p.click("#vobtn"); await p.waitForSelector("#vo-scene"); await p.selectOption("#vo-scene", "3");
  ok(/Your voice-over now/.test(await p.textContent("#vo .now h3")) && (await p.isVisible('#vo [data-vo="reset"]')), "an edited scene offers Back to the original");
  await p.click('#vo [data-vo="reset"]'); await p.waitForSelector("#vo .res");
  ok((await sec60(p)) === before, "Back to the original restores scene 4 exactly");
  await ctx.close();
  // passcode on a new device
  ({ ctx, p } = await open({ key: null }));
  await p.click("#vobtn"); await p.waitForSelector("#vo-key");
  await p.fill("#vo-key", "wrong"); await p.click('#vo [data-vo="key"]'); await p.waitForSelector("#vo .res");
  ok(/not right/.test(await p.textContent("#vo .res")), "a wrong passcode is refused");
  await p.fill("#vo-key", KEY); await p.click('#vo [data-vo="key"]'); await p.waitForSelector("#vo-scene");
  ok(await p.evaluate(() => localStorage.getItem("mbs-studio-key")) === KEY, "the right passcode opens the panel and is remembered on this device");
  await ctx.close();
  // phone
  ({ ctx, p } = await open({ viewport: { width: 390, height: 844 } }));
  await p.click("#vobtn"); await p.waitForSelector("#vo-scene");
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "phone: the panel has no sideways scrolling");
  await shot(p, "vo-3-phone");
  await ctx.close();
  ok(!errors.length, "no page errors" + (errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""));
} catch (e) { fails++; console.log("FAIL (crash)", e.stack, errors.slice(0, 3).join(" | ")); }
finally { await browser.close(); srv.close(); await teardown(); }
console.log(fails ? `${fails} check(s) failed, ${passes} passed` : `voice-over panel OK: ${passes} checks passed`);
process.exit(fails ? 1 : 0);
function kmFlowLike(t) { return t.replace(/\s*។\s*/g, " ").replace(/ {2,}/g, " ").trim(); }
