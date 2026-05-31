---
repo: microsoft/markitdown
first_seen: 2026-05-31
last_updated: 2026-05-31
appearances: [2026-05-31]
growth_appearances: [2026-05-31]
has_releases: true
latest_release: v0.1.6
tags: [文件管理, 框架, 開源替代, 資料主權]
domain: 文件管理
form: 框架
themes: [開源替代, 資料主權]
---

# [microsoft/markitdown](https://github.com/microsoft/markitdown)

## 深度研究（2026-05-31 首次）

### 專案定位

[microsoft/markitdown](https://github.com/microsoft/markitdown)（134,050 stars / 9,169 forks / 2024-11-13 建立 / MIT / 純 Python）是微軟官方推出的「萬物轉 Markdown」工具——把 PDF、Office 文件、圖片、音訊、HTML、ZIP、YouTube 連結等異質格式統一轉成 Markdown，**專為餵給 LLM 攝取而設計**。今日以 +2,759 stars / growth_rate 2.06% 首登絕對榜 #2，是本站歷來「微軟官方倉」少數登榜事件之一。倉建立僅一年半即累積 13.4 萬 stars，是 RAG / LLM 前處理生態裡的事實標準入口工具之一；topics 標示 `autogen`、`autogen-extension`、`langchain`、`openai` 顯示其定位緊貼 agent / LLM pipeline，而非通用 ETL。

### 核心架構 / 主要概念

- **支援格式廣度**：PDF、PowerPoint（PPTX）、Word（DOCX）、Excel（XLSX）、EPUB、圖片（EXIF metadata + OCR）、音訊（WAV/MP3 metadata + 語音轉錄）、HTML、CSV、JSON、XML、ZIP 壓縮檔、YouTube URL，單一 `convert()` 呼叫即輸出 Markdown
- **設計哲學**：Markdown「極接近純文字、標記最少，卻仍能表達標題 / 清單 / 表格 / 連結等重要文件結構」，與 LLM 原生的文字處理與生成方式天然相容——這是它刻意不追求高保真 layout、而追求 LLM-friendly 的核心取捨
- **內建 MCP server**：monorepo 內含獨立 `markitdown-mcp` 套件，自 v0.1.5 起把 markitdown 包成 Model Context Protocol server，讓 Claude Desktop / Claude Code 等 LLM 客戶端可直接 discover 並呼叫此轉換工具
- **LLM 整合（選用）**：`convert()` 接受 `llm_client` + `llm_model`（以 OpenAI 測試）+ 可自訂 `llm_prompt`，用於為 PowerPoint 與圖片生成影像描述（image captioning）
- **Azure 雲端整合**：CLI `-d` 旗標 / Python `docintel_endpoint` 參數接 Azure Document Intelligence；v0.1.6 新增 Azure Content Understanding converter，提供更高品質、含結構化欄位抽取的轉換
- **plugin 架構**：支援第三方外掛（預設關閉），可透過 GitHub hashtag `#markitdown-plugin` 搜尋；官方提供 `markitdown-sample-plugin` 模板，`markitdown-ocr` 外掛則以 LLM vision 為 PDF/DOCX/PPTX/XLSX 補 OCR
- **monorepo 結構**：`/packages/` 下含 `markitdown`（核心）、`markitdown-mcp`（MCP server）、`markitdown-ocr`（OCR）、`markitdown-sample-plugin`（外掛模板）；安裝 `pip install 'markitdown[all]'`，三行 Python 即用：`MarkItDown().convert("test.xlsx").text_content`

### 目標使用者

建構 RAG / 文件問答 pipeline、需把雜亂格式文件統一成 LLM 可讀文字的 AI 工程師；用 AutoGen / LangChain 等框架做 agent 工作流、需要文件攝取前處理層的開發者；想把 Office / PDF 內容快速塞進 ChatGPT / Claude 的一般使用者；以及透過 MCP server 讓 LLM 客戶端原生具備「讀任意檔案」能力的 Claude Desktop / Claude Code 使用者。

### 與類似專案的差異

| 對手 | 差異 |
|---|---|
| [docling-project/docling](https://github.com/docling-project/docling)（IBM Research） | Docling 對複雜文件（表格 / 公式 / 多欄學術排版）保真度高、內建 OCR；markitdown 速度快 50–100×，但結構保真度低、依賴外部 utility。Docling 適合學術 / 複雜 layout，markitdown 適合乾淨的商務文件 / 試算表 / 簡報 |
| [jina-ai/reader](https://github.com/jina-ai/reader) | Jina Reader 走 API 把**網頁 / URL** 轉 Markdown（web scraping 場景）；markitdown 走本地 Python library 轉**本機檔案 / Office 文件**，使用情境不同 |
| [VikParuchuri/marker](https://github.com/VikParuchuri/marker) | Marker 需 GPU 預算、追求最高保真 PDF 轉換；markitdown 純 CPU、輕量、快速但保真度較低 |
| [Unstructured-IO/unstructured](https://github.com/Unstructured-IO/unstructured) / Kreuzberg | 同屬文件抽取 library 對照組；markitdown 主打簡單 + 速度，PDF 用 pdfminer.six 僅處理文字型 PDF |

差異化關鍵：markitdown 的賣點不是保真度而是**「微軟官方背書 + 極簡 API + 廣格式 + 內建 MCP server + 快」**，在乾淨數位文件 / Office / 試算表 / 簡報的常見場景以速度與易用性取勝。

### 外部評論（每則附超連結）

- [InfoWorld《MarkItDown: Microsoft's open-source tool for Markdown conversion》](https://www.infoworld.com/article/3963991/markitdown-microsofts-open-source-tool-for-markdown-conversion.html)：主流科技媒體報導，定位為 LLM 時代的文件轉換 utility
- [Starlog《MarkItDown: How Microsoft Built a Document Converter for the LLM Era》](https://starlog.is/articles/developer-tools/microsoft-markitdown/)：深度介紹其為 LLM 而生的設計取向
- [Nils Durner《Document-to-Markdown Converters for LLM Use》](https://ndurner.github.io/markitdown-docling-document-parsing) 與 [danilchenko.dev《MarkItDown vs Docling vs Marker: PDF to Markdown for LLMs》](https://www.danilchenko.dev/posts/markitdown-vs-docling-vs-marker/)：第三方橫向評測，普遍結論為 markitdown「速度 50–100× 領先、保真度落後 Docling/Marker」
- [DEV Community《I benchmarked 4 Python text extraction libraries (2025)》](https://dev.to/nhirschfeld/i-benchmarked-4-python-text-extraction-libraries-2025-4e7j)：94 份真實文件 benchmark，markitdown 比 Docling 快約 100×、比 Kreuzberg 快約 3×，但 PDF 成功率約 25%、整體平均 47.3%，並指出其會剝離 PDF 的標題 / 清單等格式
- [Giacomo Carfì《MarkItDown + Ollama and LLaVA》Medium](https://medium.com/@giacomo__95/markitdown-ollama-and-llava-markdown-conversion-with-microsofts-markitdown-and-ollama-s-llm-2141bba9d183)：示範以本地 Ollama + LLaVA 取代 OpenAI 做圖片描述，呼應資料主權 / 自帶模型路線
- [Analytics Vidhya《8 Things To Do With Microsoft's MarkItDown Library》](https://www.analyticsvidhya.com/blog/2025/12/microsofts-markitdown-uses/) 與 [BrightCoding《Transform Any File Into LLM-Ready Markdown》](https://www.blog.brightcoding.dev/2026/04/17/markitdown-transform-any-file-into-llm-ready-markdown)：教學型實作文，強調單函式呼叫的易用性

評論共識：markitdown 是「快速、簡單、官方」的 LLM 前處理首選，但保真度（尤其複雜 PDF）是其公認弱點，需求高保真者應評估 Docling / Marker。

### Release 狀態

active，最新 [v0.1.6](https://github.com/microsoft/markitdown/releases/tag/v0.1.6)（2026-05-26 發佈，與倉 `pushed_at` 2026-05-26 同步顯示 main 分支活躍）。v0.1.6 主要變更：新增 OCR layer service 處理嵌入圖片與 PDF、修復 PDF 轉換記憶體暴增（正確關閉 page）、新增 Azure Content Understanding converter、修復深度巢狀 HTML 的 RecursionError、強化非本機介面綁定的安全警告。此前 v0.1.5（2026-02）引入 markitdown-mcp（MCP server）為重要里程碑。

### 授權與社群

- **授權**：MIT（寬鬆授權，利於商業整合與 fork）
- **貢獻結構**：核心由微軟員工主導——[afourney](https://github.com/afourney)（102 commits，Adam Fourney，微軟研究院）+ [gagb](https://github.com/gagb)（70 commits）為兩大主力，其後 [sugatoray](https://github.com/sugatoray)（9）、[PetrAPConsulting](https://github.com/PetrAPConsulting)（8）、[l-lumin](https://github.com/l-lumin）（7）為零星社群貢獻；典型「微軟小團隊主導 + 廣泛社群 PR」結構
- **量化指標**：134,050 stars / **9,169 forks**（fork 比例約 6.8%，反映大量整合 / 客製需求）/ 774 open issues（issue 量大，符合廣用工具的回報密度）
- **Homepage**：無
- **Topics**：`autogen`、`autogen-extension`、`langchain`、`markdown`、`microsoft-office`、`openai`、`pdf` 共 7 個，明確錨定 LLM / agent 生態

## 資料來源

**本體**
- Repo：<https://github.com/microsoft/markitdown>
- Releases：<https://github.com/microsoft/markitdown/releases>
- 最新版：<https://github.com/microsoft/markitdown/releases/tag/v0.1.6>
- monorepo packages：<https://github.com/microsoft/markitdown/tree/main/packages>

**外部評論與比較**
- [InfoWorld 報導](https://www.infoworld.com/article/3963991/markitdown-microsofts-open-source-tool-for-markdown-conversion.html)
- [Starlog 深度介紹](https://starlog.is/articles/developer-tools/microsoft-markitdown/)
- [Nils Durner: markitdown vs docling](https://ndurner.github.io/markitdown-docling-document-parsing)
- [danilchenko.dev: MarkItDown vs Docling vs Marker](https://www.danilchenko.dev/posts/markitdown-vs-docling-vs-marker/)
- [DEV Community: benchmark 4 libraries](https://dev.to/nhirschfeld/i-benchmarked-4-python-text-extraction-libraries-2025-4e7j)
- [Medium: MarkItDown + Ollama + LLaVA](https://medium.com/@giacomo__95/markitdown-ollama-and-llava-markdown-conversion-with-microsofts-markitdown-and-ollama-s-llm-2141bba9d183)
- [Analytics Vidhya: 8 uses](https://www.analyticsvidhya.com/blog/2025/12/microsofts-markitdown-uses/)
- [BrightCoding 教學](https://www.blog.brightcoding.dev/2026/04/17/markitdown-transform-any-file-into-llm-ready-markdown)
