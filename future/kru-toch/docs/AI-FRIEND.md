# Kru Toch (គ្រូតូច) — how the AI Friend works and how to extend it

Kru Toch is the chat on every main page of mybirthsign.com. Claude writes the words; the
website's own calculators do every number. This file explains where things live and how to add
something new without breaking what works.

## Where things live

| File | What it does |
| --- | --- |
| `js/ai-friend-loader.js` | The small "Kru Toch ✨" button (about 3 KB). Loads the chat only when someone wants it. Re-opens the chat on the next page if it was open. |
| `js/ai-friend.js` + `css/ai-friend.css` | The chat window: greeting, names, dd/mm/yyyy dates, memory for this visit, quick buttons, offline fallback replies. |
| `netlify/functions/ai-friend.js` | The secure server part. Holds Kru Toch's instructions, the **TOOLS** list and the **FACT_PROVIDERS** list, and calls Claude with the key stored in Netlify. |
| `js/mbs-engine.js` | The calculators as plain functions (same maths as the live pages; proven by `tests/engine-golden.mjs`). |

Netlify settings: `ANTHROPIC_API_KEY` (required), optional `ANTHROPIC_CHAT_MODEL`,
`ANTHROPIC_CHAT_EFFORT` (low / medium / high), `AI_FRIEND_DAILY_LIMIT` (messages per visitor per day,
default 60) and `AI_FRIEND_TIMEOUT_MS` (default 9000; Netlify stops functions at 10 s unless your plan allows more).

## Add a new tool or page (e.g. a "Baby Name" calculator)

1. **Tell Kru Toch it exists.** Add one line to `TOOLS` in `netlify/functions/ai-friend.js`:
   ```js
   { name: "Baby Name Ideas", nameKm: "ឈ្មោះកូន", url: "/baby-names", what: "name ideas that suit a child's animal" },
   ```
   Kru Toch will now recommend and link it.

2. **If it calculates something**, put the maths in `js/mbs-engine.js` (copy it from the page's own
   script so the numbers match), then add one function to `FACT_PROVIDERS`:
   ```js
   function babyNames(S, E, out) {
     if (!S.z1 || S.topic !== "baby") return;
     out.push("Baby name ideas for " + S.z1.animal + ": " + JSON.stringify(E.babyNames(S.z1.animal)));
   },
   ```
   `S` already has the visitor's zodiac (`S.z1`), the partner's (`S.z2`), stated animals, the topic and the
   raw chat context (`S.c`). Kru Toch may only quote numbers that appear in these lines.

3. **Optional: a quick button and topic words** in `js/ai-friend.js`: add the topic to `INTENTS`
   (words that mean it, in several languages), a chip in `UI.en.chips` / `UI.km.chips`, a link in
   `links`, and the topic name to `TOPICS` in the function.

4. **Test** before deploying: `node tests/engine-golden.mjs` (calculator parity) plus a quick chat on
   the branch preview.

## Rules that must not change

- Kru Toch never calculates zodiac results itself and never invents scores, lucky numbers or dates.
- Dates are dd/mm/yyyy; it only asks "which date did you mean?" when the two readings would give a
  different zodiac sign.
- It is an AI and says so if asked; zodiac readings are traditional, for entertainment.
- The API key lives only in Netlify, never in the website files.
