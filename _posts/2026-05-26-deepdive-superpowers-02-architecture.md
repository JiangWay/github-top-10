---
layout: post
title: "深度解析 superpowers Ep.2：架構解剖 — 一個 Skill 怎麼被觸發"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 1
episode: 2
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想用 superpowers 的 Claude Code 重度用戶"
related_skills: [using-superpowers, writing-skills]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.1 講為什麼要 superpowers，這集回答「按下 Enter 之後究竟發生了什麼」。從 SessionStart 載入 using-superpowers 開始，到一個 skill 被觸發、執行、把控制權交回主 agent，背後有四層機制：plugin manifest、description routing、SKILL.md 本體、hook 後盾。看懂這四層，下次 session 卡住時你可以定位是哪一層出問題。

## Plugin 層：.claude-plugin/plugin.json 與 SKILL.md frontmatter

[obra/superpowers](https://github.com/obra/superpowers) 的 Claude Code 入口是 [.claude-plugin/plugin.json](https://github.com/obra/superpowers/blob/main/.claude-plugin/plugin.json)；另外還維護 `.cursor-plugin/plugin.json` 與 `.codex-plugin/plugin.json` 供其他平台使用。Claude Code 啟動時讀這個 manifest、掃描 skill 目錄、把每個 skill 的 description 注入 system prompt。SKILL.md 的 frontmatter 規範極簡：`name`（kebab-case）與 `description`（"Use when..." 句型），可選 metadata。

這節要做兩件事：(1) 逐欄位拆 frontmatter 設計取捨——為什麼只有 2 個必填欄位、為什麼總長度 < 1024 字、為什麼禁用特殊字元 (2) 對照三份 plugin.json（Claude / Cursor / Codex）的異同，講「跨工具部署同一份 skill」的工程設計。

## description 就是 router

description 在這套系統裡的角色是 router input 而非 marketing copy。Agent 收到 task 後對照所有 skill 的 description，決定該載入哪些。寫得太籠統會造成跨 skill 撞語意（兩個 skill 都覺得自己該被載入）；寫得太具體會漏觸（task 描述沒撞到關鍵字）。

這節拆 routing 機制：description 在 Anthropic SDK 端如何被處理、什麼樣的 task 描述會啟動 brainstorming、什麼樣的會啟動 systematic-debugging。

## Skill 內部解剖

每個 skill 目錄結構固定：

```
skills/<name>/
├── SKILL.md          ← 主檔（< 500 words 為佳）
├── references/       ← 重型參考（API、語法）
├── scripts/          ← 可執行工具
└── examples/         ← 範例（一個就夠）
```

SKILL.md 是 agent 載入時讀的主檔；references/ 只在 SKILL.md 明確指引時才讀；scripts/ 在 agent 決定執行時呼叫；examples/ 是風格參考。

這節用 [systematic-debugging](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging)（含 references + scripts + 多個 test 檔）與 [using-git-worktrees](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees)（只有 SKILL.md）對比，講「為什麼有的 skill 結構複雜，有的只要一個檔」。

## Hook 系統：把 markdown 變成可執行 gate

光靠 agent 自律守 markdown HARD-GATE 不夠（早期版本的教訓）。superpowers 在 [hooks/](https://github.com/obra/superpowers/tree/main/hooks) 目錄掛上 PreToolUse、PostToolUse、SessionStart、Stop 等 event 的攔截腳本，agent 想跳關時 hook 直接擋下。

這節對照實際 hook 腳本與 SKILL.md 內的對應規則，講「文件守不住就靠程式守」如何在工程上實作。具體版本引入時間以撰寫前對 [RELEASE-NOTES.md](https://github.com/obra/superpowers/blob/main/RELEASE-NOTES.md) 的查證為準。

## Skill 鏈式調用

[using-superpowers/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md) 是 SessionStart 必經入口（v5.1 設定）。它本身的職責是 router 而非執行者，載入後立刻引導 agent 去找該用的下一個 skill。鏈條典型路徑：using-superpowers → brainstorming → writing-plans → executing-plans。

這節畫鏈條圖，講「為什麼一定要有 using-superpowers 這個 meta 層」。

## 主 agent ↔ subagent 的職責切割

主 agent 守完整 task lifecycle；subagent 接獨立子任務（code review、research、worktree 內的隔離工作）。切割原則：context 大小、可重複性、權限隔離。

這節拆 [dispatching-parallel-agents](https://github.com/obra/superpowers/blob/main/skills/dispatching-parallel-agents/SKILL.md) 與 [subagent-driven-development](https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md)（Ep.5 細講），講主 agent 怎麼決定「什麼時候要 fan-out 而不是自己做」。

## 實戰場景：你會看到什麼

打開 Claude Code 下指令時，你會看到的 system-reminder（例 "Using brainstorming to..."）是哪一層生成的？某個 skill 沒被觸發怎麼診斷？這節舉三個常見 session pattern：

- 「為什麼 brainstorming 沒啟動」：description 撞不到關鍵字
- 「為什麼明明該停止卻繼續寫碼」：HARD-GATE 沒對到 hook
- 「為什麼 subagent 沒收回結果」：fan-in 條件沒寫對

## 踩坑與最佳實踐

- 描述任務太籠統：補關鍵字觸發特定 skill
- 跨 skill 撞語意：檢查 description 重疊處
- subagent context 污染：用 worktree 而非單純 branch

## 下集預告

下一集進入流程主幹：brainstorm → plan → execute 三步如何銜接。
