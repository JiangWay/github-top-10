---
repo: google-gemini/gemini-cli
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: true
latest_release: v0.65.0
tags: [LLM 客戶端, 應用程式, 企業級]
domain: LLM 客戶端
form: 應用程式
themes: [企業級]
---

# [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

> 研究日期：2026-10-25
> 研究來源：https://github.com/google-gemini/gemini-cli
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) 是 Google 開源的終端 coding agent。2026-06-18 起免費與 Google One 使用者已移到 Antigravity CLI，這個 repo 現在主要服務付費 Code Assist、Gemini API 與 Vertex AI 用戶。

## 作者與起源

google-gemini 組織 2025-04-17 建 repo。貢獻數前三名：scidomino（391）、NTaylorMullen（332）、abhipatel12（273）。README 寫明免費入口於 2026-06-18 移轉到 Antigravity CLI，新一代 Gemini 模型建議改用 Antigravity。今日只有 +44 stars，上榜靠 trending 演算法的排序而非單日增量。

## 核心架構 / 主要概念

- **內建工具**：檔案讀寫、shell、web fetch / search
- **擴充**：接 MCP server、自訂 extension
- **安全**：sandbox、trusted folders
- **整合**：VS Code companion
- **非互動模式**：輸出 text、JSON 或 streaming JSON，可寫進腳本與 CI
- **認證**：Google 登入、Gemini API key、Vertex AI 三種

## 設計哲學

> "An open-source AI agent that brings the power of Gemini directly into your terminal."

這句描述寫於免費入口仍開放時。移轉後，repo 的定位實際上變成「Google Cloud 付費用戶的終端入口」。

## 目標使用者與適用情境

- 付費 Code Assist Standard / Enterprise、Gemini API、Vertex AI 用戶
- 要把 agent 接進 CI、需要 JSON 輸出的開發者
- **不適用**：想用免費額度的個人使用者，應改用 Antigravity CLI；想用最新 Gemini 模型者，README 建議改用 Antigravity

## 與類似專案的差異

| 對手 | 對方做法 | gemini-cli 的差異 |
|---|---|---|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | 評測多稱其多檔重構表現較好（[Tembo](https://www.tembo.io/blog/codex-vs-claude-code-vs-gemini-cli)） | 綁 Google Cloud 認證與計費，可走 Vertex AI |
| [openai/codex](https://github.com/openai/codex) | 預設開 sandbox，支援 Windows 原生 | 過去賣點是免費額度與 1M token context，免費入口關閉後主要差異剩 Google Cloud 整合 |

## 外部評論

- [DeployHQ](https://www.deployhq.com/blog/comparing-claude-code-openai-codex-and-google-gemini-cli-which-ai-coding-assistant-is-right-for-your-deployment-workflow)：指出消費者認證已停，Code Assist Standard / Enterprise 與付費 API 仍可用
- [Daniel Vaughan 2026-05 評測](https://codex.danielvaughan.com/2026/05/04/terminal-agent-showdown-codex-cli-claude-code-gemini-cli-may-2026/)：以 v0.40.0 對比 Codex CLI 與 Claude Code
- [Tembo](https://www.tembo.io/blog/codex-vs-claude-code-vs-gemini-cli)：三家終端 agent 比較
- 未找到 HN 主串討論，資料不足

## Release 狀態 / 時間軸

- 2025-04-17 建 repo
- 2026-05 v0.40.0（依 Daniel Vaughan 評測）
- 2026-06-18 免費入口移轉到 Antigravity CLI
- 2026-10-20 最新 stable v0.65.0；nightly 每日一版（最新 v0.67.0-nightly.20261025）；stable 與 preview 每週二各發一次

## 授權與社群

- 授權：Apache-2.0
- Stars 108,347 / Forks 14,829 / Watchers 587 / Open issues 763
- 主語言：TypeScript
- 擁有者：組織（google-gemini）
- 今日增長率 0.04%（+44 / 108,347），當日榜內最低

## 資料來源

- **本體**：[GitHub repo](https://github.com/google-gemini/gemini-cli)、[Releases](https://github.com/google-gemini/gemini-cli/releases)
- **第三方評論**：[DeployHQ](https://www.deployhq.com/blog/comparing-claude-code-openai-codex-and-google-gemini-cli-which-ai-coding-assistant-is-right-for-your-deployment-workflow)、[Daniel Vaughan](https://codex.danielvaughan.com/2026/05/04/terminal-agent-showdown-codex-cli-claude-code-gemini-cli-may-2026/)、[Tembo](https://www.tembo.io/blog/codex-vs-claude-code-vs-gemini-cli)
- **同類工具**：[anthropics/claude-code](https://github.com/anthropics/claude-code)、[openai/codex](https://github.com/openai/codex)

## 更新紀錄
