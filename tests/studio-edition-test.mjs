// Daily editions of the Video Studio: the API and storage (netlify/functions/studio-edition.mjs).
//   node tests/studio-edition-test.mjs
// Uses a local Netlify Blobs server and a stand-in AI (tests/studio-harness.mjs): the real Claude API is never called,
// so this checks the saving, archive, editing, locking and uniqueness rules, not the quality of real AI writing.
import { createRequire } from "node:module";
import { setup, teardown, ai, KEY } from "./studio-harness.mjs";
import * as E from "../scripts/content/studio-edition-lib.mjs";
import { computeFacts, INFO } from "../scripts/daily-data-lib.mjs";
import { LOCK_HOST, lockAnimal } from "../scripts/content/video-pack-lib.mjs";
const require = createRequire(import.meta.url);
const LD = require("../js/lucky-digits.js");
const KE = require("../js/khmer-events.js").make(require("../js/vendor/momentkh.min.js"));
const MK = require("../js/vendor/momentkh.min.js");

let fails = 0, passes = 0;
const ok = (c, msg) => { if (c) passes++; else { fails++; console.log("FAIL", msg); } };
const handler = await setup();
const call = async (method, data, key = KEY) => {
  const url = "http://localhost/api/studio" + (method === "GET" ? "?" + new URLSearchParams(data) : "");
  const r = await handler(new Request(url, { method, headers: { "content-type": "application/json", ...(key ? { "x-studio-key": key } : {}) }, body: method === "POST" ? JSON.stringify(data) : undefined }));
  return { status: r.status, body: await r.json() };
};
const themeFor = (d) => { const k = MK.fromGregorian(...d.split("-").map(Number)).khmer; return E.dailyTheme(d, { events: KE.eventsOn(d), fullMoon: k.moonPhase === 0 && k.day === 15 }); };
const factsFor = (d, a) => {
  const s = computeFacts(d).signs.find((x) => x.animal === a), n = LD.forSign(a, d);
  return { tier: s.tier, label: s.label, color: s.lucky.color, direction: s.lucky.direction, time: s.lucky.time, number: s.lucky.number, digits: [n.d1, n.d2, n.d3, n.d4, n.d5].map(Number), helper: s.lucky.helperAnimal, traits: INFO[a].traits };
};
async function makeEpisode(date, animal, extra = {}) {
  const p = await call("POST", { op: "plan", date, animal, length: 60, theme: themeFor(date), facts: factsFor(date, animal), tz: "Asia/Phnom_Penh", ...extra });
  if (p.status !== 200) return p;
  let ep = p.body.episode;
  for (let i = 0; i < ep.scenes.length; i++) {
    if (ep.scenes[i].status === "ready" && !extra.force) continue;
    const s = await call("POST", { op: "scene", date, animal, index: i });
    if (s.status !== 200) return s;
    ep = s.body.episode;
  }
  return { status: 200, body: { episode: ep } };
}
const D1 = "2026-11-13", D2 = "2026-11-14";

