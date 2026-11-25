---
repo: nginx/nginx
first_seen: 2026-11-26
last_updated: 2026-11-26
appearances: [2026-11-26]
growth_appearances: [2026-11-26]
has_releases: true
latest_release: release-1.31.10
tags: [網路工具, 應用程式, 自架]
domain: 網路工具
form: 應用程式
themes: [自架]
---

# [nginx/nginx](https://github.com/nginx/nginx)

> 研究日期：2026-11-26
> 研究來源：https://github.com/nginx/nginx
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[nginx/nginx](https://github.com/nginx/nginx) 是 NGINX Open Source 的官方主倉，用 C 寫成的 web server、reverse proxy、load balancer 與 content cache，README 自稱「world's most popular Web Server」。同一個行程也處理 TCP/UDP（stream）與 mail proxy。倉庫描述為「The official NGINX Open Source repository.」，topics 含 http3、quic、tls、reverse-proxy。

## 作者與起源

Igor Sysoev 在 2004 年公開釋出 NGINX（原為解決 C10K 問題的 web server），GitHub 貢獻榜第一名 `igorsysoev` 有 3,683 筆 commit，第二名 `mdounin`（Maxim Dounin）1,710 筆。這兩段背景（2004 年釋出、NGINX Inc. 於 2019 年被 F5 收購）來自一般背景知識，本次未逐項重新查證來源。

這個 GitHub repo 的地位有過變化：

- 2015-06-23 建立，長期是 Mercurial 倉庫的 mirror（[2015 年 mirror 公告串](https://mailman.nginx.org/pipermail/nginx-devel/2015-July/007146.html)）。
- 2024-09-06，官方在 [NGINX Open Source Moves to GitHub](https://blog.nginx.org/blog/nginx-open-source-moves-to-github) 宣布 GitHub 成為主倉，開始收 Pull Request，issue 改走 GitHub Issues，論壇改為 GitHub Discussions。hg.nginx.org 現在頁面標示已停用。
- 分支：[freenginx](https://freenginx.org) 由前核心開發者 Maxim Dounin 另立，GitHub 上有 [freenginx/nginx](https://github.com/freenginx/nginx)（description 為 hg 倉庫的 mirror，截至今日 182 stars、13 forks）。分叉原因本次未查證，資料不足。

倉庫另有 `mdocguard`、`pluknet`、`arut`、`vlhomutov`、`VBart` 等貢獻者（commit 數 424–768 不等），貢獻者分頁共約 121 頁（每頁 1 人，即約 121 位）。

## 核心架構 / 主要概念

目錄結構（`gh api` 實測）：`src/`（核心與模組）、`auto/`（configure 腳本）、`conf/`（預設設定）、`contrib/`（含 vim 語法檔）、`docs/`、`misc/`。語言佔比：C 6.81 MB，Vim Script 114 KB，XS 27 KB，Perl 6.8 KB。

README 的「How it works」描述三個概念：

- **Modules**：功能以模組實作（http、stream、mail 等），可編譯進去或做成 dynamic module，例如 [nginx/njs](https://github.com/nginx/njs)（JavaScript 擴充）。
- **Configurations**：以 `nginx.conf` 的 directive 與 context（http / server / location）宣告，樹狀結構。
- **Runtime**：一個 master process 加多個 worker process，worker 以事件驅動（非阻塞 I/O）處理連線。

發行分兩條線：mainline 從 master branch 建置，含最新功能；stable 只收關鍵修補的 backport（今日 tag 並行有 1.31.x 與 1.30.x）。

## 設計哲學

README 的定位是給初學者的結構化介紹，把細節導向 nginx.org 文件：

> "The goal of this README is to provide a basic, structured introduction to NGINX for novice users."

解讀：官方把 repo 當入口，行為規格放在 nginx.org 的 directive reference。我找不到專門的 ETHOS 類文件，設計原則（事件驅動、低記憶體）資料不足，不從 README 以外硬補。可驗證的事實是：授權為 BSD-2-Clause，商業版本（NGINX Plus、企業支援）由 F5 提供。

## 目標使用者與適用情境

- 適用：需要靜態檔案服務、reverse proxy、TLS 終結、HTTP/2 與 HTTP/3、rate limiting、content caching 的自架環境；README 的 Getting started 就是 SSL、load balancing、rate limiting、content caching 四項。
- 適用：需要 L4 的 TCP/UDP proxy（stream 模組）或 mail proxy。
- 不適用：想要零設定自動 HTTPS 的小型部署（見 caddyserver 一列）；需要 xDS 動態設定、service mesh 的情境（外部比較文章指出 nginx 不實作 xDS，見下文外部評論）。
- 注意：master 分支是 mainline 開發線，正式環境要選 stable 或 mainline 需自行判斷。

## 與類似專案的差異

| 對手 | 與 nginx 的差異 | 什麼時候選誰 |
|---|---|---|
| [caddyserver/caddy](https://github.com/caddyserver/caddy)（29,292 stars） | Caddy 以 Go 撰寫，預設自動 HTTPS，設定較短；nginx 用 C，設定自由度高，需自行配置憑證 | 小團隊、要快速上線選 Caddy；既有 nginx 生態、細緻調校選 nginx |
| [envoyproxy/envoy](https://github.com/envoyproxy/envoy) | Envoy 為 CNCF 專案，面向 service mesh 與動態設定（xDS）；不提供靜態檔案服務 | Kubernetes / mesh 選 Envoy；一般 web 邊界與靜態檔選 nginx |
| [freenginx](https://freenginx.org)（[freenginx/nginx](https://github.com/freenginx/nginx)，182 stars） | 從同一份程式碼分出的分支，由前核心開發者維護，由 F5 以外的人主導，規模遠小於本倉 | 偏好非 F5 主導的路線選 freenginx；要官方 mainline 與商業支援選 nginx/nginx |

star 數取自今日 `gh api`。

## 外部評論

搜尋範圍：WebSearch（nginx vs Caddy vs Envoy、GitHub 搬遷、近期 CVE）。未直接取得 Hacker News、Reddit、PTT 或中文社群的相關討論串，這部分資料不足。找到的第三方內容如下，皆為部落格或安全媒體：

- [Caddy vs Nginx in 2026: Which Reverse Proxy Should You Run（DEV Community）](https://dev.to/pickuma/caddy-vs-nginx-in-2026-which-reverse-proxy-should-you-run-4h9i)：比較 Caddy 與 nginx 的運維成本。本次僅見搜尋摘要，未逐篇細讀，此文結論不在此轉述。
- [Nginx vs Envoy: Which Proxy to Self-Host（DEV Community）](https://dev.to/selfhostingsh/nginx-vs-envoy-which-proxy-to-self-host-2182)：搜尋摘要中提到 Envoy 不能服務靜態檔案、service mesh 以 xDS 動態設定，nginx 不實作 xDS。
- [Caddy 2.8 vs Nginx 1.26 static file serving benchmark（DEV Community）](https://dev.to/johalputt/caddy-28-vs-nginx-126-static-file-serving-speed-benchmark-2026-2o1e)：宣稱 Caddy 在 1KB 靜態檔勝出。數字來源與版本與其他文章不一致，可信度低，僅列為例。
- [NGINX fixes 5 flaws（The Hacker News，2026-10）](https://thehackernews.com/2026/10/nginx-fixes-5-flaws-including-possible.html)：標題顯示 2026-10 有一批 nginx 漏洞修補。我抓取該頁收到 HTTP 403，內文未讀到，細節資料不足。

今日上榜原因：GitHub 上今日 +174 stars（growth 0.52%）。時間上，release-1.31.10 與 release-1.30.8 在 2026-11-23 發佈，release-1.31.9 在 2026-11-18 發佈；1.31.10 的 release note 稱修補 ssl_early_data 的 excessive CPU usage 弱點。我另查該 CVE 編號（release note 記為 CVE-2026-132779）時，搜尋沒找到對應紀錄，因此不採信該編號。發佈與上榜的因果關係無證據，資料不足。

## Release 狀態 / 時間軸

GitHub Releases 共 38 筆（`gh api`），tag 以 `release-X.Y.Z` 命名；最新為 [release-1.31.10](https://github.com/nginx/nginx/releases/tag/release-1.31.10)。release 清單最舊一筆為 release-1.27.2（2024-10-29），較早的版本只有 tag，最舊的 tag 是 release-1.15.5。

| 版本 | 日期 | 備註 |
|---|---|---|
| 1.27.2 | 2024-10-29 | GitHub Releases 中最早一筆 |
| 1.28.0 | 2025-04-24 | stable 線 |
| 1.29.0 | 2025-06-25 | mainline |
| 1.30.0 | 2026-04-14 | stable 線 |
| 1.31.0 | 2026-05-13 | mainline |
| 1.31.9 | 2026-11-18 | 與 1.30.7 同日 |
| 1.31.10 | 2026-11-23 | 與 1.30.8 同日，release note 稱修補 ssl_early_data CPU 耗用問題 |

2026-09-01 之後共發佈 10 筆 release，節奏約每週一版。最近 commit 例：2026-11-10 的「Validated buffer sizes in send chain callbacks」，另有 2026-08 到 2026-10 的 resolver 與路徑處理修補。

## 授權與社群

- 授權：BSD-2-Clause。
- 33,325 stars、8,401 forks、495 open issues（含 PR）；建立於 2015-06-23，最後 push 2026-11-25。
- 貢獻者約 121 位；topics：content-cache、http、http2、http3、https、load-balancer、mail-proxy-server、nginx、quic、reverse-proxy、security、tcp-proxy-server、tls、udp-proxy-server、web-server。
- 增長速率：今日 +174（0.52%），遠低於新專案常見的單日 5% 以上，這是長壽老倉的背景值。
- 社群管道：GitHub Issues、GitHub Discussions，另有 community.nginx.org 論壇（README badge）。

## 資料來源

- **本體**：
  - [github.com/nginx/nginx](https://github.com/nginx/nginx)
  - [nginx.org](https://nginx.org/)
  - [release-1.31.10](https://github.com/nginx/nginx/releases/tag/release-1.31.10)
  - [NGINX Open Source Moves to GitHub](https://blog.nginx.org/blog/nginx-open-source-moves-to-github)
  - [hg.nginx.org](https://hg.nginx.org/)
- **第三方評論**：
  - [DEV：Caddy vs Nginx 2026](https://dev.to/pickuma/caddy-vs-nginx-in-2026-which-reverse-proxy-should-you-run-4h9i)
  - [DEV：Nginx vs Envoy](https://dev.to/selfhostingsh/nginx-vs-envoy-which-proxy-to-self-host-2182)
  - [DEV：Caddy 2.8 vs Nginx 1.26 benchmark](https://dev.to/johalputt/caddy-28-vs-nginx-126-static-file-serving-speed-benchmark-2026-2o1e)
  - [The Hacker News：NGINX fixes 5 flaws](https://thehackernews.com/2026/10/nginx-fixes-5-flaws-including-possible.html)
  - [nginx-devel 2015 mirror 公告串](https://mailman.nginx.org/pipermail/nginx-devel/2015-July/007146.html)
- **同類工具**：
  - [caddyserver/caddy](https://github.com/caddyserver/caddy)
  - [envoyproxy/envoy](https://github.com/envoyproxy/envoy)
  - [freenginx.org](https://freenginx.org)
  - [freenginx/nginx](https://github.com/freenginx/nginx)
  - [nginx/njs](https://github.com/nginx/njs)

## 更新紀錄
