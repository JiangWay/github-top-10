---
layout: post
title: "深度解析 superpowers Ep.1：為什麼需要 superpowers"
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

讓 Claude Code 寫個 feature，最常見的失敗不是寫錯，是該問的沒問、該停的沒停。[obra/superpowers](https://github.com/obra/superpowers) 把這些「該」用 markdown 寫成 hard gate，由 agent 自己強制執行。第一集要回答兩件事：作者看到了什麼問題，以及為什麼這個答案值得你花時間搞懂。

## 問題：AI coding agent 的失敗模式

沒有方法論層時，agent 的崩潰路徑可歸納為四種，每一種都對應到 superpowers 的一個（或一組）skill：

| 失敗模式 | 對應 skill |
|---|---|
| 直覺修 bug 越修越壞，沒定位 root cause | `systematic-debugging` |
| 先寫 implementation 才補測試，只能驗「沒壞」 | `test-driven-development` |
| 跑久了 context 污染、前後論述彼此干擾 | `using-git-worktrees`、`subagent-driven-development`、`dispatching-parallel-agents` |
| 問題沒問清楚就寫碼，產出整段重來 | `brainstorming`、`writing-plans` |

這集後面講設計理念時會反覆回到這張表。每講一個機制都要對得回上面某一種失敗；如果某個機制看起來高深但對不回任何具體失敗，那就是 over-engineering。

這節要把這四種失敗模式各舉一段真實 session trace（撰寫前蒐集自己用 Claude Code 時的失敗錄影 / 對話紀錄），讓讀者比對自己的崩潰瞬間。

## 人：Jesse Vincent 與 Prime Radiant 的觀察

superpowers 由 Jesse Vincent 與其 Prime Radiant 團隊開發。作者的核心觀察可從 [Simon Willison 的轉介評論](https://simonwillison.net/2025/Oct/10/superpowers/) 與 [Evan Schwartz 的 rave review](https://emschwartz.me/a-rave-review-of-superpowers-for-claude-code/) 中讀出：資深工程師之所以資深，差別不在演算法難度，而在懂得在該停下來釐清的時刻真的停下來。把這個習慣編碼進 agent，是這套外掛的動機。

<!-- 撰寫前待查證：Jesse Vincent 過去 20 年的開源工程作品；Prime Radiant 公司定位與規模；他為什麼把 Claude Code 選為主要載體而非自寫 agent runtime。重度用戶要的不是 marketing 簡介，是「為什麼這個答案是這個人寫出來」的工程脈絡。 -->

這節要寫的不是作者介紹，而是「為什麼這個方法論能被軟體化」的歸納——它先在某個人身上跑了多年實戰才被抽離成 skill，不是憑空設計的 prompt 框架。

## 設計理念：三大支柱

### 1. 強制性：規則是 gate 不是建議

skill 內的 `<HARD-GATE>` 標籤不是裝飾，它真的會阻止下一步動作。在 brainstorming skill 裡寫「設計未批准前不准寫碼」，agent 看到會自我抑制；遇到誘惑想跳關時，skill 內預先列出的 rationalization 表會把藉口擋回去。這節拆「軟性紀律如何用文件強制」的工程實作，並說明 hook 系統在哪一層補上「文件守不住就靠程式守」的最後防線。

對應上表第 4 種失敗（沒設計直接動工）。

### 2. 可組合：14 個原子 skill 而非一個 mega-prompt

把所有規則塞進一個大 prompt 也能跑，但無法單獨改、單獨測、單獨棄用。superpowers 拆成 14 個獨立 skill，brainstorming 管設計、TDD 管測試、verification 管完工，agent 依任務情境動態載入需要的 skill。這節對照單一 prompt 與多 skill 的工程差異：前者像單檔程式，後者像模組化套件。

對應上表全部 4 種失敗——每一種都有專責 skill 處理。

### 3. 自觸發：description 就是 router

每個 skill 的 `description` 欄位都是「Use when…」句型，描述的是什麼情境該載入，而非 skill 自己是什麼。Agent 自己 routing，不需 user 喊「啟用 X」。這節拆 routing 機制如何運作、什麼時候會誤觸或漏觸（Ep.2 細拆架構時還會深入）。

對應上表第 3 種失敗（context 污染）：只在該載入時載入，避免無關 skill 污染上下文。

## 演進線

三個能力轉折看「設計理念怎麼物化成軟體機制」：

- **純 markdown 起點**：靠 agent 自律守紀律，高壓情境下容易被繞過
- **Hook system 引入**：markdown 開始有「程式 enforce」的後盾，HARD-GATE 能擋下一步工具呼叫
- **Plugin marketplace 整合**：v5.x 進入 [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) 官方目錄，跨 Claude Code / Cursor / Codex / Gemini 部署

詳細 changelog 看 [RELEASE-NOTES.md](https://github.com/obra/superpowers/blob/main/RELEASE-NOTES.md)；寫該節時要回頭比對版本對應到具體 commit / PR 編號，避免把里程碑放錯版本。

## 對照其他方法論層

同樣場景丟給三套外掛，產出差異具體看得到：

| 場景 | superpowers | [BMad-Code/BMAD-METHOD](https://github.com/BMad-Code/BMAD-METHOD) | [anthropics/skills](https://github.com/anthropics/skills) |
|---|---|---|---|
| 「幫我加個 OAuth 流程」 | 強制 brainstorming → plan → TDD | 派 PM / Architect / Dev 多角色協作 | 載入通用 OAuth skill 直接寫 |
| 一個人 1 小時的小修補 | overhead 略重 | overhead 極重 | 最輕 |
| 長 task、需跨 session 守紀律 | 設計初衷 | 也能，偏團隊角色扮演 | 沒有紀律層 |
| 想自己擴充 / 替換規則 | 寫個新 skill 加進 marketplace | 改 role definition | 加 skill 到目錄 |

三套設計目的不同、互不取代。superpowers 主打單 agent 紀律強制；BMAD 主打多角色協作；anthropic-skills 主打通用 capability。這節要寫成「我該選哪個」的決策依據，不是 awesome-list。

## 重度用戶能拿走什麼

讀完這集你應該能判斷：

- 自己的 workflow 是否真的需要強制紀律層（習慣自己 review 每步可能不需要）
- 哪些任務 superpowers 是 overhead（30 秒能 grep 的事不該觸發 brainstorming）
- 哪些任務 superpowers 是救命（多步驟 production、容易踩雷的 refactor、long-running agent）

## 下集預告

下一集拆架構：一個 skill 從你打字到 agent 採取行動之間，到底發生了什麼。
