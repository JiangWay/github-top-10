---
layout: post
title: "深度解析 superpowers Ep.10：Rationalization 表 — 抓出 agent 的真實藉口"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 2
episode: 10
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想自己寫 skill 的開發者"
related_skills: [writing-skills]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.9 你跑完 pressure test 拿到 agent 失敗的紀錄。這集講後半：怎麼把 agent 的 verbatim 藉口蒐集起來、變成 skill 內可重複使用的 rationalization 表。這張表是 superpowers 所有 discipline skill 的核心，也是寫 skill 最不可省的部分。

## Baseline test 怎麼跑

用 Task tool dispatch subagent，給它與 pressure scenario 同等的情境提示，**不給** skill。讓 subagent 自然作答，記錄它：

- 選了哪個選項
- 給出什麼推理
- 用什麼具體語句

這節拆 baseline test 的執行細節：Task 與 chat 兩種 dispatch 方式的差別、為什麼要跑多次（不同 seed、不同 model）、什麼算「足夠」的 baseline。

## 蒐集 verbatim 藉口

關鍵原則：要 verbatim 不能改寫。Agent 用什麼語句辯解（「This is too small to test」「I'll test after」「Tests after achieve the same goals」），就照原樣記錄。

這節拆「為什麼必須是原句」：改寫過的藉口無法觸發 agent 自我對照——當下次 agent 在 session 中想說同樣的話時，原句出現在 rationalization 表會被 agent 自己抓到並打斷推理鏈。

## 把藉口變成 counter-table

範例（取自 [writing-skills SKILL.md](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md)）：

| 藉口 | Reality |
|---|---|
| 「Too simple to test」 | Simple code breaks. Test takes 30 seconds. |
| 「I'll test after」 | Tests passing immediately prove nothing. |
| 「Tests after achieve same goals」 | Tests-after = "what does this do?" Tests-first = "what should this do?" |

設計學：左欄是 agent 的原句，右欄是 30 字以內的反駁。短到能在 session 中被快速讀到、長到能切斷推理鏈。

這節對照「好的 counter」與「壞的 counter」：太長 agent 略過、太短沒擊中要害、太抽象沒對位。

## 紅旗清單（Red Flags）

| 角色 | 寫法 | 觸發時機 |
|---|---|---|
| counter-table | 對每個 rationalization 配反駁 | agent 開口辯解後對沖 |
| red flags | 列出「正在想這些就 STOP」的訊號 | agent 開始想辯解前就警告 |

兩者職責不同，搭配使用才完整。

## 「Spirit vs Letter」必須在 skill 前段就堵掉

agent 最強的 rationalization 是「我是遵守精神而不是字面」。一旦讓 agent 進入這個論述就很難拉回。

writing-skills 的標準對策：在 skill 前段直接寫「Violating the letter of the rules is violating the spirit of the rules.」一句斷掉整類辯論。

這節拆「為什麼這句話放前段而非結尾」、為什麼不留討論空間。

## 多輪 REFACTOR：發現新藉口怎麼處理

跑完 baseline、寫完 skill、重跑 scenario 後，agent 可能還是會繞——只是換新藉口。這時不改規則本身，把新藉口加到 counter-table。

這節拆持續迭代的工作流：什麼時候停（compliance 達標）、什麼時候要繼續加 counter。

## 開發者能拿走什麼

讀完這集你應該能：

- 把 baseline 跑出來的 agent 藉口轉成 skill 內表格的具體格式
- 判斷自己的 counter 寫得夠不夠犀利
- 處理迭代過程中出現的新 rationalization

## 下集預告

下一集進 CSO：description 與命名，讓你的 skill 在對的時機被 Claude 載入。
