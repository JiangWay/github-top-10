---
layout: post
title: "深度解析 superpowers Ep.7：元層 — 自我繁殖的 superpowers"
date: 2026-05-26
published: false
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

Ep.6 收完一個完整 task lifecycle。這集進元層——撐起整個 superpowers 的兩個 meta skill：using-superpowers（router）與 writing-skills（作者教你寫 skill 的 skill）。看完這兩個 skill 你會明白：superpowers 不只是一組 skill，它是一個能自我繁殖的方法論軟體。

## using-superpowers：紅旗清單與優先順序

[using-superpowers/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md) 是 SessionStart 必經入口。每次 session 開頭這個 skill 一定被載入。它的職責不是執行任務，是 router：告訴 agent「你現在的情境該找哪個 skill」。

對應 Ep.1 表第 3、4 種失敗：紅旗清單擋掉「This is just a simple question」這類 rationalization，避免 agent 跳過 brainstorming（防第 4 種失敗）；正確 routing 確保不該載入的 skill 不會被載入（防第 3 種 context 污染）。

這節拆兩件事：(1) 紅旗清單裡常見的 rationalization 各對到哪種使用者觀察的徵兆 (2) skill 優先順序（process > implementation）在主 agent 行為上會展現成什麼樣子。

## 三層優先序：user > superpowers > system prompt

skill 內明文寫的：user 指令 > superpowers 規則 > 預設 system prompt。這個順序的政治意義：superpowers 不會強制覆蓋 user 意願，user 永遠最大。

這節拆這條規則的設計動機——避免「使用者覺得被外掛綁架」的反作用。

## writing-skills：作者教你寫 skill 的 skill

[writing-skills/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md) 把「怎麼寫一個經得起測試的 skill」本身寫成 skill。meta 程度極高——這個 skill 是 Part 2 整整 5 集的源頭。

這節作為 Part 1 → Part 2 的橋樑：講 writing-skills 的核心主張「寫 skill 就是 process documentation 的 TDD」，但只開頭，深入留給 Ep.8。

## Part 1 結語：把方法論變成軟體的工程啟示

走完 Ep.1–7 你應該有兩個收穫：(1) 對「方法論軟體化」的可行性界線有具體判斷 (2) 對自己 Claude Code 用得好不好有 mental model 去診斷。

這節用 1–2 段收尾，避免長篇感言。

## 接 Part 2：想自己寫 skill 嗎？

到這你已經會解釋 superpowers 在做什麼，但有個更深的問題：作者怎麼**知道**他寫的 skill 真的能讓 agent 守紀律？線索藏在每個 skill 目錄下的 `test-*.md`（包含 academic 與 pressure-1/2/3）——那是真正的測試案例。Part 2 從這裡開始拆 skill 寫作的元方法論。

回到[系列入口]({{ site.baseurl }}{% link series/superpowers/index.md %})可查 Part 2 所有集數與勘誤。
