---
repo: HKUDS/AI-Trader
first_seen: 2026-05-09
last_updated: 2026-05-11
appearances: [2026-05-09, 2026-05-11]
growth_appearances: [2026-05-09, 2026-05-11]
has_releases: false
latest_release: null
tags: [金融科技, 框架, 多代理編排, 開源替代]
domain: 金融科技
form: 框架
themes: [多代理編排, 開源替代]
---

# [HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader)

> 研究日期：2026-05-09
> 研究來源：<https://github.com/HKUDS/AI-Trader>
> 觸發原因：首次上絕對榜（#8，14,510 stars）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader) 是香港大學 Data Intelligence Lab（HKUDS，黃超 Chao Huang 團隊）釋出的「100% Fully-Automated Agent-Native Trading」開源平台，把 LLM agent 從 chatbot 變成可以自行搜資料、做決策、發信號的自主交易者，並同時擔任 [Fan et al., 2025 arXiv 2512.10971](https://arxiv.org/abs/2512.10971) 論文的官方 benchmark 程式碼。Repo 同時是學術 benchmark 與面向 agent 的線上紙上交易平台 [ai4trade.ai](https://ai4trade.ai)。

## 作者與起源

主導者是香港大學數據科學實驗室（[HKUDS](https://github.com/HKUDS)）的黃超（Chao Huang）副教授團隊；HKUDS 過去開源 [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)、[HKUDS/MiniRAG](https://github.com/HKUDS/MiniRAG)、[HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything)、[HKUDS/GraphGPT](https://github.com/HKUDS/GraphGPT)，皆為高 star 的 LLM 工具鏈專案。AI-Trader 於 2025-10-23 建立 repo，2025-12-01 在 arXiv 釋出技術報告 [AI-Trader: Benchmarking Autonomous Agents in Real-Time Financial Markets](https://arxiv.org/abs/2512.10971)（作者 Tianyu Fan、Yuhao Yang、Yangqin Jiang、Yifei Zhang、Yuxuan Chen、Chao Huang），並於 2026 年初由 Chao Huang 在 X（[原推文](https://x.com/huang_chao4969/status/2042634193990226010)）公佈 v2.0 改版為 agent-native 平台。中文社群將其視為「復刻爆火 AI 交易大賽」的開源版本（[CSDN 報導](https://blog.csdn.net/weixin_47080540/article/details/154104232)）。

## 核心架構 / 主要概念

三層結構：FastAPI 後端 + React TypeScript 前端 + 給 agent 用的 `skill` 定義（Python 60.9%、TypeScript 32.5%、CSS 6.6%）。學術 benchmark 部分覆蓋三大市場：美股、A 股、加密貨幣，並引入「fully autonomous minimal information paradigm」——agent 只拿到最低必要 context，必須自行搜尋、驗證、整合即時市場資訊。資料源涵蓋 Binance、Coinbase、Interactive Brokers、Polymarket 等券商；交易標的橫跨股票、加密貨幣、外匯、選擇權、期貨、預測市場。Agent 可發三類訊號：strategies、operations、discussions，並透過 reputation point 競爭。**牌照與合規層仍未釐清**——README 主推 paper trading（虛擬 $100K），未針對美 SEC、香港 SFC、A 股監管做明確聲明。

## 設計哲學

> "general intelligence does not automatically translate to effective trading capability, with most agents exhibiting poor returns and weak risk management."（[arXiv 2512.10971 論文摘要轉述](https://arxiv.org/abs/2512.10971)）

論文核心結論直接打臉「LLM 越強就越會交易」的直覺：通用智慧不等於交易能力，多數 agent 報酬不佳、風控薄弱。設計目的是建立一個**對 LLM 不友善、不 cherry-pick 歷史資料**的活體 benchmark，讓研究者誠實看見模型在真實市場的失敗。Agent-native 平台則是把這個 benchmark 推向開放社群——讓 agent 自帶策略上來互打、辯論、複製單，把 trading 變成可解釋的決策軌跡而非黑盒。

## 目標使用者與適用情境

**適合**：(1) 做 LLM agent 評測的研究者，想拿 AI-Trader 當公平 benchmark；(2) AI agent 開發者測試自家 agent 的金融場景表現；(3) 中國/香港學界對標 [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) 的社群；(4) 想在虛擬資金下練習多代理協作的散戶。**不適合**：實盤資金、有牌照的量化機構、需要嚴謹回測完整性者——這是學術草稿與展示平台，**不是投資建議**，issue #8 已揭露未解的回測未來資料洩漏疑慮。

## 與類似專案的差異

| 對手 | 本專案的差異 |
|---|---|
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)（[arXiv 2412.20138](https://arxiv.org/abs/2412.20138)） | TradingAgents 是七角色（基本面、情緒、新聞、技術、研究員、交易員、風控）多 agent 辯論框架，仰賴歷史資料與固定 LLM 流水線；AI-Trader 強調**即時、活體、未污染**評測、agent 自我註冊、跨市場（含 A 股與 Polymarket），且把競技平台外推給社群 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)（同實驗室） | LightRAG 是檢索增強生成框架，AI-Trader 把 RAG-style 資訊整合搬到「即時金融決策 + 自主代理」場景，是 HKUDS 第一個跨進**金融科技**領域的旗艦專案 |

選型建議：純研究、想拿 paper-grade 多代理結構→ TradingAgents；想做即時 agent 競技、跨市場 benchmark、看自家 agent 與其他 LLM 對抗 → AI-Trader。

## 外部評論

- [TradeTrap: Are LLM-based Trading Agents Truly Reliable and Faithful?](https://arxiv.org/html/2512.02261v1)：與 AI-Trader 幾乎同期（2025-12）的 arXiv 論文，正面挑戰 LLM-based trading agent 的可靠度與忠實度，可視為對 AI-Trader 路線的學術反論。
- [BrightCoding 部落格評論](https://www.blog.brightcoding.dev/2026/04/14/ai-trader-the-revolutionary-open-platform-for-ai-trading-agents)：盛讚 OpenClaw 一行命令註冊 agent 的零組態設計與多市場抽象，但指出**缺乏監管分析**、**績效資料未經獨立驗證**、**紙上交易與實盤可能顯著背離**、**冷啟動網路效應風險**等關鍵保留意見。
- [GitHub Issue #8 — Backtest Future Leakage？](https://github.com/HKUDS/AI-Trader/issues/8)（2025-10-27 由 jyan1999 提出）：指出 Jina Search 過濾不夠嚴謹、`get_price_local` 工具回傳當日完整 OHLCV 可能洩漏未來資訊、開盤價成交但能看到當日全幅波動的設計問題。**未見維護者公開回覆**，是社群對學術可信度的最強質疑。
- [GitHub Issue #29 — Trading rules and constraints](https://github.com/HKUDS/AI-Trader/issues/29)（2025-10-29 由 yuhexyz 提出）：要求釐清 agent 可看到哪些訂單簿/公司事件/情緒資料、是否有部位上限、手續費滑價是否模型化、stop-loss 與最大回撤規則。**至研究日期仍 open，無維護者回覆**。
- [中文 CSDN 報導](https://blog.csdn.net/weixin_47080540/article/details/154104232)：將 AI-Trader 定位為「復刻爆火的 AI 交易大賽」開源版，提及 DeepSeek、Qwen 等中國模型對戰 GPT、Gemini 的實況。
- [Chao Huang 的 X 公告（v2.0）](https://x.com/huang_chao4969/status/2042634193990226010)、[技術報告公告](https://x.com/huang_chao4969/status/2004756041498861588)：第一手作者敘事，強調「AI agent 在沒有人類介入下做真實金融決策」是核心賣點。

未見顯著 Hacker News 串討論，資料不足。

## Release 狀態 / 時間軸

- 2025-10-23：repo 建立
- 2025-10-27：社群即提出回測未來資料洩漏疑慮（issue #8）
- 2025-12-01：arXiv 技術報告 [2512.10971](https://arxiv.org/abs/2512.10971) 發表
- 2026-03-03：Polymarket paper trading 上線
- 2026-03-21：Dashboard launch
- 2026-04-09：Codebase streamlining for agent-native development（v2.0 大改版）
- 2026-04-10：Production stability 改進（拆分 web service 與 background worker）
- 2026-05-06：最近一次 push
- 2026-05-09：首次進入 GitHub Trending Top 10（#8）

`gh api .../releases` 回傳空陣列，**目前未發過任何 GitHub Release**，版本管理依賴 commit 與部落格公告。

## 授權與社群

- License：MIT（README badge 顯示，repo metadata `license: null` 但語言比例與 README 一致）
- Stars：14,510（2026-05-09），forks 2,429，watchers 138，open issues 43
- Default branch：`main`，329 commits
- Contributors：15+（主力為 [TianyuFan0504](https://github.com/TianyuFan0504) 187 commits、[chaohuang-ai](https://github.com/chaohuang-ai) 48、[Dennis-yxchen](https://github.com/Dennis-yxchen) 46、[Hoder-zyf](https://github.com/Hoder-zyf) 16、[yuh-yang](https://github.com/yuh-yang) 10）
- Pull Request 數：≥ 198（最近 #198 提案 100% 單元測試覆蓋率，#195 加 web-fetch-fallback skill），社群外部貢獻活躍
- Topics：repo metadata 未掛 topics（`topics: []`），分類靠 README 文字
- 增長速率：自 2025-10-23 建 repo 起 約 200 天累積 14.5k stars，初始已具備強學術社群拉動力；2026-05-09 單日 +189 stars 為首次進 GitHub Trending top 10。
- Homepage：[ai4trade.ai](https://ai4trade.ai)（線上 paper trading 平台）
- Has Discussions：是
- Wiki：未啟用

## 資料來源

**本體**

- [HKUDS/AI-Trader Repo](https://github.com/HKUDS/AI-Trader)
- [README.md](https://github.com/HKUDS/AI-Trader/blob/main/README.md)
- [skill 註冊定義 ai4trade/SKILL.md](https://github.com/HKUDS/AI-Trader/blob/main/skills/ai4trade/SKILL.md)
- [線上平台 ai4trade.ai](https://ai4trade.ai)
- [HKUDS 組織頁](https://github.com/HKUDS)

**論文與學術**

- [Fan et al. 2025, AI-Trader: Benchmarking Autonomous Agents in Real-Time Financial Markets, arXiv 2512.10971](https://arxiv.org/abs/2512.10971)
- [TradeTrap: Are LLM-based Trading Agents Truly Reliable and Faithful?, arXiv 2512.02261](https://arxiv.org/html/2512.02261v1)（學術反論）
- [Papers Cool 摘要頁](https://papers.cool/arxiv/2512.10971)
- [ResearchGate PDF](https://www.researchgate.net/publication/398675687_AI-Trader_Benchmarking_Autonomous_Agents_in_Real-Time_Financial_Markets)

**第三方評論**

- [BrightCoding 部落格深度評論](https://www.blog.brightcoding.dev/2026/04/14/ai-trader-the-revolutionary-open-platform-for-ai-trading-agents)
- [GitHub Issue #8 — 回測未來資料洩漏](https://github.com/HKUDS/AI-Trader/issues/8)
- [GitHub Issue #29 — 交易規則與約束](https://github.com/HKUDS/AI-Trader/issues/29)
- [Chao Huang X — v2.0 公告](https://x.com/huang_chao4969/status/2042634193990226010)
- [Chao Huang X — 技術報告公告](https://x.com/huang_chao4969/status/2004756041498861588)
- [CSDN 中文報導](https://blog.csdn.net/weixin_47080540/article/details/154104232)

**同類工具**

- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)（[論文 arXiv 2412.20138](https://arxiv.org/abs/2412.20138)、[官網](https://tauric.ai/research/tradingagents/)）
- [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)（同實驗室個人交易 agent）
- [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)、[HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything)（同實驗室前作）

## 更新紀錄
