
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageCaptured: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageCaptured }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageCaptured(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div 
        onClick={triggerUpload}
        className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${
          preview ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-white hover:border-emerald-400 hover:bg-emerald-50'
        }`}
        style={{ minHeight: '300px' }}
      >
        {preview ? (
          <div className="w-full flex flex-col items-center">
            <img src={preview} alt="Leaf Preview" className="max-h-64 rounded-xl shadow-md mb-4 object-cover w-full" />
            <p className="text-emerald-700 font-medium">Tap to change image</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-emerald-100 p-4 rounded-full inline-block mb-4">
              <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Capture or Upload Leaf</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Take a clear photo of the affected leaf for the best results</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
