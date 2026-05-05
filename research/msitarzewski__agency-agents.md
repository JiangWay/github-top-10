---
repo: msitarzewski/agency-agents
first_seen: 2026-05-05
last_updated: 2026-05-06
appearances: [2026-05-05, 2026-05-06]
growth_appearances: [2026-05-06]
has_releases: false
latest_release: null
tags: [AI Agent 框架, Skill 外掛, 開源替代]
domain: AI Agent 框架
form: Skill 外掛
themes: [開源替代]
---

## 深度研究（2026-05-05 首次）

### 專案定位
[msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) 自稱「a complete AI agency at your fingertips」，把一間 AI 公司的 144+ 個職能（工程、設計、行銷、銷售、產品、QA、財務、空間運算、遊戲開發⋯⋯）拆成 12 個 division 的 agent 定義檔，丟進 `~/.claude/agents/` 即用。MIT 授權，主語言 Shell（安裝腳本），repo size 僅 2.5 MB——本質是一包 markdown 人格設定，不是執行框架。

### 核心架構 / 主要概念
每個 agent 都是 `.md + YAML frontmatter`，含人格、使命、工作流、可交付物（含程式碼範例）、成功指標。Claude Code 原生格式相容，零轉換；其他 10 個工具（[Cursor](https://github.com/getcursor/cursor)、Aider、Gemini CLI、OpenCode、Windsurf、Qwen Code、Kimi Code、Copilot、Antigravity、OpenClaw）由 `scripts/install.sh` 自動偵測並轉檔。

### 目標使用者
想立刻有「整間公司」可用的 indie hacker 與小團隊；偏好 prompt-as-config 而非寫框架程式碼者；需要跨 11 種 agentic coding 工具切換的多平台用戶。

### 與類似專案的差異
- 對比 [obra/superpowers](https://github.com/obra/superpowers)：superpowers 是執行哲學（TDD、規劃、驗證迴圈）的 Skill；agency-agents 是角色卡片庫，無方法論。
- 對比 [mattpocock/skills](https://github.com/mattpocock/skills)、[browserbase/skills](https://github.com/browserbase/skills)：那兩個是精選個人 / 廠商出品的少量高品質 skill；agency-agents 走「量大、覆蓋全公司職能」路線。
- 對比 [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates)：templates 是專案 scaffolding，agency-agents 只裝 agent，不動專案結構。
- 對比 [wshobson/agents](https://github.com/wshobson/agents)、[VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)：同類「subagent 大集合」，agency-agents 主打人格化（每個 agent 有獨特語氣、口吻）與多工具轉檔腳本。

### 外部評論
**92,420 stars 真實性觀察：repo 創於 2025-10-13，七個月衝破 9 萬 stars、fork 15,198——這個 fork 數對「一包 markdown」型 repo 過於異常**。正常 markdown collection 的 fork:star 比例多在 1:30 以下，這裡是 1:6，可能來自大量「fork 收藏」或活躍 PR 者，但也與買 fork 模式吻合。對照 [ICSE 2026 StarScout 研究](https://www.kapravelos.com/publications/fakestars-icse26.pdf)，AI/LLM repo 是非惡意 fake-star 的最大宗，且 [78 個檢測為 fake star 的 repo 曾上 GitHub Trending](https://awesomeagents.ai/news/github-fake-stars-investigation/)。本 repo 未在 StarScout 公開名單，但符合「2024 後 AI 主題 + 病毒式增星」的高風險樣態。

社群側有真實熱度佐證：[YUV.ai 部落格](https://yuv.ai/blog/agency-agents) 給出長篇正面評測；[Medium「10K Stars in 7 Days」](https://medium.com/coding-nexus/someone-built-a-full-ai-agency-on-github-61-agents-10k-stars-in-7-days-ac976f85925d) 紀錄首週速度；[X 上 rod† 推文](https://x.com/rodarchive/status/2032302923128951033) 在 35K stars 階段已有大量轉推；[jnMetaCode/agency-agents-zh](https://github.com/jnMetaCode/agency-agents-zh) 衍生中文版（211 個 agent，含小紅書 / 抖音 / 微信特化）有獨立社群。維護者也持續 merge 社群 PR（contributors 列表前 10 名累計 200+ commits），不像純空殼。

**結論**：92K 的部分數字可能含水分（fork 比例異常 + AI 主題 + 速度線形），但底層產品有真實使用與社群衍生，不是純詐欺型 fake repo。讀者應把它視為「有真實用戶、但 star 絕對值需打折看待」的 viral repo。

### Release 狀態
**尚無 GitHub Release**。最近一次 push 是 2026-04-12，最新 commits 都是文件 PR（Qwen 整合、OpenClaw 路徑修正、Copilot agent 路徑提示）。專案以 main 分支滾動更新為主，未走 release tag 模式。

### 授權與社群
MIT License。主作者 [@msitarzewski](https://github.com/msitarzewski) 累計 120 commits，社群貢獻者前 10 名（[@jnMetaCode](https://github.com/jnMetaCode) 21、[@epowelljr](https://github.com/epowelljr) 15、[@4shil](https://github.com/4shil) 9⋯⋯）合計貢獻約 80 個 PR，多為新 agent / 平台整合。Open issues 120 個，subscribers 734 人——subscriber 數對 92K stars 偏低（健康 repo 通常 1–2%，此處 0.8%），又是一個值得留意的訊號。

## 更新紀錄

### 2026-05-06
- 連榜 Day 2（5-05、5-06），絕對榜由 **#9 → #8**（小幅升 1 名）；首次擠入增長率榜（**#9**，growth_rate 0.90% → **1.31%**，+0.41pp）；stars_today 828 → **1,228（+48.3%）**、total stars 92,420 → 93,471（+1,051），距離 100K stars 大關剩 6.5K。
- Release 端維持 `has_releases: false`，最新 push 仍為 2026-04-12 的文件 PR（無新 release tag），延續以 main branch rolling 發布的模式。
- 賽道側日報統計顯示 AI Agent 框架今日 3/10 仍為當日最大類別、但比昨日 5/10 縮減；msitarzewski/agency-agents 在類別內以「最大 stars 體量」站穩老牌位置，與新興 [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)、[ruvnet/ruflo](https://github.com/ruvnet/ruflo) 形成「老＋新」並列。
