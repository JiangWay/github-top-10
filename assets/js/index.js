/* Index page: filter + sort the embedded article list. */

(() => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const dataEl = $("#idxData");
  if (!dataEl) return;
  let ENTRIES = [];
  try { ENTRIES = JSON.parse(dataEl.textContent) || []; }
  catch (_) { ENTRIES = []; }

  const state = { filter: "all", sort: "date" };

  const sectionsEl = $("#idxSections");
  const statTotal = $("#statTotal");
  const statDaily = $("#statDaily");
  const statResearch = $("#statResearch");
  if (statTotal) statTotal.textContent = ENTRIES.length;
  if (statDaily) statDaily.textContent = ENTRIES.filter(e => e.kind === "post").length;
  if (statResearch) statResearch.textContent = ENTRIES.filter(e => e.kind === "research").length;

  function sortEntries(list) {
    const arr = list.slice();
    if (state.sort === "stars") arr.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    else if (state.sort === "title") arr.sort((a, b) => a.title.localeCompare(b.title, "zh-Hant"));
    else arr.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return arr;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cardHtml(e) {
    const kindLabel = e.kind === "post" ? "每日觀察" : "深入研究";
    const titleHtml = e.kind === "research"
      ? `<span class="mono">${escapeHtml(e.title)}</span>`
      : escapeHtml(e.title);

    const footBits = [];
    if (e.date) footBits.push(`<span class="fv">${escapeHtml(e.date)}</span>`);
    if (e.lang) footBits.push(`<span>${escapeHtml(e.lang)}</span>`);
    if (e.stars) footBits.push(`<span>⭐ <span class="fv">${e.stars.toLocaleString()}</span></span>`);
    const foot = footBits.join('<span class="sep">·</span>');

    const wordTag = e.word
      ? `<div class="idx-card-word">${escapeHtml(e.word)}<span class="en">${escapeHtml(e.wordEn || "")}</span></div>`
      : "";

    let kickerSuffix = "";
    if (e.kind === "research") {
      const isReturning = e.firstSeen && e.lastUpdated && e.firstSeen !== e.lastUpdated;
      kickerSuffix = isReturning ? " · 再次上榜" : " · 首次上榜";
    }

    return `
      <a class="idx-card" data-kind="${e.kind}" href="${escapeHtml(e.url)}">
        <div class="idx-card-head">
          <span class="idx-card-kicker"><span class="dot"></span>${kindLabel}${kickerSuffix}</span>
        </div>
        <div class="idx-card-title">${titleHtml}</div>
        <div class="idx-card-sub">${escapeHtml(e.summary || "")}</div>
        ${wordTag}
        <div class="idx-card-foot">${foot}</div>
        <span class="idx-card-arrow" aria-hidden="true">→</span>
      </a>`;
  }

  function sectionHtml(num, title, items) {
    if (!items.length) return "";
    const inner = items.map(cardHtml).join("");
    return `
      <section class="idx-section">
        <header class="idx-section-head">
          <span class="idx-section-num">${num}</span>
          <h2 class="idx-section-title">${title}</h2>
          <span class="idx-section-count">${items.length} 篇</span>
        </header>
        <div class="idx-cards">${inner}</div>
      </section>`;
  }

  function render() {
    const posts    = sortEntries(ENTRIES.filter(e => e.kind === "post"));
    const research = sortEntries(ENTRIES.filter(e => e.kind === "research"));

    let html = "";
    if (state.filter === "all") {
      html += sectionHtml("01", "每日觀察", posts);
      html += sectionHtml("02", "深入研究", research);
    } else if (state.filter === "post") {
      html += sectionHtml("01", "每日觀察", posts);
    } else {
      html += sectionHtml("01", "深入研究", research);
    }

    if (!html) html = `<div class="idx-empty">沒有符合條件的文章</div>`;
    sectionsEl.innerHTML = html;
  }

  $$(".idx-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      state.filter = btn.dataset.filter;
      $$(".idx-tab").forEach(b => b.classList.toggle("is-active", b === btn));
      render();
    });
  });
  $$(".idx-sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.sort = btn.dataset.sort;
      $$(".idx-sort-btn").forEach(b => b.classList.toggle("is-active", b === btn));
      render();
    });
  });

  render();
})();
