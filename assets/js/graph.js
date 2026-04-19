/* Knowledge graph: D3 force-directed network of projects and their tags.
   Reads the embedded #graphData JSON (emitted by graph.md via Jekyll liquid),
   builds node + edge arrays, and runs a force simulation. */

(function () {
  const dataEl = document.getElementById("graphData");
  const svgEl = document.getElementById("graphSvg");
  const loading = document.getElementById("graphLoading");
  if (!dataEl || !svgEl) return;

  // Wait until D3 is available (it's loaded from CDN with defer).
  if (typeof d3 === "undefined") {
    // Poll briefly; the CDN script should load within a frame or two.
    let tries = 0;
    const wait = () => {
      if (typeof d3 !== "undefined") { boot(); return; }
      if (tries++ > 40) { if (loading) loading.textContent = "無法載入 D3（請檢查網路連線）"; return; }
      setTimeout(wait, 75);
    };
    wait();
  } else {
    boot();
  }

  function boot() {
    let raw;
    try { raw = JSON.parse(dataEl.textContent); }
    catch (err) { if (loading) loading.textContent = "資料解析失敗：" + err.message; return; }

    const tagsUrl = raw.tagsUrl || "/tags/";

    /* --- Build nodes + links ---
       Keep project nodes from liquid, and synthesize tag nodes from the three
       raw arrays so empty tags (e.g. a domain with zero projects) are
       automatically omitted. */
    const nodes = raw.nodes.map(n => ({ ...n }));
    const links = [];

    const tagNodeId = (axis, value) => axis + ":" + value;

    function addTagNode(axis, value) {
      const id = tagNodeId(axis, value);
      if (!nodes.find(n => n.id === id)) {
        nodes.push({
          id,
          type: axis === "d" ? "domain" : axis === "f" ? "form" : "theme",
          label: value,
          url: tagsUrl + "#" + axis + "-" + slugify(value),
          weight: 1,
        });
      }
      return id;
    }

    function projectNodeId(repo) { return "p:" + repo; }

    for (const rec of raw.rawDomain) {
      if (!rec.domain) continue;
      links.push({
        source: projectNodeId(rec.repo),
        target: addTagNode("d", rec.domain),
        kind: "domain",
      });
    }
    for (const rec of raw.rawForm) {
      if (!rec.form) continue;
      links.push({
        source: projectNodeId(rec.repo),
        target: addTagNode("f", rec.form),
        kind: "form",
      });
    }
    for (const rec of raw.rawThemes) {
      for (const t of rec.themes || []) {
        links.push({
          source: projectNodeId(rec.repo),
          target: addTagNode("t", t),
          kind: "theme",
        });
      }
    }

    // Bump tag nodes' weight by degree (how many projects connect to them).
    for (const l of links) {
      const tgt = nodes.find(n => n.id === l.target);
      if (tgt) tgt.weight = (tgt.weight || 1) + 1;
    }

    if (loading) loading.remove();

    renderGraph(nodes, links);
  }

  function slugify(s) {
    // Jekyll's | slugify filter lowercases ASCII, keeps CJK, replaces spaces
    // with hyphens. Mirror that locally so client-side anchors match.
    return String(s)
      .toLowerCase()
      .replace(/[\s/]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function renderGraph(nodes, links) {
    const svg = d3.select("#graphSvg");
    const container = document.getElementById("graphCanvas");

    const size = () => ({
      width: container.clientWidth || 800,
      height: Math.max(520, Math.min(720, container.clientHeight || 640)),
    });
    let { width, height } = size();
    svg.attr("viewBox", [0, 0, width, height]).attr("width", width).attr("height", height);

    const root = svg.append("g").attr("class", "graph-root");

    // Zoom + pan.
    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on("zoom", ev => root.attr("transform", ev.transform));
    svg.call(zoom);

    const linkSel = root.append("g")
      .attr("class", "graph-links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", l => "graph-link graph-link-" + l.kind);

    const nodeSel = root.append("g")
      .attr("class", "graph-nodes")
      .selectAll("g.graph-node")
      .data(nodes, d => d.id)
      .join("g")
      .attr("class", d => "graph-node graph-node-" + d.type)
      .attr("tabindex", 0)
      .call(drag());

    nodeSel.append("circle")
      .attr("r", d => radius(d))
      .attr("class", d => "graph-circle graph-circle-" + d.type);

    nodeSel.append("text")
      .attr("class", "graph-label")
      .attr("dy", d => radius(d) + 12)
      .attr("text-anchor", "middle")
      .text(d => truncateLabel(d));

    // Build adjacency for hover highlighting.
    const adj = new Map();
    nodes.forEach(n => adj.set(n.id, new Set([n.id])));
    for (const l of links) {
      const s = typeof l.source === "string" ? l.source : l.source.id;
      const t = typeof l.target === "string" ? l.target : l.target.id;
      adj.get(s).add(t);
      adj.get(t).add(s);
    }

    function applyHighlight(activeId) {
      const neigh = activeId ? adj.get(activeId) : null;
      nodeSel.classed("is-dim", d => neigh ? !neigh.has(d.id) : false);
      nodeSel.classed("is-active", d => activeId && d.id === activeId);
      linkSel.classed("is-dim", l => {
        if (!neigh) return false;
        const s = typeof l.source === "string" ? l.source : l.source.id;
        const t = typeof l.target === "string" ? l.target : l.target.id;
        return !(neigh.has(s) && neigh.has(t));
      });
    }

    nodeSel
      .on("mouseenter", (_, d) => applyHighlight(d.id))
      .on("mouseleave", () => applyHighlight(null))
      .on("focus", (_, d) => applyHighlight(d.id))
      .on("blur", () => applyHighlight(null))
      .on("click", (_, d) => { if (d.url) window.location.href = d.url; })
      .on("keydown", (ev, d) => {
        if ((ev.key === "Enter" || ev.key === " ") && d.url) {
          ev.preventDefault();
          window.location.href = d.url;
        }
      });

    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id)
        .distance(l => l.kind === "domain" ? 70 : l.kind === "form" ? 90 : 110)
        .strength(l => l.kind === "domain" ? 0.8 : l.kind === "form" ? 0.5 : 0.35))
      .force("charge", d3.forceManyBody().strength(-240))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(d => radius(d) + 18))
      .on("tick", () => {
        linkSel
          .attr("x1", l => l.source.x).attr("y1", l => l.source.y)
          .attr("x2", l => l.target.x).attr("y2", l => l.target.y);
        nodeSel.attr("transform", d => `translate(${d.x},${d.y})`);
      });

    const resetBtn = document.getElementById("graphResetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        for (const n of nodes) { n.fx = null; n.fy = null; }
        sim.alpha(0.9).restart();
        svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
      });
    }

    window.addEventListener("resize", () => {
      const s = size();
      width = s.width; height = s.height;
      svg.attr("viewBox", [0, 0, width, height]).attr("width", width).attr("height", height);
      sim.force("center", d3.forceCenter(width / 2, height / 2)).alpha(0.3).restart();
    });

    function drag() {
      return d3.drag()
        .on("start", (ev, d) => {
          if (!ev.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on("drag", (ev, d) => { d.fx = ev.x; d.fy = ev.y; })
        .on("end", (ev, d) => {
          if (!ev.active) sim.alphaTarget(0);
          // Leave the node pinned at release position; reset button clears.
        });
    }
  }

  function radius(d) {
    if (d.type === "project") return 6 + Math.min(6, (d.weight || 1) * 1.5);
    if (d.type === "domain") return 10 + Math.min(10, (d.weight || 1) * 1.2);
    if (d.type === "form") return 8 + Math.min(8, (d.weight || 1) * 1.0);
    return 7 + Math.min(7, (d.weight || 1) * 0.8);
  }

  function truncateLabel(d) {
    const max = d.type === "project" ? 24 : 14;
    const s = d.label;
    return s.length > max ? s.slice(0, max - 1) + "…" : s;
  }
})();
