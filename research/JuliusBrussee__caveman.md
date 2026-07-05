---
repo: JuliusBrussee/caveman
first_seen: 2026-07-05
last_updated: 2026-07-05
appearances: [2026-07-05]
growth_appearances: [2026-07-05]
has_releases: true
latest_release: v1.9.1
tags: [開發者工具, Skill 外掛, 開源替代]
domain: 開發者工具
form: Skill 外掛
themes: [開源替代]
---

# [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

> 研究日期：2026-07-05
> 研究來源：https://github.com/JuliusBrussee/caveman
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-07-05 首次）

### 專案定位
Claude Code / Codex / Gemini CLI / Cursor / Cline 等 30+ agent 通用的 skill / plugin。功能單一：把 agent 回覆從完整句子壓成「穴居人語」片段——去掉客套、填充詞、-ing 修飾，保留 code、path、指令逐字節不動。README 自測 10 題平均砍 65% output token（範圍 22–87%）。2026-04-04 建立，3 個月衝到 84k stars、4,691 forks、192 watchers、356 open issues。MIT。

### 核心架構 / 主要概念
Repo 是 monorepo，涵蓋 7 個 skill：
- `caveman`（主壓縮）
- `caveman-commit`（Conventional Commit ≤50 字元）
- `caveman-review`（一行 PR 註解）
- `caveman-stats`（token 節省統計 + statusline）
- `caveman-compress`（把 CLAUDE.md 這類 memory 檔重寫成穴居版，input token 每 session 省 46%）
- `caveman-help`
- `cavecrew`（子 agent 群：investigator / builder / reviewer）

骨架含 `.claude-plugin/`、`agents/`、`commands/`、`hooks`（散在 `src/`）、`benchmarks/`、`evals/`、`skills-lock.json`。安裝腳本 `install.sh` / `install.ps1` 自動偵測本機 agent 逐一裝妥；分五級：`lite` / `full`（預設）/ `ultra` / `wenyan`（文言文更短）。搭配 `caveman-shrink` MCP middleware 可壓縮任何 MCP server 的 tool description。

### 目標使用者
- Claude Code / Codex 重度使用者
- Claude Max 訂閱怕撞每週 token cap 的人
- 要在 statusline 秀「省了多少 token」的社群玩家

門檻：Node ≥ 18、一行 curl。

### 與類似專案的差異
- [obra/superpowers](https://github.com/obra/superpowers)：塞入寫程式規範與 sub-agent workflow，是「加東西」；caveman 是「減東西」（只改輸出風格）
- [anthropics/skills](https://github.com/anthropics/skills)、[mattpocock/skills](https://github.com/mattpocock/skills)：多 skill 集合但無 token 壓縮主題
- [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates)：template 集合，功能面而非風格面

caveman 用 meme 包裝一個 6 行 system prompt 就能做到的事，靠品牌辨識度取代技術壁壘。

### 外部評論
- [andrew.ooo Caveman Review](https://andrew.ooo/posts/caveman-claude-code-skill-token-savings-review/)：確認 output 端有效，但整體 Claude Code 費用 80–90% 花在 thinking 與 code generation，砍聊天字對總帳單影響有限
- [GrowwStacks 實測](https://growwstacks.com/blog/does-caveman-ai-really-cut-claude-tokens)：頭條數字被 adversarial baseline 灌水，真實輸出 token 節省落在 30–50%，一句 "be brief" 已能拿走多數收益
- [ClaudePluginHub 收錄頁](https://www.claudepluginhub.com/plugins/juliusbrussee-caveman)：三週衝 54k stars 屬異常速度，社群把它當梗傳
- [36Kr 中文報導](https://eu.36kr.com/en/p/3756289723286272)：「網友受夠 AI 廢話」角度，把 caveman 當文化事件

### Release 狀態
`has_releases: true`。最新 v1.9.1 —「65%, honestly」（2026-07-03），距上榜僅 2 天。release note 自稱 hook、installer、integration hardening 加上「重新誠實描述 65% 這個數字」的一輪修正。過去兩個月釋出頻率高（v1.9.0 到 v1.9.1 累積 50 個變更）。

### 授權與社群
- License：MIT
- 作者 [JuliusBrussee](https://github.com/JuliusBrussee) 提交 172 次
- 長尾貢獻者 30+ 人（第二名 [sebastianbreguel](https://github.com/sebastianbreguel) 9 次、`github-actions[bot]` 9 次自動化）
- 有 `SECURITY.md`、`CODE_OF_CONDUCT.md`、`CONTRIBUTING.md`（9.5 KB）、`AGENTS.md`、`GEMINI.md`
- Discussions 開啟
- 官網 <https://caveman.so/>
- Topics：ai / anthropic / claude / claude-code / llm / meme / prompt-engineering / skill / tokens
