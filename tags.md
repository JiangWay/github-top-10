---
layout: page
title: "分類與主題"
permalink: /tags/
description: "以 domain（領域）、form（形態）、themes（主題）三軸分類現有每日觀察與深度研究。"
---

{%- assign research_pages = site.pages | where_exp: "p", "p.repo" -%}

<p class="tags-intro">以下列表以三軸分類整理所有每日觀察與深度研究：<strong>領域</strong>描述專案「做什麼」、<strong>形態</strong>描述「是什麼樣的產物」、<strong>主題</strong>描述跨領域共享的屬性（如自架、資料主權）。同一篇文章會在多個軸出現。分類規則見 <a href="https://github.com/JiangWay/github-top-10/blob/main/CLAUDE.md#tag-taxonomy"><code>CLAUDE.md</code></a>。</p>

{%- assign domains = "AI Agent 框架|LLM 客戶端|LLM 訓練|LLM 基礎建設|MCP 協定|資安|遠端桌面|語音與多媒體|企業治理|教學資源|硬體" | split: "|" -%}
{%- assign forms = "框架|應用程式|Skill 外掛|Kernel|MCP Server|課程教材|硬體裝置" | split: "|" -%}
{%- assign themes_list = "自架|資料主權|自進化|開源替代|多代理編排|企業級" | split: "|" -%}

## 領域 Domain

<div class="tags-toc">
{%- for d in domains -%}
  {%- assign d_slug = d | slugify -%}
  <a href="#d-{{ d_slug }}">{{ d }}</a>
{%- endfor -%}
</div>

{%- for d in domains -%}
  {%- assign d_slug = d | slugify -%}
  {%- assign posts_here = site.posts | where_exp: "p", "p.tags contains d" -%}
  {%- assign research_here = research_pages | where: "domain", d -%}
  {%- assign total = posts_here.size | plus: research_here.size -%}

<section class="tags-group" markdown="1" id="d-{{ d_slug }}">

### {{ d }} <span class="tags-count">{{ total }} 篇</span>

{% if posts_here.size > 0 -%}
**每日觀察**
<ul class="tags-list">
{%- for p in posts_here -%}
  <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a><span class="tags-meta">{{ p.date | date: "%Y-%m-%d" }}</span></li>
{%- endfor -%}
</ul>
{%- endif %}

{% if research_here.size > 0 -%}
**深度研究**
<ul class="tags-list">
{%- for r in research_here -%}
  <li><a href="{{ r.url | relative_url }}"><code>{{ r.repo }}</code></a>{% if r.form %}<span class="tags-meta">{{ r.form }}</span>{% endif %}</li>
{%- endfor -%}
</ul>
{%- endif %}

{% if total == 0 %}<p class="tags-empty">尚無文章。</p>{% endif %}

</section>
{%- endfor %}

## 形態 Form

<div class="tags-toc">
{%- for f in forms -%}
  {%- assign f_slug = f | slugify -%}
  <a href="#f-{{ f_slug }}">{{ f }}</a>
{%- endfor -%}
</div>

{%- for f in forms -%}
  {%- assign f_slug = f | slugify -%}
  {%- assign research_here = research_pages | where: "form", f -%}

<section class="tags-group" markdown="1" id="f-{{ f_slug }}">

### {{ f }} <span class="tags-count">{{ research_here.size }} 篇</span>

{% if research_here.size > 0 -%}
<ul class="tags-list">
{%- for r in research_here -%}
  <li><a href="{{ r.url | relative_url }}"><code>{{ r.repo }}</code></a><span class="tags-meta">{{ r.domain }}</span></li>
{%- endfor -%}
</ul>
{%- else -%}
<p class="tags-empty">尚無文章。</p>
{%- endif %}

</section>
{%- endfor %}

## 主題 Themes

<div class="tags-toc">
{%- for t in themes_list -%}
  {%- assign t_slug = t | slugify -%}
  <a href="#t-{{ t_slug }}">{{ t }}</a>
{%- endfor -%}
</div>

{%- for t in themes_list -%}
  {%- assign t_slug = t | slugify -%}
  {%- assign research_here = research_pages | where_exp: "r", "r.themes contains t" -%}

<section class="tags-group" markdown="1" id="t-{{ t_slug }}">

### {{ t }} <span class="tags-count">{{ research_here.size }} 篇</span>

{% if research_here.size > 0 -%}
<ul class="tags-list">
{%- for r in research_here -%}
  <li><a href="{{ r.url | relative_url }}"><code>{{ r.repo }}</code></a><span class="tags-meta">{{ r.domain }} · {{ r.form }}</span></li>
{%- endfor -%}
</ul>
{%- else -%}
<p class="tags-empty">尚無文章。</p>
{%- endif %}

</section>
{%- endfor %}
