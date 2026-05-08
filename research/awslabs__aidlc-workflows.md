---
repo: awslabs/aidlc-workflows
first_seen: 2026-05-09
last_updated: 2026-05-09
appearances: [2026-05-09]
growth_appearances: []
has_releases: true
latest_release: v0.1.8
tags: [開發者工具, Skill 外掛, 企業級]
domain: 開發者工具
form: Skill 外掛
themes: [企業級]
---

# [awslabs/aidlc-workflows](https://github.com/awslabs/aidlc-workflows)

> 研究日期：2026-05-09
> 研究來源：https://github.com/awslabs/aidlc-workflows
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[awslabs/aidlc-workflows](https://github.com/awslabs/aidlc-workflows) 是 AWS Labs 官方開源的 **AI-Driven Development Life Cycle (AI-DLC)** steering rules 套件，把一套三階段（Inception / Construction / Operations）的「自適應軟體開發流程」拆成 markdown 規則檔，丟進 [Kiro](https://kiro.dev/)、[Amazon Q Developer](https://aws.amazon.com/q/developer/)、[Cursor](https://www.cursor.com/)、[Claude Code](https://github.com/anthropics/claude-code)、[Cline](https://github.com/cline/cline)、GitHub Copilot 或 OpenAI Codex 任一個 coding agent 後，agent 就會被「掛繩」按照需求分析 → 風險評估 → 元件設計 → 編碼測試的順序走完，並在關鍵節點停下來等人類核可。

## 作者與起源

AI-DLC 不是社群專案，是 AWS 內部解決方案架構師團隊的方法論產物。AWS DevOps & Developer Productivity Blog 在 [2025-11-29 的開源公告](https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc/) 列出四位主要作者：Raja SP（Principal Solutions Architect）、Raj Jain（Senior SA, Developer Specialist）、Siddhesh Jog（Senior SA）、Will Matos（Principal Specialist SA）。GitHub repo 建立於 2025-11-13，2026-01-22 釋出 v0.1.0，方法論本身在 [re:Invent 2025 session DVT214](https://dev.to/kazuya_dev/aws-reinvent-2025-introducing-ai-driven-development-lifecycle-ai-dlc-dvt214-32b) 公開亮相。AWS 官方宣稱已跑過 100+ 客戶實驗，回報 10–15 倍生產力提升、40–60% 缺陷下降——這些都是 AWS 自己統計的數字，未經第三方驗證。

## 核心架構 / 主要概念

repo 結構簡單，主體就是規則文件樹：

- `aidlc-rules/aws-aidlc-rules/` — 核心 workflow 規則，core-workflow.md 是 entry point
- `aidlc-rules/aws-aidlc-rule-details/` — 各階段細部條件規則
- `extensions/` — 可選的 layered rules（security baseline、property-based testing 等）
- `scripts/aidlc-evaluator/` — Python 評估工具
- `.kiro/`、`.claude/` — 對應 IDE 的 steering 檔位置

**三階段自適應 workflow**：Inception 決定 *what / why*（需求、設計、風險評估）、Construction 決定 *how*（元件設計、程式生成、測試）、Operations 處理部署監控。AI-DLC 強調 workflow 的**廣度**（選擇要走哪些 stage）和**深度**（每個 stage 多深）都會根據意圖複雜度動態調整——簡單修改不必走完整流程。安裝方式是抓 release zip，把規則資料夾 copy 到 IDE 的 rules 目錄，然後在對話開頭打「Using AI-DLC, …」啟動。

## 設計哲學

README 列出五條 tenet：No Duplication、Methodology First、Reproducible、Agnostic、Human in the Loop。AWS 開源公告把整套方法論的核心精神濃縮成一句口號：

> "Humans decide and validate, AI plans and executes."
>
> （由人類決定與驗證，由 AI 規劃與執行。）

這句話精準切割了責任邊界：AI 負責把流程跑完整、產出計畫與程式碼，人類負責在每個 checkpoint 拍板。它故意對立於 vibe coding 與全自動 agent，把「可預測、可重現、可審計」放在「速度、彈性」之前。

## 目標使用者與適用情境

主要受眾是**企業內部的開發團隊與架構師**，特別是需要合規 / 稽核軌跡、又想用 AI coding agent 加速的場景：金融、醫療、政府等已經在跑 AWS 的 regulated industry。它**不適合** vibe coding、快速 prototyping，或想換個方式寫 LeetCode 的個人開發者——強制走完三階段會比直接寫慢很多。也不適合堅持單一 LLM API、不想學 IDE rules 機制的團隊。

## 與類似專案的差異

| 對手 | 本專案差異 |
|---|---|
| [github/spec-kit](https://github.com/github/spec-kit) | spec-kit 是 GitHub 推的 CLI 工具，產生 spec slash commands；AI-DLC 是 markdown rules 套件，附帶 Inception/Construction/Operations 三段式生命週期模型，並把 DDD 設為預設方法論。spec-kit 偏 spec-driven，AI-DLC 偏 lifecycle-driven。 |
| [Kiro](https://kiro.dev/) | Kiro 是 AWS 自家的 spec-driven IDE，AI-DLC 規則本來就為 Kiro Steering 而設計；差異在 AI-DLC 是 IDE-agnostic 規則層，Kiro 是裝載這套規則的完整 IDE。實務上 AWS 把兩者綁在一起賣。 |

[Martin Fowler 的 SDD 工具比較](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) 與 [marmelab 的「Spec-Driven Development: The Waterfall Strikes Back」](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html) 都把 Kiro / spec-kit 視為現代 waterfall 的回潮，AI-DLC 也吃同一波風口。

## 外部評論

- [eleks.com（Sergii Bataiev，2026-01-20）](https://eleks.com/blog/aws-ai-dlc-explained/)：定位 AI-DLC 為「治理工具而非生產力工具」，原文評語是 AI-DLC「以可重現與治理換取速度與彈性」、「重流程開銷」、「對 Amazon Q 與 Kiro 的平台鎖定」。
- [Medium / Data Science Collective（Peter Tilsen，2025-08-21）](https://medium.com/data-science-collective/the-ai-driven-development-lifecycle-ai-dlc-a-critical-yet-hopeful-view-edc966173f2f)：認為 AI-DLC 把 LLM 「錨在剛性流程結構與規定儀式裡」是真正的創新，但批評它把學習與校準混為一談、缺乏跨階段 context memory 的實作細節，且 cookbook 風格雖然降低採用門檻，卻無法導向方法論本身的演化。
- [DEV Community（kazuya_dev，re:Invent 2025 DVT214 紀錄）](https://dev.to/kazuya_dev/aws-reinvent-2025-introducing-ai-driven-development-lifecycle-ai-dlc-dvt214-32b)：整理 session 內容與 AWS 公布的 10–15 倍生產力 / 40–60% 缺陷下降 / 300–500% ROI 數字，未做質疑。
- HN / Reddit / Twitter / 中文社群暫無顯著討論，**資料不足**（已搜過 HN、Reddit、Twitter 與中文圈關鍵字）。

## Release 狀態 / 時間軸

`has_releases: true`。共 9 個 release，全部由 github-actions[bot] 自動發版：

- 2025-11-13：repo 建立
- 2025-11-29：[AWS DevOps blog 開源公告](https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc/)
- 2026-01-22：v0.1.0（首個 tagged release）
- 2026-02-24：v0.1.4 / v0.1.5 同日連發
- 2026-04-20：v0.1.8（最新版，本次研究時點）

平均約三週一版，仍處於 0.1.x pre-1.0 快速迭代期。

## 授權與社群

- License：**MIT-0**（MIT No Attribution，連 attribution 都不要求，比 MIT 還寬鬆，AWS Labs 樣板專案常用）
- Stars：1,700（GitHub Trending #7）／Forks：303（fork ratio 約 17.8%，企業內部接著改的訊號很強）
- Open issues：46／Watchers：1,700／Subscribers：36
- Contributors：約 22 人，前三大為 raj-jain-aws（40 commits）、scottschreckengaust（28）、leandrodamascena（24），都是 AWS 自家工程師
- 主要語言 Python（評估腳本），但實質產物是 markdown 規則檔
- 約 6 個月（2025-11 → 2026-05）累積 1,700 stars，平均約 280 stars / 月，2026-05-09 單日 +92 stars 顯示在 trending 後出現拉抬

## 資料來源

**本體**
- [GitHub repo](https://github.com/awslabs/aidlc-workflows)
- [README.md](https://github.com/awslabs/aidlc-workflows/blob/main/README.md)
- [core-workflow.md](https://github.com/awslabs/aidlc-workflows/blob/main/aidlc-rules/aws-aidlc-rules/core-workflow.md)
- [WORKING-WITH-AIDLC.md](https://github.com/awslabs/aidlc-workflows/blob/main/docs/WORKING-WITH-AIDLC.md)
- [Releases 頁](https://github.com/awslabs/aidlc-workflows/releases)
- [DeepWiki 自動文件](https://deepwiki.com/awslabs/aidlc-workflows)

**AWS 官方**
- [AI-Driven Development Life Cycle: Reimagining Software Engineering](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/)
- [Open-Sourcing Adaptive Workflows for AI-DLC](https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc/)
- [Building with AI-DLC using Amazon Q Developer](https://aws.amazon.com/blogs/devops/building-with-ai-dlc-using-amazon-q-developer/)

**第三方評論**
- [eleks.com — AI-DLC Explained](https://eleks.com/blog/aws-ai-dlc-explained/)
- [Medium — A critical, yet hopeful view](https://medium.com/data-science-collective/the-ai-driven-development-lifecycle-ai-dlc-a-critical-yet-hopeful-view-edc966173f2f)
- [DEV — re:Invent 2025 DVT214 紀錄](https://dev.to/kazuya_dev/aws-reinvent-2025-introducing-ai-driven-development-lifecycle-ai-dlc-dvt214-32b)

**同類工具**
- [github/spec-kit](https://github.com/github/spec-kit)
- [Kiro IDE](https://kiro.dev/)
- [Martin Fowler — Understanding Spec-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [marmelab — Spec-Driven Development: The Waterfall Strikes Back](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)

## 更新紀錄
