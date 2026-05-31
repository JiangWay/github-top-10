---
layout: post
title: "深度解析 superpowers Ep.3：brainstorm → plan → execute 為什麼必須拆三個 skill"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 1
episode: 3
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想用 superpowers 的 Claude Code 重度用戶"
related_skills: [brainstorming, writing-plans, executing-plans]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.2 拆完架構，這集進入流程主幹三步：brainstorming → writing-plans → executing-plans。這三個 skill 是 superpowers 最 active 的部分，每次稍微複雜一點的 task 都會走過其中至少兩個。看懂這條鏈，你可以判斷 agent 卡在哪一步、為什麼卡。對應 Ep.1 表第 4 種失敗（沒設計直接動工）。

換句話說，這三個 skill 共同把「跳進去就寫碼」這個失敗模式切成三段可阻擋的關卡：先強制坐下來設計、再強制把設計拆成 2–5 分鐘顆粒、最後強制讓 progress 顯式化。任何一段被跳過，後面兩段都會跟著失靈，這就是為什麼即使重度用戶覺得「這次很簡單」，agent 還是會把你拉回 brainstorming。

## brainstorming：HARD-GATE 的工程實作

[brainstorming/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md) 真正讓人意外的，是它把「不准寫碼」這件事直接做成 markdown 標籤。SKILL.md 開頭第二段就放這段：

> `<HARD-GATE>Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it. This applies to EVERY project regardless of perceived simplicity.</HARD-GATE>`

