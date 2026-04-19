---
repo: obra/superpowers
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]
growth_appearances: [2026-04-18]
has_releases: true
latest_release: v5.0.7
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
<!-- 第二次以後 append -->
