---
repo: AIDC-AI/Pixelle-Video
first_seen: 2026-05-04
last_updated: 2026-05-04
appearances: [2026-05-04]
growth_appearances: [2026-05-04]
has_releases: true
latest_release: v0.1.15
tags: [語音與多媒體, 應用程式, 開源替代, 自架]
domain: 語音與多媒體
form: 應用程式
themes: [開源替代, 自架]
---

# [AIDC-AI/Pixelle-Video](https://github.com/AIDC-AI/Pixelle-Video)

## 深度研究（2026-05-04 首次）

### 專案定位
[AIDC-AI/Pixelle-Video](https://github.com/AIDC-AI/Pixelle-Video) 是阿里巴巴國際數位商業（Alibaba International Digital Commerce, AIDC）團隊開源的「AI 全自動短視頻引擎」。使用者只需輸入一個主題關鍵字，系統就會串起腳本生成、分鏡規劃、AI 圖像／影片生成、TTS 語音、BGM、字幕排版、最後合成的整條 pipeline，宣稱「3 分鐘出一支成片」。Apache-2.0 授權、可商用，2025 年 11 月初次釋出，至 2026-05-04 已累積 9,808 stars、1,539 forks，當日新增 +478 stars 衝上 GitHub Trending #5。

### 核心架構 / 主要概念
底層**完全建在 [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) 工作流引擎之上**——所有圖像／影片生成節點都是 ComfyUI workflow，使用者可以替換任一節點（例如把 FLUX 換成 [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1)、把 Edge-TTS 換成 IndexTTS）。LLM 端走 OpenAI 相容介面，原生支援 GPT、阿里通義 [QwenLM/Qwen](https://github.com/QwenLM/Qwen)、DeepSeek、Ollama 本地模型。前端 Streamlit（`localhost:8501`），影片合成靠 ffmpeg，模板系統分「靜態 / 圖片 / 影片」三類。同 organization 還有姊妹專案 [AIDC-AI/Pixelle-MCP](https://github.com/AIDC-AI/Pixelle-MCP) 把 ComfyUI 包成 MCP server，讓 AI 助理可以直接呼叫。

### 目標使用者
- **零剪輯經驗的內容創作者**：想做 TikTok / YouTube Shorts / 抖音 / 小紅書短影音，又不想學剪輯軟體
- **教育、行銷、口播類創作者**：知識型 PowerPoint 風格說明影片是命中區
- **自架 AIGC pipeline 的開發者**：把 ComfyUI workflow 當積木，替換成自家模型
- **想批量出片的工作室**：支援平行批次生成

### 與類似專案的差異
- vs. [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)：兩者都是「主題→成片」的全自動短視頻方案，MoneyPrinterTurbo 走素材庫拼接路線；Pixelle-Video **每幀都用 AI 生成**，視覺更原創但缺真實素材的連貫性
- vs. 純 [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)：ComfyUI 是節點編輯器，Pixelle-Video 是上層產品化 SaaS-like UI
- vs. 商業工具 Pictory / InVideo：開源、可商用、自架，無 watermark 與訂閱費

### 外部評論
- 官方 [@Pixelle_AI on X](https://x.com/Pixelle_AI/status/1990827342873137324) 主打「一杯咖啡 5 分鐘，一支影片更短」
- [技術棧](https://jishuzhan.net/article/2048564053816180737)、[蘇米客](https://www.xmsumi.com/detail/2314)、[騰訊雲開發者社群](https://cloud.tencent.com/developer/article/2655979) 等中文媒體普遍稱為「零門檻 AI 短視頻引擎」
- [Efficient Coder 英文評測](https://www.xugj520.cn/en/archives/pixelle-video-ai-automated-video-creation.html) 評為 Apache-2.0 商用無門檻
- [知乎](https://zhuanlan.zhihu.com/p/2027668463913645712) 討論指出「教育 / 行銷類最受用，AI 畫面缺乏真人連貫性」
- HN / Reddit 目前**尚無集中討論串**（搜尋無結果）

### Release 狀態
有 release，最新版本 [v0.1.15](https://github.com/AIDC-AI/Pixelle-Video/releases/tag/v0.1.15)（2026-01-27 發布，主打「Windows 一鍵整合包」）。2025-11 首發以來節奏穩定，月 2–3 個小版本。

### 授權與社群
Apache-2.0，可商用。主要貢獻者 [@puke3615](https://github.com/puke3615)（245 commits，主作者）、[@lltt90511](https://github.com/lltt90511)、[@AuroraChloe](https://github.com/AuroraChloe)。Issues 82 開放、Discussions 未開、文件站 <https://aidc-ai.github.io/Pixelle-Video/>。掛在 [AIDC-AI](https://github.com/AIDC-AI) organization 下，與阿里國際數位商業團隊的 Marco-o1、Ovis 系列同源。
