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

function _shareInnerHtml() {
  return (
    '<button type="button" class="share-btn" aria-haspopup="true" aria-expanded="false">' +
      '<svg class="share-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>' +
        '<line x1="8.6" y1="10.6" x2="15.4" y2="6.4"></line><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"></line>' +
      '</svg>' +
      '<span class="share-btn-label"></span>' +
    '</button>' +
    '<div class="share-popover" hidden>' +
      '<a class="share-option" data-share-net="facebook" target="_blank" rel="noopener">Facebook</a>' +
      '<a class="share-option" data-share-net="twitter" target="_blank" rel="noopener">X (Twitter)</a>' +
      '<a class="share-option" data-share-net="telegram" target="_blank" rel="noopener">Telegram</a>' +
      '<a class="share-option" data-share-net="whatsapp" target="_blank" rel="noopener">WhatsApp</a>' +
      '<button type="button" class="share-option share-copy"></button>' +
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

function wireShareRows(root) {
  const scope = root || document;
  const lang = (typeof getLang === "function") ? getLang() : "en";
  const S = (typeof UI_STRINGS !== "undefined" && UI_STRINGS[lang]) || {};
  const shareLabel = S.share_button || "Share";
  const copyLabel = S.share_copy_link || "Copy link";
  const copiedLabel = S.share_copied || "Link copied!";

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

    const btn = row.querySelector(".share-btn");
    const label = row.querySelector(".share-btn-label");
    const pop = row.querySelector(".share-popover");
    const copyBtn = row.querySelector(".share-copy");
    if (label) label.textContent = shareLabel;
    if (copyBtn) copyBtn.textContent = copyLabel;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const links = {
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl,
      twitter: "https://twitter.com/intent/tweet?text=" + encodedTitle + "&url=" + encodedUrl,
      telegram: "https://t.me/share/url?url=" + encodedUrl + "&text=" + encodedTitle,
      whatsapp: "https://wa.me/?text=" + encodedTitle + "%20" + encodedUrl
    };
    row.querySelectorAll("[data-share-net]").forEach(function (a) {
      a.href = links[a.getAttribute("data-share-net")];
    });

    if (btn && pop) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (navigator.share) {
          // navigator.share() can throw *synchronously* (not just reject its
          // promise) when the page is embedded somewhere that blocks the Web
          // Share API via Permissions-Policy (e.g. a sandboxed preview
          // iframe). Without this try/catch that exception would abort the
          // click handler entirely, so the button would look like it does
          // nothing. Fall back to the popover instead.
          try {
            const sharePromise = navigator.share({ title: title, url: url });
            if (sharePromise && typeof sharePromise.catch === "function") {
              sharePromise.catch(function () { /* user cancelled or it failed silently */ });
            }
            return;
          } catch (err) {
            // fall through to the manual popover below
          }
        }
        const isOpen = !pop.hidden;
        document.querySelectorAll(".share-popover").forEach(function (p) { p.hidden = true; });
        pop.hidden = isOpen;
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        function fallbackCopy() {
          const ta = document.createElement("textarea");
          ta.value = url;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); } catch (e) { /* best effort */ }
          document.body.removeChild(ta);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).catch(fallbackCopy);
        } else {
          fallbackCopy();
        }
        copyBtn.textContent = copiedLabel;
        setTimeout(function () { copyBtn.textContent = copyLabel; }, 1800);
      });
    }
  });

  _ensureShareOutsideClickHandler();
}

document.addEventListener("DOMContentLoaded", function () {
  wireShareRows(document);
});
