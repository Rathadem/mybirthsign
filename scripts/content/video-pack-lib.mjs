// Text of the daily video prompt pack, shared by the command-line generator (video-pack.mjs) and the
// browser tool (docs/video-prompts/video-pack-tool.html, built by build-video-tool.mjs).
// No Node imports here, so the same code runs in a browser.
//   buildPack(iso, facts, forSign, data) -> { md, srtKm, srtEn, line }
//     facts   = computeFacts(iso) from scripts/daily-data-lib.mjs
//     forSign = forSign from js/lucky-digits.js
//     data    = the day's data/daily/<iso>.json if it exists (its summary is used), otherwise null
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
  Rat: { en: "Clever and quick, the first animal of the zodiac, the Rat symbolizes wit, resourcefulness, and new beginnings.", km: "ឆ្លាតវៃ និងរហ័សរហួន ជាសត្វទីមួយនៃរាសីទាំង 12 ឆ្នាំជូតតំណាងឲ្យប្រាជ្ញា ភាពប៉ិនប្រសប់ និងការចាប់ផ្ដើមថ្មី។", traits: "wit, resourcefulness and new beginnings", mood: "bright, clever and lively", vis: "a glowing golden path of stars appears in front of it and it races ahead first, while faint golden silhouettes of the other zodiac animals follow behind in the moonlight" },
  Ox: { en: "Steady and strong, the Ox symbolizes hard work, patience, and honest strength.", km: "នឹងនរ និងរឹងមាំ ឆ្នាំឆ្លូវតំណាងឲ្យការខិតខំ ការអត់ធ្មត់ និងកម្លាំងដ៏ស្មោះត្រង់។", traits: "hard work, patience and honest strength", mood: "calm, steady and strong", vis: "it plants its hooves firmly as golden rice fields light up around the temple and sway in the night breeze" },
  Tiger: { en: "King of the mountains, the Tiger symbolizes courage, protection, and bold power.", km: "ស្ដេចនៃព្រៃភ្នំ ឆ្នាំខាលតំណាងឲ្យភាពក្លាហាន ការការពារ និងថាមពលដ៏អង់អាច។", traits: "courage, protection and bold power", mood: "brave, proud and protective", vis: "it stands tall on a rock as a protective golden shield of light spreads over the temple and the hills behind it" },
  Rabbit: { en: "Beloved companion of the Moon Goddess, the Rabbit symbolizes purity, longevity, and peaceful elegance.", km: "ជាដៃគូជាទីស្រឡាញ់របស់ទេពធីតាព្រះចន្ទ ឆ្នាំថោះតំណាងឲ្យភាពបរិសុទ្ធ អាយុវែង និងភាពថ្លៃថ្នូរដ៏ស្ងប់ស្ងាត់។", traits: "purity, longevity and peaceful elegance", mood: "calm, gentle and graceful", vis: "a soft, graceful silhouette of a goddess made of silver moonlight appears faintly in the moon's glow and smiles down, and a ribbon of moonlight curls down and wraps gently around the rabbit, making it shine" },
  Dragon: { en: "Ruler of the clouds and rain, the Dragon symbolizes power, good fortune, and a noble spirit.", km: "ជាម្ចាស់នៃពពក និងភ្លៀង ឆ្នាំរោងតំណាងឲ្យអំណាច សំណាងល្អ និងចិត្តថ្លៃថ្នូរ។", traits: "power, good fortune and a noble spirit", mood: "majestic, proud and noble", vis: "swirling clouds gather around it and a gentle golden rain of sparkles falls over the lotus pond as it circles above the temple" },
  Snake: { en: "Wise and graceful, the Snake symbolizes wisdom, intuition, and quiet elegance.", km: "ឈ្លាសវៃ និងស្រស់ស្អាត ឆ្នាំម្សាញ់តំណាងឲ្យប្រាជ្ញា វិចារណញាណ និងភាពថ្លៃថ្នូរដ៏ស្ងប់ស្ងាត់។", traits: "wisdom, intuition and quiet elegance", mood: "wise, calm and elegant", vis: "glowing golden rings of light ripple outward around it as its eyes shine with quiet wisdom" },
  Horse: { en: "Free and spirited, the Horse symbolizes energy, freedom, and success on the road ahead.", km: "សេរី និងពោរពេញដោយស្មារតី ឆ្នាំមមីតំណាងឲ្យថាមពល សេរីភាព និងភាពជោគជ័យលើផ្លូវខាងមុខ។", traits: "energy, freedom and success", mood: "free, energetic and joyful", vis: "a shining golden road of light opens across the sky in front of it, stretching toward the horizon" },
  Goat: { en: "Gentle and kind, the Goat symbolizes peace, harmony, and a caring heart.", km: "ស្លូតបូត និងចិត្តល្អ ឆ្នាំមមែតំណាងឲ្យសន្តិភាព ភាពសុខដុម និងចិត្តមេត្តា។", traits: "peace, harmony and a caring heart", mood: "gentle, kind and peaceful", vis: "soft flowers bloom wherever it steps and small glowing birds settle peacefully around it" },
  Monkey: { en: "Playful and clever, the Monkey symbolizes intelligence, curiosity, and joyful energy.", km: "លេងសើច និងឆ្លាតវៃ ឆ្នាំវកតំណាងឲ្យបញ្ញា ការចង់ដឹងចង់ឃើញ និងថាមពលដ៏រីករាយ។", traits: "intelligence, curiosity and joyful energy", mood: "playful, clever and cheerful", vis: "it juggles glowing golden orbs of light that turn into stars as it laughs" },
  Rooster: { en: "Herald of the dawn, the Rooster symbolizes honesty, confidence, and a bright new day.", km: "ជាអ្នកប្រកាសពេលព្រឹកព្រលឹម ឆ្នាំរកាតំណាងឲ្យភាពស្មោះត្រង់ ទំនុកចិត្ត និងថ្ងៃថ្មីដ៏ភ្លឺស្វាង។", traits: "honesty, confidence and a bright new day", mood: "proud, confident and bright", vis: "the first rays of a golden dawn spread across the sky behind it as it stands proudly on the temple wall" },
  Dog: { en: "Faithful guardian of the home, the Dog symbolizes loyalty, protection, and honest friendship.", km: "ជាអ្នកយាមផ្ទះដ៏ស្មោះត្រង់ ឆ្នាំចតំណាងឲ្យភាពស្មោះស្ម័គ្រ ការការពារ និងមិត្តភាពដ៏ពិតប្រាកដ។", traits: "loyalty, protection and honest friendship", mood: "loyal, warm and protective", vis: "it sits faithfully at the temple gate as a warm golden glow surrounds a small traditional wooden house nearby" },
  Pig: { en: "Generous and warm-hearted, the Pig symbolizes abundance, good fortune, and a happy home.", km: "ចិត្តទូលាយ និងកក់ក្ដៅ ឆ្នាំកុរតំណាងឲ្យភាពសម្បូរសប្បាយ សំណាងល្អ និងគ្រួសារដ៏រីករាយ។", traits: "abundance, good fortune and a happy home", mood: "happy, warm and generous", vis: "golden coins, fruit and flowers gently fill a lotus-shaped basket around it until it overflows" },
};
export const HERO = (a) => `Create a premium-quality 3D animated fantasy character of ${LOOK[a]}, the ${a} of the Chinese zodiac, inspired by the charm and enchanting visual appeal of classic Disney and Pixar-style animated family films. The ${a.toLowerCase()} symbolizes ${SYMBOL[a].traits}: a ${SYMBOL[a].mood} expression and pose that show this. Body in creamy white-gold with shining engraved gold patterns, pink inner ears or rosy cheeks, polished gold textures, luminous highlights and delicate pink and gold accents. It sits on a round golden pedestal inside a large glowing pink lotus floating on a still pond. Behind it, a huge glowing full moon with a soft silver-gold halo, a deep indigo starry sky, a softly illuminated Khmer temple inspired by Angkor Wat with warm golden lights, palm tree silhouettes, small floating lanterns, glowing lotus flowers on the water, gentle moonbeams falling on the ${a.toLowerCase()}, magical sparkles and soft silver-and-gold reflections. Cinematic lighting, soft atmospheric glow, realistic metallic reflections, beautiful depth of field, professional animated-movie-quality rendering. Square 1:1, full body visible, three-quarter view, centered, with space around the character. No text, no letters, no watermark, no logo, no cropped body parts.`;
// spoken time, e.g. "13:00–15:00" -> "from 1 to 3 in the afternoon"
const partOfDay = (h) => (h >= 5 && h < 12 ? "in the morning" : h >= 12 && h < 17 ? "in the afternoon" : h >= 17 && h < 20 ? "in the evening" : "at night");
const h12 = (h) => (h % 12 === 0 ? 12 : h % 12);
const sayTime = (t) => { const [a, b] = t.split("–").map((x) => Number(x.slice(0, 2))); return partOfDay(a) === partOfDay(b) ? `from ${h12(a)} to ${h12(b)} ${partOfDay(b)}` : `from ${h12(a)} ${partOfDay(a)} to ${h12(b)} ${partOfDay(b)}`; };
const sayTimeKm = (t) => `ម៉ោង ${t.replace("–", " ដល់ ")}`;
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
function splitLines(text, lang) {
  const sents = lang === "km" ? text.split(/(?<=។)\s*/) : text.split(/(?<=[.!?])\s+/);
  const out = [];
  for (const s of sents.filter(Boolean)) {
    if (s.length <= (lang === "km" ? 60 : 70)) { out.push(s); continue; }
    const cut = lang === "km" ? s.indexOf(" ", 40) : s.indexOf(", ", 30);
    if (cut > 0) { out.push(s.slice(0, lang === "km" ? cut : cut + 1).trim()); out.push(s.slice(cut + 1).trim()); } else out.push(s);
  }
  return out;
}

