#!/usr/bin/env python3
"""Adds the "how this site works" sections to about.html and contact.html (EN / KM / ZH).

   python3 scripts/content/trust-pages-build.py      (safe to run again: it replaces its own sections)

Only facts about the site itself: its tools, the data and libraries it uses, and how corrections work.
No author biography or business details are invented; the owner can add those by hand.
"""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
MK = ("<!-- trust:start -->", "<!-- trust:end -->")

ABOUT = {
"en": """
  <h2>What you can do here</h2>
  <ul>
    <li><a href="/checker">Zodiac Checker</a>: your animal, element and Yin or Yang from your birth date, plus your Khmer lunar birth date.</li>
    <li><a href="/compatibility">Compatibility</a>: compare two birth dates, or two signs if you don't know the dates.</li>
    <li><a href="/business-partner">Business Partner</a> and <a href="/wedding-date">Wedding Date</a>: the same traditions applied to a partnership and to choosing a wedding month.</li>
    <li><a href="/animals">Guides to all 12 animals</a>, plus articles on <a href="/blog/how-to-calculate-zodiac-sign">calculating your sign</a>, <a href="/blog/five-elements-explained">the five elements</a> and <a href="/blog/khmer-lunar-calendar-birth-date">the Khmer lunar calendar</a>.</li>
  </ul>
  <h2>How the results are worked out</h2>
  <ul>
    <li><strong>Lunar New Year cutoff.</strong> Every calculator compares your birth date with the actual Lunar New Year date for that year, from a table covering 1900 to 2060. We checked every date in that table against an independent lunar-calendar library and found no differences.</li>
    <li><strong>Element and Yin or Yang</strong> come from the zodiac year's last digit, following the traditional ten-stem cycle (for example, years ending in 0 or 1 are Metal).</li>
    <li><strong>Compatibility</strong> uses the traditional triangles, six harmony pairs and clashes. The <a href="/blog/zodiac-compatibility-guide">compatibility guide</a> explains each rule, and each tool says which rules it uses.</li>
    <li><strong>Khmer lunar dates</strong> are calculated with the open-source <a href="https://github.com/ThyrithSor/momentkh" rel="noopener">momentkh</a> library, never estimated by hand.</li>
    <li><strong>Your dates stay with you.</strong> Calculations run in your browser, and birth dates and names are never put into share links.</li>
  </ul>
  <h2>How we write and correct content</h2>
  <p>Articles describe traditional beliefs as traditions, explain where they come from, and never promise outcomes. Where traditions disagree, for example on when the animal year changes in the Chinese and Khmer calendars, we explain both instead of quietly choosing one. If you find a wrong date, result or translation, please tell us and we will correct the page.</p>
  <p>Daily fortune ratings, lucky numbers and calendar dates come from fixed rules and data in the site's code. The wording of each day's fortune is drafted with an AI model (Anthropic's Claude) and is published only after it passes automatic checks against those rules. Other articles may also be drafted with AI help, but their dates and facts come from the calculators or from the sources listed on the page.</p>
  <h2>Languages</h2>
  <p>Pages are available in English, Khmer and Simplified Chinese, each at its own address; a few articles, such as the business compatibility guide, are not yet translated into every language. Use the language buttons at the top of any page. Khmer pages carry no advertising.</p>
""",
"km": """
  <h2>អ្វីដែលអ្នកអាចធ្វើនៅទីនេះ</h2>
  <ul>
    <li><a href="/checker">ម៉ាស៊ីនពិនិត្យរាសី</a>៖ សត្វ ធាតុ និងយិន ឬយ៉ាងរបស់អ្នក តាមថ្ងៃកំណើត ព្រមទាំងថ្ងៃកំណើតតាមចន្ទគតិខ្មែរ។</li>
    <li><a href="/compatibility">ភាពសមស្រប</a>៖ ប្រៀបធៀបថ្ងៃកំណើតពីរ ឬរាសីពីរ ប្រសិនបើអ្នកមិនដឹងថ្ងៃកំណើត។</li>
    <li><a href="/business-partner">ដៃគូអាជីវកម្ម</a> និង<a href="/wedding-date">ថ្ងៃរៀបការ</a>៖ ប្រពៃណីដដែល ប្រើសម្រាប់ភាពជាដៃគូ និងការជ្រើសខែរៀបការ។</li>
    <li><a href="/animals">មគ្គុទ្ទេសក៍សត្វទាំង 12</a> ព្រមទាំងអត្ថបទអំពី<a href="/blog/how-to-calculate-zodiac-sign">ការគណនារាសី</a> <a href="/blog/five-elements-explained">ធាតុទាំងប្រាំ</a> និង<a href="/blog/khmer-lunar-calendar-birth-date">ប្រតិទិនចន្ទគតិខ្មែរ</a>។</li>
  </ul>
  <h2>របៀបដែលលទ្ធផលត្រូវបានគណនា</h2>
  <ul>
    <li><strong>ថ្ងៃចូលឆ្នាំចន្ទគតិ។</strong> ម៉ាស៊ីនគណនានីមួយៗប្រៀបធៀបថ្ងៃកំណើតរបស់អ្នក ជាមួយថ្ងៃចូលឆ្នាំចន្ទគតិពិតប្រាកដនៃឆ្នាំនោះ ពីតារាងដែលគ្របដណ្តប់ឆ្នាំ 1900 ដល់ 2060។ យើងបានពិនិត្យកាលបរិច្ឆេទនីមួយៗក្នុងតារាងនោះ ជាមួយបណ្ណាល័យប្រតិទិនចន្ទគតិឯករាជ្យមួយ ហើយមិនឃើញភាពខុសគ្នាទេ។</li>
    <li><strong>ធាតុ និងយិន ឬយ៉ាង</strong> មកពីលេខចុងក្រោយនៃឆ្នាំរាសី តាមវដ្តដើមទាំងដប់តាមប្រពៃណី (ឧទាហរណ៍ ឆ្នាំបញ្ចប់ដោយ 0 ឬ 1 ជាលោហធាតុ)។</li>
    <li><strong>ភាពសមស្រប</strong> ប្រើក្រុមបី គូចុះសម្រុងទាំងប្រាំមួយ និងការប៉ះទង្គិចតាមប្រពៃណី។ <a href="/blog/zodiac-compatibility-guide">មគ្គុទ្ទេសក៍ភាពសមស្រប</a>ពន្យល់ច្បាប់នីមួយៗ ហើយឧបករណ៍នីមួយៗប្រាប់ថាវាប្រើច្បាប់ណា។</li>
    <li><strong>ថ្ងៃខែតាមចន្ទគតិខ្មែរ</strong> ត្រូវបានគណនាដោយបណ្ណាល័យកូដចំហ <a href="https://github.com/ThyrithSor/momentkh" rel="noopener">momentkh</a> មិនដែលប៉ាន់ស្មានដោយដៃទេ។</li>
    <li><strong>ថ្ងៃកំណើតរបស់អ្នកនៅជាមួយអ្នក។</strong> ការគណនាដំណើរការនៅក្នុងកម្មវិធីរុករករបស់អ្នក ហើយថ្ងៃកំណើត និងឈ្មោះមិនដែលត្រូវបានដាក់ក្នុងតំណចែករំលែកទេ។</li>
  </ul>
  <h2>របៀបដែលយើងសរសេរ និងកែតម្រូវខ្លឹមសារ</h2>
  <p>អត្ថបទពិពណ៌នាជំនឿប្រពៃណីថាជាប្រពៃណី ពន្យល់ពីប្រភពរបស់វា ហើយមិនដែលសន្យាលទ្ធផលទេ។ កន្លែងដែលប្រពៃណីខុសគ្នា ឧទាហរណ៍ពេលដែលឆ្នាំសត្វប្តូរក្នុងប្រតិទិនចិន និងខ្មែរ យើងពន្យល់ទាំងពីរ ជាជាងជ្រើសមួយដោយស្ងាត់ៗ។ ប្រសិនបើអ្នករកឃើញកាលបរិច្ឆេទ លទ្ធផល ឬការបកប្រែខុស សូមប្រាប់យើង ហើយយើងនឹងកែតម្រូវទំព័រនោះ។</p>
  <p>ការវាយតម្លៃជោគជតាប្រចាំថ្ងៃ លេខសំណាង និងកាលបរិច្ឆេទប្រតិទិន មកពីវិធាន និងទិន្នន័យថេរក្នុងកូដរបស់គេហទំព័រ។ ពាក្យពេចន៍នៃជោគជតាប្រចាំថ្ងៃនីមួយៗ ត្រូវបានព្រាងដោយប្រើម៉ូដែល AI (Claude របស់ Anthropic) ហើយចុះផ្សាយតែបន្ទាប់ពីឆ្លងកាត់ការពិនិត្យស្វ័យប្រវត្តិធៀបនឹងវិធានទាំងនោះប៉ុណ្ណោះ។ អត្ថបទផ្សេងទៀតក៏អាចព្រាងដោយមានជំនួយពី AI ដែរ ប៉ុន្តែកាលបរិច្ឆេទ និងការពិតរបស់វា មកពីម៉ាស៊ីនគណនា ឬពីប្រភពដែលបានរាយក្នុងទំព័រ។</p>
  <h2>ភាសា</h2>
  <p>ទំព័រមានជាភាសាអង់គ្លេស ខ្មែរ និងចិនអក្សរកាត់ ដោយមានអាសយដ្ឋានផ្ទាល់ខ្លួន អត្ថបទមួយចំនួន ដូចជាមគ្គុទ្ទេសក៍ភាពសមស្របអាជីវកម្ម មិនទាន់បានបកប្រែគ្រប់ភាសានៅឡើយទេ។ ប្រើប៊ូតុងភាសានៅខាងលើទំព័រណាមួយ។ ទំព័រភាសាខ្មែរមិនមានការផ្សាយពាណិជ្ជកម្មទេ។</p>
""",
"zh": """
  <h2>你可以在这里做什么</h2>
  <ul>
    <li><a href="/checker">生肖查询</a>：根据出生日期查出你的生肖、五行和阴阳，以及你的高棉农历生日。</li>
    <li><a href="/compatibility">配对</a>：比较两个生日；如果不知道生日，也可以直接比较两个生肖。</li>
    <li><a href="/business-partner">商业伙伴</a>和<a href="/wedding-date">婚期</a>：把同样的传统用在合作关系和挑选结婚月份上。</li>
    <li><a href="/animals">十二生肖指南</a>，以及关于<a href="/blog/how-to-calculate-zodiac-sign">如何计算生肖</a>、<a href="/blog/five-elements-explained">五行</a>和<a href="/blog/khmer-lunar-calendar-birth-date">高棉农历</a>的文章。</li>
  </ul>
  <h2>结果是怎样算出来的</h2>
  <ul>
    <li><strong>农历新年分界。</strong>每个计算器都会把你的出生日期与当年真实的农历新年日期比较，日期表涵盖1900年至2060年。我们用一个独立的农历程序库逐一核对了表中的每个日期，没有发现任何差异。</li>
    <li><strong>五行与阴阳</strong>由生肖年份的最后一位数字决定，遵循传统的十天干循环（例如尾数为0或1的年份属金）。</li>
    <li><strong>配对</strong>使用传统的三合、六合与六冲。<a href="/blog/zodiac-compatibility-guide">配对指南</a>解释了每条规则，每个工具也会说明它使用哪些规则。</li>
    <li><strong>高棉农历日期</strong>由开源程序库 <a href="https://github.com/ThyrithSor/momentkh" rel="noopener">momentkh</a> 计算，从不人工估算。</li>
    <li><strong>你的日期只留在你这里。</strong>计算在你的浏览器中进行，生日和姓名从不会放进分享链接。</li>
  </ul>
  <h2>我们如何撰写和更正内容</h2>
  <p>文章把传统信仰作为传统来介绍，说明它们的来历，从不承诺结果。当不同传统说法不一，例如中国和高棉历法中生肖年何时更换，我们会把两种都解释清楚，而不是悄悄只选一种。如果你发现日期、结果或翻译有误，请告诉我们，我们会更正页面。</p>
  <p>每日运势的评分、幸运数字和历法日期都来自网站代码中固定的规则和数据。每天运势的文字由 AI 模型（Anthropic 的 Claude）起草，只有通过与这些规则的自动核对后才会发布。其他文章也可能借助 AI 起草，但其中的日期和事实来自计算工具或页面所列的来源。</p>
  <h2>语言</h2>
  <p>页面提供英文、高棉文和简体中文版本，各有自己的网址；少数文章（例如商业配对指南）尚未翻译成所有语言。可以使用任意页面顶部的语言按钮切换。高棉文页面不展示广告。</p>
""",
}

