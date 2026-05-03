---
repo: soxoj/maigret
first_seen: 2026-05-01
last_updated: 2026-05-04
appearances: [2026-05-01, 2026-05-02, 2026-05-03, 2026-05-04]
growth_appearances: [2026-05-01, 2026-05-02, 2026-05-03, 2026-05-04]
has_releases: true
latest_release: v0.6.0
tags: [情報監測, 應用程式, 開源替代, 自架]
domain: 情報監測
form: 應用程式
themes: [開源替代, 自架]
---

## 深度研究（2026-05-01 首次）

### 專案定位
[soxoj/maigret](https://github.com/soxoj/maigret) 是一個只給「使用者名稱」就能跨 3000+ 站台彙整個人檔案的 OSINT（公開來源情資）工具。它是經典 [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock) 的功能性 fork，專注把「找帳號」升級為「建檔案」——除了標出哪些站有同名帳號外，還抓 profile 頁面與各站 API 的可見資訊（暱稱、頭像、bio、外連帳號），對發現的新識別字遞迴展開搜尋，最後輸出成 HTML / PDF / JSON / CSV / XMind 心智圖 / D3 互動關聯圖等報告，免註冊、免 API key，已被 [bellingcat/toolkit](https://github.com/bellingcat/toolkit) 列為核心調查工具之一。

### 核心架構 / 主要概念
Python 3.10+ CLI，主邏輯是「站台清單 + per-site 規則」資料庫（24 小時自動從 GitHub 拉新版、有離線 fallback），每個站定義 URL 樣式、存在判定、需擷取的欄位。執行流程：使用者名稱 → 並行請求 → 規則比對 → 抽取交叉識別字 → 遞迴下一輪 → 結果序列化。內建 Tor / I2P / proxy 支援，並能部分繞過封鎖、審查與 CAPTCHA；附 `--web` 旗標的瀏覽器 UI 與互動式關聯圖；亦可作為 Python library 嵌入。

### 目標使用者
紅藍隊滲透測試、SOC / DFIR 調查員、記者與調查報導機構（Bellingcat 路線）、企業反詐欺與盡職調查團隊，以及學習 OSINT 的安全學生。

### 與類似專案的差異
最直接對手是 [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock)：sherlock 走「快、輕、純存在性檢查」路線，約 400 站、秒殺型查詢；[soxoj/maigret](https://github.com/soxoj/maigret) 則把同樣的核心放大成「調查筆記本」——3000+ 站、遞迴展開、profile 內容抽取、誤判處理較細、報告格式齊全（PDF / XMind / D3 圖）、附 web UI 與 Docker。另兩個常被一起比較的有 [WebBreacher/WhatsMyName](https://github.com/WebBreacher/WhatsMyName)（純資料集，需要前端工具配合）與 [p1ngul1n0/blackbird](https://github.com/p1ngul1n0/blackbird)（站量較少但有 GUI）。Maigret 的差異化在「廣度 + 結構化報告 + 交叉串連」一次到位。

### 外部評論
- [Maigret - Bellingcat's Online Investigation Toolkit](https://bellingcat.gitbook.io/toolkit/more/all-tools/maigret) — Bellingcat 將 Maigret 收進官方 OSINT 工具書，定位為「只憑使用者名稱即可建立人物檔案、無需 API key」的調查首選。
- [A Comparison of Username-Search OSINT Tools](https://medium.com/meetcyber/a-comparison-of-username-search-osint-tools-321f3988120a) — Medium MeetCyber 評測指出：「若 Sherlock 是快速查詢工具，Maigret 就是調查筆記本」，誤判處理與報告品質普遍被認為已超越 sherlock。
- [Maigret vs Sherlock: Which Username OSINT Tool Is Better?](https://footprintiq.app/compare/maigret-vs-sherlock) — FootprintIQ 對比文：Maigret 站量 3000+ 並具遞迴與多格式報告，sherlock 僅約 400 站、定位為輕量 CLI。
- [Maigret OSINT Username Checker](https://www.geeksforgeeks.org/linux-unix/maigret-osint-username-checker/) — GeeksforGeeks 教學文：示範 pip 安裝與 `--html` / `--pdf` 報告輸出，被列為入門 OSINT 必學工具。
- [Tool: Maigret OSINT - TheCyberpunker](https://thecyberpunker.com/tools/osint-tools/tool-maigret-osint/) — 西語資安部落格實測，重點推 Tor 整合與遞迴搜尋對紅隊偵察階段的價值。
- [Top OSINT tools for law enforcement investigations - Police1](https://www.police1.com/investigations/3-osint-tools-every-officer-should-master-now) — 執法媒體 Police1 將 Maigret 列為「執法人員必學的 OSINT 工具」之一。
- [BurtTheCoder/mcp-maigret](https://github.com/BurtTheCoder/mcp-maigret) — 社群已釋出 MCP server 包裝，把 Maigret 接到 Claude / 各 LLM agent 的工具鏈，是 agentic OSINT 流程當前的代表性整合。

### Release 狀態
最新穩定版為 [v0.6.0](https://github.com/soxoj/maigret/releases/tag/v0.6.0)（2026-04-10 釋出），主線另有 `main` 開發版的 Windows standalone exe 滾動發布；前一穩定版 v0.5.0 於 2025 年 8 月釋出，引入站台抑制、串流網站支援與 Instagram scrapers。

### 授權與社群
MIT 授權、Python 主導，repo 已累積 20.7k stars / 1.4k forks / 1280+ commits / 124 watchers，作者 [@soxoj](https://github.com/soxoj) 為主要維護者並貢獻 600+ commits，另有官方文件站 [maigret.readthedocs.io](https://maigret.readthedocs.io) 與品牌站 [maigret.dev](https://maigret.dev/)，社群動能穩定且被 Bellingcat 等指標性機構背書。

## 更新紀錄

### 2026-05-04
- 連榜 Day 4（5-01、5-02、5-03、5-04），為當日榜內 OSINT 類唯一連榜檔；絕對榜由 #4 守 #3，stars_today +1,065 → +1,117（+4.9%）連續第二日上行，total stars 22,449 → 23,609（+1,160）續創歷史新高；growth_rate 4.74% → 4.73% 幾乎持平，增長榜排名 #3 → #7（被新進的三檔小型 AI 工具擠下）。
- Release 端**無新版本**（最新仍為 [v0.6.0](https://github.com/soxoj/maigret/releases/tag/v0.6.0)，2026-04-10），4-26 後僅 `main` / `dev` 滾動標籤，無新 semver。
