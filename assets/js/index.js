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

  /* Count the current consecutive streak ending at the latest appearance.
     A gap of more than one calendar day resets the count — only the most
     recent unbroken run contributes. */
  function currentStreak(appearances) {
    if (!Array.isArray(appearances) || appearances.length === 0) return 0;
    const sorted = appearances.slice().sort();
    const DAY = 86400000;
    let streak = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      const curr = Date.parse(sorted[i] + "T00:00:00Z");
      const prev = Date.parse(sorted[i - 1] + "T00:00:00Z");
      if (Number.isNaN(curr) || Number.isNaN(prev)) break;
      if (curr - prev === DAY) streak++;
      else break;
    }
    return streak;
  }

  function renderStreakBoard() {
    const host = $("#idxStreak");
    const listEl = $("#idxStreakList");
    const countEl = $("#idxStreakCount");
    if (!host || !listEl) return;

    const ranked = ENTRIES
      .filter(e => e.kind === "research" && Array.isArray(e.appearances) && e.appearances.length)
      .map(e => ({
        title: e.title,
        url: e.url,
        streak: currentStreak(e.appearances),
        lastDate: e.appearances.slice().sort().pop(),
      }))
      .sort((a, b) => b.streak - a.streak || b.lastDate.localeCompare(a.lastDate))
      .slice(0, 10);

    if (!ranked.length) { host.hidden = true; return; }
    host.hidden = false;

    if (countEl) countEl.textContent = `${ranked.length} 個`;
    listEl.innerHTML = ranked.map((r, i) => `
      <li class="idx-streak-row">
        <span class="idx-streak-rank">${String(i + 1).padStart(2, "0")}</span>
        <a class="idx-streak-title mono" href="${escapeHtml(r.url)}">${escapeHtml(r.title)}</a>
        <span class="idx-streak-days"><span class="fv">${r.streak}</span> 天</span>
        <span class="idx-streak-last">最近 ${escapeHtml(r.lastDate)}</span>
      </li>`).join("");
  }

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

    let tagsHtml = "";
    const tags = Array.isArray(e.tags) ? e.tags : [];
    if (tags.length > 0) {
      const shown = tags.slice(0, 3);
      const overflow = tags.length - shown.length;
      const chips = shown.map(t => '<span class="idx-tag-chip">' + escapeHtml(t) + "</span>").join("");
      const more = overflow > 0 ? '<span class="idx-tag-chip idx-tag-chip-more">+' + overflow + "</span>" : "";
      tagsHtml = '<div class="idx-card-tags">' + chips + more + "</div>";
    }

    return `
      <a class="idx-card" data-kind="${e.kind}" href="${escapeHtml(e.url)}">
        <div class="idx-card-head">
          <span class="idx-card-kicker"><span class="dot"></span>${kindLabel}${kickerSuffix}</span>
        </div>
        <div class="idx-card-title">${titleHtml}</div>
        <div class="idx-card-sub">${escapeHtml(e.summary || "")}</div>
        ${tagsHtml}
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

  renderStreakBoard();
  render();
})();
