#!/usr/bin/env python3
"""Builds terms.html (Terms of Use, EN/KM/ZH) and 404.html (not-found page) from privacy.html's head, header and footer.
Nothing here describes a company, address or service the site does not have; the terms only restate how the site works."""
import re
R = "/home/claude/mybirthsign/"
src = open(R + "privacy.html").read()
head, rest = src.split('<div data-lang-content="en">', 1)
foot = rest[rest.index('<footer class="site-footer">'):]

T = {
 "en": ("Terms of Use", "Last updated: October 18, 2026", [
  ("Using this site", "By using mybirthsign.com you agree to these terms. If you do not agree, please do not use the site."),
  ("Entertainment and cultural information", "The zodiac readings, daily fortunes, compatibility results, lucky numbers and wedding-date suggestions follow traditional Chinese zodiac ideas. They are offered for entertainment, cultural interest and self-reflection. They are not predictions, and they are not medical, legal, financial or other professional advice. Lucky numbers are for fun only and are not betting advice."),
  ("Calendar information", "Khmer lunar dates, holy days and festival days are calculated with traditional Khmer calendar rules. Official public holidays are set each year by the Royal Government of Cambodia. Please check official announcements, or ask your pagoda, before planning travel or ceremonies."),
  ("Your use of the site", "You may use the site for personal, non-commercial purposes and share links to its pages. Please do not try to disrupt the site, copy it in bulk, or use it in a way that breaks the law."),
  ("Content", "The text, images and design of MyBirthSign belong to MyBirthSign unless a page says otherwise. Sources we quote or link to belong to their owners."),
  ("Advertising and links to other sites", "Pages in English and Chinese may show ads served by Google AdSense. Links to other websites are provided for convenience; we are not responsible for their content or their privacy practices."),
  ("No guarantees", "We work to keep the information accurate, but the site is provided as it is, without guarantees of any kind, and we are not liable for decisions made using it."),
  ("Privacy", 'How the site handles information is explained in our <a href="/privacy">Privacy Policy</a>.'),
  ("Changes and contact", 'We may update these terms; the date at the top shows the latest version. Questions are welcome through our <a href="/contact">contact page</a>.')]),
 "km": ("លក្ខខណ្ឌប្រើប្រាស់", "កំណែថ្មីចុងក្រោយ៖ ថ្ងៃទី18 ខែតុលា ឆ្នាំ2026", [
  ("ការប្រើប្រាស់គេហទំព័រនេះ", "ការប្រើប្រាស់ mybirthsign.com មានន័យថាអ្នកយល់ព្រមនឹងលក្ខខណ្ឌទាំងនេះ។ ប្រសិនបើអ្នកមិនយល់ព្រម សូមកុំប្រើគេហទំព័រនេះ។"),
  ("ព័ត៌មានសម្រាប់ការកម្សាន្ត និងវប្បធម៌", "ការអានរាសី ជោគជតាប្រចាំថ្ងៃ លទ្ធផលភាពត្រូវគ្នា លេខសំណាង និងការណែនាំថ្ងៃរៀបការ ផ្អែកលើគំនិតរាសីចិនតាមប្រពៃណី។ វាសម្រាប់ការកម្សាន្ត ចំណេះដឹងវប្បធម៌ និងការឆ្លុះបញ្ចាំងខ្លួន។ វាមិនមែនជាការព្យាករណ៍ ហើយក៏មិនមែនជាដំបូន្មានវេជ្ជសាស្ត្រ ច្បាប់ ហិរញ្ញវត្ថុ ឬវិជ្ជាជីវៈផ្សេងទៀតដែរ។ លេខសំណាងសម្រាប់ការកម្សាន្តប៉ុណ្ណោះ មិនមែនជាការណែនាំឱ្យភ្នាល់ទេ។"),
  ("ព័ត៌មានប្រតិទិន", "ថ្ងៃខែចន្ទគតិខ្មែរ ថ្ងៃសីល និងថ្ងៃបុណ្យ ត្រូវបានគណនាតាមវិធានប្រតិទិនខ្មែរបែបប្រពៃណី។ ថ្ងៃឈប់សម្រាកផ្លូវការ ត្រូវបានកំណត់រៀងរាល់ឆ្នាំដោយរាជរដ្ឋាភិបាលកម្ពុជា។ សូមពិនិត្យសេចក្តីប្រកាសផ្លូវការ ឬសួរវត្តរបស់អ្នក មុនរៀបចំការធ្វើដំណើរ ឬពិធីបុណ្យ។"),
  ("ការប្រើប្រាស់របស់អ្នក", "អ្នកអាចប្រើគេហទំព័រនេះសម្រាប់គោលបំណងផ្ទាល់ខ្លួន មិនមែនពាណិជ្ជកម្ម ហើយអាចចែករំលែកតំណភ្ជាប់ទៅទំព័ររបស់វា។ សូមកុំព្យាយាមរំខានគេហទំព័រ ចម្លងវាជាបរិមាណច្រើន ឬប្រើវាតាមរបៀបដែលល្មើសច្បាប់។"),
  ("មាតិកា", "អត្ថបទ រូបភាព និងការរចនារបស់ MyBirthSign ជាកម្មសិទ្ធិរបស់ MyBirthSign លើកលែងតែទំព័រណាមួយបញ្ជាក់ផ្សេង។ ប្រភពដែលយើងដកស្រង់ ឬភ្ជាប់ទៅ ជាកម្មសិទ្ធិរបស់ម្ចាស់វា។"),
  ("ការផ្សាយពាណិជ្ជកម្ម និងតំណភ្ជាប់ទៅគេហទំព័រផ្សេង", "ទំព័រភាសាអង់គ្លេស និងភាសាចិន អាចបង្ហាញការផ្សាយពាណិជ្ជកម្មពី Google AdSense។ ទំព័រភាសាខ្មែរមិនបង្ហាញការផ្សាយពាណិជ្ជកម្មទេ។ តំណភ្ជាប់ទៅគេហទំព័រផ្សេង គឺសម្រាប់ភាពងាយស្រួល យើងមិនទទួលខុសត្រូវចំពោះមាតិកា ឬការអនុវត្តឯកជនភាពរបស់ពួកគេទេ។"),
  ("គ្មានការធានា", "យើងខិតខំរក្សាព័ត៌មានឱ្យត្រឹមត្រូវ ប៉ុន្តែគេហទំព័រនេះផ្តល់ជូនតាមស្ថានភាពជាក់ស្តែង ដោយគ្មានការធានាណាមួយ ហើយយើងមិនទទួលខុសត្រូវចំពោះការសម្រេចចិត្តដែលធ្វើឡើងដោយប្រើវាទេ។"),
  ("ឯកជនភាព", 'របៀបដែលគេហទំព័រដោះស្រាយព័ត៌មាន ត្រូវបានពន្យល់នៅក្នុង<a href="/privacy">គោលការណ៍ឯកជនភាព</a>របស់យើង។'),
  ("ការផ្លាស់ប្តូរ និងទំនាក់ទំនង", 'យើងអាចធ្វើបច្ចុប្បន្នភាពលក្ខខណ្ឌទាំងនេះ កាលបរិច្ឆេទនៅខាងលើបង្ហាញកំណែចុងក្រោយ។ សំណួរនានា សូមផ្ញើតាម<a href="/contact">ទំព័រទំនាក់ទំនង</a>របស់យើង។')]),
 "zh": ("使用条款", "最后更新：2026年10月18日", [
  ("使用本网站", "使用 mybirthsign.com 即表示你同意这些条款。如果你不同意，请不要使用本网站。"),
  ("娱乐与文化信息", "生肖解读、每日运势、配对结果、幸运数字和结婚日期建议都依据传统中国生肖观念，仅供娱乐、文化兴趣和自我反思。它们不是预测，也不是医疗、法律、财务或其他专业建议。幸运数字仅供娱乐，不是投注建议。"),
  ("历法信息", "高棉农历日期、斋日和节日按传统高棉历法规则计算。官方公共假期由柬埔寨王国政府每年确定。安排出行或仪式前，请查看官方公告或询问你的寺院。"),
  ("你的使用", "你可以出于个人、非商业目的使用本网站，并分享其页面链接。请不要试图干扰网站、大量复制网站内容，或以违法的方式使用网站。"),
  ("内容", "除页面另有说明外，MyBirthSign 的文字、图片和设计归 MyBirthSign 所有。我们引用或链接的来源归其各自所有者所有。"),
  ("广告与外部链接", "英文和中文页面可能展示 Google AdSense 投放的广告，高棉语页面不展示广告。指向其他网站的链接仅为方便而提供，我们不对其内容或隐私做法负责。"),
  ("不作保证", "我们努力保持信息准确，但本网站按现状提供，不作任何形式的保证，我们也不对使用本网站所作的决定承担责任。"),
  ("隐私", '本网站如何处理信息，请见我们的<a href="/privacy">隐私政策</a>。'),
  ("变更与联系", '我们可能更新这些条款，顶部日期显示最新版本。如有问题，欢迎通过<a href="/contact">联系页面</a>与我们联系。')]),
}

