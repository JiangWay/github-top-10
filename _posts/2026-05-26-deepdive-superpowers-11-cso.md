---
layout: post
title: "深度解析 superpowers Ep.11：CSO — 讓 skill 在 1024 字以內被找到"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 2
episode: 11
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想自己寫 skill 的開發者"
related_skills: [writing-skills, using-superpowers]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.9–10 把 skill 內部寫好（pressure scenario + rationalization 表），只完成一半。另一半是讓 Claude 在對的時機把這個 skill 叫出來——沒有這一半，skill 等於沒寫。SKILL.md 的 description 欄位是 router input：寫得太籠統會撞語意，寫得太具體會漏觸，寫得像 workflow summary 會讓 agent 跳過正文。這集拆「Claude Search Optimization」（CSO）的具體寫法。

## description = router，不是 summary

description 在這套系統裡的角色不是「介紹這個 skill 做什麼」，而是「告訴 Claude 什麼情境該載入這個 skill」。這兩個目的寫出的文字差異極大。

這節拆 description 在 Anthropic SDK 端的處理流程，講為什麼總長度（含 name）必須 < 1024 字、為什麼 description 寫得對是 skill 能不能被觸發的關鍵。

## 反模式：description 寫成 workflow summary

writing-skills 內記錄了一個慘案：原本的 description 是「Use when executing plans - dispatches subagent per task with code review between tasks」，Claude 讀完 description 後**跳過正文**直接執行 description 描述的流程——只做了一次 review 而非正文要求的兩次。

把 description 改成只描述觸發條件「Use when executing implementation plans with independent tasks in the current session」後，Claude 才會去讀正文、執行兩段式 review。

這節拆「description 不能 summarize workflow」的工程理由：description 是 shortcut，agent 會把它當成 skill 的精簡版而跳過正文。

## 「Use when…」句型公式

| 部分 | 寫法 | 例 |
|---|---|---|
| 開頭 | "Use when..." | 觸發句型固定 |
| 主體 | 具體 trigger 條件、症狀 | 「tests have race conditions, timing dependencies, or pass/fail inconsistently」 |
| 視角 | 第三人稱 | 不寫「I can help」 |
| 範圍 | 描述問題不描述技術細節 | 寫「race condition」而非「setTimeout」 |

這節給對與錯的範例對照。

## 命名守則

- active voice、動詞優先、gerund 句型
- ✅ `condition-based-waiting` ❌ `async-test-helpers`
- ✅ `creating-skills` ❌ `skill-creation`
- 名字描述「做什麼」而非「關於什麼」

這節拆命名為什麼影響 routing 準確度。

## Token 預算

| Skill 類型 | 預算 |
|---|---|
| SessionStart 必載（如 using-superpowers） | < 150 words |
| 常被載入 | < 200 words |
| 偶爾載入 | < 500 words |
| 重型 reference | 拆 separate file |

這節給每類的代表 skill 與省字技巧（cross-reference、tool help、example 壓縮）。

## 關鍵字覆蓋

description 與正文要 cover Claude 會搜尋的詞：

- error message：「Hook timed out」、「ENOTEMPTY」
- 症狀同義詞：「flaky / hanging / freeze」、「cleanup / teardown / afterEach」
- 工具與庫名：實際指令名、library 名稱

這節拆「未來 Claude 怎麼找到你的 skill」的搜尋路徑。

## 校稿清單：寫完 description 自我檢查

- 是否以「Use when…」開頭？
- 是否第三人稱？
- 是否描述 trigger 條件而非 workflow？
- 是否避免技術綁定（除非 skill 本身就是技術綁定）？
- 是否總長度 < 1024 字？
- 是否有關鍵字覆蓋？

## 開發者能拿走什麼

讀完這集你應該能：

- 寫得出讓 Claude 在對的時機載入、又不爆 token 的 description
- 判斷現有 skill 的 description 是 router 還是 summary
- 排查「為什麼某個 skill 沒被觸發」

## 下集預告

最後一集：把寫好的 skill 拿給 subagent dry-run，跑一輪完整 RED→GREEN→REFACTOR。
