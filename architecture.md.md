# 📐 RGBバランスチェッカー – System Architecture

**バージョン**: v0.1（MVP）  
**最終更新日**: 2025-06-06  
**対象**: 開発者、デザイナー、QA、プロジェクトマネージャー

---

## 🧭 概要

本システムは、ユーザーがアップロードしたJPEG/PNG画像を、ブラウザ上のCanvas APIを用いて解析し、RGBの色バランスを可視化・判定するアプリケーションである。プライバシー重視・処理軽量・インフラレスを前提に、Next.js（App Router）をフル活用し、Vercel上にデプロイする構成とする。

---

## 🔧 技術スタック

|レイヤー|技術|備考|
|---|---|---|
|UIフレームワーク|Next.js 14（App Router）|TypeScript/React 18 対応、ファイルベースルーティング|
|UIライブラリ|Tailwind CSS|ユーティリティクラスでシンプルに構築|
|画像解析|HTML5 Canvas API|`getImageData()` でピクセルRGBA取得|
|グラフ描画|Chart.js v4|RGBヒストグラム・平均値可視化|
|デプロイ先|Vercel|Serverless, CDN対応、GitHub連携|
|テスト|Jest, React Testing Library, Playwright|単体〜E2Eまで|
|型チェック|TypeScript strictモード|高信頼性コード設計|

---

## 🗂️ ディレクトリ構成（初期構築）

csharp

コピーする編集する

`rgb-checker/ ├── app/                    # App Router のルート │   ├── page.tsx           # メイン画面（アップロード／解析UI） │   └── layout.tsx         # 全体レイアウト（ヘッダー、フッター） │ ├── components/            # 再利用可能なUIコンポーネント │   ├── Dropzone.tsx       # 画像アップロード領域 │   ├── ImagePreview.tsx   # サムネイル表示 │   ├── HistogramChart.tsx # Chart.jsによるヒストグラム │   ├── ResultBanner.tsx   # 判定結果バナー表示 │   └── HelpModal.tsx      # 使い方モーダル │ ├── lib/                   # ドメインロジック（解析系処理） │   ├── imageUtils.ts      # 画像読込、Canvas描画、getImageData │   └── colorAnalysis.ts   # RGB平均・偏り判定ロジック │ ├── public/                # 公開ファイル（favicon等） │ ├── styles/                # TailwindベースCSS設定 │   └── globals.css │ ├── tests/                 # 単体テストおよびE2Eテスト │   ├── components/        # 各コンポーネント単体テスト │   └── e2e/               # PlaywrightによるE2Eテスト │ ├── .eslintrc.json         # Lintルール設定 ├── tailwind.config.js     # Tailwindカスタマイズ ├── tsconfig.json          # TypeScript設定 ├── vercel.json            # Vercel設定 └── README.md              # プロジェクト概要`

---

## 🔁 処理フロー（データの流れ）

plaintext

コピーする編集する

`[User Upload]      ↓ <Dropzone.tsx>      ↓ <Image drawn to off-screen Canvas>      ↓ <imageUtils.ts> getImageData()      ↓ <colorAnalysis.ts> 平均値算出 → 偏り判定      ↓ <HistogramChart.tsx> 可視化（Chart.js） <ResultBanner.tsx> 結果表示`

---

## 📈 判定ロジック概要

ts

コピーする編集する

`function analyzeRGB(data: Uint8ClampedArray) {   const [rTotal, gTotal, bTotal] = [0, 0, 0];   const length = data.length / 4;   for (let i = 0; i < data.length; i += 4) {     rTotal += data[i];     // Red     gTotal += data[i + 1]; // Green     bTotal += data[i + 2]; // Blue   }   const rAvg = rTotal / length;   const gAvg = gTotal / length;   const bAvg = bTotal / length;   const deviation = Math.max(     Math.abs(rAvg - gAvg),     Math.abs(rAvg - bAvg),     Math.abs(gAvg - bAvg)   );   return {     rAvg, gAvg, bAvg,     deviation,     status:       deviation < 10 ? "OK" :       deviation < 20 ? "Warning" : "Alert"   }; }`

---

## 🌐 デプロイ戦略

- **Vercel連携（GitHubと自動連携）**
    
    - `main` ブランチ → production
        
    - `dev` ブランチ → preview deployment
        
- `.vercelignore` で不要ファイル除外
    

---

## 🔐 セキュリティ設計

|項目|実装方針|
|---|---|
|ユーザー画像の非送信|画像処理はすべてクライアント上で完結。ネットワーク送信なし。|
|CSP|Vercelのデフォルト＋必要に応じて `Content-Security-Policy` を設定|
|依存管理|`npm audit`を毎CIで実行し脆弱性を検出・警告|

---

## ⚠️ 将来的な拡張方針（v0.2以降）

- Web Workerを活用したCanvas処理の非同期化
    
- Lab色空間での分析（色相ズレ検出）
    
- PDFレポート出力機能（解析結果保存）
    
- UIの英語対応
    
- RAW (DNG, CR2) 対応 via WebAssembly（long-term）