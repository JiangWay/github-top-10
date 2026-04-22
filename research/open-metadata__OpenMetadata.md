---
repo: open-metadata/OpenMetadata
first_seen: 2026-04-23
last_updated: 2026-04-23
appearances: [2026-04-23]
growth_appearances: []
has_releases: true
latest_release: 1.12.6-release
tags: [企業治理, 應用程式, 自架, 企業級]
domain: 企業治理
form: 應用程式
themes: [自架, 企業級]
---

# [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata)

> 研究日期：2026-04-23
> 研究來源：<https://github.com/open-metadata/OpenMetadata>
> 觸發原因：首次上絕對榜（#6，stars_today +609）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

OpenMetadata 是以中央 metadata repository 為核心的開源「資料智能」平台，一次整合 data discovery、column-level lineage、data quality、observability 與 governance，目標是取代 Collibra、Alation 這類企業型資料目錄工具。

## 作者與起源

由 [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) 於 2021 年 8 月開源，背後主導公司是 **Collate**。共同創辦人是 **Suresh Srinivas**（CEO）與 **Sriharsha Chintalapani**（CTO）——兩人分別是 Apache Hadoop 的創造者之一與 Apache Kafka / Storm 的 PMC committer，之前在 Hortonworks、Uber 任 Chief Data Architect，OpenMetadata 即脫胎自 Uber 內部的 uMetadata 與 Databook。Collate 於 2025 年完成 10M 美元 Series A。

## 核心架構 / 主要概念

四大支柱：(1) **Metadata Schemas** 以 JSON Schema 定義所有資料資產的標準 vocabulary；(2) **Metadata Store** 以 MySQL / PostgreSQL 當文件儲存、Elasticsearch / OpenSearch 當搜尋；刻意**不用** graph database，仍以關聯 table 實作 column-level lineage；(3) **Metadata APIs** 提供 REST/Python SDK；(4) **Ingestion Framework** 以 pluggable Python connectors 覆蓋 Snowflake、BigQuery、Databricks、Tableau、Airflow、Kafka 等 84+ 來源。1.12 版已內建 MCP Server（`openmetadata-mcp`），讓 LLM agent 可查詢 metadata 與 lineage。

## 設計哲學

「Simplicity over sophistication」——用最少的元件（約 3–4 個服務）撐起 Collibra 等級的功能覆蓋。相較 DataHub 的 Kafka-driven event 架構，OpenMetadata 賭的是多數企業不需要 real-time metadata stream，反而需要可維運、可自架、可 self-serve 的「collaborative data catalog」：discovery、governance、quality、lineage、observability 全部在同一個 UI 裡協作。

## 目標使用者與適用情境

中大型企業資料團隊（data platform / governance），特別是已有 Snowflake + Airflow + dbt + BI 的 modern data stack 使用者；需要 SOX / GDPR / HIPAA 合規稽核的組織；以及想擺脫 Collibra / Alation 授權費的公司。不適合純 data lakehouse（Delta、Iceberg）重度使用者——Reddit 反覆回報 lakehouse connectors 仍偏弱。

## 與類似專案的差異

- [linkedin/datahub](https://github.com/datahub-project/datahub)：LinkedIn 出身，event-driven、Kafka/JanusGraph/Neo4j 多組件，彈性高但運維重，適合 data mesh。
- [amundsen-io/amundsen](https://github.com/amundsen-io/amundsen)：Lyft 出身，偏純 discovery，UI 乾淨但 governance/quality 單薄，社群活躍度下滑。
- [MarquezProject/marquez](https://github.com/MarquezProject/marquez)：OpenLineage reference impl，專注 lineage、不做 catalog。
- [apache/atlas](https://github.com/apache/atlas)：Hadoop 時代產物，與 Ranger/Hive 綁得深，現代 cloud 整合有限。

OpenMetadata 的競爭優勢：**廣度 + 架構簡潔**，用一個 repo 涵蓋 catalog / quality / lineage / observability 四件事。

## 外部評論

- [TheDataGuy — Strategic Analysis of OpenMetadata, DataHub, Atlas, Amundsen (2025/08)](https://thedataguy.pro/blog/2025/08/open-source-data-governance-frameworks/)：OpenMetadata 在 OSS usability 與 connector 廣度上勝出，DataHub 勝在 event-driven model。
- [Atlan — OpenMetadata vs DataHub (2025)](https://atlan.com/openmetadata-vs-datahub/)：指出 OpenMetadata 適合「要 catalog + governance + workflow 一包」的團隊。
- [Reddit r/dataengineering 討論串](https://www.reddit.com/r/dataengineering/)：傳統 DB connector 體驗好，但 lakehouse（Delta / Iceberg）支援仍偏弱，建議先 PoC。
- [Show HN: OpenMetadata (2024/07)](https://news.ycombinator.com/item?id=40987501)：HN 社群對「不需要 Kafka 的 metadata 平台」普遍正面。
- [Provectus — Finding the Right Data Catalog](https://medium.com/provectus/finding-the-right-data-catalog-solution-a265a4b3c0c3)：企業採購實務視角。

## Release 狀態 / 時間軸

有 release。**最新版 1.12.6（2026-04-22）**，累計 205 個 release，節奏極穩。1.12.x 強化了 SAML SSO、reindex 效能、vector embedding 流程，並修掉多個 MCP Java SDK 相關 CVE。<https://github.com/open-metadata/OpenMetadata/releases/tag/1.12.6-release>

## 授權與社群

Apache-2.0。12,066 stars、1,988 forks、54 subscribers、16,179+ commits、729 open issues；Topics 涵蓋 `data-catalog`、`data-lineage`、`mcp-server`、`data-contracts`。商業母公司 Collate 提供 managed SaaS。

## 資料來源

- <https://github.com/open-metadata/OpenMetadata>
- `gh api repos/open-metadata/OpenMetadata`
- `gh api repos/open-metadata/OpenMetadata/releases`
- [Collate Series A 新聞稿](https://www.prnewswire.com/news-releases/collate-raises-10m-series-a-to-solve-the-data-intelligence-challenges-for-enterprise-customers-302505020.html)
- [Suresh Srinivas LinkedIn](https://www.linkedin.com/in/sureshsri/)
- 上述外部評論連結

## 更新紀錄

- **2026-04-23（首次上榜）**：完成首次完整深度研究。
- **Taxonomy 註記**：本專案被歸為 `企業治理`（涵蓋架構治理、合規、EA）。但嚴格看 OpenMetadata 屬「資料治理 / 資料基礎建設」，與 EA 類專案（如 Archimate）的氣味其實不同；若未來同類專案（DataHub、Atlas、Amundsen、Marquez）也陸續登榜，建議擴充 controlled vocabulary 新增 `資料治理` domain（涵蓋 data catalog / lineage / observability / quality），以避免與 EA 類混在同一桶。此次先維持既有 vocab 不動，待第 2 件同類專案出現時再一次性調整 CLAUDE.md。

<!-- append future re-appearances here -->
