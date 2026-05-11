---
repo: AUTOMATIC1111/stable-diffusion-webui
first_seen: 2026-05-12
last_updated: 2026-05-12
appearances: [2026-05-12]
growth_appearances: [2026-05-12]
has_releases: true
latest_release: v1.10.1
tags: [語音與多媒體, 應用程式, 開源替代]
domain: 語音與多媒體
form: 應用程式
themes: [自架, 開源替代]
---

# [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

> 研究日期：2026-05-12
> 研究來源：https://github.com/AUTOMATIC1111/stable-diffusion-webui
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 是 2022 年 8 月由匿名開發者「AUTOMATIC1111」開源的 Stable Diffusion 圖形前端，用 Gradio 把 txt2img / img2img / inpaint / 外掛擴充 / LoRA / Textual Inversion / 模型合併等功能塞進一個本地瀏覽器頁面，**事實上成為 2022–2024 整個 Stable Diffusion 社群的「預設前端」並沉澱出最龐大的擴充生態**——本日以 162,876 stars / 30,333 forks 規模、僅 +29 stars 的長尾餘溫旋進 GitHub Trending #10，象徵這檔老牌專案在後 ComfyUI 時代仍未完全退場。

## 作者與起源

維護者 [AUTOMATIC1111](https://github.com/AUTOMATIC1111) 是身分未公開的個人開發者，GitHub 帳號於 2016 年註冊但長期沉寂，直到 2022-08-22 建立本 repo 才被廣泛認識。彼時 Stable Diffusion 由 Stability AI 於 2022-08-22 同日對外開放權重，AUTOMATIC1111 在數小時內推出第一版 Gradio 介面，搶在所有商業前端之前佔住第一波傳播紅利。

到 2026-05-12，repo 累積 162,876 stars / 30,333 forks / 1,182 watchers / 2,485 open issues / 主要貢獻者前 5 名為 AUTOMATIC1111 本人（3,630 commits）、[w-e-w](https://github.com/w-e-w)（314）、[dfaker](https://github.com/dfaker)（168）、[akx](https://github.com/akx)（155）、[catboxanon](https://github.com/catboxanon)（132）。值得注意的是 **[vladmandic](https://github.com/vladmandic)（60 commits）後來自己開了 [vladmandic/sdnext](https://github.com/vladmandic/sdnext) 分支**，[KohakuBlueleaf](https://github.com/KohakuBlueleaf)（124 commits）則成為當前 Stable Diffusion 訓練工具圈的代表人物。

**關鍵爭議：NovelAI 洩漏事件（2022 年 10 月）**。NovelAI 內部模型與訓練腳本被外洩到 4chan 後，AUTOMATIC1111 在一週內把支援該洩漏模型的 Hypernetwork 機制併入主線（[Issue #1936](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/1936)），被 NovelAI 指控直接複製其碼，AUTOMATIC1111 一度被官方 Stable Diffusion Discord 封禁；不久後 Stability AI 創辦人 Emad Mostaque 公開道歉，事件不了了之但永久寫進社群史。

## 核心架構 / 主要概念

- **語言比例**：Python 87.5%，其餘為前端 JS / CSS / HTML，無編譯產物，全 repo 約 36 MB。
- **介面層**：[Gradio](https://www.gradio.app/)——一個 Python 函式直連 web UI 的框架；A1111 將其壓榨到極致，是 Gradio 在 Stable Diffusion 圈早期爆紅的關鍵案例。
- **執行模式**：本地端 Python 啟動，預設 `127.0.0.1:7860`，支援 NVIDIA / AMD / Intel Arc / Apple Silicon / Ascend NPU。
- **功能塊**：txt2img、img2img、Inpainting、Outpainting、Colour Sketch、Hypernetwork、Textual Inversion、LoRA、Checkpoint Merger、Train、Extras（GFPGAN / CodeFormer 修臉 + RealESRGAN / ESRGAN 放大）、X/Y/Z plot 參數網格、Tiling、Highres. fix、API（FastAPI）。
- **擴充機制**：`extensions/` 目錄直接 `git clone` 第三方擴充——這是 A1111 影響力最深的設計選擇，整個 2023–2024 的 Stable Diffusion 創新（ControlNet、Regional Prompter、Adetailer、Animatediff）幾乎都以 A1111 擴充形式首發。
- **採樣器**：內建 Euler / Euler a / DPM++ 2M Karras / DDIM 等 20+ 採樣器，相容 SD 1.x / SD 2.x / SDXL；**但對 SD3、Flux、Hunyuan、SD3.5、Wan2.x 等新一代模型的官方支援基本停滯**。

## 設計哲學

README 沒有正式的 design philosophy 段，但作者在歷次 release notes 與 [Discussion #16670](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/16670) 中傳遞的核心訊息可摘出兩句：

> A web interface for Stable Diffusion, implemented using Gradio library.

> The project remains the most popular choice for most users.

翻譯／解讀：A1111 從未把自己包裝成「框架」或「平台」——它就是一個 Gradio 寫的 web UI。這份去意識形態化、不畫產品藍圖、不立 OKR 的姿態，反而讓擴充作者放心把它當基底——A1111 不會某天決定改 schema 把整個生態廢掉。代價是當底層演進（SDXL → SD3 → Flux）出現範式轉移時，這份「無哲學」設計也讓 A1111 無法快速跟上。

## 目標使用者與適用情境

適用情境：

- **入門 / 個人創作**：UI 是 tab 形式，比 [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) 的 node graph 直覺；下載 .safetensors 模型丟進 `models/Stable-diffusion/` 就能用。
- **既有 SD 1.x / SDXL 模型生態**：Civitai 上大量 checkpoint / LoRA 仍以 A1111 為發布基準。
- **生產線重度依賴 A1111 擴充**：ControlNet、Regional Prompter、Dynamic Prompts 等成熟擴充仍只在 A1111 與 Forge 上跑得穩。
- **教學 / 教材場景**：因社群文章基數巨大，學生跟著教程一步一步走，A1111 仍是最低門檻路徑（見 [stable-diffusion-art.com 教學](https://stable-diffusion-art.com/automatic1111/)）。

不適用情境：

- **要跑 Flux、SD3、Hunyuan、Wan2.x 等 2024–2026 新模型**：選 [lllyasviel/stable-diffusion-webui-forge](https://github.com/lllyasviel/stable-diffusion-webui-forge) 或 [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)。
- **追求最高吞吐 / 工作流自動化**：ComfyUI 的 node graph + 批次匯出更適合 pipeline 化。
- **要極致省 VRAM**：4 GB / 6 GB 顯卡 SDXL 推理請選 Forge。
- **追求 API 穩定度做 SaaS**：A1111 的 API 在多年累積後 surface 龐雜、無 SemVer 承諾，企業整合通常會自己 fork 或選 ComfyUI。

## 與類似專案的差異

| 對手 | 路徑 | 與 A1111 的差異 | 何時選誰 |
|---|---|---|---|
| [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | Node-graph 後端 + 前端 | 工作流以節點圖建構，可序列化、可批次自動化；新模型（SD3、Flux、Hunyuan、Wan2.x）通常**先在 ComfyUI 落地**；學習曲線陡 | 要做 pipeline / 跟新模型 / 多步驟批次 → ComfyUI；要單張快速試 prompt → A1111 |
| [lllyasviel/stable-diffusion-webui-forge](https://github.com/lllyasviel/stable-diffusion-webui-forge) | A1111 fork + 記憶體後端重寫 | 由 ControlNet 作者 [lllyasviel](https://github.com/lllyasviel) 發起，**UI 與擴充相容 A1111** 但底層換成 ComfyUI 風格的 unet patcher；省 VRAM 700 MB–1.3 GB、SDXL 速度約快 30–75%；明確支援 Flux | 想保留 A1111 UI 但要新模型與速度 → Forge；要原汁原味擴充穩定度 → A1111 |
| [vladmandic/automatic](https://github.com/vladmandic/automatic)（SD.Next） | A1111 fork，「opinionated」改寫 | 內建 Diffusers 後端、支援更多模型架構（含 video）、UI 重新整理；同樣 prompt + seed 與 A1111 不完全等價 | 要 all-in-one + 多模型多後端 → SD.Next；要與既有 A1111 教材一致 → A1111 |
| [lllyasviel/Fooocus](https://github.com/lllyasviel/Fooocus) | 重新封裝、隱藏所有參數 | 同作者另一條路線，把 90% 旋鈕收起來、預設值好到「拉到生成鍵就出圖」 | 完全不想學參數的新手 → Fooocus；要可調可擴充 → A1111 |

選型直覺：**A1111 = 教科書與既有生態；Forge = A1111 的「2024 升級版」；ComfyUI = 新模型與 pipeline 的事實標準；SD.Next = 多後端 all-in-one；Fooocus = 零參數新手機。**

## 外部評論

- [GitHub Discussion #16670「Future of Automatic1111 for 2025」](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/16670) — 社群正式提問 2025 年路線圖，討論串裡多位老用戶 (含 staff) 表示專案進入「maintenance mode」，新模型相容由 Forge 接手。
- [GitHub Discussion #16846「Why did you stop updating?」](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/16846) — 直接質疑作者是否棄坑，回覆無官方明確答覆，是「沉默放生」的典型樣本。
- [Reddit / Tech Tactician 比較文（2026）](https://techtactician.com/comfyui-vs-automatic1111-vs-fooocus-comparison/) — 三方並列比較，結論：「A1111 仍最受歡迎、但 Forge 才是『被維護的那個』」。
- [QWE AI Academy: Forge vs A1111 為何 benchmark 失真](https://www.qwe.edu.pl/tutorial/stable-diffusion-forge-vs-automatic1111-comparison/) — 中性技術評測，指出 Forge 30–75% 的速度差視 VRAM 大小而定，4 GB 卡才看得到極端差距。
- [Geeky Gadgets「Forge 比 A1111 / ComfyUI 快 75%」](https://www.geeky-gadgets.com/stable-diffusion-webui-forge/) — 偏推 Forge 的 mass-tech 媒體文，但能佐證社群普遍認知「Forge 已替代 A1111 成為效能參考點」。
- [OfflineCreator: ComfyUI vs A1111 vs Forge（2026 NSFW 視角）](https://offlinecreator.com/blog/comfyui-vs-automatic1111-vs-forge) — 從本地未審查生成需求角度比較，指出 A1111 在 NSFW 模型相容性上仍有優勢，但效能落後 Forge。
- [stable-diffusion-art.com 入門教學](https://stable-diffusion-art.com/automatic1111/) — 中文 / 英文圈最大量被引用的 A1111 教學站之一，內容仍持續更新中，但對新模型部份逐步轉向 Forge / ComfyUI 教學。
- [Voodoo Business 回顧（2025-01）](https://www.voodoo.business/blog/2025/01/23/stable-diffusion-webui-from-automatic1111/) — 個人部落格回顧 A1111 的歷史意義，定調為「Stable Diffusion 時代的標準前端」。
- [GIGAZINE 報導 NovelAI 改良技術](https://gigazine.net/gsc_news/en/20221011-novelai-model-improvements-stable-diffusion/) — 2022-10 日本科技媒體對 NovelAI 改良技術的客觀整理，是理解 A1111 為何在一週內就支援 Hypernetwork 的時間軸佐證。

## Release 狀態 / 時間軸

- **2022-08-22** — Repo 建立（與 Stable Diffusion 權重對外開放同日）。
- **2022-10 月** — NovelAI 洩漏事件、Hypernetwork 支援、AUTOMATIC1111 被 SD Discord 封禁、Emad Mostaque 公開道歉。
- **2023-07-27** — v1.5.1（標誌 SDXL 支援的關鍵版本）。
- **2023-08-31** — v1.6.0。
- **2023-12-16** — v1.7.0。
- **2024-02-06** — [lllyasviel](https://github.com/lllyasviel) 公開 [stable-diffusion-webui-forge](https://github.com/lllyasviel/stable-diffusion-webui-forge)，明確定位為「A1111 的實驗版」。
- **2024-03-02** — A1111 v1.8.0。
- **2024-04-13** — v1.9.0；**社群開始大量遷移至 Forge / ComfyUI**。
- **2024-07-27** — v1.10.0 釋出；**這也是 master 分支最後一個有實質 commit 的日子**。
- **2025-02-09** — v1.10.1 修補版（修正 CPU upscale），由 [w-e-w](https://github.com/w-e-w) 發 release，AUTOMATIC1111 本人未在 commit list 出現。
- **2026-03-02** — repo 最後一次 `pushed_at`（多為 dev 分支或 dependabot），master 主線自 2024-07 已無實質功能更新。
- **2026-05-12** — 本日以 +29 stars 的長尾餘溫旋進 GitHub Trending #10。

過去 22 個月主線只發了一個修補版（v1.10.1），且 patch 由副手 [w-e-w](https://github.com/w-e-w) 出手——**這是「事實上停止主要開發但未正式 archive」的典型訊號**，與本檔頭部圖騰級 stars 數字並存，構成本日特殊的 trending 現象。

## 授權與社群

- **授權**：[AGPL-3.0](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/LICENSE.txt)——對商用 / SaaS 部署有 copyleft 義務，這也是商業前端通常選擇自寫 UI 或 fork ComfyUI 而非直接打包 A1111 的法務原因。
- **量化指標**（2026-05-12）：162,876 stars、30,333 forks、1,182 watchers、2,485 open issues、Python 87.5%、Repo size 36.5 MB。
- **GitHub Topics**：`ai`、`ai-art`、`deep-learning`、`diffusion`、`gradio`、`image-generation`、`image2image`、`img2img`、`pytorch`、`stable-diffusion`、`text2image`、`torch`、`txt2img`、`unstable`、`upscaling`、`web`。
- **歷史貢獻者**：超過 500 位 contributors，前 5 名以外仍有 [brkirch](https://github.com/brkirch)（Apple Silicon 支援）、[C43H66N12O12S2](https://github.com/C43H66N12O12S2)（xformers 整合）、[space-nuko](https://github.com/space-nuko)、[d8ahazard](https://github.com/d8ahazard)（DreamBooth 擴充作者）等對 SD 圈有獨立影響力的開發者。
- **首日 trending 增長率**：29 / 162,876 ≈ 0.018%——**絕對值是本日榜末，但對如此巨大的 base 而言任何單日 +29 都意味殘餘流量仍存在**。
- **生態影響力**：30,333 forks 為 SD 領域 GitHub 最高紀錄之一；下游含 [vladmandic/sdnext](https://github.com/vladmandic/sdnext)、[lllyasviel/stable-diffusion-webui-forge](https://github.com/lllyasviel/stable-diffusion-webui-forge)、[anapnoe/stable-diffusion-webui-ux](https://github.com/anapnoe/stable-diffusion-webui-ux) 等超過 10 個維持活躍的 fork。

## 資料來源

- **本體**：
  - GitHub repo：<https://github.com/AUTOMATIC1111/stable-diffusion-webui>
  - Releases：<https://github.com/AUTOMATIC1111/stable-diffusion-webui/releases>
  - CHANGELOG：<https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/CHANGELOG.md>
  - Wiki：<https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki>
  - 維護者首頁：<https://github.com/AUTOMATIC1111>
- **第三方評論**：
  - [Discussion #16670 — Future of Automatic1111 for 2025](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/16670)
  - [Discussion #16846 — Why did you stop updating?](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/16846)
  - [Issue #1936 — stable-diffusion-webui is using stolen code](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/1936)
  - [stable-diffusion-art.com 入門教學](https://stable-diffusion-art.com/automatic1111/)
  - [Tech Tactician: ComfyUI vs A1111 vs Fooocus](https://techtactician.com/comfyui-vs-automatic1111-vs-fooocus-comparison/)
  - [QWE AI Academy Forge vs A1111 評測](https://www.qwe.edu.pl/tutorial/stable-diffusion-forge-vs-automatic1111-comparison/)
  - [Geeky Gadgets Forge 比較](https://www.geeky-gadgets.com/stable-diffusion-webui-forge/)
  - [OfflineCreator: ComfyUI vs A1111 vs Forge](https://offlinecreator.com/blog/comfyui-vs-automatic1111-vs-forge)
  - [Voodoo Business 回顧文](https://www.voodoo.business/blog/2025/01/23/stable-diffusion-webui-from-automatic1111/)
  - [GIGAZINE NovelAI 改良技術](https://gigazine.net/gsc_news/en/20221011-novelai-model-improvements-stable-diffusion/)
- **同類工具**：
  - [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)
  - [lllyasviel/stable-diffusion-webui-forge](https://github.com/lllyasviel/stable-diffusion-webui-forge)
  - [vladmandic/automatic](https://github.com/vladmandic/automatic)（SD.Next）
  - [lllyasviel/Fooocus](https://github.com/lllyasviel/Fooocus)
  - [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI)
  - [anapnoe/stable-diffusion-webui-ux](https://github.com/anapnoe/stable-diffusion-webui-ux)

## 更新紀錄
