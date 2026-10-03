// business-data.js — Chinese zodiac BaZi (Heavenly Stem / Earthly Branch /
// Yin-Yang) details and Five Elements interaction logic for the Business
// Partnership Compatibility Calculator. Loaded on business-partner.html
// only, after zodiac-data.js (reuses getZodiac, ANIMAL_INFO, ZODIAC_ANIMALS,
// ZODIAC_TRIANGLES, getCompatibilityType, CNY_DATES).

const HEAVENLY_STEMS = [
  { name: "Jiǎ", hanzi: "甲" }, { name: "Yǐ", hanzi: "乙" },
  { name: "Bǐng", hanzi: "丙" }, { name: "Dīng", hanzi: "丁" },
  { name: "Wù", hanzi: "戊" }, { name: "Jǐ", hanzi: "己" },
  { name: "Gēng", hanzi: "庚" }, { name: "Xīn", hanzi: "辛" },
  { name: "Rén", hanzi: "壬" }, { name: "Guǐ", hanzi: "癸" }
];

const EARTHLY_BRANCHES = [
  { name: "Zǐ", hanzi: "子" }, { name: "Chǒu", hanzi: "丑" },
  { name: "Yín", hanzi: "寅" }, { name: "Mǎo", hanzi: "卯" },
  { name: "Chén", hanzi: "辰" }, { name: "Sì", hanzi: "巳" },
  { name: "Wǔ", hanzi: "午" }, { name: "Wèi", hanzi: "未" },
  { name: "Shēn", hanzi: "申" }, { name: "Yǒu", hanzi: "酉" },
  { name: "Xū", hanzi: "戌" }, { name: "Hài", hanzi: "亥" }
]; // index-aligned with ZODIAC_ANIMALS (Rat=0 ... Pig=11)

/**
 * Full BaZi-style profile for one birth date: animal, element, Heavenly
 * Stem, Earthly Branch, Yin/Yang polarity, the exact Chinese New Year
 * boundary used, and whether the birthday fell before or after it.
 */
function getBaZi(date) {
  const z = getZodiac(date); // { animal, element, zodiacYear } — real CNY cutoff
  const stemIndex = ((z.zodiacYear - 4) % 10 + 10) % 10;
  const branchIndex = ((z.zodiacYear - 4) % 12 + 12) % 12;
  const yinYang = stemIndex % 2 === 0 ? "Yang" : "Yin";

  const year = date.getFullYear();
  const cny = CNY_DATES[year];
  let cnyDateStr = null;
  let beforeCNY = false;
  if (cny) {
    const [cnyMonth, cnyDay] = cny.split("-").map(Number);
    beforeCNY = (date.getMonth() + 1) < cnyMonth || ((date.getMonth() + 1) === cnyMonth && date.getDate() < cnyDay);
    cnyDateStr = cny;
  }

  return {
    animal: z.animal,
    element: z.element,
    zodiacYear: z.zodiacYear,
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    yinYang: yinYang,
    cny: cnyDateStr,
    beforeCNY: beforeCNY,
    birthYear: year
  };
}

// ---------------------------------------------------------------------------
// Five Elements generating (sheng) and controlling (ke) cycles
// ---------------------------------------------------------------------------
const ELEMENT_GENERATES = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
const ELEMENT_CONTROLS = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };

