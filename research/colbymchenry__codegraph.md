---
repo: colbymchenry/codegraph
first_seen: 2026-05-20
last_updated: 2026-05-21
appearances: [2026-05-20, 2026-05-21]
growth_appearances: [2026-05-20, 2026-05-21]
has_releases: true
latest_release: v0.7.10
tags: [開發者工具, MCP Server, 自架, 資料主權, 開源替代]
domain: 開發者工具
form: MCP Server
themes: [自架, 資料主權, 開源替代]
---

# [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)

## 深度研究（2026-05-20 首次）

### 專案定位

[colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)（6,286 stars、420 forks、2026-01-18 建立、TypeScript、MIT）是針對 [anthropics/claude-code](https://github.com/anthropics/claude-code)／Cursor／Codex CLI／opencode 設計的「預先索引代碼知識圖譜」MCP server。它在本地用 tree-sitter 解析原始碼、把 symbol／call graph／imports 存進 SQLite + FTS5，讓 AI agent 透過結構化查詢取代反覆 grep／find／read，官方 benchmark 宣稱「92% 少 tool calls、71% 快、Token 降 94%」（如 VS Code 4,002 檔從 52 calls + 1m37s 降到 3 calls + 17s）。

### 核心架構 / 主要概念

- **Extraction**：tree-sitter 抽取 19+ 語言（TS／JS／Python／Go／Rust／Java／C#／PHP／Ruby／C／C++／Swift／Kotlin／Dart／Svelte／Vue／Liquid／Pascal）的 nodes（function／class／method）與 edges（call／import／inherit）
- **Storage**：本地 `.codegraph/codegraph.db`（SQLite + FTS5）
- **Resolution**：後處理連接 call→def、imports、13+ Web 框架路由（Django／Flask／FastAPI／Express／Laravel／Rails／Spring）
- **Auto-sync**：FSEvents／inotify／ReadDirectoryChangesW 2 秒 debounce 增量更新
- **MCP tools**：`codegraph_search`／`codegraph_context`／`codegraph_callers`／`codegraph_callees`／`codegraph_impact`／`codegraph_node`／`codegraph_files`／`codegraph_status`

### 目標使用者

重度使用 Claude Code／Cursor／Codex CLI／opencode 的單人或團隊開發者；管理大型／多語 monorepo、希望降低 token 帳單、要求 100% on-prem 不外送代碼者。

### 與類似專案的差異

- vs [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)（同類「Claude Code 本地知識圖譜」，主打 review 場景 6.8× 省 token）：codegraph 同步支援 4 大 agent + 19 語、節點／邊覆蓋更廣、有 multi-agent installer
- vs Sourcegraph／GitHub code search：純本地、無雲端、無 API 金鑰、無 per-query 收費
- vs RAG-for-code（如 [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)）：抽取走 AST 確定性路徑而非 LLM 摘要，召回結構化、無幻覺
- 與同日上榜 [rtk-ai/rtk](https://github.com/rtk-ai/rtk) 對比：codegraph 從「查詢端」省 tokens（pre-indexed knowledge graph 取代反覆 grep／read），rtk 從「執行端」省 tokens（壓縮 shell 輸出）；二者形成「token 節省雙線」

### 外部評論

- [AIToolly：CodeGraph: Local Semantic Knowledge Graph for Claude Code](https://aitoolly.com/ai-news/article/2026-05-18-codegraph-enhancing-claude-code-with-pre-indexed-semantic-knowledge-graphs-for-localized-and-efficie)（2026-05-18 強調 100% 本地與 token 經濟性）
- [Trendshift：colbymchenry/codegraph trending insights](https://trendshift.io/repositories/26949)（趨勢儀表板紀錄竄升軌跡）
- [OSS Insight：analyze colbymchenry/codegraph](https://ossinsight.io/analyze/colbymchenry/codegraph)（commit／contributor 活躍度視覺化）
- [Spreaker podcast：GitHub colbymchenry/codegraph](https://www.spreaker.com/episode/github-colbymchenry-codegraph-pre-indexed-code-knowledge-graph-for-claude-code-fewer-tokens-fewer-tool-calls-100-local--72037975)（音訊摘要報導）
- HN／Reddit／中文社群本次搜尋未找到明確討論串，資料不足

### Release 狀態

最新 release：**[v0.7.10](https://github.com/colbymchenry/codegraph/releases/tag/v0.7.10)**（2026-05-19，距上榜僅 1 日）。修 MCP 慢檔案系統 handshake 30s timeout（Docker VirtioFS／WSL2）、Windows PowerShell mojibake 亂碼、module-qualified symbol（`module::symbol`／`Module.symbol`）查詢失敗。前一版 [v0.7.9](https://github.com/colbymchenry/codegraph/releases/tag/v0.7.9)（2026-05-18 修 opencode `.jsonc` install bug）、[v0.7.7](https://github.com/colbymchenry/codegraph/releases/tag/v0.7.7)（2026-05-18 新增 Claude／Cursor／Codex／opencode 四 agent multi-select installer，closes #137）。上榜前 7 天連發 4 版密集 ship。

### 授權與社群

MIT、open_issues 50、subscribers 21、forks 420、created 2026-01-18（≈4 個月達 6.3k stars）。作者 [colbymchenry](https://github.com/colbymchenry) 為主要維護者，release notes 致謝 [@sashanclrp](https://github.com/sashanclrp)／[@sgrimm](https://github.com/sgrimm)／[@joselhurtado](https://github.com/joselhurtado)／[@starkleek](https://github.com/starkleek)／[@Bortlesboat](https://github.com/Bortlesboat)／[@andreinknv](https://github.com/andreinknv) 提交 issue／PR／fork commit。Wiki 已開、Discussions 未開、社群仍以 issues 為主要接觸點。
