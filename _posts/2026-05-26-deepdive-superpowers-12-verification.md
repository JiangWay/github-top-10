---
layout: post
title: "深度解析 superpowers Ep.12：驗證 skill 可用 — subagent 測試完整流程"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 2
episode: 12
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想自己寫 skill 的開發者"
related_skills: [writing-skills, subagent-driven-development, dispatching-parallel-agents]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.8–Ep.11 給你寫一個 skill 的完整工具：TDD 心法、pressure scenario、rationalization 表、CSO。這集把工具串起來做一輪端到端：派 subagent 跑 baseline、寫 skill、重跑、抓新 rationalization、補 counter、再驗。完成這集你會有一條「寫 → 測 → 改 → 發佈」可重複的個人工作流。

## Subagent dry-run 怎麼跑

用 Task tool 派 general-purpose subagent 跑你寫的 pressure scenario。重點：

- prompt 含 scenario 全文 + 預期 agent 行為
- 不要載入你寫的 skill（baseline 階段）
- 記錄 verbatim output

這節拆 prompt template 的設計（哪些必須有、哪些不該有），講怎麼確保 subagent 不受主 agent context 影響。

## 怎麼判斷 skill「真的有效」

| 指標 | 標準 |
|---|---|
| compliance rate | 跑 N 次有幾次守紀律 |
| 期望值 | discipline skill 100%、technique skill 80%+ |
| 失敗診斷 | 抓 agent 跑去哪個 rationalization |

這節拆指標的計算方式與「足夠好」的判斷。

## 端到端範例：寫一個 minimal skill 走完 RED→GREEN→REFACTOR

範例題目：寫一個 skill「不准 commit 不含測試的 PR」。

1. **RED**：跑 3 個 pressure scenario（時間壓力 / 沉沒成本 / 「這只是 hotfix」），記錄 agent 在哪幾條會直接 commit
2. **GREEN**：寫最小 skill 含 description（"Use when..."）+ 一條規則 + 一張 rationalization 表（覆蓋上述 3 種藉口）
3. **重跑**：跑同樣 3 個 scenario，看 compliance 是否 100%
4. **REFACTOR**：若有新藉口（「這個 patch 不會 break test」），加進 counter-table
5. **再驗**：跑直到 compliance 達標

這節用真實 code blocks 走完 5 步，讓讀者可以照做。

## 持續迭代：發現新 rationalization 怎麼處理

實際使用 skill 時你會發現 baseline 沒覆蓋到的藉口。這時不改規則本身，回頭把新藉口加進 counter-table。

這節拆「skill 維護的生命週期」：什麼時候該重跑 baseline、什麼時候該寫新 skill 而非擴充舊的。

## 把 skill 提交回 marketplace

[obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) 接受社群提交 skill。提交前必須附：

- pressure scenario 與 baseline test 結果
- rationalization 表
- 至少一輪 GREEN 驗證
- description 的 CSO 校稿

這節拆 review 流程的注意點與常見退件原因（fork-specific 改動、未驗證 skill、複製貼上他人 skill 等，可參考 [v5.1.0 release notes](https://github.com/obra/superpowers/releases/tag/v5.1.0) 中作者列的 PR 拒收清單）。

## 系列收尾：重度用戶 → 開發者的進路圖

走完 Part 1 + Part 2 你應該能：

- 重度使用 superpowers，能向團隊解釋它做什麼
- 寫一個經得起壓力的 skill 並貢獻回 marketplace
- 把「方法論軟體化」這個工程模式應用到自己的 plugin / agent framework

回到[系列入口]({{ site.baseurl }}{% link series/superpowers/index.md %})可查所有集數與勘誤。
