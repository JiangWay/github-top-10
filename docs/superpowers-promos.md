# 深度解析 superpowers 系列——推廣短文集

> 適用平台：Threads（500 字上限）、Twitter/X（已升 25k 字但建議 280 內）、Facebook 技術社團。
> 用法：發佈每集當天，把對應短文貼出去，連結改成該集 URL。
> 規範：套 tech-viral-writer 公式（hook 第一行 / 痛點共鳴 / 乾貨摘要 / 連結 CTA / 精準 hashtag），但避開行銷腔與 emoji 轟炸。
> 站內 URL pattern：`https://jiangway.github.io/github-top-10/YYYY/MM/DD/<slug>/`，發佈後更新。

---

## 系列總序（首發或 hub 公告用）

```
花一週讀完 obra/superpowers v5.1.0 全部 14 個 skill，拆成 12 集中文深度解析發佈中。

這套外掛在解一件事：AI coding agent 跳進去就寫碼。

作者 Jesse Vincent 的答案直接：把資深工程師紀律寫成 markdown + hook，由 agent 自己擋自己。不靠 agent 自律，靠機制。

Part 1（7 集）→ 給 Claude Code 重度用戶，看懂自己 session 在做什麼
Part 2（5 集）→ 給開發者，寫一個經得起壓力測試的 skill

從系列 hub 開始 👉 https://jiangway.github.io/github-top-10/series/superpowers/

#ClaudeCode #AIAgent #superpowers
```

---

## Ep.1 — 為什麼資深工程師紀律可以寫成 markdown gate

```
你叫 Claude Code「加個 OAuth」，5 秒後它就在 app/auth.py 動手。

不是它笨，是它沒被擋。

obra/superpowers 把資深工程師「該問的沒問、該停的沒停」用 markdown + hook 寫成 hard gate。Ep.1 拆作者看到的問題、三大設計支柱、4 種失敗模式 ↔ 14 個 skill 的對位表。

讀完能診斷自己 session 卡在哪一條。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-01-why/

#ClaudeCode #AIAgent #superpowers
```

---

## Ep.2 — 一個 Skill 從你打字到 agent 行動之間的四層機制

```
打開 Claude Code 一打指令，背後其實有四層機制在跑：

1. plugin.json（manifest）
2. description（router）
3. SKILL.md（本體）
4. hook（後盾）

哪一層卡住、session 就會卡在對應的訊號。

Ep.2 對照 superpowers 三個 plugin.json（claude / cursor / codex）與 hooks.json 設定，拆「一個 skill 從你打字到 agent 行動之間到底發生了什麼」。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-02-architecture/

#ClaudeCode #superpowers
```

---

## Ep.3 — brainstorm → plan → execute 為什麼必須拆三個 skill

```
為什麼 Claude Code 一直要你「先 brainstorm 再寫」？

不是它煩，是 brainstorming skill 在每個 session 開頭就被注入。

Ep.3 拆 superpowers 流程主幹三步：
- brainstorming（HARD-GATE 擋未批准的設計）
- writing-plans（2–5 分鐘顆粒度）
- executing-plans（TodoWrite 同步進度）

讀完你會知道何時 brainstorming 是 overhead、何時是救命。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-03-workflow-spine/

#ClaudeCode #superpowers
```

---

## Ep.4 — TDD / Verification / Debugging 看起來都在驗證，差別在哪

```
Claude Code 寫完 200 行說「不能 commit，verification 沒過」——你是不是想過它在裝忙？

它沒裝。superpowers 的紀律三件套守三個完全不同的階段：
- TDD 守寫之前
- verification 守收尾
- debugging 守出錯之後

Ep.4 用 test-pressure-1.md production-down $15k/min 真實 scenario，拆三者為什麼分開不合一、Iron Law 怎麼強制、Red Flags 怎麼擋直覺修。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-04-discipline/

#ClaudeCode #TDD #superpowers
```

---

## Ep.5 — worktree 為什麼比 branch 切換更適合 agent

```
你的 Claude Code session 跑了 90 分鐘，agent 開始堅持你 10 分鐘前否決的設計。

那是 context 污染。

Ep.5 拆 superpowers 的三層隔離：檔案層（worktree）、context 層（subagent）、權限層（hook）。內含 v5.1.0 改寫的 `GIT_DIR != GIT_COMMON` 環境偵測、subagent 4 種 status 處置、fan-out / fan-in 的失敗模式。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-05-concurrency/

#ClaudeCode #superpowers
```

---

## Ep.6 — 為什麼 code review 要拆成兩個 skill

```
Claude Code 寫完 code 要 review 時，永遠不會自己 review，一定派出 subagent。

不是 over-engineering，是不讓主 agent 自我安撫式審查。

Ep.6 拆 superpowers 的 review 雙環：
- requesting-code-review（派出 subagent）
- receiving-code-review（critical issue 阻擋 hard gate）
- finishing-a-development-branch（lifecycle 完整收尾）

為什麼 review 拆兩個 skill、嚴重度怎麼分。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-06-review-and-finish/

#ClaudeCode #CodeReview #superpowers
```

---

## Ep.7 — 元層：自我繁殖的 superpowers

