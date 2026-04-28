---
repo: iamgio/quarkdown
first_seen: 2026-04-29
last_updated: 2026-04-29
appearances: [2026-04-29]
growth_appearances: [2026-04-29]
has_releases: true
latest_release: v2.0.0
domain: 開發者工具
form: 應用程式
themes: [開源替代]
tags: [開發者工具, 應用程式, 開源替代]
---

# [iamgio/quarkdown](https://github.com/iamgio/quarkdown)

> 研究日期：2026-04-29
> 研究來源：<https://github.com/iamgio/quarkdown>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[iamgio/quarkdown](https://github.com/iamgio/quarkdown) 是一套以 Kotlin 寫成的 Markdown 排版系統，把 CommonMark/GFM 升級成圖靈完備的「函式式 Markdown」——同一份 `.qd` 原始檔可同時編譯為 PDF 論文、reveal.js 簡報、靜態網站與電子書。

## 作者與起源

作者 [iamgio (Giorgio Garofalo)](https://github.com/iamgio) 為義大利獨立開發者，repo 於 2024-01-30 建立。專案在 2025-06-03 因 [asicsp 在 HN 投稿](https://news.ycombinator.com/item?id=44167592) 衝上首頁，stars 兩日內由零暴增到 4,000；作者隨後寫下 [〈I accidentally ended up in Silicon Valley〉](https://iamgio.eu/2025-12-10-accidentally-in-silicon-valley/) 記錄這場意外爆紅。2026-04-23 釋出 v2.0.0 後再度引爆熱度，今日（2026-04-29）以 +797 stars 衝進 GitHub Trending 絕對榜。

## 核心架構 / 主要概念

技術堆疊：Kotlin（73%）+ TypeScript（12%）+ SCSS/HTML，需 Java 17+ 執行；GPL-3.0 授權。核心是一套自訂編譯器，把 `.qd` 原始檔解析為 AST 後分派到不同 renderer：

- `.doctype {plain|paged|slides|docs}` 切換輸出形態
- 內建函式語法 `.functionName {arg1} {arg2}` 與自訂函式 `.function {name}`
- 標準庫含版面、I/O、數學、條件、迴圈
- 輸出 target：HTML（連續流）/ paged.js（分頁）/ reveal.js（簡報）/ docs / PDF

附 VS Code extension 與 live preview。

## 設計哲學

> "Markdown with superpowers: from ideas to papers, presentations, websites, books, and knowledge bases. ... a Turing-complete Markdown variant."

logo 採「夸克」意象——強調以最小語法粒子組合出完整文件結構，比 LaTeX 易學、比純 Markdown 強大。

## 目標使用者與適用情境

適用：寫學術論文、技術書籍、會議簡報、知識庫的個人作者與小團隊；尤其偏好 Markdown 純文字工作流但又需要 LaTeX 級排版控制者。**不**適用：需多人即時協作的 Google Docs/Notion 場景，以及對嚴格學術期刊 LaTeX 模板有硬性要求的投稿。

## 與類似專案的差異

| 對手 | Quarkdown 的差異 |
|---|---|
| [quarto-dev/quarto-cli](https://github.com/quarto-dev/quarto-cli) | Quarto 走 Pandoc + 多語言 code chunk（R/Python/Julia），偏資料科學報告；Quarkdown 走自訂 Kotlin 編譯器與函式語法，無原生 code execution |
| [typst/typst](https://github.com/typst/typst) | Typst 是全新語法、競逐 LaTeX；Quarkdown 仍以 Markdown 為基底，學習曲線更平 |
| [jgm/pandoc](https://github.com/jgm/pandoc) | Pandoc 是萬用轉檔器、無原生函式系統；Quarkdown 內建變數、迴圈、自訂函式 |
| [marp-team/marp-core](https://github.com/marp-team/marp-core) | Marp 專做簡報；Quarkdown 同源產出簡報 + 論文 + 書籍 |

## 外部評論

- [Hacker News 串：「Quarkdown: A modern Markdown-based typesetting system」（44167592, 2025-06-03）](https://news.ycombinator.com/item?id=44167592)——衝上首頁，討論集中在「比 Pandoc 更現代的 DSL」與「圖靈完備是否過頭」。
- [Hacker News 早期串（41318336）](https://news.ycombinator.com/item?id=41318336)——首次曝光，留言對「Markdown + 函式」設計多表正面。
- [heise online：〈Books and slides from Markdown: Quarkdown 2.0 is here〉](https://www.heise.de/en/news/Books-and-slides-from-Markdown-Quarkdown-2-0-is-here-11271511.html)——德媒 v2.0 報導，點名「LaTeX-like styling、單檔多輸出」。
- [作者自述爆紅經歷](https://iamgio.eu/2025-12-10-accidentally-in-silicon-valley/)——記錄 HN 上首頁後的流量與心境。

## Release 狀態 / 時間軸

- 2024-01-30 repo 建立
- 2025-05-13 首個 dev build（pre-release `latest` tag）
- 2025-06-03 HN 首頁、stars 破 4k
- 2025-09-09 v1.9.0；2025-11-03 v1.12.0；2026-02-19 v1.14.0
- **2026-04-23 v2.0.0**（最新穩定版）
- 2026-04-29 首次進入 GitHub Trending Top 10

## 授權與社群

- License：GPL-3.0
- Stars：11,799（今日 +797）／Forks：311／Open issues：26／Watchers：33
- 主力語言：Kotlin 73% / TypeScript 12% / SCSS 6% / HTML 6%
- Topics：`compiler` `markdown` `markup-language` `pdf` `presentations` `static-site-generator` `typesetting`
- 官網：<https://quarkdown.com>

## 資料來源

**本體**
- [iamgio/quarkdown GitHub repo](https://github.com/iamgio/quarkdown)
- [Quarkdown 官網](https://quarkdown.com)
- [v2.0.0 Release notes](https://github.com/iamgio/quarkdown/releases/tag/v2.0.0)

**第三方評論**
- [Hacker News #44167592](https://news.ycombinator.com/item?id=44167592)
- [Hacker News #41318336](https://news.ycombinator.com/item?id=41318336)
- [heise online v2.0 報導](https://www.heise.de/en/news/Books-and-slides-from-Markdown-Quarkdown-2-0-is-here-11271511.html)
- [作者部落格〈accidentally in Silicon Valley〉](https://iamgio.eu/2025-12-10-accidentally-in-silicon-valley/)

**同類工具**
- [quarto-dev/quarto-cli](https://github.com/quarto-dev/quarto-cli)
- [typst/typst](https://github.com/typst/typst)
- [jgm/pandoc](https://github.com/jgm/pandoc)
- [marp-team/marp-core](https://github.com/marp-team/marp-core)

## 更新紀錄
