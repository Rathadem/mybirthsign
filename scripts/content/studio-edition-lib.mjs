// Daily editions of the Video Studio (https://mybirthsign.com/studio/): one fresh, AI-written video plan per zodiac
// animal per calendar day, saved so it never changes on refresh. Shared by
//   - the Studio page (embedded by scripts/content/build-video-tool.mjs, wrapped as the EDITION object), and
//   - the Netlify function netlify/functions/studio-edition.mjs (imports it).
// No Node imports apart from video-pack-lib.mjs (also browser code), so the same text runs on both sides.
//
// What is decided here, by code, never by the AI:
//   - the day's theme (weekday rotation, Khmer festivals, full moons, Chinese New Year),
//   - the scene structure for 30 / 60 / 90 seconds (hook, Chanda's introduction, the guardian's action and magical
//     moment, the blessing, the closing),
//   - the character lines that keep @Chanda and the 12 saved Flow guardians exactly as they are,
//   - Chanda's fixed voice, the voice-length limits and the safety words.
// What the AI writes (fresh each day, checked against recent editions): the story, the Khmer and English lines, the
// settings, actions, camera moves and sound.
import { STYLE, VOICE_KM, VOICE_EN, HOST_LOOK, LOOK, FLOW_NAME, alive, kmFlow, SYMBOL, LOCK_HOST, lockAnimal, TIME_SAY, enSpoken } from "./video-pack-lib.mjs";

export const ED_ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
// traditional zodiac year names, the same as js/i18n.js KM_ANIMAL_NAMES
export const ED_KM = { Rat: "ជូត", Ox: "ឆ្លូវ", Tiger: "ខាល", Rabbit: "ថោះ", Dragon: "រោង", Snake: "ម្សាញ់", Horse: "មមី", Goat: "មមែ", Monkey: "វក", Rooster: "រកា", Dog: "ច", Pig: "កុរ" };
export const ED_LENGTHS = [30, 60, 90];
export const ED_DEFAULT_LENGTH = 60;
export const ED_TZ = "Asia/Phnom_Penh";   // the website's own day; the Studio lets the owner pick another

