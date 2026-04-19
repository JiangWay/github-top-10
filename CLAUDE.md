# CLAUDE.md

> 重要: 一率使用繁體中文
> This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repo is the output directory for the `github-top-10` scheduled task (defined in `~/.claude/scheduled-tasks/github-top-10/SKILL.md`). Each run produces one daily markdown report of GitHub's top-10 trending projects. There is no build, no tests, no app code — the "product" is the daily `.md` file.

## Daily report contract

Each run must produce a single file at this **Jekyll post path**:

```
_posts/YYYY-MM-DD-<每日一字>.md
```

**重要**：Jekyll post 慣例要求 `_posts/` 目錄 + 日期與標題用**連字號**（`-`）分隔，不能用底線。檔名錯會導致 GitHub Pages 不把它當成 post、不出現在首頁。

The 每日一字 (word-of-the-day) is derived from the one-sentence summary of that day's trends — it's not arbitrary, it should be the thematic keyword that falls out of the summary.

### Frontmatter (必填，放在檔案最上方)

```yaml
---
layout: post
title: "YYYY-MM-DD 每日一字：<每日一字>"
date: YYYY-MM-DD
word_of_day: 進化              # 每日一字（中文）
word_of_day_en: Evolution       # 英文對應詞
summary: <一句話總結原文>
dominant_category: <當日最大類別>
categories:                     # 類型分布（與正文一致）
  - { name: "AI Agent 框架", count: 5 }
languages: [Python, Shell, ...] # 當日榜內出現的語言（去重）
total_stars_today: 9466         # 10 個專案 stars_today 加總
top_project: owner/repo         # 絕對榜 #1
top_growth_project: owner/repo  # 增長率榜 #1
projects:                       # 10 項，依絕對榜排名
  - { rank: 1, repo: "owner/repo", category: "...", language: "...", stars_total: 0, stars_today: 0, growth_rate: 0.00 }
growth_top_10:                  # 10 項，依 growth_rate 降冪；候選池 = 當日絕對榜 projects
  - { rank: 1, repo: "owner/repo", growth_rate: 24.74 }
previous_report: _posts/2026-04-17-XXX.md   # 前一日檔路徑，首日為 null
---
```

`layout: post` 與 `title:` 是 Jekyll 專用欄位——`layout` 決定套版，`title` 決定首頁列表與 `<title>` 標籤顯示。其餘 frontmatter 保持原契約，用於跨日 diff。

`growth_rate` 公式：`stars_today / stars_total * 100`，保留 2 位小數。

Frontmatter 是趨勢比較的資料來源——`projects` 陣列必須完整 10 項，欄位命名不能變，這樣後續 diff 才能直接 parse YAML 而不必解析 markdown 表格。

### Required sections (see `2026-04-18_進化.md` for the reference layout)

1. **今日趨勢榜** — table with columns: `#`, `專案` (markdown link), `類型` (e.g. AI Agent 框架, 金融科技, 資安, 股票…), `語言`, `⭐ 總`, `⭐ 今日`, `一句話`. Follow with a short 類型分布 breakdown.
2. **一句話總結** — one bolded sentence capturing the day's dominant theme.
3. **每日一字** — the chosen character/word, followed by a short paragraph explaining why it was picked from the summary.
4. **增長率榜 Top 10** — table sorted by `growth_rate` desc，欄位含：新排名、專案（超連結）、增長率、絕對榜對應排名、連榜天數（以 `growth_appearances` 計算）。
5. **一週趨勢比較** — diff against prior `.md` files in the repo root: 增長最快 / 被踢出 Top 10 / 新進榜. On day one (no prior files), explicitly note that this is the baseline.
6. Footer with 生成時間 and 資料來源.

Data source: `https://github.com/trending` (fetch via WebFetch).

## Comparing against the past week

Prior days' reports live in `_posts/` (`_posts/YYYY-MM-DD-*.md`). Parse their YAML frontmatter (`projects` 陣列) to diff — don't re-parse the markdown tables. A project "被踢出 Top 10" means it appeared in yesterday's `projects` but not today's; "增長最快" compares `stars_today` deltas across days for repos that appear in both. Don't invent trend data when the history is shorter than a week — say so.

## Deep research per project (`research/`)

每一個上榜專案都要有一份深度研究檔，存放於 `research/<owner>__<repo>.md`（雙底線取代 `/`，避免誤解為子目錄）。

### 觸發條件

每個專案會拿到一份深度研究檔，觸發時機有兩種：

1. **絕對榜首次上榜** — `research/<owner>__<repo>.md` 不存在 → 立即做完整深度研究。
2. **增長率榜連續 3 天上榜** — 若某專案 `growth_appearances` 陣列的最後三天是「今日、昨日、前日」但研究檔尚不存在 → 立即做完整深度研究。此規則補捉到小型快速竄升、但始終沒擠進絕對榜 top 10 的長尾明星。

