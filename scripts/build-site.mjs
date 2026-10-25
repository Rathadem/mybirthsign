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
function extractConst(src, name, kw = "const") {
  const start = src.indexOf(`${kw} ${name} =`);
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
const readJs = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const I18N_SRC = readJs("js/i18n.js");
const ANIMAL_NAMES = { km: extractConst(I18N_SRC, "KM_ANIMAL_NAMES"), zh: extractConst(I18N_SRC, "ZH_ANIMAL_NAMES") };
const loadDict = (f, name) => vm.runInNewContext(readJs(f) + `\n;(${name})`, {});   // files that build the object in several statements (e.g. CMP_TEXT.zh = ...)
const CMP_TEXT = loadDict("js/compat-text.js", "CMP_TEXT");
const CMP_GENDER = loadDict("js/compat-gender.js", "CMP_GENDER");
const WED_TEXT = loadDict("js/wedding-text.js", "WED_TEXT");
const CS_UI = extractConst(readJs("js/compare-signs.js"), "UI", "var");
const KC_W = extractConst(readJs("js/khmer-calendar.js"), "W", "var");
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

// ---------------------------------------------------------------- script-translated pages, written out at build time
function setInner(out, id, html) {   // replace the inside of <div id="..."> that has no nested <div>
  const re = new RegExp(`(<div\\b[^>]*\\bid="${id}"[^>]*>)([\\s\\S]*?)(</div>)`);
  const m = re.exec(out);
  if (!m || m[2].includes("<div")) return out;
  return out.slice(0, m.index) + m[1] + html + m[3] + out.slice(m.index + m[0].length);
}
const escH = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function prerenderPageText(out, lang) {
  if (/\sdata-cmp="/.test(out)) {
    const T = CMP_TEXT[lang], G = CMP_GENDER[lang];
    if (T) {
      out = out.replace(/<([a-z0-9]+)(\b[^>]*\sdata-cmp="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, attrs, k, inner) => (T[k] !== undefined && !/<\1\b/.test(inner) ? `<${tag}${attrs}>${T[k]}</${tag}>` : m));
      out = out.replace(/(<label\b[^>]*\bid="cmp-l[12]"[^>]*>)[^<]*(<\/label>)/g, (m, a, b) => a + escH((m.includes("cmp-l1") ? T.p1 : T.p2) + " — " + T.dob) + b);
      if (T.guides) out = setInner(out, "cmp-guides", T.guides.map((g) => `<a class="cmp-guide" href="${g[1]}"><strong>${escH(g[0])}</strong><span>${escH(g[2])}</span></a>`).join(""));
      if (T.faq) out = setInner(out, "cmp-faq", T.faq.map((q) => `<details class="chk-faq-item"><summary>${escH(q[0])}</summary><p>${escH(q[1])}</p></details>`).join(""));
      if (T.seo) out = setInner(out, "cmp-seo", T.seo.map((x) => `<section><h2>${escH(x[0])}</h2>${x[1].map((q) => `<p>${escH(q)}</p>`).join("")}</section>`).join(""));
      if (T.title) out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escH(T.title)} | MyBirthSign</title>`);
      if (T.desc) out = out.replace(/(<meta name="description" content=")[^"]*/, `$1${escH(T.desc)}`);
    }
    if (G) out = out.replace(/(<select id="cmp-g[12]"[^>]*aria-label=")[^"]*("[^>]*>)([\s\S]*?)(<\/select>)/g, (m, a, b, opts, c) =>
      a + escH(G.label) + b + opts.replace(/<option value="([^"]*)">[^<]*<\/option>/g, (o, v) => (G.opts[v] !== undefined ? `<option value="${v}">${escH(G.opts[v])}</option>` : o)) + c);
    const N = ANIMAL_NAMES[lang], C = CS_UI[lang];
    if (C) {
      out = out.replace(/<([a-z0-9]+)(\b[^>]*\sdata-cs="([^"]+)"[^>]*)>([^<]*)<\/\1>/g, (m, tag, attrs, k) => (typeof C[k] === "string" ? `<${tag}${attrs}>${escH(C[k])}</${tag}>` : m));
      out = out.replace(/(<select id="cs-[ab]"[^>]*>)[\s\S]*?(<\/select>)/g, (m, a, b) => a + `<option value="">${escH(C.pick)}</option>` +
        ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"].map((x) => `<option value="${x}">${escH(N[x] || x)}</option>`).join("") + b);
    }
    out = out.replace(/(<ul class="chk-animals" id="cmp-animals">)([\s\S]*?)(<\/ul>)/, (m, a, inner, b) =>
      a + inner.replace(/(animal-([a-z]+)"><img [^>]*alt=")[A-Za-z]+("[^>]*><span>)[A-Za-z]+(<\/span>)/g, (x, p1, slug, p2, p3) => { const nm = N[slug[0].toUpperCase() + slug.slice(1)] || slug; return p1 + escH(nm) + p2 + escH(nm) + p3; }) + b);
  }
  if (/<script src="\/js\/khmer-calendar\.js"/.test(out) && KC_W[lang]) {   // Khmer Calendar page (texts from js/khmer-calendar.js)
    const W = KC_W[lang], noIcon = (x) => String(x).replace(/^[\p{Extended_Pictographic}\p{Regional_Indicator}\uFE0F\u200D]+\s+/u, "");
    const ids = { eyebrow: "eyebrow", title: "title", intro: "intro", f1: "f1", f1d: "f1d", f2: "f2", f2d: "f2d", f3: "f3", f3d: "f3d", f4: "f4", f4d: "f4d", f5: "f5", f5d: "f5d",
      detailsTitle: "details", gregorianLabel: "greg", lunarTitle: "lunar", accuracyNote: "note", eventsTitle: "events", eventsText: "eventsText", upcomingTitle: "upcoming",
      todayBtn: "today", jumpLabel: "jump", footerData: "footer", aboutH: "aboutH", aboutP: "aboutP", lunarHead: "lunarHead", weekday: "pick", lunarText: "hint", lkAbout: "lkAbout", lkPrivacy: "lkPrivacy", lkTerms: "lkTerms", lkContact: "lkContact", srcH: "srcH", src1: "src1", src2: "src2", src3: "src3" };
    for (const [id, k] of Object.entries(ids)) {
      if (W[k] === undefined) continue;
      out = out.replace(new RegExp(`(<([a-z0-9]+)\\b[^>]*\\bid="${id}"[^>]*>)([^<]*)(</\\2>)`), (m, a, tag, t, b) => a + escH(/^f\d$/.test(k) ? noIcon(W[k]) : W[k]) + b);
    }
    if (W.more) out = out.replace(/(<span class="feature-more">)[^<]*(<\/span>)/g, `$1${escH(W.more)}$2`);
    if (W.key) out = out.replace(/(<div class="calendar-key">)[\s\S]*?(<\/div>)/, (m, a, b) => a + W.key.map((x) => `<span>${escH(x)}</span>`).join("") + b);
    out = out.replace(/(<div class="info-row"><span class="info-icon">[^<]*<\/span><span>)[^<]*(<\/span>)/g, ((n) => (m, a, b) => a + escH([W.rowEvent, W.rowMoon, W.rowYear][n++] || "") + b)(0));
    for (const [id, k] of [["prev", "aPrev"], ["next", "aNext"], ["dateJump", "aDate"], ["days", "aDays"]]) if (W[k]) out = out.replace(new RegExp(`(\\bid="${id}"[^>]*\\baria-label=")[^"]*`), `$1${escH(W[k])}`);
  }
  if (/\sdata-wed="/.test(out)) {
    const T = WED_TEXT[lang];
    if (T) {
      out = out.replace(/<([a-z0-9]+)(\b[^>]*\sdata-wed="([^"]+)"[^>]*)>([^<]*)<\/\1>/g, (m, tag, attrs, k) => (T[k] !== undefined ? `<${tag}${attrs}>${escH(T[k])}</${tag}>` : m));
      if (T.why) out = setInner(out, "wed-why", T.why.map((w) => `<article class="wed-why-card"><h3>${escH(w[0])}</h3><p>${escH(w[1])}</p></article>`).join(""));
      if (T.plan) out = setInner(out, "wed-plan", T.plan.map((w, i) => `<article class="wed-plan-card"><span class="wed-plan-n" aria-hidden="true">${i + 1}</span><h3>${escH(w[0])}</h3><p>${escH(w[1])}</p></article>`).join(""));
      if (T.tools) out = setInner(out, "wed-tools", T.tools.map((w) => `<a class="wed-tool" href="${w[2]}"><strong>${escH(w[0])}</strong><span>${escH(w[1])}</span></a>`).join(""));
      if (T.faq) out = setInner(out, "wed-faq", T.faq.map((q) => `<details class="chk-faq-item"><summary>${escH(q[0])}</summary><p>${escH(q[1])}</p></details>`).join(""));
      if (T.title) out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escH(T.title)} | MyBirthSign</title>`);
    }
  }
  return out;
}

// ---------------------------------------------------------------- per-language <title> and description
// Khmer and Chinese pages get a title and description in their own language: from META_OVERRIDE below when a page is
// listed there, otherwise from that language's visible <h1> and first lead paragraph. English keeps the repo's own.
const SCRIPT_RE = { km: /[\u1780-\u17ff]/, zh: /[\u4e00-\u9fff]/ };
const META_OVERRIDE = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/page-meta.json"), "utf8"));
const unent = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const plain = (h) => unent(h.replace(/<span[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g, "").replace(/<(script|style)[\s\S]*?<\/\1>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
function clip(t, max) {
  if (t.length <= max) return t;
  const cut = t.slice(0, max), stop = Math.max(cut.lastIndexOf("។"), cut.lastIndexOf("。"), cut.lastIndexOf(". "));
  if (stop > max * 0.5) return cut.slice(0, stop + 1).trim();
  const sp = cut.lastIndexOf(" ");
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).trim() + "…";
}
const KM_MON = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
function pageMeta(out, lang, p) {
  const o = (META_OVERRIDE[p] || {})[lang] || {};
  const d = pageMetaAuto(out, lang, p);
  return { title: o.title || d.title, desc: o.desc || d.desc };
}
function pageMetaAuto(out, lang, p) {
  const re = SCRIPT_RE[lang];
  const df = /^\/blog\/daily-fortune-(\d{4})-(\d{2})-(\d{2})/.exec(p);
  if (df) {   // daily posts: dated title, same summary as the homepage list
    const [y, m, dd] = df.slice(1).map(Number);
    return lang === "zh" ? { title: `生肖每日运势 — ${y}年${m}月${dd}日`, desc: `${y}年${m}月${dd}日十二生肖运势，包括当天最旺的生肖和需要多加小心的生肖。` }
      : { title: `ជោគជតារាសីប្រចាំថ្ងៃ — ${dd} ${KM_MON[m - 1]} ${y}`, desc: `ជោគជតារាសីថ្ងៃទី ${dd} ${KM_MON[m - 1]} ${y} សម្រាប់សត្វទាំង 12 រួមទាំងសត្វដែលសំណាងល្អបំផុត និងសត្វដែលត្រូវប្រុងប្រយ័ត្ន។` };
  }
  const bodyStart = out.indexOf("</header>") > 0 ? out.indexOf("</header>") : out.indexOf("<body");
  const body = out.slice(bodyStart);
  const h1m = /<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(body);
  const h1 = h1m ? plain(h1m[1]) : "";
  let desc = "";
  const after = h1m ? body.slice(h1m.index) : body;
  for (const m of after.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
    const t = plain(m[1]);
    if (t.length >= 40 && re.test(t)) { desc = t; break; }
  }
  let title = h1 && re.test(h1) ? h1 : "";
  if (title && /^\/blog\/zodiac-year-/.test(p)) {   // animal guides: "<animal year>: personality, years & compatibility", lead from the overview
    title += lang === "zh" ? "：性格、年份与配对" : "៖ បុគ្គលិកលក្ខណៈ ឆ្នាំកំណើត និងគូស្រករ";
    const ov = new RegExp(`id="overview(-${lang})?"`).exec(out);
    if (ov) { let acc = ""; for (const m of out.slice(ov.index).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) { const t = plain(m[1]); if (!re.test(t)) continue; acc += (acc ? (lang === "zh" ? "" : " ") : "") + t; if (acc.length >= 60) break; } if (acc) desc = acc; }
  }
  return { title, desc: desc ? clip(desc, 160) : "" };
}
function setMeta(out, lang, p) {
  if (lang === "en") return out;
  const m = pageMeta(out, lang, p), re = SCRIPT_RE[lang], o = (META_OVERRIDE[p] || {})[lang] || {};
  const curT = (/<title>([\s\S]*?)<\/title>/.exec(out) || [])[1] || "", curD = (/<meta name="description" content="([^"]*)"/.exec(out) || [])[1] || "";
  if (re.test(curT) && !o.title) m.title = unent(curT);   // already written in this language (e.g. by prerenderPageText): keep it, copy it to og/twitter
  if (re.test(curD) && !o.desc) m.desc = unent(curD);
  if (m.title) {
    const t = escAttr(/MyBirthSign/.test(m.title) ? m.title : m.title + " | MyBirthSign");
    out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`).replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`);
  }
  if (m.desc) {
    const d = escAttr(m.desc);
    out = out.replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`).replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${d}`);
  }
  return out;
}
// a Khmer / Chinese version that would only repeat the English text is not published (it redirects to English)
function hasOwnText(out, lang) {
  const body = out.slice(Math.max(0, out.indexOf("</header>")));
  const t = plain(body.replace(/<footer[\s\S]*$/, ""));
  const own = (t.match(lang === "km" ? /[\u1780-\u17ff]/g : /[\u4e00-\u9fff]/g) || []).length;
  const latin = (t.match(/[A-Za-z]{3,}/g) || []).length;
  return !(latin > 300 && own < latin * 0.3);
}

