// Golden-master helper: loads the real site data + js/mbs-engine.js in a sandbox and prints
// engine results for a fixed set of date pairs as JSON. tests/engine_golden.py compares them
// with what the LIVE calculators display on the pages.
import fs from "node:fs"; import vm from "node:vm"; import path from "node:path"; import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export function loadEngine() {
  const ctx = vm.createContext({ console, Date, Math, Object, Array, String, Number, JSON, parseInt, isNaN });
  for (const f of ["js/zodiac-data.js", "js/business-data.js", "js/mbs-engine.js"])
    vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
  return vm.runInContext("MBSEngine", ctx);
}
export function pairs() {
  // deterministic spread over 1900..2025 + Chinese New Year boundary days + leap day + same-day pairs
  let s = 12345; const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const iso = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const out = [["1989-01-01", "1988-02-17"], ["1989-02-05", "1989-02-06"], ["2000-02-29", "1996-02-19"], ["1990-05-05", "1990-05-05"], ["1900-01-30", "1900-01-31"], ["2025-01-28", "2025-01-29"]];
  while (out.length < 120) {
    const mk = () => { const y = 1900 + Math.floor(rnd() * 126), m = 1 + Math.floor(rnd() * 12), d = 1 + Math.floor(rnd() * 28); return iso(y, m, d); };
    const a = mk(), b = mk(); if (a <= iso(2025, 12, 28) && b <= iso(2025, 12, 28)) out.push([a, b]);
  }
  return out;
}
if (process.argv[2] === "dump") {
  const E = loadEngine();
  console.log(JSON.stringify(pairs().map(([a, b]) => ({ a, b, love: E.love(a, b), biz: E.business(a, b), wed: E.wedding(a, b, 2027), za: E.zodiac(a) }))));
}
