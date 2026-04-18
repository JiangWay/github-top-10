---
repo: BasedHardware/omi
first_seen: 2026-04-18
last_updated: 2026-04-19
appearances: [2026-04-18, 2026-04-19]
growth_appearances: [2026-04-18, 2026-04-19]
has_releases: true
latest_release: Omi Desktop v0.11.333
---

# [BasedHardware/omi](https://github.com/BasedHardware/omi)

> 研究日期：2026-04-18
> 研究來源：<https://github.com/BasedHardware/omi>
> 觸發原因：首次上絕對榜（當日排名 #1）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[BasedHardware/omi](https://github.com/BasedHardware/omi) 是一套開源的 ambient AI 穿戴 + 桌面生態系，口號「**看見你的螢幕、聆聽你的對話、告訴你該做什麼**」。以 $89 的穿戴裝置（項鍊 / 智慧眼鏡）搭配手機 App 與 macOS 桌面應用，提供即時語音轉錄、摘要、待辦萃取與具長期記憶的 AI 對話。

它的獨特賣點：**Friend / Limitless Pendant 的開源對位**，硬體 BOM 公開、可自備 API key、可本地運行。

## 作者與起源

**BasedHardware** 為 GitHub Organization 帳號（非個人），repo 建立於 **2024-03-22**，兩年內從單一「Friend-like pendant」專案演化為穿戴 + 桌面 + 智慧眼鏡的生態系。官方宣稱累積 **300,000+ 使用者**，並於 omi.me 販售硬體。

時間軸重點：
- **2024-03**：repo 建立，初期定位為「開源 Friend 替代品」
- **2025-01**：TechCrunch 專訪將其定位為 Friend 的競爭者，主打生產力與 "brain interface"
- **2025 下半年**：經歷穩定性爭議後大規模改版
- **2026-04**：累計 549 個 release、10,178 GitHub stars，為 GitHub trending 第 1 名

## 核心架構 / 主要概念

- **前端**：Flutter（iOS / Android）、Swift / SwiftUI（macOS）、Next.js（Web）
- **後端**：Python + FastAPI、Firebase / Firestore、Redis 快取
- **訊號處理**：GPU 加速 VAD（語音活動偵測）與 speaker diarization（說話者切分），多 LLM 整合（可自帶 GPT-4o / Claude API key）
- **硬體**：低成本 BOM 公開，運算卸載到手機或雲端；支援本地運行
- **核心概念**：ambient AI、personas（人格切換）、BCI（腦機介面概念）、跨裝置長期記憶同步

## 設計哲學

omi 的設計主張集中在「**開源對位閉源穿戴 AI**」。README 與 omi.me 官網強調：

> "Own your memory. Own your data. Own your AI."

這句話點出三個優先序：**資料主權 > 功能完整性 > 硬體精緻度**。具體展現在：

1. **MIT 開源**、硬體 BOM 公開，允許自組硬體
2. **可自備 API key**（GPT-4o / Claude），不強制廠商雲
3. **可 self-host** 整套後端（FastAPI + Firebase 可替換）
4. 合規聲明（SOC 2 / HIPAA、TLS + AES-256）同時保留本地替代路徑

這種設計取向也解釋了為何做工評價兩極——資源投注在開源完整度與功能頻度，而非硬體工藝。

## 目標使用者與適用情境

**適用**：
- 追求生產力的專業人士（官方宣稱 300,000+ 使用者）
- 想以低門檻實驗 ambient AI 的開發者與 hacker
- 對開源替代 Friend、Limitless Pendant 有偏好的愛好者
- 重視資料主權、願意自備 API key 或 self-host 的進階使用者

**不適用**：
- 追求硬體工藝與完成度的消費者（使用者反饋顯示做工一般）
- 無法接受錄音穩定性偶發問題、非技術背景使用者
- 對 ambient recording 有法規顧慮的企業環境（即便官方有合規聲明）

## 與類似專案的差異

| 競品 | omi 的差異 |
|---|---|
| **Friend**（閉源穿戴） | omi 為 MIT 開源、BOM 公開、可自備 API key、可 self-host |
| **Limitless Pendant**（閉源穿戴） | omi 涵蓋穿戴 + 桌面 + 智慧眼鏡三棲，Limitless 僅 pendant |
| **Rewind**（純軟體 macOS） | omi 同時有穿戴硬體，Rewind 無硬體且 Mac-only |

獨特特徵：**硬體 BOM + 軟體碼同為 OSS**，在 ambient AI 穿戴類別中為少數。

## 外部評論

- [TechCrunch](https://techcrunch.com/2025/01/)（2025-01）：定位 omi 為 Friend 的競爭者，主打生產力與「brain interface」概念
- **Designboom**：以「讀心」為題報導硬體設計
- **UMEVO、Skywork** 等深度評測：肯定其低價位與可客製性，但指出硬體做工一般
- 使用者評價（2026-04 社群反饋）：相較 2025 年底穩定性「大幅改善、更新頻繁」，但仍有使用者抱怨錄音不穩定
- HN / Reddit / ProductHunt：**未見顯著集中討論串，具體評論串列資料不足**

## Release 狀態 / 時間軸

極高頻發布，自動化腳本主導。

- **最新版**：**Omi Desktop v0.11.327**（2026-04-17）
- **累計**：549 個 release
- **近期主題**：伺服器端配額管理、ElevenLabs 語音選擇器、Rewind 風格螢幕擷取修復等小幅迭代

發布節奏顯示專案處於高速迭代期，每日多版實為常態。

## 授權與社群

- **License**：MIT
- **量化鐵錨**（2026-04-18）：**10,178 stars**、1,692 forks、545 open issues、86 subscribers
- **主語言比例**：Dart（41.6%）、C（19.7%）、Python（13.4%）、Swift（11.8%）
- **Topics**：`ai`、`wearable`、`necklace`、`smartglasses`、`bci`、`personas`、`transcription`、`summary`、`flutter`、`nextjs`
- **增長速率**：當日 `stars_today` 463 顆，增長率 4.55%（日報增長榜 #5）
- **組織類型**：Organization（非個人專案），有商業實體支撐

## 資料來源

### 本體
- GitHub repo: <https://github.com/BasedHardware/omi>
- 官網: <https://omi.me>
- GitHub Releases: <https://github.com/BasedHardware/omi/releases>

### 第三方評論
- TechCrunch（2025-01）: <https://techcrunch.com/>
- Designboom 報導
- UMEVO、Skywork 評測

### 同類工具
- Friend（閉源對位）
- Limitless Pendant
- Rewind（macOS 純軟體）

## 更新紀錄

### 2026-04-19
- 今日絕對榜 #2（10,319 stars，+617）、增長率榜 #5（5.98%），連續第 2 天上榜。
- 新版本：[Omi Desktop v0.11.328 → v0.11.333](https://github.com/BasedHardware/omi/releases)（2026-04-17 ~ 2026-04-18 連發 6 版 macOS build，為 Omi Desktop 桌面端迭代，版本號跳動顯示為 CI/build pipeline 自動化發版；主要以版本修復為主，無功能分水嶺。
