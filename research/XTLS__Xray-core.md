---
repo: XTLS/Xray-core
first_seen: 2026-04-21
last_updated: 2026-04-21
appearances: [2026-04-21]
growth_appearances: []
has_releases: true
latest_release: v26.4.17
tags: [網路工具, 框架, 自架, 資料主權]
domain: 網路工具
form: 框架
themes: [自架, 資料主權]
---

# [XTLS/Xray-core](https://github.com/XTLS/Xray-core)

> 研究日期：2026-04-21
> 研究來源：<https://github.com/XTLS/Xray-core>
> 觸發原因：首次上絕對榜（當日排名 #10）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[XTLS/Xray-core](https://github.com/XTLS/Xray-core) 是一個 Go 寫成的**網路代理核心引擎（core）**，由 [v2fly/v2ray-core](https://github.com/v2fly/v2ray-core) 分叉而來、向後相容 v2ray 設定，同時獨家支援 **XTLS Vision** 流控與 **REALITY** 傳輸層——目標是讓代理流量在封包層看起來跟連到真正 `microsoft.com` 的 TLS 連線無法區分。**用途邊界需要先講清楚**：這是一套明確為「反審查（anti-censorship）」設計的工具，在多數審查嚴格的司法轄區（中國、伊朗等）架站/使用本身就具法律風險；本研究只記錄事實，不提供任何規避特定國家審查的操作指引。

## 作者與起源

