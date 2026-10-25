---
repo: aws/agent-toolkit-for-aws
first_seen: 2026-10-25
last_updated: 2026-10-25
appearances: [2026-10-25]
growth_appearances: [2026-10-25]
has_releases: false
latest_release: null
tags: [MCP 協定, MCP Server, 企業級]
domain: MCP 協定
form: MCP Server
themes: [企業級]
---

# [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws)

> 研究日期：2026-10-25
> 研究來源：https://github.com/aws/agent-toolkit-for-aws
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) 是 AWS 官方的 coding agent 工具包，把一個遠端 MCP server、5 個 plugin 和 40 多個 skill 打包，讓 Claude Code、Codex、Cursor、Kiro 等 agent 直接操作 AWS。

## 作者與起源

[aws](https://github.com/aws) 組織 2026-04-23 建 repo，[AWS 官方公告](https://aws.amazon.com/about-aws/whats-new/2026/05/agent-toolkit) 2026-05-06 發佈，定位為 [awslabs/mcp](https://github.com/awslabs/mcp) 的後繼統一入口。主要貢獻者 [herosjourney](https://github.com/herosjourney)（46 commits）與 [arnewouters](https://github.com/arnewouters)（35 commits）。

## 核心架構 / 主要概念

- **AWS MCP Server**：遠端託管於 `aws-mcp.us-east-1.api.aws/mcp`，本機以 `uvx mcp-proxy-for-aws-cli@latest` 代理，提供 AWS API 呼叫、沙盒腳本執行、文件搜尋
- **5 個 plugin**：`aws-core`（CDK / CloudFormation、serverless、容器、計費）、`aws-agents`（Bedrock、AgentCore）、`aws-data-analytics`（S3 Tables、Glue、Athena）、`aws-agents-for-devsecops`、`aws-startup-advisor`
- **40+ skills**：用 `npx skills add` 分發到 `.claude/skills/`、`.kiro/skills/` 等目錄
- **多客戶端設定**：repo 同時放 `.claude-plugin/`、`.cursor-plugin/`、`.agents/`

## 設計哲學

> "Official, AWS-supported MCP servers, skills, and plugins to help AI agents build on AWS"

關鍵字是「Official, AWS-supported」。agent 的 AWS 呼叫走 IAM 身分並留 CloudTrail 紀錄，企業可沿用既有權限與稽核體系，不必另外信任第三方 MCP server。

## 目標使用者與適用情境

- 已用 coding agent 做 AWS 開發、需要 IAM 與 CloudTrail 稽核紀錄的企業
- 想讓 agent 查 AWS 最新文件而不靠模型記憶的開發者
- **不適用**：多雲或非 AWS 環境；不能接受資料經過 AWS 遠端 MCP endpoint 的場景

## 與類似專案的差異

| 對手 | 對方做法 | 本專案的差異 |
|---|---|---|
| [awslabs/mcp](https://github.com/awslabs/mcp) | 數十個獨立 MCP server 的 monorepo，各自安裝 | 單一遠端 server 加 plugin / skill 打包，掛 GA |
| 第三方 AWS MCP server | 社群維護，憑證管理各自實作 | AWS 直接維護，走 IAM、CloudWatch、CloudTrail |

## 外部評論

- [AWS 官方公告](https://aws.amazon.com/about-aws/whats-new/2026/05/agent-toolkit)：首發 40+ skills 與 3 個主 plugin（現為 5 個）
- [AWS 產品頁](https://aws.amazon.com/products/developer-tools/agent-toolkit-for-aws/)：列出沙盒執行與 CloudWatch / CloudTrail 可觀測性
- [Daniel Vaughan 的 Codex CLI 教學](https://codex.danielvaughan.com/2026/05/09/aws-agent-toolkit-codex-cli-enterprise-mcp-skills-plugins/)：示範企業 IAM 權限設定流程
- 未見 HN / Reddit 主串討論，資料不足

## Release 狀態 / 時間軸

- 2026-04-23 建 repo
- 2026-05-06 官方發佈
- 2026-10-23 最後 push
- 2026-10-25 上 trending #3，但今日只有 +13 stars，排名靠 trending 演算法而非單日增量
- 尚無 GitHub Release，版本隨 PyPI `mcp-proxy-for-aws-cli@latest` 滾動

## 授權與社群

- 授權：Apache-2.0
- Stars 3,251 / Forks 403 / Watchers 25
- 主語言：Python
- 擁有者：組織（AWS）
- 今日增長率 0.40%（+13 / 3,251）

## 資料來源

- **本體**：[GitHub repo](https://github.com/aws/agent-toolkit-for-aws)、[AWS 產品頁](https://aws.amazon.com/products/developer-tools/agent-toolkit-for-aws/)
- **第三方評論**：[AWS 公告](https://aws.amazon.com/about-aws/whats-new/2026/05/agent-toolkit)、[Daniel Vaughan](https://codex.danielvaughan.com/2026/05/09/aws-agent-toolkit-codex-cli-enterprise-mcp-skills-plugins/)
- **同類工具**：[awslabs/mcp](https://github.com/awslabs/mcp)

## 更新紀錄
