// Finds the data-lang-content="en|km|zh" blocks of an HTML page (balanced by tag name) — shared by the build step.
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
export function findBlocks(html) {
  const out = [];
  const re = /<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*\sdata-lang-content="(en|km|zh)"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase(), start = m.index;
    if (VOID.has(tag)) continue;
    const tre = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
    tre.lastIndex = re.lastIndex;
    let depth = 1, t, end = -1;
    while ((t = tre.exec(html))) {
      if (t[0].endsWith("/>")) continue;
      depth += t[1] ? -1 : 1;
      if (depth === 0) { end = tre.lastIndex; break; }
    }
    if (end < 0) throw new Error(`unclosed <${tag} data-lang-content="${m[2]}"> at ${start}`);
    out.push({ lang: m[2], start, end, tag, openEnd: re.lastIndex });
  }
  // mark nesting (a block inside another block)
  out.forEach((b) => { b.parent = out.find((o) => o !== b && o.start < b.start && o.end >= b.end) || null; });
  return out;
}
