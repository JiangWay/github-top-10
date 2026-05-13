---
repo: trycua/cua
first_seen: 2026-04-27
last_updated: 2026-05-14
appearances: [2026-04-27, 2026-05-14]
growth_appearances: [2026-04-27, 2026-05-14]
has_releases: true
latest_release: cua-driver-v0.1.9
tags: [AI Agent 框架, 框架, 自架]
domain: AI Agent 框架
form: 框架
themes: [自架]
---

# [trycua/cua](https://github.com/trycua/cua)

> 研究日期：2026-04-27
> 研究來源：https://github.com/trycua/cua
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[trycua/cua](https://github.com/trycua/cua) 是**為 Computer-Use Agent 設計的開源沙箱基礎建設**，用一套 API 把 macOS / Linux / Windows / Android 桌面環境包成「容器化」VM，讓 AI 代理可以安全地點滑鼠、敲鍵盤、看螢幕，並附帶訓練與評測 SDK。

## 作者與起源

由創辦人 **Francesco（[frabonacci](https://github.com/f-trycua)）** 與 **Alessandro** 兩位義大利工程師共同創立，組織 [trycua](https://github.com/trycua) 於 2025-01-31 在 GitHub 註冊，公司網域 `trycua.com` / `cua.ai`。屬 **Y Combinator X25 批次**（Spring 2025），目前團隊 3 人。專案於 2025 年 5 月以 [Launch HN: Cua (YC X25) – Open-Source Docker Container for Computer-Use Agents](https://news.ycombinator.com/item?id=43773563) 發表。GitHub 上累計貢獻最多者為 [ddupont808](https://github.com/ddupont808)（790 commits）與 [f-trycua](https://github.com/f-trycua)（735 commits）。

## 核心架構 / 主要概念

依 README 拆出 7 個元件：

- **Cua Driver** — macOS 背景 computer-use，不搶游標焦點
- **Cua Sandbox** — 跨 OS 的 VM/Container 統一 API
- **CuaBot** — 多代理沙箱 CLI
- **Cua Agent SDK** — 代理框架本體（Python）
- **Cua Computer Server** — UI 互動與程式碼執行 driver
- **[Lume](https://github.com/trycua/lume)** — Apple Silicon 上的 macOS/Linux VM 管理（Swift）
- **Lumier** — Lume 的 Docker 相容介面

支援 [OSWorld](https://os-world.github.io/)、ScreenSpot、Windows Arena 等公開 benchmark，可導出 trajectory 重播。

> **HTML 為什麼是主要語言？**`gh api` 顯示 HTML 占 67.6%（19.2MB），但 Python 5.7MB、Swift 1.9MB 才是真正的執行碼。原因是 repo 內含完整 docs 站台（`cua.ai/docs/` 的源碼，Jekyll/Next 類產出物），加上 benchmark 報告與互動式範例 notebook 渲染後的 HTML——典型「monorepo + docs」失真案例。

## 設計哲學

README 的副標寫得直白：

> **"Build, benchmark, and deploy agents that use computers"**

延伸出來的兩條主軸是「**Docker for Computer-Use Agents**」（容器化抽象 + 一行指令啟動）與「**97% 原生 CPU 速度**」（在 Apple Silicon 上以 Virtualization.Framework 取代 QEMU 模擬）。MIT 授權、自架優先、不綁特定 LLM 廠商。

## 目標使用者與適用情境

- **Agent 框架開發者**：要在 OSWorld / ScreenSpot 跑分卻不想自己搭 VM
- **企業內部自動化**：客服、QA、RPA 場景需要「給 agent 一台桌面」但不能讓它碰生產機器
- **資安研究**：在隔離沙箱裡跑可疑指令、評估 agent 可被利用的攻擊面
- **教學/Demo**：示範 Claude Computer Use、OpenAI Operator 類功能但要可重現

## 與類似專案的差異

| 專案 | 抽象層 | 平台 | 授權 | 模型綁定 |
|---|---|---|---|---|
| [trycua/cua](https://github.com/trycua/cua) | VM / Container（桌面層） | macOS, Linux, Windows, Android | MIT | 無，可接 OpenAI/Anthropic/Ollama |
| [microsoft/UFO](https://github.com/microsoft/UFO) | Windows GUI agent | 僅 Windows | MIT | 偏 GPT-4V |
| [browserbase/stagehand](https://github.com/browserbase/stagehand) | 瀏覽器 DOM | 跨平台（瀏覽器內） | MIT | 任意 |
| Anthropic Claude Computer Use API | 雲端 API（黑盒） | API 廠商提供 | 商用 | 僅 Claude |

cua 的卡位明確：**比 stagehand 範圍更廣（整個桌面而非單一瀏覽器）**、**比 UFO 更跨平台**、**比 Anthropic API 更可自架**。和 [e2b-dev](https://github.com/e2b-dev) 比，創辦人在 HN 自陳差異是「MIT、原生 macOS、附 agent SDK」。

## 外部評論

- [Launch HN: Cua (YC X25) – Open-Source Docker Container for Computer-Use Agents](https://news.ycombinator.com/item?id=43773563)：HN 留言肯定「isolation and permissioning for computer use agents」是核心賣點；用戶 `rahimnathwani` 回報 WebSocket 連線異常與 agent UI 操作混亂，創辦人於 issue #61 與 Discord 跟進。
- 同串爭議：`contr-error` 質疑跨 Reddit / HN 有協同推廣帳號；moderator `dang` 確認確有 booster 留言但已處理（[原串](https://news.ycombinator.com/item?id=43773563)）。
- [Cua YC 公司頁](https://www.ycombinator.com/companies/cua)：官方定位「Give every agent a cloud desktop」，強調 97% 原生 CPU 速度。
- [trycua 官方部落格 — App-Use](https://cua.ai/blog/app-use)：2026 年新功能「App-Use」可限制 agent 只能存取單一 app，主打平行 workflow。
- [trycua 官方部落格 — Bringing Computer-Use to the Web](https://www.trycua.com/blog/bringing-computer-use-to-the-web)：發佈 `@trycua/computer` Web SDK，可從 JS/TS 直接控制 cua cloud 容器。

中文社群（V2EX、少數派、知乎等）目前未檢索到具規模的繁中討論，資料缺口據實註明。

## Release 狀態 / 時間軸

`gh api repos/trycua/cua/releases` 回傳大量 release（採 monorepo 多套件分別 tag），最新 5 個皆為 `cua-driver` 子套件 2026-04-26 連發：

- **cua-driver-v0.0.10** — 2026-04-26 19:07Z（最新）
- cua-driver-v0.0.9 — 2026-04-26 18:55Z
- cua-driver-v0.0.8 — 2026-04-26 18:33Z
- cua-driver-v0.0.7 — 2026-04-26 09:26Z
- cua-driver-v0.0.6 — 2026-04-26 08:33Z

單日 5 個 patch 版本，反映正在密集修 driver bug；尚未進入 v1.0，整體仍屬早期但迭代極快。

## 授權與社群

- **授權**：MIT
- **Stars**：14,305（2026-04-27），單日 +204，**增長率 1.43%**
- **建立日**：2025-01-31，至今約 452 天，**平均每日 +31.6 stars**
- **Forks**：891 / **Open Issues**：222 / **Watchers/Subscribers**：53
- **Topics**：`agent`, `ai-agent`, `computer-use`, `computer-use-agent`, `containerization`, `cua`, `desktop-automation`, `lume`, `manus`, `operator`, `swift`, `virtualization`, `windows-sandbox`
- **語言比重**：HTML 67.6% / Python 20.1% / Swift 6.6% / TypeScript 2.9% / Shell 1.7%

主要貢獻者前 5 名：[ddupont808](https://github.com/ddupont808) 790、[f-trycua](https://github.com/f-trycua) 735、[jamesmurdza](https://github.com/jamesmurdza) 266、[sarinali](https://github.com/sarinali) 177、[mdean808](https://github.com/mdean808) 145；長尾貢獻者超過 30 位，社群參與健康。

## 資料來源

- `gh api repos/trycua/cua`（2026-04-27 拉取）
- `gh api repos/trycua/cua/releases`、`/contributors`、`/languages`
- [GitHub repo 首頁與 README](https://github.com/trycua/cua)
- [Launch HN 討論串](https://news.ycombinator.com/item?id=43773563)
- [Y Combinator 公司頁](https://www.ycombinator.com/companies/cua)
- [trycua 官網與部落格](https://cua.ai/)

## 更新紀錄

### 2026-05-14
- 距首次上榜（2026-04-27）已 **17 天**後再度入絕對榜，名次 #8（總 16,476 / 今日 +307），growth_rate 1.86%、增長榜 #6。stars 由 4-27 的 14,305 漲至 **16,476**（17 天 +2,171，日均 +127），維持「Computer-Use Agents」賽道穩定領先。
- 自 `last_updated`（2026-04-27）以來新發 12 版 cua-driver patch / minor，主要里程碑：[cua-driver-v0.1.0](https://github.com/trycua/cua/releases/tag/cua-driver-v0.1.0)（2026-05-01，跨入 0.1 minor 系列）→ [v0.1.9](https://github.com/trycua/cua/releases/tag/cua-driver-v0.1.9)（2026-05-12）。`latest_release` 由 cua-driver-v0.0.10 更新為 **cua-driver-v0.1.9**。版本跳躍反映 driver 層在 17 天內進入快速迭代週期，與同日 [github/spec-kit](https://github.com/github/spec-kit) 上榜共構「AI agent infra + AI 編碼方法論」雙軌成熟訊號。