---
layout: post
title: "深度解析 superpowers Ep.8：寫文件就是 process documentation 的 TDD"
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

Part 1 七集結束時，你應該會問：作者怎麼知道他寫的 skill 真的能讓 agent 守紀律？答案藏在 `writing-skills` 那份開頭的宣言裡，以及每個 discipline skill 內附的 `test-*.md` 壓力測試檔。Part 2 五集要回答的元問題：怎麼寫一個經得起壓力的 skill。這集先講最反直覺的那個前提：為什麼寫 skill 應該被當成 TDD 來做，以及這條路線跟 [anthropics/skills](https://github.com/anthropics/skills) 那種「教 agent 多一個能力」的寫法，差別在哪裡。

## 一個反直覺的主張：文件也能 TDD

[writing-skills/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md) 第一段 Overview 就把話講死：

> **Writing skills IS Test-Driven Development applied to process documentation.**

這句話的份量不在「TDD」三個字，而在 `IS`。作者沒說「像 TDD」「借鏡 TDD」「TDD 風格」，而是斷言寫 skill *就是* TDD，只是把測試對象從程式碼換成 LLM 行為。它後面跟著的具體流程是這樣：「You write test cases (pressure scenarios with subagents), watch them fail (baseline behavior), write the skill (documentation), watch tests pass (agents comply), and refactor (close loopholes).」五個動詞每一個都對得回原版 TDD 的某個動作。

這對熟悉 prompt engineering 文化的人是反直覺的。市面上多數「怎麼寫 system prompt」「怎麼寫 instruction」的 tutorial，輸出物都是一段被作者「覺得清楚」的文字。問題在於：清楚是寫的人的主觀感受，agent 會不會照做是客觀事實，兩者並不一致。這類 tutorial 因為沒有 baseline 失敗測試，連「這個 prompt 比那個 prompt 好」這種基本比較都做不到，更別提證明「prompt 改完之後 agent 真的不再犯那個錯」。writing-skills 把整套寫作從「覺得清楚」推進到「測得出來」，這是它把自己定位為 TDD 而不是 prompt-craft 的關鍵。

順著這個主張，作者把 skill 的本質也重新定義過：「Skills are reusable techniques, patterns, tools, reference guides. Skills are NOT narratives about how you solved a problem once.」一份合格的 skill 必須能被未來的 agent 在新 session 裡套用並通過行為測試，而不是某次解題的回憶錄。這個定義本身就排除了大部分「我把上次怎麼做的寫下來」的常見寫法。

## TDD 對應到 Skill 寫作

writing-skills 內附一張對應表，把 TDD 的概念逐一映射到 skill 寫作流程：

| TDD 概念 | Skill 寫作對應 | 在 superpowers 哪裡 |
|---|---|---|
| Test case | Pressure scenario with subagent | `skills/<name>/test-*.md` |
| Production code | SKILL.md | `skills/<name>/SKILL.md` |
| RED（測試失敗） | 沒 skill 時 agent 違反規則 | 跑 baseline subagent |
| GREEN（測試通過） | 有 skill 時 agent 守規則 | 重跑同 scenario |
| Refactor | 找新 rationalization 並堵漏 | 寫進 counter-table |

逐格讀有幾個地方值得停下來想。

**Test case = pressure scenario with subagent**。原版 TDD 的 test case 是一段 `assert` 程式碼，這裡換成一份描述情境的 markdown。`skills/systematic-debugging/` 目錄下的 `test-academic.md`、`test-pressure-1.md` 等檔就是這層的具體實作；它們長得像 RPG 劇本，故意給 agent 製造時間壓力、金錢壓力、權威壓力，看它會不會走捷徑。下一集會逐檔拆解。

**Production code = SKILL.md**。Skill 本文不是說明書，是「被測試保護的 production 程式碼」。任何改動都要重新跑一遍 baseline 與 GREEN scenario 驗證，邏輯跟改了一個 function 之後要重跑 test suite 一樣。

**RED = agent 在沒 skill 時違反規則**。這格最容易被誤解。RED 不能只是「我覺得 agent 大概會做錯」這種預測，必須要有 verbatim 記錄：agent 在實際 scenario 裡用了什麼藉口、做了什麼動作。writing-skills 寫得很直接：「Run pressure scenario with subagent WITHOUT the skill. Document exact behavior: What choices did they make? What rationalizations did they use (verbatim)?」沒看過真實失敗，就沒有 RED。

**GREEN = 同樣 scenario 加上 skill 後 agent 守規則**。注意「同樣 scenario」這四個字。Baseline 與驗證是同一份壓力測試檔，差別只在是否載入 skill。這保證了測到的是 skill 本身的效果，而不是換了一個比較好回答的問題。

**Refactor = 找新 rationalization 堵漏**。原版 TDD 的 refactor 是清理重複、改名、抽 helper；這裡的 refactor 是「跑更多 scenario，看 agent 還能想出什麼新藉口，把這些藉口寫進 counter-table」。一個經得起壓力的 discipline skill 通常會經過好幾輪 refactor，每一輪都會在 SKILL.md 內多一條 rationalization 表的列。

對應表底下還有一句作者沒大寫但很重要的話：「The entire skill creation process follows RED-GREEN-REFACTOR.」這是 Part 2 後面幾集（Ep.9 pressure test、Ep.10 rationalization 表、Ep.12 端到端驗證）會反覆回扣的骨幹。

## Iron Law：沒看到 agent 失敗就不准寫 skill

writing-skills 把這條原則寫得跟 test-driven-development 完全平行。原版 TDD 的鐵律是：

> NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST

writing-skills 的版本是：

> NO SKILL WITHOUT A FAILING TEST FIRST

兩條都是 ASCII art 框出來、放在文件中央位置、明文寫「No exceptions」。作者特別補一句：「This applies to NEW skills AND EDITS to existing skills.」連改一個已存在的 skill 都要先有失敗測試。下面接著列出五條「不准」：不准為「簡單新增」破例、不准為「只是補一節」破例、不准為「只是文件更新」破例、不准把沒測試過的版本留著當 reference、不准一邊測一邊改。

工程動機是這樣：違反鐵律寫出來的 skill，作者已經觀察到典型的失敗模式。要嘛 description 沒對到真實觸發語、agent 在該用的時候不會載入；要嘛載入了，agent 讀完還是憑壓力下的直覺繞過去。兩種失敗都不是改幾個字能補救的。沒有 baseline 你連這個 skill 是哪一種失敗都判斷不出來，只能憑感覺再寫一版，然後再憑感覺猜這版有沒有比較好。

把這條鐵律放在 writing-skills 開頭，等於是把整本「怎麼寫 skill」的書綁在「先看失敗」這個動作上。後面所有的 CSO、命名、token 預算、rationalization 表、紅旗清單，都是建立在已經跑過 baseline 的前提上才有意義。

## 反直覺：先看失敗才知道要寫什麼

熟悉文件寫作的人會有個本能：先寫 spec，再寫 doc。spec 列出系統「應該」怎麼做，doc 把它翻成人類看得懂的描述。Spec 是設計的源頭，doc 是 spec 的副產品。

writing-skills 反過來。它的源頭是 baseline failure：先讓 agent 在 scenario 裡失敗一遍，記下它用的藉口，再寫 skill 對著那些藉口堵。「Write minimal skill that addresses those specific rationalizations. Don't add extra content for hypothetical cases.」這句話的意思是：skill 內容是被觀察到的失敗反推出來的，不能憑想像生成。

實際上會出現這種對話：你以為 agent 在 TDD scenario 下會犯的錯是「跳過 RED 直接寫 code」，所以你想寫一個 skill 來防它。但 baseline 跑下去 agent 真正用的藉口是：「我已經手動測過了」「先把 code 留下來當 reference，等下再補 test」「再寫 test 浪費時間」。這三條藉口你不跑 baseline 是想不到的，至少想不到逐字相同的版本。skill 的 rationalization 表必須收這三條原文，不能寫成「不要跳過 test」這種對 agent 沒約束力的概括。

這就是 baseline 驅動跟 spec 驅動的差別：spec 驅動寫出來的 skill 在處理「理論上的錯誤類別」，baseline 驅動寫出來的 skill 在處理「這個模型在這種壓力下實際說出口的那一句話」。前者讀起來像哲學，後者讀起來像對某個特定對手的反制手冊。LLM 對後者比對前者敏感得多。

## 對照其他 prompt engineering tutorial

把這套方法論放回 skill 生態裡看會比較立體。市面上最主流的兩個 skill 集是 [anthropics/skills](https://github.com/anthropics/skills) 跟 [obra/superpowers](https://github.com/obra/superpowers)，看起來都是 SKILL.md 加 frontmatter 的格式，但設計目的完全不同。

**anthropics/skills 走 capability 路線**。它的 skill 像 `pdf`、`docx`、`xlsx`、`pptx` 這類，目的是給 agent 一個它本來不具備（或不熟練）的能力：怎麼操作 Word 文件、怎麼解析 Excel、怎麼生成 PowerPoint。Skill 內容偏重「怎麼做」的 reference 與 tool 整合（附 script、API 範例）。成功標準是 agent 能正確完成 task。這類 skill 用 application scenario 測就夠了：丟一個 PDF 給 agent，看它能不能正確抽出表格。

**superpowers 走 discipline 路線**。它的 skill 像 `test-driven-development`、`brainstorming`、`verification-before-completion`、`systematic-debugging` 這類，目的是強制 agent 在壓力下不要走捷徑。Skill 內容偏重「為什麼不能那樣做」的 counter-rationalization。成功標準是 agent 在多重壓力下仍然守規則。這類 skill 用 application scenario 測不出來；agent 在低壓下隨便都能照規則做，問題在 production down + $15k/min + 上司在線追問三條壓力疊加時還會不會堅持先寫 RED。

writing-skills 自己把 skill 分成四類：discipline-enforcing、technique、pattern、reference。對 capability 路線來說，後三類的測法都很直接：給情境，看 agent 能不能應用。但 discipline-enforcing 這類必須走 TDD 流程，因為它要驗的不是「會不會做」，而是「會不會在不想做的時候還是做」。這也是為什麼 TDD-for-skills 這套方法論在 superpowers 裡會被推到中心位置，而 anthropics/skills 並沒有強調同樣的東西：兩邊要解的問題不同。

對你的意義：動筆前先判斷你要寫的 skill 屬於哪一邊。如果是 capability（「教 agent 用某個工具」「教 agent 處理某個檔案格式」），參考 anthropics/skills 的 SKILL.md 範本、寫好 reference 與 script、用 application scenario 測通就好。如果是 discipline（「強迫 agent 不要在某種狀況下偷懶」「強迫 agent 在某個 gate 前停下來」），就必須走 writing-skills 那套完整 TDD 流程，沒有捷徑。

## 開發者能拿走什麼

讀完這集，你動筆寫第一個 skill 之前可以先回答三個問題。

**第一，分類**。你想寫的是 capability 還是 discipline？兩種都合法，但方法論不同。寫之前先想清楚是哪一種，不然會用錯工具：拿 application scenario 去驗 discipline skill，會誤判 skill 有效；拿 pressure scenario 去驗 capability skill，會把測試寫得過度複雜。

**第二，baseline scenario**。如果你寫的是 discipline skill，動筆前先準備好一份 pressure scenario：一段任務描述、一組外部壓力（時間、金錢、權威、疲勞），以及 agent 可能被誘導去選的「妥協選項」。然後 dispatch 一個沒有載入你那份 skill 的 subagent，把它的回應逐字存下來。這份 verbatim transcript 就是你後面寫 SKILL.md 時所有 counter-table、紅旗清單、Spirit-vs-Letter 預先聲明的素材來源。

**第三，最小可寫範圍**。Skill 的第一版只該回應 baseline 裡真實出現過的藉口，不要為「萬一未來 agent 會這樣想」的假想敵預先加防線。GREEN phase 結束後再進 REFACTOR，跑更多 scenario、收更多新藉口、回頭擴 counter-table。這個順序跟 TDD 的 YAGNI 原則完全平行：don't add features beyond the test。

如果這三個問題現在還沒有具體答案，那是正常的，下一集會給你逐檔可參考的 pressure test 範本。

## 下集預告

Ep.9 拆 `skills/systematic-debugging/` 配的四份 test 檔：`test-academic.md`（純理解）、`test-pressure-1.md`（production down + $15k/min）、`test-pressure-2.md`、`test-pressure-3.md`。下一集會看 pressure scenario 怎麼設計才能逼出 agent 真實的 rationalization，以及「妥協選項 C」這個關鍵陷阱在 scenario 裡的位置。
