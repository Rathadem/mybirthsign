// netlify/functions/studio-edition.mjs — daily editions of the Video Studio (https://mybirthsign.com/studio/)
//
// One AI-written edition per calendar day: for each of the 12 zodiac signs a complete video plan (story, Khmer and
// English lines, image and video prompts, camera, actions, music) for Chanda and the saved Flow guardians. Saved in
// Netlify Blobs, so a refresh never changes it; older days stay in the archive and can be opened, edited and duplicated.
//
// Setup (Netlify > Site configuration > Environment variables, scope "Functions"):
//   STUDIO_KEY          a passcode of your choice; the Studio asks for it once per device. Without it every call
//                       answers 503 "not set up" and nothing is stored.
//   ANTHROPIC_API_KEY   already used by the checker's AI reading (netlify/functions/zodiac-reading.js).
//   STUDIO_MODEL        optional, default claude-sonnet-5-5 (the model of the daily fortune writer).
// Storage: Netlify Blobs store "studio-editions" (no database to create). Keys:
//   day/<date>                         the day: theme, time zone, and a summary of every episode
//   ep/<date>/<Animal>/<vid>           one episode (vid "main", or "copy-…" for duplicates)
//   hist/<date>/<Animal>/<vid>/<ts>-<action>   the episode as it was before each change (generation history)
//   recent/<Animal>                    the last 45 stories, blessings and scenes of the sign (to keep every day new)
//   lock/<date>/<Animal>/<vid>         short lock while the AI writes (two windows never write the same episode)
// The AI never writes the characters' looks: scripts/content/studio-edition-lib.mjs adds the fixed character lines.
// Nothing saved is changed when a call fails; the Studio shows the error with a "Try again" button.
// Test: node tests/studio-edition-test.mjs (local Blobs server and a stand-in AI).
import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";
import * as E from "../../scripts/content/studio-edition-lib.mjs";

export const config = { path: "/api/studio" };

const STORE = "studio-editions";
const MODEL = () => process.env.STUDIO_MODEL || "claude-sonnet-5-5";
const AI_URL = () => process.env.STUDIO_AI_URL || "https://api.anthropic.com/v1/messages";
const AI_TIMEOUT = () => Number(process.env.STUDIO_AI_TIMEOUT_MS) || 45000;
const RECENT_MAX = 45, LOCK_MS = 120000;

class HttpError extends Error { constructor(status, msg, extra) { super(msg); this.status = status; this.extra = extra; } }
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
const now = () => new Date().toISOString();

// ------------------------------------------------------------------ input checks
const isDate = (d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d + "T00:00:00Z")) && new Date(d + "T00:00:00Z").toISOString().slice(0, 10) === d;
const isAnimal = (a) => E.ED_ANIMALS.includes(a);
const isVid = (v) => v === "main" || /^copy-[a-z0-9]{6,24}$/.test(v || "");
const str = (v, n = 400) => String(v == null ? "" : v).slice(0, n);
function need(c, msg) { if (!c) throw new HttpError(400, msg); }
const TIERS = ["great", "good", "ordinary", "caution"];
function cleanFacts(f, animal) {
  if (!f || typeof f !== "object") return null;
  const pair = (p) => (p && typeof p === "object" ? { en: str(p.en, 60), km: str(p.km, 80) } : null);
  return {
    animal, tier: TIERS.includes(f.tier) ? f.tier : "ordinary", label: pair(f.label), color: pair(f.color), direction: pair(f.direction),
    time: /^\d{2}:\d{2}–\d{2}:\d{2}$/.test(f.time || "") ? f.time : "", number: Number.isFinite(f.number) ? f.number : null,
    digits: Array.isArray(f.digits) ? f.digits.filter((n) => Number.isInteger(n) && n >= 0 && n < 100000).slice(0, 5) : [],
    helper: isAnimal(f.helper) ? f.helper : "", traits: str(f.traits, 300),
  };
}
function cleanTheme(t, date) {
  const base = E.dailyTheme(date);
  if (!t || typeof t !== "object" || !t.id || !t.en) return base;
  return { id: str(t.id, 40), kind: ["weekday", "festival", "cny", "fullmoon"].includes(t.kind) ? t.kind : "weekday", en: str(t.en, 120), km: str(t.km, 160), angle: str(t.angle, 300), light: str(t.light, 200), music: str(t.music, 200), note: str(t.note, 160), weekday: str(t.weekday, 40), events: Array.isArray(t.events) ? t.events.map((e) => str(e, 30)).slice(0, 5) : [] };
}

