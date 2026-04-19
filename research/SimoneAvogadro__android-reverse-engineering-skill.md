---
repo: SimoneAvogadro/android-reverse-engineering-skill
first_seen: 2026-04-18
last_updated: 2026-04-19
appearances: [2026-04-19]
growth_appearances: [2026-04-19]
has_releases: false
latest_release: null
tags: [資安, Skill 外掛]
domain: 資安
form: Skill 外掛
---

# [SimoneAvogadro/android-reverse-engineering-skill](https://github.com/SimoneAvogadro/android-reverse-engineering-skill)

## 深度研究（2026-04-18 首次）

### 專案定位
[SimoneAvogadro/android-reverse-engineering-skill](https://github.com/SimoneAvogadro/android-reverse-engineering-skill) 是一個 Claude Code Skill，用於自動化 Android APK/XAPK/JAR/AAR 的反編譯，並萃取出 app 使用的 HTTP API（Retrofit endpoint、OkHttp 呼叫、硬編碼 URL 與認證樣式），讓逆向者免讀原始碼即可產出 API 文件。

### 核心架構 / 主要概念
- 反編譯引擎：主力 jadx，輔以 Fernflower 與 Vineflower，可單跑或兩引擎交叉比對。
- 依賴檢查器：要求 Java JDK 17+ 與 jadx，輸出機器可讀格式；安裝腳本偵測 OS／套件管理器並優先嘗試非 sudo 本地安裝。
- Call flow 分析：由 Activity → ViewModel → 網路呼叫追蹤路徑，並處理 ProGuard/R8 混淆。
- 100% Shell 腳本編排，交由 Claude Code agent 解讀產物並撰寫結構化報告。

### 目標使用者
資安研究員、滲透測試人員、惡意程式分析師、需做互通性整合的工程師、CTF 玩家。

### 與類似專案的差異
相較於傳統 jadx GUI 或 [httptoolkit](https://httptoolkit.com) 的 JADX+Frida 動態流程，[SimoneAvogadro/android-reverse-engineering-skill](https://github.com/SimoneAvogadro/android-reverse-engineering-skill) 強調「LLM 驅動、可重複的 CLI 工作流」，自動產生 call graph 與 API 文件；相較於 [Sysovo/android-reverse-engineering-skill](https://github.com/Sysovo/android-reverse-engineering-skill) 等 fork 及 Apktool 系 Skill，本專案更聚焦於 HTTP API 萃取而非純資源解包。

### 外部評論
- [XDA Forums 討論串](https://xdaforums.com/t/i-built-a-claude-code-skill-to-reverse-engineer-android-apps.4777601/)：作者分享成功逆向無自動化介面 app 的 API 的案例。
- [AISecHub on X](https://x.com/AISecHub/status/2031317164540473681)
- [Zane St. John 部落格](https://zanestjohn.com/blog/reing-with-claude-code)：以近似手法處理 Android malware。
- Facebook 資安社群與 mcpmarket 皆有轉貼推薦。未檢索到 HN/Reddit 深度討論串，屬於社群短評層級。

### Release 狀態
GitHub Releases API 回傳空陣列，尚無正式 tag；最後 push 於 2026-03-02，更新於 2026-04-17，以 master 分支滾動發布。

### 授權與社群
Apache-2.0；建立於 2026-02-02，目前約 2,649 stars、277 forks、3 open issues、2 open PRs，成長迅速但貢獻者集中於作者本人。README 附合法使用免責聲明。

## 更新紀錄

### 2026-04-19
- 今日**首次**正式進入絕對榜 #9（3,048 stars，+408）、增長率榜 #4（13.39%）。研究檔早於 2026-04-18 建立但當日未擠進 top 10，今日補齊首度上榜紀錄。無 GitHub Release（`has_releases: false`）。
