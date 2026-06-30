---
repo: browser-use/video-use
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: false
latest_release: null
tags: [開發者工具, 框架]
domain: 開發者工具
form: 框架
themes: []
---

# browser-use/video-use

> 把一整資料夾的素材丟給 Claude Code，用一句話換回 `final.mp4`。LLM 從不看 frame，只讀 ElevenLabs Scribe 的逐字稿與 on-demand 視覺合成圖，FFmpeg 負責剪。這是 [browser-use](https://github.com/browser-use/browser-use) 在 web agent 之外的第二棒，把同樣「給 LLM 文字結構而不是像素」的解法套到剪片。

## 一句話定位

[browser-use/video-use](https://github.com/browser-use/video-use) 是把 Claude Code 等 coding agent 變成影片剪輯師的 open-source skill，2026-04-12 建立、6 月底衝上絕對榜 #5（12,405 stars、今日 +722、MIT 授權）。

## 作者與起源

倉庫掛在 [browser-use](https://github.com/browser-use) 這個 GitHub org 底下，主要 commit 來自 `gregpr07`——共同創辦人 [Gregor Zunic](https://github.com/gregpr07)。同 org 的旗艦專案是 2024-10-31 上線的 [browser-use/browser-use](https://github.com/browser-use/browser-use)，一個讓 LLM 透過結構化 DOM 控制瀏覽器的 SDK，至今 101,662 stars、11,281 forks、由 Magnus Müller 與 Gregor Zunic 在 Zurich／San Francisco 雙城開發，YC W25 入選並募得 17M 美金種子輪（[Yahoo Finance](https://finance.yahoo.com/news/agentic-ai-startup-browser-raises-124956891.html)、[Y Combinator 公司頁](https://www.ycombinator.com/companies/browser-use)）。

video-use 的 repo 在 2026-04-12 凌晨建立，第一波 commits 集中在 04-12 到 05-15，6 位 contributors 累積 16 commits，主力是 gregpr07（9 commits），其餘 5 位散落 1–2 commits。和 browser-use 旗艦相比規模還小，但「同團隊把核心 insight 套到另一個 domain」的脈絡很清楚：browser-use 給 LLM DOM 而不是螢幕截圖，video-use 給 LLM 逐字稿而不是 frames。

## 核心功能

照官方 README，主要能力：

- 自動切掉沉默與 filler words（「umm」「uh」），每個切點補 30ms audio fade 防 pop
- 自動 color grading，內建 warm cinematic／neutral punch 兩種 profile，可自訂 ffmpeg chain
- 燒字幕（預設 2-word uppercase chunks），樣式可改
- 動畫 overlay：呼叫 HyperFrames／Remotion／Manim／PIL 的 parallel sub-agent 生
- 渲染完自動 self-eval cut boundary，最多三輪迭代
- 把編輯記憶寫入 `project.md`，跨 session 延續

工作流：使用者 `cd` 到素材資料夾、開 `claude`、丟一句「edit these into a launch video」，agent 先盤點素材、提策略、等使用者確認，才開始剪，輸出落在 `<videos_dir>/edit/`。

## 技術棧與架構

關鍵設計是 **text-first，no frame-dumping**。pipeline：

```
Transcribe → Pack → LLM Reasons → EDL → Render → Self-Eval (最多 3 輪)
```

兩層 context：

- **Layer 1（恆常載入）**：每個 source 跑一次 ElevenLabs Scribe，拿到 word-level timestamps、speaker diarization、`(laughter)` / `(applause)` 等 audio events。一段 10 分鐘影片 transcript 約 12KB。
- **Layer 2（按需生成）**：要做視覺判斷時才生 `timeline_view`——帶 waveform 與標籤的 filmstrip PNG，丟給 LLM 看。

官方 README 直接給對比：naive 做法是 30,000 frames × 1,500 tokens = 45M tokens，video-use 用 12KB 文字 + 少數 PNG。這個思路和 browser-use 給 agent 結構化 DOM 而不是 screenshot 完全同源。

語言組成：Python 76%、HTML 22.9%、Shell 1.1%。依賴：ffmpeg（必要）、yt-dlp（選用，抓線上素材）、ElevenLabs API key（轉錄）、uv 或 pip 裝套件。安裝會把整個 repo symlink 到 `~/.claude/skills/video-use`，它對 Claude Code 而言其實是個 [Skill](https://github.com/browser-use/video-use/blob/main/SKILL.md)，但對外 packaging 是 Python 框架，所以 form 仍歸「框架」。

## 與類似專案的差異

| 專案 | stars | 定位 | LLM 看到什麼 | Renderer | 是否需要 coding agent |
|---|---|---|---|---|---|
| [browser-use/video-use](https://github.com/browser-use/video-use) | 12.4k | 給 Claude Code／Codex 的剪輯 skill | 逐字稿 + on-demand filmstrip | FFmpeg | 是（Claude Code、Codex、Hermes、Openclaw） |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | （6 月也曾登榜 #1） | 端到端 agentic 影片生產 | 多 pipeline（research → script → assets → timeline） | FFmpeg／Remotion | 是 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 超過 30k | 給定主題自動生短影音（含腳本 + TTS + 素材） | 文字 prompt | MoviePy | 否，自帶 GUI |
| [woniu9524/ai-ffmpeg](https://github.com/woniu9524/ai-ffmpeg) | 小型 | 把自然語言翻成 ffmpeg command | 自然語言 | FFmpeg.wasm | 否，web 應用 |
| Remotion | （函式庫） | React 程式碼寫影片 | 程式碼 | 自己的 renderer | 否，是 SDK |
| 傳統 NLE（Premiere／Final Cut／DaVinci） | n/a | GUI 時間軸剪輯 | 人 | 自己 | 否 |

兩個關鍵差異：

1. **「coding agent 才是 host，video-use 只是 skill」**：MoneyPrinterTurbo 與 OpenMontage 都自帶完整流程，video-use 假設你已經有 Claude Code（或 Codex／Hermes），它只負責供工具與規則。安裝指令就是 `ln -sfn ... ~/.claude/skills/video-use`。
2. **Source-first vs generation-first**：MoneyPrinterTurbo 從零生成（拿圖庫 + TTS 拼），video-use 假設使用者已經拍了一堆素材、只是要剪。對拍 vlog／訪談／教學的內容創作者來說，這個切入點比「AI 從零生短影音」實際：前者解決剪 filler 與 dead air 的痛點，後者多半被當 SEO 內容農場用。

## 真實使用案例

官方在 TikTok（@browser_use）放了一段 15 秒 demo，宣稱整支從素材到成片完全由 Claude Code 完成。Medium 上 [Algo Insights 的安裝心得](https://medium.com/coding-nexus/an-open-source-claude-code-skill-that-turns-a-folder-of-raw-footage-into-a-finished-video-a7b64f9020c4) 描述了 talking head 影片的實際流程：丟資料夾、agent 列出素材、提策略、確認後 ~10 分鐘輸出 final cut。

社群層面的真實流量目前還比較薄。Reddit 搜不到顯著討論串，HN 也沒看到專屬 launch thread（[ycombinator search](https://hn.algolia.com/?q=video-use+browser-use) 暫無相關貼文）。流量主要靠 browser-use 既有 102k stars 粉絲群的口耳擴散加上 X 平台的 viral coverage（browser-use 在 X 平台單篇 2.4M views 的歷史聲量，被 [Frederick AI 創辦人專訪](https://www.frederick.ai/blog/magnus-muller-browser-use) 點名）。

## 社群評論

- [SoloSoft 部落格](https://www.solosoft.dev/post/video-use-ai-editing-2026/)：promotional 角度，把 video-use 框成「解決 AI 影片剪輯最大瓶頸，LLM 無法看影片」。沒給負評，沒對比競品，文中引用的 star 數是 4,200，和今天的 12,405 對照，可推估那篇寫於 4–5 月專案剛上線時。
- [Openflows 介紹文](https://openflows.org/currency/currents/video-use/)：把 video-use 標為「LLM-Driven Video Editing Skill」，重點在 pipeline 描述，沒進一步分析。
- [Medium / Coding Nexus 安裝心得](https://medium.com/coding-nexus/an-open-source-claude-code-skill-that-turns-a-folder-of-raw-footage-into-a-finished-video-a7b64f9020c4)：實作型介紹，給的是「跟著步驟做」型內容。
- HN／Reddit 此刻搜不到實質討論串，第三方獨立評測仍少。

整體而言，目前外部評論多半是技術 blog 的轉述，缺少有意見的批評文或對比實測。

## 授權與商業考量

MIT 授權，允許商業使用、修改、私有發行。但實務上有兩個成本要算進來：

- **ElevenLabs API**：每段素材都要轉錄一次，價格依字數計費（[ElevenLabs Scribe 定價頁](https://elevenlabs.io/pricing) 可查）。長段影片或大量素材會直接看到 bill。
- **Claude / Codex token**：agent 走完整套 transcribe → pack → LLM reasons → render → self-eval 流程，token 成本不低。雖然 video-use 用 text-first 把 input 壓到 12KB 等級，但每輪 self-eval 都會再消耗。

對自架／資料主權需求高的使用者，ElevenLabs 是 hosted service，逐字稿會出國；要完全 local，得換成 Whisper 之類 self-hosted 替代，目前 video-use README 沒提供官方支援。

## 風險與限制

- **專案還在早期**：建立至今約 80 天，6 contributors、16 commits、48 open issues、36 open PR、**沒有任何 release tag**（gh api releases 回空陣列）。production 級別的穩定性還沒驗證過。
- **重度依賴 ElevenLabs**：轉錄品質決定一切。語言／口音／音質差時，逐字稿不準，後續 LLM 切點與字幕都會錯。
- **「LLM 從不看畫面」是 feature 也是限制**：表情、動作、構圖、相機運動這些純視覺訊號 agent 看不到。Layer 2 的 timeline filmstrip 只在「決策點」生，不適合做剪輯師等級的視覺判斷（例如 jump cut 是否難看、構圖是否在三分線上）。
- **品質仍綁在底層 LLM 上**：官方支援 Claude Code、Codex、Hermes、Openclaw，但同一指令在不同 agent 下表現會差很多，沒有跨 LLM benchmark。

## 一句話總結

video-use 把 browser-use 的核心 insight（給 LLM 結構化文字而不是像素）原樣搬到剪片場景：ElevenLabs Scribe 出逐字稿、Claude Code 出 EDL、FFmpeg 出片，自評三輪後交件。12.4k stars 與單日 +722 的代價是 ElevenLabs 帳單、LLM token，以及一個只有 80 天歷史、還沒打 release tag 的 codebase。

## 更新紀錄

