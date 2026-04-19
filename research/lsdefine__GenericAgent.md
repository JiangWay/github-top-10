---
repo: lsdefine/GenericAgent
first_seen: 2026-04-18
last_updated: 2026-04-18
appearances: [2026-04-18]
growth_appearances: [2026-04-18]
has_releases: false
latest_release: null
tags: [AI Agent 框架, 框架, 自進化]
domain: AI Agent 框架
form: 框架
themes: [自進化]
---

# [lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent)

## 深度研究（2026-04-18 首次）

### 專案定位
[lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) 是一個極簡、可自我演化的自主代理框架，核心僅約 3.3K 行 Python，讓任何 LLM（Claude、Gemini、Kimi、MiniMax 等）取得對本機電腦的系統級控制。宣稱相較同類代理節省約 6 倍 token 消耗。

### 核心架構 / 主要概念
- **分層記憶系統**：L0 Meta Rules、L1 Insight Index、L2 Global Facts、L3 Task Skills/SOPs、L4 Session Archive。
- **~100 行 Agent Loop**：感知→推理→執行→寫入記憶。
- **9 個原子工具**：`code_run`、`file_read`、`file_write`、`file_patch`、`web_scan`、`web_execute_js`、`ask_user`，加 2 個記憶管理工具。
- **核心理念**：「不預載技能，而是演化技能」，每次完成新任務會把執行路徑結晶為可重用 Skill，逐步長成個人化技能樹。
- **Context Window < 30K**，遠低於同類 200K–1M。

### 目標使用者
追求輕量自動化的開發者、研究者、辦公室工作者、小型企業主，以及想培養專屬技能樹的 LLM 重度使用者。

### 與類似專案的差異
- 對比 [anthropics/claude-code](https://github.com/anthropics/claude-code)：後者會話間無狀態，[lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) 則跨會話累積技能。
- 對比 [CharlesQ9/Self-Evolving-Agents](https://github.com/CharlesQ9/Self-Evolving-Agents)、[ViktorAxelsen/MemSkill](https://github.com/ViktorAxelsen/MemSkill)、[sentient-agi/EvoSkill](https://github.com/sentient-agi/EvoSkill)：後三者偏研究原型，[lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) 主打「3K 行可落地」。
- 主打「真實瀏覽器注入」保留登入態，涵蓋桌面與 ADB 手機控制。

### 外部評論
- 中文社群 [LinuxDo 討論串](https://linux.do/t/topic/1962519) 指稱作者屬復旦團隊。
- 作者自述整個 repo（從 git init 到 commit message）皆由 [lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) 自主完成，未手動打開終端。
- 英文 HN/Reddit 目前公開評論資料不足。

### Release 狀態
`/releases` API 回傳空陣列，**尚無任何 GitHub Release**；V1.0 於 2026-01-16 首次公開（即建立日期），最近一次 push 為 2026-04-17，仍在活躍更新。

### 授權與社群
MIT License。Stars 3,434、Forks 374、Open Issues 53（2026-04-18）；建立僅 3 個月即累積顯著關注，語言 Python 95.4%，topics 含 `self-evolving`、`skill-tree`、`llm-agent`、`computer-control` 等。

## 更新紀錄
