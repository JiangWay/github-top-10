---
repo: tech-leads-club/agent-skills
first_seen: 2026-05-18
last_updated: 2026-05-18
appearances: [2026-05-18]
growth_appearances: [2026-05-18]
has_releases: true
latest_release: skills-catalog-v0.14.3
tags: [開發者工具, Skill 外掛, 開源替代, 企業級]
domain: 開發者工具
form: Skill 外掛
themes: [開源替代, 企業級]
---

# [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) 深度研究（2026-05-18 首次）

巴西社群 [tech-leads-club](https://github.com/tech-leads-club) 推出的「**安全經過驗證**的 AI 編碼代理 skill 註冊中心」，今日以 27.03% 的日增長率衝上本站絕對榜（923/3,415 stars），是當日榜首。同時間 [Snyk](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/) 於 2 月公布的 ToxicSkills 研究指出公開 skill 市集 13.4% 含有重大漏洞，加上 ClawHavoc 事件（341 個惡意 skill 被植入 ClawHub），市場對「人工策展、CI 內建靜態掃描」的替代來源出現急迫需求——本檔正是針對該空白而設計。

## 專案定位
與 [anthropics/skills](https://github.com/anthropics/skills)（官方 canonical 倉庫）、[obra/superpowers](https://github.com/obra/superpowers)（方法論框架）、[mattpocock/skills](https://github.com/mattpocock/skills) 與 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)（個人 dotfiles 開源）以及 [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)（科學垂直 135 個 skill）的「個人／官方／垂直」三條路線都不同：本檔是**社群策展 + 商業級安全保證**的第四條路線，定位為「skill 界的 npm registry，但有 Snyk 把關」。

## 核心架構 / 主要概念
- **Monorepo + Nx**：TypeScript 68.1%／Python 22.7%，內含 `agent-skills` CLI、`skills-catalog`、`mcp` 三個獨立 release line（已迭代 30 個版本）
- **Defense-in-depth 安全層**：sanitization、path isolation、symlink guards、atomic lockfiles、audit trails
- **Snyk Agent Scan**：每個 skill 上架前強制 [Snyk 靜態分析](https://snyk.io/blog/snyk-tessl-partnership/)，無 binary 全開源
- **內容完整性**：lockfile 與 content hashing 保證 skill 不被供應鏈竄改

## 目標使用者
專業 AI 編碼代理使用者，特別是企業團隊。支援三層：**Popular**（[Claude Code](https://github.com/anthropics/claude-code)、Cursor、Copilot、Windsurf、Cline）／**Rising**（Aider、[Google Antigravity](https://antigravity.google/)、Gemini CLI、Kilo Code、Sourcegraph Cody）／**Enterprise**（Amazon Q、Augment、Droid、OpenCode、Tabnine）。對「不能裝來路不明 skill」的合規場景特別友善。

## 與類似專案的差異
- vs [anthropics/skills](https://github.com/anthropics/skills)：官方僅提供範本，本檔提供**跨代理 + 商業驗證**
- vs [obra/superpowers](https://github.com/obra/superpowers)：對方是方法論，本檔是註冊中心
- vs [mattpocock/skills](https://github.com/mattpocock/skills)／[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)：個人 dotfiles vs 組織策展
- vs [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)：對方是 1,000+ awesome list，本檔是**經審核**的精選

## 外部評論
- [Snyk 官方介紹](https://snyk.io/blog/snyk-tessl-partnership/)：點名為「設定 skill 註冊安全標準」的合作案例
- [Ry Walker Research 評論](https://rywalker.com/research/agent-skills-registry)：將其定位為 skill 生態的 npm + Snyk 模式
- [agentskill.work 收錄頁](https://agentskill.work/en/skills/tech-leads-club/agent-skills)：列為「Secure Registry for AI Coding Tools」代表作
- [Snyk ClawHub 漏洞研究](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)：揭露公開市集 13.4% 含重大漏洞，間接推升本檔正當性

## Release 狀態
30 個 release（三條 line 並行），最近一次 [skills-catalog-v0.14.3](https://github.com/tech-leads-club/agent-skills/releases/tag/skills-catalog-v0.14.3)（2026-04-28）新增 `tactical-ddd` skill，同期 commit `fix(deps): patch npm dependency security vulnerabilities` 修復 3 high + 22 moderate 漏洞，與安全定位一致。

## 授權與社群
License 為 NOASSERTION（README 標示 100% 開源無 binary）。主貢獻者 [felipfr](https://github.com/felipfr)（793 commits）、[edmarpaulino](https://github.com/edmarpaulino)（110）、release bot（61）、[waldemarnt](https://github.com/waldemarnt)（24，社群創辦人 [Waldemar Neto](https://www.instagram.com/waldemar.devlab/)）。母社群 [TechLeads.club](https://github.com/tech-leads-club) 是巴西葡語付費會員制，三大支柱為技術卓越／價值交付／領導啟發，本檔為其首個出圈到全球 GitHub trending 的開源產出。
