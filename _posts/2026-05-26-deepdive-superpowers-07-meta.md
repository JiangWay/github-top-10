---
layout: post
title: "深度解析 superpowers Ep.7：元層 — 自我繁殖的 superpowers"
date: 2026-05-26
published: true
series: superpowers-deepdive
part: 1
episode: 7
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想用 superpowers 的 Claude Code 重度用戶"
related_skills: [using-superpowers, writing-skills]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.6 收完了一個完整的 task lifecycle：從 brainstorm 起頭、走過 plan / execute / TDD / verification、最後在 review 雙環與 branch 收尾結束。這一條主線能被串起來，靠的並不只是 14 個 skill 各自寫得多漂亮，更關鍵的是兩個藏在背後的 meta skill；它們不做任務本身，只規範「skill 要怎麼被找到、被選擇、被孵化」。

這集進元層。要拆的就是這兩個 skill：`using-superpowers` 與 `writing-skills`。前者是每個 session 必經的 router，後者是作者教你寫 skill 的 skill。看完這兩節，你會明白為什麼把 superpowers 講成「一組外掛」其實低估了它。它更像是一個能自我繁殖的方法論軟體：方法論長成 skill，skill 又長出寫 skill 的 skill，循環不止。

## using-superpowers：紅旗清單與優先順序

[using-superpowers/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md) 是 SessionStart 必經入口。每次 session 一開始，它一定先被載入。它的職責不是執行任務、不是寫碼、也不是 debug；它的職責是 router，在 agent 還沒動手以前，告訴它「你眼前這件事，應該走哪個 skill」。

這個 router 對應到 Ep.1 那張失敗表的第 3、4 種：context 污染（不該載入的 skill 被載入、或不必要的探索把對話塞滿）與跳過設計（agent 還沒想清楚就先動手）。前者靠 routing 紀律：skill 規定只要有「1% 可能適用」就應該 invoke 對應 skill，但 invoke 之前不准先到處讀檔案、不准先 grep、不准先 clarify。後者靠紅旗清單，直接把 agent 在 session 裡會冒出來的內心戲列出來，再逐條打掉。

紅旗清單值得真的看一眼，因為這是整個 superpowers 對抗 agent rationalization 的第一線。直接引兩條：

> "This is just a simple question" → Questions are tasks. Check for skills.
>
> "I need more context first" → Skill check comes BEFORE clarifying questions.

第一條對應到 Ep.1 表的第 4 種失敗：agent 用「這只是個小問題」當理由跳過 brainstorming 直接動手。第二條對應到使用者最常觀察到的徵兆：你才剛打完需求、agent 就開始連讀十幾個檔案翻 repo，那不是勤勞，是它在跳過 skill check。skill 的態度很硬：先 invoke skill，再決定要不要 clarify。

清單裡還有「I remember this skill」、「The skill is overkill」、「I'll just do this one thing first」這幾條，每一條都可以對到你 session 裡看過的具體 LLM 行為。「我記得這個 skill」對應到 agent 憑印象跳過載入；「skill 太重」對應到 agent 把自己的偷懶包裝成效率；「我先做這一件事」對應到那個你最熟悉的橋段：明明只給了一個需求，它先回你「我先快速 check 一下檔案結構」就直接開幹了。重度用戶讀這份清單會有特別的辨識感：很多你以為是 agent「個性」的怪毛病，其實只是它在某條 rationalization 上鑽出去而已。

router 另一個重點是 skill 優先順序。當多個 skill 可能適用時，先走 process skill（brainstorming、systematic-debugging），再走 implementation skill（前端設計、MCP builder 之類）。「Let's build X」永遠先 brainstorm；「Fix this bug」永遠先走 systematic-debugging。這個順序看似簡單，但它在主 agent 行為上展現出來的，就是 Ep.3、Ep.4 你看過的那種「明明我只想趕快試一下，它卻先要我設計」的觀感。那不是 agent 不聽話，是 router 在按優先序執行。

理解這層之後再看 Ep.2 提過的「為什麼 description 寫成 `Use when…` 句型」就會通了：router 不是靠關鍵字匹配，是靠每個 skill description 提供的「觸發條件」做近似分類。description 寫得越像 router 線索（症狀、錯誤訊息、情境），router 就越可能命中；description 一旦寫成「這個 skill 在做什麼」，agent 反而會跳過正文、直接照 description 行事。這條觀察在 Part 2 的 CSO 章節會再用到。

## 三層優先序：user > superpowers > system prompt

`using-superpowers` 在文件最前頭就明文寫了一條優先序：

1. User 的明確指令（CLAUDE.md、AGENTS.md、直接請求）：最高。
2. Superpowers skill：次之，覆蓋預設 system prompt 行為。
3. 預設 system prompt：最低。

skill 自己舉的例子很直接：如果 CLAUDE.md 寫「不要用 TDD」，而 skill 寫「永遠用 TDD」，agent 必須聽 CLAUDE.md。User is in control。

