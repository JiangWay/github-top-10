---
repo: cathrynlavery/diagram-design
first_seen: 2026-11-26
last_updated: 2026-11-27
appearances: [2026-11-26, 2026-11-27]
growth_appearances: [2026-11-26, 2026-11-27]
has_releases: false
latest_release: null
tags: [開發者工具, Skill 外掛]
domain: 開發者工具
form: Skill 外掛
themes: []
---

# [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)

> 研究日期：2026-11-26
> 研究來源：https://github.com/cathrynlavery/diagram-design
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) 是一個 Agent Skill：使用者用自然語言描述需求，coding agent 選定圖表型別，輸出單一檔案的 HTML + inline SVG，配色與字型取自使用者自己的品牌。README 的口號是「Editorial diagrams your designer won't hate」，賣點是 52 種圖表型別、無陰影、不要 Mermaid 那種制式外觀。

## 作者與起源

作者 Cathryn Lavery，GitHub 個人頁自述是 BestSelf Co 創辦人（「$55M+ bootstrapped」，2022 年賣給私募基金，2024 年買回），部落格為 [littlemight.com](http://littlemight.com)，GitHub 上有約 1,546 followers。這些是她本人在 GitHub profile 的自述，本檔未另行查證 BestSelf Co 的營收數字。README 的 Why I built it 一節說明動機：她要為 littlemight.com 的文章配圖，每次請 Claude 畫架構圖或流程圖，得到的都是風格雷同的圓角方塊，於是把審美規則寫成 skill。

時間軸：repo 建立於 2026-04-16，首個 commit 是「Initial release: diagram-design v1.0」，當時 13 種圖表。一篇評測文提到她在 X 上於 4 月 16 日發了發表貼文（見下方外部評論），我無法直接開啟該貼文驗證。公司 LittleMight 負責各 plugin 目錄的上架。

## 核心架構 / 主要概念

repo 根目錄同時放了多個 agent 的 plugin manifest：`.claude-plugin`、`.codex-plugin`、`.factory-plugin`、`.qoder-plugin`，另有 `.agents`、`AGENTS.md`、`CLAUDE.md`。實際的 skill 只有一份，在 `skills/diagram-design/`，內含 `SKILL.md`、`references/`（約 71 個檔，含各型別規格與 style guide）、`assets/`（範例 HTML）與 `scripts/`。

主要元件：

- **52 種型別，每種三個變體**：minimal light、minimal dark、full-editorial。涵蓋 architecture、sequence、state、ER、Gantt、Sankey、Wardley map、UML class、git graph 等。
- **品牌 onboarding**：對 agent 說「onboard diagram-design to https://yoursite.com」，skill 抓首頁，把 body 背景、文字色、CTA 色對應到 paper / ink / muted / accent / link 等 token，寫入 `references/style-guide.md`。
- **匯入**：`scripts/` 內有 `mermaid_extract.py`、`drawio_extract.py`、`excalidraw_extract.py`、`plantuml_extract.py`，把既有圖重畫成此風格。
- **匯出與檢查**：`export_svg.py`、`export_png.py`、`export_pdf.py`；`verify_geometry.py` 與 `self_check.py` 在 CI 檢查節點重疊與裁切。
- **斜線指令**：`/export-diagram`、`/import-mermaid`、`/profile`、`/doctor` 等，僅原生 plugin 安裝才有。

語言組成：HTML 約 4.65 MB、Python 約 3.68 MB、Mermaid 約 1.7 KB。Python 佔比高，來自驗證與匯出腳本。

## 設計哲學

README 把核心規則寫成一段話：

> *The highest-quality move is usually deletion.* Every node earns its place. The accent color is reserved for the 1 or 2 things the reader should look at first. Target density: 4/10.

解讀：模型已經懂內容，缺的是品味，所以作者把品味寫成可檢查的規則。具體規則包括單一 accent 色只標 1 到 2 個重點、1px hairline、不用陰影、座標全落在 4px 格線。這些規則被做成 CI 腳本，不只是提示詞。

作者也在 README 寫明限制：輸出品質隨模型而異，同一個 prompt 兩次排版可能不同；輸出是 HTML，沒有可 diff 的文字原始碼，也不能在畫布上拖動方塊。每週都在改的 Git 文件，README 建議仍用 Mermaid。

## 目標使用者與適用情境

適用：

- 部落格、簡報、對外文件需要一張有風格的圖，不想開 Figma。
- 團隊有品牌規範，想讓 agent 產圖時自動套用。
- 想把舊 Mermaid / draw.io / Excalidraw / PlantUML 圖重畫成統一風格。

不適用：

- 需要在 PR 裡 diff、隨 sprint 頻繁改的圖，文字原始碼（Mermaid）更合適。
- 需要手動微調每個節點的設計師工作流，輸出沒有可編輯畫布。
- 需要每次輸出完全一致的場景，README 自承同 prompt 可能排版不同。

支援的宿主：Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder、Pi、Kiro、OpenCode、Gemini CLI、Cline、Windsurf、Amp 等，通用安裝指令是 `npx skills add cathrynlavery/diagram-design`。

## 與類似專案的差異

| 對手 | 本專案的差異 | 什麼時候選誰 |
|---|---|---|
| [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) | Mermaid 是文字語法加渲染器，版面自動、主題固定、可在 GitHub 直接渲染；diagram-design 由 agent 逐點放置座標，輸出 HTML + SVG，外觀可對齊品牌 | 文件進 Git 並常改選 Mermaid；對外發表的單張圖選 diagram-design |
| [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | Excalidraw 是手繪風白板，人工拖拉、可編輯；diagram-design 用描述產生，不可在畫布上編輯 | 需要協作塗鴉選 Excalidraw |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 同屬「把設計品味寫成 agent skill」的專案，但 impeccable 針對前端 UI 設計，diagram-design 專攻圖表 | 做介面選 impeccable，做圖選 diagram-design |

README 自己的比較表也把 Mermaid / PlantUML、draw.io / Excalidraw 列為對照組，並承認「Change it later」只能請 agent 重畫或手改 SVG。

## 外部評論

在 HN、Reddit、X 上未找到可直接開啟的獨立討論串，這部分資料不足。已查：WebSearch 兩組查詢（專案名加作者名、加 Hacker News / Reddit / Twitter 關鍵字），搜尋結果以部落格、技能目錄與評測站為主。下列為搜尋結果中的第三方頁面，我只依標題與搜尋摘要判斷其性質，未逐篇讀完全文：

- [andrew.ooo 的評測文](https://andrew.ooo/posts/diagram-design-review-editorial-diagrams-agent-skill/)：搜尋摘要提到作者 4 月 16 日在 X 發表，初版 13 種型別，以及 v2.0（7 月 14 日）併入一個精選 fork 的 12 種型別。此說法來自評測文，未自行驗證。
- [pyshine：13 Editorial Diagram Types for Claude Code](https://pyshine.com/Diagram-Design-Editorial-Diagram-Types-Claude-Code/)：初版型別數的介紹文，內容已落後於現在的 52 種。
- [braindetox.kr：Even Diagrams Need Design Rules](https://braindetox.kr/en/posts/claude_diagram_design_skill.html)：韓文站英文版的使用介紹。
- [webreactiva 的 skill 介紹](https://www.webreactiva.com/blog/diagram-design-skill)：西班牙語開發者電子報的技能推薦頁。
- [skillselion 安裝指南](https://skillselion.com/guides/diagram-design-skill-claude-code-guide)：建議 clone 後 symlink 到 `~/.claude/skills/` 以便自訂 style guide。

注意：各技能目錄站引用的 stars 與型別數彼此不一致（搜尋摘要中型別數出現 27 到 51 種不等，stars 有 31,735 與 60,673 兩種數字），多為抓取時間不同造成，以 GitHub 本體為準。中文社群的獨立評論未查到，資料不足。

## Release 狀態 / 時間軸

`gh api .../releases` 回傳 0 筆，尚無 GitHub Release。版本號放在 plugin manifest：2026-11-25 的最新 commit 是「bump plugin manifests to 2.6.179」，同日還有 2.6.178、2.6.177、2.6.176，也就是 24 日深夜到 25 日凌晨約 5 小時內 bump 了 4 次，說明 CI 機器人每合併一個 PR 就自動升一版。

時間軸（以 commit 補）：

- 2026-04-16：建 repo，首個 commit「Initial release: diagram-design v1.0」，13 種型別。
- 2026-07-14：據 [andrew.ooo 評測文](https://andrew.ooo/posts/diagram-design-review-editorial-diagrams-agent-skill/)為 v2.0，我未在 repo 內核對此日期。
- 2026-11-25：最新 push，修補 HTML comment 解析與 `--full-page` 匯出，manifest 版本 2.6.179。
- 2026-11-26：登上 GitHub Trending 絕對榜 #9，單日 +1,133 stars。

## 授權與社群

- 授權：MIT。
- 量化（2026-11-26）：72,762 stars、4,841 forks、38 open issues。
- 主要語言：HTML 4.65 MB、Python 3.68 MB。
- topics：agent-skills、claude-code、codex、data-visualization、diagrams、drawio、mermaid、svg。
- contributors：github-actions[bot] 170 次、作者 cathrynlavery 141 次，其餘外部貢獻者以 rudycelekli 27、mvanhorn 20、parveen0029 16 居前。
- 增長速率：建 repo 到今日 224 天，平均約 325 stars/天；今日 +1,133 約為平均的 3.5 倍，growth_rate 1.56%。forks 與 stars 比約 6.7%。
- 官網 [diagramdesign.dev](https://diagramdesign.dev)，另有 GitHub Pages 圖庫與 Trendshift 徽章。

## 資料來源

**本體**

- [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)（`gh api` repo、languages、contributors、releases、commits、README、目錄）
- [diagramdesign.dev](https://diagramdesign.dev)
- [Cathryn Lavery GitHub 個人頁](https://github.com/cathrynlavery)
- [littlemight.com](http://littlemight.com)

**第三方評論**

- [andrew.ooo 評測](https://andrew.ooo/posts/diagram-design-review-editorial-diagrams-agent-skill/)
- [pyshine](https://pyshine.com/Diagram-Design-Editorial-Diagram-Types-Claude-Code/)
- [braindetox.kr](https://braindetox.kr/en/posts/claude_diagram_design_skill.html)
- [webreactiva](https://www.webreactiva.com/blog/diagram-design-skill)
- [skillselion](https://skillselion.com/guides/diagram-design-skill-claude-code-guide)

**同類工具**

- [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)
- [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable)

## 更新紀錄
