---
repo: rohitg00/ai-engineering-from-scratch
first_seen: 2026-05-21
last_updated: 2026-05-23
appearances: [2026-05-21, 2026-05-22, 2026-05-23]
growth_appearances: [2026-05-21, 2026-05-22, 2026-05-23]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材, 開源替代]
domain: 教學資源
form: 課程教材
themes: [開源替代]
---

## 深度研究（2026-05-21 首次）

### 專案定位

[rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) 是 Rohit Ghumare（同時也是 [rohitg00/agentmemory](https://github.com/rohitg00/agentmemory) 作者、本站歷次上榜常客）2026-03-18 開立的開源 AI 工程完整教程，slogan「Learn it. Build it. Ship it for others.」、9,341 stars、MIT 授權、主要語言 Python 兼 TypeScript／Rust／Julia 四語並列。內容規模 428 lessons 跨 20 phases ~320 小時，定位為「one curriculum to rule the scattered tutorials」——把散落於各 YouTube／部落格／論文的 AI 知識重新串成一條從線性代數直通自主代理／多代理 swarm 的單一脊柱。官網 [aiengineeringfromscratch.com](https://aiengineeringfromscratch.com/) 提供線上閱讀、placement quiz 與互動式 prerequisite map。

### 核心架構 / 主要概念

教學哲學「Build It / Use It split」——每堂課先 from scratch 寫一遍 backprop、tokenizer、attention 等底層，再切到 PyTorch／Transformers 等 production library 跑同樣演算法、理解 framework 在做什麼。每堂課採 6-beat 模板：Motto → Problem → Concept → Build It → Use It → Ship It，最終必交付一個可重用 artifact（373+ skills、99 prompts、6 agents、MCP server）。SkillKit 整合可把產出的 skill 直接安裝進 Claude／Cursor／相容 agent，並提供 catalog.json 作為機器可讀的課程清單。

### 目標使用者

四類：1) 想真正搞懂 AI 內部原理的工程師，2) 從 ML 轉向 deep learning 的實務派，3) 構建 LLM 應用的後端工程師，4) 專注 agent 系統的資深開發者。README 開場引用「84% 學生使用 AI 工具但只有 18% 覺得已準備好」的數據作為動機。

### 與類似專案的差異

與 [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)（聚焦 LLM 單點、Sebastian Raschka 教科書配套）相比，本專案範圍向兩端擴張——往下涵蓋數學基礎、往上延伸到 multi-agent swarm 與 production 部署。與 [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners)（微軟 12 lesson agent 入門課）相比，本專案 428 lesson 規模差一個量級且加入「先手刻再用 framework」的雙軌設計。與 [NirDiamant/agents-towards-production](https://github.com/NirDiamant/agents-towards-production)（28 主題 Jupyter notebook agent 生產化合集）相比，本專案不是 cookbook 而是有 placement quiz、prerequisite 圖、phase 漸進的完整 curriculum。「四語並列」（Python／TypeScript／Rust／Julia 教同一演算法）為本專案獨有設計。

### 外部評論

- LinkedIn [Sahil Satasiya 推介貼文](https://www.linkedin.com/posts/sahilsatasiya_github-rohitg00ai-engineering-from-scratch-activity-7446617576862019584-RoZ1)——將 repo 列為「end-to-end AI engineering one-stop curriculum」標誌性資源。
- Threads 中文圈推介 [@akiraxtwo 整理](https://www.threads.com/@akiraxtwo/post/DXydUHukR4i/)——盤點「20 phases／283 lessons／320 小時／Python・TypeScript・Rust・Julia 四種語言」，是中文社群少數有系統性介紹的貼文。
- Facebook [theaiempire 專頁推介](https://www.facebook.com/theaiempire/posts/122162981126733053/)——強調「416 Lessons／20+ Chapters in Python、Julia、Rust、TypeScript」的多語並列特性。
- 越南開發者 [Việt Nguyễn 推介](https://www.facebook.com/vietnh1009/photos/1567212277707908/)——稱其為「lộ trình học AI bài bản từ đầu」（從零開始系統學 AI 的路徑圖）。
- OSS Insight 統計頁 [ossinsight.io/analyze/rohitg00/ai-engineering-from-scratch](https://ossinsight.io/analyze/rohitg00/ai-engineering-from-scratch)——可實時追蹤 stars 增速與 contributor 圖譜。

### Release 狀態

`has_releases: false`——尚無 GitHub Release。專案開立至今約 2 個月、428 lesson 仍在持續產出，採「rolling main branch」模式滾動更新，未走 semver。內容版本以 catalog.json 與 phases/ 目錄結構為準。

### 授權與社群

MIT 授權，1,920 forks、24 open issues、93 watchers。Contributors 5 人——作者 rohitg00 commits 994 為絕對主力（佔 96%），第二名 [abhinav-m22](https://github.com/abhinav-m22) 13 commits，其餘 3 人各 1–6 commits。專案實質為單人作者主導的「巨型個人 curriculum」、社群以 PR／quiz 反饋方式參與，CONTRIBUTING.md 開放新 lesson 與翻譯貢獻。topics 標籤含 agents／ai-engineering／from-scratch／llm／mcp／swarm-intelligence／transformers／tutorial 等 20 個，涵蓋面跨 AI 全棧。
