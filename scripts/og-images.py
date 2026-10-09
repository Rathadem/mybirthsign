"""Builds the fixed social-preview images (1200x630 JPG) used by link previews:
   images/og/sign-<animal>.jpg      (12)  daily fortune / single sign links
   images/og/pair-<a>-<b>.jpg       (78)  compatibility / Compare Two Signs links (a <= b in zodiac order)
They contain no words except the brand and web address, so the same image works for English and Khmer
(the preview title/description carry the language). Run once:  python3 scripts/og-images.py
Needs Playwright + Chromium (dev machine only; nothing runs on the live site)."""
import base64, pathlib, sys
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
ORDER = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"]
HAN = {"Rat":"鼠","Ox":"牛","Tiger":"虎","Rabbit":"兔","Dragon":"龍","Snake":"蛇","Horse":"馬","Goat":"羊","Monkey":"猴","Rooster":"雞","Dog":"狗","Pig":"豬"}
def data_uri(p, mime):
    return f"data:{mime};base64," + base64.b64encode((ROOT / p).read_bytes()).decode()
BG = data_uri("images/fortune/hero-night.webp", "image/webp")
MED = {a: data_uri(f"images/business/animals/{a.lower()}.webp", "image/webp") for a in ORDER}
CSS = """*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;overflow:hidden;font-family:Georgia,'Times New Roman',serif;
background:#0d0828 url(%s) center/cover;position:relative;color:#fff}
.shade{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(13,8,40,.15) 0%%,rgba(13,8,40,.75) 75%%)}
.frame{position:absolute;inset:22px;border:2px solid rgba(246,220,155,.7);border-radius:26px}
.row{position:absolute;left:0;right:0;top:92px;display:flex;justify-content:center;align-items:center;gap:46px}
.med{width:300px;height:300px;border-radius:50%%;box-shadow:0 0 0 6px rgba(246,220,155,.35),0 0 70px rgba(246,220,155,.45)}
.one .med{width:340px;height:340px}
.amp{font-size:92px;color:#f6dc9b;text-shadow:0 0 24px rgba(246,220,155,.7)}
.han{position:absolute;left:0;right:0;top:418px;text-align:center;font-size:44px;letter-spacing:18px;color:#f6dc9b}
.brand{position:absolute;left:0;right:0;bottom:56px;text-align:center}
.brand b{display:block;font-size:46px;letter-spacing:2px;font-variant:small-caps;color:#fff3d1}
.brand span{font-size:26px;color:#e7c27a;letter-spacing:1px}""" % BG
def page(animals):
    meds = "".join(f'<img class="med" src="{MED[a]}">' + ('<span class="amp">&amp;</span>' if i == 0 and len(animals) == 2 else "") for i, a in enumerate(animals))
    han = " × ".join(HAN[a] for a in animals)
    cls = "row one" if len(animals) == 1 else "row"
    return f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body><div class="shade"></div><div class="frame"></div><div class="{cls}">{meds}</div><p class="han" style="top:{450 if len(animals) == 1 else 418}px">{han}</p><p class="brand"><b>MyBirthSign</b><span>mybirthsign.com</span></p></body></html>'
out = ROOT / "images/og"; out.mkdir(parents=True, exist_ok=True)
jobs = [([a], f"sign-{a.lower()}.jpg") for a in ORDER]
jobs += [([a, b], f"pair-{a.lower()}-{b.lower()}.jpg") for i, a in enumerate(ORDER) for b in ORDER[i:]]
exe = sys.argv[1] if len(sys.argv) > 1 else None
with sync_playwright() as p:
    br = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
    pg = br.new_page(viewport={"width": 1200, "height": 630})
    for animals, name in jobs:
        pg.set_content(page(animals)); pg.wait_for_timeout(60)
        pg.screenshot(path=str(out / name), type="jpeg", quality=70)
    br.close()
print("wrote", len(jobs), "images to", out)
