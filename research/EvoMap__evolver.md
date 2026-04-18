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

> 研究日期：2026-04-18
> 研究來源：<https://github.com/EvoMap/evolver>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[EvoMap/evolver](https://github.com/EvoMap/evolver) 是一套「**GEP 驅動的 AI Agent 自我演化引擎**」，將零散的 prompt 修改轉化為**可審計、可重用**的演化資產。官方明確定位為「**prompt 產生器，非程式自動修補器**」——它產出演化指令供外部代理執行，而不是直接改你的程式碼。

## 作者與起源

**EvoMap** 為 GitHub Organization（非個人），repo 建立於 **2026-02-01**，僅 2.5 個月內累積 4,800+ stars 與 4,600 萬次呼叫量。

時間軸重點：
- **2026-02-01**：repo 建立
- **2026-02**：於 **ClawHub** 上線，**10 分鐘登頂、三天下載破 36,000**
- **2026-04 初**：接入 **13 萬節點、4,600 萬次呼叫**
- **2026-04**：爆發 **EvoMap 指控 Nous Research 旗下 Hermes Agent 架構抄襲** 的爭議（10 步主迴圈一對一對應、12 組術語系統性替換），於多家媒體報導

Organization 旗下另有 MCP Server、JS SDK 等 12 個 repo，顯示為完整生態經營而非單點工具。

## 核心架構 / 主要概念

核心為 **GEP（Genome Evolution Protocol）**，類比 git commit 流程，對 AI 行為變更做**門控、追蹤、再利用**。

主要元件：
- **Genes / Capsules**：可重用的演化資產，存於 `assets/gep/`
- **Signal 選擇器**：將錯誤樣態對應到資產
- **EvolutionEvents**：審計紀錄
- **Memory 掃描**：偵測可復用模式
- **四種策略預設**：`balanced` / `innovate` / `harden` / `repair-only`
- **EvoMap Hub**（選用連線）：技能市集與排行榜

## 設計哲學

evolver 的設計主張圍繞「**協定約束的可追溯性**」，在官方 README 有清楚的自我定位：

> "A prompt generator, not a code auto-patcher."

這句話是 evolver 與 AutoGPT 類框架切割的核心聲明。具體展現：

1. **決定性優先**：產出演化指令（可重現），而非直接改碼（黑盒）
2. **審計為一等公民**：EvolutionEvents + Genes/Capsules 讓每次變更都可溯源
3. **協定而非框架**：GEP 是資料格式 + 流程約束，允許多 Adapter 接入（Claude Code、Cursor、Codex）
4. **與 MCP 互補而非取代**：MCP 處理「模型 → 工具」連線，GEP 處理「Agent 生命週期 + 跨模型能力繼承」

## 目標使用者與適用情境

**適用**：
- 大規模維運 Agent prompt 的團隊
- 需合規審計演化軌跡的組織（如金融、醫療）
- 採用 Claude Code、Cursor、Codex 等 Adapter 的開發者
- 重視變更可重現性、反對「AI 自動改碼黑盒」的團隊

**不適用**：
- 追求「一鍵讓 AI 自己修程式」的個人開發者（evolver 故意不做這件事）
- 小規模、單一 Agent 的 side project（協定開銷可能大於收益）
- 無法接受 **GPL-3.0** 授權傳染的閉源商業專案

## 與類似專案的差異

| 競品 | evolver 的差異 |
|---|---|
| **AutoGPT 類**（直接改碼框架） | evolver 以**協定約束的 prompt** 保持決定性與可追溯；不改碼，只產出演化指令 |
| **MCP**（Model Context Protocol） | MCP 解決模型-工具連線，GEP 處理 Agent 生命週期 + 跨模型能力繼承；**互補不取代** |
| **Hermes Agent**（Nous Research） | 爭議核心：evolver 指控對方 10 步主迴圈一對一對應、12 組術語系統性替換，Nous Research 否認 |

## 外部評論

- **ClawHub 登頂事件**：2026-02 上線後 10 分鐘登頂、三天下載破 36,000
- **節點規模**：四月已接入 13 萬節點、4,600 萬次呼叫
- **架構抄襲爭議**（2026-04）—— 媒體廣泛報導：
  - [36kr](https://eu.36kr.com/en/p/3767967755371011)：EvoMap 指控 Nous Research Hermes Agent 架構抄襲
  - [Phemex](https://phemex.com/news/article/evomap-accuses-hermes-agent-of-architectural-copying-nous-research-rebuts-73500)：事件完整時序與雙方立場
  - [Vertu](https://vertu.com/ai-tools/evomap-how-a-clawhub-controversy-sparked-the-worlds-first-ai-agent-evolution-network/)：ClawHub 事件延伸報導
- **HN / Reddit**：**未見顯著集中討論串，資料不足**

## Release 狀態 / 時間軸

節奏**極快**，自動化腳本主導發布。

- **最新版**：**v1.67.1**（2026-04-17）
- **24 小時內連發**：v1.66.0 → v1.67.1，顯示持續部署管線
- **發布策略**：高頻小版，類似軟體業持續交付實踐

從 2026-02 repo 建立到 2026-04 的 v1.67.x，67 個 major version 對應 2.5 個月，平均每日 ~1 個主版。

## 授權與社群

- **License**：**GPL-3.0**（注意：傳染授權，商業導入需評估）
- **量化鐵錨**（2026-04-18）：**4,804 stars**、471 forks、17 open issues、34 subscribers
- **主語言比例**：JavaScript（100%）
- **Runtime 需求**：Node.js ≥ 18
- **Topics**：（尚未設定）
- **增長速率**：從建 repo 到 4.8k stars 僅 2.5 個月，約 **每月 1,900 stars**
- **組織規模**：EvoMap 旗下另有 12 個相關 repo（MCP Server、JS SDK 等）

## 資料來源

### 本體
- GitHub repo: <https://github.com/EvoMap/evolver>
- 官網: <https://evomap.ai>
- GitHub Releases: <https://github.com/EvoMap/evolver/releases>

### 第三方評論
- 36kr 英文版: <https://eu.36kr.com/en/p/3767967755371011>
- Phemex: <https://phemex.com/news/article/evomap-accuses-hermes-agent-of-architectural-copying-nous-research-rebuts-73500>
- Vertu: <https://vertu.com/ai-tools/evomap-how-a-clawhub-controversy-sparked-the-worlds-first-ai-agent-evolution-network/>

### 同類工具
- AutoGPT 類 Agent 框架
- MCP（Model Context Protocol，互補關係）
- Hermes Agent（Nous Research，爭議對象）

## 更新紀錄
