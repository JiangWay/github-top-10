---
repo: ruvnet/RuView
first_seen: 2026-04-20
last_updated: 2026-04-24
appearances: [2026-04-20, 2026-04-21, 2026-04-22, 2026-04-23, 2026-04-24]
growth_appearances: [2026-04-20, 2026-04-21, 2026-04-22, 2026-04-23, 2026-04-24]
has_releases: true
latest_release: v0.6.2-esp32
tags: [硬體, 框架, 自架, 資料主權]
domain: 硬體
form: 框架
themes: [自架, 資料主權]
---

# [ruvnet/RuView](https://github.com/ruvnet/RuView)

> 研究日期：2026-04-20
> 研究來源：<https://github.com/ruvnet/RuView>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[ruvnet/RuView](https://github.com/ruvnet/RuView) 是一套把 $9 級的 ESP32-S3 變成「WiFi 人體姿態感測器」的開源韌體與 Rust 推論框架，宣稱不用相機、不連雲，只靠 Channel State Information（CSI）推出 17 點骨架、呼吸與心率——**是否真能跑起來，外部社群仍在爭論中**（見「外部評論」段）。

## 作者與起源

作者 [ruvnet](https://github.com/ruvnet)（本名 rUv，GitHub followers 6,765、public repos 169）是多產但以「AI 超載式包裝」聞名的個人開發者，自介 `Unicorn Breeder`，個人站點 [Cognitum.One](https://Cognitum.One)。RuView 於 2025-06-07 建倉，到 2026-04-20 累積 47,387 stars、6,383 forks，contributor 列表僅 10 人、其中第一名是 `ruvnet` 本人（304 次 commit），第二名是帳號 `claude`（67 次 commit，暗示大量 AI 輔助生成）。專案前身為 [ruvnet/wifi-densepose](https://github.com/ruvnet/wifi-densepose)，RuView 是重寫為 Rust 的 v2 版本。

## 核心架構 / 主要概念

訊號鏈由 ESP32-S3 擷取 56–192 子載波、20–28 Hz 的 CSI，經 SpotFi 相位修正、Hampel 離群值濾波、Fresnel zone 建模後，送進 Rust 寫的 transformer + GNN + spiking NN 推論骨幹，最終輸出 17 點 COCO keypoints 與 DensePose UV 座標。核心術語有：

- **多站式感測**（multistatic）：3–6 顆 ESP32 形成 N×(N-1) 測量連結
- **RVF 容器**：自包裝模型檔，含 Ed25519 簽章與漸進三層載入
- **SONA**：裝置端 micro-LoRA + Elastic Weight Consolidation 的持續學習
- **RuVector**：11 個自家 Rust crate，提供 attention、min-cut、稀疏求解、GNN

Rust 佔 5.3 MB、Python 1.8 MB、C 322 KB，語言分布與「v2 Rust 810× 快於 Python v1」的宣稱一致。

## 設計哲學

README 開宗明義：

> "Built on RuVector and Cognitum Seed, RuView runs entirely on edge hardware — an ESP32 mesh (as low as $9 per node) paired with a Cognitum Seed for persistent memory, cryptographic attestation, and AI integration. **No cloud, no cameras, no internet required.**"

核心主張是「把每一顆已在牆上運作的 WiFi 路由器當成免費的感測基礎建設」，並以邊緣運算換取隱私——不存影像、資料不離局域網。這與作者旗下 [Cognitum.One](https://Cognitum.One) 的「自主 AI 硬體」敘事一脈相承。

## 目標使用者與適用情境

- **醫療照護**：長照、睡眠診所想要避開 GDPR/HIPAA 影像限制的呼吸 / 心率監測
- **零售與空間管理**：排隊長度、停留熱圖、無相機的佔用率感測
- **急難搜救**：瓦礫堆後方人員偵測、WiFi-Mat 傷患分級
- **智慧建築 / 安防**：穿牆周界偵測、HVAC 佔用觸發

**不適用**：即裝即用情境——CNX Software 明確指出 pose estimation「需要使用者為自己的環境訓練模型才能運作」，不是 plug-and-play。

## 與類似專案的差異

WiFi 感測學術社群既有成果主要是 CMU 2022 的 DensePose From WiFi 論文，但**幾乎沒有一個消費級開源實作**。RuView 實質上是把論文概念+作者自寫 Rust 骨幹打包成韌體套件。

| 對手 | RuView 的差異 |
|---|---|
| CMU DensePose From WiFi（論文 / Intel 5300 NIC）| RuView 用 $9 ESP32-S3 取代 $50–100 NIC，並封裝成可燒錄韌體；但作者社群質疑端到端效能尚未被獨立複現 |
| [ruvnet/wifi-densepose](https://github.com/ruvnet/wifi-densepose)（同作者 v1 Python 版）| v2 改寫為 Rust，宣稱 810× 加速並加入 SONA 裝置端持續學習、RVF 簽章容器 |

**什麼時候選誰**：想做嚴謹 WiFi 感測研究 → 仍應以學術資料集 + Intel 5300 為主；想玩一個低成本 ESP32 感測 demo → RuView 可用，但準備好自己訓練模型並承擔社群仍在爭論的可信度風險。

## 外部評論

- **[Hacker News 討論 item=47230714](https://news.ycombinator.com/item?id=47230714)**：最高票留言（`bluewave41`）直指「It's 100% AI generated slop and is non functional. Zero people can verify it works」，並舉出 codebase 中以 `np.random.rand()` 生成 CSI 的片段。
- **[Cybernews: Viral GitHub project claims WiFi can "see through walls"](https://cybernews.com/security/viral-github-project-wifi-see-through-walls/)**：以「viral」定調，強調程式碼中被發現隨機生成資料的爭議。
- **[CNX Software（2026-03-26）評論](https://www.cnx-software.com/2026/03/26/ruview-project-leverages-esp32-nodes-for-presence-detection-pose-estimation-and-breathing-heart-rate-monitoring/)**：立場中性偏保留——肯定「背後科學是真的」與 repo 活躍度，但直言「I can't find any video demos of RuView on YouTube, only people *talking* about it」，並提醒「some of the claims are over the top or only valid in some specific conditions」。
- **[Pebblous 技術部落格](https://blog.pebblous.ai/project/WiFiDensePose/wifi-densepose-ruview/en/)**：較為正面的整理型介紹，著重科普原理。
- **[Peanut Politician: Your Walls Are No Longer Walls](https://www.peanutpolitician.com/p/your-walls-are-no-longer-walls)**：非技術觀點評論，討論隱私與民用監控的社會後果。
- **作者公開反駁**：[Issue #37「No, this is not fake. Yes, it actually works.」](https://github.com/ruvnet/wifi-densepose/issues/37) 中 ruvnet 回擊 mock data 指控，主張 WiFi CSI sensing 已是十餘年同儕審查研究。

## Release 狀態 / 時間軸

- 2025-06-07：repo 建立
- 2026-04-02：`v0.5.4-esp32`（Cognitum Seed 整合）
- 2026-04-03：`v0.6.0-esp32`（HuggingFace 預訓練模型 + 17 個感測 app）
- 2026-04-06：`v0.7.0`（WiFlow 相機監督姿態模型，宣稱 92.9% PCK@20）
- 2026-04-16：`v0.6.1-esp32`（最新，node_id 防禦性修復）

發版密集度高（兩週內 5 版），但版號不是單調遞增（v0.7.0 之後再出 v0.6.1-esp32），顯示韌體與主套件版本鏈分離、治理仍略混亂。

## 授權與社群

- License：MIT
- Stars：47,387 / Forks：6,383 / Watchers：293 / Open issues：64
- Topics：`agentic-ai`, `densepose`, `esp32`, `firmware`, `mcu`, `mincut`, `monitoring`, `pose-estimation`, `rf`, `self`, `self-learning`, `wifi`, `wifi-hacking`, `wifi-security`
- 語言比例：Rust 54% / JS 18% / Python 18% / TypeScript 5% / Shell 3% / C 3%
- 增長速率：stars_today=118、growth_rate 0.25%（2026-04-20），能以 47k 量級仍上 GitHub Trending，顯示爭議話題本身帶熱度
- Contributor 高度集中：top 1 ruvnet 304 commit、top 2 帳號 `claude` 67 commit，其餘多為 1–6 次；實質上是個人專案 + AI 輔助

## 資料來源

**本體**
- [ruvnet/RuView GitHub](https://github.com/ruvnet/RuView)
- [RuView Observatory（官方 demo site）](https://ruvnet.github.io/RuView/)
- [ruvnet/wifi-densepose（前身 v1）](https://github.com/ruvnet/wifi-densepose)
- [Cognitum.One](https://Cognitum.One)

**第三方評論**
- [Hacker News item=47230714](https://news.ycombinator.com/item?id=47230714)
- [Cybernews 報導](https://cybernews.com/security/viral-github-project-wifi-see-through-walls/)
- [CNX Software 評論](https://www.cnx-software.com/2026/03/26/ruview-project-leverages-esp32-nodes-for-presence-detection-pose-estimation-and-breathing-heart-rate-monitoring/)
- [Pebblous 部落格](https://blog.pebblous.ai/project/WiFiDensePose/wifi-densepose-ruview/en/)
- [Peanut Politician](https://www.peanutpolitician.com/p/your-walls-are-no-longer-walls)

**同類工具 / 延伸**
- CMU 2022 論文：DensePose From WiFi（學術）
- Intel 5300 NIC / Atheros AR9580：研究級 CSI 擷取硬體

## 更新紀錄

### 2026-04-21
- 再次登榜（絕對榜 #2，stars_today +716；增長率榜 #7，+1.49%）
- 新版本：[v0.6.2-esp32 — ADR-081 Adaptive CSI Mesh Kernel + Timer Svc stack fix](https://github.com/ruvnet/RuView/releases/tag/v0.6.2-esp32)（2026-04-20 發布）
- 主要變更：Adaptive CSI Mesh Kernel（自適應子空間分群的多節點 CSI 融合）新增 ADR-081 治理紀錄；修掉 FreeRTOS timer service 任務堆疊溢位 bug（影響 30s+ 連續擷取）。Mesh 路徑延遲再降、多節點場景穩定性提升

### 2026-04-22
- **連續第 3 天上榜**（絕對榜 #4，stars_today +828，growth_rate 1.70%；增長率榜 #4）
- 無新 release（最新仍為 [v0.6.2-esp32](https://github.com/ruvnet/RuView/releases/tag/v0.6.2-esp32)，發佈於 2026-04-20）
- 觀察：stars 累計 48,798（3 日 +1,662），stars_today 從 716 再升至 828——**無新 release 仍加速**，顯示 v0.6.2-esp32 的 Adaptive CSI Mesh 與 WiFi 看穿牆壁話題仍在外部媒體擴散

### 2026-04-23
- **連續第 4 天雙榜**（絕對榜 #7，stars_today +551，growth_rate 1.12%；增長率榜 #6）
- 無新 release（最新仍為 [v0.6.2-esp32](https://github.com/ruvnet/RuView/releases/tag/v0.6.2-esp32)）
- 觀察：stars 累計 49,301（4 日共 +2,165），stars_today 從 828 回落至 551——絕對增量首次日對日遞減，但仍維持 500+ 量級；名次滑至 #7 是因今日榜單多檔首次上榜（langfuse、shannon、OpenMetadata、hackingtool）擠壓空間而非熱度消退

### 2026-04-24
- **連續第 5 天雙榜**（絕對榜 #5，stars_today +427，growth_rate 0.86%；增長率榜 #7）
- 無新 release（最新仍為 [v0.6.2-esp32](https://github.com/ruvnet/RuView/releases/tag/v0.6.2-esp32)，發佈於 2026-04-16）
- 觀察：stars 累計 49,719（5 日共 +2,583），stars_today 從 551 再降至 427，**連續第二日遞減**；WiFi CSI 穿牆敘事動能正式進入衰退期，但能維持 5 天連榜已追平並刷新本站上線以來最長連榜紀錄（此前與 [Fincept-Corporation/FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal)、[thunderbird/thunderbolt](https://github.com/thunderbird/thunderbolt) 並列 4 天）
