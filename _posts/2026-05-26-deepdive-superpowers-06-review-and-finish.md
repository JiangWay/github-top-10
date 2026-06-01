---
layout: post
title: "深度解析 superpowers Ep.6：為什麼 code review 要拆成兩個 skill"
date: 2026-05-26
published: true
series: superpowers-deepdive
part: 1
episode: 6
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想用 superpowers 的 Claude Code 重度用戶"
related_skills: [requesting-code-review, receiving-code-review, finishing-a-development-branch]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.5 把並發與隔離拆完，這集走到一條 task 的最後兩段：code review 與 branch 收尾。多數 AI agent 寫完碼就直接交差，最多自己讀一遍 diff 說「LGTM」——這正是 [Ep.1]({{ site.baseurl }}{% link _posts/2026-05-26-deepdive-superpowers-01-why.md %}) 表上第 1 種「直覺修沒抓根因」與第 2 種「TDD 補測沒驗到邊界」最後會穿過的口。superpowers 把這道口拆成三個 skill：`requesting-code-review` 派人來看、`receiving-code-review` 處理回來的意見、`finishing-a-development-branch` 把 branch 從工作態回到乾淨態。

這集要回答的三個問題：為什麼 review 要拆 request 與 receive 兩個 skill 而不寫成一個 hook、嚴重度怎麼分才不會被自己安撫掉、為什麼 branch 收尾被中斷時可以放心重跑。

## requesting-code-review：把 review 派給 subagent

