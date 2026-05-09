---
repo: ChromeDevTools/chrome-devtools-mcp
first_seen: 2026-04-18
last_updated: 2026-05-10
appearances: [2026-04-18, 2026-05-10]
growth_appearances: [2026-05-10]
has_releases: true
latest_release: chrome-devtools-mcp-v0.25.0
tags: [MCP 協定, MCP Server]
domain: MCP 協定
form: MCP Server
---

# [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)

## 深度研究（2026-04-18 首次）

### 專案定位
由 Chrome DevTools 團隊官方維護的 MCP（Model Context Protocol）伺服器，讓 AI 編碼代理（Claude、Cursor、Copilot、Gemini CLI 等）能直接「看見」並操控一個活的 Chrome 瀏覽器分頁，取用 DevTools 的除錯、效能追蹤、網路監控等能力。Slogan 為「Chrome DevTools for coding agents」。

### 核心架構 / 主要概念
- 以 TypeScript 撰寫，底層透過 [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) 經 Chrome DevTools Protocol（CDP）驅動 Chrome Stable 或 Chrome for Testing。
- 以 npm 套件 `chrome-devtools-mcp` 發布，`npx -y chrome-devtools-mcp@latest` 一行即可接入任何支援 MCP 的客戶端。
- 共暴露 29 個工具，分六類：輸入（9）、導覽（6）、模擬（2）、效能（4）、網路（2）、除錯（6），例如 `navigate_page`、`click`、`take_screenshot`、`performance_analyze_insight`、`take_memory_snapshot`、`lighthouse_audit`。
- 支援連接既有 Chrome 144+ 分頁或 remote debugging port，亦可隔離模式跑臨時 profile。

### 目標使用者
- 以 AI 代理開發前端 / Web App 的工程師：需要代理能看到 console 錯誤、網路 500、效能瓶頸。
- QA / 測試工程師：在 AI 流程中取代部分 Playwright / Selenium 腳本編寫。
- 想把 Lighthouse、效能 trace 結果餵進 LLM 做建議的團隊。

### 與類似專案的差異
- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)：同樣是瀏覽器 MCP，但 playwright-mcp 偏「自動化與 E2E」，本專案強項是 DevTools 協定的「除錯與效能」視角（console、network、trace、memory）。
- [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright)：社群版 Playwright MCP，定位同樣為自動化。
- 本專案最大差異：官方出品、直通 CDP、能取 performance trace 與 memory snapshot，而非僅 DOM 操作。

### 外部評論
- Chrome 官方部落格介紹用途與安裝：[Chrome DevTools (MCP) for your AI agent](https://developer.chrome.com/blog/chrome-devtools-mcp)
- Addy Osmani〈Give your AI eyes〉一文推廣此工具為「讓 AI 擁有眼睛」：[addyosmani.com](https://addyosmani.com/blog/devtools-mcp/)
- LogRocket 技術評測，示範用它修 console error 與 500：[LogRocket Blog](https://blog.logrocket.com/debugging-with-chrome-devtools-mcp/)
- DebugBear 聚焦效能除錯實戰：[DebugBear](https://www.debugbear.com/blog/chrome-devtools-mcp-performance-debugging)
- Hacker News 首輪討論：[HN #46607574](https://news.ycombinator.com/item?id=46607574)、後續高價值討論串 [HN #45949591](https://news.ycombinator.com/item?id=45949591)。
- Token 效率討論：[Show HN: WebMCP make CDP MCP 90% more token efficient](https://news.ycombinator.com/item?id=46223714) 指出 26 個工具約佔 Claude context 9%。
- Tessl 觀點「runtime awareness」：[tessl.io](https://tessl.io/blog/google-puts-the-eye-in-ai-with-chrome-devtools-mcp/)

### Release 狀態
最新版 `chrome-devtools-mcp-v0.21.0`（2026-04-01 發布），新增 `take_memory_snapshot` 偵測記憶體洩漏的 skill，並修復 `list_pages` 在分頁關閉後的行為。累計 43 個 release，迭代頻繁。

### 授權與社群
- 授權：Apache-2.0
- Stars：35,756｜Forks：2,184｜Open Issues：98
- 建立於 2025-09-11，最近推送 2026-04-17，屬活躍專案
- Topics：`browser`、`chrome`、`chrome-devtools`、`debugging`、`devtools`、`mcp`、`mcp-server`、`puppeteer`
- 已有 107 個 npm 套件將其列為相依，生態擴散中

## 更新紀錄

### 2026-05-10
- 自 2026-04-18 首次上榜後，距今 22 天再次出現於絕對榜（#7）。期間連發 4 個 release：
  - [v0.22.0](https://github.com/ChromeDevTools/chrome-devtools-mcp/releases/tag/chrome-devtools-mcp-v0.22.0)（2026-04-21）
  - [v0.23.0](https://github.com/ChromeDevTools/chrome-devtools-mcp/releases/tag/chrome-devtools-mcp-v0.23.0)（2026-04-22）
  - [v0.24.0](https://github.com/ChromeDevTools/chrome-devtools-mcp/releases/tag/chrome-devtools-mcp-v0.24.0)（2026-05-04）
  - [v0.25.0](https://github.com/ChromeDevTools/chrome-devtools-mcp/releases/tag/chrome-devtools-mcp-v0.25.0)（2026-05-06，最新）
- 主要變更：迭代頻繁（22 天 4 版），維持「官方 Chrome DevTools MCP server」位置；具體 changelog 細節以 Release Notes 為準。
