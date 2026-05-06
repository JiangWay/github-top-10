---
repo: anthropics/financial-services
first_seen: 2026-05-07
last_updated: 2026-05-07
appearances: [2026-05-07]
growth_appearances: []
has_releases: false
latest_release: null
tags: [金融科技, Skill 外掛, 企業級, 多代理編排]
domain: 金融科技
form: Skill 外掛
themes: [企業級, 多代理編排]
---

# anthropics/financial-services — 深度研究

## 深度研究（2026-05-07 首次）

### 專案定位
[anthropics/financial-services](https://github.com/anthropics/financial-services)（對外名稱「Claude for Financial Services」）是 Anthropic 於 2026-05-05 公開的金融服務參考實作庫，集結 10 個現成 agent、6 個垂直 skill bundle 與 11 個 MCP 資料連接器，可直接以 Claude Cowork plugin 或 Managed Agents API 兩種模式部署。它不是 SDK 也不是框架，而是「金融業 skill pack」。

### 核心架構 / 主要概念
- **10 個 Named Agent**：Pitch Agent、Meeting Prep Agent、Market Researcher、Earnings Reviewer、Model Builder、Valuation Reviewer、GL Reconciler、Month-End Closer、Statement Auditor、KYC Screener。
- **6 個 Vertical Bundle**：financial-analysis（核心：comps / DCF / LBO / 三表 / Excel audit）、investment-banking、equity-research、private-equity、wealth-management、fund-admin、operations，外加 LSEG / S&P 兩個合作方版本。
- **11 個 MCP 資料連接器**：Daloopa、Morningstar、S&P Global、FactSet、Moody's、MT Newswires、Aiera、LSEG、PitchBook、Chronograph、Egnyte。
- **Slash command**：`/comps`、`/dcf`、`/lbo`、`/earnings`、`/ic-memo`、`/cim`、`/client-review`、`/tlh` 等。
- 強調 agent 只「draft work product for human review」——不下投資建議、不執行交易、不上分類帳。

### 目標使用者
投資銀行（M&A、資本市場）、私募基金（sourcing / 盡職調查 / 投組營運）、equity research、基金行政（reconciliation、NAV、month-end close）、wealth management、合規（KYC、onboarding）。

### 與類似專案的差異
與 [obra/superpowers](https://github.com/obra/superpowers)、[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 等通用 skill 框架不同，此 repo 是領域專用包；與 [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) 這類社群目錄相比，差別在於由 Anthropic 親自策展、整合既定資料源、且明確以 Cowork + Managed Agents 雙態交付。

### 外部評論
- [The Register — Anthropic unleashes finance agents for Claude](https://www.theregister.com/software/2026/05/05/anthropic-unleashes-finance-agents-for-claude/5225868)：總覽 10 個 agent 與 Microsoft 365 整合。
- [Quartz — Anthropic launches 10 AI agents for banks and insurers](https://qz.com/anthropic-ai-agents-financial-services-banks-insurers-050526)：聚焦金融機構採用面。
- [Fortune — Anthropic deepens push into Wall Street](https://fortune.com/2026/05/05/anthropic-wall-street-financial-services-agents-jamie-dimon/)：報導與 Moody's 的 MCP 串接、JP Morgan 等大型機構動態。
- [Bloomberg — Anthropic Unveils AI Agents to Field Financial Services Tasks](https://www.bloomberg.com/news/articles/2026-05-05/anthropic-unveils-ai-agents-to-field-financial-services-tasks)：機構視角的市場反應。

### Release 狀態
**尚無 GitHub Release**（`has_releases: false`）。專案以主分支滾動更新為主，版本以 markdown / YAML 直接更新。

### 授權與社群
Apache-2.0；8,946 stars / 1,217 forks / 58 open issues，發佈兩日已累積大量 fork 顯示企業端正積極導入。Anthropic 官方倉庫，貢獻者多為 Anthropic 員工。
