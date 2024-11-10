import React, { useState, useEffect } from 'react';
import { Canvas } from './Canvas';
import { ImageUploader } from './ImageUploader';
import { MemeState } from '../types';
import { Plus, Eye, EyeOff, Type } from 'lucide-react';

interface MemeGeneratorProps {
  backgroundImage: string;
  memes: MemeState[];
  onImageUpload: (image: string) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseDown: (itemId: string, e: React.MouseEvent, action: 'drag' | 'resize' | 'rotate') => void;
  onFlip: (memeId: string, axis: 'x' | 'y') => void;
  onDelete: (memeId: string) => void;
  onAddMeme: () => void;
  onAddText: (memeId: string, isMobile?: boolean) => void;
  onUpdateText: (memeId: string, textId: string, updates: any) => void;
  onDeleteText: (memeId: string, textId: string) => void;
  onDownload: () => void;
}

export function MemeGenerator({
  backgroundImage,
  memes,
  onImageUpload,
  onMouseMove,
  onMouseUp,
  onMouseDown,
  onFlip,
  onDelete,
  onAddMeme,
  onAddText,
  onUpdateText,
  onDeleteText,
  onDownload,
}: MemeGeneratorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTextChange = (memeId: string, textId: string, value: string) => {
    onUpdateText(memeId, textId, { content: value });
  };

  const handleAddText = () => {
    onAddText(memes[0].id, isMobile);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="font-erica text-4xl mb-4 text-center text-[#F9DB0E]">Meme Generator</h2>
      <p className="text-center mb-8 text-white/80">
        Want to use this on your own project?{' '}
        <span className="text-[#F9DB0E]">
          Get it for free with $baba ads shown{' '}
          <span className="bg-[#E33B40] text-white text-sm px-2 py-1 rounded-full ml-2">
            Coming Soon
          </span>
        </span>
      </p>
      <ImageUploader onImageUpload={onImageUpload} />
      <div className="mt-6">
        <Canvas
          backgroundImage={backgroundImage}
          memes={memes}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
          onFlip={onFlip}
          onDelete={onDelete}
          onUpdateText={onUpdateText}
          onDeleteText={onDeleteText}
          showControls={!isPreview}
          isMobile={isMobile}
        />
      </div>

      {/* Mobile Text Inputs */}
      {isMobile && !isPreview && backgroundImage && memes[0]?.texts.length > 0 && (
        <div className="mt-4 space-y-3">
          {memes[0].texts.map((text, index) => (
            <div 
              key={text.id}
              className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm">Text {index + 1}:</label>
                <input
                  type="text"
                  value={text.content}
                  onChange={(e) => handleTextChange(memes[0].id, text.id, e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#48B7CD] transition-colors"
                  placeholder={`Enter text ${index + 1} here...`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4">
        <button
          onClick={onAddMeme}
          className="px-6 py-2 bg-[#48B7CD] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
          disabled={!backgroundImage}
        >
          <Plus className="w-4 h-4" />
          Add Meme
        </button>
        {memes.length > 0 && (
          <button
            onClick={handleAddText}
            className="px-6 py-2 bg-[#F8712E] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
            disabled={!backgroundImage}
          >
            <Type className="w-4 h-4" />
            Add Text
          </button>
        )}
        <button
          onClick={() => setIsPreview(!isPreview)}
          className={`px-6 py-2 ${
            isPreview ? 'bg-[#F8712E]' : 'bg-[#67399B]'
          } text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2`}
          disabled={!backgroundImage}
        >
          {isPreview ? (
            <>
              <EyeOff className="w-4 h-4" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Preview
            </>
          )}
        </button>
        <button
          onClick={onDownload}
          className="px-6 py-2 bg-[#67399B] text-white rounded-lg hover:bg-opacity-90 transition-colors"
          disabled={!backgroundImage}
        >
          Download Meme
        </button>
      </div>
    </section>
  );
}