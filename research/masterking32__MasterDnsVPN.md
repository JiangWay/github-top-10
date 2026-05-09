---
repo: masterking32/MasterDnsVPN
first_seen: 2026-05-10
last_updated: 2026-05-10
appearances: [2026-05-10]
growth_appearances: [2026-05-10]
has_releases: true
latest_release: v2026.05.04.123456-38b73de
tags: [網路工具, 應用程式, 自架]
domain: 網路工具
form: 應用程式
themes: [自架]
---

# [masterking32/MasterDnsVPN](https://github.com/masterking32/MasterDnsVPN) — 深度研究

## 深度研究（2026-05-10 首次）

### 專案定位
[masterking32/MasterDnsVPN](https://github.com/masterking32/MasterDnsVPN) 是一款 Go 語言實作的 DNS 隧道 VPN，專為高度審查環境設計，把 TCP 流量偽裝成 DNS 查詢／回應，從 53 埠穿越國家級防火牆。專案自稱「以科學研究為導向」，目標是在 [yarrick/iodine](https://github.com/yarrick/iodine)（DNSTT 系）與 SlipStream 之上做協定層優化，讓隧道在封鎖最嚴的情況仍可維持可用速度。

### 核心架構 / 主要概念
- **低開銷 ARQ**：自製重傳層 header 僅 5–7 bytes，比 DNSTT 的 59 bytes 少約 88%
- **Session 多工**：單一 DNS 通道內可承載多條獨立邏輯串流
- **8 種 resolver 負載平衡模式**：round-robin、隨機、低延遲優先、低封包丟失優先等，並內建健康檢查與自動停用
- **抗丟包機制**：多 resolver 多路徑、選擇性重傳、控制封包重複發送、payload 端的 ZSTD/LZ4/ZLIB 壓縮以降低 query 數
- **加密分級**：從輕量 XOR（極速模式）到 AES-GCM（高安全），讓使用者在速度與隱蔽性間自選
- **客戶端**：本地暴露 SOCKS5/TCP proxy，可串接外層 SOCKS5、附本地 DNS cache

### 目標使用者
伊朗、中國等高度封鎖區域的個人翻牆使用者；在普通 VPN（WireGuard、V2Ray、Shadowsocks）被全面阻斷時尋求 last-resort 通道的進階使用者；自架伺服器者（需有可委派 NS 的子網域）。

### 與類似專案的差異
相較 [yarrick/iodine](https://github.com/yarrick/iodine) 與 SlipStream，本案號稱下載速度快 9× 與 3.6×；ARQ 標頭極小、支援 multi-path delivery 與封包複製，是其在 70+ 天伊朗斷網期間能持續可用的關鍵。生態上已衍生 Android 客戶端 [RevocGG/MasterDnsVPN-AndroidGG](https://github.com/RevocGG/MasterDnsVPN-AndroidGG) 與整合 DNSTT/SlipStream/NaiveProxy 的多協定客戶端 [anonvector/SlipNet](https://github.com/anonvector/SlipNet)，顯示已被翻牆社群採納。

### 外部評論
- DeepWiki 將其歸類為「lightweight DNS-over-UDP tunnel」，特別強調 ARQ 設計避開 QUIC/KCP 的重封裝開銷 [(來源)](https://deepwiki.com/masterking32/MasterDnsVPN/2-getting-started)
- 同作者另案 [masterking32/MasterHttpRelayVPN](https://github.com/masterking32/MasterHttpRelayVPN) 採 Google Apps Script 域前置（domain fronting），顯示作者整體在做「多層次抗審查工具集」
- 作者透過 Telegram 頻道直接面向波斯語社群發布版本，社群討論集中於 Telegram，西方媒體覆蓋稀少 [(來源)](https://t.me/masterdnsvpn)

### Release 狀態
- 最新版本：v2026.05.04.123456-38b73de
- 主要特性：由 GitHub Actions 機械化建置，提供 Windows / macOS / Linux / Android-Termux / Docker 多架構二進位檔；發版頻率高（日期戳版號）。

### 授權與社群
- 授權：MIT License
- 主語言：Go
- Stars：2,392｜Forks：253｜Watchers：19
- 主要貢獻者：[masterking32](https://github.com/masterking32)（963 commits 獨擎開發），[abolix](https://github.com/abolix)（22 commits）為次要貢獻者；其餘 10 位社群貢獻者各 1–4 commits，名單以伊朗社群帳號為主，符合波斯語使用者圈的定位。

## 更新紀錄