這條順序的政治意義比技術意義更重要。一套外掛敢自稱「強制紀律」，它必然會在很多地方蓋掉 LLM 的預設行為：TDD 的 Iron Law、verification gate、brainstorming 的 HARD-GATE，每一條都是在和 agent 的「我覺得這樣比較快」對抗。對使用者來說，這種強度的覆蓋一旦失控、一旦無法在自己的專案裡關掉，就會立刻變成「外掛綁架我的工作流」。一套不允許退場的紀律工具，很快會被使用者整個關掉。

把 user 放在最頂層、且明文寫進 router skill，是 superpowers 處理這個張力的方式。它不假裝中立，它承認自己會覆蓋系統預設；但它同時承諾：你的 CLAUDE.md 永遠贏。實務影響有兩個。第一，你可以在 repo 層級用 CLAUDE.md 為單一專案關掉某個 skill 的某條規則，不必去改 plugin 本身。第二，當你發現 agent 在某個專案執行得「太死板」時，第一個檢查點不是去鬧 skill 寫太硬，而該回頭看 CLAUDE.md 有沒有講清楚你要的例外。superpowers 不會幫你猜，它預設你會自己寫清楚。

這條優先序還有一個容易被忽略的副作用：團隊導入 superpowers 時，CLAUDE.md 變成正式的紀律調整面板。你想為一個 legacy repo 暫時關掉 TDD 強制、想為一個原型分支允許跳過 brainstorming、想為某類 hotfix 縮短 verification gate，全部寫在 CLAUDE.md 就生效。換句話說，這層優先序把「客製化」從改外掛降級成改 markdown，門檻一下子降到任何工程師都能維護的程度。

## writing-skills：作者教你寫 skill 的 skill

[writing-skills/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md) 是這套外掛裡 meta 程度最高的一塊。它把「怎麼寫一個經得起測試的 skill」本身寫成 skill，並在第一句就把核心主張亮出來：

> Writing skills IS Test-Driven Development applied to process documentation.

寫 skill 就是把 TDD 套用在流程文件上。一般 prompt engineering tutorial 的做法是先寫 prompt、跑一跑、覺得不錯就發；writing-skills 反過來。你必須先讓 agent 在沒有 skill 的情況下失敗一次（RED 階段：baseline pressure scenario），記錄它逐字的 rationalization；然後寫最小化的 skill 去堵那些具體藉口（GREEN）；最後在新的壓力情境裡再壓一次，找新的藉口，再回頭堵（REFACTOR）。它甚至列了一條 Iron Law：「沒有先看到 agent 失敗，就不准寫 skill。」

對 Part 1 的讀者來說，這節先點到為止。重點只有一個：你之前在 Ep.2 到 Ep.6 看到的所有 skill，例如 TDD 的「刪除先寫的程式碼」、verification 的 hard gate、systematic-debugging 的紅旗清單，它們長那個樣子並不是作者文筆風格，而是 RED-GREEN-REFACTOR 循環跑出來的副產品。skill 裡每一條看起來囉嗦的 rationalization counter，背後都有一個 baseline test 裡的 agent 真的講過那句話。

這也是為什麼 superpowers 能「自我繁殖」：它不只給你 skill，它把生產 skill 的方法也 skill 化了。任何一個重度用戶只要願意走完那條 RED-GREEN-REFACTOR 循環，就能把自己手上的內部紀律（code review 慣例、release checklist、on-call runbook、資安守則）壓成同等強度的 skill，並透過 marketplace 機制散播給其他人。Part 2 從 Ep.8 開始就是專門拆這條生產線。

從重度用戶的角度看，writing-skills 還提供了一個間接好處：它讓你看一個 skill 時，能評估它「測過沒」。skill 寫得好不好的訊號很具體：有沒有 Red Flags 清單、有沒有 rationalization counter table、Iron Law 是不是封住了常見漏洞、description 是不是只描述觸發條件而沒總結流程。如果一個外部 skill 缺了這些痕跡，那它八成沒走過 pressure scenario，遇到實戰壓力會破。換句話說，writing-skills 同時把品檢標準也外顯了，你以後看別人寫的 plugin、看 Anthropic 官方 skills repo，都能用同一把尺量。

## Part 1 結語

走完 Ep.1 到 Ep.7，你應該有兩個東西放進口袋。第一個是「方法論軟體化」這件事的可行界線：哪些紀律可以被 markdown 加 hook 灌進 LLM、哪些只能靠人自己守、哪些灰色地帶要靠 CLAUDE.md 自行調整。第二個是診斷自己 session 的 mental model：當 agent 卡住、跑歪、或顯得太死板時，你知道該回頭看哪個 skill、哪條紅旗、哪層優先序。

這兩件事的價值，在於把「Claude Code 用得好不好」從玄學變成可以排查的工程問題。剩下的就是長期累積出來的手感了。

## 接 Part 2：想自己寫 skill 嗎？

到這你已經會解釋 superpowers 在做什麼，但有個更深的問題：作者怎麼**知道**他寫的 skill 真的能讓 agent 守紀律？線索藏在每個 skill 目錄下的 `test-*.md`（包含 academic 與 pressure-1/2/3），那是真正的測試案例。Part 2 從這裡開始拆 skill 寫作的元方法論。

回到[系列入口]({{ site.baseurl }}{% link series/superpowers/index.md %})可查 Part 2 所有集數與勘誤。