function variant(html, lang, p, langs = LANGS) {
  if (p === "/404") langs = [];   // the not-found page: no alternates, and no saved-language redirect (it is shown at any address)
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

  // 1b. pages whose words come from their own script dictionaries (compatibility, wedding date) get those words written
  //     into the Khmer / Chinese HTML, the same text the script puts there after load
  if (lang !== "en") out = prerenderPageText(out, lang);

  // 2. <html lang> + data-site-lang
  out = out.replace(/<html\b[^>]*>/i, `<html lang="${HTML_LANG[lang]}" data-site-lang="${lang}"${langs.length < LANGS.length ? ` data-site-langs="${langs.join(" ")}"` : ""}>`);

  // 3. canonical / og:url / hreflang alternates
  out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${urlFor(p, lang)}">`);
  out = out.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${urlFor(p, lang)}">`);
  out = out.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, "");
  const alts = langs.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${urlFor(p, l)}">`).join("\n") +
    `\n<link rel="alternate" hreflang="x-default" href="${urlFor(p, "en")}">`;
  if (langs.length) {
    out = out.replace(/(<link rel="canonical" href="[^"]*">)/, `$1\n${alts}`);
    if (!/hreflang="x-default"/.test(out)) out = out.replace(/<\/head>/i, `${alts}\n</head>`);
  }
  if (lang !== "en") out = out.replace(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${lang === "km" ? "km_KH" : "zh_CN"}">`);

  // 2b. title and description in this page's language
  out = setMeta(out, lang, p);
  // 2c. structured data is written in English (headline, FAQ text, English URL); it must match the visible page, so the
  //     Khmer and Chinese versions carry none rather than English markup
  if (lang !== "en") out = out.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

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
  out = out.replace(/<a href="[^"]*"(\s+data-lang-switch="(en|km|zh)")/g, (m, rest, l) => `<a href="${langs.includes(l) ? hrefFor(p, l) : hrefFor("/", l)}"${rest}`);   // no version in that language: its home page
  return out;
}

// ---------------------------------------------------------------- page speed (Core Web Vitals), applied to every published page
// 1. Google Fonts: display=optional instead of swap. A web font that is not ready within a moment is skipped for that
//    page view (it is cached for the next one), so text never jumps when the font arrives (layout shift).
// 2. The site's own scripts at the end of <body> load with "defer": downloaded in parallel and run in the same order
//    once the page is parsed, before DOMContentLoaded, so they no longer hold up the page. Inline scripts on the site
//    wait for DOMContentLoaded before using them. Scripts in <head>, inline scripts and external scripts are untouched.
// 4. One language file per language: js/i18n.<lang>.js is js/i18n.js with the interface text (UI_STRINGS) cut down to
//    the page's language plus English (the fallback every t() lookup already uses). Each page only uses its own
//    language, so this is the same text with much less to download and run. Made fresh from js/i18n.js on every build.
function i18nBundles() {
  const src = fs.readFileSync(path.join(ROOT, "js", "i18n.js"), "utf8");
  const start = src.indexOf("const UI_STRINGS =");
  if (start < 0) throw new Error("js/i18n.js: const UI_STRINGS not found");
  let i = src.indexOf("{", start), depth = 0, str = null, end = -1;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (str) { if (c === "\\") j++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === "`") { str = c; continue; }
    if (c === "/" && src[j + 1] === "/") { j = src.indexOf("\n", j); continue; }
    if (c === "/" && src[j + 1] === "*") { j = src.indexOf("*/", j) + 1; continue; }
    if (c === "{") depth++; else if (c === "}" && --depth === 0) { end = j + 1; break; }
  }
  if (end < 0) throw new Error("js/i18n.js: UI_STRINGS not closed");
  const U = vm.runInNewContext("(" + src.slice(i, end) + ")");
  for (const lang of LANGS) {
    if (!U[lang]) throw new Error(`js/i18n.js: UI_STRINGS.${lang} missing`);
    const keep = lang === "en" ? { en: U.en } : { en: U.en, [lang]: U[lang] };
    const out = src.slice(0, i) + JSON.stringify(keep) + src.slice(end);
    new vm.Script(out);   // must still be valid JavaScript
    fs.writeFileSync(path.join(DIST, "js", `i18n.${lang}.js`), `/* made by scripts/build-site.mjs from js/i18n.js: interface text for "${lang}"${lang === "en" ? "" : " and English"} only */\n` + out);
  }
}
function speed(out, lang) {
  if (lang) out = out.replace(/(<script\b[^>]*\bsrc="[^"]*js\/)i18n\.js((?:\?[^"]*)?")/g, `$1i18n.${lang}.js$2`);
  out = out.replace(/(https:\/\/fonts\.googleapis\.com\/css2\?[^"']*?)display=swap/g, "$1display=optional");
  // 3. pages with the night-sky hero (daily fortunes, animal pages): fetch its picture and the gold animal figure at once,
  //    instead of after the stylesheet is read (they are the largest element on screen). Same address as the CSS uses.
  const fxCss = /<link rel="stylesheet" href="([^"]*)css\/fortune\.css">/.exec(out);
  if (fxCss && /class="fx-hero[ "]/.test(out) && !/hero-night-m\.webp" media/.test(out)) {
    const pre = fxCss[1], fig = /class="fx-hero[^"]*fx-hero--([a-z]+)/.exec(out);
    const tags = `<link rel="preload" as="image" href="${pre}images/fortune/hero-night-m.webp" media="(max-width: 600px)" fetchpriority="high">` +
      `<link rel="preload" as="image" href="${pre}images/fortune/hero-night.webp" media="(min-width: 601px)">` +
      (fig && fs.existsSync(path.join(ROOT, "images", "gold", fig[1] + ".webp")) ? `<link rel="preload" as="image" href="${pre}images/gold/${fig[1]}.webp" fetchpriority="high">` : "");
    out = out.replace(fxCss[0], tags + fxCss[0]);
  }
  const i = out.indexOf("</head>");
  if (i < 0) return out;
  const body = out.slice(i).replace(/<script\b([^>]*\bsrc="(?!https?:|\/\/)[^"]+\.js(?:\?[^"]*)?"[^>]*)><\/script>/g, (m, attrs) =>
    /\b(defer|async|type="module")\b/.test(attrs) ? m : `<script${attrs} defer></script>`);
  return out.slice(0, i) + body;
}

// ---------------------------------------------------------------- walk the repo
function copyFile(src, dest) { fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.copyFileSync(src, dest); }
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
let pages = 0, copied = 0;
const noOwn = [];   // [lang, path] versions that are not published
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
    const blk = findBlocks(html);   // only pages written in language blocks with none for a language can lack it (pages translated by data-i18n keep all three)
    // blog articles written only in English (no language blocks at all, e.g. the holiday guides and weekly articles) are English-only
    const enOnlyArticle = rel.startsWith("blog" + path.sep) && !blk.length && /<html lang="en"/.test(html);
    const langs = LANGS.filter((l) => l === "en" || (!enOnlyArticle && (!blk.some((x) => x.lang === "en") || blk.some((x) => x.lang === l) || hasOwnText(variant(html, l, p), l))));
    for (const lang of LANGS) {
      if (!langs.includes(lang)) { noOwn.push([lang, p]); continue; }
      const dest = path.join(DIST, lang === "en" ? "" : lang, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, speed(variant(html, lang, p, langs), lang));
    }
    pageList.push(p);
    pages++;
  }
})("");

