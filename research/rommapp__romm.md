---
repo: rommapp/romm
first_seen: 2026-07-05
last_updated: 2026-07-05
appearances: [2026-07-05]
growth_appearances: [2026-07-05]
has_releases: true
latest_release: 5.0.0-beta.1
tags: [開發者工具, 應用程式, 自架]
domain: 開發者工具
form: 應用程式
themes: [自架]
---

# [rommapp/romm](https://github.com/rommapp/romm)

> 研究日期：2026-07-05
> 研究來源：https://github.com/rommapp/romm
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 深度研究（2026-07-05 首次）

### 專案定位
把 ROM 收藏視為「自架媒體庫」的方案：類比 Jellyfin / Plex，但媒體檔是遊戲 ROM。使用者放 ROM 進共享目錄，RomM 掃描、補 metadata、任何裝置開瀏覽器就能玩。10,264 stars、AGPL-3.0、2023-03 建 repo，2026-07-05 首上榜 +398 today。

### 核心架構 / 主要概念
- **技術棧**：Python（46.4%）+ Vue（41.1%）+ TypeScript（11.5%），Docker Compose 部署
- **三段流程**：
  1. 掃 ROM 目錄
  2. 串 [IGDB](https://www.igdb.com/)、Screenscraper、MobyGames、SteamGridDB 抓遊戲資訊與封面，並拉 RetroAchievements 成就
  3. 瀏覽器端播放透過 [EmulatorJS/EmulatorJS](https://github.com/EmulatorJS/EmulatorJS) 與 Ruffle（Flash / 網頁遊戲）承載，README 聲稱 400+ 平台
- **管理面**：多使用者、權限、DLC / mod / patch / 手冊管理、tag 篩選
- **周邊 app**：organization 名下另有 Playnite、Android、handheld CFW 三個官方伴隨 app

### 目標使用者
- 家用 self-hosted server 玩家：把 ROM 集中管理、任何裝置存取
- 復古遊戲收藏者：需要 metadata + 封面 + 成就系統
- 多使用者家庭：一台 server 供全家用（帳號、權限、進度分開）

### 與類似專案的差異
- vs [libretro/RetroArch](https://github.com/libretro/RetroArch)：單機執行的 emulator frontend，不做藏書管理
- vs [batocera-linux/batocera.linux](https://github.com/batocera-linux/batocera.linux)：燒進 USB / SD 直接開機的整包 distro，以 EmulationStation 為 UI，鎖定單台裝置
- vs [RetroPie/RetroPie-Setup](https://github.com/RetroPie/RetroPie-Setup)：同屬單機 distro 定位
- 真正的對比是 [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) 與 Plex——RomM 走「server + browser」路線，把 ROM 當媒體檔集中管理
- vs LaunchBox（Windows 商業 app，BigBox 模式 £40 買斷或 £20/年）：RomM 是開源、跨平台、瀏覽器優先

### 外部評論
- [Hacker News 討論串 44247964](https://news.ycombinator.com/item?id=44247964)：主要著眼點是「Jellyfin for ROMs」的類比，社群把它當自架媒體庫看

### Release 狀態
- 6-15 發 4.9.1、6-17 發 4.9.2
- 6-23 → 7-04 連推 5.0.0-alpha.1、alpha.2、beta.1
- 5.0.0-beta.1（2026-07-04，最新）：附註「brand-new frontend that lives alongside the current one」——新 UI 需在 user settings 手動切「UI version」，classic UI 仍為預設；同時新增 `OIDC_ALLOW_REGISTRATION` 與 `DISABLE_LOGS_VIEWER` 兩個環境變數
- 今日 +398 stars 落在 beta.1 隔日（7-04 發、7-05 上榜）

### 授權與社群
- License：AGPL-3.0
- Stars：10,264（截至 2026-07-05）
- Forks：494
- 2023-03 建 repo，累積 3.3 年

### 風險與法律
RomM 本身只做管理與播放器串接，不散布 ROM。ROM 檔的授權灰色地帶落在使用者一側——除少數任天堂等原廠明確授權的釋出檔或已進入公共領域的作品外，將商業 ROM 影像上傳到自架 server 供多人存取，多數司法轄區仍屬未授權重製 / 散布行為。
