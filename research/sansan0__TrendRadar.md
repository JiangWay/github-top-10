---
repo: sansan0/TrendRadar
first_seen: 2026-04-22
last_updated: 2026-04-23
appearances: [2026-04-22, 2026-04-23]
growth_appearances: [2026-04-22, 2026-04-23]
has_releases: false
latest_release: null
tags: [情報監測, 應用程式, 自架, 資料主權, 開源替代]
domain: 情報監測
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [sansan0/TrendRadar](https://github.com/sansan0/TrendRadar)

> 研究日期：2026-04-22
> 研究來源：<https://github.com/sansan0/TrendRadar>
> 觸發原因：首次上絕對榜（stars_today 584，累計 53,534 ⭐）
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-04-22 首次）

### 專案定位

[sansan0/TrendRadar](https://github.com/sansan0/TrendRadar) 是一套**面向中文圈普通用戶的 AI 輿情雷達**——把微博、知乎、抖音、B 站、今日頭條、百度熱搜、澎湃、鳳凰、華爾街見聞、財聯社等 30+ 熱榜來源聚到一張表上，再加上關鍵字過濾、AI 摘要/翻譯/情感分析，最後把濃縮後的簡報透過企業微信／飛書／釘釘／Telegram／Bark／ntfy／Slack 等 10 多條通道推到手機。倉庫於 **2025-04-28** 建立，不到一年衝到 53k stars、23k forks，在中文 GitHub 社群已是代表性的「熱榜聚合 + AI 解讀」工具。

### 核心架構 / 主要概念

- **語言與技術**：純 Python 專案，資料層原本靠 GitHub Actions 定時抓取＋R2/S3 遠端儲存，v4.0 後引入 SQLite，允許 Docker/本地部署自持資料。
- **三種報告模式**：`daily`（整日匯總）、`current`（即時快照）、`incremental`（只推新冒出的話題），並以 timeline 配不同時段的篩選策略。
- **AI 層**：v6.5 引入「自然語言描述興趣」取代手動關鍵字；v6.6 強化瀏覽器 HTML 報告。透過 **MCP server** 暴露 13 種工具，讓 Claude / Gemini 直接以對話查詢趨勢、做情感洞察與相似檢索。
- **部署**：GitHub Actions（雲端、免自架）、Docker（多架構）、本地 Windows/Mac/Linux 三選一，強調「資料本地/雲端自持」。
- **授權**：GPL-3.0；作者 [sansan0](https://github.com/sansan0) 單人貢獻 226 commits，核心一人專案。

### 目標使用者

投資人、自媒體、公關／品牌、以及單純想逃離演算法同溫層的一般讀者。少數派作者飄雷直言：「以前，我們是演算法的獵物，被鎖在各大平台推送演算法打造的資訊繭房裡。」（見 [少數派 NAS 部署教程](https://sspai.com/post/105506)）

### 與類似專案的差異

- 對比 [koala73/worldmonitor](https://github.com/koala73/worldmonitor)：worldmonitor 以 3D 地球＋65 條 OSINT 源為主、鎖定地緣／金融情資的英語受眾；TrendRadar 完全聚焦**中文平台熱榜**與社群情緒，且以「推播到手機」為終點。
- 對比 [RSSNext/Follow](https://github.com/RSSNext/Follow)：Follow 是通用 RSS 閱讀器、重在內容消費體驗；TrendRadar 重在**過濾與警報**——它假設你不想讀所有新聞，只想知道哪些事被大量平台同時熱議。
- 對比社群裡常被一起討論的 [666ghj/BettaFish](https://github.com/666ghj/BettaFish)（多 Agent 輿情分析）：根據 [fuyuan7 拆解文](https://www.fuyuan7.com/?post=246)，「BettaFish 適合寫深度報告、做品牌危機應對；TrendRadar 勝在部署簡單、推送及時、介面友好，但分析深度不如 BettaFish」。兩者屬互補而非替代。

### 外部評論

- [少數派《NAS 部署 TrendRadar 手把手教程》](https://sspai.com/post/105506)：「這種對資訊掌控感真的拉滿了情緒價值……我們終於可以翻身成為資訊的主人。」
- [B 站《從熱點捕捉到輿情分析 AI 一站式搞定》](https://www.bilibili.com/video/BV1QsC7B3Ee2/)：把 TrendRadar 與 BettaFish 並稱「兩款開源神器效率封神」。
- [火山引擎開發者社群專文](https://developer.volcengine.com/articles/7582491207247986730) 與 [騰訊雲開發者社群](https://cloud.tencent.cn/developer/article/2639584) 都以「GitHub 爆火 24K Star 的開源熱點雷達」定調，屬中文技術媒體的主流推薦。
- fork 生態活躍：[joyce677/TrendRadar](https://github.com/joyce677/TrendRadar)、[xu756/TrendRadar](https://github.com/xu756/TrendRadar) 等皆沿用原 README 並自行部署示範。

### Release 狀態

`gh api repos/sansan0/TrendRadar/releases` 回傳空陣列——**尚無 GitHub Release**。版本號（v4.0、v6.0、v6.5、v6.6 等）僅在 README 與 commit 中呈現，作者靠 master 直接迭代，這也解釋了為何 issue 區常見「哪個版本最穩」的提問。

### 授權與社群

- 授權：GPL-3.0（強 copyleft，fork 再散佈須同授權）。
- 主線貢獻高度集中於 [sansan0](https://github.com/sansan0) 本人（226 commits），其餘 contributor 多為一次性 PR。
- 社群熱度集中於微信公眾號（作者在 README 導流）、B 站影片與少數派文章，**屬典型中文圈單人開源項目**——爆量 fork（23k+）與相對少的深度合作者形成強烈對比，也是近一年中文 GitHub「個人爆款」模式的代表之一。

## 更新紀錄

### 2026-04-23
- **連續第 2 天雙榜**（絕對榜 #9，stars_today +932，growth_rate 1.71%；增長率榜 #5）
- 無 GitHub Release（`has_releases: false` 維持）
- 觀察：stars 從 53,534 升至 54,355（+821），2 日累積 +1,405；首次上榜後熱度未退，中文圈自架輿情監測賽道的代表作地位鞏固
