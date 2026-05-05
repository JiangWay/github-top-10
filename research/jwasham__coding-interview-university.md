---
repo: jwasham/coding-interview-university
first_seen: 2026-05-03
last_updated: 2026-05-06
appearances: [2026-05-03, 2026-05-06]
growth_appearances: [2026-05-06]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材, 開源替代]
domain: 教學資源
form: 課程教材
themes: [開源替代]
---

# [jwasham/coding-interview-university](https://github.com/jwasham/coding-interview-university)

> 研究日期：2026-05-03
> 研究來源：<https://github.com/jwasham/coding-interview-university>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-05-03 首次）

## 一句話定位

[jwasham/coding-interview-university](https://github.com/jwasham/coding-interview-university) 是一份「成為軟體工程師的完整電腦科學自學計畫」（A complete computer science study plan to become a software engineer），由非 CS 背景的自學者 [John Washam](https://github.com/jwasham) 為了準備 Google 面試而寫下、後續演化成涵蓋演算法、資料結構、作業系統、系統設計與面試流程的多月份學習路線圖，是 GitHub 全站 stars 排名前 5 的 repo 之一（344,424 stars）。

## 作者與起源

[John Washam](https://github.com/jwasham) 是經濟學學位、無 CS 背景的自學工程師，早年在 90 年代靠送披薩攢錢買第一台電腦、後來在美國軍中擔任駐韓翻譯，再轉型做 web 開發。2016 年他下定決心轉進 Google，每天讀書 8–12 小時、密集刷 CS 基礎共 8 個月（[freeCodeCamp 訪談 #134](https://www.freecodecamp.org/news/how-john-washam-crammed-for-8-months-got-a-job-at-amazon-then-taught-1000s-of-other-devs-134/)），把過程整理成 GitHub 上一份 README——也就是本 repo（建立於 2016-06-06）。最後他並未進 Google，而是進了 Amazon 任 SDE，但這份學習清單在 [Hacker News](https://news.ycombinator.com/item?id=16126529) 等社群被多次回顧，10 年後仍是「沒有 CS 學位想轉軟體工程」的標準答案。

## 核心架構 / 主要概念

整份學習計畫是一份巨大的可勾選 README + 子主題連結，主要區塊：

- **演算法複雜度與 Big-O**、**資料結構**（陣列、鏈結串列、堆疊、佇列、雜湊表）、**樹與圖**、**排序**、**動態規劃**
- **作業系統與並行**、**網路 / TCP / HTTP**、**資料庫概念**
- **系統設計**（標註為「進階 / 視職位需求」）
- **行為面試與履歷**、**模擬面試與 LeetCode 題庫指引**
- **間隔複習**：建議用 [Anki](https://apps.ankiweb.net/) 配合 Washam 早期釋出的 flashcard 資料庫做 spaced repetition；他本人在 README 標註「flashcards 太多、大多是 trivia，不必全背」
- 作者口號：「**knowing about 75% is good enough for an interview**」——讀到 75% 就夠面試，不必苛求 100%
- 學習時程：原本宣稱 8–12 個月，但作者多次補充「大多數人不需要學這麼久，我浪費了不少時間在不必要的東西上」
- 翻譯：15 種語言完成（含繁中、簡中、日、韓、俄、葡、西、德、印尼、保加利亞、越南、烏爾都、烏茲別克、孟加拉、高棉），另約 13 種翻譯進行中

## 設計哲學

[README 開宗明義](https://github.com/jwasham/coding-interview-university)：

> "This is my multi-month study plan for going from web developer (self-taught, no CS degree) to software engineer for a large company."

中譯：這是我自己的多月學習計畫，從自學的 web 開發者轉成大公司的軟體工程師。整份文件刻意保留「個人 to-do list」的氣質——勾選框、心得碎語、踩雷紀錄共存——而非教科書語氣，是它能被自學者代入的關鍵。

## 目標使用者與適用情境

適合：**沒有 CS 學位的自學者**、**bootcamp 畢業生**、**中年轉職者**——這份清單把「面試大公司要會什麼」攤平成可量化的 to-do。**不適用**：已有 CS 學位且只缺刷題經驗的人——直接上 LeetCode 更有效率；以及 2024 年後的 Google L3/L4 求職者——[2024 年的 Google 面試經驗](https://leetcode.com/discuss/post/6185127/2024-google-interview-questions-compilat-mjrf/)指出技術門檻已普遍提升一個標準差、LeetCode hard 成為常態（[playfulprogramming 2024 心得](https://playfulprogramming.com/posts/cracking-the-faang-code-my-2024-google-interview-journey-key-takeaways-with-actionable-tips-3f59)），本 repo 的覆蓋面雖廣、但題目深度需另外補。

## 與類似專案的差異

| 對手 | 本專案的差異 |
|---|---|
| [TheAlgorithms/Python](https://github.com/TheAlgorithms/Python) | TheAlgorithms 是「演算法的多語言實作集」、是 reference code；本專案是**讀書計畫**、會把 TheAlgorithms 列為延伸閱讀 |
| [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer) | system-design-primer **只**做系統設計這一塊、深度更夠；本專案系統設計只是其中一節，但前面包了 OS / 演算法 / 資料結構基礎 |
| [labuladong/fucking-algorithm](https://github.com/labuladong/fucking-algorithm) | labuladong 的 algo 小抄主打「題型套路 + 中文題解」、面向 LeetCode 刷題者；本專案是英文系、強調**先把 CS 基礎讀過一輪**才刷題 |
| [kdn251/interviews](https://github.com/kdn251/interviews) | kdn251 是「資料結構 + 演算法 cheatsheet + 各大公司題庫連結」、單頁速查；本專案是**長線進度表**、預設 2–8 個月學習週期 |

選型建議：**完全沒 CS 基礎** → 本專案打底；**已會基礎要刷題** → labuladong 或 kdn251；**已會基礎但缺系統設計** → system-design-primer；**要找 reference 實作** → TheAlgorithms。

## 外部評論

- [Hacker News 2018 討論串](https://news.ycombinator.com/item?id=16126529)：本 repo 多次被引用為「自學者面試 FAANG 必讀」，留言區同時有「太理論化、實戰不必這麼多」的反方意見。
- [freeCodeCamp Podcast #134：How to get a FAANG Dev Job in your 40s](https://www.freecodecamp.org/news/how-john-washam-crammed-for-8-months-got-a-job-at-amazon-then-taught-1000s-of-other-devs-134/)：Quincy Larson 訪談 Washam，補充本 repo 從個人 to-do 演化成全球教材的脈絡。
- [Medium《8 months to become a software engineer at Google》](https://medium.com/@reach4thestar/8-months-to-become-a-software-engineer-at-google-reach-for-the-stars-d2b5c8eae6a0)：以本計畫為藍本的個人實踐心得，被多次轉貼。
- [simple.gy 心得：Google Interview University by jwasham](https://www.simple.gy/sde-interview-university/)：早期讀者整理的學習筆記，可當輔助索引。
- [SourceForge mirror 評分頁](https://sourceforge.net/projects/coding-interview.mirror/reviews/)：聚合用戶評分長期 4–5 星，少數 1 星批評「2004 年的書建議過時」「flashcards 過多」。
- [LeetCode 2024 Google Interview Questions 整理串](https://leetcode.com/discuss/post/6185127/2024-google-interview-questions-compilat-mjrf/)：佐證「FAANG 面試難度近年顯著上升」，反推本 repo 的深度仍須搭配大量刷題。

## Release 狀態 / 時間軸

**無 GitHub Release**（`gh api .../releases` 回傳 `[]`），符合「文件型 repo」慣例。關鍵時間軸：

- 2016-06-06：首次 commit、repo 建立
- 2016：Washam 進入 Amazon，本 repo 在 HN 爆紅
- 2017–2020：社群陸續加入 15 種語言翻譯
- 2025-08-28：最近一次 push（README 持續微調更新）
- 2026-05-03（本研究日）：344,424 stars / 82,468 forks，當日 +717 stars 入榜 GitHub trending #8

## 授權與社群

- 授權：**[CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/)**（Creative Commons 而非 OSS license，因為內容是學習教材）
- **量化鐵錨**：344,424 stars / 82,468 forks / 104 open issues / 8,536 subscribers / 22.7 MB repo size；**全站 stars 排名約 Top 5**，與 [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp)、[EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books)、[sindresorhus/awesome](https://github.com/sindresorhus/awesome) 同級
- topics：`coding-interview`、`computer-science`、`data-structures`、`algorithms`、`interview-preparation`、`study-plan`
- 主要貢獻者：作者本人 [John Washam](https://github.com/jwasham) 仍持續維護（2025-08-28 仍有 push），翻譯由各語言志願者 fork 維持

## 資料來源

- **本體**：
  - GitHub repo：<https://github.com/jwasham/coding-interview-university>
  - 作者個人頁：<https://github.com/jwasham>
- **第三方評論**：
  - [Hacker News 討論](https://news.ycombinator.com/item?id=16126529)
  - [freeCodeCamp Podcast #134](https://www.freecodecamp.org/news/how-john-washam-crammed-for-8-months-got-a-job-at-amazon-then-taught-1000s-of-other-devs-134/)
  - [Medium 心得文](https://medium.com/@reach4thestar/8-months-to-become-a-software-engineer-at-google-reach-for-the-stars-d2b5c8eae6a0)
  - [simple.gy 學習筆記](https://www.simple.gy/sde-interview-university/)
  - [SourceForge mirror 評分](https://sourceforge.net/projects/coding-interview.mirror/reviews/)
  - [LeetCode 2024 Google Interview Questions](https://leetcode.com/discuss/post/6185127/2024-google-interview-questions-compilat-mjrf/)
  - [playfulprogramming 2024 Google 面試心得](https://playfulprogramming.com/posts/cracking-the-faang-code-my-2024-google-interview-journey-key-takeaways-with-actionable-tips-3f59)
- **同類工具**：
  - [TheAlgorithms/Python](https://github.com/TheAlgorithms/Python)
  - [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)
  - [labuladong/fucking-algorithm](https://github.com/labuladong/fucking-algorithm)
  - [kdn251/interviews](https://github.com/kdn251/interviews)

## 更新紀錄

### 2026-05-06
- 隔 2 日後返榜（5-03 上榜後 5-04、5-05 缺席，5-06 重返），絕對榜 **#9**；首次擠入增長率榜（**#10**，growth_rate **0.14%**——當日榜末），仍是最大量級的「歷史巨星型」資源庫（345,700 stars）。
- Release 端維持 `has_releases: false`，最新 push 仍為長期維護中的 markdown 教材更新。
- 與當日另兩檔教學 / 工具型上榜（[D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling)、[bwya77/vscode-dark-islands](https://github.com/bwya77/vscode-dark-islands)）共同形成「非 AI 也能上榜」的賽道分散現象，呼應 6/10 換血、7 個 domain 並存的當日格局。