[requesting-code-review](https://github.com/obra/superpowers/blob/main/skills/requesting-code-review/SKILL.md) 的核心動作只有一個：用 `Task` tool 派一個 `general-purpose` subagent 跑 review，並且這個 subagent **拿不到主 agent 的 session 歷史**。它只拿到四樣東西：你剛做了什麼的簡述（`DESCRIPTION`）、應該做到什麼（`PLAN_OR_REQUIREMENTS`）、起點 commit SHA（`BASE_SHA`）、終點 commit SHA（`HEAD_SHA`）。剩下的請它自己跑 `git diff --stat` 與 `git diff` 看。

這設計直接堵掉一個常見毛病：主 agent 邊寫邊解釋自己為什麼這樣寫，等於把辯護詞塞進 review context。subagent 看不到那些辯護詞，只看得到 diff 與要求，會落差就是落差。

skill 列了什麼時候算 mandatory：subagent-driven development 每完成一個 task 之後、做完一個大 feature、merge 到 main 之前。Optional 但值得：卡住的時候要新觀點、refactor 之前先抓 baseline、修完複雜 bug 想確認沒留尾巴。Core principle 一句話：「Review early, review often」。

值得注意的是 v5.1.0 沒有把 review 拆成 factual 與 consistency 兩個獨立 subagent，而是用**一份結構化 prompt 跑一次**，要求 reviewer 在同一份報告裡分別交付：

- **Plan alignment**：實作有沒有照 plan、偏離是改善還是失控、有沒有少做。
- **Code quality**：關注點分離、錯誤處理、型別、DRY 不過度、邊界。
- **Architecture**：設計、擴展性、安全、整合。
- **Testing**：測真行為而非 mock、邊界、整合測試、全綠。
- **Production readiness**：schema 遷移、向後相容、文件、明顯 bug。

「兩段式」在 v5.1.0 體現為 **request 與 receive 的兩段**，不是 reviewer 內部分兩個 agent。這個分法後面會回來談。

reviewer 回的格式被釘死成四塊：Strengths、Issues（依 Critical / Important / Minor 分層）、Recommendations、Assessment（Ready to merge? Yes / No / With fixes）。每條 issue 必須附 `file:line`、講錯在哪、為什麼重要、怎麼修。`code-reviewer.md` 的 Critical Rules 直接寫：不准說 "looks good" 而不檢查、不准把雞毛蒜皮標 Critical、不准 review 沒讀過的碼、不准講「improve error handling」這種空話、必須給明確 verdict。

## receiving-code-review：critical 是 hard gate，不是建議

[receiving-code-review](https://github.com/obra/superpowers/blob/main/skills/receiving-code-review/SKILL.md) 接 subagent 回來的報告，但這 skill 真正要堵的不是技術問題，是**情感反應**。SKILL.md 第一句就把調定下來：「Code review requires technical evaluation, not emotional performance.」

整個 skill 的響應 pattern 是六步：READ → UNDERSTAND → VERIFY → EVALUATE → RESPOND → IMPLEMENT。每一步都有禁令。READ 階段不准反應；UNDERSTAND 要用自己的話把要求複述一遍（或者問清楚）；VERIFY 要回到 codebase 對照；EVALUATE 要判斷「在這個 codebase 是不是真的對」；RESPOND 不准講 "You're absolutely right!" 或 "Great point!" 或 "Let me implement that now"（最後一句是「還沒查證就要動手」的訊號）；IMPLEMENT 一次一條，每條測過再下一條。

嚴重度三層的判準在 `code-reviewer.md` 裡寫得很具體：

- **Critical（Must Fix）**：bug、安全問題、資料遺失風險、功能壞掉。常見的測試 case 像 SQL injection、plaintext password、credential logging 這類**會直接造成 production 災難或 compliance 違規**的，無論程式跑不跑得起來都算 critical。差別在於：tests 全綠不代表沒有 critical，verification 是看「會不會 run」，critical 是看「run 起來會不會炸或洩」。
- **Important（Should Fix）**：架構問題、缺功能、錯誤處理不佳、測試有缺口。例子：CLI 沒有 `--help`、ISO date 沒驗證會靜默回空、缺少 progress indicator 讓使用者不知道在等什麼。這類不會立即炸，但留著一定回頭咬。
- **Minor（Nice to Have）**：風格、優化機會、文件潤色。magic number、命名小瑕疵這類。

critical 怎麼 enforce 不被跳過？skill 用幾條互鎖規則：Forbidden Responses 把所有「performative agreement」打死，所以 agent 不能用「我覺得這條沒這麼嚴重」帶過；YAGNI Check 反過來給 agent 一個合法的 pushback 出口——如果 reviewer 要求加一個沒人在用的 feature，可以 `grep` 出來說「沒被叫到，YAGNI 砍掉？」這設計很重要：它把 pushback 變成有合法管道的動作，agent 就不會用「我覺得他講錯」這種純情緒理由跳過 critical。

Push back 的判準也釘死：suggestion 會弄壞既有功能、reviewer 缺 context、違反 YAGNI、在這個 stack 技術上不對、有相容性歷史包袱、與 human partner 既有架構決策衝突——只有這六條算合法 push back，講出來要附技術理由與測試或 code 證據。其他狀況都得實作。

最反直覺的細節是 Acknowledging Correct Feedback 那節：feedback 對的時候，**也不准講 thanks**。skill 寫得直接：「If you catch yourself about to write 'Thanks': DELETE IT. State the fix instead.」邏輯是 action speaks louder——修了就好，謝來謝去是 token 浪費也容易模糊技術焦點。

## 為什麼 review 要拆成 request 與 receive 兩個 skill

把兩件事放進兩個 skill 不是潔癖。理由是它們在認知上是兩種模式：

| Skill | 認知模式 | 失敗時的樣子 |
|---|---|---|
| requesting | 「我做完了，請別人看」 | 跳過 subagent、自己讀 diff 蓋章 |
| receiving | 「別人指出問題，我要判斷」 | performative agreement 或防衛性 pushback |

合成一個 skill 會發生什麼？主 agent 同一個 context 裡同時扮演送審者與處理者，會出現一種典型的 anti-pattern：「我自己 review 過了，沒問題」——這就是自我安撫。拆開以後，requesting 階段強制把 review 動作外包給 subagent（不同 agent、不同 context），receiving 階段強制走六步 pattern。**兩個 skill 各自有獨立的 description 觸發**，主 agent 想偷懶要連跳兩次，比跳一次難多了。

這也是為什麼 review 不直接做成 hook：hook 是動作之後機械式檢查，review 則要求 agent 用語意處理品質與接受度，而非 regex 處理。把它放在 skill 層、用 description 驅動 routing，agent 才會把 review 視為流程的一部分而不是 CI 噪訊。

## finishing-a-development-branch：lifecycle 收尾與 idempotent 的工程意義

[finishing-a-development-branch](https://github.com/obra/superpowers/blob/main/skills/finishing-a-development-branch/SKILL.md) 處理 branch 從「實作完成」到「乾淨收尾」這段路。它跟 [verification-before-completion]({{ site.baseurl }}{% link _posts/2026-05-26-deepdive-superpowers-04-discipline.md %})（Ep.4）守的東西不同：verification 守的是「程式碼在 runtime 跑得起來」，finishing-branch 守的是「branch 在版控系統裡的狀態收得乾淨」。前者是執行面，後者是版控面。

skill 的流程是六步：

1. **Verify Tests**——跑專案的 test suite（`npm test` / `cargo test` / `pytest` / `go test ./...`）。fail 就停在這步，不准進選項。
2. **Detect Environment**——用 `git rev-parse --git-dir` 與 `--git-common-dir` 比對，分三種狀態：一般 repo、worktree 上的具名 branch、worktree 上的 detached HEAD。決定下一步給哪個 menu。
3. **Determine Base Branch**——`git merge-base HEAD main` 或 `master`，不確定就問。
4. **Present Options**——一般 repo 與具名 branch worktree 給四個選項（merge 回 base、push + PR、保留 branch、丟棄）；detached HEAD 給三個（沒有 merge 選項）。SKILL.md 寫「Don't add explanation - keep options concise」，要逼使用者表態而不是被解釋淹沒。
5. **Execute Choice**——依選項執行。Option 1 要先 `cd` 回 main repo root 再 merge，merge 完再驗一次 test，**確認 merge 成功才能清 worktree、刪 branch**。Option 2 push + `gh pr create`，**不清 worktree**，因為 PR 會收到 review 還要回來改。Option 3 什麼都不動。Option 4 必須要使用者打字 `discard` 確認。
6. **Cleanup Workspace**——只在 Option 1 與 4 跑。靠 worktree 路徑判斷 provenance：路徑在 `.worktrees/`、`worktrees/`、`~/.config/superpowers/worktrees/` 之下才是 superpowers 建立、可以清；不在這些路徑的代表是 harness 自己管的 workspace，不能動。`git worktree remove` 之後一律補一次 `git worktree prune`。

idempotent 的工程意義在這裡最明顯。每一步都先檢查再動：tests 先跑、環境先偵測、base branch 先確認、worktree 路徑先驗 provenance——這些檢查讓「再跑一次」變成安全動作。中斷在第 4 步重跑就再選一次；中斷在第 5 步的 merge 中間，下次重跑會發現 tests 還是過、環境還是 worktree、base branch 還是 main，只差還沒 merge，繼續就好。中斷在第 6 步 worktree 已經 removed，重跑 `git worktree prune` 也只是再次清掉殘留註冊。**重跑不會造成多刪一份 branch、多 push 一次、多開一個 PR**，因為每個動作前面都有狀態檢查。

對重度用戶意義很實際：finishing-branch 是少數可以「壞了就再跑一次」的 skill，不必擔心副作用累積。對照 verification——verification 失敗你要回去改 code、改完再重跑 verification，這也是 idempotent，但語意不同：verification 重跑是「驗一次」，finishing-branch 重跑是「接著做沒做完的那部分」。兩個 skill 都把狀態檢查放在動作之前，這是 superpowers 對「可重入」這件事的一致設計。

## 把這集放回流程地圖

對應 Ep.1 那張失敗類型表的最後一道閘：

- 失敗類型 1「直覺修沒抓根因」：review 階段 reviewer 會問「Sound design decisions?」與「Edge cases handled?」，treat the symptom 的修法會在 Plan alignment 那節被掀開。
- 失敗類型 2「TDD 補測沒驗到邊界」：reviewer 的 Testing 區塊直接問「Tests verify real behavior, not mocks? Edge cases covered? Integration tests where they matter?」。光是讓 tests 全綠不能通過這關。

也因此這集的三個 skill 不能省。verification 守 runtime、TDD 守覆蓋率、review 守 codebase 對齊與安全、finishing-branch 守版控狀態。四道閘各擋各的、各自有自己的 description 觸發，疊起來才是 superpowers 之所以叫 superpowers 的那一層。

## 實戰場景

- **agent 卡在 review 動不了**：先確認回報裡有沒有 Critical 還沒處理。Critical 沒清完就動下一步是設計上不允許的，這時 agent 卡住是 by design。
- **agent 跳過 subagent 自己 review**：通常是提示語沒撞到 `requesting-code-review` 的 description（"completing tasks, implementing major features, or before merging"），可以明確說「請走 requesting-code-review，dispatch subagent」。
- **reviewer 講錯但 agent 照單全收**：受害於 performative agreement。要明確示意「先 verify against codebase，再決定要不要實作」，或直接引用 receiving-code-review 的 YAGNI Check。
- **branch 收尾跑到一半被打斷**：finishing-branch 的每一步都有狀態檢查，重跑一次即可，不會多 push 或多刪 branch。
- **想 force-merge 不想等 review**：別繞 Critical。要繞就回去把那條評估到 Important 以下，並寫明技術理由，這比繞過去風險低得多。

## 下集預告

到這集為止 Part 1 走完七個流程支柱：brainstorming、plan、execute、TDD、verification、debugging、並發隔離、review 與 branch 收尾。下集進元層，拆 `using-superpowers` 與 `writing-skills` 這兩個「skill 的 skill」——前者是每次 session 開頭那段強制 router，後者是作者教 agent 怎麼自己寫 skill 的方法論。Part 1 的最後一塊，也是通往 Part 2 開發者篇的橋。
