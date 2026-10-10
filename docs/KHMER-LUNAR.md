# Khmer Lunar Birth Date (Checker)

The "Your Khmer Lunar Birth Date" card on `/checker` shows the visitor's birthday on the Khmer lunisolar calendar.

## Files
- `js/khmer-lunar.js`: the card (English and Khmer). It runs when `js/app.js` fires `mbs:checker-date` after a result. The birth date stays on the page and is never put in a link.
- `js/vendor/momentkh.min.js`: the calendar library, loaded only after a result is shown (16 KB).
- `js/vendor/momentkh.LICENSE.txt`: the library's MIT license.
- `checker.html`: the `#khmer-lunar` section, the first card under the birthday form (above Dream Fortune and the zodiac results), plus the script tag. After a check, the page scrolls to it.
- `css/style.css`: the `.kl-*` styles at the end of the file.
- `js/app.js`: two added lines that send the date to the card. The zodiac result HTML is unchanged, byte for byte.
- `tests/khmer-lunar-test.mjs`: the reference-date tests. Run with `node tests/khmer-lunar-test.mjs`; add `--cross` for the 1900–2100 cross-check.

## Calculation method
- **Library:** [momentkh](https://github.com/ThyrithSor/momentkh) 3.0.3 by Thyrith Sor (MIT).
- **Rules:** it implements the traditional Khmer calendar rules (Chhankitek / Soryatra). Months have 29 or 30 days. Some years have a leap month (អធិកមាស): Asadh is repeated as បឋមាសាឍ and ទុតិយាសាឍ. Some years have a leap day (ចន្ទ្រាធិមាស). Khmer New Year comes from Moha Songkran.
- **Not used:** no Chinese-zodiac rules and no astronomical moon phases.
- **Our copy:** the only change to the minified file is that it sets a single global, `window.momentkh`.
- **Range:** the card shows a date only for 1900–2100. Outside that range it shows a fallback message.

## Validation (October 2026)
**Official Cambodian public holidays.** These are fixed by the Khmer lunar calendar. All 44 checks pass.
- **Visak Bochea** (15 កើត ពិសាខ), 2016–2026: [calendarific](https://calendarific.com/holiday/cambodia/visak-bochea-day), [timeanddate](https://timeanddate.com/holidays/cambodia/visak-bochea-day) (2020–2025), [officeholidays](https://www.officeholidays.com/holidays/cambodia/buddha-purnima) (2023–2025).
- **Pchum Ben**, first day (14 រោច ភទ្របទ), 2016–2025: [calendarific](https://calendarific.com/holiday/cambodia/pchum-ben-day).
- **Water Festival**, first day (14 កើត កត្តិក), 2015–2025: [calendarific](https://calendarific.com/holiday/cambodia/water-festival-ceremony).
- **2026 calendar** (Sub-Decree No. 167, 18 Sept 2025): Khmer New Year 14–16 April; Visak Bochea 1 May; Royal Ploughing 5 May (4 រោច ពិសាខ); Pchum Ben 10–12 Oct; Water Festival 23–25 Nov. Sources: [Andersen Cambodia](https://kh.andersen.com/publications/cambodia-sets-official-2026-public-holiday-schedule/), [PPCBank](https://www.ppcbank.com.kh/cambodia-public-holidays-2026/).
- **Water Festival 2010:** the last day was 22 Nov 2010, the day of the Koh Pich stampede ([Channel 4](https://channel4.com/news/at-least-339-people-killed-in-cambodia-stampede)). It falls on 1 រោច កត្តិក, as expected.
- **Leap-month years** 2018, 2023 and 2026 are covered through their Pchum Ben dates. Each comes 384 days after the previous year's.

**Notes on sources**
- calendarific's dates for 2010–2015 look like placeholders (the same day every year), so they are not used.
- For 2026, timeanddate (22 May) and officeholidays (4 May) disagree with the official sub-decree (1 May). The sub-decree is used.

**Cross-check, every day from 1900 to 2100 (73,414 days)**
- Our minified copy matches the npm original on every day.
- It matches a second library, [khmercal](https://www.npmjs.com/package/khmercal) by Seanghay Yath, on 73,381 days. The 33 that differ are 30 Nov 1970 – 1 Jan 1971, where khmercal counts its days backwards (a bug in khmercal).

## Known limits (shown to visitors as notes)
- **Buddhist Era change day:** the library starts the new BE year on 1 រោច ពិសាខ, the day after Visak Bochea. I could not confirm this exact day from a source, so a birthday on Visak Bochea shows both possible BE years.
- **Moha Songkran:** the new animal year begins at a set hour on the first day of Khmer New Year. We don't know the birth time, so a birthday on that day gets a note saying it depends on the time of birth.
- **Before Khmer New Year:** the Khmer animal year changes at Khmer New Year (mid-April). For birthdays from January to April it can differ from the Chinese zodiac sign, and the card says so.
- **Before 2015:** only the 2010 Water Festival was checked against a published date. Earlier years rely on the traditional rules and the two-library cross-check.

## Other pages (added Oct 2026)
- **Every page:** the footer shows today's Khmer lunar date (Cambodia time). `js/daily-favicon.js`, which every page already loads, adds `js/khmer-lunar.js` after the page has loaded, so it doesn't affect page speed.
- **Compatibility and Business Partner:** a "Khmer lunar birth dates" box in the result, one line per person (`klPairHtml` in `js/compat-page.js` and `js/business-calculator.js`).
- **Wedding Date:** each recommended Saturday also shows its Khmer lunar day (`data-kl-iso` in `js/wedding.js`).
- **Same method and range:** these use the same library and the same 1900–2100 range. Outside it, they say the date isn't available.
