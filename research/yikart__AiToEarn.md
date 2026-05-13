---
repo: yikart/AiToEarn
first_seen: 2026-05-12
last_updated: 2026-05-14
appearances: [2026-05-12, 2026-05-14]
growth_appearances: [2026-05-12, 2026-05-14]
has_releases: true
latest_release: v2.1.0
tags: [AI Agent 框架, 應用程式, 多代理編排, 開源替代]
domain: AI Agent 框架
form: 應用程式
themes: [多代理編排, 開源替代]
---

# [yikart/AiToEarn](https://github.com/yikart/AiToEarn)

> 研究日期：2026-05-12
> 研究來源：https://github.com/yikart/AiToEarn
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[yikart/AiToEarn](https://github.com/yikart/AiToEarn)（中文品牌「爱团团」）是一套以**「創作 → 分發 → 互動 → 變現」四個 AI Agent** 為骨架的開源自媒體運營平台，把抖音、小紅書、視頻號、快手與 TikTok、YouTube、Instagram、X、LinkedIn 等 12+ 平台的帳號收進同一個 Electron 桌面殼，並透過 MCP 協定讓 [Claude Code](https://github.com/anthropics/claude-code)、Cursor 等 AI 助理也能呼叫其發布鏈。

副標：定位接近**「自媒體版的 [n8n-io/n8n](https://github.com/n8n-io/n8n) + [Hootsuite](https://www.hootsuite.com/) 開源替代品」**，但本身另外把內容交易市集（CPS/CPE/CPM）做進產品。

## 作者與起源

維護者是 GitHub 組織 [yikart](https://github.com/yikart)，組織 ID 顯示於 2025 年 2 月註冊，repo 於 **2025-02-24** 建立，當天到 2026-05-12 累積約 10,603 stars / 1,988 forks / 381 subscribers / 6 open issues。對外品牌站雙線經營：海外 [aitoearn.ai](https://aitoearn.ai/) 走任務市集（接案 / 派單），中國境內 [aitoearn.cn](https://aitoearn.cn/) 走「爱团团」自媒體工具線。

主力提交者依貢獻量：`gaozhenqiang`（616 commits）、`niuwenzheng`（439）、`gao1234-prog`（139）、`whh2333`（128）、`bulaienaofutuojiesenzhang`（38）、`Yuuki-Sakura`（35）。前四名幾乎是 commit 全部來源，**核心開發團隊估約 4–5 人**——典型的小型工作室開源產品節奏，而非個人專案或大廠開源。團隊以官方 Telegram（@harryyyy2025）與微信對外，未在 repo 公開創辦人姓名。

從 2025-02-26 首版 `v0.1.1` 到 2026-03-28 的 `v2.1.0`，**13 個月發了 26 個 release**，平均 15 天一版，2025 年 11 月後進入週更節奏。

## 核心架構 / 主要概念

README 與 [aitoearn.ai](https://aitoearn.ai/) 揭露的堆疊：

- **Monorepo 結構**：`aitoearn-backend`（NestJS 微服務群 `aitoearn-ai` + `aitoearn-server`，TypeScript 92.6%）、`aitoearn-web`（前端）、`AttAiToEarn`（Electron 桌面客戶端，獨立 repo）。
- **Runtime 要求**：Node.js 20.18.x、MongoDB、Redis、Docker / Docker Compose（`docker compose up -d` 一鍵起完整棧）。
- **四個 Agent 主幹**：
  - `Create Agent`：接 Grok / Veo / Seedance 影片模型、Nano Banana 圖像模型、Qwen / DeepSeek 文字模型，支援影片翻譯與批次產製。
  - `Publish Agent`：12+ 平台一鍵分發 + 行事曆排程（國內：抖音、小紅書、快手、Bilibili、視頻號；國際：TikTok、YouTube、Facebook、Instagram、Threads、X、Pinterest、LinkedIn）。
  - `Engage Agent`：瀏覽器外掛（Chrome `.crx`，每個 release 都會附）做按讚、追蹤、智能回覆，加上評論挖掘與品牌監測。
  - `Monetize Agent`：v2.1.0 上線的 **內容交易市集**，三種結算模式 CPS（按銷售）/ CPE（按互動）/ CPM（按曝光，$0.10–$1.00 per 1K views）。
- **MCP 協定接入**：以 MCP server 對外開放發布鏈，讓 [Claude Code](https://github.com/anthropics/claude-code) / Cursor / OpenClaw 透過 API Key 直接呼叫。
- **OAuth Relay**：官方代發 OAuth 憑證給自架使用者，避免每個平台都要去申請開發者帳號。
- **發行物**：每個 release 附 `aitoearn-extension.crx` 瀏覽器外掛、桌面端安裝包。

## 設計哲學

README 與第三方評測都把核心主張收斂到「**從單點創作轉為流程競爭**」這條軸線。silenceper 的評測引述：

> "把'内容生产 + 渠道分发 + 互动转化 + 数据复盘'收敛到一个系统里"

> "内容增长已经从'单点创作'进入'流程竞争'。"

翻譯／解讀：自媒體創作者過去的瓶頸是「想梗」，現在的瓶頸已經轉到「**跨平台同步分發 + 私訊互動轉化 + 數據復盤**」三件事的時間成本。AiToEarn 的設計判斷是把這三件事都做成 Agent，再用 MCP 把整條鏈暴露給 LLM 客戶端——所以它對標的不是另一個 [SocialBu](https://socialbu.com/) 或 [Buffer](https://buffer.com/)，而是「**讓使用者拿 AI 助理當作運營員工**」的角色錯位。

## 目標使用者與適用情境

README 自述受眾為 **OPC（One-Person Company）、創作者、品牌、企業**。實務上適用情境分三層：

- **多帳號矩陣經營**：千級帳號管理、跨平台一鍵發、定時排程——這層替代 [dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload)、商業 SaaS 如 Hootsuite。
- **AI Agent 工作流**：透過 MCP 把發布動作交給 [Claude Code](https://github.com/anthropics/claude-code) / Cursor，讓 LLM 寫好文案直接發。
- **內容變現**：v2.1.0 後可直接在平台接案、派單，創作者拿 CPS / CPE / CPM。

不適用情境：

- **單帳號、單平台**的純創作者——四個 Agent 中三個的價值都來自跨平台。
- **嚴格合規**場景——多平台一鍵發布通常踩進各家 ToS 灰色地帶（自動化登入、行為脚本），silenceper 評測也提醒「**容易受平台規則變動衝擊**」、「無法替代運營策略本身」。
- **不需要中國平台**的純海外使用者——其差異化在抖音 / 小紅書 / 視頻號這條中國側資產，純國際場景優勢被攤平。

## 與類似專案的差異

| 對手 | 路徑 | AiToEarn 的差異 | 何時選誰 |
|---|---|---|---|
| [dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload) | Playwright 自動化腳本 + Web UI，純 OSS | AiToEarn 是完整產品（Electron + 後端微服務 + 桌面 + 瀏覽器外掛 + 雲端市集）；social-auto-upload 是純 CLI/腳本層 | 只要可程式化上傳選 social-auto-upload；要完整 UI/排程/變現選 AiToEarn |
| [Hootsuite](https://www.hootsuite.com/) / [Buffer](https://buffer.com/) | 商業 SaaS，無中國平台 | AiToEarn 涵蓋抖音 / 小紅書 / 視頻號 / 快手，且開源可自架；Hootsuite/Buffer 完全不支援中國平台 | 海外品牌且預算充足選 Hootsuite；含中國通路或要資料主權選 AiToEarn |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | 通用工作流自動化 | AiToEarn 是垂直自媒體場景特化、預製四個 Agent；n8n 是通用 + 需自己拼節點 | 已有 DevOps 能力且要自由組合選 n8n；要 out-of-the-box 自媒體流程選 AiToEarn |

關鍵差異在「**抖音 / 小紅書 / 視頻號 / 快手**」這條中國側資產——這是 [dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload) 之外，海外通用工具完全無法觸及的市場。

## 外部評論

- [silenceper 部落格評測（2026-03-10）](https://silenceper.com/article/2026-03-10-aitoearn-intro/) — 偏正面但有批判，肯定其「**內容增長已從單點創作進入流程競爭**」的場景框架，並具體點出三項風險：「**多平台相容成本高**、**規則變動衝擊大**、**工具無法替代運營策略**」。是目前最完整的中文評測。
- [小羿 xiaoyi.vc 介紹文](https://xiaoyi.vc/aitoearn-2.html) — 純推薦性質介紹文，強調「**免費開源 AI 自媒體運營工具**」、「**支援通過 AI 抓取全網熱點，AI 分析一鍵生成同款爆款內容**」；**批判性偏低**。
- [小羿 xiaoyi.vc Windows 版介紹](https://xiaoyi.vc/aitoearn.html) — 對 Windows 桌面端的安裝實測導引。
- [CSDN 火山引擎 ADG 社區介紹](https://adg.csdn.net/695248c05b9f5f31781b5d99.html) — 開發者社區轉貼，定位為「**助力自媒體創作者**的開源項目」，重在功能列舉而非深度評測。
- [CSDN 部落格介紹（gitblog_00447）](https://blog.csdn.net/gitblog_00447/article/details/146563002) — 重複的功能列點介紹，與 README 高度同構，原創評論有限。
- [夸克圈轉貼](https://qurk.cc/quark/60194) — 工具導購頁，附「**爱团团**」中文品牌與下載連結。
- [神族九帝資源頻道](https://shenzjd.com/posts/3688) — 中文資源站轉貼，定位為「**抖音、小紅書、視頻號、快手等多個自媒體平台的一鍵發布工具**」。
- [Histre 公開筆記](https://histre.com/public/notes/huangjingyun/note/lwe1jtkk/) — 個人收藏筆記，無批評內容。
- **HN / Reddit 資料不足**：搜尋未見任何 [Hacker News](https://news.ycombinator.com/) 串或英語 Reddit 討論。本產品在英文圈基本上**沒有討論度**——這與「中國平台支援」的差異化方向直接相關，海外科技社群對抖音 / 小紅書自動化的興趣低。

## Release 狀態 / 時間軸

- **2025-02-24** — Repo 建立。
- **2025-02-26** — 首個 release `v0.1.1`。
- **2025-04-30** — `v0.7.0` 系列，產品雛形完備。
- **2025-09-16** — `v1.0.18`，README 自述為「**最初實現小紅書、抖音、快手、視頻號一鍵發布**」的版本。
- **2025-11-07** — `v1.3.0`，第三方評測稱「**第一個開源且功能完整的版本**」。
- **2026-02-10** — `v1.8.0`，AI Agent 化基本完成。
- **2026-03-28** — **`v2.1.0`（最新版），上線內容交易市集**——這是商業化轉折點，從工具變平台。
- **2026-05-12** — 首次上 GitHub Trending 絕對榜 #3（10,603 stars / 今日 +595）。

26 個 release / 13 個月、平均 15 天一版的節奏，在「Electron + 多平台 OAuth」這種 high-maintenance 類型專案中相對穩定。

## 授權與社群

- **授權**：MIT License（含後端、前端、桌面、瀏覽器外掛全棧）——這在自媒體自動化垂直裡相對少見，[dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload) 也是寬鬆協議，但商業 SaaS 同類工具基本不可能開源。
- **量化指標**（2026-05-12）：10,603 stars、1,988 forks、381 watchers、6 open issues、10 contributors、341 MB repo 大小。
- **語言佔比**：TypeScript 92.6% + JavaScript 4.7% + SCSS 1.9%——後端、前端、桌面端統一在 TS 生態。
- **GitHub Topics**：`auto-publish`、`douyin`、`douyin-api`、`electron-app`、`electron-react`、`kuaishou`、`kwai`、`published`、`shipinhao`、`tool`、`xiaohongshu`。
- **首日增長率**：595 / 10,603 ≈ 5.61%——絕對榜 #3，但 growth rate 在當日榜中段，屬「**累積巨量後的穩定上升**」而非首爆型新進。
- **跨平台分發**：除官方 [GitHub releases](https://github.com/yikart/AiToEarn/releases) 外，aitoearn.ai 提供託管 SaaS、瀏覽器外掛、MCP 接入三條使用路徑。

## 資料來源

- **本體**：
  - GitHub repo：<https://github.com/yikart/AiToEarn>
  - 國際品牌站：<https://aitoearn.ai/>
  - 中國品牌站「爱团团」：<https://aitoearn.cn/>
  - Releases：<https://github.com/yikart/AiToEarn/releases>
  - 中文 README：<https://github.com/yikart/AiToEarn/blob/main/README_CN.md>
- **第三方評論**：
  - [silenceper 部落格評測](https://silenceper.com/article/2026-03-10-aitoearn-intro/)
  - [小羿 xiaoyi.vc 介紹（v1）](https://xiaoyi.vc/aitoearn.html)
  - [小羿 xiaoyi.vc 介紹（v2）](https://xiaoyi.vc/aitoearn-2.html)
  - [CSDN ADG 社區](https://adg.csdn.net/695248c05b9f5f31781b5d99.html)
  - [CSDN gitblog 介紹文](https://blog.csdn.net/gitblog_00447/article/details/146563002)
  - [夸克圈轉貼](https://qurk.cc/quark/60194)
  - [神族九帝資源頻道](https://shenzjd.com/posts/3688)
- **同類工具**：
  - [dreammis/social-auto-upload](https://github.com/dreammis/social-auto-upload)
  - [zydgmail/social-auto-upload](https://github.com/zydgmail/social-auto-upload)
  - [Hootsuite](https://www.hootsuite.com/)
  - [Buffer](https://buffer.com/)
  - [n8n-io/n8n](https://github.com/n8n-io/n8n)

## 更新紀錄

### 2026-05-14
- 隔 1 日（5-12 → 5-14）回歸絕對榜 #4（總 12,802 / 今日 +987）、增長榜 #4 growth_rate **7.71%**。
- 自 `last_updated`（2026-05-12）以來無新 release：仍為 [v2.1.0](https://github.com/yikart/AiToEarn/releases/tag/v2.1.0)（2026-03-28），近 7 週未發版。
