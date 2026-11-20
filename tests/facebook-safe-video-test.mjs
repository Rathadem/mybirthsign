// No lucky numbers in the videos and posts made for Facebook (owner's request, 20/11/2026: Facebook made the Page harder
// to find for people under 18, and lucky numbers can look like lottery picks to its checks):
//   the 60-second video (Facebook & TikTok), the take-it-easy video, the 45-second video, the 30-second Omni video,
//   the hero post captions and the Facebook post caption. The YouTube videos keep their numbers.
//   node tests/facebook-safe-video-test.mjs
import { computeFacts, INFO, KM_INFO } from "../scripts/daily-data-lib.mjs";
import { buildPack } from "../scripts/content/video-pack-lib.mjs";
import { EARLY_COPY } from "../scripts/content/early-card-copy.mjs";
import fs from "node:fs";
import { createRequire } from "node:module";
const { forSign } = createRequire(import.meta.url)("../js/lucky-digits.js");

let fails = 0, passes = 0;
const ok = (c, msg) => { if (c) passes++; else { fails++; if (fails <= 12) console.log("FAIL", msg); } };
const NUM_WORDS = /lucky numbers?|\bnumbers?\b|លេខ/i;
// the parts of the daily pack (## headings) that are for Facebook
const FB_PARTS = [/^60-second video/, /^Take-it-easy video/, /^30-second video/, /^Scene \d/, /^On-screen captions/, /^Voice in Google Flow/,
  /^Voice-over – (Khmer|English) \(about 45 seconds\)/, /^Facebook post caption/];
const start = Date.parse("2026-11-01T00:00:00Z");
for (let i = 0; i < 120; i++) {
  const d = new Date(start + i * 86400000).toISOString().slice(0, 10);
  let data = null; try { data = JSON.parse(fs.readFileSync(new URL(`../data/daily/${d}.json`, import.meta.url), "utf8")); } catch (e) { /* not written */ }
  const F = computeFacts(d), P = buildPack(d, F, forSign, data, { INFO, KM_INFO, COPY: EARLY_COPY });
  const lucky = F.highlights.topLucky.map((a) => forSign(a, d));
  // three-digit and longer lucky numbers of the day's lucky signs (shorter ones also appear in times and dates)
  const big = [...new Set(lucky.flatMap((v) => [v.d3, v.d4, v.d5]).map(String))];
  const v60 = P.vids.find((v) => v.id === "60s");
  ok(v60.scenes.length === 8, `${d}: the 60-second video keeps 8 scenes`);
  ok(v60.scenes[6].title === "Make a wish", `${d}: scene 7 of the 60-second video is the wish scene (${v60.scenes[6].title})`);
  for (const v of P.vids.filter((x) => x.id === "60s" || x.id === "easy")) {
    v.scenes.forEach((s, j) => {
      const t = [s.title, s.en, s.km, s.picture].join(" ");
      ok(!NUM_WORDS.test(t), `${d} ${v.id} scene ${j + 1}: no lucky numbers (${t.slice(0, 120)})`);
      ok(!big.some((n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(t)), `${d} ${v.id} scene ${j + 1}: none of today's lucky numbers`);
    });
  }
  for (const part of P.md.split(/^## /m)) {
    if (!FB_PARTS.some((re) => re.test(part))) continue;
    const head = part.split("\n")[0];
    ok(!NUM_WORDS.test(part.replace(/Facebook-safe caption: the lucky numbers are on the website, not in the post[^\n]*/, "").replace(/No lucky numbers in the video[^\n]*/, "").replace("No lucky numbers or colors in this video", "")), `${d} "${head}": no lucky numbers`);
    ok(!big.some((n) => new RegExp(`(^|\\D)${n}(\\D|$)`).test(part)), `${d} "${head}": none of today's lucky numbers`);
  }
  // the hero post captions
  const hero = P.md.split(/^## /m).find((p) => /^Luckiest animal today/.test(p)) || "";
  const caps = hero.split(/^### Caption – /m).slice(1).join("\n");
  ok(caps && !NUM_WORDS.test(caps), `${d}: hero captions have no lucky numbers`);
  // the YouTube videos keep theirs
  ok(P.vids.find((v) => v.id === "180s").scenes.some((s) => /Lucky numbers/.test(s.title)), `${d}: the 180-second YouTube video still has its lucky-numbers scene`);
}
console.log(fails ? `${fails} check(s) failed, ${passes} passed` : `Facebook-safe videos OK: ${passes} checks over 120 days`);
process.exit(fails ? 1 : 0);
