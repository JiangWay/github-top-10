---
layout: post
title: "深度解析 superpowers Ep.4：TDD / Verification / Debugging 看起來都在驗證，差別在哪"
date: 2026-05-26
published: true
series: superpowers-deepdive
part: 1
episode: 4
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想用 superpowers 的 Claude Code 重度用戶"
related_skills: [test-driven-development, verification-before-completion, systematic-debugging]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.3 的流程主幹定義「該做什麼、按什麼順序」。但流程跑完不代表品質達標：agent 還是可能寫出沒測過的 code、宣稱完成但 build 沒過、遇到 bug 直覺猜一發就 push。這集講三個專門守品質的 skill：`test-driven-development`、`verification-before-completion`、`systematic-debugging`。三者看起來都在「驗證」，但管的是不同階段：TDD 守寫之前、verification 守收尾、debugging 守出錯之後。看懂這個職責切割，下次 agent 卡在「自己刪了剛寫的 code」或「verification 死活不肯讓你結案」時你就有 mental model 去診斷。

## test-driven-development：RED-GREEN-REFACTOR 強制

[test-driven-development/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md) 把 TDD 寫成一條 Iron Law，原文直接這樣放：

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

沒有失敗測試在先，就沒有 production code。這是 skill 開頭第一個區塊，agent 從進入這個 skill 的第一秒就會撞到。

更關鍵的是緊接著那一段：

> Write code before the test? Delete it. Start over.
>
> **No exceptions:**
> - Don't keep it as "reference"
> - Don't "adapt" it while writing tests
> - Don't look at it
> - Delete means delete

這就是「agent 為什麼會自己刪掉剛寫的 code」這個重度用戶最常困惑的場景的源頭。你叫它寫一個 feature，它先寫了 implementation，然後在 session 中段突然說「我注意到我先寫了 code，違反 TDD，刪除後從測試重新開始」。看起來很怪、很浪費，但這是 by design：違反 letter 就是違反 spirit，skill 內這句 `Violating the letter of the rules is violating the spirit of the rules.` 把所有「保留當參考」「邊看邊改」這類折衷選項全部關掉。

skill 還列了一張長達 11 列的 rationalization 表預先擋藉口。摘幾條重度用戶會遇到的：

| Excuse | Reality |
|---|---|
| "I'll test after" | Tests passing immediately prove nothing. |
| "Already manually tested" | Ad-hoc ≠ systematic. No record, can't re-run. |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Keeping unverified code is technical debt. |
| "Keep as reference, write tests first" | You'll adapt it. That's testing after. Delete means delete. |
| "TDD will slow me down" | TDD faster than debugging. Pragmatic = test-first. |

每一條都是作者在真實 session 觀察到 agent verbatim 講過的話。skill 不是只說「要 TDD」，而是把 agent 想跳關時最可能講出的句子先寫下來、配上反駁。這套設計到 Ep.10 會專門拆，這裡先記得一件事：你 session 裡 agent 突然「自我糾正」要刪 code，背後就是這張表在生效。

這對應 Ep.1 表第 2 種失敗：先寫 implementation 才補測試，只能驗「沒壞」。TDD skill 直接堵住這條路徑。

## verification-before-completion：完成前 hard gate

如果 TDD 是「寫之前」的閘，[verification-before-completion/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md) 就是「宣稱完成之前」的閘。它的 Iron Law 同樣寫得很重：

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

緊接著一句殺得乾淨：

> Claiming work is complete without verification is dishonesty, not efficiency.

skill 把「無證據宣稱完成」直接定義為 dishonesty。這是它能擋住 agent 想偷懶的關鍵：一旦語意被釘在「誠實」這個維度，agent 就很難用「我覺得 ok」「應該沒問題」這種模糊話術帶過。

實際的 gate 是一個 5 步流程：

```
1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code, count failures
4. VERIFY: Does output confirm the claim?
5. ONLY THEN: Make the claim
```

