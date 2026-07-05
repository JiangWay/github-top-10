---
repo: alibaba/page-agent
first_seen: 2026-07-05
last_updated: 2026-07-05
appearances: [2026-07-05]
growth_appearances: [2026-07-05]
has_releases: true
latest_release: v1.11.0
tags: [AI Agent 框架, 框架, 多代理編排]
domain: AI Agent 框架
form: 框架
themes: [多代理編排]
---

# [alibaba/page-agent](https://github.com/alibaba/page-agent)

> 研究日期：2026-07-05
> 研究來源：https://github.com/alibaba/page-agent
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-07-05 首次）

### 專案定位
阿里巴巴開源的 in-page GUI agent：把 agent 當作純 JavaScript library 直接嵌進網頁 runtime，不需 headless browser、不需截圖、不需 vision model。訴求場景是 SaaS 內嵌 copilot、ERP／CRM 表單自動化、無障礙輔助。MIT 授權、TypeScript、v1.11.0 於 2026-07-03 釋出。

### 核心架構 / 主要概念
- **DOM dehydration**：把 live DOM 壓成 FlatDomTree 純文字結構，交給任何 OpenAI 相容 API 的 text LLM 決策（README 範例用 Qwen3.5-plus，也列 GPT-4o、Claude、DeepSeek、Ollama local model）
- **動作層**：以 DOM API 直接觸發 click／type／scroll，模擬真實使用者，不走 CSS selector 或 XPath
- **跨 tab**：主流程在 client-side JS 跑，跨 tab 場景另附 Chrome extension（beta）
- **外部控制**：提供 MCP Server 讓外部 agent 控制頁面

### 目標使用者
- SaaS 產品開發者：想在自家 web app 內建 AI copilot 的團隊
- 企業內部 ERP／CRM 自動化：想用 LLM 跑既有 web 表單流程
- 無障礙輔助工具開發者
- 想避開 headless browser 部署成本、只在使用者瀏覽器內跑 agent 的場景

### 與類似專案的差異
- vs [browser-use/browser-use](https://github.com/browser-use/browser-use)（Python + Playwright headless、後端執行）：page-agent 完全 client-side、appli 內建 copilot 導向
- vs [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)（外部 MCP 驅動 Playwright）：page-agent 不啟動獨立瀏覽器 process
- vs Anthropic computer-use（螢幕截圖 + 座標點擊、需 vision model）：page-agent 靠文字化 DOM 讓小模型也能精準操作，token 用量低、延遲低
- 三家都是 server-side／desktop-side 自動化取向，page-agent 明確鎖 SaaS 內嵌 copilot 場景

### 外部評論
- [MarkTechPost 2026-07-02 報導](https://www.marktechpost.com/2026/07/02/meet-alibabas-page-agent-a-javascript-in-page-gui-agent-that-controls-web-interfaces-with-natural-language-through-the-dom/)：首波英文技術媒體曝光，重點是「透過 DOM 而非螢幕截圖控制頁面」的取向差異
- 中文社群暫無深度技術評論可引（v1.11.0 剛於 7-03 釋出，7-05 才登上 trending）

### Release 狀態
v1.11.0（2026-07-03）附 Chrome extension zip。專案自 2025-09-23 建立，v1 系列迭代密集。

### 授權與社群
- License：MIT
- Stars：23,241（截至 2026-07-05）
- Forks：2,014
- Watchers：74
- 主要維護者：[gaomeng1900](https://github.com/gaomeng1900)
- 官網：<https://alibaba.github.io/page-agent/>

### 風險與限制
- Single-page 為主，跨 tab 依賴 Chrome extension
- DOM 文字化對 canvas／純圖形介面覆蓋不足
- LLM 需自備、API key 管理與資料外流由使用者自負
