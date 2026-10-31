// Text of the daily video prompt pack, shared by the command-line generator (video-pack.mjs) and the
// browser tool (docs/video-prompts/video-pack-tool.html, built by build-video-tool.mjs).
// No Node imports here, so the same code runs in a browser.
//   buildPack(iso, facts, forSign, data) -> { md, srtKm, srtEn, line }
//     facts   = computeFacts(iso) from scripts/daily-data-lib.mjs
//     forSign = forSign from js/lucky-digits.js
//     data    = the day's data/daily/<iso>.json if it exists (its summary and each sign's written fortune are used), otherwise null
//     P       = { INFO, KM_INFO } from daily-data-lib (traits, weaknesses, lucky days for the long video), plus
//               COPY = EARLY_COPY from early-card-copy.mjs (the standard horoscope lines used when data is null)
export const EMO = { Rat: "🐀", Ox: "🐂", Tiger: "🐯", Rabbit: "🐇", Dragon: "🐉", Snake: "🐍", Horse: "🐎", Goat: "🐐", Monkey: "🐒", Rooster: "🐓", Dog: "🐕", Pig: "🐖" };
// look of each animal: photorealistic celestial guardian in engraved ceremonial gold (live-action fantasy-epic quality)
// Animal-only design descriptions: used only by CHAR (the old character design prompts)
export const LOOK_DESIGN = {
  Rat: "a small, lifelike silver-grey rat with bright black eyes and long whiskers, wearing a tiny engraved gold vest and collar",
  Ox: "a powerful, lifelike dark bronze-grey ox with sweeping gold-capped horns, draped in heavy engraved gold armor with ruby studs",
  Tiger: "a muscular, lifelike orange-and-black tiger with amber eyes, a gold chest harness and engraved gold shoulder plates",
  Rabbit: "a lifelike snow-white rabbit with long upright ears in gold ear-cuffs, a delicate gold collar and a small pink gem",
  Dragon: "a long, serpentine golden Chinese dragon with gleaming metallic scales, flowing whiskers and a golden mane, holding a glowing pearl",
  Snake: "an elegant, lifelike snake with shimmering gold scales and jewel-like eyes",
  Horse: "a lifelike palomino horse with a long flowing golden mane, an engraved gold bridle and a jeweled breastplate",
  Goat: "a lifelike white long-haired goat with grand curled horns tipped in gold and an engraved gold saddle cloth",
  Monkey: "a lifelike golden-brown macaque with a wise expression, a small gold crown and engraved gold shoulder armor",
  Rooster: "a proud, lifelike rooster with fiery red-and-gold plumage, a bright red comb and a fine gold collar",
  Dog: "a loyal, lifelike tan shepherd-type dog with alert ears and an ornate gold collar and chest plate",
  Pig: "a sturdy, lifelike pink pig with small ivory tusks, a gold helmet-crown and ceremonial gold armor",
};
export const CHAR = (a) => `Create a photorealistic character portrait of ${LOOK_DESIGN[a]}, the ${a} of the Chinese zodiac, as a majestic celestial guardian from a high-budget fantasy epic that blends Khmer royal heritage with a Chinese historical fantasy drama. Realistic anatomy, real fur, feathers or scales with individual detail, expressive intelligent eyes, a calm closed mouth, and ceremonial gold ornaments with physically real metallic reflections. Noble and powerful, never a cute toy or cartoon mascot, with its own clear silhouette and personality. Setting: a carved sandstone temple terrace inspired by Angkor Wat at night, an enormous luminous full moon, deep indigo starry sky, soft drifting mist, a still reflecting pool with pink lotus flowers and glowing golden lanterns; soft gold dust in the air. Light: cool silver-blue moonlight from behind, warm golden rim light, soft lantern glow from below. Ultra-detailed, sharp focus on the eyes, cinematic depth of field, professional color grading. Composition: square 1:1, full body visible, three-quarter view, centered, with space around it. Keep this exact design for every image and video. No text, no letters, no watermark, no logo, no cartoon or plastic look, no cropped body parts.`;
// The 12 zodiac characters saved in Google Flow are named after their animals ("Rat", "Ox", ... "Pig"): each is a
// guardian warrior in armor themed on the animal, with the animal beside them (for example "Snake": a woman warrior in
// silver snake-scale armor with a giant white serpent). Every scene names the character, so Flow uses the saved picture.
export const FLOW_NAME = (a) => `@${a}`;   // Flow's way of pointing to a saved character
export const LOOK = Object.fromEntries(Object.keys(LOOK_DESIGN).map((a) => [a, `${FLOW_NAME(a)} (the ${a} guardian with their ${a.toLowerCase()})`]));
// magical, powerful action for each animal (scene 1 hero moment)
// big magical action for each sign, in the style of a Chinese fantasy (xianxia) drama: the animal and its guardian act
// together. Each line follows "The rat ..." / "it ...", so it starts with what the animal does.
// big magical action for each sign, in the style of a Chinese fantasy (xianxia) drama: the animal and its guardian act
// together. Six moves per sign; buildPack picks a different one each day. Each line follows "The rat ..." / "it ...",
// so it starts with what the animal does.
export const POSES = {
  Rat: [
    "darts up onto its guardian's shoulder as the guardian springs into a flying wuxia leap across the temple rooftops, twin golden daggers flashing, and lands in slow motion as a storm of glowing gold coins bursts outward like sword energy",
    "scurries along a glowing golden rope as its guardian runs straight up a carved temple pillar in a weightless qinggong dash, flips at the top and rains down a shower of shining gold coins",
    "vanishes in a puff of golden smoke and reappears on its guardian's hand, who spins through the air throwing glowing golden stars that burst into sparkling fireworks over the pond",
    "dashes in a blur around its guardian, who whirls a long glowing scroll like a ribbon weapon, unrolling it into a spinning golden shield covered in shining characters",
    "races across the stepping stones beside its guardian, who skims over the pond in three giant gliding leaps, each landing sending up a fountain of golden light",
    "leaps into its guardian's sleeve as the guardian blinks in and out of sight across the terrace in quick flashes of gold, ending in a still heroic pose as coins rain softly down",
  ],
  Ox: [
    "lowers its gold-capped horns and charges as its guardian slams a great bronze staff into the ground, sending a shockwave of golden qi rippling across the pond, then both rise into the sky on swirling golden clouds",
    "stamps one mighty hoof as its guardian lifts a huge golden temple bell with one hand and strikes it, sending rings of golden sound-waves rolling across the sky",
    "walks forward slowly and powerfully as its guardian pushes both palms toward the moon, and a giant glowing golden ox spirit rises from the pond behind them",
    "plants its feet firmly as its guardian spins a heavy bronze staff overhead in slow motion, whipping up a whirlwind of golden petals and glowing dust",
    "charges up the temple steps beside its guardian, who leaps and brings a great hammer down onto the stone, and a wave of blooming golden lotuses races across the pond",
    "rises onto a floating golden cloud with its guardian, who stands firm as wind and lightning-gold sparks swirl around them like a storm they control",
  ],
  Tiger: [
    "springs forward beside its guardian, who unleashes a spinning flying kick in slow motion trailing fiery golden light, and together they land in a low crouch as a ring of golden flame-flowers bursts around them",
    "bounds across the temple rooftops after its guardian, who sprints along the ridge in a flying wuxia run, then both leap together through a hoop of golden fire",
    "crouches low as its guardian draws two short golden swords and spins between the lantern posts in a blur of slow-motion slashes that leave glowing trails in the air",
    "leaps through the air in a huge arc as its guardian launches a palm strike, and a glowing golden tiger spirit bursts from the guardian's hands across the pond",
    "circles its guardian, who stamps the ground and sends a ring of golden flame racing outward, then the tiger springs through the flames unharmed",
    "races up a waterfall of golden light beside its guardian, who runs vertically up the cascade and lands on the top in a fierce, proud pose",
  ],
  Rabbit: [
    "leaps high into the air with its guardian, who flies on long silk ribbons in a graceful arc across the full moon, scattering a trail of glowing jade petals and silver moonlight sparks",
    "hops onto the full moon's reflection on the pond as its guardian dances across the water with a glowing jade flute, each note blooming into silver lotus flowers",
    "springs from cloud to cloud beside its guardian, who glides on a large paper lantern drifting up toward the moon, scattering moon-silver sparks",
    "bounds in a circle as its guardian twirls two long silk sleeves, and the sleeves stretch into glowing ribbons that wrap the temple towers in soft light",
    "leaps through a ring of floating jade petals as its guardian spins in mid-air with a crescent moon-blade, cutting a glowing silver arc across the sky",
    "jumps into its guardian's arms as the guardian floats gently upward through falling cherry blossoms, petals swirling into a shining spiral around them",
  ],
  Dragon: [
    "uncoils and soars up around the temple towers as its guardian rides the wind behind it standing on a flying sword, both spiralling through clouds of golden light while a glowing pearl lights up the sky",
    "bursts up out of the reflecting pool in a tower of golden water as its guardian leaps from its head to the top of the temple spire, sword raised to the moon",
    "coils around its guardian, who stands perfectly still and then sweeps both arms upward, raising a great swirl of glowing clouds and golden rain",
    "dives through the clouds as its guardian rides on its back holding a glowing pearl, and lightning-gold light flashes across the night sky",
    "chases a glowing pearl around the temple towers while its guardian leaps from tower to tower in giant weightless bounds, catching the pearl in mid-air",
    "rises in a spiral behind its guardian, who draws a sword and slashes a huge glowing dragon-shaped arc of golden energy across the full moon",
  ],
  Snake: [
    "rises in a graceful spiral around its guardian, who draws her sword in slow motion and sweeps a crescent of silver sword energy through the air as glowing rings of light ripple across the terrace",
    "slides in silent S-curves around the terrace as its guardian spins her long silver whip-sword, which bends and flows through the air like a living ribbon of light",
    "wraps protectively around its guardian, who rises into the air in a slow, graceful turn while glowing silver scales of light swirl around them like a shield",
    "glides across the pond's surface as its guardian walks on the water beside it, each step leaving a ring of moonlit silver light",
    "lifts its head high as its guardian moves through a slow, flowing sword form, her blade leaving shimmering silver trails that hang in the air like calligraphy",
    "forms a glowing silver circle on the ground as its guardian leaps into the centre, plants her sword and a pillar of silver and gold light shoots up into the sky",
  ],
  Horse: [
    "rears up as its guardian vaults onto its back in one flying leap, then golden wings of light unfold and they gallop up into the sky across the full moon with a trail of sparks behind them",
    "gallops across the surface of the pond with its guardian on its back, hooves splashing golden light, as they leap over the temple wall in slow motion",
    "races along the temple terrace while its guardian stands upright on its back, spinning a long spear that throws arcs of golden light",
    "leaps through a curtain of golden lanterns with its guardian riding, the lanterns scattering and rising like fireflies around them",
    "rears beside its guardian, who leaps onto its back mid-gallop, and together they gallop up a staircase of glowing golden clouds",
    "runs in a wide circle around its guardian, who stands in the centre and raises a banner that unfurls into a great wave of golden light",
  ],
  Goat: [
    "bounds from lotus to lotus beside its guardian, who glides over the water in a weightless qinggong run, every step blooming into golden light and opening flowers",
    "climbs a steep cliff of glowing stones with sure-footed leaps while its guardian flies up beside it on a drifting cloud, scattering golden blossoms",
    "lowers its curled horns playfully as its guardian spins a glowing jade staff, and every turn sends rings of soft green and gold light across the terrace",
    "leaps from the top of the temple steps with its guardian, both floating down gently on a cloud of glowing petals",
    "dances lightly around its guardian, who paints a glowing golden mountain in the air with a giant brush, and the painting comes to life with flowers",
    "skips across a bridge of floating lotus leaves beside its guardian, who plays a glowing zither as golden notes drift like butterflies",
  ],
  Monkey: [
    "somersaults onto its guardian's back as the guardian spins a glowing golden staff in a dazzling flurry of martial-arts moves, then plants the staff and vaults high into the night sky",
    "leaps from lantern to lantern as its guardian makes a glowing golden staff stretch longer and longer, then rides the staff high into the sky",
    "splits into three golden copies of itself in a playful flash while its guardian spins in a whirl of martial-arts kicks, all landing in the same heroic pose",
    "swings around a temple pillar as its guardian leaps onto a glowing cloud and surfs it across the sky, laughing silently with joy",
    "flips onto its guardian's head as the guardian blows on a handful of golden hairs that turn into a swirl of glowing butterflies",
    "chases its guardian across the rooftops in a game of tag, both leaping and spinning in slow-motion acrobatics against the full moon",
  ],
  Rooster: [
    "spreads its blazing wings as its guardian whirls through a sweeping martial-arts fan dance, and a burst of golden feathers and fiery light rays fans out behind them",
    "flies up to the top of a temple spire as its guardian leaps after it in a soaring arc, and a burst of golden sunrise light breaks across the night sky",
    "struts proudly as its guardian spins a pair of golden fans, sending feathers of light swirling into a glowing phoenix shape above them",
    "beats its blazing wings and a gust of golden wind lifts its guardian into the air in a slow-motion spinning kick",
    "glides down from the sky onto its guardian's arm as the guardian sweeps a glowing sword in a wide arc, leaving a trail of shining feathers",
    "spreads its wings wide as its guardian strikes a tall heroic pose on a rooftop, and rays of golden light fan out like a rising sun behind them",
  ],
  Dog: [
    "races beside its guardian, who leaps over the pond in a flying spin as a shield of golden light flares around them both, and they land back to back in a heroic pose",
    "bounds up the temple steps beside its guardian, who vaults over the stone balustrade in a flying somersault and lands in a protective stance",
    "runs in a glowing circle around its guardian, drawing a ring of golden light, as the guardian raises a shining shield that flares like the sun",
    "leaps through the air to catch a glowing golden disc thrown by its guardian, who spins and catches it back in one smooth slow-motion move",
    "races across the rooftops after its guardian, both leaping a wide gap in one giant bound against the full moon",
    "stands guard as its guardian draws a sword and traces a glowing protective seal in the air, which spreads into a dome of golden light over the temple",
  ],
  Pig: [
    "spins up inside a glowing golden bubble as its guardian strikes a powerful open-palm pose, sending a whirlwind of golden coins, petals and shining qi energy spiralling into the sky",
    "rolls happily down a hill of golden clouds as its guardian surfs down beside it on a giant lotus leaf, scattering coins and petals",
    "bounces on a cloud like a trampoline beside its guardian, who flips high into the air and lands softly with a shower of golden light",
    "trots around its guardian, who swings a glowing rake in a graceful martial-arts form, each sweep drawing golden harvest light across the ground",
    "floats up on a big glowing lantern with its guardian, who spins a staff that scatters lucky golden coins all over the moonlit pond",
    "wiggles with joy as its guardian claps both hands and a giant golden gourd bursts open, spilling glowing coins, fruit and flowers into the sky",
  ],
};
export const POSE = Object.fromEntries(Object.entries(POSES).map(([a, l]) => [a, l[0]]));
// The day's element, from the traditional 60-day stem-and-branch count (1 October 1949 was a Jia-zi day; the branch from
// the same count is the site's day animal). The stem gives the element: Jia/Yi Wood, Bing/Ding Fire, Wu/Ji Earth,
// Geng/Xin Metal, Ren/Gui Water; odd stems are Yin. Used for the element magic in the action scenes and the captions.
const STEMS = ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"];
const BRANCHES = ["zi", "chou", "yin", "mao", "chen", "si", "wu", "wei", "shen", "you", "xu", "hai"];
export const ELEMENTS5 = {
  Wood: { km: "ឈើ", q: "growth", qKm: "ការលូតលាស់", emo: "🌿", fx: "fresh green leaves, glowing jade vines and young bamboo shoots that sprout and spiral through the air" },
  Fire: { km: "ភ្លើង", q: "passion", qKm: "ភាពក្លៀវក្លា", emo: "🔥", fx: "warm red-gold embers, small dancing flame-petals and rising sparks that never burn anything" },
  Earth: { km: "ដី", q: "stability", qKm: "ស្ថិរភាព", emo: "⛰️", fx: "glowing golden dust, floating amber stones and warm sand-gold light rising from the ground" },
  Metal: { km: "លោហៈ", q: "clarity", qKm: "ភាពច្បាស់លាស់", emo: "✨", fx: "bright silver-white sparkles, shimmering blades of light and softly chiming silver stars" },
  Water: { km: "ទឹក", q: "wisdom", qKm: "ប្រាជ្ញា", emo: "💧", fx: "flowing ribbons of clear blue water, rippling rings of light and cool silver-blue mist" },
};
export function dayElement(iso) {
  const n = Math.round((Date.parse(iso + "T00:00:00Z") - Date.parse("1949-10-01T00:00:00Z")) / 86400000);
  const st = ((n % 10) + 10) % 10, br = ((n % 12) + 12) % 12;
  const el = ["Wood", "Fire", "Earth", "Metal", "Water"][Math.floor(st / 2)], yin = st % 2 === 1;
  return { el, yin, yy: yin ? "Yin" : "Yang", yyKm: yin ? "យិន" : "យ៉ាង", pillar: `${STEMS[st]}-${BRANCHES[br]}`, ...ELEMENTS5[el] };
}
// the move for each sign on a given day: changes every day, and two signs rarely share the same move number
export const posesFor = (iso) => { const n = Math.round(Date.parse(iso + "T00:00:00Z") / 86400000);
  return Object.fromEntries(Object.keys(POSES).map((a, i) => [a, POSES[a][(n + i * 2 + Math.floor(n / 6)) % POSES[a].length]])); };
// how each animal moves when it acts (it never talks): used so the characters feel alive in every clip
export const ANIM = {
  Rat: "its whiskers twitch, its little nose sniffs the air, its long tail flicks and it scurries in quick, playful little hops",
  Ox: "it breathes slowly and steadily, nods its big head, flicks its ears, swishes its tail and takes strong, calm steps",
  Tiger: "it stretches like a big cat, its striped tail swishes, its ears turn toward every sound and it pads around with playful, powerful steps",
  Rabbit: "its long ears twitch and turn, its nose wiggles and it hops lightly with soft, bouncy movements",
  Dragon: "its long body ripples in graceful waves, its whiskers and mane float softly as if underwater, and its claws and tail curl and uncurl",
  Snake: "it glides in smooth S-shaped curves, raises its head gracefully, tilts it with curiosity and coils and uncoils softly",
  Horse: "it tosses its flowing mane, paws the ground, flicks its tail and prances with light, elegant steps",
  Goat: "it tilts its head with curiosity, its ears flop and twitch, and it skips and hops playfully",
  Monkey: "it scratches its head, claps its hands, swings its curly tail and bounces around with cheeky, playful energy",
  Rooster: "it puffs up its chest, fluffs and ruffles its feathers, flaps its wings and struts proudly, bobbing its head",
  Dog: "its tail wags happily, its ears perk up and flop, it tilts its head and bounces with joyful, playful energy",
  Pig: "its curly tail wiggles, its ears flop as it trots in a happy, bouncy way and it wiggles with delight",
};
export const alive = (a) => `The ${a.toLowerCase()} of ${FLOW_NAME(a)} moves like a real, living animal, never still like a statue: ${ANIM[a]}. It breathes, blinks and reacts with expressive body language, and its mouth stays closed. The ${a} guardian moves beside it with the graceful, powerful poise of a martial-arts hero from a Chinese fantasy drama, robes and cape flowing, and never speaks.`;
const lockAnimal = (a) => `Use the saved Flow character ${FLOW_NAME(a)} exactly as it is: the same guardian (face, hair, armor and colors) and the same ${a.toLowerCase()}, identical in every scene.`;
const LOCK_HOST = "Use the saved Flow character @Chanda exactly as she is: same face, hairstyle, outfit and jewelry in every scene.";
export const STYLE = "Vertical 9:16. Photorealistic live-action fantasy film, the look of a high-budget fantasy epic that blends Khmer royal heritage with the grandeur of a Chinese historical fantasy drama. Real human faces with natural skin texture, the zodiac characters saved in Flow, each named after its animal (@Rat, @Ox, @Tiger, @Rabbit, @Dragon, @Snake, @Horse, @Goat, @Monkey, @Rooster, @Dog, @Pig): a guardian warrior in ornate armor themed on the animal, with a lifelike animal beside them (realistic anatomy, real fur, feathers or scales), always exactly as in the saved character picture, noble and powerful (never cute toys or cartoons). Setting: a majestic Khmer temple inspired by Angkor Wat with towering carved stone, an enormous luminous full moon, deep indigo starry sky, drifting mist, a still reflecting pool with floating pink lotus flowers and ornate golden lanterns. A living, magical sky in every shot: thin silver clouds drift slowly across the moon, stars twinkle, a soft halo pulses around the moon and sky lanterns rise gently in the distance. Action and magic in the style of a Chinese fantasy (xianxia) drama: graceful wire-fu flying leaps, slow-motion martial-arts moves, flowing robes and capes, glowing sword energy and swirling qi light, always without blood, injury or fighting between characters. Golden magic: shimmering gold particles, flowing ribbons of liquid-gold light and floating gold dust that never hide a face. Physically real lighting: cool silver-blue moonlight, warm golden rim light, soft lantern glow, volumetric light rays; colors deep navy, imperial gold, ruby red and lotus pink. Cinematic depth of field, smooth slow camera movement, high-end visual effects, 4K detail. The zodiac guardians and their animals never talk and never move their mouths; only Chanda, the presenter, speaks. No text, no letters, no subtitles, no watermark, no logos, no cartoon or plastic look, no low-quality CGI.";
export const STYLE_WIDE = STYLE.replace("Vertical 9:16.", "Horizontal 16:9 (standard YouTube video).");
// ONE fixed voice for Chanda, word for word the same in every clip of every video, so Flow keeps the same voice
export const VOICE_EN = "identical in every clip of this series (the same woman, same timbre, same pitch, same accent, same speed, same energy): a young Cambodian woman in her mid-twenties speaking clear, natural English with a neutral accent, medium-high pitch, a soft, warm and bright tone, a gentle smile in her voice, the same calm, cheerful energy from the first word to the last (never louder, faster, deeper, older or more dramatic), a steady pace of about 150 words per minute, even volume, recorded close to a good studio microphone in a quiet room with no echo or reverb; no whispering, no singing, no other voices";
export const VOICE_KM = "identical in every clip of this series (the same woman, same timbre, same pitch, same speed, same energy): a native Cambodian woman in her mid-twenties speaking Khmer with clear, standard Phnom Penh pronunciation, medium-high pitch, a soft, warm and bright tone, a gentle smile in her voice, the same calm, cheerful energy from the first word to the last (never louder, faster, deeper, older or more dramatic), speaking slightly slowly (about 85 to 90 percent of normal speed), pronouncing every Khmer word fully and clearly with natural Khmer rhythm and a short pause between sentences, even volume, recorded close to a good studio microphone in a quiet room with no echo or reverb; not English-accented, not robotic, no whispering, no singing, no other voices,";
// Khmer for speaking: numbers written out as Khmer words, so a voice reads them in Khmer and not in English
// ("64" -> "ហុកសិបបួន", "2026" -> "ពីរពាន់ម្ភៃប្រាំមួយ"). Subtitles and captions keep the digits.
const KM_ONES = ["សូន្យ", "មួយ", "ពីរ", "បី", "បួន", "ប្រាំ", "ប្រាំមួយ", "ប្រាំពីរ", "ប្រាំបី", "ប្រាំបួន"];
const KM_TENS = ["", "ដប់", "ម្ភៃ", "សាមសិប", "សែសិប", "ហាសិប", "ហុកសិប", "ចិតសិប", "ប៉ែតសិប", "កៅសិប"];
function kmNumber(n) {
  if (n < 10) return KM_ONES[n];
  if (n < 100) return KM_TENS[Math.floor(n / 10)] + (n % 10 ? KM_ONES[n % 10] : "");
  if (n < 1000) return KM_ONES[Math.floor(n / 100)] + "រយ" + (n % 100 ? kmNumber(n % 100) : "");
  if (n < 10000) return KM_ONES[Math.floor(n / 1000)] + "ពាន់" + (n % 1000 ? kmNumber(n % 1000) : "");
  if (n < 100000) return kmNumber(Math.floor(n / 10000)) + "ម៉ឺន" + (n % 10000 ? kmNumber(n % 10000) : "");
  return String(n);
}
// Google Flow prompts only: "របស់" written "របោះ" so Flow pronounces it the way it is said
// Khmer inside the Google Flow prompts only: no "។" (a space marks the pause instead); subtitles and voice-over text keep it
export const kmFlow = (t) => kmSpeak(t).replace(/របស់/g, "របោះ").replace(/\s*។\s*/g, " ").replace(/ {2,}/g, " ").trim();
export const kmSpeak = (t) => t.replace(/([\u1780-\u17d3]) (?=\d)/g, "$1").replace(/\d+/g, (d) => kmNumber(Number(d)));
export const MUSIC = "Gentle magical background music with soft chimes and a light Asian flute. No other voices: the animals do not speak.";
// the channel's presenter: the only one who speaks. She is on camera in the first scene (the hook) and is the
// off-screen narrator in every other scene.
export const HOST = ["Chanda", "ចន្ទា"];
export const HOST_LOOK = "@Chanda, a beautiful Cambodian woman in her early twenties with a warm, kind and confident presence: oval face, soft defined cheekbones, warm amber-brown almond eyes, natural brows, rosy cheeks, natural skin with real texture and refined natural makeup, glossy black hair swept into a low side bun on her right side held by an elaborate golden lotus hairpin with fine dangling gold chains, delicate gold flower earrings, a fitted cream-and-gold Khmer silk brocade blouse with a high mandarin collar and long sleeves, a large round gold medallion on a chain engraved with all twelve zodiac animals, an ornate gold belt with a single ruby-red gemstone at the buckle, a deep navy silk sampot to the ankles with a vertical gold-embroidered front panel and a wide band of Khmer gold patterns at the hem, and gold bangles on both wrists";
export const HOST_CHAR = `Create a photorealistic portrait from a high-budget fantasy epic that blends Khmer royal heritage with a Chinese historical fantasy drama: ${HOST_LOOK}. Realistic human proportions, natural facial expression with a gentle closed-lip smile, real silk that folds and catches the light, real gold jewelry with true metallic reflections. Graceful, upright posture, one hand held open toward the temple as if presenting it, the other resting at her waist. She stands barefoot on a carved sandstone temple terrace with an ornate stone balustrade, beside a reflecting pool with pink lotus flowers; behind her, a temple inspired by Angkor Wat glows under an enormous luminous full moon and a deep indigo starry sky, with golden lanterns and soft drifting gold dust. Cool silver-blue moonlight, warm golden rim light on her face and hair, volumetric mist, cinematic depth of field, sharp focus on her eyes, ultra-detailed. Composition: vertical 9:16, from the knees up, centered, facing the camera. No text, no letters, no watermark, no logo, no cartoon look, no plastic or airbrushed skin. Keep her face, hair, outfit, jewelry and proportions exactly the same in every image and video (see the approved picture characters/chanda.jpg).`;
const audio = (lang, onCam, line) => `Audio: Chanda's voice, ${lang === "km" ? VOICE_KM.replace(/,$/, "") : VOICE_EN}. ${onCam ? "Chanda is on camera and speaks to the viewer with natural lip movements that match her words." : "Chanda is heard as a voice-over only: she is not on screen, and no one on screen speaks or moves their mouth."} She says${lang === "km" ? " in Khmer" : ""}: "${line}" ${MUSIC}`;
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
const HERO_PLACE0 = "It stands on the carved stone steps of a temple inspired by Angkor Wat, beside a still reflecting pool with pink lotus flowers and golden lanterns, under an enormous luminous full moon and a deep indigo starry sky";
// other places for the day's hero picture (buildPack picks one by date)
export const HERO_PLACES = [HERO_PLACE0,
  "It stands on the stone causeway of a temple inspired by Angkor Wat, between carved naga balustrades, with floating lotus lamps on the moat beside it, under an enormous luminous full moon and a deep indigo starry sky",
  "It stands among the giant roots of an ancient banyan tree beside a temple inspired by Angkor Wat, with glowing fireflies and pink lotus flowers on a still pool, under an enormous luminous full moon and a deep indigo starry sky",
  "It stands on a round stone platform in the middle of a lotus pond in front of a temple inspired by Angkor Wat, with lotus lanterns floating around it, under an enormous luminous full moon and a deep indigo starry sky",
  "It stands on a high terrace of a temple tower inspired by Angkor Wat, with carved apsara reliefs behind it and the moonlit jungle far below, under an enormous luminous full moon and a deep indigo starry sky",
  "It stands in a courtyard of a temple inspired by Angkor Wat, beside two carved stone lions and a row of glowing oil lamps, under an enormous luminous full moon and a deep indigo starry sky",
  "It stands on a wooden pier at the edge of a wide lotus lake facing a temple inspired by Angkor Wat, with sky lanterns rising over the water, under an enormous luminous full moon and a deep indigo starry sky",
  "It stands in a garden of white jasmine and frangipani flowers in front of a temple inspired by Angkor Wat, beside a still reflecting pool, under an enormous luminous full moon and a deep indigo starry sky"];
