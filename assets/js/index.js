/* Index page: filter + sort the embedded article list. */

(() => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const dataEl = $("#idxData");
  if (!dataEl) return;
  let ENTRIES = [];
  try { ENTRIES = JSON.parse(dataEl.textContent) || []; }
  catch (_) { ENTRIES = []; }

  const state = { filter: "all", sort: "date", tag: null };

  /* Read initial tag filter from URL hash (e.g. #tag=AI%20Agent%20框架).
     Keeps back/forward history intact and lets share URLs include a filter. */
  function readTagFromHash() {
    const h = window.location.hash || "";
    const m = /^#tag=(.+)$/.exec(h);
    if (m) {
      try { return decodeURIComponent(m[1]); } catch (_) { return null; }
    }
    return null;
  }
  state.tag = readTagFromHash();

  const sectionsEl = $("#idxSections");
  const statTotal = $("#statTotal");
  const statDaily = $("#statDaily");
  const statResearch = $("#statResearch");
  if (statTotal) statTotal.textContent = ENTRIES.length;
  if (statDaily) statDaily.textContent = ENTRIES.filter(e => e.kind === "post").length;
  if (statResearch) {
    const researchAll = ENTRIES.filter(e => e.kind === "research");
    const withSeries  = researchAll.filter(e => e.deepDiveSeries).length;
    /* Show "<series>/<total>" so visitors see how many research entries have a
       dedicated deep-dive series. e.g. "1/152" means 1 of 152 research items
       has a full deep-dive series attached. */
    statResearch.textContent = withSeries > 0
      ? `${withSeries}/${researchAll.length}`
      : researchAll.length;
  }

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
      if (e.deepDiveSeries) {
        const epCount = e.deepDiveEpisodeCount || 0;
        kickerSuffix += epCount > 0
          ? ` · 含 ${epCount} 集深度解析`
          : " · 含深度解析系列";
      }
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

    /* For research entries with an attached deep-dive series, the card's
       primary destination is the series hub (the headline content) rather
       than the research snapshot. The hub links back to research for users
       who want the trending history. */
    const hasSeries = e.kind === "research" && e.deepDiveSeries;
    const cardHref  = hasSeries ? e.deepDiveSeries : e.url;
    const cardKind  = hasSeries ? `${e.kind} has-series` : e.kind;
    const seriesBadge = hasSeries
      ? `<span class="idx-card-series-badge">深度解析系列 →</span>`
      : "";

    return `
      <a class="idx-card" data-kind="${cardKind}" href="${escapeHtml(cardHref)}">
        <div class="idx-card-head">
          <span class="idx-card-kicker"><span class="dot"></span>${kindLabel}${kickerSuffix}</span>
        </div>
        <div class="idx-card-title">${titleHtml}${seriesBadge}</div>
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

  function matchesTag(e) {
    if (!state.tag) return true;
    return Array.isArray(e.tags) && e.tags.includes(state.tag);
  }

  function updateFilterBar() {
    const bar = $("#idxFilterBar");
    const label = $("#idxFilterActiveLabel");
    if (!bar || !label) return;
    if (state.tag) {
      label.textContent = state.tag;
      bar.hidden = false;
    } else {
      bar.hidden = true;
    }
  }

  function render() {
    const posts    = sortEntries(ENTRIES.filter(e => e.kind === "post" && matchesTag(e)));
    let   research = sortEntries(ENTRIES.filter(e => e.kind === "research" && matchesTag(e)));
    /* Pin research entries with an attached deep-dive series to the top of
       the 深入研究 list. Within each group the active sort still applies. */
    research = [
      ...research.filter(e => e.deepDiveSeries),
      ...research.filter(e => !e.deepDiveSeries),
    ];

    let html = "";
    if (state.filter === "all") {
      html += sectionHtml("01", "每日觀察", posts);
      html += sectionHtml("02", "深入研究", research);
    } else if (state.filter === "post") {
      html += sectionHtml("01", "每日觀察", posts);
    } else {
      html += sectionHtml("01", "深入研究", research);
    }

    if (!html) {
      const hint = state.tag ? `沒有符合此 tag 的文章（${escapeHtml(state.tag)}）` : "沒有符合條件的文章";
      html = `<div class="idx-empty">${hint}</div>`;
    }
    sectionsEl.innerHTML = html;
    updateFilterBar();
  }

  function setTagFilter(tag) {
    state.tag = tag;
    const hash = tag ? "#tag=" + encodeURIComponent(tag) : "";
    if (window.location.hash !== hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search + hash);
    }
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  /* Chip click → set tag filter. Delegated so we catch chips
     re-rendered by every render() call. The chip is nested inside
     an <a class="idx-card">, so we preventDefault to keep the click
     on the chip from navigating to the card's URL. */
  sectionsEl.addEventListener("click", (ev) => {
    const chip = ev.target.closest(".idx-tag-chip");
    if (!chip || chip.classList.contains("idx-tag-chip-more")) return;
    ev.preventDefault();
    ev.stopPropagation();
    setTagFilter(chip.textContent.trim());
  });

  const clearBtn = $("#idxFilterClear");
  if (clearBtn) clearBtn.addEventListener("click", () => setTagFilter(null));

  window.addEventListener("hashchange", () => {
    const t = readTagFromHash();
    if (t !== state.tag) { state.tag = t; render(); }
  });

  renderStreakBoard();
  render();
})();
