// The "All Articles" page (/articles, /km/articles, /zh/articles): every blog article on one page, with a search box and
// topic buttons (js/articles.js). The "View All Articles →" links on the homepage and the blog page open it.
//
// Made by scripts/build-site.mjs at build time, so it never needs updating by hand: the cards come from blog.html (its
// "Latest Articles" grid, then the Popular Guides that are not in that grid, then the 12 animal guides) and from the
// stories page (blog/zodiac-stories-legends.html), in each language that has them. A new article added to blog.html (for
// example by scripts/content/weekly-article.py) appears here on the next build; a scheduled article that is not live yet is
// dropped from this page by the same build step that drops it from the blog page (the cards keep the
// `<a class="bv2-latest-card…" href="…">` shape that step looks for).
import fs from "node:fs";
import path from "node:path";
import { findBlocks } from "./lang-blocks.mjs";

const T = {
  en: {
    title: "All Articles | MyBirthSign Blog",
    desc: "Every article on the MyBirthSign blog: Chinese zodiac guides, horoscopes, the Khmer calendar, and Cambodian and Chinese festivals.",
    crumb: "Blog", h1: "All Articles",
    lead: "Every article on the MyBirthSign blog in one place: Chinese zodiac guides, horoscopes, the Khmer calendar, and Cambodian and Chinese festivals.",
    search: "Search articles", ph: "Search articles…", topics: "Topics",
    all: "{total} articles", some: "Showing {n} of {total} articles",
    empty: "No articles match your search.", reset: "Show all articles",
    years: "Chinese Zodiac by Birth Year", yearsAll: "Full Years Chart →", yearsNav: "Birth years",
    t: { all: "All", zodiac: "Zodiac guides", horoscopes: "Horoscopes", khmer: "Khmer & Cambodia", festivals: "Chinese festivals", stories: "Zodiac stories" },
  },
  km: {
    crumb: "ប្លុក", h1: "អត្ថបទទាំងអស់",
    lead: "អត្ថបទទាំងអស់នៅលើប្លុក MyBirthSign នៅកន្លែងតែមួយ៖ មគ្គុទ្ទេសក៍រាសីចិន ជោគជតារាសី ប្រតិទិនខ្មែរ និងពិធីបុណ្យខ្មែរ និងចិន។",
    search: "ស្វែងរកអត្ថបទ", ph: "ស្វែងរកអត្ថបទ…", topics: "ប្រធានបទ",
    all: "{total} អត្ថបទ", some: "បង្ហាញ {n} ក្នុងចំណោម {total} អត្ថបទ",
    empty: "រកមិនឃើញអត្ថបទដែលត្រូវនឹងការស្វែងរកនេះទេ។", reset: "បង្ហាញអត្ថបទទាំងអស់",
    years: "រាសីចិនតាមឆ្នាំកំណើត", yearsAll: "តារាងឆ្នាំពេញលេញ →", yearsNav: "ឆ្នាំកំណើត",
    t: { all: "ទាំងអស់", zodiac: "មគ្គុទ្ទេសក៍រាសី", horoscopes: "ជោគជតារាសី", khmer: "ខ្មែរ និងកម្ពុជា", festivals: "ពិធីបុណ្យចិន", stories: "រឿងនិទានរាសី" },
  },
  zh: {
    crumb: "博客", h1: "全部文章",
    lead: "MyBirthSign 博客的全部中文文章都在这一页：中国生肖指南、运势、高棉历法和柬埔寨节日。",
    search: "搜索文章", ph: "搜索文章…", topics: "主题",
    all: "共 {total} 篇文章", some: "显示 {n} / {total} 篇文章",
    empty: "没有找到匹配的文章。", reset: "显示全部文章",
    years: "按出生年份查生肖", yearsAll: "完整年份表 →", yearsNav: "出生年份",
    t: { all: "全部", zodiac: "生肖指南", horoscopes: "运势", khmer: "柬埔寨文化", festivals: "中国节日", stories: "生肖故事" },
  },
};
const TOPICS = ["zodiac", "horoscopes", "khmer", "festivals", "stories"];

