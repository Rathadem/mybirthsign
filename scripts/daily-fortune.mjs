#!/usr/bin/env node
/**
 * Generates the daily "Today's Fortune for Each Zodiac Animal" post (English + Khmer + Simplified Chinese).
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
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const write = (p, s) => fs.writeFileSync(path.join(ROOT, p), s);

// ---------------------------------------------------------------- arguments
const args = process.argv.slice(2);
const argVal = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const FORCE = args.includes("--force");
const NO_FEATURE = args.includes("--no-feature");   // day-ahead post: leave blog.html and the homepage on today
const TZ = process.env.FORTUNE_TZ || "Asia/Phnom_Penh";

function todayISO() {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
const iso = argVal("--date") || todayISO();
if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) { console.error("Bad --date, expected YYYY-MM-DD:", iso); process.exit(1); }
const [Y, M, D] = iso.split("-").map(Number);

// ---------------------------------------------------------------- daily data (optional)
// If scripts/daily-data.mjs already published a VALID record for this date, the page uses its
// wording (fortune, love, career, money, lucky items, advice). Otherwise the page is built exactly
// as before from the copy banks below. Ratings always come from the same rule either way.
let DATA = null;
try {
  const f = path.join(ROOT, "data/daily", iso + ".json");
  if (fs.existsSync(f)) {
    const { validateRecord } = await import("./daily-data-lib.mjs");
    const rec = JSON.parse(fs.readFileSync(f, "utf8")), errs = validateRecord(rec);
    if (!errs.length && rec.source !== "mock") DATA = rec;
    else if (!errs.length && process.env.DAILY_DATA_ALLOW_MOCK === "1") DATA = rec;   // local previews only
    else console.warn("daily data for " + iso + " not used: " + (errs[0] || "mock record"));
  }
} catch (e) { console.warn("daily data not used:", e.message); }
const dataOf = (a) => DATA && DATA.signs.find((x) => x.animal === a);
// rule-only facts (lucky number / color / direction / time, harmony animal) — same rules as the daily data, no AI
const { computeFacts } = await import("./daily-data-lib.mjs");
const FACTS = computeFacts(iso);
const factOf = (a) => FACTS.signs.find((x) => x.animal === a);
// lucky numbers of 1–5 digits for this post's date (same js/lucky-digits.js the homepage and Checker use)
const { createRequire } = await import("node:module");
const LUCKY_DIGITS = createRequire(import.meta.url)("../js/lucky-digits.js");
const KD_ = "0123456789", kmD = (x) => String(x).replace(/\d/g, (d) => KD_[d]);
function digitsHtml(a, lang) {
  const v = LUCKY_DIGITS.forSign(a, iso); if (!v) return "";
  const km = lang === "km", zh = lang === "zh";
  const lab = (n) => km ? kmD(n) + " ខ្ទង់" : zh ? n + " 位数" : n + (n === 1 ? " digit" : " digits");
  return `<div class="ld ld-mini fx-digits"><p class="ld-h">${km ? "លេខសំណាង" : zh ? "幸运数字" : "Lucky numbers"}</p><ul class="ld-list">${[1, 2, 3, 4, 5].map((n) => `<li><span class="ld-l">${lab(n)}</span><b class="ld-n">${km ? kmD(v["d" + n]) : v["d" + n]}</b></li>`).join("")}</ul></div>`;
}

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
const ZH_NAMES = extractConst(i18n, "ZH_ANIMAL_NAMES");
const ZH_INFO = extractConst(i18n, "ZH_ANIMAL_INFO");
const ZH_DAYS = extractConst(i18n, "ZH_DAY_NAMES");
const ZH_COLORS = extractConst(i18n, "ZH_COLOR_NAMES");
const ZH_DIR = { North: "北", Northeast: "东北", East: "东", Southeast: "东南", South: "南", Southwest: "西南", West: "西", Northwest: "西北" };
// per-language helpers (zh has no AI daily text, so zh always uses the copy banks below)
const nameIn = (a, lang) => lang === "km" ? KM_NAMES[a] : lang === "zh" ? ZH_NAMES[a] : a;
const infoIn = (a, lang) => lang === "km" ? KM_INFO[a] : lang === "zh" ? ZH_INFO[a] : INFO[a];
const colorIn = (c, lang) => lang === "zh" ? (ZH_COLORS[String(c.en).toLowerCase()] || c.en) : c[lang];
const dirIn = (d, lang) => lang === "zh" ? (ZH_DIR[d.en] || d.en) : d[lang];

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

// ---------------------------------------------------------------- day pillar and "why this rating" (traditional rules only)
// Day stem and branch follow the continuous 60-day cycle: JDN 2433191 (1 October 1949) is a 甲子 day, so stem = (JDN + 9) % 10
// and branch = (JDN + 1) % 12 (the same branch rule as dayAnimal above). The rating itself still comes only from tierOf();
// the element note is extra context and never changes a rating.
const STEM_CH = "甲乙丙丁戊己庚辛壬癸", BRANCH_CH = "子丑寅卯辰巳午未申酉戌亥";
const STEM_PY = ["jiǎ", "yǐ", "bǐng", "dīng", "wù", "jǐ", "gēng", "xīn", "rén", "guǐ"], BRANCH_PY = ["zǐ", "chǒu", "yín", "mǎo", "chén", "sì", "wǔ", "wèi", "shēn", "yǒu", "xū", "hài"];
const STEM_EL = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"];
const FIXED_EL = { Rat: "Water", Ox: "Earth", Tiger: "Wood", Rabbit: "Wood", Dragon: "Earth", Snake: "Fire", Horse: "Fire", Goat: "Earth", Monkey: "Metal", Rooster: "Metal", Dog: "Earth", Pig: "Water" };
const GEN = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" }, CTRL = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };
const FRAME_EL = (a) => ({ Rat: "Water", Dragon: "Water", Monkey: "Water", Ox: "Metal", Snake: "Metal", Rooster: "Metal", Tiger: "Fire", Horse: "Fire", Dog: "Fire", Rabbit: "Wood", Goat: "Wood", Pig: "Wood" })[a];
const dayStem = (jdn + 9) % 10, dayEl = STEM_EL[dayStem], pillarCh = STEM_CH[dayStem] + BRANCH_CH[(jdn + 1) % 12];
const pillarPy = STEM_PY[dayStem] + " " + BRANCH_PY[(jdn + 1) % 12];
const EL_N = { en: { Wood: "Wood", Fire: "Fire", Earth: "Earth", Metal: "Metal", Water: "Water" }, km: { Wood: "ឈើ", Fire: "ភ្លើង", Earth: "ដី", Metal: "លោហៈ", Water: "ទឹក" }, zh: { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" } };
function whyLine(a, lang) {
  const n = nameIn(a, lang), dn = nameIn(dayAnimal, lang), E = EL_N[lang], se = FIXED_EL[a], rel = a === dayAnimal ? "same" : sameTriangle(a, dayAnimal) ? "tri" : isClash(a, dayAnimal) ? "clash" : "none";
  const elRel = dayEl === se ? "same" : GEN[dayEl] === se ? "feeds" : GEN[se] === dayEl ? "draws" : CTRL[dayEl] === se ? "checks" : "checked";
  const T = {
    en: { same: `Today is the ${n}'s own day.`, tri: `The ${n} and today's ${dn} share the ${FRAME_EL(a)} triangle.`, clash: `The ${n} sits opposite today's ${dn} on the wheel (a clash).`, none: `No triangle or clash links the ${n} to today's ${dn}.`,
      el: { same: `Today's stem is ${E[dayEl]}, the ${n}'s own element.`, feeds: `Today's ${E[dayEl]} stem feeds ${E[se]}, the ${n}'s own element.`, draws: `The ${n}'s ${E[se]} feeds today's ${E[dayEl]} stem, so the day asks more of it.`, checks: `Today's ${E[dayEl]} stem keeps the ${n}'s ${E[se]} in check.`, checked: `The ${n}'s ${E[se]} keeps today's ${E[dayEl]} stem in check.` }, lab: "Why:" },
    km: { same: `ថ្ងៃនេះជាថ្ងៃរបស់${n}ផ្ទាល់។`, tri: `${n} និង${dn}ថ្ងៃនេះ ស្ថិតក្នុងក្រុមបីធាតុ${E[FRAME_EL(a)]}តែមួយ។`, clash: `${n}នៅទល់មុខ${dn}ថ្ងៃនេះលើរង្វង់ (ការប៉ះទង្គិច)។`, none: `គ្មានក្រុមបី ឬការប៉ះទង្គិចភ្ជាប់${n}ជាមួយ${dn}ថ្ងៃនេះទេ។`,
      el: { same: `ដើមថ្ងៃនេះជាធាតុ${E[dayEl]} ដែលជាធាតុរបស់${n}ផ្ទាល់។`, feeds: `ធាតុ${E[dayEl]}នៃថ្ងៃនេះ ចិញ្ចឹមធាតុ${E[se]}របស់${n}។`, draws: `ធាតុ${E[se]}របស់${n} ចិញ្ចឹមធាតុ${E[dayEl]}នៃថ្ងៃនេះ ដូច្នេះថ្ងៃនេះទាមទារច្រើនពីវា។`, checks: `ធាតុ${E[dayEl]}នៃថ្ងៃនេះ គ្រប់គ្រងធាតុ${E[se]}របស់${n}។`, checked: `ធាតុ${E[se]}របស់${n} គ្រប់គ្រងធាតុ${E[dayEl]}នៃថ្ងៃនេះ។` }, lab: "ហេតុអ្វី៖" },
    zh: { same: `今天是${n}自己的日子。`, tri: `${n}与今天的${dn}同属${E[FRAME_EL(a)]}局三合。`, clash: `${n}与今天的${dn}在生肖轮上正好相对（六冲）。`, none: `${n}与今天的${dn}之间没有三合或六冲。`,
      el: { same: `今天的天干五行是${E[dayEl]}，正是${n}的本命五行。`, feeds: `今天天干的${E[dayEl]}生${n}的本命五行${E[se]}。`, draws: `${n}的${E[se]}生今天天干的${E[dayEl]}，所以今天消耗多一些。`, checks: `今天天干的${E[dayEl]}克${n}的${E[se]}。`, checked: `${n}的${E[se]}克今天天干的${E[dayEl]}。` }, lab: "原因：" },
  }[lang];
  return `<p class="fx-sign-why"><strong>${T.lab}</strong> ${esc(T[rel])} ${esc(T.el[elRel])}</p>`;
}

// ---------------------------------------------------------------- copy banks
const TIER_LABEL = {
  en: { great: "Great Day", good: "Good Day", ordinary: "Ordinary Day", caution: "Take It Easy" },
  km: { great: "ថ្ងៃល្អខ្លាំង", good: "ថ្ងៃល្អ", ordinary: "ថ្ងៃធម្មតា", caution: "ថ្ងៃគួរប្រុងប្រយ័ត្ន" },
  zh: { great: "大吉", good: "吉", ordinary: "平", caution: "宜小心" },
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
  zh: {
    great: ["适合做大决定、大胆行动、说出心里话。", "适合开始新事物、争取想要的东西、拜访重要的人。", "适合签约、启动或宣布——势头在你这边。", "适合联系一直想联系的人。"],
    good: ["稳步推进已经在进行中的事情。", "适合团队合作、共同计划，把做了一半的事做完。", "务实前进——今天的小成果会慢慢累积。", "适合需要耐心和冷静头脑的谈话。"],
    ordinary: ["处理日常事务——今天没有特别的助力或阻力。", "适合补做家务、文书和日常琐事。", "保持平常的节奏，不必勉强任何事。", "适合提前计划，而不是做大动作。"],
    caution: ["只做轻松的事。可以的话，避开任何重大决定。", "适合安静工作、休息和收尾小事。", "多听少说，仔细核对细节。", "把大笔消费或签字推迟到别的日子。"],
  },
};
// Daily trade (buying, selling, stock, customers) — one line per rating, picked by date like GOOD_FOR.
const TRADE = {
  en: {
    great: ["Strong day for sales: open early, put your best goods up front and ask a fair price with confidence.", "Good day to close deals, take new orders and restock what sells fast.", "Customers are easier to win today — try a new product, a promotion or a special price.", "A good day to collect what you are owed and agree terms with suppliers."],
    good: ["Steady sales — keep regular customers happy and follow up on orders.", "Good for small restocks and fair deals with people you already trust.", "Selling goes smoothly; team up with a friend or a neighbouring shop to reach more buyers.", "A fine day to settle accounts and plan next week's stock."],
    ordinary: ["A normal trading day — keep your usual prices and routine; no need to gamble on big stock.", "Sales are average; focus on good service, a clean display and correct change.", "Better for counting stock and checking costs than for starting something big.", "Buy only what you need today and save big orders for a stronger day."],
    caution: ["Trade carefully: sell what you have and avoid big stock purchases, lending or new contracts.", "Double-check prices, money and change — slow and careful beats fast today.", "Not a day for risky deals or selling on credit; keep cash safe and put off big decisions.", "Keep it simple: serve your regular customers and leave negotiations for another day."],
  },
  km: {
    great: ["ថ្ងៃលក់ដាច់៖ បើកហាងឱ្យបានព្រឹក ដាក់ទំនិញល្អៗនៅខាងមុខ ហើយដាក់តម្លៃសមរម្យដោយទំនុកចិត្ត។", "ថ្ងៃល្អសម្រាប់បិទការព្រមព្រៀង ទទួលការកុម្ម៉ង់ថ្មី និងបន្ថែមស្តុកទំនិញដែលលក់ដាច់។", "ថ្ងៃនេះងាយទាក់ទាញអតិថិជន — សាកល្បងទំនិញថ្មី ប្រូម៉ូសិន ឬតម្លៃពិសេស។", "ថ្ងៃល្អសម្រាប់ប្រមូលលុយដែលគេជំពាក់ និងព្រមព្រៀងលក្ខខណ្ឌជាមួយអ្នកផ្គត់ផ្គង់។"],
    good: ["ការលក់មានស្ថិរភាព — ថែរក្សាអតិថិជនប្រចាំ និងតាមដានការកុម្ម៉ង់។", "ល្អសម្រាប់បន្ថែមស្តុកតិចៗ និងការជួញដូរដោយយុត្តិធម៌ជាមួយអ្នកដែលអ្នកទុកចិត្ត។", "ការលក់ដូររលូន — សហការជាមួយមិត្ត ឬហាងជិតខាង ដើម្បីបានអតិថិជនច្រើនជាងមុន។", "ថ្ងៃល្អសម្រាប់ទូទាត់គណនី និងរៀបចំស្តុកសម្រាប់សប្តាហ៍ក្រោយ។"],
    ordinary: ["ថ្ងៃលក់ដូរធម្មតា — រក្សាតម្លៃ និងទម្លាប់ដដែល មិនចាំបាច់ប្រថុយទិញស្តុកច្រើនទេ។", "ការលក់មធ្យម — ផ្តោតលើសេវាកម្មល្អ ការតាំងទំនិញឱ្យស្អាត និងការអាប់លុយឱ្យត្រឹមត្រូវ។", "ល្អសម្រាប់រាប់ស្តុក និងពិនិត្យថ្លៃដើម ជាជាងចាប់ផ្តើមអ្វីធំៗ។", "ទិញតែអ្វីដែលត្រូវការថ្ងៃនេះ ហើយទុកការកុម្ម៉ង់ធំៗសម្រាប់ថ្ងៃល្អជាងនេះ។"],
    caution: ["ជួញដូរដោយប្រុងប្រយ័ត្ន៖ លក់ទំនិញដែលមានស្រាប់ ជៀសវាងទិញស្តុកច្រើន ឱ្យគេខ្ចី ឬចុះកិច្ចសន្យាថ្មី។", "ពិនិត្យតម្លៃ លុយ និងលុយអាប់ឱ្យបានច្បាស់ — យឺតតែប្រាកដ ប្រសើរជាងលឿននៅថ្ងៃនេះ។", "មិនមែនជាថ្ងៃសម្រាប់ការព្រមព្រៀងប្រថុយ ឬលក់ជំពាក់ទេ — រក្សាលុយឱ្យមានសុវត្ថិភាព ហើយពន្យារការសម្រេចចិត្តធំៗ។", "ធ្វើឱ្យសាមញ្ញ៖ បម្រើអតិថិជនប្រចាំ ហើយទុកការចរចាសម្រាប់ថ្ងៃផ្សេង។"],
  },
  zh: {
    great: ["销售旺日：早点开门，把最好的货摆在前面，自信地开出公道价。", "适合成交、接新订单，补充卖得快的货。", "今天更容易赢得顾客——试试新产品、促销或特价。", "适合收回欠款，并与供应商谈好条件。"],
    good: ["销售平稳——照顾好老顾客，跟进订单。", "适合少量补货，与信任的人做公平交易。", "买卖顺利；可与朋友或邻近店铺合作，接触更多买家。", "适合结清账目，安排下周的货。"],
    ordinary: ["普通的交易日——保持平常的价格和节奏，不必冒险大量进货。", "销售一般；专注于好服务、整洁的陈列和准确找零。", "更适合盘点库存、核对成本，而不是开始大事。", "今天只买需要的，大订单留到更好的日子。"],
    caution: ["谨慎交易：卖现有的货，避免大量进货、借钱给人或签新合同。", "仔细核对价格、钱款和找零——今天慢而稳胜过快。", "不适合冒险交易或赊账；保管好现金，推迟重大决定。", "保持简单：服务好老顾客，谈判留到别的日子。"],
  },
};
const TRADE_T = {
  en: { h: "Trade today", hours: "Best selling hours", partner: "Good trade partner", partnerName: (n) => n, best: (l) => `Best signs for trade today: ${l}.`, shareDay: "Share today's fortune", shareSign: (n) => `Share ${n}'s fortune` },
  km: { h: "ការលក់ដូរថ្ងៃនេះ", hours: "ម៉ោងលក់ដាច់", partner: "ដៃគូជួញដូរល្អ", partnerName: (n) => "ឆ្នាំ" + n, best: (l) => `រាសីល្អសម្រាប់ការលក់ដូរថ្ងៃនេះ៖ ${l}។`, shareDay: "ចែករំលែកជោគជតាថ្ងៃនេះ", shareSign: (n) => `ចែករំលែកជោគជតាឆ្នាំ${n}` },
  zh: { h: "今日买卖", hours: "旺销时段", partner: "好的生意伙伴", partnerName: (n) => "属" + n, best: (l) => `今天最适合做买卖的生肖：${l}。`, shareDay: "分享今日运势", shareSign: (n) => `分享属${n}的运势` },
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
  zh: {
    great: ["即使是好日子，这一点也值得留意，以免用力过猛。", "幸运的日子容易让人做过头——注意分寸。"],
    good: ["这么顺的日子里容易放松警惕——别完全放下戒备。", "顺利的日子容易让人懈怠；保持一点警觉。"],
    ordinary: ["今天没有什么把它推向极端，但值得留意。", "平静的日子正好可以觉察并缓和它。"],
    caution: ["今天这种倾向容易出问题——做重大决定前先停一停。", "今天这种倾向更容易被触发——放慢脚步，重大选择先睡一觉再定。"],
  },
};
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const EN_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const KM_MONTHS = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const kmNum = (n) => String(n).replace(/\d/g, (d) => "0123456789"[d]);
const weekday = EN_DAYS[new Date(Date.UTC(Y, M - 1, D)).getUTCDay()];

const dateEN = `${EN_MONTHS[M - 1]} ${D}, ${Y}`;
const dateKM = `ថ្ងៃទី${kmNum(D)} ខែ${KM_MONTHS[M - 1]} ឆ្នាំ${kmNum(Y)}`;
const dateFullEN = `${weekday}, ${dateEN}`;
const dateZH = `${Y}年${M}月${D}日`;
const dateFullZH = `${dateZH} ${ZH_DAYS[weekday]}`;
const dateFullKM = `${KM_DAYS[weekday]} ទី${kmNum(D)} ខែ${KM_MONTHS[M - 1]} ឆ្នាំ${kmNum(Y)}`;

// ---------------------------------------------------------------- helpers
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pick = (arr, animalIdx) => arr[(dayNumber + animalIdx) % arr.length];
const sorted = ORDER.map((a, i) => ({ a, i, tier: tierOf(a) })).sort((x, y) => RANK[x.tier] - RANK[y.tier] || x.i - y.i);

const names = (list, lang) => list.map((a) => nameIn(a, lang)).join(lang === "km" ? " " : lang === "zh" ? "、" : ", ");
const bestList = sorted.filter((c) => c.tier === "great" || c.tier === "good").map((c) => c.a);
const cautionList = sorted.filter((c) => c.tier === "caution").map((c) => c.a);

const introEN = `<p>
    Every day carries the energy of one of the 12 zodiac animals in the traditional day cycle.
    Today is a ${dayAnimal} day: it lines up best with ${names(bestList, "en")}, and it asks for a
    little extra care from ${names(cautionList, "en")}. Here's how today sits with all twelve signs —
    what it's good for, and the one thing worth watching out for, based on that animal's usual soft spot.
  </p>`;
const introKM = `<p>
    រាល់ថ្ងៃមានថាមពលរបស់សត្វនិមិត្តសញ្ញាទាំង12មួយ តាមវដ្តថ្ងៃប្រពៃណី។ ថ្ងៃនេះជាថ្ងៃ${KM_NAMES[dayAnimal]}៖
    សមស្របបំផុតជាមួយ ${names(bestList, "km")} ហើយត្រូវការការប្រុងប្រយ័ត្នបន្ថែមសម្រាប់ ${names(cautionList, "km")}។
    នេះជារបៀបដែលថ្ងៃនេះទាក់ទងនឹងសញ្ញាទាំង12 — អ្វីដែលល្អសម្រាប់ និងចំណុចមួយដែលគួរប្រុងប្រយ័ត្ន
    ដោយផ្អែកលើចំណុចខ្សោយធម្មតារបស់សត្វនោះ។
  </p>`;

const introZH = `<p>
    在传统的日周期中，每一天都带有十二生肖中某一个生肖的能量。今天是${ZH_NAMES[dayAnimal]}日：
    与${names(bestList, "zh")}最为相合，而${names(cautionList, "zh")}今天需要多加小心。
    以下是今天与十二生肖的关系——适合做什么，以及根据各生肖常见的弱点，需要留意的一件事。
  </p>`;

// ---------------------------------------------------------------- page copy
const UI = extractConst(i18n, "UI_STRINGS");
const ENERGY = {   // three-word "overall energy" of each day animal (presentation copy only)
  en: { Rat: ["Quick", "Resourceful", "Social"], Ox: ["Steady", "Practical", "Focused"], Tiger: ["Bold", "Energetic", "Decisive"], Rabbit: ["Gentle", "Calm", "Diplomatic"], Dragon: ["Confident", "Ambitious", "Radiant"], Snake: ["Wise", "Intuitive", "Composed"], Horse: ["Free", "Lively", "Adventurous"], Goat: ["Gentle", "Creative", "Caring"], Monkey: ["Playful", "Clever", "Adaptable"], Rooster: ["Precise", "Organized", "Proud"], Dog: ["Loyal", "Honest", "Protective"], Pig: ["Generous", "Warm", "Easygoing"] },
  km: { Rat: ["រហ័សរហួន", "ប៉ិនប្រសប់", "រួសរាយ"], Ox: ["ស្ថិរភាព", "ជាក់ស្តែង", "ផ្តោតអារម្មណ៍"], Tiger: ["ក្លាហាន", "សកម្ម", "ឆាប់សម្រេច"], Rabbit: ["ទន់ភ្លន់", "ស្ងប់ស្ងាត់", "ចេះសម្របសម្រួល"], Dragon: ["ទំនុកចិត្ត", "មហិច្ឆតា", "ភ្លឺស្វាង"], Snake: ["ឈ្លាសវៃ", "យល់ដឹងដោយវិចារណញាណ", "ស្ងប់ស្ងាត់"], Horse: ["សេរី", "រស់រវើក", "ចូលចិត្តផ្សងព្រេង"], Goat: ["ទន់ភ្លន់", "ច្នៃប្រឌិត", "យកចិត្តទុកដាក់"], Monkey: ["រីករាយ", "ឆ្លាត", "សម្របខ្លួនបាន"], Rooster: ["ច្បាស់លាស់", "មានរបៀប", "មានមោទនភាព"], Dog: ["ស្មោះស្ម័គ្រ", "ស្មោះត្រង់", "ការពារ"], Pig: ["ចិត្តទូលាយ", "កក់ក្តៅ", "ងាយស្រួល"] },
  zh: { Rat: ["机敏", "足智多谋", "善交际"], Ox: ["稳重", "务实", "专注"], Tiger: ["勇敢", "活力", "果断"], Rabbit: ["温和", "平静", "圆融"], Dragon: ["自信", "进取", "光彩"], Snake: ["睿智", "直觉", "沉着"], Horse: ["自由", "活泼", "爱冒险"], Goat: ["温柔", "有创意", "体贴"], Monkey: ["风趣", "聪明", "善变通"], Rooster: ["精准", "有条理", "自豪"], Dog: ["忠诚", "正直", "守护"], Pig: ["慷慨", "温暖", "随和"] },
};
const andJoin = (arr, lang) => arr.length < 2 ? arr.join("") : lang === "zh" ? arr.slice(0, -1).join("、") + "和" + arr[arr.length - 1] : lang === "km" ? arr.slice(0, -1).join(" ") + " និង " + arr[arr.length - 1] : arr.slice(0, -1).join(", ") + " & " + arr[arr.length - 1];
const T = {
  en: {
    eyebrow: "Daily Fortune · MyBirthSign", h1a: "Today's Chinese", h1b: "Zodiac Fortune",
    sub: "Discover what today brings for all 12 Chinese zodiac animals.",
    dayWord: (n) => `${n} Day`, favors: (l) => `Today's energy favors <strong>${l}</strong>`,
    care: (n) => `<strong>${n}</strong> — Take a little extra care today`,
    langAria: "Language", shareHint: "",
    energyTitle: "Today's Zodiac Energy", best: "Best Supported", extra: "Extra Care", overall: "Overall Energy",
    fine: "Based on traditional Chinese zodiac interpretations. For entertainment and self-reflection.",
    sotd: "🌟 Sign of the Day", sotdLead: (n) => `Today is especially supportive for the ${n}.`,
    goodFor: "Good For", watchOut: "Watch Out For", goodForUp: "Good for", watchUp: "Watch out for",
    learn: (n) => `Learn More About ${n} →`, view: (n) => `View ${n} Guide →`,
    gridH: "Daily Fortune for All 12 Chinese Zodiac Animals", gridP: "Find your sign and see what today brings.",
    guideH: "Today's Guidance", guideP: "Today's zodiac energy can be viewed through different areas of life. These are simple prompts for reflection, not predictions.",
    guides: [
      ["❤️", "Love", "Notice how today's energy shapes the way you listen and connect with someone close.", "/compatibility", "Check compatibility →"],
      ["💼", "Career", "A good moment to review your priorities and see where steady effort fits best.", "/business-partner", "Check a business partner →"],
      ["💰", "Money", "Think about spending and saving calmly. This is reflection, not financial advice.", "../animals.html", "Read the zodiac guide →"],
      ["🤝", "Relationships", "Family, friends and colleagues — notice who you can lean on and who needs your patience.", "/checker", "Find your sign →"],
    ],
    ctaH: "Don't Know Your Chinese Zodiac Sign?", ctaP: "Enter your birthday and discover your zodiac animal, element, lucky numbers and more.", ctaB: "✨ Find My Zodiac Sign",
    allH: "Explore All 12 Chinese Zodiac Animals", allP: "Tap an animal to read its full guide.",
    artH: (d) => `Chinese Zodiac Daily Fortune for ${d}`,
    artP2: "Use this page as a gentle daily check-in. Find your sign in the grid, read what the day is good for, and note the one soft spot worth watching. If you don't know your sign yet, the zodiac checker will tell you in seconds.",
    disc: "This daily fortune is based on traditional Chinese zodiac interpretations and is intended for entertainment and self-reflection. It is not scientific or financial advice.",
    faqH: "Frequently Asked Questions",
    toolsH: "Explore MyBirthSign", toolsP: "More free tools for your zodiac sign.",
    tools: [
      ["🔮", "Chinese Zodiac Checker", "Find your animal and element from your birthday.", "/checker"],
      ["💞", "Compatibility Calculator", "See how two signs get along.", "/compatibility"],
      ["💍", "Wedding Date Picker", "Find favorable months for a wedding.", "/wedding-date"],
      ["💼", "Business Partner Compatibility", "Compare two partners' signs.", "/business-partner"],
      ["📚", "Chinese Zodiac Guide", "Read about all 12 animals.", "../animals.html"],
    ],
  },
  km: {
    eyebrow: "ជោគជតារាសីប្រចាំថ្ងៃ · MyBirthSign", h1a: "", h1b: "ជោគជតារាសីប្រចាំថ្ងៃនេះ",
    sub: "ស្វែងរកអ្វីដែលថ្ងៃនេះនាំមកសម្រាប់សត្វនិមិត្តសញ្ញាទាំង12។",
    dayWord: (n) => `ថ្ងៃនេះ ជាថ្ងៃរបស់ឆ្នាំ${n}`, favors: (l) => `ថ្ងៃនេះថាមពលសមស្របបំផុតជាមួយ <strong>${l}</strong>`,
    care: (n) => `<strong>${n}</strong> — ត្រូវការការប្រុងប្រយ័ត្នបន្ថែមបន្តិចថ្ងៃនេះ`,
    langAria: "ភាសា",
    energyTitle: "ថាមពលនិមិត្តសញ្ញាថ្ងៃនេះ", best: "ទទួលបានការគាំទ្របំផុត", extra: "ត្រូវការការប្រុងប្រយ័ត្នបន្ថែម", overall: "ថាមពលរួម",
    fine: "ផ្អែកលើការបកស្រាយតាមប្រពៃណី។ សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ។",
    sotd: "🌟 សត្វនិមិត្តសញ្ញាប្រចាំថ្ងៃ", sotdLead: (n) => `ថ្ងៃនេះគាំទ្រ${n}ជាពិសេស។`,
    goodFor: "ល្អសម្រាប់", watchOut: "គួរប្រុងប្រយ័ត្ន", goodForUp: "ល្អសម្រាប់", watchUp: "គួរប្រុងប្រយ័ត្ន",
    learn: (n) => `ស្វែងយល់បន្ថែមអំពី${n} →`, view: (n) => `មើលព័ត៌មាន${n} →`,
    gridH: "ជោគជតារាសីប្រចាំថ្ងៃសម្រាប់សត្វនិមិត្តសញ្ញាទាំង12", gridP: "រកសញ្ញារបស់អ្នក ហើយមើលថាថ្ងៃនេះនាំអ្វីមក។",
    guideH: "ការណែនាំថ្ងៃនេះ", guideP: "ថាមពលនិមិត្តសញ្ញាថ្ងៃនេះអាចមើលតាមផ្នែកផ្សេងៗនៃជីវិត។ នេះគ្រាន់តែជាចំណុចសម្រាប់ឆ្លុះបញ្ចាំង មិនមែនជាការទស្សន៍ទាយទេ។",
    guides: [
      ["❤️", "ស្នេហា", "សង្កេតមើលពីរបៀបដែលថាមពលថ្ងៃនេះប៉ះពាល់ដល់ការស្តាប់ និងការតភ្ជាប់ជាមួយមនុស្សជិតស្និទ្ធ។", "/compatibility", "ពិនិត្យភាពជាគូ →"],
      ["💼", "ការងារ", "ពេលល្អក្នុងការពិនិត្យអាទិភាពរបស់អ្នក ហើយមើលថាកន្លែងណាសមនឹងការខិតខំប្រឹងប្រែងជាប់លាប់។", "/business-partner", "ពិនិត្យដៃគូអាជីវកម្ម →"],
      ["💰", "ហិរញ្ញវត្ថុ", "គិតអំពីការចំណាយ និងការសន្សំដោយចិត្តស្ងប់។ នេះជាការឆ្លុះបញ្ចាំង មិនមែនជាដំបូន្មានហិរញ្ញវត្ថុទេ។", "../animals.html", "អានមគ្គុទ្ទេសក៍ →"],
      ["🤝", "ទំនាក់ទំនង", "គ្រួសារ មិត្តភក្តិ និងមិត្តរួមការងារ — សង្កេតមើលអ្នកដែលអ្នកអាចពឹងពាក់បាន និងអ្នកដែលត្រូវការការអត់ធ្មត់ពីអ្នក។", "/checker", "រកសញ្ញារបស់អ្នក →"],
    ],
    ctaH: "មិនទាន់ដឹងសត្វនិមិត្តសញ្ញារបស់អ្នកទេឬ?", ctaP: "បញ្ចូលថ្ងៃកំណើតរបស់អ្នក ហើយស្វែងរកសត្វនិមិត្តសញ្ញា ធាតុ លេខសំណាង និងច្រើនទៀត។", ctaB: "✨ រកសត្វនិមិត្តសញ្ញារបស់ខ្ញុំ",
    allH: "ស្វែងយល់សត្វនិមិត្តសញ្ញាទាំង12", allP: "ចុចលើសត្វមួយ ដើម្បីអានមគ្គុទ្ទេសក៍ពេញលេញ។",
    artH: (d) => `ជោគជតារាសីប្រចាំថ្ងៃ ${d}`,
    artP2: "ប្រើទំព័រនេះជាការត្រួតពិនិត្យប្រចាំថ្ងៃដ៏ស្រាល។ រកសញ្ញារបស់អ្នកក្នុងតារាង អានអ្វីដែលថ្ងៃនេះល្អសម្រាប់ ហើយកត់សម្គាល់ចំណុចខ្សោយមួយដែលគួរប្រុងប្រយ័ត្ន។ ប្រសិនបើអ្នកមិនទាន់ដឹងសញ្ញារបស់អ្នក ឧបករណ៍ពិនិត្យនឹងប្រាប់អ្នកក្នុងរយៈពេលតែប៉ុន្មានវិនាទី។",
    disc: "ជោគជតារាសីប្រចាំថ្ងៃនេះផ្អែកលើការបកស្រាយតាមប្រពៃណី ហើយមានគោលបំណងសម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ។ វាមិនមែនជាដំបូន្មានវិទ្យាសាស្ត្រ ឬហិរញ្ញវត្ថុទេ។",
    faqH: "សំណួរដែលសួរញឹកញាប់",
    toolsH: "ស្វែងយល់ MyBirthSign", toolsP: "ឧបករណ៍ឥតគិតថ្លៃបន្ថែមសម្រាប់សត្វនិមិត្តសញ្ញារបស់អ្នក។",
    tools: [
      ["🔮", "ឧបករណ៍ពិនិត្យសត្វនិមិត្តសញ្ញា", "រកសត្វ និងធាតុរបស់អ្នកពីថ្ងៃកំណើត។", "/checker"],
      ["💞", "ម៉ាស៊ីនគណនាភាពជាគូ", "មើលថាសញ្ញាពីរចុះសម្រុងគ្នាប៉ុណ្ណា។", "/compatibility"],
      ["💍", "ជ្រើសរើសថ្ងៃមង្គល", "រកខែសមស្របសម្រាប់ពិធីមង្គលការ។", "/wedding-date"],
      ["💼", "ភាពសមស្របដៃគូអាជីវកម្ម", "ប្រៀបធៀបសញ្ញារបស់ដៃគូទាំងពីរ។", "/business-partner"],
      ["📚", "មគ្គុទ្ទេសក៍សត្វនិមិត្តសញ្ញា", "អានអំពីសត្វទាំង12។", "../animals.html"],
    ],
  },
  zh: {
    eyebrow: "每日运势 · MyBirthSign", h1a: "", h1b: "今日生肖运势",
    sub: "看看今天为十二生肖带来什么。",
    dayWord: (n) => `${n}日`, favors: (l) => `今天的能量有利于<strong>${l}</strong>`,
    care: (n) => `<strong>${n}</strong>——今天多加小心`,
    langAria: "语言",
    energyTitle: "今日生肖能量", best: "最受助力", extra: "需多加小心", overall: "整体能量",
    fine: "基于传统生肖解读，仅供娱乐与自我反思。",
    sotd: "🌟 今日生肖", sotdLead: (n) => `今天对属${n}的人格外有利。`,
    goodFor: "适合", watchOut: "需要留意", goodForUp: "适合", watchUp: "需要留意",
    learn: (n) => `了解更多关于属${n} →`, view: (n) => `查看属${n}指南 →`,
    gridH: "十二生肖今日运势", gridP: "找到你的生肖，看看今天会带来什么。",
    guideH: "今日指引", guideP: "今天的生肖能量可以从生活的不同方面来看。这些只是供思考的提示，并非预测。",
    guides: [
      ["❤️", "爱情", "留意今天的能量如何影响你倾听和亲近身边人的方式。", "/compatibility", "查看配对 →"],
      ["💼", "事业", "适合检视优先事项，看看稳定的努力最适合用在哪里。", "/business-partner", "查看商业伙伴 →"],
      ["💰", "财运", "冷静地思考开支和储蓄。这只是反思，不是理财建议。", "../animals.html", "阅读生肖指南 →"],
      ["🤝", "人际关系", "家人、朋友和同事——留意谁可以依靠，谁需要你的耐心。", "/checker", "查找你的生肖 →"],
    ],
    ctaH: "不知道自己的生肖？", ctaP: "输入生日，了解你的生肖、五行、幸运数字等。", ctaB: "✨ 查找我的生肖",
    allH: "探索十二生肖", allP: "点击一个生肖，阅读完整指南。",
    artH: (d) => `${d}生肖每日运势`,
    artP2: "把这个页面当作每天轻松的自我检查。在列表中找到你的生肖，看看今天适合做什么，并留意一个需要注意的弱点。如果还不知道自己的生肖，生肖查询工具几秒钟就能告诉你。",
    disc: "本每日运势基于传统生肖解读，仅供娱乐与自我反思，并非科学或理财建议。",
    faqH: "常见问题",
    toolsH: "探索 MyBirthSign", toolsP: "更多免费的生肖工具。",
    tools: [
      ["🔮", "生肖查询", "根据生日查找你的生肖和五行。", "/checker"],
      ["💞", "配对计算器", "看看两个生肖合不合。", "/compatibility"],
      ["💍", "婚期选择", "查找适合办婚礼的月份。", "/wedding-date"],
      ["💼", "商业伙伴配对", "比较两位伙伴的生肖。", "/business-partner"],
      ["📚", "生肖指南", "阅读十二生肖介绍。", "../animals.html"],
    ],
  },
};
function faqs(lang, dateTxt) {
  const A = dayAnimal, nm = (a) => nameIn(a, lang);
  const others = bestList.filter((a) => a !== A);
  if (lang === "zh") return [
    ["今天的生肖是什么？", `今天（${dateTxt}）在传统的十二日周期中是${nm(A)}日。`],
    ["哪些生肖与今天的能量最相合？", `${nm(A)}是今日生肖，${andJoin(others.map(nm), "zh")}与它同属三合，因此传统上今天最受助力。`],
    ["今天哪个生肖需要多加小心？", `${andJoin(cautionList.map(nm), "zh")}在周期中与${nm(A)}正好相对（相冲），因此传统上今天需要多加小心。`],
    ["生肖每日运势是怎么计算的？", "每个日历日按循环周期对应十二生肖之一，从一个固定的参考日期开始计算。然后把每个生肖与当天的生肖比较：相同生肖为大吉，同属三合的生肖为吉，正好相冲的生肖宜小心，其余生肖为平。"],
    ["我的出生日期会影响我的生肖吗？", "会。生肖按农历年计算，从农历新年（大约在1月21日至2月20日之间）开始，而不是1月1日。如果你出生在1月或2月初，请用生肖查询工具确认。"],
    ["生肖运势有科学依据吗？", "没有。生肖是一种传统文化体系，没有科学证据表明它能预测性格或未来。我们提供它仅供娱乐与自我反思。"],
  ];
  if (lang === "km") return [
    ["តើសត្វនិមិត្តសញ្ញាប្រចាំថ្ងៃនេះជាអ្វី?", `ថ្ងៃនេះ ${dateTxt} ជាថ្ងៃ${nm(A)} ក្នុងវដ្តថ្ងៃ12 តាមប្រពៃណី។`],
    ["តើសញ្ញាណាខ្លះសមស្របបំផុតជាមួយថាមពលថ្ងៃនេះ?", `${nm(A)} ជាសញ្ញាប្រចាំថ្ងៃ ហើយ ${andJoin(others.map(nm), "km")} ស្ថិតក្នុងក្រុមមិត្តភក្តិតែមួយ ដូច្នេះតាមប្រពៃណីទទួលបានការគាំទ្រល្អបំផុតថ្ងៃនេះ។`],
    ["តើសញ្ញាណាគួរប្រុងប្រយ័ត្នជាងគេថ្ងៃនេះ?", `${andJoin(cautionList.map(nm), "km")} ជាសញ្ញាដែលនៅទល់មុខ${nm(A)}ក្នុងវដ្ត ដូច្នេះតាមប្រពៃណីត្រូវការការប្រុងប្រយ័ត្នបន្ថែមបន្តិច។`],
    ["តើជោគជតារាសីប្រចាំថ្ងៃគណនាដោយរបៀបណា?", "រាល់ថ្ងៃក្នុងប្រតិទិនត្រូវបានកំណត់ជាសត្វមួយក្នុងចំណោមសត្វទាំង12 តាមវដ្តដែលវិលជុំ ដោយរាប់ពីកាលបរិច្ឆេទយោងថេរមួយ។ បន្ទាប់មកសញ្ញានីមួយៗត្រូវបានប្រៀបធៀបនឹងសត្វប្រចាំថ្ងៃ៖ សត្វដូចគ្នាគឺថ្ងៃល្អខ្លាំង សញ្ញាក្នុងក្រុមមិត្តភក្តិតែមួយគឺថ្ងៃល្អ សញ្ញាដែលនៅទល់មុខគឺថ្ងៃគួរប្រុងប្រយ័ត្ន ហើយសញ្ញាផ្សេងទៀតគឺថ្ងៃធម្មតា។"],
    ["តើថ្ងៃកំណើតរបស់ខ្ញុំប៉ះពាល់ដល់សត្វនិមិត្តសញ្ញារបស់ខ្ញុំទេ?", "បាទ/ចាស។ សត្វរបស់អ្នកអនុវត្តតាមឆ្នាំតាមច័ន្ទគតិ ដែលចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចិន (ប្រហែលចន្លោះថ្ងៃទី21 មករា ដល់ថ្ងៃទី20 កុម្ភៈ) មិនមែនថ្ងៃទី1 មករាទេ។ ប្រសិនបើអ្នកកើតនៅខែមករា ឬដើមខែកុម្ភៈ សូមប្រើឧបករណ៍ពិនិត្យដើម្បីប្រាកដ។"],
    ["តើជោគជតារាសីមានភស្តុតាងវិទ្យាសាស្ត្រទេ?", "មិនមានទេ។ និមិត្តសញ្ញាទាំងនេះជាប្រព័ន្ធវប្បធម៌ប្រពៃណី ហើយគ្មានភស្តុតាងវិទ្យាសាស្ត្រថាវាអាចទស្សន៍ទាយអត្តចរិត ឬអនាគតបានទេ។ យើងបង្ហាញវាសម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ។"],
  ];
  return [
    ["What is today's Chinese zodiac animal?", `Today, ${dateTxt}, is a ${A} day in the traditional 12-day cycle.`],
    ["Which zodiac signs are most compatible with today's energy?", `${A} is the sign of the day, and ${andJoin(others, "en")} share its triangle of friends, so they are traditionally the best supported today.`],
    ["Which Chinese zodiac sign should be more careful today?", `${andJoin(cautionList, "en")}, the sign directly opposite ${A} in the cycle, is traditionally asked to take a little extra care today.`],
    ["How is Chinese zodiac daily fortune calculated?", "Each calendar day is assigned one of the 12 animals in a repeating cycle, counted from a fixed reference date. Each sign is then compared with the day's animal: the same animal has a Great Day, signs in the same triangle of friends have a Good Day, the sign directly opposite should Take It Easy, and every other sign has an Ordinary Day."],
    ["Does my birth date affect my Chinese zodiac sign?", "Yes. Your sign follows the lunar-calendar zodiac year, which starts at Lunar New Year (between about January 21 and February 20) rather than on January 1. If you were born in January or early February, use the zodiac checker to be sure."],
    ["Is Chinese zodiac fortune scientifically proven?", "No. The zodiac is a traditional cultural system, and there is no scientific evidence that it predicts personality or the future. We present it for entertainment and self-reflection."],
  ];
}

// ---------------------------------------------------------------- icons (inline SVG, so status never relies on colour alone)
const I = {
  great: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z"/></svg>',
  good: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2.8 2.7 5.9 6.4.7-4.8 4.3 1.4 6.3L12 16.7 6.3 20l1.4-6.3L2.9 9.4l6.4-.7L12 2.8Z"/></svg>',
  ordinary: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9Z"/></svg>',
  caution: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M12 3.5 21.5 20h-19L12 3.5Z"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 10v4.5M12 17.4v.1"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>',
  orn: '<svg class="fx-orn" viewBox="0 0 150 14" aria-hidden="true"><path d="M2 7h56M92 7h56" stroke="#e7c27a" stroke-width="1" opacity=".8"/><path d="M75 1.5c2.2 3 2.2 8 0 11-2.2-3-2.2-8 0-11ZM68 7c3-1.8 5-1.8 7 0-2 1.8-4 1.8-7 0ZM82 7c-3-1.8-5-1.8-7 0 2 1.8 4 1.8 7 0Z" fill="#e7c27a"/></svg>',
};

// ---------------------------------------------------------------- page body
const slugOf = (a) => a.toLowerCase();
const guideHref = (a) => `../blog/zodiac-year-${slugOf(a)}.html`;
const med = (a, size, cls = "") => `<img class="fx-med ${cls}" src="../images/fortune/med-${slugOf(a)}.webp" width="${size}" height="${size}" alt="" loading="lazy" decoding="async">`;
const firstSentence = (s, lang) => { const m = s.trim().match(lang === "km" ? /^[^។]+។?/ : lang === "zh" ? /^[^。]+。?/ : /^[^.]+\.?/); return m ? m[0].trim() : s.trim(); };
const CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v11.5A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5ZM3.5 10h17M8 3.5v4M16 3.5v4"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#3fae6b"/><path d="m7.5 12.3 3.2 3.2 5.8-6.4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const WARN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#e0566b"/><path d="M12 7v6M12 16.5v.1" stroke="#fff" stroke-width="2.3" stroke-linecap="round"/></svg>';

const attr = (v) => esc(v).replace(/"/g, "&quot;").replace(/'/g, "&#39;");   // safe inside attribute values
const DL = {
  en: { love: "Love", career: "Career", money: "Money", number: "Number", color: "Color", direction: "Direction", time: "Time", advice: "Today's Advice", more: "Love · Work · Money", theme: "Today's Theme", loveHi: "Love highlight", bizHi: "Business highlight" },
  km: { love: "ស្នេហា", career: "ការងារ", money: "លុយកាក់", number: "លេខ", color: "ពណ៌", direction: "ទិស", time: "ម៉ោង", advice: "ដំបូន្មានថ្ងៃនេះ", more: "ស្នេហា · ការងារ · លុយ", theme: "ប្រធានបទថ្ងៃនេះ", loveHi: "ស្នេហាលេចធ្លោ", bizHi: "អាជីវកម្មលេចធ្លោ" },
  zh: { love: "爱情", career: "事业", money: "财运", number: "数字", color: "颜色", direction: "方位", time: "时间", advice: "今日建议", more: "爱情 · 事业 · 财运", theme: "今日主题", loveHi: "爱情亮点", bizHi: "生意亮点" },
};

function signCard(c, lang, t) {
  const { a, i, tier } = c, isKm = lang === "km", name = nameIn(a, lang);
  const weak = infoIn(a, lang).weaknesses.trim();
  const d = dataOf(a), F = factOf(a), L = d ? d.lucky : F.lucky, D = DL[lang], TT = TRADE_T[lang], date = isKm ? dateKM : lang === "zh" ? dateZH : dateEN;
  const trade = pick(TRADE[lang][tier], i + 2);
  const partner = TT.partnerName(nameIn(L.helperAnimal || F.lucky.helperAnimal, lang));
  const time = isKm ? kmNum(L.time) : L.time;
  const goodFor = pick(GOOD_FOR[lang][tier], i), watch = `${weak}${lang === "zh" ? "" : " "}${pick(AVOID_NOTE[lang][tier], i + 1)}`;
  const x = d && d.text[lang] ? d.text[lang] : null;
  const colorTxt = colorIn(L.color, lang), dirTxt = dirIn(L.direction, lang);
  const card = x
    ? { fortune: x.fortune, love: x.love, career: x.career, money: x.money, advice: x.advice }
    : { fortune: goodFor };
  const spec = Object.assign({ cardType: "daily", lang, animal: a, name, tier, label: TIER_LABEL[lang][tier], date }, card,
    { trade, tradeLabel: TT.h, number: L.number, color: colorTxt, colorHex: L.color.hex, direction: dirTxt, time: L.time });
  const tradeBox = `<div class="fx-trade"><h4>${esc(TT.h)}</h4><p>${esc(trade)}</p>
          <p class="fx-trade-meta"><span>${TT.hours} <strong>${time}</strong></span><span>${TT.partner} <strong>${esc(partner)}</strong></span></p></div>`;
  const lucky = `<p class="fx-sign-lucky"><span>${D.number} <strong>${isKm ? kmNum(L.number) : L.number}</strong></span><span>${D.color} <i class="fx-swatch" style="background:${L.color.hex}"></i><strong>${esc(colorTxt)}</strong></span><span>${D.direction} <strong>${esc(dirTxt)}</strong></span><span>${D.time} <strong>${time}</strong></span></p>`;
  const share = `<div class="fx-sign-share share-row" data-share-icon-only data-share-label="${attr(TT.shareSign(name))}" data-share-title="${attr(`${name} · ${TIER_LABEL[lang][tier]} — ${date}`)}" data-share-url="/blog/daily-fortune-${iso}.html?sign=${a.toLowerCase()}" data-share-card="${attr(JSON.stringify(spec))}"></div>`;
  const inner = x
    ? `<p class="fx-sign-fortune" data-sign="${a.toLowerCase()}">${esc(x.fortune)}</p>
        ${tradeBox}
        ${lucky}
        ${digitsHtml(a, lang)}
        <details class="fx-sign-more"><summary>${D.more}</summary>
          <h4>${D.love}</h4><p>${esc(x.love)}</p>
          <h4>${D.career}</h4><p>${esc(x.career)}</p>
          <h4>${D.money}</h4><p>${esc(x.money)}</p>
          <h4>${t.watchOut}</h4><p>${esc(x.careful)}</p>
          <h4>${D.advice}</h4><p>${esc(x.advice)}</p>
        </details>`
    : `<h4 data-sign="${a.toLowerCase()}">${t.goodFor}</h4>
        <p>${esc(goodFor)}</p>
        ${tradeBox}
        <h4>${t.watchOut}</h4>
        <p>${esc(watch)}</p>
        ${lucky}
        ${digitsHtml(a, lang)}`;
  return `<li class="fx-sign fx-sign-${tier}">
        <div class="fx-sign-head">
          ${med(a, 76)}
          <h3>${esc(name)}</h3>
          <span class="fx-tier fx-tier-${tier}">${I[tier]}${esc(TIER_LABEL[lang][tier])}</span>
          ${share}
        </div>
        ${whyLine(a, lang)}
        ${inner}
        <a class="fx-more" href="${guideHref(a)}">${esc(t.view(name))}</a>
      </li>`;
}

function body(lang) {
  const isKm = lang === "km", isZh = lang === "zh", t = T[lang], nm = (a) => nameIn(a, lang);
  const A = dayAnimal, dateTxt = isKm ? dateKM : isZh ? dateZH : dateEN;
  const favorsList = andJoin(bestList.map(nm), lang), careList = andJoin(cautionList.map(nm), lang);
  const energy = ENERGY[lang][A].join(" • ");
  const KM_TRAIT_LINE = { Ox: "ទុកចិត្តបាន ស្មោះត្រង់ និងឧស្សាហ៍ព្យាយាម។" };   // wording supplied by the site owner
  const traitLine = isKm && KM_TRAIT_LINE[A] ? KM_TRAIT_LINE[A] : firstSentence(infoIn(A, lang).traits, lang);
  // Sign of the day (always the day animal = "great"): three good-for lines from the existing bank, starting at the one its card shows.
  const gbank = GOOD_FOR[lang].great, aIdx = ORDER.indexOf(A);
  const goodBullets = [0, 1, 2].map((k) => gbank[((dayNumber + aIdx) % gbank.length + k) % gbank.length]);
  const weakA = infoIn(A, lang).weaknesses.trim();
  const watchBullets = [weakA, pick(AVOID_NOTE[lang].great, aIdx + 1)];
  const faqItems = faqs(lang, dateTxt);
  const introP = isKm ? introKM : isZh ? introZH : introEN;
  const wd = isKm ? KM_DAYS[weekday] : isZh ? ZH_DAYS[weekday] : weekday;
  const byZodiac = ORDER.map((a, i) => ({ a, i, tier: tierOf(a) }));

  return `<div class="fx-body">
<section class="fx-hero fx-hero--${A.toLowerCase()}" aria-labelledby="fx-h1-${lang}">
  <div class="fx-hero-in">
    <h1 id="fx-h1-${lang}">${t.h1a ? `<small>${t.h1a.trim()}</small>` : ""}<span>${t.h1b}</span></h1>
    <p class="fx-sub">${t.sub}</p>
    <p class="fx-date">${CAL}<time datetime="${iso}">${esc(dateTxt)}</time><span class="fx-wd">${esc(wd)}</span></p>
    <p class="fx-pill"><span aria-hidden="true">${EMOJI[A]}</span> ${esc(t.dayWord(nm(A)))}</p>
    <p class="fx-pillar">${isKm ? `សសរថ្ងៃ៖ <span lang="zh">${pillarCh}</span> (${EL_N.km[dayEl]} ${nm(A)})` : isZh ? `日柱：${pillarCh}（${EL_N.zh[dayEl]}${nm(A)}日）` : `Day pillar: ${dayEl} ${A} (${pillarPy})`}</p>
    <div class="fx-chips">
      <p class="fx-chip">${I.great.replace("<svg", '<svg style="color:#f6dc9b"')}<span>${t.favors(esc(favorsList))}</span></p>
      <p class="fx-chip fx-chip-care">${I.caution.replace("<svg", '<svg style="color:#ff8aa5"')}<span>${t.care(esc(careList))}</span></p>
    </div>
  </div>
</section>

<div class="fx-wrap">
  <section class="fx-sec fx-sec-first" aria-labelledby="fx-en-${lang}">
    <div class="fx-gframe fx-energy">
      <div class="fx-energy-main">
        ${med(A, 150, "fx-med-xl")}
        <div>
          <h2 id="fx-en-${lang}">${t.energyTitle}</h2>
          <p class="fx-energy-day">${EMOJI[A]} ${esc(t.dayWord(nm(A)))}</p>
          <p class="fx-energy-desc">${esc(traitLine)}</p>
        </div>
      </div>
      <div class="fx-trio">
        <div class="fx-stat"><h3>${I.great}${t.best}</h3>
          <ul class="fx-meds">${bestList.map((a) => `<li>${med(a, 52)}<span>${esc(nm(a))}</span></li>`).join("")}</ul></div>
        <div class="fx-stat fx-stat-care"><h3>${I.caution}${t.extra}</h3>
          <ul class="fx-meds">${cautionList.map((a) => `<li>${med(a, 52)}<span>${esc(nm(a))}</span></li>`).join("")}</ul></div>
        <div class="fx-stat"><h3>${I.moon}${t.overall}</h3>
          <p class="fx-energy-words">${esc(energy)}</p></div>
      </div>
      <p class="fx-fine">${t.fine}</p>
    </div>
  </section>

  <div class="fx-duo">
    <section aria-labelledby="fx-sotd-${lang}">
      <div class="fx-gframe fx-feature">
        <div class="fx-feature-art"><img src="../images/zodiac/${slugOf(A)}.webp" width="360" height="542" alt="${esc(isKm ? nm(A) : isZh ? "生肖" + nm(A) : A + " zodiac animal")}" loading="lazy" decoding="async"></div>
        <div class="fx-feature-body">
          <p class="fx-kicker">${t.sotd}</p>
          <h2 id="fx-sotd-${lang}">${esc(nm(A))}</h2>
          <p><span class="fx-tier fx-tier-great">${I.great}${esc(TIER_LABEL[lang].great)}</span></p>
          <p class="fx-feature-lead">${esc(t.sotdLead(nm(A)))}</p>
          <div class="fx-two">
            <div><h3>${t.goodFor}</h3><ul class="fx-ticks">${goodBullets.map((s) => `<li>${CHECK}<span>${esc(s)}</span></li>`).join("")}</ul></div>
            <div><h3>${t.watchOut}</h3><ul class="fx-ticks">${watchBullets.map((s) => `<li>${WARN}<span>${esc(s)}</span></li>`).join("")}</ul></div>
          </div>
          <a class="fx-btn" href="${guideHref(A)}">${esc(t.learn(nm(A)))}</a>
        </div>
      </div>
    </section>

    <section aria-labelledby="fx-guide-${lang}">
      <div class="fx-gframe fx-guidepanel">
        <h2 id="fx-guide-${lang}">${t.guideH}</h2>
        <p class="fx-guide-intro">${t.guideP}</p>
        <div class="fx-guides">
${t.guides.map((g) => `          <div class="fx-guide"><div class="fx-guide-ico" aria-hidden="true">${g[0]}</div><div><h3>${g[1]}</h3><p>${esc(g[2])}</p><a href="${g[3]}">${esc(g[4])}</a></div></div>`).join("\n")}
        </div>
      </div>
    </section>
  </div>

  <section class="fx-sec" aria-labelledby="fx-grid-${lang}">
    <div class="fx-head"><h2 id="fx-grid-${lang}">${t.gridH}</h2>${I.orn}<p>${t.gridP}</p></div>
    <div class="fx-day-share share-row" data-share-label="${attr(TRADE_T[lang].shareDay)}" data-share-title="${attr(t.gridH.replace(/<[^>]+>/g, "") + " — " + dateTxt)}" data-share-url="/blog/daily-fortune-${iso}.html" data-share-card="${attr(JSON.stringify({ cardType: "lucky", lang, date: dateTxt, top: FACTS.highlights.topLucky, topNames: FACTS.highlights.topLucky.map(nm), careful: FACTS.highlights.careful.map(nm), text: TRADE_T[lang].best(andJoin(FACTS.highlights.topLucky.map(nm), lang)) }))}"></div>
    <p class="fx-digits-note">${isKm ? "លេខសំណាង (1 ដល់ 5 ខ្ទង់) សម្រាប់ថ្ងៃនេះ គឺសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការទស្សន៍ទាយ ឬការណែនាំឱ្យភ្នាល់ទេ។" : isZh ? "幸运数字（1至5位数）仅适用于今天，仅供娱乐，并非预测或投注建议。" : "Lucky numbers (1 to 5 digits) are for this day only and for fun, not a prediction or betting advice."}</p>
    <ul class="fx-grid">
${byZodiac.map((c) => "      " + signCard(c, lang, t)).join("\n")}
    </ul>
  </section>

  <div class="ad-slot">${isKm ? "ទំនេរសម្រាប់ផ្សាយពាណិជ្ជកម្ម" : isZh ? "广告位" : "Ad space"}</div>

  <section class="fx-sec" aria-labelledby="fx-cta-${lang}">
    <div class="fx-cta">
      <img class="fx-lotus fx-lotus-l" src="../images/wedding/lotus-pink.webp" width="190" height="96" alt="" loading="lazy">
      <img class="fx-lotus fx-lotus-r" src="../images/wedding/lotus-gold.webp" width="190" height="96" alt="" loading="lazy">
      <h2 id="fx-cta-${lang}">${t.ctaH}</h2>
      <p>${t.ctaP}</p>
      <a class="fx-btn" href="/checker">${t.ctaB}</a>
    </div>
  </section>

  <section class="fx-sec" aria-labelledby="fx-all-${lang}">
    <div class="fx-head"><h2 id="fx-all-${lang}">${t.allH}</h2>${I.orn}<p>${t.allP}</p></div>
    <div class="fx-gframe fx-animalsbox">
      <ul class="fx-animals">
${ORDER.map((a) => `        <li><a href="${guideHref(a)}"${a === A ? ' class="is-today"' : ""}>${med(a, 64)}<span>${esc(nm(a))}</span></a></li>`).join("\n")}
      </ul>
    </div>
  </section>

  <article class="fx-article fx-gframe">
    <h2>${esc(t.artH(dateTxt))}</h2>
    ${DATA && DATA.highlights.theme[lang] ? `<p class="fx-theme"><strong>${DL[lang].theme}${isZh ? "：" : ":"}</strong> ${esc(DATA.highlights.theme[lang])}</p>
    <p>${esc(DATA.highlights.summary[lang])}</p>
    <p><strong>${DL[lang].loveHi}${isZh ? "：" : ":"}</strong> ${esc(DATA.highlights.love[lang])}</p>
    <p><strong>${DL[lang].bizHi}${isZh ? "：" : ":"}</strong> ${esc(DATA.highlights.business[lang])}</p>
    ` : ""}${introP}
    <p>${t.artP2}</p>
    <p class="fx-disc">${t.disc}</p>
  </article>

  <div class="fx-duo fx-duo-bottom">
    <section aria-labelledby="fx-faq-${lang}">
      <div class="fx-gframe fx-faqpanel">
        <h2 id="fx-faq-${lang}">${t.faqH}</h2>
        <div class="fx-faq">
${faqItems.map(([q, a]) => `          <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n")}
        </div>
      </div>
    </section>
    <section aria-labelledby="fx-tools-${lang}">
      <div class="fx-gframe fx-toolspanel">
        <h2 id="fx-tools-${lang}">${t.toolsH}</h2>
        <ul class="fx-tools">
${t.tools.map((x) => `          <li><a href="${x[3]}"><span class="fx-t-ico" aria-hidden="true">${x[0]}</span><strong>${esc(x[1])}</strong><small>${esc(x[2])}</small></a></li>`).join("\n")}
        </ul>
      </div>
    </section>
  </div>
</div>
</div>`;
}

// ---------------------------------------------------------------- write post
const slug = `daily-fortune-${iso}`;
const postPath = `blog/${slug}.html`;
const exists = fs.existsSync(path.join(ROOT, postPath));
if (exists && !FORCE) {
  console.log(`${postPath} already exists — nothing to do (use --force to regenerate).`);
} else {
  const url = `https://mybirthsign.com/blog/${slug}.html`;
  const title = `Chinese Zodiac Daily Fortune — ${dateEN} | MyBirthSign`;
  const desc = DATA
    ? "Today's Chinese zodiac fortune for all 12 animals: love, career and money highlights, lucky numbers and colors, the best signs for the day and traditional daily advice."
    : "Discover today's Chinese zodiac fortune for all 12 zodiac animals, including the best signs for the day, signs needing extra care, and traditional daily guidance.";
  const ogImage = `https://mybirthsign.com/images/og/sign-${dayAnimal.toLowerCase()}.jpg`;   // the day animal, 1200x630 JPG
  const faqEN = faqs("en", dateEN);
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: `Chinese Zodiac Daily Fortune for ${dateEN}`, description: desc, datePublished: iso, dateModified: iso, image: ogImage,
        mainEntityOfPage: url, inLanguage: "en", author: { "@type": "Organization", name: "MyBirthSign", url: "https://mybirthsign.com/" },
        publisher: { "@type": "Organization", name: "MyBirthSign", url: "https://mybirthsign.com/" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mybirthsign.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://mybirthsign.com/blog" },
        { "@type": "ListItem", position: 3, name: `Daily Fortune ${dateEN}`, item: url } ] },
      { "@type": "FAQPage", mainEntity: faqEN.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  }).replace(/</g, "\\u003c");
  const html = read("scripts/daily-fortune-template.html")
    .replaceAll("{{TITLE}}", esc(title))
    .replaceAll("{{URL}}", url)
    .replaceAll("{{DESC}}", esc(desc))
    .replaceAll("{{OG_IMAGE}}", ogImage)
    .replace("{{JSONLD}}", () => jsonld)
    .replace("{{BODY_EN}}", () => body("en"))
    .replace("{{BODY_KM}}", () => body("km"))
    .replace("{{BODY_ZH}}", () => body("zh"))
    // shared sign link (?sign=rat): open that sign's card, scroll to it and glow briefly 
    .replace("</body>", () => `<script>(function(){var m=/[?&]sign=([a-z]+)/.exec(location.search);if(!m)return;function go(){var hl=document.documentElement.lang,l=hl==="km"?"km":/^zh/.test(hl)?"zh":"en",c=document.querySelector('[data-lang-content="'+l+'"] [data-sign="'+m[1]+'"]')||document.querySelector('[data-sign="'+m[1]+'"]');if(!c)return;var li=c.closest(".fx-sign"),d=li&&li.querySelector("details");if(!li)return;if(!li.offsetParent){if(++n<40)setTimeout(go,100);return;}if(d)d.open=true;li.classList.add("fx-sign-hit");li.style.scrollMarginTop="16px";li.scrollIntoView({block:"start"});setTimeout(function(){li.scrollIntoView({block:"start"});},700);}var n=0;if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(go,50);});else setTimeout(go,50);})();</script>\n</body>`);
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
if (NO_FEATURE) { console.log("day-ahead post: blog.html and homepage left on today"); process.exit(0); }
let blog = read("blog.html");
const before = blog;
blog = blog.replace(/href="blog\/daily-fortune-\d{4}-\d{2}-\d{2}\.html"/g, `href="blog/${slug}.html"`);
// the featured card's picture = today's day animal
const dayLower = dayAnimal.toLowerCase();
blog = blog.replace(/(<a class="bv2-featured" href="blog\/daily-fortune-[^"]+">\s*<div class="bv2-featured-art">\s*<img src=")images\/zodiac\/\w+\.webp(" alt=")Illustration of the \w+(, today's luckiest Chinese zodiac sign")/g,
  `$1images/zodiac/${dayLower}.webp$2Illustration of the ${dayAnimal}$3`);
let dateIdx = 0;
blog = blog.replace(/(<a class="bv2-featured" href="blog\/daily-fortune-[^"]+">\s*<div class="bv2-featured-art">\s*<img src=")images\/zodiac\/\w+\.webp(" alt="今日最幸运生肖插图")/g, `$1images/zodiac/${dayLower}.webp$2`);
// featured date lines in block order: English, Khmer, Chinese
blog = blog.replace(/(<div class="bv2-featured-meta">\s*<span>)([^<]*)(<\/span>)/g, (m, a, _old, c) => a + ([dateFullEN, dateFullKM, dateFullZH][dateIdx++] || dateFullEN) + c);
if (blog !== before) { write("blog.html", blog); console.log("blog.html feature updated"); }

// ---------------------------------------------------------------- homepage "From the MyBirthSign Blog" list
execFileSync(process.execPath, [path.join(ROOT, "scripts/home-page.mjs")], { stdio: "inherit" });
