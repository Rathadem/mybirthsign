#!/usr/bin/env node
/**
 * Generates a premium "Year of the <Animal>" profile page (English + Khmer) at blog/zodiac-year-<animal>.html.
 *
 *   node scripts/animal-profile.mjs Tiger
 *
 * Data comes only from the site's own files: js/zodiac-data.js (traits, lucky info, compatibility, elements and the
 * year/element formula) and js/i18n.js (Khmer names and text). The existing article text is read from
 * scripts/profile-content/<animal>.json (extracted from the old page, so nothing is lost). Page-specific wording that
 * the old page did not have (bullets, FAQ, UI labels) lives in the COPY table below; only animals with an entry can be built.
 * No zodiac calculation is invented here: birth years use (year - 4) % 12, elements use the same stem formula as getZodiac().
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const A = (process.argv[2] || "").replace(/^\w/, (c) => c.toUpperCase());

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
const ORDER = extractConst(zdata, "ZODIAC_ANIMALS");
const INFO = extractConst(zdata, "ANIMAL_INFO");
const TRIANGLES = extractConst(zdata, "ZODIAC_TRIANGLES");
const KM_NAMES = extractConst(i18n, "KM_ANIMAL_NAMES");
const KM_INFO = extractConst(i18n, "KM_ANIMAL_INFO");
const KM_DAYS = extractConst(i18n, "KM_DAY_NAMES");
const KM_COLORS = extractConst(i18n, "KM_COLOR_NAMES");
const KM_ELEM = extractConst(i18n, "KM_ELEMENT_NAMES");
const ELEMENTS = extractConst(zdata, "ELEMENTS");
const EMOJI = extractConst(zdata, "ZODIAC_EMOJI");
const COLOR_HEX = extractConst(zdata, "LUCKY_COLOR_HEX");

if (!ORDER.includes(A)) { console.error("Usage: node scripts/animal-profile.mjs <Animal>  (one of " + ORDER.join(", ") + ")"); process.exit(1); }
const slug = A.toLowerCase();
const idx = ORDER.indexOf(A);
const info = INFO[A], km = KM_INFO[A];
const content = JSON.parse(read(`scripts/profile-content/${slug}.json`));
const HAN = { Rat: "鼠", Ox: "牛", Tiger: "虎", Rabbit: "兔", Dragon: "龍", Snake: "蛇", Horse: "馬", Goat: "羊", Monkey: "猴", Rooster: "雞", Dog: "狗", Pig: "豬" };

// ---------------------------------------------------------------- derived data (existing formulas only)
const yearsOf = (n, from = 1960) => { const out = []; for (let y = from; out.length < n; y++) if (((y - 4) % 12 + 12) % 12 === idx) out.push(y); return out; };
const years = yearsOf(7, 1960);              // e.g. 1962 ... 2034 (same span the old page listed)
const elementOf = (y) => ELEMENTS[Math.floor((((y - 4) % 10) + 10) % 10 / 2)];
const elementYears = Object.fromEntries(ELEMENTS.map((e) => [e, years.filter((y) => elementOf(y) === e)]));
const sameTri = (a, b) => TRIANGLES.some((t) => t.includes(a) && t.includes(b));
const typeOf = (b) => (b === A ? "same" : info.clash.includes(b) ? "clash" : sameTri(A, b) ? "triangle" : info.compatible.includes(b) ? "support" : "neutral");
const best = ORDER.filter((b) => b !== A && sameTri(A, b));
const support = info.compatible.filter((b) => !sameTri(A, b));
const clash = info.clash;
const latestDaily = fs.readdirSync(path.join(ROOT, "blog")).filter((f) => /^daily-fortune-\d{4}-\d{2}-\d{2}\.html$/.test(f)).sort().pop();

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const URL_ = `https://mybirthsign.com/blog/zodiac-year-${slug}`;
const medal = (a, s, cls = "") => `<img class="pf-medal ${cls}" src="../images/profile/medal-${a.toLowerCase()}.webp" width="${s}" height="${s}" alt="" loading="lazy" decoding="async">`;
const link = (a) => `../blog/zodiac-year-${a.toLowerCase()}.html`;

// ---------------------------------------------------------------- icons (inline, currentColor)
const ic = (d, extra = "") => `<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}><path fill="currentColor" d="${d}"/></svg>`;
const sk = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const ICON = {
  home: sk("M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10M10 19.5v-5h4v5"),
  user: sk("M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5"),
  leaf: sk("M5 19c0-8 5-13 14-14 0 9-5 14-13 14ZM5 19c2-4 5-7 9-9"),
  clover: sk("M12 12c-2.5-1-4.5-3-4.5-5a2.5 2.5 0 0 1 4.5-1.4A2.5 2.5 0 0 1 16.5 7c0 2-2 4-4.5 5Zm0 0c2.5 1 4.5 3 4.5 5a2.5 2.5 0 0 1-4.5 1.4A2.5 2.5 0 0 1 7.5 17c0-2 2-4 4.5-5ZM12 12v9"),
  heart: sk("M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z"),
  brief: sk("M4 8h16v11H4zM9 8V5.5h6V8M4 13h16"),
  coins: sk("M5 7c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 8.4 5 7ZM5 7v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7M5 12v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5"),
  health: sk("M12 5v14M5 12h14"),
  trophy: sk("M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5v1.5A3 3 0 0 0 8 10.5M16 6h3v1.5a3 3 0 0 1-3 3M12 13v4M8.5 20h7"),
  warn: sk("M12 3.8 21 19.5H3L12 3.8ZM12 10v4.2M12 16.8v.2"),
  cal: sk("M4 6.5h16V20H4zM4 10.5h16M8.5 4v4M15.5 4v4"),
  shield: sk("M12 3.5 19 6v5.5c0 4.3-2.8 7.3-7 9-4.2-1.7-7-4.7-7-9V6l7-2.5Z"),
  star: sk("m12 3.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 20l1.1-6L3.4 9.8l6-.8L12 3.5Z"),
  peak: sk("M3 19 9.5 8l4 6 2.5-3.5L21 19H3Z"),
  bolt: sk("M13 2.8 5 13.5h6l-1 7.7 8-10.7h-6l1-7.7Z"),
  compass: sk("M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM15.5 8.5l-2 5-5 2 2-5 5-2Z"),
  spark: sk("M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9L12 3Z"),
  crown: ic("M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z"),
  check: sk("m5 12.5 4.2 4.2L19 7"),
  gem: sk("M7 4h10l4 5-9 11L3 9l4-5ZM3 9h18M10 4 8 9l4 11 4-11-2-5"),
  orn: '<svg class="fx-orn" viewBox="0 0 150 14" aria-hidden="true"><path d="M2 7h56M92 7h56" stroke="#e7c27a" stroke-width="1" opacity=".8"/><path d="M75 1l5 6-5 6-5-6 5-6Z" fill="none" stroke="#f6dc9b" stroke-width="1.2"/><circle cx="62" cy="7" r="2" fill="#e7c27a"/><circle cx="88" cy="7" r="2" fill="#e7c27a"/></svg>',
};

// ---------------------------------------------------------------- copy (page wording the old page did not have)
const COPY = {
  Tiger: {
    en: {
      eyebrow: "CHINESE ZODIAC", h1: "Year of the Tiger",
      intro: "People born in the Year of the Tiger are traditionally associated with courage, confidence, independence, and determination.",
      ovText: "The Tiger is the third animal in the Chinese zodiac and is traditionally associated with courage, confidence, independence, and strong determination.",
      traits: [["shield", "Brave"], ["star", "Confident"], ["peak", "Ambitious"], ["bolt", "Energetic"], ["compass", "Independent"], ["spark", "Charismatic"]],
      cards: {
        strengths: ["Brave and decisive", "Confident and independent", "Energetic and driven", "Natural leadership", "Strong sense of justice"],
        challenges: ["Impulsive at times", "Can be impatient with slower-moving people", "May take unnecessary risks", "Strong emotions", "Difficulty accepting limitations"],
        love: ["Passionate and loyal", "Protective of loved ones", "Values honesty", "Values independence", "Appreciates strong partners"],
        career: ["Leadership roles", "Entrepreneurship", "Independent work", "Thrives in challenging environments", "Takes initiative"],
        money: ["Ambitious about goals", "Notices opportunities", "Comfortable with risk-taking", "Benefits from long-term planning", "Needs financial discipline"],
        health: ["Traditional interpretations often associate the Tiger with energetic activity.", "Balance activity with rest.", "Healthy routines can support overall well-being."],
      },
      moneyNote: "Traditional zodiac interpretation only — not financial advice.",
      healthNote: "General lifestyle interpretation only — not medical advice.",
      spiritText: "The Tiger traditionally represents courage, strength, confidence, and determination.",
    },
    km: {
      eyebrow: "ជោគជតារាសី", h1: "ឆ្នាំខាល (ខ្លា)",
      intro: "អ្នកដែលកើតក្នុងឆ្នាំខាល តាមប្រពៃណីរាសីចិន ត្រូវបានផ្សារភ្ជាប់ជាមួយនឹងភាពក្លាហាន ទំនុកចិត្ត និងភាពឯករាជ្យ។",
      ovText: "ខាលជាសត្វទី៣ក្នុងរង្វង់រាសី ហើយតាមប្រពៃណីត្រូវបានផ្សារភ្ជាប់ជាមួយភាពក្លាហាន ទំនុកចិត្ត ឯករាជ្យភាព និងការតាំងចិត្តខ្ពស់។",
      traits: [["shield", "ក្លាហាន"], ["star", "ជឿជាក់លើខ្លួន"], ["peak", "មហិច្ឆតាខ្ពស់"], ["bolt", "សកម្ម"], ["compass", "ឯករាជ្យ"], ["spark", "ទាក់ទាញ"]],
      cards: {
        strengths: ["ក្លាហាន និងចេះសម្រេចចិត្ត", "ជឿជាក់លើខ្លួនឯង និងឯករាជ្យ", "សកម្ម និងមានស្មារតីខ្ពស់", "ជាអ្នកដឹកនាំតាមធម្មជាតិ", "មានអារម្មណ៍ខ្លាំងចំពោះយុត្តិធម៌"],
        challenges: ["ជួនកាលប្រញាប់ប្រញាល់", "អាចអត់ធ្មត់មិនបានចំពោះអ្នកធ្វើការយឺត", "អាចប្រថុយប្រថានដោយមិនចាំបាច់", "មានអារម្មណ៍ខ្លាំង", "ពិបាកទទួលយកដែនកំណត់"],
        love: ["ចំណង់ចំណូលចិត្តខ្លាំង និងស្មោះត្រង់", "ការពារអ្នកដែលខ្លួនស្រឡាញ់", "ឲ្យតម្លៃភាពស្មោះត្រង់", "ឲ្យតម្លៃឯករាជ្យភាព", "ពេញចិត្តដៃគូដែលរឹងមាំ"],
        career: ["តួនាទីជាអ្នកដឹកនាំ", "ការបង្កើតអាជីវកម្ម", "ការធ្វើការដោយឯករាជ្យ", "ចូលចិត្តបរិយាកាសប្រកួតប្រជែង", "ចេះចាប់ផ្តើមដោយខ្លួនឯង"],
        money: ["មហិច្ឆតាខ្ពស់ចំពោះគោលដៅ", "មើលឃើញឱកាស", "ហ៊ានប្រថុយប្រថាន", "ផែនការរយៈពេលវែងជួយបាន", "ត្រូវការវិន័យផ្នែកហិរញ្ញវត្ថុ"],
        health: ["តាមប្រពៃណី ខាលតែងត្រូវបានផ្សារភ្ជាប់ជាមួយសកម្មភាពពោរពេញដោយថាមពល។", "ធ្វើឱ្យមានតុល្យភាពរវាងសកម្មភាព និងការសម្រាក។", "ទម្លាប់ល្អអាចជួយដល់សុខុមាលភាពទូទៅ។"],
      },
      moneyNote: "ការបកស្រាយតាមប្រពៃណីរាសីប៉ុណ្ណោះ — មិនមែនជាដំបូន្មានហិរញ្ញវត្ថុទេ។",
      healthNote: "ការបកស្រាយទូទៅប៉ុណ្ណោះ — មិនមែនជាដំបូន្មានវេជ្ជសាស្ត្រទេ។",
      spiritText: "តាមប្រពៃណី ខាលតំណាងឱ្យភាពក្លាហាន កម្លាំង ទំនុកចិត្ត និងការតាំងចិត្ត។",
    },
  },
};
if (!COPY[A]) { console.error(`No page copy for ${A} yet (add it to COPY in scripts/animal-profile.mjs).`); process.exit(1); }

// ---------------------------------------------------------------- shared UI strings
const UI = {
  en: {
    nav: [["overview", "home", "Overview"], ["personality", "user", "Personality"], ["elements", "leaf", "Elements"], ["lucky", "clover", "Lucky Signs"], ["compat", "heart", "Compatibility"], ["career", "brief", "Career"], ["love", "heart", "Love"], ["health", "health", "Health"]],
    navLabel: (n) => `${n} sections`,
    btnCheck: (n) => `Check if You're a ${n} →`, btnCompat: "Check Compatibility →",
    ovH: (n) => `${n} Overview`, traitsH: "Key Traits", yearsH: (n) => `Zodiac Years for ${n}`,
    yearsNote: "If you were born in January or February, check the Lunar New Year date to confirm your zodiac sign.", yearsBtn: "Check My Birth Year →",
    luckyH: (n) => `Lucky Signs for ${n}`, colors: "Lucky Colors", numbers: "Lucky Numbers", days: "Lucky Days",
    elH: (n) => `Zodiac Elements for ${n}`, elNote: "The five elements add another layer to the traditional zodiac system. Your element depends on your birth year.", elBtn: "Explore the Five Elements →", elName: (e, n) => `${e} ${n}`,
    elN: { Wood: "Wood", Fire: "Fire", Earth: "Earth", Metal: "Metal", Water: "Water" },
    compH: "Best Compatibility", bestL: "Best Matches", supL: "Supportive Matches", chalL: "Challenging Matches", compBtn: "View Full Compatibility Guide →",
    persH: (n) => `${n} Personality in Detail`,
    cardT: { strengths: "Strengths", challenges: "Challenges", love: "Love & Relationships", career: "Career & Work", money: "Money & Wealth", health: "Health" },
    spiritH: (n) => `The Spirit of the ${n}`,
    deepH: (n) => `Understanding the ${n}`, deepSub: "Everything the MyBirthSign guide says about this sign, in full.",
    careersLead: "Careers that often fit well", loveCta: "Check Love Compatibility →",
    gridH: "Chinese Zodiac Compatibility", gridP: (n) => `See how the ${n} traditionally matches each of the 12 animals.`,
    cat: { same: "Your sign", triangle: "Good", support: "Supportive", neutral: "Neutral", clash: "Challenging" },
    moreH: (n) => `More About the ${n}`,
    todayH: (n) => `Today's Fortune for ${n}`, todayLink: "See the full daily fortune for all 12 signs →",
    todayTier: { great: "Great Day", good: "Good Day", ordinary: "Ordinary Day", caution: "Take It Easy" },
    todayLine: (d, t) => `Today is a ${d} day — for you it is a ${t}.`,
    ctaH: (n) => `Are You a ${n}?`, ctaP: "Enter your birthday to discover your Chinese zodiac animal, element, lucky signs, and more.", ctaB: "🔮 Check My Zodiac Sign →",
    faqH: "Frequently Asked Questions", toolsH: "Explore MyBirthSign",
    tools: [["🔮", "Chinese Zodiac Checker", "Find your animal and element", "/checker"], ["💗", "Compatibility Calculator", "Check love, friendship and more", "/compatibility"], ["💍", "Wedding Date Picker", "Find auspicious dates", "/wedding-date"], ["💼", "Business Partner Compatibility", "See if you work well together", "/business-partner"], ["📚", "Chinese Zodiac Guide", "Learn about all 12 animals", "../animals.html"]],
    disc: "For entertainment purposes only. Chinese zodiac interpretations are traditional and cultural, not scientifically proven.",
    crumbs: ["Home", "Blog"], share: "Share",
  },
  km: {
    nav: [["overview", "home", "ទិដ្ឋភាពទូទៅ"], ["personality", "user", "បុគ្គលិកលក្ខណៈ"], ["elements", "leaf", "ធាតុ"], ["lucky", "clover", "សំណាង"], ["compat", "heart", "ភាពសមស្រប"], ["career", "brief", "អាជីព"], ["love", "heart", "ស្នេហា"], ["health", "health", "សុខភាព"]],
    navLabel: (n) => `ផ្នែកនៃ${n}`,
    btnCheck: () => `ពិនិត្យថាតើអ្នកជាឆ្នាំខាលឬទេ →`, btnCompat: "ពិនិត្យភាពសមស្រប →",
    ovH: () => "ទិដ្ឋភាពទូទៅនៃឆ្នាំខាល", traitsH: "លក្ខណៈសំខាន់ៗ", yearsH: () => "ឆ្នាំរាសីរបស់ខាល",
    yearsNote: "ប្រសិនបើអ្នកកើតក្នុងខែមករា ឬកុម្ភៈ សូមពិនិត្យថ្ងៃចូលឆ្នាំចន្ទគតិ ដើម្បីបញ្ជាក់ឆ្នាំរាសីរបស់អ្នក។", yearsBtn: "ពិនិត្យឆ្នាំកំណើតរបស់ខ្ញុំ →",
    luckyH: () => "សំណាងរបស់ខាល", colors: "ពណ៌សំណាង", numbers: "លេខសំណាង", days: "ថ្ងៃសំណាង",
    elH: () => "ធាតុរបស់ខាល", elNote: "ធាតុទាំងប្រាំបន្ថែមស្រទាប់មួយទៀតដល់ប្រព័ន្ធរាសីតាមប្រពៃណី។ ធាតុរបស់អ្នកអាស្រ័យលើឆ្នាំកំណើតរបស់អ្នក។", elBtn: "ស្វែងយល់ធាតុទាំងប្រាំ →", elName: (e) => `ខាល${e}`,
    elN: KM_ELEM,
    compH: "ភាពសមស្របល្អបំផុត", bestL: "ដៃគូល្អបំផុត", supL: "ដៃគូជួយគាំទ្រ", chalL: "ដៃគូប្រឈម", compBtn: "មើលមគ្គុទ្ទេសក៍ភាពសមស្របពេញលេញ →",
    persH: () => "បុគ្គលិកលក្ខណៈខាលលម្អិត",
    cardT: { strengths: "ចំណុចខ្លាំង", challenges: "បញ្ហាប្រឈម", love: "ស្នេហា និងទំនាក់ទំនង", career: "អាជីព និងការងារ", money: "លុយកាក់ និងទ្រព្យសម្បត្តិ", health: "សុខភាព" },
    spiritH: () => "វិញ្ញាណនៃខាល",
    deepH: () => "ស្វែងយល់ឱ្យកាន់តែជ្រៅអំពីខាល", deepSub: "ព័ត៌មានទាំងអស់ដែលមគ្គុទ្ទេសក៍ MyBirthSign មានអំពីឆ្នាំនេះ។",
    careersLead: "មុខរបរដែលសមស្រប", loveCta: "ពិនិត្យភាពសមស្របស្នេហា →",
    gridH: "ភាពសមស្របរាសីទាំង១២", gridP: () => "មើលថាតើខាលត្រូវគ្នាជាមួយសត្វទាំង១២យ៉ាងដូចម្តេចតាមប្រពៃណី។",
    cat: { same: "ឆ្នាំរបស់អ្នក", triangle: "ល្អ", support: "ជួយគាំទ្រ", neutral: "ធម្មតា", clash: "ប្រឈម" },
    moreH: () => "ព័ត៌មានបន្ថែមអំពីខាល",
    todayH: () => "សំណាងប្រចាំថ្ងៃរបស់ខាល", todayLink: "មើលសំណាងប្រចាំថ្ងៃសម្រាប់និមិត្តសញ្ញាទាំង១២ →",
    todayTier: { great: "ថ្ងៃល្អខ្លាំង", good: "ថ្ងៃល្អ", ordinary: "ថ្ងៃធម្មតា", caution: "ថ្ងៃគួរប្រយ័ត្ន" },
    todayLine: (d, t) => `ថ្ងៃនេះជាថ្ងៃរបស់ឆ្នាំ${d} — សម្រាប់ខាល វាជា${t}។`,
    ctaH: () => "តើអ្នកជាខាលឬទេ?", ctaP: "បញ្ចូលថ្ងៃកំណើតរបស់អ្នក ដើម្បីស្វែងរកសត្វនិមិត្តសញ្ញា ធាតុ និងសំណាងរបស់អ្នក។", ctaB: "🔮 ពិនិត្យនិមិត្តសញ្ញារបស់ខ្ញុំ →",
    faqH: "សំណួរដែលសួរញឹកញាប់", toolsH: "ស្វែងរកឧបករណ៍ MyBirthSign",
    tools: [["🔮", "ម៉ាស៊ីនពិនិត្យរាសី", "ស្វែងរកសត្វ និងធាតុរបស់អ្នក", "/checker"], ["💗", "គណនាភាពសមស្រប", "ពិនិត្យស្នេហា មិត្តភាព និងផ្សេងទៀត", "/compatibility"], ["💍", "ជ្រើសរើសថ្ងៃរៀបការ", "ស្វែងរកថ្ងៃមង្គល", "/wedding-date"], ["💼", "ភាពសមស្របដៃគូអាជីវកម្ម", "មើលថាតើអ្នកធ្វើការជាមួយគ្នាបានល្អទេ", "/business-partner"], ["📚", "មគ្គុទ្ទេសក៍រាសី", "ស្វែងយល់អំពីសត្វទាំង១២", "../animals.html"]],
    disc: "សម្រាប់តែការកម្សាន្តប៉ុណ្ណោះ។ ការបកស្រាយរាសីជាប្រពៃណី និងវប្បធម៌ មិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ។",
    crumbs: ["ទំព័រដើម", "ប្លក់"], share: "ចែករំលែក",
  },
};

// ---------------------------------------------------------------- FAQ (answers use the data above)
function faqs(lang) {
  const n = lang === "km" ? KM_NAMES[A] : A;
  const nmL = (l) => l.map((x) => (lang === "km" ? KM_NAMES[x] : x));
  const colors = lang === "km" ? km.luckyColors : info.luckyColors.map((c) => c[0].toUpperCase() + c.slice(1));
  const elList = ELEMENTS.filter((e) => elementYears[e].length).map((e) => (lang === "km" ? `${KM_ELEM[e]}៖ ` : `${e}: `) + elementYears[e].join(", ")).join(lang === "km" ? " · " : " · ");
  if (lang === "km") return [
    [`តើឆ្នាំខាលគឺឆ្នាំអ្វីខ្លះ?`, `ឆ្នាំខាលរួមមាន ${years.join(", ")}។ រង្វង់រាសីដដែលៗរៀងរាល់ ១២ឆ្នាំម្តង ហើយឆ្នាំរាសីចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចន្ទគតិ មិនមែនថ្ងៃទី១ មករាទេ។`],
    [`តើបុគ្គលិកលក្ខណៈអ្វីខ្លះដែលផ្សារភ្ជាប់នឹងខាល?`, `តាមប្រពៃណី ខាលត្រូវបានផ្សារភ្ជាប់ជាមួយភាពក្លាហាន ទំនុកចិត្ត ឯករាជ្យភាព និងការតាំងចិត្ត។ ${km.traits}`],
    [`តើពណ៌សំណាងរបស់ខាលជាអ្វី?`, `ពណ៌សំណាងរបស់ខាលក្នុងមគ្គុទ្ទេសក៍របស់យើងគឺ ${colors.join(", ")}។`],
    [`តើលេខសំណាងរបស់ខាលជាអ្វី?`, `លេខសំណាងរបស់ខាលគឺ ${info.luckyNumbers.join(", ")}។`],
    [`តើសត្វណាខ្លះត្រូវគ្នាជាមួយខាល?`, `ត្រូវគ្នាបំផុតជាមួយ ${nmL(best).join(", ")} (ក្រុមតែមួយ)។ ${nmL(support).join(", ")} ក៏ត្រូវបានរាប់ជាដៃគូជួយគាំទ្រក្នុងមគ្គុទ្ទេសក៍របស់យើង។ ${nmL(clash).join(", ")} អាចមានភាពប្រឈមជាងគេ។`],
    [`តើខាលរបស់ខ្ញុំជាធាតុអ្វី?`, `ធាតុអាស្រ័យលើឆ្នាំកំណើតរបស់អ្នក — ${elList}។ ប្រើម៉ាស៊ីនពិនិត្យរាសីដើម្បីបញ្ជាក់ឆ្នាំរបស់អ្នក។`],
    [`តើឆ្នាំរាសីចាប់ផ្តើមថ្ងៃទី១ មករាឬទេ?`, `ទេ។ ឆ្នាំរាសីចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចន្ទគតិ ដែលធ្លាក់នៅចន្លោះចុងខែមករា និងពាក់កណ្តាលខែកុម្ភៈ។ ប្រសិនបើអ្នកកើតក្នុងខែទាំងពីរនេះ សូមពិនិត្យជាមួយម៉ាស៊ីនពិនិត្យរបស់យើង។`],
    [`តើបុគ្គលិកលក្ខណៈតាមរាសីត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រឬទេ?`, `មិនបានទេ។ ការបកស្រាយរាសីជាប្រពៃណី និងវប្បធម៌ ហើយមិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ។ សូមប្រើវាសម្រាប់ការកម្សាន្ត និងការស្វែងយល់ប៉ុណ្ណោះ។`],
  ];
  return [
    [`What years are the Year of the ${n}?`, `${n} years include ${years.join(", ")}. The zodiac repeats every 12 years, and the zodiac year begins at Lunar New Year, not on January 1.`],
    [`What personality traits are associated with the ${n}?`, `Traditionally, the ${n} is associated with courage, confidence, independence, and determination. ${info.traits}`],
    [`What are the lucky colors for the ${n}?`, `The ${n}'s lucky colors in our guide are ${colors.join(", ")}.`],
    [`What are the lucky numbers for the ${n}?`, `The ${n}'s lucky numbers are ${info.luckyNumbers.join(", ")}.`],
    [`Which zodiac animals are compatible with the ${n}?`, `Best matches are ${nmL(best).join(" and ")}, which share the ${n}'s compatibility triangle. ${nmL(support).join(", ")} ${support.length > 1 ? "are" : "is"} also listed as a supportive match in our guide, while ${nmL(clash).join(", ")} can be the most challenging pairing.`],
    [`What element is my ${n} year?`, `It depends on your birth year — ${elList}. Use the Zodiac Checker to confirm yours.`],
    [`Does the Chinese zodiac year start on January 1?`, `No. The zodiac year begins at Lunar New Year, which falls between late January and mid-February. If you were born in January or February, check the Lunar New Year date or use our Zodiac Checker.`],
    [`Is Chinese zodiac personality scientifically proven?`, `No. Chinese zodiac interpretations are traditional and cultural, and they are not scientifically proven. Enjoy them for fun and self-reflection.`],
  ];
}

// ---------------------------------------------------------------- body
const CHK = "/checker";
function body(lang) {
  const u = UI[lang], c = COPY[A][lang], isKm = lang === "km";
  const n = isKm ? KM_NAMES[A] : A;
  const ct = content[lang];
  const colors = isKm ? km.luckyColors : info.luckyColors.map((x) => x[0].toUpperCase() + x.slice(1));
  const days = isKm ? km.luckyDays : info.luckyDays;
  const nmL = (l) => l.map((x) => (isKm ? KM_NAMES[x] : x));
  const yrs = years.join(" • ");
  const bullets = (arr) => `<ul class="pf-bullets">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const card = (key, icon, id) => `<article class="pf-card fx-gframe" ${id ? `id="${id}"` : ""}>
        <h3>${ICON[icon]}<span>${esc(u.cardT[key])}</span></h3>
        ${bullets(c.cards[key])}
        ${key === "money" ? `<p class="pf-note">${esc(c.moneyNote)}</p>` : ""}${key === "health" ? `<p class="pf-note">${esc(c.healthNote)}</p>` : ""}
      </article>`;
  const compRow = (label, list, cls) => `<div class="pf-pairs ${cls}"><h4>${esc(label)}</h4><ul>${list.map((b) => `<li><a href="${link(b)}">${medal(b, 54)}<span>${esc(isKm ? KM_NAMES[b] : b)}</span></a></li>`).join("")}</ul></div>`;
  const sec = (h2, ps) => ps.map((p) => `<p>${p}</p>`).join("");
  const secBy = (i) => ct.sections[i][1];

  // article text pulled from the old page (all of it is kept)
  const [persP, relP, workP, watchP, , compP, careerP] = [secBy(0), secBy(1), secBy(2), secBy(3), secBy(4), secBy(5), secBy(6)];
  const todayData = `data-today data-animal="${A}" data-lang="${lang}"`;

  return `<div class="pf-body">
<section class="fx-hero fx-hero--${slug} pf-hero" aria-labelledby="pf-h1-${lang}">
  <div class="pf-hero-in">
    <p class="fx-eyebrow">${esc(c.eyebrow)}</p>
    <h1 id="pf-h1-${lang}"><strong>${esc(c.h1)}</strong> <span class="pf-han" lang="zh-Hant" aria-hidden="true">${HAN[A]}</span></h1>
    <p class="pf-years">${yrs}</p>
    <p class="fx-sub">${esc(c.intro)}</p>
    <div class="pf-cta-row"><a class="fx-btn" href="${CHK}">${A === "Tiger" ? "🐯" : EMOJI[A]} ${esc(u.btnCheck(n))}</a><a class="fx-btn fx-btn-rose" href="/compatibility">💗 ${esc(u.btnCompat)}</a></div>
  </div>
</section>

<nav class="pf-nav" aria-label="${esc(u.navLabel(n))}"><ul>
${u.nav.map(([id, ico, label]) => `  <li><a href="#${id}">${ICON[ico]}<span>${esc(label)}</span></a></li>`).join("\n")}
</ul></nav>

<div class="fx-wrap">
  <div class="pf-trio pf-trio-first" id="overview">
    <section class="fx-gframe pf-ov" aria-labelledby="pf-ov-${lang}">
      <h2 id="pf-ov-${lang}">${ICON.crown}<span>${esc(u.ovH(n))}</span></h2>
      <div class="pf-ov-body">${medal(A, 120, "pf-medal-lg")}<div><p>${esc(c.ovText)}</p><p>${esc(isKm ? km.traits : info.traits)}</p></div></div>
    </section>
    <section class="fx-gframe pf-traits" aria-labelledby="pf-tr-${lang}">
      <h2 id="pf-tr-${lang}">${ICON.spark}<span>${esc(u.traitsH)}</span></h2>
      <ul class="pf-trait-grid">${c.traits.map(([i, l]) => `<li><span class="pf-ring">${ICON[i]}</span>${esc(l)}</li>`).join("")}</ul>
    </section>
    <section class="fx-gframe pf-years-card" aria-labelledby="pf-yr-${lang}">
      <h2 id="pf-yr-${lang}">${ICON.cal}<span>${esc(u.yearsH(n))}</span></h2>
      <ul class="pf-year-grid">${years.map((y) => `<li>${y}</li>`).join("")}</ul>
      <p class="pf-small">${esc(u.yearsNote)}</p>
      <a class="fx-btn fx-btn-sm" href="${CHK}">${esc(u.yearsBtn)}</a>
    </section>
  </div>

  <div class="pf-trio" id="lucky">
    <section class="fx-gframe pf-lucky" aria-labelledby="pf-lk-${lang}">
      <h2 id="pf-lk-${lang}">${ICON.clover}<span>${esc(u.luckyH(n))}</span></h2>
      <div class="pf-lg"><h3>${esc(u.colors)}</h3>
      <ul class="pf-dots">${info.luckyColors.map((k, i) => `<li><span class="pf-dot" style="background:${COLOR_HEX[k.toLowerCase()] || "#888"}"></span>${esc(colors[i])}</li>`).join("")}</ul></div>
      <div class="pf-lg"><h3>${esc(u.numbers)}</h3>
      <ul class="pf-nums">${info.luckyNumbers.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      <div class="pf-lg"><h3>${esc(u.days)}</h3>
      <p class="pf-daysline">${esc(days.join(", "))}</p></div>
    </section>
    <section class="fx-gframe pf-elements" id="elements" aria-labelledby="pf-el-${lang}">
      <h2 id="pf-el-${lang}">${ICON.leaf}<span>${esc(u.elH(n))}</span></h2>
      <ul class="pf-el-grid">
${ELEMENTS.map((e) => `        <li class="pf-el pf-el-${e.toLowerCase()}"><img src="../images/profile/el-${e.toLowerCase()}.webp" width="64" height="64" alt="" loading="lazy" decoding="async"><strong>${esc(u.elName(u.elN[e], n))}</strong><span>${elementYears[e].join(", ")}</span></li>`).join("\n")}
      </ul>
      <p class="pf-small pf-el-note">${esc(u.elNote)}</p>
      <a class="fx-btn fx-btn-sm" href="../blog/five-elements-explained.html">${esc(u.elBtn)}</a>
    </section>
    <section class="fx-gframe pf-compat" id="compat" aria-labelledby="pf-cp-${lang}">
      <h2 id="pf-cp-${lang}">${ICON.heart}<span>${esc(u.compH)}</span></h2>
      ${compRow(u.bestL, best, "pf-best")}<div class="pf-pairs-2">${support.length ? compRow(u.supL, support, "pf-sup") : ""}${compRow(u.chalL, clash, "pf-chal")}</div>
      <a class="fx-btn fx-btn-sm" href="/compatibility">${esc(u.compBtn)}</a>
    </section>
  </div>

  <section class="fx-sec" id="personality" aria-labelledby="pf-ps-${lang}">
    <div class="fx-head"><h2 id="pf-ps-${lang}">${esc(u.persH(n))}</h2>${ICON.orn}</div>
    <div class="pf-duo">
      <div class="pf-cards">
        ${card("strengths", "trophy")}
        ${card("challenges", "warn")}
        ${card("love", "heart", "love")}
        ${card("career", "brief", "career")}
        ${card("money", "coins", "money")}
        ${card("health", "health", "health")}
      </div>
      <aside class="pf-spirit" aria-labelledby="pf-sp-${lang}">
        <div class="fx-gframe pf-spirit-in">
          <h2 id="pf-sp-${lang}">${esc(u.spiritH(n))}</h2>
          <div class="pf-moon"><img src="../images/profile/spirit-${slug}.webp" width="520" height="462" alt="${isKm ? "រូបខាលមាសក្រោមព្រះច័ន្ទពេញបូណ៌មី" : "A golden Tiger in front of a glowing full moon"}" loading="lazy" decoding="async"></div>
          <p>${esc(c.spiritText)}</p>
        </div>
      </aside>
    </div>
  </section>

  <article class="fx-article fx-gframe pf-deep" aria-labelledby="pf-dp-${lang}">
    <h2 id="pf-dp-${lang}">${esc(u.deepH(n))}</h2>
    <p class="pf-lead">${ct.lead[1] || ""}</p>
    <h3>${ct.sections[0][0]}</h3>${sec("", persP)}
    <h3>${ct.sections[1][0]}</h3>${sec("", relP)}<p class="pf-inline-cta"><a class="fx-btn fx-btn-sm" href="/compatibility">${esc(u.loveCta)}</a></p>
    <h3>${ct.sections[2][0]}</h3>${sec("", workP)}
    <h3>${ct.sections[3][0]}</h3>${sec("", watchP)}
    <h3>${ct.sections[5][0]}</h3>${sec("", compP)}
    <h3>${ct.sections[6][0]}</h3>${sec("", careerP)}
    <p class="fx-disc">${esc(u.disc)}</p>
  </article>

  <div class="pf-duo pf-duo-grid">
    <section aria-labelledby="pf-gr-${lang}">
      <div class="fx-head pf-head-left"><h2 id="pf-gr-${lang}">${ICON.heart}<span>${esc(u.gridH)}</span></h2><p>${esc(u.gridP(n))}</p></div>
      <div class="fx-gframe pf-gridbox"><ul class="pf-grid12">
${ORDER.map((b) => { const t = typeOf(b); return `        <li class="pf-g pf-g-${t}${b === A ? " is-self" : ""}"><a href="${link(b)}">${medal(b, 56)}<strong>${esc(isKm ? KM_NAMES[b] : b)}</strong><span class="pf-cat">${esc(u.cat[t])}</span></a></li>`; }).join("\n")}
      </ul>
      <p class="pf-btnrow"><a class="fx-btn fx-btn-sm" href="/compatibility">${esc(u.compBtn)}</a></p></div>
    </section>
    <aside aria-labelledby="pf-mr-${lang}">
      <div class="fx-gframe pf-more">
        <h2 id="pf-mr-${lang}">${esc(u.moreH(n))}</h2>
        <ul>
          <li><a href="#love">${ICON.heart}<span>${isKm ? "ខាលក្នុងស្នេហា និងទំនាក់ទំនង" : `${n} in Love &amp; Relationships`}</span></a></li>
          <li><a href="#career">${ICON.brief}<span>${isKm ? "ខាលក្នុងអាជីព និងការងារ" : `${n} in Career &amp; Work`}</span></a></li>
          <li><a href="#money">${ICON.coins}<span>${isKm ? "ខាលក្នុងលុយកាក់ និងទ្រព្យសម្បត្តិ" : `${n} in Money &amp; Wealth`}</span></a></li>
          <li><a href="#elements">${ICON.leaf}<span>${isKm ? "ខាល និងធាតុផ្សេងៗ" : `${n} &amp; Different Elements`}</span></a></li>
          <li><a href="/compatibility">${ICON.heart}<span>${isKm ? "ភាពសមស្របរបស់ខាល" : `${n} Compatibility`}</span></a></li>
          <li><a href="../animals.html">${ICON.star}<span>${isKm ? "មគ្គុទ្ទេសក៍សត្វទាំង១២" : "All 12 Zodiac Animals"}</span></a></li>
          <li><a href="../blog.html">${ICON.spark}<span>${isKm ? "អត្ថបទផ្សេងទៀត" : "More from the Blog"}</span></a></li>
        </ul>
      </div>
    </aside>
  </div>

  <section class="fx-sec pf-today" aria-labelledby="pf-td-${lang}">
    <div class="fx-gframe pf-today-in" ${todayData}>
      <h2 id="pf-td-${lang}">${esc(u.todayH(n))}</h2>
      <p class="pf-today-line" data-today-line>${esc(u.todayLink)}</p>
      <p><a class="fx-btn fx-btn-sm" href="${latestDaily}">${esc(u.todayLink)}</a></p>
    </div>
  </section>

  <section class="fx-sec" aria-labelledby="pf-cta-${lang}">
    <div class="fx-cta pf-cta">
      <img class="fx-lotus fx-lotus-l" src="../images/wedding/lotus-pink.webp" width="190" height="96" alt="" loading="lazy">
      <img class="fx-lotus fx-lotus-r" src="../images/wedding/lotus-gold.webp" width="190" height="96" alt="" loading="lazy">
      ${medal(A, 96, "pf-cta-medal")}
      <h2 id="pf-cta-${lang}">${esc(u.ctaH(n))}</h2>
      <p>${esc(u.ctaP)}</p>
      <a class="fx-btn" href="${CHK}">${esc(u.ctaB)}</a>
    </div>
  </section>

  <section class="fx-sec pf-faqwrap" aria-labelledby="pf-fq-${lang}">
    <div class="fx-gframe fx-faqpanel">
      <h2 id="pf-fq-${lang}">${esc(u.faqH)}</h2>
      <div class="fx-faq">
${faqs(lang).map(([q, a]) => `        <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n")}
      </div>
    </div>
  </section>

  <section class="fx-sec" aria-labelledby="pf-tl-${lang}">
    <div class="fx-gframe fx-toolspanel pf-tools5">
      <h2 id="pf-tl-${lang}">${esc(u.toolsH)}</h2>
      <ul class="fx-tools">
${u.tools.map((x) => `        <li><a href="${x[3]}"><span class="fx-t-ico" aria-hidden="true">${x[0]}</span><strong>${esc(x[1])}</strong><small>${esc(x[2])}</small></a></li>`).join("\n")}
      </ul>
    </div>
  </section>
</div>
</div>`;
}

// ---------------------------------------------------------------- SEO
const TITLE = `Year of the ${A}: Personality, Years & Compatibility | MyBirthSign`;
const DESC = `Explore the Year of the ${A}, including ${A} birth years, personality traits, elements, lucky signs, love, career, and Chinese zodiac compatibility.`;
const OG = "https://mybirthsign.com/images/fortune/hero-" + slug + ".webp";
const today = new Date().toISOString().slice(0, 10);
const faqEn = faqs("en");
const jsonld = JSON.stringify([
  { "@context": "https://schema.org", "@type": "Article", headline: `Year of the ${A}: Personality, Years & Compatibility`, description: DESC, image: OG, mainEntityOfPage: URL_, url: URL_,
    author: { "@type": "Organization", name: "MyBirthSign" }, publisher: { "@type": "Organization", name: "MyBirthSign", url: "https://mybirthsign.com/" }, dateModified: today, inLanguage: ["en", "km"] },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mybirthsign.com/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://mybirthsign.com/blog" },
    { "@type": "ListItem", position: 3, name: `Year of the ${A}`, item: URL_ } ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqEn.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
]);

const tpl = read("scripts/animal-profile-template.html");
const out = tpl.replace(/\{\{TITLE\}\}/g, esc(TITLE)).replace(/\{\{URL\}\}/g, URL_).replace(/\{\{DESC\}\}/g, esc(DESC)).replace(/\{\{OG_IMAGE\}\}/g, OG)
  .replace("{{JSONLD}}", jsonld.replace(/</g, "\\u003c")).replace("{{BODY_EN}}", () => body("en")).replace("{{BODY_KM}}", () => body("km"))
  .replace("{{TODAY_JS}}", () => `<script>${todayScript()}</script>`);
fs.writeFileSync(path.join(ROOT, `blog/zodiac-year-${slug}.html`), out);
console.log(`Wrote blog/zodiac-year-${slug}.html  (years ${years.join(", ")}; best ${best.join("/")}; supportive ${support.join("/") || "-"}; clash ${clash.join("/")})`);

// Day animal for "today" uses exactly the Daily Fortune generator's rule (12-day cycle from the Julian Day Number, Asia/Phnom_Penh date).
function todayScript() {
  const km = { tiers: UI.km.todayTier, line: null };
  return `(function(){
var ORDER=${JSON.stringify(ORDER)},TRI=${JSON.stringify(TRIANGLES)},KM=${JSON.stringify(KM_NAMES)};
var T={en:${JSON.stringify(UI.en.todayTier)},km:${JSON.stringify(UI.km.todayTier)}};
function day(){var p=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Phnom_Penh",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()).split("-").map(Number);
var n=Math.floor(Date.UTC(p[0],p[1]-1,p[2])/86400000)+2440588;return ORDER[(n+1)%12];}
function tier(a,d){if(a===d)return"great";if(TRI.some(function(t){return t.indexOf(a)>-1&&t.indexOf(d)>-1;}))return"good";if(Math.abs(ORDER.indexOf(a)-ORDER.indexOf(d))===6)return"caution";return"ordinary";}
var d=day();
document.querySelectorAll("[data-today]").forEach(function(el){var a=el.getAttribute("data-animal"),l=el.getAttribute("data-lang"),t=T[l][tier(a,d)];
var line=el.querySelector("[data-today-line]");if(!line)return;
line.textContent=l==="km"?"ថ្ងៃនេះជាថ្ងៃរបស់ឆ្នាំ"+KM[d]+" — សម្រាប់"+KM[a]+" វាជា"+t+"។":"Today is "+(/^[AEIOU]/.test(d)?"an ":"a ")+d+" day — for the "+a+" it is a "+t+".";});
})();`;
}
