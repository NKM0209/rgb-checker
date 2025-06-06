/**
 * 画像解析のためのユーティリティ関数
 */

export interface ImageData {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export interface RGBPixel {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * ファイルから画像を読み込み、Canvas要素を作成する
 */
export const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('画像の読み込みに失敗しました'));
    };

    img.src = url;
  });
};

/**
 * 画像をCanvasに描画し、ImageDataを取得する
 */
export const getImageDataFromImage = (img: HTMLImageElement): ImageData => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D contextの取得に失敗しました');
  }

  // Canvasのサイズを画像に合わせる
  canvas.width = img.width;
  canvas.height = img.height;

  // 画像をCanvasに描画
  ctx.drawImage(img, 0, 0);

  // ピクセルデータを取得
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return {
    width: canvas.width,
    height: canvas.height,
    data: imageData.data
  };
};

/**
 * ImageDataから指定座標のRGBピクセル値を取得する
 */
export const getPixelAt = (imageData: ImageData, x: number, y: number): RGBPixel => {
  const { width, data } = imageData;
  const index = (y * width + x) * 4;

  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
    a: data[index + 3]
  };
};

/**
 * ImageDataから全ピクセルのRGB値を配列として取得する
 */
export const getAllPixels = (imageData: ImageData): RGBPixel[] => {
  const pixels: RGBPixel[] = [];
  const { width, height, data } = imageData;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      pixels.push({
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3]
      });
    }
  }

  return pixels;
};

/**
 * 画像を指定サイズにリサイズしてImageDataを取得する（パフォーマンス向上のため）
 */
export const getResizedImageData = (img: HTMLImageElement, maxWidth: number = 800, maxHeight: number = 600): ImageData => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D contextの取得に失敗しました');
  }

  // アスペクト比を保持してリサイズ
  const aspectRatio = img.width / img.height;
  let newWidth = img.width;
  let newHeight = img.height;

  if (newWidth > maxWidth) {
    newWidth = maxWidth;
    newHeight = newWidth / aspectRatio;
  }

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = newHeight * aspectRatio;
  }

  canvas.width = Math.floor(newWidth);
  canvas.height = Math.floor(newHeight);

  // 高品質なリサイズのための設定
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 画像をリサイズして描画
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // ピクセルデータを取得
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return {
    width: canvas.width,
    height: canvas.height,
    data: imageData.data
  };
};

/**
 * ファイルから画像データを取得する（メイン関数）
 */
export const analyzeImageFile = async (file: File, resize: boolean = true): Promise<ImageData> => {
  try {
    // 画像を読み込み
    const img = await loadImageFromFile(file);

    // ImageDataを取得（リサイズオプション付き）
    const imageData = resize 
      ? getResizedImageData(img) 
      : getImageDataFromImage(img);

    return imageData;
  } catch (error) {
    throw new Error(`画像解析に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
}; 