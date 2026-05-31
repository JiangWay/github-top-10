---
repo: OpenBMB/VoxCPM
first_seen: 2026-05-31
last_updated: 2026-05-31
appearances: [2026-05-31]
growth_appearances: [2026-05-31]
has_releases: true
latest_release: 2.0.3
tags: [語音與多媒體, 框架, 自架, 資料主權, 開源替代]
domain: 語音與多媒體
form: 框架
themes: [自架, 資料主權, 開源替代]
---

# [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM)

## 深度研究（2026-05-31 首次）

### 專案定位

[OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM)（23,182 stars / 2,701 forks / 2025-09-16 建立約 8.5 個月 / Apache-2.0 / 100% Python / PyTorch）是清華系開源組織 [OpenBMB](https://github.com/OpenBMB)（MiniCPM、ChatDev、AgentVerse、XAgent 的母組織，與面壁智慧 ModelBest 同源）推出的**tokenizer-free 多語 TTS（文字轉語音）模型與框架**。今日以 +639 stars / growth_rate 2.76% 首登絕對榜 #7，是本站近期少見的「大廠級基礎模型 repo」上榜——非工具或 wrapper，而是一個 2B 參數的自研語音生成模型。

`README` 標題已切換為「VoxCPM2」，但 repo slug 仍是 VoxCPM。版本軸清晰：初代 [VoxCPM-0.5B](https://huggingface.co/openbmb/VoxCPM-0.5B)（2025-09 隨 [arXiv 2509.24650](https://arxiv.org/abs/2509.24650) 論文發表，0.5B、中英雙語）→ [VoxCPM 1.5](https://github.com/OpenBMB/VoxCPM/releases/tag/1.5.0)（2025-12-05，0.6B）→ [VoxCPM 2](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.0)（2026-04-06）的 **2B 參數、30 語言、48kHz、新增 Voice Design** 大改版。今日上榜的明顯動因是 VoxCPM2 的版本擴張（參數翻 3-4 倍、語言從 2 種跳到 30 種）持續發酵，疊加 5-11 的 [v2.0.3](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.3) 補強。

### 核心架構 / 主要概念

- **Tokenizer-free 連續空間建模（核心賣點）**：主流 TTS（如 [SWivid/F5-TTS](https://github.com/SWivid/F5-TTS) 之外的多數 codec-based 系統）先把語音壓成離散 token 再建模，量化會引入 artifact、損失細節。VoxCPM 直接在 **AudioVAE V2 的連續 latent 空間**生成語音表徵，繞過離散 codec，論文主張可避免量化失真、保留更細的音色與韻律。
- **end-to-end diffusion-autoregressive 架構**：結合自回歸（AR）骨幹與 diffusion 解碼。VoxCPM2 的四段 pipeline 為 **LocEnc → TSLM → RALM → LocDiT**（局部編碼 → 文字-語音語言模型 → 殘差聲學語言模型 → 局部 diffusion transformer）。
- **MiniCPM-4 骨幹 + 隱式語意-聲學解耦**：以 OpenBMB 自家 [MiniCPM](https://github.com/OpenBMB/MiniCPM) 為語言骨幹；初代論文以 hierarchical language modeling + FSQ 約束達成「語意與聲學的隱式解耦」，使模型能由上下文推斷恰當韻律。
- **三種語音能力**：(1) **Voice Design**——僅憑自然語言描述（如 `(A young woman, gentle voice)文字`）無需參考音檔即生成新音色；(2) **Controllable Cloning**——短參考片段複製音色，並可加 style guidance 調情緒/語速；(3) **Ultimate Cloning**——參考音檔＋逐字稿做無縫續寫，重現音色/節奏/情緒。
- **模型規模與部署**：2B 參數、48kHz 錄音室級輸出、約 8GB VRAM、訓練語料逾 200 萬小時多語語音。RTF 約 0.3（RTX 4090），接 [Nano-vLLM](https://github.com/GeeeekExplorer/nano-vllm) 加速可達 ~0.13，並支援 vLLM-Omni 的 OpenAI 相容 serving 端點。
- **30 語言 + 9 種中文方言**：阿拉伯、緬甸、中、丹麥、荷蘭、英、芬蘭、法、德、希臘、希伯來、印地、印尼、義、日、高棉、韓、寮、馬來、挪威、波蘭、葡、俄、西、史瓦希里、瑞典、塔加洛、泰、土耳其、越南；中文方言含四川、粵、吳、東北、河南、陝西、山東、天津、福建。
- **可微調**：支援 SFT 與 LoRA fine-tuning，[v2.0.3](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.3) 專門補了 fine-tuning validation 與 streaming 穩定性。

### 目標使用者

需要自架、商用可用（Apache-2.0）TTS 而不想付 ElevenLabs / OpenAI TTS 雲端費用的開發者與產品團隊；做有聲書、影片配音、podcast、虛擬主播的多語內容創作者（Voice Design 免參考音檔即造音色）；隱私/資料主權敏感、要把語音生成留在本地或私有雲的企業；TTS / 語音合成研究者（連續空間、tokenizer-free 路線的開源 SOTA 參考實作 + 論文 + 可微調權重）；以及做 30 語言國際化語音產品、需單一模型覆蓋多語的團隊。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [fishaudio/fish-speech](https://github.com/fishaudio/fish-speech) | fish-speech 走 codec/離散 token 路線、生態成熟、社群大；VoxCPM 走 tokenizer-free 連續 latent，主打無量化失真 + Voice Design 純文字造音色 |
| [SWivid/F5-TTS](https://github.com/SWivid/F5-TTS) | F5-TTS 為 flow-matching diffusion、學界引用高；VoxCPM 為 diffusion-AR 混合 + MiniCPM 語言骨幹，強在 30 語言廣度與上下文韻律推斷 |
| [coqui-ai/TTS](https://github.com/coqui-ai/TTS)（XTTS） | Coqui 公司已解散、專案進入社群維護停滯期；VoxCPM 為 2025-2026 活躍大廠 repo，模型規模與語言數遠超 XTTS v2 |
| [ElevenLabs](https://elevenlabs.io/) / OpenAI TTS | 閉源雲端 API、按量計費、資料上雲；VoxCPM 開源 Apache-2.0、可完全本地自架、權重免費商用 |
| [FunAudioLLM/CosyVoice](https://github.com/FunAudioLLM/CosyVoice)（阿里） | 同為中國大廠 SOTA 開源 TTS、走 token-based supervised semantic codec；VoxCPM 以 tokenizer-free 連續空間區隔，且綁 OpenBMB MiniCPM 生態 |

差異化關鍵：在開源 TTS 中**少數同時做到「tokenizer-free 連續空間 + 2B 規模 + 30 語言 + 純文字 Voice Design + Apache-2.0 商用 + 完整論文/可微調」**的模型，並背靠 MiniCPM 大模型生態。

### 外部評論

社群長文討論（Reddit r/LocalLLaMA / Hacker News）以 WebSearch 未能直接檢索到顯著主流串——**目前未發現密集的英文社群長文討論**，傳播主要靠論文、開發者聚合站與第三方教學/工具導覽頁回流。已找到的來源如下：

- [arXiv 2509.24650《VoxCPM: Tokenizer-Free TTS for Context-Aware Speech Generation and True-to-Life Voice Cloning》](https://arxiv.org/abs/2509.24650)：初代官方論文，闡述 tokenizer-free 連續空間建模、MiniCPM-4 骨幹、hierarchical LM + FSQ 隱式解耦，宣稱在開源系統中達 zero-shot TTS SOTA（[HTML 版](https://arxiv.org/html/2509.24650v1)）
- [openbmb.github.io VoxCPM2 Demo Page](https://openbmb.github.io/voxcpm2-demopage/)：官方音訊樣本展示頁（初代為 [VoxCPM-demopage](https://openbmb.github.io/VoxCPM-demopage/)）
- [Hugging Face Space: OpenBMB/VoxCPM-Demo](https://huggingface.co/spaces/OpenBMB/VoxCPM-Demo)：官方線上試玩 playground
- [daily.dev 收錄頁](https://app.daily.dev/posts/3rbjtynfg)：開發者聚合站轉錄本 repo，反映在開發者社群有曝光
- [AIToolly《VoxCPM2 Unveiled: A Tokenizer-Free TTS System》（2026-04-14）](https://aitoolly.com/ai-news/article/2026-04-14-voxcpm2-unveiled-a-tokenizer-free-text-to-speech-system-supporting-multilingual-generation-and-reali)：第三方 AI 新聞站對 VoxCPM2 發布的介紹
- [sonusahani.com《VoxCPM: Free TTS Model Cloning Voices and Speaking 30 Languages》](https://sonusahani.com/blogs/voxcpms-tts-model)：第三方教學/評介
- 第三方衍生站 [voxcpm.space](https://voxcpm.space/)、[voxtral-tts.org/voxcpm2](https://voxtral-tts.org/en/voxcpm2)：以本模型為名的線上試用/導流頁，顯示已有人圍繞它做 hosted 包裝

### Release 狀態

`has_releases: true`，最新 [v2.0.3](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.3)（2026-05-11，fine-tuning validation + runtime 穩定性 + streaming 改進）。共 14 個 release，主軸：[2.0.3](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.3)（5-11）← [2.0.2](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.2)（4-08 bugfix）← [2.0.1](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.1)（4-08 移除參考音檔 auto-trim）← [VoxCPM 2.0.0](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.0)（4-06 大改版：2B / 30 語言 / Voice Design）← [1.5.0](https://github.com/OpenBMB/VoxCPM/releases/tag/1.5.0)（2025-12-05）← 1.0.x 系列（2025-09 至 10）。repo `pushed_at` 為 2026-05-22，main 分支仍活躍。

### 授權與社群

- **授權**：Apache-2.0（權重與程式碼皆免費商用）
- **組織背景**：[OpenBMB](https://github.com/OpenBMB)（Open Lab for Big Model Base，清華大學 NLP 實驗室與面壁智慧 ModelBest 系）；旗下 [MiniCPM](https://github.com/OpenBMB/MiniCPM)、[ChatDev](https://github.com/OpenBMB/ChatDev)、[AgentVerse](https://github.com/OpenBMB/AgentVerse)、[XAgent](https://github.com/OpenBMB/XAgent) 皆為高 star 專案，組織信譽強
- **貢獻結構**：[Labmem-Zhouyx](https://github.com/Labmem-Zhouyx)（25 commits 主力）+ [liuxin99](https://github.com/liuxin99)（13）+ [a710128](https://github.com/a710128)（12）+ [VoxInstruct](https://github.com/VoxInstruct)（11）為核心；[v2.0.0 release notes](https://github.com/OpenBMB/VoxCPM/releases/tag/2.0.0) 顯示已收進多名外部社群 PR（dataset 計算優化、torchcodec 依賴、CLI 參數驗證等），屬「研究團隊核心 + 活躍社群 PR」結構
- **量化指標**：23,182 stars / **2,701 forks**（fork 比例 11.6%，對基礎模型 repo 屬高，反映大量本地微調/部署）/ 107 open issues
- **Homepage / Topics**：官網 <https://voxcpm.com>；topics 含 `tts`、`text-to-speech`、`voice-cloning`、`voice-design`、`multilingual`、`minicpm`、`speech-synthesis`、`pytorch` 等 14 個
- **資源**：文件 <https://voxcpm.readthedocs.io/>；`pip install voxcpm` 一行安裝；權重於 HuggingFace（`openbmb/VoxCPM2`）與 ModelScope 雙托管

## 資料來源

**本體**
- Repo：<https://github.com/OpenBMB/VoxCPM>
- 官網：<https://voxcpm.com>
- 文件：<https://voxcpm.readthedocs.io/>
- Releases：<https://github.com/OpenBMB/VoxCPM/releases>
- HuggingFace 初代權重：<https://huggingface.co/openbmb/VoxCPM-0.5B>
- HuggingFace Demo Space：<https://huggingface.co/spaces/OpenBMB/VoxCPM-Demo>
- 官方音訊樣本頁：<https://openbmb.github.io/voxcpm2-demopage/>

**論文與外部評論**
- [arXiv 2509.24650 論文](https://arxiv.org/abs/2509.24650) / [HTML 版](https://arxiv.org/html/2509.24650v1)
- [daily.dev 收錄頁](https://app.daily.dev/posts/3rbjtynfg)
- [AIToolly《VoxCPM2 Unveiled》](https://aitoolly.com/ai-news/article/2026-04-14-voxcpm2-unveiled-a-tokenizer-free-text-to-speech-system-supporting-multilingual-generation-and-reali)
- [sonusahani.com 評介](https://sonusahani.com/blogs/voxcpms-tts-model)
- 第三方衍生站：[voxcpm.space](https://voxcpm.space/)、[voxtral-tts.org/voxcpm2](https://voxtral-tts.org/en/voxcpm2)