export function buildPack(iso, F, forSign, data = null) {
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
    `ឆ្នាំ${kmList(lucky.map(km))} មានសំណាងល្អជាងគេនៅថ្ងៃនេះ។`,
    ...(careful.length ? [`ចំណែកឆ្នាំ${kmList(careful.map(km))} គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។`] : []),
  ].join(" ");
  const summaryEn = same && data.highlights.summary?.en ? data.highlights.summary.en : [
    `Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day.`,
    `${list(lucky)} are the luckiest signs today.`,
    ...(careful.length ? [`${list(careful)} should take it easy, slow down and avoid rushing big decisions.`] : []),
  ].join(" ");

  const voiceKm = [
    `ជោគជតារាសីប្រចាំថ្ងៃនេះ ថ្ងៃទី ${D}។`,
    summaryKm,
    `លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖ ${nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2} និង ${n.d3}។`).join(" ")}`,
    "លេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការណែនាំឱ្យភ្នាល់ទេ។",
    "ចូលមើលលេខសំណាង និងលម្អិតសម្រាប់រាសីទាំង 12 នៅ mybirthsign.com",
  ];
  const voiceEn = [
    `Your Chinese zodiac fortune for ${LD}.`,
    summaryEn,
    `Today's lucky numbers for the lucky signs: ${nums.map((n) => `${n.a}, ${n.d2} and ${n.d3}.`).join(" ")}`,
    "Lucky numbers are for fun only, not betting advice.",
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
  const MKM = ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
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
    ["Lucky friends arrive", `${cap(looks(friends))} fly in on trails of golden light and land beside the ${dl} on glowing lotus pedestals, matching their reference images. A ring of golden energy bursts outward and lotus flowers bloom across the pond. The friends cheer together. Camera orbits around them.`,
      `${cap(list(friends.map((a) => `the ${a}`)))} are lucky today too. Good friends bring good fortune!`, `${kmList(friends.map((a) => `ឆ្នាំ${km(a)}`))} ក៏មានសំណាងល្អនៅថ្ងៃនេះដែរ។ មិត្តល្អ នាំមកនូវសំណាងល្អ!`],
    ["Lucky numbers", `A huge glowing golden wheel rises out of the lotus pond in front of the temple and spins with beams of golden light, then slows to a gentle shining turn. ${cap(list([day, ...friends].map((a) => `the ${a.toLowerCase()}`)))} watch it happily from their lotus pedestals. Open space in the middle and lower part of the frame for number captions. Slow push-in.`,
      `Lucky numbers: ${nums.map((n) => `${n.a} ${n.d2}`).join(", ")}! Just for fun.`, `លេខសំណាង៖ ${nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2}`).join(" ")}! សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ។`],
    careful.length
      ? [`${list(careful)}, take it easy`, `${cap(LOOK[careful[0]])} rests calmly beside the still lotus pond as a soft protective bubble of golden light forms around it. Gentle glowing butterflies circle it and the moon shines calmly on the water. Peaceful and safe, not sad. Slow camera move in.`,
        `${list(careful)}, take it easy today. Slow down, rest, and don't rush big decisions.`, `ឆ្នាំ${kmList(careful.map(km))} ថ្ងៃនេះគួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់សម្រេចចិត្ត។`]
      : ["A calm moment", "A still lotus pond at night, pink lotus flowers swaying gently and the full moon shimmering on the water. Slow camera move in.", "Take a calm breath and enjoy the day.", "សូមឲ្យថ្ងៃនេះស្ងប់ស្ងាត់ និងរីករាយ។"],
    ["Golden ending", `The ${dl} floats gently up toward the full moon, waving goodbye. Golden light beams shoot up from the temple towers and burst into soft lotus-shaped golden fireworks, and hundreds of lanterns rise over the glowing pond. The camera rises and pulls back for a wide, epic view, with open sky at the top for a title.`,
      "See all twelve signs at mybirthsign dot com. Have a lucky day!", "ចូលមើលរាសីទាំង 12 នៅ mybirthsign.com។ សូមឲ្យមានសំណាងល្អ!"],
  ];
  // 90-second voice-over for the 9-scene video (about 10 seconds per scene)
  const KMDAY = ["ថ្ងៃអាទិត្យ", "ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"];
  const wdKm = KMDAY[new Date(iso + "T00:00:00Z").getUTCDay()];
  const ckm = dd.lucky.color.km, cen = dd.lucky.color.en;
  const vo90 = [
    ["Welcome to MyBirthSign. Tonight the full moon rises over the ancient temple, the lotus flowers glow on the water, and a very special friend is waking up.",
      "សូមស្វាគមន៍មកកាន់ MyBirthSign។ យប់នេះ ព្រះចន្ទពេញវង់រះលើប្រាសាទបុរាណ ផ្កាឈូកភ្លឺចែងចាំងលើផ្ទៃទឹក ហើយមានមិត្តពិសេសម្នាក់កំពុងភ្ញាក់ឡើង។"],
    [`Today, ${LD}, is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day. It is a ${dd.label.en} for everyone born in the Year of the ${day}, so this is your moment to shine.`,
      `ថ្ងៃនេះ ${wdKm} ទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]} ឆ្នាំ ${iso.slice(0, 4)} ជាថ្ងៃ${dayKm}។ ជា${dd.label.km}សម្រាប់អ្នកកើតឆ្នាំ${dayKm} ដូច្នេះនេះជាពេលដែលអ្នកត្រូវបញ្ចេញពន្លឺ។`],
    [`${S9.en} Today, that good energy is shining on you.`, `${S9.km} ថ្ងៃនេះ ថាមពលល្អនោះកំពុងរះចាំងមកលើអ្នក។`],
    [`Born in the Year of the ${day}? Your luck is strong today. Stay ${S9.mood}, say yes to good chances, and share your good mood with the people around you.`,
      `អ្នកកើតឆ្នាំ${dayKm} ថ្ងៃនេះសំណាងរបស់អ្នកខ្លាំងណាស់។ ចូររក្សាចិត្តស្ងប់ ទទួលយកឱកាសល្អៗ និងចែករំលែកភាពរីករាយទៅកាន់មនុស្សជុំវិញខ្លួន។`],
    [`Your lucky color today is ${cen}. Wear it, or carry something ${cen} with you. Your best time is ${sayTime(dd.lucky.time)}, a good moment for important plans.`,
      `ពណ៌សំណាងថ្ងៃនេះគឺពណ៌${ckm}។ ស្លៀកពាក់ ឬយករបស់ពណ៌${ckm}ជាប់ខ្លួន។ ពេលល្អបំផុតគឺ${sayTimeKm(dd.lucky.time)} ជាពេលល្អសម្រាប់ផែនការសំខាន់ៗ។`],
    [`Your lucky friends today are ${list(friends.map((a) => `the ${a}`))}. They are having a good day too. Spend time together, work together, and let good fortune grow.`,
      `មិត្តសំណាងរបស់អ្នកថ្ងៃនេះគឺ ${kmList(friends.map((a) => `ឆ្នាំ${km(a)}`))}។ ពួកគេក៏មានថ្ងៃល្អដែរ។ ចំណាយពេលជាមួយគ្នា ធ្វើការជាមួយគ្នា ហើយឲ្យសំណាងល្អកាន់តែកើនឡើង។`],
    [`Here are today's lucky numbers. ${nums.map((n) => `${n.a}: ${n.d2} and ${n.d3}.`).join(" ")} Lucky numbers are just for fun, not betting advice.`,
      `នេះគឺជាលេខសំណាងថ្ងៃនេះ។ ${nums.map((n) => `ឆ្នាំ${km(n.a)}៖ ${n.d2} និង ${n.d3}។`).join(" ")} លេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការណែនាំឱ្យភ្នាល់ទេ។`],
    careful.length
      ? [`${list(careful)}, today is a day to take it easy. Slow down, rest well, and don't rush big decisions. Calm steps today lead to better days ahead.`,
        `ឆ្នាំ${kmList(careful.map(km))} ថ្ងៃនេះគួរសម្រាកឲ្យស្រួលខ្លួន។ ធ្វើអ្វីៗយឺតៗ សម្រាកឲ្យបានគ្រប់គ្រាន់ និងកុំប្រញាប់សម្រេចចិត្តរឿងធំៗ។ ជំហានស្ងប់ៗថ្ងៃនេះ នាំទៅរកថ្ងៃល្អៗខាងមុខ។`]
      : ["Whatever your sign, take a calm breath today. Slow, steady steps lead to better days ahead.", "មិនថាអ្នកកើតឆ្នាំអ្វីទេ ថ្ងៃនេះសូមដកដង្ហើមឲ្យស្ងប់។ ជំហានស្ងប់ៗ នាំទៅរកថ្ងៃល្អៗខាងមុខ។"],
    ["That's your Chinese zodiac fortune for today. See all twelve signs and your full lucky numbers at mybirthsign dot com. Follow us for tomorrow's fortune, and have a lucky day!",
      "នេះជាជោគជតារាសីចិនសម្រាប់ថ្ងៃនេះ។ ចូលមើលរាសីទាំង 12 និងលេខសំណាងពេញលេញនៅ mybirthsign.com។ តាមដានយើងសម្រាប់ជោគជតាថ្ងៃស្អែក ហើយសូមឲ្យមានសំណាងល្អ!"],
  ];
  const mmss = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
  const voLines = (k) => vo90.map((v, i) => `Scene ${i + 1} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${v[k]}`).join("\n\n");
  const srt90Km = srt(vo90.flatMap((v) => splitLines(v[1], "km")), 90);
  const srt90En = srt(vo90.flatMap((v) => splitLines(v[0], "en")), 90);
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

