---
repo: supermemoryai/supermemory
first_seen: 2026-05-31
last_updated: 2026-06-01
appearances: [2026-05-31, 2026-06-01]
growth_appearances: [2026-05-31, 2026-06-01]
has_releases: true
latest_release: server-v0.0.1-rc.4
tags: [AI Agent 框架, 框架, 開源替代, 企業級]
domain: AI Agent 框架
form: 框架
themes: [開源替代, 企業級]
---

# [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory)

## 深度研究（2026-05-31 首次）

### 專案定位

[supermemoryai/supermemory](https://github.com/supermemoryai/supermemory)（23,102 stars / 2,088 forks / MIT / TypeScript / 2024-02-27 建立 / homepage <https://supermemory.ai/docs>）自我定位為「The Memory API for the AI era」——一個給 AI app 用的**長期記憶引擎與 API**，賣點是「Your AI forgets everything between conversations. Supermemory fixes that.」。今日以 **+236 stars / growth_rate 1.02% 首登絕對榜 #10**，是本月「AI agent 記憶層」賽道的代表性登榜。

值得注意的是：**GitHub 這份 repo 是 MIT 開源**（含 app、plugins、framework wrapper、SDK），但**生產級記憶引擎是商業 hosted 服務**（`app.supermemory.ai` 消費者版 + `console.supermemory.ai` 企業 dashboard），完整 self-hosting 僅開放給 enterprise 方案客戶（詳見「授權與社群」）。換言之這是「開源外殼 + 商業核心」的混合模式，與純自架開源競品（如 [mem0ai/mem0](https://github.com/mem0ai/mem0)）定位不同。

**作者 / 公司背景**：創辦人 [Dhravya Shah](https://github.com/Dhravya)（802 commits，絕對主力）為印度孟買出身、就讀 Arizona State University 的年輕創業者。supermemory 前身為「Any Context」（最初是「跟你的 Twitter bookmarks 對話」的週末專案）。2025-10 公司完成約 **$2.6M seed 輪**（部分報導稱 $3M），投資人含 Susa Ventures、Browder Capital、SF1.vc，以及 Cloudflare、Google AI 首席 Jeff Dean、DeepMind PM Logan Kilpatrick、Sentry 創辦人 David Cramer 等個人天使（來源見外部評論）。團隊自述為「a research lab building the engine, plugins and tools around it」。

### 核心架構 / 主要概念

1. **Memory Engine（記憶引擎）**：從對話中抽取事實（extract facts）、追蹤更新（track updates）、解決矛盾（resolve contradictions）、自動遺忘過期資訊（auto-forget expired info）——強調這是「stateful memory」而非無狀態的 document RAG。
2. **User Profiles（使用者畫像）**：自動維護的 user context（穩定事實 + 近期活動），單次呼叫約 ~50ms（profile tool 回傳 user summary）。
3. **Hybrid Search（混合檢索）**：在單一查詢中同時做 RAG + Memory——knowledge base 文件 chunk 與個人化記憶一併回傳；官方稱可達 sub-300ms recall。底層為 vector search（pgvector）+ LLM-based fact extraction。
4. **Connectors（連接器）**：Google Drive / Gmail / Notion / OneDrive / GitHub 自動同步，含 real-time webhook。
5. **Multi-modal Extractors**：PDF、圖片（OCR）、影片（轉錄）、程式碼（AST-aware chunking）皆可直接上傳處理。
6. **多 LLM / framework 支援**：透過 framework wrapper 抽象層支援多家 provider（README 提及 OpenAI GPT-4o、Anthropic Claude）；framework 整合涵蓋 Vercel AI SDK / LangChain / LangGraph / OpenAI Agents SDK / Mastra / Agno / Claude Memory Tool / n8n。
7. **SDK 與 API 設計**：TypeScript（npm）+ Python（pip）雙 SDK；主要方法 `client.add()` / `client.profile()` / `client.search.memories()` / `client.documents.uploadFile()` / `client.settings.update()`；給 agent 用的 tool 為 `memory` / `recall` / `context`。底層基礎建設為 Cloudflare Workers（auto-scaling、全球分散）+ PostgreSQL/pgvector，前端用 Remix + Tailwind + Vite + Drizzle ORM。
8. **MCP 整合**：另有姊妹倉 [supermemoryai/supermemory-mcp](https://github.com/supermemoryai/supermemory-mcp)（Universal Memory MCP，一行指令把記憶接到各家 LLM，無登入無 paywall），主倉亦支援 `npx -y install-mcp@latest` 快速安裝，可接 Claude Desktop / Cursor / Windsurf / VS Code / Claude Code / OpenCode 等客戶端。

### 目標使用者

- 要為 AI agent / chatbot 加上「跨對話長期記憶 + 使用者畫像」但不想自建 vector pipeline 與事實抽取邏輯的應用開發者；
- 需要「RAG 文件檢索 + 個人化記憶」單一 API 同時回傳、且在意檢索品質（benchmark 領先）與延遲（sub-300ms）的產品團隊；
- 已使用 Vercel AI SDK / LangChain / LangGraph / OpenAI Agents SDK 等框架、想直接掛記憶層的工程師；
- 需要把 Google Drive / Gmail / Notion 等個人知識自動同步進 agent 的場景；
- 有 on-prem / 合規需求並願意走 enterprise self-hosting 方案的企業客戶。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [mem0ai/mem0](https://github.com/mem0ai/mem0)（約 52.8K stars / $24M 募資 / Apache-2.0） | mem0 為 vector + knowledge graph 混合、可直接 self-host（Apache-2.0 容器化）；獨立評測中 mem0 LongMemEval 約 49%、recall 約 7–8 秒，supermemory 自published 85.2%／sub-300ms。mem0 社群最大、open-source 路線最完整；supermemory 主打 benchmark 領先 + hosted 體驗 + 內建 connectors（來源見外部評論，benchmark 數字多來自 supermemory 自家公佈，建議交叉驗證） |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | cognee 主打 ECL（Extract-Cognify-Load）+ 知識圖譜記憶、偏 graph-centric 與可自架；supermemory 主打 hosted API + 使用者畫像 + 多 connector，產品化（消費者 app + 企業 console）程度更高 |
| [getzep/zep](https://github.com/getzep)、[letta-ai/letta](https://github.com/letta-ai/letta)（前 MemGPT） | 同屬 agent memory 賽道；第三方評測常把 mem0 / Zep / Letta / supermemory 並列比較。supermemory 差異在「RAG + memory 單查詢混合 + ~50ms user profile + 多平台 connector」整合度 |
| 純 vector DB（[Pinecone](https://www.pinecone.io/)、pgvector 裸用） | supermemory 把事實抽取、矛盾解決、時序更新、自動遺忘、畫像維護封裝為更高階的「記憶」抽象，而非僅相似度檢索 |

差異化關鍵：supermemory 把「memory ≠ RAG」當核心論述——RAG 取無狀態文件 chunk，memory 則隨時間追蹤使用者事實的變化（如地點變更）；並以「benchmark 三冠（LongMemEval / LoCoMo / ConvoMem 皆 #1，官方自述）+ hosted 低延遲 + 內建 connector」對打競品。

### 外部評論（每則附超連結）

- [TechCrunch《A 19-year-old nabs backing from Google execs for his AI memory startup, Supermemory》（2025-10-06）](https://techcrunch.com/2025/10/06/a-19-year-old-nabs-backing-from-google-execs-for-his-ai-memory-startup-supermemory/)：報導 19 歲創辦人 Dhravya Shah 取得 Google / Cloudflare 高管背書與種子募資。
- [Dataconomy《Young Founder's Supermemory Raises $2.6M From Cloudflare And Google Execs》（2025-10-07）](https://dataconomy.com/2025/10/07/young-founders-supermemory-raises-2-6m-from-cloudflare-and-google-execs/)：$2.6M 募資與投資人名單。
- [FoundersToday《19-year-old founder Dhravya Shah secures $2.6M ... for AI memory startup Supermemory》](https://www.founderstoday.news/dhravya-shah-secures-over-2m-funding/)：創辦人背景與募資細節。
- [DEV Community《5 AI Agent Memory Systems Compared: Mem0, Zep, Letta, Supermemory, SuperLocalMemory (2026 Benchmark Data)》](https://dev.to/varun_pratapbhardwaj_b13/5-ai-agent-memory-systems-compared-mem0-zep-letta-supermemory-superlocalmemory-2026-benchmark-59p3)：第三方把 supermemory 與 mem0/Zep/Letta 並列做 benchmark 比較。
- [Gamgee《Mem0 vs Supermemory: Which AI Memory Solution Should You Choose?》](https://gamgee.ai/vs/mem0-vs-supermemory/)：逐項對比兩者部署模式與功能。
- [supermemory.ai blog《Mem0 vs supermemory: Why Scira AI Switched》](https://supermemory.ai/blog/why-scira-ai-switched/)：官方案例文（自家立場，需注意偏向性）。
- [openalternative.co《Supermemory: Open Source Alternative to LangChain and Pinecone》](https://openalternative.co/supermemory)：把 supermemory 列為 LangChain / Pinecone 的開源替代。
- [addROM《Self-Hosting Supermemory: Your Guide ... Plus OpenClaw Integration》](https://addrom.com/self-hosting-supermemory-your-guide-to-the-fastest-memory-api-for-ai-plus-openclaw-integration/)：self-hosting 與客戶端整合教學。
- **重要分歧點**：[vectorize.io《Best SuperMemory Alternatives for Agent Memory in 2026》](https://vectorize.io/articles/supermemory-alternatives) 等第三方文章稱 supermemory「closed source、SaaS-only、無 self-host」，但本 repo `gh api` 顯示授權為 **MIT**、且官方有 [self-hosting 文件](https://supermemory.ai/docs/deployment/self-hosting)（限 enterprise 方案）。實際情況應理解為：**開源的是 app / plugins / SDK 外殼，生產記憶引擎為商業 hosted 服務、完整自架僅限企業**——第三方「完全閉源」的說法不精確，但「核心非開放自架」的判斷大致成立。引用 benchmark 與授權描述時建議以官方 repo + 官方 docs 為準。

### Release 狀態

`has_releases: true`，但 release 線非常年輕：截至今日僅 3 個 release，皆為 **server 套件 RC 版**，且全部集中於 **2026-05-31 同日**（上榜當天）發布——
- [server-v0.0.1-rc.2](https://github.com/supermemoryai/supermemory/releases/tag/server-v0.0.1-rc.2)（2026-05-31 00:00）
- [server-v0.0.1-rc.3](https://github.com/supermemoryai/supermemory/releases/tag/server-v0.0.1-rc.3)（2026-05-31 00:10）
- [server-v0.0.1-rc.4](https://github.com/supermemoryai/supermemory/releases/tag/server-v0.0.1-rc.4)（2026-05-31 00:20，最新）

`latest_release: server-v0.0.1-rc.4`。10 分鐘間隔連發 3 個 RC，顯示這是新拆出的 server 套件首次正式打包（可能為 CI/monorepo 發版機制），而非倉本身才剛起步——倉自 2024-02 建立、`pushed_at` 為 2026-05-31，長期高頻活躍。

### 授權與社群

- **授權**：MIT（依 `gh api repos/supermemoryai/supermemory`）。注意：開源的是本 repo 的 app / plugins / SDK；hosted 記憶引擎為商業服務，完整 self-hosting 僅開放 enterprise 客戶（官方 [self-hosting docs](https://supermemory.ai/docs/deployment/self-hosting) 註明「intended for enterprise customers only」，標準方案請用 hosted API）。
- **貢獻結構**：典型「創辦人主導 + 小核心團隊」——[Dhravya](https://github.com/Dhravya)（802 commits）一人獨大，次為 [MaheshtheDev](https://github.com/MaheshtheDev)（279）、[yxshv](https://github.com/yxshv)（112）、[CodeTorso](https://github.com/CodeTorso)（104）、[Kinfe123](https://github.com/Kinfe123)（43）等。
- **量化指標**：23,102 stars / **2,088 forks**（fork 比例約 9%）/ 21 open issues / 92 watchers。
- **Topics**（12 個）：`agent-memory`, `ai-memory`, `cloudflare-kv`, `cloudflare-pages`, `cloudflare-workers`, `drizzle-orm`, `memory`, `postgres`, `remix`, `tailwindcss`, `typescript`, `vite`。
- **Homepage**：<https://supermemory.ai/docs>；產品入口 `app.supermemory.ai`（消費者版）、`console.supermemory.ai`（企業 dashboard）。
- **姊妹倉**：[supermemoryai/supermemory-mcp](https://github.com/supermemoryai/supermemory-mcp)（Universal Memory MCP）。

## 資料來源

**本體**
- Repo：<https://github.com/supermemoryai/supermemory>
- 官網 / 文件：<https://supermemory.ai/docs>
- Self-hosting 文件：<https://supermemory.ai/docs/deployment/self-hosting>
- Releases：<https://github.com/supermemoryai/supermemory/releases>
- 姊妹倉 MCP：<https://github.com/supermemoryai/supermemory-mcp>
- `gh api repos/supermemoryai/supermemory`（描述 / MIT / created_at / topics / stars / forks）
- `gh api repos/supermemoryai/supermemory/releases`（3 個 RC release）
- `gh api repos/supermemoryai/supermemory/contributors`（貢獻者）

**外部評論與比較**
- [TechCrunch 募資報導](https://techcrunch.com/2025/10/06/a-19-year-old-nabs-backing-from-google-execs-for-his-ai-memory-startup-supermemory/)
- [Dataconomy 募資報導](https://dataconomy.com/2025/10/07/young-founders-supermemory-raises-2-6m-from-cloudflare-and-google-execs/)
- [FoundersToday 創辦人專文](https://www.founderstoday.news/dhravya-shah-secures-over-2m-funding/)
- [DEV Community 5 系統 benchmark 比較](https://dev.to/varun_pratapbhardwaj_b13/5-ai-agent-memory-systems-compared-mem0-zep-letta-supermemory-superlocalmemory-2026-benchmark-59p3)
- [Gamgee Mem0 vs Supermemory](https://gamgee.ai/vs/mem0-vs-supermemory/)
- [supermemory.ai 官方案例文](https://supermemory.ai/blog/why-scira-ai-switched/)
- [openalternative.co Supermemory 條目](https://openalternative.co/supermemory)
- [vectorize.io Supermemory Alternatives](https://vectorize.io/articles/supermemory-alternatives)
- [addROM self-hosting 教學](https://addrom.com/self-hosting-supermemory-your-guide-to-the-fastest-memory-api-for-ai-plus-openclaw-integration/)
