---
repo: rasbt/LLMs-from-scratch
first_seen: 2026-05-13
last_updated: 2026-05-13
appearances: [2026-05-13]
growth_appearances: [2026-05-13]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材]
domain: 教學資源
form: 課程教材
themes: []
---

# [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)

> 研究日期：2026-05-13
> 研究來源：https://github.com/rasbt/LLMs-from-scratch
> 觸發原因：首次上絕對榜（#8，93,622 stars）
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-05-13 首次）

### 專案定位
[rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) 是 Sebastian Raschka 暢銷書《Build a Large Language Model (From Scratch)》（Manning, ISBN 9781633437166）的官方程式碼倉，2023 年 7 月開倉後逐步累積至 93,624 stars、14,407 forks。整本書的目標只有一個：用純 PyTorch、不依賴任何高階 LLM 函式庫，從 tokenizer 一路寫到 GPT-2 級別模型的預訓練、分類微調與指令微調。它不是「跑得快的訓練框架」，而是把 ChatGPT 背後的工程拆解成可在筆電上跑、可逐步閱讀的 Jupyter Notebook 教材。

### 核心架構 / 主要概念
全書 7 章 + 5 個 Appendix，每章對應一個 `chXX/` 資料夾與獨立 notebook：Ch2 文字資料處理與 BPE tokenizer、Ch3 從 self-attention 推到 multi-head attention、Ch4 拼出 GPT 模型骨架、Ch5 在未標註資料上預訓練、Ch6 文本分類微調、Ch7 instruction finetuning 並用 Ollama 評估。Appendix 涵蓋 PyTorch 入門、DDP 多卡訓練、學習率排程與 LoRA。Bonus 區更實作了 KV Cache、Grouped-Query Attention、Multi-Head Latent Attention、Sliding Window Attention、MoE，以及 Llama 3.2 / Qwen3 / Gemma 3 / Olmo 3 等近年主流架構的 from-scratch 版本，把書當作不斷迭代的「LLM 解剖手冊」維護。

### 目標使用者
具備 Python 與基本深度學習背景、想真正搞懂 LLM 內部運作的工程師與研究生。重要差異在於它不是 API 教學或 prompt 工程書，而是要求讀者親手寫出 attention、寫出 dataloader、寫出訓練迴圈。README 明示主章節程式碼設計為在一般筆電上於合理時間內跑完，有 GPU 會自動使用，門檻刻意壓低。

### 與類似專案的差異
和 [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT) 比較：nanoGPT 走「最精簡 production-ish 訓練腳本」路線，[rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) 走「逐章解構＋書本敘事」路線，章節密度與練習題遠多於 nanoGPT。和 [karpathy/build-nanogpt](https://github.com/karpathy/build-nanogpt) 同樣是教學取向，但本倉以「書 + 17 小時 Manning 影片課 + 練習題 + 30 題自測 PDF」形成完整教材生態。和 Hugging Face [huggingface/transformers](https://github.com/huggingface/transformers) 教學則完全相反——後者教你怎麼用 API，本書教你 API 底下那一層怎麼自己寫出來。作者另闢續作 [rasbt/reasoning-from-scratch](https://github.com/rasbt/reasoning-from-scratch)，從已預訓練模型出發實作 inference-time scaling、RL、distillation，可視為本書的 reasoning 模型版延伸。

### 外部評論
- [Hacker News 2024-02 討論串](https://news.ycombinator.com/item?id=39156778) 指出書中所有元件皆 from scratch 寫起，可載入 124M 到 1558M 的 GPT-2 權重，定位適合想理解內部機制而非調 API 的讀者。
- [Radical Data Science 書評（2024-12-01）](https://radicaldatascience.wordpress.com/2024/12/01/book-review-build-a-large-language-model-from-scratch/) 稱本書「將理論、實作與清晰解釋三者罕見地融合」，認為對想真懂 LLM 的人是必讀。
- [Giles Thomas 部落格 LLM from scratch 系列](https://www.gilesthomas.com/2024/12/llm-from-scratch-1) 以開發者讀書筆記形式逐章重寫程式碼，間接驗證教材可重現性。
- [Vimal Kansal 於 Medium 的深入導讀](https://medium.com/@vimalkansal/mastering-large-language-models-a-deep-dive-into-sebastian-raschkas-build-a-large-language-model-471c2c20321e) 肯定 Raschka 的教學節奏，將其與 Feynman「能造出來才算懂」的學習哲學對齊。

### Release 狀態
`gh api repos/rasbt/LLMs-from-scratch/releases --paginate` 回傳空陣列，倉內沒有任何 GitHub Release。版本治理改以書的版次、Manning 線上影片課與持續加碼的 bonus 資料夾（如 Qwen3.5、Gemma 4、KV cache、MLA 等）推進；2026-05-12 的最新 commit 推進於 main branch。`has_releases: false`，`latest_release: null`。

### 授權與社群
License 欄位為 `Other / NOASSERTION`，README 與根目錄未列標準 OSI license——程式碼採書籍配套條款，學術與個人學習使用無虞，但商用 / 衍生作品前建議直接洽詢 Manning 與作者。社群面：14,407 forks、781 watchers、Discussions 與 Q&A 區活躍，作者 Sebastian Raschka 為威斯康辛大學麥迪遜分校前統計系副教授、現任 Lightning AI Staff Research Engineer，並維護 [magazine.sebastianraschka.com](https://magazine.sebastianraschka.com/) 的 *Ahead of AI* 電子報，是教材長期更新的最主要動能。
