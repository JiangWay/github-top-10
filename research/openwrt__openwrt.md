---
repo: openwrt/openwrt
first_seen: 2026-05-04
last_updated: 2026-05-04
appearances: [2026-05-04]
growth_appearances: [2026-05-04]
has_releases: true
latest_release: v25.12.2
tags: [網路工具, 應用程式, 自架, 開源替代]
domain: 網路工具
form: 應用程式
themes: [自架, 開源替代]
---

# [openwrt/openwrt](https://github.com/openwrt/openwrt)

## 深度研究（2026-05-04 首次）

### 專案定位
[openwrt/openwrt](https://github.com/openwrt/openwrt) 是專為嵌入式裝置（特別是無線路由器）設計的 Linux 作業系統，本 repo 為 `git.openwrt.org` 的官方 GitHub 鏡像，僅供參考並接受 PR，主開發仍在自家 git 伺服器上。它把廠商封閉韌體換成具備完整可寫檔案系統與套件管理（apk）的開放平台，使用者可隨時用 opkg/apk 安裝套件、改 LuCI 介面、或重新編譯韌體。語言以 C（66.6%）、Makefile、Shell 為主，授權為 GPL-2.0，目前 26,575 stars、12,342 forks、約 68,000+ commits。

### 核心架構 / 主要概念
核心由四層構成：(1) Linux kernel（25.12 採用 6.12.71）+ glibc 2.41；(2) 輕量 userland（busybox + procd init + ubox 工具）；(3) 套件管理（25.12 起把行之多年的 **opkg 換成 Alpine 的 apk**，這是近年最大結構性改動）；(4) **LuCI** 網頁管理介面，新版 Wi-Fi 設定腳本以 ucode（OpenWrt 自家的 ECMAScript dialect）改寫。25.12 預設內建 attended sysupgrade（ASU）與 owut CLI，升級時可保留套件與設定，解決多年來「升級後要重灌套件」的痛點。

### 目標使用者
網路 power user、家庭自架玩家、需要 VLAN/防火牆/VPN/廣告攔截/SQM QoS 的進階用戶、想要延長路由器壽命跳脫廠商 EOL 的人，以及把 x86 mini PC 或 ARM SBC 改裝成軟路由的 DIY 族群。

### 與類似專案的差異
相對 [mirror/dd-wrt](https://github.com/mirror/dd-wrt)：DD-WRT 支援硬體更廣（含 Broadcom 老機），但開發節奏慢、半封閉；OpenWrt 100% FOSS、kernel 與驅動更新更快，且率先支援 MediaTek/Qualcomm Wi-Fi 6/7 平台。相對 [pfsense/pfsense](https://github.com/pfsense/pfsense)/OPNsense：後者是 FreeBSD x86 軟路由方向，OpenWrt 則跨 39 個平台 2,849 種裝置，從 8MB flash 老 AP 到 10G 軟路由都能跑。

### 外部評論
- [Help Net Security 報導 25.12.0](https://www.helpnetsecurity.com/2026/03/09/openwrt-25-12-0-released/) 指出 apk 取代 opkg 是「結構性大改」，內建 ASU 是長年呼聲。
- [Tom's Hardware 報導 OpenWrt One 路由器](https://www.tomshardware.com/networking/open-source-openwrt-one-router-released-at-usd89-hacker-friendly-device-sports-two-ethernet-ports-three-usb-ports-with-dual-band-wi-fi-6) 描述為 $89 的 hacker-friendly 旗艦，象徵 OpenWrt 從韌體跨入硬體。
- [Hackaday 2026/04 文章](https://hackaday.com/2026/04/16/trying-to-build-your-own-consumer-grade-router-in-2026/) 把 OpenWrt 列為自組消費級路由的事實標準。
- [OpenWrt 論壇 25.12.2 釋出帖](https://forum.openwrt.org/t/openwrt-25-12-2-service-release/248287) 提到 Trail of Bits 在 2026/02 完成的安全稽核補丁（umdns stack overflow、LuCI XSS 等 CVE）。

5/4 的微幅竄升（+14 stars）並非單一 release 事件驅動，推測來自三股合流：25.12.x 服務版本陸續釋出後使用者升級擴散、24.10 將於 2026/09 EOL 的提醒（[endoflife.date](https://endoflife.date/openwrt) 已標註）促使換版討論、加上 OpenWrt One 與 10G 軟路由話題持續發酵。屬於「老牌核心基礎建設緩慢長尾」的代表。

### Release 狀態
有 release。最新穩定版 [v25.12.2](https://github.com/openwrt/openwrt/releases/tag/v25.12.2)（2026-03-27），前序 [v25.12.1](https://github.com/openwrt/openwrt/releases/tag/v25.12.1)（2026-03-18）與 [v24.10.6](https://github.com/openwrt/openwrt/releases/tag/v24.10.6) 同日推出，主版本 [v25.12.0](https://github.com/openwrt/openwrt/releases/tag/v25.12.0)（2026-03-05）累計 4,700+ commits。

### 授權與社群
GPL-2.0；由 OpenWrt 組織治理、SFC 信託資產。Top 貢獻者：[juhosg](https://github.com/juhosg)（4,536）、[ffainelli](https://github.com/ffainelli)（3,365）、[nbd168](https://github.com/nbd168)（2,911）、[hauke](https://github.com/hauke)（2,890）、[jow-](https://github.com/jow-)（2,806）。社群活動主軸在 forum.openwrt.org、mailing list 與 IRC，issue 開啟中 4,010 件。
