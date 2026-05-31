---
repo: D4Vinci/Scrapling
first_seen: 2026-05-06
last_updated: 2026-05-31
appearances: [2026-05-06, 2026-05-31]
growth_appearances: [2026-05-06, 2026-05-31]
has_releases: true
latest_release: v0.4.8
tags: [開發者工具, 框架, 開源替代]
domain: 開發者工具
form: 框架
themes: [開源替代]
---

# D4Vinci/Scrapling

## 深度研究（2026-05-06 首次）

### 專案定位

[D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) 把自己定位成「自適應（adaptive）Web 爬蟲框架」，主打三件事：抓得快、抓得隱形、抓得長久——所謂長久指的是即使目標站重構 DOM、變更 class，爬蟲也不會立刻崩。專案 2024-10 開源，至今累積 44,990 stars、4,146 forks，授權為 BSD 3-Clause，主要語言 Python。GitHub topics 涵蓋 `ai-scraping`、`crawler`、`mcp-server`、`stealth`、`playwright`、`xpath`，定位介於傳統 [scrapy/scrapy](https://github.com/scrapy/scrapy) 與新一代 LLM-ready 爬蟲（如 [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)）之間。

### 核心架構 / 主要概念

依據 [README](https://github.com/D4Vinci/Scrapling) 與 [官方文件](https://scrapling.readthedocs.io/en/latest/index.html)，框架分四層組件：

- **Parser（自適應選擇器）**：核心賣點。對選定元素建立「指紋」存檔；當網站結構變動，重跑時加 `adaptive=True`，Parser 會以相似度比對重新定位元素並回傳最高分候選——作者稱為 Smart Element Tracking，[Medium 上的設計筆記](https://medium.com/@d4vinci/creating-self-healing-spiders-with-scrapling-in-python-without-ai-web-scraping-4042a16ec4a5)說明這種 self-healing 是純演算法、沒有 LLM。基準上 parser 與 Parsel/Scrapy 相當（5,000 個巢狀元素文字擷取 2.02ms vs 2.04ms），對 BeautifulSoup 系列快兩到三個數量級。
- **三段式 Fetcher**：
  - `Fetcher`（HTTP）——含瀏覽器指紋偽裝、TLS 指紋偽造、HTTP/3。
  - `StealthyFetcher`——headless 瀏覽器自動化，內建 Cloudflare Turnstile bypass（`solve_cloudflare=True`）。
  - `DynamicFetcher`——以 Playwright Chromium 跑 JS-heavy 站。
  三者共用 session、proxy rotation、async 介面。
- **Spider 框架**：類 Scrapy API（`start_urls` + async `parse()`），支援 per-domain throttling、checkpoint pause/resume、多 session 路由（依 ID 把 request 分配給 HTTP/Stealth/Dynamic 不同 fetcher）。
- **MCP Server**：[官方 MCP 文件](https://scrapling.readthedocs.io/en/latest/ai/mcp-server.html)說明可由 Claude、Cursor 對話式呼叫，並允許先用 CSS selector 取出片段再丟給 LLM——以省 token 為訴求。

安裝最小依賴 Python 3.10+，`pip install "scrapling[all]"` 之後跑 `scrapling install` 抓瀏覽器；可選 extras 包含 `[fetchers]`、`[ai]`（MCP）、`[shell]`（IPython 互動殼）。

### 目標使用者

文件與外部評測（[ScrapingBee 介紹](https://www.scrapingbee.com/blog/scrapling-adaptive-python-web-scraping/)、[Apify 評測](https://use-apify.com/blog/scrapling-python-web-scraping-framework)）指向兩類人：(1) 既有用 Scrapy/Parsel、被 selector 維護成本拖垮的工程師——adaptive selector 能直接降低 spider 失效率；(2) 需要繞過 Cloudflare/反爬機制、又不想自己拼接 stealth Playwright 套件的個人開發者與小型情報團隊。文件強調「92% 測試覆蓋、type hints 全覆蓋、被數百名爬蟲工程師日常使用一年」（見 [README](https://github.com/D4Vinci/Scrapling)），論調走「production-ready、不是玩具」這條。MCP server 又把它推向第三類受眾：把本地 LLM/Agent 當瀏覽器用、需要乾淨抓取層的人。

### 與類似專案的差異

- vs [scrapy/scrapy](https://github.com/scrapy/scrapy)：Scrapy 自 2008 年是 Python 爬蟲事實標準，吃 Twisted、純 HTTP、靜態頁王者；但對 JS 站、anti-bot、selector 漂移都得靠插件補。Scrapling 把 stealth、瀏覽器、self-healing 收成單一框架，[ScrapeOps 2026 報告](https://scrapeops.io/web-scraping-playbook/best-ai-web-scraping-tools/)直接稱 Scrapling 為「best adaptive parser, resilient to DOM drift and class changes」。
- vs [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)：crawl4ai 主打「LLM-ready Markdown/JSON 輸出 → 喂 RAG」，是 AI-first；Scrapling 的 MCP 是 add-on，本體仍是傳統 selector + spider 思路。[Firecrawl 2026 開源爬蟲評測](https://www.firecrawl.dev/blog/best-open-source-web-scraping-libraries) 把兩者並列但定位互補：crawl4ai 給 RAG pipeline，Scrapling 給「需要結構化欄位且不想被 anti-bot 擋」的場景。
- 對位的微型工具：AutoScraper（被 Scrapling 自家 benchmark 定位為慢 5×）、PyQuery、Selectolax 屬同族 parser；Cloudflare bypass 維度則對標 [sarperavci/CloudflareBypassForScraping](https://github.com/sarperavci/CloudflareBypassForScraping) 等單功能腳本，Scrapling 把 bypass 內建在 StealthyFetcher 一行 flag。

### 外部評論

- [Scrapling: Fast, Adaptive Web Scraping for Python（Hacker News 討論）](https://news.ycombinator.com/item?id=41832425)——專案早期登 HN，討論集中在 self-healing 是否只是「玄學的相似度比對」、和已有 lxml/Parsel 的差距。
- [ScrapingBee 撰文](https://www.scrapingbee.com/blog/scrapling-adaptive-python-web-scraping/)：稱 Scrapling 是「fast Python web scraping library with adaptive element tracking, stealth fetchers, and browser support」，肯定其在 selector 維護成本上的價值。
- [Apify 部落格 2026](https://use-apify.com/blog/scrapling-python-web-scraping-framework)：稱為「The Adaptive Python Web Scraping Framework You Should Know in 2026」。
- [Techstrong.ai 報導](https://techstrong.ai/features/openclaw-users-are-using-scrapling-to-bypass-cloudflare-and-other-anti-bot-systems/)：點名 OpenClaw 用戶以 Scrapling 為 Cloudflare bypass 引擎。
- [Matteo Giardino 部落格](https://matteogiardino.com/en/blog/free-internet-local-ai-scrapling-ollama-mcp)：示範把 Scrapling MCP 接到本機 Ollama 當 free-internet plugin，是 MCP 場景代表性實作。
- [PyShine 文章](https://pyshine.com/Scrapling-AI-Powered-Adaptive-Web-Scraping/)：強調 Scrapling 的 MCP 「是少數允許先選 element 再送進 LLM」以省 token。
- [Solana Levelup, Medium 2026-03](https://medium.com/@gemQueenx/unlocking-adaptive-web-scraping-power-with-scrapling-in-python-efa9404c9a74)、[Dark Web Informer](https://darkwebinformer.com/scrapling-an-adaptive-web-scraping-framework-that-handles-everything-from-single-requests-to-full-scale-crawls/)：屬於工具盤點型介紹，重複官方賣點、未發現獨立批判性測評。
- [DEV 社群 2026 Python 爬蟲庫盤點](https://dev.to/yasser_sami/best-python-web-scraping-libraries-for-2026-5bfn)、[Slashdot Crawl4AI vs Scrapy 比較](https://slashdot.org/software/comparison/Crawl4AI-vs-Scrapy/)：把 Scrapling 視為「介於 Scrapy 與 AI-first crawler 中間的折衷選項」。

整體外部聲量集中在英文 SEO 部落格與評測站，HN 討論度尚淺，中文社群可見的二手介紹尚未成氣候——對「adaptive selector 真的能在生產環境長期撐住」的獨立驗證仍偏少，自家 benchmark 為主。

### Release 狀態

`has_releases: true`，最新版本為 [v0.4.7](https://github.com/D4Vinci/Scrapling/releases/tag/v0.4.7)（2026-04-17 發布，由 GitHub Actions bot 推送）。release notes 自稱「focused update bringing eyes to your AI agents」，主軸是強化 MCP / AI agent 在抓頁面後的視覺輔助流程。整體 release 節奏密集（公開資料顯示 2024-10 開倉以來累積近 38 個 release），維護活躍度高。

### 授權與社群

授權為 BSD 3-Clause，對商用與閉源整合友善。Repo 預設分支 `main`，open issues 僅 5（對近 4.5 萬 stars 的專案而言相當低，可能有積極清理 issue 的策略），開啟 Discussions。貢獻者集中度極高：作者 [@D4Vinci](https://github.com/D4Vinci)（Karim Shoair）獨佔 1,363 commits，第二名 [@AbdullahY36](https://github.com/AbdullahY36) 僅 10 commits，其餘多為個位數，屬於典型「single-maintainer 專案」——優點是路線一致、缺點是 bus factor 為 1。文件站 [scrapling.readthedocs.io](https://scrapling.readthedocs.io/en/latest/index.html) 同步維護中、英、西、德、阿、簡中六語版本（[簡中 README](https://github.com/D4Vinci/Scrapling/blob/main/docs/README_CN.md)），對華語使用者友善度高於多數同類框架。

## 更新紀錄

### 2026-05-31
- 隔 25 天從 2026-05-06 後再度歸隊（絕對榜 #3，stars_total 56,188，stars_today +639，growth_rate 1.14%；增長率榜 #8）為本檔第 2 次上榜
- 期間新版：[v0.4.8](https://github.com/D4Vinci/Scrapling/releases/tag/v0.4.8)（2026-05-11，晚於前次 last_updated 的 v0.4.7 / 4-17）
- 觀察：stars 自 5-06 首登時量級擴張至 56,188，25 天區間維持長尾擴散；今日為「整片榜單換血」中唯一一檔**非首登的回歸專案**，其餘 9 檔皆首次上榜
