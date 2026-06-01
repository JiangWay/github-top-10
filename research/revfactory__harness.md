---
repo: revfactory/harness
first_seen: 2026-05-31
last_updated: 2026-06-01
appearances: [2026-05-31, 2026-06-01]
growth_appearances: [2026-05-31, 2026-06-01]
has_releases: false
latest_release: null
tags: [AI Agent 框架, Skill 外掛, 自進化, 多代理編排, 開源替代]
domain: AI Agent 框架
form: Skill 外掛
themes: [自進化, 多代理編排, 開源替代]
---

# [revfactory/harness](https://github.com/revfactory/harness)

## 深度研究（2026-05-31 首次）

### 專案定位

[revfactory/harness](https://github.com/revfactory/harness)（4,468 stars / 636 forks / 2026-03-26 建立約 2 個月 / Apache-2.0 / GitHub 偵測語言為 HTML 但本體是 Claude Code plugin 的 Markdown skill / 作者 [revfactory](https://github.com/revfactory)（Minho Hwang，任職 [@kakao](https://github.com/kakao)，韓國））是一個 **meta-skill（元技能）**——它本身不直接幹活，而是「設計領域專屬的 agent 團隊、定義各 agent、並生成這些 agent 所用的 skill」。一句話描述就是 README 的自我定位：把一句領域描述「turns a domain description into an agent team and the skills they use」。今日以 **+318 stars / growth_rate 7.12%** 首登絕對榜 **#8**、同時居增長榜 **#2**，是本站「Claude Code skill 生態」中繼 [obra/superpowers](https://github.com/obra/superpowers) 之後又一檔以「skill 生成 skill」為核心賣點的高速竄升專案。forks 636 / stars 4,468 達 14.2% 的高 fork 比例，顯示使用者多半是 clone 下來實際生成自己的 agent 團隊而非單純觀望。作者個人 repo 數達 278、目前 37/41 commits 為作者本人主導，屬個人主力專案。

### 核心架構 / 主要概念

harness 的運作核心是一套寫在 `skills/harness/SKILL.md` 的 **8 階段（Phase 0–7）meta-workflow**，使用者只要說「build a harness for this project」就觸發整條流程：

- **L3 Meta-Factory 定位**：作者把它放在 Claude Code 生態的「L3 元工廠」層——「the layer that generates other harnesses rather than being one」。同層的姊妹子層是 [revfactory/archon](https://github.com/revfactory/archon)（生成確定性 runtime 設定），而 harness 專責生成「團隊架構」。
- **Phase 0 現狀稽核 → 三分支**：先掃描既有 `.claude/agents/`、`.claude/skills/`、`CLAUDE.md`，再分流到「新建」「擴充既有」或「運維維護」三條路徑——不是無腦每次重生成。
- **Phase 2 執行模式決策樹**：核心決策是「Agent Teams（預設）vs Subagents vs Hybrid」。原則是「2 名以上協作時必先檢視 agent team」（`TeamCreate` + `SendMessage` + `TaskCreate`，團隊以直接通訊自組織）；只有當單一任務只需回傳結果、團隊通訊開銷大於協調收益時才退而用 subagent。
- **六種團隊架構模式**：Pipeline（順序相依）、Fan-out/Fan-in（平行獨立）、Expert Pool（情境動態選用）、Producer-Reviewer / Generate-Validate（生成後審查）、Supervisor（中央 agent 管狀態與動態派工）、Hierarchical Delegation（遞迴由上而下委派）。Phase 2 依「專業化 / 可平行 / 上下文隔離 / 可重用」四軸決定 agent 切分。
- **Phase 3/4 生成產物**：生成 `.claude/agents/{name}.md`（角色、原則、輸入輸出協定、團隊通訊）與 `.claude/skills/{name}/SKILL.md`（含 `scripts/` `references/` `assets/`）。明文規則「所有 agent 必須以檔案定義」，且 skill description 要寫得「積極（pushy）」以誘發觸發。
- **Phase 5 編排層**：每個 harness 配 1 個 orchestrator skill 串接 agent 與 skill，含資料傳遞協定、錯誤處理、團隊規模指南；`CLAUDE.md` 只登記「pointer（觸發規則 + 變更歷史表）」，刻意不在 `CLAUDE.md` 重列 agent/skill 清單以避免重複（v1.2.0 起的「pointer 政策」簡化）。
- **Phase 6 驗證 + Phase 7 自進化**：Phase 6 做結構檢查、with-skill vs without-skill 平行測試、8–10 條 should-trigger 與 8–10 條 near-miss should-NOT-trigger 觸發驗證、dry-run；Phase 7 收集執行後回饋並把演化記入 `CLAUDE.md` 變更歷史——呼應 SKILL.md 的口號「하네스는 고정물이 아니라 진화하는 시스템이다（harness 不是固定物而是進化中的系統）」。

### 目標使用者

重度使用 Claude Code、想把單一 prompt 工程升級成「多 agent 協作團隊 + 配套 skill」的開發者；需要為特定領域（程式碼審查、內容產製、資安稽核等）快速 scaffold 一整套 agent 與 skill 而不想手寫每個 agent 定義的人；想標準化團隊內 Claude Code 用法、把 agent 架構決策（pipeline / supervisor / expert pool…）從「臨場拍板」變成「六種具名模式選一」的工程團隊。對「skill 生成 skill」這種 meta 層級抽象有興趣、願意做 2–4 週內部 pilot 量測自家數字的早期採用者。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | superpowers 是「現成 skill 大合集 + 方法論」（直接給你能用的 skill）；harness 是 **meta-skill**——不給現成 skill，而是依你的領域描述「生成」客製 agent 團隊與 skill。一個是 skill 庫，一個是 skill 工廠 |
| [anthropics/skills](https://github.com/anthropics/skills) | Anthropic 官方示範各種 skill 的寫法與標準（人寫 skill）；harness 把「寫 skill 與 agent」這件事自動化成一條 8 階段流程 |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 官方 plugin marketplace（散裝即裝即用的 plugin）；harness 是其中一個 plugin，但職責是「替你產出 plugin 內容物」 |
| [revfactory/archon](https://github.com/revfactory/archon) | 作者自述的姊妹子層：archon 生成「deterministic, repeatable runtime configurations」，harness 生成「team architectures + skills」——同屬 L3 Meta-Factory 但互補 |
| [revfactory/harness-100](https://github.com/revfactory/harness-100) | 同作者的「成品展示」repo（839 stars，2026-03-22 建立）：用本 plugin 生成的 100 套跨 10 領域 production-ready agent team harness（英韓雙語共 200 包），每套含 4–5 個 specialist agent + 1 orchestrator skill + 領域 skill |

差異化關鍵：harness 切的抽象層比一般 skill 庫高一階——它賣的不是「skill」而是「生成 skill 與 agent 團隊的標準化流程 + 六種具名團隊架構模式」。

### 外部評論

- [Harness 官方 GitHub Pages 站](https://revfactory.github.io/harness/)——作者自建的介紹頁，列出六模式與 A/B 量測數字
- [skillsllm.com 收錄頁《harness - AI Agents on GitHub》](https://skillsllm.com/skill/harness)——第三方 skill 聚合站收錄，標註 4k★
- [README_KO.md（韓文）](https://github.com/revfactory/harness/blob/main/README_KO.md)、[README_JA.md（日文）](https://github.com/revfactory/harness/blob/main/README_JA.md)——作者提供英／韓／日三語 README，顯示主要受眾在東亞（尤其韓國）開發者社群
- **效能宣稱（需注意限制）**：README 全文一致使用「+60% avg quality（49.5 → 79.3）、15/15 win-rate、−32% variance」，並在同句揭露「n=15, author-measured A/B, third-party replications pending」（作者自測、第三方複現尚缺），且數字實測於姊妹倉 [revfactory/claude-code-harness](https://github.com/revfactory/claude-code-harness)。作者建議採用前先跑 2–4 週內部 pilot 量自家數字——這份「自我設限」式揭露在行銷型 README 中相對少見
- **獨立第三方評論**：截至撰寫，HN / Reddit / 主流技術部落格上**未發現顯著的獨立第三方評測或討論串**，現有可見資料幾乎全來自作者自建頁面、官方 README 與 skill 聚合站回流。名稱相近的 [Chachamaru127/claude-code-harness](https://github.com/Chachamaru127/claude-code-harness) 與 [aimaker.substack.com 一篇談 agent harness 的文章](https://aimaker.substack.com/p/claude-code-hooks-workflow) 均為**不同專案／泛談主題**，非針對本 repo 的評論

### Release 狀態

**尚無 GitHub Release**（`gh api .../releases` 回傳 0 筆、tags 亦為空）。但專案有完整 `CHANGELOG.md` 採 Semantic Versioning，內部版號已推進至 **v1.2.0**（2026-04-08），`[Unreleased]` 段落仍在累積（新增 Phase 3-0／4-0「生成前重複檢查」、agent/skill 再利用設計章節）。`.claude-plugin/plugin.json` 標記 `version: 1.2.0`。v1.2.1（2026-04-18）CHANGELOG 自承曾出現 README 徽章 `v1.0.1`、marketplace.json `1.1.0`、plugin.json `1.2.0` 三處版號不一致並已統一，且記錄「計畫補打 v1.0.0/v1.0.1/v1.1.0/v1.2.0 回溯 tag」——但截至今日仍未實際建立 tagged release，故本檔記 `has_releases: false`。`pushed_at` 為 2026-05-29 顯示 main 分支近期仍活躍。

### 授權與社群

Apache-2.0（對企業採用友善，含專利授權條款）。社群以作者 [revfactory](https://github.com/revfactory)（Minho Hwang @kakao）為絕對主力（37 commits），其餘貢獻者 [shaun0927](https://github.com/shaun0927)、[hnts03](https://github.com/hnts03)、[hongsw](https://github.com/hongsw)、[theendd-avatye](https://github.com/theendd-avatye) 各 1 commit，屬「個人主導 + 零星外部 PR」型態。專案備有 `CONTRIBUTING.md`（明示 SLA：PR 首次回應 72h、Issue triage 48h）、四種 Issue 模板（bug / feature / question / config）與 PR 模板，open issues 僅 6 件，社群治理結構完整但實際外部協作量仍小。安裝兩途徑：marketplace（`/plugin marketplace add revfactory/harness`）或直接複製 skill 目錄到 `~/.claude/skills/harness/`。

## 資料來源

- `gh api repos/revfactory/harness`（描述 / Apache-2.0 / created_at 2026-03-26 / pushed_at 2026-05-29 / 4,468 stars / 636 forks / topics: claude-code, claude-code-plugin, harness, harness-engineering）
- `gh api repos/revfactory/harness/releases`（0 筆）、`gh api repos/revfactory/harness/tags`（空）
- `gh api repos/revfactory/harness/git/trees/main?recursive=1`（檔案結構：`skills/harness/SKILL.md` + `references/` 六檔、`.claude-plugin/plugin.json`、`CHANGELOG.md`、英韓日三語 README、`_workspace/`）
- `gh api repos/revfactory/harness/contents/CHANGELOG.md`（內部版號 v1.2.0、Unreleased 段、版號不一致修復史）
- `gh api repos/revfactory/harness/contents/.claude-plugin/plugin.json`（version 1.2.0、17 個 keywords、六模式列舉）
- `gh api users/revfactory`（Minho Hwang / @kakao / 韓國 / 278 repos / 515 followers）
- `gh api repos/revfactory/harness/contributors`、`repos/revfactory/harness-100`、`repos/revfactory/claude-code-harness`
- [WebFetch github.com/revfactory/harness（README）](https://github.com/revfactory/harness)
- [WebFetch skills/harness/SKILL.md](https://github.com/revfactory/harness/blob/main/skills/harness/SKILL.md)
- [Harness 官方頁](https://revfactory.github.io/harness/)、[skillsllm.com 收錄](https://skillsllm.com/skill/harness)、[README_KO](https://github.com/revfactory/harness/blob/main/README_KO.md)、[README_JA](https://github.com/revfactory/harness/blob/main/README_JA.md)
