---
repo: pi-hole/pi-hole
first_seen: 2026-04-21
last_updated: 2026-04-21
appearances: [2026-04-21]
growth_appearances: []
has_releases: true
latest_release: v6.4.1
tags: [網路工具, 應用程式, 自架, 資料主權, 開源替代]
domain: 網路工具
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [pi-hole/pi-hole](https://github.com/pi-hole/pi-hole) — 家用網路的 DNS 黑洞，12 年後再次擠上 GitHub Trending

> 研究日期：2026-04-21
> 研究來源：<https://github.com/pi-hole/pi-hole>
> 觸發原因：首次上絕對榜 #9（⭐ 57,039 / 今日 +154）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[pi-hole/pi-hole](https://github.com/pi-hole/pi-hole) 是一個以 DNS 層攔截廣告、追蹤與惡意網域的「網路級黑洞」，把 ad-blocker 從瀏覽器外掛搬進整個家用網路。

它最獨特的鉤點不是「擋廣告」，而是**不需要在任何終端裝置裝軟體**——智慧電視、遊戲機、IoT 溫控器這些沒法裝 uBlock 的裝置，只要把 DNS 指向 Pi-hole 就集體受保護。

## 作者與起源

Pi-hole 由 [Jacob Salmela](https://github.com/jacobsalmela) 在 2014 年 6 月啟動（repo 建立於 2014-06-08），初衷只是想用手邊的 Raspberry Pi 把家裡的橫幅廣告擋掉。計畫很快脫離單人 side project，演化成由 [Pi-hole LLC](https://pi-hole.net/) 與社群共同維護的非營利組織，核心維護者包括 [@DL6ER](https://github.com/DL6ER)、[@PromoFaux](https://github.com/PromoFaux) 等。

**為什麼是 2026 年 4 月突然回到 Trending？** 三條線索剛好湊齊：

1. **v6.4.1 安全更新（2026-04-03）**：官方一次揭露多個 XSS、HTML injection 與 FTL CLI 授權繞過 CVE（詳見 [官方 blog](https://pi-hole.net/blog/2026/04/03/pi-hole-ftl-v6-6-web-v6-5-and-core-v6-4-1-released/)），同步釋出 `resolver.macNames` 等新 config option。
2. **v6 大改版的長尾效應**：2025 年 2 月釋出的 v6 把 lighttpd + PHP 整組丟掉、把 REST API 塞進 FTL binary，是 repo 十年來最大的重寫。一年下來各種遷移文、效能比較、社群爭論仍在擴散。
3. **AdGuard Home 比較潮**：2026 年多篇「Pi-hole vs AdGuard Home」評測（見下方外部評論）讓一批新用戶回流評估，連帶 star 回彈。

## 核心架構 / 主要概念

- **DNS sinkhole**：Pi-hole 取代家裡路由器的 DNS server，當裝置查詢 `doubleclick.net` 這類廣告網域時，直接回 `0.0.0.0`，廣告請求不會發出。
- **FTL（Faster Than Light）**：C 寫的本地 DNS resolver（fork 自 dnsmasq），負責查詢、log、統計。v6 開始把 web server 與 REST API 都內嵌進 `pihole-FTL`，單一 binary 一肩扛下。
- **Gravity**：定期從社群維護的 blocklist（[StevenBlack/hosts](https://github.com/StevenBlack/hosts) 等）把數十萬筆廣告網域合併到本地 SQLite。
- **Web 管理介面**：Responsive dashboard 顯示即時查詢、封鎖率、top client / top domain；v6 後的 UI 與 REST API 完全重寫。
- **DHCP 選配**：可直接取代路由器當 DHCP server，讓新裝置加入網路時自動掛上 Pi-hole。
- **部署形態**：最初設計給 Raspberry Pi，但實務上任何 Linux box（含 [pi-hole/docker-pi-hole](https://github.com/pi-hole/docker-pi-hole)）都能跑；企業部署甚至能扛到每天數億筆查詢。

## 設計哲學

README 的 tagline 只有短短一行，卻把整個哲學壓到極限：

> Network-wide ad blocking via your own Linux hardware.
>
> 用你自己的 Linux 硬體，在整個網路層級阻擋廣告。

兩個關鍵字：**network-wide**（防護不綁裝置）與 **your own**（資料與規則不出家門）。延伸到 features 描述：

> Pi-hole can block ads for all devices on your network (without installing client-side software) — including content blocked in non-browser locations, such as ad-laden mobile apps and smart TVs.
>
> Pi-hole 能為網路上所有裝置阻擋廣告（無需安裝任何終端軟體），包含瀏覽器以外的場景，例如塞滿廣告的手機 app 與智慧電視。

這句話解釋了為什麼 Pi-hole 在 uBlock Origin 當道的時代仍然有用——**DOM manipulation 做不到的地方，DNS sinkhole 做得到**。

## 目標使用者與適用情境

**適合**：
- **家庭 / 小型辦公室**：有一台長時間開機的 Raspberry Pi、NAS 或舊機，想一勞永逸擋全家裝置的廣告與 telemetry。
- **隱私敏感用戶**：不想把 DNS 查詢交給 Google/Cloudflare/ISP，寧可自己存 log。
- **IoT 多、裝置雜的家庭**：智慧電視、Roku、遊戲機、掃地機器人、冰箱——這些裝置沒法裝瀏覽器外掛，唯一能一次擋掉的手段就是網路層 DNS。
- **自架社群**：r/selfhosted、r/homelab 的常駐專案。

**不適合 / 侷限**：
- **行動網路**：出了家門用 4G/5G 就失效（除非搭 VPN 回家）。
- **DoH / DoT 繞過**：Firefox、Chrome、iOS 若直接用 DNS-over-HTTPS，會直接跳過 Pi-hole；需要額外封鎖 DoH endpoint。
- **YouTube 廣告**：YouTube 把廣告與影片放在同一網域，DNS 層無解。
- **256MB RAM 以下的老 Pi**：v6 記憶體與 CPU 使用量比 v5 明顯上升，老硬體可能吃不消（[jmcglock substack](https://jmcglock.substack.com/p/pihole-v6-review) 有實測）。

## 與類似專案的差異

| 專案 | 授權 | 部署 | DoH/DoT | Blocklist 語法 | 特色 |
|---|---|---|---|---|---|
| [pi-hole/pi-hole](https://github.com/pi-hole/pi-hole) | EUPL-1.2 / 社群 | 自架（Linux/Docker） | 需外掛 [cloudflared](https://github.com/cloudflare/cloudflared) | raw domains + 社群 regex | 十年老牌、文件最齊、FTL 效能強 |
| [AdguardTeam/AdGuardHome](https://github.com/AdguardTeam/AdGuardHome) | GPL-3.0 | 自架（Go 單一 binary） | 原生支援 DoH/DoT/DoQ | Adblock 語法 + `$client`/`$ctag` | UI 較現代、per-client policy 直覺 |
| [NextDNS](https://nextdns.io/) | 專有 SaaS | 雲端 | 原生 | 圖形化規則 | 免自架、能在手機上用、但資料交給第三方 |

三者取捨很清楚：**Pi-hole** 贏在成熟度與社群規模（r/pihole、discourse.pi-hole.net），**AdGuard Home** 贏在原生加密 DNS 與乾淨 UI，**NextDNS** 贏在便利性（代價是放棄資料主權，與 Pi-hole 的哲學衝突）。2026 的新部署潮中，AdGuard Home 被多篇評測列為「現代化替代」，但 Pi-hole 的龐大 blocklist 生態與疑難排解歷史仍難取代。

## 外部評論

- [Pi-hole: 7 years later — Connor Tumbleson](https://connortumbleson.com/2025/02/24/pi-hole-7-years-later/)：長期用戶 2025 年回顧，肯定穩定度。
- [The Beauty of Having a Pi-Hole (2024) — Hacker News 討論](https://news.ycombinator.com/item?id=43894175)：社群主流態度代表作。
- [PiHole is nearly useless these days — Hacker News](https://news.ycombinator.com/item?id=46400358)：2025 年底的反調，主張 DOM manipulation 才是正解、Pi-hole 擋不到多少現代廣告。
- [Pi-hole v6 Review — jmcglock substack](https://jmcglock.substack.com/p/pihole-v6-review)：肯定 allowlist 與 Adblock 語法支援，也實測到 v6 在低 spec 硬體的效能退步。
- [AdGuard Home vs Pi-hole (2026) — Blockify](https://getblockify.com/blog/adguard-home-vs-pi-hole/)：2026 新手最常見的選型文。
- [I switched from Adguard to Pi-hole, and back to Adguard — XDA](https://www.xda-developers.com/switched-from-pi-hole-to-adguard-and-back/)：代表性跳船心路歷程。
- [Pi-Hole v6 Has Arrived: Here's What's New — How-To Geek](https://www.howtogeek.com/pi-hole-v6-release/)：主流科技媒體對 v6 的介紹。
- [Pi-hole releases FTL v6.6, Web v6.5, and Core v6.4.1 — AlternativeTo](https://alternativeto.net/news/2026/4/pi-hole-releases-ftl-v6-6-web-v6-5-and-core-v6-4-1-with-security-fixes-adds-mac-control/)：4 月釋出的新聞稿，Trending 的直接推手。
- [自己從頭搞整套 Pi-hole 方案 — Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2022/10/17/10925/)：中文社群資深玩家的完整部署教學。
- [基于树莓派的全能广告屏蔽助手 — 少數派](https://sspai.com/post/58183)：簡中圈代表性入門文。
- [anti-AD blocklist](https://github.com/privacy-protection-tools/anti-AD)：中文區命中率最高的 blocklist，相容 Pi-hole。

## Release 狀態 / 時間軸

- **2014-06-08**：repo 建立，Jacob Salmela 初始 commit。
- **v5 時代（2020–2024）**：lighttpd + PHP dashboard + dnsmasq + FTL 分離架構，主流穩定版。
- **2023-10**：[v6 beta 公開測試](https://pi-hole.net/blog/2023/10/09/pi-hole-v6-beta-testing/)。
- **2025-02-18**：[v6.0 正式釋出](https://pi-hole.net/blog/2025/02/18/introducing-pi-hole-v6/)——十年來最大重寫，embedded REST API、單一 toml config、移除 lighttpd/PHP。
- **2025-02-21**：[V6 Post release fixes and findings](https://pi-hole.net/blog/2025/02/21/v6-post-release-fixes-and-findings/) 補 bug。
- **2025-06 ~ 11**：v6.1 ~ v6.3 連續小改版。
- **2026-02-17**：v6.4 釋出，強調啟動加速、低階硬體記憶體優化。
- **2026-04-03**：[v6.4.1 + FTL v6.6 + Web v6.5](https://github.com/pi-hole/pi-hole/releases/tag/v6.4.1) 安全更新——多個 XSS / HTML injection 修復、Core 本地提權修復、新增 `resolver.macNames` 選項。**這一次釋出直接推升了今天的 Trending 排名。**

## 授權與社群

- **授權**：GitHub API 回報 `NOASSERTION`（repo 根目錄無標準 SPDX 檔），官方專案頁載明採 [EUPL-1.2](https://pi-hole.net/)，本 repo 內程式碼則混合多授權（部分元件 MIT、部分 GPL），使用前建議逐檔確認。
- **Stars / Forks**：57,039 ⭐ / 3,034 forks / 707 watchers（2026-04-21 抓取）。
- **今日 stars 增量**：+154（絕對榜 #9）。
- **貢獻者**：超過 300 位社群貢獻者，由 [@DL6ER](https://github.com/DL6ER)（FTL 核心）、[@PromoFaux](https://github.com/PromoFaux) 領軍。
- **社群管道**：[discourse.pi-hole.net](https://discourse.pi-hole.net/)、r/pihole（數十萬訂閱）、官方 Discord。
- **生態**：[pi-hole/docker-pi-hole](https://github.com/pi-hole/docker-pi-hole)（官方 Docker image）、[pi-hole/web](https://github.com/pi-hole/web)（前端）、[pi-hole/FTL](https://github.com/pi-hole/FTL)（C resolver）——pi-hole 組織下共四個主要 repo 協同運作。

## 資料來源

**Repo metadata**
- `gh api repos/pi-hole/pi-hole`（2026-04-21 擷取）
- `gh api repos/pi-hole/pi-hole/releases?per_page=10`

**官方**
- [Pi-hole 官網 blog](https://pi-hole.net/landing/blog/)
- [v6.4.1 release notes](https://github.com/pi-hole/pi-hole/releases/tag/v6.4.1)
- [Introducing Pi-hole v6](https://pi-hole.net/blog/2025/02/18/introducing-pi-hole-v6/)
- [Pi-hole FTL v6.6, Web v6.5, Core v6.4.1 Released](https://pi-hole.net/blog/2026/04/03/pi-hole-ftl-v6-6-web-v6-5-and-core-v6-4-1-released/)

**外部評論（詳見上方「外部評論」段）**
- [Hacker News #43894175](https://news.ycombinator.com/item?id=43894175)、[#46400358](https://news.ycombinator.com/item?id=46400358)
- [AlternativeTo](https://alternativeto.net/news/2026/4/pi-hole-releases-ftl-v6-6-web-v6-5-and-core-v6-4-1-with-security-fixes-adds-mac-control/)、[How-To Geek](https://www.howtogeek.com/pi-hole-v6-release/)、[XDA Developers](https://www.xda-developers.com/switched-from-pi-hole-to-adguard-and-back/)
- [jmcglock substack v6 review](https://jmcglock.substack.com/p/pihole-v6-review)、[Connor Tumbleson 7 years later](https://connortumbleson.com/2025/02/24/pi-hole-7-years-later/)

**中文社群**
- [Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2022/10/17/10925/)
- [少數派 sspai](https://sspai.com/post/58183)
- [anti-AD blocklist](https://github.com/privacy-protection-tools/anti-AD)

**競品**
- [AdguardTeam/AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)
- [NextDNS](https://nextdns.io/)

## 更新紀錄

<!-- append future re-appearances here -->
