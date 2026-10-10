// share-cards.js — "Share image" cards, drawn on the visitor's own device (nothing is uploaded or stored).
// Loaded only when someone asks for an image (see js/share.js). Every card uses the site's own results:
//   daily    one sign's daily fortune: date, rating, short fortune, trade today, love / career / money, lucky number /
//            color / direction / time, today's advice
//   lucky    "Who is lucky today": date, the top lucky signs (rules), the sign to take it easy, short note
//   sign     Zodiac Checker result: sign, element, traits, lucky numbers & colors, best matches, needs patience
//   pair     Compare Two Signs: traditional match type, star ratings, short explanation, love / friendship / business
//   love     Love compatibility: both signs, the page's own overall % and level, three category scores, strengths
//   business Business partner: both signs, the page's own overall %, strengths, areas to discuss
//   article  blog articles and anything else: title, short line, optional animal
// Formats (chosen by js/share.js for each action):
//   portrait 1080 x 1350 (up to 1620 tall when the text needs it)  feeds: Facebook, Telegram, WhatsApp, "Share image"
//   square   1080 x 1080 (shorter text)                             "Download image"
//   story    1080 x 1920                                            Instagram / TikTok
// English or Khmer follows spec.lang. Khmer lines break at word boundaries (Intl.Segmenter).
(function () {
  "use strict";
  var W = 1080, PAD = 90, INNER = W - PAD * 2;
  var GOLD = "#f6dc9b", GOLD2 = "#e7c27a", INK = "#f4efff", SOFT = "#cfc6ee", PINK = "#ff8fbf", WARN = "#ff9aa8";
  var FORMATS = { portrait: { h: 1350, grow: 1620 }, square: { h: 1080 }, story: { h: 1920 } };
  var FOOT = 190;                                   // space kept for the brand footer

  function fam(lang, kind) {
    if (lang === "km") return kind === "head" ? "'Moul', 'Noto Sans Khmer', serif" : "'Noto Sans Khmer', 'Kantumruy Pro', sans-serif";
    return kind === "head" ? "Georgia, 'Times New Roman', serif" : "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
  }
  function font(ctx, lang, kind, size, weight) { ctx.font = (weight || 400) + " " + size + "px " + fam(lang, kind); }

  function tokens(text, lang) {
    text = String(text || "").replace(/\s+/g, " ").trim();
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      try {
        var seg = new Intl.Segmenter(lang === "km" ? "km" : "en", { granularity: "word" });
        var out = []; for (var it = seg.segment(text)[Symbol.iterator](), s = it.next(); !s.done; s = it.next()) out.push(s.value.segment);
        return out;
      } catch (e) { /* fall through */ }
    }
    return text.split(/(\s+)/);
  }
  function graphemes(word) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      try { var g = new Intl.Segmenter("km", { granularity: "grapheme" }), out = []; for (var it = g.segment(word)[Symbol.iterator](), s = it.next(); !s.done; s = it.next()) out.push(s.value.segment); return out; } catch (e) { /* ignore */ }
    }
    return Array.from(word);
  }
  function wrap(ctx, text, maxW, lang, maxLines) {
    var lines = [], line = "";
    tokens(text, lang).forEach(function (tk) {
      var test = line + tk;
      if (line.trim() && /^[\s។៕៖,.;:!?%)\]»”’…]+$/.test(tk)) { line = test; return; }   // punctuation never starts a line
      if (ctx.measureText(test).width <= maxW || !line.trim()) {
        if (ctx.measureText(test).width > maxW) {
          graphemes(tk).forEach(function (g) { if (ctx.measureText(line + g).width > maxW && line) { lines.push(line); line = g; } else line += g; });
        } else line = test;
      } else { lines.push(line.trim()); line = tk.trim() ? tk : ""; }
    });
    if (line.trim()) lines.push(line.trim());
    if (maxLines && lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      var last = lines[maxLines - 1];
      while (last && ctx.measureText(last + "…").width > maxW) last = graphemes(last).slice(0, -1).join("");
      lines[maxLines - 1] = last.replace(/[\s,.;:،។]+$/, "") + "…";
    }
    return lines;
  }
  function drawLines(ctx, lines, x, y, lh, align) { ctx.textAlign = align || "left"; lines.forEach(function (l, i) { ctx.fillText(l, x, y + i * lh); }); return y + lines.length * lh; }
  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function loadImg(src) { return new Promise(function (ok) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = src; }); }
  function base() { var s = document.querySelector('script[src*="share.js"]'); return s ? s.src.replace(/js\/share\.js.*$/, "") : "/"; }
  var ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  function medalSrc(a) { return ANIMALS.indexOf(a) < 0 ? null : base() + "images/business/animals/" + String(a).toLowerCase() + ".webp"; }
  function medals(list) { return Promise.all(list.map(function (a) { var s = medalSrc(a); return s ? loadImg(s) : Promise.resolve(null); })); }
  function fontsReady(lang) {
    var want = lang === "km" ? ["400 30px 'Noto Sans Khmer'", "700 30px 'Noto Sans Khmer'", "400 30px 'Moul'"] : [];
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all(want.map(function (f) { return document.fonts.load(f).catch(function () {}); })).then(function () { return document.fonts.ready; });
  }

  function background(ctx, H) {
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#22175a"); g.addColorStop(0.55, "#140d3a"); g.addColorStop(1, "#0a0722");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var r = ctx.createRadialGradient(W / 2, H * 0.25, 40, W / 2, H * 0.25, 560); r.addColorStop(0, "rgba(246,220,155,.20)"); r.addColorStop(1, "rgba(246,220,155,0)");
    ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,.5)";
    for (var i = 0; i < 90; i++) { var x = (i * 977) % W, y = (i * 631) % Math.round(H * 0.45), s = (i % 3) + 1; ctx.fillRect(x, y, s, s); }
    ctx.strokeStyle = "rgba(246,220,155,.75)"; ctx.lineWidth = 3; roundRect(ctx, 34, 34, W - 68, H - 68, 36); ctx.stroke();
    ctx.strokeStyle = "rgba(246,220,155,.25)"; ctx.lineWidth = 1.5; roundRect(ctx, 48, 48, W - 96, H - 96, 28); ctx.stroke();
  }
  function medal(ctx, img, cx, cy, r) {
    ctx.save(); ctx.shadowColor = "rgba(246,220,155,.6)"; ctx.shadowBlur = 50; ctx.beginPath(); ctx.arc(cx, cy, r + 6, 0, Math.PI * 2); ctx.fillStyle = "rgba(246,220,155,.35)"; ctx.fill(); ctx.restore();
    if (img) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2); ctx.restore(); }
    else { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = "#2a1f63"; ctx.fill(); ctx.strokeStyle = GOLD; ctx.lineWidth = 3; ctx.stroke(); }
  }
  function pill(ctx, text, cx, y, lang, color) {
    font(ctx, lang, "body", 30, 700); var w = Math.min(INNER, ctx.measureText(text).width + 56);
    roundRect(ctx, cx - w / 2, y, w, 54, 27); ctx.fillStyle = "rgba(246,220,155,.12)"; ctx.fill(); ctx.strokeStyle = color || GOLD; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = color || GOLD; ctx.textAlign = "center"; ctx.fillText(text, cx, y + 37);
  }
  // QR code for https://mybirthsign.com (generated once, dark modules on a light tile so phone cameras read it)
  var QR_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAIAAAAHjs1qAAADu0lEQVR42u3dPW7cMBCAUStgu1U2l9lD+LC+VpwLuLHbVBJAcjBD8b3W2D/5AyFgQOp4Pl5v9/L330f3a//8ft/qc+O+VU2/3mAbckfuIHeQO8gd5A5yB7nDPO38z3ETuxEj076sSWHNzx35/67YhtUdNzMgd5A7yB3kDnIHuYPcoUMbeXHcpLDmxC7uapz/3vN3jpub3q8NqztuZkDuIHeQO8gd5A5yB7lDh+YSzJI1GV1x5mp1B7mD3EHuIHeQO3IHuYPcYSHbTVXjnn6adcbvyMzV6g5yB7mD3EHuIHeQO8gd5A6Xhqaqu+10HJlf7rbftOa3srrjZgbkDnIHuYPcQe4gd5A7dLiYqt5vp2Pc7DPrtTWvpNUd5A5yB7mD3EHuIHfkDnKH22i77TcdkXWt4ua1NX+v1R3kDnIHuSN3kDvIHeQOcodSjufjdfLnmnO1rH2fWTtKa+5kjXtCbdy3srrjZgbkDnIHuYPcQe4gd5A7dGgrfum4WW/WO488VzXuc1c8l9jqDnJH7iB3kDvIHeQOcge5w3TH99dn94tXfEZpTVl7N+O+c81prtUdNzMgd5A7yB3kDnIHuYPcocPFVHXF2WfNE3FrToJr7jeNO1vY6o6bGZA7yB3kDnIHuYPcQe7Qoa14BmzNZ6PWnFDWfAat1R3kDnIHuYPcQe7IHeQOcoeFHM/Hq/vFWTPXuL2Mu+03zbqScb/3/HOt7riZAbmD3EHuIHeQO8gd5A4d2vmfa85NdztNd+QXxc1N417rBGBwMwNyB7kjd5A7yB3kDnKHUi72qtZ8+mnczLXmZLSmmmcLm6qC3JE7yB3kDnIHuYPcQe4wXRt5cc29qnF2eyZrXBtZM1erO25mQO4gd5A7yB3kDnIHuUOH4/vrc6sfXPNpoOeyZpArXmerO8gduYPcQe4gd5A7yB3kDtO1++2SPJ/YZT1nNG6OmLWDtuaZxk4ABrkjd5A7yB3kDnIHuYPcYbqLE4BXnJzFiZvIrnjicc3/vhOAQe7IHeQOcge5g9xB7iB3mG7J56reT9bctOZO5bj9tVZ33MyA3EHuIHeQO8gd5A5yhw7NJfhf3Jm3NZ+NutuZxlZ33MyA3EHuIHeQO8gd5A5yhw6mqtPETSjP33lkEpy1JzjrWlndcTMDcge5g9xB7iB3kDvIHToMTVXvd05v1v7LOHG7b2vuc7W6g9yRO8gd5A5yB7mD3EHuMN3FVLXmczdHrHjGb9bnZk1k42auVnfczIDcQe4gd5A7yB3kDnKHDj9nL1x2Gaq1pQAAAABJRU5ErkJggg==";
  var qrReady = loadImg(QR_SRC);
  function qr(ctx, img, H) {
    if (!img) return;
    var s = 116, pad = 10, x = W - 62 - s - pad, y = H - 56 - s - pad;     // inside the frame, in the footer band
    roundRect(ctx, x - pad, y - pad, s + pad * 2, s + pad * 2, 16); ctx.fillStyle = "#fffaec"; ctx.fill();
    ctx.strokeStyle = "rgba(246,220,155,.9)"; ctx.lineWidth = 2; ctx.stroke();
    ctx.imageSmoothingEnabled = false; ctx.drawImage(img, x, y, s, s); ctx.imageSmoothingEnabled = true;
  }
  function footer(ctx, lang, note, H) {
    ctx.textAlign = "center"; ctx.fillStyle = GOLD; font(ctx, "en", "head", 40, 700); ctx.fillText("MyBirthSign", W / 2, H - 132);
    font(ctx, "en", "body", 30, 600); ctx.fillStyle = GOLD2; ctx.fillText("mybirthsign.com", W / 2, H - 92);
    font(ctx, lang, "body", 20, 400); ctx.fillStyle = "rgba(207,198,238,.75)"; ctx.fillText(note, W / 2, H - 62);
  }
  function lh(L, en, km) { return L === "km" ? km : en; }
  // a dark panel of labelled rows (label + 1-3 lines of text each); measured first, then drawn
  function panel(ctx, L, rows, y, maxLines) {
    var lab = lh(L, 38, 42), line = lh(L, 36, 42);
    var heights = rows.map(function (rw) { font(ctx, L, "body", lh(L, 27, 26), 400); return wrap(ctx, rw[1], INNER - 48, L, maxLines).length; });
    var boxH = 30 + rows.reduce(function (acc, rw, i) { return acc + lab + heights[i] * line + 14; }, 0);
    roundRect(ctx, PAD, y, INNER, boxH, 22); ctx.fillStyle = "rgba(10,7,34,.55)"; ctx.fill(); ctx.strokeStyle = "rgba(246,220,155,.35)"; ctx.lineWidth = 1.5; ctx.stroke();
    var yy = y + 48;
    rows.forEach(function (rw) {
      font(ctx, L, "body", lh(L, 24, 25), 700); ctx.fillStyle = rw[2] || GOLD; ctx.textAlign = "left"; ctx.fillText(rw[0], PAD + 24, yy);
      font(ctx, L, "body", lh(L, 27, 26), 400); ctx.fillStyle = INK;
      yy = drawLines(ctx, wrap(ctx, rw[1], INNER - 48, L, maxLines), PAD + 24, yy + lab, line) + 14;
    });
    return y + boxH;
  }
  function bars(ctx, L, items, y) {                // [label, pct] rows with a gold bar
    items.forEach(function (it, i) {
      var yy = y + i * 76;
      font(ctx, L, "body", lh(L, 27, 26), 600); ctx.fillStyle = INK; ctx.textAlign = "left"; ctx.fillText(it[0], PAD + 10, yy + 26);
      font(ctx, "en", "body", 28, 700); ctx.fillStyle = GOLD; ctx.textAlign = "right"; ctx.fillText(numL(L, it[1]) + "%", W - PAD - 10, yy + 26);
      roundRect(ctx, PAD + 10, yy + 42, INNER - 20, 14, 7); ctx.fillStyle = "rgba(246,220,155,.15)"; ctx.fill();
      roundRect(ctx, PAD + 10, yy + 42, Math.max(14, (INNER - 20) * Math.max(0, Math.min(100, it[1])) / 100), 14, 7); ctx.fillStyle = GOLD2; ctx.fill();
    });
    return y + items.length * 76;
  }
  function cells(ctx, L, list, y, colorHex) {      // up to 4 small boxes in one row
    var cw = INNER / list.length;
    list.forEach(function (cell, i) {
      var cx = PAD + cw * i + cw / 2;
      roundRect(ctx, PAD + cw * i + 6, y, cw - 12, 100, 16); ctx.fillStyle = "rgba(246,220,155,.08)"; ctx.fill(); ctx.strokeStyle = "rgba(246,220,155,.4)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.textAlign = "center"; font(ctx, L, "body", 22, 600); ctx.fillStyle = SOFT; ctx.fillText(cell[0], cx, y + 34);
      font(ctx, L, "body", String(cell[1]).length > 9 ? 22 : 28, 700); ctx.fillStyle = "#fff3d1";
      var v = wrap(ctx, String(cell[1]), cw - 30, L, 1)[0] || "";
      if (cell[2] && colorHex) { var tw = ctx.measureText(v).width; ctx.beginPath(); ctx.arc(cx - tw / 2 - 6, y + 72, 9, 0, Math.PI * 2); ctx.fillStyle = colorHex; ctx.fill(); ctx.fillStyle = "#fff3d1"; ctx.fillText(v, cx + 12, y + 80); }
      else ctx.fillText(v, cx, y + 80);
    });
    return y + 100;
  }
  var KD = "០១២៣៤៥៦៧៨៩";
  function numL(L, v) { return L === "km" ? String(v).replace(/\d/g, function (c) { return KD[c]; }) : String(v); }

  // Draw the content once on a tall transparent canvas, then place it on the chosen format:
  // portrait grows (1350 -> 1620) before anything is scaled; square / story keep their size, and the
  // content is scaled down only if it still does not fit; shorter content is centred vertically.
  // Safari (iPhone / Mac) ignores textAlign "center" / "right" for some Khmer text, so every centred or
  // right-aligned line is positioned by hand from its measured width instead.
  function alignByHand(ctx) {
    var raw = ctx.fillText;
    ctx.fillText = function (t, x, y, maxW) {
      var a = this.textAlign;
      if (a === "center" || a === "right" || a === "end") {
        var w = this.measureText(t).width;
        this.textAlign = "left";
        raw.call(this, t, a === "center" ? x - w / 2 : x - w, y);
        this.textAlign = a;
      } else if (maxW === undefined) raw.call(this, t, x, y); else raw.call(this, t, x, y, maxW);
    };
    return ctx;
  }
  function render(L, note, format, body) {
    var F = FORMATS[format] || FORMATS.portrait;
    var opts = { compact: format === "square", story: format === "story" };
    var m = document.createElement("canvas"); m.width = W; m.height = 2300;
    var mctx = alignByHand(m.getContext("2d"));
    var end = Math.ceil(body(mctx, opts)) + 30;
    var H = F.h;
    if (F.grow) H = Math.max(F.h, Math.min(F.grow, Math.ceil((end + FOOT) / 10) * 10));
    var avail = H - FOOT, scale = Math.min(1, avail / end);
    var c = document.createElement("canvas"); c.width = W; c.height = H; var ctx = alignByHand(c.getContext("2d"));
    background(ctx, H);
    var dw = W * scale, dh = end * scale, dy = Math.max(0, (avail - dh) / 2 + (opts.story ? 20 : 0));   // short content sits in the middle, not at the top
    ctx.drawImage(m, 0, 0, W, end, (W - dw) / 2, dy, dw, dh);
    footer(ctx, L, note, H);
    return qrReady.then(function (img) {
      qr(ctx, img, H);
      return new Promise(function (ok) { c.toBlob(function (b) { ok(b); }, "image/png"); });
    });
  }

  var LBL = {
    en: { trade: "Trade today", love: "Love", career: "Career", money: "Money", advice: "Today's advice", number: "Number", color: "Color", direction: "Direction", time: "Time",
          note: "Traditional Chinese zodiac reading for fun and self-reflection", friend: "Friendship", business: "Business", stars: "Love {L}  ·  Business {B}",
          luckyToday: "Who is lucky today", easy: "Take it easy today", sign: "Your Chinese zodiac sign", nums: "Lucky numbers", cols: "Lucky colors",
          matches: "Best matches", patience: "Needs patience", strengths: "Strengths", discuss: "Talk through", element: "Element" },
    km: { trade: "ការលក់ដូរថ្ងៃនេះ", love: "ស្នេហា", career: "ការងារ", money: "លុយកាក់", advice: "ដំបូន្មានថ្ងៃនេះ", number: "លេខ", color: "ពណ៌", direction: "ទិស", time: "ម៉ោង",
          note: "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត", friend: "មិត្តភាព", business: "អាជីវកម្ម", stars: "ស្នេហា {L}  ·  អាជីវកម្ម {B}",
          luckyToday: "តើអ្នកណាមានសំណាងថ្ងៃនេះ", easy: "ថ្ងៃនេះគួរប្រុងប្រយ័ត្ន", sign: "រាសីចិនរបស់អ្នក", nums: "លេខសំណាង", cols: "ពណ៌សំណាង",
          matches: "គូដែលត្រូវគ្នាបំផុត", patience: "ឆ្នាំខុង", strengths: "ចំណុចខ្លាំង", discuss: "គួរពិភាក្សា", element: "ធាតុ" }
  };
  function langOf(spec) { return spec && spec.lang === "km" ? "km" : "en"; }
  function head(ctx, L, text, y, size) { ctx.textAlign = "center"; ctx.fillStyle = "#fff6dc"; font(ctx, L, "head", size || lh(L, 66, 52), 700); return drawLines(ctx, wrap(ctx, text, INNER, L, 2), W / 2, y, lh(L, 74, 70), "center"); }
  function eyebrow(ctx, L, text, y) { ctx.textAlign = "center"; ctx.fillStyle = GOLD2; font(ctx, L, "body", 28, 600); ctx.fillText(text || "", W / 2, y); }
  function para(ctx, L, text, y, lines, size) { font(ctx, L, "body", size || lh(L, 31, 29), 400); ctx.fillStyle = INK; return drawLines(ctx, wrap(ctx, text, INNER, L, lines), W / 2, y, lh(L, 42, 46), "center"); }

  // ---------------------------------------------------------------- card types
  function daily(spec, format) {
    var L = langOf(spec), T = LBL[L];
    return Promise.all([medals([spec.animal]), fontsReady(L)]).then(function (r) {
      return render(L, T.note, format, function (ctx, o) {
        var R = o.compact ? 90 : 118, my = o.compact ? 214 : 262;
        eyebrow(ctx, L, spec.date, 116); medal(ctx, r[0][0], W / 2, my, R);
        var y = my + R + 76; ctx.textAlign = "center"; ctx.fillStyle = "#fff6dc"; font(ctx, L, "head", lh(L, 66, 52), 700); ctx.fillText(spec.name || spec.animal, W / 2, y);
        pill(ctx, spec.label || "", W / 2, y + 22, L, spec.tier === "caution" ? WARN : GOLD);
        y = para(ctx, L, spec.fortune, y + 134, o.compact ? 2 : 3) + 6;
        // daily trade first (every daily card has it), then love / career / money when the day's text exists
        var rows = [[spec.tradeLabel || T.trade, spec.trade], [T.love, spec.love], [T.career, spec.career], [T.money, spec.money]].filter(function (rw) { return rw[1]; });
        if (o.compact) rows = rows.slice(0, 2);
        if (rows.length === 1) y = note(ctx, L, "✦", rows[0][0], rows[0][1], y + 4, GOLD) + 4;   // trade only: bigger box
        else if (rows.length) y = panel(ctx, L, rows, y, rows.length > 2 ? (o.compact ? 1 : 2) : 3) + 20;
        y = cells(ctx, L, [[T.number, numL(L, spec.number)], [T.color, spec.color, true], [T.direction, spec.direction], [T.time, numL(L, spec.time)]], y, spec.colorHex);
        if (o.compact || !spec.advice) return y;
        y += 48; ctx.textAlign = "center"; font(ctx, L, "body", 26, 700); ctx.fillStyle = GOLD; ctx.fillText(T.advice, W / 2, y);
        font(ctx, L, "body", lh(L, 29, 28), 400); ctx.fillStyle = INK;
        return drawLines(ctx, wrap(ctx, spec.advice, INNER - 40, L, 2), W / 2, y + 46, lh(L, 40, 46), "center");
      });
    });
  }

  function lucky(spec, format) {
    var L = langOf(spec), T = LBL[L], top = (spec.top || []).slice(0, 3), names = spec.topNames || top;
    return Promise.all([medals(top), fontsReady(L)]).then(function (r) {
      return render(L, T.note, format, function (ctx, o) {
        eyebrow(ctx, L, spec.date, 116);
        var y = head(ctx, L, spec.heading || T.luckyToday, 206, lh(L, 60, 46));
        var R = o.compact ? 96 : 116, cy = y + R + 30, gap = (INNER - 40) / 3;
        top.forEach(function (a, i) {
          var cx = PAD + 20 + gap * i + gap / 2; medal(ctx, r[0][i], cx, cy, i === 0 ? R : R - 14);
          ctx.textAlign = "center"; ctx.fillStyle = i === 0 ? "#fff6dc" : GOLD; font(ctx, L, "head", lh(L, i === 0 ? 46 : 40, i === 0 ? 38 : 32), 700);
          ctx.fillText(names[i] || a, cx, cy + R + 62);
        });
        y = cy + R + 110;
        if (spec.text) y = para(ctx, L, spec.text, y + 10, o.compact ? 2 : 4) + 10;
        if (spec.careful && spec.careful.length) { pill(ctx, T.easy + ": " + spec.careful.join(", "), W / 2, y + 10, L, WARN); y += 74; }
        return y;
      });
    });
  }

  function sign(spec, format) {
    var L = langOf(spec), T = LBL[L];
    return Promise.all([medals([spec.animal]), fontsReady(L)]).then(function (r) {
      return render(L, T.note, format, function (ctx, o) {
        eyebrow(ctx, L, T.sign, 112);
        var R = o.compact ? 88 : 112, my = o.compact ? 214 : 256; medal(ctx, r[0][0], W / 2, my, R);
        var y = head(ctx, L, spec.name || spec.animal, my + R + 84, lh(L, 70, 58));
        if (spec.element) { pill(ctx, (spec.elementLabel || T.element) + ": " + spec.element, W / 2, y - 26, L, GOLD); y += 52; }
        y = para(ctx, L, spec.traits, y + 26, o.compact ? 2 : 3, lh(L, 34, 32)) + 22;
        // big badges instead of a small list (same data as the Checker result)
        if (spec.numbers && spec.numbers.length) y = badges(ctx, L, T.nums, spec.numbers.map(function (n) { return numL(L, n); }), y, GOLD);
        if (spec.colors && spec.colors.length) y = badges(ctx, L, T.cols, spec.colors, y, GOLD2);
        if (!o.compact && spec.matches && spec.matches.length) y = badges(ctx, L, T.matches, spec.matches, y, GOLD);
        if (!o.compact && spec.patience) y = badges(ctx, L, T.patience, [spec.patience], y, WARN);
        return y;
      });
    });
  }

  function pair(spec, format) {
    var L = langOf(spec), T = LBL[L];
    return Promise.all([medals([spec.a, spec.b]), fontsReady(L)]).then(function (r) {
      return render(L, T.note, format, function (ctx, o) {
        var R = o.compact ? 104 : 128, my = o.compact ? 200 : 240;
        medal(ctx, r[0][0], W / 2 - 220, my, R); medal(ctx, r[0][1], W / 2 + 220, my, R);
        ctx.textAlign = "center"; ctx.fillStyle = GOLD; font(ctx, "en", "head", 84, 700); ctx.fillText("&", W / 2, my + 30);
        ctx.fillStyle = "#fff6dc"; font(ctx, L, "head", lh(L, 52, 40), 700);
        ctx.fillText(spec.nameA, W / 2 - 220, my + R + 64); ctx.fillText(spec.nameB, W / 2 + 220, my + R + 64);
        var y = my + R + 100; pill(ctx, spec.label, W / 2, y, L, spec.type === "clash" ? WARN : GOLD);
        var star = function (n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); };
        y += 112; ctx.textAlign = "center"; font(ctx, L, "body", 28, 600); ctx.fillStyle = GOLD2;
        if (spec.starsLove != null) { ctx.fillText(T.stars.replace("{L}", star(spec.starsLove)).replace("{B}", star(spec.starsBiz)), W / 2, y); y += 66; }
        y = para(ctx, L, spec.intro, y, o.compact ? 2 : 3) + 8;
        var rows = [[T.love, spec.love], [T.friend, spec.friendship], [T.business, spec.business]].filter(function (rw) { return rw[1]; });
        return rows.length ? panel(ctx, L, rows, y, o.compact ? 1 : 3) : y;
      });
    });
  }

  function twoSigns(spec, format, accent, rowsFn) {  // love + business share one layout
    var L = langOf(spec), T = LBL[L];
    return Promise.all([medals([spec.a, spec.b]), fontsReady(L)]).then(function (r) {
      return render(L, T.note, format, function (ctx, o) {
        if (spec.eyebrow) eyebrow(ctx, L, spec.eyebrow, 112);
        var R = o.compact ? 96 : 118, my = o.compact ? 230 : 262;
        medal(ctx, r[0][0], W / 2 - 280, my, R); medal(ctx, r[0][1], W / 2 + 280, my, R);
        // the page's own overall score in a ring between the two signs
        ctx.beginPath(); ctx.arc(W / 2, my, 98, 0, Math.PI * 2); ctx.fillStyle = "rgba(10,7,34,.7)"; ctx.fill();
        ctx.beginPath(); ctx.arc(W / 2, my, 98, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0, Math.min(100, spec.overall)) / 100); ctx.strokeStyle = accent; ctx.lineWidth = 12; ctx.stroke();
        ctx.textAlign = "center"; ctx.fillStyle = "#fff6dc"; font(ctx, "en", "head", 58, 700); ctx.fillText(numL(L, spec.overall) + "%", W / 2, my + 20);
        ctx.fillStyle = "#fff6dc"; font(ctx, L, "head", lh(L, 44, 36), 700);
        ctx.fillText(spec.nameA, W / 2 - 280, my + R + 60); ctx.fillText(spec.nameB, W / 2 + 280, my + R + 60);
        var y = my + R + 92;
        if (spec.level) { pill(ctx, spec.level, W / 2, y, L, accent); y += 92; } else y += 30;
        if (spec.desc) y = para(ctx, L, spec.desc, y + 10, o.compact ? 2 : 3) + 14;
        return rowsFn(ctx, L, T, y, o);
      });
    });
  }
  function love(spec, format) {
    return twoSigns(spec, format, PINK, function (ctx, L, T, y, o) {
      if (spec.cats && spec.cats.length) y = bars(ctx, L, spec.cats.slice(0, o.compact ? 2 : 3), y + 6) + 10;
      if (!o.compact && spec.strengths && spec.strengths.length) y = panel(ctx, L, [[T.strengths, spec.strengths.slice(0, 2).join(" · ")]], y + 10, 3);
      return y;
    });
  }
  function business(spec, format) {
    return twoSigns(spec, format, GOLD2, function (ctx, L, T, y, o) {
      if (spec.cats && spec.cats.length) y = bars(ctx, L, spec.cats.slice(0, o.compact ? 2 : 3), y + 6) + 10;
      if (!o.compact && spec.discuss) y = panel(ctx, L, [[T.discuss, spec.discuss, WARN]], y + 10, 2);
      return y;
    });
  }

  function article(spec, format) {
    var L = langOf(spec), T = LBL[L], list = spec.animal ? [spec.animal] : ["Rat", "Dragon", "Horse", "Monkey"];
    return Promise.all([medals(list), fontsReady(L)]).then(function (r) {
      return render(L, T.note, format, function (ctx, o) {
        var y;
        if (list.length === 1) { medal(ctx, r[0][0], W / 2, 250, o.compact ? 100 : 130); y = 450; }
        else { list.forEach(function (a, i) { medal(ctx, r[0][i], PAD + 105 + i * ((INNER - 210) / 3), 230, 78); }); y = 400; }
        if (spec.eyebrow) { eyebrow(ctx, L, spec.eyebrow, y - 20); y += 40; }
        ctx.textAlign = "center"; ctx.fillStyle = "#fff6dc"; font(ctx, L, "head", lh(L, 58, 44), 700);
        y = drawLines(ctx, wrap(ctx, spec.title || "", INNER, L, 4), W / 2, y + 40, lh(L, 70, 72), "center") + 10;
        if (spec.sub) y = para(ctx, L, spec.sub, y + 20, o.compact ? 2 : 4);
        return y;
      });
    });
  }

  // Dream Fortune (Checker page): sign, chosen dream, headline, short text, supportive years / lucky colors
  // only when the page had them, one tip. All text comes from the site's own templates.
  // a row of large "badges" (years, colors) under a small label
  function badges(ctx, L, label, items, y, color) {
    ctx.textAlign = "center"; font(ctx, L, "body", lh(L, 27, 27), 700); ctx.fillStyle = color;
    ctx.fillText("✦  " + label + "  ✦", W / 2, y + 30);
    font(ctx, "en", "head", 46, 700);
    var big = L === "km" ? function () { font(ctx, L, "body", 42, 700); } : function () { font(ctx, "en", "head", 46, 700); };
    big();
    var ws = items.map(function (t) { return Math.min(INNER, ctx.measureText(t).width + 64); }), gap = 22;
    var rows = [[]], rw = [0];
    ws.forEach(function (w, k) { var r = rows.length - 1; if (rw[r] && rw[r] + gap + w > INNER) { rows.push([]); rw.push(0); r++; } rows[r].push(k); rw[r] += (rw[r] ? gap : 0) + w; });
    var yy = y + 58;
    rows.forEach(function (row, r) {
      var x = W / 2 - rw[r] / 2;
      row.forEach(function (k) {
        var w = ws[k], g = ctx.createLinearGradient(0, yy, 0, yy + 78);
        g.addColorStop(0, "rgba(246,220,155,.20)"); g.addColorStop(1, "rgba(246,220,155,.06)");
        roundRect(ctx, x, yy, w, 78, 39); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.stroke();
        big(); ctx.fillStyle = "#fff6dc"; ctx.textAlign = "center"; ctx.fillText(items[k], x + w / 2, yy + 54);
        x += w + gap;
      });
      yy += 96;
    });
    return yy + 6;
  }
  // a framed note with a coloured label and larger text
  function note(ctx, L, mark, label, text, y, color) {
    font(ctx, L, "body", lh(L, 31, 30), 400);
    var lines = wrap(ctx, text, INNER - 76, L, 3), lineH = lh(L, 44, 50);
    var h = 76 + lines.length * lineH;
    roundRect(ctx, PAD, y, INNER, h, 26); ctx.fillStyle = "rgba(10,7,34,.62)"; ctx.fill();
    ctx.strokeStyle = color; ctx.globalAlpha = .55; ctx.lineWidth = 2; ctx.stroke(); ctx.globalAlpha = 1;
    roundRect(ctx, PAD, y + 18, 8, h - 36, 4); ctx.fillStyle = color; ctx.fill();          // accent bar
    ctx.textAlign = "left"; font(ctx, L, "body", lh(L, 28, 28), 700); ctx.fillStyle = color;
    ctx.fillText(mark + "  " + label, PAD + 38, y + 50);
    font(ctx, L, "body", lh(L, 31, 30), 400); ctx.fillStyle = INK;
    drawLines(ctx, lines, PAD + 38, y + 50 + lineH, lineH);
    return y + h + 18;
  }
  // Dream Fortune (Checker page): sign, chosen dream, headline, short text, supportive / careful years and lucky
  // colors only when the page had them, a watch-out and one tip. All text comes from the site's own templates.
  function dream(spec, format) {
    var L = langOf(spec), T = LBL[L];
    return Promise.all([medals([spec.animal]), fontsReady(L)]).then(function (r) {
      return render(L, T.note, format, function (ctx, o) {
        eyebrow(ctx, L, (spec.category || ""), 112);
        var R = o.compact ? 88 : 108, my = o.compact ? 214 : 250; medal(ctx, r[0][0], W / 2, my, R);
        ctx.textAlign = "center"; ctx.fillStyle = GOLD; font(ctx, L, "body", 28, 700); ctx.fillText("✦  " + (spec.name || spec.animal) + "  ✦", W / 2, my + R + 52);
        var y = head(ctx, L, spec.title || "", my + R + 126, lh(L, 58, 46));
        y = para(ctx, L, spec.desc, y + 12, o.compact ? 2 : 3, lh(L, 33, 31)) + 18;
        if (spec.years && spec.years.length) y = badges(ctx, L, spec.yearsLabel, spec.years, y, GOLD);
        if (spec.careYear) y = badges(ctx, L, spec.careLabel, [spec.careYear], y, WARN);
        if (spec.colors && spec.colors.length && !(spec.years && spec.years.length)) y = badges(ctx, L, spec.colorsLabel, spec.colors, y, GOLD2);   // years first: keeps the text large
        if (!o.compact && spec.watch) y = note(ctx, L, "⚠", spec.watchLabel, spec.watch, y + 6, WARN);
        if (!o.compact && spec.tip) y = note(ctx, L, "✦", spec.tipLabel || "", spec.tip, y, GOLD);
        return y;
      });
    });
  }

  window.MBSShareCards = { dream: dream, daily: daily, lucky: lucky, sign: sign, pair: pair, love: love, business: business, article: article, FORMATS: FORMATS, _wrap: wrap };
})();
