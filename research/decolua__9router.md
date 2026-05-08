---
repo: decolua/9router
first_seen: 2026-05-08
last_updated: 2026-05-09
appearances: [2026-05-08, 2026-05-09]
growth_appearances: [2026-05-08, 2026-05-09]
has_releases: true
latest_release: v0.4.20
tags: [LLM 基礎建設, 應用程式, 自架, 開源替代]
domain: LLM 基礎建設
form: 應用程式
themes: [自架, 開源替代]
---

# [decolua/9router](https://github.com/decolua/9router)

## 深度研究（2026-05-08 首次）

### 專案定位
9Router 是一支跑在 `localhost:20128` 的本機 AI gateway，把 Claude Code、Codex、Cursor、Cline、Copilot、Antigravity、OpenClaw 等 CLI／IDE 客戶端，路由到 40＋ provider 與 100＋ 模型。賣點是「FREE AI coding」：用 Kiro AI、OpenCode Free、Vertex $300 credits 等免費通道吃掉日常用量，並以 RTK token saver 自動壓縮 `tool_result`，宣稱省 20–40% token。MIT、Next.js dashboard、npm 一行裝。

### 核心架構 / 主要概念
依 README 流程圖：客戶端把 endpoint 改成 `http://localhost:20128/v1`，9Router 內部完成 (1) 格式翻譯（OpenAI ↔ Anthropic Messages API）、(2) RTK token 壓縮、(3) 配額追蹤、(4) OAuth token 自動 refresh。Routing 採三層 fallback：Tier 1 訂閱（Claude Code／Codex／Copilot OAuth）→ Tier 2 廉價 API（GLM ~$0.6/1M、MiniMax ~$0.2/1M）→ Tier 3 免費（Kiro、OpenCode Free、Vertex）。同 provider 多帳號可 round-robin。Dashboard 是 Next.js（npm package 名 `9router`，倉庫內部代號 `9router-app`），Provider 連線多走 OAuth 而非貼 API key。

### 目標使用者
- Claude Code／Codex 訂閱用戶想榨乾每月配額、用完自動續命到免費通道
- 對「不想付月費卻要 Claude Sonnet 4.5」極度敏感的個人開發者，特別是越南、印尼、中國等 README 已本地化的市場
- 已在用 Cline／Cursor／Copilot 但常撞 rate limit 的人

