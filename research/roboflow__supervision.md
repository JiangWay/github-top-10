---
repo: roboflow/supervision
first_seen: 2026-06-30
last_updated: 2026-06-30
appearances: [2026-06-30]
growth_appearances: [2026-06-30]
has_releases: true
latest_release: 0.29.1
tags: [開發者工具, 框架, 開源替代]
domain: 開發者工具
form: 框架
themes: [開源替代]
---

# [roboflow/supervision](https://github.com/roboflow/supervision)

> 研究日期：2026-06-30
> 研究來源：<https://github.com/roboflow/supervision>
> 觸發原因：首次上絕對榜
> 報告作者：Claude Code（claude.ai/code）

## 一句話定位

[roboflow/supervision](https://github.com/roboflow/supervision) 是 Roboflow 開源的 Python 電腦視覺工具庫，把「偵測結果視覺化、跨幀追蹤、區域計數、資料集格式轉換、mAP 評估」這些 CV 工程裡每次都要重寫一次的雜事，收斂成一個 model-agnostic 的 `sv.Detections` 共通物件加上一整排可組合的 annotators／trackers／tools。

副標：它不是模型、不是訓練框架，而是模型上下游那層的接縫，把 [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)、[facebookresearch/detectron2](https://github.com/facebookresearch/detectron2)、Transformers、SAM、MMDetection、YOLO-NAS、PaddleDet 等任一家輸出的偵測結果，統一成同一個資料結構後再做後處理。

## 作者與起源

repo 的 owner 是 Roboflow 組織帳號，建立於 2022-11-28。Roboflow 本身是 2019 年成立、總部在 Des Moines 的電腦視覺 MLOps 公司，主力是線上資料標註與模型部署平台。supervision 是該公司開源策略的核心專案之一，與另外幾個 repo 一起構成 Roboflow 的 OSS 生態：[roboflow/inference](https://github.com/roboflow/inference)（推理伺服器）、[roboflow/notebooks](https://github.com/roboflow/notebooks)（教學 notebook 集）、[autodistill/autodistill](https://github.com/autodistill/autodistill)（蒸餾大模型到小模型）、[roboflow/maestro](https://github.com/roboflow/maestro)（VLM 微調）。

起源脈絡：2022 年底 YOLOv8 釋出前後，CV 工程師日常要把不同家模型的輸出轉成 OpenCV `cv2.rectangle`／`cv2.putText` 來畫框，每個專案都在自己重寫一遍 NMS、label 排版、tracker 接線。supervision 把這套樣板碼抽出來標準化。

repo 從 2022-11-28 建立至 2026-06-30，三年半累積 **45,793 stars / 4,065 forks / 161 contributors**，平均約 35 stars／天，2026-06-30 單日 +336 是平均值的 9.6 倍，是老倉穩定累積路線（不是爆紅）。

## 核心架構 / 主要概念

supervision 的核心是一個共通資料結構 `sv.Detections`，所有功能都掛在它上面。整體可分成 5 大模組：

### 1. 統一資料結構 `sv.Detections` 與 `sv.KeyPoints`

`sv.Detections` 內含 `xyxy`、`mask`、`confidence`、`class_id`、`tracker_id`、`data` 等欄位；對應的 from-converter 把每家模型的輸出格式轉進來：

```python
import supervision as sv
from ultralytics import YOLO

model = YOLO("yolov8n.pt")
result = model(image)[0]
detections = sv.Detections.from_ultralytics(result)
```

`from_*` converters 涵蓋：`from_ultralytics`、`from_transformers`、`from_detectron2`、`from_mmdetection`、`from_sam`、`from_yolo_nas`、`from_paddledet`、`from_inference`、`from_azure_analyze_image`、`from_vlm`（含 PaliGemma、Florence-2 等 VLM 的輸出解析）。`sv.KeyPoints` 是同樣概念的姿態估計版本，0.29.1 新加了 `with_nms()` 把 skeleton 去重。

### 2. Annotators（視覺化）

可組合的視覺化單元，每一個都吃 `(scene, detections) → scene`，可以鏈式套用：

| 類別 | Annotator | 用途 |
|---|---|---|
| Box | `BoxAnnotator`、`BoxCornerAnnotator`、`RoundBoxAnnotator`、`OrientedBoxAnnotator` | 各種風格的偵測框 |
| Mask | `MaskAnnotator`、`HaloAnnotator`、`PolygonAnnotator` | 分割遮罩 |
| Label | `LabelAnnotator`、`RichLabelAnnotator` | 類別與置信度文字 |
| Effect | `BlurAnnotator`、`PixelateAnnotator`、`HeatMapAnnotator` | 模糊／馬賽克／熱圖 |
| Trace | `TraceAnnotator`、`DotAnnotator`、`TriangleAnnotator` | 軌跡與標記 |
| KeyPoint | `VertexAnnotator`、`EdgeAnnotator`、`VertexEllipseAreaAnnotator`、`VertexEllipseOutlineAnnotator` | 姿態估計關鍵點 |

### 3. Trackers

內建 ByteTrack 包裝 `sv.ByteTrack`，吃 `Detections` 回傳帶 `tracker_id` 的 `Detections`。也有獨立 sibling 專案 [roboflow/trackers](https://trackers.roboflow.com/latest/) 補上 SORT、DeepSORT 等其他追蹤器。

### 4. Tools（區域與量測）

- `sv.PolygonZone`：判定 detection 是否進入多邊形區域；常見用法是停車格佔用、限制區入侵告警
- `sv.LineZone`：跨線計數（人流／車流方向統計）
- `sv.InferenceSlicer`：把高解析影像切成 tile 跑 SAHI 風格小物件偵測，等同 [obss/sahi](https://github.com/obss/sahi) 的 inline 版本
- `sv.detection.utils.box_iou_batch`、`mask_iou_batch`：批次 IoU 計算

### 5. Datasets 與 Metrics

`sv.DetectionDataset`／`sv.ClassificationDataset` 提供 COCO、YOLO、Pascal VOC 三大格式互轉與切分：

```python
ds = sv.DetectionDataset.from_coco(
    images_directory_path=".../train",
    annotations_path=".../train/_annotations.coco.json",
)
train, valid = ds.split(0.8)
ds.as_yolo(images_directory_path=".../yolo")
```

`sv.MeanAveragePrecision`、`sv.Precision`、`sv.Recall`、`sv.MeanAverageRecall`、`sv.ConfusionMatrix` 等指標物件可直接拿 `Detections` 算數字。

### 0.28.0 起新增的 `sv.CompactMask`

segmentation 模型每張 detection 預設吐一張 full-resolution bitmap：1920×1080 影像、28 個 detection 就是約 55 MB 的 mask 記憶體。`sv.CompactMask` 只存 tight bounding-box 內的 crop 加上 RLE 壓縮，0.28.0 release note 把記憶體節省當成主打。對影片串流處理是實際痛點。

## 設計哲學

README 把哲學講得很白：

> "Supervision was designed to be model agnostic. Just plug in any classification, detection, or segmentation model."

翻譯：supervision 從一開始就是模型中立，任何分類、偵測、分割模型接上來就能用。

這個取向體現在 `from_*` converters 的範圍：從早期的 Ultralytics、Detectron2，補到 SAM、Azure Vision，再到 2026 年補 VLM 輸出解析器。每多一家模型，使用者就少寫一段轉接碼。

另一條設計線是「組合優於繼承」。annotators 全部設計成 `(scene, detections) → scene` 的 pure function 風格，鏈式套用就能組合：

```python
annotated = box_annotator.annotate(image.copy(), detections=detections)
annotated = label_annotator.annotate(annotated, detections=detections, labels=labels)
annotated = trace_annotator.annotate(annotated, detections=detections)
```

不需要繼承自訂 class，也不需要 plugin 註冊機制。這跟 Detectron2 那種大型 framework 的取向相反：supervision 不要當 framework，要當積木。

## 目標使用者與適用情境

**適合**：

- 已經選好偵測／分割模型（YOLO 系列、RT-DETR、SAM、自家訓練的模型）、想把推理結果接到「畫框、追蹤、區域計數、產出評估報表」這些下游工程的開發者
- 寫 CV demo、PoC、客戶展示影片時，需要快速把 detection 視覺化、加軌跡、加區域告警的人
- 在 COCO、YOLO、Pascal VOC 三種標註格式間搬資料的人，`DetectionDataset` 互轉省掉自己寫 parser
- 想做 mAP／Precision／Recall benchmark 但不想自己再實作一次評估邏輯的人

**不太適合**：

- 想找訓練框架的人：supervision 不訓練模型，要訓練去 [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)、[facebookresearch/detectron2](https://github.com/facebookresearch/detectron2)、PyTorch Lightning 那一掛
- 不寫 Python 的場景：supervision 是純 Python 函式庫，邊緣裝置 C++ 部署要看別的
- 要全託管的工作流／GUI 標註工具：那是 Roboflow 商業平台或 Supervisely 的範圍，不是這支 OSS 函式庫的定位

## 與類似專案的差異

| 對手 | 對手主打 | supervision 的差異 |
|---|---|---|
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | YOLO 系列訓練／推理／導出的官方框架，自帶 `model.predict()` 與 `result.plot()` 視覺化 | Ultralytics 是模型本身與 YOLO 專屬視覺化；supervision 是 model-agnostic 後處理層，吃 Ultralytics 輸出再加上自家 annotator、tracker、zone、dataset 互轉。常見組合是 Ultralytics 訓練／推理 + supervision 包後處理 |
| [facebookresearch/detectron2](https://github.com/facebookresearch/detectron2) | Meta 開源的 detection 研究框架，含 Faster R-CNN、Mask R-CNN、Panoptic FPN 等實作；學界 baseline 常用 | Detectron2 是大型 framework，自帶模型 zoo、trainer、visualizer；supervision 不訓練、不附模型，定位是「拿 Detectron2 的輸出再做工程化後處理」。`sv.Detections.from_detectron2` 就是這個介面 |
| [obss/sahi](https://github.com/obss/sahi) | Slicing Aided Hyper Inference：把大圖切片做小物件偵測 | sahi 是專做切片推理的工具；supervision 的 `sv.InferenceSlicer` 是這個概念的 inline 實作，整合度高於外掛 sahi，但 sahi 的切片演算法選項較多 |
| OpenCV 原生繪圖 API（`cv2.rectangle`／`cv2.putText` 等） | 標準函式庫、零依賴 | OpenCV 給的是最低階 primitive，標 label 要自己排版、追蹤要自己接 ByteTrack、區域計數要自己寫多邊形判斷。supervision 等於把這些常見模式收成 high-level API |
| [roboflow/inference](https://github.com/roboflow/inference) | Roboflow 自家推理 server，可跑各家模型 | inference 是 server，supervision 是 client-side 後處理函式庫；`sv.Detections.from_inference` 就是兩者的接縫 |

選型建議：

- 已經在用 Ultralytics／Detectron2／SAM、需要把輸出畫框／追蹤／區域計數／轉資料集 → 直接 supervision
- 只要畫框、不在乎別的、想保持零依賴 → OpenCV 原生 API
- 主要痛點是小物件偵測切片 → sahi 或 `sv.InferenceSlicer`，要更多切片策略選 sahi
- 連推理 server 一起換 → Roboflow Inference + supervision 組合

## 外部評論

- [lightly.ai — Best Ultralytics Alternatives in 2026](https://www.lightly.ai/blog/best-ultralytics-alternatives-in-2026)：把 supervision 列為 Ultralytics 周邊生態的核心後處理函式庫，定位是 model-agnostic 工具層而非競品。屬中性比較。
- [MarkTechPost — Building an End-to-End Object Tracking and Analytics System with Roboflow Supervision (2025-08-03)](https://www.marktechpost.com/2025/08/03/building-an-end-to-end-object-tracking-and-analytics-system-with-roboflow-supervision/)：第三方教學文，主軸是「supervision 把 detection、tracking、analytics 串成一條 pipeline 很順手」。未見對缺點的批判。
- [GitHub Discussion #950 — trackers/](https://github.com/roboflow/supervision/discussions/950)：社群討論 ByteTrack 表現不如預期時的常見原因，官方回應是「通常是上游 detection 模型本身 recall 不足，不是 tracker 的問題」。算是社群最常見痛點的官方說法。
- [Roboflow Blog — Build Computer Vision Applications Faster with Supervision](https://blog.roboflow.com/supervision/)：第一方介紹文，把 supervision 定位為 Roboflow OSS 生態裡的後處理層。屬第一方來源。
- HN 與 Reddit：截至 2026-06-30，未見針對 `roboflow/supervision` 的顯著爆紅討論串（這支 repo 是長線累積成長、不是單日爆紅型）。**HN／Reddit 集中討論串，資料不足。**

## Release 狀態 / 時間軸

repo 共 30 個 release，從 2022 年底到 2026-06-23，平均約 1.5 個月一版。近期節奏：

| 日期 | 版本 | 重點 |
|---|---|---|
| 2022-11-28 | repo 建立 | |
| 2025-07-23 | 0.26.1 | |
| 2025-11-16 | 0.27.0 | |
| 2026-03-14 | 0.27.0.post2 | |
| 2026-04-30 | 0.28.0 | `sv.CompactMask` 記憶體優化 mask；Python 3.13 支援；新增 Precision／Recall／MeanAverageRecall |
| 2026-06-11 | 0.29.0rc0 | |
| 2026-06-15 | 0.29.0 | 新增 `VertexEllipseAreaAnnotator`、`VertexEllipseOutlineAnnotator` 等姿態關鍵點 annotators |
| 2026-06-17 | 0.29.0.post0 | hotfix |
| 2026-06-23 | 0.29.1 | `KeyPoints.with_nms()`：對 pose estimation 結果去除重複骨架；從 keypoint 推軸對齊 box 後跑 NMS，支援 class_agnostic 與 IOU／IOS metric |
| 2026-06-30 | — | 首次衝進 GitHub Trending 絕對榜 #10（單日 +336 stars） |

老倉穩定累積路線：30 個 release、三年半、無明顯爆紅事件。本日上榜應屬 0.29.1 KeyPoints NMS 這條 6-23 釋出的 pose 線收尾、加上 6-15 的姿態 annotators，慢熱發酵到本週。

## 授權與社群

- License：MIT
- 主要語言：Python（topics 顯示 `pytorch`、`tensorflow` 並列，但實作是純 Python）
- 規模（2026-06-30 取數）：45,793 stars、4,065 forks、102 open issues、245 subscribers
- contributors：161 位
- topics：`classification`、`coco`、`computer-vision`、`deep-learning`、`hacktoberfest`、`image-processing`、`instance-segmentation`、`low-code`、`machine-learning`、`metrics`、`object-detection`、`oriented-bounding-box`、`pascal-voc`、`python`、`pytorch`、`tensorflow`、`tracking`、`video-processing`、`yolo`
- 預設分支：`develop`（這是 Roboflow 的慣例，main 之外的 trunk-based 開發）
- 官方文件站：<https://supervision.roboflow.com>
- PyPI 規模：根據官方 about 頁，supervision 月下載量超過 100 萬次（[來源](https://supervision.roboflow.com/0.28.0/about/)），是該函式庫真正可量化的採用度指標
- stars 增長速率：repo 2022-11-28 建立、至 2026-06-30 累積 45,793 stars、共 1,310 天，平均約 35 stars／天；單日 +336 是平均值的 9.6 倍
- contributors 對 stars 比：161 位 contributors 對 45,793 stars，平均每位 contributor 約 284 stars，反映健康的社群參與密度

## 資料來源

**本體**

- repo：<https://github.com/roboflow/supervision>
- README：<https://github.com/roboflow/supervision/blob/develop/README.md>
- 官方文件站：<https://supervision.roboflow.com>
- Changelog：<https://supervision.roboflow.com/changelog/>
- About：<https://supervision.roboflow.com/0.28.0/about/>
- 0.29.1 release：<https://github.com/roboflow/supervision/releases/tag/0.29.1>
- 0.29.0 release：<https://github.com/roboflow/supervision/releases/tag/0.29.0>
- 0.28.0 release：<https://github.com/roboflow/supervision/releases/tag/0.28.0>
- PyPI：<https://pypi.org/project/supervision/>
- conda-forge：<https://anaconda.org/conda-forge/supervision>

**第三方評論**

- [lightly.ai — Best Ultralytics Alternatives in 2026](https://www.lightly.ai/blog/best-ultralytics-alternatives-in-2026)
- [MarkTechPost — Building an End-to-End Object Tracking and Analytics System with Roboflow Supervision](https://www.marktechpost.com/2025/08/03/building-an-end-to-end-object-tracking-and-analytics-system-with-roboflow-supervision/)
- [GitHub Discussion #950 — trackers/](https://github.com/roboflow/supervision/discussions/950)
- [Roboflow Blog — Build Computer Vision Applications Faster with Supervision](https://blog.roboflow.com/supervision/)
- [Supervision Cheatsheet](https://roboflow.github.io/cheatsheet-supervision/)

**同類工具**

- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)
- [facebookresearch/detectron2](https://github.com/facebookresearch/detectron2)
- [obss/sahi](https://github.com/obss/sahi)
- [roboflow/inference](https://github.com/roboflow/inference)
- [roboflow/trackers](https://trackers.roboflow.com/latest/)
- [autodistill/autodistill](https://github.com/autodistill/autodistill)
- [roboflow/maestro](https://github.com/roboflow/maestro)
- [open-mmlab/mmdetection](https://github.com/open-mmlab/mmdetection)

## 更新紀錄