// ------------------------------------------------------------------ themes
// Seven weekday themes, each with four variations: the same weekday shows a different variation each week, so one exact
// theme comes back only every four weeks. Festivals, Chinese New Year and full moons replace the weekday theme.
const W = (id, en, km, angle, light, music) => ({ id, en, km, angle, light, music });
export const ED_WEEKDAY = [
  // Sunday (getUTCDay() === 0)
  [W("renewal", "Renewal, Peace and Positive Energy", "ការចាប់ផ្ដើមថ្មី សន្តិភាព និងថាមពលវិជ្ជមាន", "a fresh start, calm and hope for the week ahead", "misty blue dawn turning gold", "slow, airy and hopeful"),
   W("rest", "Rest, Calm and a Fresh Start", "ការសម្រាក ភាពស្ងប់ និងការចាប់ផ្ដើមថ្មី", "slowing down, resting well and starting again with a clear heart", "soft silver morning mist over still water", "gentle, slow and soothing"),
   W("letgo", "Letting Go and Moving Forward", "ការលែងគិតរឿងចាស់ និងបោះជំហានទៅមុខ", "leaving old worries behind and stepping forward lightly", "clearing rain clouds and the first warm sunbeams", "light, rising and freeing"),
   W("balance", "Balance and Inner Light", "តុល្យភាព និងពន្លឺក្នុងចិត្ត", "balance between work, family and rest, and a calm inner light", "quiet twilight with lotus lamps on the water", "calm, warm and balanced")],
  // Monday
  [W("wealth", "Golden Wealth and Prosperity", "ទ្រព្យមាស និងភាពរុងរឿង", "prosperity, good trade and wise use of money", "rich golden-hour sunset light", "bright, warm and festive"),
   W("saving", "Steady Income and Wise Saving", "ប្រាក់ចំណូលនឹងនរ និងការសន្សំដោយប្រាជ្ញា", "steady income, patient saving and careful spending", "calm amber evening light and lanterns", "steady, warm and confident"),
   W("trade", "Good Customers and Busy Trade", "អតិថិជនល្អ និងការលក់ដូរល្អ", "a busy, honest shop, kind customers and good deals", "warm market lanterns at dusk", "lively, cheerful and bright"),
   W("harvest", "Hard Work That Turns to Gold", "ការខិតខំដែលក្លាយជាមាស", "patient effort that grows into a golden harvest", "golden sunrise over rice fields", "rhythmic, hopeful and proud")],
  // Tuesday
  [W("courage", "Courage and Protection", "ភាពក្លាហាន និងការការពារ", "courage, protection and standing strong", "dramatic dusk with glowing protective light", "bold drums, heroic and warm"),
   W("challenge", "Strength to Face New Challenges", "កម្លាំងចិត្តប្រឈមនឹងបញ្ហាថ្មី", "meeting a new challenge with a strong, calm heart", "wind and passing storm clouds lit gold", "rising, brave and determined"),
   W("shield", "A Shield for Home and Family", "ខែលការពារផ្ទះ និងគ្រួសារ", "keeping home and family safe and warm", "deep blue night with a warm golden glow", "protective, warm and steady"),
   W("calmbrave", "Brave Hearts, Calm Minds", "ចិត្តក្លាហាន គំនិតស្ងប់", "being brave without anger, calm under pressure", "moonlit mist and soft silver light", "calm, deep and confident")],
  // Wednesday
  [W("love", "Love and Relationships", "ស្នេហា និងទំនាក់ទំនង", "love, care and close relationships", "soft pink and violet twilight", "tender, romantic and light"),
   W("harmony", "Kind Words and Sweet Harmony", "ពាក្យពេចន៍ទន់ភ្លន់ និងភាពចុះសម្រុង", "kind words that bring harmony at home and work", "warm rose light with floating lanterns", "sweet, gentle and harmonious"),
   W("friendship", "Friendship and Loyal Hearts", "មិត្តភាព និងចិត្តស្មោះ", "loyal friends, teamwork and trust", "bright starry night with fireflies", "friendly, warm and playful"),
   W("reconcile", "Mending Misunderstandings", "ការផ្សះផ្សាការយល់ច្រឡំ", "patience, listening and mending small misunderstandings", "gentle rain ending in a moonlit sky", "soft, healing and hopeful")],
  // Thursday
  [W("wisdom", "Wisdom and Success", "ប្រាជ្ញា និងភាពជោគជ័យ", "wise choices that lead to success", "clear starry night with a bright moon", "elegant, thoughtful and inspiring"),
   W("study", "Learning and Clear Thinking", "ការសិក្សា និងគំនិតភ្លឺថ្លា", "learning, study and a clear, focused mind", "calm lamplight and a quiet blue night", "focused, light and bright"),
   W("plans", "Smart Plans and New Opportunities", "ផែនការឆ្លាតវៃ និងឱកាសថ្មី", "planning well and noticing new opportunities", "dawn breaking behind the temple towers", "optimistic, building and bright"),
   W("mentors", "Good Teachers and Helpful Mentors", "គ្រូល្អ និងអ្នកណែនាំល្អ", "respect for teachers and help from wise people", "warm candle-gold light in carved galleries", "respectful, warm and graceful")],
  // Friday
  [W("happiness", "Happiness and Good Fortune", "សុភមង្គល និងសំណាងល្អ", "joy, gratitude and small strokes of good luck", "festive lantern night with golden sparkles", "joyful, bright and celebratory"),
   W("joy", "Joy, Laughter and Lucky Surprises", "សេចក្ដីរីករាយ សំណើច និងការភ្ញាក់ផ្អើលដ៏សំណាង", "laughter and pleasant surprises", "colorful sky lanterns and fireworks", "playful, sparkling and upbeat"),
   W("celebrate", "Celebrations with Friends", "ការអបអរជាមួយមិត្តភក្ដិ", "sharing happy moments with friends", "warm lights over the lotus lake", "festive, friendly and lively"),
   W("littleblessings", "Little Blessings in Everyday Life", "ពរជ័យតូចៗក្នុងជីវិតប្រចាំថ្ងៃ", "noticing the small good things each day", "soft golden afternoon light", "light, sweet and warm")],
  // Saturday
  [W("family", "Wealth, Family and Blessings", "ទ្រព្យ គ្រួសារ និងពរជ័យ", "a blessed home, family harmony and shared prosperity", "warm sunrise over the temple", "warm, rich and uplifting"),
   W("home", "A Warm and Happy Home", "ផ្ទះកក់ក្ដៅ និងរីករាយ", "a peaceful, cheerful home", "cozy lantern glow at dusk", "cozy, gentle and happy"),
   W("gratitude", "Gratitude to Parents and Elders", "ការដឹងគុណឪពុកម្ដាយ និងចាស់ទុំ", "thanking parents and elders, respect and care", "soft golden evening light", "tender, respectful and warm"),
   W("sharing", "Sharing Good Fortune with Loved Ones", "ចែករំលែកសំណាងល្អជាមួយមនុស្សជាទីស្រឡាញ់", "generosity and sharing good fortune", "bright moonrise with lotus lamps", "generous, warm and bright")],
];
// special days (ids from js/khmer-events.js). Only cultural and Buddhist celebrations: political and national days keep
// the weekday theme. Buddhist days get a calm, respectful theme.
export const ED_SPECIAL = {
  newyear: W("khmer-new-year", "Khmer New Year Blessings", "ពរជ័យបុណ្យចូលឆ្នាំខ្មែរ", "Khmer New Year: welcoming the new year, family, respect for elders and fresh blessings", "bright festive sunshine and evening lanterns", "festive, joyful and traditional"),
  water: W("water-festival", "Water Festival Joy", "សេចក្ដីរីករាយបុណ្យអុំទូក", "the Water Festival: boats on the river, moonlight, gratitude to the water and the moon", "full moon over the river with floating lights", "festive, rhythmic and celebratory"),
  pchumben: W("pchum-ben", "Pchum Ben: Gratitude to Ancestors", "ភ្ជុំបិណ្ឌ៖ ការដឹងគុណដូនតា", "Pchum Ben: remembering and thanking ancestors with a calm, grateful heart", "soft dawn light and quiet candle glow", "calm, respectful and gentle"),
  kanben: W("kan-ben", "Kan Ben: A Season of Gratitude", "កាន់បិណ្ឌ៖ រដូវនៃការដឹងគុណ", "the Kan Ben days: gratitude, family and kindness", "quiet dawn with candle glow", "calm, respectful and gentle"),
  visak: W("visak-bochea", "Visak Bochea: Peace and Kindness", "វិសាខបូជា៖ សន្តិភាព និងចិត្តមេត្តា", "Visak Bochea: peace, kindness and a calm mind (respectful, no magic near sacred images)", "full moon and soft candle light", "calm, peaceful and gentle"),
  meak: W("meak-bochea", "Meak Bochea: Peace and Good Deeds", "មាឃបូជា៖ សន្តិភាព និងអំពើល្អ", "Meak Bochea: peace, good deeds and harmony (respectful, no magic near sacred images)", "full moon and soft candle light", "calm, peaceful and gentle"),
  asalha: W("asalha-puja", "Asalha Puja: Wisdom and Calm", "អាសាឡ្ហបូជា៖ ប្រាជ្ញា និងភាពស្ងប់", "Asalha Puja: wisdom, calm and good intentions (respectful)", "full moon and soft candle light", "calm, peaceful and gentle"),
  cholvassa: W("chol-vassa", "Chol Vassa: Patience and Good Intentions", "ចូលព្រះវស្សា៖ ការអត់ធ្មត់ និងបំណងល្អ", "the start of the rainy retreat season: patience and good intentions (respectful)", "gentle rain and warm candle light", "calm, gentle and warm"),
  chenhvassa: W("chenh-vassa", "Chenh Vassa: Light After the Rain", "ចេញព្រះវស្សា៖ ពន្លឺក្រោយរដូវភ្លៀង", "the end of the rainy retreat season: brightness, generosity and new beginnings (respectful)", "clear sky after rain and warm lamps", "bright, warm and hopeful"),
  ploughing: W("royal-ploughing", "A Good Harvest Ahead", "សង្ឃឹមលើការប្រមូលផលល្អ", "the season of ploughing and planting: hope for a good harvest", "golden morning over green rice fields", "rhythmic, hopeful and earthy"),
  newyearday: W("new-year-day", "A Bright New Year", "ឆ្នាំថ្មីភ្លឺស្វាង", "the first day of the international new year: fresh goals and hope", "night fireworks over the temple", "festive, sparkling and hopeful"),
};
export const ED_CNY = W("chinese-new-year", "Chinese New Year Good Fortune", "សំណាងល្អបុណ្យចូលឆ្នាំចិន", "Chinese New Year: welcoming the new zodiac year with red and gold, family and good wishes", "red lanterns and golden fireworks at night", "festive, joyful, drums and bells");
export const ED_CNY_EVE = W("chinese-new-year-eve", "Chinese New Year's Eve", "ថ្ងៃមុនចូលឆ្នាំចិន", "the eve of Chinese New Year: tidy homes, family reunion and readiness for luck", "red lanterns at dusk", "warm, festive and expectant");
export const ED_FULLMOON = W("full-moon", "Full Moon Blessings", "ពរជ័យថ្ងៃពេញបូណ៌មី", "the full moon (a holy day): calm, gratitude and bright wishes", "an enormous bright full moon over still water", "calm, glowing and magical");
const SPECIAL_ORDER = ["newyear", "water", "pchumben", "visak", "meak", "asalha", "chenhvassa", "cholvassa", "kanben", "ploughing", "newyearday"];

