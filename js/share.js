// Reusable "Share" button + popover, used on every result card and every
// blog post. Two entry points:
//   - shareRowHtml(title) returns markup to drop into a template string
//     (used by app.js, wedding.js, business-calculator.js for results).
//   - wireShareRows(root) finds any unwired ".share-row" under `root`
//     (default: whole document) and wires up its button + popover. Static
//     placeholders in blog posts are wired on page load; dynamically
//     injected result cards are wired right after their innerHTML is set.
//     A ".share-row" with no data-share-title falls back to the nearest
//     <article>'s <h1>, then to the page title.
//
// Facebook and Telegram support a real "share this link" web intent, so
// those open a share dialog directly. Instagram and TikTok have no public
// web intent for sharing an arbitrary link, so those copy the link to the
// clipboard and open the app/site instead, so the person can paste it in.

const _SHARE_NETWORKS = [
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    icon: '<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>'
  },
  {
    id: "telegram",
    label: "Telegram",
    color: "#29A9EB",
    icon: '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>'
  },
  {
    id: "tiktok",
    label: "TikTok",
    color: "#25F4EE",
    copyOnly: true,
    appUrl: "https://www.tiktok.com/",
    icon: '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "#E1306C",
    copyOnly: true,
    appUrl: "https://www.instagram.com/",
    icon: '<path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>'
  }
];

function _brandIconHtml(net) {
  return (
    '<svg class="share-net-icon" width="18" height="18" viewBox="0 0 24 24" fill="' + net.color + '" aria-hidden="true">' +
      net.icon +
    '</svg>'
  );
}

function _copyIconHtml() {
  return (
    '<svg class="share-net-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M10.5 13.5 13.5 10.5"></path>' +
      '<path d="M8 15.5a3.2 3.2 0 0 1 0-4.5l2-2a3.2 3.2 0 0 1 4.5 4.5"></path>' +
      '<path d="M16 8.5a3.2 3.2 0 0 1 0 4.5l-2 2a3.2 3.2 0 0 1-4.5-4.5"></path>' +
    '</svg>'
  );
}

function _shareInnerHtml() {
  const options = _SHARE_NETWORKS.map(function (net) {
    return (
      '<button type="button" class="share-option" data-share-net="' + net.id + '">' +
        _brandIconHtml(net) +
        '<span class="share-option-label">' + net.label + '</span>' +
      '</button>'
    );
  }).join("");

  return (
    '<button type="button" class="share-btn" aria-haspopup="true" aria-expanded="false">' +
      '<svg class="share-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>' +
        '<line x1="8.6" y1="10.6" x2="15.4" y2="6.4"></line><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"></line>' +
      '</svg>' +
      '<span class="share-btn-label"></span>' +
    '</button>' +
    '<div class="share-popover" hidden>' +
      options +
      '<button type="button" class="share-option share-copy">' +
        _copyIconHtml() +
        '<span class="share-option-label share-copy-label"></span>' +
      '</button>' +
    '</div>'
  );
}

