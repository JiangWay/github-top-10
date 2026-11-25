---
repo: elementalsouls/Claude-BugHunter
first_seen: 2026-11-26
last_updated: 2026-11-26
appearances: [2026-11-26]
growth_appearances: [2026-11-26]
has_releases: true
latest_release: v2.1
tags: [資安, Skill 外掛]
domain: 資安
form: Skill 外掛
themes: []
---

# [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)

> 研究日期：2026-11-26
> 研究來源：https://github.com/elementalsouls/Claude-BugHunter
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)（套件名 `claude-bughunter`）是給 Claude Code 用的 skill 套件，內含 84 個 skill、15 個 slash command，以及從 681 份已公開的 bug bounty 報告整理出的 24 類漏洞偵測模式，用於 bug bounty 與外部紅隊工作。

**立場：攻擊面（offensive security），限授權範圍使用。** 它教 agent 怎麼找漏洞、串攻擊鏈、寫報告，不是防禦或偵測工具。repo description 自述範圍是「bug hunting and external red-team work」。

## 作者與起源

作者 Sachin Sharma（GitHub `elementalsouls`，個人帳號，2019-04 註冊，41 個公開 repo、737 followers），bio 寫「Offensive Security Engineer | Adversary Simulation」，同時在研究 AI red teaming 與 LLM 安全。

repo 建於 2026-05-05，截至 2026-11-25 有約 369 個 commit、19 位 contributor。commit 數最多的三位是 github-actions bot（105）、injectifytest（93）、作者本人（92），第四位 rudycelekli 有 55 筆，社群貢獻佔比不低。

README 的自述動機：單一的「security」大 prompt 太泛，收藏 30 份報告每次重讀又不成規模。套件據稱在一次 bug bounty 與一次外部紅隊案中補出缺口（假設驗證紀律、各平台報告策略、證據去識別等），這些案例細節資料不足，無法獨立驗證。

## 核心架構 / 主要概念

repo 目錄有 `skills/`、`commands/`、`engine/`、`cbh/`、`mcp/`、`eval/`、`tests/`，語言組成為 Python 約 90%、PowerShell 約 5%、Shell 約 4.5%（651,143／39,419／32,296 bytes）。四層結構：

- **Think**：`bb-methodology`、`redteam-mindset`，定義 5 階段非線性流程。
- **Hunt webapps**：58 個 `hunt-*` skill，每類漏洞一個，含 payload、繞過表與攻擊鏈範本。
- **Hit the perimeter**：10 個企業平台 skill（M365/Entra、Okta、vCenter、SSL VPN 設備、SharePoint、雲端 IAM、APK 紅隊）。
- **Ship it**：`triage-validation` 的「7-Question Gate」（含 Q3 資產是否在 scope）、`evidence-hygiene`、各平台報告 skill。

skill 依主題自動載入，不必指名呼叫。另有三個執行元件：`engine/` 是確定性的 engagement 引擎，負責畫攻擊面並把 finding 派給對應 skill；`cbh` 是可用 `pipx` 單獨安裝的 CLI（含 `cbh scope import`，從 HackerOne、Bugcrowd、Intigriti、YesWeHack 的公開 scope 產生 `scope.md`）；`mcp/hackerone/` 是 HackerOne MCP server，查重複報告與 program scope，帳號 token 可留空。

跨 harness：同一份 `SKILL.md` 可裝到 Claude Code、OpenCode、OpenAI Codex CLI、Hermes Agent、Google AntiGravity，但 slash command 與 `/hunt` 引擎僅限 Claude Code。

## 設計哲學

README 的 Scope 段明講「不做什麼」：

> "Out of scope (deliberate — not gaps, design decisions)"

內部 Active Directory 攻擊（Kerberoasting、DCSync 等）、C2 框架、後滲透與持久化、AV/EDR 規避，一律排除，只做網際網路可達的外部攻擊面。`SECURITY.md` 另外把「對未授權目標武器化 0-day」「惡意程式開發」「大規模掃描」列為套件不涵蓋範圍，並規定驗證閘遇到越界時預設走 `DOWNGRADE` 或 `CHAIN REQUIRED`，不會要求「再往下利用以證明」。

另一條主張在 CHANGELOG（Unreleased 段）：engine 的跨 engagement 記憶體預設關閉，需 `--use-memory` 才寫入，避免在客戶案中把 hostname、URL 混進同一個帳本。這是套件對資料隔離的具體取捨。

## 目標使用者與適用情境

適用：持有 HackerOne、Bugcrowd 等平台 in-scope 資產的賞金獵人、有簽 RoE 的滲透測試與外部紅隊人員、CTF 與自有基礎設施的測試者。

不適用：要做內網橫向移動、AD 攻擊、C2 的團隊（README 自己寫「this bundle won't help you in those phases」）；以及沒有書面授權的人。

另有一個實務限制：README 警告 Anthropic 的即時 cyber safeguards 預設會擋「漏洞利用或攻擊工具開發」類請求，即使有授權也可能被拒，建議申請 Anthropic 的 Cyber Verification Program。Opus 5 上部分高風險 cyber 請求會自動降到 Opus 4.8。

## 與類似專案的差異

