---
repo: rohitg00/agentmemory
first_seen: 2026-05-10
last_updated: 2026-05-14
appearances: [2026-05-10, 2026-05-13, 2026-05-14]
growth_appearances: [2026-05-10, 2026-05-13, 2026-05-14]
has_releases: true
latest_release: v0.9.12
tags: [LLM 基礎建設, 框架, 自架, 資料主權]
domain: LLM 基礎建設
form: 框架
themes: [自架, 資料主權]
---

# [rohitg00/agentmemory](https://github.com/rohitg00/agentmemory) — 深度研究

## 深度研究（2026-05-10 首次）

### 專案定位
[rohitg00/agentmemory](https://github.com/rohitg00/agentmemory) 是一套 **AI 編碼代理的持久化記憶後台服務**，自我定位為「`#1` Persistent memory for AI coding agents based on real-world benchmarks」。核心訴求：跨 session 自動記住代理的工具呼叫、決策與專案脈絡，免去每次手動重述架構與偏好。

### 核心架構 / 主要概念
建構於自家 **iii engine**（KV + 內嵌向量單一狀態層，無 Express/SQLite/Postgres）。關鍵設計：
- **12 hooks 自動捕捉**：tool use → 去重 → 隱私過濾（剔除 API key / 機密）→ 觀察落盤 → LLM 壓縮 → 嵌入 → 同時建 BM25 與向量索引；session 結束時摘要並抽取知識圖譜，下次啟動以 **hybrid search（BM25 + vector + graph，RRF 融合）** 注入上下文。
- **4 階段記憶整合**：Working → Episodic → Semantic → Procedural，仿人類睡眠鞏固機制，並引入 Ebbinghaus 遺忘曲線衰減。
- **51 個 MCP 工具 + 6 resources + 3 prompts + 4 skills**，內建 port 3113 即時儀表板觀察 BM25 掃描、embedding lookup、RRF fusion。

### 目標使用者
跨 session 多週/多月專案的開發者、共享代理的小型團隊、以及苦於每次重新解釋架構與決策的個人玩家。`npx @agentmemory/agentmemory` 一行啟動，需 Node.js ≥ 20 與 `iii-engine` 或 Docker。

### 與類似專案的差異
官方對表（README）強調：對 [mem0ai/mem0](https://github.com/mem0ai/mem0)（53K⭐）與 [letta-ai/letta](https://github.com/letta-ai/letta)（22K⭐），主打三點——LongMemEval-S Recall@5 **95.2%**（mem0 68.5% / Letta 83.2%）、12 hooks 自動捕捉而非手動 `add()` 或代理自編、零外部 DB 依賴（不需 Qdrant/pgvector/Postgres）。框架無關，同時支援 MCP、REST、native hooks，13+ 代理（Claude Code、Cursor、Cline、Windsurf、Gemini/Codex CLI、Goose、Aider…）共用同一記憶 server。

### 外部評論
- 作者本人在 X 上回顧設計理念（"stop re-deriving, start compiling，agent-facing 而非 human-facing"）[(來源)](https://x.com/ghumare64/status/2040733536496279885)
- 趨勢平台收錄並追蹤暴衝排名 [(來源)](https://trendshift.io/repositories/25123)
- 作者衍生筆記，將 agentmemory 架構與 Karpathy 的 LLM Wiki pattern 對接 [(來源)](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2)
- 基準方法論細節 [(來源)](https://github.com/rohitg00/agentmemory/blob/main/benchmark/LONGMEMEVAL.md)；獨立第三方深度評測尚未檢索到，主要敘事仍由作者主導，數字宜保留驗證空間。

### Release 狀態
- 最新版本：v0.9.5 — search recall + plugin compatibility（2026-05-09）
- 主要特性：搜尋召回正確性修補、將 `iii-engine` 鎖定 v0.11.2（v0.11.6 sandbox 模型不相容）。仍處於 0.x 快速迭代期。

### 授權與社群
- 授權：Apache-2.0
- 主語言：TypeScript
- Stars：3,293｜Forks：331｜Open Issues：26｜Watchers：11
- 貢獻者高度集中於作者 [rohitg00](https://github.com/rohitg00)（249 commits），其餘 11 位貢獻者多為個位數 patch；屬典型「單人主導 + 外圍小修」的早期高熱度個人專案，社群治理尚淺。

## 更新紀錄

### 2026-05-13
- 自 2026-05-10 後三天內連發 5 版（[v0.9.6](https://github.com/rohitg00/agentmemory/releases/tag/v0.9.6) → [v0.9.10](https://github.com/rohitg00/agentmemory/releases/tag/v0.9.10)，2026-05-10 ~ 2026-05-12），全部圍繞自架部署與 MCP shim 的真實使用者回報修起：
  - `v0.9.6`（5-10）：搜尋召回率 + MCP shim + hook 延遲調整
  - `v0.9.7`（5-11）：MCP shim probe 診斷、compose volume 修補、log cap
  - `v0.9.8`（5-11）：local fallback `tools/list` 回 7 不再回 4
  - `v0.9.9`（5-11）：pinned slot injection + MiniMax env loader
  - [v0.9.10](https://github.com/rohitg00/agentmemory/releases/tag/v0.9.10)（5-12）：distroless image 跑 UID 65532 但 docker volume 預設 `root:root mode 755` 寫不入 `/data/state_store.db`、引擎 silent buffer 在 RAM 重啟蒸發；以一個 `busybox:1.36` one-shot init 容器先 chown 修復；同步修 viewer reverse proxy 端口偵測（hardcoded `3113` → `window.location.origin`）、`mem::context` budget loop 不再因首個過大區塊 `break` 整個選取（改為 `continue`），均由用戶 [@flamerged](https://github.com/flamerged) 在 [#299](https://github.com/rohitg00/agentmemory/issues/299)／[#301](https://github.com/rohitg00/agentmemory/issues/301) 即時回報。
- 連 4 版 patch 反映 self-hosted 部署形態（docker-compose + distroless + 反向代理）對 v0.9.5 的「快速可用」假設造成的壓力測試；目前對單一外部回報者依賴頗深。

### 2026-05-14
- 連 2 日守絕對榜 #2（5-13~5-14）、連 2 日守增長榜 #3；growth_rate 18.86% → **18.24%** 幾乎持平，stars_today 1,067 → 1,335（+25.1%）。
- 自 v0.9.10 後再發兩版：[v0.9.11](https://github.com/rohitg00/agentmemory/releases/tag/v0.9.11)（2026-05-12 — Codex plugin platform + OpenClaw slot fix + website star button）、[v0.9.12](https://github.com/rohitg00/agentmemory/releases/tag/v0.9.12)（2026-05-13 — BM25 unicode + vector live-write + viewer hardening + plaintext-bearer guard）。從 distroless / docker / proxy 等部署層 bug 轉向 **multi-agent platform 整合（Codex 端）+ 搜尋索引底層強化（BM25 unicode、vector live-write）**，反映 user base 正從 self-host 試水溫進到「跨 IDE 整合 + 搜尋品質」階段。`latest_release` 更新為 **v0.9.12**。
