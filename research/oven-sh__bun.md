---
repo: oven-sh/bun
first_seen: 2026-05-18
last_updated: 2026-05-18
appearances: [2026-05-18]
growth_appearances: []
has_releases: true
latest_release: bun-v1.3.14
tags: [開發者工具, 框架, 開源替代]
domain: 開發者工具
form: 框架
themes: [開源替代]
---

# [oven-sh/bun](https://github.com/oven-sh/bun) 深度研究（2026-05-18 首次）

[oven-sh/bun](https://github.com/oven-sh/bun) 是本站歷來上榜「最大規模 × 最老牌正典級」之一：累積 91,662 stars、15,000+ commits、596 watchers、4,573 forks，今日以 908 stars_today、僅 0.99% 增長率擠入絕對榜 #10，屬典型「巨型老牌的溫和爆量」。觸發點明確：5-13 釋出的 [Bun v1.3.14](https://bun.com/blog/bun-v1.3.14)（修 92 issue、引入 `Bun.Image` 原生影像處理 API、experimental HTTP/2 與 HTTP/3 client、`Bun.serve()` 原生 HTTP/3 (QUIC)、isolated linker global store 帶來 7× 暖安裝加速、Windows ConPTY 支援），疊加 [本月 Jarred Sumner 正式啟動 Bun 從 Zig 改寫為 Rust（重度仰賴 AI 工具）的消息](https://en.wikipedia.org/wiki/Bun_(software))，雙重事件把這個原本長期蟄伏於 GitHub Trending 邊緣的巨倉推上首頁。

## 專案定位

「Incredibly fast JavaScript runtime, bundler, test runner, and package manager — all in one」。Bun 是把 Node.js 拆碎重組成單一 binary 的激進嘗試：一支執行檔同時是 runtime、bundler、test runner、package manager、script runner，目標是取消「裝 1,000 個 node_modules」的儀式。

## 核心架構 / 主要概念

- **語言層**：Zig + C++ 撰寫（本月起進入 Rust 改寫過渡期）
- **JS 引擎**：採用 Apple Safari 的 [WebKit JavaScriptCore](https://github.com/WebKit/WebKit) 而非 V8，主打更低冷啟動與更低記憶體占用
- **API 表面**：對 Node.js API 高度相容（fs、path、crypto、http、worker_threads），同時擴充自家 `Bun.serve`、`Bun.write`、`Bun.Image`、`Bun.Terminal` 等命名空間
- **工具鏈整合**：原生支援 TypeScript、JSX、CSS、Tailwind、front-end dev server，無需額外 transpiler

## 目標使用者

- **後端 / 邊緣運算工程師**：追求冷啟動延遲（AWS Lambda 上 Bun 平均 156ms vs Node.js 245ms，見 [DEV: Bun vs Deno vs Node.js 2026 Benchmarks](https://dev.to/jsgurujobs/bun-vs-deno-vs-nodejs-in-2026-benchmarks-code-and-real-numbers-2l9d)）
- **monorepo 與 CI 加速派**：`bun install` 比 npm/pnpm 快數倍是常見遷移誘因
- **全端 TypeScript 開發者**：希望「runtime + bundler + test」一鍵到底
- **Anthropic 內部團隊**：自 [2025-12-02 Anthropic 收購 Bun](https://www.programming-helper.com/tech/bun-anthropic-acquisition-2026-ai-javascript-runtime) 後，Bun 同時承擔 Claude 程式碼工具鏈的 runtime 角色

## 與類似專案的差異

- vs [nodejs/node](https://github.com/nodejs/node)：Bun 用 JSC 而非 V8，犧牲部分生態深度換取啟動速度；bundler/test runner 內建免外掛
- vs [denoland/deno](https://github.com/denoland/deno)：兩者皆 all-in-one 路線，但 Bun 主打「無痛遷移 Node.js」，Deno 主打「web 標準與權限模型」
- vs [vercel/turbo](https://github.com/vercel/turbo) / [evanw/esbuild](https://github.com/evanw/esbuild)：Bun 把 bundler 收進 runtime 內，路徑更短但耦合更深

## 外部評論

- [InfoQ：Bun v3.1 引入內建資料庫客戶端與零設定前端開發](https://www.infoq.com/news/2026/01/bun-v3-1-release/) 報導 Bun 正在從 runtime 進一步擴張為全端框架
- [Strapi Blog：Bun vs Node.js 2026 效能與遷移指南](https://strapi.io/blog/bun-vs-nodejs-performance-comparison-guide) 觀察到合成 benchmark 中 Bun 達 52k RPS、Node.js 約 13k，但接上資料庫後三者趨近 12k RPS
- [byteiota：2026 三家 benchmark 容易誤導](https://byteiota.com/bun-vs-deno-vs-node-js-2026-real-benchmarks-mislead/) 提醒讀者區分「HTTP 框架基準」與「真實業務負載」
- [Tech Insider：Bun 比 Node.js 快 3 倍，但 ready 了嗎？](https://tech-insider.org/bun-vs-nodejs-2026/) 點出 npm 套件相容性仍是邊角案例的最大風險
- [InfoWorld 訪談 Jarred Sumner](https://www.infoworld.com/article/2338698/interview-with-jarred-sumner-buns-creator-talks-tech-funding-and-startups.html)：回顧 Bun Inc.（前身 Oven.sh）來自 Kleiner Perkins 與 Vercel 創辦人 Guillermo Rauch 的早期投資

## Release 狀態

最新版本 [bun-v1.3.14](https://github.com/oven-sh/bun/releases/tag/bun-v1.3.14)（2026-05-13 由 Jarred Sumner 發布），亮點：`Bun.Image` 原生影像處理、experimental HTTP/2/HTTP/3 fetch、`Bun.serve()` QUIC、isolated linker global store 7× 暖安裝、Linux/macOS 重寫 `fs.watch()`、Windows ConPTY 上的 `Bun.Terminal`。前一版 [v1.3.13](https://bun.com/blog/bun-v1.3.13) 補上 `bun test` 的 `--parallel`、`--isolate`、`--shard`、`--changed`、`bun install` 串流 tarball（節省 17× 記憶體）、zlib-ng 帶來 5.5× gzip 加速、SHA3 支援。發版節奏穩定為週級。

## 授權與社群

授權為非標準 OSS 條款（GitHub 標示 `Other` / `NOASSERTION`），主要貢獻者集中於 [Jarred-Sumner](https://github.com/Jarred-Sumner) 與 Bun Inc.（已於 [2025-12 被 Anthropic 收購](https://www.programming-helper.com/tech/bun-anthropic-acquisition-2026-ai-javascript-runtime)）。社群以 Discord、GitHub Discussions 為主，open issues 6,936 反映高度活躍但回應壓力大；4,573 forks 為前端工具鏈第一梯隊水位。
