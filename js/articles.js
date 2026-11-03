/* All Articles page (/articles, made by scripts/articles-page.mjs): topic buttons and a search box over the article cards.
   Without this script every card is shown and the tools stay hidden. A topic can be opened directly: /articles#khmer */
(function () {
  function init() {
    document.querySelectorAll("[data-ba]").forEach(function (root) {
      var tools = root.querySelector("[data-ba-tools]"), q = root.querySelector("[data-ba-q]"),
        chips = [].slice.call(root.querySelectorAll("[data-ba-topic]")),
        cards = [].slice.call(root.querySelectorAll(".ba-grid > a")),
        count = root.querySelector("[data-ba-count]"), empty = root.querySelector("[data-ba-empty]"),
        reset = root.querySelector("[data-ba-reset]"), topic = "all";
      if (!tools || !q || !cards.length) return;
      var text = cards.map(function (c) { return (c.textContent || "").toLowerCase(); });
      var inTopic = function (c, tp) { return tp === "all" || c.classList.contains("ba-t-" + tp); };
      chips.forEach(function (b) {
        var tp = b.getAttribute("data-ba-topic"), n = cards.filter(function (c) { return inTopic(c, tp); }).length, s = b.querySelector(".ba-n");
        if (s) s.textContent = n;
      });
      function apply() {
        var words = q.value.toLowerCase().trim().split(/\s+/).filter(Boolean), n = 0;
        cards.forEach(function (c, i) {
          var ok = inTopic(c, topic) && words.every(function (w) { return text[i].indexOf(w) >= 0; });
          c.hidden = !ok;
          if (ok) n++;
        });
        chips.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-ba-topic") === topic)); });
        var tpl = n === cards.length ? count.getAttribute("data-all") : count.getAttribute("data-some");
        count.textContent = tpl.replace("{n}", n).replace("{total}", cards.length);
        empty.hidden = n > 0;
      }
      chips.forEach(function (b) {
        b.addEventListener("click", function () { topic = b.getAttribute("data-ba-topic"); apply(); });
      });
      q.addEventListener("input", apply);
      q.addEventListener("search", apply);
      if (reset) reset.addEventListener("click", function () { topic = "all"; q.value = ""; apply(); q.focus(); });
      var h = (location.hash || "").slice(1);
      if (chips.some(function (b) { return b.getAttribute("data-ba-topic") === h; })) topic = h;
      tools.hidden = false;
      apply();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
