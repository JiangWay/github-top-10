---
repo: mattpocock/skills
first_seen: 2026-04-27
last_updated: 2026-05-02
appearances: [2026-04-27, 2026-04-28, 2026-04-29, 2026-04-30, 2026-05-01, 2026-05-02]
growth_appearances: [2026-04-27, 2026-04-28, 2026-04-29, 2026-04-30, 2026-05-01, 2026-05-02]
has_releases: false
latest_release: null
tags: [開發者工具, Skill 外掛]
domain: 開發者工具
form: Skill 外掛
---

# [mattpocock/skills](https://github.com/mattpocock/skills)

> 研究日期：2026-04-27
> 研究來源：https://github.com/mattpocock/skills
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

知名 TypeScript 教育者 Matt Pocock 把自己 `~/.claude/skills/` 目錄整批開源，是一份 **個人風格 Claude Code Skill 合集**，主打 TDD、重構、PRD 拆解與 git 護欄等 16 個工作流。

## 作者與起源

[mattpocock](https://github.com/mattpocock) 即 Matt Pocock，TypeScript 圈內知名教育者，經營 [Total TypeScript](https://www.totaltypescript.com/) 課程平台、著有 O'Reilly《Total TypeScript》一書，過去曾任職於 Vercel，目前全職經營自己的教育事業。本 repo 創建於 **2026-02-03**，截至 2026-04-27 累積 22,724 stars / 1,859 forks，主要 contributor 為作者本人（24 commits）外加一名協作者 TESTPERSONAL（8 commits）。Repo 自我描述只有一句：「My personal directory of skills, straight from my .claude directory.」走的是「把私房工具直接攤開」的路線，不是事先設計過的框架產品。

## 核心架構 / 主要概念

repo 根目錄是 16 個 skill 子資料夾，每個 skill 一個 `SKILL.md`，安裝方式為 `npx skills@latest add mattpocock/skills/<skill-name>`。實際盤點：

- **規劃／設計類**：[`to-prd`](https://github.com/mattpocock/skills/tree/main/to-prd)（對話轉 PRD 並送 GitHub issue）、[`to-issues`](https://github.com/mattpocock/skills/tree/main/to-issues)（PRD 拆 vertical slice）、[`grill-me`](https://github.com/mattpocock/skills/tree/main/grill-me)（被 AI 反問到設計每條分支都收斂）、[`design-an-interface`](https://github.com/mattpocock/skills/tree/main/design-an-interface)、[`request-refactor-plan`](https://github.com/mattpocock/skills/tree/main/request-refactor-plan)
- **開發類**：[`tdd`](https://github.com/mattpocock/skills/tree/main/tdd)（red-green-refactor 一次一片 vertical slice）、[`triage-issue`](https://github.com/mattpocock/skills/tree/main/triage-issue)、[`improve-codebase-architecture`](https://github.com/mattpocock/skills/tree/main/improve-codebase-architecture)、[`migrate-to-shoehorn`](https://github.com/mattpocock/skills/tree/main/migrate-to-shoehorn)（將 `as` 斷言遷至 `@total-typescript/shoehorn`，TS 味極濃）、[`scaffold-exercises`](https://github.com/mattpocock/skills/tree/main/scaffold-exercises)
- **工具與設置**：[`setup-pre-commit`](https://github.com/mattpocock/skills/tree/main/setup-pre-commit)（Husky + lint-staged + Prettier + tsc + tests）、[`git-guardrails-claude-code`](https://github.com/mattpocock/skills/tree/main/git-guardrails-claude-code)（hook 攔截危險 git 指令）
- **書寫與知識**：[`write-a-skill`](https://github.com/mattpocock/skills/tree/main/write-a-skill)、[`edit-article`](https://github.com/mattpocock/skills/tree/main/edit-article)、[`ubiquitous-language`](https://github.com/mattpocock/skills/tree/main/ubiquitous-language)（DDD 統一語言詞彙抽取）、[`obsidian-vault`](https://github.com/mattpocock/skills/tree/main/obsidian-vault)、[`qa`](https://github.com/mattpocock/skills/tree/main/qa)、[`zoom-out`](https://github.com/mattpocock/skills/tree/main/zoom-out)、[`caveman`](https://github.com/mattpocock/skills/tree/main/caveman)、[`domain-model`](https://github.com/mattpocock/skills/tree/main/domain-model)

## 設計哲學

> "My personal directory of skills, straight from my .claude directory."

README 沒有獨立 ETHOS 章節，這句 repo 描述本身就是宣言：直接把自己日常用的 `.claude` 目錄掀開，不另做產品包裝、不寫教學書。風格貫穿三點：(1) 強型別、TS 優先（連專屬 skill `migrate-to-shoehorn` 都是把自家 `@total-typescript/shoehorn` 套件導入測試）；(2) vertical slice + TDD 一次只動一片；(3) 作者個人偏好硬塞進 prompt（`grill-me` 強迫 AI 反問到底、`git-guardrails` 直接攔危險指令），承認**意見很重不打算中立**。

## 目標使用者與適用情境

- TypeScript / Node 生態工程師，特別是寫 OSS、做課程、PR review 嚴格的人。
- 想要「TDD 從紙上落地到 AI agent 工作流」的開發者—— `tdd` skill 把紅綠重構迴圈寫成 prompt，再加 `triage-issue` 把 bug 變成 TDD-based 修復計畫。
- 經營技術內容、寫文章、整理筆記的人——`edit-article`、`obsidian-vault`、`ubiquitous-language` 三件直接服務知識工作。
- **不適合**：偏好整套團隊治理、要 SSO/RBAC/審計的企業；想要中立預設值不帶作者個人風格的人。

## 與類似專案的差異

| 專案 | 規模（2026-04-27 前後） | 定位 | 風格 | 套件結構 |
|---|---|---|---|---|
| [mattpocock/skills](https://github.com/mattpocock/skills) | 22.7k★ / 1.9k fork / MIT | 個人 .claude 目錄直出 | TS 強型別、TDD、個人意見強 | 16 個 skill 平鋪資料夾 |
| [obra/superpowers](https://github.com/obra/superpowers) | 約 40-94k★（不同來源） | Anthropic 員工 Jesse Vincent 的 agentic skill 框架 | 強制 clarify→spec→plan→execute→review 流程 | 大型 skill library + 方法論 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | 約 35-50k★ | YC CEO Garry Tan 的「Claude Code 即 AI 工程團隊」 | 角色化（PM/QA/code review/browser test） | 多角色 skill stack |

三者並非互斥，[Pulumi 部落格](https://www.pulumi.com/blog/claude-code-orchestration-frameworks/) 與 [DEV.to 比較文](https://dev.to/imaginex/a-claude-code-skills-stack-how-to-combine-superpowers-gstack-and-gsd-without-the-chaos-44b3) 都把它們定位成「決策層 / 執行層 / 穩定層」可疊加；mattpocock/skills 在這個語境裡更像是個人化的「執行層細節包」，沒有 superpowers 的方法論強制力，也沒有 gstack 的多角色編排。

## 外部評論

- [The 10 Claude Code Skills I Actually Use at Work — Welcome Developer](https://www.welcomedeveloper.com/posts/the-10-claude-code-skills/)：作者把 mattpocock/skills 列為日常實用清單，描述其風格為「strict type discipline, clean interface boundaries, and refactoring patterns」，並評為「stricter than Claude's default, closer to what I'd actually enforce in a PR」。
- [Vibe Sparking — Matt Pocock's Skills: The Skill Economy for Claude Code Is Starting](https://www.vibesparking.com/en/blog/ai/claude-code/skills/2026-03-18-matt-pocock-skills-claude-code-skill-economy/)：把這個 repo 視為「skill 經濟」起頭信號，知名教育者下場提供個人配置等於替整個 Claude Code skill 市場背書。
- [Resolve — Matt Pocock's TDD Skill for Claude Code](https://resolvewith.me/blog/tdd-skill-claude-code-matt-pocock)：專文剖析 `tdd` skill，論點是它把 TDD 從口號變成 AI 真正能遵守的 prompt 結構。
- [Matt Pocock 本人在 X](https://x.com/mattpocockuk/status/2022036754648166527) 發文宣傳 TDD skill：「Before: dozens of shit tests, coupled to implementation / After: only the tests required, validating real behavior」。
- 未見顯著 HN 首頁討論串；Reddit 有零星提及但未形成集中討論。中文社群目前資料不足。

## Release 狀態 / 時間軸

`gh api repos/mattpocock/skills/releases` 回傳空陣列，**尚無 GitHub Release**。版本控制完全靠 git history，主分支最後 push 為 2026-04-24。觀察活躍度：作者 24 次 commit、協作者 8 次，整體節奏是日更/週更微調。

## 授權與社群

- **License**：MIT
- **Stars**：22,724（建立至今 ~83 天，平均 ~274 stars/day；今日 +2,507 為單日爆量，growth_rate 11.04%）
- **Forks**：1,859
- **Watchers / Subscribers**：22,724 watching / 268 subscribers
- **Open Issues**：17（issues 與 PR 都開啟）
- **Contributors**：2 人（作者 24 commits、TESTPERSONAL 8 commits）
- **語言**：Shell 為主（GitHub 偵測），實際內容是 markdown SKILL 文件

社群規模目前以 stars 觀眾為主，貢獻面非常窄——這就是 dev personality repo 的特徵：人們是 star 作者，不是 star 待協作專案。

## 資料來源

**本體**
- [GitHub repo](https://github.com/mattpocock/skills)
- [README.md](https://github.com/mattpocock/skills/blob/main/README.md)
- `gh api repos/mattpocock/skills`、`gh api repos/mattpocock/skills/contributors`、`gh api repos/mattpocock/skills/releases`

**第三方評論**
- [Welcome Developer — The 10 Claude Code Skills I Actually Use at Work](https://www.welcomedeveloper.com/posts/the-10-claude-code-skills/)
- [Vibe Sparking — Matt Pocock's Skills: The Skill Economy](https://www.vibesparking.com/en/blog/ai/claude-code/skills/2026-03-18-matt-pocock-skills-claude-code-skill-economy/)
- [Resolve — Matt Pocock's TDD Skill for Claude Code](https://resolvewith.me/blog/tdd-skill-claude-code-matt-pocock)
- [Matt Pocock on X — TDD skill 發文](https://x.com/mattpocockuk/status/2022036754648166527)
- [DEV.to — A Claude Code Skills Stack](https://dev.to/imaginex/a-claude-code-skills-stack-how-to-combine-superpowers-gstack-and-gsd-without-the-chaos-44b3)
- [Pulumi Blog — Superpowers, GSD, and GSTACK](https://www.pulumi.com/blog/claude-code-orchestration-frameworks/)
- [Medium — Superpowers, GSD, and gstack: What Each Claude Code Framework Actually Constrains](https://medium.com/@tentenco/superpowers-gsd-and-gstack-what-each-claude-code-framework-actually-constrains-12a1560960ad)

**同類工具**
- [obra/superpowers](https://github.com/obra/superpowers)
- [garrytan/gstack](https://github.com/garrytan/gstack)
- [Firecrawl — Best Claude Code Skills to Try in 2026](https://www.firecrawl.dev/blog/best-claude-code-skills)

## 更新紀錄
