---
repo: rowboatlabs/rowboat
first_seen: 2026-05-10
last_updated: 2026-05-10
appearances: [2026-05-10]
growth_appearances: [2026-05-10]
has_releases: true
latest_release: v0.4.1
tags: [AI Agent 框架, 應用程式, 自架, 資料主權]
domain: AI Agent 框架
form: 應用程式
themes: [自架, 資料主權]
---

# [rowboatlabs/rowboat](https://github.com/rowboatlabs/rowboat) — 深度研究

## 深度研究（2026-05-10 首次）

### 專案定位
[rowboatlabs/rowboat](https://github.com/rowboatlabs/rowboat) 是一款**本地優先（local-first）、開源的 AI 同事桌面應用**，核心宗旨是把使用者的工作脈絡轉成**可累積、可檢視、可手動編修的知識圖譜**，再以這份長期記憶替主人擬郵件、做會議簡報、追蹤專案。資料一律以純 Markdown 形式落在本機，不上雲。專案於 2025-01 開始 commit，至 2026-05-10 已累積 13,687 stars / 1,358 forks。

### 核心架構 / 主要概念
- **Obsidian 相容 vault** — 工作記憶就是一堆 plain Markdown notes 與 backlinks，使用者可直接打開檔案編輯
- **Electron 桌面 app**（macOS / Windows / Linux 皆有 build），主語言 TypeScript（96.6%）；亦可 Docker 部署
- **整合層**：Gmail、Google Calendar、Fireflies 會議紀錄；MCP 通道串接 Exa、Slack、Linear/Jira、GitHub、X、ElevenLabs、Composio.dev
- **模型策略**：本機 [ollama/ollama](https://github.com/ollama/ollama) / LM Studio 或 BYO API key（OpenAI、Anthropic 等）
- **Live Notes**：對人 / 競品 / 專案的長活文件會自動隨郵件、會議、網路搜尋同步更新

### 目標使用者
- 需要做大量會前準備、會後追辦的中高階知識工作者與主管
- 對隱私敏感、不願把郵件 / 會議紀錄送上 SaaS 雲端的個人或團隊
- 重度 [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases) 使用者，希望 AI 直接寫進自己的 vault

### 與類似專案的差異
- vs [reworkd/AgentGPT](https://github.com/reworkd/AgentGPT)、[Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)：Rowboat 不靠每次 cold-retrieval，而是「記憶會疊加」
- vs Granola、Notion AI：強調**資料主權**——記憶長在本機 Markdown，使用者可直接改，而非藏在 vendor 的 model context
- vs [mem0ai/mem0](https://github.com/mem0ai/mem0)：Rowboat 是端對端桌面 app + 整合層，而非 SDK／記憶層 library

### 外部評論
- Hacker News Show HN 串：用戶 rukuu001 稱讚「題目挑得好、表達清楚」；mchusma 回報實測時 graph 出現認不出的 entity、email archive 卡住；saberience 質疑 graph 結構相對單純 DB 的優勢，並擔心未來轉付費 [(來源)](https://news.ycombinator.com/item?id=46962641)
- YC 公司頁：Rowboat Labs 為 YC 投資組合，創辦人 Arjun Maheswaran、Ramnique Singh，先前共同創辦客服 AI 公司 Agara，2021 年被 Coinbase 收購 [(來源)](https://www.ycombinator.com/companies/rowboat-labs)

### Release 狀態
- 最新版本：v0.4.1（2026-05-08）
- 主要特性：桌面 app 三平台 build 隨版本附 assets。

### 授權與社群
- 授權：Apache-2.0
- 主語言：TypeScript（96.6%）
- Stars：13,687｜Forks：1,358｜Watchers：76｜Open Issues：105
- 主要貢獻者：[ramnique](https://github.com/ramnique)（644 commits）、[arkml](https://github.com/arkml)（387 commits），加上 [akhisud3195](https://github.com/akhisud3195) 與 [tusharmagar](https://github.com/tusharmagar)（合計 ~550 commits）；典型 YC 早期團隊「核心 4 人撐起九成貢獻、社群 PR 尚輕」的形態。

## 更新紀錄
