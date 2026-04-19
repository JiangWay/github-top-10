---
repo: rustdesk/rustdesk
first_seen: 2026-04-19
last_updated: 2026-04-19
appearances: [2026-04-19]
growth_appearances: [2026-04-19]
has_releases: true
latest_release: "1.4.6"
tags: [遠端桌面, 應用程式, 自架, 開源替代]
domain: 遠端桌面
form: 應用程式
themes: [自架, 開源替代]
---

# [rustdesk/rustdesk](https://github.com/rustdesk/rustdesk)

> 研究日期：2026-04-19
> 研究來源：<https://github.com/rustdesk/rustdesk>
> 觸發原因：首次上絕對榜（當日排名 #8）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[rustdesk/rustdesk](https://github.com/rustdesk/rustdesk) 是以 Rust + Flutter 打造的開源遠端桌面工具，定位為 **TeamViewer / AnyDesk 的自架替代方案**——使用者可以連公共 rendezvous/relay server 即裝即用，也可以用 [rustdesk/rustdesk-server](https://github.com/rustdesk/rustdesk-server) 把流量完全關在自家機房內，宣傳語是「Works out of the box... You have full control of your data, with no concerns about security」。

## 作者與起源

作者 **Huabing Zhou（周華冰）** 在 2020 年 COVID-19 期間於新加坡從事金融 IT（約 12 年資歷），因為公司要採購 TeamViewer 商用授權覺得過於昂貴，連夜開工寫了 RustDesk 的雛形；repo 於 2020-09-28 建立，2021 年正式在 GitHub 開源。母公司為新加坡 **Purslane Ltd**，但作者本人長期在上海工作，「公司在新加坡、開發者在中國」的雙重身份後來成為外界質疑的一個固定戰場（見第 7 段）。2025 年底公司引進新任 CEO、確立 RustDesk Pro 商業化方向，作者轉 CTO 角色（見 [Tuttle Ventures newsletter](https://newsletter.tuttleventures.com/p/rustdesk-welcomes-new-leadership) 與 [Joseph Jacks 的 X 貼文](https://x.com/JosephJacks_/status/1997043695099826395)）。

## 核心架構 / 主要概念

- **語言組成**：Rust 65.3%、Dart 25.6%、C++ 2.0%——Rust 負責傳輸/編解碼/螢幕抓取，Flutter（Dart）負責跨平台 UI（取代早期用的 Sciter）。
- **媒體/輸入**：`libvpx`、`aom`（視訊編碼）、`libyuv`、`opus`（音訊）、`scrap`（螢幕抓取）、`enigo`（鍵鼠注入）、自家 `hbb_common`。
- **連線模型**：三組角色——Client / Server / **Rendezvous-Relay**。Rendezvous server（`hbbs`）負責 ID 登記與 TCP hole punching，打不穿就 fallback 到 Relay server（`hbbr`）轉發資料。預設用 RustDesk 官方公共節點，可改指向自架。
- **Self-host 配套**：獨立 repo [rustdesk/rustdesk-server](https://github.com/rustdesk/rustdesk-server) 提供 OSS 版 `hbbs`/`hbbr`（AGPL-3.0），另有閉源商用 **RustDesk Server Pro**（Web console、LDAP、2FA、設備管理）——後者正是 OSS 社群不信任的裂縫之一。
- **平台覆蓋**：Windows / macOS / Linux（x86_64 + aarch64、Flatpak、AppImage、deb/rpm）/ Android / iOS / Web client，repo topics 包含 `wayland`、`flatpak`、`rdp`、`vnc`、`p2p`。

## 設計哲學

README 開頭一段話就把主張壓得很直白：

> "Works out of the box with no configuration required. You have full control of your data, with no concerns about security. You can use our rendezvous/relay server, set up your own, or write your own rendezvous/relay server."

翻譯：開箱即用不用設定、資料完全掌握在自己手上、server 要用官方的/自架的/重寫的都隨你——三段話各對應一條設計承諾（低上手門檻、self-host、可替換伺服器）。這是 **self-host 派** 最想聽到的句式，也是它能在 TeamViewer 每次跳「疑似商用」時被拿出來轉貼的原因。

## 目標使用者與適用情境

- **MSP / 系統管理員**：替公司從 TeamViewer/AnyDesk 遷走，走自架節省授權費，[Develeap 的遷移案例](https://www.develeap.com/how-we-replaced-teamviewer-with-rustdesk-saved-thousands-and-what-it-really-cost-us/)把「省下授權、換成維運成本」這條 trade-off 講得最清楚。
- **個人 self-host 玩家**：家用 NAS、VPS 上開 `hbbs`/`hbbr`，遠端支援親友電腦。
- **跨國小型團隊**：LAN 外的低延遲遙控、替代 VPN+VNC 組合。
- **不適用情境**：需要合規稽核、零信任架構、SOC2 文件的大型企業——閉源 Server Pro 與中國作者身份會直接被資安團隊擋下來（見第 7 段）。

## 與類似專案的差異

同樣打「遠端存取」但解法差很多，整理如下：

| 對手 | 本專案的差異 |
|---|---|
| **TeamViewer（商用閉源）** | RustDesk 完全開源、可自架，TeamViewer 有最成熟的 NAT 穿透與企業管理後台但常誤判個人用戶為商用。RustDesk 沒有商用偵測機制。 |
| **AnyDesk（商用閉源）** | RustDesk 省下 per-seat 授權與連線時間限制、支援 self-host；AnyDesk 在穿透品質、聲音、觸控筆等細節更成熟。 |
| **[tailscale/tailscale](https://github.com/tailscale/tailscale)** | Tailscale 是 WireGuard-based mesh VPN，解決「把設備串成 LAN」；RustDesk 是應用層遠端桌面。組合用法常見：Tailscale 建網 + VNC/RDP，或者直接 RustDesk 走 Tailscale 跳過官方 relay。 |

選型建議：只要個人/小團隊 self-host → RustDesk；要企業合規與客戶支援 SLA → 留在 TeamViewer/AnyDesk；想做整個網路層的 zero-trust mesh → Tailscale + 任一 RDP/VNC。

## 外部評論

- **[Hacker News — RustDesk Installs Chinese Root Certificates](https://news.ycombinator.com/item?id=39256493)**：2024-02 的帖，討論安裝包在 Windows 上加入中國根憑證的觀察，底下串成對作者身份與閉源 server 的集中質疑。
- **[Hacker News — RustDesk 不是 100% self-hosted](https://news.ycombinator.com/item?id=31879012)**：更早的一波討論，焦點是「Server Pro 是付費閉源」與作者回應態度。
- **[GitHub Discussion #1159 — Is this software owned/accessed by the CCP?](https://github.com/rustdesk/rustdesk/discussions/1159)**：官方 repo 上被多次開啟的地緣政治質疑串，作者給過回覆但相關 issue/discussion 歷史上有被刪除的紀錄。
- **[GitHub Discussion #7952 — Prohibited from use in China](https://github.com/rustdesk/rustdesk/discussions/7952)**：RustDesk 自己在 GFW 管制下把中國 IP 段擋掉，串中也被翻回來討論。
- **[Hackaday — This Week In Security: RustDesk](https://hackaday.com/2024/03/01/this-week-in-security-forksquatting-rustdesk-and-mms/)**：2024-03 整理 forksquatting 與 RustDesk 安全議題的通俗報導。
- **[Dr.Web — 詐騙份子如何用遠端管理工具偷錢](https://news.drweb.com/show/?i=14755)**：指 RustDesk 在詐騙場景中是最常被濫用的遠端工具之一，背後原因是「官方公共 relay 免費好用」。
- **[Medium — Deep dive into RustDesk RMM Investigation & Forensics on Windows](https://medium.com/@chaoskist/deep-dive-into-rustdesk-rmm-investigation-forensics-on-windows-6d8ba816a11e)**：藍隊視角的 artifact 分析，討論被濫用後如何從 Windows 端做鑑識。
- **[XDA — RustDesk vs AnyDesk](https://www.xda-developers.com/rustdesk-vs-anydesk-which-free-teamviewer-alternative-better/)**：實測文，結論是 RustDesk UX 更順、AnyDesk 細節更成熟。
- **[Develeap — How we replaced TeamViewer with RustDesk](https://www.develeap.com/how-we-replaced-teamviewer-with-rustdesk-saved-thousands-and-what-it-really-cost-us/)**：企業遷移案例，重點是「省下的授權費換成內部維運成本」。
- **[iT 邦幫忙——開源遠端桌面存取軟體 RustDesk](https://ithelp.ithome.com.tw/articles/10341212)** / **[阿正老師推薦 RustDesk（軟體玩家）](https://pcrookie.com/rustdesk/)** / **[Ivon's Blog — RustDesk 使用教學](https://ivonblog.com/posts/setup-rustdesk/)**：中文圈實測與自架教學，反映 TeamViewer 商用偵測之後 RustDesk 在華語 self-host 社群的熱度。

## Release 狀態 / 時間軸

- 2020-09-28：repo 建立
- 2021：首個 GitHub 公開版本
- 2024：爆紅點——TeamViewer 商用偵測風波 + r/selfhosted 固定推薦，同年也爆出詐騙濫用新聞
- 2025-09-15：v1.4.2
- 2025-10-17：v1.4.3
- 2025-11-19：v1.4.4
- 2026-01-09：v1.4.5
- 2026-03-05：**v1.4.6**（截至研究日的最新穩定版）
- `nightly` tag 每日滾動更新

`has_releases: true`，發版節奏約 1–2 個月一個 minor。

## 授權與社群

- **License**：AGPL-3.0（客戶端與 OSS server；Server Pro 閉源付費）
- **Stars / Forks / Watchers**：約 **111,993 stars / 16,755 forks / 578 subscribers**（2026-04-19 取樣），open issues 134
- **語言佔比**：Rust 65.3% / Dart 25.6% / C++ 2.0%（Flutter 重寫之後 Sciter 已棄用）
- **Topics**：`rust`、`flutter`、`remote-desktop`、`teamviewer`、`anydesk`、`vnc`、`rdp`、`p2p`、`wayland`、`android`、`ios`
- **增長速率**：今日 `stars_today = 351`、`growth_rate ≈ 0.31%`——絕對數爬得慢但基數大，屬於長尾穩定型明星 repo，不是一日爆紅。
- **商業化**：Purslane Ltd（新加坡）提供 RustDesk Pro / Server Pro，JJ（Joseph Jacks）2025 年底宣稱「全球 10M+ 使用者」。

## 資料來源

### 本體
- [rustdesk/rustdesk](https://github.com/rustdesk/rustdesk)
- [rustdesk/rustdesk-server](https://github.com/rustdesk/rustdesk-server)
- [官網 rustdesk.com](https://rustdesk.com/)
- [About / Team 頁](https://rustdesk.com/team/)
- [Self-host 文件](https://rustdesk.com/docs/en/self-host/)

### 第三方評論
- [HN — Chinese Root Certificates](https://news.ycombinator.com/item?id=39256493)
- [HN — not 100% self-hosted](https://news.ycombinator.com/item?id=31879012)
- [Hackaday](https://hackaday.com/2024/03/01/this-week-in-security-forksquatting-rustdesk-and-mms/)
- [Dr.Web 詐騙分析](https://news.drweb.com/show/?i=14755)
- [Medium — RustDesk RMM forensics](https://medium.com/@chaoskist/deep-dive-into-rustdesk-rmm-investigation-forensics-on-windows-6d8ba816a11e)
- [XDA vs AnyDesk](https://www.xda-developers.com/rustdesk-vs-anydesk-which-free-teamviewer-alternative-better/)
- [Develeap 企業遷移案例](https://www.develeap.com/how-we-replaced-teamviewer-with-rustdesk-saved-thousands-and-what-it-really-cost-us/)
- [Tuttle Ventures — 新 CEO 公告](https://newsletter.tuttleventures.com/p/rustdesk-welcomes-new-leadership)
- [Wikipedia — RustDesk](https://en.wikipedia.org/wiki/RustDesk)
- [iT 邦幫忙](https://ithelp.ithome.com.tw/articles/10341212) / [軟體玩家 — 阿正老師](https://pcrookie.com/rustdesk/) / [Ivon's Blog](https://ivonblog.com/posts/setup-rustdesk/)

### 同類工具
- [TeamViewer（商用，無 repo）](https://www.teamviewer.com/)
- [AnyDesk（商用，無 repo）](https://anydesk.com/)
- [tailscale/tailscale](https://github.com/tailscale/tailscale)

## 更新紀錄
