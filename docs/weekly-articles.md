# Weekly articles — plan and publishing checklist

One new English article is published every Monday (about 9 a.m. Cambodia time) by a scheduled task.
Each run publishes **the first row below whose status is `pending`**, then marks it `published`.
`docs/` is not part of the published site.

## Plan (October 2026 – January 2027)

| # | Week of | Slug | Title (working) | Angle / why now | Link to | Status |
|---|---|---|---|---|---|---|
| 1 | 2026-10-19 | kathen-robe-offering-season | Kathen: Cambodia's Robe-Offering Season After Buddhist Lent | Kathen season 27 Oct – 24 Nov 2026 | chol-vassa-buddhist-lent, cambodian-buddhist-holy-days | published 2026-10-18 |
| 2 | 2026-10-26 | khmer-weddings-after-buddhist-lent | Why Many Khmer Weddings Happen After Buddhist Lent | Wedding season starts after Chenh Vassa; custom (not a Buddhist rule) of avoiding lay weddings during Vassa | wedding-date (tool), chol-vassa-buddhist-lent | published 2026-10-19 |
| 3 | 2026-11-02 | independence-monument-phnom-penh | The Independence Monument: What It Is and What Happens There | Independence Day is 9 Nov | cambodia-independence-day | published 2026-10-26 |
| 4 | 2026-11-09 | ak-ambok-moon-salutation | Ak Ambok and the Moon Salutation: The Quieter Side of the Water Festival | Water Festival 23–25 Nov 2026 | cambodia-water-festival-bon-om-touk, khmer-calendar | pending |
| 5 | 2026-11-16 | bon-om-touk-boat-racing-teams | Bon Om Touk Boat Teams: How Pagodas and Provinces Prepare | Just before the races | cambodia-water-festival-bon-om-touk | pending |
| 6 | 2026-11-23 | find-your-khmer-lunar-birthday | Your Khmer Lunar Birthday: How to Find It and Why Elders Use It | Evergreen; uses the calendar tool | khmer-calendar, khmer-lunar-calendar-birth-date | pending |
| 7 | 2026-11-30 | year-of-the-fire-goat-2027 | 2027 Is the Year of the Fire Goat: What That Means | Lunar New Year 2027 = 6 Feb 2027 (site CNY table); Fire Goat from the site's element formula | zodiac-year-goat, five-elements-explained, checker | pending |
| 8 | 2026-12-07 | fire-element-in-each-sign | Fire Goat, Fire Horse, Fire Snake: The Fire Element in Each Sign | Follows #7 | five-elements-explained, animal guides | pending |
| 9 | 2026-12-14 | chinese-cambodian-lunar-new-year | How Chinese-Cambodian Families Celebrate Lunar New Year | Lead-up to 6 Feb 2027 | animal guides | pending |
| 10 | 2026-12-21 | choose-wedding-date-2027-khmer-calendar | Choosing a 2027 Wedding Date with the Khmer Calendar | Couples plan early | wedding-date (tool), khmer-calendar | pending |
| 11 | 2026-12-28 | khmer-lunar-year-2027-at-a-glance | The 2027 Khmer Lunar Year at a Glance | New Year's week; dates from momentkh | khmer-calendar, khmer-leap-months | pending |
| 12 | 2027-01-04 | year-of-the-goat-vs-khmer-year | Year of the Goat vs. the Khmer Year of the Goat: Why the Dates Differ | Lunar New Year (Feb) vs Khmer New Year (April) | khmer-animal-year-sak, khmer-new-year-animal-year | pending |
| 13 | 2027-01-11 | meak-bochea-2027 | Meak Bochea 2027: Meaning and How It's Observed | Full moon of Meakh; date from momentkh | cambodian-buddhist-holy-days | pending |
| 14 | 2027-01-18 | lunar-new-year-preparations | Lunar New Year Preparations: Cleaning, Offerings and What to Avoid | Three weeks before 6 Feb 2027 | animal guides | pending |
| 15 | 2027-01-25 | lunar-new-year-2027-each-sign | Lunar New Year 2027: February 6, and What Each Sign Can Expect | Biggest search of the season | all 12 zodiac-year guides, daily fortune | pending |