// ------------------------------------------------------------------ passcode
function authorized(req) {
  const want = process.env.STUDIO_KEY;
  if (!want) throw new HttpError(503, "Daily editions are not switched on yet: add STUDIO_KEY (a passcode you choose) in Netlify's environment variables.", { code: "no-studio-key" });
  const got = req.headers.get("x-studio-key") || "";
  const h = (s) => crypto.createHash("sha256").update(String(s)).digest();
  if (!crypto.timingSafeEqual(h(got), h(want))) throw new HttpError(401, "Wrong Studio passcode.", { code: "bad-key" });
}

// ------------------------------------------------------------------ storage helpers
// previews (deploy previews, branch deploys) keep their own store, so testing never adds to the live Studio's archive
const store = (live) => getStore({ name: live ? STORE : STORE + "-preview", consistency: "strong" });
const kDay = (d) => `day/${d}`, kEp = (d, a, v) => `ep/${d}/${a}/${v}`, kLock = (d, a, v) => `lock/${d}/${a}/${v}`, kRecent = (a) => `recent/${a}`;
async function readJSON(st, key) {
  const r = await st.getWithMetadata(key, { type: "json" });
  if (!r) return null;
  let etag = r.etag;
  if (!etag) { const { blobs } = await st.list({ prefix: key }); const x = blobs.find((b) => b.key === key); etag = x && x.etag; }   // the local test server sends no etag on reads
  return { data: r.data, etag };
}
// read-change-write with the blob's etag, retried when another request wrote in between
async function update(st, key, fn, init) {
  for (let i = 0; i < 10; i++) {
    const cur = await readJSON(st, key);
    const next = fn(cur ? cur.data : init());
    if (next === undefined) return cur && cur.data;
    const r = await st.setJSON(key, next, cur ? { onlyIfMatch: cur.etag } : { onlyIfNew: true });
    if (r && r.modified !== false) return next;
    await sleep(40 + Math.random() * 160);
  }
  throw new HttpError(503, "The Studio storage is busy, please try again.");
}
async function lock(st, d, a, v) {
  const key = kLock(d, a, v), token = crypto.randomBytes(8).toString("hex"), until = Date.now() + LOCK_MS;
  const busy = () => new HttpError(409, "This episode is being written in another window. Wait a moment and reload.", { code: "busy" });
  const r = await st.setJSON(key, { until, token, at: now() }, { onlyIfNew: true });
  if (!r || r.modified === false) {
    const cur = await readJSON(st, key);
    if (cur && cur.data.until > Date.now()) throw busy();
    const r2 = await st.setJSON(key, { until, token, at: now() }, cur ? { onlyIfMatch: cur.etag } : { onlyIfNew: true });   // an old lock left by a crash
    if (r2 && r2.modified === false) throw busy();
  }
  // read it back after a moment: if two requests raced, only the one whose token is stored goes on
  await sleep(120);
  const mine = await readJSON(st, key);
  if (!mine || mine.data.token !== token) throw busy();
  return async () => { const cur = await readJSON(st, key).catch(() => null); if (cur && cur.data.token === token) await st.delete(key).catch(() => {}); };
}
async function saveHistory(st, ep, action) {
  if (!ep) return;
  const ts = Date.now().toString(36);
  await st.setJSON(`hist/${ep.date}/${ep.animal}/${ep.vid}/${ts}-${action}`, { at: now(), action, episode: ep });
}
const summary = (ep) => ({ title: ep.title, print: E.planPrint(ep).slice(0, 900), status: E.episodeStatus(ep), ready: ep.scenes.filter((s) => s.status === "ready").length, total: ep.scenes.length, length: ep.length, updatedAt: ep.updatedAt, edited: !!ep.edited, copiedFrom: ep.copiedFrom || null, similar: ep.similar || null });
function newDay(date, theme, tz) { return { v: 1, date, tz: str(tz, 60) || E.ED_TZ, theme, createdAt: now(), updatedAt: now(), episodes: {} }; }
async function touchDay(st, date, ep, theme, tz, remove) {
  return update(st, kDay(date), (m) => {
    m.episodes[ep.animal] = m.episodes[ep.animal] || {};
    if (remove) delete m.episodes[ep.animal][ep.vid]; else m.episodes[ep.animal][ep.vid] = summary(ep);
    m.updatedAt = now(); return m;
  }, () => newDay(date, theme, tz));
}
async function remember(st, ep) {
  const item = { date: ep.date, vid: ep.vid, title: ep.title.en, plan: E.planPrint(ep), moment: ep.guardianMoment, blessing: ep.blessing.en, scenes: ep.scenes.filter((s) => s.status === "ready").map(E.scenePrint) };
  await update(st, kRecent(ep.animal), (r) => {
    r.items = [item].concat((r.items || []).filter((x) => !(x.date === ep.date && x.vid === ep.vid))).slice(0, RECENT_MAX);
    return r;
  }, () => ({ items: [] }));
}

