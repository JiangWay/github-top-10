---
repo: byJoey/cfnew
first_seen: 2026-05-23
last_updated: 2026-05-23
appearances: [2026-05-23]
growth_appearances: [2026-05-23]
has_releases: true
latest_release: Pages-v2.9.8a
tags: [網路工具, 應用程式, 自架, 開源替代]
domain: 網路工具
form: 應用程式
themes: [自架, 開源替代]
---

# [byJoey/cfnew](https://github.com/byJoey/cfnew)

## 深度研究（2026-05-23 首次）

### 專案定位
[byJoey/cfnew](https://github.com/byJoey/cfnew) 是中文社群維護的 Cloudflare Workers / Pages 部署腳本，主打「白嫖式」免費多協定代理節點搭建與訂閱轉換管理，從 [yonggekkk/Cloudflare-vless-trojan](https://github.com/yonggekkk/Cloudflare-vless-trojan)、zizifn/edgetunnel 衍生的 CF 翻牆生態之新一代整合方案，repo 內既有檔名（`少年你相信光吗`、`明文源吗`、`فارسی.md`）顯示其面向華語與波斯語使用者。

### 核心架構 / 主要概念
- 部署於 Cloudflare Workers 或 Pages，使用 `wrangler.toml` 設定 KV namespace 與環境變數作為持久層
- 同時支援 VLESS、Trojan、xhttp 三種代理協定並存，配合自定義路徑（非 UUID-based）路由
- 內建優選 IP 延遲測試、機場代碼自動偵測、依 User-Agent 回傳適配格式
- 提供圖形化 dashboard 與 API 動態增刪 IP，輸出 Clash / Surge / Sing-box 等 10+ 客戶端可用訂閱

### 目標使用者
具備基礎 Cloudflare 帳號操作能力、想要免費自建跨防火牆代理節點的華語／波斯語使用者，特別是希望以 GUI 取代純命令列 Worker 編輯流程的入門族群。

### 與類似專案的差異
相較於 [yonggekkk/Cloudflare-vless-trojan](https://github.com/yonggekkk/Cloudflare-vless-trojan) 純腳本與 zizifn/edgetunnel 偏底層 tunnel 實作，cfnew 加上完整 KV-based 管理後台與訂閱轉換層，把「部署 + 優選 + 訂閱」三步整合進單一 Worker。社群 fork [LUXE-STORE/cfnew](https://github.com/LUXE-STORE/cfnew) 與舊版 [canleng/CFnew---v2.7](https://github.com/canleng/CFnew---v2.7) 顯示此專案已形成可分叉延伸的版本族系，與 zizifn 系列「最小可用」哲學分道揚鑣。

### 外部評論
- [byJoey/cfnew DeepWiki 條目](https://deepwiki.com/byJoey/cfnew) 將其定位為「Cloudflare Workers-based multi-protocol proxy and subscription management system」並描述其邊緣計算 + KV + GitHub Actions 自動化部署架構
- [Issue #247 部署后每天不使用都会达到cf请求上限](https://github.com/byJoey/cfnew/issues/247) 反映社群實際使用上遭遇 CF free tier 請求數爆量的營運性問題
- 中文社群（V2EX、少数派、思否）對「cfnew」此名稱的直接專文覆蓋仍稀薄——資料不足，多數討論落在更上游的 [Cloudflare-vless-trojan](https://github.com/yonggekkk/Cloudflare-vless-trojan) 與 edgetunnel 生態
- 作者另有 [byJoey/cfnewup](https://github.com/byJoey/cfnewup) 與 [Travis0234/joeyblog](https://github.com/Travis0234/joeyblog) 等周邊倉，形成 Joey blog 個人品牌的小型生態

### Release 狀態
最新 release [Pages v2.9.8a](https://github.com/byJoey/cfnew/releases)（2026-05-22），近期釋出節奏密集（v2.9.6 → v2.9.7 → v2.9.8a 集中於 2026-03 至 5 月），更新頻率與真新進當日 trending 動能一致。

### 授權與社群
**無 LICENSE 檔案、無 GitHub language detection、無 repo description**——專案治理層面相當「裸」，僅靠 README 與多語檔案撐起。貢獻者前五名為 `github-actions[bot]`（1,436 自動 commit 主導 release pipeline）、`byJoey`（323，作者本人）、`joeyblogtest`（17）、`zxlhhyccc`（4）、`DarknessBeforeDawn`（1），呈現「單一作者 + CI bot 主導」的典型個人專案結構，13,279 stars / 6.4k forks 反映其在華語翻牆社群的高擴散度但低正式化程度。
