---
layout: post
title: "深度解析 superpowers Ep.3：流程主幹 — brainstorm → plan → execute"
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

## brainstorming：HARD-GATE 的工程實作

[brainstorming/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md) 用 markdown 寫的 HARD-GATE 阻止 agent 在設計未批准前寫程式。實作關鍵：(1) 開頭就放 hard gate 標籤 (2) 列出常見 rationalization 與 counter (3) 強制走「一問一答」節奏。

這節用真實 session trace 對照「沒 brainstorming」vs「有 brainstorming」的差異。重度用戶可拿走：知道 agent 為什麼一問再問，是設計而非 bug。

### 反模式：「這太簡單不需要設計」

skill 內預先列出五條 rationalization：「太簡單」「我已經知道答案」「來不及問」「之前做過」「就一行而已」。每條都有 counter。寫法是表格，agent 跳關前會撞到這張表。

這節拆 rationalization 表的「攻防設計」，它假設 agent 會找哪些藉口。

## writing-plans：2–5 分鐘細粒度任務

[writing-plans](https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md) 要求每個 plan item 「2 到 5 分鐘可完成」。太大顆會跨多個 context，太小顆會碎片化。

這節拆顆粒度演算法、plan 檔案結構（YAML 還是 markdown？任務 ID 規則？）、與 [executing-plans](https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md) 銜接的格式契約。

## executing-plans：plan 即 todo

plan 直接 1-to-1 對應到 TodoWrite 工具，progress 透明可見。每完成一項 mark completed，未完成清楚標出。

這節拆兩件事：(1) plan ↔ TodoWrite ↔ user 看到的進度，三方同步機制 (2) plan 中途要改怎麼辦（revise vs new plan）。

## 三 skill 的銜接 contract

| 從 | 到 | 傳遞物 | 格式 |
|---|---|---|---|
| brainstorming | writing-plans | 已批准的 design doc | markdown，含 user explicit 同意 |
| writing-plans | executing-plans | plan 檔 | 結構化 plan items |
| executing-plans | task 結束 | progress + 完成狀態 | TodoWrite final state |

這節講為什麼這三步要拆成獨立 skill 而不合一：獨立才能跨 session 中斷恢復、才能單獨 refactor、才能單獨被別的 skill invoke。

## 實戰場景

- brainstorming 卡死在一問一答：先看 design 是否真有 user 批准句
- plan 顆粒度太大：agent 會回頭切細，但 user 可以強制要求拆
- executing 中途偏題：通常是 plan 沒寫清楚邊界

## 踩坑與最佳實踐

- 不耐 brainstorming 想跳：直接後果是 plan 寫不細
- plan 過細：失去 abstraction，agent 變 micromanaged
- progress 不同步：通常是手動編輯 plan 沒過 TodoWrite

## 下集預告

下一集是紀律三件套：TDD、verification、debugging。
