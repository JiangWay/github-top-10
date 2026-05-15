---
repo: obra/superpowers
first_seen: 2026-04-18
last_updated: 2026-05-16
appearances: [2026-04-18, 2026-04-30, 2026-05-01, 2026-05-02, 2026-05-14, 2026-05-16]
growth_appearances: [2026-04-18, 2026-04-30, 2026-05-01, 2026-05-02, 2026-05-14, 2026-05-16]
has_releases: true
latest_release: v5.1.0
tags: [AI Agent 框架, Skill 外掛]
domain: AI Agent 框架
form: Skill 外掛
---

# [obra/superpowers](https://github.com/obra/superpowers)

## 深度研究（2026-04-18 首次）

### 專案定位
[obra/superpowers](https://github.com/obra/superpowers) 是一套給 AI 編碼代理（Coding Agent）使用的「完整軟體開發方法論」外掛，由 Jesse Vincent 與 Prime Radiant 團隊開發。它解決的核心問題是：讓像 Claude Code、Cursor、Codex 等代理不再「跳進去就寫碼」，而是被強制走過 clarify → design → plan → code → verify 的紀律流程，把資深工程師的工作習慣灌進代理中。

### 核心架構 / 主要概念
以「可組合的 Skills」為單位，透過自動觸發的提示工程把代理導進七階段工作流：brainstorming、git worktree、planning、execution、TDD、code review、branch 完成。特色包括強制 RED-GREEN-REFACTOR（代理若先寫 code 會被要求刪除重來）、subagent 兩段式審查、把任務切成 2–5 分鐘的細粒度 plan，以及 critical issue 會真正阻擋進度。專案主要以 Shell 腳本與 Markdown skill 檔組成。

### 目標使用者
使用 Claude Code、Cursor、OpenAI Codex、Gemini、GitHub Copilot 的個人開發者或小團隊，特別是希望代理能長時間（數小時）自動作業卻不偏離計畫的重度 AI coding 使用者。

### 與類似專案的差異
- [anthropics/claude-code](https://github.com/anthropics/claude-code)：官方 CLI，本身不規範工作流；superpowers 是插在其上的方法論層。2026-01 已被納入官方 plugin marketplace。
- [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) 與 [obra/superpowers-lab](https://github.com/obra/superpowers-lab)：同作者的配套 marketplace 與實驗場，superpowers 本體則專注穩定版 skill。
- [BMad-Code/BMAD-METHOD](https://github.com/BMad-Code/BMAD-METHOD)：同樣主打「代理流程方法論」，但偏角色扮演式 agent 團隊；superpowers 更聚焦 TDD 與強制紀律。

### 外部評論
- Simon Willison 在 [simonwillison.net](https://simonwillison.net/2025/Oct/10/superpowers/) 轉介作者原文，肯定其在實務上讓代理可長時間自動運作的效果。
- Evan Schwartz 的 [A Rave Review of Superpowers](https://emschwartz.me/a-rave-review-of-superpowers-for-claude-code/) 指出「比原生 Claude Code 生產力大增、產出更正確」，且作者與他無任何利害關係。
- Medium 技術部落格 [Claude Code Got 100x Better With Superpowers](https://medium.com/@codeandbird/claude-code-got-100x-better-with-superpowers-skill-a36450f708b1) 強調強制 TDD 是最大加分點。

### Release 狀態
已有 release，最新為 **v5.0.7**（2026-03-31），近一個月內有 v5.0.4–v5.0.7 多次迭代，維護活躍。

### 授權與社群
MIT License；主要作者 Jesse Vincent（obra）及 Prime Radiant 團隊，透過 Discord 與 GitHub Issues 接受社群貢獻，自 2025-10 建立以來迅速累積數萬星（2026-04 已達十萬級），屬高活躍度、已進入 Anthropic 官方 plugin marketplace 的旗艦專案。

## 更新紀錄

### 2026-04-30
- 距首次上榜（2026-04-18）已 12 天後再度入絕對榜，名次 #9（總 172,913 / 今日 +1,683），growth_rate 0.97%、增長率榜 #10。stars 由 4-18 的約 122k 漲至 173k（12 天 +51k，仍呈指數爆紅曲線），與當日 [warpdotdev/warp](https://github.com/warpdotdev/warp) 開源（+11,955）形成「agentic dev tooling 大舉再上榜」的氛圍。
- 自 `last_updated`（2026-04-18）以來無新 release：最新版仍為 [v5.0.7](https://github.com/obra/superpowers/releases/tag/v5.0.7)（2026-03-31），等同近一個月未發版。`latest_release` 維持 v5.0.7。

### 2026-05-14
- 距上次上榜（2026-05-02）已 **12 天**後再度入絕對榜，名次 #3（總 189,326 / 今日 +1,506），growth_rate 0.80%、增長榜 #10。stars 由 5-02 的 ~175k 漲至 **189k**（12 天 +14k），曲線從 4 月的指數爆紅期過渡到「持續穩定累積」期。
- 自 v5.0.7（2026-03-31）後新發 [v5.1.0](https://github.com/obra/superpowers/releases/tag/v5.1.0)（2026-05-04），即跨入 5.1 minor 版本；`latest_release` 更新為 **v5.1.0**。
- 同日 [mattpocock/skills](https://github.com/mattpocock/skills)、[github/spec-kit](https://github.com/github/spec-kit) 三檔 AI 編碼方法論 / Skills 框架同時在榜（5-14 個股研究檔均已就位），是本站首次「方法論型框架」三足鼎立同框。

### 2026-05-16
- 隔 1 日從 5-14 後歸隊，**累計 6 次上榜**；名次升至 #2（總 192,618 / 今日 +1,646）、growth_rate 0.85%、增長榜 #8。stars 由 5-14 的 189,326 漲至 192,618（2 天 +3,292），續穩定累積。
- 同日 [mattpocock/skills](https://github.com/mattpocock/skills) 守 #10、[anthropics/skills](https://github.com/anthropics/skills) **首次上榜** #7、[K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) 首次上榜 #3——「Skill 外掛 / Agent 編碼方法論」單日 4 檔同框打破 5-14 三足鼎立紀錄。
- `latest_release` 自 v5.1.0（2026-05-04）後 12 天無新 release——12 天無發版為自進入 5.x 以來最長空檔。
