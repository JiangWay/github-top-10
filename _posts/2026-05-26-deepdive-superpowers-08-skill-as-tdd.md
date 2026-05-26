---
layout: post
title: "深度解析 superpowers Ep.8：Skill 即 TDD — 寫 skill 的元方法論"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 2
episode: 8
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想自己寫 skill 的開發者"
related_skills: [writing-skills, test-driven-development]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})
>
> Part 2 第一集。預設讀者：已是 Part 1 重度用戶，現在想自己寫 skill。

Part 1 七集結束時，你應該會問：作者怎麼知道他寫的 skill 真的能讓 agent 守紀律？答案藏在每個 skill 目錄下的 `test-*.md` 檔——它們不是文件，是壓力測試 scenario。Part 2 五集要回答的元問題：怎麼寫一個經得起壓力的 skill。這集先講「為什麼寫 skill 應該被當成 TDD 來做」。

## 一個反直覺的主張：文件也能 TDD

[writing-skills/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md) 開頭就寫一句話：「Writing skills IS Test-Driven Development applied to process documentation.」這不是修辭，是真的把 TDD 的 RED-GREEN-REFACTOR 完整搬到 skill 寫作流程。

這節拆「為什麼一般 prompt engineering tutorial 是 untestable」——它們沒有失敗測試做 baseline，連「這個 prompt 比那個 prompt 好」都無從證實。

## TDD 對應到 Skill 寫作

| TDD 概念 | Skill 寫作對應 | 在 superpowers 哪裡 |
|---|---|---|
| Test case | Pressure scenario with subagent | `skills/<name>/test-*.md` |
| Production code | SKILL.md | `skills/<name>/SKILL.md` |
| RED（測試失敗） | 沒 skill 時 agent 違反規則 | 跑 baseline subagent |
| GREEN（測試通過） | 有 skill 時 agent 守規則 | 重跑同 scenario |
| Refactor | 找新 rationalization 並堵漏 | 寫進 counter-table |

這節一格一格展開，配 [systematic-debugging 的 test-* 檔](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging)當實例。

## Iron Law：沒看到 agent 失敗就不准寫 skill

writing-skills 內明文：「If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing.」

這節拆鐵律的工程動機：違反這條鐵律寫出來的 skill 通常憑感覺、自以為清楚，但 agent 實際上要嘛不會被觸發、要嘛被觸發了也不聽。

## 反直覺：先看失敗才知道要寫什麼

一般「先寫 spec 再寫 doc」的方向是 spec 驅動。superpowers 主張的是 baseline 驅動：先讓 agent 在某 scenario 失敗、記錄它的 verbatim 藉口、再寫 skill 對應堵住。

這節對照兩條路線的差別，配實際範例。

## 對照其他 prompt engineering tutorial

一般「教你寫 system prompt」的 tutorial 都缺三樣東西：失敗測試案例（無從驗證 prompt 是否有效）、rationalization 表（無從預測 agent 怎麼跳關）、enforcement layer（純文字無強制力）。

這節對照 [anthropics/skills](https://github.com/anthropics/skills) 與 superpowers 兩個 skill 集：前者偏 capability 教學，後者偏 discipline enforcement。同為 skill 集，方法論截然不同。

## 開發者能拿走什麼

讀完這集你應該能判斷：

- 自己想寫的 skill 屬於 capability 還是 discipline，後者才適用 superpowers 這套 TDD 流程
- 動筆寫 skill 前要先做什麼準備（找 baseline scenario、設想 agent 會走的歪路）

## 下集預告

下一集拆 systematic-debugging 配的 4 個 test 檔，看 pressure scenario 的設計學。