CONTACT = {
"en": """
  <h2>What to write to us about</h2>
  <ul>
    <li><strong>A result or date that looks wrong.</strong> Tell us the page address and the date you tried, and what you expected to see.</li>
    <li><strong>A translation</strong> in Khmer or Chinese that reads awkwardly or is incorrect.</li>
    <li><strong>Something that doesn't work</strong>, such as a broken link, a button or a layout problem. Your phone or browser name helps.</li>
    <li><strong>An idea</strong> for a guide or a tradition you would like explained.</li>
  </ul>
  <p>Messages you send are handled as described in our <a href="/privacy">Privacy Policy</a>. To learn how the calculators work first, see <a href="/about">About MyBirthSign</a>.</p>
""",
"km": """
  <h2>រឿងដែលអ្នកអាចសរសេរមកយើង</h2>
  <ul>
    <li><strong>លទ្ធផល ឬកាលបរិច្ឆេទដែលហាក់ដូចជាខុស។</strong> សូមប្រាប់យើងពីអាសយដ្ឋានទំព័រ និងថ្ងៃដែលអ្នកបានសាកល្បង ព្រមទាំងអ្វីដែលអ្នករំពឹងថានឹងឃើញ។</li>
    <li><strong>ការបកប្រែ</strong> ជាភាសាខ្មែរ ឬចិន ដែលអានមិនរលូន ឬមិនត្រឹមត្រូវ។</li>
    <li><strong>អ្វីមួយដែលមិនដំណើរការ</strong> ដូចជាតំណខូច ប៊ូតុង ឬបញ្ហាប្លង់។ ឈ្មោះទូរស័ព្ទ ឬកម្មវិធីរុករករបស់អ្នកជួយបានច្រើន។</li>
    <li><strong>គំនិត</strong> សម្រាប់មគ្គុទ្ទេសក៍ ឬប្រពៃណីដែលអ្នកចង់ឱ្យយើងពន្យល់។</li>
  </ul>
  <p>សារដែលអ្នកផ្ញើមក ត្រូវបានគ្រប់គ្រងតាម<a href="/privacy">គោលការណ៍ឯកជនភាព</a>របស់យើង។ ដើម្បីស្វែងយល់ពីរបៀបដែលម៉ាស៊ីនគណនាដំណើរការជាមុន សូមមើល<a href="/about">អំពី MyBirthSign</a>។</p>
""",
"zh": """
  <h2>你可以写信告诉我们什么</h2>
  <ul>
    <li><strong>看起来有误的结果或日期。</strong>请告诉我们页面网址、你试过的日期，以及你原本预期看到的结果。</li>
    <li><strong>高棉文或中文翻译</strong>读起来不通顺或有错误。</li>
    <li><strong>无法正常使用的地方</strong>，例如失效的链接、按钮或版面问题。附上你的手机或浏览器名称会很有帮助。</li>
    <li><strong>想法</strong>：你希望我们写的指南或解释的传统。</li>
  </ul>
  <p>你发送的信息会按照我们的<a href="/privacy">隐私政策</a>处理。想先了解计算器如何运作，请看<a href="/about">关于 MyBirthSign</a>。</p>
""",
}


