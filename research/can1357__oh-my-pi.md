---
repo: can1357/oh-my-pi
first_seen: 2026-05-21
last_updated: 2026-05-21
appearances: [2026-05-21]
growth_appearances: [2026-05-21]
has_releases: true
latest_release: v15.1.8
tags: [AI Agent 框架, 應用程式, 多代理編排, 開源替代]
domain: AI Agent 框架
form: 應用程式
themes: [多代理編排, 開源替代]
---

## 深度研究（2026-05-21 首次）

### 專案定位

[can1357/oh-my-pi](https://github.com/can1357/oh-my-pi)（命令列簡稱 `omp`）是一款 terminal-first 的 AI 編碼代理，由 Can Bölük 從 Mario Zechner 的 [mariozechner/pi-mono](https://github.com/mariozechner/pi-mono) fork 出來、針對「實際生產級寫程式」重寫的「coding-first surface」。官網 [omp.sh](https://omp.sh) 自我定位為「a coding agent with the IDE wired in」——把 IDE 知道的東西（LSP、debugger、AST、瀏覽器）整套接給 agent，讓它能跑在純 terminal 也能嵌入 Zed 等編輯器。創立於 2025-12-31，截至上榜 5,323 stars / 451 forks，MIT 授權。

### 核心架構 / 主要概念

- **Hash-anchored edits（Hashline）**：模型不再重打整段內容，而以內容雜湊為錨點下 patch；Grok 4 Fast 在相同工作量下輸出 token 降 61%、消除 whitespace 衝突與「string not found」迴圈。
- **32 個內建工具 + 27k 行 Rust 核心**：`pi-natives`／`pi-shell`／`pi-ast` 三個 crate 透過 N-API 走 libuv 執行緒池，避開 fork/exec 開銷；原生支援 Linux／macOS／Windows（非 WSL）。
- **LSP（13 ops）＋ DAP（27 ops）**：透過 `workspace/willRenameFiles` 自動更新 re-export 與 barrel files；agent 可掛 lldb／dlv／debugpy 設斷點、檢查 stack。
- **Subagents + IRC**：子代理開獨立 worktree、回傳 schema-validated JSON，互通走 IRC 風格訊息；`/review` 並行噴 P0–P3 reviewer。
- **Time-Traveling Stream Rules**：regex 命中可中止生成、注入修正、原點續流。
- **多模式入口**：互動 TUI／`-p` 單 prompt／NDJSON RPC／ACP（Agent Client Protocol，可嵌 Zed）。

### 目標使用者

需要在 terminal 端跑「能真的把 PR 寫完」級別 agent 的軟體工程師——尤其是常在 LSP／debugger 場景操作、想用 hash-anchored edits 降 token 成本、或想自帶 Cursor／Claude／Copilot 計畫額度跨家路由的開發者。同時透過 ACP 模式可嵌入 Zed 編輯器，覆蓋 terminal-only ↔ IDE-integrated 兩端。

### 與類似專案的差異

- vs [anthropics/claude-code](https://github.com/anthropics/claude-code)：Claude Code 綁 Anthropic 一家、閉源核心；omp 開源 MIT、40+ provider（含 Cursor／Copilot／GLM／Ollama／vLLM）並支援 fallback chain 與 round-robin 額度管理。
- vs [cline/cline](https://github.com/cline/cline)／[Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode)：兩者皆 VS Code extension，omp 是純 terminal 二進位（macOS／Linux／Windows 原生），無須編輯器。
- vs [charmbracelet/crush](https://github.com/charmbracelet/crush)：Crush 主打 Go-based 多 provider TUI；omp 額外有 hash-anchored edits、DAP debugger 驅動、AST 結構編輯與 stealth 瀏覽器。
- vs 原 [mariozechner/pi-mono](https://github.com/mariozechner/pi-mono)：pi-mono 走「minimalist／anti-framework」、給 primitives 讓使用者組裝；omp 則 batteries-included、預設裝好 sessions／subagents／slash commands／extensions 全套。

### 外部評論

- [Hacker News 47148695](https://news.ycombinator.com/item?id=47148695)：使用者表示「從 pi 開始、用 oh-my-pi 兩週」，把它定位為「batteries-included 版的 pi」。
- [Hacker News 47150082](https://news.ycombinator.com/item?id=47150082)：另一派批評「推 oh-my-pi 的人沒抓到 pi 的 minimalism 重點」，反映 fork 與原作哲學的張力。
- [Hacker News 46664368](https://news.ycombinator.com/item?id=46664368)：標題「Oh My Pi: coding agent CLI, unified LLM API, TUI and web UI libraries」——進入 HN 主流視野的早期登場。
- [Hacker News 47689829](https://news.ycombinator.com/item?id=47689829)：實戰使用者以「naive/stubborn」自嘲堅持用 omp，反證其黏著度。
- [Mario Zechner 部落格 2025-11-30](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)：原作者談「打造 opinionated 與 minimal coding agent 學到什麼」，是理解 omp DNA 的源頭。

### Release 狀態

有 release。最新 [v15.1.8](https://github.com/can1357/oh-my-pi/releases/tag/v15.1.8) 於 2026-05-20 由 `github-actions[bot]` 自動發佈，附 macOS arm64 等多平台二進位資產。版號已跨進 v15，迭代節奏密集——5 個月內從 0 推進至 v15+ 主版號，是「持續 release driven」的活躍專案。

### 授權與社群

MIT 授權（© 2025 Mario Zechner；© 2025–2026 Can Bölük）。主維護者 [can1357](https://github.com/can1357)（Can Bölük），15 watchers／451 forks／172 open issues 顯示已形成具規模的早期社群；分發走 npm `@oh-my-pi/pi-coding-agent` 與 `curl | sh` 雙路徑，並設有 Discord。