// one topic per article, from its address (the same in every language)
function topicOf(slug, stories) {
  if (stories.has(slug)) return "stories";
  if (/2027|horoscope/.test(slug)) return "horoscopes";
  if (/khmer|cambodia|buddhist|kathen|vassa|independence|coronation|water-festival|bon-om-touk|wedding|peace-day|pchum|ambok|villa-vie/.test(slug)) return "khmer";
  if (/chinese-new-year|lunar-new-year|dongzhi|red-envelopes|lucky-foods|taboos|decorations/.test(slug)) return "festivals";
  return "zodiac";
}

const segments = (html) => Object.fromEntries(findBlocks(html).filter((b) => !b.parent).map((b) => [b.lang, html.slice(b.start, b.end)]));
const inner = (s, re) => ((s.match(re) || [])[1] || "").trim();
const card = (slug, topic, img, kicker, title, text, read) =>
  `    <a class="bv2-latest-card ba-t-${topic}" href="blog/${slug}.html">${img}<div class="bv2-latest-body"><p class="bv2-latest-kicker">${kicker}</p><h3>${title}</h3><p>${text}</p><span class="bv2-latest-read">${read}</span></div></a>`;
const lazyImg = (tag) => tag.replace(/\sclass="[^"]*"/, "").replace(/\sloading="[^"]*"/, "").replace(/\sdecoding="[^"]*"/, "").replace(/src="(?:\.\.\/)+/, 'src="').replace(/<img\b/, '<img loading="lazy"');

