---
repo: rmyndharis/OpenWA
first_seen: 2026-05-22
last_updated: 2026-05-22
appearances: [2026-05-22]
growth_appearances: [2026-05-22]
has_releases: true
latest_release: v0.1.6
tags: [開發者工具, 應用程式, 自架, 資料主權, 開源替代]
domain: 開發者工具
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

## 深度研究（2026-05-22 首次）

### 專案定位
[rmyndharis/OpenWA](https://github.com/rmyndharis/OpenWA)（5,319 stars、MIT、TypeScript、2026-02-02 開倉）是自架 WhatsApp HTTP API Gateway，目標取代 WATI / Twilio 等付費 BSP，讓開發者把 WhatsApp 訊息能力接進自家應用而不被廠商鎖定。官網 [open-wa.org](https://www.open-wa.org/) 強調 100% free、無 paywall、資料留在自家伺服器。

### 核心架構 / 主要概念
NestJS 11 + TypeScript，底層 WhatsApp 引擎為 [pedroslopez/whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)（WhatsApp Web 自動化）。pluggable 三軸可換而不動程式碼：DB（SQLite ↔ PostgreSQL）、Storage（Local ↔ S3/MinIO）、Cache（Memory ↔ Redis）。Docker Compose 一鍵啟動，Dashboard 在 `:2886`、REST API 在 `:2785/api`、Swagger 內建。功能涵蓋多 session、文字／媒體／文件、群組、Channels／Newsletter、bulk send、HMAC webhook、per-session proxy、rate limit、CIDR 白名單。

### 目標使用者
需要把 WhatsApp 整合進 CRM／客服／行銷自動化但又無法接受 Meta Cloud API 審核流程或 BSP 月費的中小團隊；姊妹倉 [rmyndharis/OpenWA-n8n](https://github.com/rmyndharis/OpenWA-n8n) 提供 n8n 工作流節點，定位「low-code 自動化」這條 funnel。

### 與類似專案的差異
**不是** [open-wa/wa-automate-nodejs](https://github.com/open-wa/wa-automate-nodejs) 的 fork——同名但無 git 親緣，wa-automate 是 library，OpenWA 是現成 gateway 應用。也不同於 [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)（直連 WebSocket／低階 library）。對標的是 [devlikeapro/waha](https://github.com/devlikeapro/waha) 等同類 gateway，但 OpenWA 押 MIT 全開源 + 內建 Dashboard + 三軸 pluggable backend。

### 外部評論
- 官方著陸頁 [open-wa.org](https://www.open-wa.org/) 主打「No vendor lock-in. No paywall. Just code.」是當前主要對外論述。
- SourceForge 鏡像 [openwa.mirror](https://sourceforge.net/projects/openwa.mirror/) 顯示已被第三方目錄收錄擴散。
- 第三方獨立評測 / HN / Reddit 討論串目前搜尋不到，資料不足。

### Release 狀態
共 5 個 release：v0.1.1（2026-02-17）→ v0.1.3 → v0.1.4 → v0.1.5（2026-04-27 修 SQLite 首啟 crash／PostgreSQL `jsonb` 衝突）→ v0.1.6（2026-05-17，登榜前 5 日）。版號仍在 0.1.x 早期但 release cadence 穩定，CI／Dockerfile 已升 Node 22 LTS。

### 授權與社群
MIT、預設分支 main、1,064 forks、38 open issues、30 subscribers。Contributor 高度集中於原作者 rmyndharis（72 commits），其餘為 dependabot bot；屬個人主導但工具鏈成熟（GitHub Actions release workflow、Dependabot、codecov）的早期專案。
