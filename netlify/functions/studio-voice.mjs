// The Video Studio's "Update voice-over" for the 60-second video (Facebook & TikTok), asked for by the owner on
// 16/11/2026: the owner writes Chanda's new words for one scene, the AI writes the same words in the other language
// and a new picture for the scene that shows what the words say, and the change is saved for that date so it shows on
// every device. The Studio page (mybirthsign.com/studio/) puts the saved words and picture into that scene, its
// voice-over section and both subtitle files (scripts/content/video-pack-lib.mjs, buildPack(..., edits)).
//
// Netlify environment variables (functions scope):
//   STUDIO_KEY      the Studio passcode (asked once per device). Without it nothing is read or written.
//   STUDIO_AI_KEY   the Anthropic API key for the Studio (falls back to ANTHROPIC_API_KEY).
//   STUDIO_MODEL    optional, default claude-sonnet-5-5.
// Storage: Netlify Blobs store "studio-voice" (previews and branch deploys use "studio-voice-preview"), one JSON per
// date: { date, edits: { "60s": { "<scene index>": { km, en, picture, lang, at } } } }.
//
// GET  /api/studio-voice?date=YYYY-MM-DD                       -> { date, edits }
// POST /api/studio-voice { op: "rewrite", date, index, animal, title, onCam, picture, en, km, voice } -> { date, edits }
// POST /api/studio-voice { op: "reset", date, index }          -> { date, edits }   (the scene goes back to the original)
import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

export const config = { path: "/api/studio-voice" };

const AI_KEY = () => process.env.STUDIO_AI_KEY || process.env.ANTHROPIC_API_KEY;
const AI_URL = () => process.env.STUDIO_AI_URL || "https://api.anthropic.com/v1/messages";
const MODEL = () => process.env.STUDIO_MODEL || "claude-sonnet-5-5";
const ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
const SCENES = 8;   // the 60-second video has 8 clips of 10 seconds

class HttpError extends Error { constructor(status, msg, code) { super(msg); this.status = status; this.code = code; } }
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const str = (v, n) => String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, n);
const need = (c, msg) => { if (!c) throw new HttpError(400, msg, "bad-input"); };
const isDate = (d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d + "T00:00:00Z")) && new Date(d + "T00:00:00Z").toISOString().slice(0, 10) === d;
const KHMER = /[ក-៿]/;

function authorized(req) {
  const want = process.env.STUDIO_KEY;
  if (!want) throw new HttpError(503, "The Studio passcode (STUDIO_KEY) is not set in Netlify.", "no-studio-key");
  const got = req.headers.get("x-studio-key") || "";
  const h = (s) => crypto.createHash("sha256").update(String(s)).digest();
  if (!crypto.timingSafeEqual(h(got), h(want))) throw new HttpError(401, "Wrong or missing Studio passcode.", "bad-key");
}

// ------------------------------------------------------------------ the AI
const TOOL = (other) => ({ name: "write_clip", description: "Save the clip's other-language line and its new picture.", input_schema: { type: "object", properties: {
  line: { type: "string", description: other === "km" ? "Chanda's words in natural spoken Khmer (Khmer script)" : "Chanda's words in natural English" },
  picture: { type: "string", description: "the clip's new picture: what happens, moment by moment, the setting, light and magic, and one camera move (at most 70 words)" },
}, required: ["line", "picture"] } });

export function rewritePrompt(x) {
  const { animal, title, n, onCam, picture, voice, lang, now } = x, a = animal.toLowerCase(), other = lang === "km" ? "en" : "km";
  return `You are helping the owner of MyBirthSign change one 10-second clip of today's 60-second Facebook and TikTok video (vertical 9:16, made in Google Flow). The video is about the ${animal}, today's luckiest Chinese zodiac animal, in a moonlit Khmer temple world, presented by Chanda. Only Chanda speaks; the zodiac guardian and the ${a} never speak.
Clip ${n} of ${SCENES}: ${title}. ${onCam ? `Chanda is ON CAMERA in this clip: she faces the camera and speaks to the viewer with natural lip movements; @${animal} (the ${animal} guardian and the ${a}) is with her and only acts.` : `Chanda is NOT on screen in this clip (her voice is a voice-over); @${animal} (the ${animal} guardian and the ${a}) acts and never speaks.`}
The clip's picture now: ${picture}
Chanda's words now: ${now}
The owner has written Chanda's new ${lang === "km" ? "Khmer" : "English"} words for this clip. Keep them exactly as written, word for word: "${voice}"
1. Write the same words in ${other === "km" ? "natural spoken Khmer (Khmer script), as Chanda would say them" : "natural English, as a faithful translation"}.
2. Write the clip's new picture so that it shows what the new words say: @${animal} acts them out, moment by moment, with the setting, light and magic, and one smooth camera move. For example, if Chanda says to get ready to open the door and receive gold, money and good luck, @${animal} opens a tall temple door and gold coins and money fly around it in a glowing swirl, bringing luck to everyone born in the Year of the ${animal}.
Rules for the picture: call the characters only @${animal}${onCam ? " and @Chanda" : ""}; never describe how they look (the saved Flow characters keep their looks); stay in the moonlit Khmer temple world of the series; no written text, letters or numbers in the picture; no blood, fighting or anything frightening; ${onCam ? "@Chanda keeps facing the camera and speaking with natural lip movements; " : "no one on screen speaks or moves their mouth; "}at most 70 words.
Answer with the tool write_clip.`;
}

