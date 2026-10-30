#!/usr/bin/env python3
"""Check Khmer article versions against their English specs (nothing is written).

    python3 scripts/content/km-check.py <slug> [<slug> ...]      # or: --all
    python3 scripts/content/km-check.py --page blog/<page>.html   # a hand-written page with en + km language blocks

English spec: scripts/content/weekly/<slug>.json or scripts/content/years/<slug>.json
Khmer version: the spec's own "km" field, else scripts/content/km/<slug>.json

ERROR lines must be fixed before publishing; WARN lines need a look. Exit code 1 when there is any ERROR.
Checks: same structure (sections, paragraphs, list items, tables, pictures, FAQ, sources, related links), same links
and pictures, every number of the English text also in the Khmer text (dates as dd/mm/yyyy), no new large numbers,
Western digits only, no English month names in dates, tags opened and closed, no text left untranslated.
"""
import glob, html, json, os, re, sys
from collections import Counter
from html.parser import HTMLParser

HERE = os.path.dirname(os.path.abspath(__file__))
MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December"
MON3 = "Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec"
KHMER = re.compile(r"[ក-៿]")
DEFAULT_NOTE = "Dates for lunar observances follow the Khmer lunar calendar"
STRUCT = {"a", "table", "thead", "tbody", "tr", "td", "th", "ul", "ol", "li", "div", "figure", "img", "time", "section", "svg", "p", "h3", "h4", "i", "span", "small", "b"}
VOID = {"img", "br", "hr", "wbr", "source", "meta", "link", "input", "col"}


def load(slug):
    for d in ("weekly", "years"):
        p = os.path.join(HERE, d, slug + ".json")
        if os.path.exists(p):
            en = json.load(open(p, encoding="utf-8"))
            break
    else:
        return None, None, f"no English spec for {slug}"
    km = en.get("km")
    if km is None:
        kp = os.path.join(HERE, "km", slug + ".json")
        if not os.path.exists(kp):
            return en, None, f"no Khmer version (scripts/content/km/{slug}.json)"
        try:
            km = json.load(open(kp, encoding="utf-8"))
        except json.JSONDecodeError as x:
            return en, None, f"scripts/content/km/{slug}.json is not valid JSON: {x}"
    return en, km, None


def text(h):   # visible text of an HTML string
    return html.unescape(re.sub(r"<[^>]+>", " ", h or ""))


def nums(t):
    t = re.sub(r"(?<=\d),(?=\d{3}\b)", "", t)
    return [int(x) for x in re.findall(r"\d+", t)]


def tags(h):
    return Counter(m.lower() for m in re.findall(r"<([a-zA-Z][a-zA-Z0-9]*)\b", h or ""))


def hrefs(h):
    return Counter(re.findall(r'href="([^"]*)"', h or ""))


class Bal(HTMLParser):
    def __init__(self):
        super().__init__(); self.st = []; self.bad = []
    def handle_starttag(self, t, a):
        if t not in VOID: self.st.append(t)
    def handle_endtag(self, t):
        if t in VOID: return
        if self.st and self.st[-1] == t: self.st.pop()
        else: self.bad.append(t)


def balanced(h):
    b = Bal(); b.feed(h or ""); b.close()
    return not b.st and not b.bad, b.st + b.bad