這段以註解語法包裝，實際身分卻是寫進 system context 的硬性指令。重度用戶最常觀察到的訊號是：你丟一個看似很小的 feature 給 Claude Code，它沒立刻動手，而是回了一個「我先了解一下專案目前狀態」的訊息，然後開始一次問一個問題。這正是 HARD-GATE 在工作。SKILL.md 在 Process Flow 段強制了九步 checklist：探索專案 → 視覺輔助詢問（如有需要）→ 一次一問 clarifying → 提 2-3 種 approach → 分段呈現 design → 寫 design doc 到 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` → spec self-review → 等 user review → 才能 invoke `writing-plans`。

九步走完之前，agent 不能跳到任何 implementation skill。SKILL.md 末段甚至明寫：「The terminal state is invoking writing-plans. Do NOT invoke frontend-design, mcp-builder, or any other implementation skill.」這是把整條流程的下一站鎖死成唯一出口。

### 反模式：「這太簡單不需要設計」

設計這道 gate 的人預期 agent（與用戶）會找的第一個藉口，就是「這太簡單」。SKILL.md 直接把這個 anti-pattern 放在 HARD-GATE 之後的第一個 H2：

> "Every project goes through this process. A todo list, a single-function utility, a config change — all of them. 'Simple' projects are where unexamined assumptions cause the most wasted work."

這段是給 agent 看的，也是給用戶看的。它的論證是反直覺的：愈簡單的專案愈容易在沒檢驗的假設上浪費工。所以 SKILL.md 沒給 agent「簡單 case 可以跳設計」的後門，只允許 design 本身縮短：「The design can be short (a few sentences for truly simple projects), but you MUST present it and get approval.」

實際 session 的訊號是這樣的：你說「幫我加個 dark mode toggle」，agent 不會直接寫 React component，它會反問「現在 theme state 放在哪？localStorage 還是 context？要不要尊重 system preference？」三個 clarifying 走完才提 approach。這時用戶最常見的反應是不耐，想直接喊「就寫吧」，但因為 HARD-GATE 寫死了「user explicit approval」這個條件，跳過它需要的不是耐心，而是繞過整個 skill。設計者用 markdown 把這條繞道堵掉了。

值得注意的還有第二步「Offer Visual Companion」的格式規定：SKILL.md 強制這個提案必須獨佔一則訊息，不能跟 clarifying 問題或情境摘要混在一起。乍看是體驗細節，實際上是在防一種典型的 agent 行為：把好幾個問題塞同一則訊息以求節省 turn。HARD-GATE 之後的整段 checklist 都在用類似手法收束 agent 的 throughput 衝動，讓每個決定都有獨立的回應點。

## writing-plans：2–5 分鐘細粒度任務

brainstorming 結束、design doc 寫完並拿到 user 同意之後，唯一允許的下一步是 invoke [writing-plans](https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md)。這個 skill 的 SKILL.md 第一行就宣告自己會在動手前喊出來：「Announce at start: 'I'm using the writing-plans skill to create the implementation plan.'」這個 announce 的功能是 state transition：給用戶看到「已經從設計階段切到計畫階段」的訊號，同時也是 agent 給自己的標記。

真正的工程契約在「Bite-Sized Task Granularity」這段，每個 step 必須是 2 到 5 分鐘的單一動作。SKILL.md 給的範例是這樣的：

> - "Write the failing test" - step
> - "Run it to make sure it fails" - step
> - "Implement the minimal code to make the test pass" - step
> - "Run the tests and make sure they pass" - step
> - "Commit" - step

這五行的角色是顆粒度的測量單位，而非單純的說明文字。你可以拿任何一個 plan 條目對照：如果一個 step 寫成「實作 user authentication」，它就違反契約，因為這跨越多個 2–5 分鐘區段；正確寫法是把它拆成「寫 password hashing 的 failing test」「跑這個 test 確認 fail」「最小實作讓它 pass」「commit」這四到五步。SKILL.md 的範例 Task 區塊把這個顆粒度展示得更具體：Step 1 是貼出一段三行的 pytest test code，Step 2 是直接列出 `pytest tests/path/test.py::test_name -v` 加上「Expected: FAIL with 'function not defined'」這種程度的預期輸出，Step 3 才是最小實作，Step 4 重跑同一條 pytest 命令確認 PASS，Step 5 給出 exact 的 `git add` 與 `git commit -m` 命令。重度用戶讀 plan 時拿這個樣板對照，能立刻判斷一個 step 是不是被偷工。

格式契約上 SKILL.md 也鎖得很死：plan 存到 `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`，header 必填三個欄位（Goal / Architecture / Tech Stack），每個 Task 必須列出 Files（Create / Modify / Test 各自的 exact path），每個 step 用 markdown checkbox（`- [ ]`）開頭。這個 checkbox 語法不是裝飾，下一個 skill 會吃它。

SKILL.md 還寫了一張「No Placeholders」清單明列哪些東西是 plan failure：「TBD」「add appropriate error handling」「Write tests for the above（沒附 test code）」「Similar to Task N（要把 code 重複一遍）」。這張表存在的理由是 plan 會被另一個 session 拿去執行，那個 session 沒有現在這段對話的 context，所以任何「我們剛才討論過的」都必須被 inline 寫進 plan。

## executing-plans：plan 即 todo

當 plan 寫完，writing-plans 的最後一步是給用戶兩個選項：subagent-driven（推薦）或 inline executing-plans。前者把每個 task 派給獨立 subagent，後者在當前 session 直接做完。Part 1 重度用戶最常碰到的是後者，所以這集集中拆 [executing-plans](https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md)。

它的 process 短得近乎可疑：SKILL.md 只有三個 step：Load and Review Plan、Execute Tasks、Complete Development。但 Step 1 寫了一句關鍵的銜接訊號：「Create TodoWrite and proceed.」這就是「plan 即 todo」的具體實作，plan 檔案裡每個 `- [ ]` checkbox 會被 1-to-1 灌進 Claude Code 的 TodoWrite 工具，session UI 上你會直接看到一張同步的 progress 清單。

執行迴圈本身被壓到三行：「Mark as in_progress → Follow each step exactly (plan has bite-sized steps) → Run verifications as specified → Mark as completed」。重度用戶最常觀察到的訊號是 TodoWrite 面板在每個 step 結束時翻一次狀態，這個翻面就是 SKILL.md 在執行的證據。如果你發現 agent 寫完 code 沒翻 todo，幾乎可以斷定它沒走 executing-plans，或是走到一半被別的指令打斷。

第二個重點訊號在「When to Stop and Ask for Help」這段。SKILL.md 列了四個必停條件：blocker、plan 有 critical gap、看不懂指令、verification 連續失敗。配的指令是「Ask for clarification rather than guessing. Don't force through blockers - stop and ask.」這解釋了為什麼有時候 agent 看起來明明可以猜，卻硬要停下來問你：它有能力猜，只是 skill 禁止它猜。這對重度用戶來說是個可預測訊號：看到 executing 中途停下來問，先別煩，去檢查 plan 是不是該段寫得不夠細。

## 三 skill 的銜接 contract

三個 skill 之間的傳遞物與格式並非鬆耦合，每一個 handoff 都有 SKILL.md 寫死的契約：

| 從 | 到 | 傳遞物 | 格式 |
|---|---|---|---|
| brainstorming | writing-plans | 已批准的 design doc | `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`，含 user explicit approval |
| writing-plans | executing-plans | plan 檔 | `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`，含 `- [ ]` checkbox steps |
| executing-plans | finishing-a-development-branch | 完成狀態 | TodoWrite 全部 completed + verifications 通過 |

設計者刻意把這三步拆成獨立 skill，而沒做成一個大 workflow。原因可以從 SKILL.md 的兩個訊號讀出來：第一，每個 skill 都用檔案系統作為 handoff 媒介（spec 檔、plan 檔），而非 in-session state，這意味著任何一步都可以跨 session 重啟，只要找得到對應檔案就能續接。第二，executing-plans 的 SKILL.md 開頭就明寫：「Note: Tell your human partner that Superpowers works much better with access to subagents. If subagents are available, use superpowers:subagent-driven-development instead of this skill.」這句話只在獨立 skill 結構下才寫得出來；如果三步合一，就沒有空間讓「執行階段」被換成 subagent 版本。

換成獨立 skill 還帶來另一個性質：rationalization 表可以分層攻防。brainstorming 堵的是「這太簡單」、writing-plans 堵的是「不用拆這麼細」、executing-plans 堵的是「直接過了再說」。每個 skill 只需要處理自己那一段的藉口，攻防表才寫得乾淨。

## 實戰場景

把三個 skill 的銜接訊號攤平成可觀察的場景，重度用戶在實際 session 裡能直接認得：

- **brainstorming 卡在一問一答**：先確認 design 區塊有沒有 user 明確 approve 的句子。SKILL.md 規定每段 design 都要「Ask after each section whether it looks right so far」，如果你只給「嗯好」這種模糊回應，agent 會回到下一個 clarifying 而不前進。
- **plan 顆粒度看起來太大**：拿 SKILL.md 那五行範例對照，如果一個 step 不能在 2 到 5 分鐘內完成單一動作，直接要求 agent 拆細。重度用戶有權回頭請它走 self-review 流程。
- **executing 中途偏題**：通常是某個 task 的 Files 區段沒寫清楚 Create / Modify / Test 三欄。回去看 plan，補上 exact path 再續跑。
- **TodoWrite 面板與 plan 不同步**：幾乎一定是有人手動編輯了 plan 檔卻沒讓 agent 重 load。讓 agent 重跑 Step 1（Load and Review Plan）就會重新建立 TodoWrite。

## 踩坑與最佳實踐

- **想跳 brainstorming 直接給 plan**：HARD-GATE 不會允許，agent 會把你倒回去走 9 步 checklist。與其想繞，不如把 design 寫得快，SKILL.md 允許「a few sentences for truly simple projects」。
- **plan 過細變成 micromanage**：另一個極端是 step 切到 30 秒一個，agent 反而失去判斷空間。2–5 分鐘是 SKILL.md 給的區間，下界與上界都要守。
- **手動改 plan 不通知 agent**：plan 檔案是 source of truth，但 TodoWrite 是 session state。兩者同步只發生在 executing-plans 的 Step 1 Load。直接改 plan 不會自動同步，需要明確請 agent 重 load。
- **跳過 spec self-review**：brainstorming 的 checklist 第 7 步是 placeholder scan、internal consistency、scope check、ambiguity check。這 4 個 check 跳掉的代價會在 writing-plans 顯現：type 不一致或 spec gap 會讓 plan 寫不下去。

## 下集預告

Ep.4 進入紀律三件套：[test-driven-development](https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md)、[verification-before-completion](https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md)、[systematic-debugging](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md)。這集流程主幹只負責把 task 推到「該寫 code 了」這一刻；下集要拆的是 code 真的寫出來那一段，agent 為什麼會被強制走 RED-GREEN-REFACTOR、verification 為什麼又是另一道 hard gate、debug 為什麼不能憑直覺。對應 Ep.1 表第 5、6、7 三種失敗。
