
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { generateCartoonImage } from './services/geminiService';
import { CartoonStyle, CARTOON_STYLES } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<CartoonStyle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setGeneratedImageUrl(null);
    setError(null);
  }, []);

  const handleStyleChange = useCallback((style: CartoonStyle) => {
    setSelectedStyle(style);
  }, []);

  const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const mimeType = result.split(';')[0].split(':')[1];
        const base64 = result.split(',')[1];
        resolve({ base64, mimeType });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerate = async () => {
    if (!originalImage || !selectedStyle) {
      setError("يرجى تحميل صورة واختيار نمط أولاً.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const generatedBase64 = await generateCartoonImage(base64, mimeType, selectedStyle.prompt);
      setGeneratedImageUrl(`data:image/jpeg;base64,${generatedBase64}`);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء إنشاء الصورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col space-y-6">
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-3">الخطوة 1: تحميل الصورة</h2>
              <ImageUploader onImageUpload={handleImageUpload} imageUrl={originalImageUrl} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-3">الخطوة 2: اختيار النمط</h2>
              <StyleSelector 
                styles={CARTOON_STYLES}
                selectedStyle={selectedStyle} 
                onStyleChange={handleStyleChange} 
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!originalImage || !selectedStyle || isLoading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>جاري التحويل...</span>
                </>
              ) : (
                '✨ تحويل الصورة'
              )}
            </button>
            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 self-start">النتيجة</h2>
            <ImageDisplay 
              imageUrl={generatedImageUrl} 
              isLoading={isLoading} 
              title="النسخة الكرتونية" 
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