def strings(spec, km_side=False):
    """(path, html string) for every piece of reader-facing text, in a fixed order for both languages"""
    out = []
    for k in ("title", "eyebrow", "kicker", "card_text", "lead"):
        out.append((k, spec.get(k, "")))
    for i, f in enumerate(spec.get("facts", [])):
        out += [(f"facts[{i}].label", f[0]), (f"facts[{i}].value", f[1])]
    def pics(path, x):
        res = []
        if not x: return res
        for j, im in enumerate(x if isinstance(x, list) else [x]):
            res += [(f"{path}[{j}].alt", im.get("alt", "")), (f"{path}[{j}].caption", im.get("caption", ""))]
        return res
    out += pics("image", spec.get("image"))
    for i, s in enumerate(spec.get("sections", [])):
        out.append((f"sections[{i}].h2", s.get("h2", "")))
        for k in ("paras", "list", "after"):
            for j, p in enumerate(s.get(k, [])):
                out.append((f"sections[{i}].{k}[{j}]", p))
        if s.get("html"):
            out.append((f"sections[{i}].html", s["html"]))
        out += pics(f"sections[{i}].gallery", s.get("gallery"))
        out += pics(f"sections[{i}].img", s.get("img"))
    for i, q in enumerate(spec.get("faq", [])):
        out += [(f"faq[{i}].q", q[0]), (f"faq[{i}].a", q[1])]
    for i, r in enumerate(spec.get("related", [])):
        out.append((f"related[{i}].label", r[0]))
    if km_side:
        for i, n in enumerate(spec.get("source_notes", [])):
            out.append((f"source_notes[{i}]", n))
    else:
        for i, s in enumerate(spec.get("sources", [])):
            out.append((f"source_notes[{i}]", s[2]))
    note = spec.get("note")
    if note:
        out.append(("note", note))
    if spec.get("back"):
        out.append(("back", spec["back"][0]))
    return out


