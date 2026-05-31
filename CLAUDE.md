# CLAUDE.md

> 重要: 一率使用繁體中文
> This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repo is the output directory for the `github-top-10` scheduled task (defined in `~/.claude/scheduled-tasks/github-top-10/SKILL.md`). Each run produces one daily markdown report of GitHub's top-10 trending projects. There is no build, no tests, no app code — the "product" is the daily `.md` file.

## 寫作守則（反 AI 寫作）

所有 `_posts/` 與 `research/` markdown 輸出，**完成前內部走一遍 [.claude/skills/avoid-ai-writing](.claude/skills/avoid-ai-writing/) 的 P0+P1 quick pass**。本檔已內化以下高頻雷區，無需重讀 skill 全文（除非處理特殊情境）。

排程 prompt 的主要意圖是「抓榜 + 生成日報」，Forced Skill Activation hook 不會自動掃到寫作 skill（skill description 鎖在「remove AI patterns」這類顯式請求）。這條規則把寫作品質檢查內化進每次輸出，避免日報落入 AI 公式句。

### 必檢清單（中文寫作高頻 AI 模式）

| 類別 | AI 寫法（避免） | 改寫方向 |
|---|---|---|
| 吹捧詞 | 強大、靈活、先進、業界領先、現代化 | 具體事實（stars、版本、commit 頻率） |
| 空洞 -ing | 強調…、展現…、彰顯…、凸顯… | 具體動作（整合 X、替換 Y） |
| 動詞代用 | 作為、象徵、體現 | 「是」「做」「有」 |
| 誇大評價 | 劃時代、革命性、里程碑、破天荒 | 描述具體變化 |
| 未來結語 | 拭目以待、未來可期、值得期待、前景看好 | 可證偽預測或刪除 |
| 避實就虛堆疊 | 「可能會」+「或將」+「有望」連用 | 擇一 |
| 假對比形容詞 | 真正的 X、實質的 Y、真實的 Z | 點名被對比的對象 |
| 負面排比 | 不只是 X，更是 Y | 一句正面陳述 |
| vague attribution | 社群普遍認為、業界看好、外界評論 | **必附來源超連結**（已是研究檔守則） |
| em dash 過用 | 中文「——」每千字 ≤ 1 | 改逗號或斷句 |
| 旅遊文宣化 | 蓬勃發展、百花齊放、方興未艾 | 具體數字或刪除 |
| 三段式強迫 | 「A、B、C」三項 | 用兩項或四項 |

### 不修飾的例外

- **技術名詞**保留不換詞：framework、kernel、Skill、MCP server、agent、RAG、embedding、kv cache、Trainer 等
- **既有風格的歷史紀錄段**（「連 N 日守榜」「首例」「歷來首見」）視為事實陳述，不視為吹捧——前提是同句附上實際數字或日期
- **第二輪審計**：改寫後重讀「一句話總結」與「每日一字」段，這兩段最容易在第一輪改寫後仍留 AI 殘餘

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
tags: [AI Agent 框架, 框架, 多代理編排]   # 扁平 tag 清單 = domain + form + themes
domain: AI Agent 框架              # 軸 A：領域（必填，單值，見 Tag taxonomy）
form: 框架                         # 軸 B：形態（必填，單值）
themes: [多代理編排]                # 軸 C：屬性主題（0–3 個，可省略）
---
```

## Tag taxonomy

每篇 post 與每份 research 都必須掛 tag，分類、知識圖譜以此為依據。三軸皆採 **controlled vocabulary**——擴充新 tag 前先改這份表；不得臨場造字。

### 軸 A — `domain`（必填，單值）
專案「做什麼」的最高層分類。15 類：
- `AI Agent 框架` — agent 編排、自主工作流、多代理系統
- `LLM 客戶端` — chat 客戶端、IDE 整合、桌面 / Linux port
- `LLM 訓練` — 訓練腳本、資料集工具、SFT/RLHF pipeline
- `LLM 基礎建設` — GPU kernel、量化、推理引擎、serving
- `MCP 協定` — MCP server、瀏覽器自動化整合層
- `資安` — 資安工具、逆向、威脅分析、檔案偵測
- `遠端桌面` — remote desktop、VPN、網路穿透
- `語音與多媒體` — TTS/STT、音訊處理、影音生成
- `企業治理` — 架構治理、合規、供應商管理、EA
- `教學資源` — 課程、教材、tutorial 合集
- `硬體` — 可攜裝置、穿戴、edge device
- `金融科技` — 交易終端、量化工具、行情 / 分析平台、經濟資料工具
- `文件管理` — DMS、OCR 文件歸檔、掃描 / 索引 / 全文檢索類工具
- `網路工具` — DNS 過濾 / ad-block、代理 / 穿牆 / 網路穿透框架、封包處理、網路層自架基礎建設
- `情報監測` — OSINT 儀表板、地緣政治 / 新聞聚合、即時態勢感知、情資平台
- `RAG 框架` — 檢索增強生成框架、向量庫整合、文件切塊與 embedding pipeline、GraphRAG / 多模態 RAG
- `行動應用` — iOS / Android app、jailbreak tweak、手機端 mod、Theos / Cydia 生態、行動平台增強工具
- `開發者工具` — shell / runtime / 編譯器 / CLI 開發套件等**不屬於 AI/LLM 生態**的通用開發者工具（例如 PowerShell、Deno、rustup）

### 軸 B — `form`（必填，單值）
「是什麼樣的產物」。7 類：
- `框架` — SDK / library / runtime
- `應用程式` — GUI app / CLI tool / 完整產品
- `Skill 外掛` — Claude Code Skill、VS Code extension、類似擴充
- `Kernel` — 低層 compute / runtime（GPU kernel、kv cache 等）
- `MCP Server` — 實作 MCP 協定的 server
- `課程教材` — tutorial notebook / slide / repo
- `硬體裝置` — 實體硬體產品、BOM 開源

### 軸 C — `themes`（可選，0–3 個陣列）
跨領域共享的屬性，知識圖譜關聯時最有用。6 類：
- `自架` — 強調 self-hosted / on-prem
- `資料主權` — local-first、資料不離境、自備 API key
- `自進化` — self-evolving agent / prompt 自動演化
- `開源替代` — 開源 drop-in alternative to proprietary
- `多代理編排` — multi-agent orchestration
- `企業級` — 企業採購導向、合規 / SSO / RBAC

### 扁平 `tags`
`tags` 欄位 = `[domain, form, ...themes]` 的串接，方便前端 JSON 與 liquid 統一遍歷；**寫入時要保持與三軸欄位一致**（手寫易錯，建議用腳本或機械展開）。

### Post 的 tag
日報本身不屬於某種 `form`，只掛 `tags`，取當日主要涵蓋的 2–4 個 domain：

```yaml
tags: [LLM 客戶端, AI Agent 框架, 遠端桌面, LLM 基礎建設]
```

### 新 tag 規則
出現現有 vocabulary 涵蓋不到的專案時：
1. **先試**將 domain 擴解為既有類別（例如純 MLOps 工具可落在 `LLM 基礎建設`）
2. 若確實需要新類別，**先改 `CLAUDE.md` 的 controlled vocabulary**，再回填到該次研究檔
3. 新增 domain 時記得同步更新首頁 `/tags/` 索引頁能正確分組（該頁直接以 `site.pages.domain` 分組）

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
