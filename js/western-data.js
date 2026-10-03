// western-data.js — Western (tropical) sun-sign + numerology data and
// calculations for the Relationship Compatibility Calculator.
// Loaded on compatibility.html only, after i18n.js.

// ---------------------------------------------------------------------------
// Sun signs
// ---------------------------------------------------------------------------
const WESTERN_SIGNS = [
  { name: "Capricorn", km: "កំពុងមករាសន៍", symbol: "♑", element: "Earth", modality: "Cardinal",
    start: [12, 22], end: [1, 19],
    traits: "Disciplined, ambitious, patient, and practical. Capricorns play the long game.",
    kmTraits: "តឹងរ៉ឹង មហិច្ឆតា អត់ធ្មត់ និងប្រាកដនិយម។ មករាសន៍លេងល្បែងវែងឆ្ងាយ។" },
  { name: "Aquarius", km: "កុម្ភះរាសន៍", symbol: "♒", element: "Air", modality: "Fixed",
    start: [1, 20], end: [2, 18],
    traits: "Independent, original, idealistic, and a little unpredictable. Values freedom and ideas.",
    kmTraits: "ឯករាជ្យ ច្នៃប្រឌិត មនោគមវិជ្ជា និងមិនអាចទាយបានខ្លះ។ ឲ្យតម្លៃសេរីភាព និងគំនិត។" },
  { name: "Pisces", km: "មិនរាសន៍", symbol: "♓", element: "Water", modality: "Mutable",
    start: [2, 19], end: [3, 20],
    traits: "Compassionate, intuitive, dreamy, and deeply emotional. Feels everything, often for others too.",
    kmTraits: "អាណិតអាសូរ សតិអារម្មណ៍ល្អ សុបិន្តនិយម និងមានអារម្មណ៍ជ្រាលជ្រៅ។" },
  { name: "Aries", km: "មេសរាសន៍", symbol: "♈", element: "Fire", modality: "Cardinal",
    start: [3, 21], end: [4, 19],
    traits: "Bold, energetic, competitive, and quick to act. Natural-born initiator.",
    kmTraits: "ក្លាហាន ច្រើនថាមពល ប្រកួតប្រជែង និងធ្វើការលឿន។ ជាអ្នកផ្តួចផ្តើមដោយធម្មជាតិ។" },
  { name: "Taurus", km: "ពិសខរាសន៍", symbol: "♉", element: "Earth", modality: "Fixed",
    start: [4, 20], end: [5, 20],
    traits: "Steady, sensual, loyal, and stubborn. Values comfort, consistency, and quality.",
    kmTraits: "នឹងនរ រំភើបអារម្មណ៍ ស្មោះត្រង់ និងរឹងរូស។ ឲ្យតម្លៃផាសុខភាព និងគុណភាព។" },
  { name: "Gemini", km: "មិថុនរាសន៍", symbol: "♊", element: "Air", modality: "Mutable",
    start: [5, 21], end: [6, 20],
    traits: "Curious, witty, sociable, and quick-minded. Thrives on variety and conversation.",
    kmTraits: "ចង់ដឹងចង់ឃើញ ឆ្លាតវៃ រួសរាយ និងគិតលឿន។ រីកចម្រើនជាមួយភាពចម្រុះ និងការសន្ទនា។" },
  { name: "Cancer", km: "កក្កដករាសន៍", symbol: "♋", element: "Water", modality: "Cardinal",
    start: [6, 21], end: [7, 22],
    traits: "Nurturing, protective, intuitive, and deeply attached to home and family.",
    kmTraits: "ចាំបីបាច់ការពារ សតិអារម្មណ៍ល្អ និងពាក់ព័ន្ធយ៉ាងជ្រាលជ្រៅនឹងផ្ទះ និងគ្រួសារ។" },
  { name: "Leo", km: "សិង្ហរាសន៍", symbol: "♌", element: "Fire", modality: "Fixed",
    start: [7, 23], end: [8, 22],
    traits: "Warm, confident, generous, and loves being seen. A natural performer and leader.",
    kmTraits: "កក់ក្តៅ ទំនុកចិត្ត សប្បុរស និងចូលចិត្តការសម្គាល់។ ជាអ្នកសំដែង និងអ្នកដឹកនាំដោយធម្មជាតិ។" },
  { name: "Virgo", km: "កញ្ញារាសន៍", symbol: "♍", element: "Earth", modality: "Mutable",
    start: [8, 23], end: [9, 22],
    traits: "Analytical, hardworking, modest, and detail-oriented. Wants things done right.",
    kmTraits: "វិភាគបានល្អ ឧស្សាហ៍ព្យាយាម សុភាពរាបសា និងយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត។" },
  { name: "Libra", km: "កញ្ជើរាសន៍", symbol: "♎", element: "Air", modality: "Cardinal",
    start: [9, 23], end: [10, 22],
    traits: "Charming, diplomatic, fair-minded, and relationship-oriented. Seeks balance and harmony.",
    kmTraits: "គួរឲ្យចង់ស្គាល់ ចារិកល្អ យុត្តិធម៌ និងផ្តោតលើទំនាក់ទំនង។ ស្វែងរកតុល្យភាព និងសុខដុម។" },
  { name: "Scorpio", km: "ភិចរាសន៍", symbol: "♏", element: "Water", modality: "Fixed",
    start: [10, 23], end: [11, 21],
    traits: "Intense, passionate, magnetic, and deeply private. All-or-nothing in love.",
    kmTraits: "ខ្លាំងក្លា ក្តៅសាច់ក្តៅចិត្ត ទាក់ទាញ និងលាក់កំបាំងយ៉ាងជ្រាលជ្រៅ។" },
  { name: "Sagittarius", km: "ធនូរាសន៍", symbol: "♐", element: "Fire", modality: "Mutable",
    start: [11, 22], end: [12, 21],
    traits: "Adventurous, optimistic, blunt, and freedom-loving. Always chasing the next horizon.",
    kmTraits: "ចូលចិត្តការងារហ្វូងហា មានទស្សនះវិជ្ជមាន ត្រង់ និងស្រលាញ់សេរីភាព។" }
];

