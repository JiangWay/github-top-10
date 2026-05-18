---
repo: K-Dense-AI/scientific-agent-skills
first_seen: 2026-05-16
last_updated: 2026-05-19
appearances: [2026-05-16, 2026-05-18, 2026-05-19]
growth_appearances: [2026-05-16, 2026-05-18, 2026-05-19]
has_releases: true
latest_release: v2.38.0
tags: [LLM 客戶端, Skill 外掛, 開源替代]
domain: LLM 客戶端
form: Skill 外掛
themes: [開源替代]
---

# [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)

> 研究日期：2026-05-16
> 研究來源：<https://github.com/K-Dense-AI/scientific-agent-skills>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-05-16 首次）

### 專案定位

[K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) 是 K-Dense 公司開源的 **135 個科研用 Agent Skills 套件**，把 [Cursor](https://www.cursor.com)、[anthropics/claude-code](https://github.com/anthropics/claude-code)、OpenAI Codex、Gemini CLI 等支援 Agent Skills 開放標準的編碼代理，一鍵升級成可跨生物、化學、醫學、材料、地理、天文、金融的「桌面 AI Scientist」。專案原名 `claude-scientific-skills`，2025-12 Anthropic 把 Agent Skills 釋出為開放標準後改名為現名，標榜「同一份 skill，多家代理可用」。

## 一句話定位

它把單一通用編碼代理擴張成一支跨 17 個科學領域、能直接呼叫 78+ 公開資料庫與 70+ 已調教 Python 套件（RDKit、Scanpy、PyTorch Lightning、BioPython、scVelo、TimesFM 等）的研究助理。

## 作者與起源

K-Dense Inc. 由 David Zhang（Rice University）與 Ashwin Gopinath（MIT）創辦，Timothy Kassis（GitHub `TKassis`，本 repo 第一大貢獻者、105 commits）任 Co-Founder 與 Head of AI。背後投資人包括 [Accel](https://www.accel.com)、Accel Atoms、Google AI Futures Fund，以及 [Dario Amodei](https://www.anthropic.com)（Anthropic CEO）、Emily Leproust（Twist Bioscience）、Mike Schnall-Levin（10x Genomics）等天使。母公司 Biostate AI 於 [2025-09-17 透過 GlobeNewswire 發佈 K-Dense Beta](https://www.globenewswire.com/news-release/2025/09/17/3151632/0/en/Biostate-AI-Launches-K-Dense-Beta-an-AI-Agent-That-Compresses-Research-Cycles-from-Years-to-Days-Validated-with-Harvard-Longevity-Discovery-Breakthrough.html)，宣稱以 Harvard 長壽研究做 in-silico 驗證。

repo 於 2025-10-19 建立，最早可追溯的 release `v1.50.0` 落在 2025-10-22——意味公開 release 已從 1.50 起跳，較早版本應在內部閉源迭代。2026-05-16 首次擠進本站 Top 10 絕對榜，stars 22,329，topics 涵蓋 17 個科研領域標籤。

### 核心架構 / 主要概念

技術骨幹：

- **Agent Skills 開放標準**：每個 skill 是一個含 `SKILL.md` 的資料夾，metadata（name、description）+ 操作說明，採 progressive disclosure（discovery → activation → execution）。Anthropic 於 2025-12-18 釋出規範，本 repo 是 reference implementation 之一。
- **三層內容組成**：(1) 100+ 資料庫存取（78 個透過 `database-lookup` 統一介面：PubChem、ChEMBL、UniProt、COSMIC、ClinicalTrials.gov、FRED、USPTO；另含 DepMap、Imaging Data Commons、PrimeKG、U.S. Treasury Fiscal Data、Hugging Science、BioServices ~40 個 bioinfo 服務、BioPython 38 個 NCBI Entrez 子庫、gget 20+ 基因體資料庫）；(2) 70+ Python 套件 wrapper（RDKit、Scanpy、PyTorch Lightning、scikit-learn、BioPython、pyzotero、PennyLane、Qiskit、OpenMM、MDAnalysis、scVelo、TimesFM…）；(3) 9 個科學平台整合（Benchling、DNAnexus、LatchBio、OMERO、Protocols.io、Open Notebook）。
- **多通道安裝**：`npx skills add K-Dense-AI/scientific-agent-skills`（跨平台官方標準）或 `gh skill install K-Dense-AI/scientific-agent-skills`（GitHub CLI v2.90.0+，可 `--agent claude-code|cursor|codex|gemini` 與 `--pin v1.0.0` 鎖版本）。
- **安全機制**：所有 skill 跑 [Cisco AI Defense Skill Scanner](https://github.com/cisco-ai-defense/skill-scanner)（LLM-based）每週一掃，結果寫進 `SECURITY.md`。
- **配套桌面 app**：姊妹專案 [K-Dense-AI/k-dense-byok](https://github.com/K-Dense-AI/k-dense-byok)（BYOK），免費開源、本機跑、Bring-your-own-API-key、可選 [Modal](https://modal.com) 雲端 GPU 擴張，把 135 個 skill 包成完整研究 workspace。

語言佔比：Python 76.4%、TeX 16.0%（科學寫作 / 投影片模板）、HTML 4.8%、Shell 0.4%。

## 設計哲學

README 一段最能代表立場的原文：

> "These skills enable your AI agent to seamlessly work with specialized scientific libraries, databases, and tools across multiple scientific domains. While the agent can use any Python package or API on its own, these explicitly defined skills provide curated documentation and examples that make it significantly stronger and more reliable for the workflows below"

翻譯與解讀：作者刻意不把 skill 框定為「外掛能力」，而是「**curated documentation + examples**」——通用代理本來就能裝 RDKit、本來就能呼 ChEMBL，但讓代理「用得對、用得穩」需要把領域慣例、踩雷點、最佳實踐預先沉澱成 SKILL.md。這跟早期 LangChain 風格的「強制路由到工具」走相反路線：skill 不是新工具，而是預先寫好的「正確使用方式」。

### 目標使用者

- **計算生物學家 / cheminformatics 研究員**：要對接 ChEMBL、PubChem、UniProt、ClinicalTrials.gov、COSMIC 等正典資料庫做 drug discovery、單細胞分析、多體學整合。
- **AI Scientist 模式的個人研究者**：在 Cursor / Claude Code / Codex 桌面開發環境，想把代理拉到 wet-lab、virtual screening、grant writing、文獻回顧的完整 workflow。
- **要 publication-ready 輸出的研究者**：30+ 科學溝通 skill 含 LaTeX 投影片、海報、文獻回顧、同儕審查、citation 管理、Mermaid 圖表，瞄準論文與口頭報告產出。
- **不適用情境**：純文字 LLM chat、沒有 Python runtime 的環境、企業內部需要嚴格資料隔離（雖開源但 wet-lab 與臨床資料合規仍需自行把關，SECURITY.md 也明說 community skill 審核資源有限）。

### 與類似專案的差異

Agent Skills 賽道在 2026 上半年迅速擴張，本站 5-14 同框 [obra/superpowers](https://github.com/obra/superpowers)（189k）、[mattpocock/skills](https://github.com/mattpocock/skills)（78k）、[github/spec-kit](https://github.com/github/spec-kit）（98k）三檔為通用方法論代表。本專案的差異化在「**垂直科研**」而非「通用編碼方法論」。

| 對手 | 對手定位 | 本專案差異 |
|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | 通用 AI coding 方法論 skill 集 | 通用 vs 垂直：superpowers 教「怎麼寫好程式」，scientific-agent-skills 教「怎麼正確呼叫 ChEMBL / Scanpy / RDKit」 |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 1000+ skill 索引型 awesome list | catalogue vs 本體：VoltAgent 是 curation 入口、本 repo 是內容本體並通過 Cisco AI Defense 週掃 |

選型建議：通用 coding 任務選 superpowers；科研管線（單細胞、虛擬篩選、多體學整合、文獻回顧）選本 repo；尚未決定可先用 VoltAgent 索引瀏覽再針對性安裝。

### 外部評論

- [Biostate AI 官方新聞稿（2025-09-17, GlobeNewswire）](https://www.globenewswire.com/news-release/2025/09/17/3151632/0/en/Biostate-AI-Launches-K-Dense-Beta-an-AI-Agent-That-Compresses-Research-Cycles-from-Years-to-Days-Validated-with-Harvard-Longevity-Discovery-Breakthrough.html) — 以 Harvard 長壽研究做 in-silico 驗證，宣稱壓縮研究週期「從年到天」，屬廠商自述需打折，但首次正式公開 K-Dense 平台脈絡。
- [Longevity Technology 媒體報導](https://longevity.technology/news/new-ai-tool-demonstrates-potential-to-accelerate-longevity-research/) — 第三方長壽研究媒體跟進 K-Dense Beta，把它放進 AI for science 的加速器敘事。
- [Healthtech Digital UK 媒體報導](https://healthtechdigital.com/biostate-ai-launches-k-dense-beta-an-ai-agent-that-compresses-research-cycles-from-years-to-days-validated-with-harvard-longevity-discovery-breakthrough/) — 英國 health-tech 媒體轉發新聞稿。
- [Timothy Kassis 在 LinkedIn 自述加入 K-Dense Inc. 任 Co-Founder](https://www.linkedin.com/posts/timothykassis_exciting-personal-news-after-several-months-activity-7391518455960715264-ClMD)，與本 repo 第一大貢獻者身分對得上，可佐證團隊背景。
- [agentskills.io 開放標準官方頁](https://agentskills.io/home)、[Simon Willison 對 Agent Skills 標準的觀察（2025-12-19）](https://simonwillison.net/2025/Dec/19/agent-skills/) — 提供本專案賴以擴張的標準脈絡：Anthropic 把 Agent Skills 開放後，Codex、Gemini CLI、Cursor 等 20+ 平台採納，本 repo 才能宣稱「same skill, multi-agent」。

針對本 repo 本身的 Hacker News / Reddit 串級討論未見顯著聚焦，**第三方獨立技術評論資料不足**，多為廠商側報導或標準層討論。後續若爆出 HN 主題串再回填。

### Release 狀態

- **建立日期**：2025-10-19
- **首個公開 release**：v1.50.0（2025-10-22）— 起始版號從 1.50 而非 0.1.0，暗示先閉源迭代
- **改名節點**：2025-12 Anthropic 釋出 Agent Skills 為開放標準後，由 `claude-scientific-skills` 改名為 `scientific-agent-skills`
- **最新 release**：[v2.38.0](https://github.com/K-Dense-AI/scientific-agent-skills/releases/tag/v2.38.0)（2026-05-01）
- **總 release 數**：76 個
- **近月密度**：2025-12 發 9 個、2026-01 發 8 個、2026-02 發 6 個、2026-03 發 9 個、2026-04 發 9 個、2026-05 截至 5-16 已 2 個 — 維持每月約 8 個 release 的高頻釋出
- 大部分 release 由 `github-actions[bot]` 自動發佈，配合 CI/CD 自動化

### 授權與社群

- **License**：MIT
- **Stars**：22,329（2026-05-16 抓取時）
- **Forks**：2,421
- **Watchers**：22,329（同 stars，預設行為）
- **Subscribers**：127
- **Open issues**：33
- **Contributors**：30+ 人，前段集中（TKassis 105、borealBytes 38、vin-bio 21、leipzig 15、fedorov 9、OrionLi545 6），尾巴大量 1–2 commit 的 community contributor
- **語言佔比**：Python 76.4%、TeX 16.0%、HTML 4.8%、Shell 0.4%
- **Topics**：`agent-skills`、`ai-scientist`、`bioinformatics`、`chemoinformatics`、`claude`、`claude-skills`、`claudecode`、`clinical-research`、`computational-biology`、`data-analysis`、`drug-discovery`、`genomics`、`materials-science`、`metabolomics`、`proteomics`、`scientific-computing`、`scientific-visualization`
- **增長速率錨點**：建 repo 約 7 個月衝到 22.3k stars，平均約 95 stars/天（粗估）；本日進入 Top 10 絕對榜屬高增速階段
- **官方頻道**：[X @k_dense_ai](https://x.com/k_dense_ai)、[LinkedIn K-Dense Inc.](https://www.linkedin.com/company/k-dense-inc)、[YouTube @K-Dense-Inc](https://www.youtube.com/@K-Dense-Inc)、[官網 k-dense.ai](https://k-dense.ai)
- **配套產品**：免費 SaaS [K-Dense Web](https://k-dense.ai)、開源 desktop [K-Dense-AI/k-dense-byok](https://github.com/K-Dense-AI/k-dense-byok)

## 資料來源

**本體**：

- [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)
- [README.md](https://github.com/K-Dense-AI/scientific-agent-skills/blob/main/README.md)
- [docs/scientific-skills.md](https://github.com/K-Dense-AI/scientific-agent-skills/blob/main/docs/scientific-skills.md)
- [Releases 頁](https://github.com/K-Dense-AI/scientific-agent-skills/releases)
- 配套 [K-Dense-AI/k-dense-byok](https://github.com/K-Dense-AI/k-dense-byok)、[K-Dense-AI/claude-skills-mcp](https://github.com/K-Dense-AI/claude-skills-mcp)、[K-Dense-AI/agentic-data-scientist](https://github.com/K-Dense-AI/agentic-data-scientist)
- 官網 <https://k-dense.ai>

**標準層**：

- [agentskills.io 官方頁](https://agentskills.io/home)
- [agentskills/agentskills GitHub spec](https://github.com/agentskills/agentskills)
- [Simon Willison 對 Agent Skills 的觀察（2025-12-19）](https://simonwillison.net/2025/Dec/19/agent-skills/)

**第三方評論 / 報導**：

- [Biostate AI Launches K-Dense Beta — GlobeNewswire](https://www.globenewswire.com/news-release/2025/09/17/3151632/0/en/Biostate-AI-Launches-K-Dense-Beta-an-AI-Agent-That-Compresses-Research-Cycles-from-Years-to-Days-Validated-with-Harvard-Longevity-Discovery-Breakthrough.html)
- [Longevity Technology 報導](https://longevity.technology/news/new-ai-tool-demonstrates-potential-to-accelerate-longevity-research/)
- [Healthtech Digital UK 報導](https://healthtechdigital.com/biostate-ai-launches-k-dense-beta-an-ai-agent-that-compresses-research-cycles-from-years-to-days-validated-with-harvard-longevity-discovery-breakthrough/)
- [Timothy Kassis LinkedIn 自述](https://www.linkedin.com/posts/timothykassis_exciting-personal-news-after-several-months-activity-7391518455960715264-ClMD)

**同類工具**：

- [obra/superpowers](https://github.com/obra/superpowers)
- [mattpocock/skills](https://github.com/mattpocock/skills)
- [github/spec-kit](https://github.com/github/spec-kit)
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)
- [VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- 安全掃描工具 [cisco-ai-defense/skill-scanner](https://github.com/cisco-ai-defense/skill-scanner)

## 更新紀錄

### 2026-05-18
- 隔 1 日從 5-16 後歸隊（5-17 缺席），**累計 2 次上榜**；今日 stars_total **23,724**、stars_today **764**、growth_rate **3.22%**，絕對榜 #10（前次 #3 大幅下滑）、增長榜 #6。
- 兩日內 stars_total 22,327 → 23,724（+6.3%、+1,397 顆），相較 5-16 的 643 stars_today **再 +18.8%**，反映「science skill 議題」短期仍持續發酵但動能溫和。`latest_release` 仍為 [v2.38.0](https://github.com/K-Dense-AI/scientific-agent-skills/releases/tag/v2.38.0)（2026-05-01），自首次上榜後 17 天無新版。
- 與 5-16 的「Skill 規範定義者 × 個人 dotfiles × 方法論 × 科學垂直」四線同框不同，今日 [anthropics/skills](https://github.com/anthropics/skills)／[obra/superpowers](https://github.com/obra/superpowers)／[mattpocock/skills](https://github.com/mattpocock/skills) **全數落榜**，僅 K-Dense 與今日真新進 [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills)（registry / 企業驗證取向）同框，Skill 賽道**從「四線並立」收束為「科學垂直 vs 企業 registry」二線對話**。
