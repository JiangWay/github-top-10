---
repo: Alishahryar1/free-claude-code
first_seen: 2026-04-24
last_updated: 2026-04-25
appearances: [2026-04-24, 2026-04-25]
growth_appearances: [2026-04-24, 2026-04-25]
has_releases: false
latest_release: null
tags: [LLM 客戶端, 應用程式, 開源替代]
domain: LLM 客戶端
form: 應用程式
themes: [開源替代]
---

# Alishahryar1/free-claude-code 深度研究（2026-04-24 首次）

[Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) 是一個 Python FastAPI 代理，讓使用者不用付費、也不用 Anthropic API key，就能把 Claude Code CLI 的請求轉送到 NVIDIA NIM、OpenRouter、DeepSeek、LM Studio、llama.cpp 等提供商。截至 2026-04-24 約 5,168 stars、905 forks、MIT 授權，由個人開發者 [Alishahryar1](https://github.com/Alishahryar1) 於 2026-01-28 建立。

## 專案定位

這是一套「把 Claude Code 前端殼子留下，換掉後端模型」的 BYOK（Bring Your Own Key）代理。核心命題是：Anthropic 的 Claude Code CLI 體驗很好（工具呼叫、檔案編輯、MCP、thinking tokens、Bash 整合），但呼叫 Anthropic API 需要付費或 Max/Team 訂閱；若在本機起一個 FastAPI server，把 `ANTHROPIC_BASE_URL` 指過去、把 `ANTHROPIC_AUTH_TOKEN` 設為假值（例如 `ccnim`），就能把所有 Opus/Sonnet/Haiku 的請求轉譯成 OpenAI-compatible 格式，丟到 NVIDIA NIM 的免費 40 req/min 額度、OpenRouter 的免費模型、或本機 LM Studio。副標題「like openclaw」是指 [openclaw.ai](https://openclaw.ai/) 那種把 agent 接上 Telegram/Discord 的玩法，本專案也內建 discord.py 與 python-telegram-bot 讓遠端下指令。

## 核心架構 / 主要概念

技術棧是 FastAPI + OpenAI Python SDK + uvicorn + uv（Astral 的 Python package manager），Python 3.14。流程：Claude Code 認定自己在跟 Anthropic 講話 → 請求打到 `http://localhost:8082` → 代理解析 Anthropic 格式 → 依 `model` 欄位（例如 `claude-opus-4`）查 routing 表決定丟到哪個 backend → 把 request 翻譯成 OpenAI 格式 → 呼叫實際 provider → 把 response（含 tool call、streaming、thinking tokens）再翻回 Anthropic 格式。四個設計重點：（1）**per-model 路由**：Opus 可以走 NVIDIA NIM 的 GLM-4.7、Sonnet 走 Kimi-K2.5、Haiku 走 Step-3.5-Flash，混搭 provider；（2）**thinking token 翻譯**：把 `<think>` tag 轉成 Anthropic 的 extended thinking 區塊；（3）**rate limit 主動節流**：避開 NIM 40 req/min 的硬限；（4）**Discord/Telegram bridge**：樹狀 threading、session 持久化、跨重啟恢復、語音轉錄（本機 Whisper 或 NIM）。值得注意的是，驗證是用 dummy token `ccnim`——Claude Code 客戶端並不會真的驗證 Anthropic 身分，只要 base URL 接得到就認。

## 目標使用者

（1）想嘗鮮 Claude Code 工作流但不願付 $20/月 Max 訂閱的個人開發者；（2）在中國或其他 Anthropic 支付/服務不便地區的使用者；（3）想用本機模型（LM Studio + Qwen3.5-35B、llama.cpp）做離線 coding 的隱私敏感用戶；（4）要把 coding agent 掛到 Discord 群做遠端協作或 cron job 的 hobbyist。不是給企業用的——沒有 SSO、沒有 audit log、沒有 SLA，而且整條 pipeline 其實跑在開發者一個人的 repo。

## 與類似專案的差異

Claude Code proxy 這類專案在 2026-04 已是一個小生態：[1rgs/claude-code-proxy](https://github.com/1rgs/claude-code-proxy) 用 LiteLLM 把 Claude Code 接到 Gemini/OpenAI，[fuergaosi233/claude-code-proxy](https://github.com/fuergaosi233/claude-code-proxy) 是純 OpenAI 相容轉換，[router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) 則反過來把 Gemini CLI / Codex / Claude Code 都包成統一 API。本專案的差異點在於（1）**免費優先**：明確主打「不用任何付費 API key」，把 NVIDIA NIM 的免費額度當預設 backend；（2）**內建 Discord/Telegram bridge**：其他 proxy 只做協定轉譯，這個專案把遠端操作 agent 的 UI 層也做進去，是比較接近完整產品；（3）**per-model 細粒度路由**：可以同一個 session 裡 Opus 用 A provider、Haiku 用 B provider。相對之下，它也有 fork 活躍的問題——[Rishurajgautam24](https://github.com/Rishurajgautam24/free-claude-code)、[rishiskhare/free-claude-code](https://github.com/rishiskhare/free-claude-code)、[Andrewkeith83/free-claude-code](https://github.com/Andrewkeith83/free-claude-code) 等多個幾乎同名的 fork 共同在搶 SEO，同一位 owner 另有更早的 [Alishahryar1/cc-nim](https://github.com/Alishahryar1/cc-nim)，暗示本 repo 是前者的改寫擴充版。

## 外部評論

此專案的「合法性」是社群主要爭論點。結論：**這個 repo 本身不是盜版**，它不分享任何 Anthropic key、不逆向 Anthropic 協定、不再散布 Claude Code 的 npm 程式碼；它是典型的 BYOK proxy，做的事是協定轉譯。不過其「正當性」與另一個明確違規的專案常被放在一起討論：Anthropic 官方 issue [anthropics/claude-code#41692](https://github.com/anthropics/claude-code/issues/41692) 點名 `nilupulk/claude-code-free` 這類會「重新散布修改過的 Claude Code 二進位、內嵌 dummy API key、指向共享 proxy」的專案違反 ToS，是可 DMCA 的目標；[Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) 沒有內嵌 Claude Code 程式碼，也要求使用者自己裝官方 Claude Code，因此不在同一級別。Medium 教學 [How to Run Claude Code for Free Using NVIDIA NIM](https://medium.com/@kapildevkhatik2/how-to-run-claude-code-for-free-using-nvidia-nim-complete-setup-guide-2026-a431b4fae230) 與部落格 [uright.ca: Running Claude Code for Free with Nvidia NIM](https://uright.ca/posts/running-claude-code-for-free-with-nvidia-nim/) 都把它當成合法技巧介紹，但都**沒提到 ToS 風險**或 Anthropic 可能不樂見這種用法。NVIDIA 官方其實也有一篇 [Use Claude Code with NIM](https://docs.nvidia.com/nim/large-language-models/latest/ai-assistant-integrations/claude-code.html) 認可這種整合，所以後端那一側是被祝福的。DEV 社群的 [kevdogg102396afk 的分享](https://dev.to/kevdogg102396afk/open-sourced-my-claude-code-nvidia-nim-stack-run-claude-code-with-free-models-55c5) 則把類似玩法開源化，顯示這是個**事實上合法、但踩在灰色地帶**的社群共識：使用者沒違法，但把「Claude Code」這個商標掛在非 Anthropic 模型的殼子上，是不是誤導終端使用者、是不是違反 Anthropic CLI 的 ToS，README 完全沒處理。

## Release 狀態

尚無 GitHub Release（`gh api repos/Alishahryar1/free-claude-code/releases` 回 `[]`）。專案在 2026-01-28 建立、2026-04-23 仍有 push，節奏非常活躍但都走 main branch，沒有版本標籤。對使用者的實務影響是：沒有「穩定版」可鎖——`git clone` 等於跟著 HEAD 跑，每次 pull 都可能遇到 breaking change。issue tracker 開著（21 open），最新一筆 [#139 Claude Code is used for /compact](https://github.com/Alishahryar1/free-claude-code/issues/139) 標題暗示 `/compact` 指令可能繞過 proxy 直接打到 Anthropic（但 issue body 無內容，無法證實）；另一筆 [#98 NOT WORKING THROW NVIDIA NIM server](https://github.com/Alishahryar1/free-claude-code/issues/98) 顯示 NIM backend 也有相容性問題。這兩則側面說明此專案的成熟度仍在早期。

## 授權與社群

授權 MIT，對使用、修改、再散布幾乎無限制。社群方面：5,168 stars、905 forks、39 watchers、21 open issues、作者 [Alishahryar1](https://github.com/Alishahryar1)（Ali Khokhar）看來是個人開發者，同時維護 [cc-nim](https://github.com/Alishahryar1/cc-nim) 等相關專案。沒有 Discussions、沒有 CODE_OF_CONDUCT、沒有 CONTRIBUTING——是典型 solo project 爆紅的型態。真正的**紅旗**有三個：（1）**README 完全沒處理 Anthropic ToS 合規問題**，把 `ccnim` 這個 dummy token 當成功能特點示範，等同教使用者繞過客戶端驗證；（2）**專案名「free-claude-code」帶有誘導性**——Claude Code 是 Anthropic 商標，用這個名字容易讓人誤會是官方或授權版本；（3）**大量近似名稱的 fork 同步存在**（Rishurajgautam24、rishiskhare、Andrewkeith83 等），可能有刷 star 或 SEO farming 的嫌疑，也可能只是 hype 自然擴散，資料不足以斷定。整體而言：它不是盜版、不是 key-sharing 黑市，但它是一個**立場模糊的灰色工具**——技術上合法，倫理上把 Anthropic 的品牌價值用在不付費給 Anthropic 的使用流程，而且作者對此零說明。

---

## 更新紀錄

### 2026-04-25
- 連續第 2 天上榜，今日衝上絕對榜 #1（昨日 #6），增長率榜 #2（昨日 #1）。stars_today 從 +2,388 上升到 +2,640，總 stars 從 5,166 → 8,191。
- Release 狀態無變化：`gh api repos/Alishahryar1/free-claude-code/releases` 仍回 `[]`，`has_releases: false` 維持不變。

### 2026-04-27
- **中斷一日後回榜**（4/26 跌出 Top 10，今日重返絕對榜 #3、增長率榜 #2）。stars_today +1,694，總 stars 8,191 → 13,136（兩日內 +4,945），growth_rate 12.90%。
- Release 狀態無變化（`has_releases: false`）。
- 觀察：絕對榜名次從 #6 → #1 → 跌出 → #3，stars_today 從 +2,388 → +2,640 → +1,694，呈現「衝高—持平—回穩」三段式衰退，但仍維持兩位數 growth rate；BYOK Claude Code 代理的需求未退潮。

---

生成時間：2026-04-24　資料來源：[GitHub repo](https://github.com/Alishahryar1/free-claude-code)、`gh api`、相關 fork 與社群文章（內文已附連結）。
