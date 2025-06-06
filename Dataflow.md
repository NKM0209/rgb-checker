[User Upload]
     ↓
<Dropzone.tsx>
     ↓
<Image drawn to off-screen Canvas>
     ↓
<imageUtils.ts> getImageData()
     ↓
<colorAnalysis.ts> 平均値算出 → 偏り判定
     ↓
<HistogramChart.tsx> 可視化（Chart.js）
<ResultBanner.tsx> 結果表示
