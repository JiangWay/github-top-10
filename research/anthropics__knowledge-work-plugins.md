---
repo: anthropics/knowledge-work-plugins
first_seen: 2026-05-25
last_updated: 2026-05-25
appearances: [2026-05-25]
growth_appearances: [2026-05-25]
has_releases: false
latest_release: null
tags: [企業治理, Skill 外掛, 企業級, 多代理編排]
domain: 企業治理
form: Skill 外掛
themes: [企業級, 多代理編排]
---

# [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)

## 深度研究（2026-05-25 首次）

### 專案定位

[anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)（14,818 stars / 1,809 forks / 2026-01-23 建立 / Apache-2.0 / Python 76.1% + HTML 23.9%）是 Anthropic 官方為 **Claude Cowork**（「設定目標，Claude 交付完成品」的知識工作型 agentic AI 產品）所建的開源 plugin 正本目錄，也兼容 Claude Code。11 個 plugin 涵蓋 Productivity / Sales / Customer Support / Product Management / Marketing / Legal / Finance / Data / Enterprise Search / Bio Research / Cowork Plugin Management 11 種 knowledge-worker 角色，每個 plugin 把該職能的 skills（自動觸發的領域知識）、commands（顯式調用的 slash command）、connectors（透過 `.mcp.json` 接 Slack/Notion/HubSpot/Snowflake/BigQuery 等 50+ 外部工具）封裝成可一鍵安裝的目錄。今日以 +1,448 stars / growth_rate 9.77% 首登絕對榜 #2，承接 5-21 [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)（coder 導向 plugin marketplace 正本）後，Anthropic 官方倉**第三次大規模上榜**，並把 plugin 生態從 5-21／5-22 連 4 日的「coder 周邊」橫向擴展至「knowledge worker 職能線」。

### 核心架構 / 主要概念

