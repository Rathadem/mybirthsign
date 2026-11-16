// The Studio's "Update voice-over" for the 60-second video (16/11/2026): buildPack(..., edits) puts the owner's words
// and the AI's picture into one scene; that scene's prompt, the voice-over section and both 60s subtitle files change
// together, and nothing else in the pack changes. Run: node tests/voice-edit-test.mjs
import { createRequire } from "node:module";
import { computeFacts, ROOT, INFO, KM_INFO } from "../scripts/daily-data-lib.mjs";
import { buildPack, kmFlow } from "../scripts/content/video-pack-lib.mjs";
import { EARLY_COPY } from "../scripts/content/early-card-copy.mjs";
const require = createRequire(import.meta.url);
const { forSign } = require("../js/lucky-digits.js");
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else { fails++; console.log("FAIL", m); } };
const P = { INFO, KM_INFO, COPY: EARLY_COPY };
const sections = (md) => Object.fromEntries(md.split(/\n(?=## )/).map((x) => [x.split("\n")[0], x]));

for (const d of ["2026-11-16", "2026-11-20", "2027-02-06"]) {
  const F = computeFacts(d);
  const p0 = buildPack(d, F, forSign, null, P), p00 = buildPack(d, F, forSign, null, P, null);
  ok(p0.md === p00.md && JSON.stringify(p0.srtVid) === JSON.stringify(p00.srtVid), `${d}: without edits the pack is unchanged`);
  ok(p0.v60 && p0.v60.scenes.length === 8 && p0.v60.scenes.every((s) => s.km && s.en && s.picture && !s.edited), `${d}: the 60s video's 8 scenes are listed for the panel`);
  ok(p0.v60.scenes[0].onCam && p0.v60.scenes[7].onCam && !p0.v60.scenes[3].onCam, `${d}: Chanda on camera in scenes 1 and 8`);
  ok(p0.v60.scenes.every((s) => !/Use the saved Flow character|moves like a real, living animal/.test(s.picture)) && /@Chanda/.test(p0.v60.scenes[0].picture) && !/a beautiful Cambodian woman/.test(p0.v60.scenes[0].picture), `${d}: the picture the AI sees has no fixed lines (Chanda as @Chanda)`);

  const km = "ត្រៀមបើកទ្វារផ្ទះ ដើម្បីទទួលមាសប្រាក់ និងសំណាង", en = "Get ready to open your door and welcome gold, money and good luck.";
  const pic = `@${F.dayAnimal} opens the tall temple doors and gold coins and paper money fly around in a glowing spiral, landing gently in the hands of everyone born in the Year of the ${F.dayAnimal}. Slow push-in.`;
  const p1 = buildPack(d, F, forSign, null, P, { "60s": { 3: { km, en, picture: pic } } });
  const s0 = sections(p0.md), s1 = sections(p1.md);
  const k60 = Object.keys(s1).find((t) => /^## 60-second video/.test(t)), kVo = Object.keys(s1).find((t) => /^## Voice-over – 80-second video/.test(t));
  const sc4 = s1[k60].split("\n### ").find((b) => b.startsWith("Scene 4 "));
  ok(/^Scene 4 – .* · your voice-over\n/.test(sc4), `${d}: scene 4 is marked as your voice-over`);
  ok(sc4.includes(pic) && sc4.includes("moves like a real, living animal") && sc4.includes(`Use the saved Flow character @${F.dayAnimal} exactly`) && /Sky: /.test(sc4), `${d}: scene 4's prompt is the new picture, with the saved character, the animal's movement and the sky`);
  ok(sc4.includes(`She says: "${en}"`) && sc4.includes(`She says in Khmer: "${kmFlow(km)}"`), `${d}: both copy-with-voice lines say the new words`);
  ok(s1[kVo].includes(`Scene 4 (0:30–0:40)\n${en}`) && s1[kVo].includes(`Scene 4 (0:30–0:40)\n${km}`), `${d}: the voice-over section has the new words`);
  ok(p1.srtVid["60s"].km.includes("ត្រៀមបើកទ្វារផ្ទះ") && p1.srtVid["60s"].en.includes("welcome gold") && !p0.srtVid["60s"].km.includes("ត្រៀមបើកទ្វារផ្ទះ"), `${d}: the 60s subtitle files have the new words`);
  ok(Object.keys(p0.srtVid).filter((id) => id !== "60s").every((id) => JSON.stringify(p0.srtVid[id]) === JSON.stringify(p1.srtVid[id])), `${d}: the other videos' subtitles are unchanged`);
  ok(Object.keys(s0).filter((t) => t !== k60 && t !== kVo).every((t) => s0[t] === s1[t]), `${d}: every other section of the pack is unchanged`);
  const other = (s) => s[k60].split("\n### ").filter((b) => !b.startsWith("Scene 4 "));
  ok(JSON.stringify(other(s0)) === JSON.stringify(other(s1)), `${d}: the other 7 scenes are unchanged`);
  ok(p1.v60.scenes[3].edited && p1.v60.scenes[3].km === km && p1.v60.scenes[3].original.km === p0.v60.scenes[3].km && p1.v60.scenes[3].picture.startsWith(pic), `${d}: the panel sees the new words and the original ones`);
  // scene 1 (Chanda on camera) keeps her saved-character line
  const p2 = buildPack(d, F, forSign, null, P, { "60s": { 0: { km, en, picture: `@Chanda smiles and opens her hands; behind her @${F.dayAnimal} scatters gold.` } } });
  const sc1 = sections(p2.md)[k60].split("\n### ").find((b) => b.startsWith("Scene 1 "));
  ok(sc1.includes("Use the saved Flow character @Chanda exactly as she is") && sc1.includes("Chanda is on camera and speaks"), `${d}: an on-camera scene keeps Chanda's saved character and lip-sync`);
  // incomplete edits are ignored
  ok(buildPack(d, F, forSign, null, P, { "60s": { 2: { km } }, "nope": { 1: { km, en, picture: pic } } }).md === p0.md, `${d}: incomplete edits, and unknown videos, change nothing`);
  // every video with a scene list (the same evening: "to all")
  ok(p0.vids.map((v) => v.id).join() === "60s,180s,long,story,easy,yt8", `${d}: the panel lists all six videos`);
  const order = p0.md.split(/\n(?=## )/).map((x) => x.split("\n")[0]);
  for (const v of p0.vids) {
    const i = Math.min(5, v.scenes.length - 2), sc = v.scenes[i];
    const pv = buildPack(d, F, forSign, null, P, { [v.id]: { [i]: { km, en, picture: `@${sc.animal} acts out the new words for ${v.id}.` } } });
    const S0 = sections(p0.md), S1 = sections(pv.md), vt = "## " + v.name, vo = order[order.indexOf(vt) + 1];
    ok(/^## Voice-over/.test(vo), `${d} ${v.id}: its voice-over section follows it`);
    const blk = (S, n) => S[vt].split("\n### ").find((b) => b.startsWith(`Scene ${n} `)) || "";
    const b0 = blk(S0, i + 1), b1 = blk(S1, i + 1);
    const fixed0 = (b0.split("\n")[1].match(/[^.!?]*saved Flow character[^.!?]*\./g) || []).map((x) => x.trim());
    ok(/ · your voice-over\n/.test(b1) && b1.includes(`@${sc.animal} acts out the new words for ${v.id}.`) && fixed0.every((f) => b1.includes(f)), `${d} ${v.id}: scene ${i + 1} has the new picture and keeps its saved-character lines (${fixed0.length})`);
    ok(b1.includes(`She says: "${en}"`) && S1[vo].includes(km) && pv.srtVid[v.id].km.includes("ត្រៀមបើកទ្វារផ្ទះ"), `${d} ${v.id}: the voice lines, the voice-over section and the subtitles have the new words`);
    ok(Object.keys(S0).filter((t) => t !== vt && t !== vo).every((t) => S0[t] === S1[t]) && Object.keys(p0.srtVid).filter((x) => x !== v.id).every((x) => JSON.stringify(p0.srtVid[x]) === JSON.stringify(pv.srtVid[x])), `${d} ${v.id}: nothing else in the pack changed`);
    ok(pv.vids.find((x) => x.id === v.id).scenes[i].edited && pv.vids.find((x) => x.id === v.id).scenes[i].original.km === sc.km, `${d} ${v.id}: the panel sees the change and the original words`);
  }
}
console.log(fails ? `${fails} check(s) failed, ${passes} passed` : `voice-over edits OK: ${passes} checks passed`);
process.exit(fails ? 1 : 0);