const epochDay = (iso) => Math.round(Date.parse(iso + "T00:00:00Z") / 86400000);
const addDays = (iso, n) => new Date(Date.parse(iso + "T00:00:00Z") + n * 86400000).toISOString().slice(0, 10);
// ctx (all optional): { events: [ids from MBSKhmerEvents.eventsOn(iso)], fullMoon: bool, cny: { "2027": "02-06", ... } }
export function dailyTheme(iso, ctx = {}) {
  const wd = new Date(iso + "T00:00:00Z").getUTCDay();
  const week = Math.floor((epochDay(iso) + 4) / 7);   // the week number (weeks start on Sunday)
  const base = ED_WEEKDAY[wd][((week % 4) + 4) % 4];
  const ev = (ctx.events || []).filter((e) => ED_SPECIAL[e]).sort((a, b) => SPECIAL_ORDER.indexOf(a) - SPECIAL_ORDER.indexOf(b));
  const y = iso.slice(0, 4), cny = ctx.cny && ctx.cny[y] ? `${y}-${ctx.cny[y]}` : null;
  let t = base, kind = "weekday", note = "";
  if (ev.length) { t = ED_SPECIAL[ev[0]]; kind = "festival"; note = "Special day: " + t.en; }
  else if (cny && iso === cny) { t = ED_CNY; kind = "cny"; note = "Chinese New Year"; }
  else if (cny && iso === addDays(cny, -1)) { t = ED_CNY_EVE; kind = "cny"; note = "Chinese New Year's Eve"; }
  else if (ctx.fullMoon) { t = ED_FULLMOON; kind = "fullmoon"; note = "Full moon"; }
  return { ...t, kind, weekday: base.id, note, events: ev };
}

// ------------------------------------------------------------------ guardians
// Each guardian keeps its saved look (Flow character @<Animal>); these are only story ingredients and one example of a
// signature magical moment (from the owner's brief, 12/11/2026), to inspire new actions, never to be copied.
export const ED_GUARDIAN = {
  Rat: { motifs: "glowing hidden treasure, clever discoveries, secret paths, coins of light, lantern light", example: "discovers a glowing treasure and sends sparkling golden light toward the viewer" },
  Ox: { motifs: "steady golden footsteps, rice fields, a bronze temple bell, earth energy, the harvest", example: "walks forward with powerful golden energy, symbolizing stability and prosperity" },
  Tiger: { motifs: "magical mist, a glowing protective aura, the jungle at the temple's edge, fire-gold flowers", example: "appears through magical mist with glowing protective energy" },
  Rabbit: { motifs: "pink lotus petals, gentle healing light, the moon, jade, silver moonlight", example: "releases beautiful pink lotus petals and gentle healing light" },
  Dragon: { motifs: "the full moon, a glowing pearl, clouds and rain, golden energy, flight", example: "flies around the full moon, gathers golden energy and releases a golden blessing toward the viewer" },
  Snake: { motifs: "elegant ribbons of golden energy, temple towers, circles of silver light, calligraphy of light", example: "creates elegant ribbons of golden energy around the temple" },
  Horse: { motifs: "a golden landscape, the open road, wind, sparks under hooves, freedom", example: "gallops through a magical golden landscape" },
  Goat: { motifs: "a peaceful garden, glowing flowers, a mountain meadow, soft music, kindness", example: "creates a peaceful garden filled with glowing flowers" },
  Monkey: { motifs: "graceful magical leaps, sparkling golden light, a golden staff, playful tricks", example: "performs a graceful magical leap and releases sparkling golden light" },
  Rooster: { motifs: "the sunrise, radiant golden light, feathers of light, a morning bell, a bright new day", example: "welcomes the sunrise with radiant golden light" },
  Dog: { motifs: "a protective golden shield, the gate of a home, a loyal watch, warm hearth light", example: "creates a protective golden shield" },
  Pig: { motifs: "a magical treasure of golden coins, a generous feast, a happy home, abundance", example: "reveals a magical treasure filled with golden coins" },
};

