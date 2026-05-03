---
repo: TauricResearch/TradingAgents
first_seen: 2026-04-28
last_updated: 2026-05-04
appearances: [2026-04-28, 2026-05-01, 2026-05-02, 2026-05-03, 2026-05-04]
growth_appearances: [2026-05-01, 2026-05-02, 2026-05-03, 2026-05-04]
has_releases: true
latest_release: v0.2.4
tags: [金融科技, 框架, 多代理編排]
domain: 金融科技
form: 框架
themes: [多代理編排]
---

# [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)

> 研究日期：2026-04-28
> 研究來源：<https://github.com/TauricResearch/TradingAgents>
> 觸發原因：首次上絕對榜（#10，+183 stars/day）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) 是 UCLA / MIT / Tauric Research 團隊基於同名 [arXiv 論文 2412.20138](https://arxiv.org/abs/2412.20138) 釋出的多代理 LLM 金融交易研究框架——它把一支「虛擬交易公司」拆成 7 種專業 LLM agent（基本面 / 情緒 / 新聞 / 技術四位分析師、Bull/Bear 研究員、Trader、Risk Manager），用 [LangGraph](https://github.com/langchain-ai/langgraph) 編排辯論流程，輸出 Buy/Overweight/Hold/Underweight/Sell 五級評等。**框架明確定位為研究用途，作者本人也在 README 與論文中強調不構成投資建議**。

## 作者與起源