### 與類似專案的差異
- 對比 [BerriAI/litellm](https://github.com/BerriAI/litellm)：litellm 偏 SDK／server，給後端服務當 LLM 代理；9Router 強調 GUI dashboard ＋ OAuth ＋ 免費 provider 預設清單，是「桌面端／個人」工具。
- 對比 [songquanpeng/one-api](https://github.com/songquanpeng/one-api)：one-api 是商用化 API key 分發平台；9Router 不收費、本機跑、預載免費 OAuth 通道。
- 對比 [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)：後者只攔 `ANTHROPIC_BASE_URL` 給 Claude Code 用；9Router 則同時處理 OpenAI 相容層與 Anthropic Messages 格式互轉，支援更多客戶端與 RTK 壓縮。
- 對比 [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio)：Cherry 是 chat 客戶端；9Router 是給 CLI／IDE 接的 gateway，定位互補不重疊。

### 外部評論
- [9router npm 頁](https://www.npmjs.com/package/9router) 顯示 v0.4.20、月下載量持續成長，是真實在用的工具而非 vapor。
- [BuildWithAngga（印尼開發者教學站）的「Mengenal Apa itu 9Router」介紹文](https://buildwithangga.com/tips/mengenal-apa-itu-9router-beserta-benefit-ketika-pakai-ai)，把 9Router 定位成「省訂閱費」工具。
- [openaitoolshub 的 Kiro 評測](https://www.openaitoolshub.org/en/blog/kiro-review-amazon-ide) 與 [Kiro 官方 Pricing 頁](https://kiro.dev/pricing/) 的對照，揭示一個關鍵落差：Kiro 官方僅提供 50 credits 永久免費 + 付費 tier $20–$200/月，9Router README 卻把它列為「Unlimited FREE Claude 4.5」——這個落差是本案最大的合規風險點。
- YouTube [BuildAIWithHamid 的「Claude Code FREE Forever」](https://www.youtube.com/watch?v=o3qYCyjrFYg) 與 [Mì AI 越南語教學](https://www.youtube.com/watch?v=X69n5Lm06Yw) 推升早期社群擴散，README 也主動收錄這些影片。

### Release 狀態
有 release，截至 2026-05-08 共 30 個 tag，最新 `v0.4.20`（2026-05-07，新增 CommandCode provider 支援）。發版頻率極高，5 月一週內已發三版（v0.4.18 → v0.4.20），仍處於每日小步迭代階段。

### 授權與社群
MIT。`master` 為預設分支。stars 4,393、forks 966、subscribers 30、open issues 377——issue 量遠高於同 stars 級的工具型專案，反映踩雷案例多。Topics 顯示作者主動 SEO `claude-code`、`free-ai`、`token-saver`、`openai-proxy` 等關鍵字。倉庫尚無 Discussions 板熱度資訊，社群目前在 YouTube 與越南／印尼語博文上擴散最快。

### 為何今日上榜
推測有三：(1) v0.4.20 隔日（2026-05-07）發版、Trending 對「短期 push 活躍 + npm 新版」加權；(2) Kiro AI 持續被當成「免費 Claude 4.5 入口」討論，9Router 是其最直接的調用工具；(3) README 已多語化（中／越／日），亞洲時段自然流量明顯。今日 stars_today 249、ranks #10、growth_rate 5.67%。

### 風險與限制
- **ToS 風險最高**：把 Kiro、OpenCode Free、Vertex 的免費／試用 OAuth 額度當「unlimited」宣傳，明顯偏離 [Kiro 官方 50 credits + 付費 tier 的政策](https://kiro.dev/pricing/)。Kiro、Anthropic、Google 任一方關閘或封 OAuth client，整套 Tier 3 立刻失效。Kiro 官方目前未公開回應，但「multi-account round-robin」屬於規避配額限制的典型反 ToS 模式，使用者帳號被風控的個人風險須自負。
- **OAuth 集中化風險**：所有 provider 的 token 都託管在 9Router dashboard，2026-01 才建立的 repo、單一 maintainer，安全成熟度未經第三方稽核。
- **長期穩定性**：README 已自承「iFlow、Qwen、Gemini CLI 免費 tier 已於 2026 停掉」，免費通道生命週期短；專案需持續換新 provider 才能維持「unlimited」敘事。
- **377 開放 issue** 顯示 fallback、token refresh 與格式翻譯邊界仍多 bug。
- **與 GitHub Copilot ToS 衝突**：把 Copilot session 當作後端 provider 路由到第三方 client，幾乎肯定違反 Copilot 個人授權條款。

### 觀察建議
追兩個訊號：(a) Kiro／Anthropic／GitHub 是否在 1–2 個月內公開封鎖 9Router 類型的 OAuth 用法——若發生，growth_rate 會急跌且 issue 區會出現大量「provider 失效」回報；(b) v0.5 是否轉向「自帶 API key 的純路由器」而淡化「免費」敘事，這會是合規化轉向訊號。短期可作為個人試用工具關注，但不適合企業或長期生產依賴。

---

資料來源：[GitHub repo](https://github.com/decolua/9router)、[GitHub README](https://github.com/decolua/9router/blob/master/README.md)、[GitHub Releases](https://github.com/decolua/9router/releases)、[npm 9router](https://www.npmjs.com/package/9router)、[Kiro Pricing](https://kiro.dev/pricing/)、[openaitoolshub Kiro 評測](https://www.openaitoolshub.org/en/blog/kiro-review-amazon-ide)、[BuildWithAngga 教學](https://buildwithangga.com/tips/mengenal-apa-itu-9router-beserta-benefit-ketika-pakai-ai)。

## 更新紀錄

### 2026-05-09
- 連榜 Day 2（5-08～5-09），絕對榜由 #10 升至 **#5**、增長率榜由 #7 升至 **#2**（5.67% → **18.95%**，+13.28pp）；stars_today 249 → **1,028（+312.9%）**單日 4× 跳升、total stars 4,390 → **5,425（+1,035，+23.6%）**。
- 跳幅與 5-07 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) +386% 同級的「留榜檔最劇烈加速」典型訊號，且首奪本檔絕對榜段位 / 增長率榜雙跳。
- Release 端維持 [v0.4.20](https://github.com/decolua/9router/releases/tag/v0.4.20)（5-07 16:15 UTC），昨日 5-07 後未發新版；增長動能完全來自既有版本的擴散效應，與 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 5-08 的「無新版本但社群口碑放大」結構相同。
- 「免費 LLM 路由器」敘事仍未被 GitHub / Kiro 等 provider 公開封鎖，灰色地帶尚未爆發；下一里程碑為 v0.5 是否轉向「自帶 API key」合規化路線。
