---
repo: HKUDS/RAG-Anything
first_seen: 2026-04-22
last_updated: 2026-04-22
appearances: [2026-04-22]
growth_appearances: [2026-04-22]
has_releases: true
latest_release: v1.2.10
tags: [RAG 框架, 框架, 開源替代]
domain: RAG 框架
form: 框架
themes: [開源替代]
---

# HKUDS/RAG-Anything

[HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything) 是香港大學資料科學實驗室（HKUDS）繼 [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) 之後推出的多模態 RAG 框架。MIT 授權、Python 主體，2026-04-22 有 16,732 stars、1,995 forks，當日 +256 stars。對應論文 [arXiv:2510.12323](https://arxiv.org/abs/2510.12323)。主要維護者 [LarFii](https://github.com/LarFii) 同時也是 LightRAG 的核心作者。

## 深度研究（2026-04-22 首次）

### 專案定位
RAG-Anything 的一句話定位是「All-in-One Multimodal RAG」——把傳統 RAG 從純文字擴充成能同時吃進文字、圖、表、公式、圖表的統一管線。它不是從零打造，而是**架在 [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) 之上**的多模態外掛層：LightRAG 提供知識圖譜 + dual-level 檢索內核，RAG-Anything 負責「把各種檔案變成 LightRAG 能吃的東西」，並補上跨模態檢索。

### 核心架構 / 主要概念
README 把流程明寫為**五階段 pipeline**：(1) Document Parsing（串接 [opendatalab/MinerU](https://github.com/opendatalab/MinerU)、[docling-project/docling](https://github.com/docling-project/docling) 或 PaddleOCR）；(2) Content Understanding 分流；(3) Multimodal Analysis Engine 針對圖／表／公式分派專屬分析器；(4) **Multimodal Knowledge Graph Index**——雙圖構造同時捕捉跨模態關係與語義；(5) Modality-Aware Retrieval，混合向量與圖遍歷。近期更新加入 **VLM-Enhanced Query**，遇到含圖文件時把圖像直接餵給 VLM 做視覺推理。

### 目標使用者
README 列的典型場景是學術論文、技術文件、財報分析、企業知識管理——共通點是「一份 PDF 裡文字、表格、圖、公式混著跑」。支援格式涵蓋 PDF、Office 全家餐（DOC/DOCX/PPT/PPTX/XLS/XLSX）、圖片（JPG/PNG/BMP/TIFF/GIF/WebP）、TXT/MD。裝 `pip install raganything` 即可，處理 Office 檔需要本機 LibreOffice。

### 與類似專案的差異
- 對 [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)：是擴充而非替代，既有 LightRAG 實例可直接升級成多模態。
- 對 [microsoft/graphrag](https://github.com/microsoft/graphrag)：都走 KG-based RAG，但 GraphRAG 聚焦純文字摘要樹，RAG-Anything 強調**跨模態實體抽取**。
- 對 [infiniflow/ragflow](https://github.com/infiniflow/ragflow)：RAGFlow 是帶 UI 的完整產品，RAG-Anything 是 SDK-first 框架，更接近研究者 / 平台開發者口味。
- 對 [run-llama/llama_index](https://github.com/run-llama/llama_index)、[deepset-ai/haystack](https://github.com/deepset-ai/haystack)：兩者是通用 RAG orchestration，多模態靠外掛；RAG-Anything 把多模態列為第一公民，也因此範圍更窄。

### 外部評論
- [36Kr 專題](https://eu.36kr.com/en/p/3358608090400776) 強調「HKU 開源的統一多模態知識圖譜」定位。
- [Mayurkumar Surani 於 Medium 的實作指南](https://mayursurani.medium.com/rag-anything-the-complete-guide-to-building-multimodal-ai-systems-with-all-in-one-6b88137fba4e) 介紹從安裝到多模態查詢的端到端流程。
- [Engr Mejba Ahmed 的部落格](https://www.mejba.me/blog/rag-anything-multimodal-rag-guide) 實測把掃描 PDF 轉成可檢索知識庫。
- [ht-x.com 的技術導讀](https://ht-x.com/en/posts/2025/09/rag-anything-all-in-one-rag-framework/) 聚焦框架架構與論文貢獻。
- Hugging Face 論文頁 [papers/2510.12323](https://huggingface.co/papers/2510.12323) 彙整社群討論。

### Release 狀態
最新 Release 為 [v1.2.10](https://github.com/HKUDS/RAG-Anything/releases/tag/v1.2.10)（2026-03-24），主要修正 MinerU 2.0 欄位相容、docling 輸出格式處理等整合層 bug。版本節奏大致月更，顯示專案仍在積極迭代。

### 授權與社群
MIT 授權，開 Discussions、Issues 兩條管道。貢獻者分布以華人開發者為核心：首位 [LarFii](https://github.com/LarFii)（164 commits）、[Jah-yee](https://github.com/Jah-yee)、[chaohuang-ai](https://github.com/chaohuang-ai)、[Zongwei9888](https://github.com/Zongwei9888) 等皆為 HKUDS 相關研究者或合作者；另有外部社群如 [wkpark](https://github.com/wkpark)、[didier-durand](https://github.com/didier-durand) 貢獻整合層修補。1,995 個 fork 數對上線不到一年的框架而言，已展現接近主流 RAG 工具的採用度。
