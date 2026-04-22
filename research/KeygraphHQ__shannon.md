---
repo: KeygraphHQ/shannon
first_seen: 2026-04-23
last_updated: 2026-04-23
appearances: [2026-04-23]
growth_appearances: []
has_releases: true
latest_release: v1.1.0
tags: [資安, 應用程式, 自架, 開源替代]
domain: 資安
form: 應用程式
themes: [自架, 開源替代]
---

# [KeygraphHQ/shannon](https://github.com/KeygraphHQ/shannon)

> 研究日期：2026-04-23
> 研究來源：<https://github.com/KeygraphHQ/shannon>
> 觸發原因：首次上絕對榜（#5，stars_today +346）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

Shannon Lite 是一個以 Claude Agent SDK 驅動、具備「白箱」能力的自主 AI 滲透測試器，能讀你的原始碼、找出攻擊面，再對活體環境實際跑出可重現的 PoC——宣稱「沒 exploit，就不報告」。

## 作者與起源

由美國新創 [Keygraph](https://keygraph.io/)（GitHub 組織 [KeygraphHQ](https://github.com/KeygraphHQ)）於 2025 年 9 月開源，主 repo 用 TypeScript 撰寫。貢獻者幾乎都是 Keygraph 員工（`ajmallesh`、`keygraphVarun`、`ezl-keygraph`、`george-keygraph`、`Khaushik-keygraph`、`rnxj-keygraph` 等），由 Authentic Ventures、Pear VC 及 Lattice CTO Stephen Poletto、Pilot.com 創辦人 Jeff Arnold 等天使投資（[PitchBook](https://pitchbook.com/profiles/company/819114-49)）。Shannon Lite 是付費產品 Shannon Pro 的開源入門版。

## 核心架構 / 主要概念

五階段多代理 pipeline，全在臨時 Docker 容器 + Temporal task queue 中執行：

1. **Pre-Recon**：用 nmap、subfinder、whatweb 做外部掃描，同時解析原始碼識別框架與攻擊面。
2. **Reconnaissance**：以 Playwright 瀏覽器自動化真登入、真點擊，建出 attack surface 地圖（支援 2FA/TOTP 與 SSO）。
3. **Vulnerability Analysis**：五個並行子代理分別負責 Injection、XSS、Auth、Authorization、SSRF，做 data-flow 分析追 source-to-sink。
4. **Exploitation**：把「假設」變「證明」，以瀏覽器與 CLI 工具跑實彈攻擊。
5. **Reporting**：把通過驗證的發現集合成含 PoC 的報告。

三層模型分工：Haiku 4.5 做摘要、Sonnet 4.6 做分析、Opus 4.6 做深層推理。官方只支援 Claude，也可用 AWS Bedrock、Google Vertex AI 或 Anthropic 相容端點。

## 設計哲學

- **Proof-by-Exploitation**：沒跑出實際 PoC 就不列進報告，直接削掉傳統 DAST 的大量誤判。
- **White-Box / Source-Aware**：假設你擁有原始碼，這讓 agent 能精準導引 payload、跳過純黑箱噴 payload 的盲打。
- **Mutative by design**：文件直接警告這不是 passive scanner，會真的建帳號、改資料、打 API——所以**禁止在 production 跑**。

## 目標使用者與適用情境

自有程式碼與授權環境的開發 / 安全團隊，主要做 pre-prod 驗證、CI staging 掃描與 AppSec 內部測試。**不適合** bug bounty（因為要原始碼）、production 與未授權目標。完整 run 一次大約 1–1.5 小時，Anthropic token 成本約 50 美元。

## 與類似專案的差異

- [GreyDGL/PentestGPT](https://github.com/GreyDGL/PentestGPT)：學術起家的黑箱 agent，走 HTB/CTF 風，無白箱、無源碼導引。
- [aress31/burpgpt](https://github.com/aress31/burpgpt)：Burp 外掛，LLM 幫看 HTTP request，不自主執行 exploit。
- [zaproxy/zaproxy](https://github.com/zaproxy/zaproxy)（OWASP ZAP）：老牌開源黑箱 DAST；有社群 AI 外掛但非 agent 架構。
- [caido/caido](https://github.com/caido/caido)：現代 Burp 替代，訴求工作流而非 AI 自動化。
- [projectdiscovery/nuclei](https://github.com/projectdiscovery/nuclei)：template-based 掃描，強在已知 CVE，不做探索式 exploit。
- 命名上要小心兩個撞名：Samsung **Shannon** baseband modem（Cisco Talos 寫過的那個）和 Claude Shannon 訊號理論——都跟本專案無關。

## 外部評論

- [gbhackers：「Shannon AI Pentesting Tool」](https://gbhackers.com/shannon-ai-pentesting-tool/)——介紹自主識別與 exploit 能力。
- [Help Net Security：「Open-source AI pentesting tools are getting uncomfortably good」（2026/02）](https://www.helpnetsecurity.com/2026/02/02/open-source-ai-pentesting-tools-test/)——把 Shannon 視為主要案例。
- [Medium / Shruti Pokale：在 Vulnerable Node.js App 實測](https://medium.com/@shrutipokale2016/i-tested-shannon-ai-pentester-by-keygraph-on-a-vulnerable-node-js-app-heres-what-i-found-15d80ee6dab8)——正面實測報告。
- [Medium / Parathan Thiyagalingam：Proof by Exploitation](https://medium.com/@parathan/proof-by-exploitation-shannons-approach-to-autonomous-penetration-testing-010eac3588d3)——解釋方法論。
- [Undercode Testing：XBOW 96% 成功率](https://undercodetesting.com/shannon-ai-the-autonomous-pentester-that-achieved-96-success-rate-heres-how-its-redefining-web-security/)。
- [Penligent：Shannon vs. Penligent](https://www.penligent.ai/hackinglabs/shannon-ai-pentesting-tool-vs-penligent-what-security-engineers-should-actually-compare-in-2026/)——來自競品角度，可參考但有立場。
- [X / David Borish：突破 10k stars](https://x.com/DavidBorish/status/2041171017029042465)。
- HN / Reddit r/netsec / r/bugbounty：目前未搜到具分量的獨立討論串，**資料不足**。

宣稱的 XBOW benchmark 96.15%（100/104）來自 Shannon 自家 repo 的 [xben-benchmark-results](https://github.com/KeygraphHQ/shannon/blob/main/xben-benchmark-results/README.md)，**尚無第三方復現**，解讀時要保留空間。

## Release 狀態 / 時間軸

- [v1.0.0](https://github.com/KeygraphHQ/shannon/releases/tag/v1.0.0)（2026-03-26）：首個正式版，完成 TypeScript 遷移、引入 npx CLI、beta release 與 cosign 簽章流程，以及 Bedrock/Vertex AI/OpenRouter/DeepSeek 等 provider 支援。
- [v1.1.0](https://github.com/KeygraphHQ/shannon/releases/tag/v1.1.0)（2026-04-21）：抽出 pipeline core 可供 library 使用、使用者 repo 改以 read-only 掛載加上可寫 overlay、棄用 claude-code-router 模式，並改用 structured outputs 管理 exploit queue。

## 授權與社群

- 授權：AGPL-3.0（改動做 SaaS 就必須開源）。
- 指標：39,415 stars / 4,346 forks / 190 watchers / 43 open issues（2026-04-23 當下）。
- 主要貢獻者皆為公司員工，尚未形成外部社群貢獻生態。
- 官方聯絡：<shannon@keygraph.io>、Twitter [@KeygraphHQ](https://twitter.com/KeygraphHQ)。

## 資料來源

- GitHub API：`gh api repos/KeygraphHQ/shannon`、`/releases`、`/contributors`、`/orgs/KeygraphHQ`
- Repo README：<https://github.com/KeygraphHQ/shannon>
- 官網：<https://keygraph.io/shannon>、<https://keygraph.io/about>
- 前述外部評論連結。

## 更新紀錄

<!-- append future re-appearances here -->
