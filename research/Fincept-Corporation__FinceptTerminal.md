---
repo: Fincept-Corporation/FinceptTerminal
first_seen: 2026-04-20
last_updated: 2026-04-20
appearances: [2026-04-20]
growth_appearances: [2026-04-20]
has_releases: true
latest_release: v4.0.1
tags: [金融科技, 應用程式, 開源替代, 資料主權]
domain: 金融科技
form: 應用程式
themes: [開源替代, 資料主權]
---

# [Fincept-Corporation/FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal)

> 研究日期：2026-04-20
> 研究來源：<https://github.com/Fincept-Corporation/FinceptTerminal>
> 觸發原因：首次上絕對榜（#1，stars_today 1169）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[Fincept-Corporation/FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal) 是一套以 C++20 + Qt6 打造的原生桌面金融終端機，主打「開源版 Bloomberg Terminal」——把 CFA 等級分析、19,000+ 金融商品即時行情、37 個 AI Agent（Buffett、Graham 等投資人格 persona）封裝在單一可執行檔中，號稱年費 27,000 美金的 Bloomberg 在它面前是「拒絕被專有軟體綁架」的使用者的對照組。

## 作者與起源

由 Fincept Corporation 維護，核心為印度開發雙人組：CEO Tilak Patel（GitHub 貢獻者 [tilakpatel22](https://github.com/tilakpatel22)，624 commits）與 CTO Aviral Srivastava（[aviral](https://github.com/aviral) / [Aviral2610](https://github.com/Aviral2610)）。Repo 於 2024-08-29 建立，2025-02 發佈 Production 1.0，2025-09 開啟 v3.0 beta 的 Qt-native 大改寫，並於 2026-03-30 推出 v4.0.0——正是這次從 Python/Textual TUI 轉向 C++/Qt 的原生重寫，加上 AI Agent 多人格設計，成為本次爆紅的引信。

## 核心架構 / 主要概念

- **前端**：Qt6（UI 與渲染），官方強調「no Electron/web overhead」。
- **後端**：C++20 原生二進位檔；嚴格鎖定 Qt 6.8.3 / Python 3.11.9 / MSVC 19.38 / GCC 12.3 / Clang 15.0 等版本。
- **分析核心**：嵌入式 Python 3.11，搭配 QuantLib 18 個模組作為量化基礎。
- **資料源**：DBnomics、Polygon、FRED、IMF、World Bank、AkShare、多國政府開放 API，外加自家付費的 Fincept Data API。
- **AI 層**：37 個 Agent，分 Trader/Investor、Economic、Geopolitics 三大框架，支援 OpenAI / Anthropic / Gemini / Groq / DeepSeek / MiniMax / OpenRouter / Ollama 多 provider，local LLM 為 first-class。
- **交易**：Kraken / HyperLiquid 加密貨幣 WebSocket、16 家券商整合、paper trading 引擎。

## 設計哲學

README 封面口號把立場寫得露骨：

> "Your Thinking is the Only Limit. The Data Isn't."

翻譯：限制你的是思考能力，不是資料取得。搭配技術選型上的「C++20 with Qt6, no Electron/web overhead」，整個專案的主張就是**資料民主化 + 原生效能**——Bloomberg 的護城河是封閉資料與機房效能，Fincept 以開源 + 桌面原生把兩者一起打掉。

## 目標使用者與適用情境

- **個人散戶與獨立研究員**：付不起 Bloomberg 年費 2 萬美金，但需要機構級分析的使用者。
- **量化學習者 / CFA 備考生**：DCF、VaR、Sharpe、衍生品定價都內建。
- **金融科系學生**：教學實驗機、可自架。
- **新興市場使用者**：AkShare 等 API 整合意味著中國 / 印度市場資料也在範圍內。

**不適用**：需要 Bloomberg 專屬聊天終端 / 機構交易 OMS / 合規稽核軌跡的機構用戶——這些屬 Bloomberg 核心護城河，短期無替代。

## 與類似專案的差異

| 對手 | 本專案的差異 |
|---|---|
| [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | OpenBB 是 Python CLI / web 平台，Fincept 是 C++/Qt 原生桌面；Fincept 主打 37 AI Agent 人格與本地 LLM，OpenBB 走商業 SaaS + 開源核心路線。 |
| [wilsonfreitas/awesome-quant](https://github.com/wilsonfreitas/awesome-quant) | awesome-quant 只是 library list，不是可用產品；Fincept 是整合好的終端機應用。 |

選型建議：要**跨平台原生桌面 + 多 LLM provider + 開箱即用 UI**選 Fincept；要**Python-first、可嵌入 Jupyter、企業部署成熟度**選 OpenBB。

## 外部評論

- [DEV Community《Introducing Fincept Terminal: Your Open-Source Bloomberg Alternative》](https://dev.to/fintechwarrior/introducing-fincept-terminal-your-open-source-bloomberg-alternative-lc2)（2025-02-03，作者 Space Lover / fintechwarrior）把它定位為「democratizing access to professional-grade financial analysis tools」。
- [openalternative.co 收錄頁](https://openalternative.co/fincept-terminal) 將其列為 Bloomberg Terminal 的開源替代，該站同主題分類中僅兩個候選，Fincept 為其一。
- [DEV Community《This Open Source Python Tool Replaces Your $2,000/Month Portfolio Tracker》](https://dev.to/fintechwarrior/how-i-created-a-24000-bloomberg-terminal-for-free-open-source-381l)——同一作者的延伸文，強調取代付費組合管理工具的訴求。
- [Product Hunt 頁](https://www.producthunt.com/products/finceptterminal) 已收錄產品頁，但截至撰寫時未見密集討論串。
- HN / Reddit r/algotrading r/quant：搜尋未見顯著討論串，**資料不足**——社群驗證目前主要靠 DEV Community 與專案官網自推。

## Release 狀態 / 時間軸

- 2024-08-29：Repo 建立
- 2024-09 ~ 2025-02：`Production0.1.x` ~ `Production1.0.0` 系列——早期 Windows 封裝版
- 2025-09-30：`v3beta` / `v0.1.0-build-15` 開始向 Qt + 多平台裝機轉型
- 2025-10-23：`v3.0.0-build-51`，標誌原生化路線成形
- 2026-01-06 ~ 02-09：v3.1 ~ v3.3 密集迭代，約每週一版
- **2026-03-30：`v4.0.0`**——C++20 + Qt6 完整重寫對外發佈
- **2026-04-15：`v4.0.1`**（最新）

總計 24 個 release，近半年節奏明顯加快。

## 授權與社群

- **授權**：Dual license——AGPL-3.0（個人 / 教育開源）+ 商業授權（企業用）。License 欄位在 GitHub 顯示為 `NOASSERTION`，需開發者確認 LICENSE 檔實際條款。
- **量化鐵錨**：約 **6,096 stars / 965 forks / 57 watchers / 21 open issues**，2024-08-29 建立至今約 20 個月；本次衝榜當日淨增 1,169 stars，growth_rate 19.18%。
- **主要語言**：GitHub 顯示 Python 為最大語言（可能來自舊 TUI / 嵌入式 Python 分析層），但 v4 主體為 C++20。
- **Topics**：`bloomberg-terminal`、`finance`、`quantitative-finance`、`stock-market`、`investment-research`、`machine-learning` 等 16 個。
- **貢獻結構**：高度集中——[tilakpatel22](https://github.com/tilakpatel22) 一人 624 commits，第二名 [Jaimin-ptl07](https://github.com/Jaimin-ptl07) 28 commits，其餘多為 bot 與小量貢獻；屬典型「兩人核心 + 社群 PR 點綴」結構。
- **Homepage / 商業化**：<https://fincept.in>，產品頁標榜免費終端機 + 付費資料 API，雙軌營收模型已就位。

## 資料來源

**本體**
- Repo：<https://github.com/Fincept-Corporation/FinceptTerminal>
- 官網：<https://fincept.in>
- 產品頁：<https://fincept.in/products>
- 入門文件：[docs/GETTING_STARTED.md](https://github.com/Fincept-Corporation/FinceptTerminal/blob/main/docs/GETTING_STARTED.md)
- About 頁：<https://fincept.in/about>

**第三方評論**
- [DEV Community 介紹文](https://dev.to/fintechwarrior/introducing-fincept-terminal-your-open-source-bloomberg-alternative-lc2)
- [DEV Community Portfolio Tracker 文](https://dev.to/fintechwarrior/how-i-created-a-24000-bloomberg-terminal-for-free-open-source-381l)
- [openalternative.co 頁面](https://openalternative.co/fincept-terminal)
- [Product Hunt](https://www.producthunt.com/products/finceptterminal)

**同類工具**
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB)
- [wilsonfreitas/awesome-quant](https://github.com/wilsonfreitas/awesome-quant)

## 更新紀錄
