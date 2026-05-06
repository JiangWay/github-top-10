---
repo: docusealco/docuseal
first_seen: 2026-05-06
last_updated: 2026-05-07
appearances: [2026-05-06, 2026-05-07]
growth_appearances: [2026-05-06, 2026-05-07]
has_releases: true
latest_release: 2.5.2
tags: [文件管理, 應用程式, 自架, 開源替代, 資料主權]
domain: 文件管理
form: 應用程式
themes: [自架, 開源替代, 資料主權]
---

# docusealco/docuseal

## 深度研究（2026-05-06 首次）

### 專案定位
[docusealco/docuseal](https://github.com/docusealco/docuseal) 是開源版的 DocuSign 替代品，解決商務電子簽署綁死 SaaS、資料外送、按人頭計價的痛點。使用者可自架伺服器、用 PDF 表單建構器設計欄位（簽名、日期、勾選、檔案上傳等 12 種），讓多位簽署者跨裝置完成填寫與簽署，全程掌握資料與成本。

### 核心架構 / 主要概念
後端 Ruby on Rails、前端 Vue.js、樣式 Tailwind CSS，預設 SQLite，可換 PostgreSQL 或 MySQL。內建 SMTP 通知、AWS S3／Google Cloud／Azure 物件儲存、PDF 自動簽章與驗證；對外提供 API、Webhook 與 React／Vue／Angular 嵌入式簽署元件。部署支援 Docker、Docker Compose，以及 Heroku、Railway、DigitalOcean、Render 一鍵安裝。

### 目標使用者
中小企業 IT 與 DevOps、需資料留在境內或產業合規的銀行、醫療、房仲、電商團隊；以及想把簽署流程嵌進自家 SaaS、不願將客戶 PDF 交給第三方的開發者。

### 與類似專案的差異
相較 [OpenSignLabs/OpenSign](https://github.com/OpenSignLabs/OpenSign)（Node.js／Parse Server，AGPL），DocuSeal 走 Rails 單體、UI 較完整、嵌入式元件覆蓋三大前端框架；對比 [documenso/documenso](https://github.com/documenso/documenso)（Next.js／TypeScript），DocuSeal 部署選項與一鍵 PaaS 模板更多、語系（簽署 14 種、UI 7 種）也較廣，但 Documenso 的 TS 生態整合較對 JS 團隊胃口。

### 外部評論
- 2023 年 7 月 Show HN 首次曝光，作者自述「對主流簽署工具不滿意」而開源，社群討論集中在資料主權與輕量部署可行性 [Hacker News：Docuseal: Open-source DocuSign alternative](https://news.ycombinator.com/item?id=36798593)。
- 德國 heise online 評 2.3.0 版加入 AI 表單辨識與安全強化，視為「目前功能最完整的開源 DocuSign 替代品」 [heise：DocuSeal 2.3.0 Open-source alternative to DocuSign with AI features](https://www.heise.de/en/news/DocuSeal-2-3-0-Open-source-alternative-to-DocuSign-with-AI-features-11150599.html)。
- DEV Community 教學整理 Railway 自架成本約每月 5–15 美元（含 app、PostgreSQL、Redis），相較 DocuSign 每席 15–65 美元具明顯成本優勢 [DEV Community：Self-hosting DocuSeal the easy way](https://dev.to/atakanozt/self-hosting-docuseal-the-easy-way-1o4m)。
- 同時也有 self-hoster 在 GitHub Discussion #273 抱怨「自架仍需付 PRO 訂閱」與授權邊界 [GitHub Discussion #273：Do you hate selfhosters?](https://github.com/docusealco/docuseal/discussions/273)。

### Release 狀態
最新版 2.5.2 於 2026-05-04 發布，修正過期 submission 篩選與例行安全／效能強化；發版節奏穩定，主要由維運團隊 AlexBTurchyn 推進。

### 授權與社群
AGPL-3.0；13,856 stars、1,251 forks、115 open issues、56 watchers。核心貢獻者 [omohokcoj](https://github.com/omohokcoj)（2,072 commits，作者）與 [AlexBTurchyn](https://github.com/AlexBTurchyn)（555 commits）為長期主力，搭配 Dependabot 與少量外部 PR；倉庫開啟 GitHub Discussions，官方另有 SaaS 版（docuseal.com）與 PRO 訂閱支撐商業化。

### 2026-05-07
- 連榜 Day 2（5-06、5-07），絕對榜守 **#4**（持平）；增長率榜由 **#3 → #4**（-1）；growth_rate 6.70% → **5.25%**（-1.45pp）；stars_today 929 → **772（-16.9%）**；total stars 13,856 → 14,712（+856）。
- Release 端**無新版本**（最新仍為 [2.5.2](https://github.com/docusealco/docuseal/releases/tag/2.5.2)，2026-05-04 發布）。
- 在 6 檔換血、7 個 domain 大洗牌的當日，[docusealco/docuseal](https://github.com/docusealco/docuseal) 是文件管理類別唯一守住絕對榜位置的代表，連榜熱度雖回落但仍穩定貢獻當日 6.4% 的 stars_today。
