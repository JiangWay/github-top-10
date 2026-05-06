---
repo: LadybirdBrowser/ladybird
first_seen: 2026-05-07
last_updated: 2026-05-07
appearances: [2026-05-07]
growth_appearances: []
has_releases: false
latest_release: null
tags: [網路工具, 應用程式, 開源替代]
domain: 網路工具
form: 應用程式
themes: [開源替代]
---

# LadybirdBrowser/ladybird — 深度研究

## 深度研究（2026-05-07 首次）

### 專案定位
[LadybirdBrowser/ladybird](https://github.com/LadybirdBrowser/ladybird) 自我定位為「Truly independent web browser」——一套**從零打造、不依賴 Blink / WebKit / Gecko 的全新瀏覽器引擎**。它脫胎自 SerenityOS 的 LibWeb / LibJS，2024 年成立非營利 Ladybird Browser Initiative 後正式獨立，目標是 2026 年於 Linux 與 macOS 推出 Alpha。本研究歸類為 `網路工具`，理由：瀏覽器是純粹的網路客戶端，與既有 18 類 domain 中「網路工具」(網路層自架／網路客戶端基礎建設) 最接近；定為 `開源替代` theme，因為它是 Chromium / Firefox 之外的獨立替代引擎。

### 核心架構 / 主要概念
- **多進程設計**：UI 進程＋每個 tab 獨立 WebContent 沙盒，再加 ImageDecoder、RequestServer 各自隔離，仿 Chromium 的 site isolation 思路。
- **自研引擎堆疊**：LibWeb（HTML/CSS 渲染）、LibJS（JavaScript）、LibWasm（WebAssembly）、自家 HTTP client、Unicode、加密、媒體播放，全部內生，不嵌入 V8 / SpiderMonkey。
- **Rust 化進行中**：2026 年 2–4 月把 JS parser 與 bytecode generator 從 C++ 移植到 Rust，Rust 在 4 月後成為 build 必要相依。

### 目標使用者
**現階段只給開發者與貢獻者**——README 明寫 pre-alpha、不適合一般用戶。中長期受眾是「在意瀏覽器多樣性、不希望整個 Web 被 Chromium 壟斷」的開發者社群與小眾使用者。

### 與類似專案的差異
- vs **Chromium / Firefox**：兩者皆為主流引擎，Ladybird 拒絕 fork，重新實作每一條規範。
- vs **Servo**（Rust 寫的引擎）：Servo 較像 component library；Ladybird 是端對端可執行 browser，且歷史更久（源自 SerenityOS）。
- vs **Brave / Arc / Opera**：那些是 Chromium skin，引擎相同；Ladybird 是真正的第四引擎候選。

### 外部評論
- The Register 報導 2026 年 2 月「Ladybird indie web browser flutters toward Rust」，肯定 Rust 化推進但提醒專案仍處早期（[The Register](https://www.theregister.com/2026/02/23/ladybird_goes_rusty/)）。
- MakeUseOf 稱其為「全新瀏覽器引擎在 2026 登場，比想像中更重要」，強調引擎多樣性的生態價值（[MakeUseOf](https://www.makeuseof.com/ladybird-new-browser-engine-coming-2026/)）。
- byteiota 點名 Ladybird 在 UA 上仍偽裝 Chrome 以求相容性，並指 70% 標準未實作（[byteiota](https://byteiota.com/ladybird-browser-goes-full-rust-ua-spoofing-chrome-2026/)）。
- The New Stack 認為它是「少見的依 Web 標準打造」品種（[The New Stack](https://thenewstack.io/ladybird-that-rare-breed-of-browser-based-on-web-standards/)）。

### Release 狀態
**尚無 GitHub Release**（`gh api releases` 回傳空陣列）。專案以 master 分支 rolling 為主，Alpha 預計 2026 年內釋出。

### 授權與社群
- 授權：BSD 2-Clause，寬鬆友好。
- 規模：約 62,923 stars / 2,995 forks / 292 watchers；open issues 699。
- 主要貢獻者：[awesomekling](https://github.com/awesomekling)（創辦人，18,237 commits）、[trflynn89](https://github.com/trflynn89)、[AtkinsSJ](https://github.com/AtkinsSJ)、[linusg](https://github.com/linusg)、[alimpfard](https://github.com/alimpfard)。
- 社群：官方 Discord、GitHub Issues、贊助來自 Ladybird Browser Initiative 非營利。
