---
repo: InsForge/InsForge
first_seen: 2026-05-07
last_updated: 2026-05-07
appearances: [2026-05-07]
growth_appearances: []
has_releases: true
latest_release: v2.1.1
tags: [LLM 基礎建設, 框架, 自架, 開源替代, 企業級]
domain: LLM 基礎建設
form: 框架
themes: [自架, 開源替代, 企業級]
---

# InsForge/InsForge — 深度研究

## 深度研究（2026-05-07 首次）

### 專案定位
[InsForge/InsForge](https://github.com/InsForge/InsForge) 是一個為「AI coding agent」量身訂做的後端平台。它把資料庫、認證、儲存、Edge Function、Hosting 與 Model Gateway 全部包成 agent 可直接讀懂並操作的「semantic layer」，agent 不必自己拼接 SDK 就能端到端搭出 fullstack 應用。

### 核心架構 / 主要概念
- 以 PostgreSQL 為核心，內建 pgvector 與 realtime（WebSocket）。
- 認證模組（OAuth2 / 多租戶）、S3 相容儲存、容器級 Compute（私測中）、靜態站台部署。
- **Model Gateway**：OpenAI 相容 API，串接多家 LLM，方便 agent 用統一介面叫模型與 embedding。
- **MCP 整合**：所有 backend primitive 透過 MCP server 暴露，agent 可 introspect schema、跑 SQL、看 logs、改 RLS。
- 雙態部署：自架 OSS 版或 InsForge Cloud。

### 目標使用者
Claude Code / Cursor / Windsurf 等 AI coding agent 的使用者、想用 vibe-coding 路線交付 fullstack 應用的個人開發者，以及希望以開源替代 [supabase/supabase](https://github.com/supabase/supabase) 的小型團隊。

### 與類似專案的差異
對比 [supabase/supabase](https://github.com/supabase/supabase)：InsForge 的差異點是「為 agent 而設計」——schema、auth、storage 介面都先以 agent 友善 semantic 暴露，並提供 Model Gateway 與 MCP 一體化整合。對比 [appwrite/appwrite](https://github.com/appwrite/appwrite)：appwrite 偏向跨語言 SDK，InsForge 偏向 agent 自動化編排。官方 README 引用 benchmark 指 agent 在 InsForge 上比 Supabase 快 1.6×、token 用量少 30%、準確率高 1.7×（出處需自行驗證）。

### 外部評論
- [Show HN: InsForge AI, Open-Source Agent Friendly Alternative to Supabase](https://news.ycombinator.com/item?id=45449787)：社群把它直接定位成「面向 agent 的 Supabase」。
- [InsForge – An open source backend for AI coding agents](https://news.ycombinator.com/item?id=45291644)：另一條 HN front page 紀錄。
- [Pasquale Pillitteri: Superpowers vs Insforge 比較文](https://pasqualepillitteri.it/en/news/1341/superpowers-vs-insforge-comparison-2026)：把它與 [obra/superpowers](https://github.com/obra/superpowers) 對照，前者重 agent 工作流、後者重 backend。

### Release 狀態
有 release，最新 [v2.1.1](https://github.com/InsForge/InsForge/releases/tag/v2.1.1)（2026-05-06），與 v2.1.0 同日連發，更新節奏頻密。

### 授權與社群
Apache-2.0；8,356 stars / 697 forks / 45 open issues。topics：`ai-agents`、`pgvector`、`embeddings`、`oauth2`、`realtime`、`websockets`。團隊位於 Seattle，5 人小組，2025-07 launch、4 個月已開出 2,000 個正式資料庫。
