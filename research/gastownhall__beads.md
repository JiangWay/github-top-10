---
repo: gastownhall/beads
first_seen: 2026-04-27
last_updated: 2026-04-28
appearances: [2026-04-27, 2026-04-28]
growth_appearances: [2026-04-27, 2026-04-28]
has_releases: true
latest_release: v1.0.3
tags: [AI Agent 框架, 框架, 多代理編排]
domain: AI Agent 框架
form: 框架
themes: [多代理編排]
---

# [gastownhall/beads](https://github.com/gastownhall/beads)

> 研究日期：2026-04-27
> 研究來源：https://github.com/gastownhall/beads
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[gastownhall/beads](https://github.com/gastownhall/beads) 是 [Steve Yegge](https://github.com/steveyegge) 主導、用 Go 寫的「coding agent 記憶升級包」：一個 Git-native 的依賴感知 issue graph 資料庫，讓 AI agent 跨 session 仍能延續長任務脈絡。

## 作者與起源

repo 掛在 GitHub Organization [gastownhall](https://github.com/gastownhall)（Gas Town Hall，網站 gastownhall.ai），但實際 commit 4,554 次的最大貢獻者是 [steveyegge](https://github.com/steveyegge)——前 Amazon、Google、Grab、Sourcegraph 的資深工程師，40 年寫程式經歷。專案於 2025-10-12 建立，至今 197 天，平均每天約 110 顆星，共累積 21,592 stars、1,435 forks、82 watchers，153 個 open issues。Organization 本身 2026-01 才註冊，bio 寫「Building community for Gas Town, your AI agent orchestrator」，beads 應是該 orchestrator 的記憶子系統。Topics 標記為 `agents`、`claude-code`、`coding`。

## 核心架構 / 主要概念

beads 是 Go 實作的 CLI 工具（指令 `bd`），底層儲存為 **Dolt**——一個版本控制式 SQL 資料庫——而非 SQLite 或向量資料庫（早期版本用 SQLite 作為 read-model cache）。執行模式有兩種：

- **Embedded Mode**（預設）：Dolt 在 process 內執行，資料存於 `.beads/embeddeddolt/`，單寫入者。
- **Server Mode**：連線外部 Dolt SQL server，支援多寫入者。

每個 task 是一顆「bead」，以 hash-based ID（`bd-a1b2`）避免多 agent / 多 branch 平行寫入時的合併衝突，相互間以依賴圖串成「線」。內建語意化「memory decay」：自動壓縮已關閉舊任務以節省 context window。

## 設計哲學

README 與 Yegge 在 [Twitter / X](https://x.com/Steve_Yegge/status/1977645937225822664) 的描述：

> "A magical 4-dimensional graph-based git-backed fairy-dusted issue-tracker database, designed to let coding agents track all your work and never get lost again."

正式 tagline 為 "Distributed graph issue tracker for AI agents, powered by Dolt."。核心信念有三：(1) tooling 要為 LLM 理解最佳化（JSON 輸出、最小 token）而非為人；(2) JSONL append-only + Git 的非同步多人協作勝過中央 SQL；(3) 業務邏輯（依賴圖、優先級）寫在工具二進位，不要塞進 agent system prompt。

## 目標使用者與適用情境

- 跑 [Claude Code](https://github.com/anthropics/claude-code) / Cursor / Codex 等 agent，受困於 ~10 分鐘 context 漂失的開發者
- 多 agent 平行協作、需 conflict-free 任務合併的工作流
- 厭倦 `TODO.md` 散亂、想要結構化長任務追蹤的個人開發者
- open-source 維護者（支援 forked repo 模式）

## 與類似專案的差異

| 專案 | 儲存層 | 抽象 | 主要對象 |
|---|---|---|---|
| [gastownhall/beads](https://github.com/gastownhall/beads) | Dolt（version-controlled SQL）+ Git | 依賴圖 issue graph | coding agent 任務追蹤 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 向量 DB + LLM | 自然語言記憶條目 | 通用 LLM agent 對話記憶 |
| [zilliztech/claude-context](https://github.com/zilliztech/claude-context) | Milvus 向量索引 | 程式碼語意檢索 | 大型 codebase 上下文增強 |

beads 走「結構化任務圖」路線，與走「向量化語意記憶」的 [mem0](https://github.com/mem0ai/mem0)、[claude-context](https://github.com/zilliztech/claude-context) 是互補而非替代——一個管「該做什麼、依賴誰」，另一個管「以前說過什麼、code 長什麼樣」。

## 外部評論

- [Steve Yegge 於 Medium 的 Introducing Beads](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a) — 作者本人闡述：agent 開機時所知的一切只有 disk 上的內容，beads 即是把長任務脈絡寫回 disk。
- [VirtusLab 部落格 GitHub All-Stars #12](https://virtuslab.com/blog/ai/beads-give-ai-memory)（作者 Artur Skowroński）：盛讚 Git-as-database 帶來的 "conflict-free merging of plans"，並指出「programming 的未來不是更聰明的模型，而是給模型更好的工具」。
- [Hacker News 討論串 #45566864](https://news.ycombinator.com/item?id=45566864) 與 [#46075616](https://news.ycombinator.com/item?id=46075616) — 兩波熱度，社群關注 Dolt 後端遷移與 agent-first 工具設計。
- [DoltHub 官方部落格](https://www.dolthub.com/blog/2026-01-27-long-running-agentic-work-with-beads/) — Dolt 團隊背書，視 beads 為 long-running agentic work 的旗艦案例。

## Release 狀態 / 時間軸

積極發版。`gh api` 顯示自 2026-01-05 v0.44.0 起共 30 餘版，節奏約週更：

- v0.44.0（2026-01-05）→ v0.49.x（2026-01–02）→ v0.50.x–v0.62.0（2026-02–03 快速迭代）
- v1.0.0（2026-04-03）首個 stable 大版
- v1.0.3（2026-04-24，目前最新）

提供 Linux / macOS / Windows / Android arm64 等多平台二進位 tarball，由 GitHub Actions 自動發版。

## 授權與社群

- License：MIT
- Stars：21,592（今日 +133，當日成長率 0.62%）
- Forks：1,435；Watchers：82；Open issues：153
- 建立至今約 197 天，平均約 110 stars/day——以 2026 年 agent memory 賽道而言屬於頂段
- 主要貢獻者：[steveyegge](https://github.com/steveyegge)（4,554）、[maphew](https://github.com/maphew)（331）、[coffeegoddd](https://github.com/coffeegoddd)（237）、[turian](https://github.com/turian)（98）、[harry-miller-trimble](https://github.com/harry-miller-trimble)（64）；其餘多為個位數至數十次貢獻的長尾社群

組織帳號 [gastownhall](https://github.com/gastownhall) 共 18 個 public repos，beads 是其旗艦專案。

## 資料來源

- GitHub API: `gh api repos/gastownhall/beads`、`/contributors`、`/releases`、`users/gastownhall`
- WebFetch: [GitHub 主頁](https://github.com/gastownhall/beads)
- WebSearch: Hacker News、Steve Yegge Medium、VirtusLab、DoltHub 部落格
- 對照專案：[mem0ai/mem0](https://github.com/mem0ai/mem0)、[zilliztech/claude-context](https://github.com/zilliztech/claude-context)

## 更新紀錄
