'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setUploadedFile(file);
    
    // TODO: ここで画像解析処理を実装
    console.log('アップロードされたファイル:', file.name, file.size, file.type);
    
    // 仮の処理時間
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* アップロード領域 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">画像アップロード</h3>
          <ImageUpload 
            onImageUpload={handleImageUpload} 
            isLoading={isAnalyzing}
          />
          
          {/* アップロードされたファイル情報 */}
          {uploadedFile && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">アップロード済み画像</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">ファイル名:</span> {uploadedFile.name}</p>
                <p><span className="font-medium">サイズ:</span> {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <p><span className="font-medium">形式:</span> {uploadedFile.type}</p>
              </div>
            </div>
          )}
        </div>

        {/* 解析結果領域 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">RGB解析結果</h3>
          
          {!uploadedFile && (
            <div className="text-center py-12 text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                />
              </svg>
              <p>画像をアップロードすると解析結果が表示されます</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">RGB解析を実行中...</p>
            </div>
          )}

          {uploadedFile && !isAnalyzing && (
            <div className="space-y-4">
              <div className="text-center text-gray-600">
                <p>解析機能は次のタスクで実装予定です</p>
                <p className="text-sm mt-2">現在のタスク: ImageUpload コンポーネント完了 ✅</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 