export const HERO = (a, place = HERO_PLACE0) => `Create a photorealistic hero image of ${LOOK[a]}, the ${a} of the Chinese zodiac, as a majestic celestial guardian from a high-budget fantasy epic. The ${a.toLowerCase()} symbolizes ${SYMBOL[a].traits}: a ${SYMBOL[a].mood} expression and posture that show this, mouth calm and closed. Realistic anatomy and textures, engraved gold ornaments with physically real metallic reflections. ${place}; moonbeams fall on the ${a.toLowerCase()}, golden particles and flowing ribbons of liquid-gold light swirl around it. Cool silver-blue moonlight, warm golden rim light, volumetric mist, cinematic depth of field, ultra-detailed. Square 1:1, full body visible, three-quarter view, centered, with space around it. No text, no letters, no watermark, no logo, no cartoon or plastic look, no cropped body parts.`;
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

const NUM_WORDS = (n) => { n = Number(n); if (n < 100) return 1; if (n < 1000) return 1 + (n % 100 ? 2 : 0); return 2 + NUM_WORDS(n % 1000) * (n % 1000 ? 1 : 0); };
const enSpoken = (t) => t.split(/\s+/).filter(Boolean).reduce((s, w) => s + (/^\d+[,.!?:]?$/.test(w) ? NUM_WORDS(w.replace(/\D/g, "")) : 1), 0);
// a spoken line fits a 10-second clip at Chanda's calm pace: at most 23 English words, at most 125 Khmer characters as spoken
const fitsClip = (en, kmT) => enSpoken(en) <= 23 && [...kmFlow(kmT)].length <= 125;
// more words in short scenes: add the first of today's extra sentences that still fits the clip (else keep the line)
const fuller = ([en, kmT], extras) => { for (const [e, k] of extras) if (fitsClip(`${en} ${e}`, `${kmT} ${k}`)) return [`${en} ${e}`, `${kmT} ${k}`]; return [en, kmT]; };
export function buildPack(iso, F, forSign, data = null, P = null) {
  const DEL = dayElement(iso);   // today's element (Wood, Fire, Earth, Metal or Water)
  const POSE = Object.fromEntries(Object.entries(posesFor(iso)).map(([a, m]) => [a, `${m}, as today's ${DEL.el} magic swirls around them: ${DEL.fx}`]));   // today's action move for each sign (a new one every day), with the day's element
  const sign = (a) => F.signs.find((s) => s.animal === a);
  const day = F.dayAnimal, dayKm = F.dayAnimalKm, lucky = F.highlights.topLucky, careful = F.highlights.careful;
  const km = (a) => sign(a).nameKm;
  const nums = lucky.map((a) => { const v = forSign(a, iso); if (String(v.d1) !== String(sign(a).lucky.number)) throw new Error(`${iso} ${a}: lucky number mismatch`); return { a, ...v }; });
  const inVideo = [...new Set([day, ...lucky, ...careful])];
  const numLine = (n, name) => `${name}  ${n.d1} · ${n.d2} · ${n.d3} · ${n.d4} · ${n.d5}`;
  const D = dmy(iso), LD = longDate(iso);

  // written summary: the site's own daily wording if it exists already, otherwise the standard script
  const same = data && JSON.stringify(data.highlights.topLucky) === JSON.stringify(lucky) && JSON.stringify(data.highlights.careful) === JSON.stringify(careful);
  // "ឆ្នាំ" before every animal name in the site's Khmer summary (e.g. ថ្ងៃម្សាញ់ -> ថ្ងៃឆ្នាំម្សាញ់), as in the rest of the pack
  const KMN12 = F.signs.map((x) => x.nameKm);
  const addYear = (t) => t.replace(new RegExp(`(^|[\\s៖,(]|ថ្ងៃ)(${KMN12.join("|")})(?=[\\s។!?,៖)]|$)`, "g"), (m, pre, nm) => `${pre}ឆ្នាំ${nm}`);
  const summaryKm = same && data.highlights.summary?.km ? addYear(data.highlights.summary.km) : [
    `ថ្ងៃនេះជាថ្ងៃឆ្នាំ${dayKm}។`,
    `${kmList(lucky.map((a) => `ឆ្នាំ${km(a)}`))} មានសំណាងល្អជាងគេនៅថ្ងៃនេះ។`,
    ...(careful.length ? [`ចំណែក${kmList(careful.map((a) => `ឆ្នាំ${km(a)}`))} គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។`] : []),
  ].join(" ");
  const summaryEn = same && data.highlights.summary?.en ? data.highlights.summary.en : [
    `Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day.`,
    `${list(lucky)} are the luckiest signs today.`,
    ...(careful.length ? [`${list(careful)} should take it easy, slow down and avoid rushing big decisions.`] : []),
  ].join(" ");

  const voiceKm = [
    `តើរាសីរបស់អ្នក ស្ថិតក្នុងចំណោមបីឆ្នាំ ដែលមានសំណាងជាងគេថ្ងៃនេះឬទេ? នេះគឺជោគជតារាសី សម្រាប់ថ្ងៃទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]} ឆ្នាំ ${iso.slice(0, 4)}។`,
    summaryKm,
    `សម្រាប់លេខសំណាងថ្ងៃនេះ៖ ${nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2} និង ${n.d3}។`).join(" ")} សូមសរសេរលេខសំណាងរបស់អ្នក នៅក្នុងមតិយោបល់ ហើយនិយាយម្ដងទៀត!`,
    "ចូលមើលលេខសំណាង និងលម្អិតសម្រាប់រាសីទាំង 12 នៅ mybirthsign.com",
  ];
  const voiceEn = [
    `Is your sign one of today's three luckiest? Here's your Chinese zodiac fortune for ${LD}.`,
    summaryEn,
    `For lucky numbers today: ${nums.map((n) => `${n.a}, ${n.d2} and ${n.d3}.`).join(" ")} Comment your lucky number below, and say it again!`,
    "See all 12 signs and full lucky numbers at mybirthsign.com.",
  ];
  const srtKm = srt(voiceKm.flatMap((v) => splitLines(v, "km")));
  const srtEn = srt(voiceEn.flatMap((v) => splitLines(v, "en")));

  const luckyLabelsKm = lucky.map((a) => `ឆ្នាំ${km(a)} – ${sign(a).label.km}`).join(" · ");
  const luckyLabelsEn = lucky.map((a) => `${a} – ${sign(a).label.en}`).join(" · ");
  const disclaimerNums = "លេខសំណាង (1 ដល់ 5 ខ្ទង់) សម្រាប់ថ្ងៃនេះ គឺសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការទស្សន៍ទាយ ឬការណែនាំឱ្យភ្នាល់ទេ។";
  const disclaimer = "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រទេ។";
  const tags = `#ជោគជតារាសី #រាសីប្រចាំថ្ងៃ #ឆ្នាំ${dayKm} #ផ្កាយកំណើត`;
  const tagsEn = `#ChineseZodiac #DailyHoroscope #YearOfThe${day} #LuckyNumbers`;
  const DISC_EN = "Traditional Chinese zodiac reading for entertainment and self-reflection only, not a scientific prediction.";

  // 9-scene video for the luckiest animal
  const dl = day.toLowerCase(), friends = lucky.filter((a) => a !== day), S9 = SYMBOL[day], dd = sign(day);
  const rot = (k, list) => list.map((_, i) => list[(dayNo + k + i) % list.length]);   // today's order of the extra sentences
  const helper = dd.lucky.helperAnimal, elLine = [`It's a ${DEL.yy} ${DEL.el} day, a day of ${DEL.q}.`, `ថ្ងៃនេះជាថ្ងៃធាតុ${DEL.km} ជាថ្ងៃនៃ${DEL.qKm}។`];
  const dateEn = LD.replace(/^\w+, /, "").replace(/ \d{4}$/, "");
  const dateKm = `ថ្ងៃទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]}`;
  // daily variety: V(n, k, list) picks one of n versions for this date. It changes from day to day, and the same animal
  // gets a different version each time it comes back (every 12 days). k keeps the different choices from moving together.
  const dayNo = Math.round(Date.parse(iso + "T00:00:00Z") / 86400000);
  const V = (n, k, list) => list[(dayNo + Math.floor(dayNo / 12) * 5 + k * 7) % n];
  const ckm = dd.lucky.color.km, cen = dd.lucky.color.en, n0 = nums[0];
  const dir = dd.lucky.direction.en.toLowerCase(), dirKm = dd.lucky.direction.km;
  // ---- different objects every day (the owner's request, 30/10/2026): each recurring scene takes today's version from a
  // long list below, so the objects in the prompts change every day and rarely repeat. The lucky-numbers scenes stay
  // exactly as they were, and no spoken line changes. DV(k, list, plus) is today's item of a list: k keeps different
  // scenes from moving together, and plus gives a second video (or another sign) the next item, so the same day never
  // shows the same thing twice. Every list has 7 or more items, so two days in a row always differ.
  const DV = (k, list, plus = 0) => list[(dayNo + Math.floor(dayNo / 12) * 5 + k * 7 + plus) % list.length];
  // the lucky color shown with things in that color: a full scene, one small item, and a short "around it" phrase
  const an = (w) => (/^[aeiou]/i.test(w) ? "an" : "a");   // "an orange lantern"
  const COLOR_OBJ = (a, c) => [
    { scene: `Glowing ${c} lanterns light up one by one around the ${a} on the temple steps, and it gently nudges the nearest one.`, one: `${an(c)} ${c} lantern`, around: `${c} lanterns glow softly around it` },
    { scene: `Long silk ribbons in ${c} unfurl through the air around the ${a}, glowing softly at their edges, and one settles around it like a royal sash.`, one: `${an(c)} ${c} silk ribbon`, around: `${c} silk ribbons float softly around it` },
    { scene: `Lotus flowers across the pond open one by one and glow ${c}, forming a path of ${c} light that reaches the ${a}.`, one: `a glowing ${c} lotus flower`, around: `${c} lotus flowers glow on the water around it` },
    { scene: `Oiled-paper parasols in ${c} open one after another and float gently around the ${a}, turning slowly like flowers in the breeze.`, one: `a small ${c} paper parasol`, around: `${c} paper parasols turn slowly in the air around it` },
    { scene: `A cloud of glowing ${c} butterflies rises from the lotus pond and circles the ${a}, and one settles softly on its head.`, one: `a glowing ${c} butterfly`, around: `${c} butterflies flutter softly around it` },
    { scene: `Floating candles in ${c} glass cups drift across the still pond toward the ${a}, their reflections shimmering on the water.`, one: `${an(c)} ${c} floating candle`, around: `${c} floating candles drift on the water around it` },
    { scene: `A garland of ${c} flowers, like a Khmer offering garland, floats down from the moonlit sky and settles gently around the ${a}'s neck.`, one: `${an(c)} ${c} flower garland`, around: `${c} flower garlands glow softly around it` },
    { scene: `Glowing ${c} gemstones rise slowly out of the pond and hover in a sparkling circle around the ${a}, catching the moonlight.`, one: `a glowing ${c} gemstone`, around: `${c} gemstones sparkle in a circle around it` },
    { scene: `Hundreds of folded paper cranes in ${c} flutter down from the sky and glide around the ${a} before landing softly on the water.`, one: `${an(c)} ${c} paper crane`, around: `${c} paper cranes glide slowly around it` },
    { scene: `A soft wave of ${c} petals sweeps across the temple terrace and swirls around the ${a} in a gentle spiral.`, one: `a swirl of ${c} petals`, around: `${c} petals drift softly around it` },
    { scene: `Lotus-shaped paper kites in ${c} rise on the night breeze above the ${a}, their long tails glowing.`, one: `a small ${c} kite`, around: `${c} kites float softly in the sky above it` },
    { scene: `Glass orbs filled with ${c} light float up from the water like bubbles and gather around the ${a}, glowing brighter as they rise.`, one: `a glowing ${c} glass orb`, around: `${c} glass orbs of light float around it` },
  ];
  // the best time: a full scene, a short phrase (for the time-and-direction scene) and one small item
  const TIME_OBJ = (a) => [
    { scene: `A shining circle of golden light like a sundial appears on the temple stone, and its glowing shadow turns slowly as the ${a} watches.`, short: "a sundial of golden light on the stone turns its glowing shadow", one: "a small golden sundial" },
    { scene: `A tall bronze water clock beside the pond lets fall one glowing golden drop after another, each one ringing out in a circle of light, as the ${a} watches.`, short: "a bronze water clock lets fall one glowing golden drop after another", one: "a tiny bronze water clock" },
    { scene: `A large hourglass of golden sand floats above the pond and slowly turns over, its sand glowing as it falls, while the ${a} watches calmly.`, short: "a large hourglass of glowing golden sand turns slowly over", one: "a small golden hourglass" },
    { scene: `A ring of twelve glowing zodiac symbols lights up on the temple floor like a great clock face, and a beam of moonlight moves around it and stops on one symbol, as the ${a} looks on.`, short: "a ring of twelve glowing zodiac symbols lights up on the floor like a clock face", one: "a small ring of twelve zodiac symbols" },
    { scene: `A thin stick of incense burns on a stone altar, its smoke rising in slow golden rings that mark the passing hours, while the ${a} sits quietly beside it.`, short: "a stick of incense on a stone altar sends up slow golden rings of smoke", one: "a glowing incense stick" },
    { scene: `A bronze armillary sphere, an ancient star clock of turning rings, glows gold on the temple terrace and turns slowly as the ${a} watches in wonder.`, short: "a bronze armillary sphere of turning golden rings glows on the terrace", one: "a little bronze star clock" },
    { scene: `A tall candle marked with golden bands burns slowly on the temple steps, one band glowing brighter than the others, as the ${a} watches.`, short: "a tall candle marked with golden bands burns slowly on the steps", one: "a banded golden candle" },
    { scene: `The moonlit shadow of a temple pillar moves slowly across the carved floor like the hand of a clock, and the ${a} follows it with its eyes.`, short: "the moonlit shadow of a temple pillar moves across the floor like a clock hand", one: "a glowing clock hand of moonlight" },
    { scene: `A great lotus on the pond opens petal by petal in time-lapse, each petal lighting up like the tick of a clock, as the ${a} watches.`, short: "a great lotus on the pond opens petal by petal like the ticks of a clock", one: "a slowly opening golden lotus" },
    { scene: `A temple drum glows softly, and rings of golden light pulse out from it at a slow, steady beat, like a heartbeat counting time, as the ${a} listens.`, short: "a glowing temple drum sends out rings of golden light at a slow, steady beat", one: "a small glowing temple drum" },
  ];
  // the lucky direction (d): a full scene and one small item
  const DIR_OBJ = (a, d) => [
    { scene: `A glowing golden path of light unrolls across the pond toward the ${d}, lotus flowers lighting up one by one along it, and the ${a} sets off along it.`, one: "a golden path of light" },
    { scene: `A giant compass of golden light appears on the temple floor; its needle spins, slows and points to the ${d}, and the ${a} turns to follow it.`, one: "a golden compass of light" },
    { scene: `Glowing footprints of light appear one by one across the flat stepping stones, leading toward the ${d}, and the ${a} follows them.`, one: "a trail of glowing footprints" },
    { scene: `A flock of glowing golden birds rises from the temple roof and flies off toward the ${d}, and the ${a} watches, then follows their trail.`, one: "a small flock of golden birds" },
    { scene: `A small paper boat carrying a candle sails slowly across the moonlit pond toward the ${d}, and the ${a} moves along the bank beside it.`, one: "a paper boat with a candle" },
    { scene: `A bridge of golden light builds itself plank by plank across the pond toward the ${d}, and the ${a} steps onto it.`, one: "a little bridge of golden light" },
    { scene: `Fireflies gather into a glowing river of light that flows through the air toward the ${d}, and the ${a} follows it happily.`, one: "a ribbon of fireflies" },
    { scene: `A golden kite on a glowing string rises into the sky and pulls gently toward the ${d}, and the ${a} looks up and follows it.`, one: "a golden kite" },
    { scene: `The carved stone lions along the temple causeway light up one after another toward the ${d}, and the ${a} walks past them.`, one: "a glowing stone lion" },
    { scene: `A bright shooting star streaks low across the sky toward the ${d}, leaving a glowing trail, and the ${a} turns to face that way.`, one: "a shooting star" },
    { scene: `Tall temple gates on the ${d} side swing open, spilling warm golden light across the stones, and the ${a} walks toward them.`, one: "a glowing temple gate" },
  ];
  const LOVE_OBJ = (a) => [
    `The ${a} sits by the lotus pond as warm pink lanterns rise around it, and a soft glowing heart of golden light forms in the air in front of it.`,
    `Two pink lotus flowers drift together on the pond in front of the ${a}, and where their glowing petals touch, a soft ring of light spreads across the water.`,
    `A glowing red thread of light winds gently through the air, loops softly around the ${a} and stretches away toward the warm lights of a village beyond the temple.`,
    `A pair of glowing butterflies dance around each other in front of the ${a}, then land side by side on a lotus leaf.`,
    `Pink petals fall softly from a blossoming tree beside the temple and gather on the water in front of the ${a} in the shape of a heart.`,
    `Two sky lanterns rise side by side from the pond, glowing warm pink, and the ${a} watches them float up together toward the moon.`,
    `A pair of mandarin ducks glide side by side across the moonlit pond past the ${a}, leaving two gentle ripples that join into one.`,
    `A garland of white jasmine flowers glows softly in the moonlight and loops itself around the ${a}, giving off tiny golden sparkles.`,
    `Small lanterns light up in a cozy circle around the ${a} on the temple terrace, close together like a family gathered for dinner.`,
    `A tree of pink blossoms on the temple terrace bursts into bloom above the ${a}, and its glowing petals swirl gently around it.`,
  ];
  const WORK_OBJ = (a) => [
    `The ${a} climbs the glowing temple steps one by one, and each step lights up in gold under it; at the top it looks out proudly over the moonlit temple.`,
    `A long scroll of golden light unrolls in the air in front of the ${a}, covered in glowing patterns that light up one after another as it follows them closely.`,
    `Smooth glowing stones stack themselves one on top of another into a neat little tower beside the ${a}, which watches each one settle into place.`,
    `A bridge of golden light builds itself plank by plank over a misty stream as the ${a} moves forward, one plank at a time.`,
    `A young bamboo shoot beside the ${a} grows taller and taller in time-lapse, glowing green and gold, and the ${a} looks up to its very top.`,
    `The ${a} follows a winding path of light up a small hill beside the temple, each bend lighting up as it reaches it.`,
    `A small glowing seed lands in front of the ${a} and grows into a young tree full of golden leaves, branch by branch.`,
    `An old wooden abacus floats in front of the ${a}, and its beads of light slide neatly into place one by one.`,
    `Small oil lamps along the temple wall light up one after another as the ${a} walks past them, until the whole wall glows warmly.`,
    `A ladder of golden light rises from the pond toward the sky, and the ${a} climbs it rung by rung, calm and steady.`,
  ];
  const MONEY_OBJ = (a) => [
    `A lotus-shaped basket of softly glowing golden coins sits beside the ${a}, and one shining coin floats from the basket into a small golden jar.`,
    `A small wooden treasure chest beside the ${a} opens slowly, showing neat rows of glowing gold ingots, then closes its lid carefully again.`,
    `Golden rice sheaves fall gently into a woven basket beside the ${a} until it is full, and a few glowing grains sparkle in the moonlight.`,
    `A small money tree on the temple terrace grows round golden leaves shaped like coins, and one leaf drifts down and lands in front of the ${a}.`,
    `A bowl of clear water beside the ${a} holds a single golden koi that circles slowly, scattering soft golden light.`,
    `A silk pouch tied with a red string sits beside the ${a}; glowing coins drop into it one by one, then the string ties itself shut.`,
    `A shell at the edge of the pond opens to show a shining pearl, and the ${a} looks at it, calm and thoughtful.`,
    `A small golden jar stands on the temple step, and glowing coins fall into it one at a time like drops of light, as the ${a} watches.`,
    `Ripe golden mangoes glow in a woven basket beside the ${a}, and a warm light rises gently from them.`,
    `A thin stream of tiny golden coins flows like a little river across the stone floor and pools neatly in a round dish beside the ${a}.`,
  ];
  // seven things in a row, two brighter: the lucky days of the week
  const SEVEN_OBJ = (a) => [
    `Seven glowing lanterns float in a row above the lotus pond, and two of them shine brighter than the others. The ${a} looks up at the two bright lanterns and smiles.`,
    `Seven lotus flowers open in a row across the pond, and two of them glow brighter than the others. The ${a} looks at the two bright flowers and smiles.`,
    `Seven stars line up above the temple towers, and two of them sparkle brighter than the others. The ${a} looks up at them and smiles.`,
    `Seven floating candles drift in a line across the still water, and two of them burn brighter than the others. The ${a} watches them and smiles.`,
    `Seven small golden bells hang in a row under the temple eaves, and two of them glow and chime brighter than the others. The ${a} looks up and smiles.`,
    `Seven stepping stones across the pond light up one after another, and two of them shine brighter than the others. The ${a} moves close to a bright one and smiles.`,
    `Seven paper boats with candles sail in a row across the pond, and two of them glow brighter than the others. The ${a} watches them and smiles.`,
    `Seven crystals rise from the water in a gentle arc, and two of them shine brighter than the others. The ${a} looks at them and smiles.`,
    `Seven sky lanterns rise in a row from behind the temple, and two of them glow brighter than the others. The ${a} watches them float up and smiles.`,
  ];
  const REFLECT_OBJ = (a) => [
    `The ${a} looks at its reflection in the still lotus pond. The reflection smiles back, and a soft ring of golden light spreads across the water.`,
    `The ${a} looks into an old round bronze mirror on the temple wall; its reflection glows softly and gives it a calm, kind look.`,
    `A single golden feather drifts down and balances perfectly on the tip of a lotus leaf in front of the ${a}, which watches it quietly.`,
    `The ${a} sits under a great banyan tree as a few glowing leaves fall slowly around it, its eyes half closed, calm and thoughtful.`,
    `A small candle flame flickers in the breeze in front of the ${a}, then grows steady and bright as the ${a} breathes slowly.`,
    `Two smooth stones balance one on top of the other on the temple step beside the ${a}, perfectly still and glowing softly.`,
    `Wind chimes under the temple roof sway and ring softly, and the ${a} closes its eyes and listens, calm and peaceful.`,
    `A soft wave of mist rolls over the pond and clears again, leaving the water perfectly still and the ${a} calm and quiet beside it.`,
  ];
  const WISH_OBJ = (a) => [
    `The ${a} gently places a small glowing lotus lantern on the pond and makes a wish. The lantern drifts away across the moonlit water, and tiny golden sparkles rise from it into the night sky.`,
    `A sky lantern lifts off from the temple terrace beside the ${a} and floats slowly up toward the full moon, carrying its wish, as golden sparkles fall from it like snow.`,
    `A small paper boat with a candle glides away across the pond from the ${a}, carrying its wish, and its light shimmers on the still water.`,
    `A glowing dandelion of light drifts in front of the ${a}; its seeds float away one by one into the night sky, each a tiny golden spark.`,
    `A glowing coin falls into an old stone well beside the temple, and a ring of golden light rises from the water as the ${a} makes a wish.`,
    `A red wish ribbon ties itself to a branch of a great wishing tree beside the temple, glowing softly, as the ${a} looks up with hope.`,
    `A firefly lands in front of the ${a}, glows brighter, then flies up and joins the stars, carrying its wish.`,
    `A paper crane of golden light unfolds in front of the ${a}, flaps its wings and flies up toward the moon, carrying its wish.`,
    `A single glowing lotus flower floats away down the stream beside the temple, carrying the ${a}'s wish into the night.`,
  ];
  const THANKS_OBJ = (a) => [
    `The ${a} bows its head gently in front of the glowing temple, as pink lotus petals fall softly around it like rain.`,
    `A garland of fresh jasmine flowers settles on the temple step in front of the ${a}, which bows its head softly in thanks.`,
    `A single stick of incense glows on a stone altar and its smoke curls up in soft golden spirals, as the ${a} bows its head quietly beside it.`,
    `A pink lotus lies on the temple steps as an offering beside the ${a}, and warm golden light glows from the temple doorway.`,
    `A small temple bell rings softly by itself, and rings of warm light spread out as the ${a} bows its head in thanks.`,
    `Golden leaves drift down from a bodhi tree around the ${a}, which closes its eyes and bows gently, grateful and calm.`,
    `Little oil lamps light up one by one along the temple steps around the ${a}, which bows its head softly as the light reaches it.`,
    `White and gold petals fall gently from the sky onto the ${a} as it bows its head in front of the moonlit temple.`,
  ];
  const HALO = ["small glowing lotus petals float around it like a halo", "tiny golden fireflies circle slowly around its head like a crown",
    "a soft ring of golden light, carved with lotus patterns, turns slowly behind its head", "glowing jasmine flowers drift in a slow circle around it",
    "fine golden dust swirls around it in a gentle spiral", "small floating lanterns circle around it at shoulder height",
    "delicate silver-gold butterflies flutter in a slow circle around it", "soft beams of moonlight form a glowing ring around its face"];
  // after the magical move: how it lands, with the camera
  const LAND = [
    "Lotus petals and sparkles swirl up behind it, then it lands lightly on the temple steps, proud and happy. Fast, dynamic tracking shot circling around it.",
    "Rings of golden light ripple out across the pond where it moves, and it lands on the temple roof against the full moon, proud and happy. Sweeping crane shot rising with it.",
    "Time slows for a moment: sparks and petals hang in the air around it, then everything rushes on as it lands gracefully on a glowing lotus. Slow-motion shot, then normal speed.",
    "A spiral of glowing leaves follows its path and settles on the water as it lands on a floating lotus leaf, proud and happy. Low tracking shot skimming the water.",
    "Its golden trail draws a glowing arc across the sky and fades into stars as it lands on the temple causeway, proud and happy. Wide shot, then a quick push-in.",
    "A burst of lotus-shaped sparks opens behind it like a flower as it lands on the temple terrace, proud and happy. Orbiting shot, half a circle.",
    "Mist swirls away from it in a ring as it lands beside a carved stone lion on the causeway, proud and happy. Low-angle hero shot.",
    "Fireflies scatter and swirl around it like a cloud of stars as it lands beside the reflecting pool, proud and happy. Smooth follow shot.",
  ];
  // how the day's animal first appears (60-second, 180-second and long videos)
  const APPEAR = [
    `Extreme close-up of a closed pink lotus on the moonlit pond. It opens petal by petal and reveals ${LOOK[day]} curled up asleep on its golden pedestal. It wakes, blinks its bright, expressive eyes, stretches its whole body and looks around with delight. Smooth pull-back from the close-up to a full-body shot.`,
    `A swirl of golden dust gathers on the temple steps, spins faster and faster, and forms ${LOOK[day]}, which steps out of the light, shakes itself and looks around with delight. Slow push-in, then a gentle orbit.`,
    `A beam of moonlight falls on the still reflecting pool, and ${LOOK[day]} rises slowly out of the glowing water, completely dry, and steps onto a floating lotus, looking around with delight. Low camera at water level, slowly rising.`,
    `Tall carved temple doors swing open, and ${LOOK[day]} walks out through a curtain of golden light and falling lotus petals, then stops and looks straight at the camera. Steady tracking shot backward in front of it.`,
    `A curtain of mist on the temple causeway slowly parts, and ${LOOK[day]} steps out of it into the moonlight, shakes itself and looks around with delight. Slow push-in.`,
    `A cloud of fireflies gathers over the pond, swirls into a glowing shape and becomes ${LOOK[day]}, which lands on a floating lotus leaf and looks around with delight. Slow orbit.`,
    `A carved stone relief on the temple wall begins to glow, and ${LOOK[day]} steps out of the carving into real life, blinking and looking around with delight. Slow pull-back from the wall.`,
    `A falling star lands softly on the temple terrace in a burst of golden light, and ${LOOK[day]} rises from the glow, stretches and looks around with delight. Low camera, slowly rising.`,
  ];
  // the opening shot of the 180-second and long videos
  const MOON = [
    "A huge full moon rises slowly over the Angkor-style temple and the still lotus pond. Lanterns drift upward, and a single beam of silver-gold moonlight falls onto a closed pink lotus in the middle of the pond. Slow push-in toward the lotus.",
    "A huge full moon rises behind the temple towers. Fireflies rise from the reeds around the still pond, and a single beam of silver-gold moonlight falls onto the temple steps. Slow push-in toward the steps.",
    "Mist rolls slowly across the lotus pond as a huge full moon climbs above the temple. Small bells under the temple roof sway and glint, and a beam of moonlight falls onto the middle of the pond. Slow glide over the water.",
    "A flock of white egrets crosses the face of a huge rising full moon above the temple. Below, the still pond mirrors the sky, and a beam of silver-gold moonlight touches a closed lotus bud. Slow tilt down from the moon to the pond.",
    "Floating lotus lamps glow on the dark pond as a huge full moon rises over the temple. The stars reflect in the water like a second sky, and a beam of moonlight falls on the carved causeway. Slow, low glide along the water.",
    "Palm trees sway softly in silhouette as a huge full moon rises over the temple. Ripples of silver light spread across the pond, and a beam of moonlight falls onto a round stone platform by the water. Slow push-in.",
    "A huge full moon rises through thin clouds above the temple. Incense smoke drifts from the temple doorway, and a beam of silver-gold moonlight falls through it onto the lotus pond. Slow crane down from the sky.",
    "Night falls over the temple and its lotus pond; one by one the oil lamps along the causeway light up, and a huge full moon rises, sending a beam of silver-gold moonlight onto the water. Slow forward dolly along the causeway.",
  ];
  // the big moment in the sky at the end of a video
  const FINALE_SKY = [
    "golden light beams shoot up from the temple towers and burst into soft lotus-shaped golden fireworks, and hundreds of lanterns rise over the glowing pond",
    "thousands of fireflies rise from the pond and gather into a huge glowing lotus flower in the sky",
    "hundreds of sky lanterns rise from behind the temple and form a great glowing circle around the full moon",
    "a whirl of golden petals spirals up from the pond into the night sky like a ribbon of light",
    "a gentle shower of shooting stars falls behind the temple towers",
    "a flock of glowing golden birds rises from the temple roof and circles the full moon",
    "the whole lotus pond lights up from below, and its golden glow rises into the sky like a curtain of light",
    "long golden ribbons of light unfurl from the temple towers and wave across the starry sky",
  ];
  const FINALE = (a, k = 0) => `The ${a} waves goodbye from the temple terrace as ${DV(31, FINALE_SKY, k)}. The camera rises and pulls back for a wide, epic view, with open sky at the top for a title.`;
  // Chanda's magic in the goodbye scenes (who = the character(s) beside her)
  const HOST_MAGIC = (who) => [
    `As she talks she opens her palm, and a small golden lotus blooms in her hand, glows brighter and bursts into thousands of golden sparkles that swirl in a slow magical spiral around her and ${who}.`,
    `As she talks she lifts both hands, and a ring of glowing golden zodiac symbols spins up around her and ${who}, then rises into the sky and opens into a crown of light above the temple.`,
    `As she talks she blows gently over her open palm, and a stream of glowing golden butterflies swirls around her and ${who} before flying up toward the moon.`,
    `As she talks she draws a slow circle in the air with one finger, and it fills with tiny golden stars that drift down like snow around her and ${who}.`,
    `As she talks she lifts a small lotus lamp in both hands, and its warm light spreads out in a soft golden wave over her and ${who}.`,
    `As she talks she claps her hands softly once, and dozens of small lanterns light up around her and ${who} and float slowly upward.`,
    `As she talks she lets a handful of glowing jasmine petals fall from her palm, and they swirl in a slow golden spiral around her and ${who}.`,
  ];
  // where a sign appears in the all-signs videos, and how an ordinary or a quiet sign spends its scene
  const PLACE = ["appears on a glowing lotus pedestal in front of the Angkor-style temple under the full moon", "steps out onto the moonlit temple causeway between carved naga balustrades",
    "rises onto a floating lotus leaf in the middle of the moonlit pond", "appears at the top of the temple steps, the full moon behind it",
    "walks out from between two carved stone lions at the temple gate", "appears in a circle of moonlight on the carved temple terrace",
    "lands softly on a round stone platform at the edge of the pond", "appears under the arch of a temple gallery, framed by carved pillars and the full moon"];
  const CALM_ACT = ["looks around happily as lanterns drift slowly past", "watches fireflies drift across the pond and follows one with its eyes",
    "walks slowly along the stone causeway as soft petals fall around it", "sits by the water and watches small fish make silver ripples",
    "follows a floating lotus flower with its eyes as it drifts past", "stretches and enjoys the cool night breeze on the temple terrace",
    "pauses to smell a blooming jasmine flower beside the steps", "rests on a carved stone step as soft mist drifts past"];
  const REST_ACT = ["curls up calmly as glowing butterflies circle it", "rests inside a soft bubble of golden light as tiny sparkles fall like snow",
    "naps peacefully under a big lotus leaf held up like an umbrella", "rests quietly as a few fireflies keep watch around it",
    "breathes slowly beside a small, steady candle flame", "lies down on a soft bed of petals as the moonlight wraps it in a gentle glow",
    "rests beside the still water, eyes half closed, as mist drifts softly past", "curls up under a carved stone arch as soft golden light glows around it"];
  const GROUP12 = ["sit on glowing lotus pedestals in a wide circle around the moonlit pond in front of the temple",
    "stand along the moonlit temple steps in two rows", "stand on floating lotus leaves spread around the moonlit pond",
    "sit along the stone causeway between the carved naga balustrades", "stand in a wide arc on the moonlit temple terrace",
    "sit on round stone platforms that rise out of the moonlit pond", "stand in the arches of the moonlit temple gallery, each framed by carved pillars"];
  const CAM = ["Slow orbit around it.", "Slow push-in.", "Rack focus from the objects to its face.", "Gentle crane shot rising above it.",
    "Low camera at water level, slowly rising.", "Smooth tracking shot beside it.", "Slow pull-back to a wide view."];
  // today's picks for the day's animal (the 60-second video takes one, the 180-second video the next)
  const COL = COLOR_OBJ(dl, cen), TIM = TIME_OBJ(dl), DIRS = DIR_OBJ(dl, dir);
  const col60 = DV(21, COL), col180 = DV(21, COL, 1), tim60 = DV(22, TIM), tim180 = DV(22, TIM, 1), dir60 = DV(23, DIRS), dir180 = DV(23, DIRS, 1);
  const nine = [
    ["The full moon rises", DV(24, MOON),
      "Tonight the full moon rises over the temple, and a special friend is waking up.", "យប់នេះ ព្រះចន្ទពេញវង់រះលើប្រាសាទ ហើយមានមិត្តពិសេសម្នាក់កំពុងភ្ញាក់ឡើង។"],
    [`The ${day} appears`, DV(25, APPEAR, 1),
      `Today, ${dateEn}, is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day! A great day for everyone born in the Year of the ${day}.`, `${dateKm} ជាថ្ងៃឆ្នាំ${dayKm}! ជាថ្ងៃល្អខ្លាំងសម្រាប់អ្នកកើតឆ្នាំ${dayKm}។`],
    [`What the ${day} means`, `The ${dl} looks up at the full moon, and ${S9.vis}. ${cap(S9.mood)} mood. Slow upward camera tilt.`,
      S9.en, S9.km],
    ["The magical moment", `The ${dl} ${POSE[day]}. ${DV(26, LAND, 1)}`,
      `Born in the Year of the ${day}? Today is your day to shine. Stay ${S9.mood}.`, `អ្នកកើតឆ្នាំ${dayKm} ថ្ងៃនេះជាថ្ងៃរបស់អ្នក! ចូររក្សាចិត្តល្អ និងធ្វើអ្វីៗដោយស្ងប់។`],
    ["Lucky color and lucky time", `${col180.scene} Nearby, ${tim180.short}. Warm ${cen} and gold light.`,
      `Your lucky color today is ${dd.lucky.color.en}, and your best time is ${sayTime(dd.lucky.time)}.`, `ពណ៌សំណាងថ្ងៃនេះគឺពណ៌${dd.lucky.color.km} ហើយពេលល្អបំផុតគឺ${sayTimeKm(dd.lucky.time)}។`],
    ["Lucky direction", `${dir180.scene} Camera follows behind it.`, "", ""],
    ["Lucky numbers", `A huge glowing golden wheel rises out of the lotus pond in front of the temple and spins with beams of golden light, then slows to a gentle shining turn. The ${dl} watches it happily from its lotus pedestal, its golden details sparkling. Open space in the middle and lower part of the frame for number captions. Slow push-in.`, "", ""],
    ["Make a wish", `${DV(27, WISH_OBJ(dl))} Peaceful, warm and magical mood. Slow camera move following the light.`, "", ""],
    ["Golden ending", FINALE(dl),
      "See all twelve signs at mybirthsign dot com. Have a lucky day!", "ចូលមើលរាសីទាំង 12 នៅ mybirthsign.com។ សូមឲ្យមានសំណាងល្អ!"],
  ];
  // 90-second voice-over for the 9-scene video (about 10 seconds per scene)
  const KMDAY = ["ថ្ងៃអាទិត្យ", "ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"];
  const wdKm = KMDAY[new Date(iso + "T00:00:00Z").getUTCDay()];
  const vo90 = [
    ["Tonight, the full moon rises over the ancient temple. Lotus flowers glow on the water, and a very special friend is waking up.",
      "យប់នេះ ព្រះចន្ទពេញវង់រះឡើងលើប្រាសាទបុរាណ។ ផ្កាឈូកភ្លឺចែងចាំងលើផ្ទៃទឹក ហើយមិត្តពិសេសម្នាក់ កំពុងភ្ញាក់ពីដំណេក។"],
    [`Today, ${LD}, is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day. It is a ${dd.label.en} for everyone born in the Year of the ${day}. This is your day to shine!`,
      `ថ្ងៃនេះ ${wdKm} ទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]} ឆ្នាំ ${iso.slice(0, 4)} គឺជាថ្ងៃឆ្នាំ${dayKm}។ នេះជា${dd.label.km} សម្រាប់អ្នកកើតឆ្នាំ${dayKm}។ ថ្ងៃនេះ គឺជាថ្ងៃរបស់អ្នក!`],
    [`${S9.en} Today, this good energy is with you.`, `${S9.km} ថ្ងៃនេះ ថាមពលល្អទាំងនេះ កំពុងនៅជាមួយអ្នក។`],
    [`Born in the Year of the ${day}? Your luck is strong today. Stay ${S9.mood}. Say yes to good chances, and share your happiness with the people around you.`,
      `សម្រាប់អ្នកកើតឆ្នាំ${dayKm} ថ្ងៃនេះ សំណាងរបស់អ្នកល្អខ្លាំងណាស់។ សូមរក្សាចិត្តឲ្យស្ងប់ ទទួលយកឱកាសល្អៗ ហើយចែករំលែកភាពរីករាយ ដល់មនុស្សជុំវិញខ្លួន។`],
    [`Your lucky color today is ${cen}. Wear it, or carry something ${cen} with you. Your best time is ${sayTime(dd.lucky.time)}. It is a good time for important plans.`,
      `ពណ៌សំណាងរបស់អ្នកថ្ងៃនេះ គឺពណ៌${ckm}។ សូមស្លៀកពាក់ពណ៌${ckm} ឬយករបស់ពណ៌${ckm}មួយ ជាប់ខ្លួន។ ពេលល្អបំផុតរបស់អ្នក គឺ${sayTimeKm(dd.lucky.time)}។ ជាពេលល្អ សម្រាប់ធ្វើរឿងសំខាន់ៗ។`],
    [`Your lucky direction today is the ${dd.lucky.direction.en.toLowerCase()}. When you start something new, face the ${dd.lucky.direction.en.toLowerCase()}, and walk forward with a calm and happy heart.`,
      `ទិសសំណាងរបស់អ្នកថ្ងៃនេះ គឺទិស${dd.lucky.direction.km}។ ពេលចាប់ផ្ដើមធ្វើអ្វីថ្មី សូមបែរមុខទៅទិស${dd.lucky.direction.km} ហើយបោះជំហានទៅមុខ ដោយចិត្តស្ងប់ និងរីករាយ។`],
    [`For lucky numbers: ${n0.d1}, ${n0.d2}, and ${n0.d3}. Comment your lucky number below, and let's say it again: ${n0.d1}, ${n0.d2}, ${n0.d3}!`,
      `សម្រាប់លេខសំណាង៖ លេខ ${n0.d1} លេខ ${n0.d2} និងលេខ ${n0.d3}។ សូមសរសេរលេខសំណាងរបស់អ្នក នៅក្នុងមតិយោបល់ ហើយតោះនិយាយម្ដងទៀត៖ ${n0.d1} ${n0.d2} ${n0.d3}!`],
    ["Make a small wish today, and take one kind step toward it. A peaceful heart helps good luck find its way to you.",
      "ថ្ងៃនេះ សូមប្រាថ្នាអ្វីមួយតូចៗ ហើយធ្វើរឿងល្អមួយ ដើម្បីឈានទៅរកក្ដីប្រាថ្នានោះ។ ចិត្តដែលស្ងប់ នឹងជួយនាំសំណាងល្អ មករកអ្នក។"],
    ["That's your Chinese zodiac fortune for today. See all twelve signs and your lucky numbers at mybirthsign dot com. Follow us for tomorrow's fortune. Have a lucky day!",
      "នេះគឺជាជោគជតារាសីចិន សម្រាប់ថ្ងៃនេះ។ អ្នកអាចមើលរាសីទាំង 12 និងលេខសំណាង នៅលើគេហទំព័រ mybirthsign.com។ សូមតាមដានយើង សម្រាប់ជោគជតាថ្ងៃស្អែក។ សូមឲ្យអ្នកមានសំណាងល្អ!"],
  ];
  const mmss = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
  // the day in a few words, and general advice for each rating (the long videos, and the general line of the horoscope below)
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
  // ---- today's horoscope for every sign (the owner's request, 31/10/2026: "give the horoscope and prediction"): general
  // luck, love, work, money, what to be careful about, and advice. It is the website's own written fortune for this date
  // when that exists (data/daily/<date>.json, written a day ahead); otherwise the website's standard lines for the sign's
  // rating (P.COPY = scripts/content/early-card-copy.mjs, chosen exactly as the Studio's early share cards choose them),
  // with the general line from ADVICE above. The videos speak first sentences, so every line fits its 10-second clip.
  const firstSent = (t, lang) => { const m = String(t || "").trim().match(lang === "km" ? /^[^។!?]+[។!?]?/ : /^[^.!?]+[.!?]?/); return m ? m[0].trim() : ""; };
  const HORO = Object.fromEntries(F.signs.map((sg, i) => {
    const a = sg.animal, t = sg.tier, rank = F.signs.filter((x) => x.tier === t).indexOf(sg), C = P && P.COPY;
    const st = same && data ? ((data.signs || []).find((x) => x.animal === a) || {}).text : null;
    const ad = ADVICE[t][(dayNo + i) % ADVICE[t].length], H = { site: !!(st && st.en && st.km) };
    ["en", "km"].forEach((lang, li) => {
      const r = { general: ad[li], love: C ? C[lang].love[t][(dayNo + i) % 2] : "", career: C ? C[lang].career[t][(dayNo + i + 1) % 2] : "",
        money: C ? C[lang].money[t][(dayNo + rank) % 2] : "", careful: "", advice: C ? C[lang].advice[t][(dayNo + rank + 1) % 2] : "" };
      const w = H.site ? st[lang] : {}, fix = (x) => (lang === "km" && x ? addYear(String(x).trim()) : String(x || "").trim());
      H[lang] = { general: fix(w.fortune || r.general), love: fix(w.love || r.love), career: fix(w.career || r.career), money: fix(w.money || r.money), careful: fix(w.careful || r.careful), advice: fix(w.advice || r.advice) };
      H[lang + "Std"] = r;   // the standard lines: a shorter fallback when the site's sentence is too long for a clip
    });
    return [a, H];
  }));
  const HLBL = { general: ["", ""], love: ["Love:", "ស្នេហា៖"], career: ["Work:", "ការងារ៖"], money: ["Money:", "លុយកាក់៖"], careful: ["Be careful:", "ប្រយ័ត្ន៖"], advice: ["Advice:", "ដំបូន្មាន៖"] };
  const fitsLang = [(t) => enSpoken(t) <= 23, (t) => [...kmFlow(t)].length <= 125];
  // one part of a sign's horoscope as a spoken line (English, Khmer): the whole text if it fits the clip, else its first
  // sentence, else the standard line; English and Khmer always take the same choice, so both voices say the same thing
  const horoSay = (a, k, pre = HLBL[k]) => {
    const H = HORO[a], c = (lang, li) => [H[lang][k], firstSent(H[lang][k], lang), H[lang + "Std"][k], firstSent(H[lang + "Std"][k], lang)]
      .map((x) => (x ? (pre[li] ? `${pre[li]} ${x}` : x) : ""));
    const e = c("en", 0), m = c("km", 1), j = e.findIndex((x, i) => x && m[i] && fitsLang[0](x) && fitsLang[1](m[i]));
    return j >= 0 ? [e[j], m[j]] : [e.filter(Boolean).at(-1) || "", m.filter(Boolean).at(-1) || ""];
  };
  // several parts in one clip: the first sentence of every part that still fits in both languages, in this order, then
  // the ending (a part that is too long today is left out; the text section below always has all of them)
  const horoPack = (a, keys, end = ["", ""]) => {
    const H = HORO[a], parts = [[], []];
    const one = (k, lang, li, std = "") => { const x = firstSent(H[lang + std][k], lang); return x ? (HLBL[k][li] ? `${HLBL[k][li]} ${x}` : x) : ""; };
    const join = (li, extra) => [...parts[li], extra, end[li]].filter(Boolean).join(" ");
    for (const k of keys) {
      const e = one(k, "en", 0), m = one(k, "km", 1);
      if (e && m && fitsLang[0](join(0, e)) && fitsLang[1](join(1, m))) { parts[0].push(e); parts[1].push(m); }
    }
    if (!parts[0].length) {   // nothing fits today: the first part that fits as a standard line, else the shortest one
      const over = ([e, m]) => Math.max(enSpoken(join(0, e)) / 23, [...kmFlow(join(1, m))].length / 125);
      const c = keys.flatMap((k) => ["", "Std"].map((std) => [one(k, "en", 0, std), one(k, "km", 1, std)])).filter(([e, m]) => e && m);
      const best = c.find(([e, m]) => fitsLang[0](join(0, e)) && fitsLang[1](join(1, m))) || c.sort((x, y) => over(x) - over(y))[0] || ["", ""];
      parts[0].push(best[0]); parts[1].push(best[1]);
    }
    return [join(0, ""), join(1, "")];
  };
  // ---- luckiest-animal videos: the "60s" video (8 scenes, 80 seconds; Facebook, TikTok) and 180 seconds (YouTube), 10-second scenes
  const PI = P && P.INFO[day], PK = P && P.KM_INFO[day];
  const traitsEn = PI ? PI.traits.replace(/^(\w)/, (m) => m.toLowerCase()) : "";
  const weakEn = PI ? PI.weaknesses.replace(/^(\w)/, (m) => m.toLowerCase()).replace(/\.$/, "") : "";
  const SC = {
    moon: [nine[0][0], nine[0][1], ...vo90[0]],
    appear: [nine[1][0], nine[1][1], ...vo90[1]],
    meaning: [nine[2][0], nine[2][1], ...vo90[2]],
    personality: [`The ${day}'s character`, `Close-up of the ${dl} on its glowing lotus, its face showing a ${S9.mood} expression. Soft golden light circles it, and ${DV(28, HALO)}. Gentle slow orbit around the ${dl}.`,
      `People born in the Year of the ${day} are ${traitsEn}`, PK ? `អ្នកកើតឆ្នាំ${dayKm} ជាមនុស្ស${PK.traits.replace(/ឱនភាព/g, "ឱ្យតម្លៃលើភាព")}` : ""],
    magic: [nine[3][0], nine[3][1], ...vo90[3]],
    love: ["Love and family", `${DV(29, LOVE_OBJ(dl))} It smiles warmly. Gentle, loving mood. Slow push-in.`,
      ...horoSay(day, "love", ["Love and family today:", "ស្នេហា និងគ្រួសារថ្ងៃនេះ៖"])],
    work: ["Work and study", `${DV(30, WORK_OBJ(dl))} Determined, hopeful mood. Smooth camera move following it.`,
      ...horoSay(day, "career", ["Work today:", "ការងារថ្ងៃនេះ៖"])],
    money: ["Money", `${DV(32, MONEY_OBJ(dl))} Warm, calm light. Slow push-in.`,
      ...horoSay(day, "money", ["Money today:", "លុយកាក់ថ្ងៃនេះ៖"])],
    colortime: [nine[4][0], nine[4][1], ...vo90[4]],
    color: ["Lucky color", `${col180.scene} Warm ${cen} and gold light. Slow orbit.`,
      `Your lucky color today is ${cen}. Wear something ${cen}, or carry a small ${cen} item with you, to keep good luck close.`,
      `ពណ៌សំណាងរបស់អ្នកថ្ងៃនេះ គឺពណ៌${ckm}។ សូមស្លៀកពាក់ពណ៌${ckm} ឬយករបស់ពណ៌${ckm}មួយ ជាប់ខ្លួន ដើម្បីរក្សាសំណាងល្អ ឲ្យនៅជិតអ្នក។`],
    time: ["Best time", `${tim180.scene} Stars and lanterns move gently in the sky. Calm, magical mood. Slow push-in.`,
      `Your best time today is ${sayTime(dd.lucky.time)}. It is a good time for important plans, meetings, or a fresh start.`,
      `ពេលល្អបំផុតរបស់អ្នកថ្ងៃនេះ គឺ${sayTimeKm(dd.lucky.time)}។ ជាពេលល្អ សម្រាប់ផែនការសំខាន់ៗ ការជួបជុំ ឬការចាប់ផ្ដើមថ្មី។`],
    direction: [nine[5][0], nine[5][1], ...vo90[5]],
    numbers: [nine[6][0], nine[6][1], ...vo90[6]],
    luckydays: ["Lucky days of the week", `${DV(33, SEVEN_OBJ(dl))} Slow pan along the row.`,
      PI ? `The ${day}'s lucky days of the week are ${PI.luckyDays.join(" and ")}. Keep them in mind for plans that matter to you.` : "",
      PK ? `ថ្ងៃសំណាងប្រចាំសប្ដាហ៍ របស់ឆ្នាំ${dayKm} គឺ${PK.luckyDays.join(" និង")}។ សូមចងចាំថ្ងៃទាំងនេះ សម្រាប់ផែនការសំខាន់ៗ របស់អ្នក។` : ""],
    reminder: ["A gentle reminder", `${DV(34, REFLECT_OBJ(dl))} Thoughtful, peaceful mood. Slow, gentle camera move.`,
      `A gentle reminder: people born in the Year of the ${day} ${weakEn}. Today, stay balanced, and listen to your heart.`,
      PK ? `សូមរំលឹកបន្តិច៖ អ្នកកើតឆ្នាំ${dayKm} ${PK.weaknesses} ថ្ងៃនេះ សូមរក្សាតុល្យភាព និងស្ដាប់ចិត្តខ្លួនឯង។` : ""],
    wish: [nine[7][0], nine[7][1], ...vo90[7]],
    thanks: ["Thank you", `${DV(35, THANKS_OBJ(dl))} Warm, grateful mood. Slow pull-back.`,
      "Before the day ends, take a quiet moment to say thank you. Thank the people who help you, and thank yourself for trying your best.",
      "មុនថ្ងៃនេះបញ្ចប់ សូមចំណាយពេលស្ងាត់មួយភ្លែត ដើម្បីអរគុណ។ អរគុណមនុស្សដែលជួយអ្នក ហើយអរគុណខ្លួនឯង ដែលបានព្យាយាមអស់ពីសមត្ថភាព។"],
    recap: ["Today's luck in one look", `The ${dl} sits on its glowing lotus while ${col180.one}, ${tim180.one}, ${dir180.one} and three glowing golden orbs circle slowly around it. Magical, cheerful mood. Slow orbit.`,
      `Let's remember today's luck. Lucky color: ${cen}. Best time: ${sayTime(dd.lucky.time)}. Lucky direction: ${dir}. Lucky numbers: ${n0.d1}, ${n0.d2}, and ${n0.d3}.`,
      `សូមចងចាំសំណាងថ្ងៃនេះ។ ពណ៌សំណាង៖ ពណ៌${ckm}។ ពេលល្អ៖ ${sayTimeKm(dd.lucky.time)}។ ទិសសំណាង៖ ទិស${dirKm}។ លេខសំណាង៖ លេខ ${n0.d1} លេខ ${n0.d2} និងលេខ ${n0.d3}។`],
    end: [nine[8][0], nine[8][1], ...vo90[8]],
    // Chanda on camera (5th item true = she speaks to camera with lip-sync); the animal beside her only acts
    tip: ["Chanda's tip – Chanda on camera", `${cap(HOST_LOOK)}, stands on the moonlit temple terrace beside the lotus pond, facing the camera and speaking warmly to the viewer with natural lip movements and small, friendly hand gestures. Beside her, ${LOOK[day]} sits on its glowing lotus pedestal and acts without speaking: it listens, nods happily and ${POSE[day]}, its mouth staying closed the whole time. Medium shot, gentle push-in toward Chanda. Chanda is the saved Flow character @Chanda; the ${dl} is the saved Flow character ${FLOW_NAME(day)}.`,
      `My tip for the Year of the ${day}: say yes to good chances, and lead with confidence.${careful.length ? ` ${list(careful)} friends, take it easy today.` : ""}`,
      `ដំបូន្មានរបស់ខ្ញុំ សម្រាប់ឆ្នាំ${dayKm}៖ សូមទទួលយកឱកាសល្អៗ និងធ្វើអ្វីៗដោយទំនុកចិត្ត។${careful.length ? ` ចំណែក${kmList(careful.map((a) => `ឆ្នាំ${km(a)}`))} គួរសម្រាកឲ្យស្រួលខ្លួនថ្ងៃនេះ។` : ""}`, true],
    endHost: ["Goodbye – Chanda on camera", `Two-shot of Chanda and the ${dl} together on the moonlit temple terrace, both clearly in frame. ${cap(HOST_LOOK)}, faces the camera, smiling and speaking to the viewer with natural lip movements. As she talks she opens her palm, and a small golden lotus blooms in her hand, glows brighter and bursts into thousands of golden sparkles that swirl in a slow magical spiral around her and ${LOOK[day]}, which sits on its glowing lotus pedestal right beside her. The sparkles make the ${dl}'s golden details shine; it looks up at them in wonder, then waves its paw goodbye together with Chanda, without speaking, its mouth closed. Behind them lanterns rise over the glowing pond and soft lotus-shaped golden fireworks open in the sky. The camera slowly pulls back for a warm final view, with open sky at the top for a title. Chanda is the saved Flow character @Chanda; the ${dl} is the saved Flow character ${FLOW_NAME(day)}.`,
      "That's your Chinese zodiac fortune for today. Follow MyBirthSign for your fortune every day, and see all twelve signs at mybirthsign dot com. Have a lucky day!",
      "នេះគឺជាជោគជតារាសីចិន សម្រាប់ថ្ងៃនេះ។ សូមតាមដាន MyBirthSign ដើម្បីដឹងជោគជតារបស់អ្នករៀងរាល់ថ្ងៃ ហើយមើលរាសីទាំង 12 នៅ mybirthsign.com។ សូមឲ្យអ្នកមានសំណាងល្អ!", true],
    // ---- 60-second video (8 clips of 10 s): short voice lines that fit each clip, a new camera idea in every scene,
    // the animal acting in every scene, and Chanda on camera only at the start and the end
    rev60: [`The ${day} appears`, `${DV(25, APPEAR)} ${alive(day)} ${lockAnimal(day)}`,
      ...fuller(V(3, 2, [
        [`${LD.split(", ")[0]}, ${dateEn}: a ${dd.label.en} for everyone born in the Year of the ${day}!`, `${wdKm} ${dateKm} ជា${dd.label.km} សម្រាប់អ្នកកើតឆ្នាំ${dayKm}!`],
        [`It's ${LD.split(", ")[0]}, ${dateEn}, and the ${day} has a ${dd.label.en}!`, `ថ្ងៃនេះ ${wdKm} ${dateKm} ឆ្នាំ${dayKm}មាន${dd.label.km}!`],
        [`${dateEn} belongs to the ${day}. Year of the ${day}, this ${dd.label.en} is yours!`, `${dateKm} ជាថ្ងៃរបស់ឆ្នាំ${dayKm}។ អ្នកកើតឆ្នាំ${dayKm} ${dd.label.km}នេះ ជារបស់អ្នក!`]]), rot(1, [
        elLine,
        ["Stay with me for your lucky color, time and numbers.", "សូមមើលបន្ត ដើម្បីដឹងពណ៌ ពេលវេលា និងលេខសំណាងរបស់អ្នក។"],
        ["Let's see what this lucky day brings you.", "តោះ មកមើលថា ថ្ងៃសំណាងនេះ នាំអ្វីមកឲ្យអ្នក។"]]).concat([
        [`A ${DEL.yy} ${DEL.el} day!`, `ថ្ងៃធាតុ${DEL.km}!`], ["Stay with me!", "សូមមើលបន្ត!"]]))],
    mean60: [`What the ${day} means`, `Low-angle hero shot: the ${dl} looks up at the full moon, and ${S9.vis}. ${cap(S9.mood)} mood. Slow upward camera tilt. ${alive(day)} ${lockAnimal(day)}`,
      ...fuller([S9.en, S9.km], rot(2, [
        [`Born in the Year of the ${day}? That strength is yours today.`, `អ្នកកើតឆ្នាំ${dayKm}? កម្លាំងនោះ ជារបស់អ្នកថ្ងៃនេះ។`],
        ["Let that spirit guide you today.", "សូមឲ្យស្មារតីនោះ ដឹកនាំអ្នកថ្ងៃនេះ។"],
        ["Keep that energy close all day.", "សូមរក្សាថាមពលនោះ ជាប់ជាមួយអ្នកពេញមួយថ្ងៃ។"]]).concat([
        ["Let it guide you.", "សូមឲ្យវាដឹកនាំអ្នក។"], ["Shine today!", "ថ្ងៃនេះ សូមភ្លឺស្វាង!"]]))],
    magic60: ["The magical moment", `The ${dl} ${POSE[day]}. ${DV(26, LAND)} ${alive(day)} ${lockAnimal(day)}`,
      ...fuller(horoPack(day, ["general", "love", "career", "money"]), rot(3, [
        [`This ${DEL.el} day adds ${DEL.q} to everything you do.`, `ថ្ងៃធាតុ${DEL.km}នេះ បន្ថែម${DEL.qKm} ដល់អ្វីៗដែលអ្នកធ្វើ។`],
        [`Your helper sign is the ${helper}: team up with one.`, `រាសីជំនួយរបស់អ្នក គឺឆ្នាំ${km(helper)}៖ សូមសហការជាមួយគេ។`],
        ["Trust yourself, and act with a kind heart.", "សូមជឿលើខ្លួនឯង ហើយធ្វើអ្វីៗដោយចិត្តល្អ។"]]).concat([
        [`A ${DEL.el} day for ${DEL.q}.`, `ថ្ងៃធាតុ${DEL.km} នៃ${DEL.qKm}។`], ["Trust yourself.", "សូមជឿលើខ្លួនឯង។"]]))],
    color60: ["Lucky color", `${col60.scene} ${DV(36, CAM)} Warm ${cen} and gold light. ${alive(day)} ${lockAnimal(day)}`,
      ...fuller(V(3, 6, [
        [`Your lucky color today is ${cen}. Wear it, or carry something ${cen} with you.`, `ពណ៌សំណាងថ្ងៃនេះ គឺពណ៌${ckm}។ សូមស្លៀក ឬយករបស់ពណ៌${ckm} ជាប់ខ្លួន។`],
        [`Today's lucky color is ${cen}. A ${cen} scarf, bag or bracelet keeps it close.`, `ពណ៌សំណាងថ្ងៃនេះ គឺពណ៌${ckm}។ កន្សែង កាបូប ឬខ្សែដៃពណ៌${ckm} នាំសំណាងមកជិតអ្នក។`],
        [`Wear a touch of ${cen} today: it's your lucky color.`, `ថ្ងៃនេះ សូមពាក់អ្វីមួយពណ៌${ckm}៖ វាជាពណ៌សំណាងរបស់អ្នក។`]]), rot(4, [
        ["Even something small, like a ring or a phone case, counts.", "សូម្បីតែរបស់តូចមួយ ដូចជាចិញ្ចៀន ឬស្រោមទូរស័ព្ទ ក៏បានដែរ។"],
        ["Let it remind you to smile and stay confident.", "សូមឲ្យវារំលឹកអ្នក ឲ្យញញឹម និងមានទំនុកចិត្ត។"],
        ["It brings calm and confidence to your day.", "វានាំភាពស្ងប់ និងទំនុកចិត្ត មកថ្ងៃរបស់អ្នក។"]]).concat([
        ["Even a small touch counts.", "របស់តូចមួយ ក៏បានដែរ។"]]))],
    timedir60: ["Best time and lucky direction", `${dir60.scene} Nearby, ${tim60.short}. ${DV(37, CAM, 3)} ${alive(day)} ${lockAnimal(day)}`,
      ...fuller(V(2, 8, [
        [`Your best time is ${sayTime(dd.lucky.time)}, and your lucky direction is the ${dir}.`, `ពេលល្អបំផុតគឺ${sayTimeKm(dd.lucky.time)} ហើយទិសសំណាង គឺទិស${dirKm}។`],
        [`Lucky direction: the ${dir}. Best time: ${sayTime(dd.lucky.time)}.`, `ទិសសំណាង៖ ទិស${dirKm}។ ពេលល្អបំផុត៖ ${sayTimeKm(dd.lucky.time)}។`]]), rot(5, [
        ["Plan your most important task for that time.", "សូមធ្វើការងារសំខាន់បំផុតរបស់អ្នក ក្នុងពេលនោះ។"],
        ["Face that way when you make a wish.", "សូមបែរមុខទៅទិសនោះ ពេលអធិដ្ឋាន។"],
        ["Use that time for calls and big decisions.", "សូមប្រើពេលនោះ សម្រាប់ការទូរស័ព្ទ និងការសម្រេចចិត្តធំៗ។"]]).concat([
        ["Plan around it.", "សូមរៀបចំផែនការតាមនោះ។"]]))],
    // the lucky-numbers line stays the same every day; only the picture changes
    num60: ["Lucky numbers", `${V(4, 9, [
        `Wide, symmetrical front shot: a huge glowing golden wheel rises out of the lotus pond in front of the temple, spins with beams of golden light, then slows to a gentle shining turn. The ${dl} bounces excitedly in front of it and glances back at the camera, delighted.`,
        `Three glowing golden orbs rise from the pond one after another and hover in a row in front of the ${dl}, each one brightening as it appears; the ${dl} nudges the nearest one gently and looks at the camera, delighted.`,
        `Thousands of golden fireflies gather in the sky above the temple and swirl into three bright clusters of light, one after another, while the ${dl} watches from the temple steps, delighted.`,
        `Three golden lanterns float slowly down from the sky and land on the water in front of the ${dl}, glowing brighter one by one; it leans close and looks back at the camera, delighted.`])} Open space in the middle and lower part of the frame for number captions. Slow push-in. ${alive(day)} ${lockAnimal(day)}`,
      `Your lucky numbers: ${n0.d1}, ${n0.d2}, and ${n0.d3}. Comment your sign below, and save this video!`,
      `លេខសំណាង៖ ${n0.d1} ${n0.d2} និង ${n0.d3}។ សូមសរសេររាសីរបស់អ្នក ក្នុងមតិយោបល់ ហើយរក្សាទុកវីដេអូនេះ!`],
    end60: ["Goodbye – Chanda on camera", `Two-shot of Chanda and the ${dl} together on the moonlit temple terrace, both clearly in frame. ${cap(HOST_LOOK)}, faces the camera, smiling and speaking to the viewer with natural lip movements. ${DV(10, HOST_MAGIC(`${LOOK[day]}, right beside her`))} The ${dl} looks up at the magic in wonder and reacts with happy, lively body language, then waves goodbye together with Chanda without speaking, its mouth closed. ${cap(DV(31, FINALE_SKY, 1))}. Crane shot slowly pulling back and rising for a warm final view, with open sky at the top for a title. ${LOCK_HOST} ${lockAnimal(day)}`,
      ...V(3, 11, [
        [`Follow MyBirthSign for your fortune every day, and share this with a friend born in the Year of the ${day}!`, `សូមតាមដាន MyBirthSign រៀងរាល់ថ្ងៃ ហើយចែករំលែកទៅមិត្តដែលកើតឆ្នាំ${dayKm}!`],
        [`Send this to a friend born in the Year of the ${day}, and follow MyBirthSign for tomorrow's fortune!`, `ផ្ញើវីដេអូនេះទៅមិត្តដែលកើតឆ្នាំ${dayKm} ហើយតាមដាន MyBirthSign សម្រាប់ជោគជតាថ្ងៃស្អែក!`],
        ["Come back tomorrow for a brand-new fortune. Follow MyBirthSign, and have a lucky day!", "ថ្ងៃស្អែក សូមត្រឡប់មកមើលជោគជតាថ្មី។ តាមដាន MyBirthSign ហើយសូមឲ្យមានសំណាងល្អ!"]]), true],
  };
  // ---- long YouTube video: the luckiest animal, then all 12 signs (two 10-second clips each), then a short closing
  const LOOKTIER = { great: "bursting with a bright golden aura", good: "glowing with a warm golden light", ordinary: "calm and content, softly lit by the moon", caution: "resting peacefully inside a soft protective bubble of golden light" };
  const signScenes = F.signs.flatMap((sg, si) => {
    const a = sg.animal, al = a.toLowerCase(), t = sg.tier, L = sg.lucky, nn = nums.find((x) => x.a === a);
    const act = t === "great" || t === "good" ? POSE[a] : t === "ordinary" ? DV(40, CALM_ACT, si) : DV(41, REST_ACT, si);
    return [
      [`${a} – ${sg.label.en}`, `${cap(LOOK[a])} ${DV(42, PLACE, si)}, ${LOOKTIER[t]}. ${cap(DV(43, COLOR_OBJ(al, L.color.en), si).around)}. Slow push-in; it is the saved Flow character ${FLOW_NAME(a)}.`,
        `Year of the ${a}. Today is ${DAYPH[t][0]} for you. Your lucky color is ${L.color.en}, and your best time is ${sayTime(L.time)}.`,
        `ឆ្នាំ${sg.nameKm}។ ថ្ងៃនេះ ជា${DAYPH[t][1]} សម្រាប់អ្នក។ ពណ៌សំណាងរបស់អ្នក គឺពណ៌${L.color.km} ហើយពេលល្អបំផុត គឺ${sayTimeKm(L.time)}។`],
      [`${a} – horoscope`, `The ${al} ${act}. ${t === "caution" ? "Peaceful and safe, not sad." : "Magical and joyful."} Camera follows it smoothly.`,
        ...horoPack(a, ["love", "career", "money"], [`Lucky direction: ${L.direction.en.toLowerCase()}.${nn ? ` Lucky numbers: ${nn.d2} and ${nn.d3}.` : ""}`,
          `ទិសសំណាង៖ ទិស${L.direction.km}។${nn ? ` លេខសំណាង៖ ${nn.d2} និង ${nn.d3}។` : ""}`])],
    ];
  });
  const overview = ["Today's lucky signs", `The twelve golden-armored zodiac guardians ${DV(54, GROUP12, 1)}. Three of them shine brighter than the others with a golden aura. Slow, wide circling camera.`,
    `Today's luckiest signs are the ${list(lucky)}.${careful.length ? ` ${list(careful)}, take it easy today.` : ""} Find your own sign in the chapters below.`,
    `ឆ្នាំដែលមានសំណាងល្អជាងគេថ្ងៃនេះ គឺ${kmList(lucky.map((a) => `ឆ្នាំ${km(a)}`))}។${careful.length ? ` ចំណែក${kmList(careful.map((a) => `ឆ្នាំ${km(a)}`))} គួរសម្រាកឲ្យស្រួលខ្លួន។` : ""} សូមរករាសីរបស់អ្នក នៅក្នុងជំពូកខាងក្រោម។`];
  const longScenes = [SC.moon, SC.appear, SC.meaning, overview, ...signScenes, SC.wish, SC.thanks, SC.end];
  const longChapters = [["0:00", "Introduction"], ...F.signs.map((sg, i) => [mmss((4 + i * 2) * 10), `${sg.animal} (${sg.nameKm}) – ${sg.label.en}`]), [mmss((4 + 24) * 10), "Closing"]];
  const VIDEOS = [
    { id: "60s", name: "60-second video – Facebook & TikTok (8 scenes, 80 seconds)", secs: 80, keys: ["appear", "rev60", "mean60", "magic60", "color60", "timedir60", "num60", "end60"] },
    { id: "180s", name: "180-second video – YouTube", secs: 180, keys: ["moon", "appear", "meaning", "personality", "magic", "love", "work", "money", "color", "time", "direction", "numbers", "luckydays", "reminder", "wish", "thanks", "recap", "end"] },
  ].map((v) => ({ ...v, scenes: v.keys.map((k) => SC[k]) }));
  VIDEOS.push({ id: "long", name: `Long YouTube video – all 12 signs (about ${Math.round(longScenes.length * 10 / 60)} minutes)`, secs: longScenes.length * 10, scenes: longScenes, chapters: longChapters,
    intro: `A long YouTube video (${mmss(longScenes.length * 10)}): today's luckiest animal, an overview, then all 12 signs in order (two 10-second clips each), then a short closing. Lucky numbers are given only for today's lucky signs. Add Chanda and the 12 saved characters as ingredients (@Rat, @Ox … @Pig; each sign's clips name its own character). Chanda opens the video on camera and narrates the rest off screen; the animals never speak. Set the clip length in Flow to 10 seconds. For each scene, press "Copy + English voice" or "Copy + Khmer voice". Put the clips in order 1 to ${longScenes.length}.` });
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
    { name: ["Phleu", "ភ្លឺ"], kind: ["firefly", "សត្វអំពិលអំពែក"], he: "she", look: "Phleu, a tiny, lifelike magical glowing firefly with bright, expressive eyes, a soft golden-green glow, delicate translucent wings and a tiny pink-and-gold flower crown", arrive: ["flew down", "ហោះចុះមក"], move: "flying" },
    { name: ["Dara", "តារា"], kind: ["little bird", "កូនបក្សីតូច"], he: "she", look: "Dara, a tiny, lifelike magical blue-and-gold bird with bright, expressive eyes, soft round feathers and a little golden crest", arrive: ["flew down", "ហោះចុះមក"], move: "flying" },
    { name: ["Sovann", "សុវណ្ណ"], kind: ["baby elephant", "កូនដំរីតូច"], he: "he", look: "Sovann, a tiny, lifelike magical baby elephant with bright, expressive eyes, soft grey-pink skin, big floppy ears and a little golden headpiece", arrive: ["came trotting over", "ដើរតម្រង់មក"], move: "trotting" },
    { name: ["Pich", "ពេជ្រ"], kind: ["butterfly", "មេអំបៅតូច"], he: "she", look: "Pich, a tiny, lifelike magical butterfly with bright, expressive eyes and shimmering pink-and-gold wings that leave a trail of glitter", arrive: ["fluttered down", "ហើរចុះមក"], move: "fluttering" },
    { name: ["Kong", "គង់"], kind: ["little frog", "កង្កែបតូច"], he: "he", look: "Kong, a tiny, lifelike magical green-and-gold frog with bright, expressive eyes, a wide happy smile and a little lotus-leaf hat", arrive: ["came hopping over", "លោតតម្រង់មក"], move: "hopping" },
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
  const TREASURE = ["a small lantern and a compass", "a silk ribbon and a golden arrow", "a lotus flower and a star map", "a paper parasol and a little boat",
    "a butterfly and a glowing footprint", "a gemstone and a kite", "a flower garland and a winding path"];
  const GOOD_DEED = ["gently helps a little bird back into its nest", "gently guides a lost duckling back to its mother by the pond",
    "gently lifts a fallen lotus flower back onto the water", "gently helps a small turtle that is stuck on its back turn over and walk to the water",
    "gently pushes a stray ball back to a group of happy village children", "gently shelters a tiny kitten from the morning dew under a big leaf",
    "gently clears fallen branches from a narrow village path so others can pass"];
  const hn = H.name[0], hk = H.name[1], She = H.he === "she" ? "She" : "He", she = H.he;
  const storyTitle = [`The Golden ${day} and ${Q.title[0]}`, `${kA}មាស និង${Q.title[1]}`];
  const SS = (t, prompt, en, kmL) => [t, `${prompt} ${hn} the ${H.kind[0]} matches ${H.he === "she" ? "her" : "his"} reference image; the ${dl} is the saved Flow character ${FLOW_NAME(day)}.`, en, kmL];
  const storyScenes = [
    ["Once upon a time", ...Q.intro],
    [`${cap(Q.title[0].replace(/^the /, ""))} in trouble`, ...Q.problem],
    SS(`The ${day} wakes up`, `In the middle of the pond, a golden lotus opens petal by petal, revealing ${LOOK[day]}, who wakes up, stretches and blinks its bright, expressive eyes in the morning light. Gentle push-in.`,
      `In the middle of the pond, a golden lotus opened, and out came a little golden ${dl}. Today was ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day, and the ${dl} felt something special.`,
      `នៅកណ្ដាលស្រះ ផ្កាឈូកមាសមួយបានរីក ហើយមាន${kA}មាសតូចមួយ ចេញមក។ ថ្ងៃនេះជាថ្ងៃឆ្នាំ${dayKm} ហើយ${kA}មានអារម្មណ៍ពិសេសណាស់។`),
    SS(`${hn} the ${H.kind[0]}`, `${cap(H.look)} arrives ${H.move} and stops right in front of the ${dl}, smiling. The ${dl} looks back with wide, curious eyes. Close two-shot.`,
      `A ${H.kind[0]} named ${hn} ${H.arrive[0]}. "Little ${day}," ${she} said, "only you can ${Q.mission[0]}. Today is your lucky day!"`,
      `${H.kind[1]}មួយ ឈ្មោះ${hk} ${H.arrive[1]}។ ${hk}និយាយថា "${kA}តូចអើយ មានតែអ្នកទេ ដែលអាច${Q.mission[1]}។ ថ្ងៃនេះ ជាថ្ងៃសំណាងរបស់អ្នក!"`),
    SS("Chosen by the moon", `The ${dl} looks up at the pale morning moon still in the sky, and ${S9.vis}. ${hn} watches happily. ${cap(S9.mood)} mood. Slow upward tilt.`,
      `${S9.en} ${hn} smiled. That was exactly why the moon had chosen it.`,
      `${S9.km} ${hk}ញញឹម។ នេះហើយ ជាហេតុដែលព្រះចន្ទ បានជ្រើសរើសវា។`),
    SS("Three lucky treasures", `Three glowing golden symbols appear in the air as ${hn} points to them: ${DV(44, TREASURE)} and a bell. The ${dl} watches with excitement. Magical sparkles. Slow orbit.`,
      `To ${Q.goal[0]}, the little hero needed three lucky treasures: its lucky color, its lucky path, and its lucky numbers.`,
      `ដើម្បី${Q.goal[1]} វីរបុរសតូច ត្រូវការរតនសម្បត្តិសំណាងបី៖ ពណ៌សំណាង ផ្លូវសំណាង និងលេខសំណាង។`),
    SS("The journey begins", `The ${dl} ${POSE[day]}, then lands on the far bank of the pond, where ${hn} joins it. Dynamic camera following the movement.`,
      `"Let's go!" said the ${dl}, and it set off on its adventure, with ${hn} right by its side.`,
      `${kA}និយាយថា "តោះទៅ!" ហើយវាក៏ចេញដំណើរផ្សងព្រេង ដោយមាន${hk} នៅក្បែរខ្លួនជានិច្ច។`),
    SS("A good heart", `The ${dl} walks through a small Khmer village in the morning, wooden houses on stilts and palm trees around, and ${DV(45, GOOD_DEED)} while ${hn} watches. Warm sunlight. Smooth tracking shot.`,
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
    ["Is it too late?", `Night at the lotus pond beside the temple. The full moon is rising, and small golden-armored zodiac animals ${DV(56, ["wait anxiously around the water",
      "wait anxiously on the temple steps, holding unlit lanterns", "wait anxiously on the causeway, looking down the empty path", "wait anxiously under the great banyan tree",
      "wait anxiously beside the dark, empty festival stage", "wait anxiously on the lotus leaves, looking up at the rising moon", "wait anxiously at the temple gate, peering into the night"])}. Quiet, suspenseful mood. Slow pan.`,
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
    intro: `"${storyTitle[0]}" (${storyTitle[1]}): an original fairy tale (${mmss(storyScenes.length * 10)}) starring today's luckiest animal. A new story every day: today the golden ${dl} and ${hn} the ${H.kind[0]} must ${Q.mission[0]} before the full-moon festival. Today's lucky color, direction, best time, lucky numbers and lucky days are part of the story. Make the picture of ${hn} once (prompt below) and add it, Chanda and the ${day} picture as ingredients in Flow. Chanda opens the story on camera and narrates the rest off screen; ${hn} and the animals never speak (their words are told by Chanda). ${storyScenes.length} clips of 10 seconds, in order 1 to ${storyScenes.length}.\n\n### Character prompt – ${hn} the ${H.kind[0]} (make once, keep it)\nCreate a photorealistic image of ${H.look}, as a small magical companion in a high-budget fantasy epic: realistic anatomy and textures with a soft warm magical glow, sitting on a glowing pink lotus by a still pond at night, a temple inspired by Angkor Wat and an enormous full moon behind, golden dust in the air. Cinematic lighting, beautiful depth of field, ultra-detailed. Square 1:1, full body visible, centered. No text, no letters, no watermark, no cartoon or plastic look.` });
  // ---- opening hooks: five truthful candidates per video, the strongest one opens the video
  const aDay = /^[AEIOU]/.test(day) ? "an" : "a";
  const clueEn = PI ? PI.traits.split(". ")[0].replace(/\.$/, "").toLowerCase() : "";
  const clueKm = PK ? PK.traits.split("។")[0] : "";
  const dateLineEn = `Today, ${LD}, is ${aDay} ${day} day.`;
  const dateLineKm = `ថ្ងៃនេះ ${wdKm} ទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]} គឺជាថ្ងៃឆ្នាំ${dayKm}។`;
  const HOOKS = {
    "60s": { win: V(5, 12, [0, 1, 2, 3, 4]), whys: ["Speaks straight to people of this sign and promises exactly what the video gives.", "Specific and true (only the day's animal has a Great Day), creates curiosity, and every viewer wants to know if it is their sign.", "A direct question that everyone wants answered, so they keep watching.", "A small guessing game keeps people watching until the answer.", "A real fact about the zodiac cycle that makes the video feel trustworthy."], list: [
      ["Identity", `Born in the Year of the ${day}? Today is a Great Day for you. Here's your lucky color, time, and numbers.`, `អ្នកកើតឆ្នាំ${dayKm}មែនទេ? ថ្ងៃនេះ ជាថ្ងៃល្អខ្លាំងសម្រាប់អ្នក។ មកមើលពណ៌ ពេលវេលា និងលេខសំណាងរបស់អ្នក។`],
      ["Curiosity", "Out of all twelve zodiac signs, only one has a Great Day today. Is it yours?", "ក្នុងចំណោមរាសីទាំង 12 មានតែមួយគត់ ដែលមានថ្ងៃល្អខ្លាំងនៅថ្ងៃនេះ។ តើជារាសីរបស់អ្នកឬទេ?"],
      ["Question", "Which zodiac animal is the luckiest today? Here's the answer, and what it means for you.", "តើឆ្នាំណា មានសំណាងជាងគេនៅថ្ងៃនេះ? នេះគឺជាចម្លើយ និងអត្ថន័យសម្រាប់អ្នក។"],
      ["Challenge", `Can you guess today's luckiest zodiac animal? Three clues: ${clueEn}.`, `ទាយមើល៖ តើឆ្នាំណា មានសំណាងជាងគេថ្ងៃនេះ? តម្រុយ៖ ${clueKm}។`],
      ["Fact", `Today is ${aDay} ${day} day, and in the twelve-day zodiac cycle, that makes the ${day} today's luckiest sign.`, `ថ្ងៃនេះជាថ្ងៃឆ្នាំ${dayKm} ហើយតាមវដ្ដដប់ពីរថ្ងៃ ឆ្នាំ${dayKm} គឺជារាសីដែលមានសំណាងជាងគេថ្ងៃនេះ។`],
    ] },
    "180s": { win: 0, why: "Speaks straight to the people this video is for, and promises exactly what the video delivers: lucky facts plus one honest reminder.", list: [
      ["Daily fortune", `Born in the Year of the ${day}? Here's your lucky color, best time, and numbers for today, plus one gentle reminder.`, `អ្នកកើតឆ្នាំ${dayKm}មែនទេ? នេះគឺពណ៌ ពេលវេលា និងលេខសំណាងរបស់អ្នកថ្ងៃនេះ ព្រមទាំងការរំលឹកមួយផង។`],
      ["Curiosity", "Out of all twelve zodiac signs, only one has a Great Day today. Is it yours?", "ក្នុងចំណោមរាសីទាំង 12 មានតែមួយគត់ ដែលមានថ្ងៃល្អខ្លាំងនៅថ្ងៃនេះ។ តើជារាសីរបស់អ្នកឬទេ?"],
      ["Personality", `If you were born in the Year of the ${day}, people may describe you as ${clueEn}. Today, that side of you shines.`, `បើអ្នកកើតឆ្នាំ${dayKm} មនុស្សជុំវិញខ្លួន ប្រហែលជាស្គាល់អ្នកថា ${clueKm}។ ថ្ងៃនេះ ចំណុចល្អនោះកំពុងភ្លឺ។`],
      ["Challenge", `Can you guess today's luckiest zodiac animal? Three clues: ${clueEn}.`, `ទាយមើល៖ តើឆ្នាំណា មានសំណាងជាងគេថ្ងៃនេះ? តម្រុយ៖ ${clueKm}។`],
      ["Symbol", `${S9.en.split(",")[0]}. Today, the ${day} has its Great Day.`, `ថ្ងៃនេះ ជាថ្ងៃល្អខ្លាំងរបស់ឆ្នាំ${dayKm}។ មកស្គាល់សំណាងរបស់វា។`],
    ] },
    long: { win: 0, why: "Every viewer has a sign in this video, so this gives everyone a reason to keep watching until their chapter.", list: [
      ["Curiosity", `${careful.length ? "Three signs are lucky today, and one should take it easy." : "Three signs are lucky today."} Where does your sign stand?`, `ថ្ងៃនេះ មានបីឆ្នាំដែលមានសំណាងល្អ${careful.length ? " និងមួយឆ្នាំដែលគួរសម្រាក" : ""}។ តើឆ្នាំរបស់អ្នក នៅត្រង់ណា?`],
      ["Question", "Which of the twelve zodiac signs is the luckiest today?", "តើរាសីណា ក្នុងចំណោមរាសីទាំង 12 មានសំណាងជាងគេថ្ងៃនេះ?"],
      ["Practical", "Your lucky color, best time, and direction for today, for all twelve signs, in about five minutes.", "ពណ៌ ពេលវេលា និងទិសសំណាងថ្ងៃនេះ សម្រាប់រាសីទាំង 12 ក្នុងរយៈពេលប្រហែលប្រាំនាទី។"],
      ["Identity", "Whatever your sign, today has a lucky color and a best time just for you.", "មិនថាអ្នកកើតឆ្នាំអ្វីទេ ថ្ងៃនេះមានពណ៌សំណាង និងពេលល្អ សម្រាប់អ្នក។"],
      ["Daily fortune", `Today is ${aDay} ${day} day. Here's what that means for every sign.`, `ថ្ងៃនេះជាថ្ងៃឆ្នាំ${dayKm}។ មកមើលថា វាមានន័យយ៉ាងណា សម្រាប់រាសីនីមួយៗ។`],
    ] },
    story: { win: 0, why: "Opens on the story's real question, which the ending answers, and the hero is today's luckiest animal.", list: [
      ["Story question", `Can one little golden ${dl} ${Q.mission[0]} before the full moon rises?`, `តើ${kA}មាសតូចមួយ អាច${Q.mission[1]} មុនព្រះចន្ទពេញវង់រះ បានទេ?`],
      ["Mystery", "On the night of the full moon, something at the temple went wrong. Only one little hero could fix it.", "នៅយប់ព្រះចន្ទពេញវង់ មានរឿងមួយមិនប្រក្រតី នៅឯប្រាសាទ។ មានតែវីរបុរសតូចម្នាក់ប៉ុណ្ណោះ ដែលអាចជួយបាន។"],
      ["Identity", `Born in the Year of the ${day}? This bedtime story is about you.`, `អ្នកកើតឆ្នាំ${dayKm}មែនទេ? រឿងនិទាននេះ គឺនិយាយអំពីអ្នក។`],
      ["Challenge", `Three lucky treasures. One hard challenge. One golden ${dl}. Can it make it in time?`, `រតនសម្បត្តិសំណាងបី។ ឧបសគ្គមួយ។ ${kA}មាសមួយ។ តើវាទាន់ពេលឬទេ?`],
      ["Practical", "Today's lucky color, direction, and numbers, told as a magical story.", "ពណ៌ ទិស និងលេខសំណាងថ្ងៃនេះ ក្នុងរឿងនិទានដ៏អស្ចារ្យមួយ។"],
    ] },
  };
  // the winning hook opens each video (first scene's voice), replacing slow openings
  const OPEN = {
    "60s": (h) => h[1].includes(day) ? [h[1], h[2]] : [`${h[1]} Today is ${aDay} ${day} day!`, `${h[2]} ថ្ងៃនេះ ជាថ្ងៃឆ្នាំ${dayKm}!`],   // name the day animal unless the hook already does
    "180s": (h) => [h[1], h[2]],
    long: (h) => [h[1], h[2]],
    story: (h) => [`${h[1]} Once upon a time, beside an ancient temple in Cambodia, our story begins.`, `${h[2]} កាលពីព្រេងនាយ នៅក្បែរប្រាសាទបុរាណមួយ ក្នុងប្រទេសកម្ពុជា រឿងរបស់យើងចាប់ផ្ដើម។`],
  };
  VIDEOS.forEach((v) => {
    const H0 = HOOKS[v.id]; if (!H0) return;
    if (H0.whys) H0.why = H0.whys[H0.win];
    const [en, kmL] = OPEN[v.id](H0.list[H0.win]);
    const behind = v.id === "long" ? `the twelve golden-armored zodiac guardians ${DV(54, GROUP12)}, three of them shining brighter`
      : v.id === "60s" ? `${LOOK[day]} plays on its glowing lotus pedestal and peeks curiously at the camera. ${alive(day)}`
      : `${LOOK[day]} glows softly on its lotus pedestal`;
    const hostShot = `${cap(HOST_LOOK)}, stands on the moonlit temple terrace beside the lotus pond, facing the camera, smiling warmly and speaking directly to the viewer with natural lip movements and small, friendly hand gestures${v.id === "story" ? ", holding a glowing golden storybook as if about to begin a bedtime story" : ""}. Behind her, ${behind.replace(/\.$/, "")}${v.id === "60s" ? "" : "; the zodiac characters look around curiously but do not speak"}. Medium shot, gentle push-in toward her face. ${v.id === "60s" ? `${LOCK_HOST} ${lockAnimal(day)}` : `Chanda is the saved Flow character @Chanda${v.id === "long" ? "" : `; the ${dl} is the saved Flow character ${FLOW_NAME(day)}`}.`}`;
    v.host = true;
    v.scenes = v.scenes.slice(); v.scenes[0] = ["The hook – Chanda on camera", hostShot, en, kmL];
    v.hookMd = `### Opening hook – 5 options\n${H0.list.map(([style, e, k], i) => `${i === H0.win ? "★ " : ""}${i + 1}. ${style}\n   English: ${e}\n   Khmer: ${k}`).join("\n")}\n★ = used to open this video (the hook changes from day to day). Why: ${H0.why}`;
  });
  const storyKw = `${day.toLowerCase()} bedtime story, zodiac story for kids, Chinese zodiac ${day.toLowerCase()}, Year of the ${day}, lucky color today, Khmer story, Cambodian story`;
  const META = {
    "60s": { topic: `Today's luckiest zodiac animal, the ${day}, in 80 seconds. For viewers who follow Chinese zodiac signs, especially people born in the Year of the ${day}, scrolling Facebook Reels and TikTok.`,
      kw: `${day.toLowerCase()} zodiac today, luckiest zodiac sign today, Chinese zodiac ${day.toLowerCase()}, lucky color today, lucky numbers today` },
    "180s": { topic: `A three-minute guide to the ${day}'s Great Day: meaning, character, love, work, money and lucky details. For people born in the Year of the ${day} and zodiac fans on YouTube Shorts.`,
      kw: `Year of the ${day}, ${day.toLowerCase()} fortune today, ${day.toLowerCase()} personality, Chinese zodiac ${day.toLowerCase()} lucky color, lucky numbers` },
    long: { topic: "A full daily fortune for all twelve Chinese zodiac signs. For anyone who wants their own sign's rating, lucky color, best time and direction; chapters let each viewer jump to their sign.",
      kw: "Chinese zodiac daily fortune, 12 zodiac signs today, daily horoscope Chinese zodiac, lucky color today, Khmer zodiac, ជោគជតារាសី" },
    story: { topic: `An original animated bedtime story starring the ${day}, with today's lucky color, direction and numbers in the plot. For families, children and zodiac fans who enjoy gentle stories.`, kw: storyKw },
  };
  // ---- YouTube thumbnail prompts (16:9): one with the words drawn in (for an image AI that writes text well),
  // one clean picture with space for the words (add them in Canva or CapCut; best for Khmer text)
  const THUMB_LOOK = "Eye-catching YouTube thumbnail, horizontal 16:9, 3840 x 2160. Photorealistic still from a high-budget fantasy epic blending Khmer royal heritage with a Chinese historical fantasy drama: real human faces with natural skin, lifelike zodiac animals in engraved ceremonial gold armor with real metallic reflections, very expressive faces and eyes. Background: a glowing Khmer temple inspired by Angkor Wat under an enormous full moon and a deep indigo starry sky, lotus pool, golden particles. Bright, high-contrast, rich colors (imperial gold, deep navy, ruby red) that stand out on a small phone screen; strong golden rim light separating the characters from the background; slightly blurred background so the faces pop. Big, simple composition with only two or three subjects. Keep the bottom-right corner free (YouTube puts the video length there). No watermark, no logo, no YouTube buttons or arrows, no cartoon or plastic look.";
  const thumbMd = (subject, textEn, textKm) => `### Thumbnail prompt – YouTube (16:9)
Make the picture in an image AI (for example Gemini or Flow) with Chanda's picture and the saved zodiac characters (named after their animals) added as references. Upload size: 16:9, at least 640 pixels wide (3840 x 2160 is best), JPG or PNG, under 2 MB if you upload from your phone.

With the words drawn in (English):
${THUMB_LOOK} ${subject} Large bold text, at most a few words, in thick rounded sans-serif capitals with a dark outline and a soft drop shadow, perfectly spelled: ${textEn.map((x) => `"${x}"`).join(" and ")}. The text sits across the top of the frame in the dark sky, never over a face.

Clean version (add the words yourself, best for Khmer):
${THUMB_LOOK} ${subject} Leave a wide empty band of dark sky across the top of the frame, above the characters, for text. No text, no letters.
Words to add – English: ${textEn.join(" · ")}
Words to add – Khmer: ${textKm.join(" · ")}
Tip: thick bold font, yellow or white with a dark outline, short enough to read on a phone in one second.`;
  const AUDIO = `Music: ${MUSIC.replace(" No other speech.", "")} Keep it well below the voice (about 20 dB quieter) so every word is clear. Sound effects, used lightly: a soft chime when a lucky fact is revealed, a gentle whoosh on scene changes, a warm swell at the ending. No loud or scary sounds.`;
  VIDEOS.forEach((v) => {
    if (!META[v.id]) return;
    const TH = {
      "180s": [`${cap(HOST_LOOK)}, on the right, leans toward the camera with a delighted, surprised smile and points at ${LOOK[day]}, which is big on the left, bursting with a bright golden aura and an excited, happy face, caught mid-jump in a playful pose.`, [`${day.toUpperCase()} DAY!`, `LUCKY: ${cen.toUpperCase()}`], [`ថ្ងៃឆ្នាំ${dayKm}!`, `ពណ៌សំណាង៖ ${ckm}`]],
      long: ["The twelve golden-armored zodiac guardians in a tight arc across the frame, all looking at the camera with excited faces; three of them shine much brighter with golden auras, one rests calmly in a soft blue bubble of light.", ["ALL 12 SIGNS", "TODAY"], ["រាសីទាំង 12", "ថ្ងៃនេះ"]],
      story: [`${LOOK[day]} big in the foreground with an amazed, wide-eyed face, holding a glowing golden storybook that lights up its face; behind it, a glowing temple door and a path of lanterns lead into the night.`, [storyTitle[0].toUpperCase().split(" ").slice(0, 4).join(" ")], [storyTitle[1]]],
    };
    v.metaMd = `### Topic and audience\n${META[v.id].topic}\n\n${v.hookMd}${TH[v.id] ? `\n\n${thumbMd(...TH[v.id])}` : ""}\n\n### Audio design\n${AUDIO}\n\n### Search keywords (YouTube tags)\n${META[v.id].kw}${v.id === "long" || v.id === "story" ? "\n\n### Format\nHorizontal 16:9 for a standard YouTube video. \"Copy + voice\" uses the 16:9 style line for this video." : "\n\n### Format\nVertical 9:16 (Shorts, Reels, TikTok)."}`;
  });

  // titles and captions for the luckiest-animal videos, in both languages
  const longDateKm = `ថ្ងៃទី ${Number(iso.slice(8))} ខែ${MKM[Number(iso.slice(5, 7)) - 1]} ឆ្នាំ ${iso.slice(0, 4)}`;
  const factsEn = [`Day element: ${DEL.yy} ${DEL.el} ${DEL.emo}`, `Lucky color: ${cen}`, `Best time: ${dd.lucky.time}`, `Lucky direction: ${dir}`, `Lucky numbers: ${n0.d1} · ${n0.d2} · ${n0.d3}`];
  const factsKm = [`ធាតុថ្ងៃនេះ៖ ${DEL.km} (${DEL.yyKm}) ${DEL.emo}`, `ពណ៌សំណាង៖ ពណ៌${ckm}`, `ពេលល្អ៖ ${dd.lucky.time}`, `ទិសសំណាង៖ ទិស${dirKm}`, `លេខសំណាង៖ ${n0.d1} · ${n0.d2} · ${n0.d3}`];
  const chapKm = [["0:00", "សេចក្ដីផ្ដើម"], ...F.signs.map((sg, i) => [mmss((4 + i * 2) * 10), `ឆ្នាំ${sg.nameKm} – ${sg.label.km}`]), [mmss((4 + 24) * 10), "បញ្ចប់"]];
  const POSTS = {
    "60s": [
      ["Title – English", `${EMO[day]} ${day} Day – Today's Luckiest Sign! | ${D}`],
      ["Title – Khmer", `${EMO[day]} ថ្ងៃឆ្នាំ${dayKm} – ឆ្នាំដែលសំណាងបំផុតថ្ងៃនេះ! | ${D}`],
      ["Caption – English (Facebook, TikTok)", `${S9.en} ${EMO[day]}🌕\n\nToday, ${D}, is a ${dd.label.en} for the ${day}.\n${factsEn.map((x) => `✨ ${x}`).join("\n")}\n\nBorn in the Year of the ${day}? Comment ${EMO[day]} below! 👇\nAll 12 signs: https://mybirthsign.com (TikTok: link in bio)\nLucky numbers are for fun only.\n\n${tagsEn} #fyp #Reels`],
      ["Caption – Khmer (Facebook, TikTok)", `${S9.km} ${EMO[day]}🌕\n\nថ្ងៃនេះ ${D} ជា${dd.label.km} សម្រាប់ឆ្នាំ${dayKm}។\n${factsKm.map((x) => `✨ ${x}`).join("\n")}\n\nអ្នកកើតឆ្នាំ${dayKm}មែនទេ? Comment ${EMO[day]} ប្រាប់ផង! 👇\nមើលរាសីទាំង 12៖ https://mybirthsign.com/km/ (TikTok៖ Link នៅក្នុង bio)\nលេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ។\n\n${tags} #fyp #Reels`],
    ],
    "180s": [
      ["Title – English", `${day} Day Fortune – ${D} | Lucky Color, Time & Numbers for the Year of the ${day} ${EMO[day]}`],
      ["Title – Khmer", `ជោគជតាឆ្នាំ${dayKm} – ${D} | ពណ៌ ពេលវេលា និងលេខសំណាង ${EMO[day]}`],
      ["Description – English", `Today, ${LD}, is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day: a ${dd.label.en} for everyone born in the Year of the ${day}. ${S9.en}\n\n${factsEn.join("\n")}${PI ? `\nLucky days of the week: ${PI.luckyDays.join(" and ")}` : ""}\n\nLucky numbers are for fun only, not a prediction or betting advice.\n\nSee all 12 signs: https://mybirthsign.com\n\n${DISC_EN}\n\n${tagsEn}`],
      ["Description – Khmer", `ថ្ងៃនេះ ${longDateKm} ជាថ្ងៃឆ្នាំ${dayKm} ដែលជា${dd.label.km} សម្រាប់អ្នកកើតឆ្នាំ${dayKm}។ ${S9.km}\n\n${factsKm.join("\n")}${PK ? `\nថ្ងៃសំណាងប្រចាំសប្ដាហ៍៖ ${PK.luckyDays.join(" និង")}` : ""}\n\n${disclaimerNums}\n\nមើលរាសីទាំង 12៖ https://mybirthsign.com/km/\n\n${disclaimer}\n\n${tags}`],
    ],
    long: [
      ["Title – English", `Daily Chinese Zodiac Fortune for All 12 Signs – ${D} | ${day} Day ${EMO[day]}`],
      ["Title – Khmer", `ជោគជតារាសីទាំង 12 ប្រចាំថ្ងៃ – ${D} | ថ្ងៃឆ្នាំ${dayKm} ${EMO[day]}`],
      ["Description – English", `Your Chinese zodiac fortune for all 12 signs, ${LD}. ${summaryEn}\n\nChapters:\n${longChapters.map(([t, n]) => `${t} ${n.replace(/ \([^)]*\)/, "")}`).join("\n")}\n\nLucky numbers are given for today's lucky signs, for fun only, not betting advice.\n\nSee your sign: https://mybirthsign.com\n\n${DISC_EN}\n\n${tagsEn}`],
      ["Description – Khmer", `ជោគជតារាសីទាំង 12 សម្រាប់${longDateKm}។ ${summaryKm}\n\nជំពូក៖\n${chapKm.map(([t, n]) => `${t} ${n}`).join("\n")}\n\n${disclaimerNums}\n\nមើលរាសីរបស់អ្នក៖ https://mybirthsign.com/km/\n\n${disclaimer}\n\n${tags}`],
    ],
  };
  POSTS.story = [
    ["Title – English", `${storyTitle[0]} ${EMO[day]} | Bedtime Story & ${day} Day Fortune – ${D}`],
    ["Title – Khmer", `${storyTitle[1]} ${EMO[day]} | រឿងនិទាន និងជោគជតាថ្ងៃឆ្នាំ${dayKm} – ${D}`],
    ["Description – English", `On a ${day} day, a little golden ${dl} and ${hn} the ${H.kind[0]} must find three lucky treasures to ${Q.goal[0]} before the full-moon festival. A gentle fantasy story for the whole family, with today's real lucky color, direction, best time and numbers for the Year of the ${day}.\n\nChapters:\n${storyChapters.map(([t, en]) => `${t} ${en}`).join("\n")}\n\n${factsEn.join("\n")}\n\nAn original story by MyBirthSign. Lucky numbers are for fun only.\nSee all 12 signs: https://mybirthsign.com\n\n${DISC_EN}\n\n${tagsEn} #BedtimeStory #KidsStory`],
    ["Description – Khmer", `នៅថ្ងៃឆ្នាំ${dayKm} ${kA}មាសតូចមួយ និង${H.kind[1]}ឈ្មោះ${hk} ត្រូវស្វែងរករតនសម្បត្តិសំណាងបី ដើម្បី${Q.goal[1]} មុនពិធីបុណ្យព្រះចន្ទពេញវង់។ ជារឿងនិទានគំនូរជីវចលសម្រាប់គ្រួសារទាំងមូល ជាមួយពណ៌សំណាង ទិសសំណាង ពេលល្អ និងលេខសំណាងពិតប្រាកដ សម្រាប់អ្នកកើតឆ្នាំ${dayKm}ថ្ងៃនេះ។\n\nជំពូក៖\n${storyChapters.map(([t, , kmn]) => `${t} ${kmn}`).join("\n")}\n\n${factsKm.join("\n")}\n\nរឿងនិទានដើម ដោយ MyBirthSign។ លេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ។\nមើលរាសីទាំង 12៖ https://mybirthsign.com/km/\n\n${disclaimer}\n\n${tags} #រឿងនិទាន`],
  ];
  // ---- "take it easy" video for the day's unlucky sign (the animal that clashes with the day animal): 8 scenes, 80 s.
  // Gentle and reassuring. Uses the site's own daily wording for that sign when it exists, otherwise fixed lines.
  if (careful.length) {
    const c = careful[0], cs = sign(c), cl = c.toLowerCase(), ck = km(c), CL = cs.lucky, helper = CL.helperAnimal || "", hk = helper ? km(helper) : "";
    const cdir = CL.direction.en.toLowerCase();
    const st = same && data ? (data.signs.find((x) => x.animal === c) || {}).text : null;
    const fs1 = (t, lang) => { const m = String(t || "").trim().match(lang === "km" ? /^[^។]+។?/ : /^[^.!?]+[.!?]?/); return m ? m[0].trim() : ""; };
    const site = (k, lang) => (st && st[lang] && st[lang][k] ? fs1(st[lang][k], lang) : "");
    const weakE = PI !== undefined && P && P.INFO[c] ? P.INFO[c].weaknesses.replace(/^(\w)/, (m) => m.toLowerCase()).replace(/\.$/, "") : "";
    const weakK = P && P.KM_INFO[c] ? P.KM_INFO[c].weaknesses.replace(/។$/, "") : "";
    // one continuous little story in one place: the moonlit lotus pond with a path of flat stepping stones up to the temple
    // opening hooks for the take-it-easy video; the first one opens the video (the owner's "stop scrolling" line)
    const EASY_HOOKS = [
      ["Stop the scroll", `Stop scrolling! Born in the Year of the ${c}? Your luck isn't good today. But don't worry, watch to the end.`,
        `ឈប់! កុំអូសរំលង។ អ្នកកើតឆ្នាំ${ck} រាសីអ្នកថ្ងៃនេះមិនល្អទេ។ តែកុំបារម្ភ សូមមើលឲ្យចប់។`],
      ["Warning", `Year of the ${c}, wait! Today is a clash day for you. Here's how to get through it calmly.`,
        `អ្នកកើតឆ្នាំ${ck} ចាំបន្តិច! ថ្ងៃនេះជាថ្ងៃប៉ះឆុងសម្រាប់អ្នក។ មកមើលវិធីឆ្លងកាត់ថ្ងៃនេះដោយស្ងប់។`],
      ["Question", `Does everything feel a bit off today? If you were born in the Year of the ${c}, here's why.`,
        `ថ្ងៃនេះ អ្វីៗហាក់ដូចជាមិនសូវស្រួលមែនទេ? បើអ្នកកើតឆ្នាំ${ck} នេះជាមូលហេតុ។`],
      ["Send it to a friend", `Know someone born in the Year of the ${c}? Send this to them before they make a big decision today.`,
        `ស្គាល់អ្នកកើតឆ្នាំ${ck}ទេ? ផ្ញើវីដេអូនេះទៅគាត់ មុនពេលគាត់សម្រេចចិត្តរឿងធំថ្ងៃនេះ។`],
      ["Only one sign", `Out of all twelve signs, only one should slow down today: the ${c}.`,
        `ក្នុងចំណោមរាសីទាំង 12 មានតែមួយគត់ ដែលគួរធ្វើអ្វីៗយឺតៗថ្ងៃនេះ គឺឆ្នាំ${ck}។`],
    ];
    const EH = V(5, 13, [0, 1, 2, 3, 4]);   // the hook changes from day to day
    // the little light that keeps the sign company (scenes 5, 6 and 8): a different one every day
    const BUDDY = DV(46, [
      { intro: "a small, warm glowing lotus lantern", arrive: "drifts slowly across the still water and stops right beside", ref: "the little glowing lotus lantern", by: "floating beside it", short: "a little lotus lantern" },
      { intro: "a small paper boat carrying a warm little candle", arrive: "sails slowly across the still water and stops right beside", ref: "the little candle boat", by: "sailing along beside it", short: "a little candle boat" },
      { intro: "a small golden koi fish that glows softly", arrive: "swims slowly through the still water and stops right beside", ref: "the little glowing koi", by: "swimming along beside it", short: "a little glowing koi fish" },
      { intro: "a tiny paper crane made of soft golden light", arrive: "glides slowly over the water and lands right beside", ref: "the little paper crane of light", by: "flying beside it", short: "a little paper crane of light" },
      { intro: "a small floating candle in a glass cup", arrive: "drifts slowly across the still water and stops right beside", ref: "the little floating candle", by: "floating beside it", short: "a little floating candle" },
      { intro: "a single pink lotus flower glowing with warm light", arrive: "drifts slowly across the still water and stops right beside", ref: "the little glowing lotus", by: "floating beside it", short: "a little glowing lotus" },
      { intro: "a single large, gentle firefly glowing warm gold", arrive: "flies slowly over the water and settles right beside", ref: "the little golden firefly", by: "flying beside it", short: "a little golden firefly" },
    ]);
    const SAME = `Same moonlit lotus pond, same stepping-stone path and temple, same lighting and same character design as the previous scene. Natural, believable movement and body language, soft realistic moonlight, gentle pace. The ${cl} moves like a real, living animal, never still like a statue: it breathes, blinks, and its ears, tail and body move naturally with its feelings; its mouth stays closed. ${lockAnimal(c)}`;
    const hostEasy = (action) => `${cap(HOST_LOOK)}, stands on the carved stone temple terrace above the moonlit lotus pond, facing the camera and speaking warmly to the viewer with natural lip movements and small, friendly hand gestures. ${action} Medium shot, gentle push-in toward Chanda. Chanda is the saved Flow character @Chanda; the ${cl} is the saved Flow character ${FLOW_NAME(c)}. ${LOCK_HOST}`;
    const E = [
      ["The hook – Chanda on camera", hostEasy(`She starts by raising one open hand toward the camera like a friendly "stop" sign, with a caring, slightly urgent expression, then lowers it and keeps talking warmly. Below her, at the edge of the pond where a path of flat stepping stones leads up to the temple, ${LOOK[c]} sits looking a little tired and lets out a quiet sigh with its mouth closed; it does not speak.`),
        EASY_HOOKS[EH][1], EASY_HOOKS[EH][2], true],
      ["A wobbly start", `Continuing from the previous scene: the ${cl} jumps up and hurries across the flat stepping stones toward the glowing temple in the distance. Halfway across, a stone tips a little, the ${cl} wobbles, catches its balance and stops, a bit surprised but not hurt. Camera follows behind it. ${SAME}`,
        `Today, ${dateEn}, is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day, opposite the ${c} in the zodiac circle. Some days don't go to plan.`,
        `ថ្ងៃនេះ ${dateKm} ជាថ្ងៃឆ្នាំ${dayKm} ទល់មុខឆ្នាំ${ck} ក្នុងរង្វង់រាសី។ មានថ្ងៃខ្លះ អ្វីៗមិនដូចការគ្រោងទុកទេ។`],
      ["Stop and breathe", `Continuing from the previous scene: the ${cl} sits down on the stepping stone where it stopped, closes its eyes and takes a slow, deep breath, and its whole body relaxes. The ripples around the stones slowly fade until the water is still. Close-up, slow push-in. ${SAME}`,
        "And that's okay. Everyone has days like this. A quiet day is not a bad day. It is a day to breathe.",
        "ហើយវាមិនអីទេ។ មនុស្សគ្រប់គ្នា ធ្លាប់មានថ្ងៃបែបនេះ។ ថ្ងៃស្ងប់ស្ងាត់ មិនមែនជាថ្ងៃអាក្រក់ទេ គឺជាថ្ងៃសម្រាប់ដកដង្ហើមវែងៗ។"],
      ["Looking inside", `Continuing from the previous scene: still sitting on the stepping stone, the ${cl} opens its eyes and looks down at its reflection in the now-still water. It tilts its head thoughtfully, then gives its reflection a small, honest smile. Camera moves slowly down to the reflection. ${SAME}`,
        site("careful", "en") || `Be careful today: you ${weakE}. Pause before you react.`,
        site("careful", "km") || `សូមប្រយ័ត្នថ្ងៃនេះ៖ ${weakK}។ សូមឈប់បន្តិច មុននឹងឆ្លើយតប។`],
      ["A friend arrives", `Continuing from the previous scene: ${BUDDY.intro} ${BUDDY.arrive} the ${cl}, and a few soft fireflies gather around them. The ${cl} looks at the light, leans in a little and relaxes, as if comforted by a friend; it stays quiet, mouth closed. It is the only animal in the scene. Slow orbit. ${SAME}`,
        `${site("love", "en") || "Be gentle with the people you love, and with yourself."} And lean on a friend you trust.`,
        `${site("love", "km") || "សូមទន់ភ្លន់ចំពោះមនុស្សដែលអ្នកស្រឡាញ់ និងចំពោះខ្លួនឯង។"} ហើយពឹងលើមិត្តដែលអ្នកទុកចិត្ត។`],
      ["One step at a time", `Continuing from the previous scene: the ${cl} stands up and walks slowly to the end of the stepping stones, ${BUDDY.ref} ${BUDDY.by}, then climbs the temple steps one at a time; each step glows softly under its feet. Steady, patient pace. Camera rises with it. ${SAME}`,
        site("money", "en") ? `${site("money", "en")} At work, one thing at a time.` : "At work and with money, take small, careful steps. Finish one thing, then the next.",
        site("money", "km") ? `${site("money", "km")} ការងារ សូមធ្វើម្ដងមួយៗ។` : "ក្នុងការងារ និងលុយកាក់ សូមបោះជំហានតូចៗ ដោយប្រុងប្រយ័ត្ន។ បញ្ចប់រឿងមួយ រួចសឹមធ្វើរឿងបន្ទាប់។"],
      ["Brighter days ahead", `Continuing from the previous scene: at the top of the steps the ${cl} reaches the temple terrace and turns to look back over the moonlit pond and the stepping stones it crossed. Lanterns rise slowly into the sky, and a warm glow lights its face as it smiles, calm and proud. Wide shot, slow pull-back. ${SAME}`,
        "Slow is still moving forward. Every quiet day makes you stronger, and brighter days are already on their way.",
        "យឺត ក៏នៅតែជាការឈានទៅមុខដែរ។ រាល់ថ្ងៃស្ងប់ស្ងាត់ ធ្វើឲ្យអ្នកកាន់តែរឹងមាំ ហើយថ្ងៃភ្លឺស្វាង កំពុងមកដល់។"],
      ["Goodbye – Chanda on camera", hostEasy(`Continuing from the previous scene, on the same terrace: a two-shot of Chanda and ${LOOK[c]}, the same ${cl} as in every scene, together and both clearly in frame, the ${cl} sitting calm and smiling right beside her. As she speaks, Chanda gently holds out her hands to ${BUDDY.ref} from the earlier scenes; it rises up between them and bursts softly into a shower of golden light and glowing lotus petals that drift down around them, wrapping the ${cl} in a warm, gentle golden glow. The ${cl} looks up at the light, relaxes and smiles, then waves goodbye together with Chanda, without speaking, its mouth closed. Lanterns float up over the pond behind them. No other animals.`),
        "Rest well tonight. Tomorrow is a new day, and it could be yours. Follow MyBirthSign for your fortune every day!",
        "យប់នេះ សូមសម្រាកឲ្យស្រួល។ ថ្ងៃស្អែក ជាថ្ងៃថ្មី ហើយអាចជាថ្ងៃរបស់អ្នក។ សូមតាមដាន MyBirthSign រៀងរាល់ថ្ងៃ!", true],
    ];
    // more words in the two shortest take-it-easy scenes, only when they still fit the clip
    const CALM = [["Take a deep breath first.", "សូមដកដង្ហើមវែងៗជាមុនសិន។"], ["You are doing better than you think.", "អ្នកកំពុងធ្វើបានល្អ ជាងអ្វីដែលអ្នកគិត។"],
      ["Small steps still count.", "ជំហានតូចៗ ក៏មានតម្លៃដែរ។"], ["Be kind to yourself.", "សូមមេត្តាខ្លួនឯង។"]];
    for (const i of [3, 5]) [E[i][2], E[i][3]] = fuller([E[i][2], E[i][3]], rot(i, CALM));
    const easyHookMd = `### Opening hook – 5 options\n${EASY_HOOKS.map(([st, e, k], i) => `${i === EH ? "★ " : ""}${i + 1}. ${st.replace(" (used)", "")}\n   English: ${e}\n   Khmer: ${k}`).join("\n")}\n★ = used to open this video today (the hook changes from day to day). To use another hook, replace the voice line in scene 1.`;
    VIDEOS.push({ id: "easy", metaMd: easyHookMd, name: `Take-it-easy video – the unlucky sign, ${c} (8 scenes, 80 seconds)`, secs: 80, scenes: E,
      intro: `An 80-second video for the ${c}, today's sign to take it easy (in the traditional day cycle the ${c} clashes with the ${day} day): 8 clips of 10 seconds. Set the clip length in Flow to 10 seconds and add Chanda and the saved character ${FLOW_NAME(c)} as ingredients (the ${c} is the only zodiac character in this video, from the first scene to the last). Chanda is on camera and speaks with lip-sync in scenes 1 and 8; in the other scenes she narrates off screen. The animals never speak or move their mouths: they only act. It is one continuous little story in one place (the ${cl} hurries, wobbles, stops to breathe, ${BUDDY.short} keeps it company, it climbs the temple steps and looks out with hope), so make the clips in order and keep the same setting and light. No lucky numbers or colors in this video: it is about encouragement. Keep it gentle and realistic: a quiet day, not bad luck. For each scene, press "Copy + English voice" or "Copy + Khmer voice". Put the clips in order 1 to 8.${st ? " Scenes 4, 5 and 6 use the site's own daily wording for this sign." : ""}` });
    POSTS.easy = [
      ["Title – English", `${EMO[c]} ${c}, Take It Easy Today | ${D}`],
      ["Title – Khmer", `${EMO[c]} ឆ្នាំ${ck} ថ្ងៃនេះគួរប្រុងប្រយ័ត្ន | ${D}`],
      ["Caption – English (Facebook, TikTok)", `Born in the Year of the ${c}? Today, ${D}, is a ${cs.label.en} day for you. 🌙\n\nSome days just don't go to plan, and that's okay. Slow down, be gentle with yourself, and lean on a friend you trust. Slow is still moving forward, and brighter days are on their way. 💛\n\nComment ${EMO[c]} if this is your sign! 👇\nAll 12 signs: https://mybirthsign.com (TikTok: link in bio)\n\n${DISC_EN}\n#ChineseZodiac #DailyHoroscope #YearOfThe${c} #fyp #Reels`],
      ["Caption – Khmer (Facebook, TikTok)", `អ្នកកើតឆ្នាំ${ck}មែនទេ? ថ្ងៃនេះ ${D} ជា${cs.label.km} សម្រាប់អ្នក។ 🌙\n\nមានថ្ងៃខ្លះ អ្វីៗមិនដើរតាមផែនការ ហើយវាមិនអីទេ។ សូមធ្វើអ្វីៗយឺតៗ មេត្តាចំពោះខ្លួនឯង និងពឹងលើមិត្តដែលអ្នកទុកចិត្ត។ យឺត ក៏នៅតែជាការឈានទៅមុខដែរ ហើយថ្ងៃភ្លឺស្វាង កំពុងមកដល់។ 💛\n\nComment ${EMO[c]} បើនេះជារាសីរបស់អ្នក! 👇\nមើលរាសីទាំង 12៖ https://mybirthsign.com/km/ (TikTok៖ Link នៅក្នុង bio)\n\n${disclaimer}\n#ជោគជតារាសី #រាសីប្រចាំថ្ងៃ #ឆ្នាំ${ck} #fyp #Reels`],
    ];

    // ---- full daily fortune for YouTube, 8 minutes or longer (YouTube allows mid-roll ads from 8:00):
    // hook, the Great Day sign in depth, the two Good Day signs, the sign to take it easy (its little story),
    // the other eight signs, then a recap and goodbye. 52 clips of 10 seconds = 8:40. 16:9.
    const wide = (a, extra) => `${extra} ${alive(a)} ${lockAnimal(a)}`;
    const fr = friends, ords = F.signs.filter((x) => x.tier === "ordinary");
    const YT_HOOKS = [
      ["Every sign in one line", `One sign has a Great Day today, two have a Good Day, and one should slow down. Which one are you?`,
        `ថ្ងៃនេះ មានមួយឆ្នាំថ្ងៃល្អខ្លាំង ពីរឆ្នាំថ្ងៃល្អ និងមួយឆ្នាំគួរធ្វើអ្វីៗយឺតៗ។ តើអ្នកជាឆ្នាំណា?`],
      ["Before a big decision", `Before you make any big decision today, watch this: your lucky color, your best time, and whether to slow down.`,
        `មុននឹងសម្រេចចិត្តរឿងធំថ្ងៃនេះ សូមមើលវីដេអូនេះ៖ ពណ៌សំណាង ពេលល្អ និងថាតើគួរធ្វើយឺតៗឬទេ។`],
      ["Speak to the careful sign", `Born in the Year of the ${c}? Watch this before you do anything big today. Everyone else, your luck is here too.`,
        `អ្នកកើតឆ្នាំ${ck}មែនទេ? សូមមើលវីដេអូនេះ មុនធ្វើរឿងធំថ្ងៃនេះ។ អ្នកផ្សេងទៀត សំណាងរបស់អ្នកក៏នៅទីនេះដែរ។`],
      ["Name the winner", `Today the ${day} has its Great Day, and one sign should take it easy. Is it yours?`,
        `ថ្ងៃនេះ ឆ្នាំ${dayKm}មានថ្ងៃល្អខ្លាំង ហើយមានមួយឆ្នាំគួរប្រុងប្រយ័ត្ន។ តើជាឆ្នាំរបស់អ្នកឬទេ?`],
      ["Comment first", `Comment your sign now. By the end of this video, you'll know your lucky color, best time, and direction for today.`,
        `សូមសរសេររាសីរបស់អ្នកឥឡូវនេះ។ មុនវីដេអូនេះចប់ អ្នកនឹងដឹងពណ៌ ពេល និងទិសសំណាងថ្ងៃនេះ។`],
    ];
    const YH = V(5, 14, [0, 1, 2, 3, 4]);   // the hook changes from day to day
    const Y = [];
    // more words in the long video's own short scenes (scenes shared with the 60-second and take-it-easy videos keep theirs)
    const SHARED = new Set([...Object.values(SC), ...E]);
    const POOL = [elLine,
      ["Small good choices add up to a lucky day.", "ជម្រើសល្អៗតូចៗ នាំមកនូវថ្ងៃដ៏សំណាង។"],
      ["Keep a calm heart, and good things will follow.", "សូមរក្សាចិត្តស្ងប់ ហើយរឿងល្អៗនឹងមកដល់។"],
      ["Smile, and share your luck with someone today.", "សូមញញឹម ហើយចែករំលែកសំណាងជាមួយនរណាម្នាក់ថ្ងៃនេះ។"],
      ["Stay with me: more good news is coming.", "សូមមើលបន្ត មានដំណឹងល្អៗទៀត។"]];
    const POOL_SHORT = [[`A ${DEL.yy} ${DEL.el} day!`, `ថ្ងៃធាតុ${DEL.km}!`], ["Keep a calm heart.", "សូមរក្សាចិត្តស្ងប់។"],
      ["Small choices bring big luck.", "ជម្រើសតូចៗ នាំសំណាងធំ។"], ["Share your luck.", "សូមចែករំលែកសំណាង។"]];
    const add = (part, s) => {
      if (!SHARED.has(s) && s[2] && s[3]) [s[2], s[3]] = fuller([s[2], s[3]], rot(Y.length, Y.length > 44 ? POOL.slice(0, 4) : POOL).concat(rot(Y.length, POOL_SHORT)));
      s.part = part; Y.push(s);
    };
    // intro
    add("Introduction", ["The hook – Chanda on camera", `${cap(HOST_LOOK)}, stands on the moonlit temple terrace beside the lotus pond, facing the camera, smiling warmly and speaking directly to the viewer with natural lip movements and small, friendly hand gestures. Behind her, the twelve golden-armored zodiac guardians ${DV(54, GROUP12, 2)}: the ${dl} shines brightest with a golden aura, and the ${cl} rests calmly inside a soft bubble of golden light. The animals move gently and look around curiously, mouths closed. Medium shot, gentle push-in toward her face. ${LOCK_HOST}`,
      YT_HOOKS[YH][1], YT_HOOKS[YH][2], true]);
    add("Introduction", ["What's coming", `${DV(47, [
        "Four glowing lotus lanterns rise one by one from the moonlit pond in front of the temple: one bright gold, two warm gold and one soft silver. Then many small lanterns follow them into the starry sky.",
        "Four stars light up one by one above the temple towers: one bright gold, two warm gold and one soft silver. Then the whole sky fills with twinkling stars.",
        "Four lotus flowers open one by one on the moonlit pond: one glowing bright gold, two warm gold and one soft silver. Then the whole pond lights up with blooming lotuses.",
        "Four crystals rise one by one out of the pond: one bright gold, two warm gold and one soft silver. Then smaller sparkles rise around them into the sky.",
        "Four sky lanterns lift off one by one from the temple terrace: one bright gold, two warm gold and one soft silver. Then hundreds more follow them toward the moon.",
        "Four paper boats with candles sail out one by one across the pond: one glowing bright gold, two warm gold and one soft silver. Then many small floating candles follow them across the water.",
        "Four golden bells under the temple roof glow and ring one by one: one bright gold, two warm gold and one soft silver. Then rings of light spread across the sky."])} Wide shot, slow crane up.`,
      `Today is ${aDay} ${day} day. Coming up: one Great Day sign, two Good Days, one sign to take it easy, and all twelve.`,
      `ថ្ងៃនេះជាថ្ងៃឆ្នាំ${dayKm}។ បន្តិចទៀត៖ មួយឆ្នាំថ្ងៃល្អខ្លាំង ពីរឆ្នាំថ្ងៃល្អ មួយឆ្នាំគួរសម្រាក និងរាសីទាំង 12។`]);
    add("Introduction", ["Today's signs at a glance", `The twelve golden-armored zodiac guardians ${DV(54, GROUP12, 3)}. Three of them shine brighter with a golden aura, and one rests inside a soft protective bubble of light. They all move gently: ears twitching, tails swaying, heads turning. Slow, wide circling camera.`,
      `${list(lucky)} are lucky today, and the ${c} should slow down. Find your sign in the chapters below.`,
      `${kmList(lucky.map((a) => `ឆ្នាំ${km(a)}`))} មានសំណាងថ្ងៃនេះ ហើយឆ្នាំ${ck} គួរធ្វើអ្វីៗយឺតៗ។ សូមរករាសីរបស់អ្នក ក្នុងជំពូកខាងក្រោម។`]);
    add("Introduction", ["Comment and subscribe – Chanda on camera", `${cap(HOST_LOOK)}, stands on the temple terrace and leans a little toward the camera with a friendly smile, speaking with natural lip movements; she points down as if toward the comments, then makes a small heart shape with her hands. Close-up, soft golden light, ${DV(55, ["lanterns drifting slowly behind her",
        "fireflies glowing softly behind her", "the full moon glowing over her shoulder", "lotus petals drifting past her", "the temple towers glowing behind her",
        "soft mist drifting behind her", "golden sparkles floating in the air behind her"])}. ${LOCK_HOST}`,
      "Before we start, comment your sign below, and subscribe so you get your fortune every day.",
      "មុននឹងចាប់ផ្ដើម សូមសរសេររាសីរបស់អ្នក ក្នុងមតិយោបល់ ហើយ subscribe ដើម្បីទទួលជោគជតារៀងរាល់ថ្ងៃ។", true]);
    // the Great Day sign
    const G = `Great Day: ${day}`;
    [SC.rev60, SC.mean60].forEach((s) => add(G, s));
    add(G, [`The ${day}'s character`, wide(day, `Close-up of the ${dl} on its glowing lotus, its face showing a ${S9.mood} expression. Soft golden light circles it and ${DV(28, HALO, 1)}. Gentle slow orbit.`),
      `People born in the Year of the ${day} are often described as ${clueEn}.`,
      `អ្នកកើតឆ្នាំ${dayKm} ជារឿយៗ ត្រូវបានគេស្គាល់ថា ${clueKm}។`]);
    add(G, [SC.magic60[0], SC.magic60[1], ...horoPack(day, ["general"])]);
    add(G, ["Love and family", wide(day, `${DV(29, LOVE_OBJ(dl), 1)} It smiles warmly. Slow push-in.`),
      ...horoSay(day, "love", ["Love and family today:", "ស្នេហា និងគ្រួសារថ្ងៃនេះ៖"])]);
    add(G, ["Work and study", wide(day, `${DV(30, WORK_OBJ(dl), 1)} Smooth camera move following it.`),
      ...horoSay(day, "career", ["Work today:", "ការងារថ្ងៃនេះ៖"])]);
    add(G, ["Money", wide(day, `${DV(32, MONEY_OBJ(dl), 1)} Warm, calm light. Slow push-in.`),
      ...horoSay(day, "money", ["Money today:", "លុយកាក់ថ្ងៃនេះ៖"])]);
    [SC.color60, SC.timedir60, SC.num60].forEach((s) => add(G, s));
    add(G, ["Lucky days of the week", wide(day, `${DV(33, SEVEN_OBJ(dl), 1)} Slow pan along the row.`),
      PI ? `The ${day}'s lucky days of the week are ${PI.luckyDays.join(" and ")}. Keep them for plans that matter.` : "",
      PK ? `ថ្ងៃសំណាងរបស់ឆ្នាំ${dayKm} គឺ${PK.luckyDays.join(" និង")}។ សូមទុកសម្រាប់ផែនការសំខាន់ៗ។` : ""]);
    add(G, ["A gentle reminder", wide(day, `${DV(34, REFLECT_OBJ(dl), 1)} Slow, gentle camera move.`),
      `A gentle reminder: ${day} people ${weakEn}. Stay balanced today.`,
      PK ? `រំលឹកបន្តិច៖ អ្នកកើតឆ្នាំ${dayKm} ${PK.weaknesses.replace(/។$/, "")}។ សូមរក្សាតុល្យភាព។` : ""]);
    // the two Good Day signs
    fr.forEach((f, i) => {
      const fs = sign(f), fl = f.toLowerCase(), FL = fs.lucky, nf = nums.find((x) => x.a === f), Gp = `Good Day: ${f}`;
      add(Gp, [`${f} – ${fs.label.en}`, wide(f, `${cap(LOOK[f])} ${DV(42, PLACE, 5 + 3 * i)}, glowing with a warm golden light, and greets the night with a happy stretch. Slow push-in.`),
        `Next, the Year of the ${f}: a Good Day! The ${f} shares a lucky triangle with the ${day}.`,
        `បន្ទាប់ ឆ្នាំ${km(f)}៖ ថ្ងៃល្អ! ឆ្នាំ${km(f)} ស្ថិតក្នុងត្រីកោណសំណាង ជាមួយឆ្នាំ${dayKm}។`]);
      add(Gp, [`${f} – the magical moment`, wide(f, `The ${fl} ${POSE[f]}. ${DV(26, LAND, 2 + 3 * i)}`),
        ...horoPack(f, ["general", "love", "career", "money"])]);
      add(Gp, [`${f} – lucky color and time`, wide(f, `${DV(21, COLOR_OBJ(fl, FL.color.en), 2 + 3 * i).scene} Nearby, ${DV(22, TIME_OBJ(fl), 2 + 3 * i).short}. Warm ${FL.color.en} and gold light. Slow orbit.`),
        `Your lucky color is ${FL.color.en}, and your best time is ${sayTime(FL.time)}.`,
        `ពណ៌សំណាងគឺពណ៌${FL.color.km} ហើយពេលល្អបំផុតគឺ${sayTimeKm(FL.time)}។`]);
      add(Gp, [`${f} – direction and numbers`, wide(f, `${DV(23, DIR_OBJ(fl, FL.direction.en.toLowerCase()), 2 + 3 * i).scene} Three small golden orbs of light float in the air nearby. Open space in the lower part of the frame for number captions. Camera follows behind it.`),
        `Your lucky direction is the ${FL.direction.en.toLowerCase()}.${nf ? ` Lucky numbers: ${nf.d1}, ${nf.d2}, and ${nf.d3}.` : ""}`,
        `ទិសសំណាងគឺទិស${FL.direction.km}។${nf ? ` លេខសំណាង៖ ${nf.d1} ${nf.d2} និង ${nf.d3}។` : ""}`]);
      add(Gp, [`${f} – today's tip`, wide(f, `The ${fl} sits beside the glowing ${dl} on the temple terrace; they look at each other happily, then both look up as a shower of golden sparkles falls around them. Two-shot, slow push-in.`),
        `${f} friends, stay close to the ${day} people today. Good luck grows when you share it.`,
        `អ្នកកើតឆ្នាំ${km(f)} ថ្ងៃនេះ សូមនៅជិតអ្នកកើតឆ្នាំ${dayKm}។ សំណាងកាន់តែច្រើន ពេលចែករំលែក។`]);
    });
    // the sign to take it easy: its little story (scenes 2 to 7 of the take-it-easy video)
    const T = `Take it easy: ${c}`;
    E.slice(1, 7).forEach((s, i) => add(T, i === 0 ? [`${c} – take it easy`, s[1].replace("Continuing from the previous scene: ", `${cap(LOOK[c])} sits at the edge of the moonlit pond, where a path of flat stepping stones leads up to the temple. `), s[2], s[3]] : s));
    // the other eight signs
    ords.forEach((sg, i) => {
      const a = sg.animal, al = a.toLowerCase(), L = sg.lucky, Op = "All the other signs";
      add(Op, [`${a} – ${sg.label.en}`, wide(a, `${cap(LOOK[a])} ${DV(42, PLACE, 3 + 5 * i)}, calm and content, softly lit by the moon. ${cap(DV(43, COLOR_OBJ(al, L.color.en), 3 + 5 * i).around)}. Slow push-in.`),
        `Year of the ${a}: a steady day. Lucky color: ${L.color.en}. Best time: ${sayTime(L.time)}.`,
        `ឆ្នាំ${sg.nameKm}៖ ថ្ងៃធម្មតា។ ពណ៌សំណាង៖ ពណ៌${L.color.km}។ ពេលល្អ៖ ${sayTimeKm(L.time)}។`]);
      add(Op, [`${a} – horoscope`, wide(a, `The ${al} ${DV(40, CALM_ACT, 3 + 5 * i)}, then moves on along the edge of the lotus pond. Peaceful, cheerful mood. Camera follows it smoothly.`),
        ...horoPack(a, ["love", "career", "money"], [`Lucky direction: ${L.direction.en.toLowerCase()}.`, `ទិសសំណាង៖ ទិស${L.direction.km}។`])]);
    });
    // recap and goodbye
    add("Recap and goodbye", ["Quick recap", `The twelve golden-armored zodiac guardians gather on the temple terrace in a half circle; the ${dl} glows brightest in the middle, two friends glow warmly beside it, and the ${cl} rests calmly in its soft bubble of light. They all move and look around happily. Slow pull-back.`,
      `Quick recap: the ${day} has a Great Day, ${list(fr)} have Good Days, and the ${c} should slow down.`,
      `សរុបមកវិញ៖ ឆ្នាំ${dayKm}ថ្ងៃល្អខ្លាំង ${kmList(fr.map((a) => `ឆ្នាំ${km(a)}`))}ថ្ងៃល្អ ហើយឆ្នាំ${ck} គួរធ្វើអ្វីៗយឺតៗ។`]);
    add("Recap and goodbye", [nine[7][0], wide(day, `${DV(27, WISH_OBJ(dl), 1)} Slow camera move following the light.`), vo90[7][0], vo90[7][1]]);
    add("Recap and goodbye", ["Thank you", wide(day, `${DV(35, THANKS_OBJ(dl), 1)} Warm, grateful mood. Slow pull-back.`),
      "Before the day ends, say thank you: to the people who help you, and to yourself.",
      "មុនថ្ងៃនេះបញ្ចប់ សូមអរគុណ៖ អរគុណមនុស្សដែលជួយអ្នក និងអរគុណខ្លួនឯង។"]);
    add("Recap and goodbye", ["Goodbye – Chanda on camera", `${cap(HOST_LOOK)}, stands on the moonlit temple terrace with the twelve golden-armored zodiac guardians around her, smiling and speaking to the viewer with natural lip movements. ${DV(10, HOST_MAGIC("the zodiac guardians around her"), 1)} The animals look up in wonder and wave goodbye without speaking, mouths closed. ${cap(DV(31, FINALE_SKY, 2))}. Crane shot slowly pulling back for a warm final view. ${LOCK_HOST}`,
      "Subscribe and follow MyBirthSign for your fortune every day. Which sign are you? Tell me in the comments!",
      "សូម subscribe និងតាមដាន MyBirthSign រៀងរាល់ថ្ងៃ។ តើអ្នកកើតឆ្នាំអ្វី? ប្រាប់ខ្ញុំក្នុងមតិយោបល់ផង!", true]);
    const ytChapters = [];
    Y.forEach((s, i) => { if (!ytChapters.length || ytChapters[ytChapters.length - 1][1] !== s.part) ytChapters.push([mmss(i * 10), s.part]); });
    const partKm = (n) => n === "Introduction" ? "សេចក្ដីផ្ដើម" : n === "All the other signs" ? "រាសីផ្សេងទៀត" : n === "Recap and goodbye" ? "សរុប និងលាគ្នា"
      : n.replace(/^Great Day: (\w+)$/, (m, a) => `ថ្ងៃល្អខ្លាំង៖ ឆ្នាំ${km(a)}`).replace(/^Good Day: (\w+)$/, (m, a) => `ថ្ងៃល្អ៖ ឆ្នាំ${km(a)}`).replace(/^Take it easy: (\w+)$/, (m, a) => `គួរប្រុងប្រយ័ត្ន៖ ឆ្នាំ${km(a)}`);
    const ytBreaks = ytChapters.filter(([tm]) => { const [m, s] = tm.split(":").map(Number); return m * 60 + s >= 120; }).map(([tm]) => tm);
    const ytHookMd = `### Opening hook – 5 options\n${YT_HOOKS.map(([st, e, k], i) => `${i === YH ? "★ " : ""}${i + 1}. ${st}\n   English: ${e}\n   Khmer: ${k}`).join("\n")}\n★ = used to open this video today (the hook changes from day to day, and each one gives every viewer a reason to stay to find their own sign). To use another hook, replace the voice line in scene 1.`;
    VIDEOS.push({ id: "yt8", name: `Long YouTube video – full fortune, ${mmss(Y.length * 10)} (mid-roll ads)`, secs: Y.length * 10, scenes: Y, chapters: ytChapters,
      metaMd: `${ytHookMd}\n\n### Mid-roll ads\nYouTube lets you add ad breaks in the middle of videos that are 8 minutes or longer; this one is ${mmss(Y.length * 10)}. Put the breaks at chapter starts so they don't cut a sentence. Chapter starts after 2:00: ${ytBreaks.join(", ")}. Two or three breaks are enough; too many make viewers leave.\n\n${thumbMd(`On the left, ${LOOK[day]}, big and bursting with a bright golden aura, an excited, joyful face, caught mid-jump in a playful pose. In the middle, ${HOST_LOOK.replace(/^Chanda, /, "Chanda, ")}, with a surprised, delighted expression, pointing at the ${dl}. On the right, smaller, ${LOOK[c]}, sleepy and calm inside a soft blue bubble of light, eyes half closed.`, [`${day.toUpperCase()}: GREAT DAY!`, `${c.toUpperCase()}: SLOW DOWN`], [`ឆ្នាំ${dayKm}៖ ថ្ងៃល្អខ្លាំង!`, `ឆ្នាំ${ck}៖ ធ្វើយឺតៗ`])}\n\n### Format\nHorizontal 16:9 for a standard YouTube video. "Copy + voice" uses the 16:9 style line for this video.`,
      intro: `A full daily fortune for YouTube (${mmss(Y.length * 10)}, ${Y.length} clips of 10 seconds), long enough for mid-roll ads. In order: the hook, the Great Day sign (${day}) in depth, the two Good Day signs (${list(fr)}), the sign to take it easy (${c}) with its little story, the other eight signs, then a recap and goodbye. Add Chanda and the 12 saved characters as ingredients in Flow (@Rat, @Ox … @Pig; each part names its own character). Chanda is on camera and speaks with lip-sync in scenes 1, 4 and ${Y.length}; in the others she narrates off screen. The animals never speak or move their mouths: they only act. Set the clip length to 10 seconds, make the clips in order 1 to ${Y.length}, and paste the chapters into the YouTube description.` });
    POSTS.yt8 = [
      ["Title – English", `Chinese Zodiac Fortune ${D}: ${day} Great Day, ${fr.join(" & ")} Lucky, ${c} Take It Easy ${EMO[day]}`],
      ["Title – Khmer", `ជោគជតារាសី ${D}៖ ឆ្នាំ${dayKm}ថ្ងៃល្អខ្លាំង ${fr.map((a) => `ឆ្នាំ${km(a)}`).join(" និង")}ថ្ងៃល្អ ឆ្នាំ${ck}គួរប្រុងប្រយ័ត្ន ${EMO[day]}`],
      ["Description – English", `Your full Chinese zodiac fortune for ${LD}: the ${day} has a Great Day, the ${list(fr)} have Good Days, and the ${c} should take it easy. Lucky color, best time and direction for all 12 signs.\n\nChapters:\n${ytChapters.map(([tm, n]) => `${tm} ${n}`).join("\n")}\n\nFor the ${day} today:\n${factsEn.join("\n")}\n\nWhich sign are you? Tell us in the comments, and subscribe for your fortune every day.\nLucky numbers are for fun only, not betting advice.\nSee your sign: https://mybirthsign.com\n\n${DISC_EN}\n\n${tagsEn} #YearOfThe${c}`],
      ["Description – Khmer", `ជោគជតារាសីចិនពេញលេញ សម្រាប់${longDateKm}៖ ឆ្នាំ${dayKm}ថ្ងៃល្អខ្លាំង ${kmList(fr.map((a) => `ឆ្នាំ${km(a)}`))}ថ្ងៃល្អ ហើយឆ្នាំ${ck}គួរធ្វើអ្វីៗយឺតៗ។ ពណ៌ ពេល និងទិសសំណាង សម្រាប់រាសីទាំង 12។\n\nជំពូក៖\n${ytChapters.map(([tm, n]) => `${tm} ${partKm(n)}`).join("\n")}\n\nសម្រាប់ឆ្នាំ${dayKm}ថ្ងៃនេះ៖\n${factsKm.join("\n")}\n\nតើអ្នកកើតឆ្នាំអ្វី? សូមប្រាប់ក្នុងមតិយោបល់ ហើយ subscribe ដើម្បីទទួលជោគជតារៀងរាល់ថ្ងៃ។\n${disclaimerNums}\nមើលរាសីរបស់អ្នក៖ https://mybirthsign.com/km/\n\n${disclaimer}\n\n${tags}`],
    ];
  }
  VIDEOS.forEach((v) => { v.posts = POSTS[v.id]; });
  const srtVid = {};
  VIDEOS.forEach((v) => { srtVid[v.id] = { km: srtFor(v.scenes, "km"), en: srtFor(v.scenes, "en") }; });
  // ---- a different "heaven moment" in the sky for each scene, always behind the characters (not for the story video,
  // which has daytime scenes); the constellation takes the shape of the video's own animal
  const skyFor = (v, i) => {
    if (v.id === "story") return "";
    const a = (v.id === "easy" && careful.length ? careful[0] : day).toLowerCase();
    const SKY = [
      `the clouds part and wide beams of silver-gold moonlight pour down through the mist like a curtain of light`,
      `the stars slowly join with fine golden lines into a glowing constellation shaped like the ${a}, which shimmers and then softly fades`,
      `a single bright shooting star crosses the sky, leaving a long trail of golden sparks that drift down like snow`,
      `soft ribbons of gold-and-violet aurora wave slowly across the sky above the temple towers`,
      `a huge, faint golden ring of the twelve zodiac symbols turns slowly around the full moon like an ancient celestial clock`,
      `hundreds of glowing sky lanterns rise from behind the temple and float up toward the moon, their light reflected in the water`,
      `a gentle shower of tiny golden meteors falls far away behind the temple, each one a thin line of light`,
      `the full moon glows brighter and a ring of soft rainbow light (a moon halo) opens around it, then the stars sparkle all at once`,
    ];
    return `Sky: ${SKY[(i + dayNo) % SKY.length]}; it stays in the background and never covers a face.`;   // a different sky for each scene, and a new order every day
  };
  const videoMd = (v) => `## ${v.name}
${v.intro || `${v.secs === 80 ? "An" : "A"} ${v.secs}-second video about the ${day}, today's luckiest animal: ${v.scenes.length} clips of 10 seconds. Set the clip length in Flow to 10 seconds and add Chanda and the saved character ${FLOW_NAME(day)} as ingredients. ${v.scenes.some((x) => x[4]) ? `Chanda is on camera and speaks with lip-sync in scenes ${[1, ...v.scenes.map((x, i) => x[4] ? i + 1 : 0).filter(Boolean)].join(", ")}; in the other scenes she narrates off screen` : "Chanda opens the video on camera with the hook and narrates the rest off screen"}. The animals never speak or move their mouths: they only act. For each scene, press "Copy + English voice" or "Copy + Khmer voice": it copies the style line, the scene and the voice together. Put the clips in order 1 to ${v.scenes.length}.`}
${v.chapters ? `\n### YouTube chapters (paste into the description)\n${v.chapters.map(([t, n]) => `${t} ${n}`).join("\n")}\n` : ""}${v.metaMd ? `\n${v.metaMd}\n` : ""}${v.posts ? `\n${v.posts.map(([h, t]) => `### ${h}\n${t}`).join("\n\n")}\n` : ""}
${v.scenes.map(([t, prompt, en, kmL, onCam], i) => `### Scene ${i + 1} – ${t} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${prompt}${skyFor(v, i) ? ` ${skyFor(v, i)}` : ""}\nEnglish voice: ${audio("en", (i === 0 && v.host) || !!onCam, en)}\nKhmer voice: ${audio("km", (i === 0 && v.host) || !!onCam, kmFlow(kmL))}`).join("\n\n")}

## Voice-over – ${v.id === "long" ? "long YouTube video" : v.id === "story" ? "story video" : v.id === "easy" ? "take-it-easy video" : v.id === "yt8" ? "full fortune video" : `${v.secs}-second video`}
The same lines as the voice in each scene above, all together, for recording the voice yourself or with text-to-speech (then copy the scenes with plain "Copy", so Flow does not add a voice too).

### English
${v.scenes.map((x, i) => `Scene ${i + 1} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${x[2]}`).join("\n\n")}

### Khmer
${v.scenes.map((x, i) => `Scene ${i + 1} (${mmss(i * 10)}–${mmss(i * 10 + 10)})\n${kmSpeak(x[3])}`).join("\n\n")}

### Subtitles – Khmer (${iso}-${v.id}.srt)
\`\`\`
${srtVid[v.id].km}\`\`\`

### Subtitles – English (${iso}-${v.id}.en.srt)
\`\`\`
${srtVid[v.id].en}\`\`\``;
  // today's horoscope for all 12 signs, ready to copy into posts (the videos speak the same predictions)
  const anySite = Object.values(HORO).some((h) => h.site), anyCareful = Object.values(HORO).some((h) => h.en.careful);
  const horoBlock = (lang) => F.signs.map((sg) => {
    const a = sg.animal, H = HORO[a][lang], L = sg.lucky, nn = nums.find((x) => x.a === a), n3 = nn ? `${nn.d1} · ${nn.d2} · ${nn.d3}` : "";
    return (lang === "en"
      ? [`${EMO[a]} ${a} – ${sg.label.en}`, `General: ${H.general}`, `Love: ${H.love}`, `Work: ${H.career}`, `Money: ${H.money}`, H.careful && `Be careful: ${H.careful}`, `Advice: ${H.advice}`,
        `Lucky color: ${L.color.en} · Direction: ${L.direction.en} · Best time: ${L.time}${n3 ? ` · Lucky numbers: ${n3}` : ""}`]
      : [`${EMO[a]} ឆ្នាំ${sg.nameKm} – ${sg.label.km}`, `ទូទៅ៖ ${H.general}`, `ស្នេហា៖ ${H.love}`, `ការងារ៖ ${H.career}`, `លុយកាក់៖ ${H.money}`, H.careful && `ប្រយ័ត្ន៖ ${H.careful}`, `ដំបូន្មាន៖ ${H.advice}`,
        `ពណ៌សំណាង៖ ពណ៌${L.color.km} · ទិស${L.direction.km} · ពេលល្អ ${L.time}${n3 ? ` · លេខសំណាង៖ ${n3}` : ""}`]).filter(Boolean).join("\n");
  }).join("\n\n");
  const horoMd = `## Today's horoscope – all 12 signs
Each sign's prediction for ${D}: general luck, love, work, money${anyCareful ? ", what to be careful about" : ""} and advice, in English and Khmer, ready to copy into your Facebook, TikTok, Telegram and YouTube posts. The videos speak the same predictions: the 60-second video (the ${day}'s luck and love), the 180-second video (love, work and money), the long videos (every sign) and the full-fortune video. Lucky numbers are given only for today's lucky signs, as in the videos.
${anySite ? "Wording: the website's own written fortune for this date." : "Wording: the website's standard lines for each sign's rating (this date's written fortune is published on the website the day before; open the Studio at mybirthsign.com/studio/ then to use it)."}

### English
${horoBlock("en")}

${DISC_EN}

### Khmer
${horoBlock("km")}

${disclaimer}

`;
  const md = `# Daily video prompt pack — ${D} · ${day} day (ថ្ងៃឆ្នាំ${dayKm})

Lucky signs: ${lucky.join(", ")}${careful.length ? ` · Careful: ${careful.join(", ")}` : ""}
Day element: ${DEL.yy} ${DEL.el} ${DEL.emo} (${DEL.pillar} day; ធាតុ${DEL.km}) · every action scene today carries ${DEL.el} magic: ${DEL.fx}.
Format: vertical 9:16 (YouTube Shorts, Facebook Reels, TikTok), about 45 seconds: 4 Veo scenes of about 8 seconds, then a lucky-numbers scene of about 10–12 seconds.
Two versions: make the pictures once, then record a Khmer voice-over and an English voice-over (two videos, or one video with both subtitle tracks).
Ratings, lucky signs and lucky numbers come from the site's fixed rules and match the website's daily fortune for this date.${same ? "" : "\nVoice-over wording: standard script (this pack was made ahead; the site's own daily wording appears the day before)."}

${horoMd}## Luckiest animal today – ${day} (${km(day)}) · ${sign(day).label.en}
One hero post for the day's luckiest animal: a picture, a short video and a caption. Lucky color ${sign(day).lucky.color.en} (${sign(day).lucky.color.km}) · best time ${sign(day).lucky.time} · lucky numbers ${[nums[0].d1, nums[0].d2, nums[0].d3, nums[0].d4, nums[0].d5].join(" · ")} (for fun only).

### Picture prompt (square 1:1)
${HERO(day, DV(48, HERO_PLACES))}

### Video prompt for Flow (9:16, about 8 seconds)
Vertical 9:16. Photorealistic golden fantasy-epic style, the saved Flow character ${FLOW_NAME(day)}. ${cap(LOOK[day])} ${DV(49, [
  "sits peacefully on its glowing lotus under a huge full moon. A soft beam of moonlight falls on it, its golden details glow, and it rises gently into the air, floating slowly toward the moon with a trail of silver-gold sparkles and lotus petals.",
  "walks across the moonlit pond on lotus leaves that light up gold under it one by one, then stops in the middle and looks up at the huge full moon as sparkles rise around it.",
  "stands on the temple steps as hundreds of lanterns rise around it; it looks up, and a beam of moonlight lights it in gold as the lanterns drift toward the huge full moon.",
  "rests on a floating lotus as fireflies gather into a glowing ring around it, then the ring rises slowly into the sky toward the huge full moon.",
  "turns toward the camera on the temple causeway as golden petals swirl up around it in a spiral and drift away toward the huge full moon.",
  "appears in a burst of golden light on the temple terrace and looks up at the huge full moon as a shooting star crosses the sky behind it.",
  "sits beside the still pond as its golden reflection on the water begins to glow, and soft rings of light spread out toward the reflection of the huge full moon."])} ${cap(SYMBOL[day].mood)} mood. Slow, smooth camera move. No text.
${audio("en", false, `Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day! ${SYMBOL[day].en}`)}
Khmer audio (use instead for the Khmer video): ${audio("km", false, kmFlow(`ថ្ងៃនេះជាថ្ងៃឆ្នាំ${dayKm}! ${SYMBOL[day].km}`))}

### Caption – English
${SYMBOL[day].en} ${EMO[day]}🌕 Today, ${D}, is a ${sign(day).label.en} for the ${day}. Lucky numbers: ${nums[0].d1} · ${nums[0].d2} · ${nums[0].d3} (for fun only). All 12 signs: https://mybirthsign.com

### Caption – Khmer
${SYMBOL[day].km} ${EMO[day]}🌕 ថ្ងៃនេះ ${D} ជា${sign(day).label.km}សម្រាប់ឆ្នាំ${dayKm}។ លេខសំណាង៖ ${nums[0].d1} · ${nums[0].d2} · ${nums[0].d3} (សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ)។ មើលរាសីទាំង 12៖ https://mybirthsign.com/km/

${VIDEOS.map(videoMd).join("\n\n")}

## Keep the voice the same in every scene
Flow makes the voice fresh for every clip, so the voice text in every scene is written to describe exactly the same voice: the same words, in the same order, at the start of the audio line, for every scene and every video. To keep it that way:
- Always use "Copy + English voice" or "Copy + Khmer voice". Do not retype, shorten or translate the voice text, and do not add other words about the voice.
- Make all clips of one video in the same Flow project, with the same model and settings for every clip.
- Use the same language for the whole video (all English or all Khmer).
- Listen to each clip as it is made. If one sounds different, make only that clip again with the same copied prompt.

## Khmer voice – how to get clear Khmer
Every Khmer voice line in this pack is written for speaking: short sentences, a ។ at each pause, and numbers written out in Khmer words (for example ហុកសិបបួន, not 64) so the voice does not read them in English. Subtitles and captions keep the digits.

### If you use Google Flow
Use "Copy + Khmer voice" for each scene; the voice description is already included. Flow's Khmer can be unclear on some clips. Listen to every clip, and remake any clip where words are wrong, cut off or English-sounding. If Khmer stays unclear, make the clips without voice ("Copy") and add a recorded Khmer voice-over instead.

### If you use a text-to-speech app
- Language: Cambodian Khmer (km-KH). Pick a real Khmer voice, for example Microsoft Azure's female voice "km-KH-SreymomNeural" (used by many TTS apps and sites). Do not use an English voice with Khmer text.
- Speed: 0.85× to 0.9×. Pitch: natural. Pause between sentences: normal.
- Paste the Khmer voice-over text from this pack exactly as it is (Khmer script, no romanization).
- Make one scene at a time if the app cuts off long text, then join the clips in your editor.
- Before using a new voice, test it with these two sentences and listen carefully:
  សួស្តីអ្នកទាំងអស់គ្នា! សូមស្វាគមន៍មកកាន់ MyBirthSign.com។
  ថ្ងៃនេះជាថ្ងៃល្អសម្រាប់អ្នកកើតឆ្នាំខ្លា។ សូមជឿជាក់លើខ្លួនឯង ហើយកុំភ្លេចអត់ធ្មត់។
  Check that every word is clear Cambodian Khmer, sentence endings are complete, and speed and volume stay even.

### Record it yourself
A native speaker reading the Khmer voice-over slowly and clearly is always the most natural choice.

## Style (paste first in every scene)
${STYLE}

## Characters (already saved in Google Flow)
Your characters are saved in Flow as @Chanda and the 12 zodiac characters named after their animals: @Rat, @Ox, @Tiger, @Rabbit, @Dragon, @Snake, @Horse, @Goat, @Monkey, @Rooster, @Dog and @Pig. For each scene, add Chanda and the characters the prompt names as ingredients; the prompts below point to them with @ (for example @Snake), so keep the names in Flow exactly the same.

### Character reference image prompts
- **${HOST[0]} (${HOST[1]}), the presenter (make once, use in every video):** ${HOST_CHAR}
${inVideo.map((a) => `- **${a}:** ${CHAR(a)}`).join("\n")}

### Start-frame image prompts (make the picture, then animate it with "frames to video")
1. Vertical 9:16. Photorealistic golden fantasy-epic style, same saved Flow characters (Chanda and the zodiac characters named after their animals). ${cap(LOOK[day])} ${DV(50, ["stands on the worn stone steps of an ancient Khmer temple at dusk, carved sandstone towers behind it",
  "stands on a stone causeway lined with carved naga balustrades at dusk, temple towers behind it", "stands among the giant roots of an old banyan tree beside a Khmer temple at dusk",
  "stands at a temple gate between two carved stone lions at dusk", "stands on a wooden pier over a lotus lake at dusk, temple towers on the far shore",
  "stands in a temple courtyard of carved pillars at dusk, oil lamps glowing along the walls", "stands on a round stone platform in a lotus pond at dusk, temple towers behind it"])}, a full moon rising in a deep blue sky, warm last light on its face. Shallow depth of field. No text.
2. Vertical 9:16. Photorealistic golden fantasy-epic style, same saved Flow characters (Chanda and the zodiac characters named after their animals). ${cap(looks(lucky))} ${DV(51, ["together on the grass in front of an ancient Khmer temple at golden hour, palm trees and soft mist behind them",
  "together on the temple steps at golden hour, sky lanterns rising behind them", "together on a stone bridge over a lotus moat at golden hour, temple towers behind them",
  "together in a field of glowing golden rice beside a Khmer temple at golden hour", "together under a blossoming tree beside a Khmer temple at golden hour, petals drifting around them",
  "together on a wide temple terrace at golden hour, fireflies beginning to glow around them", "together beside a still lotus pond in front of a Khmer temple at golden hour, their reflections in the water"])}, warm light on their faces. Glowing golden aura, cute but powerful. No text.
${careful.length ? `3. Vertical 9:16. Photorealistic golden fantasy-epic style, same saved Flow characters (Chanda and the zodiac characters named after their animals). ${cap(LOOK[careful[0]])} resting quietly beside a still lotus pond at dusk, pink lotus flowers in the foreground, the reflection of a temple tower and the full moon on the water. Peaceful mood. No text.` : "3. Vertical 9:16. Photorealistic golden fantasy-epic style, same saved Flow characters (Chanda and the zodiac characters named after their animals). A still lotus pond at dusk, pink lotus flowers in the foreground, the reflection of a temple tower and the full moon on the water. Peaceful mood. No text."}
4. Vertical 9:16. Photorealistic golden fantasy-epic style, same saved Flow characters (Chanda and the zodiac characters named after their animals). A full moon rising over a wide lotus pond, the silhouette of an ancient Khmer temple with carved towers on the horizon, palm trees, soft mist on the water, deep blue dusk sky with open space at the top of the frame. No text.
5. Vertical 9:16. Photorealistic golden fantasy-epic style, same saved Flow characters (Chanda and the zodiac characters named after their animals). A huge glowing golden zodiac wheel with the twelve golden-armored zodiac guardians around its rim, floating in front of an ancient Khmer temple, lit by the full moon and golden light rays, pink lotus offerings below, open space in the middle and lower part of the frame for captions. No text.

### YouTube thumbnail image prompt
Vertical 9:16 (can be cropped to 16:9). Photorealistic golden fantasy-epic close-up of ${LOOK[day]} facing the viewer in warm golden evening light, an ancient Khmer temple and a glowing full moon softly blurred behind, ${lucky.filter((a) => a !== day).length ? `${looks(lucky.filter((a) => a !== day))} smaller in the background, ` : ""}glowing golden aura, vivid, powerful and eye-catching. No text, no letters, no logos. (Add the title and date in your editor.)

## Scene 1 – ${day} day (Chanda on camera)
${cap(HOST_LOOK)}, stands in front of the Angkor-style temple at night, facing the camera and speaking to the viewer with natural lip movements, then turns and gestures toward the pond. Chanda is the saved Flow character @Chanda. Then: magical and powerful. ${cap(LOOK[day])} stands on its glowing lotus pedestal on the pond in front of the Angkor-style temple under a huge full moon. Its eyes light up, a golden aura bursts around it, and it ${POSE[day]}. The lotus pond ripples with golden light, and ${DV(52, ["lanterns rise into the sky",
  "fireflies swirl up from the reeds", "golden petals whirl up around it", "a shower of tiny stars falls over the water", "rings of light spread across the pond",
  "sky lanterns drift up behind the temple", "mist swirls away in glowing rings"])}. Dynamic camera: start close on its face, then sweep up and follow it through the air. Cute, majestic and full of energy, matching the reference image.

## Scene 2 – Lucky signs
Magical and powerful. ${cap(looks(lucky))} fly in from three directions on trails of golden light and land together on glowing lotus pedestals in front of the temple. ${DV(53, ["As they land, a ring of golden energy explodes outward, lotus flowers bloom across the pond and a shower of sparkles and gold coins falls from the sky.",
  "As they land, the whole pond lights up gold beneath them and hundreds of lanterns rise into the sky.", "As they land, a swirl of golden petals spins up around them and opens like a giant lotus.",
  "As they land, thousands of fireflies burst up from the reeds and circle them like stars.", "As they land, bells ring out from the temple towers and rings of golden light ripple across the sky.",
  "As they land, a rain of tiny golden stars falls gently over the pond.", "As they land, long ribbons of golden light unfurl from the temple towers and wave above them."])} They look at each other and cheer. The camera orbits around them in a smooth circle. The animals match the reference images.

## Scene 3 – ${careful.length ? `${careful.join(", ")}, take it easy` : "A calm moment"}
${careful.length ? `Photorealistic golden fantasy-epic style, same saved Flow characters (Chanda and the zodiac characters named after their animals). ${cap(LOOK[careful[0]])} rests on a lotus pedestal by the pond: it ${DV(41, REST_ACT, 7)}, and the full moon shines calmly on the still water. The mood is peaceful, safe and magical, not sad. The camera moves in slowly. The ${careful[0].toLowerCase()} is the saved Flow character ${FLOW_NAME(careful[0])}.` : "Photorealistic golden fantasy-epic style, same saved Flow characters (Chanda and the zodiac characters named after their animals). A still lotus pond at dusk, pink lotus flowers swaying gently, the reflection of a temple tower and the full moon shimmering on the water. The camera moves in slowly."}

## Scene 4 – Outro
Magical and powerful. ${cap(DV(31, FINALE_SKY, 4))}, and the huge full moon glows over the pond. The camera rises up and pulls back for a wide, epic view, leaving open sky at the top of the frame for a title.

## Scene 5 – Lucky numbers (about 10–12 seconds)
Magical and powerful. A huge glowing golden zodiac wheel rises out of the lotus pond in front of the temple, with the twelve golden-armored zodiac guardians around its rim. It spins faster and faster, shooting beams of golden light and sparkles, then slows to a gentle, shining turn under the full moon. The camera slowly pushes in, keeping open space in the middle and lower part of the frame for the number captions. (Loop the slow-turning part, or slow-zoom a still picture, to fill the time.)

## On-screen captions (add in the editor)
### Khmer version
1. ជោគជតារាសីប្រចាំថ្ងៃនេះ · ${D} · ថ្ងៃឆ្នាំ${dayKm}
2. ${luckyLabelsKm}
${careful.length ? `3. ${careful.map((a) => `ឆ្នាំ${km(a)} – ${sign(a).label.km} · គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ`).join(" ")}` : "3. —"}
4. ចូលមើលលម្អិតនៅ mybirthsign.com
5. លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង
${nums.map((n) => numLine(n, `ឆ្នាំ${km(n.a)}`)).join("\n")}
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
  ["1", `Today is ${/^[AEIOU]/.test(day) ? "an" : "a"} ${day} day! Here is your Chinese zodiac fortune for ${LD.replace(/^\w+, /, "")}.`, `ជោគជតារាសីប្រចាំថ្ងៃនេះ ថ្ងៃទី ${Number(iso.slice(8))} ខែ${["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"][Number(iso.slice(5,7))-1]}។ ថ្ងៃនេះជាថ្ងៃឆ្នាំ${dayKm}!`],
  ["2", `${list(lucky)} are the luckiest signs today!`, `${kmList(lucky.map((a) => `ឆ្នាំ${km(a)}`))} មានសំណាងល្អជាងគេនៅថ្ងៃនេះ!`],
  ["3", careful.length ? `${list(careful)}, take it easy today. Slow down and rest.` : "Take a calm breath and enjoy the day.", careful.length ? `${kmList(careful.map((a) => `ឆ្នាំ${km(a)}`))} គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ។` : "សូមឲ្យថ្ងៃនេះស្ងប់ស្ងាត់ និងរីករាយ។"],
  ["5", `For lucky numbers: ${nums.map((n) => `${n.a} ${n.d2}`).join(", ")}! Comment your lucky number and say it again!`, `សម្រាប់លេខសំណាង៖ ${nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2}`).join(" ")}! សូមសរសេរលេខសំណាងរបស់អ្នក ហើយនិយាយម្ដងទៀត!`],
  ["4", "See all twelve signs at mybirthsign dot com. Have a lucky day!", "ចូលមើលរាសីទាំង 12 នៅ mybirthsign.com។ សូមឲ្យមានសំណាងល្អ!"],
].map(([n, en, kmL]) => `- **Scene ${n}**\n  - English: ${audio("en", n === "1", en)}\n  - Khmer: ${audio("km", n === "1", kmFlow(kmL))}`).join("\n")}

