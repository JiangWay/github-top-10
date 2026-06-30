---
repo: altic-dev/FluidVoice
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: true
latest_release: v1.6.1
tags: [語音與多媒體, 應用程式, 自架, 資料主權]
domain: 語音與多媒體
form: 應用程式
themes: [自架, 資料主權]
---

# [altic-dev/FluidVoice](https://github.com/altic-dev/FluidVoice)

> 研究日期：2026-06-30
> 資料來源：GitHub repo / Release page、官網 [altic.dev/fluid](https://altic.dev/fluid)、第三方部落格 [Nic's notes](https://notes.nicolasdeville.com/ai/fluidvoice/)、Hacker News [item 46631499](https://news.ycombinator.com/item?id=46631499)、推主 [@sdhilip](https://x.com/sdhilip/status/2069140867466797200)、評測站 [ottex.ai](https://ottex.ai/compare/fluidvoice-vs-superwhisper)
> 觸發原因：首次上絕對榜 #3（4,778 stars、今日 +586）
> 報告作者：Claude（Opus 4.7）

## 一句話定位

[altic-dev/FluidVoice](https://github.com/altic-dev/FluidVoice) 是 macOS 上的全本機語音輸入 app，賣點是不收訂閱費、音訊不離機，被付費競品 [Wispr Flow](https://wisprflow.ai/) 的重度使用者公開拿來當替代品。

## 作者與起源

開發者帳號 [@altic-dev](https://github.com/altic-dev)（站外品牌 ALTIC_DEV）2025 年 9 月在 GitHub 註冊，9 月 21 日建立此 repo。從帳號 follow 數與 repo 集中度判斷，這是個人或小型工作室專案而非公司 org；目前 GitHub 顯示 17 位 contributors，但 commit 主力集中在作者本人。

官方品牌頁掛在 [altic.dev/fluid](https://altic.dev/fluid)，README 自稱「Fastest macOS Offline Dictation app」，並以「One star takes us a long way」直接向 GitHub 用戶要 star。專案授權 2026-02-23 由 Apache 2.0 改為 GPLv3，背景與「Fluid Intelligence 模型本體留在私有 repo」的雙軌策略有關（見「設計哲學」段）。

## 核心架構 / 主要概念

整個 app 99.7% 用 Swift 寫成，要求 macOS 15.0 (Sequoia) 起跳，Apple Silicon 為主、Intel Mac 只能跑 Whisper。語音模型走多後端策略，根據 README 列表：

| 語音模型 | 語言數 | 體積 |
|---|---|---|
| Nemotron Speech 3.5 | ~40 | ~670 MB |
| Parakeet Flash | 英文 | ~250 MB |
| Parakeet TDT v3 | 25 | ~500 MB |
| Cohere Transcribe | 14 | ~1.4 GB |
| Apple Speech | 系統內建 | 內建 |
| Whisper | 至 99 | 75 MB–2.9 GB |

App 本體之外，作者另外維護一個叫 **Fluid Intelligence** 的本機後處理模型（約 3.5 GB），負責加標點、修大小寫、依目標 app（例如 Slack vs Cursor）調整語氣。這份模型放在私有 repo、以 binary 形式發佈，這是 README 稱「open-core」的關鍵理由。

UI 層提供全域 hotkey、notch 即時轉字 overlay、Command Mode（語音觸發系統動作）、Write Mode（往任意 app 注入文字）、本機 audio history 與匯出。第三方 AI provider（OpenAI、Groq、自訂 endpoint）走 BYOK，使用者要不要把字串送雲端由自己決定。

## 設計哲學

讀 README 與官網兩邊文案，作者把產品立場壓在三個點上：

1. **預設不出機**：音訊、轉錄文字、檔案路徑預設都留在本機，匿名 telemetry 只回傳「版本號 + feature flag + 使用區間」，明文寫不收 transcript。
2. **本機後處理也算自家武器**：競品要嘛純轉錄不做格式化、要嘛把潤稿送雲端；FluidVoice 把 Fluid Intelligence 跑在本機，等於把 Wispr Flow 的 AI 編輯能力搬下雲。
3. **open-core 而非全開源**：app 殼開原始碼（GPLv3），潤稿模型留私有 binary。這條線決定了它能否長期維持「個人開發、不靠訂閱」的營運模型——open 的部分換 star 與社群信任、closed 的部分換可控的差異化。

授權從 Apache 2.0 改 GPLv3 是 2026-02-23 的轉折，配合上述策略，目的是降低被閉源 fork 重新包裝販售的機會。

## 目標使用者與適用情境

- 寫程式或寫長文的 macOS 用戶，希望全域 hotkey 直接念進 Cursor、VS Code、Slack、終端機，而不是只用內建 Notes 或瀏覽器網頁版。
- 對訂閱費敏感、或內部合規不允許音訊上傳第三方雲端的個人開發者與小型團隊。
- 多語使用者：英文走 Parakeet Flash 取速度、需要德文／法文等可切到 Nemotron 或 Whisper 大模型。

不適合：Intel Mac（除 Whisper 外其他模型跑不動）、需要會議轉錄與多人分流（這不是 meeting assistant）、Windows／Linux 使用者（macOS-only）。

## 與類似專案的差異

| 維度 | FluidVoice | [openai/whisper](https://github.com/openai/whisper) | [ggerganov/whisper.cpp](https://github.com/ggerganov/whisper.cpp) | macOS 內建 Dictation | Wispr Flow（閉源商用） | SuperWhisper（閉源商用） |
|---|---|---|---|---|---|---|
| 形態 | macOS GUI app | Python 函式庫 | C/C++ 推理引擎 | 系統功能 | macOS／Windows app | macOS／iOS app |
| 全本機推理 | 是（含潤稿） | 是（純推理，需自寫殼） | 是 | 部分（需開啟 Enhanced） | 否，全部上雲 | 是 |
| 全域 hotkey + 注入任意 app | 是 | 否 | 否 | 部分（系統限制） | 是 | 是 |
| AI 潤稿（標點、格式、語氣） | 本機 Fluid Intelligence | 無 | 無 | 無 | 雲端 | 雲端為主 |
| 收費 | 免費 | 免費 | 免費 | 免費 | $15/月 | $8.49/月起或 $249.99 買斷 |
| 授權 | GPLv3（app）+ 私有 binary（潤稿模型） | MIT | MIT | 專有 | 專有 | 專有 |
| 多語 | 至 99（看模型） | 99 | 99 | 看系統 | 多語 | 100 |

差異要點：

- 跟 [openai/whisper](https://github.com/openai/whisper) 與 [ggerganov/whisper.cpp](https://github.com/ggerganov/whisper.cpp) 比，FluidVoice 是「打包好的最終使用者產品」而不是 SDK，省掉自己寫熱鍵、overlay、文字注入的工。
- 跟 macOS 內建 Dictation 比，多了多後端模型選擇、本機潤稿與 BYOK 雲端 AI hook。
- 跟 [Wispr Flow](https://wisprflow.ai/) 比，捨掉雲端規模換來「無訂閱、音訊不離機」；推主 [@sdhilip](https://x.com/sdhilip/status/2069140867466797200) 自述用 Wispr Flow 6 個月 44,414 字後切換到 FluidVoice 並退訂的 tweet 取得約 17.9 萬曝光。
- 跟 [SuperWhisper](https://superwhisper.com/) 比，兩者都主打本機，但 SuperWhisper 走付費／一次買斷、FluidVoice 走免費 + open-core。

## 外部評論

- [Nicolas Deville](https://notes.nicolasdeville.com/ai/fluidvoice/) 在個人筆記寫：「local, private, free, and it works in Cursor and the terminal, not just a notes app」，承認限制是「年輕開源 app 的成熟度，不是大型商業產品」。
- 推主 [Dhilip Subramanian](https://x.com/sdhilip/status/2069140867466797200) 公開貼出用了 Wispr Flow 半年累積 44,414 字、161 wpm 後改用 FluidVoice 並退訂的紀錄，是這波 stars 暴衝的關鍵單一事件。
- Hacker News [thread 46631499](https://news.ycombinator.com/item?id=46631499)：用戶 holtwick 在 Handy 的討論串裡推薦 FluidVoice，但 jimmydoe 跟著批 UI「vibe coded UI feels too complicated」——是已知公開負評。
- 對比站 [ottex.ai](https://ottex.ai/compare/fluidvoice-vs-superwhisper) 與 [getvoibe.com](https://www.getvoibe.com/resources/compare/) 把 FluidVoice 列在 2026 年的 macOS 主流候選名單，主要賣點都歸到「免費 + 支援 BYOK + 檔案轉錄」。

口碑樣本目前以個人開發者圈與推特為主，沒看到媒體深度評測或企業端採用案例。

## Release 狀態 / 時間軸

GitHub Release 啟用，最新版 **v1.6.1**（2026-06-28）。近三個月節奏：

- **v1.6.1**（2026-06-28）：v1.6.0 的修補
- **v1.6.0**（2026-06-22）：重寫 Parakeet 實作降延遲、引入 Fluid Intelligence 本機潤稿、緊湊型 toolbar 切換器、新 onboarding 流程
- v1.5.15（2026-06-04）
- v1.5.14（2026-05-29）
- v1.5.13（2026-05-02）
- v1.5.12（2026-04-08）
- v1.5.11 系列 beta（2026-03-29 起）
- v1.5.10（2026-03-27）

從 2026-02 到 2026-06 共 10 個正式版加數個 beta，平均約兩週一發；6 月 22 日 v1.6.0 引入 Fluid Intelligence 後 6 天再修一版，與本日 stars 暴衝時點吻合。

## 授權與社群

- **授權**：app 本體 GPLv3（自 2026-02-23 起；先前 Apache 2.0）；Fluid Intelligence 模型 binary 留在私有 repo，未開源。
- **社群規模**：4,778 stars、296 forks、15 watchers、93 open issues、17 contributors。Discussions 已開啟；官方另有 Discord 與 X（@ALTIC_DEV）。
- **議題池**：93 open issues 對應 ~3,000 個月活 stars 級規模的個人專案，比例偏高，反映回報量大但人力有限。
- **下載**：官網 [altic.dev/fluid](https://altic.dev/fluid) 自報 25,000+ 下載；亦可透過 `brew install --cask fluidvoice` 取得。

## 資料來源

- GitHub repo 與 README：<https://github.com/altic-dev/FluidVoice>
- Releases 頁：<https://github.com/altic-dev/FluidVoice/releases>
- 官網：<https://altic.dev/fluid>
- 第三方筆記：<https://notes.nicolasdeville.com/ai/fluidvoice/>
- Hacker News 提及：<https://news.ycombinator.com/item?id=46631499>
- 推特單推（增長導火線）：<https://x.com/sdhilip/status/2069140867466797200>
- 比較頁：<https://ottex.ai/compare/fluidvoice-vs-superwhisper>、<https://www.getvoibe.com/resources/compare/>
- `gh api repos/altic-dev/FluidVoice`、`gh api repos/altic-dev/FluidVoice/releases`、`gh api repos/altic-dev/FluidVoice/contributors`（2026-06-30 抓取）

## 更新紀錄
