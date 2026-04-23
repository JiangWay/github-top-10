---
repo: zilliztech/claude-context
first_seen: 2026-04-22
last_updated: 2026-04-24
appearances: [2026-04-22, 2026-04-23, 2026-04-24]
growth_appearances: [2026-04-22, 2026-04-23, 2026-04-24]
has_releases: false
latest_release: null
tags: [MCP 協定, MCP Server, 開源替代]
domain: MCP 協定
form: MCP Server
themes: [開源替代]
---

# zilliztech/claude-context 深度研究

## 深度研究（2026-04-22 首次）

### 專案定位

[zilliztech/claude-context](https://github.com/zilliztech/claude-context) 是一支掛在 Claude Code 與其他 MCP 客戶端底下的「語意程式碼搜尋」MCP Server。官方一句話說明：讓整個 codebase 成為任何 coding agent 的 context。它把專案原始碼切塊、向量化後灌進 Milvus 或 Zilliz Cloud，再透過 MCP 把三個工具（index、search、status）暴露給 agent。主語言是 TypeScript，MIT 授權，GitHub 目前約 6.4k stars、558 forks，最新 npm 套件 `@zilliz/claude-context-mcp` 版本為 `0.1.7`。背後是向量資料庫 [milvus-io/milvus](https://github.com/milvus-io/milvus) 的母公司 Zilliz，這份研究本質上是 Zilliz 把自家向量庫包裝成 coding agent 加值層的示範。

### 核心架構 / 主要概念

monorepo 切成三塊：`@zilliz/claude-context-core` 負責 AST 切塊與增量索引、`@zilliz/claude-context-mcp` 是 MCP 伺服器、另附一個 VS Code 延伸套件。檢索採 hybrid search：BM25 加稠密向量一起打分；切塊以 AST 為主、長度超界時退回字元切分；再用 Merkle tree 比對檔案雜湊，只重新索引異動檔案。嵌入模型可換（OpenAI / VoyageAI / Gemini / Ollama），向量庫走 Milvus 自架或 Zilliz Cloud 託管，兩端皆可本地化。

### 目標使用者

主要受眾是同時有「巨大單體 repo」與「吃 token 很兇的 agent 迭代工作流」的人：用 Claude Code、Cursor、Windsurf、Cline、Roo Code 這類 agent 直接在專案內跑修改，且看到每輪 grep+讀檔耗掉數十 k token 已感到痛。自架族可以組 Ollama + 自架 Milvus 全離線運行；雲端族可用 Zilliz 免費額度起步。

### 與類似專案的差異

定位最接近的是 [oraios/serena](https://github.com/oraios/serena)，兩者都解決「agent 在大 repo 盲搜」這件事，但 Serena 走 LSP / 符號索引路線、強調精確的符號跳轉與編輯；claude-context 走向量 RAG 路線、強調語意近似。另一個常被拿來並列的 [upstash/context7](https://github.com/upstash/context7) 其實是「第三方函式庫最新文件」的 MCP，與 claude-context「自家 repo 全文語意搜尋」不衝突而是互補。Zilliz 另一個 [zilliztech/zilliz-mcp-server](https://github.com/zilliztech/zilliz-mcp-server) 則是直接讓 agent 操作 Zilliz Cloud 的管理介面，與 claude-context 的檢索定位不同。

### 外部評論

- Zilliz 官方部落格〈[Cut Token Waste by 40% with Claude Context](https://zilliz.com/blog/why-im-against-claude-codes-grep-only-retrieval-it-just-burns-too-many-tokens)〉自評在等效檢索品質下，token 用量較 grep-only 流程減少約 40%，為產品主打數字。
- Skywork 長篇技術評論〈[Unlocking Your Codebase: A Deep Dive into Zilliz's Claude Context MCP Server](https://skywork.ai/skypage/en/unlocking-codebase-zilliz-claude-mcp/1978656702595375104)〉肯定 AST 切塊、Merkle 增量、MIT 授權與可換嵌入模型的開放性，視其為 Cursor 訂閱式索引的開源替代。
- PulseMCP 目錄頁〈[Claude Context MCP Server by Zilliz](https://www.pulsemcp.com/servers/zilliz-claude-context)〉與 [Augment Code MCP 目錄](https://www.augmentcode.com/mcp/claude-context-mcp-server) 收錄，確認其在主流 MCP 清單中曝光但未見獨立效能實測。
- Milvus 部落格〈[Building an Open-Source Alternative to Cursor with Code Context](https://milvus.io/blog/build-open-source-alternative-to-cursor-with-code-context.md)〉把 claude-context 放在「用 Milvus 取代 Cursor 內建索引」的敘事中介紹。
- 目前（2026-04-22）資料不足：HN / Reddit 尚未找到大型獨立討論串，缺少第三方對「40% token 省下」數字的重現。

### Release 狀態

尚無 GitHub Release。發行走 npm，目前 `@zilliz/claude-context-mcp` 最新版為 `0.1.7`，安裝時以 `npx @zilliz/claude-context-mcp@latest` 方式取用，因此 `has_releases: false`。

### 授權與社群

MIT 授權。主要貢獻者集中在 Zilliz 內部：`zc277584121`（108 commits）、`Shawnzheng011019`（31）、`codingjaguar`（6），外部貢獻長尾零星 1–4 commits，顯示仍是單一公司主導的官方專案而非廣泛社群共筆。Node 版本要求 20.x 至 22.x，與 24+ 不相容，部署時需留意。

## 更新紀錄

### 2026-04-23
- **連續第 2 天雙榜**（絕對榜由 #3 升至 #1，stars_today +873，growth_rate 11.87%；增長率榜 #2）
- 無 GitHub Release（仍 `has_releases: false`），npm 上 `@zilliz/claude-context-mcp` 版號續推
- 觀察：stars 從 6,456 升至 7,354（+898），首次擠下 [Fincept-Corporation/FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal) 成為絕對榜 #1；Zilliz/Milvus 生態 + MCP 熱潮雙重加持，code search MCP 類別的標竿地位進一步鞏固

### 2026-04-24
- **連續第 3 天雙榜**（絕對榜 #2，stars_today +1,023，growth_rate 12.32%；增長率榜 #3）
- 無新 GitHub Release（仍 `has_releases: false`），發行續走 npm 通道
- 觀察：stars 從 7,354 升至 8,302（+948），stars_today 首次破千，日增量連三日遞增（+259 → +873 → +1,023），顯示「code context MCP」敘事進入外部社群持續擴散階段；絕對榜位置由 #1 下滑至 #2 係因今日 #1 [huggingface/ml-intern](https://github.com/huggingface/ml-intern) 首登榜，而非本專案動能衰退
