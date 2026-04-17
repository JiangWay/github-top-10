# CLAUDE.md

> 重要: 一率使用繁體中文
> This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repo is the output directory for the `github-top-10` scheduled task (defined in `~/.claude/scheduled-tasks/github-top-10/SKILL.md`). Each run produces one daily markdown report of GitHub's top-10 trending projects. There is no build, no tests, no app code — the "product" is the daily `.md` file.

## Daily report contract

Each run must produce a single file at the repo root with filename:

```
YYYY-MM-DD_<每日一字>.md
```

The 每日一字 (word-of-the-day) is derived from the one-sentence summary of that day's trends — it's not arbitrary, it should be the thematic keyword that falls out of the summary.

### Frontmatter (必填，放在檔案最上方)

```yaml
---
date: YYYY-MM-DD
word_of_day: 進化              # 每日一字（中文）
word_of_day_en: Evolution       # 英文對應詞
summary: <一句話總結原文>
dominant_category: <當日最大類別>
categories:                     # 類型分布（與正文一致）
  - { name: "AI Agent 框架", count: 5 }
languages: [Python, Shell, ...] # 當日榜內出現的語言（去重）
total_stars_today: 9466         # 10 個專案 stars_today 加總
top_project: owner/repo         # 當日 #1
projects:                       # 10 項，順序依排名
  - { rank: 1, repo: "owner/repo", category: "...", language: "...", stars_total: 0, stars_today: 0 }
previous_report: 2026-04-17_XXX.md   # 前一日檔名，首日為 null
---
```

Frontmatter 是趨勢比較的資料來源——`projects` 陣列必須完整 10 項，欄位命名不能變，這樣後續 diff 才能直接 parse YAML 而不必解析 markdown 表格。

### Required sections (see `2026-04-18_進化.md` for the reference layout)

1. **今日趨勢榜** — table with columns: `#`, `專案` (markdown link), `類型` (e.g. AI Agent 框架, 金融科技, 資安, 股票…), `語言`, `⭐ 總`, `⭐ 今日`, `一句話`. Follow with a short 類型分布 breakdown.
2. **一句話總結** — one bolded sentence capturing the day's dominant theme.
3. **每日一字** — the chosen character/word, followed by a short paragraph explaining why it was picked from the summary.
4. **一週趨勢比較** — diff against prior `.md` files in the repo root: 增長最快 / 被踢出 Top 10 / 新進榜. On day one (no prior files), explicitly note that this is the baseline.
5. Footer with 生成時間 and 資料來源.

Data source: `https://github.com/trending` (fetch via WebFetch).

## Comparing against the past week

Prior days' reports live as siblings at the repo root (`YYYY-MM-DD_*.md`). Parse their YAML frontmatter (`projects` 陣列) to diff — don't re-parse the markdown tables. A project "被踢出 Top 10" means it appeared in yesterday's `projects` but not today's; "增長最快" compares `stars_today` deltas across days for repos that appear in both. Don't invent trend data when the history is shorter than a week — say so.

## Git

Commits are made by the user on request (`git commit`). The repo tracks only the daily `.md` files; `.claude/` stays untracked unless the user says otherwise.
