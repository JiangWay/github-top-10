---
repo: pbakaus/impeccable
first_seen: 2026-06-01
last_updated: 2026-06-01
appearances: [2026-06-01]
growth_appearances: [2026-06-01]
has_releases: true
latest_release: cli-v2.3.2
tags: [開發者工具, Skill 外掛, 開源替代]
domain: 開發者工具
form: Skill 外掛
themes: [開源替代]
---

# [pbakaus/impeccable](https://github.com/pbakaus/impeccable)

> The design language that makes your AI harness better at design.

## 深度研究（2026-06-01 首次）

### 專案定位

[pbakaus/impeccable](https://github.com/pbakaus/impeccable) 是給 AI 編碼工具（Claude Code、Cursor、Codex CLI、Gemini CLI、VS Code Copilot）安裝的「設計語言 skill」，補上 AI harness 在前端設計上的詞彙與品味缺口。作者 Paul Bakaus 把問題定義為「AI 生出的 UI 都長一樣」：清一色 Inter 字體、紫到藍漸層、卡片包卡片、彩色背景配灰字、每個標題前都放一塊圓角圖示。專案以一個 skill 配 23 個指令把這套反 AI slop 規範灌進模型上下文，今天上 trending 靠累積 32,370 stars 與 2026-05-30 發布的 CLI 2.3.2 推進。

### 核心架構 / 主要概念

- **1 skill + 23 commands**：核心指令包含 `/impeccable audit`、`/polish`、`/critique`、`/distill`、`/animate`、`/bolder`、`/quieter`、`/harden`、`/typeset`、`/colorize`、`/layout` 等動詞化操作面。
- **7 份 domain reference 檔**：typography、color/contrast、spatial、motion、interaction、responsive、UX writing，每次指令觸發時一起載入上下文。
- **anti-pattern 偵測**：27 條 deterministic rule + 12 條 LLM critique rule，獨立 CLI 可在無 AI harness 環境跑（抓側欄 border、紫色漸層、bounce easing、暗光暈、行長過長、padding 過擠、觸控目標過小、跳過 heading level 等 24 類問題）。
- **兩種模式**：brand（行銷／作品集／editorial）與 product（app UI／dashboard／內部工具）。
- **安裝路徑**：`npx impeccable skills install` 自動偵測 harness，或從 [impeccable.style](https://impeccable.style/) 下載，或手動 copy repo。

### 目標使用者

- 用 Claude Code / Cursor / Codex CLI / Gemini CLI / VS Code Copilot 寫前端的工程師——主受眾
- 想把 AI 產出的草圖收斂到自己品牌規範的設計師
- 不介入 design tool（Figma 端），而是介入 codegen 端

### 與類似專案的差異

- 與 Anthropic 官方 frontend-design skill 的關係：impeccable 是其擴展版，加上 23 個動詞指令與更多 anti-pattern。
- 與 [shadcn-ui/ui](https://github.com/shadcn-ui/ui) 等 component library 的差異：shadcn 給的是 component 實作，impeccable 給的是模型上下文與品味守則，不綁特定 UI library。
- 與 [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) 的差異：tailwind 是 CSS utility，impeccable 是教 AI 該用哪些 token、避免哪些反模式的 meta layer。
- 在「AI harness skill」分類裡，是目前 stars 最高的設計類 skill 之一。

### 外部評論

- [Paul Bakaus 在 X](https://x.com/pbakaus/status/2029334353894162720)：「Impeccable v1.1 is out. Design fluency for every AI harness. New: all commands are now agent skills, support for Antigravity, VS Code, simplify → distill (to not conflict w/ CC's new built-ins), universal install」
- [Composio 部落格 "Top 10 Design Skills for Claude Code and Codex"](https://composio.dev/content/top-design-skills)：把 impeccable 列入 Claude Code 與 Codex 的設計類 skill 前十名。
- [Emelia 評測 "The Claude Code Design Skill That Kills AI Slop in Your Frontend"](https://emelia.io/hub/impeccable-design-skill-review)：強調 27 條 deterministic anti-pattern rule 加 12 條 LLM critique 的雙層偵測，對「AI slop」收斂效果可量化。
- [PyShine "Impeccable: The Design Language That Makes AI Better at Design"](https://pyshine.com/Impeccable-Design-Language-for-AI/)：把 impeccable 描述為「補上 developer intent 與 AI execution 之間的 vocabulary 落差」。

### Release 狀態

最新版本 **CLI 2.3.2**，發布於 2026-05-30，主要變更為移除 `i-` 命令前綴（單一 skill 架構下用不到）。專案有持續 release tag（cli-v2.3.x 系列）。

### 授權與社群

- 授權：Apache-2.0
- Stars：32,370；Forks：1,766；Subscribers：60
- 個人 repo（owner: pbakaus，作者 Paul Bakaus），非組織專案
- 主語言：JavaScript
- 提供 homepage [impeccable.style](https://impeccable.style/) 作為官網與安裝引導
