import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Maximize2, X } from 'lucide-react';
import { MemeText } from '../types';

interface TextOverlayProps {
  text: MemeText;
  onMouseDown: (textId: string, e: React.MouseEvent | React.TouchEvent, action: 'drag' | 'resize' | 'rotate') => void;
  onTouchStart: (textId: string, e: React.TouchEvent, action: 'drag' | 'resize' | 'rotate') => void;
  onDelete: (textId: string) => void;
  onUpdate: (textId: string, updates: Partial<MemeText>) => void;
  showControls?: boolean;
  isMobile?: boolean;
}

export function TextOverlay({
  text,
  onMouseDown,
  onTouchStart,
  onDelete,
  onUpdate,
  showControls = true,
  isMobile = false
}: TextOverlayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (isEditing && textRef.current) {
      const width = textRef.current.getBoundingClientRect().width;
      setInputWidth(Math.max(100, width + 20));
    }
  }, [isEditing, text.content]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    onMouseDown(text.id, e, 'drag');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    onTouchStart(text.id, e, 'drag');
  };

  const handleControlAction = (e: React.MouseEvent | React.TouchEvent, action: 'resize' | 'rotate') => {
    if ('touches' in e) {
      onTouchStart(text.id, e, action);
    } else {
      onMouseDown(text.id, e, action);
    }
  };

  const handleDoubleClick = () => {
    if (!showControls || isMobile) return;
    setIsEditing(true);
  };

  const handleBlur = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsEditing(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      setIsEditing(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(text.id, { content: e.target.value });
  };

  const textStyles = {
    color: text.style.color,
    fontSize: `${text.style.fontSize}px`,
    fontFamily: text.style.fontFamily,
    fontStyle: text.style.italic ? 'italic' : 'normal',
    textDecoration: [
      text.style.underline ? 'underline' : '',
      text.style.lineThrough ? 'line-through' : ''
    ].filter(Boolean).join(' '),
    WebkitTextStroke: `${text.style.strokeWidth}px ${text.style.strokeColor}`,
    textShadow: isMobile ? '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' : 'none',
  };

  return (
    <div
      className="absolute touch-none"
      style={{
        transform: `translate(${text.position.x}px, ${text.position.y}px) rotate(${text.rotation}deg) scale(${text.scale})`,
        transformOrigin: 'center',
      }}
    >
      <div className="relative group">
        {/* Text Content */}
        <div
          ref={textRef}
          className={`select-none whitespace-nowrap ${isEditing ? 'invisible absolute' : ''}`}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          style={textStyles}
        >
          {text.content}
        </div>

        {/* Text Input for Desktop Only */}
        {!isMobile && isEditing && (
          <input
            ref={inputRef}
            type="text"
            value={text.content}
            onChange={handleTextChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-b-2 border-white/50 focus:border-white focus:outline-none px-2 py-1 rounded"
            style={{
              ...textStyles,
              width: `${inputWidth}px`,
              minWidth: '150px',
            }}
            autoFocus
          />
        )}

        {/* Controls */}
        {showControls && (
          <>
            {/* Style Controls - Desktop Only */}
            {!isMobile && (
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-2 rounded-lg shadow-lg">
                <input
                  type="color"
                  value={text.style.color}
                  onChange={(e) => onUpdate(text.id, { style: { ...text.style, color: e.target.value } })}
                  className="w-10 h-10 p-0 border-2 border-white/20 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Delete Button */}
            <button
              className="absolute -top-2 -right-8 p-3 bg-red-500 rounded-full hover:bg-red-600 active:scale-95 transition-all shadow-lg"
              onClick={() => onDelete(text.id)}
              onTouchEnd={(e) => {
                e.preventDefault();
                onDelete(text.id);
              }}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Resize Handle - Bottom Left */}
            <div 
              className="absolute -bottom-2 -left-8 w-10 h-10 cursor-sw-resize"
              onMouseDown={(e) => handleControlAction(e, 'resize')}
              onTouchStart={(e) => handleControlAction(e, 'resize')}
            >
              <div className="absolute inset-0 bg-blue-500 rounded-full hover:bg-blue-600 active:scale-95 transition-all shadow-lg flex items-center justify-center">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Rotate Handle - Centered Bottom */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-14 flex flex-col items-center">
              <div className="w-px h-6 border-l-2 border-dotted border-green-500"></div>
              <button
                className="p-3 bg-green-500 rounded-full hover:bg-green-600 active:scale-95 transition-all shadow-lg"
                onMouseDown={(e) => handleControlAction(e, 'rotate')}
                onTouchStart={(e) => handleControlAction(e, 'rotate')}
              >
                <RotateCw className="w-5 h-5 text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}