// ------------------------------------------------------------------ scene structure
// Every clip is 10 seconds (the length Flow and Omni handle best, and the length the voice limits are set for).
// on = Chanda on camera with lip-sync; refs = the saved characters added as ingredients.
const R = (role, label, on, task) => ({ role, label, on, task });
const PLANS = {
  30: [R("hook", "Opening hook and Chanda's welcome", true, "Chanda on camera opens with a striking hook and names today's sign and theme; the guardian and the animal appear behind her."),
       R("moment", "The guardian's magical moment", false, "The guardian and the animal perform today's signature magical action, from first spark to full magic."),
       R("closing", "Blessing and goodbye", true, "The magic turns into a blessing for the viewer; Chanda on camera gives the blessing (lucky items if allowed) and a short warm goodbye.")],
  60: [R("hook", "Opening hook", false, "A striking, mysterious first image of the guardian and the animal that makes viewers stay; Chanda's voice asks a question or teases the magic."),
       R("intro", "Chanda's introduction", true, "Chanda on camera greets the viewer warmly in Khmer style, names the sign and today's theme in one short line."),
       R("action", "The guardian's special action", false, "The guardian and the animal begin today's special action: the story's first step."),
       R("moment", "The magical moment", false, "The climax: the signature magical moment, big and beautiful."),
       R("blessing", "The blessing", false, "The magic flows toward the viewer as a blessing; Chanda's voice gives the blessing and, if allowed, today's lucky color, time and number."),
       R("closing", "Closing message", true, "Chanda on camera with the guardian and the animal: a short positive closing message and goodbye.")],
  90: [R("hook", "Opening hook", false, "A striking, mysterious first image of the guardian and the animal; Chanda's voice teases the story."),
       R("intro", "Chanda's introduction", true, "Chanda on camera greets the viewer, names the sign and today's theme."),
       R("story", "The story begins", false, "The small story of the day begins: a problem, a wish or a discovery."),
       R("action", "The guardian's special action", false, "The guardian and the animal act to help: the special action begins."),
       R("moment", "The magical moment", false, "The climax: the signature magical moment."),
       R("meaning", "What it means today", false, "A calm image that shows the meaning of the story for the viewer's day."),
       R("blessing", "The blessing", false, "The magic flows toward the viewer as a blessing."),
       R("lucky", "Today's lucky signs", false, "Chanda's voice gives today's lucky color, time and number (if allowed) while the magic shows them."),
       R("closing", "Closing message", true, "Chanda on camera with the guardian and the animal: a positive closing message and goodbye.")],
};
export function scenePlan(length = ED_DEFAULT_LENGTH) {
  const L = PLANS[length] ? length : ED_DEFAULT_LENGTH;
  return PLANS[L].map((r, i) => ({ n: i + 1, role: r.role, label: r.label, onCam: r.on, task: r.task, start: i * 10, end: i * 10 + 10, dur: 10 }));
}

