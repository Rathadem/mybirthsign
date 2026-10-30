# Khmer versions of the blog articles

One file per article: `scripts/content/km/<slug>.json`, the Khmer version of the English spec
`scripts/content/weekly/<slug>.json` (or `scripts/content/years/<slug>.json`). `weekly-article.py` reads it when the
English spec has no `km` field and publishes it at `/km/blog/<slug>` (local ads only, no ad network).
Generators that rewrite the English specs (stories, horoscope 2027, year pages) never touch these files.

Check a file before it is published (must end with `OK`; read every WARN):

    python3 scripts/content/km-check.py <slug>

## Fields

| Field | What to write |
|---|---|
| `title`, `eyebrow`, `kicker`, `card_text`, `lead` | Khmer translation of the English field (`kicker` / `card_text` are the blog card's small label and text) |
| `published` | `YYYY-MM-DD`. The English date when it is after 2026-10-30 (scheduled article: it must go live the same day), otherwise `2026-10-30` (the day the Khmer version was written) |
| `facts` | same number of `[label, value]` pairs, translated |
| `image` | copy the English `image` object; translate only `alt` and `caption`; `src`, `width`, `height`, `credit`, `cls` stay exactly the same |
| `sections` | same number of sections, in the same order; each with the same fields as the English: `h2`, `paras`, `list`, `after` (same number of items each), `html` (same block, text translated), `gallery` / `img` (as for `image`) |
| `faq` | same number of `[question, answer]` pairs |
| `source_notes` | one Khmer note per English source (the third item of each `sources` entry). Source titles and links are not copied: they stay as published, in English |
| `related` | same pairs, Khmer label first, the link (second item) unchanged |
| `note` | translation of the English `note`. If the English spec has no `note` field, translate the default note: "Dates for lunar observances follow the Khmer lunar calendar and can differ by a day locally. Check with your pagoda or official announcements for exact times." If the English `note` is `""`, leave `note` out |
| `back` | only when the English spec has `back`: `[Khmer label, same link]` |

## Rules

- Translate meaning, sentence by sentence; natural, clear modern Khmer for a general Cambodian reader, the same tone as
  the existing Khmer pages. Do not add, drop or change any fact, number, date, name, hedge or label. Keep the wording
  that marks tradition, belief and legend ("traditionally" → តាមប្រពៃណី, "folk tale" → រឿងនិទានប្រជាប្រិយ,
  "legend" → រឿងព្រេង, "for culture and entertainment" etc.): the site never presents beliefs as facts.
- Numbers: Western digits 0-9 only, never ០-៩. Dates: dd/mm/yyyy (`04/02/2027`). Month and year without a day:
  `ខែកុម្ភៈ 2027`. Ranges: `1960–2027`, `04/02/2027 – 06/03/2027`. Times: `06:00`. Decades: `ទសវត្សរ៍ 1960`.
  Every number of the English text must appear in the Khmer text.
- Months: មករា កុម្ភៈ មីនា មេសា ឧសភា មិថុនា កក្កដា សីហា កញ្ញា តុលា វិច្ឆិកា ធ្នូ.
  Weekdays: ថ្ងៃច័ន្ទ ថ្ងៃអង្គារ ថ្ងៃពុធ ថ្ងៃព្រហស្បតិ៍ ថ្ងៃសុក្រ ថ្ងៃសៅរ៍ ថ្ងៃអាទិត្យ.
- HTML inside the text (`<a href>`, `<strong>`, `<em>`, tables, timelines, bar charts): keep every tag, attribute,
  `href`, `class`, `style` and `datetime` exactly; translate only the visible text and `alt` / `title` /
  `aria-label` texts. Links stay the same (the site build points them at the Khmer pages).
- Names: Cambodian people and places in Khmer script (ភ្នំពេញ, ព្រះមហាក្សត្រ នរោត្តម សីហមុនី). Foreign people, ships,
  companies and organisations may stay in Latin letters (Villa Vie Odyssey, Hong Kong Observatory). Chinese terms
  written in pinyin stay in Latin letters (Jia-zi, Ding-wei, ben ming nian, Lichun), with a short Khmer explanation
  where the English explains them. Do not add Chinese characters the English does not have.
- Write valid JSON (UTF-8). Inside strings use Khmer quotes «…» or “…”, or escape `"` as `\"`.

## Glossary (the words the Khmer pages already use)

| English | Khmer |
|---|---|
| Chinese zodiac | រាសីចិន |
| zodiac animal / sign | សត្វរាសី, រាសី |
| Year of the Rat … Pig (zodiac year names) | ឆ្នាំជូត ឆ្នាំឆ្លូវ ឆ្នាំខាល ឆ្នាំថោះ ឆ្នាំរោង ឆ្នាំម្សាញ់ ឆ្នាំមមី ឆ្នាំមមែ ឆ្នាំវក ឆ្នាំរកា ឆ្នាំច ឆ្នាំកុរ |
| the sign / people of the sign | ជូត, អ្នកកើតឆ្នាំជូត (same pattern for each animal) |
| the real animal in a story | កណ្ដុរ គោ ខ្លា ទន្សាយ នាគ ពស់ សេះ ពពែ ស្វា មាន់ ឆ្កែ ជ្រូក (e.g. «កណ្ដុរ (ជូត)» on first mention) |
| Goat / Sheep / Ram | ពពែ / ចៀម / ចៀមឈ្មោល |
| element: Wood, Fire, Earth, Metal, Water | ឈើ, ភ្លើង, ដី, លោហធាតុ, ទឹក (the five elements: ធាតុទាំងប្រាំ) |
| Fire Goat year, Fire Horse year | ឆ្នាំមមែ ធាតុភ្លើង, ឆ្នាំមមី ធាតុភ្លើង |
| Yin, Yang | យិន, យ៉ាង |
| Heavenly Stems, Earthly Branches | ដើមមេឃ, មែកផែនដី |
| Lunar New Year / Chinese New Year | ចូលឆ្នាំចិន (Lunar New Year where the English stresses "lunar": ចូលឆ្នាំចន្ទគតិ) |
| Khmer New Year | បុណ្យចូលឆ្នាំខ្មែរ |
| lunar calendar, solar | ប្រតិទិនចន្ទគតិ, សុរិយគតិ |
| solar term | ថ្នាំងអាកាសធាតុ (solar term) on first mention |
| birth year, own year (ben ming nian) | ឆ្នាំកំណើត, ឆ្នាំរាសីខ្លួនឯង (ben ming nian) |
| compatibility, best match | ភាពសមស្រប / គូស្រករ, គូដែលសមបំផុត |
| clash, clash year | ការប៉ះទង្គិច, ឆ្នាំប៉ះទង្គិច |
| triangle (of affinity) | ត្រីកោណ |
| Six Harmonies | គូសុខដុមទាំងប្រាំមួយ |
| lucky color / number / day | ពណ៌សំណាង / លេខសំណាង / ថ្ងៃសំណាង |
| zodiac sign checker | កម្មវិធីពិនិត្យរាសី |
| compatibility calculator | កម្មវិធីគណនាភាពសមស្រប |
| daily fortune | ជោគជតារាសីប្រចាំថ្ងៃ |
| Khmer animal year (Sak) | ឆ្នាំសត្វខ្មែរ (ស័ក) |
| Buddhist Lent, Pchum Ben, Water Festival | ព្រះវស្សា, ពិធីបុណ្យភ្ជុំបិណ្ឌ, ព្រះរាជពិធីបុណ្យអុំទូក |
| Independence Day, Peace Day | ពិធីបុណ្យឯករាជ្យជាតិ, ទិវាសន្តិភាព |
| public holiday | ថ្ងៃឈប់សម្រាកសាធារណៈ |
| birthstone | ត្បូងប្រចាំខែកំណើត |
