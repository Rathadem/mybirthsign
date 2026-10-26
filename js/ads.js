/* Adsterra ads for MyBirthSign (English and Chinese pages only; Khmer pages stay ad-free).
   build-site.mjs puts empty slots in the page: data-ad="top" (728x90 on wide screens, 320x50 on phones),
   "box" (300x250 inside the content) and "native" (native banner near the end). Slots are filled only when
   they come near the screen, one banner at a time (Adsterra banners share one global atOptions setting). */
(function () {
  var HOST = "https://bauval.org";
  var NATIVE = "f09efb6f84e744d5ad358f03efbf68db";
  var BANNER = { box: ["be82b735bb4822651f6266ea177098d1", 300, 250], top_d: ["18e30a22b3ffe8fb2229cd25f31ba870", 728, 90], top_m: ["3e5e00c17d44d21efb07540becb72519", 320, 50] };
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
  function start() {
    var slots = document.querySelectorAll(".mbs-ad[data-ad]");
    if (!("IntersectionObserver" in window)) { for (var i = 0; i < slots.length; i++) fill(slots[i]); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); fill(e.target); } });
    }, { rootMargin: "400px 0px" });
    for (var j = 0; j < slots.length; j++) io.observe(slots[j]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