// ------------------------------------------------------------------ the AI
async function ask(user, maxTokens) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new HttpError(503, "The AI key (ANTHROPIC_API_KEY) is not set in Netlify, so nothing new can be written. Saved editions still open.", { code: "no-ai-key" });
  for (let attempt = 1; attempt <= 2; attempt++) {
    const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), AI_TIMEOUT());
    let r;
    try {
      r = await fetch(AI_URL(), { method: "POST", signal: ctrl.signal, headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: MODEL(), max_tokens: maxTokens, system: E.systemPrompt(), messages: [{ role: "user", content: user }] }) });
    } catch (e) {
      clearTimeout(t);
      if (attempt === 1 && e.name !== "AbortError") { await sleep(1200); continue; }
      throw new HttpError(504, e.name === "AbortError" ? "The AI took too long to answer. Nothing was changed; try again." : "Could not reach the AI service. Nothing was changed; try again.", { code: "ai-unreachable" });
    }
    clearTimeout(t);
    if (!r.ok) {
      const body = (await r.text()).slice(0, 300);
      console.error("studio-edition: AI error", r.status, body);
      if (attempt === 1 && (r.status === 429 || r.status >= 500)) { await sleep(1500); continue; }
      throw new HttpError(502, `The AI service answered with an error (${r.status}). Nothing was changed; try again.`, { code: "ai-error", aiStatus: r.status });
    }
    const data = await r.json();
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    try { return E.parseJSON(text); }
    catch (e) { if (attempt === 1) continue; throw new HttpError(502, "The AI's answer could not be read. Nothing was changed; try again.", { code: "ai-bad-json" }); }
  }
}

