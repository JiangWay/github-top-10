---
repo: virattt/dexter
first_seen: 2026-05-05
last_updated: 2026-05-06
appearances: [2026-05-05, 2026-05-06]
growth_appearances: [2026-05-06]
has_releases: true
latest_release: v2026.5.1
tags: [金融科技, 應用程式]
domain: 金融科技
form: 應用程式
themes: []
---

## 深度研究（2026-05-05 首次）

### 專案定位
[virattt/dexter](https://github.com/virattt/dexter) 是一個「住在終端機裡」的自主金融研究代理（autonomous financial research agent）：把複雜的財務問題拆成步驟、調用即時市場資料、自我驗證後輸出結論。作者用一句話形容：*「Claude Code, but for finance」*。2025-10-14 開源，至今約 23,065 stars、2,828 forks，主語言 TypeScript。

### 核心架構 / 主要概念
三個 agent 串接成驗證鏈：**Action Agent** 透過 [Financial Datasets API](https://financialdatasets.ai/) 取得即時財報（損益表、資產負債表、現金流量表）→ **Validation Agent** 嚴格檢查一致性與邏輯 → **Answer Agent** 合成最終答案。內建 loop detection 與 step limit 防止 agent 燒掉 API quota；採 CalVer 釋出（最新 [v2026.5.1](https://github.com/virattt/dexter/releases/tag/v2026.5.1) 加入 streaming lifecycle 與 token 計數 UI）。CLI 由 [Ink](https://github.com/vadimdemedes/ink)（React for CLI）渲染、底層走 LangChain，搭配 Bun runtime。

### 目標使用者
獨立投資人、賣方/買方分析師、量化研究員，以及想拿 LLM 做 fundamentals 研究的工程師。支援 OpenAI / Anthropic / Google / xAI / OpenRouter / Ollama 六家模型，可選 Exa 或 Tavily 做網搜，也內建 WhatsApp gateway 把 agent 接到手機上對話。

### 與類似專案的差異
- 對 [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund)（同作者前作、2024-11 開源、58,055 stars）：ai-hedge-fund 是六個角色（市場、量化、基本面、情緒、風控、組合）模擬投委會、目標是**做交易決策**；dexter 收斂到**單一研究 agent + 驗證層**，目標是**回答研究問題**而非下單，工程量更輕、更像「分析師助理」。
- 對 [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)：後者是學術導向的多代理交易框架（debate/辯論機制、Python），dexter 走 TypeScript + CLI 工具路線，沒有 debate/辯論回合，靠「驗證 agent」這道單向關卡確保正確性，更接近 production tool 而非研究 paper。

### 外部評論
- [YUV.AI 部落格](https://yuv.ai/blog/dexter)：稱 dexter 解決「AI 金融研究的信任問題」，亮點是 domain-specific validation layer 而非通用 self-reflection。
- [AIToolly 評論](https://aitoolly.com/ai-news/article/2026-03-29-dexter-an-autonomous-ai-agent-designed-for-advanced-financial-research-and-market-analysis)：強調 loop detection 與 step limit 是「防失控代理」的關鍵設計。
- [There's An AI For That](https://theresanaiforthat.com/ai/dexter/) 收錄為金融研究類工具。
- [@RoundtableSpace 在 X 的推](https://x.com/RoundtableSpace/status/2031041068847002103)：「住在終端機裡的自主金融研究員、相容 Claude / Codex / OpenClaw、會自我改進」。
- 作者 [@virattt 的 X 帳號](https://x.com/virattt) 持續更新 dexter 與 ai-hedge-fund 兩條線。

### Release 狀態
採 CalVer，每週至少一版，近期五版：[v2026.5.1](https://github.com/virattt/dexter/releases/tag/v2026.5.1)（streaming lifecycle、token 計數）、[v2026.4.29](https://github.com/virattt/dexter/releases/tag/v2026.4.29)（DeepSeek V4 + thinking mode）、[v2026.4.25](https://github.com/virattt/dexter/releases/tag/v2026.4.25)、[v2026.4.8](https://github.com/virattt/dexter/releases/tag/v2026.4.8)（slash command hint bar）、[v2026.4.1](https://github.com/virattt/dexter/releases/tag/v2026.4.1)（per-endpoint TTL 快取、`.dexter/RULES.md` 自訂規則）。

### 授權與社群
**目前 repo 未掛任何 license**（GitHub API `license: null`），對企業採用是潛在阻力，建議使用前確認商用條件。社群以單一作者為主：[virattt](https://github.com/virattt)（Virat Singh）獨佔 395 commits，第二名 MkDev11 僅 10 commits、長尾貢獻者各 1–6 commits，open issues 84，2,828 forks 顯示生態高度集中於原作者。

## 更新紀錄

### 2026-05-06
- 連榜 Day 2（5-05、5-06），絕對榜由 **#10 → #3**（一夜跳 7 名）；首次擠入增長率榜（**#6**，growth_rate 2.16% → **2.79%**，+0.63pp）；stars_today 497 → **660（+32.8%）**、total stars 23,065 → 23,668（+603）。
- Release 端**無新版本**（最新仍為 [v2026.5.1](https://github.com/virattt/dexter/releases/tag/v2026.5.1)，2026-05-01 發布）。
- 在「金融科技」類別昨日同框的 [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) 退榜後，dexter 成為當日金融科技類別唯一代表，承接該賽道話題流量。
