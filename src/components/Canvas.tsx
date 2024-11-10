import React, { useRef } from 'react';
import { MemeOverlay } from './MemeOverlay';
import { TextOverlay } from './TextOverlay';
import { MemeState } from '../types';

interface CanvasProps {
  backgroundImage: string;
  memes: MemeState[];
  onMouseMove: (e: React.MouseEvent | React.TouchEvent) => void;
  onMouseUp: () => void;
  onMouseDown: (itemId: string, e: React.MouseEvent | React.TouchEvent, action: 'drag' | 'resize' | 'rotate') => void;
  onFlip: (memeId: string, axis: 'x' | 'y') => void;
  onDelete: (memeId: string) => void;
  onUpdateText: (memeId: string, textId: string, updates: any) => void;
  onDeleteText: (memeId: string, textId: string) => void;
  showControls?: boolean;
  onTextSelect?: (memeId: string, textId: string) => void;
  isMobile?: boolean;
}

export function Canvas({ 
  backgroundImage,
  memes, 
  onMouseMove, 
  onMouseUp, 
  onMouseDown,
  onFlip,
  onDelete,
  onUpdateText,
  onDeleteText,
  showControls = true,
  onTextSelect,
  isMobile = false
}: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (itemId: string, e: React.TouchEvent, action: 'drag' | 'resize' | 'rotate') => {
    e.preventDefault();
    onMouseDown(itemId, e, action);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    onMouseMove(e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    onMouseUp();
  };

  return (
    <div
      ref={containerRef}
      className="meme-canvas relative w-full bg-gray-800 rounded-lg overflow-hidden touch-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {backgroundImage ? (
        <div className="relative">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-auto block"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0">
            {memes.map(meme => (
              <div key={meme.id}>
                <MemeOverlay 
                  meme={meme}
                  onMouseDown={onMouseDown}
                  onTouchStart={handleTouchStart}
                  onFlip={onFlip}
                  onDelete={onDelete}
                  showControls={showControls}
                />
                {meme.texts.map(text => (
                  <TextOverlay
                    key={text.id}
                    text={text}
                    onMouseDown={onMouseDown}
                    onTouchStart={handleTouchStart}
                    onDelete={(textId) => onDeleteText(meme.id, textId)}
                    onUpdate={(textId, updates) => onUpdateText(meme.id, textId, updates)}
                    showControls={showControls}
                    onTextSelect={onTextSelect ? (textId) => onTextSelect(meme.id, textId) : undefined}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="aspect-video flex items-center justify-center text-gray-500">
          Upload an image to start creating your meme
        </div>
      )}
    </div>
  );
}