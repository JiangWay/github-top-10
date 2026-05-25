---
repo: mukul975/Anthropic-Cybersecurity-Skills
first_seen: 2026-05-24
last_updated: 2026-05-25
appearances: [2026-05-24, 2026-05-25]
growth_appearances: [2026-05-24, 2026-05-25]
has_releases: true
latest_release: v1.2.0
tags: [資安, Skill 外掛, 開源替代, 企業級]
domain: 資安
form: Skill 外掛
themes: [開源替代, 企業級]
---

# [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)

## 深度研究（2026-05-24 首次）

### 專案定位

[mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)（7,239 stars / 999 forks / 2026-02-25 建立 / Apache-2.0 / Python）是個人開發者 [mukul975](https://github.com/mukul975)（Mahipal）獨立維護的「最大規模開源 AI agent 資安技能庫」——把 754 條結構化資安工作流（涵蓋雲端安全 60、威脅獵捕 55、Web 應用安全 42、惡意程式分析 39、數位鑑識 37 等共 26 個資安子領域）以 agentskills.io 開放標準封裝，每條 skill 同時對映 MITRE ATT&CK v18 / NIST CSF 2.0 / MITRE ATLAS v5.4 / MITRE D3FEND v1.3 / NIST AI RMF 1.0 五大資安治理框架。與專案名稱不同，**官方聲明此倉與 Anthropic PBC 無隸屬關係**。今日以 +238 stars / growth_rate 3.30% 首登絕對榜 #9，承接昨日 [dotnet/skills](https://github.com/dotnet/skills) Microsoft 官方 Skill marketplace 上榜後的「特定垂直域大規模 Skill 集合」延燒。

### 核心架構 / 主要概念

- **目錄結構**：`skills/[skill-name]/` 下含 `SKILL.md`（YAML frontmatter + Markdown 工作流）+ `references/`（標準對映、技術文件）+ `scripts/`（可用 helper code）+ `assets/`（範本 / 檢核表 / 報告模板）
- **Progressive Disclosure**：agent 先掃 754 個 frontmatter（每個約 30 tokens，全掃約 22.6K tokens）後僅載入命中的 top skills（每個 500–2,000 tokens 完整版），保留 context window
- **跨平台安裝**：透過 `npx skills add mukul975/Anthropic-Cybersecurity-Skills` 一鍵裝載至 Claude Code / GitHub Copilot / Cursor / Codex CLI / Gemini CLI / Cline / Aider / Continue / Roo Code / Amazon Q Developer 等 20+ agentskills.io 兼容平台
- **五框架交叉對映**：單一 skill（例 `analyzing-network-traffic-of-malware`）同時標註 ATT&CK T1071 + NIST CSF DE.CM + ATLAS AML.T0047 + D3FEND D3-NTA + AI RMF MEASURE-2.6
- **無 LLM 生成內容**：所有 workflow 為實務人員手寫流程，附可執行腳本與驗證步驟，非 LLM summary

### 目標使用者

藍隊（threat hunting / IR / DFIR）與紅隊（pentest / red team）的個人實務人員、SOC 自動化工程師、想在 AI coding agent 中加掛資安垂直能力的 DevSecOps、教育機構訓練 AI 結合資安課程的講師、需要把資安治理框架機器化以串接 agent workflow 的企業合規團隊。

### 與類似專案的差異

- 與 [anthropics/skills](https://github.com/anthropics/skills)（Anthropic 官方 Skill 模板倉）相比：本檔為**單一垂直域大規模填充**（754 條 / 26 領域），官方倉為跨垂直域通用模板示例
- 與 [dotnet/skills](https://github.com/dotnet/skills)（2,704 stars Microsoft .NET 12 個官方 Skill）相比：規模差 60 倍，本檔走「個人作者大規模垂直域 Skill」、dotnet 走「廠商小規模官方 Skill」兩種路線
- 與 [Z4nzu/hackingtool](https://github.com/Z4nzu/hackingtool) 等傳統 awesome-list 相比：傳統清單為「工具索引給人讀」，本檔為「workflow + script 給 agent 執行」並對映五個治理框架做合規追蹤

### 外部評論

- [Hermes Atlas 收錄頁](https://hermesatlas.com/projects/mukul975/Anthropic-Cybersecurity-Skills) 將本檔列入 Hermes Agent Skill 註冊表
- [skillsllm.com 收錄頁](https://skillsllm.com/skill/anthropic-cybersecurity-skills) 列為「Anthropic-Cybersecurity-Skills - AI Agents」分類
- [Fazal《Claude Skills & AI-Powered Cybersecurity: The Complete Guide to Building Intelligent Security Agents》](https://fazal-sec.medium.com/claude-skills-ai-powered-cybersecurity-the-complete-guide-to-building-intelligent-security-7bb7e9d14c8e)（Medium）長文討論 Claude Skill 在資安自動化的應用
- HN / Reddit r/netsec r/cybersecurity 中文圈：目前未發現顯著討論串

### Release 狀態

共 3 個 release：[v1.0.0](https://github.com/mukul975/Anthropic-Cybersecurity-Skills/releases/tag/v1.0.0)（2026-03-11 首發）→ [v1.1.0](https://github.com/mukul975/Anthropic-Cybersecurity-Skills/releases/tag/v1.1.0)（2026-03-21「753 Cybersecurity Skills」）→ [v1.2.0](https://github.com/mukul975/Anthropic-Cybersecurity-Skills/releases/tag/v1.2.0)（2026-04-06「Five Framework Coverage」加入第 5 個框架 NIST AI RMF）。發版節奏約每 2 週 1 個 minor，從 1.1 → 1.2 為「能力面擴張」非 patch 累積。

### 授權與社群

- **授權**：Apache-2.0（清晰商用友善）
- **貢獻結構**：高度集中—[mukul975](https://github.com/mukul975) 一人 132 commits（96% 以上）、[juliosuas](https://github.com/juliosuas) 13 commits、`claude[bot]` 1 commit；典型「個人主導 + 自動 PR bot 點綴」結構
- **量化指標**：7,239 stars / **999 forks**（高 fork 率反映企業 / 個人實際下載入庫）/ 15 open issues
- **Topics**：`ai-agents`, `claude-code`, `cloud-security`, `cybersecurity`, `devsecops`, `ethical-hacking`, `incident-response`, `mcp`, `mitre-attack`, `nist-csf`, `pentesting`, `red-team`, `threat-hunting`, `threat-intelligence` 共 20 個
- **Homepage**：<https://mahipal.engineer/Anthropic-Cybersecurity-Skills/>（作者個人網域 GitHub Pages 文件）

## 資料來源

**本體**
- Repo：<https://github.com/mukul975/Anthropic-Cybersecurity-Skills>
- README：<https://github.com/mukul975/Anthropic-Cybersecurity-Skills/blob/main/README.md>
- Releases：<https://github.com/mukul975/Anthropic-Cybersecurity-Skills/releases>
- Skills 目錄：<https://github.com/mukul975/Anthropic-Cybersecurity-Skills/tree/main/skills>
- 作者頁：<https://mahipal.engineer/Anthropic-Cybersecurity-Skills/>

**外部評論與收錄**
- [Hermes Atlas 收錄頁](https://hermesatlas.com/projects/mukul975/Anthropic-Cybersecurity-Skills)
- [skillsllm.com 收錄頁](https://skillsllm.com/skill/anthropic-cybersecurity-skills)
- [Fazal — Medium 長文](https://fazal-sec.medium.com/claude-skills-ai-powered-cybersecurity-the-complete-guide-to-building-intelligent-security-7bb7e9d14c8e)
