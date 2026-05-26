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

本集以 v5.1.0 的本地 cache（`.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/`）為依據逐檔比對，所有路徑都已在 [obra/superpowers](https://github.com/obra/superpowers) main 分支驗證存在。

## Plugin 層：.claude-plugin/plugin.json 與 SKILL.md frontmatter

[obra/superpowers](https://github.com/obra/superpowers) 的 Claude Code 入口是 [.claude-plugin/plugin.json](https://github.com/obra/superpowers/blob/main/.claude-plugin/plugin.json)；同一份 codebase 同時維護 [.cursor-plugin/plugin.json](https://github.com/obra/superpowers/blob/main/.cursor-plugin/plugin.json) 與 [.codex-plugin/plugin.json](https://github.com/obra/superpowers/blob/main/.codex-plugin/plugin.json) 給其他平台讀。三份 manifest 共用同一份 `skills/` 目錄，差別只在「誰知道 skill 在哪、hook 走哪一條」。

Claude 版的 manifest 極度精簡：

```json
{
  "name": "superpowers",
  "description": "Core skills library for Claude Code: TDD, debugging, collaboration patterns, and proven techniques",
  "version": "5.1.0",
  "author": { "name": "Jesse Vincent", "email": "jesse@fsck.com" },
  "homepage": "https://github.com/obra/superpowers",
  "license": "MIT",
  "keywords": ["skills", "tdd", "debugging", "collaboration", "best-practices", "workflows"]
}
```

它沒寫 `skills` / `hooks` 路徑，因為 Claude Code 對「規約目錄結構」採慣例：plugin root 下的 `skills/` 自動被掃描、`hooks/hooks.json` 自動被當作 hook 註冊檔。Cursor 版的 manifest 不吃這套慣例，所以額外明寫了三個欄位：

```json
{
  "name": "superpowers",
  "displayName": "Superpowers",
  "version": "5.1.0",
  "skills": "./skills/",
  "agents": "./agents/",
  "commands": "./commands/",
  "hooks": "./hooks/hooks-cursor.json"
}
```

注意 hook 檔的指向：Claude 走 `hooks/hooks.json`（內部用 `SessionStart` 這個 PascalCase event 名與 `matcher: "startup|clear|compact"`），Cursor 走 `hooks/hooks-cursor.json`（用 camelCase 的 `sessionStart`、`version: 1`、沒有 matcher）。同一份 hook 腳本，兩份註冊檔，兩個 event 命名 convention。

Codex 版又是另一條路線：除了 `skills` 指向之外，多了一整塊 `interface{}` 欄位塞 `displayName` / `shortDescription` / `longDescription` / `brandColor` / `composerIcon`，因為 Codex 把 plugin 當作有 marketplace UI 的元件來展示。同一個 skill 在三個平台會有三種「外觀」，但載入機制其實只有一份。

這就回答了一個常被誤解的問題：「我寫 SKILL.md 要寫幾遍才能跨平台？」答案是一遍。frontmatter 規範極簡，只要 `name`（kebab-case，等於目錄名）和 `description`（`Use when...` 句型）兩個必填欄位，剩下的差異全部由三份 plugin.json 吸收。

## description 就是 router

打開 [skills/brainstorming/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md) 的 frontmatter，第一眼會覺得 description 寫得不像描述：

```yaml
---
name: brainstorming
description: "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation."
---
```

它讀起來像對 agent 講話的指令，不像對人類講話的 summary。這是設計而非寫作風格。description 在這套系統裡的角色是 router input：agent 收到一個 task 後，會把所有 skill 的 description 攤在 system prompt 裡比對，決定要不要叫 Skill 工具把哪一份載入。description 寫得像 marketing copy，agent 就比不出來。

[using-superpowers](https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md) 把這條規則寫得很硬：「If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.」翻成工程語言就是 router 的召回率要高、寧可誤觸再 fall through，也不要漏觸。但召回率太高會帶來另一個失敗模式：description 寫得太籠統，兩個 skill 都覺得自己該被載入，agent 會在 system-reminder 裡顯示連續兩次 `Using <skill> to ...` 然後互相覆蓋指令；寫得太具體則漏觸，使用者明明在做 feature design，agent 卻沒叫 brainstorming，直接動手寫碼。

description routing 失敗的具體訊號值得記下來：

- session 開頭沒看到 `Using using-superpowers to ...` 這類字串：SessionStart hook 沒跑（見下一節）
- 你在描述任務、agent 卻直接動手寫 code：brainstorming 的 description 沒撞到你的關鍵字，常見原因是你用「幫我加一個小功能」這種去掉「design / feature / build」字眼的中文短句
- 同一輪 agent 連續 invoke 兩個 skill 然後行為自相矛盾：description 重疊

修法很無聊：把 task 描述改得更接近 description 的句型。寫「Let's design / build / brainstorm X」會穩定觸發 brainstorming；寫「This bug ...」會穩定觸發 systematic-debugging。

## Skill 內部解剖

確認哪份 skill 該被載入後，agent 接下來讀的是 SKILL.md 本體。每個 skill 目錄結構固定：

```
skills/<name>/
├── SKILL.md          ← 主檔，agent 載入時讀
├── references/       ← 重型參考（API、語法），SKILL.md 點名才讀
├── scripts/          ← 可執行工具，agent 決定執行時呼叫
└── examples/         ← 風格參考
```

這個分層的關鍵是「不要把所有東西塞進 SKILL.md」。SKILL.md 進 system prompt，越長 token 越貴；references/ 只在主檔說「詳見 references/foo.md」時才被讀，相當於延遲載入。skill 寫得好不好，看的是 SKILL.md 的克制程度。

對比兩個極端會更清楚。[skills/using-git-worktrees/](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees) 整個只有一份 SKILL.md：worktree 是純粹的 git 操作教學，agent 跟著走就行，不需要參考檔、不需要腳本。[skills/systematic-debugging/](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) 則塞滿了 `test-pressure-1.md`、`test-pressure-2.md`、`test-academic.md` 這類「壓力測試 scenario 檔」，那些檔不是給 agent 在 runtime 讀的，而是給作者寫 skill 時驗證「這份 SKILL.md 撐不撐得住 agent 在時間壓力與權威壓力下偷懶」用的。Part 2 會專門拆這套寫作方法論。

換句話說：SKILL.md 大小反映 runtime 複雜度，目錄大小反映寫作驗證強度。兩者解耦。

## Hook 後盾：把 markdown 變成可執行 gate

到目前為止講的都是「agent 願意配合」的情境。但作者寫 [skills/brainstorming/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md) 的 `<HARD-GATE>` 區段時，預設前提就是 agent 不會自願配合：

```html
<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project,
or take any implementation action until you have presented a design and the
user has approved it.
</HARD-GATE>
```

markdown 終究是文字，agent 可以選擇忽略。所以 superpowers 在 [hooks/](https://github.com/obra/superpowers/tree/main/hooks) 目錄掛了 hook 後盾。

v5.1.0 實際註冊的 hook，只有 `SessionStart` 一個，沒有 PreToolUse、沒有 PostToolUse、沒有 Stop。[hooks/hooks.json](https://github.com/obra/superpowers/blob/main/hooks/hooks.json) 全文：

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|clear|compact",
        "hooks": [
          { "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd\" session-start",
            "async": false }
        ]
      }
    ]
  }
}
```

這個 hook 不擋工具呼叫，它做的事更基礎：每次 session 啟動 / `/clear` / `/compact` 後，由 [hooks/session-start](https://github.com/obra/superpowers/blob/main/hooks/session-start) 這支 bash 腳本把 `skills/using-superpowers/SKILL.md` 整份檔案逃逸成 JSON 字串，包進 `<EXTREMELY_IMPORTANT>` 標籤注入 `additionalContext`，強迫 agent 在開口前先讀完 router 規則。Cursor 走 `additional_context`、Claude Code 走 `hookSpecificOutput.additionalContext`、Copilot CLI 走頂層 `additionalContext`，同一支 hook 用環境變數 `CURSOR_PLUGIN_ROOT` 與 `CLAUDE_PLUGIN_ROOT` / `COPILOT_CLI` 判斷該吐哪種格式。

所以你 session 開頭那段「You have superpowers」+ using-superpowers 全文的 system-reminder，是這支 hook 生成的，不是 plugin manifest 自動產的、也不是 description routing 跑出來的。如果某天你發現 session 開頭沒這段提示，第一步先檢查 `${CLAUDE_PLUGIN_ROOT}` 環境變數有沒有被傳進來、`hooks/run-hook.cmd` 有沒有執行權限。Windows 平台會跑那段 polyglot 的 batch 路徑去找 Git Bash，找不到就「靜默退出」（[hooks/run-hook.cmd](https://github.com/obra/superpowers/blob/main/hooks/run-hook.cmd) 註解明寫 `exit silently rather than error`），plugin 仍能跑，只是 SessionStart 注入沒了。

至於擋工具呼叫那種更硬的 hook（PreToolUse 攔截 `Write` 強制走 brainstorming 才放行），v5.1.0 沒有掛。HARD-GATE 在這版仍主要靠 `<EXTREMELY_IMPORTANT>` 與紅旗清單那種「prompt 層強制」維持。未來版本是否引入工具層 hook 還沒定論，撰寫時請以當時的 [RELEASE-NOTES.md](https://github.com/obra/superpowers/blob/main/RELEASE-NOTES.md) 為準。

## Skill 鏈式調用：為什麼一定要有 using-superpowers

把四層串起來看：plugin manifest 註冊 skill 目錄 → SessionStart hook 把 [using-superpowers/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md) 整份塞進 system prompt → 該 SKILL.md 本身就是 router 規則（「Red Flags 表 + Skill Priority」）→ agent 比對接下來每個 task 該叫哪個 skill。

using-superpowers 是 meta 層而非執行層。它不教你 debug、不教你 brainstorm，它教 agent 「遇到 task 先檢查有沒有 skill 可叫、看到自己想跳關的念頭就停下」。鏈條典型路徑：using-superpowers（meta）→ brainstorming（process）→ writing-plans（process）→ executing-plans（process）→ test-driven-development / verification-before-completion（discipline）→ requesting-code-review → finishing-a-development-branch。

每一步的銜接都靠 SKILL.md 結尾的「terminal state」明寫下一步該 invoke 哪個 skill。brainstorming 的最後一句就是「The terminal state is invoking writing-plans. Do NOT invoke frontend-design, mcp-builder, or any other implementation skill.」這是 skill 之間的 contract，agent 不照走 router 會立刻提示 red flag。

## 主 agent ↔ subagent 的職責切割

最後一層機制是主 agent / subagent 切割。superpowers 在 `using-superpowers/SKILL.md` 開頭就放了 `<SUBAGENT-STOP>` 標籤，subagent 被 dispatch 時直接跳過 using-superpowers 入口。理由很實際：subagent 接的是獨立子任務（code review、research、worktree 內隔離工作），它的 context 不該被主 agent 的 router 規則塞滿。

切割原則三條：context 大小（subagent 處理可以單獨完成的子問題）、可重複性（同樣的 prompt 同樣的工具，dispatch 出去結果可比對）、權限隔離（subagent 不知道主 session 的全貌，誤動破壞範圍受限）。Ep.5 會把 [dispatching-parallel-agents](https://github.com/obra/superpowers/blob/main/skills/dispatching-parallel-agents/SKILL.md) 與 [subagent-driven-development](https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md) 拆開細講。

## 實戰：session 卡住時定位到哪一層

回到一開頭那個承諾：看懂四層後，session 卡住時你能定位是哪一層出問題。三個常見 pattern：

**「為什麼 brainstorming 沒啟動」**：大概率是 description routing 沒撞到。看 system-reminder 裡有沒有 `Using using-superpowers to ...` 開頭；有但沒接著 invoke brainstorming，就是你的 task 描述句型沒對到 brainstorming description 的關鍵字（creating features、building、adding functionality、modifying behavior）。

**「為什麼明明該停止卻繼續寫碼」**：HARD-GATE 是 markdown 文字而非工具層 hook。v5.1.0 沒有 PreToolUse 擋 `Write`，所以「擋下」靠的是 agent 自願守 `<EXTREMELY_IMPORTANT>` + 紅旗清單。如果你在 CLAUDE.md 寫了壓過 superpowers 的指令（using-superpowers 自己定義的 priority 是 `User > Superpowers > Default`），agent 就會聽你的而非聽 skill 的。

**「session 開頭沒看到 superpowers 字串」**：SessionStart hook 沒跑。檢查 `${CLAUDE_PLUGIN_ROOT}` 是否被傳入、`hooks/run-hook.cmd` 是否可執行、平台是否被腳本辨識（Cursor / Claude Code / Copilot CLI 走三條 JSON 輸出分支）。

## 踩坑與最佳實踐

- 描述任務太籠統：補進 brainstorming / debugging description 裡的關鍵字句型，召回率才會穩
- 跨 skill 撞語意：盤點兩份 SKILL.md 的 description，把重疊處改寫得更互斥
- 在 CLAUDE.md 寫了壓過 skill 的硬指令：那就放棄相對應的紀律，別期待 agent 同時聽兩邊
- 把 references/ 內容塞進 SKILL.md 想「一次教完」：runtime token 會爆，照分層原則寫

## 下集預告

下一集進入流程主幹，拆 brainstorm → plan → execute 三步如何銜接：HARD-GATE 真正擋下什麼、plan 顆粒度該切到多細、executing-plans 怎麼跟 TodoWrite 整合。
