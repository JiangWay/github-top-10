---
repo: google/magika
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]
growth_appearances: [2026-04-18]
has_releases: true
latest_release: python-v1.0.2
---

# [google/magika](https://github.com/google/magika)

## 深度研究（2026-04-18 首次）

### 專案定位
[google/magika](https://github.com/google/magika) 是 Google 開源的 AI 驅動檔案類型偵測工具，定位為傳統 Unix `file` 指令的現代替代品，用深度學習模型辨識檔案內容類型，強調高準確度（約 99%）與毫秒級推論。

### 核心架構 / 主要概念
- 自訂 Keras 深度學習模型，匯出為 ONNX 格式，模型僅數 MB。
- 訓練資料約 1 億份檔案，覆蓋 200+ 內容類型（二進位與文字格式皆支援）。
- 1.0 版起核心引擎重寫為 Rust，單核每秒可辨識近 1000 個檔案（M4 MacBook Pro）。
- 提供 CLI（Rust）、Python、JavaScript/TypeScript、Rust crate 四種介面。

### 目標使用者
- 資安團隊與端點掃描：跨 OS 掃描不受結構化限制的敏感資料。
- 大規模檔案處理平台：Google 內部每週處理數千億樣本，VirusTotal、abuse.ch 皆整合使用。
- 需要比 libmagic 更準確、特別針對文字型內容分類的開發者。

### 與類似專案的差異
- 相較傳統 libmagic / `file`：以 ML 模型取代魔術位元組規則，對文字類（程式碼、設定檔）辨識顯著更準。
- 相較 [ahupp/python-magic](https://github.com/ahupp/python-magic)：不需 C 函式庫、跨平台單一執行檔、支援 ONNX 推論。
- 1.0 改以 Rust 重寫，效能與記憶體安全優於過去純 Python 版本。

### 外部評論
- [InfoQ](https://www.infoq.com/news/2025/12/magika-rust-file-type-detector/)、[Linuxiac](https://linuxiac.com/)、[Slashdot](https://developers.slashdot.org/story/25/11/07/005225/magika-10-goes-stable-as-google-rebuilds-its-file-detection-tool-in-rust) 均正面報導 Rust 重寫與 1.0 穩定發布。
- [Hacker News 討論](https://news.ycombinator.com/item?id=39391688) 分歧：質疑者認為一般 bash 流程不需要每秒 1000 檔的速度；支持者指出在大量端點掃描非結構化機密資料時極具價值。
- [Google Open Source Blog](https://opensource.googleblog.com/2025/11/announcing-magika-10-now-faster-smarter.html) 官方發文。

### Release 狀態
活躍維護。近期釋出：`python-v1.0.2`（2026-02-27，支援 Python 3.14、移除 numpy 直接相依）、`cli/v1.0.2`（2026-02-25，提供 macOS/Windows/Linux ARM64+x86_64 預編譯二進位）、`cli-latest` 浮動標籤更新於 2026-04-16。`python-v1.0.1`（2025-10-31）為首個脫離實驗期的穩定版。

### 授權與社群
Apache 2.0 授權。15,301 stars、836 forks、132 open issues，預設分支 main，首次 commit 於 2023-08-22，最近推送 2026-04-16，社群活躍度高。

## 更新紀錄
