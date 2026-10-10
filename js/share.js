// share.js — the "Share" button + menu used on result cards, daily fortunes and blog posts.
//   shareRowHtml(title, cardSpec, shareUrl)  markup for a result card (app.js, compat-page.js, ...)
//   shareBlockHtml(title, cardSpec, shareUrl) the same, plus a preview of the image card
//   wireShareRows(root)                       wires every unwired ".share-row" (runs on page load too)
// A row may carry data-share-title, data-share-url (the result's own public address: animals / date /
// language only, never birth dates or names) and data-share-card (what the image card shows).
// They are read when the menu is used, so a page may fill them in after load.
//
// What each action really does (no platform is promised more than it supports):
//   Share image     phone/tablet share sheet with a 1080x1350 image (only where the browser can share files)
//   Download image  saves a 1080x1080 image
//   Copy link       copies the result's link
//   More apps       the device's own share sheet with the link (only where the browser supports it)
//   Facebook, WhatsApp, Telegram   their official "share a link" pages; the preview comes from the page tags
//   Pinterest       Pinterest's "create a Pin" page with the link and the result's fixed public preview image
//   Instagram, TikTok  neither accepts a website link, so a 1080x1920 image is shared or saved and the menu
//                   shows how to post it in the app
// Image cards are drawn on the visitor's device by js/share-cards.js (loaded on first use); nothing is uploaded.

