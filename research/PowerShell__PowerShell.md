---
repo: PowerShell/PowerShell
first_seen: 2026-04-24
last_updated: 2026-04-24
appearances: [2026-04-24]
growth_appearances: [2026-04-24]
has_releases: true
latest_release: v7.6.1
tags: [開發者工具, 應用程式, 開源替代]
domain: 開發者工具
form: 應用程式
themes: [開源替代]
---

# PowerShell/PowerShell 深度研究

> 來源：[PowerShell/PowerShell](https://github.com/PowerShell/PowerShell)

## 深度研究（2026-04-24 首次）

### 專案定位

[PowerShell/PowerShell](https://github.com/PowerShell/PowerShell) 是 Microsoft 官方維護的跨平台（Windows / Linux / macOS）自動化 shell 與腳本語言 runtime，slogan 是「PowerShell for every system!」。專案 2016 年 1 月從封閉的 Windows PowerShell 拆出，以 MIT 授權開源，至 2026-04-24 累積 52,731 stars、8,274 forks，由 Microsoft 內部團隊主導開發、社群以 RFC 流程參與。本次是我們追蹤以來首次進榜：絕對榜 #9、+76 stars／日，來自 2026-04-21 剛發布的 [v7.6.1](https://github.com/PowerShell/PowerShell/releases/tag/v7.6.1) 維護版，以及 3 月 LTS 正式 GA 後的後續漣漪。

### 核心架構 / 主要概念

- **物件管線（object pipeline）**：不同於 bash/zsh 以純文字串接 stdin/stdout，PowerShell cmdlet 在管線中傳遞 .NET 物件，下游可直接 `.Property` 取值，結構化資料（JSON / CSV / XML / REST）處理特別吃香——正如 [TechTarget 比較](https://www.techtarget.com/searchitoperations/tip/On-Windows-PowerShell-vs-Bash-comparison-gets-interesting) 所點出，「PowerShell pipes objects, and Bash pipes strings」是最本質差異。
- **.NET 10 runtime**：v7.6 LTS 系列建構於 .NET 10，v7.6.1 使用 .NET SDK 10.0.202、.NET 10.0.6 runtime，語言版本追隨 C# / F# 生態。
- **Cmdlet + 模組生態**：`Get-ChildItem`、`Invoke-RestMethod` 等動詞-名詞命名 cmdlet，搭配 PSReadLine（互動 shell）、PSResourceGet（模組包管理）、PowerShellGet 模組庫，可延伸 AWS / Azure / VMware / Active Directory 等雲端與企業平台管理。
- **跨平台構件**：同一 repo 產出 Windows MSI/MSIX、Microsoft Store、macOS LTS pkg（v7.6 起 LTS 獨立打包）、Linux deb/rpm/snap，單一 `pwsh` 二進位在三平台語意一致。

### 目標使用者

1. **Windows / 混合雲維運工程師**：有大量 Active Directory、Exchange、Azure 自動化腳本庫，PowerShell 是非用不可的黏合劑。
2. **跨平台 DevOps / SRE**：寫 CI 腳本時不想在 bash 的字串 parsing 地獄打轉，偏愛結構化資料語意；[XDA 評論](https://www.xda-developers.com/powershell-better-than-linux-users-admit/) 指出即使 Linux 使用者不愛承認，PowerShell 在處理 JSON/REST 回應時「scripts 比等價 Bash 短很多，且數月後重讀仍讀得懂」。
3. **.NET 開發者**：把 C# 類別、LINQ 思維帶進命令列的自然選擇。
4. **企業 IT 治理**：LTS 版本搭配 Microsoft Support Lifecycle，適合寫進採購合約與合規文件。

### 與類似專案的差異

- **vs bash / zsh**：物件管線、內建結構化資料 cmdlet、跨平台語意一致；但啟動時間、腳本可攜性（每台 Unix 都有 bash）、Unix 工具整合仍遜於 bash。[CBT Nuggets 比較](https://www.cbtnuggets.com/blog/certifications/microsoft/powershell-vs-bash-whats-the-difference) 建議「簡單腳本用 bash，複雜企業自動化用 PowerShell」。
- **vs fish / nushell**：[nushell](https://github.com/nushell/nushell) 同樣強調結構化管線，且輕量、Rust 實作，但生態、企業支援、既有 cmdlet 數量完全不是同量級；PowerShell 的護城河是 Microsoft 生態與 LTS 承諾。
- **vs Windows PowerShell 5.1（舊閉源版）**：同名但不同 repo——舊版只跑在 Windows、基於 .NET Framework、已停止新功能開發；本 repo 的 PowerShell 7.x（前稱 PowerShell Core）才是現役產品線。
- **vs 自家衍生工具**：DSC v3（Desired State Configuration）走獨立 repo，僅與 PowerShell 協作；PowerShell Universal 屬第三方商業產品。

### 外部評論

- [Announcing PowerShell 7.6 (LTS) GA Release — PowerShell Team devblog](https://devblogs.microsoft.com/powershell/announcing-powershell-7-6/)：官方於 2026-03-17 宣告 7.6 LTS GA，定位「reliability improvements across the engine, modules, and interactive shell experience」，確立企業採用基準。
- [PowerShell v7.6 LTS Release and why it matters — powershellisfun.com](https://powershellisfun.com/2026/03/20/powershell-v7-6-lts-release-and-why-it-matters/)：社群部落格強調 LTS 身分對寫進維運合約的意義，點名 PSReadLine、PSResourceGet、tab completion 為日常最有感升級。
- [PowerShell 7.6: new features, install, and upgrade — 4sysops](https://4sysops.com/archives/powershell-76-new-features-install-and-upgrade/)：整理安裝矩陣與 breaking changes，指出 `Register-ArgumentCompleter -NativeFallback` 是 native 命令補全長期痛點的修補。
- [PowerShell v7.6.1 has been released — Icewolf Blog](https://blog.icewolf.ch/archive/2026/04/21/powershell-v7-6-1-has-been-released/)：第一手發布當日紀錄，確認本波 trending 的時間點與 GitHub Release 時間吻合。
- [PowerShell is genuinely good now, and most Linux users won't admit it — XDA](https://www.xda-developers.com/powershell-better-than-linux-users-admit/)：非微軟陣營的主流科技媒體觀察，成為本次 trending 回聲的情緒來源之一。

### Release 狀態

- **最新版本**：[v7.6.1](https://github.com/PowerShell/PowerShell/releases/tag/v7.6.1)，2026-04-21 發布，屬 LTS 分支的首個 servicing update。
- **關鍵內容**（依 [v7.6.1 release notes](https://github.com/PowerShell/PowerShell/releases/tag/v7.6.1)）：修掉 `ConvertFrom-Json` 在 array literal 內註解誤判、`-Debug` 誤觸 `ShouldProcess` prompt、`Write-Host` 未尊重 `OutputRendering = PlainText`、多執行緒寫 progress record 的 NullReferenceException；預設 feedback provider timeout 由 300ms 調至 1000ms；`[bigint]` cast 支援千分位分隔符；RHEL10 package repo URL 修正；GitHub Actions token/tag pinning 強化；Microsoft Store 管線重整以區分 LTS 與一般版。
- **節奏**：repo 共 199 個 release，採 6 週 preview + LTS 分流；下一個重點是 7.7 preview 系列。

### 授權與社群

- **授權**：[MIT License](https://github.com/PowerShell/PowerShell/blob/master/LICENSE.txt)，商業使用完全自由。
- **治理**：Microsoft 主導，設有 PowerShell Committee（外部成員可參與）、RFC 流程 [PowerShell/PowerShell-RFC](https://github.com/PowerShell/PowerShell-RFC) 處理語言與引擎級變更；Code of Conduct、Security Policy 齊備。
- **社群規模**：52,731 stars、8,274 forks、1,437 watchers、1,471 open issues（大型歷史 repo 常態）；Discord / IRC / Slack 官方頻道，另有 PowerShell Community Blog、Microsoft Learn 文件線。
- **主要貢獻者**：Microsoft PowerShell team（Steve Lee、Jason Helmick 等公開露面），v7.6.1 由 `jshigetomi` 出版。外部貢獻以 bug fix、文件、模組 RFC 為主，核心引擎仍由 MSFT 內部主導。

---

本專案首見於 2026-04-24，本檔建立於 v7.6.1 發布後三日，承接 LTS GA 聲量尾波進榜。之後若再次上榜，依 CLAUDE.md 契約 append「## 更新紀錄」並同步 `appearances` / `growth_appearances` / `last_updated`。
