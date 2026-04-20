---
repo: koala73/worldmonitor
first_seen: 2026-04-21
last_updated: 2026-04-21
appearances: [2026-04-21]
growth_appearances: []
has_releases: true
latest_release: v2.5.23
tags: [情報監測, 應用程式, 自架, 資料主權, 開源替代]
domain: 情報監測
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [koala73/worldmonitor](https://github.com/koala73/worldmonitor)

> 研究日期：2026-04-21
> 研究來源：<https://github.com/koala73/worldmonitor>
> 觸發原因：首次上絕對榜（#6，stars_today 477）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

World Monitor 是一個把 65+ 條公開 OSINT 來源、3D 地球與本地 LLM 綁在同一個 TypeScript 桌面/網頁 app 裡的「單機版 Palantir」，重點不是新演算法，而是把原本分散在 Telegram 頻道、flight tracker、交易所行情、衛星警報的情報**聚到同一張地圖上，且不需要任何 API key 或雲端帳號**。

## 作者與起源

repo 由 [koala73/worldmonitor](https://github.com/koala73/worldmonitor)（顯示名 Elie Habib，GitHub id 996596）於 **2026-01-08** 建立，主要貢獻者只有作者本人（3,147 commits），其次是 `SebastienMelki`（51 commits）與 `claude` bot（52 commits，顯示大量程式由 AI 協同撰寫）。專案描述把自己定位為 "situational awareness interface"，官網 [worldmonitor.app](https://worldmonitor.app) 自稱已有「2M+ users across 190 countries」——這個走向不是典型 dev tool，而是民用情報產品。

起源的語境是 2025–2026 年地緣事件頻發（中東衝突、紅海航運、GPS 干擾）之下，普通分析師與記者缺乏一個「不用付 Palantir／不用接 Recorded Future」的整合視圖；作者把自己 hack 出的 dashboard 直接公開。

## 核心架構 / 主要概念

- **前端**：Vanilla TypeScript + Vite，刻意不用 React/Vue，降低 bundle size；地圖用 `globe.gl`（Three.js，3D 地球）與 `deck.gl` + `MapLibre GL`（WebGL 扁平地圖）並存，提供 45 條資料圖層。
- **桌面**：**Tauri 2 (Rust)** 打包，macOS/Windows/Linux 都出 AppImage/dmg/nsis（從 release assets 可見）；比 Electron 輕。
- **AI**：走 **Ollama / Groq / OpenRouter** 三選一，也可用瀏覽器內的 `Transformers.js` 離線跑摘要——整個設計的核心論點是「情報摘要不該送到第三方雲端」。
- **API**：自製 Proto-first RPC 框架 **Sebuf**，92 個 proto、22 個 service；部署在 Vercel Edge + Railway relay，Redis (Upstash) 三層 cache。
- **變體**：單一 codebase 透過 build flag 產出 5 個站：`world` / `tech` / `finance` / `commodity` / `happy`（正面新聞版）。
- 21 種語言、支援 RTL；資料源包含 Wingbits ADS-B 航班、OREF 以色列警報、27 個 Telegram OSINT 頻道、GPS/GNSS 干擾層。

語言分布（`gh api .../languages`）：TypeScript 57%、JavaScript 38%、CSS 4%、Rust 0.3%（Tauri 外殼）、Astro 0.09%。

## 設計哲學

README 中最具辨識度的一段：

> "Every feature, data source, and AI capability is available at no cost with no account required. … You can use the public API at api.worldmonitor.app or self-host the entire stack. There are no API keys required for public endpoints and no usage fees."

（每項功能、資料源、AI 能力皆免費且不需帳號；公開 API 不需 key、不收費，也可整個 stack 自架。）

這段值得注意的不是「免費」，而是把 **"no account required"** 放進設計契約——等於明確排除了「我先做 SaaS、再開源 community edition」的常見路線。AGPL-3.0 非商業授權選擇也強化了這件事：商用與 rebranding 得另談 commercial license，個人與研究者則完全自由。

## 目標使用者與適用情境

合用的情境：獨立記者、OSINT 分析師、量化交易員需要盤前掃一眼地緣風險、資安團隊要 spot-check 一個國家的 infrastructure 異常、或教學單位做情報課程的展示。**不合用的情境**：企業級情報平台的合規需求（沒有 SSO/RBAC/審計軌跡）、需要歷史資料回溯與自建 taxonomy 的威脅情報工作流（這是 [OpenCTI/opencti](https://github.com/OpenCTI-Platform/opencti) 的領地），或需要私有資料庫整合的內部調查（該用 Palantir）。

## 與類似專案的差異

| 比較項 | [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | [OpenCTI-Platform/opencti](https://github.com/OpenCTI-Platform/opencti) | [smicallef/spiderfoot](https://github.com/smicallef/spiderfoot) |
|---|---|---|---|
| 定位 | 即時全球儀表板（OSINT 消費端） | STIX 2 威脅情報平台（OSINT 生產端） | 自動化 footprint 蒐集與 recon |
| 主要輸出 | 地圖 + 新聞流 + AI 摘要 | 關聯圖 + entity 資料庫 | target 的 surface 報告 |
| 資料模型 | 500+ feed、45 圖層（去正規化） | STIX 2 物件模型（強結構） | 目標為中心（per-scan） |
| 部署 | Tauri 桌面 app / PWA / 自架 | Docker compose、企業級 | Python CLI / web UI |
| AI | 內建 Ollama/Groq 摘要與分析 | 無（靠 connector 擴充） | 無 |
| 授權 | AGPL-3.0（商用需另購） | Apache-2.0 | MIT |
| 適合誰 | 分析師即時監控、新聞消費 | 企業 SOC/CTI 團隊 | 紅隊/滲透前期偵察 |

關鍵差異：OpenCTI 是「把情報存起來做關聯」的 **back-office**，World Monitor 是「把情報鋪到一張地圖讓你盯著看」的 **front-office**。兩者互補，不是直接替代。

## 外部評論

- Hacker News 首發 [Worldmonitor: Real-time global intelligence dashboard](https://news.ycombinator.com/item?id=47146019) 與後續 [World Monitor – Real-Time Global Intelligence Dashboard](https://news.ycombinator.com/item?id=47137414)——社群討論點聚焦在「是否真的 AGPL 可自架」與「為何不用 React」兩題。
- 作者另一篇 [Monitor your world with one daily report](https://news.ycombinator.com/item?id=47108261) 講 daily digest 版本，是 worldmonitor 生態的延伸。
- 同時期類似專案 [Show HN: SitDeck – Customizable live dashboard of news, markets, threats](https://news.ycombinator.com/item?id=47267923) 與 [World War Watcher – real-time infrastructure war dashboard](https://news.ycombinator.com/item?id=47417769) 出現，佐證「situational awareness dashboard」在 2026 Q1 已成為一個明顯的小賽道。
- 官網自刊評論 [OSINT for Everyone: Free Intelligence Dashboard](https://www.worldmonitor.app/blog/posts/osint-for-everyone-open-source-intelligence-democratized/) 與 [AI Intelligence Analysis Without the Cloud](https://www.worldmonitor.app/blog/posts/ai-powered-intelligence-without-the-cloud/) 把「民主化 OSINT」當核心敘事。
- Reddit 與中文圈目前**未見顯著討論串**（搜尋 `site:reddit.com worldmonitor koala73` 無結果；中文 "worldmonitor 情報監測" 亦無顯著二手評論）——資料不足，暫以 HN 為主要外部評論來源。

## Release 狀態 / 時間軸

- **2026-01-08**：repo 建立。
- **2026-03-01**：最新一筆 release `v2.5.23`（"World Monitor v2.5.23"），由 `github-actions[bot]` 經 GitHub Action 發出；assets 涵蓋 macOS aarch64 AppImage、Windows NSIS installer、Linux AppImage 等，佐證 Tauri 桌面 app 的多平台發行流水線已成熟。
- 從 repo 建立到 `v2.5.23` 不到 2 個月，版號已跳到 2.5.x，推測 patch/minor CI 自動化發版（非語意版號嚴謹遵循）。
- **2026-04-20**：最後一次 push（今日前一天），`pushed_at: 2026-04-20T18:39:45Z`，開發仍活躍。
- **2026-04-21**：首次進入 GitHub trending Top 10 絕對榜（#6，+477 stars）。

## 授權與社群

- **授權**：`NOASSERTION`（實為 AGPL-3.0，非商業條款，商用需另購 commercial license）。
- **stars**：49,843（今日 +477）；**forks**：8,128；**watchers/subscribers**：310。
- **open issues**：122（如 [Feature: Real-Time Missile & Drone Defense Tracking](https://github.com/koala73/worldmonitor/issues/645)）；issues 與 discussions 皆開啟。
- **貢獻者**：GitHub API 前 10 名為 `koala73` (3,147)、`claude` bot (52)、`SebastienMelki` (51)、`NewCoder3294` (44)、其餘貢獻皆兩位數以下——高度集中在主作者手上。
- **語言 %**：TS 57% / JS 38% / CSS 4% / Rust 0.3%（Tauri 部分）。
- 成長性上，8,128 forks 對比 49,843 stars（16.3%）遠高於一般 dev tool 水準，推測大量 fork 來自想自架或 rebrand 的使用者（AGPL 商用限制反而促成了更多 fork 版本，如 [rodgersgitau/world-monitor](https://github.com/rodgersgitau/world-monitor) 與 [MrB4nz4i/worldmonitor-osint](https://github.com/MrB4nz4i/worldmonitor-osint)）。

## 資料來源

**本體**：

- [koala73/worldmonitor GitHub repo](https://github.com/koala73/worldmonitor)
- [README.md](https://github.com/koala73/worldmonitor/blob/main/README.md)
- [docs/DOCUMENTATION.md](https://github.com/koala73/worldmonitor/blob/main/docs/DOCUMENTATION.md)
- [CHANGELOG.md](https://github.com/koala73/worldmonitor/blob/main/CHANGELOG.md)
- [Releases](https://github.com/koala73/worldmonitor/releases)
- 官方網站 [worldmonitor.app](https://www.worldmonitor.app/) 與 [Pro](https://www.worldmonitor.app/pro)

**第三方評論**：

- HN: [Worldmonitor: Real-time global intelligence dashboard](https://news.ycombinator.com/item?id=47146019)
- HN: [World Monitor – Real-Time Global Intelligence Dashboard](https://news.ycombinator.com/item?id=47137414)
- HN: [Monitor your world with one daily report](https://news.ycombinator.com/item?id=47108261)
- HN: [Show HN: SitDeck](https://news.ycombinator.com/item?id=47267923)（同類賽道）
- HN: [World War Watcher](https://news.ycombinator.com/item?id=47417769)（同類賽道）
- [SourceForge mirror](https://sourceforge.net/projects/world-monitor.mirror/)

**同類工具**：

- [OpenCTI-Platform/opencti](https://github.com/OpenCTI-Platform/opencti)
- [smicallef/spiderfoot](https://github.com/smicallef/spiderfoot)
- [doctorfree/osint](https://github.com/doctorfree/osint)
- [OpenCTI Alternatives on AlternativeTo](https://alternativeto.net/software/opencti/)
- [Top 20 OSINT Tools for 2026 – PyNet Labs](https://www.pynetlabs.com/osint-tools/)
- [Top 10 OSINT Software & Tools – SEON](https://seon.io/resources/comparisons/osint-software-tools/)

## 更新紀錄

<!-- append future re-appearances here -->
