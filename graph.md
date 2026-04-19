---
layout: page
title: "知識圖譜"
permalink: /graph/
description: "以節點網絡呈現所有深度研究與分類標籤的關係：專案 ↔ 領域 / 形態 / 主題。"
---

{%- assign research_pages = site.pages | where_exp: "p", "p.repo" -%}

<p class="graph-intro">以 D3 力導向圖呈現 <strong>{{ research_pages.size }}</strong> 個專案節點與其 <strong>domain / form / themes</strong> 三軸標籤的關聯。拖拉節點可重新排列，hover 高亮鄰居，點選專案節點跳研究檔，點 tag 節點跳 <a href="{{ '/tags/' | relative_url }}">/tags/</a> 對應區段。</p>

<div class="graph-toolbar">
  <div class="graph-legend" aria-label="節點類型圖例">
    <span class="graph-legend-item"><span class="graph-dot graph-dot-project"></span>專案</span>
    <span class="graph-legend-item"><span class="graph-dot graph-dot-domain"></span>領域</span>
    <span class="graph-legend-item"><span class="graph-dot graph-dot-form"></span>形態</span>
    <span class="graph-legend-item"><span class="graph-dot graph-dot-theme"></span>主題</span>
  </div>
  <div class="graph-controls">
    <button class="graph-btn" id="graphResetBtn" type="button">重新排列</button>
  </div>
</div>

<div class="graph-canvas" id="graphCanvas" aria-label="知識圖譜互動式節點網絡">
  <svg id="graphSvg"></svg>
  <div class="graph-loading" id="graphLoading">載入中⋯（需要 JavaScript）</div>
</div>

<p class="graph-note">資料來源：各研究檔 frontmatter 的 <code>domain</code> / <code>form</code> / <code>themes</code> 欄位。節點大小以專案連榜天數（<code>appearances.size</code>）加權。</p>

<script type="application/json" id="graphData">{
  "nodes": [
    {%- comment -%} Project nodes (one per research file) {%- endcomment -%}
    {%- for rp in research_pages -%}
      {"id": "p:{{ rp.repo | jsonify | slice: 1, -1 }}",
       "type": "project",
       "label": {{ rp.repo | jsonify }},
       "url": {{ rp.url | relative_url | jsonify }},
       "weight": {% if rp.appearances %}{{ rp.appearances.size }}{% else %}1{% endif %}
      }{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
  ],
  "rawDomain": [
    {%- for rp in research_pages -%}
      {"repo": {{ rp.repo | jsonify }}, "domain": {{ rp.domain | default: "" | jsonify }}}{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
  ],
  "rawForm": [
    {%- for rp in research_pages -%}
      {"repo": {{ rp.repo | jsonify }}, "form": {{ rp.form | default: "" | jsonify }}}{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
  ],
  "rawThemes": [
    {%- for rp in research_pages -%}
      {"repo": {{ rp.repo | jsonify }}, "themes": {% if rp.themes %}{{ rp.themes | jsonify }}{% else %}[]{% endif %}}{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
  ],
  "tagsUrl": {{ '/tags/' | relative_url | jsonify }}
}</script>

<script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js" defer></script>
<script src="{{ '/assets/js/graph.js' | relative_url }}" defer></script>
<link rel="stylesheet" href="{{ '/assets/css/graph.css' | relative_url }}">
