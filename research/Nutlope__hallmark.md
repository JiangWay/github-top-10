---
repo: Nutlope/hallmark
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: false
latest_release: null
tags: [開發者工具, Skill 外掛]
domain: 開發者工具
form: Skill 外掛
themes: []
---

# [Nutlope/hallmark](https://github.com/Nutlope/hallmark)

> 研究日期：2026-10-25
> 研究來源：https://github.com/Nutlope/hallmark
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[Nutlope/hallmark](https://github.com/Nutlope/hallmark) 是給 Claude Code、Cursor、Codex、OpenCode 用的前端設計 skill，目標是讓 agent 一次產出不像 AI 套版的 landing page，並附一支在 8 種螢幕寬度實測的 lint 腳本。

## 作者與起源

Repo 掛在 Hassan El Mghari（GitHub `Nutlope`）名下，2026-04-27 建立，2026-10-22 最後 push。commit 主力是 Luffixos（282 commits），Nutlope 本人 12 commits，其餘 3 位各 1 commit，實際是兩人維護。官網 usehallmark.com。[mer.vin 2026-05 的介紹](https://mer.vin/x/hallmark-design-skill-anti-ai-slop-ui-for-claude-code-and-cursor-x/) 記錄當時只有 22 個主題，現在是 48 個，半年內主題庫翻倍。

## 核心架構 / 主要概念

- **48 份主題檔**：每份上限 8 KB、附預覽圖，`theme.mjs deal` 每次隨機抽 3 組讓 agent 挑
- **`sloplint.mjs --render`**：用 puppeteer-core 在 8 種寬度渲染頁面，抓 eyebrow label 堆疊、全大寫追蹤字、headline 彩字、空 placeholder、頁尾 newsletter 區塊等常見 AI 版面痕跡
- **`photos.json`**：索引 755 張 Wikimedia Commons 相片（只存連結與授權，排除 stock 圖庫）
- **三層規則**：floor（絕不出現）、reflex（可覆蓋但要記錄原因）、finish（收尾 polish）
- **流程**：讀專案既有字體與色票 → 抽主題 → 排版 → 先出 hero → 跑 sloplint → subagent 覆核
- **audit 模式**：`/hallmark audit` 只稽核既有頁面、不改原始碼

## 設計哲學

> "Anti-AI-slop design skill for Claude Code, Cursor, and Codex."

repo 描述只有這一句，立場是「先定義什麼不能出現」，再談美感。抽牌機制的用意是打斷模型每次都回到同一組字體與配色的傾向。

## 目標使用者與適用情境

- 用 coding agent 直接產 landing page、行銷頁的工程師
- 想替既有頁面做一次 AI 痕跡稽核的團隊（audit 模式）
- **不適用**：app 內部 dashboard、表單密集的產品 UI。主題庫偏行銷頁，README 沒有 product UI 模式

## 與類似專案的差異

| 對手 | 對方做法 | hallmark 的差異 |
|---|---|---|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 1 skill + 20 多個動詞指令，27 條 deterministic 規則加 LLM critique，分 brand / product 兩模式 | 走主題抽牌加瀏覽器實測，附相片庫；沒有 product UI 模式 |
| Anthropic 官方 frontend-design skill | 通用前端設計提示 | hallmark 多了可執行的 lint 與主題庫 |

選型：要改 app UI 選 impeccable；要一次做出風格有區隔的行銷頁選 hallmark。

## 外部評論

- [explainx.ai](https://explainx.ai/blog/nutlope-hallmark-anti-ai-slop-design-skill-july-2026)：拆解 48 主題加多階段 slop-test 的架構
- [The AI Leverage](https://theaileverage.beehiiv.com/p/top-5-claude-code-front-end-skills-3)：列入 Claude Code 前端 skill 前五名
- [mer.vin](https://mer.vin/x/hallmark-design-skill-anti-ai-slop-ui-for-claude-code-and-cursor-x/)：2026-05 版本記為 22 主題、65 道 pre-ship gate
- [claudskills.com](https://claudskills.com/skills/apply-an-anti-ai-slop-design-workflow-to-pages-components-audits/)：SKILL.md registry 收錄
- 未見 HN / Reddit 主串討論，資料不足

## Release 狀態 / 時間軸

- 2026-04-27 建 repo
- 2026-05 約 22 主題（依 mer.vin）
- 2026-10-22 最後 push，主題 48 個
- 2026-10-25 首次上 trending（+455 stars）
- 尚無 GitHub Release，安裝走 `npx skills add` 拉 main 分支

## 授權與社群

- 授權：MIT
- Stars 32,702 / Forks 1,689 / Subscribers 65 / Open issues 49
- 主語言：CSS
- 貢獻者 5 位，Luffixos 與 Nutlope 合計佔 294 / 297 commits
- 今日增長率 1.39%（+455 / 32,700）

## 資料來源

- **本體**：[GitHub repo](https://github.com/Nutlope/hallmark)、usehallmark.com
- **第三方評論**：[explainx.ai](https://explainx.ai/blog/nutlope-hallmark-anti-ai-slop-design-skill-july-2026)、[The AI Leverage](https://theaileverage.beehiiv.com/p/top-5-claude-code-front-end-skills-3)、[mer.vin](https://mer.vin/x/hallmark-design-skill-anti-ai-slop-ui-for-claude-code-and-cursor-x/)、[claudskills.com](https://claudskills.com/skills/apply-an-anti-ai-slop-design-workflow-to-pages-components-audits/)
- **同類工具**：[pbakaus/impeccable](https://github.com/pbakaus/impeccable)

## 更新紀錄
