#!/usr/bin/env node
/**
 * Generates the premium homepage (index.html, English + Khmer).
 *
 *   node scripts/home-page.mjs
 *
 * Data comes only from the site's own files: js/zodiac-data.js (animals, triangles, elements), js/i18n.js (Khmer names and
 * existing copy) and the blog/ folder (latest daily-fortune posts). Nothing about the zodiac calculation is re-implemented here:
 * the "Find my sign" card hands the date to the existing /checker, and the compatibility form keeps the ids that js/app.js
 * already wires up (compat-form, dob-a, dob-b, context, compat-result).
 * The only logic repeated is the day-animal / tier rule the daily-fortune pages already use (see scripts/animal-profile.mjs).
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
function extractConst(src, name, ctx = {}) {
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
    else if (c === close && --depth === 0) return vm.runInNewContext("(" + src.slice(i, j + 1) + ")", ctx);
  }
  throw new Error(`unterminated const ${name}`);
}
const zdata = read("js/zodiac-data.js"), i18n = read("js/i18n.js");
const ORDER = extractConst(zdata, "ZODIAC_ANIMALS");
const TRIANGLES = extractConst(zdata, "ZODIAC_TRIANGLES");
const ELEMENTS = extractConst(zdata, "ELEMENTS");
const KM_NAMES = extractConst(i18n, "KM_ANIMAL_NAMES");
const UI_STRINGS = extractConst(i18n, "UI_STRINGS");
const AU = extractConst(read("scripts/animals-page.mjs"), "UI", { KM_ELEM: extractConst(i18n, "KM_ELEMENT_NAMES"), ORDER, INFO: {}, KM_INFO: {}, KM_NAMES });   // reuse the /animals copy (cycle, elements) so both pages say the same thing
const HAN = { Rat: "鼠", Ox: "牛", Tiger: "虎", Rabbit: "兔", Dragon: "龍", Snake: "蛇", Horse: "馬", Goat: "羊", Monkey: "猴", Rooster: "雞", Dog: "狗", Pig: "豬" };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (a) => a.toLowerCase();
const href = (a) => `blog/zodiac-year-${slug(a)}.html`;
const nm = (a, km) => (km ? KM_NAMES[a] : a);
const T = (en, km) => `<span data-lang-content="en">${en}</span><span data-lang-content="km">${km}</span>`;   // for the two shared (form) sections only
const medal = (a, s, lazy = true) => `<img class="an-medal" src="images/profile/${s <= 80 ? "s152/" : ""}medal-${slug(a)}.webp" width="${s}" height="${s}" alt="" ${lazy ? 'loading="lazy" decoding="async"' : 'fetchpriority="high"'}>`;

// ---------------------------------------------------------------- the day rule (same as the daily-fortune pages)
const jdn = (y, m, d) => Math.floor(Date.UTC(y, m - 1, d) / 86400000) + 2440588;
const dayAnimal = (y, m, d) => ORDER[(jdn(y, m, d) + 1) % 12];
const tierOf = (a, d) => a === d ? "great" : TRIANGLES.some((t) => t.includes(a) && t.includes(d)) ? "good" : Math.abs(ORDER.indexOf(a) - ORDER.indexOf(d)) === 6 ? "caution" : "ordinary";
const phnom = () => { const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-").map(Number); return p; };
const [TY, TM, TD] = phnom();
const TODAY_ANIMAL = dayAnimal(TY, TM, TD);

const sk = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const ICON = {
  heart: sk("M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z"),
  brief: sk("M4 8h16v11H4zM9 8V5.5h6V8M4 13h16"),
  star: sk("m12 3.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 20l1.1-6L3.4 9.8l6-.8L12 3.5Z"),
  lotus: sk("M12 19c-3.6 0-6-2.4-6.5-6 2.2.2 4 1.2 6.5 3.4 2.5-2.2 4.3-3.2 6.5-3.4-.5 3.6-2.9 6-6.5 6ZM12 16c-2.2-1.8-2.6-5.6 0-9.5 2.6 3.9 2.2 7.7 0 9.5Z"),
  cal: sk("M4 6.5h16V20H4zM4 11h16M8.5 4v4M15.5 4v4"),
  dragon: sk("M5 17c0-5 3-8 7-8 2.4 0 4 1.3 4 3.1 0 1.6-1.3 2.6-2.8 2.6M16 9l3-3.5M5 17c1.5 2 4 3 7 2"),
  leaf: sk("M5 19c0-8 5-13 14-14 0 9-5 14-14 14ZM5 19l7-7"),
  spark: sk("M12 3.5 13.8 10l6.7 2-6.7 2L12 20.5 10.2 14 3.5 12l6.7-2L12 3.5Z"),
  orn: '<svg class="fx-orn" viewBox="0 0 150 14" aria-hidden="true"><path d="M2 7h56M92 7h56" stroke="#e7c27a" stroke-width="1" opacity=".8"/><path d="M75 1l5 6-5 6-5-6 5-6Z" fill="none" stroke="#f6dc9b" stroke-width="1.2"/></svg>',
};
const ring = (cls, size, km) => `<ul class="an-ring ${cls}" aria-hidden="true">${ORDER.map((a, i) => `<li style="--i:${i}"><span>${medal(a, size)}</span></li>`).join("")}</ul>`;

// ---------------------------------------------------------------- copy
const TIER = {
  en: { great: ["★", "Great day", "Big decisions, bold moves, saying what's on your mind."], good: ["✦", "Good day", "Steady follow-through on something already in motion."], ordinary: ["◐", "Ordinary day", "Routine tasks — nothing special pulling for or against you today."], caution: ["▲", "Take it easy", "Low-key tasks only. Worth skipping anything high-stakes if you can."] },
  km: { great: ["★", "ថ្ងៃល្អខ្លាំង", "ការសម្រេចចិត្តធំៗ ការផ្លាស់ប្តូរយ៉ាងក្លាហាន និងការនិយាយអ្វីដែលគិតក្នុងចិត្ត។"], good: ["✦", "ថ្ងៃល្អ", "ការបន្តធ្វើកិច្ចការដែលកំពុងដំណើរការស្រាប់ដោយស្ថិរភាព។"], ordinary: ["◐", "ថ្ងៃធម្មតា", "កិច្ចការប្រចាំថ្ងៃ — គ្មានអ្វីពិសេសគាំទ្រ ឬប្រឆាំងនឹងអ្នកថ្ងៃនេះទេ។"], caution: ["▲", "ថ្ងៃគួរប្រុងប្រយ័ត្ន", "កិច្ចការស្រាលៗប៉ុណ្ណោះ។ ប្រសិនបើអាច គួរជៀសវាងការសម្រេចចិត្តសំខាន់ៗ។"] },
};
const KM_MONTHS = UI_STRINGS.km && ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const kmDigits = (n) => String(n).replace(/\d/g, (d) => "០១២៣៤៥៦៧៨៩"[d]);
const fmtDate = (y, m, d, km) => km ? `ថ្ងៃទី${kmDigits(d)} ខែ${KM_MONTHS[m - 1]} ឆ្នាំ${kmDigits(y)}` : `${EN_MONTHS[m - 1]} ${d}, ${y}`;

const UI = {
  en: {
    eyebrow: "DISCOVER YOUR CHINESE ZODIAC", h1: "Discover Your Chinese Zodiac Sign",
    sub: "Uncover your personality, compatibility, lucky signs, and more based on your birth date.",
    btnFind: "✨ Check My Zodiac Sign →", btnCompat: "💗 Check Compatibility →",
    benefits: [["star", "Personality Insights"], ["heart", "Love Compatibility"], ["brief", "Career Guidance"], ["lotus", "Lucky Signs & Elements"]],
    todayH: "Today's Chinese Zodiac Fortune", todayP: "A quick look at how the day treats each of the 12 signs.", todayB: "View Today's Full Fortune →", todayNote: "For entertainment and self-reflection only. Daily ratings are based on traditional Chinese zodiac day relationships and are not scientific predictions.",
    animalsH: "Explore the 12 Chinese Zodiac Animals", animalsP: "Choose an animal to learn about its personality, years, elements, lucky signs and compatibility.", animalsB: "View All Animals →",
    toolsH: "Explore MyBirthSign Tools",
    tools: [
      ["images/checker/art-love.webp", "Chinese Zodiac Compatibility", "See how two birth dates traditionally match in love, friendship, and business.", "Check Compatibility →", "/compatibility"],
      ["images/compat/hero-bg-card.webp", "Wedding Date Picker", "Explore traditionally favorable wedding months based on both zodiac signs.", "Find a Good Date →", "/wedding-date"],
      ["images/checker/art-career.webp", "Business Partner Match", "Compare two birth dates for traditional Chinese zodiac business compatibility.", "Check Business Match →", "/business-partner"],
      ["images/checker/art-pers.webp", "Zodiac Guide", "Learn about the 12 animals, elements, lucky signs and more.", "Explore Guide →", "/zodiac-guide"],
    ],
    whyH: "Why Choose MyBirthSign?", whyP: "Traditional Chinese zodiac interpretation, made simple.",
    why: [["spark", "Accurate Zodiac Calculation", "Based on Lunar New Year boundaries and Chinese zodiac traditions."], ["star", "Detailed Personality Insights", "Learn about strengths, challenges and traditional traits."], ["heart", "Love & Relationship Guidance", "Explore traditional zodiac compatibility."], ["brief", "Career & Business Compatibility", "Compare traditional zodiac strengths."], ["lotus", "Easy to Use", "Simple tools designed for quick answers."]],
    guidesH: "Featured Zodiac Guides", guidesB: "Read More →",
    guides: [
      ["images/guides/compatibility-guide.webp", "Compatibility", "Zodiac Compatibility Guide: Who Matches Who", "Find your best match in love, friendship, and business.", "blog/zodiac-compatibility-guide.html"],
      ["images/guides/five-elements.webp", "Elements", "The Five Elements Explained", "Wood, Fire, Earth, Metal and Water, and how they shape each sign.", "blog/five-elements-explained.html"],
      ["images/guides/calculate-zodiac.webp", "Basics", "How to Calculate Your Chinese Zodiac Sign", "Why the Lunar New Year matters when you were born in January or February.", "blog/how-to-calculate-zodiac-sign.html"],
      ["images/guides/zodiac-personality.webp", "Personality", "What Your Chinese Zodiac Sign Says About You", "Explore the traditional traits of each zodiac animal.", "blog/what-your-zodiac-says.html"],
    ],
    howH: "How MyBirthSign Works", howSteps: [["cal", "Enter Your Birth Date"], ["dragon", "Discover Your Zodiac Animal"], ["leaf", "Explore Your Element"], ["spark", "Discover Compatibility & Guidance"]],
    howP: "Chinese zodiac signs follow a traditional 12-year cycle. Because the zodiac year follows the Lunar New Year calendar, people born in January or February should check their exact birth date.", howB: "Check My Zodiac →",
    crossH1: "Planning Your Wedding?", crossP1: "Explore traditionally favorable wedding months based on both zodiac signs.", crossB1: "Wedding Date Picker →",
    crossH2: "Choosing a Business Partner?", crossP2: "Compare two birth dates using traditional Chinese zodiac compatibility.", crossB2: "Business Partner Match →",
    blogH: "From the MyBirthSign Blog", blogB: "Read More →", blogAll: "View All Articles →",
    blogDesc: "Today's Chinese zodiac fortune for all 12 animals, with the best signs of the day and signs needing extra care.", blogTitle: (d) => `Chinese Zodiac Daily Fortune — ${d}`,
    finalH: "Your Journey with the Stars", finalP: "Explore the wisdom of the Chinese zodiac and discover more about love, career, compatibility, and harmony.", finalB: "Start Your Zodiac Journey →",
  },
  km: {
    eyebrow: "វដ្តរាសី ១២ ឆ្នាំ", h1: "ស្វែងយល់ពីរាសីឆ្នាំចិនរបស់អ្នក",
    sub: "ស្វែងយល់ពីបុគ្គលិកលក្ខណៈ ភាពត្រូវគ្នា សំណាង និងព័ត៌មានផ្សេងៗ តាមថ្ងៃ ខែ ឆ្នាំកំណើតរបស់អ្នក។",
    btnFind: "🔮 ពិនិត្យរាសីរបស់ខ្ញុំ", btnCompat: "💗 ពិនិត្យភាពត្រូវគ្នា",
    benefits: [["star", "ការយល់ដឹងអំពីបុគ្គលិកលក្ខណៈ"], ["heart", "ភាពត្រូវគ្នាក្នុងស្នេហា"], ["brief", "ការណែនាំអាជីព"], ["lotus", "សំណាង និងធាតុ"]],
    todayH: "ជោគជតារាសីប្រចាំថ្ងៃនេះ", todayP: "មើលរហ័សថាថ្ងៃនេះប្រព្រឹត្តចំពោះសត្វរាសីទាំង ១២ យ៉ាងណា។", todayB: "មើលជោគជតារាសីថ្ងៃនេះពេញលេញ →", todayNote: "សម្រាប់ការកំសាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ។ ការវាយតម្លៃប្រចាំថ្ងៃផ្អែកលើទំនាក់ទំនងថ្ងៃ-សត្វរាសីតាមប្រពៃណី ហើយមិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រទេ។",
    animalsH: "ស្វែងយល់សត្វរាសីទាំង ១២", animalsP: "ជ្រើសរើសសត្វមួយ ដើម្បីស្វែងយល់អំពីបុគ្គលិកលក្ខណៈ ឆ្នាំកំណើត ធាតុ សំណាង និងភាពត្រូវគ្នា។", animalsB: "មើលសត្វរាសីទាំងអស់ →",
    toolsH: "ឧបករណ៍របស់ MyBirthSign",
    tools: [
      ["images/checker/art-love.webp", "ភាពត្រូវគ្នានៃរាសី", "មើលថាតើថ្ងៃកំណើតពីរត្រូវគ្នាតាមប្រពៃណីយ៉ាងណាក្នុងស្នេហា មិត្តភាព និងអាជីវកម្ម។", "ពិនិត្យភាពត្រូវគ្នា →", "/compatibility"],
      ["images/compat/hero-bg.webp", "ជ្រើសរើសថ្ងៃរៀបការ", "ស្វែងរកខែមង្គលតាមប្រពៃណី ដោយផ្អែកលើរាសីទាំងពីរ។", "ស្វែងរកថ្ងៃល្អ →", "/wedding-date"],
      ["images/checker/art-career.webp", "ភាពសមស្របដៃគូអាជីវកម្ម", "ប្រៀបធៀបថ្ងៃកំណើតពីរ សម្រាប់ភាពសមស្រប​ក្នុងអាជីវកម្មតាមប្រពៃណី។", "ពិនិត្យភាពសមស្របអាជីវកម្ម →", "/business-partner"],
      ["images/checker/art-pers.webp", "មគ្គុទ្ទេសក៍រាសី", "ស្វែងយល់អំពីសត្វទាំង ១២ ធាតុ សំណាង និងច្រើនទៀត។", "ស្វែងយល់មគ្គុទ្ទេសក៍ →", "/zodiac-guide"],
    ],
    whyH: "ហេតុអ្វីជ្រើសរើស MyBirthSign?", whyP: "ការបកស្រាយរាសីតាមប្រពៃណី ធ្វើឱ្យងាយស្រួល។",
    why: [["spark", "ការគណនារាសីត្រឹមត្រូវ", "ផ្អែកលើព្រំដែនចូលឆ្នាំចន្ទគតិ និងប្រពៃណីរាសី។"], ["star", "ការយល់ដឹងលម្អិតអំពីបុគ្គលិកលក្ខណៈ", "ស្វែងយល់អំពីចំណុចខ្លាំង ឧបសគ្គ និងលក្ខណៈតាមប្រពៃណី។"], ["heart", "ការណែនាំស្នេហា និងទំនាក់ទំនង", "ស្វែងយល់ភាពត្រូវគ្នាតាមប្រពៃណី។"], ["brief", "ភាពសមស្រប​ការងារ និងអាជីវកម្ម", "ប្រៀបធៀបចំណុចខ្លាំងតាមប្រពៃណី។"], ["lotus", "ងាយស្រួលប្រើ", "ឧបករណ៍សាមញ្ញ សម្រាប់ចម្លើយរហ័ស។"]],
    guidesH: "មគ្គុទ្ទេសក៍រាសីពិសេស", guidesB: "អានបន្ថែម →",
    guides: [
      ["images/guides/compatibility-guide.webp", "ភាពត្រូវគ្នា", "មគ្គុទ្ទេសក៍ភាពត្រូវគ្នានៃរាសី", "ស្វែងរកគូដែលសមបំផុតក្នុងស្នេហា មិត្តភាព និងអាជីវកម្ម។", "blog/zodiac-compatibility-guide.html"],
      ["images/guides/five-elements.webp", "ធាតុ", "ធាតុទាំងប្រាំ ពន្យល់ងាយៗ", "ឈើ ភ្លើង ដី ដែក និងទឹក និងរបៀបដែលវាជះឥទ្ធិពលដល់សត្វនីមួយៗ។", "blog/five-elements-explained.html"],
      ["images/guides/calculate-zodiac.webp", "មូលដ្ឋាន", "របៀបគណនារាសីឆ្នាំរបស់អ្នក", "ហេតុអ្វីបានជាចូលឆ្នាំចន្ទគតិសំខាន់ ប្រសិនបើអ្នកកើតខែមករា ឬកុម្ភៈ។", "blog/how-to-calculate-zodiac-sign.html"],
      ["images/guides/zodiac-personality.webp", "បុគ្គលិកលក្ខណៈ", "រាសីរបស់អ្នកប្រាប់អ្វីអំពីអ្នក", "ស្វែងយល់អំពីលក្ខណៈតាមប្រពៃណីរបស់សត្វរាសីនីមួយៗ។", "blog/what-your-zodiac-says.html"],
    ],
    howH: "របៀបដែល MyBirthSign ដំណើរការ", howSteps: [["cal", "បញ្ចូលថ្ងៃកំណើតរបស់អ្នក"], ["dragon", "ស្វែងរកសត្វរាសីរបស់អ្នក"], ["leaf", "ស្វែងយល់ធាតុរបស់អ្នក"], ["spark", "ស្វែងយល់ភាពត្រូវគ្នា និងការណែនាំ"]],
    howP: "រាសីវិលជុំតាមវដ្ត ១២ឆ្នាំ។ ដោយសារឆ្នាំរាសីតាមប្រតិទិនចូលឆ្នាំចន្ទគតិ អ្នកដែលកើតក្នុងខែមករា ឬកុម្ភៈ គួរពិនិត្យថ្ងៃកំណើតជាក់លាក់របស់ខ្លួន។", howB: "ពិនិត្យរាសីរបស់ខ្ញុំ →",
    crossH1: "កំពុងរៀបចំពិធីមង្គលការ?", crossP1: "ស្វែងរកខែមង្គលតាមប្រពៃណី ដោយផ្អែកលើរាសីទាំងពីរ។", crossB1: "ជ្រើសរើសថ្ងៃរៀបការ →",
    crossH2: "កំពុងជ្រើសរើសដៃគូអាជីវកម្ម?", crossP2: "ប្រៀបធៀបថ្ងៃកំណើតពីរ តាមភាពត្រូវគ្នានៃរាសីតាមប្រពៃណី។", crossB2: "ភាពសមស្រប​ដៃគូអាជីវកម្ម →",
    blogH: "ពីប្លុករបស់ MyBirthSign", blogB: "អានបន្ថែម →", blogAll: "មើលអត្ថបទទាំងអស់ →",
    blogDesc: "ជោគជតារាសីថ្ងៃនេះសម្រាប់សត្វទាំង ១២ រួមទាំងសត្វដែលសំណាងល្អបំផុត និងសត្វដែលត្រូវប្រុងប្រយ័ត្ន។", blogTitle: (d) => `ជោគជតារាសីប្រចាំថ្ងៃ — ${d}`,
    finalH: "ដំណើររបស់អ្នកជាមួយផ្កាយ", finalP: "ស្វែងយល់ប្រាជ្ញារាសី ហើយស្គាល់បន្ថែមអំពីស្នេហា អាជីព ភាពត្រូវគ្នា និងសុខដុមរមនា។", finalB: "ចាប់ផ្តើមដំណើររាសីរបស់អ្នក →",
  },
};

// ---------------------------------------------------------------- latest blog posts (from the real files)
const posts = fs.readdirSync(path.join(ROOT, "blog")).filter((f) => /^daily-fortune-\d{4}-\d{2}-\d{2}\.html$/.test(f)).sort().reverse().slice(0, 3).map((f) => {
  const [y, m, d] = f.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1).map(Number);
  return { file: `blog/${f}`, y, m, d, animal: dayAnimal(y, m, d) };
});
const latestPost = posts[0];

// ---------------------------------------------------------------- sections (one language each)
function body(lang) {
  const km = lang === "km", u = UI[lang];
  const ID = (s) => `hm-${s}-${lang}`;
  return `<div class="hm-body">
<section class="fx-hero an-hero hm-hero" aria-labelledby="${ID("h1")}">
  <span class="hm-stars" aria-hidden="true"></span>
  <div class="an-hero-in">
    <div class="an-hero-text">
      <p class="fx-eyebrow">${esc(u.eyebrow)}</p>
      <h1 id="${ID("h1")}"><strong>${esc(u.h1)}</strong></h1>
      <p class="fx-sub">${esc(u.sub)}</p>
      <div class="pf-cta-row"><a class="fx-btn" href="/checker">${esc(u.btnFind)}</a><a class="fx-btn fx-btn-rose" href="/compatibility">${esc(u.btnCompat)}</a></div>
      <ul class="hm-benefits">${u.benefits.map(([i, t]) => `<li><span class="hm-bi">${ICON[i]}</span><span>${esc(t)}</span></li>`).join("")}</ul>
    </div>
  </div>
</section>
</div>`;
}
function main2(lang) {
  const km = lang === "km", u = UI[lang], au = AU[lang], tr = TIER[lang];
  const ID = (s) => `hm-${s}-${lang}`;
  const card = (a) => {
    const t = tierOf(a, TODAY_ANIMAL), [ico, lab, line] = tr[t];
    return `        <li class="hm-fc fx-tier-${t}" data-hm-card data-animal="${a}"><a class="hm-fc-name" href="${href(a)}">${medal(a, 76)}<span>${esc(nm(a, km))}</span></a>
          <span class="hm-status" data-hm-status><span aria-hidden="true" data-hm-ico>${ico}</span> <span data-hm-lab>${esc(lab)}</span></span>
          <p data-hm-line>${esc(line)}</p></li>`;
  };
  const animalCard = (a) => `        <li><a class="hm-ac" href="${href(a)}">${medal(a, 96)}<strong>${esc(nm(a, km))}</strong><span class="hm-han" lang="zh" aria-hidden="true">${HAN[a]}</span>${km ? "" : `<small lang="km">ឆ្នាំ${esc(KM_NAMES[a])}</small>`}</a></li>`;
  const postCard = (p) => {
    const dt = fmtDate(p.y, p.m, p.d, km);
    return `        <li><a class="hm-pc" href="${p.file}"><img src="images/zodiac/${slug(p.animal)}.webp" width="360" height="542" alt="" loading="lazy" decoding="async"><div><time datetime="${p.y}-${String(p.m).padStart(2, "0")}-${String(p.d).padStart(2, "0")}">${esc(dt)}</time><h3>${esc(u.blogTitle(dt))}</h3><p>${esc(u.blogDesc)}</p><span class="hm-more">${esc(u.blogB)}</span></div></a></li>`;
  };
  return { card, animalCard, postCard, ID, km, u, au, tr };
}

// Section builders that sit between the two shared (form) sections.
function partA(lang) {   // fortune, animals, tools
  const { card, animalCard, ID, km, u } = main2(lang);
  return `<div class="fx-wrap">
  <section class="fx-sec fx-sec-first" id="fortune" aria-labelledby="${ID("fo")}">
    <div class="fx-head"><h2 id="${ID("fo")}">${esc(u.todayH)}</h2>${ICON.orn}<p>${esc(u.todayP)}</p></div>
    <ul class="hm-fgrid">
${ORDER.map(card).join("\n")}
    </ul>
    <div class="hm-share share-row" data-hm-share data-share-url="/"></div>
    <p class="hm-center"><a class="fx-btn" href="${latestPost.file}" data-hm-fulllink>${esc(u.todayB)}</a></p>
    <p class="hm-note">${esc(u.todayNote)}</p>
  </section>

  <section class="fx-sec" id="animals" aria-labelledby="${ID("an")}">
    <div class="fx-head"><h2 id="${ID("an")}">${esc(u.animalsH)}</h2>${ICON.orn}<p>${esc(u.animalsP)}</p></div>
    <ul class="hm-agrid">
${ORDER.map(animalCard).join("\n")}
    </ul>
    <p class="hm-center"><a class="fx-btn fx-btn-rose" href="/animals">${esc(u.animalsB)}</a></p>
  </section>

  <section class="fx-sec" id="tools" aria-labelledby="${ID("tl")}">
    <div class="fx-head"><h2 id="${ID("tl")}">${esc(u.toolsH)}</h2>${ICON.orn}</div>
    <ul class="hm-tgrid">
${u.tools.map(([img, t, p, b, h]) => `      <li class="hm-tool fx-gframe"><img src="${img}" width="600" height="338" alt="" loading="lazy" decoding="async"><h3>${esc(t)}</h3><p>${esc(p)}</p><a class="fx-btn fx-btn-sm" href="${h}">${esc(b)}</a></li>`).join("\n")}
    </ul>
  </section>
</div>`;
}
function partB(lang) {   // why, guides, how, cycle, elements, cross, blog, final
  const { postCard, ID, km, u, au } = main2(lang);
  const ring2 = ring("an-ring-cycle", 60, km);
  return `<div class="fx-wrap">
  <section class="fx-sec" id="why" aria-labelledby="${ID("wh")}">
    <div class="fx-head"><h2 id="${ID("wh")}">${esc(u.whyH)}</h2>${ICON.orn}<p>${esc(u.whyP)}</p></div>
    <ul class="hm-why">${u.why.map(([i, t, d]) => `<li class="fx-gframe"><span class="hm-bi">${ICON[i]}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("")}</ul>
  </section>

  <section class="fx-sec" id="guides" aria-labelledby="${ID("gd")}">
    <div class="fx-head"><h2 id="${ID("gd")}">${esc(u.guidesH)}</h2>${ICON.orn}</div>
    <ul class="hm-guides">
${u.guides.map(([img, cat, t, d, h]) => `      <li><a class="hm-gc" href="${h}"><img src="${img}" width="440" height="440" alt="" loading="lazy" decoding="async"><div><span class="hm-cat">${esc(cat)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="hm-more">${esc(u.guidesB)}</span></div></a></li>`).join("\n")}
    </ul>
  </section>

  <section class="fx-sec" id="how" aria-labelledby="${ID("hw")}">
    <div class="fx-gframe hm-how">
      <h2 id="${ID("hw")}">${esc(u.howH)}</h2>
      <ol class="hm-steps">${u.howSteps.map(([i, t], n) => `<li><span class="hm-n" aria-hidden="true">${km ? kmDigits(n + 1) : n + 1}</span><span class="hm-bi">${ICON[i]}</span><span>${esc(t)}</span></li>`).join("")}</ol>
      <p>${esc(u.howP)}</p>
      <p class="hm-how-extra">${esc(UI_STRINGS[lang].how_p1.replace(/\s+/g, " ").trim())}</p>
      <a class="fx-btn fx-btn-sm" href="/checker">${esc(u.howB)}</a>
    </div>
  </section>

  <div class="an-duo">
    <section class="fx-gframe an-cycle" aria-labelledby="${ID("cy")}">
      <h2 id="${ID("cy")}">${esc(au.cycH)}</h2>
      <div class="an-cycle-body">
        <div class="an-cycle-art">${ring2}<span class="an-cycle-label">12</span></div>
        <div><p>${esc(au.cycP1)}</p><p>${esc(au.cycP2)}</p>
          <p class="an-order">${ORDER.map((a) => esc(nm(a, km))).join(" → ")} → ${esc(nm(ORDER[0], km))}</p>
          <a class="fx-btn fx-btn-sm" href="/checker">${esc(au.cycB)}</a></div>
      </div>
    </section>
    <section class="fx-gframe an-elements" aria-labelledby="${ID("el")}">
      <h2 id="${ID("el")}">${esc(au.elH)}</h2>
      <ul class="an-el-row">${ELEMENTS.map((e) => `<li><img src="images/profile/el-${e.toLowerCase()}.webp" width="72" height="72" alt="" loading="lazy" decoding="async"><strong>${esc(au.el[e])}</strong></li>`).join("")}</ul>
      <p>${esc(au.elP)}</p>
      <a class="fx-btn fx-btn-sm" href="blog/five-elements-explained.html">${esc(au.elB)}</a>
    </section>
  </div>

  <section class="fx-sec" id="blog" aria-labelledby="${ID("bl")}">
    <div class="fx-head"><h2 id="${ID("bl")}">${esc(u.blogH)}</h2>${ICON.orn}</div>
    <ul class="hm-posts">
${posts.map(postCard).join("\n")}
    </ul>
    <p class="hm-center"><a class="fx-btn fx-btn-sm" href="/blog">${esc(u.blogAll)}</a></p>
  </section>
</div>

<section class="hm-final" aria-labelledby="${ID("fi")}">
  <div class="hm-final-in">
    <h2 id="${ID("fi")}">${esc(u.finalH)}</h2>
    <p>${esc(u.finalP)}</p>
    <a class="fx-btn" href="/checker">${esc(u.finalB)}</a>
  </div>
</section>`;
}
function footer(lang) {
  const km = lang === "km";
  const L = km
    ? { blurb: "ស្វែងយល់រាសីរបស់អ្នក និងអានការបកស្រាយតាមប្រពៃណីអំពីបុគ្គលិកលក្ខណៈ ភាពត្រូវគ្នា សំណាង និងច្រើនទៀត។", explore: "ស្វែងយល់", res: "ធនធាន", legal: "ច្បាប់", links: [["/checker", "ពិនិត្យរាសី"], ["/animals", "សត្វរាសី"], ["/compatibility", "ភាពត្រូវគ្នា"], ["/wedding-date", "ថ្ងៃរៀបការ"], ["/business-partner", "ដៃគូអាជីវកម្ម"], ["/zodiac-guide", "មគ្គុទ្ទេសក៍រាសី"]], res2: [["/blog", "ប្លុក"], ["/about", "អំពីយើង"], ["/contact", "ទំនាក់ទំនង"]], legal2: [["/privacy", "គោលការណ៍ឯកជនភាព"]], note: "សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ។ ការបកស្រាយរាសីគឺជាប្រពៃណី និងវប្បធម៌ មិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ។" }
    : { blurb: "Discover your Chinese zodiac and explore traditional insights into personality, compatibility, lucky signs and more.", explore: "Explore", res: "Resources", legal: "Legal", links: [["/checker", "Checker"], ["/animals", "Animals"], ["/compatibility", "Compatibility"], ["/wedding-date", "Wedding Date"], ["/business-partner", "Business Partner"], ["/zodiac-guide", "Zodiac Guide"]], res2: [["/blog", "Blog"], ["/about", "About"], ["/contact", "Contact"]], legal2: [["/privacy", "Privacy Policy"]], note: "For entertainment and self-reflection only. Chinese zodiac interpretations are traditional/cultural and are not scientifically proven." };
  const col = (h, ls) => `<nav aria-label="${esc(h)}"><h2>${esc(h)}</h2><ul>${ls.map(([h2, t]) => `<li><a href="${h2}">${esc(t)}</a></li>`).join("")}</ul></nav>`;
  return `<div class="hm-foot-in"><div class="hm-foot-brand"><p class="hm-foot-logo">MyBirthSign</p><p>${esc(L.blurb)}</p></div>${col(L.explore, L.links)}${col(L.res, L.res2)}${col(L.legal, L.legal2)}</div><p class="hm-foot-note">&copy; 2026 MyBirthSign — ${esc(L.note)}</p>`;
}

// ---------------------------------------------------------------- shared form sections (single copy, so element ids stay unique)
const MIN = "1920-01-01", MAX = "2026-12-31";
const FIND = `<div class="fx-wrap">
  <section class="hm-find fx-gframe" id="find" aria-labelledby="hm-find-h">
    <div class="hm-find-text">
      <h2 id="hm-find-h">${T("Find Your Chinese Zodiac Sign", "ស្វែងរករាសីរបស់អ្នក")}</h2>
      <p>${T("Enter your birth date to discover your zodiac animal, element, lucky signs and more.", "បញ្ចូលថ្ងៃកំណើតរបស់អ្នក ដើម្បីស្វែងរកសត្វរាសី ធាតុ សំណាង និងច្រើនទៀត។")}</p>
    </div>
    <form class="hm-find-form" id="hm-find-form" action="/checker" method="get" novalidate>
      <label for="hm-dob">${T("Select Birth Date", "ជ្រើសរើសថ្ងៃកំណើត")}</label>
      <div class="hm-find-row">
        <input type="date" lang="en-GB" id="hm-dob" name="dob" required min="${MIN}" max="${MAX}">
        <button type="submit" class="fx-btn">${T("Find My Sign →", "ស្វែងរករាសីរបស់ខ្ញុំ →")}</button>
      </div>
      <a class="hm-find-learn" href="blog/how-to-calculate-zodiac-sign.html">${T("Not sure how Chinese zodiac years work? Learn more →", "មិនច្បាស់ពីរបៀបដែលឆ្នាំរាសីដំណើរការ? ស្វែងយល់បន្ថែម →")}</a>
    </form>
  </section>
</div>`;
const STRIP = `<div class="fx-wrap"><p class="hm-strip"><span>${T("Today", "ថ្ងៃនេះ")}: <strong id="hm-today">${fmtDate(TY, TM, TD, false)}</strong></span><span>${T("Today's Number", "លេខថ្ងៃនេះ")}: <strong id="today-number">—</strong></span></p></div>`;
const COMPAT = `<div class="fx-wrap">
  <section class="fx-sec hm-compat" id="compatibility" aria-labelledby="hm-compat-h">
    <div class="fx-gframe">
      <div class="fx-head"><h2 id="hm-compat-h">${T("Chinese Zodiac Compatibility", "ភាពត្រូវគ្នានៃរាសី")}</h2>${ICON.orn}
        <p>${T("Compare two birthdays to discover traditional zodiac compatibility in love, friendship, business and more.", "ប្រៀបធៀបថ្ងៃកំណើតពីរ ដើម្បីស្វែងយល់ភាពត្រូវគ្នាតាមប្រពៃណីក្នុងស្នេហា មិត្តភាព អាជីវកម្ម និងច្រើនទៀត។")}</p></div>
      <form id="compat-form" class="hm-compat-form" novalidate>
        <div class="hm-compat-row">
          <div><span class="hm-pl">${T("Person A", "មនុស្ស A")}</span><label class="hm-lbl" for="dob-a" data-i18n="doba_label">Person A's date of birth</label><input type="date" lang="en-GB" id="dob-a" name="dob-a" required min="${MIN}" max="${MAX}"></div>
          <div><span class="hm-pl">${T("Person B", "មនុស្ស B")}</span><label class="hm-lbl" for="dob-b" data-i18n="dobb_label">Person B's date of birth</label><input type="date" lang="en-GB" id="dob-b" name="dob-b" required min="${MIN}" max="${MAX}"></div>
        </div>
        <fieldset class="hm-rel"><legend data-i18n="relationship_legend">Relationship type</legend>
          <label class="radio-option"><input type="radio" name="context" value="romantic" checked> <span aria-hidden="true">❤️</span> <span data-i18n="romantic_option">Romantic Partner</span></label>
          <label class="radio-option"><input type="radio" name="context" value="business"> <span aria-hidden="true">💼</span> <span data-i18n="business_option">Business Partner</span></label>
        </fieldset>
        <button type="submit" class="fx-btn" data-i18n="compat_submit">Check Compatibility</button>
      </form>
      <p class="hm-note">${T("Traditional compatibility is for entertainment and cultural interest, not a prediction of how a relationship will go.", "ភាពត្រូវគ្នាតាមប្រពៃណីសម្រាប់ការកំសាន្ត និងវប្បធម៌ប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍ពីទំនាក់ទំនងទេ។")}</p>
      <div id="compat-result" class="hm-result" aria-live="polite"></div>
    </div>
  </section>
</div>`;

// ---------------------------------------------------------------- client script (small; no libraries)
const clientJs = `(function(){
var ORDER=${JSON.stringify(ORDER)},TRI=${JSON.stringify(TRIANGLES)},TR=${JSON.stringify(TIER)};
function pp(){var p=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Phnom_Penh",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()).split("-").map(Number);return p;}
function jdn(y,m,d){return Math.floor(Date.UTC(y,m-1,d)/86400000)+2440588;}
function tier(a,d){if(a===d)return"great";if(TRI.some(function(t){return t.indexOf(a)>-1&&t.indexOf(d)>-1;}))return"good";if(Math.abs(ORDER.indexOf(a)-ORDER.indexOf(d))===6)return"caution";return"ordinary";}
var p=pp(),day=ORDER[(jdn(p[0],p[1],p[2])+1)%12];
document.querySelectorAll("[data-hm-card]").forEach(function(li){
  var l=li.closest("[data-lang-content]"),lang=l?l.getAttribute("data-lang-content"):"en",t=tier(li.getAttribute("data-animal"),day),r=TR[lang][t];
  li.className="hm-fc fx-tier-"+t;li.querySelector("[data-hm-ico]").textContent=r[0];li.querySelector("[data-hm-lab]").textContent=r[1];li.querySelector("[data-hm-line]").textContent=r[2];});
var KMM=${JSON.stringify(KM_MONTHS)},ENM=${JSON.stringify(EN_MONTHS)},KD="០១២៣៤៥៦៧៨៩";
function kd(n){return String(n).replace(/\\d/g,function(c){return KD[c];});}
function setDate(){var el=document.getElementById("hm-today");if(!el)return;var km=document.documentElement.lang==="km";
  el.textContent=km?"ថ្ងៃទី"+kd(p[2])+" ខែ"+KMM[p[1]-1]+" ឆ្នាំ"+kd(p[0]):ENM[p[1]-1]+" "+p[2]+", "+p[0];}
setDate();document.addEventListener("DOMContentLoaded",setDate);window.addEventListener("load",setDate);document.querySelectorAll("[data-lang-switch]").forEach(function(a){a.addEventListener("click",function(){setTimeout(setDate,0);});});
// daily data (rules + Claude wording): when today's record exists, each card shows that sign's
// advice for today and its lucky number & color. If it is missing or old, the cards stay as above.
if(window.fetch){fetch("/data/daily/latest.json",{cache:"no-cache"}).then(function(r){return r.ok?r.json():null;}).then(function(rec){
  var dsx=p[0]+"-"+String(p[1]).padStart(2,"0")+"-"+String(p[2]).padStart(2,"0");
  if(!rec||rec.version!==1||rec.date!==dsx||!rec.signs||rec.signs.length!==12)return;
  var by={};rec.signs.forEach(function(s){by[s.animal]=s;});
  document.querySelectorAll("[data-hm-card]").forEach(function(li){
    var l=li.closest("[data-lang-content]"),lang=l?l.getAttribute("data-lang-content"):"en",s=by[li.getAttribute("data-animal")];
    if(!s||!s.text||!s.text[lang]||s.tier!==tier(li.getAttribute("data-animal"),day))return;
    li.querySelector("[data-hm-line]").textContent=s.text[lang].advice;
    var km=lang==="km",x=li.querySelector(".hm-lucky")||document.createElement("p");x.className="hm-lucky";x.textContent="";
    var n=document.createElement("span");n.textContent=(km?"លេខសំណាង ":"Lucky no. ")+(km?kd(s.lucky.number):s.lucky.number);
    var c=document.createElement("span"),dot=document.createElement("i");dot.className="hm-dot";dot.style.background=s.lucky.color.hex||"#ccc";c.appendChild(dot);c.appendChild(document.createTextNode(s.lucky.color[lang]));
    x.appendChild(n);x.appendChild(c);li.appendChild(x);});
}).catch(function(){});}
// "Who is lucky today" share: the same rules as the cards above (sign of the day + its triangle friends;
// its opposite sign takes it easy). The image card is drawn only when someone shares.
var KMN=${JSON.stringify(KM_NAMES)},LK={en:{h:"Who is lucky today",t:"Today is the day of the {D}. By tradition, the {D}, {P} and {Q} are the best supported signs today."},
  km:{h:"តើអ្នកណាមានសំណាងថ្ងៃនេះ",t:"ថ្ងៃនេះជាថ្ងៃ{D}។ តាមប្រពៃណី {D} {P} និង {Q} ជាសត្វដែលទទួលបានការគាំទ្រល្អបំផុតនៅថ្ងៃនេះ។"}};
var top=[day].concat(TRI.filter(function(t){return t.indexOf(day)>-1;})[0].filter(function(x){return x!==day;})),clash=ORDER[(ORDER.indexOf(day)+6)%12];
document.querySelectorAll("[data-hm-share]").forEach(function(el){
  var l=el.closest("[data-lang-content]"),lang=l?l.getAttribute("data-lang-content"):"en",km=lang==="km",n=function(a){return km?KMN[a]:a;};
  var dt=km?"ថ្ងៃទី"+kd(p[2])+" ខែ"+KMM[p[1]-1]+" ឆ្នាំ"+kd(p[0]):ENM[p[1]-1]+" "+p[2]+", "+p[0];
  el.setAttribute("data-share-title",LK[lang].h+" — "+dt);
  el.setAttribute("data-share-card",JSON.stringify({cardType:"lucky",lang:lang,date:dt,top:top,topNames:top.map(n),careful:[n(clash)],
    text:LK[lang].t.split("{D}").join(n(top[0])).replace("{P}",n(top[1])).replace("{Q}",n(top[2]))}));});
// point "full fortune" (and the lucky-today share link) at today's post when it exists, otherwise keep the latest published one
var ds=p[0]+"-"+String(p[1]).padStart(2,"0")+"-"+String(p[2]).padStart(2,"0"),u="blog/daily-fortune-"+ds+".html";
if(window.fetch){fetch(u,{method:"HEAD"}).then(function(r){if(r.ok){document.querySelectorAll("[data-hm-fulllink]").forEach(function(a){a.setAttribute("href",u);});document.querySelectorAll("[data-hm-share]").forEach(function(el){el.setAttribute("data-share-url","/"+u);});}}).catch(function(){});}
// "Find my sign": the date field is replaced by the site's date picker, so check the value ourselves
var f=document.getElementById("hm-find-form");
if(f)f.addEventListener("submit",function(e){var i=document.getElementById("hm-dob");if(!i||!i.value){e.preventDefault();var v=f.querySelector(".dp-input,input[type=text]");if(v)v.focus();}});
})();`;

// ---------------------------------------------------------------- page
const TITLE = "Chinese Zodiac, Compatibility & Daily Fortune | MyBirthSign";
const DESC = "Discover your Chinese zodiac sign, personality, compatibility, lucky signs, wedding dates and more. Explore traditional Chinese zodiac insights with MyBirthSign.";
const URL_ = "https://mybirthsign.com/";
const OG = "https://mybirthsign.com/images/og/site.jpg";
const jsonld = JSON.stringify([
  { "@context": "https://schema.org", "@type": "WebSite", name: "MyBirthSign", url: URL_, description: DESC, inLanguage: ["en", "km"] },
  { "@context": "https://schema.org", "@type": "Organization", name: "MyBirthSign", url: URL_, logo: "https://mybirthsign.com/apple-touch-icon.png" },
]);

const old = read("index.html");
const header = old.slice(old.indexOf('<header class="site-header">'), old.indexOf("</header>") + "</header>".length);   // keep the existing navigation exactly

const pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="shortcut icon" href="favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<title>${esc(TITLE)}</title>
<link rel="canonical" href="${URL_}">
<meta name="description" content="${esc(DESC)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MyBirthSign">
<meta property="og:url" content="${URL_}">
<meta property="og:title" content="${esc(TITLE)}">
<meta property="og:description" content="${esc(DESC)}">
<meta property="og:image" content="${OG}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(TITLE)}">
<meta name="twitter:description" content="${esc(DESC)}">
<meta name="twitter:image" content="${OG}">
<meta name="theme-color" content="#0b0820">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Kantumruy+Pro:wght@400;600;700&family=Moul&display=swap" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Kantumruy+Pro:wght@400;600;700&family=Moul&display=swap"></noscript>
<link rel="preload" as="image" href="images/fortune/hero-night.webp" media="(min-width: 601px)">
<link rel="preload" as="image" href="images/fortune/hero-night-m.webp" media="(max-width: 600px)" fetchpriority="high">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/fortune.css">
<link rel="stylesheet" href="css/profile.css">
<link rel="stylesheet" href="css/animals.css">
<link rel="stylesheet" href="css/home.css">
<script type="application/ld+json">${jsonld.replace(/</g, "\\u003c")}</script>

<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9939402104083173" crossorigin="anonymous"></script>
<script src="/js/daily-favicon.js" defer></script>
</head>
<body class="fx-page pf-page an-page hm-page">

${header}

<main>
<div data-lang-content="en">
${body("en")}
</div>
<div data-lang-content="km">
${body("km")}
</div>

${FIND}

${STRIP}

<div data-lang-content="en">
${partA("en")}
</div>
<div data-lang-content="km">
${partA("km")}
</div>

${COMPAT}

<div data-lang-content="en">
${partB("en")}
</div>
<div data-lang-content="km">
${partB("km")}
</div>
</main>

<footer class="site-footer hm-footer">
<div data-lang-content="en">${footer("en")}</div>
<div data-lang-content="km">${footer("km")}</div>
</footer>

<script src="js/i18n.js"></script>
<script src="js/zodiac-data.js"></script>
<script src="js/datepicker.js"></script>
<script src="js/share.js"></script>
<script src="js/app.js"></script>
<script>${clientJs}</script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, "index.html"), pageHtml);
console.log("Wrote index.html", `(day animal ${TODAY_ANIMAL}, latest post ${latestPost.file})`);
