/* Adsterra ads for MyBirthSign (English and Chinese pages only; Khmer pages stay ad-free).
   build-site.mjs puts empty slots in the page: data-ad="top" (728x90 on wide screens, 320x50 on phones),
   "box" (300x250 inside the content) and "native" (native banner near the end). Slots are filled only when
   they come near the screen, one banner at a time (Adsterra banners share one global atOptions setting). */
(function () {
  var HOST = "https://bauval.org";
  var NATIVE = "f09efb6f84e744d5ad358f03efbf68db";
  var BANNER = { box: ["be82b735bb4822651f6266ea177098d1", 300, 250], top_d: ["18e30a22b3ffe8fb2229cd25f31ba870", 728, 90], top_m: ["3e5e00c17d44d21efb07540becb72519", 320, 50],
    sky600: ["89c8bc55c8616f881f45a06e7d8a4594", 160, 600], sky300: ["352da5bdc6fa784c5fc4d6576ca3265b", 160, 300] };
  // computers and laptops (1,280 px and wider): a tall banner on each side of the page (left and right side bars) that stays
  // beside the reader while they scroll. The class "mbs-rails" on <html> adds 184 px of space on each side of the page so
  // the side bars never cover the content; on narrower screens the side bars are hidden and the section ads show instead.
  var RAIL_MIN = 1280, root = document.documentElement;
  var queue = [], busy = false;
  function next() {
    if (busy || !queue.length) return;
    busy = true;
    var job = queue.shift(), b = BANNER[job.k], finished = false;
    var done = function () { if (finished) return; finished = true; busy = false; setTimeout(next, 60); };
    var conf = document.createElement("script");
    conf.text = "atOptions = {'key':'" + b[0] + "','format':'iframe','height':" + b[2] + ",'width':" + b[1] + ",'params':{}};";
    var s = document.createElement("script");
    s.src = HOST + "/22/" + b[0]; s.onload = done; s.onerror = done;
    job.el.appendChild(conf); job.el.appendChild(s);
    setTimeout(done, 6000);   // never let one slow ad block the others
  }
  function fill(el) {
    if (el.getAttribute("data-filled")) return;
    el.setAttribute("data-filled", "1");
    var t = el.getAttribute("data-ad");
    if (t === "native") {
      var n = document.createElement("script");
      n.async = true; n.setAttribute("data-cfasync", "false"); n.src = HOST + "/21/" + NATIVE;
      var c = document.createElement("div"); c.id = "container-" + NATIVE;
      el.appendChild(n); el.appendChild(c);
      return;
    }
    var wide = window.innerWidth >= 760;
    // top: 728x90 on wide screens, 320x50 on phones; mid (homepage, between sections): 728x90 or 300x250; box: 300x250
    queue.push({ el: el, k: t === "top" ? (wide ? "top_d" : "top_m") : t === "mid" ? (wide ? "top_d" : "box") : "box" });
    next();
  }
  function railsOn() { return window.innerWidth >= RAIL_MIN; }
  function rails() {
    if (!railsOn()) return;
    root.classList.add("mbs-rails");
    window.addEventListener("resize", function () { root.classList.toggle("mbs-rails", railsOn()); });
    var k = window.innerHeight >= 720 ? "sky600" : "sky300";
    ["left", "right"].forEach(function (side) {
      var r = document.createElement("div");
      r.className = "mbs-rail mbs-rail-" + side; r.setAttribute("aria-label", "Advertisement");
      document.body.appendChild(r);
      queue.push({ el: r, k: k });
    });
    next();
  }
  function start() {
    rails();
    var wideRails = railsOn();
    var slots = document.querySelectorAll(".mbs-ad[data-ad]" + (wideRails ? ":not([data-ad=mid])" : ""));
    if (!("IntersectionObserver" in window)) { for (var i = 0; i < slots.length; i++) fill(slots[i]); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); fill(e.target); } });
    }, { rootMargin: "400px 0px" });
    for (var j = 0; j < slots.length; j++) io.observe(slots[j]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
