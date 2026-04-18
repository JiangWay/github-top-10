---
repo: aaddrick/claude-desktop-debian
first_seen: 2026-04-19
last_updated: 2026-04-19
appearances: [2026-04-19]
growth_appearances: [2026-04-19]
has_releases: true
latest_release: v1.3.32+claude1.3109.0
---

# [aaddrick/claude-desktop-debian](https://github.com/aaddrick/claude-desktop-debian)

> 研究日期：2026-04-19
> 研究來源：<https://github.com/aaddrick/claude-desktop-debian>
> 觸發原因：首次上絕對榜（當日排名 #7）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[aaddrick/claude-desktop-debian](https://github.com/aaddrick/claude-desktop-debian) 是一組 Shell 打包腳本，把 Anthropic **官方 Windows 版** Claude Desktop 拆開、抽換 Windows-only 的 native module，再重新封成 `.deb` / `.rpm` / `.AppImage` / Nix flake，讓 Debian、Ubuntu、Fedora、Arch、NixOS 使用者都能「原生」跑 Claude Desktop——沒有 Wine、沒有 VM、也沒有 Anthropic 的任何祝福。

## 作者與起源

作者 **aaddrick**（GitHub [aaddrick](https://github.com/aaddrick)，居於加拿大 Ottawa，根據 ludditus.com 12 月底的文章側寫）在 **2024-12-26** 開了這個 repo，靈感來自 **k3d3** 先前發在 Reddit 上的 [k3d3/claude-desktop-linux-flake](https://github.com/k3d3/claude-desktop-linux-flake)——k3d3 首先示範可以把 Claude Desktop 的 `.asar` 解包、把 Windows native `.node` 模組用 stub 換掉就能跑起來，aaddrick 把這個手法生產化、擴張到整個 Debian 生態。repo 在 2025 全年默默更新，2026 年 4 月隨著 Claude Code Desktop 改版話題（[HN 討論](https://news.ycombinator.com/item?id=47769926)）與 Anthropic 再次被社群追問「何時支援 Linux」而熱度暴衝，**累積 3,432 stars / 380 forks / 51 watchers / 45 open issues**，主要語言為 Shell（420KB），次為 JavaScript（110KB，對應 asar 注入邏輯）與少量 Nix / Python。共 30 名 contributors，release 走 GitHub Actions 自動化（bot 帳號發版），40 天內已發出 10+ 個 release tag。

## 核心架構 / 主要概念

核心思路全都在 `build.sh` 與 `scripts/`：

1. **下載官方 Windows installer**（`.exe`）並用 7-zip 展開。
2. **抽出 `app.asar`**（Electron 程式實體）與 `resources/`。
3. **Stub 出一個假的 `claude-native-bindings`**：Claude Desktop 原本依賴 Windows-only 的 `.node` 模組（系統匣、全域熱鍵、視窗管理），replacement 刻意保留相同的 API surface，讓 Electron 主程式「以為自己還跑在 Windows」。
4. **Repack asar** 並產生三條輸出通路：Debian `.deb`（含 APT repo 與 GPG key）、RPM `.rpm`（含 DNF repo）、distro-agnostic `AppImage`；另外一個 Nix flake 分支提供 FHS 環境。
5. **加上 Linux-native 黏膠**：系統匣（libayatana-appindicator）、全域熱鍵 `Ctrl+Alt+Space`、X11 / Wayland 偵測、`claude-desktop --doctor` 診斷命令檢查顯示伺服器、sandbox 權限、MCP config、stale lock。
6. **MCP 支援**：`~/.config/Claude/claude_desktop_config.json` 路徑與 macOS / Windows 版完全一致，既有 MCP server 設定可直接搬移。新近加入的 **Cowork mode** 預設以 bubblewrap namespace sandbox 作隔離後端，失敗時 fallback 到 host 模式。

## 設計哲學

README 與 k3d3 的 Reddit 原文反覆強調一個主張：

> "Because it's a loadable Node module, you can inspect it directly in Node without decompilation or disassembly needed, and the API surface area of this module is relatively small, making it fairly easy to wholesale reimplement it using stubs."

翻譯：不要硬啃 binary，直接讓 Node 載進來 inspect、然後做一組 stub 把 Windows 特定呼叫擋掉就好。這是一種**務實的 reverse engineering 姿態**——不追求 clean-room，不試圖說服 Anthropic 開源，也不走 Wine 相容層那條重路，而是承認「反正 Electron 就是個瀏覽器殼」，把殼換掉，核心原封不動。授權選 **Apache 2.0**，明確把打包腳本與 Claude Desktop 本體（仍受 Anthropic Consumer Terms 約束）切開。

## 目標使用者與適用情境

主要目標：**Debian / Ubuntu / Fedora / Arch / NixOS 上想把 Claude Desktop 當日常 AI 客戶端的開發者**，特別是需要 MCP 的 power user——例如把 [anthropics/claude-code](https://github.com/anthropics/claude-code) 當 CLI 同時想要 GUI 對話視窗，或要接 MCP server 跑 filesystem / git / database 工具。**不適用情境**：需要 Anthropic 官方支援 / SLA、公司資安政策禁止非官方打包軟體、需要跟 Anthropic 登入流程完全一致的行為（偶爾 SSO / MFA 流程在 Linux 會卡住）、或只想用瀏覽器版 claude.ai 的輕度使用者。

## 與類似專案的差異

Linux 上「跑 Claude Desktop」目前沒有官方解，全是社群 port：

| 對手 | 本專案的差異 |
|---|---|
| [k3d3/claude-desktop-linux-flake](https://github.com/k3d3/claude-desktop-linux-flake) | k3d3 是**原型**、只支援 NixOS flake；本專案把手法生產化，覆蓋 Debian/Ubuntu/Fedora/Arch 全家桶，並提供 APT/DNF repo 與 GPG 簽名 |
| [aaddrick/claude-desktop-arch](https://github.com/aaddrick/claude-desktop-arch) | 同作者的 Arch AUR 版；本 repo 現已吸收 AUR 支援並整合在單一 build 系統 |
| [emsi/claude-desktop](https://github.com/emsi/claude-desktop)、[chrimage/claude-desktop-fedora](https://github.com/chrimage/claude-desktop-fedora) | 多為本 repo 的 fork 或小改版，stars 與更新頻率均遠低於 aaddrick 本家 |
| 官方 macOS / Windows Claude Desktop | 官方沒 Linux build，社群多次公開喊話（見下段外部評論），Anthropic 至今無公開 roadmap |

**選型建議**：Debian / Ubuntu 直接用本 repo 的 APT repo；NixOS 用 k3d3 原始 flake 或本 repo 的 Nix 分支；Arch 用本 repo 整合的 AUR。

## 外部評論

- **ludditus.com（2025-12-17）**：[Claude Desktop for Linux: I didn't even know it existed!](https://ludditus.com/2025/12/17/claude-desktop-for-linux-i-didnt-even-know-it-existed/) 作者稱 aaddrick 為 "some guy from Ottawa"，成功裝 `.deb` 並測三個 extension；字型渲染糟（歸咎 "Electron crap"），但認為可當 "poor man's Kiro" 用於建小專案，最大缺點是**沒有 token 用量顯示**。
- **Greg Hilston 部落格**：[Installing Claude Desktop on Linux: An Unofficial Guide](https://www.greghilston.com/post/claude-desktop-on-linux/) 雖主講 k3d3 的 Nix flake，但整篇的結論是「官方完全不管 Linux，社群得自己動手」。
- **Medium / Mara Ellorin（2026-02）**：[Built on Linux, but not for Linux users](https://medium.com/@mara.ellorin/built-on-linux-but-not-for-linux-users-fddc6792b594) 直接點名 Anthropic：`claude-cowork` topic 爆出 openwork（9.7k）、AionUi（15.9k）、open-claude-cowork（3k+）等替代品共 31k+ stars，全部明示 Linux 支援——aaddrick 這個 port 是原生 Claude Desktop 派系在 Linux 上的唯一主力。
- **Hacker News**：[Redesigned Claude Code Desktop app is now available](https://news.ycombinator.com/item?id=47769926) 串中多則留言提到「Linux 只能靠 aaddrick 的 unofficial port」；另 [Claude for Desktop 初發布串](https://news.ycombinator.com/item?id=42007649)亦有用戶抱怨官方無 Linux build。

## Release 狀態 / 時間軸

- **2024-12-26**：repo 建立，首個 commit。
- **2025 全年**：跟隨官方 Claude Desktop 版本節奏更新，release 以 `v<port 版本>+claude<上游版本>` 雙軌命名。
- **2026-04-12 ~ 2026-04-17**：6 天內連發 `v1.3.30`、`v1.3.31`、`v1.3.32` 共 5 個 tag，對應上游 `claude1.1617 → 1.3109`——上游改版頻繁、port 幾乎即時跟進。
- **最新版 v1.3.32+claude1.3109.0**（2026-04-17 發布，GitHub Actions bot 自動打包）。總計 30+ releases，`has_releases: true`。

## 授權與社群

- **License**：Apache 2.0（打包腳本）；Claude Desktop 本體仍受 Anthropic Consumer Terms。
- **量化鐵錨**：3,432 stars / 380 forks / 51 subscribers / 45 open issues / 30 contributors / 30+ releases。單日 stars_today 39、growth rate 僅 1.14%——典型的「長期累積後被事件觸發曝光」型爆紅，而非新專案竄升。
- **語言分布**：Shell 76% / JavaScript 20% / Nix 2% / Python 1%——JavaScript 主要是 stub 替身模組，Shell 是打包骨幹。
- **Topics**：repo 未設 topics（留白，搜尋靠 description）。
- **社群渠道**：GitHub Issues（45 open）、Discussions 已啟用、有 Wiki 與 GitHub Pages；無官方 Discord / Matrix。

## 資料來源

### 本體
- [aaddrick/claude-desktop-debian](https://github.com/aaddrick/claude-desktop-debian)（GitHub repo）
- [Releases](https://github.com/aaddrick/claude-desktop-debian/releases)
- [aaddrick/claude-desktop-arch](https://github.com/aaddrick/claude-desktop-arch)（同作者 Arch 版）

### 第三方評論
- [Ludditus：Claude Desktop for Linux, I didn't even know it existed](https://ludditus.com/2025/12/17/claude-desktop-for-linux-i-didnt-even-know-it-existed/)
- [Greg Hilston：Installing Claude Desktop on Linux](https://www.greghilston.com/post/claude-desktop-on-linux/)
- [Medium / Mara Ellorin：Built on Linux, but not for Linux users](https://medium.com/@mara.ellorin/built-on-linux-but-not-for-linux-users-fddc6792b594)
- [HN：Redesigned Claude Code Desktop app](https://news.ycombinator.com/item?id=47769926)
- [HN：Claude for Desktop](https://news.ycombinator.com/item?id=42007649)

### 同類工具
- [k3d3/claude-desktop-linux-flake](https://github.com/k3d3/claude-desktop-linux-flake)（原型 Nix flake）
- [emsi/claude-desktop](https://github.com/emsi/claude-desktop)（fork）
- [chrimage/claude-desktop-fedora](https://github.com/chrimage/claude-desktop-fedora)（Fedora fork）
- [anthropics/claude-code](https://github.com/anthropics/claude-code)（官方 CLI，唯一有 Linux 支援的 Claude 原生客戶端）

## 更新紀錄
