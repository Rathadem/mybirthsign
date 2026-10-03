// Reusable "Share" button + popover, used on every result card and every
// blog post. Two entry points:
//   - shareRowHtml(title) returns markup to drop into a template string
//     (used by app.js, wedding.js, business-calculator.js for results).
//   - wireShareRows(root) finds any unwired ".share-row" under `root`
//     (default: whole document) and wires up its button + popover. Static
//     placeholders in blog posts are wired on page load; dynamically
//     injected result cards are wired right after their innerHTML is set.
//     A ".share-row" with no data-share-title falls back to the nearest
//     <article>'s <h1>, then to the page title.
//
// Facebook and Telegram support a real "share this link" web intent, so
// those open a share dialog directly. Instagram and TikTok have no public
// web intent for sharing an arbitrary link, so those copy the link to the
// clipboard and open the app/site instead, so the person can paste it in.

const _SHARE_NETWORKS = [
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    icon: '<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>'
  },
  {
    id: "telegram",
    label: "Telegram",
    color: "#29A9EB",
    icon: '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>'
  },
  {
    id: "tiktok",
    label: "TikTok",
    color: "#25F4EE",
    copyOnly: true,
    appUrl: "https://www.tiktok.com/",
    icon: '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "#E1306C",
    copyOnly: true,
    appUrl: "https://www.instagram.com/",
    icon: '<path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>'
  }
];

function _brandIconHtml(net) {
  return (
    '<svg class="share-net-icon" width="18" height="18" viewBox="0 0 24 24" fill="' + net.color + '" aria-hidden="true">' +
      net.icon +
    '</svg>'
  );
}

function _copyIconHtml() {
  return (
    '<svg class="share-net-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M10.5 13.5 13.5 10.5"></path>' +
      '<path d="M8 15.5a3.2 3.2 0 0 1 0-4.5l2-2a3.2 3.2 0 0 1 4.5 4.5"></path>' +
      '<path d="M16 8.5a3.2 3.2 0 0 1 0 4.5l-2 2a3.2 3.2 0 0 1-4.5-4.5"></path>' +
    '</svg>'
  );
}

function _imageIconHtml() {
  return (
    '<svg class="share-net-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="3" y="3" width="18" height="18" rx="2"></rect>' +
      '<circle cx="9" cy="9" r="2"></circle>' +
      '<path d="m21 15-5-5L5 21"></path>' +
    '</svg>'
  );
}

