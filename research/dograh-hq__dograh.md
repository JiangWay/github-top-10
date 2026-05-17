---
repo: dograh-hq/dograh
first_seen: 2026-05-18
last_updated: 2026-05-18
appearances: [2026-05-18]
growth_appearances: [2026-05-18]
has_releases: true
latest_release: dograh-v1.30.1
tags: [語音與多媒體, 應用程式, 自架, 資料主權, 開源替代]
domain: 語音與多媒體
form: 應用程式
themes: [自架, 資料主權, 開源替代]
---

# [dograh-hq/dograh](https://github.com/dograh-hq/dograh) 深度研究（2026-05-18 首次）

[dograh-hq/dograh](https://github.com/dograh-hq/dograh) 是一套主打「拖拉式 workflow builder + 自架」的開源 voice agent 平台，自稱為 [vapi-ai/vapi](https://github.com/vapi-ai/vapi) 與 Retell 的 drop-in 替代品。今日以 236 stars_today 在 1,537 stars 基礎上拿下 15.35% 增長率，登上增長榜 #2，同時首次進入絕對榜 top 10。直接導火線是 5-16 推出的 `dograh-v1.30.0` 把 **OpenAI Realtime 模型**接進平台（PR #298），5-17 隨即釋出 v1.30.1 修掉 Dograh TTS context init 與 keepalive 之間的 race condition，兩日連發推進讓「OSS 端能直接呼叫 OpenAI Realtime API」的訊息在語音 AI 圈擴散。

## 專案定位
定位非常清楚：把 Vapi / Retell 那套「視覺化拉節點 → 5 分鐘部署一支會打電話的 AI」搬到 BSD-2 授權下，並支援完全本機與遠端 self-host。專案 README 明寫「100% open source, self-hostable — no vendor lock-in, unlike Vapi or Retell」，鎖定的痛點是 Show HN 創辦人自述的「Vapi 平台費佔總成本 60–70%」。

## 核心架構 / 主要概念
後端 Python + FastAPI（55.6%）建立在 [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat) pipeline 之上，前端 Next.js / TypeScript（40.7%），全套 Docker 容器化。電信側已串 Twilio、Vonage、Telnyx、Vobiz、Cloudonix，並支援 transfer-to-human；語音側支援 bring-your-own LLM / STT / TTS，本次 v1.30.0 新增 OpenAI Realtime models，v1.29.0 加入 ElevenLabs base URL 設定以滿足歐盟資料主權需求。內建 LoopTalk AI-to-AI 測試節點與 QA node 評分 prompt 品質。

## 目標使用者
（1）想自架語音 agent 但不願自己拼 STT / LLM / TTS / SIP 樞紐的中小企業 / 外撥團隊；（2）對 HIPAA / GDPR 合規與 data residency 有硬性要求、不能把通話送上 Vapi cloud 的醫療、金融、歐盟客戶；（3）已在 Pipecat 自架但缺一層 no-code workflow 編輯介面的工程團隊。

## 與類似專案的差異
[pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat)、[livekit/agents](https://github.com/livekit/agents)、[vocodedev/vocode-python](https://github.com/vocodedev/vocode-python) 三者皆為 code-first 框架，需要工程師寫 Python；dograh 在 Pipecat 之上加了一層 React Flow 拖拉編輯器與 web dashboard，定位最接近 [vapi-ai/vapi](https://github.com/vapi-ai/vapi) 但完整開源——這是它能短時間吸到非框架使用者的關鍵差異。

## 外部評論
- [Hacker News「Show HN: Dograh – an OSS Vapi alternative」](https://news.ycombinator.com/item?id=46189836)（2025-12，16 points）：創辦人指出 Vapi 平台費佔開銷 60–70%，社群關注延遲與 voice persona。
- [HackerNoon「Inside Dograh: The Architecture Behind an Open Voice AI Stack」](https://hackernoon.com/inside-dograh-the-architecture-behind-an-open-voice-ai-stack)：拆解 Pipecat-on-FastAPI 與 React Flow 編輯器的整合方式。
- [Shubhamsaboo/awesome-llm-apps PR #659](https://github.com/Shubhamsaboo/awesome-llm-apps/pull/659)：由核心 maintainer chewwbaka 親自送 PR 把 dograh 收進 awesome-llm-apps，帶來下游曝光。
- [官方部落格「Free Alternatives to Vapi: 4 OSS Voice AI Options in 2026」](https://blog.dograh.com/free-alternatives-to-vapi-4-oss-options-in-2026/)：同框比較 dograh / Pipecat / LiveKit Agents / Vocode 四檔。

## Release 狀態
有 release。最新版本 [dograh-v1.30.1](https://github.com/dograh-hq/dograh/releases/tag/dograh-v1.30.1)（2026-05-17）修 Dograh TTS race condition；前一版 [dograh-v1.30.0](https://github.com/dograh-hq/dograh/releases/tag/dograh-v1.30.0)（2026-05-16）加入 OpenAI Realtime 模型整合，是本次上榜直接催化劑。4–5 月迭代密度極高（v1.21 → v1.30 共 10 個 minor）。

## 授權與社群
BSD 2-Clause 授權，1,539 stars、347 forks、21 subscribers、12 open issues。由印度 Zansat Technologies Private Limited 營運，創辦團隊自述為 YC alumni 與 exited founders，但官方未公開具名（聯絡窗口 founders@dograh.com）。前兩大貢獻者 [a6kme](https://github.com/a6kme)（302 commits）與 [chewwbaka](https://github.com/chewwbaka)（154 commits）合計貢獻佔比約 95%，屬典型早期商業公司開源模式：核心由內部小團隊推進，外部 PR 多為文件 / telephony 整合層補丁。