// the model may "think" first, which can use up the answer's room; it is switched off (left out if the API refuses it)
let thinkingOff = true;
async function ask(user, tool, t0) {
  const key = AI_KEY();
  if (!key) throw new HttpError(503, "The AI key (STUDIO_AI_KEY) is not set in Netlify.", "no-ai-key");
  for (let attempt = 1; attempt <= 2; attempt++) {
    const left = 24000 - (Date.now() - t0);
    if (left < 3000) break;
    const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), left);
    const req = { model: MODEL(), max_tokens: thinkingOff ? 1200 : 4200, system: "You write short, vivid scene prompts for a Cambodian Chinese-zodiac video series and translate between Khmer and English. Follow the owner's instructions exactly.", messages: [{ role: "user", content: user }], tools: [tool] };
    if (thinkingOff) req.thinking = { type: "disabled" };
    let r;
    try {
      r = await fetch(AI_URL(), { method: "POST", signal: ctrl.signal, headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" }, body: JSON.stringify(req) });
    } catch (e) {
      clearTimeout(t);
      throw new HttpError(504, e.name === "AbortError" ? "The AI took too long to answer. Nothing was changed; try again." : "Could not reach the AI service. Nothing was changed; try again.", "ai-unreachable");
    }
    clearTimeout(t);
    if (!r.ok) {
      const body = (await r.text()).slice(0, 300);
      console.error("studio-voice: AI error", r.status, body);
      if (r.status === 400 && thinkingOff && /thinking/i.test(body)) { thinkingOff = false; attempt--; continue; }
      if (attempt === 1 && (r.status === 429 || r.status >= 500) && Date.now() - t0 < 10000) { await new Promise((ok) => setTimeout(ok, 1500)); continue; }
      throw new HttpError(502, r.status === 429 ? "The AI service is busy. Nothing was changed; try again in a minute." : `The AI service answered with an error (${r.status}). Nothing was changed; try again.`, "ai-error");
    }
    const data = await r.json();
    const used = (data.content || []).find((c) => c.type === "tool_use" && c.input && typeof c.input === "object");
    if (used && data.stop_reason !== "max_tokens") return used.input;
    const text = (data.content || []).filter((c) => c.type === "text").map((c) => c.text).join("");
    try { const m = /\{[\s\S]*\}/.exec(text); if (m && data.stop_reason !== "max_tokens") return JSON.parse(m[0]); } catch (e) {}
    console.error("studio-voice: unreadable AI answer", JSON.stringify({ stop: data.stop_reason, kinds: (data.content || []).map((c) => c.type), text: text.slice(0, 200) }));
    if (attempt === 2 || Date.now() - t0 > 12000) break;
  }
  throw new HttpError(502, "The AI's answer could not be read. Nothing was changed; try again.", "ai-bad-answer");
}

// ------------------------------------------------------------------ storage
const storeFor = (context) => getStore({ name: context && context.deploy && context.deploy.context && context.deploy.context !== "production" ? "studio-voice-preview" : "studio-voice", consistency: "strong" });
async function load(st, date) { return (await st.get(date, { type: "json" })) || { date, edits: {} }; }

export default async (req, context) => {
  const t0 = Date.now();
  try {
    authorized(req);
    const st = storeFor(context);
    if (req.method === "GET") {
      const date = new URL(req.url).searchParams.get("date");
      need(isDate(date), "The date is not valid.");
      return json(200, await load(st, date));
    }
    need(req.method === "POST", "Use GET or POST.");
    let b; try { b = await req.json(); } catch (e) { throw new HttpError(400, "The request could not be read.", "bad-input"); }
    const date = b.date, index = Number(b.index);
    need(isDate(date), "The date is not valid.");
    need(Number.isInteger(index) && index >= 0 && index < SCENES, "The scene number is not valid.");
    if (b.op === "reset") {
      const doc = await load(st, date);
      if (doc.edits["60s"]) { delete doc.edits["60s"][index]; if (!Object.keys(doc.edits["60s"]).length) delete doc.edits["60s"]; }
      await st.setJSON(date, doc);
      return json(200, doc);
    }
    need(b.op === "rewrite", "Unknown request.");
    const animal = b.animal;
    need(ANIMALS.includes(animal), "The animal is not valid.");
    const voice = str(b.voice, 400);
    need(voice, "Write the new voice-over first.");
    const lang = KHMER.test(voice) ? "km" : "en", other = lang === "km" ? "en" : "km";
    const x = { animal, title: str(b.title, 120) || `Scene ${index + 1}`, n: index + 1, onCam: !!b.onCam, picture: str(b.picture, 3000), voice, lang, now: str(lang === "km" ? b.km : b.en, 500) };
    const raw = await ask(rewritePrompt(x), TOOL(other), t0);
    const line = str(raw.line, 500), picture = str(raw.picture, 900);
    if (!line || !picture || (other === "km" && !KHMER.test(line))) throw new HttpError(502, "The AI's answer was incomplete. Nothing was changed; try again.", "ai-incomplete");
    const edit = { km: lang === "km" ? voice : line, en: lang === "en" ? voice : line, picture, lang, at: new Date().toISOString() };
    const doc = await load(st, date);
    doc.edits["60s"] = { ...(doc.edits["60s"] || {}), [index]: edit };
    await st.setJSON(date, doc);
    return json(200, doc);
  } catch (e) {
    if (e instanceof HttpError) return json(e.status, { error: e.message, code: e.code });
    console.error("studio-voice:", e && e.stack || e);
    return json(500, { error: "Something went wrong. Nothing was changed; try again.", code: "server" });
  }
};
