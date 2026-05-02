---
repo: browserbase/skills
first_seen: 2026-05-02
last_updated: 2026-05-03
appearances: [2026-05-02, 2026-05-03]
growth_appearances: [2026-05-02, 2026-05-03]
has_releases: false
latest_release: null
tags: [AI Agent 框架, Skill 外掛, 多代理編排]
domain: AI Agent 框架
form: Skill 外掛
themes: [多代理編排]
---

## 深度研究（2026-05-02 首次）

### 專案定位

[browserbase/skills](https://github.com/browserbase/skills) 是 [browserbase](https://github.com/browserbase) 官方為 [Anthropic](https://github.com/anthropics) Claude Code / Claude Agent SDK 釋出的「**瀏覽器技能包**」。Repo 描述只有一句「Claude Agent SDK with a web browsing tool」，但本質是一個 plugin marketplace：把 Browserbase 雲端瀏覽器、官方 `bb` CLI、cookie 同步、trace 抓取、UI 對抗測試等能力，以 9–11 個 [Anthropic Skills](https://github.com/anthropics/skills) 形式打包，讓 agent 一句 `/plugin marketplace add browserbase/skills` 就能裝上「會上網」的手腳。建立於 2025-10-12，今日（2026-05-02）首次衝進 GitHub Trending Top 10，1,107 stars / 75 forks，主語言 JavaScript。

### 核心架構 / 主要概念

目錄分三層：`.claude-plugin/`（plugin 與 marketplace 描述）、`agent/`（agent 範例）、`skills/`（每個技能一個資料夾，內含 `SKILL.md` + 腳本）。9 個內建技能涵蓋三種使用形態：(1) 雲端瀏覽器自動化——`browser`、`browserbase-cli`、`functions`；(2) 偵錯與觀測——`site-debugger`、`browser-trace`、`bb-usage`；(3) 輕量輔助——`fetch`、`cookie-sync`、`ui-test`。這些 skill 以 markdown 撰寫提示與工具呼叫慣例，由 Claude Code 在執行時動態載入，等於把 [browser-use/browser-use](https://github.com/browser-use/browser-use) 那種 agent loop，下放成 Claude Agent SDK 的 first-class skill。

### 目標使用者

主打三類：(1) 想讓 Claude Code agent 處理「上網查資料 / QA 測試 localhost / 抓網站內容」的開發者；(2) Browserbase 既有客戶——可一鍵把雲端 session、residential proxy、CAPTCHA 解題接進 agent；(3) 對 [anthropics/skills](https://github.com/anthropics/skills) 生態感興趣、想看「商業 SaaS 怎麼以 skill 形式分發」的 plugin 作者。

### 與類似專案的差異

同公司的 [browserbase/stagehand](https://github.com/browserbase/stagehand) 是 Playwright 的 AI 包裝、走 SDK 整合路線；本 repo 走 **skill 分發**路線，不寫程式碼也能用，門檻更低但天花板也較低。對比同期競品：[SawyerHood/dev-browser](https://github.com/SawyerHood/dev-browser) 純本地瀏覽器、無雲端；[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) 偏 CLI 工具；[browser-use/browser-use](https://github.com/browser-use/browser-use) 走 Python agent loop。browserbase/skills 的差異點是「**雲端 session + 9 個現成 skill**」一次到位。

### 外部評論

- [Browserbase 官方：Browse CLI 發表頁](https://www.browserbase.com/browse-cli)——說明本 repo 對應的 `bb skills` 安裝路徑。
- [DEV.to：I Tested Every Browser Automation Tool for Claude Code](https://dev.to/minatoplanb/i-tested-every-browser-automation-tool-for-claude-code-heres-my-final-verdict-3hb7)——實測比較 Browserbase 與其他選項。
- [ytyng.com：AI browser automation token benchmark 2026](https://www.ytyng.com/en/blog/ai-browser-automation-tools-comparison-2026)——含 token 消耗實測。
- [NxCode：Stagehand vs Browser Use vs Playwright (2026)](https://www.nxcode.io/resources/news/stagehand-vs-browser-use-vs-playwright-ai-browser-automation-2026)——同公司產品 Stagehand 的對比參考。

中文社群目前討論度低，搜尋資料不足。

### Release 狀態

`gh api repos/browserbase/skills/releases` 回傳空陣列，**尚無 GitHub Release**；版本管理走 `main` 分支滾動更新（最後 push 為 2026-04-30）。

### 授權與社群

授權欄位為 `null`——**未附 LICENSE**，使用前需自行評估法律風險或向 Browserbase 詢問。主要貢獻者集中在 Browserbase 員工：[shrey150](https://github.com/shrey150)（15 commits）、[miguelg719](https://github.com/miguelg719)（11）、[pkiv](https://github.com/pkiv)（5），加上少量社群 PR。32 open issues、75 forks，社群活躍度中等偏上，屬於商業公司主導的 SDK 範例庫。
