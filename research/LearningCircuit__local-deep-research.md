---
repo: LearningCircuit/local-deep-research
first_seen: 2026-05-07
last_updated: 2026-05-08
appearances: [2026-05-07, 2026-05-08]
growth_appearances: [2026-05-07, 2026-05-08]
has_releases: true
latest_release: v1.6.9
tags: [AI Agent 框架, 應用程式, 自架, 資料主權, 開源替代]
domain: AI Agent 框架
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# LearningCircuit/local-deep-research — 深度研究

## 深度研究（2026-05-07 首次）

### 專案定位
[LearningCircuit/local-deep-research](https://github.com/LearningCircuit/local-deep-research) 是一個本地優先的「深度研究助理」應用，把問題自動拆解成多輪檢索 → 抓取 → 綜合的迭代流程，可同時跨 10+ 個搜尋來源（arXiv、PubMed、SearXNG、Brave、Tavily、Wikipedia 等），並把結果寫成附引用的研究報告。主打 SimpleQA benchmark ~95% 準確率，且整套流程可全部跑在使用者自己的機器上。

### 核心架構 / 主要概念
- **多後端 LLM**：支援 Ollama / LM Studio / llama.cpp 本地推論，亦支援 OpenAI / Anthropic / Gemini / OpenRouter 雲端模型。
- **20+ 搜尋策略**：從 quick summary 到 LangGraph adaptive agent，依問題複雜度動態挑搜尋引擎。
- **本地 RAG**：抓回的網頁與 PDF 自動建索引，後續查詢可同時引用本地知識庫與即時 Web。
- **AES-256 SQLCipher**：個別使用者資料庫加密；零遙測、零分析、零追蹤。
- **整合面**：REST API、WebSocket 即時進度、PDF / Markdown 匯出、MCP server 可掛進 Claude Desktop。

### 目標使用者
研究員、記者、學者、需要可驗證引用的知識工作者；對 OpenAI Deep Research / Perplexity 不放心資料外流的隱私敏感族群；以及想把研究能力嵌入自家應用的開發者。

### 與類似專案的差異
相對 [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) 與 [langchain-ai/open_deep_research](https://github.com/langchain-ai/open_deep_research)：本專案更強調「全本地 + 加密」與多搜尋來源廣度（arXiv、PubMed、預印本、預警掠奪期刊評分），而非單純的 Web 研究流程。對比商用 OpenAI Deep Research / Perplexity Pro，差別是資料留在本機、可換 LLM、可整合私人文件。

### 外部評論
- [Hacker News 討論串](https://news.ycombinator.com/item?id=43330164)（190+ 分）：社群肯定 arXiv / PubMed 與本地化整合是其與 OpenAI Deep Research 的明顯差異點。
- README 自陳於 GPT-4.1-mini 設定下達 SimpleQA ~95%，同水準的成績通常需專屬 RL pipeline。

### Release 狀態
有 release，最新 [v1.6.9](https://github.com/LearningCircuit/local-deep-research/releases/tag/v1.6.9)（2026-05-02），近期 v1.6.8 與 v1.6.9 為連發小版本，迭代頻繁。

### 授權與社群
MIT 授權、5,558 stars / 508 forks / 247 open issues，topics 涵蓋 `local-llm`、`searxng`、`pubmed`、`retrieval-augmented-generation`、`self-hosted`，定位明確。維護者公開徵求 code reviewer，社群協作活躍。

## 更新紀錄

### 2026-05-08
- 連榜 Day 2（5-07～5-08），絕對榜由 #5 → **#5**（持平）、增長率榜由 #2 退至 **#5**（9.60% → 9.18%，-0.42pp 微降）；stars_today 532 → **564（+6.0%）**小幅加速；total stars 5,543 → **6,147（+604）**。
- Release 端無新增，仍為 [v1.6.9](https://github.com/LearningCircuit/local-deep-research/releases/tag/v1.6.9)（2026-05-02）。
- 與同日上榜的 [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)（vectorless RAG 框架）形成「自架知識/搜尋型 LLM 框架雙檔」並列；前者主打整合多搜尋引擎與本地端 LLM、後者主打文件樹索引，路徑不同但賽道相鄰，為當日 RAG/搜尋型工具熱度的兩個側面。
