---
repo: EveryInc/compound-engineering-plugin
first_seen: 2026-05-31
last_updated: 2026-05-31
appearances: [2026-05-31]
growth_appearances: [2026-05-31]
has_releases: true
latest_release: compound-engineering-v3.9.3
tags: [AI Agent 框架, Skill 外掛, 多代理編排, 自進化]
domain: AI Agent 框架
form: Skill 外掛
themes: [多代理編排, 自進化]
---

# [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)

## 深度研究（2026-05-31 首次）

### 專案定位

[EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)（18,578 stars / 1,404 forks / 2025-10-09 建立 / MIT / TypeScript 81% + Python 13% + Shell 5%）是媒體與 AI 公司 [Every](https://every.to)（CEO Dan Shipper）官方推出的 **「Compound Engineering（複利工程）」方法論外掛**，把 Every 內部用來「以單人工程團隊同時跑 5 個產品」的整套 AI agent 工作流封裝成可一鍵安裝的 plugin，正面打向 Claude Code / Codex / Cursor 等多家 AI 編碼 agent。今日以 **+243 stars / growth_rate 1.31%** 首登絕對榜 **#5**。

「Compound Engineering」是 Every 提出並在自家媒體大力傳播的核心敘事——**「每一單位工程工作都應讓後續工作更容易，而非更難」**（Each unit of engineering work should make subsequent units easier, not harder）。其反直覺主張是：**80% 心力放在「規劃 + 審查」，只有 20% 放在「執行 + 沉澱」**，把傳統「先寫再說」的順序倒過來。方法論發軔自 Every 旗下 email 產品 Cora 的開發實戰，由 GM [Kieran Klaassen](https://github.com/kieranklaassen) 與 Dan Shipper 撰寫成定義性指南後，再倒推成這份開源外掛。倉自 2025-10 建立、半年累積 18.5k stars、forks/stars 達 7.6%，且 v3 系列（native plugin 改版）後增長明顯。

### 核心架構 / 主要概念

- **四步複利迴圈**：`Plan → Work → Review → Compound`。前後兩步（規劃、沉澱）佔 80% 心力——agent 先研究 codebase 與網路擬出詳細實作計畫，寫完後由工程師審查「產出 + 過程中學到的教訓」，最後把 bug／失敗測試／解題洞見**寫成可被未來 agent 檢索的文件**，形成「learning loop」讓知識隨 codebase 一同複利累積。
- **38 個 skill（slash command）+ 51 個 agent**：skill 全部以 `ce-` 為前綴，核心包含 `/ce-strategy`（策略錨點文件）、`/ce-ideate`（大方向發想）、`/ce-brainstorm`（需求挖掘）、`/ce-plan`（詳細實作規劃）、`/ce-work`（帶任務追蹤的執行）、`/ce-code-review`（多代理平行審查）、`/ce-debug`（系統化失敗調查）、`/ce-compound`（把教訓沉澱成文件）、`/ce-product-pulse`（用量與效能回報）。
- **`/ce-compound` 是方法論的靈魂**：該指令會**平行 spawn 多個 agent** 捕捉「哪裡出錯、為何出錯、如何修復」，結果存成專案內可搜尋的 documentation；外部評論強調——若略過這一步，「就只是用了 AI 的傳統工程」。
- **多代理平行審查**：`/ce-code-review` 同時跑多個審查 agent（外部評論提到 14 個平行 agent），主張「靠結構（by construction）抓到更多問題」勝過單模型單次審查。
- **完整 skill 譜系遠超核心流程**：另含 `ce-commit` / `ce-commit-push-pr` / `ce-resolve-pr-feedback`（git 與 PR）、`ce-worktree` / `ce-clean-gone-branches`（worktree 管理）、`ce-frontend-design` / `ce-simplify-code` / `ce-optimize` / `ce-dhh-rails-style`（程式風格）、`ce-test-browser` / `ce-test-xcode` / `ce-proof`（測試）、`ce-dogfood-beta` / `ce-polish-beta` / `ce-demo-reel` / `ce-release-notes`（產品上線）、`ce-slack-research` / `ce-riffrec-feedback-analysis`（情報蒐集）等，反映 Every 真實產品團隊的全鏈路日常。
- **跨 agent 安裝（monorepo + CLI converter）**：倉為 monorepo，`plugins/compound-engineering/` 放外掛本體，`src/` 為 TypeScript CLI 安裝器/轉換器。Claude Code 直接 `/plugin marketplace add EveryInc/compound-engineering-plugin` + `/plugin install compound-engineering`；其餘平台（OpenCode / Pi / Gemini / Kiro / Factory Droid / Qwen Code 等）透過 Bun converter `bunx @every-env/compound-plugin install compound-engineering --to <target>` 轉換安裝；Codex 需「marketplace 註冊 + Bun 裝 agent + TUI 裝 plugin」三步。
- **發版以 monorepo 雙軌 tag 並行**：`compound-engineering-vX.Y.Z`（外掛）與 `cli-vX.Y.Z`（CLI）同步發版，由 semantic-release-bot 自動化，最新為 [compound-engineering-v3.9.3](https://github.com/EveryInc/compound-engineering-plugin/releases/tag/compound-engineering-v3.9.3)（2026-05-28）。

### 目標使用者

採用 Claude Code / Codex / Cursor 等 AI agent 做日常開發、想要一套「現成且 battle-tested」系統化工作流而非每次 ad-hoc prompt 的工程師與小型團隊；認同「先大量規劃再動手」並願意投入 knowledge-capture 的開發者；想複製 Every「單人跑多產品」生產力模式的獨立開發者與新創；以及對 compound engineering 方法論有興趣、想直接跑 Every 內部同款流程的早期採用者。對「快速小修」場景則屬過重（見外部評論）。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Anthropic 官方 marketplace 為**中立外掛聚合站**，收錄各家外掛；本檔是**單一公司（Every）帶完整方法論意見**的官方外掛，opinionated 假定你採用 Every 的 plan/work/review/compound 流程 |
| [obra/superpowers](https://github.com/obra/superpowers) | superpowers 為通用 Skill 大集合（200k+ stars），廣度取向、無單一強敘事；本檔以「複利工程」單一方法論為軸，38 skill + 51 agent 全為該迴圈服務，敘事更收斂、品牌與媒體（every.to）背書更強 |
| 各家內建 `/plan` `/review` 命令 | 多為單點工具；本檔把整條 brainstorm→plan→work→review→compound 串成迴圈，並強制「Compound」沉澱步驟形成跨任務知識累積（self-evolving 取向） |
| 一般 Claude Code 自寫 skill | 本檔由真實跑 5 個產品的團隊長期 dogfood（源自 Cora 開發），且做了跨 7+ 個 agent 平台的安裝轉換，是目前「系統化 AI 工作流」中最完整的開源選項（見外部評論） |

差異化關鍵：**有明確方法論 + 媒體品牌背書 + 真實產品 dogfood + 跨多 agent 平台轉換**的 opinionated 官方外掛，而非中立工具箱。

### 外部評論

- [Every《Compound Engineering: How Every Codes With Agents》（Dan Shipper / Kieran Klaassen）](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents)：方法論定義文，提出 80/20 規劃-執行倒置、learning loop，並宣稱 Every「五個產品各由單人主導」、「一個開發者能做幾年前五個開發者的工作」。
- [Every《Compound Engineering Guide》](https://every.to/guides/compound-engineering) 與 [《Compound Engineering Gets an Upgrade》](https://every.to/guides/compound-engineering-gets-an-upgrade)：官方指南與 v3 native plugin 改版說明。
- [Ry Walker《Compound Engineering Plugin》研究筆記](https://rywalker.com/research/compound-engineering-plugin)：讚賞「多代理平行審查為技術亮點，靠結構抓到更多問題」「最完整的開源系統化 AI 工作流選項」；同時批評「小任務過重、快修 overkill」「80/20 比例對習慣『直接開寫』的開發者反直覺」「14 個平行審查 agent 吃大量 context」「Claude Code 以外平台仍 experimental」；關鍵觀察：略過 Compound 步驟「就只是用了 AI 的傳統工程」。
- [Dan Shipper 在 X 宣布公司工程哲學因 Claude Code 全面改為 Compounding Engineering](https://x.com/danshipper/status/1957469842178441523)；[Kieran Klaassen 宣布 plugin 上線](https://x.com/kieranklaassen/status/1976399877098831997) 與 [v3 native plugin 發布](https://x.com/kieranklaassen/status/2047066545340436731)。
- [Martin《AI Agents = 100x Engineers》（thisisuncharted.co）](https://www.thisisuncharted.co/p/ai-agents-100x-engineers-every) 與 [Well Engineered Tech《Compounding Engineering with Claude Code》](https://wellengineered.tech/en/notes/compound-engineering/)：第三方部落格實作心得。
- 註：HN / Reddit 截至撰寫**未見密集主流長討論串**，傳播主力為 every.to 自家媒體 + X/Twitter + 個人部落格回流。

### Release 狀態

`has_releases: true`，發版高度活躍。monorepo 雙軌並行 tag——外掛 `compound-engineering-vX.Y.Z`、CLI `cli-vX.Y.Z` 同步發版，由 semantic-release-bot 自動化，目前共 30+ 個 release。最新 [compound-engineering-v3.9.3](https://github.com/EveryInc/compound-engineering-plugin/releases/tag/compound-engineering-v3.9.3)（2026-05-28），近期節奏密集：v3.9.0（5-26）→ v3.9.1 / v3.9.2（5-27 同日兩 patch）→ v3.9.3（5-28），已進入 v3 native plugin 世代。倉 `pushed_at` 為 2026-05-30 顯示 main 分支每日活躍。

### 授權與社群

- **授權**：MIT
- **貢獻結構**：公司團隊主導——[tmchow](https://github.com/tmchow)（375 commits）+ [kieranklaassen](https://github.com/kieranklaassen)（242 commits，方法論共同作者 / Cora GM）為雙核心，外加 [mvanhorn](https://github.com/mvanhorn)（22）、[XSAM](https://github.com/XSAM)（6）等 Every 員工；[dshipper](https://github.com/dshipper)（Dan Shipper，3 commits）亦親自下場；自動化機器人（github-actions[bot] 62 / semantic-release-bot 25）佔據顯著 commit 比例，反映重度 CI 自動化發版。
- **量化指標**：18,578 stars / **1,404 forks**（7.6%）/ 84 open issues
- **Homepage**：<https://every.to/guides/compound-engineering>（方法論指南，非工具站）
- **Topics**：`compound`, `engineering`

## 資料來源

**本體**
- Repo：<https://github.com/EveryInc/compound-engineering-plugin>
- README：<https://github.com/EveryInc/compound-engineering-plugin/blob/main/README.md>
- skills 目錄：<https://github.com/EveryInc/compound-engineering-plugin/tree/main/plugins/compound-engineering/skills>
- Releases：<https://github.com/EveryInc/compound-engineering-plugin/releases>
- 方法論指南：<https://every.to/guides/compound-engineering>

**外部評論與背景**
- [Every《How Every Codes With Agents》](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents)
- [Every《Compound Engineering Gets an Upgrade》](https://every.to/guides/compound-engineering-gets-an-upgrade)
- [Ry Walker 研究筆記](https://rywalker.com/research/compound-engineering-plugin)
- [Dan Shipper X 宣布](https://x.com/danshipper/status/1957469842178441523)
- [Kieran Klaassen X：plugin 上線](https://x.com/kieranklaassen/status/1976399877098831997) / [v3 發布](https://x.com/kieranklaassen/status/2047066545340436731)
- [thisisuncharted.co《AI Agents = 100x Engineers》](https://www.thisisuncharted.co/p/ai-agents-100x-engineers-every)
- [Well Engineered Tech 實作筆記](https://wellengineered.tech/en/notes/compound-engineering/)
