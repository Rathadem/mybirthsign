// Checks the All Articles page (/articles) made by scripts/articles-page.mjs:  node tests/articles-page-test.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articlesPage } from "../scripts/articles-page.mjs";
import { findBlocks } from "../scripts/lang-blocks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log("FAIL", msg); } };

const html = articlesPage(ROOT), blog = read("blog.html");
const seg = (h) => Object.fromEntries(findBlocks(h).filter((b) => !b.parent).map((b) => [b.lang, h.slice(b.start, b.end)]));
const P = seg(html), B = seg(blog);
ok(P.en && P.km && P.zh, "page has English, Khmer and Chinese blocks");
// every card keeps the shape the build's "scheduled article" step removes: <a class="bv2-latest-card…" href="…">
const SCHED_SHAPE = /<a class="bv2-latest-card[^"]*" href="blog\/[a-z0-9-]+\.html">/;
for (const lang of ["en", "km", "zh"]) {
  const cards = [...P[lang].matchAll(/<a class="bv2-latest-card ba-t-([a-z]+)" href="blog\/([a-z0-9-]+)\.html">/g)];
  const slugs = cards.map((m) => m[2]);
  ok(cards.length > 0, `${lang}: has cards`);
  ok(new Set(slugs).size === slugs.length, `${lang}: no article listed twice`);
  for (const s of slugs) ok(fs.existsSync(path.join(ROOT, "blog", s + ".html")), `${lang}: blog/${s}.html exists`);
  ok((P[lang].match(/<a class="bv2-latest-card/g) || []).length === (P[lang].match(new RegExp(SCHED_SHAPE.source, "g")) || []).length, `${lang}: every card has the scheduled-step shape`);
  // nothing on the blog page's Latest Articles / Popular Guides is missing
  for (const m of B[lang].matchAll(/<a class="(?:bv2-latest-card|bv2-guide-card)[^"]*" href="blog\/([a-z0-9-]+)\.html">/g))
    if (fs.existsSync(path.join(ROOT, "blog", m[1] + ".html"))) ok(slugs.includes(m[1]), `${lang}: ${m[1]} from blog.html is listed`);
  // each topic button has at least one card
  for (const t of P[lang].matchAll(/data-ba-topic="([a-z]+)"/g)) if (t[1] !== "all") ok(cards.some((c) => c[1] === t[1]), `${lang}: topic ${t[1]} has cards`);
}
// the English page text has no Khmer or Chinese characters
ok(!/[ក-៿一-鿿]/.test(P.en.replace(/<[^>]+>/g, " ")), "en: no Khmer or Chinese text");
ok(!/[一-鿿]/.test(P.km.replace(/<[^>]+>/g, " ")), "km: no Chinese text");
// the stories from the stories page are in the English list
for (const m of read("blog/zodiac-stories-legends.html").matchAll(/<a class="sl-card[^"]*" href="([a-z0-9-]+)"/g)) ok(P.en.includes(`href="blog/${m[1]}.html"`), `en: story ${m[1]} listed`);
// head: own title, address and stylesheet; one <h1> per language
ok(/<link rel="canonical" href="https:\/\/mybirthsign\.com\/articles">/.test(html), "canonical is /articles");
ok(/<title>All Articles \| MyBirthSign Blog<\/title>/.test(html), "English title");
ok(html.includes('href="css/articles.css"') && html.includes('src="js/articles.js"'), "page loads its css and js");
for (const lang of ["en", "km", "zh"]) ok((P[lang].match(/<h1\b/g) || []).length === 1, `${lang}: one h1`);
// the View All Articles links open the page
ok((blog.match(/class="bv2-view-all" href="articles\.html"/g) || []).length === 3, "blog.html: 3 View All Articles links go to articles.html");
ok((read("index.html").match(/fx-btn-sm" href="\/articles"/g) || []).length === 3, "index.html: 3 View All Articles links go to /articles");
ok(read("scripts/home-page.mjs").includes('href="/articles">${esc(u.blogAll)}'), "home-page.mjs keeps the /articles link");
ok(/<loc>https:\/\/mybirthsign\.com\/articles<\/loc>/.test(read("sitemap.xml")), "sitemap lists /articles");

console.log(fails ? `${fails} check(s) failed` : `articles page OK: ${["en", "km", "zh"].map((l) => `${l} ${(P[l].match(/<a class="bv2-latest-card/g) || []).length} cards`).join(", ")}`);
process.exit(fails ? 1 : 0);
