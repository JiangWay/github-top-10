---
repo: anonfaded/FadCam
first_seen: 2026-05-13
last_updated: 2026-05-13
appearances: [2026-05-13]
growth_appearances: [2026-05-13]
has_releases: true
latest_release: v3.0.1
tags: [行動應用, 應用程式, 資料主權, 開源替代]
domain: 行動應用
form: 應用程式
themes: [資料主權, 開源替代]
---

# [anonfaded/FadCam](https://github.com/anonfaded/FadCam)

> 研究日期：2026-05-13
> 研究來源：https://github.com/anonfaded/FadCam
> 觸發原因：首次上絕對榜（#6，2,155 stars）
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-05-13 首次）

### 專案定位
[anonfaded/FadCam](https://github.com/anonfaded/FadCam) 是隱私導向的 Android 多媒體錄影 app，2024 年 7 月開源，主打「螢幕關閉仍可在背景持續錄影」的單一硬功能。專案以 GPL-3.0 釋出、無廣告、無追蹤、影音完全保存於本機，刻意填補 Google Play 上多數背景錄影 app 充斥廣告與權限濫用的空白市場。除了原本的後台錄影，現已延伸出螢幕錄製模組 FadRec、本地網路即時串流與遠端控制模組 FadCam Remote，定位從單一錄影工具擴張為「私有化多媒體錄製套件」。

### 核心架構 / 主要概念
專案 91.8% 程式碼為 Java，相機層同時支援 Camera2 與 CameraX 兩套 API，影音編碼透過 ffmpeg-android 整合。錄影採 fragmented MP4 格式，目的是即使遇到 crash、強制中斷或電量耗盡也不會整段毀檔，這是 dashcam 場景的核心需求。內建自動切檔（依容量上限）、60/90 fps、可調音訊取樣率、藍牙／有線麥克風來源切換、時間戳與 GPS 浮水印（地理編碼使用 Nominatim 服務），UI 走 Material Design 並提供主題自訂。FadCam Remote 透過區網提供 Web 介面操作：遠端開錄、開閃光燈、查看電量與儲存狀態。

### 目標使用者
四類明確場景：(1) **行車記錄器**——把舊手機釘在前擋玻璃當 dashcam；(2) **家用 CCTV**——把備用手機掛在牆上，透過區網 Web UI 遠端監看；(3) **教學內容創作**——FadRec 模組提供註記筆、橡皮擦、文字、形狀繪製與多層撤銷；(4) **個人記錄安全用途**——記者、運動員、街拍場景需要在不引人注意下持續拍攝。專案明確聲明反對任何未經授權的監控與隱私侵犯行為。

### 與類似專案的差異
相對於 [moezbhatti/qksms](https://github.com/moezbhatti/qksms) 類型的「單純開源替代品」，[anonfaded/FadCam](https://github.com/anonfaded/FadCam) 更像「多功能私有錄影瑞士刀」：同時包含背景錄影、螢幕錄影、區網直播與遠端控制四種獨立工具鏈。市面上類似的 Background Video Recorder 多為閉源含廣告，OSS 競品則多只做單一面向（例如純 dashcam 或純螢幕錄影）。FadCam 透過 fragmented MP4 與崩潰恢復、加上「從最近 app 列表隱藏」的選項，把「長時間穩定錄影」與「隱蔽性」兩條需求綁在同一個 app 內。

### 外部評論
- [Privacy Guides 社群討論串](https://discuss.privacyguides.net/t/fadcam-open-source-cam-background-video-recording-even-when-the-screen-is-off/19823)：2024 年 8 月 2 日發起，肯定其本機儲存與無上傳設計，討論集中於背景錄影合法性與是否該推薦給隱私社群。
- [F-Droid 官方上架頁](https://f-droid.org/packages/com.fadcam/)：通過 F-Droid 的純開源審核並收錄，是該 app 進入隱私圈的關鍵分發通道。
- [AlternativeTo 條目](https://alternativeto.net/software/fadcam/about/)：被列為多款閉源背景錄影 app 的替代選項。
- [IzzyOnDroid F-Droid 鏡像](https://apt.izzysoft.de/fdroid/index/apk/com.fadcam?repo=main)：第三方 F-Droid 倉庫收錄，提供更新更頻繁的版本管道。

### Release 狀態
共 22 個 release，最新穩定版 `v3.0.1`（2025-12-16），最新預發布 `v4.0.0-beta9`（2026-05-11，內部測試版本，無 release notes）。版本節奏穩定：v1.0（2024-07）→ v2.0（2025-09）→ v3.0（2025-12）→ v4.0 beta 進行中。穩定版主要更新涵蓋 CPU 與電池消耗優化、影音損毀修補、記憶體洩漏修補；社群描述 v3 相對 v2 有 45-50% CPU 下降、28-33% 電池表現改善、30% 記憶體佔用下降。

### 授權與社群
GPL-3.0 授權，2,155 stars / 165 forks / 10 subscribers / 81 open issues，主要由作者 [anonfaded](https://github.com/anonfaded) 單人維護，homepage 為 `fadcam.fadseclab.com`。分發通道完整：GitHub Releases、F-Droid、IzzyOnDroid、Amazon Appstore，並提供獨立 beta 版以避免與穩定版衝突安裝。專案存在 Pro 版本（透過 Patreon 取得終身授權），維持「OSS 核心 + 贊助制 Pro」的雙軌營收。
