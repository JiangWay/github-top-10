---
repo: Imbad0202/academic-research-skills
first_seen: 2026-05-19
last_updated: 2026-05-21
appearances: [2026-05-19, 2026-05-20, 2026-05-21]
growth_appearances: [2026-05-19, 2026-05-20, 2026-05-21]
has_releases: true
latest_release: v3.9.2
tags: [教學資源, Skill 外掛, 多代理編排, 開源替代]
domain: 教學資源
form: Skill 外掛
themes: [多代理編排, 開源替代]
---

## 深度研究（2026-05-19 首次）

### 專案定位

[Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills)（簡稱 ARS）是台灣作者 Edward Cheng-I Wu（吳政宜）以 CC BY-NC 4.0 釋出的 Claude Code Skill 套件，圍繞學術研究全流程「research → write → review → revise → finalize」做成單一 plugin，主打把多代理協作、誠信驗證閘門、反諂媚（anti-sycophancy）協議塞進 Claude Code 既有 Skill 框架。建立於 2026-02-26、不到三個月就累積 11,310 stars／1,169 forks，足見 [anthropics/claude-code](https://github.com/anthropics/claude-code) Skill 生態的爆發力。

### 核心架構 / 主要概念

ARS 由 4 大 Skill 構成，內部宣稱共 35 個 agent、25 個 mode：

1. **Deep Research v2.8**：13-agent 研究小組、7 個 mode，含系統性綜述與蘇格拉底式引導探索。
2. **Academic Paper v3.0**：12-agent 撰寫管線、10 個 mode，涵蓋初稿、修訂、格式轉換（APA 7.0、Chicago、MLA、IEEE、Vancouver）。
3. **Academic Paper Reviewer v1.8**：7-agent peer review，多視角評分。
4. **Academic Pipeline v3.7**：10-stage 協調器，內建 Stage 2.5／4.5 兩道強制 **integrity gate**、Material Passport（跨 session reproducibility ledger）、Sprint Contracts（預先承諾的評分計畫）、Semantic Scholar API 對引用做存在性驗證（Levenshtein ≥ 0.70 標題比對 + DOI 不一致偵測）。

### 目標使用者

需要把 Claude Code 當研究助理、又不願放棄 human-in-the-loop 的研究生與獨立學者；對 LLM 引用幻覺有戒心、要求 reproducibility 的 paper writer；以及想觀摩多代理 Skill 編排寫法的 Claude Code 重度玩家。官方估算一篇 15k 字論文跑完全流程約 $4–6 美元 API 費、2–4 小時人機協作時間。

### 與類似專案的差異

對比官方 [anthropics/skills](https://github.com/anthropics/skills)（13.5 萬 stars 通用 Skill 正典），ARS 是垂直深耕學術 pipeline 的「應用層」；對比 [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)（2.43 萬 stars、135 個科學垂直 skill，偏實驗模擬與資料分析），ARS 走「寫作—審稿—修訂」這條人文社科友善的軸線；對比 [NirDiamant/agents-towards-production](https://github.com/NirDiamant/agents-towards-production)（生產化教學 notebook），ARS 不是教學素材而是可直接 `/plugin install` 的 production plugin；對比 [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills)（企業驗證 Skill registry），ARS 不做安全驗證 registry，而是內聚的學術 pipeline 應用。

### 外部評論

PyShine 部落格給出最坦誠的評價：「post-publication audit of ARS's own output found **21 issues out of 68 references**（31% 錯誤率）通過了三輪 integrity check」——作者把這個負面結果寫進 README 當成「外部驗證仍然必要」的證據，被讚為「proof of honest design」（[PyShine](https://pyshine.com/Academic-Research-Skills-Claude-Code/)）。同篇也提醒反諂媚機制「do not eliminate AI sycophancy—they slow down the sycophancy, force the DA to justify concessions」。SourcePulse 分析指出單次 run「potentially exceeding 200K input + 100K output tokens」、推薦 Claude Opus + Max plan，「Inactive responsiveness rating suggests potential communication gaps with contributors」（[SourcePulse](https://www.sourcepulse.org/projects/26111832)）；上個月 30 天內 6,815 stars、81 PRs、34 issues 結案，動能極強但社群互動偏單向。Hacker News 5-18 發文（[HN #48083919](https://news.ycombinator.com/item?id=48083919)）位列討論區，但回應數有限，主流英語社群討論密度尚未跟上 star 增速。

### Release 狀態

`has_releases: true`。20 個 release、節奏密集，最新 **v3.9.2「Phase scope inflation hot-fix (#133)」**（2026-05-18）剛上線，是 5-16 v3.8.0「L3 Claim-Faithfulness Locator + Audit」→ 5-17 v3.8.1／v3.8.2／v3.9.0「Cross-Index Triangulation Measurement」→ 5-18 v3.9.2 連 3 天 5 個 patch 的密集修補尾聲，主要圍繞引用稽核（claim audit）與 phase scope 控制。

### 授權與社群

授權 CC BY-NC 4.0（要求署名、禁商業使用）。Contributors API 顯示僅作者 [Imbad0202](https://github.com/Imbad0202) 一人累計 402 commits，外部 PR 雖多但合入後不列入 contributor 表，屬「單人主導 + 外部 issue/PR 補丁」型 governance。48 watcher、1,169 forks、Discussions 已開啟，homepage 連到作者 Buy Me a Coffee 頁面。Topics 標 `academic-pipeline`、`peer-review`、`prompt-engineering`、`claude-code`。
