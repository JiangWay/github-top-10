---
repo: pingdotgg/t3code
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]
growth_appearances: []
has_releases: true
latest_release: v0.0.20
tags: [AI Agent 框架, 應用程式]
domain: AI Agent 框架
form: 應用程式
---

# [pingdotgg/t3code](https://github.com/pingdotgg/t3code)

## 深度研究（2026-04-18 首次）

### 專案定位
[pingdotgg/t3code](https://github.com/pingdotgg/t3code)（官網 [t3.codes](https://t3.codes/)）是 Theo Browne（[t3dotgg](https://github.com/t3dotgg)）與 ping.gg 團隊推出的「**AI Coding Agent 的極簡 Web GUI**」。它不是新的模型、也不是新的 IDE，而是把既有 CLI 型的 coding agent（目前支援 [openai/codex](https://github.com/openai/codex) 與 [anthropics/claude-code](https://github.com/anthropics/claude-code)，未來預計加入更多）包進一個統一的桌面／網頁介面。建立於 2026-02-08，以 TypeScript 為主（97.8%），MIT 授權。

### 核心架構 / 主要概念
- **多 repo、多 agent 平行執行**：一個視窗內同時管多個專案、多個 agent 任務。
- **Git worktree 整合**：每個任務在獨立 worktree 跑，避免互相污染。
- **Task-oriented 對話 UI**：每個 thread 對應一個明確任務，完整保留 reasoning 與 tool call。
- **Per-turn diff viewer + 一鍵 PR**：補齊純 CLI agent 難以處理的視覺化檢視流程。
- **雙執行模式**：Full Access（全自動）與 Supervised（每步確認）。
- **沿用既有 CLI 憑證**：靠 `codex login` / `claude auth login` 授權，而非發明新登入流程。
- 安裝方式：`npx t3`、`brew install --cask t3-code`、`winget install T3Tools.T3Code`、`yay -S t3code-bin`。

### 目標使用者
已經習慣 Codex CLI 或 Claude Code、但受不了在多個 terminal 與 repo 之間切換的開發者；以及想要一個**免費、開源、跨平台（尤其 Linux 原生支援）**的 GUI 外殼來監督 AI agent 工作的人。這與 [t3-oss/create-t3-app](https://github.com/t3-oss/create-t3-app) 無直接技術關聯，僅共用 T3 品牌。

### 與類似專案的差異
- 相對於 Cursor、Claude Desktop：t3code **不自帶模型 / 不收訂閱**，重用使用者既有的 Codex / Claude Code 授權。
- 相對於 Codex 官方 app：原生支援 Linux、開源、可自改。
- 相對於 [ComposioHQ/agent-orchestrator](https://github.com/ComposioHQ/agent-orchestrator)、cmux 等 agent 編排工具：t3code 更偏 GUI 包皮，編排能力較輕量、但 UI 完成度高。

### 外部評論
- [Better Stack 社群文章](https://betterstack.com/community/guides/ai/t3-code/)：稱其為「管理 AI coding agent 的 open-source GUI」，肯定 worktree 隔離與 PR 流程。
- [Dominik Szaradowski Blog — T3 Code: The Bridge Between CLI and GUI](https://szaradowski.com/blog/t3-code-the-bridge-between-cli-and-gui-in-ai-coding)：主打「CLI 與 GUI 之間的橋樑」定位。
- [Medium — T3 Code vs Codex: Is the Free GUI Actually Better?](https://medium.com/@springmusk/t3-code-vs-codex-is-the-free-gui-actually-better-352df1c23932)：作者結論「有時候比較好，有時候沒有」，強調 t3code 不試圖取代 Codex，而是監督層。
- [Hacker News 討論串](https://news.ycombinator.com/item?id=47283655)：標題為「T3 Code – a new OSS agentic coding app that wraps Codex」。
- [SourcePulse 專案頁](https://www.sourcepulse.org/projects/25801753)：列為 top 6.2%，社群關注度高。
- [MacAIApps 收錄頁](https://www.macaiapps.com/apps/t3-code/)：確認 macOS Homebrew cask 可用。

### Release 狀態
有 release。最新為 [v0.0.20](https://github.com/pingdotgg/t3code/releases/tag/v0.0.20)（2026-04-17），內容為 `sidebarProjectGroupingOverrides` 防呆與版本升級前的依賴安裝修正；同日另有 [v0.0.19](https://github.com/pingdotgg/t3code/releases/tag/v0.0.19) 與 nightly build。版本仍在 0.0.x，官方明言「very very early, expect bugs」，且暫不接受外部 PR。

### 授權與社群
MIT 授權；9,373 stars、1,769 forks、737 open issues（2026-04-18 數據），顯示話題高但 issue 堆積快。由 [pingdotgg](https://github.com/pingdotgg) 組織維護，主導者為 Theo Browne。社群透過官方 Discord 支援，文件站 [mintlify.com/pingdotgg/t3code](https://www.mintlify.com/pingdotgg/t3code/introduction) 提供使用與 observability 說明。

## 更新紀錄
