---
repo: makecindy/cindy
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: true
latest_release: v0.1.115
tags: [LLM 客戶端, 應用程式, 資料主權]
domain: LLM 客戶端
form: 應用程式
themes: [資料主權]
---

# [makecindy/cindy](https://github.com/makecindy/cindy)

> 研究日期：2026-10-25
> 研究來源：https://github.com/makecindy/cindy
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[makecindy/cindy](https://github.com/makecindy/cindy) 是桌面加手機的 agent 客戶端，把 [anthropics/claude-code](https://github.com/anthropics/claude-code) 與 [openai/codex](https://github.com/openai/codex) 包進同一個 GUI，可以中途換模型或 harness，memory 與 skill 會跟著走。

## 作者與起源

repo 2026-07-22 建立，官網 cindy.app，依中文社群報導由 TapTap（心動網絡）團隊推出。主要貢獻者 dashhuang（2,209 commits）、zqchris（1,670）、MagicLizi。三個月累計 4,369 stars；[CSDN 一篇文章](https://deepseek.csdn.net/6a881738662f9a54cb9f3768.html) 記錄前 3 週 2,240 stars。

## 核心架構 / 主要概念

- **pnpm monorepo**：`apps/desktop`（Electron）、`apps/mobile`（Expo / React Native），共用 `packages/*` 處理 auth、裝置連結、agent 編排、model provider
- **harness 二進位**：claude-code、codex、ripgrep 不放進 repo，`pnpm install` 時依平台下載；Windows 打包前用 sha256 驗證 Android platform-tools
- **登入方式**：沿用既有 Claude / Codex 訂閱、自備 API key、接本機模型
- **Skip Sign-In 模式**：不登雲端帳號，只跑本機 agent
- **開源範圍**：只開 client，後端在私有 repo
- **遙測**：走 TapDB，聲明不收對話與檔案內容

## 設計哲學

> "Consider it done. The open-source AI agent that works out of the box · 想到，就能做到。开源、开箱即用的 AI Agent。"

「開箱即用」是相對 CLI 說的：使用者不必在終端機裝設定，用 GUI 就能叫 Claude Code 或 Codex 做事，手機也能接。

## 目標使用者與適用情境

- 已付 Claude Code 或 Codex 方案、想要桌面與手機共用入口的個人開發者
- 想在不同 harness 間保留同一份 memory 與 skill 的人
- 要求資料不出本機者可用 Skip Sign-In
- **不適用**：要稽核完整資料流的企業，後端未開源；偏好純終端工作流的使用者

## 與類似專案的差異

| 對手 | 對方做法 | Cindy 的差異 |
|---|---|---|
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | 自有 agent 邏輯，Docker 加 Web UI | 不自寫 agent，包裝既有 Claude Code / Codex CLI，加上手機 app |
| [microsoft/autogen](https://github.com/microsoft/autogen) | Python 多代理 framework，要寫程式 | 終端使用者產品，不需寫程式 |

## 外部評論

- [CSDN「3 週 2,240 stars」](https://deepseek.csdn.net/6a881738662f9a54cb9f3768.html)：定位為 Claude Code / Codex 的統一入口，記憶與 skill 跨 harness 保存
- [CSDN AI Coding](https://aicoding.csdn.net/6a82d1a7662f9a54cb9dd875.html)：稱它是「跑在 Claude Code / Codex 之上的作業系統」
- [機核網](https://www.gcores.com/articles/217633)：開頭質疑「又一個山寨貨」，認為本質是 Claude / Codex 的 UI 包裝，持保留態度
- 未見 HN / Reddit 主串討論，資料不足

## Release 狀態 / 時間軸

- 2026-07-22 建 repo
- 2026-09-09 首個 release v0.1.76
- 2026-10-23 最新 v0.1.115，46 天 30 版，約 1.5 天一版
- 2026-10-25 首次上 trending（+477），增長率 10.92% 為當日第一
- 桌面版走官方 CDN 自動更新

## 授權與社群

- 授權：Apache-2.0（client）
- Stars 4,369 / Forks 621 / Watchers 18 / Open issues 1,903
- 主語言：TypeScript
- 擁有者：組織（makecindy）
- commit 需 DCO sign-off，無 CLA
- open issues 數量是 stars 的 44%，issue 分類處理跟不上

## 資料來源

- **本體**：[GitHub repo](https://github.com/makecindy/cindy)、[Releases](https://github.com/makecindy/cindy/releases)、cindy.app
- **第三方評論**：[CSDN 3 週文](https://deepseek.csdn.net/6a881738662f9a54cb9f3768.html)、[CSDN AI Coding](https://aicoding.csdn.net/6a82d1a7662f9a54cb9dd875.html)、[機核網](https://www.gcores.com/articles/217633)
- **同類工具**：[All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)、[microsoft/autogen](https://github.com/microsoft/autogen)

## 更新紀錄
