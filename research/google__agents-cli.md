---
repo: google/agents-cli
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: true
latest_release: v0.6.1
tags: [AI Agent 框架, 應用程式]
domain: AI Agent 框架
form: 應用程式
themes: []
---

# [google/agents-cli](https://github.com/google/agents-cli)

> 研究日期：2026-06-30
> 研究來源：<https://github.com/google/agents-cli>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[google/agents-cli](https://github.com/google/agents-cli) 是 Google Cloud 官方釋出的 CLI 與 skill 套件，把 [Claude Code](https://github.com/anthropics/claude-code)、Codex、Antigravity CLI 等任意 coding assistant 變成「能用 ADK 寫 agent、跑 eval、推到 Vertex Agent Engine／Cloud Run／GKE，再註冊進 Gemini Enterprise」的專家。它自己不是 coding agent，而是 coding agent 拿來呼叫的工具層。

副標：是 Google 用「skill 包 + CLI」這個 pattern，把 Gemini Enterprise Agent Platform 的開發、評估、部署、發佈四個生命週期階段串成一條指令鏈的成果。

## 作者與起源

repo 的 owner 是 `google` 組織帳號，建立於 2026-04-08，與 2026-04-22 Google Cloud Next '26 上宣布的 [Gemini Enterprise Agent Platform](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform)（GEAP，前身為 Vertex AI Agent Builder）綁定發佈。可見的主要 release 簽署人是 `eliasecchig`（Elia Secchi），目前 contributors 只有 3 位——以 Google 規模的專案來說是非常早期的核心團隊。

起源脈絡：Google 在 Next '26 把 Vertex AI 系列服務整併進 GEAP，同步把原本散落在 [google/adk-python](https://github.com/google/adk-python)、`adk deploy`、Cloud Run／GKE 部署腳本與 Gemini Enterprise 註冊流程，全部收斂成一支 `agents-cli`。它的定位不是再造一個 framework，而是把 ADK 之上的 lifecycle ergonomics 對齊到「coding assistant 的工作流」。

repo 於 2026-04-29 發出第一個 release v0.1.2，至 2026-06-28 的 v0.6.1，兩個月內走過 11 個正式版本（v0.1.2 → v0.6.1），平均 5.7 天一版；2026-06-30 首次衝進 GitHub Trending 絕對榜 #9（單日 +433 stars、growth rate 11.00%）。

## 核心架構 / 主要概念

