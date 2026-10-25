---
repo: cloudflare/security-audit-skill
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: false
latest_release: null
tags: [資安, Skill 外掛, 企業級]
domain: 資安
form: Skill 外掛
themes: [企業級]
---

# [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)

> 研究日期：2026-10-25
> 研究來源：https://github.com/cloudflare/security-audit-skill
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) 是 Cloudflare 開源的**防守方**程式碼安全審計 skill：讓 coding agent 對一個 repo 跑六階段審計，輸出符合 JSON schema、經另一個 agent 獨立驗證的漏洞清單。

## 作者與起源

由 Cloudflare 組織發佈，2026-06-18 開源（依 [Tessl registry](https://tessl.io/registry/skills/github/cloudflare/security-audit-skill) 登錄日期）。commit 最多的是 `literally-dan`（11 commits），貢獻者人數少，屬公司內部流程整理後外放。今日單日 +2,264 stars，是當日絕對榜第一。

## 核心架構 / 主要概念

- **六階段 pipeline**：偵察 → 依覆蓋率找候選 → 候選驗證 → 結構化輸出 → 獨立驗證紀錄 → 中性報告
- **三份產出**：`architecture.md`、`findings.json`（對照 `report-schema.json`）、`REPORT.md`，附 Node.js validator 檢查 schema
- **找與驗分離**：找出漏洞的 agent 不能當驗證者；標為 `confirmed` 必須附完整 source trace 與可觀測結果
- **沙盒閘門**：沒有 OS 層 sandbox 時，候選一律停在 `needs_validation`，不執行目標程式碼
- **嚴重度**：以 likelihood × impact 推理，不走 checklist 打分

## 設計哲學

> "A coding-agent skill for multi-phase security audits with independently verified, machine-readable findings"

重點在最後兩個形容詞：findings 要能被機器讀（進 CI、進工單系統），也要經過獨立驗證（降低 LLM 誤報）。沙盒閘門是把「不確定就不執行」寫成硬規則。

## 目標使用者與適用情境

- 想在 PR 或 CI 階段加一道 agent 審計的平台安全團隊
- bug bounty 研究者用來做第一輪過濾
- **不適用**：沒有 sandbox 的本機環境（只能拿到 `needs_validation`）；需要合規認證報告的場景，skill 輸出不等於第三方稽核

## 與類似專案的差異

| 對手 | 對方做法 | 本專案的差異 |
|---|---|---|
| [semgrep/semgrep](https://github.com/semgrep/semgrep) | 規則比對式 SAST，速度快、可重現 | 走 LLM 語意推理加對抗驗證，可抓跨檔邏輯漏洞，但成本與不確定性較高 |
| [github/codeql](https://github.com/github/codeql) | 查詢語言建模資料流 | 不需寫 query；輸出由 agent 驗證而非規則保證 |
| [usestrix/strix](https://github.com/usestrix/strix) | 攻擊方 pentest agent，跑在 Docker 裡打 live target | 本專案偏原始碼審計，靠沙盒閘門限制執行 |

## 外部評論

- [Korben](https://korben.info/en/cloudflare-launches-ai-security-audit-skill.html)：介紹沙盒缺席時拒絕執行的設計與 Node.js 需求
- [Tessl registry](https://tessl.io/registry/skills/github/cloudflare/security-audit-skill)：登錄 2026-06-18 開源、MIT 授權
- [SmartScope](https://smartscope.blog/en/blog/cloudflare-security-audit-skill-capabilities-installation-usage-compatibility-2026/)：整理安裝方式與跨 agent 相容性
- 濫用風險：skill 本身只做審計不做利用，但 findings 若外流等同漏洞清單；README 未見 responsible disclosure 指引，資料不足
- 未見 HN / Reddit 主串討論，資料不足

## Release 狀態 / 時間軸

- 2026-06-18 開源
- 2026-10-25 登上 trending #1（+2,264）
- 尚無 GitHub Release，安裝指令 `npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit`

## 授權與社群

- 授權：MIT
- Stars 45,610 / Forks 2,831 / Subscribers 174
- 主語言：JavaScript
- 擁有者：組織（Cloudflare）
- 今日增長率 4.96%（+2,264 / 45,608）

## 資料來源

- **本體**：[GitHub repo](https://github.com/cloudflare/security-audit-skill)
- **第三方評論**：[Korben](https://korben.info/en/cloudflare-launches-ai-security-audit-skill.html)、[Tessl registry](https://tessl.io/registry/skills/github/cloudflare/security-audit-skill)、[SmartScope](https://smartscope.blog/en/blog/cloudflare-security-audit-skill-capabilities-installation-usage-compatibility-2026/)
- **同類工具**：[semgrep/semgrep](https://github.com/semgrep/semgrep)、[github/codeql](https://github.com/github/codeql)、[usestrix/strix](https://github.com/usestrix/strix)

## 更新紀錄
