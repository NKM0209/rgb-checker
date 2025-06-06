### 📑 MVP 開発タスクリスト（Step-by-Step）

**対象リポジトリ**: `rgb-checker`  
**前提**: Next.js 14（App Router）+ TypeScript + Tailwind + Chart.js + Jest/Playwright  
**粒度**: _1 – 3 h で完了し、単独でテスト可能な最小単位_

| #                      | タスク名                                                                       | 完了条件（検証方法）                            |
| ---------------------- | -------------------------------------------------------------------------- | ------------------------------------- |
| **0. プロジェクト初期化**       |                                                                            |                                       |
| 0-1                    | GitHub Repo 作成 & `main`,`dev` ブランチ生成                                       | GitHub 上で両ブランチ確認                      |
| 0-2                    | `pnpm create next-app --ts` で scaffold                                     | `pnpm dev` で初期ページ表示                   |
| 0-3                    | `tailwindcss` & `postcss` & `autoprefixer` 導入                              | `class="bg-red-500"` が反映される           |
| 0-4                    | CI (GitHub Actions) で **lint→type-check→test** ワークフロー雛形追加                  | `dev` へ PR → 全ジョブ成功                   |
| **1. コーディング規約・共通基盤**   |                                                                            |                                       |
| 1-1                    | ESLint + Prettier + `eslint-plugin-react` + `eslint-plugin-tailwindcss` 設定 | `pnpm lint` がエラー 0                    |
| 1-2                    | `tsconfig.json` strict モード有効化                                              | `pnpm tsc` エラー 0                      |
| 1-3                    | `jest` + `@testing-library/react` 初期設定                                     | 空テスト `pass`                           |
| 1-4                    | Storybook 追加（UI 試験用）                                                       | `pnpm storybook` で起動確認                |
| **2. UI スケルトン**        |                                                                            |                                       |
| 2-1                    | `app/layout.tsx` に共通ヘッダー & フッター実装                                          | Storybook でレンダリングOK                   |
| 2-2                    | `Dropzone.tsx` 雛形（クリックで file input を開く）                                    | Storybook: ファイル選択ダイアログが開く             |
| 2-3                    | `ImagePreview.tsx` 雛形（props: File → ObjectURL）                             | unit test: `<img>` src が生成される         |
| 2-4                    | `ResultBanner.tsx` 雛形（props: status）                                       | Storybook Controls で３色切替              |
| 2-5                    | `HistogramChart.tsx` 雛形（空データ描画）                                            | Jest snapshot test パス                 |
| 2-6                    | `HelpModal.tsx` 雛形（開閉トグル）                                                  | Playwright: Esc で閉じる                  |
| **3. ドメインロジック層**       |                                                                            |                                       |
| 3-1                    | `lib/imageUtils.ts` - loadImage → Canvas 描画関数                              | Jest: 100×100 PNG で width=100 取得      |
| 3-2                    | `lib/colorAnalysis.ts` に `analyzeRGB` 実装                                   | 16×16 単色画像で status='Alert' 期待値一致      |
| 3-3                    | RGB ヒストグラム生成ユーティリティ追加                                                      | 単色画像 → ヒストグラム分布をスナップショット比較            |
| **4. UI ⇄ ロジック統合**     |                                                                            |                                       |
| 4-1                    | `Dropzone` 内でファイル選択→`ImagePreview` 表示接続                                    | Playwright: ドラッグ&ドロップ E2E             |
| 4-2                    | 選択画像を Off-screen Canvas へ渡し `getImageData()` 呼び出し                          | unit test: spy で関数呼出確認                |
| 4-3                    | `analyzeRGB` 結果を `ResultBanner` にバインド                                      | Storybook interaction test            |
| 4-4                    | ヒストグラム配列を `HistogramChart` に渡し描画                                           | Playwright: SVG bar 数 = 256×3         |
| **5. UX & 例外処理**       |                                                                            |                                       |
| 5-1                    | 解析中ローディングスピナー追加                                                            | Playwright: 500 ms 以上画像解析で spinner 表示 |
| 5-2                    | 画像サイズ > 10 MP 時に自動リサイズ処理                                                   | unit test: ~12 MP→リサイズ後 2048px 以下     |
| 5-3                    | 20 MB 超ファイルのアップロード拒否                                                       | Hand-rolled test: alert 表示            |
| **6. アクセシビリティ & i18n** |                                                                            |                                       |
| 6-1                    | ARIA 属性/role 付与＆キーボードナビ確認                                                  | Lighthouse a11y スコア 95+               |
| 6-2                    | 文言を `src/locales/ja.json` へ抽出                                              | Storybook: Language knob 反映           |
| **7. テスト拡充**           |                                                                            |                                       |
| 7-1                    | コンポーネント単体カバレッジ 90 % 以上                                                     | `pnpm coverage` レポート閾値達成              |
| 7-2                    | 主要ユースケース E2E (アップ→解析→再アップ)                                                 | Playwright CI job green               |
| **8. デプロイ & QA**       |                                                                            |                                       |
| 8-1                    | `vercel.json`（環境変数・CSP など）設定                                               | Preview URL が 200 応答                  |
| 8-2                    | `main` マージ → Production 自動デプロイ                                             | `https://rgb-checker.vercel.app` 動作確認 |
| **9. ドキュメント**          |                                                                            |                                       |
| 9-1                    | `README.md` – セットアップ／開発手順／CI 説明                                            | Markdown lint pass                    |
| 9-2                    | `CONTRIBUTING.md` – ブランチ規約 & PR テンプレ                                       | ファイル存在 & CI で表示                       |
| 9-3                    | `architecture.md`・`Dataflow.md` 更新履歴追記                                     | diff で日付更新を確認                         |
| **10. リリース判定**         |                                                                            |                                       |
| 10-1                   | QA チェックリスト実行（ブラウザ/デバイス矩形網羅）                                                | Notion チェックリスト 100 % ✓                |
| 10-2                   | v0.1 タグ付け & GitHub Release ノート生成                                           | Release ページ公開                         |