---
repo: vercel-labs/open-agents
first_seen: 2026-05-08
last_updated: 2026-05-08
appearances: [2026-05-08]
growth_appearances: [2026-05-08]
has_releases: false
latest_release: null
tags: [AI Agent 框架, 框架, 開源替代]
domain: AI Agent 框架
form: 框架
themes: [開源替代]
---

# [vercel-labs/open-agents](https://github.com/vercel-labs/open-agents)

## 深度研究（2026-05-08 首次）

### 專案定位
Vercel Labs 釋出的雲端 coding agent 開源樣板（template / reference app），目標是讓開發者能 fork 後直接部署一套「背景跑」的 coding agent：從 chat prompt → sandbox VM 改 code → 自動 commit/push/PR，全程不需把本機開著。明確定位為 reference implementation 而非 SaaS 成品。

### 核心架構 / 主要概念
三層分離：
1. **Web 層**：Next.js 應用，負責 auth、session、chat UI 與串流。
2. **Agent workflow**：以 Vercel Workflow 跑 durable 多步流程，可中斷後重連 stream。
3. **Sandbox VM**：[Vercel Sandbox](https://vercel.com/docs/agent) 提供獨立 VM（filesystem、shell、git、dev server，預設開放 3000/5173/4321/8000 ports），閒置 hibernate、可 snapshot resume。

關鍵設計：**agent 跑在 sandbox 外**，透過工具呼叫 sandbox，模型選擇與沙箱生命週期解耦。整合服務含 Vercel AI Gateway、Neon Postgres、Vercel KV/Redis、GitHub App、Better Auth（Vercel + GitHub OAuth）、ElevenLabs 語音輸入。

### 目標使用者
熟悉 Next.js / Vercel 平台、想自架背景 coding agent 的開發團隊；以及想學「durable agent + sandbox」工程模式、把它改造成自家內部工具的工程師。

### 與類似專案的差異
- 對 [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot)：後者是純 chat 範本，open-agents 多了 durable workflow + sandbox + GitHub PR 自動化。
- 對 [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)：LangGraph 是通用 agent runtime 框架，open-agents 是綁定 Vercel 平台的完整 app stack。
- 對 [ruvnet/ruflo](https://github.com/ruvnet/ruflo)：ruflo 偏自進化 agent flow 編排，open-agents 鎖定 coding agent + cloud sandbox 場景。
- 對 [InsForge/InsForge](https://github.com/InsForge/InsForge)：InsForge 是 agent-native backend BaaS，open-agents 提供完整可 fork 的 frontend + agent runtime。

### 外部評論
- [InfoQ「Vercel Releases Open Agents to Support Background AI Coding Workflows」](https://www.infoq.com/news/2026/04/vercel-open-agents/) 描述其完整堆疊與 fork-friendly 設計。
- [Vercel Templates 官方頁](https://vercel.com/templates/template/open-agents) 提供一鍵部署。
- [Product Hunt 上架頁](https://www.producthunt.com/products/open-agents-2) 留言評為「真正推動生態前進的開源釋出」。

### Release 狀態
**尚無 GitHub Release**。專案以 main 分支持續推進（pushed_at 2026-05-06），版本資訊需追 commit 與 changelog。

### 授權與社群
MIT License；Organization 為 [vercel-labs](https://github.com/vercel-labs)。截至研究日 4,983 stars / 631 forks / 50 open issues / 13 watchers，社群以 fork 落地為主。

### 為何今日上榜
2026-04 Vercel 官方推 Open Agents 後，五月初 Product Hunt 上架 + InfoQ 報導擴散，加上 [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot) 既有受眾把它當「升級版範本」收藏，今日（2026-05-08）以 stars_today 160 衝上 trending #8。

### 風險與限制
- **平台鎖定**：架構深度綁 Vercel Sandbox / Workflow / KV / AI Gateway，搬離 Vercel 等於重寫。
- **非 production-ready**：官方明說是 reference，企業多租戶、額度、稽核需自行補。
- **成本不透明**：Sandbox VM + Workflow + AI Gateway 多項計費疊加，跑量大時成本曲線需自行壓測。
- **Agent 與 sandbox 解耦**：部分開發者質疑此邊界長期可能限制 agent 的低層能力。

### 觀察建議
追蹤 Vercel 是否把它升級為正式 template、何時釋出第一個 tag/release、以及社群是否出現非 Vercel 平台的 fork（替換 sandbox、AI Gateway）。若連續週留榜，再評估是否成為 [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot) 之後的下一代官方參考實作。
