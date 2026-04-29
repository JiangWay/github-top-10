---
repo: warpdotdev/warp
first_seen: 2026-04-30
last_updated: 2026-04-30
appearances: [2026-04-30]
growth_appearances: [2026-04-30]
has_releases: true
latest_release: v0.2026.04.29.08.56.stable_00
tags: [LLM 客戶端, 應用程式, 開源替代, 多代理編排]
domain: LLM 客戶端
form: 應用程式
themes: [開源替代, 多代理編排]
---

# [warpdotdev/warp](https://github.com/warpdotdev/warp) 深度研究

> 來源：[warpdotdev/warp](https://github.com/warpdotdev/warp)

## 深度研究（2026-04-30 首次）

### 專案定位

[warpdotdev/warp](https://github.com/warpdotdev/warp) 是 Warp 公司於 2021 年用 Rust 打造的 GPU 加速終端機，2026-04-28 由創辦人 Zach Lloyd 在官方部落格 [Warp is now open-source](https://www.warp.dev/blog/warp-is-now-open-source) 宣布把 client 端原始碼以 AGPL-3.0（UI framework `warpui_core` / `warpui` 為 MIT）整碗開源，repo 描述同步改為「Warp is an agentic development environment, born out of the terminal.」。本站 2026-04-30 首見即衝上絕對榜 #1、單日 +11,955 stars，刷新本站歷史紀錄、同時超越前日 mattpocock/skills 的 +7,429。截至研究時點累積 42,445 stars、2,491 forks，license AGPL-3.0，主語言 Rust，topics 含 `terminal` `bash` `zsh` `wasm`。

### 核心架構 / 主要概念

- **GPU rendering + Block 模型**：以 wgpu / Metal 直繪文字，把每一次 prompt 執行框成可摺疊、可分享的 block，取代滾動式純文字 buffer——這也是 2022 年招牌差異點。
- **Agentic Development Environment**：原 IDE 內建 Warp Agent，現支援掛載第三方 agent（Claude Code、OpenAI Codex、Gemini CLI 等），終端從互動 shell 變成多 agent 工作台。
- **Oz 雲端編排平台**：repo 之外的 [build.warp.dev](https://build.warp.dev) 跑「數千個 Oz agent」自動 triage issue、寫 spec、開 PR；公司商業模式從終端機轉向 [oz.dev](https://www.oz.dev) 的 agent orchestration。
- **Agent-first 貢獻流程**：Maintainer 把 issue 標 `ready-to-spec` / `ready-to-implement`，agent 自動領單；人類負責方向、verification 與 review，OpenAI 為 founding sponsor 並由 GPT 模型驅動 Oz workflow。
- **build script**：repo 提供 `./script/bootstrap` + `./script/run` 在本機編譯，搭配 `Stable` / `Preview` / `Dev` 三條 nightly release 線。

### 目標使用者

1. **重度 macOS / Linux 終端使用者**：吃 GPU 渲染、block 操作、AI 補全。
2. **想自架 / 修改 Warp 的工程師**：開源前不可能，現在能 fork 改鍵位、抽掉遙測、自編 binary。
3. **多 agent workflow 探路者**：想把 Claude Code、Codex 收進同一個 UI 並列協作。
4. **AGPL 友善的企業 / 教育場景**：原本因閉源 + 雲端遙測卻步的單位，AGPL 提供「可審、可改、可自架」的合規路徑。

### 與類似專案的差異

- **vs [alacritty/alacritty](https://github.com/alacritty/alacritty)**：Warp 早期 fork 自 Alacritty 的 GPU renderer，本次 HN 討論最大火藥味就在「拿 MIT 程式碼、拉了 5,000 萬美元、卻沒回饋上游」（[HN 47937349](https://news.ycombinator.com/item?id=47937349)），Alacritty maintainer 出面表示「無 hard feelings」但爭論延燒。
- **vs [wez/wezterm](https://github.com/wez/wezterm) / [kovidgoyal/kitty](https://github.com/kovidgoyal/kitty)**：同屬 GPU 加速、可程式設定的現代終端，但純 terminal 取向、無內建 agent；Warp 把 AI 擺在最高優先級。
- **vs [zed-industries/zed](https://github.com/zed-industries/zed)**：同樣 Rust + GPU + agentic，但 Zed 是 IDE 起家、Warp 是 terminal 起家，定位互補；兩者都已開源。
- **vs Cursor / Windsurf**：Cursor 是閉源 IDE-first，Warp 走 terminal-first 且現在開源，license 上更激進（AGPL）。
- **vs [openai/codex](https://github.com/openai/codex) CLI / [anthropics/claude-code](https://github.com/anthropics/claude-code)**：Warp 不取代它們，反而把它們收進自家 UI 當第三方 agent。

### 外部評論

- [Warp is now Open-Source — Hacker News（236 點 / 167 留言，2026-04-29）](https://news.ycombinator.com/item?id=47937349)：辯論集中在 AGPL 是否誠意、Alacritty fork 倫理、agent-first 流程是否會讓「人類 contributor 變 reviewer」。
- [Warp's gamble: Going open source to take on closed-source rivals — The New Stack（2026-04-29，Steven J. Vaughan-Nichols）](https://thenewstack.io/warp-open-source-client/)：把本次開源定位為對 Cursor / Cline 等閉源 AI 開發工具的反擊。
- [Good News! AI-first Warp Terminal is Now Open Source — It's FOSS](https://itsfoss.com/news/warp-goes-open-source/)：FOSS 媒體正面報導，強調 AGPL 與 OpenAI sponsor 的訊號。
- [Warp Open-Sourced Its Terminal Code. The Real Product Is Oz. — EveryDev.ai](https://www.everydev.ai/p/news-warp-opensourced-its-terminal-code-the-real-product-is-oz)：點破商業邏輯——終端不再是賺錢產品，Oz 編排平台才是。
- [Warp Terminal Goes Open Source—But AI Agents Do the Work — byteiota](https://byteiota.com/warp-terminal-goes-open-source-but-ai-agents-do-the-work/)：質疑 agent-first 貢獻模型對社群文化的衝擊。

### Release 狀態

- **最新 stable**：[v0.2026.04.29.08.56.stable_00](https://github.com/warpdotdev/warp/releases/tag/v0.2026.04.29.08.56.stable_00)，2026-04-29 由 `github-actions[bot]` 發布，正好對應公開 repo 的首日；同步出 Preview 與 Dev nightly。
- **節奏**：版號採 `vYEAR.MONTH.DAY.HH.MM.<channel>_NN` 時戳格式，每日多次自動 release，binary 仍從 [warp.dev](https://www.warp.dev/) 下載。

### 授權與社群

- **授權**：主體 [AGPL-3.0](https://github.com/warpdotdev/warp/blob/master/LICENSE)；UI framework crates `warpui_core` / `warpui` 為 MIT，便於外部沿用 widget 層而不被 AGPL 傳染。
- **治理**：Warp 公司 100% 控制，OpenAI 掛 founding sponsor；CEO Zach Lloyd（[zachlloyd](https://github.com/zachlloyd)）親自在 HN 回應社群質疑。
- **社群規模**：42,445 stars、2,491 forks、287 subscribers、3,190 open issues（開源首日大量湧入）；Discussions 已開啟，agent-first workflow 正在試煉。
- **主要貢獻者**：早期內部團隊（[vorporeal](https://github.com/vorporeal)、[kevinyang372](https://github.com/kevinyang372)、[exzshao](https://github.com/exzshao) 等）+ 開源後第一波外部 PR；Oz agent 為「實際撰碼者」是觀察重點。

---

本專案首見於 2026-04-30，本檔建立於官方 [open-source 公告](https://www.warp.dev/blog/warp-is-now-open-source) 後第三日，承接 +11,955 stars 單日新高的話題峰值。之後若再次上榜，依 CLAUDE.md 契約 append「## 更新紀錄」並同步 `appearances` / `growth_appearances` / `last_updated`。
