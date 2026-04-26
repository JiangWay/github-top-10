---
repo: openclaw/openclaw
first_seen: 2026-04-27
last_updated: 2026-04-27
appearances: [2026-04-27]
growth_appearances: [2026-04-27]
has_releases: true
latest_release: v2026.4.25-beta.4
tags: [LLM 客戶端, 應用程式, 自架, 資料主權]
domain: LLM 客戶端
form: 應用程式
themes: [自架, 資料主權]
---

# [openclaw/openclaw](https://github.com/openclaw/openclaw)

> 研究日期：2026-04-27
> 研究來源：https://github.com/openclaw/openclaw
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[openclaw/openclaw](https://github.com/openclaw/openclaw) 是一個跑在自己機器上的個人 AI 助理 Gateway，把 LLM 接到你已經在用的 24 種訊息頻道（WhatsApp、Telegram、Slack、Discord、iMessage、Signal、WeChat、LINE…），主打 local-first、單人專屬。雖然帳上 364,464 stars 看起來離譜，**但本案查證後判定為真實爆紅**，並非刷單——下面外部評論段會說明判讀依據。

## 作者與起源

組織 [openclaw](https://github.com/openclaw) 建立於 2026-01-04，主帳號 [steipete](https://github.com/steipete)（Peter Steinberger，奧地利人）即 PSPDFKit 創辦人，iOS 圈經營 13 年的老牌人物，**非匿名新號**。專案最早 2025-11 以 `Clawdbot` 名義開張，因 Anthropic 法務以 Claude 商標近似要求改名，2026-01 短暫叫 `Moltbot`，月底才定名 OpenClaw。組織下共 [29 個 repo](https://github.com/orgs/openclaw/repositories) 互為衛星（[clawhub](https://github.com/openclaw/clawhub) 8.3k、[skills](https://github.com/openclaw/skills) 4.4k、[acpx](https://github.com/openclaw/acpx) 2.3k、[lobster](https://github.com/openclaw/lobster) 1.1k），生態完整。

## 核心架構 / 主要概念

README 自述「**The Gateway is just the control plane — the product is the assistant**」。架構分四層：(1) **Local-first Gateway**（TypeScript / Node 24，集中管理 sessions、channels、tools、events）；(2) **Multi-channel inbox**，把 24 種 IM 串成一個收件匣；(3) **Multi-agent routing**，每個頻道/帳號可掛獨立 agent 與 sandbox；(4) **Voice Wake / Talk Mode + Live Canvas**，macOS/iOS 喚醒詞、Android 連續語音、A2UI 畫布。「Lobster way」是品牌主軸——主角是名為 **Molty** 的太空龍蝦助理，slogan 借《Doctor Who》戴立克梗：「EXFOLIATE! EXFOLIATE!」（蛻殼的雙關）。

## 設計哲學

> 🦞 **OpenClaw — Personal AI Assistant**
>
> **EXFOLIATE! EXFOLIATE!**
>
> **OpenClaw** is a _personal AI assistant_ you run on your own devices. It answers you on the channels you already use. It can speak and listen on macOS/iOS/Android, and can render a live Canvas you control. The Gateway is just the control plane — the product is the assistant.
>
> If you want a personal, single-user assistant that feels local, fast, and always-on, this is it.

## 目標使用者與適用情境

主要受眾是「想在 WhatsApp / iMessage / Slack 用自己的 LLM 與 API key、不要走 SaaS 助理」的個人開發者。預設安全模型即承認「single-user, full host access」——**這不是給企業多人用的**，群組情境要手動切到 `agents.defaults.sandbox.mode: "non-main"`。典型用途：手機傳語音給自己的助理跨裝置回信、把家裡 NAS / Home Assistant 串進對話、跨平台 agent workflow 的 daily driver。

## 與類似專案的差異

| 專案 | 形態 | 主軸 | 與本案差異 |
| --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | Gateway + 多通道 bot | 把 LLM 接到 24 種 IM | 訊息平台覆蓋廣度業界第一 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Web UI | 自架 ChatGPT 替代品 | 網頁界面為主，沒有跨 IM 接入 |
| [janhq/jan](https://github.com/janhq/jan) | 桌面 app | 本地離線 LLM 客戶端 | 跑在桌面端、單一視窗體驗 |
| [lencx/ChatGPT](https://github.com/lencx/ChatGPT) | 桌面殼 | ChatGPT 包裝 | 已停滯，與 LLM agent 無關 |

## 外部評論

**首先處理「stars 是否真實」的核心爭議**：

- **Fork 比 = 74,636 / 364,464 = 20.5%**——刷單 repo 通常 fork 比近 0%，10% 已是健康，20% 屬於極度健康，是 Linux/React 等級。
- **commit 與貢獻者**：API 取樣 100 名貢獻者中 [steipete](https://github.com/steipete) 21,224 commits、[vincentkoc](https://github.com/vincentkoc) 3,964、[obviyus](https://github.com/obviyus) 982，前 20 名都是真人帳號且各有獨立 GitHub 歷史。`open_issues_count: 7,256` 也與星數比例對得上。
- **Release 節奏**：30 個 release、最近 24 小時內就 4 個 beta（[v2026.4.25-beta.1~4](https://github.com/openclaw/openclaw/releases)），是日活躍維護的訊號，刷單殭屍專案做不到。
- 第三方報導：[The New Stack](https://thenewstack.io/openclaw-github-stars-security/) 稱其為「GitHub 史上最高星非聚合類專案」、[Malwarebytes](https://www.malwarebytes.com/blog/news/2026/03/beware-of-fake-openclaw-installers-even-if-bing-points-you-to-github) 與 [Huntress](https://www.huntress.com/blog/openclaw-github-ghostsocks-infostealer) 都報導了「假 OpenClaw 安裝檔散布 GhostSocks 資訊竊取程式」——**有人偽裝才有名氣，是真實流量的反向證據**。
- 起源故事：[N9O 的 Steinberger 訪談](https://n9o.xyz/posts/202602-steipete-openclaw-openai/) 記錄 PSPDFKit 結束後的 burnout、24 小時破 9k stars、2026-02-14 Sam Altman 宣布 [steipete](https://github.com/steipete) 加入 OpenAI、承諾把 OpenClaw 移交基金會。
- 加密幣騙局：[OX Security](https://www.ox.security/blog/openclaw-github-phishing-crypto-wallet-attack/) 與 [CoinMarketCap](https://coinmarketcap.com/academy/article/openclaw-developers-targeted-in-github-phishing-scam-using-fake-claw-token) 報導騙徒打著 `$CLAW` token 名義釣魚 OpenClaw 開發者，作者公開警告「I will never do a coin」。

**結論**：364k stars 看起來像刷單，**但每一項定量訊號（fork 比、issue 數、貢獻者真實性、release 節奏）與每一項定性訊號（媒體報導、被冒名仿造、OpenAI 收編）都指向有機爆紅**。這是 2026 年最反直覺的 GitHub 現象，不是造假。

## Release 狀態 / 時間軸

API 取得 30 筆 release，首筆 [v2026.4.11-beta.1](https://github.com/openclaw/openclaw/releases) 於 2026-04-11、最新 [v2026.4.25-beta.4](https://github.com/openclaw/openclaw/releases/tag/v2026.4.25-beta.4) 於 2026-04-26 發佈，採 `vYYYY.M.D` 日期化版號 + beta 通道。最新版本主軸為 TTS 大改版（`/tts latest`、chat-scoped auto-TTS、Azure Speech / Xiaomi / Inworld / Volcengine 多廠商）。

## 授權與社群

- **授權**：MIT
- **stars / forks / watchers**：364,464 / 74,636 / 1,803（subscribers）
- **fork 比**：20.5%（健康指標，遠離刷單區間）
- **open issues / PRs**：7,256（與規模匹配）
- **貢獻者**：API 回 100 筆上限，實際應更多；前段（[steipete](https://github.com/steipete) 21k+、[vincentkoc](https://github.com/vincentkoc) 3.9k、[obviyus](https://github.com/obviyus) 982）皆真實活躍開發者
- **組織建立日**：2026-01-04（repo 早於組織，因 2025-11 在 [steipete](https://github.com/steipete) 個人帳下開的 Clawdbot 後 transfer 過來）
- **資金與背書**：README 列贊助 OpenAI、GitHub、NVIDIA、Vercel、Blacksmith、Convex；作者 2026-02 加入 OpenAI

數字算術全部對得上規模——這不是空殼。

## 資料來源

- GitHub API：[`gh api repos/openclaw/openclaw`](https://github.com/openclaw/openclaw)、`/contributors`、`/commits`、`/releases`
- [`gh api orgs/openclaw/repos`](https://github.com/openclaw)
- [openclaw/openclaw README](https://github.com/openclaw/openclaw)
- [openclaw.ai 官網](https://openclaw.ai/)
- [The New Stack：OpenClaw rocks to GitHub's most-starred status](https://thenewstack.io/openclaw-github-stars-security/)
- [N9O：The Lobster That Broke GitHub](https://n9o.xyz/posts/202602-steipete-openclaw-openai/)
- [Malwarebytes：Beware of fake OpenClaw installers](https://www.malwarebytes.com/blog/news/2026/03/beware-of-fake-openclaw-installers-even-if-bing-points-you-to-github)
- [Huntress：How Fake OpenClaw Installers Spread GhostSocks Malware](https://www.huntress.com/blog/openclaw-github-ghostsocks-infostealer)
- [OX Security：OpenClaw Developers Targeted in Crypto-Wallet Phishing Attack](https://www.ox.security/blog/openclaw-github-phishing-crypto-wallet-attack/)

## 更新紀錄
