---
repo: Flowseal/zapret-discord-youtube
first_seen: 2026-05-02
last_updated: 2026-05-02
appearances: [2026-05-02]
growth_appearances: [2026-05-02]
has_releases: true
latest_release: 1.9.8b
tags: [網路工具, 應用程式, 自架]
domain: 網路工具
form: 應用程式
themes: [自架]
---

## 深度研究（2026-05-02 首次）

### 專案定位

[Flowseal/zapret-discord-youtube](https://github.com/Flowseal/zapret-discord-youtube) 是一份「Windows 友善預設打包」，把上游 [bol-van/zapret](https://github.com/bol-van/zapret) 的 DPI（深度封包檢測）繞過工具預先配置成「下載 → 解壓 → 雙擊 .bat 即可」的形式，主打 Discord 語音、YouTube 影片在俄羅斯被 Roskomnadzor（俄羅斯通訊監管局，РКН）節流／阻斷之後的繞過方案。Repo 由 Flowseal 於 2024-10-08 建立，主語言 Batchfile，現有 26.9k stars、2.1k forks、約 39 個 release，README 內並無任何官方描述欄位（GitHub description 留空），但在 README 與 Discussions 內以俄文清楚標榜目標。

### 核心架構 / 主要概念

不是 VPN，也不是代理。zapret 本身在 Windows 上以 [WinDivert](https://github.com/basil00/WinDivert) 攔截本機封包，由 `winws.exe` 對 TLS ClientHello 與 QUIC 做 fragmentation、TTL 操弄、fake packet 注入、header case 變造等手法，讓中間的 DPI 設備拼不回完整 SNI／流量指紋，而對端伺服器仍能正常解析。Flowseal 包提供 `general.bat` 系列（ALT、ALT2、ALT4、FAKE、SIMPLE FAKE…等十多種策略）、`service_install.bat`（裝成 Windows 服務常駐）、可更新的 `list-general.txt` 域名清單與 `ipset` IP 段清單，以及 `discord.bat`、`youtube.bat` 這類針對單一服務的捷徑。版本說明大量出現「更新 Discord 策略」、「修 5000 ping 問題」、「GameFilter 拆 TCP/UDP/ALL」這類條目，看得出是策略軍備競賽。

### 目標使用者

俄語區一般 Windows 使用者：不想／不能用 VPN（俄方近年加強 VPN 取締），但 Discord 自 2024 年起被 Roskomnadzor 持續干擾、YouTube 自 2024 下半年遭大規模降速。本專案把上游 zapret 的 Linux／命令列門檻降到「右鍵以系統管理員身分執行 .bat」，所以實際使用者非常廣，連 Steam Community 都有專門的 [HOW TO UNLOCK DISCORD IN RUSSIA](https://steamcommunity.com/sharedfiles/filedetails/?id=3374594258) 教學引用此 repo。

### 與類似專案的差異

- 上游 [bol-van/zapret](https://github.com/bol-van/zapret)：跨平台（Linux／OpenWrt／Windows）原始實作，需自行 tune 參數，門檻高；Flowseal 包等於是「Windows 預設值版」，其 binaries 直接取自 bol-van release。
- [ValdikSS/GoodbyeDPI](https://github.com/ValdikSS/GoodbyeDPI)：另一個老牌 Windows DPI 繞過工具，以 TCP fragmentation／HTTP host 大小寫變造為主，2024 後對新一代俄系 DPI 設備命中率下降，社群普遍轉向 zapret 體系。
- [XTLS/Xray-core](https://github.com/XTLS/Xray-core) 與 V2Ray 系：屬於「重型穿牆」（VLESS／Reality／Trojan），需要境外伺服器與訂閱，是 VPN 級替代品；zapret 不需任何境外節點，也因此無法繞過 IP 層完全封鎖（如 Cloudflare 整段 IP 被擋的情境）。
- 同名的 [ankddev/zapret-discord-youtube](https://github.com/ankddev/zapret-discord-youtube)、[youtubediscord/zapret](https://github.com/youtubediscord/zapret) 與 [sch-izo/shizapret](https://github.com/sch-izo/shizapret) 都是 Flowseal 包的衍生 fork，差別在自動更新與額外服務名單。

### 外部評論

- Habr 長文 [How to get YouTube and Discord working: the most effective methods, from Zapret to setting up your own VPN server](https://habr.com/en/articles/990156/) 將 zapret 列為「不想自架 VPN 時的首選」，並點名 Flowseal 包為入門推薦。
- Repo 內 [Discussion #8673](https://github.com/Flowseal/zapret-discord-youtube/discussions/8673) 為俄文社群維護的「完整安裝與常見問題排解」彙整，瀏覽量極高，等同非官方 wiki。
- [Discussion #10241](https://github.com/Flowseal/zapret-discord-youtube/discussions/10241) 收錄 1.9.7 之後針對 Apex Legends、Fortnite、Roblox 等遊戲與 Telegram 的擴用設定。
- [zapret.org](https://zapret.org/)、[zapret.pro](https://zapret.pro/)、[zapret.io](https://zapret.io/) 等多個第三方包裝站直接散布此 repo 的 release，README 內因此特別警告「我不經營任何 Telegram/YouTube 頻道」以防仿冒釣魚。
- 中文圈與 HN 目前未見規模化討論（資料不足）；繁體中文長文評論尚未出現。

### Release 狀態

`has_releases: true`，已發行約 39 個 release，最新 [1.9.8b](https://github.com/Flowseal/zapret-discord-youtube/releases/tag/1.9.8b)（2026-04-30，更新 Discord 策略），近期主節點包括 1.9.8（修 5000 ping、更新 IPSet AS 號）、1.9.7b（更新 Telegram web 用 hosts，並衍生 [Flowseal/tg-ws-proxy](https://github.com/Flowseal/tg-ws-proxy) 本機代理副專案）、1.9.7（GameFilter 拆三模、雙 fake 注入）。發版頻率約 1–3 週一次，明顯跟著俄方 DPI 規則調整節奏。

### 授權與社群

GitHub 顯示授權為 `Other / NOASSERTION`，README 無顯式 LICENSE 條款，使用前需自行評估二次散布風險（這在繞過工具圈常見）。主要貢獻者：[Flowseal](https://github.com/Flowseal)（267 commits）、[V3nilla](https://github.com/V3nilla)（25）、[amozebus](https://github.com/amozebus)（17）、[ekungurov](https://github.com/ekungurov)（16）、[fridorin](https://github.com/fridorin)（16）。Issue 區開放 1,409 件、Discussions 活躍——這個比例顯示專案高度依賴社群回報「這條 ISP 上哪一個策略還活著」的策略眾包。今日（2026-05-02）首次推上 GitHub Trending Top 10 第 9 名（+165 stars/日），地緣政治背景（俄方 2026 年 Q1 對 Discord／YouTube 進一步收緊封鎖）幾乎是唯一可信的觸發原因。
