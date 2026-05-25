---
repo: manaflow-ai/cmux
first_seen: 2026-05-25
last_updated: 2026-05-25
appearances: [2026-05-25]
growth_appearances: [2026-05-25]
has_releases: true
latest_release: v0.64.10
tags: [LLM 客戶端, 應用程式, 開源替代, 多代理編排]
domain: LLM 客戶端
form: 應用程式
themes: [開源替代, 多代理編排]
---

# [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux)

## 深度研究（2026-05-25 首次）

### 專案定位

[manaflow-ai/cmux](https://github.com/manaflow-ai/cmux)（19,348 stars / 1,464 forks / 2026-01-28 建立、約 4 個月內衝破 19k stars / NOASSERTION license / Swift 主導 / homepage [cmux.com](https://cmux.com)）是「**為 AI coding agent 並行工作流而生的 macOS 原生終端機**」——直接嵌入 [ghostty-org/ghostty](https://github.com/ghostty-org/ghostty) 的 libghostty 渲染核心，疊加垂直 tab、跨 pane 通知聚合、內建瀏覽器與 CLI/socket API 控制層。今日以 +598 stars / growth_rate 3.09% 首登絕對榜 #7，背後是「**Y Combinator S24 兩人團隊 + Ghostty 創辦人公開背書 + 兩週 17k stars 病毒式擴散**」三股力量的疊加。與其說 cmux 是又一款終端機，不如說它是「Ghostty 的官方 GUI fork，但專為跑 Claude Code / Codex / OpenCode / Amp 等並行 agent 而調校」。

### 核心架構 / 主要概念

- **渲染核心**：直接連結 [libghostty](https://github.com/ghostty-org/ghostty)（Ghostty 的 C library 形式），讀取使用者既有 `~/.config/ghostty/config` 主題、字型、配色設定，無需重新配置；GPU 加速、120fps 渲染；不是 Electron / Tauri 而是 Swift + AppKit 原生 App 確保啟動快、低記憶體。
- **通知環（Notification Rings）**：當 coding agent 等待輸入時，對應 pane 出現藍色框、sidebar tab 同時亮起；跨多 split 多 tab 場景下可一眼定位「哪個 agent 在等我」；底層解析 OSC 9 / 99 / 777 終端機 escape 序列，並提供 `cmux notify` CLI 供 agent hook 主動觸發。
- **垂直 + 水平 tab + sidebar metadata**：sidebar 每個 workspace tab 顯示 git branch、PR 狀態與編號、工作目錄、監聽 port、最新通知文字；可同時垂直與水平 split；`Cmd+Shift+U` 跳到最近一則 unread——專為「同時開 17 個 agent」的工作流設計。
- **內建瀏覽器 + scriptable API**：可在 pane 內 split 出瀏覽器，提供從 [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) 移植的腳本 API——agent 可 snapshot accessibility tree、取 element ref、click、fill form、eval JS；讓 Claude Code 等可直接操作開發伺服器頁面。
- **SSH 一等公民**：`cmux ssh user@remote` 開遠端 workspace、瀏覽器 pane 自動路由遠端網路使 localhost 可直連、拖圖到遠端 session 自動透過 scp 上傳。
- **Claude Code Teams 整合**：`cmux claude-teams` 一鍵啟動 Claude Code teammate 模式並把 teammates 開為原生 split + sidebar metadata + notification 整合，不需 tmux。
- **多 agent resume 支援**：`cmux hooks setup` 對 Claude Code、Codex、Grok、OpenCode、Pi、Amp、Cursor CLI、Gemini、Rovo Dev、Copilot、CodeBuddy、Factory、Qoder 等 13 種 agent CLI 自動安裝 hook、保存原生 session ID、quit/relaunch 時自動 resume。
- **Browser import**：可從 Chrome / Firefox / Arc 等 20+ 瀏覽器導入 cookie / 歷史 / session，瀏覽器 pane 開機即已登入。
- **發版頻率**：v0.49.0 起以 [v0.64.10](https://github.com/manaflow-ai/cmux/releases/tag/v0.64.10)（2026-05-23）為最新 stable，5 月 5 日跨 minor 至 v0.64 後 18 天內連發 11 個 patch；另有 [nightly](https://github.com/manaflow-ai/cmux/releases/tag/nightly) 從 main 自動 build 並透過 Sparkle auto-update 分發；屬「每日 ship」節奏。

### 目標使用者

同時跑多個 AI coding agent 的開發者（README 直白寫「I run a lot of Claude Code and Codex sessions in parallel」）、不滿 Electron / Tauri 終端機效能但又想要 agent 通知聚合的 macOS 重度使用者、Ghostty 既有用戶想升級到「Ghostty + agent UX」、需要 SSH 遠端 agent workspace 的全端開發者、不想被 Warp / Cursor 等封閉產品鎖定工作流的開源派。團隊明說「cmux is a primitive, not a solution」——目標是把終端機 + 瀏覽器 + 通知 + workspace + split + CLI 包成可組合 primitive，使用者自己決定 agent 編排方式。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [ghostty-org/ghostty](https://github.com/ghostty-org/ghostty) | Ghostty 為純終端機（無 sidebar、無跨 pane 通知聚合、無內建瀏覽器、無 agent hook 框架）；本檔直接吃 libghostty 並讀其 config，**疊加** agent 工作流層而非取代 |
| [Warp](https://www.warp.dev/) | Warp 為「Agentic Development Environment」內建專屬 AI 與雲端 Oz 編排層、$18/mo 訂閱、封閉產品（[Termdock 2026 比較](https://www.termdock.com/en/blog/best-terminal-emulator-ai-cli-2026)）；本檔開源、不綁定 LLM provider、走「primitive 而非 opinionated 產品」哲學 |
| [wezterm/wezterm](https://github.com/wezterm/wezterm) | WezTerm 跨平台、內建多工器（無需 tmux）但**最新 stable release 為 2024-02、停滯兩年靠 nightly**（[Termdock 2026 比較](https://www.termdock.com/en/blog/best-terminal-emulator-ai-cli-2026)）；本檔僅 macOS、但每日 ship + 為 agent 特化 |
| [Eugeny/tabby](https://github.com/Eugeny/tabby) | Tabby 為 Electron-based 跨平台 SSH-first 終端機，雖開源但 Electron 帶來記憶體 / CPU overhead、滾動時 rendering 較鈍（[Termdock 比較](https://www.termdock.com/en/blog/best-terminal-emulator-ai-cli-2026)）；本檔 Swift / AppKit 原生 + libghostty GPU 渲染、效能取向相反 |
| [Calyx](https://github.com/Calyx) | 同為 Ghostty-based macOS 終端的競品，但定位偏一般使用而非 agent 特化（[Calyx vs cmux 比較文](https://dev.to/yuu1ch13/calyx-vs-cmux-choosing-the-right-ghostty-based-terminal-for-macos-26-28e7)） |
| tmux | 純文字模式多工器、無 GUI、無原生通知聚合；本檔以 native split / vertical tab + 視覺 ring 取代 tmux 大部分使用場景，README 明寫「No tmux required」 |

差異化關鍵：**唯一**同時提供「Ghostty libghostty 直連 + 原生 macOS 非 Electron + 跨 pane 通知聚合 + 13 種 agent CLI auto-resume + 內建可腳本化瀏覽器 + 開源 + 不綁定 LLM provider」的組合，市面上沒有相同形態的競品。

### 外部評論

- [cmux 官方 blog《Launching cmux on Show HN》](https://cmux.com/blog/show-hn-launch)：團隊自述 2026-02 Show HN 當日衝上 HN #2、launch X post 病毒擴散、Ghostty 創辦人 Mitchell Hashimoto 公開背書「programmability, layered UI, browser w/ api」
- [Y Combinator 公司頁面《Manaflow: Building the open-source terminal for coding agents》](https://www.ycombinator.com/companies/manaflow)：團隊 S24 batch、創辦人 [Austin Wang](https://github.com/austinywang) + [Lawrence Chen](https://github.com/lawrencecchen)（前 Minion AI founding engineer + Berkeley RISE Lab）
- [YC Launch《cmux: the open source terminal built for coding agents》](https://www.ycombinator.com/launches/PbB-cmux-the-open-source-terminal-built-for-coding-agents)：正式 launch 頁，標榜「兩週 17k stars」「Nvidia / Google / OpenAI 員工使用」
- [Hacker News 47417143 串中提到 cmux 為日常切換終端](https://news.ycombinator.com/item?id=47417143)：使用者實際分享「我切到 cmux 用了一陣子」的口碑佐證
- [explainx.ai《cmux: The Ultimate macOS Terminal for AI Coding Agents》](https://www.explainx.ai/blog/cmux-terminal-ai-coding-agents-2026)：第三方深度評測長文
- [DEV Community《cmux: The Terminal Built for AI Coding Agents》](https://dev.to/neuraldownload/cmux-the-terminal-built-for-ai-coding-agents-3l7h)：社群推廣文盤點功能
- [DEV Community《Calyx vs cmux》](https://dev.to/yuu1ch13/calyx-vs-cmux-choosing-the-right-ghostty-based-terminal-for-macos-26-28e7)：與另一款 Ghostty-based 終端的橫評
- [Aitoolnet《cmux — Native macOS terminal for parallel AI agent orchestration》](https://www.aitoolnet.com/manaflow-ai-cmux)：工具目錄收錄
- [dudarik.com《cmux — The Terminal Built for Multitasking with AI Agents》](https://dudarik.com/en/blog/cmux-the-terminal-built-for-multitasking/)：第三方部落格評測
- [Petronella Cybersecurity《Cmux: The AI Agent Terminal For Regulated Dev Shops》](https://petronellatech.com/blog/cmux-terminal-ai-productivity/)：從合規角度切入的評測
- [Fondo《cmux Launches》](https://fondo.com/blog/cmux-launches)：launch 報導
- [LinkedIn — Lawrence Chen 推 Cmd+Shift+U 功能](https://www.linkedin.com/posts/lawrencecchen_my-favorite-cmux-feature-is-cmdshiftu-activity-7439874898795151360-UTXy)：團隊自宣

### Release 狀態

有正式 release。最新 stable [v0.64.10](https://github.com/manaflow-ai/cmux/releases/tag/v0.64.10)（2026-05-23）；自 v0.49.0（2026-02-19）公開首發以來累計 40+ 版；5 月節奏：[v0.64.0](https://github.com/manaflow-ai/cmux/releases/tag/v0.64.0)（5-05）→ [v0.64.10](https://github.com/manaflow-ai/cmux/releases/tag/v0.64.10)（5-23）共 11 patch 屬高頻；另有 [nightly](https://github.com/manaflow-ai/cmux/releases/tag/nightly) 從 main 自動 build；分發走 Sparkle auto-update + DMG 下載 + `brew tap manaflow-ai/cmux` Homebrew cask 雙軌；nightly 與 stable 為**獨立 bundle ID 可共存**，README 明確區分穩定線與開發線；倉 `pushed_at` 為 2026-05-25 顯示 main 分支當日仍活躍。

### 授權與社群

- **授權**：`NOASSERTION`（GitHub 標 license: Other）—README 與 repo 未在常規位置列出 SPDX-recognized license 全文，**對 fork / 商用分發者構成法律不確定性**；對比同為開源終端的 Ghostty（MIT）、wezterm（MIT）、tabby（MIT）較不友善，這是 cmux 目前最大的開源治理弱點。
- **貢獻結構**：典型「核心兩人 + 長尾社群 PR」——[lawrencecchen](https://github.com/lawrencecchen)（Lawrence Chen，2,168 commits 共同創辦人 + 主要 maintainer）+ [austinywang](https://github.com/austinywang)（Austin Wang，906 commits 共同創辦人）兩人合計 3,074 commits 主導 90%+ 開發；其他長尾 contributor 多為個位數 PR（[talldan](https://github.com/talldan) 9、[BillionClaw](https://github.com/BillionClaw) 8、[atani](https://github.com/atani) 8、[0xble](https://github.com/0xble) 7…）；值得注意的是 [tobi](https://github.com/tobi)（Tobias Lütke，Shopify 創辦人 / CEO）也以 5 commits 名列貢獻者——CEO 級開發者親自下場提 PR 是 cmux 在矽谷產業圈口碑的具體佐證。
- **量化指標**：19,348 stars / **1,464 forks**（fork 比例 7.6% 對純 GUI app 屬偏高）/ **2,093 open issues**（issue 流量高顯示真實使用者大量）/ has_discussions 啟用
- **Topics**：`amp`, `claude-code`, `codex`, `gemini`, `ghostty`, `opencode`, `terminal`, `tmux` 共 8 個——topic 列表本身就是「cmux 同時整合哪些主流 agent CLI」的廣告牌
- **多語 README**：英 / 日 / 越 / 簡中 / 繁中 / 韓 / 德 / 西 / 法 / 義 / 丹 / 波 / 俄 / 波 / 阿 / 挪 / 葡 / 泰 / 土 / 高棉 / 烏 共 21 種語言並列，國際化投入遠超同期競品
- **社群通路**：[Discord](https://discord.gg/xsgFEVrWCZ)（含 `#nightly-bugs` 專門 channel）、[X / Twitter @manaflowai](https://x.com/manaflowai)、官網 [cmux.com](https://cmux.com)（含 [《The Zen of cmux》](https://cmux.com/blog/zen-of-cmux) 哲學長文與 [demo video](https://www.youtube.com/watch?v=i-WxO5YUTOs)）
- **公司**：背後為 [Manaflow](https://www.ycombinator.com/companies/manaflow)，YC S24 batch，原本做 AI operations 平台後 pivot 為終端機產品

## 資料來源

**本體**
- Repo：<https://github.com/manaflow-ai/cmux>
- 官網：<https://cmux.com>
- Releases：<https://github.com/manaflow-ai/cmux/releases>
- 文件：<https://cmux.com/docs/getting-started>
- 哲學長文：<https://cmux.com/blog/zen-of-cmux>
- Demo video：<https://www.youtube.com/watch?v=i-WxO5YUTOs>

**外部評論與比較**
- [cmux 官方《Launching cmux on Show HN》](https://cmux.com/blog/show-hn-launch)
- [Y Combinator 公司頁](https://www.ycombinator.com/companies/manaflow)
- [YC Launch 頁](https://www.ycombinator.com/launches/PbB-cmux-the-open-source-terminal-built-for-coding-agents)
- [Hacker News 47417143 串](https://news.ycombinator.com/item?id=47417143)
- [explainx.ai 評測](https://www.explainx.ai/blog/cmux-terminal-ai-coding-agents-2026)
- [DEV Community 推廣文](https://dev.to/neuraldownload/cmux-the-terminal-built-for-ai-coding-agents-3l7h)
- [DEV Community《Calyx vs cmux》](https://dev.to/yuu1ch13/calyx-vs-cmux-choosing-the-right-ghostty-based-terminal-for-macos-26-28e7)
- [Aitoolnet 工具頁](https://www.aitoolnet.com/manaflow-ai-cmux)
- [dudarik.com 評測](https://dudarik.com/en/blog/cmux-the-terminal-built-for-multitasking/)
- [Petronella 評測](https://petronellatech.com/blog/cmux-terminal-ai-productivity/)
- [Fondo launch 報導](https://fondo.com/blog/cmux-launches)
- [Termdock 2026 終端機比較](https://www.termdock.com/en/blog/best-terminal-emulator-ai-cli-2026)
- [LinkedIn — Lawrence Chen 推 Cmd+Shift+U](https://www.linkedin.com/posts/lawrencecchen_my-favorite-cmux-feature-is-cmdshiftu-activity-7439874898795151360-UTXy)
