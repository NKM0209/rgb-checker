rgb-checker/
├── app/                    # App Router のルート
│   ├── page.tsx           # メイン画面（アップロード／解析UI）
│   └── layout.tsx         # 全体レイアウト（ヘッダー、フッター）
│
├── components/            # 再利用可能なUIコンポーネント
│   ├── Dropzone.tsx       # 画像アップロード領域
│   ├── ImagePreview.tsx   # サムネイル表示
│   ├── HistogramChart.tsx # Chart.jsによるヒストグラム
│   ├── ResultBanner.tsx   # 判定結果バナー表示
│   └── HelpModal.tsx      # 使い方モーダル
│
├── lib/                   # ドメインロジック（解析系処理）
│   ├── imageUtils.ts      # 画像読込、Canvas描画、getImageData
│   └── colorAnalysis.ts   # RGB平均・偏り判定ロジック
│
├── public/                # 公開ファイル（favicon等）
│
├── styles/                # TailwindベースCSS設定
│   └── globals.css
│
├── tests/                 # 単体テストおよびE2Eテスト
│   ├── components/        # 各コンポーネント単体テスト
│   └── e2e/               # PlaywrightによるE2Eテスト
│
├── .eslintrc.json         # Lintルール設定
├── tailwind.config.js     # Tailwindカスタマイズ
├── tsconfig.json          # TypeScript設定
├── vercel.json            # Vercel設定
└── README.md              # プロジェクト概要
