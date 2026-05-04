---
repo: qbittorrent/qBittorrent
first_seen: 2026-05-05
last_updated: 2026-05-05
appearances: [2026-05-05]
growth_appearances: []
has_releases: true
latest_release: release-5.2.0
tags: [網路工具, 應用程式, 自架, 開源替代]
domain: 網路工具
form: 應用程式
themes: [自架, 開源替代]
---

## 深度研究（2026-05-05 首次）

### 專案定位
[qbittorrent/qBittorrent](https://github.com/qbittorrent/qBittorrent) 是以 C++ / Qt 寫成、跨平台、無廣告的開源 BitTorrent 客戶端，定位為 µTorrent 的乾淨開源替代。今天上 trending 直接對應 5 月 3 日剛發布的 **v5.2.0** 重磅更新——累積數月變更的大版號、首度提供 ARM64 build、Web UI 大改造，社群與媒體（[JellyWatch](https://jellywatch.app/blog/qbittorrent-5-2-0-release-whats-new-2026)、[nerds.xyz](https://nerds.xyz/2026/05/qbittorrent-5-2-0-windows-mac-linux/)、[Linux.org](https://www.linux.org/threads/9to5linux-qbittorrent-5-2-open-source-bittorrent-client-released-with-many-new-features.65974/)）連續兩天集中報導所致。

### 核心架構 / 主要概念
- 語言／框架：C++（69%）+ Qt 桌面 UI；Web UI 為 JS/HTML/CSS（合計約 28%）。
- 核心引擎：[arvidn/libtorrent](https://github.com/arvidn/libtorrent)（libtorrent-rasterbar），由 Arvid Norberg 維護。
- 雙模式：原生桌面 GUI（Windows / macOS / Linux）＋ headless `qbittorrent-nox` 守護程序，搭配內建 Web UI 可遠端管理。
- 5.2.0 加入：每分類獨立做種比例 / 時間上限、Created On 欄位、tracker 狀態側邊篩選、piece hash 非同步計算、Web UI 直接建立 torrent。

### 目標使用者
自架 seedbox / NAS、跑 *arr 媒體自動化（Sonarr、Radarr、Prowlarr）的家庭實驗室玩家、長期高任務量做種者，以及厭倦 µTorrent 廣告與捆綁安裝的桌面用戶。Web UI + Docker 形態是 selfhosted 社群預設選項。

### 與類似專案的差異
- vs [transmission/transmission](https://github.com/transmission/transmission)：Transmission 更輕量、CPU 占用更低，但功能與 GUI 細緻度不及 qBittorrent，*arr 整合教學量也少。
- vs [deluge-torrent/deluge](https://github.com/deluge-torrent/deluge)：Deluge 走 plugin-first，記憶體占用最低，但超過 500 個 torrent 起會明顯掉速；qBittorrent 在 5,000–10,000 torrents 規模仍穩定。
- vs µTorrent（閉源）：qBittorrent 無廣告、無捆綁、開源可審計，是最常被推薦的取代品。

### 外部評論
- [Cloudwards qBitTorrent Review 2026](https://www.cloudwards.net/qbittorrent-review/)：認為 qBittorrent「easily outperforms uTorrent」，CPU 占用通常低於 1%，下載完成時間明顯較短。
- [RapidSeedbox Deluge vs qBittorrent (2026)](https://www.rapidseedbox.com/blog/deluge-vs-qbittorrent)：指出 Deluge 在 500 個 torrent 後易掉速，qBittorrent 可穩定處理數千個 torrent，是長期做種與 *arr 整合的首選。
- [Slant 社群排名](https://www.slant.co/topics/1177/versus/~qbittorrent_vs_transmission_vs_deluge)：qBittorrent 在 BT 客戶端類別社群票選排名第一，Deluge 第三。
- [JellyWatch 5.2.0 釋出評論](https://jellywatch.app/blog/qbittorrent-5-2-0-release-whats-new-2026)：強調 Web UI「faster, more responsive, more capable」，並首度提供 ARM64 build，是這次社群關注的主因。
- [nerds.xyz 報導](https://nerds.xyz/2026/05/qbittorrent-5-2-0-windows-mac-linux/)：點名 piece hash 非同步化讓加入大型 torrent 時 UI 不再卡住，是長年痛點修復。

### Release 狀態
最新 release 為 **release-5.2.0**（2026-05-03），距前一穩定版 5.0.5 累積數月功能。Changelog 涵蓋每分類做種比例、全下載完成後重啟系統、Created On 欄位、tracker 狀態側邊篩選、Web UI 建立 torrent、ARM64 build、piece hash 非同步等。發布節奏屬「以穩定版為主、間隔 3–6 個月」的成熟維護週期。

### 授權與社群
License 為 GPL-2.0（GitHub `license` 標記為 `Other`，實際為 GPLv2 + OpenSSL exception）。Stars 36,994、Forks 4,649、Open Issues 2,564。主要貢獻者為 [Chocobo1](https://github.com/Chocobo1)（3,219）、專案 maintainer [sledgehammer999](https://github.com/sledgehammer999)（2,228）、[glassez](https://github.com/glassez)（1,329）、[Piccirello](https://github.com/Piccirello)（290，Web UI 主力）。專案始於 2012，由 Christophe Dumez 創立、sledgehammer999 接手維護至今，社群與 *arr 生態長期綁定，是 selfhosted reddit 與 TrueNAS / Unraid 教學的事實標準推薦。
