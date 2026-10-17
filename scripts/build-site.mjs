#!/usr/bin/env node
/**
 * Netlify build step: writes the published site to dist/ with ONE language per page address.
 *
 *   node scripts/build-site.mjs            (Netlify runs this; see netlify.toml)
 *
 * The pages in the repo keep all three languages side by side (data-lang-content="en|km|zh" blocks), so every
 * generator and the daily job keep working unchanged. This step splits each page into:
 *   /<page>      English (with AdSense)
 *   /km/<page>   Khmer   (NO AdSense: Khmer is not an AdSense-supported language)
 *   /zh/<page>   Simplified Chinese (with AdSense; where a place has no Chinese block yet, the English block is kept)
 * Each version gets its own <html lang>, canonical, og:url and hreflang links, and the language buttons become real
 * links to the matching address. Text that the site's script fills from UI_STRINGS (data-i18n) is written into the
 * Khmer / Chinese HTML so those pages read correctly before any script runs.
 * Nothing is changed in the repo itself; only dist/ is written.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { findBlocks } from "./lang-blocks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SITE = "https://mybirthsign.com";
const LANGS = ["en", "km", "zh"];
const HTML_LANG = { en: "en", km: "km", zh: "zh-Hans" };
const HREFLANG = { en: "en", km: "km", zh: "zh-Hans" };
const SKIP = new Set(["dist", "node_modules", "scripts", "tests", "docs", "netlify", ".git", ".github", ".netlify", "netlify.toml", "package.json", "package-lock.json", ".gitignore", ".DS_Store"]);
const ASSET_DIRS = ["css", "js", "images", "data", "future"];

// ---------------------------------------------------------------- UI strings (same file the browser uses)
function extractConst(src, name) {
  const start = src.indexOf(`const ${name} =`);
  if (start < 0) throw new Error(`const ${name} not found`);
  let i = src.indexOf("=", start) + 1;
  while (/\s/.test(src[i])) i++;
  const open = src[i], close = open === "{" ? "}" : "]";
  let depth = 0, str = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (str) { if (c === "\\") j++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === "`") { str = c; continue; }
    if (c === open) depth++;
    else if (c === close && --depth === 0) return vm.runInNewContext("(" + src.slice(i, j + 1) + ")");
  }
  throw new Error(`unterminated const ${name}`);
}
const UI = extractConst(fs.readFileSync(path.join(ROOT, "js/i18n.js"), "utf8"), "UI_STRINGS");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => esc(s).replace(/"/g, "&quot;");

// ---------------------------------------------------------------- one language version of a page
const prefix = (lang) => (lang === "en" ? "" : "/" + lang);
function pagePath(rel, html) {
  const m = /<link rel="canonical" href="https:\/\/mybirthsign\.com([^"]*)"/.exec(html);
  if (m) return m[1] || "/";
  return "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
}
const urlFor = (p, lang) => SITE + prefix(lang) + (p === "/" && lang !== "en" ? "/" : p);
const hrefFor = (p, lang) => prefix(lang) + (p === "/" && lang !== "en" ? "/" : p);

// whitespace and HTML comments between language blocks do not break their neighbourhood
function nextNonSpace(html, i) {
  for (;;) {
    while (i < html.length && /\s/.test(html[i])) i++;
    if (html.startsWith("<!--", i)) { const e = html.indexOf("-->", i); if (e < 0) return i; i = e + 3; continue; }
    return i;
  }
}
function prevNonSpace(html, i) {
  for (;;) {
    while (i > 0 && /\s/.test(html[i - 1])) i--;
    if (html.startsWith("-->", i - 3)) { const s = html.lastIndexOf("<!--", i - 3); if (s < 0) return i; i = s; continue; }
    return i;
  }
}

function variant(html, lang, p) {
  // 1. drop the other languages' blocks (in Chinese an English block stays where there is no Chinese block next to it)
  const blocks = findBlocks(html).filter((b) => !b.parent);
  const remove = [];
  for (const b of blocks) {
    if (b.lang === lang) continue;
    if (lang === "zh" && b.lang === "en") {
      // is there a zh block among this block's directly neighbouring blocks (skipping over km / en blocks)?
      const sibs = blocks.filter((o) => o !== b);
      let hasZh = false;
      let j = nextNonSpace(html, b.end);
      for (;;) {
        const o = sibs.find((s) => s.start === j);
        if (!o) break;
        if (o.lang === "zh") { hasZh = true; break; }
        j = nextNonSpace(html, o.end);
      }
      if (!hasZh) {
        let k = prevNonSpace(html, b.start);
        for (;;) {
          const o = blocks.find((s) => s.end === k);
          if (!o) break;
          if (o.lang === "zh") { hasZh = true; break; }
          k = prevNonSpace(html, o.start);
        }
      }
      if (!hasZh) continue;   // English fallback stays
    }
    remove.push(b);
  }
  remove.sort((a, b) => b.start - a.start);
  let out = html;
  for (const b of remove) out = out.slice(0, b.start) + out.slice(b.end);

  // 2. <html lang> + data-site-lang
  out = out.replace(/<html\b[^>]*>/i, `<html lang="${HTML_LANG[lang]}" data-site-lang="${lang}">`);

  // 3. canonical / og:url / hreflang alternates
  out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${urlFor(p, lang)}">`);
  out = out.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${urlFor(p, lang)}">`);
  out = out.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, "");
  const alts = LANGS.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${urlFor(p, l)}">`).join("\n") +
    `\n<link rel="alternate" hreflang="x-default" href="${urlFor(p, "en")}">`;
  out = out.replace(/(<link rel="canonical" href="[^"]*">)/, `$1\n${alts}`);
  if (!/hreflang="x-default"/.test(out)) out = out.replace(/<\/head>/i, `${alts}\n</head>`);
  if (lang !== "en") out = out.replace(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${lang === "km" ? "km_KH" : "zh_CN"}">`);

  // 3b. empty "Ad space" placeholder boxes (hidden by CSS, but still text in the HTML) are left out of the published pages
  out = out.replace(/\s*<div class="ad-slot[^"]*"[^>]*>[^<]*<\/div>/g, "");

  // 3c. daily fortune posts: the day animal repeats every 12 days, so posts 12 days apart are nearly the same page.
  //     Visitors can still open every post; search engines are asked not to index them (they still follow the links).
  if (/^\/blog\/daily-fortune-\d{4}-\d{2}-\d{2}/.test(p) && !/<meta name="robots"/.test(out)) {
    out = out.replace(/(<meta name="viewport"[^>]*>)/, `$1\n<meta name="robots" content="noindex, follow">`);
  }

  // 4. Khmer pages carry no ad code at all
  if (lang === "km") {
    out = out.replace(/\s*<script[^>]*pagead2\.googlesyndication\.com[^>]*><\/script>/gi, "");
    out = out.replace(/\s*<ins class="adsbygoogle"[\s\S]*?<\/ins>/gi, "");
    out = out.replace(/\s*<script>\s*\(adsbygoogle[\s\S]*?<\/script>/gi, "");
  }

  // 6. write this language's UI strings into the HTML (the script would do it after load anyway; this way the page
  //    reads right without script, e.g. the English page's language buttons say "KH" / "CN", not Khmer / Chinese script)
  {
    const S = UI[lang] || {};
    out = out.replace(/(<([a-zA-Z0-9]+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g, (m, open, tag, key, text, close) =>
      S[key] !== undefined && String(S[key]).indexOf("<") < 0 ? open + esc(S[key]) + close : m);
    out = out.replace(/(\sdata-i18n-placeholder="([^"]+)"[^>]*?\splaceholder=")[^"]*(")/g, (m, a, key, b) => (S[key] !== undefined ? a + escAttr(S[key]) + b : m));
  }
  if (lang !== "en") {
    // site-internal absolute page links stay in this language (assets and other folders are left alone)
    out = out.replace(/(\shref=")\/(?!km\/|zh\/|css\/|js\/|images\/|data\/|future\/|\/)([^"#?]*)([^"]*)"/g, (m, a, pth, rest) => {
      if (/\.(?!html$)[a-z0-9]{2,5}$/i.test(pth)) return m;   // a file such as /sitemap.xml or /ads.txt
      return `${a}${prefix(lang)}/${pth}${rest}"`;
    });
  }
  // 7. language buttons -> real links to this page in each language (after step 6, which must not touch them)
  out = out.replace(/<a href="[^"]*"(\s+data-lang-switch="(en|km|zh)")/g, (m, rest, l) => `<a href="${hrefFor(p, l)}"${rest}`);
  return out;
}

// ---------------------------------------------------------------- walk the repo
function copyFile(src, dest) { fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.copyFileSync(src, dest); }
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
let pages = 0, copied = 0;
const pageList = [];
(function walk(dir) {
  for (const name of fs.readdirSync(path.join(ROOT, dir))) {
    const rel = dir ? `${dir}/${name}` : name;
    if (!dir && SKIP.has(name)) continue;
    if (name === ".DS_Store") continue;
    const abs = path.join(ROOT, rel);
    if (fs.statSync(abs).isDirectory()) { walk(rel); continue; }
    const isPage = name.endsWith(".html") && !rel.startsWith("future/") && !/^google[0-9a-f]+\.html$/.test(name);
    if (!isPage) { copyFile(abs, path.join(DIST, rel)); copied++; continue; }
    const html = fs.readFileSync(abs, "utf8");
    const p = pagePath(rel, html);
    for (const lang of LANGS) {
      const dest = path.join(DIST, lang === "en" ? "" : lang, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, variant(html, lang, p));
    }
    pageList.push(p);
    pages++;
  }
})("");

// ---------------------------------------------------------------- sitemap: every page in all three languages
const smPath = path.join(DIST, "sitemap.xml");
if (fs.existsSync(smPath)) {
  const sm = fs.readFileSync(smPath, "utf8");
  const out = sm.replace(/  <url><loc>https:\/\/mybirthsign\.com([^<]*)<\/loc>(.*?)<\/url>\n?/g, (m, p, rest) =>
    /^\/blog\/daily-fortune-/.test(p) ? "" :   // noindex pages stay out of the sitemap (see step 3c)
    LANGS.map((l) => `  <url><loc>${urlFor(p || "/", l)}</loc>${rest}</url>`).join("\n") + "\n");
  fs.writeFileSync(smPath, out);
}

// ---------------------------------------------------------------- _redirects: /km/... and /zh/... share the same files
const R = ["# GENERATED by scripts/build-site.mjs — the Khmer and Chinese folders reuse the site's files"];
for (const l of ["km", "zh"]) {
  for (const d of ASSET_DIRS) R.push(`/${l}/${d}/*  /${d}/:splat  200`);
  for (const f of fs.readdirSync(DIST)) {
    const st = fs.statSync(path.join(DIST, f));
    if (st.isFile() && !f.endsWith(".html") && !["_redirects", "sitemap.xml", "robots.txt", "ads.txt"].includes(f)) R.push(`/${l}/${f}  /${f}  200`);
  }
  R.push(`/${l}/zodiac-guide  /${l}/animals.html  200`);
  R.push(`/${l}/khmer-lunar-calendar-birth-date  /${l}/blog/khmer-lunar-calendar-birth-date.html  301`);
  R.push(`/${l}/khmer-lunar-calendar-birth-date.html  /${l}/blog/khmer-lunar-calendar-birth-date.html  301`);
}
fs.writeFileSync(path.join(DIST, "_redirects"), R.join("\n") + "\n");
console.log(`build-site: ${pages} pages x ${LANGS.length} languages, ${copied} other files -> dist/`);
