/* Reader UI: TOC, scroll-spy, progress, tweaks, table/link enhancements.
   Operates on already-rendered Kramdown HTML served by Jekyll. */

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const articleEl = $("#article");
  if (!articleEl) return;

  const tocEl = $("#toc");
  const tocFloatEl = $("#tocFloat");
  const progressEl = $("#progressFill");
  const readTimeEl = $("#readTime");
  const wordCountEl = $("#wordCount");
  const readPctEl = $("#readPct");
  const tweaks = $("#tweaks");

  /* ---------------- Language / category meta ---------------- */
  const LANG_META = {
    Python:     { abbr: "Py", c: "oklch(0.65 0.12 240)" },
    TypeScript: { abbr: "Ts", c: "oklch(0.6 0.12 235)" },
    JavaScript: { abbr: "Js", c: "oklch(0.8 0.12 95)" },
    Shell:      { abbr: "Sh", c: "oklch(0.55 0.05 140)" },
    Jupyter:    { abbr: "Jp", c: "oklch(0.7 0.13 55)" },
    "Jupyter Notebook": { abbr: "Jp", c: "oklch(0.7 0.13 55)" },
    Dart:       { abbr: "Da", c: "oklch(0.62 0.12 220)" },
    Go:         { abbr: "Go", c: "oklch(0.7 0.12 215)" },
    Rust:       { abbr: "Rs", c: "oklch(0.6 0.15 40)" },
    Java:       { abbr: "Jv", c: "oklch(0.6 0.12 40)" },
    C:          { abbr: "C",  c: "oklch(0.55 0.08 260)" },
    "C++":     { abbr: "C+", c: "oklch(0.55 0.10 300)" },
    Ruby:       { abbr: "Rb", c: "oklch(0.55 0.15 25)" },
    Swift:      { abbr: "Sw", c: "oklch(0.65 0.13 40)" }
  };

  const LANG_GLYPHS = {
    Python:     '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5c-2 0-3.5.7-3.5 2.3V7h3.5v.5h-5C3.5 7.5 2.8 9 2.8 11s.7 3.5 2.2 3.5H6.5v-1.8c0-1.6 1.5-2.7 3.5-2.7h3c1.3 0 2.5-.8 2.5-2.2V4.8C15.5 3.3 13.8 2.5 12 2.5zM7.5 4a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="currentColor"/><path d="M10 17.5c2 0 3.5-.7 3.5-2.3V13h-3.5v-.5h5c2 0 2.7-1.5 2.7-3.5s-.7-3.5-2.2-3.5H13.5v1.8c0 1.6-1.5 2.7-3.5 2.7H7c-1.3 0-2.5.8-2.5 2.2v3.5c0 1.5 1.7 2.3 3.5 2.3zm2.5-1.5a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill="currentColor" opacity=".55"/></svg>',
    TypeScript: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="2" fill="currentColor"/><text x="10" y="14" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" font-weight="800" fill="var(--bg,#fff)">TS</text></svg>',
    JavaScript: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="2" fill="currentColor"/><text x="10" y="14" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" font-weight="800" fill="#1a1a1a">JS</text></svg>',
    Shell:      '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="3.5" width="16" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 8l2.5 2L5 12M10 12h4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    Jupyter:    '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="5.5" cy="5.5" r="1.6" fill="currentColor"/><circle cx="14.5" cy="14.5" r="1.6" fill="currentColor"/><path d="M3 10a7 7 0 0 0 14 0M17 10a7 7 0 0 1-14 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    Dart:       '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10L10 4l6 6-6 6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1" opacity=".5"/></svg>',
    Go:         '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 9h3M3 11h3M2.5 13h2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="12" cy="10" rx="5.5" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10.5" cy="9" r="0.8" fill="currentColor"/><circle cx="13.5" cy="9" r="0.8" fill="currentColor"/></svg>',
    Rust:       '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 4v2M10 14v2M4 10h2M14 10h2M5.8 5.8l1.4 1.4M12.8 12.8l1.4 1.4M5.8 14.2l1.4-1.4M12.8 7.2l1.4-1.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="10" cy="10" r="2" fill="currentColor"/></svg>'
  };
  LANG_GLYPHS["Jupyter Notebook"] = LANG_GLYPHS.Jupyter;

  function renderLangPill(lang) {
    const m = LANG_META[lang] || { abbr: lang.slice(0,2), c: "oklch(0.65 0 0)" };
    const glyph = LANG_GLYPHS[lang] || `<span class="lang-abbr">${m.abbr}</span>`;
    return `<span class="lang-pill" data-tip="${lang}" style="--lang-c:${m.c};color:var(--lang-c)">${glyph}</span>`;
  }

  function langColor(lang) {
    return (LANG_META[lang] || {}).c || "oklch(0.65 0 0)";
  }

  function catIconsFor(text) {
    const out = [];
    if (/Agent.*框架|代理框架/i.test(text)) out.push("agent");
    if (/開發者工具|MCP|GUI/i.test(text)) out.push("tool");
    if (/教學|LLM/i.test(text)) out.push("book");
    if (/資安|安全/i.test(text)) out.push("shield");
    if (/硬體|助理/i.test(text)) out.push("chip");
    if (/語音|多媒體/i.test(text)) out.push("wave");
    if (/金融|股票|交易/i.test(text)) out.push("chart");
    if (out.length === 0) out.push("dot");
    return [...new Set(out)];
  }

  const CAT_GLYPHS = {
    agent: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="9" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    tool:  '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13 3.5a4 4 0 0 0-4 4c0 .6.14 1.15.37 1.65L3.5 15l1.5 1.5 5.85-5.87c.5.23 1.05.37 1.65.37a4 4 0 1 0-4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    book:  '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4h5a2 2 0 0 1 2 2v11a1.5 1.5 0 0 0-1.5-1.5H4zM16 4h-5a2 2 0 0 0-2 2v11a1.5 1.5 0 0 1 1.5-1.5H16z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    shield:'<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5 4 4.5v5c0 3.5 2.5 6.5 6 8 3.5-1.5 6-4.5 6-8v-5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    chip:  '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="5" y="5" width="10" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 3v2M12 3v2M8 15v2M12 15v2M3 8h2M3 12h2M15 8h2M15 12h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    wave:  '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h2M6 6v8M9 3v14M12 6v8M15 8v4M17 10h0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    chart: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 16h14M5 14V9M9 14V5M13 14v-7M17 14v-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    dot:   '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3" fill="currentColor"/></svg>'
  };

  function renderCatIcons(text) {
    const icons = catIconsFor(text).map(id =>
      `<span class="cat-icon" data-tip="${text.replace(/"/g,'&quot;')}">${CAT_GLYPHS[id]}</span>`
    ).join("");
    return `<span class="cat-icons">${icons}</span>`;
  }

  /* ---------------- Enhance tables + repo links ---------------- */

  function enhanceRepoLinks(root) {
    $$("a", root).forEach(a => {
      const href = a.getAttribute("href") || "";
      const text = (a.textContent || "").trim();
      const m = /^https?:\/\/github\.com\/([^\/\s]+)\/([^\/\s#?]+)\/?$/.exec(href);
      if (m && /^[\w.\-]+\/[\w.\-]+$/.test(text)) {
        const repo = `${m[1]}/${m[2]}`;
        a.classList.add("repo-link");
        a.dataset.repo = repo;
        a.target = "_blank";
        a.rel = "noopener";
      }
    });
  }

  function wrapTables(root) {
    $$("table", root).forEach(table => {
      if (table.closest(".table-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "table-wrap";
      const scroll = document.createElement("div");
      scroll.className = "table-scroll";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(scroll);
      scroll.appendChild(table);
    });
  }

  function enhanceTables(root) {
    $$("table", root).forEach(table => {
      const headers = $$("thead th", table).map(th => th.textContent.trim());
      if (!headers.length) return;
      const isTrend = headers[0] === "#" && headers.some(h => /專案/.test(h));
      const phraseIdx = headers.findIndex(h => /一句話|描述/.test(h));

      $$("tbody tr", table).forEach(tr => {
        const tds = $$("td", tr);
        tds.forEach((td, i) => {
          const h = headers[i] || "";
          const txt = td.textContent.trim();
          if (i === 0 && /^\d+$/.test(txt)) td.classList.add("rank");
          if (/專案/.test(h) || /project/i.test(h) || /repo/i.test(h)) {
            td.classList.add("repo-cell");
            $$("a.repo-link", td).forEach(a => {
              const parts = a.textContent.split("/");
              if (parts.length === 2) a.innerHTML = parts[0] + "/<wbr>" + parts[1];
            });
          }
          if (/⭐/.test(h) || /stars/i.test(h)) {
            td.classList.add("num");
            if (/^\+/.test(txt)) td.classList.add("num-pos");
          }
          if (/增長率/.test(h)) td.classList.add("num");
          if (/語言/.test(h) || /language/i.test(h)) {
            td.classList.add("lang-cell");
            td.innerHTML = renderLangPill(txt);
          }
          if (/類型/.test(h) || /category/i.test(h)) {
            td.classList.add("cat-cell");
            td.innerHTML = renderCatIcons(txt);
          }
          if (/連榜/.test(h)) td.classList.add("num");
          if (/絕對榜/.test(h)) td.classList.add("num");
        });

        if (isTrend && phraseIdx >= 0) {
          const phraseTd = tds[phraseIdx];
          if (phraseTd) {
            const phraseHTML = phraseTd.innerHTML.trim();
            phraseTd.remove();
            tr.classList.add("tr-main");
            const subtr = document.createElement("tr");
            subtr.className = "tr-phrase";
            const colCount = headers.length - 1;
            subtr.innerHTML = `<td></td><td colspan="${colCount - 1}" class="phrase-cell">${phraseHTML}</td>`;
            tr.after(subtr);
          }
        }
      });

      if (isTrend) {
        table.classList.add("t-trend");
        if (phraseIdx >= 0) {
          const phraseTh = $$("thead th", table)[phraseIdx];
          if (phraseTh) phraseTh.remove();
        }
        $$("thead th", table).forEach((th) => {
          const h = th.textContent.trim();
          if (/類型/.test(h)) th.innerHTML = `<span class="th-compact" title="類型">類</span>`;
          if (/語言/.test(h)) th.innerHTML = `<span class="th-compact" title="語言">語</span>`;
        });
      }
    });
  }

  /* ---------------- TOC + scroll-spy ---------------- */

  function slug(s) {
    return s.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  }

  let observer;
  function buildTOC() {
    if (!tocEl) return;
    if (observer) observer.disconnect();
    tocEl.innerHTML = "";
    let h2Num = 0;
    const headings = $$("h2, h3", articleEl);
    headings.forEach((h, idx) => {
      const lvl = h.tagName === "H2" ? 2 : 3;
      if (!h.id) h.id = "s-" + idx + "-" + slug(h.textContent);

      if (lvl === 2) {
        h2Num++;
        h.setAttribute("data-num", String(h2Num).padStart(2, "0"));
      }

      const btn = document.createElement("a");
      btn.href = "#" + h.id;
      btn.className = "toc-item";
      btn.setAttribute("data-lvl", String(lvl));
      btn.setAttribute("data-target", h.id);
      btn.textContent = h.textContent;
      tocEl.appendChild(btn);
    });

    // Mirror the contents into the floating TOC (mobile / collapsed rail)
    if (tocFloatEl) tocFloatEl.innerHTML = tocEl.innerHTML;

    observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          $$(".toc-item").forEach(i => i.classList.toggle("is-active", i.dataset.target === id));
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
    headings.forEach(h => observer.observe(h));
  }

  /* ---------------- Stats ---------------- */

  const heroReadEl = $("#heroReadTime");
  function computeStats() {
    const text = articleEl.textContent.replace(/\s+/g, "");
    const chars = text.length;
    const mins = Math.max(1, Math.round(chars / 400));
    if (heroReadEl) heroReadEl.textContent = mins + " 分鐘";
    if (readTimeEl) readTimeEl.textContent = mins + " 分鐘";
    if (wordCountEl) wordCountEl.textContent = chars.toLocaleString() + " 字";
  }

  function updateProgress() {
    if (!progressEl) return;
    const rect = articleEl.getBoundingClientRect();
    const total = articleEl.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -rect.top);
    const pct = total > 0 ? Math.min(1, scrolled / total) : 0;
    progressEl.style.width = (pct * 100) + "%";
    if (readPctEl) readPctEl.textContent = Math.round(pct * 100) + "%";
  }

  /* ---------------- Tweaks ---------------- */

  const TWEAK_DEFAULTS = {
    theme: "paper",
    bodyFont: "serif",
    measure: "comfy",
    density: "cozy",
    rails: "both",
    fontSize: 19,
    immersive: false
  };

  let state = loadTweaks();

  function loadTweaks() {
    try {
      const s = JSON.parse(localStorage.getItem("reader-tweaks") || "{}");
      return { ...TWEAK_DEFAULTS, ...s };
    } catch { return { ...TWEAK_DEFAULTS }; }
  }
  function saveTweaks() {
    try { localStorage.setItem("reader-tweaks", JSON.stringify(state)); } catch (_) {}
  }
  function applyTweaks() {
    document.body.dataset.theme = state.theme;
    document.body.dataset.bodyFont = state.bodyFont;
    document.body.dataset.measure = state.measure;
    document.body.dataset.density = state.density;
    document.body.dataset.rails = state.rails;
    if (state.immersive) document.body.dataset.immersive = "true";
    else delete document.body.dataset.immersive;
    const immBtn = $("#immersiveToggle");
    if (immBtn) immBtn.setAttribute("aria-pressed", state.immersive ? "true" : "false");
    document.documentElement.style.setProperty("--body-fs", state.fontSize + "px");
    $$(".seg").forEach(seg => {
      const k = seg.dataset.tweak;
      $$("button", seg).forEach(b => b.classList.toggle("is-on", b.dataset.val === state[k]));
    });
    const fs = $("#fsSlider");
    if (fs) {
      fs.value = state.fontSize;
      const v = $("#fsVal"); if (v) v.textContent = state.fontSize + "px";
    }
  }

  function toggleImmersive(force) {
    state.immersive = (typeof force === "boolean") ? force : !state.immersive;
    applyTweaks();
    saveTweaks();
  }

  $$(".seg").forEach(seg => {
    seg.addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b) return;
      state[seg.dataset.tweak] = b.dataset.val;
      applyTweaks(); saveTweaks();
    });
  });
  const fsSlider = $("#fsSlider");
  if (fsSlider) fsSlider.addEventListener("input", e => {
    state.fontSize = +e.target.value;
    applyTweaks(); saveTweaks();
  });

  const themeToggle = $("#themeToggle");
  if (themeToggle) themeToggle.addEventListener("click", () => {
    const order = ["paper", "slate", "ink"];
    state.theme = order[(order.indexOf(state.theme) + 1) % order.length];
    applyTweaks(); saveTweaks();
  });

  const tweaksToggle = $("#tweaksToggle");
  if (tweaksToggle && tweaks) tweaksToggle.addEventListener("click", () => {
    tweaks.hidden = !tweaks.hidden;
  });
  const tweaksClose = $("#tweaksClose");
  if (tweaksClose && tweaks) tweaksClose.addEventListener("click", () => { tweaks.hidden = true; });

  const navToggleBtn = $("#navToggle");
  if (navToggleBtn) {
    navToggleBtn.addEventListener("click", () => {
      const collapsed = document.body.dataset.navCollapsed === "true";
      document.body.dataset.navCollapsed = collapsed ? "false" : "true";
    });
  }

  const immersiveBtn = $("#immersiveToggle");
  if (immersiveBtn) immersiveBtn.addEventListener("click", () => toggleImmersive());

  /* ---------------- Floating TOC (mobile / collapsed rail) ---------------- */

  const tocFab = $("#tocFab");
  const tocPop = $("#tocPop");
  const tocPopClose = $("#tocPopClose");
  function setTocPop(open) {
    if (!tocPop || !tocFab) return;
    tocPop.hidden = !open;
    tocFab.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (tocFab) tocFab.addEventListener("click", () => setTocPop(tocPop.hidden));
  if (tocPopClose) tocPopClose.addEventListener("click", () => setTocPop(false));
  if (tocFloatEl) tocFloatEl.addEventListener("click", (e) => {
    if (e.target.closest(".toc-item")) setTocPop(false);
  });
  document.addEventListener("click", (e) => {
    if (!tocPop || tocPop.hidden) return;
    if (tocPop.contains(e.target) || (tocFab && tocFab.contains(e.target))) return;
    setTocPop(false);
  });

  /* ---------------- Action bar (share + back-to-top) ---------------- */

  const actionbar = $("#actionbar");
  const pageUrl = location.href;
  const pageTitle = document.title;
  const shareX = $("#shareX");
  if (shareX) shareX.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(pageTitle) + "&url=" + encodeURIComponent(pageUrl);
  const shareThreads = $("#shareThreads");
  if (shareThreads) shareThreads.href = "https://www.threads.net/intent/post?text=" + encodeURIComponent(pageTitle + " " + pageUrl);

  const copyLink = $("#copyLink");
  if (copyLink) copyLink.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch (_) {
      const t = document.createElement("textarea");
      t.value = pageUrl; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch (e) {}
      t.remove();
    }
    const label = copyLink.querySelector(".ab-label");
    copyLink.classList.add("is-done");
    if (label) label.textContent = "已複製";
    setTimeout(() => {
      copyLink.classList.remove("is-done");
      if (label) label.textContent = "複製連結";
    }, 1600);
  });

  const toTopBtn = $("#toTop");
  if (toTopBtn) toTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  function updateActionbar() {
    if (actionbar) actionbar.classList.toggle("is-shown", window.scrollY > 280);
  }

  document.addEventListener("keydown", (e) => {
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.target && e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      toggleImmersive();
    } else if (e.key === "Escape") {
      if (tocPop && !tocPop.hidden) setTocPop(false);
      else if (state.immersive) toggleImmersive(false);
    }
  });

  /* ---------------- Boot ---------------- */

  applyTweaks();
  enhanceRepoLinks(articleEl);
  wrapTables(articleEl);
  enhanceTables(articleEl);
  buildTOC();
  computeStats();
  updateProgress();
  updateActionbar();

  window.addEventListener("scroll", () => { updateProgress(); updateActionbar(); }, { passive: true });
  window.addEventListener("resize", updateProgress);
})();
