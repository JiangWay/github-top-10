---
repo: jingyaogong/minimind
first_seen: 2026-11-26
last_updated: 2026-11-27
appearances: [2026-11-26, 2026-11-27]
growth_appearances: [2026-11-26, 2026-11-27]
has_releases: true
latest_release: v2
tags: [LLM 訓練, 框架]
domain: LLM 訓練
form: 框架
themes: []
---

# [jingyaogong/minimind](https://github.com/jingyaogong/minimind)

> 研究日期：2026-11-26
> 研究來源：https://github.com/jingyaogong/minimind
> 觸發原因：首次上絕對榜（#4，70,838 stars，今日 +828，增長率 1.17%）
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[jingyaogong/minimind](https://github.com/jingyaogong/minimind) 是一套用純 PyTorch 從零訓練約 64M 參數語言模型的開源程式碼，涵蓋 Tokenizer、Pretrain、SFT、LoRA、DPO、PPO / GRPO / CISPO、Tool Use、Agentic RL 與蒸餾。repo description 的口號是「兩小時從 0 訓出你的 64M 大模型」；README 補充這是單張 NVIDIA 3090 跑完 SFT 1 epoch 的實測，租卡成本約 3 元人民幣。

## 作者與起源

作者是 GitHub 帳號 `jingyaogong`，個人頁標示單位為 NJU，bio 為「無限進步」，約 2,528 followers、12 個公開 repo。repo 建立於 2024-07-27，首個 commit 訊息為 "add readme"。作者在 README 自述這是業餘時間維護的專案，動機是現有教學多為付費課程，且 `transformers` / `trl` / `peft` 的高階封裝讓人看不到底層實作。

時間軸：2024-08-28 發布 minimind-v1-small，2025-04-26 模型改名並對齊 Transformers 命名、支援 llama.cpp / vllm / ollama，2025-10-24 加入 PPO / GRPO / SPO 與 YaRN，2026-04-01 發布 minimind-3 與 minimind-3-moe。同作者另有視覺版 [jingyaogong/minimind-v](https://github.com/jingyaogong/minimind-v) 與多模態版 [jingyaogong/minimind-o](https://github.com/jingyaogong/minimind-o)。

## 核心架構 / 主要概念

模型是 decoder-only Transformer，結構向 Qwen3 看齊：Pre-Norm + RMSNorm、SwiGLU、RoPE（支援 YaRN 外推）、GQA（q_heads=8、kv_heads=4）。minimind-3 主線為 8 層、d_model=768、vocab 6,400、max position 32,768、約 64M 參數；minimind-3-moe 為 4 experts / top-1 routing，總參數 198M、啟用 64M，並移除 shared expert。

目錄結構（`gh api` 實測）：

- `model/`：`model_minimind.py`（模型）、`model_lora.py`（LoRA）、tokenizer 檔
- `trainer/`：`train_pretrain.py`、`train_full_sft.py`、`train_lora.py`、`train_dpo.py`、`train_ppo.py`、`train_grpo.py`、`train_agent.py`、`train_distillation.py`、`train_tokenizer.py`、`rollout_engine.py`
- `eval_llm.py`、`scripts/`（OpenAI 相容 API 服務端、Streamlit WebUI、LoRA 合併轉檔）、`dataset/`

特色是 2026-04 更新後移除獨立的 `train_reason.py`，思考能力改由 chat template 的 `<think>` 標記與 `open_thinking` 開關控制；Tool Call 資料混入 SFT 主線。RLAIF 與 Agentic RL 的 rollout engine 已與訓練解耦，可替換生成後端。專案以 Python 為唯一語言（269,326 bytes）。

## 設計哲學

README 的核心主張：

> 「用乐高自己拼出一架飞机，远比坐在头等舱里飞行更让人兴奋」

翻譯：自己拼一架飛機，比坐頭等艙更有意思。作者據此要求核心演算法不依賴第三方高階介面，從 0 用 PyTorch 原生實作；封面口號是「大道至簡」。同時為了生態相容，權重可轉成 Transformers 格式，接 llama.cpp、vllm、ollama 與 Llama-Factory。另一段原文指出作者對小模型能力的預期：

> 「事实知识与泛化效果仍较有限」（針對 minimind-3 Zero 版本）

即 README 自己承認 64M 模型的對話品質有限，定位是學習載體而非可用助理。

## 目標使用者與適用情境

適合：想逐行讀懂 LLM 全流程的學生與工程師；只有單張消費級 GPU（3090 等級）想完整跑一次 pretrain → SFT → RL 的人；需要一個可改的小模型做演算法實驗（RL、蒸餾、MoE、Linear Attention 與 diffusion LM 的實驗性分支在 Discussion 中）。

不適合：需要實用對話品質或事實準確度的產品場景（README 自己展示的輸出中，英文問題會出現亂碼句）；需要成熟分散式訓練與工程化的團隊，訓練規模遠小於一般 production 級框架。

## 與類似專案的差異

| 對手 | 規模 / 路線 | 本專案的差異 | 什麼時候選誰 |
|---|---|---|---|
| [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT)（約 65k stars） | GPT-2 風格，單檔訓練與取樣，聚焦 pretrain | minimind 往後延伸到 SFT、LoRA、DPO、PPO/GRPO、Tool Use、Agentic RL，且有中文 tokenizer 與資料集 | 只想懂 pretrain 核心選 nanoGPT；想看完整後訓練鏈路選 minimind |
| [karpathy/nanochat](https://github.com/karpathy/nanochat)（約 61k stars） | 單機 end-to-end ChatGPT 複製，追求固定預算下的完整流程 | 兩者都涵蓋 pretrain 到對話，minimind 的預算更低（約 3 元、單卡 3090），並提供 RL 與 Agent 訓練腳本、中文資料 | 要貼近 Karpathy 路線與更大預算選 nanochat；中文與低預算選 minimind |

另一個常被拿來對照的是 [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)，它是配書教材（逐章 notebook），minimind 則是可直接執行的訓練 repo。

## 外部評論

以下為檢索到的第三方資料，均為轉述或個人實驗報告，未見獨立 benchmark：

- [MiniMind: Train a 64M-Parameter LLM From Scratch in 2 Hours（pyshine）](https://pyshine.com/MiniMind-Train-LLM-From-Scratch/)：英文介紹文，主要複述 README 的架構與成本主張，非獨立評測。
- [搜狐文章（m.sohu.com）](https://m.sohu.com/a/1072269481_122980439/)：評價其打通 pretrain、SFT 到 RL 的全流程，優點是每行程式碼可讀，缺點是工程成熟度不如成熟框架，分散式與斷點續訓需自行處理（此說法與 README 2025-10-24 日誌的「斷點續訓」支援並不一致，採信前建議自行驗證）。
- [CSDN 課程作業復現記錄（gitcode.csdn.net）](https://gitcode.csdn.net/69eb12b30a2f6a37c5a5cfd4.html)：個人在單張 RTX 3090 上依官方流程完成 pretrain 與 SFT，並用 `eval_llm.py` 驗證生成，屬實驗報告而非系統評測。
- [DeepWiki：jingyaogong/minimind](https://deepwiki.com/jingyaogong/minimind)：自動生成的程式碼導覽，非人工評論。

已查來源：WebSearch 英文與中文各一輪（含 HN、知乎、掘金關鍵字），未檢得 HN / Reddit 的顯著討論串與知乎、掘金的獨立評測，這部分資料不足。

## Release 狀態 / 時間軸

GitHub Release 共 2 個，且都是文件或模型下載的載體，非軟體版本節奏：

- `minimind-v1`（名稱「ModelScope-MiniMind-V1」）：2024-09-02
- `v2`（名稱「MiniMind Docs」）：2025-10-21，最新

實際版本演進靠 README 更新日誌與 commit：2024-07-27 建 repo → 2024-08-28 v1-small → 2025-04-26 大改版 → 2025-10-24 RLAIF → 2026-04-01 minimind-3。最近一次 commit 為 2026-11-23。上榜前 repo 已有約 70k stars；今日 +828 對應 1.17%，屬大基數下的穩定新增，非單日暴衝。

## 授權與社群

- 授權：Apache-2.0
- 規模：70,839 stars、9,206 forks、64 open issues、28 位 contributors（作者 jingyaogong 貢獻 243 commits，第二名僅 6），單人主導特徵明顯
- 語言：Python 100%
- Topics：`artificial-intelligence`、`large-language-model`
- 社群出口：GitHub Discussions、Hugging Face / ModelScope 模型集合、Bilibili 視頻介紹
- 商業面：README 頂部有贊助區塊（API 中轉服務），作者聲明贊助不換取特權
- stars 增長速率：今日 +828；歷史逐日曲線資料不足（未取 star history）

## 資料來源

**本體**
- [jingyaogong/minimind](https://github.com/jingyaogong/minimind)（`gh api` repo / languages / contributors / releases / tags / contents，README）
- [Releases](https://github.com/jingyaogong/minimind/releases)

**第三方評論**
- [pyshine](https://pyshine.com/MiniMind-Train-LLM-From-Scratch/)
- [搜狐](https://m.sohu.com/a/1072269481_122980439/)
- [CSDN](https://gitcode.csdn.net/69eb12b30a2f6a37c5a5cfd4.html)
- [DeepWiki](https://deepwiki.com/jingyaogong/minimind)

**同類工具**
- [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT)
- [karpathy/nanochat](https://github.com/karpathy/nanochat)
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)

## 更新紀錄
