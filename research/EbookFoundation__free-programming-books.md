---
repo: EbookFoundation/free-programming-books
first_seen: 2026-04-29
last_updated: 2026-04-29
appearances: [2026-04-29]
growth_appearances: [2026-04-29]
has_releases: false
latest_release: null
domain: 教學資源
form: 課程教材
themes: [開源替代]
tags: [教學資源, 課程教材, 開源替代]
---

# [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books)

> 研究日期：2026-04-29
> 研究來源：<https://github.com/EbookFoundation/free-programming-books>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）
> 專案作者：[Free Ebook Foundation](https://github.com/EbookFoundation)（前身為 Victor Felder 個人專案）

## 一句話定位

[EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books) 是一份由社群維護、跨 50+ 自然語言、收錄 4,000+ 本免費程式設計書與 2,000+ 門免費課程的純 Markdown 索引清單，是 GitHub 全站 stars 數歷史 Top 5 的非程式碼類型 repo。

## 作者與起源

最初是 Karan Bhangui、George Stocker 等人在 StackOverflow 寫下的「免費程式書清單」討論串。2013-10-11，**Victor Felder（GitHub 帳號 [vhf](https://github.com/vhf)）**將該清單搬到 GitHub 變成 [vhf/free-programming-books](https://github.com/vhf/free-programming-books) 以方便協作維護，隨後在 Hacker News 爆紅。**2017 年正式移交給 [Free Ebook Foundation](https://ebookfoundation.org/)** ——一個美國 501(c)(3) 非營利組織、專注於促進免費電子書的創作、發行、典藏與永續——repo 也跟著改名為今日的 `EbookFoundation/free-programming-books`。

## 核心架構 / 主要概念

不是程式碼，而是一個樹狀的 Markdown 清單目錄：

- `books/` — 依程式語言（`free-programming-books-langs.md`）與主題（`-subjects.md`）分類
- `courses/` — 免費線上課程
- `casts/` — Podcast 與螢幕錄製教學
- `more/` — Cheat sheet、互動教材、play­ground、題庫
- 每一類別下又依**自然語言**分檔（`-en.md`、`-zh.md`、`-ja.md`...），含 50+ 種翻譯
- `docs/` — `CONTRIBUTING.md`、`CODE_OF_CONDUCT.md`、格式守則
- 主要語言被 GitHub 識別為 Python，但實為少量輔助腳本（連結檢查、格式化）

## 設計哲學

[Free Ebook Foundation 在官網](https://ebookfoundation.org/f-p-b.html)寫道：

> "Free Programming Books is a product of Open-Source culture, and continues to be a stunning example of what can be created when large numbers of people work together."

中譯：本清單是開源文化的產物，也是「眾人協作」可以創造什麼的驚人範例。設計上刻意**不放廣告、不做評分、不引入演算法推薦**——只用 Markdown 與超連結，純人工策展。

## 目標使用者與適用情境

適合：自學者尋找入門書單；老師備課要找開源教材；非英語母語者查母語版資源；Hacktoberfest 想找「good first issue」初學貢獻者。**不適用**：想要結構化課程進度追蹤、互動程式練習（建議改用 [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp)）、或想要二手評論與評分（社群刻意不收錄）。

## 與類似專案的差異

| 對手 | 本專案的差異 |
|---|---|
| [sindresorhus/awesome](https://github.com/sindresorhus/awesome) | Awesome 是「主題清單的清單」、涵蓋面更廣但不限免費；本專案專注**只收免費**、聚焦書與課程兩種教學形式 |
| [getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS) | YDKJS 是**單作者**寫的一套 JS 書；本專案是**索引**，會把 YDKJS 列為其中一筆連結 |
| [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) | build-your-own-x 是「動手做」教學集合、強調 from-scratch 實作；本專案則包含理論教科書、語言參考、課程影片，光譜更廣 |

選型建議：要快速找入門書 → 本專案；要 hands-on 實作教材 → build-your-own-x；要主題式工具與資源庫 → awesome。

## 外部評論

- [Hacker News 2023-07-24 討論串「Free-Programming-Books on GitHub」](https://news.ycombinator.com/item?id=36845462)：本 repo 多次回到 HN 首頁，成為「程式自學者第一站」的代名詞。
- [Hostinger《15 Most Popular GitHub Repos for Developers in 2026》](https://www.hostinger.com/tutorials/most-popular-github-repos)：將本 repo 列為「對開發者最有幫助的 GitHub repo」之一，強調其多語言覆蓋。
- [Awesome Rank for EbookFoundation/free-programming-books](https://awesomerank.github.io/lists/EbookFoundation/free-programming-books.html)：以演算法評估後將本清單長期列為 awesome-list 排名前段。
- [EvanLi/Github-Ranking Top-100-stars](https://github.com/EvanLi/Github-Ranking/blob/master/Top100/Top-100-stars.md)：每日自動更新的 GitHub stars 排行榜，本 repo 穩居全站 Top 5。

## Release 狀態 / 時間軸

**無 GitHub Release**（`gh api .../releases` 回傳空陣列），符合「文件型 repo」慣例。關鍵時間軸：

- 2013-10-11：Victor Felder 把 StackOverflow 清單搬到 GitHub
- 2014–2016：HN 多次爆紅，stars 突破 10 萬
- 2017：移交 Free Ebook Foundation 託管
- 2026-04-29（本研究日）：386,540 stars / 66,157 forks

## 授權與社群

- 授權：**[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)**（Creative Commons 而非 OSS license，因為內容是清單而非程式碼）
- **量化鐵錨**：386,540 stars / 66,157 forks / 79 open issues / 21 MB repo size；**全站 stars 排名約第 5**，僅次於 [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp)、[sindresorhus/awesome](https://github.com/sindresorhus/awesome) 等少數同級巨無霸。9,788 watchers 顯示有近萬人主動追蹤更新
- topics：`books`、`education`、`hacktoberfest`、`list`、`resource`——hacktoberfest 標籤對應其每年 10 月吸引大量初學者貢獻翻譯與新書連結的傳統

## 資料來源

- **本體**：
  - GitHub repo：<https://github.com/EbookFoundation/free-programming-books>
  - GitHub Pages：<https://ebookfoundation.github.io/free-programming-books/>
  - Free Ebook Foundation 官網：<https://ebookfoundation.org/f-p-b.html>
  - Free-Programming-Books Search：<https://ebookfoundation.org/fpbs.html>
- **第三方評論**：
  - [Hacker News 討論](https://news.ycombinator.com/item?id=36845462)
  - [Hostinger 2026 GitHub Repos 推薦](https://www.hostinger.com/tutorials/most-popular-github-repos)
  - [Awesome Rank 評分頁](https://awesomerank.github.io/lists/EbookFoundation/free-programming-books.html)
  - [EvanLi/Github-Ranking 排行榜](https://github.com/EvanLi/Github-Ranking)
- **同類工具**：
  - [sindresorhus/awesome](https://github.com/sindresorhus/awesome)
  - [getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)
  - [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x)
  - [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp)

## 更新紀錄