// ------------------------------------------------------------------ operations
async function opPlan(st, b, t0) {
  const { date, animal } = b, vid = b.vid || "main";
  need(isDate(date) && isAnimal(animal) && isVid(vid), "date, animal or version is not valid");
  const length = E.ED_LENGTHS.includes(Number(b.length)) ? Number(b.length) : E.ED_DEFAULT_LENGTH;
  const unlock = await lock(st, date, animal, vid);
  try {
    const old = await readJSON(st, kEp(date, animal, vid));
    if (old && !b.force) return { episode: old.data, etag: old.etag, existed: true };   // one edition per date: never remade by accident
    // the day's theme is fixed by the first episode saved that day (later requests use the saved one); nothing is written
    // until the AI has answered
    const dayR = await readJSON(st, kDay(date));
    const dayMeta = dayR ? dayR.data : newDay(date, cleanTheme(b.theme, date), b.tz);
    const theme = dayMeta.theme, facts = cleanFacts(b.facts, animal);
    const recent = ((await readJSON(st, kRecent(animal))) || { data: { items: [] } }).data.items.filter((x) => !(x.date === date && x.vid === vid));
    const avoid = recent.slice(0, 12).map((x) => `${x.date.split("-").reverse().join("/")}: ${x.title} — ${x.moment}`);
    const others = [], otherPrints = [];
    for (const [a, vs] of Object.entries(dayMeta.episodes || {})) if (a !== animal && vs.main && vs.main.title) { others.push(`${a}: ${vs.main.title.en}`); otherPrints.push({ date, title: `${a}: ${vs.main.title.en}`, plan: vs.main.print || "" }); }
    const seed = E.hash(`${date}|${animal}|${vid}|${theme.id}|${b.force ? Date.now() : 0}`);
    let ep, best = null, retryNote = "";
    for (let attempt = 1; attempt <= 2; attempt++) {
      const raw = await ask(E.planPrompt({ iso: date, animal, theme, facts, length, avoid, today: others, seed: seed + attempt, retryNote }), 1400);
      try { ep = E.planToEpisode(raw, { iso: date, animal, vid, theme, facts, length }); }
      catch (e) { if (attempt === 2) throw new HttpError(502, "The AI's plan was incomplete (" + e.message + "). Nothing was changed; try again.", { code: "ai-incomplete" }); retryNote = "Your last answer was incomplete: " + e.message + "."; continue; }
      // compare with recent editions of this sign (story and blessing) before accepting it
      const pp = E.planPrint(ep);
      let worst = { score: 0 };
      for (const x of recent.concat(otherPrints)) {   // this sign's recent days, and the other signs of the same day
        const s = Math.max(E.similar(pp, x.plan), x.blessing ? E.similar(ep.blessing.en, x.blessing) - 0.2 : 0);
        if (s > worst.score) worst = { score: s, to: x.date, title: x.title };
      }
      ep.similar = worst.score >= E.ED_SIMILAR ? worst : null;
      if (!ep.similar) break;
      best = ep;
      if (Date.now() - t0 > 25000) break;
      retryNote = `Your last idea was too close to ${worst.to === date ? "another sign's episode today" : "the " + worst.to.split("-").reverse().join("/") + " episode"} "${worst.title}". Write a completely different story, place and magical moment.`;
    }
    ep = ep || best;
    ep.seed = seed; ep.model = MODEL(); ep.createdAt = old ? old.data.createdAt : now(); ep.updatedAt = now(); ep.tz = dayMeta.tz;
    if (old) await saveHistory(st, old.data, "remade");
    const w = await st.setJSON(kEp(date, animal, vid), ep, old ? { onlyIfMatch: old.etag } : { onlyIfNew: true });
    if (w && w.modified === false) throw new HttpError(409, "The episode was changed in another window. Reload and try again.", { code: "conflict" });
    await touchDay(st, date, ep, theme, b.tz);
    await remember(st, ep);
    const fresh = await readJSON(st, kEp(date, animal, vid));
    return { episode: fresh.data, etag: fresh.etag };
  } finally { await unlock(); }
}

