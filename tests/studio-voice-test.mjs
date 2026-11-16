// The Studio's voice-over service (netlify/functions/studio-voice.mjs) with a local Netlify Blobs server and a stand-in
// AI (the real API is never called). Run: node tests/studio-voice-test.mjs
// Also exports setup()/serve() for the browser test (tests/studio-voice-ui-test.mjs).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { BlobsServer } from "@netlify/blobs/server";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
export const KEY = "test-passcode";
export const ai = { calls: 0, fail: 0, bad: 0, prompts: [], thinking: [], refuseThinking: false, english: false };

let aiServer, blobs, dir;
function startAI() {
  aiServer = http.createServer((req, res) => {
    let body = ""; req.on("data", (c) => (body += c)); req.on("end", () => {
      ai.calls++;
      const j = JSON.parse(body), p = j.messages[0].content; ai.prompts.push(p);
      if (ai.refuseThinking && j.thinking) { res.writeHead(400); return res.end('{"type":"error","error":{"type":"invalid_request_error","message":"thinking: not supported for this model."}}'); }
      ai.thinking.push(j.thinking ? j.thinking.type : "default");
      if (ai.fail > 0) { ai.fail--; res.writeHead(500); return res.end('{"error":"overloaded"}'); }
      res.writeHead(200, { "content-type": "application/json" });
      if (ai.bad > 0) { ai.bad--; return res.end(JSON.stringify({ content: [{ type: "text", text: "Sorry, I cannot." }], stop_reason: "end_turn" })); }
      // like the real model, unless thinking is off it thinks first and a small budget runs out before the answer
      if ((!j.thinking || j.thinking.type !== "disabled") && j.max_tokens < 3000) return res.end(JSON.stringify({ content: [{ type: "thinking", thinking: "…" }], stop_reason: "max_tokens" }));
      const words = (/word for word: "([^"\n]+)"/.exec(p) || [])[1] || "", animal = (/this clip is about the (\w+)\./.exec(p) || [])[1];
      const toKm = /natural spoken Khmer/.test(p);
      res.end(JSON.stringify({ content: [{ type: "tool_use", id: "t1", name: "write_clip", input: {
        line: toKm ? "ត្រៀមខ្លួនទទួលសំណាងល្អ (the AI's Khmer)" : "Get ready to open your door and welcome gold, money and good luck.",
        picture: `@${animal} acts out the owner's words (${words.slice(0, 30)}): it opens a tall temple door and gold coins and money swirl around it. Slow push-in.` } }], stop_reason: "tool_use" }));
    });
  });
  return new Promise((ok) => aiServer.listen(0, () => ok(`http://127.0.0.1:${aiServer.address().port}/v1/messages`)));
}
export async function setup() {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "studio-voice-"));
  blobs = new BlobsServer({ directory: dir, token: "local-token", port: 0 });
  const { port } = await blobs.start();
  const url = `http://localhost:${port}`;
  process.env.NETLIFY_BLOBS_CONTEXT = Buffer.from(JSON.stringify({ edgeURL: url, uncachedEdgeURL: url, siteID: "local-site", token: "local-token" })).toString("base64");
  process.env.STUDIO_KEY = KEY; process.env.STUDIO_AI_KEY = "test-key-not-real";
  process.env.STUDIO_AI_URL = await startAI();
  return (await import("../netlify/functions/studio-voice.mjs")).default;
}
export async function teardown() { try { await blobs.stop(); } catch (e) {} try { aiServer.close(); } catch (e) {} try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {} }
// dist/ plus /api/studio-voice, with the site's /km and /zh rewrites (for the browser test)
export function serve(handler) {
  const DIST = path.join(ROOT, "dist"), types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };
  const srv = http.createServer(async (req, res) => {
    const u = new URL(req.url, "http://localhost");
    if (u.pathname === "/api/studio-voice") {
      let body = ""; for await (const c of req) body += c;
      const r = await handler(new Request(u.href, { method: req.method, headers: req.headers, body: req.method === "POST" ? body : undefined }), { deploy: { context: "production" } });
      res.writeHead(r.status, Object.fromEntries(r.headers)); return res.end(await r.text());
    }
    let f = path.join(DIST, decodeURIComponent(u.pathname));
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f) && fs.existsSync(f + ".html")) f += ".html";
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f));
  });
  return new Promise((ok) => srv.listen(0, () => ok(srv)));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  let fails = 0, passes = 0;
  const ok = (c, m) => { if (c) passes++; else { fails++; console.log("FAIL", m); } };
  const handler = await setup();
  const call = async (method, data, key = KEY, ctx = { deploy: { context: "production" } }) => {
    const url = "http://localhost/api/studio-voice" + (method === "GET" ? "?" + new URLSearchParams(data) : "");
    const r = await handler(new Request(url, { method, headers: { "content-type": "application/json", ...(key ? { "x-studio-key": key } : {}) }, body: method === "POST" ? JSON.stringify(data) : undefined }), ctx);
    return { status: r.status, body: await r.json() };
  };
  try {
    const D = "2026-11-16", km = "ត្រៀមបើកទ្វារផ្ទះ ដើម្បីទទួលមាសប្រាក់ និងសំណាង";
    const base = { op: "rewrite", date: D, index: 3, animal: "Horse", title: "The magical moment", onCam: false, picture: "@Horse rears up under the moon. Slow orbit.", en: "This is your day.", km: "ថ្ងៃនេះ គឺជាថ្ងៃរបស់អ្នក។" };
    ok((await call("GET", { date: D }, "")).status === 200 && (await call("GET", { date: D }, "anything")).status === 200, "no passcode is needed (owner's request, 16/11/2026)");
    const g0 = await call("GET", { date: D });
    ok(g0.status === 200 && JSON.stringify(g0.body.edits) === "{}", "a date with no changes has no edits");
    const r1 = await call("POST", { ...base, voice: "  " + km + "\n" });
    const e1 = r1.body.edits && r1.body.edits["60s"] && r1.body.edits["60s"][3];
    ok(r1.status === 200 && e1 && e1.km === km && e1.lang === "km", "the owner's Khmer words are kept word for word");
    ok(e1.en === "Get ready to open your door and welcome gold, money and good luck." && /@Horse acts out the owner's words/.test(e1.picture), "the AI's English line and new picture are saved with them");
    const p1 = ai.prompts[ai.prompts.length - 1];
    ok(p1.includes(`word for word: "${km}"`) && /natural English, as a faithful translation/.test(p1) && /Chanda is NOT on screen/.test(p1) && p1.includes("The clip's picture now: @Horse rears up"), "the AI gets the words, the scene and what to write");
    ok(ai.thinking.every((t) => t === "disabled"), "thinking is switched off");
    const g1 = await call("GET", { date: D });
    ok(JSON.stringify(g1.body.edits) === JSON.stringify(r1.body.edits), "the change is saved for that date (any device sees it)");
    ok(JSON.stringify((await call("GET", { date: "2026-11-17" })).body.edits) === "{}", "other dates are not touched");
    // English words, Chanda on camera
    const r2 = await call("POST", { ...base, index: 0, onCam: true, voice: "Get ready to open your door and welcome gold and good luck!" });
    const e2 = r2.body.edits["60s"][0];
    ok(r2.status === 200 && e2.en === "Get ready to open your door and welcome gold and good luck!" && /[ក-៿]/.test(e2.km) && e2.lang === "en" && r2.body.edits["60s"][3].km === km, "English words are kept too, with a Khmer line written for them; scene 4 stays");
    ok(/Chanda is ON CAMERA/.test(ai.prompts[ai.prompts.length - 1]) && /@Chanda keeps facing the camera/.test(ai.prompts[ai.prompts.length - 1]), "an on-camera scene keeps Chanda speaking to the camera");
    // back to the original
    // other videos (the same evening: every video with a scene list)
    const rl = await call("POST", { ...base, video: "long", index: 6, animal: "Rat", title: "Rat – Good Day", videoName: "Long YouTube video – all 12 signs (about 5 minutes)", wide: true, picture: "@Rat sits on a glowing lotus. Slow push-in.", voice: km });
    const pl = ai.prompts[ai.prompts.length - 1];
    ok(rl.status === 200 && rl.body.edits.long[6].km === km && rl.body.edits["60s"][3].km === km, "a scene of the long video is saved under that video, next to the 60s change");
    ok(/today's video "Long YouTube video – all 12 signs/.test(pl) && /horizontal 16:9/.test(pl) && /this clip is about the Rat\./.test(pl) && /@Rat sits on a glowing lotus/.test(pl), "the AI is told which video, its shape and the scene's animal");
    ok(/vertical 9:16/.test(p1) && /60-second video – Facebook & TikTok/.test(p1), "the 60s video is vertical (and is the default)");
    ok((await call("POST", { ...base, video: "nope", voice: km })).status === 400, "an unknown video is refused");
    const r3 = await call("POST", { op: "reset", date: D, video: "60s", index: 0 });
    ok(r3.status === 200 && !r3.body.edits["60s"][0] && r3.body.edits["60s"][3], "Back to the original removes only that scene's change");
    // bad input and AI trouble: nothing changes
    const before = JSON.stringify((await call("GET", { date: D })).body);
    ok((await call("POST", { ...base, voice: "   " })).status === 400, "empty words refused");
    ok((await call("POST", { ...base, index: 8, voice: km })).status === 400 && (await call("POST", { ...base, date: "2026-13-40", voice: km })).status === 400 && (await call("POST", { ...base, animal: "Cat", voice: km })).status === 400, "bad scene, date or animal refused");
    ai.bad = 2; const rb = await call("POST", { ...base, voice: km });
    ok(rb.status === 502 && /could not be read/.test(rb.body.error), "an unreadable AI answer: clear message");
    ai.fail = 2; const rf = await call("POST", { ...base, voice: km });
    ok(rf.status === 502 && /error \(500\)/.test(rf.body.error), "the AI service failing: clear message");
    ok(JSON.stringify((await call("GET", { date: D })).body) === before, "after the errors nothing was changed");
    ai.fail = 1; ok((await call("POST", { ...base, index: 5, voice: km })).status === 200, "one passing AI error is retried");
    // previews keep their own changes
    const prev = await call("GET", { date: D }, KEY, { deploy: { context: "deploy-preview" } });
    ok(JSON.stringify(prev.body.edits) === "{}", "a preview link does not see or change the live Studio's changes");
    // if the API ever refuses the thinking setting, it is left out and the answer gets more room
    ai.refuseThinking = true; const n0 = ai.thinking.length;
    const rt = await call("POST", { ...base, index: 6, voice: km });
    ok(rt.status === 200 && ai.thinking.slice(n0).every((t) => t === "default"), "when thinking cannot be switched off, the change still works");
    ai.refuseThinking = false;
    // the daily limit on AI rewrites (no passcode, so a stranger cannot run up the AI bill)
    process.env.STUDIO_VOICE_DAILY_MAX = "3";
    const calls0 = ai.calls, lim = await call("POST", { ...base, index: 7, voice: km });
    ok(lim.status === 429 && /limit of 3 AI rewrites/.test(lim.body.error) && ai.calls === calls0, "over the daily limit: refused before the AI is asked");
    ok((await call("POST", { op: "reset", date: D, index: 3 })).status === 200 && (await call("GET", { date: D })).status === 200, "reading and Back to the original still work over the limit");
    delete process.env.STUDIO_VOICE_DAILY_MAX;
  } catch (e) { fails++; console.log("FAIL (crash)", e.stack); }
  finally { await teardown(); }
  console.log(fails ? `${fails} check(s) failed, ${passes} passed` : `studio voice service OK: ${passes} checks passed (${ai.calls} stand-in AI calls)`);
  process.exit(fails ? 1 : 0);
}
