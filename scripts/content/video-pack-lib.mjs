// Text of the daily video prompt pack, shared by the command-line generator (video-pack.mjs) and the
// browser tool (docs/video-prompts/video-pack-tool.html, built by build-video-tool.mjs).
// No Node imports here, so the same code runs in a browser.
//   buildPack(iso, facts, forSign, data) -> { md, srtKm, srtEn, line }
//     facts   = computeFacts(iso) from scripts/daily-data-lib.mjs
//     forSign = forSign from js/lucky-digits.js
//     data    = the day's data/daily/<iso>.json if it exists (its summary is used), otherwise null
//     P       = { INFO, KM_INFO } from daily-data-lib (traits, weaknesses, lucky days for the long video)
export const EMO = { Rat: "🐀", Ox: "🐂", Tiger: "🐯", Rabbit: "🐇", Dragon: "🐉", Snake: "🐍", Horse: "🐎", Goat: "🐐", Monkey: "🐒", Rooster: "🐓", Dog: "🐕", Pig: "🐖" };
// look of each animal: cute but powerful, shining gold (3D animated-film quality)
export const LOOK = {
  Rat: "an adorable golden rat with big sparkling eyes, tiny jade-green ear jewels and a proud little smile",
  Ox: "a strong, adorable golden ox with big gentle eyes, polished curved horns and ruby studs on its harness",
  Tiger: "a powerful yet adorable golden tiger cub with big bright eyes and glowing engraved stripes",
  Rabbit: "an adorable golden rabbit with long shining ears, big sparkling eyes and a tiny pearl necklace",
  Dragon: "an adorable but mighty golden dragon with big friendly eyes, shimmering scales, flowing whiskers and a glowing pearl",
  Snake: "a cute, elegant golden snake with big shiny eyes and jewel-like patterned scales",
  Horse: "a proud, adorable golden horse with big sparkling eyes and a flowing shining mane",
  Goat: "an adorable golden goat with big soft eyes, curled shining horns and a tiny bell",
  Monkey: "a playful, adorable golden monkey with big curious eyes and a cheeky smile",
  Rooster: "a proud, adorable golden rooster with big bright eyes, a ruby-red comb and shimmering tail feathers",
  Dog: "a loyal, adorable golden puppy with big shining eyes and a jeweled collar",
  Pig: "a chubby, adorable golden piglet with big happy eyes and rosy cheeks",
};
export const CHAR = (a) => `Create a premium-quality 3D animated fantasy character of ${LOOK[a]}, the ${a} of the Chinese zodiac, inspired by the charm, expressive storytelling and enchanting visual appeal of classic Disney and Pixar-style animated family films. Give the character oversized sparkling eyes, an adorable expressive face, soft rounded features, a small cute nose, beautifully shaped proportions and a warm, lovable personality. Combine whimsical character design with luxurious golden craftsmanship: polished gold textures, intricate engraved ornaments, luminous highlights, delicate pink and gold accents and beautifully sculpted details. The character should feel alive, emotionally expressive, magical, cute and majestic, with a memorable silhouette and a high-end theatrical animation finish. Body in creamy white-gold with shining gold engraved patterns and pink inner ears or cheeks. Place the full-body character on a round golden pedestal set inside a large glowing pink lotus that floats on a pond, surrounded by a glowing full moon, a deep indigo starry sky, a softly illuminated Khmer temple inspired by Angkor Wat with warm golden lights, palm tree silhouettes, small floating lanterns, glowing pink lotus flowers on the water, magical sparkles and warm golden reflections. Use cinematic lighting, rich colors, soft atmospheric glow, realistic metallic reflections, smooth 3D materials, beautiful depth of field and professional animated-movie-quality rendering. Composition: square 1:1, full body visible, three-quarter view, centered character, balanced framing, consistent design across all 12 Chinese zodiac animals, with space around the character. Restrictions: no text, no letters, no watermark, no logo, no cropped body parts.`;
// magical, powerful action for each animal (scene 1 hero moment)
export const POSE = {
  Rat: "leaps off the lotus and dashes through the air in a spiral, leaving a trail of glittering gold coins and stars",
  Ox: "stamps a hoof and a shockwave of golden light ripples across the pond, then it rises into the air on glowing golden clouds",
  Tiger: "lets out a mighty but cute roar that sends a wave of golden light and petals outward, then leaps high into the moonlit sky",
  Rabbit: "springs from the lotus in a huge magical leap, flying in an arc across the full moon with a sparkling golden trail",
  Dragon: "uncoils and soars up into the sky, circling the temple towers with a long ribbon of golden light and swirling clouds",
  Snake: "rises in a graceful spiral as glowing golden rings of light expand around it, its jewel scales shimmering",
  Horse: "rears up as golden wings of light unfold from its sides, then gallops into the sky across the moon",
  Goat: "leaps from lotus to lotus across the pond, each landing bursting into golden light and blossoming flowers",
  Monkey: "somersaults high into the air, spinning a glowing golden staff that scatters sparkles across the sky",
  Rooster: "spreads its shimmering wings and flies up in a burst of golden feathers, crowing as light rays fan out behind it",
  Dog: "bounds joyfully into the air and flies in a loop, a golden glowing trail and paw-print sparkles behind it",
  Pig: "floats up from the lotus inside a glowing golden bubble, spinning happily as golden coins and petals swirl around it",
};
export const STYLE = "Vertical 9:16. Premium 3D animated fantasy film quality, inspired by classic Disney and Pixar-style animated family films: cute and majestic golden zodiac characters with oversized sparkling eyes, adorable expressive faces, soft rounded features, polished gold textures with intricate engraved ornaments and delicate pink and gold accents, alive and emotionally expressive. Setting: a softly illuminated Khmer temple inspired by Angkor Wat under a glowing full moon and a deep indigo starry sky, floating lotus flowers, ornate pink-and-gold lotus details, magical sparkles and warm golden reflections. Cinematic lighting, rich colors, soft atmospheric glow, realistic metallic reflections, beautiful depth of field, gentle slow camera movement, professional animated-movie rendering. No text, no letters, no subtitles, no watermark, no logos.";
export const VOICE_EN = "a warm, cheerful young female narrator with a soft, magical storytelling tone, clear and friendly";
export const VOICE_KM = "a warm, cheerful young Cambodian female narrator speaking clear Khmer, soft and friendly";
export const MUSIC = "Gentle magical background music with soft chimes and a light Asian flute. No other speech.";
// the luckiest animal of the day (the day animal): one-line symbolism for the hero picture, video and caption
// (Rabbit line written by the owner; the others follow the same pattern with common traditional symbolism)
export const SYMBOL = {
  Rat: { en: "Clever and quick, the first animal of the zodiac, the Rat symbolizes wit, resourcefulness, and new beginnings.", km: "ឆ្នាំជូត ឆ្លាតវៃ និងរហ័សរហួន ហើយជាសត្វទីមួយនៃរាសីទាំង 12។ ឆ្នាំជូតតំណាងឲ្យប្រាជ្ញា ភាពប៉ិនប្រសប់ និងការចាប់ផ្ដើមថ្មី។", traits: "wit, resourcefulness and new beginnings", mood: "bright, clever and lively", vis: "a glowing golden path of stars appears in front of it and it races ahead first, while faint golden silhouettes of the other zodiac animals follow behind in the moonlight" },
  Ox: { en: "Steady and strong, the Ox symbolizes hard work, patience, and honest strength.", km: "ឆ្នាំឆ្លូវ នឹងនរ និងរឹងមាំ។ ឆ្នាំឆ្លូវតំណាងឲ្យការខិតខំ ការអត់ធ្មត់ និងកម្លាំងដ៏ស្មោះត្រង់។", traits: "hard work, patience and honest strength", mood: "calm, steady and strong", vis: "it plants its hooves firmly as golden rice fields light up around the temple and sway in the night breeze" },
  Tiger: { en: "King of the mountains, the Tiger symbolizes courage, protection, and bold power.", km: "ខ្លា គឺជាស្ដេចនៃព្រៃភ្នំ។ ឆ្នាំខាលតំណាងឲ្យភាពក្លាហាន ការការពារ និងថាមពលដ៏ខ្លាំងក្លា។", traits: "courage, protection and bold power", mood: "brave, proud and protective", vis: "it stands tall on a rock as a protective golden shield of light spreads over the temple and the hills behind it" },
  Rabbit: { en: "Beloved companion of the Moon Goddess, the Rabbit symbolizes purity, longevity, and peaceful elegance.", km: "ទន្សាយ គឺជាដៃគូជាទីស្រឡាញ់របស់ទេពធីតាព្រះចន្ទ។ ឆ្នាំថោះតំណាងឲ្យភាពបរិសុទ្ធ អាយុវែង និងភាពថ្លៃថ្នូរដ៏ស្ងប់ស្ងាត់។", traits: "purity, longevity and peaceful elegance", mood: "calm, gentle and graceful", vis: "a soft, graceful silhouette of a goddess made of silver moonlight appears faintly in the moon's glow and smiles down, and a ribbon of moonlight curls down and wraps gently around the rabbit, making it shine" },
  Dragon: { en: "Ruler of the clouds and rain, the Dragon symbolizes power, good fortune, and a noble spirit.", km: "នាគ គឺជាម្ចាស់នៃពពក និងភ្លៀង។ ឆ្នាំរោងតំណាងឲ្យអំណាច សំណាងល្អ និងចិត្តថ្លៃថ្នូរ។", traits: "power, good fortune and a noble spirit", mood: "majestic, proud and noble", vis: "swirling clouds gather around it and a gentle golden rain of sparkles falls over the lotus pond as it circles above the temple" },
  Snake: { en: "Wise and graceful, the Snake symbolizes wisdom, intuition, and quiet elegance.", km: "ពស់ ឈ្លាសវៃ និងស្រស់ស្អាត។ ឆ្នាំម្សាញ់តំណាងឲ្យប្រាជ្ញា វិចារណញាណ និងភាពថ្លៃថ្នូរដ៏ស្ងប់ស្ងាត់។", traits: "wisdom, intuition and quiet elegance", mood: "wise, calm and elegant", vis: "glowing golden rings of light ripple outward around it as its eyes shine with quiet wisdom" },
  Horse: { en: "Free and spirited, the Horse symbolizes energy, freedom, and success on the road ahead.", km: "សេះ មានសេរីភាព និងពោរពេញដោយថាមពល។ ឆ្នាំមមីតំណាងឲ្យកម្លាំង សេរីភាព និងភាពជោគជ័យនៅលើផ្លូវខាងមុខ។", traits: "energy, freedom and success", mood: "free, energetic and joyful", vis: "a shining golden road of light opens across the sky in front of it, stretching toward the horizon" },
  Goat: { en: "Gentle and kind, the Goat symbolizes peace, harmony, and a caring heart.", km: "ពពែ ស្លូតបូត និងចិត្តល្អ។ ឆ្នាំមមែតំណាងឲ្យសន្តិភាព ភាពសុខដុម និងចិត្តមេត្តា។", traits: "peace, harmony and a caring heart", mood: "gentle, kind and peaceful", vis: "soft flowers bloom wherever it steps and small glowing birds settle peacefully around it" },
  Monkey: { en: "Playful and clever, the Monkey symbolizes intelligence, curiosity, and joyful energy.", km: "ស្វា ចូលចិត្តលេងសើច និងឆ្លាតវៃ។ ឆ្នាំវកតំណាងឲ្យបញ្ញា ការចង់ដឹងចង់ឃើញ និងភាពរីករាយ។", traits: "intelligence, curiosity and joyful energy", mood: "playful, clever and cheerful", vis: "it juggles glowing golden orbs of light that turn into stars as it laughs" },
  Rooster: { en: "Herald of the dawn, the Rooster symbolizes honesty, confidence, and a bright new day.", km: "មាន់ គឺជាអ្នកប្រកាសពេលព្រឹកព្រលឹម។ ឆ្នាំរកាតំណាងឲ្យភាពស្មោះត្រង់ ទំនុកចិត្ត និងថ្ងៃថ្មីដ៏ភ្លឺស្វាង។", traits: "honesty, confidence and a bright new day", mood: "proud, confident and bright", vis: "the first rays of a golden dawn spread across the sky behind it as it stands proudly on the temple wall" },
  Dog: { en: "Faithful guardian of the home, the Dog symbolizes loyalty, protection, and honest friendship.", km: "ឆ្កែ គឺជាអ្នកយាមផ្ទះដ៏ស្មោះត្រង់។ ឆ្នាំចតំណាងឲ្យភាពស្មោះស្ម័គ្រ ការការពារ និងមិត្តភាពដ៏ពិតប្រាកដ។", traits: "loyalty, protection and honest friendship", mood: "loyal, warm and protective", vis: "it sits faithfully at the temple gate as a warm golden glow surrounds a small traditional wooden house nearby" },
  Pig: { en: "Generous and warm-hearted, the Pig symbolizes abundance, good fortune, and a happy home.", km: "ជ្រូក មានចិត្តទូលាយ និងកក់ក្ដៅ។ ឆ្នាំកុរតំណាងឲ្យភាពសម្បូរសប្បាយ សំណាងល្អ និងគ្រួសារដ៏រីករាយ។", traits: "abundance, good fortune and a happy home", mood: "happy, warm and generous", vis: "golden coins, fruit and flowers gently fill a lotus-shaped basket around it until it overflows" },
};
export const HERO = (a) => `Create a premium-quality 3D animated fantasy character of ${LOOK[a]}, the ${a} of the Chinese zodiac, inspired by the charm and enchanting visual appeal of classic Disney and Pixar-style animated family films. The ${a.toLowerCase()} symbolizes ${SYMBOL[a].traits}: a ${SYMBOL[a].mood} expression and pose that show this. Body in creamy white-gold with shining engraved gold patterns, pink inner ears or rosy cheeks, polished gold textures, luminous highlights and delicate pink and gold accents. It sits on a round golden pedestal inside a large glowing pink lotus floating on a still pond. Behind it, a huge glowing full moon with a soft silver-gold halo, a deep indigo starry sky, a softly illuminated Khmer temple inspired by Angkor Wat with warm golden lights, palm tree silhouettes, small floating lanterns, glowing lotus flowers on the water, gentle moonbeams falling on the ${a.toLowerCase()}, magical sparkles and soft silver-and-gold reflections. Cinematic lighting, soft atmospheric glow, realistic metallic reflections, beautiful depth of field, professional animated-movie-quality rendering. Square 1:1, full body visible, three-quarter view, centered, with space around the character. No text, no letters, no watermark, no logo, no cropped body parts.`;
// spoken times for the voice-overs (traditional two-hour periods)
const MKM = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const TIME_SAY = {
  "23:00–01:00": ["from 11 at night to 1 in the morning", "ម៉ោង 11 យប់ ដល់ម៉ោង 1 ទៀបភ្លឺ"],
  "01:00–03:00": ["from 1 to 3 in the early morning", "ម៉ោង 1 ដល់ម៉ោង 3 ទៀបភ្លឺ"],
  "03:00–05:00": ["from 3 to 5 in the early morning", "ម៉ោង 3 ដល់ម៉ោង 5 ទៀបភ្លឺ"],
  "05:00–07:00": ["from 5 to 7 in the morning", "ម៉ោង 5 ដល់ម៉ោង 7 ព្រឹក"],
  "07:00–09:00": ["from 7 to 9 in the morning", "ម៉ោង 7 ដល់ម៉ោង 9 ព្រឹក"],
  "09:00–11:00": ["from 9 to 11 in the morning", "ម៉ោង 9 ដល់ម៉ោង 11 ព្រឹក"],
  "11:00–13:00": ["from 11 in the morning to 1 in the afternoon", "ម៉ោង 11 ព្រឹក ដល់ម៉ោង 1 រសៀល"],
  "13:00–15:00": ["from 1 to 3 in the afternoon", "ម៉ោង 1 ដល់ម៉ោង 3 រសៀល"],
  "15:00–17:00": ["from 3 to 5 in the afternoon", "ម៉ោង 3 រសៀល ដល់ម៉ោង 5 ល្ងាច"],
  "17:00–19:00": ["from 5 to 7 in the evening", "ម៉ោង 5 ដល់ម៉ោង 7 ល្ងាច"],
  "19:00–21:00": ["from 7 to 9 in the evening", "ម៉ោង 7 ដល់ម៉ោង 9 យប់"],
  "21:00–23:00": ["from 9 to 11 at night", "ម៉ោង 9 ដល់ម៉ោង 11 យប់"],
};
const sayTime = (t) => TIME_SAY[t][0];
const sayTimeKm = (t) => TIME_SAY[t][1];
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const dmy = (iso) => iso.split("-").reverse().join("/");
const longDate = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).replace(/^(\w+) /, "$1, ");
const list = (arr) => (arr.length <= 1 ? arr.join("") : arr.length === 2 ? `${arr[0]} and ${arr[1]}` : `${arr.slice(0, -1).join(", ")} and ${arr.at(-1)}`);
const kmList = (arr) => (arr.length === 1 ? arr[0] : `${arr.slice(0, -1).join(" ")} និង${arr.at(-1)}`);
const looks = (arr) => list(arr.map((a) => LOOK[a]));