// ---------------------------------------------------------------- private Video Studio at /studio/ (not linked, noindex, not in the sitemap)
// made by scripts/content/build-video-tool.mjs; copied as it is (no language versions, no ads)
const studioDir = path.join(ROOT, "docs", "video-prompts", "studio");
if (fs.existsSync(studioDir)) for (const f of fs.readdirSync(studioDir)) copyFile(path.join(studioDir, f), path.join(DIST, "studio", f));

i18nBundles();

// ---------------------------------------------------------------- scheduled articles: stay hidden until 08:00 Cambodia time on their date
// An article made with scripts/content/weekly-article.py goes live on its "published" date at 08:00 (UTC+7). Until then
// this build leaves its page out and drops every card and link to it (blog page, homepage, other articles), the sitemap
// and its redirects. .github/workflows/scheduled-posts.yml starts a fresh build each morning so it appears on time.
const SCHEDULED = (() => {
  const dir = path.join(ROOT, "scripts", "content", "weekly"), now = Date.now(), out = [];
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    try {
      const s = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      if (s.slug && /^\d{4}-\d{2}-\d{2}$/.test(s.published || "") && Date.parse(`${s.published}T08:00:00+07:00`) > now) out.push(s.slug);
    } catch { /* not an article spec */ }
  }
  return out;
})();
if (SCHEDULED.length) {
  const esc = (s) => s.replace(/[-.]/g, "\\$&");
  const alt = SCHEDULED.map(esc).join("|");
  const href = `href="[^"]*?(?:${alt})(?:\\.html)?"`;
  const card = new RegExp(`(?:<li[^>]*>\\s*)?<a class="(?:bv2-guide-card|bv2-latest-card|hm-bc)[^"]*" ${href}>[\\s\\S]*?</a>(?:\\s*</li>)?\\n?`, "g");
  const link = new RegExp(`<a ${href}[^>]*>([\\s\\S]*?)</a>`, "g");
  const isSched = new RegExp(`(?:^|/)(?:${alt})\\.html$`);
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f), st = fs.statSync(p);
      if (st.isDirectory()) { walk(p); continue; }
      if (!f.endsWith(".html")) continue;
      if (isSched.test(p.split(path.sep).join("/"))) { fs.unlinkSync(p); continue; }
      const h = fs.readFileSync(p, "utf8"), n = h.replace(card, "").replace(link, "$1");
      if (n !== h) fs.writeFileSync(p, n);
    }
  })(DIST);
  for (let i = noOwn.length - 1; i >= 0; i--) if (SCHEDULED.some((s) => noOwn[i][1] === `/blog/${s}`)) noOwn.splice(i, 1);
  console.log(`build-site: scheduled, not live yet: ${SCHEDULED.join(", ")}`);
}