async function opScene(st, b, t0) {
  const { date, animal } = b, vid = b.vid || "main", index = Number(b.index);
  need(isDate(date) && isAnimal(animal) && isVid(vid), "date, animal or version is not valid");
  const unlock = await lock(st, date, animal, vid);
  try {
    const cur = await readJSON(st, kEp(date, animal, vid));
    if (!cur) throw new HttpError(404, "Make the episode plan first.", { code: "no-episode" });
    const ep = cur.data;
    need(Number.isInteger(index) && index >= 0 && index < ep.scenes.length, "scene number is not valid");
    const day = (await readJSON(st, kDay(date)) || {}).data;
    const theme = (day && day.theme) || ep.theme;
    const recent = ((await readJSON(st, kRecent(animal))) || { data: { items: [] } }).data.items.filter((x) => !(x.date === date && x.vid === vid));
    const avoidScenes = recent.flatMap((x) => x.scenes || []).slice(0, 40);
    const own = ep.scenes.filter((s, i) => i !== index && s.status === "ready").map(E.scenePrint);
    let note = b.note ? "The owner asks: " + str(b.note, 300) : "", sc = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      const raw = await ask(E.scenePrompt({ iso: date, animal, theme, facts: ep.facts, ep, index, avoid: avoidScenes.slice(0, 10), note }), 900);
      try { sc = E.fillScene(ep, index, raw); }
      catch (e) { if (attempt === 2) throw new HttpError(502, "The AI's scene was incomplete. Nothing was changed; try again.", { code: "ai-incomplete" }); note = "Your last answer was incomplete: " + e.message + "."; continue; }
      const print = E.scenePrint(sc);
      const rep = avoidScenes.concat(own).map((x) => E.similar(print, x)).reduce((m, x) => Math.max(m, x), 0);
      const tooLong = sc.warnings.some((w) => /fit 10 seconds/.test(w));
      if ((rep < 0.5 && !tooLong) || attempt === 2 || Date.now() - t0 > 30000) { if (rep >= 0.5) sc.warnings.push("close to a recent scene of this sign"); break; }
      note = (tooLong ? "Your lines were too long for 10 seconds: make the Khmer line shorter than 100 characters and the English shorter than 20 words. " : "") + (rep >= 0.5 ? "Use a different place, light and action from recent scenes." : "");
    }
    sc.updatedAt = now();
    const next = { ...ep, scenes: ep.scenes.map((s, i) => (i === index ? sc : s)), updatedAt: now() };
    if (ep.scenes[index].status === "ready") await saveHistory(st, ep, `scene${index + 1}`);
    const w = await st.setJSON(kEp(date, animal, vid), next, { onlyIfMatch: cur.etag });
    if (w && w.modified === false) throw new HttpError(409, "The episode was changed in another window. Reload and try again.", { code: "conflict" });
    await touchDay(st, date, next, theme, day && day.tz);
    await remember(st, next);
    const fresh = await readJSON(st, kEp(date, animal, vid));
    return { episode: fresh.data, etag: fresh.etag };
  } finally { await unlock(); }
}