function ts(t) { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, "0")}:${String(Math.floor(ms / 60000) % 60).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`; }
function srt(lines, total = 45) {
  const w = lines.map((l) => Math.max(l.length, 12)), sum = w.reduce((a, b) => a + b, 0);
  let t = 0;
  return lines.map((l, i) => { const d = (total * w[i]) / sum; const s = `${i + 1}\n${ts(t)} --> ${ts(t + d - 0.05)}\n${l}\n`; t += d; return s; }).join("\n");
}
// split long sentences for subtitles (Khmer at a space after ~45 chars, English at ", ")
// subtitle lines: short, one line each (fits a 9:16 phone screen), broken at sentence ends, then at commas
// or between words, never leaving a tiny last piece; trailing commas dropped; "dot com" shown as ".com"
const SUB_MAX = { en: 42, km: 46 };   // characters (Khmer counted in code points: vowels and subscripts are extra code points)
function splitLines(text, lang) {
  const max = SUB_MAX[lang] || 38, len = (x) => [...x].length;
  const clean = (x) => x.replace(/ dot com\b/g, ".com").replace(/[,،]\s*$/, "").trim();
  const sents = (lang === "km" ? text.split(/(?<=[។!?])\s*/) : text.split(/(?<=[.!?])\s+/)).map((x) => x.trim()).filter(Boolean);
  const out = [];
  for (const sent of sents) {
    const s = sent.replace(/ dot com\b/g, ".com");
    if (len(s) <= max) { out.push(clean(s)); continue; }
    // best line breaks for the whole sentence (dynamic programming): break after commas or before
    // "and / or / so / that…", never right after "the / a / your…", lines evenly filled, no tiny lines
    const words = s.split(/\s+/), n = words.length;
    const NOEND = /^(the|a|an|of|to|and|or|but|in|on|at|for|with|from|is|are|your|my|our|their|its|this|that|very|be|let|good|kind|small|full|lucky|new|calm|big|special|happy|Chinese)$/i;
    const GOODSTART = /^(and|or|but|so|that|to|with|for|at|in|on|when|because|while|then|as)$/i;
    const best = [0], from = [0];
    for (let j = 1; j <= n; j++) {
      best[j] = Infinity;
      for (let i = j - 1; i >= 0; i--) {
        const seg = words.slice(i, j).join(" "), L = len(seg);
        if (L > max && j - i > 1) break;
        let c = 20 + 40 * ((max - L) / max) ** 2 + (L < 16 ? 50 : 0);
        if (j < n) {
          const last = words[j - 1], next = words[j];
          const inList = /,$/.test(next) || words[j + 1] === "and" || words[j + 1] === "និង";   // "purity, longevity, and…" / "Rabbit, Goat and Pig"
          c += /[,;:]$/.test(last) && !inList ? 0 : lang === "en" && NOEND.test(last) ? 80 : lang === "en" && GOODSTART.test(next) ? 10 : 35;
          if (/^\d/.test(next) || (/\d,?$/.test(last) && !/^\d{4}[,.]?$/.test(last))) c += 100;   // keep numbers with their words
          if ((next === "and" || next === "និង") && /,$/.test(words[j - 2] || "")) c += 60;              // "Rabbit, Goat | and Pig"
        }
        if (best[i] + c < best[j]) { best[j] = best[i] + c; from[j] = i; }
      }
    }
    const parts = [];
    for (let j = n; j > 0; j = from[j]) parts.unshift(words.slice(from[j], j).join(" "));
    parts.forEach((x) => out.push(clean(x)));
  }
  return out.filter(Boolean);
}

export function buildPack(iso, F, forSign, data = null, P = null) {
  const sign = (a) => F.signs.find((s) => s.animal === a);
  const day = F.dayAnimal, dayKm = F.dayAnimalKm, lucky = F.highlights.topLucky, careful = F.highlights.careful;
  const km = (a) => sign(a).nameKm;
  const nums = lucky.map((a) => { const v = forSign(a, iso); if (String(v.d1) !== String(sign(a).lucky.number)) throw new Error(`${iso} ${a}: lucky number mismatch`); return { a, ...v }; });
  const inVideo = [...new Set([day, ...lucky, ...careful])];
  const numLine = (n, name) => `${name}  ${n.d1} · ${n.d2} · ${n.d3} · ${n.d4} · ${n.d5}`;
  const D = dmy(iso), LD = longDate(iso);

  // written summary: the site's own daily wording if it exists already, otherwise the standard script
  const same = data && JSON.stringify(data.highlights.topLucky) === JSON.stringify(lucky) && JSON.stringify(data.highlights.careful) === JSON.stringify(careful);
  const summaryKm = same && data.highlights.summary?.km ? data.highlights.summary.km : [
    `ថ្ងៃនេះជាថ្ងៃ${dayKm}។`,
    `${kmList(lucky.map((a) => `ឆ្នាំ${km(a)}`))} មានសំណាងល្អជាងគេនៅថ្ងៃនេះ។`,
    ...(careful.length ? [`ចំណែក${kmList(careful.map((a) => `ឆ្នាំ${km(a)}`))} គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។`] : []),
  ].join(" ");
  const summaryEn = same && data.highlights.summary?.en ? data.highlights.summary.en : [
    `Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day.`,
    `${list(lucky)} are the luckiest signs today.`,
    ...(careful.length ? [`${list(careful)} should take it easy, slow down and avoid rushing big decisions.`] : []),
  ].join(" ");

  const voiceKm = [
    `ជោគជតារាសីប្រចាំថ្ងៃ សម្រាប់ថ្ងៃទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]} ឆ្នាំ ${iso.slice(0, 4)}។`,
    summaryKm,
    `លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖ ${nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2} និង ${n.d3}។`).join(" ")}`,
    "ចូលមើលលេខសំណាង និងលម្អិតសម្រាប់រាសីទាំង 12 នៅ mybirthsign.com",
  ];
  const voiceEn = [
    `Your Chinese zodiac fortune for ${LD}.`,
    summaryEn,
    `Today's lucky numbers for the lucky signs: ${nums.map((n) => `${n.a}, ${n.d2} and ${n.d3}.`).join(" ")}`,
    "See all 12 signs and full lucky numbers at mybirthsign.com.",
  ];
  const srtKm = srt(voiceKm.flatMap((v) => splitLines(v, "km")));
  const srtEn = srt(voiceEn.flatMap((v) => splitLines(v, "en")));

  const luckyLabelsKm = lucky.map((a) => `${km(a)} – ${sign(a).label.km}`).join(" · ");
  const luckyLabelsEn = lucky.map((a) => `${a} – ${sign(a).label.en}`).join(" · ");
  const disclaimerNums = "លេខសំណាង (1 ដល់ 5 ខ្ទង់) សម្រាប់ថ្ងៃនេះ គឺសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការទស្សន៍ទាយ ឬការណែនាំឱ្យភ្នាល់ទេ។";
  const disclaimer = "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រទេ។";
  const tags = `#ជោគជតារាសី #រាសីប្រចាំថ្ងៃ #ឆ្នាំ${dayKm} #ផ្កាយកំណើត`;
  const tagsEn = `#ChineseZodiac #DailyHoroscope #YearOfThe${day} #LuckyNumbers`;
  const DISC_EN = "Traditional Chinese zodiac reading for entertainment and self-reflection only, not a scientific prediction.";

  // 9-scene video for the luckiest animal
  const dl = day.toLowerCase(), friends = lucky.filter((a) => a !== day), S9 = SYMBOL[day], dd = sign(day);
  const dateEn = LD.replace(/^\w+, /, "").replace(/ \d{4}$/, "");
  const dateKm = `ថ្ងៃទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]}`;
  const nine = [
    ["The full moon rises", "A huge full moon rises slowly over the Angkor-style temple and the still lotus pond. Lanterns drift upward, and a single beam of silver-gold moonlight falls onto a closed pink lotus in the middle of the pond. Slow push-in toward the lotus.",
      "Tonight the full moon rises over the temple, and a special friend is waking up.", "យប់នេះ ព្រះចន្ទពេញវង់រះលើប្រាសាទ ហើយមានមិត្តពិសេសម្នាក់កំពុងភ្ញាក់ឡើង។"],
    [`The ${day} appears`, `The pink lotus opens petal by petal in the moonlight, revealing ${LOOK[day]} on a round golden pedestal. It opens its big sparkling eyes and its golden details begin to glow. Gentle close-up on its face, then pull back.`,
      `Today, ${dateEn}, is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day! A great day for everyone born in the Year of the ${day}.`, `${dateKm} ជាថ្ងៃ${dayKm}! ជាថ្ងៃល្អខ្លាំងសម្រាប់អ្នកកើតឆ្នាំ${dayKm}។`],
    [`What the ${day} means`, `The ${dl} looks up at the full moon, and ${S9.vis}. ${cap(S9.mood)} mood. Slow upward camera tilt.`,
      S9.en, S9.km],
    ["The magical moment", `The ${dl} ${POSE[day]}. Lotus petals and sparkles swirl up behind it. Dynamic camera following the movement.`,
      `Born in the Year of the ${day}? Today is your day to shine. Stay ${S9.mood}.`, `អ្នកកើតឆ្នាំ${dayKm} ថ្ងៃនេះជាថ្ងៃរបស់អ្នក! ចូររក្សាចិត្តល្អ និងធ្វើអ្វីៗដោយស្ងប់។`],
    ["Lucky color and lucky time", `The ${dl} lands softly on the temple steps. Glowing ${dd.lucky.color.en} lanterns light up one by one around it, and a shining circle of golden light like a sundial appears on the stone. The ${dl} smiles and touches a ${dd.lucky.color.en} lantern. Warm ${dd.lucky.color.en} and gold light.`,
      `Your lucky color today is ${dd.lucky.color.en}, and your best time is ${sayTime(dd.lucky.time)}.`, `ពណ៌សំណាងថ្ងៃនេះគឺពណ៌${dd.lucky.color.km} ហើយពេលល្អបំផុតគឺ${sayTimeKm(dd.lucky.time)}។`],
    ["Lucky direction", `The ${dl} stands on the temple steps as a glowing golden path of light unrolls across the pond toward the ${dd.lucky.direction.en.toLowerCase()}, lotus flowers lighting up one by one along it. The ${dl} looks along the path, smiles and starts walking forward. Camera follows behind it.`, "", ""],
    ["Lucky numbers", `A huge glowing golden wheel rises out of the lotus pond in front of the temple and spins with beams of golden light, then slows to a gentle shining turn. The ${dl} watches it happily from its lotus pedestal, its golden details sparkling. Open space in the middle and lower part of the frame for number captions. Slow push-in.`, "", ""],
    ["A wish on the water", `The ${dl} gently places a small glowing lotus lantern on the pond and makes a wish. The lantern drifts away across the moonlit water, and tiny golden sparkles rise from it into the night sky. Peaceful, warm and magical mood. Slow camera move following the lantern.`, "", ""],
    ["Golden ending", `The ${dl} floats gently up toward the full moon, waving goodbye. Golden light beams shoot up from the temple towers and burst into soft lotus-shaped golden fireworks, and hundreds of lanterns rise over the glowing pond. The camera rises and pulls back for a wide, epic view, with open sky at the top for a title.`,
      "See all twelve signs at mybirthsign dot com. Have a lucky day!", "ចូលមើលរាសីទាំង 12 នៅ mybirthsign.com។ សូមឲ្យមានសំណាងល្អ!"],
  ];
  // 90-second voice-over for the 9-scene video (about 10 seconds per scene)
  const KMDAY = ["ថ្ងៃអាទិត្យ", "ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"];
  const wdKm = KMDAY[new Date(iso + "T00:00:00Z").getUTCDay()];
  const ckm = dd.lucky.color.km, cen = dd.lucky.color.en, n0 = nums[0];
  const vo90 = [
    ["Tonight, the full moon rises over the ancient temple. Lotus flowers glow on the water, and a very special friend is waking up.",
      "យប់នេះ ព្រះចន្ទពេញវង់រះឡើងលើប្រាសាទបុរាណ។ ផ្កាឈូកភ្លឺចែងចាំងលើផ្ទៃទឹក ហើយមិត្តពិសេសម្នាក់ កំពុងភ្ញាក់ពីដំណេក។"],
    [`Today, ${LD}, is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day. It is a ${dd.label.en} for everyone born in the Year of the ${day}. This is your day to shine!`,
      `ថ្ងៃនេះ ${wdKm} ទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]} ឆ្នាំ ${iso.slice(0, 4)} គឺជាថ្ងៃ${dayKm}។ នេះជា${dd.label.km} សម្រាប់អ្នកកើតឆ្នាំ${dayKm}។ ថ្ងៃនេះ គឺជាថ្ងៃរបស់អ្នក!`],
    [`${S9.en} Today, this good energy is with you.`, `${S9.km} ថ្ងៃនេះ ថាមពលល្អទាំងនេះ កំពុងនៅជាមួយអ្នក។`],
    [`Born in the Year of the ${day}? Your luck is strong today. Stay ${S9.mood}. Say yes to good chances, and share your happiness with the people around you.`,
      `សម្រាប់អ្នកកើតឆ្នាំ${dayKm} ថ្ងៃនេះ សំណាងរបស់អ្នកល្អខ្លាំងណាស់។ សូមរក្សាចិត្តឲ្យស្ងប់ ទទួលយកឱកាសល្អៗ ហើយចែករំលែកភាពរីករាយ ដល់មនុស្សជុំវិញខ្លួន។`],
    [`Your lucky color today is ${cen}. Wear it, or carry something ${cen} with you. Your best time is ${sayTime(dd.lucky.time)}. It is a good time for important plans.`,
      `ពណ៌សំណាងរបស់អ្នកថ្ងៃនេះ គឺពណ៌${ckm}។ សូមស្លៀកពាក់ពណ៌${ckm} ឬយករបស់ពណ៌${ckm}មួយ ជាប់ខ្លួន។ ពេលល្អបំផុតរបស់អ្នក គឺ${sayTimeKm(dd.lucky.time)}។ ជាពេលល្អ សម្រាប់ធ្វើរឿងសំខាន់ៗ។`],
    [`Your lucky direction today is the ${dd.lucky.direction.en.toLowerCase()}. When you start something new, face the ${dd.lucky.direction.en.toLowerCase()}, and walk forward with a calm and happy heart.`,
      `ទិសសំណាងរបស់អ្នកថ្ងៃនេះ គឺទិស${dd.lucky.direction.km}។ ពេលចាប់ផ្ដើមធ្វើអ្វីថ្មី សូមបែរមុខទៅទិស${dd.lucky.direction.km} ហើយបោះជំហានទៅមុខ ដោយចិត្តស្ងប់ និងរីករាយ។`],
    [`Your lucky numbers today are ${n0.d1}, ${n0.d2}, and ${n0.d3}. Keep them in mind. Let them remind you that today is your lucky day.`,
      `លេខសំណាងរបស់អ្នកថ្ងៃនេះ គឺលេខ ${n0.d1} លេខ ${n0.d2} និងលេខ ${n0.d3}។ សូមចងចាំលេខទាំងនេះ ដើម្បីរំលឹកខ្លួនឯងថា ថ្ងៃនេះ គឺជាថ្ងៃសំណាងរបស់អ្នក។`],
    ["Make a small wish today, and take one kind step toward it. A peaceful heart helps good luck find its way to you.",
      "ថ្ងៃនេះ សូមប្រាថ្នាអ្វីមួយតូចៗ ហើយធ្វើរឿងល្អមួយ ដើម្បីឈានទៅរកក្ដីប្រាថ្នានោះ។ ចិត្តដែលស្ងប់ នឹងជួយនាំសំណាងល្អ មករកអ្នក។"],
    ["That's your Chinese zodiac fortune for today. See all twelve signs and your lucky numbers at mybirthsign dot com. Follow us for tomorrow's fortune. Have a lucky day!",
      "នេះគឺជាជោគជតារាសីចិន សម្រាប់ថ្ងៃនេះ។ អ្នកអាចមើលរាសីទាំង 12 និងលេខសំណាង នៅលើគេហទំព័រ mybirthsign.com។ សូមតាមដានយើង សម្រាប់ជោគជតាថ្ងៃស្អែក។ សូមឲ្យអ្នកមានសំណាងល្អ!"],
  ];
  const mmss = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
  // ---- luckiest-animal videos: 60 seconds (Facebook, TikTok) and 180 seconds (YouTube), 10-second scenes
  const PI = P && P.INFO[day], PK = P && P.KM_INFO[day];
  const dir = dd.lucky.direction.en.toLowerCase(), dirKm = dd.lucky.direction.km;
  const traitsEn = PI ? PI.traits.replace(/^(\w)/, (m) => m.toLowerCase()) : "";
  const weakEn = PI ? PI.weaknesses.replace(/^(\w)/, (m) => m.toLowerCase()).replace(/\.$/, "") : "";
  const SC = {
    moon: [nine[0][0], nine[0][1], ...vo90[0]],
    appear: [nine[1][0], nine[1][1], ...vo90[1]],
    meaning: [nine[2][0], nine[2][1], ...vo90[2]],
    personality: [`The ${day}'s character`, `Close-up of the ${dl} on its glowing lotus, its face showing a ${S9.mood} expression. Soft golden light circles it, and small glowing lotus petals float around it like a halo. Gentle slow orbit around the ${dl}.`,
      `People born in the Year of the ${day} are ${traitsEn}`, PK ? `អ្នកកើតឆ្នាំ${dayKm} ជាមនុស្ស${PK.traits.replace(/ឱនភាព/g, "ឱ្យតម្លៃលើភាព")}` : ""],
    magic: [nine[3][0], nine[3][1], ...vo90[3]],
    love: ["Love and family", `The ${dl} sits by the lotus pond as warm pink lanterns rise around it, and a soft glowing heart of golden light forms in the air in front of it. It smiles warmly. Gentle, loving mood. Slow push-in.`,
      "For love and family today, be warm and kind. A kind word, a smile, or a small gift can bring you closer to the people you love.",
      "សម្រាប់ស្នេហា និងគ្រួសារ ថ្ងៃនេះ សូមមានចិត្តកក់ក្ដៅ និងសប្បុរស។ ពាក្យសម្ដីល្អ ស្នាមញញឹម ឬអំណោយតូចមួយ អាចនាំឲ្យអ្នកកាន់តែជិតស្និទ្ធ នឹងមនុស្សដែលអ្នកស្រឡាញ់។"],
    work: ["Work and study", `The ${dl} climbs the glowing temple steps one by one, and each step lights up in gold under its feet. At the top it looks out proudly over the moonlit temple. Determined, hopeful mood. Camera rises with it.`,
      "For work and study, take one clear step at a time. Finish what matters most first, and ask for help when you need it.",
      "សម្រាប់ការងារ និងការសិក្សា សូមធ្វើម្ដងមួយជំហាន ឲ្យបានច្បាស់លាស់។ សូមធ្វើរឿងសំខាន់បំផុតមុនគេ ហើយកុំខ្មាសក្នុងការសុំជំនួយ ពេលអ្នកត្រូវការ។"],
    money: ["Money", `The ${dl} sits beside a lotus-shaped basket of softly glowing golden coins and carefully drops one shining coin into a small golden jar. Warm, calm light. Slow push-in on the jar.`,
      "For money, keep things simple and careful today. Plan before you spend, and save a little for tomorrow.",
      "សម្រាប់លុយកាក់ ថ្ងៃនេះ សូមចាយវាយឲ្យសាមញ្ញ និងប្រុងប្រយ័ត្ន។ សូមគិតគូរមុននឹងចាយ ហើយសន្សំទុកបន្តិច សម្រាប់ថ្ងៃស្អែក។"],
    colortime: [nine[4][0], nine[4][1], ...vo90[4]],
    color: ["Lucky color", `The ${dl} lands softly on the temple steps. Glowing ${cen} lanterns light up one by one around it, and the ${dl} smiles and touches a ${cen} lantern with its paw. Warm ${cen} and gold light. Slow orbit.`,
      `Your lucky color today is ${cen}. Wear something ${cen}, or carry a small ${cen} item with you, to keep good luck close.`,
      `ពណ៌សំណាងរបស់អ្នកថ្ងៃនេះ គឺពណ៌${ckm}។ សូមស្លៀកពាក់ពណ៌${ckm} ឬយករបស់ពណ៌${ckm}មួយ ជាប់ខ្លួន ដើម្បីរក្សាសំណាងល្អ ឲ្យនៅជិតអ្នក។`],
    time: ["Best time", `A shining circle of golden light like a sundial appears on the temple stone, and its glowing shadow turns slowly as the ${dl} watches. Stars and lanterns move gently in the sky. Calm, magical mood. Slow push-in.`,
      `Your best time today is ${sayTime(dd.lucky.time)}. It is a good time for important plans, meetings, or a fresh start.`,
      `ពេលល្អបំផុតរបស់អ្នកថ្ងៃនេះ គឺ${sayTimeKm(dd.lucky.time)}។ ជាពេលល្អ សម្រាប់ផែនការសំខាន់ៗ ការជួបជុំ ឬការចាប់ផ្ដើមថ្មី។`],
    direction: [nine[5][0], nine[5][1], ...vo90[5]],
    numbers: [nine[6][0], nine[6][1], ...vo90[6]],
    luckydays: ["Lucky days of the week", `Seven glowing lanterns float in a row above the lotus pond, and two of them shine brighter than the others. The ${dl} looks up at the two bright lanterns and smiles. Slow pan along the row.`,
      PI ? `The ${day}'s lucky days of the week are ${PI.luckyDays.join(" and ")}. Keep them in mind for plans that matter to you.` : "",
      PK ? `ថ្ងៃសំណាងប្រចាំសប្ដាហ៍ របស់ឆ្នាំ${dayKm} គឺ${PK.luckyDays.join(" និង")}។ សូមចងចាំថ្ងៃទាំងនេះ សម្រាប់ផែនការសំខាន់ៗ របស់អ្នក។` : ""],
    reminder: ["A gentle reminder", `The ${dl} looks at its reflection in the still lotus pond. The reflection smiles back, and a soft ring of golden light spreads across the water. Thoughtful, peaceful mood. Slow camera move down to the reflection.`,
      `A gentle reminder: people born in the Year of the ${day} ${weakEn}. Today, stay balanced, and listen to your heart.`,
      PK ? `សូមរំលឹកបន្តិច៖ អ្នកកើតឆ្នាំ${dayKm} ${PK.weaknesses} ថ្ងៃនេះ សូមរក្សាតុល្យភាព និងស្ដាប់ចិត្តខ្លួនឯង។` : ""],
    wish: [nine[7][0], nine[7][1], ...vo90[7]],
    thanks: ["Thank you", `The ${dl} bows gently with its paws together in front of the glowing temple, as pink lotus petals fall softly around it like rain. Warm, grateful mood. Slow pull-back.`,
      "Before the day ends, take a quiet moment to say thank you. Thank the people who help you, and thank yourself for trying your best.",
      "មុនថ្ងៃនេះបញ្ចប់ សូមចំណាយពេលស្ងាត់មួយភ្លែត ដើម្បីអរគុណ។ អរគុណមនុស្សដែលជួយអ្នក ហើយអរគុណខ្លួនឯង ដែលបានព្យាយាមអស់ពីសមត្ថភាព។"],
    recap: ["Today's luck in one look", `The ${dl} sits on its glowing lotus while a ${cen} lantern, a golden compass of light and three glowing golden orbs circle slowly around it. Magical, cheerful mood. Slow orbit.`,
      `Let's remember today's luck. Lucky color: ${cen}. Best time: ${sayTime(dd.lucky.time)}. Lucky direction: ${dir}. Lucky numbers: ${n0.d1}, ${n0.d2}, and ${n0.d3}.`,
      `សូមចងចាំសំណាងថ្ងៃនេះ។ ពណ៌សំណាង៖ ពណ៌${ckm}។ ពេលល្អ៖ ${sayTimeKm(dd.lucky.time)}។ ទិសសំណាង៖ ទិស${dirKm}។ លេខសំណាង៖ លេខ ${n0.d1} លេខ ${n0.d2} និងលេខ ${n0.d3}។`],
    end: [nine[8][0], nine[8][1], ...vo90[8]],
  };
  // ---- long YouTube video: the luckiest animal, then all 12 signs (two 10-second clips each), then a short closing
  const DAYPH = { great: ["a great day", "ថ្ងៃល្អខ្លាំង"], good: ["a good day", "ថ្ងៃល្អ"], ordinary: ["an ordinary, steady day", "ថ្ងៃធម្មតា"], caution: ["a quiet day", "ថ្ងៃគួរប្រុងប្រយ័ត្ន"] };
  const ADVICE = {
    great: [["This is your day. Say yes to good chances, and lead with confidence.", "ថ្ងៃនេះ គឺជាថ្ងៃរបស់អ្នក។ សូមទទួលយកឱកាសល្អៗ និងធ្វើអ្វីៗដោយទំនុកចិត្ត។"]],
    good: [["Good luck is with you. Work together with friends, and good results come more easily.", "សំណាងល្អកំពុងនៅជាមួយអ្នក។ សូមធ្វើការជាមួយមិត្តភក្តិ ហើយលទ្ធផលល្អ នឹងមកដល់កាន់តែងាយ។"],
      ["A good day to meet people and start something nice. Keep smiling.", "ថ្ងៃនេះ ល្អសម្រាប់ជួបមនុស្ស និងចាប់ផ្ដើមរឿងល្អៗ។ សូមរក្សាស្នាមញញឹម។"]],
    ordinary: [["A steady, normal day. Keep a calm pace, and finish what you start.", "ជាថ្ងៃធម្មតា និងនឹងនរ។ សូមធ្វើការដោយស្ងប់ៗ ហើយបញ្ចប់អ្វីដែលអ្នកបានចាប់ផ្ដើម។"],
      ["Keep things simple today. Small, steady steps are better than big jumps.", "ថ្ងៃនេះ សូមធ្វើអ្វីៗឲ្យសាមញ្ញ។ ជំហានតូចៗ និងនឹងនរ ល្អជាងការលោតធំៗ។"],
      ["A quiet day for planning. Tidy up, think ahead, and rest well tonight.", "ជាថ្ងៃស្ងប់ស្ងាត់ សម្រាប់រៀបចំផែនការ។ សូមរៀបចំរបស់របរ គិតទុកមុន និងសម្រាកឲ្យបានល្អនៅយប់នេះ។"]],
    caution: [["Take it easy today. Slow down, rest well, and don't rush big decisions.", "ថ្ងៃនេះ គួរសម្រាកឲ្យស្រួលខ្លួន។ ធ្វើអ្វីៗយឺតៗ សម្រាកឲ្យបានគ្រប់គ្រាន់ និងកុំប្រញាប់សម្រេចចិត្តរឿងធំៗ។"]],
  };
  const LOOKTIER = { great: "bursting with a bright golden aura", good: "glowing with a warm golden light", ordinary: "calm and content, softly lit by the moon", caution: "resting peacefully inside a soft protective bubble of golden light" };
  const tierCount = { great: 0, good: 0, ordinary: 0, caution: 0 };
  const signScenes = F.signs.flatMap((sg) => {
    const a = sg.animal, al = a.toLowerCase(), t = sg.tier, L = sg.lucky, nn = nums.find((x) => x.a === a);
    const adv = ADVICE[t][tierCount[t]++ % ADVICE[t].length];
    const act = t === "great" || t === "good" ? POSE[a] : t === "ordinary" ? "looks around happily as lanterns drift slowly past" : "curls up calmly as glowing butterflies circle it";
    return [
      [`${a} – ${sg.label.en}`, `${cap(LOOK[a])} appears on a glowing lotus pedestal in front of the Angkor-style temple under the full moon, ${LOOKTIER[t]}. ${L.color.en === "gold" ? "Golden" : cap(L.color.en)} lanterns glow softly around it. Slow push-in, matching its reference image.`,
        `Year of the ${a}. Today is ${DAYPH[t][0]} for you. Your lucky color is ${L.color.en}, and your best time is ${sayTime(L.time)}.`,
        `ឆ្នាំ${sg.nameKm}។ ថ្ងៃនេះ ជា${DAYPH[t][1]} សម្រាប់អ្នក។ ពណ៌សំណាងរបស់អ្នក គឺពណ៌${L.color.km} ហើយពេលល្អបំផុត គឺ${sayTimeKm(L.time)}។`],
      [`${a} – advice`, `The ${al} ${act}. ${t === "caution" ? "Peaceful and safe, not sad." : "Magical and joyful."} Camera follows it smoothly.`,
        `${adv[0]} Your lucky direction is the ${L.direction.en.toLowerCase()}.${nn ? ` Lucky numbers: ${nn.d2} and ${nn.d3}.` : ""}`,
        `${adv[1]} ទិសសំណាង គឺទិស${L.direction.km}។${nn ? ` លេខសំណាង៖ លេខ ${nn.d2} និងលេខ ${nn.d3}។` : ""}`],
    ];
  });
  const overview = ["Today's lucky signs", "Twelve cute golden zodiac animals sit on glowing lotus pedestals in a wide circle around the moonlit pond in front of the temple. Three of them shine brighter than the others with a golden aura. Slow, wide circling camera.",
    `Today's luckiest signs are the ${list(lucky)}.${careful.length ? ` ${list(careful)}, take it easy today.` : ""} Find your own sign in the chapters below.`,
    `ឆ្នាំដែលមានសំណាងល្អជាងគេថ្ងៃនេះ គឺ${kmList(lucky.map((a) => `ឆ្នាំ${km(a)}`))}។${careful.length ? ` ចំណែក${kmList(careful.map((a) => `ឆ្នាំ${km(a)}`))} គួរសម្រាកឲ្យស្រួលខ្លួន។` : ""} សូមរករាសីរបស់អ្នក នៅក្នុងជំពូកខាងក្រោម។`];
  const longScenes = [SC.moon, SC.appear, SC.meaning, overview, ...signScenes, SC.wish, SC.thanks, SC.end];
  const longChapters = [["0:00", "Introduction"], ...F.signs.map((sg, i) => [mmss((4 + i * 2) * 10), `${sg.animal} (${sg.nameKm}) – ${sg.label.en}`]), [mmss((4 + 24) * 10), "Closing"]];
  const VIDEOS = [
    { id: "60s", name: "60-second video – Facebook & TikTok", secs: 60, keys: ["appear", "meaning", "magic", "colortime", "numbers", "end"] },
    { id: "180s", name: "180-second video – YouTube", secs: 180, keys: ["moon", "appear", "meaning", "personality", "magic", "love", "work", "money", "color", "time", "direction", "numbers", "luckydays", "reminder", "wish", "thanks", "recap", "end"] },
  ].map((v) => ({ ...v, scenes: v.keys.map((k) => SC[k]) }));
  VIDEOS.push({ id: "long", name: `Long YouTube video – all 12 signs (about ${Math.round(longScenes.length * 10 / 60)} minutes)`, secs: longScenes.length * 10, scenes: longScenes, chapters: longChapters,
    intro: `A long YouTube video (${mmss(longScenes.length * 10)}): today's luckiest animal, an overview, then all 12 signs in order (two 10-second clips each), then a short closing. Lucky numbers are given only for today's lucky signs. Add the 12 character pictures as ingredients (each sign's clips use its own picture). Set the clip length in Flow to 10 seconds. For each scene, press "Copy + English voice" or "Copy + Khmer voice". Put the clips in order 1 to ${longScenes.length}.` });
  // subtitles locked to the scenes: each scene's lines share its own 10 seconds
  const srtFor = (scenes, lang) => {
    let n = 0;
    return scenes.map((v, si) => {
      const lines = splitLines(lang === "km" ? v[3] : v[2], lang), w = lines.map((l) => Math.max(l.length, 12)), sum = w.reduce((a, b) => a + b, 0);
      let t = si * 10;
      return lines.map((l, i) => { const d = (10 * w[i]) / sum; const out = `${++n}\n${ts(t)} --> ${ts(t + d - 0.05)}\n${l}\n`; t += d; return out; }).join("\n");
    }).join("\n");
  };
  // ---- story video for YouTube (about 5 minutes): an original fairy tale starring the luckiest animal.
  // A different story every day: the quest (6), the helper friend (5) and the challenge (4) rotate by date,
  // and the hero, its meaning, character, weak side and all lucky facts follow the day's luckiest animal.
  const KMN = { Rat: "កណ្ដុរ", Ox: "គោ", Tiger: "ខ្លា", Rabbit: "ទន្សាយ", Dragon: "នាគ", Snake: "ពស់", Horse: "សេះ", Goat: "ពពែ", Monkey: "ស្វា", Rooster: "មាន់", Dog: "ឆ្កែ", Pig: "ជ្រូក" };
  const kA = KMN[day], d1 = n0.d1, d2 = n0.d2, dnum = Math.floor(Date.parse(iso + "T00:00:00Z") / 86400000);
  const ldEn = PI ? PI.luckyDays : ["", ""], ldKm = PK ? PK.luckyDays : ["", ""];
  const QUESTS = [
    { title: ["the Moon Lantern", "ចង្កៀងព្រះចន្ទ"],
      intro: ["Dawn over an ancient Angkor-style temple. Soft mist drifts over a quiet lotus pond, pink lotus flowers open, and an ornate golden lantern stands on a stone pillar at the water's edge. Slow, wide establishing shot moving forward.",
        "Once upon a time, beside an ancient temple in Cambodia, there was a quiet lotus pond. Every night, a magic moon lantern lit up the water.",
        "កាលពីព្រេងនាយ នៅក្បែរប្រាសាទបុរាណមួយ ក្នុងប្រទេសកម្ពុជា មានស្រះផ្កាឈូកដ៏ស្ងប់ស្ងាត់មួយ។ រៀងរាល់យប់ ចង្កៀងវេទមន្តនៃព្រះចន្ទ បំភ្លឺផ្ទៃទឹក។"],
      problem: ["Close-up of the ornate golden moon lantern on its stone pillar. Its light flickers weakly and fades, and a few tiny sparks drift away like dying embers. Quiet, worried mood. Slow push-in.",
        "But this morning, the moon lantern grew dim. Its light was almost gone. Without it, tonight's full-moon festival could not begin.",
        "ប៉ុន្តែព្រឹកនេះ ចង្កៀងនៃព្រះចន្ទ ស្រអាប់ទៅវិញ។ ពន្លឺរបស់វា ស្ទើរតែរលត់។ បើគ្មានវា ពិធីបុណ្យព្រះចន្ទពេញវង់យប់នេះ មិនអាចចាប់ផ្ដើមបានទេ។"],
      mission: ["bring the light back", "នាំពន្លឺត្រឡប់មកវិញ"], goal: ["relight the moon lantern", "បំភ្លឺចង្កៀងព្រះចន្ទឡើងវិញ"],
      prize: ["a shining pearl of silver moonlight inside a golden lotus", "a shining pearl of moonlight. It was the heart of the moon lantern!", "គុជពន្លឺព្រះចន្ទ ភ្លឺចែងចាំង។ វាគឺជាបេះដូង នៃចង្កៀងព្រះចន្ទ!"], item: ["pearl", "គុជ"],
      restore: ["places the pearl inside the moon lantern. A quiet pause, then a huge burst of golden light shoots up into the night sky and spreads across the pond",
        "placed the pearl inside the moon lantern. For a moment, nothing happened. Then, whoosh! A golden light burst into the sky!",
        "ដាក់គុជចូលក្នុងចង្កៀងព្រះចន្ទ។ មួយសន្ទុះ គ្មានអ្វីកើតឡើងទេ។ បន្ទាប់មក វឺត! ពន្លឺមាសមួយ បាញ់ឡើងទៅលើមេឃ!"],
      again: ["The lotus pond glowed again.", "ស្រះផ្កាឈូក ភ្លឺចែងចាំងម្ដងទៀត។"] },
    { title: ["the Silent Temple Bell", "កណ្ដឹងប្រាសាទដែលស្ងាត់"],
      intro: ["Dawn over an ancient Angkor-style temple. A great golden bell hangs in a carved stone tower above a lotus pond, and soft mist drifts over the water. Slow, wide establishing shot moving forward.",
        "Once upon a time, beside an ancient temple in Cambodia, a great golden bell rang every evening. Its sweet sound called everyone to the full-moon festival.",
        "កាលពីព្រេងនាយ នៅក្បែរប្រាសាទបុរាណមួយ ក្នុងប្រទេសកម្ពុជា មានកណ្ដឹងមាសដ៏ធំមួយ បន្លឺសំឡេងរៀងរាល់ល្ងាច។ សំឡេងដ៏ពីរោះរបស់វា ហៅអ្នកទាំងអស់គ្នា មកកាន់ពិធីបុណ្យព្រះចន្ទពេញវង់។"],
      problem: ["Close-up of the great golden bell. A wooden striker swings and hits it, but no sound comes out, only a faint dull shimmer. Quiet, worried mood. Slow push-in.",
        "But this morning, the bell had lost its voice. When it was struck, there was only silence. Without its song, the festival could not begin.",
        "ប៉ុន្តែព្រឹកនេះ កណ្ដឹងបានបាត់សំឡេង។ ពេលគេវាយ មានតែភាពស្ងាត់ប៉ុណ្ណោះ។ បើគ្មានសំឡេងរបស់វា ពិធីបុណ្យមិនអាចចាប់ផ្ដើមបានទេ។"],
      mission: ["bring the bell's voice back", "នាំសំឡេងកណ្ដឹងត្រឡប់មកវិញ"], goal: ["wake the golden bell", "ដាស់កណ្ដឹងមាស"],
      prize: ["a small glowing golden crystal that hums softly, inside a golden lotus", "a small golden crystal, humming a soft song. It was the heart of the bell!", "គ្រីស្តាល់មាសតូចមួយ កំពុងបន្លឺបទចម្រៀងថ្នមៗ។ វាគឺជាបេះដូង នៃកណ្ដឹង!"], item: ["crystal", "គ្រីស្តាល់"],
      restore: ["places the golden crystal inside the great bell. A quiet pause, then the bell rings out, and rings of golden light ripple across the sky and the pond",
        "placed the crystal inside the bell. For a moment, nothing happened. Then, dong! A deep, sweet sound rang across the land!",
        "ដាក់គ្រីស្តាល់ចូលក្នុងកណ្ដឹង។ មួយសន្ទុះ គ្មានអ្វីកើតឡើងទេ។ បន្ទាប់មក ដុង! សំឡេងដ៏ពីរោះ បន្លឺឡើងពាសពេញទឹកដី!"],
      again: ["The bell sang again.", "កណ្ដឹងច្រៀងម្ដងទៀត។"] },
    { title: ["the Lost Lotus Seed", "គ្រាប់ឈូកដែលបាត់"],
      intro: ["Dawn over an ancient Angkor-style temple and a wide lotus pond. In the center of the pond, a giant golden lotus flower is closed tight. Soft mist. Slow, wide establishing shot moving forward.",
        "Once upon a time, beside an ancient temple in Cambodia, a giant golden lotus bloomed on every full-moon night, filling the pond with light.",
        "កាលពីព្រេងនាយ នៅក្បែរប្រាសាទបុរាណមួយ ក្នុងប្រទេសកម្ពុជា មានផ្កាឈូកមាសដ៏ធំមួយ រីកនៅរាល់យប់ព្រះចន្ទពេញវង់ ធ្វើឲ្យស្រះពោរពេញដោយពន្លឺ។"],
      problem: ["Close-up of the giant golden lotus, closed and pale. The glowing seed in its center is missing, leaving an empty hollow. Quiet, worried mood. Slow push-in.",
        "But this morning, the lotus's magic seed was gone. Without it, the lotus could not bloom, and the festival could not begin.",
        "ប៉ុន្តែព្រឹកនេះ គ្រាប់វេទមន្តរបស់ផ្កាឈូក បានបាត់។ បើគ្មានវា ផ្កាឈូកមិនអាចរីកបាន ហើយពិធីបុណ្យក៏មិនអាចចាប់ផ្ដើមបានដែរ។"],
      mission: ["find the lost seed", "រកគ្រាប់ឈូកដែលបាត់"], goal: ["bring back the lotus seed", "នាំគ្រាប់ឈូកត្រឡប់មកវិញ"],
      prize: ["a glowing golden lotus seed inside a small golden lotus", "the magic lotus seed, glowing like a tiny sun. It was the heart of the giant lotus!", "គ្រាប់ឈូកវេទមន្ត ភ្លឺដូចព្រះអាទិត្យតូចមួយ។ វាគឺជាបេះដូង នៃផ្កាឈូកដ៏ធំ!"], item: ["seed", "គ្រាប់ឈូក"],
      restore: ["places the glowing seed into the center of the giant lotus. A quiet pause, then the giant lotus bursts open in a blaze of golden light",
        "placed the seed in the giant lotus. For a moment, nothing happened. Then, whoosh! The lotus opened in a burst of golden light!",
        "ដាក់គ្រាប់ឈូក ចូលក្នុងផ្កាឈូកដ៏ធំ។ មួយសន្ទុះ គ្មានអ្វីកើតឡើងទេ។ បន្ទាប់មក វឺត! ផ្កាឈូករីក ដោយពន្លឺមាសចែងចាំង!"],
      again: ["The giant lotus bloomed again.", "ផ្កាឈូកដ៏ធំ រីកម្ដងទៀត។"] },
    { title: ["the River of Stars", "ទន្លេនៃផ្កាយ"],
      intro: ["Dawn over an ancient Angkor-style temple. A small stream winds past the temple, sparkling with tiny star-like lights in the water. Soft mist. Slow, wide establishing shot moving forward.",
        "Once upon a time, beside an ancient temple in Cambodia, there was a magic stream full of tiny stars. On full-moon nights, it lit the way to the festival.",
        "កាលពីព្រេងនាយ នៅក្បែរប្រាសាទបុរាណមួយ ក្នុងប្រទេសកម្ពុជា មានអូរវេទមន្តមួយ ពោរពេញដោយផ្កាយតូចៗ។ នៅយប់ព្រះចន្ទពេញវង់ វាបំភ្លឺផ្លូវទៅកាន់ពិធីបុណ្យ។"],
      problem: ["Close-up of the stream. The star-lights in the water fade one by one, and the water turns dark and still. Quiet, worried mood. Slow push-in.",
        "But this morning, the stars in the stream began to fade. Soon the water was dark. Without its light, no one could find the way to the festival.",
        "ប៉ុន្តែព្រឹកនេះ ផ្កាយនៅក្នុងអូរ ចាប់ផ្ដើមស្រអាប់។ មិនយូរប៉ុន្មាន ទឹកក៏ងងឹត។ បើគ្មានពន្លឺរបស់វា គ្មាននរណាអាចរកផ្លូវទៅពិធីបុណ្យបានទេ។"],
      mission: ["bring the stars back", "នាំផ្កាយត្រឡប់មកវិញ"], goal: ["make the river of stars shine again", "ធ្វើឲ្យទន្លេនៃផ្កាយ ភ្លឺឡើងវិញ"],
      prize: ["a glowing golden star-shaped stone", "a golden star stone, bright and warm. It was the heart of the river of stars!", "ថ្មរូបផ្កាយពណ៌មាស ភ្លឺ និងកក់ក្ដៅ។ វាគឺជាបេះដូង នៃទន្លេនៃផ្កាយ!"], item: ["star stone", "ថ្មផ្កាយ"],
      restore: ["gently drops the star stone into the dark stream. A quiet pause, then thousands of tiny stars light up and flow along the water like a glowing river",
        "dropped the star stone into the stream. For a moment, nothing happened. Then, sparkle! Thousands of stars lit up the water!",
        "ទម្លាក់ថ្មផ្កាយ ចូលក្នុងអូរ។ មួយសន្ទុះ គ្មានអ្វីកើតឡើងទេ។ បន្ទាប់មក ភ្លឹបភ្លែត! ផ្កាយរាប់ពាន់ បំភ្លឺផ្ទៃទឹក!"],
      again: ["The river of stars shone again.", "ទន្លេនៃផ្កាយ ភ្លឺឡើងវិញ។"] },
    { title: ["the Runaway Golden Kite", "ខ្លែងមាសដែលហោះបាត់"],
      intro: ["Dawn over an ancient Angkor-style temple and a wide green field beside a lotus pond. A beautiful golden kite shaped like a lotus is tied to a tall pole. Soft mist. Slow, wide establishing shot moving forward.",
        "Once upon a time, beside an ancient temple in Cambodia, a golden kite flew high on every full-moon night. Its glow told everyone the festival had begun.",
        "កាលពីព្រេងនាយ នៅក្បែរប្រាសាទបុរាណមួយ ក្នុងប្រទេសកម្ពុជា មានខ្លែងមាសមួយ ហោះខ្ពស់ នៅរាល់យប់ព្រះចន្ទពេញវង់។ ពន្លឺរបស់វា ប្រាប់អ្នកទាំងអស់គ្នាថា ពិធីបុណ្យបានចាប់ផ្ដើមហើយ។"],
      problem: ["A strong gust of wind snaps the kite's string. The golden kite tumbles away over the palm trees and disappears into the sky. Worried mood. Camera follows it up.",
        "But this morning, a strong wind snapped its string, and the golden kite flew far away. Without it, the festival could not begin.",
        "ប៉ុន្តែព្រឹកនេះ ខ្យល់បក់ខ្លាំង ធ្វើឲ្យខ្សែដាច់ ហើយខ្លែងមាសក៏ហោះទៅឆ្ងាយ។ បើគ្មានវា ពិធីបុណ្យមិនអាចចាប់ផ្ដើមបានទេ។"],
      mission: ["bring the golden kite home", "នាំខ្លែងមាសត្រឡប់មកផ្ទះវិញ"], goal: ["bring the golden kite home", "នាំខ្លែងមាសត្រឡប់មកផ្ទះវិញ"],
      prize: ["the golden lotus-shaped kite, caught gently on a carved stone lotus", "the golden kite, safe and shining, caught on a stone lotus. Hooray!", "ខ្លែងមាស នៅមានសុវត្ថិភាព និងភ្លឺចែងចាំង ជាប់នៅលើផ្កាឈូកថ្ម។ អស្ចារ្យណាស់!"], item: ["kite", "ខ្លែង"],
      restore: ["ties the golden kite to its pole and lets it go. The wind lifts it high, and it bursts into golden light in front of the full moon",
        "tied the kite to its pole and let it fly. For a moment, it wobbled. Then, whoosh! It soared up high, shining gold!",
        "ចងខ្លែងទៅនឹងបង្គោល ហើយបង្ហោះវា។ មួយសន្ទុះ វាយោលទៅមក។ បន្ទាប់មក វឺត! វាហោះឡើងខ្ពស់ ភ្លឺពណ៌មាស!"],
      again: ["The golden kite shone in the sky again.", "ខ្លែងមាស ភ្លឺលើមេឃម្ដងទៀត។"] },
    { title: ["the Sleeping Night Flowers", "ផ្កាពេលយប់ដែលដេកលក់"],
      intro: ["Dawn over an ancient Angkor-style temple garden full of closed white flowers around a lotus pond. Soft mist. Slow, wide establishing shot moving forward.",
        "Once upon a time, beside an ancient temple in Cambodia, there was a garden of magic night flowers. On full-moon nights, they opened and glowed like little stars.",
        "កាលពីព្រេងនាយ នៅក្បែរប្រាសាទបុរាណមួយ ក្នុងប្រទេសកម្ពុជា មានសួនផ្កាវេទមន្តពេលយប់មួយ។ នៅយប់ព្រះចន្ទពេញវង់ ផ្កាទាំងនោះរីក ហើយភ្លឺដូចផ្កាយតូចៗ។"],
      problem: ["Close-up of the night flowers drooping, their petals closed tight and pale, as if in a deep sleep. Quiet, worried mood. Slow push-in.",
        "But this morning, the flowers fell into a deep sleep. Nothing could wake them. Without their glow, the festival could not begin.",
        "ប៉ុន្តែព្រឹកនេះ ផ្កាទាំងនោះ ដេកលង់លក់យ៉ាងស្កប់ស្កល់។ គ្មានអ្វីអាចដាស់វាបានទេ។ បើគ្មានពន្លឺរបស់វា ពិធីបុណ្យមិនអាចចាប់ផ្ដើមបានទេ។"],
      mission: ["wake the night flowers", "ដាស់ផ្កាពេលយប់"], goal: ["wake the night flowers", "ដាស់ផ្កាពេលយប់"],
      prize: ["a tiny glowing drop of golden dew in a crystal shell", "a single drop of golden dew, sparkling in a crystal shell. It was the magic that wakes the flowers!", "ដំណក់ទឹកសន្សើមពណ៌មាសមួយ ភ្លឺចែងចាំង ក្នុងសំបកគ្រីស្តាល់។ វាគឺជាវេទមន្ត ដែលដាស់ផ្កា!"], item: ["dew drop", "ដំណក់ទឹកសន្សើម"],
      restore: ["lets the golden dew drop fall onto the sleeping flowers. A quiet pause, then flower after flower opens and glows like stars across the garden",
        "let the golden dew fall on the flowers. For a moment, nothing happened. Then, one by one, the flowers opened and glowed!",
        "ទម្លាក់ទឹកសន្សើមមាស ទៅលើផ្កា។ មួយសន្ទុះ គ្មានអ្វីកើតឡើងទេ។ បន្ទាប់មក ផ្កាម្ដងមួយៗ ក៏រីក ហើយភ្លឺចែងចាំង!"],
      again: ["The night flowers glowed again.", "ផ្កាពេលយប់ ភ្លឺឡើងវិញ។"] },
  ];
  const HELPERS = [
    { name: ["Phleu", "ភ្លឺ"], kind: ["firefly", "សត្វអំពិលអំពែក"], he: "she", look: "Phleu, a tiny cute glowing firefly with big sparkling eyes, a soft golden-green glow, delicate translucent wings and a tiny pink-and-gold flower crown", arrive: ["flew down", "ហោះចុះមក"], move: "flying" },
    { name: ["Dara", "តារា"], kind: ["little bird", "កូនបក្សីតូច"], he: "she", look: "Dara, a tiny cute blue-and-gold bird with big sparkling eyes, soft round feathers and a little golden crest", arrive: ["flew down", "ហោះចុះមក"], move: "flying" },
    { name: ["Sovann", "សុវណ្ណ"], kind: ["baby elephant", "កូនដំរីតូច"], he: "he", look: "Sovann, a tiny cute baby elephant with big sparkling eyes, soft grey-pink skin, big floppy ears and a little golden headpiece", arrive: ["came trotting over", "ដើរតម្រង់មក"], move: "trotting" },
    { name: ["Pich", "ពេជ្រ"], kind: ["butterfly", "មេអំបៅតូច"], he: "she", look: "Pich, a tiny cute butterfly with big sparkling eyes and shimmering pink-and-gold wings that leave a trail of glitter", arrive: ["fluttered down", "ហើរចុះមក"], move: "fluttering" },
    { name: ["Kong", "គង់"], kind: ["little frog", "កង្កែបតូច"], he: "he", look: "Kong, a tiny cute green-and-gold frog with big sparkling eyes, a wide happy smile and a little lotus-leaf hat", arrive: ["came hopping over", "លោតតម្រង់មក"], move: "hopping" },
  ];
  const CHALLENGES = [
    { stop: [`On the glowing path stands an old, shaky rope bridge over a misty stream. The ${dl} stops at the edge and looks down nervously.`, "But on the path stood an old, shaky bridge.", "ប៉ុន្តែនៅលើផ្លូវនោះ មានស្ពានចាស់មួយ ដែលរង្គើ។"],
      cross: [`The ${dl} steps onto the rope bridge. With every step, the wooden planks light up in gold beneath its feet. It reaches the other side and jumps for joy. Tracking shot from the side.`,
        `Step by step, the ${dl} crossed the bridge. With every step, the planks glowed gold. On the other side, it laughed with joy.`,
        `ម្ដងមួយជំហានៗ ${kA}ឆ្លងកាត់ស្ពាន។ រាល់ជំហាន ក្ដារស្ពានភ្លឺពណ៌មាស។ នៅម្ខាងទៀត វាសើចយ៉ាងសប្បាយ។`] },
    { stop: [`The glowing path leads into a dark, misty forest of giant twisted trees. The ${dl} stops at the edge and peers into the shadows nervously.`, "But the path led into a dark, quiet forest.", "ប៉ុន្តែផ្លូវនោះ នាំចូលទៅក្នុងព្រៃងងឹត និងស្ងាត់ស្ងៀមមួយ។"],
      cross: [`The ${dl} walks into the forest. Its golden glow lights up the leaves and flowers around it, and little glowing mushrooms light the way. Smooth tracking shot.`,
        `Step by step, the ${dl} walked into the forest. Its golden glow lit up the trees, and soon the whole forest was full of light.`,
        `ម្ដងមួយជំហានៗ ${kA}ដើរចូលក្នុងព្រៃ។ ពន្លឺមាសរបស់វា បំភ្លឺដើមឈើ ហើយមិនយូរប៉ុន្មាន ព្រៃទាំងមូល ក៏ពោរពេញដោយពន្លឺ។`] },
    { stop: [`A wide river blocks the glowing path, with only a line of small stepping stones across it. The ${dl} stops on the bank and looks at the water nervously.`, "But a wide river blocked the path, with only small stepping stones to cross it.", "ប៉ុន្តែទន្លេធំមួយ បាំងផ្លូវ ហើយមានតែដុំថ្មតូចៗ សម្រាប់ឈានឆ្លង។"],
      cross: [`The ${dl} hops from stone to stone across the river. Each stone glows gold under its feet. It lands on the far bank and jumps for joy. Tracking shot from the side.`,
        `Stone by stone, the ${dl} hopped across the river. Each stone glowed gold under its feet. On the other side, it laughed with joy.`,
        `ម្ដងមួយដុំៗ ${kA}លោតឆ្លងទន្លេ។ ដុំថ្មនីមួយៗ ភ្លឺពណ៌មាស នៅក្រោមជើងរបស់វា។ នៅម្ខាងទៀត វាសើចយ៉ាងសប្បាយ។`] },
    { stop: [`The glowing path climbs a steep stone hill, and a strong wind blows leaves past the ${dl}. It stops at the bottom and looks up nervously.`, "But the path climbed a steep stone hill, with a strong wind blowing.", "ប៉ុន្តែផ្លូវនោះ ឡើងភ្នំថ្មដ៏ចោត ហើយមានខ្យល់បក់ខ្លាំង។"],
      cross: [`The ${dl} climbs the hill step by step. The wind softens, golden light breaks through the clouds, and at the top it jumps for joy. Camera rises with it.`,
        `Step by step, the ${dl} climbed the hill. The wind grew softer, and at the top, it laughed with joy.`,
        `ម្ដងមួយជំហានៗ ${kA}ឡើងភ្នំ។ ខ្យល់ចាប់ផ្ដើមបក់ស្រាលវិញ ហើយនៅលើកំពូល វាសើចយ៉ាងសប្បាយ។`] },
  ];
  const Q = QUESTS[dnum % QUESTS.length], H = HELPERS[dnum % HELPERS.length], CH = CHALLENGES[dnum % CHALLENGES.length];
  const hn = H.name[0], hk = H.name[1], She = H.he === "she" ? "She" : "He", she = H.he;
  const storyTitle = [`The Golden ${day} and ${Q.title[0]}`, `${kA}មាស និង${Q.title[1]}`];
  const SS = (t, prompt, en, kmL) => [t, `${prompt} ${hn} the ${H.kind[0]} matches ${H.he === "she" ? "her" : "his"} reference image; the ${dl} matches its reference image.`, en, kmL];
  const storyScenes = [
    ["Once upon a time", ...Q.intro],
    [`${cap(Q.title[0].replace(/^the /, ""))} in trouble`, ...Q.problem],
    SS(`The ${day} wakes up`, `In the middle of the pond, a golden lotus opens petal by petal, revealing ${LOOK[day]}, who wakes up, stretches and blinks its big sparkling eyes in the morning light. Gentle push-in.`,
      `In the middle of the pond, a golden lotus opened, and out came a little golden ${dl}. Today was ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day, and the ${dl} felt something special.`,
      `នៅកណ្ដាលស្រះ ផ្កាឈូកមាសមួយបានរីក ហើយមាន${kA}មាសតូចមួយ ចេញមក។ ថ្ងៃនេះជាថ្ងៃ${dayKm} ហើយ${kA}មានអារម្មណ៍ពិសេសណាស់។`),
    SS(`${hn} the ${H.kind[0]}`, `${cap(H.look)} arrives ${H.move} and stops right in front of the ${dl}, smiling. The ${dl} looks back with wide, curious eyes. Close two-shot.`,
      `A ${H.kind[0]} named ${hn} ${H.arrive[0]}. "Little ${day}," ${she} said, "only you can ${Q.mission[0]}. Today is your lucky day!"`,
      `${H.kind[1]}មួយ ឈ្មោះ${hk} ${H.arrive[1]}។ ${hk}និយាយថា "${kA}តូចអើយ មានតែអ្នកទេ ដែលអាច${Q.mission[1]}។ ថ្ងៃនេះ ជាថ្ងៃសំណាងរបស់អ្នក!"`),
    SS("Chosen by the moon", `The ${dl} looks up at the pale morning moon still in the sky, and ${S9.vis}. ${hn} watches happily. ${cap(S9.mood)} mood. Slow upward tilt.`,
      `${S9.en} ${hn} smiled. That was exactly why the moon had chosen it.`,
      `${S9.km} ${hk}ញញឹម។ នេះហើយ ជាហេតុដែលព្រះចន្ទ បានជ្រើសរើសវា។`),
    SS("Three lucky treasures", `Three glowing golden symbols appear in the air as ${hn} points to them: a small lantern, a compass and a bell. The ${dl} watches with excitement. Magical sparkles. Slow orbit.`,
      `To ${Q.goal[0]}, the little hero needed three lucky treasures: its lucky color, its lucky path, and its lucky numbers.`,
      `ដើម្បី${Q.goal[1]} វីរបុរសតូច ត្រូវការរតនសម្បត្តិសំណាងបី៖ ពណ៌សំណាង ផ្លូវសំណាង និងលេខសំណាង។`),
    SS("The journey begins", `The ${dl} ${POSE[day]}, then lands on the far bank of the pond, where ${hn} joins it. Dynamic camera following the movement.`,
      `"Let's go!" said the ${dl}, and it set off on its adventure, with ${hn} right by its side.`,
      `${kA}និយាយថា "តោះទៅ!" ហើយវាក៏ចេញដំណើរផ្សងព្រេង ដោយមាន${hk} នៅក្បែរខ្លួនជានិច្ច។`),
    SS("A good heart", `The ${dl} walks through a small Khmer village in the morning, wooden houses on stilts and palm trees around, and gently helps a little bird back into its nest while ${hn} watches. Warm sunlight. Smooth tracking shot.`,
      SC.personality[2], SC.personality[3]),
    SS("The first treasure", `A magical garden filled with a thousand floating lanterns of every color. Among them, one ${cen} lantern begins to glow brighter than all the others. The ${dl} and ${hn} stare in wonder. Slow push-in toward the ${cen} lantern.`,
      `The first treasure was waiting in a garden of a thousand lanterns. Only one shone brightest. It was ${cen}, the ${dl}'s lucky color today.`,
      `រតនសម្បត្តិទីមួយ កំពុងរង់ចាំ នៅក្នុងសួនចង្កៀងមួយពាន់។ មានតែមួយប៉ុណ្ណោះ ដែលភ្លឺជាងគេ។ វាគឺពណ៌${ckm} ដែលជាពណ៌សំណាងរបស់${kA}ថ្ងៃនេះ។`),
    SS("Wearing the lucky color", `The ${cen} lantern melts into a soft glowing ${cen} ribbon that ties itself around the ${dl}'s neck. The ${dl} smiles and spins happily. Close-up, then pull back.`,
      `The ${dl} tied a ${cen} ribbon around its neck. "Wear your lucky color," said ${hn}, "and good luck stays close to you."`,
      `${kA}ចងខ្សែបូពណ៌${ckm} ជុំវិញក។ ${hk}និយាយថា "ស្លៀកពាក់ពណ៌សំណាងរបស់អ្នក ហើយសំណាងល្អ នឹងនៅជិតអ្នក។"`),
    SS("The lucky path", `A crossroads of old stone paths in a palm forest. One path begins to glow with golden light, stretching toward the ${dir}. The ${dl} looks at it, then at ${hn}. Wide shot, then push-in along the glowing path.`,
      `Next, they came to a crossroads with many paths. One path began to glow. It pointed to the ${dir}, the ${dl}'s lucky direction.`,
      `បន្ទាប់មក ពួកគេមកដល់ផ្លូវបំបែកមួយ ដែលមានផ្លូវជាច្រើន។ ផ្លូវមួយ ចាប់ផ្ដើមភ្លឺ។ វាចង្អុលទៅទិស${dirKm} ដែលជាទិសសំណាងរបស់${kA}។`),
    SS("A difficult moment", `${CH.stop[0]} Slightly tense but gentle mood. Slow push-in on its face.`,
      `${CH.stop[1]} The ${dl} stopped. Sometimes, people born in the Year of the ${day} ${weakEn}.`,
      `${CH.stop[2]} ${kA}ឈប់។ អ្នកកើតឆ្នាំ${dayKm} ${PK ? PK.weaknesses : ""}`),
    SS("Trust your heart", `${hn} comes close to the ${dl} and smiles warmly. The ${dl} closes its eyes and takes a slow, deep breath, and a gentle golden aura grows around it. Close-up, calm and encouraging mood.`,
      `${hn} came close and smiled. "Breathe slowly," ${she} said. "Trust your heart. You are stronger than you think."`,
      `${hk}មកជិត ហើយញញឹម។ ${hk}និយាយថា "ដកដង្ហើមយឺតៗ។ ជឿលើចិត្តរបស់អ្នក។ អ្នកខ្លាំងជាងអ្វីដែលអ្នកគិត។"`),
    SS("Brave steps", CH.cross[0], CH.cross[1], CH.cross[2]),
    SS("A lesson learned", `The ${dl} stands on a small rise looking back at the way it came, golden afternoon light around it, ${hn} beside it. Peaceful, proud mood. Slow pull-back.`,
      "The little hero learned that its worries were small, and its good heart was big. Balance and courage always help us grow.",
      "វីរបុរសតូចបានរៀនថា ការព្រួយបារម្ភរបស់វា តូចទេ តែចិត្តល្អរបស់វា ធំណាស់។ តុល្យភាព និងភាពក្លាហាន តែងជួយឲ្យយើងរីកចម្រើន។"),
    SS("The stone door", `A great carved stone door deep in the ancient temple, decorated with lotus flowers, a row of small golden bells and carved stairs. Light beams fall through the ruins. The ${dl} and ${hn} look up at it in awe. Slow upward tilt.`,
      "At last, they reached a great stone door in the temple. Carved above it were bells, stairs, and a riddle about lucky numbers.",
      "ទីបំផុត ពួកគេមកដល់ទ្វារថ្មដ៏ធំមួយ នៅក្នុងប្រាសាទ។ នៅខាងលើទ្វារ មានរូបចម្លាក់កណ្ដឹង ជណ្ដើរ និងប្រស្នាអំពីលេខសំណាង។"),
    SS("Waiting for the best time", `A circle of golden light like a sundial glows on the temple stone, and its shadow turns slowly while the ${dl} sits patiently beside ${hn}. Time-lapse of light and shadow moving. Calm mood.`,
      `"The door opens only at your best time," said ${hn}. For the ${day} today, that is ${sayTime(dd.lucky.time)}. They waited patiently.`,
      `${hk}និយាយថា "ទ្វារនេះ បើកតែនៅពេលល្អបំផុតរបស់អ្នកប៉ុណ្ណោះ។" សម្រាប់${kA}ថ្ងៃនេះ គឺ${sayTimeKm(dd.lucky.time)}។ ពួកគេរង់ចាំដោយអត់ធ្មត់។`),
    SS("Ringing the bells", `The ${dl} rings a row of small golden bells one by one. Each bell sends out a ripple of golden light, and the carvings on the stone door begin to glow. Close-up on the bells, then the door.`,
      `When the time came, the ${dl} rang the golden bells ${d1 === "1" ? "once" : `${d1} times`}, its first lucky number. Ding! The door began to shine.`,
      `ពេលដល់ម៉ោង ${kA}វាយកណ្ដឹងមាស ចំនួន ${d1} ដង ដែលជាលេខសំណាងទីមួយរបស់វា។ ទីង! ទ្វារចាប់ផ្ដើមភ្លឺ។`),
    SS("The stairway of light", `The stone door slides open, revealing a spiral stairway of glowing golden steps rising up inside the temple tower. The ${dl} climbs quickly, ${hn} close behind. Camera spirals upward with them.`,
      `The door opened, and a stairway of light appeared. The ${dl} climbed ${d2} glowing steps, its second lucky number, up to the top of the tower.`,
      `ទ្វារបើក ហើយមានជណ្ដើរពន្លឺមួយ លេចឡើង។ ${kA}ឡើងជណ្ដើរភ្លឺ ចំនួន ${d2} កាំ ដែលជាលេខសំណាងទីពីររបស់វា រហូតដល់កំពូលប្រាង្គ។`),
    SS("The treasure", `At the top of the tower rests ${Q.prize[0]}. The ${dl} gently lifts it, and its face lights up with wonder. Close-up, glowing light.`,
      `At the top of the tower, they found ${Q.prize[1]}`,
      `នៅលើកំពូលប្រាង្គ ពួកគេបានរកឃើញ${Q.prize[2]}`),
    SS("Seven little lights", `Seven tiny lights twinkle in a circle around the glowing ${Q.item[0]}, and two of them shine brighter than the rest. The ${dl} and ${hn} look closely. Close-up, magical sparkles.`,
      `Around the ${Q.item[0]}, seven little lights twinkled, one for each day of the week. ${ldEn[0]} and ${ldEn[1]} shone brightest, the ${day}'s lucky days.`,
      `នៅជុំវិញ${Q.item[1]} មានពន្លឺតូចៗប្រាំពីរ ភ្លឺភ្លឹបភ្លែតៗ មួយសម្រាប់ថ្ងៃនីមួយៗក្នុងសប្ដាហ៍។ ${ldKm[0]} និង${ldKm[1]} ភ្លឺជាងគេ ដែលជាថ្ងៃសំណាងរបស់ឆ្នាំ${dayKm}។`),
    SS("Hurrying home", `The ${dl} hurries home along the glowing path at dusk, carefully carrying the ${Q.item[0]}, ${hn} ${H.move} beside it. Orange and pink sky, temple towers in silhouette. Fast tracking shot.`,
      `Time was running out. Holding the ${Q.item[0]} carefully, the little hero hurried home, with ${hn} right beside it.`,
      `ពេលវេលាជិតអស់ហើយ។ វីរបុរសតូច កាន់${Q.item[1]}យ៉ាងប្រុងប្រយ័ត្ន ហើយប្រញាប់ត្រឡប់ទៅផ្ទះវិញ ដោយមាន${hk} នៅក្បែរ។`),
    ["Is it too late?", "Night at the lotus pond beside the temple. The full moon is rising, and small cute golden animals wait anxiously around the water. Quiet, suspenseful mood. Slow pan.",
      "Back at the pond, everyone was waiting. The night was dark, and the full moon was rising. Was it too late?",
      "នៅឯស្រះវិញ អ្នកទាំងអស់គ្នា កំពុងរង់ចាំ។ យប់ងងឹត ហើយព្រះចន្ទពេញវង់ កំពុងរះ។ តើយឺតពេលហើយឬ?"],
    SS("The magic returns", `The ${dl} ${Q.restore[0]}. Dramatic, joyful moment. Camera rises with the light.`,
      `The ${dl} ${Q.restore[1]}`, `${kA}${Q.restore[2]}`),
    SS("The full-moon festival", `Hundreds of lanterns rise into the sky and soft lotus-shaped golden fireworks burst over the temple. Little golden animals cheer around the ${dl} and ${hn}. Wide, celebratory shot.`,
      `${Q.again[0]} Lanterns rose into the sky, and the full-moon festival began. Everyone cheered for the little golden hero!`,
      `${Q.again[1]} គោមហោះឡើងលើមេឃ ហើយពិធីបុណ្យព្រះចន្ទពេញវង់ ក៏ចាប់ផ្ដើម។ អ្នកទាំងអស់គ្នា អបអរសាទរវីរបុរសមាសតូច!`),
    SS("Thank you from the moon", `A soft beam of moonlight falls from the full moon onto the ${dl}, which glows brighter and closes its eyes with a peaceful smile, ${hn} beside it. Warm, gentle mood. Slow push-in.`,
      `The full moon shone down warmly, as if to say thank you. The ${dl} felt peaceful and proud. It had done its very best.`,
      `ព្រះចន្ទពេញវង់ បញ្ចាំងពន្លឺកក់ក្ដៅចុះមក ហាក់ដូចជាពោលពាក្យអរគុណ។ ${kA}មានអារម្មណ៍ស្ងប់ និងមានមោទនភាព។ វាបានព្យាយាមអស់ពីសមត្ថភាព។`),
    SS("Your day too", `The ${dl} turns to the camera and waves happily, wearing its ${cen} ribbon, with the festival lights and full moon behind it. ${hn} waves too. Medium close-up.`,
      `If you were born in the Year of the ${day}, today is your day too. Like our hero, be brave, be kind, and follow your good heart.`,
      `បើអ្នកកើតឆ្នាំ${dayKm} ថ្ងៃនេះ ក៏ជាថ្ងៃរបស់អ្នកដែរ។ ដូចវីរបុរសតូចរបស់យើង សូមក្លាហាន មានចិត្តល្អ ហើយធ្វើតាមចិត្តល្អរបស់អ្នក។`),
    SC.recap,
    SS("Sweet dreams", `Under the bright full moon, the ${dl} curls up on its glowing lotus and falls asleep, ${hn} sleeping beside it. The lanterns slowly drift away into the stars. Calm, dreamy mood. Slow pull-back.`,
      `And so, under the bright full moon, the little golden hero and ${hn} fell fast asleep, dreaming of tomorrow.`,
      `ហើយដូច្នេះ នៅក្រោមពន្លឺព្រះចន្ទពេញវង់ វីរបុរសមាសតូច និង${hk} ក៏លង់លក់ ដោយសុបិនអំពីថ្ងៃស្អែក។`),
    SC.end,
  ];
  const storyChapters = [[0, "Once upon a time", "កាលពីព្រេងនាយ"], [8, "The lucky color", "ពណ៌សំណាង"], [10, "The lucky path", "ផ្លូវសំណាង"], [15, "The stone door", "ទ្វារថ្ម"], [22, "The full-moon festival", "ពិធីបុណ្យព្រះចន្ទពេញវង់"], [27, "Today's luck", "សំណាងថ្ងៃនេះ"]].map(([i, en, kmn]) => [mmss(i * 10), en, kmn]);
  VIDEOS.push({ id: "story", name: `Story video – YouTube (about ${Math.round(storyScenes.length * 10 / 60)} minutes)`, secs: storyScenes.length * 10, scenes: storyScenes,
    chapters: storyChapters.map(([t, en]) => [t, en]),
    intro: `"${storyTitle[0]}" (${storyTitle[1]}): an original fairy tale (${mmss(storyScenes.length * 10)}) starring today's luckiest animal. A new story every day: today the golden ${dl} and ${hn} the ${H.kind[0]} must ${Q.mission[0]} before the full-moon festival. Today's lucky color, direction, best time, lucky numbers and lucky days are part of the story. Make the picture of ${hn} once (prompt below) and add it and the ${day} picture as ingredients in Flow. ${storyScenes.length} clips of 10 seconds, in order 1 to ${storyScenes.length}.\n\n### Character prompt – ${hn} the ${H.kind[0]} (make once, keep it)\nCreate a premium-quality 3D animated fantasy character of ${H.look}, inspired by the charm of classic Disney and Pixar-style animated family films. Adorable expressive face, warm magical glow, on a glowing pink lotus by a pond at night, a softly lit Khmer temple inspired by Angkor Wat and a full moon behind. Cinematic lighting, beautiful depth of field. Square 1:1, full body visible, centered. No text, no letters, no watermark.` });
  // titles and captions for the luckiest-animal videos, in both languages
  const longDateKm = `ថ្ងៃទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]} ឆ្នាំ ${iso.slice(0, 4)}`;
  const factsEn = [`Lucky color: ${cen}`, `Best time: ${dd.lucky.time}`, `Lucky direction: ${dir}`, `Lucky numbers: ${n0.d1} · ${n0.d2} · ${n0.d3}`];
  const factsKm = [`ពណ៌សំណាង៖ ពណ៌${ckm}`, `ពេលល្អ៖ ${dd.lucky.time}`, `ទិសសំណាង៖ ទិស${dirKm}`, `លេខសំណាង៖ ${n0.d1} · ${n0.d2} · ${n0.d3}`];
  const chapKm = [["0:00", "សេចក្ដីផ្ដើម"], ...F.signs.map((sg, i) => [mmss((4 + i * 2) * 10), `ឆ្នាំ${sg.nameKm} – ${sg.label.km}`]), [mmss((4 + 24) * 10), "បញ្ចប់"]];
  const POSTS = {
    "60s": [
      ["Title – English", `${EMO[day]} ${day} Day – Today's Luckiest Sign! | ${D}`],
      ["Title – Khmer", `${EMO[day]} ថ្ងៃ${dayKm} – ឆ្នាំដែលសំណាងបំផុតថ្ងៃនេះ! | ${D}`],
      ["Caption – English (Facebook, TikTok)", `${S9.en} ${EMO[day]}🌕\n\nToday, ${D}, is a ${dd.label.en} for the ${day}.\n${factsEn.map((x) => `✨ ${x}`).join("\n")}\n\nBorn in the Year of the ${day}? Comment ${EMO[day]} below! 👇\nAll 12 signs: https://mybirthsign.com (TikTok: link in bio)\nLucky numbers are for fun only.\n\n${tagsEn} #fyp #Reels`],
      ["Caption – Khmer (Facebook, TikTok)", `${S9.km} ${EMO[day]}🌕\n\nថ្ងៃនេះ ${D} ជា${dd.label.km} សម្រាប់ឆ្នាំ${dayKm}។\n${factsKm.map((x) => `✨ ${x}`).join("\n")}\n\nអ្នកកើតឆ្នាំ${dayKm}មែនទេ? Comment ${EMO[day]} ប្រាប់ផង! 👇\nមើលរាសីទាំង 12៖ https://mybirthsign.com/km/ (TikTok៖ Link នៅក្នុង bio)\nលេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ។\n\n${tags} #fyp #Reels`],
    ],
    "180s": [
      ["Title – English", `${day} Day Fortune – ${D} | Lucky Color, Time & Numbers for the Year of the ${day} ${EMO[day]}`],
      ["Title – Khmer", `ជោគជតាឆ្នាំ${dayKm} – ${D} | ពណ៌ ពេលវេលា និងលេខសំណាង ${EMO[day]}`],
      ["Description – English", `Today, ${LD}, is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day: a ${dd.label.en} for everyone born in the Year of the ${day}. ${S9.en}\n\n${factsEn.join("\n")}${PI ? `\nLucky days of the week: ${PI.luckyDays.join(" and ")}` : ""}\n\nLucky numbers are for fun only, not a prediction or betting advice.\n\nSee all 12 signs: https://mybirthsign.com\n\n${DISC_EN}\n\n${tagsEn}`],
      ["Description – Khmer", `ថ្ងៃនេះ ${longDateKm} ជាថ្ងៃ${dayKm} ដែលជា${dd.label.km} សម្រាប់អ្នកកើតឆ្នាំ${dayKm}។ ${S9.km}\n\n${factsKm.join("\n")}${PK ? `\nថ្ងៃសំណាងប្រចាំសប្ដាហ៍៖ ${PK.luckyDays.join(" និង")}` : ""}\n\n${disclaimerNums}\n\nមើលរាសីទាំង 12៖ https://mybirthsign.com/km/\n\n${disclaimer}\n\n${tags}`],
    ],
    long: [
      ["Title – English", `Daily Chinese Zodiac Fortune for All 12 Signs – ${D} | ${day} Day ${EMO[day]}`],
      ["Title – Khmer", `ជោគជតារាសីទាំង 12 ប្រចាំថ្ងៃ – ${D} | ថ្ងៃ${dayKm} ${EMO[day]}`],
      ["Description – English", `Your Chinese zodiac fortune for all 12 signs, ${LD}. ${summaryEn}\n\nChapters:\n${longChapters.map(([t, n]) => `${t} ${n.replace(/ \([^)]*\)/, "")}`).join("\n")}\n\nLucky numbers are given for today's lucky signs, for fun only, not betting advice.\n\nSee your sign: https://mybirthsign.com\n\n${DISC_EN}\n\n${tagsEn}`],
      ["Description – Khmer", `ជោគជតារាសីទាំង 12 សម្រាប់${longDateKm}។ ${summaryKm}\n\nជំពូក៖\n${chapKm.map(([t, n]) => `${t} ${n}`).join("\n")}\n\n${disclaimerNums}\n\nមើលរាសីរបស់អ្នក៖ https://mybirthsign.com/km/\n\n${disclaimer}\n\n${tags}`],
    ],
  };
  POSTS.story = [
    ["Title – English", `${storyTitle[0]} ${EMO[day]} | Bedtime Story & ${day} Day Fortune – ${D}`],
    ["Title – Khmer", `${storyTitle[1]} ${EMO[day]} | រឿងនិទាន និងជោគជតាថ្ងៃ${dayKm} – ${D}`],
    ["Description – English", `On a ${day} day, a little golden ${dl} and ${hn} the ${H.kind[0]} must find three lucky treasures to ${Q.goal[0]} before the full-moon festival. A gentle animated story for the whole family, with today's real lucky color, direction, best time and numbers for the Year of the ${day}.\n\nChapters:\n${storyChapters.map(([t, en]) => `${t} ${en}`).join("\n")}\n\n${factsEn.join("\n")}\n\nAn original story by MyBirthSign. Lucky numbers are for fun only.\nSee all 12 signs: https://mybirthsign.com\n\n${DISC_EN}\n\n${tagsEn} #BedtimeStory #KidsStory`],
    ["Description – Khmer", `នៅថ្ងៃ${dayKm} ${kA}មាសតូចមួយ និង${H.kind[1]}ឈ្មោះ${hk} ត្រូវស្វែងរករតនសម្បត្តិសំណាងបី ដើម្បី${Q.goal[1]} មុនពិធីបុណ្យព្រះចន្ទពេញវង់។ ជារឿងនិទានគំនូរជីវចលសម្រាប់គ្រួសារទាំងមូល ជាមួយពណ៌សំណាង ទិសសំណាង ពេលល្អ និងលេខសំណាងពិតប្រាកដ សម្រាប់អ្នកកើតឆ្នាំ${dayKm}ថ្ងៃនេះ។\n\nជំពូក៖\n${storyChapters.map(([t, , kmn]) => `${t} ${kmn}`).join("\n")}\n\n${factsKm.join("\n")}\n\nរឿងនិទានដើម ដោយ MyBirthSign។ លេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ។\nមើលរាសីទាំង 12៖ https://mybirthsign.com/km/\n\n${disclaimer}\n\n${tags} #រឿងនិទាន`],
  ];
  VIDEOS.forEach((v) => { v.posts = POSTS[v.id]; });
  const srtVid = {};
  VIDEOS.forEach((v) => { srtVid[v.id] = { km: srtFor(v.scenes, "km"), en: srtFor(v.scenes, "en") }; });
  const videoMd = (v) => `## ${v.name}
${v.intro || `A ${v.secs}-second video about the ${day}, today's luckiest animal: ${v.scenes.length} clips of 10 seconds. Set the clip length in Flow to 10 seconds and add the reference picture of the ${day} as an ingredient. For each scene, press "Copy + English voice" or "Copy + Khmer voice": it copies the style line, the scene and the voice together. Put the clips in order 1 to ${v.scenes.length}.`}
${v.chapters ? `\n### YouTube chapters (paste into the description)\n${v.chapters.map(([t, n]) => `${t} ${n}`).join("\n")}\n` : ""}${v.posts ? `\n${v.posts.map(([h, t]) => `### ${h}\n${t}`).join("\n\n")}\n` : ""}
${v.scenes.map(([t, prompt, en, kmL], i) => `### Scene ${i + 1} – ${t} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${prompt}\nEnglish voice: Audio: ${VOICE_EN} says: "${en}" ${MUSIC}\nKhmer voice: Audio: ${VOICE_KM} says in Khmer: "${kmL}" ${MUSIC}`).join("\n\n")}

## Voice-over – ${v.id === "long" ? "long YouTube video" : v.id === "story" ? "story video" : `${v.secs}-second video`}
The same lines as the voice in each scene above, all together, for recording the voice yourself or with text-to-speech (then copy the scenes with plain "Copy", so Flow does not add a voice too).

### English
${v.scenes.map((x, i) => `Scene ${i + 1} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${x[2]}`).join("\n\n")}

### Khmer
${v.scenes.map((x, i) => `Scene ${i + 1} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${x[3]}`).join("\n\n")}

### Subtitles – Khmer (${iso}-${v.id}.srt)
\`\`\`
${srtVid[v.id].km}\`\`\`

### Subtitles – English (${iso}-${v.id}.en.srt)
\`\`\`
${srtVid[v.id].en}\`\`\``;
  const md = `# Daily video prompt pack — ${D} · ${day} day (ថ្ងៃ${dayKm})

Lucky signs: ${lucky.join(", ")}${careful.length ? ` · Careful: ${careful.join(", ")}` : ""}
Format: vertical 9:16 (YouTube Shorts, Facebook Reels, TikTok), about 45 seconds: 4 Veo scenes of about 8 seconds, then a lucky-numbers scene of about 10–12 seconds.
Two versions: make the pictures once, then record a Khmer voice-over and an English voice-over (two videos, or one video with both subtitle tracks).
Ratings, lucky signs and lucky numbers come from the site's fixed rules and match the website's daily fortune for this date.${same ? "" : "\nVoice-over wording: standard script (this pack was made ahead; the site's own daily wording appears the day before)."}

## Luckiest animal today – ${day} (${km(day)}) · ${sign(day).label.en}
One hero post for the day's luckiest animal: a picture, a short video and a caption. Lucky color ${sign(day).lucky.color.en} (${sign(day).lucky.color.km}) · best time ${sign(day).lucky.time} · lucky numbers ${[nums[0].d1, nums[0].d2, nums[0].d3, nums[0].d4, nums[0].d5].join(" · ")} (for fun only).

### Picture prompt (square 1:1)
${HERO(day)}

### Video prompt for Flow (9:16, about 8 seconds)
Vertical 9:16. Premium 3D animated golden style, same ${day.toLowerCase()} as the reference picture. ${cap(LOOK[day])} sits peacefully on its glowing lotus under a huge full moon. A soft beam of moonlight falls on it, its golden details glow, and it rises gently into the air, floating slowly toward the moon with a trail of silver-gold sparkles and lotus petals. ${cap(SYMBOL[day].mood)} mood. Slow, smooth camera rising with it. No text.
Audio: ${VOICE_EN} says: "Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day! ${SYMBOL[day].en}" ${MUSIC}
Khmer audio (use instead for the Khmer video): Audio: ${VOICE_KM} says in Khmer: "ថ្ងៃនេះជាថ្ងៃ${dayKm}! ${SYMBOL[day].km}" ${MUSIC}

### Caption – English
${SYMBOL[day].en} ${EMO[day]}🌕 Today, ${D}, is a ${sign(day).label.en} for the ${day}. Lucky numbers: ${nums[0].d1} · ${nums[0].d2} · ${nums[0].d3} (for fun only). All 12 signs: https://mybirthsign.com

### Caption – Khmer
${SYMBOL[day].km} ${EMO[day]}🌕 ថ្ងៃនេះ ${D} ជា${sign(day).label.km}សម្រាប់ឆ្នាំ${dayKm}។ លេខសំណាង៖ ${nums[0].d1} · ${nums[0].d2} · ${nums[0].d3} (សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ)។ មើលរាសីទាំង 12៖ https://mybirthsign.com/km/

${VIDEOS.map(videoMd).join("\n\n")}

## Style (paste first in every scene)
${STYLE}

## Reference pictures (make these first, so each animal looks the same in every scene)
Optional ready-made references: your site's golden animal pictures, e.g. https://mybirthsign.com/images/profile/spirit-tiger.webp. Make each picture once, then add it as a reference image ("ingredient") in Flow, or use it as the starting image of a scene.

### Character reference image prompts
${inVideo.map((a) => `- **${a}:** ${CHAR(a)}`).join("\n")}

### Start-frame image prompts (make the picture, then animate it with "frames to video")
1. Vertical 9:16. Premium 3D animated golden style, same characters as the reference pictures. ${cap(LOOK[day])} stands on the worn stone steps of an ancient Khmer temple at dusk, carved sandstone towers behind it, a full moon rising in a deep blue sky, warm last light on its face. Shallow depth of field. No text.
2. Vertical 9:16. Premium 3D animated golden style, same characters as the reference pictures. ${cap(looks(lucky))} together on the grass in front of an ancient Khmer temple at golden hour, palm trees and soft mist behind them, warm light on their faces. Glowing golden aura, cute but powerful. No text.
${careful.length ? `3. Vertical 9:16. Premium 3D animated golden style, same characters as the reference pictures. ${cap(LOOK[careful[0]])} resting quietly beside a still lotus pond at dusk, pink lotus flowers in the foreground, the reflection of a temple tower and the full moon on the water. Peaceful mood. No text.` : "3. Vertical 9:16. Premium 3D animated golden style, same characters as the reference pictures. A still lotus pond at dusk, pink lotus flowers in the foreground, the reflection of a temple tower and the full moon on the water. Peaceful mood. No text."}
4. Vertical 9:16. Premium 3D animated golden style, same characters as the reference pictures. A full moon rising over a wide lotus pond, the silhouette of an ancient Khmer temple with carved towers on the horizon, palm trees, soft mist on the water, deep blue dusk sky with open space at the top of the frame. No text.
5. Vertical 9:16. Premium 3D animated golden style, same characters as the reference pictures. A huge glowing golden zodiac wheel with twelve cute golden zodiac animals around its rim, floating in front of an ancient Khmer temple, lit by the full moon and golden light rays, pink lotus offerings below, open space in the middle and lower part of the frame for captions. No text.

### YouTube thumbnail image prompt
Vertical 9:16 (can be cropped to 16:9). Premium 3D golden-style close-up of ${LOOK[day]} facing the viewer in warm golden evening light, an ancient Khmer temple and a glowing full moon softly blurred behind, ${lucky.filter((a) => a !== day).length ? `${looks(lucky.filter((a) => a !== day))} smaller in the background, ` : ""}glowing golden aura, vivid, powerful and eye-catching. No text, no letters, no logos. (Add the title and date in your editor.)

## Scene 1 – ${day} day
Magical and powerful. ${cap(LOOK[day])} stands on its glowing lotus pedestal on the pond in front of the Angkor-style temple under a huge full moon. Its eyes light up, a golden aura bursts around it, and it ${POSE[day]}. The lotus pond ripples with golden light and lanterns rise into the sky. Dynamic camera: start close on its face, then sweep up and follow it through the air. Cute, majestic and full of energy, matching the reference image.

## Scene 2 – Lucky signs
Magical and powerful. ${cap(looks(lucky))} fly in from three directions on trails of golden light and land together on glowing lotus pedestals in front of the temple. As they land, a ring of golden energy explodes outward, lotus flowers bloom across the pond and a shower of sparkles and gold coins falls from the sky. They look at each other and cheer. The camera orbits around them in a smooth circle. The animals match the reference images.

## Scene 3 – ${careful.length ? `${careful.join(", ")}, take it easy` : "A calm moment"}
${careful.length ? `Premium 3D animated golden style, same characters as the reference pictures. ${cap(LOOK[careful[0]])} curls up on a lotus pedestal as a soft protective bubble of golden light forms around it like a shield. Gentle glowing butterflies and petals circle it, and the full moon shines calmly on the still water. The mood is peaceful, safe and magical, not sad. The camera moves in slowly. The ${careful[0].toLowerCase()} matches the reference image.` : "Premium 3D animated golden style, same characters as the reference pictures. A still lotus pond at dusk, pink lotus flowers swaying gently, the reflection of a temple tower and the full moon shimmering on the water. The camera moves in slowly."}

## Scene 4 – Outro
Magical and powerful. Golden light beams shoot up from the temple towers into the night sky and burst into gentle golden fireworks shaped like lotus flowers. Hundreds of floating lanterns rise over the glowing pond and the huge full moon. The camera rises up and pulls back for a wide, epic view, leaving open sky at the top of the frame for a title.

## Scene 5 – Lucky numbers (about 10–12 seconds)
Magical and powerful. A huge glowing golden zodiac wheel rises out of the lotus pond in front of the temple, with twelve cute golden zodiac animals around its rim. It spins faster and faster, shooting beams of golden light and sparkles, then slows to a gentle, shining turn under the full moon. The camera slowly pushes in, keeping open space in the middle and lower part of the frame for the number captions. (Loop the slow-turning part, or slow-zoom a still picture, to fill the time.)

## On-screen captions (add in the editor)
### Khmer version
1. ជោគជតារាសីប្រចាំថ្ងៃនេះ · ${D} · ថ្ងៃ${dayKm}
2. ${luckyLabelsKm}
${careful.length ? `3. ${careful.map((a) => `${km(a)} – ${sign(a).label.km} · គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ`).join(" ")}` : "3. —"}
4. ចូលមើលលម្អិតនៅ mybirthsign.com
5. លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង
${nums.map((n) => numLine(n, km(n.a))).join("\n")}
   សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ

### English version
1. Daily Chinese Zodiac Fortune · ${D} · ${day} Day
2. ${luckyLabelsEn}
${careful.length ? `3. ${careful.map((a) => `${a} – ${sign(a).label.en} · slow down and rest`).join(" ")}` : "3. —"}
4. More at mybirthsign.com
5. Today's lucky numbers for the lucky signs
${nums.map((n) => numLine(n, n.a)).join("\n")}
   For fun only

## Voice in Google Flow (spoken inside each clip)
Flow (Veo) can make the voice and music together with the picture. Add ONE of these lines to the END of each scene prompt: the English one for the English video, the Khmer one for the Khmer video. Each line is short enough for an 8-second clip.
Put the clips in this order in your editor: 1, 2, 3, 5 (lucky numbers), 4 (ending).
Voice style (keep it the same every day so the channel has one recognisable voice): ${VOICE_EN}
Khmer note: if Flow does not pronounce Khmer well, use the English version in Flow and record the Khmer voice-over below yourself or with a Khmer text-to-speech app.

${[
  ["1", `Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day! Here is your Chinese zodiac fortune for ${LD.replace(/^\w+, /, "")}.`, `ជោគជតារាសីប្រចាំថ្ងៃនេះ ថ្ងៃទី ${Number(iso.slice(8))} ខែ${["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"][Number(iso.slice(5,7))-1]}។ ថ្ងៃនេះជាថ្ងៃ${dayKm}!`],
  ["2", `${list(lucky)} are the luckiest signs today!`, `ឆ្នាំ${kmList(lucky.map(km))} មានសំណាងល្អជាងគេនៅថ្ងៃនេះ!`],
  ["3", careful.length ? `${list(careful)}, take it easy today. Slow down and rest.` : "Take a calm breath and enjoy the day.", careful.length ? `ឆ្នាំ${kmList(careful.map(km))} គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ។` : "សូមឲ្យថ្ងៃនេះស្ងប់ស្ងាត់ និងរីករាយ។"],
  ["5", `Lucky numbers: ${nums.map((n) => `${n.a} ${n.d2}`).join(", ")}! Just for fun.`, `លេខសំណាង៖ ${nums.map((n) => `${km(n.a)} ${n.d2}`).join(" ")}! សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ។`],
  ["4", "See all twelve signs at mybirthsign dot com. Have a lucky day!", "ចូលមើលរាសីទាំង 12 នៅ mybirthsign.com។ សូមឲ្យមានសំណាងល្អ!"],
].map(([n, en, kmL]) => `- **Scene ${n}**\n  - English: Audio: ${VOICE_EN} says: "${en}" ${MUSIC}\n  - Khmer: Audio: ${VOICE_KM} says in Khmer: "${kmL}" ${MUSIC}`).join("\n")}

## Voice-over – Khmer (about 45 seconds)
${voiceKm.join("\n")}

## Voice-over – English (about 45 seconds)
${voiceEn.join("\n")}

(Record the voices yourself or use text-to-speech; AI video tools may not pronounce Khmer well.)

## YouTube
### Title – Khmer
ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃ${dayKm}

### Title – English
Daily Chinese Zodiac Fortune – ${D} | ${day} Day

### Description – Khmer
${summaryKm}

${inVideo.map((a) => `${km(a)}៖ ពណ៌${sign(a).lucky.color.km} · ${sign(a).lucky.time}`).join("\n")}

លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង (1 ដល់ 5 ខ្ទង់)៖
${nums.map((n) => numLine(n, km(n.a))).join("\n")}

${disclaimerNums}

មើលរាសីទាំង 12៖ https://mybirthsign.com/km/

${disclaimer}

${tags} #ChineseZodiac #Shorts

### Description – English
${summaryEn}

${inVideo.map((a) => `${a}: ${sign(a).lucky.color.en} · ${sign(a).lucky.time}`).join("\n")}

Today's lucky numbers for the lucky signs (1 to 5 digits):
${nums.map((n) => numLine(n, n.a)).join("\n")}

Lucky numbers are for fun only, not a prediction or betting advice.

All 12 signs: https://mybirthsign.com

${DISC_EN}

${tagsEn} #Shorts

## Facebook post caption
### Khmer
🌙 ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃ${dayKm} ${EMO[day]}

✨ ឆ្នាំសំណាងថ្ងៃនេះ៖ ${lucky.map((a) => `${km(a)} (${sign(a).label.km})`).join(" · ")}
${careful.length ? `🌿 គួរប្រុងប្រយ័ត្ន៖ ${careful.map(km).join(" ")} – គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។\n` : ""}
🔢 លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖
${nums.map((n) => numLine(n, km(n.a))).join("\n")}

👉 មើលរាសីទាំង 12 និងលេខសំណាងពេញលេញ៖ https://mybirthsign.com/km/

${disclaimerNums}

${tags} #លេខសំណាង

### English
🌙 Daily Chinese Zodiac Fortune – ${D} | ${day} Day ${EMO[day]}

✨ Lucky signs today: ${lucky.map((a) => `${a} (${sign(a).label.en})`).join(" · ")}
${careful.length ? `🌿 Take it easy: ${list(careful)} – slow down, rest and don't rush big decisions.\n` : ""}
🔢 Today's lucky numbers for the lucky signs:
${nums.map((n) => numLine(n, n.a)).join("\n")}

👉 All 12 signs and full lucky numbers: https://mybirthsign.com

Lucky numbers are for fun only, not a prediction or betting advice.

${tagsEn}

## TikTok caption
### Khmer
ជោគជតារាសីថ្ងៃនេះ ${D} ${EMO[day]} ថ្ងៃ${dayKm}! ឆ្នាំសំណាង៖ ${lucky.map(km).join(" ")} ✨ លេខសំណាង៖ ${nums.map((n) => `${km(n.a)} ${n.d2}`).join(" · ")} 🔢 ឆ្នាំអ្នកជាអ្វី? Comment ប្រាប់ផង 👇 (សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ) Link នៅក្នុង bio 🌙
${tags} #fyp #ChineseZodiac

### English
${EMO[day]} ${day} day, ${D}! Lucky signs: ${lucky.join(", ")} ✨ Lucky numbers: ${nums.map((n) => `${n.a} ${n.d2}`).join(" · ")} 🔢 What's your sign? 👇 (for fun only) Link in bio 🌙
${tagsEn} #fyp

### Note
TikTok links in captions are not clickable, so put https://mybirthsign.com/km/ in your profile bio.

## YouTube subtitles (captions files)
Two files are saved next to this one: \`${iso}.srt\` (Khmer) and \`${iso}.en.srt\` (English).
Upload in YouTube Studio → Subtitles → Add language → choose Khmer or English → Upload file → "With timing". You can add both to the same video.
The timings are estimates for a 45-second voice-over; after you record the voice, drag each line to match in YouTube's subtitle editor, or use "Auto-sync".

### Khmer (${iso}.srt)
\`\`\`
${srtKm}\`\`\`

### English (${iso}.en.srt)
\`\`\`
${srtEn}\`\`\`
`;
  return { md, srtKm, srtEn, srtVid, line: `${iso}: ${day} day · lucky ${lucky.join(", ")} · careful ${careful.join(", ") || "none"}${same ? " · site wording" : ""}` };
}

// the full set of 12 character prompts (profile pictures / collection artwork / video references)
export function charactersMd(KM_NAMES) {
  const ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  return `# 12 Zodiac Characters — the look you chose (see characters/*.jpg for the approved examples)\n\n# 12 Zodiac Characters — master prompts (Disney/Pixar-inspired golden style)\n\nMake each character once (square 1:1), keep the pictures, and add them as reference images ("ingredients") in Flow for every video, so each animal always looks the same.\nIf a tool refuses brand names, remove "inspired by … Disney and Pixar-style" — the rest of the description keeps the look.\n\n${ORDER.map((a) => `## ${a} (${KM_NAMES[a]})\n${CHAR(a)}\n`).join("\n")}`;
}