## 9-scene video – luckiest animal (about 90 seconds)
A longer video about the ${day}, today's luckiest animal: 9 clips of 10 seconds (about 90 seconds). Set the clip length in Flow to 10 seconds. For each scene, press "Copy + English voice" or "Copy + Khmer voice": it copies the style line, the scene and the voice together. Add the reference pictures of ${list([...new Set([day, ...lucky, ...careful])])} as ingredients in Flow. Put the clips in order 1 to 9.

${nine.map(([t, prompt], i) => [t, prompt, vo90[i][0], vo90[i][1]]).map(([t, prompt, en, kmL], i) => `### Scene ${i + 1} – ${t} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${prompt}\nEnglish voice: Audio: ${VOICE_EN} says: "${en}" ${MUSIC}\nKhmer voice: Audio: ${VOICE_KM} says in Khmer: "${kmL}" ${MUSIC}`).join("\n\n")}

## Voice-over – 9-scene video (about 90 seconds)
The same lines as the voice in each 10-second scene above, all together. Use it if you record the voice yourself or with text-to-speech (then copy the scenes with plain "Copy", so Flow does not add a voice too). English is about 230 words, a calm 90 seconds.

### English
${voLines(0)}

### Khmer
${voLines(1)}

### Subtitles – Khmer (${iso}-9scene.srt)
\`\`\`
${srt90Km}\`\`\`

### Subtitles – English (${iso}-9scene.en.srt)
\`\`\`
${srt90En}\`\`\`

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
  return { md, srtKm, srtEn, line: `${iso}: ${day} day · lucky ${lucky.join(", ")} · careful ${careful.join(", ") || "none"}${same ? " · site wording" : ""}` };
}

// the full set of 12 character prompts (profile pictures / collection artwork / video references)
export function charactersMd(KM_NAMES) {
  const ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  return `# 12 Zodiac Characters — the look you chose (see characters/*.jpg for the approved examples)\n\n# 12 Zodiac Characters — master prompts (Disney/Pixar-inspired golden style)\n\nMake each character once (square 1:1), keep the pictures, and add them as reference images ("ingredients") in Flow for every video, so each animal always looks the same.\nIf a tool refuses brand names, remove "inspired by … Disney and Pixar-style" — the rest of the description keeps the look.\n\n${ORDER.map((a) => `## ${a} (${KM_NAMES[a]})\n${CHAR(a)}\n`).join("\n")}`;
}
