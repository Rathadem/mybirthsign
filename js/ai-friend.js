/* MyBirthSign AI Friend — chat panel.
 *
 * Loaded on demand by js/ai-friend-loader.js the first time a visitor opens the chat.
 * It exposes window.MBSAiFriend { open, close, toggle, setBrain }.
 *
 * PHASE 3: names, birthdays and clarifications are handled by the built-in parser; everything
 * else goes to the secure Netlify Function /.netlify/functions/ai-friend (Claude). If that is
 * unreachable the scripted guide answers. Phase 4 connects the real calculators.
 *
 * Safety: all visitor text is shown with textContent (never as HTML).
 */
(function () {
  "use strict";
  if (window.MBSAiFriend) return;

  /* ------------------------------------------------------------------ strings */
  var UI = {
    en: {
      title: "Kru Toch ✨", sub: "Your Friendly Zodiac Guide",
      placeholder: "Type your message…", send: "Send message", close: "Close chat",
      newChat: "Start a new chat", micStart: "Start voice input", micStop: "Stop voice input",
      micDenied: "Voice input isn't available right now. You can type instead. 😊",
      log: "Conversation", quick: "Quick actions",
      note: "Kru Toch is MyBirthSign's AI zodiac guide, not a person. Chinese zodiac readings are traditional interpretations for entertainment.",
      chips: [["zodiac", "🐉 My Zodiac"], ["love", "❤️ Love & Compatibility"], ["business", "💼 Business Partner"], ["wedding", "💍 Wedding Date"], ["learn", "📖 Learn About Zodiac"]],
      hello: "Hi, my friend! 👋 I'm Kru Toch ✨\nI'm your friendly zodiac guide at MyBirthSign.\n\nI can help you discover your Chinese zodiac, explore love compatibility, business partnerships, wedding dates, and more. 😊\n\nWhat's your name?",
      nice: "Nice to meet you, {NAME}! 😊\nAnd what's your date of birth? 📅",
      niceKnown: "What would you like to explore today? Your zodiac, love, a business partner, a wedding date, or anything you're curious about. ✨",
      great: "Nice! 😊 I have your birthday as {DATE}.\nWould you like to discover your Chinese zodiac, personality, compatibility, business partnership, or something else?",
      ambiguous: "Just to make sure I have it right 😊 — do you mean {A} or {B}?",
      badDate: "Hmm, I couldn't quite read that date. 🤔 Could you write it like 1 January 1989?",
      rangeDate: "I can work with birth dates from 1900 up to today. 📅 Could you double-check the year?",
      nameAsk: "By the way, what's your name? 😊",
      dobAsk: "And what's your date of birth? 📅",
      withDob: " Just enter {DATE} there.",
      zodiac: "Absolutely! 😊 Let's take a look. The Chinese Zodiac Checker shows your animal, element, lucky signs and more.",
      love: "Sure, my friend! ❤️ The Compatibility page compares two birth dates for love, friendship and more.",
      business: "Good thinking! 💼 The Business Partner page looks at how two people's zodiac signs may work together.",
      wedding: "How exciting! 💍 The Wedding Date page shows traditionally favorable months for two people.",
      learn: "Let's start with the basics! 📖 The Zodiac Guide covers all 12 animals, and the blog has deeper stories.",
      fallback: "That's interesting! 😊 Here's where I can guide you right now. Pick one below, or tell me a bit more.",
      links: { zodiac: [["Open the Zodiac Checker →", "/checker"]], love: [["Check Compatibility →", "/compatibility"]], business: [["Check Business Match →", "/business-partner"]], wedding: [["Find a Good Date →", "/wedding-date"]], learn: [["Zodiac Guide →", "/zodiac-guide"], ["Read the Blog →", "/blog"]] },
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      fmt: function (d, m, y, M) { return M[m - 1] + " " + d + ", " + y; },
      fmtShort: function (d, m, M) { return d + " " + M[m - 1]; }
    },
    km: {
      title: "គ្រូតូច ✨", sub: "អ្នកណែនាំរាសីដ៏រួសរាយរបស់អ្នក",
      placeholder: "វាយសាររបស់អ្នក…", send: "ផ្ញើសារ", close: "បិទការជជែក",
      newChat: "ចាប់ផ្តើមការជជែកថ្មី", micStart: "ចាប់ផ្តើមនិយាយ", micStop: "ឈប់ស្តាប់",
      micDenied: "ឥឡូវនេះមិនអាចប្រើសំឡេងបានទេ។ អ្នកអាចវាយអក្សរជំនួសបាន។ 😊",
      log: "ការសន្ទនា", quick: "ជម្រើសរហ័ស",
      note: "គ្រូតូចជាមិត្ត AI ជាកម្មវិធីបញ្ញាសិប្បនិម្មិត មិនមែនមនុស្សពិតទេ។ ការទស្សន៍ទាយរាសីជាការបកស្រាយតាមប្រពៃណី សម្រាប់ការកំសាន្ត។",
      chips: [["zodiac", "🐉 រាសីរបស់ខ្ញុំ"], ["love", "❤️ ស្នេហា និងភាពត្រូវគ្នា"], ["business", "💼 ដៃគូអាជីវកម្ម"], ["wedding", "💍 ថ្ងៃរៀបការ"], ["learn", "📖 ស្វែងយល់អំពីរាសី"]],
      hello: "សួស្តី! 👋 ខ្ញុំគឺ គ្រូតូច ✨\nI'm your friendly zodiac guide at MyBirthSign.\n\nI can help you discover your Chinese zodiac, explore love compatibility, business partnerships, wedding dates, and more. 😊\n\nWhat's your name?",
      nice: "រីករាយដែលបានស្គាល់អ្នក {NAME}! 😊\nតើថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកនៅពេលណា? 📅",
      niceKnown: "ថ្ងៃនេះអ្នកចង់ស្វែងយល់អ្វី? រាសីរបស់អ្នក ស្នេហា ដៃគូអាជីវកម្ម ថ្ងៃរៀបការ ឬអ្វីដែលអ្នកចង់ដឹង។ ✨",
      great: "ល្អណាស់! 😊 ខ្ញុំកត់ទុកថា ថ្ងៃកំណើតរបស់អ្នកគឺ {DATE}។\nតើអ្នកចង់ស្វែងយល់អំពីរាសីចិន បុគ្គលិកលក្ខណៈ ភាពត្រូវគ្នា ដៃគូអាជីវកម្ម ឬអ្វីផ្សេងទៀត?",
      ambiguous: "សូមបញ្ជាក់ឱ្យប្រាកដ 😊 — តើអ្នកចង់និយាយថា {A} ឬ {B}?",
      badDate: "ហ៊ឹម ខ្ញុំអានថ្ងៃខែនេះមិនទាន់ច្បាស់ទេ។ 🤔 តើអ្នកអាចសរសេរដូចជា ១ មករា ១៩៨៩ បានទេ?",
      rangeDate: "ខ្ញុំអាចជួយបានសម្រាប់ថ្ងៃកំណើតពីឆ្នាំ ១៩០០ ដល់បច្ចុប្បន្ន។ 📅 សូមពិនិត្យឆ្នាំម្តងទៀត។",
      nameAsk: "ហើយអ្នកឈ្មោះអ្វី? 😊",
      dobAsk: "ហើយថ្ងៃខែឆ្នាំកំណើតរបស់អ្នកនៅពេលណា? 📅",
      withDob: " គ្រាន់តែបញ្ចូល {DATE} នៅទីនោះ។",
      zodiac: "បាទ/ចាស! 😊 តោះមើលទាំងអស់គ្នា។ ឧបករណ៍ពិនិត្យរាសីបង្ហាញសត្វឆ្នាំ ធាតុ លេខសំណាង និងច្រើនទៀតរបស់អ្នក។",
      love: "បាទ/ចាស មិត្តអើយ! ❤️ ទំព័រភាពត្រូវគ្នាប្រៀបធៀបថ្ងៃកំណើតពីរ សម្រាប់ស្នេហា មិត្តភាព និងច្រើនទៀត។",
      business: "គំនិតល្អ! 💼 ទំព័រដៃគូអាជីវកម្មមើលពីរបៀបដែលសត្វឆ្នាំរបស់មនុស្សពីរនាក់អាចធ្វើការជាមួយគ្នា។",
      wedding: "រំភើបណាស់! 💍 ទំព័រថ្ងៃរៀបការបង្ហាញខែដែលល្អតាមប្រពៃណីសម្រាប់មនុស្សពីរនាក់។",
      learn: "តោះចាប់ផ្តើមពីមូលដ្ឋាន! 📖 មគ្គុទេសក៍រាសីមានសត្វឆ្នាំទាំង ១២ ហើយប្លុកមានរឿងលម្អិតបន្ថែម។",
      fallback: "គួរឱ្យចាប់អារម្មណ៍ណាស់! 😊 នេះជាកន្លែងដែលខ្ញុំអាចណែនាំអ្នកបាន។ សូមជ្រើសរើសខាងក្រោម ឬប្រាប់ខ្ញុំបន្ថែម។",
      links: { zodiac: [["បើកឧបករណ៍ពិនិត្យរាសី →", "/checker"]], love: [["ពិនិត្យភាពត្រូវគ្នា →", "/compatibility"]], business: [["ពិនិត្យដៃគូអាជីវកម្ម →", "/business-partner"]], wedding: [["ស្វែងរកថ្ងៃល្អ →", "/wedding-date"]], learn: [["មគ្គុទេសក៍រាសី →", "/zodiac-guide"], ["អានប្លុក →", "/blog"]] },
      months: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
      fmt: function (d, m, y, M) { return khDigits(d) + " " + M[m - 1] + " " + khDigits(y); },
      fmtShort: function (d, m, M) { return khDigits(d) + " " + M[m - 1]; }
    }
  };

  function khDigits(n) { return String(n).replace(/\d/g, function (c) { return "០១២៣៤៥៦៧៨៩".charAt(+c); }); }

  /* ------------------------------------------------------------- date parsing */
  var MONTHS = {
    1: ["january", "jan", "janvier", "enero", "januar", "gennaio", "janeiro", "januari", "មករា", "มกราคม", "जनवरी", "ម.ក"],
    2: ["february", "feb", "février", "fevrier", "febrero", "februar", "febbraio", "fevereiro", "februari", "pebrero", "កុម្ភៈ", "กุมภาพันธ์", "फ़रवरी", "फरवरी"],
    3: ["march", "mar", "mars", "marzo", "märz", "maerz", "março", "marco", "maret", "marso", "មីនា", "มีนาคม", "मार्च"],
    4: ["april", "apr", "avril", "abril", "aprile", "មេសា", "เมษายน", "अप्रैल"],
    5: ["may", "mai", "mayo", "maggio", "maio", "mei", "mayo", "ឧសភា", "พฤษภาคม", "मई"],
    6: ["june", "jun", "juin", "junio", "juni", "giugno", "junho", "hunyo", "មិថុនា", "มิถุนายน", "जून"],
    7: ["july", "jul", "juillet", "julio", "juli", "luglio", "julho", "hulyo", "កក្កដា", "กรกฎาคม", "जुलाई"],
    8: ["august", "aug", "août", "aout", "agosto", "agustus", "ogos", "សីហា", "สิงหาคม", "अगस्त"],
    9: ["september", "sept", "sep", "septembre", "septiembre", "setiembre", "settembre", "setembro", "setyembre", "កញ្ញា", "กันยายน", "सितंबर", "सितम्बर"],
    10: ["october", "oct", "octobre", "octubre", "oktober", "ottobre", "outubro", "oktubre", "តុលា", "ตุลาคม", "अक्टूबर"],
    11: ["november", "nov", "novembre", "noviembre", "novembro", "nobyembre", "វិច្ឆិកា", "พฤศจิกายน", "नवंबर", "नवम्बर"],
    12: ["december", "dec", "décembre", "decembre", "diciembre", "dezember", "dicembre", "dezembro", "desember", "disember", "disyembre", "ធ្នូ", "ธันวาคม", "दिसंबर", "दिसम्बर"]
  };
  var MONTH_LIST = [];
  Object.keys(MONTHS).forEach(function (k) { MONTHS[k].forEach(function (n) { MONTH_LIST.push([n, +k]); }); });
  MONTH_LIST.sort(function (a, b) { return b[0].length - a[0].length; });

  function asciiDigits(s) {
    return s.replace(/[០-៩]/g, function (c) { return String(c.charCodeAt(0) - 0x17E0); })
      .replace(/[๐-๙]/g, function (c) { return String(c.charCodeAt(0) - 0x0E50); })
      .replace(/[٠-٩]/g, function (c) { return String(c.charCodeAt(0) - 0x0660); })
      .replace(/[०-९]/g, function (c) { return String(c.charCodeAt(0) - 0x0966); })
      .replace(/[０-９]/g, function (c) { return String(c.charCodeAt(0) - 0xFF10); });
  }

  function realDate(y, m, d) {
    var dt = new Date(y, m - 1, d);
    return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d ? dt : null;
  }

  function check(y, m, d, extra) {
    if (m < 1 || m > 12 || d < 1 || d > 31) return { status: "invalid" };
    if (y < 1900 || y > 2060) return { status: "range" };
    var dt = realDate(y, m, d);
    if (!dt) return { status: "invalid" };
    if (dt.getTime() > Date.now()) return { status: "range" };
    var out = { status: "ok", y: y, m: m, d: d };
    if (extra) for (var k in extra) out[k] = extra[k];
    return out;
  }

  /* Is m/d before that year's Lunar New Year? Uses the site's own CNY table when the page has it;
     otherwise treats January and February as "could be either side" so we ask rather than guess. */
  function beforeLNY(y, m, d) {
    var cny = null;
    try { if (typeof CNY_DATES !== "undefined" && CNY_DATES[y]) cny = CNY_DATES[y]; } catch (e) { /* ignore */ }
    if (!cny) return m <= 2 ? "jan-feb:" + m + "-" + d : "after";
    var cm = +cny.slice(0, 2), cd = +cny.slice(3, 5);
    return (m < cm || (m === cm && d < cd)) ? "before" : "after";
  }

  /* Returns null (no date in the text) or {status:'ok'|'ambiguous'|'invalid'|'range', ...}.
     Never guesses an ambiguous day/month order. */
  function parseBirthDate(raw) {
    if (!raw) return null;
    var s = asciiDigits(String(raw)).toLowerCase();
    var m;

    // 1989年1月1日 / 1989년 1월 1일
    m = s.match(/(\d{4})\s*[年년]\s*(\d{1,2})\s*[月월]\s*(\d{1,2})\s*[日일]?/);
    if (m) return check(+m[1], +m[2], +m[3]);

    // Vietnamese: ngày 1 tháng 1 năm 1989
    m = s.match(/(\d{1,2})\D{0,8}th[áa]ng\s*(\d{1,2})\D{0,8}n[ăa]m\s*(\d{4})/);
    if (m) return check(+m[3], +m[2], +m[1]);

    // ISO / year-first: 1989-01-01, 1989/1/1, 1989.01.01
    m = s.match(/(?:^|\D)(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:\D|$)/);
    if (m) return check(+m[1], +m[2], +m[3]);

    // numeric with month name: "1 January 1989", "January 1, 1989", "១ មករា ១៩៨៩", "1 มกราคม 1989"
    var monthNum = 0, name = "";
    for (var i = 0; i < MONTH_LIST.length; i++) {
      var n = MONTH_LIST[i][0];
      var at = s.indexOf(n);
      if (at < 0) continue;
      if (/^[a-z]/.test(n)) { // latin names must be whole words so "mar" doesn't match "market"
        var before = s.charAt(at - 1), after = s.charAt(at + n.length);
        if (/[a-zà-ÿ]/.test(before) || /[a-zà-ÿ]/.test(after)) continue;
      }
      monthNum = MONTH_LIST[i][1]; name = n; break;
    }
    if (monthNum) {
      var rest = s.replace(name, " ");
      var nums = rest.match(/\d+/g) || [];
      var year = 0, day = 0, big = 0;
      nums.forEach(function (x) { if (x.length === 4) { year = +x; big++; } else if (x.length <= 2 && !day) day = +x; });
      if (big === 1 && day) {
        var be = false;
        if (year > 2100 && year <= 2600 && /[฀-๿]/.test(s)) { year -= 543; be = true; } // Thai Buddhist Era
        return check(year, monthNum, day, be ? { be: true } : null);
      }
      return { status: "invalid" };
    }

    // dd/mm/yyyy (the site's format)
    m = s.match(/(?:^|\D)(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})(?:\D|$)/);
    if (m) {
      var a = +m[1], b = +m[2], yy = +m[3];
      // The site's date format is dd/mm/yyyy, so 03/04/1989 is 3 April 1989 (never asked twice).
      // Only when the second number cannot be a month (e.g. 12/25/1990) is it read as month/day.
      if (a <= 12 && b <= 12 && a !== b) {
        // Both readings are real dates. Only ask when swapping day and month would change the zodiac sign.
        var r1 = check(yy, b, a), r2 = check(yy, a, b);
        if (r1.status === "ok" && r2.status === "ok" && beforeLNY(yy, b, a) !== beforeLNY(yy, a, b))
          return { status: "ambiguous", y: yy, options: [{ d: a, m: b }, { d: b, m: a }] };
      }
      if (b <= 12) return check(yy, b, a);
      if (a <= 12) return check(yy, a, b);
      return { status: "invalid" };
    }
    return null;
  }

  /* --------------------------------------------------------------- state */
  var KEY = "mbsAiFriendV1";
  var state = { msgs: [], mem: { name: "", dob: null, pending: null, topic: "" }, greeted: false };

  function load() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (raw) { var o = JSON.parse(raw); if (o && o.msgs && o.mem) state = o; }
    } catch (e) { /* storage unavailable: keep in memory */ }
  }
  function save() {
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function lang() {
    var l = "en";
    try { if (typeof getLang === "function") l = getLang(); else l = document.documentElement.lang || "en"; } catch (e) { /* ignore */ }
    return String(l).toLowerCase().indexOf("km") === 0 ? "km" : "en";
  }
  function T() { return UI[lang()]; }
  function hasKhmer(s) { return /[ក-៿]/.test(s || ""); }
  function replyLang(userText) { return hasKhmer(userText) ? "km" : lang(); }

  function fmtDob(dob, L) {
    var t = UI[L];
    return t.fmt(dob.d, dob.m, dob.y, t.months);
  }

  /* --------------------------------------------------------------- the guide brain (Phase 2) */
  var INTENTS = [
    ["wedding", /wedding|marry|marriage|married|engage|ការរៀបការ|រៀបការ|មង្គលការ|婚|結婚|결혼|แต่งงาน|boda|mariage|hochzeit|matrimonio|casamento|pernikahan|perkahwinan|kasal|शादी|vivah/i],
    ["business", /business|company|co-?founder|work partner|investor|startup|អាជីវកម្ម|ជំនួញ|ក្រុមហ៊ុន|商|生意|ビジネス|사업|ธุรกิจ|negocio|affaires|geschäft|negozio|negócio|bisnis|perniagaan|negosyo|व्यापार|kinh doanh/i],
    ["love", /love|compatib|romance|girlfriend|boyfriend|wife|husband|crush|relationship|dating|ស្នេហា|ភាពត្រូវគ្នា|ប្រពន្ធ|ប្តី|មិត្តស្រី|មិត្តប្រុស|爱|恋|情|相性|궁합|사랑|ความรัก|คู่|amor|amour|liebe|amore|cinta|pag-ibig|प्यार|yêu|tình/i],
    ["learn", /learn|guide|about (the )?zodiac|animals?|blog|history|meaning|elements?|រៀន|ស្វែងយល់|មគ្គុទេសក៍|សត្វ|ធាតុ|了解|学|学ぶ|배우|เรียนรู้|aprender|apprendre|lernen|imparare|aprender|belajar|matuto|सीख|tìm hiểu/i],
    ["zodiac", /zodiac|my sign|my animal|which animal|what animal|year of|chinese sign|រាសី|ឆ្នាំ|សត្វឆ្នាំ|生肖|属相|干支|십이지|띠|ราศี|นักษัตร|zodiaco|signe|sternzeichen|segno|zodíaco|zodiak|shio|ज्योतिष|राशि|con giáp|tuổi/i]
  ];
  function detectIntent(text) {
    for (var i = 0; i < INTENTS.length; i++) if (INTENTS[i][1].test(text)) return INTENTS[i][0];
    return "";
  }

  var NAME_PREFIX = /^(?:hi|hello|hey|សួស្តី|សួរស្តី)?[\s,!.]*(?:my name is|i am|i'm|im|call me|this is|name'?s|ខ្ញុំឈ្មោះ|ខ្ញុំគឺ|ខ្ញុំ|ឈ្មោះ|我叫|我是|私は|저는|ฉันชื่อ|je m'appelle|me llamo|ich heiße|ich bin|mi chiamo|meu nome é|nama saya|ako si|ako ay|मेरा नाम|tôi là|tên tôi là)\s+/i;
  var NOT_NAMES = /^(?:hi|hello|hey|hiya|yo|ok|okay|yes|no|yeah|sure|thanks|thank you|fine|good|great|well|nothing|none|help|hello there|សួស្តី|សួរស្តី|ចាស|បាទ|បាទ\/ចាស|អរគុណ|ទេ|មាន|ល្អ|你好|こんにちは|안녕|สวัสดี|bonjour|hola|hallo|ciao|olá|halo|kamusta|नमस्ते|xin chào)$/i;
  function extractName(text) {
    var t = String(text).trim().replace(/[.!?。！？]+$/, "");
    if (!t || t.length > 40 || /\d/.test(t)) return "";
    t = t.replace(NAME_PREFIX, "").trim();
    t = t.replace(/\s+(?:ហើយ|ចាស|បាទ|ណា)$/, "");
    if (!t || t.split(/\s+/).length > 4) return "";
    if (detectIntent(t)) return "";
    if (NOT_NAMES.test(t)) return "";
    return t.replace(/^./, function (c) { return c.toUpperCase(); });
  }

  function linkSet(intent, L) { return (UI[L].links[intent] || []).map(function (x) { return { text: x[0], href: x[1] }; }); }

  var FIRST_RE = /\b(first|1st|former|the first one|option a)\b|ទីមួយ|ទី១|第一|最初|첫|แรก|primer|premier|erste|primo|pertama|पहला/i;
  var SECOND_RE = /\b(second|2nd|latter|the second one|option b|other one)\b|ទីពីរ|ទី២|第二|二番|두 번째|ที่สอง|segundo|deuxième|zweite|secondo|kedua|ikalawa|दूसरा|thứ hai/i;
  function pickPending(text, pend) {
    var low = asciiDigits(text).toLowerCase(), pick = null;
    ["en", "km"].forEach(function (Lx) {
      var tx = UI[Lx];
      pend.options.forEach(function (o, idx) {
        var label = asciiDigits(tx.fmtShort(o.d, o.m, tx.months)).toLowerCase();
        if (!pick && (low.indexOf(label) >= 0 || (low.indexOf(String.fromCharCode(97 + idx)) === 0 && low.length < 3))) pick = o;
      });
    });
    if (!pick && SECOND_RE.test(low)) pick = pend.options[1];
    if (!pick && FIRST_RE.test(low)) pick = pend.options[0];
    if (!pick) {
      // just a month name ("December") that matches only one of the two options
      var hits = pend.options.filter(function (o) {
        return [UI.en.months[o.m - 1], UI.km.months[o.m - 1]].some(function (n) { return low.indexOf(n.toLowerCase()) >= 0; });
      });
      if (hits.length === 1) pick = hits[0];
    }
    if (!pick) {
      var again = parseBirthDate(text); // or they typed a full, clear date
      if (again && again.status === "ok") pick = { d: again.d, m: again.m, y: again.y };
    }
    return pick;
  }

  // brain(text, ctx) -> Promise<{ parts: [{text, links?}] }>.  Phase 3 swaps this out.
  function guideBrain(text, ctx) {
    var mem = ctx.mem, L = replyLang(text), t = UI[L], parts = [], intent = ctx.intent || detectIntent(text);

    // 1) a pending "which date did you mean?" answer
    if (mem.pending) {
      var pend = mem.pending, pick = pickPending(text, pend);
      if (pick && pend.forPartner) {
        mem.partner = { y: pick.y || pend.y, m: pick.m, d: pick.d }; mem.pending = null;
        var tp = mem.topic && t[mem.topic] ? mem.topic : "love";
        return Promise.resolve({ parts: [{ text: t[tp], links: linkSet(tp, L) }] }); // offline fallback; apiBrain normally handles this
      }
      if (pick) {
        mem.dob = { y: pend.y, m: pick.m, d: pick.d };
        if (pick.y) mem.dob.y = pick.y;
        mem.pending = null;
        parts.push({ text: t.great.replace("{DATE}", fmtDob(mem.dob, L)) });
        return Promise.resolve({ parts: parts });
      }
    }

    // 2) a date in the message
    var pd = parseBirthDate(text);
    if (pd) {
      if (pd.status === "ambiguous") {
        mem.pending = { y: pd.y, options: pd.options };
        var A = t.fmtShort(pd.options[0].d, pd.options[0].m, t.months), B = t.fmtShort(pd.options[1].d, pd.options[1].m, t.months);
        return Promise.resolve({ parts: [{ text: t.ambiguous.replace("{A}", A + " " + (L === "km" ? khDigits(pd.y) : pd.y)).replace("{B}", B + " " + (L === "km" ? khDigits(pd.y) : pd.y)) }] });
      }
      if (pd.status === "invalid") return Promise.resolve({ parts: [{ text: t.badDate }] });
      if (pd.status === "range") return Promise.resolve({ parts: [{ text: t.rangeDate }] });
      mem.dob = { y: pd.y, m: pd.m, d: pd.d };
      var msg = t.great.replace("{DATE}", fmtDob(mem.dob, L));
      if (!mem.name) msg += "\n\n" + t.nameAsk;
      return Promise.resolve({ parts: [{ text: msg }] });
    }

    // 3) a topic (button or typed)
    if (intent) {
      mem.topic = intent;
      var body = t[intent];
      if (intent === "zodiac" && mem.dob) body += t.withDob.replace("{DATE}", fmtDob(mem.dob, L));
      parts.push({ text: body, links: linkSet(intent, L) });
      if (!mem.name) parts.push({ text: t.nameAsk });
      else if (!mem.dob) parts.push({ text: t.dobAsk });
      return Promise.resolve({ parts: parts });
    }

    // 4) the visitor's name
    if (!mem.name) {
      var nm = extractName(text);
      if (nm) {
        mem.name = nm;
        var niceText = t.nice.replace("{NAME}", nm);
        // birthday already given first: don't ask for it again, go straight to the options
        if (mem.dob) niceText = niceText.split("\n")[0] + "\n" + t.niceKnown;
        return Promise.resolve({ parts: [{ text: niceText }] });
      }
    }

    // 5) anything else
    var fb = { text: t.fallback };
    if (!mem.name) return Promise.resolve({ parts: [fb, { text: t.nameAsk }] });
    if (!mem.dob) return Promise.resolve({ parts: [fb, { text: t.dobAsk }] });
    return Promise.resolve({ parts: [fb] });
  }

  /* Phase 3: Claude brain. Names, birthdays and clarifications stay with the deterministic
     parser above (exact, free, instant). Everything else goes to the secure Netlify Function;
     if it is unreachable the scripted guide answers instead, so the chat never breaks. */
  var ANIMAL_WORDS = [
    ["Rat", /\brat\b|ជូត|鼠/i], ["Ox", /\box\b|\bbuffalo\b|ឆ្លូវ|牛/i], ["Tiger", /\btiger\b|ខាល|虎/i], ["Rabbit", /\brabbit\b|\bhare\b|ថោះ|兔/i],
    ["Dragon", /\bdragon\b|រោង|[龙龍]/i], ["Snake", /\bsnake\b|ម្សាញ់|蛇/i], ["Horse", /\bhorse\b|មមី|[马馬]/i], ["Goat", /\bgoat\b|\bsheep\b|\bram\b|មមែ|羊/i],
    ["Monkey", /\bmonkey\b|វក|猴/i], ["Rooster", /\brooster\b|\bchicken\b|រកា|[鸡雞]/i], ["Dog", /\bdog\b|狗/i], ["Pig", /\bpig\b|\bboar\b|កុរ|[猪豬]/i]];
  function detectAnimal(t) { var hit = ""; ANIMAL_WORDS.forEach(function (a) { if (!hit && a[1].test(t)) hit = a[0]; }); return hit; }
  var SELF_MARKER = /\b(i am|i'm|im|my (?:sign|zodiac|animal|year)|born (?:in|as)|year of the)\b|ខ្ញុំ|ឆ្នាំ|我是|属|屬|生肖/i;
  var PARTNER_RE = /partner|wife|husband|girlfriend|boyfriend|spouse|fianc|lover|ប្រពន្ធ|ប្តី|ប្ដី|សង្សារ|គូ|妻|夫|彼女|彼氏|아내|남편|vợ|chồng|pareja|esposa|marido|femme|mari|ehefrau|ehemann|moglie|marito|esposa|istri|suami|asawa|पत्नी|पति|ภรรยา|สามี/i;
  var API_URL = "/.netlify/functions/ai-friend";
  function apiBrain(text, ctx) {
    var mem = ctx.mem, intent = ctx.intent || detectIntent(text);
    var pairTopic = (intent || mem.topic) === "love" || (intent || mem.topic) === "business" || (intent || mem.topic) === "wedding";
    var pd = null, partnerPicked = false;
    if (mem.pending && mem.pending.forPartner) {
      // the visitor is answering "did you mean A or B?" about the partner's birthday
      var pk = pickPending(text, mem.pending);
      var pend = mem.pending; mem.pending = null;
      if (pk) { mem.partner = { y: pk.y || pend.y, m: pk.m, d: pk.d }; partnerPicked = true; }
    }
    // visitor moved on without answering "which date did you mean?": drop the question, don't get stuck
    if (mem.pending && !pickPending(text, mem.pending)) mem.pending = null;
    if (!partnerPicked) pd = mem.pending ? null : parseBirthDate(text);
    var partnerish = mem.dob && pd && (pairTopic || PARTNER_RE.test(text));
    if (partnerish && pd.status === "ambiguous") {
      // unclear partner date: ask which one, and remember the answer is for the partner (the visitor's own date stays)
      var L = replyLang(text), t = UI[L], yy = L === "km" ? khDigits(pd.y) : pd.y;
      mem.pending = { y: pd.y, options: pd.options, forPartner: true };
      return Promise.resolve({ parts: [{ text: t.ambiguous.replace("{A}", t.fmtShort(pd.options[0].d, pd.options[0].m, t.months) + " " + yy).replace("{B}", t.fmtShort(pd.options[1].d, pd.options[1].m, t.months) + " " + yy) }] });
    }
    if (partnerish && pd.status === "ok") {
      // a second, clear date while the topic involves two people = the partner's birthday (the visitor's own stays)
      mem.partner = { y: pd.y, m: pd.m, d: pd.d };
    } else if (mem.pending || pd) return guideBrain(text, ctx);
    // visitor gives only a year or an animal (no full birthday yet): remember it so Claude can give a base answer
    var an = pd ? "" : detectAnimal(text), shortMsg = text.trim().length <= 16;
    var aboutPartner = PARTNER_RE.test(text) || /\b(brother|sister|friend|boss|colleague|co-?founder|mother|father|mom|dad|son|daughter)\b|បងប្រុស|បងស្រី|ប្អូនប្រុស|ប្អូនស្រី|មិត្តភក្តិ|ម្តាយ|ឪពុក|កូន/i.test(text);
    var yr = pd ? null : /(?:^|\D)((?:19|20)\d{2})(?:\D|$)/.exec(asciiDigits(text));
    var yrOk = yr && +yr[1] <= new Date().getFullYear() && text.length <= 120;
    if (!pd && !mem.partner && aboutPartner && (an || yrOk)) {
      // "My wife is a Tiger" / "ប្រពន្ធខ្ញុំកើត 1990": this is about the other person, even before we know the visitor's own date
      if (an) mem.partnerAnimal = an;
      if (yrOk && (intent || mem.topic) !== "wedding") mem.partnerYear = +yr[1];
    } else if (!pd && !mem.dob) {
      if (yrOk && text.length <= 90) mem.selfYear = +yr[1];
      if (an && (shortMsg || SELF_MARKER.test(text))) mem.selfAnimal = an;
    } else if (!pd && mem.dob && !mem.partner && an && pairTopic && (shortMsg || SELF_MARKER.test(text))) {
      mem.partnerAnimal = an;
    } else if (!pd && mem.dob && !mem.partner && yrOk && (intent || mem.topic) !== "wedding" && pairTopic) {
      mem.partnerYear = +yr[1];
    }
    if (!pd) { var wy = /\b(20[2-3]\d)\b/.exec(text); if (wy && (intent || mem.topic) === "wedding") mem.weddingYear = +wy[1]; }
    if (!mem.name && !intent && extractName(text)) return guideBrain(text, ctx);
    var msgs = ctx.history.map(function (m) { return { role: m.r === "user" ? "user" : "assistant", content: m.t }; });
    if (mem.topic === "" && intent) mem.topic = intent;
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 15000);
    return fetch(API_URL, {
      method: "POST", headers: { "content-type": "application/json" }, signal: ctl ? ctl.signal : undefined,
      body: JSON.stringify({ messages: msgs, context: { name: mem.name, dob: mem.dob, partner: mem.partner || null, partnerYear: mem.partnerYear || null, selfYear: mem.dob ? null : (mem.selfYear || null), selfAnimal: mem.dob ? null : (mem.selfAnimal || ""), partnerAnimal: mem.partnerAnimal || "", weddingYear: mem.weddingYear || null, topic: intent || mem.topic } })
    }).then(function (r) {
      if (r.status === 429) return { rate: true };
      if (!r.ok) throw new Error("api " + r.status);
      return r.json();
    }).then(function (d) {
      clearTimeout(timer);
      if (d.rate) return { parts: [{ text: lang() === "km" ? "ចាំបន្តិចមិត្តអើយ 😊 សូមសាកល្បងម្តងទៀតក្នុងរយៈពេលមួយភ្លែតទៀត។" : "Let's slow down just a little, my friend 😊 Please try again in a minute." }] };
      if (!d || !d.reply) throw new Error("empty");
      if (intent) mem.topic = intent;
      var links = intent ? linkSet(intent, replyLang(text)) : null;
      return { parts: [{ text: d.reply, links: links && links.length ? links : undefined }] };
    }).catch(function () {
      clearTimeout(timer);
      return guideBrain(text, ctx);
    });
  }

  var brain = apiBrain;

  /* --------------------------------------------------------------- DOM */
  var panel, log, form, input, sendBtn, micBtn, quick, titleEl, subEl, noteEl, closeBtn, newBtn, srStatus;
  var opener = null, isOpen = false, busy = false, savedOverflow = "";

  var AVATAR_SVG = function () {
    var src = window.__mbsAiLauncher && window.__mbsAiLauncher.querySelector("svg");
    return src ? src.outerHTML.replace(/mbsAi([GB])/g, "mbsAiP$1") : "";
  };

  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  var ICON = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    again: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6l.1 6.5L15 12 3.5 13.9z"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>'
  };

  function buildPanel() {
    if (panel) return;
    panel = el("section", "mbs-ai-panel", { id: "mbs-ai-panel", role: "dialog", "aria-modal": "false", "aria-labelledby": "mbs-ai-title", "data-open": "false" });

    var head = el("div", "mbs-ai-head");
    var av = el("span"); av.innerHTML = AVATAR_SVG(); head.appendChild(av.firstChild || av);
    var tt = el("div", "mbs-ai-title");
    titleEl = el("strong", "", { id: "mbs-ai-title", tabindex: "-1" });
    subEl = el("span");
    tt.appendChild(titleEl); tt.appendChild(subEl); head.appendChild(tt);
    newBtn = el("button", "mbs-ai-iconbtn", { type: "button" }); newBtn.innerHTML = ICON.again;
    closeBtn = el("button", "mbs-ai-iconbtn", { type: "button" }); closeBtn.innerHTML = ICON.close;
    head.appendChild(newBtn); head.appendChild(closeBtn);

    log = el("div", "mbs-ai-log", { role: "log", "aria-live": "polite", "aria-relevant": "additions", tabindex: "0" });
    quick = el("div", "mbs-ai-quick", { role: "group" });
    form = el("form", "mbs-ai-form", { autocomplete: "off", novalidate: "" });
    var lab = el("label", "mbs-ai-sr", { for: "mbs-ai-input" }); lab.id = "mbs-ai-label";
    input = el("textarea", "mbs-ai-input", { id: "mbs-ai-input", rows: "1", maxlength: "500", enterkeyhint: "send", autocapitalize: "sentences" });
    micBtn = el("button", "mbs-ai-mic", { type: "button", "aria-pressed": "false", hidden: "" }); micBtn.innerHTML = ICON.mic;
    sendBtn = el("button", "mbs-ai-send", { type: "submit" }); sendBtn.innerHTML = ICON.send; sendBtn.disabled = true;
    form.appendChild(lab); form.appendChild(input); form.appendChild(micBtn); form.appendChild(sendBtn);
    noteEl = el("p", "mbs-ai-note");
    srStatus = el("div", "mbs-ai-sr", { role: "status", "aria-live": "polite" });

    panel.appendChild(head); panel.appendChild(log); panel.appendChild(quick); panel.appendChild(form); panel.appendChild(noteEl); panel.appendChild(srStatus);
    document.body.appendChild(panel);
    panel.__label = lab;

    // events
    closeBtn.addEventListener("click", close);
    newBtn.addEventListener("click", resetChat);
    form.addEventListener("submit", function (e) { e.preventDefault(); submit(); });
    input.addEventListener("input", function () { grow(); sendBtn.disabled = !input.value.trim(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); submit(); }
    });
    panel.addEventListener("keydown", onKeydown);
    setupVoice();
    window.addEventListener("resize", onViewport);
    if (window.visualViewport) { window.visualViewport.addEventListener("resize", onViewport); window.visualViewport.addEventListener("scroll", onViewport); }
    new MutationObserver(function () { applyLang(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    applyLang();
  }

  function applyLang() {
    if (!panel) return;
    var t = T();
    titleEl.textContent = t.title; subEl.textContent = t.sub;
    input.placeholder = t.placeholder; panel.__label.textContent = t.placeholder;
    sendBtn.setAttribute("aria-label", t.send); closeBtn.setAttribute("aria-label", t.close); newBtn.setAttribute("aria-label", t.newChat);
    newBtn.title = t.newChat; closeBtn.title = t.close;
    log.setAttribute("aria-label", t.log); quick.setAttribute("aria-label", t.quick);
    noteEl.textContent = t.note;
    micBtn.setAttribute("aria-label", micOn ? t.micStop : t.micStart); micBtn.title = micBtn.getAttribute("aria-label");
    quick.textContent = "";
    t.chips.forEach(function (c) {
      var b = el("button", "mbs-ai-chip", { type: "button", "data-intent": c[0] });
      b.textContent = c[1];
      b.addEventListener("click", function () { userSays(c[1], c[0]); });
      quick.appendChild(b);
    });
  }

  function grow() { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 120) + "px"; }

  function scrollDown() { log.scrollTop = log.scrollHeight; }

  function addRow(role, text, links) {
    var row = el("div", "mbs-ai-row " + role);
    if (role === "bot") { var a = el("span"); a.innerHTML = AVATAR_SVG(); if (a.firstChild) row.appendChild(a.firstChild); }
    var b = el("div", "mbs-ai-bubble");
    b.textContent = text;
    if (links && links.length) {
      var wrap = el("div", "mbs-ai-links");
      links.forEach(function (l) { var a2 = el("a", "mbs-ai-link", { href: l.href }); a2.textContent = l.text; wrap.appendChild(a2); });
      b.appendChild(wrap);
    }
    row.appendChild(b);
    log.appendChild(row);
    scrollDown();
    return row;
  }

  function typing() {
    var row = el("div", "mbs-ai-row bot");
    var a = el("span"); a.innerHTML = AVATAR_SVG(); if (a.firstChild) row.appendChild(a.firstChild);
    var b = el("div", "mbs-ai-bubble mbs-ai-typing", { "aria-label": "…" }); b.innerHTML = "<i></i><i></i><i></i>";
    row.appendChild(b); log.appendChild(row); scrollDown();
    return row;
  }

  function pause(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function reduced() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

  function botSays(parts) {
    // parts: [{text, links}]; shows a short typing pause before each part
    var chain = Promise.resolve();
    parts.forEach(function (p) {
      chain = chain.then(function () {
        var tp = typing();
        return pause(reduced() ? 150 : Math.min(1100, 420 + p.text.length * 7)).then(function () {
          tp.remove();
          addRow("bot", p.text, p.links);
          state.msgs.push({ r: "bot", t: p.text, l: p.links || null });
          save();
        });
      });
    });
    return chain;
  }

  function greet() {
    if (state.greeted) return;
    state.greeted = true; save();
    var L = lang();
    return botSays([{ text: UI[L].hello }]);
  }

  function renderHistory() {
    log.textContent = "";
    state.msgs.forEach(function (m) { addRow(m.r === "user" ? "user" : "bot", m.t, m.l); });
  }

  function userSays(text, intent) {
    if (busy) return;
    text = String(text || "").trim();
    if (!text) return;
    if (micOn) stopVoice();
    addRow("user", text);
    state.msgs.push({ r: "user", t: text });
    input.value = ""; grow(); sendBtn.disabled = true;
    busy = true; sendBtn.disabled = true;
    var ctx = { mem: state.mem, intent: intent || "", lang: lang(), history: state.msgs.slice(-12) };
    Promise.resolve(brain(text, ctx)).then(function (res) {
      return botSays(res.parts || []);
    }).catch(function () {
      return botSays([{ text: lang() === "km" ? "សូមអភ័យទោស មានបញ្ហាបន្តិច។ សូមព្យាយាមម្តងទៀត។" : "Sorry, something went wrong on my side. Please try again. 🙏" }]);
    }).then(function () { busy = false; sendBtn.disabled = !input.value.trim(); save(); });
  }

  function submit() { userSays(input.value); input.focus(); }

  function resetChat() {
    state = { msgs: [], mem: { name: "", dob: null, pending: null, topic: "" }, greeted: false };
    save(); log.textContent = ""; busy = false; greet(); input.focus();
  }

  /* --------------------------------------------------------------- voice (Web Speech API, optional) */
  var recog = null, micOn = false;
  function setupVoice() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return; // not supported: the mic button simply stays hidden
    micBtn.hidden = false;
    micBtn.addEventListener("click", function () { micOn ? stopVoice() : startVoice(SR); });
  }
  function startVoice(SR) {
    try {
      recog = new SR();
      recog.lang = lang() === "km" ? "km-KH" : (navigator.language || "en-US");
      recog.interimResults = true; recog.continuous = false; recog.maxAlternatives = 1;
      var base = input.value ? input.value + " " : "";
      recog.onresult = function (e) {
        var txt = "";
        for (var i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
        input.value = base + txt; grow(); sendBtn.disabled = !input.value.trim();
      };
      recog.onerror = function (e) {
        if (e && (e.error === "not-allowed" || e.error === "service-not-allowed")) addRow("bot", T().micDenied);
        setMic(false);
      };
      recog.onend = function () { setMic(false); };
      recog.start(); setMic(true);
    } catch (e) { setMic(false); }
  }
  function stopVoice() { try { recog && recog.stop(); } catch (e) { /* ignore */ } setMic(false); }
  function setMic(on) {
    micOn = on; micBtn.setAttribute("aria-pressed", on ? "true" : "false");
    micBtn.setAttribute("aria-label", on ? T().micStop : T().micStart); micBtn.title = micBtn.getAttribute("aria-label");
  }

  /* --------------------------------------------------------------- open / close / focus */
  function isPhone() { return window.matchMedia && window.matchMedia("(max-width: 640px)").matches; }

  function onViewport() {
    if (!isOpen) return;
    if (isPhone() && window.visualViewport) {
      panel.style.setProperty("--af-vh", window.visualViewport.height + "px");
      panel.style.top = window.visualViewport.offsetTop + "px";
    } else {
      panel.style.removeProperty("--af-vh"); panel.style.removeProperty("top");
    }
    scrollDown();
  }

  function focusables() {
    return Array.prototype.filter.call(panel.querySelectorAll("button,a[href],textarea,[tabindex]:not([tabindex='-1'])"), function (n) {
      return !n.disabled && !n.hidden && n.offsetParent !== null;
    });
  }
  function onKeydown(e) {
    if (e.key === "Escape") { e.stopPropagation(); close(); return; }
    if (e.key === "Tab" && isPhone()) { // full-screen on phones: keep Tab inside the dialog
      var f = focusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function open(from) {
    buildPanel();
    if (isOpen) return;
    opener = from || window.__mbsAiLauncher || document.activeElement;
    isOpen = true;
    panel.setAttribute("aria-modal", isPhone() ? "true" : "false");
    renderHistory();
    panel.setAttribute("data-open", "true");
    if (window.__mbsAiLauncher) { window.__mbsAiLauncher.hidden = true; window.__mbsAiLauncher.setAttribute("aria-expanded", "true"); }
    if (isPhone()) { savedOverflow = document.documentElement.style.overflow; document.documentElement.style.overflow = "hidden"; }
    onViewport();
    greet();
    // phones: don't pop the keyboard straight away; desktop: focus the field
    setTimeout(function () { (isPhone() ? titleEl : input).focus({ preventScroll: true }); }, 60);
  }

  function close() {
    if (!isOpen) return;
    if (micOn) stopVoice();
    isOpen = false;
    panel.setAttribute("data-open", "false");
    document.documentElement.style.overflow = savedOverflow;
    var l = window.__mbsAiLauncher;
    if (l) { l.hidden = false; l.setAttribute("aria-expanded", "false"); }
    var back = (l && !l.hidden) ? l : opener;
    if (back && back.focus) back.focus({ preventScroll: true });
  }

  // The site's language switch reloads the page. If the chat was open, bring it back afterwards
  // (only for that case: ordinary page-to-page navigation never re-opens the chat over the page).
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest && e.target.closest("[data-lang-switch]");
    if (t && isOpen) { try { sessionStorage.setItem("mbsAiReopen", "1"); } catch (x) { /* ignore */ } }
  }, true);

  load();

  window.MBSAiFriend = {
    open: open, close: close,
    toggle: function (from) { isOpen ? close() : open(from); },
    setBrain: function (fn) { if (typeof fn === "function") brain = fn; },
    _parseBirthDate: parseBirthDate // exposed for the test page only
  };
})();