// the owner's edits: only the writing fields change; date, sign, scene timing and references stay
function mergeEdits(ep, e) {
  const o = JSON.parse(JSON.stringify(ep)), P = (v, n) => (v == null ? undefined : str(v, n).trim());
  const set = (obj, k, v) => { if (v !== undefined) obj[k] = v; };
  if (e.title) { set(o.title, "en", P(e.title.en, 160)); set(o.title, "km", P(e.title.km, 200)); }
  for (const k of ["logline", "hook", "guardianMoment", "music"]) set(o, k, P(e[k], 900));
  for (const k of ["blessing", "closing"]) if (e[k]) { set(o[k], "en", P(e[k].en, 500)); set(o[k], "km", P(e[k].km, 600)); }
  if (Array.isArray(e.beats)) o.beats = o.beats.map((x, i) => P(e.beats[i], 500) ?? x);
  if (Array.isArray(e.scenes)) o.scenes = o.scenes.map((s, i) => {
    const x = e.scenes[i]; if (!x) return s;
    const n = { ...s };
    for (const k of ["km", "en", "setting", "action", "camera", "sound", "image"]) set(n, k, P(x[k], 1200));
    for (const k of ["imagePrompt", "video"]) set(n, k, P(x[k], 6000));
    if (typeof x.onCam === "boolean" && x.onCam !== s.onCam) { n.onCam = x.onCam; n.refs = E.refsFor(o.animal, x.onCam); }
    if (n.km && n.en && n.video) n.status = "ready";
    n.warnings = n.status === "ready" ? E.checkScene(n, { noNumbers: o.facts && o.facts.tier === "caution" }) : n.warnings;
    return n;
  });
  o.edited = true; o.updatedAt = now();
  return o;
}
async function opSave(st, b) {
  const { date, animal } = b, vid = b.vid || "main";
  need(isDate(date) && isAnimal(animal) && isVid(vid) && b.episode && typeof b.episode === "object", "date, animal, version or episode is not valid");
  need(JSON.stringify(b.episode).length < 300000, "the episode is too large");
  const cur = await readJSON(st, kEp(date, animal, vid));
  if (!cur) throw new HttpError(404, "This episode does not exist.", { code: "no-episode" });
  if (b.etag && b.etag !== cur.etag) throw new HttpError(409, "This episode was changed in another window or by a remake. Your edits are kept on screen: copy them, reload, and paste them back.", { code: "conflict", episode: cur.data, etag: cur.etag });
  const next = mergeEdits(cur.data, b.episode);
  await saveHistory(st, cur.data, "edit");
  const w = await st.setJSON(kEp(date, animal, vid), next, { onlyIfMatch: cur.etag });
  if (w && w.modified === false) throw new HttpError(409, "This episode was changed at the same moment. Reload and save again.", { code: "conflict" });
  await touchDay(st, date, next, next.theme);
  await remember(st, next);
  const fresh = await readJSON(st, kEp(date, animal, vid));
  return { episode: fresh.data, etag: fresh.etag };
}
async function opDuplicate(st, b) {
  const { date, animal } = b, vid = b.vid || "main", to = b.toDate || date;
  need(isDate(date) && isDate(to) && isAnimal(animal) && isVid(vid), "date, animal or version is not valid");
  const cur = await readJSON(st, kEp(date, animal, vid));
  if (!cur) throw new HttpError(404, "This episode does not exist.", { code: "no-episode" });
  const nv = "copy-" + crypto.randomBytes(5).toString("hex");
  const copy = { ...JSON.parse(JSON.stringify(cur.data)), date: to, vid: nv, copiedFrom: { date, vid, title: cur.data.title }, edited: false, createdAt: now(), updatedAt: now() };
  if (to !== date) copy.facts = cleanFacts(b.facts, animal) || copy.facts;
  await st.setJSON(kEp(to, animal, nv), copy, { onlyIfNew: true });
  const theme = cleanTheme(b.theme, to);
  await touchDay(st, to, copy, to === date ? cur.data.theme : theme, b.tz);
  const fresh = await readJSON(st, kEp(to, animal, nv));
  return { episode: fresh.data, etag: fresh.etag };
}
async function opRemoveCopy(st, b) {
  const { date, animal, vid } = b;
  need(isDate(date) && isAnimal(animal) && /^copy-/.test(vid || "") && isVid(vid), "only duplicated versions can be removed");
  const cur = await readJSON(st, kEp(date, animal, vid));
  if (!cur) return { removed: false };
  await saveHistory(st, cur.data, "removed");
  await st.delete(kEp(date, animal, vid));
  await touchDay(st, date, cur.data, cur.data.theme, null, true);
  return { removed: true };
}
async function opRestore(st, b) {
  const { date, animal } = b, vid = b.vid || "main", key = str(b.key, 200);
  need(isDate(date) && isAnimal(animal) && isVid(vid) && key.startsWith(`hist/${date}/${animal}/${vid}/`), "this earlier version is not valid");
  const h = await readJSON(st, key);
  if (!h) throw new HttpError(404, "This earlier version was not found.");
  const cur = await readJSON(st, kEp(date, animal, vid));
  if (cur) await saveHistory(st, cur.data, "before-restore");
  const ep = { ...h.data.episode, updatedAt: now(), restoredFrom: h.data.at };
  await st.setJSON(kEp(date, animal, vid), ep);
  await touchDay(st, date, ep, ep.theme);
  await remember(st, ep);
  const fresh = await readJSON(st, kEp(date, animal, vid));
  return { episode: fresh.data, etag: fresh.etag };
}

