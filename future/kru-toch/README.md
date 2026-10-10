# Kru Toch (គ្រូតូច) — AI chat, parked for a future update

Kru Toch was taken off the website on 10 Oct 2026 (owner's decision). Nothing here is deployed:
Netlify only builds functions from `netlify/functions/`, and no page loads these scripts.

| File here | Put it back at |
|---|---|
| `js/ai-friend-loader.js` | `js/ai-friend-loader.js` |
| `js/ai-friend.js` | `js/ai-friend.js` |
| `css/ai-friend.css` | `css/ai-friend.css` |
| `netlify-functions/ai-friend.js` | `netlify/functions/ai-friend.js` |
| `docs/AI-FRIEND.md` | `docs/AI-FRIEND.md` (how it works, how to add features) |

## To bring it back
1. Move the files above back to their places.
2. Add `<script src="js/ai-friend-loader.js" defer></script>` before `</body>` on the pages that should show the
   chat button (it was on: index, checker, compatibility, business-partner, wedding-date, animals, blog, about,
   contact), and in `scripts/home-page.mjs` + `scripts/animals-page.mjs` so regenerated pages keep it.
3. Netlify environment variable `ANTHROPIC_API_KEY` (optional: `ANTHROPIC_CHAT_MODEL`, `ANTHROPIC_CHAT_EFFORT`,
   `AI_FRIEND_TIMEOUT_MS`, `AI_FRIEND_DAILY_LIMIT`).
4. Put the "AI Friend Chat" paragraphs back in `privacy.html` (EN + KM; see git history of privacy.html).
5. Test on a branch deploy before going live.

## Known issue when it was parked
Answers tended to point visitors to pages instead of answering in the chat. The last changes (in these files)
give it the sign's full facts and an "answer in the chat" rule and send birthday+question messages to the AI,
but this was NOT VERIFIED with the real AI before it was parked.
