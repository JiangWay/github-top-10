---
layout: page
title: 關於本站
kicker: About
summary: 一個每日觀察 GitHub trending 前十名專案，並對「值得寫一篇」的專案做深度研究的紙感技術誌。
permalink: /about/
---

## 做什麼

每天從 [github.com/trending](https://github.com/trending) 抓取當日漲幅最高的十個專案，紀錄為一篇**每日觀察**，附上：

- 完整的十名排行（⭐ 總星 / ⭐ 今日漲幅 / 類型 / 語言）
- 依 `stars_today / stars_total` 計算的**增長率榜 Top 10**
- 當天的主題結晶——**每日一字**
- 與前一日比對的**週趨勢**（增長最快 / 被踢出 / 新進榜）

當一個專案**首次進入 Top 10** 或**連續三天登上增長榜**，會自動觸發一份長篇的**深入研究**：專案定位、核心架構、目標使用者、與類似專案的差異、外部評論、Release 狀態、授權與社群。

## 為什麼

趨勢榜每分鐘都在翻動，真正重要的變化往往淹沒在雜訊裡。這個站的目標不是再做一個「即時榜」，而是用紙本閱讀的節奏把**值得被記住的專案**留下來——慢一點、但更有脈絡。

## 資料來源

- 趨勢榜：[github.com/trending](https://github.com/trending)
- 專案 metadata：GitHub REST API（`gh api repos/{owner}/{repo}`）、Releases
- 外部評論：Hacker News、Reddit、Twitter / X、個人部落格、中文社群

## 聯絡

- 意見回饋 / 勘誤：至本站 GitHub repo 開 Issue
- Email：ru8jo0312 [at] gmail.com

## 授權

本站內容採用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hant) 授權：可自由轉載、改編，請標示來源與連結。站上所引用之第三方專案保留各自授權條款。