function getSunSign(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  for (const sign of WESTERN_SIGNS) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (sm === em) {
      if (m === sm && d >= sd && d <= ed) return sign;
    } else if (sm > em) {
      // wraps year boundary (Capricorn: Dec 22 - Jan 19)
      if ((m === sm && d >= sd) || (m === em && d <= ed)) return sign;
    } else {
      if ((m === sm && d >= sd) || (m === em && d <= ed) || (m > sm && m < em)) return sign;
    }
  }
  return WESTERN_SIGNS[0];
}

// ---------------------------------------------------------------------------
// Element & modality compatibility (classic tropical-astrology lore)
// ---------------------------------------------------------------------------
const ELEMENT_COMPAT = {
  "Fire-Fire": { tier: "high", note: "Two Fire signs together means passion, spontaneity, and shared drive — but also two people who both want to lead, which can spark real friction if neither learns to yield." },
  "Fire-Earth": { tier: "medium", note: "Fire brings spark and spontaneity, Earth brings grounding and patience. It can work beautifully once each side stops trying to change the other's pace." },
  "Fire-Air": { tier: "high", note: "Air feeds Fire — this pairing tends to be exciting, talkative, and mutually energizing, with ideas and action reinforcing each other." },
  "Fire-Water": { tier: "low", note: "Fire and Water can create real intensity — passionate highs, but Water's emotional depth can feel overwhelming to Fire, and Fire's heat can feel careless to Water." },
  "Earth-Earth": { tier: "high", note: "Two Earth signs share a love of stability, loyalty, and the practical side of life — comfortable and dependable, if occasionally short on spontaneity." },
  "Earth-Air": { tier: "medium", note: "Earth wants the concrete, Air lives in ideas and possibility. Different operating speeds, but each can round out the other's blind spot." },
  "Earth-Water": { tier: "high", note: "A classically nurturing combination — Earth gives Water a stable place to land, and Water softens Earth's practicality with warmth." },
  "Air-Air": { tier: "medium", note: "Great conversation, shared curiosity, and mental connection — the risk is staying in your heads together and under-investing in emotional depth." },
  "Air-Water": { tier: "low", note: "Air can stir Water into overthinking, and Water's moods can feel unpredictable to Air's need for lightness — but when it clicks, thought and feeling balance each other well." },
  "Water-Water": { tier: "high", note: "Deep emotional understanding and intuitive closeness — the challenge is two moody signs amplifying each other's lows instead of balancing them." }
};

function elementCompat(elA, elB) {
  const key1 = elA + "-" + elB;
  const key2 = elB + "-" + elA;
  return ELEMENT_COMPAT[key1] || ELEMENT_COMPAT[key2] || { tier: "medium", note: "A workable combination with no strong built-in pull either way." };
}

const MODALITY_COMPAT = {
  "Cardinal-Cardinal": { tier: "medium", note: "Two natural initiators — great at starting things together, but both may want to be the one steering, so sharing the wheel takes active effort." },
  "Fixed-Fixed": { tier: "medium", note: "Both of you are loyal and determined once committed — the flip side is that neither backs down easily, so disagreements can get locked in." },
  "Mutable-Mutable": { tier: "high", note: "Both of you adapt easily and go with the flow — flexible and easy-going together, though the relationship may need one of you to occasionally provide direction." },
  "Cardinal-Fixed": { tier: "high", note: "One of you starts things, the other sustains them — a genuinely useful division of labor when you respect each other's role." },
  "Cardinal-Mutable": { tier: "high", note: "One leads, the other adapts — this tends to move smoothly, as long as the leading partner doesn't mistake flexibility for a lack of opinion." },
  "Fixed-Mutable": { tier: "medium", note: "One of you wants consistency, the other wants room to change course — can balance well, but Fixed may read Mutable as flaky, and Mutable may read Fixed as rigid." }
};

