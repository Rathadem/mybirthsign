// Test bench for the Studio's daily editions (used by tests/studio-edition-test.mjs and tests/studio-ui-test.mjs):
//   - a local Netlify Blobs server (the real @netlify/blobs server, files in a temp folder),
//   - a stand-in for the AI service that answers like Claude would (it never calls the real API),
//   - the function netlify/functions/studio-edition.mjs, called directly or through a small web server that also
//     serves dist/ (run node scripts/build-site.mjs first for the page tests).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { BlobsServer } from "@netlify/blobs/server";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
export const KEY = "test-passcode";
const KM = { Rat: "ជូត", Ox: "ឆ្លូវ", Tiger: "ខាល", Rabbit: "ថោះ", Dragon: "រោង", Snake: "ម្សាញ់", Horse: "មមី", Goat: "មមែ", Monkey: "វក", Rooster: "រកា", Dog: "ច", Pig: "កុរ" };
const h = (s) => { let x = 2166136261; for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); } return x >>> 0; };
const PL = ["a quiet bamboo grove at dawn", "a moonlit causeway lined with naga statues", "a riverside landing with painted boats", "a jasmine garden in soft rain", "a tower terrace above the jungle", "a rice field glowing at sunrise", "a lantern market at dusk", "a waterfall pool under starlight", "a courtyard of stone lions and oil lamps", "a lotus lake with floating lamps", "a hilltop with drifting clouds", "a carved gallery lit by candles", "a banyan tree with fireflies", "a misty moat with sky lanterns", "a sandstone library at twilight"];
const ACT = ["lifts a ribbon of light that curls into a lotus", "follows a trail of glowing footprints", "opens a carved box that releases butterflies of light", "spins slowly as petals rise in a spiral", "raises a shining shield of warm light", "draws a circle of light on the water", "leaps across stepping stones that light up", "calls a gentle rain of golden sparks", "guides a lost lantern back to the sky", "plants a seed that blooms into a glowing tree", "rings a small bell that sends rings of light", "unrolls a scroll of shining characters"];

