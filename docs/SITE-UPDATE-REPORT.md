# MyBirthSign site update — report, tests, data handling, deploy & rollback

Branch: `site-update` (built on `ai-friend`, which holds Kru Toch). Nothing here is live until the owner says "deploy".
Design, layout, URLs and every existing calculation are unchanged; new features reuse existing styles and text.

## What was added (by phase)

| Phase | Feature | Main files |
|---|---|---|
| 1 | Daily data: one validated JSON per day (`/data/daily/<date>.json`, `latest.json`). Rules decide every fact; Claude writes only the wording (EN + KM); invalid records are never published. | `scripts/daily-data-lib.mjs`, `scripts/daily-data.mjs`, `.github/workflows/daily-fortune.yml`, `netlify.toml` |
| 2 | Daily page cards, homepage "Today's Fortune" cards and Kru Toch use that same data. With no data, everything looks exactly as before. | `scripts/daily-fortune.mjs`, `scripts/home-page.mjs`, `index.html`, `css/fortune.css`, `css/home.css`, `netlify/functions/ai-friend.js` |
| 3 | Compare Two Signs inside the Compatibility page (no percentages; existing rules and text). | `js/compare-signs.js`, `compatibility.html`, `css/style.css` |
| 4 | Result-specific share links (animals/date/language only), `?lang=km`, daily day + sign sharing, link-preview edge function, 90 fixed preview images. | `js/share.js`, `js/i18n.js`, `js/compat-page.js`, `js/app.js`, `js/business-calculator.js`, `netlify/edge-functions/*`, `images/og/*`, `scripts/og-images.py`, `scripts/share-preview-data.mjs` |
| 5 | Rich "Share image" cards (daily sign, two signs), EN/KM, drawn on the visitor's device, loaded only on demand. | `js/share-cards.js`, `js/share.js` |
| 6 | Accurate privacy section (EN + KM), one new compatibility FAQ (visible + structured data), richer daily-page description when data exists. | `privacy.html`, `js/compat-text.js`, `compatibility.html`, `scripts/daily-fortune.mjs` |
| 7 | Daily lucky-zodiac favicon: the browser-tab icon shows today's top lucky sign (`highlights.topLucky[0]` of a validated `latest.json` for today's Phnom Penh date, cross-checked with the day-animal rule). Static icons (navy + gold, traced from the site's own zodiac badges); permanent favicon whenever data is missing, stale or invalid. | `js/daily-favicon.js`, `images/favicon/` (12 × SVG + 32/16 px PNG), `scripts/favicon-icons.py`, one script line per page + 3 generators |
| 8 | Sharing upgrade: Share always opens the menu (phones too); Share image (portrait, phone share sheet), Download image (square), Copy link, More apps, Facebook, WhatsApp, Telegram, Pinterest (link + fixed public preview image), Instagram / TikTok (story image + how-to-post steps; neither accepts website links). One card design for checker, love, Compare Two Signs, business, daily sign, lucky today, articles — real results only. New share buttons: Zodiac Checker, "Who is lucky today" (homepage), 12 animal articles. Link previews: tags added to 12 pages + og:image on 2; all previews now 1200×630 JPG (broken Ox image fixed). | `js/share.js` (rewritten, 50→26 KB), `js/share-cards.js`, `js/app.js`, `js/compat-page.js`, `js/business-calculator.js`, `scripts/daily-fortune.mjs`, `scripts/home-page.mjs`, `scripts/animal-profile.mjs`, `scripts/og-images.py` (+`images/og/site.jpg`), `js/i18n.js`, `css/style.css`, `css/home.css`, `privacy.html`, page `<head>` tags |
| 9 | Dream Fortune on /checker (below the result): fortune wheel (8 categories, random category only, spin lock, reduced-motion), 6 dream buttons, EN/KM template text per sign + dream, "traditionally supportive years" and lucky colors from the zodiac engine only (car = one symbolic year, labelled "not a promise"), action tip, "Create My Fortune Card" (1080×1350 card drawn on the device) with the normal Share menu. No birth date leaves the page or enters links. | `js/dream-fortune.js`, `css/dream.css`, `checker.html` (section + 2 tags), `js/app.js` (1 event), `js/share-cards.js` (dream card), `js/share.js` (card type) |

Also on this branch (approved earlier): Kru Toch AI chat (`js/ai-friend*.js`, `css/ai-friend.css`, `netlify/functions/ai-friend.js`, `js/mbs-engine.js`, one loader line per page), the animal-page section-menu fix (`scripts/animal-profile.mjs`, `blog/zodiac-year-*.html`, `css/profile.css`).

## Test results (section 13 of the brief)

| Requirement | Result | How it was checked |
|---|---|---|
| All 12 animals receive valid daily content | PASS (pipeline) / NOT VERIFIED with real Claude wording | `tests/daily-data-test.mjs` (27 checks: 12 signs, rules for 366 days, 21 broken-record cases rejected). Real wording needs the GitHub secret, then the preview job. |
| Daily JSON records validate correctly | PASS | same test; generator refuses to publish on any error |
| Chatbot uses the correct daily data | PASS | 7 function checks: same lucky items/text as the JSON; works packaged like Netlify |
| Existing zodiac calculations unchanged | PASS | 720 calculator checks vs live pages; 56 daily-post checks; no-data daily page byte-identical |
| Compare Two Signs uses accurate existing results | PASS | all 144 pairs = `getCompatibilityType`; EN + KM complete; no percentages |
| Sharing links work as intended | PASS | 13 browser checks: pair/sign/day links, no birth dates or names, Khmer adds `lang=km`, language switch wins |
| English and Khmer sharing content | PASS | previews, titles and cards in both languages |
| Khmer renders properly in social images | PASS (Chromium) | cards rendered in EN/KM; Khmer wraps at word boundaries |
| Social preview images & metadata accessible | PASS locally / NOT VERIFIED on Netlify | 32 preview checks (Node + Deno); images at stable public paths. Check with Facebook Sharing Debugger + Telegram after deploy. |
| Temporary assets expire | N/A by design | no temporary files exist: cards are drawn on the visitor's device and never uploaded |
| Existing pages, navigation, URLs keep working | PASS | 372 page/viewport checks (9 pages × EN/KM × 3 sizes), chat suites, menu tests |
| No major mobile / accessibility / SEO / performance regressions | PASS | axe-core: 0 violations on new sections (EN/KM); JSON-LD valid; first-load +≈6 KB gz per page |
| Daily favicon matches the day's lucky sign | PASS | 65 browser checks: all 12 animals from their own day's rules record, 6 fallback cases (missing, stale, tampered, unknown animal, no signs, not JSON), cache/refresh (1 request a day), new-day cache, open tab across midnight (switches; falls back if the new file is late), Phnom Penh vs UTC date, 5 page types incl. blog subfolder; no JS errors |
| Sharing (actions, cards, previews) | PASS locally / NOT VERIFIED on real apps | 288 browser checks over 9 share points × EN/KM × desktop + phone: menu contents, Facebook/WhatsApp/Telegram/Pinterest links, Copy link, Download 1080×1080, Instagram/TikTok 1080×1920 + steps, phone share sheet gets a 1080×1350+ image, More apps link, no birth dates or names anywhere, Escape closes menu, no JS errors; 48 layout checks (320–1280 px); preview-tag audit 0 issues on all pages. Real Facebook / WhatsApp / Telegram / Pinterest / Instagram / TikTok posting not tested. |
| Dream Fortune | PASS locally / NOT VERIFIED on real phones | 469 browser checks: 12 signs × 8 dreams × EN/KM text complete and sign-specific, years = engine, colors = site data, wheel lands on the slice under the pointer (12 spins), locks while spinning, reduced motion, card 1080×1350, download, Facebook/Telegram links without birth date, keyboard focus, axe WCAG 2.1 AA 0 issues, no sideways scroll at 390 px, hidden when there is no result; 720 calculator checks + 342 sharing checks still pass. |

Known, pre-existing: at 320 px wide the homepage and Zodiac Guide overflow by 4–8 px (also without these changes).

## Data processing and retention (accurate summary)

| What | Where it is processed | Kept? |
|---|---|---|
| Birth dates typed into calculators | Visitor's browser only | Not sent or stored by us (may appear in the visitor's own address bar on the compatibility page) |
| Kru Toch chat messages | Netlify Function → Anthropic API | Conversation kept in the visitor's tab (sessionStorage) until closed; Anthropic handles data under its own policy |
| Chat abuse limits | Netlify Function memory (per IP) | Temporary counter, not saved |
| Language choice | Visitor's browser (localStorage) | Until the visitor clears it |
| Daily zodiac data | GitHub Action → Anthropic API → public JSON | Public, no visitor data |
| Share links | Visitor → chosen social app | Contain animals/date/language only |
| Share images (square / portrait / story) | Visitor's device (canvas); handed to the phone's share sheet or saved as a download | Never uploaded or stored by us |
| Pinterest | Pinterest receives the link and the result's fixed public preview image (no personal data) | Per Pinterest's policy |
| Link previews | Netlify Edge Function; social crawlers fetch the page and fixed images | Nothing stored |
| Hosting | Netlify (technical request data such as IP, browser, page) | Per Netlify's policy |
| Ads | Google AdSense cookies | Per Google's policy |

