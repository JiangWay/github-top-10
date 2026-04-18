# 深度研究檔寫法守則（research/*.md）

> 此檔與 [CLAUDE.md](../CLAUDE.md) 搭配閱讀。CLAUDE.md 規範**何時**做研究與 frontmatter，本檔規範**怎麼寫**研究內文。
>
> 風格基準取自同作者在 `obsidian-ctbcins` vault 中的五份深度研究報告（gstack / karpathy-llm-wiki / openspec / speckit / superpowers），整理為單檔版本的必填骨架與寫法守則。

---

## 一、Preamble blockquote（必填，研究檔第一段）

所有研究檔在 H1 標題之下、第一段正文之前，**必須**放一個 blockquote，含下列欄位：

```markdown
# [owner/repo](https://github.com/owner/repo)

> 研究日期：YYYY-MM-DD
> 研究來源：<repo URL>
> 觸發原因：<首次上絕對榜 | 增長率榜連續 3 天上榜>
> 報告作者：Claude Code（claude.ai/code）
```

理由：未來做研究檔 diff 時能機器讀取日期與觸發原因；正文首段有視覺錨。

---

## 二、必填 10 段骨架（段落標題與順序固定）

| # | 段落 | 必答問題 | 主要資料來源 |
|---|---|---|---|
| 1 | 一句話定位 | 它是什麼、口號 / tagline | README 首段 + repo description |
| 2 | 作者與起源 | who / when / why、關鍵履歷、重要時間軸 | GitHub owner 頁、blog、外部報導 |
| 3 | 核心架構 / 主要概念 | 技術堆疊、關鍵抽象、獨有術語 | README 技術章節 + 原始碼目錄結構 |
| 4 | 設計哲學 | 背後的設計原則 / ETHOS（**引原文 block quote + 翻譯**） | README、官方 blog、ETHOS.md 類文件 |
| 5 | 目標使用者與適用情境 | 誰會用、什麼時候**不**適用 | README use case 段 + 作者主張 |
| 6 | 與類似專案的差異 | vs 競品的 delta，點名 **1–2 個**競品 | WebSearch + 領域知識 |
| 7 | 外部評論 | 第三方聲音（**每一則必附來源超連結**） | WebSearch HN / Reddit / 媒體 / 中文社群 |
| 8 | Release 狀態 / 時間軸 | 建 repo → 第一個 release → 爆紅點 → 最新版 | `gh api .../releases` + README milestone |
| 9 | 授權與社群（量化鐵錨） | License、stars / forks / issues、主力語言比例、topics、**stars 增長速率** | `gh api repos/{owner}/{repo}` |
| 10 | 資料來源 | 分類列表（本體 / 第三方 / 同類工具） | 彙整前述段落的所有 URL |

規則：

- **段落標題與順序固定**，不得省略或改名。
- 資料不足時寫「**資料不足**」並說明已查過哪些來源（例：「未見顯著 HN / Reddit 串討論，資料不足」），保留空殼段落。
- 最後固定保留一個空的 `## 更新紀錄` 區塊（第 10 段「資料來源」之後），供「再次上榜」append 用。

---

## 三、依類型加重（在既有段落內延伸，不新增段落）