// ------------------------------------------------------------------ variety: seeded sparks and places
export function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
const SPARKS = ["a lantern that will not light until someone smiles", "a lotus that opens at the wrong hour", "a message carried by fireflies", "a bridge made of moonlight", "an old temple bell that wants to ring again", "a seed that grows into a tree in one night", "a paper boat with a wish written inside", "a kite caught on a temple tower", "a river that sings when the wind blows", "a star that falls into the lotus pond", "a door of light in an ancient wall", "a map drawn by the moon on the water", "a shy little bird that cannot fly yet", "a jar of golden rice that never empties", "a sleepy cloud that blocks the moon", "footprints of light leading to a secret garden", "a broken flute that plays again", "a rain of petals from a clear sky", "a mirror pool that shows tomorrow's sunrise", "a wind chime that calls lost friends home", "a tiny lantern boat lost on a big lake", "a golden key found in the roots of a banyan tree", "a candle that grows brighter with each kind word", "a rainbow that appears at night", "a gate that opens only for patient hearts", "a mango tree full of glowing fruit", "a drum whose beat makes flowers bloom", "a basket of wishes left at the temple steps", "a stone lion that blinks awake", "a silk scarf carried away by the wind", "a pathway of stepping stones that light up one by one", "a wish written in the sand by the river", "an old coin that shines when held by an honest hand", "a nest of baby birds in a temple carving", "a ripple on the water that keeps growing", "a sky lantern carrying a family's wish", "a sunrise that comes early to greet someone", "a garden that blooms at the sound of laughter", "a scroll that writes itself in golden light", "a lost bell from a boat race", "a moonbeam that turns into a staircase", "a gentle storm that waters a dry field", "a firefly that leads the way through mist", "a bowl of water that holds the whole moon", "an apsara carving that seems to dance", "a lotus bud holding a single drop of gold", "a market stall that glows with good luck", "a rope bridge across a jungle waterfall", "a ring of lanterns that lifts into the sky", "a pearl hidden inside a lotus"];
export const ED_PLACES = ["the stone causeway with carved naga balustrades", "among the giant roots of an ancient banyan tree with fireflies", "a wooden pier on a wide lotus lake", "a garden of white jasmine and frangipani", "a high tower terrace with carved apsara reliefs", "a courtyard with stone lions and rows of oil lamps", "golden rice fields near the temple", "a river with floating lotus lamps", "a jungle waterfall near the temple", "a lantern-lit market street beside the temple", "the temple's long carved gallery", "a moat with sky lanterns rising", "a hilltop above the temple at sunrise", "a reflecting pool with pink lotus flowers", "a misty bamboo grove", "a sandstone library building in the temple grounds", "the top of the temple's main staircase", "a lily-covered pond in the rain", "a field of fireflies at the jungle edge", "a riverside boat landing with decorated boats"];
// n distinct items picked by a seed, avoiding any in `avoid`
export function pickSeeded(list, seed, n, avoid = []) {
  const out = []; let s = seed || 1;
  for (let i = 0; out.length < n && i < list.length * 3; i++) {
    s = Math.imul(s ^ (s >>> 15), 2246822507) >>> 0; s = (s ^ (s >>> 13)) >>> 0;
    const x = list[s % list.length];
    if (!out.includes(x) && !avoid.some((a) => a && similar(a, x) > 0.5)) out.push(x);
  }
  return out;
}

// ------------------------------------------------------------------ similarity (to keep every day new)
const STOP = new Set(("a an the and or of to in on at for with from by as is are be its it this that his her their they them into over under up down out today day your you our we " +
  "golden gold light glowing magical magic guardian chanda viewer clip scene temple moment " + ED_ANIMALS.join(" ").toLowerCase()).split(" "));
const stem = (w) => w.length > 4 ? w.replace(/(ing|ed|es|s)$/, "") : w;
const words = (t) => String(t || "").toLowerCase().replace(/[^a-z0-9ក-៿ ]+/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w)).map(stem);
function grams(w, k) { const s = new Set(); if (k === 1 || w.length < k) { w.forEach((x) => s.add(x)); return s; } for (let i = 0; i + k <= w.length; i++) s.add(w.slice(i, i + k).join(" ")); return s; }
const overlap = (A, B) => { if (!A.size || !B.size) return 0; let n = 0; A.forEach((x) => { if (B.has(x)) n++; }); return n / Math.min(A.size, B.size); };
// 0 = nothing in common, 1 = the same idea: half shared words, half shared word pairs (catches reworded repeats)
export function similar(a, b) {
  const wa = words(a), wb = words(b);
  return Math.round((overlap(grams(wa, 1), grams(wb, 1)) * 0.5 + overlap(grams(wa, 2), grams(wb, 2)) * 0.5) * 100) / 100;
}
// the parts of a plan that make it "the same story"
export const planPrint = (p) => [p.title && p.title.en, p.logline, p.guardianMoment, p.beats && p.beats.join(" ")].filter(Boolean).join(" · ");
export const scenePrint = (s) => [s.setting, s.action].filter(Boolean).join(" · ");
export const ED_SIMILAR = 0.34;   // above this overlap a new idea counts as a repeat

// ------------------------------------------------------------------ checks
export const ED_LIMIT = { enWords: 23, kmChars: 125 };   // a 10-second clip at Chanda's calm pace (same as the daily pack)
const BANNED_EN = /\b(lottery|lotto|gambl\w*|betting|bet on|jackpot|casino|guarantee\w*|will definitely|100 ?%|get rich|curse\w*|death|die|disaster|cure\w*|diagnos\w*)\b/i;
const BANNED_KM = /ឆ្នោត|ល្បែង|ភ្នាល់|កាស៊ីណូ|ធានា ?១០០|ស្លាប់|គ្រោះមហន្តរាយ|បណ្ដាសា/;
// the AI must not redesign the saved characters
const LOOK_WORDS = /\b(wearing|dressed in|new (outfit|costume|armou?r|look)|(his|her|its|their) (armou?r|robe|robes|hair|hairstyle|face|costume|outfit|dress|helmet) (is|are|turns|changes|becomes)|changes? (color|colour|shape)|transforms? into a (human|person|different))\b/i;
export function checkScene(sc, o = {}) {
  const w = [];
  const en = String(sc.en || ""), km = String(sc.km || "");
  if (!km.trim()) w.push("Khmer line is empty");
  if (!en.trim()) w.push("English line is empty");
  if (enSpoken(en) > ED_LIMIT.enWords) w.push(`English line is ${enSpoken(en)} words; at most ${ED_LIMIT.enWords} fit 10 seconds`);
  const kc = [...kmFlow(km)].length;
  if (kc > ED_LIMIT.kmChars) w.push(`Khmer line is ${kc} characters when spoken; at most ${ED_LIMIT.kmChars} fit 10 seconds`);
  const all = [sc.en, sc.setting, sc.action, sc.image, sc.sound].join(" ");
  if (BANNED_EN.test(all) || BANNED_KM.test(km)) w.push("uses a word the Studio avoids (luck promises, gambling, death or medical words)");
  if (LOOK_WORDS.test([sc.setting, sc.action, sc.image].join(" "))) w.push("may describe or change a character's look (the saved Flow characters must stay as they are)");
  if (o.noNumbers && /\d/.test(en + km)) w.push("gives numbers on a take-it-easy day (that sign gets no lucky numbers)");
  return w;
}

