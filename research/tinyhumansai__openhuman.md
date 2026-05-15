---
repo: tinyhumansai/openhuman
first_seen: 2026-05-12
last_updated: 2026-05-16
appearances: [2026-05-12, 2026-05-13, 2026-05-14, 2026-05-16]
growth_appearances: [2026-05-12, 2026-05-13, 2026-05-14, 2026-05-16]
has_releases: true
latest_release: v0.53.40
tags: [LLM 客戶端, 應用程式, 自架, 資料主權, 開源替代]
domain: LLM 客戶端
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)

> 研究日期：2026-05-12
> 研究來源：https://github.com/tinyhumansai/openhuman
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman) 是 TinyHumans 開源的桌面端「個人 AI 超智能」——以 **Rust + Tauri** 寫成的 agent harness，主打把 Gmail / Notion / GitHub / Slack 等 118 個服務透過 OAuth 自動拉進本機 SQLite 的 **Memory Tree**，再用一個受小腦 Purkinje 細胞啟發的 **Subconscious Loop** 在背景持續反芻記憶；介面層附帶一個會「說話、加入 Google Meet」的桌面 mascot，全套以 GPL-3.0 釋出。

## 作者與起源

維護者是化名 **Neo**（GitHub [senamakel](https://github.com/senamakel)），舊金山開發者；TinyHumans 是其新創 AI lab，自我定位為「致力於把人類推向 artificial consciousness 的演算法實驗室」。Neo 在 [dev.to 自述](https://dev.to/neocortexdev/i-am-building-the-first-ai-agent-with-big-data-capabilities-70e)中提到，六年前他押注加密貨幣、建過一個 AUM 達 3 億美元的借貸協議，因「margin 極薄、駭客環伺、產業充斥投機者」收手，之後從零重啟、做出 TinyHumans。

OpenHuman repo 建立於 **2026-02-18**，首個 GitHub Release `v0.49.32` 是 **2026-03-31**，到 2026-04-24 在 SF GTC AI Demo Day 對外展示，同期透過 [Hacker News Show HN（2026-04-25 前後，2 points，submitter `enamakel`）](https://news.ycombinator.com/item?id=47876182)與[另一篇 HN 串「OpenClaw is toast. OpenHuman just landed」](https://news.ycombinator.com/item?id=47839564)導流。截至 2026-05-12 累積 1,269 stars / 169 forks / 19 watchers / 57 open issues / 16 contributors，首日上絕對榜即吸進 501 stars（佔總量約 39.5%），屬「上榜當日才被外界看見」的爆紅型。

實作主力為 `senamakel`（783 commits）與 `graycyrus`（235 commits），其餘為 GitHub Actions bot（160 自動化 commits）與來自社群的 PR 貢獻者（`M3gA-Mind`、`oxoxDev`、`jwalin-shah`、`sanil-23` 等十餘人，各 30~150 commits 不等）——以未滿三個月的專案而言，貢獻者形狀已不算純個人作。

## 核心架構 / 主要概念

### 技術堆疊
- **語言佔比**：Rust 70.6%（12.7 MB）、TypeScript 26.8%（4.83 MB）、JavaScript 2.1%、Shell 1.6%、其餘為 CSS / PowerShell / Dockerfile。Rust 是 Tauri 後端與記憶 / 整合管線的主體，TypeScript 則用於前端 desktop UI 與 Obsidian-style 渲染。
- **打包方式**：桌面 binary，提供 macOS DMG、Windows EXE 與 Linux 安裝指令；發行物來自 `github-actions[bot]`（已產出 160 次 commit、31 個 release）。

### 核心抽象
- **Memory Tree**：所有經 OAuth 接入的來源（Gmail、Slack、GitHub、Notion 等）先被「正規化」為 Markdown，再切成 ≤3k tokens 的 chunk，依時間 / 互動 / 隨機性打分，折疊成 per-source、per-topic、per-day 的階層摘要樹，儲存在本機 SQLite。
- **Obsidian Wiki**：與 Memory Tree 共享 chunk，但同時以 `.md` 落地到 Obsidian-相容 vault，使用者可直接打開瀏覽 / 編輯。靈感明顯來自 [Karpathy 的 obsidian-wiki](https://x.com/karpathy/status/2039805659525644595)。
- **Subconscious Loop**：受小腦 Purkinje 細胞啟發的背景常駐迴圈，[dev.to 自述](https://dev.to/neocortexdev/i-am-building-the-first-ai-agent-with-big-data-capabilities-70e)聲稱「每日觸發約 10,000 次核心記憶 recall、總成本低於 USD 1」，讓 agent 在使用者不下指令時也能主動行動。
- **TokenJuice**：在 tool call、scrape result、email body 進入任何 LLM 之前先做壓縮——HTML 轉 Markdown、長 URL 縮短、移除非 ASCII，自稱「成本與 latency 降低最高 80%」。
- **Model Routing**：在單一訂閱下將任務分派到 reasoning / fast / vision 三類模型；同時保留 [Ollama](https://github.com/ollama/ollama) 介面跑 local model。
- **118+ Integrations 與 Auto-fetch**：每連結一個服務都以 typed tool 暴露給 agent，core 每 20 分鐘掃描所有已連結帳號、把新資料拉進 Memory Tree。
- **Mascot 與 Voice**：桌面端有一個 lip-sync 的卡通頭像，STT 入、[ElevenLabs](https://elevenlabs.io/) TTS 出，並能以「真人參與者」身分加入 Google Meet。

依[官方 dev.to 自述](https://dev.to/neocortexdev/i-am-building-the-first-ai-agent-with-big-data-capabilities-70e)，Memory Tree 內部代號 **Neocortex**，宣稱「在 MacBook Air 等 CPU 硬體上以 10 秒內索引 1000 萬 tokens、每索引 500 萬 tokens 約 USD 1」；目前無第三方獨立 benchmark 佐證，**屬廠商自報**。

## 設計哲學

README 中段直接點名同類專案的痛點作為自家設計判斷的對照：

> "OpenHuman is the first agent harness that gets to know you in minutes. … Most agents start cold. Hermes learns by watching you work; OpenClaw waits for plugins to ferry context in. Either way, you spend days or weeks before the agent knows enough about your stack to be genuinely useful."

翻譯／解讀：OpenHuman 的核心主張不是「再加一個 chat 介面」，而是縮短「agent 從 cold start 到對你有用」的時間軸——做法是把 context ingestion 從「使用者推給 agent」翻轉成「agent 每 20 分鐘主動 pull」。

[dev.to 自述](https://dev.to/neocortexdev/i-am-building-the-first-ai-agent-with-big-data-capabilities-70e)另引用 Carnegie Mellon 的記憶研究做為 Memory Tree 評分機制的理論支點：

> "Forgetting Is a Feature, Not a Bug: Intentionally Forgetting Some Things Helps Us Remember Others."

翻譯／解讀：「遺忘是 feature，不是 bug。」這是 OpenHuman 不走純向量 RAG、改採「時間 / 互動 / 隨機性三因素打分 + 階層折疊」的設計理由——刻意讓低分節點不再被檢索，以維持 token 預算與相關度。

設計層面還有一條被反覆強調的 ethos：「**workflow data stays on device, encrypted locally, treated as yours**」。SQLite 本機儲存、Obsidian vault 可直接讀寫、可選 Ollama 跑 local model，是這條 ethos 的三個落地點。

## 目標使用者與適用情境

**適用**：
- **重度個人生產力使用者**：Gmail / Notion / Slack / Linear / Jira 多工具切換、希望單一 agent 跨工具回憶與行動。
- **隱私敏感工作者**：律師、醫護、ML 研究員等對 cloud LLM 端傳資料有顧慮、希望 workflow 留在本機者。
- **追求 [Claude Code](https://github.com/anthropics/claude-code) / Cursor 之外另一條 desktop-first 路徑的早期採用者**。
- **Obsidian 重度使用者**：Memory Tree 的 `.md` 落地與 [obsidian.md](https://obsidian.md/) vault 相容，可直接共用既有 PKM workflow。

**不適用**：
- **需要 production-grade 穩定性**：README 自承「**Early Beta**, expect rough edges」，且 [Issue #129](https://github.com/tinyhumansai/openhuman/issues/129) 紀錄了 startup 即 load fail 的回報。
- **拒絕付費 SaaS 訂閱**：自稱「one subscription unlocks 30+ providers」的商業模式仍要付月費，BYOK 是 fallback、不是主路徑。
- **GPL-3.0 與商業專案衝突者**：copyleft 強度高於 MIT，整合進閉源產品需法務評估。
- **Linux desktop 環境敏感者**：mascot 與 Google Meet 整合主推 macOS / Windows，Linux 走 wrapper、體驗未必對等。

## 與類似專案的差異

| 對手 | 路徑 | OpenHuman 的差異 | 何時選誰 |
|---|---|---|---|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 自架 LLM chat UI、後端接 Ollama / OpenAI-compatible | OpenHuman 不是 chat 客戶端，是 agent harness；自帶 Memory Tree 與 Auto-fetch、不需手動丟檔 | 只需 self-host chat 介面選 Open WebUI；需要持續理解使用者全棧資料選 OpenHuman |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | desktop + workspace RAG、純向量檢索 | 不走純向量、走 ≤3k chunk + 階層摘要樹；自帶 Subconscious Loop 與 mascot；OAuth 118 個整合 vs AnythingLLM 偏文件上傳 | 文件問答為主選 AnythingLLM；要 agent 跨 SaaS 自動拉資料選 OpenHuman |
| [ollama/ollama](https://github.com/ollama/ollama) | 本機 LLM runtime、不含 agent / memory 層 | OpenHuman 把 Ollama 視為 optional local 推理後端，自己負責 agent / memory / UI 全棧 | 只要 local model runtime 選 Ollama；要完整桌面 agent 選 OpenHuman |
| OpenClaw（README 點名、未開源主流 fork）| Terminal-first agent + BYO 模型 | OpenHuman desktop GUI + 桌面 mascot；context 由系統主動拉而非 plugin 推 | 偏 CLI workflow 與既有 plugin 生態選 OpenClaw；要 GUI + 自動 context 選 OpenHuman |
| [letta-ai/letta](https://github.com/letta-ai/letta)（前 MemGPT）| memory-centric agent framework、SDK 取向 | Letta 是函式庫、需要使用者組裝；OpenHuman 是 end-user desktop app | 自己組 agent 架構選 Letta；要拆箱即用桌面 agent 選 OpenHuman |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 自主任務 agent、配置複雜 | OpenHuman 強調 onboarding 數分鐘可用、context 由 OAuth + auto-fetch 自動建立 | 探索 autonomous task 設計選 AutoGPT；要日常生產力 daily driver 選 OpenHuman |

依 README 對比表，OpenHuman 把自己擺在 Claude Cowork（閉源、桌面 + CLI）、OpenClaw（MIT、terminal-first）、Hermes Agent（MIT、self-learning）旁邊；對閉源代表（Claude Cowork）的差異打在「open source + on-device memory」，對開源代表（OpenClaw / Hermes）的差異打在「auto-fetch + 118 個 OAuth 整合 + 內建 mascot / voice / model routing」。

## 外部評論

- [Hacker News 串「Show HN: OpenHuman, an AI agent with a subconscious loop」](https://news.ycombinator.com/item?id=47876182) — 由 submitter `enamakel`（即作者 senamakel）於 2026-04-25 前後送出，**僅 2 分、討論串幾乎沒有實質技術評論**；屬「自我宣傳但社群未接住」的型態。
- [Hacker News 串「OpenClaw is toast. OpenHuman just landed」](https://news.ycombinator.com/item?id=47839564) — 同樣由作者本人經 Twitter 轉貼，3 分；可見的單一 comment 是作者請使用者「留言 OpenHuman 就寄下載連結」，屬 growth hacking 風格貼文，技術討論薄弱。
- [dev.to「I built OpenHuman: An Open-Source AI Agent with a 1B-Token Memory and a Subconscious Loop」（2026-04-24）](https://dev.to/neocortexdev/i-am-building-the-first-ai-agent-with-big-data-capabilities-70e) — 第一人稱長文，揭露 Neocortex / Subconscious Loop 的設計動機與量化指標，但**全部數字皆廠商自報**、無第三方 benchmark。
- [TinyHumans 官方 X/Twitter @openhuman](https://x.com/openhuman) — 官方帳號，主要為產品宣傳；技術討論多在自家 [Discord](https://discord.tinyhumans.ai/)、[r/tinyhumansai](https://www.reddit.com/r/tinyhumansai/) 為自家 subreddit。
- 主流第三方媒體 / 中文社群：Search 未見顯著 [The Verge](https://www.theverge.com/)、[Hacker News 首頁](https://news.ycombinator.com/news)、Reddit r/LocalLLaMA / r/MachineLearning 主串討論，**獨立第三方評測資料不足**——這份報告中**所有效能與成本宣稱仍應以「廠商自報」看待**，等待社群跑出獨立 benchmark 為止。

## Release 狀態 / 時間軸

- **2026-02-18** — Repo 建立。
- **2026-03-31** — 首個 release `v0.49.32`，意味著前 6 週做了一波集中開發後才公開發版。
- **2026-04-24** — 在 GTC AI Demo Day（SF）對外亮相，同期作者寫 [dev.to 長文](https://dev.to/neocortexdev/i-am-building-the-first-ai-agent-with-big-data-capabilities-70e)，並透過 [Hacker News 兩串](https://news.ycombinator.com/item?id=47876182)導流。
- **2026-04 月** — 連發 v0.49.x、v0.50.x、v0.51.x 共多版，主跑 release-train 模式。
- **2026-05-04 ~ 05-09** — v0.53.4 → v0.53.22，6 天內 5 版，由 `github-actions[bot]` 自動 cut release。
- **2026-05-09** — 最新 release `v0.53.22`。
- **2026-05-12** — 首次上 GitHub Trending 絕對榜 #7（1,269 stars / 今日 +501，佔總量約 39.5%）。

過去 41 天（2026-03-31 ~ 2026-05-09）共 31 個 release，平均 **1.3 天一版**，屬本榜中發版頻率最高的一檔；其中後段主要由 GitHub Actions 自動發版，意味著 release pipeline 自動化已落地、人手不再是瓶頸。

## 授權與社群

- **License**：[GNU General Public License v3.0](https://github.com/tinyhumansai/openhuman/blob/main/LICENSE)。copyleft 強度高於前幾日上榜的同類 desktop agent，把「整合進閉源產品」這條商業化路徑卡掉，留下 SaaS 訂閱當主獲利。
- **量化指標**（2026-05-12 快照）：
  - **1,269 stars / 169 forks / 19 watchers / 57 open issues / 16 contributors**
  - **31 個 GitHub release**、最新 `v0.53.22`
  - **31 個 release / 41 天**，平均 1.3 天一版
  - 主力作者 `senamakel` 累積 **783 commits**
  - 語言分布：Rust 70.6% / TypeScript 26.8% / JavaScript 2.1% / Shell 1.6%
- **GitHub Topics**：repo 未設置 topics（截至 2026-05-12 API 回傳 `topics: []`），自家分類靠 README 與 GitBook 文件。
- **首日增長率**：501 / 1,269 ≈ **39.5%**——屬本日榜頂的爆紅型，與一週內幾檔「Hmbown/DeepSeek-TUI」「CloakHQ/CloakBrowser」首日比例同級。
- **社群通道**：[Discord](https://discord.tinyhumans.ai/)、[r/tinyhumansai](https://www.reddit.com/r/tinyhumansai/)、[@openhuman on X](https://x.com/openhuman)、[GitBook 文件](https://tinyhumans.gitbook.io/openhuman/)、[Trendshift badge](https://trendshift.io/repositories/23680)。

## 資料來源

- **本體**：
  - GitHub repo：<https://github.com/tinyhumansai/openhuman>
  - 官網：<https://tinyhumans.ai/openhuman>
  - GitBook 文件：<https://tinyhumans.gitbook.io/openhuman/>
  - Releases：<https://github.com/tinyhumansai/openhuman/releases>
  - 組織頁：<https://github.com/tinyhumansai>
  - 創辦人 GitHub：<https://github.com/senamakel>
  - X/Twitter：<https://x.com/openhuman>
  - Subreddit：<https://www.reddit.com/r/tinyhumansai/>
  - Discord：<https://discord.tinyhumans.ai/>
- **第三方評論**：
  - [Neo on dev.to: "I built OpenHuman: An Open-Source AI Agent with a 1B-Token Memory and a Subconscious Loop"](https://dev.to/neocortexdev/i-am-building-the-first-ai-agent-with-big-data-capabilities-70e)
  - [Hacker News: "Show HN: OpenHuman, an AI agent with a subconscious loop"](https://news.ycombinator.com/item?id=47876182)
  - [Hacker News: "OpenClaw is toast. OpenHuman just landed"](https://news.ycombinator.com/item?id=47839564)
  - [Trendshift repo page #23680](https://trendshift.io/repositories/23680)
  - [ghtrending project analysis](https://www.ghtrending.com/project/tinyhumansai/openhuman)
- **同類工具**：
  - [open-webui/open-webui](https://github.com/open-webui/open-webui)
  - [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)
  - [ollama/ollama](https://github.com/ollama/ollama)
  - [letta-ai/letta](https://github.com/letta-ai/letta)
  - [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)
  - [anthropics/claude-code](https://github.com/anthropics/claude-code)

## 更新紀錄

### 2026-05-14
- 連 3 日守絕對榜 #1（5-12 ~ 5-14）為本月新個股衛冕紀錄；同時連 3 日守增長榜 #1，growth_rate 由昨日 42.67% 回落至 **32.17%**（stars_today 1,042 → 1,595，分母 2,442 → 4,958）。雖然百分比下降，stars_today 反而再 +553（+53.1%），代表此檔仍持續加速擴散。
- 2026-05-13 同日連發兩版：[v0.53.35](https://github.com/tinyhumansai/openhuman/releases/tag/v0.53.35)（2026-05-13T10:19Z）→ [v0.53.40](https://github.com/tinyhumansai/openhuman/releases/tag/v0.53.40)（2026-05-13T13:44Z），3 小時內 5 個 patch 號跳躍，呼應上榜後遇到的桌面端 OAuth 與 memory tree 邊界問題。`latest_release` 由 v0.53.22 更新為 **v0.53.40**。

### 2026-05-16
- 隔 1 日從 5-14 後歸隊，**累計 4 次上榜**（5-12 ~ 5-14、5-16）；今日 stars_total 8,824、stars_today 1,272、growth_rate **14.41%**，由絕對榜 #1 退居 **#1（無變）**，但增長榜由連 3 日 #1 退至 **#2**（被 [NVIDIA-AI-Blueprints/video-search-and-summarization](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization) 27.98% 取代）。
- stars_total 4,958 → 8,824（+78.0% 翻 1.8 倍）反映 5-15 持續吸星但未上榜，分母擴大後 growth_rate 自然從 32.17% 降至 14.41%。`latest_release` 自 5-13 v0.53.40 後未動，48 小時無新版，與前幾日小時級 patch 節奏明顯不同——進入冷卻期。