def patch(rel, parts, anchor):
    p = ROOT / rel
    html = p.read_text(encoding="utf8")
    html = re.sub(re.escape(MK[0]) + r".*?" + re.escape(MK[1]) + r"\n?", "", html, flags=re.S)
    for lang, body in parts.items():
        blk = re.compile(r'(<div data-lang-content="%s">\n<section class="content-section container"[^>]*>.*?)(\n</section>\n</div>)' % lang, re.S)
        m = blk.search(html)
        assert m, (rel, lang)
        inner = m.group(1)
        ins = MK[0] + body + "  " + MK[1]
        a = anchor(lang)
        if a and a in inner:   # before the closing "questions? contact" paragraph
            i = inner.rindex("<p>", 0, inner.index(a))
            inner = inner[:i] + ins + "\n  " + inner[i:]
        else:
            inner = inner + "\n" + ins
        html = html[:m.start()] + inner + m.group(2) + html[m.end():]
    p.write_text(html, encoding="utf8")
    print("updated", rel)


patch("about.html", ABOUT, lambda l: 'href="contact.html"')
patch("contact.html", CONTACT, lambda l: None)
for rel, d in (("about.html", "How MyBirthSign works: the tools, how results are calculated (Lunar New Year table, elements, compatibility rules, Khmer lunar dates), how content is written and corrected."),
               ("contact.html", "Contact MyBirthSign about a wrong date or result, a Khmer or Chinese translation, a broken page, or an idea for a guide.")):
    p = ROOT / rel
    h = p.read_text(encoding="utf8")
    h = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{d}">', h, count=1)
    h = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{d}">', h, count=1)
    p.write_text(h, encoding="utf8")