// Wraps `text` onto lines no wider than `maxWidth` on the given 2D context
// (which must already have its font set), returning an array of lines.
//
// Splits on whitespace first, but scripts like Khmer often have no spaces
// within a whole clause — a single "word" there can be far wider than the
// card itself. So any word that alone doesn't fit gets broken
// character-by-character as a fallback, instead of being left to overflow.
function _wrapCanvasText(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  words.forEach(function (word) {
    if (ctx.measureText(word).width > maxWidth) {
      if (line) { lines.push(line); line = ""; }
      let chunk = "";
      for (const ch of word) {
        const test = chunk + ch;
        if (ctx.measureText(test).width > maxWidth && chunk) {
          lines.push(chunk);
          chunk = ch;
        } else {
          chunk = test;
        }
      }
      line = chunk;
      return;
    }

    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

// A faint, muted strip of all 12 zodiac animals used as a decorative motif
// near the bottom of the share card, reinforcing the zodiac theme and
// filling what would otherwise be empty space.
const _ZODIAC_MOTIF = ["🐀", "🐂", "🐅", "🐇", "🐉", "🐍", "🐎", "🐐", "🐒", "🐓", "🐕", "🐖"];

function _roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}

// Deterministic pseudo-random generator (mulberry32) so the scattered
// starfield looks the same every time rather than flickering between
// re-renders of the same result.
function _seededRandom(seed) {
  let t = seed;
  return function () {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Draws a branded, portrait "share card" graphic (animal/result headline,
// subheading, optional badge, site wordmark) and resolves with a PNG Blob.
// `spec`: { emoji, heading, subheading, badge }
function _buildShareCardBlob(spec) {
  return new Promise(function (resolve) {
    const W = 1080, H = 1350;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const gold = "#d4af37";
    const paleGold = "#e9d28a";

    // Background: a deep night-sky gradient, richer at the edges.
    const bg = ctx.createRadialGradient(W / 2, H * 0.4, 80, W / 2, H * 0.5, H * 0.85);
    bg.addColorStop(0, "#1c1440");
    bg.addColorStop(0.55, "#140f2e");
    bg.addColorStop(1, "#0b0820");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Scattered faint stars for texture (deterministic per render).
    const rand = _seededRandom(42);
    for (let i = 0; i < 90; i++) {
      const sx = rand() * W;
      const sy = rand() * H;
      const r = rand() * 1.8 + 0.4;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(233,210,138," + (0.12 + rand() * 0.25).toFixed(2) + ")";
      ctx.fill();
    }

    // Soft decorative glow behind the emoji
    const glow = ctx.createRadialGradient(W / 2, 460, 40, W / 2, 460, 420);
    glow.addColorStop(0, "rgba(212,175,55,0.28)");
    glow.addColorStop(1, "rgba(212,175,55,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Outer card border with inset hairline for a framed, layered look.
    _roundRectPath(ctx, 28, 28, W - 56, H - 56, 28);
    ctx.strokeStyle = "rgba(212,175,55,0.55)";
    ctx.lineWidth = 3;
    ctx.stroke();
    _roundRectPath(ctx, 42, 42, W - 84, H - 84, 20);
    ctx.strokeStyle = "rgba(212,175,55,0.22)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Small diamond flourishes in each corner of the outer border.
    [[28, 28], [W - 28, 28], [28, H - 28], [W - 28, H - 28]].forEach(function (pt) {
      ctx.save();
      ctx.translate(pt[0], pt[1]);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = gold;
      ctx.fillRect(-7, -7, 14, 14);
      ctx.restore();
    });

    ctx.textAlign = "center";

    // Eyebrow label
    ctx.fillStyle = "rgba(180,169,214,0.85)";
    ctx.font = "600 26px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.save();
    ctx.letterSpacing = "4px";
    ctx.fillText("CHINESE ZODIAC READING", W / 2, 108);
    ctx.restore();

    // Site wordmark
    ctx.fillStyle = gold;
    ctx.font = "600 36px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.fillText("☾ MYBIRTHSIGN", W / 2, 160);

    // Thin rule under the wordmark
    ctx.strokeStyle = "rgba(212,175,55,0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 70, 186);
    ctx.lineTo(W / 2 + 70, 186);
    ctx.stroke();

    // Ring around the big emoji
    ctx.beginPath();
    ctx.arc(W / 2, 460, 215, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(212,175,55,0.45)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(W / 2, 460, 232, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(212,175,55,0.2)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Big emoji
    ctx.font = "260px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.fillText(spec.emoji || "🔮", W / 2, 565);

    // Heading (wraps up to 2 lines)
    ctx.fillStyle = "#f6f2ff";
    ctx.font = "700 72px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    const headingLines = _wrapCanvasText(ctx, spec.heading || "", W - 160).slice(0, 2);
    let y = 745;
    headingLines.forEach(function (line) {
      ctx.fillText(line, W / 2, y);
      y += 86;
    });

    // Optional badge pill (e.g. a luck verdict or star rating). Wraps onto
    // up to 2 lines (shrinking the font if it's still too wide) so long
    // text — a full sentence, or a longer script like Khmer — never
    // overflows the card.
    if (spec.badge) {
      const maxPillTextWidth = W - 160;
      let badgeFontPx = 34;
      let badgeLines = [];
      // Shrink the font (down to a floor) and allow up to 3 lines until the
      // text fits — _wrapCanvasText now also breaks unspaced scripts like
      // Khmer character-by-character, so this always terminates.
      while (true) {
        ctx.font = "600 " + badgeFontPx + "px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
        badgeLines = _wrapCanvasText(ctx, spec.badge, maxPillTextWidth).slice(0, 3);
        const stillOverflowing = badgeLines.some(function (l) { return ctx.measureText(l).width > maxPillTextWidth; });
        if (!stillOverflowing || badgeFontPx <= 20) break;
        badgeFontPx -= 2;
      }
      // ctx.font is already set to the size that was actually used above.

      const lineH = badgeFontPx + 2 + 30;
      const padX = 32;
      const padY = 22;
      const widest = badgeLines.reduce(function (m, l) { return Math.max(m, ctx.measureText(l).width); }, 0);
      const pillW = Math.min(widest + padX * 2, W - 100);
      const pillH = badgeLines.length * lineH + padY * 2 - 14;
      const pillX = W / 2 - pillW / 2;
      const pillY = y + 16;
      ctx.fillStyle = "rgba(212,175,55,0.16)";
      _roundRectPath(ctx, pillX, pillY, pillW, pillH, pillH / 2 > 40 ? 24 : pillH / 2);
      ctx.fill();
      ctx.strokeStyle = gold;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = paleGold;
      let by = pillY + padY + badgeFontPx * 0.72;
      badgeLines.forEach(function (line) {
        ctx.fillText(line, W / 2, by);
        by += lineH;
      });
      y = pillY + pillH + 46;
    } else {
      y += 24;
    }

    // Subheading (wraps up to 2 lines)
    if (spec.subheading) {
      ctx.fillStyle = "#b4a9d6";
      ctx.font = "400 38px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
      const subLines = _wrapCanvasText(ctx, spec.subheading, W - 200).slice(0, 3);
      subLines.forEach(function (line) {
        ctx.fillText(line, W / 2, y);
        y += 50;
      });
    }

    // Decorative zodiac motif strip, filling the space above the footer.
    ctx.font = "54px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.globalAlpha = 0.22;
    const motifY = H - 232;
    const motifGap = 72;
    const motifStartX = W / 2 - (motifGap * (_ZODIAC_MOTIF.length - 1)) / 2;
    _ZODIAC_MOTIF.forEach(function (emoji, i) {
      ctx.fillText(emoji, motifStartX + i * motifGap, motifY);
    });
    ctx.globalAlpha = 1;

    // Footer
    ctx.strokeStyle = "rgba(180,169,214,0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 120, H - 150);
    ctx.lineTo(W / 2 + 120, H - 150);
    ctx.stroke();
    ctx.fillStyle = gold;
    ctx.font = "600 38px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.fillText("mybirthsign.com", W / 2, H - 98);
    ctx.fillStyle = "rgba(180,169,214,0.75)";
    ctx.font = "400 26px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.fillText("Find your own zodiac sign, free", W / 2, H - 62);

    canvas.toBlob(function (blob) { resolve(blob); }, "image/png");
  });
}

// Draws a heart-shaped path. (cx, topY) is the point of the notch between
// the two lobes at the top of the heart; `w`/`h` set its bounding box.
function _heartPath(ctx, cx, topY, w, h) {
  const topCurveHeight = h * 0.3;
  ctx.beginPath();
  ctx.moveTo(cx, topY + topCurveHeight);
  ctx.bezierCurveTo(cx, topY, cx - w / 2, topY, cx - w / 2, topY + topCurveHeight);
  ctx.bezierCurveTo(cx - w / 2, topY + (h + topCurveHeight) / 2, cx, topY + (h + topCurveHeight) / 2, cx, topY + h);
  ctx.bezierCurveTo(cx, topY + (h + topCurveHeight) / 2, cx + w / 2, topY + (h + topCurveHeight) / 2, cx + w / 2, topY + topCurveHeight);
  ctx.bezierCurveTo(cx + w / 2, topY, cx, topY, cx, topY + topCurveHeight);
  ctx.closePath();
}

// A faint field of small scattered hearts used as background texture on the
// pink compatibility card, in place of the zodiac card's starfield.
function _scatterHearts(ctx, W, H, seed, count) {
  const rand = _seededRandom(seed);
  for (let i = 0; i < count; i++) {
    const hx = rand() * W;
    const hy = rand() * H;
    const s = rand() * 20 + 10;
    ctx.save();
    ctx.globalAlpha = 0.10 + rand() * 0.16;
    ctx.fillStyle = "#ffffff";
    _heartPath(ctx, hx, hy, s, s);
    ctx.fill();
    ctx.restore();
  }
}

// Draws a branded, portrait "compatibility share card" (two people, a big
// percentage heart, and a supportive tagline), modeled on the pink/hearts
// "LoveMath"-style layout, and resolves with a PNG Blob.
// `spec`: { p1Label, p1Sub, p1Emoji, p2Label, p2Sub, p2Emoji, overall, tagline, overallLabel, eyebrow }
function _buildCompatCardBlob(spec) {
  // Wait for webfonts to finish loading first: if "Noto Sans Khmer" is still
  // loading when we measureText() for the name/date pills below, the canvas
  // silently falls back to a narrower system font for the measurement, then
  // (once the webfont finishes loading a moment later) draws the *actual*
  // text with the real, wider Khmer glyphs — so the pill ends up too narrow
  // and the text overflows its edges. Waiting for fonts.ready keeps the
  // measurement and the draw using the same, final font.
  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  return fontsReady.then(function () {
    return new Promise(function (resolve) {
    const W = 1080, H = 1420;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const deepPink = "#c2185b";
    const hotPink = "#ff5c8d";
    const white = "#ffffff";

    // Background: warm pink gradient.
    const bg = ctx.createRadialGradient(W / 2, H * 0.35, 60, W / 2, H * 0.5, H * 0.9);
    bg.addColorStop(0, "#ff8fb3");
    bg.addColorStop(0.55, "#ff6a9c");
    bg.addColorStop(1, "#e84a85");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    _scatterHearts(ctx, W, H, 7, 70);

    // Outer card border, framed look.
    _roundRectPath(ctx, 28, 28, W - 56, H - 56, 28);
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 3;
    ctx.stroke();
    _roundRectPath(ctx, 42, 42, W - 84, H - 84, 20);
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.textAlign = "center";

    // Eyebrow + site wordmark
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "600 26px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.save();
    ctx.letterSpacing = "3px";
    ctx.fillText(spec.eyebrow || "RELATIONSHIP COMPATIBILITY", W / 2, 108);
    ctx.restore();

    ctx.fillStyle = white;
    ctx.font = "700 44px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.fillText("💞 MYBIRTHSIGN", W / 2, 160);

    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 80, 186);
    ctx.lineTo(W / 2 + 80, 186);
    ctx.stroke();

    // Two person "avatar" circles with a small heart between them.
    const avatarY = 330;
    const avatarR = 130;
    const avatarGap = 280;
    const p1X = W / 2 - avatarGap / 2;
    const p2X = W / 2 + avatarGap / 2;

    function drawAvatar(cx, cy, r, emoji, colorA, colorB) {
      const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
      grad.addColorStop(0, colorA);
      grad.addColorStop(1, colorB);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = white;
      ctx.stroke();
      ctx.fillStyle = white;
      ctx.font = (r * 1.05) + "px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
      ctx.fillText(emoji, cx, cy + r * 0.36);
    }

    drawAvatar(p1X, avatarY, avatarR, spec.p1Emoji || "💗", "#6ec3ff", "#4a90e2");
    drawAvatar(p2X, avatarY, avatarR, spec.p2Emoji || "💗", "#ff9ecf", "#e0569f");

    // Small heart between the two avatars.
    ctx.fillStyle = white;
    _heartPath(ctx, W / 2, avatarY - 34, 70, 64);
    ctx.fill();

    // Name/date pills under each avatar.
    function drawPill(cx, cy, label, sub) {
      ctx.font = "700 32px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
      const labelW = ctx.measureText(label).width;
      ctx.font = "400 28px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
      const subW = sub ? ctx.measureText(sub).width : 0;
      const pillW = Math.max(labelW, subW) + 56;
      const pillH = sub ? 108 : 70;
      _roundRectPath(ctx, cx - pillW / 2, cy, pillW, pillH, 18);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fill();
      ctx.fillStyle = "#7a1942";
      ctx.font = "700 32px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
      ctx.fillText(label, cx, cy + 44);
      if (sub) {
        ctx.fillStyle = "#c2185b";
        ctx.font = "400 26px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
        ctx.fillText(sub, cx, cy + 86);
      }
    }
    drawPill(p1X, avatarY + avatarR + 26, spec.p1Label || "Person 1", spec.p1Sub || "");
    drawPill(p2X, avatarY + avatarR + 26, spec.p2Label || "Person 2", spec.p2Sub || "");

    // Big percentage heart.
    const bigHeartCenterY = 900;
    const bigHeartW = 560, bigHeartH = 500;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;
    const heartGrad = ctx.createLinearGradient(0, bigHeartCenterY - bigHeartH / 2, 0, bigHeartCenterY + bigHeartH / 2);
    heartGrad.addColorStop(0, hotPink);
    heartGrad.addColorStop(1, deepPink);
    ctx.fillStyle = heartGrad;
    _heartPath(ctx, W / 2, bigHeartCenterY - bigHeartH / 2, bigHeartW, bigHeartH);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = white;
    ctx.font = "700 36px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.fillText(spec.overallLabel || "Compatibility", W / 2, bigHeartCenterY - 60);
    ctx.font = "800 108px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.fillText((spec.overall != null ? spec.overall : "--") + "%", W / 2, bigHeartCenterY + 40);

    // Five-heart rating row, filled proportionally to the overall score.
    const filledHearts = Math.max(0, Math.min(5, Math.round(((spec.overall || 0) / 100) * 5)));
    const miniSize = 36, miniGap = 48;
    const miniStartX = W / 2 - (miniGap * 4) / 2;
    for (let i = 0; i < 5; i++) {
      const hx = miniStartX + i * miniGap;
      const hy = bigHeartCenterY + 110;
      ctx.fillStyle = i < filledHearts ? white : "rgba(255,255,255,0.35)";
      _heartPath(ctx, hx, hy, miniSize, miniSize);
      ctx.fill();
    }

    // Supportive tagline below the heart.
    let taglineBottom = bigHeartCenterY + 190;
    if (spec.tagline) {
      ctx.fillStyle = "#7a1942";
      ctx.font = "italic 600 34px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
      const lines = _wrapCanvasText(ctx, spec.tagline, W - 220).slice(0, 3);
      const boxPadY = 24, lineH = 42;
      const boxH = lines.length * lineH + boxPadY * 2;
      const boxY = bigHeartCenterY + 180;
      _roundRectPath(ctx, 90, boxY, W - 180, boxH, 20);
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.fill();
      ctx.fillStyle = "#7a1942";
      let ty = boxY + boxPadY + 30;
      lines.forEach(function (line) {
        ctx.fillText(line, W / 2, ty);
        ty += lineH;
      });
      taglineBottom = boxY + boxH;
    }

    // Footer — always clear of the tagline box, however many lines it wrapped to.
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "600 36px system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans Khmer', Arial, sans-serif";
    ctx.fillText("mybirthsign.com", W / 2, Math.max(H - 70, taglineBottom + 54));

    canvas.toBlob(function (blob) { resolve(blob); }, "image/png");
    });
  });
}

// Dispatches to the right card-drawing function based on `spec.cardType`
// ("compat" for the pink relationship card, otherwise the default zodiac
// card), so callers of shareBlockHtml()/wireShareRows() don't need to care
// which drawing routine backs a given result's image.
function _buildCardBlob(spec) {
  return spec && spec.cardType === "compat" ? _buildCompatCardBlob(spec) : _buildShareCardBlob(spec);
}

function _shareInnerHtml() {
  const options = _SHARE_NETWORKS.map(function (net) {
    // Facebook/Telegram are real <a target="_blank"> links (href is filled
    // in by wireShareRows() right away, before the row can be interacted
    // with) rather than a window.open() call from a click handler, because
    // plain anchor-tag navigation is far more reliably allowed than a
    // scripted popup inside constrained contexts like a sandboxed artifact
    // preview or a mobile browser's popup blocker — a window.open() call
    // there can silently do nothing even on a direct, synchronous tap.
    if (net.copyOnly) {
      return (
        '<button type="button" class="share-option" data-share-net="' + net.id + '">' +
          _brandIconHtml(net) +
          '<span class="share-option-label">' + net.label + '</span>' +
        '</button>'
      );
    }
    return (
      '<a class="share-option" data-share-net="' + net.id + '" href="#" target="_blank" rel="noopener">' +
        _brandIconHtml(net) +
        '<span class="share-option-label">' + net.label + '</span>' +
      '</a>'
    );
  }).join("");

  return (
    '<button type="button" class="share-btn" aria-haspopup="true" aria-expanded="false">' +
      '<svg class="share-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>' +
        '<line x1="8.6" y1="10.6" x2="15.4" y2="6.4"></line><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"></line>' +
      '</svg>' +
      '<span class="share-btn-label"></span>' +
    '</button>' +
    '<div class="share-popover" hidden>' +
      '<button type="button" class="share-option share-image">' +
        _imageIconHtml() +
        '<span class="share-option-label share-image-label"></span>' +
      '</button>' +
      options +
      '<button type="button" class="share-option share-copy">' +
        _copyIconHtml() +
        '<span class="share-option-label share-copy-label"></span>' +
      '</button>' +
    '</div>'
  );
}

function shareRowHtml(title, cardSpec) {
  const safeTitle = title ? String(title).replace(/"/g, "&quot;") : "";
  let attrs = ' data-share-title="' + safeTitle + '"';
  if (cardSpec) {
    attrs += ' data-share-card="' + JSON.stringify(cardSpec).replace(/"/g, "&quot;") + '"';
  }
  return '<div class="share-row"' + attrs + '>' + _shareInnerHtml() + '</div>';
}

// Like shareRowHtml(), but also shows the branded card itself (the same
// image the "Share image" button generates) right on the page, so people
// can see — and admire — the card before they ever open the share menu.
function shareBlockHtml(title, cardSpec) {
  return (
    '<div class="share-card-block">' +
      '<div class="share-card-wrap"><img class="share-card-img" alt="' +
        (title ? String(title).replace(/"/g, "&quot;") : "Zodiac result card") +
      '" loading="lazy"></div>' +
      shareRowHtml(title, cardSpec) +
    '</div>'
  );
}

let _shareOutsideClickWired = false;
function _ensureShareOutsideClickHandler() {
  if (_shareOutsideClickWired) return;
  _shareOutsideClickWired = true;
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".share-row").forEach(function (row) {
      if (row.contains(e.target)) return;
      const pop = row.querySelector(".share-popover");
      const btn = row.querySelector(".share-btn");
      if (pop && !pop.hidden) {
        pop.hidden = true;
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function _openInNewTab(url) {
  // A real, temporary <a target="_blank"> click is more reliably allowed
  // than a scripted window.open() call in constrained contexts (a
  // sandboxed artifact preview, some mobile browsers' popup blockers),
  // since it's genuine anchor-tag navigation rather than a popup the
  // browser has to specifically permit for scripts.
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function _downloadBlob(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 30000);
}

function _copyToClipboard(text) {
  function fallbackCopy() {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* best effort */ }
    document.body.removeChild(ta);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
}

function wireShareRows(root) {
  const scope = root || document;
  const lang = (typeof getLang === "function") ? getLang() : "en";
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};
  const shareLabel = S.share_button || "Share";
  const copyLabel = S.share_copy_link || "Copy link";
  const copiedLabel = S.share_copied || "Link copied!";
  const pasteTpl = S.share_paste_note_tpl || "Link copied — paste it in {network}";
  const imageLabel = S.share_image_option || "Share image";
  const imagePreparingLabel = S.share_image_preparing || "Preparing image…";
  const imageSavedLabel = S.share_image_saved || "Image saved!";
  const imageFailedLabel = S.share_image_failed || "Couldn't create the image";

  scope.querySelectorAll(".share-row:not([data-share-wired])").forEach(function (row) {
    row.setAttribute("data-share-wired", "true");

    if (!row.querySelector(".share-btn")) {
      row.innerHTML = _shareInnerHtml();
    }

    let title = row.getAttribute("data-share-title");
    if (!title) {
      const article = row.closest("article");
      const h1 = article && article.querySelector("h1");
      title = (h1 && h1.textContent.trim()) || document.title;
    }
    const url = window.location.href.split("#")[0];
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    let cardSpec = null;
    const cardAttr = row.getAttribute("data-share-card");
    if (cardAttr) {
      try { cardSpec = JSON.parse(cardAttr); } catch (e) { cardSpec = null; }
    }
    if (!cardSpec) cardSpec = { emoji: "🔮", heading: title, subheading: "mybirthsign.com" };

    // If this row is wrapped in a .share-card-block (shareBlockHtml()), it
    // has a visible <img class="share-card-img"> placeholder — render the
    // same branded card the "Share image" button would produce, right on
    // the page, so people see it before they ever open the share menu.
    const previewImg = row.parentElement &&
      row.parentElement.classList.contains("share-card-block") &&
      row.parentElement.querySelector(".share-card-img");
    if (previewImg && !previewImg.src) {
      _buildCardBlob(cardSpec).then(function (blob) {
        if (blob) previewImg.src = URL.createObjectURL(blob);
      });
    }

    const btn = row.querySelector(".share-btn");
    const label = row.querySelector(".share-btn-label");
    const pop = row.querySelector(".share-popover");
    const copyBtn = row.querySelector(".share-copy");
    const copyLabelEl = copyBtn && copyBtn.querySelector(".share-copy-label");
    const imageBtn = row.querySelector(".share-image");
    const imageLabelEl = imageBtn && imageBtn.querySelector(".share-image-label");
    if (label) label.textContent = shareLabel;
    if (copyLabelEl) copyLabelEl.textContent = copyLabel;
    if (imageLabelEl) imageLabelEl.textContent = imageLabel;

    function openPopover() {
      document.querySelectorAll(".share-popover").forEach(function (p) { p.hidden = true; });
      pop.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }

    function togglePopover() {
      const isOpen = !pop.hidden;
      document.querySelectorAll(".share-popover").forEach(function (p) { p.hidden = true; });
      pop.hidden = isOpen;
      btn.setAttribute("aria-expanded", String(!isOpen));
    }

    if (btn && pop) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (navigator.share) {
          // navigator.share() can fail two different ways when the page is
          // embedded somewhere that blocks the Web Share API via
          // Permissions-Policy (e.g. a sandboxed preview iframe): it can
          // throw *synchronously*, or it can return a promise that *rejects
          // asynchronously* with no visible share sheet ever appearing.
          // Either way, without handling both cases the button just looks
          // like it does nothing — so fall back to the manual popover both
          // times, unless the rejection was the user deliberately cancelling
          // the native share sheet (AbortError).
          try {
            const sharePromise = navigator.share({ title: title, url: url });
            if (sharePromise && typeof sharePromise.catch === "function") {
              sharePromise.catch(function (err) {
                if (err && err.name === "AbortError") return;
                openPopover();
              });
            }
            return;
          } catch (err) {
            openPopover();
            return;
          }
        }
        togglePopover();
      });
    }

    const shareUrls = {
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl,
      telegram: "https://t.me/share/url?url=" + encodedUrl + "&text=" + encodedTitle
    };

    row.querySelectorAll("[data-share-net]").forEach(function (optEl) {
      const netId = optEl.getAttribute("data-share-net");
      const net = _SHARE_NETWORKS.filter(function (n) { return n.id === netId; })[0];
      if (!net) return;

      if (!net.copyOnly) {
        // Set the real href right away (before the row can be tapped) so
        // these behave as plain link navigation, not a scripted popup.
        optEl.setAttribute("href", shareUrls[net.id]);
        return;
      }

      // No public web intent exists for sharing an arbitrary link straight
      // into Instagram or TikTok, so copy the link and open the app/site
      // so the person can paste it themselves.
      optEl.addEventListener("click", function () {
        _copyToClipboard(url);
        const labelEl = optEl.querySelector(".share-option-label");
        const original = labelEl ? labelEl.textContent : "";
        if (labelEl) labelEl.textContent = pasteTpl.replace("{network}", net.label);
        _openInNewTab(net.appUrl);
        setTimeout(function () {
          if (labelEl) labelEl.textContent = original;
          pop.hidden = true;
          btn.setAttribute("aria-expanded", "false");
        }, 2200);
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        _copyToClipboard(url);
        if (copyLabelEl) copyLabelEl.textContent = copiedLabel;
        setTimeout(function () {
          if (copyLabelEl) copyLabelEl.textContent = copyLabel;
        }, 1800);
      });
    }

    if (imageBtn) {
      imageBtn.addEventListener("click", function () {
        if (imageLabelEl) imageLabelEl.textContent = imagePreparingLabel;
        imageBtn.disabled = true;

        function resetLabel(text, delay) {
          setTimeout(function () {
            if (imageLabelEl) imageLabelEl.textContent = text;
            imageBtn.disabled = false;
          }, delay || 0);
        }

        _buildCardBlob(cardSpec).then(function (blob) {
          if (!blob) {
            resetLabel(imageFailedLabel, 0);
            setTimeout(function () { if (imageLabelEl) imageLabelEl.textContent = imageLabel; }, 2200);
            return;
          }
          const file = new File([blob], "mybirthsign-result.png", { type: "image/png" });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              const sharePromise = navigator.share({ files: [file], title: title });
              if (sharePromise && typeof sharePromise.catch === "function") {
                sharePromise
                  .then(function () { resetLabel(imageLabel, 0); })
                  .catch(function (err) {
                    if (err && err.name === "AbortError") { resetLabel(imageLabel, 0); return; }
                    _downloadBlob(blob, "mybirthsign-result.png");
                    if (imageLabelEl) imageLabelEl.textContent = imageSavedLabel;
                    resetLabel(imageLabel, 2200);
                  });
                return;
              }
              resetLabel(imageLabel, 0);
              return;
            } catch (err) {
              // fall through to a direct download below
            }
          }

          _downloadBlob(blob, "mybirthsign-result.png");
          if (imageLabelEl) imageLabelEl.textContent = imageSavedLabel;
          resetLabel(imageLabel, 2200);
        }).catch(function () {
          resetLabel(imageFailedLabel, 0);
          setTimeout(function () { if (imageLabelEl) imageLabelEl.textContent = imageLabel; }, 2200);
        });
      });
    }
  });

  _ensureShareOutsideClickHandler();
}

document.addEventListener("DOMContentLoaded", function () {
  wireShareRows(document);
});