agents-cli 採「CLI + skill bundle」雙形態。同一套指令既能由開發者直接在 terminal 跑（`agents-cli scaffold`、`agents-cli eval`、`agents-cli deploy`），也能以 skill 形式（[skills 子目錄](https://github.com/google/agents-cli/tree/main/skills)）載入到 coding agent 裡，由 agent 在對話中代為呼叫。

七個 built-in skills：`adk-code`、`deploy`、`eval`、`observability`、`publish`、`scaffold`、`workflow`，對應 agent 開發生命週期的七個切面。

### 安裝與依賴

```bash
uvx google-agents-cli setup
# 或只裝 skills（給 coding agent 用）
npx skills add google/agents-cli
```

前置條件：Python 3.11+、`uv`、Node.js。本地開發若不想開 GCP 專案，可用 AI Studio API key 跑 Gemini + ADK。

### 四條主要命令鏈

| 階段 | 指令 | 動作 |
|---|---|---|
| 建立 | `agents-cli scaffold <name>` | 生成 ADK agent 專案骨架，附 `uv.lock`、Terraform、template 程式碼 |
| 評估 | `agents-cli eval generate / grade / compare / analyze` | dataset 產生 + LLM-as-judge 評分 + 兩版本比較 + 報表 |
| 部署 | `agents-cli deploy` | 三種目標：Vertex Agent Engine（Agent Runtime）、Cloud Run、GKE |
| 發佈 | `agents-cli publish gemini-enterprise` | 把已部署 agent 註冊進 Gemini Enterprise Agent Platform，端使用者就能在企業介面叫到 |

### 與 ADK／Vertex Agent Engine 的關係

- **ADK（Agent Development Kit）** 是 Google 開源的 agent framework（[google/adk-python](https://github.com/google/adk-python)），定義 Agent、Tool、Session 等抽象；agents-cli 直接 import ADK 並把 `google-adk` 鎖到專案的 `uv.lock`（v0.6.1 bump 到 2.3.0）。
- **Vertex AI Agent Engine（Agent Runtime）** 是 GEAP 內的 managed runtime，自動擴縮、托管 session storage；agents-cli `deploy` 的預設目標。
- **Gemini Enterprise** 是企業端的入口介面；`publish gemini-enterprise` 是把 runtime instance 註冊上去的最後一哩。

語言佔比：Python 77.2%、HCL 14.3%（Terraform 模組）、Go 2.3%、Java 2.2%。HCL 比例高反映「scaffold 出來的專案會帶 IaC」這個設計取向。

## 設計哲學

repo description 把哲學講得很白：

> "The CLI and skills that turn any coding assistant into an expert at creating, evaluating, and deploying AI agents on Google Cloud."

翻譯：這支 CLI 與 skill 套件，讓任何 coding assistant 變成「在 Google Cloud 上建、評、部署 AI agent」的專家。

從 v0.6.1 release note 可看出另一條設計線：把預設行為對齊到「在 Gemini Enterprise 裡 reliably 跑起來」，而不是讓使用者自選協定：

> "`publish gemini-enterprise` now registers Agent Runtime deployments via ADK by default, which Gemini Enterprise invokes natively and reliably. A2A registration remains the default for Cloud Run and GKE; requesting A2A on Agent Runtime now warns and recommends ADK."

翻譯：在 Agent Runtime 上發佈時改用 ADK 原生協定當預設，Gemini Enterprise 呼叫起來最穩；要走 A2A 的話 CLI 會主動警告。

兩條合起來：把「coding agent + Google Cloud agent」之間的 ergonomics 摩擦，用一個 opinionated 的 CLI 收掉；該幫使用者決定的就決定。

## 目標使用者與適用情境

**適合**：

- 已經（或打算）用 Gemini／ADK 開發 enterprise agent、且想把 agent 推到 Vertex Agent Engine／Cloud Run／GKE 三選一的團隊。
- 日常用 Claude Code、Codex、Antigravity CLI 寫程式，希望把「scaffold agent、跑 eval、deploy、註冊到 Gemini Enterprise」這四件事，由 coding agent 直接代勞而不用切上下文。
- 需要 IaC（Terraform）+ observability（Cloud Trace／Logging）一條龍交付的 GCP 客戶。

**不太適合**：

- 不打算用 Google Cloud、想跑 self-hosted 或多雲 agent 的團隊——agents-cli 對 Vertex Agent Engine／Gemini Enterprise 的耦合很深，去掉這層就只剩 ADK 本身。
- 想要 visual／low-code agent builder 的非工程使用者——應該看 [GEAP Agent Studio](https://cloud.google.com/products/gemini-enterprise-agent-platform) 而不是這支 CLI。
- 只想用 OpenAI／Anthropic 模型不碰 Gemini 的場景——agents-cli 預設模型路徑與 Gemini 綁定。

## 與類似專案的差異

| 對手 | 對手主打 | agents-cli 的差異 |
|---|---|---|
| [google/adk-python](https://github.com/google/adk-python) | Google 自家的 agent framework，提供 Agent／Tool／Session 抽象與 `adk deploy` | agents-cli 包在 ADK 之上：多了 scaffold、eval pipeline、`publish gemini-enterprise`、Cloud Run／GKE 部署目標，以及 coding agent skill bundle |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | open-source agent orchestration framework，模型／runtime 中立 | agents-cli 不是 framework 而是 lifecycle CLI；前者解「怎麼寫 agent 邏輯」、後者解「寫完怎麼推到 GCP」 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | autonomous agent 範本／平台，偏 end-user agent 玩法 | agents-cli 給開發團隊用、對齊企業治理（IAM、Cloud Trace、Gemini Enterprise 註冊），不是給終端使用者玩自主 agent |
| [AWS Bedrock AgentCore CLI](https://aws.amazon.com/bedrock/agentcore/) | AWS 對標的 enterprise agent runtime + CLI | 同類定位、不同雲；agents-cli 綁 GCP／Gemini，AgentCore 綁 AWS／Bedrock 上的模型 |
| [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-python) | Anthropic 給開發者的 agent SDK，模型走 Claude | Claude Agent SDK 是 library；agents-cli 是 lifecycle CLI。兩者可疊用：用 Claude Code 當 coding agent，呼叫 agents-cli 把 ADK agent 推到 GCP |

選型建議：

- 要把 agent 推到 GCP → 直接 agents-cli。
- 要可攜 / 多雲 / 自己掌控 runtime → LangGraph 寫核心，自己包 deploy。
- 對手雲是 AWS → AgentCore；對手雲是 Azure → 看 Azure AI Foundry agent 線。

## 外部評論

- [Google Developers Blog — Agents CLI in Agent Platform: create to production in one CLI](https://developers.googleblog.com/agents-cli-in-agent-platform-create-to-production-in-one-cli/)：官方 launch 文，把它定位為「create to production in one CLI」。屬第一方來源。
- [MindStudio — What Is the Google Agent CLI? The Open-Source Tool for Shipping AI Agents to Production](https://www.mindstudio.ai/blog/what-is-google-agent-cli-open-source-ai-agents)：第三方介紹文，重點放在「open source + production shipping」這個角度，未見對缺點的批判。
- [Google Codelabs — Vibe Coding AI Agents: Managing the Agent Lifecycle with Agents CLI and ADK 2.0](https://codelabs.developers.google.com/agents-cli-adk-lifecycle)：官方 hands-on 教材，主軸是「vibe coding + lifecycle」。
- HN / Reddit：截至 2026-06-30，未見針對 `google/agents-cli` 的顯著討論串。鄰近專案 [Google Workspace CLI 在 Hacker News 上有混合回饋](https://www.infoq.com/news/2026/06/google-workspace-cli/)（45 分鐘 OAuth scope 卡關 vs r/ 上接 Claude Code 順手）；同時期 Google Antigravity 也有負評（r/Bard rate-limit 不滿）。這兩條都不是針對本 repo，僅作背景參考。**針對 agents-cli 本身的 HN / Reddit 討論，資料不足。**

## Release 狀態 / 時間軸

兩個月內 11 個正式版本：

| 日期 | 版本 | 重點 |
|---|---|---|
| 2026-04-08 | repo 建立 | 與 Google Cloud Next '26（4-22）GEAP 發布同期 |
| 2026-04-29 | v0.1.2 | 公開的第一個 release |
| 2026-05-06 | v0.1.3 | |
| 2026-05-19 | v0.2.0 | |
| 2026-05-28 | v0.2.1 | |
| 2026-06-01 | v0.3.0 | |
| 2026-06-08 | v0.3.1 | |
| 2026-06-10 | v0.4.0 | |
| 2026-06-15 | v0.5.0 | |
| 2026-06-22 | v0.5.1 | |
| 2026-06-26 | v0.6.0 | |
| 2026-06-28 | v0.6.1 | `publish gemini-enterprise` 預設改走 ADK；`update` 命令修錯誤的成功 banner；`google-adk` bump 2.2.0 → 2.3.0 |
| 2026-06-30 | — | 首次衝進 GitHub Trending 絕對榜 #9（+433 stars、growth 11.00%） |

仍在 v0.x、語意上是 pre-1.0；release note 透露的訊號是「行為預設值還在收斂」（A2A vs ADK 之爭、`update` exit code 修正），而非穩定 API。

## 授權與社群

- License：Apache-2.0
- 主要語言：Python 77.2%、HCL 14.3%、Go 2.3%、Java 2.2%
- 規模（2026-06-30 取數）：3,944 stars、440 forks、20 open issues、24 subscribers
- contributors：3 位
- topics：`adk`、`agent-development-kit`、`agents`、`coding-agent`、`gemini`、`gemini-enterprise-agent-platform`、`generative-ai`、`google-cloud`
- 官方文件站：<https://google.github.io/agents-cli/>
- stars 增長速率：repo 4-08 建立、至 6-30 為 83 天累積 3,944 stars，平均約 47.5 stars/天；單日 +433 是平均值的約 9 倍。3 位 contributors 對應 3,944 stars 也是相當不對稱的 stars-per-contributor 比，反映「Google 官方背書 + GEAP 發佈聯動」的早期紅利。

## 資料來源

**本體**

- repo：<https://github.com/google/agents-cli>
- README：<https://github.com/google/agents-cli/blob/main/README.md>
- 官方文件站：<https://google.github.io/agents-cli/>
- Getting Started：<https://google.github.io/agents-cli/guide/getting-started/>
- Quickstart Tutorial：<https://google.github.io/agents-cli/guide/quickstart-tutorial/>
- Skills Reference：<https://google.github.io/agents-cli/reference/skills/>
- skills 目錄：<https://github.com/google/agents-cli/tree/main/skills>
- v0.6.1 release：<https://github.com/google/agents-cli/releases/tag/v0.6.1>

**第一方關聯材料**

- [Google Cloud Blog — Introducing Gemini Enterprise Agent Platform](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform)
- [Google Developers Blog — Agents CLI in Agent Platform: create to production in one CLI](https://developers.googleblog.com/agents-cli-in-agent-platform-create-to-production-in-one-cli/)
- [Google Codelabs — Vibe Coding AI Agents: Managing the Agent Lifecycle with Agents CLI and ADK 2.0](https://codelabs.developers.google.com/agents-cli-adk-lifecycle)
- [GEAP 產品頁](https://cloud.google.com/products/gemini-enterprise-agent-platform)
- [Vertex AI Agent Engine quickstart](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/quickstart)
- [ADK on GKE tutorial](https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/agentic-adk-vertex)

**第三方介紹**

- [MindStudio — What Is the Google Agent CLI?](https://www.mindstudio.ai/blog/what-is-google-agent-cli-open-source-ai-agents)
- [UI Bakery — Vertex AI Agent Builder: 2026 guide](https://uibakery.io/blog/vertex-ai-agent-builder)
- [Revolgy — Definitive guide to GEAP](https://www.revolgy.com/insights/blog/definitive-guide-to-gemini-enterprise-agent-platform-geap)
- [InfoQ — Google Workspace CLI](https://www.infoq.com/news/2026/06/google-workspace-cli/)（鄰近專案、背景參考）

**同類工具**

- [google/adk-python](https://github.com/google/adk-python)
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)
- [Anthropic Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-python)
- [AWS Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/)

## 更新紀錄
