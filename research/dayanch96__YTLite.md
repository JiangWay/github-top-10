---
repo: dayanch96/YTLite
first_seen: 2026-04-22
last_updated: 2026-04-22
appearances: [2026-04-22]
growth_appearances: [2026-04-22]
has_releases: true
latest_release: v5.2
tags: [行動應用, Skill 外掛]
domain: 行動應用
form: Skill 外掛
themes: []
---

## 深度研究（2026-04-22 首次）

### 專案定位

[dayanch96/YTLite](https://github.com/dayanch96/YTLite)（對外品牌為 YouTube Plus，簡稱 YTPlus）定位為「A flexible enhancer for YouTube on iOS」，是一份以 Theos 工具鏈、Logos 語法寫成的 iOS tweak。它不是獨立 App，而是把行為與 UI 層「織入」官方 YouTube App 後再重新打包：對越獄裝置出 `.deb`，對未越獄裝置包成 IPA 供 sideload/TrollStore 安裝。核心訴求是官方 App 拿不到、Premium 也不一定給的東西——下載影片/音訊/縮圖、去廣告、背景播放、OLED 真黑、上百條可切換的介面與播放器選項，全綁在一個 tweak 裡。repo 上標 ~4,774 stars、主語言 `Logos`、topics 掛 `jailbreak / sideload / sponsorblock / downloader`。

### 核心架構 / 主要概念

Theos + Logos 的典型 hook 模型：YTLite 本身是一個 dylib，編譯後塞進 YouTube.app bundle；dylib 用 `%hook` 攔截 YouTube 的 Objective-C 類（`YTMainAppVideoPlayerOverlayViewController`、`YTReelPlayerViewController` 等），改寫返回值或注入 UI。外掛式生態是它能做大的關鍵——YTLite 不自己重寫 PiP、4K 解鎖、取消讚數，而是把社群既有的成熟 tweak 直接整合進來：[PoomSmart/YouPiP](https://github.com/PoomSmart/YouPiP) 負責 Picture-in-Picture、[PoomSmart/YTUHD](https://github.com/PoomSmart/YTUHD) 解鎖 1440p/4K、Return YouTube Dislikes 還原倒讚數、DontEatMyContent 處理瀏海/動態島遮擋。作者的價值在於「整合 + 設定 UI」，讓一般使用者不必一項一項裝 tweak。v5.2 新增 Discord RPC、Settings 搜尋、進階倍速（最高 10x）、SponsorBlock 略過最低秒數等，仍是設定層的持續堆疊而非底層重寫。

### 目標使用者

三層受眾疊加：（1）越獄玩家——`.deb` 直上，與其他 tweak 共存；（2）TrollStore 用戶——iOS 14–16.x 某些版本可永久安裝不需重簽；（3）最大宗的一般 sideload 使用者——透過 AltStore、SideStore、Sideloadly、Esign、Scarlet 用 Apple ID 簽 IPA，每 7 天或 1 年重簽。共同動機：想要 YouTube Premium 的去廣告/背景/下載，又不想付費，且能接受 sideload 的儀式感。v5.2 起 IPA 轉 Patreon 訂閱制（GitHub 僅釋出越獄 `.deb`；最後免費版為 5.2b4），等於把流量分成付費 IPA 與免費越獄兩條。

### 與類似專案的差異

iOS YouTube tweak 自成小生態，主要競品：
- [qnblackcat/uYouPlus](https://github.com/qnblackcat/uYouPlus)：曾是 sideload 主力，基於 [MiRO92/uYou-for-YouTube](https://github.com/MiRO92/uYou-for-YouTube)，但原倉已 archived，社群轉向 [arichornlover/uYouEnhanced](https://github.com/arichornlover/uYouEnhanced) 延續。
- [LillieH1000/YouTube-Reborn](https://github.com/LillieH1000/YouTube-Reborn) 及其分支 [arichornlover/YouTube-Reborn-v5](https://github.com/arichornlover/YouTube-Reborn-v5)、[arichornlover/YouTubeRebornPlus](https://github.com/arichornlover/YouTubeRebornPlus)：功能相近，社群評價設定較雜、設定頁整理度不如 YTPlus。
- [YTLitePlus/YTLitePlus](https://github.com/YTLitePlus/YTLitePlus)：原本是 YTLite 的社群打包分支，README 已明確標記 DEPRECATED，官方建議改回 YTLite 本體。

差異點：YTLite 把「整合度 + 設定 UI 的可讀性」當護城河；uYouPlus 陣營上游停更、社群接力分裂；Reborn 系則是特性先行但設定散亂。

### 外部評論

- [onejailbreak.com — YouTube Plus IPA](https://onejailbreak.com/blog/youtube-plus/)：整理安裝流程（TrollStore、AltStore、Sideloadly），稱 YTPlus 為「over a hundred ways to customize」的代表作。
- [iospack.com — YouTube Plus IPA 2026](https://iospack.com/tweaked-apps/youtube-plus-ipa/)：描述支援 iOS 14 以上、整合 YouPiP / YTUHD / RYD / Open in YouTube Safari extension。
- [ipaomtk.com — YouTube Premium IPA (Reborn, uYou, YTLite)](https://ipaomtk.com/youtube-ipa/)：把三大 tweak 並列比較，YTLite 被點名「更穩定、設定更多、下載速度優於 uYouPlus / uYouEnhanced」。
- [ibapps39/youtubeSides](https://github.com/ibapps39/youtubeSides)：社群維護的 iOS YouTube tweak 狀態清單，可用來對照各 tweak 活躍度。
- 未找到大型中文社群的深度評測；Reddit r/sideloaded、r/jailbreak 有零散提及但無集中長文，資料不足。

### Release 狀態

最新 release **v5.2「YouTube Plus 5.2」**（2026-04-20）。v5.2 重寫了 Settings 並加入搜尋、Discord RPC、原生 Sleep timer（支援 YouTube v19.x）、進階倍速（最高 10x）、留言/貼文長按翻譯、SponsorBlock 略過的最短秒數門檻等。GitHub 頁上的 release asset 僅有三包 `.deb`（`arm`、`arm64`、`arm64e`），IPA 已收束至付費通道。自 v5.2 起，YTPlus 採 **訂閱制**，最後免費版本為 [v5.2b4](https://github.com/dayanch96/YTLite/releases/tag/v5.2b4)。過往版本維持高頻發佈（v1.x → v5.x，近 310+ 次 release），節奏約兩週一次小版號、月度一次中版號。

### 授權與社群

repo 未附正式 `LICENSE`（`license: null`），實務上屬「源碼公開、條款不明」狀態，衍生專案傾向保留作者署名與 README 致謝。貢獻者 25+ 人，核心由作者 [dayanch96](https://github.com/dayanch96) 主導（271 commits），協作者含 [xiangfeidexiaohuo](https://github.com/xiangfeidexiaohuo)、[mumuisdog](https://github.com/mumuisdog)、[Balackburn](https://github.com/Balackburn)、[Deci8BelioS](https://github.com/Deci8BelioS) 等。repo 有 ~20k forks、32 watchers，forks 異常高顯示這是個「大家拿去重簽、重新發佈」的熱門基底。社群另有 build 方案如 [fosterbarnes/YTPlusYTweaks](https://github.com/fosterbarnes/YTPlusYTweaks)，提供可選整合 tweak 的自助打包流程。
