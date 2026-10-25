---
repo: jbiaojerry/ebook-treasure-chest
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材]
domain: 教學資源
form: 課程教材
themes: []
---

# [jbiaojerry/ebook-treasure-chest](https://github.com/jbiaojerry/ebook-treasure-chest)

> 研究日期：2026-10-25
> 研究來源：https://github.com/jbiaojerry/ebook-treasure-chest
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[jbiaojerry/ebook-treasure-chest](https://github.com/jbiaojerry/ebook-treasure-chest) 是簡體中文電子書下載連結的索引庫，收錄帆書（原樊登讀書）、微信讀書、京東讀書、喜馬拉雅等付費閱讀 app 的書目，連結指向第三方網盤，提供 epub、mobi、azw3 三種格式。

> 分類說明：本站 controlled vocabulary 沒有「內容索引」類 domain，暫歸 `教學資源`。此專案收錄的是一般書籍而非教材，若同類專案再出現，應考慮新增 domain。

## 作者與起源

作者 jbiaojerry 個人維護，2023-09 建 repo。commit 只有作者本人（52 次）與 github-actions bot（6 次）。最近一次 push 是 2026-01-13，此後九個多月沒有更新，今日上榜不是因為新內容。

## 核心架構 / 主要概念

- **`md/*.md`**：分類頁，文學 2,711 筆、歷史 1,748、科普 743、管理 613、社會 558、推理 531 等
- **`scripts/`**：Python 腳本產生分類索引與搜尋頁
- **`docs/`**：GitHub Pages 前端，支援多關鍵字即時搜尋
- **檔案本體**：repo 不存書檔，只存網盤連結

## 設計哲學

> "欢迎来到电子书下载宝库，一个汇聚了各类电子书下载链接的地方。"

README 開頭這句說明了全部定位：彙整連結，不審查來源授權。

## 目標使用者與適用情境

- 用 Kindle、Koreader、多看等離線閱讀器的中文讀者
- **風險**：收錄書目多為付費 app 上架的商業出版品，下載者面臨著作權風險；repo 本身沒有授權宣告，法律地位屬灰色地帶
- **不適用**：需要合法來源的教學、企業或圖書館用途，應改用 [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books) 這類只收公開授權內容的清單

## 與類似專案的差異

| 對手 | 對方做法 | 本專案的差異 |
|---|---|---|
| [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books) | 只收作者或出版社公開免費的程式書，CC-BY-SA 授權，多人維護 | 不審查授權，收錄付費書目的網盤連結，單人維護，無授權宣告 |

## 外部評論

- [OSS Insight](https://ossinsight.io/analyze/jbiaojerry/ebook-treasure-chest)：近 30 天 +3.2k stars，約每日 105
- 中文技術社群未見具名評論文章，HN / Reddit 亦無討論，資料不足

## Release 狀態 / 時間軸

- 2023-09 建 repo
- 2026-01-13 最後 push
- 2026-10-25 首次上 trending（+227）
- 尚無 GitHub Release

## 授權與社群

- 授權：無（`license: null`，依 GitHub 預設為保留所有權利）
- Stars 22,988 / Forks 3,215 / Watchers 161 / Open issues 6
- 主語言：Python（僅索引腳本）
- 擁有者：個人
- README 附贊賞碼接受贊助
- 今日增長率 0.99%（+227 / 22,987）

## 資料來源

- **本體**：[GitHub repo](https://github.com/jbiaojerry/ebook-treasure-chest)
- **第三方評論**：[OSS Insight](https://ossinsight.io/analyze/jbiaojerry/ebook-treasure-chest)
- **同類工具**：[EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books)

## 更新紀錄
