---
repo: supertone-inc/supertonic
first_seen: 2026-05-16
last_updated: 2026-05-16
appearances: [2026-05-16]
growth_appearances: [2026-05-16]
has_releases: true
latest_release: v2.0.0
tags: [語音與多媒體, 框架, 資料主權, 開源替代]
domain: 語音與多媒體
form: 框架
themes: [資料主權, 開源替代]
---

# [supertone-inc/supertonic](https://github.com/supertone-inc/supertonic)

> 研究日期：2026-05-16
> 研究來源：<https://github.com/supertone-inc/supertonic>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-05-16 首次）

### 專案定位

[supertone-inc/supertonic](https://github.com/supertone-inc/supertonic) 是韓國語音 AI 公司 Supertone 開源的多語 TTS（text-to-speech）系統，slogan 為 "Lightning-Fast, On-Device, Multilingual TTS — running natively via ONNX"。重點不在「最會講話」而在「夠輕、夠快、夠多語、純端側、跨語言一致」：模型約 99M 參數，透過 ONNX Runtime 跨平台部署，v3 一口氣把語言數從 v2 的 5 種擴張到 31 種，並保留 v2 相容的公開 ONNX 介面，舊整合可無痛升級。對應的官方比較對手是 Kokoro-82M 與 0.7B–2B 級開源 TTS（如 VoxCPM2），定位是「比 Kokoro 多語、比 2B 級小一個量級」。

### 作者與起源

Supertone 是 2020 年於首爾大學語音 AI 研究團隊技術衍生創立的韓國 AI 音訊新創，2022 年 10 月被 K-pop 龍頭 HYBE（BTS 經紀公司）以約 3,200 萬美元收購，[BBC/NME 報導](https://www.nme.com/news/music/bts-label-hybe-reportedly-acquires-korean-ai-voice-startup-supertone-3323788)後成為 HYBE 的 AI 音訊子公司。Supertone 過去主力產品 Supertone Play／Sona2 是商業 TTS（最高支援 23 語），曾用於 HYBE 旗下藝人 MIDNATT 的多語單曲〈Masquerade〉做跨語言 AI 合聲。

GitHub repo 於 2025-11-18 建立，主要貢獻者是 [ANLGBOY](https://github.com/ANLGBOY)（25 commits，亦為 v2.0.0 release 發佈者）、[abhimanyupandian](https://github.com/abhimanyupandian)、[juheo](https://github.com/juheo)（推測為共同創辦人之一李教國 Kyogu Lee 的 GitHub handle，未驗證）。從 commit 集中度看是少數核心工程師主導，非社群型專案。爆紅點在 2025-11 釋出與 2025 末 / 2026 初 Hacker News、Hugging Face 社群擴散，2026-05-16 首次擠進本站 GitHub Trending Top 10，當下 stars 約 5,905、forks 582。

### 核心架構 / 主要概念

技術堆疊三層：

1. **模型**：聲音 autoencoder + flow-matching 文字→latent module + Length-Aware Rotary Position Embedding（LARoPE）做文字與語音對齊，總參數約 99M。
2. **執行**：所有推論透過 [ONNX Runtime](https://onnxruntime.ai)，不綁特定深度學習框架，CPU 即可跑（不需 GPU），瀏覽器端走 onnxruntime-web（WebGPU / WASM）。
3. **介面**：repo 內附 11 種語言/runtime 的 sample 程式（按 GitHub topics：cpp、csharp、go、ios、java、nodejs、python、rust、swift、web，加上 Dart/Flutter），都是直接呼叫公開 ONNX 資產的薄殼。Repo language 比例最重的是 Swift / C++ / JavaScript / Java / C# / Dart / Go / Rust 共 7–8 種主流語言各 3–5 萬位元組，明顯是「同一模型多語言 SDK 示範」結構。

支援表達標籤 `<laugh>`、`<breath>`、`<sigh>`，內建文字正規化能處理日期縮寫（"Wed. June 23rd"）、金融金額、電話號碼、技術單位——HN 評論特別誇這點。預設 6 個（M1–M5、F1–F5，命名與來源資料略有出入需驗證）固定語者；無公開 voice cloning，2026-01 另有名為 Voice Builder 的商業/雲服務做客製音色，但**不屬於本 repo 範圍**。

### 目標使用者

從跨語言 SDK 示範密度推測，目標族群有三類：

1. **行動端與嵌入式開發者**：iOS / Android（Flutter）/ Raspberry Pi / e-reader（Onyx Boox，README 提到飛航模式下 RTF 0.3×）。重點是 CPU-only、無雲端、無 API key。
2. **瀏覽器端互動產品**：onnxruntime-web 直接在使用者瀏覽器跑，零後端成本，適合教育、有聲書、語音 UI 等場景。
3. **企業/隱私敏感場景**：法務、醫療、教育等不能把文字送雲端的情境；MIT + OpenRAIL-M 雙授權（程式碼 MIT、模型 OpenRAIL-M）允許商用但對「禁止用途」有限制（OpenRAIL-M 的 use-based restrictions）。

不適用情境：需要任意 zero-shot voice cloning、需要長文敘事級表達力、或希望單一 model 涵蓋 50+ 語言的場景，目前都不在 Supertonic 強項範圍。

### 與類似專案的差異

| 對手 | 參數量 | 語言 | 端側可行性 | 本專案的差異 |
|---|---|---|---|---|
| [hexgrad/kokoro](https://github.com/hexgrad/kokoro)（Kokoro-82M） | 82M | 英語為主 | CPU OK | Supertonic 多語（31 vs 主要 1）、附 8+ runtime SDK；Kokoro 語音表現力在 TTS Arena 仍領先英語 |
| [rhasspy/piper](https://github.com/rhasspy/piper) | <50M（依 voice 而異） | 30+ 種，逐 voice 訓練 | CPU OK | Piper 是 per-voice 模型，Supertonic 單一模型統一多語且支援表達標籤、文字正規化更強 |
| [SWivid/F5-TTS](https://github.com/SWivid/F5-TTS) / VoxCPM2 等 0.7B–2B 級 | 0.7B–2B | 多語 + zero-shot cloning | 多需 GPU | Supertonic 體積小一個量級，CPU 即可即時；不支援 zero-shot cloning |

選型建議：

- 需要瀏覽器端、行動端、e-reader、Raspberry Pi 等 CPU-only 多語 TTS → Supertonic。
- 純英文、追求最高 MOS / TTS Arena 排名 → Kokoro。
- 需要 zero-shot voice cloning、可上 GPU → F5-TTS / VoxCPM 等大模型路線。
- 已有 per-voice 訓練流程、需要極輕量 voice-per-file → Piper。

### 外部評論

- [Hacker News 主串「Supertonic: Ultra-lightweight on-device TTS model open source by Supertone」](https://news.ycombinator.com/item?id=46028650)（2025-11 發表）— 使用者 Reubend 留言：「Really impressive. I was surprised when listening to their demos how poorly their closed source competitors handled common abbreviations like 'Wed. June 23rd'.」**此串本身討論量稀薄、僅見少量留言**，資料不足以做更廣泛社群風向判斷。
- [Hugging Face 模型討論串「Great work! Better than Kokoro I think」](https://huggingface.co/Supertone/supertonic/discussions/6)（2025-11-20 起）— 多位使用者直接拿來與 Kokoro 比較：sharadcodes 寫「After kokoro I find this to be the most reliable model released」、therisingknee 寫「easily one of the best TTS models in terms of inference speed and quality」、ken107（2025-12-27）特別誇 F2 女聲「captures intonation exquisitely, and carries it across the whole text in a cohesive way」。
- [DEV Community「Open Source Project of the Day (Part 11)」（wonderlab，2024-03-09）](https://dev.to/wonderlab/open-source-project-of-the-day-part-11-supertonic-lightning-fast-on-device-multilingual-tts-50hp) — 但**此日期早於 repo 建立日 2025-11-18**，文章中 1000+ chars/sec on M1 Mac 與 5 語言的描述對應 v2 而非 v3，dev.to 的發表時間欄位**可能不正確**；引用時請當作 v2 時期描述。
- [Medium「12,164 Characters per Second — Lightning-Fast Open-Source TTS Model Is Here!」by Bytefer](https://medium.com/@bytefer/12-164-characters-per-second-lightning-fast-open-source-tts-model-is-here-96452a3dd66f) — 引用 RTX 4090 上 12,164 chars/sec、M4 Pro 上 167× realtime 的數字；屬於開發者媒體第二手轉述，未獨立驗證 benchmark。
- [Music Business Worldwide 對母公司 Supertone 的 HYBE 收購報導](https://www.musicbusinessworldwide.com/hybe-acquires-fake-voice-ai-company-supertone/) — 提供企業背景：3,200 萬美元收購、HYBE 為了把 AI 語音整合進音樂產品；非針對本 repo，但可解釋為何 Supertone 願意把核心 TTS 模型開源（猜測：商業重心已轉向 voice cloning + 客製音色，純多語 TTS 適合做開源獲取開發者）。

未見顯著 Reddit r/LocalLLaMA 主討論串，搜尋僅回傳官方頁與第三方介紹文，**Reddit 社群資料不足**。

### Release 狀態

`gh api` 顯示僅有單一 release：

- **v2.0.0** — 2026-01-06 由 [ANLGBOY](https://github.com/ANLGBOY) 發佈，無 release notes、無 release assets（只有 source tarball）。Release 反應數共 7（5 個 rocket、2 個 +1）。

README 提到 **Supertonic 3** 於 **2026-04-29** 推出（語言 5→31、PyPI `pip install supertonic`），但**並未對應到 GitHub release tag**——v3 變更顯然直接走 main branch + Hugging Face 模型版本，沒有走 GitHub release 流程。`pushed_at` 最後一次推送為 2026-05-06。`has_releases: true`（v2.0.0 存在），但 release 紀律稀疏，主要交付管道在 [Hugging Face Supertone/supertonic-3](https://huggingface.co/Supertone/supertonic-3) 與 PyPI。

時間軸推估：

- 2025-11-18：repo 建立（v1 / v2 早期版本）
- 2025-11-23：登上 [Hacker News](https://news.ycombinator.com/item?id=46028650)
- 2026-01-06：v2.0.0 release tag
- 2026-04-29：v3（README 自述，無 GitHub tag）
- 2026-05-16：首次擠進本站 GitHub Trending Top 10（5,905 stars / 582 forks）

### 授權與社群

- **License**（雙軌制）：
  - 程式碼（sample code）：MIT
  - 模型權重：OpenRAIL-M（有使用限制條款，禁止特定有害用途；商用可，但有合規責任）
  - 訓練側 PyTorch 依賴：BSD 3-Clause（未在 repo 內重新發布）
  - 著作權：© 2026 Supertone Inc.
- **量化鐵錨**（gh api 2026-05-16 抓值）：5,905 stars、582 forks、79 open issues、58 subscribers、25 commits 由首要貢獻者貢獻、Hugging Face 模型卡公開、PyPI `supertonic` package。
- **stars 增長速率**：repo 自 2025-11-18 建立至 2026-05-16，約 180 天累積 5,905 stars，平均約 33 stars/day；本日（2026-05-16）才首次擠進 Top 10 絕對榜，顯示是長尾穩定累積後的突破點，而非單日爆紅式上榜。
- **GitHub topics**：`cpp`、`csharp`、`go`、`ios`、`java`、`lightweight`、`nodejs`、`on-device`、`python`、`rust`、`swift`、`text-to-speech`、`tts`、`web`——topics 自我宣稱重點就是「跨語言 SDK + 端側」。
- **主力語言比例**：Swift 17.4% / C++ 17.3% / JavaScript 17.2% / Java 13.7% / C# 12.6% / Dart 11.0% / Go 10.8% / Rust 10.3% / Python 6.1%——前 8 名都在 10% 上下，是極不尋常的「8 種語言齊頭並進」分布，再次印證這是 SDK demo repo 而非單一語言實作。
- **配套 repo**：[supertone-inc/supertonic-py](https://github.com/supertone-inc/supertonic-py)（Python 封裝，獨立 repo）、[Hugging Face Spaces 互動 demo](https://huggingface.co/spaces/Supertone/supertonic-2)。

## 資料來源

**本體**

- GitHub repo：<https://github.com/supertone-inc/supertonic>
- Hugging Face 模型：<https://huggingface.co/Supertone/supertonic>、<https://huggingface.co/Supertone/supertonic-3>
- Hugging Face Spaces demo：<https://huggingface.co/spaces/Supertone/supertonic-2>
- 配套 Python 套件 repo：<https://github.com/supertone-inc/supertonic-py>
- 公司官網：<https://www.supertone.ai/en>

**第三方評論**

- [Hacker News 主串（id=46028650）](https://news.ycombinator.com/item?id=46028650)
- [Hugging Face 討論串 #6「Better than Kokoro」](https://huggingface.co/Supertone/supertonic/discussions/6)
- [DEV Community：wonderlab Open Source Project of the Day Part 11](https://dev.to/wonderlab/open-source-project-of-the-day-part-11-supertonic-lightning-fast-on-device-multilingual-tts-50hp)
- [Medium：12,164 Characters per Second by Bytefer](https://medium.com/@bytefer/12-164-characters-per-second-lightning-fast-open-source-tts-model-is-here-96452a3dd66f)
- [scriptbyai：Free On-Device TTS With 31-Language Support](https://www.scriptbyai.com/supertonic-free-on-device-tts/)
- [Music Business Worldwide：HYBE 收購 Supertone 報導](https://www.musicbusinessworldwide.com/hybe-acquires-fake-voice-ai-company-supertone/)
- [NME：BTS' label HYBE acquires Supertone](https://www.nme.com/news/music/bts-label-hybe-reportedly-acquires-korean-ai-voice-startup-supertone-3323788)
- [Seoulz：Supertone — Where K-Pop Meets Deep Tech](https://www.seoulz.com/supertone-where-k-pop-meets-deep-tech/)

**同類工具**

- [hexgrad/kokoro](https://github.com/hexgrad/kokoro)（Kokoro-82M，英語強項）
- [rhasspy/piper](https://github.com/rhasspy/piper)（per-voice 輕量 TTS）
- [SWivid/F5-TTS](https://github.com/SWivid/F5-TTS)（0.3B+ 級 flow-matching TTS，支援 zero-shot cloning）
- [KittenML/KittenTTS](https://github.com/KittenML/KittenTTS)（25MB CPU-only TTS，HN 同期討論對手）

## 更新紀錄
