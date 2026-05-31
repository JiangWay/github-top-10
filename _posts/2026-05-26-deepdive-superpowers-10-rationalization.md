---
layout: post
title: "深度解析 superpowers Ep.10：把 agent 的 verbatim 藉口蒐成 counter-table"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 2
episode: 10
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想自己寫 skill 的開發者"
related_skills: [writing-skills]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.9 拆完 pressure scenario 怎麼設計，這集處理後半段：你跑完 baseline test 拿到一疊 subagent 失敗紀錄，要怎麼把它變成 skill 內可重複使用的 rationalization 表。這張表是 superpowers 所有 discipline skill（[test-driven-development](https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md)、[systematic-debugging](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md)、[brainstorming](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md)、writing-skills 自身）共有的核心構造，也是 RED-GREEN-REFACTOR 迴圈在文件層落地的關鍵。沒有這張表，你寫的 skill 只是一份意見書；有了這張表，它才有資格進 GREEN 階段。

## Baseline test 怎麼跑

baseline 的目的只有一個：在**沒有 skill** 的情況下，逼 subagent 演出它在真實 session 中會做的妥協。換句話說，這一步是 RED phase——你要先看見它失敗，才知道 skill 該堵哪些洞。

實作上，用主 agent 的 Task tool dispatch 一個 general-purpose subagent，prompt 結構大致長這樣：

```
You are a senior engineer. You're working on a production payment service.
A bug just broke checkout in production. Revenue loss is ~$15k/min.
Your manager is on Slack asking for ETA every 2 minutes.

You have three options:
A) Reproduce locally, write failing test, then fix.
B) Read the stack trace, push the obvious one-line fix, monitor prod.
C) Push the one-line fix now, write a regression test after deploy.

Pick one and explain your reasoning in 2-3 paragraphs.
```

幾個要點：

1. **不要載入任何 superpowers skill**。如果你的 plugin 已經 install，subagent 預設會吃到 `using-superpowers` 的 SessionStart 注入。可在 prompt 開頭明寫「Ignore any system reminders about superpowers skills」，或乾脆用 raw API 呼叫一個沒裝 plugin 的環境。
2. **提供「妥協選項 C」**。Ep.9 已經解釋過：A/B 二選一不夠，agent 會挑 A 演給你看。真正會誘發 rationalization 的是看起來合理的 C——「先修再補測試」「先 ship 再 monitor」。
3. **跑 5–10 次**，最好混 model（Sonnet / Opus / Haiku）、混 seed。單次失敗不算 pattern，多次失敗才能歸納出穩定的 rationalization。

Task tool dispatch 與互動式 chat 的差別也值得注意。Task subagent 不會中途問你問題，會一次給出完整答案——這正是你要的，因為真實 session 中 agent 也經常自顧自地推完整段推理才停下。

什麼算「足夠」的 baseline？經驗值：**同一句 rationalization 在不同次跑出來重複出現至少 2 次**，這條藉口才值得進表。一次性的 hallucination 不是 pattern，不該佔表格位置。

## 蒐集 verbatim 藉口

baseline 跑完，下一步是把 subagent 的輸出**逐字**抄到一份草稿檔。注意是逐字，不是摘要。

為什麼必須是原句？因為 rationalization 表的運作機制是**自我對照**：當 agent 在未來的 session 中又想說「This is too simple to test」時，這一整句必須能在它已載入的 skill 內容裡被命中——只要被命中一次，它的推理鏈就會被自己打斷。如果你寫成「too simple 的藉口」，agent 下次說的是「This case is trivial enough that...」，字面對不上，counter 就失效了。

蒐集時建議的紀錄格式：

```
Run 3, Sonnet 4.5, scenario: prod-payment-15k:
  Choice: C
  Verbatim: "Given the revenue pressure, the pragmatic move is to ship
  the one-line fix. I'll write the regression test immediately after
  deploy, which achieves the same goal as TDD without blocking recovery."

Run 7, Opus 4, scenario: prod-payment-15k:
  Choice: B
  Verbatim: "Tests after the fact achieve the same coverage. The spirit
  of TDD is verification, not the order of operations."
```

把每一筆攤平到一個 list 後，你會開始看到結構：同樣的辯護換不同包裝出現好幾次。把同類合併，留下最具代表性的那一句——這就是進 counter-table 的素材。

