---
repo: nesquena/hermes-webui
first_seen: 2026-05-31
last_updated: 2026-06-01
appearances: [2026-05-31, 2026-06-01]
growth_appearances: [2026-05-31, 2026-06-01]
has_releases: true
latest_release: v0.51.185
tags: [LLM 客戶端, 應用程式, 自架, 資料主權]
domain: LLM 客戶端
form: 應用程式
themes: [自架, 資料主權]
---

# [nesquena/hermes-webui](https://github.com/nesquena/hermes-webui)

## 深度研究（2026-05-31 首次）

### 專案定位

[nesquena/hermes-webui](https://github.com/nesquena/hermes-webui)（9,658 stars / 1,333 forks / 2026-03-30 建立 / MIT / Python 73% + JavaScript 22% + CSS / 官網 <https://get-hermes.ai/>）是一個**社群（非官方）打造的 web + 手機端介面**，給 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) 這個 agent harness 當前端。它本身不是 agent，而是一層「瀏覽器 / 手機 UI」，把原本只有終端機 TUI 的 Hermes Agent 包成一個 dark-themed、行動裝置優先的單頁網頁 app。今日以 +320 stars / growth_rate 3.31% 首登絕對榜 #4。

關鍵背景是它的本體 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)——Nous Research 的開源 agent harness（174,366 stars / 29,584 forks / MIT / 2025-07-22 建立 / 標語「The agent that grows with you」），一個「住在你伺服器上、透過終端機或通訊軟體存取、會記住所學並越跑越強」的長壽自主 agent。本檔的存在意義就是把這個爆紅本體（17 萬 stars）缺的圖形 / 手機介面補上——本檔自我定位即官網所稱「Community Web UI (unofficial)」，是 Hermes 周邊生態系裡**最受歡迎的 dashboard**。本檔建立僅約兩個月（2026-03-30）即達 9.6k stars，是典型「爆紅本體拉動周邊 UI 工具」的衛星增長。

### 核心架構 / 主要概念

- **CLI 全功能對等（full parity）**：README 主張「凡是終端機能做的，這個 UI 都能做」——本檔不是閹割版面板，而是 Hermes Agent CLI 的完整 GUI 鏡像
- **三欄式版面**：左欄 session 列表與導航、中欄 chat、右欄 workspace 檔案瀏覽；頂部有圓環式 context ring 顯示 token 用量
- **後端如何接 Hermes Agent**：Python（Flask-based）`server.py`（約 446 行）做 HTTP 路由與認證；`/api/` 下模組化——`streaming.py`（SSE 串流引擎、`run_agent`、取消支援）、`models.py`（session 管理 + CLI bridge）、`routes.py`（GET/POST handlers）、`workspace.py`（檔案操作 + git 偵測）、`profiles.py`（profile 狀態 + Hermes CLI wrapper）。預設透過 CLI bridge 包裝 Hermes CLI，亦可設 `HERMES_WEBUI_CHAT_BACKEND=gateway` 改走 Hermes Gateway API server
- **web 存取機制**：server 預設只綁 localhost（127.0.0.1）；連遠端伺服器靠 SSH tunnel（`ssh -N -L <local>:127.0.0.1:<remote> user@host`）
- **手機存取機制**：UI 全 responsive、行動優先（hamburger 側欄、抽屜式頂部 tab、觸控友善控件），可當「每日主力 agent 介面」直接在手機瀏覽器使用；搭配 Tailscale VPN 即可免 port forwarding 安全從手機連入
- **零建置前端**：純 vanilla JavaScript + HTML + CSS，無 build step / 無 bundler / 無框架依賴，整個 codebase 約 42,000 行；主題系統支援 dark/light 與多色 skin
- **多 provider 模型**：下拉選單依已設定的 API key 動態填充——「any Hermes API provider」含 OpenAI / Anthropic / Google / DeepSeek / Nous Portal / OpenRouter / MiniMax / Xiaomi MiMo / Z.AI
- **session / workspace / profile**：session 可建立 / 改名 / 複製 / 刪除 / 依標題與內容搜尋、可釘選、可分色分組（session projects）、每段對話有 token 與成本追蹤；workspace 可內嵌預覽 text/code/Markdown(渲染)/圖片並偵測 git 分支與 dirty 檔數；profile 可多組切換並做 per-profile API key 隔離、免重啟切換
- **部署形態**：`python3 bootstrap.py` 一鍵（自動偵測 Hermes Agent、建環境、起 server）/ GHCR 預建多架構（amd64+arm64）Docker image + compose / `ctl.sh` daemon 模式（PID 寫 `~/.hermes/webui.pid`、log 寫 `~/.hermes/webui.log`）；狀態存於 repo 外 `~/.hermes/webui/`，與部署目錄隔離

### 目標使用者

已經在自己伺服器跑 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)、但不想只困在終端機 TUI 的使用者——尤其是想「從手機隨時跟 agent 對話」的人（README 與外部評論都強調手機是第一公民）。具體族群：自架 Hermes Agent 的開發者與 self-hosting 玩家、要長時間多輪對話且常離開電腦的重度 agent 使用者、想把 agent 變成「日常隨身助理」而非僅工作站工具的人。因預設只綁 localhost + 走 SSH tunnel / Tailscale，本質是 self-host / 資料留在自有硬體的隱私敏感族群。

### 與類似專案的差異

