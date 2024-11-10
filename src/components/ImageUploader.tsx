import React, { ChangeEvent } from 'react';

interface ImageUploaderProps {
  onImageUpload: (image: string) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onImageUpload(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-white mb-2 block">Upload Background Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-white bg-[#48B7CD]/20 rounded-lg p-3 border-2 border-[#48B7CD] cursor-pointer hover:bg-[#48B7CD]/30 transition-colors"
        />
      </label>
    </div>
  );
}