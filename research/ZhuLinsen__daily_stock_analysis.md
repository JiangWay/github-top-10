---
repo: ZhuLinsen/daily_stock_analysis
first_seen: 2026-04-30
last_updated: 2026-04-30
appearances: [2026-04-30]
growth_appearances: [2026-04-30]
has_releases: true
latest_release: v3.14.1
tags: [金融科技, 應用程式, 自架, 開源替代]
domain: 金融科技
form: 應用程式
themes: [自架, 開源替代]
---

# [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)

## 深度研究（2026-04-30 首次）

### 專案定位
[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) 自我定位為「LLM 驅動的 A/H/美股智能分析器」，但更精準的描述其實是 README 自承的四個字——**「純白嫖」**：個人投資者把這個 repo fork 一份、把券商 / LLM / 推送 Token 塞進 Secrets，GitHub Actions 排程器就會在每個工作日北京時間 18:00 替你跑出一份「核心結論 + 評分 + 買賣點位 + 風險警報 + 操作檢查清單」的決策儀表板，再透過企業微信 / 飛書 / Telegram / Discord / Slack / Email 推到你手機上。專案於 2026-01-10 開源，至今三個半月累積 32,633 stars 與 32,889 forks——**fork 數高於 star 數**這個極不尋常的比例，並非機器人灌水，而是 README 把「Fork → 設定 Secrets → 啟用 Actions」明寫成「推薦使用」的 Quick Start 範式，每一個真實使用者必然要 fork 一份才能用，於是 fork 數成了比 star 更貼近 DAU 的指標。

### 核心架構 / 主要概念
程式碼 79.7% Python、17.1% TypeScript（前端工作站）。資料層走多源容錯：行情走 [AkShare](https://github.com/akfamily/akshare)、Tushare、Pytdx、Baostock、YFinance、Longbridge 與自家 TickFlow；新聞與情緒走 SerpAPI、Tavily、Bocha、Brave、MiniMax、SearXNG 多選一，可自帶 API key。LLM 預設推薦 AIHubMix 一把鑰匙吃全模型，也支援 Gemini、Claude、DeepSeek、Qwen 與本地 Ollama；其中 Gemini 免費額度被 README 點名「個人使用配額足夠」，這是「零成本」承諾的關鍵支柱。執行入口除 GitHub Actions 排程外，另有 Docker、本地 Python 與 FastAPI server 模式，附 Web 工作站可手動分析、查歷史報告、管持倉與回測。內建 11 套策略（均線交叉、艾略特波浪、A 股三段式覆盤、美股 Regime 等）可在 Agent Chat 內喚起。

### 目標使用者
中文圈散戶與小型量化愛好者：想要 AI 盤後覆盤但不想付 ChatGPT Plus、不想架伺服器、也信不過第三方訂閱式選股 SaaS 的人。專案明文聲明「不是自動交易工具、不承諾收益」，定位是把日常盤後分析自動化、可視化、可行動化。

### 與類似專案的差異
同為 LLM 量化的 [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) 走學術路線，主打「多 agent 角色扮演」研究框架，使用者得自己接資料、寫 prompt、跑回測。[Fincept-Corporation/FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal) 則是 Bloomberg Terminal 的開源 TUI 替代，功能廣但需要本機長駐執行。本專案最大的差異化是**部署形態**：直接把 GitHub Actions 當成免費 cron + 免費 runner + 免費 secret store 三合一基礎設施，使用者不需要 VPS、不需要 Docker、不需要懂 Python，只要會 fork 與貼字串就能用。這個「fork 即部署」設計是 fork > star 的根因，也是它能在 3.5 個月衝到 32k star 的傳播槓桿。

### 外部評論
- 中國技術博客 [GitCode/CSDN（2026-03-26）](https://gitcode.csdn.net/69c500c20a2f6a37c59ac95b.html) 稱其「完美解決了散戶的痛點」、強調「零成本部署」與多市場覆蓋，但全篇無批評視角。
- 知乎多篇推文標題即可見傳播力道：「[5 天暴漲 2.1k 星星！開源 AI 股票分析工具，零成本，純白嫖](https://zhuanlan.zhihu.com/p/1995644292396496566)」、「[不到一個月斬獲 4.7K Star，這個 GitHub 開源項目，把 AI 炒股真正落地了](https://zhuanlan.zhihu.com/p/1999077898590626011)」、「[Github 上開源的 AI 股票分析神器，已經突破 5.5K+ Star](https://zhuanlan.zhihu.com/p/2000692923998696468)」（內容受 Zhihu 反爬封鎖無法取得正文，僅標題可索引）。中文社群討論偏單向推薦、缺乏第三方獨立績效驗證。

### Release 狀態
共 16 個 release，最新 [v3.14.1](https://github.com/ZhuLinsen/daily_stock_analysis/releases/tag/v3.14.1)（2026-04-26）僅修正大盤覆盤 prompt 測試與桌面端版號同步——版號跳到 v3.x 顯示專案在 4 個月內已歷經 3 個主版號迭代，桌面端打包了 macOS arm64 dmg，意味專案正從「Actions 腳本」演化為桌面應用。Release 由 `github-actions[bot]` 自動發佈，CI 化程度高。

### 授權與社群
MIT 授權；主作者 [ZhuLinsen](https://github.com/ZhuLinsen) 個人 231 commits 一肩扛大頭，第二貢獻者 [massif-01](https://github.com/massif-01) 69 commits、[freesme](https://github.com/freesme) 61 commits 建立次級維護群，總計 30+ 名外部貢獻者。watchers 32,633、subscribers 僅 151、open issues 53——subscribers / star 比偏低是「fork 完就跑、不訂閱通知」的典型痕跡，再次印證使用者把它當成個人工具而非追蹤型開源專案。
