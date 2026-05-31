---
layout: post
title: "深度解析 superpowers Ep.11：CSO — 讓 skill 在 1024 字以內被找到"
date: 2026-05-26
published: true
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

Ep.9–10 把 skill 內部寫好（pressure scenario + rationalization 表），只完成一半。另一半是讓 Claude 在對的時機把這個 skill 叫出來——沒有這一半，skill 等於沒寫。SKILL.md 的 description 欄位是 router input：寫得太籠統會撞語意，寫得太具體會漏觸，寫得像 workflow summary 會讓 agent 直接照 description 做事而跳過正文。這集拆「Claude Search Optimization」（CSO）的具體寫法。

## description = router，不是 summary

description 在這套系統裡的角色，是告訴 Claude「什麼情境該載入這個 skill」，而非「介紹這個 skill 做什麼」。前者是 routing 決策的輸入，後者是 README 的開場白。寫法上的差異看似細微，效果差很多。

技術背景：SKILL.md 的 frontmatter 會在 session 啟動或 skill 索引建立時被讀進 system prompt，作為 router 的候選清單。每一條 entry 的 `name + description` 總長度上限是 1024 字元（agentskills.io 規範）。Claude 在判斷「現在要不要載入這個 skill」時，看的就是這一段——不是 SKILL.md 的正文。

換句話說，description 出現在「決定要不要讀 skill」的那一刻；正文要等決定載入之後才會被讀。description 寫錯，正文寫得再好都沒用——它根本不會被翻開。

這也解釋了 1024 字元上限為什麼存在：每一個 skill 的 description 都會與其他 skill 競爭 system prompt 的空間，預算超過就要被擠掉或截斷。CSO 的整套技巧，本質上是「在 1024 字元預算內把 routing signal 寫到最強」。

## 反模式：description 寫成 workflow summary

`writing-skills` 的 CSO 段落記錄了一個原作者實測出來的慘案，值得整段引出來看。

某個 skill 原本的 description 是：

```
Use when executing plans - dispatches subagent per task with code review between tasks
```

句子裡有兩個動作：「dispatch subagent per task」與「code review between tasks」。看起來像是觸發條件加上一小段流程說明，很自然的寫法。

問題出在實測：Claude 讀完 description 後，**直接照 description 描述的流程做事，跳過 SKILL.md 正文**。正文的 flowchart 其實明確要求做兩次 review——一次驗 spec compliance、一次驗 code quality——但 description 只提到「code review」單數一次，agent 就只做了一次。

修正方式是把 description 砍成純觸發條件：

```
Use when executing implementation plans with independent tasks in the current session
```

description 不再提到 review 流程，agent 就會回去讀正文、看到 flowchart、執行兩段式 review。

這背後的機制叫做「shortcut trap」：當 description 既描述觸發條件又附帶流程說明，agent 會把它當成 skill 的精簡版。對 agent 來說，既然 description 已經把該做的事說完了，正文就是補充材料、可以略讀。description 越像 summary，這個 shortcut 越強。

CSO 第一條鐵律：**description 只寫「什麼時候用」，絕不描述「怎麼用」**。

## 「Use when…」句型公式

把上面那個原則操作化，就是這個句型公式：

| 部分 | 寫法 | 例 |
|---|---|---|
| 開頭 | "Use when..." | 觸發句型固定 |
| 主體 | 具體 trigger 條件、症狀 | 「tests have race conditions, timing dependencies, or pass/fail inconsistently」 |
| 視角 | 第三人稱 | 不寫「I can help」 |
| 範圍 | 描述問題不描述技術細節 | 寫「race condition」而非「setTimeout」 |

幾組對照範例（取自 `writing-skills` 與 superpowers 內各 skill 的實際 frontmatter）：

