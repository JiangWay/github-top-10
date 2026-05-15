---
repo: NVIDIA-AI-Blueprints/video-search-and-summarization
first_seen: 2026-05-16
last_updated: 2026-05-16
appearances: [2026-05-16]
growth_appearances: [2026-05-16]
has_releases: true
latest_release: v3.1.0
tags: [語音與多媒體, 框架, 多代理編排, 企業級]
domain: 語音與多媒體
form: 框架
themes: [多代理編排, 企業級]
---

# [NVIDIA-AI-Blueprints/video-search-and-summarization](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization)

> 研究日期：2026-05-16
> 研究來源：<https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-05-16 首次）

### 專案定位

[NVIDIA-AI-Blueprints/video-search-and-summarization](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization)（簡稱 VSS Blueprint）是 NVIDIA 官方釋出的「GPU 加速視覺代理參考架構套件」——把 VLM、LLM、Context-Aware RAG（CA-RAG）、向量／圖資料庫、Riva ASR、Grounding DINO、SAM2 等微服務拼成一條可量產的影像理解管線，讓企業能用自然語言對「儲存的長影片」或「即時直播串流」做摘要、Q&A、語意搜尋與事件警示，官方宣稱影片摘要可達「真人觀看時間的 100×」加速（一小時的影片一分鐘內出文字摘要）。

它不是一個拿來就跑的 SaaS，而是 NVIDIA AI Blueprints / Metropolis 體系下的 reference architecture：附 Docker Compose、Helm chart、NIM 模型設定、Brev launchable，目標是讓內部已有 H100／L40S／GB200／DGX-Spark 硬體的企業團隊在數天內把 demo 立起來，再自行替換 VLM、客製 skill。

### 核心架構 / 主要概念

