---
repo: langfuse/langfuse
first_seen: 2026-04-23
last_updated: 2026-04-23
appearances: [2026-04-23]
growth_appearances: []
has_releases: true
latest_release: v3.169.0
tags: [LLM 基礎建設, 應用程式, 自架, 企業級]
domain: LLM 基礎建設
form: 應用程式
themes: [自架, 企業級]
---

# [langfuse/langfuse](https://github.com/langfuse/langfuse)

> 研究日期：2026-04-23
> 研究來源：<https://github.com/langfuse/langfuse>
> 觸發原因：首次上絕對榜（#4，stars_today +160）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位
Langfuse 是開源 LLM 工程平台，把 tracing、prompt 版本管理、evaluation 與資料集整合在同一個可自架的 TypeScript/Next.js 應用中，定位為 LangSmith 的開源替代品。

## 作者與起源
由德國柏林的 Langfuse GmbH 團隊於 2023 年 5 月開源，並入選 Y Combinator W23 批次。共同創辦人 Marc Klingen、Max Deichmann 至今仍是 commit 量最高的維護者（各逾 1,400 次 commits），配合 Steffen911、Marlies、Hassieb 等核心工程師構成穩定的七人規模小團隊。

## 核心架構 / 主要概念
Repo 以 pnpm monorepo 拆成 `web`（Next.js 前端與 API）與 `worker`（背景事件處理）兩個服務，搭配 Postgres（中繼資料）、ClickHouse（trace 事件儲存）、Redis（queue）與 S3 相容物件儲存。Instrumentation 支援 Python/JS SDK、OpenTelemetry、LangChain、LlamaIndex、LiteLLM、OpenAI SDK、Vercel AI SDK、DSPy、Instructor 等多種入口。六大功能：Tracing、Prompt Management、Evaluations（含 LLM-as-judge、人工標註、自動 pipeline）、Datasets、Playground、Metrics Dashboards。

## 設計哲學
README 與官網強調三個關鍵詞：**open、self-hostable、framework-agnostic**。Cloud 與自架版共用**同一份程式碼**，沒有功能分叉；企業功能集中在 `ee/` 目錄單獨授權，其餘 MIT。他們刻意不綁 LangChain 生態，以 OpenTelemetry 作為通用入口，把自己定位成「unopinionated building blocks」而非完整 agent 框架。

## 目標使用者與適用情境
- 正把 LLM 應用推上 production、需要看得見 token/成本/延遲的工程團隊
- 受監管產業（金融、醫療、政府）要求資料不離 VPC，無法採用 LangSmith SaaS 的企業
- LangChain、LlamaIndex、DSPy 等框架的使用者
- 想用統一介面管理 prompt A/B、跑 regression eval 的 prompt engineer

## 與類似專案的差異
| 專案 | 開源 | 自架成熟度 | 定位差異 |
|---|---|---|---|
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT（ee/ 另計） | 高（Docker / K8s Helm / Terraform） | 功能最全、框架無關、OSS 生態領先 |
| [langchain-ai/langsmith-sdk](https://github.com/langchain-ai/langsmith-sdk) | 閉源 SaaS | 僅企業版可自架 | 與 LangChain 整合最深，但非開源 |
| [Helicone/helicone](https://github.com/Helicone/helicone) | Apache-2.0 | 高（proxy 模式） | 改 base URL 即可，零 SDK 接入 |
| [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) | Elastic | 中 | 以 OTel + ML notebook 評估為核心 |
| [openlit/openlit](https://github.com/openlit/openlit) | Apache-2.0 | 中 | OTel-native，輕量但功能少 |
| [lunary-ai/lunary](https://github.com/lunary-ai/lunary) | Apache-2.0 | 中 | 功能類似但社群規模較小 |

主要差異：Langfuse 同時具備完整 prompt management、dataset、eval pipeline，而不是單純 tracing；相較 Helicone 的 proxy 路徑，Langfuse 走 SDK/OTel 埋點，延遲更低、資料模型更精細。

## 外部評論
- [Hacker News 首發討論（Show HN，2023）](https://news.ycombinator.com/item?id=37310070)：社群肯定其「open API、self-hostable、model-agnostic」定位。
- [Hacker News 2024 討論串](https://news.ycombinator.com/item?id=42442595)：評論稱其為「more interesting LLM observability platforms」之一。
- [ZenML Langfuse vs LangSmith 比較](https://www.zenml.io/blog/langfuse-vs-langsmith)：指出 Langfuse 是目前社群最活躍、最受歡迎的開源 LLMOps 工具。
- [Firecrawl《Best LLM Observability Tools in 2026》](https://www.firecrawl.dev/blog/best-llm-observability-tools)：將 Langfuse 列為開源替代方案首選。
- [Softcery 八大平台比較](https://softcery.com/lab/top-8-observability-platforms-for-ai-agents-in-2025)：指出 Langfuse 在 multi-turn 對話與複雜 workflow 的 tracing 細緻度勝出。
- 中文社群：[許恆修《LangGraph 與 LangFuse》Medium](https://r23456999.medium.com/langgraph-%E8%88%87-langfuse-%E6%89%93%E9%80%A0%E6%99%BA%E8%83%BD%E8%A7%80%E6%B8%AC%E7%B3%BB%E7%B5%B1%E7%9A%84%E5%AE%8C%E7%BE%8E%E7%B5%84%E5%90%88-da09e515cf1d) 與 [JSLab《OpenWebUI 整合 Langfuse》](https://jslab.cloud/openwebui%E6%95%B4%E5%90%88-langfuse%EF%BC%9A%E6%8F%90%E5%8D%87-llm-%E6%87%89%E7%94%A8%E7%9A%84%E5%8F%AF%E8%A7%80%E6%B8%AC%E6%80%A7/) 都示範了中文生態的實戰整合。

## Release 狀態 / 時間軸
- 最新穩定版：**v3.169.0**（2026-04-17）— 新增 `QueueMetricsRunner`、修正 Ragas faithfulness 評估器。
- 最新 pre-release：v3.170.0-0（2026-04-22，observability 測試版）
- 週節奏發版：4 月光是前三週就釋出 v3.165 → v3.169，每 1–3 天一版，顯示主幹極活躍。
- 詳見：<https://github.com/langfuse/langfuse/releases>

## 授權與社群
- 主體採 **MIT**（Copyright Langfuse GmbH 2023–2025），`ee/`、`web/src/ee/`、`worker/src/ee/` 子目錄採獨立商業授權。
- GitHub 指標：25,518 stars、2,590 forks、88 watchers、588 open issues（資料抓取時間 2026-04-23）。
- 語言分布：TypeScript 98.8%。
- 主要貢獻者：[marcklingen](https://github.com/marcklingen)（1,621）、[maxdeichmann](https://github.com/maxdeichmann)（1,461）、[Steffen911](https://github.com/Steffen911)（854）、[marliessophie](https://github.com/marliessophie)（751）、[hassiebp](https://github.com/hassiebp)（524）。

## 資料來源
1. `gh api repos/langfuse/langfuse`（2026-04-23）
2. `gh api repos/langfuse/langfuse/releases`
3. `gh api repos/langfuse/langfuse/contributors`
4. [Langfuse GitHub repo README](https://github.com/langfuse/langfuse)
5. [Langfuse 官網 self-hosting 文件](https://langfuse.com/self-hosting)
6. Hacker News、ZenML、Firecrawl、Softcery、Medium、JSLab 等外部評論（見「外部評論」節連結）

## 更新紀錄

<!-- append future re-appearances here -->