Deliberately not on the list: 7 January (politically sensitive; only with the owner's go-ahead).

## How to publish one article

1. **Research first.** Use web search and read the pages. Use at least three reliable sources (official
   Cambodian sources, the Royal Palace site, established news outlets, scholarly or Buddhist reference works).
   Write down which source supports each fact.
2. **Never invent anything:** no made-up dates, statistics, quotations, people, personal experiences,
   expert credentials or sources. If a fact cannot be supported, leave it out. If the topic cannot be covered
   well from reliable sources, do not publish a thin article: mark the row `skipped: <reason>` and report it.
3. **Khmer lunar dates come only from the site's own library**, `js/vendor/momentkh.min.js`:
   ```js
   import fs from "node:fs"; import vm from "node:vm";
   const ctx = { self: {} }; vm.createContext(ctx);
   vm.runInContext(fs.readFileSync("js/vendor/momentkh.min.js", "utf8"), ctx);
   const M = ctx.self.momentkh;            // M.fromGregorian(y, m, d).khmer -> { day, moonPhase (0 waxing, 1 waning), monthIndex }
   ```
   Lunar New Year dates come from the CNY table in `js/zodiac-data.js`. Public-holiday dates must match
   `blog/cambodian-public-holidays.html` (official 2026 list); for 2027, say dates are to be confirmed unless an
   official 2027 list is found and cited.
4. **Write the article** (original wording, 900–1,400 words, plain English, English only — no Khmer or Chinese
   script in the text; romanize Khmer terms). Use the same tone as the existing holiday guides: factual,
   respectful, no hype, no fortune-telling claims presented as fact, avoid party politics. Include a short FAQ
   (3–4 questions) and a sources list with one-line notes. Link to 2–4 related pages on the site.
5. **Image:** reuse an existing image from `images/guides/` that fits and has **no embedded text** (crop off any
   text band into a new file, as was done for `kathen-card.webp`). Give it specific alt text and a caption that
   says it is an illustration, not a photograph of a specific event. Do not use stock photos from the web.
6. **Create the JSON spec** at `scripts/content/weekly/<slug>.json` (copy the shape of
   `kathen-robe-offering-season.json`; `published` = the day you publish), then run
   `python3 scripts/content/weekly-article.py scripts/content/weekly/<slug>.json`.
   This writes `blog/<slug>.html`, puts a card at the top of the English "Latest Articles" on `blog.html` and adds
   the page to `sitemap.xml`.
7. **Check:** `node scripts/build-site.mjs`; run the tests (`node tests/daily-golden.mjs`,
   `node tests/khmer-lunar-test.mjs`, `node tests/lucky-digits-test.mjs`, `node tests/share-preview-test.mjs`);
   open the page at desktop and phone width (Playwright with the Chromium in /opt/pw-browsers) and confirm the
   image loads, nothing overflows, and every internal link returns 200. Re-read the article once for grammar
   (a/an, repeated sentences) and for any claim without a source.
8. **Publish:** `git pull --rebase origin main` (a daily GitHub Action also pushes), commit only the new article,
   its JSON, any new image, `blog.html`, `sitemap.xml` and this file (status updated), then push to `main`.
9. **Verify:** wait for the Netlify production deploy of that commit to reach `ready` (Netlify site
   stellar-pixie-7e0955), then fetch `https://mybirthsign.com/blog/<slug>?v=<commit>` and confirm the title and
   image appear. Anything not checked is reported as NOT VERIFIED.

Rules that always apply: do not change DNS or Netlify DNS settings; do not modify the homepage, navigation,
global CSS or unrelated pages; do not change the Chinese zodiac calculation logic.
