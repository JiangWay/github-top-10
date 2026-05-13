---
repo: github/spec-kit
first_seen: 2026-05-14
last_updated: 2026-05-14
appearances: [2026-05-14]
growth_appearances: [2026-05-14]
has_releases: true
latest_release: v0.8.9
tags: [開發者工具, 框架, 開源替代]
domain: 開發者工具
form: 框架
themes: [開源替代]
---

# [github/spec-kit](https://github.com/github/spec-kit)

> 研究日期：2026-05-14
> 研究來源：https://github.com/github/spec-kit
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-05-14 首次）

### 專案定位
GitHub 官方推出的「規格驅動開發（Spec-Driven Development, SDD）」工具包，把 spec 從輔助文件升格為**可執行的契約**，由 AI coding agent 直接從規格產出實作；目標使用者是已採用 [github/copilot](https://github.com/features/copilot)、[anthropics/claude-code](https://github.com/anthropics/claude-code)、Gemini CLI 等 agent、但苦於缺乏流程紀律的開發者與團隊。

### 核心架構 / 主要概念
以 Python CLI `specify-cli`（需 Python 3.11+、`uv`／`pipx`、Git）為入口，`specify init` 在專案內鋪設 `.specify/` 目錄：`memory/constitution.md`（專案原則）、`specs/<feature>/{spec.md,plan.md,tasks.md}`、`templates/`、`scripts/`。透過注入 agent 端 slash command 串成七步流水線：`/speckit.constitution` → `/specify` → `/clarify` → `/plan` → `/tasks` → `/analyze` → `/implement`。已內建 30+ agent 整合（Copilot、Claude Code、Gemini、Cursor、Codex CLI、Tabnine、Goose 等），templates 採 project → presets → extensions → core 四級覆蓋優先序。

### 目標使用者
正在從「vibe coding」轉向工程化 AI 流程的個人開發者、需共用一致 prompt 與審核點的中大型團隊、以及想把 PRD 直接吃進 agent 而免去手工拆 task 的 PM／TL。

### 與類似專案的差異
- [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)：同樣強調多階段 agentic 工作流，但 BMAD 以多角色 persona 編排為核心，spec-kit 走「單一規格檔即真相」路線、更貼近瀑布形態。
- [Aider-AI/aider](https://github.com/Aider-AI/aider)：聚焦 in-place repo 編輯與 git commit；spec-kit 不取代 agent，而是疊一層 spec/plan/task 流程契約。
- 傳統 [openai/openai-cookbook](https://github.com/openai/openai-cookbook) 之類 PRD 範本：spec-kit 把模板、腳本、agent 整合與目錄結構**機械化**到 CLI 內，可直接 `uvx` 不需自己組裝。

### 外部評論
- [GitHub Blog 官方發佈文](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) 定義 SDD 為「spec 是真相、code 是產物」。
- [Hacker News 主串 #45154355](https://news.ycombinator.com/item?id=45154355) 與 [#45577377「What's the Deal with GitHub Spec Kit」](https://news.ycombinator.com/item?id=45577377) 兩波討論質疑此流程與 Formal Methods 的本質差別，並關切 legacy code 增量重構的可行性。
- [Microsoft for Developers 教學文](https://developer.microsoft.com/blog/spec-driven-development-spec-kit) 給出 Copilot 端完整示範。
- 中文社群：[知乎〈把規範驅動開發標準化了〉](https://zhuanlan.zhihu.com/p/1955597807982446342)、[Cash Wu 部落格初體驗](https://blog.cashwu.com/blog/2025/github-spec-kit-first-experience)、[doggy8088/spec-kit 繁中分支](https://github.com/doggy8088/spec-kit) 與 [888888888881/spec-kit-chinese 簡中漢化](https://github.com/888888888881/spec-kit-chinese) 已出現，反映亞洲開發者社群快速接手。

### Release 狀態
最新 `v0.8.9`（2026-05-12 由 github-actions bot 發佈），距上榜僅 2 天，屬高頻 patch 節奏；自 2025-08-21 創庫以來累積多版 minor，近期重點在 agent 整合擴充與 template 修正。

### 授權與社群
MIT License；98,180 stars / 8,550 forks / 546 watchers / 406 open issues。主要貢獻者 [@localden](https://github.com/localden)（361 commits）、[@mnriem](https://github.com/mnriem)（120）、[@Quratulain-bilal](https://github.com/Quratulain-bilal)（25），主語言 Python，topics 涵蓋 `ai`/`copilot`/`spec-driven`/`prd`，官方文件站 <https://github.github.com/spec-kit/>。
