---
repo: 1jehuang/jcode
first_seen: 2026-04-30
last_updated: 2026-05-05
appearances: [2026-04-30, 2026-05-01, 2026-05-02, 2026-05-03, 2026-05-04, 2026-05-05]
growth_appearances: [2026-04-30, 2026-05-01, 2026-05-02, 2026-05-03, 2026-05-04, 2026-05-05]
has_releases: true
latest_release: v0.11.9
tags: [AI Agent 框架, 框架, 多代理編排, 開源替代]
domain: AI Agent 框架
form: 框架
themes: [多代理編排, 開源替代]
---

# [1jehuang/jcode](https://github.com/1jehuang/jcode)

## 深度研究（2026-04-30 首次）

### 專案定位
[1jehuang/jcode](https://github.com/1jehuang/jcode) 由單一作者 [1jehuang](https://github.com/1jehuang) 於 2026-01-05 開源，是一套用 Rust 寫的「Coding Agent Harness」——亦即包覆 LLM、提供工具呼叫、終端 UI、記憶與多會話編排的外殼層。它不自帶模型，而是接 Claude / OpenAI / 任意 LLM provider，定位明確：**重寫整個 harness 把資源效率與單機多會話拉到極致**，自稱「the next generation coding agent harness to raise the skill ceiling」。MIT 授權，topics 涵蓋 `ai`、`claude`、`openai`、`mcp`、`coding-agent`、`tui`、`rust`，立場是現有 Node/TS harness（Claude Code、OpenCode、Cursor Agent、Copilot CLI）的**Rust 原生重寫替代品**。

### 核心架構 / 主要概念
README 提供了完整 benchmark 表，是這個專案的核心賣點：單一 active session 下 jcode 約 27.8–167 MB PSS、Time to first frame 14 ms，相較之下 [anthropics/claude-code](https://github.com/anthropics/claude-code) 386 MB／3437 ms（jcode 的 13.9× RAM、245× 啟動時間）。其他關鍵子系統：
- **Memory（agent memory）**：每輪對話被 embed 成向量、寫入記憶圖，靠 cosine similarity 自動召回相關片段，並由 sideagent 抽取與整併，做出類人記憶；不需要 agent 主動呼叫 memory tool。
- **Swarm**：可在同一 repo 裡開多個 agent 由 server 統一管控，A 改檔時自動通知 B，支援 DM 與廣播訊息，自動處理衝突。
- **Side panels / Info widgets / mermaid 渲染**：作者另外開了兩個附屬專案——[1jehuang/mermaid-rs-renderer](https://github.com/1jehuang/mermaid-rs-renderer)（無 browser/TS 依賴、宣稱比原版快 1800×）與 [1jehuang/handterm](https://github.com/1jehuang/handterm)（自製終端，支援 native scrollback API）。
- **MCP 與多 provider**：內建 MCP 客戶端、可掛 Claude / OpenAI / 其他 provider。

### 目標使用者
- 在本機長時間跑多個 coding agent session、被 Node-based harness 吃光 RAM 的重度使用者；
- Rust 開發者與想看 reference Rust agent runtime 實作的 infra 工程師；
- 偏好 self-hosted、不想被 Anthropic / OpenAI 官方 CLI 綁定、希望自選 provider 的使用者。

### 與類似專案的差異
這個賽道在 2026 年已經很擁擠：
- [anthropics/claude-code](https://github.com/anthropics/claude-code)、[openai/codex](https://github.com/openai/codex)：原廠 CLI、生態最完整但綁特定 provider、Node 啟動成本高。
- [cline/cline](https://github.com/cline/cline)：以 VS Code extension 形態為主，IDE 整合勝出但非純終端。
- [obra/superpowers](https://github.com/obra/superpowers)：走 Claude Code Skill 路線，做的是 prompt/skill 層而非整個 harness。
- 同類 Rust harness 還有 [Dicklesworthstone/pi_agent_rust](https://github.com/Dicklesworthstone/pi_agent_rust)、[Kuberwastaken/claurst](https://github.com/Kuberwastaken/claurst)、[nwyin/tau](https://github.com/nwyin/tau)。

jcode 與這些 Rust 同行的差異在**完成度**：自帶記憶圖、swarm、自製 mermaid renderer、自製 terminal，README 是少見願意公開放出 RAM／FPS／TTFF 對照表的 harness——這在多 session 場景的數據優勢相當明顯。

### 外部評論
**尚無顯著外部評論**。WebSearch 沒有找到 Hacker News、Reddit、主流部落格針對 [1jehuang/jcode](https://github.com/1jehuang/jcode) 的專文討論；專案 4 個月、單一作者主導（contributions 2,692），目前主要訊號就是 GitHub repo 本身與單日 +386 stars 的 trending 動能。

### Release 狀態
釋出節奏極快，至 2026-04-30 已累積 30 個 release，最新版本 [v0.11.1](https://github.com/1jehuang/jcode/releases/tag/v0.11.1)（2026-04-28）。release 由 GitHub Actions 自動建置，提供 Linux x86_64、macOS、Windows 的預編譯 binary，搭配 `curl | bash` 安裝腳本與 Homebrew、`cargo install` 等多種管道。

### 授權與社群
MIT License。Stars 1,243、forks 120、watchers 13、open issues 44。貢獻者目前實質只有作者本人 [1jehuang](https://github.com/1jehuang)，是典型的「個人作者高速迭代型」開源項目；社群指標仍在早期，但版本節奏與 README 完整度顯示作者投入度極高。

## 更新紀錄

### 2026-05-01
- 連榜 Day 2，stars 總量由昨日 1,242 漲至 1,818（24 小時 +576），今日 stars_today +386 → +670（+73.6%），growth_rate 31.08% → 36.85% 為今日全榜第一；絕對榜由昨日 #5 退至 #7，但增長率榜由昨日 #1 守住 #1。
- 4-30 一日連發 4 個 release：[v0.11.2](https://github.com/1jehuang/jcode/releases/tag/v0.11.2)、[v0.11.3](https://github.com/1jehuang/jcode/releases/tag/v0.11.3)、[v0.11.4](https://github.com/1jehuang/jcode/releases/tag/v0.11.4)、[v0.11.5](https://github.com/1jehuang/jcode/releases/tag/v0.11.5)（由 13:10–18:29 UTC，5 小時內 4 版），延續首日紀錄的「個人作者高速迭代」節奏；累計 release 數由 30 增至 34。
- 主要變更：以 patch 級別連續修補首日上榜後湧入的 issue，未見 changelog 摘要，body 僅附 GitHub compare diff 連結。

### 2026-05-04
- **連榜 Day 5**（4-30、5-01、5-02、5-03、5-04），距離本站歷來連榜紀錄保持人 [mattpocock/skills](https://github.com/mattpocock/skills) 的 6 日只差一日，是當前榜內唯一仍在累積連榜天數的種子；絕對榜由 #6 升至 #8（嗯實為小升、實際排名因今日榜內僅 9 檔波動有限），但 growth_rate 17.70% → 17.57% 幾乎持平、增長榜由 #2 退至 **#3**（讓位給首次上榜的 [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) 19.25%）；stars_today +482 → +587（+21.8%），total stars 2,723 → 3,341（+618）首度過 3k。
- 新版本：[v0.11.9](https://github.com/1jehuang/jcode/releases/tag/v0.11.9)（2026-05-03 01:09:45 UTC，於上次更新時間之後釋出）；累計 release 數由 35 升至約 38（v0.11.7、v0.11.8、v0.11.9 三檔在 5-01～5-03 間連發）。
- 主要變更：仍為 patch 級別 / 沒有 changelog 摘要的高速迭代節奏，與首日以來「個人作者每日多版」風格一致。

### 2026-05-05
- **連榜 Day 6（4-30～5-05）— 追平本站歷來連榜紀錄保持人 [mattpocock/skills](https://github.com/mattpocock/skills) 的 6 日紀錄**；絕對榜由 #8 升至 **#8**（持平），growth_rate 17.57% → 14.23%（−3.34pp）連續 3 日守在 14% 以上區間；stars_today +587 → +545（−7.2%）首度小幅冷卻；total stars 3,341 → 3,830（+489）；增長率榜守 **#3**。
- Release 端**無新版本**（最新仍為 [v0.11.9](https://github.com/1jehuang/jcode/releases/tag/v0.11.9)，2026-05-03），是連榜以來首次出現 release 端「靜止 24+ 小時」，但 stars 仍續增——顯示連榜後段已脫離「靠頻繁版本推熱度」階段，進入有機曝光擴散。
- 與另一檔 Rust agentic dev tooling [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)（連 2 日、growth #1）形成「Rust agent 雙王」並列：兩檔合計貢獻今日 stars_today +1,822（佔當日全榜的 18.4%），是本日最大共振類別。
- **明日（5-06）若 jcode 仍在榜，將寫下本站歷來首個 7 日連榜紀錄**——值得緊盯。