| 專案主類型 | 加重方向 |
|---|---|
| **AI Agent 框架 / LLM 工具** | 「核心架構」加重協定設計、與 MCP / AutoGPT 的差異；「與類似專案的差異」須點名 1–2 個同類框架 |
| **硬體 / 穿戴 / 裝置** | 「核心架構」加重 BOM、隱私合規（SOC2 / HIPAA）；「目標使用者」加重 self-host 可行性 |
| **金融 / 股票 / 量化** | 「核心架構」加重資料源與牌照；「外部評論」加重回測可信度與社群質疑 |
| **資安工具** | 「一句話定位」明確標示攻 / 防立場；「外部評論」加重 responsible disclosure 狀態與被濫用風險 |
| **開發者工具 / CLI / IDE 擴充** | 「與類似專案的差異」對比主流工具（VSCode、Cursor、[Claude Code](https://github.com/anthropics/claude-code) 等） |
| **SDD / Spec-driven 工具** | 「設計哲學」加重 vibe coding 脈絡；「與類似專案的差異」須對比 OpenSpec、Spec Kit、Kiro |
| **個人知識庫 / 筆記系統** | 「核心架構」加重檔案格式、跨工具互通；「目標使用者」加重 LLM agent 介面 |

---

## 四、九個寫法守則

### 1. Preamble blockquote 開場
**規則**：每個研究檔 H1 之下、正文之前放 blockquote，含研究日期 / 來源 URL / 觸發原因。
**反例**：直接進入正文無視覺錨，未來 diff 時只能從 frontmatter 讀日期。

### 2. 「一句話定位」+ 副標
**規則**：用一句話把「是什麼」講清楚，再用副標或下一句補強獨特點。動詞要具體、避免「全面、強大、最佳」等空詞。
**正例**：「[gstack](https://github.com/garrytan/gstack) 是 Garry Tan 開源的 Claude Code skill 套件，把單一 AI coding agent 變成一支由 23+ 個專業角色組成的『虛擬工程團隊』，並附帶一個常駐的 headless 瀏覽器 daemon 用於 QA。」

### 3. 作者 / 起源故事獨立成段
**規則**：標示 who、when、why 以及關鍵履歷（非 LinkedIn 式條列，而是敘事）。
**為何**：判斷可持續性——個人專案 vs 企業背書、作者過往產出紀錄、爆紅事件脈絡。
**正例**：「Jesse Vincent（GitHub `obra`、Prime Radiant CEO）在 2025-10-09 釋出……半年內 GitHub stars 衝破 13 萬。」

### 4. 設計哲學段引原文 block quote
**規則**：引 README / blog 中**最能代表設計主張**的一段原文，用 blockquote 呈現，後附中文翻譯或解讀。
**正例**：
> "AI coding assistants are powerful but unpredictable when requirements live only in chat history."

每個專案最多引 1–3 段原文，貪多反而稀釋。

### 5. 量化鐵錨
**規則**：出現數字的地方要具體——不寫「stars 很多」，寫「約 37.8k stars / 2.6k forks / 51 contributors，40 天內發了 10 個版本」。增長速率優於絕對值。
**對象**：stars、forks、issues、PRs、contributors、release 數、單檔行數、語言佔比、近期 PR 速率。

### 6. 競品比較表
**規則**：「與類似專案的差異」段至少有一張對比表，點名 1–2 個具名競品（不是「其他類似工具」泛稱）。欄位至少含「對手」+「本專案的差異」。情境允許時加「什麼時候選誰」的選型建議。

### 7. 資料缺口誠實標註
**規則**：查不到就寫查不到，並寫已查過的來源。**禁止**用「據說」「可能」「一般而言」硬湊。
**正例**：「未見顯著 HN / Reddit 串討論，資料不足。」
**反例**：「社群評價普遍正面」（沒有來源）。

### 8. 外部評論必附連結
**規則**：第 7 段每一則外部評論都要 markdown 超連結到原文。無法連結的（付費內容、已下架）要標註「（來源僅存快取）」。
**為何**：Obsidian 研究用，JiangWay 會點進去讀。

### 9. 資料來源 footer 分類列表
**規則**：第 10 段以分類列表呈現：
- **本體**：repo、官網、npm/PyPI / crate 頁
- **第三方評論**：HN / Reddit / 部落格 / 媒體
- **同類工具**：比較到的競品連結

---

## 五、機器可驗證檢查清單

研究檔生成後，下列條件可程式化檢查（未來可寫 pre-commit hook）：

- [ ] H1 標題是 `# [owner/repo](https://github.com/owner/repo)` 格式
- [ ] H1 之下第一個 block 是 `>` blockquote 且含「研究日期：」
- [ ] 存在下列 10 個 H2（順序固定）：
  - `## 一句話定位`
  - `## 作者與起源`
  - `## 核心架構 / 主要概念`
  - `## 設計哲學`
  - `## 目標使用者與適用情境`
  - `## 與類似專案的差異`
  - `## 外部評論`
  - `## Release 狀態 / 時間軸`
  - `## 授權與社群`
  - `## 資料來源`
- [ ] 檔尾存在空的 `## 更新紀錄`
- [ ] 「外部評論」段所有列表項目含 `](http` 超連結
- [ ] 「與類似專案的差異」段至少 1 個 markdown 表格
- [ ] frontmatter 欄位齊全（見 CLAUDE.md）

---

## 六、參考範本

本守則的風格基準：

- `obsidian-ctbcins/gstack-research-report/`（多檔版，本守則為單檔化版本）
- `obsidian-ctbcins/superpowers-research-report/`
- `obsidian-ctbcins/openspec-research-report/`
- `obsidian-ctbcins/speckit-research-report/`
- `obsidian-ctbcins/karpathy-llm-wiki-research-report/`

本 repo 現有研究檔（骨架升級前的舊版，僅供對照）：

- [research/BasedHardware__omi.md](../research/BasedHardware__omi.md)
- [research/EvoMap__evolver.md](../research/EvoMap__evolver.md)
