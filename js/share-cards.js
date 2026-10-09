// share-cards.js — rich "Share image" cards, drawn on the visitor's own device (nothing is uploaded or stored).
// Loaded only when someone taps "Share image" on a daily sign or a Compare Two Signs result (see js/share.js).
//   daily: animal, rating, short fortune, love / career / money highlights, lucky number / color / direction /
//          time, today's advice, MyBirthSign branding and web address
//   pair:  both animals, the traditional match type, quick star ratings, a short explanation, love /
//          friendship / business highlights and the web address
// 1080 x 1350 (4:5) suits Facebook, Instagram and Telegram feeds. English or Khmer follows the card spec.
(function () {
  "use strict";
  var W = 1080, H = 1350, PAD = 90, INNER = W - PAD * 2;
  var GOLD = "#f6dc9b", GOLD2 = "#e7c27a", INK = "#f4efff", SOFT = "#cfc6ee";
  function fam(lang, kind) {
    if (lang === "km") return kind === "head" ? "'Moul', 'Noto Sans Khmer', serif" : "'Noto Sans Khmer', 'Kantumruy Pro', sans-serif";
    return kind === "head" ? "Georgia, 'Times New Roman', serif" : "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
  }
  function font(ctx, lang, kind, size, weight) { ctx.font = (weight || 400) + " " + size + "px " + fam(lang, kind); }

  // Khmer is written without spaces between words, so break lines at real word boundaries
  // (Intl.Segmenter) and never inside a syllable cluster.
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
      if (ctx.measureText(test).width <= maxW || !line.trim()) {
        if (ctx.measureText(test).width > maxW) {           // one token wider than the line: split by clusters
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
  function medalSrc(a) { return base() + "images/business/animals/" + String(a).toLowerCase() + ".webp"; }
  function fontsReady(lang) {
    var want = lang === "km" ? ["400 30px 'Noto Sans Khmer'", "700 30px 'Noto Sans Khmer'", "400 30px 'Moul'"] : [];
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all(want.map(function (f) { return document.fonts.load(f).catch(function () {}); })).then(function () { return document.fonts.ready; });
  }

  function background(ctx, H) {
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#22175a"); g.addColorStop(0.55, "#140d3a"); g.addColorStop(1, "#0a0722");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var r = ctx.createRadialGradient(W / 2, 330, 40, W / 2, 330, 520); r.addColorStop(0, "rgba(246,220,155,.22)"); r.addColorStop(1, "rgba(246,220,155,0)");
    ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,.55)";
    for (var i = 0; i < 70; i++) { var x = (i * 977) % W, y = (i * 631) % 560, s = (i % 3) + 1; ctx.fillRect(x, y, s, s); }
    ctx.strokeStyle = "rgba(246,220,155,.75)"; ctx.lineWidth = 3; roundRect(ctx, 34, 34, W - 68, H - 68, 36); ctx.stroke();
    ctx.strokeStyle = "rgba(246,220,155,.25)"; ctx.lineWidth = 1.5; roundRect(ctx, 48, 48, W - 96, H - 96, 28); ctx.stroke();
  }
  function medal(ctx, img, cx, cy, r) {
    ctx.save(); ctx.shadowColor = "rgba(246,220,155,.6)"; ctx.shadowBlur = 50; ctx.beginPath(); ctx.arc(cx, cy, r + 6, 0, Math.PI * 2); ctx.fillStyle = "rgba(246,220,155,.35)"; ctx.fill(); ctx.restore();
    if (img) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2); ctx.restore(); }
  }
  function pill(ctx, text, cx, y, lang, color) {
    font(ctx, lang, "body", 30, 700); var w = ctx.measureText(text).width + 56;
    roundRect(ctx, cx - w / 2, y, w, 54, 27); ctx.fillStyle = "rgba(246,220,155,.12)"; ctx.fill(); ctx.strokeStyle = color || GOLD; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = color || GOLD; ctx.textAlign = "center"; ctx.fillText(text, cx, y + 37);
  }
  function footer(ctx, lang, note, H) {
    ctx.textAlign = "center"; ctx.fillStyle = GOLD; font(ctx, "en", "head", 40, 700); ctx.fillText("MyBirthSign", W / 2, H - 132);
    font(ctx, "en", "body", 30, 600); ctx.fillStyle = GOLD2; ctx.fillText("mybirthsign.com", W / 2, H - 92);
    font(ctx, lang, "body", 20, 400); ctx.fillStyle = "rgba(207,198,238,.75)"; ctx.fillText(note, W / 2, H - 62);
  }
  function sectionAt(ctx, lang, label, text, y, lines) {
    font(ctx, lang, "body", lang === "km" ? 25 : 24, 700); ctx.fillStyle = GOLD; ctx.textAlign = "left"; ctx.fillText(label, PAD + 24, y);
    font(ctx, lang, "body", lang === "km" ? 26 : 27, 400); ctx.fillStyle = INK;
    var lh = lang === "km" ? 42 : 36;
    return drawLines(ctx, wrap(ctx, text, INNER - 48, lang, lines), PAD + 24, y + (lang === "km" ? 42 : 38), lh) + 14;
  }
  function section(ctx, lang, label, text, y, lines) {
    font(ctx, lang, "body", lang === "km" ? 26 : 25, 700); ctx.fillStyle = GOLD; ctx.textAlign = "left"; ctx.fillText(label, PAD + 24, y);
    font(ctx, lang, "body", lang === "km" ? 27 : 28, 400); ctx.fillStyle = INK;
    return drawLines(ctx, wrap(ctx, text, INNER - 48, lang, lines), PAD + 24, y + (lang === "km" ? 44 : 40), lang === "km" ? 44 : 38) + 18;
  }
  // Draw twice: once to measure how tall the content is, then on a card just tall enough
  // (1080 x 1350 at least, up to 1080 x 1620) so text never runs into the footer.
  function render(lang, note, body) {
    var m = document.createElement("canvas"); m.width = W; m.height = 1700;
    var end = body(m.getContext("2d"));
    var h = Math.max(1350, Math.min(1620, Math.ceil((end + 190) / 10) * 10));
    var c = document.createElement("canvas"); c.width = W; c.height = h; var ctx = c.getContext("2d");
    background(ctx, h); body(ctx); footer(ctx, lang, note, h);
    return toBlob(c);
  }
  function toBlob(canvas) { return new Promise(function (ok) { canvas.toBlob(function (b) { ok(b); }, "image/png"); }); }

  var LBL = {
    en: { love: "Love", career: "Career", money: "Money", advice: "Today's advice", number: "Number", color: "Color", direction: "Direction", time: "Time",
          note: "Traditional Chinese zodiac reading for fun and self-reflection", friend: "Friendship", business: "Business", stars: "Love {L}  ·  Business {B}" },
    km: { love: "ស្នេហា", career: "ការងារ", money: "លុយកាក់", advice: "ដំបូន្មានថ្ងៃនេះ", number: "លេខ", color: "ពណ៌", direction: "ទិស", time: "ម៉ោង",
          note: "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត", friend: "មិត្តភាព", business: "អាជីវកម្ម", stars: "ស្នេហា {L}  ·  អាជីវកម្ម {B}" }
  };
  var kmd = function (v) { return String(v).replace(/\d/g, function (c) { return "០១២៣៤៥៦៧៨៩"[c]; }); };

  function daily(spec) {
    var L = spec.lang === "km" ? "km" : "en", T = LBL[L];
    return Promise.all([loadImg(medalSrc(spec.animal)), fontsReady(L)]).then(function (r) {
      return render(L, T.note, function (ctx) {
        ctx.textAlign = "center"; ctx.fillStyle = GOLD2; font(ctx, L, "body", 28, 600); ctx.fillText(spec.date || "", W / 2, 116);
        medal(ctx, r[0], W / 2, 262, 118);
        ctx.fillStyle = "#fff6dc"; font(ctx, L, "head", L === "km" ? 52 : 66, 700); ctx.fillText(spec.name || spec.animal, W / 2, 456);
        pill(ctx, spec.label || "", W / 2, 478, L, spec.tier === "caution" ? "#ff9aa8" : GOLD);
        font(ctx, L, "body", L === "km" ? 29 : 31, 400); ctx.fillStyle = INK;
        var y = drawLines(ctx, wrap(ctx, spec.fortune, INNER, L, 3), W / 2, 590, L === "km" ? 46 : 42, "center") + 6;
        // love / career / money panel: measure, then draw the box behind
        var top = y, yy = y + 48;
        var rows = [[T.love, spec.love], [T.career, spec.career], [T.money, spec.money]];
        var heights = rows.map(function (rw) { font(ctx, L, "body", L === "km" ? 26 : 27, 400); return wrap(ctx, rw[1], INNER - 48, L, 2).length; });
        var boxH = 30 + rows.reduce(function (acc, rw, i) { return acc + (L === "km" ? 42 : 38) + heights[i] * (L === "km" ? 42 : 36) + 14; }, 0);
        roundRect(ctx, PAD, top, INNER, boxH, 22); ctx.fillStyle = "rgba(10,7,34,.55)"; ctx.fill(); ctx.strokeStyle = "rgba(246,220,155,.35)"; ctx.lineWidth = 1.5; ctx.stroke();
        rows.forEach(function (rw) { yy = sectionAt(ctx, L, rw[0], rw[1], yy, 2); });
        y = top + boxH + 20;
        // lucky row
        var cells = [[T.number, L === "km" ? kmd(spec.number) : String(spec.number)], [T.color, spec.color], [T.direction, spec.direction], [T.time, L === "km" ? kmd(spec.time) : spec.time]];
        var cw = INNER / 4;
        cells.forEach(function (cell, i) {
          var cx = PAD + cw * i + cw / 2;
          roundRect(ctx, PAD + cw * i + 6, y, cw - 12, 100, 16); ctx.fillStyle = "rgba(246,220,155,.08)"; ctx.fill(); ctx.strokeStyle = "rgba(246,220,155,.4)"; ctx.stroke();
          ctx.textAlign = "center"; font(ctx, L, "body", 22, 600); ctx.fillStyle = SOFT; ctx.fillText(cell[0], cx, y + 34);
          font(ctx, L, "body", String(cell[1]).length > 9 ? 22 : 28, 700); ctx.fillStyle = "#fff3d1";
          if (i === 1 && spec.colorHex) { var tw = ctx.measureText(cell[1]).width; ctx.beginPath(); ctx.arc(cx - tw / 2 - 6, y + 72, 9, 0, Math.PI * 2); ctx.fillStyle = spec.colorHex; ctx.fill(); ctx.fillStyle = "#fff3d1"; ctx.fillText(cell[1], cx + 12, y + 80); }
          else ctx.fillText(cell[1], cx, y + 80);
        });
        y += 148;
        ctx.textAlign = "center"; font(ctx, L, "body", 26, 700); ctx.fillStyle = GOLD; ctx.fillText(T.advice, W / 2, y);
        font(ctx, L, "body", L === "km" ? 28 : 29, 400); ctx.fillStyle = INK;
        return drawLines(ctx, wrap(ctx, spec.advice, INNER - 40, L, 2), W / 2, y + 46, L === "km" ? 46 : 40, "center");
      });
    });
  }

  function pair(spec) {
    var L = spec.lang === "km" ? "km" : "en", T = LBL[L];
    return Promise.all([loadImg(medalSrc(spec.a)), loadImg(medalSrc(spec.b)), fontsReady(L)]).then(function (r) {
      return render(L, T.note, function (ctx) {
        medal(ctx, r[0], W / 2 - 220, 240, 128); medal(ctx, r[1], W / 2 + 220, 240, 128);
        ctx.textAlign = "center"; ctx.fillStyle = GOLD; font(ctx, "en", "head", 84, 700); ctx.fillText("&", W / 2, 270);
        ctx.fillStyle = "#fff6dc"; font(ctx, L, "head", L === "km" ? 40 : 52, 700);
        ctx.fillText(spec.nameA, W / 2 - 220, 432); ctx.fillText(spec.nameB, W / 2 + 220, 432);
        pill(ctx, spec.label, W / 2, 468, L, spec.type === "clash" ? "#ff9aa8" : GOLD);
        var star = function (n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); };
        ctx.textAlign = "center"; font(ctx, L, "body", 28, 600); ctx.fillStyle = GOLD2; ctx.fillText(T.stars.replace("{L}", star(spec.starsLove)).replace("{B}", star(spec.starsBiz)), W / 2, 580);
        font(ctx, L, "body", L === "km" ? 28 : 30, 400); ctx.fillStyle = INK;
        var y = drawLines(ctx, wrap(ctx, spec.intro, INNER, L, 3), W / 2, 646, L === "km" ? 46 : 42, "center") + 8;
        var rows = [[T.love, spec.love], [T.friend, spec.friendship], [T.business, spec.business]];
        var heights = rows.map(function (rw) { font(ctx, L, "body", L === "km" ? 26 : 27, 400); return wrap(ctx, rw[1], INNER - 48, L, 3).length; });
        var boxH = 30 + rows.reduce(function (acc, rw, i) { return acc + (L === "km" ? 42 : 38) + heights[i] * (L === "km" ? 42 : 36) + 14; }, 0);
        roundRect(ctx, PAD, y, INNER, boxH, 22); ctx.fillStyle = "rgba(10,7,34,.55)"; ctx.fill(); ctx.strokeStyle = "rgba(246,220,155,.35)"; ctx.lineWidth = 1.5; ctx.stroke();
        var yy = y + 48;
        rows.forEach(function (rw) { yy = sectionAt(ctx, L, rw[0], rw[1], yy, 3); });
        return y + boxH;
      });
    });
  }

  window.MBSShareCards = { daily: daily, pair: pair, _wrap: wrap };
})();
