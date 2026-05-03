---
repo: Hmbown/DeepSeek-TUI
first_seen: 2026-05-04
last_updated: 2026-05-04
appearances: [2026-05-04]
growth_appearances: [2026-05-04]
has_releases: true
latest_release: v0.8.7
tags: [AI Agent 框架, 應用程式, 開源替代, 多代理編排]
domain: AI Agent 框架
form: 應用程式
themes: [開源替代, 多代理編排]
---

# [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)

## 深度研究（2026-05-04 首次）

### 專案定位
[Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) 是一個以 Rust 寫成、跑在終端機裡的編碼代理（coding agent），專門為 DeepSeek V4 系列模型（`deepseek-v4-pro`、`deepseek-v4-flash`）量身打造，主打 1M token 脈絡視窗 + prefix cache + thinking-mode 串流。可視為一款「開源、單一二進位、DeepSeek 原生」版本的 [openai/codex](https://github.com/openai/codex) / Claude Code 對應品。

### 核心架構 / 主要概念
官方 README 描述為 `dispatcher → TUI → engine → tools` 的四層流水線：基於 [ratatui-org/ratatui](https://github.com/ratatui-org/ratatui) 的鍵盤介面與 async 引擎跑 agent loop，工具呼叫經由 typed registry 路由，並由耐久 task queue 管理 session 狀態。設計亮點：

- **原生 RLM（Recursive LLM Multiplexing）**：`rlm_query` 工具一次 fan-out 1–16 個 `deepseek-v4-flash` 子代理做平行批次分析、分解或推理。
- **三段互動模式**：Plan（唯讀規劃）/ Agent（每步審核）/ YOLO（全自動），對應不同信任邊界。
- **Side-git snapshots**：工作區回滾機制不會碰使用者真正的 `.git`，避免汙染版本史。
- **內建 MCP client、HTTP/SSE serve 模式、LSP 子系統**注入 post-edit 診斷，並支援 NVIDIA NIM、Fireworks、自架 SGLang。
- 單一 Rust 二進位、無 Node/Python runtime 相依。

### 目標使用者
- 想用 DeepSeek V4 取代 Claude / GPT 但又不想自己組 IDE 整合的開發者；
- 對 token 成本敏感、需要長時間後台跑批次（CI 清掃、過夜 doc 重生）的團隊；
- 偏好終端機 + 鍵盤工作流，且需要 1M context 處理整套 codebase 的工程師。

### 與類似專案的差異
- 對比 [sst/opencode](https://github.com/sst/opencode)：opencode 主打 70+ provider 通吃，DeepSeek-TUI 專注一家、把 V4 的 prefix cache 與 thinking-mode 吃到極致。
- 對比 [1jehuang/jcode](https://github.com/1jehuang/jcode)：兩者同為 Rust TUI coding agent，jcode 走 Claude / OpenAI 通用路線並強調本地檔案安全沙箱；DeepSeek-TUI 則以 DeepSeek 原生與 RLM 平行調度為招牌差異。
- 對比 [openai/codex](https://github.com/openai/codex) CLI：codex 綁定 OpenAI；DeepSeek-TUI 從零自研，核心 RLM 平行能力是其招牌差異。

### 外部評論
- [DeepSeek V4 — almost on the frontier (Hacker News)](https://news.ycombinator.com/item?id=47977026)：V4 發表討論串中多次提及社群急需「DeepSeek 原生 agent」，背景解釋了本專案突發竄升的需求面。
- [DeepSeek-TUI — AgentConn AI Agent Review](https://agentconn.com/agents/deepseek-tui/)：第三方目錄將其定位為「terminal-native, keyboard-driven, sub-agent orchestration」的代表作，強調 RLM 平行能力。
- [deepseek-tui-cli on Lib.rs](https://lib.rs/crates/deepseek-tui-cli) 與 [crates.io](https://crates.io/crates/deepseek-tui)：兩處 Rust 套件登錄頁皆已收錄，crates 下載量持續攀升。
- 中文社群尚未見大型評論文章（資料不足）。

### Release 狀態
有 release。最新版本 [v0.8.7](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.7)（2026-05-03 發布），由 GitHub Actions 自動產出多平台 binary 與 sha256 檢核檔。版本快速迭代中（0.8.x 系列 active）。

### 授權與社群
- **授權**：MIT。
- **社群規模**：2,022 stars、117 forks、6 watchers、106 open issues。
- **貢獻者**：以作者 [Hmbown](https://github.com/Hmbown)（Hayden Brown）為主（523 commits），目前僅 1 名外部貢獻者 [pizofreude](https://github.com/pizofreude)。屬於典型「個人主導、社群剛點火」階段的快速崛起專案。
