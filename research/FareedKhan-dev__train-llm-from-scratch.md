---
repo: FareedKhan-dev/train-llm-from-scratch
first_seen: 2026-05-31
last_updated: 2026-05-31
appearances: [2026-05-31]
growth_appearances: [2026-05-31]
has_releases: false
latest_release: null
tags: [LLM 訓練, 課程教材, 開源替代]
domain: LLM 訓練
form: 課程教材
themes: [開源替代]
---

# [FareedKhan-dev/train-llm-from-scratch](https://github.com/FareedKhan-dev/train-llm-from-scratch)

## 深度研究（2026-05-31 首次）

### 專案定位

[FareedKhan-dev/train-llm-from-scratch](https://github.com/FareedKhan-dev/train-llm-from-scratch)（2,644 stars / 409 forks / 2025-01-12 建立 / MIT / Jupyter Notebook / 個人作者 [FareedKhan-dev](https://github.com/FareedKhan-dev) 主導）是一套「從下載資料到生成文字」的端到端 LLM 從零訓練教學專案：用純 PyTorch + `tiktoken` 把完整 transformer 訓練流程拆成可在**單張 GPU** 跑通的模組化腳本，配套作者在 Medium 的長文《Building a 2 Billion Parameter LLM from Scratch Using Python》。今日（2026-05-31）以 **+627 stars / growth_rate 23.71%** 首登絕對榜 #9，同時拿下**今日增長率榜 #1（增長冠軍）**——增長率為當日榜內最高，反映一波集中的單日流量灌入（多半來自社群文章或外部轉發回流，倉本身 `pushed_at` 為 2026-05-22，並非當日有大更新觸發）。

值得注意的脈絡：本倉是作者「LLM from scratch 系列」的進階作，前作 [FareedKhan-dev/create-million-parameter-llm-from-scratch](https://github.com/FareedKhan-dev/create-million-parameter-llm-from-scratch)（2.3M 參數、LLaMA 1 架構、Tiny Shakespeare 資料）產出的文字「文法不正確」，本倉把規模拉到 13M～2B 參數、改用 The Pile 大規模資料，宣稱能產出「文法與標點正確」的文字。

### 核心架構 / 主要概念

教學覆蓋從原始資料到推理的五個階段，皆以獨立腳本實作（`scripts/` 下）：

- **① 資料下載**（`scripts/data_download.py`）：抓取 The Pile 開源資料集（HuggingFace mirror `monology/pile-uncopyrighted`，全集 825 GB、含書籍／論文／程式碼等 22 個子資料集），支援最多 30 個 `.jsonl.zst` 壓縮分片（每片約 11 GB），實務上只取 5%–10% 子集訓練。
- **② 資料前處理 / Tokenizer**（`scripts/data_preprocess.py`）：用 OpenAI `tiktoken` 的 `r50k_base`（GPT-3 相容）編碼器把文字 tokenize，每段尾接 `<|endoftext|>`，編碼後存成 **HDF5** 格式（`h5py`）供高效批次讀取；詞表大小 50,304。
- **③ 模型架構**（`src/models/`）：模組化 OOP 拆成 `attention.py`（multi-head 因果遮罩注意力）/ `mlp.py`（n_embed → 4×n_embed → n_embed + ReLU 前饋層）/ `transformer_block.py`（LayerNorm + 殘差的單一 block）/ `transformer.py`（token embedding + 可學習位置 embedding + 堆疊 block + 最終線性投影到詞表）。架構直接對應《Attention is All You Need》原始 transformer，**無 MoE、無量化、無 RoPE/Flash-Attention 等現代優化**——刻意保持「教科書版」清晰度。
- **④ 訓練**（`scripts/train_transformer.py`）：Adam optimizer 的標準自迴歸語言模型訓練迴圈，超參數集中在 `config/config.py`，可一鍵在 13M 與 2B 兩種規模間切換。
- **⑤ 文字生成**（`scripts/generate_text.py`）：載入 checkpoint 做自迴歸取樣推理。
- **規模對照表**：13M 版用 `N_EMBED=128 / N_HEAD=8 / N_BLOCKS=1 / CONTEXT_LENGTH=128`，單 GPU 一天內可訓完；2B 版用 `N_EMBED=2048 / N_HEAD=16 / N_BLOCKS=64 / CONTEXT_LENGTH=512`。README 附 GPU 容量矩陣（A100 40GB ≈ 6–8B、RTX 4090 24GB ≈ 4B、T4 16GB ≈ 1.5–2B）與資料量建議（1GB→13M、5GB→2B、10GB→十億級）。
- **SFT / RLHF 附篇**：倉內另有 `sft_rlhf_guide.ipynb`（152 KB notebook）作為微調 / 對齊延伸教學，與主訓練流程分離。

### 目標使用者

想真正動手「跑通一次完整預訓練」而非只調用 API 的學生與工程師；只有單張消費級 / 雲端 GPU（T4 / 3090 / 4090）、需要在有限顯存下選擇可行模型規模的自學者；想理解 transformer 內部組件如何拼裝（attention / MLP / block）而偏好讀模組化 Python 腳本（非單一巨型 notebook）的人；以及把本倉當作 The Pile 資料管線 + HDF5 前處理範本來改寫自己訓練流程的開發者。

### 與類似專案的差異

| 專案 | 定位差異 |
|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Sebastian Raschka 的暢銷書《Build a LLM from Scratch》配套程式碼，章節化、含 17 小時影片課程、設計成筆電上可跑的小規模、覆蓋到 GPT-2 級別與後續微調，內容最完整與系統化；本倉**更輕、無書、聚焦「真的去抓 The Pile 並推到 2B 規模」的資料管線與單 GPU 顯存實務**，深度與教學完整度不及 rasbt，但更貼近「大資料集 + 較大模型」的工程落地。 |
| [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT) | Karpathy 的 nanoGPT 以極簡、可復現 GPT-2 (124M)、高效訓練為名，程式碼精煉、社群基準地位最高；本倉走「逐階段腳本拆解 + 中階教學文章」路線，可讀性導向而非性能 / 復現基準導向，且明確提供 The Pile 下載與 HDF5 前處理（nanoGPT 預設用 OpenWebText / Shakespeare 範例）。 |
| [FareedKhan-dev/create-million-parameter-llm-from-scratch](https://github.com/FareedKhan-dev/create-million-parameter-llm-from-scratch) | 同作者前作，2.3M 參數、LLaMA 1 架構、Tiny Shakespeare，產出文字文法不通；本倉為其放大升級版（13M–2B、The Pile、標準 transformer）。 |

差異化關鍵：本倉的賣點不是「最完整」或「最快」，而是**把「下載真實大規模資料集 → HDF5 前處理 → 單 GPU 顯存規模選擇 → 推到 2B 參數」這條工程實務鏈條，用模組化腳本（非單檔 notebook）走一遍**，並有一篇 step-by-step Medium 長文當入口；它在 rasbt（教科書系統化）與 nanoGPT（極簡高效基準）之間，佔據「中階、實務、資料管線導向」的生態位。

### 外部評論

- 作者本人於 [DEV Community《Train LLM From Scratch》](https://dev.to/fareedkhan557/train-llm-from-scratch-2jje) 發表對應教學文，為主要自宣傳播管道。
- 配套 Medium 長文 [《Building a 2 Billion Parameter LLM from Scratch Using Python》](https://medium.com/@fareedkhandev/building-a-2-billion-parameter-llm-from-scratch-using-python-1325cb05d6fb)（即 repo homepage），是本倉的主要敘事與導流來源。
- 第三方延伸文 [BuildShift《Training your own 2B-parameter LLM from scratch and why it actually makes sense》Medium](https://medium.com/@BuildShift/training-your-own-2-b-parameter-llm-from-scratch-and-why-it-actually-makes-sense-667b30432f87) 圍繞同一主題討論自訓 2B 模型的動機。
- HN / Reddit（r/MachineLearning、r/LocalLLaMA）：截至撰寫**未發現針對本倉的顯著主流社群討論串**；搜尋結果多為 repo 本體與作者系列倉的其他作品，未見集中長文評論。今日的暴增增長率（+627 / 23.71%）較可能來自社群文章 / 列表轉發的單日回流，而非某條高熱度討論貼。

### Release 狀態

**尚無 GitHub Release**（`has_releases: false`、release 數為 0）。屬典型教學倉，版本管理走 main 分支直接更新而非打 tag；最近一次推送 `pushed_at` 為 2026-05-22。

### 授權與社群

- **授權**：MIT（寬鬆，可自由改寫教學 / 衍生）。
- **貢獻結構**：個人主導——[FareedKhan-dev](https://github.com/FareedKhan-dev)（22 commits 作者）+ [TianyiQ](https://github.com/TianyiQ)（19 commits，主要外部貢獻者）為兩大主力，其餘 [eltociear](https://github.com/eltociear)、[Jah-yee](https://github.com/Jah-yee)、[its-not-rocket-science](https://github.com/its-not-rocket-science)、[konglingfan](https://github.com/konglingfan) 各 1 commit 為零星 PR；典型「作者 + 1 協作者 + 少量社群修補」結構。
- **量化指標**：2,644 stars / **409 forks**（fork 比例約 15.5%，對教學倉而言偏高，反映學習者實際 clone 改寫跑訓練）/ 5 open issues / 倉體積僅 85 KB（純腳本 + notebook，無資料）。
- **Topics**：`gemini`、`large-language-models`、`llm`、`openai`、`training`、`transformers` 共 6 個。
- **Homepage**：指向作者 Medium 文章而非獨立網站。

## 資料來源

**本體**
- Repo：<https://github.com/FareedKhan-dev/train-llm-from-scratch>
- README：<https://github.com/FareedKhan-dev/train-llm-from-scratch/blob/main/README.md>
- Releases（空）：<https://github.com/FareedKhan-dev/train-llm-from-scratch/releases>
- 配套 Medium 文章 / homepage：<https://medium.com/@fareedkhandev/building-a-2-billion-parameter-llm-from-scratch-using-python-1325cb05d6fb>

**作者其他相關倉與外部評論**
- [DEV Community《Train LLM From Scratch》](https://dev.to/fareedkhan557/train-llm-from-scratch-2jje)
- [BuildShift《Training your own 2B-parameter LLM from scratch》Medium](https://medium.com/@BuildShift/training-your-own-2-b-parameter-llm-from-scratch-and-why-it-actually-makes-sense-667b30432f87)
- [FareedKhan-dev/create-million-parameter-llm-from-scratch](https://github.com/FareedKhan-dev/create-million-parameter-llm-from-scratch)
- [FareedKhan-dev/train-tiny-llm](https://github.com/FareedKhan-dev/train-tiny-llm)

**對比專案**
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)
- [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT)