def check(slug):
    errs, warns = [], []
    en, km, why = load(slug)
    if why:
        return [why], []
    E, W = errs.append, warns.append
    for k in ("title", "eyebrow", "kicker", "card_text", "lead", "published", "facts", "sections", "faq", "source_notes", "related"):
        if k not in km:
            E(f"missing field: {k}")
    if errs:
        return errs, warns
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(km["published"])) or km["published"] < en["published"]:
        E(f'published must be YYYY-MM-DD and not before the English date ({en["published"]}), not {km["published"]}')
    for k, n in (("facts", len(en["facts"])), ("faq", len(en["faq"])), ("source_notes", len(en["sources"])), ("related", len(en["related"])), ("sections", len(en["sections"]))):
        if len(km[k]) != n:
            E(f"{k}: {len(km[k])} items, the English has {n}")
    if [r[1] for r in km["related"]] != [r[1] for r in en["related"]]:
        E("related: the links (second item of each pair) must be the same as the English, in the same order")
    if en.get("back") and not km.get("back"):
        E("missing field: back (the English has one)")
    if en.get("back") and km.get("back") and km["back"][1] != en["back"][1]:
        E(f'back: link must stay {en["back"][1]}')
    en_note = en.get("note", DEFAULT_NOTE)
    if en_note and not km.get("note"):
        E("missing field: note (the English page shows a note box)")
    if not en_note and km.get("note"):
        W("note: the English page has no note box")

    def same_pic(path, a, b):
        if bool(a) != bool(b):
            E(f"{path}: the English has {'a picture' if a else 'no picture'} here"); return
        if not a: return
        al, bl = (a if isinstance(a, list) else [a]), (b if isinstance(b, list) else [b])
        if len(al) != len(bl):
            E(f"{path}: {len(bl)} pictures, the English has {len(al)}"); return
        for j, (x, y) in enumerate(zip(al, bl)):
            for k in ("src", "width", "height", "credit", "cls"):
                if x.get(k) != y.get(k):
                    E(f"{path}[{j}].{k} must stay exactly as in the English ({x.get(k)!r})")
    same_pic("image", en.get("image"), km.get("image"))
    for i, (s, t) in enumerate(zip(en["sections"], km["sections"])):
        for k in ("paras", "list", "after"):
            if len(s.get(k, [])) != len(t.get(k, [])):
                E(f"sections[{i}].{k}: {len(t.get(k, []))} items, the English has {len(s.get(k, []))}")
        if bool(s.get("html")) != bool(t.get("html")):
            E(f"sections[{i}].html: {'missing' if s.get('html') else 'not in the English'}")
        same_pic(f"sections[{i}].gallery", s.get("gallery"), t.get("gallery"))
        same_pic(f"sections[{i}].img", s.get("img"), t.get("img"))
        for k in [x for x in t if x not in ("h2", "paras", "list", "after", "html", "gallery", "img")]:
            W(f"sections[{i}]: unknown field {k} (ignored by the page builder)")

    es, ks = strings(en), strings(km, True)
    if [p for p, _ in es] != [p for p, _ in ks]:
        miss = [p for p, _ in es if p not in dict(ks)]
        if miss: E("text missing: " + ", ".join(miss[:12]))
    kd = dict(ks)
    all_en, all_km = [], []
    for p, h in es:
        k = kd.get(p)
        if k is None: continue
        all_en.append(h); all_km.append(k)
        if KHMER.search(text(h)) is None and len(re.findall(r"[A-Za-z]{2,}", text(h))) >= 3 and not KHMER.search(text(k)):
            E(f"{p}: not translated: {text(k)[:80]!r}")
        if re.search(r"<[a-zA-Z/]", h) or re.search(r"<[a-zA-Z/]", k):
            ok, left = balanced(k)
            if not ok: E(f"{p}: tags not opened/closed in order: {left}")
            te, tk = tags(h), tags(k)
            for t in sorted(set(te) | set(tk)):
                if t in STRUCT and te[t] != tk[t]:
                    (E if t in ("a", "table", "tr", "td", "th", "li", "ul", "ol", "div", "figure", "img", "time", "svg") else W)(
                        f"{p}: <{t}> appears {tk[t]} times, the English has {te[t]}")
            if hrefs(h) != hrefs(k):
                E(f"{p}: links differ from the English: missing {list((hrefs(h) - hrefs(k)).elements())} extra {list((hrefs(k) - hrefs(h)).elements())}")
            ce = Counter(re.findall(r'class="([^"]*)"', h)); ck = Counter(re.findall(r'class="([^"]*)"', k))
            if ce != ck:
                W(f"{p}: class attributes differ from the English")
        vt = text(k)
        if re.search(r"[០-៩]", vt):
            E(f"{p}: Khmer digits — use Western digits 0-9: {vt[:60]!r}")
        if re.search(rf"\b\d{{1,2}}(st|nd|rd|th)?\s+({MONTHS})\b|\b({MONTHS}|{MON3})\.?\s+\d{{1,2}}\b", vt):
            E(f"{p}: date with an English month name — write dd/mm/yyyy: {vt[:90]!r}")
        elif re.search(rf"\b({MONTHS})\b", vt):
            W(f"{p}: English month name in the Khmer text")
        if re.search(r"\b\d{1,2}/\d{1,2}/\d{4}\b", vt):
            for dd, mm, yy in re.findall(r"\b(\d{1,2})/(\d{1,2})/(\d{4})\b", vt):
                if len(dd) != 2 or len(mm) != 2 or not (1 <= int(mm) <= 12) or not (1 <= int(dd) <= 31):
                    E(f"{p}: date {dd}/{mm}/{yy} is not dd/mm/yyyy")
        run = re.search(r"(?:\b[A-Za-z][A-Za-z'’-]*\b[ ,]+){5,}[A-Za-z]", vt)
        if run and p != "title":
            W(f"{p}: English words left in the Khmer text: {run.group(0)[:70]!r}")
    ne, nk = Counter(), Counter()
    for h in all_en: ne.update(nums(text(h)))
    for h in all_km: nk.update(nums(text(h)))
    miss = sorted(set(ne) - set(nk))
    if miss:
        E(f"numbers in the English text not found in the Khmer text: {miss[:30]}")
    extra = sorted(x for x in set(nk) - set(ne) if x > 31)
    if extra:
        W(f"numbers in the Khmer text that the English does not have (make sure nothing was added): {extra[:30]}")
    return errs, warns


def block(h, lang):   # inside of the top-level <div data-lang-content="lang"> of a hand-written page
    m = re.search(rf'<div\b[^>]*\sdata-lang-content="{lang}"[^>]*>', h)
    if not m: return None
    depth, i = 1, m.end()
    for t in re.finditer(r"<(/?)div\b[^>]*>", h[i:]):
        depth += -1 if t.group(1) else 1
        if depth == 0: return h[i:i + t.start()]
    return None