// ------------------------------------------------------------------ the stand-in AI
export const ai = { calls: 0, fail: 0, bad: 0, cut: 0, repeat: null, delay: 0, log: [], tools: [] };
function answer(p) {
  const date = (/Date: (?:\w+ )?(\d\d\/\d\d\/\d{4})/.exec(p) || [])[1] || "";
  if (p.startsWith("Write today's episode plan")) {
    const animal = /Sign: (\w+)/.exec(p)[1], n = Number(/(\d+) clips of 10 seconds/.exec(p)[1]);
    if (ai.repeat && ai.repeat.animal === animal) { const r = ai.repeat.plan; ai.repeat = null; return r; }
    const sparks = (/random sparks[^:]*: (.+?)\. Places to consider/.exec(p) || [, "a small wish"])[1].split("; ");
    const places = (/Places to consider: ([^\n]+)\./.exec(p) || [, PL[0]])[1].split("; ");
    const retry = (p.match(/Your last idea/g) || []).length;
    const k = h(date + animal + retry);
    // like the real AI, stay away from the ideas the prompt lists as taken (recent days, other signs, the retry note)
    const taken = (p.split(/Recent ideas for|Other signs today already use|Your last idea/).slice(1).join(" ")).toLowerCase();
    const free = sparks.filter((x) => !taken.includes(x.toLowerCase()));
    const spark = free.length ? free[k % free.length] : `a secret only the ${animal} knows (${k % 997})`;
    const freeP = places.filter((x) => !taken.includes(x.toLowerCase())), place = freeP.length ? freeP[(k >>> 3) % freeP.length] : `a hidden ${["cave", "island", "orchard", "bridge"][k % 4]} only the ${animal} knows`, act = ACT[(Object.keys(KM).indexOf(animal) + Number(date.slice(0, 2)) + retry) % ACT.length];
    return {
      title_en: `The ${animal}, ${spark} and ${place}`, title_km: `ឆ្នាំ${KM[animal]} និងរឿងអស្ចារ្យថ្ងៃ ${date}`,
      logline: `${spark} appears by ${place} for the ${animal}.`,
      hook: `A shimmer over ${place} hints at ${spark}.`, guardian_moment: `At ${place}, the ${animal.toLowerCase()} ${act}.`,
      blessing_en: `May ${spark} bring you calm luck, dear ${animal}.`, blessing_km: `សូមឲ្យឆ្នាំ${KM[animal]} មានសំណាងល្អ និងចិត្តស្ងប់។`,
      closing_en: "Thank you for watching, see you tomorrow.", closing_km: "អរគុណដែលបានទស្សនា ជួបគ្នាថ្ងៃស្អែក!",
      music: "soft roneat and bamboo flute with gentle drums",
      beats: Array.from({ length: n }, (_, i) => `clip ${i + 1}: ${i % 2 ? spark : place}, moment ${i + 1}`),
    };
  }
  if (p.startsWith("Write clip")) {
    const [, idx, tot] = /Write clip (\d+) of (\d+)/.exec(p), animal = /today's (\w+) episode/.exec(p)[1];
    const k = h(date + animal + idx + (/too long|different place/.test(p) ? "x" : ""));
    return {
      km: `ឆ្នាំ${KM[animal]}អើយ! ថ្ងៃនេះពន្លឺមាសនាំសំណាងល្អមក ផ្នែកទី ${idx}។`, en: /The owner asks/.test(p) ? `Dear ${animal}, a softer golden light shines on you now, part ${idx}.` : `Dear ${animal}, golden light brings good luck today, part ${idx} of ${tot}.`,
      setting: `${PL[k % PL.length]} on ${date}, warm light and drifting mist`, action: `the guardian and the ${animal.toLowerCase()} ${ACT[(k >>> 4) % ACT.length]}`,
      camera: ["slow push-in", "gentle crane up", "smooth orbit", "slow pull-back"][k % 4], sound: "soft chimes and a light flute",
      image: `the ${animal.toLowerCase()} in the key moment of part ${idx}`,
    };
  }
  return {};
}
let aiServer;
export async function startAI() {
  aiServer = http.createServer((req, res) => {
    let body = ""; req.on("data", (c) => (body += c)); req.on("end", async () => {
      ai.calls++;
      const j = JSON.parse(body); const prompt = j.messages[0].content; ai.log.push(prompt.slice(0, 40));
      if (ai.delay) await new Promise((ok) => setTimeout(ok, ai.delay));
      if (ai.fail > 0) { ai.fail--; res.writeHead(500); return res.end('{"error":"overloaded"}'); }
      if (ai.bad > 0) { ai.bad--; res.writeHead(200, { "content-type": "application/json" }); return res.end(JSON.stringify({ content: [{ type: "text", text: "Sorry, I cannot do that." }] })); }
      res.writeHead(200, { "content-type": "application/json" });
      // like the real API: with a forced tool, the answer is a tool_use block whose input is already JSON
      const tool = j.tool_choice && j.tool_choice.type === "tool" && (j.tools || []).find((t) => t.name === j.tool_choice.name);
      if (ai.cut > 0) { ai.cut--; return res.end(JSON.stringify({ content: tool ? [{ type: "tool_use", id: "t1", name: tool.name, input: {} }] : [{ type: "text", text: '{"title_en":"Cut' }], stop_reason: "max_tokens" })); }
      ai.tools.push(tool ? tool.name : "none");
      res.end(JSON.stringify(tool
        ? { content: [{ type: "tool_use", id: "t" + ai.calls, name: tool.name, input: answer(prompt) }], stop_reason: "tool_use", usage: { input_tokens: 1, output_tokens: 1 } }
        : { content: [{ type: "text", text: JSON.stringify(answer(prompt)) }], stop_reason: "end_turn", usage: { input_tokens: 1, output_tokens: 1 } }));
    });
  });
  await new Promise((ok) => aiServer.listen(0, ok));
  return `http://127.0.0.1:${aiServer.address().port}/v1/messages`;
}

// ------------------------------------------------------------------ Blobs + the function
let blobs, dir;
export async function setup() {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "studio-blobs-"));
  const token = "local-token";
  blobs = new BlobsServer({ directory: dir, token, port: 0 });
  const { port } = await blobs.start();
  const url = `http://localhost:${port}`;
  process.env.NETLIFY_BLOBS_CONTEXT = Buffer.from(JSON.stringify({ edgeURL: url, uncachedEdgeURL: url, siteID: "local-site", token })).toString("base64");
  process.env.STUDIO_KEY = KEY;
  process.env.ANTHROPIC_API_KEY = "test-key-not-real";
  process.env.STUDIO_AI_URL = await startAI();
  process.env.STUDIO_AI_TIMEOUT_MS = "8000";
  const mod = await import("../netlify/functions/studio-edition.mjs");
  return mod.default;
}
export async function teardown() {
  try { await blobs.stop(); } catch (e) {}
  try { aiServer.close(); } catch (e) {}
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {}
}

// a web server: dist/ plus /api/studio (for the browser tests)
export function serve(handler, port = 0) {
  const DIST = path.join(ROOT, "dist");
  const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
  const srv = http.createServer(async (req, res) => {
    const u = new URL(req.url, "http://localhost");
    if (u.pathname === "/api/studio") {
      let body = ""; for await (const c of req) body += c;
      const r = await handler(new Request(u.href, { method: req.method, headers: req.headers, body: req.method === "POST" ? body : undefined }));
      res.writeHead(r.status, Object.fromEntries(r.headers)); return res.end(await r.text());
    }
    let f = path.join(DIST, decodeURIComponent(u.pathname));
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f) && fs.existsSync(f + ".html")) f += ".html";
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f));
  });
  return new Promise((ok) => srv.listen(port, () => ok(srv)));
}
