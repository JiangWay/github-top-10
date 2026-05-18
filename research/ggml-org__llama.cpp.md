---
repo: ggml-org/llama.cpp
first_seen: 2026-05-19
last_updated: 2026-05-19
appearances: [2026-05-19]
growth_appearances: [2026-05-19]
has_releases: true
latest_release: b9216
tags: [LLM 基礎建設, Kernel, 開源替代, 自架, 資料主權]
domain: LLM 基礎建設
form: Kernel
themes: [開源替代, 自架, 資料主權]
---

## 深度研究（2026-05-19 首次）

### 專案定位

[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) 是 Georgi Gerganov 在 2023 年 3 月發起的 **C/C++ 大語言模型推理引擎**，README 自我定位為「LLM inference in C/C++」。它是整個 `ggml` 張量計算函式庫的旗艦載體，也是 GGUF 量化模型格式的事實標準實作。Wikipedia 將其稱為「[the reference implementation](https://en.wikipedia.org/wiki/Llama.cpp)」——下游從 [ollama/ollama](https://github.com/ollama/ollama)、LM Studio、KoboldCpp 到 Hugging Face 的 GGUF 生態都圍繞這顆引擎生長。2026 年 2 月 ggml 與 llama.cpp 核心團隊正式加入 Hugging Face，repo 主導權移交給 `ggml-org` 組織，[ggerganov](https://github.com/ggerganov) 仍以 1,755 次貢獻穩居榜首維護者。

### 核心架構 / 主要概念

- **ggml 張量函式庫**：純 C 實作的張量計算核心，無外部依賴
- **GGUF 模型格式**：支援 1.5-bit / 2-bit / 3-bit / 4-bit / 5-bit / 6-bit / 8-bit 整數量化
- **多後端 Kernel**：Apple Metal、CUDA、HIP（AMD ROCm）、SYCL（Intel）、Vulkan、OpenCL、CANN（Ascend NPU）、IBM zDNN、WebGPU、RPC，幾乎涵蓋所有商用加速器
- **`llama-server`**：OpenAI API 相容 HTTP server，內建 multiuser 並行解碼、speculative decoding、grammar (GBNF) 約束輸出、embedding／reranking 端點
- **`llama-cli`**：對話模式與補全的命令列工具

### 目標使用者

端側／邊緣推理工程師、嵌入式裝置開發者、想離線跑模型的個人玩家，以及把它當底層引擎包裝的下游框架作者（[ollama/ollama](https://github.com/ollama/ollama) 即是 llama.cpp 的 Go wrapper）。

### 與類似專案的差異

- vs. [vllm-project/vllm](https://github.com/vllm-project/vllm)：vLLM 主打 GPU 集群 + PagedAttention 高吞吐量，VRAM 需求較高；llama.cpp 主打 CPU／Apple Silicon／低 VRAM 邊緣端可用性。[aimadetools 對比](https://www.aimadetools.com/blog/vllm-vs-ollama-vs-llamacpp-vs-tgi/) 直言「llama.cpp is the reference implementation」。
- vs. [ollama/ollama](https://github.com/ollama/ollama)：Ollama 是 llama.cpp 的封裝層，提供 Docker-like UX；llama.cpp 是真正幹活的引擎。
- vs. [huggingface/transformers](https://github.com/huggingface/transformers)：Transformers 是 Python 訓練／推理通用框架；llama.cpp 純 C/C++ 專注推理且支援極端量化。

### 外部評論

- [Contra Collective 2026 評測](https://contracollective.com/blog/llama-cpp-vs-mlx-ollama-vllm-apple-silicon-2026) 將 llama.cpp 列為 Apple Silicon 上「最具可攜性」的選項。
- [Best GPU for LLM 2026 對比](https://bestgpuforllm.com/articles/ollama-vs-llama-cpp-vs-vllm/) 認為「llama.cpp runs on virtually everything: Apple Silicon, CUDA GPUs, ROCm, Vulkan, and CPU-only」。
- [Hugging Face 官方公告](https://huggingface.co/blog/ggml-joins-hf) 2026 年 2 月宣布 GGML 與 llama.cpp 加入 HF，定調為「ensure the long-term progress of Local AI」，是本專案組織層級最大事件。

### Release 狀態

採用 CI 自動化標籤策略，5-18 一天連發 [b9204、b9208、b9209、b9213、b9216](https://github.com/ggml-org/llama.cpp/releases) 共 5 個 release。最新 `b9216` 於 2026-05-18 18:23 UTC 發佈，預編譯 CUDA 12.4 Windows binary 已隨附。版號採單調遞增 build 編號而非 SemVer。

### 授權與社群

MIT 授權；fork 數 18,361、watcher 710、open issues 1,680、貢獻者前 5 名為 [ggerganov](https://github.com/ggerganov) (1,755)、[ngxson](https://github.com/ngxson) (440)、[JohannesGaessler](https://github.com/JohannesGaessler) (373)、[slaren](https://github.com/slaren) (362)、[CISC](https://github.com/CISC) (277)，呈現「單一 BDFL + 多後端專責 maintainer」的健康分工。