- **目錄結構**：每個 plugin 為 `plugin-name/`，內含 `.claude-plugin/plugin.json`（manifest）+ `.mcp.json`（外部工具連線設定）+ `commands/`（顯式 slash command，例 `/finance:reconciliation`、`/sales:call-prep`、`/data:write-query`、`/product-management:write-spec`）+ `skills/`（依情境自動觸發的領域工作流）；全 plugin 純 markdown + JSON、**無 code、無 build step、無 infrastructure**
- **三層擴充模型**：Skills（domain expertise + 最佳實務 + 步驟工作流，Claude 自動載入）+ Commands（使用者顯式觸發的動作）+ Connectors（透過 MCP server 接外部 SaaS）三者組合成「specialist for a role」
- **Claude Cowork 為主、Claude Code 為次**：Cowork 走 `claude.com/plugins/` GUI 安裝；Claude Code 走 `claude plugin marketplace add anthropics/knowledge-work-plugins` → `claude plugin install sales@knowledge-work-plugins` CLI 安裝
- **11 plugin 覆蓋知識工作多數職能**：Productivity（Slack/Notion/Asana/Linear/Jira/Monday/ClickUp/Microsoft 365）/ Sales（HubSpot/Close/Clay/ZoomInfo/Fireflies）/ Customer Support（Intercom/Guru）/ Product Management（Linear/Figma/Amplitude/Pendo）/ Marketing（Canva/Ahrefs/SimilarWeb/Klaviyo）/ Legal（Box/Egnyte）/ Finance（Snowflake/Databricks/BigQuery）/ Data（同 Finance + Definite/Hex）/ Enterprise Search（跨平台 federated search）/ Bio Research（PubMed/bioRxiv/ClinicalTrials.gov/ChEMBL/Synapse/Wiley/Owkin/Open Targets/Benchling 10 種生醫研究工具）/ Cowork Plugin Management（讓使用者建立或客製化新 plugin）
- **企業客製為核心使用情境**：README 明示「generic starting points」——企業 fork 後改 `.mcp.json` 換成自家工具、把公司術語/組織/流程注入 skill 檔、調整工作流，「Claude works like it was built for your team」
- **rolling-main 無 release 模型**：與 [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)、[anthropics/skills](https://github.com/anthropics/skills) 同採 rolling-main、不切 GitHub Release tag，更新節奏跟 `pushed_at` 走（2026-05-25 08:47 仍在 push）
- **內部治理 metadata**：custom_properties 顯示 `allow_coworker_prs: false`、`repo_protection_L3: enable`、`sast-exempted: true`，是 Anthropic 內部對「正本目錄」的高保護等級設定

### 目標使用者

非工程師為主的企業知識工作者——銷售／客服／PM／行銷／法務／財務／資料分析師／企業研究員／生醫研究員——透過 Claude Cowork GUI 把日常 SaaS 工作流交給 Claude；其次是企業 IT／AI 平台團隊：fork 本倉客製成內部 plugin marketplace，把公司術語、SOP、tool stack 標準化為 plugin 後散發給全公司；以及 Claude Code 重度使用者：在 IDE 中以 CLI 安裝這 11 個職能 plugin 補足非 coding 場景的工作流（例如 PM 寫 spec、Finance 對帳、Data 查 BigQuery）。

### 與類似專案的差異

- 與 [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)（5-21／5-22／5-23 連 3 日上榜 Anthropic 親自策展的 plugin marketplace 正本）相比：本檔走「knowledge worker 職能線」（PM/Sales/Legal/Finance），claude-plugins-official 走「coder 周邊線」（commands/agents/skills/MCP servers/hooks 五類擴充點），兩者構成 Anthropic plugin 雙正本——一個服務 Claude Cowork、一個服務 Claude Code
- 與 [anthropics/skills](https://github.com/anthropics/skills)（5-16 上榜 Anthropic 官方 Skill 通用模板）相比：anthropics/skills 為「Skill 元件示範」、本檔為「組裝好的 plugin 套件」——把 skills + commands + MCP connectors 三層打包成可安裝單元
- 與 [dotnet/skills](https://github.com/dotnet/skills)（5-22 上榜 Microsoft .NET 12 個 Skill）相比：dotnet/skills 走「廠商垂直域單純 Skill 集合」、本檔走「Anthropic 自家平台跨職能 plugin 集合」並綁定 Cowork GUI 安裝體驗
- 與 [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)（5-24 上榜 754 條資安 skill 個人作者倉）相比：mukul975 走「單垂直域大規模個人填充 + agentskills.io 跨平台」、本檔走「Anthropic 官方策展跨職能 + 自家 Cowork / Claude Code 雙平台」

### 外部評論

- [Reworked — Anthropic Rolls Out Plugins for Claude Cowork Workflows](https://www.reworked.co/collaboration-productivity/anthropic-adds-plugins-to-claude-cowork/) 報導 plugin 上線
- [CNBC — Anthropic updates Claude Cowork tool built to give the average office worker a productivity boost](https://www.cnbc.com/2026/02/24/anthropic-claude-cowork-office-worker.html) 2026-02-24 報導 Cowork 朝「平均辦公室工作者生產力提升」定位
- [Integrated Cognition — Anthropic's Enterprise Expansion: Advancing Claude Cowork with New Plugins and Integrations](https://integratedcognition.com/blog/anthropics-enterprise-expansion-advancing-claude-cowork-with-new-plugins-and-integrations) 分析 2026-02-24 update 帶來 Google Workspace / Slack / DocuSign / FactSet / S&P Global connectors + Excel/PowerPoint 原生嵌入
- [ClaudeWorld — Anthropic Knowledge Work Plugins: The Complete Guide to 15 Official Plugins](https://claude-world.com/articles/anthropic-knowledge-work-plugins-overview/) 第三方詳解站
- [Mager.co — Anthropic's Knowledge Work Plugins: The 10 Essential Tools for Modern Tech Teams](https://www.mager.co/blog/2026-03-27-anthropic-knowledge-work-plugins/) 2026-03-27 部落格分析
- [Claude Code Plugin Hub 收錄頁](https://www.claudepluginhub.com/marketplaces/anthropics-knowledge-work-plugins) 第三方 plugin marketplace 索引
- [Claude Code Marketplace 收錄頁](https://claudemarketplaces.com/plugins/anthropics-knowledge-work-plugins) 第三方索引
- HN / Reddit 主流社群長文討論：**目前未發現顯著主流社群長文討論**（搜尋無命中），主要曝光在 Anthropic 官方 PR 與企業 SaaS 媒體

### Release 狀態

`has_releases: false`——尚無任何 GitHub Release tag，採 rolling-main 開發模型，更新節奏跟 `pushed_at` 與 commits 走（2026-05-25 08:47 仍有新 push）。與 Anthropic 同類官方策展倉（[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)、[anthropics/skills](https://github.com/anthropics/skills)）一致——Anthropic 對「marketplace 正本」類 repo 統一不切 release。

### 授權與社群

- **授權**：Apache-2.0（清晰商用友善，允許企業 fork 後客製內部 plugin marketplace）
- **貢獻結構**：Anthropic 員工主導 + 外部小幅貢獻——前 3 名 [mattpic-ant](https://github.com/mattpic-ant) 23 commits（37%）/ [bryan-anthropic](https://github.com/bryan-anthropic) 15 commits / [tobinsouth](https://github.com/tobinsouth) 10 commits 皆 Anthropic 員工或合作者，[ochafik](https://github.com/ochafik) 5 commits（Anthropic 研究員 Olivier Chafik）、[henrythe9th](https://github.com/henrythe9th) 3 commits（Henry Shi）、[jakemmarsh](https://github.com/jakemmarsh) 3 commits 等共 24+ 貢獻者；典型「廠商員工骨幹 + 社群 PR 點綴」結構
- **量化指標**：14,818 stars / **1,809 forks**（12.2% fork 率，反映企業實際下載入庫客製）/ 114 open issues / 68 pull requests / 156 watchers
- **Topics**：無（topics 欄位為空）
- **Homepage**：null（無外部站點，README 內導向 [claude.com/plugins](https://claude.com/plugins) 為 GUI 安裝入口）
- **官方產品頁**：[Claude Cowork — Anthropic's agentic AI for knowledge work](https://www.anthropic.com/product/claude-cowork) / [Cowork: Claude Code power for knowledge work](https://claude.com/product/cowork)

## 資料來源

**本體**
- Repo：<https://github.com/anthropics/knowledge-work-plugins>
- README：<https://github.com/anthropics/knowledge-work-plugins/blob/main/README.md>
- Releases（空）：<https://github.com/anthropics/knowledge-work-plugins/releases>
- Productivity plugin 目錄：<https://github.com/anthropics/knowledge-work-plugins/tree/main/productivity>
- Engineering plugin 目錄：<https://github.com/anthropics/knowledge-work-plugins/tree/main/engineering>
- Operations plugin 目錄：<https://github.com/anthropics/knowledge-work-plugins/tree/main/operations>

**官方產品頁**
- [Claude Cowork](https://www.anthropic.com/product/claude-cowork)
- [Cowork: Claude Code power for knowledge work](https://claude.com/product/cowork)
- [Plugins for Claude Code and Cowork](https://claude.com/plugins)

**外部評論與收錄**
- [Reworked — Anthropic Rolls Out Plugins for Claude Cowork Workflows](https://www.reworked.co/collaboration-productivity/anthropic-adds-plugins-to-claude-cowork/)
- [CNBC — Anthropic updates Claude Cowork tool](https://www.cnbc.com/2026/02/24/anthropic-claude-cowork-office-worker.html)
- [Integrated Cognition — Anthropic's Enterprise Expansion](https://integratedcognition.com/blog/anthropics-enterprise-expansion-advancing-claude-cowork-with-new-plugins-and-integrations)
- [ClaudeWorld — Complete Guide to 15 Official Plugins](https://claude-world.com/articles/anthropic-knowledge-work-plugins-overview/)
- [Mager.co — 10 Essential Tools for Modern Tech Teams](https://www.mager.co/blog/2026-03-27-anthropic-knowledge-work-plugins/)
- [Claude Code Plugin Hub 收錄頁](https://www.claudepluginhub.com/marketplaces/anthropics-knowledge-work-plugins)
- [Claude Code Marketplace 收錄頁](https://claudemarketplaces.com/plugins/anthropics-knowledge-work-plugins)