function elementRelation(elA, elB, lang) {
  const isKm = lang === "km" && typeof KM_ELEMENT_NAMES !== "undefined";
  const nameA = isKm ? KM_ELEMENT_NAMES[elA] : elA;
  const nameB = isKm ? KM_ELEMENT_NAMES[elB] : elB;

  if (elA === elB) {
    return { tier: "medium", relation: "same",
      note: isKm
        ? `អ្នកទាំងពីរមានធាតុដូចគ្នា (${nameA})។ នោះមានន័យថាសភាវគតិស្រដៀងគ្នា និងចង្វាក់ការងារចូលគ្នា — ងាយស្រួល ប៉ុន្តែមានតុល្យភាពធម្មជាតិតិចជាងនៅពេលម្នាក់ណាម្នាក់មានចំណុចខ្វះខាត។`
        : `You share the same element (${elA}). That means similar instincts and a shared working rhythm — comfortable, but with less natural counterbalance when one of you has a blind spot.` };
  }
  if (ELEMENT_GENERATES[elA] === elB) {
    return { tier: "high", relation: "generates",
      note: isKm
        ? `${nameA} តាមប្រពៃណីបង្កើត ${nameB} នៅក្នុងវដ្តធាតុទាំងប្រាំ — ថាមពលរបស់អ្នកមានទំនោរចម្អែត និងគាំទ្រដៃគូរបស់អ្នក ជាទំនាក់ទំនងផលិតកម្មដែលល្អប្រសើរតាមប្រពៃណីសម្រាប់ដៃគូអាជីវកម្ម។`
        : `${elA} traditionally generates ${elB} in the Five Elements cycle — your energy tends to feed and support your partner's, a classically favorable production relationship for a working partnership.` };
  }
  if (ELEMENT_GENERATES[elB] === elA) {
    return { tier: "high", relation: "generates",
      note: isKm
        ? `${nameB} តាមប្រពៃណីបង្កើត ${nameA} នៅក្នុងវដ្តធាតុទាំងប្រាំ — ថាមពលរបស់ដៃគូអ្នកមានទំនោរចម្អែត និងគាំទ្រថាមពលរបស់អ្នក ជាទំនាក់ទំនងផលិតកម្មដែលល្អប្រសើរតាមប្រពៃណី។`
        : `${elB} traditionally generates ${elA} in the Five Elements cycle — your partner's energy tends to feed and support yours, a classically favorable production relationship.` };
  }
  if (ELEMENT_CONTROLS[elA] === elB) {
    return { tier: "low", relation: "controls",
      note: isKm
        ? `${nameA} តាមប្រពៃណីគ្រប់គ្រង/ទប់ទល់ ${nameB} នៅក្នុងវដ្តធាតុទាំងប្រាំ — ការផ្គូផ្គងនេះអាចបង្កភាពតានតឹងពិតប្រាកដ លុះត្រាតែមានការធ្វើតុល្យភាពដោយដឹងខ្លួន ដោយសារម្ខាងមានទំនោរធម្មជាតិទប់ទល់ម្ខាងទៀត។`
        : `${elA} traditionally controls/restrains ${elB} in the Five Elements cycle — this pairing can create real tension unless it's consciously balanced, since one side naturally tends to keep the other in check.` };
  }
  if (ELEMENT_CONTROLS[elB] === elA) {
    return { tier: "low", relation: "controls",
      note: isKm
        ? `${nameB} តាមប្រពៃណីគ្រប់គ្រង/ទប់ទល់ ${nameA} នៅក្នុងវដ្តធាតុទាំងប្រាំ — ការផ្គូផ្គងនេះអាចបង្កភាពតានតឹងពិតប្រាកដ លុះត្រាតែមានការធ្វើតុល្យភាពដោយដឹងខ្លួន។`
        : `${elB} traditionally controls/restrains ${elA} in the Five Elements cycle — this pairing can create real tension unless it's consciously balanced.` };
  }
  return { tier: "medium", relation: "neutral",
    note: isKm
      ? `${nameA} និង ${nameB} គ្មានទំនោរបុរាណខ្លាំងទៅអក្ខជាមួយគ្នាទេ — មិនពង្រឹង ហើយក៏មិនទប់ទល់គ្នាទៅវិញទៅមក។`
      : `${elA} and ${elB} have no strong traditional pull either way — neither reinforcing nor restraining each other.` };
}