function modalityCompat(modA, modB) {
  const key1 = modA + "-" + modB;
  const key2 = modB + "-" + modA;
  return MODALITY_COMPAT[key1] || MODALITY_COMPAT[key2] || { tier: "medium", note: "No strong built-in pull either way." };
}

function sunSignRelation(signA, signB) {
  const el = elementCompat(signA.element, signB.element);
  const mod = modalityCompat(signA.modality, signB.modality);
  return { element: el, modality: mod };
}

// ---------------------------------------------------------------------------
// Numerology
// ---------------------------------------------------------------------------
// Method used (stated explicitly to the user): the month, day, and year are
// each reduced to a single digit separately, preserving master numbers
// 11/22/33 at every reduction step; the three reduced values are then summed
// and that total is reduced the same way. This is one common convention
// among several in use — numerologists do not all agree on a single method.

function digitSum(n) {
  return String(Math.abs(n)).split("").reduce((a, b) => a + parseInt(b, 10), 0);
}

function reducePreservingMasters(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = digitSum(n);
  }
  return n;
}

function masterDisplay(n) {
  const rootMap = { 11: 2, 22: 4, 33: 6 };
  return rootMap[n] ? `${n}/${rootMap[n]}` : String(n);
}

function calculateNumerology(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const monthReduced = reducePreservingMasters(month);
  const dayReduced = reducePreservingMasters(day);
  const yearReduced = reducePreservingMasters(digitSum(year));

  const lifePathTotal = monthReduced + dayReduced + yearReduced;
  const lifePath = reducePreservingMasters(lifePathTotal);

  const birthdayNumber = reducePreservingMasters(day);
  const attitudeNumber = reducePreservingMasters(monthReduced + dayReduced);

  return {
    month, day, year,
    monthReduced, dayReduced, yearReduced, lifePathTotal,
    lifePath, birthdayNumber, attitudeNumber
  };
}

const LIFE_PATH_ROOT = { 11: 2, 22: 4, 33: 6 };
function lifePathRoot(n) {
  return LIFE_PATH_ROOT[n] || n;
}

const LIFE_PATH_INFO = {
  1: { label: "The Leader", blurb: "Independent, driven, and happiest setting your own course rather than following someone else's." },
  2: { label: "The Peacemaker", blurb: "Diplomatic, sensitive, and most fulfilled in close, cooperative partnerships." },
  3: { label: "The Communicator", blurb: "Expressive, creative, and drawn to self-expression — needs room to play and create." },
  4: { label: "The Builder", blurb: "Practical, disciplined, and values structure, security, and doing things properly." },
  5: { label: "The Free Spirit", blurb: "Adventurous, adaptable, and allergic to routine — needs variety and freedom to feel alive." },
  6: { label: "The Nurturer", blurb: "Responsible, loving, and naturally drawn to caring for home, family, and community." },
  7: { label: "The Seeker", blurb: "Introspective, analytical, and drawn to depth, solitude, and understanding the 'why'." },
  8: { label: "The Achiever", blurb: "Ambitious, business-minded, and motivated by accomplishment, status, and material success." },
  9: { label: "The Humanitarian", blurb: "Compassionate, idealistic, and oriented toward the bigger picture over personal gain." },
  11: { label: "The Intuitive (Master Number)", blurb: "Highly sensitive and intuitive, carrying the independence of 1 with heightened spiritual and emotional perception." },
  22: { label: "The Master Builder (Master Number)", blurb: "Practical idealism — the discipline of 4 combined with a vision for large-scale, meaningful achievement." },
  33: { label: "The Master Teacher (Master Number)", blurb: "The nurturing of 6 amplified into a calling to teach, heal, or uplift on a wider scale." }
};

// Commonly cited "easy" and "friction" numerology pairings (by root number),
// used only to flavor the write-up — not a precise or authoritative science.
const NUMBER_HARMONY = {
  "1-5": "high", "1-3": "high", "1-7": "medium", "1-1": "medium",
  "2-6": "high", "2-8": "high", "2-4": "high", "2-2": "high",
  "3-9": "high", "3-5": "high", "3-3": "medium",
  "4-8": "high", "4-7": "medium", "4-4": "medium",
  "5-7": "medium", "5-5": "medium",
  "6-9": "high", "6-6": "high",
  "7-7": "medium", "7-9": "medium",
  "8-8": "medium", "9-9": "medium"
};

function numerologyRelation(lifePathA, lifePathB) {
  const rootA = lifePathRoot(lifePathA);
  const rootB = lifePathRoot(lifePathB);
  const key1 = `${rootA}-${rootB}`;
  const key2 = `${rootB}-${rootA}`;
  const tier = NUMBER_HARMONY[key1] || NUMBER_HARMONY[key2] || "medium";
  const isMasterPair = [11, 22, 33].includes(lifePathA) || [11, 22, 33].includes(lifePathB);
  return { tier, isMasterPair, rootA, rootB };
}