function shareRowHtml(title) {
  const safeTitle = title ? String(title).replace(/"/g, "&quot;") : "";
  return '<div class="share-row" data-share-title="' + safeTitle + '">' + _shareInnerHtml() + '</div>';
}

let _shareOutsideClickWired = false;
function _ensureShareOutsideClickHandler() {
  if (_shareOutsideClickWired) return;
  _shareOutsideClickWired = true;
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".share-row").forEach(function (row) {
      if (row.contains(e.target)) return;
      const pop = row.querySelector(".share-popover");
      const btn = row.querySelector(".share-btn");
      if (pop && !pop.hidden) {
        pop.hidden = true;
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function _copyToClipboard(text) {
  function fallbackCopy() {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* best effort */ }
    document.body.removeChild(ta);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
}

function wireShareRows(root) {
  const scope = root || document;
  const lang = (typeof getLang === "function") ? getLang() : "en";
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};
  const shareLabel = S.share_button || "Share";
  const copyLabel = S.share_copy_link || "Copy link";
  const copiedLabel = S.share_copied || "Link copied!";
  const pasteTpl = S.share_paste_note_tpl || "Link copied — paste it in {network}";

  scope.querySelectorAll(".share-row:not([data-share-wired])").forEach(function (row) {
    row.setAttribute("data-share-wired", "true");

    if (!row.querySelector(".share-btn")) {
      row.innerHTML = _shareInnerHtml();
    }

    let title = row.getAttribute("data-share-title");
    if (!title) {
      const article = row.closest("article");
      const h1 = article && article.querySelector("h1");
      title = (h1 && h1.textContent.trim()) || document.title;
    }
    const url = window.location.href.split("#")[0];
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const btn = row.querySelector(".share-btn");
    const label = row.querySelector(".share-btn-label");
    const pop = row.querySelector(".share-popover");
    const copyBtn = row.querySelector(".share-copy");
    const copyLabelEl = copyBtn && copyBtn.querySelector(".share-copy-label");
    if (label) label.textContent = shareLabel;
    if (copyLabelEl) copyLabelEl.textContent = copyLabel;

    function openPopover() {
      document.querySelectorAll(".share-popover").forEach(function (p) { p.hidden = true; });
      pop.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }

    function togglePopover() {
      const isOpen = !pop.hidden;
      document.querySelectorAll(".share-popover").forEach(function (p) { p.hidden = true; });
      pop.hidden = isOpen;
      btn.setAttribute("aria-expanded", String(!isOpen));
    }

    if (btn && pop) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (navigator.share) {
          // navigator.share() can fail two different ways when the page is
          // embedded somewhere that blocks the Web Share API via
          // Permissions-Policy (e.g. a sandboxed preview iframe): it can
          // throw *synchronously*, or it can return a promise that *rejects
          // asynchronously* with no visible share sheet ever appearing.
          // Either way, without handling both cases the button just looks
          // like it does nothing — so fall back to the manual popover both
          // times, unless the rejection was the user deliberately cancelling
          // the native share sheet (AbortError).
          try {
            const sharePromise = navigator.share({ title: title, url: url });
            if (sharePromise && typeof sharePromise.catch === "function") {
              sharePromise.catch(function (err) {
                if (err && err.name === "AbortError") return;
                openPopover();
              });
            }
            return;
          } catch (err) {
            openPopover();
            return;
          }
        }
        togglePopover();
      });
    }

    row.querySelectorAll("[data-share-net]").forEach(function (optBtn) {
      const netId = optBtn.getAttribute("data-share-net");
      const net = _SHARE_NETWORKS.filter(function (n) { return n.id === netId; })[0];
      if (!net) return;

      optBtn.addEventListener("click", function () {
        if (net.id === "facebook") {
          window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl, "_blank", "noopener");
          return;
        }
        if (net.id === "telegram") {
          window.open("https://t.me/share/url?url=" + encodedUrl + "&text=" + encodedTitle, "_blank", "noopener");
          return;
        }
        if (net.copyOnly) {
          // No public web intent exists for sharing an arbitrary link
          // straight into Instagram or TikTok, so copy the link and open
          // the app/site so the person can paste it themselves.
          _copyToClipboard(url);
          const labelEl = optBtn.querySelector(".share-option-label");
          const original = labelEl ? labelEl.textContent : "";
          if (labelEl) labelEl.textContent = pasteTpl.replace("{network}", net.label);
          window.open(net.appUrl, "_blank", "noopener");
          setTimeout(function () {
            if (labelEl) labelEl.textContent = original;
            pop.hidden = true;
            btn.setAttribute("aria-expanded", "false");
          }, 2200);
        }
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        _copyToClipboard(url);
        if (copyLabelEl) copyLabelEl.textContent = copiedLabel;
        setTimeout(function () {
          if (copyLabelEl) copyLabelEl.textContent = copyLabel;
        }, 1800);
      });
    }
  });

  _ensureShareOutsideClickHandler();
}

document.addEventListener("DOMContentLoaded", function () {
  wireShareRows(document);
});
