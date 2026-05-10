---
repo: playcanvas/supersplat
first_seen: 2026-05-10
last_updated: 2026-05-11
appearances: [2026-05-10, 2026-05-11]
growth_appearances: [2026-05-10, 2026-05-11]
has_releases: true
latest_release: v2.25.1
tags: [語音與多媒體, 應用程式, 開源替代]
domain: 語音與多媒體
form: 應用程式
themes: [開源替代]
---

# [playcanvas/supersplat](https://github.com/playcanvas/supersplat) — 深度研究

## 深度研究（2026-05-10 首次）

### 專案定位
[playcanvas/supersplat](https://github.com/playcanvas/supersplat) 是一款由 PlayCanvas 團隊開源的 **3D Gaussian Splat Editor**，定位為瀏覽器原生、免安裝的「Splat 後製工作站」：把神經輻射場新興格式（3DGS）從只能「看」推進到能「編輯、清理、最佳化、發布」的工作流。Live 版位於 `superspl.at/editor`，6,166 stars、721 forks，TypeScript 92.3%。

### 核心架構 / 主要概念
構築於 PlayCanvas WebGL/WebGPU 引擎之上，UI 以 PCUI 元件庫實作，全程在瀏覽器執行。核心模組：
- **splat 載入 / 解析**（PLY、SOG、`.splat`）
- **選取與遮罩工具**
- **變換**（旋轉 / 縮放 / 置中 / 對齊軸向）
- **色彩 / 亮度 / 飽和度調整**
- **後製管線**：bloom、sharpen、vignette、color grading
- **相機動畫與 fly-through**，最多 25 個註記 / hotspot 製作導覽
- **AR/VR 支援** 透過 WebXR
- **壓縮 PLY 匯出**可縮減檔案 70–90%

### 目標使用者
3DGS 從業者：[nerfstudio-project/nerfstudio](https://github.com/nerfstudio-project/nerfstudio) / Luma AI / Polycam / Postshot / Instant-NGP 用戶輸出 splat 後需做清理、裁切、合併、發布的攝影測量師、VFX 美術、文資掃描團隊、XR 體驗開發者。對學界，也是 3DGS 論文示範頁與 demo 的常見後製管道。

### 與類似專案的差異
與訓練端的 [graphdeco-inria/gaussian-splatting](https://github.com/graphdeco-inria/gaussian-splatting)（產出原始 splat）互補；相對於 [antimatter15/splat](https://github.com/antimatter15/splat)、[mkkellogg/GaussianSplats3D](https://github.com/mkkellogg/GaussianSplats3D) 偏 viewer / runtime，SuperSplat 是少數成熟的「編輯器」端、且把 hotspot、相機動畫、WebXR 發布做進同一介面，免安裝、跨平台。

### 外部評論
- 開源發布即攻上 Hacker News，社群肯定其「3DGS 缺的那塊編輯器」定位 [(來源)](https://news.ycombinator.com/item?id=42060856)
- THE FUTURE 3D 評測認為 SuperSplat 已從 viewer 演進為「production-ready Studio」，亮點為 hotspot 導覽與 post-processing 管線 [(來源)](https://www.thefuture3d.com/software/supersplat/)
- Radiance Fields 社群推為 3DGS 入門編輯首選教學工具 [(來源)](https://radiancefields.com/gaussian-splatting-editing-tutorial-with-supersplat)

### Release 狀態
- 最新版本：v2.25.1（2026-05-08）
- 主要特性：splat orientation 統一由 `DataTable.transform` 驅動、依賴更新；維護極活躍，144 個 release，由主要貢獻者 [@slimbuck](https://github.com/slimbuck) 推動，版本節奏顯示專案處於穩定迭代期。

### 授權與社群
- 授權：MIT License
- 維護方：PlayCanvas（官方組織）
- Stars：6,166｜Forks：721
- 主要貢獻者：[@slimbuck](https://github.com/slimbuck)（449 commits，核心開發者）、[@willeastcott](https://github.com/willeastcott)（PlayCanvas CEO，77 commits）、[@simonbethke](https://github.com/simonbethke)、[@kpal81xd](https://github.com/kpal81xd)
- 社群有 GitHub Discussions、147 個 open issues，並提供多語系 i18n 與 PlayCanvas 官方 user manual 文件支援

## 更新紀錄
