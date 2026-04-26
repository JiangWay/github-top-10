---
repo: PostHog/posthog
first_seen: 2026-04-25
last_updated: 2026-04-27
appearances: [2026-04-25, 2026-04-27]
growth_appearances: [2026-04-27]
has_releases: true
latest_release: agent-skills-v0.65.0
tags: [開發者工具, 應用程式, 自架, 開源替代]
domain: 開發者工具
form: 應用程式
themes: [自架, 開源替代]
---

# [PostHog/posthog](https://github.com/PostHog/posthog)

> 研究日期：2026-04-25
> 研究來源：<https://github.com/PostHog/posthog>
> 觸發原因：首次上絕對榜（2026-04-25）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[PostHog/posthog](https://github.com/PostHog/posthog) 是一個 all-in-one、開源的「產品工程師作業系統」，把 product analytics、web analytics、session replay、feature flags、A/B 實驗、surveys、error tracking、data warehouse、CDP 與 LLM analytics 全部塞進同一個 stack，目標是同時取代 Mixpanel + Amplitude + LaunchDarkly + Hotjar + Segment 這個慣常的 SaaS 組合。

## 作者與起源

由 **James Hawkins** 與 **Tim Glaser** 在 2020 年初創立，同年通過 Y Combinator W20 batch，隨即把 MVP 丟上 [Hacker News Launch HN（2020/02）](https://news.ycombinator.com/item?id=22376732)——當時定位就是「open-source product analytics」，反應極正面，4 週寫的程式直接拿到第一批使用者。Repo 自 2020-01-23 建檔，至 2026-04-25 已累積 **40,906+ commits**、150 名員工，總部位於舊金山，使用團隊據官方報導突破 19 萬。創辦人持續把 PostHog 經營成「公開到病態」的 open-startup（公開 handbook、薪資、營收、roadmap）。

## 核心架構 / 主要概念

語言比例 **Python 50.6% / TypeScript 40.1% / Rust 7.0%**，後端核心是 **Django + Celery**，事件儲存層用 **ClickHouse**（OLAP）、佇列用 **Kafka**、metadata 與設定走 **PostgreSQL**、cache 走 **Redis**，前端是 React + Kea。最大的設計取捨是「**ClickHouse-first**」——所有 funnel、retention、SQL 查詢都直接打 ClickHouse，因此即使 self-host 也能塞下億級事件。`/ee` 目錄收 proprietary code（PostHog License），其餘核心 MIT；另有 [PostHog/posthog-foss](https://github.com/PostHog/posthog-foss) 完全去除 EE 的純 FOSS 鏡像。近一年明顯往 **PostHog AI / Max** 演化：自然語言生成 dashboard、自動 summarisation、LLM analytics（traces / generations / evals），並在 repo 內以 `agent-skills-v*` 標籤每天多次發布 Claude Code / Cursor 用的 PostHog skill 包。

## 設計哲學

> "We make dev tools for product engineers."

PostHog 把使用者明確設定為「**product engineer**」——不是 PM、不是 marketer、不是 analyst，而是寫程式同時在乎成長指標的那種工程師。對應的設計選擇：(1) 把 SQL 暴露為一等公民（Mixpanel 重度依賴拖拉介面，PostHog 直接在 UI 跑 ClickHouse SQL）；(2) 一個 stack 取代多個 SaaS，宣稱可省 60–80% 工具支出；(3) open source 是定位而非附加品，self-host 與 cloud 同碼基。pricing 採 freemium + usage-based：1M events / 5K replays / 1M flag requests 全免費，[官方聲稱 98% 客戶完全免費使用](https://posthog.com/)。

## 目標使用者與適用情境

適合：(1) 技術 founding team 的 seed / Series A 新創，要一次拿到 analytics + replay + flags + experiments；(2) 受 GDPR / 資料主權限制、必須 EU host 或 self-host 的歐洲團隊；(3) 已導入 LLM 產品、想用 LLM analytics 追 cost / latency / eval 的 AI startup。**不適合**：(1) 只要單純 web pageview 的網站，[Plausible](https://github.com/plausible/analytics) / [Umami](https://github.com/umami-software/umami) 更輕；(2) 需要 marketing-team 友善 UI 與 multi-touch attribution 的成長團隊，Amplitude 更成熟；(3) 沒有 DevOps 量能的小團隊想 self-host——官方自承「[We've literally never seen the self-hosting math work out](https://posthog.com/docs/self-host)」，self-host 需要 ClickHouse + Kafka + Postgres + Redis 全套運維。

## 與類似專案的差異

| 對手 | PostHog 的差異 | 何時選對方 |
|---|---|---|
| **Mixpanel** | 多 5 條產品線（replay / flags / experiments / surveys / warehouse），SQL 一等公民，可 self-host | 純行為分析 + 非技術 PM 自助、要 Signal 自動歸因時選 Mixpanel |
| **Amplitude** | 開源、價格透明、AI 助理走產品端而非分析端 | 需要 Predictive Cohorts / 多觸點歸因 / 企業合規時選 Amplitude |
| **Heap** | autocapture 之外另含 replay + flags 同 stack | 純 autocapture + 自動 insight 偏好 Heap |
| **GA4** | 事件保留無上限、可 SQL、UI 比 GA4 直觀許多 | 純 SEO/廣告歸因、預算為零時 GA4 仍是預設 |
| **[plausible/analytics](https://github.com/plausible/analytics)** | 功能廣度高一個量級，但部署也重一個量級 | 只要 cookieless web 統計、要 1 分鐘上線時選 Plausible |

PostHog 的真正護城河不在任何單一功能，而在「**5 個工具 1 個 SDK 1 個 schema**」帶來的整合性——session replay 可直接連到觸發 feature flag 的那一筆 event，這是分散式 SaaS 組合做不到的。

## 外部評論

- [Hacker News — Posthog: open-source analytics and UX research tool（2024/06，#40564345）](https://news.ycombinator.com/item?id=40564345)：社群肯定 PostHog 把 5 件事整在一起的價值，但也質疑 cloud 與 OSS 的功能差距正在擴大。
- [Hacker News — Launch HN: PostHog (YC W20)（2020/02，#22376732）](https://news.ycombinator.com/item?id=22376732)：原始發表貼文，HN 一面倒正面，4 週 MVP 取得首批 1,000 用戶。
- [Hacker News 留言串 #43920444](https://news.ycombinator.com/item?id=43920444)：「PostHog is pretty good but very pushy towards using their SaaS」——用戶反映文件與安裝體驗都在引導去用 cloud。
- [Userpilot — I Tested Top PostHog Alternatives for Product Teams in 2026](https://userpilot.com/blog/posthog-alternatives/)：肯定免費額度與 SQL，但點名 UX 對非技術人員偏陡。
- [Brainforge — Amplitude vs Mixpanel vs PostHog](https://www.brainforge.ai/resources/amplitude-vs-mixpanel-vs-posthog)：PostHog 適合「技術 founding team + 想要開源 all-in-one 套件」。
- [Coders Stop — Self-Hosted Analytics: PostHog vs Plausible vs Umami](https://medium.com/@coders.stop/setting-up-self-hosted-analytics-posthog-plausible-umami-comparison-ac4e7e826486)：self-host PostHog 部署最重，但功能廣度也最大。
- [OpenPanel — Best PostHog Alternatives in 2026](https://openpanel.dev/compare/posthog-alternative)：對 PostHog event-based 計價在規模化後的成本提出實測比較。
- [Toksta — PostHog Review 2025（含 Reddit 情緒彙整）](https://www.toksta.com/products/posthog)：Reddit 用戶整體正面，主要抱怨集中在 self-host 維運門檻。

## Release 狀態 / 時間軸

有 release，且**節奏極端密集**——光是 2026-04-21 ~ 2026-04-24 4 天內就發了 16 個 `agent-skills-v*` tag（每日多次發布 Claude Code 用的 PostHog skill 包），最新是 [agent-skills-v0.65.0](https://github.com/PostHog/posthog/releases/tag/agent-skills-v0.65.0)（2026-04-24）。`posthog-cli/v0.7.10` 是 CLI 通道最新（2026-04-23）。需要注意：PostHog 主程式採 trunk-based 持續部署到 cloud，**不掛傳統 semver 主版本 tag**，所以「latest_release」只能反映子產物的版本。建 repo 於 2020-01-23，登 HN 於 2020-02，Y Combinator W20 畢業，2026-04-25 首登 GitHub Trending Top 10。

## 授權與社群

License `Other`（核心 MIT + `/ee` 為 PostHog License + 鏡像 [PostHog/posthog-foss](https://github.com/PostHog/posthog-foss) 為純 FOSS 版）。**33,013 stars / 2,579 forks / 128 subscribers / 3,671 open issues / 40,906+ commits**；topics 涵蓋 `product-analytics`、`session-replay`、`feature-flags`、`ab-testing`、`experiments`、`data-warehouse`、`cdp`、`ai-analytics`。商業母公司 PostHog Inc. 為 YC W20 校友，提供 US / EU 雙區 cloud；issue / PR 數量級顯示日均開發強度遠高於一般 OSS 專案。

## 資料來源

**本體**
- <https://github.com/PostHog/posthog>
- <https://posthog.com/>
- `gh api repos/PostHog/posthog`
- `gh api repos/PostHog/posthog/releases`

**第三方評論**
- [Hacker News #22376732 — Launch HN](https://news.ycombinator.com/item?id=22376732)
- [Hacker News #40564345](https://news.ycombinator.com/item?id=40564345)
- [Hacker News #43920444](https://news.ycombinator.com/item?id=43920444)
- [Userpilot — PostHog Alternatives 2026](https://userpilot.com/blog/posthog-alternatives/)
- [Brainforge — Amplitude vs Mixpanel vs PostHog](https://www.brainforge.ai/resources/amplitude-vs-mixpanel-vs-posthog)
- [Coders Stop — Self-Hosted Analytics 比較](https://medium.com/@coders.stop/setting-up-self-hosted-analytics-posthog-plausible-umami-comparison-ac4e7e826486)
- [OpenPanel — PostHog Alternatives](https://openpanel.dev/compare/posthog-alternative)
- [Toksta — PostHog Review 2025](https://www.toksta.com/products/posthog)
- [Y Combinator — PostHog 公司頁](https://www.ycombinator.com/companies/posthog)

**同類工具**
- [mixpanel/mixpanel-js](https://github.com/mixpanel/mixpanel-js)
- [amplitude/Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)
- [plausible/analytics](https://github.com/plausible/analytics)
- [umami-software/umami](https://github.com/umami-software/umami)
- [matomo-org/matomo](https://github.com/matomo-org/matomo)
- [PostHog/posthog-foss](https://github.com/PostHog/posthog-foss)

## 更新紀錄

- **2026-04-25（首次上榜）**：完成首次完整深度研究。

### 2026-04-27
- **中斷一日後回榜**（4/26 跌出 Top 10，今日重返絕對榜 #8、首次進增長率榜 #7）。stars_today +338，總 stars 33,011 → 33,755（兩日內 +744），growth_rate 1.00%。
- 無新主要 release：`gh api repos/PostHog/posthog/releases` 列表中 4/25 後無新版本，仍維持 `agent-skills-v0.65.0`（2026-04-24）為最新；trunk-based CD 子產品 channel 持續每日發版但未在 GitHub Release 標記。
- 觀察：YC W20 老牌平台首次連續上榜（雖中斷一日），佐證「資安單日 3 檔退潮、開發者工具填補」的趨勢輪替。

<!-- append future re-appearances here -->