## Deploy checklist (only after the owner says "deploy")

1. Secrets: `ANTHROPIC_API_KEY` in **Netlify** (Kru Toch) and in **GitHub → Settings → Secrets → Actions** (daily wording). Set a monthly spending limit in the Anthropic console. Revoke the two keys pasted in chat earlier.
2. Review real wording: run the "Daily data preview" job on `site-update`, check EN and Khmer samples (native Khmer review recommended).
3. Remove `.github/workflows/daily-data-preview.yml` (test only).
4. Merge fresh `main` into `site-update` (the daily bot changes `index.html`, `blog.html`, `sitemap.xml` every day), regenerate `index.html` with `node scripts/home-page.mjs`, re-run the tests, then fast-forward `main`.
5. After Netlify publishes: open each main page, chat once, open a `?pair=` and a `?sign=` link, run Facebook Sharing Debugger and a Telegram preview on both, confirm `/data/daily/latest.json` appears after the next daily run.

## Rollback

- **Everything:** `git revert -m 1 <merge commit>` on `main` and push (Netlify redeploys the previous site). DNS is not involved.
- **Daily data only:** remove the "Daily data" step from `.github/workflows/daily-fortune.yml` and delete `data/daily/` — pages, homepage and Kru Toch fall back automatically.
- **Link previews only:** delete `netlify/edge-functions/` — normal page previews return.
- **Share cards only:** delete `js/share-cards.js` — "Share image" falls back to the original simple card.
- **Compare Two Signs only:** remove `<section id="compare">` and its `<script>` line from `compatibility.html`.
- **Kru Toch only:** remove the `ai-friend-loader.js` line from each page (or unset the Netlify key; the chat then answers with its offline guide).
