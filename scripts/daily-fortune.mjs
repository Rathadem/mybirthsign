#!/usr/bin/env node
/**
 * Generates the daily "Today's Fortune for Each Zodiac Animal" post (English + Khmer).
 *
 *   node scripts/daily-fortune.mjs                 # today's date (Asia/Phnom_Penh)
 *   node scripts/daily-fortune.mjs --date 2026-10-07
 *   node scripts/daily-fortune.mjs --date 2026-10-07 --force   # overwrite an existing post
 *
 * What it does
 *   1. Works out the day's traditional animal (12-day branch cycle, via Julian Day Number).
 *   2. Rates each of the 12 animals against it: same animal = Great day, same triangle = Good day,
 *      direct clash (opposite sign) = Take it easy, everything else = Ordinary day.
 *   3. Writes blog/daily-fortune-YYYY-MM-DD.html from scripts/daily-fortune-template.html.
 *   4. Adds the post to sitemap.xml and points the blog.html "Today's Fortune" feature at it.
 *
 * It only reads data already in the repo (js/zodiac-data.js, js/i18n.js) and has no dependencies.
 * Running it twice for the same date is a no-op unless --force is given.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const write = (p, s) => fs.writeFileSync(path.join(ROOT, p), s);

// ---------------------------------------------------------------- arguments
const args = process.argv.slice(2);
const argVal = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const FORCE = args.includes("--force");
const TZ = process.env.FORTUNE_TZ || "Asia/Phnom_Penh";

function todayISO() {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
const iso = argVal("--date") || todayISO();
if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) { console.error("Bad --date, expected YYYY-MM-DD:", iso); process.exit(1); }
const [Y, M, D] = iso.split("-").map(Number);

// ---------------------------------------------------------------- site data
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
const zdata = read("js/zodiac-data.js"), i18n = read("js/i18n.js");
const ANIMALS = extractConst(zdata, "ZODIAC_ANIMALS");
const EMOJI = extractConst(zdata, "ZODIAC_EMOJI");
const INFO = extractConst(zdata, "ANIMAL_INFO");
const TRIANGLES = extractConst(zdata, "ZODIAC_TRIANGLES");
const KM_NAMES = extractConst(i18n, "KM_ANIMAL_NAMES");
const KM_INFO = extractConst(i18n, "KM_ANIMAL_INFO");
const KM_DAYS = extractConst(i18n, "KM_DAY_NAMES");

// Branch order of the traditional cycle (Rat first).
const ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
for (const a of ORDER) if (!INFO[a]) throw new Error("Missing animal info for " + a);

// ---------------------------------------------------------------- day animal
const dayNumber = Math.floor(Date.UTC(Y, M - 1, D) / 86400000);   // days since 1970-01-01
const jdn = dayNumber + 2440588;                                   // Julian Day Number (noon)
const dayAnimal = ORDER[(jdn + 1) % 12];                           // 2000-01-01 (JDN 2451545) is a Horse day
const sameTriangle = (a, b) => TRIANGLES.some((t) => t.includes(a) && t.includes(b));
const isClash = (a, b) => Math.abs(ORDER.indexOf(a) - ORDER.indexOf(b)) === 6;
function tierOf(a) {
  if (a === dayAnimal) return "great";
  if (sameTriangle(a, dayAnimal)) return "good";
  if (isClash(a, dayAnimal)) return "caution";
  return "ordinary";
}
const RANK = { great: 0, good: 1, ordinary: 2, caution: 3 };

// ---------------------------------------------------------------- copy banks
const TIER_LABEL = {
  en: { great: "Great day", good: "Good day", ordinary: "Ordinary day", caution: "Take it easy" },
  km: { great: "ថ្ងៃល្អខ្លាំង", good: "ថ្ងៃល្អ", ordinary: "ថ្ងៃធម្មតា", caution: "ថ្ងៃគួរប្រុងប្រយ័ត្ន" },
};
const GOOD_FOR = {
  en: {
    great: ["Big decisions, bold moves, saying what's on your mind.", "Starting something new, asking for what you want, meeting important people.", "Signing, launching or announcing — momentum is on your side.", "Reaching out to people you've been meaning to contact."],
    good: ["Steady follow-through on something already in motion.", "Teamwork, shared plans and finishing what's half done.", "Practical progress — small wins add up today.", "Conversations that need patience and a clear head."],
    ordinary: ["Routine tasks — nothing special pulling for or against you today.", "Catching up on chores, admin and everyday errands.", "Keeping your usual rhythm; no need to force anything.", "Planning ahead rather than making big moves."],
    caution: ["Low-key tasks only. Worth skipping anything high-stakes if you can.", "Quiet work, rest and tidying up loose ends.", "Listening more than talking, and double-checking details.", "Postponing big purchases or signatures to another day."],
  },
  km: {
    great: ["ការសម្រេចចិត្តធំៗ ការផ្លាស់ប្តូរយ៉ាងក្លាហាន និងការនិយាយអ្វីដែលគិតក្នុងចិត្ត។", "ការចាប់ផ្តើមអ្វីថ្មី ការស្នើសុំអ្វីដែលអ្នកចង់បាន និងការជួបមនុស្សសំខាន់ៗ។", "ការចុះហត្ថលេខា ការចាប់ផ្តើមគម្រោង ឬការប្រកាស — សន្ទុះនៅខាងអ្នក។", "ការទាក់ទងមនុស្សដែលអ្នកធ្លាប់ចង់ទាក់ទង។"],
    good: ["ការបន្តធ្វើកិច្ចការដែលកំពុងដំណើរការស្រាប់ដោយស្ថិរភាព។", "ការធ្វើការជាក្រុម ផែនការរួម និងការបញ្ចប់អ្វីដែលធ្វើមិនទាន់ចប់។", "ការរីកចម្រើនជាក់ស្តែង — ជ័យជម្នះតូចៗកើនឡើងនៅថ្ងៃនេះ។", "ការសន្ទនាដែលត្រូវការការអត់ធ្មត់ និងចិត្តស្ងប់។"],
    ordinary: ["កិច្ចការប្រចាំថ្ងៃ — គ្មានអ្វីពិសេសគាំទ្រ ឬប្រឆាំងនឹងអ្នកថ្ងៃនេះទេ។", "ការបញ្ចប់កិច្ចការផ្ទះ ឯកសារ និងកិច្ចការប្រចាំថ្ងៃ។", "ការរក្សាចង្វាក់ធម្មតារបស់អ្នក មិនចាំបាច់បង្ខំអ្វីទេ។", "ការរៀបចំផែនការទុកជាមុន ជាជាងធ្វើការសម្រេចចិត្តធំៗ។"],
    caution: ["កិច្ចការស្រាលៗប៉ុណ្ណោះ។ ប្រសិនបើអាច គួរជៀសវាងការសម្រេចចិត្តសំខាន់ៗ។", "ការងារស្ងប់ស្ងាត់ ការសម្រាក និងការបញ្ចប់កិច្ចការតូចតាច។", "ការស្តាប់ច្រើនជាងនិយាយ និងពិនិត្យលម្អិតម្តងទៀត។", "ការពន្យារការទិញធំៗ ឬការចុះហត្ថលេខាទៅថ្ងៃផ្សេង។"],
  },
};
const AVOID_NOTE = {
  en: {
    great: ["Even on a great day, that's worth keeping an eye on so you don't overreach.", "A lucky day can make it easy to overdo — keep it in check."],
    good: ["Easy to let that slide on a day this smooth — don't drop your guard completely.", "A smooth day makes it tempting to coast; stay a little alert."],
    ordinary: ["Nothing's pushing it to extremes today, but it's worth noticing.", "A quiet day is a good moment to notice and soften it."],
    caution: ["Today's a day that tendency can bite — build in a pause before any big call.", "Today that tendency is easier to trigger — slow down and sleep on big choices."],
  },
  km: {
    great: ["ទោះជាថ្ងៃល្អក៏ដោយ ទំនោរនេះនៅតែសមនឹងប្រុងប្រយ័ត្ន កុំឱ្យលើសកំរិត។", "ថ្ងៃសំណាងអាចធ្វើឱ្យងាយធ្វើហួសហេតុ — សូមរក្សាវាឱ្យស្ថិតក្នុងកម្រិត។"],
    good: ["ងាយនឹងធ្វេសប្រហែសទំនោរនេះនៅថ្ងៃដ៏រលូនបែបនេះ — កុំបន្ធូរអារម្មណ៍ពេក។", "ថ្ងៃរលូនធ្វើឱ្យចង់ទុកឱ្យវាដើរទៅ — សូមនៅប្រុងប្រយ័ត្នបន្តិច។"],
    ordinary: ["មិនមានអ្វីជំរុញវាខ្លាំងនៅថ្ងៃនេះទេ ប៉ុន្តែគួរកត់សម្គាល់។", "ថ្ងៃស្ងប់ស្ងាត់ជាពេលល្អក្នុងការកត់សម្គាល់ និងបន្ធូរបន្ថយវា។"],
    caution: ["ថ្ងៃនេះទំនោរនេះអាចប៉ះពាល់អ្នកបាន — សូមគិតឱ្យបានល្អិតល្អន់មុននឹងសម្រេចចិត្តធំៗ។", "ថ្ងៃនេះទំនោរនេះងាយកើតឡើង — សូមយឺតបន្តិច ហើយគេងគិតមុនការសម្រេចចិត្តធំៗ។"],
  },
};
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const EN_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const KM_MONTHS = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const kmNum = (n) => String(n).replace(/\d/g, (d) => "០១២៣៤៥៦៧៨៩"[d]);
const weekday = EN_DAYS[new Date(Date.UTC(Y, M - 1, D)).getUTCDay()];

const dateEN = `${EN_MONTHS[M - 1]} ${D}, ${Y}`;
const dateKM = `ថ្ងៃទី${kmNum(D)} ខែ${KM_MONTHS[M - 1]} ឆ្នាំ${kmNum(Y)}`;
const dateFullEN = `${weekday}, ${dateEN}`;
const dateFullKM = `${KM_DAYS[weekday]} ទី${kmNum(D)} ខែ${KM_MONTHS[M - 1]} ឆ្នាំ${kmNum(Y)}`;

// ---------------------------------------------------------------- cards
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pick = (arr, animalIdx) => arr[(dayNumber + animalIdx) % arr.length];
const sorted = ORDER.map((a, i) => ({ a, i, tier: tierOf(a) })).sort((x, y) => RANK[x.tier] - RANK[y.tier] || x.i - y.i);

function cards(lang) {
  const isKm = lang === "km";
  const labelGood = isKm ? "ល្អសម្រាប់៖" : "Good for:", labelAvoid = isKm ? "ជៀសវាង៖" : "Avoid:";
  const body = sorted.map(({ a, i, tier }) => {
    const name = isKm ? KM_NAMES[a] : a;
    const weak = (isKm ? KM_INFO[a].weaknesses : INFO[a].weaknesses).trim();
    const more = isKm ? `ស្វែងយល់បន្ថែមអំពី${name} →` : `Learn more about ${a} →`;
    return `    <div class="fortune-card">
      <div class="fortune-card-head">
        <span class="fortune-emoji">${EMOJI[a]}</span>
        <h3>${esc(name)}</h3>
        <span class="fortune-tier fortune-tier-${tier}">${TIER_LABEL[lang][tier]}</span>
      </div>
      <p><strong>${labelGood}</strong> ${esc(pick(GOOD_FOR[lang][tier], i))}</p>
      <p><strong>${labelAvoid}</strong> ${esc(weak)} ${esc(pick(AVOID_NOTE[lang][tier], i + 1))}</p>
      <a class="fortune-learn-more" href="../blog/zodiac-year-${a.toLowerCase()}.html">${more}</a>
    </div>`;
  }).join("\n");
  return `<div class="fortune-grid">\n${body}\n  </div>`;
}

const names = (list, lang) => list.map((a) => (lang === "km" ? KM_NAMES[a] : a)).join(lang === "km" ? " " : ", ");
const bestList = sorted.filter((c) => c.tier === "great" || c.tier === "good").map((c) => c.a);
const cautionList = sorted.filter((c) => c.tier === "caution").map((c) => c.a);

const introEN = `<p>
    Every day carries the energy of one of the 12 zodiac animals in the traditional day cycle.
    Today is a ${dayAnimal} day: it lines up best with ${names(bestList, "en")}, and it asks for a
    little extra care from ${names(cautionList, "en")}. Here's how today sits with all twelve signs —
    what it's good for, and the one thing worth watching out for, based on that animal's usual soft spot.
  </p>`;
const introKM = `<p>
    រាល់ថ្ងៃមានថាមពលរបស់សត្វនិមិត្តសញ្ញាទាំង១២មួយ តាមវដ្តថ្ងៃប្រពៃណី។ ថ្ងៃនេះជាថ្ងៃ${KM_NAMES[dayAnimal]}៖
    សមស្របបំផុតជាមួយ ${names(bestList, "km")} ហើយត្រូវការការប្រុងប្រយ័ត្នបន្ថែមសម្រាប់ ${names(cautionList, "km")}។
    នេះជារបៀបដែលថ្ងៃនេះទាក់ទងនឹងសញ្ញាទាំង១២ — អ្វីដែលល្អសម្រាប់ និងចំណុចមួយដែលគួរប្រុងប្រយ័ត្ន
    ដោយផ្អែកលើចំណុចខ្សោយធម្មតារបស់សត្វនោះ។
  </p>`;

// ---------------------------------------------------------------- write post
const slug = `daily-fortune-${iso}`;
const postPath = `blog/${slug}.html`;
const exists = fs.existsSync(path.join(ROOT, postPath));
if (exists && !FORCE) {
  console.log(`${postPath} already exists — nothing to do (use --force to regenerate).`);
} else {
  const url = `https://mybirthsign.com/blog/${slug}.html`;
  const html = read("scripts/daily-fortune-template.html")
    .replaceAll("{{TITLE}}", `Today's Fortune for Each Zodiac Animal — ${dateEN}`)
    .replaceAll("{{URL}}", url)
    .replaceAll("{{DESC}}", `What ${weekday}, ${dateEN} is good for, and what to watch out for, for all 12 Chinese zodiac animals. Today is a ${dayAnimal} day.`)
    .replaceAll("{{H1_EN}}", `Today's Fortune for Each Zodiac Animal — ${dateEN}`)
    .replaceAll("{{H1_KM}}", `សំណាងប្រចាំថ្ងៃសម្រាប់សត្វនិមិត្តសញ្ញានីមួយៗ — ${dateKM}`)
    .replaceAll("{{INTRO_EN}}", introEN)
    .replaceAll("{{INTRO_KM}}", introKM)
    .replaceAll("{{CARDS_EN}}", cards("en"))
    .replaceAll("{{CARDS_KM}}", cards("km"));
  if (/\{\{\w+\}\}/.test(html)) throw new Error("Unfilled placeholder in template output");
  write(postPath, html);
  console.log(`Wrote ${postPath} — ${dayAnimal} day (great: ${sorted.filter((c) => c.tier === "great").map((c) => c.a)}, caution: ${cautionList}).`);
}

// ---------------------------------------------------------------- sitemap
let sm = read("sitemap.xml");
const loc = `https://mybirthsign.com/blog/${slug}.html`;
if (!sm.includes(`<loc>${loc}</loc>`)) {
  const lines = sm.split("\n");
  let last = -1;
  lines.forEach((l, i) => { if (l.includes("/blog/daily-fortune-")) last = i; });
  if (last < 0) last = lines.findIndex((l) => l.includes("</urlset>")) - 1;
  lines.splice(last + 1, 0, `  <url><loc>${loc}</loc></url>`);
  write("sitemap.xml", lines.join("\n"));
  console.log("sitemap.xml updated");
}

// ---------------------------------------------------------------- blog.html feature
let blog = read("blog.html");
const before = blog;
blog = blog.replace(/href="blog\/daily-fortune-\d{4}-\d{2}-\d{2}\.html"/g, `href="blog/${slug}.html"`);
// the featured card's picture = today's day animal
const dayLower = dayAnimal.toLowerCase();
blog = blog.replace(/(<a class="bv2-featured" href="blog\/daily-fortune-[^"]+">\s*<div class="bv2-featured-art">\s*<img src=")images\/zodiac\/\w+\.webp(" alt=")Illustration of the \w+(, today's luckiest Chinese zodiac sign")/g,
  `$1images/zodiac/${dayLower}.webp$2Illustration of the ${dayAnimal}$3`);
// featured date lines: the English one is "<weekday>, <Month> <d>, <yyyy>", the Khmer one starts with a Khmer weekday
let dateIdx = 0;
blog = blog.replace(/(<div class="bv2-featured-meta">\s*<span>)([^<]*)(<\/span>)/g, (m, a, _old, c) => a + (dateIdx++ === 0 ? dateFullEN : dateFullKM) + c);
if (blog !== before) { write("blog.html", blog); console.log("blog.html feature updated"); }
