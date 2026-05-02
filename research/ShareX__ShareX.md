---
repo: ShareX/ShareX
first_seen: 2026-05-03
last_updated: 2026-05-03
appearances: [2026-05-03]
growth_appearances: []
has_releases: true
latest_release: v20.0.4
tags: [開發者工具, 應用程式, 自架]
domain: 開發者工具
form: 應用程式
themes: [自架]
---

# [ShareX/ShareX](https://github.com/ShareX/ShareX)

> 研究日期：2026-05-03
> 研究來源：<https://github.com/ShareX/ShareX>
> 觸發原因：首次上絕對榜（Trending #7，+129 stars/日）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[ShareX/ShareX](https://github.com/ShareX/ShareX) 是 Windows 平台上「一個熱鍵搞定截圖、錄影、上傳」的老牌自由軟體：可框選任意區域擷取畫面或錄影、做 OCR、加註解，並把結果送到使用者自選的 ~80 個目的地（FTP、S3、Imgur、Dropbox、Cloudflare R2、Telegram、自架 server……）。

## 作者與起源

ShareX 的源頭可以追溯到 2007 年——當時叫 [ZScreen](https://sourceforge.net/projects/zscreen/)，由開發者 BrandonZ 用 C#.NET 寫成、託管於 SourceForge，2008 年搬到 Google Code（[Wikipedia: ShareX](https://en.wikipedia.org/wiki/ShareX)）。2010 年起 [Jaex](https://github.com/Jaex) 與 [McoreD](https://github.com/McoreD) 兩位主力加入，從零開始重寫核心為 ZUploader；2012 年 ZScreen 全部功能完成移植，正式更名 ShareX；2013-10-08 因 Google Code 終止下載託管，repo 搬到現在的 GitHub 位置（[Grokipedia: ShareX](https://grokipedia.com/page/ShareX)）。Jaex 至今仍是 release 簽名者（v20.0.4 由 Jaex 推），核心 maintainer 仍只有 Jaex 與 McoreD 兩人，外加 30 位 contributor，是典型的「兩位作者撐 17 年」的長壽 Windows utility。

## 核心架構 / 主要概念

主要語言 C# 96.6%，target Windows、Microsoft Store 上架。功能光譜在 README topics 已自陳：`region-capture`、`screen-recorder`、`ocr`、`color-picker`、`gif-recorder`、`image-annotation`、`url-shortener`、`file-upload`、`ftp`、`dropbox`。架構上由四個層次組成——擷取（region/window/full screen/scrolling/GIF/video via FFmpeg）→ 自動處理（After Capture Tasks，可串浮水印、effects、上傳）→ 上傳（內建約 80 個 destination，含自架 FTP/SFTP/WebDAV、Amazon S3、Backblaze B2、Cloudflare R2、自訂 HTTP 端點）→ 自動 After Upload Tasks（縮網址、複製到 clipboard、寫入歷史）。20.0 起 image editor 從 Windows Forms 整段換成 [Avalonia UI](https://avaloniaui.net/) 重寫（[ShareX 20 Update Brings Avalonia Image Editor — windowsforum.com](https://windowsforum.com/threads/sharex-20-update-brings-avalonia-image-editor-arm64-store-support-ai-improvements.416253/)）。

## 設計哲學

repo description 自陳：

> "ShareX is a free and open-source application that enables users to capture or record any area of their screen with a single keystroke. It also supports uploading images, text, and various file types to a wide range of destinations."

關鍵字是 **a single keystroke** 與 **a wide range of destinations**——把「擷取」與「散布」黏成一條快捷鍵化的工作流，而不是把使用者扔進對話框點儲存。代價是設定面板的厚度，[XDA: 4 reasons Flameshot is better than ShareX for pretty much everyone](https://www.xda-developers.com/4-reasons-flameshot-is-better-than-sharex-for-pretty-much-everyone/) 直指 ShareX「extremely customizable but extremely complex」。

## 目標使用者與適用情境

Windows-only。主力族群三類：(1) 內容創作者／技術寫作者，需要把截圖直接吐 markdown 連結到部落格或 issue；(2) 開發者與 DevOps，需把 log/錯誤畫面 one-click 丟進自架 S3 或公司 SFTP；(3) IT 支援與 QA，需要 region capture + OCR + 自動歸檔。**不適用**：macOS／Linux 使用者（雖然 [ShareX/XerahS](https://github.com/ShareX/XerahS) 正以 Avalonia 重做跨平台 UI，但仍為實驗階段）；要求極簡 UI 的人（建議改用 [flameshot-org/flameshot](https://github.com/flameshot-org/flameshot)）。

## 與類似專案的差異

| 對手 | ShareX 的差異 |
|---|---|
| Windows 內建 [Snipping Tool](https://apps.microsoft.com/detail/9MZ95KL8MR0L) | ShareX 多了錄影、GIF、OCR、~80 個上傳目的地、scriptable workflow |
| [flameshot-org/flameshot](https://github.com/flameshot-org/flameshot) | Flameshot 跨平台、UI 更輕（~15MB／低 RAM）但無錄影、無自動上傳鏈路；ShareX 功能海但 Windows-only、設定門檻高（[XDA 比較](https://www.xda-developers.com/4-reasons-flameshot-is-better-than-sharex-for-pretty-much-everyone/)） |
| [greenshot/greenshot](https://github.com/greenshot/greenshot) | Greenshot 同樣 Windows、走極簡 + Office 整合路線；ShareX 是它的「重型版」，多了錄影／GIF／OCR／上傳 destination |
| [ksnip/ksnip](https://github.com/ksnip/ksnip) | Ksnip 跨平台、註解佳但無上傳自動化 |
| [obsproject/obs-studio](https://github.com/obsproject/obs-studio) | OBS 是直播 / 長時錄製主場；ShareX 走「短截圖／短錄影 → 立即分享」 |
| [ShareX/XerahS](https://github.com/ShareX/XerahS) | 同組織自家的 Avalonia 跨平台 reimagining，定位為未來 macOS / Linux 出口 |

## 外部評論

- [ShareX 20 Update Brings Avalonia Image Editor, ARM64 Store Support, AI Improvements — windowsforum.com](https://windowsforum.com/threads/sharex-20-update-brings-avalonia-image-editor-arm64-store-support-ai-improvements.416253/)：詳列 20.0 的 Avalonia 重寫、ARM64 native binary、OpenAI provider 重整。
- [ShareX 20.0 released with native ARM64 support via MS Store and modernized image editor — AlternativeTo](https://alternativeto.net/news/2026/4/sharex-20-0-released-with-native-arm64-support-via-ms-store-and-modernized-image-editor/)：點名 18 個註解工具、232 種影像 effects；同時記錄 MEGA uploader 因上游 library 失維而移除、新增 PrivateBin 上傳。
- [Neowin: My favorite screenshot-taking app for Windows updated with a reworked Image Editor and more](https://www.neowin.net/news/my-favorite-screenshot-taking-app-for-windows-updated-with-a-reworked-image-editor-and-more/)：標題即立場，將 20.0 的 image editor 重做視為近年最大改版。
- [HN 討論串 #40652523](https://news.ycombinator.com/item?id=40652523)：典型分歧——支持者讚功能海，反對者抱怨設定面板像「IDE 而不是工具」。
- [Slant: ShareX vs Flameshot 2025 比較](https://www.slant.co/versus/11895/27124/~sharex_vs_flameshot) 與 [SaaSHub: ShareX vs Flameshot](https://www.saashub.com/compare-sharex-vs-flameshot)：兩邊在「自動上傳鏈」這項仍把 ShareX 排第一。
- 中文圈本次未見規模化討論（資料不足）。

**今日為何進 Trending**：可信觸發是 2026-05-01 釋出的 [v20.0.4](https://github.com/ShareX/ShareX/releases/tag/v20.0.4) 與其前置 [v20.0.2](https://github.com/ShareX/ShareX/releases/tag/v20.0.2)（2026-04-24）——這是 ShareX 把核心 image editor 從 Windows Forms 換成 Avalonia 的第一個 stable 版，配合 ARM64 store binary 與多家媒體報導，把一支 17 歲老工具重新推上 Trending 第 7。

## Release 狀態 / 時間軸

`has_releases: true`，GitHub releases 共 87 個。關鍵節點：
- 2007：[ZScreen](https://sourceforge.net/projects/zscreen/) 啟動
- 2012：完成 ZUploader 改寫，更名 ShareX
- 2013-10-08：repo 從 Google Code 搬到 GitHub
- 2025-08：v18.0 / v18.0.1（[changelog](https://getsharex.com/changelog)）
- 2026-01-28：v19.0.2，導入 AI 影像分析
- 2026-04-24：v20.0.2（pre-release）首發 Avalonia image editor
- 2026-05-01：v20.0.4 stable（[release 頁](https://github.com/ShareX/ShareX/releases/tag/v20.0.4)）

近一年發版節奏約每 2–3 月一個 minor，patch 視 bug 修復節奏跟發。

## 授權與社群

GPL-3.0；36,697 stars、3,675 forks、541 watchers、608 open issues、87 releases、30 contributors（`gh api repos/ShareX/ShareX/contributors`）。topics 含 `avalonia`、`csharp`、`screenshot`、`screen-recorder`、`ocr`、`productivity`。主力 maintainer 17 年來仍是 [Jaex](https://github.com/Jaex) 與 [McoreD](https://github.com/McoreD) 兩位（[ShareX 組織成員頁](https://github.com/orgs/ShareX/people)）。stars 增長以「老牌長尾」標準看穩定，今日 +129 stars 屬於明顯 Avalonia 改版回流而非爆紅。同組織另有跨平台實驗 [ShareX/XerahS](https://github.com/ShareX/XerahS)，路線圖預告 v21 可能首次出 Linux build。

## 資料來源

**本體**
- [ShareX/ShareX repo](https://github.com/ShareX/ShareX)
- [getsharex.com 官網](https://getsharex.com/)
- [getsharex.com/changelog](https://getsharex.com/changelog)
- [v20.0.4 release](https://github.com/ShareX/ShareX/releases/tag/v20.0.4)
- [v20.0.2 release](https://github.com/ShareX/ShareX/releases/tag/v20.0.2)
- [ShareX/XerahS](https://github.com/ShareX/XerahS)（同組織 Avalonia 跨平台分支）
- [ZScreen on SourceForge](https://sourceforge.net/projects/zscreen/)（前身專案）

**第三方評論**
- [Wikipedia: ShareX](https://en.wikipedia.org/wiki/ShareX)
- [Grokipedia: ShareX](https://grokipedia.com/page/ShareX)
- [windowsforum.com: ShareX 20 Update Brings Avalonia Image Editor](https://windowsforum.com/threads/sharex-20-update-brings-avalonia-image-editor-arm64-store-support-ai-improvements.416253/)
- [AlternativeTo: ShareX 20.0 released with native ARM64 support](https://alternativeto.net/news/2026/4/sharex-20-0-released-with-native-arm64-support-via-ms-store-and-modernized-image-editor/)
- [AlternativeTo: ShareX 19.0 brings AI image analysis](https://alternativeto.net/news/2026/1/sharex-19-0-brings-ai-image-analysis-region-capture-upgrades-new-defaults-and-more/)
- [Neowin: reworked Image Editor article](https://www.neowin.net/news/my-favorite-screenshot-taking-app-for-windows-updated-with-a-reworked-image-editor-and-more/)
- [XDA: 4 reasons Flameshot is better than ShareX](https://www.xda-developers.com/4-reasons-flameshot-is-better-than-sharex-for-pretty-much-everyone/)
- [HN #40652523](https://news.ycombinator.com/item?id=40652523)
- [Slant: ShareX vs Flameshot](https://www.slant.co/versus/11895/27124/~sharex_vs_flameshot)
- [SaaSHub: ShareX vs Flameshot](https://www.saashub.com/compare-sharex-vs-flameshot)

**同類工具**
- [flameshot-org/flameshot](https://github.com/flameshot-org/flameshot)
- [greenshot/greenshot](https://github.com/greenshot/greenshot)
- [ksnip/ksnip](https://github.com/ksnip/ksnip)
- [obsproject/obs-studio](https://github.com/obsproject/obs-studio)
- [Snipping Tool](https://apps.microsoft.com/detail/9MZ95KL8MR0L)

## 更新紀錄
