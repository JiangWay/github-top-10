---
repo: davila7/claude-code-templates
first_seen: 2026-04-28
last_updated: 2026-04-28
appearances: [2026-04-28]
growth_appearances: []
has_releases: false
latest_release: null
tags: [開發者工具, 應用程式]
domain: 開發者工具
form: 應用程式
themes: []
---

# [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates)

> 研究日期：2026-04-28
> 研究來源：<https://github.com/davila7/claude-code-templates>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) 是一支以 `npx` 為入口的 CLI，把 1000+ 個預先寫好的 Claude Code 元件（agents、slash commands、MCP servers、hooks、settings、skills、plugins）做成「套件管理員」式的安裝體驗，並附帶一個 dashboard 與 [aitmpl.com](https://www.aitmpl.com/) 線上目錄站；副標可寫成「Claude Code 生態的 npm」。

## 作者與起源

作者 **Daniel Avila（GitHub `davila7`、Twitter `@dani_avila7`）** 是智利出身、現居 Michigan / New York 的工程師，並非個人玩票背景——他是 [CodeGPT](https://codegpt.co/) 的共同創辦人，CodeGPT 是 IDE 內 AI coding extension，曾入選 Techstars、募得約 USD 1M 種子輪、十個月內累積 100 萬次下載（[entnerd 報導](https://www.entnerd.com/1-millon-de-descargas-en-10-meses-y-usd-1-millon-levantado-para-crecer-la-historia-de-codegpt/)）。Avila 在 GitHub 上有 185 個公開 repo、1.8k 追蹤者，bio 寫的是「Building AI dev tools with LLMs」——對 dev tool 與 LLM 整合是長期下注。

repo 第一次 commit 落在 **2025-07-04**，剛好是 [anthropics/claude-code](https://github.com/anthropics/claude-code) 公開後幾週；起初只是「Claude Code 各語言 / framework 的 CLAUDE.md 範本集合」，隨著 Claude Code 引入 sub-agent、custom slash commands、hooks、MCP、Skills、Plugins 等抽象，repo 每加一種抽象就擴一個 catalog 目錄，逐步演化為「Claude Code 元件市集 + CLI 安裝器」。Avila 自己在 Medium 文章描述其核心信念：

> "How you configure your AI development agents is often more critical to project success than the actual code they generate."
> 你怎麼設定 AI 編程代理，往往比代理產出的程式碼本身更決定專案成敗。
> （[Daniel Avila, LatinXinAI / Medium](https://medium.com/latinxinai/complete-guide-to-claude-code-templates-4e53d6688b34)）

爆紅節點：2026-04-28 衝上 GitHub Trending #7（25.7k stars，單日 +181）；同月 v1.24.0 加入對 Anthropic 官方 Skills 的支援（一次納入 19 個官方 skills），擴張到 1000+ 元件與獨立 plugin 市集頁面。

## 核心架構 / 主要概念

CLI 名稱即 npm package 名 `claude-code-templates`，最新版本 v1.28.16（2025 年 7 月首發 v1.0.1，至 2026-04 共 32 個 git tag）；雖然語言佔比上 Python 最大（5MB，因為大量 agent 範例是 Python），CLI 本體是 Node.js（JavaScript 1.7MB / TypeScript 0.5MB）。執行模型走 `npx claude-code-templates@latest` 不需安裝，跑完即丟。

**元件分類（六到七類）**：

| 類別 | 用途 | 安裝示例 |
|---|---|---|
| Agents | 領域專家 sub-agent（frontend developer、security auditor、code reviewer 等） | `--agent development-team/frontend-developer` |
| Commands | 自訂 slash command（`/generate-tests`、`/optimize-bundle` 等） | `--command performance/optimize-bundle` |
| MCPs | 外部服務 MCP server 整合（GitHub、PostgreSQL、Stripe、AWS、OpenAI 等） | `--mcp database/postgresql-integration` |
| Settings | `settings.json` 設定組合（timeouts、memory、output styles） | `--setting ...` |
| Hooks | 自動化觸發器（pre-commit 驗證、post-completion action） | `--hook ...` |
| Skills | Anthropic 官方 Skills + 社群 skill 套件 | 自 v1.24.0 起新增 |
| Plugins | 多元件捆綁的 plugin marketplace | `aitmpl.com/plugins/...` |

**互動模式**：直接 `npx claude-code-templates@latest` 進入互動式 TUI 瀏覽器，過濾 / 預覽 / 安裝；非互動模式則用旗標 + `--yes` 一鍵裝（適合 CI / 一次裝整套 stack，例如 `--agent development-team/frontend-developer --yes`）。

**配套功能（CLI 本身就是個多面工具）**：
- `--analytics`：本機儀表板，即時觀察 Claude Code session 狀態、效能指標
- `--chats --tunnel`：行動裝置友善頁，搭配 ngrok-style tunnel 遠端看 Claude Code 的對話
- `--health-check`：診斷 Claude Code 安裝是否最佳化

**配套站**：
- [aitmpl.com](https://www.aitmpl.com/)（元件瀏覽 / 拷貝指令）
- [docs.aitmpl.com](https://docs.aitmpl.com/introduction)（官方文件）
- 兩站都是 Astro 靜態頁（repo 有 195KB 的 Astro source）

## 設計哲學

README 首段把整個專案的訴求濃縮成一句：

> "Ready-to-use configurations for Anthropic's Claude Code. A comprehensive collection of AI agents, custom commands, settings, hooks, external integrations (MCPs), and project templates to enhance your development workflow."
> 為 Anthropic Claude Code 提供「拿來就能用」的設定；是一套包含 AI agents、自訂指令、設定、hooks、外部整合（MCPs）與專案範本的綜合集合，用來強化你的開發流程。

Avila 在 Medium 進一步把哲學講白：「把 Claude Code 從一個強大但複雜的工具，變成一個可被一般開發者直接上手的開發平台」（[原文](https://medium.com/latinxinai/complete-guide-to-claude-code-templates-4e53d6688b34)）。換言之，這個專案不發明新抽象——所有 agents / commands / hooks / MCP 都是 Claude Code 既有的擴充點——它只做「策展 + 散佈通路 + 一鍵安裝」三件事，賭的是「設定 LLM agent 的好壞，比 agent 本身強弱更重要」。這跟 [obra/superpowers](https://github.com/obra/superpowers) 的「skill = 結構化知識卡」哲學不同：superpowers 自己定義 skill 結構與檢索，claude-code-templates 不發明結構，它純粹組市集。

## 目標使用者與適用情境

**最適合**：
- 第一次裝 Claude Code、不知道要先寫什麼 CLAUDE.md / 要裝什麼 MCP server 的新手
- 想批次部署一致設定到 CI / 多 repo 的 dev productivity 團隊（用 `--yes` 旗標）
- Claude Code 元件作者：把自己寫的 agent / command 投稿進 catalog，等於上架到 1000+ 元件的市集

**不適合**：
- 不用 Claude Code 的人——本工具**完全綁定** Anthropic Claude Code，不支援 Cursor、Cline、ChatGPT、Gemini CLI 等他家 agent
- 已經有自家 skill / agent 流水線、要嚴格 review 每個外部 prompt 的安全敏感團隊（catalog 是社群投稿，未必通過資安審查）
- 想要 self-host 元件市集、不依賴 aitmpl.com / npm 的封閉環境（雖 CLI 本身 MIT，元件目錄仍掛在 Avila 維護的 domain 下）

## 與類似專案的差異

| 對手 | 本專案的差異 | 什麼時候選誰 |
|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | superpowers 是**單一作者策展**的 skill 套件（23+ 角色 + headless browser daemon），有自己的 ETHOS 與檢索協定；claude-code-templates 是**社群投稿市集**，不發明結構，只當 npm | 想要「一個經過深思熟慮的工程團隊全套包」→ superpowers；想要「pick-and-choose、cherry-pick 個別元件」→ claude-code-templates |
| Anthropic 官方 [anthropics/claude-code](https://github.com/anthropics/claude-code) plugin marketplace | 官方 marketplace 是 Claude Code 內建的 `/plugin` 命令直接拉；claude-code-templates 是**外部 npx CLI**，且涵蓋面更廣（agents / commands / hooks / MCP / settings 都包，不限 plugin） | 只用 plugin → 走官方；要批次裝多種類元件 / 自動化 CI → claude-code-templates |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | awesome-claude-code 是**單純連結列表**（README 形式 awesome list）；claude-code-templates 是**有 CLI 安裝器**的目錄站 | 想瀏覽看選項 → awesome list；想直接安裝 → claude-code-templates |

差異化的核心軸：**有沒有 CLI 安裝器** + **是否社群投稿**。claude-code-templates 把「awesome list + npm」兩個體驗縫起來，這是其他競品多半二選一沒做的。

## 外部評論

公開、可連結的第三方討論並不多——Trending 25.7k stars 的量級下，HN 與 Reddit 的指名討論異常稀薄，多數曝光來自作者自身與 Medium 上的二次寫手。

- **Hacker News**：唯一一則 [Claude Code Templates 投稿（item 47035652）](https://news.ycombinator.com/item?id=47035652) 由 `spooky_patch` 提交，**僅 3 分**、無顯著討論；其他 HN 上有關 Claude Code 的串都是討論 [anthropics/claude-code](https://github.com/anthropics/claude-code) 本身（如 [Claude Code Cheat Sheet](https://news.ycombinator.com/item?id=47495527)、[Claude Code Unpacked](https://news.ycombinator.com/item?id=47597085)），不是這個 templates 專案。
- **Reddit**：以 `"claude-code-templates" site:reddit.com` 搜尋無結果，r/ClaudeAI 未見指名串。**資料不足**。
- **Medium / DEV / 部落格**：
  - [Daniel Avila, "Complete Guide to Claude Code Templates"（LatinXinAI / Medium, 2025-08-27）](https://medium.com/latinxinai/complete-guide-to-claude-code-templates-4e53d6688b34)——作者自己寫的官方說明，定位「open-source package manager for Claude Code ecosystem」。
  - [Jannis, "Stop Writing Claude Code Configurations From Scratch"（The Context Layer / Medium, 2025-08-04）](https://medium.com/the-context-layer/stop-writing-claude-code-configurations-from-scratch-this-template-library-changes-everything-aaa49e7e767b)——正面評論，無批評觀點。
  - [PyShine, "Claude Code Templates: The Ultimate CLI for Configuring and Monitoring Claude Code"（2026-04-26）](https://pyshine.com/Claude-Code-Templates-CLI-Configuration-Monitoring/)——重點介紹 analytics dashboard、mobile chats、health check；無批評。
  - [daily.dev 收錄頁](https://app.daily.dev/posts/claude-code-templates-aitmpl-com-ready-to-use-configurations-for-anthropic-s-claude-code-a-compre-bgn77l9ub)——僅作 share，無深入評論。
- **會議曝光**：[GitNation: "Templates and Components for Claude Code: The Future of AI Coding Workflows"](https://gitnation.com/contents/templates-and-components-for-claude-code-the-future-of-ai-coding-workflows)——Avila 本人受邀演講，再次屬作者自家發聲。
- **第三方信任分析**：[Scamadviser 對 aitmpl.com 評分](https://www.scamadviser.com/check-website-old/aitmpl.com) 76 分，註明「site age very young」——非批評但提醒新站。
- **日語社群**：[X / @7_eito_7（2025-08-05）](https://x.com/7_eito_7/status/1952957043561906529) 推介為「Claude Code 開発を最速で始めるためのテンプレ集」，正面但短。

整體傾向：聲量大但批評稀少，目前可見的書面評論幾乎都偏 promotional。**真實質疑（如 catalog 投稿安全性、prompt 質量、aitmpl 託管中心化風險）尚未在公開英文社群成形**——25.7k stars 的規模配上 0 場 HN 串討論，是個值得追蹤的反差。

## Release 狀態 / 時間軸

GitHub Release 頁面實際上是**空的**——`gh api repos/davila7/claude-code-templates/releases` 回傳 `[]`，但 git tags 有 32 個（v1.0.1 → v1.28.16）；也就是 Avila 用 git tag + npm publish 出版，不發 GitHub Release notes。所以 frontmatter 標 `has_releases: false`、`latest_release: null`。

關鍵時間軸：
- **2025-07-04**：repo 首次 commit
- **2025-07**：v1.0.1 首版 npm publish
- **2025-08-27**：Avila 在 LatinXinAI / Medium 發完整介紹文，正式對外推廣
- **2026-04**：v1.24.0 加入 Anthropic 官方 Skills 支援（一次納入 19 個官方 skill）
- **2026-04-27**：v1.28.16（最新 tag），main 分支最後 push
- **2026-04-28**：GitHub Trending #7、25.7k stars、單日 +181

從首版到 25k stars 約 9 個月，發版頻率高（32 個 tag / 9 個月 ≈ 每 8 天一版），但**沒有正式 changelog**——使用者要從 git log 或 npm 版本頁推測變更內容。對需要做 vendoring 與 audit 的團隊是缺口。

## 授權與社群

**量化鐵錨（2026-04-28）**：

- License：[MIT](https://github.com/davila7/claude-code-templates/blob/main/LICENSE)
- Stars：25,731（前一日 25,550，當日 +181）
- Forks：2,583
- Watchers：169（subscribers）
- Open issues：145
- Topics：`anthropic`、`anthropic-claude`、`claude`、`claude-code`
- 主要語言佔比（bytes）：Python 5.0MB（49%）/ JavaScript 1.7MB（17%）/ HTML 1.4MB（13%）/ TeX 0.9MB（9%）/ TypeScript 0.5MB / Shell 0.5MB / CSS 0.4MB / Astro 0.2MB；Python 大量是 agent 範本，CLI 本體實為 JS/TS
- 貢獻者：Top 1 davila7（860 commits，佔絕大多數）、其餘多為 GitHub Actions bot / Dependabot / Claude bot 自動 PR；人類第二名僅 3 commits——**屬「單一作者主導」結構**，bus factor = 1
- 倉庫大小：182MB（元件目錄龐大）
- npm package：`claude-code-templates@1.28.16`，npmjs.com 顯示「100+ agents, commands, MCPs, settings, hooks, skills」
- 增長速率：+181 stars/day ≈ 0.70%（today / total），對 25k 級別仍屬持續上升
- 社群通道：[GitHub Discussions](https://github.com/davila7/claude-code-templates/discussions) 有開、Issues 145 件未關（多為元件投稿請求）

**單一作者風險**：這是 25.7k stars 的專案中極少見的——人類第二名貢獻者只 3 個 commits，Avila 一人扛 99%+ 程式碼產出，雖有 CodeGPT 公司背書，但若 Avila 中途離開或商業化轉向，社群續航能力存疑。

## 資料來源

**本體**：
- GitHub repo：[davila7/claude-code-templates](https://github.com/davila7/claude-code-templates)
- npm：[claude-code-templates](https://www.npmjs.com/package/claude-code-templates)
- 官方目錄站：[aitmpl.com](https://www.aitmpl.com/)
- 官方文件：[docs.aitmpl.com](https://docs.aitmpl.com/introduction)
- 作者個人頁：[davila7 GitHub](https://github.com/davila7)、[Daniel Avila Medium](https://medium.com/@dan.avila7)、[個人站 danielavila.me](https://danielavila.me/)

**第三方評論 / 報導**：
- [Daniel Avila, "Complete Guide to Claude Code Templates"（LatinXinAI / Medium, 2025-08-27）](https://medium.com/latinxinai/complete-guide-to-claude-code-templates-4e53d6688b34)
- [Jannis, "Stop Writing Claude Code Configurations From Scratch"（The Context Layer / Medium, 2025-08-04）](https://medium.com/the-context-layer/stop-writing-claude-code-configurations-from-scratch-this-template-library-changes-everything-aaa49e7e767b)
- [PyShine, "Claude Code Templates: The Ultimate CLI for Configuring and Monitoring Claude Code"（2026-04-26）](https://pyshine.com/Claude-Code-Templates-CLI-Configuration-Monitoring/)
- [Hacker News item 47035652](https://news.ycombinator.com/item?id=47035652)（3 分）
- [GitNation 演講頁](https://gitnation.com/contents/templates-and-components-for-claude-code-the-future-of-ai-coding-workflows)
- [entnerd: CodeGPT 創業故事](https://www.entnerd.com/1-millon-de-descargas-en-10-meses-y-usd-1-millon-levantado-para-crecer-la-historia-de-codegpt/)（作者背景）
- [Scamadviser: aitmpl.com 評分](https://www.scamadviser.com/check-website-old/aitmpl.com)
- [X / @7_eito_7 推介（2025-08-05）](https://x.com/7_eito_7/status/1952957043561906529)
- [daily.dev 收錄](https://app.daily.dev/posts/claude-code-templates-aitmpl-com-ready-to-use-configurations-for-anthropic-s-claude-code-a-compre-bgn77l9ub)

**同類工具**：
- [obra/superpowers](https://github.com/obra/superpowers)——單一作者策展的 Claude Code skill 套件
- [anthropics/claude-code](https://github.com/anthropics/claude-code)——官方 plugin marketplace
- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)——awesome list 形式
- [langgptai/awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts)——prompt 集合（無 CLI）

## 更新紀錄
