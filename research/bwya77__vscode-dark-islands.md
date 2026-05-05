---
repo: bwya77/vscode-dark-islands
first_seen: 2026-05-06
last_updated: 2026-05-06
appearances: [2026-05-06]
growth_appearances: [2026-05-06]
has_releases: true
latest_release: v0.0.2
tags: [開發者工具, Skill 外掛, 開源替代]
domain: 開發者工具
form: Skill 外掛
themes: [開源替代]
---

# bwya77/vscode-dark-islands

## 深度研究（2026-05-06 首次）

### 專案定位

[bwya77/vscode-dark-islands](https://github.com/bwya77/vscode-dark-islands)（行銷名稱「Islands Dark」）是一份由獨立開發者 [bwya77](https://github.com/bwya77) 維護的 VS Code 主題與 UI 客製化包，將 JetBrains「Islands Dark」與 easemate IDE 兩款受好評的浮島式介面語言搬到 VS Code。專案 GitHub 上的 primary language 被標成 PowerShell，但這是因為安裝腳本所致——產出物本身是 VS Code 主題（`themes/*.json`）加上一份 CSS 客製化片段。截至取數時 stars 7,763、forks 233、contributors 5 人、open issues 59，repo 建立於 2026-02-14，最後一次 push 於 2026-02-25，外觀上是「短時間吸大量 star、之後維護降速」的典型獨立美術專案。

### 核心架構 / 主要概念

主題本身只解決「色票」這一層；真正讓 VS Code 看起來像 JetBrains Islands 的視覺語言（圓角、面板間留白、玻璃質感邊框、滑入動畫）是靠第三方擴充 [subframe7536/vscode-custom-ui-style](https://github.com/subframe7536/vscode-custom-ui-style) 注入 CSS 完成的。專案的可調參數透過一組 `--islands-*` CSS 變數開放給使用者直接在 `settings.json` 改：

- `--islands-panel-radius`（預設 24px）— 全域圓角半徑
- `--islands-panel-gap`（預設 8px）— 面板之間的留白
- `--islands-bg-canvas`（`#121216`）— 最底層深色畫布
- `--islands-bg-surface`（`#181a1d`）— 互動元件的「浮起」面板色

設計核心是「分層感」：canvas 故意調得比 surface 暗，讓面板像浮在底色上方而不是貼在同一平面，再加上方向性的邊框光（上 / 左邊框較亮）模擬玻璃質感。專案另外指定了三套字型（編輯器 IBM Plex Mono、終端機 FiraCode Nerd Font Mono、UI Bear Sans UI），對「成品觀感是否一致」有強約束。

### 目標使用者

- **想要 JetBrains 觀感但已綁定 VS Code 生態的開發者**——典型情境是用 GitHub Copilot / Cursor 或 VS Code 專屬擴充、無法整段搬到 IntelliJ。
- **接受重度客製化代價的玩家**——安裝完整體驗需要：裝 Custom UI Style 擴充、執行廠商提供的 shell/PowerShell 腳本、安裝 3 套外部字型，跨度比一般「點 marketplace 安裝」高一個量級。
- **NixOS / Home Manager 使用者**——專案附了 Nix Flake 直接組成「VS Code/VSCodium + 主題 + 擴充 + 字型」的 reproducible bundle，這對 dotfiles 玩家是強誘因。

不適合：只想要快速套色票的使用者（用 VS Code Marketplace 上的同名 fork [Islands Dark](https://marketplace.visualstudio.com/items?itemName=parmesto.islands-dark) 比較省事，但少掉本 repo 的 CSS 浮島效果）。

### 與類似專案的差異

- **vs JetBrains 原生 Islands Dark**：本專案是視覺移植到 VS Code，`gh api` 能看到專案 topics 直接列了 `easemate`、`jetbrains`、`vscode-theme`；JetBrains Marketplace 上另有第三方再延伸的 [One Dark Islands Theme](https://plugins.jetbrains.com/plugin/29310-one-dark-islands-theme)（IntelliJ 用），方向相反。
- **vs 其他 VS Code 浮島系主題**：Marketplace 同名的 [kangsou/Islands Theme](https://marketplace.visualstudio.com/items?itemName=kangsou.islands-theme) 與 [parmesto/Islands Dark](https://marketplace.visualstudio.com/items?itemName=parmesto.islands-dark) 只做色票；本 repo 把「浮島形變」也納入產出，代價是綁定 Custom UI Style。
- **vs 純色票主題（Dracula、One Dark Pro）**：核心差異不在色票，而在主動把 VS Code 的「平面 IDE」改成「分層 IDE」的姿態。是否值得多裝一個會 patch core CSS 的擴充，是這類專案的核心折衷。
- **fork 生態**：已能搜到 [syntax-syndicate/vsce-dark-islands-theme](https://github.com/syntax-syndicate/vsce-dark-islands-theme) 這類純打包成擴充的 fork 與 [hadnet/vscode-islands-dark-settings](https://github.com/hadnet/vscode-islands-dark-settings) 這類純 settings 對照——側面說明社群已自行衍生「拿掉 CSS 注入、只保留色票」的最小版本。

### 外部評論

- Christian Lempa（YouTuber，DevOps/平台工程內容）在 X 上發文：「Just found this stunning VSCode theme — Islands Dark gives you floating glass panels, rounded corners, smooth animations, and a deeply refined dark UI. One-liner install and your editor looks incredible.」見 [X / Christian Lempa](https://x.com/ChristianLempa/status/2028436535624798589)。屬於「外觀讚嘆派」評論，未提缺點。
- Threads 上 `@suritech` 的推薦：「inspired by jetbrains islands dark... gives you floating glass panels and rounded corners, even dims your status bar when you're not hovering. makes vs code feel super slick.」見 [Threads / @suritech](https://www.threads.com/@suritech/post/DU_uZLaEq-y/just-found-this-vscode-theme-inspired-by-jetbrains-islands-dark-it-gives-you)。重點落在「狀態列在不 hover 時會 dim」的細節體驗。
- Open Source Projects 平台的編輯評論「The ultimate dark theme for VSCode based on JetBrains and easemate designs」（[opensourceprojects.dev](https://www.opensourceprojects.dev/post/fcdaf8de-301e-4ac6-a47c-0c74b247c4f0)）強調「並非全新創造，而是把兩個受好評的設計合在一起」這種定位是優點而非限制；該文未列出明確缺點。
- daily.dev 收錄頁 [bwya77/vscode-dark-islands](https://app.daily.dev/posts/xuxhmwl0f) 為內容聚合，無原創評論。
- 主流社群（Hacker News、Reddit r/vscode）目前未搜到專文討論，僅 [Trendshift Repository 21192](https://trendshift.io/repositories/21192) 將其列為趨勢專案，可作為熱度的旁證。資料不足以判斷是否有具規模的反面意見。

### Release 狀態

`gh api repos/bwya77/vscode-dark-islands/releases` 只回 1 筆：

- **v0.0.2**（[Release tag 0.0.2](https://github.com/bwya77/vscode-dark-islands/releases/tag/0.0.2)，2026-02-19）
  - **FIXED**：聊天視窗顏色破版、macOS 安裝腳本、Explorer pane 項目顯示截斷、commit message 框被切、主側邊欄移到右側時被截斷、終端機與編輯器的圓角不一致、視窗控制鈕背景色錯誤、無檔案開啟時預設分頁被切、`.ipynb` 渲染破版、Linux 上分頁與 floating header 重疊、Markdown 字體 family 規則被無視等，許多項目都對應到具體的 issue 編號。
  - **ADDED**：聊天文字框圓角、解除安裝腳本、`FUNDING.yml`、可由 `--islands-*` CSS 變數覆寫面板半徑與間距、自訂 primary/secondary 色（`islands-bg-surface` / `islands-bg-canvas`）、終端機與編輯器之間 2px 留白、系統 dialog 跟著主題圓角、編輯器 sticky widget 的陰影。
  - **CHANGED**：主題與 `settings.json` 改成正確版本化。
  - **REMOVED**：選取視窗的 highlight 方框（無法做圓角，故移除）。

整體看 v0.0.2 是「初版破版整波修齊 + 把客製化軸開放給使用者」的合併 release。0.0.x 編號暗示作者並未把它當成穩定版產品交付。

### 授權與社群

- **授權**：`gh api repos/bwya77/vscode-dark-islands` 回傳 `license: null`——repo 沒掛任何 SPDX 授權，等同預設「保留所有權利」。`tags`、`README` 與 release 也未明示授權字眼。對任何想 fork、再發布或商用的人來說，這是必須注意的法務風險；目前已有的 fork（如 [syntax-syndicate/vsce-dark-islands-theme](https://github.com/syntax-syndicate/vsce-dark-islands-theme)）即在無明確授權下進行。
- **社群結構**：contributors 共 5 人，但 [bwya77](https://github.com/bwya77) 一人 76 commits、其餘 4 人合計 7 commits，是強單核專案。Issues 開 59 件、PRs 機制開放（`pull_request_creation_policy: all`），社群有反饋管道但合入決策集中在原作者。
- **熱度信號**：stars 7,763、forks 233、watchers/subscribers 13，star/watch 比偏向「收藏型」而非「深度跟進型」——典型外觀類專案的吸引力曲線。
- **外部背書**：被 daily.dev、Open Source Projects、Trendshift 等聚合站收錄，並有 X / Threads 上中等規模技術帳號自發推薦，足以解釋短期上 trending。
- **後續觀察點**：（1）作者是否補上 LICENSE；（2）Release 是否突破 0.0.x、進入 1.0；（3）是否上架 VS Code Marketplace（目前 Marketplace 上 [parmesto.islands-dark](https://marketplace.visualstudio.com/items?itemName=parmesto.islands-dark) 是第三方再上架版本，原作者並未在主 README 推薦特定 marketplace 入口）。
