---
repo: apernet/hysteria
first_seen: 2026-05-13
last_updated: 2026-05-13
appearances: [2026-05-13]
growth_appearances: [2026-05-13]
has_releases: true
latest_release: app/v2.9.1
tags: [網路工具, 應用程式, 自架, 開源替代]
domain: 網路工具
form: 應用程式
themes: [自架, 開源替代]
---

# [apernet/hysteria](https://github.com/apernet/hysteria)

> 研究日期：2026-05-13
> 研究來源：https://github.com/apernet/hysteria
> 觸發原因：首次上絕對榜（#4，20,137 stars）
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-05-13 首次）

### 專案定位
[apernet/hysteria](https://github.com/apernet/hysteria) 是一套基於 QUIC 的高效能、抗審查代理工具，2020 年 4 月上線、目前 20,137 stars、2,090 forks、142 watchers，主要語言 Go，授權 MIT。Repo topics 自我定位為 `censorship-circumvention`、`proxy`、`quic`、`reliable-udp`、`socks5`、`tun`、`vpn`，官方文件站為 <https://v2.hysteria.network/>。其口號「powerful, lightning fast and censorship resistant」直指中文圈長年痛點：高丟包、深度包檢測（DPI）下仍要維持頻寬。

### 核心架構 / 主要概念
協議建立在魔改的 QUIC 之上，對外偽裝成標準 HTTP/3 流量以混入正常網路噪訊；核心賣點是內建的 **Brutal** 擁塞控制演算法——使用者直接宣告期望頻寬，演算法即使在高丟包下也努力逼近該上限，與傳統 BBR/CUBIC 的「保守探測」哲學相反。功能面提供 SOCKS5、HTTP Proxy、TCP/UDP forwarding、Linux TProxy、TUN 等多模出口，內建驗證、流量統計與 ACL，並有官方 Dockerfile 與多平台預編譯檔。

### 目標使用者
主要使用者是中國大陸與伊朗等高審查地區的個人翻牆使用者、以及自架機場/小型代理服務的 VPS 站長。次要族群為需要在跨國高延遲鏈路上做 TCP 加速的開發者。中文圈將其暱稱為「歇斯底里」，多份教學文如 [V2RaySSR 綜合網](https://v2rayssr.com/hysteria2.html)、[playlab.eu.org](https://playlab.eu.org/archives/hysteria2)、[老梁的學習筆記](https://b.awei.pub/2024/03/hysteria/) 均定調為「垃圾 VPS 線路救星」。

### 與類似專案的差異
- vs [v2fly/v2ray-core](https://github.com/v2fly/v2ray-core)／[XTLS/Xray-core](https://github.com/XTLS/Xray-core)：後者協議生態更廣（VLESS、Reality、Trojan），偏重 TCP 偽裝與反偵測；[apernet/hysteria](https://github.com/apernet/hysteria) 走純 UDP/QUIC 路線，在高丟包鏈路上純粹的吞吐優勢明顯，但偽裝深度不及 Reality。
- vs [SagerNet/sing-box](https://github.com/SagerNet/sing-box)：sing-box 是「多協議統一客戶端」、原生支援 Hysteria2、TUIC、NaiveProxy；[apernet/hysteria](https://github.com/apernet/hysteria) 則只負責自己這支協議的伺服端與官方核心客戶端，兩者常被搭配使用而非互斥。
- vs [trojan-gfw/trojan](https://github.com/trojan-gfw/trojan)／[shadowsocks/shadowsocks-rust](https://github.com/shadowsocks/shadowsocks-rust)：經典 TCP 系協議在穩定線路上仍可用，但面對主動丟包與 QoS 時不如 QUIC 系；Brutal 演算法是 Hysteria 的關鍵差異。

### 外部評論
- [sing-box 官方文件](https://sing-box.sagernet.org/manual/proxy-protocol/hysteria2/) 將 Hysteria2 定位為「中國產 QUIC 協議，賣點是 Brutal 擁塞控制，可在丟包下逼近設定頻寬」，並列為原生支援的協議之一。
- [bulianglin.com 技術部落格](https://bulianglin.com/archives/hysteria2.html) 評：「遙遙領先，黑科技！垃圾 VPS 線路網速大幅提升」，並提供 Windows/iOS/Android/OpenWrt 全平台搭建教學。
- [2025 翻墙協議深度對比技術分析報告（nbhd.cloud）](https://www.nbhd.cloud/2025-fan-qiang-xie-yi-shen-du-dui-bi-ji-zhu-fen-xi-bao-gao/) 指出 Hysteria2 在高頻寬鏈路上的原始吞吐量「明顯高於 TCP 系協議」，但在 DPI 偽裝深度上不如 Reality。
- [品葱社群討論](https://pincong.rocks/article/65545) 在「目前各大代理軟體的優缺點對比」中，將 Hysteria2 列為「放棄 Clash」後的主流選項之一。

### Release 狀態
有 releases。最新版本 `app/v2.9.1`（2026-05-10 發布），其前為 `app/v2.9.0`（2026-05-10）、`app/v2.8.2`（2026-04-26）、`app/v2.8.1`（2026-03-31）、`app/v2.8.0`（2026-03-30）。Tag 命名採 monorepo 慣例的 `app/` 前綴，顯示專案內可能同時維護核心 library 與 app 兩條 release 線。版本節奏穩定，近兩月內三次 minor/patch 釋出顯示活躍維護。Release 連結：<https://github.com/apernet/hysteria/releases/tag/app/v2.9.1>。

### 授權與社群
MIT 授權，組織 owner [apernet](https://github.com/apernet) 為專案所屬。社群指標：237 open issues、2,090 forks、142 subscribers、`has_discussions: true`。已停止維護的 Hysteria 1.x 仍標註為 legacy；目前主力為 Hysteria 2 系列。中文圈生態完整，第三方一鍵腳本（如 [vveg26/sing-box-reality-hysteria2](https://github.com/vveg26/sing-box-reality-hysteria2)）已將 Hysteria2 納入主流代理堆疊。
