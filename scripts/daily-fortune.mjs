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
  en: { great: "Great Day", good: "Good Day", ordinary: "Ordinary Day", caution: "Take It Easy" },
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

// ---------------------------------------------------------------- helpers
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pick = (arr, animalIdx) => arr[(dayNumber + animalIdx) % arr.length];
const sorted = ORDER.map((a, i) => ({ a, i, tier: tierOf(a) })).sort((x, y) => RANK[x.tier] - RANK[y.tier] || x.i - y.i);

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

// ---------------------------------------------------------------- page copy
const UI = extractConst(i18n, "UI_STRINGS");
const ENERGY = {   // three-word "overall energy" of each day animal (presentation copy only)
  en: { Rat: ["Quick", "Resourceful", "Social"], Ox: ["Steady", "Practical", "Focused"], Tiger: ["Bold", "Energetic", "Decisive"], Rabbit: ["Gentle", "Calm", "Diplomatic"], Dragon: ["Confident", "Ambitious", "Radiant"], Snake: ["Wise", "Intuitive", "Composed"], Horse: ["Free", "Lively", "Adventurous"], Goat: ["Gentle", "Creative", "Caring"], Monkey: ["Playful", "Clever", "Adaptable"], Rooster: ["Precise", "Organized", "Proud"], Dog: ["Loyal", "Honest", "Protective"], Pig: ["Generous", "Warm", "Easygoing"] },
  km: { Rat: ["រហ័សរហួន", "ប៉ិនប្រសប់", "រួសរាយ"], Ox: ["ស្ថិរភាព", "ជាក់ស្តែង", "ផ្តោតអារម្មណ៍"], Tiger: ["ក្លាហាន", "សកម្ម", "ឆាប់សម្រេច"], Rabbit: ["ទន់ភ្លន់", "ស្ងប់ស្ងាត់", "ចេះសម្របសម្រួល"], Dragon: ["ទំនុកចិត្ត", "មហិច្ឆតា", "ភ្លឺស្វាង"], Snake: ["ឈ្លាសវៃ", "យល់ដឹងដោយវិចារណញាណ", "ស្ងប់ស្ងាត់"], Horse: ["សេរី", "រស់រវើក", "ចូលចិត្តផ្សងព្រេង"], Goat: ["ទន់ភ្លន់", "ច្នៃប្រឌិត", "យកចិត្តទុកដាក់"], Monkey: ["រីករាយ", "ឆ្លាត", "សម្របខ្លួនបាន"], Rooster: ["ច្បាស់លាស់", "មានរបៀប", "មានមោទនភាព"], Dog: ["ស្មោះស្ម័គ្រ", "ស្មោះត្រង់", "ការពារ"], Pig: ["ចិត្តទូលាយ", "កក់ក្តៅ", "ងាយស្រួល"] },
};
const andJoin = (arr, lang) => arr.length < 2 ? arr.join("") : lang === "km" ? arr.slice(0, -1).join(" ") + " និង " + arr[arr.length - 1] : arr.slice(0, -1).join(", ") + " & " + arr[arr.length - 1];
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
    sub: "ស្វែងរកអ្វីដែលថ្ងៃនេះនាំមកសម្រាប់សត្វនិមិត្តសញ្ញាទាំង១២។",
    dayWord: (n) => `ថ្ងៃនេះ ជាថ្ងៃរបស់ឆ្នាំ${n}`, favors: (l) => `ថ្ងៃនេះថាមពលសមស្របបំផុតជាមួយ <strong>${l}</strong>`,
    care: (n) => `<strong>${n}</strong> — ត្រូវការការប្រុងប្រយ័ត្នបន្ថែមបន្តិចថ្ងៃនេះ`,
    langAria: "ភាសា",
    energyTitle: "ថាមពលនិមិត្តសញ្ញាថ្ងៃនេះ", best: "ទទួលបានការគាំទ្របំផុត", extra: "ត្រូវការការប្រុងប្រយ័ត្នបន្ថែម", overall: "ថាមពលរួម",
    fine: "ផ្អែកលើការបកស្រាយតាមប្រពៃណី។ សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ។",
    sotd: "🌟 សត្វនិមិត្តសញ្ញាប្រចាំថ្ងៃ", sotdLead: (n) => `ថ្ងៃនេះគាំទ្រ${n}ជាពិសេស។`,
    goodFor: "ល្អសម្រាប់", watchOut: "គួរប្រុងប្រយ័ត្ន", goodForUp: "ល្អសម្រាប់", watchUp: "គួរប្រុងប្រយ័ត្ន",
    learn: (n) => `ស្វែងយល់បន្ថែមអំពី${n} →`, view: (n) => `មើលព័ត៌មាន${n} →`,
    gridH: "ជោគជតារាសីប្រចាំថ្ងៃសម្រាប់សត្វនិមិត្តសញ្ញាទាំង១២", gridP: "រកសញ្ញារបស់អ្នក ហើយមើលថាថ្ងៃនេះនាំអ្វីមក។",
    guideH: "ការណែនាំថ្ងៃនេះ", guideP: "ថាមពលនិមិត្តសញ្ញាថ្ងៃនេះអាចមើលតាមផ្នែកផ្សេងៗនៃជីវិត។ នេះគ្រាន់តែជាចំណុចសម្រាប់ឆ្លុះបញ្ចាំង មិនមែនជាការទស្សន៍ទាយទេ។",
    guides: [
      ["❤️", "ស្នេហា", "សង្កេតមើលពីរបៀបដែលថាមពលថ្ងៃនេះប៉ះពាល់ដល់ការស្តាប់ និងការតភ្ជាប់ជាមួយមនុស្សជិតស្និទ្ធ។", "/compatibility", "ពិនិត្យភាពជាគូ →"],
      ["💼", "ការងារ", "ពេលល្អក្នុងការពិនិត្យអាទិភាពរបស់អ្នក ហើយមើលថាកន្លែងណាសមនឹងការខិតខំប្រឹងប្រែងជាប់លាប់។", "/business-partner", "ពិនិត្យដៃគូអាជីវកម្ម →"],
      ["💰", "ហិរញ្ញវត្ថុ", "គិតអំពីការចំណាយ និងការសន្សំដោយចិត្តស្ងប់។ នេះជាការឆ្លុះបញ្ចាំង មិនមែនជាដំបូន្មានហិរញ្ញវត្ថុទេ។", "../animals.html", "អានមគ្គុទ្ទេសក៍ →"],
      ["🤝", "ទំនាក់ទំនង", "គ្រួសារ មិត្តភក្តិ និងមិត្តរួមការងារ — សង្កេតមើលអ្នកដែលអ្នកអាចពឹងពាក់បាន និងអ្នកដែលត្រូវការការអត់ធ្មត់ពីអ្នក។", "/checker", "រកសញ្ញារបស់អ្នក →"],
    ],
    ctaH: "មិនទាន់ដឹងសត្វនិមិត្តសញ្ញារបស់អ្នកទេឬ?", ctaP: "បញ្ចូលថ្ងៃកំណើតរបស់អ្នក ហើយស្វែងរកសត្វនិមិត្តសញ្ញា ធាតុ លេខសំណាង និងច្រើនទៀត។", ctaB: "✨ រកសត្វនិមិត្តសញ្ញារបស់ខ្ញុំ",
    allH: "ស្វែងយល់សត្វនិមិត្តសញ្ញាទាំង១២", allP: "ចុចលើសត្វមួយ ដើម្បីអានមគ្គុទ្ទេសក៍ពេញលេញ។",
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
      ["📚", "មគ្គុទ្ទេសក៍សត្វនិមិត្តសញ្ញា", "អានអំពីសត្វទាំង១២។", "../animals.html"],
    ],
  },
};
function faqs(lang, dateTxt) {
  const A = dayAnimal, nm = (a) => (lang === "km" ? KM_NAMES[a] : a);
  const others = bestList.filter((a) => a !== A);
  if (lang === "km") return [
    ["តើសត្វនិមិត្តសញ្ញាប្រចាំថ្ងៃនេះជាអ្វី?", `ថ្ងៃនេះ ${dateTxt} ជាថ្ងៃ${nm(A)} ក្នុងវដ្តថ្ងៃ១២ តាមប្រពៃណី។`],
    ["តើសញ្ញាណាខ្លះសមស្របបំផុតជាមួយថាមពលថ្ងៃនេះ?", `${nm(A)} ជាសញ្ញាប្រចាំថ្ងៃ ហើយ ${andJoin(others.map(nm), "km")} ស្ថិតក្នុងក្រុមមិត្តភក្តិតែមួយ ដូច្នេះតាមប្រពៃណីទទួលបានការគាំទ្រល្អបំផុតថ្ងៃនេះ។`],
    ["តើសញ្ញាណាគួរប្រុងប្រយ័ត្នជាងគេថ្ងៃនេះ?", `${andJoin(cautionList.map(nm), "km")} ជាសញ្ញាដែលនៅទល់មុខ${nm(A)}ក្នុងវដ្ត ដូច្នេះតាមប្រពៃណីត្រូវការការប្រុងប្រយ័ត្នបន្ថែមបន្តិច។`],
    ["តើជោគជតារាសីប្រចាំថ្ងៃគណនាដោយរបៀបណា?", "រាល់ថ្ងៃក្នុងប្រតិទិនត្រូវបានកំណត់ជាសត្វមួយក្នុងចំណោមសត្វទាំង១២ តាមវដ្តដែលវិលជុំ ដោយរាប់ពីកាលបរិច្ឆេទយោងថេរមួយ។ បន្ទាប់មកសញ្ញានីមួយៗត្រូវបានប្រៀបធៀបនឹងសត្វប្រចាំថ្ងៃ៖ សត្វដូចគ្នាគឺថ្ងៃល្អខ្លាំង សញ្ញាក្នុងក្រុមមិត្តភក្តិតែមួយគឺថ្ងៃល្អ សញ្ញាដែលនៅទល់មុខគឺថ្ងៃគួរប្រុងប្រយ័ត្ន ហើយសញ្ញាផ្សេងទៀតគឺថ្ងៃធម្មតា។"],
    ["តើថ្ងៃកំណើតរបស់ខ្ញុំប៉ះពាល់ដល់សត្វនិមិត្តសញ្ញារបស់ខ្ញុំទេ?", "បាទ/ចាស។ សត្វរបស់អ្នកអនុវត្តតាមឆ្នាំតាមច័ន្ទគតិ ដែលចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចិន (ប្រហែលចន្លោះថ្ងៃទី២១ មករា ដល់ថ្ងៃទី២០ កុម្ភៈ) មិនមែនថ្ងៃទី១ មករាទេ។ ប្រសិនបើអ្នកកើតនៅខែមករា ឬដើមខែកុម្ភៈ សូមប្រើឧបករណ៍ពិនិត្យដើម្បីប្រាកដ។"],
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
const firstSentence = (s, lang) => { const m = s.trim().match(lang === "km" ? /^[^។]+។?/ : /^[^.]+\.?/); return m ? m[0].trim() : s.trim(); };
const CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v11.5A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5ZM3.5 10h17M8 3.5v4M16 3.5v4"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#3fae6b"/><path d="m7.5 12.3 3.2 3.2 5.8-6.4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const WARN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#e0566b"/><path d="M12 7v6M12 16.5v.1" stroke="#fff" stroke-width="2.3" stroke-linecap="round"/></svg>';

function signCard(c, lang, t) {
  const { a, i, tier } = c, isKm = lang === "km", name = isKm ? KM_NAMES[a] : a;
  const weak = (isKm ? KM_INFO[a].weaknesses : INFO[a].weaknesses).trim();
  return `<li class="fx-sign fx-sign-${tier}">
        <div class="fx-sign-head">
          ${med(a, 76)}
          <h3>${esc(name)}</h3>
          <span class="fx-tier fx-tier-${tier}">${I[tier]}${esc(TIER_LABEL[lang][tier])}</span>
        </div>
        <h4>${t.goodFor}</h4>
        <p>${esc(pick(GOOD_FOR[lang][tier], i))}</p>
        <h4>${t.watchOut}</h4>
        <p>${esc(weak)} ${esc(pick(AVOID_NOTE[lang][tier], i + 1))}</p>
        <a class="fx-more" href="${guideHref(a)}">${esc(t.view(name))}</a>
      </li>`;
}

function body(lang) {
  const isKm = lang === "km", t = T[lang], nm = (a) => (isKm ? KM_NAMES[a] : a);
  const A = dayAnimal, dateTxt = isKm ? dateKM : dateEN;
  const favorsList = andJoin(bestList.map(nm), lang), careList = andJoin(cautionList.map(nm), lang);
  const energy = ENERGY[lang][A].join(" • ");
  const KM_TRAIT_LINE = { Ox: "ទុកចិត្តបាន ស្មោះត្រង់ និងឧស្សាហ៍ព្យាយាម។" };   // wording supplied by the site owner
  const traitLine = isKm && KM_TRAIT_LINE[A] ? KM_TRAIT_LINE[A] : firstSentence(isKm ? KM_INFO[A].traits : INFO[A].traits, lang);
  // Sign of the day (always the day animal = "great"): three good-for lines from the existing bank, starting at the one its card shows.
  const gbank = GOOD_FOR[lang].great, aIdx = ORDER.indexOf(A);
  const goodBullets = [0, 1, 2].map((k) => gbank[((dayNumber + aIdx) % gbank.length + k) % gbank.length]);
  const weakA = (isKm ? KM_INFO[A].weaknesses : INFO[A].weaknesses).trim();
  const watchBullets = [weakA, pick(AVOID_NOTE[lang].great, aIdx + 1)];
  const faqItems = faqs(lang, dateTxt);
  const introP = isKm ? introKM : introEN;
  const wd = isKm ? KM_DAYS[weekday] : weekday;
  const byZodiac = ORDER.map((a, i) => ({ a, i, tier: tierOf(a) }));

  return `<div class="fx-body">
<section class="fx-hero fx-hero--${A.toLowerCase()}" aria-labelledby="fx-h1-${lang}">
  <div class="fx-hero-in">
    <h1 id="fx-h1-${lang}">${t.h1a ? `<small>${t.h1a.trim()}</small>` : ""}<span>${t.h1b}</span></h1>
    <p class="fx-sub">${t.sub}</p>
    <p class="fx-date">${CAL}<time datetime="${iso}">${esc(dateTxt)}</time><span class="fx-wd">${esc(wd)}</span></p>
    <p class="fx-pill"><span aria-hidden="true">${EMOJI[A]}</span> ${esc(t.dayWord(nm(A)))}</p>
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
        <div class="fx-feature-art"><img src="../images/zodiac/${slugOf(A)}.webp" width="360" height="542" alt="${esc(isKm ? nm(A) : A + " zodiac animal")}" loading="lazy" decoding="async"></div>
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
    <ul class="fx-grid">
${byZodiac.map((c) => "      " + signCard(c, lang, t)).join("\n")}
    </ul>
  </section>

  <div class="ad-slot">${isKm ? "ទំនេរសម្រាប់ផ្សាយពាណិជ្ជកម្ម" : "Ad space"}</div>

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
    ${introP}
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
  const desc = "Discover today's Chinese zodiac fortune for all 12 zodiac animals, including the best signs for the day, signs needing extra care, and traditional daily guidance.";
  const ogImage = "https://mybirthsign.com/images/fortune/hero-night.webp";
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
    .replace("{{BODY_KM}}", () => body("km"));
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
