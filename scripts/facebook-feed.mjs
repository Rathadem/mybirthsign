// The day's Khmer Facebook posts for PublishHub (the owner's posting app), written next to the Telegram cards:
//   <date>/facebook-km.json on the "telegram-cards" branch (made by scripts/telegram-cards.mjs in the daily GitHub job).
// PublishHub reads it every day and schedules the posts on the "My Birth Sign" Facebook Page at 06:00 Cambodia time
// (publishhub: server/src/lib/dailyFeed.ts, set with DAILY_FEED_URL and DAILY_FEED_ACCOUNT_ID).
// Three posts, as the owner asked (14/11/2026): the lucky signs card; the good signs (the Great Day card and the Good
// Day cards together, one post); the sign to take it easy. A post whose cards are missing that day is left out.
// Facebook-safe pictures: the daily cards are the Facebook copies without the lucky number (<n>-km-fb.jpg, 20/11/2026).
// Facebook-safe captions: no lucky numbers and no betting words (the numbers are on the website), the site's usual
// hashtags and the line saying it is traditional entertainment. Dates in Western digits, dd/mm/yyyy.
export const FEED_TIME = "06:00";
export const FEED_TZ = "Asia/Phnom_Penh";
const SITE = "https://mybirthsign.com";
const DISC = "ការអានរាសីចិនតាមប្រពៃណី សម្រាប់ការកម្សាន្ត និងការឆ្លុះបញ្ចាំងខ្លួនប៉ុណ្ណោះ មិនមែនជាការព្យាករណ៍វិទ្យាសាស្ត្រទេ។";
const TAGS = "#ជោគជតារាសី #រាសីប្រចាំថ្ងៃ #ផ្កាយកំណើត #MyBirthSign";
const yr = (n) => "ឆ្នាំ" + n;
const join = (a) => (a.length < 2 ? a.join("") : a.slice(0, -1).join(" ") + " និង" + a[a.length - 1]);

// specs: the Khmer card specs in drawing order (the same list telegram-cards.mjs draws), files: the picture of each
export function facebookFeed(date, specs, files) {
  const dmy = date.split("-").reverse().join("/"), url = `${SITE}/km/blog/daily-fortune-${date}`;
  const pick = (f) => specs.map((s, i) => [s, files[i]]).filter(([s, file]) => file && f(s));
  const end = `\n\n${DISC}\n\n${TAGS}`;
  const posts = [];
  const lucky = pick((s) => s.cardType === "lucky");
  if (lucky.length) {
    const top = lucky[0][0].topNames || [];
    posts.push({ key: "lucky", title: `សំណាងល្អថ្ងៃនេះ ${dmy}`, images: lucky.map(([, f]) => f),
      caption: `🌟 ឆ្នាំដែលមានសំណាងជាងគេ ថ្ងៃនេះ ${dmy}\n${join(top.map(yr))} 🍀\nតើអ្នកកើតឆ្នាំអ្វី? Comment ប្រាប់ផង! 👇\nមើលរាសីទាំង 12 ថ្ងៃនេះ៖ ${url}${end}` });
  }
  const good = pick((s) => s.cardType === "daily" && (s.tier === "great" || s.tier === "good"));
  if (good.length) {
    const line = (tier, icon) => { const g = good.filter(([s]) => s.tier === tier); return g.length ? `${icon} ${g[0][0].label}៖ ${join(g.map(([s]) => yr(s.name)))}\n` : ""; };
    posts.push({ key: "good", title: `ឆ្នាំដែលមានថ្ងៃល្អ ${dmy}`, images: good.map(([, f]) => f),
      caption: `✨ ឆ្នាំដែលមានថ្ងៃល្អ ថ្ងៃនេះ ${dmy}\n${line("great", "🌟")}${line("good", "👍")}ពណ៌ ពេលវេលា និងទិសសំណាង មាននៅលើរូបភាព។\nអានរាសីពេញលេញ៖ ${url}${end}` });
  }
  const care = pick((s) => s.cardType === "daily" && s.tier === "caution");
  if (care.length) {
    posts.push({ key: "careful", title: `ឆ្នាំដែលគួរប្រុងប្រយ័ត្ន ${dmy}`, images: care.map(([, f]) => f),
      caption: `🙏 ${join(care.map(([s]) => yr(s.name)))} ថ្ងៃនេះគួរប្រុងប្រយ័ត្នបន្តិច – ${dmy}\nសូមធ្វើអ្វីៗយឺតៗ ពិនិត្យឲ្យច្បាស់មុនសម្រេចចិត្ត និងរក្សាចិត្តឲ្យស្ងប់។\nអានដំបូន្មានសម្រាប់ថ្ងៃនេះ៖ ${url}${end}` });
  }
  return { v: 1, date, lang: "km", time: FEED_TIME, timezone: FEED_TZ, link: url, posts };
}
