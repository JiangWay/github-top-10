---
repo: pollen-robotics/microduck
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: true
latest_release: daemon-v0.17.8
tags: [硬體, 硬體裝置]
domain: 硬體
form: 硬體裝置
themes: []
---

# [pollen-robotics/microduck](https://github.com/pollen-robotics/microduck)

> 研究日期：2026-10-25
> 研究來源：https://github.com/pollen-robotics/microduck
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[pollen-robotics/microduck](https://github.com/pollen-robotics/microduck) 是 Microduck 雙足鴨型機器人的機上軟體。機器人約 25 cm、800 g、15 顆伺服馬達，跑 Rockchip RK3566，售價 399 美元；開源的是軟體，硬體設計未公開。

## 作者與起源

Pollen Robotics 是 Hugging Face 旗下的機器人公司。repo 2026-07-29 建立，[The Next Web](https://thenextweb.com/news/hugging-face-microduck-399-open-source-robot) 與 [CNX Software](https://www.cnx-software.com/2026/08/28/microduck-a-duck-like-biped-robot-designed-for-physical-ai-experimentation-and-fun/) 8 月下旬報導開放預購。commit 集中在 pierre-rouanet（975 次）與 apirrone（298 次）；apirrone 是 Antoine Pirrone，先前發起 DIY 專案 [apirrone/Open_Duck_Mini](https://github.com/apirrone/Open_Duck_Mini)。

## 核心架構 / 主要概念

- **單一 Rust workspace**，不用 ROS 等框架
- **`robotd`**：50 Hz 控制迴圈驅動馬達
- **`updaterd`**：安裝簽章版本，失敗自動回滾
- **`mediad`**：WebRTC 推相機串流
- **daemon 間通訊**：Unix socket 上的 JSON-RPC
- **RL policy**：在 [pollen-robotics/microduck_rl](https://github.com/pollen-robotics/microduck_rl) 用 MuJoCo 加 PPO 訓練，匯出 ONNX 給本 repo 載入
- **模擬**：`scripts/duck-sim` 讓真實 daemon 驅動 MuJoCo 裡的機身
- **BOM / 3D 列印檔**：本 repo 沒有
- **規格**（依 CNX Software）：1 GB RAM、32 GB eMMC

## 設計哲學

> "A Tiny biped duck robot 🦆"

repo 描述只有一句。從架構看，重點是讓買家能自己重訓行為：policy 訓練與機上執行拆成兩個 repo，用 ONNX 交接。

## 目標使用者與適用情境

- 買了成品、想自己訓練行走、撿物、跌倒爬起等 RL 行為的開發者與研究者
- 想先在 MuJoCo 模擬、再上實機的 physical AI 入門者
- **不適用**：想自己列印組裝的 DIY 玩家，應選 Open Duck Mini；需要開源硬體授權的教學場景

## 與類似專案的差異

| 對手 | 對方做法 | Microduck 的差異 |
|---|---|---|
| [apirrone/Open_Duck_Mini](https://github.com/apirrone/Open_Duck_Mini) | DIY，公開 CAD 與 BOM，自行採購組裝 | 組裝好的成品，軟體開源、硬體未開源，附 OTA 更新與回滾 |

## 外部評論

- [CNX Software](https://www.cnx-software.com/2026/08/28/microduck-a-duck-like-biped-robot-designed-for-physical-ai-experimentation-and-fun/)：列出 RK3566、1 GB RAM、32 GB eMMC 等規格
- [The Next Web](https://thenextweb.com/news/hugging-face-microduck-399-open-source-robot)：報導 399 美元售價與開源軟體
- [openelab](https://openelab.io/blogs/learn/microduck-vs-open-duck-mini)：認為 Microduck 不是 Open Duck Mini 的商用版（賣家網站文章，非官方說法）
- 未見 HN / Reddit 主串討論，資料不足

## Release 狀態 / 時間軸

- 2026-07-29 建 repo
- 2026-08 下旬開放預購
- 共 46 個 release，tag 前綴 `daemon-`，含多個 dev 預發布版
- 2026-10-19 最新正式版 [daemon-v0.17.8](https://github.com/pollen-robotics/microduck/releases/tag/daemon-v0.17.8)
- 2026-10-25 首次上 trending（+319）

## 授權與社群

- 授權：Apache-2.0（軟體）
- Stars 11,245 / Forks 1,435 / Watchers 73
- 主語言：Rust
- 擁有者：組織（Pollen Robotics，Hugging Face 旗下）
- 今日增長率 2.84%（+319 / 11,244）

## 資料來源

- **本體**：[GitHub repo](https://github.com/pollen-robotics/microduck)、[pollen-robotics/microduck_rl](https://github.com/pollen-robotics/microduck_rl)
- **第三方評論**：[CNX Software](https://www.cnx-software.com/2026/08/28/microduck-a-duck-like-biped-robot-designed-for-physical-ai-experimentation-and-fun/)、[The Next Web](https://thenextweb.com/news/hugging-face-microduck-399-open-source-robot)、[openelab](https://openelab.io/blogs/learn/microduck-vs-open-duck-mini)
- **同類工具**：[apirrone/Open_Duck_Mini](https://github.com/apirrone/Open_Duck_Mini)

## 更新紀錄
