/* Accessible horizontal card carousel for Popular Guides in EN/KM/ZH. */
(() => {
  "use strict";
  const init = () => {
    document.querySelectorAll(".page-blog .bv2-guides-slider").forEach((section) => {
      const track = section.querySelector("[data-guide-track]");
      const prev = section.querySelector('[data-guide-slide="prev"]');
      const next = section.querySelector('[data-guide-slide="next"]');
      if (!track || !prev || !next || track.dataset.guideCarouselReady === "true") return;
      track.dataset.guideCarouselReady = "true";
      const update = () => {
        const max = Math.max(0, track.scrollWidth - track.clientWidth);
        prev.disabled = track.scrollLeft <= 3;
        next.disabled = track.scrollLeft >= max - 3;
      };
      const scrollOne = (direction) => {
        const card = track.querySelector(".bv2-guide-card");
        const style = window.getComputedStyle(track);
        const gap = Number.parseFloat(style.columnGap || style.gap) || 16;
        const amount = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        track.scrollBy({ left: direction * amount, behavior });
      };
      prev.addEventListener("click", () => scrollOne(-1));
      next.addEventListener("click", () => scrollOne(1));
      track.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });
      update();
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
