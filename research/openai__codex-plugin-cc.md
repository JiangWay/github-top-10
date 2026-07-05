---
repo: openai/codex-plugin-cc
first_seen: 2026-07-05
last_updated: 2026-07-05
appearances: [2026-07-05]
growth_appearances: [2026-07-05]
has_releases: true
latest_release: v1.0.5
tags: [LLM 客戶端, Skill 外掛, 企業級]
domain: LLM 客戶端
form: Skill 外掛
themes: [企業級]
---

# [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)

> 研究日期：2026-07-05
> 研究來源：https://github.com/openai/codex-plugin-cc
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-07-05 首次）

### 專案定位
OpenAI 於 2026-03-30 官方釋出的 Claude Code plugin，讓使用者在 [anthropics/claude-code](https://github.com/anthropics/claude-code) 的 session 內直接呼叫 Codex 做 code review 或委派任務。定位是「同一 IDE 內做 cross-provider 交叉檢查」：Claude 寫、Codex 審，用不同 model 互審對方輸出避開單一模型的 sycophancy 偏誤。目標痛點是 Claude Code 用戶不想換工具、又想拿 Codex 的意見。

### 核心架構 / 主要概念
- Plugin 用 JavaScript 寫（非 TypeScript app 產物，倉庫另掛 `tsconfig.app-server.json`）
- 目錄結構：`.claude-plugin/`、`plugins/codex/`、`scripts/`、`tests/`
- 對外暴露 8 個 `/codex:*` slash command：
  - `review`、`adversarial-review`、`rescue`、`transfer`（v1.0.5 新增，把 Claude session 交棒給 Codex thread）
  - `status`、`result`、`cancel`、`setup`
- 內含 subagent `codex:codex-rescue`（僅 rescue 命令能改 code）
- SessionStart hook（供 transcript path）與可選 Stop hook（review gate）
- 底層 wrap Codex app-server，透過本機 `codex` binary 執行，設定沿用 `~/.codex/config.toml`

### 目標使用者
既用 Claude Code、又持有 ChatGPT 訂閱或 OpenAI API key 的開發者。情境：
- 提交 PR 前跑 `/codex:review` 或 `/codex:adversarial-review` 讓 Codex 挑毛病
- 把繁重雜工用 `--model gpt-5.4-mini` 丟給 `/codex:rescue` 背景跑
- 長串對話用 `/codex:transfer` 交給 Codex 續做

### 與類似專案的差異
- 不同於社群自製的 CLI wrapper（例如把 Codex 當外部子程序呼叫的第三方 skill）：這是 OpenAI 官方 plugin，走 Anthropic plugin marketplace 分發
- 直接用 Codex app-server 而非 fork Codex CLI，故命令、認證、config 都與 [openai/codex](https://github.com/openai/codex) 同源
- vs [obra/superpowers](https://github.com/obra/superpowers) 這類純 Claude Code Skill 生態：本 plugin 目的是引入第二個 LLM 意見，而非擴充 Claude 自身能力

### 外部評論
- [OpenAI Developer Community 發表貼文](https://community.openai.com/t/introducing-codex-plugin-for-claude-code/1378186)：OpenAI 官方公告串，[dkundel-openai](https://github.com/dkundel-openai) 說明安裝與 review / rescue 流程
- [The Decoder 報導](https://the-decoder.com/openai-launches-a-codex-plugin-that-runs-inside-anthropics-claude-code/)：把此舉解讀為「OpenAI 走進對手主場」，因 Claude Code 市佔高，Codex 主動嵌入而非等使用者遷移
- [nathanonn 部落格](https://www.nathanonn.com/codex-plugin-claude-code-review/)：實測心得，稱 adversarial review 能挑出 Claude 自審漏掉的邏輯錯誤
- [Mark Chen (Medium)](https://medium.com/@markchen69/when-rivals-collaborate-installing-openais-codex-plugin-in-claude-code-5d3e503ce493)：安裝教學與 6 行 prompt 驗證流程
- [alphasignalai substack](https://alphasignalai.substack.com/p/you-can-now-trigger-codex-from-claude)：對比 Claude 與 Codex 互審的 bias 差異——Claude 找 big-picture、Codex 找 correctness

### Release 狀態
有 6 個 release：
- v1.0.0（2026-03-30 首發）
- v1.0.1（03-31）、v1.0.2（03-31）
- v1.0.3（04-08）
- v1.0.4（04-18）
- v1.0.5（06-23，最新）——新增 `/codex:transfer` 命令做 session handoff

### 授權與社群
- License：Apache-2.0
- Stars：24,706（截至 2026-07-05）
- Forks：1,494、Subscribers：78、Open issues：276
- 首個 commit 2026-03-30
- 主要 committer：OpenAI 員工 [dkundel-openai](https://github.com/dkundel-openai)（11 commits，plugin 維護者）
- 外部貢獻者：[xiaolai](https://github.com/xiaolai)（2 commits，修 codex-rescue frontmatter 與 `$ARGUMENTS` quoting）、[VOIDXAI](https://github.com/VOIDXAI)（5 commits，Windows / cwd 修補）
- 上榜當日 +718 stars（增長率 2.91%），開版 97 天累積至 24.7k stars，日均約 254 stars
