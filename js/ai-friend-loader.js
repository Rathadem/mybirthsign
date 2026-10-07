/* MyBirthSign AI Friend — tiny loader (about 2 KB).
 *
 * This is the only AI file a page loads up front. It draws the floating button
 * and nothing else. The chat panel (css/ai-friend.css + js/ai-friend.js) is
 * downloaded the first time the visitor points at, focuses or taps the button,
 * so the normal website is not slowed down.
 *
 * Add to a page with one line, at the end of <body>:
 *   <script src="js/ai-friend-loader.js" defer></script>
 */
(function () {
  "use strict";
  if (window.__mbsAiLoader) return;
  window.__mbsAiLoader = true;

  var script = document.currentScript;
  var base = "";
  if (script && script.src) base = script.src.replace(/js\/ai-friend-loader\.js(\?.*)?$/, "");
  if (!base) base = "/";

  function uiLang() {
    var l = "en";
    try { if (typeof getLang === "function") l = getLang(); else l = document.documentElement.lang || "en"; } catch (e) { /* ignore */ }
    return String(l).toLowerCase().indexOf("km") === 0 ? "km" : "en";
  }

  var STR = {
    en: { label: "Zodi · MyBirthSign AI", short: "Zodi", aria: "Open chat with Zodi, the MyBirthSign AI Friend" },
    km: { label: "Zodi · មិត្ត AI", short: "Zodi", aria: "បើកការជជែកជាមួយ Zodi មិត្ត AI របស់ MyBirthSign" }
  };

  /* Avatar: a friendly gold-ringed robot face with a crescent moon on its antenna. */
  var AVATAR =
    '<svg class="mbs-ai-av" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
    '<defs><linearGradient id="mbsAiG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc9b"/><stop offset="1" stop-color="#c9971e"/></linearGradient>' +
    '<linearGradient id="mbsAiB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a78"/><stop offset="1" stop-color="#150f38"/></linearGradient></defs>' +
    '<path d="M24 3.5c-1.7 0-3 1.3-3 3 0 .9.4 1.7 1 2.2V11h4V8.7c.6-.5 1-1.3 1-2.2 0-1.7-1.3-3-3-3z" fill="url(#mbsAiG)"/>' +
    '<rect x="7" y="11" width="34" height="29" rx="11" fill="url(#mbsAiB)" stroke="url(#mbsAiG)" stroke-width="2"/>' +
    '<rect x="11.5" y="16" width="25" height="18" rx="7" fill="#0b0820" opacity=".75"/>' +
    '<ellipse cx="18.5" cy="25" rx="2.9" ry="3.3" fill="#f6dc9b"/><ellipse cx="29.5" cy="25" rx="2.9" ry="3.3" fill="#f6dc9b"/>' +
    '<circle cx="19.4" cy="23.9" r="1" fill="#fff"/><circle cx="30.4" cy="23.9" r="1" fill="#fff"/>' +
    '<path d="M19.5 31c1.4 1.5 7.6 1.5 9 0" fill="none" stroke="#f6dc9b" stroke-width="1.8" stroke-linecap="round"/>' +
    '<circle cx="10" cy="26" r="2" fill="#e04fa0"/><circle cx="38" cy="26" r="2" fill="#e04fa0"/>' +
    "</svg>";

  var css =
    ".mbs-ai-btn{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:900;display:flex;align-items:center;gap:8px;" +
    "min-height:52px;padding:6px 18px 6px 8px;border:1.5px solid #e7c27a;border-radius:999px;cursor:pointer;color:#fff3d1;font:700 .95rem/1.1 Georgia,'Times New Roman',serif;" +
    "background:linear-gradient(135deg,#2a1d63 0%,#6a2a8f 60%,#a02d86 100%);box-shadow:0 8px 26px rgba(10,6,34,.55),0 0 0 3px rgba(231,194,122,.12);" +
    "transition:transform .18s ease,box-shadow .18s ease;-webkit-tap-highlight-color:transparent;}" +
    ".mbs-ai-btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(10,6,34,.6),0 0 0 4px rgba(231,194,122,.2);}" +
    ".mbs-ai-btn:focus-visible{outline:3px solid #f6dc9b;outline-offset:3px;}" +
    ".mbs-ai-btn .mbs-ai-av{width:38px;height:38px;flex:none;filter:drop-shadow(0 2px 6px rgba(0,0,0,.45));}" +
    ".mbs-ai-btn .mbs-ai-spark{color:#f6dc9b;margin-right:2px;}" +
    ".mbs-ai-btn .mbs-ai-s{display:none;}" +
    ".mbs-ai-btn[hidden]{display:none!important;}" +
    "@media (prefers-reduced-motion:no-preference){.mbs-ai-btn::after{content:'';position:absolute;inset:-2px;border-radius:999px;border:2px solid rgba(246,220,155,.55);animation:mbsAiPulse 3.2s ease-out 2s 2;pointer-events:none;}}" +
    "@keyframes mbsAiPulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.28);opacity:0}}" +
    "@media (max-width:480px){.mbs-ai-btn{min-height:50px;padding-right:15px}.mbs-ai-btn .mbs-ai-l{display:none}.mbs-ai-btn .mbs-ai-s{display:inline}}";

  var btn;

  function build() {
    if (document.getElementById("mbs-ai-launcher")) return;
    var st = document.createElement("style");
    st.id = "mbs-ai-launcher-css";
    st.textContent = css;
    document.head.appendChild(st);

    var t = STR[uiLang()];
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "mbs-ai-launcher";
    btn.className = "mbs-ai-btn";
    btn.setAttribute("aria-label", t.aria);
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "mbs-ai-panel");
    btn.innerHTML = AVATAR + '<span class="mbs-ai-l"><span class="mbs-ai-spark" aria-hidden="true">✨</span>' + t.label + '</span><span class="mbs-ai-s">' + t.short + "</span>";
    document.body.appendChild(btn);

    // keep the label in step with the site's language switch
    new MutationObserver(function () {
      var tt = STR[uiLang()];
      btn.setAttribute("aria-label", tt.aria);
      btn.querySelector(".mbs-ai-l").lastChild.nodeValue = tt.label;
      btn.querySelector(".mbs-ai-s").textContent = tt.short;
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    var loading = null;
    function load() {
      if (window.MBSAiFriend) return Promise.resolve();
      if (loading) return loading;
      loading = new Promise(function (resolve, reject) {
        var l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = base + "css/ai-friend.css";
        document.head.appendChild(l);
        var s = document.createElement("script");
        s.src = base + "js/ai-friend.js";
        s.onload = function () { resolve(); };
        s.onerror = function () { loading = null; reject(new Error("AI Friend failed to load")); };
        document.head.appendChild(s);
      });
      return loading;
    }
    function warm() { load().catch(function () {}); }
    ["pointerenter", "focus", "touchstart"].forEach(function (ev) { btn.addEventListener(ev, warm, { once: true, passive: true }); });

    btn.addEventListener("click", function () {
      load().then(function () { window.MBSAiFriend.toggle(btn); }).catch(function () {
        btn.setAttribute("aria-label", "Chat is unavailable right now. Please try again.");
      });
    });

    window.__mbsAiLauncher = btn;

    // coming back after a language switch with the chat open: open it again
    try {
      if (sessionStorage.getItem("mbsAiReopen") === "1") {
        sessionStorage.removeItem("mbsAiReopen");
        load().then(function () { window.MBSAiFriend.open(btn); }).catch(function () {});
      }
    } catch (e) { /* ignore */ }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
