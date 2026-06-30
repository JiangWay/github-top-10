---
repo: diegosouzapw/OmniRoute
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: true
latest_release: v3.8.42
tags: [LLM 基礎建設, 框架, 開源替代]
domain: LLM 基礎建設
form: 框架
themes: [開源替代]
---

# [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)

> 研究日期：2026-06-30
> 研究來源：<https://github.com/diegosouzapw/OmniRoute>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) 是一個 MIT 授權的本機 AI gateway，跑在 `http://localhost:20128/v1`，把 [anthropics/claude-code](https://github.com/anthropics/claude-code)、Codex、Cursor、[cline/cline](https://github.com/cline/cline)、Copilot 等 16+ coding agent 透過一個 endpoint 反代到 160+ provider（其中 50+ 有免費 tier、11 個永久免費），主力賣點是 RTK + Caveman + LLMLingua-2 三引擎堆疊的 token 壓縮（README 自述 15-95% 壓縮率、tool-heavy session 平均 89%）與毫秒級 auto-fallback。

## 作者與起源

主要作者 `diegosouzapw`（GitHub user id 8016841）2026-02-13 建立 repo，到 6-30 為止個人累計 2,957 次 commit，是絕對主力；contributor 排名第 2 的 `oyi77` 累計 188 次，第 3 名 `rdself` 108 次，加上 `dependabot[bot]` 99 次與 `christopher-s` 70 次。截至研究日 contributor 總數已達 193 人，但 commit 量呈現重度單人主導的長尾分布。

repo 描述（取自 GitHub API）原文："Never stop coding. Free AI gateway: one endpoint, 160+ providers (50+ free), connect Claude Code, Codex, Cursor, Cline & Copilot to FREE Claude/GPT/Gemini. RTK+Caveman stacked compression saves 15-95% tokens, smart auto-fallback, MCP/A2A, multimodal APIs, Desktop/PWA."—專案目標明確指向「coding agent 用戶被 Claude / OpenAI 月費或 token 配額壓制」這個情境，並把官方網站 `omniroute.online` 放進 homepage 欄位。作者沒有公開個人簡介或 LinkedIn，無法判斷其商業背景；search 結果裡也未見作者出面在 HN / Reddit 自我宣傳的痕跡。

