---
repo: luongnv89/claude-howto
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: true
latest_release: v2.1.160
tags: [教學資源, 課程教材]
domain: 教學資源
form: 課程教材
themes: []
---

# [luongnv89/claude-howto](https://github.com/luongnv89/claude-howto)

> 研究日期：2026-10-25
> 研究來源：https://github.com/luongnv89/claude-howto
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[luongnv89/claude-howto](https://github.com/luongnv89/claude-howto) 是一套 Claude Code 教材：10 個模組從 slash command 講到 hook、MCP、plugin，每章附 Mermaid 流程圖與可直接複製的設定模板。

## 作者與起源

作者 luongnv89 個人維護，2025-11-07 建 repo，2026-10-20 最後 push。38 位貢獻者中作者佔 201 commits，第二名 edocltd 20 commits。提供英、越、中、烏、日五種語言版本，中文寫作者 [xiaolai](https://github.com/xiaolai) 貢獻過 3 commits。

## 核心架構 / 主要概念

- **10 個編號模組**：`01-slash-commands` 到 `10-cli`，涵蓋 memory、skills、subagents、MCP、hooks、plugins、checkpoints
- **約 27 份模板**：3 個 slash command、3 份 memory 檔、5 個 subagent、4 份 MCP 設定、6 支 hook script、3 個 plugin
- **hooks 章**：列出 5 種 hook 類型、33 個事件
- **學習路線**：估 11–13 小時，附 `/lesson-quiz` 自測
- **離線版**：`uv run scripts/build_epub.py` 產 EPUB
- **品管**：pytest（Python 3.10–3.12）、Ruff、Bandit、mypy、Codecov

## 設計哲學

> "A visual, example-driven guide to Claude Code"

「visual」與「example-driven」是對照官方文件說的。官方文件按功能列參數，這份教材每章先給圖、再給可執行模板。

## 目標使用者與適用情境

- 已安裝 Claude Code、想從單純下 prompt 走到自建 hook 與 subagent 的使用者
- 要替團隊訂 Claude Code 慣例的 tech lead，可直接拿模板改
- **不適用**：想找最新功能說明者。最新 release 停在 2026-06-02，之後的 Claude Code 新功能可能未收錄

## 與類似專案的差異

| 對手 | 對方做法 | 本專案的差異 |
|---|---|---|
| Claude Code 官方文件 | 功能參考，按設定項排列 | 按學習順序排，每章配圖與模板 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 個人 skill 蒐集，直接安裝使用 | 教學取向，解釋每個機制的用途 |

## 外部評論

- [HelloGitHub 收錄頁](https://hellogithub.com/en/repository/luongnv89/claude-howto)：已收錄，目前 0 評分 0 留言
- [SkillRank](https://skillrank.it.com/skills/luongnv89-claude-howto)：Claude Code 類別排第 25
- 未見 HN / Reddit 主串討論，資料不足

## Release 狀態 / 時間軸

- 2025-11-07 建 repo
- 2026-02-25 首個 release v2.0.0
- 2026-06-02 最新 release v2.1.160，共 10 個 release，每版附多語 EPUB
- 2026-10-20 最後 push（release 之後仍有更新）
- 2026-10-25 首次上 trending（+392）

## 授權與社群

- 授權：MIT
- Stars 44,834 / Forks 5,513 / Subscribers 205
- 主語言：Python（腳本與測試，內容主體為 Markdown）
- 擁有者：個人
- 今日增長率 0.87%（+392 / 44,834）

## 資料來源

- **本體**：[GitHub repo](https://github.com/luongnv89/claude-howto)、[Releases](https://github.com/luongnv89/claude-howto/releases)
- **第三方評論**：[HelloGitHub](https://hellogithub.com/en/repository/luongnv89/claude-howto)、[SkillRank](https://skillrank.it.com/skills/luongnv89-claude-howto)
- **同類工具**：[mattpocock/skills](https://github.com/mattpocock/skills)

## 更新紀錄
