---
repo: Mebus/cupp
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: false
latest_release: null
tags: [資安, 應用程式]
domain: 資安
form: 應用程式
themes: []
---

# [Mebus/cupp](https://github.com/Mebus/cupp)

> 研究日期：2026-06-30
> 研究來源：<https://github.com/Mebus/cupp>
> 觸發原因：首次上絕對榜（#7，stars_today +18）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

CUPP（Common User Passwords Profiler）是一支用 Python 寫的**社交工程字典生成器**：給它目標的名字、生日、寵物、配偶、公司等個人線索，吐出一份依命名習慣排列組合過的密碼候選清單，作為後續 brute-force / dictionary attack（搭配 Hashcat、John the Ripper、Hydra）的攻擊前置。**進攻方工具**，明確標示僅供合法滲透測試與鑑識使用。

## 作者與起源

CUPP 是長青老專案。GitHub repo [Mebus/cupp](https://github.com/Mebus/cupp) 建立於 **2012-05-06**，今年已邁入第 14 年；原始作者為 remote-exploit.org 社群的 **Muris Kurgas（j0rgan）**，GitHub user [Mebus](https://github.com/Mebus)（user id 271557）把專案從 remote-exploit.org 搬上 GitHub 並接手主要維護迄今。Mebus 為 Kali / 滲透測試圈內常見的工具作者，CUPP 自 2010 年代初期起就被收進 [Kali Linux 官方套件庫](https://en.kali.tools/?p=1305)、Debian sid、Ubuntu Noble / Jammy / Questing 主源，成為「打開 Kali → 就在那裡」的入門等級字典工具。最近一次 commit 是 **2025-12-26**，當日從 v3.3.0 直接 bump 到 v3.3.1，並 merge 了多年前 backlog 中的 PR #76 與 PR #115——這意味專案還活著、但維護節奏以年計而非以週計。

## 核心架構 / 主要概念

CUPP 本體是**單檔 Python 3 腳本** [`cupp.py`](https://github.com/Mebus/cupp/blob/master/cupp.py)，搭配一份 INI 風格的 `cupp.cfg` 控制排列規則。沒有外部依賴、不需 `pip install`，下載即跑。

五個主要模式（Ubuntu manpage 與 README 對齊）：

| Flag | 模式 | 行為 |
|---|---|---|
| `-i` | Interactive | 連續問 14+ 個問題（First/Last/Nickname/DOB、配偶資料、子女資料、寵物、公司、加號詞、特殊字元、數字、Leet 開關）→ 排列組合輸出 `<name>.txt` |
| `-w` | Improve | 讀既有字典做進階變形（加數字 / 特殊字元 / Leet） |
| `-l` | Download | 從遠端 repo 拉一份預製大型 wordlist（CUPP 內建的下載清單） |
| `-a` | Alecto | 解析 Alecto DB（Phenoelit + CIRT 合併的預設帳密表）匯出純帳密 |
| `-q` | Quiet | 不顯示 banner |

`cupp.cfg` 可調整：年份範圍（從幾歲到現在）、最短 / 最長密碼長度、Leet 對應表（a→4、e→3、i→1、o→0、s→5）、特殊字元集、是否加入隨機數字後綴。實作上是**字串排列 + filter** 的暴力組合，沒有 ML、沒有 statistical model；輸出規模常一份個人檔案 → 幾萬到幾十萬條候選密碼。

## 設計哲學

CUPP 的設計信念寫在 README 開頭，是整個社交工程字典類工具的方法論起點：

> "People spend a lot of time on the Internet, completing surveys and forms. People share more and more about themselves. The result? Most passwords are weak. They are simple and consist of birthday, nickname, address, name of a pet or relative, or a common word such as God, love, money or password."

> "This is why CUPP was born, and it can be used in situations like legal penetration tests or forensic crime investigations."

翻譯與解讀：**密碼的弱點不在熵，而在認知慣性**——人會用自己記得住的東西當密碼。CUPP 不嘗試破解 hash、不存放預製字典，它只做一件事：把社交工程蒐集到的個人資訊，按人類命名習慣機械化擴展成密碼候選空間。這個哲學在 2012 年就成立，到 2026 年依然成立——這也是它為什麼能在 14 年後還活在 trending 邊緣。

## 目標使用者與適用情境

**適用**：

- 已取得授權的滲透測試（紅隊在 OSINT 階段拿到目標個資後，用 CUPP 產生客製字典丟給 Hashcat）
- CTF 與資安教學示範（教學「為什麼用生日當密碼很糟」最直觀的工具）
- 鑑識調查（取證人員拿到被害者 / 嫌疑人的個資後，嘗試解鎖加密容器）
- Bug Bounty 偵察階段補強通用 wordlist

**不適用**：

- 雲端帳號爆破（多數 SaaS 有 rate limit + MFA，字典再準也打不穿）
- 對抗強密碼策略（已被 password manager 隨機生成的密碼免疫）
- 大量目標的自動化作業（CUPP 是 interactive 工具，沒有批次 API）
- **任何未授權場景**——README 與 manpage 都明寫只能用於合法情境，個人爆前任 / 駭朋友帳號屬刑責範圍

## 與類似專案的差異

| 對手 | 類型 | 與 CUPP 的差異 | 什麼時候選誰 |
|---|---|---|---|
| [Mentalist GUI](https://github.com/sc0tfree/mentalist)（sc0tfree） | GUI 視覺化字典生成器 | Mentalist 用節點圖編排規則、輸出可給 Hashcat 直接 import；CUPP 是 CLI 互動式問答 | 要視覺化 mutation chain → Mentalist；要快速從 OSINT 摘要拉一份字典 → CUPP |
| [digininja/CeWL](https://github.com/digininja/CeWL) | Web 爬蟲式字典生成器 | CeWL 從**目標網站 HTML** 抓詞彙；CUPP 從**目標個人資料**問答抓詞彙 | 攻 corporate intranet / 部落格 → CeWL；攻個人帳號 → CUPP |
| [hashcat/hashcat](https://github.com/hashcat/hashcat) + rule files | GPU 破解器自帶 rule-based mutation | Hashcat rule（best64、d3ad0ne、OneRuleToRuleThemAll）是對**已有字典**做變形；CUPP 是**從零生成**新字典 | 已有大字典要擴展 → Hashcat rule；只有目標個資、還沒字典 → CUPP |
| [john the ripper](https://github.com/openwall/john) 內建 wordlist + rules | 同上 | John 自帶的字典是通用 top-N、不針對個人 | 通用爆破 → John；針對性爆破 → CUPP 先生 → 餵給 John |
| [Mebus/cupp-ng](https://github.com/Mebus/cupp-ng) | 傳聞中的 C 重寫版 | **不存在**——`gh api` 與 web search 均查無此 repo，僅是社群誤傳 | — |
| [BEWGor](https://github.com/tweksteen/BEWGor) | Cupp 的 Bash 重寫 + 擴充 | 支援任意數量家人 / 寵物，資訊欄位密度更高 | 目標家族關係複雜 → BEWGor；標準三人小家庭目標 → CUPP |

**選型總結**：CUPP 在「OSINT → 字典」這條路上是**最低門檻的起點工具**，不是天花板。實戰上的常見管線是 `CUPP 生候選 → Hashcat 用 best64 rule 再變形 → 丟去打 hash`。

## 外部評論

- [HackingArticles — Comprehensive Guide on Cupp](https://www.hackingarticles.in/comprehensive-guide-on-cupp-a-wordlist-generating-tool/)：印度資安教學圈的標準入門教學，逐步示範 `-i` 互動流程與 Leet 開關效果。
- [Cybrary — Using the CUPP Tool to Generate Powerful Password Lists](https://www.cybrary.it/blog/using-cupp-tool-generate-powerful-password-lists)：商業資安教育平台 Cybrary 的教學文，定位 CUPP 為「OSINT 結束後第一個該開的工具」。
- [Null Byte (WonderHowTo) — Tutorial: Password Profiling with CUPP](https://null-byte.wonderhowto.com/how-to/tutorial-password-profiling-with-cupp-0165951/)：Null Byte 早期教學，至今仍是 Google 搜 CUPP 的前段結果之一。
- [GeeksforGeeks — CUPP - Common User Passwords Profiler](https://www.geeksforgeeks.org/linux-unix/cupp-common-user-passwords-profiler/)：印度技術教學站的中性介紹，附 Kali 安裝指令。
- [Gennaro Migliaccio — Common User Password Profiler (CUPP)](https://gennaromigliaccio.com/common-user-password-profiler-cupp)：義大利資安部落客的實戰心得。
- [Medium — Create Killer Password Wordlists with CUPP](https://0dayscyber.medium.com/create-killer-password-wordlists-with-cupp-fast-targeted-attacks-81a30c8ea6fb)（Jackson Mittag）：強調 CUPP 在小型 pentest 預算下的 cost/value 優勢。
- [Medium — Password Hacking and Cracking using CUPP Tool (Kali Linux)](https://srimant999.medium.com/password-hacking-and-cracking-using-cupp-tool-kali-linux-1a0e4a2ba475)：S Kumar 的逐指令教學，附截圖。
- [Kali.tools 官方收錄頁](https://en.kali.tools/?p=1305)：CUPP 進入 Kali 主源的官方記錄。

**倫理使用界線**：CUPP 的所有教學文都會在開頭或結尾標註「For authorized testing only」，這是進攻型工具圈的標準免責聲明。但 CUPP 與 hackingtool / zphisher 類聚合包不同，它沒有實際**執行**攻擊的能力（不會去打 hash 或登入畫面），只生成字典——濫用門檻較低、但實際傷害需要搭配其他工具才成立。**responsible disclosure 不適用**（這不是漏洞工具）。

**為何 2026-06-30 重新上 trending**：未能定位本日突發引爆點。可能解釋包含：12-26 的 v3.3.1 commit 是六個月前發生，但 trending 演算法對「沉睡老 repo 突然有活動」會延遲反應；或 6 月有資安課程 / YouTube 教學發布把流量帶回；或 Kali / Parrot OS 6 月版本更新時把 CUPP 列入推薦清單。**資料不足**：未在 Hacker News、Reddit r/netsec、r/HowToHack 找到 6 月新增的具體討論串。

## Release 狀態 / 時間軸

`gh api repos/Mebus/cupp/releases` 回傳空陣列（`[]`），`gh api repos/Mebus/cupp/tags` 同樣為 0 筆——**14 年來沒發過一個 GitHub Release，也沒打過一個 git tag**。版本號只存在於 `cupp.py` 程式碼內的 `__version__` 變數與 commit message。

時間軸（從 commit history 推斷）：

- **2012-05-06**：repo 從 remote-exploit.org 搬上 GitHub，Mebus 接手
- **約 2014–2019**：被收進 Kali / Debian / Ubuntu 主源，進入「裝 Kali 就有」的工具池
- **2019-08**：Python 2 → Python 3 大改版（v3.x 系列起點）
- **2024 年中**：發 v3.3.0
- **2025-12-26**：v3.3.0 → **v3.3.1**，merge 多年積壓的 PR #76（移除無用行）與 PR #115（改善名字輸入 strip）

換言之，CUPP 是典型的「足夠好就不再大改」型 utility：核心邏輯穩定，每年清一次 PR 就夠用。

## 授權與社群

- **授權**：GNU General Public License v3.0（[GPL-3.0](https://api.github.com/licenses/gpl-3.0)）
- **Stars**：6,046 / **Forks**：2,042 / **Watchers**：424 / **Open Issues**：48
- **主要語言**：Python（100%）
- **Topics**：`dictionary-attack`, `password`, `password-strength`, `weak-passwords`, `wordlist`, `wordlist-generator`
- **Contributors**：13 人，Mebus 本人 63 commits，第二名 quantumcore 7 commits，其餘 11 人 1 commit——典型的單人專案 + 零星 PR 結構
- **Stars 增長速率**：6,046 stars / 14 年 ≈ **每年約 430 stars** 的平均增速；今日 +18 對應 6,046 基數 = `growth_rate ≈ 0.30%`，屬於「低基數穩定型」上榜，與 BasedHardware/omi 那種 `growth_rate > 5%` 的爆發型不同
- **Fork ratio**：2,042 forks / 6,046 stars ≈ **33.8%**，遠高於一般 repo 的 5–10%，反映 CUPP 是「拿來修一改就跑」的工具型 repo，而非「拿來讀程式碼」的學習型 repo

## 資料來源

**本體**：

- <https://github.com/Mebus/cupp>（README）
- <https://github.com/Mebus/cupp/blob/master/cupp.py>（單檔原始碼）
- `gh api repos/Mebus/cupp`（2026-06-30 擷取）
- `gh api repos/Mebus/cupp/releases` → `[]`
- `gh api repos/Mebus/cupp/contributors --paginate` → 13 contributors
- <https://en.kali.tools/?p=1305>（Kali 官方收錄頁）
- <https://manpages.ubuntu.com/manpages/bionic/man1/cupp.1.html>（Ubuntu manpage）
- <https://launchpad.net/ubuntu/noble/+package/cupp>（Ubuntu 24.04 套件頁）
- <https://packages.debian.org/sid/misc/cupp>（Debian sid 套件頁）

**第三方評論 / 教學**：

- <https://www.hackingarticles.in/comprehensive-guide-on-cupp-a-wordlist-generating-tool/>
- <https://www.cybrary.it/blog/using-cupp-tool-generate-powerful-password-lists>
- <https://null-byte.wonderhowto.com/how-to/tutorial-password-profiling-with-cupp-0165951/>
- <https://www.geeksforgeeks.org/linux-unix/cupp-common-user-passwords-profiler/>
- <https://gennaromigliaccio.com/common-user-password-profiler-cupp>
- <https://0dayscyber.medium.com/create-killer-password-wordlists-with-cupp-fast-targeted-attacks-81a30c8ea6fb>
- <https://srimant999.medium.com/password-hacking-and-cracking-using-cupp-tool-kali-linux-1a0e4a2ba475>
- <https://hackersidea.blogspot.com/2016/11/cupp-common-user-passwords-profiler.html>
- <https://stevemats.medium.com/using-cupp-tool-by-mebus-to-generate-customized-wordlists-1332f1b1a028>

**同類工具**：

- <https://github.com/sc0tfree/mentalist>（Mentalist GUI 字典生成器）
- <https://github.com/digininja/CeWL>（網站爬蟲式字典生成器）
- <https://github.com/hashcat/hashcat>（GPU 破解器 + rule-based mutation）
- <https://github.com/openwall/john>（John the Ripper）
- <https://github.com/tweksteen/BEWGor>（CUPP 的 Bash 擴充版）

## 更新紀錄
