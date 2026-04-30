---
repo: HunxByts/GhostTrack
first_seen: 2026-04-29
last_updated: 2026-05-01
appearances: [2026-04-29, 2026-04-30, 2026-05-01]
growth_appearances: [2026-04-29, 2026-04-30, 2026-05-01]
has_releases: false
latest_release: null
tags: [資安, 應用程式, 自架]
domain: 資安
form: 應用程式
themes: [自架]
---

# [HunxByts/GhostTrack](https://github.com/HunxByts/GhostTrack)

> 研究日期：2026-04-29
> 研究來源：<https://github.com/HunxByts/GhostTrack>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[HunxByts/GhostTrack](https://github.com/HunxByts/GhostTrack) 是一支以 Python 寫成、可在 Linux 與 Termux 跑的選單式 OSINT 蒐集工具，把 IP 定位、手機號碼歸屬與使用者名稱社群比對三件事整合進同一個 CLI——**立場偏攻擊性偵蒐（red-team / 私人調查）**，不是防禦工具。

## 作者與起源

作者帳號 [HunxByts](https://github.com/HunxByts)（自稱 K1LLU），印尼背景，topics 標有 `indonesia`、`fyp`、`termux-tool`，典型「印尼 Termux 駭客腳本圈」產物。Repo 建於 2023-04-15，最新一次 push 為 2024-01-11，倉庫實質已停滯約 15 個月，但 stars 從 2026-04-28 一日 +976 暴衝至 10,427——爆紅成因更可能是某個 TikTok / YouTube 教學短片或 Termux 圈論壇文章重新引流，而非作者本人推動。

## 核心架構 / 主要概念

主程式 `GhostTR.py` 走純文字選單，三大模組：（1）**IP Tracker**：可串接 [thewhiteh4t/seeker](https://github.com/thewhiteh4t/seeker) 拿瀏覽器 geolocation；（2）**Phone Tracker**：呼叫 `phonenumbers` 類函式庫解析國碼與電信商；（3）**Username Tracker**：跨社群比對帳號存在性，類似 [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock) 的精簡版。整支專案只有 **11.5 KB Python**，本質是把第三方 API 與既有套件包成一張選單。

## 設計哲學

> "Useful tool to track location or mobile number, so this tool can be called osint or also information gathering."

譯：「一支實用的位置 / 手機號碼追蹤工具，所以也可以叫它 OSINT 或情報蒐集工具。」README 並沒有任何法律警語或 responsible-use 聲明——這是它與其他較主流 OSINT 套件最大的氣質差異。

## 目標使用者與適用情境

目標族群：Termux 手機端腳本玩家、學生 CTF / 滲透練習、印尼 / 東南亞自學駭客圈。**不適用**於：需要法庭可採信證據鏈的正式數位鑑識；任何未取得對象授權的真人追蹤——後者在多數司法管轄下構成跟蹤騷擾或個資法違規。

## 與類似專案的差異

| 對手 | 本專案的差異 |
|---|---|
| [thewhiteh4t/seeker](https://github.com/thewhiteh4t/seeker) | Seeker 走「釣魚連結誘騙瀏覽器吐 GPS」路線，需架 web server；GhostTrack 主打離線資料庫式查號，但 IP 模組仍建議外掛 Seeker。 |
| [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock) | Sherlock 專注 username 跨站搜尋、有完整 maintainer 團隊；GhostTrack 的 username 模組功能子集更小，但把 IP / phone / username 三合一封進一個選單，對 Termux 手機端使用者門檻更低。 |

選型建議：要嚴肅 OSINT 工作流選 [Sherlock](https://github.com/sherlock-project/sherlock) + 商用 phone API；要在手機上一鍵跑示範才選 GhostTrack。

## 外部評論

- [BrightCoding：GhostTrack & Open-Source OSINT Tools 2026 Guide](https://www.blog.brightcoding.dev/2026/01/09/ghosttrack-open-source-osint-tools-the-complete-2026-guide-to-ethical-location-mobile-number-tracking/)——把它列為 2026 年「ethical OSINT」入門工具，但通篇強調必須先取得授權；側面反映原 README 缺乏聲明的問題需要第三方補上。
- [Termux 教學站：GhostTrack in Termux – Installation, Usage & Basic Commands](https://termux.achik.us/ghosttrack-in-termux-installation-usage-basic-commands/)——以「任何號碼都可追」為賣點的安裝教學，幾乎不提合法邊界；正是 responsible disclosure 與被濫用風險的典型案例。
- [innovirtuoso：GhostTrack v2.2 A Practical, Ethical OSINT Tool](https://innovirtuoso.com/osint-tools/ghosttrack-v2-2-a-practical-ethical-osint-tool-for-ip-phone-and-username-intelligence/)——標題冠上「Ethical」，內容仍是功能展示。

未見顯著 HN / Reddit 串討論，主流資安媒體未報導，**深度技術評論資料不足**。

## Release 狀態 / 時間軸

`gh api repos/HunxByts/GhostTrack/releases` 回傳空陣列——從未發過 GitHub Release。README 內自稱版本 v2.2，但僅以提交訊息形式存在。時間軸：2023-04-15 建立 → 2024-01-11 最後一次 push（停滯）→ 2026-04-28 單日 +976 stars 衝榜。

## 授權與社群

**License：無**（`license: null`，repo 未掛任何授權檔）——技術上意味著預設保留所有權利，第三方再散布或商用法律風險高。鐵錨：10,427 stars / 1,469 forks / 77 open issues / 116 subscribers / 2 contributors（[HunxByts](https://github.com/HunxByts) 22 commits、[bakaemon](https://github.com/bakaemon) 1 commit）；語言 100% Python，總計 11,559 bytes；topics 含 `osint`、`hacking-tool`、`pentesting`、`termux`、`information-gathering`。**近 15 個月零 commit，但 stars / forks 持續累積**——這是「教學素材型 repo」的典型曲線，社群維護幾乎全靠 fork 與第三方文章。

## 資料來源

**本體**
- [HunxByts/GhostTrack（GitHub repo）](https://github.com/HunxByts/GhostTrack)
- [GhostTrack/README.md](https://github.com/HunxByts/GhostTrack/blob/main/README.md)
- [作者頁 HunxByts (K1LLU)](https://github.com/HunxByts)

**第三方評論**
- [BrightCoding 2026 OSINT Guide](https://www.blog.brightcoding.dev/2026/01/09/ghosttrack-open-source-osint-tools-the-complete-2026-guide-to-ethical-location-mobile-number-tracking/)
- [Termux achik.us GhostTrack 教學](https://termux.achik.us/ghosttrack-in-termux-installation-usage-basic-commands/)
- [innovirtuoso GhostTrack v2.2 介紹](https://innovirtuoso.com/osint-tools/ghosttrack-v2-2-a-practical-ethical-osint-tool-for-ip-phone-and-username-intelligence/)
- [offsec.tools 工具索引](https://offsec.tools/tool/ghosttrack)

**同類工具**
- [thewhiteh4t/seeker](https://github.com/thewhiteh4t/seeker)
- [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock)

## 更新紀錄