## Voice-over – Khmer (about 45 seconds)
${voiceKm.map(kmSpeak).join("\n")}

## Voice-over – English (about 45 seconds)
${voiceEn.join("\n")}

(Record the voices yourself or use text-to-speech; AI video tools may not pronounce Khmer well.)

## YouTube
### Title – Khmer
ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃឆ្នាំ${dayKm}

### Title – English
Daily Chinese Zodiac Fortune – ${D} | ${day} Day

### Description – Khmer
${summaryKm}

${inVideo.map((a) => `ឆ្នាំ${km(a)}៖ ពណ៌${sign(a).lucky.color.km} · ${sign(a).lucky.time}`).join("\n")}

លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង (1 ដល់ 5 ខ្ទង់)៖
${nums.map((n) => numLine(n, `ឆ្នាំ${km(n.a)}`)).join("\n")}

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
🌙 ជោគជតារាសីប្រចាំថ្ងៃនេះ – ${D} | ថ្ងៃឆ្នាំ${dayKm} ${EMO[day]}

✨ ឆ្នាំសំណាងថ្ងៃនេះ៖ ${lucky.map((a) => `ឆ្នាំ${km(a)} (${sign(a).label.km})`).join(" · ")}
${careful.length ? `🌿 គួរប្រុងប្រយ័ត្ន៖ ${careful.map((a) => `ឆ្នាំ${km(a)}`).join(" ")} – គួរសម្រាកឲ្យស្រួលខ្លួន ធ្វើអ្វីៗយឺតៗ និងកុំប្រញាប់ក្នុងការសម្រេចចិត្ត។\n` : ""}
🔢 លេខសំណាងថ្ងៃនេះ សម្រាប់ឆ្នាំសំណាង៖
${nums.map((n) => numLine(n, `ឆ្នាំ${km(n.a)}`)).join("\n")}

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
ជោគជតារាសីថ្ងៃនេះ ${D} ${EMO[day]} ថ្ងៃឆ្នាំ${dayKm}! ឆ្នាំសំណាង៖ ${lucky.map((a) => `ឆ្នាំ${km(a)}`).join(" ")} ✨ លេខសំណាង៖ ${nums.map((n) => `ឆ្នាំ${km(n.a)} ${n.d2}`).join(" · ")} 🔢 ឆ្នាំអ្នកជាអ្វី? Comment ប្រាប់ផង 👇 (សម្រាប់ការកម្សាន្តប៉ុណ្ណោះ) Link នៅក្នុង bio 🌙
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
  return `# 12 Zodiac Characters — the look you chose (see characters/*.jpg for the approved examples)\n\n# 12 Zodiac Characters — master prompts (photorealistic fantasy-epic style)\n\n**Your characters are saved in Google Flow, named after their animals: @Rat, @Ox, @Tiger, @Rabbit, @Dragon, @Snake, @Horse, @Goat, @Monkey, @Rooster, @Dog and @Pig** (each a guardian warrior with their animal), plus @Chanda the presenter. Every video prompt points to them with @, so keep the names in Flow exactly as written. The prompts below are only needed if you ever want to make a character again.\n\n## ${HOST[0]} (${HOST[1]}) – the presenter\n${HOST_CHAR}\n\n${ORDER.map((a) => `## ${a} (${KM_NAMES[a]})\n${CHAR(a)}\n`).join("\n")}`;
}
