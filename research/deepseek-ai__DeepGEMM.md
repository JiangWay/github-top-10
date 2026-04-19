---
repo: deepseek-ai/DeepGEMM
first_seen: 2026-04-19
last_updated: 2026-04-19
appearances: [2026-04-19]
growth_appearances: [2026-04-19]
has_releases: true
latest_release: nv_dev_4ff3f54
tags: [LLM 基礎建設, Kernel]
domain: LLM 基礎建設
form: Kernel
---

# [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM)

> 研究日期：2026-04-19
> 研究來源：<https://github.com/deepseek-ai/DeepGEMM>
> 觸發原因：首次上絕對榜（當日排名 #5）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM) 是 [DeepSeek-AI](https://github.com/deepseek-ai) 開源的 **FP8 / FP4 / BF16 tensor-core GEMM kernel 函式庫**，專為 Hopper（SM90）與 Blackwell（SM100）設計，以 fine-grained scaling 取代 per-tensor 量化，並把 dense GEMM、MoE grouped GEMM、Mega MoE 通訊融合、MQA 索引等 LLM 訓練核心算子收斂在一份「單一核心 kernel 約 300 行」的 CUDA codebase 裡——標榜「clean as a tutorial, fast as a production kernel」。

## 作者與起源

本專案由 DeepSeek-AI 官方於 **2025-02-13** 建立，作為 **Open-Source Week Day 3**（2025-02-26）正式公開的三件套之一，緊接在 [deepseek-ai/FlashMLA](https://github.com/deepseek-ai/FlashMLA) 與 [deepseek-ai/DeepEP](https://github.com/deepseek-ai/DeepEP) 之後釋出。主要維護者為 DeepSeek 基礎設施組的 **LyricZhao**（GitHub [LyricZhao](https://github.com/LyricZhao)，98 commits）與 **RayWang96**（12 commits），contributor 名單中亦出現 vLLM 維運方 [simon-mo](https://github.com/simon-mo) 與 SGLang 核心開發者 [zhyncs](https://github.com/zhyncs)，顯示它已直接進入推理框架供應鏈。DeepGEMM 在 DeepSeek-V3 技術報告中被作為「全網第一個大規模部署 FP8 訓練」的關鍵支撐，2025 年初隨 DeepSeek-V3/R1 爆紅被大量引用，截至 2026-04-19 累積 **6,489 stars / 874 forks / 63 open issues**。

## 核心架構 / 主要概念

- **語言與工具鏈**：99% CUDA，Python 綁定做 JIT 派送；需 CUDA 12.3+（SM90，12.9+ 建議）或 12.9+（SM100）、PyTorch 2.1+。
- **JIT-only 安裝**：沒有 `.so` 預編譯，所有 kernel 於首次呼叫時在 Python 端 runtime 編譯、快取；這讓不同 shape / dtype / scale layout 都能針對 problem size 產生最貼合的 kernel。
- **Fine-grained scaling**：SM90 用 FP32 scale（TMA-aligned、transposed）、SM100 用 UE8M0（4 值 packed in int32），把量化粒度降到 block 等級，搭配 **CUDA-core two-level accumulation（promotion）** 補償 FP8 tensor core 累加誤差。
- **算子集合**：normal dense GEMM、MoE contiguous-layout grouped GEMM（僅 M 軸 group、N/K 固定）、MoE masked-layout GEMM、**Mega MoE** 把 expert dispatch → linear → SwiGLU → combine 與 NVLink 通訊 overlap、**MQA scoring kernel**（為 V3.2 lightning indexer 設計）、HyperConnection 等。
- **量化鐵錨**：單一核心 kernel 約 300 行；H800 實測達 **1,350–1,550 FP8 TFLOPS** peak。

## 設計哲學

> "DeepGEMM is designed for simplicity, with only one core kernel function comprising around ~300 lines of code. This makes it a clean and accessible resource for learning Hopper tensor-core and FP8 GEMM optimization techniques."

譯：刻意把程式碼量壓到「教科書」尺度——不堆疊 CUTLASS 那種多層 template metaprogramming，也不依賴 CuTe 的 algebra，寧願把 TMA / WGMMA 指令直白展開，讓學習者可以逐行讀懂；但在多數 shape 上仍要贏過 cuBLAS / CUTLASS。這呼應 DeepSeek 一貫「用可讀的研究代碼揭露生產級秘方」路線，與 FlashMLA、DeepEP 是同一哲學。

## 目標使用者與適用情境

- **LLM 訓練框架作者**：[NVIDIA/Megatron-LM](https://github.com/NVIDIA/Megatron-LM)、[deepspeedai/DeepSpeed](https://github.com/deepspeedai/DeepSpeed)、[sgl-project/sglang](https://github.com/sgl-project/sglang)、[vllm-project/vllm](https://github.com/vllm-project/vllm) 已在 benchmark / 整合層引用 DeepGEMM kernel。
- **MoE 推理引擎**：對「experts 同 shape、batch 維度拼接」的 grouped GEMM 有原生支援，省掉自行實作 masked MoE 的成本。
- **Kernel 工程師 / 教學者**：想讀 Hopper TMA + WGMMA + FP8 scaling 實作的最短路徑。
- **不適用情境**：非 NVIDIA 硬體、SM80（Ampere）以下、需要任意 N/K 可變的 grouped GEMM、或需要 CUTLASS epilogue fusion 生態的場景——DeepGEMM 刻意不做 template 泛化。

## 與類似專案的差異

點名兩個直接競品：NVIDIA 官方的 [NVIDIA/cutlass](https://github.com/NVIDIA/cutlass)（template 式 CUDA GEMM 框架）與 cuBLAS（NVIDIA 閉源數學庫）。

| 對手 | DeepGEMM 的差異 |
|---|---|
| [NVIDIA/cutlass](https://github.com/NVIDIA/cutlass) | CUTLASS 靠 C++ template / CuTe algebra 泛化所有 shape；DeepGEMM 改用 JIT 對每個 shape 產生專屬 kernel。官方自述標準 GEMM 上比 CUTLASS 快 **1.4–2.7×**，MoE GEMM 快 1.1–1.3×。代價是 N/K 必須固定、不支援任意 epilogue fusion。 |
| cuBLAS（閉源） | cuBLAS 為黑盒、對 FP8 fine-grained scaling 與 MoE grouped GEMM 支援有限；DeepGEMM 開源可讀、原生支援 block-level scaling，且專門為 DeepSeek-V3 的 `(M, N, K)` 分佈調優。 |
| [Dao-AILab/flash-attention](https://github.com/Dao-AILab/flash-attention) 的 FP8 GEMM 分支 | Flash-Attention 聚焦 attention；DeepGEMM 聚焦 GEMM / MoE，兩者在 V3.2 indexer 上互補而非競爭。 |

**何時選誰**：要泛化任意 shape / epilogue → CUTLASS；要閉源穩定 baseline → cuBLAS；要 Hopper+FP8+MoE 的極致吞吐且能接受 N/K 固定 → DeepGEMM。

## 外部評論

- [Hacker News 討論串（2025-02-27）](https://news.ycombinator.com/item?id=43179478)：社群對「300 行打敗 CUTLASS」反應熱烈，留言聚焦在 JIT 編譯時間、是否能移植 AMD / Intel、以及 DeepSeek 是否會持續維護。
- [xyzlabs Substack — DeepGEMM: DeepSeek Unveils High-Performance Matrix Multiplication Library](https://xyzlabs.substack.com/p/deepgemm-deepseek-unveils-high-performance)：把 DeepGEMM 定位為 Open-Source Week 的「技術核彈」，稱其「對 MoE 訓練生態的衝擊等同 FlashAttention 對 attention」。
- [DEV Community — DeepSeek Open Source Week Day 3: DeepGEMM](https://dev.to/apilover/deepseek-open-source-week-day-3-deepgemm-1h0)：拆解 two-level accumulation 技巧，指出這是 FP8 訓練能跑到 BF16 精度的關鍵。
- [Analytics Vidhya — DeepGEMM Released on Day 3 of DeepSeek Open Source Week](https://www.analyticsvidhya.com/blog/2025/02/deepseek-deepgemm/)：整理效能表，列出 1.4–2.7× speedup 對應的 M/N/K 區間。
- [vLLM benchmark 文件](https://github.com/vllm-project/vllm/blob/main/benchmarks/kernels/deepgemm/README.md)：vLLM 官方將 DeepGEMM 納入 FP8 kernel benchmark 套件，視為 CUTLASS 之外的必比對照組。
- [DeepSeek 官方 X 發文](https://x.com/deepseek_ai/status/1894553164235640933)：「Up to 1350+ FP8 TFLOPS on Hopper GPUs, no heavy dependency, as clean as a tutorial, fully Just-In-Time compiled.」
- [OpenReview — Towards Fully FP8 GEMM LLM Training at Scale](https://openreview.net/forum?id=KYTFXxTJ12)：學術端延伸，引用 DeepGEMM 作為 fully-FP8 訓練可行性的實證基線。

## Release 狀態 / 時間軸

- **2025-02-13**：repo 建立。
- **2025-02-26**：Open-Source Week Day 3 正式公開，初版即達 1350+ FP8 TFLOPS。
- **2025-10-14 ~ 2025-10-15**：`v2.1.1` → `v2.1.1.post3` 連發三個 patch，修 Blackwell 相容與 MoE masked layout bug。
- **2026-01-05**：最新 release [`nv_dev_4ff3f54`](https://github.com/deepseek-ai/DeepGEMM/releases/tag/nv_dev_4ff3f54)（non-prerelease，但標籤顯示為 NVIDIA 合作的開發分支快照）。
- 共 **6 個 releases**，一年節奏約每季一版加一批 hotfix。

## 授權與社群

- **License**：MIT。
- **Stars / Forks / Issues**：6,489 / 874 / 63 open（2026-04-19 擷取），自 2025-02 釋出以來約 14 個月累積 6.5k stars，平均 ~460 stars/月；但多數增長集中於 Open-Source Week 首週與 DeepSeek-V3.2 發布窗口。
- **主要語言**：Cuda（主體）+ Python（JIT 派送層）。
- **Contributors**：首頁 API 回傳 30+ 人，核心仍是 [LyricZhao](https://github.com/LyricZhao)（98）+ [RayWang96](https://github.com/RayWang96)（12）+ [zheanxu](https://github.com/zheanxu)（9）+ [soundOfDestiny](https://github.com/soundOfDestiny)（8）+ [ko3n1g](https://github.com/ko3n1g)（8，NVIDIA Megatron-LM 維護者）。
- **下游整合**：[vllm-project/vllm](https://github.com/vllm-project/vllm)、[sgl-project/sglang](https://github.com/sgl-project/sglang)、[NVIDIA/Megatron-LM](https://github.com/NVIDIA/Megatron-LM) 皆已引用或 benchmark 對齊；當日 growth_rate 僅 0.48%，顯示已進入「低增速高總量」的基建階段。

## 資料來源

### 本體
- [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM)
- [Release `nv_dev_4ff3f54`](https://github.com/deepseek-ai/DeepGEMM/releases/tag/nv_dev_4ff3f54)
- [DeepSeek 官方公告（X）](https://x.com/deepseek_ai/status/1894553164235640933)
- [deepseek-ai/open-infra-index](https://github.com/deepseek-ai/open-infra-index)

### 第三方評論
- [Hacker News 討論串](https://news.ycombinator.com/item?id=43179478)
- [xyzlabs Substack 專文](https://xyzlabs.substack.com/p/deepgemm-deepseek-unveils-high-performance)
- [DEV Community 技術拆解](https://dev.to/apilover/deepseek-open-source-week-day-3-deepgemm-1h0)
- [Analytics Vidhya 報導](https://www.analyticsvidhya.com/blog/2025/02/deepseek-deepgemm/)
- [aibase 新聞](https://www.aibase.com/news/15722)
- [OpenReview — Towards Fully FP8 GEMM LLM Training at Scale](https://openreview.net/forum?id=KYTFXxTJ12)

### 同類工具
- [NVIDIA/cutlass](https://github.com/NVIDIA/cutlass)
- [Dao-AILab/flash-attention](https://github.com/Dao-AILab/flash-attention)
- [deepseek-ai/FlashMLA](https://github.com/deepseek-ai/FlashMLA)
- [deepseek-ai/DeepEP](https://github.com/deepseek-ai/DeepEP)
- [vllm-project/vllm DeepGEMM benchmark](https://github.com/vllm-project/vllm/blob/main/benchmarks/kernels/deepgemm/README.md)

## 更新紀錄