try {
  // ---- passcode and setup messages
  ok((await call("GET", { op: "status" }, null)).status === 401, "no passcode is refused");
  ok((await call("GET", { op: "status" }, "wrong")).status === 401, "wrong passcode is refused");
  const st = await call("GET", { op: "status" });
  ok(st.status === 200 && st.body.ai === true, "status works with the passcode");
  const saveKey = process.env.STUDIO_KEY; delete process.env.STUDIO_KEY;
  const nk = await call("GET", { op: "status" });
  ok(nk.status === 503 && nk.body.code === "no-studio-key", "without STUDIO_KEY the service says it is not set up");
  process.env.STUDIO_KEY = saveKey;

  // ---- 1, 2, 6, 7: today's edition, all 12 signs, Khmer + English, character lines
  for (const a of E.ED_ANIMALS) { const r = await makeEpisode(D1, a); ok(r.status === 200, `${a}: edition made (${r.status} ${r.body.error || ""})`); }
  const day1 = await call("GET", { op: "day", date: D1 });
  ok(day1.status === 200 && day1.body.day && day1.body.day.theme.id === themeFor(D1).id, "the day keeps its theme");
  const eps = E.ED_ANIMALS.map((a) => day1.body.episodes[a] && day1.body.episodes[a].main);
  ok(eps.every(Boolean), "all 12 signs have an episode");
  ok(eps.every((e) => e && E.episodeStatus(e) === "ready" && e.scenes.length === 6), "every episode has 6 finished scenes");
  ok(eps.every((e) => e.scenes.every((s) => s.km && /[ក-៿]/.test(s.km) && s.en && !/[ក-៿]/.test(s.en))), "every scene has a Khmer line and an English line");
  ok(eps.every((e) => e.title.km && e.blessing.km && e.closing.km && e.title.en && e.blessing.en), "titles, blessings and closings are saved in Khmer and English");
  ok(eps.every((e) => e.scenes.every((s) => s.video.includes(lockAnimal(e.animal)) && s.imagePrompt.includes("never redesign") && s.refs.some((r) => r.name === "@" + e.animal))), "every scene keeps the saved guardian (lock line, reference)");
  ok(eps.every((e) => e.scenes.filter((s) => s.onCam).every((s) => s.video.includes(LOCK_HOST) && s.refs[0].name === "@Chanda")), "Chanda's scenes keep her saved look");
  ok(eps.every((e) => e.scenes.every((s) => !s.onCam || /speaks to the viewer/.test(s.video))), "only Chanda speaks");
  const flow = E.flowText("Dragon", eps[4].scenes[1], "km");
  ok(flow.startsWith(E.ED_STYLE) && /She says in Khmer: "/.test(flow) && !/\d/.test(flow.split('She says in Khmer: "')[1].split('"')[0]), "Copy + Khmer voice: style, prompt and Khmer line with numbers spoken as words");
  ok(eps.every((e) => e.facts && e.facts.color && e.facts.time), "lucky color and time are saved with each sign");
  ok(eps.filter((e) => e.facts.tier === "caution").every((e) => e.facts.digits.length === 5), "take-it-easy facts are kept (the AI is told: no numbers)");
  // unique across the 12 signs
  let worst = 0;
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) worst = Math.max(worst, E.similar(E.planPrint(eps[i]), E.planPrint(eps[j])));
  ok(new Set(eps.map((e) => e.title.en)).size === 12, "12 different titles");
  ok(worst < E.ED_SIMILAR, `the 12 stories are different from each other (closest ${worst})`);

  // ---- 3: refresh does not change anything; asking again does not remake
  const callsBefore = ai.calls;
  const again = await call("GET", { op: "day", date: D1 });
  ok(JSON.stringify(again.body.episodes) === JSON.stringify(day1.body.episodes), "reloading gives exactly the same edition");
  const replan = await call("POST", { op: "plan", date: D1, animal: "Dragon", theme: themeFor(D1), facts: factsFor(D1, "Dragon") });
  ok(replan.status === 200 && replan.body.existed === true && JSON.stringify(replan.body.episode) === JSON.stringify(day1.body.episodes.Dragon.main), "asking for an existing day returns it unchanged");
  ok(ai.calls === callsBefore, "no AI call for an existing edition");

  // ---- 4, 5: the next day is a new edition; the previous day stays
  for (const a of ["Dragon", "Rat", "Pig"]) { const r = await makeEpisode(D2, a); ok(r.status === 200, `${a}: next day's episode made`); }
  const day2 = await call("GET", { op: "day", date: D2 });
  for (const a of ["Dragon", "Rat", "Pig"]) {
    const x = day1.body.episodes[a].main, y = day2.body.episodes[a].main;
    ok(x.title.en !== y.title.en && E.similar(E.planPrint(x), E.planPrint(y)) < E.ED_SIMILAR, `${a}: the next day is a different story (${E.similar(E.planPrint(x), E.planPrint(y))})`);
  }
  ok(day2.body.day.theme.id === themeFor(D2).id && day2.body.day.theme.id !== day1.body.day.theme.id, "the next day has its own theme");
  const arch = await call("GET", { op: "archive" });
  ok(arch.status === 200 && arch.body.days.map((d) => d.date).join() === [D2, D1].join(), "the archive lists both days, newest first");
  ok(arch.body.days.find((d) => d.date === D1).episodes.Dragon.main.status === "ready", "the archive shows each episode's state");
  ok(JSON.stringify((await call("GET", { op: "day", date: D1 })).body.episodes) === JSON.stringify(day1.body.episodes), "the previous day is unchanged");

  // ---- uniqueness: a repeated idea is rejected and rewritten
  const d1Tiger = day1.body.episodes.Tiger.main;
  ai.repeat = { animal: "Tiger", plan: { title_en: d1Tiger.title.en, title_km: d1Tiger.title.km, logline: d1Tiger.logline, hook: d1Tiger.hook, guardian_moment: d1Tiger.guardianMoment, blessing_en: d1Tiger.blessing.en, blessing_km: d1Tiger.blessing.km, closing_en: d1Tiger.closing.en, closing_km: d1Tiger.closing.km, music: d1Tiger.music, beats: d1Tiger.beats } };
  const c0 = ai.calls;
  const tg = await call("POST", { op: "plan", date: D2, animal: "Tiger", theme: themeFor(D2), facts: factsFor(D2, "Tiger") });
  ok(tg.status === 200 && ai.calls - c0 === 2, "a plan that repeats yesterday is sent back once");
  ok(tg.body.episode.title.en !== d1Tiger.title.en && !tg.body.episode.similar, "the accepted plan is a new story");

  // ---- 8: one scene remade, the others untouched
  const before = (await call("GET", { op: "episode", date: D1, animal: "Goat" })).body.episode;
  ai.log.length = 0;
  const rs = await call("POST", { op: "scene", date: D1, animal: "Goat", index: 2, note: "make it rain softly" });
  ok(rs.status === 200, "scene 3 remade");
  const after = rs.body.episode;
  ok(after.scenes.every((s, i) => i === 2 || JSON.stringify(s) === JSON.stringify(before.scenes[i])), "the other 5 scenes are unchanged");
  ok(JSON.stringify({ ...after, scenes: 0, updatedAt: 0 }) === JSON.stringify({ ...before, scenes: 0, updatedAt: 0 }), "the story and blessing are unchanged");
  ok(after.scenes[2].updatedAt !== before.scenes[2].updatedAt, "scene 3 is new");
  const hist = await call("GET", { op: "history", date: D1, animal: "Goat" });
  ok(hist.body.items.length === 1 && hist.body.items[0].action === "scene3", "the old scene 3 is kept in the history");

  // ---- 9: reopen and edit an older edition; stale edits are refused
  const g = await call("GET", { op: "episode", date: D1, animal: "Goat" });
  const edit = { ...g.body.episode, scenes: g.body.episode.scenes.map((s, i) => (i === 0 ? { ...s, km: "សួស្ដីបងប្អូន! ថ្ងៃនេះឆ្នាំមមែមានដំណឹងល្អ។", en: "Hello everyone! Good news for the Goat today." } : s)), title: { en: "The Goat's Garden of Kindness", km: "សួនច្បារនៃចិត្តល្អរបស់ឆ្នាំមមែ" } };
  const sv = await call("POST", { op: "save", date: D1, animal: "Goat", episode: edit, etag: g.body.etag });
  ok(sv.status === 200 && sv.body.episode.scenes[0].km.startsWith("សួស្ដីបងប្អូន") && sv.body.episode.edited, "edits are saved");
  ok((await call("GET", { op: "episode", date: D1, animal: "Goat" })).body.episode.title.en === "The Goat's Garden of Kindness", "the edit is there after reopening");
  const stale = await call("POST", { op: "save", date: D1, animal: "Goat", episode: { ...edit, title: { en: "Old tab", km: "x" } }, etag: g.body.etag });
  ok(stale.status === 409 && stale.body.code === "conflict", "an edit from an out-of-date window is refused, not overwritten");
  ok((await call("GET", { op: "episode", date: D1, animal: "Goat" })).body.episode.title.en === "The Goat's Garden of Kindness", "the saved version is kept");
  const sneaky = await call("POST", { op: "save", date: D1, animal: "Goat", episode: { ...sv.body.episode, animal: "Rat", date: "2020-01-01", scenes: sv.body.episode.scenes.map((s) => ({ ...s, start: 99 })) }, etag: sv.body.etag });
  ok(sneaky.status === 200 && sneaky.body.episode.animal === "Goat" && sneaky.body.episode.date === D1 && sneaky.body.episode.scenes[0].start === 0, "sign, date and timing cannot be changed by an edit");

  // ---- restore an earlier version
  const h2 = await call("GET", { op: "history", date: D1, animal: "Goat" });
  const firstEdit = h2.body.items.find((x) => x.action === "edit");
  const rest = await call("POST", { op: "restore", date: D1, animal: "Goat", key: h2.body.items[h2.body.items.length - 1].key });
  ok(rest.status === 200 && firstEdit, "an earlier version can be restored");

  // ---- 10: duplicate an episode as a new editable version
  const du = await call("POST", { op: "duplicate", date: D1, animal: "Dragon", toDate: D2, theme: themeFor(D2), facts: factsFor(D2, "Dragon") });
  ok(du.status === 200 && /^copy-/.test(du.body.episode.vid) && du.body.episode.date === D2 && du.body.episode.copiedFrom.date === D1, "duplicate makes a new version on the chosen day");
  const d2b = await call("GET", { op: "day", date: D2 });
  ok(d2b.body.episodes.Dragon[du.body.episode.vid] && d2b.body.episodes.Dragon.main, "the copy sits next to that day's own episode");
  const de = await call("POST", { op: "save", date: D2, animal: "Dragon", vid: du.body.episode.vid, episode: { ...du.body.episode, hook: "A new hook for the copy." }, etag: (await call("GET", { op: "episode", date: D2, animal: "Dragon", vid: du.body.episode.vid })).body.etag });
  ok(de.status === 200 && de.body.episode.hook === "A new hook for the copy.", "the copy can be edited");
  ok((await call("GET", { op: "episode", date: D1, animal: "Dragon" })).body.episode.hook !== "A new hook for the copy.", "editing the copy leaves the original alone");
  const rm = await call("POST", { op: "removeCopy", date: D2, animal: "Dragon", vid: du.body.episode.vid });
  ok(rm.status === 200 && rm.body.removed && !(await call("GET", { op: "day", date: D2 })).body.episodes.Dragon[du.body.episode.vid], "a copy can be removed");
  ok((await call("POST", { op: "removeCopy", date: D2, animal: "Dragon", vid: "main" })).status === 400, "the day's own episode cannot be removed");

  // ---- errors keep what is saved
  const snap = JSON.stringify((await call("GET", { op: "day", date: D1 })).body.episodes);
  ai.fail = 2;
  const e1 = await call("POST", { op: "scene", date: D1, animal: "Ox", index: 1 });
  ok(e1.status === 502 && /Nothing was changed/.test(e1.body.error), "AI error: clear message");
  ai.bad = 2;
  const e2 = await call("POST", { op: "plan", date: D1, animal: "Ox", force: true, theme: themeFor(D1), facts: factsFor(D1, "Ox") });
  ok(e2.status === 502, "unreadable AI answer: clear message");
  const ak = process.env.ANTHROPIC_API_KEY; delete process.env.ANTHROPIC_API_KEY;
  const e3 = await call("POST", { op: "scene", date: D1, animal: "Ox", index: 1 });
  ok(e3.status === 503 && e3.body.code === "no-ai-key", "no AI key: clear message");
  process.env.ANTHROPIC_API_KEY = ak;
  ok(JSON.stringify((await call("GET", { op: "day", date: D1 })).body.episodes) === snap, "after the errors the saved edition is exactly the same");
  ok((await call("POST", { op: "scene", date: D1, animal: "Ox", index: 1 })).status === 200, "Try again works");
  ai.fail = 2;
  const e4 = await call("POST", { op: "plan", date: "2026-12-01", animal: "Rat", theme: themeFor("2026-12-01"), facts: factsFor("2026-12-01", "Rat") });
  ok(e4.status === 502 && (await call("GET", { op: "day", date: "2026-12-01" })).body.day === null, "a failed first plan of a new day saves nothing");

  // ---- duplicate requests: two windows asking at once write one episode
  ai.delay = 300;
  const [p1, p2] = await Promise.all([1, 2].map(() => call("POST", { op: "plan", date: "2026-11-15", animal: "Horse", theme: themeFor("2026-11-15"), facts: factsFor("2026-11-15", "Horse") })));
  ai.delay = 0;
  const codes = [p1.status, p2.status].sort().join();
  ok(codes === "200,409" || (codes === "200,200" && (p1.body.existed || p2.body.existed)), `two requests at once: one writes, the other waits (${codes})`);
  const d3 = await call("GET", { op: "day", date: "2026-11-15" });
  ok(Object.keys(d3.body.episodes.Horse).length === 1, "only one Horse episode was stored");

  // ---- bad input
  ok((await call("POST", { op: "plan", date: "2026-13-40", animal: "Dragon" })).status === 400, "bad date refused");
  ok((await call("POST", { op: "plan", date: D1, animal: "Cat" })).status === 400, "unknown sign refused");
  ok((await call("POST", { op: "scene", date: D1, animal: "Dragon", index: 9 })).status === 400, "bad scene number refused");
  ok((await call("POST", { op: "nope" })).status === 400, "unknown request refused");

  // ---- 30 and 90 second versions
  const p30 = await makeEpisode("2026-11-16", "Snake", { length: 30 });
  ok(p30.status === 200 && p30.body.episode.scenes.length === 3 && p30.body.episode.length === 30, "a 30-second episode has 3 scenes");
  const p90 = await makeEpisode("2026-11-16", "Monkey", { length: 90 });
  ok(p90.status === 200 && p90.body.episode.scenes.length === 9, "a 90-second episode has 9 scenes");
} catch (e) { fails++; console.log("FAIL (crash)", e.stack); }
finally { await teardown(); }
console.log(fails ? `${fails} check(s) failed, ${passes} passed` : `studio editions OK: ${passes} checks passed (${ai.calls} stand-in AI calls)`);
process.exit(fails ? 1 : 0);
