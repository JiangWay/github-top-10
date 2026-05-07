---
repo: addyosmani/agent-skills
first_seen: 2026-05-07
last_updated: 2026-05-08
appearances: [2026-05-07, 2026-05-08]
growth_appearances: [2026-05-07, 2026-05-08]
has_releases: true
latest_release: 0.6.0
tags: [開發者工具, Skill 外掛, 多代理編排, 企業級]
domain: 開發者工具
form: Skill 外掛
themes: [多代理編排, 企業級]
---

# addyosmani/agent-skills — 深度研究

## 深度研究（2026-05-07 首次）

### 專案定位
[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 是 Google Chrome 團隊工程師 Addy Osmani 推出的「正式級工程技能包」，把資深工程師的工作流（規格、測試、審查、部署）打包成 AI coding agent 可直接套用的 SKILL.md 集合。它要解決的問題很具體：AI agent 預設會走捷徑、跳過規格與測試，這個 repo 用結構化技能與防止合理化的對照表把工程紀律塞回 agent 的執行軌跡。

### 核心架構 / 主要概念
- **20 個核心 Skill**：覆蓋 Define → Plan → Build → Verify → Review → Ship 完整生命週期，例如 `spec-driven-development`、`test-driven-development`、`code-review-and-quality`、`security-and-hardening`、`shipping-and-launch`。
- **7 個 Slash Command**：`/spec`、`/plan`、`/build`、`/test`、`/review`、`/code-simplify`、`/ship` 作為使用者入口。
- **3 個 Persona**：`code-reviewer`、`test-engineer`、`security-auditor`，`/ship` 會以平行 fan-out 方式同時跑三位專家做合併判斷。
- **三層 Orchestration**：Personas（誰）、Skills（怎麼做）、Slash Commands（何時觸發），組合規則明定 persona 不得呼叫 persona。
- 多平台支援：Claude Code、Cursor、Gemini CLI、Windsurf、OpenCode、GitHub Copilot、Kiro IDE。

### 目標使用者
日常使用 Claude Code、Cursor 等 AI coding agent 的軟體工程師與團隊，特別是想把 Google 風格的程式審查、效能與安全紀律落地到 agent 工作流的 staff/senior 工程師，以及希望以同一套標準跨工具一致執行的團隊。

### 與類似專案的差異
- 對比 [obra/superpowers](https://github.com/obra/superpowers)：superpowers 偏向 brainstorm／plan／TDD 等通用工作流框架；agent-skills 更偏向把「Google 式工程文化」（Hyrum's Law、Beyonce Rule、Chesterton's Fence、trunk-based）落為硬性 checklist。
- 對比 [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)：後者是社群收錄的 1000+ skills 目錄；agent-skills 是單一作者策展、互相耦合的精煉 skill 套件。

### 外部評論
- [Hacker News 討論串](https://news.ycombinator.com/item?id=48015397)：留言對「以剛性規則約束 LLM」是否真的有效抱有疑慮，質疑 agent 是否會忠實遵守規格。
- [Addy Osmani 部落格](https://addyosmani.com/blog/agent-skills/)：作者自述設計初衷是把資深工程師的判斷編碼進 agent，避免它們走捷徑。
- [Jimmy Song 中文介紹](https://jimmysong.io/ai/addyosmani-agent-skills/)：整理 skill 清單與安裝路徑，定位為 Google 工程文化的 agent 化。

### Release 狀態
最新版本為 [0.6.0](https://github.com/addyosmani/agent-skills/releases/tag/0.6.0)（2026-04-28 發佈），重點是三層 orchestration 模型、`/ship` 平行 fan-out、Gemini CLI／Kiro／OpenCode 整合，以及 source-driven-development 的引用快取。

### 授權與社群
MIT 授權；30,089 stars、3,603 forks、67 open issues。主要作者為個人開發者 [addyosmani](https://github.com/addyosmani)（Google Chrome 團隊），共 17 位 contributor，其餘多為單次小型修正（accessibility、performance checklist、Gemini CLI 指令）。topics 標註 `claude-code`、`cursor`、`antigravity`、`skills`。

## 更新紀錄

### 2026-05-08
- 連榜 Day 2（5-07～5-08），絕對榜由 #2 退至 **#6**（持榜段位）、增長率榜由 #9 跳升至 **#4**（2.09% → 9.36%，+7.27pp）；stars_today 629 → **3,058（+386%）**幾近 5×，是當日跳幅最大的留榜檔；total stars 30,061 → **32,684（+2,623）**。
- Release 端無新增，仍為 [0.6.0](https://github.com/addyosmani/agent-skills/releases/tag/0.6.0)（2026-04-28）；新增能量主要來自社群推薦放大，而非新版本發布。
- stars_today 跳升幅度高於 [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) 的 -6.4% 與 [anthropics/financial-services](https://github.com/anthropics/financial-services) 的 +153%，agent-skills 的 +386% 為留榜段最劇烈加速；意味 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 已從「首次上榜的新檔」進入「社群口碑放大」階段。
