---
repo: VectifyAI/PageIndex
first_seen: 2026-05-08
last_updated: 2026-05-08
appearances: [2026-05-08]
growth_appearances: [2026-05-08]
has_releases: false
latest_release: null
tags: [RAG 框架, 框架, 開源替代]
domain: RAG 框架
form: 框架
themes: [開源替代]
---

# [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)

## 深度研究（2026-05-08 首次）

### 專案定位
無向量資料庫的 reasoning-based RAG 框架：把長文件先轉成階層式「目錄樹」索引，再讓 LLM 像人類專家翻書一樣以推理在樹上導航定位答案，完全不走 embedding similarity。

### 核心架構 / 主要概念
兩階段流水線。第一階段把 PDF 拆解為 section → subsection → page → block 的樹狀索引（類似 Table of Contents），不做人工固定 chunking、保留自然章節邊界。第二階段檢索時不算 cosine 相似度，改由 LLM 在每個節點做 yes/no 判斷是否要展開子樹（tree search policy），最終回傳一條可審計的 trace：哪些章節被打開、哪些被略過、哪些命中證據，可重播亦可揭露給終端使用者。專案也提供 MCP server [VectifyAI/pageindex-mcp](https://github.com/VectifyAI/pageindex-mcp)，讓 [Claude](https://claude.ai)、Cursor 等客戶端把這棵樹直接放進 context 裡推理。

### 目標使用者
專業長文件場景：財報、招股書、法規、學術教科書、技術規範、法律盡調與合規分析；對「答案要可解釋、可回溯來源」的金融、法律、醫療團隊。

### 與類似專案的差異
- 對比一般 vector RAG（[langchain-ai/langchain](https://github.com/langchain-ai/langchain) / [run-llama/llama_index](https://github.com/run-llama/llama_index) 預設管線）：不需要 chunk、不需要 embedding、不需要向量庫，少一整層基礎建設與 chunk-size 調參。
- 對比 [microsoft/graphrag](https://github.com/microsoft/graphrag)：GraphRAG 先建實體—關係圖再做 community summary，重在多文件的關聯歸納；PageIndex 重在單一長文件的章節導航，不抽實體圖。
- 對比 [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) 與 [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything)：兩者仍是「向量 + 圖」混合管線，PageIndex 直接刪掉向量這一層。

### 外部評論
- [Show HN: PageIndex – Vectorless RAG](https://news.ycombinator.com/item?id=45036944)：HN 留言肯定其檢索路徑「透明、結構化、可解釋」，更貼近人類翻書而非 embedding 比對。
- [Alden Do Rosario, Medium](https://medium.com/@aldendorosario/no-pageindex-will-not-kill-rag-but-it-is-indeed-excellent-in-some-cases-11bc67473145)：認為它不會「終結 RAG」，但在高風險、單一長文件分析（法律審閱、財務盡調、合規）非常突出；官方也承認目前主打單文件 QA，>5 份文件需另搭技術。
- [MarkTechPost 報導](https://www.marktechpost.com/2026/02/22/vectifyai-launches-mafin-2-5-and-pageindex-achieving-98-7-financial-rag-accuracy-with-a-new-open-source-vectorless-tree-indexing/)：強調 Mafin 2.5 在 FinanceBench 達 98.7% 準確率，由 PageIndex 驅動。
- [Towards AI 評析](https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478?gi=d07d5d56e011)：點出「丟掉向量庫仍能達 98.7%」的反直覺賣點。

### Release 狀態
尚無 GitHub Release（`gh api .../releases` 回傳空陣列）。版本演進靠 main 分支 commit，最近一次 push 為 2026-05-07。

### 授權與社群
MIT License。Owner 為組織帳號 [VectifyAI](https://github.com/VectifyAI)，產品線含 PageIndex（開源）與 Mafin 2.5（雲端服務）。今日 stars_total 29,426、forks 2,484、open issues 140，主要語言 Python；topics 涵蓋 `agentic-ai`、`context-engineering`、`rag`、`reasoning`。

### 為何今日上榜
單日 +953 stars 推上 trending #7。推測催化劑為 [PageIndex File System](https://pageindex.ai/blog/pageindex-filesystem)（大規模文件搜尋擴充）與 MCP server 同步傳播，再加上「無向量庫卻拿 FinanceBench 98.7%」的反差敘事在中英文社群持續發酵。

### 風險與限制
官方明說目前最佳場景是單一長文件 QA，文件數 >5 需另接技術；每個節點都呼叫 LLM 做判斷，token 成本與延遲會隨樹深與文件長度線性放大；index 品質高度依賴 PDF 解析與章節結構，掃描型或無 ToC 文件效果未知；此外仍無 release tag，生產環境需自行 pin commit。

### 觀察建議
追蹤兩件事：(1) 多文件擴展（File System 版）能否解掉 >5 份文件的瓶頸；(2) 是否出現第三方在非財報領域（法律、醫學、學術）的獨立 benchmark，驗證 reasoning-based 檢索是否能穩定壓過 vector RAG。若兩者都正向，PageIndex 有機會成為長文件 RAG 的新預設選項。
