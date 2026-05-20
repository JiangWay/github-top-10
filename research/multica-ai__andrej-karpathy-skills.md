---
repo: multica-ai/andrej-karpathy-skills
first_seen: 2026-05-21
last_updated: 2026-05-21
appearances: [2026-05-21]
growth_appearances: [2026-05-21]
has_releases: false
latest_release: null
tags: [教學資源, Skill 外掛, 開源替代]
domain: 教學資源
form: Skill 外掛
themes: [開源替代]
---

## 深度研究（2026-05-21 首次）

### 專案定位

[multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) 是開發者 [forrestchang](https://github.com/forrestchang)（Forrest Chang）於 2026-01-27 在讀完 Andrej Karpathy 同月 26 日的 X 貼文後 1 日內推出的「單檔 [CLAUDE.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md)」——把 Karpathy 從 80% 手刻轉為 80% agent 編碼後歸納的 3 大 LLM 編碼弱點（默默誤判 / 過度抽象 / 動到無關代碼）直接機器化成 4 條可掛載的 Claude Code 行為約束。MIT 授權、總大小僅 20 KB，本質是「給 Claude Code 一份 Karpathy 風格的 system prompt」。multica-ai 為組織鏡像，與原作者 personal repo [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) 為同步雙倉。

### 核心架構 / 主要概念

主檔 [CLAUDE.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md) 列 4 條原則：（1）**Think Before Coding**——明示假設、多解列舉、不會時停下；（2）**Simplicity First**——100 行能寫完別寫 1000 行、無預測性 feature；（3）**Surgical Changes**——只改要求範圍、不順手「優化」鄰近代碼、只清自己孤兒化的死碼；（4）**Goal-Driven Execution**——把祈使句轉為可驗證成功條件 + 測試 loop。倉內另有 [CURSOR.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CURSOR.md)、[.cursor/rules/karpathy-guidelines.mdc](https://github.com/multica-ai/andrej-karpathy-skills/tree/main/.cursor/rules)、[skills/karpathy-guidelines/SKILL.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md)、[.claude-plugin/](https://github.com/multica-ai/andrej-karpathy-skills/tree/main/.claude-plugin) marketplace 配置與 [EXAMPLES.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/EXAMPLES.md)、雙語 README。

### 目標使用者

主流是 Claude Code 重度使用者——尤其遇過「agent 自作主張改了不該改的檔」的人；同時兼容 Cursor 編輯器使用者。安裝兩條路：`/plugin marketplace add forrestchang/andrej-karpathy-skills` + `/plugin install andrej-karpathy-skills@karpathy-skills` 走插件路；或直接把 CLAUDE.md 複製到專案根目錄。對「初次寫 CLAUDE.md 不知從哪開始」的個人開發者特別有用，企業則可在此基礎追加 domain 規範。

### 與類似專案的差異

對比同期 Claude Code Skill 三檔：[anthropics/skills](https://github.com/anthropics/skills)（Anthropic 官方多 skill 倉、模組化大型 registry）、[obra/superpowers](https://github.com/obra/superpowers)（Jesse Vincent 個人 dotfiles 風格、29 skill 含 brainstorming/TDD/git-worktrees 全流程方法論）、[mattpocock/skills](https://github.com/mattpocock/skills)（Matt Pocock TypeScript 教學派、針對特定語言）——本檔最大差異是**極簡到只有 1 個檔**，不嘗試覆蓋整條工作流，只壓縮成「最小可貼上的 prompt 約束」，定位是「prompt as a library」而非「skill marketplace」。亦不同於 [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) 強調 Snyk 掃描 + 鎖檔的企業驗證 registry。

### 外部評論

- [TechTimes 報導](http://www.techtimes.com/articles/316798/20260518/karpathy-inspired-claudemd-passes-220000-combined-github-stars-four-rules-that-stop-ai-breaking.htm) 指 personal repo + organization mirror 合計 22 萬 stars 列入 GitHub 史上增速最快倉庫之一。
- [AlphaSignal Substack](https://alphasignalai.substack.com/p/karpathy-inspired-claudemd-how-to) 30 秒上手指南推廣。
- [Agentpedia 完整指南](https://agentpedia.codes/blog/karpathy-claude-code-skills-guide) 拆解 4 原則用法。
- [Luca Berton 部落格](https://lucaberton.com/blog/karpathy-claude-md-llm-coding-principles-2026/) 個案應用。
- [Level Up Coding（Yanli Liu）](https://levelup.gitconnected.com/the-4-lines-every-claude-md-needs-2717a46866f6) 將 4 原則進一步壓縮為 4 行版本。
- [MasteringProductHQ 批評文](https://www.masteringproducthq.com/p/what-karpathys-claudemd-misses-and) 指出純技術 4 原則缺產品語境、企業團隊需自製版本——本研究檔目前看到的唯一反方視角。
- 原始 Karpathy 推文：[https://x.com/karpathy/status/2015883857489522876](https://x.com/karpathy/status/2015883857489522876)。

### Release 狀態

`has_releases: false`——repo 未發任何 GitHub Release，全靠 main 分支 push 驅動。最近一次 push 為 2026-04-20，updated_at 2026-05-20，活躍度由 commit 流而非版本管理承載；與「單檔 prompt 倉」性質一致，本就不需要 release 切版。

### 授權與社群

授權欄位 `license: null`（API 未識別 SPDX），但 README 與 [LICENSE](https://github.com/multica-ai/andrej-karpathy-skills) 明示為 **MIT**。今日 stars 經 `gh api` 驗證 **140,427**（trending 報 140,424 / 2,620 today，誤差 < 0.01% 屬正常 cache）、forks **14,415**、watchers **761**、open issues **95**、open PRs **多**（`has_pull_requests: true`、`has_issues: false` 表示走 PR 路線、issue 關閉了）。貢獻者前列：[forrestchang](https://github.com/forrestchang)（17）、[back1ply](https://github.com/back1ply)（5）、[herobrine19](https://github.com/herobrine19)（2）、其餘 4 人各 1，呈典型「個人主導 + 社群微調」模式。