```
14 個 skill 能自洽運作，靠的是兩個藏在背後的 meta skill。

Ep.7 拆 superpowers 的元層：
- using-superpowers：SessionStart 必經 router，紅旗清單擋掉 agent 的 rationalization
- writing-skills：作者教你寫 skill 的 skill（Part 2 的起點）

順便揭露三層優先序：**user > superpowers > system prompt**——這條的政治意義比技術意義重要。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-07-meta/

#ClaudeCode #superpowers
```

---

## Ep.8 — 寫文件就是 process documentation 的 TDD（Part 2 開場）

```
從這集開始 Part 2：給想自己寫 skill 的開發者。

一個反直覺主張：**process documentation 也能 TDD**。

writing-skills 第一句寫死：「Writing skills IS Test-Driven Development applied to process documentation.」

Ep.8 對照 TDD ↔ skill 寫作的 5 條映射、Iron Law（沒看到 agent 失敗就不准寫 skill）、為什麼憑感覺寫 prompt template 與寫 skill 是兩件事。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-08-skill-as-tdd/

#ClaudeCode #AIAgent #superpowers
```

---

## Ep.9 — 作者用 4 個壓力測試檔，驗 skill 真的擋得住 agent

```
作者怎麼確定他寫的 skill 真的能擋得住 agent？

不是測試，是壓力測試。

Ep.9 逐一拆 systematic-debugging 目錄下 4 個 test 檔：
- test-academic（純理解）
- test-pressure-1（production down $15k/min）
- test-pressure-2（沉沒成本 + 疲勞 + 私人時間）
- test-pressure-3（權威 + 社會壓力 + 自我形象）

提煉五大壓力類型 + A/B/C 三選項設計學。能照做產自己的 scenario。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-09-pressure-test/

#ClaudeCode #superpowers
```

---

## Ep.10 — 把 agent 的 verbatim 藉口蒐成 counter-table

```
寫 skill 最不可省的部分不是規則本身，是 counter-table。

baseline 跑完，agent 會跟你說「too simple to test」「I'll test after」這種藉口——你要的是 verbatim 原句，不能改寫。

Ep.10 拆怎麼跑 baseline、怎麼把 agent 的 verbatim 變成 counter-table、紅旗清單與 counter-table 職責切割、Spirit-vs-Letter 為什麼要在 skill 前段堵掉。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-10-rationalization/

#ClaudeCode #superpowers
```

---

## Ep.11 — CSO：讓 skill 在 1024 字以內被找到

```
你寫好 skill，agent 不載入怎麼辦？

description 寫錯了。

writing-skills 記錄一個慘案：description 寫成 workflow summary，Claude 讀完直接照 description 做事跳過正文。一次 review 變一次，flowchart 等於白寫。

Ep.11 拆 CSO（Claude Search Optimization）：「Use when…」句型公式、token 預算（< 1024 字）、命名守則（gerund 優先）、關鍵字覆蓋（error message / 症狀同義詞 / 工具名）。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-11-cso/

#ClaudeCode #superpowers
```

---

## Ep.12 — subagent 跑一輪 RED→GREEN→REFACTOR 驗自己寫的 skill（系列收尾）

```
寫 → 測 → 改 → 發佈，一條可重複的 skill 開發流程。

Ep.12 是 Part 2 末集，把 Ep.8–11 所有工具串成端到端：派 subagent 跑 baseline → 寫最小 skill → 重跑量 compliance rate → 抓新藉口補 counter → 再驗。

範例題「不准 commit 無測試 PR」5 步走完，包括 minimal SKILL.md 範本與 marketplace 提交 checklist。

走到這你已經能貢獻 skill 回 [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace)。

👉 https://jiangway.github.io/github-top-10/2026/05/26/deepdive-superpowers-12-verification/

#ClaudeCode #superpowers
```

---

## 發佈節奏建議

| 階段 | 動作 | 平台時機 |
|---|---|---|
| 首發日 | 系列總序 + Ep.1 | 平日 09:30 或 21:00（技術社群活躍時段） |
| 隔日起每週 2 集 | Ep.2 + Ep.3 同週 | 週二、週四晚間 |
| Part 1 完結 | 中場文：「Part 1 走完，Part 2 預告」 | 同首發時段 |
| Part 2 開場 | Ep.8 + Part 2 預告短串 | 週日晚間（為新一週鋪陳） |
| 系列收尾 | Ep.12 + 系列回顧 + 經驗總結 | 週五晚間 |

## 配圖建議

- **首發 / 系列總序**：用一張 14 skills 的概念地圖（hub 內有）
- **Ep.1**：典型 long-agent fail trace 截圖（你自己 session 中段崩潰那段）
- **Ep.2**：plugin.json + SKILL.md frontmatter 並排截圖
- **Ep.4**：test-pressure-1.md 的 $15k/min scenario 截圖
- **Ep.7**：紅旗清單原文截圖
- **Ep.9**：四個 test 檔 directory listing
- **Ep.12**：minimal SKILL.md 範本完整貼出

## 互動引導

每篇短文結尾可選一條丟給讀者：

- Ep.1：「你最近一次 Claude Code 崩潰，撞到 4 種失敗的哪一種？」
- Ep.4：「你 verification 卡 lint 最荒謬的一次是什麼？」
- Ep.7：「你的 CLAUDE.md 有為了 superpowers 改過什麼？」
- Ep.10：「你印象最深的 agent rationalization 是什麼？」