| 對手 | 本專案的差異 | 什麼時候選誰 |
|---|---|---|
| [shuvonsec/claude-bug-bounty](https://github.com/shuvonsec/claude-bug-bounty)（Tessl 列出約 1,214 stars，數字取自 [Tessl 列表](https://tessl.io/registry/skills/github/shuvonsec/claude-bug-bounty)） | Claude-BugHunter 的 skill 數更多（84 個），且含企業平台與紅隊報告層、`cbh` CLI、scope importer；對手體量較小 | 只做賞金獵人、想要精簡套件選對手；要涵蓋 M365、VPN 設備等外部紅隊選本專案 |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) 搭自寫 security prompt | 本專案把 681 份報告整理成可觸發的 per-class skill，附驗證閘與 scope 檢查；自寫 prompt 無這些結構 | 單次小任務自寫 prompt 即可；長期多目標作業用本專案 |

兩個對手的 stars 與功能清單未逐項實測，比較以 README 與第三方列表的自述為準。

## 外部評論

查詢 HN、Reddit 皆未見顯著討論串，資料不足。已查：WebSearch「Claude-BugHunter elementalsouls」與「claude-bughunter … Hacker News OR Reddit OR blog」。以下為查得的第三方頁面，多數屬目錄或介紹文：

- [DEV Community：Claude-BugHunter 介紹文](https://dev.to/techlatestnet/claude-bughunter-the-open-source-ai-security-agent-that-turns-claude-code-into-a-bug-bounty-4n7h)：把它描述成接進 Claude Code 的開源 skill 套件，文中 skill 數寫 51，與 repo 現況（84）不一致，屬舊數字。
- [The Menon Lab 部落格](https://themenonlab.blog/blog/claude-bughunter-ai-security-testing-skills/)：標題寫 83 個 skill，介紹偏安裝與功能導覽。
- [Tessl registry：安全分析頁](https://tessl.io/registry/skills/github/elementalsouls/Claude-BugHunter/bug-bounty/security)：標為 Audited 並附 Snyk 分析；搜尋摘要稱其中有一則 Medium 發現，指 `bug-bounty` SKILL.md 含「覆寫使用者或自身指令」的字句，可能是範例或 code block 內容的誤判，我未開頁核實。
- [explainx.ai 介紹](https://explainx.ai/blog/claude-bughunter-red-team-skills-bug-bounty-github-install-2026)、[undercodetesting 介紹](https://undercodetesting.com/claude-bughunter-the-ai-powered-bug-bounty-arsenal-that-turns-claude-code-into-a-senior-security-researcher-video/)：同屬介紹與安裝導覽，內容我未逐篇讀完，不引用其論點。

**Responsible disclosure 狀態**：`SECURITY.md` 有授權使用立場與排除項目，這份文件主要談使用範圍；針對套件自身漏洞的通報流程與聯絡方式，我未讀到完整段落，資料不足。

**被濫用風險**：套件內容含 payload、繞過表與 CVE 攻擊鏈，授權閘靠 skill 提示與 7-Question Gate，屬提示層約束，無技術性強制。外部 SSL VPN 與 M365 的攻擊鏈對未授權使用者同樣有效，這是自述排除項目與實際可被拿去用之間的落差。

## Release 狀態 / 時間軸

有 2 個 GitHub Release，最新為 v2.1。

| 日期 | 事件 |
|---|---|
| 2026-05-05 | 建立 repo |
| 2026-05-25 | [v2.0](https://github.com/elementalsouls/Claude-BugHunter/releases/tag/v2.0)：report-curation、5 個新增攻擊面、攻擊鏈、engagements |
| 2026-06-05 | [v2.1](https://github.com/elementalsouls/Claude-BugHunter/releases/tag/v2.1)：社群 skill、CI gate、資安修補 |
| 2026-11-24 | 新增 `exploit-completion` skill（83→84）、engine 預設資料隔離、GitHub Pages 終端風格頁 |
| 2026-11-26 | 進絕對榜 #1，單日 +1,644 stars |

v2.1 之後約半年沒再發 release，改動留在 `main` 的 Unreleased 段，11 月仍有每日 commit。

## 授權與社群

- 授權：MIT；另有 `LICENSE-CONTENT`（CC BY 4.0，涵蓋 skill 方法論、wordlist、文件）與 `NOTICE`（上游 skill 歸屬，含 8 個 vendored）。
- 22,578 stars、2,323 forks、20 open issues、19 contributors。
- 增長：建 repo 約 205 天，平均每日約 110 stars；今日 +1,644，是平均值的約 15 倍，growth_rate 7.28%。
- topics：`bug-bounty`、`claude-code`、`claude-skills`、`offensive-security`、`red-team`、`hackerone`、`pentesting` 等 16 個。
- 贊助：README 列 ApiSmart、ThreatWatch360。

## 資料來源

**本體**
- [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)（`gh api` repo、languages、contributors、releases、tags、commits、README、SECURITY.md、CHANGELOG.md）
- [官方 GitHub Pages](https://elementalsouls.github.io/Claude-BugHunter)
- [v2.0](https://github.com/elementalsouls/Claude-BugHunter/releases/tag/v2.0)、[v2.1](https://github.com/elementalsouls/Claude-BugHunter/releases/tag/v2.1)

**第三方評論**
- [DEV Community](https://dev.to/techlatestnet/claude-bughunter-the-open-source-ai-security-agent-that-turns-claude-code-into-a-bug-bounty-4n7h)
- [The Menon Lab](https://themenonlab.blog/blog/claude-bughunter-ai-security-testing-skills/)
- [Tessl registry](https://tessl.io/registry/skills/github/elementalsouls/Claude-BugHunter)
- [explainx.ai](https://explainx.ai/blog/claude-bughunter-red-team-skills-bug-bounty-github-install-2026)
- [undercodetesting](https://undercodetesting.com/claude-bughunter-the-ai-powered-bug-bounty-arsenal-that-turns-claude-code-into-a-senior-security-researcher-video/)

**同類工具**
- [shuvonsec/claude-bug-bounty](https://github.com/shuvonsec/claude-bug-bounty)
- [anthropics/claude-code](https://github.com/anthropics/claude-code)

## 更新紀錄
