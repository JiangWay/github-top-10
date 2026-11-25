---
repo: mvanhorn/last30days-skill
first_seen: 2026-11-26
last_updated: 2026-11-26
appearances: [2026-11-26]
growth_appearances: [2026-11-26]
has_releases: true
latest_release: v4.6.0
tags: [情報監測, Skill 外掛, 資料主權]
domain: 情報監測
form: Skill 外掛
themes: [資料主權]
---

# [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)

> 研究日期：2026-11-26
> 研究來源：https://github.com/mvanhorn/last30days-skill
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) 是一個 agent skill，輸入任何主題（人物、公司、產品、「X vs Y」），它會平行搜尋 Reddit、X、YouTube、TikTok、Hacker News、Polymarket、GitHub 與網路，依互動數（upvotes、likes、押注金額）排序，再由 LLM 合成一份近 30 天的簡報。README 的口號是「An AI agent-led search engine scored by upvotes, likes, and real money - not editors」。repo description 寫的是 "researches any topic across Reddit, X, YouTube, HN, Polymarket, and the web"。

分類上取「情報監測」而非「開發者工具」：README 的使用情境（會議前查人、查公司動向、旅遊前查園區狀態、Polymarket 賠率）以多平台輿情聚合為主，不限於寫程式。形態是 Skill 外掛。

## 作者與起源

作者 Matt Van Horn（GitHub `mvanhorn`），GitHub 帳號建於 2010-10，個人簡介自述共同創辦 June（智慧烤箱，被 Weber 收購）與後來成為 Lyft 的公司，帳號 followers 約 6,400、public repos 3,509（`gh api users/mvanhorn`）。這些履歷來自作者自述，未另行查證第三方報導。

repo 建於 2026-01-23，第一個 commit 訊息是「Use user's exact terminology, don't add outdated tech names」，屬於 prompt 修飾層級。README 的「Why this exists」自述動機：AI 領域每天都在變，Reddit 與 X 的使用者總是最先知道，而模型訓練資料落後社群數月，所以他做這個工具來查最新的 prompt 技巧，之後延伸到業務會議、旅遊與競品調查。

