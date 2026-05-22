---
repo: odoo/odoo
first_seen: 2026-05-23
last_updated: 2026-05-23
appearances: [2026-05-23]
growth_appearances: [2026-05-23]
has_releases: false
latest_release: null
tags: [企業治理, 應用程式, 自架, 開源替代]
domain: 企業治理
form: 應用程式
themes: [自架, 開源替代]
---

# [odoo/odoo](https://github.com/odoo/odoo)

## 深度研究（2026-05-23 首次）

### 專案定位
[odoo/odoo](https://github.com/odoo/odoo) 是比利時 Odoo S.A. 維護的開源企業營運套件，以單一框架涵蓋 CRM、會計、庫存、製造、電商、HR、POS、行銷自動化等模組，定位為 SAP／NetSuite 的開源替代品。

### 核心架構 / 主要概念
- **Modular ERP**：核心 framework + 數百個 addon 模組，可單獨安裝啟用；單一 PostgreSQL schema 共享資料。
- **技術棧**：Python 51.8% 後端（自製 ORM／RPC／QWeb 模板）＋ JavaScript 44% 前端（OWL framework）。
- **版本分支制**：repo 不發 GitHub Release，改以長期分支管理（5.0 → 19.0，default branch `19.0`），LTS 由 Odoo S.A. 自家提供。
- **Community vs Enterprise**：本 repo 是 Community Edition（LGPL-3）；Enterprise（OEEL 商用授權）含額外 app（會計核心進階、Studio、行動端等）與雲端 SaaS。

### 目標使用者
中小企業（SMB，年營收 $1M–$20M 區間最常見）、ERP 系統整合商與 Odoo 開發者；自架部署透過社群版本入門，成長後升級至 Enterprise SaaS。

### 與類似專案的差異
相對 [frappe/erpnext](https://github.com/frappe/erpnext)（Frappe 框架，模組少但更輕量、純開源）與 [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr)（PHP 寫成、極輕量、適合微型團隊），Odoo 模組數量與生態規模最大、UI 最現代、客製化最深，但相應地框架複雜度與商業合作夥伴依賴度也最高；相對 SAP／NetSuite 則勝在開源可自架與授權成本，但企業級會計／多公司治理仍常被批不夠穩定。

### 外部評論
- [Hacker News：Story of Odoo（Open-Sourced Competitor to Oracle/SAP）](https://news.ycombinator.com/item?id=21865699) — 社群討論其開源戰略與長期軌跡。
- [Hacker News：實戰導入 SMB 經驗](https://news.ycombinator.com/item?id=21868241) — 整合商分享 OCA 社群、框架上手快但「長年累積的銳邊不少」。
- [The Ledger Labs：CPA 2026 評測](https://theledgerlabs.com/odoo-review-pros-cons-features-and-more/) — 結論「只適合 $1M–$20M 規模、已超越 QuickBooks 但還沒到 NetSuite 的 SMB」。
- [Aktiv Software：Odoo 19 新功能總覽](https://www.aktivsoftware.com/introducing-odoo-19-updates-and-features/) — AI Bill Parsing、AI Reconciliation、AI 需求預測、PEPPOL 58 國電子發票合規。

### Release 狀態
`gh api repos/odoo/odoo/releases` 回傳空陣列——Odoo 不使用 GitHub Releases，改以版本分支管理。目前 default branch 為 **19.0**（Odoo 19，2026 年釋出，首度設立「AI section」整合 Bill Parsing／Reconciliation／lead scoring，並升級 Shopfloor 與 POS 同步），歷史分支可追溯至 5.0；最新一次 push 於 2026-05-22。

### 授權與社群
Community Edition 採 **LGPL-3.0**，Enterprise 採 **OEEL** 商用授權。比利時 Odoo S.A. 主導，全球 32.5k forks、200,072 commits、5k+ open PRs；前五大貢獻者皆為 Odoo 員工（tde-banana-odoo 7,722、fpodoo 5,972、xmo-odoo 5,481、KangOl 4,923、odony 3,563），外加 OCA（Odoo Community Association）維護的數千個第三方模組生態。
