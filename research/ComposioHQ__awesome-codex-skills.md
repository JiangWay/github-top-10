---
repo: ComposioHQ/awesome-codex-skills
first_seen: 2026-04-27
last_updated: 2026-04-29
appearances: [2026-04-27, 2026-04-28, 2026-04-29]
growth_appearances: [2026-04-27, 2026-04-28, 2026-04-29]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材]
domain: 教學資源
form: 課程教材
---

# [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills)

> 研究日期：2026-04-27
> 研究來源：https://github.com/ComposioHQ/awesome-codex-skills
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills) 是一份針對 OpenAI **Codex CLI / API** 的 awesome-list，把實戰可用的「Codex skill」打包成可一鍵安裝的資料夾合集，把 Codex 從「會寫字的 LLM」推往「會替你 send email、開 issue、推 Slack 的執行端」。

## 作者與起源

維護者是 [ComposioHQ](https://github.com/ComposioHQ)——Y Combinator W23 校友、執行長 Anthony Azrak 創辦的 AI agent 整合平台公司。Composio 自家旗艦專案 [ComposioHQ/composio](https://github.com/ComposioHQ/composio) 號稱「powers 1000+ toolkits, tool search, context management, authentication」，2026 年宣布 [Series A 募資 29M 美元](https://composio.dev/blog/series-a)，主打「為 AI agent 提供執行層」。在這個語境下，本 awesome-list 不是純社群貢獻，而是 Composio 把自家 1000+ toolkit 透過 Codex 的 skill 機制做的官方上架，與其同期推出的 [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) 形成 Anthropic / OpenAI 雙生態的同步覆蓋。倉庫於 **2026-01-12** 建立，至今約 105 天。主要貢獻者為 [Prat011](https://github.com/Prat011)（14 commits），其餘為零星社群 PR。

## 核心架構 / 主要概念

每個 skill 是一個獨立資料夾，內含 `SKILL.md`（含 metadata 與 step-by-step 指引），可透過 Python installer 一鍵裝到 `$CODEX_HOME/skills`（預設 `~/.codex/skills`），也可手動複製。README 將約 60 個 skill 分為五大類：**Development & Code Tools**、**Productivity & Collaboration**、**Communication & Writing**、**Data & Analysis**、**Meta & Utilities**。具體例子：

- [`gh-fix-ci`](https://github.com/ComposioHQ/awesome-codex-skills/tree/master/gh-fix-ci) — 解析失敗的 GitHub Actions check、摘要根因並提出修復
- `codebase-migrate` — 大規模程式碼遷移與多檔重構，分批可審、CI 驗證
- `meeting-notes-and-actions` — 把會議逐字稿轉成摘要、決議與帶 owner 的 action items
- `spreadsheet-formula-helper` — 寫與除錯 spreadsheet 公式、pivots、array formulas
- `linear` / `notion-knowledge-capture` / `support-ticket-triage` — Composio toolkit 直連 SaaS

## 設計哲學

README 的核心一句話：

> "Want skills that do more than generate text? Codex can send emails, create issues, post to Slack, and take actions across 1000+ apps."

— skill 不只是 prompt 模板，而是**可採取行動**的工作流封裝。

## 目標使用者與適用情境

- 已採用 Codex CLI（gpt-5-codex / gpt-5.1-codex）的個人開發者，想跳過從零寫 prompt
- 維運型工程師：CI 修復、Sentry triage、Datadog 日誌過濾
- 行政 / PM 角色：把會議紀錄、Notion 同步、Linear issue 開單塞進終端機
- 想評估「Codex skill 生態 vs Claude Code skill 生態」的技術決策者

## 與類似專案的差異

| 專案 | 目標宿主 | 廠商 | 內容物 | 行動能力 |
|---|---|---|---|---|
| [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills) | OpenAI Codex CLI / API | Composio（YC W23） | ~60 個 skill 資料夾 | 重，內建 Composio toolkit |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Claude Code | Matt Pocock 個人 | 教學導向 skill 包 | 輕，偏 prompt 工程 |
| [obra/superpowers](https://github.com/obra/superpowers) | Claude Code | Jesse Vincent 個人 | brainstorming / TDD / debug 等 meta-skill | 中，著重工作流 |

關鍵差異：本倉是**OpenAI 陣營**唯一被 Composio 官方背書的 skill 合集，主打「打開 1000+ SaaS 的執行能力」；mattpocock 與 obra 兩者均屬**Anthropic Claude Code 陣營**，且都是個人維護、偏 prompt-craft。Codex 與 Claude Code 的 skill 並不互通——前者讀 `AGENTS.md`、frontmatter 規格不同，[OpenAI 開發者社群](https://community.openai.com/t/claude-to-codex-bring-claude-skills-to-codex-automatically/1378574)有專門工具在做雙向轉換。

## 外部評論

- Composio 官方部落格 [Top 10 Codex Skills You Do Not Want to Miss in 2026](https://composio.dev/content/top-codex-skills) 為自家行銷推文。
- 對手陣營的同名專案 [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)（聚合 Claude Code + Codex + Gemini CLI + Cursor）與 [hashgraph-online/awesome-codex-plugins](https://github.com/hashgraph-online/awesome-codex-plugins) 同期出現，顯示 skill 合集已成新賽道。
- 對 Codex vs Claude Code 的工程比較有 [Hacker News thread #46391391](https://news.ycombinator.com/item?id=46391391)、[Builder.io 評測](https://www.builder.io/blog/codex-vs-claude-code)、[XDA Developers 換用心得](https://www.xda-developers.com/ditched-claude-code-for-codex/)。
- 中文社群討論：**資料不足**，目前未見繁中或簡中圈專文討論本倉。

## Release 狀態 / 時間軸

`gh api .../releases` 回傳空陣列，**尚無 GitHub Release**。倉庫採滾動式 master 分支推進，最近一次 push 為 2026-04-24。

## 授權與社群

- Stars：**1,888**（gh api 即時值，當日報為 1,886）；今日 +518，**增長率 27.47%，為今日榜首位**
- Forks：155、watchers：1,888、open issues：22
- 建立時間：**2026-01-12**，距今約 **105 天**
- 授權：`license: null`（gh api 顯示無 LICENSE 檔），社群 PR 與商用引用前需自行向 Composio 確認
- 主要語言：Python（installer 腳本）；topics 含 `awesome`、`codex-cli`、`gpt-5-codex`、`gpt-5-1-codex`、`coding-agent-skills`

## 資料來源

- [GitHub repo](https://github.com/ComposioHQ/awesome-codex-skills)
- [README.md](https://github.com/ComposioHQ/awesome-codex-skills/blob/master/README.md)
- `gh api repos/ComposioHQ/awesome-codex-skills`、`/contributors`、`/releases`
- [Composio 官網](https://composio.dev/)、[Series A 公告](https://composio.dev/blog/series-a)
- [Top 10 Codex Skills 部落格](https://composio.dev/content/top-codex-skills)
- [Claude-to-codex 轉換討論（OpenAI Community）](https://community.openai.com/t/claude-to-codex-bring-claude-skills-to-codex-automatically/1378574)
- [Hacker News：Codex vs Claude Code](https://news.ycombinator.com/item?id=46391391)
- 對照倉：[mattpocock/skills](https://github.com/mattpocock/skills)、[obra/superpowers](https://github.com/obra/superpowers)、[VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)

## 更新紀錄