主要作者 **Yijia Xiao**（GitHub `Yijia-Xiao`，UCLA CS PhD）與共同作者 **Edward Sun（UCLA）**、**Di Luo（UCLA / MIT）**、**Wei Wang（UCLA）** 於 2024-12-28 把 arXiv preprint 與 repo 同步公開（[arxiv 首版](https://arxiv.org/abs/2412.20138)），歷經 7 次修訂後 2025-06-03 定稿至 v7，收錄於 *Multi-Agent AI in the Real World* 並做 oral 報告。團隊掛在組織帳號 [TauricResearch](https://github.com/TauricResearch) 之下。

repo 在 2024 年底開源後，因「七個 agent 對 AAPL 在 2024 H2 跑出 26.62% 累積報酬、夏普 8.21」這條惹眼的 headline 在中文圈先爆紅（[騰訊新聞 2025-06-30](https://news.qq.com/rain/a/20250630A04IMY00) 標題「對蘋果狂賺 26.6%」），2026 年 4 月 v0.2.4 上線結構化輸出 + Docker + 國產 LLM provider 後再度衝上 GitHub trending。今日（2026-04-28）站上絕對榜 #10、53,585 stars / 9,756 forks，star/fork 比約 5.5（領域上算偏低，反映「fork 一份來改」的使用模式遠多於純收藏）。

維護端目前看起來仍是學術小組規模——[contributors API](https://api.github.com/repos/TauricResearch/TradingAgents/contributors) 顯示 Yijia-Xiao 一人 101 commits，第二名 [EdwardoSunny](https://github.com/EdwardoSunny) 13 commits，其餘多為單個 PR 貢獻者。

## 核心架構 / 主要概念

**Agent 拓撲（論文 Figure 1 與 README）**：

1. **Analyst Team（四人）**——Fundamentals / Sentiment / News / Technical 四種分析師，各自配備工具與 prompt 模板。
2. **Researcher Team**——Bull researcher 與 Bear researcher 對 analyst report 做 N 輪辯論（debate rounds 可設）。
3. **Trader**——綜合辯論結果寫出交易決策草稿。
4. **Risk Management Team**——aggressive / neutral / conservative 三種風險偏好 agent 輪流質詢 Trader。
5. **Portfolio Manager**——v0.2.2 起作為標準化最終決策者，輸出 Buy / Overweight / Hold / Underweight / Sell 五級評等。

**編排層**：用 [LangGraph](https://github.com/langchain-ai/langgraph) 的 StateGraph 把上面節點接成 DAG，v0.2.4 加入 SQLite checkpoint 讓中斷的 run 可從最後一個成功節點 resume（落在 `~/.tradingagents/cache/checkpoints/`）。

**LLM provider**（截至 v0.2.4）：OpenAI、Google Gemini、Anthropic、xAI、DeepSeek、Qwen（DashScope）、GLM（Zhipu）、OpenRouter、Ollama（本地）、Azure OpenAI——10 家，覆蓋國內外主流 + 國產與本地化選項。

**資料源與牌照（金融類專案加重項）**：

- **價格 / OHLCV / fundamentals / news**：主要走 [yfinance](https://github.com/ranaroussi/yfinance)（Yahoo Finance 非官方爬蟲）+ [Finnhub free tier](https://finnhub.io/docs/api/rate-limit)。維護者在 [issue #437](https://github.com/TauricResearch/TradingAgents/issues/437) 已承認 yfinance「high-speed access rate 被限制」。Finnhub free tier 缺一些基本 API。
- **社群情緒**：Reddit 資料是**離線靜態快照**——[issue #86](https://github.com/TauricResearch/TradingAgents/issues/86) 有使用者回報「沒有 Reddit 抓資料的程式碼，直接從 local path 讀」，截至研究日仍未被官方解決。這意味著 Sentiment Analyst 跑回測時實質吃的是研究者預先打包的固定資料集，**生產使用時情緒源是空的**。
- **離線回測資料**：論文承諾要釋出 *Tauric TradingDB* 但截至 2026-04-28 尚未見公開 release。
- **無任何金融牌照、無 broker 整合**——repo 不下單，僅輸出文字決策；不屬於 algo trading 平台，沒有 SOC 2 / PCI-DSS 之類合規宣稱。

**程式碼規模**：Python 323,391 bytes + Dockerfile 530 bytes，純 Python 庫；267 open issues、9.8k forks，社群分支活躍度高於上游本身。

## 設計哲學

論文引言把整個專案的 thesis 講得最清楚：

> "We propose TradingAgents, a novel stock trading framework where multiple LLM-powered agents collaborate similarly to real-world trading firms. ... Detailed architecture and extensive experiments reveal its superiority over baseline models, with notable improvements in cumulative returns, Sharpe ratio, and maximum drawdown, highlighting the potential of multi-agent LLM frameworks in financial trading."
> ——[arXiv 2412.20138](https://arxiv.org/abs/2412.20138)

中文翻譯：以「真實交易公司分工」為原型，相信多 agent 結構化辯論能比單模型 prompt 更接近專業判斷流程。

README 同時也把研究框架的邊界寫得很清楚：

> "TradingAgents framework is designed for research purposes. Trading performance may vary based on many factors, including the chosen backbone language models, model temperature, trading periods, the quality of data, and other non-deterministic factors. It is not intended as financial, investment, or trading advice."

——這段 disclaimer 不只是法律自保，也是對「為什麼回測夏普 8.21 卻不能直接拿去交易」的誠實說明：模型、溫度、時段、資料品質、隨機性都會讓結果偏移。

## 目標使用者與適用情境

**適用**：

- 量化研究者 / LLM agent 研究者拿來做 multi-agent 架構實驗（debate rounds、agent 角色設計）。
- 金融類 LLM 課程或工作坊的教學素材——agent 角色拆得乾淨、LangGraph 視覺化容易展示。
- 想自建 AI 投資研究 pipeline 的開發者作為**起點專案**——10 種 LLM provider、有 Docker、有 CLI、有 checkpoint，比從零搭快。

**不適用 / 該慎用**：

- 直接接 broker 自動下單——repo 沒有 execution 層，且回測週期短（論文核心實驗僅 3 個月），未經跨市場 regime 驗證。
- 散戶當作「AI 選股」——夏普 8.21 是論文作者自己標註「超出經驗合理區間」的數字（見 §外部評論），不可拿來推估真實績效。
- 中文 A 股使用者——上游 [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) 不直接支援 A 股，要用 fork 版 [hsliuping/TradingAgents-CN](https://github.com/hsliuping/TradingAgents-CN)（24.8k stars）。
- 即時情緒交易——Reddit 資料是離線快照（[issue #86](https://github.com/TauricResearch/TradingAgents/issues/86)）。

## 與類似專案的差異

| 對手 | 立場 | 與 TradingAgents 的差異 |
|---|---|---|
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | LLM 微調 + finance NLP playground | FinGPT 走 **fine-tune 路線**（LoRA on LLaMA / ChatGLM、約 50K 金融樣本），核心輸出是「金融領域微調過的 LLM 權重」；TradingAgents 是 **prompt + 多 agent 編排**，不訓練模型，可以隨時換 backbone。FinGPT 在金融報表分析任務拿 86%（見 [aimultiple benchmark](https://research.aimultiple.com/agentic-ai-finance/)）。互補：可以把 FinGPT 微調過的 backbone 接進 TradingAgents 當 fundamentals analyst。 |
| [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | RL 量化交易框架 | FinRL 走 **deep RL（PPO / DDPG / A2C）**，agent 是 policy network、學的是連續動作；TradingAgents 是 LLM agent，「決策」是文字推理輸出評等，不是直接的 action 機率分佈。FinRL 適合會做 reward shaping 的研究者；TradingAgents 適合不想碰 RL、想直接讀「為什麼買」推理鏈的人。FinRL 在概念知識任務拿 53%、報表分析 29%（同 benchmark 來源）。 |
| [Microsoft/qlib](https://github.com/microsoft/qlib) 的 Multi-Agent 模組 / [FinAgent](https://personal.ntu.edu.sg/boan/papers/KDD24_FinAgent.pdf) | 多模態金融 agent | FinAgent（NTU、KDD'24）強調**多模態工具使用 + reflection**，提供 K 線圖等視覺輸入；TradingAgents 純文字、無視覺輸入，但角色拆解更細（4 analyst + Bull/Bear + Risk team）。 |

**選型建議**：

- 想要可解釋、近似分析師報告的決策過程 → TradingAgents。
- 要訓練自己的金融 LLM → FinGPT。
- 要做策略層的強化學習 → FinRL。
- 中文 / A 股場景 → fork 版 [TradingAgents-CN](https://github.com/hsliuping/TradingAgents-CN)。

## 外部評論

> 金融類專案的外部評論集中在「回測可信度」，下方按來源類型分組：

**學術 / 技術部落格**

- [DigitalOcean: Your Guide to the TradingAgents Multi-Agent LLM Framework](https://www.digitalocean.com/resources/articles/tradingagents-llm-framework) ——技術 walkthrough，但編輯部加了一段顯眼的免責聲明：*"DigitalOcean does not endorse TradingAgents as a tool for day-to-day financial decision-making. It is designed to run financial simulations and should be used as such."*
- [Hikmah Tech: Building Trading Bots That Think Like a Trading Firm](https://publication.hikmahtechnologies.com/building-trading-bots-that-think-like-a-trading-firm-unpacking-the-tradingagents-paper-f975ae5b42df) ——直接指出論文夏普 8.21「超出經驗合理範圍（>2 已是 very good，>3 是 excellent）」，建議至少 1–5 年、跨市場 regime 重測。
- [Quant Wiki 中文量化百科：TradingAgents](https://quant-wiki.com/ai/aiquant/TradingAgents/) ——中文向技術介紹，引用論文回測數字（AAPL 26.62%、夏普 8.21、最大回撤 0.91%）但同時標註「僅 3 個月、計算成本高，需更長期驗證」。
- [alphaXiv 2412.20138](https://www.alphaxiv.org/abs/2412.20138) ——學界半正式評閱平台，目前留言以技術提問為主，無顯著反駁。

**社群 / 論壇**

- [Hacker News: TradingAgents 主串（44249279）](https://news.ycombinator.com/item?id=44249279) ——2025-06，僅 2 points、無實質討論串，未達熱門。
- [Hacker News: ValueCell 串提到 TradingAgents（45402224）](https://news.ycombinator.com/item?id=45402224) ——2025-09 上線的 [ValueCell](https://github.com/ValueCell-AI/ValueCell) 把自己定位成「整合 TradingAgents + AI-hedge-fund」的上層框架，間接背書了 TradingAgents 的 agent 介面已被當成事實標準。
- [GitHub Issue #86: Reddit data 為離線快照](https://github.com/TauricResearch/TradingAgents/issues/86) ——使用者直接點出 Sentiment Analyst 的資料源不是 live。
- [GitHub Issue #437: yfinance rate limit 被擋](https://github.com/TauricResearch/TradingAgents/issues/437) ——維護者承認 yfinance 高頻請求受限。

**中文社群**

- [騰訊新聞：AI 金融交易開源 Agent 火了，對蘋果狂賺 26.6%](https://news.qq.com/rain/a/20250630A04IMY00) ——標題流量取向，引用論文的 AAPL 數字當作賣點，未質疑回測週期。
- [博客園 xiaoye45：TradingAgents-CN 深度體驗](https://www.cnblogs.com/readdad/articles/19620161) ——以中文 fork 版為主體的實測文，對多代理辯論流程持正面看法但提醒「不構成投資建議、結果僅供參考」。
- [hsliuping/TradingAgents-CN（24.8k stars）](https://github.com/hsliuping/TradingAgents-CN) ——中文增強 fork，星數已是上游的 46%，社群層用腳投票證明了「上游缺 A 股 / 國產 LLM」是真實痛點。

**綜合判斷**：第三方對「架構設計」普遍正面（角色清晰、LangGraph 工程選型合理）；但對「績效數字」幾乎一面倒地謹慎——**論文夏普 8.21 / 累積 26.62% 為 3 個月單一標的回測，未經第三方驗證、未跨市場 regime 測試**，作者自己在論文也標註「超出經驗合理範圍」。生產使用前須自行做更長期回測。

## Release 狀態 / 時間軸

| 時間 | 事件 |
|---|---|
| 2024-12-28 | repo 建立 + arXiv 2412.20138 v1 發表 |
| 2025-06-03 | arXiv v7（最終版），於 *Multi-Agent AI in the Real World* oral 報告 |
| 2026-02-04 | [v0.2.0](https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.0)：multi-provider LLM factory（OpenAI / Google / Anthropic / xAI / OpenRouter / Ollama）、ChromaDB → BM25 |
| 2026-03-15 | [v0.2.1](https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.1)：新增 GPT-5.4 / Claude 4.6 / Gemini 3.1 支援、修 CVE-2026-22218 |
| 2026-03-22 | [v0.2.2](https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.2)：五級評等（Buy/Overweight/Hold/Underweight/Sell）、Portfolio Manager 標準化最終決策者、跨交易所 ticker 支援 |
| 2026-03-29 | [v0.2.3](https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.3)：11 種輸出語言、GPT-5.4 Mini/Nano、回測日期感知 |
| 2026-04-25 | [v0.2.4](https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.4)：結構化輸出 Pydantic、LangGraph checkpoint resume、持久化決策日誌 + 後續報酬 alpha 評估、新增 DeepSeek / Qwen / GLM / Azure OpenAI、Docker 多階段 build |
| 2026-04-28 | 首次衝上 GitHub trending Top 10（本日 #10、+183 stars） |

爆紅點：**v0.2.4 一次補上「國產 LLM + Docker + 結構化輸出 + checkpoint」四個阻礙導入的痛點**，加上原本就在中文社群有熱度（騰訊新聞 2025-06 推波），三天內衝進 trending。

## 授權與社群

- **License**：[Apache-2.0](https://github.com/TauricResearch/TradingAgents/blob/main/LICENSE) ——商用友善、無 copyleft、無附加條款。
- **Stars / Forks**：53,585 / 9,756（fork ratio ≈ 18.2%，遠高於一般 framework 5–10% 的水準，反映「fork 一份去改」的使用模式）。
- **Open issues**：267；**watchers**：53,585；**subscribers**：423。
- **語言比例**：Python 99.84% / Dockerfile 0.16%——純 Python 專案。
- **Topics**：`agent`、`finance`、`llm`、`multiagent`、`trading`。
- **Contributors**：21 人有公開 contribution，前三 [Yijia-Xiao](https://github.com/Yijia-Xiao)（101）、[EdwardoSunny](https://github.com/EdwardoSunny)（13）、[luohy15](https://github.com/luohy15)（10）；長尾為單 PR 貢獻者。本質上是「兩人核心 + 開源社群提交修補」的維護模式。
- **Releases 速率**：2026-02-04 → 2026-04-25 共 5 個 release，平均 ~17 天一版，maintainer 出版節奏穩定。
- **Stars 增長**：今日 +183 stars / 53,585 total = 0.34% 日增長率（GitHub trending 入榜門檻附近）；fork 數 9,756 顯示衍生專案非常多——光 [TradingAgents-CN](https://github.com/hsliuping/TradingAgents-CN) 一支 fork 自己就有 24.8k stars，已是獨立爆紅子生態。
- **論文 citation**：截至 v7 已被 arXiv / OpenReview 廣泛交叉引用，[Hugging Face Papers](https://huggingface.co/papers/2412.20138) 也有獨立頁面。

## 資料來源

**本體**

- GitHub repo：<https://github.com/TauricResearch/TradingAgents>
- arXiv 論文：<https://arxiv.org/abs/2412.20138>（v7, 2025-06-03）
- 論文 PDF：<https://arxiv.org/pdf/2412.20138>
- 論文官網：<https://tradingagents-ai.github.io/>
- Hugging Face Papers：<https://huggingface.co/papers/2412.20138>
- 作者主頁：<https://yijia-xiao.com/>
- v0.2.4 release：<https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.4>

**第三方評論 / 報導**

- DigitalOcean walkthrough（含免責聲明）：<https://www.digitalocean.com/resources/articles/tradingagents-llm-framework>
- Hikmah Tech（質疑夏普數字）：<https://publication.hikmahtechnologies.com/building-trading-bots-that-think-like-a-trading-firm-unpacking-the-tradingagents-paper-f975ae5b42df>
- Quant Wiki 中文量化百科：<https://quant-wiki.com/ai/aiquant/TradingAgents/>
- 騰訊新聞報導：<https://news.qq.com/rain/a/20250630A04IMY00>
- 博客園實測：<https://www.cnblogs.com/readdad/articles/19620161>
- Hacker News 主串：<https://news.ycombinator.com/item?id=44249279>
- Hacker News ValueCell 串：<https://news.ycombinator.com/item?id=45402224>
- alphaXiv：<https://www.alphaxiv.org/abs/2412.20138>
- aimultiple FinGPT/FinRL benchmark：<https://research.aimultiple.com/agentic-ai-finance/>

**關鍵 issue（社群質疑）**

- Reddit 資料離線：<https://github.com/TauricResearch/TradingAgents/issues/86>
- yfinance rate limit：<https://github.com/TauricResearch/TradingAgents/issues/437>

**同類工具 / 衍生**

- [hsliuping/TradingAgents-CN](https://github.com/hsliuping/TradingAgents-CN)（中文 fork，24.8k stars）
- [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT)
- [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL)
- [microsoft/qlib](https://github.com/microsoft/qlib)
- [FinAgent (NTU, KDD'24)](https://personal.ntu.edu.sg/boan/papers/KDD24_FinAgent.pdf)
- [ValueCell-AI/ValueCell](https://github.com/ValueCell-AI/ValueCell)（整合 TradingAgents 的上層框架）

## 更新紀錄

### 2026-05-04
- 連榜 Day 4（5-01、5-02、5-03、5-04），絕對榜由 #1 退至 #2，但 stars_today +2,227 → +3,315（**+48.9%**）為今日全榜最大絕對增量、第二度單日破 3k；total stars 由 61,952 → 64,875 過 6.4 萬，growth_rate 3.59% → 5.11%（單日 +1.52pp）。
- Release 端**無新版本**（最新仍為 [v0.2.4](https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.4)，2026-04-25），純粹由 [hsliuping/TradingAgents-CN](https://github.com/hsliuping/TradingAgents-CN) 中文 fork 與 [ValueCell-AI/ValueCell](https://github.com/ValueCell-AI/ValueCell) 等下游整合的長尾擴散推升熱度。
