---
repo: asgeirtj/system_prompts_leaks
first_seen: 2026-07-05
last_updated: 2026-07-05
appearances: [2026-07-05]
growth_appearances: [2026-07-05]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材]
domain: 教學資源
form: 課程教材
themes: []
---

# [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)

> 研究日期：2026-07-05
> 研究來源：https://github.com/asgeirtj/system_prompts_leaks
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-07-05 首次）

### 專案定位
由 [asgeirtj](https://github.com/asgeirtj) 個人維護的系統提示詞蒐集庫。2025-05-03 建立，2026-07-05 首上絕對榜前已累積 49,063 stars、8,000 forks、20 位 contributor（維護者本人貢獻 563 commits，佔九成以上），單日 +471。授權採 CC0-1.0（公共領域），Topics 涵蓋 `anthropic`、`openai`、`google`、`claude-code`、`prompt-engineering` 等 20 項。無 GitHub Release，靠 git commit 滾動更新。

### 核心架構 / 主要概念
**內容結構**——頂層依廠商分目錄：
- `Anthropic/`（25+ 檔，涵蓋 claude-opus-4.6 到 4.8、claude-sonnet-5、claude-fable-5、claude-design、claude-in-chrome、claude-in-excel、claude-mobile-ios 等衍生介面，並額外拆出 `Claude Code/` 子目錄）
- `OpenAI/`、`Google/`、`xAI/`、`Microsoft/`、`Meta/`、`Mistral/`、`Qwen/`、`Notion/`、`Perplexity/`、`Cursor/`、`Misc/`

近期高頻更新集中在 2026-06 到 07：
- 7-02 併入 artifact-design bundled skill
- 7-01 新增 claude-sonnet-5.md
- 6-26 更新 Claude Design canvas 模式
- 6-24 補上 control-in-app-browser 與 computer-use 版本

**取得方式與可信度**：README 未寫明抽取方法，僅以截圖示意 ChatGPT 在 "repeat all of the above" 類 prompt injection 下吐出的 system message；因此檔案性質是社群逆向產物，非廠商公開文件，準確度與時效由 commit 頻率背書、無官方驗證。

### 目標使用者
- Prompt engineer：研究各家 model 的系統設計與行為約束
- LLM 應用開發者：抄襲或對照商業 model 的 system prompt 結構
- 學術研究者：研究 AI 對齊、行為分析、prompt injection 攻擊面

### 與類似專案的差異
- vs [jujumilk3/leaked-system-prompts](https://github.com/jujumilk3/leaked-system-prompts)（2023-05 建立、14,808 stars、被多篇論文引用）：jujumilk3 要求提交者附「可驗證來源或可重現的 prompt」並由維護者審核，收錄範圍廣但更新節奏鬆散
- asgeirtj 走「單一維護者高頻更新」路線，模型型號分得更細（同一 Claude 家族拆出 4.6 / 4.6-no-tools / 4.7 / 4.8 / Fable 5 / Sonnet 5 各檔），適合追蹤同代模型 prompt 演化，但抽取過程與版本對應日期不透明

### 外部評論
- [aithinkerlab.com 2026 綜合報導](https://aithinkerlab.com/ai-system-prompts-leaked/)：把本 repo 與 [jujumilk3/leaked-system-prompts](https://github.com/jujumilk3/leaked-system-prompts) 並列為研究者常用來源
- [Bean·Kinney 法律專欄 2026-03-31](https://www.beankinney.com/512000-lines-one-night-zero-permission-the-claude-code-leak-and-the-legal-crisis-of-ai-clean-rooms/)：Anthropic 官方 Claude Code 誤把 source map 打包進 npm、導致 51.3 萬行 TypeScript 外洩事件，推高整個「AI 內部檔案」主題熱度，是這波 stars 竄升的宏觀背景

### Release 狀態
無 GitHub Release，`has_releases: false`。靠 git commit 滾動更新，2026-06 到 07 迭代密集。

### 授權與社群
- License：CC0-1.0（公共領域）
- Stars：49,063（截至 2026-07-05）
- Forks：8,000
- 主要維護者：[asgeirtj](https://github.com/asgeirtj)（563 commits，佔九成以上）
- Contributors：20 人
- 首個 commit 2025-05-03

### 法律與倫理
系統 prompt 屬 model 廠商營業秘密與 model 行為設計文件；社群逆向流傳雖無官方訴訟先例，但商業使用（拿去照抄）仍有智慧財產爭議。研究用途落在合理使用邊界，但直接抄進商業產品的 system prompt 有風險。
