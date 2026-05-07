---
repo: z-lab/dflash
first_seen: 2026-05-08
last_updated: 2026-05-08
appearances: [2026-05-08]
growth_appearances: [2026-05-08]
has_releases: false
latest_release: null
tags: [LLM 基礎建設, 框架, 開源替代]
domain: LLM 基礎建設
form: 框架
themes: [開源替代]
---

# [z-lab/dflash](https://github.com/z-lab/dflash)

## 深度研究（2026-05-08 首次）

### 專案定位
[z-lab/dflash](https://github.com/z-lab/dflash) 是 UCSD Z Lab 推出的 **block diffusion 推測解碼（speculative decoding）框架**，主打「以單次平行 forward 取代 autoregressive draft head」，在不改變輸出機率分佈下做到無損 6× 級別的 LLM 推理加速，宣稱比目前 SOTA 的 [SafeAILab/EAGLE](https://github.com/SafeAILab/EAGLE) (EAGLE-3) 再快 2.5×。

### 核心架構 / 主要概念
- **draft 模型 = 輕量 block diffusion**：把 K 個位置一次填掩碼，**一次 denoise step** 同時產生整段草稿 token，省掉 EAGLE 系列的逐步自回歸成本。
- **跨層特徵注入**：從 target model 多層抽 hidden state，經 lightweight projection 融合後**注入每一層 draft 的 K/V projection 與 KV cache**，讓 draft 在整段生成過程中持續被 target 條件化。
- **drafting 成本與 token 數脫鉤**：因為是平行 forward，產生 16 token 的多層 DFlash 比 1 層 EAGLE-3 產生 8 token 還快。
- **多 backend**：原生支援 [huggingface/transformers](https://github.com/huggingface/transformers)、[sgl-project/sglang](https://github.com/sgl-project/sglang)、[vllm-project/vllm](https://github.com/vllm-project/vllm)、Apple Silicon 端的 [ml-explore/mlx](https://github.com/ml-explore/mlx)（社群另有 [Aryagm/dflash-mlx](https://github.com/Aryagm/dflash-mlx)）。
- **預訓練 draft 涵蓋**：Qwen3 / Qwen3-Coder / Qwen3.5、LLaMA-3.1、Gemma-4、MiniMax-M2.5、Kimi-K2.5 等。

### 目標使用者
- 自架 LLM serving、想把 throughput 推到無損 6× 的推理工程師；
- 已經在用 EAGLE-3、Medusa、MTP 想找 drop-in 替代的 SGLang / vLLM 使用者；
- 在 Apple Silicon 用 MLX 跑本地大模型、在意 token/s 的開發者。

### 與類似專案的差異
- 對比 [SafeAILab/EAGLE](https://github.com/SafeAILab/EAGLE)：EAGLE-3 用 lightweight autoregressive draft head；DFlash 改用 block diffusion 一次平行出 K token，宣稱 2.5× 於 EAGLE-3。
- 對比 [FasterDecoding/Medusa](https://github.com/FasterDecoding/Medusa)：Medusa 多頭預測但仍需 tree verification；DFlash 平行 drafting 結構更省一個 latency 維度。
- 對比 [vllm-project/vllm](https://github.com/vllm-project/vllm) / [sgl-project/sglang](https://github.com/sgl-project/sglang) 內建 MTP：DFlash 不是 serving engine，而是**插進這些 engine 的 draft 模組**，定位互補不互斥。

### 外部評論
- [Zhijian Liu 在 X 的發布貼文](https://x.com/zhijianliu_/status/2008394269103378795)：作者宣布 Qwen3-8B 上 6.2× 無損加速、勝 EAGLE-3 2.5×。
- [Spheron Blog: DFlash on GPU Cloud — 6x Faster LLM Inference (2026)](https://www.spheron.network/blog/dflash-block-diffusion-speculative-decoding-gpu-cloud/)：GPU 雲服務商整理 DFlash 在自家平台的部署 path。
- [InsiderLLM: DFlash vs MTP on RTX 3090](https://insiderllm.com/guides/dflash-vs-mtp-rtx-3090-head-to-head/) 第三方實測：DFlash 2.29× / EAGLE-3 1.30× 加速。
- [Kaitchup Substack: DFlash for Qwen3.5, EAGLE for Gemma 4](https://kaitchup.substack.com/p/dflash-for-qwen35-eagle-for-gemma) 比較不同 draft 系列在不同 target 模型的選型。
- [vLLM speculators 文件 - Dflash](https://docs.vllm.ai/projects/speculators/en/latest/user_guide/algorithms/dflash/)：vLLM 官方 speculators 子專案已收 DFlash 為一級 algorithm。

### Release 狀態
尚無 GitHub Release。專案以 main 分支 + arXiv 論文（[2602.06036](https://arxiv.org/abs/2602.06036)）為主要發行管道，HuggingFace 上有 [z-lab/dflash collection](https://huggingface.co/collections/z-lab/dflash) 提供預訓練 draft weight。

### 授權與社群
- **授權**：MIT。
- **規模**：3,415 stars、241 forks、33 watchers、51 open issues、4 名貢獻者。
- **主要貢獻者**：[jianc99](https://github.com/jianc99)（Jian Chen，85 commits，主要實作）、[zhijian-liu](https://github.com/zhijian-liu)（Zhijian Liu，論文與專案 PI）、[shaun0927](https://github.com/shaun0927)、[xiziqiao](https://github.com/xiziqiao)。
- 組織頁 [z-lab](https://github.com/z-lab) 對應 UCSD Z Lab，論文掛 Modal Labs 與 NVIDIA collaborator。

### 為何今日上榜
2026-05-08 首次進絕對榜 #3、stars_today 654、growth_rate 19.15%。觸發點是 5/7 作者 [@zhijianliu_](https://x.com/zhijianliu_/status/2008394269103378795) 在 X 發 release 貼文 + arXiv 論文同步上線，配合 [vLLM speculators](https://docs.vllm.ai/projects/speculators/en/latest/user_guide/algorithms/dflash/) 與 [Spheron](https://www.spheron.network/blog/dflash-block-diffusion-speculative-decoding-gpu-cloud/) 等 infra 渠道一日內背書，r/LocalLLaMA 與第三方實測同時跟進，集中流量打進 trending。

### 風險與限制
- **無 release / 無 tag**：版本管理仰賴 commit hash，下游接 SGLang / vLLM 時的版本鎖定不便。
- **draft 權重綁特定 target**：每個 target model 都需對應的 DFlash draft，目前只覆蓋熱門 Qwen / LLaMA / Gemma 系列，冷門模型仍要自己訓。
- **block diffusion 在小 batch / 短輸出情境的優勢縮水**——drafting flat cost 反而吃虧，第三方測試多落在中長輸出。
- 學術出身、社群 < 1 個月，工程穩定度與 edge case 待長期驗證。

### 觀察建議
- 觀察 [vllm-project/speculators](https://github.com/vllm-project/speculators) 與 SGLang 對 DFlash training pipeline 的整合進度（[Issue #248](https://github.com/vllm-project/speculators/issues/248)）；
- 留意是否補上 GitHub Release / changelog；
- 跟蹤 HF [z-lab/dflash collection](https://huggingface.co/collections/z-lab/dflash) 對 MiniMax / Kimi 等大模型 draft 權重的覆蓋速度；
- 比較未來 EAGLE-4 / 新 MTP 變體出現時，6× 數字是否能守住領先。