const _SHARE_NETS = [
  { id: "facebook", label: "Facebook", color: "#1877F2", link: true, icon: "<path d=\"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z\"/>" },
  { id: "whatsapp", label: "WhatsApp", color: "#25D366", link: true, icon: "<path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z\"/>" },
  { id: "telegram", label: "Telegram", color: "#29A9EB", link: true, icon: "<path d=\"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z\"/>" },
  { id: "pinterest", label: "Pinterest", color: "#E60023", link: true, icon: "<path d=\"M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z\"/>" },
  { id: "instagram", label: "Instagram", color: "#E1306C", link: false, icon: "<path d=\"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077\"/>" },
  { id: "tiktok", label: "TikTok", color: "#25F4EE", link: false, icon: "<path d=\"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z\"/>" }
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
function _svgIcon(paths) {
  return '<svg class="share-net-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + "</svg>";
}
const _ICON_DOWNLOAD = _svgIcon('<path d="M12 3v12"></path><path d="M7 10l5 5 5-5"></path><path d="M5 21h14"></path>');
const _ICON_MORE = _svgIcon('<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.6" y1="10.6" x2="15.4" y2="6.4"></line><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"></line>');

const _ZODIAC = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
const _CARD_TYPES = ["daily", "lucky", "sign", "pair", "love", "business", "article", "dream"];

// ---------------------------------------------------------------- image cards
let _shareCardsLoading = null;
function _loadShareCards() {
  if (window.MBSShareCards) return Promise.resolve(window.MBSShareCards);
  if (_shareCardsLoading) return _shareCardsLoading;
  const me = document.querySelector('script[src*="share.js"]');
  const src = me ? me.src.replace(/share\.js.*$/, "share-cards.js") : "/js/share-cards.js";
  _shareCardsLoading = new Promise(function (resolve, reject) {
    const s = document.createElement("script");
    s.src = src; s.onload = function () { resolve(window.MBSShareCards); };
    s.onerror = function () { _shareCardsLoading = null; reject(new Error("share cards unavailable")); };
    document.head.appendChild(s);
  });
  return _shareCardsLoading;
}
// Older result cards passed { heading, subheading, ... }; they become a simple "article" card.
function _normalizeSpec(spec, title, lang) {
  const s = spec && typeof spec === "object" ? Object.assign({}, spec) : {};
  if (!s.lang) s.lang = lang;
  if (_CARD_TYPES.indexOf(s.cardType) < 0) {
    return { cardType: "article", lang: s.lang, title: s.heading || title || document.title, sub: s.subheading || "", animal: s.animal };
  }
  return s;
}
function _buildCardBlob(spec, format) {
  const s = _normalizeSpec(spec, "", (typeof getLang === "function") ? getLang() : "en");
  return _loadShareCards().then(function (m) { return m[s.cardType](s, format || "portrait"); });
}

// ---------------------------------------------------------------- helpers
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
function _shareUrlFor(row, lang) {
  let u;
  try {
    const own = row.getAttribute("data-share-url");
    u = new URL(own || window.location.href, window.location.origin);
    ["person1", "person2", "g1", "g2", "dob", "date", "name"].forEach(function (k) { u.searchParams.delete(k); });
    if (lang === "km") u.searchParams.set("lang", "km"); else u.searchParams.delete("lang");
    if (!own) u.hash = "";
    return u.toString();
  } catch (e) {
    return window.location.href.split("#")[0];
  }
}
// Pinterest needs a public image address. Personal cards exist only on the visitor's device, so a Pin uses
// the result's fixed public preview image (the same one Facebook shows), or the page's own og:image.
function _pinImageFor(spec) {
  const o = window.location.origin, low = function (a) { return String(a).toLowerCase(); };
  const pairImg = function (a, b) {
    const i = _ZODIAC.indexOf(a), j = _ZODIAC.indexOf(b);
    if (i < 0 || j < 0) return null;
    return o + "/images/og/pair-" + low(i <= j ? a : b) + "-" + low(i <= j ? b : a) + ".jpg";
  };
  let img = null;
  if (spec) {
    if (spec.a && spec.b) img = pairImg(spec.a, spec.b);
    else if (spec.animal && _ZODIAC.indexOf(spec.animal) > -1) img = o + "/images/og/sign-" + low(spec.animal) + ".jpg";
    else if (spec.top && spec.top[0] && _ZODIAC.indexOf(spec.top[0]) > -1) img = o + "/images/og/sign-" + low(spec.top[0]) + ".jpg";
  }
  if (!img) {
    const m = document.querySelector('meta[property="og:image"]');
    img = m && m.content ? m.content : o + "/images/og/site.jpg";
  }
  return img;
}
function _strings(lang) {
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};
  const d = function (k, en) { return S[k] || en; };
  return {
    share: d("share_button", "Share"), copy: d("share_copy_link", "Copy link"), copied: d("share_copied", "Link copied!"),
    image: d("share_image_option", "Share image"), preparing: d("share_image_preparing", "Preparing image…"),
    saved: d("share_image_saved", "Image saved!"), failed: d("share_image_failed", "Couldn't create the image"),
    download: d("share_download", "Download image"), more: d("share_more_apps", "More apps…"),
    menu: d("share_menu_label", "Share options"),
    facebook: d("share_fb_steps", "Choose Facebook in the list — your result picture goes into a new post (its QR code leads to MyBirthSign)."),
    facebookLink: d("share_fb_link_steps", "Choose Facebook in the list to post the link."),
    fbReady: d("share_fb_ready", "Facebook — tap again to share"),
    tapAgain: d("share_tap_again", "Ready — tap again"),
    inApp: d("share_in_app", "This app's built-in browser can't save or share pictures. Tap ⋯ and choose “Open in browser” (Safari or Chrome), then try again."),
    instagram: d("share_ig_steps", "Instagram doesn't accept website links. Post the image instead: pick Instagram in the share list, or open Instagram, tap +, choose Story or Post and select the saved image."),
    tiktok: d("share_tt_steps", "TikTok doesn't accept website links. Post the image instead: pick TikTok in the share list, or open TikTok, tap +, then Upload and select the saved image.")
  };
}
function _isPhone() {
  try { if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return true; } catch (e) { /* ignore */ }
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");
}
// in-app browsers (Facebook, Messenger, Instagram, LINE, TikTok…) block downloads and often the share sheet
function _isInAppBrowser() { return /FBAN|FBAV|FB_IAB|Messenger|Instagram|Line\/|musical_ly|BytedanceWebview|TikTok/i.test(navigator.userAgent || ""); }
function _canShareFiles() {
  try {
    if (!navigator.canShare) return false;
    const f = new File([new Blob(["x"], { type: "image/png" })], "t.png", { type: "image/png" });
    return navigator.canShare({ files: [f] });
  } catch (e) { return false; }
}

