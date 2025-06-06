export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          画像のRGBバランスをチェック
        </h2>
        <p className="text-lg text-gray-600">
          JPEG/PNG画像をアップロードして、色バランスの偏りを確認しましょう
        </p>
      </div>
      
      {/* Tailwind CSS テスト用の赤い背景 */}
      <div className="bg-red-500 text-white p-4 rounded-lg mb-8 text-center">
        <p className="font-bold">Tailwind CSS テスト: この背景が赤色なら正常に動作しています</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* アップロード領域 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">画像アップロード</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <div className="space-y-4">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  画像をドラッグ&ドロップ
                </p>
                <p className="text-sm text-gray-500">
                  または <span className="text-blue-600 underline cursor-pointer">ファイルを選択</span>
                </p>
              </div>
              <p className="text-xs text-gray-400">
                JPEG, PNG (最大20MB)
              </p>
            </div>
          </div>
        </div>

        {/* 結果表示領域 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">解析結果</h3>
          <div className="text-center text-gray-500 py-8">
            <p>画像をアップロードすると、ここに結果が表示されます</p>
          </div>
        </div>
      </div>
    </div>
  )
} 