export function articlesPage(ROOT) {
  const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
  const blog = read("blog.html");
  const storyHub = read("blog/zodiac-stories-legends.html");
  const B = segments(blog), S = segments(storyHub);
  const storySlugs = new Set(["zodiac-stories-legends", ...[...storyHub.matchAll(/<a class="sl-card[^"]*" href="([a-z0-9-]+)"/g)].map((m) => m[1])]);
  const exists = (slug) => fs.existsSync(path.join(ROOT, "blog", slug + ".html"));
  const years = fs.readdirSync(path.join(ROOT, "blog")).map((f) => (/^chinese-zodiac-(\d{4})\.html$/.exec(f) || [])[1]).filter(Boolean).sort();
  const yearLangs = years.length ? segments(read(`blog/chinese-zodiac-${years[0]}.html`)) : {};

  const parts = [];
  for (const lang of ["en", "km", "zh"]) {
    const seg = B[lang];
    if (!seg) continue;
    const L = T[lang], seen = new Set(), cards = [];
    const readLabel = inner(seg, /<span class="bv2-latest-read">([^<]*)<\/span>/) || "Read article →";
    // 1. the blog page's Latest Articles, in its order (newest first)
    for (const m of seg.matchAll(/<a class="bv2-latest-card[^"]*" href="blog\/([a-z0-9-]+)\.html">([\s\S]*?)<\/a>/g)) {
      const [, slug, body] = m;
      if (seen.has(slug) || !exists(slug)) continue;
      seen.add(slug);
      cards.push(`    <a class="bv2-latest-card ba-t-${topicOf(slug, storySlugs)}" href="blog/${slug}.html">${body}</a>`);
    }
    // 2. Popular Guides that are not in that list
    for (const m of seg.matchAll(/<a class="bv2-guide-card[^"]*" href="blog\/([a-z0-9-]+)\.html">([\s\S]*?)<\/a>/g)) {
      const [, slug, body] = m;
      if (seen.has(slug) || !exists(slug)) continue;
      const img = (body.match(/<img\b[^>]*>/) || [])[0], title = inner(body, /<h3>([\s\S]*?)<\/h3>/), text = inner(body, /<p>([\s\S]*?)<\/p>/);
      if (!img || !title) continue;
      seen.add(slug);
      const tp = topicOf(slug, storySlugs);
      cards.push(card(slug, tp, lazyImg(img), L.t[tp], title, text, readLabel));
    }
    // 3. the zodiac stories, from the stories page in this language
    if (S[lang]) {
      for (const m of S[lang].matchAll(/<a class="sl-card[^"]*" href="([a-z0-9-]+)">([\s\S]*?)<\/a>/g)) {
        const [, slug, body] = m;
        if (seen.has(slug) || !exists(slug)) continue;
        const img = (body.match(/<img\b[^>]*>/) || [])[0], title = inner(body, /<h[23]>([\s\S]*?)<\/h[23]>/), text = inner(body, /<\/h[23]>\s*<p>([\s\S]*?)<\/p>/);
        if (!img || !title) continue;
        seen.add(slug);
        cards.push(card(slug, "stories", lazyImg(img), L.t.stories, title, text, inner(body, /<span class="sl-read">([^<]*)<\/span>/) || readLabel));
      }
    }
    const used = TOPICS.filter((tp) => cards.some((c) => c.includes(` ba-t-${tp}"`)));
    const chip = (tp) => `<button type="button" class="ba-chip" data-ba-topic="${tp}" aria-pressed="${tp === "all"}">${L.t[tp]} <span class="ba-n"></span></button>`;
    const animals = (seg.match(/<section class="bv2-section" id="zodiac-animals[^"]*">[\s\S]*?<\/section>/) || [""])[0];
    const yearSec = years.length && yearLangs[lang]
      ? `<section class="bv2-section ba-years-sec" aria-labelledby="ba-years-${lang}">
  <div class="bv2-section-head"><h2 id="ba-years-${lang}">${L.years}</h2><a class="bv2-view-all" href="blog/chinese-zodiac-years-chart.html">${L.yearsAll}</a></div>
  <div class="ba-years" role="group" aria-label="${L.yearsNav}">${years.map((y) => `<a href="blog/chinese-zodiac-${y}.html">${y}</a>`).join("")}</div>
</section>` : "";
    parts.push(`<div data-lang-content="${lang}">
<section class="bv2-section ba-list" data-ba aria-labelledby="ba-h1-${lang}">
  <div class="ba-head">
    <p class="ba-crumbs"><a href="blog.html">${L.crumb}</a> <span aria-hidden="true">›</span> <span>${L.h1}</span></p>
    <h1 id="ba-h1-${lang}">${L.h1}</h1>
    <p class="ba-lead">${L.lead}</p>
  </div>
  <div class="ba-tools" data-ba-tools hidden>
    <label class="ba-search"><span class="ba-sr">${L.search}</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg><input type="search" data-ba-q placeholder="${L.ph}" autocomplete="off"></label>
    <div class="ba-chips" role="group" aria-label="${L.topics}">${["all", ...used].map(chip).join("")}</div>
    <p class="ba-count" data-ba-count data-all="${L.all}" data-some="${L.some}" aria-live="polite"></p>
  </div>
  <div class="bv2-latest-grid ba-grid">
${cards.join("\n")}
  </div>
  <div class="ba-empty" data-ba-empty hidden><p>${L.empty}</p><button type="button" class="ba-chip" data-ba-reset>${L.reset}</button></div>
</section>

${animals}

${yearSec}
</div>`);
  }

  // head, menu bar and footer: the blog page's own, with this page's title, address and description
  const E = T.en;
  const head = blog.slice(0, blog.indexOf("</head>"))
    .replace(/<title>[^<]*<\/title>/, `<title>${E.title.replace(/&/g, "&amp;")}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*/, "$1https://mybirthsign.com/articles")
    .replace(/(<meta property="og:url" content=")[^"]*/, "$1https://mybirthsign.com/articles")
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${E.title}`)
    .replace(/(<meta (?:property="og:description"|name="description") content=")[^"]*/g, `$1${E.desc}`)
    .replace(/(<link rel="stylesheet" href="css\/blog-polish\.css">)/, '$1\n<link rel="stylesheet" href="css/articles.css">');
  const bodyOpen = blog.indexOf("<body"), header = blog.slice(bodyOpen, blog.indexOf("</header>") + 9).replace(/<body class="page-blog">/, '<body class="page-blog page-articles">');
  const footer = (blog.match(/<footer class="site-footer">[\s\S]*?<\/footer>/) || [""])[0];
  return `${head}</head>\n${header.slice(header.indexOf("<body"))}\n\n<main class="ba-main">\n${parts.join("\n\n")}\n</main>\n\n${footer}\n\n<script src="js/i18n.js"></script>\n<script src="js/articles.js" defer></script>\n</body>\n</html>\n`;
}
