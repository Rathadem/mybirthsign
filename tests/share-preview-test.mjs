// Tests the link-preview edge function with the real page HTML (no Netlify needed).
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import handler, { previewFor, applyPreview, typeOf } from "../netlify/edge-functions/share-preview.js";
let pass = 0, fail = 0; const ok = (n, c, x = "") => { if (c) pass++; else { fail++; console.log("FAIL", n, x); } };
const meta = (html, k) => { const m = new RegExp(`<meta (?:property|name)="${k}" content="([^"]*)"`).exec(html); return m && m[1]; };

// 0) generated data is up to date with the site files
const before = fs.readFileSync("netlify/edge-functions/share-preview-data.js", "utf8");
execFileSync("node", ["scripts/share-preview-data.mjs"]);
ok("edge data matches site data files", fs.readFileSync("netlify/edge-functions/share-preview-data.js", "utf8") === before);

// 1) match type = site rule (getCompatibilityType in js/zodiac-data.js) for all 144 pairs
const vm = await import("node:vm"); const ctx = vm.createContext({}); vm.runInContext(fs.readFileSync("js/zodiac-data.js", "utf8") + ";this.g=getCompatibilityType", ctx);
const ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
let same = 0; for (const a of ORDER) for (const b of ORDER) if (typeOf(a, b) === ctx.g(a, b)) same++;
ok("144 pair types match the site", same === 144, same);

// 2) every pair / sign image exists
for (const a of ORDER) for (const b of ORDER) {
  const p = previewFor(new URL(`https://mybirthsign.com/compatibility?pair=${a.toLowerCase()}-${b.toLowerCase()}`));
  if (!fs.existsSync(p.image.replace("https://mybirthsign.com/", ""))) { ok("image exists " + p.image, false); }
}
for (const a of ORDER) ok("sign image " + a, fs.existsSync(`images/og/sign-${a.toLowerCase()}.jpg`));

// 3) real page rewrite, English and Khmer
const compat = fs.readFileSync("compatibility.html", "utf8");
let p = previewFor(new URL("https://mybirthsign.com/compatibility?pair=rat-dragon"));
let h = applyPreview(compat, p);
ok("EN title", meta(h, "og:title") === "Rat &amp; Dragon — Natural Triangle Match | MyBirthSign", meta(h, "og:title"));
ok("EN image", meta(h, "og:image") === "https://mybirthsign.com/images/og/pair-rat-dragon.jpg");
ok("EN url keeps the result", meta(h, "og:url") === "https://mybirthsign.com/compatibility?pair=rat-dragon");
ok("only one og:title", (h.match(/property="og:title"/g) || []).length === 1);
ok("twitter card", meta(h, "twitter:card") === "summary_large_image");
p = previewFor(new URL("https://mybirthsign.com/compatibility?pair=horse-rat&lang=km"));
h = applyPreview(compat, p);
ok("KM title", /^មមី និង ជូត — .+ \| ផ្កាយកំណើត$/.test(meta(h, "og:title")), meta(h, "og:title"));
ok("KM description is Khmer", /[ក-៿]/.test(meta(h, "og:description")) && !/\{A\}/.test(meta(h, "og:description")));
ok("pair image order-independent", p.image.endsWith("pair-rat-horse.jpg"), p.image);
ok("bad pair ignored", previewFor(new URL("https://mybirthsign.com/compatibility?pair=cat-rat")) === null);
ok("plain page ignored", previewFor(new URL("https://mybirthsign.com/compatibility")) === null);
ok("html injection escaped", !/<script>/.test(applyPreview(compat, { lang: "en", url: "x", title: "<script>", description: "\"><script>", image: null })));

// 4) daily sign, with and without the day's data
const rec = { date: "2026-10-10", signs: [{ animal: "Rat", label: { en: "Good Day", km: "ថ្ងៃល្អ" }, text: { en: { fortune: "A calm, steady day for the Rat." }, km: { fortune: "ថ្ងៃស្ងប់សម្រាប់ជូត។" } } }] };
p = previewFor(new URL("https://mybirthsign.com/blog/daily-fortune-2026-10-10.html?sign=rat"), rec);
ok("daily EN title", p.title === "Rat · Good Day — Daily Fortune, October 10, 2026 | MyBirthSign", p.title);
ok("daily EN uses the day's text", p.description === "A calm, steady day for the Rat.");
p = previewFor(new URL("https://mybirthsign.com/blog/daily-fortune-2026-10-10.html?sign=rat&lang=km"), rec);
ok("daily KM", p.description === "ថ្ងៃស្ងប់សម្រាប់ជូត។" && /ថ្ងៃទី១០ ខែតុលា ឆ្នាំ២០២៦/.test(p.title), p.title);
p = previewFor(new URL("https://mybirthsign.com/blog/daily-fortune-2026-10-10.html?sign=rat"), null);
ok("daily without data: generic text", /traditional daily fortune/.test(p.description));
ok("daily page in Khmer", previewFor(new URL("https://mybirthsign.com/blog/daily-fortune-2026-10-10.html?lang=km")).title.includes("ផ្កាយកំណើត"));

// 5) handler: untouched without share params, rewritten with them
const ctxN = (body) => ({ next: async () => new Response(body, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "content-length": "1" } }) });
ok("handler passes through normal requests", (await handler(new Request("https://mybirthsign.com/compatibility"), ctxN(compat))) === undefined);
const r = await handler(new Request("https://mybirthsign.com/compatibility?pair=dog-dragon&lang=km"), ctxN(compat));
const t = await r.text();
ok("handler rewrites shared links", r.status === 200 && /pair-dragon-dog\.jpg/.test(t) && !r.headers.get("content-length"));
console.log(`share-preview tests: ${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
