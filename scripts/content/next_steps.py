"""'What's next' box for blog articles: links to the zodiac checker, today's fortune and the compatibility calculator,
so a reader who arrives on one article (often from Facebook) has an easy next page. Used by weekly-article.py for new
articles and by add-next-steps.py for existing ones. The links are relative, so they work in every language folder;
"../today" is a redirect to the current day's fortune, written by scripts/build-site.mjs."""

CSS = (".next-steps{margin:34px 0;padding:20px 20px 22px;border:1px solid #7e673a;border-radius:18px;"
       "background:linear-gradient(135deg,#231b45,#1b1734)}"
       ".next-steps h2{margin:0 0 6px!important;font-size:1.35rem}.next-steps p{margin:0 0 14px;color:#d7d1e8}"
       ".next-steps .ns-row{display:flex;flex-wrap:wrap;gap:10px}"
       ".festival-article .next-steps a.ns-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border-radius:999px;"
       "background:#f2d27d;color:#1b1430;font-weight:700;text-decoration:none;line-height:1.2}"
       ".festival-article .next-steps a.ns-btn.ns-alt{background:transparent;color:#f2d27d;border:1px solid #f2d27d}"
       ".festival-article .next-steps a.ns-btn:hover{filter:brightness(1.08)}")

def box(lang):
    if lang == "km":
        return ('<aside class="next-steps" aria-label="បន្ទាប់"><h2>បន្តទៀត</h2><p>ចង់ដឹងពីរាសី និងសំណាងរបស់អ្នកថ្ងៃនេះទេ?</p><div class="ns-row">'
                '<a class="ns-btn" href="../checker">🔮 រករាសីរបស់អ្នក</a>'
                '<a class="ns-btn" href="../today">✨ ជោគជតាថ្ងៃនេះ</a>'
                '<a class="ns-btn ns-alt" href="../compatibility.html">💞 ពិនិត្យភាពត្រូវគ្នា</a></div></aside>')
    return ('<aside class="next-steps" aria-label="What\'s next"><h2>What\'s next?</h2><p>Curious about your own sign and your luck today?</p><div class="ns-row">'
            '<a class="ns-btn" href="../checker">🔮 Find your zodiac sign</a>'
            '<a class="ns-btn" href="../today">✨ Today\'s fortune</a>'
            '<a class="ns-btn ns-alt" href="../compatibility.html">💞 Check love compatibility</a></div></aside>')
