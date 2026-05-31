---
layout: post
title: "深度解析 superpowers Ep.1：為什麼資深工程師紀律可以寫成 markdown gate"
date: 2026-05-26
published: false
series: superpowers-deepdive
part: 1
episode: 1
target_repo: obra/superpowers
based_on_version: v5.1.0
hub: /series/superpowers/
audience: "想用 superpowers 的 Claude Code 重度用戶"
related_skills: []
tags: [深度解析, superpowers, AI Agent 框架, Skill 外掛]
---

> 系列入口：[深度解析 superpowers]({{ site.baseurl }}{% link series/superpowers/index.md %})

讓 Claude Code 寫個 feature，最常見的失敗其實很少是寫錯字、走錯邏輯，而是該問的沒問、該停的沒停。你叫它「加個 OAuth 登入」，它五秒鐘後就在 `app/auth.py` 動手；你叫它「修這個測試壞掉」，它直接改 assertion 讓綠燈亮起來。看起來在工作，實際在規避工程紀律。

[obra/superpowers](https://github.com/obra/superpowers)（v5.1.0，2026-05-04 釋出，截至 2026-05-27 累計 207,687 stars）把這些「該停、該問、該驗」用 markdown 寫成可機械強制的規則，由 agent 自己讀、自己擋、自己 routing。整套外掛的本質是一個**讓 agent 自我抑制**的軟體系統，而非另一份 prompt template。

第一集要回答兩件事：作者看到了什麼問題，以及為什麼這個答案值得 Claude Code 重度用戶花時間搞懂。整集後面講的「設計理念三支柱」會持續扣回前段的失敗模式表，每講一個機制都要對得回某一種具體崩潰。對不回的，就是 over-engineering。

## 問題：AI coding agent 的失敗模式

沒有方法論層時，coding agent 的崩潰路徑可歸納為四種。每一種的本質都是 agent 在錯誤的時機做了錯誤的事，而非 LLM 寫錯 token。superpowers 用一個（或一組）skill 對應處理：

| 失敗模式 | 對應 skill |
|---|---|
| 直覺修 bug 越修越壞，沒定位 root cause | `systematic-debugging` |
| 先寫 implementation 才補測試，只能驗「沒壞」 | `test-driven-development` |
| 跑久了 context 污染、前後論述彼此干擾 | `using-git-worktrees`、`subagent-driven-development`、`dispatching-parallel-agents` |
| 問題沒問清楚就寫碼，產出整段重來 | `brainstorming`、`writing-plans` |

這張表是整集的指北針。設計理念三支柱、演進線、對照表，全都要對得回上表某一格。

四種失敗模式的真實樣貌，重度用戶大概都遇過至少一種。**直覺修 bug**：CI 紅了，agent 看到錯誤訊息直接改該行，測試綠了就 commit；隔天另一個測試紅，原來是同一個 root cause 在另一處冒出來。**先寫 implementation**：你說「順便補測試」，agent 寫完 200 行才開始寫測試，測試自然全綠，因為它是照著已寫好的程式碼設計的，根本沒測到任何分支。**context 污染**：跑了 90 分鐘的 session，agent 開始堅持某個你十分鐘前才否決的設計，原因只是前文還在 context 裡。**沒問清楚就寫**：你說「幫我加個 user table」，agent 預設了 email、password、created_at 三欄就動手，沒人問你要不要 soft delete、要不要多 tenant。

<!-- 撰寫前需查證: 自己 Claude Code session 中至少一段四類失敗的真實 trace；含時間戳、user prompt、agent 回應前三句、出錯瞬間，貼進每一類後面當實例。 -->

## 人：Jesse Vincent 與 Prime Radiant 的觀察

superpowers 的作者是 [Jesse Vincent](https://blog.fsck.com/)，他與 [Prime Radiant](https://primeradiant.com) 團隊一起維護這套外掛。專案 [release announcement](https://blog.fsck.com/2025/10/09/superpowers/) 寫在 2025-10-09，與第一個 GitHub release 同日。

讀作者的部落格與專案 README 可以歸納出一個核心觀察：資深工程師之所以資深，關鍵在**懂得在該停下來釐清的時刻真的停下來**，這比能寫多複雜的演算法更重要。這個習慣很難用「教 prompt」教給 LLM。你寫一句「請先 clarify」它聽得進去，五個 turn 之後它會忘記。把這個習慣編碼成可以**在每個 session 自動載入、在每個關鍵動作前被檢查**的 markdown skill，是 superpowers 的設計動機。

值得注意的是 [CLAUDE.md 開頭那段給 AI agent 的提醒](https://github.com/obra/superpowers/blob/main/CLAUDE.md)：作者明說這個 repo 的 PR 拒絕率 94%，幾乎全部是「agent 沒讀 PR template、沒搜既有 PR、捏造問題敘述」。這段話揭露作者對 agent 的真實態度：他不相信 agent 會自律，他相信**規則必須寫成 agent 跳不過去的形狀**。整套 superpowers 的設計都從這個前提長出來。

<!-- 撰寫前需查證: Jesse Vincent 過去開源作品列表（從 blog.fsck.com 取得），用一兩句帶出他的工程脈絡，避免淪為 marketing 介紹。 -->

## 設計理念：三大支柱

### 1. 強制性：規則是 gate 不是建議

skill 內最具代表性的強制形式是寫在文件裡的標籤。`brainstorming` 用 `<HARD-GATE>`：

```markdown
<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project,
or take any implementation action until you have presented a design and the
user has approved it. This applies to EVERY project regardless of perceived
simplicity.
</HARD-GATE>
```

`using-superpowers` 用 `<EXTREMELY-IMPORTANT>`：

```markdown
If you think there is even a 1% chance a skill might apply to what you are doing,
you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.
This is not negotiable. This is not optional. You cannot rationalize your way out of this.
```

`systematic-debugging` 與 `test-driven-development` 用 "The Iron Law"，明文寫死順序：「NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST」、「NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST」，違反就要刪除重來。

這些標籤本身只是字串，真正讓它變 gate 的是兩層機制。第一層是 prompt-side enforcement：把 LLM 對強指令的順從傾向用到極致，包含大寫字、否定句、明確刑罰（「Delete it. Start over.」）。第二層是 `hooks/hooks.json` 定義的 SessionStart hook，每次 session 啟動或 `/clear`、`/compact` 後都會把 `using-superpowers` 注入 system context，確保紀律層**永遠在那**，而不是等 agent 想起來才載入。文件規則加上 hook 注入，才構成完整的 gate。

對應上表第 4 種失敗（沒設計直接動工），主要由 `brainstorming` 的 `<HARD-GATE>` 把守第一道關。

### 2. 可組合：14 個原子 skill 而非一個 mega-prompt

v5.1.0 的 `skills/` 目錄列出 14 個 skill：

```
brainstorming                  finishing-a-development-branch  test-driven-development
dispatching-parallel-agents    receiving-code-review           using-git-worktrees
executing-plans                requesting-code-review          using-superpowers
                               subagent-driven-development     verification-before-completion
                               systematic-debugging            writing-plans
                                                               writing-skills
```

把所有規則塞進一個 mega-prompt 也能跑，但無法單獨改、單獨測、單獨棄用。v5.0.6 的 release notes 就示範了原子化的好處：團隊發現「dispatching a fresh subagent to review plans/specs」這個機制增加 ~25 分鐘 overhead 卻不改善品質，於是只改 `brainstorming` 和 `writing-plans` 兩個 skill 的 review loop，其餘 12 個 skill 不動。同樣的 v5.1.0 改寫了 `using-git-worktrees` 和 `finishing-a-development-branch` 處理 native worktree controls，其他 skill 完全不受影響。

mega-prompt 做不到這種局部演進。一個檔越大、改動代價越高、回歸測試越難跑；14 個小 skill 各自獨立，每個都有自己的 `references/`、`scripts/`、測試檔（Ep.9 會拆 `systematic-debugging` 的 `test-pressure-*.md` 系列）。這是把「軟體工程的模組化原則」搬到 prompt engineering 上。

對應上表全部 4 種失敗，每一種都有專責 skill 處理，不會有單一檔同時掌管設計、測試、debugging 而互相干擾。

### 3. 自觸發：description 就是 router

打開任何一個 SKILL.md 看 frontmatter：

```yaml
# brainstorming/SKILL.md
description: "You MUST use this before any creative work - creating features,
building components, adding functionality, or modifying behavior."

# systematic-debugging/SKILL.md
description: Use when encountering any bug, test failure, or unexpected behavior,
before proposing fixes

# test-driven-development/SKILL.md
description: Use when implementing any feature or bugfix, before writing implementation code
```

每一條 description 都是「Use when…」句型，描述的是**什麼情境該載入** skill，而非 skill 本身是什麼。Agent 在每個 turn 自己判斷使用者意圖、自己 routing 到對的 skill，不需要 user 喊「啟用 brainstorming」。這把 routing 的責任從人轉移到 description 寫作品質。

description 寫得好，agent 在對的時機載入；description 寫得糊，要嘛漏觸（user 講「設計一下這個 API」結果 brainstorming 沒上場）、要嘛誤觸（user 講「我想 grep 一下」結果觸發了完整 brainstorming 流程）。這也是為什麼 Part 2 Ep.11 會專門拆「CSO」（Claude Search Optimization）：description 是 router，不是 summary。

對應上表第 3 種失敗（context 污染）：只在該載入時載入，避免無關 skill 塞滿上下文。

## 演進線：從純 markdown 到 hook + marketplace

三個轉折看「方法論怎麼物化成軟體機制」：

| 階段 | 機制 | 工程含義 |
|---|---|---|
| 純 markdown 起點 | 只靠 LLM 自律守 skill | 高壓情境（user 一直催）下容易被繞過 |
| Hook 系統引入 | `hooks/hooks.json` SessionStart hook 自動注入 `using-superpowers` bootstrap | 紀律層每次 session 都在，agent 跳不掉 |
| Plugin marketplace 整合 | v5.x 進入 [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)，並支援 Codex / Gemini / Copilot / OpenCode / Cursor / Factory Droid | 跨 harness 部署，作者控制單一 source of truth |

v5.0.7（2026-03-31）把 GitHub Copilot CLI 拉進支援清單，靠的就是 SessionStart hook 的 `additionalContext` 注入；v5.1.0（2026-05-04）的 RELEASE-NOTES 直接寫明：「a real integration loads the `using-superpowers` bootstrap at session start. The bootstrap is what causes skills to auto-trigger at the right moments. Without it, the skills are dead weight — present on disk but never invoked.」這句話總結了整個演進線的工程主張：**沒有 hook，markdown 是裝飾**。

完整 changelog 看 [RELEASE-NOTES.md](https://github.com/obra/superpowers/blob/main/RELEASE-NOTES.md)。

## 對照其他方法論層

同樣場景丟給三套外掛，產出差異具體看得到：

| 場景 | superpowers | [BMad-Code/BMAD-METHOD](https://github.com/BMad-Code/BMAD-METHOD) | [anthropics/skills](https://github.com/anthropics/skills) |
|---|---|---|---|
| 「幫我加個 OAuth 流程」 | 強制 `brainstorming` → `writing-plans` → TDD → review | 派 PM / Architect / Dev 多角色協作走完設計 → 實作 | 載入通用 OAuth skill 直接寫 |
| 一個人 1 小時的小修補 | overhead 略重（仍走 brainstorming） | overhead 極重（多角色全跑一遍） | 最輕，按需載入 |
| 長 task、需跨 session 守紀律 | 設計初衷 | 角色記憶可延續但紀律弱 | 沒有紀律層 |
| 想自己擴充規則 | 寫新 skill 加進 marketplace（看 Part 2） | 改 role definition / agent persona | 加 skill 到 anthropics/skills 目錄 |

三套設計目的不同、互不取代。superpowers 主打**單 agent 紀律強制**（一個 agent 走完所有階段，但每個階段被守住）；BMAD 主打**多角色協作模擬**（PM、Architect、Dev 各司其職，像 scrum team）；anthropic-skills 主打**通用 capability 庫**（給 agent 多種能力，不規範流程）。

該選哪一套，看的不是哪個 star 多。問三個問題：你的任務需要紀律還是分工？你的 agent 跑多長（10 分鐘還是 2 小時）？你的工程困境是「沒章法」還是「沒能力」？章法問題用 superpowers，分工問題用 BMAD，能力缺口用 anthropic-skills。可以三套並用，但別期待一套解決全部。

## 重度用戶能拿走什麼

讀完這集你應該能判斷：

- **自己的 workflow 是否真的需要強制紀律層**。你如果每一步都會自己 review、會主動要 agent 先 clarify，superpowers 的 `<HARD-GATE>` 可能感覺多餘。但只要你曾經有「跑了 90 分鐘才發現 agent 整段方向錯了」的經驗，那就是紀律層在補你不想每秒盯著的部分。
- **哪些任務 superpowers 是 overhead**。「grep 一下這個 function 在哪用到」、「把這個檔轉 markdown」這種 30 秒能完成的單步任務，觸發 brainstorming 是純浪費。`description` 的 Use when 句型其實就在區分這種情境，但實務上仍會誤觸。遇到時手動跳過、或在你的 CLAUDE.md 寫 override（記得 `using-superpowers` 明文承認 user instructions 永遠優先）。
- **哪些任務 superpowers 是救命**。多步驟 production feature、容易踩雷的 refactor、long-running autonomous session（作者在 README 提到「a couple hours at a time」），這三類是 superpowers 真正發揮的場景。對這些場景，agent 自己擋自己一手比你事後 review 便宜得多。

判斷工具：把過去一週 Claude Code session 的失敗點抓出來，對照前段那張四類失敗表。每出現一次「該停沒停」、「該問沒問」、「該驗沒驗」，就是一票 superpowers。沒有就不需要。

## 下集預告

下一集（Ep.2）拆架構：一個 skill 從你打字、到 `using-superpowers` 載入、到 agent 在 Skill tool 選定某個 SKILL.md、到 HARD-GATE 觸發、到 hook 介入，這條 runtime 鏈完整走一遍。看完 Ep.2 你會知道：session 開頭那段 system-reminder 是怎麼來的、某個 skill 為什麼沒被觸發、你的 prompt 哪個字撞到了 description 的觸發語。