def check_page(path):
    """a hand-written page with an English and a Khmer language block (e.g. the holiday guides)"""
    errs, warns = [], []
    h = open(path, encoding="utf-8").read()
    en, km = block(h, "en"), block(h, "km")
    if en is None or km is None:
        return [f'needs <div data-lang-content="en"> and <div data-lang-content="km" lang="km"> blocks inside <main>'], []
    if not re.search(r'<div\b[^>]*data-lang-content="km"[^>]*\slang="km"', h):
        errs.append('the Khmer block needs lang="km"')
    ok, left = balanced(km)
    if not ok: errs.append(f"Khmer block: tags not opened/closed in order: {left}")
    te, tk = tags(en), tags(km)
    for t in sorted(set(te) | set(tk)):
        if t in STRUCT and te[t] != tk[t]:
            (errs if t in ("a", "section", "h2", "h3", "table", "tr", "td", "li", "figure", "img", "aside") else warns).append(f"<{t}> appears {tk[t]} times, the English has {te[t]}")
    for t in ("h2", "h3", "section", "aside"):
        if te[t] != tk[t]: errs.append(f"<{t}> appears {tk[t]} times, the English has {te[t]}")
    he = Counter(x for x in re.findall(r'href="([^"]*)"', en)); hk = Counter(re.findall(r'href="([^"]*)"', km))
    if he != hk:
        errs.append(f"links differ: missing {list((he - hk).elements())} extra {list((hk - he).elements())}")
    se, sk = re.findall(r'src="([^"]*)"', en), re.findall(r'src="([^"]*)"', km)
    if se != sk: errs.append(f"pictures differ: {se} vs {sk}")
    vt = text(km)
    if re.search(r"[០-៩]", vt): errs.append("Khmer digits — use Western digits 0-9")
    for m in re.finditer(rf"\b\d{{1,2}}(st|nd|rd|th)?\s+({MONTHS})\b|\b({MONTHS}|{MON3})\.?\s+\d{{1,2}}\b", vt):
        errs.append(f"date with an English month name — write dd/mm/yyyy: {m.group(0)!r}")
    for dd, mm, yy in re.findall(r"\b(\d{1,2})/(\d{1,2})/(\d{4})\b", vt):
        if len(dd) != 2 or len(mm) != 2 or not (1 <= int(mm) <= 12): errs.append(f"date {dd}/{mm}/{yy} is not dd/mm/yyyy")
    miss = sorted(set(nums(text(en))) - set(nums(vt)))
    if miss: errs.append(f"numbers in the English text not found in the Khmer text: {miss[:30]}")
    extra = sorted(x for x in set(nums(vt)) - set(nums(text(en))) if x > 31)
    if extra: warns.append(f"numbers the English does not have (make sure nothing was added): {extra}")
    for m in re.finditer(r"(?:\b[A-Za-z][A-Za-z'’-]*\b[ ,]+){5,}[A-Za-z]", vt):
        warns.append(f"English words left in the Khmer text: {m.group(0)[:70]!r}")
    if len(KHMER.findall(vt)) < len(re.findall(r"[A-Za-z]", text(en))) * 0.5:
        errs.append("the Khmer block looks much shorter than the English (something not translated?)")
    return errs, warns


if __name__ == "__main__":
    args = sys.argv[1:]
    if args and args[0] == "--page":
        bad = 0
        for p in args[1:]:
            errs, warns = check_page(p)
            print(f"{p}: {'OK' if not errs else str(len(errs)) + ' ERROR'}{', ' + str(len(warns)) + ' WARN' if warns else ''}")
            for x in errs: print("  ERROR", x)
            for x in warns: print("  WARN ", x)
            bad += bool(errs)
        sys.exit(1 if bad else 0)
    if args == ["--all"]:
        args = sorted({os.path.basename(p)[:-5] for p in glob.glob(os.path.join(HERE, "km", "*.json"))})
    if not args:
        print(__doc__); sys.exit(2)
    bad = 0
    for slug in args:
        errs, warns = check(slug)
        print(f"{slug}: {'OK' if not errs else str(len(errs)) + ' ERROR'}{', ' + str(len(warns)) + ' WARN' if warns else ''}")
        for x in errs: print("  ERROR", x)
        for x in warns: print("  WARN ", x)
        bad += bool(errs)
    sys.exit(1 if bad else 0)
