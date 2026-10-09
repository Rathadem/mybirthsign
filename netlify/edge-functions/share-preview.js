// Link previews for shared results (Facebook, Telegram, Messenger, X, etc. read <meta> tags
// without running the page's JavaScript, so the right title / description / image must be in the HTML).
//
// Acts ONLY on shared result links; every other request passes straight through untouched:
//   /compatibility?pair=rat-dragon[&lang=km]                 two signs (Compare Two Signs / results)
//   /blog/daily-fortune-YYYY-MM-DD.html?sign=rat[&lang=km]    one sign's daily fortune
//   /blog/daily-fortune-YYYY-MM-DD.html?lang=km               the day's page in Khmer
// Images are fixed public files (images/og/*.jpg), never generated per visitor.
// If anything goes wrong the original page is served unchanged (config.onError = "bypass").
import D from "./share-preview-data.js";

const SITE = "https://mybirthsign.com";
const BRAND = { en: "MyBirthSign", km: "ផ្កាយកំណើត" };
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const KM_MONTHS = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const kmDigits = (v) => String(v).replace(/\d/g, (c) => "០១២៣៤៥៦៧៨៩"[c]);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function animalOf(s) { const a = cap(String(s || "")); return D.order.includes(a) ? a : null; }
export function typeOf(a, b) {
  if (a === b) return "same";
  if ((D.clash[a] || []).includes(b)) return "clash";
  if (D.triangles.some((t) => t.includes(a) && t.includes(b))) return "triangle";
  return "neutral";
}
function name(a, L) { return L === "km" ? D.kmNames[a] : a; }
function dateText(iso, L) {
  const [y, m, d] = iso.split("-").map(Number);
  return L === "km" ? `ថ្ងៃទី${kmDigits(d)} ខែ${KM_MONTHS[m - 1]} ឆ្នាំ${kmDigits(y)}` : `${EN_MONTHS[m - 1]} ${d}, ${y}`;
}

/** Works out the preview for a URL, or null when the page should be left alone. dailyRecord is optional. */
export function previewFor(url, dailyRecord) {
  const q = url.searchParams, L = q.get("lang") === "km" ? "km" : "en";
  const shareUrl = SITE + url.pathname + url.search;
  const path = url.pathname.replace(/\.html$/, "");
  if (path === "/compatibility" && q.get("pair")) {
    const m = /^([a-z]+)-([a-z]+)$/.exec(q.get("pair"));
    const a = m && animalOf(m[1]), b = m && animalOf(m[2]);
    if (!a || !b) return null;
    const [x, y] = [a, b].sort((p, r) => D.order.indexOf(p) - D.order.indexOf(r));
    const type = typeOf(a, b), names = { A: name(a, L), B: name(b, L) };
    const intro = D.intro[L][type].replace(/\{(\w+)\}/g, (s, k) => names[k] || s);
    return {
      lang: L, url: shareUrl,
      title: L === "km" ? `${names.A} និង ${names.B} — ${D.label.km[type]} | ${BRAND.km}` : `${names.A} & ${names.B} — ${D.label.en[type]} | ${BRAND.en}`,
      description: intro + (L === "km" ? " ប្រៀបធៀបសត្វរាសីណាមួយដោយឥតគិតថ្លៃ នៅលើ ផ្កាយកំណើត។" : " Compare any two Chinese zodiac signs free on MyBirthSign."),
      image: `${SITE}/images/og/pair-${x.toLowerCase()}-${y.toLowerCase()}.jpg`,
    };
  }
  const dm = /^\/blog\/daily-fortune-(\d{4}-\d{2}-\d{2})$/.exec(path);
  if (dm) {
    const iso = dm[1], a = animalOf(q.get("sign"));
    if (!a && L !== "km") return null;
    const when = dateText(iso, L);
    if (!a) return {
      lang: L, url: shareUrl,
      title: `ជោគជតារាសីចិនប្រចាំថ្ងៃ — ${when} | ${BRAND.km}`,
      description: "ស្វែងយល់ថាថ្ងៃនេះប្រព្រឹត្តចំពោះសត្វរាសីទាំង ១២ យ៉ាងណា៖ សំណាង ស្នេហា ការងារ លុយកាក់ និងដំបូន្មានប្រចាំថ្ងៃ តាមប្រពៃណី។",
      image: null,
    };
    const s = dailyRecord && dailyRecord.date === iso && Array.isArray(dailyRecord.signs) ? dailyRecord.signs.find((x) => x.animal === a) : null;
    const label = s && s.label ? " · " + s.label[L] : "";
    const text = s && s.text && s.text[L] && s.text[L].fortune;
    return {
      lang: L, url: shareUrl,
      title: L === "km" ? `${name(a, L)}${label} — ជោគជតាប្រចាំថ្ងៃ ${when} | ${BRAND.km}` : `${a}${label} — Daily Fortune, ${when} | ${BRAND.en}`,
      description: text || (L === "km"
        ? `ជោគជតាប្រចាំថ្ងៃរបស់${name(a, L)}តាមប្រពៃណី៖ ស្នេហា ការងារ លុយកាក់ លេខ និងពណ៌សំណាង។`
        : `The ${a}'s traditional daily fortune: love, career, money, lucky number and color.`),
      image: `${SITE}/images/og/sign-${a.toLowerCase()}.jpg`,
    };
  }
  return null;
}

/** Replaces (or adds) the preview tags in the page's <head>. */
export function applyPreview(html, p) {
  const tags = {
    "og:title": p.title, "og:description": p.description, "og:url": p.url,
    "og:locale": p.lang === "km" ? "km_KH" : "en_US",
    "twitter:title": p.title, "twitter:description": p.description, "twitter:card": "summary_large_image",
  };
  if (p.image) Object.assign(tags, { "og:image": p.image, "og:image:width": "1200", "og:image:height": "630", "twitter:image": p.image });
  let out = html;
  for (const [k, v] of Object.entries(tags)) {
    const attr = k.startsWith("og:") ? "property" : "name";
    const re = new RegExp(`<meta\\s+${attr}="${k.replace(/[:]/g, "\\:")}"\\s+content="[^"]*"\\s*/?>`, "i");
    const tag = `<meta ${attr}="${k}" content="${esc(v)}">`;
    out = re.test(out) ? out.replace(re, tag) : out.replace(/<\/head>/i, `${tag}\n</head>`);
  }
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${esc(p.title)}</title>`);
  out = out.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${esc(p.description)}">`);
  return out;
}

export default async function handler(request, context) {
  const url = new URL(request.url);
  const q = url.searchParams;
  if (!q.has("pair") && !q.has("sign") && q.get("lang") !== "km") return;   // not a shared result: untouched
  let daily = null;
  const dm = /daily-fortune-(\d{4}-\d{2}-\d{2})/.exec(url.pathname);
  if (dm && q.has("sign")) {
    try { const r = await fetch(new URL(`/data/daily/${dm[1]}.json`, url)); if (r.ok) daily = await r.json(); } catch (e) { /* generic text */ }
  }
  const p = previewFor(url, daily);
  if (!p) return;
  const res = await context.next();
  if (!(res.headers.get("content-type") || "").includes("text/html") || res.status !== 200) return res;
  const html = applyPreview(await res.text(), p);
  const headers = new Headers(res.headers);
  headers.delete("content-length");
  return new Response(html, { status: res.status, headers });
}

export const config = {
  path: ["/compatibility", "/compatibility.html", "/blog/daily-fortune-*"],
  onError: "bypass",
};