```yaml
# BAD: 太抽象，沒講何時用
description: For async testing

# BAD: 第一人稱、像聊天
description: I can help you with async tests when they're flaky

# BAD: 綁死技術細節，但 skill 本身不限 setTimeout
description: Use when tests use setTimeout/sleep and are flaky

# GOOD: Use when 開頭 + 描述問題 + 第三人稱
description: Use when tests have race conditions, timing dependencies, or pass/fail inconsistently

# GOOD: 技術專用 skill 就把技術寫進 trigger
description: Use when using React Router and handling authentication redirects
```

實際運作中的「Use when…」三個範例，取自 superpowers v5.1.0：

```yaml
# using-superpowers/SKILL.md
description: Use when starting any conversation - establishes how to find and use skills,
  requiring Skill tool invocation before ANY response including clarifying questions

# systematic-debugging/SKILL.md
description: Use when encountering any bug, test failure, or unexpected behavior,
  before proposing fixes

# executing-plans/SKILL.md
description: Use when you have a written implementation plan to execute in a separate
  session with review checkpoints
```

三個都遵守同樣的結構：`Use when` + trigger 條件 + 可選的「before X」收尾。沒有任何一個提到「步驟」、「方法」、「流程」這類字眼。trigger 是症狀（encountering a bug）或狀態（have a written plan），不是動作。

`brainstorming` 是一個刻意的例外：它用「You MUST use this before any creative work...」開頭而非「Use when…」，因為作者要把 routing signal 推到「強制」的層級。這種破格是設計選擇，不是格式錯誤——但除非你能明確說出破格的理由，預設仍然應該守住「Use when…」公式。

## 命名守則

skill name 也是 routing signal 的一部分。它出現在 description 之前，會被 Claude 當成第一道分類訊號。

四條規則：

- **active voice、動詞優先**：名字描述「做什麼動作」，不是「關於什麼主題」
- **gerund（-ing）句型適合流程類 skill**：`creating-skills`、`testing-skills`、`debugging-with-logs`
- **用「核心動作」或「核心 insight」命名，不要用泛稱**
- 只用字母、數字、連字號；不含括號或特殊字元

對照：

| 不好 | 好 | 為什麼 |
|---|---|---|
| `skill-creation` | `creating-skills` | gerund 描述動作，名詞描述主題 |
| `async-test-helpers` | `condition-based-waiting` | 後者點出技術核心而非泛稱 |
| `data-structure-refactoring` | `flatten-with-flags` | 後者帶出具體手法 |
| `debugging-techniques` | `root-cause-tracing` | 後者描述方法本體 |
| `skill-usage` | `using-skills` | 動詞優先 |

命名為什麼影響 routing 準確度：當 Claude 在做 skill 選擇時，name 與當前任務的 verb 越接近，匹配信心越強。`creating-skills` 對應「我現在要建立新 skill」這個動作很直接；`skill-creation` 是名詞短語，需要多繞一次語意才能對應到動作。在多 skill 競爭、context 已經很擠的情況下，這一點差別就會影響選誰。

## Token 預算

description 受 1024 字元限制，正文則受「載入頻率」限制。常被載入的 skill 每次都會吃 context，正文越短越好。

| Skill 類型 | 預算 | 代表 |
|---|---|---|
| SessionStart 必載（如 using-superpowers） | < 150 words | `using-superpowers` |
| 常被載入 | < 200 words | `executing-plans` |
| 偶爾載入 | < 500 words | `writing-skills` 主文（重型 reference 已外移） |
| 重型 reference | 拆 separate file | `writing-skills/persuasion-principles.md`、`testing-skills-with-subagents.md` |

`writing-skills` 給了三個省字技巧，每一個都是針對「重複資訊」開刀：

**省字技巧一：把參數細節推給 tool help**

```bash
# BAD：在 SKILL.md 裡列所有 flag
search-conversations supports --text, --both, --after DATE, --before DATE, --limit N

# GOOD：指向 --help
search-conversations supports multiple modes and filters. Run --help for details.
```

**省字技巧二：用 cross-reference 取代重複正文**

