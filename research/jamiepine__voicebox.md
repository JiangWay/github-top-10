---
repo: jamiepine/voicebox
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]
growth_appearances: [2026-04-18]
has_releases: true
latest_release: v0.4.0
---

# [jamiepine/voicebox](https://github.com/jamiepine/voicebox)

## 深度研究（2026-04-18 首次）

### 專案定位
[jamiepine/voicebox](https://github.com/jamiepine/voicebox) 自我定位為「The open-source voice synthesis studio」，是一款 local-first、完全在本機執行的語音合成與語音克隆工作站，被社群普遍視為 ElevenLabs 的免費開源替代品。官方網站為 [voicebox.sh](https://voicebox.sh)，授權為 MIT。

### 核心架構 / 主要概念
- 桌面殼層使用 **Tauri (Rust)**，相較 Electron 約縮小 10 倍包體。
- 前端：**React + TypeScript + Tailwind**；後端：**FastAPI (Python)**；資料庫 SQLite。
- 推論層同時支援 **MLX / PyTorch**，橫跨 Metal、CUDA、ROCm、DirectML。
- 多引擎設計：內建 Qwen3-TTS、LuxTTS、Chatterbox Multilingual、Chatterbox Turbo、HumeAI TADA 共 5 種 TTS，共 23 種語言。
- 特色功能：少量樣本語音克隆、Pedalboard 後處理（pitch / reverb / delay / compressor）、自動分塊與交叉淡化的「無限長度」生成、多軌 Stories 時間軸編輯器、REST API、`[laugh]`/`[sigh]` 等 paralinguistic 標籤。

### 目標使用者
個人創作者、Podcaster、獨立開發者、重視隱私與離線作業者，以及希望避免 ElevenLabs 訂閱費的內容團隊。

### 與類似專案的差異
相較於雲端的 ElevenLabs，[jamiepine/voicebox](https://github.com/jamiepine/voicebox) 完全離線、無訂閱；相較於 [coqui-ai/TTS](https://github.com/coqui-ai/TTS) 等純函式庫，提供完整桌面 GUI 與時間軸編輯器；相較於 Electron 封裝的 TTS GUI，Tauri 方案在 Apple Silicon 上宣稱快 4–5 倍。已出現多個 fork：[simulanics/voicebox2](https://github.com/simulanics/voicebox2)、[Aaowu/voicebox](https://github.com/Aaowu/voicebox)、[bit-r/voicebox-ai-clone](https://github.com/bit-r/voicebox-ai-clone)。

### 外部評論
- [Starlog 部落格](https://starlog.is/articles/ai-dev-tools/jamiepine-voicebox/)：強調本機執行、無訂閱、Apple Silicon 表現強。
- [Substack 評測](https://substack.com/home/post/p-188710907)
- [sonusahani.com](https://sonusahani.com/blogs/voicebox)、[DigiLog 中文評測](https://digilog.tw/posts/2082?locale=en)
- 主要抱怨是 Linux 尚未有官方 build（受 GitHub Actions 磁碟空間限制）。未找到具代表性的 HN / Reddit 熱門討論串。

### Release 狀態
活躍開發。首版 v0.1.0 於 2026-01-27 發佈，至 2026-04-16 已推進到 **v0.4.0**，三個月內共 19 次發佈，含 CUDA libs 預編資產。仍屬 0.x 早期階段。

### 授權與社群
MIT License；建立於 2026-01-25，主語言 TypeScript；截至查詢當下 ★19,657、fork 2,260、open issues 241，具 CONTRIBUTING.md，社群成長極為迅速。

## 更新紀錄