// ------------------------------------------------------------------ prompt text the user copies
// the series style for daily editions: the same characters, realism and safety rules as the daily pack (STYLE), but the
// place and the light are set by each scene, so every day can look different
const SETTING_RE = /Setting: [^.]*\.( A living, magical sky in every shot: [^.]*\.)?/;
export const ED_STYLE = SETTING_RE.test(STYLE)
  ? STYLE.replace(SETTING_RE, "Setting: the magical world of a majestic Khmer temple inspired by Angkor Wat and the land around it (lotus ponds, causeways, rivers, jungle, rice fields and gardens); each scene says where it is, the time of day and the light, and the sky is always alive (drifting clouds, twinkling stars or moving light).")
  : STYLE;
export const ED_VOICE = { km: VOICE_KM.replace(/,$/, ""), en: VOICE_EN };
const refLine = (animal, host) => `${host ? "Chanda is the saved Flow character @Chanda; " : ""}the ${animal.toLowerCase()} and its guardian are the saved Flow character ${FLOW_NAME(animal)}.`;
export function refsFor(animal, onCam, host) {
  const r = [{ name: FLOW_NAME(animal), what: `the ${animal} guardian with their ${animal.toLowerCase()}`, pic: `characters/${animal.toLowerCase()}.jpg` }];
  if (onCam || host) r.unshift({ name: "@Chanda", what: "the presenter", pic: "characters/chanda.jpg" });
  return r;
}
// the full image and video prompts, built from the AI's scene parts and the fixed character lines
export function assemble(animal, sc) {
  const host = !!sc.onCam;
  const who = host ? `${HOST_LOOK.split(",")[0]} (the presenter) and ${LOOK[animal]}` : LOOK[animal];
  const locks = `${host ? LOCK_HOST + " " : ""}${lockAnimal(animal)}`;
  const image = `Create a photorealistic still frame, vertical 9:16, from a high-budget fantasy epic that blends Khmer royal heritage with a Chinese historical fantasy drama. In frame: ${who}. ${cap(sc.image || sc.action || "")} ${cap(sc.setting || "")} Use the saved character pictures as references and keep the faces, armor, costumes, colors and the animal exactly as they are; never redesign them. ${refLine(animal, host)} Physically real light, cinematic depth of field, ultra-detailed. No text, no letters, no watermark, no logo, no cartoon or plastic look.`.replace(/\s+/g, " ").replace(/\.\./g, ".");
  const video = `${cap(sc.setting || "")} ${cap(sc.action || "")} Camera: ${sc.camera || "a smooth, slow cinematic move"}. ${host ? "Chanda faces the camera and speaks to the viewer with natural lip movements and small, friendly hand gestures; the guardian and the animal stay beside her and act without speaking. " : ""}${alive(animal)} ${locks} Sound: ${sc.sound || "gentle magical music"}.`.replace(/\s+/g, " ").replace(/\.\./g, ".");
  return { image, video };
}
function cap(s) { s = String(s || "").trim(); if (!s) return ""; s = s[0].toUpperCase() + s.slice(1); return /[.!?]$/.test(s) ? s : s + "."; }
// what "Copy + Khmer voice" / "Copy + English voice" puts on the clipboard for Google Flow / Omni
export function flowText(animal, sc, lang, wide = false) {
  const style = wide ? ED_STYLE.replace("Vertical 9:16.", "Horizontal 16:9 (standard YouTube video).") : ED_STYLE;
  const line = lang === "km" ? kmFlow(sc.km || "") : String(sc.en || "").trim();
  const audio = `Audio: Chanda's voice, ${ED_VOICE[lang === "km" ? "km" : "en"]}. ${sc.onCam ? "Chanda is on camera and speaks to the viewer with natural lip movements that match her words." : "Chanda is heard as a voice-over only: she is not on screen, and no one on screen speaks or moves their mouth."} She says${lang === "km" ? " in Khmer" : ""}: "${line}" Music and sound: ${sc.sound || "gentle magical music"}. No other voices: the guardian and the animal never speak.`;
  return `${style}\n\n${sc.video || assemble(animal, sc).video}\n\n${audio}`;
}

