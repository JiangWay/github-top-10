---
repo: anthropics/claude-plugins-official
first_seen: 2026-05-20
last_updated: 2026-05-20
appearances: [2026-05-20]
growth_appearances: [2026-05-20]
has_releases: false
latest_release: null
tags: [AI Agent 框架, Skill 外掛, 開源替代, 企業級]
domain: AI Agent 框架
form: Skill 外掛
themes: [開源替代, 企業級]
---

# [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)

## 深度研究（2026-05-20 首次）

### 專案定位

[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) 是 Anthropic 親自策展與維護的「Claude Code 官方插件目錄（Official Marketplace）」，作為 Claude Code 插件市集的「正本」入口——使用者啟動 [anthropics/claude-code](https://github.com/anthropics/claude-code) 即內建掛載、無需手動加入。20,061 stars / 約 2,500 forks / 668 open issues、創建於 2025-11-20、homepage 指向 `code.claude.com/docs/en/plugins`、topics 為 `claude-code / mcp / skills`、主語言 Python。本質是一份 marketplace registry（`.claude-plugin/marketplace.json`）加 plugins 內容倉，截至 2026-03 已收錄約 101 個插件（33 個 Anthropic 自建 + 68 個合作夥伴）。

### 核心架構 / 主要概念

- **兩大目錄**：`/plugins`（Anthropic 內部插件）vs `/external_plugins`（合作夥伴與社群提交）
- **單一插件骨架**：`.claude-plugin/plugin.json`（必填 metadata）+ optional `.mcp.json` / `commands/` / `agents/` / `skills/` / `README.md`，把 slash command、subagent、MCP server、hook、Skill 五種擴充點打包成一個可安裝單元
- **安裝指令**：`/plugin install {plugin-name}@claude-plugins-official`；或在 Claude Code 內 `/plugin > Discover` 瀏覽
- **GitHub Actions**（`.github/`）負責 PR 自動驗證、提交流程經 `clau.de/plugin-directory-submission` 表單
- **發版模式**：純 rolling registry，無 release tag，更新走 `main` 分支直接 commit / merge PR

### 目標使用者

Claude Code 使用者中，希望以「官方背書 + 安全審查」路徑取得插件、而非自行追蹤散落於 GitHub 的社群 marketplace；以及 SaaS 廠商（GitHub、Playwright、Supabase、Figma、Vercel、Linear、Sentry、Stripe、Firebase 等）希望讓自家工具被 Claude Code 原生看到的 partner。

### 與類似專案的差異

- [anthropics/skills](https://github.com/anthropics/skills) 只提供「Skill」單一形態（純 markdown + scripts），是 Skill 級資源池
- [obra/superpowers](https://github.com/obra/superpowers) 與 [mattpocock/skills](https://github.com/mattpocock/skills) 是個人 Skill registry
- [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) 為社群企業驗證 Skill registry（Snyk Agent Scan + 鎖檔完整性）
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) 則是**上位「plugin marketplace」**——一個 plugin 可同時封裝 commands + agents + skills + MCP servers + hooks 五類擴充點，並由 Anthropic 親自背書與 partner 共建。把「個人 Skill 散件」升格為「組織級可分發單元」、把「社群提名 registry」升格為「官方默認入口」

### 外部評論

- [Hacker News：Customize Claude Code with plugins（2025-10 公開 beta 討論串）](https://news.ycombinator.com/item?id=45530150)
- [VentureBeat：Anthropic launches Claude Marketplace, giving enterprises access to Claude-powered tools from Replit, GitLab, Harvey and more](https://venturebeat.com/technology/anthropic-launches-claude-marketplace-giving-enterprises-access-to-claude) —— marketplace 主打企業 partner 接入
- [buildtolaunch Substack：Best Claude Code Plugins (2026): 10 Tested, 4 Worth Keeping](https://buildtolaunch.substack.com/p/best-claude-code-plugins-tested-review) —— 評測指「最大挫折不在於 plugin 是否能跑，而是在真實任務跑過前難以判斷『可用』的定義」
- [TechRadar：Anthropic reveals a host of new legal tools for Claude, including 12 new plugins](https://www.techradar.com/pro/anthropic-reveals-a-host-of-new-legal-tools-for-claude-including-12-new-plugins) —— 12 個法律垂直 plugin 上架延伸 marketplace 垂直化
- [systemprompt.io：Install Anthropic Marketplace Plugins in Claude Code](https://systemprompt.io/guides/getting-started-anthropic-marketplace) —— 第三方安裝教學
- [rundatarun.io：Last 30 Days Claude Code](https://rundatarun.io/p/last-30-days-claude-code) —— 統計近 30 日 HN 有 30 篇 Claude Code 貼文

### Release 狀態

**尚無 GitHub Release**（`gh api releases` 回傳空陣列）。更新走 `main` 分支直接 commit / merge PR、`pushed_at` 為 2026-05-19，屬「rolling registry」模式——marketplace 內容由 PR 修補 manifest，使用者端透過 Claude Code 直接拉取最新目錄。`has_releases: false`。

### 授權與社群

License 欄位為 `null`（未指定，仍受 GitHub 預設 ToS 約束，README 強調使用者自負信任責任）。Top contributors：bryan-anthropic（119 commits）、tobinsouth（77）、k6l3（52）、noahzweben（41）、dicksontsai（16）、ThariqS（15）；多數為 Anthropic 員工（`-anthropic` / `-ant` 後綴帳號）。147 watchers、677 open issues、PR 開放 `pull_request_creation_policy: all` 表示社群可直接提交。
