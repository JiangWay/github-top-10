---
repo: presenton/presenton
first_seen: 2026-05-24
last_updated: 2026-05-24
appearances: [2026-05-24]
growth_appearances: [2026-05-24]
has_releases: true
latest_release: v0.8.5-beta
tags: [語音與多媒體, 應用程式, 自架, 資料主權, 開源替代]
domain: 語音與多媒體
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [presenton/presenton](https://github.com/presenton/presenton)

## 深度研究（2026-05-24 首次）

### 專案定位

[presenton/presenton](https://github.com/presenton/presenton)（6,266 stars / 1,110 forks / 2025-05-10 建立滿一年 / Apache-2.0 / TypeScript 76% + Python 19% / Next.js + Electron 前端 + FastAPI 後端）是「開源版 Gamma / Beautiful AI / Decktopus」——AI 簡報生成器與 API 平台，主打**自架 + 自帶 API key + 本地 LLM**三條開源敘事正面對打雲端付費 SaaS。今日以 +335 stars / growth_rate 5.36% 首登絕對榜 #10，呼應本月「開源替代雲端訂閱」趨勢線（5-18「替代」榜單中 9 檔皆此主題）。倉建立滿一年達 6.2k stars、forks/stars 達 17.7% 高比例顯示「自架部署」實際需求強烈。

### 核心架構 / 主要概念

- **輸出格式**：PPTX（PowerPoint 完整可編輯）+ PDF；PPTX 為標準格式無需 Microsoft 官方合作
- **LLM provider 多元支援**：OpenAI（GPT-4）/ Google Gemini / Vertex AI / Azure OpenAI / Anthropic Claude / Amazon Bedrock / Fireworks / Together AI / Ollama 本地 / LM Studio / OpenAI-compatible 自訂端點
- **部署形態**：桌面 app（Windows / macOS / Linux）/ Docker 容器（含 GPU 版）/ 雲端 web 版三軌
- **API 設計**：RESTful `/api/v1/ppt/presentation/generate` 接受 prompt / 自訂 slide markdown / template / 語言 / tone / verbosity 參數，回傳 presentation ID / 檔案路徑 / 編輯連結；HTTP Basic Auth
- **MCP server 內建**：可走 Model Context Protocol 由 Claude Code / Claude Desktop 等 agent 直接呼叫生成簡報
- **template 系統**：HTML + Tailwind CSS 自訂 theme，無 vendor lock-in
- **發版節奏**：[v0.8.5-beta](https://github.com/presenton/presenton/releases/tag/v0.8.5-beta)（2026-05-12）為最新 Docker release，0.8.x 系列從 4-30 起 12 天 5 個 beta，仍處 beta 階段

### 目標使用者

需要在內部基礎建設或客戶私有雲產出簡報的企業（資料不離境合規場景）、要把簡報生成嵌入 SaaS 產品的開發者（呼叫 API 不需付 Gamma 訂閱）、跑本地 LLM 的研究實驗室與隱私敏感族群（Ollama 整合）、想跳出 Gamma 月費訂閱模式但仍要 AI 生成體驗的個人創作者。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [Gamma.app](https://gamma.app/) | Gamma 為閉源 SaaS（無自架 / 訂閱制 / 資料上雲）；本檔開源 Apache-2.0 / 自架 / 自帶 API key 走 pay-per-use |
| [Beautiful.ai](https://www.beautiful.ai/) / [Decktopus](https://www.decktopus.com/) | 同為閉源 SaaS 競品；本檔走完整 self-hosting + 本地 LLM |
| [presentations.ai](https://www.presentations.ai/) | 第三方比較頁面常用對照組—閉源產品；本檔開源 + 可自架 |
| [kulhunter/Gamma_OpenSource](https://github.com/kulhunter/Gamma_OpenSource) | 同樣自我定位「Open-Source Gamma Alternative」的小型 fork-style 倉；本檔規模、release 節奏、貢獻者活躍度遠勝 |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) 等 office 自動化倉 | 後者偏向格式轉換 utility；本檔提供端到端「prompt → 完整可演示簡報」生成流程 |

差異化關鍵：**唯一**同時提供「LLM provider 不限 + 完整 self-host + 桌面 + Docker + Web + MCP server + PPTX/PDF」六向覆蓋的開源簡報生成器。

### 外部評論

- [Presenton 官方部落格《The Best Open Source AI Presentation Generators》](https://presenton.ai/blogs/the-best-open-source-ai-presentation-generators) 自家對比文盤點同類開源簡報工具
- [Shivaraj Badu《The #1 Open-source Presentation Generator》DEV Community](https://dev.to/shivarajbadu/the-1-open-source-presentation-generator-3hf9) 由本檔核心貢獻者 [ShivaRajBadu](https://github.com/ShivaRajBadu) 撰寫推廣文
- 第三方比較頁面 [presenti.ai《The Best Alternative to Gamma》](https://presenti.ai/gamma-alternative/)、[slidespeak.co《Gamma vs Presentations.AI Compared (2026)》](https://slidespeak.co/comparison/gamma-vs-presentations-ai)、[prezent.ai《Gamma.app Review》](https://www.prezent.ai/blog/gamma-app-review)：在「Gamma 替代品」生態系中本檔常作為開源代表被列入清單
- HN / Reddit r/selfhosted r/LocalLLaMA：截至撰寫尚未發現密集主流社群討論串—**目前未發現顯著主流社群長文討論**，傳播主要靠 DEV Community 自宣 + 第三方 SaaS 比較頁回流

### Release 狀態

beta 階段，最新 [v0.8.5-beta](https://github.com/presenton/presenton/releases/tag/v0.8.5-beta)（2026-05-12 Docker 版）。0.8.x 系列：[v0.8.1-beta](https://github.com/presenton/presenton/releases/tag/v0.8.1-beta)（4-30）→ [v0.8.2-beta](https://github.com/presenton/presenton/releases/tag/v0.8.2-beta)（5-04）→ [v0.8.3-beta](https://github.com/presenton/presenton/releases/tag/v0.8.3-beta)（5-09）→ [v0.8.4-beta](https://github.com/presenton/presenton/releases/tag/v0.8.4-beta)（5-11）→ [v0.8.5-beta](https://github.com/presenton/presenton/releases/tag/v0.8.5-beta)（5-12）12 天 5 patch 屬高頻；倉 `pushed_at` 為 2026-05-23 顯示 main 分支仍每日活躍。

### 授權與社群

- **授權**：Apache-2.0
- **貢獻結構**：團隊主導—[sauravniraula](https://github.com/sauravniraula)（610 commits 核心 maintainer）+ [ShivaRajBadu](https://github.com/ShivaRajBadu)（404 commits）+ [sudipnext](https://github.com/sudipnext)（310 commits）+ [surajbeston](https://github.com/surajbeston)（190 commits）4 人為主力，其餘 4 名 contributor 為個位數 commits；典型「核心 4 人 + 零星社群 PR」結構
- **量化指標**：6,266 stars / **1,110 forks**（fork 比例 17.7% 為偏高，反映企業 / 個人實際下載自架）/ 46 open issues
- **Homepage**：<https://presenton.ai>（官方 hosted 版本入口，同時提供 self-host 文件）
- **Topics**：`ai-agent`, `ai-presentation`, `api`, `gamma`, `powerpoint-automation`, `powerpoint-free`, `powerpoint-generation`, `presentation` 共 8 個

## 資料來源

**本體**
- Repo：<https://github.com/presenton/presenton>
- 官網：<https://presenton.ai>
- Releases：<https://github.com/presenton/presenton/releases>

**外部評論與比較**
- [Presenton 官方對比文](https://presenton.ai/blogs/the-best-open-source-ai-presentation-generators)
- [DEV Community 推廣文](https://dev.to/shivarajbadu/the-1-open-source-presentation-generator-3hf9)
- [presenti.ai《The Best Alternative to Gamma》](https://presenti.ai/gamma-alternative/)
- [slidespeak.co《Gamma vs Presentations.AI》](https://slidespeak.co/comparison/gamma-vs-presentations-ai)
- [prezent.ai《Gamma.app Review》](https://www.prezent.ai/blog/gamma-app-review)
