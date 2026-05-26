---
title: "深度解析系列：obra/superpowers"
description: "拆解 obra/superpowers 的架構、設計理念、14 個 skill 如何運作，以及 skill 開發者必懂的 TDD 寫作方法論——分兩 Part，先用戶後開發者。"
permalink: /series/superpowers/
series: superpowers-deepdive
target_repo: obra/superpowers
based_on_version: v5.1.0
parts:
  - { id: 1, name: "重度用戶篇", episodes: "Ep.1–Ep.7", audience: "想用 superpowers 的 Claude Code 重度用戶" }
  - { id: 2, name: "Skill 開發者篇", episodes: "Ep.8–Ep.12", audience: "想自己寫 skill 並驗證可用的開發者" }
status: drafting
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

# 深度解析：[obra/superpowers](https://github.com/obra/superpowers)

這個系列把 [obra/superpowers](https://github.com/obra/superpowers) 從外觀拆到內部，分兩 Part：

- **Part 1（Ep.1–7）重度用戶篇**：看懂自己每次叫 Claude Code 做事時，背後這套外掛到底如何介入、為什麼這樣設計、怎麼配合才不會撞牆。
- **Part 2（Ep.8–12）Skill 開發者篇**：拆 superpowers 自己的方法論祕密——**寫 skill 就是 process documentation 的 TDD**。從 pressure test scenario 設計、rationalization 表蒐集，到 CSO 與 subagent 驗證流程，完整走一遍如何寫出一個經得起壓力的 skill。

本系列以 v5.1.0 為基準。日後重大版本變動會在勘誤區記錄。

## 為什麼寫這系列

Superpowers 是 2026 年 [GitHub Trending 榜上最持續的 AI agent 方法論外掛](/github-top-10/)之一。從 4 月首登到 5 月超過 20 萬 stars，作者 Jesse Vincent 的核心主張不變：**AI coding agent 不能跳進去就寫碼**。但「強制紀律」要怎麼用 markdown + hook 灌進一個只會聊天的 LLM？這就是這系列要拆的事。

讀完 7 集你應該能：

- 看見自己 session 裡每個提示、每個 gate、每個 review 是哪個 skill 觸發
- 判斷一個 skill 何時該用、何時是 overhead、什麼時候被誤觸
- 在跑歪時知道從哪個環節接管
- 評估要不要把 superpowers 引入團隊、引入後怎麼客製

## 讀者預設

### Part 1：重度用戶
- 每天用 Claude Code（或 Cursor / Codex / Gemini）寫 production code
- 熟悉 git workflow：worktree、rebase、branch lifecycle 不需要教
- 不必懂 Anthropic SDK 內部，但理解 prompt 工程基本概念
- 想從「會用」走到「會解釋」，能向團隊說明這套外掛在做什麼

### Part 2：Skill 開發者
- 已經是 Part 1 的重度用戶，想動手寫自己的 skill
- 或正在維護內部 plugin / agent framework，想學 superpowers 的紀律強制術
- 想理解「為什麼 prompt engineering tutorial 大多 untestable」、想要可驗證的方法論

## Part 1：重度用戶篇（Ep.1–7）

| 集數 | 主題 | 涵蓋 skill | 狀態 |
|---|---|---|---|
| Ep.1 | 為什麼需要 superpowers | — | 規劃 |
| Ep.2 | 架構解剖：一個 Skill 怎麼被觸發 | 全系統機制 | 規劃 |
| Ep.3 | 流程主幹：brainstorm → plan → execute | brainstorming、writing-plans、executing-plans | 規劃 |
| Ep.4 | 紀律三件套：TDD / Verification / Debugging | test-driven-development、verification-before-completion、systematic-debugging | 規劃 |
| Ep.5 | 並發與隔離 | using-git-worktrees、dispatching-parallel-agents、subagent-driven-development | 規劃 |
| Ep.6 | Review 雙環與 branch 收尾 | requesting-code-review、receiving-code-review、finishing-a-development-branch | 規劃 |
| Ep.7 | 元層：自我繁殖的 superpowers | using-superpowers、writing-skills | 規劃 |

### Ep.1 — 為什麼需要 superpowers：問題、人、設計理念

AI agent 跳進去就寫碼的失敗模式。作者 Jesse Vincent 與 Prime Radiant 的觀察：把資深工程師紀律灌進 agent。三大設計支柱（強制性、可組合、自觸發）。v1 → v5.1 演進線。對照 [BMad-Code/BMAD-METHOD](https://github.com/BMad-Code/BMAD-METHOD) 與 [anthropics/skills](https://github.com/anthropics/skills) 的路線差異。

**重度用戶能拿走什麼**：判斷自己是否需要強制紀律層、何時 superpowers 是 overhead。

### Ep.2 — 架構解剖：一個 Skill 在 runtime 怎麼被觸發

`plugin.json` / `SKILL.md` frontmatter 結構。description 為什麼是「Use when…」句型——它就是 router。`skills/<name>/` 內部解剖：references/、scripts/、examples/、SKILL.md 各自角色。`hooks/` 與 `scripts/` 怎麼把 markdown 變成 enforceable gate。Skill 之間的鏈式調用：為什麼 `using-superpowers` 是 SessionStart 必經入口。主 agent ↔ subagent 的職責切割。

**重度用戶能拿走什麼**：看懂 session 開頭那段 system-reminder、知道某個 skill 為什麼沒被觸發、判斷自己的提示是否撞到 description 觸發語。

### Ep.3 — 流程主幹（上）：brainstorm → plan → execute

`brainstorming`：HARD-GATE 用 markdown 強制「設計未批准前不准寫碼」。`writing-plans`：任務切到 2–5 分鐘細粒度。`executing-plans`：plan 即 todo、progress 顯式可見、與 TodoWrite 整合。三個 skill 互相 invoke 的銜接 contract。

**重度用戶能拿走什麼**：知道何時 brainstorming 是必要、何時可以跳過、plan 顆粒度該怎麼讀。

### Ep.4 — 紀律三件套：TDD / Verification / Debugging

`test-driven-development`：RED-GREEN-REFACTOR 為什麼要強制刪除「先寫的 code」。`verification-before-completion`：完成前 hard gate 的設計。`systematic-debugging`：bug 為什麼要走方法論而非直覺修。三者為什麼分開不合一。

**重度用戶能拿走什麼**：判斷 agent 在 TDD 時為什麼「倒退」是設計、什麼時候 verification 在過度檢查。

### Ep.5 — 並發與隔離：worktree / subagent / parallel

`using-git-worktrees`：為什麼用 worktree 取代 branch 切換。`dispatching-parallel-agents`：fan-out / fan-in pattern。`subagent-driven-development`：把獨立任務切給子 agent 的契約。隔離（isolation）在 agent 系統中的工程意義。

**重度用戶能拿走什麼**：worktree 散落時怎麼收、subagent 任務拆解的判準、避免 context 污染的策略。

### Ep.6 — Review 雙環與 branch 收尾

`requesting-code-review`：subagent 兩段式審查的設計。`receiving-code-review`：critical issue 真正阻擋進度的 enforcement。`finishing-a-development-branch`：branch lifecycle 完整收尾。為什麼 review 要拆 request/receive 兩個 skill。

**重度用戶能拿走什麼**：知道 agent 卡在 review 是 by design 還是失控、branch 收尾每一步在驗什麼。

### Ep.7 — 元層：自我繁殖的 superpowers

`using-superpowers` 拆解：紅旗清單、優先順序、為什麼是 router。`writing-skills`：作者教你寫 skill 的 skill，meta 程度多高。三層優先序（user > superpowers > system prompt）的政治意義。

**重度用戶能拿走什麼**：要不要寫自己的 skill、寫了之後怎麼讓它和 superpowers 共存。

**走到這裡你會發現一個更深的問題**：作者怎麼確定他寫的 skill 真的能讓 agent 守紀律？線索藏在 `skills/<name>/` 內 `test-pressure-*.md` 這些檔——那是真正的「壓力測試案例」。如果你有興趣動手寫，Part 2 從這裡接著拆。

---

## Part 2：Skill 開發者篇（Ep.8–12）

| 集數 | 主題 | 拆解對象 | 狀態 |
|---|---|---|---|
| Ep.8 | Skill 即 TDD：寫 skill 的元方法論 | `writing-skills`、`test-driven-development` 對照 | 規劃 |
| Ep.9 | Pressure Test 拆解：scenario 檔的設計 | `systematic-debugging/test-pressure-*.md`、`test-academic.md` | 規劃 |
| Ep.10 | Rationalization 表：抓出 agent 的真實藉口 | skill 內 counter-table / 紅旗清單的生成 | 規劃 |
| Ep.11 | CSO：讓 skill 在 1024 字以內被找到 | description、命名、token 預算 | 規劃 |
| Ep.12 | 驗證 skill 可用：subagent 測試完整流程 | RED→GREEN→REFACTOR end-to-end | 規劃 |

### Ep.8 — Skill 即 TDD：寫 skill 的元方法論

「process documentation 也能 TDD」這個反直覺的主張。RED-GREEN-REFACTOR 對應到 skill 寫作：baseline test 是 RED、skill 本文是 GREEN、堵 rationalization 是 REFACTOR。「沒看到 agent 失敗就不能寫 skill」這個 Iron Law。對照一般 prompt engineering tutorial 為什麼是 untestable。

**開發者能拿走什麼**：理解為什麼憑感覺寫 prompt template 與寫 skill 是兩件事；學會「先讓 agent 失敗一遍」的紀律。

### Ep.9 — Pressure Test 拆解：scenario 檔的設計

逐一拆 `skills/systematic-debugging/` 的測試檔：

| 測試檔 | 壓力組合 | 想驗什麼 |
|---|---|---|
| [test-academic.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-academic.md) | 純理解 | 知識 vs 執行的落差 |
| [test-pressure-1.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-pressure-1.md) | 時間 + 金錢 + 權威 | 走捷徑誘惑（production down、$15k/min） |
| [test-pressure-2.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-pressure-2.md) | （Ep.9 內補拆解） | （補拆解） |
| [test-pressure-3.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-pressure-3.md) | （Ep.9 內補拆解） | （補拆解） |

壓力類型分類：時間 / 沉沒成本 / 權威 / 疲勞 / 社會壓力。為什麼要疊加多種壓力而不是單一壓力測。A/B/C 選項設計——為什麼提供「妥協 C」是關鍵陷阱。

**開發者能拿走什麼**：能自己為自己寫的 skill 設計可重複的壓力測試。

### Ep.10 — Rationalization 表：抓出 agent 的真實藉口

baseline test 怎麼跑（沒有 skill 時 dispatch subagent）。怎麼收集 agent verbatim 的辯解語句。把藉口轉成 skill 內 counter-table 的格式。紅旗清單（Red Flags）的生成方式。「Spirit vs Letter」這類辯解必須在 skill 前段就堵掉的理由。

**開發者能拿走什麼**：一份可複用的「rationalization 蒐集 → counter 設計」工作流。

### Ep.11 — CSO（Claude Search Optimization）：讓 skill 被正確找到

description = router，不是 summary。為什麼 description 不能 summarize workflow（會讓 agent 跳過正文）。命名守則：active voice、動詞優先、gerund 句型。Token 預算：getting-started < 150 字、其他 < 500 字。關鍵字覆蓋：error message、症狀同義詞、工具名。

**開發者能拿走什麼**：寫得出讓 Claude 在對的時機載入、又不爆 token 的 skill description。

### Ep.12 — 驗證 skill 可用：subagent 測試完整流程

subagent dry-run 怎麼跑、怎麼判斷一個 skill「真的有效」（compliance rate）、持續迭代：發現新 rationalization 怎麼回頭改 skill。end-to-end minimal walkthrough：從 baseline 失敗到 skill GREEN 的完整一輪。把 skill 提交回 [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) 的注意點。

**開發者能拿走什麼**：一條可重複的「寫 → 測 → 改 → 發佈」流程，能套用在自己的 plugin 開發。

## 概念地圖

```
                     使用者請求
                         │
                         ▼
              [using-superpowers]  ← SessionStart 必經
                         │ (route by description)
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
  [brainstorming]   [systematic-     [writing-skills]
        │            debugging]            │
        ▼                                  │
  [writing-plans]                          │
        │                                  │
        ▼                                  │
  [executing-plans]──┬───────────────────  │
        │            │                     │
        ▼            ▼                     │
  [TDD] ──── [using-git-worktrees]         │
        │            │                     │
        │            ▼                     │
        │   [dispatching-parallel-agents]  │
        │   [subagent-driven-development]  │
        ▼                                  │
  [verification-before-completion]         │
        │                                  │
        ▼                                  │
  [requesting-code-review]                 │
        │                                  │
        ▼                                  │
  [receiving-code-review]                  │
        │                                  │
        ▼                                  │
  [finishing-a-development-branch]         │
                                           │
                       元層 ────────────────┘
```

## 版本對應

| 章節 | superpowers 版本 |
|---|---|
| Ep.1–Ep.7 初稿（Part 1） | v5.1.0（2026-05 當期） |
| Ep.8–Ep.12 初稿（Part 2） | v5.1.0（2026-05 當期） |

當 superpowers 出現 minor / major 跳版時，會在這裡標註對應集數的勘誤或補集。

## 相關連結

- 趨勢觀察：[obra/superpowers 的逐日上榜紀錄]({{ site.baseurl }}{% link research/obra__superpowers.md %})
- 上游：[obra/superpowers](https://github.com/obra/superpowers)
- Marketplace：[obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace)
- 實驗場：[obra/superpowers-lab](https://github.com/obra/superpowers-lab)

## 寫作筆記與勘誤

（暫無，待後續補。）
