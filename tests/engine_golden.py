"""Golden-master test: js/mbs-engine.js must give EXACTLY the numbers the live calculator pages show.
Usage: python3 tests/engine_golden.py [BASE_URL]   (default http://127.0.0.1:8765; serve the repo root first)"""
import json, subprocess, sys, os
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8765"
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data = json.loads(subprocess.check_output(["node", "tests/engine-golden.mjs", "dump"], cwd=root))
fails, checks = [], 0
def chk(name, got, exp):
    global checks; checks += 1
    if got != exp: fails.append((name, got, exp))
NOMIN = "document.querySelectorAll('input[type=date]').forEach(i=>{i.removeAttribute('min');i.removeAttribute('max')})"
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
    def page(url):
        pg = b.new_page(viewport={"width": 1200, "height": 900})
        pg.route("https://fonts.googleapis.com/**", lambda r: r.fulfill(status=200, content_type="text/css", body=""))
        pg.route("https://pagead2.googlesyndication.com/**", lambda r: r.abort())
        pg.route("**/.netlify/functions/**", lambda r: r.abort())
        pg.add_init_script("try{localStorage.setItem('siteLang','en')}catch(e){}")
        pg.goto(BASE + url); pg.wait_for_timeout(300); pg.evaluate(NOMIN); return pg
    cmp_, biz, wed, chk_ = page("/compatibility"), page("/business-partner"), page("/wedding-date"), page("/checker")
    for row in data:
        a, bb = row["a"], row["b"]
        # ---- love (/compatibility)
        cmp_.fill("#cmp-dob1", a); cmp_.fill("#cmp-dob2", bb); cmp_.click("#cmp-form button[type=submit]"); cmp_.wait_for_selector(".cmp-score-pct")
        vals = [int(x.replace("%", "")) for x in cmp_.eval_on_selector_all(".cmp-score-pct", "e=>e.map(x=>x.textContent)")]
        L = row["love"]; exp = [L["scores"][k] for k in ["love", "communication", "trust", "business", "friendship"]] + [L["overall"]]
        chk(f"love {a} {bb}", vals, exp)
        # ---- business
        biz.fill("#biz-p1-dob", a); biz.fill("#biz-p2-dob", bb); biz.click("#biz-form button[type=submit]"); biz.wait_for_selector(".biz-meter-inner")
        meters = [int(x.replace("%", "")) for x in biz.eval_on_selector_all(".biz-meter-inner", "e=>e.map(x=>x.textContent.trim())")]
        ov = int(biz.eval_on_selector(".biz-ov-ring-inner strong", "e=>e.childNodes[0].textContent"))
        Bz = row["biz"]; keys = ["entrepreneurship", "leadership", "finance", "growth", "decision", "communication", "trust", "conflict", "operations", "sales", "innovation", "risk"]
        chk(f"biz meters {a} {bb}", sorted(meters), sorted(Bz["scores"][k] for k in keys))
        chk(f"biz overall {a} {bb}", ov, Bz["overall"])
        # ---- wedding (year 2027)
        wed.fill("#dob-a", a); wed.fill("#dob-b", bb); wed.select_option("#wedding-year", "2027"); wed.click("#wedding-form button[type=submit]"); wed.wait_for_selector("#wed-pct")
        pct = int(wed.get_attribute("#wed-pct", "aria-label").replace("%", ""))
        ratings = wed.eval_on_selector_all(".wed-cal .wed-m", "e=>e.map(x=>[...x.classList].find(c=>c.startsWith('wed-m-')&&c!=='wed-m-name').replace('wed-m-',''))")
        W = row["wed"]; chk(f"wed harmony {a} {bb}", pct, W["harmony"]); chk(f"wed months {a} {bb}", ratings, [m["rating"] for m in W["months"]])
    # ---- checker (zodiac) on a subset
    for row in data:
        chk_.fill("#dob", row["a"]); chk_.click("#birthday-form button[type=submit]"); chk_.wait_for_timeout(120)
        txt = chk_.inner_text("#result"); z = row["za"]
        # the checker page shows the animal + element (it lists that animal's years, not the zodiac year itself)
        chk(f"checker {row['a']}", [z["animal"] in txt, z["element"] in txt], [True, True])
    b.close()
print(f"CHECKS {checks}  FAILS {len(fails)}")
for f in fails[:12]: print("FAIL", f)
sys.exit(1 if fails else 0)
