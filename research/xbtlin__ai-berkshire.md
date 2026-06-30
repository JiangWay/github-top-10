---
repo: xbtlin/ai-berkshire
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: true
latest_release: v1.0.0
tags: [金融科技, 框架, 多代理編排]
domain: 金融科技
form: 框架
themes: [多代理編排]
---

# [xbtlin/ai-berkshire](https://github.com/xbtlin/ai-berkshire)

> 一人 + Claude Code/Codex = 一支投研團隊。把巴菲特、芒格、段永平、李錄四位價值投資大師的方法論拆成四個並行 Agent，互相挑戰後由 Team Lead 收斂出買進/觀望/不買的決策。MIT License、Python、2026-04-07 開源、今日 7,372 stars，是當週增長榜冠軍（+13.10%、+966 stars）。

## 一句話定位

[xbtlin/ai-berkshire](https://github.com/xbtlin/ai-berkshire) 是一套 Claude Code / Codex 上的 Skill 合集，用四個獨立 Agent 平行做價值投資研究，再由人類 Team Lead 收斂結論。

## 核心架構

專案不是傳統 Python library 而是一組 **Skill / slash command 合集**——把 18 個 command 安裝到 `~/.claude/commands/`，在 Claude Code 內鍵入 `/investment-research 騰訊` 就觸發整套流程。Python 主要用在精算層（[`decimal.Decimal`](https://docs.python.org/3/library/decimal.html) 取代浮點，避免市值與估值計算因 float 累積誤差出錯）。

四個並行 Agent 各代表一位大師（README 明寫「不是把一個 prompt 切四段，而是四個 analyst 各自做完整研究」）：

| Agent | 對應大師 | 焦點 | 觸發提問 |
|---|---|---|---|
| Segment | 段永平 | 商業模式、護城河本質 | 「這是不是一門好生意？」 |
| Financial | 巴菲特 | 估值、安全邊際、資本配置 | 「現在價格是否夠便宜？」 |
| Competitive | 芒格 | 逆向推演、風險清單、Pre-mortem | 「這檔股票會怎麼死？」 |
| Thesis | 李錄 | 文明趨勢、10 年確定性 | 「10 年後這家公司還在嗎？」 |

執行流程是**先散後合**：四個 Agent 各自 web search、各自打 1–5 星分數、各自輸出獨立報告 → Team Lead（人類使用者）讀完四份報告找衝突 → 強制輸出**通過 / 觀望 / 不買**三選一結論，附積極／穩健／保守三套價格區間。

### 18 個 Skill 清單

按 README_EN.md，目前實作的 command 已從 v1.0.0 的 5 個擴展到 18 個：

| Skill | 用途 |
|---|---|
| `/investment-research` | 單檔個股四大師綜合分析 |
| `/investment-team` | 四 Agent 並行投研團隊 |
| `/management-deep-dive` | 管理層深度背景調查 |
| `/private-company-research` | 未上市公司偵探式研究 |
| `/deep-company-series` | 8 篇長文系列（約 12 萬字） |
| `/earnings-review` | 一手財報深讀 |
| `/earnings-team` | 四大師財報解讀 + 發表潤色 |
| `/industry-research` | 產業價值鏈掃描 |
| `/industry-funnel` | 市場 → 10 檔 → 3 檔漸進篩選 |
| `/quality-screen` | 7 項硬指標快速淘汰 |
| `/bottleneck-hunter` | 供應鏈卡點與套利機會 |
| `/investment-checklist` | 巴菲特買入前六關 |
| `/portfolio-review` | 持倉、集中度、再平衡 |
| `/thesis-tracker` | 買入後論點證偽追蹤 |
| `/news-pulse` | 10 分鐘股價波動歸因 |
| `/dyp-ask` | 段永平風格 Q&A 模擬器 |
| `/financial-data` | 雙來源交叉驗證的資料抓取 |
| `/wechat-article` | 三 Agent 文章發佈流程（作者／編輯／讀者） |

### 資料來源與牌照

README 提到的資料來源**多數沒有正式整合**，主要靠 LLM web search 抓 + Agent 自行交叉驗證：

| 來源 | 整合狀態 | 備註 |
|---|---|---|
| Yahoo Finance | 透過 Claude/Codex 的 web search 隱式調用 | 沒有專屬 client |
| SEC EDGAR / 公司年報 | 靠 Agent web fetch | 沒有專屬 client |
| Tushare（A 股） | 文檔提及但未實作 | Roadmap |
| Wind / Bloomberg | 列為 MCP 整合 roadmap | 未實作 |
| 富途券商截圖 | 用於佐證自報績效 | 非自動化資料源 |

**資料校驗機制**：`/financial-data` 強制最少兩個獨立來源，差異 > 1% 觸發警示；市值用「股價 × 股本」手動回算對照官方公佈值；資訊豐富度打 A/B/C 標籤、信心度打🟢🟡🔴。

牌照層面：MIT License、無券商整合、不下單、不持有客戶資金，定位是「投研工具」而非「交易系統」，避開美國 SEC 與中國證監會的 RIA / 投顧牌照需求。但**作者公開自報 2024 +69.29%、2025 YTD +66.38% 的富途券商截圖**並把專案命名為「AI 時代的伯克希爾」，行銷敘事已遊走在投資建議的邊界，使用者實際拿來做決策時要自行承擔風險。

## 技術定位

定位是「**Claude Code/Codex 原生 Skill 合集**」而非通用 Python framework。對比同類專案：

- 不是 LangGraph / LangChain agent，沒有自己的 orchestration runtime
- 不是 ChatGPT plugin、不是獨立 web app
- 不是回測引擎、沒有歷史模擬功能
- 是「把投資方法論編碼成 prompt + 工作流」的 Skill 設計案例

技術門檻低（會用 Claude Code 即可），方法論門檻高（要看得懂財報、會質疑 Agent 輸出）。

## 快速上手

```bash
git clone https://github.com/xbtlin/ai-berkshire.git
cd ai-berkshire

# Claude Code 用戶
./scripts/install-claude-commands.sh

# Codex 用戶
./scripts/install-codex-skills.sh
./scripts/install-codex-prompts.sh  # 選用
```

之後在 Claude Code 鍵入 `/investment-research 騰訊` 就會跑完整 7 模組分析（資料收集 → 商業本質 → 護城河 → 逆向思考 → 管理層 → 文明趨勢 → 估值）。`/investment-team 美團` 則啟動四 Agent 並行投研。

## 真實使用場景

repo 內附的 [`reports/`](https://github.com/xbtlin/ai-berkshire/tree/main/reports) 目錄已累積數十份實作報告，涵蓋騰訊（0700.HK）、美團、拼多多、貴州茅台、快手、Pop Mart、輝達、Apple、Microsoft、Adobe、Tesla、SpaceX、Cameco（鈾礦）等。**2026-06-23 的[微軟研究檔](https://github.com/xbtlin/ai-berkshire/blob/main/reports/%E5%BE%AE%E8%BD%AF/%E5%BE%AE%E8%BD%AF-research-20260623.md)是公開示範**，可看到實際 output 的長度與深度。

地理涵蓋是港股（騰訊、美團、阿里）、A 股（茅台）、美股（Mag 7）、未上市（SpaceX）、商品（Cameco）皆有，但作者自身績效樣本明顯偏中概股。

## 與類似專案的差異

GitHub 上「AI + 價值投資」這個 niche 在 2025–2026 已長出三個明顯流派，定位重疊但取捨不同：

| 專案 | Stars | 定位 | LLM 載體 | 多 Agent 設計 | 回測 | 牌照 |
|---|---|---|---|---|---|---|
| [xbtlin/ai-berkshire](https://github.com/xbtlin/ai-berkshire) | 7.4k | 價值投資研究 Skill | Claude Code / Codex 原生 | 4 大師對抗式 | 無 | MIT |
| [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | 59.4k | AI 對沖基金教學 sim | 自建 LangGraph | 14 名投資家 + 風控/組合管理 | 有 backtest 模組 | MIT |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | （上週本榜常客） | 多 Agent 交易框架 | 多 LLM provider | 4 analyst + bull/bear debate + risk | 有 | Apache-2.0 |
| QuantConnect / Backtrader | — | 傳統量化回測 | 無 | 無 | 核心功能 | 商用/開源混合 |

**差異點**：
1. **AI Berkshire 不做回測**——明確只做 forward-looking 研究，作者自報績效是真實券商帳戶而非歷史模擬，這點與 ai-hedge-fund、TradingAgents 走相反路線
2. **AI Berkshire 把人類放在迴圈裡**——Team Lead 是人類，不像 ai-hedge-fund 的 Portfolio Manager Agent 自動輸出 allocation；ai-berkshire 強制「鏡子測試」（投資論點若無法用 5 句話講清楚，自動拒絕）
3. **AI Berkshire 沒有量化因子層**——只做基本面與商業模式，不算技術指標、不抓 sentiment timeseries，這點 [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) 完整覆蓋
4. **價值投資哲學是 hardcoded**——四大師選擇與優先序固定，使用者改不了；ai-hedge-fund 則讓你動態選擇要哪幾位投資家上場
5. **中文母語 + 中概股焦點**——README 雙語、reports/ 中文居多，相比之下 ai-hedge-fund 與 TradingAgents 是英文 + 美股為主

定位上 ai-berkshire 更像「個人投資者的研究工作流」，ai-hedge-fund / TradingAgents 更像「對沖基金的決策模擬」。三者並非競爭，是同一個技術趨勢的不同切片。

## 授權與商業限制

MIT License，可商用、可閉源衍生、無 attribution 之外的限制。**沒有任何券商整合或下單能力**，所以即便商業化也只能做研究 SaaS 而非交易產品。作者公開自己的富途券商截圖是行銷手法，但 repo 本身不涉及實單執行，法律風險集中在「使用者依此投資虧損後是否能反告作者提供投顧」這個議題上——MIT 的「AS IS」免責條款是現成擋箭牌。

## 維護者與社群

主要維護者是 [xbtlin](https://github.com/xbtlin)（Xbt Lin），個人帳戶非組織，2026-04-07 開源至今約 12 週、總計 4 位 contributor、947 fork、24 個 open issue。Issue 量小但有效——例如 [#20 是 afactorlab 作者來交流多 Agent 投研設計](https://github.com/xbtlin/ai-berkshire/issues/20)，討論四個 Agent 怎麼避免趨同、財務精算錯誤如何防範、基本面結論能否反向校準量化因子，整體互動偏技術同行。

社群規模相對小（discussion 未開、Wiki 未開），但 stars / fork 比約 7.8，是非常健康的「真正在用」訊號（純好奇收藏型 repo 通常 stars/fork 比 30+）。

## 外部評論

外部評論在 2026-06-27 之後集中爆發，與本週上榜時間吻合：

- **[AIToolly 2026-06-27 評介](https://aitoolly.com/ai-news/article/2026-06-27-ai-berkshire-a-new-value-investment-research-framework-powered-by-claude-code-and-multi-agent-analys)** 屬於促銷性介紹文，肯定「democratize professional-grade investment research」這個敘事，但**沒有獨立驗證績效、沒有討論 look-ahead bias、沒有比較其他框架**——不是真正的第三方評測
- **[Twitter/X @maksdizzy 推薦](https://x.com/maksdizzy/status/2070368832548458812)** 把 ai-berkshire 列為當週推薦的 Claude Code 工具之一（推文時 2.2k stars，到今天已 7.4k）
- **[YouTube 安裝教學](https://www.youtube.com/watch?v=imBxRjUj5jM)** 屬使用者實測，影片內示範了 `/investment-research` 跑騰訊的完整流程，但沒給獨立績效驗證
- **HN / Reddit 上目前找不到深度討論**——多次搜尋僅命中與 Berkshire Hathaway 公司本身相關的新聞，沒有對 ai-berkshire 專案的批判性評論

**可信度的缺口**：作者自報的 2024 +69.29%、2025 YTD +66.38% 績效**只有富途券商截圖佐證**，缺少獨立稽核、無 SEC 申報（個人帳戶不需要）、無第三方 audit。價值投資社群對「兩年連續 60%+ 報酬」的常見質疑（survivorship bias、樣本選擇、是否包含全部買賣紀錄、是否扣除手續費）都沒被作者主動回應。

另一個未被外界討論但研究價值高的議題：**LLM 在做財務分析時的 look-ahead bias**——LLM 訓練資料的知識截止日如果晚於模擬決策日，Agent 等於拿著未來資訊回去看歷史。這是 [arXiv:2601.13770 Look-Ahead-Bench](https://arxiv.org/pdf/2601.13770) 整篇論文在處理的問題，但 ai-berkshire 文檔完全沒提到這個方法論陷阱。對只做 forward-looking 研究的使用者影響有限，但若有人想拿這個框架做歷史回測就會出大問題。

## 更新紀錄

### 2026-06-30（首次研究檔）
- 首次上絕對榜（#6）與增長榜（#1，+13.10%）
- 觀察到的最新 release：[v1.0.0](https://github.com/xbtlin/ai-berkshire/releases/tag/v1.0.0)（2026-04-07，與 repo 開源同日）
- v1.0.0 後尚無新 release，但 Skill 從 5 個擴增到 18 個（透過 main branch commits），pushed_at 為 2026-06-30 當日，維護活躍
