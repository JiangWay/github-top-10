---
repo: p-e-w/heretic
first_seen: 2026-06-01
last_updated: 2026-06-01
appearances: [2026-06-01]
growth_appearances: [2026-06-01]
has_releases: true
latest_release: v1.3.0
tags: [LLM 基礎建設, 應用程式, 開源替代]
domain: LLM 基礎建設
form: 應用程式
themes: [開源替代]
---

# [p-e-w/heretic](https://github.com/p-e-w/heretic)

> Fully automatic censorship removal for language models

## 深度研究（2026-06-01 首次）

### 專案定位

[p-e-w/heretic](https://github.com/p-e-w/heretic) 把 LLM 的安全對齊（safety alignment）拒答行為自動移除，作者為 Philipp Emanuel Weidmann。它把過去需要人工調參的 abliteration（方向性消融）流程包成一行命令，輸入 Hugging Face 模型名即可產出去審查版本。今天上 trending 與 2026-05-05 發佈的 v1.3.0 有關：該版本新增 Gemma 4、Qwen3.5 支援與 reproducible runs，同時社群以 Heretic 產出的衍生模型數已突破 3,000 個，跨平台討論（HN、r/LocalLLaMA、技術部落格）近期密集出現。

### 核心架構 / 主要概念

- **技術 stack**：Python、PyTorch、Hugging Face Transformers、Optuna（TPE 優化器）
- **abliteration 原理**：對 harmful / harmless 兩組 prompt 跑前向，取殘差向量差算出 refusal direction，再對 transformer 元件（attention、MLP）的權重做正交化消融
- **Heretic 的延伸**：
  - 參數化 ablation weight kernel，逐層變化以拉開 compliance 與 quality 的 trade-off
  - 容許非整數 direction index，在最近兩個 refusal direction 間插值，擴大搜尋空間
  - attention 與 MLP 拆成不同參數調（MLP 對品質傷害更大）
- **「Fully automatic」的實作**：用 Optuna TPE 同時最小化 (1) harmful prompt 的 refusal 數 (2) 對 harmless prompt 的 KL divergence，搜出最佳組合
- **涵蓋範圍**：大多數 dense 模型、多模態、多種 MoE、Qwen3.5 等 hybrid；純 state-space 模型尚未支援
- 預設參數於 RTX 3090 跑 20–30 分鐘可完成一個模型

### 目標使用者

安全研究員（評估 safety alignment 韌性）、red team、open-weight 模型 fine-tuner、想自製 uncensored 模型上傳 Hugging Face 的個人用戶。亦適合做 interpretability 研究——README 附帶殘差向量與 refusal direction 的視覺化工具。屬 dual-use 工具：合法用途包含 safety eval 與 reverse engineering safeguards，惡意濫用同樣可行，作者在 README 採中性陳述。

### 與類似專案的差異

- [FailSpy/abliterator](https://github.com/FailSpy/abliterator)：abliteration 開源原型實作，需手動挑選 direction layer 與權重，依賴使用者經驗
- [Sumandora/remove-refusals-with-transformers](https://github.com/Sumandora/remove-refusals-with-transformers)：流程腳本化但仍需人工設定，未做 Optuna 自動搜參
- Heretic 的差異：把參數搜尋交給 TPE，使用者不需懂 transformer 內部；同時把 ablation kernel 參數化，依文件公布的 Gemma-3-12B-IT 數據可達 3/100 refusal 與 0.16 KL，KL 約為 mlabonne 手工版本的六分之一

### 外部評論

- [Hacker News: Heretic: Automatic censorship removal for language models](https://news.ycombinator.com/item?id=45945587)：v1.0 發佈時的主要討論串，正反意見並陳，有評論者質疑 README 部分用語不精確
- [Hacker News: A tool that removes censorship from open-weight LLMs](https://news.ycombinator.com/item?id=47275291)：較近期的二度上 HN 討論
- [GIGAZINE 報導](https://gigazine.net/gsc_news/en/20251117-heretic/)：日本媒體介紹 v1.0.1 首次公開版本與用途
- [aithinkerlab 跑分對比](https://aithinkerlab.com/heretic-ai-abliteration-benchmarks-2026/)：第三方對 Heretic 與既有 abliterated 模型做 refusal rate 與標準 benchmark 比較

### Release 狀態

最新版本 v1.3.0，發佈於 2026-05-05；主要變更為 Gemma 4 / Qwen3.5 模型支援、reproducible runs、peak VRAM 降低、benchmarking 系統整合。前一版 v1.2.0（2026-02-14）導入 LoRA-based abliteration 與 4-bit 量化、VL 模型支援、optimization 進度可保存/續跑。首版 v1.0.1 為 2025-11-16。

### 授權與社群

- 授權：AGPL-3.0
- 22,924 stars、2,453 forks、91 subscribers
- 主要語言 Python
- 作者 p-e-w 為個人開發者，但 v1.1～v1.3 release notes 列出 20+ 位外部貢獻者，社群參與度高
- 在 Hugging Face 上以 Heretic 處理過的衍生模型已超過 3,000 個
