---
repo: cline/cline
first_seen: 2026-04-24
last_updated: 2026-04-24
appearances: [2026-04-24]
growth_appearances: [2026-04-24]
has_releases: true
latest_release: v3.80.0
tags: [LLM 客戶端, Skill 外掛, 開源替代, 自進化]
domain: LLM 客戶端
form: Skill 外掛
themes: [開源替代, 自進化]
---

## 深度研究（2026-04-24 首次）

### 專案定位

[cline/cline](https://github.com/cline/cline)（前稱 Claude Dev）是一個**以 VS Code 擴充套件形式發佈的自主程式碼代理（autonomous coding agent）**，由 `saoudrizwan` 於 2024 年 7 月開立，目前已累積超過 6 萬顆星、6,246 fork、310+ 貢獻者，背後並由 Cline Bot Inc. 提供企業版（SSO、audit trail、遠端 config）。官方 tagline 是「right in your IDE, capable of creating/editing files, executing commands, using the browser, and more with your permission every step of the way」——定位在 Cursor 與 Aider 之間：不另外 fork 編輯器（保留原 VS Code 環境），但把 agent 的能動性（plan、file edit、terminal、browser、MCP）完整塞進側邊欄。採 Apache-2.0 授權，主語言 TypeScript。

### 核心架構 / 主要概念

Cline 是「human-in-the-loop agent loop」：每一步工具呼叫（讀寫檔、跑指令、開瀏覽器）都要使用者核准，UI 即時顯示 diff 與終端輸出、token 與 $ 花費。內建工具集含 `read_file`（v3.77 起支援 chunked reading）、`write_to_file`、`replace_in_file`、`execute_command`、`browser_action`（Computer Use，擷圖與點擊）、`new_task`、`use_mcp_tool`。Context 側提供 `@file` / `@folder` / `@url` / `@problems` 的手動引用，並以 workspace checkpoint 做 snapshot diff/restore；近期加入 repeated tool call loop detection，避免 agent 空轉燒 token。模型端採 **BYOK（bring-your-own-key）**，串接 Anthropic、OpenAI、OpenRouter、Gemini、AWS Bedrock、Azure、GCP Vertex、Cerebras、Groq、以及 LM Studio / Ollama 本地模型。MCP 自 2025 年初即深度整合，並自營 MCP Marketplace。

### 目標使用者

想要 agent 能力但不願離開原生 VS Code 生態的開發者；需要自備 API key、對成本可控（BYOK + 實時 token/cost 顯示）的專業工程師；以及**透過本地模型（Ollama/LM Studio）避免把 codebase 送雲端**的資料敏感團隊。近期 v3.80 加入的 `globalSkills` 遠端 config 與「Enterprise Skills」區塊，顯示重點正往企業內部推廣（SSO、audit、集中 prompt 管理）移動。

### 與類似專案的差異

- **Cursor** — Cursor 是 VS Code 的完整 fork，編輯器本身改造較深、agent 模式與 tab completion 整合緊密；Cline 保留 stock VS Code，插拔式、輕量，但 autocomplete 要搭 Continue 才補齊。
- **Aider** — Aider 為 CLI + git-native workflow，擅長原子 commit；Cline 在 IDE 內以 GUI 呈現 diff 與 approval，對非 terminal 派工程師門檻較低。
- **Continue** — Continue 強在 `@codebase` 檢索與本地 autocomplete，chat 速度最快；但實際「做事」時 Cline / Roo Code 啟動編輯較快，不必手動 Apply。
- **Roo Code** — 直接 fork 自 Cline，加入多模式（Code / Architect / Ask / Debug），每個模式限縮工具權限；社群普遍認為 Roo 的 model-per-mode routing 在本地模型情境更順，但 Cline 仍為「主幹」且功能迭代最快。
- **Claude Code** — Anthropic 官方 CLI，親代原生體驗、平行工作表現強；Cline 的差異在於 IDE 整合、BYOK 靈活度、以及 Apache-2.0 開源路線。

### 外部評論

- Hacker News「Show HN: Cline – Open-Source VS Code AI Coding Agent with a New MCP Marketplace」討論串中，作者公布 MCP Marketplace 並接受社群拷問，是其能見度大爆發起點（[HN thread](https://news.ycombinator.com/item?id=43105538)）。
- Latent Space 訪談 Saoud Rizwan 與 Nik Pash，深入介紹 Cline 如何成為「the closest open source equivalent to Cursor's agent mode」（[Latent Space: Cline – The Open Source Code Agent](https://www.latent.space/p/cline)）。
- 多篇 2026 比較文章指出：「Cline is the most capable open source agent and the closest to Cursor's agent mode」（[Best Open-Source AI Coding Tools in 2026 — Frontman](https://frontman.sh/blog/best-open-source-ai-coding-tools-2026/)）。
- 對於 Cline vs Roo Code 的分流，Qodo 評測結論：「Roo lets you create specialized AI personalities for different types of work. Each mode limits tool access to keep the context window clean」，但 Cline「has the largest community of any open-source coding agent」（[Roo Code vs Cline — Qodo](https://www.qodo.ai/blog/roo-code-vs-cline/)）。
- DevToolReviews 的三方對比提到 Continue 的 chat UI 最快，但「for 'real work,' Cline and Roo Code are faster because they start editing immediately, whereas Continue often requires more manual 'Copy to File' or 'Apply' clicks」（[Cline vs Roo Code vs Continue — DevToolReviews](https://www.devtoolreviews.com/reviews/cline-vs-roo-code-vs-continue)）。
- 中文圈評論以 Yourator 的「工程師必試的 6 大 AI IDE 助理」把 Cline 定位為「Vibe Coding 派」的代表（[Yourator 專欄](https://www.yourator.co/articles/1069)）；整體中文深度評測仍少，多半翻譯自英文資料。
- 安全事件：2026-02-17 `cline-cli@2.3.0` 遭供應鏈攻擊，npm publish token 被盜用並植入「OpenClaw」惡意程式，影響 CLI 使用者（[The Hacker News 報導](https://thehackernews.com/2026/02/cline-cli-230-supply-chain-attack.html)）——維護者已輪換 token 並於後續 release 修復，但此事件為企業採用增加了審查成本。

### Release 狀態

有 release，且**節奏極密**（週更）。近期版本：

- [v3.80.0](https://github.com/cline/cline/releases/tag/v3.80.0)（2026-04-22）— 串接企業 remote config 的 `globalSkills`、onboarding 改為動態抓取推薦模型。
- [v3.79.0](https://github.com/cline/cline/releases/tag/v3.79.0)（2026-04-16）— 新增 **Claude Opus 4.7** 模型支援、Azure Blob Storage provider、GLM / Hermes / XS 的 `use_subagents` system prompt。
- [v3.78.0](https://github.com/cline/cline/releases/tag/v3.78.0)（2026-04-10）— 「Spend Limit Reached」UI、`read_file` 顯示實際 line ranges。
- [v3.77.0](https://github.com/cline/cline/releases/tag/v3.77.0)（2026-04-01）— 實驗性「Lazy Teammate Mode」、`read_file` chunked reading。
- [v3.76.0](https://github.com/cline/cline/releases/tag/v3.76.0)（2026-03-26）— Kanban launch modal、CLI 改以 Kanban 為預設、加入 repeated tool call loop detection。

從 changelog 看得出幾條主線：模型覆蓋不斷擴張（Opus 4.7、Azure Blob、subagents）、企業化（globalSkills、spend limit、remote config）、agent 穩定性（loop detection、chunked read）。

### 授權與社群

- 授權：**Apache-2.0**，對商用友善。
- 社群規模：60,757 stars、6,246 forks、273 subscribers、696 open issues、310+ 貢獻者；VS Code Marketplace 上 extension id 仍保留 `saoudrizwan.claude-dev`（歷史包袱）。
- 治理：個人專案已轉型為 Cline Bot Inc. 商業實體，enterprise SKU 提供 SSO / audit / globalSkills；開源版維持完整功能，並持續整合社群 PR（近期最大 fork 為 Roo Code，雙方在 MCP 與 mode 系統上互相影響）。
- 風險：供應鏈攻擊事件（[The Hacker News](https://thehackernews.com/2026/02/cline-cli-230-supply-chain-attack.html)）提示，對於把 Cline 接 production API key 的團隊，需評估 CLI/extension 發佈流程的信任鏈；官方已補 2FA + release provenance。