本檔競爭場域是「Hermes Agent 專屬 dashboard」而非泛用 LLM 客戶端。據 [bitdoze.com《Best Hermes Agent Dashboards & Web UIs in 2026》](https://www.bitdoze.com/best-hermes-dashboards/) 盤點，同生態系競品有：

| 競品 | 規模 / 定位 |
|---|---|
| **Hermes Workspace** | 約 2k stars — IDE 式 workspace，主打終端機 + 檔案 |
| **Hermes Web UI (EKKO)** | 約 1.5k stars — 中國平台支援、npm install |
| **Claw Admin** | 577 stars — 雙閘道（OpenClaw + Hermes） |
| **Hermes Control Interface** | 450 stars — 安全強化、零框架 |
| **Scarf** | 239 stars — 原生 macOS app |

該文把本檔列為「Best Overall」、「most popular dashboard by a wide margin」，差異化關鍵是**手機體驗**：「它是 responsive SPA，不是把桌面版硬塞進手機」，評測者自述「在手機上做過數小時對話、行動版面真的好用」。

與泛用 web 客戶端如 [open-webui/open-webui](https://github.com/open-webui/open-webui) 的根本差異：open-webui 是接 Ollama / OpenAI-compatible 端點的**模型聊天**前端，使用者直接對 LLM；本檔接的是 **agent harness**（Hermes Agent 的 CLI / Gateway），呈現的是 agent 的 tool call、skill、記憶、workspace 檔案樹與 session 狀態——是「agent 操作面板」而非「模型聊天框」。本檔也不自帶推理或模型，純粹當 Hermes Agent 的視覺化外殼。

### 外部評論

- [bitdoze.com《Best Hermes Agent Dashboards & Web UIs in 2026》](https://www.bitdoze.com/best-hermes-dashboards/)：把本檔評為 6 個 Hermes dashboard 中的「Best Overall」、「most popular by a wide margin」，重點誇手機 responsive SPA 體驗（含實測在 Xiaomi Redmi Note 13 Pro 4G 配 3.8 GiB RAM 的 VM、Chrome 渲染順暢）
- [Hermes Atlas — hermes-webui 專頁](https://hermesatlas.com/projects/nesquena/hermes-webui)：Hermes 生態系彙整站收錄本檔於「Workspaces & GUIs」分類
- [DeepWiki — nesquena/hermes-webui](https://deepwiki.com/nesquena/hermes-webui)：自動生成的架構文件，可佐證上述後端模組拆分
- 注意數據時點落差：上述評測文引用本檔「3.1k stars / 41 contributors / 164 releases」為較早快照，截至 2026-05-31 已達 9,658 stars，反映近期快速竄升
- 本體 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) 背景報導：[Hermes Agent 官方文件](https://hermes-agent.nousresearch.com/docs/)、[DataCamp《Nous Research Hermes Agent: Setup and Tutorial Guide》](https://www.datacamp.com/tutorial/hermes-agent)、[Sébastien Dubois《Hermes Agent》](https://www.dsebastien.net/hermes-agent/)——均描述 Hermes Agent 為 Nous Research 2026 年初開源、model-agnostic、會自主從成功軌跡建立 skill、跨 session 記憶的長壽 agent harness
- **截至撰寫未發現針對本檔（WebUI 本身）的 HN / Reddit 主流長文討論串**；目前傳播主要靠 Hermes 生態系彙整站（bitdoze / Hermes Atlas）與本體 17 萬 stars 的拉動效應

### Release 狀態

`has_releases: true`，且發版極度高頻——最新 [v0.51.185](https://github.com/nesquena/hermes-webui/releases/tag/v0.51.185)（2026-05-31 06:59 UTC）。release 由 `github-actions[bot]` 自動產生、tag 採 `v0.51.x` 高 patch 號（單 2026-05-31 一天內就連發 v0.51.181 → .182 → .183 → .184 → .185 五個），屬 CI 自動化「每次合併即發 patch」模式，版號的絕對數值（185）不代表成熟度而是發版頻率。倉 `pushed_at` 為當日，main 分支高度活躍。

### 授權與社群

- **授權**：MIT
- **本體關係**：本檔為 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)（174k stars 本體）的**非官方社群 UI**，官網明標「Community Web UI (unofficial)」；本檔自有官網 <https://get-hermes.ai/>
- **貢獻結構**：[nesquena](https://github.com/nesquena)（owner，以 `nesquena-hermes` bot 帳號 945 commits + 本人 276 commits 為絕對主力）+ [Michaelyklam](https://github.com/Michaelyklam)（126）+ ai-ag2026（111）+ [AJV20](https://github.com/AJV20)（93）；典型「單一作者主導 + 少數活躍貢獻者」結構，外部評測引用約 41 名 contributors
- **量化指標**：9,658 stars / **1,333 forks**（fork 比例約 13.8%，偏高，反映自架部署實際需求）/ 209 open issues（issue 數偏多，符合快速竄升期）/ 34 watchers
- **Topics**：`agent`, `ai-agents`, `hermes`, `hermes-agent`, `nous-research`

## 資料來源

**本體**
- Repo：<https://github.com/nesquena/hermes-webui>
- README：<https://github.com/nesquena/hermes-webui/blob/master/README.md>
- 官網：<https://get-hermes.ai/>
- Releases：<https://github.com/nesquena/hermes-webui/releases>
- Community Web UI 頁：<https://nesquena.github.io/hermes-webui/>

**Hermes Agent 本體**
- Repo：<https://github.com/NousResearch/hermes-agent>
- 官方文件：<https://hermes-agent.nousresearch.com/docs/>
- [DataCamp 教學](https://www.datacamp.com/tutorial/hermes-agent)
- [Sébastien Dubois 介紹文](https://www.dsebastien.net/hermes-agent/)

**外部評論與比較**
- [bitdoze.com《Best Hermes Agent Dashboards & Web UIs in 2026》](https://www.bitdoze.com/best-hermes-dashboards/)
- [Hermes Atlas — hermes-webui 專頁](https://hermesatlas.com/projects/nesquena/hermes-webui)
- [DeepWiki — nesquena/hermes-webui](https://deepwiki.com/nesquena/hermes-webui)
