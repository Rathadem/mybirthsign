/* Adsterra ads for MyBirthSign (English, Chinese and Khmer pages).
   build-site.mjs puts empty slots between the sections of a page, native ads and banners in different sections (the owner's
   choice, 29/10/2026): data-ad="native" (Native Banner), "box" (300x250), "mid" (homepage: 728x90 on wide screens, else
   300x250). Side ads (160x600) are added here on wide screens. Slots are filled only when they come near the screen, banners one at a time (Adsterra
   banners share one global atOptions setting). */
(function () {
  // run once per page, even if the page includes this file twice (two copies made double side ads and mixed-up banner sizes)
  if (window.MBSAdsLoaded) return;
  window.MBSAdsLoaded = true;
  var HOST = "https://bauval.org";
  // Native Banner codes: [container key, script address]. One code can show only once per page (Adsterra), so a page shows as many
  // native ads as there are codes here, in the first native spots from the top; a native spot without a code shows a banner
  // instead (its data-fallback: "box" 300x250 or "mid" 728x90 / 300x250).
  // To add a code from Adsterra Support, add one more line like the first one.
  var NATIVES = [
    ["f09efb6f84e744d5ad358f03efbf68db", HOST + "/21/f09efb6f84e744d5ad358f03efbf68db"],
  ];
  var BANNER = { box: ["be82b735bb4822651f6266ea177098d1", 300, 250], top_d: ["18e30a22b3ffe8fb2229cd25f31ba870", 728, 90], top_m: ["3e5e00c17d44d21efb07540becb72519", 320, 50],
    sky600: ["89c8bc55c8616f881f45a06e7d8a4594", 160, 600], sky300: ["352da5bdc6fa784c5fc4d6576ca3265b", 160, 300] };
  // computers, laptops and landscape tablets (1,024 px and wider): tall banners down each side of the page (left and right side bars),
  // one pair beside each section, scrolling with the page. The class "mbs-rails" on <html> adds 184 px of space on each side of the page so
  // the side bars never cover the content; on narrower screens the side bars are hidden and the section ads show instead.
  var RAIL_MIN = 1024, root = document.documentElement;
  var queue = [], busy = false;
  function next() {
    if (busy || !queue.length) return;
    busy = true;
    var job = queue.shift(), b = BANNER[job.k], finished = false;
    var done = function () { if (finished) return; finished = true; busy = false; setTimeout(next, 60); };
    var conf = document.createElement("script");
    conf.text = "atOptions = {'key':'" + b[0] + "','format':'iframe','height':" + b[2] + ",'width':" + b[1] + ",'params':{}};";
    var s = document.createElement("script");
    s.src = HOST + "/22/" + b[0]; s.onload = function () { diag.ok++; diagShow(); done(); }; s.onerror = function () { diag.bad++; diagShow(); if (job.fail) job.fail(); done(); };
    job.el.appendChild(conf); job.el.appendChild(s);
    setTimeout(done, 6000);   // never let one slow ad block the others
  }
  function fill(el) {
    if (el.getAttribute("data-filled")) return;
    el.setAttribute("data-filled", "1");
    var t = el.getAttribute("data-ad");
    if (t === "native") {
      var nv = NATIVES[+el.getAttribute("data-native")];
      if (!nv) { el.style.display = "none"; return; }
      var n = document.createElement("script");
      n.async = true; n.setAttribute("data-cfasync", "false"); n.src = nv[1];
      n.onload = function () { diag.ok++; diagShow(); };
      n.onerror = function () { diag.bad++; diagShow(); el.style.display = "none"; };   // ad blocked (ad blocker or a network that blocks ad addresses): no empty gap
      var c = document.createElement("div"); c.id = "container-" + nv[0];
      el.appendChild(n); el.appendChild(c);
      return;
    }
    // 728x90 only where the slot itself is wide enough (side ads make the content column narrower on small laptops)
    var wide = window.innerWidth >= 760 && el.getBoundingClientRect().width >= 740;
    // top: 728x90 on wide screens, 320x50 on phones; mid (homepage, between sections): 728x90 or 300x250; box: 300x250
    queue.push({ el: el, k: t === "top" ? (wide ? "top_d" : "top_m") : t === "mid" ? (wide ? "top_d" : "box") : "box",
      fail: function () { el.style.display = "none"; } });   // ad blocked: no empty 250 px gap in the page
    next();
  }
  function railsOn() { return window.innerWidth >= RAIL_MIN; }
  // Side ads scroll with the page: one pair (left and right, 160x600) beside each section, at least GAP px apart,
  // never running into the footer. Positions are worked out again whenever the page height changes.
  var GAP = 760, MAXPAIRS = 14, pairs = [], sideIO = null;
  // the block around the main page title (the hero), no taller than about one screen
  function heroBlock() {
    var blk = document.querySelector("h1"), lim = Math.max(900, window.innerHeight * 1.1);
    while (blk && blk.parentElement && !/^(MAIN|BODY|ARTICLE)$/.test(blk.parentElement.tagName) && blk.parentElement.offsetHeight <= lim) blk = blk.parentElement;
    return blk;
  }
  function docTop(el) { return el.getBoundingClientRect().top + window.pageYOffset; }
  function railTops() {
    var head = document.querySelector(".site-header"), foot = document.querySelector("footer");
    // (the menu bar stays stuck at the top of the screen, so its height is used, not where it is now: measuring it while the
    // visitor is scrolled down made the side ads above that point disappear whenever the page grew)
    var first = head ? head.offsetHeight + 36 : 96;
    // keep the top of the page clean: the first side ads start below the hero / page title block, beside the first section
    // (the biggest block around the main title that is still no taller than about one screen)
    var blk = heroBlock();
    if (blk) first = Math.max(first, docTop(blk) + blk.offsetHeight + 24);
    var last = (foot ? docTop(foot) : document.documentElement.scrollHeight) - 600 - 24;
    var marks = [].map.call(document.querySelectorAll("main > section, main section > h2, main h2, body > section, article h2, .container > section"), docTop)
      .filter(function (t) { return t >= first && t <= last; }).sort(function (x, y) { return x - y; });
    var tops = [], at = first;
    for (var m = 0; m < marks.length; m++) if (marks[m] >= first && marks[m] <= first + 400) { at = marks[m]; break; }
    if (at > last) return tops;
    tops.push(at);
    while (tops.length < MAXPAIRS) {
      var want = at + GAP, pick = null;
      for (var i = 0; i < marks.length; i++) if (marks[i] >= want && marks[i] <= want + 500) { pick = marks[i]; break; }
      if (pick === null) pick = want;   // no section heading nearby: keep the even spacing
      if (pick > last) break;
      tops.push(pick); at = pick;
    }
    return tops;
  }
  function layoutRails() {
    if (!railsOn()) return;
    var tops = railTops();
    for (var i = 0; i < Math.max(tops.length, pairs.length); i++) {
      if (!pairs[i] && i < tops.length) {
        pairs[i] = ["left", "right"].map(function (side) {
          var r = document.createElement("div");
          r.className = "mbs-rail mbs-rail-" + side; r.setAttribute("aria-label", "Advertisement"); r.setAttribute("data-k", "sky600");
          document.body.appendChild(r);
          if (sideIO) sideIO.observe(r); else { r.setAttribute("data-filled", "1"); queue.push({ el: r, k: "sky600" }); next(); }
          return r;
        });
      }
      if (!pairs[i]) continue;
      for (var j = 0; j < 2; j++) { pairs[i][j].style.top = (tops[i] || 0) + "px"; pairs[i][j].style.display = i >= tops.length ? "none" : ""; }
    }
  }
  // safety check: with the side-ad space added, does every bit of content still sit between the side ads? (some pages
  // have wide grids that cannot shrink; on those pages, at that screen size, the side ads are simply not shown)
  var GUTTER = 176;
  function fits() {
    var els = document.querySelectorAll("main *, section *, article *"), W = window.innerWidth;
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!/^(P|H1|H2|H3|H4|A|IMG|BUTTON|LI|TD|TH|INPUT|SELECT|LABEL|SPAN)$/.test(el.tagName) || !el.offsetWidth) continue;
      if (el.closest(".mbs-bleed, .site-header, footer, .mbs-rail, .mbs-ad")) continue;
      var r = el.getBoundingClientRect(), L = r.left, R = r.right;
      for (var a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        var ox = getComputedStyle(a).overflowX;
        if (ox !== "visible") { var ab = a.getBoundingClientRect(); L = Math.max(L, ab.left); R = Math.min(R, ab.right); }
      }
      if (R - L < 1) continue;
      if (L < GUTTER || R > W - GUTTER) return false;
    }
    return true;   // (no whole-page width test: the menu bar is still wide for a moment while it collapses into its button)
  }
  function rails() {
    if (!railsOn()) return;
    // a hero whose background runs the full width of the screen keeps doing so (no side ads sit next to it)
    var hero = heroBlock(), bleed = hero && hero.getBoundingClientRect().width >= window.innerWidth - 40;
    root.classList.add("mbs-rails");
    if (bleed) hero.classList.add("mbs-bleed");
    if (!fits()) { root.classList.remove("mbs-rails"); if (bleed) hero.classList.remove("mbs-bleed"); return; }
    window.addEventListener("resize", function () {
      root.classList.toggle("mbs-rails", railsOn());
      if (railsOn() && !fits()) root.classList.remove("mbs-rails");
      layoutRails();
    });
    if ("IntersectionObserver" in window) sideIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting || e.target.getAttribute("data-filled")) return;
        sideIO.unobserve(e.target); e.target.setAttribute("data-filled", "1"); queue.push({ el: e.target, k: "sky600" }); next();
      });
    }, { rootMargin: "500px 0px" });
    layoutRails();
    window.addEventListener("load", layoutRails);
    if ("ResizeObserver" in window) { var t; new ResizeObserver(function () { clearTimeout(t); t = setTimeout(layoutRails, 150); }).observe(document.body); }
  }
  // ---- pop ad when a visitor checks their sign or a compatibility (the owner asked for this on 29/10/2026) ----
  // Once a day per visitor (per browser):
  //   1. an ad box over the page with a 300x250 banner; it can be closed after POP_WAIT seconds, the result is right behind it;
  //   2. when SMARTLINK is filled in, the same click also opens that Adsterra Smartlink in a new tab.
  // Check buttons: My Horoscope (/checker; also when it runs from the homepage "Find my sign"), Check Compatibility (homepage
  // and /compatibility), Compare Signs, Check Business Compatibility and Find Best Wedding Dates. An error (missing or
  // wrong date) shows no ad. Nothing here changes how any result is worked out.
  var SMARTLINK = "";   // Adsterra Smartlink address for a new-tab ad; removed at the owner's request on 29/10/2026 (empty = off)
  var POP_WAIT = 3;
  var TOOLS = { "compat-form": ["compat-result", ""], "cmp-form": ["cmp-result", "cmp-error"], "cs-form": ["cs-result", "cs-error"],
    "biz-form": ["biz-result", "biz-form-error"], "wedding-form": ["wedding-result", "wed-error"] };
  var LANG = (root.getAttribute("data-site-lang") || root.lang || "en").slice(0, 2);
  var POP_TXT = { en: ["Advertisement", "Close", "Your result is ready behind this box."],
    km: ["ការផ្សាយពាណិជ្ជកម្ម", "បិទ", "លទ្ធផលរបស់អ្នកនៅខាងក្រោយប្រអប់នេះ។"],
    zh: ["广告", "关闭", "你的结果就在这个框的后面。"] }[LANG] || null;
  if (!POP_TXT) POP_TXT = ["Advertisement", "Close", "Your result is ready behind this box."];
  var popSeen = {};
  function dayNow() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function popDue(k) {
    if (popSeen[k]) return false;
    try { return window.localStorage.getItem("mbs-pop-" + k) !== dayNow(); } catch (e) { return true; }   // no storage: once per page view
  }
  function popDone(k) { popSeen[k] = 1; try { window.localStorage.setItem("mbs-pop-" + k, dayNow()); } catch (e) { /* once per page view */ } }
  function popTab() {
    // a new tab can only open straight from the visitor's click; otherwise the browser blocks it (then it is tried at the next check)
    if (!SMARTLINK || !popDue("tab")) return;
    if (navigator.userActivation && !navigator.userActivation.isActive) return;
    var w = null;
    try { w = window.open(SMARTLINK, "_blank"); } catch (e) { w = null; }
    if (w) { try { w.opener = null; } catch (e) { /* fine */ } popDone("tab"); }
  }
  function popBox() {
    if (!popDue("box") || document.querySelector(".mbs-pop")) return;
    popDone("box");
    if (!document.getElementById("mbs-pop-css")) {
      var st = document.createElement("style"); st.id = "mbs-pop-css";
      st.textContent = ".mbs-pop{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(6,4,18,.74);opacity:0;transition:opacity .2s}" +
        ".mbs-pop.on{opacity:1}.mbs-pop-card{width:324px;max-width:100%;box-sizing:border-box;padding:10px 12px 12px;border:1px solid rgba(212,175,55,.55);border-radius:14px;background:#1a1430;color:#f1ecff;box-shadow:0 18px 50px rgba(0,0,0,.55);font-size:14px;line-height:1.4}" +
        ".mbs-pop-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}.mbs-pop-lab{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#b4a9d6}" +
        ".mbs-pop-x{min-width:88px;min-height:36px;padding:6px 14px;border:1px solid #d4af37;border-radius:999px;background:#d4af37;color:#1a1430;font-family:inherit;font-size:14px;font-weight:600;line-height:1;cursor:pointer}" +
        ".mbs-pop-x:disabled{background:transparent;color:#d4af37;cursor:default;opacity:.85}.mbs-pop-ad{display:flex;justify-content:center;align-items:center;min-height:250px;overflow:hidden;border-radius:8px;background:rgba(255,255,255,.04)}" +
        ".mbs-pop-ad iframe{max-width:100%}.mbs-pop-note{margin:8px 0 0;text-align:center;font-size:13px;color:#b4a9d6}" +
        (LANG === "km" ? ".mbs-pop-lab{letter-spacing:0;text-transform:none;font-size:12px}" : "");   // Khmer: never letter-spaced
      document.head.appendChild(st);
    }
    var box = document.createElement("div");
    box.className = "mbs-pop"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", POP_TXT[0]);
    box.innerHTML = '<div class="mbs-pop-card"><div class="mbs-pop-top"><span class="mbs-pop-lab"></span><button type="button" class="mbs-pop-x" disabled></button></div>' +
      '<div class="mbs-pop-ad"></div><p class="mbs-pop-note"></p></div>';
    box.querySelector(".mbs-pop-lab").textContent = POP_TXT[0];
    box.querySelector(".mbs-pop-note").textContent = POP_TXT[2];
    var x = box.querySelector(".mbs-pop-x"), left = POP_WAIT, was = document.activeElement;
    var label = function () { x.textContent = left > 0 ? POP_TXT[1] + " (" + left + ")" : POP_TXT[1] + " ✕"; };
    var close = function () {
      if (x.disabled) return;
      document.removeEventListener("keydown", onKey);
      box.remove();
      try { if (was && was.focus) was.focus({ preventScroll: true }); } catch (e) { /* fine */ }
    };
    var onKey = function (e) { if (e.key === "Escape") close(); };
    label();
    var tick = setInterval(function () { left--; label(); if (left <= 0) { clearInterval(tick); x.disabled = false; try { x.focus({ preventScroll: true }); } catch (e) { /* fine */ } } }, 1000);
    x.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(box);
    requestAnimationFrame(function () { box.classList.add("on"); });
    // first in line, before any other banner; if the ad is blocked (an ad blocker), the empty box closes at once
    queue.unshift({ el: box.querySelector(".mbs-pop-ad"), k: "box", fail: function () { clearInterval(tick); x.disabled = false; close(); } });
    next();
  }
  function popAd() {
    try { popTab(); } catch (e) { /* the result stays as it is */ }
    setTimeout(function () { try { popBox(); } catch (e) { /* the result stays as it is */ } }, 600);   // the result shows first
  }
  // My Horoscope: js/app.js sends "mbs:checker-result" after it shows the result
  document.addEventListener("mbs:checker-result", popAd);
  // the other check buttons: this runs after the page's own submit handler, so the result (or an error) is already on the page
  document.addEventListener("submit", function (e) {
    var f = e.target, id = f && f.id;
    if (id === "hm-find-form") { if (!e.defaultPrevented) { try { popTab(); } catch (err) { /* fine */ } } return; }   // homepage "Find my sign": the ad box shows on /checker
    var t = id && TOOLS.hasOwnProperty(id) ? TOOLS[id] : null;
    if (!t) return;
    var res = document.getElementById(t[0]), er = t[1] ? document.getElementById(t[1]) : null;
    if (er && !er.hidden && er.textContent.trim()) return;   // the tool showed an error: no ad
    if (!res || !res.innerHTML.trim()) return;               // no result on the page
    popAd();
  });
  function start() {
    // each native spot gets its own code, from the top of the page down; a spot without a code becomes a banner spot
    var nat = document.querySelectorAll('.mbs-ad[data-ad="native"]');
    for (var q = 0; q < nat.length; q++) {
      if (q < NATIVES.length) nat[q].setAttribute("data-native", q);
      else if (nat[q].getAttribute("data-fallback")) nat[q].setAttribute("data-ad", nat[q].getAttribute("data-fallback"));
      else { nat[q].style.display = "none"; nat[q].setAttribute("data-filled", "1"); }
    }
    rails();
    var slots = document.querySelectorAll(".mbs-ad[data-ad]");   // between-section 728x90 ads show on every screen size, with or without side ads
    if (!("IntersectionObserver" in window)) { for (var i = 0; i < slots.length; i++) fill(slots[i]); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); fill(e.target); } });
    }, { rootMargin: "400px 0px" });
    for (var j = 0; j < slots.length; j++) io.observe(slots[j]);
  }
  // ---- ad check for the owner: add ?adcheck to any page address (e.g. mybirthsign.com/?adcheck) to see whether this phone /
  // network can reach the ad server and how many ads loaded or were blocked. Visitors never see it.
  var diag = { ok: 0, bad: 0, server: "checking…" }, diagBox = null;
  function diagShow() {
    if (!diagBox) return;
    var c = navigator.connection || {};   // c.type ("wifi" / "cellular") is known on Android Chrome only
    diagBox.textContent = "Ad check · ad server: " + diag.server + " · ads loaded: " + diag.ok + " · ads blocked: " + diag.bad +
      (c.type ? " · network: " + c.type : "") + " · screen " + window.innerWidth + "px";
  }
  if (/[?&]adcheck\b/.test(location.search)) {
    var diagStart = function () {
      diagBox = document.createElement("div"); diagBox.id = "mbs-adcheck";
      diagBox.style.cssText = "position:fixed;left:8px;right:8px;bottom:8px;z-index:2147483001;padding:10px 12px;border-radius:10px;background:#111;color:#fff;font:600 13px/1.4 system-ui,sans-serif;border:2px solid #d4af37";
      document.body.appendChild(diagBox); diagShow();
      var t = setTimeout(function () { diag.server = "NO ANSWER (slow or blocked)"; diagShow(); }, 8000);
      try {
        fetch(HOST + "/?check=" + Date.now(), { mode: "no-cors", cache: "no-store" })
          .then(function () { clearTimeout(t); diag.server = "REACHABLE"; diagShow(); })
          .catch(function () { clearTimeout(t); diag.server = "BLOCKED"; diagShow(); });
      } catch (e) { diag.server = "cannot test"; diagShow(); }
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", diagStart); else diagStart();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