貢獻者前幾名：mvanhorn 565 次、tmchow 350 次、iliaal 149 次，另有 dependabot（78）與 github-actions（46）。README 註明 v3 engine 架構由 [@j-sperling](https://github.com/j-sperling) 提供。

## 核心架構 / 主要概念

- **形態**：同一份 `skills/last30days/SKILL.md` 配多種封裝。repo 根目錄含 `.claude-plugin`、`.codex-plugin`、`.grok-plugin`、`gemini-extension.json`、`mcp/`、`AGENTS.md`、`CLAUDE.md`，支援 Claude Code marketplace、`npx skills add`（Codex、Cursor、Copilot、Gemini CLI 等 50+ Agent Skills 宿主）、claude.ai 上傳 `.skill`、Claude Desktop `.mcpb`、OpenClaw。
- **語言組成**：Python 約 12.99 MB（絕大多數）、HTML 250 KB、Go 226 KB、Shell 22 KB、JavaScript 14 KB。Go 部分對應 `*-pp-cli` 類 CLI 與 MCP bundle。
- **流程（README「How it works」）**：解析主題（找 X handle、GitHub repo、subreddit、YouTube 頻道）→ 多查詢展開並平行搜尋 → 依互動、相關性、新鮮度評分 → 同一事件跨平台合併成 cluster → 由宿主 agent 合成並附引用。入口是 `scripts/last30days.py`，另有 `watchlist.py`（排程監測）、`store.py`（SQLite 累積）、`briefing.py`。
- **v4 新功能**：公司主題會讀當月美國專利申請與公司職缺頁，標出「Secret Signals」；Polymarket 賠率與 Yahoo Finance 股價各佔一行；Reddit 可在使用者同意下以登入帳號搜尋。
- **資源需求**：Reddit、HN、Polymarket、GitHub、StockTwits、專利與職缺頁免 key；X 需 `X_BEARER_TOKEN` 或瀏覽器登入；YouTube 需 `yt-dlp`；TikTok、Instagram、Threads、Pinterest、LinkedIn 走 ScrapeCreators（10,000 次免費，之後 PAYG）；網路搜尋用 Brave（每月 2,000 次免費）。

## 設計哲學

README 開場即是核心主張：

> "Google aggregates editors. /last30days searches people."

意思是：Google 排的是編輯與 SEO 的結果，這個工具排的是真人互動。另一段說明資料壁壘：

> "Each platform is a walled garden with its own API, its own tokens, its own auth. But you can bring your own keys and browser sessions, and suddenly an AI agent can search all of them at once."

解讀：它不自建索引，而是讓使用者自帶 key 與登入狀態，由 agent 橋接各平台。「Data handling」段寫明預設全部在本機執行，只有使用者啟用的搜尋 API 與（選用的）reranking provider 會收到主題與片段，`LAST30DAYS_STORE=1` 才會寫本機 SQLite。這是主題取「資料主權」的依據；README 同時聲明「No tracking. No analytics.」。

## 目標使用者與適用情境

- **適用**：會議或銷售電話前查人與公司近況；追蹤某技術或工具的社群風向；找近期有效的 prompt 技巧；用 `vs` 比較工具；topic-less discovery 模式找出正在升溫的話題；用 `--store` 與 watchlist 做定期趨勢監測。
- **不適用**：需要 30 天以外歷史的研究（時間窗固定）；沒有任何 key 又需要 X、TikTok 資料的情境（無 key 只剩 Reddit、HN、Polymarket、GitHub 等，TikTok 退為 yt-dlp、結果較少且無留言）；需要可稽核學術引用的場合（來源以社群貼文為主，品質取決於平台與合成模型）。
- **成本**：付費部分取決於使用者自選的 ScrapeCreators、Brave、Perplexity 與 LLM 額度。

## 與類似專案的差異

| 對手 | 定位 | last30days-skill 的差異 | 什麼時候選誰 |
|---|---|---|---|
| [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher)（約 30.9k stars） | 自主研究 agent，以網頁來源產生帶引用的長篇研究報告 | 時間窗固定 30 天，來源是社群平台與預測市場，排序依據是互動數；形態是掛進現有 agent 宿主的 skill，不是獨立應用 | 要一份廣泛、可引用的網頁研究報告選 gpt-researcher；要「這個月社群怎麼說」選 last30days |
| 通用網路搜尋（Google、Perplexity） | 以編輯與 SEO 為主的結果 | 直接讀 Reddit 留言、X 貼文、YouTube 逐字稿、Polymarket 賠率 | 查官方資料與長期事實用搜尋引擎；查近期輿論用本專案 |

Perplexity 也被整合為本專案的一個來源（Agent API 與 Search API），所以兩者是上下游關係，不全是競品。

## 外部評論

本次以 WebSearch 查 Hacker News、Reddit 與部落格，未見獨立的第三方評測或 HN / Reddit 討論串，資料不足。已查到的第三方頁面皆為目錄或鏡像站，內容多為 repo 摘要：

- [Enterprise DNA 技能目錄](https://enterprisedna.co/directories/skills/last30days)：列為「尚未審查」，並有自動產生的註記指出程式碼多處呼叫 x.ai；該註記非人工安全稽核。
- [Claude Marketplaces 頁面](https://claudemarketplaces.com/skills/mvanhorn/last30days-skill)：目錄列表，搜尋摘要顯示的安裝數與 stars 數字在不同站點不一致，僅供參考。
- [mcpservers.org 技能頁](https://mcpservers.org/ja/agent-skills/mvanhorn/last30days)：repo 鏡像。部分鏡像頁含針對模型的指令文字，不宜視為權威。
- README 自己的「What people are saying」段引用 @itswilsoncharles 與 @yieldhunter95 的推文，但 README 未附原文連結，本檔不採信為獨立來源。

中文社群的搜尋沒有取得可引用的結果，資料不足。

## Release 狀態 / 時間軸

有 GitHub Release，共 30 筆（第一頁結果），最新為 v4.6.0。

| 日期 | 事件 |
|---|---|
| 2026-01-23 | 建立 repo |
| 2026-02-17 | v2.1.0（可取得的最早 release） |
| 2026-03-03 / 03-04 | v2.6.0、v2.8.0 |
| 2026-11-09 / 11-10 | v3.32.0、v3.33.0、v3.33.1 |
| 2026-11-16 至 11-17 | v4.2.0、v4.2.1、v4.3.0、v4.3.1、v4.3.2（兩天內 5 版） |
| 2026-11-20 / 11-21 / 11-22 | v4.4.0、v4.5.0、v4.6.0 |

11 月 9 日到 22 日兩週內發了 11 個版本，v3 到 v4 的主版本跳躍也落在這段期間。release 是否由 CI 自動發版，資料不足；`github-actions[bot]` 有 46 次 commit，不排除部分版本由自動化產生。

## 授權與社群

- **License**：MIT。
- **量化數字**（2026-11-26）：74,912 stars、6,599 forks、31 個 open issues；contributors 前三名為 565、350、149 次 commit。
- **stars 增長速率**：從 2026-01-23 到 2026-11-26 共 307 天，日均約 244 stars；今日 +950，約為日均的 3.9 倍，growth_rate 1.27%。
- **Topics**：agent-skills、osint、polymarket、reddit、twitter、youtube、tiktok、instagram、llms、nlp、golang、python3 等 20 個。
- **維護節奏**：最後 push 為 2026-11-25；README 提供 10 種語言版本（含 zh-CN）。
- **社群**：作者經營 X 帳號 @slashlast30days，另有 issue #532 作為使用者分享研究 feed 的 showcase 串。

## 資料來源

- **本體**
  - [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)（repo、README、releases、`gh api` 數據）
  - [作者 GitHub 頁](https://github.com/mvanhorn)
  - [Showcase issue #532](https://github.com/mvanhorn/last30days-skill/issues/532)
- **第三方評論**
  - [Enterprise DNA](https://enterprisedna.co/directories/skills/last30days)
  - [Claude Marketplaces](https://claudemarketplaces.com/skills/mvanhorn/last30days-skill)
  - [mcpservers.org](https://mcpservers.org/ja/agent-skills/mvanhorn/last30days)
- **同類工具**
  - [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher)

## 更新紀錄
