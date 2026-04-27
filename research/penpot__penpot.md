---
repo: penpot/penpot
first_seen: 2026-04-28
last_updated: 2026-04-28
appearances: [2026-04-28]
growth_appearances: []
has_releases: false
latest_release: null
tags: [開發者工具, 應用程式, 自架, 開源替代, 資料主權]
domain: 開發者工具
form: 應用程式
themes: [自架, 開源替代, 資料主權]
---

# [penpot/penpot](https://github.com/penpot/penpot)

> 研究日期：2026-04-28
> 研究來源：<https://github.com/penpot/penpot>
> 觸發原因：首次上絕對榜（Top 10 #6）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[penpot/penpot](https://github.com/penpot/penpot) 是西班牙公司 Kaleidos 主導的「設計與程式協作」開源平台——以 SVG / CSS / HTML / JSON 等網路標準為原生檔案格式，讓設計師畫出來的東西本身就是可被開發者直接讀取、複製的程式碼，藉此挑戰 [Figma](https://www.figma.com) 的閉源 SaaS 模型。官方 tagline：「Think and build digital products. Together.」

## 作者與起源

Penpot 由西班牙顧問公司 Kaleidos 孵化。Kaleidos 過去靠開源協作工具 Taiga（Trello / Jira 風格的 kanban）累積口碑，2021 年宣布從顧問轉型為開源產品公司，把賭注全部押在 Penpot 身上。2022 年從 Decibel Partners、Athos Capital 等募得 800 萬美元 Series A——這也讓 Hacker News 上同步出現「會不會像 InVision 一樣商業化失敗」的雜音（[HN 33000243](https://news.ycombinator.com/item?id=33000243)）。

主要貢獻者由 Kaleidos 員工組成：`niwinz`（9,045 commits，後端 / Clojure 主力）、`Alotor`（2,559）、`superalex`（2,458）、`hirunatan`（1,107），跟隨其後的 `EvaMarco`、`pabloalba`、`belen-albeza` 也都掛 Kaleidos。換句話說這是企業背書的開源案，而非一群熱心個人。Adobe 收購 Figma 在 2023 年破局後，Penpot 順勢吸收一波對「設計檔被綁架」感到不安的企業用戶。

## 核心架構 / 主要概念

repo 內語言佔比高度傾斜 Clojure——後端 Clojure（10.85 MB）+ 前端 ClojureScript（不另計），配上 Rust（853 KB，疑似新引入的 wasm 渲染加速）、SCSS / TypeScript / JavaScript 等前端輔助。資料庫透過 PLpgSQL 直接寫進 PostgreSQL。

關鍵抽象：

- **以 web 標準為原生格式**：每一個 frame、shape、prototype 都直接是 SVG + CSS，而非自家 binary。export 不是「轉換」，是把內部表示直接吐出來。
- **Design Tokens 為一等公民**：原生支援設計代幣（W3C Design Tokens spec），設計系統的 source of truth 不是 Figma 風格的 plugin（Token Studio），而是內建。
- **MCP Server 整合**：近期 PR `#9184 Update MCP docs for public release` 顯示官方正在把 Penpot 暴露為 [Model Context Protocol](https://github.com/modelcontextprotocol) server，讓 LLM agent 能直接讀寫設計檔——這是繼 Figma MCP 之後的開源版本。
- **可自架**：Docker / Kubernetes / Elestio 部署皆有官方支援，企業可全數據在內網。

## 設計哲學

README 的精華句：

> "Penpot works with open standards like SVG, CSS, HTML, and JSON."
>
> "Design is expressed as code, enabling a direct translation and shipping products faster."

翻譯：Penpot 採用 SVG / CSS / HTML / JSON 等開放標準；「設計即程式碼」，省掉設計到開發之間的翻譯成本，讓出貨更快。

這句的份量在於它否定了主流設計工具的核心假設——傳統工具（Figma / Sketch）把「設計」與「程式碼」視為兩種需要 handoff 的不同產物，所以 Inspect tab、CSS export 都是補丁式的功能。Penpot 反向把 web 標準當成 single source of truth，設計檔本身就是部署用的 asset。落地表現是：dev handoff / code inspection 在 Penpot 是免費內建（Figma 是付費 dev mode）；CSS Grid 不需要外掛（Figma 仍要靠 plugin）。

## 目標使用者與適用情境

**適合**：

- 受監管產業（金融、醫療、政府）需要把設計檔留在內網，避免 SaaS 廠商收購 / 政府禁令導致檔案無法開啟。
- 設計與工程強耦合的團隊，想用 CSS Grid / design tokens 直接輸出可用 CSS，省掉 dev mode 訂閱。
- 對 Adobe 收購 Figma 引發信任危機後，已有「IP 主權」採購規格的 Fortune 500——官方在 HN 自曝早期付費客戶以這類公司為主。
- Linux 使用者：Penpot 純瀏覽器（含 self-host），不像 Figma desktop app 對 Linux 缺乏一級支援。

**不適合**：

- 需要 auto-layout 重度響應式設計、或仰賴 FigJam 白板協作的團隊——Penpot 至 2026 年仍無等價功能。
- 大型複雜檔案（>500 個 frame）：HN 評論多次點名「檔案一複雜就掉幀」、self-host 5–6 頁就吃光記憶體。
- 仰賴 Notion / Jira / Slack plugin 生態的團隊，Penpot 的擴充市集仍遠少於 Figma。

## 與類似專案的差異

| 對手 | 本專案差異 | 何時選誰 |
|---|---|---|
| [Figma](https://www.figma.com) | 開源、可自架、檔案是 SVG / CSS 而非 binary；dev handoff 免費；無 auto-layout、plugin 生態小、效能在大檔案下落後 | 要 IP 主權 / 自架 / Linux 友善 → Penpot；要 plugin 生態 / FigJam / 大團隊穩定度 → Figma |
| [Adobe XD](https://www.adobe.com/products/xd.html) | XD 已被 Adobe 實質凍結（2023 起停止個別銷售），Penpot 仍在每週發 RC | 幾乎沒有理由選 XD；遷出時可考慮 Penpot |
| [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | Excalidraw 主打手繪風白板與線框稿，Penpot 是完整 UI design + prototype + design system | 要 quick whiteboard / wireframe → Excalidraw；要產品設計流程 → Penpot |

## 外部評論

- [Hacker News：Penpot: The Open-Source Figma（2025-09，id 46064757）](https://news.ycombinator.com/item?id=46064757) — 留言 `supermatt` 抱怨「翻頁時部分元件會神秘變形，問題已存在 8 個月仍未修」；多位提到 self-host 5–6 頁就 OOM。但 `leo_e` 反駁：「只要設計檔不被鎖在專屬 cloud silo，效能日後可優化（這是程式碼）」。Penpot 員工 Pablo 在 thread 內透露早期付費客戶以 Fortune 500 為主，平台累積 1.2M 用戶、月新增 30k SaaS 註冊。
- [Hacker News：Penpot 2.0 Released（2024-04，id 39978781）](https://news.ycombinator.com/item?id=39978781) — 主要疑慮集中在商業可持續性與「ClojureScript 讓多數前端開發者無法貢獻」的技術門檻；正面意見則認為 Adobe 併購 Figma 失敗後 Penpot 是天然受益者。
- [XDA Developers：I stopped using Figma and switched to Penpot](https://www.xda-developers.com/switched-from-figma-to-penpot/) — 作者指 UI 與 Figma 高度相似，「上手幾乎零成本」，最大缺口是缺白板工具，但結論是「Penpot is here to stay」。
- [Design Systems Collective：Penpot vs Figma 2025 — Is Open-Source Redefining Design Strategy?](https://www.designsystemscollective.com/penpot-vs-figma-2025-is-open-source-redefining-design-strategy-14de28682c9b) — 把 Penpot 定位為「成熟到可在生產環境用」、500k 活躍用戶級別的真實選項，建議重視 IP / 合規 / CI/CD 整合的團隊優先採用。
- [DesignWhine：Penpot Vs Figma Review](https://www.designwhine.com/penpot-vs-figma-review/) — 推 dev handoff 免費 + 內建 design tokens；批 component variants 仍弱於 Figma、缺 auto-layout。
- [騰訊雲開發者社群：Penpot 吸引开发者，用开源工具挑战 Figma](https://cloud.tencent.com/developer/article/2401701) — 中文社群觀點，強調「介面已支援中文」與自架不被廠商挾持的賣點。
- [博客園：Figma 替代品 Penpot 安装和使用教程](https://www.cnblogs.com/ryanyangcs/p/18373553) — 簡中圈最早的 self-host 教學之一，反映在 Figma 中國區政策不穩後的避險需求。

## Release 狀態 / 時間軸

`gh api repos/penpot/penpot/releases` 回傳空陣列——**Penpot 不使用 GitHub Releases 頁面發版**，所有版本以 git tag 形式存在 repo（如 `2.16.0-RC1`、`2.15.0-RC1`、`2.14.5-RC2`、`2.14.5-RC1`、`2.14.4`、`2.14.3` 等），release notes 改放在 [penpot.app/blog](https://penpot.app/blog) 與官方文件。frontmatter 因此標 `has_releases: false`。

時間軸：

- **2015-12-29** repo 建立（最早叫 UXBOX）。
- **2021-02** Alpha 公開，HN 26000257 首發。
- **2022-09** 募得 8M USD A 輪。
- **2024-04-10** Penpot 2.0 GA，主打 CSS Grid + Flex Layout，HN 39978781 大量討論。
- **2025-09** Adobe 凍結 XD、Figma 收購案破局後，Penpot 在 HN 46064757 再次登上首頁。
- **2026-04-27** 仍維持每週 RC 節奏（最新 tag `2.16.0-RC1`）。
- **2026-04-28** 首次登 [github-top-10](https://github.com/JiangWay/github-top-10) 絕對榜 #6（46,479 stars，+283/日）。

## 授權與社群

- **License**：Mozilla Public License 2.0（MPL-2.0）——比 GPL 寬鬆但仍要求修改檔案 copyleft，企業可自架但不能私改成閉源 SaaS 對外賣。
- **量化鐵錨**：46,479 stars / 2,786 forks / 251 watchers / 584 open issues，未啟用 GitHub Releases 但 git tag 數量龐大（每週 RC）。
- **語言佔比**：Clojure 79.0%（10.85 MB）、JavaScript 8.3%、Rust 6.2%、SCSS 5.5%、TypeScript 2.5%、其餘 < 2%。Rust 比例顯示底層渲染正在 wasm 化。
- **Contributors**：總計 100+，但工作集中——前 5 名（`niwinz` / `Alotor` / `superalex` / `hirunatan` / `EvaMarco`）合計超過 16,000 commits，明顯是公司內部 team。
- **Topics**：`clojure`, `clojurescript`, `design`, `prototyping`, `ui`, `ux-design`, `ux-experience`。
- **近期 PR 速率**：抓樣本 #9179–#9192 都在 2026-04 發出，平均每日 1–2 PR；近期重點包含 wasm 渲染加速、MCP server 文件公開、外部 vector 貼上保留——顯示「設計檔即 LLM agent 入口」是現階段策略主軸。
- **討論區**：`has_discussions: true`，另有 [community.penpot.app](https://community.penpot.app) Discourse 站。

## 資料來源

**本體**：

- GitHub repo：<https://github.com/penpot/penpot>
- 官網：<https://penpot.app>
- 公司：<https://kaleidos.net>
- 社群論壇：<https://community.penpot.app>

**第三方評論**：

- [Hacker News id=46064757](https://news.ycombinator.com/item?id=46064757)
- [Hacker News id=39978781](https://news.ycombinator.com/item?id=39978781)
- [Hacker News id=33000243](https://news.ycombinator.com/item?id=33000243)
- [XDA Developers — switched from Figma to Penpot](https://www.xda-developers.com/switched-from-figma-to-penpot/)
- [Design Systems Collective — Penpot vs Figma 2025](https://www.designsystemscollective.com/penpot-vs-figma-2025-is-open-source-redefining-design-strategy-14de28682c9b)
- [DesignWhine — Penpot vs Figma Review](https://www.designwhine.com/penpot-vs-figma-review/)
- [騰訊雲：Penpot 吸引开发者，用开源工具挑战 Figma](https://cloud.tencent.com/developer/article/2401701)
- [博客園：Penpot 安装和使用教程](https://www.cnblogs.com/ryanyangcs/p/18373553)

**同類工具**：

- [Figma](https://www.figma.com)
- [Adobe XD](https://www.adobe.com/products/xd.html)
- [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)
- [Sketch](https://www.sketch.com)

## 更新紀錄
