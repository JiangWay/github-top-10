---
layout: post
title: "深度解析 superpowers Ep.9：Pressure Test 拆解 — scenario 檔的設計"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 2
episode: 9
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想自己寫 skill 的開發者"
related_skills: [systematic-debugging, writing-skills]
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

Ep.8 講「寫 skill 是 TDD」。這集進實作：怎麼設計一個 pressure test scenario。[skills/systematic-debugging/](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) 目錄附 4 個測試檔——1 個 academic、3 個 pressure。這集逐一拆解、最後抽出「壓力類型五大類」與可複用的 scenario 模板。

## 拆 test-academic.md：純理解測試

[test-academic.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-academic.md) 用學術題目問 agent「systematic debugging 是什麼、為什麼重要」。沒有壓力、沒有時間限制、純粹考概念。

這節拆「為什麼純理解測試也是必要的 baseline」——能說出原則不等於能執行原則，這是 TDD 對 skill 的最低門檻。許多 skill 過了 academic 但過不了 pressure，這個落差才是真正要堵的地方。

## 拆 test-pressure-1.md：時間 + 金錢 + 權威

來源：[test-pressure-1.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-pressure-1.md)。情境：production down、$15k/min 損失、主管怒催「FIX IT NOW」。給三選項：A 走流程（35 分鐘）/ B 快補（5 分鐘）/ C 妥協（折衷快查）。

這節逐段拆 scenario 的設計動機：(1) 壓力為什麼疊三層 (2) 三選項是「對 / 錯 / 看起來合理的錯」如何安排 (3) 「Be honest about what you would actually do」這句話為什麼必要——沒這句 agent 會給「正確答案」而非真實答案。

## 拆 test-pressure-2.md

來源：[test-pressure-2.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-pressure-2.md)

<!-- 撰寫前要實際讀檔補上：壓力組合（預期不同於 test-pressure-1 的時間+金錢+權威；可能是沉沒成本 / 疲勞 / 社會壓力其中之一或多重）、選項陷阱設計、與 test-pressure-1 的互補性。 -->

## 拆 test-pressure-3.md

來源：[test-pressure-3.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/test-pressure-3.md)

<!-- 撰寫前要實際讀檔補上：同 test-pressure-2 規範。三個 pressure test 加起來應該覆蓋大部分常見壓力組合。 -->

## 壓力類型五大類

| 壓力類型 | 觸發藉口 | 對應 counter |
|---|---|---|
| 時間 | 「來不及走流程」 | 列舉走流程實際耗時 vs 跳關後 rework 時間 |
| 沉沒成本 | 「都寫到一半了」 | 沉沒成本不是論證、未來收益才是 |
| 權威 | 「主管說要快」 | user 永遠最大，紀律不等於違命 |
| 疲勞 | 「半夜三點不想思考」 | 列出疲勞時最容易跳的具體步驟 |
| 社會壓力 | 「同事都這樣做」 | skill 內紀律不是個人喜好 |

這節給每類 1–2 個現實情境，並對應到 systematic-debugging 內的 counter（要回 [SKILL.md](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md) 找實際語句）。

## 為什麼要疊加多種壓力

單一壓力 agent 容易守得住：時間緊但金錢不緊，agent 會「先走流程後補」；時間緊且金錢緊但主管沒催，agent 仍可能走流程；三者疊加才真的見真章。

這節拆「壓力疊加」的設計動機與工程取捨。

## A/B/C 三選項的設計學

選項設計三條原則：

- **B 必須誘人**：表面看是合理 trade-off，agent 容易被吸引
- **C 是最危險陷阱**：「妥協」聽起來成熟，仍違反紀律
- **A 看起來笨**：走完整流程在壓力下顯得「不專業」

這節拆三選項的攻防設計，並提供「自己寫 pressure test」的範本。

## 開發者能拿走什麼

讀完這集你應該能：

- 為自己寫的 discipline skill 設計可重複的 pressure scenario
- 判斷現有 scenario 是否壓力夠（測得出真實 compliance）
- 套用「五大壓力類 × 三選項」的範本快速產 baseline

## 下集預告

下一集講 baseline 跑完之後，怎麼把 agent 的 verbatim 藉口變成 skill 內的 rationalization 表。
