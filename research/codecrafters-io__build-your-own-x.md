---
repo: codecrafters-io/build-your-own-x
first_seen: 2026-04-25
last_updated: 2026-04-27
appearances: [2026-04-25, 2026-04-27]
growth_appearances: [2026-04-27]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材]
domain: 教學資源
form: 課程教材
themes: []
---

# [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x)

> 研究日期：2026-04-25
> 研究來源：<https://github.com/codecrafters-io/build-your-own-x>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) 是一份社群維護的 awesome list，把「從零打造 X」這條學習路徑全部編目起來——從 3D Renderer、Database、OS、Compiler、Git、Neural Network 到 Blockchain、BitTorrent、Regex Engine、Shell——每個主題下集結各語言的 step-by-step 教程連結，README 一行 description 就是「Master programming by recreating your favorite technologies from scratch.」

## 作者與起源

專案由 **Daniel Stefanovic**（GitHub `danistefanovic`、最大貢獻者 320 commits）於 **2018-05-09** 建立，原本是一份個人收藏的「from scratch」教程清單。2022 年 Sarup Banskota 與 Paul Kuruvilla 在 Y Combinator S22 batch 創立 [CodeCrafters](https://codecrafters.io/) 後接手了這份 repo——兩位創辦人在 IIT 預備校認識，Banskota 從 Vercel 離職後與 Kuruvilla 一起把「build your own X」從一份清單延伸成可付費的互動式挑戰平台。CodeCrafters 已從 Mike Krieger（Instagram 共同創辦人）、Arash Ferdowsi（Dropbox 共同創辦人）、Paul Copplestone（Supabase CEO）等人募得 1.8M 種子輪（[TechCrunch](https://techcrunch.com/2024/11/19/codecrafters-wants-to-challenge-seasoned-developers-with-hard-to-build-projects/)）。今天這份 repo 同時是社群資產與公司最大流量入口。

## 核心架構 / 主要概念

純 Markdown，**單一 README 即整個產品**——沒有程式碼、沒有 build pipeline、沒有 CI。教程依「Build your own ...」分類：Operating System、Database、Docker、Network Stack、Web Server、Shell、Programming Language、Regex Engine、Template Engine、3D Renderer、Physics Engine、Voxel Engine、Visual Recognition System、Neural Network、AI Model、Augmented Reality、Git、Text Editor、Web Browser、Command-Line Tool、Bot、Blockchain/Cryptocurrency、BitTorrent Client、Distributed Systems、Emulator/Virtual Machine、Front-end Framework、Game、Memory Allocator、Processor、Search Engine 等約 **30+ 個主題**，每主題下橫跨 C / C++ / Rust / Go / Python / JavaScript / Java / Haskell 等實作。新教程以 PR 形式提交，社群在 issue / PR 上以 reaction 與 comment 評估後合併。

## 設計哲學

CodeCrafters 在官網把這個學派的口號寫得很白：

> "Rebuild the tools you use every day with your own hands. Recreate Redis, Git, SQLite—from scratch, in your language, in your IDE."

「親手重造你天天在用的工具」——這份 repo 用 awesome list 的最低保真度承載這個信念：不教 leetcode、不教 toy project，而是把學習路徑指向「從零造一個 production tool 的縮小版」。這條哲學讓它與 freeCodeCamp 那種「跟著做小範例」的教學徹底分流。

## 目標使用者與適用情境

中高階工程師想補強底層理解（OS、DB、Compiler）、自學者想跳出 leetcode 框架、面試準備者想做 portfolio project、教師找課程素材。**不適用**：完全初學者（多數教程預設熟悉一種語言與基本資料結構）、想要互動回饋的學習者（這份 repo 只給連結，互動式驗證要付費去 codecrafters.io）。

## 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [sindresorhus/awesome](https://github.com/sindresorhus/awesome) | sindresorhus/awesome 是「awesome 之 awesome」總目錄，跨主題；build-your-own-x 垂直聚焦在「from-scratch 重造」這一種教學形態，深度而非廣度 |
| [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) | freeCodeCamp 是端到端線上課程平台（內容 + 評測），主打初學者；build-your-own-x 只是入口連結，目標族群是已會寫程式、想往下挖的工程師 |
| [exercism/exercism](https://github.com/exercism/exercism) | Exercism 是程式語言練功題庫（小題目 + mentor 回饋）；build-your-own-x 不練語言而練系統設計，每個主題都是一個完整子系統 |

選型建議：要學一門新語言選 Exercism，要從零開始選 freeCodeCamp，**已經是工程師、想真正理解 Redis / Git / SQLite 怎麼運作**就翻 build-your-own-x（並考慮升級到 codecrafters.io 拿 CI 自動評分）。

## 外部評論

- 母公司 CodeCrafters 在 2024-11 獲 [TechCrunch 報導](https://techcrunch.com/2024/11/19/codecrafters-wants-to-challenge-seasoned-developers-with-hard-to-build-projects/)，文中明示這份 awesome list 是付費挑戰平台的引流入口，產品核心理念與 repo 同源。
- [Product Hunt CodeCrafters Reviews (2026)](https://www.producthunt.com/products/codecrafters/reviews) 評價普遍正面：「hands-on, build-by-doing learning that helps people understand tools like Redis, Git, and SQLite more deeply than theory-heavy courses」。
- 早期一次經典 HN 串：[Build Your Own X — Hacker News](https://news.ycombinator.com/item?id=32157759)（2022 年 7 月，依 ID 推估），一直被當作「想自學請從這 repo 開始」的標準回覆連結。
- [star-history 顯示此 repo 為 GitHub Global Rank #1](https://www.star-history.com/codecrafters-io/build-your-own-x/)，星數曲線呈長期慢速攀升、每隔一段時間出現尖峰跳躍，對應於 HN / Reddit 反覆爆紅。
- DEV Community 上的 [I found codecrafters.io](https://dev.to/abhijeetgavali/i-fount-codecraftersio-5gk4) 等個人心得文章把 repo 與付費平台一併推薦，描述為「the right level of guidance, helpful yet gives you a lot of freedom to explore」。
- 中文圈獨立深度評論較少，主要以「神級 GitHub 倉庫推薦」名單形式出現於微信 / 知乎，資料不足以做品質評估。

**為何今日（2026-04-25）重新登榜**：這份 repo 自 2018 起就是 HN 與 Reddit r/programming 的「常駐回憶殺」——每隔幾個月就會被新一批讀者重新提交、再次衝上首頁，這次很可能也是同樣的 recurring-trending 現象（搜尋未直接查到 4/25 的 HN 串，但 4/22 已有資料記錄它為 Global Rank #1，星數一路推到 49.4 萬，臨界值很低、很容易被任何一次 social share 推回 trending）。

## Release 狀態 / 時間軸

`gh api repos/codecrafters-io/build-your-own-x/releases` 回傳空陣列——**從未發 release**，這對於 markdown-only awesome list 屬正常情況。重要時間軸：

- **2018-05-09**：Daniel Stefanovic 建立 repo
- **2022 年中**：CodeCrafters 公司成立後接管 repo（owner 從個人帳號移到 organization）
- **2022-07**：HN 大規模討論串[（HN item 32157759）](https://news.ycombinator.com/item?id=32157759)
- **2026-02-21**：最後一次 push（即最近一次合併 PR）
- **2026-04-22**：星數突破 49.1 萬，被列為 GitHub Global Rank #1
- **2026-04-25**：再次出現於 GitHub Trending（首次納入本日報追蹤）

## 授權與社群

- **License**：`gh api` 回傳 `license: null`，但 [WebFetch 結果](https://github.com/codecrafters-io/build-your-own-x) 顯示專案聲稱採 CC0（public domain）；以 repo 內 LICENSE 檔為準（若無檔案則需澄清）。
- **量化鐵錨**：⭐ **494,484 stars** / 🍴 **46,833 forks** / 👀 **6,639 watchers** / 📂 **468 open issues** / 主要語言 Markdown 100%。Topics: `awesome-list, free, programming, tutorial-code, tutorial-exercises, tutorials`。Created 2018-05-09 → 至今約 **8 年**，平均年增約 6.2 萬 stars（換算每天 ~170 stars，幾乎是純被動有機成長）。
- **貢獻者結構**：danistefanovic 320 commits（原作者）、rohitpaulk 68（CodeCrafters 共同創辦人 Paul Kuruvilla）、sarupbanskota 26（CodeCrafters 共同創辦人）——三人合計即超過全部 commits 七成，其餘為 PR-only 貢獻者。
- **商業模式關係**：repo 是免費社群資產，母公司 [CodeCrafters](https://codecrafters.io/) 賣的是「Build your own Redis / Git / SQLite / Kafka / Claude」等互動式挑戰：免費可解前 2 stage，付費解鎖全部 stage 與 CI 評測。2026-01 roadmap 增「Build your own Claude」挑戰；2026-04 roadmap 加 Redis Optimistic Locking / AOF Persistence 擴充（[April 2026 Roadmap](https://forum.codecrafters.io/t/april-2026-roadmap/16016)）。

## 資料來源

**本體**
- [codecrafters-io/build-your-own-x（GitHub）](https://github.com/codecrafters-io/build-your-own-x)
- [CodeCrafters 官網](https://codecrafters.io/)
- [CodeCrafters pricing](https://codecrafters.io/pricing)
- [CodeCrafters challenges catalog](https://app.codecrafters.io/catalog)
- [April 2026 Roadmap — CodeCrafters Forum](https://forum.codecrafters.io/t/april-2026-roadmap/16016)
- [January 2026 Roadmap — CodeCrafters Forum](https://forum.codecrafters.io/t/january-2026-roadmap/15729)

**第三方評論**
- [Codecrafters wants to challenge seasoned developers — TechCrunch (2024-11-19)](https://techcrunch.com/2024/11/19/codecrafters-wants-to-challenge-seasoned-developers-with-hard-to-build-projects/)
- [CodeCrafters (YC S22) Reviews — Product Hunt](https://www.producthunt.com/products/codecrafters/reviews)
- [Build Your Own X — Hacker News (HN item 32157759)](https://news.ycombinator.com/item?id=32157759)
- [I found codecrafters.io — DEV Community](https://dev.to/abhijeetgavali/i-fount-codecraftersio-5gk4)
- [CodeCrafters: An Odd Ally Among Many — Medium](https://medium.com/@georgenyoropossum/rebuild-the-internet-one-project-at-a-time-f7c0a680c938)
- [star-history: codecrafters-io/build-your-own-x（Global Rank #1）](https://www.star-history.com/codecrafters-io/build-your-own-x/)

**同類工具**
- [sindresorhus/awesome](https://github.com/sindresorhus/awesome)
- [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp)
- [exercism/exercism](https://github.com/exercism/exercism)
- [jnv/lists](https://github.com/jnv/lists)

## 更新紀錄

### 2026-04-27
- **中斷一日後回榜**（4/26 跌出 Top 10，今日重返絕對榜 #4、首次進增長率榜 #9）。stars_today +1,074，總 stars 494,481 → 496,674（兩日內 +2,193），growth_rate 0.22%。
- 無新 release（`has_releases: false` 維持不變）。
- 觀察：500k stars 大山首次連續上榜（雖中斷一日），絕對榜名次從 #10 → #4 反而走高，反映 awesome-list 在「skills 周」中作為「親手造每一個 X」的元教材也被重新被翻出來討論。