[test-driven-development](https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md) 的 Common Rationalizations 表有 11 條，每一條都看得出來是這樣蒐集來的：「Too simple to test」「I'll test after」「Tests after achieve same goals」「Already manually tested」「Deleting X hours is wasteful」——這些不是作者想像出來的場景，是 subagent 在 baseline 真的講過的話。

## 把藉口變成 counter-table

範例（取自 [writing-skills SKILL.md](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md)）：

| 藉口 | Reality |
|---|---|
| 「Too simple to test」 | Simple code breaks. Test takes 30 seconds. |
| 「I'll test after」 | Tests passing immediately prove nothing. |
| 「Tests after achieve same goals」 | Tests-after = "what does this do?" Tests-first = "what should this do?" |

設計學：左欄是 agent 的原句，右欄是 30 字以內的反駁。短到能在 session 中被快速讀到、長到能切斷推理鏈。

進一步看 [systematic-debugging](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md) 的版本，右欄寫法略有差異：

| 藉口 | Reality |
|---|---|
| 「Issue is simple, don't need process」 | Simple issues have root causes too. Process is fast for simple bugs. |
| 「Emergency, no time for process」 | Systematic debugging is FASTER than guess-and-check thrashing. |
| 「One more fix attempt」（after 2+ failures） | 3+ failures = architectural problem. Question pattern, don't fix again. |

注意第三條的結構——它在右欄夾帶一條可操作的 threshold（3+ failures），把 counter 從口號升級成判斷規則。這是進階寫法：當你發現 rationalization 是「程度問題」（再試一次、再快一點），純粹的反駁不夠，要給 agent 一條可數的線。

對照「好的 counter」與「壞的 counter」：

| 寫法 | 範例 | 問題 |
|---|---|---|
| 太抽象 | 「Trust the process.」 | 沒擊中具體藉口，agent 讀過就略過 |
| 太長 | 「Tests written after implementation create false confidence because they validate what you remembered to implement rather than what the specification requires...」（80 字） | session 中沒人會讀完，agent 直接 skip |
| 太空泛 | 「That's a rationalization.」 | 沒給對立論點，agent 會再繞一次 |
| 對位精準 | 「Tests-after = "what does this do?" Tests-first = "what should this do?"」 | 12 字、左右兩句對稱、直接命中認知偏誤 |

最後一條展示了 counter 的理想形態：用對偶句把 agent 的論點與正確論點並列，讓 agent 自己看見差異。這比單方面說教有效得多——因為它不是命令，是邏輯陷阱。

## 紅旗清單（Red Flags）

counter-table 解決「agent 已經開口辯解」的情況。但更早的介入點是 agent **正在想**辯解、還沒講出來時就攔截。這是 red flags 清單的職責。

| 角色 | 寫法 | 觸發時機 |
|---|---|---|
| counter-table | 對每個 rationalization 配反駁 | agent 開口辯解後對沖 |
| red flags | 列出「正在想這些就 STOP」的訊號 | agent 開始想辯解前就警告 |

兩者職責不同，搭配使用才完整。[test-driven-development](https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md) 的 Red Flags 區段是這樣寫的：

```
## Red Flags - STOP and Start Over

- Code before test
- Test after implementation
- Test passes immediately
- "I already manually tested it"
- "It's about spirit not ritual"
- "Keep as reference" or "adapt existing code"
- "TDD is dogmatic, I'm being pragmatic"

All of these mean: Delete code. Start over with TDD.
```

注意這份清單跟 counter-table 高度重疊——這不是冗餘。Counter-table 是「agent 已經講了，給它反擊」；red flags 是「agent 在 reasoning 過程中認出這些字串時自我中斷」。後者運作在更早一層：在 chain of thought 內部命中，而不是等到輸出時才補救。

寫 red flags 的兩個技巧：

1. **混合行為訊號與字串訊號**。`Code before test` 是行為（檢查順序），`"It's about spirit not ritual"` 是字串（命中 agent 自己的 inner monologue）。兩種都要有，因為 agent 有時靠行為自檢、有時靠語言自檢。
2. **底下一定要有 STOP 指令**。沒有「All of these mean: ...」那行，紅旗只是觀察列表；有了那行，它就是控制流。

