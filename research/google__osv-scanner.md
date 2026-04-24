---
repo: google/osv-scanner
first_seen: 2026-04-25
last_updated: 2026-04-25
appearances: [2026-04-25]
growth_appearances: []
has_releases: true
latest_release: v2.3.5
tags: [資安, 應用程式, 開源替代]
domain: 資安
form: 應用程式
themes: [開源替代]
---

# [google/osv-scanner](https://github.com/google/osv-scanner)

> 研究日期：2026-04-25
> 研究來源：<https://github.com/google/osv-scanner>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[google/osv-scanner](https://github.com/google/osv-scanner) 是 Google 用 Go 寫的「**防守方**」開源漏洞掃描器，把專案的 lockfile / 容器映像 / SBOM 比對到 [osv.dev](https://osv.dev) 開源漏洞資料庫，並在 V2 加入 layer-aware 容器掃描與「guided remediation」自動建議升級版本。

## 作者與起源

由 Google Open Source Security Team 於 2022-11-14 建立 repo、2022-12 正式對外發表（[官方公告](https://security.googleblog.com/2022/12/announcing-osv-scanner-vulnerability.html)），是 [google/osv.dev](https://github.com/google/osv.dev) 漏洞資料平台的「官方前端 CLI」。2025-03 推出 V2，重構為架在 [google/osv-scalibr](https://github.com/google/osv-scalibr) 抽取器之上（[V2 公告](https://security.googleblog.com/2025/03/announcing-osv-scanner-v2-vulnerability.html)）；2026-03-25 發到 v2.3.5。背後是 Google 全職資安工程師，並非個人專案。

## 核心架構 / 主要概念

單一 Go binary，三層架構：(1) **抽取器**——透過 osv-scalibr 解析 19+ 種 lockfile（npm、pip、yarn、maven、go.mod、cargo、gem、composer、nuget…）、容器映像（Alpine/Debian/Ubuntu，layer-aware）、與 SBOM；(2) **比對層**——以 OSV schema 對 [osv.dev](https://osv.dev) API 查詢，亦支援 `--offline` 拉本地資料庫；(3) **輸出層**——表格 / JSON / SARIF / 互動式 HTML（V2 新增）。「guided remediation」會依嚴重度、依賴深度、ROI 推薦升版本，目前僅 npm 與 Maven 完整支援。

## 目標使用者

CI/CD pipeline 內想 fail-build on critical CVE 的 DevSecOps 工程師、需要 SBOM + 漏洞報告交付的合規團隊、想離線掃描內部 air-gapped 環境的企業資安、以及容器映像層級漏洞溯源（哪一層 base image 引入問題）的 SRE。**不**適合需要 SAST / DAST / secrets / IaC 一站式掃的人——那是 [aquasecurity/trivy](https://github.com/aquasecurity/trivy) 或 [Snyk](https://snyk.io) 的範圍。

## 與類似專案的差異

| 對手 | osv-scanner 的差異 |
|---|---|
| [aquasecurity/trivy](https://github.com/aquasecurity/trivy) | Trivy 範圍更廣（CVE + IaC + secrets + license + misconfig），單檔 binary 已是事實標準；osv-scanner 專注「依賴漏洞」單一場景，但資料庫 OSV schema 對版本範圍標註更精準，誤報較少 |
| [Snyk](https://snyk.io) | Snyk 是商業 SaaS，提供 reachability analysis 可砍 70–90% 警報、自動 fix PR、企業 SSO/RBAC；osv-scanner 完全免費、無 seat 限制，但 reachability 仍實驗性 |
| [dependabot](https://github.com/dependabot) | Dependabot 綁 GitHub 平台、自動開 PR 升版；osv-scanner 是 CLI、可在任何 CI 跑，並涵蓋容器與 OS 套件層級 |
| [anchore/grype](https://github.com/anchore/grype) | Grype 強在容器與 SBOM（搭 Syft），生態久；osv-scanner V2 才追上 layer-aware 容器，但 OSV 資料庫品質更新更快 |

選型建議：純依賴漏洞 + 想要權威資料 → osv-scanner；要一站式 → Trivy；企業要 SLA + 自動修復 → Snyk。

## 外部評論

- [Google Online Security Blog — Announcing OSV-Scanner V2](https://security.googleblog.com/2025/03/announcing-osv-scanner-v2-vulnerability.html)：官方部落格定義 V2 三大主題——容器掃描、guided remediation、互動式 HTML 報告。
- [DevOps.com — Google's OSV-Scanner V2: Leveling Up Vulnerability Management](https://devops.com/googles-osv-scanner-v2-leveling-up-vulnerability-management-for-developers/)：正面評價 V2 的 layer-aware 容器掃描，認為已能與 Trivy / Grype 在容器場景一較高下。
- [LinuxSecurity — OSV-Scanner V2 Enhancements](https://linuxsecurity.com/news/security-projects/google-osv-scanner-v2)：強調對 Debian / Ubuntu / Alpine 的 OS 套件覆蓋是 V2 最大跳躍。
- [AppSecSanta — Trivy vs Snyk (2026)](https://appsecsanta.com/sca-tools/trivy-vs-snyk) 與 [12 Best Open-Source SCA Tools 2026](https://appsecsanta.com/sca-tools/open-source-sca-tools)：把 osv-scanner 列入 2026 開源 SCA 第一梯隊（與 Trivy、Grype、Syft 並列），但指出 guided remediation「目前只覆蓋 npm 與 Maven」。
- [The Hacker News — Google Launches OSV-Scanner](https://thehackernews.com/2022/12/google-launches-largest-distributed.html)：2022 首發報導，定調為「填補 dev 套件清單與 CVE 資料之間的鴻溝」。
- [iThome — Google 釋出開源軟體漏洞掃描工具 OSV-Scanner](https://www.ithome.com.tw/news/154709)、[T客邦報導](https://www.techbang.com/posts/103435-googles-osv-scanner)：中文圈主流媒體首發報導，著重 16 個生態系覆蓋。
- [知乎 — 開源漏洞識別工具 OSV-Scanner](https://zhuanlan.zhihu.com/p/608205100)、[showme.codes — 使用 Google OSV 工具掃描依賴安全漏洞](https://showme.codes/zh-cn/2023-12-25-google-osv/)：中文技術圈實作教學，強調與 CI 整合與離線模式。
- [台大計中電子報 — 利用開源漏洞掃描工具分析 SBOM](https://www.cc.ntu.edu.tw/chinese/epaper/home/20241220_007106.html)：學術機構視角，把 osv-scanner 用於 SBOM 合規流程。
- **資料缺口**：本次未檢索到具體 Hacker News 串、r/devops 或 r/golang 的高熱度討論（Google 搜尋僅回 SEO 文與官方公告），社群討論似乎偏 GitHub Issues 與企業內部 wiki。

## Release 狀態

- 第一版於 2022-12 隨 Google 安全部落格公告發布
- v2.0.0（2025-03）為里程碑：改架在 [google/osv-scalibr](https://github.com/google/osv-scalibr)、加入 layer-aware 容器掃描、guided remediation
- 最新：[v2.3.5](https://github.com/google/osv-scanner/releases/tag/v2.3.5)（2026-03-25）
- 近 5 個 release 節奏：v2.3.0（2025-11-19）→ v2.3.1（2025-12-11）→ v2.3.2（2026-01-15）→ v2.3.3（2026-02-12）→ v2.3.5（2026-03-25），約一個月一個小版本，符合 Google 內部 release train

## 授權與社群

- 授權：Apache-2.0
- Stars：9,393 / Forks：615 / Watchers：68 / Open Issues：106
- 主要語言：Go
- Topics：`scanner`, `security-audit`, `security-tools`, `vulnerability-scanner`
- 官方文件站：<https://google.github.io/osv-scanner/>
- 近況：2026-04-24 仍有 push，由 Google Open Source Security Team 全職維護，搭配同團隊 [google/osv.dev](https://github.com/google/osv.dev)、[google/osv-scalibr](https://github.com/google/osv-scalibr) 形成完整工具鏈

## 資料來源

**本體**
1. <https://github.com/google/osv-scanner>
2. <https://google.github.io/osv-scanner/>
3. <https://osv.dev/>
4. `gh api repos/google/osv-scanner`（2026-04-25 擷取）
5. `gh api repos/google/osv-scanner/releases?per_page=5`

**官方公告 / 第三方評論**
6. <https://security.googleblog.com/2022/12/announcing-osv-scanner-vulnerability.html>
7. <https://security.googleblog.com/2025/03/announcing-osv-scanner-v2-vulnerability.html>
8. <https://devops.com/googles-osv-scanner-v2-leveling-up-vulnerability-management-for-developers/>
9. <https://linuxsecurity.com/news/security-projects/google-osv-scanner-v2>
10. <https://thehackernews.com/2022/12/google-launches-largest-distributed.html>
11. <https://appsecsanta.com/sca-tools/trivy-vs-snyk>
12. <https://appsecsanta.com/sca-tools/open-source-sca-tools>
13. <https://www.ithome.com.tw/news/154709>
14. <https://www.techbang.com/posts/103435-googles-osv-scanner>
15. <https://zhuanlan.zhihu.com/p/608205100>
16. <https://showme.codes/zh-cn/2023-12-25-google-osv/>
17. <https://www.cc.ntu.edu.tw/chinese/epaper/home/20241220_007106.html>

**同類工具**
18. [aquasecurity/trivy](https://github.com/aquasecurity/trivy)
19. [anchore/grype](https://github.com/anchore/grype)
20. [Snyk](https://snyk.io)
21. [dependabot](https://github.com/dependabot)

## 更新紀錄
