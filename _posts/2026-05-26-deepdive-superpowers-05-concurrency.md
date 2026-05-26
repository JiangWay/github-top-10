---
layout: post
title: "深度解析 superpowers Ep.5：並發與隔離 — worktree / subagent / parallel"
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

Ep.4 講單線守紀律的三個 skill。這集處理「跑很多事情同時」的另一條軸：worktree、parallel agents、subagent。並發在 agent 系統裡比想像中重要——不是為了快，是為了隔離 context 不要污染。看完這集你會懂為什麼 worktree 比 branch 切換好、什麼樣的子任務該丟 subagent、parallel agents 卡住其中一個怎麼救。對應 Ep.1 表第 3 種失敗（context 污染）。

## using-git-worktrees：worktree 取代 branch 切換

[using-git-worktrees](https://github.com/obra/superpowers/blob/main/skills/using-git-worktrees/SKILL.md) 在開新工作時建立獨立 worktree 而非 `git checkout` 切換。原因：切換會帶 dirty state 污染、agent context 也容易混淆「現在在哪個 branch」。

這節拆 worktree 工作流與 lifecycle：建立、命名規則、回收時機、與 finishing-a-development-branch（Ep.6 細講）的銜接。

## dispatching-parallel-agents：fan-out / fan-in

[dispatching-parallel-agents](https://github.com/obra/superpowers/blob/main/skills/dispatching-parallel-agents/SKILL.md) 的核心是 fan-out / fan-in pattern：把獨立子任務分派給 N 個 subagent 同時跑，等所有結果回來再整合。

這節拆「什麼樣的任務適合 fan-out」（互不依賴、預期 output 結構化）、收斂結果的設計（怎麼合併三個 agent 的搜尋結果）。

## subagent-driven-development：主 agent 不做的事

[subagent-driven-development](https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md) 把「context 大但結果小」的任務丟給 subagent。例：研究 100 個檔案，回報 5 點摘要。主 agent 只看摘要不看原始檔，省 context。

這節拆「subagent 與主 agent 的職責契約」：input/output 該怎麼設計，subagent 才能真的省 context 而非變成更多開銷。

## 隔離（isolation）的三層

| 層級 | 機制 | 失效模式 |
|---|---|---|
| 檔案層 | worktree | 沒清會堆積占硬碟 |
| context 層 | subagent | spec 沒寫清沒收回結果 |
| 權限層 | hook | 太嚴會卡 production task |

這節橫向比較三層隔離的取捨。

## 實戰場景

- worktree 散滿地：寫個清理 script 或在 finishing-branch 強制收回
- parallel agent 卡其中一個：先看 fan-in 條件是否寫對
- subagent 沒收回：context spec 沒寫清楚

## 踩坑與最佳實踐

- 太愛 fan-out：每多一個 subagent 就多一個失敗點
- subagent 太瑣碎：subagent 處理小任務的 overhead 可能比主 agent 自己做還大
- worktree 占滿硬碟：定期 `git worktree prune`

## 下集預告

下一集是 review 雙環與 branch 收尾。
