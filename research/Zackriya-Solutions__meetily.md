---
repo: Zackriya-Solutions/meetily
first_seen: 2026-07-05
last_updated: 2026-07-05
appearances: [2026-07-05]
growth_appearances: [2026-07-05]
has_releases: true
latest_release: v0.4.0
tags: [語音與多媒體, 應用程式, 自架, 資料主權, 開源替代]
domain: 語音與多媒體
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [Zackriya-Solutions/meetily](https://github.com/Zackriya-Solutions/meetily)

> 研究日期：2026-07-05
> 研究來源：https://github.com/Zackriya-Solutions/meetily
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-07-05 首次）

### 專案定位
印度公司 Zackriya Solutions 於 2024-12-26 開源的本機會議記錄工具（MIT）。定位是 Otter.ai、Fireflies、Fathom、Granola 的本機替代——音訊與轉錄不離開裝置。官網主打 HIPAA / GDPR 合規，鎖定醫療、法律、金融這類對雲端傳輸敏感的行業。今日首上榜 15,448 stars、+718 today、Rust。

### 核心架構 / 主要概念
- **App shell**：Tauri 單一桌面應用，Rust 後端 + Next.js（TypeScript）前端，含 9.9% C++（whisper.cpp 綁定）與 PowerShell / Shell 安裝腳本
- **轉錄層雙路**：
  - Whisper.cpp（來自 [ggerganov/whisper.cpp](https://github.com/ggerganov/whisper.cpp)，macOS 走 Metal + CoreML 加速）
  - NVIDIA Parakeet（CTC-based ASR，README 宣稱較純 Whisper 快 4×，非 OpenAI 的 [openai/whisper](https://github.com/openai/whisper) encoder-decoder 路線）
- **摘要層**：預設接 [ollama/ollama](https://github.com/ollama/ollama) 跑本機 LLM；可切換 Claude、Groq、OpenRouter 或任何 OpenAI 相容 endpoint——使用者自備 API key，資料流由使用者掌控
- **Speaker diarization**：GitHub topics 掛 `sortformer`（NVIDIA NeMo 家族的 end-to-end diarization 模型），與 [pyannote/pyannote-audio](https://github.com/pyannote/pyannote-audio) 這類主流路線不同。README 標示 diarization 為 Pro 版本功能，Community 版本本地跑仍在補齊

### 目標使用者
- 醫療、法律、金融從業者：對雲端會議紀錄工具的資料傳輸有合規顧慮
- macOS / Windows 桌面重度會議者：不想每場會都上傳給第三方 SaaS
- self-hosted 愛好者：想把 LLM 摘要與 ASR 都留在本機或內網

### 與類似專案的差異
- vs [ggerganov/whisper.cpp](https://github.com/ggerganov/whisper.cpp)：後者是純推理引擎，meetily 是完整桌面 app + 摘要 + 儲存 + UI
- vs [openai/whisper](https://github.com/openai/whisper)：走本機 C++ 綁定而非 Python 官方實作，且加了 Parakeet 這條 CTC 路線
- vs [nkasmanoff/meeting-summarizer](https://github.com/nkasmanoff/meeting-summarizer) 這類個人 side project：走 open-core——Community MIT 免費、Pro $10/user/月（年繳）補齊 diarization 與 team dashboard
- 與雲端 Otter / Fireflies 的核心差異是「音訊 100% 本機」與 sortformer diarization 路線

### 外部評論
- 官網 <https://meetily.ai> 宣稱累計 280,000+ 下載
- HN、Reddit r/selfhosted 具名討論搜尋未命中，第三方獨立 review 資料不足
- 中文社群目前無深度技術評論可引

### Release 狀態
11 個 release，最新 v0.4.0（2026-06-05）。往前 v0.3.0（2026-03-03）、v0.2.1（2026-02-11）、v0.2.0（2025-12-31），約 2–3 個月一版。

### 授權與社群
- License：MIT（Community）
- Stars：15,448（截至 2026-07-05）
- 商業模式：open-core（Community 免費 + Pro $10/user/月 + Enterprise 客製）
- 支援平台：macOS、Windows

### 風險與限制
- Sortformer 授權與模型下載流程 README 未展開
- Windows 上 Metal / CoreML 加速無法沿用，實測 4× 差距是否成立資料不足
- Pro 專屬功能（diarization、team dashboard）與 Community 版落差需自行取捨