// ------------------------------------------------------------------ the AI's instructions
export function systemPrompt() {
  return `You are the head writer of the MyBirthSign Zodiac Studio (mybirthsign.com), which makes a short, magical video every day for each of the 12 Chinese zodiac signs for Cambodian viewers on Facebook, TikTok and YouTube.
THE CAST (fixed, saved in Google Flow; never describe or change how they look)
- Chanda (ចន្ទា), a young Cambodian woman, the presenter. She is the only one who speaks.
- Twelve zodiac guardians, saved as @Rat, @Ox, @Tiger, @Rabbit, @Dragon, @Snake, @Horse, @Goat, @Monkey, @Rooster, @Dog and @Pig: each one is a guardian warrior together with their animal. They act and do magic but never speak or move their mouths.
- Never describe faces, hair, armor, clothes, colors or size of Chanda, a guardian or an animal, and never give them new costumes: call them "Chanda", "the guardian" and "the <animal>" only.
STYLE
- Photorealistic fantasy epic that blends Khmer royal heritage with a Chinese fantasy drama; a temple inspired by Angkor Wat and the land around it; golden magic, lotus flowers, lanterns, mist; graceful wire-fu moves.
- Respectful of Khmer culture and Buddhism: temples are only settings; never put the Buddha, monks or sacred statues into magic tricks; no fighting between characters, no blood, injury or horror.
- Traditional entertainment, warm and encouraging. Never promise outcomes. Never use: guaranteed, will definitely, 100%, destined, cure, lottery, gambling, betting, jackpot, get rich, curse, death, disaster. No medical, legal or money advice.
LANGUAGE
- Khmer: natural, warm, modern spoken Khmer, as a native speaker from Phnom Penh would say it on video to friends; simple everyday words, correct spelling, no English words. Write it first, as Khmer, not as a translation. Use the Khmer zodiac year names (ជូត ឆ្លូវ ខាល ថោះ រោង ម្សាញ់ មមី មមែ វក រកា ច កុរ). Numbers in Western digits (7, not ៧).
- English: a natural English version with the same meaning (not word for word).
FRESH EVERY DAY
- Each episode must have its own new story, new places, new light and new magic. Never reuse the recent ideas you are given, and never copy the example moment: invent a new one in the same spirit.
OUTPUT: answer only by filling in the tool you are given (no other text). Keep every field short and concrete.`;
}
const dmy = (iso) => iso.split("-").reverse().join("/");
const WD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export function luckyLine(f) {
  if (!f) return "";
  if (f.tier === "caution") return `Today the ${f.animal || "sign"} should take it easy: a gentle, calm, protective episode. NO lucky numbers, no promises; comfort and encourage.`;
  const t = f.time && TIME_SAY[f.time];
  return `Today's rating: ${f.label && f.label.en || f.tier}. Lucky color: ${f.color && f.color.en} (${f.color && f.color.km}). Lucky time: ${f.time}${t ? ` (say "${t[0]}" / "${t[1]}")` : ""}. Lucky direction: ${f.direction && f.direction.en} (${f.direction && f.direction.km}). Lucky numbers: ${(f.digits || []).join(", ")}. Harmony sign today: ${f.helper || ""}.`;
}
export function planPrompt(x) {
  const { iso, animal, theme, facts, length, avoid = [], today = [], seed = 1, retryNote = "" } = x;
  const G = ED_GUARDIAN[animal], plan = scenePlan(length);
  const sparks = pickSeeded(SPARKS, seed, 3, avoid), places = pickSeeded(ED_PLACES, seed ^ 0x9e3779b9, 4, avoid);
  return `Write today's episode plan.
Date: ${WD[new Date(iso + "T00:00:00Z").getUTCDay()]} ${dmy(iso)}. Sign: ${animal} (Khmer ${ED_KM[animal]}).
Theme of the day: ${theme.en} (${theme.km}): ${theme.angle}.${theme.note ? " " + theme.note + "." : ""} Light and mood ideas: ${theme.light}; music mood: ${theme.music}.
The ${animal}: ${SYMBOL[animal].en}${facts && facts.traits ? " Traits: " + facts.traits : ""}
${luckyLine(facts)}
Story ingredients for the ${animal} guardian (use freely): ${G.motifs}. Example of a signature moment (do NOT copy it, invent a new one in the same spirit): the ${animal.toLowerCase()} ${G.example}.
Today's random sparks (use one if it helps the story): ${sparks.join("; ")}. Places to consider: ${places.join("; ")}.
Video: ${length} seconds, ${plan.length} clips of 10 seconds:
${plan.map((s) => `${s.n}. ${s.label}${s.onCam ? " (Chanda on camera)" : " (Chanda's voice only)"}: ${s.task}`).join("\n")}
${avoid.length ? `Recent ideas for the ${animal} (do not repeat them, their places or their magic):\n${avoid.slice(0, 12).map((a) => "- " + a).join("\n")}\n` : ""}${today.length ? `Other signs today already use (choose something different):\n${today.slice(0, 11).map((a) => "- " + a).join("\n")}\n` : ""}${retryNote ? retryNote + "\n" : ""}Answer with the tool write_episode_plan: a short title (English and Khmer), the story in one sentence, the hook, the new signature magical moment (one or two sentences), the blessing and the closing message (each one sentence, in English and in natural Khmer), the music, and exactly ${plan.length} beats (one short sentence each, what happens in each clip).`;
}
export function scenePrompt(x) {
  const { iso, animal, theme, facts, ep, index, avoid = [], note = "" } = x;
  const sc = ep.scenes[index], prev = ep.scenes[index - 1], next = ep.scenes[index + 1];
  const noNum = facts && facts.tier === "caution";
  const luckyAsk = /blessing|lucky|closing/.test(sc.role) && !noNum
    ? (sc.role === "blessing" || sc.role === "lucky" || ep.scenes.length === 3 ? "Weave in today's lucky color and lucky time naturally (and one lucky number only if it fits the time limit)." : "")
    : noNum ? "No numbers at all (take-it-easy day)." : "";
  return `Write clip ${sc.n} of ${ep.scenes.length} of today's ${animal} episode.
Date: ${dmy(iso)}. Theme: ${theme.en} (${theme.km}).
Episode: "${ep.title.en}" — ${ep.logline}
Signature moment: ${ep.guardianMoment}
Blessing: ${ep.blessing.en} / Closing: ${ep.closing.en}
Music for the episode: ${ep.music}
${luckyLine(facts)}
This clip (${sc.start}–${sc.end} s, 10 seconds): ${sc.label}. ${sc.onCam ? "Chanda is ON CAMERA and speaks to the viewer (lip-sync); the guardian and the animal are beside her and only act." : "Chanda is NOT on screen: her voice is a voice-over; the guardian and the animal act and never speak."}
What happens: ${ep.beats[index] || sc.task}
${prev && prev.setting ? `Previous clip ended: ${prev.setting} ${prev.action}\n` : ""}${next ? `Next clip: ${ep.beats[index + 1] || next.task}\n` : ""}${luckyAsk}
Voice limits (Chanda speaks calmly, and the clip is only 10 seconds): the Khmer line is one or two short sentences of at most 15 Khmer words; the English line at most 20 words.
${avoid.length ? `Recent ${animal} scenes (use a different place, light and action):\n${avoid.slice(0, 10).map((a) => "- " + a).join("\n")}\n` : ""}${note ? note + "\n" : ""}Answer with the tool write_scene. Keep it short: setting at most 35 words, action at most 45 words, image at most 25 words, never describing how the characters look.`;
}
// the answer forms the AI fills in (tool use: the API returns them as ready-made JSON, so they can always be read)
const STR = (d) => ({ type: "string", description: d });
export function planTool(length = ED_DEFAULT_LENGTH) {
  const n = scenePlan(length).length;
  return { name: "write_episode_plan", description: "Save the plan of today's episode.", input_schema: { type: "object", properties: {
    title_en: STR("short episode title in English"), title_km: STR("the title in natural Khmer"), logline: STR("the story in one English sentence"),
    hook: STR("the opening hook idea, one sentence"), guardian_moment: STR("the new signature magical moment, specific and visual, one or two sentences"),
    blessing_en: STR("the blessing to the viewer, one sentence"), blessing_km: STR("the blessing in natural spoken Khmer"),
    closing_en: STR("the closing message, one sentence"), closing_km: STR("the closing message in natural spoken Khmer"),
    music: STR("music and sound atmosphere for the episode (instruments and mood, no artist or song names)"),
    beats: { type: "array", minItems: n, maxItems: n, items: STR("what happens in this clip, one short sentence"), description: `exactly ${n} beats, one per clip` },
  }, required: ["title_en", "title_km", "logline", "hook", "guardian_moment", "blessing_en", "blessing_km", "closing_en", "closing_km", "music", "beats"] } };
}
export const SCENE_TOOL = { name: "write_scene", description: "Save one 10-second clip.", input_schema: { type: "object", properties: {
  km: STR("what Chanda says, in natural spoken Khmer (at most 15 Khmer words)"), en: STR("the same in natural English (at most 20 words)"),
  setting: STR("where we are, time of day, light, weather and magical effects; no character looks (at most 35 words)"),
  action: STR("what the guardian and the animal (and Chanda, if on camera) do, moment by moment, without describing how they look (at most 45 words)"),
  camera: STR("one smooth camera movement"), sound: STR("music and sound effects for this clip"), image: STR("the key still frame of this clip in one sentence (at most 25 words)"),
}, required: ["km", "en", "setting", "action", "camera", "sound", "image"] } };