def set_head(h, title, desc, path, noindex=False):
    h = re.sub(r"<title>.*?</title>", f"<title>{title} | MyBirthSign</title>", h, flags=re.S)
    h = h.replace("https://mybirthsign.com/privacy", "https://mybirthsign.com/" + path)
    h = re.sub(r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + title + " | MyBirthSign", h)
    h = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + desc, h)
    h = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + desc, h)
    if noindex: h = h.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="robots" content="noindex, follow">')
    return h

blocks = []
for l, (title, upd, secs) in T.items():
    body = "".join(f"\n  <h3>{h}</h3>\n  <p>{p}</p>" for h, p in secs)
    blocks.append(f'<div data-lang-content="{l}">\n<section class="content-section container" style="margin-top: 40px;">\n  <h1>{title}</h1>\n  <p><em>{upd}</em></p>{body}\n</section>\n</div>\n')
open(R + "terms.html", "w").write(set_head(head, "Terms of Use", "Terms of use for MyBirthSign: entertainment and cultural information, calendar information, advertising, content and contact.", "terms") + "".join(blocks) + "\n" + foot)

# ---- 404: absolute links so it works at any address
N = {
 "en": ("Page not found", "The page you were looking for isn't here. It may have moved, or the address may have a typo.", [("/", "Home"), ("/checker", "Zodiac Checker"), ("/blog", "Blog"), ("/khmer-calendar.html", "Khmer Calendar")]),
 "km": ("រកមិនឃើញទំព័រ", "ទំព័រដែលអ្នកកំពុងស្វែងរកមិននៅទីនេះទេ។ វាអាចត្រូវបានផ្លាស់ទី ឬអាសយដ្ឋានអាចសរសេរខុស។", [("/", "ទំព័រដើម"), ("/checker", "ពិនិត្យរាសី"), ("/blog", "ប្លុក"), ("/khmer-calendar.html", "ប្រតិទិនខ្មែរ")]),
 "zh": ("找不到页面", "你要找的页面不在这里。它可能已经移动，或者网址有误。", [("/", "首页"), ("/checker", "生肖查询"), ("/blog", "博客"), ("/khmer-calendar.html", "高棉日历")]),
}
blocks = []
for l, (h1, p, links) in N.items():
    ls = " · ".join(f'<a href="{u}">{t}</a>' for u, t in links)
    blocks.append(f'<div data-lang-content="{l}">\n<section class="content-section container" style="margin-top: 60px; margin-bottom: 60px; text-align: center;">\n  <h1>{h1}</h1>\n  <p>{p}</p>\n  <p>{ls}</p>\n</section>\n</div>\n')
h4 = set_head(head, "Page not found", "This page could not be found on MyBirthSign.", "404", noindex=True)
h4 = re.sub(r'<link rel="canonical"[^>]*>\n?', "", h4).replace('<meta property="og:url" content="https://mybirthsign.com/404">\n', "")
page = h4 + "".join(blocks) + "\n" + foot
page = re.sub(r"\s*<!-- Google AdSense -->\s*<script[^>]*adsbygoogle[^>]*></script>", "", page)   # no ads on an error page (AdSense policy)
# relative asset and menu links would break at deep addresses: make them absolute
page = re.sub(r'(href|src)="(?!https?:|/|#|mailto:)([^"]+)"', r'\1="/\2"', page)
open(R + "404.html", "w").write(page)
print("wrote terms.html, 404.html")
