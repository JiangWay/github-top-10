---
repo: harvard-edge/cs249r_book
first_seen: 2026-07-05
last_updated: 2026-07-05
appearances: [2026-07-05]
growth_appearances: [2026-07-05]
has_releases: true
latest_release: v0.7.0（Vol I）/ v0.2.0（Vol II）
tags: [教學資源, 課程教材]
domain: 教學資源
form: 課程教材
themes: []
---

# [harvard-edge/cs249r_book](https://github.com/harvard-edge/cs249r_book)

> 研究日期：2026-07-05
> 研究來源：https://github.com/harvard-edge/cs249r_book
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-07-05 首次）

### 專案定位
Harvard CS249r「Tiny Machine Learning」課程 3 年半累積出的開放教材。2023-09-06 建 repo，主導者是 Harvard SEAS 副教授 [Vijay Janapa Reddi](https://scholar.harvard.edu/vijay-janapa-reddi)（同時是 MLCommons 副主席、MLPerf Tiny 共同創辦人）。這解釋為何內容不只是講義：底層繫在 MLCommons 的 benchmark 血脈上，不是單一教授的個人 side project。26,619 stars、CC BY-NC-SA 4.0、Python。

### 核心架構 / 主要概念
- **書分兩卷**：
  - Vol I《Build, Optimize, Deploy》聚焦 1–8 GPU 單機系統，2026-06-24 出到 v0.7.0
  - Vol II《Scale, Distribute, Govern》講 production-scale 分散式，同日到 v0.2.0
- **周邊子產品**：
  - [TinyTorch](https://github.com/mlsysbook)：不 `import torch`、從頭建 tensor / autograd 的教學 framework，v0.1.13 同期釋出
  - MLSys·im：training / inference 的解析性能模型
  - Arduino / Seeed / Grove / Raspberry Pi 的 Hardware Kits，覆蓋從演算法到硬體佈署
- **貢獻結構**：commit 集中度極高——貢獻榜首 [profvjreddi](https://github.com/profvjreddi) 累計 15,934 commits（第二名的社群協作者 hzeljko 僅 293），核心章節等同單一作者專書，外圍由學生 TA 群（[jasonjabbour](https://github.com/jasonjabbour)、[shanzehbatool](https://github.com/shanzehbatool) 等 Harvard 掛名者）補實驗與圖表

### 目標使用者
- 系選修 ML systems / TinyML 課程的研究生與大學生
- 想從「模型演算法」跨到「memory 預算 / latency budget / data pipeline / 責任 AI」的 ML 工程師
- 大學開課老師：作為課本或補充教材
- 硬體端 ML 開發者：需要涵蓋 edge 佈署的完整教材

### 與類似專案的差異
- vs [d2l-ai/d2l-en](https://github.com/d2l-ai/d2l-en)：教「模型」（CNN、transformer、如何寫 forward pass）；cs249r_book 教「系統」（memory 預算、latency budget、data pipeline、model deployment、責任 AI 與碳成本）——兩者互補而非替代
- vs [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT)：「單檔可讀」的 pedagogical 實作，屬點狀教材，缺書級系統論述
- vs [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)：專攻 LLM 訓練流程，不觸及 TinyML / edge 佈署這條主線

### 外部評論
- [CS249r 課程官方頁面](https://scholar.harvard.edu/vijay-janapa-reddi/classes/cs249r-tinyml)：作者本人頁面確認課程與教材的定位
- [ML Systems Textbook 官網](https://mlsysbook.ai/book/)：教材線上閱讀入口
- [TinyTorch 論文（arXiv 2601.19107）](https://arxiv.org/pdf/2601.19107)：《Building Machine Learning Systems from First Principles》學術背書
- 2026 年將由 MIT Press 出紙本，這是它跳出純 course notes 範疇的關鍵背書

### Release 狀態
- Vol I v0.7.0（2026-06-24）
- Vol II v0.2.0（2026-06-24）
- 今日 +443 stars 屬社群長尾發現，非 event-driven 爆量——6-24 雙卷發布後 11 天，配合 MIT Press 印刷版預告與新學期選書窗口，是可解釋的自然節奏

### 授權與社群
- License：CC BY-NC-SA 4.0
- Stars：26,619（截至 2026-07-05）
- 主要維護者：[profvjreddi](https://github.com/profvjreddi)（15,934 commits）
- Organization mlsysbook 下另有 TinyTorch 等子專案
