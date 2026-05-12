---
repo: millionco/react-doctor
first_seen: 2026-05-12
last_updated: 2026-05-13
appearances: [2026-05-12, 2026-05-13]
growth_appearances: [2026-05-12, 2026-05-13]
has_releases: true
latest_release: react-doctor@0.0.38
tags: [開發者工具, Skill 外掛]
domain: 開發者工具
form: Skill 外掛
themes: []
---

# [millionco/react-doctor](https://github.com/millionco/react-doctor)

> 研究日期：2026-05-12
> 研究來源：https://github.com/millionco/react-doctor
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[millionco/react-doctor](https://github.com/millionco/react-doctor) 是 [million.js](https://github.com/aidenybai/million) / [react-scan](https://github.com/aidenybai/react-scan) 作者 Aiden Bai（YC W24 Million Software, Inc.）在 2026 年 2 月推出的 React 程式碼健康檢查 CLI——一條指令 `npx -y react-doctor@latest .` 對整個 codebase 跑完 lint + dead code 雙通道掃描，輸出 **0–100 分**的健康分數與分類診斷，同時可一次性將 47+ 條 React 反模式規則安裝為 50+ AI 編碼代理（[Claude Code](https://github.com/anthropics/claude-code)、Cursor、Codex、OpenCode）的 skill 設定。產品 tagline 直接點出受眾："**Your agent writes bad React, this catches it**"——這不是給人類資深工程師看的 lint，是給 AI 代理用的回授迴路。

## 作者與起源

Repo 於 2026-02-13 由 GitHub 組織 [millionco](https://github.com/millionco)（法人名 **Million Software, Inc.**，blog `million.dev`，地點美國）建立，主導者為 [Aiden Bai (`aidenybai`)](https://github.com/aidenybai)——241 個 contributions，貢獻量遠超其他協作者（次位 `ben-million` 僅 12 個 commits）。Aiden 過往三個 React 生態爆紅作品為其背書：[million.js](https://github.com/aidenybai/million)（虛擬 DOM 替代品，數萬 stars）、[react-scan](https://github.com/aidenybai/react-scan)（runtime 渲染分析器）、以及目前主力的 **Ami「post-IDE」**——對著渲染後頁面留 comment，底層 code 自動改動的編程介面。

React Doctor 並非 Million 公司主力產品，而是 Aiden 在 Ami 開發中順手抽出的副產品。對外發布配合一條 X/Twitter 貼文，[Aiden 自己的 launch tweet](https://x.com/aidenybai/status/2026193676315152623) 24 小時內 30 萬+ views（依 [Aihola 報導](https://aihola.com/article/react-doctor-codebase-scoring-tool) 述）；發佈至今 ~13 週累積 7,919 stars / 252 forks，npm 每週 ~6,400 downloads，2026-05-12 首次上 GitHub Trending 絕對榜 #8（今日 +340）。

## 核心架構 / 主要概念

依 README 與第三方拆解（[OpenReplay](https://blog.openreplay.com/scan-react-code-anti-patterns-react-doctor/)、[BetterStack](https://betterstack.com/community/guides/scaling-nodejs/react-doctor/)），技術堆疊三層：

- **執行引擎 = [Oxlint](https://github.com/oxc-project/oxc)（Rust）**：BetterStack 量測號稱「比 ESLint 快 50–100 倍」，足以掛在每個 PR 跑而不延遲 CI。架構同時導出為兩種 plugin 載入路徑——`react-doctor/oxlint-plugin`（推薦）與 `react-doctor/eslint-plugin`（給已有 ESLint 流的專案）。
- **規則集 47+ 條（自製） + 兩個可選伴隨 plugin**：自製規則涵蓋 6 大類（**state & effects / performance / architecture / security / accessibility / dead code**），具名規則包含 `react-doctor/no-cascading-set-state`、`react-doctor/no-derived-useState`、`react-doctor/rerender-state-only-in-handlers`、`react-doctor/no-array-index-as-key`、`react-doctor/no-fetch-in-effect`、`react-doctor/no-render-in-render`。可選 peer dependency 為 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)（React Compiler 偵測到時自動套用）與 [`eslint-plugin-react-you-might-not-need-an-effect`](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect)。
- **雙通道並行**：偵測完 framework（Next.js / Vite / Remix / Expo / React Native）與 React 版本後，**lint pass 與 dead-code pass 並行跑**——後者用 AST 走全專案匯入圖。
- **Agent skill 安裝器**：`npx -y react-doctor@latest install` 互動式選擇本機偵測到的 AI 代理（Claude Code skill、Cursor rules、Codex、OpenCode 等 50+ 種），把規則寫成「在生成 React 前先看這份指引」的 prompt 文件。此設計兼容 Vercel 在 2026 年初推出的 [skills.sh](https://github.com/vercel-labs/agent-skills) 生態。
- **GitHub Action**：composite action 內建 `diff` 參數（限定 PR 變更檔）、`fail-on` 等級、`offline` 模式（不打外部 API），把 score 與 diagnostic 自動回貼為 PR comment，且後續執行**更新同一則 comment** 而非新增（避免 PR 雙重通知）。
- **配置/抑制體系**：`react-doctor.config.json` 三層 ignore（`rules` / `files` / `overrides`），尊重既有 `.gitignore`、`.eslintignore`、`.oxlintignore`、`.prettierignore` 與 `linguist-vendored` 標記；inline `// react-doctor-disable-next-line <rule>` 可單行或堆疊抑制，疑難排解用 `react-doctor --explain <file:line>` 反查為何某條規則未被抑制。

## 設計哲學

README 第一句即把目標讀者擺明：

> "Your agent writes bad React, this catches it."

這條 tagline 與多數 lint 工具的「讓人類程式碼更乾淨」訴求相反——它直接把 AI 編碼代理當主使用者。產品的雙端設計（人類跑分 + 代理 skill）體現另一句來自 [fireup.pro 介紹](https://fireup.pro/news/react-doctor-cli-auditing-for-react-projects) 的轉述：

> "It's a feedback loop: scan, diagnose, feed the diagnostics to an agent, have the agent fix things, scan again."

翻譯／解讀：靜態分析從「給人類看的 warning」轉成「給代理消化的結構化診斷」。`--json` 與 `file:line` 可點擊輸出、`--prompt` 直接複製給代理 fix 的剪貼簿模式、score 輸出格式都是為這套循環設計。Aiden 在 X 上自稱 Ami 是「post-IDE」，react-doctor 就是這個世界觀的前哨——當 codegen 速率超過人類審閱速率，**度量 codebase 健康必須機器可消化**。

## 目標使用者與適用情境

適用情境：

- **AI 代理輔助 React 開發**：[Cursor](https://cursor.sh/)、[Claude Code](https://github.com/anthropics/claude-code)、Codex、OpenCode、Copilot 等用戶——`install` 子命令把 47 條規則注入代理 system prompt 後，代理在「生成」階段就少踩反模式。
- **PR-level CI gate**：CI 上 `diff: main` 限定變更檔，搭配 `--fail-on error` 把違規卡在 merge 前。
- **遺產 React codebase 體檢**：依 BetterStack 測試 `twenty` monorepo 跑出 99 errors / 294 warnings 的量級，可當技術債盤點起點。
- **React Native / Expo 專案**：自動偵測 framework 並切換規則集。

不適用情境：

- **執行期效能瓶頸定位**——OpenReplay 強調 "React Doctor 是靜態分析、不是 runtime profiler，無法量測真實效能退化"；該情境仍需 [react-scan](https://github.com/aidenybai/react-scan) 或 React DevTools Profiler。
- **非 React 專案**：規則集 React 專屬，[Vue](https://github.com/vuejs/core) / [Svelte](https://github.com/sveltejs/svelte) / [Solid](https://github.com/solidjs/solid) 不在守備範圍。
- **替代 code review**——OpenReplay 評論直陳 "React Doctor doesn't replace code review, but it removes the tedious parts of it"，仍需人類審閱架構決策。
- **追求零 warning 的潔癖團隊**：BetterStack 測試甚至維護良好的專案也常落在 63–84 分，標準偏 aspirational，警報疲勞風險明顯。

## 與類似專案的差異

| 對手 | 路徑 | react-doctor 的差異 | 何時選誰 |
|---|---|---|---|
| [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)（React 官方） | ESLint plugin，僅覆蓋 hooks 規則 | react-doctor 廣 8 倍以上（涵蓋安全 / 可及性 / 死碼 / 架構），並把 react-hooks 當可選 peer 包進來 | 已有完整 ESLint 流且只缺 hooks 檢查選官方；要一鍵綜合體檢選 react-doctor |
| [biomejs/biome](https://github.com/biomejs/biome) | Rust 寫的「lint + formatter + import sorter」綜合工具 | Biome 是通用 JS/TS 工具鏈，React 規則淺；react-doctor 是 React 領域專家，且不做 formatting | 想換掉 Prettier + ESLint 工具鏈選 Biome；需要 React 反模式深度檢查選 react-doctor |
| [oxc-project/oxc](https://github.com/oxc-project/oxc)（Oxlint） | react-doctor 的**底層引擎**——通用 lint 框架 | react-doctor 是 Oxlint 上的 React 領域規則集 + agent installer + score 計算層 | 想做底層自訂 lint 走 Oxlint；要拿 React 健康分數走 react-doctor |
| [`eslint-plugin-react-you-might-not-need-an-effect`](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect) | ESLint plugin，只攻 `useEffect` 反模式 | react-doctor 把它列為可選伴隨 plugin，自動 fold 進掃描 | 只想處理 effect 反模式可直接裝該 plugin；要 score + agent 整合走 react-doctor |
| [react-scan](https://github.com/aidenybai/react-scan)（同作者） | **Runtime** 渲染掃描器（瀏覽器內視覺化） | react-doctor 走**靜態分析**、跑在 CI；兩者互補 | 找效能瓶頸用 react-scan；找架構/反模式用 react-doctor |

## 外部評論

- [Aiden Bai launch tweet（2026 年 2 月）](https://x.com/aidenybai/status/2026193676315152623) — 作者親自 demo `npx -y react-doctor@latest .`，依 [Aihola](https://aihola.com/article/react-doctor-codebase-scoring-tool) 述 24 小時內 30 萬+ views。
- [OpenReplay 評測](https://blog.openreplay.com/scan-react-code-anti-patterns-react-doctor/) — 中性教學文，肯定其「比 ESLint 抓更深層的結構問題」，但明確指出**它不是 runtime profiler**，且健康分數的基準偏 aspirational。
- [BetterStack 指南](https://betterstack.com/community/guides/scaling-nodejs/react-doctor/) — 技術評測，量測 Oxlint 比 ESLint 快 50–100 倍；在 `twenty` monorepo 上跑出 99 errors / 294 warnings 的量級，作者警告 **alert fatigue 風險**。
- [Better Stack YouTube：「I thought I was a Senior React Dev... until I ran React Doctor」](https://www.youtube.com/watch?v=k3vyIIEZfU4) — 影像 demo，定位為「即便資深工程師也常被掃出問題」的行銷敘事。
- [fireup.pro 介紹](https://fireup.pro/news/react-doctor-cli-auditing-for-react-projects) — 把 feedback loop 概念寫清楚：掃描 → 診斷 → 餵代理 → 代理修 → 再掃描。
- [Aihola 報導](https://aihola.com/article/react-doctor-codebase-scoring-tool) — 把 react-doctor 放在 Million Ami「post-IDE」脈絡解讀，指出與 [Vercel skills.sh](https://github.com/vercel-labs/agent-skills) 生態整合是策略決定。
- [Hacker News 串（id 47051257）](https://news.ycombinator.com/item?id=47051257) — 由 `handfuloflight` 提交，4 points，未引爆顯著討論，主流社群討論量資料不足。
- [bestofjs 收錄頁](https://bestofjs.org/projects/react-doctor) — 列入 JS 生態追蹤名單。
- Reddit：搜尋 r/reactjs / r/webdev 未見顯著討論，**Reddit 社群評論資料不足**——可能因產品發布僅 3 個月、首爆在 X 而非 Reddit。

## Release 狀態 / 時間軸

- **2026-02-13** — Repo 建立（commit `052cd20`）。
- **2026-02-19** — 首個 release `0.0.1`，內含 15+ PR 的 squash 合併，奠定基礎 CLI / lint / agent install / GitHub Action 四大模組。
- **2026-02 至 04 月** — 連續迭代到 `react-doctor@0.0.38`，但 GitHub Releases 頁只發佈 `0.0.1` 與 `0.0.38` 兩份 release notes，中間 36 個版本走 npm + git tag 但不發 release（README 與 changelog 為主要溝通管道）。
- **2026-04-17** — `react-doctor@0.0.38` 發佈，重點為 GitHub Action 三項改進（`offline` 模式、PR comment update-in-place、ANSI strip）與 CLI clickable file paths。
- **2026-05-11** — 最新 push（main commit）。
- **2026-05-12** — 首次上 GitHub Trending 絕對榜 #8（**7,919 stars / 今日 +340**），距首次發版約 13 週。

13 週、9 個 git tag、僅 2 個 GitHub release——版本節奏快但 release notes 揭露稀疏，仰賴 X 與外部文章 broadcast。

## 授權與社群

- **授權**：[MIT License](https://github.com/millionco/react-doctor/blob/main/LICENSE)——完全開源、商用無限制，與 [CloakHQ/CloakBrowser](https://github.com/CloakHQ/CloakBrowser) 那種雙授權模式不同。
- **量化指標**（2026-05-12 快照）：**7,919 stars / 252 forks / 12 watchers / 11 open issues / 12 contributors**，主力提交者 `aidenybai`（241 commits）+ `ben-million`（12）+ `cursoragent`（11，自動化代理帳號）。
- **語言比例**：TypeScript **99.96%**（1,252 KB） + CSS（360 bytes） + JavaScript（94 bytes）——純 TypeScript 專案，配合 Oxlint 的 Rust 引擎在執行期下沉。
- **GitHub Topics**：`agents`、`code-review`、`doctor`、`react`、`skill`——明確標榜「給 agent 用」與「skill 生態」。
- **生態整合**：與 [Vercel skills.sh](https://github.com/vercel-labs/agent-skills) 同框出現，被 [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) 的 `react-best-practices` skill 文件引用。
- **首日增長率**：340 / 7,919 ≈ **4.29%**——已過冷啟動期、處於穩態長尾上升，首爆熱度在 2026 年 2 月已釋放完，本日上 trending 屬持續關注度的二次推進。
- **stars / contributor 比 = 660**——遠高於健康開源比例（一般 50–100），符合「明星作者個人專案」型態，可持續性取決於 Aiden 的精力與 Million 公司資源。

## 資料來源

- **本體**：
  - GitHub repo：<https://github.com/millionco/react-doctor>
  - 官網：<https://react.doctor>
  - 組織頁：<https://github.com/millionco>（Million Software, Inc.，<https://million.dev>）
  - npm package：<https://www.npmjs.com/package/react-doctor>
  - GitHub Action：<https://github.com/millionco/react-doctor/blob/main/action.yml>
  - oxlint 規則總表：<https://github.com/millionco/react-doctor/blob/main/packages/react-doctor/src/oxlint-config.ts>
- **第三方評論**：
  - [Aiden Bai launch tweet](https://x.com/aidenybai/status/2026193676315152623)
  - [OpenReplay 評測](https://blog.openreplay.com/scan-react-code-anti-patterns-react-doctor/)
  - [BetterStack 指南](https://betterstack.com/community/guides/scaling-nodejs/react-doctor/)
  - [Better Stack YouTube demo](https://www.youtube.com/watch?v=k3vyIIEZfU4)
  - [fireup.pro 介紹](https://fireup.pro/news/react-doctor-cli-auditing-for-react-projects)
  - [Aihola 報導](https://aihola.com/article/react-doctor-codebase-scoring-tool)
  - [Hacker News thread 47051257](https://news.ycombinator.com/item?id=47051257)
  - [bestofjs 收錄](https://bestofjs.org/projects/react-doctor)
  - [Repo Explainer 拆解](https://repo-explainer.com/millionco/react-doctor)
- **同類工具**：
  - [oxc-project/oxc](https://github.com/oxc-project/oxc)（Oxlint 引擎）
  - [biomejs/biome](https://github.com/biomejs/biome)
  - [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  - [`eslint-plugin-react-you-might-not-need-an-effect`](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect)
  - [aidenybai/react-scan](https://github.com/aidenybai/react-scan)（同作者 runtime profiler）
  - [aidenybai/million](https://github.com/aidenybai/million)（同作者 React 優化）
  - [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)（skill 生態系）

## 更新紀錄
