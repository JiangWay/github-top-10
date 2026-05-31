---
repo: github/docs
first_seen: 2026-05-31
last_updated: 2026-05-31
appearances: [2026-05-31]
growth_appearances: [2026-05-31]
has_releases: false
latest_release: null
tags: [教學資源, 課程教材, 開源替代]
domain: 教學資源
form: 課程教材
themes: [開源替代]
---

# [github/docs](https://github.com/github/docs)

## 深度研究（2026-05-31 首次）

### 專案定位

[github/docs](https://github.com/github/docs)（19,616 stars / **67,275 forks** / 2019-05-31 建立 / 內容採 CC-BY-4.0、程式碼採 MIT 雙授權 / TypeScript 97% + SCSS / Next.js）是 **GitHub 官方產品文件網站 [docs.github.com](https://docs.github.com) 的開源源碼倉**。它不是框架、不是工具，而是一座「對外開放貢獻的官方文件庫」——所有 GitHub 產品說明的 Markdown 內容 + 驅動網站的 Next.js 應用，都放在這個 public repo，任何人都能改文件、發 PR。

今日以 **+20 stars / growth_rate 0.10%** 首登絕對榜 #6。這與本站慣見的「爆紅竄升型」專案完全相反：它是老牌穩定大倉（建立滿 7 年、近 2 萬 stars），單日只長 20 顆。**為何低增長仍能登上絕對榜 #6 的判斷**：

- GitHub trending 的絕對榜並非單純按 stars_today 排序，而是綜合「相對熱度信號」的演算法輸出。在一個**全站普遍低基數的清淡日**（週末 / 假期 / 整體新增 star 量偏低），平日被高速竄升專案壓在後方的老牌大倉，反而會因為「持續穩定的小幅增長 + 高絕對 star 基數」浮上榜單。
- forks（67,275）遠超 stars（19,616），fork/star 比達 **3.4 倍**——這是「Edit on GitHub」型文件倉的典型特徵：每個想改文件的貢獻者都會先 fork，但不見得會 star。這種倉長期維持穩定的 fork/watch 流量，是 trending 演算法在低基數日容易撈出的對象。
- 因此本檔登榜應理解為 **trending 演算法在低基數日的波動結果**，而非真實的單日爆發。它的價值在於「正典級官方基礎建設首登本站」這個事件本身，而非增長數字。

### 核心架構 / 主要概念

- **技術棧**：Next.js（React 框架，SSR + 靜態渲染）+ TypeScript（97%）+ SCSS；以 Docker / devcontainer 提供本機開發環境（`.devcontainer`、`Dockerfile`）。早期（2020 開源時）為 Node.js web app，現已遷移至 TypeScript / Next.js 棧。
- **內容與程式分離**：文件內容是純 Markdown，集中在 `content/`（文章本體）與 `data/`（可重用片段 reusables、變數、版本資料）；網站邏輯與建置程式在 `src/`。內容作者只需碰 Markdown，不必懂前端。
- **Markdown frontmatter 驅動**：每篇文章用 YAML frontmatter 描述標題、版本適用範圍（GitHub.com / Enterprise Server / Enterprise Cloud）、產品線、權限等，建置時據此渲染出多版本文件。
- **雙倉同步模型**：對外是 public 的 [github/docs](https://github.com/github/docs)，GitHub 員工（Hubbers）在私有的 `github/docs-internal` 工作；兩倉透過自動化每日頻繁雙向同步，任一邊 merge 進 main 的變更都會反映到另一邊。
- **受限貢獻範圍**：外部貢獻者**只能改內容**——`content/` 下的 `.md` 與 `data/` 下特定 reusables；基礎建設程式、CI workflow、建站邏輯**不接受外部 PR**，以保護線上站台與發布流程安全。
- **站內直接發 PR**：[docs.github.com](https://docs.github.com) 每篇文章底部有「Make a contribution / Edit this page」入口，讀者可直接從文章頁開 PR 修錯字或補內容，降低貢獻門檻。
- **雙授權**：文件內容採 [Creative Commons Attribution 4.0（CC-BY-4.0）](https://creativecommons.org/licenses/by/4.0/)，程式碼採 MIT。GitHub API 偵測到的 license 欄位顯示 CC-BY-4.0（以內容為主）。

### 目標使用者

四類人群：(1) **使用 GitHub 產品的所有開發者**——遇到不懂的功能直接查 [docs.github.com](https://docs.github.com)，他們是文件的消費端；(2) **想修正 / 補充官方文件的社群貢獻者**——發現錯字、過時截圖、缺漏步驟時直接發 PR；(3) **技術文件工程師 / docs-as-code 實踐者**——把這個 repo 當成「大型企業如何用 Git 工作流維護產品文件」的標竿案例研究；(4) **GitHub 員工**——透過內部 `docs-internal` 倉維護文件。

### 與類似專案的差異

| 對照 | 差異 |
|---|---|
| [vercel/next.js](https://github.com/vercel/next.js) 等專案「自帶 docs 目錄」 | 多數開源專案的文件是程式碼倉裡的一個子目錄；本檔是**整座官方文件網站獨立成一個 public repo**，且內容/程式分離、有完整建站應用 |
| [MicrosoftDocs](https://github.com/MicrosoftDocs)（Microsoft Learn 文件倉群） | 同為「大廠官方文件開源」模式，但 Microsoft 文件拆成數十個主題倉、用 DocFX；本檔是**單一倉**承載全部 GitHub 產品文件，用自家 Next.js 棧 |
| [gitlabhq/gitlab](https://gitlab.com/gitlab-org/gitlab) 的 `/doc` | GitLab 文件與主程式同倉；本檔將文件獨立倉化並對外開放，貢獻路徑更清晰 |
| [readthedocs / Docusaurus / MkDocs](https://www.mkdocs.org/) 等文件框架 | 那些是**通用文件生成框架**（form：框架）；本檔不是框架，而是**用 Next.js 自建的單一產品文件站源碼**（form：課程教材 / 文件內容） |
| 一般 awesome-list / tutorial 合集 | 那些是社群整理的學習清單；本檔是**廠商第一手權威產品文件**，內容由官方維護、社群協作校訂 |

差異化關鍵：它是**極少數把「正式對外的官方產品文件網站」完整開源、且建立明確雙倉同步 + 受限貢獻治理機制**的大廠案例，常被引用為 docs-as-code / 開放文件治理的範本。

### 外部評論

- [The GitHub Blog《GitHub Docs are now open source》（2020-10-07）](https://github.blog/2020-10-07-github-docs-are-now-open-source/)：官方宣布開源公告。GitHub 於 2020 年 7 月上線 [docs.github.com](https://docs.github.com) 單一文件入口，10 月將全部產品文件 + 驅動網站的 Node.js 應用開源到 [github/docs](https://github.com/github/docs)，理由是「在開放環境工作能更貼近社群回饋、想法與集體知識」。
- [The GitHub Blog《How we open sourced docs.github.com》（2020-10-14）](https://github.blog/2020-10-14-how-we-open-sourced-docs-github-com/)：技術側深入文，說明開源過程的工程決策與雙倉架構。
- [DEV Community《GitHub Docs are Open Source》](https://dev.to/github/github-docs-is-open-source-24ke)：GitHub 官方在 DEV 的同步推廣文。
- [docs.github.com《About contributing to GitHub Docs》](https://docs.github.com/en/contributing/collaborating-on-github-docs/about-contributing-to-github-docs)：官方貢獻指南，明確說明 public [github/docs](https://github.com/github/docs) 與私有 `docs-internal` 雙倉自動同步、外部僅接受內容類 PR 的治理規則。
- **針對「2026-05-31 首登 trending」此一事件**：截至撰寫**未發現針對本次登榜的專門社群討論**。本檔是 2020 年起即穩定運行的老牌官方倉，社群討論集中在 2020 開源當時，近期登榜屬 trending 演算法在低基數日的波動，未引發新的輿論事件——此處據實標明無顯著新討論。

### Release 狀態

`has_releases: false`（無傳統語意化版本發布節奏）。倉內僅有一個歷史 tag [v1.0.1](https://github.com/github/docs/releases/tag/v1.0.1)（2023-02-14），之後不再循版號發 release。這符合**文件網站採 rolling main 持續部署**的模式：每次 merge 進 `main` 就同步到線上 [docs.github.com](https://docs.github.com)，無需打版號。`pushed_at` 為 2026-05-29，顯示 main 分支至今每日高頻活躍。`latest_release` 記為 `null`（不以 v1.0.1 為有效發布節奏代表）。

### 授權與社群

- **授權**：雙授權——文件內容 [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)，程式碼 MIT（GitHub API license 欄位顯示 CC-BY-4.0）。
- **貢獻結構**：機器人 + 員工 + 社群三層。Top 貢獻者中 `Octomerger`（15,994 commits）與 `docs-bot`（8,053 commits）為**自動化同步機器人**（負責 public ↔ docs-internal 雙倉同步），人類核心為 GitHub 員工 [sarahs](https://github.com/sarahs)（1,639）、[mchammer01](https://github.com/mchammer01)（1,419）、[heiskr](https://github.com/heiskr)（1,381）等文件團隊成員；外加大量社群一次性內容修正 PR。
- **量化指標**：19,616 stars / **67,275 forks**（fork/star = 3.4 倍，極端偏高，典型「人人 fork 改文件」型倉）/ 213 open issues。
- **語言組成**：TypeScript 4.55 MB（97%）+ SCSS 68 KB + JavaScript 39 KB + Shell 13 KB + Dockerfile 7.5 KB + HTML 4.5 KB。
- **Topics**：`docs`、`works-with-codespaces`（2 個，後者表示可一鍵在 GitHub Codespaces 開發環境貢獻）。
- **Homepage**：<https://docs.github.com>。

### domain / form 判斷理由

- **domain = 教學資源**：本檔實質是「GitHub 全產品的官方說明文件 / 教學內容」，使用者來此**學習如何使用 GitHub**。雖然源碼是 Next.js 應用（看似偏「開發者工具 / 應用程式」），但其**產物與核心價值是文件內容本身**，符合 controlled vocabulary 中「教學資源 — 課程、教材、tutorial 合集」的定位。相較「開發者工具」（指通用開發套件 / CLI / runtime），本檔不是給人裝來開發用的工具，故不歸該類。
- **form = 課程教材**：vocabulary 中最貼近「文件 / 教材內容倉」的形態是「課程教材 — tutorial notebook / slide / repo」。本檔是一座以 Markdown 承載的大型教學/說明內容 repo。雖含 Next.js 建站程式，但若選「應用程式」會誤導為「給終端使用者裝來用的 GUI/CLI 產品」——它的本質是**內容倉 + 渲染它的站台**，故取「課程教材」更貼近實質。
- **themes = [開源替代]**：弱關聯標記。它是「大廠把原本可閉源的官方文件站開源」的案例，帶有「開放/開源」屬性；其餘 themes（自架、資料主權、自進化、多代理編排、企業級）皆不適用。

## 資料來源

**本體**
- Repo：<https://github.com/github/docs>
- 線上文件站：<https://docs.github.com>
- README：<https://github.com/github/docs/blob/main/README.md>
- 唯一歷史 tag：<https://github.com/github/docs/releases/tag/v1.0.1>

**官方公告與貢獻指南**
- [The GitHub Blog《GitHub Docs are now open source》（2020-10-07）](https://github.blog/2020-10-07-github-docs-are-now-open-source/)
- [The GitHub Blog《How we open sourced docs.github.com》（2020-10-14）](https://github.blog/2020-10-14-how-we-open-sourced-docs-github-com/)
- [docs.github.com《About contributing to GitHub Docs》](https://docs.github.com/en/contributing/collaborating-on-github-docs/about-contributing-to-github-docs)

**外部報導**
- [DEV Community《GitHub Docs are Open Source》](https://dev.to/github/github-docs-is-open-source-24ke)

**元資料**
- `gh api repos/github/docs`（描述 / 授權 / created_at 2019-05-31 / topics / stars 19,616 / forks 67,275 / language TypeScript）
- `gh api repos/github/docs/releases`（僅 1 個歷史 tag v1.0.1 / 2023-02-14）
- `gh api repos/github/docs/contributors`、`gh api repos/github/docs/languages`
