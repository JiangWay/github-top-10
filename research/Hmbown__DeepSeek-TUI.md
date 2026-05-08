---
repo: Hmbown/DeepSeek-TUI
first_seen: 2026-05-04
last_updated: 2026-05-09
appearances: [2026-05-04, 2026-05-05, 2026-05-06, 2026-05-07, 2026-05-08, 2026-05-09]
growth_appearances: [2026-05-04, 2026-05-05, 2026-05-06, 2026-05-07, 2026-05-08, 2026-05-09]
has_releases: true
latest_release: v0.8.22
tags: [AI Agent 框架, 應用程式, 開源替代, 多代理編排]
domain: AI Agent 框架
form: 應用程式
themes: [開源替代, 多代理編排]
---

# [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)

## 深度研究（2026-05-04 首次）

### 專案定位
[Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) 是一個以 Rust 寫成、跑在終端機裡的編碼代理（coding agent），專門為 DeepSeek V4 系列模型（`deepseek-v4-pro`、`deepseek-v4-flash`）量身打造，主打 1M token 脈絡視窗 + prefix cache + thinking-mode 串流。可視為一款「開源、單一二進位、DeepSeek 原生」版本的 [openai/codex](https://github.com/openai/codex) / Claude Code 對應品。

### 核心架構 / 主要概念
官方 README 描述為 `dispatcher → TUI → engine → tools` 的四層流水線：基於 [ratatui-org/ratatui](https://github.com/ratatui-org/ratatui) 的鍵盤介面與 async 引擎跑 agent loop，工具呼叫經由 typed registry 路由，並由耐久 task queue 管理 session 狀態。設計亮點：

- **原生 RLM（Recursive LLM Multiplexing）**：`rlm_query` 工具一次 fan-out 1–16 個 `deepseek-v4-flash` 子代理做平行批次分析、分解或推理。
- **三段互動模式**：Plan（唯讀規劃）/ Agent（每步審核）/ YOLO（全自動），對應不同信任邊界。
- **Side-git snapshots**：工作區回滾機制不會碰使用者真正的 `.git`，避免汙染版本史。
- **內建 MCP client、HTTP/SSE serve 模式、LSP 子系統**注入 post-edit 診斷，並支援 NVIDIA NIM、Fireworks、自架 SGLang。
- 單一 Rust 二進位、無 Node/Python runtime 相依。

### 目標使用者
- 想用 DeepSeek V4 取代 Claude / GPT 但又不想自己組 IDE 整合的開發者；
- 對 token 成本敏感、需要長時間後台跑批次（CI 清掃、過夜 doc 重生）的團隊；
- 偏好終端機 + 鍵盤工作流，且需要 1M context 處理整套 codebase 的工程師。

### 與類似專案的差異
- 對比 [sst/opencode](https://github.com/sst/opencode)：opencode 主打 70+ provider 通吃，DeepSeek-TUI 專注一家、把 V4 的 prefix cache 與 thinking-mode 吃到極致。
- 對比 [1jehuang/jcode](https://github.com/1jehuang/jcode)：兩者同為 Rust TUI coding agent，jcode 走 Claude / OpenAI 通用路線並強調本地檔案安全沙箱；DeepSeek-TUI 則以 DeepSeek 原生與 RLM 平行調度為招牌差異。
- 對比 [openai/codex](https://github.com/openai/codex) CLI：codex 綁定 OpenAI；DeepSeek-TUI 從零自研，核心 RLM 平行能力是其招牌差異。

### 外部評論
- [DeepSeek V4 — almost on the frontier (Hacker News)](https://news.ycombinator.com/item?id=47977026)：V4 發表討論串中多次提及社群急需「DeepSeek 原生 agent」，背景解釋了本專案突發竄升的需求面。
- [DeepSeek-TUI — AgentConn AI Agent Review](https://agentconn.com/agents/deepseek-tui/)：第三方目錄將其定位為「terminal-native, keyboard-driven, sub-agent orchestration」的代表作，強調 RLM 平行能力。
- [deepseek-tui-cli on Lib.rs](https://lib.rs/crates/deepseek-tui-cli) 與 [crates.io](https://crates.io/crates/deepseek-tui)：兩處 Rust 套件登錄頁皆已收錄，crates 下載量持續攀升。
- 中文社群尚未見大型評論文章（資料不足）。

### Release 狀態
有 release。最新版本 [v0.8.7](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.7)（2026-05-03 發布），由 GitHub Actions 自動產出多平台 binary 與 sha256 檢核檔。版本快速迭代中（0.8.x 系列 active）。

### 授權與社群
- **授權**：MIT。
- **社群規模**：2,022 stars、117 forks、6 watchers、106 open issues。
- **貢獻者**：以作者 [Hmbown](https://github.com/Hmbown)（Hayden Brown）為主（523 commits），目前僅 1 名外部貢獻者 [pizofreude](https://github.com/pizofreude)。屬於典型「個人主導、社群剛點火」階段的快速崛起專案。

## 更新紀錄

### 2026-05-05
- 連榜 Day 2（5-04、5-05），絕對榜由 #4 退至 **#4**（持平）；增長率榜守 **#1**，growth_rate 19.25% → **33.91%**（+14.66pp）為當日最大跳升、亦改寫本專案歷來增長率高點；stars_today +389 → **+1,277（+228%）**；total stars 2,021 → 3,766（+1,745）兩日累計成長近 **86.4%**。
- Release 端 5-04 一日連跳 v0.8.8 / v0.8.9 / v0.8.10 三個 patch，最新版本 [v0.8.10](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.10)（5-04 16:42 UTC），主要強調**雙 binary 安裝模型**——npm `deepseek-tui` wrapper 把 `deepseek-tui-cli`（dispatcher）與 `deepseek-tui`（runtime）一次拉下，避免 `MISSING_COMPANION_BINARY` 報錯。
- 與另一檔 Rust coding agent [1jehuang/jcode](https://github.com/1jehuang/jcode)（連 6 日）形成「Rust agentic dev tooling 雙王」並列，加上 [browserbase/skills](https://github.com/browserbase/skills) 連 4 日仍在前段，agentic dev tooling 賽道密集競爭格局再度延續一日。

### 2026-05-06
- 連榜 Day 3（5-04～5-06），**首奪雙冠**：絕對榜由 #4 直跳 **#1**（取代昨日榜首 [ruvnet/ruflo](https://github.com/ruvnet/ruflo)）、增長率榜守 **#1** 連 3 日；growth_rate 33.91% → **35.21%**（+1.30pp，再創本專案歷來新高）；stars_today 1,277 → **2,389（+87.1%）**；total stars 3,766 → 6,784（+3,018，3 日累計成長近 **236%**）。
- Release 端 5-05 一日連 jump v0.8.11 / v0.8.12 兩個 patch，最新版本 [v0.8.12](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.12)（5-05 08:33 UTC）；安裝路徑維持 `npm install -g deepseek-tui` wrapper 自動下載 dispatcher + runtime 雙 binary 模型。
- 同時 6 檔被踢出榜（TauricResearch/TradingAgents、browserbase/skills、soxoj/maigret、qbittorrent/qBittorrent、czlonkowski/n8n-mcp、1jehuang/jcode），昨日「Rust agentic dev tooling 雙王」格局中 [1jehuang/jcode](https://github.com/1jehuang/jcode) 連 6 日紀錄結束，DeepSeek-TUI 獨自留榜並升頂。

### 2026-05-07
- 連榜 Day 4（5-04～5-07），**雙冠衛冕**：絕對榜守 **#1**、增長率榜守 **#1** 連 4 日；growth_rate 35.21% → **46.38%**（+11.17pp，再創本站歷來個股增長率新高）；stars_today 2,389 → **6,184（+158.8%）**單日吸星近本站歷來個股之最；total stars 6,784 → **13,334（+6,550，~96.5% 一日成長）**，4 日累計由 1,632 暴增至 13,334（**+717%**）。
- Release 端 5-05 → 5-06 又連發 v0.8.13（5-05 22:25 UTC）、v0.8.14（5-06 01:23 UTC），最新版本 [v0.8.14](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.14)；自 5-04 上榜以來連續 4 天每日皆 push 新 patch，maintainer 維修強度極高。
- 連榜 4 檔中 [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) 是唯一仍在加速的；同類 AI Agent 框架 [ruvnet/ruflo](https://github.com/ruvnet/ruflo) 由昨日 #2 退至 **#10**、stars_today 由 2,441 → 2,190（-10.3%），DeepSeek-TUI 已和 ruflo 拉開 3× 以上量級差距，獨佔 Rust agentic dev tooling 焦點。

### 2026-05-08
- 連榜 Day 5（5-04～5-08），**冠冕首失但增長榜五連霸**：絕對榜由 #1 退至 **#2**，被 Anthropic 官方 [anthropics/financial-services](https://github.com/anthropics/financial-services) 取代；增長率榜守 **#1** 連 5 日；growth_rate 46.38% → **31.50%**（-14.88pp，自 5-04 起首次回落，但仍是連榜第二高紀錄）；stars_today 6,184 → **5,787（-6.4%）**首日減速；total stars 13,334 → **18,373（+5,039，+37.8%）**，5 日累計由 1,632 暴增至 18,373（**+1,026%**）。
- Release 端 5-07 一日連 jump v0.8.15（5-07 01:49 UTC）、[v0.8.16](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.16)（5-07 05:16 UTC）兩個 patch；自 5-04 起連 5 天每日皆有新 patch，5 日累積 v0.8.7 → v0.8.16 共 9 個版本，maintainer 維修強度持續最高水位。
- 雖然 stars_today 首次出現負成長，但 31.50% 的 growth_rate 仍是當日第二名（[z-lab/dflash](https://github.com/z-lab/dflash) 19.15%）的 1.65×，獨擎拉動效應從「絕對量+增長率」的雙重壟斷，轉為「增長率」單軸獨大；佔當日 total stars_today（14,150）約 40.9%，相較 5-07 的 51.4% 市占下降但仍接近半數。

### 2026-05-09
- 連榜 Day 6（5-04～5-09），**增長榜五連霸告終**：絕對榜守 **#3**、增長率榜由 #1 退至 **#3**（growth_rate 31.50% → **17.74%**，-13.76pp）；stars_today 5,787 → **3,827（-33.9%）**連 2 日減速；total stars 18,373 → **21,576（+3,203，+17.4%）**，6 日累計由 1,632 暴增至 21,576（**+1,222%**）。
- 終結 5-04～5-08 連 5 日守增長榜 #1 的本站個股紀錄，被 [anthropics/financial-services](https://github.com/anthropics/financial-services) 取代（25.24% → 17.74% 雙冠衛冕），絕對榜冠冕同步由 anthropics 雙冠衛冕。
- Release 端 5-07 → 5-08 連 jump v0.8.17（5-07 19:37 UTC）→ [v0.8.22](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.22)（5-08 19:07 UTC）共 6 個 patch（v0.8.18「tighter TUI/runtime/install pass with safer session startup semantics, Docker images promoted to a supported install path」），單日 6 個 patch 為 maintainer 維修強度新高、6 日累計共 v0.8.7 → v0.8.22 16 個版本（每日約 2.7 patch）。
- 由「雙軸獨擎」回歸「單軸續強」：絕對量退至 #3、佔當日 total stars_today（12,108）約 31.6%（5-08 為 40.9%），相較 5-07 的 51.4% 連 2 日下滑但仍居首；本站歷來最長的連榜增長冠冕至此告終，後續觀察是否轉入「持榜衰退」段位。
