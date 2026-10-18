/* Khmer Lunar Calendar page (khmer-calendar.html).
   Every lunar date, moon day, holy day and lunar holiday is calculated with js/vendor/momentkh.min.js
   (traditional Khmer calendar rules, the same library the Zodiac Checker uses). Nothing is guessed.
   Lunar holidays follow their fixed lunar dates:
     Meak Bochea 15 waxing Meak · Visak Bochea 15 waxing Pisak · Royal Ploughing 4 waning Pisak
     Asalha Puja 15 waxing Asadh (2nd Asadh in leap years) · Chol Vassa 1 waning of that month
     Pchum Ben: Kan Ben from 1 waning Phatrabot, holiday on the last two waning days and 1 waxing Assoch
     Chenh Vassa 15 waxing Assoch · Water Festival 14-15 waxing and 1 waning Kadeuk
     Khmer New Year: from Moha Songkran (momentkh getNewYear) to Loeng Sak (the day the Sak changes)
     Holy days (Thngai Sil): 8 and 15 waxing, 8 waning and the last waning day of every month.
   Fixed-date national days are listed by date; the official public-holiday list is set each year by sub-decree. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var SITE = document.documentElement.getAttribute("data-site-lang");
  var lang = SITE || "en";
  var DAY = 864e5;
  var shown = new Date(); shown = new Date(shown.getFullYear(), shown.getMonth(), 1);
  var selected = new Date(); selected.setHours(0, 0, 0, 0);

  var MEN = ["Migasir", "Boss", "Meak", "Phalkun", "Chet", "Pisak", "Jesth", "Asadh", "Srap", "Phatrabot", "Assoch", "Kadeuk", "1st Asadh", "2nd Asadh"];
  var AEN = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var AZH = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  var AEMO = ["🐀", "🐂", "🐅", "🐇", "🐉", "🐍", "🐎", "🐐", "🐒", "🐓", "🐕", "🐖"];
  var SAK_EN = ["Samrithisak", "Ekasak", "Tosak", "Treisak", "Chattvasak", "Panchasak", "Chhasak", "Saptasak", "Atthasak", "Noppasak"];

  var W = {
    en: {
      eyebrow: "Cambodian Heritage · Lunar & Solar Dates", title: "Khmer Lunar Calendar",
      intro: "Every day of the year with its Khmer lunar date, moon day, holy days and Cambodian celebrations, calculated with the traditional Khmer calendar rules.",
      today: "Today", jump: "Jump to date", details: "Selected date", greg: "Gregorian date", lunar: "Khmer lunar date",
      note: "Lunar dates are calculated with the traditional Khmer calendar rules (the open-source momentkh library, also used by our Zodiac Checker). Official public holidays are confirmed each year by the Royal Government of Cambodia, so check the announcement before you plan travel.",
      events: "Holidays & observances", upcoming: "Coming up",
      eventsText: "Lunar holidays move with the moon; national days keep the same date every year.",
      rowEvent: "Holiday / observance", rowMoon: "Moon day", rowYear: "Khmer year", none: "No holiday or holy day",
      f1: "🌙 Lunar dates", f1d: "Koeut (waxing) and Roach (waning) days with the correct month names.",
      f2: "🪷 Buddhist holy days", f2d: "Thngai Sil and the full-moon festivals, worked out for every month.",
      f3: "🇰🇭 Cambodian holidays", f3d: "Khmer New Year, Pchum Ben, the Water Festival and national days.",
      f4: "☯️ Animal year & Sak", f4d: "Each date shows its Khmer animal year, Sak and Buddhist Era.",
      f5: "🗓️ Leap months", f5d: "Years with two Asadh months, such as 2026 and 2029, are handled automatically.",
      key: ["🌑 Last waning day", "🌓 8th day", "🌕 Full moon", "🪷 Buddhist day", "🏯 Holiday", "🚣 Water Festival", "• Holy day (Sil)"],
      week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      waxing: "waxing", waning: "waning", sil: "Holy day", langs: ["English", "Khmer", "Chinese"],
      footer: "Lunar dates: traditional Khmer calendar rules (momentkh)",
    },
    km: {
      eyebrow: "មរតកខ្មែរ · កាលបរិច្ឆេទចន្ទគតិ និងសុរិយគតិ", title: "ប្រតិទិនចន្ទគតិខ្មែរ",
      intro: "ថ្ងៃនីមួយៗក្នុងឆ្នាំ ជាមួយថ្ងៃខែតាមចន្ទគតិខ្មែរ ថ្ងៃកើត ថ្ងៃរោច ថ្ងៃសីល និងពិធីបុណ្យខ្មែរ ដែលគណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី។",
      today: "ថ្ងៃនេះ", jump: "ជ្រើសរើសកាលបរិច្ឆេទ", details: "កាលបរិច្ឆេទដែលបានជ្រើស", greg: "កាលបរិច្ឆេទសុរិយគតិ", lunar: "កាលបរិច្ឆេទចន្ទគតិខ្មែរ",
      note: "ថ្ងៃខែចន្ទគតិត្រូវបានគណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី (បណ្ណាល័យកូដចំហ momentkh ដែលម៉ាស៊ីនពិនិត្យរាសីរបស់យើងប្រើផងដែរ)។ ថ្ងៃឈប់សម្រាកផ្លូវការ ត្រូវបានរាជរដ្ឋាភិបាលកម្ពុជាប្រកាសរៀងរាល់ឆ្នាំ ដូច្នេះសូមពិនិត្យសេចក្តីប្រកាសមុនរៀបចំការធ្វើដំណើរ។",
      events: "ថ្ងៃបុណ្យ និងថ្ងៃសីល", upcoming: "ខាងមុខនេះ",
      eventsText: "ពិធីបុណ្យតាមចន្ទគតិប្តូរថ្ងៃតាមព្រះចន្ទ ចំណែកទិវាជាតិនៅថ្ងៃដដែលរៀងរាល់ឆ្នាំ។",
      rowEvent: "ថ្ងៃបុណ្យ / ពិធី", rowMoon: "ថ្ងៃចន្ទគតិ", rowYear: "ឆ្នាំខ្មែរ", none: "មិនមែនថ្ងៃបុណ្យ ឬថ្ងៃសីលទេ",
      f1: "🌙 កាលបរិច្ឆេទចន្ទគតិ", f1d: "ថ្ងៃកើត និងថ្ងៃរោច ព្រមទាំងឈ្មោះខែដែលត្រឹមត្រូវ។",
      f2: "🪷 ថ្ងៃសីល", f2d: "ថ្ងៃសីល និងពិធីបុណ្យពេញបូណ៌មី សម្រាប់គ្រប់ខែ។",
      f3: "🇰🇭 ពិធីបុណ្យខ្មែរ", f3d: "ចូលឆ្នាំខ្មែរ ភ្ជុំបិណ្ឌ បុណ្យអុំទូក និងទិវាជាតិ។",
      f4: "☯️ ឆ្នាំសត្វ និងស័ក", f4d: "ថ្ងៃនីមួយៗបង្ហាញឆ្នាំសត្វ ស័ក និងពុទ្ធសករាជ។",
      f5: "🗓️ ខែអធិកមាស", f5d: "ឆ្នាំដែលមានខែអាសាឍពីរ ដូចជាឆ្នាំ 2026 និង 2029 ត្រូវបានគណនាដោយស្វ័យប្រវត្តិ។",
      key: ["🌑 ថ្ងៃរោចចុងខែ", "🌓 ថ្ងៃ 8", "🌕 ពេញបូណ៌មី", "🪷 ថ្ងៃបុណ្យសាសនា", "🏯 ថ្ងៃបុណ្យ", "🚣 បុណ្យអុំទូក", "• ថ្ងៃសីល"],
      week: ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"],
      months: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
      waxing: "កើត", waning: "រោច", sil: "ថ្ងៃសីល", langs: ["English", "ខ្មែរ", "中文"],
      footer: "ថ្ងៃខែចន្ទគតិ៖ វិធានប្រតិទិនខ្មែរបែបប្រពៃណី (momentkh)",
    },
    zh: {
      eyebrow: "柬埔寨文化 · 阴历与阳历", title: "高棉农历",
      intro: "一年中的每一天，附有高棉农历日期、上弦与下弦日、佛教斋日和柬埔寨节日，均按传统高棉历法规则计算。",
      today: "今天", jump: "跳转日期", details: "所选日期", greg: "公历日期", lunar: "高棉农历日期",
      note: "农历日期按传统高棉历法规则计算（开源程序库 momentkh，我们的生肖查询也使用它）。官方公共假期由柬埔寨王国政府每年公布，出行前请查看当年的公告。",
      events: "节日与佛教斋日", upcoming: "即将到来",
      eventsText: "农历节日随月亮变化，国家纪念日每年日期不变。",
      rowEvent: "节日 / 纪念日", rowMoon: "农历日", rowYear: "高棉年", none: "不是节日或斋日",
      f1: "🌙 农历日期", f1d: "显示正确的月名以及上弦和下弦日。",
      f2: "🪷 佛教斋日", f2d: "每个月的斋日（Thngai Sil）和满月节日。",
      f3: "🇰🇭 柬埔寨节日", f3d: "高棉新年、亡人节、送水节和国家纪念日。",
      f4: "☯️ 生肖年与 Sak", f4d: "每个日期都显示高棉生肖年、Sak 和佛历。",
      f5: "🗓️ 闰月", f5d: "有两个阿沙荼月的年份（例如2026年和2029年）会自动处理。",
      key: ["🌑 下弦最后一天", "🌓 第8天", "🌕 满月", "🪷 佛教节日", "🏯 节日", "🚣 送水节", "• 斋日"],
      week: ["日", "一", "二", "三", "四", "五", "六"],
      months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      waxing: "上弦", waning: "下弦", sil: "斋日", langs: ["English", "ខ្មែរ", "中文"],
      footer: "农历日期：传统高棉历法规则（momentkh）",
    },
  };
  var EV = {
    newyear: { i: "🎉", k: "holiday", en: "Khmer New Year", km: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ", zh: "高棉新年" },
    meak: { i: "🪷", k: "buddhist", en: "Meak Bochea", km: "ពិធីបុណ្យមាឃបូជា", zh: "万佛节" },
    visak: { i: "🪷", k: "buddhist", en: "Visak Bochea", km: "ពិធីបុណ្យវិសាខបូជា", zh: "卫塞节" },
    ploughing: { i: "🌾", k: "holiday", en: "Royal Ploughing Ceremony", km: "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល", zh: "御耕节" },
    asalha: { i: "🪷", k: "buddhist", en: "Asalha Puja", km: "ពិធីបុណ្យអាសាឡ្ហបូជា", zh: "三宝佛节" },
    cholvassa: { i: "🕯️", k: "buddhist", en: "Chol Vassa (Lent begins)", km: "ចូលព្រះវស្សា", zh: "入雨安居" },
    kanben: { i: "🍚", k: "minor", en: "Kan Ben", km: "កាន់បិណ្ឌ", zh: "亡人节供斋期" },
    pchumben: { i: "🏯", k: "holiday", en: "Pchum Ben", km: "ពិធីបុណ្យភ្ជុំបិណ្ឌ", zh: "亡人节" },
    chenhvassa: { i: "🕯️", k: "buddhist", en: "Chenh Vassa (Lent ends)", km: "ចេញព្រះវស្សា", zh: "出雨安居" },
    water: { i: "🚣", k: "holiday", en: "Water Festival", km: "ព្រះរាជពិធីបុណ្យអុំទូក", zh: "送水节" },
    victory: { i: "🕊️", k: "national", en: "Victory over Genocide Day", km: "ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍", zh: "战胜种族灭绝纪念日" },
    women: { i: "💐", k: "national", en: "International Women's Day", km: "ទិវានារីអន្តរជាតិ", zh: "国际妇女节" },
    labour: { i: "🛠️", k: "national", en: "International Labour Day", km: "ទិវាពលកម្មអន្តរជាតិ", zh: "国际劳动节" },
    kingbday: { i: "👑", k: "national", en: "King's Birthday", km: "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ", zh: "国王诞辰" },
    constitution: { i: "📜", k: "national", en: "Constitution Day", km: "ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ", zh: "宪法日" },
    kingfather: { i: "🕯️", k: "national", en: "King Father Commemoration Day", km: "ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ", zh: "太皇纪念日" },
    coronation: { i: "👑", k: "national", en: "Coronation Day", km: "ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិ", zh: "国王登基纪念日" },
    independence: { i: "🇰🇭", k: "national", en: "Independence Day", km: "ពិធីបុណ្យឯករាជ្យជាតិ", zh: "独立日" },
  };
  var ORDER = { holiday: 0, national: 1, buddhist: 2, minor: 3 };
  var FIXED = [[1, 7, "victory"], [3, 8, "women"], [5, 1, "labour"], [5, 14, "kingbday"], [9, 24, "constitution"], [10, 15, "kingfather"], [10, 29, "coronation"], [11, 9, "independence"]];

  function west(t) { return String(t).replace(/[០-៩]/g, function (c) { return String(c.charCodeAt(0) - 0x17E0); }); }
  function ord(n) { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function utc(d) { return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()); }
  function keyOf(t) { return new Date(t).toISOString().slice(0, 10); }
  var KM = null, memo = {};
  function kh(t) { if (!memo[t]) { var d = new Date(t); memo[t] = KM.fromGregorian(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()); } return memo[t]; }
  function isLastWaning(t) { var k = kh(t).khmer, n = kh(t + DAY).khmer; return k.moonPhase === 1 && n.moonPhase === 0; }
  function isSil(t) { var k = kh(t).khmer; return (k.moonPhase === 0 && (k.day === 8 || k.day === 15)) || (k.moonPhase === 1 && k.day === 8) || isLastWaning(t); }

  var yearCache = {};
  function eventsOf(y) {
    if (yearCache[y]) return yearCache[y];
    var E = {}, add = function (t, id) { var k = keyOf(t); (E[k] = E[k] || []).push(id); };
    FIXED.forEach(function (f) { add(Date.UTC(y, f[0] - 1, f[1]), f[2]); });
    var ny = KM.getNewYear(y);
    if (ny) { var t0 = Date.UTC(y, ny.month - 1, ny.day), s0 = kh(t0).khmer.sak; for (var i = 0; i < 5; i++) { add(t0 + i * DAY, "newyear"); if (kh(t0 + i * DAY).khmer.sak !== s0) break; } }
    for (var t = Date.UTC(y, 0, 1); t < Date.UTC(y + 1, 0, 1); t += DAY) {
      var k = kh(t).khmer, wax = k.moonPhase === 0, m = k.monthIndex, d = k.day;
      if (wax && d === 15 && m === 2) add(t, "meak");
      if (wax && d === 15 && m === 5) add(t, "visak");
      if (!wax && d === 4 && m === 5) add(t, "ploughing");
      if (wax && d === 15 && (m === 7 || m === 13)) add(t, "asalha");
      if (!wax && d === 1 && (m === 7 || m === 13)) add(t, "cholvassa");
      if (!wax && m === 9) { if (isLastWaning(t)) { add(t - DAY, "pchumben"); add(t, "pchumben"); add(t + DAY, "pchumben"); } else if (!isLastWaning(t + DAY)) add(t, "kanben"); }
      if (wax && d === 15 && m === 10) add(t, "chenhvassa");
      if (m === 11 && ((wax && (d === 14 || d === 15)) || (!wax && d === 1))) add(t, "water");
    }
    Object.keys(E).forEach(function (k) { E[k] = E[k].filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return ORDER[EV[a].k] - ORDER[EV[b].k]; }); });
    return (yearCache[y] = E);
  }
  function eventsOn(t) { return eventsOf(new Date(t).getUTCFullYear())[keyOf(t)] || []; }

  function moonIcon(t) {
    var k = kh(t).khmer;
    if (k.moonPhase === 0) return k.day === 15 ? "🌕" : k.day >= 10 ? "🌔" : k.day >= 6 ? "🌓" : "🌒";
    return isLastWaning(t) ? "🌑" : k.day >= 11 ? "🌘" : k.day >= 6 ? "🌗" : "🌖";
  }
  function cellLunar(t, first) {
    var k = kh(t).khmer, w = W[lang], mon = lang === "km" ? k.monthName : MEN[k.monthIndex];
    var show = first || (k.moonPhase === 0 && k.day === 1);
    if (lang === "km") return k.day + w[k.moonPhase ? "waning" : "waxing"] + (show ? " " + mon : "");
    if (lang === "zh") return w[k.moonPhase ? "waning" : "waxing"] + k.day + "日" + (show ? " · " + mon : "");
    return k.day + " " + w[k.moonPhase ? "waning" : "waxing"] + (show ? " · " + mon : "");
  }
  function fullLunar(t) {
    var r = kh(t), k = r.khmer;
    if (lang === "km") return west(KM.format(r));
    if (lang === "zh") return (k.moonPhase ? "下弦" : "上弦") + k.day + "日 · " + MEN[k.monthIndex] + "月 · " + AZH[k.animalYear] + "年 · " + SAK_EN[k.sak] + " · 佛历" + k.beYear;
    return ord(k.day) + " " + (k.moonPhase ? "waning" : "waxing") + " day of " + MEN[k.monthIndex] + ", Year of the " + AEN[k.animalYear] + " (" + SAK_EN[k.sak] + "), B.E. " + k.beYear;
  }
  function yearLine(t) {
    var k = kh(t).khmer;
    if (lang === "km") return "ឆ្នាំ" + k.animalYearName + " " + k.sakName + " · ព.ស. " + k.beYear;
    if (lang === "zh") return AZH[k.animalYear] + "年 · " + SAK_EN[k.sak] + " · 佛历" + k.beYear;
    return "Year of the " + AEN[k.animalYear] + " · " + SAK_EN[k.sak] + " · B.E. " + k.beYear;
  }
  function localOf(t) { var d = new Date(t); return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()); }
  function fmtDate(d, opts) {
    if (lang === "km") {   // written by hand: not every browser has Khmer date names, and numbers stay 1, 2, 3
      var w = W.km, out = [];
      if (opts.weekday) return "ថ្ងៃ" + w.week[d.getDay()];
      if (opts.day) out.push(d.getDate());
      if (opts.month) out.push(w.months[d.getMonth()]);
      if (opts.year) out.push(d.getFullYear());
      return out.join(" ");
    }
    return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-GB", opts).format(d);
  }

  function render() {
    var w = W[lang];
    ["eyebrow", "title", "intro", "f1", "f1d", "f2", "f2d", "f3", "f3d", "f4", "f4d", "f5", "f5d"].forEach(function (k) { if ($(k)) $(k).textContent = w[k]; });
    var map = { detailsTitle: "details", gregorianLabel: "greg", lunarTitle: "lunar", accuracyNote: "note", eventsTitle: "events", eventsText: "eventsText", upcomingTitle: "upcoming" };
    Object.keys(map).forEach(function (id) { if ($(id)) $(id).textContent = w[map[id]]; });
    var kt = document.querySelector(".khmer-title"); if (kt) { kt.textContent = lang === "km" ? "ប្រតិទិនចន្ទគតិខ្មែរ" : ""; kt.hidden = lang !== "km"; }
    if ($("title")) $("title").hidden = lang === "km";
    $("todayBtn").textContent = w.today; $("jumpLabel").textContent = w.jump;
    var sel = $("language"); if (sel) { for (var o = 0; o < sel.options.length; o++) sel.options[o].textContent = w.langs[o]; sel.value = lang; }
    var key = document.querySelector(".calendar-key"); if (key) key.innerHTML = w.key.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
    if ($("footerData")) $("footerData").textContent = w.footer;
    $("week").innerHTML = w.week.map(function (d) { return "<div>" + d + "</div>"; }).join("");
    $("monthTitle").firstChild.textContent = w.months[shown.getMonth()] + " ";
    $("yearTitle").textContent = shown.getFullYear();
    // the Khmer lunar month(s) this Gregorian month spans, and the Buddhist Era year
    var t1 = Date.UTC(shown.getFullYear(), shown.getMonth(), 1), tN = Date.UTC(shown.getFullYear(), shown.getMonth() + 1, 0), mons = [], beS = [];
    for (var tt = t1; tt <= tN; tt += DAY) { var kx = kh(tt).khmer, mn = lang === "km" ? kx.monthName : MEN[kx.monthIndex]; if (mons.indexOf(mn) < 0) mons.push(mn); if (beS.indexOf(kx.beYear) < 0) beS.push(kx.beYear); }
    if ($("lunarMonths")) $("lunarMonths").textContent = mons.join(" – ") + " · " + (lang === "km" ? "ព.ស. " : lang === "zh" ? "佛历" : "B.E. ") + beS.join("–");
    var first = new Date(shown.getFullYear(), shown.getMonth(), 1).getDay(), count = new Date(shown.getFullYear(), shown.getMonth() + 1, 0).getDate();
    var html = "", todayT = utc(new Date()), selT = utc(selected);
    for (var i = 0; i < first; i++) html += '<div class="day empty"></div>';
    for (var d = 1; d <= count; d++) {
      var t = Date.UTC(shown.getFullYear(), shown.getMonth(), d), ev = eventsOn(t), sil = isSil(t), mi = moonIcon(t), main = ev[0];
      var label = fmtDate(new Date(shown.getFullYear(), shown.getMonth(), d), { day: "numeric", month: "long" }) + ", " + cellLunar(t, true) + (ev.length ? ", " + ev.map(function (e) { return EV[e][lang]; }).join(", ") : "") + (sil ? ", " + w.sil : "");
      var evHtml = main ? '<span class="day-event"><span class="event-icon">' + EV[main].i + '</span><span class="event-name">' + esc(EV[main][lang]) + (ev.length > 1 ? " +" + (ev.length - 1) : "") + "</span></span>"
        : sil ? '<span class="day-event"><span class="event-icon">•</span><span class="event-name">' + esc(w.sil) + "</span></span>" : "";
      var kk = kh(t).khmer, shortL = lang === "km" ? kk.day + w[kk.moonPhase ? "waning" : "waxing"] : String(kk.day);
      html += '<button class="day ' + (t === todayT ? "today " : "") + (t === selT ? "selected " : "") + (sil ? "sil " : "") + (kk.moonPhase ? "wan" : "wax") + '" data-day="' + d + '" aria-label="' + esc(label) + '" title="' + esc(ev.map(function (e) { return EV[e][lang]; }).join(" · ")) + '"><span class="num">' + d + '</span><span class="lunar">' + esc(cellLunar(t, d === 1)) + '</span><span class="lunar-s">' + esc(shortL) + "</span>" + evHtml + '<span class="moon-phase">' + mi + "</span></button>";
    }
    $("days").innerHTML = html;
    $("days").querySelectorAll("[data-day]").forEach(function (b) { b.addEventListener("click", function () { selected = new Date(shown.getFullYear(), shown.getMonth(), +b.dataset.day); render(); }); });
    renderSelected();
  }
  function renderSelected() {
    var w = W[lang], t = utc(selected), ev = eventsOn(t), sil = isSil(t), k = kh(t).khmer;
    $("selectedDate").textContent = fmtDate(selected, { year: "numeric", month: "long", day: "numeric" });
    $("weekday").textContent = fmtDate(selected, { weekday: "long" });
    $("lunarText").textContent = fullLunar(t);
    if (lang === "km") $("lunarText").setAttribute("lang", "km"); else $("lunarText").removeAttribute("lang");
    var rows = $("eventsTitle").parentElement.querySelectorAll(".info-row");
    rows[0].querySelector(".info-icon").textContent = ev.length ? EV[ev[0]].i : sil ? "🪷" : "📅";
    rows[0].querySelectorAll("span")[1].textContent = w.rowEvent;
    rows[0].querySelector("strong").textContent = ev.length || sil ? ev.map(function (e) { return EV[e][lang]; }).concat(sil ? [w.sil] : []).join(" · ") : w.none;
    rows[1].querySelector(".info-icon").textContent = moonIcon(t);
    rows[1].querySelectorAll("span")[1].textContent = w.rowMoon;
    rows[1].querySelector("strong").textContent = cellLunar(t, true);
    rows[2].querySelector(".info-icon").textContent = AEMO[k.animalYear];
    rows[2].querySelectorAll("span")[1].textContent = w.rowYear;
    rows[2].querySelector("strong").textContent = yearLine(t);
    // the next five holidays and Buddhist days from the selected date
    var up = [], seen = {}, s = t;
    for (var i = 0; i < 400 && up.length < 6; i++, s += DAY) eventsOn(s).forEach(function (e) { if (EV[e].k !== "minor" && !seen[e + new Date(s).getUTCFullYear()] && up.length < 6) { seen[e + new Date(s).getUTCFullYear()] = 1; up.push([s, e]); } });
    if ($("upcoming")) $("upcoming").innerHTML = up.map(function (u) { return "<li><span>" + EV[u[1]].i + " " + esc(EV[u[1]][lang]) + "</span><b>" + esc(fmtDate(localOf(u[0]), { day: "numeric", month: "short", year: "numeric" })) + "</b></li>"; }).join("");
    $("yearNow").textContent = new Date().getFullYear();
  }

  function langUrl(l) { return (l === "en" ? "" : "/" + l) + "/khmer-calendar"; }
  function start() {
    KM = window.momentkh;
    $("prev").onclick = function () { shown = new Date(shown.getFullYear(), shown.getMonth() - 1, 1); render(); };
    $("next").onclick = function () { shown = new Date(shown.getFullYear(), shown.getMonth() + 1, 1); render(); };
    $("todayBtn").onclick = function () { selected = new Date(); selected.setHours(0, 0, 0, 0); shown = new Date(selected.getFullYear(), selected.getMonth(), 1); render(); };
    $("dateJump").onchange = function (e) { if (!e.target.value) return; var p = e.target.value.split("-").map(Number); if (p[0] < 1900 || p[0] > 2099) return; selected = new Date(p[0], p[1] - 1, p[2]); shown = new Date(p[0], p[1] - 1, 1); render(); };
    if ($("language")) $("language").onchange = function (e) {
      if (SITE) { location.href = langUrl(e.target.value); return; }   // published site: one address per language
      lang = e.target.value; render();
    };
    render();
  }
  if (window.momentkh) start();
  else { var sc = document.createElement("script"); sc.src = "/js/vendor/momentkh.min.js"; sc.onload = start; document.head.appendChild(sc); }
})();
