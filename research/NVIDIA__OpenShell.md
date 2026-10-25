---
repo: NVIDIA/OpenShell
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: true
latest_release: v0.1.5
tags: [LLM 基礎建設, 框架, 自架, 企業級]
domain: LLM 基礎建設
form: 框架
themes: [自架, 企業級]
---

# [NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell)

> 研究日期：2026-10-25
> 研究來源：https://github.com/NVIDIA/OpenShell
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell) 是 NVIDIA 開源、Rust 寫的 agent sandbox runtime：每個 agent 跑在獨立 sandbox，對外連線一律過 policy 檢查，agent 拿不到原始憑證。

## 作者與起源

NVIDIA 組織 2026-02 建 repo，GTC 2026（3 月）以 alpha 版 v0.0.8 首次公開，2026-09-25 從 0.0.x 跳到 v0.1.0。[AndroidHeadlines 9 月報導](https://www.androidheadlines.com/2026/09/nvidias-new-openshell-security-platform-aims-to-prevent-rogue-ai-attacks.html) 把它歸在 NVIDIA Open Agent Safety Platform 之下。

## 核心架構 / 主要概念

- **三層**：gateway（控制平面加憑證代理，只轉送到已核可 endpoint）、supervisor、sandbox（一個 agent 一座）
- **policy**：YAML 宣告，附 advisor 與 prover（形式驗證）；高風險權限變更要人工審核才放行
- **隔離**：README 說會 instrument kernel 做 syscall 與檔案隔離，但沒寫底層用哪種技術，資料不足
- **部署**：K8s Helm chart（CNI 須支援 NetworkPolicy）、Linux、macOS Apple Silicon、Windows WSL2
- **SDK**：Python、TypeScript、Go、Rust

## 設計哲學

> "OpenShell is the safe, private runtime for autonomous AI agents."

「private」指的是憑證不進 agent 程序：agent 發出請求，由 gateway 代為加上憑證。這和把 API key 直接塞進環境變數的常見做法相反。

## 目標使用者與適用情境

- 要在自家機房或 K8s 上跑多個 autonomous agent 的平台團隊
- 需要稽核 agent 對外連線紀錄的企業
- **不適用**：個人開發者在筆電上跑單一 coding agent，部署成本高於收益；需要 Windows 原生（非 WSL2）環境者

## 與類似專案的差異

| 對手 | 對方做法 | OpenShell 的差異 |
|---|---|---|
| [e2b-dev/E2B](https://github.com/e2b-dev/E2B) | 雲端 sandbox SaaS，以 API 開關 microVM | 可完整自架，內建 policy engine 與憑證代理 |
| [firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker) | 純 microVM 隔離層 | 多了網路 policy、形式驗證與人工審核流程 |

## 外部評論

- [Brenner/Axiom 研究頁](https://brenner-axiom.codeberg.page/research/nvidia-openshell-2026-03-17)：分析 GTC alpha 版，policy engine 位於 agent 程序外，評為「必要但不足」，仍需額外 hardening
- [AndroidHeadlines](https://www.androidheadlines.com/2026/09/nvidias-new-openshell-security-platform-aims-to-prevent-rogue-ai-attacks.html)：定位為防止 agent 越權存取的安全平台
- 未見 HN / Reddit 主串討論，資料不足

## Release 狀態 / 時間軸

- 2026-02 建 repo
- 2026-03-17 GTC alpha v0.0.8
- 2026-08 v0.0.100 系列
- 2026-09-25 v0.1.0
- 2026-10-20 v0.1.5（最新），每月 2–4 版

## 授權與社群

- 授權：Apache-2.0
- Stars 19,707 / Forks 1,949 / Subscribers 72
- 主語言：Rust
- 擁有者：組織（NVIDIA）
- 今日增長率 4.55%（+896 / 19,707）

## 資料來源

- **本體**：[GitHub repo](https://github.com/NVIDIA/OpenShell)、[Releases](https://github.com/NVIDIA/OpenShell/releases)
- **第三方評論**：[Brenner/Axiom](https://brenner-axiom.codeberg.page/research/nvidia-openshell-2026-03-17)、[AndroidHeadlines](https://www.androidheadlines.com/2026/09/nvidias-new-openshell-security-platform-aims-to-prevent-rogue-ai-attacks.html)
- **同類工具**：[e2b-dev/E2B](https://github.com/e2b-dev/E2B)、[firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker)

## 更新紀錄
