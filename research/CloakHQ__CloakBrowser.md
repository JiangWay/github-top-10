---
repo: CloakHQ/CloakBrowser
first_seen: 2026-05-09
last_updated: 2026-05-09
appearances: [2026-05-09]
growth_appearances: [2026-05-09]
has_releases: true
latest_release: chromium-v146.0.7680.177.4
tags: [資安, 應用程式, 開源替代]
domain: 資安
form: 應用程式
themes: [開源替代]
---

# [CloakHQ/CloakBrowser](https://github.com/CloakHQ/CloakBrowser)

> 研究日期：2026-05-09
> 研究來源：https://github.com/CloakHQ/CloakBrowser
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[CloakHQ/CloakBrowser](https://github.com/CloakHQ/CloakBrowser) 是一個從 Chromium **C++ 原始碼層級**直接打 49 個指紋補丁的隱身瀏覽器二進位，主打「Drop-in [Playwright](https://github.com/microsoft/playwright) / [Puppeteer](https://github.com/puppeteer/puppeteer) 替代品」並聲稱通過 30/30 個 bot detection 測試——**立場屬「攻方」自動化工具**，可用於合法的 web scraping、QA 與 AI Agent 瀏覽，但同樣可用於繞過反爬與反詐防線。

## 作者與起源

維護者為 GitHub 組織 [CloakHQ](https://github.com/CloakHQ)（成立於 2026 年 2 月），對外品牌站 [cloakbrowser.dev](https://cloakbrowser.dev/)。Repo 於 2026-02-22 建立，到 2026-05-09 累積約 2,774 stars / 227 forks / 30 watchers / 37 open issues / 8 contributors，主力提交者為 `Cloak-HQ`（127 commits）與 `evelaa123`（12 commits），其餘為 dependabot 與外部 PR。

從首版到現在約 11 週發了 16 個 release，平均 5 天一版，幾乎追隨 Chromium 上游 142 → 145 → 146 的版本節奏，這個發版頻率是這類「Chromium fork + 補丁」專案能否存活的關鍵指標。

## 核心架構 / 主要概念

依 README 揭露的技術堆疊：

- **49 個 C++ 原始碼層級補丁**：覆蓋 canvas、WebGL、audio、fonts、GPU、screen properties、WebRTC、network timing、hardware reporting、自動化訊號移除、CDP input behavior。
- **編譯進二進位**：與 [berstend/puppeteer-extra](https://github.com/berstend/puppeteer-extra)、[ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver)、Playwright `--disable-blink-features=AutomationControlled` 這類「runtime JS 注入或 flag 修改」**完全不同路徑**。
- **`humanize=True` 行為層**：曲線化滑鼠移動、按鍵節奏與滾動模式。
- **平台預設**：Linux wrapper 預設冒充 Windows 指紋；macOS 走原生。
- **客戶端 SDK**：Python（`pip install cloakbrowser`，490 KB）與 JS/TypeScript（403 KB），共用同一個 stealth binary。
- **發行物**：每個 release 提供 `cloakbrowser-{linux-x64,linux-arm64,mac-arm64,win-x64}` 預編譯包，亦提供 [Docker image](https://hub.docker.com/r/cloakhq/cloakbrowser)。

## 設計哲學

README 反覆主張「補丁要打在源碼，不能打在 runtime」：

> "CloakBrowser doesn't solve CAPTCHAs—it prevents them from appearing."

> Detection sites see a real browser because it _is_ a real browser.

翻譯／解讀：CloakBrowser 不是「破 CAPTCHA」工具，而是讓 CAPTCHA 一開始就不被觸發。背後的設計判斷是：JS 注入式工具會留下注入痕跡，反偵測廠商會反過來偵測這些補丁本身；而每次 Chrome 升版都會打破 config-level hack。把指紋改在 C++ 編譯時，網站送來的特徵全是真實 Chromium 訊號。

## 目標使用者與適用情境

適用情境：

- **Web scraping / 價格情報**：需要穿越 [Cloudflare](https://www.cloudflare.com/products/turnstile/)、DataDome、Akamai 等反爬層的合法資料採集。
- **QA / E2E 測試**：自家網站想用真實使用者畫像驗證流程。
- **AI Agent 瀏覽**：與 [browser-use/browser-use](https://github.com/browser-use/browser-use)、[D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling)、[browserbase/stagehand](https://github.com/browserbase/stagehand)、LangChain 等框架整合。

不適用情境：

- 違反目標站 ToS 或當地法規的爬取。
- 需要解 CAPTCHA 本身（README 自承不解 CAPTCHA）。
- Notebook / Colab 環境：[MarkTechPost](https://www.marktechpost.com/2026/05/07/build-a-cloakbrowser-automation-workflow-with-stealth-chromium-persistent-profiles-and-browser-signal-inspection/) 指出同步 API 與既有 event loop 衝突，需另開 worker thread。

## 與類似專案的差異

| 對手 | 路徑 | CloakBrowser 的差異 | 何時選誰 |
|---|---|---|---|
| [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) | WebDriver + flag 修改 | 走 source-level patch 而非 driver-level；不依賴 Selenium WebDriver | 若已有 Selenium 生態走 UC，新專案選 Cloak |
| [ultrafunkamsterdam/nodriver](https://github.com/ultrafunkamsterdam/nodriver) | 直接 CDP、無 WebDriver | 兩者都繞 WebDriver；Nodriver 強在非同步效能，Cloak 強在編譯期指紋 | 大規模並發選 Nodriver；單站重度反偵測選 Cloak |
| [Kaliiiiiiiiii-Vinyzu/patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright) | Playwright fork + 補丁 | Patchright 在 Playwright 層打補丁、會被部分 antibot 識破；Cloak 在 Chromium 編譯時打補丁 | API 相容度需求高選 Patchright；最高隱身需求選 Cloak |
| `playwright-stealth`、`puppeteer-extra-plugin-stealth` | 純 JS 注入 | 完全不同層級——這類在 Chrome 升版常壞 | 輕量需求或無法部署自帶 binary 時選注入式 |

## 外部評論

- [MarkTechPost 教學文（2026-05-07）](https://www.marktechpost.com/2026/05/07/build-a-cloakbrowser-automation-workflow-with-stealth-chromium-persistent-profiles-and-browser-signal-inspection/) — 中性介紹文，示範 persistent profile、localStorage、browser signal 檢視；明確點出「同步 API 與 Colab event loop 衝突需 worker thread」這項實務摩擦。
- [TechLogHub 評測](https://techloghub.com/open-source/cloakbrowser-stealth-chromium-for-unblocking) — 偏推薦的 feature showcase，引述 reCAPTCHA v3 0.9、BrowserScan 4/4 等官方數字；批判性偏低，**讀者宜對照官方 README 自行重測**。
- [pim97/anti-detect-browser-tools-tech-comparison](https://github.com/pim97/anti-detect-browser-tools-tech-comparison) — 同領域第三方的橫向比較 repo，提供 Cloudflare / DataDome / Akamai 實測脈絡。
- [techinz/browsers-benchmark](https://github.com/techinz/browsers-benchmark) — 第三方瀏覽器自動化引擎 benchmark，可作為交叉驗證來源。
- [roundproxies「Patchright 替代品」榜單](https://roundproxies.com/blog/best-patchright-alternatives/) — 將 CloakBrowser 列為 Patchright 替代品候選之一。
- HN / Reddit：搜尋未見顯著的 [Hacker News](https://news.ycombinator.com/) 或 r/webscraping 串討論，**主流社群評論資料不足**。考慮 repo 在 2026-02 才建立、本日才衝上 GitHub Trending，社群熱度大概率仍在發酵階段。

## Release 狀態 / 時間軸

- **2026-02-22** — Repo 建立。
- **2026-02-27** — 首個 release `chromium-v142.0.7444.175`。
- **2026-03 月** — 連發 8 個 v145.x build，密集鎖定 Chrome 145 系列指紋。
- **2026-04-09 ~ 04-28** — 跳到 v146 系列，4 個小版本（177.1 → 177.4）。
- **2026-04-28** — 最新版 `chromium-v146.0.7680.177.4`，README 自稱包含 49 個 fingerprint patches。
- **2026-05-09** — 首次上 GitHub Trending 絕對榜 #6（2,773 stars / 今日 +482）。

11 週發 16 版、跟齊 Chromium 上游節奏，是同類專案中相對活躍的維護模式。

## 授權與社群

- **Wrapper code（Python / JS SDK）**：MIT License。
- **Stealth binary**：依 [BINARY-LICENSE.md](https://github.com/CloakHQ/CloakBrowser/blob/main/LICENSE)，免費使用但**禁止再散布**——這是雙授權模式，與「完全 OSS」有差，下游打包者要留意。
- **量化指標**（2026-05-09）：2,774 stars、227 forks、30 watchers、37 open issues、~8 contributors、490 KB Python + 403 KB TypeScript + 30 KB JavaScript + 1.8 KB Dockerfile。
- **GitHub Topics**：`ai-agents`、`anti-detect`、`antidetect-browser`、`bot-detection`、`browser-automation`、`captcha-bypass`、`chromium`、`cloudflare-bypass`、`fingerprint`、`headless-browser`、`playwright`、`puppeteer`、`python`、`recaptcha`、`selenium`、`stealth-browser`、`undetected`、`web-scraping`、`webscraping`。
- **首日增長率**：482 / 2,773 ≈ 17.4%——屬本日榜中段水準，非首爆型。

## 資料來源

- **本體**：
  - GitHub repo：<https://github.com/CloakHQ/CloakBrowser>
  - 官網：<https://cloakbrowser.dev/>
  - Releases：<https://github.com/CloakHQ/CloakBrowser/releases>
  - Docker Hub：<https://hub.docker.com/r/cloakhq/cloakbrowser>
- **第三方評論**：
  - [MarkTechPost 教學文](https://www.marktechpost.com/2026/05/07/build-a-cloakbrowser-automation-workflow-with-stealth-chromium-persistent-profiles-and-browser-signal-inspection/)
  - [TechLogHub 評測](https://techloghub.com/open-source/cloakbrowser-stealth-chromium-for-unblocking)
  - [market.dev Playwright 生態目錄](https://explore.market.dev/ecosystems/playwright/projects/cloakbrowser)
  - [roundproxies Patchright 替代品榜單](https://roundproxies.com/blog/best-patchright-alternatives/)
  - [ZenRows undetected-chromedriver 替代品](https://www.zenrows.com/blog/undetected-chromedriver-alternatives)
- **同類工具**：
  - [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver)
  - [ultrafunkamsterdam/nodriver](https://github.com/ultrafunkamsterdam/nodriver)
  - [Kaliiiiiiiiii-Vinyzu/patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright)
  - [berstend/puppeteer-extra](https://github.com/berstend/puppeteer-extra)
  - [pim97/anti-detect-browser-tools-tech-comparison](https://github.com/pim97/anti-detect-browser-tools-tech-comparison)
  - [techinz/browsers-benchmark](https://github.com/techinz/browsers-benchmark)

## 更新紀錄