每日流程：先更新今日絕對榜與增長榜 → 逐一檢查研究檔存在性 → 兩種觸發條件任一成立就做研究；已存在的走「再次上榜」流程。

### 首次上榜（檔案不存在）
立即做一份完整深度研究，呼叫以下資料來源：
1. `gh api repos/{owner}/{repo}` — 描述、授權、stars、主要貢獻者
2. WebFetch GitHub repo 頁與 README
3. `gh api repos/{owner}/{repo}/releases` — 無 release 則於 frontmatter `has_releases: false` 並在 Release 區寫「尚無 GitHub Release」
4. WebSearch 外部評論（HN / Reddit / 部落格 / Twitter / 中文社群）— **外部評論必附來源超連結**

### 研究檔章節與寫法

首次上榜研究檔的必填 10 段骨架、依類型加重、9 項寫法守則與機器可驗證檢查清單，見 [docs/research-style.md](docs/research-style.md)。該檔是 research/*.md 的風格契約，寫研究前**必讀**。

### 再次上榜（檔案已存在）
**不重做研究**。流程：
1. 讀既有檔 frontmatter 的 `last_updated`
2. 取 `gh api repos/{owner}/{repo}/releases` 中晚於 `last_updated` 的 release
3. 若有新 release，append 一個區塊到「## 更新紀錄」：
   ```
   ### YYYY-MM-DD
   - 新版本：vX.Y.Z（release 連結）
   - 主要變更：...
   ```
4. 若無 release（`has_releases: false`）→ 跳過 release 查詢
5. 依當日情況更新 frontmatter：
   - 若出現在絕對榜 → 於 `appearances` 陣列補今日日期
   - 若出現在增長榜 → 於 `growth_appearances` 陣列補今日日期
   - 一律更新 `last_updated`

### 研究檔 frontmatter

```yaml
---
repo: owner/repo
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]          # 每次上絕對榜補一筆
growth_appearances: [2026-04-18]   # 每次上增長率榜補一筆
has_releases: true                 # 有無 release
latest_release: v1.2.3             # 無則 null
---
```

### 全域連結規則

**提到任何 GitHub 專案名稱（包含本專案）一律用 markdown 超連結**，格式 `[owner/repo](https://github.com/owner/repo)`。日報正文、研究檔、CLAUDE.md 都適用。

## 站內連結規則（Jekyll 專用）

連到站內其他 `.md` 檔（研究檔、其他日報）**一律用 `{{ site.baseurl }}{% link %}` 組合**。Jekyll 的 `{% link %}` 只會輸出 site-relative path（`/research/xxx/`），**不會**自動加上 `baseurl`；本站 `baseurl: /github-top-10`，少了前綴就 404，所以必須手動串上 `{{ site.baseurl }}`。

```markdown
[顯示文字]({{ site.baseurl }}{% link research/obra__superpowers.md %})
```

**不要**只寫 `{% link research/xxx.md %}`——渲染出的 href 會是 `/research/xxx/`，缺 baseurl，線上 404。也**不要**用相對路徑如 `[text](research/xxx.md)`——`_posts/` 下的 post 渲染後 URL 是 `/2026/04/18/進化/`，瀏覽器會把 `research/xxx.md` 錯接成 `/2026/04/18/進化/research/xxx.md`，一樣 404。`jekyll-relative-links` plugin 無法處理這種跨目錄情境（它以**源檔位置**為基準，從 `_posts/` 找不到 `research/`）。

`{% link %}` 的好處：檔名錯 → build fail，直接抓到問題；`{{ site.baseurl }}` 則確保部署到子路徑時 URL 正確。

**外部連結**（GitHub repo、Release 頁、第三方評論）照常用 Markdown 超連結：`[owner/repo](https://github.com/owner/repo)`。

## Publishing（Jekyll + GitHub Pages）

本 repo 已設定為 Jekyll 靜態網站，push 到 `main` 後 GitHub Pages 自動 build，網址：
<https://jiangway.github.io/github-top-10/>

- `_config.yml`：minima 主題 + `jekyll-relative-links`（相對 `.md` 連結自動轉為正確的頁面 URL，寫研究檔連結時可保留 `research/xxx.md` 這種寫法）
- `_posts/`：日報放這裡，首頁（`index.md`，`layout: home`）會自動列出
- `research/`：深度研究檔，`_config.yml` 中 `defaults` 已自動套 `layout: page`，研究檔本身**不需**加 `layout` frontmatter
- 本機預覽（選用）：`bundle exec jekyll serve`（需要先 `bundle install`，尚未設置 Gemfile）

## Git

1. `git add _posts/<今日檔> research/ CLAUDE.md`（**不要** `git add .`，以免誤加 `.claude/`、`_site/`、`.jekyll-cache/`；`.gitignore` 已列出但仍建議明確 add）
2. `git commit -m "<訊息>"`
3. `git push origin main` — 觸發 GitHub Pages 重新 build，1–2 分鐘內可在上述網址看到新文章

`.claude/` 永遠不 commit（已在 `.gitignore`）。
