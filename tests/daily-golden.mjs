// The chat's daily-luck rule must match the PUBLISHED daily fortune posts (blog/daily-fortune-*.html).
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url"; import { loadEngine } from "./engine-golden.mjs";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."); const E = loadEngine();
let checks = 0, fails = [];
for (const f of fs.readdirSync(path.join(root, "blog")).filter((x) => /^daily-fortune-\d{4}-\d{2}-\d{2}\.html$/.test(x))) {
  const iso = f.slice(14, 24), html = fs.readFileSync(path.join(root, "blog", f), "utf8");
  if (!html.includes("fx-sign")) { console.log("skip (older page format, before the current generator):", f); continue; }
  const da = /Today is a (\w+) day/.exec(html)?.[1]; checks++; if (E.dayAnimal(iso) !== da) fails.push([f, "dayAnimal", E.dayAnimal(iso), da]);
  const re = /<li class="fx-sign fx-sign-(\w+)">[\s\S]*?<h3>(\w+)<\/h3>/g; let m, n = 0;
  while ((m = re.exec(html))) { n++; checks++; const r = E.dailyLuck(iso, m[2]); if (r.tier !== m[1]) fails.push([f, m[2], r.tier, m[1]]); }
  checks++; if (n !== 12) fails.push([f, "animal cards", n, 12]);
}
console.log("DAILY CHECKS", checks, "FAILS", fails.length); fails.forEach((x) => console.log("FAIL", x)); process.exit(fails.length ? 1 : 0);
