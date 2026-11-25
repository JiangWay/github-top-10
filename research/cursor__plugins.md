---
repo: cursor/plugins
first_seen: 2026-11-26
last_updated: 2026-11-26
appearances: [2026-11-26]
growth_appearances: [2026-11-26]
has_releases: false
latest_release: null
tags: [LLM 客戶端, Skill 外掛, 企業級]
domain: LLM 客戶端
form: Skill 外掛
themes: [企業級]
---

# [cursor/plugins](https://github.com/cursor/plugins)

> 研究日期：2026-11-26
> 研究來源：https://github.com/cursor/plugins
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[cursor/plugins](https://github.com/cursor/plugins) 是 Cursor 官方的 plugin 規格與 marketplace 倉庫，repo description 為「Cursor plugin specification and official plugins」。倉庫根目錄每個資料夾是一個獨立 plugin，各帶 `.cursor-plugin/plugin.json`，根目錄的 `.cursor-plugin/marketplace.json` 目前列出 159 個 plugin 入口。

## 作者與起源

倉庫由 Cursor（Anysphere）組織帳號於 2026-01-23 建立，最早的 commit 在 2026-02-09，與 Cursor 2.5 把 plugin 當作正式功能釋出的時間相近（[Cursor 2.5 Changelog](https://cursor.com/changelog/2-5)）。截至 2026-11-26 共 1,341 個 PR，最近一次 push 為 2026-11-24。

貢獻者前幾名是 [poteto](https://github.com/poteto)（177 commits）、`cursoragent`（106，Cursor 自家 bot）、minupalaniappan（82）、djiang-jq（76）、ericzakariasson（66）。README 表格中的作者欄除 "Cursor" 外，還有 Eric Zakariasson、Lauren Tan（pstack）、Dylan Gattey（dyl-stack），可見官方倉庫也收員工個人 plugin。

## 核心架構 / 主要概念

語言組成以 TypeScript 為主（約 898 KB），其餘為 TLA+（31 KB）、JavaScript、Mermaid、Shell。TypeScript 多半來自驗證腳本與部分 plugin 的 SDK 範例。

目錄結構：

- `.cursor-plugin/marketplace.json`：全倉庫索引（name / source / description）。另有 `.claude-plugin/` 目錄，提供同一份索引給 Claude Code 格式。
- `<plugin>/.cursor-plugin/plugin.json`：單一 plugin manifest，欄位含 name、displayName、version、description、author、license、keywords、category、tags，以及指向 `skills/`、`agents/`、`rules/` 的路徑。
- `schemas/`：`plugin.schema.json` 與 `marketplace.schema.json` 兩份 JSON Schema，`scripts/` 負責驗證。
- `third_party/`：Gmail、Salesforce、GitHub、Playwright 等 SaaS 整合，README 分類為 Productivity 與 Integrations。

一個 plugin 可同時打包 skills、subagents、MCP servers、hooks、rules，Cursor 官方文件的說法是一次安裝全部（[Cursor 2.5 論壇公告](https://forum.cursor.com/t/cursor-2-5-plugins/152124)）。以 `cursor-team-kit`（v1.2.0、MIT）為例，`skills/` 下有 18 個項目。

## 設計哲學

README 開頭一句：

> Each plugin is a standalone directory at the repository root with its own `.cursor-plugin/plugin.json` manifest.

意思是 plugin 之間互不依賴，靠 manifest 自述內容，marketplace 只做索引。`cursor-team-kit` 的 description 另寫明「Designed to work without requiring third-party service integrations」，內部工作流與第三方整合在目錄上分開（`third_party/`）。

Cursor 文件說明官方 plugin 經 Cursor 團隊人工審核後才上架（[Cursor Plugins 文件](https://cursor.com/docs/plugins)），也就是封閉審核、非開放提交。社群 plugin 另放在 [cursor/community-plugins](https://github.com/cursor/community-plugins)。

## 目標使用者與適用情境

- Cursor 使用者：用 `/add-plugin` 或在 cursor.com/marketplace 安裝，省去手動拼裝 skill、rule、MCP。
- Plugin 作者：`create-plugin` 提供 scaffold 與驗證，schema 可直接拿來做 CI 檢查。
- 團隊與企業：Cursor 論壇有使用者詢問私有 marketplace，官方回覆開發中，Teams 與 Enterprise 方案可匯入 GitHub repo 當團隊 marketplace。

不適用：只用 Claude Code 或 Codex 的人，因 manifest 路徑是 `.cursor-plugin`，需靠相容層；也不適合期待開放上架的第三方作者，要走 community-plugins。

## 與類似專案的差異

| 對手 | 本專案的差異 | 什麼時候選誰 |
|---|---|---|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) plugin / marketplace | Claude Code 的 marketplace 是任何 Git repo 加 `marketplace.json` 就能自建；Cursor 官方倉庫同時是規格、官方 plugin 與第三方 SaaS 整合的集中地，並附 schema 驗證。本倉庫另有 `.claude-plugin/` 索引，Cursor 方向上有相容 Claude Code 格式的動作 | 用 Claude Code 選其 marketplace；用 Cursor IDE 選本倉庫 |
| [cursor/community-plugins](https://github.com/cursor/community-plugins) | 同公司的社群倉庫，本倉庫是人工審核的官方版 | 想上架官方 marketplace 看審核，想快速分享走 community |
| MCP server 單獨安裝 | plugin 把 MCP 與 skills、hooks、rules 綁成一包，不必逐項設定 | 只需要單一外部工具時，單裝 MCP 更輕 |

其他主流工具（VS Code extension、GitHub Copilot 的 extension）目前沒有「skills + subagents + hooks + MCP 一包安裝」的對應格式，這點是依官方文件描述推論，未做逐項實測。

## 外部評論

HN 與 Reddit 查無顯著討論串，以下為已查到的第三方與官方社群資料：

- [Cursor 論壇：2.5 Plugins 公告串](https://forum.cursor.com/t/cursor-2-5-plugins/152124)：有使用者問是否支援私有、自訂 marketplace 與社群 plugin 去向，Cursor 回覆私有團隊 marketplace 開發中。此為官方論壇，非獨立評論。
- [Cursor Blog：new plugins](https://cursor.com/blog/new-plugins)：2026-03 官方宣布新增 30 多個 plugin，屬官方自述。
- [DeepWiki：cursor/plugins](https://deepwiki.com/cursor/plugins)：自動產生的結構摘要，數字（13 個官方、18 個第三方）已落後於現在的 159 個索引項。
- [Claude Marketplaces 目錄收錄頁](https://claudemarketplaces.com/plugins/cursor-plugins)：第三方目錄把本倉庫當 Claude Code 可用 marketplace 收錄，內容為列表，無評論。

獨立部落格評測、中文社群討論：資料不足（已查 WebSearch 的 HN / Reddit / Cursor 論壇 / 中文關鍵字，未見）。

## Release 狀態 / 時間軸

尚無 GitHub Release，也沒有 tag。版本資訊在各 plugin 的 `plugin.json`（例如 `cursor-team-kit` 1.2.0），不在 repo 層級。時間軸用 commit 補：

- 2026-01-23：建立 repo
- 2026-02-09：第一個 commit
- 2026-03：官方部落格宣布新增 30 多個 plugin
- 2026-11-24：最近一次 push
- 2026-11-26：上絕對榜 #5，單日 +408 stars

## 授權與社群

- 授權：GitHub API 回傳 `license: null`，根目錄沒有 LICENSE 檔；子 plugin 各自標示，例如 `cursor-team-kit` 為 MIT（Copyright 2026 Cursor）。整個倉庫的授權因此不明確，使用單一 plugin 時要看該目錄。
- 規模：19,469 stars、2,098 forks、約 700 open issues（含 PR 計數方式需注意），topics 為空。
- 增長：約 10 個月累積 1.95 萬 stars，今日 +408，growth_rate 2.10%。
- 語言：TypeScript 約 898 KB，佔絕大多數。

## 資料來源

- **本體**：[cursor/plugins](https://github.com/cursor/plugins)、`gh api repos/cursor/plugins`（含 languages、contributors、releases、tags、contents）、[Cursor Plugins 文件](https://cursor.com/docs/plugins)、[Cursor Marketplace](https://cursor.com/marketplace)、[Cursor 2.5 Changelog](https://cursor.com/changelog/2-5)
- **第三方評論**：[Cursor 論壇 2.5 Plugins](https://forum.cursor.com/t/cursor-2-5-plugins/152124)、[Cursor Blog new plugins](https://cursor.com/blog/new-plugins)、[DeepWiki](https://deepwiki.com/cursor/plugins)、[Claude Marketplaces](https://claudemarketplaces.com/plugins/cursor-plugins)
- **同類工具**：[anthropics/claude-code](https://github.com/anthropics/claude-code)、[cursor/community-plugins](https://github.com/cursor/community-plugins)

## 更新紀錄
