---
repo: harry0703/MoneyPrinterTurbo
first_seen: 2026-05-31
last_updated: 2026-06-01
appearances: [2026-05-31, 2026-06-01]
growth_appearances: [2026-05-31, 2026-06-01]
has_releases: true
latest_release: v1.2.9
tags: [語音與多媒體, 應用程式, 自架, 開源替代]
domain: 語音與多媒體
form: 應用程式
themes: [自架, 開源替代]
---

# [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)

## 深度研究（2026-05-31 首次）

### 專案定位

[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)（73,312 stars / 10,474 forks / 2024-03-11 建立 / MIT / Python 97.2% / 完整 MVC 架構 + Streamlit WebUI + FastAPI）是「給一個主題或關鍵字，全自動產出文案、素材、語音、字幕、背景音樂並合成一支高清短影片」的開源自動化工具，主打 TikTok / 抖音 / Shorts 式的批量短影片生產線。今日以 **+1,937 stars / growth_rate 2.64% 首登本站絕對榜 #1**，且 stars 總量已達 73,306 量級——是本站歷來首登即站上絕對榜首、且**進榜時 stars 體量遠超一般新進榜專案（多數新進榜在數千至兩萬量級）**的「成熟巨倉回潮」事件。倉建立已逾兩年、forks/stars 比達 14.3%（10,474 / 73,312），反映「自架部署、自帶 API key 跑自己的影片工廠」的實際下載需求極高，而非僅止於收藏。值得注意：此倉並非新專案，2024 年中文社群即已廣泛報導（彼時約 23.9K stars），今日進榜屬「長尾巨倉因近兩日連續發版（v1.2.8 / v1.2.9）再度衝上 trending」的回潮型上榜。

### 核心架構 / 主要概念

- **端到端生成 pipeline（核心）**：輸入主題關鍵字 → ①LLM 生成影片文案（中／英）→ ②TTS 語音合成（含實時試聽）→ ③字幕生成（edge 較快省資源 / whisper 較慢較穩）→ ④素材抓取（Pexels API 拉高清無版權片段，可本地素材覆寫）→ ⑤MoviePy 合成（疊加文案、語音、字幕、背景音樂）輸出成片。每一段皆可手動介入（文案可自訂、素材可換本地、字幕字體/位置/顏色/大小/描邊可調）。
- **多 LLM provider 接入**：OpenAI / Moonshot / Azure / gpt4free / one-api / 阿里 Qwen / Google Gemini / Ollama 本地 / DeepSeek / MiniMax / 百度文心 / Pollinations / ModelScope；官方建議中國大陸用戶用 DeepSeek 或 Moonshot（境內可直連、註冊送額度）。
- **輸出規格**：竪屏 9:16（1080x1920）與橫屏 16:9（1920x1080）兩種高清尺寸，支援批量生成、可調片段時長與素材切換頻率。
- **雙介面 + MVC 架構**：完整 MVC 分層，同時提供 Streamlit WebUI（瀏覽器操作）與 FastAPI API 服務（`/docs`、`/redoc` 互動文件），便於嵌入自動化流水線。
- **多種部署形態**：Docker（含 GPU 版 docker-compose）/ Windows 一鍵整合包（v1.2.6 經百度雲或 Google Drive 派送）/ uv 或傳統 venv+pip 手動部署。
- **低硬體門檻**：最低 4 核 CPU + 4GB RAM、不強制 GPU（GPU 主要加速本地 whisper 轉錄與批量生成；若全走雲端 LLM/TTS 則 GPU 不關鍵）。
- **依賴與素材**：核心依賴 MoviePy（合成）/ ImageMagick（圖像處理，Windows 需靜態庫版）/ FFmpeg（媒體處理，可自動下載）；背景音樂預載於 `resource/songs`、字型放 `resource/fonts`。

### 目標使用者

