---
repo: EvoMap/evolver
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]
growth_appearances: [2026-04-18]
has_releases: true
latest_release: v1.67.1
---

# [EvoMap/evolver](https://github.com/EvoMap/evolver)

## 深度研究（2026-04-18 首次）

### 專案定位
[EvoMap/evolver](https://github.com/EvoMap/evolver) 定位為「GEP 驅動的 AI Agent 自我演化引擎」，將零散的 prompt 修改轉化為可審計、可重用的演化資產。官方強調它是「prompt 產生器，非程式自動修補器」，產出演化指令供外部代理執行。

### 核心架構 / 主要概念
核心是 **GEP（Genome Evolution Protocol）**，類比 git commit 流程，對 AI 行為變更做門控、追蹤與再利用。主要元件：可重用的 **Genes / Capsules**（存於 `assets/gep/`）、**Signal 選擇器**將錯誤樣態對應到資產、**EvolutionEvents** 審計紀錄、Memory 掃描、以及 `balanced` / `innovate` / `harden` / `repair-only` 四種策略預設；另有可選的 EvoMap Hub 連線提供技能市集與排行榜。

### 目標使用者
大規模維運 Agent prompt 的團隊、需合規審計演化軌跡的組織，以及採用 Claude Code、Cursor、Codex 等 Adapter 的開發者。

### 與類似專案的差異
相較於直接改碼的 AutoGPT 類框架，[EvoMap/evolver](https://github.com/EvoMap/evolver) 以「協定約束的 prompt」保持決定性與可追溯；相較於 MCP 解決模型-工具連線，GEP 處理 Agent 生命週期與跨模型能力繼承。

### 外部評論
- 2026 年 2 月於 ClawHub 上線，10 分鐘登頂、三天下載破 36,000；四月已接入 13 萬節點、4,600 萬次呼叫。
- 近期爆發 EvoMap 指控 Nous Research 旗下 Hermes Agent 架構抄襲的爭議（10 步主迴圈一對一對應、12 組術語系統性替換），於 [36kr](https://eu.36kr.com/en/p/3767967755371011)、[Phemex](https://phemex.com/news/article/evomap-accuses-hermes-agent-of-architectural-copying-nous-research-rebuts-73500)、[Vertu](https://vertu.com/ai-tools/evomap-how-a-clawhub-controversy-sparked-the-worlds-first-ai-agent-evolution-network/) 等媒體廣泛報導。
- 未見顯著 HN / Reddit 串討論，資料不足。

### Release 狀態
節奏極快，自動化腳本發布。最新 **v1.67.1**（2026-04-17），24 小時內連發 v1.66.0 → v1.67.1，顯示持續部署。

### 授權與社群
JavaScript（100%）、Node.js ≥ 18、GPL-3.0；約 3.9k stars、400 forks、30 open issues，建立於 2026-02-01。EvoMap 組織旗下另有 MCP Server、JS SDK 等 12 個 repo。

## 更新紀錄