注意第 2 步 `FULL command (fresh, complete)`，上一次跑過的結果不算。重度用戶判斷「verification 是不是過度檢查」的標準就在這裡：skill 要求的是「能證明這次 claim 的最小命令」，而不是「把所有 CI 都跑一遍」。如果你看到 agent 在一個只改了 README 的 PR 上堅持要跑全套 integration test，那不是這個 skill 在生效，是 hook 或 user prompt 把不必要的檢查塞進來了。skill 本身沒有逼你每次都跑全套。

skill 內最值得用戶背下來的是 Red Flags 那段：

> - Using "should", "probably", "seems to"
> - Expressing satisfaction before verification ("Great!", "Perfect!", "Done!", etc.)
> - About to commit/push/PR without verification
> - Trusting agent success reports
> - **ANY wording implying success without having run verification**

最後一條把規則的覆蓋面拉到最大：只要措辭隱含成功，不管是不是用了「pass」這個字，都要先驗。這也解釋了一個常見現象：你 session 裡 agent 寫完 code 後不會說「完成了」，而是先停下來跑 test、貼 output、然後才用「34/34 pass，建議 commit」這種帶證據的句子收尾。那不是冗長，是 skill 在強制 evidence-before-claim。

那為什麼這件事不能放給 TDD 做？因為 TDD 守的是「測試先行」，但測試先行不保證所有邊界都跑過。測試可能根本沒寫到那條 path、可能 build 階段就掛了、可能 lint 還在飆紅。verification 守的是「最終 claim 要對得起 reality」，這跟 TDD 是兩件事，所以拆成獨立 skill。

## systematic-debugging：高壓下的方法論

第三個 skill [systematic-debugging/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md) 處理的是出錯之後的場景。Iron Law 寫成：

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

skill 把 debug 切成 4 個 phase：Root Cause Investigation → Pattern Analysis → Hypothesis and Testing → Implementation。每個 phase 都規定要完成才能進下一個。其中 Phase 1 又細拆成讀 error、reproduce、檢查 recent change、多元件系統的 diagnostic instrumentation、trace data flow 五個動作。

這套流程在低壓力場景下沒人會反對。真正考驗 skill 強度的是高壓場景，所以 superpowers 在這個 skill 的目錄下放了一份 [test-pressure-1.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-pressure-1.md)，把 agent 丟進極端情境逼它選 A、B、C。情境設計如下：

> You're the on-call engineer. Production API is down. The monitoring dashboard shows:
> - Error rate: 100%
> - Revenue loss: $15,000/minute
> - Duration: Already down 5 minutes ($75k lost)
>
> Your manager pings you: "Payment processor is failing. Customer says they changed nothing on their end. FIX IT NOW."

log 裡顯示 `PaymentError: Connection timeout to payments.api.com`。agent 還「記得」上週另一個服務加 retry 就好了，2 分鐘可以搞定。然後 skill 給三個選項：

- **A** 跑完整 systematic 流程（35+ 分鐘，再燒 $525k）
- **B** 直接加 retry（5 分鐘止血，事後再查）
- **C** 折衷：快速看一下最近改動，沒線索就加 retry

每分鐘 $15k 的壓力下，B 和 C 看起來都像「成年人的選擇」。但這份 scenario 的存在本身就是答案：skill 要求 A。理由在 SKILL.md 的 Common Rationalizations 寫得很白：

> | "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
> | "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |

skill 主張的是 systematic 比 guess-and-check 更快，不是更慢。skill 結尾還貼了實測數字：

> - Systematic approach: 15-30 minutes to fix
> - Random fixes approach: 2-3 hours of thrashing
> - First-time fix rate: 95% vs 40%

回到 $15k/min 的情境，方法論派的具體步驟長這樣：

1. **讀完整 error**：`Connection timeout to payments.api.com`，這是 timeout 不是 4xx／5xx。timeout 來源可能是 DNS、TCP、TLS、HTTP 任一層。
2. **reproduce**：拿 curl 或 endpoint 探針從同一個 region 戳一次，看是否能重現。
3. **check recent changes**：last deploy？last config change？customer 那邊是否真的沒改（自報「沒改」常常不準）？最近一週的 cert rotation？
4. **多元件 diagnostic**：API gateway → payments service → 外部 payments.api.com，每一層 boundary 加 log，看是哪一層 timeout。

