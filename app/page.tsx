'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import { analyzeImageFile, ImageData } from '@/lib/imageAnalysis';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setUploadedFile(file);
    setAnalysisError(null);
    setImageData(null);
    
    try {
      console.log('画像解析開始:', file.name, file.size, file.type);
      
      // Canvas APIを使用して画像データを取得
      const data = await analyzeImageFile(file, true);
      setImageData(data);
      
      console.log('画像解析完了:', {
        width: data.width,
        height: data.height,
        totalPixels: data.width * data.height,
        dataSize: data.data.length
      });
      
    } catch (error) {
      console.error('画像解析エラー:', error);
      setAnalysisError(error instanceof Error ? error.message : '画像解析に失敗しました');
    } finally {
      setIsAnalyzing(false);
    }
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

          {analysisError && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {analysisError}
              </div>
            </div>
          )}

          {imageData && !isAnalyzing && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">✅ 画像データ取得完了</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p><span className="font-medium">解像度:</span> {imageData.width} × {imageData.height}</p>
                  <p><span className="font-medium">総ピクセル数:</span> {(imageData.width * imageData.height).toLocaleString()}</p>
                  <p><span className="font-medium">データサイズ:</span> {(imageData.data.length / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              
              <div className="text-center text-gray-600">
                <p className="text-sm">✅ タスク1-2: Canvas API で画像読み込み & ピクセルデータ取得 完了</p>
                <p className="text-sm mt-1">次のタスク: RGB統計計算の実装</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 