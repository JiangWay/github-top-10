---
repo: jundot/omlx
first_seen: 2026-05-11
last_updated: 2026-05-11
appearances: [2026-05-11]
growth_appearances: [2026-05-11]
has_releases: true
latest_release: v0.3.9.dev1
tags: [LLM 基礎建設, 應用程式, 自架, 資料主權, 開源替代]
domain: LLM 基礎建設
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [jundot/omlx](https://github.com/jundot/omlx) — 深度研究

## 深度研究（2026-05-11 首次）

### 專案定位
專為 Apple Silicon 打造的 LLM 推理伺服器：在 Mac 本機跑 LLM/VLM/OCR/Embedding/Reranker，並用 macOS 選單列原生 App 統一管理。差異化主張只有一條——把長對話的 KV cache 落到 SSD，讓 Claude Code 之類的編碼代理在 Mac 上「真的可用」（TTFT 從 30–90 秒降到 1–3 秒）。

### 核心架構 / 主要概念
- **Continuous Batching**：透過 [ml-explore/mlx-lm](https://github.com/ml-explore/mlx-lm) 的 `BatchGenerator` 處理併發，預設 8 條，在 8× 併發下號稱 4.14× 提速。
- **Tiered KV Cache**：受 vLLM 啟發的 block-based 配置，含 prefix sharing 與 Copy-on-Write；Hot 層在 RAM、Cold 層以 safetensors 形式落 SSD，重啟後仍可命中。
- **API**：OpenAI 相容（`/v1/chat/completions`、`/v1/embeddings`、`/v1/rerank`）並同時支援 Anthropic Messages API（含 adaptive thinking 與視覺輸入），是 Claude Code、OpenCode、Codex 的 drop-in 後端。
- **菜單列 App**：原生 PyObjC（非 Electron），啟停伺服器、看統計、自動更新；Web `/admin` 提供模型管理、benchmark、即時 chat。
- **模型支援**：以 `--model-dir` 指向資料夾即可自動偵測，VLM 走 [Blaizzy/mlx-vlm](https://github.com/Blaizzy/mlx-vlm)，OCR 已預設 DeepSeek-OCR / DOTS-OCR / GLM-OCR 的優化 prompt。

### 目標使用者
持有 M1–M4 Mac、想完全本機跑 coding agent 的開發者。對標族群是已用 [ollama/ollama](https://github.com/ollama/ollama)、LM Studio 但被「context 一變就重新 prefill」逼瘋的人。

### 與類似專案的差異
- 對 [ollama/ollama](https://github.com/ollama/ollama)：Ollama 直到近期才以 preview 形式接 MLX；oMLX 一開始就 MLX-native，且唯一把 KV cache 落 SSD（Ollama / LM Studio 僅 in-memory，context 漂移即作廢）。
- 對 LM Studio：LM Studio 閉源、無 SSD KV、無 continuous batching；oMLX Apache-2.0 全開源。
- 對 [ml-explore/mlx-lm](https://github.com/ml-explore/mlx-lm)、`mlx-server`：兩者是 library 與簡易 server，沒有多模型 LRU、Pin、TTL、選單列管理介面。

### 外部評論
- Hacker News 的 [Show HN: oMLX – SSD-backed KV cache cuts coding agent TTFT from 90s to 1s on Mac](https://news.ycombinator.com/item?id=47247294) 把 SSD KV 視為「Apple Silicon 推理一直缺的那塊」。
- HN 後續討論 [I've jumped over to oMLX. A ton of rough edges but I think it's the future](https://news.ycombinator.com/item?id=47661697) 反映社群已開始遷移；同串有人用 M1 Max 64GB 對比 [ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)，TG 反而慢 3–7×，提醒 oMLX 的優勢偏「長 context + 快取重用」而非純 token 速度。
- Medium 的 [The Missing Piece in Apple Silicon LLM Inference Nobody Talks About](https://medium.com/@alexandru_vasile/the-missing-piece-in-apple-silicon-llm-inference-nobody-talks-about-0236a12929d4) 詳論 paged SSD cache 設計；中文圈有 [jimmysong.io 的介紹](https://jimmysong.io/ai/omlx/)。亦在 [ml-explore/mlx 官方 Discussion #3203](https://github.com/ml-explore/mlx/discussions/3203) 被列為「coding agent on Apple Silicon」推薦堆疊。

### Release 狀態
最新 stable `v0.3.8`（2026-04-30），最新 prerelease `v0.3.9.dev1`（2026-05-06，含 macOS 15 Sequoia `.dmg`）。釋出節奏密集，已累積數十個 release。

### 授權與社群
Apache-2.0、Python 為主、`main` 為預設分支。Stars 13,217、Forks 1,132、Watchers 79、Open Issues 329。維護幾乎由作者 [@jundot](https://github.com/jundot)（Jun Kim，首爾，個人簡介自稱「白天資料工程師、晚上 AI 夢想家」，亦運營 `omlx.ai`）一人推動：848 commits 對比第二名 [@latent-variable](https://github.com/latent-variable) 14 commits、[@ethannortharc](https://github.com/ethannortharc) 13 commits，顯然是強單人專案、貢獻者長尾很短。
