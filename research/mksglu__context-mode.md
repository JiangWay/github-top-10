---
repo: mksglu/context-mode
first_seen: 2026-05-06
last_updated: 2026-05-06
appearances: [2026-05-06]
growth_appearances: [2026-05-06]
has_releases: true
latest_release: v1.0.111
tags: [LLM 基礎建設, MCP Server, 資料主權, 開源替代]
domain: LLM 基礎建設
form: MCP Server
themes: [資料主權, 開源替代]
---

# mksglu/context-mode

## 深度研究（2026-05-06 首次）

### 專案定位

[mksglu/context-mode](https://github.com/mksglu/context-mode) 是一個 MCP Server，目標是解決 AI coding agent 的「另一半 context 問題」——MCP 工具呼叫每次都把原始資料整包塞進對話 context，導致 200K token window 在 30 分鐘內就用光。作者 [Mert Köseoğlu](https://mksg.lu/blog/context-mode) 在自己的部落格說明動機：受到 Cloudflare 壓縮 tool definition 成功經驗啟發，他要把焦點放在 **output 側**——「Every MCP tool call in Claude Code dumps raw data into your 200K context window.」（[Stop Burning Your Context Window](https://mksg.lu/blog/context-mode)）。

repo 自我描述為 "Context window optimization for AI coding agents. Sandboxes tool output, 98% reduction. 14 platforms"，2026-05-06 當下達 12,913 stars、888 forks、76 watchers，主語言 TypeScript，授權 Elastic License 2.0（source-available）。

### 核心架構 / 主要概念

context-mode 用四個機制壓 context：

1. **Sandbox 隔離 tool output**——原始資料跑在子程序，主對話只看到 stdout 摘要。315 KB 的 repo 分析縮成 5.4 KB。
2. **SQLite + FTS5 索引保留 session 連續性**——每次檔案編輯、git 操作、任務、使用者決策都寫進本地 SQLite，conversation compact 時不再灌回原始資料，而是用 BM25 ranking 從索引取相關片段。`--continue` 重啟時自動重建工作狀態。
3. **Code-driven analysis**——讓 agent 寫腳本算結果而不是把 50 個檔案讀進 context；一次 `ctx_execute()` 取代 10 次 tool call，context 用量降 100x。
4. **Output 壓縮**——強制模型回應採用 terse/technical 風格（碎句、無冠詞、無 hedging），output token 降 65–75%。

對外提供 11 個 MCP tool，分兩組：
- **Sandbox 類（6 個）**：`ctx_batch_execute`、`ctx_execute`（11 種語言：JS/TS/Python/Shell/Ruby/Go/Rust/PHP/Perl/R/Elixir）、`ctx_execute_file`、`ctx_index`、`ctx_search`、`ctx_fetch_and_index`（24 小時 TTL cache）。
- **Utility 類（5 個）**：`ctx_stats`、`ctx_doctor`、`ctx_upgrade`、`ctx_purge`、`ctx_insight`（個人分析儀表板，90 個指標、23 個事件分類）。

Session 連續性靠五個 hook 協作：`PreToolUse`（路由與危險命令攔截）、`PostToolUse`（事件捕捉）、`UserPromptSubmit`（使用者決策）、`PreCompact`（≤2 KB 優先級分層 XML 快照）、`SessionStart`（狀態還原）。compaction 發生時，hook 會挑選需要保留的 file/task/rule 高優先級資訊，低優先級（intent、tool count）先掉。

索引層是 SQLite FTS5 + BM25 + Porter stemming（"running/runs/ran" 同詞幹）+ heading 加權 5x + Reciprocal Rank Fusion（融合 stem 與 trigram 結果）+ proximity rerank + 模糊修正（"kuberntes" → "kubernetes"）。資料來源：[README](https://github.com/mksglu/context-mode/blob/main/README.md)。

### 目標使用者

宣稱支援 14 個 AI coding 平台，分四種整合形態（[platform-support.md](https://github.com/mksglu/context-mode/blob/main/docs/platform-support.md)）：

- **Hook-capable（完整 session 支援）**：[anthropics/claude-code](https://github.com/anthropics/claude-code)、Qwen Code、Gemini CLI、VS Code Copilot、JetBrains Copilot、OpenCode、KiloCode、OpenClaw/Pi Agent、Codex CLI。這些平台用 hook 強制路由，能在執行前攔截危險命令。
- **部分 hook（缺 SessionStart）**：Cursor、Kiro。
- **Instruction-file only**：Antigravity、Zed——只能靠手動複製 `CLAUDE.md`、`AGENTS.md`、`GEMINI.md` 等指令檔，靠約 60% 模型遵循率運作。
- **Extension-based**：Pi Coding Agent。

實際使用者是「在 200K context window 撞牆的 coding agent 重度使用者」——README 給的對比是 session 從 30 分鐘延長到 3 小時。安裝最簡單的是 Claude Code（兩行 `/plugin marketplace add` 與 `/plugin install`），其他平台需要編輯 `~/.gemini/settings.json`、`.vscode/mcp.json`、`opencode.json` 等設定檔加上 hook 定義，門檻不算低。

### 與類似專案的差異

context-mode 與兩類專案位置不同：

- **vs. 一般 MCP server（Playwright / Context7 / GitHub MCP）**：那些是「資料來源」，context-mode 是套在它們前面的「壓縮層」。作者在 Twitter 提到（[mksglu @ X](https://x.com/mksglu/status/2025830253235413169)）：Playwright + Context7 + GitHub MCP 同時掛上，「72% is consumed before you even start working」。
- **vs. Cloudflare 等壓 tool definition 的方案**：那些壓的是 schema 大小（input 側），context-mode 壓的是執行結果（output 側），兩者互補。
- **vs. agent 自己的 memory / compaction**：Claude Code 內建 compaction 是把舊訊息丟掉，context-mode 是先把訊息結構化、indexed，compact 時不丟資料只丟 raw bytes，需要時再 BM25 撈回。
- **vs. tantivy/Qdrant 等更強的搜尋層**：HN 留言者 i3oi3 直接指出 "tantivy's BM25 search is faster, more expressive, and more scalable than SQLite"（[HN #47148025](https://news.ycombinator.com/item?id=47148025)）；作者選 SQLite FTS5 是為了零依賴 + 純本地 + 不需額外 daemon，trade-off 是規模上限。

定位上，context-mode 是 **MCP Server 形態的本地壓縮代理**，這在公開生態中目前沒看到直接競品；最接近的概念是 IDE 內建 context manager，但那都綁定單一平台。

### 外部評論

- **Hacker News（[Show HN: Context Mode](https://news.ycombinator.com/item?id=47148025)，84 upvotes）**——整體正面，最常見的疑問與批評：
  - `handfuloflight` 質疑度量精度：「One moment you're speaking about context but talking in kilobytes, can you confirm the token savings data?」——byte 數不等於 token 數，作者用 `Buffer.byteLength()` 估算，token 對應關係沒明說。
  - `i3oi3` 建議用 tantivy 取代 SQLite FTS5，並提醒 benchmark 應該找 context 受限的便宜模型才有意義。
  - `wobblywobbegong` 報告可靠性問題：「I tried the Hackernews example from the docs, but its tools don't seem to trigger reliably.」作者承認是 bug，於 v0.7.1 修掉。
  - `robbomacrae` 提出敏感資料遮蔽需求；context-mode 隨後加上 `[REDACTED]` 自動遮蔽（match `authorization`、`token`、`secret`、`password`、`api_key`、`cookie`、`signature`、`private_key`）。
- **作者部落格（[Stop Burning Your Context Window](https://mksg.lu/blog/context-mode)）**——Mert Köseoğlu 自介為 senior software engineer + AI consultant，經營 MCP Directory & Hub。文章核心訴求是：「Every MCP tool call in Claude Code dumps raw data into your 200K context window.」
- **第三方目錄收錄**：[agentskill.work](https://agentskill.work/en/skills/mksglu/context-mode)、[mcpcmd.com](https://www.mcpcmd.com/mcp/context-mode) 都把 context-mode 列入 MCP server 目錄，描述以 README 為主，無深入評論。
- **官方站台**：[context-mode.com](https://context-mode.com/) 與 [context-mode.mksg.lu](https://context-mode.mksg.lu/)（v1.0.0 announcement page）。

### Release 狀態

`has_releases: true`。v1.0.111（2026-05-04 發布）為當下最新版，repo 累計 137 個 release、1,162 個 main branch commit，平均不到一天一次發布。最新 release 主題是 `routePreToolUse` refactor（PR #423，貢獻者 [@mikij](https://github.com/mikij)）+ CI 測試對齊，屬小幅迭代。從 release cadence 看，專案處於高頻迭代期，TDD 為主要開發方式（[CONTRIBUTING.md](https://github.com/mksglu/context-mode/blob/main/CONTRIBUTING.md)）。

### 授權與社群

授權為 **Elastic License 2.0**（source-available；可 fork、修改、再散布；禁止 (a) 提供成 managed service、(b) 移除授權標示）——不是 OSI 認證的開源授權，但對個人與多數企業內用都無影響。

社群現況（2026-05-06）：
- Stars 12,913 / Forks 888 / Watchers 76 / Open Issues 10
- Contributors（依貢獻數，前 8）：`mksglu`（770）、`github-actions[bot]`（231）、`ipedro`（36）、`sebastianbreguel`（17）、`rjkaes`（15）、`Copilot`（11）、`mikij`（8）、`skoll43`（7）——明顯一人主導 + 少量外部 PR + 機器人自動化發版的型態。
- Topics 標籤涵蓋 14 個整合平台關鍵字（claude-code、codex、copilot、cursor-plugin、kiro、mcp、mcp-server、mcp-tools、openclaw、opencode、pi-agent、skills、zed-extension），這也對應 README 宣稱的「14 platforms」。

隱私部分 README 強調 "No telemetry, no cloud sync, no account required"，所有處理在本地子程序執行，SQLite DB 落在 `~/.context-mode/content/`，這是 `themes: [資料主權]` 標籤的依據；而功能上它是「把 cloud-based / proprietary context manager（如 IDE 內建）替換成本地開源」，所以也掛 `開源替代`。
