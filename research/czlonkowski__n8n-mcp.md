---
repo: czlonkowski/n8n-mcp
first_seen: 2026-05-04
last_updated: 2026-05-05
appearances: [2026-05-04, 2026-05-05]
growth_appearances: [2026-05-04, 2026-05-05]
has_releases: true
latest_release: v2.50.3
tags: [MCP 協定, MCP Server, 自架, 開源替代]
domain: MCP 協定
form: MCP Server
themes: [自架, 開源替代]
---

# [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp)

## 深度研究（2026-05-04 首次）

### 專案定位
[czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp) 是一個非官方的 MCP Server，專門把 [n8n-io/n8n](https://github.com/n8n-io/n8n) 自動化平台的「節點知識」灌進 Claude Desktop / Claude Code / Cursor / Windsurf，讓 AI 助手能正確產生 n8n workflow JSON，不再瞎猜節點名稱與欄位。作者 Romuald Czlonkowski 的初衷很直白：他用 Claude 寫 n8n workflow 時，模型常編造不存在的節點與屬性，一個簡單流程要來回 45 分鐘才修對；他乾脆把整套 n8n 文件結構化餵給 LLM，宣稱可降到「3 分鐘、零錯誤」（[n8n Community 原帖](https://community.n8n.io/t/i-built-an-mcp-server-that-makes-claude-an-n8n-expert-heres-how-it-changed-everything/133902)）。

### 核心架構 / 主要概念
TypeScript 實作。預先把 n8n 節點原始碼解析成資料庫：宣稱涵蓋 **1,650 個節點**（820 core + 830 community）、**99% 屬性**、**63.6% operation**、**87% 文件**、**265 個 AI-capable tool**，外加 **2,352 個 workflow 模板**。對外曝露 7 個核心工具：`tools_documentation`、`search_nodes`、`get_node`、`validate_node`、`validate_workflow`、`search_templates`、`get_template`，以及 13 個選用的 n8n 管理工具（建立/更新 workflow、執行、憑證、安全稽核）。重點設計是**多層 validation**——讓模型先查節點、組 JSON、再呼叫 validator 修正，把幻覺壓在送進 n8n 之前。

### 目標使用者
n8n 重度使用者、想把 workflow 生成自動化的 automation engineer、以及把 Claude Code 當成「n8n 架構師」用的開發者。部署選項涵蓋 npx、Docker、Railway、自架雲端 dashboard（免費 100 calls/day），對 self-host 與 vibe coder 都友善。

### 與類似專案的差異
- **vs 官方 [n8n-io/n8n](https://github.com/n8n-io/n8n) 內建 MCP Server**：官方版主要把單一 workflow 包成 MCP server 讓外部 LLM 呼叫，最近才加上「建立/更新 workflow」能力（[n8n Blog](https://blog.n8n.io/n8n-mcp-server/)）；czlonkowski 版反過來做「給 LLM 一本 n8n 字典」，強調 schema 完整度與 validation。
- **vs 作者自家舊版 [czlonkowski/n8n-manager-for-ai-agents](https://github.com/czlonkowski/n8n-manager-for-ai-agents)**：舊版只做管理 API；本作專注於知識庫與 workflow 生成。
- **vs [nerding-io/n8n-nodes-mcp](https://github.com/nerding-io/n8n-nodes-mcp)**：對方是「n8n 內呼叫外部 MCP」的 custom node，方向相反。

### 外部評論
- Medium 工程師實測在 55 節點 production pipeline 上，Claude Code 透過本工具 15 分鐘完成診斷、修補、部署，原本要超過一小時（[Medium](https://medium.com/@rentierdigital/one-open-source-repo-turned-claude-code-into-an-n8n-architect-and-n8n-has-never-been-more-useful-f68f4ec63d02)）。
- skywork.ai 深度評析肯定其把「翻譯 → 作曲」的轉變（[skywork.ai](https://skywork.ai/skypage/en/n8n-ai-engineers-deep-dive/1977576190928949248)）。
- 但 n8n 官方論壇也有負評：「90% of the time it's creating flows with faulty nodes」、token 上限爆掉、安裝困難等，作者後來公開承認 bandwidth 不足，請使用者改去 GitHub Issues（[n8n Community](https://community.n8n.io/t/i-built-an-mcp-server-that-makes-claude-an-n8n-expert-heres-how-it-changed-everything/133902)）。

### Release 狀態
有 release（201 個版本），最新 **[v2.50.0](https://github.com/czlonkowski/n8n-mcp/releases/tag/v2.50.0)**（2026-05-02 由 GitHub Actions 自動發布），語意化版本進到 2.x 後段，更新節奏明顯跟著上游 n8n 走。

### 授權與社群
**MIT** 授權。19,406 stars / 3,229 forks / 75 open issues / 156 watchers，2025-06-07 才開檔、不到一年就破 19K，成長極快。貢獻者高度集中：作者本人 914 commits，其次 [kimbo128](https://github.com/kimbo128) 39 次，再來是 `claude` bot 與少量社群 PR。同期作者另推出配套 [czlonkowski/n8n-skills](https://github.com/czlonkowski/n8n-skills)（Claude Code Skill 套件），形成「MCP + Skill」雙拳組合，是這次衝榜的關鍵助攻。

## 更新紀錄

### 2026-05-05
- 連榜 Day 2（5-04、5-05），絕對榜由 #7 守 #7；stars_today +264 → +497（**+88.3%**）連榜次日加速；total stars 19,406 → 19,840 接近 2 萬大關；growth_rate 1.36% → 2.50%（+1.14pp），增長率榜由 #8 升至 **#7**。
- Release 端 5-04 一日連跳 v2.50.1 / v2.50.2 / v2.50.3，最新版本 [v2.50.3](https://github.com/czlonkowski/n8n-mcp/releases/tag/v2.50.3)（5-04 14:08 UTC），主要修一個 workflow-diff 的 rollback bug——`n8n` PUT 失敗時自動回滾到先前狀態（#769）。版本快速 patch 顯示 maintainer 配合上榜熱度緊密響應社群回報。
- 同期作者另推 [czlonkowski/n8n-skills](https://github.com/czlonkowski/n8n-skills)（Claude Code Skill 套件）形成「MCP + Skill」雙拳組合的策略持續發酵。
