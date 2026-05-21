---
repo: teng-lin/notebooklm-py
first_seen: 2026-05-22
last_updated: 2026-05-22
appearances: [2026-05-22]
growth_appearances: [2026-05-22]
has_releases: true
latest_release: v0.4.1
tags: [LLM 客戶端, 框架, 開源替代]
domain: LLM 客戶端
form: 框架
themes: [開源替代]
---

## 深度研究（2026-05-22 首次）

### 專案定位
[teng-lin/notebooklm-py](https://github.com/teng-lin/notebooklm-py) 是 Google NotebookLM 的非官方 Python client，14,306 stars、MIT、Python，2026-01-07 開倉至今約 4.5 個月。賣點是「Web UI 沒開放的能力也能用」——批次下載、quiz/flashcard JSON 匯出、mind map JSON 抽取、PPTX 投影片、單張投影片修訂、報告模板客製、聊天答案存為 note。

### 核心架構 / 主要概念
**Playwright 驅動 + 內部 RPC 逆向**，非 Selenium、非官方 API。透過 Chromium 模擬真人鍵入速度與滑鼠軌跡繞過 Google 反自動化偵測，同時抓內部未公開 RPC 端點直呼。Python 入口為 `NotebookLMClient` async class，分 `notebooks` / `sources` / `chat` / `artifacts` / `research` 五個子模組；認證走 browser cookie（`notebooklm login` 開瀏覽器登入或 `--browser-cookies chrome` 借用既存 session），cookie 落地 `storage_state.json` 並支援 multi-profile 切換。

### 目標使用者
三類：(1) Python library 嵌入應用、(2) CLI 寫 shell / CI pipeline、(3) AI agent 透過 `notebooklm skill install` 或 `npx skills add teng-lin/notebooklm-py` 把 Claude Code / Codex / OpenClaw 接上自然語言呼叫 NotebookLM 全套能力。`SKILL.md` 為 agentic skill 正本。

### 與類似專案的差異
NotebookLM 官方沒開放 API，社群多為 Selenium 半成品 wrapper；本檔以 Playwright + RPC 逆向取代「點 UI」式爬蟲，並把 audio overview、video、quiz、flashcard、mind map、slide 等 studio artifact 全納入單一 client，是目前覆蓋 NotebookLM 功能最完整的開源替代。

### 外部評論
- [Medium — Ewan Mak](https://medium.com/@tentenco/notebooklm-py-the-cli-tool-that-unlocks-google-notebooklm-1de7106fd7ca)：稱其為「unlocks NotebookLM」的 CLI 工具，重點在解鎖 Web UI 未開放能力。
- [Grokipedia 條目](https://grokipedia.com/page/notebooklm-py)：強調「Playwright 模擬真人輸入速度與滑鼠軌跡繞過 Google 偵測」、僅適合 prototype／研究／個人專案。
- [PyPI notebooklm-py](https://pypi.org/project/notebooklm-py/)：已上架，`pip install "notebooklm-py[browser]"` 並 `playwright install chromium` 即可用。

### Release 狀態
v0.1.4（2026-01-11）→ v0.4.1（2026-05-11），4 個月 10 版；最新 v0.4.1 新增 `notebooklm auth refresh` CLI、`keepalive=` constructor、`NOTEBOOKLM_REFRESH_CMD` env var，公開承認因依賴 undocumented Google API「隨時可能 break」。

### 授權與社群
MIT、default branch `main`、forks 1,987、open issues 20、subscribers 66。主要貢獻者 [teng-lin](https://github.com/teng-lin)（1,028 commits 近乎獨力維護）+ [furkankoykiran](https://github.com/furkankoykiran)（21）+ [claude](https://github.com/claude)（13，Claude Code 機器人帳號）+ dependabot 15。
