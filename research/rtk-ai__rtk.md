---
repo: rtk-ai/rtk
first_seen: 2026-05-20
last_updated: 2026-05-20
appearances: [2026-05-20]
growth_appearances: [2026-05-20]
has_releases: true
latest_release: v0.40.0
tags: [開發者工具, 應用程式, 自架, 資料主權]
domain: 開發者工具
form: 應用程式
themes: [自架, 資料主權]
---

# [rtk-ai/rtk](https://github.com/rtk-ai/rtk)

## 深度研究（2026-05-20 首次）

### 專案定位

[rtk-ai/rtk](https://github.com/rtk-ai/rtk)（**R**ust **T**oken **K**iller）是 Apache-2.0 授權的 Rust CLI proxy，坐落於 shell 與 LLM 編碼代理之間，攔截 `git`／`cargo test`／`pytest`／`docker`／`kubectl` 等 100+ 開發指令輸出並壓縮 60–90%，讓 [anthropics/claude-code](https://github.com/anthropics/claude-code)、Cursor、Copilot、Gemini CLI、[cline/cline](https://github.com/cline/cline)、[Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) 等 13 種 agent 在不改 prompt 與工作流的前提下大幅降低 token 帳單。50,704 stars / 3,094 forks / 122 watchers / 947 open issues、創建於 2026-01-22、4 個月內衝破 5 萬 stars 為 2026 年「AI cost-reduction」賽道明星。

### 核心架構 / 主要概念

- 單一 Rust binary、零依賴、<10ms overhead
- **四種壓縮策略**：smart filtering（去 noise／whitespace）、result grouping、truncation、deduplication（重複日誌摺疊計數）
- `rtk init --global` 在 Claude Code 安裝 PreToolUse hook，**自動重寫** Bash 指令為 rtk 等效版本；無 hook 支援的工具改用 `CLAUDE.md` injection
- 範例：`git status` 3,000→600 tokens（-80%）、`cargo test` 25,000→2,500（-90%）、30 分鐘 session 118k→23.9k（-80%）
- 保留 test failure／stack trace／diff 完整語意，只壓 boilerplate
- `rtk gain` analytics dashboard 顯示節省量；`~/.config/rtk/config.toml` 可 per-project 客製

### 目標使用者

重度使用 AI coding agent 的開發者：每日跑數十次 `cargo test`／`pytest`／`git diff` 撞 context window 上限、想壓低 Anthropic／OpenAI API 帳單、想延長單次 session 有效對話長度的個人與小型團隊。

### 與類似專案的差異

- 不同於 [BerriAI/litellm](https://github.com/BerriAI/litellm)（多 provider routing proxy），rtk **在 shell 輸出層**動手——agent 看到的指令結果就已是壓縮版，不碰 prompt 也不換 model
- 不同於 context compression library（如 LLMLingua 在 prompt 層壓縮），rtk 走 shell 攔截路徑、不需修改 agent 端 prompt 處理邏輯
- 與同日上榜的 [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) 對比：codegraph 從「查詢端」省 tokens（pre-indexed knowledge graph 取代反覆 grep），rtk 從「執行端」省 tokens（壓縮 shell 輸出）；二者形成「token 節省雙線」

### 外部評論

- [Esteban Estrada — RTK: The Rust Binary That Slashed My Claude Code Token Usage by 70%](https://codestz.dev/experiments/rtk-rust-token-killer)
- [DEV Community — RTK: Cut Your AI Coding Bill by 80% With One CLI Tool](https://dev.to/arshtechpro/how-rtk-reduces-llm-token-usage-for-ai-coding-agents-2kfd)
- [themenonlab.blog — rtk: A Rust CLI Proxy That Cuts AI Agent Token Usage 60-90%](https://themenonlab.blog/blog/rtk-cli-proxy-token-reduction-ai-agents)
- [Kilo-Org/kilocode Discussion #5848 — I saved 10M tokens (89%) on my Claude Code sessions](https://github.com/Kilo-Org/kilocode/discussions/5848)
- [skillsllm.com 收錄頁](https://skillsllm.com/skill/rtk)
- [everydev.ai 收錄頁](https://www.everydev.ai/tools/rtk-rust-token-killer)
- [daily.dev 收錄頁](https://app.daily.dev/posts/khyarnwhs)

### Release 狀態

共 169 個 release、69 個 stable。最新 stable：[v0.40.0](https://github.com/rtk-ai/rtk/releases/tag/v0.40.0)（2026-05-13），最新 pre-release：`dev-0.41.0-rc.227`（2026-05-19）。首版 v0.2.0（2026-01-23）——repo 2026-01-22 建立後 **4 個月迭代到 v0.40**，由 `rtk-release-bot` 自動發版，迭代節奏每週數版屬高頻活躍專案。

### 授權與社群

Apache-2.0、Rust 主語言、50,704 stars / 3,094 forks / 122 watchers / 947 open issues、官網 [rtk-ai.app](https://www.rtk-ai.app/)、organization 帳號 rtk-ai。issue 與 discussion 皆開啟、release 機器人化、topics 涵蓋 `agentic-coding`／`claude-code`／`cost-reduction`／`token-optimization`。從 2026-01 建立到 5 個月內衝破 5 萬 stars 屬 2026 年「AI cost-reduction」賽道明星專案。