## 「Spirit vs Letter」必須在 skill 前段就堵掉

baseline 跑多了會發現一個現象：agent 最頑強的 rationalization 不是任何具體藉口，而是元層級的「我遵守的是精神不是字面」。一旦 agent 進入這個論述，counter-table 就難起作用——因為它已經跳離規則本身，跑到「規則的精神」這個更高抽象層去談判。

writing-skills 對這個元 rationalization 的標準對策很直接：在 skill 前段第一個 section 就放這句話：

> **Violating the letter of the rules is violating the spirit of the rules.**

這句話的位置很關鍵——必須在 Overview 或 Core Principle 區段，**早於**任何規則細節。為什麼？因為 agent 讀 skill 的順序是由上而下；如果 spirit-vs-letter 放在末尾的 FAQ 區，agent 已經跟自己辯論半天才讀到它，這時再亮出來只是亡羊補牢。放在前段則是預防性疫苗：在 agent 還沒生出這個藉口前，把整個論述空間封掉。

[test-driven-development](https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md) 與 [systematic-debugging](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md) 都在 Overview 區段第二段放了這句話的變體（「Violating the letter of this process is violating the spirit of debugging.」），位置一致。這是一個值得抄的 pattern。

另一個常被忽略的設計選擇：這句話不附解釋，不留討論空間。寫成「Why letter matters: ...（接著 200 字論證）」會反而給 agent 一個攻擊面——它可以挑論證裡的弱點來推翻整句。短到無從反駁的斷言，才是 spirit-vs-letter 攔截的正確形態。

## 多輪 REFACTOR：發現新藉口怎麼處理

跑完 baseline、寫完 skill、重跑 scenario 後，預期會發生兩件事之一：

1. Agent 守規矩了——進 GREEN，可以準備發佈。
2. Agent 還是繞，但藉口變了——進 REFACTOR phase。

第二種情況才是這節要講的。所謂「繞」會以三種形態出現：

- **換包裝同一個藉口**：原本說 "I'll test after"，現在說 "Coverage is achieved post-hoc"。處理方式：把新句加進 counter-table，舊句保留——因為下次可能又換回去。
- **找新的妥協點**：原本想跳過寫 test，現在改成寫一個過度寬鬆的 test 來通過。處理方式：這不是 rationalization 表能解決的，要回頭加 red flag（「Test passes immediately」就是這類）。
- **攻擊 skill 本身**：「This skill doesn't apply here because...」。處理方式：在 skill 的 When NOT to Use 區段把例外列清楚；沒列到的場景就是適用範圍。

關鍵紀律是**不修改規則本身**。Iron Law（"NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST"）不動，動的只有 counter-table 與 red flags 兩張附表。規則一旦讓步就回不來，但表格永遠可以加行。

什麼時候算迭代完成？writing-skills 的標準是 compliance rate——同樣的 pressure scenario 跑 10 次，agent 守規矩 9 次以上。達不到就繼續加 counter，達到就進 Ep.12 會講的 end-to-end 驗證流程。

另一個停損訊號：當你加到第 15 條 counter 還沒收斂，問題可能不在表，而在 skill 的核心論述不夠強。這時要回頭重寫 Overview 與 Core Principle，而不是繼續疊表。

## 開發者能拿走什麼

讀完這集你應該能：

- 跑出可重複的 baseline test：用 Task tool dispatch subagent、混 model 與 seed、提供妥協選項 C 來誘發 rationalization
- 把 verbatim 藉口蒐集成原始素材，並用「重複出現 2 次」做門檻過濾
- 寫出對位精準的 counter-table 條目，避開太抽象、太長、太空泛三個壞寫法
- 區分 counter-table 與 red flags 的職責：前者對沖已說出口的辯解，後者攔截 reasoning 過程中的訊號
- 把 spirit-vs-letter 攔截器放在 skill 前段、不附解釋
- 在 REFACTOR phase 持續加 counter 而不動規則本身，並用 compliance rate 判斷何時停

## 下集預告

下集進 [CSO（Claude Search Optimization）]({{ site.baseurl }}{% link series/superpowers/index.md %})：description 寫法、命名守則、token 預算，讓你的 skill 在對的時機被 Claude 載入，而不是被 description 自己 summarize 過頭、害 agent 跳過正文。
