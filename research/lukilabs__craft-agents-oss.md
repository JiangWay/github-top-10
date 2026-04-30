---
repo: lukilabs/craft-agents-oss
first_seen: 2026-05-01
last_updated: 2026-05-01
appearances: [2026-05-01]
growth_appearances: [2026-05-01]
has_releases: true
latest_release: v0.8.13
tags: [LLM 客戶端, 應用程式, 自架, 開源替代]
domain: LLM 客戶端
form: 應用程式
themes: [自架, 開源替代]
---

## 深度研究（2026-05-01 首次）

### 專案定位
[lukilabs/craft-agents-oss](https://github.com/lukilabs/craft-agents-oss) 是文件協作工具 [craft.do](https://www.craft.do) 團隊（lukilabs）開源的 **agent-native 桌面應用程式**，以 Apache 2.0 釋出。它建立在 Anthropic Claude Agent SDK 與自家 Pi SDK 之上，把 Claude Code 那種 CLI 式 agent 工作流，重新包裝成「以文件為中心、UI 驅動」的桌面體驗：多 session 收件匣、狀態工作流（Todo → In Progress → Needs Review → Done）、串流回應、工具視覺化、零設定的 API/MCP 連線。官方明說：「我們在 craft.do 內部就是用 Craft Agents 自己開發 Craft Agents」，定位偏「資訊工作者也能用的 agent 介面」，而非工程師專屬 CLI。

### 核心架構 / 主要概念
- **雙 SDK 並用**：Claude Agent SDK + Pi SDK，可同時掛多家供應商。
- **多模型/多帳號接入**：Anthropic API 或 Claude Max/Pro OAuth、Google AI Studio、ChatGPT Plus（Codex OAuth）、GitHub Copilot OAuth、OpenRouter、Vercel AI Gateway、Ollama、任意 OpenAI-compatible endpoint。
- **MCP 一等公民**：內建 32+ 個 Craft 文件 MCP 工具，並可串 Linear / GitHub / Notion 等 stdio MCP server。
- **三段權限模式**：Explore（唯讀）、Ask to Edit（每次審核）、Auto（全自動）。
- **headless server 模式**：可部署在 Linux VPS 當常駐 agent runner，桌面端以 thin client 連接，session 跨機器持續。
- **技術棧**：Bun runtime + Electron + React + shadcn/ui + Tailwind v4，憑證 AES-256-GCM 加密儲存，主語言 TypeScript。

### 目標使用者
官方明白寫給「任何處理資訊的人」，不限工程師——希望那些被 Claude Code、CLI、config 檔擋在門外的 PM、研究員、知識工作者也能驅動高階 agent；同時對開發者保留 CLI client、MCP、自訂 skill 的擴充性。

### 與類似專案的差異
- vs. **[anthropics/claude-code](https://github.com/anthropics/claude-code)**：Claude Code 是純 CLI、以程式碼倉庫為中心；Craft Agents 把同一個 Agent SDK 包成圖形介面，文件而非 repo 才是主資料模型。
- vs. **[pheuter/claude-agent-desktop](https://github.com/pheuter/claude-agent-desktop) / [vanzan01/claude-agent-sdk-starter](https://github.com/vanzan01/claude-agent-sdk-starter)**：那兩個是「Claude Agent SDK 桌面殼」起步範本；Craft Agents 已是完整產品，含多 session 收件匣、狀態工作流、MCP/REST 自動接入、headless 部署、權限分級。
- vs. **[lobehub/lobe-chat](https://github.com/lobehub/lobe-chat) / [open-webui/open-webui](https://github.com/open-webui/open-webui)**：那些是 chat 客戶端 + 工具呼叫；Craft Agents 走 agent-native（背景任務、長執行、事件驅動 cron / label / tool 觸發、`@mention` 即時掛 skill/source）。
- vs. **Cursor / Cline 等 IDE agent**：Cursor 仍以 code editor 為基礎；Craft Agents 強調「沒有 code editor 也能客製 agent」。

### 外部評論
- [Craft Agents – Work with agents, with the UX they deserve | Hacker News](https://news.ycombinator.com/item?id=46853843) — HN 討論串之一，把 Craft Agents 框定為「給 agent 應有的 UX」，集中討論桌面 agent 介面相對 CLI 的優劣。
- [Craft Agents: Work with most powerful agents in the world, with the UX they deserve | Hacker News](https://news.ycombinator.com/item?id=46805208) — 早期 HN 貼文，圍繞 zero-config 整合與 document-centric 設計是否真比 chat UI 更有生產力展開。
- [宝玉 on X：推薦這個基於 Claude Agent SDK + Electron 開發的開源 Agent](https://x.com/dotey/status/2013516064361943148) — 中文圈技術 KOL 宝玉推薦，重點是「告別命令行的 Claude Code 體驗，但保留 Claude Code 的能力核心」，將其定位為 Claude Code 的 GUI。
- [Craft Agents (Claude Code UI): This OPENSOURCE Claude Code GUI is THE BEST! — YouTube](https://www.youtube.com/watch?v=3Oc9W37-qAM) — 影片實測評論，直接把它定義為「最好的開源 Claude Code GUI」，重點稱讚 inbox 多任務與自動 API 接入。
- [Introducing Craft Agents — The Open Source Agent Interface（craft.do 官方部落格）](https://www.craft.do/blog/introducing-craft-agents) — 官方發佈文，揭露動機是「terminal + config 檔太重，需要 agent-native 介面」，並強調團隊「用 Craft Agents 開發 Craft Agents」。

### Release 狀態
有發佈節奏，最新版為 [v0.8.13](https://github.com/lukilabs/craft-agents-oss/releases/tag/v0.8.13)（2026-04-29 釋出），自開源以來累計 30 個 release，提供 macOS、Linux（AppImage）、Windows 安裝檔。

### 授權與社群
Apache 2.0 授權；隸屬 [lukilabs](https://github.com/lukilabs) 組織（craft.do 母公司）。主要貢獻者為 craft.do 內部成員 [balintorosz](https://github.com/balintorosz) 與 [rjulius23](https://github.com/rjulius23)（同時是 release 簽署者），其餘為社群少量 PR 貢獻。截至今日 5,529 stars / 738 forks / 24 watchers / 332 open issues，已開啟 GitHub Discussions，社群處於「廠商主導但對外開放」的早期活躍期。
