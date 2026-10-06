#!/usr/bin/env node
/**
 * Generates the premium "Chinese Zodiac Animals — All 12 Signs" page (animals.html, English + Khmer).
 *
 *   node scripts/animals-page.mjs
 *
 * Reads only the site's own data: js/zodiac-data.js (animals, traits, compatibility triangles, elements) and js/i18n.js
 * (Khmer names/traits). Birth years use the same (year - 4) % 12 rule the site uses everywhere; nothing is hard-coded per year.
 * The one value not already in the project is each animal's traditional "branch element" (see BRANCH_ELEMENT) — flagged for review.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
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
const KM_ELEM = extractConst(i18n, "KM_ELEMENT_NAMES");
const ELEMENTS = extractConst(zdata, "ELEMENTS");
const HAN = { Rat: "鼠", Ox: "牛", Tiger: "虎", Rabbit: "兔", Dragon: "龍", Snake: "蛇", Horse: "馬", Goat: "羊", Monkey: "猴", Rooster: "雞", Dog: "狗", Pig: "豬" };
// Traditional element of each earthly branch (Rat/Pig water, Tiger/Rabbit wood, Snake/Horse fire, Monkey/Rooster metal, Ox/Dragon/Goat/Dog earth).
// NOT in the project's data before this page — shown as "Element" on the cards as the brief asked; easy to remove if unwanted.
const BRANCH_ELEMENT = { Rat: "Water", Ox: "Earth", Tiger: "Wood", Rabbit: "Wood", Dragon: "Earth", Snake: "Fire", Horse: "Fire", Goat: "Earth", Monkey: "Metal", Rooster: "Metal", Dog: "Earth", Pig: "Water" };
const ACCENT = { Rat: "#b9c4e0", Ox: "#d9a441", Tiger: "#f08a3c", Rabbit: "#f28ab8", Dragon: "#e9c35a", Snake: "#48c79a", Horse: "#ee7a4a", Goat: "#b79cf0", Monkey: "#e3a63c", Rooster: "#f5b43c", Dog: "#6f8fe8", Pig: "#f59aa8" };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (a) => a.toLowerCase();
const href = (a) => `blog/zodiac-year-${slug(a)}.html`;
const yearsOf = (a, n = 6) => { const idx = ORDER.indexOf(a); const out = []; for (let y = 1960; out.length < n; y++) if (((y - 4) % 12 + 12) % 12 === idx) out.push(y); return out; };
const partners = (a) => TRIANGLES.find((t) => t.includes(a)).filter((x) => x !== a);
const medal = (a, s, cls = "", lazy = true) => `<img class="an-medal ${cls}" src="images/profile/medal-${slug(a)}.webp" width="${s}" height="${s}" alt="" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
const nm = (a, km) => (km ? KM_NAMES[a] : a);
const kmYear = (a) => `ឆ្នាំ${KM_NAMES[a]}`;
const firstSentence = (s) => String(s).split(/[.។]/)[0].trim();
const keywords = (a, km) => {
  if (km) return firstSentence(KM_INFO[a].traits);
  return firstSentence(INFO[a].traits).replace(/,?\s+and\s+/, ", ").split(",").map((w) => w.trim()).filter(Boolean).slice(0, 3).join(" • ");
};

const sk = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const ICON = {
  heart: sk("M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z"),
  brief: sk("M4 8h16v11H4zM9 8V5.5h6V8M4 13h16"),
  coins: sk("M5 7c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 8.4 5 7ZM5 7v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7M5 12v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5"),
  people: sk("M9 11a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 9 11ZM3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6M16 10.5a2.6 2.6 0 1 0 0-5.2M17 14.6c2 .4 3.2 1.9 3.6 4.4"),
  star: sk("m12 3.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 20l1.1-6L3.4 9.8l6-.8L12 3.5Z"),
  warn: sk("M12 3.8 21 19.5H3L12 3.8ZM12 10v4.2M12 16.8v.2"),
  orn: '<svg class="fx-orn" viewBox="0 0 150 14" aria-hidden="true"><path d="M2 7h56M92 7h56" stroke="#e7c27a" stroke-width="1" opacity=".8"/><path d="M75 1l5 6-5 6-5-6 5-6Z" fill="none" stroke="#f6dc9b" stroke-width="1.2"/><circle cx="62" cy="7" r="2" fill="#e7c27a"/><circle cx="88" cy="7" r="2" fill="#e7c27a"/></svg>',
};

const UI = {
  en: {
    eyebrow: "THE 12 ZODIAC SIGNS", h1: "Chinese Zodiac Animals",
    sub: "Explore all 12 Chinese zodiac animals, their personality traits, elements, lucky signs, and compatibility.",
    btnFind: "✨ Find My Zodiac Sign", btnCompat: "💞 Check Compatibility",
    introH: "Meet the 12 Chinese Zodiac Animals",
    introP: "The Chinese zodiac is a traditional system based on a repeating cycle of 12 animal signs. Your zodiac animal is traditionally determined by your birth year, with Lunar New Year boundaries affecting people born in January or February.",
    noteP: "Not sure which animal you are? Use our Zodiac Checker.", noteB: "Check My Zodiac →",
    gridH: "All 12 Chinese Zodiac Animals", gridP: "Choose your zodiac animal to explore its personality, element, lucky signs, and compatibility.",
    lPers: "Personality", lElem: "Element", lComp: "Compatibility", lYears: "Birth Years", yearOf: (n) => `Year of the ${n}`, explore: (n) => `Explore ${n} →`,
    el: { Wood: "Wood", Fire: "Fire", Earth: "Earth", Metal: "Metal", Water: "Water" },
    ctaH: "Which Chinese Zodiac Animal Are You?", ctaP: "Enter your birthday to discover your Chinese zodiac animal.", ctaB: "🔮 Find My Zodiac Sign",
    cycH: "How the 12-Year Zodiac Cycle Works", cycP1: "The zodiac repeats every 12 years.", cycP2: "Your birth year determines the traditional zodiac animal, but people born around January or February should check the Lunar New Year boundary.", cycB: "Check Your Zodiac →",
    elH: "The Five Chinese Zodiac Elements", elP: "The five elements add another layer to the traditional zodiac system.", elB: "Explore Chinese Zodiac Elements →",
    persH: "Every Animal Has Its Own Personality", persP: "Each zodiac animal carries its own traditional associations. These are cultural interpretations offered for reflection and fun — not scientific claims.",
    pers: [["heart", "Love", "How each sign traditionally approaches romance and commitment."], ["brief", "Career", "Work styles and strengths traditionally linked to each animal."], ["coins", "Money", "Traditional views on saving, spending, and opportunity."], ["people", "Relationships", "How each sign tends to connect with family and friends."], ["star", "Strengths", "The qualities each animal is traditionally admired for."], ["warn", "Challenges", "Areas where each sign is traditionally said to need balance."]],
    compH: "Chinese Zodiac Compatibility", compP: "See how two zodiac animals traditionally match in love, friendship, and business.", group: "Natural affinity group", compB: "Check Compatibility →", bizB: "Business Partner Compatibility →",
    yrH: "Chinese Zodiac Birth Years", yrNote: "Important: Chinese zodiac years follow the Lunar New Year calendar. If you were born in January or February, use the Zodiac Checker to confirm your sign.", yrB: "Check My Birth Year →",
    faqH: "Frequently Asked Questions", toolsH: "Explore MyBirthSign",
    tools: [["🔮", "Chinese Zodiac Checker", "Find your animal and element", "/checker"], ["💞", "Compatibility Calculator", "Check love, friendship and more", "/compatibility"], ["💍", "Wedding Date Picker", "Find auspicious dates", "/wedding-date"], ["💼", "Business Partner Compatibility", "See if you work well together", "/business-partner"], ["📚", "Zodiac Guide", "Learn about all 12 animals", "/zodiac-guide"]],
    blogH: "From the Blog", blogP: "Read more about zodiac compatibility, yearly forecasts, and the five elements →",
    disc: "For entertainment purposes only. Chinese zodiac interpretations are traditional and cultural, not scientifically proven.",
  },
  km: {
    eyebrow: "និមិត្តសញ្ញារាសីទាំង១២", h1: "សត្វរាសីចិនទាំង ១២",
    sub: "ស្វែងយល់អំពីបុគ្គលិកលក្ខណៈ ធាតុ សំណាង និងភាពត្រូវគ្នារបស់សត្វរាសីចិនទាំង ១២។",
    btnFind: "✨ ស្វែងរកនិមិត្តសញ្ញារបស់ខ្ញុំ", btnCompat: "💞 ពិនិត្យភាពសមស្រប",
    introH: "ស្គាល់សត្វរាសីទាំង១២",
    introP: "រាសីជាប្រព័ន្ធប្រពៃណីដែលផ្អែកលើវដ្តនៃសត្វនិមិត្តសញ្ញា១២ដែលវិលជាប់ជានិច្ច។ សត្វរាសីរបស់អ្នកតាមប្រពៃណីត្រូវបានកំណត់ដោយឆ្នាំកំណើត ហើយថ្ងៃចូលឆ្នាំចន្ទគតិមានឥទ្ធិពលលើអ្នកដែលកើតក្នុងខែមករា ឬកុម្ភៈ។",
    noteP: "មិនប្រាកដថាអ្នកជាសត្វអ្វី? សូមប្រើម៉ាស៊ីនពិនិត្យរាសីរបស់យើង។", noteB: "ពិនិត្យរាសីរបស់ខ្ញុំ →",
    gridH: "សត្វរាសីទាំង១២", gridP: "ជ្រើសរើសសត្វរាសីរបស់អ្នក ដើម្បីស្វែងយល់អំពីបុគ្គលិកលក្ខណៈ ធាតុ សំណាង និងភាពសមស្រប។",
    lPers: "បុគ្គលិកលក្ខណៈ", lElem: "ធាតុ", lComp: "ភាពសមស្រប", lYears: "ឆ្នាំកំណើត", yearOf: (n) => `ឆ្នាំ${n}`, explore: (n) => `ស្វែងយល់ឆ្នាំ${n} →`,
    el: KM_ELEM,
    ctaH: "តើអ្នកជាសត្វរាសីអ្វី?", ctaP: "បញ្ចូលថ្ងៃកំណើតរបស់អ្នក ដើម្បីស្វែងរកសត្វរាសីរបស់អ្នក។", ctaB: "🔮 ស្វែងរកនិមិត្តសញ្ញារបស់ខ្ញុំ",
    cycH: "របៀបដែលវដ្តរាសី១២ឆ្នាំដំណើរការ", cycP1: "រាសីវិលជុំរៀងរាល់ ១២ឆ្នាំម្តង។", cycP2: "ឆ្នាំកំណើតរបស់អ្នកកំណត់សត្វរាសីតាមប្រពៃណី ប៉ុន្តែអ្នកដែលកើតក្នុងខែមករា ឬកុម្ភៈ គួរពិនិត្យថ្ងៃចូលឆ្នាំចន្ទគតិ។", cycB: "ពិនិត្យរាសីរបស់អ្នក →",
    elH: "ធាតុទាំងប្រាំនៃរាសី", elP: "ធាតុទាំងប្រាំបន្ថែមស្រទាប់មួយទៀតដល់ប្រព័ន្ធរាសីតាមប្រពៃណី។", elB: "ស្វែងយល់ធាតុទាំងប្រាំ →",
    persH: "សត្វនីមួយៗមានបុគ្គលិកលក្ខណៈផ្ទាល់ខ្លួន", persP: "សត្វរាសីនីមួយៗមានការបកស្រាយតាមប្រពៃណីរៀងៗខ្លួន។ ទាំងនេះជាការបកស្រាយតាមវប្បធម៌សម្រាប់ការពិចារណា និងកម្សាន្ត — មិនមែនជាការអះអាងផ្នែកវិទ្យាសាស្ត្រទេ។",
    pers: [["heart", "ស្នេហា", "របៀបដែលនិមិត្តសញ្ញានីមួយៗមើលស្នេហា និងការប្តេជ្ញាចិត្តតាមប្រពៃណី។"], ["brief", "អាជីព", "របៀបធ្វើការ និងចំណុចខ្លាំងដែលផ្សារភ្ជាប់នឹងសត្វនីមួយៗតាមប្រពៃណី។"], ["coins", "លុយកាក់", "ទស្សនៈតាមប្រពៃណីអំពីការសន្សំ ការចំណាយ និងឱកាស។"], ["people", "ទំនាក់ទំនង", "របៀបដែលនិមិត្តសញ្ញានីមួយៗទាក់ទងជាមួយគ្រួសារ និងមិត្តភក្តិ។"], ["star", "ចំណុចខ្លាំង", "គុណសម្បត្តិដែលសត្វនីមួយៗត្រូវបានគេកោតសរសើរតាមប្រពៃណី។"], ["warn", "បញ្ហាប្រឈម", "ផ្នែកដែលនិមិត្តសញ្ញានីមួយៗត្រូវការតុល្យភាពតាមប្រពៃណី។"]],
    compH: "ភាពសមស្របនៃរាសី", compP: "មើលថាតើសត្វរាសីពីរត្រូវគ្នាយ៉ាងដូចម្តេចក្នុងស្នេហា មិត្តភាព និងអាជីវកម្មតាមប្រពៃណី។", group: "ក្រុមដែលត្រូវគ្នាតាមធម្មជាតិ", compB: "ពិនិត្យភាពសមស្រប →", bizB: "ភាពសមស្របដៃគូអាជីវកម្ម →",
    yrH: "ឆ្នាំកំណើតតាមរាសី", yrNote: "សំខាន់៖ ឆ្នាំរាសីអនុវត្តតាមប្រតិទិនចូលឆ្នាំចន្ទគតិ។ ប្រសិនបើអ្នកកើតក្នុងខែមករា ឬកុម្ភៈ សូមប្រើម៉ាស៊ីនពិនិត្យរាសីដើម្បីបញ្ជាក់និមិត្តសញ្ញារបស់អ្នក។", yrB: "ពិនិត្យឆ្នាំកំណើតរបស់ខ្ញុំ →",
    faqH: "សំណួរដែលសួរញឹកញាប់", toolsH: "ស្វែងរកឧបករណ៍ MyBirthSign",
    tools: [["🔮", "ម៉ាស៊ីនពិនិត្យរាសី", "ស្វែងរកសត្វ និងធាតុរបស់អ្នក", "/checker"], ["💞", "គណនាភាពសមស្រប", "ពិនិត្យស្នេហា មិត្តភាព និងផ្សេងទៀត", "/compatibility"], ["💍", "ជ្រើសរើសថ្ងៃរៀបការ", "ស្វែងរកថ្ងៃមង្គល", "/wedding-date"], ["💼", "ភាពសមស្របដៃគូអាជីវកម្ម", "មើលថាតើអ្នកធ្វើការជាមួយគ្នាបានល្អទេ", "/business-partner"], ["📚", "មគ្គុទ្ទេសក៍រាសី", "ស្វែងយល់អំពីសត្វទាំង១២", "/zodiac-guide"]],
    blogH: "ពីប្លក់", blogP: "អានបន្ថែមអំពីភាពសមស្រប ការព្យាករណ៍ប្រចាំឆ្នាំ និងធាតុទាំងប្រាំ →",
    disc: "សម្រាប់តែការកម្សាន្តប៉ុណ្ណោះ។ ការបកស្រាយរាសីជាប្រពៃណី និងវប្បធម៌ មិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ។",
  },
};

function faqs(km) {
  const all = ORDER.map((a) => nm(a, km)).join(", ");
  const grp = TRIANGLES.map((t) => t.map((a) => nm(a, km)).join(" · ")).join(" | ");
  if (km) return [
    ["តើសត្វរាសីទាំង១២មានអ្វីខ្លះ?", `សត្វរាសីទាំង១២គឺ ${ORDER.map((a) => kmYear(a)).join(", ")}។`],
    ["តើខ្ញុំរកសត្វរាសីរបស់ខ្ញុំយ៉ាងដូចម្តេច?", "រកឆ្នាំកំណើតរបស់អ្នកក្នុងតារាងឆ្នាំកំណើតខាងលើ ឬបញ្ចូលថ្ងៃកំណើតក្នុងម៉ាស៊ីនពិនិត្យរាសីរបស់យើង ដើម្បីទទួលបានលទ្ធផលត្រឹមត្រូវ រួមទាំងអ្នកដែលកើតក្នុងខែមករា ឬកុម្ភៈ។"],
    ["តើខ្ញុំជាសត្វរាសីអ្វី?", "វាអាស្រ័យលើឆ្នាំកំណើតរបស់អ្នក និងថ្ងៃចូលឆ្នាំចន្ទគតិ។ ប្រើម៉ាស៊ីនពិនិត្យរាសីដើម្បីដឹងភ្លាមៗ។"],
    ["តើឆ្នាំរាសីចាប់ផ្តើមថ្ងៃទី១ មករាឬទេ?", "ទេ។ ឆ្នាំរាសីចាប់ផ្តើមនៅថ្ងៃចូលឆ្នាំចន្ទគតិ ដែលធ្លាក់នៅចន្លោះចុងខែមករា និងពាក់កណ្តាលខែកុម្ភៈ។"],
    ["តើធាតុទាំងប្រាំនៃរាសីមានអ្វីខ្លះ?", `ធាតុទាំងប្រាំគឺ ${ELEMENTS.map((e) => KM_ELEM[e]).join(", ")}។ ធាតុបន្ថែមស្រទាប់មួយទៀតដល់ប្រព័ន្ធរាសីតាមប្រពៃណី។`],
    ["តើសត្វរាសីណាខ្លះត្រូវគ្នា?", `តាមប្រពៃណី សត្វរាសីត្រូវបានចាត់ជាបួនក្រុមដែលត្រូវគ្នាតាមធម្មជាតិ៖ ${grp}។`],
    ["តើមនុស្សពីរនាក់អាចមានរាសីត្រូវគ្នាបានទេ?", "បាន។ មនុស្សពីរនាក់ដែលនិមិត្តសញ្ញារបស់ពួកគេស្ថិតក្នុងក្រុមតែមួយ តាមប្រពៃណីត្រូវបានចាត់ទុកថាត្រូវគ្នាបំផុត។ ប្រើគណនាភាពសមស្របរបស់យើងដើម្បីមើលគូរបស់អ្នក។"],
    ["តើរាសីត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រឬទេ?", "មិនបានទេ។ ការបកស្រាយរាសីជាប្រពៃណី និងវប្បធម៌ ហើយមិនត្រូវបានបញ្ជាក់ដោយវិទ្យាសាស្ត្រទេ។ សូមប្រើវាសម្រាប់ការកម្សាន្ត និងការស្វែងយល់ប៉ុណ្ណោះ។"],
  ];
  return [
    ["What are the 12 Chinese zodiac animals?", `The 12 animals, in order, are ${all}.`],
    ["How do I find my Chinese zodiac animal?", "Look up your birth year in the birth-year table above, or enter your birthday in our Zodiac Checker for an exact result — including people born in January or February."],
    ["What Chinese zodiac animal am I?", "It depends on your birth year and the Lunar New Year date for that year. Use the Zodiac Checker to find out instantly."],
    ["Do Chinese zodiac years start on January 1?", "No. The zodiac year begins at Lunar New Year, which falls between late January and mid-February."],
    ["What are the five Chinese zodiac elements?", `The five elements are ${ELEMENTS.join(", ")}. They add another layer to the traditional zodiac system.`],
    ["Which Chinese zodiac animals are compatible?", `Traditionally the animals fall into four natural affinity groups: ${grp}.`],
    ["Can two people have compatible zodiac signs?", "Yes. Two people whose signs sit in the same affinity group are traditionally considered a natural match. Use our Compatibility Calculator to see your pairing."],
    ["Is Chinese zodiac scientifically proven?", "No. Chinese zodiac interpretations are traditional and cultural, and they are not scientifically proven. Enjoy them for fun and self-reflection."],
  ];
}

function body(lang) {
  const km = lang === "km", u = UI[lang];
  const card = (a) => {
    const yrs = yearsOf(a), n = nm(a, km);
    return `        <li class="an-card" style="--ac:${ACCENT[a]}">
          <a class="an-card-link" href="${href(a)}" aria-label="${esc(u.explore(n).replace(" →", ""))}">
            <span class="an-han" lang="zh-Hant" aria-hidden="true">${HAN[a]}</span>
            ${medal(a, 150, "an-medal-card")}
            <h3>${esc(km ? kmYear(a) : n)}</h3>
            <p class="an-yearof">${esc(km ? `${a}` : u.yearOf(n))}</p>
          </a>
          <dl>
            <dt>${esc(u.lPers)}</dt><dd>${esc(keywords(a, km))}</dd>
            <dt>${esc(u.lElem)}</dt><dd>${esc(u.el[BRANCH_ELEMENT[a]])}</dd>
            <dt>${esc(u.lComp)}</dt><dd>${esc(partners(a).map((x) => nm(x, km)).join(" • "))}</dd>
            <dt>${esc(u.lYears)}</dt><dd class="an-yrs">${yrs.join(" • ")}</dd>
          </dl>
          <a class="fx-btn fx-btn-sm" href="${href(a)}">${esc(u.explore(n))}</a>
        </li>`;
  };
  const ring = (cls, size) => `<ul class="an-ring ${cls}" aria-label="${esc(u.h1)}">${ORDER.map((a, i) => `<li style="--i:${i}"><a href="${href(a)}" aria-label="${esc(nm(a, km))}">${medal(a, size, "", cls !== "an-ring-hero")}</a></li>`).join("")}</ul>`;
  return `<div class="an-body">
<section class="fx-hero an-hero" aria-labelledby="an-h1-${lang}">
  <div class="an-hero-in">
    <div class="an-hero-text">
      <p class="fx-eyebrow">${esc(u.eyebrow)}</p>
      <h1 id="an-h1-${lang}"><strong>${esc(u.h1)}</strong></h1>
      <p class="fx-sub">${esc(u.sub)}</p>
      <div class="pf-cta-row"><a class="fx-btn" href="/checker">${esc(u.btnFind)}</a><a class="fx-btn fx-btn-rose" href="/compatibility">${esc(u.btnCompat)}</a></div>
    </div>
    <div class="an-hero-art" aria-hidden="false"><div class="an-moon"></div>${ring("an-ring-hero", 120)}</div>
  </div>
</section>

<div class="fx-wrap">
  <section class="an-intro fx-gframe" aria-labelledby="an-in-${lang}">
    <div class="an-intro-text"><h2 id="an-in-${lang}">${esc(u.introH)}</h2><p>${esc(u.introP)}</p></div>
    <div class="an-intro-note"><p>${esc(u.noteP)}</p><a class="fx-btn fx-btn-sm" href="/checker">${esc(u.noteB)}</a></div>
  </section>

  <section class="fx-sec" id="all-animals" aria-labelledby="an-gr-${lang}">
    <div class="fx-head"><h2 id="an-gr-${lang}">${esc(u.gridH)}</h2>${ICON.orn}<p>${esc(u.gridP)}</p></div>
    <ul class="an-grid">
${ORDER.map(card).join("\n")}
    </ul>
  </section>

  <section class="fx-sec" aria-labelledby="an-cta-${lang}">
    <div class="fx-cta an-cta">
      <img class="fx-lotus fx-lotus-l" src="images/wedding/lotus-pink.webp" width="190" height="96" alt="" loading="lazy">
      <img class="fx-lotus fx-lotus-r" src="images/wedding/lotus-gold.webp" width="190" height="96" alt="" loading="lazy">
      <div class="an-cta-meds">${["Rat", "Dragon", "Tiger"].map((a) => medal(a, 84)).join("")}</div>
      <h2 id="an-cta-${lang}">${esc(u.ctaH)}</h2>
      <p>${esc(u.ctaP)}</p>
      <a class="fx-btn" href="/checker">${esc(u.ctaB)}</a>
    </div>
  </section>

  <div class="an-duo">
    <section class="fx-gframe an-cycle" aria-labelledby="an-cy-${lang}">
      <h2 id="an-cy-${lang}">${esc(u.cycH)}</h2>
      <div class="an-cycle-body">
        <div class="an-cycle-art">${ring("an-ring-cycle", 60)}<span class="an-cycle-label">12</span></div>
        <div><p>${esc(u.cycP1)}</p><p>${esc(u.cycP2)}</p>
          <p class="an-order">${ORDER.map((a) => esc(nm(a, km))).join(" → ")} → ${esc(nm(ORDER[0], km))}</p>
          <a class="fx-btn fx-btn-sm" href="/checker">${esc(u.cycB)}</a></div>
      </div>
    </section>
    <section class="fx-gframe an-elements" aria-labelledby="an-el-${lang}">
      <h2 id="an-el-${lang}">${esc(u.elH)}</h2>
      <ul class="an-el-row">${ELEMENTS.map((e) => `<li><img src="images/profile/el-${e.toLowerCase()}.webp" width="72" height="72" alt="" loading="lazy" decoding="async"><strong>${esc(u.el[e])}</strong></li>`).join("")}</ul>
      <p>${esc(u.elP)}</p>
      <a class="fx-btn fx-btn-sm" href="blog/five-elements-explained.html">${esc(u.elB)}</a>
    </section>
  </div>

  <section class="fx-sec" aria-labelledby="an-ps-${lang}">
    <div class="fx-head"><h2 id="an-ps-${lang}">${esc(u.persH)}</h2>${ICON.orn}<p>${esc(u.persP)}</p></div>
    <ul class="an-pers">${u.pers.map(([i, t, d]) => `<li class="fx-gframe"><h3>${ICON[i]}<span>${esc(t)}</span></h3><p>${esc(d)}</p></li>`).join("")}</ul>
  </section>

  <section class="fx-sec" aria-labelledby="an-cp-${lang}">
    <div class="fx-head"><h2 id="an-cp-${lang}">${esc(u.compH)}</h2>${ICON.orn}<p>${esc(u.compP)}</p></div>
    <ul class="an-groups">${TRIANGLES.map((t) => `<li class="fx-gframe"><p class="an-group-label">${esc(u.group)}</p><div class="an-group-meds">${t.map((a) => `<a href="${href(a)}">${medal(a, 76)}<span>${esc(nm(a, km))}</span></a>`).join("")}</div></li>`).join("")}</ul>
    <p class="pf-cta-row an-comp-btns"><a class="fx-btn" href="/compatibility">${esc(u.compB)}</a><a class="fx-btn fx-btn-rose" href="/business-partner">${esc(u.bizB)}</a></p>
  </section>

  <section class="fx-sec" aria-labelledby="an-yr-${lang}">
    <div class="fx-gframe an-years">
      <h2 id="an-yr-${lang}">${esc(u.yrH)}</h2>
      <table class="an-table"><caption class="sr-only">${esc(u.yrH)}</caption><tbody>
${ORDER.map((a) => `        <tr><th scope="row"><a href="${href(a)}">${esc(nm(a, km))}</a></th><td>${yearsOf(a).join(" • ")}</td></tr>`).join("\n")}
      </tbody></table>
      <p class="an-yr-note">${esc(u.yrNote)}</p>
      <p class="an-yr-btn"><a class="fx-btn fx-btn-sm" href="/checker">${esc(u.yrB)}</a></p>
    </div>
  </section>

  <section class="fx-sec pf-faqwrap" aria-labelledby="an-fq-${lang}">
    <div class="fx-gframe fx-faqpanel">
      <h2 id="an-fq-${lang}">${esc(u.faqH)}</h2>
      <div class="fx-faq">
${faqs(km).map(([q, a]) => `        <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n")}
      </div>
    </div>
  </section>

  <section class="fx-sec" aria-labelledby="an-tl-${lang}">
    <div class="fx-gframe fx-toolspanel pf-tools5">
      <h2 id="an-tl-${lang}">${esc(u.toolsH)}</h2>
      <ul class="fx-tools">
${u.tools.map((x) => `        <li><a href="${x[3]}"><span class="fx-t-ico" aria-hidden="true">${x[0]}</span><strong>${esc(x[1])}</strong><small>${esc(x[2])}</small></a></li>`).join("\n")}
      </ul>
    </div>
  </section>

  <section class="fx-sec an-blog" aria-labelledby="an-bl-${lang}"><h2 id="an-bl-${lang}">${esc(u.blogH)}</h2><p><a href="blog.html">${esc(u.blogP)}</a></p><p class="fx-disc">${esc(u.disc)}</p></section>
</div>
</div>`;
}

// ---------------------------------------------------------------- SEO
const TITLE = "Chinese Zodiac Animals — All 12 Signs | MyBirthSign";
const DESC = "Explore all 12 Chinese zodiac animals, including personality traits, birth years, elements, lucky signs, and compatibility. Discover your Chinese zodiac animal with MyBirthSign.";
const URL_ = "https://mybirthsign.com/zodiac-guide";   // existing canonical for this page (netlify.toml rewrites /zodiac-guide to animals.html)
const OG = "https://mybirthsign.com/images/fortune/hero-night.webp";
const faqEn = faqs(false);
const jsonld = JSON.stringify([
  { "@context": "https://schema.org", "@type": "CollectionPage", name: "Chinese Zodiac Animals — All 12 Signs", description: DESC, url: URL_, inLanguage: ["en", "km"],
    mainEntity: { "@type": "ItemList", itemListElement: ORDER.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: `Year of the ${a}`, url: `https://mybirthsign.com/blog/zodiac-year-${slug(a)}` })) } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mybirthsign.com/" },
    { "@type": "ListItem", position: 2, name: "Chinese Zodiac Animals", item: URL_ } ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqEn.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
]);

let tpl = read("scripts/animal-profile-template.html");
// the template lives one folder deep (blog/); this page is at the site root
tpl = tpl.replace(/(href|src)="\.\.\//g, '$1="').replace('<link rel="stylesheet" href="css/profile.css">', '<link rel="stylesheet" href="css/profile.css">\n<link rel="stylesheet" href="css/animals.css">').replace('<body class="fx-page pf-page">', '<body class="fx-page pf-page an-page">').replace("\n{{TODAY_JS}}", "")
  .replace('<link rel="icon" type="image/svg+xml" href="favicon.svg">', '<link rel="icon" type="image/svg+xml" href="favicon.svg">\n<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">\n<link rel="shortcut icon" href="favicon.ico">\n<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">');
const out = tpl.replace(/\{\{TITLE\}\}/g, esc(TITLE)).replace(/\{\{URL\}\}/g, URL_).replace(/\{\{DESC\}\}/g, esc(DESC)).replace(/\{\{OG_IMAGE\}\}/g, OG)
  .replace("{{JSONLD}}", jsonld.replace(/</g, "\\u003c")).replace("{{BODY_EN}}", () => body("en")).replace("{{BODY_KM}}", () => body("km"));
fs.writeFileSync(path.join(ROOT, "animals.html"), out);
console.log("Wrote animals.html");
