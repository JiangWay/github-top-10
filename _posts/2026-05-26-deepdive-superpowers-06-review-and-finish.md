---
layout: post
title: "深度解析 superpowers Ep.6：Review 雙環與 branch 收尾"
date: 2026-05-26
published: false
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

Ep.5 講並發隔離，這集講 task 結尾的兩個關鍵：code review 與 branch 完成。superpowers 把 review 拆成 request 與 receive 兩個 skill，看似多餘，其實是讓主 agent 沒辦法自我安撫式審查。看完這集你會懂為什麼 agent 卡在 review 是 by design，什麼時候才是真的失控。對應 Ep.1 表第 1、2 種失敗的最後一道閘——review 防止「直覺修沒抓根因」與「TDD 補測沒驗到邊界」的情況直接進 main。

## requesting-code-review：subagent 兩段式審查

[requesting-code-review](https://github.com/obra/superpowers/blob/main/skills/requesting-code-review/SKILL.md) 不讓主 agent 自己 review，要派出 subagent。兩段式分工：(1) factual review（程式邏輯、邊界） (2) consistency review（風格、命名、與 codebase 對齊）。兩個 subagent 跑同一份 diff，各回各的報告。

這節拆「為什麼是兩個 subagent 而非一個」：分工讓單一 agent 不會試圖一次做太多、漏掉細節。

## receiving-code-review：critical issue 阻擋進度

[receiving-code-review](https://github.com/obra/superpowers/blob/main/skills/receiving-code-review/SKILL.md) 接 subagent 回來的報告，按嚴重度分類：critical / major / minor / suggestion。critical 是 hard gate，沒處理完不准 merge、不准結案。

這節拆嚴重度分級的判斷標準（什麼算 critical？安全漏洞？回歸風險？），以及 critical 怎麼 enforce 不被跳過。

## finishing-a-development-branch：lifecycle 完整收尾

[finishing-a-development-branch](https://github.com/obra/superpowers/blob/main/skills/finishing-a-development-branch/SKILL.md) 涵蓋 branch 完工的所有步驟：commit message、PR description、worktree 清理、與 main 同步。

這節對照 verification-before-completion（Ep.4）：verification 守「程式碼跑得起來」，finishing-branch 守「branch 在版控系統裡乾淨收尾」。兩件事。

## 為什麼 review 拆兩個 skill

| Skill | 何時觸發 | 主要動作 |
|---|---|---|
| requesting | 寫完想結案前 | 派 subagent 跑 review |
| receiving | subagent 回報後 | 分嚴重度、決定處理 |

合一會讓「請 review」與「處理 review」混在同一個 context，agent 容易自我安撫（「我自己已經看過了」）。拆開強制兩段分工。

## 實戰場景

- agent 卡在 review：先看 critical 是否還沒處理
- 自我安撫式 review（跳過 subagent）：通常 description 沒撞到 requesting-code-review
- branch 收尾被中斷：finishing-branch 是 idempotent，重跑即可

## 踩坑與最佳實踐

- 不耐 review 想 force-merge：critical 不該繞過
- subagent review 太鬆：subagent 的 prompt 沒寫嚴
- branch 收尾忘記同步 main：finishing-branch 會檢查，跑一次即可

## 下集預告

下一集進元層：using-superpowers / writing-skills 兩個「skill 的 skill」。
