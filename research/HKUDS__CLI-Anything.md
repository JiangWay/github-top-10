---
repo: HKUDS/CLI-Anything
first_seen: 2026-05-18
last_updated: 2026-05-21
appearances: [2026-05-18, 2026-05-19, 2026-05-20, 2026-05-21]
growth_appearances: [2026-05-18, 2026-05-19, 2026-05-20, 2026-05-21]
has_releases: true
latest_release: v0.3.0
tags: [AI Agent 框架, 框架, 開源替代, 多代理編排]
domain: AI Agent 框架
form: 框架
themes: [開源替代, 多代理編排]
---

# [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) 深度研究（2026-05-18 首次）

[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) 由港大資料智能實驗室（HKUDS，也就是 [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything) 與 LightRAG 背後的同一團隊）推出，主打 "CLI-Anything: Making ALL Software Agent-Native" — 把任何具備原始碼或 GUI 的軟體自動包成 agent-native 的 Click CLI，讓 LLM agent 不必依賴脆弱的 GUI 自動化。專案於 2026-03-08 開倉，至 2026-05-18 累積約 35,466 stars、3,471 forks，採 Apache-2.0 授權，主語言 Python。

## 專案定位

CLI-Anything 不是另一個 agent runtime，而是「為 agent 製造工具的工具」。它提供一條 7 階段自動 pipeline（分析原始碼 → 設計架構 → 實作 Click CLI → 規劃與撰寫測試 → 文件化 → 發包），把 Blender、GIMP、LibreOffice、ComfyUI、FreeCAD、QGIS、Godot 等 GUI / 領域軟體轉成可由 [Claude Code](https://github.com/anthropics/claude-code)、Codex、OpenCode、Goose、Copilot CLI 等 agent 直接呼叫的子命令集。

## 核心架構 / 主要概念

關鍵概念是 CLI-Hub — 透過 `pip install cli-anything-hub` 取得的套件管理器與註冊中心，agent 可以在執行任務時自行瀏覽 catalog、選裝合適 CLI，無需人工介入。每個生成的 harness 同時提供 stateful REPL 與 subcommand 兩種介面，內建 `--json` 結構化輸出與 `SKILL.md` 描述檔，讓 agent 透過 `--help` 與 skill metadata 自我探索。底層由 Claude Code plugin（HARNESS.md 方法論 + 指令）、`cli_anything.*` namespace 下 40+ harness、統一的 `repl_skin.py`，以及 unit / E2E / subprocess 三層測試（2,280 個測試、100% 通過）構成。

## 目標使用者

需要讓 agent 操作專業軟體的開發者與研究者：創意工作流（Blender、GIMP、Krita、Inkscape）、影音剪輯（Audacity、Kdenlive、Shotcut）、辦公與筆記（LibreOffice、Obsidian、Mubu）、AI 平台（ComfyUI、Ollama、NotebookLM）、科研與工程（FreeCAD、QGIS、CloudCompare、LLDB、Nsight）、自動化與遊戲（n8n、Dify、Godot、Slay the Spire II）等。

## 與類似專案的差異

相較 [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) 之類的 GUI 自動化 MCP，CLI-Anything 不打 pixel 也不操控視窗，而是讓 agent 改走真正的後端（例如 Blender 真實渲染、LibreOffice 真實輸出 PDF）。相較通用 MCP server，它選擇 CLI 為原子介面 — 零序列化開銷、無常駐 server、可被任何 SKILL 相容 agent（OpenClaw、Nanobot、Codex、Antigravity）直接 spawn。社群已出現 fork 與類似專案如 [jackwener/opencli](https://github.com/jackwener/opencli) 與 [ItamarZand88/CLI-Anything-WEB](https://github.com/ItamarZand88/CLI-Anything-WEB) 擴展到 web app 場景。

## 外部評論

- [掘金〈CLI-Anything 全面解析：一行命令，为任意软件生成 Agent 接口〉](https://juejin.cn/post/7616652931065921571) 給予正面評價，認為「CLI 比 MCP server 更輕、零 config、零序列化開銷」。
- [Threads @prompt_case 介紹貼](https://www.threads.com/@prompt_case/post/DV2MOA-lOkJ/) 與 [Threads @sakeeb.rahman](https://www.threads.com/@sakeeb.rahman/post/DVyZt1DkUTz)、[Threads @recaplyai](https://www.threads.com/@recaplyai/post/DVqQmeGFBU6/github) 多則貼文均聚焦在「agent-native」這個賣點。
- GitHub [Issue #44 "Excellent project !! some questions"](https://github.com/HKUDS/CLI-Anything/issues/44) 中社群討論質疑「從 repo 直接 parse 出 CLI 是否總是合理」，是目前最具體的技術質疑。
- 官方 CLI-Hub catalog 站 [clianything.cc / hkuds.github.io/CLI-Anything](https://hkuds.github.io/CLI-Anything/) 為主要使用入口。

## Release 狀態

已發布 release。最新版本 [v0.3.0](https://github.com/HKUDS/CLI-Anything/releases/tag/v0.3.0)（2026-04-24），引入 cli-anything-hub 套件管理器、新增 CloudCompare、VideoCaptioner、Godot、Exa、Obsidian、Safari、n8n、QGIS、Uni-Mol、LLDB、Nsight Graphics 等 20+ harness，並補上 GUI 軌跡→CLI macro 編譯器。前一版 [v0.2.0](https://github.com/HKUDS/CLI-Anything/releases/tag/v0.2.0)（2026-03-30）奠定 plugin 架構與第一批 harness。

## 授權與社群

Apache-2.0 授權，主導者為 HKUDS（港大 Data Intelligence Lab，校內亦為 [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything)、[HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) 同源），釋出者 [@yuh-yang](https://github.com/yuh-yang) 為主要 release 簽署人。v0.2.0 → v0.3.0 之間湧入 60+ 位首次貢獻者，多以「為某軟體新增 harness」的形式 PR，呈現典型的「核心 + 外部廣域擴張」社群模式；151 watchers、3,471 forks 與 54 open issues 顯示活躍但仍處早期成長期。
