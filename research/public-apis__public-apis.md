---
repo: public-apis/public-apis
first_seen: 2026-04-29
last_updated: 2026-04-29
appearances: [2026-04-29]
growth_appearances: [2026-04-29]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材, 開源替代]
domain: 教學資源
form: 課程教材
themes: [開源替代]
---

# [public-apis/public-apis](https://github.com/public-apis/public-apis)

> 研究日期：2026-04-29
> 研究來源：<https://github.com/public-apis/public-apis>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[public-apis/public-apis](https://github.com/public-apis/public-apis) 是 GitHub 史上最大規模、人工維護的「免費 API 黃頁」——把超過 40 個類別、數千個可用免費 API 編成 Markdown 表格，每筆條目附帶授權方式、HTTPS、CORS 三項機讀欄位，讓開發者在挑 side project 資料源時不必自己 Google。

## 作者與起源

最早由英國前端講者 [toddmotto/public-apis](https://github.com/toddmotto/public-apis)（Todd Motto）在 2016 年建立，靠社群 PR 累積成全網最完整的 API list。2019 年 Todd 將 repo 移交給新成立的 `public-apis` GitHub 組織，由 [APILayer](https://apilayer.com/) 維運團隊繼續維護，後來在 2021–2022 年期間陸續發生 sponsor 替換、商業 API 置頂、降權其他 maintainer 等爭議事件（見「外部評論」），但**社群仍把這個 repo 當作事實標準**，stars 持續累積至 42.7 萬。

## 核心架構 / 主要概念

技術堆疊極度樸素——只有一份 `README.md` 與一份 `CONTRIBUTING.md`，加上 Python 寫的 lint / link-check 腳本（這也是 GitHub 把語言判定為 Python 的原因）。每個 API 條目固定欄位：`API 名稱（連結）| 描述 | Auth | HTTPS | CORS | Category`。類別目錄涵蓋 Animals、Anti-Malware、Authentication、Books、Cryptocurrency、Finance、Health、Machine Learning、Music、News、Weather 等 40+ 區塊。所有貢獻都走 PR + CI lint，避免格式漂移。

## 設計哲學

> "A collective list of free APIs"

刻意極簡：**人手 curation 勝過自動爬蟲**，README 即產品、不另開網站。一個免費 API 要進榜得有人寫 PR、通過 lint、由 maintainer review；這條看似低標的門檻，正是 42 萬星數之所以能撐住信噪比的關鍵。

## 目標使用者與適用情境

- **學生 / 自學者**：找 side project 的資料源（天氣、加密貨幣、開放政府資料）。
- **bootcamp 教師**：教 fetch API、教 OAuth flow 的素材庫。
- **黑客松團隊**：48 小時內快速挑可用 endpoint。
- **不**適用：需要 SLA、商用授權、或穩定 production 流量——榜上不少 API 屬個人 / 業餘維運，dead link 比例不低（HN 留言主要批評點）。

## 與類似專案的差異

| 對手 | 規模 | 與本專案的差異 |
|---|---|---|
| [toddmotto/public-apis](https://github.com/toddmotto/public-apis) | ~1.8k stars | **本專案的原始 fork 來源**，2019 後不再積極維護，已被 public-apis 組織取代 |
| [davemachado/public-api](https://github.com/davemachado/public-api) | 中型 | 提供 JSON API endpoint 直接消費 public-apis 資料，HN 評論認為「商業化更節制」 |
| [n0shake/Public-APIs](https://github.com/n0shake/Public-APIs) | 中型 | 同類 awesome list，區隔點是條目分類更細但更新頻率較低 |

選型建議：要**最完整 + 最新**選本專案；要**可程式化查詢**選 davemachado；對 APILayer 商業化反感可選 NotABug 上的 ad-free fork。

## 外部評論

- [Hacker News 討論串 (2019)](https://news.ycombinator.com/item?id=19075766)：好評肯定 TravisCI lint 維持文件一致性；負評集中在「listicle 為何需要 sponsor」與真正可用的 live data endpoint 稀少。
- [DEV Community: Public APIs situation](https://dev.to/yannbertrand/public-apis-situation-4101)：詳述 2021–2022 APILayer 將自家商業 API 置頂、降權 maintainer、移除 sponsor 名單的時間線，是社群對這個專案治理爭議的主要記錄。
- [anomie/public-apis (NotABug)](https://notabug.org/anomie/public-apis)：因不滿 README 廣告而出現的 ad-free fork，本身就是社群評論的具體行動。

## Release 狀態 / 時間軸

`gh api repos/public-apis/public-apis/releases` 回傳空陣列——**從未發過 GitHub Release**（`has_releases: false`）。此類 awesome list 的「版本」概念落在 git commit 與 PR merge 上，沒有 semver。關鍵時間軸：

- 2016-03-20：Todd Motto 建立原始 repo
- 2019：repo 轉移到 `public-apis` 組織
- 2021–2022：APILayer 治理爭議，社群出現 ad-free fork
- 2026-04-29：本次首登絕對榜，stars 427,941、單日 +600

## 授權與社群

- License：**MIT**
- Stars：**427,941**（GitHub 全站 awesome-list 類前段班）
- Forks：46,742
- Open issues：1,309（多為新 API 提案 PR）
- Watchers / Subscribers：4,596
- Topics：`api`, `apis`, `dataset`, `free`, `list`, `public-api`, `resources`
- 主要語言：Python（lint 腳本，README 為主體）
- Default branch：`master`
- 增長率（今日）：600 / 427,941 ≈ 0.14%——**stars/day 在這個量級是雜訊級**，能進絕對榜純粹靠存量勢能，並非新事件帶動。

## 資料來源

**本體**
- [public-apis/public-apis on GitHub](https://github.com/public-apis/public-apis)
- [APILayer 官網](https://apilayer.com/)

**第三方評論**
- [Hacker News (2019)](https://news.ycombinator.com/item?id=19075766)
- [DEV: Public APIs situation](https://dev.to/yannbertrand/public-apis-situation-4101)
- [anomie/public-apis (NotABug ad-free fork)](https://notabug.org/anomie/public-apis)

**同類工具**
- [toddmotto/public-apis](https://github.com/toddmotto/public-apis)
- [davemachado/public-api](https://github.com/davemachado/public-api)
- [n0shake/Public-APIs](https://github.com/n0shake/Public-APIs)

## 更新紀錄
