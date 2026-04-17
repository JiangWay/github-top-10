---
repo: openai/openai-agents-python
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]
growth_appearances: [2026-04-18]
has_releases: true
latest_release: v0.14.1
---

# [openai/openai-agents-python](https://github.com/openai/openai-agents-python)

## 深度研究（2026-04-18 首次）

### 專案定位
[openai/openai-agents-python](https://github.com/openai/openai-agents-python) 是 OpenAI 於 2025 年 3 月開源的輕量級多代理工作流框架，為實驗性專案 [openai/swarm](https://github.com/openai/swarm) 的正式產品化後繼者，自我定位為「provider-agnostic」，可串接 OpenAI 與 100+ 其他 LLM。

### 核心架構 / 主要概念
- **Agents**：封裝 instructions、tools、guardrails、handoffs 的 LLM 單元
- **Handoffs**：代理間任務委派機制
- **Guardrails**：輸入 / 輸出可配置安全校驗
- **Sessions**：自動對話歷史管理（含 Redis / SQLite backend）
- **Tracing**：內建追蹤 UI，用於除錯與效能優化
- **Human-in-the-loop**：支援執行中人類介入
- **Sandbox Agents**（v0.14）：具備持久工作區、多 client backend 與 memory
- **MCP 整合**、**Voice Agents**（`gpt-realtime-1.5`）、Agents-as-tools

### 目標使用者
需要快速構建多代理系統、重視開發速度與 OpenAI 生態整合、但又想避免供應商綁定的 Python 開發者；適合原型設計與中型 production workflow。

### 與類似專案的差異
相較 [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) 的深度可客製複雜圖狀流程，[openai/openai-agents-python](https://github.com/openai/openai-agents-python) 主打極簡 API（幾行程式即可啟動）與內建 tracing；相較 [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)、[microsoft/autogen](https://github.com/microsoft/autogen)，其優勢在於 OpenAI 原生 Responses API 整合與官方維護背書，弱點是進階編排彈性較低。

### 外部評論
- 第三方評測（[mem0](https://mem0.ai/blog/openai-agents-sdk-review)、[Firecrawl](https://www.firecrawl.dev/blog/best-open-source-agent-frameworks)、[Lindy](https://www.lindy.ai/blog/best-ai-agent-frameworks)、AIMultiple）普遍讚賞：設定簡單、文件清晰、tracing 大幅縮短除錯時間、免費開源（僅付 API 費）。
- 常見批評是遇到複雜工作流時不如 [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) 靈活。
- HN / Reddit 原始討論串於本次搜尋未取得直接連結，資料不足。

### Release 狀態
迭代非常活躍：最新 **v0.14.1（2026-04-15）**；v0.14.0 同日推出 Sandbox Agents。3 月以來已發布 v0.12.5 → v0.14.1 逾 10 版，涵蓋 MCP、AnyLLM adapter、Realtime、session 優化。版本仍在 0.x，API 可能變動。

### 授權與社群
MIT 授權；約 21,690 stars、3,480 forks、僅 60 open issues（2026-04-17），issue 消化率高，社群熱度與維護品質兼具。

## 更新紀錄
