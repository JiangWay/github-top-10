---
repo: BigBodyCobain/Shadowbroker
first_seen: 2026-05-18
last_updated: 2026-05-18
appearances: [2026-05-18]
growth_appearances: []
has_releases: true
latest_release: v0.9.79
tags: [情報監測, 應用程式, 自架, 資料主權, 開源替代]
domain: 情報監測
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [BigBodyCobain/Shadowbroker](https://github.com/BigBodyCobain/Shadowbroker) 深度研究（2026-05-18 首次）

3 月初由個人開發者 [BigBodyCobain](https://github.com/BigBodyCobain) 公開的自架式 OSINT 地圖儀表板，把 60+ 條公開即時情資源——商務私人飛機、AIS 船舶、衛星 TLE、地震／火災／空品、CCTV、KiwiSDR、警消頻、GPS 干擾熱圖、GDELT 衝突事件——全部壓進同一張 MapLibre GL 地圖，可選掛 AI agent 當「分析師助手」自動找跨域關聯。AGPL-3.0、Python 為主、6,947 stars、1,094 forks、67 watchers，主分支由作者本人提交 127 commits，協作者 [anoracleofra-code](https://github.com/anoracleofra-code) 貢獻 120 次居次。

## 專案定位
不是又一個「Bellingcat 教學頁面」，而是把分散的公開資料 API 全部就地整合並可離線跑的單體儀表板。核心對標 [Flightradar24](https://www.flightradar24.com/) + [MarineTraffic](https://www.marinetraffic.com/) + USGS + Twitter 多視窗切換的痛點，目標是「democratize intelligence」——分析師不用再開五個分頁。

## 核心架構 / 主要概念
三層：(1) Next.js + MapLibre GL 前端、35+ 圖層即時 toggle、5 種視覺模式（dark／衛星／FLIR／NVG／CRT scanline）；(2) FastAPI + Python + APScheduler 後端、orchestrate 60+ 資料來源、含 hourly snapshot 的 Time Machine 回放；(3) 實驗性 InfoNet testnet——含 Sovereign Shell 治理機制、Dead Drop 私訊郵箱、Function Keys 匿名公民證雛形。AI agent 接入採 HMAC-SHA256 簽章 + timestamp/nonce 防重放，分 restricted／full 兩級權限，可下指令查圖層、放偵查 pin、控制地圖視角、推 Discord／Telegram 警報。

## 目標使用者
獨立調查記者、地緣政治分析師、業餘 OSINT 愛好者、紅隊／威脅情資團隊、想自架避免上傳查詢紀錄到 SaaS 的隱私敏感使用者。Docker compose 一鍵起，內建 ghcr.io 映像，適合 NAS / Portainer / Uncloud 部署。

## 與類似專案的差異
與 [Bellingcat](https://www.bellingcat.com/) 的方法論／教學模式互補（後者偏人工調查），與 [ADS-B Exchange](https://www.adsbexchange.com/) 等單一資料源 SaaS 不同的是 fused 多域信號到同一張地圖；與 [OpenCTI](https://github.com/OpenCTI-Platform/opencti) 等企業 STIX 平台不同的是面向公開 geospatial 即時流而非結構化威脅情資。InfoNet 治理層在 OSINT 工具中目前看不到第二家。

## 外部評論
- [Hacker News Show HN](https://news.ycombinator.com/item?id=47300102) 300+ 點，作者自承「電影駭客」美學是刻意的，動機是受夠多分頁切換。
- [Hackers-Arise 教學](https://hackers-arise.com/open-source-intelligence-osint-tracking-world-events-with-shadowbroker/) 把它列為現役 OSINT 工具示範。
- [Themenon Lab 評介](https://themenonlab.blog/blog/shadowbroker-osint-dashboard) 強調「tracks everything」的廣度。
- [GIGAZINE 報導](https://gigazine.net/gsc_news/en/20260401-shadowbroker-global-intelligence-map/) 點出 GPS jamming 即時圖層在日語圈引發關注。
- [Medium：Alborz Nazari](https://medium.com/@alborznazari4/shadowbroker-how-open-source-intelligence-layers-turn-raw-signals-into-analyst-findings-a54c770b3dac) 從分析師工作流角度拆解 layers→findings 的轉化。

命名顯然致敬 2016 年外洩 NSA Equation Group 工具的 [The Shadow Brokers](https://en.wikipedia.org/wiki/The_Shadow_Brokers) 駭客組織（該組織名又源自 Mass Effect 中販賣情報的角色），把「情資交易者」原型反轉成開源化、人人可用的對立面，是有意識的品牌諷喻而非巧合。

## Release 狀態
有 release。最新版 `v0.9.79`（2026-05-12 發布），版本號逼近 1.0 但仍標明 InfoNet／privacy primitives 為「scaffolded but not yet wired」、頻道應視為公開未加密。release manifest 隨 asset 附上。

## 授權與社群
AGPL-3.0（衍生自架服務需開源），主要由 [BigBodyCobain](https://github.com/BigBodyCobain) 與 [anoracleofra-code](https://github.com/anoracleofra-code) 兩人推進，第三位 [suranyami](https://github.com/suranyami) 17 commits，其餘為零星貢獻。1,094 forks 顯示自架社群活躍，但核心團隊資訊極少——作者真實身份、資金來源、長期維運計畫皆**資料不足**。