// ---------------------------------------------------------------- sitemap: every page in all three languages
const smPath = path.join(DIST, "sitemap.xml");
if (fs.existsSync(smPath)) {
  const sm = fs.readFileSync(smPath, "utf8");
  const out = sm.replace(/  <url><loc>https:\/\/mybirthsign\.com([^<]*)<\/loc>(.*?)<\/url>\n?/g, (m, p, rest) =>
    /^\/blog\/daily-fortune-/.test(p) ? "" :   // noindex pages stay out of the sitemap (see step 3c)
    SCHEDULED.some((s) => p === `/blog/${s}` || p === `/blog/${s}.html`) ? "" :   // scheduled, not live yet

    LANGS.filter((l) => !noOwn.some(([nl, np]) => nl === l && np === ((p || "/").replace(/\.html$/, "")))).map((l) => `  <url><loc>${urlFor(p || "/", l)}</loc>${rest}</url>`).join("\n") + "\n");
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
  for (const [nl, np] of noOwn) if (nl === l) { R.push(`${prefix(l)}${np}  ${np}  301`); if (np.endsWith("/")) R.push(`${prefix(l)}${np}index.html  ${np}  301`); else R.push(`${prefix(l)}${np}.html  ${np}  301`); }
  R.push(`/${l}/zodiac-guide  /${l}/animals.html  200`);
  R.push(`/${l}/khmer-lunar-calendar-birth-date  /${l}/blog/khmer-lunar-calendar-birth-date.html  301`);
  R.push(`/${l}/khmer-lunar-calendar-birth-date.html  /${l}/blog/khmer-lunar-calendar-birth-date.html  301`);
}
fs.writeFileSync(path.join(DIST, "_redirects"), R.join("\n") + "\n");
console.log(`build-site: ${pages} pages x ${LANGS.length} languages, ${copied} other files -> dist/` + (noOwn.length ? `; not published (no own text, redirected to English): ${noOwn.map(([l, q]) => l + q).join(", ")}` : ""));
