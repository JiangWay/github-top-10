---
layout: post
title: "深度解析 superpowers Ep.4：紀律三件套 — TDD / Verification / Debugging"
date: 2026-05-26
published: false
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

Ep.3 的流程主幹定義「該做什麼、按什麼順序」。這集講三個「品質守門員」skill：test-driven-development、verification-before-completion、systematic-debugging。三者看起來都在「驗證」，但管的是不同階段：TDD 管寫之前、verification 管收尾、debugging 管出錯之後。看懂這個職責切割，下次 agent 卡在「修不完的 bug」或「卡在 verification 不肯結案」時你就有 mental model 去診斷。

## test-driven-development：RED-GREEN-REFACTOR 強制

[test-driven-development/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md) 把 TDD 寫成 Iron Law：沒有失敗測試就不准寫 implementation。skill 內的 enforcement：(1) 開頭 HARD-GATE (2) rationalization 表覆蓋常見藉口 (3) 紅旗清單供 agent 自我檢查。

這節拆「agent 為什麼會自己刪掉先寫的 code 重來」，這是設計不是 bug——違反 letter 就是違反 spirit。

對應 Ep.1 表第 2 種失敗（TDD 倒過來寫）。

## verification-before-completion：完成前 hard gate

[verification-before-completion](https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md) 在「我寫完了」與「我可以回報完成」之間插一道閘。檢查清單包含 build、lint、type-check、實際跑、必要時截圖。任何一項失敗就回到 implementation。

這節拆「verification 為什麼不能放給 TDD 做」：TDD 守的是測試先行，verification 守的是邊界都跑過。兩件事不重疊。

## systematic-debugging：bug 走方法論而非直覺修

[systematic-debugging](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md) 要求遇到 bug 時：(1) 讀完整 error message (2) 重現 (3) 查最近 change (4) 找 working example (5) 才形成 hypothesis。

這節用 [test-pressure-1.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-pressure-1.md) 的 production-down scenario 為例：高壓下走方法論的具體流程。重度用戶可拿走：production 出包時自己也能套用同樣框架。

對應 Ep.1 表第 1 種失敗（直覺修 bug）。

## 三者為什麼分開不合一

| Skill | 守的階段 | 失敗訊號 |
|---|---|---|
| TDD | 寫之前 | 看到 implementation 沒測試 |
| verification | 收尾 | 宣稱完成但 build/lint 沒過 |
| debugging | 出錯之後 | 試著修但沒定位 root cause |

合一會造成 skill 過長、description router 撞語意。

## 實戰場景

- agent 在 TDD 主動刪 code：by design
- verification 過度檢查：通常是 hook 把不必要的檢查塞進來
- debugging 跳過某步：高壓下 rationalization 沒擋住

## 踩坑與最佳實踐

- 已有 codebase 加 TDD：用「new test only for new code」過渡
- verification 卡 lint：通常是 lint config 與 skill 期望不一致
- debugging 急著修：先讓 agent 跑完前四步再決定要不要 quick-fix

## 下集預告

下一集是並發與隔離：worktree、subagent、parallel agents。
