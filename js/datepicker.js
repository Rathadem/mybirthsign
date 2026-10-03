// Custom bilingual (EN/Khmer) calendar date-picker.
//
// Native <input type="date"> pickers are rendered entirely by the browser
// (or, on mobile, the OS) and cannot be translated or restyled with CSS/JS —
// they always show in the device's own locale regardless of the page
// language. To let the calendar itself show in Khmer, this script replaces
// every <input type="date"> on the page with a fully custom popup calendar,
// while keeping the original input (hidden) as the single source of truth
// for its value, so all existing form-handling code keeps working unchanged.
//
// The displayed/typed date format is always dd/mm/yyyy (both languages, per
// an earlier site decision); only the calendar's month/weekday names and
// button labels switch with the page language.

(function () {
  "use strict";

  const EN_MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const KM_MONTHS = [
    "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
    "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
  ];
  const EN_WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const KM_WEEKDAYS = ["អា", "ច", "អ", "ពុ", "ព្រ", "សុ", "ស"];

  const STR = {
    en: { clear: "Clear", today: "Today", placeholder: "dd/mm/yyyy" },
    km: { clear: "សម្អាត", today: "ថ្ងៃនេះ", placeholder: "dd/mm/yyyy" }
  };

  function lang() {
    try {
      return typeof getLang === "function" ? getLang() : "en";
    } catch (e) {
      return "en";
    }
  }

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function parseISO(value) {
    if (!value) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!m) return null;
    return { y: parseInt(m[1], 10), m: parseInt(m[2], 10) - 1, d: parseInt(m[3], 10) };
  }

  function toISO(y, m, d) {
    return y + "-" + pad2(m + 1) + "-" + pad2(d);
  }

  function formatDisplay(iso) {
    const p = parseISO(iso);
    if (!p) return "";
    return pad2(p.d) + "/" + pad2(p.m + 1) + "/" + p.y;
  }

  function daysInMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }

  function svgIcon() {
    return (
      '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
      '<rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<line x1="3" y1="9.5" x2="21" y2="9.5" stroke="currentColor" stroke-width="1.6"/>' +
      '<line x1="7.5" y1="3" x2="7.5" y2="6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
      '<line x1="16.5" y1="3" x2="16.5" y2="6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function buildPicker(nativeInput) {
    if (nativeInput.dataset.kdpInit) return;
    nativeInput.dataset.kdpInit = "1";

    const minP = parseISO(nativeInput.getAttribute("min"));
    const maxP = parseISO(nativeInput.getAttribute("max"));
    const minTs = minP ? new Date(minP.y, minP.m, minP.d).getTime() : null;
    const maxTs = maxP ? new Date(maxP.y, maxP.m, maxP.d).getTime() : null;

    const wrap = document.createElement("div");
    wrap.className = "kdp";

    const displayBtn = document.createElement("button");
    displayBtn.type = "button";
    displayBtn.className = "kdp-display";

    const textSpan = document.createElement("span");
    textSpan.className = "kdp-display-text";
    const iconSpan = document.createElement("span");
    iconSpan.className = "kdp-display-icon";
    iconSpan.innerHTML = svgIcon();
    displayBtn.appendChild(textSpan);
    displayBtn.appendChild(iconSpan);

    const popup = document.createElement("div");
    popup.className = "kdp-popup";
    popup.hidden = true;

    const header = document.createElement("div");
    header.className = "kdp-header";
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "kdp-nav kdp-prev";
    prevBtn.setAttribute("aria-label", "Previous month");
    prevBtn.textContent = "‹";
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "kdp-nav kdp-next";
    nextBtn.setAttribute("aria-label", "Next month");
    nextBtn.textContent = "›";

    const monthSel = document.createElement("select");
    monthSel.className = "kdp-month-select";
    const yearSel = document.createElement("select");
    yearSel.className = "kdp-year-select";

    header.appendChild(prevBtn);
    header.appendChild(monthSel);
    header.appendChild(yearSel);
    header.appendChild(nextBtn);

    const weekdayRow = document.createElement("div");
    weekdayRow.className = "kdp-weekdays";

    const grid = document.createElement("div");
    grid.className = "kdp-grid";

    const footer = document.createElement("div");
    footer.className = "kdp-footer";
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "kdp-clear";
    const todayBtn = document.createElement("button");
    todayBtn.type = "button";
    todayBtn.className = "kdp-today";
    footer.appendChild(clearBtn);
    footer.appendChild(todayBtn);

    popup.appendChild(header);
    popup.appendChild(weekdayRow);
    popup.appendChild(grid);
    popup.appendChild(footer);

    wrap.appendChild(displayBtn);
    wrap.appendChild(popup);

    nativeInput.parentNode.insertBefore(wrap, nativeInput);
    wrap.insertBefore(nativeInput, popup);
    nativeInput.classList.add("kdp-native");

    const now = new Date();
    let viewY = now.getFullYear();
    let viewM = now.getMonth();

    function initialYearRange() {
      const lo = minP ? minP.y : now.getFullYear() - 100;
      const hi = maxP ? maxP.y : now.getFullYear();
      return { lo: lo, hi: hi };
    }
    const yearRange = initialYearRange();

    function syncFromValue() {
      const p = parseISO(nativeInput.value);
      if (p) {
        viewY = p.y;
        viewM = p.m;
      }
    }
    syncFromValue();

    function withinRange(ts) {
      if (minTs !== null && ts < minTs) return false;
      if (maxTs !== null && ts > maxTs) return false;
      return true;
    }

    function renderLabels() {
      const L = lang();
      const months = L === "km" ? KM_MONTHS : EN_MONTHS;
      const weekdays = L === "km" ? KM_WEEKDAYS : EN_WEEKDAYS;
      const s = STR[L] || STR.en;

      monthSel.innerHTML = "";
      months.forEach(function (name, idx) {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = name;
        monthSel.appendChild(opt);
      });

      yearSel.innerHTML = "";
      for (let y = yearRange.hi; y >= yearRange.lo; y--) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSel.appendChild(opt);
      }

      weekdayRow.innerHTML = "";
      weekdays.forEach(function (wd) {
        const el = document.createElement("span");
        el.textContent = wd;
        weekdayRow.appendChild(el);
      });

      clearBtn.textContent = s.clear;
      todayBtn.textContent = s.today;
      if (!nativeInput.value) {
        textSpan.textContent = "";
        textSpan.dataset.placeholder = s.placeholder;
      }
      wrap.classList.toggle("kdp-empty", !nativeInput.value);
      if (!nativeInput.value) {
        displayBtn.setAttribute("aria-label", s.placeholder);
      }
    }

    function renderGrid() {
      monthSel.value = String(viewM);
      if (viewY < yearRange.lo) yearRange.lo = viewY;
      if (viewY > yearRange.hi) yearRange.hi = viewY;
      if (yearSel.children.length === 0 || parseInt(yearSel.firstChild.value, 10) !== yearRange.hi) {
        renderLabels();
      }
      yearSel.value = String(viewY);

      grid.innerHTML = "";
      const firstDow = new Date(viewY, viewM, 1).getDay();
      const total = daysInMonth(viewY, viewM);
      const selected = parseISO(nativeInput.value);

      for (let i = 0; i < firstDow; i++) {
        const blank = document.createElement("span");
        blank.className = "kdp-day kdp-day-blank";
        grid.appendChild(blank);
      }
      for (let d = 1; d <= total; d++) {
        const ts = new Date(viewY, viewM, d).getTime();
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "kdp-day";
        btn.textContent = d;
        if (!withinRange(ts)) {
          btn.disabled = true;
          btn.classList.add("kdp-day-disabled");
        }
        if (
          selected &&
          selected.y === viewY &&
          selected.m === viewM &&
          selected.d === d
        ) {
          btn.classList.add("kdp-day-selected");
        }
        if (
          now.getFullYear() === viewY &&
          now.getMonth() === viewM &&
          now.getDate() === d
        ) {
          btn.classList.add("kdp-day-today");
        }
        btn.addEventListener("click", function () {
          selectDate(viewY, viewM, d);
        });
        grid.appendChild(btn);
      }
    }

    function selectDate(y, m, d) {
      nativeInput.value = toISO(y, m, d);
      nativeInput.dispatchEvent(new Event("input", { bubbles: true }));
      nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
      textSpan.textContent = formatDisplay(nativeInput.value);
      wrap.classList.remove("kdp-empty");
      closePopup();
      renderGrid();
    }

    function openPopup() {
      syncFromValue();
      renderLabels();
      renderGrid();
      popup.hidden = false;
      wrap.classList.add("kdp-open");
    }
    function closePopup() {
      popup.hidden = true;
      wrap.classList.remove("kdp-open");
    }
    function togglePopup() {
      if (popup.hidden) openPopup();
      else closePopup();
    }

    displayBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      togglePopup();
    });
    prevBtn.addEventListener("click", function () {
      viewM -= 1;
      if (viewM < 0) {
        viewM = 11;
        viewY -= 1;
      }
      renderGrid();
    });
    nextBtn.addEventListener("click", function () {
      viewM += 1;
      if (viewM > 11) {
        viewM = 0;
        viewY += 1;
      }
      renderGrid();
    });
    monthSel.addEventListener("change", function () {
      viewM = parseInt(monthSel.value, 10);
      renderGrid();
    });
    yearSel.addEventListener("change", function () {
      viewY = parseInt(yearSel.value, 10);
      renderGrid();
    });
    clearBtn.addEventListener("click", function () {
      nativeInput.value = "";
      nativeInput.dispatchEvent(new Event("input", { bubbles: true }));
      nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
      textSpan.textContent = "";
      wrap.classList.add("kdp-empty");
      closePopup();
    });
    todayBtn.addEventListener("click", function () {
      const ts = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      if (!withinRange(ts)) return;
      viewY = now.getFullYear();
      viewM = now.getMonth();
      selectDate(viewY, viewM, now.getDate());
    });
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) closePopup();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePopup();
    });

    renderLabels();
    if (nativeInput.value) {
      textSpan.textContent = formatDisplay(nativeInput.value);
    } else {
      wrap.classList.add("kdp-empty");
    }
  }

  function init() {
    document.querySelectorAll('input[type="date"]').forEach(buildPicker);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
