---
repo: bytedance/UI-TARS-desktop
first_seen: 2026-05-10
last_updated: 2026-05-10
appearances: [2026-05-10]
growth_appearances: [2026-05-10]
has_releases: true
latest_release: v0.3.0
tags: [AI Agent 框架, 應用程式, 自架, 多代理編排]
domain: AI Agent 框架
form: 應用程式
themes: [自架, 多代理編排]
---

# [bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop) — 深度研究

## 深度研究（2026-05-10 首次）

### 專案定位
[bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop) 是 ByteDance 推出的開源多模態 AI Agent stack，定位為「連接前沿 AI 模型與 Agent 基礎建設」的整合層。包含兩條產品線：UI-TARS Desktop（基於 UI-TARS 視覺語言模型的桌面 GUI Agent，Windows/macOS）與 Agent TARS（瀏覽器導向、CLI 可用的通用多模態 Agent 框架）。核心訴求：用 VLM 直接「看螢幕、操作鍵鼠」完成跨應用任務，取代腳本化自動化。

### 核心架構 / 主要概念
- **多模態感知 + 原生 GUI 控制**：螢幕截圖 → VLM 推理 → 鍵盤滑鼠精準輸入。
- **MCP 為核心 kernel**：可掛載外部 MCP server 串接真實工具。
- **Hybrid Browser Agent**：視覺 grounding、DOM 操作、混合策略三選一。
- **Event Stream 驅動架構**：context engineering 與 UI 都吃同一條事件流。
- **Model-agnostic**：不綁定自家 UI-TARS-1.5/2 模型，可換 Claude、GPT 等供應商。

### 目標使用者
GUI Agent 研究者、想做電腦/瀏覽器自動化但不想寫脆弱 selector 腳本的開發者、需在地端跑 agent 保資料主權的企業 PoC 團隊，以及想實驗 MCP 生態整合的 Agent 應用工程師。

### 與類似專案的差異
對比 [browser-use/browser-use](https://github.com/browser-use/browser-use) 偏 DOM-first 與單純瀏覽器，UI-TARS-desktop 是作業系統層 GUI Agent 並提供原生模型。對比 [microsoft/OmniParser](https://github.com/microsoft/OmniParser) 僅做螢幕解析，本專案是端到端 Agent 應用 + 模型 + 框架三位一體。

### 外部評論
- VentureBeat 指 UI-TARS 7B/72B 在 10+ GUI benchmark 超越 GPT-4o、Claude、Gemini [(來源)](https://venturebeat.com/ai/bytedances-ui-tars-can-take-over-your-computer-outperforms-gpt-4o-and-claude)
- MarkTechPost 評 UI-TARS-1.5 為「真正可用的開源 GUI Agent」，但仍有運算成本高與誤判風險 [(來源)](https://www.marktechpost.com/2025/04/21/bytedance-releases-ui-tars-1-5-an-open-source-multimodal-ai-agent-built-upon-a-powerful-vision-language-model/)
- arXiv UI-TARS-2 技術報告：OSWorld 47.5、WindowsAgentArena 50.6、AndroidWorld 73.3，多輪 RL 後再上一階 [(來源)](https://arxiv.org/html/2509.02544v1)

### Release 狀態
- 最新版本：v0.3.0（2025-11-04）
- 主要特性：GUI Agent 2.0 範例、image detail calculator 強化截圖處理、aio-sandbox 系列改進。

### 授權與社群
- 授權：Apache-2.0
- Stars：31,290（維護方：ByteDance）
- 主要貢獻者：ulivz（677）、ycjcl868（171）、ZhaoHeh（77）、cjraft（53）、skychx（35）

## 更新紀錄