想做 TikTok / 抖音 / YouTube Shorts 量產內容的自媒體與電商運營（一鍵日更多條）、要把「主題 → 成片」嵌入自家自動化發布流水線的開發者（走 FastAPI）、不想付雲端 AI 影片 SaaS 月費而選擇自架的個人創作者、以及中國大陸因網路環境偏好 DeepSeek / Moonshot 等境內 LLM 的使用者。WebUI + Windows 一鍵包大幅降低非工程背景使用者的上手門檻。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [FujiwaraChoki/MoneyPrinterV2](https://github.com/FujiwaraChoki/MoneyPrinterV2) | 命名與靈感來源同宗的英文圈專案，定位更廣（含 YouTube 上傳、Twitter 發文、海外社群運營等「自動賺錢」全流程）；本檔聚焦並深化「影片生成」這一段、補上完整 WebUI + 多國 LLM + 中文文案 + 批量，FujiwaraChoki README 亦把本檔列為已知的中文版本（兩者為同領域獨立維護專案，非傳統 fork） |
| 雲端 AI 影片 SaaS（如 Pictory / InVideo / Fliki 類） | 後者為閉源訂閱制、資料上雲；本檔 MIT 開源、自架、自帶 API key 走 pay-per-use，成本可控且素材/流程可改 |
| [presenton/presenton](https://github.com/presenton/presenton) | 同屬「語音與多媒體 / 開源替代」象限但產物不同——presenton 生成 PPTX/PDF 簡報，本檔生成短影片成品 |
| 純 TTS 或純剪輯工具 | 後者只做單一環節；本檔的差異化關鍵是「文案→TTS→字幕→素材→合成」一條龍全自動 + 雙介面 + 多 LLM 覆蓋 |

差異化關鍵：在開源短影片自動生成賽道，本檔以**完整 pipeline + Streamlit WebUI + FastAPI + Docker + Windows 一鍵包 + 13 家 LLM provider + 中英文案**的覆蓋廣度與低硬體門檻取得壓倒性 star 體量（73K），是中文社群此賽道的事實標準。

### 外部評論

- [知乎《開源項目（MoneyPrinterTurbo）利用大模型，一鍵生成短視頻》](https://zhuanlan.zhihu.com/p/688655602)：中文社群早期介紹文，盤點一鍵生成流程。
- [知乎《MoneyPrinterTurbo 全攻略：從零開始一鍵生成 AI 短視頻》](https://zhuanlan.zhihu.com/p/1965785366905742700)：完整部署與使用教學長文。
- [阿里雲開發者社區《MoneyPrinterTurbo：23.9K Star！這個 AI 把寫文案+找素材+剪視頻全包了，日更10條不是夢》](https://developer.aliyun.com/article/1653292)：以「23.9K Star」為標題的推廣評測，可見其早於 2024 即已是中文圈熱門倉。
- [SegmentFault 思否《MoneyPrinterTurbo：一鍵生成短視頻的 AI 神器》](https://segmentfault.com/a/1190000044826294)：功能與架構介紹文。
- [AI 工具集 ai-bot.cn 收錄頁](https://ai-bot.cn/moneyprinterturbo/)：工具目錄收錄，標註「開源免費的 AI 短視頻生成工具」。
- [codersera《Install MoneyPrinterTurbo on Windows: 2026 Guide》](https://codersera.com/blog/installing-and-running-moneyprinterturbo-on-windows/)：英文圈 Windows 安裝教學。
- [AIToolly 報導頁](https://aitoolly.com/ai-news/article/2026-05-31-moneyprinterturbo-revolutionizing-short-video-creation-with-one-click-ai-model-integration)：英文 AI 工具新聞站介紹。
- 注：Reddit / HN 等英文主流社群截至撰寫**未發現針對本檔的密集長文討論串**，傳播主力集中於中文社群（知乎、阿里雲、CSDN、SegmentFault）與 AI 工具目錄站。

### Release 狀態

`has_releases: true`，最新 **[v1.2.9](https://github.com/harry0703/MoneyPrinterTurbo/releases/tag/v1.2.9)（2026-05-30）**。近期節奏值得注意：[v1.2.7](https://github.com/harry0703/MoneyPrinterTurbo/releases/tag/v1.2.7)（2026-04-03）之後沉寂約兩個月，接著 [v1.2.8](https://github.com/harry0703/MoneyPrinterTurbo/releases/tag/v1.2.8)（2026-05-28）與 [v1.2.9](https://github.com/harry0703/MoneyPrinterTurbo/releases/tag/v1.2.9)（2026-05-30）兩天內連發——此「沉寂後兩日連發」很可能是本檔今日重回 trending 並登頂的直接觸發。更早的 [v1.2.6](https://github.com/harry0703/MoneyPrinterTurbo/releases/tag/v1.2.6)（2025-05-10，附 Windows 一鍵整合包）與 [v1.2.5](https://github.com/harry0703/MoneyPrinterTurbo/releases/tag/v1.2.5)（2025-05-09）顯示版本線跨度逾一年。`pushed_at` 為 2026-05-31，main 分支當日仍活躍。

### 授權與社群

- **授權**：MIT（高度寬鬆，可商用、可自架、可改）。
- **貢獻結構**：作者 [harry0703](https://github.com/harry0703) 個人絕對主導（204 commits），其餘為零星社群 PR——[yyhhyyyyyy](https://github.com/yyhhyyyyyy)（22）、[vuisme](https://github.com/vuisme)（14）、[KevinZhang19870314](https://github.com/KevinZhang19870314)（6）等均為個位至雙位數，典型「單一作者 + 長尾社群貢獻」結構。README 註明由圖像處理平台 Picwish 贊助維護。
- **量化指標**：73,312 stars / **10,474 forks**（fork 比例 14.3%，偏高，反映大量使用者下載自架）/ 11 open issues（issue 數極低，相對其 star 體量，顯示維護者收斂議題或社群多走 fork 自用）。
- **Topics**：`ai`、`automation`、`chatgpt`、`moviepy`、`python`、`shortvideo`、`tiktok` 共 7 個。
- **Homepage**：未設定（GitHub repo 即主入口；README 另提及有基於本檔的免費線上 AI 影片生成器服務可直接使用、無需自架）。

## 資料來源

**本體**
- Repo：<https://github.com/harry0703/MoneyPrinterTurbo>
- README（英文）：<https://github.com/harry0703/MoneyPrinterTurbo/blob/main/README-en.md>
- Releases：<https://github.com/harry0703/MoneyPrinterTurbo/releases>
- `gh api repos/harry0703/MoneyPrinterTurbo`（metadata：stars / forks / license / created_at / topics）
- `gh api repos/harry0703/MoneyPrinterTurbo/releases`（v1.2.9 / v1.2.8 / v1.2.7 / v1.2.6 / v1.2.5）
- `gh api repos/harry0703/MoneyPrinterTurbo/contributors`（貢獻者排名）

**同領域對照**
- [FujiwaraChoki/MoneyPrinterV2](https://github.com/FujiwaraChoki/MoneyPrinterV2)
- [presenton/presenton]({{ site.baseurl }}{% link research/presenton__presenton.md %})

**外部評論與教學**
- [知乎介紹文](https://zhuanlan.zhihu.com/p/688655602)
- [知乎全攻略教學](https://zhuanlan.zhihu.com/p/1965785366905742700)
- [阿里雲開發者社區評測](https://developer.aliyun.com/article/1653292)
- [SegmentFault 思否介紹](https://segmentfault.com/a/1190000044826294)
- [AI 工具集收錄頁](https://ai-bot.cn/moneyprinterturbo/)
- [codersera Windows 安裝教學](https://codersera.com/blog/installing-and-running-moneyprinterturbo-on-windows/)
- [AIToolly 報導](https://aitoolly.com/ai-news/article/2026-05-31-moneyprinterturbo-revolutionizing-short-video-creation-with-one-click-ai-model-integration)