// pull the JSON object out of the AI's reply (used only if the answer came back as text)
export function parseJSON(text) {
  const m = String(text || "").match(/\{[\s\S]*\}/);
  return JSON.parse(m ? m[0] : text);
}
const S = (v, n = 1200) => String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, n);
// a plan from the AI, checked and shaped into an episode (scenes still empty)
export function planToEpisode(raw, x) {
  const plan = scenePlan(x.length);
  const beats = Array.isArray(raw.beats) ? raw.beats.map((b) => S(b, 400).replace(/^clip \d+:\s*/i, "")) : [];
  if (beats.length < plan.length) throw new Error(`the plan has ${beats.length} beats, ${plan.length} needed`);
  for (const k of ["title_en", "title_km", "logline", "guardian_moment", "blessing_en", "blessing_km", "closing_en", "closing_km"]) if (!S(raw[k])) throw new Error("the plan is missing " + k);
  return {
    v: 1, date: x.iso, animal: x.animal, vid: x.vid || "main", length: plan.length * 10,
    theme: { id: x.theme.id, en: x.theme.en, km: x.theme.km, kind: x.theme.kind, note: x.theme.note || "" },
    facts: x.facts || null,
    title: { en: S(raw.title_en, 120), km: S(raw.title_km, 160) }, logline: S(raw.logline, 400), hook: S(raw.hook, 400),
    guardianMoment: S(raw.guardian_moment, 600), blessing: { en: S(raw.blessing_en, 300), km: S(raw.blessing_km, 400) },
    closing: { en: S(raw.closing_en, 300), km: S(raw.closing_km, 400) }, music: S(raw.music, 400),
    beats: beats.slice(0, plan.length),
    scenes: plan.map((s) => ({ ...s, refs: refsFor(x.animal, s.onCam), status: "empty", km: "", en: "", setting: "", action: "", camera: "", sound: "", image: "", video: "", imagePrompt: "", warnings: [] })),
  };
}
// one scene from the AI, checked and assembled
export function fillScene(ep, index, raw) {
  const sc = { ...ep.scenes[index] };
  for (const k of ["km", "en", "setting", "action", "camera", "sound", "image"]) sc[k] = S(raw[k], k === "action" || k === "setting" ? 900 : 500);
  if (!sc.km || !sc.en || !sc.action) throw new Error("the scene is missing its Khmer line, English line or action");
  const a = assemble(ep.animal, sc);
  sc.imagePrompt = a.image; sc.video = a.video;
  sc.warnings = checkScene(sc, { noNumbers: ep.facts && ep.facts.tier === "caution" });
  sc.status = "ready";
  return sc;
}
export const episodeStatus = (ep) => !ep ? "none" : ep.scenes.every((s) => s.status === "ready") ? "ready" : ep.scenes.some((s) => s.status === "ready") ? "partial" : "planned";