專案由 [@RPRX](https://github.com/RPRX) 於 2020 年 11 月建立（[repo created 2020-11-09](https://github.com/XTLS/Xray-core)），起因是作者與 v2ray 原始維護組在授權、路線與設計哲學上產生分歧，遂在 [XTLS](https://github.com/XTLS) 組織下另起爐灶。RPRX 是 VLESS 協定的設計者，也是把「內外層 TLS 連線複用」做成可用工程（即 XTLS）的第一人，中文社群直接以「黑科技」形容（見 [V2EX 討論串](https://www.v2ex.com/t/939785)）。目前 top contributor 為 [@RPRX](https://github.com/RPRX)（405 commits）、[@yuhan6665](https://github.com/yuhan6665)（210）、[@Fangliding](https://github.com/Fangliding）（131），核心圈約 5–10 人，社群以中文圈為主、伊朗貢獻者比例也顯著（[@patterniha](https://github.com/patterniha)、[@hossinasaadi](https://github.com/hossinasaadi) 等）。

## 核心架構 / 主要概念

- **入站/出站協定**：VLESS、VMess、Trojan、Shadowsocks（含 2022 edition）、SOCKS5、HTTP、WireGuard 入站。
- **流控（flow）**：`xtls-rprx-vision`——解決 TLS-in-TLS 特徵問題，讓外層 TLS 不會因為內層再包一層 TLS 而被流量分析挑出來。
- **傳輸（transport）**：TCP、mKCP、WebSocket、HTTP/2、gRPC、**XHTTP**（2025 後主推的新 transport，對抗 CDN 探測）、**REALITY**（透過借用真實站點 TLS 憑證與 IP 的密碼學握手，讓 server 端無需憑證管理即可偽裝）。
- **其它原生特性**：uTLS（客戶端指紋偽裝）、ECH、DNS over HTTPS/TLS、sniffing、路由規則（geoip/geosite）、反向代理、XUDP、近期還納入 Finalmask（XICMP / XDNS）等非主流傳輸實驗。
- **runtime**：單一 `xray` binary，v2ray-core 時代的 `v2ray` + `v2ctl` 已合併。

## 設計哲學

Repo 首頁 tagline：

> "Xray, Penetrates Everything. Also the best v2ray-core. Where the magic happens. An open platform for various uses."

翻譯：「Xray 無孔不入，也是最好的 v2ray-core，是魔法發生的地方，是供各種用途使用的開放平台。」這句話拆成三段看：**「Penetrates Everything」** 是反審查定位的直白宣告；**「the best v2ray-core」** 明示它把自己當作 v2ray 的超集與事實繼任者，而非另起爐灶的陌生專案；**「open platform for various uses」** 是 MPL-2.0 授權與模組化架構的承諾——協定/傳輸/路由各自插拔，第三方面板（[3x-ui](https://github.com/MHSanaei/3x-ui) 等）與 GUI 客戶端（[v2rayN](https://github.com/2dust/v2rayN)、[v2rayNG](https://github.com/2dust/v2rayNG)、[Nekoray](https://github.com/MatsuriDayo/nekoray)）都是生態產物。README 沒有獨立章節寫倫理守則。

## 目標使用者與適用情境

- **個人使用者在網路受限地區**：家用客戶端透過面板/一鍵腳本架 VPS，配合 REALITY 偽裝為主流站點。
- **研究者與資安團隊**：研究 TLS 指紋、active probing、流量分析反制時，Xray 是測試平台首選。
- **VPS 服務商、機場運營者**：以 Xray 為核心賣分流套餐，商業生態龐大。
- **不適用情境**：合規出海企業 VPN、SOC2 受規範的企業遠端存取——請改看 [tailscale/tailscale](https://github.com/tailscale/tailscale)、WireGuard 原生、Zscaler/Cloudflare 等方案；在明令禁止的司法轄區運行 Xray server 或從事商業分銷有具體法律風險，不建議以商業 SLA 視之。

## 與類似專案的差異

| 對手 | 本專案的差異 |
|---|---|
| **[v2fly/v2ray-core](https://github.com/v2fly/v2ray-core)** | Xray 是 v2ray 的超集，設定可直接遷移；獨家支援 XTLS Vision、REALITY、XHTTP，發版節奏遠快於 v2ray（Xray 約每兩週一版，v2ray 近年已放緩）。v2ray 的優勢剩文件完整度與跨語言 SDK 支援。 |
| **[SagerNet/sing-box](https://github.com/SagerNet/sing-box)** | sing-box 從頭寫、統一多個代理生態（Xray/Clash/Hysteria 協定一鍋端），記憶體占用更低（[約 70 MB vs v2ray-core 240+ MB](https://curevpn.com/singbox-vs-other-proxy-solutions/)）、設定集中。但 REALITY 與 XTLS Vision 的原生實作與最新修正**首發仍在 Xray**，sing-box 是跟進者；反審查圈在新協定剛釋出時通常還是先上 Xray。 |

選型建議：追新協定、最新反探測修補 → Xray；要單一 binary、多核心統一 → sing-box；既有 v2ray 生態想零改動遷移 → Xray 直接替換 `v2ray` binary。

## 外部評論

- [Hacker News — The REALITY protocol](https://news.ycombinator.com/item?id=35056974)：2023 年 HN 首次討論 REALITY，焦點是「無憑證、借用真站 TLS」的密碼學設計。
- [Medium — The Ghost in the Machine: Setting Up a VLESS + Reality VPN for Perfect Stealth](https://medium.com/@nikitagroshin/the-ghost-in-the-machine-setting-up-a-vless-reality-vpn-for-perfect-stealth-00802a2f9561)（Nikita Groshin, 2026-03）：英文部落格對 REALITY 的技術定位。
- [ObjShadow — How does XTLS REALITY break through the whitelist?](https://objshadow.pages.dev/en/posts/how-reality-works/)：源碼層級的 REALITY 握手解析。
- [V2EX 討論 — 如何評價 Xray 開發者的 TLS in TLS 檢測工具](https://www.v2ex.com/t/939785)：中文社群對 RPRX 「自爆 Trojan 特徵」的討論，反映 Xray 推 Vision 的背景。
- [GitHub Discussion #2166 — Vision and Reality, Which?](https://github.com/XTLS/Xray-core/discussions/2166)：官方 repo 高票討論串，說明兩個技術各自的對手（Vision 打 TLS-in-TLS 特徵；Reality 打 SNI 與 server 指紋）。
- [GitHub Discussion #2023 — Xray Core vs Sing-box](https://github.com/XTLS/Xray-core/discussions/2023)：兩邊社群互比的原帖。
- [Medium — The evolution from V2Ray to Xray to Sing-box](https://medium.com/@utso097.csekuet/the-evolution-from-v2ray-to-xray-to-sing-box-0f4ffdeb3fe7)：英文社群的家譜梳理。
- [GitHub Issue #2778 — Investigation on Blocking of Reality in IRAN](https://github.com/XTLS/Xray-core/issues/2778)、[Issue #2451 — MCI blocking REALITY in Iran](https://github.com/XTLS/Xray-core/issues/2451)：伊朗 MCI 在 2024 起系統性封鎖 REALITY 的長期追蹤，**重要反面材料——說明 REALITY 並非銀彈**，當審查方升級主動探測與 IP 黑名單，Xray 同樣會被識別。
- [Grokipedia — Xray-core](https://grokipedia.com/page/Xray-core)：第三方百科對專案源流的摘要。
- [itlanyan — Xray 教程](https://itlanyan.com/xray-tutorial/) / [v2rayssr — Xray 一鍵搭建腳本](https://v2rayssr.com/xray.html)：中文圈最被轉貼的兩份實作教學，同時也是被濫用作「機場」架設的主要載體。
- **濫用/合規風險**：Xray 本身是中立網路工具，但官方公共資源可被詐騙集團濫用（作為任何遠端流量代理都可能發生），使用者應留意所在司法轄區對代理伺服器運行、商業分銷、翻牆行為的具體法律定義；本研究不提供任何針對特定國家審查的規避方案。

## Release 狀態 / 時間軸

`has_releases: true`，發版節奏約 **每 1–3 週一個 pre-release，每 1–2 個月一個正式版**。近期節點：

- **v1.0.0**（2020-11）：從 v2ray fork 出來後的首個版本，合併 `v2ray` + `v2ctl`，完整 VLESS + XTLS 支援。
- **REALITY 首發**（2023-03 附近，見 [XTLS/REALITY](https://github.com/XTLS/REALITY)）：Xray 生態最具辨識度的里程碑。
- [**v26.2.6**](https://github.com/XTLS/Xray-core/releases/tag/v26.2.6)（2026-02-06）：XHTTP 加入繞 CDN 偵測選項，Finalmask 族加入 XICMP、XDNS。
- [**v26.3.27**](https://github.com/XTLS/Xray-core/releases/tag/v26.3.27)（2026-03-27）：最近一次大版本，mKCP、Hysteria、XHTTP、REALITY、ECH、WireGuard、VLESS Reverse Proxy 全線更新。
- [**v26.4.17**](https://github.com/XTLS/Xray-core/releases/tag/v26.4.17)（2026-04-17，pre-release）：截至研究日的最新版本。

版本號採 `v{YY}.{M}.{D}` 的日期命名（2026 年開始），放棄了早期的 semver。

## 授權與社群

- **License**：[MPL-2.0](https://github.com/XTLS/Xray-core/blob/main/LICENSE)——相容於商業閉源使用，但修改過的 MPL 檔案必須保持開源。
- **Stars / Forks / Subscribers**：**37,398 / 5,207 / 400**（2026-04-21 取樣），open issues 41，PRs 活躍。
- **語言**：Go（主要）。
- **Topics**：`vless`、`reality`、`xtls`、`vision`、`vmess`、`trojan`、`shadowsocks`、`xhttp`、`anticensorship`、`utls`、`xudp`、`wireguard`。
- **社群分布**：官方 [Telegram 群](https://t.me/projectXray)、GitHub Discussions（中英雙語）、中文圈以 V2EX、Telegram 機場頻道為主；貢獻者前 10 名中可辨識中文暱稱與伊朗暱稱各佔相當比例，反映「審查重災區反而是技術輸出最密集的社群」這個網路工具常見現象。

## 資料來源

### 本體
- [XTLS/Xray-core](https://github.com/XTLS/Xray-core)
- [XTLS/REALITY](https://github.com/XTLS/REALITY)
- [XTLS 組織首頁](https://github.com/XTLS)
- [Project X 官方文件](https://xtls.github.io/)
- [Releases 頁](https://github.com/XTLS/Xray-core/releases)
- [DeepWiki — XTLS/Xray-core](https://deepwiki.com/XTLS/Xray-core)

### 第三方評論與分析
- [ObjShadow — REALITY source analysis](https://objshadow.pages.dev/en/posts/how-reality-works/)
- [Medium — VLESS+Reality setup](https://medium.com/@nikitagroshin/the-ghost-in-the-machine-setting-up-a-vless-reality-vpn-for-perfect-stealth-00802a2f9561)
- [Medium — V2Ray → Xray → Sing-box evolution](https://medium.com/@utso097.csekuet/the-evolution-from-v2ray-to-xray-to-sing-box-0f4ffdeb3fe7)
- [V2EX — RPRX 的 TLS in TLS 檢測工具](https://www.v2ex.com/t/939785)
- [itlanyan — Xray 教程](https://itlanyan.com/xray-tutorial/)
- [v2rayssr — Xray 一鍵搭建](https://v2rayssr.com/xray.html)
- [curevpn — singbox vs others](https://curevpn.com/singbox-vs-other-proxy-solutions/)
- [Grokipedia — Xray-core](https://grokipedia.com/page/Xray-core)

### 官方討論串（反面案例）
- [Iran blocking REALITY #2778](https://github.com/XTLS/Xray-core/issues/2778)
- [MCI blocking REALITY #2451](https://github.com/XTLS/Xray-core/issues/2451)

### 同類工具
- [v2fly/v2ray-core](https://github.com/v2fly/v2ray-core)
- [SagerNet/sing-box](https://github.com/SagerNet/sing-box)
- [tailscale/tailscale](https://github.com/tailscale/tailscale)

## 更新紀錄
