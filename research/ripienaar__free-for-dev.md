---
repo: ripienaar/free-for-dev
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材]
domain: 教學資源
form: 課程教材
themes: []
---

# ripienaar/free-for-dev — DevOps / Infra 開發者的免費方案目錄，活了 11 年

> 一份 2015 年 3 月開站、累積 1600+ 人協作、127,198 stars 的 awesome-list，專收 SaaS / PaaS / IaaS 的**長期免費方案**（不是試用版）。今天（2026-06-30）首次擠進絕對榜 #8，+740 stars，整天連續 5 個 commit 都在改 README，是典型「老倉穩定吃流量、某次外部曝光突然放大」的長尾節奏。

## 一句話定位

[ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) 把全球 SaaS / PaaS / IaaS 廠商的「永久免費或至少一年免費」方案，按 58 個 DevOps / Infra 相關類別整理成單一 README，目標讀者是系統管理員、DevOps 工程師、Infra 開發者。

## 為什麼今天上榜

- 排名：絕對榜 #8，+740 stars / 日
- 觸發因素：repo 本身沒有新 release，純粹是內容流量
- 今天的 commit 量：5 筆，全部圍繞「新增 [Chrome Remote Desktop](https://remotedesktop.google.com/) 到 Remote Desktop Tools」這一個 PR (#4534)，由 [Samarth Singhal](https://github.com/a12dongithub) 提交、R.I.Pienaar 親自 merge
- 半年累計：2026 上半年合併 168 個 PR，平均每月 28 個 PR，說明它不是「停更老倉」，是持續滾動的活倉
- 老倉上 trending 通常來自外部曝光（HN、Reddit、YouTube tutorial、中文社群轉貼），但本次未找到單一明確外部信號；考量到 6 月底是不少新人「想找便宜雲端練手」的時節，自然搜尋累積也可能推動單日 spike

## 作者與起源

維護者 [R.I.Pienaar](https://github.com/ripienaar)（部落格 [devco.net](https://www.devco.net/)）是 DevOps 老兵。

- **MCollective**（The Marionette Collective）作者，後來這個專案賣給 [Puppet Labs](https://github.com/puppetlabs)，成為 Puppet 生態的併行 orchestration 框架
- 自 2016 年起寫 [Choria](https://choria.io/)，把 MCollective 換成 [NATS](https://nats.io/) 訊息層，給 Puppet 4+ 用戶用
- 自由 DevOps 顧問身分維護 free-for-dev 至今，最初是個人筆記，2015-03-18 推上 GitHub（從 repo `created_at` 字段確認）

換言之，這份清單來自「天天踩 SaaS / IaaS 廠商定價地雷」的人，挑選標準帶有強烈 Infra 偏見，這也是它和泛用 awesome list 的差異所在。

## 收錄範圍與規則

README 開頭寫得很硬：

- **必須提供 free tier，不是 free trial**：時間限制型的至少要給滿一年
- **不收 self-hosted 軟體**：只收 as-a-Service
- **TLS 不能鎖在付費方案**：換句話說，要免費就要連加密都免費
- **限定 infra / DevOps 興趣**：例如純設計工具不會被收，但 [Cloudflare](https://www.cloudflare.com/)、[Fly.io](https://fly.io/)、CI/CD 平台這類就會收

這套規則由 1600+ 貢獻者經 7,076 個 commit、4,534 個 PR 共同維護（含截至 2026-06-30 的最新 PR 編號）。

## 主要功能與內容結構

58 個分類，依 README 出現順序（截至 2026-06-30）：

1. Major Cloud Providers' Always-Free Limits（AWS / GCP / Azure / [Oracle Cloud](https://www.oracle.com/cloud/free/) always-free quota 對照表）
2. Cloud management solutions
3. Analytics, Events, and Statistics
4. APIs, Data and ML
5. Artifact Repos
6. BaaS（Backend-as-a-Service）
7. Low-code Platform
8. CDN and Protection
9. CI and CD
10. CMS
11. Code Generation
12. Code Quality
13. Code Search and Browsing
14. Crash and Exception Handling
15. Data Visualization on Maps
16. Managed Data Services
17. Design and UI
18. Dev Blogging Sites
19. DNS
20. Docker Related
21. Domain
22. Education and Career Development
23. Email
24. Feature Toggles Management Platforms
25. Font / 26. Forms / 27. Generative AI
28. IaaS / 29. IDE and Code Editing
30. International Mobile Number Verification API and SDK
31. Issue Tracking and Project Management
32. Log Management
33. Mobile App Distribution and Feedback
34. Management Systems / 35. Messaging and Streaming
36. Miscellaneous / 37. Monitoring
38. PaaS / 39. Package Build System
40. Payment and Billing Integration
41. Privacy Management / 42. Screenshot APIs
43. Flutter Related and Building iOS Apps without Mac
44. Search / 45. Security and PKI
46. Authentication, Authorization, and User Management
47. Source Code Repos / 48. Storage and Media Processing
49. Tunneling, WebRTC, Web Socket Servers and Other Routers
50. Testing / 51. Tools for Teams and Collaboration
52. Translation Management / 53. Visitor Session Recording
54. Web Hosting / 55. Commenting Platforms
56. Browser-based hardware emulation
57. Remote Desktop Tools
58. Other Free Resources

對應網站 [free-for.dev](https://free-for.dev/) 由 GitHub Pages 渲染同一份 README，提供分類側欄與搜尋。

## 技術細節

repo 並非程式碼倉，README 是純 Markdown，網站側用 GitHub Pages（已啟用 `has_pages: true`）把 Markdown 轉成 HTML，這也是 GitHub 把語言判定為 HTML 的原因。

值得注意的工程設定：

- `has_issues: false`：issues tracker 已關閉，所有討論與更新都走 PR
- `has_wiki: false` / `has_discussions: false`：刻意把入口收斂到 PR
- `license: null`：倉本身沒掛 license，這在 awesome list 圈算偏向「按 GitHub 預設條款使用 README 內容」，引用時要留意
- 預設分支：`master`（沒切到 `main`）

這種「issues 關掉、只收 PR」的治理方式對 1600+ 貢獻者的 awesome list 是合理選擇：閒聊就不接，只接帶具體服務變更的 PR。

## 生態系與相依

repo 沒有 package 相依。以下指 awesome list 圈內的位置：

- **trackawesomelist.com** 替它做每日 diff，產出 [Track Free for Dev](https://www.trackawesomelist.com/ripienaar/free-for-dev/) 訂閱頁
- **awesomerank.github.io** 把它收進 [Awesome Rank 排序頁](https://awesomerank.github.io/lists/ripienaar/free-for-dev.html)
- **GitHub Topics**：自掛 `awesome-list`、`free-for-developers`

## 與類似專案的差異

| 維度 | [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) | [sindresorhus/awesome](https://github.com/sindresorhus/awesome) | [awesome-selfhosted/awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) | [Hack-with-Github/Free-for-Students](https://github.com/Hack-with-Github/Free-for-Students) |
|---|---|---|---|---|
| Stars | 127,198 | 480,132 | 302,018 | ~9,000 量級 |
| 創立 | 2015-03 | 2014-07 | 2015-06 | 2017 |
| 範圍 | DevOps / Infra **免費 SaaS** | **所有 awesome list 的 meta 索引** | **可自架的開源網路服務** | 學生身分專屬免費資源 |
| 收 SaaS？ | 是，且僅收 free tier | 不直接收，只索引其它 list | 不收 SaaS，只收 self-hosted | 是，含學生帳號優惠 |
| 收 self-hosted？ | 否（明文排除） | 不直接收 | 是 | 部分 |
| 規則嚴格度 | 嚴（必須 ≥1 年免費 + TLS 不能付費鎖） | 鬆（看子清單自己） | 嚴（必須開源 + 可自架） | 中（限學生 email） |
| 維護者風格 | 個人 + 1600+ PR 貢獻者 | [Sindre Sorhus](https://github.com/sindresorhus) 個人品牌 + 組織化分工 | 組織帳號集體治理 | 組織帳號 |

關鍵差異一句話：sindresorhus/awesome 是「awesome 之 awesome」的中央索引，free-for-dev 是「免費 SaaS 商業方案目錄」、awesome-selfhosted 是「自架替代品目錄」、Free-for-Students 則綁學生身分。這四份清單覆蓋互補而非互斥，同一個工具（例如 GitLab）可能同時出現在 free-for-dev（SaaS 免費版）與 awesome-selfhosted（CE 自架版）。

## 社群動能與外部評論

- 2026 上半年合併 168 個 PR、平均每月 28 個，以 11 年老倉而言屬於穩定活躍區間
- 最新 5 筆 commit（2026-06-30）全部由 R.I.Pienaar 親 merge，反應時間從 PR 提交到 merge 在 4 小時內
- Top contributor 分佈（依 contributor stats）：
  - [ripienaar](https://github.com/ripienaar) 118 commit（維護者本人）
  - [Skxxtz](https://github.com/Skxxtz) 83、[thispsj](https://github.com/thispsj) 54、[TraderStf](https://github.com/TraderStf) 53
  - 其餘 1600+ 貢獻者多為一次性 PR
- HN 歷年至少有 [Free for Developers (HN 2021)](https://news.ycombinator.com/item?id=26239711) 與 [Free Stuff for Developers (HN 2021)](https://news.ycombinator.com/item?id=27575617) 兩次曝光（HN 頁本次 fetch 觸發 429，無法擷取留言內容，但 thread ID 留作後續追蹤）
- 中文社群多以教學文形式介紹，例如 [Free for dev - list of software (DEV Community)](https://dev.to/alexandrefreire/free-for-dev-list-of-software-saas-paas-iaas-etc-2jme)

對「stale 服務」的常見質疑：crowdsourced 清單無法即時反映廠商悄悄收緊 free tier 條款，這點靠 issues 關閉、只收 PR 的設計部分緩解。當社群成員發現條款變了，會直接提 PR 修改，最新半年 168 PR 就是這個機制的證據。

## 風險與限制

- **無 license**：repo 沒掛 SPDX license，引用 README 內容到自己的網站要先看 GitHub 預設條款，商業使用前最好聯絡 maintainer
- **issues 關閉**：使用者不能直接報「這家廠商砍 free tier 了」，必須開 PR
- **scope 偏 infra**：純前端開發者、設計師、學生需求覆蓋率較低；學生請看 [Hack-with-Github/Free-for-Students](https://github.com/Hack-with-Github/Free-for-Students)，自架請看 [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted)
- **無 release / 無版本號**：消費者只能 watch repo 或訂閱 [trackawesomelist](https://www.trackawesomelist.com/ripienaar/free-for-dev/) 追日 diff
- **單點維護**：所有 PR 由 R.I.Pienaar 一人 merge（top contributor 統計可佐證），若他長期離線會直接停擺

## 給讀者的建議

- **要查雲端 always-free**：先看 README 的「Major Cloud Providers' Always-Free Limits」段，比官網對照表清楚
- **要追新增條目**：訂閱 [Track Free for Dev](https://www.trackawesomelist.com/ripienaar/free-for-dev/) 的 daily / weekly diff，比 watch repo 噪音少
- **想貢獻**：開 PR，遵守「≥1 年免費 + TLS 不能付費鎖 + Infra 相關」三條規則
- **想引用內容到自己的 wiki / 公司內網**：先看 license 欄位（目前 null），謹慎處理
- **學生 / 自架需求**：搭配 [Hack-with-Github/Free-for-Students](https://github.com/Hack-with-Github/Free-for-Students) 與 [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) 一起看

## 一句話總評

11 年滾動、127k stars 的長尾老倉，由 DevOps 老兵主刀、1600+ 人輸入的「免費 SaaS 黃頁」；今天上 trending 不是因為發布什麼新功能，而是 PR #4534 加上一條 Chrome Remote Desktop 與長期累積的搜尋流量交會的結果。

## 更新紀錄