// ---------------------------------------------------------------------------
// Per-animal business-flavored strengths and suggested complementary roles
// (framed as traditional interpretation, never a guarantee — see UI copy).
// ---------------------------------------------------------------------------
const ANIMAL_BUSINESS = {
  en: {
    Rat: { strength: "a sharp eye for opportunity and resourceful, fast problem-solving when conditions change.", roles: ["Business Development", "Deal-Making", "Market Research"] },
    Ox: { strength: "disciplined, methodical follow-through and a steady hand on day-to-day operations.", roles: ["Operations", "Finance", "Process & Systems"] },
    Tiger: { strength: "bold initiative and a willingness to take calculated risks others hesitate on.", roles: ["Strategy", "New Ventures", "Public-Facing Leadership"] },
    Rabbit: { strength: "diplomacy and a gift for smoothing over friction with clients, staff, or partners.", roles: ["Partnerships", "Client Relations", "Negotiation"] },
    Dragon: { strength: "big-picture vision and a natural ability to rally people around an ambitious goal.", roles: ["Strategy", "Vision & Branding", "Leadership"] },
    Snake: { strength: "sharp strategic analysis and a patient, calculated approach to high-stakes decisions.", roles: ["Strategy", "Finance", "Risk Analysis"] },
    Horse: { strength: "high energy, fast execution, and a natural comfort with public-facing work.", roles: ["Sales", "Marketing", "Business Development"] },
    Goat: { strength: "creativity and an intuitive sense for brand, aesthetics, and what customers respond to.", roles: ["Creative & Branding", "Product Development", "Design"] },
    Monkey: { strength: "inventive problem-solving and quick adaptation when plans need to change.", roles: ["Innovation", "Product Development", "Technology"] },
    Rooster: { strength: "sharp attention to detail and a talent for organization, scheduling, and quality control.", roles: ["Operations", "Administration", "Quality Control"] },
    Dog: { strength: "loyalty and dependability — the partner who keeps commitments and protects the team's interests.", roles: ["Operations", "HR & Team Culture", "Trust & Compliance"] },
    Pig: { strength: "generosity and relationship-building instincts that tend to earn long-term goodwill.", roles: ["Client Relations", "Partnerships", "Team Culture"] }
  },
  km: {
    Rat: { strength: "ភ្នែកមើលឃើញឱកាសយ៉ាងច្បាស់ និងការដោះស្រាយបញ្ហាដោយមានធនធាន និងលឿននៅពេលស្ថានភាពផ្លាស់ប្តូរ។", roles: ["ការអភិវឌ្ឍន៍អាជីវកម្ម", "ការចចារកិច្ចព្រមព្រៀង", "ការស្រាវជ្រាវទីផ្សារ"] },
    Ox: { strength: "ការអនុវត្តតាមដានដែលមានវិន័យ និងមានជំហានច្បាស់លាស់ ព្រមទាំងដៃដែលស្ថិតស្ថេរលើការងារប្រចាំថ្ងៃ។", roles: ["ប្រតិបត្តិការ", "ហិរញ្ញវត្ថុ", "ដំណើរការ និងប្រព័ន្ធ"] },
    Tiger: { strength: "ភាពក្លាហានចាប់ផ្តើម និងឆន្ទៈទទួលយកហានិភ័យបានគណនា ដែលអ្នកដទៃអាចស្ទាក់ស្ទើរ។", roles: ["យុទ្ធសាស្ត្រ", "គម្រោងថ្មី", "ភាពជាអ្នកដឹកនាំខាងមុខ"] },
    Rabbit: { strength: "ជំនាញការទូត និងអំណោយទានក្នុងការរំសាយភាពតានតឹងជាមួយអតិថិជន បុគ្គលិក ឬដៃគូ។", roles: ["ភាពជាដៃគូ", "ទំនាក់ទំនងអតិថិជន", "ការចចារ"] },
    Dragon: { strength: "ចក្ខុវិស័យធំទូលាយ និងសមត្ថភាពធម្មជាតិក្នុងការប្រមូលមនុស្សឱ្យឆ្ពោះទៅគោលដៅមហិច្ឆតា។", roles: ["យុទ្ធសាស្ត្រ", "ចក្ខុវិស័យ និងម៉ាកយីហោ", "ភាពជាអ្នកដឹកនាំ"] },
    Snake: { strength: "ការវិភាគយុទ្ធសាស្ត្រយ៉ាងច្បាស់ និងវិធីសាស្ត្រគណនាដោយអត់ធ្មត់ចំពោះការសម្រេចចិត្តដែលមានភាគហ៊ុនខ្ពស់។", roles: ["យុទ្ធសាស្ត្រ", "ហិរញ្ញវត្ថុ", "ការវិភាគហានិភ័យ"] },
    Horse: { strength: "ថាមពលខ្ពស់ ការអនុវត្តលឿន និងភាពស្រួលធម្មជាតិជាមួយការងារខាងមុខសាធារណៈ។", roles: ["ការលក់", "ទីផ្សារ", "ការអភិវឌ្ឍន៍អាជីវកម្ម"] },
    Goat: { strength: "ភាពច្នៃប្រឌិត និងអារម្មណ៍វិចារណញាណចំពោះម៉ាកយីហោ សោភ័ណភាព និងអ្វីដែលអតិថិជនឆ្លើយតប។", roles: ["ច្នៃប្រឌិត និងម៉ាកយីហោ", "ការអភិវឌ្ឍន៍ផលិតផល", "ការរចនា"] },
    Monkey: { strength: "ការដោះស្រាយបញ្ហាប្រកបដោយភាពច្នៃប្រឌិត និងការសម្របខ្លួនយ៉ាងលឿននៅពេលគម្រោងត្រូវផ្លាស់ប្តូរ។", roles: ["ភាពច្នៃប្រឌិតថ្មី", "ការអភិវឌ្ឍន៍ផលិតផល", "បច្ចេកវិទ្យា"] },
    Rooster: { strength: "ការយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត និងទេពកោសល្យខាងការរៀបចំ កាលវិភាគ និងការត្រួតពិនិត្យគុណភាព។", roles: ["ប្រតិបត្តិការ", "រដ្ឋបាល", "ការត្រួតពិនិត្យគុណភាព"] },
    Dog: { strength: "ភាពស្មោះត្រង់ និងភាពអាចទុកចិត្តបាន — ដៃគូដែលរក្សាការសន្យា និងការពារផលប្រយោជន៍របស់ក្រុម។", roles: ["ប្រតិបត្តិការ", "ធនធានមនុស្ស និងវប្បធម៌ក្រុម", "ទំនុកចិត្ត និងការអនុលោម"] },
    Pig: { strength: "ភាពសប្បុរស និងសភាវគតិបង្កើតទំនាក់ទំនងដែលទទួលបានសុឆន្ទៈល្អរយៈពេលវែង។", roles: ["ទំនាក់ទំនងអតិថិជន", "ភាពជាដៃគូ", "វប្បធម៌ក្រុម"] }
  }
};
