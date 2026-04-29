---
repo: CJackHwang/ds2api
first_seen: 2026-04-30
last_updated: 2026-04-30
appearances: [2026-04-30]
growth_appearances: [2026-04-30]
has_releases: true
latest_release: v4.1.2
tags: [LLM 基礎建設, 應用程式, 自架, 開源替代]
domain: LLM 基礎建設
form: 應用程式
themes: [自架, 開源替代]
---

# [CJackHwang/ds2api](https://github.com/CJackHwang/ds2api)

## 深度研究（2026-04-30 首次）

### 專案定位

[CJackHwang/ds2api](https://github.com/CJackHwang/ds2api) 是一套以 Go 撰寫、附帶 React WebUI 的中介層，把 [DeepSeek](https://www.deepseek.com/) **網頁版聊天**的私有協定逆向後，重包成 OpenAI Chat / Responses、Anthropic Claude Messages、Google Gemini generateContent 三種主流 API 規格輸出，讓任何相容上述格式的客戶端（Cursor、Cline、Open WebUI、各類 IDE 外掛）能直接「假裝」在用 OpenAI／Claude／Gemini，但流量實際打到使用者自己登入的 DeepSeek 帳號上。專案在 2026-01-21 開源，三個多月內累積 2,658 stars、715 forks，fork-to-star 比例異常高（約 27%），是典型「抓回家自己部署」的工具型專案。

### 核心架構 / 主要概念

後端是 Chi router + 中介鏈（log/CORS/recover），核心 PromptCompat 模組負責將三家 API 的 schema 翻譯成 DeepSeek 網頁端可吃的 payload；DeepSeek client 處理 session、token 與**純 Go 重寫的 PoW 演算法**（DeepSeek 網頁端反爬蟲挑戰），以及函式呼叫的 delta 解析。**多帳號池**採 Round-Robin 輪詢加 per-account in-flight 上限與等待佇列，token 過期時用儲存的 email/手機+密碼自動重新登入刷新。模型映射層接受 `gpt-4`、`claude-*`、`gemini-*` 等別名，後端統一對應到 DeepSeek v4 系列（含 thinking/vision/search 變體）。部署形態齊全：預編譯 binary、Docker / Compose、Vercel Serverless（Node Runtime 跑 streaming）、Zeabur 一鍵部署，原始碼編譯需 Go 1.26+。

### 目標使用者

最直接的客群是**有 DeepSeek 網頁帳號、但不想（或不能）開官方付費 API key** 的個人開發者：用幾個免費帳號輪換，就能把流量灌進 Cursor / Cline 這類 IDE agent。其次是中文 AI 圈長期玩 free-API 的折騰族——專案 README 直接致謝 [linux.do](https://linux.do) 社群，作者個人頁也掛在 linux.do。第三是 self-host 圈：附 React 管理介面、Admin API 支援熱更新與帳號測試，丟在 NAS / VPS 上跑成家用 LLM gateway 並不費力。

### 與類似專案的差異

DeepSeek free-API 的賽道並不空。同質競品包括 [LLM-Red-Team/deepseek-free-api](https://github.com/LLM-Red-Team/deepseek-free-api)（早期祖師爺，Node 實作）、[xiaoY233/DeepSeek-Free-API](https://github.com/xiaoY233/DeepSeek-Free-API)、[xtekky/deepseek4free](https://github.com/xtekky/deepseek4free)（Python，含 PoW reverse）、[NIyueeE/ds-free-api](https://github.com/NIyueeE/ds-free-api) 等。ds2api 的差異點集中在三項：(1) **Go 單檔 binary** 比 Node/Python 系列更省資源、部署更乾淨；(2) **同時相容 OpenAI + Claude + Gemini** 三家協定，而非只 OpenAI；(3) **內建 React 管理 UI 與 Admin API**，帳號池運維介面比腳本派同類完整。和 [songquanpeng/one-api](https://github.com/songquanpeng/one-api) 那種「多供應商付費 key 統一閘道」性質不同——one-api 接的是合法 key、做計費分發，ds2api 接的是網頁 cookie / 帳密、本質是 web scraping 套殼。

### 外部評論

- [DS2API: Transforming DeepSeek Free Chat to OpenAI & Claude Compatible APIs（xugj520.cn 部落格）](https://www.xugj520.cn/en/archives/deepseek-api-bridge-openai-claude.html) 形容它是 DeepSeek free chat 通往 OpenAI/Claude 客戶端生態的「橋」，並指出多帳號 Round-Robin、自動 token 刷新、streaming（須 nginx `proxy_buffering off`）是設置上的關鍵點。
- [linux.do 「LLM Red Team：官方 API 白菜價 DeepSeek 已經 Free」討論串](https://linux.do/t/topic/78646) 是中文圈 DeepSeek 逆向 API 的長期集散地，ds2api 屬於該脈絡下後續被催生的新一代實作之一。
- 少數派 / 知乎 / Reddit r/LocalLLaMA / HN 目前未見針對 ds2api 的專文，能見度仍集中在 GitHub trending 與 linux.do 推薦循環。

### Release 狀態

發版節奏密集——三個月內超過 30 個 release，最新穩定版 [v4.1.2](https://github.com/CJackHwang/ds2api/releases/tag/v4.1.2)（2026-04-28），隔日已推 [v4.1.3_beta2](https://github.com/CJackHwang/ds2api/releases/tag/v4.1.3_beta2) 預覽。版本號從 1 月的 v2.x 一路推到 4.x，反映底層 PoW / 協定隨 DeepSeek 網頁前端更新會被迫追改，這是所有逆向 free-API 共同的脆弱點：上游一改 ds2api 就可能 break，使用者得跟著升級。release artifact 涵蓋 darwin/linux/windows 多架構 binary，CI 由 GitHub Actions 產出。

### 授權與社群

授權 [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)（修改後對外提供服務即須開源），主作者 [CJackHwang](https://github.com/CJackHwang) 個人主頁掛在 [linux.do](https://linux.do/u/cjackhwang)。contributor 約 25 位，第二、第三貢獻者 [shern-point](https://github.com/shern-point)、[ouqiting](https://github.com/ouqiting) 各 13、7 commits，仍是強單一作者主導模式。Discussions 開放，open issues 14。風險面向：README 有明確 disclaimer，定位為「學習研究、個人實驗、內部驗證用，禁止商用或對第三方提供付費 API」；多帳號自動輪換在 DeepSeek 服務條款下屬灰色帶，帳號被風控／封禁的成本由部署者自負。