// ---------------------------------------------------------------- markup
function _shareInnerHtml() {
  const opt = function (cls, icon, extra) {
    return '<button type="button" class="share-option ' + cls + '"' + (extra || "") + ">" + icon + '<span class="share-option-label"></span></button>';
  };
  return (
    '<button type="button" class="share-btn" aria-haspopup="true" aria-expanded="false">' +
      '<svg class="share-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>' +
        '<line x1="8.6" y1="10.6" x2="15.4" y2="6.4"></line><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"></line>' +
      "</svg>" +
      '<span class="share-btn-label"></span>' +
    "</button>" +
    '<div class="share-popover" role="group" hidden>' +
      opt("share-image", _imageIconHtml()) +
      opt("share-more", _ICON_MORE) +
      opt("share-copy", _copyIconHtml()) +
      opt("share-download", _ICON_DOWNLOAD) +
      '<p class="share-note" role="status" hidden></p>' +
    "</div>"
  );
}
function shareRowHtml(title, cardSpec, shareUrl) {
  const safeTitle = title ? String(title).replace(/"/g, "&quot;") : "";
  let attrs = ' data-share-title="' + safeTitle + '"';
  if (shareUrl) attrs += ' data-share-url="' + String(shareUrl).replace(/"/g, "&quot;") + '"';
  if (cardSpec) attrs += ' data-share-card="' + JSON.stringify(cardSpec).replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '"';
  return '<div class="share-row"' + attrs + ">" + _shareInnerHtml() + "</div>";
}
function shareBlockHtml(title, cardSpec, shareUrl) {
  return (
    '<div class="share-card-block">' +
      '<div class="share-card-wrap"><img class="share-card-img" alt="' +
        (title ? String(title).replace(/"/g, "&quot;") : "Zodiac result card") +
      '" loading="lazy"></div>' +
      shareRowHtml(title, cardSpec, shareUrl) +
    "</div>"
  );
}

// On phones the menu opens as a bottom sheet. It is moved to <body> while open so no section of the page
// (decorated frames, animations, overflow) can cover or clip it; a dimmed backdrop sits behind it.
const _SHARE_SHEET = window.matchMedia ? window.matchMedia("(max-width: 560px)") : null;
let _shareBackdrop = null;
function _closeSharePop(p, focusBtn) {
  if (!p || p.hidden) return;
  p.hidden = true;
  p.classList.remove("share-sheet");
  if (p.__home && p.parentNode !== p.__home) p.__home.appendChild(p);
  if (p.__btn) { p.__btn.setAttribute("aria-expanded", "false"); if (focusBtn) p.__btn.focus(); }
  if (_shareBackdrop && !document.querySelector(".share-popover.share-sheet:not([hidden])")) _shareBackdrop.hidden = true;
}
function _closeAllSharePops(except, focusBtn) {
  document.querySelectorAll(".share-popover:not([hidden])").forEach(function (p) { if (p !== except) _closeSharePop(p, focusBtn); });
}
let _shareOutsideClickWired = false;
function _ensureShareOutsideClickHandler() {
  if (_shareOutsideClickWired) return;
  _shareOutsideClickWired = true;
  document.addEventListener("click", function (e) {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute("download")) return;   // our own image download, not an outside tap
    document.querySelectorAll(".share-popover:not([hidden])").forEach(function (p) {
      if (p.contains(e.target) || (p.__home && p.__home.contains(e.target))) return;
      _closeSharePop(p);
    });
  });
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") _closeAllSharePops(null, true);
});

// ---------------------------------------------------------------- wiring
function wireShareRows(root) {
  const scope = root || document;
  const lang = (typeof getLang === "function") ? getLang() : "en";
  const T = _strings(lang);
  const canFiles = _canShareFiles();
  const canLink = typeof navigator.share === "function";

  scope.querySelectorAll(".share-row:not([data-share-wired])").forEach(function (row) {
    row.setAttribute("data-share-wired", "true");
    if (!row.querySelector(".share-btn")) row.innerHTML = _shareInnerHtml();

    const btn = row.querySelector(".share-btn"), pop = row.querySelector(".share-popover"), note = row.querySelector(".share-note");
    const q = function (sel) { return row.querySelector(sel); };
    const label = function (el, text) { const l = el && el.querySelector(".share-option-label"); if (l) l.textContent = text; };
    if (!btn || !pop) return;
    const own = row.getAttribute("data-share-label-" + lang) || row.getAttribute("data-share-label");   // optional per-row label
    btn.querySelector(".share-btn-label").textContent = own || T.share;
    if (row.hasAttribute("data-share-icon-only")) btn.setAttribute("aria-label", own || T.share);
    pop.setAttribute("aria-label", T.menu);
    label(q(".share-image"), T.image); label(q(".share-download"), T.download); label(q(".share-copy"), T.copy); label(q(".share-more"), T.more);
    if (!canFiles && q(".share-image")) q(".share-image").hidden = true;      // file sharing unsupported here: Download covers it
    if (canFiles && q(".share-download")) q(".share-download").hidden = true; // menu = Share image, Copy link, More apps (Download only where Share image can't work)
    if (!canLink && q(".share-more")) q(".share-more").hidden = true;

    // read on use, so values filled in after page load are respected
    const title = function () {
      let t = row.getAttribute("data-share-title");
      if (!t) { const a = row.closest("article"), h1 = a && a.querySelector("h1"); t = (h1 && h1.textContent.trim()) || document.title; }
      return t;
    };
    const url = function () { return _shareUrlFor(row, lang); };
    const spec = function () {
      let s = null;
      const raw = row.getAttribute("data-share-card");
      if (raw) { try { s = JSON.parse(raw); } catch (e) { s = null; } }
      return _normalizeSpec(s, title(), lang);
    };
    // images are drawn once per format and kept, so a second tap is instant
    const blobs = {}, ready = {};
    const blobKey = function (format) { return format + "|" + (row.getAttribute("data-share-card") || "") + "|" + title(); };
    const blobFor = function (format) {
      const key = blobKey(format);
      if (!blobs[key]) blobs[key] = _buildCardBlob(spec(), format).then(function (b) { if (!b) delete blobs[key]; else ready[key] = b; return b; }, function (e) { delete blobs[key]; throw e; });
      return blobs[key];
    };
    const readyBlob = function (format) { return ready[blobKey(format)] || null; };
    const fileName = function (format) { return "mybirthsign-" + (spec().cardType || "card") + "-" + format + ".png"; };

    const block = row.parentElement && row.parentElement.classList.contains("share-card-block") && row.parentElement.querySelector(".share-card-img");
    if (block && !block.src) blobFor("portrait").then(function (b) { if (b) block.src = URL.createObjectURL(b); }).catch(function () {});

    function showNote(text) { if (!note) return; note.textContent = text || ""; note.hidden = !text; }
    pop.__btn = btn; pop.__home = row;
    function setOpen(open) {
      _closeAllSharePops(pop);
      if (!open) { _closeSharePop(pop); return; }
      if (_SHARE_SHEET && _SHARE_SHEET.matches) {
        if (!_shareBackdrop) { _shareBackdrop = document.createElement("div"); _shareBackdrop.className = "share-backdrop"; document.body.appendChild(_shareBackdrop); }
        _shareBackdrop.hidden = false;
        pop.classList.add("share-sheet");
        document.body.appendChild(pop);
      }
      pop.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      {
        showNote("");
        // links are filled in now, so they always carry the current language and result
        const u = url(), t = title(), eu = encodeURIComponent(u), et = encodeURIComponent(t);
        const hrefs = {
          facebook: "https://www.facebook.com/sharer/sharer.php?u=" + eu,
          whatsapp: "https://wa.me/?text=" + encodeURIComponent(t + " " + u),
          telegram: "https://t.me/share/url?url=" + eu + "&text=" + et,
          pinterest: "https://www.pinterest.com/pin/create/button/?url=" + eu + "&media=" + encodeURIComponent(_pinImageFor(spec())) + "&description=" + et
        };
        pop.querySelectorAll("a[data-share-net]").forEach(function (a) { a.setAttribute("href", hrefs[a.getAttribute("data-share-net")] || "#"); });
        // draw ahead so the option works on the first tap (Share image = portrait, Download = square)
        if (canFiles) blobFor("portrait").catch(function () {});
        else if (_isPhone()) blobFor("square").catch(function () {});
        const first = pop.querySelector(".share-option:not([hidden])");
        if (first && document.activeElement === btn) first.focus({ preventScroll: true });
      }
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); setOpen(pop.hidden); });

    function busy(el, text) { el.disabled = true; label(el, text); }
    function done(el, text, delay) { label(el, text); setTimeout(function () { el.disabled = false; label(el, el.__label); }, delay || 0); }
    const phone = _isPhone(), inApp = _isInAppBrowser();
    function makeImage(el, format, after) {
      el.__label = el.__label || (el.querySelector(".share-option-label") || {}).textContent;
      const ready0 = readyBlob(format);
      if (ready0) { label(el, el.__label); after(ready0); return; }   // still inside the tap, so the phone allows sharing / saving
      if (phone) {
        // phones only allow sharing or saving straight from a tap, so the first tap draws the picture and the next one shares it
        busy(el, T.preparing);
        blobFor(format).then(function (b) { el.disabled = false; label(el, b ? T.tapAgain : T.failed); if (!b) setTimeout(function () { label(el, el.__label); }, 2200); },
          function () { el.disabled = false; label(el, T.failed); setTimeout(function () { label(el, el.__label); }, 2200); });
        return;
      }
      busy(el, T.preparing);
      blobFor(format).then(function (blob) {
        if (!blob) { done(el, T.failed, 2200); return; }
        after(blob);
      }).catch(function () { done(el, T.failed, 2200); });
    }
    function shareFileOrSave(el, blob, format, savedNote) {
      const file = new File([blob], fileName(format), { type: "image/png" });
      if (canFiles && navigator.canShare({ files: [file] })) {
        Promise.resolve(navigator.share({ files: [file], title: title() })).then(function () { done(el, el.__label, 0); }, function (err) {
          if (err && err.name === "AbortError") { done(el, el.__label, 0); return; }
          _downloadBlob(blob, fileName(format)); done(el, T.saved, 2200);
        });
      } else if (inApp) {
        done(el, el.__label, 0); showNote(T.inApp); return;
      } else {
        _downloadBlob(blob, fileName(format)); done(el, T.saved, 2200);
      }
      if (savedNote) showNote(savedNote);
    }

    const imageBtn = q(".share-image");
    if (imageBtn) imageBtn.addEventListener("click", function () { makeImage(imageBtn, "portrait", function (b) { shareFileOrSave(imageBtn, b, "portrait"); }); });
    const dlBtn = q(".share-download");
    if (dlBtn) dlBtn.addEventListener("click", function () {
      if (inApp) { showNote(T.inApp); return; }
      makeImage(dlBtn, "square", function (b) { _downloadBlob(b, fileName("square")); done(dlBtn, T.saved, 2200); });
    });
    const copyBtn = q(".share-copy");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      copyBtn.__label = copyBtn.__label || T.copy;
      _copyToClipboard(url()); label(copyBtn, T.copied); setTimeout(function () { label(copyBtn, T.copy); }, 1800);
    });
    const moreBtn = q(".share-more");
    if (moreBtn) moreBtn.addEventListener("click", function () {
      try {
        Promise.resolve(navigator.share({ title: title(), url: url() })).catch(function () {});
      } catch (e) { /* the menu stays open with the other options */ }
    });
    // Facebook on phones: the facebook.com share link opens the Facebook app, which ignores it and just shows the
    // feed. So phones use the device share sheet instead: the visitor picks Facebook and gets a real post with the
    // result image (already drawn when the menu opened) and the link. Computers keep the Facebook share window.
    const fbLink = pop.querySelector('a[data-share-net="facebook"]');
    if (fbLink && canLink && _isPhone()) fbLink.addEventListener("click", function (e) {
      e.preventDefault();
      const u = url(), t = title();
      const labelEl = fbLink.querySelector(".share-option-label");
      // Facebook's app keeps the picture only when the share has NO text/link attached (the card's QR code leads to
      // the site), so phones share the image alone. The image is drawn when the menu opens; if it is not ready yet,
      // the first tap prepares it and the next tap shares (phones only allow sharing straight from a tap).
      if (canFiles) {
        const b = readyBlob("portrait");
        if (!b) {
          if (labelEl) labelEl.textContent = T.preparing;
          blobFor("portrait").then(function () { if (labelEl) labelEl.textContent = T.fbReady; }, function () { if (labelEl) labelEl.textContent = "Facebook"; });
          return;
        }
        const f = new File([b], fileName("portrait"), { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [f] })) {
          if (labelEl) labelEl.textContent = "Facebook";
          showNote(T.facebook);
          try {
            Promise.resolve(navigator.share({ files: [f] })).catch(function (err) { if (!err || err.name !== "AbortError") _openInNewTab(fbLink.href); });
          } catch (err) { _openInNewTab(fbLink.href); }
          return;
        }
      }
      // no image sharing on this phone: share the link through the share sheet
      showNote(T.facebookLink);
      try {
        Promise.resolve(navigator.share({ title: t, url: u })).catch(function (err) { if (!err || err.name !== "AbortError") _openInNewTab(fbLink.href); });
      } catch (err) { _openInNewTab(fbLink.href); }
    });
    if (_isPhone()) pop.querySelectorAll('a[data-share-net]:not([data-share-net="facebook"])').forEach(function (a) {
      a.addEventListener("click", function (e) {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        e.preventDefault();
        _closeSharePop(pop);
        window.location.href = href;   // a direct tap-navigation is what lets the phone hand the link to the app
      });
    });
    pop.querySelectorAll("button[data-share-net]").forEach(function (el) {
      const id = el.getAttribute("data-share-net");
      el.addEventListener("click", function () {
        makeImage(el, "story", function (b) { shareFileOrSave(el, b, "story", id === "tiktok" ? T.tiktok : T.instagram); });
      });
    });
  });

  _ensureShareOutsideClickHandler();
}

document.addEventListener("DOMContentLoaded", function () {
  wireShareRows(document);
});