值得注意：search 出一個明顯仿作 [decolua/9router](https://github.com/decolua/9router)，描述句式幾乎複製 OmniRoute（「Connect Claude Code, Codex, Cursor, Cline, Copilot, Antigravity to FREE Claude/GPT/Gemini via 40+ providers」），但 provider 數量縮水、壓縮率宣稱也只有 -40%。

## 核心架構 / 主要概念

OmniRoute 是 100% TypeScript、Node.js ≥ 22 的單體 server，repo 體積 221 MB（含 14,965 個自動化測試）。核心抽象分為四層：

- **Routing 層**：17 種路由策略，含 priority、round-robin、cost-optimized、context-relay；底層用 9-factor scoring 挑 model，配 circuit breaker 與 connection cooldown。auto-fallback 文件宣稱可在毫秒級跨 237 provider 切換。
- **Compression 層**：9 個可組合 engine 堆疊，包含 RTK（command-output filtering，針對 `gradle`、`gradlew`、`dotnet build|test` 等 tool output 過濾）、Caveman（prose 壓縮，按語言出 rule pack：en / es / id / pt-BR 已完整，de / fr / ja / zh 為 v3.8.42 才補齊）、LLMLingua-2（ML-based semantic pruning）、以及 dedup / archival / whitespace 等輔助 engine。v3.8.42 release notes 特別新增 `pipeline-inflation-guard`：若堆疊壓縮後的 token 數反而 ≥ 原始，會直接 fallback 回未修改的原請求並記 warning，避免壓出比原文還大的 payload。
- **協定層**：OpenAI / Anthropic / Google Gemini 三種 API 介面互轉；內建 MCP server（87 個 tool、3 種 transport：stdio / HTTP / SSE、30 個 scope）與 A2A（agent-to-agent，JSON-RPC 2.0 + SSE streaming）。
- **儲存層**：state / log 用 better-sqlite3，保留 LowDB legacy 支援；API key 以 AES-256-GCM 加密儲存。

發布渠道含 `npm install -g omniroute`、Docker 多架構 image（AMD64 / ARM64）、Electron 桌面 app（Win / macOS / Linux）、Android 透過 Termux 跑、PWA。

## 設計哲學

repo description 開頭那句 "Never stop coding." 是整個專案的核心命題：當 coding agent 因為 quota、付費限制、provider downtime 而中斷時，gateway 應該透明接手切換。對應到實作，是 v3.8.42 才補上的 inflation guard，原文 release notes：

> "If the fully-stacked engines produce a body that did not actually shrink — its token count is `>=` the original — the compressed body is discarded and the verbatim original request is sent upstream instead, with a `pipeline-inflation-guard` warning recorded in the compression stats. This is safe by construction (the only fallback is the unmodified original, always a valid payload)."

中文意旨：壓縮層的最壞情況不能比不壓縮還差，所以保底永遠是原請求。這條 guard 與 router 的 fallback 邏輯共享同一個設計取向，也就是多層 graceful degradation，每一層失敗都能退回上一層的可用狀態。文件作者特別強調這是「safe by construction」，與打 patch 修 bug 的處理方式不同。

## 目標使用者與適用情境

明確適用：

- 重度使用 Claude Code / Cursor / Cline 等 coding agent、被 Claude Pro / OpenAI Plus 月費或 5-hour rate limit 卡到的個人開發者。
- 想 self-host gateway、不願把 prompt 過第三方 SaaS 的工作室或小團隊。
- 需要在多個免費 provider（Kiro、Qoder、Pollinations、LongCat 等）之間自動輪轉以延長免費額度的 hobbyist。

明確不適用：

- 企業合規場景（沒有 SOC2 / HIPAA 認證，作者也沒主張）。
- 對 latency 敏感的線上 API 服務，因為多一層 gateway + 壓縮 pipeline 必然加 latency，這在 agentconn 的 review 也被點名。
- 對輸出內容必須 byte-perfect 的場景，因為 Caveman 壓縮是 lossy（會做 dedup、刪 filler、改寫成縮寫），高度結構化的 code payload 壓縮率會掉。

## 與類似專案的差異

OmniRoute 在 repo 內就放了一份 [docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md](https://github.com/diegosouzapw/OmniRoute/blob/main/docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md)，下表是擷取後加上 [BerriAI/litellm](https://github.com/BerriAI/litellm)、[Portkey-AI/gateway](https://github.com/Portkey-AI/gateway)、[songquanpeng/one-api](https://github.com/songquanpeng/one-api)、OpenRouter 的比對（數字以 OmniRoute 自家文件為準，他方數字未經獨立驗證）：

| 維度 | OmniRoute 3.8 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | [Portkey-AI/gateway](https://github.com/Portkey-AI/gateway) | [songquanpeng/one-api](https://github.com/songquanpeng/one-api) | OpenRouter |
|---|---|---|---|---|---|
| Provider 數 | 160-237（依文件版本） | ~100 | ~30 | 數十（社群擴充） | ~50 |
| Self-hostable | MIT | MIT | 付費版才完整 | MIT | 否（SaaS） |
| Token 壓縮 | RTK + Caveman + LLMLingua-2 | 無 | 無 | 無 | 無 |
| 內建 MCP server | 87 tools / 30 scopes | 無 | 無 | 無 | 無 |
| A2A 協定 | JSON-RPC 2.0 + SSE | 無 | 無 | 無 | 無 |
| Fallback 策略 | 17 種 | priority-based | weighted | 渠道輪詢 | tier-based |
| 桌面 / 行動端 | Electron + PWA + Termux | CLI / SDK only | SaaS dashboard | Web UI | SaaS only |
| 主要客戶設定點 | coding agent base URL 改成 localhost | Python SDK 為主 | SDK + dashboard | API key 代發 | API key 代發 |

選型建議：

- 想要**輕量、純 SDK 整合進自家 Python 服務**：選 [BerriAI/litellm](https://github.com/BerriAI/litellm)，文件、PyPI 發布節奏與 OpenAI SDK 相容性最穩。
- 想要**企業級 dashboard 與 observability**：選 [Portkey-AI/gateway](https://github.com/Portkey-AI/gateway) 或其 SaaS。
- 想要**中國區友善、給人用 OpenAI key 代發**：選 [songquanpeng/one-api](https://github.com/songquanpeng/one-api)，社群最熟。
- 想要**把 Claude Code / Cursor 接到一堆免費 provider 並做 token 壓縮**：OmniRoute 是目前唯一這樣定位的 self-host gateway，9router 等仿作功能子集少很多。

## 外部評論

第三方公開評論在研究日仍稀少，主要來源：

- [agentconn.com 的 OmniRoute 條目](https://agentconn.com/agents/omniroute/)（2026-06-28 收錄、4.0/5 評分）摘錄：「self-hosted requirement demands local setup」「adds latency between agent and provider」「free tier access requires multiple provider accounts」「token compression is lossy for some content types — highly structured code may see lower ratios」「rapid development cycle means evolving feature sets」。這是目前找得到唯一具體點出 trade-off 的第三方來源。
- 未見 Hacker News 顯著討論串，搜尋 `"OmniRoute" hacker news` 與 `"omniroute" site:news.ycombinator.com` 皆無命中。
- 未見 Reddit r/LocalLLaMA / r/ClaudeAI 顯著討論串，**資料不足**，可能是因為專案才 4 個月、且作者沒主動在社群推。
- search 結果出現的 [decolua/9router](https://github.com/decolua/9router) 是明顯仿作（README 句式與 logo 套路一致），但不是評論，列為「同類工具」而非「外部評論」。

## Release 狀態 / 時間軸

- **2026-02-13**：repo 建立。
- **發版節奏**：截至 2026-06-30 共 30 個 release（gh API 取得頁面），全部命名為 v3.x，最早可見的 v3.8.13 在 2026-06-06 發布。代表前 3.5 個月就已經跑到 3.x 主版號，幾乎每天 1-2 個 patch release。光是 6 月（6-06 到 6-30）就連續發了 30 個版本，平均 0.8 天一個。
- **2026-06-30 09:55 UTC**：最新 release [v3.8.42](https://github.com/diegosouzapw/OmniRoute/releases/tag/v3.8.42)，新增三件事：pipeline inflation guard、Caveman 的 de / fr / ja rule pack 補齊 dedup + ultra 類別、新增 zh（文言）input-side rule pack；同時把 Gradle 與 .NET CLI 加入 RTK tool-output filter catalog。
- **爆紅點**：研究日當日（2026-06-30）首次進入 GitHub trending 絕對榜 #4，當日 +617 stars。在這之前累計到 7,637 stars 的成長曲線在 GitHub trending 之外的渠道沒有明顯標誌性事件。

## 授權與社群

量化錨點（取自 `gh api repos/diegosouzapw/OmniRoute`，2026-06-30 15:50 UTC 快照）：

- **License**：MIT
- **Stars**：8,255
- **Forks**：1,376（fork / star = 16.7%，明顯高於同類 gateway 專案的個位數百分比，暗示有不少人想自架 / 改）
- **Open issues**：147
- **Watchers**：8,255 ／ subscribers：28（watcher 等於 stars 是 GitHub 預設行為，subscribers 才是真正開通知的人）
- **主要語言**：TypeScript
- **Topics**：`a2a`、`ai-agents`、`ai-gateway`、`anthropic`、`claude`、`claude-code`、`cline`、`codex`、`copilot`、`cursor`、`deepseek`、`free-ai`、`gemini`、`gemini-cli`、`llm-gateway`、`mcp`、`openai`、`openai-proxy`、`qwen`、`token-saver`
- **Contributors**：193 人，但 `diegosouzapw` 個人 2,957 次 commit 佔絕對多數，第 2 名 188 次。
- **Release 速率**：6 月 30 個 release，平均 0.8 天 1 個。
- **Stars 增長速率**：研究日當日 +617 / 已累計 8,254，growth rate ≈ 7.47%（增長榜內排序，當日為絕對榜 #4）。

## 資料來源

**本體**

- [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)（GitHub repo）
- [Releases](https://github.com/diegosouzapw/OmniRoute/releases)
- [README.md](https://github.com/diegosouzapw/OmniRoute/blob/main/README.md)
- [docs/guides/FEATURES.md](https://github.com/diegosouzapw/OmniRoute/blob/main/docs/guides/FEATURES.md)
- [docs/reference/FREE_TIERS.md](https://github.com/diegosouzapw/OmniRoute/blob/main/docs/reference/FREE_TIERS.md)
- [docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md](https://github.com/diegosouzapw/OmniRoute/blob/main/docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md)
- [Docker image diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- [官網 omniroute.online](https://omniroute.online)

**第三方評論**

- [agentconn.com – OmniRoute review（2026-06-28）](https://agentconn.com/agents/omniroute/)
- HN / Reddit：研究日無顯著討論，已查 `"OmniRoute" hacker news`、`"omniroute" site:news.ycombinator.com`、`"OmniRoute" site:reddit.com`，皆無命中。

**同類工具**

- [BerriAI/litellm](https://github.com/BerriAI/litellm)
- [Portkey-AI/gateway](https://github.com/Portkey-AI/gateway)
- [songquanpeng/one-api](https://github.com/songquanpeng/one-api)
- [OpenRouter](https://openrouter.ai)
- [decolua/9router](https://github.com/decolua/9router)（疑似仿作）

## 更新紀錄
