---
repo: usestrix/strix
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: true
latest_release: v1.0.4
tags: [資安, 應用程式, 自進化, 開源替代]
domain: 資安
form: 應用程式
themes: [自進化, 開源替代]
---

# [usestrix/strix](https://github.com/usestrix/strix)

> 研究日期：2026-06-30
> 研究來源：https://github.com/usestrix/strix
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

Strix 是 Apache-2.0 授權的開源**進攻型**資安工具，跑在本地 Docker 內，由多個 LLM agent 自主對指定 target（程式碼倉、URL、API endpoint）執行 reconnaissance、exploitation 與 PoC 驗證，並把驗證過的漏洞與修補 patch 一起交回開發者；攻 / 防立場屬「offensive security」，預設定位是「開發者自己對自己的 app 跑 pentest」，README 結尾以 `WARNING` 明示「只測你擁有或被授權測試的 app」。

## 作者與起源

由 GitHub organization [usestrix](https://github.com/usestrix) 發佈，背後是同名商業公司 strix.ai，另有商業平台 app.strix.ai。Repo `created_at` 為 2025-08-05，與 [Show HN: Strix - Open-source AI hackers for your apps](https://news.ycombinator.com/item?id=44945113) 的 2025-08 發佈時間吻合，Show HN 提交人為 `ahmedallam2`（102 points、4 條主串留言）。多份外媒指出公司本體完成大型募資：[themenonlab 評論](https://themenonlab.blog/blog/strix-open-source-ai-security-testing-agent) 與多家 funding 追蹤站點報導「Strix 募得 117M USD 打造 AI-powered application hacker」，但 Crunchbase 查到的 [Strix IA](https://www.crunchbase.com/organization/strix-ia) 與另一同名 Strix Ventures 是不同實體，募資輪次細節（領投人、日期）在本次研究來源中尚未交叉印證，**創辦人姓名資料不足**。

## 核心架構 / 主要概念

README 把架構分成三層：

1. **Agentic Pentesting Tools**（agent 手上的「武器」）：HTTP 攔截代理採用 [caido/caido](https://github.com/caido/caido)、瀏覽器自動化採用 [microsoft/playwright](https://github.com/microsoft/playwright)、Shell 互動 terminal、Python sandbox 寫 PoC、偵察與 OSINT、SAST+DAST 雙模式、結構化漏洞知識庫（含 CVSS 與 OWASP 對應）。
2. **Comprehensive Vulnerability Scanner**（針對的漏洞類別）：Broken Access Control（IDOR、權限提升、auth bypass）、Injection（SQL/NoSQL/OS command/SSTI）、SSRF/XXE/insecure deserialization/RCE、XSS（stored / reflected / DOM）、prototype pollution、CSRF、Race condition、payment manipulation、JWT 攻擊、session fixation、雲端設定錯誤、API mass assignment 等。
3. **Graph of Agents**（多代理編排）：用 graph model 把 agent 排成平行 workflow，特化 agent 分別處理 recon、exploitation、post-exploitation，一個 agent 找到新資訊會觸發其他 agent 調整路徑。底層 LLM routing 走 [BerriAI/litellm](https://github.com/BerriAI/litellm)，nuclei 模板來源是 [projectdiscovery/nuclei](https://github.com/projectdiscovery/nuclei)，TUI 用 [Textualize/textual](https://github.com/Textualize/textual)。

部署模型：CLI 是 PyPI 套件 `strix-agent`，第一次跑會自動 pull 一個 sandbox Docker image，所有 exploit 嘗試發生在沙箱裡；LLM 由使用者自帶 key，預設推薦 `openai/gpt-5.4`、`anthropic/claude-sonnet-4-6`、`vertex_ai/gemini-3-pro-preview`，也支援 Ollama / LMStudio 等本地模型（透過 `LLM_API_BASE`）。

## 設計哲學

README Overview 段對自己的設計哲學交代得很白：

> Strix are autonomous AI penetration testing agents that act just like real hackers - they run your code dynamically, find vulnerabilities, and validate them through actual proof-of-concepts. Built for developers and security teams who need fast, accurate security testing without the overhead of manual pentesting or the false positives of static analysis tools.

中譯：「Strix 是自主 AI 滲透測試 agent，行為就像真正的 hacker——動態跑你的程式、找出漏洞，並以實際 PoC 加以驗證。為的是開發者與資安團隊需要快速、精確的測試，但不想負擔人工 pentest 的成本，也不想吞 SAST 工具的 false positive。」

這段濃縮成一條操作原則：**No PoC, no finding**。第三方評論 [helpnetsecurity.com 2025-11-17 報導](https://www.helpnetsecurity.com/2025/11/17/strix-open-source-ai-agents-penetration-testing/) 與 [Ostorlab 8 Open-Source AI Pentest Tools 2026](https://blog.ostorlab.co/8-open-source-ai-pentest-tools-2026.html) 都把這條當成 Strix 的核心差異點：報出來的漏洞 Strix 已經先 exploit 過一次。

## 目標使用者與適用情境

README「Use Cases」段列了四種定位：

1. **Application Security Testing**：開發團隊週期性掃自己的 app
2. **Rapid Penetration Testing**：把過去要週級的 pentest 壓到小時級，並產 compliance 報告（SOC 2、ISO 27001、PCI DSS 模板靠 enterprise 版）
3. **Bug Bounty Automation**：bug bounty hunter 自動掃授權 target 並產 PoC
4. **CI/CD Integration**：以 GitHub Actions 進 PR pipeline，新漏洞會 block PR

預設情境是「白盒 + 本地 source code」：`strix --target ./app-directory`；也支援黑盒 web target、灰盒（帶帳密 instruction）與 PR diff 模式（`--scope-mode diff --diff-base origin/main`）。對企業客群另開 strix.ai/demo，賣 SSO、VPC 自架、客製 agent 與 BYOK。

## 與類似專案的差異

| 項目 | [usestrix/strix](https://github.com/usestrix/strix) | [GreyDGL/PentestGPT](https://github.com/GreyDGL/PentestGPT) | [aliasrobotics/cai](https://github.com/aliasrobotics/cai)（Cybersecurity AI） | Xbow（閉源）／[BurpSuite Bambdas/AI](https://portswigger.net/burp) |
|---|---|---|---|---|
| 自主程度 | 全自主，agent 直接執行 exploit 並驗 PoC | human-in-the-loop，LLM 給建議、人來執行 | 全自主 agent，主打教學與研究 | Xbow 全自主；BurpSuite AI 主要是 augmentation |
| PoC 驗證 | 必出 working PoC | 不負責執行，無 PoC 強制 | 會嘗試 PoC | Xbow 會出 PoC；BurpSuite AI 不會 |
| 部署 | 本地 Docker + 自帶 LLM key，可進 CI/CD | 桌面互動 | 本地 / 雲端皆可 | Xbow 雲端服務、人力營運比例高 |
| 授權 | Apache-2.0 | MIT | MIT | 商業閉源 |
| 開發者體驗 | CLI 為主、TUI（Textual）、PR auto-fix | REPL / web UI | CLI + 教學 notebook | Web/桌面 GUI |
| 主打對象 | 寫 code 的開發者、bug bounty hunter | 學 pentest 的人、CTF | 學界與研究員 | 企業 red team |

兩份 2026 第三方比較對 PentestGPT 較不利：[Ostorlab 文](https://blog.ostorlab.co/8-open-source-ai-pentest-tools-2026.html) 寫「PentestGPT、PentAGI、NeuroSploit、Deadend CLI 在實測中常因初始化失敗、資料庫錯誤、LLM provider 設定錯而跑不完」，而 Strix 與 CAI 能跑出 SQL injection、認證繞過、IDOR 等可驗證的結果。[appsecsanta.com](https://appsecsanta.com/research/ai-pentesting-agents-2026) 提到 Strix v0.4.0 在 XBEN benchmark（104 道 web security 挑戰）拿 100/104（96%），每題平均約 19 分鐘、總成本 337 美元。Strix 自己的部落格 [Best AI Pentesting Tools in 2026: 8 Platforms Compared](https://www.strix.ai/blog/best-ai-pentesting-tools) 是自家比較，立場不中立，但能看到他們把 Xbow、PentestGPT、Burp 都列為對比對象。

## 外部評論

**Show HN 串（2025-08）**：[Show HN: Strix](https://news.ycombinator.com/item?id=44945113) 102 points、4 條主串留言，討論集中在「跟 Xbow 比」這個點，並非全是正評。

- 評論者 [tptacek](https://news.ycombinator.com/user?id=tptacek)（資安界長期 commenter）寫：「This is a neat project, I don't know why you'd want to set it up with this comparison to Xbow. As someone who works ... in this space and knows some of the actors, I'm pretty sure there's more to Xbow than ~1800 lines of prompts」並貼出 [strix/prompts/vulnerabilities/rce.jinja](https://github.com/usestrix/strix/blob/main/strix/prompts/vulnerabilities/rce.jinja) 作為佐證，暗示 Strix 的「核心 IP」就是一疊 prompt 模板。
- 評論者 [thegeomaster](https://news.ycombinator.com/user?id=thegeomaster) 直言「Seems heavily vibe coded, down to the Claude-generated README and a lot of the LLM prompts themselves」並要求作者公開能找到的真實漏洞範例，認為 demo 中那個漏掉 JWT 檢查的案例「普通 AI code review 也能抓到」。
- 評論者 [waihtis](https://news.ycombinator.com/user?id=waihtis) 講了一個圈內梗：「The joke is that Xbow only works because they have close to 100 employees operating the software」——反過來替 Strix「全自動」的承諾留了一個疑問。

**部落格與媒體**：

- [helpnetsecurity.com 2025-11-17](https://www.helpnetsecurity.com/2025/11/17/strix-open-source-ai-agents-penetration-testing/) 中性介紹，沒給負評也沒挑限制
- [themenonlab.blog](https://themenonlab.blog/blog/strix-open-source-ai-security-testing-agent) 與 [William OGOU 部落格](https://blog.ogwilliam.com/post/strix-open-source-ai-security-agent) 兩篇技術部落格走「介紹 + 教學」路線
- [Manish Shivanandhan 在 Medium](https://medium.com/data-science-collective/strix-the-open-source-ai-agent-for-security-testing-44e1ed244a9d) 把它列為「開源 AI security agent」推介
- [Product Hunt 頁面](https://www.producthunt.com/products/strix-2) 有開發者留言「feels like having an AI pentester built into your workflow」

**未見顯著討論的面向**：本次搜尋未找到 Reddit r/netsec 或 r/blueteamsec 的深度討論串，也未找到對「prompt injection 攻擊 Strix agent 本身」「跑大型 codebase 時的 cost upper bound」「false negative rate」的第三方對抗式測試。Responsible disclosure 與被濫用風險議題 README 只用一段 `WARNING` 處理，這點在 Show HN 串裡沒有被深入挑戰，但實務上是 AI pentest 工具的共通灰色地帶。

## Release 狀態 / 時間軸

`has_releases: true`，最新版本 `v1.0.4`（2026-06-09 published）。重要里程碑：

- 2025-08-05：Repo 公開、Show HN
- 2025-11-01：v0.3.1
- 2025-11-25：v0.4.0（XBEN benchmark 跑分版本）
- 2025-12-15：v0.5.0
- 2026-01-12：v0.6.0
- 2026-02-19 ～ 2026-02-24：v0.8.0 / v0.8.1 / v0.8.2 連三發
- 2026-03-23：v0.8.3
- 2026-05-26 ～ 2026-05-28：v1.0.0 / v1.0.1 / v1.0.2（1.0 正式版 + 兩個 hotfix）
- 2026-06-09：v1.0.3 / v1.0.4（同日兩發，最新）

從 v0.3 到 v1.0 共九個月，每月一到三個小版本。release 自動由 `github-actions[bot]` 推、附 `strix-1.0.4-linux-x86_64.tar.gz` 等預編譯資產（多平台 binary 之外仍是 PyPI 套件 `strix-agent`）。

## 授權與社群

- **License**：[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)（API 端的 strix.ai 平台另計商業條款）
- **量化鐵錨**（2026-06-30 抓取）：27,815 stars、3,104 forks、132 watchers / subscribers、114 open issues、41 contributors（`gh api /contributors --paginate | jq length`）
- **主要語言**：Python，repo size 5,772 KB
- **Topics**（20 個）：agents、ai-hacking、ai-penetration-testing、ai-pentesting、ai-security、artificial-intelligence、bug-bounty、code-quality、ctf-tools、cybersecurity、cybersecurity-tools、ethical-hacking、hacking、llm-security、offensive-security、penetration-testing、pentesting-tools、red-teaming、security、security-automation
- **PR 速率**：2026-06-17 到 2026-06-30 兩週內就有 PR #572 → #608 共 30+ 個 PR 進來，包含外部貢獻（如 #380 加 checkpoint/resume）、依賴升級（pydantic-settings、cryptography）、bug fix（rate limit、SOCKS proxy、Content-Length recompute）與功能（token / cost usage limit、bind-mount 大倉、--sub flag 接 Claude Code subscription 後端）——活躍度屬高頻維護
- **社群入口**：[Discord](https://discord.gg/strix-ai)、[@strix_ai on X](https://x.com/strix_ai)、[docs.strix.ai](https://docs.strix.ai)、[deepwiki/usestrix/strix](https://deepwiki.com/usestrix/strix)

## 資料來源

**本體**：

- Repo 主頁：<https://github.com/usestrix/strix>
- README（commit @ main，2026-06-30 抓）：<https://raw.githubusercontent.com/usestrix/strix/main/README.md>
- 官網：<https://strix.ai/>
- 商業平台：<https://app.strix.ai>
- 文件：<https://docs.strix.ai/>
- PyPI 套件：<https://pypi.org/project/strix-agent/>
- 公開 prompt 範例：[strix/prompts/vulnerabilities/rce.jinja](https://github.com/usestrix/strix/blob/main/strix/prompts/vulnerabilities/rce.jinja)
- GitHub API（metadata、releases、contributors、pulls，2026-06-30 抓取）

**第三方評論**：

- [Show HN: Strix - Open-source AI hackers for your apps（2025-08）](https://news.ycombinator.com/item?id=44945113)
- [Help Net Security: Strix: Open-source AI agents for penetration testing（2025-11-17）](https://www.helpnetsecurity.com/2025/11/17/strix-open-source-ai-agents-penetration-testing/)
- [Ostorlab: 8 Open-Source AI Pentest Tools for Security Teams in 2026](https://blog.ostorlab.co/8-open-source-ai-pentest-tools-2026.html)
- [appsecsanta.com: AI Pentesting Agents 2026: The Rise of 39+ Tools Tested](https://appsecsanta.com/research/ai-pentesting-agents-2026)
- [themenonlab.blog: Strix: The Open-Source AI Hacker That Finds, Proves, and Fixes Your Vulnerabilities](https://themenonlab.blog/blog/strix-open-source-ai-security-testing-agent)
- [Manish Shivanandhan, Medium: Strix: The Open-Source AI Agent for Security Testing](https://medium.com/data-science-collective/strix-the-open-source-ai-agent-for-security-testing-44e1ed244a9d)
- [William OGOU 部落格: Strix: The Open-Source AI Agent Redefining Automated Pentesting](https://blog.ogwilliam.com/post/strix-open-source-ai-security-agent)
- [Product Hunt: Strix](https://www.producthunt.com/products/strix-2)

**同類工具**（軸 B 比較對象）：

- [GreyDGL/PentestGPT](https://github.com/GreyDGL/PentestGPT)
- [aliasrobotics/cai](https://github.com/aliasrobotics/cai)
- [projectdiscovery/nuclei](https://github.com/projectdiscovery/nuclei)
- [caido/caido](https://github.com/caido/caido)
- [BerriAI/litellm](https://github.com/BerriAI/litellm)
- [Textualize/textual](https://github.com/Textualize/textual)
- Xbow（閉源商業 AI pentest 服務）：<https://xbow.com/>
- [BurpSuite](https://portswigger.net/burp)（PortSwigger 商業工具，含 AI augmentation）

## 更新紀錄
