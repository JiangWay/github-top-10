---
repo: calcom/cal.diy
first_seen: 2026-05-18
last_updated: 2026-05-18
appearances: [2026-05-18]
growth_appearances: []
has_releases: true
latest_release: v6.2.0
tags: [開發者工具, 應用程式, 自架, 資料主權, 開源替代]
domain: 開發者工具
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [calcom/cal.diy](https://github.com/calcom/cal.diy) 深度研究（2026-05-18 首次）

[calcom/cal.diy](https://github.com/calcom/cal.diy) 是 [Cal.com](https://github.com/calcom) 官方於 2026-04 將主線 [calcom/cal.com](https://github.com/calcom/cal.com) 改為閉源後釋出的「社群版」分支，採 MIT 授權，將原本散落於 EE（Enterprise Edition）子目錄的付費功能整批剝除，僅保留個人與小型自架者所需的核心排程功能。目前 43,169 stars、13,380 forks、1,370 open issues，主語言 TypeScript（95.8%），最近一次 push 為 2026-05-14。

## 專案定位
定位為「沒有商業綁定的 Calendly 開源替代品」。官方明言 cal.diy 為**社群驅動、純 MIT、無 license key 需求、僅供自架**，與走閉源 + SaaS 路線的 cal.com 主線正式分離。Topic 標籤含 `next-auth`、`nextjs`、`prisma`、`t3-stack`、`trpc`、`turborepo`，沿用 cal.com 既有技術棧。

## 核心架構 / 主要概念
T3 Stack（Next.js + tRPC + Prisma + Tailwind）+ PostgreSQL ≥13，Node.js ≥18，視訊預設整合 Daily.co。部署支援 Docker、Railway、Vercel、Render、Northflank 一鍵腳本。日曆整合涵蓋 Google Calendar、Microsoft 365、Zoom、HubSpot。**移除清單**：Teams、Organizations、Insights、Workflows、SSO/SAML、Routing Forms 進階分支等所有原 EE 模組。

## 目標使用者
個人開發者、Homelab 自架族、對資料主權敏感的小型工作室。官方文件明言「個人、非生產用途」與「具備伺服器管理能力的自架者」，不提供 hosted 版本——想要 SaaS 與企業功能者仍須回到付費 [cal.com](https://cal.com)。

## 與類似專案的差異
與主線 [calcom/cal.com](https://github.com/calcom/cal.com) 的差異即「閉源 + 完整 EE」對上「MIT + 純核心」。第三方類似 fork 有 [onehashai/Cal-ID](https://github.com/onehashai/Cal-ID) 同樣標榜 100% 開源，但 cal.diy 由 Cal.com 公司**自己**維護，社群信任度與 upstream 同步速度均較第三方 fork 佔優。相對 Calendly 等 SaaS，cal.diy 提供自架資料主權；相對 [makeplane/plane](https://github.com/makeplane/plane) 等廣域 PM 工具，cal.diy 聚焦純排程。

## 外部評論
- [Hacker News：Cal.diy: open-source community edition of cal.com](https://news.ycombinator.com/item?id=47852155) 與 [先前的 Cal.com is going closed source 討論串](https://news.ycombinator.com/item?id=47780456)，社群對改採閉源動機（「AI 工具讓開源變危險」）普遍質疑為「security by obscurity 違反基本原則」、「一年前才宣傳企業自架現在 180 度轉彎，bait and switch」。
- [Slashdot：Cal.com Is Going Closed Source Because of AI](https://yro.slashdot.org/story/26/04/15/1913213/calcom-is-going-closed-source-because-of-ai) 將動機歸結為 AI 加速漏洞掃描的供應鏈壓力。
- [AlternativeTo：Cal.com is going closed-source with a major shift in its license strategy](https://alternativeto.net/news/2026/4/cal-com-is-going-closed-source-with-a-major-shift-in-its-license-strategy/) 與 [AIToolly：Cal.diy as MIT-licensed community fork](https://aitoolly.com/ai-news/article/2026-04-22-caldiy-launched-as-mit-licensed-open-source-community-fork-of-calcom-for-self-hosters) 持中性立場視 cal.diy 為「妥協方案」。
- 官方 blog [Going Closed-Source: Technical Changes Behind Cal.diy](https://cal.com/blog/cal-diy-open-source-to-closed-source) 與 [Cal.com v6.4 Changelog](https://cal.com/blog/calcom-v6-4) 是 license 變更的第一手說明。

## Release 狀態
最近一次 GitHub Release 為 [v6.2.0](https://github.com/calcom/cal.diy/releases/tag/v6.2.0)（2026-03-01），由 `cal-com-ci[bot]` 自動發布。v6.4 license 重大變更見上述 blog，但 GitHub release tag 尚停於 v6.2.0，意味著主線分離後的版號節奏尚未在 cal.diy repo 同步呈現。

## 授權與社群
MIT License、Cal.com, Inc. 組織帳號維護、未啟用 Discussions / Wiki，issue 追蹤活躍（1,370 open）。本質仍是公司治理而非完全去中心化社群——這也是 Hacker News 串中對「community-driven」標籤的主要保留意見。
