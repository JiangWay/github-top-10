---
repo: firecrawl/firecrawl
first_seen: 2026-11-26
last_updated: 2026-11-27
appearances: [2026-11-26, 2026-11-27]
growth_appearances: [2026-11-26, 2026-11-27]
has_releases: true
latest_release: v2.11.0
tags: [RAG 框架, 框架, 自架]
domain: RAG 框架
form: 框架
themes: [自架]
---

# [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)

> 研究日期：2026-11-26
> 研究來源：https://github.com/firecrawl/firecrawl
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) 是把網頁轉成 LLM 可吃的 markdown / 結構化 JSON 的 web data API，提供 scrape、crawl、map、search 等端點。repo description 的口號是「Knowledge infrastructure to make your agents smarter. Search, scrape and access 550+ data providers through one API.」同一個 repo 同時放雲端服務的 SDK、可自架的完整 server，以及 2026 年新增、用 Rust 寫的單一執行檔 Firecrawl Local。

## 作者與起源

Firecrawl 由 Mendable（[YC 公司頁](https://ycombinator.com/companies/mendable)）開發，repo 建立於 2024-04-15，原屬 `mendableai` 組織，現為 `firecrawl` 組織。貢獻者榜首是 nickscamara（1,914 commits）與 mogery（1,867 commits），兩人合計佔前五名貢獻者 commits 的八成以上。Mendable 原本做企業文件的 AI 問答，需要把客戶網站變成乾淨文字，爬蟲能力因此獨立成產品。[YC Launch 頁](https://www.ycombinator.com/launches/LTf-firecrawl-open-source-crawling-and-scraping-for-ai-ready-web-data) 記載上線後短時間內拿到約 8,000 stars。

repo 在 2024-04 建立後約 31 個月累積 209,736 stars，同組織另有 [firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server)（7,910 stars）。融資規模與團隊人數：資料不足（未查到可驗證的一手來源）。

## 核心架構 / 主要概念

語言組成（bytes）：TypeScript 約 10.9 MB（約 72%）、Python 1.4 MB、Rust 0.7 MB，其餘為 Java、PHP、Elixir、Go、C#、Ruby 等 SDK。`apps/` 目錄下有：

- `api`：自架 server，含 queue、worker 與 database（`nuq-postgres` 是以 Postgres 實作的 queue）。
- `playwright-service-ts`、`go-html-to-md-service`：瀏覽器渲染與 HTML 轉 markdown 的獨立服務。
- `local`：Firecrawl Local，`cargo install firecrawl-local` 安裝，可跑 scrape / crawl / map，`serve` 在 localhost:3002 提供與 v2 API 相容的端點，`init` 會替 Claude Code、Cursor、Codex 等工具寫入 MCP 設定。
- 10 種語言 SDK（js、python、go、rust、java、ruby、php、elixir、dot-net）與 `siem`、`test-site`。

主要概念是端點：Scrape（單頁）、Crawl（回傳 job ID，SDK 輪詢）、Map（列出全站 URL）、Batch Scrape、Search、Interact（對已 scrape 的頁面做瀏覽器互動）、Agent、Monitor（變更偵測）。Alexandria 是官方宣稱的 550+ 資料來源集合。repo 另有 `AGENTS.md`、`CLAUDE.md` 與多個 skills 目錄，供 coding agent 使用。

## 設計哲學

README 開頭一句話交代取向：

> "Knowledge infrastructure to make your agents smarter."

解讀：目標從「抓網頁」轉到「給 agent 吃的資料層」。README 另一句說明 Cloud 的賣點：

> "Covers 96% of the web, including JS-heavy pages and dynamic apps"

這是官方自述數字，第三方驗證見下文競品比較。設計上輸出以 token 成本為目標（markdown 取代 HTML），並以統一 API 取代各自維護的爬蟲、代理與 parser。雲端與自架刻意分層：README 的「What runs where」表列出 Interact、Agent、Monitor 只在 Cloud。

## 目標使用者與適用情境

適用：做 RAG 或 agent 的開發者，需要把文件站、部落格、商品頁轉成 markdown 進 embedding pipeline；用 MCP 讓 Claude Code、Cursor 直接查網頁；需要結構化 JSON 抽取（`deterministicJson` 格式不必每次呼叫 LLM）。

不適用：

- 需要代理輪替與強反爬蟲能力的場景。根據 [Thunderbit 評測](https://thunderbit.com/blog/firecrawl-review-and-alternatives)，自架版沒有雲端的加強代理。
- 預算敏感的大量抓取（見外部評論）。
- 要把修改後的 server 當網路服務對外販售：授權為 AGPL-3.0，需公開修改。

## 與類似專案的差異

| 對手 | 本專案的差異 | 什麼時候選誰 |
|---|---|---|
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)（87,863 stars，Apache-2.0） | Crawl4AI 是 Python library，裝在自己的環境跑；Firecrawl 是 API 服務，有 10 種語言 SDK，且有託管雲端。授權也不同（AGPL-3.0 vs Apache-2.0）。 | 要完全掌控、成本壓低、只用 Python：Crawl4AI。要託管、免維護瀏覽器與代理：Firecrawl Cloud。 |
| [firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) | 同組織的 MCP 封裝層，不是競品而是 Firecrawl 的 agent 入口；本 repo 是底層 API。 | 只想讓 agent 呼叫 Firecrawl 時直接裝 MCP server。 |

第三方比較：[Apify 部落格](https://blog.apify.com/crawl4ai-vs-firecrawl/)、[Bright Data 比較文](https://brightdata.com/blog/ai/crawl4ai-vs-firecrawl) 與 [Spider 的 1,000 URL benchmark](https://spider.cloud/blog/firecrawl-vs-crawl4ai-vs-spider-honest-benchmark/) 都出自競爭廠商，結論偏向各自產品。Spider 的測試報告 Firecrawl 成功率 95.3%、Crawl4AI 89.7%，該數字出自利益相關方，僅供參考。

## 外部評論

- 價格是最常見的抱怨。[Thunderbit 評測](https://thunderbit.com/blog/firecrawl-review-and-alternatives) 引述 Hacker News 上一位每月付約 190 美元的開發者，改用 2,700 行自寫 Elixir 取代 Firecrawl；這是轉述的單一案例，我未找到原始串。Thunderbit 本身賣競品，立場需扣分。
- [Gumloop 評測](https://www.gumloop.com/blog/firecrawl-review) 與 [eesel AI 評測](https://eesel.ai/blog/firecrawl-reviews) 提供使用心得與方案比較；Gumloop 同為相關產品廠商。細節未逐段驗證。
- [TNW 報導（2026-05-05）](https://thenextweb.com/news/firecrawl-ai-web-layer-agents?type=AI) 討論 Firecrawl 作為 agent 的網頁層，內文提到 GitHub stars 超過 10 萬；內文細節未全文查證。
- [DataCamp 教學](https://www.datacamp.com/zh/tutorial/firecrawl) 介紹 Firecrawl 的 JavaScript 渲染與 markdown 轉換，偏教學而非評價。
- [Firecrawl 官方 CrawlBench](https://firecrawl.dev/blog/crawlbench-llm-extraction) 評測 LLM 結構化抽取可靠度，屬廠商自家部落格。
- Reddit 與中文社群（Threads、PTT、iThome）：未查到可引用的原文串，資料不足。Hacker News 原始討論串：搜尋引擎未回傳直接連結，資料不足。

## Release 狀態 / 時間軸

- 2024-04-15：repo 建立。
- 2025-01-14：API 可回傳的最舊 release 為 v.1.3.0。
- 2025-10-13：v2.4.0；2025-10-30：v2.5.0；2025-11-14：v2.6.0；2025-12-05：v2.7.0（兩週到三週一版）。
- 2026-02-03：v2.8.0；2026-04-10：v2.9.0；2026-05-15：v2.10；2026-06-19：v2.11.0（最新，間隔拉長到約 5 週）。
- v2.11.0 內容：Firecrawl Research Index（3M+ arXiv 論文與關聯 GitHub 內容）、Keyless access（`/scrape`、`/search`、`/interact`、`/parse` 免 API key）、`redactPII`、`deterministicJson`、Monitor 的 `goal` 與欄位級 diff。
- 最新 release 距今（2026-11-26）約 5 個月，但 repo 最近 push 為 2026-11-25，開發仍在主幹進行。README 內的 Firecrawl Local 與 Keyless 屬主幹新增，是否已打包成 release：資料不足。

`gh api .../releases` 回傳 30 筆，總數可能不止此數。

## 授權與社群

- 授權：AGPL-3.0。SDK 與 server 在同一 repo，各子目錄是否另有授權：資料不足。
- 量化：209,736 stars、10,968 forks、923 open issues；今日（2026-11-26）+1,131 stars，增長率 0.54%。
- 貢獻者前五：nickscamara 1,914、mogery 1,867、rafaelsideguide 597、abimaelmartell 382、developersdigest 263。
- topics：ai、ai-agents、ai-crawler、web-scraping、markdown、llm 等 19 個。
- 自架與雲端的差異：自架為完整 server（API、worker、Postgres queue、Playwright），但 Interact、Agent、Monitor 與雲端的加強代理僅在 Cloud；Firecrawl Local 則是不需 database 的單機版。

## 資料來源

**本體**
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)（`gh api` repo、languages、contributors、releases、README、目錄）
- [firecrawl.dev](https://firecrawl.dev)
- [firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server)

**第三方評論**
- [Thunderbit 評測](https://thunderbit.com/blog/firecrawl-review-and-alternatives)
- [Gumloop 評測](https://www.gumloop.com/blog/firecrawl-review)
- [eesel AI 評測](https://eesel.ai/blog/firecrawl-reviews)
- [TNW](https://thenextweb.com/news/firecrawl-ai-web-layer-agents?type=AI)
- [DataCamp](https://www.datacamp.com/zh/tutorial/firecrawl)
- [YC Launch 頁](https://www.ycombinator.com/launches/LTf-firecrawl-open-source-crawling-and-scraping-for-ai-ready-web-data)、[YC 公司頁](https://ycombinator.com/companies/mendable)
- [CrawlBench](https://firecrawl.dev/blog/crawlbench-llm-extraction)

**同類工具**
- [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)
- [Apify 比較](https://blog.apify.com/crawl4ai-vs-firecrawl/)、[Bright Data 比較](https://brightdata.com/blog/ai/crawl4ai-vs-firecrawl)、[Spider benchmark](https://spider.cloud/blog/firecrawl-vs-crawl4ai-vs-spider-honest-benchmark/)

## 更新紀錄
