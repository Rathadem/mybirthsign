"""Add the 'What's next' box (next_steps.py) to existing blog articles made by weekly-article.py, once.
   python3 scripts/content/add-next-steps.py      (safe to run again: pages that already have it are skipped)"""
import glob, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from next_steps import CSS, box
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
done = 0
for p in sorted(glob.glob(os.path.join(ROOT, "blog", "*.html"))):
    h = open(p, encoding="utf-8").read()
    if 'class="festival-article"' not in h or 'class="next-steps"' in h:
        continue
    n = h.replace("<section><h2>Frequently asked questions</h2>", box("en") + "\n<section><h2>Frequently asked questions</h2>", 1)
    n = n.replace("<section><h2>សំណួរដែលគេសួរញឹកញាប់</h2>", box("km") + "\n<section><h2>សំណួរដែលគេសួរញឹកញាប់</h2>", 1)
    if n == h:
        print("no FAQ heading, skipped:", os.path.basename(p)); continue
    n = n.replace("</style></head>", CSS + "</style></head>", 1)
    open(p, "w", encoding="utf-8").write(n); done += 1
print(f"added the next-steps box to {done} articles")
