// netlify/functions/zodiac-reading.js
//
// Serverless proxy to the Anthropic API. The ANTHROPIC_API_KEY lives only
// in Netlify's environment variables (Site settings > Environment variables)
// and is never sent to the browser — the frontend calls this function at
// /.netlify/functions/zodiac-reading instead of calling Anthropic directly.
//
// Request body (JSON):
//   { animal, element, month, day, lang, question? }
// - animal/element/month/day/lang describe the person's zodiac result.
// - question, if present, is one of a fixed set of follow-up keys from the
//   frontend's "chip" buttons (never free text from the visitor), so we can
//   safely map it to a specific question server-side.
//
// Response (JSON): { reading: "<ai text>" }  or  { error: "<message>" }

const VALID_ANIMALS = [
  "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
  "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
];
const VALID_ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"];

const CLASH_ANIMAL = {
  Rat: "Horse", Ox: "Goat", Tiger: "Monkey", Rabbit: "Rooster",
  Dragon: "Dog", Snake: "Pig", Horse: "Rat", Goat: "Ox",
  Monkey: "Tiger", Rooster: "Rabbit", Dog: "Dragon", Pig: "Snake"
};

const FOLLOWUP_PROMPTS = {
  year_ahead: {
    en: (a, e) => `Write one short, warm paragraph (3-4 sentences) about what the coming year is likely to hold for a ${e} ${a} in the Chinese zodiac — focus on general themes (energy, opportunities, things to watch for), not specific dates or predictions presented as fact.`,
    km: (a, e) => `សូមសរសេរអត្ថបទខ្លីមួយកថាខណ្ឌ (3-4ល្បះ) ជាភាសាខ្មែរ អំពីអ្វីដែលឆ្នាំខាងមុខអាចនាំមកសម្រាប់ជនជាតិរាសី${e} ${a} តាមប្រតិទិនចិន — ផ្តោតលើប្រធានបទទូទៅ (ថាមពល ឱកាស អ្វីដែលត្រូវប្រុងប្រយ័ត្ន) មិនមែនកាលបរិច្ឆេទជាក់លាក់ ឬការទស្សន៍ទាយដែលបង្ហាញជាការពិត។`,
    zh: (a, e) => `请用简体中文写一段简短、温暖的文字（3-4 句），介绍在中国生肖中属${e}${a}的人来年可能遇到的情况——着重于整体主题（能量、机会、需要注意的事），不要写具体日期，也不要把预测当作事实。数字请用阿拉伯数字。`
  },
  luck_boost: {
    en: (a, e) => `Write one short, practical paragraph (3-4 sentences) with friendly suggestions for how a ${e} ${a} in the Chinese zodiac might boost their luck or energy right now, in a fun, encouraging tone — not superstition presented as fact.`,
    km: (a, e) => `សូមសរសេរអត្ថបទខ្លីមួយកថាខណ្ឌ (3-4ល្បះ) ជាភាសាខ្មែរ ដែលផ្តល់យោបល់ជាក់ស្តែង និងរីករាយ អំពីរបៀបដែលជនជាតិរាសី${e} ${a} អាចបង្កើនសំណាង ឬថាមពលរបស់ខ្លួននាពេលនេះ ជាសម្លេងលើកទឹកចិត្ត។`,
    zh: (a, e) => `请用简体中文写一段简短、实用的文字（3-4 句），以轻松、鼓励的语气，为在中国生肖中属${e}${a}的人提出现在可以如何提升运气或精力的友好建议——不要把迷信当作事实。数字请用阿拉伯数字。`
  },
  career_fit: {
    en: (a, e) => `Write one short paragraph (3-4 sentences) about career paths and working styles that tend to suit a ${e} ${a} in the Chinese zodiac, framed as general personality-based tendencies, not guarantees.`,
    km: (a, e) => `សូមសរសេរអត្ថបទខ្លីមួយកថាខណ្ឌ (3-4ល្បះ) ជាភាសាខ្មែរ អំពីមុខរបរ និងរបៀបធ្វើការដែលសមស្របនឹងជនជាតិរាសី${e} ${a} ដោយផ្អែកលើទំនោរបុគ្គលិកលក្ខណៈទូទៅ មិនមែនការធានា។`,
    zh: (a, e) => `请用简体中文写一段简短的文字（3-4 句），介绍通常适合在中国生肖中属${e}${a}的人的职业方向和工作方式，以一般性格倾向来表述，而不是保证。数字请用阿拉伯数字。`
  },
  clash_relationship: {
    en: (a, e, clash) => `Write one short, balanced paragraph (3-4 sentences) about how a ${e} ${a} in the Chinese zodiac can get along well with a ${clash}, since these two signs are traditionally considered a "clash" pairing — keep it constructive and practical, not fatalistic.`,
    km: (a, e, clash) => `សូមសរសេរអត្ថបទខ្លីមួយកថាខណ្ឌ (3-4ល្បះ) ជាភាសាខ្មែរ អំពីរបៀបដែលជនជាតិរាសី${e} ${a} អាចរស់នៅដោយសុខដុមជាមួយជនជាតិរាសី${clash} ដោយសារសញ្ញាទាំងពីរនេះត្រូវបានចាត់ទុកថាជា "ប្រឆាំង" គ្នាតាមទំនៀមទម្លាប់ — សូមរក្សាសម្លេងស្ថាបនា និងជាក់ស្តែង មិនមែនអវិជ្ជមានទាំងស្រុង។`,
    zh: (a, e, clash) => `请用简体中文写一段简短、平衡的文字（3-4 句），说明在中国生肖中属${e}${a}的人如何与属${clash}的人好好相处——这两个生肖在传统上被视为“相冲”。请保持建设性和实用性，不要宿命论。数字请用阿拉伯数字。`
  }
};

