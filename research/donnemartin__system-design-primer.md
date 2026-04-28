---
repo: donnemartin/system-design-primer
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

# [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)

> 研究日期：2026-04-29
> 研究來源：<https://github.com/donnemartin/system-design-primer>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer) 是一個以 README 為主體、配 Anki 卡片的開源「系統設計面試教科書」，把 DNS、CDN、負載均衡、快取、複寫、CAP、微服務等大規模系統的詞彙與權衡，整理成可一頁一頁讀完的清單與圖示。

## 作者與起源

作者 [Donne Martin](https://github.com/donnemartin) 在自介頁將自己定位為 Facebook（現 Meta）公共安全工程團隊的 Engineering Manager，自稱「trilingual in Geek, Marketing, and Customer-Speak」（[donnemartin.com](https://donnemartin.com/)）。題目要求查證的 AWS / Workday 經歷在自介頁與 README 皆未提及，**資料不足**。Repo 於 2017-02-26 建立，同年迅速登上 [Hacker News 首頁](https://news.ycombinator.com/item?id=13823979) 後一路長紅，至今 9 年累積 345,739 stars / 55,821 forks，是 GitHub 史上 stars 數前段班的非程式碼倉庫之一。

## 核心架構 / 主要概念

repo 主體是一份巨型 README（含繁中、簡中、日、韓等多語翻譯），章節涵蓋三層：(1) 基礎名詞——performance vs scalability、latency vs throughput、CAP、一致性 / 可用性模式；(2) 元件層——DNS、CDN、load balancer、reverse proxy、SQL/NoSQL、快取、async、通訊協定；(3) 解題層——Pastebin、TinyURL、Mint、社交動態、搜尋引擎等經典面試題的「題目—假設—估算—API—資料模型—架構—Scale up」七步骨架。配套三套 Anki 卡片（System Design / 練習題 / OOD 練習）做間隔複習。

## 設計哲學

> "Learn how to design large-scale systems. Prep for the system design interview. Includes Anki flashcards."

口號就是設計主張：把「學系統設計」與「準備面試」綁成同一件事，用 community-curated 的開源 README 取代付費課程，並透過 Anki 把概念塞進長期記憶。

## 目標使用者與適用情境

主受眾是準備 FAANG / 一線科技公司系統設計輪面試的工程師，以及想補齊大規模分散式系統共同詞彙的後端 / 平台工程師。**不適用**情境：嵌入式系統、純前端、需要法規合規（金融 / 醫療）的 brownfield 重構，這些在 [HN 串](https://news.ycombinator.com/item?id=13823979) 中被多位評論者點名為缺漏。

## 與類似專案的差異

| 對手 | 形態 | 與本專案的差異 |
|---|---|---|
| [ByteByteGo](https://bytebytego.com/) | 付費課程 + 書 | 由 Alex Xu 撰寫，圖示精美但封閉收費；本專案免費、可 PR、社群維護 |
| [DesignGurus](https://www.designgurus.io/) | 付費平台 | 以「Grokking the System Design Interview」聞名，著重題型套路；本專案更重定義與權衡 |
| [Salah856/System-Design](https://github.com/Salah856/System-Design) | 開源筆記 | 規模較小、多為連結合集；本專案是單一巨型 README，自包含程度高 |

選型建議：要免費、英中對照、自學節奏選本專案；要有解說影片與題庫批改選 ByteByteGo / DesignGurus。

## 外部評論

- [The System Design Primer | Hacker News（2017）](https://news.ycombinator.com/item?id=13823979)：上架即上首頁，普遍稱讚「beautiful document, clearly written and clearly drawn」；批評集中在過度偏向 public IP services、缺 OAuth/OIDC/SAML 與 identity 章節、對微服務假設過於樂觀、未談 brownfield / 法規。
- [Bucketing — System Design 系統設計學習地圖（Medium 中文）](https://medium.com/bucketing/system-design-%E7%B3%BB%E7%B5%B1%E8%A8%AD%E8%A8%88%E5%AD%B8%E7%BF%92%E5%9C%B0%E5%9C%96-68f98e8c3df4)：把本 repo 列為中文圈準備 system design 面試的主要起點之一。
- [kevingo/system-design-primer-zh-tw](https://github.com/kevingo/system-design-primer-zh-tw)：繁體中文翻譯計畫存在本身即說明其在華語社群滲透度。

## Release 狀態 / 時間軸

`gh api .../releases` 回傳空陣列，**尚無 GitHub Release**——本專案以滾動 README 維護，無版本概念。時間軸：2017-02-26 建 repo → 2017-03 登 HN 首頁 → 2026-04-28 仍有更新（`updated_at`）。

## 授權與社群

- License：`NOASSERTION`（README 內標註 CC BY 4.0 與 MIT 混合，但 GitHub 偵測不到 SPDX）
- 量化鐵錨：345,739 stars / 55,821 forks / 6,839 subscribers / 529 open issues / 128 contributors
- 主要語言：Python（解題範例），主體為 Markdown
- Topics：`design`、`interview`、`system`、`web-application`
- 增長速率：今日 +734 stars，9 年下來日均 ~104 stars，仍是非程式碼類 repo 的長青樹

## 資料來源

**本體**
- [GitHub repo](https://github.com/donnemartin/system-design-primer)
- [作者自介頁 donnemartin.com](https://donnemartin.com/)
- [作者 GitHub 主頁](https://github.com/donnemartin)

**第三方評論**
- [Hacker News 2017 thread](https://news.ycombinator.com/item?id=13823979)
- [Hacker News 2023 thread](https://news.ycombinator.com/item?id=38056547)
- [Bucketing — System Design 學習地圖](https://medium.com/bucketing/system-design-%E7%B3%BB%E7%B5%B1%E8%A8%AD%E8%A8%88%E5%AD%B8%E7%BF%92%E5%9C%B0%E5%9C%96-68f98e8c3df4)

**同類工具**
- [ByteByteGo](https://bytebytego.com/)
- [DesignGurus](https://www.designgurus.io/)
- [Salah856/System-Design](https://github.com/Salah856/System-Design)
- [kevingo/system-design-primer-zh-tw](https://github.com/kevingo/system-design-primer-zh-tw)

## 更新紀錄
