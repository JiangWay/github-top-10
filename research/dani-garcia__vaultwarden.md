---
repo: dani-garcia/vaultwarden
first_seen: 2026-04-25
last_updated: 2026-04-25
appearances: [2026-04-25]
growth_appearances: []
has_releases: true
latest_release: 1.35.7
tags: [資安, 應用程式, 自架, 資料主權, 開源替代]
domain: 資安
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

> 研究日期：2026-04-25
> 研究來源：<https://github.com/dani-garcia/vaultwarden>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

[dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden) 是用 Rust 重寫、與 Bitwarden 客戶端 API 完全相容的非官方密碼伺服器，把官方 Bitwarden self-host 那一套需要 4GB RAM、多個 docker container（MSSQL + Nginx + 多個 microservice）的架構，壓成單一 binary、約 50MB RAM 即可跑在 Raspberry Pi / NAS 上。截至 2026-04-25 約 59,119 stars / 2,725 forks / 288 watchers / AGPL-3.0 授權，自 2018-02-17 由西班牙開發者 [dani-garcia](https://github.com/dani-garcia) 建立至今已 8 年，最新版本 1.35.7（2026-04-13）。

## 深度研究（2026-04-25 首次）

### 專案定位

這是一支**用 Rust 寫成、相容於 Bitwarden 官方客戶端 API 的密碼管理 self-host server**。核心命題：使用者想要 Bitwarden 的客戶端體驗（瀏覽器外掛、桌面 app、iOS / Android、CLI 全平台），但不想付 Bitwarden 雲端訂閱、也跑不動官方 self-host 那個重量級 stack。Vaultwarden 把整個 server 端壓成一個 Rust binary + SQLite/MySQL/PostgreSQL 三選一，加上 Web Vault 前端，docker run 一行就能起來，並把 Bitwarden 官方留給付費方案的功能（Organizations、TOTP、Send、Emergency Access、Groups、Event Log）全部免費開放。專案 2021-04-29 由 `bitwarden_rs` 改名為 vaultwarden，README 開頭明確聲明「This project is not associated with Bitwarden or Bitwarden, Inc.」。

### 核心架構 / 主要概念

技術棧為 Rust 83.2% + Handlebars 10.2% + TypeScript 4.1%，Web 框架使用 [Rocket](https://github.com/rwf2/Rocket)，ORM 走 Diesel 並支援 SQLite / MySQL / PostgreSQL 三種後端、附帶 migration。container image 內已 bundle 一份**改過的 Web Vault 客戶端**（fork 自 Bitwarden 官方 web vault、補上一些 Vaultwarden 專屬欄位）。功能面實作了 Personal Vault、Send、Attachments、Website Icons、Personal API Keys、Organizations（含 collections、roles、groups、event log、admin password reset）、多因素驗證（Authenticator / Email / FIDO2 WebAuthn / YubiKey / Duo）、Emergency Access 與管理後台。所有資料皆以**用戶端加密**方式上傳——server 端只看得到密文，理論上即使 server 被打穿，密碼明文也不外洩（前提是 master password 夠強）。

### 目標使用者

（1）**家用 / homelab 自架族**——Raspberry Pi、Synology / QNAP NAS、舊筆電當伺服器的人，官方 Bitwarden self-host 跑不動或不想吃 4GB RAM；（2）**注重資料主權 / 隱私的個人或小團隊**——不願把密碼庫存在第三方雲端，希望資料留在自家網段；（3）**想用 Bitwarden 付費功能但預算為零的小型團隊 / 家庭**——TOTP、Organizations、Emergency Access 這些在官方雲端要訂閱，在 Vaultwarden 是免費；（4）**開發者**：可作為 Bitwarden client SDK 的本機測試 server。**不適合**：需要正式 SOC2 / SLA / 24x7 廠商支援的企業（沒有官方支援、沒有第三方稽核、沒有合約保障）。

### 與類似專案的差異

| 對手 | Vaultwarden 的差異 | 何時選誰 |
|---|---|---|
| [bitwarden/server](https://github.com/bitwarden/server)（官方 self-host） | Rust 單 binary 約 50MB RAM vs 多 container 4GB+ RAM；免費解鎖 Org / TOTP / Send；無官方支援、無第三方稽核 | 個人 / homelab 用 Vaultwarden；企業合規場景用官方 |
| [keepassxreboot/keepassxc](https://github.com/keepassxreboot/keepassxc) | 有 server / 即時跨裝置同步（KeePassXC 是檔案型，需自帶 Syncthing / WebDAV） | 要團隊共享、行動裝置即時同步用 Vaultwarden；單機個人用 KeePassXC |
| 1Password / LastPass（商用 SaaS） | 完全自架、零訂閱費、密碼庫不離開自家伺服器；缺商用 SLA 與一鍵恢復 | 不信第三方雲、有自架能力選 Vaultwarden；要省事用商用 |
| [passbolt/passbolt_api](https://github.com/passbolt/passbolt_api) | 客戶端生態大很多（Bitwarden 官方 app 全平台都能直連）；Passbolt 主打團隊 PGP-based 共享 | 個人 / 多平台首選 Vaultwarden；企業團隊 PKI 需求看 Passbolt |

### 外部評論

社群口碑長期極正面但有清楚的「**沒第三方稽核**」紅旗。Hacker News 上長期討論串 [Vaultwarden: Unofficial Bitwarden compatible server written in Rust](https://news.ycombinator.com/item?id=41243147) 與 [I recently discovered Vaultwarden](https://news.ycombinator.com/item?id=36467906) 普遍把它當 self-host 密碼管理的事實標準，常見一句評論是「Bitwarden is better, but Vaultwarden is so much lighter」（[HN 33810650](https://news.ycombinator.com/item?id=33810650)）。XDA Developers 的 [Self-hosting Vaultwarden is the best decision I ever made, and migrating to it took 15 minutes](https://www.xda-developers.com/self-hosting-vaultwarden-is-the-best-decision-i-ever-made/) 稱它「reliable, blazing fast, and cheap to run」。技術比較類文章 [Bitwarden vs Vaultwarden: Which to Self-Host?](https://dev.to/selfhostingsh/bitwarden-vs-vaultwarden-which-to-self-host-3ikn) 與 [Passbolt vs Vaultwarden vs Bitwarden 2026](https://ossalt.com/blog/passbolt-vs-vaultwarden-vs-bitwarden-teams-2026) 都把 Vaultwarden 列為 homelab / 小團隊首選、企業則建議官方。Bitwarden 官方論壇的 [Bitwarden vs Vaultwarden 討論串](https://community.bitwarden.com/t/bitwarden-vs-vaultwarden/15382) 則由官方員工親自回應，立場是「不反對、但請使用者理解這是非官方版本、不在我們合規範圍」。批評面主要在安全：[r/opsec 評論](https://www.g2.com/products/vaultwarden/reviews) 標記其為「secure but unaudited」——Rust 提供 memory safety，但缺 SOC2 / 第三方滲透測試；GitHub Discussion [Bitwarden Vulnerabilities: How affected is vaultwarden? [ZKAE]](https://github.com/dani-garcia/vaultwarden/discussions/6834) 則持續追蹤每次 Bitwarden 上游漏洞 Vaultwarden 是否同樣中招。值得注意的是 1.35.5（2026-04-12）一次釋出修了三個 GHSA 等級的安全漏洞（含 [GHSA-937x-3j8m-7w7p](https://github.com/dani-garcia/vaultwarden/security/advisories/GHSA-937x-3j8m-7w7p) 未確認 owner 可清空整個組織 vault），緊接著 1.35.6 / 1.35.7 又連續修 2FA 相關 regression——說明專案有積極的 CVE responsible disclosure 流程，但也提醒使用者**自架者必須自己負責升級**。

### Release 狀態

採語意化版號、節奏緊密。`gh api` 顯示最新五版皆為 2026-02 後釋出：1.35.3（2026-02-10，修 GHSA-h265-g7rm-h337）、1.35.4（2026-02-23，修三支安全漏洞）、1.35.5（2026-04-12，再修三支安全漏洞 + 大量 PR）、1.35.6（2026-04-12 hotfix MFA Remember regression）、**1.35.7（2026-04-13，修 Android 2FA）為當前最新**。從 release notes 觀察：（1）安全更新走 GitHub Security Advisory + 等 CVE 編號流程，紀律完整；（2）新貢獻者頻繁出現（1.35.5 一次新增 8 位 first-time contributor），社群健康；（3）主要 release manager 是 [BlackDex](https://github.com/BlackDex)，不是 owner [dani-garcia](https://github.com/dani-garcia) 本人——說明維護已從 solo 演化為小型核心團隊。issue tracker 開著（51 open / 與 5.9 萬 stars 比例極低），暗示 issue triage 紀律也不錯。

### 授權與社群

授權為 **AGPL-3.0**——任何修改後對外提供服務的人必須開源同樣修改，這是個強條款，企業整合前要法務審視。社群量化指標：59,119 stars / 2,725 forks / 288 subscribers / 51 open issues、語言以 Rust 為主（83.2%），topics 標 `bitwarden / bitwarden-rs / docker / rocket / rust / vaultwarden`。**最關鍵的歷史脈絡**：專案原名 `bitwarden_rs`，於 2021-04-29 由作者 dani-garcia 在 [Discussion #1642 v1.21.0 release and project rename to Vaultwarden](https://github.com/dani-garcia/vaultwarden/discussions/1642) 宣布改名，理由是「Due to user confusion and to avoid any possible trademark/brand issues with the official server, this project is going to be renamed to Vaultwarden」。當時 [Branding changes Discussion #1635](https://github.com/dani-garcia/vaultwarden/discussions/1635) 顯示作者**主動聯絡 Bitwarden 公司的 Kyle**討論並取得協議——Bitwarden 同意鬆綁，但要求 Web Vault 頁腳掛上「powered by Vaultwarden」標示（已實作）。改名是為了滿足 [Bitwarden 商標守則](https://bitwarden.com/trademark-guidelines/)：使用 Bitwarden 名稱與 logo 須在訂閱或授權範圍內。這個案例是開源社群與商業母品牌**和平共存**的典範：作者主動避險、官方不發 DMCA、雙方留條公平的線——這正是同期 [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) 對待 Anthropic 商標時所缺的態度。今日上榜推測與密碼管理工具市場近期波動（LastPass 漏洞回潮、Bitwarden 雲端訂閱漲價討論、隱私意識升溫）疊加 1.35.5–1.35.7 連三版安全更新衝擊有關。

---

生成時間：2026-04-25　資料來源：[GitHub repo](https://github.com/dani-garcia/vaultwarden)、`gh api`、[Vaultwarden 官方論壇](https://vaultwarden.discourse.group/)、Hacker News / DEV / XDA / Bitwarden 官方論壇（內文已附連結）。

## 更新紀錄