const ZH_A = { Rat: "鼠", Ox: "牛", Tiger: "虎", Rabbit: "兔", Dragon: "龙", Snake: "蛇", Horse: "马", Goat: "羊", Monkey: "猴", Rooster: "鸡", Dog: "狗", Pig: "猪" };
const ZH_E = { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" };

function initialReadingPrompt(animal, element, month, day, lang) {
  if (lang === "zh") {
    return `请用简体中文为一位 ${month} 月 ${day} 日出生、中国生肖属${ZH_E[element]}${ZH_A[animal]}的人写一段简短的个人解读（2 小段，每段约 3-4 句）。要有个人感、温暖、鼓励，不要空泛。不要声称这是科学预测。数字请用阿拉伯数字。`;
  }
  if (lang === "km") {
    return `សូមសរសេរការទស្សន៍ទាយផ្ទាល់ខ្លួនខ្លីមួយ (2 កថាខណ្ឌខ្លីៗ ប្រហែល 3-4ល្បះក្នុងមួយកថាខណ្ឌ) ជាភាសាខ្មែរ សម្រាប់អ្នកដែលកើតនៅខែ${month} ថ្ងៃទី${day} ហើយមានរាសីចិនជា${element} ${animal}។ សូមឱ្យវាមានលក្ខណៈផ្ទាល់ខ្លួន កក់ក្តៅ និងលើកទឹកចិត្ត ជៀសវាងពាក្យទូទៅហួសហេតុ។ កុំនិយាយថានេះជាការទស្សន៍ទាយវិទ្យាសាស្ត្រ។`;
  }
  return `Write a short, personalized reading (2 short paragraphs, about 3-4 sentences each) for someone born on month ${month}, day ${day}, whose Chinese zodiac sign is the ${element} ${animal}. Make it feel personal, warm, and encouraging — not generic. Don't claim this is scientific prediction.`;
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server not configured" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { animal, element, month, day, lang, question } = body;

  if (!VALID_ANIMALS.includes(animal) || !VALID_ELEMENTS.includes(element)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid animal/element" }) };
  }
  const safeLang = lang === "km" || lang === "zh" ? lang : "en";
  const safeMonth = Number.isInteger(month) && month >= 1 && month <= 12 ? month : 1;
  const safeDay = Number.isInteger(day) && day >= 1 && day <= 31 ? day : 1;

  let prompt;
  if (question && FOLLOWUP_PROMPTS[question]) {
    const clash = CLASH_ANIMAL[animal];
    prompt = safeLang === "zh"
      ? FOLLOWUP_PROMPTS[question].zh(ZH_A[animal], ZH_E[element], ZH_A[clash])
      : FOLLOWUP_PROMPTS[question][safeLang](animal, element, clash);
  } else {
    prompt = initialReadingPrompt(animal, element, safeMonth, safeDay, safeLang);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return { statusCode: 502, body: JSON.stringify({ error: "Upstream error" }) };
    }

    const data = await response.json();
    const text = (data.content && data.content[0] && data.content[0].text) || "";

    if (!text) {
      return { statusCode: 502, body: JSON.stringify({ error: "Empty reading" }) };
    }

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reading: text })
    };
  } catch (err) {
    console.error("zodiac-reading function error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Unexpected error" }) };
  }
};
