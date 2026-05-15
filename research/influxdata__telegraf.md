---
repo: influxdata/telegraf
first_seen: 2026-05-16
last_updated: 2026-05-16
appearances: [2026-05-16]
growth_appearances: [2026-05-16]
has_releases: true
latest_release: v1.38.4
tags: [開發者工具, 框架, 自架, 企業級]
domain: 開發者工具
form: 框架
themes: [自架, 企業級]
---

# [influxdata/telegraf](https://github.com/influxdata/telegraf)

> 研究日期：2026-05-16
> 研究來源：<https://github.com/influxdata/telegraf>
> 觸發原因：首次上絕對榜（10 年老牌觀測代理首次登上本站 Trending 榜）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[influxdata/telegraf](https://github.com/influxdata/telegraf) 是 InfluxData 自 2015 年釋出的單一 Go 二進位、外掛驅動的伺服器代理（agent），用一份 TOML 設定檔涵蓋「**收集、處理、聚合、寫出 metrics / logs / 任意資料**」整條 pipeline，至今累積 300+ 外掛、由 1,200+ 名貢獻者維護，截至 2026-05-16 約 17,370 stars / 5,802 forks，是 Prometheus 之外最廣用的開源觀測代理之一。CLAUDE.md tag taxonomy 沒有「觀測」這格，本檔以「開發者工具 / 框架」最逼近，並掛「自架、企業級」兩個 themes 標示其營運形態。

## 作者與起源

由 InfluxData（時序資料庫 [influxdata/influxdb](https://github.com/influxdata/influxdb) 的母公司，舊名 Errplane）於 2015-04-01 釋出，原始發起人是 [@sparrc](https://github.com/sparrc)、[@danielnelson](https://github.com/danielnelson) 與後期主力 [@srebhan](https://github.com/srebhan)、[@powersj](https://github.com/powersj)。

Telegraf 的誕生背景是 InfluxData 自家 TICK Stack（Telegraf / InfluxDB / Chronograf / Kapacitor）四件套中的「**T**」——當時 InfluxDB 1.x 需要一個與 [prometheus/node_exporter](https://github.com/prometheus/node_exporter) 對標、但採 push 模型且支援多目的地（不只寫 InfluxDB）的代理。從 2015 年 v0.1 至今 10 年，主導開發權早已從 Paul Dix / Cameron Sparr 等元老移交給維護團隊；前 10 大貢獻者多為 InfluxData 工程師（danielnelson 1,977、srebhan 913、sparrc 860、powersj 817、zak-pawel 250）加上 dependabot bot 的 1,646 次自動升版。

關鍵時間軸：
- 2015-04 首個 commit；2015-06 釋出 v0.1.0。
- 2016 年起進入週期性 minor release，至 2026-05 已迭代到 v1.38.x。
- 2026-03-09 釋出 v1.38.0：兩個重要新外掛 `inputs.sip` 與 `outputs.influxdb_v3`，並把「嚴格環境變數處理」設為預設行為（breaking）。
- 2026-03-26 InfluxData 對外公開 **Telegraf Enterprise Beta** 與 **Telegraf Controller**——這是本檔判斷其 5 月突然上 Trending 的最直接觸發因子。

## 核心架構 / 主要概念

Telegraf 的設計核心是**四種外掛 + 一個 TOML 設定**：

| 外掛類別 | 角色 | 範例 |
|---|---|---|
| `inputs` | 從 host / 服務拉/接資料 | `cpu`、`disk`、`docker`、`mysql`、`mqtt_consumer`、`opcua`、`netflow`、`statsd`、`sip`（v1.38 新增） |
| `processors` | 對單筆 metric 做轉換 | rename、regex、enum、starlark |
| `aggregators` | 跨筆 metric 做時間視窗聚合 | basicstats、histogram、merge |
| `outputs` | 寫到後端 | `influxdb`、`influxdb_v2`、`influxdb_v3`（v1.38 新增）、`prometheus_client`、`kafka`、`mongodb`、`opentelemetry`、`stackdriver`、`opensearch` |

整個產出是**一支靜態 Go 二進位、無外部執行期依賴**，跨 Linux / macOS / Windows / FreeBSD 與 amd64 / arm64 / armhf / riscv64 / s390x / ppc64le / loongarch64 等架構同套設定一鍵跑。Repo `topics` 顯示其覆蓋面：`influxdb`、`prometheus`、`kafka`、`mqtt`、`modbus`、`opcua`、`json`、`windows-eventlog`、`xpath`、`telemetry-collection`、`time-series`——從工業 IoT（Modbus、OPC UA、SIP 通話追蹤）到雲端原生（OpenTelemetry、Kubernetes）通吃。

Telegraf 自身**不存資料、不畫圖、不告警**——它是純粹的「邊緣 collector」，要組成完整觀測棧必須搭配後端（InfluxDB / Prometheus / Grafana / Elasticsearch / Kafka …）。

2026-03-26 公開的 **Telegraf Controller** 為這個 10 年舊架構加上一層 control plane：
- **集中式 UI + API**：在控制台一次定義配置、套用到整個 agent fleet。
- **Pull-based 設定下發**：agent 主動透過 HTTP 拉取設定，避免反向打洞，與 locked-down 環境相容。
- **Label 化 fleet 組織與 bulk 操作、外掛 metadata 視圖、模板參數化**。
- 與資料目的地解耦——「**Telegraf Enterprise does not require InfluxDB, and you can use the Telegraf Controller regardless of where your telemetry data is going**」（[InfluxData blog](https://www.influxdata.com/blog/telegraf-enterprise-beta/)）。
- Agent 端對接證據：2026-05-14 commit `feat(agent): Accept TELEGRAF_CONTROLLER_TOKEN environment variable (#18909)`——主程式正式內建讀取 Controller 認證 token 的能力。

## 設計哲學

repo description 把它寫得極簡：

> "Agent for collecting, processing, aggregating, and writing metrics, logs, and other arbitrary data."

README 則強調三件事——**單檔 Go 二進位（無外部依賴）、TOML 設定、社群超過 1,200 個貢獻者撐起 300+ 外掛**。InfluxData 在 Telegraf Enterprise Beta 公告中補上現代脈絡：

> "Once Telegraf becomes part of your production telemetry pipeline, spread across environments, teams, regions, and edge locations, the hard part isn't installing agents; it's operating them."

翻譯：當 Telegraf 進入正式生產的遙測 pipeline、散布到多環境多區多邊緣節點之後，難點從來不在裝 agent，而在**運維**它們——這句話直接解釋了 2026 為何要加 Controller。

整體哲學可拆成三層：
1. **本體層**：保持 single binary、無依賴、跨架構、設定即代碼（TOML），不背 runtime / DSL 包袱。
2. **生態層**：外掛清單**永遠歡迎社群送 PR**（README 第一行加粗）；新硬體（Modbus / OPC UA / SIP / NetFlow）幾乎都是社群維護者貢獻。
3. **營運層**（2026 新增）：在 OSS 之上開「Enterprise 控制平面」，並維持「資料寫到任何後端」的中立性——明顯避免重蹈 Grafana Agent → Alloy 那種完全綁定自家後端的批評。

## 目標使用者與適用情境

**適合用 Telegraf**：
- 既有 InfluxDB（v1 / v2 / v3）使用者——TICK / Telegraf-InfluxDB-Grafana 是經典組合。
- 需要從**異質來源**收集 metrics 的 SRE / DevOps：作業系統、Docker、Kubernetes、雲廠商 API、SNMP 網路設備、Kafka / MQTT 訊息流、SQL DB、Redis、SAP HANA、VMware vSphere、Cisco gNMI／NetFlow、Azure Monitor、AWS CloudWatch。
- **工業 / OT 環境**：Modbus、OPC UA、PROFINET 的監測，這是 Vector 與 Grafana Alloy 較弱、Telegraf 仍領先的細分賽道。
- 偏好**單檔靜態二進位** + **TOML** 而不是 YAML 流水管 DSL 的工程文化。
- 2026 起想集中管理 100+ agent fleet 又不想自己造 Ansible 機制的團隊（直接走 Enterprise / Controller beta）。

**不適合用 Telegraf**：
- 純粹想要 OpenTelemetry-first 體驗（OTel-native semantic conventions、OTLP 端到端）——[grafana/alloy](https://github.com/grafana/alloy) 或 OTel Collector 較順手。
- 重度 log pipeline 與 high-cardinality transform 為主、metric 反而是配角——[vectordotdev/vector](https://github.com/vectordotdev/vector) 在這場景更強。
- 需要「**完整觀測平台**」（含儲存 / 查詢 / 告警）——Telegraf 只是 collector，後端要另外組。
- 寫 Rust / 不想碰 Go 生態。

## 與類似專案的差異

| 對手 | 本專案的差異 | 什麼時候選誰 |
|---|---|---|
| [prometheus/node_exporter](https://github.com/prometheus/node_exporter) + Prometheus | Telegraf 是 push（也支援 pull），單一 agent 整合 300+ 來源，可同時寫多個 output；Prometheus stack 是 pull-only、需要 3 個服務（Prometheus / node_exporter / alertmanager）才完整。Telegraf 對 SNMP / Modbus / OPC UA / SQL DB 整合度遠勝 node_exporter | 純 K8s + Prometheus 生態選 node_exporter；混合環境、IoT/OT、多後端寫入選 Telegraf |
| [vectordotdev/vector](https://github.com/vectordotdev/vector) | Telegraf 強在 metrics 與工業協定 inputs；Vector 強在 logs、VRL transformation DSL、記憶體效率（Rust）。兩者 output 重疊度高 | Log-heavy / 需要在 collector 內做複雜 transform 選 Vector；metrics-heavy / 既有 InfluxDB / 工業協定選 Telegraf |
| [grafana/alloy](https://github.com/grafana/alloy)（前身 Grafana Agent） | Alloy 100% OTLP 相容、走 OTel Collector distro 路線、用 River 設定 DSL；Telegraf 是 InfluxData 原生路線、TOML、不押注 OTel。2026-03 InfluxData 公開的 Telegraf Controller 是對 Alloy fleet 管理體驗的直接回擊 | 全公司走 Grafana / OTel 生態選 Alloy；想保留多後端中立性 + InfluxDB 親和 + Enterprise 控制平面選 Telegraf |

延伸觀察：[grafana/agent](https://github.com/grafana/agent) 已被宣布廢棄並指向 Alloy（[Grafana 官方 FAQ](https://grafana.com/blog/grafana-agent-to-grafana-alloy-opentelemetry-collector-faq/)），Telegraf 在 2026 一邊維持月度 patch release、一邊推 Controller，明顯是要趁 Grafana 那邊轉換期搶下「保守、跨後端、單檔」這群中老牌使用者。

## 外部評論

- [InfluxData 官方 blog：Telegraf Enterprise Beta is Now Available](https://www.influxdata.com/blog/telegraf-enterprise-beta/)（2026-03-26）——一手宣告，明示痛點是「**operating agents at scale**」。
- [InfluxData 社群論壇：Announcement: Telegraf Enterprise now in public beta](https://community.influxdata.com/t/announcement-telegraf-enterprise-now-in-public-beta/58393)（2026-03-26 14:38 by scott）——首發貼文僅 1 like、本研究截稿時尚無實質回覆，社群初期反應安靜。
- [Last9：Use Telegraf Without the Prometheus Complexity](https://last9.io/blog/use-telegraf-without-the-prometheus-complexity/)——第三方觀測廠商推 Telegraf 為 Prometheus 的「**1 個 agent 對 3 個服務**」的精簡替代方案。
- [Home Assistant Community：Time Series Databases and Stacks in 2025 — InfluxDB+Telegraf vs Prometheus+Exporters](https://community.home-assistant.io/t/time-series-databases-and-stacks-in-2025-influxdb-telegraf-vs-prometheus-exporters-node-and-cadvisor/897821)——HA 玩家社群長期討論 stack 取捨，Telegraf 派強調「**單檔好部署、多後端可寫**」是選它的理由。
- [Hacker News：Show HN — MavLink Input Plugin for Telegraf](https://news.ycombinator.com/item?id=44009060)——第三方 ArduPilot 無人機 telemetry 透過 Telegraf 接 InfluxDB / VictoriaMetrics / TimescaleDB + Grafana，例證「**任何時序資料來源都能塞進去**」這個設計賣點。
- [SRE School：What is Telegraf? Meaning, Architecture, Examples, Use Cases](https://sreschool.com/blog/telegraf/)——SRE 視角的中立架構介紹，整理 input / processor / aggregator / output 四段式抽象。
- 中文資源：[HackMD：Telegraf 與 InfluxDB 輕鬆實現資料收集與存儲](https://hackmd.io/@fLqVWb1tQxmEVn9x8EpToQ/H1FkyVvvyl)、[EPH 程式日記：使用 Telegraf 和 InfluxDB 記錄系統資源使用量](https://ephrain.net/telemetry-%E4%BD%BF%E7%94%A8-telegraf-%E5%92%8C-influxdb%EF%BC%8C%E8%A8%98%E9%8C%84%E7%B3%BB%E7%B5%B1%E8%B3%87%E6%BA%90%E4%BD%BF%E7%94%A8%E9%87%8F/)、[iThome 鐵人賽 Day 18：監測服務 InfluxDB & Telegraf](https://ithelp.ithome.com.tw/m/articles/10248241)——繁中圈長期把 Telegraf 當 Grafana 系列教學的標配組件。
- [微軟 Azure Monitor 官方教學：使用 Telegraf 收集 Linux VM 自訂指標](https://learn.microsoft.com/zh-tw/azure/azure-monitor/agents/collect-custom-metrics-linux-telegraf)、[AWS Timestream 官方文件：開放原始碼 Telegraf 整合](https://docs.aws.amazon.com/zh_tw/timestream/latest/developerguide/Telegraf.html)——三大雲廠商皆把 Telegraf 列為一級指標接入工具，是其「中立 collector」定位的最強背書。
- 安全面：[GitHub Security Advisories](https://github.com/influxdata/telegraf/security/advisories) 與 [CVE Details 收錄頁](https://www.cvedetails.com/product/90481/Influxdata-Telegraf.html?vendor_id=21888) 是長期追蹤 Telegraf CVE 的官方與第三方索引，本檔截稿時未見 2026 重大 CVE 公告，5 月上 Trending **不是** CVE 觸發。

## Release 狀態 / 時間軸

| 日期 | 版本 | 重點 |
|---|---|---|
| 2015-04-01 | repo 首個 commit | InfluxData 在 GitHub 公開 |
| 2015 年中 | v0.1.0 | 早期 alpha，僅數個 input |
| 2016-09 | v1.0 | API 穩定化，啟動每月 release 節奏 |
| 2026-01-12 | v1.37.1 | bug fixes + 大量 deps 升版 |
| 2026-02-12 | v1.37.2 | bug fixes |
| 2026-02-24 | v1.37.3 | bug fixes |
| 2026-03-09 | **v1.38.0** | 新 `inputs.sip`、新 `outputs.influxdb_v3`、嚴格環境變數預設化（breaking） |
| 2026-03-16 | v1.38.1 | hotfix（diskio 換行字元、docker 容器狀態） |
| 2026-03-26 | — | **Telegraf Enterprise Beta + Telegraf Controller 公開** |
| 2026-03-30 | v1.38.2 | 修 v1.38.0 的 Heartbeat output panic |
| 2026-04-20 | v1.38.3 | bug fixes（docker、nftables、opcua_listener、turbostat） |
| 2026-05-11 | **v1.38.4**（最新） | 多項 agent 啟動與安全細節修正 |
| 2026-05-14 | commit `#18909` | agent 開始接受 `TELEGRAF_CONTROLLER_TOKEN` 環境變數——與 Controller beta 對接的 OSS 端證據 |
| 2026-05-15 | commit `#18868` | `inputs.system` 增加硬體資訊收集 |
| 2026-05-16 | — | **首次登上本站 Trending 絕對榜** |

爆紅點判定：本檔判斷 2026-05 突然上 Trending 的最可能驅動力是 **Telegraf Enterprise Beta + Controller 持續發酵**——3 月公開後社群討論升溫、5 月 OSS 主程式正式加入 `TELEGRAF_CONTROLLER_TOKEN` 對接，自架使用者開始實際嘗試 Controller 並回 star / 關注。Release 本身（v1.38.4 在 5-11）也屬同檔節奏，非單一 CVE / 收購 / 大新聞觸發。

## 授權與社群

| 量化鐵錨 | 數值（2026-05-16） |
|---|---|
| Stars | 17,370 |
| Forks | 5,802 |
| Watchers | 17,370 |
| Subscribers（訂閱通知） | 296 |
| Open issues | 404 |
| 主要語言 | Go（接近 100%） |
| License | MIT |
| Default branch | `master` |
| 倉庫大小 | ~83 MB |
| 倉庫年齡 | 10 年 1 個月（2015-04-01 起） |
| 累計貢獻者 | 1,200+（README 自述） |
| 前 5 大貢獻者 commits | danielnelson 1,977 / dependabot[bot] 1,646 / srebhan 913 / sparrc 860 / powersj 817 |
| 近 30 天 release 數 | 1（v1.38.4） |
| 近 90 天 release 數 | 4（v1.38.1–v1.38.4） |
| 近 90 天每週 commit 量級 | 數十級，dependabot 自動 PR + 維護者 PR 並進 |
| Topics | golang, hacktoberfest, influxdb, json, kafka, logs, metrics, modbus, monitoring, mqtt, opcua, telegraf, telemetry-collection, time-series, windows-eventlog, xpath |

社群結構觀察：dependabot 的 1,646 commits 排第二，顯示**依賴升版自動化是這個倉庫的日常**——300+ 外掛各自牽動數百個 Go 模組，沒有 dependabot 幾乎不可能維護；近一週的 commit 流也有近半是 `chore(deps): Bump …`。這種「插件總成 + 依賴大量」的結構是 Telegraf 與 Prometheus exporter 生態的根本差異——一個 binary 把該背的全背進來。

授權選擇 MIT 而非 Apache-2.0，與 InfluxData 自家 [influxdata/influxdb](https://github.com/influxdata/influxdb) 一致；對企業重新封裝（NetApp Cloud Insights Telegraf、SolarWinds Observability、Intel Observability Telegraf Docker image、Dynatrace Hub）友善，這也解釋了為何主要雲廠商與第三方廠商都選擇直接 bundle Telegraf 而不自己造 collector。

## 資料來源

**本體**：
- [influxdata/telegraf repo](https://github.com/influxdata/telegraf)
- [InfluxData Telegraf 產品頁](https://www.influxdata.com/time-series-platform/telegraf/)
- [Telegraf 官方文件](https://docs.influxdata.com/telegraf/v1/)
- [Telegraf 外掛目錄](https://docs.influxdata.com/telegraf/v1/plugins/)
- [Telegraf release notes 完整 changelog](https://docs.influxdata.com/telegraf/v1/about_the_project/release-notes-changelog/)
- [v1.38.0 release page](https://github.com/influxdata/telegraf/releases/tag/v1.38.0)
- [v1.38.4 release page](https://github.com/influxdata/telegraf/releases/tag/v1.38.4)
- [Telegraf Controller 官方文件](https://docs.influxdata.com/telegraf/controller/)
- [outputs.influxdb_v3 文件](https://docs.influxdata.com/telegraf/v1/output-plugins/influxdb_v3/)

**第三方評論**：
- [InfluxData blog：Telegraf Enterprise Beta is Now Available](https://www.influxdata.com/blog/telegraf-enterprise-beta/)
- [InfluxData 社群論壇：Telegraf Enterprise public beta 公告](https://community.influxdata.com/t/announcement-telegraf-enterprise-now-in-public-beta/58393)
- [InfluxData blog：Quick Fix — Updating Telegraf Configs to Send Data to InfluxDB 3.0](https://www.influxdata.com/blog/quick-fix-updating-telegraf-configs-send-data-influxdb-3-0/)
- [Last9 blog：Use Telegraf Without the Prometheus Complexity](https://last9.io/blog/use-telegraf-without-the-prometheus-complexity/)
- [Home Assistant Community：2025 時序 stack 取捨討論串](https://community.home-assistant.io/t/time-series-databases-and-stacks-in-2025-influxdb-telegraf-vs-prometheus-exporters-node-and-cadvisor/897821)
- [Hacker News：Show HN — MavLink Input Plugin for Telegraf](https://news.ycombinator.com/item?id=44009060)
- [SRE School：What is Telegraf? Meaning, Architecture, Examples, Use Cases](https://sreschool.com/blog/telegraf/)
- [eyer.ai：How to use open source metrics agents such as Telegraf and Prometheus](https://www.eyer.ai/blog/how-to-use-open-source-metrics-agents-such-as-telegraf-and-prometheus-for-observability/)
- [HackMD：Telegraf 與 InfluxDB 輕鬆實現資料收集與存儲（繁中）](https://hackmd.io/@fLqVWb1tQxmEVn9x8EpToQ/H1FkyVvvyl)
- [EPH 程式日記：Telemetry — 使用 Telegraf 和 InfluxDB（繁中）](https://ephrain.net/telemetry-%E4%BD%BF%E7%94%A8-telegraf-%E5%92%8C-influxdb%EF%BC%8C%E8%A8%98%E9%8C%84%E7%B3%BB%E7%B5%B1%E8%B3%87%E6%BA%90%E4%BD%BF%E7%94%A8%E9%87%8F/)
- [iThome 鐵人賽 Day 18：監測服務 InfluxDB & Telegraf（繁中）](https://ithelp.ithome.com.tw/m/articles/10248241)
- [Azure Monitor 官方教學：使用 Telegraf 收集 Linux VM 自訂指標（繁中）](https://learn.microsoft.com/zh-tw/azure/azure-monitor/agents/collect-custom-metrics-linux-telegraf)
- [AWS Timestream 文件：開放原始碼 Telegraf 整合（繁中）](https://docs.aws.amazon.com/zh_tw/timestream/latest/developerguide/Telegraf.html)
- [CSDN：Telegraf 介紹和使用（簡中）](https://blog.csdn.net/qq_44766883/article/details/131496094)
- [CVE Details：InfluxData Telegraf 漏洞索引](https://www.cvedetails.com/product/90481/Influxdata-Telegraf.html?vendor_id=21888)
- [GitHub Security Advisories](https://github.com/influxdata/telegraf/security/advisories)

**同類工具**：
- [prometheus/node_exporter](https://github.com/prometheus/node_exporter)
- [vectordotdev/vector](https://github.com/vectordotdev/vector)
- [grafana/alloy](https://github.com/grafana/alloy)
- [grafana/agent](https://github.com/grafana/agent)（已棄用）
- [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector)
- [Grafana 官方 FAQ：From Agent to Alloy](https://grafana.com/blog/grafana-agent-to-grafana-alloy-opentelemetry-collector-faq/)

## 更新紀錄