async function getDay(st, date) {
  need(isDate(date), "date is not valid");
  const day = await readJSON(st, kDay(date));
  const { blobs } = await st.list({ prefix: `ep/${date}/` });
  const eps = {}, etags = {};
  await Promise.all(blobs.map(async (x) => {
    const r = await readJSON(st, x.key); if (!r) return;
    const [, , a, v] = x.key.split("/");
    (eps[a] = eps[a] || {})[v] = r.data; (etags[a] = etags[a] || {})[v] = r.etag;
  }));
  // the same order every time (signs in zodiac order, the day's own episode first, then copies)
  const order = (o) => Object.fromEntries(E.ED_ANIMALS.filter((a) => o[a]).map((a) => [a, Object.fromEntries(Object.keys(o[a]).sort((x, y) => (x === "main" ? -1 : y === "main" ? 1 : x < y ? -1 : 1)).map((v) => [v, o[a][v]]))]));
  return { day: day ? day.data : null, episodes: order(eps), etags: order(etags) };
}
async function getArchive(st, q) {
  const before = isDate(q.get("before")) ? q.get("before") : "9999-12-31", limit = Math.min(Math.max(Number(q.get("limit")) || 31, 1), 120);
  const { blobs } = await st.list({ prefix: "day/" });
  const dates = blobs.map((x) => x.key.slice(4)).filter((d) => isDate(d) && d < before).sort().reverse();
  const page = dates.slice(0, limit);
  const days = (await Promise.all(page.map((d) => readJSON(st, kDay(d))))).filter(Boolean).map((r) => r.data);
  return { days, more: dates.length > limit, total: dates.length };
}
async function getHistory(st, q) {
  const date = q.get("date"), animal = q.get("animal"), vid = q.get("vid") || "main";
  need(isDate(date) && isAnimal(animal) && isVid(vid), "date, animal or version is not valid");
  const { blobs } = await st.list({ prefix: `hist/${date}/${animal}/${vid}/` });
  return { items: blobs.map((x) => { const m = /\/([a-z0-9]+)-([a-z0-9-]+)$/.exec(x.key); return { key: x.key, at: m ? new Date(parseInt(m[1], 36)).toISOString() : "", action: m ? m[2] : "" }; }).sort((a, b) => (a.at < b.at ? 1 : -1)).slice(0, 50) };
}

export default async (req, context) => {
  const t0 = Date.now();
  try {
    authorized(req);
    const dc = context && context.deploy && context.deploy.context, live = !dc || dc === "production";
    const st = store(live), url = new URL(req.url), q = url.searchParams;
    if (req.method === "GET") {
      const op = q.get("op");
      if (op === "status") return json(200, { ok: true, ai: !!process.env.ANTHROPIC_API_KEY, model: MODEL(), preview: !live });
      if (op === "day") return json(200, await getDay(st, q.get("date")));
      if (op === "archive") return json(200, await getArchive(st, q));
      if (op === "history") return json(200, await getHistory(st, q));
      if (op === "episode") {
        const d = q.get("date"), a = q.get("animal"), v = q.get("vid") || "main";
        need(isDate(d) && isAnimal(a) && isVid(v), "date, animal or version is not valid");
        const r = await readJSON(st, kEp(d, a, v));
        return r ? json(200, { episode: r.data, etag: r.etag }) : json(404, { error: "Not found", code: "no-episode" });
      }
      throw new HttpError(400, "unknown request");
    }
    if (req.method !== "POST") throw new HttpError(405, "use GET or POST");
    let b;
    try { b = await req.json(); } catch (e) { throw new HttpError(400, "the request is not JSON"); }
    const ops = { plan: opPlan, scene: opScene, save: opSave, duplicate: opDuplicate, removeCopy: opRemoveCopy, restore: opRestore };
    if (!ops[b.op]) throw new HttpError(400, "unknown request");
    return json(200, await ops[b.op](st, b, t0));
  } catch (e) {
    if (e instanceof HttpError) return json(e.status, { error: e.message, ...(e.extra || {}) });
    console.error("studio-edition error:", e);
    return json(500, { error: "Something went wrong in the Studio service. Nothing was changed; try again.", code: "server" });
  }
};
