---
layout: post
title: "深度解析 superpowers Ep.5：worktree 為什麼比 branch 切換更適合 agent"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 1
episode: 5
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想用 superpowers 的 Claude Code 重度用戶"
related_skills: [using-git-worktrees, dispatching-parallel-agents, subagent-driven-development]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.4 講的是單線推進時用什麼 skill 把 agent 拉住：TDD、verification、systematic-debugging。但 Claude Code session 跑久了會出現另一種失控：你叫 agent 做 A 任務，它先跑去看了 B 任務的檔案，回來時 working tree 已經被改過，context 裡塞滿了不相干的程式碼片段。這就是 Ep.1 那張失敗表裡第 3 種「context 污染」。

並發在這套外掛裡不是為了把事情做得更快——是為了把工作切到互不污染的盒子裡。這集拆三個跟「隔離」直接相關的 skill：`using-git-worktrees` 管檔案層、`subagent-driven-development` 管 context 層、`dispatching-parallel-agents` 管「多個獨立失敗」的分派。看完你會知道為什麼這三件事在 superpowers 裡是分開的 skill，以及踩到 worktree 散落、subagent 沒收回、parallel agent 卡住時分別該從哪裡查。

## using-git-worktrees：先偵測，再建立

[using-git-worktrees](https://github.com/obra/superpowers/blob/main/skills/using-git-worktrees/SKILL.md) 的 description 寫得很直白：「Use when starting feature work that needs isolation from current workspace」。但這個 skill 真正有意思的地方不是「建立 worktree」，是它在建立之前先做的一件事——**偵測你是不是已經在 worktree 裡了**。

v5.1.0 把這段邏輯改寫過。SKILL.md 的 Step 0 給的指令是：

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
```

`GIT_DIR != GIT_COMMON` 就代表你身在一個 linked worktree。skill 接著做一道 submodule guard——因為 submodule 也會讓這兩個路徑不同，必須排除掉再下判斷。這個 detect-first 設計在重度用戶這邊有具體後果：你叫 agent 去新分支實作功能時，它不會盲目跑 `git worktree add`，而是先看看你是不是已經在 IDE 的 worktree session 裡。SKILL.md 的 Red Flags 區甚至把這條列為「#1 mistake」：有 native worktree 工具（例如 harness 提供的 `EnterWorktree`）卻硬跑 `git worktree add`，會製造 harness 看不見的 phantom state。

實際工作流長這樣：用戶請 agent 開一個新功能 → skill 跑 detect → 沒在 worktree 裡 → 問用戶要不要建（除非已經有指示）→ 優先用 native 工具 → 沒有的話 fallback 到 `git worktree add` → 預設放在 `.worktrees/`（必須先 `git check-ignore` 驗證已 ignore，沒 ignore 就先補進 `.gitignore` 並 commit）→ 跑 setup → 跑 baseline test → 確認綠燈才開始實作。

這套流程的價值不在快，在於每一個分歧都把你會踩到的坑寫在 SKILL.md 裡：sandbox 阻擋建立怎麼 fallback 留原地、`.worktrees/` 與 `worktrees/` 都存在時誰優先、legacy 全域路徑 `~/.config/superpowers/worktrees/$project` 怎麼維持向下相容。重度用戶看 session log 時，這些步驟會以「I'm using the using-git-worktrees skill to set up an isolated workspace.」開頭——這句宣告本身也是 skill 強制的，方便你判斷現在在哪一步。

worktree 散滿地是常見的後續問題。SKILL.md 沒寫清理流程，那是 `finishing-a-development-branch` 的事（Ep.6 細講）。短期內你可以靠 `git worktree list` 看清還剩什麼、`git worktree prune` 收掉孤兒紀錄，但真正的回收動作要等 branch 收尾 skill 主導。

## subagent-driven-development：fresh subagent per task

[subagent-driven-development](https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md) 講的是「在同一個 session 裡執行 plan，每個任務派一個新的 subagent」。SKILL.md 的核心句子寫得很清楚：

> Fresh subagent per task + two-stage review (spec then quality) = high quality, fast iteration

這跟一般用戶想像的 subagent 不太一樣。多數人以為 subagent 是「拿來跑大型搜尋的工具」，但這個 skill 把 subagent 當成**執行紀律的單位**——每個 plan task 派一個 fresh subagent 進來實作，完成後不留 context；接著再派一個 spec reviewer subagent 檢查程式碼有沒有對齊 spec；通過後再派一個 code quality reviewer subagent 檢查程式品質；兩道 review 都過了才 mark complete，繼續下一個 task。

為什麼要這樣切？SKILL.md 給的理由是「You delegate tasks to specialized agents with isolated context」——主 agent 的 context 拿來做協調（讀 plan、curate context、整合結果），實作細節留在 subagent 裡用完即拋。這對應到 Ep.1 那張表的「context 污染」失敗：主 agent 如果自己下海實作 5 個 task，session 結束時它的 context 裡會混雜這 5 個 task 的所有試錯紀錄，後面再叫它判斷時就會被前面的雜訊干擾。

實戰上要注意 SKILL.md 在 Red Flags 區明文禁止的幾件事：
- **不要平行派多個 implementer subagent**（會撞檔案）——parallel 是 `dispatching-parallel-agents` 的場域，不是這個 skill 的。
- **不要讓 subagent 自己去讀 plan 檔**——主 agent 必須把 task 全文 + scene-setting context 直接塞給 subagent。
- **不要跳過 review loop**——reviewer 找到問題就讓同一個 implementer subagent 修，修完再 review，不能「差不多就好」。
- **Spec compliance review 必須在 code quality review 之前**——順序顛倒會檢查到不對的東西。

SKILL.md 還列了 4 種 implementer 回傳的 status：`DONE`、`DONE_WITH_CONCERNS`、`NEEDS_CONTEXT`、`BLOCKED`。BLOCKED 的處置分支寫得最細：先判斷是 context 不夠（補 context 重派）、推理不夠（換更強的 model 重派）、任務太大（拆小）、還是 plan 本身錯（escalate 給人）。「Never force the same model to retry without changes」這句是用來防止 agent 陷入無限迴圈的——這也是重度用戶最容易在 session 卡住時忽略的。

最後一個重要約束來自 SKILL.md 的 Continuous execution 段：

> Do not pause to check in with your human partner between tasks. ... "Should I continue?" prompts and progress summaries waste their time

也就是說，一旦你下令 agent 跑 subagent-driven-development，它應該一路把 plan 跑完才停，中間不要彈出「下一個 task 要繼續嗎」這種沒意義的 prompt。如果你發現 agent 在每個 task 中間停下來等你按 Enter，那是它沒守住這個 skill 的條款，可以直接指出來。

## dispatching-parallel-agents：fan-out / fan-in 限定獨立失敗

[dispatching-parallel-agents](https://github.com/obra/superpowers/blob/main/skills/dispatching-parallel-agents/SKILL.md) 跟上一個 skill 很容易混淆，但 description 已經劃清界線：「Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies」。重點在 **independent** 跟 **without shared state**。

SKILL.md 給的典型場景是「6 個測試失敗散在 3 個檔案、3 個 root cause 互不相關」。這時候逐個 debug 是浪費——每個 root cause 在自己的 domain 裡，互看不到對方也能修好。skill 給的 dispatch 範本長這樣：

```
Agent 1 → Fix agent-tool-abort.test.ts
Agent 2 → Fix batch-completion-behavior.test.ts
Agent 3 → Fix tool-approval-race-conditions.test.ts
```

跟 `subagent-driven-development` 的差別在於：那個 skill 是**順序執行 plan tasks**，每個 task 一個 fresh subagent；這個 skill 是**同時派多個 agent 解獨立問題**，沒有 spec / quality review 兩段式。SKILL.md 在「When NOT to Use」段把禁區寫得很死：

- 失敗其實相關（修一個可能修好其他）
- 需要看整個系統狀態才能理解
- 探索性 debug（你連壞在哪都還不知道）
- 共享狀態（agents 會撞同一個檔案）

如果你誤用，會發生的情況是：3 個 agent 都改了 `package.json`、回來時 merge 不掉；或 agent A 修了一個 race condition 結果 agent B 那邊的 test 反而過了，但你已經派 agent B 去改實作了。

「parallel agent 卡其中一個」是用過 fan-out 都會遇到的場景。SKILL.md 沒給卡住的 recovery，但 Agent Prompt Structure 那段給出預防的線索：每個 agent prompt 必須 focused（單一 problem domain）、self-contained（不需要 session 歷史）、specific about output（要回傳什麼明確寫死）。換句話說，agent 會卡通常是 prompt 沒寫清楚 fan-in 要的 output 格式——它做完不知道要怎麼回報才算完成。回去看 agent 拿到的 prompt 是不是缺了「Return: Summary of what you found and what you fixed.」這種末段指令，多半就找到根因。

SKILL.md 在 Verification 段還補了一條 fan-in 之後的義務：「Spot check - Agents can make systematic errors.」三個獨立 agent 可能犯同一種錯（例如都用了同樣的 anti-pattern 來 fix test），整合完跑全套測試只是必要條件，不是充分條件，主 agent 還要抽看 diff。

## 三層隔離的取捨

| 層級 | 對應 skill | 隔離邊界 | 主要失效模式 | 復原路徑 |
|---|---|---|---|---|
| 檔案層 | `using-git-worktrees` | working tree、branch state | worktree 散落、`.gitignore` 漏設、sandbox 阻擋建立 | `git worktree list` / `prune`、`finishing-a-development-branch` |
| Context 層 | `subagent-driven-development` | subagent 拿到的 prompt + 工具呼叫 | 主 agent 直接下海實作而非分派、subagent 互讀 plan 檔 | 把 task 全文塞回 subagent 重派、明確 status 處置 |
| 失敗分派層 | `dispatching-parallel-agents` | 獨立 problem domain | 誤把相關失敗 fan-out、prompt 沒寫 output 格式 | 改回單 agent 連看、把 fan-in 條件寫死 |

這三層在 superpowers 裡刻意分成三個 skill，而不是合成一個「並發 skill」，是因為觸發語句不一樣。`using-git-worktrees` 的觸發是「開新功能」、`subagent-driven-development` 的觸發是「執行已寫好的 plan」、`dispatching-parallel-agents` 的觸發是「多個獨立失敗」。Ep.2 講的 description = router 在這裡很實際：你的指令措辭直接決定誰被載入，混在一起會讓 router 失準。

## 重度用戶的實戰守則

幾條從 SKILL.md 文本可以直接抽出的可操作守則：

- session 一開始如果想叫 agent 進獨立工作區，明說「set up an isolated worktree」之類的字眼——它對應到 `using-git-worktrees` 的 description 觸發詞「starting feature work that needs isolation」。
- 看到 agent 宣告「I'm using the using-git-worktrees skill...」就確認下一步是 Step 0 detect，不是直接 `git worktree add`——後者代表它跳過了 detect。
- 給 agent plan 之後請它用 `subagent-driven-development` 跑，不要自己手動 dispatch——這樣 spec / quality 兩段 review 是 by skill 強制的，不會被省。
- 看到 agent 在 task 之間問「要繼續嗎」，可以直接引述 SKILL.md 的 Continuous execution 段叫它繼續。
- 有多個獨立 test 失敗時明確說「these are independent」，免得它誤觸 `subagent-driven-development`（那是順序執行的）而非 `dispatching-parallel-agents`。
- worktree 散落時，先 `git worktree list`，再判斷哪些可以 `git worktree remove`——不要直接砍目錄，會留 phantom state，Ep.6 會講 `finishing-a-development-branch` 的正規收尾。

## 下集預告

並發處理完，下一集回到「品質怎麼被守住」這條主軸：`requesting-code-review` 與 `receiving-code-review` 為什麼要拆兩個 skill、critical issue 怎麼變成真的阻擋進度的 gate、`finishing-a-development-branch` 怎麼把 worktree、commit、PR 一路收乾淨。
