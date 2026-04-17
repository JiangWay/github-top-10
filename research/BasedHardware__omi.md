---
repo: BasedHardware/omi
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]
growth_appearances: [2026-04-18]
has_releases: true
latest_release: Omi Desktop v0.11.327
---

# [BasedHardware/omi](https://github.com/BasedHardware/omi)

## 深度研究（2026-04-18 首次）

### 專案定位
[BasedHardware/omi](https://github.com/BasedHardware/omi) 是一個開源的 AI 穿戴/桌面生態系，口號為「看見你的螢幕、聆聽你的對話、告訴你該做什麼」。結合 $89 的穿戴裝置（項鍊／智慧眼鏡）、手機 App 與桌面應用，提供即時語音轉錄、摘要、待辦事項萃取與具長期記憶的 AI 對話。

### 核心架構 / 主要概念
- 前端：Flutter（iOS/Android）、Swift/SwiftUI（macOS）、Next.js（Web）
- 後端：Python + FastAPI、Firebase/Firestore、Redis 快取
- 處理：GPU 加速 VAD 與 speaker diarization，多 LLM 整合（可自帶 GPT-4o / Claude API key）
- 裝置：低成本硬體將運算卸載到手機或雲端；支援本地運行
- 核心概念：ambient AI、personas、BCI（腦機介面概念）、跨裝置記憶同步

### 目標使用者
追求生產力的專業人士（官方宣稱 300,000+ 使用者）、想以低門檻實驗 ambient AI 的開發者與 hacker，以及對開源替代 Friend、Limitless Pendant 的愛好者。

### 與類似專案的差異
相較閉源的 Friend、Limitless Pendant，[BasedHardware/omi](https://github.com/BasedHardware/omi) 採 MIT 開源、硬體 BOM 公開、可自備 API key、支援本地運行；相較純軟體的 Rewind，[BasedHardware/omi](https://github.com/BasedHardware/omi) 同時涵蓋穿戴硬體。強調 SOC 2 / HIPAA、TLS + AES-256，並以「可 self-host」作為主要差異點。

### 外部評論
- [TechCrunch](https://techcrunch.com/)（2025-01）定位 [BasedHardware/omi](https://github.com/BasedHardware/omi) 為 Friend 的競爭者，主打生產力與「brain interface」。
- Designboom 以「讀心」為題報導。
- UMEVO、Skywork 等深度評測肯定其低價與可客製性。
- 使用者評價兩極：2026 年 4 月反饋顯示相較 2025 年底穩定性大幅改善、更新頻繁，但仍有使用者抱怨錄音不穩定、硬體做工一般。HN/Reddit/ProductHunt 具體串列資料不足。

### Release 狀態
極高頻發布。最新為 **Omi Desktop v0.11.327**（2026-04-17），累計 549 個 release，近期多為伺服器端配額、ElevenLabs 語音選擇器、Rewind 螢幕擷取修復等小幅迭代。

### 授權與社群
MIT License。約 9,656 stars、1,662 forks、552 open issues、81 open PRs，主語言 Dart（41.6%）、C（19.7%）、Python（13.4%）、Swift（11.8%）。Topics 含 wearable、necklace、smartglasses、BCI、personas，社群活躍度高。

## 更新紀錄
