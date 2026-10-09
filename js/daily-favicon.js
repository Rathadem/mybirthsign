/* Daily lucky-zodiac favicon (MyBirthSign).
 * Shows today's top lucky sign (highlights.topLucky[0] in /data/daily/latest.json, which the rules engine
 * always sets to the day animal) as the browser-tab icon. Nothing is chosen at random or invented:
 *   - the record must be for today's date in Asia/Phnom_Penh (the site's daily timezone),
 *   - topLucky[0] must be one of the 12 animals, equal dayAnimal, and match the same day-animal rule the
 *     daily engine uses (scripts/daily-data-lib.mjs dayAnimalOf),
 *   - otherwise the permanent favicon files stay in place.
 * One small fetch per visitor per day (cached in localStorage); re-checks at Phnom Penh midnight and when a
 * tab becomes visible again. Icons are static files in /images/favicon/, with ?d=<date> so a cached icon
 * from yesterday is never reused.
 */
(function () {
  "use strict";
  var ORDER = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  var TZ = "Asia/Phnom_Penh", KEY = "mbsFavDay", DIR = "/images/favicon/";
  var timer = null, shownFor = null, triedFor = null;

  function today() {
    try { return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
    catch (e) { return null; }
  }
  function dayAnimalOf(iso) {                       // same rule as scripts/daily-data-lib.mjs
    var p = iso.split("-").map(Number);
    return ORDER[(Math.floor(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000) + 2440588 + 1) % 12];
  }
  function pick(rec, iso) {                         // validated top lucky sign, or null
    if (!rec || rec.date !== iso || !rec.highlights) return null;
    var top = rec.highlights.topLucky;
    if (!Array.isArray(top) || !top.length) return null;
    var a = top[0];
    if (ORDER.indexOf(a) < 0 || a !== rec.dayAnimal || a !== dayAnimalOf(iso)) return null;
    if (!Array.isArray(rec.signs) || rec.signs.length !== 12) return null;
    return a;
  }
  function links() {
    var out = [], all = document.querySelectorAll('link[rel~="icon"]');
    for (var i = 0; i < all.length; i++) if (!/apple/i.test(all[i].rel)) out.push(all[i]);
    return out;
  }
  function apply(animal, iso) {
    var list = links(), slug = animal ? animal.toLowerCase() : null;
    for (var i = 0; i < list.length; i++) {
      var l = list[i];
      if (!l.hasAttribute("data-orig")) l.setAttribute("data-orig", l.getAttribute("href") || "");
      if (!slug) { l.setAttribute("href", l.getAttribute("data-orig")); continue; }
      var t = (l.getAttribute("type") || "").toLowerCase(), size = l.getAttribute("sizes") || "";
      var file = t === "image/svg+xml" ? slug + ".svg" : (size === "16x16" ? slug + "-16.png" : slug + "-32.png");
      l.setAttribute("href", DIR + file + "?d=" + iso);
      if (t !== "image/svg+xml" && t !== "image/png") l.setAttribute("type", "image/png");   // e.g. favicon.ico link
    }
    shownFor = iso;
  }
  function readCache(iso) {
    try { var c = JSON.parse(localStorage.getItem(KEY) || "null"); if (c && c.d === iso && ORDER.indexOf(c.a) >= 0 && c.a === dayAnimalOf(iso)) return c.a; } catch (e) {}
    return null;
  }
  function writeCache(iso, a) { try { localStorage.setItem(KEY, JSON.stringify({ d: iso, a: a })); } catch (e) {} }

  function update() {
    var iso = today();
    if (!iso) return;
    if (shownFor === iso) { schedule(); return; }
    var cached = readCache(iso);
    if (cached) { apply(cached, iso); schedule(); return; }
    if (!window.fetch || triedFor === iso) { schedule(); return; }   // one request per day at most
    triedFor = iso;
    fetch("/data/daily/latest.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rec) {
        var a = pick(rec, iso);
        if (a) { writeCache(iso, a); apply(a, iso); }
        else if (shownFor) apply(null, iso);       // yesterday's animal must not linger: back to the permanent icon
      })
      .catch(function () { if (shownFor) apply(null, iso); })
      .then(schedule);
  }
  function schedule() {                            // wake just after the next Phnom Penh midnight
    if (timer) clearTimeout(timer);
    var now = Date.now(), ppNow = new Date(now + 7 * 3600000);   // Cambodia is UTC+7 all year (no DST)
    var next = Date.UTC(ppNow.getUTCFullYear(), ppNow.getUTCMonth(), ppNow.getUTCDate() + 1) - 7 * 3600000;
    timer = setTimeout(update, Math.max(1000, next - now + 5000));
  }

  window.MBSDailyFavicon = { pick: pick, dayAnimalOf: dayAnimalOf, update: update, _today: today };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", update); else update();
  document.addEventListener("visibilitychange", function () { if (!document.hidden && shownFor !== today()) update(); });
})();
