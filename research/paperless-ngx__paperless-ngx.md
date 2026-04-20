---
repo: paperless-ngx/paperless-ngx
first_seen: 2026-04-20
last_updated: 2026-04-21
appearances: [2026-04-20, 2026-04-21]
growth_appearances: [2026-04-20, 2026-04-21]
has_releases: true
latest_release: v2.20.14
tags: [文件管理, 應用程式, 自架, 資料主權, 開源替代]
domain: 文件管理
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx)

> 研究日期：2026-04-20
> 研究來源：<https://github.com/paperless-ngx/paperless-ngx>
> 觸發原因：首次上絕對榜（#7）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) 是社群維護的自架文件管理系統，口號「scan, index and archive all your documents」——把實體紙本透過 Tesseract OCR 轉成可全文檢索的 PDF/A 線上檔案庫，並以機器學習自動掛 tag、對應人、文件類型，讓使用者走向真正的無紙化。

## 作者與起源

血緣橫跨三代。2017 年 [Daniel Quinn](https://github.com/danielquinn) 以 Python/Django 起手 [the-paperless-project/paperless](https://github.com/the-paperless-project/paperless)（現已 archive），2019 年停更；同年 Jonas Winkler fork 為 [jonaswinkler/paperless-ng](https://github.com/jonaswinkler/paperless-ng)，改寫成 Angular 前端加強 UX 與擴展性，一度是事實標準後繼者。2022 年初 Winkler 長期失聯，一群貢獻者再 fork 成立 [paperless-ngx](https://github.com/paperless-ngx) GitHub 組織，明確把「不再單一 maintainer bus factor = 1」寫進 README。目前主力由 [shamoon](https://github.com/shamoon)（3,569 commits）、[stumpylog](https://github.com/stumpylog)（1,029）與元老 [danielquinn](https://github.com/danielquinn)（773）撐起，版本號續接 `paperless-ng`。

## 核心架構 / 主要概念

- 後端 Python / Django（57.4%），前端 TypeScript / Angular（32.9%）。
- OCR 走 [OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) 封裝的 Tesseract，宣稱支援 100+ 語言，輸出 PDF/A 以利長期保存。
- 後端儲存抽象出 correspondents（對應人 / 機構）、document types、tags、custom fields、storage paths 五類 metadata；workflow 系統可依觸發條件跑動作（指派權限、更名、套 tag）。
- 支援 PDF、圖片、純文字、Office（含 LibreOffice 家族），有多使用者 RBAC、分享連結（可設到期）、資料夾 / 郵件 / 掃描機網路分享來源自動 consume。
- 部署以 `docker compose` 為主，README 直接提供 `install-paperless-ngx.sh` 引導式安裝；至少 1 GB RAM（OCR 吃記憶體）。

## 設計哲學

來自 repo description：

> "A community-supported supercharged document management system: scan, index and archive all your documents."

兩個關鍵字：**community-supported**——明擺著要解決 `paperless-ng` 單人維護崩潰的問題，把 bus factor 提高；**supercharged**——不重新發明輪子，而是把 OCRmyPDF、Tesseract、Django、Angular、Elasticsearch-like 索引這些已成熟的元件組裝成一個能用的產品。專案定位不是取代企業級 DMS（SharePoint、M-Files），而是讓 homelab / 小團隊用戶把繳費單、合約、掃描件「local-first」收起來。

## 目標使用者與適用情境

- **家庭 / 個人 homelab**：掃描器 + NAS + paperless-ngx 是自架社群的經典組合。
- **小型事務所 / 工作室**：需要幾個帳號、按 client 分組、能全文檢索合約。
- **資料主權敏感族群**：文件不想進 Google Drive / Dropbox 的使用者。

**不適用**：
- 不能跑在不受信任的主機——官方文件明講檔案「stored in clear text without encryption」，雲端曝露等於裸奔。
- 企業級合規（SOC 2、HIPAA 稽核軌跡、細緻 retention policy）不是核心設計目標。
- 大量需 GPU 加速的 OCR 場景：社群持續提 [NPU / GPU OCR worker 需求](https://github.com/paperless-ngx/paperless-ngx/discussions/11939)，目前仍仰賴 Tesseract CPU。

## 與類似專案的差異

| 對手 | 本專案的差異 |
|---|---|
| [the-paperless-project/paperless](https://github.com/the-paperless-project/paperless)（原始，已 archive） | 重寫前端、改 Django 結構、擴充 OCR 管線，原專案自 2019 年停更 |
| [jonaswinkler/paperless-ng](https://github.com/jonaswinkler/paperless-ng)（已停更） | 延續 `-ng` 的 Angular UI 與資料結構，但改為多人維護、持續出 release |
| [Nextcloud](https://github.com/nextcloud/server) + OCR plugin | Nextcloud 是通用雲端檔案同步，OCR 是 add-on；paperless-ngx 是 purpose-built DMS，tag / workflow / OCR pipeline 原生一體 |
| [mayan-edms/Mayan-EDMS](https://github.com/mayan-edms/Mayan-EDMS) | Mayan 更偏企業 DMS（工作流程、版次、metadata schema 嚴謹），複雜度高；paperless-ngx 輕量、上手快、社群更活 |

**選型建議**：個人 / homelab 導向、想最快跑起來，選 paperless-ngx；需要複雜合規與細緻工作流，Mayan EDMS 比較貼近。

## 外部評論

- [The New Stack — "If You Need a Documentation Manager, Paperless-Ngx Is the Way To Go"](https://thenewstack.io/if-you-need-a-documentation-manager-paperless-ngx-is-the-way-to-go/)：媒體等級定位為「self-hosted 文件管理首選」。
- [Libre Self-hosted 評比](https://libreselfhosted.com/project/paperless-ngx/)：社群稱其為「self-hosted 名人堂成員（hall-of-famer）」，開發節奏快、功能持續增加。
- [Akash Rajpurohit 部落格](https://akashrajpurohit.com/blog/selfhost-paperless-ngx-for-document-management/)：稱讚「actually makes sense」，但提醒 SQLite 下會卡，建議換 PostgreSQL。
- [Hacker News 39304896](https://news.ycombinator.com/item?id=39304896)：使用者 `jacurtis` 指出 OCR 品質不錯、搜尋強，但「ingest 後缺乏成熟 review workflow」是主要痛點。
- [RepoInside 中文深度剖析](https://repoinside.com/paperless-ngx/paperless-ngx)：中文社群稱其為「打造無紙化辦公室神器」，肯定其 Docker 部署與 Tesseract 支援 100+ 語言。
- [社群 discussion #12252 — Paperless-AIssist](https://github.com/paperless-ngx/paperless-ngx/discussions/12252)：社群已出現以 Grok / OpenAI / Ollama vision OCR 取代 Tesseract 的第三方擴充，反映原生 OCR 在表格 / 多欄 layout 上仍有短板。

## Release 狀態 / 時間軸

- 2017：原始 [paperless](https://github.com/the-paperless-project/paperless) 起手。
- 2019：Jonas Winkler fork 為 `paperless-ng`。
- 2022-02-12：`paperless-ngx` GitHub 組織成立，repo 首次 push。
- 2026-04-14：最新版 [v2.20.14](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v2.20.14)，全為 bug fix（權限、tag 重複 ID、workflow 內 tag 變更時序、share link viewset 權限）。
- 近期 release 節奏：`v2.20.10`（2026-03-04）→ `v2.20.11`（2026-03-16，安全修補 GHSA-59xh-5vwx-4c4q）→ `v2.20.12`（2026-03-20，安全修補 GHSA-96jx-fj7m-qh6x）→ `v2.20.13` → `v2.20.14`，一個月內 5 版，patch-level 連發，接連 CVE 修補與文件路徑/workflow 競態。

## 授權與社群

- License：**GPL-3.0**（copyleft，衍生品須同授權開源）。
- Stars：**38,757**（2026-04-20 即時），forks 2,487，watchers 143，open issues 僅 10（驚人低，顯示 triage 積極）。
- Topics：`angular`, `archiving`, `django`, `dms`, `document-management`, `document-management-system`, `hacktoberfest`, `machine-learning`, `ocr`, `optical-character-recognition`, `pdf`。
- 主要語言：Python 57.4%、TypeScript 32.9%。
- 貢獻者：top 1 [shamoon](https://github.com/shamoon) 3,569 commits（近乎獨撐日常 PR merge），前 10 名含 2 位機器人帳號（paperlessngx-bot、dependabot）。
- 增長：今日 +382 stars（增長率 0.99%），絕對榜第 #7，對一個四歲、非 AI 熱點的 DMS 專案而言屬長期穩定熱門而非爆紅。
- homepage：<http://docs.paperless-ngx.com/>。

## 資料來源

**本體**
- [GitHub repo](https://github.com/paperless-ngx/paperless-ngx)
- [官方文件 docs.paperless-ngx.com](https://docs.paperless-ngx.com/)
- [v2.20.14 release](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v2.20.14)

**血緣專案**
- [the-paperless-project/paperless](https://github.com/the-paperless-project/paperless)（已 archive）
- [jonaswinkler/paperless-ng](https://github.com/jonaswinkler/paperless-ng)（已停更）

**第三方評論**
- [The New Stack](https://thenewstack.io/if-you-need-a-documentation-manager-paperless-ngx-is-the-way-to-go/)
- [Libre Self-hosted](https://libreselfhosted.com/project/paperless-ngx/)
- [Akash Rajpurohit](https://akashrajpurohit.com/blog/selfhost-paperless-ngx-for-document-management/)
- [Hacker News item 39304896](https://news.ycombinator.com/item?id=39304896)
- [RepoInside 中文](https://repoinside.com/paperless-ngx/paperless-ngx)
- [GitHub discussion #12252 — Paperless-AIssist](https://github.com/paperless-ngx/paperless-ngx/discussions/12252)

**同類工具**
- [nextcloud/server](https://github.com/nextcloud/server)
- [mayan-edms/Mayan-EDMS](https://github.com/mayan-edms/Mayan-EDMS)
- [ocrmypdf/OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF)（底層依賴）

## 更新紀錄

### 2026-04-21
- 連續第 2 天上榜（絕對榜 #4，+611；增長率榜 #6，1.55%）；stars 累計 39,315（兩天 +558，持續加速靠近 40k）
- 無新 release（最新仍為 [v2.20.14](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v2.20.14)，2026-04-14）
- 觀察：與今日另一個新進榜自架工具 [pi-hole/pi-hole](https://github.com/pi-hole/pi-hole) 共組「自架基礎建設老牌專案回流」現象——兩者皆屬建立多年、動能重啟的類型