VSS 3.1.0 的架構分三層（[官方架構文件](https://docs.nvidia.com/vss/latest/content/architecture.html)）：

1. **Ingestion Pipeline（攝取層）**：把離線影片切成數秒到數分鐘的 chunk，或接 RTSP 直播串流。每個 chunk 經 VLM 產生 caption、Riva ASR 產生字幕，Grounding DINO 做零樣本物件偵測、NvDCF tracker 做多物件追蹤、SAM2 做實例分割。
2. **Retrieval Pipeline（檢索層）**：核心是 **Context-Aware RAG（CA-RAG）**。VLM caption、ASR 字幕、CV metadata 經 NeMo Retriever Embedding NIM 轉成 embedding，同步寫進 **Milvus（向量庫）** 與 **ArangoDB（圖資料庫，2.4 起導入的 GraphRAG）**，支援混合檢索：向量相似 + 全文 + 圖節點遍歷。
3. **Agent Layer（代理層）**：頂層代理透過 **Model Context Protocol（MCP）** 把下游工具（影片理解、語意搜尋、片段擷取、長片摘要）暴露給 LLM，並用 NeMo Guardrails 把護欄套上去。3.1.0 起多出 `skills/` 目錄，採 **AgentSkills.io** 相容格式，把能力做成可組合模組。

關鍵模型組合（隨版本演進）：

- **VLM**：早期版本用 NVILA / GPT-4o；2.4.1 起官方支援 [nvidia/Cosmos-Reason2-8B](https://huggingface.co/nvidia/Cosmos-Reason2-8B)（NVIDIA 自家「物理 AI 推理 VLM」，基於 Qwen3-VL-8B-Instruct，256K context、long chain-of-thought）、Qwen3-VL 系列。3.1.0 主推 Cosmos-Reason2-8B + NVIDIA Nemotron-Nano-9B-v2。
- **LLM**：Llama 3.1 8B Instruct（單 GPU 部署最佳）／Nemotron-Nano-9B-v2。
- **ASR**：NVIDIA Riva。
- **Embedding**：Cosmos-Embed1（即時模式）／NeMo Retriever（離線模式）。

repo 程式碼分布（GitHub Linguist）：Python 57.2%、TypeScript 35.5%、Shell 3.3%、Jupyter Notebook 1.6%。三大目錄：`agent/`（Python 代理本體）、`deployments/`（Docker Compose + NIM 設定）、`skills/`（AgentSkills 模組）、`ui/`（Next.js 前端 monorepo）。

### 目標使用者

VSS 不是給個人開發者本機 demo 的——硬體門檻就把目標受眾限縮到企業：

- **單 GPU 最低門檻**：A100／H100／H200（80GB+ HBM）。
- **多 GPU 推薦組態**：8×H100、8×H200、4×H100、8×A100（80GB）、8×L40S；2.4.1 起新增 GH200／GB200 支援，3.1.0 再加 DGX-SPARK／IGX-THOR／AGX-THOR。
- **雲端途徑**：NVIDIA Brev launchable（AWS 2×RTX PRO 6000 SE）、NVIDIA Build（[build.nvidia.com/nvidia/video-search-and-summarization](https://build.nvidia.com/nvidia/video-search-and-summarization)）試用 API、NVIDIA AI Enterprise license。

實際採用方來自製造業、零售、智慧城市、運動轉播、機場營運、廣告等垂直（資料來自 [NVIDIA 官方部落格 2025-05-18 啟用文](https://blogs.nvidia.com/blog/ai-blueprint-video-search-and-summarization/) 與後續更新）：

- **Pegatron**（電子製造）：用 VSS 研究操作流程與培訓員工，整合到 PEGAAi 平台，自述「人力成本降 7%、不良率降 67%」。
- **Linker Vision**（高雄智慧城市）：事件應變時間最多縮短 80%。
- **NHL**：搭配 VAST InsightEngine 對 PB 級賽事影片做次秒級搜尋。
- **Siemens** Industrial Copilot：生產力提升 30%，目標 50%。
- **Superb AI**：在仁川機場數週內完成營運監控專案。
- **Lumana**（CCTV / 安防 SaaS）：3.1 版宣告整合，主打可擴展到 5 萬路並行串流。
- **Salesforce**：與 Cobalt 機器人＋Agentforce 結合做工作場域安規分析。
- **Uber**：探索 Cosmos Reason 2 為 AV 訓練資料產生可搜尋字幕。
- 其他：Fingermark（速食店得來速）、PYLER（Samsung 廣告投放）。

不適用情境：個人筆電想跑 LLaMA 等級的小 demo；沒有 NGC／AI Enterprise 帳號；想完全免授權自架。雖然 repo 公開，但運行時的 NIM 微服務拉取與 Cosmos-Reason 商業使用都受 NVIDIA Open Model License 與 AI Enterprise 條款約束（repo 自己掛 `LICENSE` + `LICENSE-3rd-party.txt`，授權標示為「Other」）。

### 與類似專案的差異

VSS 真正的對手不是 GitHub 上的開源 VLM 應用，而是「Video Intelligence 平台」這個垂直賽道。一線競品：

| 對手 | 本專案的差異 | 什麼時候選誰 |
|---|---|---|
| [twelvelabs-io](https://github.com/twelvelabs-io)（Twelve Labs Marengo / Pegasus，影片基礎模型 + Search API） | VSS 是「自己跑模型」的 reference architecture，可換 VLM、可上自家硬體、可上 GraphRAG；Twelve Labs 是封閉 SaaS API，模型自家訓但無法替換、無法自架。 | 想接 API 走管理服務 → Twelve Labs；想自己掌控資料與硬體、要客製 skill → VSS。 |
| [Reka](https://reka.ai/news/using-nvidia-ai-blueprint-for-video-search-and-summarization-with-reka-vision-agent)（Reka Vision Agent） | Reka 自有 VLM（Reka Flash / Core），可作為 VSS 的 VLM 替換，與 NVIDIA 是互補關係而非競爭。Reka 本身強的是模型，VSS 強的是 pipeline 編排。 | 已採購 Reka 模型 → 接 VSS 當 orchestrator；對 NVIDIA 自家 Cosmos-Reason 信心更高 → 純 NVIDIA stack。 |
| [Google Cloud Video Intelligence API](https://cloud.google.com/video-intelligence) | Google API 是黑盒、按用量計價，無法替換模型、無法 self-host；VSS 是完全 self-hosted reference。 | 不想管基礎建設、影片量小 → Google；資料主權／延遲敏感／大量 H100 已採購 → VSS。 |

VSS 的真正定位不是「最強的 VLM」，而是 **NVIDIA 把 VLM/LLM/CV/RAG/ASR 微服務鏈成一個可量產的 blueprint**，並背書全套硬體相容性。它是 reference architecture 而非 product——這跟單純的開源 video understanding repo 是不同物種。

### 外部評論

- NVIDIA 自家 [Developer Blog（2025-08）](https://developer.nvidia.com/blog/advance-video-analytics-ai-agents-using-the-nvidia-ai-blueprint-for-video-search-and-summarization/) 詳述 CA-RAG／GraphRAG 與 100× 加速基準。
- [ArangoDB 官方部落格](https://arango.ai/blog/generate-a-video-knowledge-graph-nvidia-vss-blueprint-with-graphrag-on-arangodb/) 宣告為 VSS 2.4 的圖資料庫合作方，並強調「video-first knowledge graph」是 2.4 主打。
- [Lumana 部落格 2026-03-16](https://www.lumana.ai/blog/lumana-integrates-nvidia-metropolis-blueprint-for-video-search-and-summarization)：CEO Sagi Ben Moshe 表態「Object detection creates noise. Activity and behavior detection closes the gap — but what operators truly need is more context and understanding」。Lumana 強調 VSS 補上「偵測 → 理解」的最後一哩。
- [Reka 部落格](https://reka.ai/news/using-nvidia-ai-blueprint-for-video-search-and-summarization-with-reka-vision-agent) 把自家 Vision Agent 接到 VSS 上，作為 VLM 替換實證。
- [NVIDIA Developer Forums Visual AI Agent 區](https://forums.developer.nvidia.com/c/accelerated-computing/intelligent-video-analytics/visual-ai-agent/680) 是目前最活躍的社群討論場，最近的串包括 [v3.1.0 Early Access 公告（2026-03）](https://forums.developer.nvidia.com/t/nvidia-ai-blueprint-for-video-search-and-summarization-vss-v3-1-0-early-access-is-publicly-available/364679)、[最大並行 live stream 數](https://forums.developer.nvidia.com/t/what-is-the-maximum-number-of-live-streams-the-vss-blueprint-can-handle/327382)、[VSS 2.4 + Cosmos API 做即時運動賽事偵測的實作觀察](https://forums.developer.nvidia.com/t/challenges-and-observations-using-vss-2-4-blueprint-and-cosmos-api-for-real-time-sports-event-detection/348210)，社群提問集中在「scalability 上限沒寫」「20 分鐘 MP4 怎麼 demo」「percentage complete 卡 0.00」這類落地 debug 問題——意味著開發者真的在用，但官方文件對量化基準仍偏行銷敘述。
- 未見顯著 Hacker News / Reddit 主串討論——這類企業級 reference architecture 在 dev 社群討論度遠低於消費級開源工具，主要評論場留在 NVIDIA Developer Forums 與合作夥伴官方部落格。資料不足以代表廣泛社群評價。

### Release 狀態

`gh api .../releases` 共 6 個正式 release，時間軸如下：

- 2024-10-22：repo 建立。
- 2025-03-15：**v1.0**（Pre-release，作者 LinshiTemp）——repo 首個對外版本，先以早期存取形式公開。
- 2025-04-21：**v2.3.0** GA。
- 2025-07-03：**v2.3.1**。
- 2025-09-23：**v2.4.0**——導入 GraphRAG on ArangoDB、多串流攝取、video-first Knowledge Graph。
- 2026-01-28：**v2.4.1** GA——新增 Cosmos-Reason 2 VLM、Qwen3-VL、GH200／GB200 平台支援。
- 2026-03-18：**v3.1.0**（最新）——AgentSkills 框架、Cosmos-Reason2-8B + Nemotron-Nano-9B-v2 主推、MCP 為頂層代理協定、DGX-SPARK／IGX-THOR／AGX-THOR 平台支援。

中間直接從 2.4.1 跳到 3.1.0，沒有 3.0.0 GA tag（推測 3.0.x 走的是 Early Access 軌道，未發 GitHub release），這也吻合論壇上的 [3.0 demo 提問串](https://forums.developer.nvidia.com/t/nvidia-blueprint-for-video-search-and-summarization-vss/367181)。

### 授權與社群

量化鐵錨（2026-05-16 抓取）：

- **Stars**：1,091（首次進 GitHub Trending Top 10——repo 建了一年半多，在「企業級 reference architecture」分類下能進 Trending 並不常見，多半要靠新 release + 媒體推一波）。
- **Forks**：259（forks/stars ≈ 23.7%，遠高於消費級 repo 通常 5-10% 的水準——典型企業級 reference architecture 特徵：使用者 fork 後改造自家版本）。
- **Open issues**：56。
- **Subscribers**：16（watcher 數低，反映決策權多在 NVIDIA 內部、外部多是 fork-and-go）。
- **License**：「Other」（repo 自附 LICENSE + LICENSE-3rd-party.txt，模型部分受 NVIDIA Open Model License、NIM 服務需 AI Enterprise）。
- **語言**：Python 57.2%、TypeScript 35.5%、Shell 3.3%、Jupyter Notebook 1.6%。
- **Topics**：`agents`、`llm`、`rag`、`skills`、`video-analytics`、`video-search`、`vlm`。
- **官方主頁**：<https://build.nvidia.com/nvidia/video-search-and-summarization>。
- **文件站**：<https://docs.nvidia.com/vss/latest/>（含 architecture、context_aware_rag、customization 等專章）。
- **GitHub Discussions** 已開啟。

主要貢獻者皆為 NVIDIA 員工 handle（kaushikc-nvidia、nv-unnikrishnankgs、shaunakg-nv、jitendra-nv 等），repo 由 NVIDIA-AI-Blueprints 組織擁有（同組織還有 enterprise-rag、digital-human 等姊妹 blueprint），社群貢獻佔比極低——這是 NVIDIA 主導、外界 fork 客製的單向流動模式，而非開源協作社群。

## 資料來源

**本體**

- [NVIDIA-AI-Blueprints/video-search-and-summarization](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization)
- [VSS 官方文件（latest）](https://docs.nvidia.com/vss/latest/)
- [VSS Blueprint 架構文件](https://docs.nvidia.com/vss/latest/content/architecture.html)
- [Context-Aware RAG 文件](https://docs.nvidia.com/vss/latest/content/context_aware_rag.html)
- [build.nvidia.com VSS 卡片](https://build.nvidia.com/nvidia/video-search-and-summarization/blueprintcard)
- [GitHub Releases](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/releases)
- [nvidia/Cosmos-Reason2-8B（Hugging Face）](https://huggingface.co/nvidia/Cosmos-Reason2-8B)

**第三方評論**

- [NVIDIA Blog 啟用文（2025-05-18）](https://blogs.nvidia.com/blog/ai-blueprint-video-search-and-summarization/)
- [NVIDIA Developer Blog：Advance Video Analytics AI Agents](https://developer.nvidia.com/blog/advance-video-analytics-ai-agents-using-the-nvidia-ai-blueprint-for-video-search-and-summarization/)
- [NVIDIA Developer Blog：Transform Video Into Searchable Intelligence](https://developer.nvidia.com/blog/transform-video-into-instantly-searchable-actionable-intelligence-with-ai-agents-and-skills/)
- [ArangoDB：Video Knowledge Graph + GraphRAG](https://arango.ai/blog/generate-a-video-knowledge-graph-nvidia-vss-blueprint-with-graphrag-on-arangodb/)
- [Lumana 整合公告（2026-03-16）](https://www.lumana.ai/blog/lumana-integrates-nvidia-metropolis-blueprint-for-video-search-and-summarization)
- [Reka Vision Agent + VSS 整合](https://reka.ai/news/using-nvidia-ai-blueprint-for-video-search-and-summarization-with-reka-vision-agent)
- [NVIDIA Developer Forum：v3.1.0 EA 公告](https://forums.developer.nvidia.com/t/nvidia-ai-blueprint-for-video-search-and-summarization-vss-v3-1-0-early-access-is-publicly-available/364679)
- [NVIDIA Developer Forum：v2.4.1 GA 公告](https://forums.developer.nvidia.com/t/nvidia-ai-blueprint-for-video-search-and-summarization-vss-is-now-general-available-with-v2-4-1/360235)
- [NVIDIA Developer Forum：VSS 2.4 + Cosmos 即時運動實作觀察](https://forums.developer.nvidia.com/t/challenges-and-observations-using-vss-2-4-blueprint-and-cosmos-api-for-real-time-sports-event-detection/348210)
- [Hugging Face Blog：Cosmos Reason 2 介紹](https://huggingface.co/blog/nvidia/nvidia-cosmos-reason-2-brings-advanced-reasoning)

**同類工具**

- [twelvelabs-io（Twelve Labs）](https://github.com/twelvelabs-io)
- [Reka AI](https://reka.ai/)
- [Google Cloud Video Intelligence API](https://cloud.google.com/video-intelligence)
- [james-le-twelve-labs/nvidia-vss（社群 fork 範例）](https://github.com/james-le-twelve-labs/nvidia-vss)

## 更新紀錄
