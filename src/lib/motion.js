/* ============================================================
   ENDGAME — shared motion helpers.
   Everything here degrades honestly: no IntersectionObserver or
   reduced motion → content is simply visible / final.
   ============================================================ */

export function prefersReduced() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Svelte action: reveal every `.reveal` descendant as it scrolls in. */
export function revealAll(node) {
  const els = node.querySelectorAll('.reveal');
  if (prefersReduced() || typeof IntersectionObserver === 'undefined') {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
  );
  els.forEach((el) => io.observe(el));
  return { destroy: () => io.disconnect() };
}

/**
 * Svelte action: count a number up when it scrolls into view.
 * The final value is server-rendered in the markup (via data-to),
 * so no-JS and reduced-motion readers get the real number.
 */
export function counter(node) {
  const to = parseFloat(node.dataset.to ?? '0');
  const fmt = (v) => Math.round(v).toLocaleString('en-GB');
  if (prefersReduced() || typeof IntersectionObserver === 'undefined') {
    node.textContent = fmt(to);
    return;
  }
  node.textContent = '0';
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const dur = 1400;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        node.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    { threshold: 0.6 }
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}
