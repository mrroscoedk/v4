import React from 'react';
import { RotateCw, Maximize2, FlipHorizontal2, FlipVertical2, X } from 'lucide-react';
import { MemeState } from '../types';

interface MemeOverlayProps {
  meme: MemeState;
  onMouseDown: (memeId: string, e: React.MouseEvent | React.TouchEvent, action: 'drag' | 'resize' | 'rotate') => void;
  onTouchStart: (memeId: string, e: React.TouchEvent, action: 'drag' | 'resize' | 'rotate') => void;
  onFlip: (memeId: string, axis: 'x' | 'y') => void;
  onDelete: (memeId: string) => void;
  showControls?: boolean;
}

export function MemeOverlay({ 
  meme, 
  onMouseDown, 
  onTouchStart, 
  onFlip, 
  onDelete,
  showControls = true 
}: MemeOverlayProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFlip = (e: React.MouseEvent | React.TouchEvent, axis: 'x' | 'y') => {
    e.preventDefault();
    e.stopPropagation();
    onFlip(meme.id, axis);
  };

  return (
    <div
      className="absolute cursor-move touch-none"
      style={{
        transform: `translate(${meme.position.x}px, ${meme.position.y}px) rotate(${meme.rotation}deg) scale(${meme.scale})`,
        transformOrigin: 'center',
      }}
    >
      <div className="relative">
        {/* Image container with flip transformation */}
        <div
          style={{
            transform: `scale(${meme.flipX ? -1 : 1}, ${meme.flipY ? -1 : 1})`,
            transformOrigin: 'center',
          }}
        >
          <img
            src="https://i.imgur.com/ZvW1pC3.png"
            alt="Meme"
            className="w-32 h-32 object-contain select-none"
            onMouseDown={(e) => onMouseDown(meme.id, e, 'drag')}
            onTouchStart={(e) => onTouchStart(meme.id, e, 'drag')}
            onDragStart={handleDragStart}
            draggable={false}
            crossOrigin="anonymous"
          />
        </div>
        
        {showControls && (
          <>
            {/* Delete button - top right */}
            <button
              className="control-button absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              onClick={() => onDelete(meme.id)}
              onTouchEnd={() => onDelete(meme.id)}
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Flip vertical - top left */}
            <button
              className="control-button absolute -top-2 -left-2 p-1 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
              onClick={(e) => handleFlip(e, 'y')}
              onTouchEnd={(e) => handleFlip(e, 'y')}
            >
              <FlipVertical2 className="w-4 h-4 text-white" />
            </button>

            {/* Resize handle - bottom left */}
            <div 
              className="control-button absolute -bottom-2 -left-2 w-6 h-6 cursor-se-resize"
              onMouseDown={(e) => onMouseDown(meme.id, e, 'resize')}
              onTouchStart={(e) => onTouchStart(meme.id, e, 'resize')}
            >
              <div className="absolute inset-0 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Flip horizontal - bottom right */}
            <button
              className="control-button absolute -bottom-2 -right-2 p-1 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
              onClick={(e) => handleFlip(e, 'x')}
              onTouchEnd={(e) => handleFlip(e, 'x')}
            >
              <FlipHorizontal2 className="w-4 h-4 text-white" />
            </button>

            {/* Rotate button with centered dotted line connector */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 flex flex-col items-center">
              <div className="w-px h-6 border-l-2 border-dotted border-green-500"></div>
              <button
                className="control-button p-1.5 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                onMouseDown={(e) => onMouseDown(meme.id, e, 'rotate')}
                onTouchStart={(e) => onTouchStart(meme.id, e, 'rotate')}
              >
                <RotateCw className="w-4 h-4 text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}