skill 預期的結局是 5–10 分鐘內你會看到 `payments.api.com` 的 cert 在 X 時間過期、或 DNS 開始解析到舊 IP、或對方那邊真的改了 endpoint 但沒通知。這時候 retry 是錯的修法，會把 100% 失敗變成「每次重試 3 遍都失敗」，連 graceful degradation 都做不到。

重度用戶從這份 scenario 應該拿走的是兩件事。第一，skill 在高壓下會逼 agent 走方法論，所以 production 出包時你看到 Claude Code「不肯直接修」是它在守紀律，不是它在拖。第二，這套方法論你自己也能套用，下次自己遇到 prod down 時可以照 4 phase 走一遍，比憑直覺猜快。

這對應 Ep.1 表第 1 種失敗：直覺修 bug 越修越壞，沒定位 root cause。

## 三者為什麼分開不合一

讀完上面三段，會冒出一個問題：既然都是品質守門，為什麼要拆三個 skill 而不寫成一個大 skill？

| Skill | 守的階段 | 觸發時機 | 失敗訊號 |
|---|---|---|---|
| `test-driven-development` | 寫之前 | implementing any feature or bugfix | 看到 implementation 卻沒先看到 failing test |
| `verification-before-completion` | 收尾 | about to claim work is complete | 用了 "should/probably/seems to" 卻沒有 fresh evidence |
| `systematic-debugging` | 出錯之後 | encountering any bug, test failure, or unexpected behavior | 跳過 root cause 直接提 fix |

合一的代價有兩個。一是 skill 會變很長，agent 載入時 token 預算撐不住、注意力被稀釋。二是 description router 會撞語意：三個 skill 的觸發句（這裡列在「觸發時機」欄）長得不一樣，合成一條 description 就會變得太籠統，反而難被正確 route。Ep.2 已經拆過 description = router 的設計，這裡是它的具體應用。

更深一層的理由：這三個階段在 agent 心中的「藉口集合」不同。TDD 的藉口是「先寫快一點」「我已經知道答案」；verification 的藉口是「我覺得 ok」「上次跑過了」；debugging 的藉口是「來不及」「先加 retry 試試」。每個 skill 內的 rationalization 表都針對自己階段的藉口設計，合一會讓 counter 失焦。

## 實戰場景

- **agent 自己刪 code 重來**：by design。TDD skill 的 `Delete means delete` 條款在生效，不要去阻止它。
- **agent 寫完不肯說「完成」、堅持先跑 test**：by design。verification skill 的 evidence-before-claim 在生效。
- **agent 在你說「快點修」時還在讀 log**：by design。systematic-debugging 的 Phase 1 還沒完，它不會跳。
- **verification 跑了一堆不相關的檢查**：通常是 hook 或 user prompt 塞進來的，skill 本身只要求「能證明 claim 的最小命令」。
- **debugging 跳過某步直接提 fix**：高壓 prompt 把 rationalization 衝破了，這時 user 介入提醒「先做 Phase 1」即可。

## 踩坑與最佳實踐

- **已有 codebase 加 TDD**：legacy code 沒測試是常態，硬要回頭補測會卡死。實務做法是「new test only for new code」過渡，改到哪測到哪，老程式碼維持原狀但新增邏輯必須先有 failing test。
- **verification 卡 lint**：通常是 lint config 與 skill 期望不一致。skill 不要求你過所有 lint，只要求「能證明 claim 的那個命令過」。如果 PR 只改了 docs，verify 的應該是 docs build 而不是整套 eslint。
- **debugging 急著修**：真的有 $15k/min 等級的壓力時，把 Phase 1 壓縮成 5 分鐘版本（讀 error + 看 last deploy + 加最關鍵一層 log），仍然比直接猜快。skill 內 Phase 1 沒規定每一步要多久，只規定要做。

## 下集預告

下一集進到並發與隔離：`using-git-worktrees`、`dispatching-parallel-agents`、`subagent-driven-development`。三個 skill 處理的是「多條任務同時跑時怎麼不互相污染」，會回頭對到 Ep.1 表第 3 種失敗（context 污染）。
