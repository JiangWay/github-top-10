---
repo: lobehub/lobehub
first_seen: 2026-05-09
last_updated: 2026-05-09
appearances: [2026-05-09]
growth_appearances: []
has_releases: true
latest_release: v2.1.56
tags: [LLM 客戶端, 應用程式, 多代理編排, 開源替代]
domain: LLM 客戶端
form: 應用程式
themes: [多代理編排, 開源替代]
---

# [lobehub/lobehub](https://github.com/lobehub/lobehub)

> 研究日期：2026-05-09
> 研究來源：<https://github.com/lobehub/lobehub>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[lobehub/lobehub](https://github.com/lobehub/lobehub) 是原 [lobehub/lobe-chat](https://github.com/lobehub/lobe-chat)（同 repo 直接改名）在 2026 年初轉型後的新身份，從「開源 ChatGPT/Claude 客戶端」升級為以 Agent Team 為核心、把 agent 當成工作交付單位的多代理協作平台，桌面端、雲端、self-host 三線並進。

## 作者與起源

主要作者為 [arvinxx](https://github.com/arvinxx)（2,341 contributions）與 [canisminor1990](https://github.com/canisminor1990)（553 contributions），自稱「a group of e/acc design-engineers」，特長是設計 + 工程整合。Repo 於 **2023-05-21** 以 `lobe-chat` 之名建立，2023 年 7 月發出 v0.1.0 系列、2024-06-17 推出 v1.0.0，2026 年初配合 Agent Team 功能與品牌升級，把 GitHub repo 從 `lobe-chat` 直接改名為 `lobehub`，導致今日仍同時保有 76,407 stars 與 15,109 forks 的舊有積累——**76k 星不是新爆紅，是品牌轉型時繼承下來的歷史資產**。官網 <https://lobehub.com> 同步從「ChatGPT/OLLama UI」改寫成「Agent teammates that grow with you」。

## 核心架構 / 主要概念

技術堆疊以 **TypeScript + Next.js** 為主（語言佔比近全部），預設分支為 `canary`，採 semantic-release 自動發版（`semantic-release-bot` 為貢獻 #1，2,372 次）。核心概念有四：

- **Agent Team / Agent Group**：由 LLM 自動組裝多個專業 agent（例：Code Reviewer、Bug Hunter、Doc Writer）並行作業，原名 group chat，現重新命名為 Agent Team。
- **Pages**：多 agent 在共享上下文中合作撰寫與精修文件。
- **MCP Plugin 生態**：宣稱與 10,000+ MCP-compatible 工具整合（topics 含 `mcp`、`agent-harness`）。
- **Personal Memory + Knowledge Base**：個人記憶層加上檔案上傳與向量檢索，跨對話延續。

桌面端基於 Electron 打包（release assets 含 `LobeHub-*-arm64-mac.zip` 等多平台檔），server gateway 模式則透過 WebSocket 串流多 agent 結果。

## 設計哲學

README 將整個產品壓在一句口號上：

> "Agent teammates that grow with you."
> "We are taking agent harness to the next level — enabling multi-agent collaboration, effortless agent team design, and introducing agents as the unit of work interaction."

「會跟著你一起長大的代理隊友」——把 agent 從工具升格為 *teammate*；並把工作交付的最小單位從「對話 / 訊息」抽換成「agent」，這是與一般 ChatGPT 客戶端最關鍵的概念位移。

## 目標使用者與適用情境

適合**已熟悉 LLM 工具、想脫離單一 ChatGPT 視窗、需要多 agent 並行（程式審查、文件、研究、翻譯等）**的個人開發者、小型團隊、AI 重度使用者；同時提供 `$9.90 / $19.90 / $39.90 / Enterprise` 的 SaaS 方案，credit 制計費。**不適用**：只想要乾淨的單對話 ChatGPT 替代品（多 agent 與 credit 制反而是負擔）、嚴格資料離境合規場域（雲端版需審 SaaS 條款，self-host 才是選項）。

## 與類似專案的差異

| 對手 | 本專案的差異 |
|---|---|
| [lobehub/lobe-chat](https://github.com/lobehub/lobe-chat)（前身） | 同一 repo 改名後的延伸：保留舊有 chat UI、模型聚合、知識庫，新增 Agent Team / Pages / Workspace、桌面端、SaaS 計費；老的「聚合型 LLM 客戶端」定位被覆蓋 |
| [microsoft/autogen](https://github.com/microsoft/autogen)、[crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | LobeHub 是「面向終端使用者的 GUI 產品」，AutoGen / CrewAI 是「給開發者寫多 agent 程式的框架」；LobeHub 沒打算讓你 import library 寫 Python，主要差異是 GUI、桌面 app、agent marketplace、訂閱制服務 |

選型建議：要寫程式自訂 multi-agent 流程選 AutoGen / CrewAI；要一個現成的桌面 / 雲端產品立刻用得到、能上 marketplace 拉現成 agent 的選 LobeHub。

## 外部評論

- [BrightCoding: LobeHub: Build AI Agent Teams That Actually Collaborate（2026-04-07）](https://blog.brightcoding.dev/2026/04/07/lobehub-build-ai-agent-teams-that-actually-collaborate)：稱其為「revolutionary multi-agent framework」、與 AutoGen / CrewAI / LangChain 對比後給出全勝表，但**完全沒有列出限制或缺點**，屬於行銷導向報導，需打折看待。
- [Toolworthy: LobeHub Review (2026)](https://www.toolworthy.ai/tool/lobehub)：較均衡，列出 cons 包含「credit-based pricing creates unpredictable costs」「steep learning curve for optimal agent team configuration」「overkill for users wanting straightforward conversational AI」。
- [Product Hunt: LobeHub – Agent teammates that grow with you](https://www.producthunt.com/products/lobehub)：產品頁，可見近期社群觀察。
- [GitHub Issue #9741 – Agent Team Now Available on LobeHub](https://github.com/lobehub/lobehub/issues/9741)：官方公告的 feedback thread，可看真實使用者的 bug 回報與 feature request 走向。

未見顯著 Hacker News / Reddit 主串對「lobehub 改名」事件的集中討論，資料不足；中文社群目前大多仍以舊名 `lobe-chat` 提及。

## Release 狀態 / 時間軸

- **2023-05-21**：repo 以 `lobe-chat` 之名建立。
- **2023-07-18**：v0.1.6 起連續密集發版（多版本同日發出）。
- **2024-06-17**：v1.0.0 釋出，正式進入穩定線。
- **2026-03 ~ 2026-04**：v2.1.40 ~ v2.1.55 高頻迭代（每數天一個版本）。
- **2026-05-01**：v2.1.56（最新穩定版）。
- **2026-05-08**：Desktop Canary v2.1.57-canary.29（持續日級別 canary 釋出）。
- 品牌與 repo 名稱由 `lobe-chat` → `lobehub` 的轉換發生於 2026 年初，配合 Agent Team 與企業 / SaaS 戰略。

## 授權與社群

- License：**Other（LobeHub Community License）**，部分元件 Apache 2.0；不是純 OSS，使用前須確認 community license 條款。
- ⭐ **76,407 stars**、🍴 **15,109 forks**、👀 288 subscribers、open issues 759。
- Topics：`agent`、`agent-collaboration`、`agent-harness`、`ai`、`chatgpt`、`claude`、`deepseek`、`gemini`、`gpt`、`knowledge-base`、`mcp`、`openai`。
- 主力語言：TypeScript（壓倒性）。
- 76k 星 / 15k forks 的量級**主要繼承自 lobe-chat 時期的兩年累積**，並非「一週爆紅」；fork:star ≈ 1:5 是 self-host 客戶端常見比例（用戶傾向 fork 後自部署）。
- 高頻發版（近兩個月 16 個 minor、daily canary）顯示是**全職團隊產品**而非業餘專案。

## 資料來源

**本體**
- [GitHub repo: lobehub/lobehub](https://github.com/lobehub/lobehub)
- [LobeHub 官網](https://lobehub.com)
- [LobeHub Changelog](https://lobehub.com/changelog)
- [LobeHub Blog](https://lobehub.com/blog)
- [Agent Team docs](https://lobehub.com/docs/usage/features/agent-team)

**第三方評論**
- [BrightCoding 介紹文（2026-04-07）](https://blog.brightcoding.dev/2026/04/07/lobehub-build-ai-agent-teams-that-actually-collaborate)
- [Toolworthy 評測](https://www.toolworthy.ai/tool/lobehub)
- [Product Hunt 產品頁](https://www.producthunt.com/products/lobehub)
- [GitHub Issue #9741: Agent Team feedback](https://github.com/lobehub/lobehub/issues/9741)

**同類工具**
- [lobehub/lobe-chat（前身 repo）](https://github.com/lobehub/lobe-chat)
- [microsoft/autogen](https://github.com/microsoft/autogen)
- [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)

## 更新紀錄
