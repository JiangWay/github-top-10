---
repo: affaan-m/ECC
first_seen: 2026-05-25
last_updated: 2026-05-25
appearances: [2026-05-25]
growth_appearances: [2026-05-25]
has_releases: true
latest_release: v1.10.0
tags: [AI Agent 框架, Skill 外掛, 自進化, 企業級]
domain: AI Agent 框架
form: Skill 外掛
themes: [自進化, 企業級]
---

# [affaan-m/ECC](https://github.com/affaan-m/ECC)

## 深度研究（2026-05-25 首次）

### 專案定位

[affaan-m/ECC](https://github.com/affaan-m/ECC)（**191,900 stars / 29,705 forks / MIT / JavaScript / 2026-01-18 建立 / 約 4 個月衝至 19.2 萬 stars**）是 **「Everything Claude Code」**（ECC 為縮寫，repo 名同時保留 `affaan-m/everything-claude-code` 別名路由與此倉同源）打造的 **harness-native operator system**——一套疊在 Claude Code / Codex / Cursor / OpenCode / Gemini / Zed / GitHub Copilot 等 agent harness 之上的「Skill + agent + hook + rule + MCP」整合配置包，主軸為 token 最佳化、memory 持久化、continuous learning、安全掃描（AgentShield）與 research-first 開發。今日（2026-05-25）以 **+2,052 stars_today / growth_rate 1.07%** 首登絕對榜 **#4**——此為「巨倉低成長率」典型結構（總量極大、單日佔比天然被稀釋）。**特別查證**：[gh api repos/affaan-m/ECC](https://api.github.com/repos/affaan-m/ECC) 回傳 `fork: false`、無 `parent` 欄位、`created_at: 2026-01-18`、首個 release [v1.0.0](https://github.com/affaan-m/ECC/releases/tag/v1.0.0) 於 2026-01-22、後續 12 個 release 連續發布至 [v1.10.0](https://github.com/affaan-m/ECC/releases/tag/v1.10.0)（2026-04-05），**確認非 fork-renamed 自任何 mega-repo**（非 [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) / 非 [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) / 非任何其他高 stars 倉的轉名）。作者 [Affaan Mustafa](https://github.com/affaan-m)（San Francisco / Bellevue，自介為 "Institutionalizing prediction markets @Ito-Markets"，5,942 followers）在 2026-02 Cerebral Valley × Anthropic 主辦的 **Claude Code Hackathon** 奪冠後將內部 10+ 個月日常使用的 config pack 開源——此為「個人多月配置包」演化為「19 萬 stars meta-harness」的代表案例。

### 核心架構 / 主要概念

- **規模**：60 agents / 232 skills / 75 legacy command shims / 102 static analysis rules / 1,282 tests / 98% coverage（依 [v1.10.0](https://github.com/affaan-m/ECC/releases/tag/v1.10.0) release notes 與 [ecc.tools](https://ecc.tools/) 首頁宣傳數字，較早期 v1.8 / v1.9 release 為 38 agents / 156 skills）
- **跨平台**：原生支援 [Claude Code](https://github.com/anthropics/claude-code) / [OpenAI Codex](https://github.com/openai/codex) / [Cursor](https://cursor.sh/) / [OpenCode](https://github.com/sst/opencode) / Gemini CLI / [Zed](https://github.com/zed-industries/zed) / GitHub Copilot——以「harness-agnostic SKILL.md / agent.md 開放標準」為核心抽象層
- **安裝管道三軌**：①Claude Code plugin marketplace 一鍵 `/plugin install ecc@ecc`、② bash / PowerShell 安裝腳本、③ npm `npm i ecc-universal`（npm 套件名 [ecc-universal](https://www.npmjs.com/package/ecc-universal)）
- **AgentShield 安全層**：1.4.0 版內建 CVE 資料庫含 25+ 個已知 MCP 漏洞、102 條靜態分析規則攔截危險工具呼叫
- **continuous learning 機制**：`/instinct-status` / `/instinct-import` / `/instinct-export` / `/evolve` 命令自動從 session log 抽取 confidence-scored pattern 聚類為新 skill；GitHub App 介面 `/ecc-tools analyze` 指令在 issue 中觸發、由最多 5,000 commit history 抽出 `SKILL.md` 與 `instincts` 回寫 PR
- **核心 skill 涵蓋**：TDD、`/plan`、`/security-review`、code-reviewer、12 語言生態（C# / Rust / Java / Kotlin / C++ / Go / Python / TypeScript / Perl / PyTorch / Nuxt 4 / Flutter）、Django / Spring Boot / Laravel / Go / Rust / Swift / Perl 等框架專屬
- **發版節奏**：[v1.0.0](https://github.com/affaan-m/ECC/releases/tag/v1.0.0)（2026-01-22）→ [v1.1.0](https://github.com/affaan-m/ECC/releases/tag/v1.1.0)（1-26 cross-platform）→ [v1.2.0](https://github.com/affaan-m/ECC/releases/tag/v1.2.0)（2-01 unified commands）→ [v1.3.0](https://github.com/affaan-m/ECC/releases/tag/v1.3.0)（2-05 OpenCode plugin）→ [v1.4.0](https://github.com/affaan-m/ECC/releases/tag/v1.4.0)（2-06 multi-language）→ [v1.5.0](https://github.com/affaan-m/ECC/releases/tag/v1.5.0)（2-11 Universal Edition）→ [v1.6.0](https://github.com/affaan-m/ECC/releases/tag/v1.6.0)（2-24 Codex + GitHub App）→ [v1.7.0](https://github.com/affaan-m/ECC/releases/tag/v1.7.0)（2-27）→ [v1.8.0](https://github.com/affaan-m/ECC/releases/tag/v1.8.0)（3-05）→ [v1.9.0](https://github.com/affaan-m/ECC/releases/tag/v1.9.0)（3-21 Selective Install + Pro tier）→ [v1.10.0](https://github.com/affaan-m/ECC/releases/tag/v1.10.0)（4-05 Surface Refresh + ECC 2.0 alpha）4 個月 12 versions

### 目標使用者

每天高度依賴 Claude Code / Codex / Cursor 等 agent harness 但希望抹除單一供應商鎖定的 ML / 軟體工程師、要把 agent skill 跨 IDE 移植的開發團隊、想替自家專案疊一層通用 TDD / security-review / code-review 自動化流程的工程主管、想跳過自製 `CLAUDE.md` 從零摸索而直接套用「10 個月生產實證 reference architecture」的個人開發者、需要 AgentShield CVE 安全掃描層的企業內部 agent 落地團隊。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Anthropic 官方策展正本目錄、為「marketplace + discovery」；本檔為「單一作者 opinionated harness 全套」，深度遠勝廣度，且跨 7+ harness |
| [anthropics/skills](https://github.com/anthropics/skills) | Anthropic 官方 skill 集為「散點型 skill library」；本檔為「agent + skill + hook + rule + MCP + GitHub App + npm + AgentShield 一站式」 |
| [obra/superpowers](https://github.com/obra/superpowers) | superpowers 為 200K+ stars 大型 Skill 框架但純 markdown skill 為主；本檔多了 `/instinct-*` continuous learning + 102 條靜態分析 + GitHub App pipeline |
| [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) | codegraph 聚焦「code → token-compressed knowledge graph」單點工具；本檔為「整個 agent harness 經營層」 |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | 該倉為 Karpathy single-philosophy skill repo；本檔為作者 10 月日用實證、規模量級大 10×+ |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) / [tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman) | 該等為 agent runtime / CLI 本體；本檔不取代 runtime、而是疊在其上的 configuration / skill layer |

差異化關鍵：**唯一**同時涵蓋「跨 7+ harness × 60 agents × 232 skills × 102 條安全規則 × 1,282 測試 × GitHub App 自動 mining × npm 套件 × Pro tier 商業化」這個矩陣的個人開發者 meta-harness，且擁有自家網域 [ecc.tools](https://ecc.tools/)、商業化路徑（v1.9 引入「ECC Tools Pro」付費層）。

### 外部評論

- [《Everything Claude Code: Inside the 82K-Star Agent Harness That's Dividing the Developer Community》（Medium，Ewan Mak）](https://medium.com/@tentenco/everything-claude-code-inside-the-82k-star-agent-harness-thats-dividing-the-developer-community-4fe54feccbc1)——「分裂評價」長文，**正面**：code-reviewer agent 過濾 >80% confidence 與 security 優先排序「持續獲讚」、TDD workflow「對追求結構化開發實踐的團隊有共鳴」、批評者也承認本檔為「best available reference architecture」即便不全採用；**負面**：批評者主張「60–200 行精雕的 CLAUDE.md 已涵蓋 80% 需求」、997+ 測試與編排引擎「過度工程」、plugin 安裝未自動帶入 rules 須手動 copy 至 `.claude/rules/` 破壞「無縫安裝」承諾、stars 與 discussion 活躍度落差「stars 數可能不等於日常使用率」
- [《Everything Claude Code: The Open-Source Harness System That Cuts Costs 60%》（themenonlab）](https://themenonlab.blog/blog/everything-claude-code-harness-system)——主打「生產環境 60% token 成本下降」、強調 ECC 與 Anthropic「意外經由 npm source map 洩漏的 Claude Code 內部碼」獨立收斂於相同 instrumentation 概念（時序碰巧、非反向工程指控）
- [《ECC v1.10.0 is live — 140K stars, 156 skills, and ECC 2.0 alpha in-tree》（GitHub Discussions #1272）](https://github.com/affaan-m/everything-claude-code/discussions/1272)——作者本人於 4-05 發布的版本里程碑公告（注：發布時為 14 萬 stars，本日 5-25 已 19.2 萬，**51 天 +5.2 萬 stars**）
- [《ECC Tools (Everything Claude Code) - Agent Harness Engineering Toolkit》（EveryDev.ai 工具目錄）](https://www.everydev.ai/tools/ecc-tools)——第三方 AI dev tool 目錄收錄頁，定位為「Agent Harness Engineering Toolkit」
- [ecc.tools 官方網站](https://ecc.tools/)——副標「Open Agent Harness System for GitHub App Automation and Security」，列出 60 agents / 232 skills / 102 rules 等公開數字
- [ecc-universal npm 頁](https://www.npmjs.com/package/ecc-universal) / [ecc-universal libraries.io](https://libraries.io/npm/ecc-universal) / [ecc-universal jsDelivr CDN](https://www.jsdelivr.com/package/npm/ecc-universal)——npm 套件分發 + CDN 多通道發布
- HN / Reddit：截至撰寫尚未出現密集主流社群長文討論——**主流社群滲透弱於 stars 規模**，與 Medium 評論「stars 與 daily usage 落差」相吻合

### Release 狀態

`has_releases: true`，最新 [v1.10.0](https://github.com/affaan-m/ECC/releases/tag/v1.10.0)（2026-04-05，"Surface Refresh, Operator Workflows, and ECC 2.0 Alpha"）。**累計 12 個 release 集中於 2026-01-22 至 2026-04-05 約 11 週**，月均 ~3 個 release；v1.5.0「Universal Edition」（2-11，跨 harness 抽象層）與 v1.6.0「Codex Edition + GitHub App」（2-24，引入自動化挖掘流程）為兩個關鍵轉折點；v1.9「Selective Install + ECC Tools Pro」（3-21）為商業化轉折——導入付費層；v1.10「ECC 2.0 Alpha in-tree」預告下一代版本入 main 分支。發布以來 npm 套件名 [ecc-universal](https://www.npmjs.com/package/ecc-universal) 同步存在；`pushed_at: 2026-05-24T04:53:35Z` 顯示 main 分支於上榜前一天仍活躍。

### 授權與社群（含 fork 關係驗證結果）

**Fork 關係驗證結果**：`fork: false`、無 `parent` / `source` 欄位、`created_at: 2026-01-18`、首版 [v1.0.0](https://github.com/affaan-m/ECC/releases/tag/v1.0.0) 為 2026-01-22 真實 release、`size: 35,732 KB` 約 35 MB 與「skill / agent / rule / hook 配置檔為主」的描述一致、`language: JavaScript`、`topics: ai-agents, anthropic, claude, claude-code, developer-tools, llm, mcp, productivity`——**確認為原生新建倉、非 fork-renamed 自任何 mega-repo**（**非** [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) **非** [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) **非** [microsoft/vscode](https://github.com/microsoft/vscode) **非**任何其他高 stars 倉的轉名）。「191,900 stars / 953 subscribers」的 ~201:1 比例（典型熱門 OSS 約 10–30:1）顯示**大量 star 來自 viral discovery 而非深度 watcher 群**，與 Medium 評論「stars 與 daily usage 落差」相符；但 fork 數 29,705 高達 stars 數 15.5%（典型 1–3%）也支持「實際被開發者 clone 進自家 dotfiles / config」**真實使用率仍可觀**。MIT 授權、貢獻者 170+（前 30 名含 Copilot SWE Bot 22 / dependabot 22 / [Jamkris](https://github.com/Jamkris) 20 / [pvgomes](https://github.com/pvgomes) 15 / [Lidang-Jiang](https://github.com/Lidang-Jiang) 14 / [ozoz5](https://github.com/ozoz5) 12 / [pythonstrup](https://github.com/pythonstrup) 12 / [shimo4228](https://github.com/shimo4228) 12，並有 Anthropic [Claude Code Agent](https://github.com/apps/anthropic-code-agent) bot 6 commits 直接以 GitHub App 身分參與——「Claude 寫 Claude 的 harness」遞迴現象），作者本人 1,415 commits 為唯一主導者（占 commit 量 >70%）。**「明顯為個人主導 + 社群長尾貢獻」結構，非企業背書專案**——但其 [Anthropic Claude Code Hackathon](https://anthropic.com/) 奪冠背景 + Anthropic GitHub App bot 參與 commit 構成「半官方背書」訊號。

## 資料來源

- [affaan-m/ECC repo 主頁](https://github.com/affaan-m/ECC)
- [gh api repos/affaan-m/ECC](https://api.github.com/repos/affaan-m/ECC)
- [gh api repos/affaan-m/ECC/releases](https://api.github.com/repos/affaan-m/ECC/releases)
- [gh api repos/affaan-m/ECC/contributors](https://api.github.com/repos/affaan-m/ECC/contributors)
- [Affaan Mustafa GitHub profile](https://github.com/affaan-m)
- [Affaan Mustafa 個人網站](https://affaanmustafa.com)
- [ecc.tools 官方網站](https://ecc.tools/)
- [ecc-universal npm 套件頁](https://www.npmjs.com/package/ecc-universal)
- [ecc-universal libraries.io 頁](https://libraries.io/npm/ecc-universal)
- [ecc-universal jsDelivr CDN](https://www.jsdelivr.com/package/npm/ecc-universal)
- [Medium《Everything Claude Code: Inside the 82K-Star Agent Harness That's Dividing the Developer Community》](https://medium.com/@tentenco/everything-claude-code-inside-the-82k-star-agent-harness-thats-dividing-the-developer-community-4fe54feccbc1)
- [themenonlab《The Open-Source Harness System That Cuts Costs 60%》](https://themenonlab.blog/blog/everything-claude-code-harness-system)
- [GitHub Discussions #1272 ECC v1.10.0 公告](https://github.com/affaan-m/everything-claude-code/discussions/1272)
- [EveryDev.ai ECC Tools 收錄頁](https://www.everydev.ai/tools/ecc-tools)
- [ECC v1.10.0 release](https://github.com/affaan-m/ECC/releases/tag/v1.10.0)
- [ECC v1.0.0 release](https://github.com/affaan-m/ECC/releases/tag/v1.0.0)
- [Sponsor @affaan-m on GitHub Sponsors](https://github.com/sponsors/affaan-m)
