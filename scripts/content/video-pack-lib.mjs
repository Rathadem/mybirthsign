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
  const srtVid = {};
  VIDEOS.forEach((v) => { srtVid[v.id] = { km: srtFor(v.scenes, "km"), en: srtFor(v.scenes, "en") }; });
  const videoMd = (v) => `## ${v.name}
${v.intro || `A ${v.secs}-second video about the ${day}, today's luckiest animal: ${v.scenes.length} clips of 10 seconds. Set the clip length in Flow to 10 seconds and add the reference picture of the ${day} as an ingredient. For each scene, press "Copy + English voice" or "Copy + Khmer voice": it copies the style line, the scene and the voice together. Put the clips in order 1 to ${v.scenes.length}.`}
${v.chapters ? `\n### YouTube chapters (paste into the description)\n${v.chapters.map(([t, n]) => `${t} ${n}`).join("\n")}\n` : ""}
${v.scenes.map(([t, prompt, en, kmL], i) => `### Scene ${i + 1} – ${t} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${prompt}\nEnglish voice: Audio: ${VOICE_EN} says: "${en}" ${MUSIC}\nKhmer voice: Audio: ${VOICE_KM} says in Khmer: "${kmL}" ${MUSIC}`).join("\n\n")}

## Voice-over – ${v.id === "long" ? "long YouTube video" : `${v.secs}-second video`}
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
Title (Khmer): ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃ${dayKm}
Title (English): Daily Chinese Zodiac Fortune – ${D} | ${day} Day

Description:
${summaryKm}

${inVideo.map((a) => `${km(a)}៖ ពណ៌${sign(a).lucky.color.km} · ${sign(a).lucky.time}`).join("\n")}

លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង (1 ដល់ 5 ខ្ទង់)៖
${nums.map((n) => numLine(n, km(n.a))).join("\n")}

${disclaimerNums}

មើលរាសីទាំង 12៖ https://mybirthsign.com/km/

${disclaimer}

English: ${summaryEn} Lucky numbers (for fun only): ${nums.map((n) => `${n.a} ${n.d1} · ${n.d2} · ${n.d3}`).join(" | ")}. All 12 signs: https://mybirthsign.com

Hashtags: ${tags} #ChineseZodiac #DailyHoroscope #Shorts

## Facebook post caption
🌙 ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃ${dayKm} ${EMO[day]}

✨ ឆ្នាំសំណាងថ្ងៃនេះ៖ ${lucky.map((a) => `${km(a)} (${sign(a).label.km})`).join(" · ")}
${careful.length ? `🌿 គួរប្រុងប្រយ័ត្ន៖ ${careful.map(km).join(" ")} – គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។\n` : ""}
🔢 លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖
${nums.map((n) => numLine(n, km(n.a))).join("\n")}

👉 មើលរាសីទាំង 12 និងលេខសំណាងពេញលេញ៖ https://mybirthsign.com/km/

${disclaimerNums}

${tags} #លេខសំណាង

## TikTok caption
ជោគជតារាសីថ្ងៃនេះ ${D} ${EMO[day]} ថ្ងៃ${dayKm}! ឆ្នាំសំណាង៖ ${lucky.map(km).join(" ")} ✨ លេខសំណាង៖ ${nums.map((n) => `${km(n.a)} ${n.d2}`).join(" · ")} 🔢 ឆ្នាំអ្នកជាអ្វី? Comment ប្រាប់ផង 👇 (សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ) Link នៅក្នុង bio 🌙
${tags} #fyp #ChineseZodiac

English version: ${EMO[day]} ${day} day, ${D}! Lucky signs: ${lucky.join(", ")} ✨ Lucky numbers: ${nums.map((n) => `${n.a} ${n.d2}`).join(" · ")} 🔢 What's your sign? 👇 (for fun only) Link in bio 🌙 #ChineseZodiac #DailyHoroscope #fyp

(TikTok links in captions are not clickable, so put https://mybirthsign.com/km/ in your profile bio.)

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