當兩個 skill 描述同樣的 workflow，後寫的那個不要再寫一遍，引用前者即可：

```markdown
# BAD：在當前 skill 裡重述 20 行 subagent 派發流程
When searching, dispatch subagent with template...

# GOOD：cross-reference
Always use subagents (50-100x context savings).
**REQUIRED:** Use [other-skill-name] for workflow.
```

注意是 `[skill-name]` 形式而非 `@skill-name`——後者會強制立即載入該檔，把 200k token 燒掉一大塊。

**省字技巧三：壓縮範例**

對話範例最容易膨脹。把背景描述砍到剩骨架就好：

```markdown
# BAD：42 字
your human partner: "How did we handle authentication errors in React Router before?"
You: I'll search past conversations for React Router authentication patterns.
[Dispatch subagent with search query: "React Router authentication error handling 401"]

# GOOD：20 字
Partner: "How did we handle auth errors in React Router?"
You: Searching...
[Dispatch subagent → synthesis]
```

驗證方式很簡單：

```bash
wc -w skills/path/SKILL.md
```

數字落在預算內才算過關。

## 關鍵字覆蓋

description 與正文都要鋪 Claude 會主動搜尋的詞。這個動作叫 keyword coverage，是 CSO 第三條主軸。

三類詞要覆蓋：

- **錯誤訊息原文**：「Hook timed out」、「ENOTEMPTY」、「race condition」——agent 遇到 error 時會直接拿錯誤訊息當搜尋 query，原文出現過的 skill 命中率最高
- **症狀同義詞**：同一個現象有多種說法，全部鋪一遍。「flaky / hanging / freeze / zombie / pollution」、「cleanup / teardown / afterEach」都是同義群
- **工具與庫名**：實際的指令名、library 名、檔案副檔名。寫「pytest」「jest」「playwright」而不是「testing framework」

為什麼這個動作叫「未來 Claude 怎麼找到你的 skill」：當你寫完 skill 部署出去，未來某個 session 的 Claude 遇到某個 bug，它的搜尋 query 不會剛好用你寫 description 時的措辭。它會用 user 報錯的原文、用它自己內建詞庫的同義詞。覆蓋這些變體，是讓 routing 命中的關鍵。

`systematic-debugging` 的 description 是反例值得學的對象——它只寫「Use when encountering any bug, test failure, or unexpected behavior」，看似很泛。但「bug」「test failure」「unexpected behavior」三個都是 user 真實會用的描述語，幾乎涵蓋所有 debug 觸發場景。泛中有準。

## 校稿清單：寫完 description 自我檢查

把上面所有規則收成一張 checklist，寫完 description 對著跑一遍：

- 是否以「Use when…」開頭？（除非有明確破格理由）
- 是否第三人稱？沒有「I」「we」「you can」
- 是否描述 trigger 條件而非 workflow？沒有提到「步驟」「流程」「方法」
- 是否避免技術綁定（除非 skill 本身就是技術綁定）？
- 是否總長度（name + description）< 1024 字元？
- 是否鋪了錯誤訊息原文、症狀同義詞、工具庫名？
- 是否 name 用 active voice、動詞優先？

任一項打勾不過就回去修。description 的 ROI 極高——多花 10 分鐘把這張表跑完，省下未來 skill 被誤觸或漏觸的所有 debug 時間。

## 開發者能拿走什麼

讀完這集你應該能：

- 寫得出讓 Claude 在對的時機載入、又不爆 token 的 description
- 判斷現有 skill 的 description 是 router 還是 summary，看到 workflow summary 知道要砍
- 排查「為什麼某個 skill 沒被觸發」：先看 description 是否撞觸發語、再看 keyword coverage、最後看 name 是否動詞優先

## 下集預告

description 寫好不代表 skill 真的能用。最後一集把寫好的 skill 拿給 subagent dry-run，跑一輪完整 RED→GREEN→REFACTOR，看怎麼判斷一個 skill 算「驗證通過」。
