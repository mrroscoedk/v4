import { useState } from 'react';
import { MemeState, Position, MemeText, TextStyle } from '../types';

const defaultTextStyle: TextStyle = {
  fontSize: 32,
  color: '#FFFFFF',
  fontFamily: 'Impact, system-ui',
  italic: false,
  underline: false,
  lineThrough: false,
  strokeWidth: 2,
  strokeColor: '#000000',
};

export function useMemeState() {
  const [memes, setMemes] = useState<MemeState[]>([createNewMeme()]);

  function createNewMeme(): MemeState {
    return {
      id: Math.random().toString(36).substr(2, 9),
      position: { x: 100, y: 100 },
      scale: 1,
      rotation: 0,
      isDragging: false,
      isResizing: false,
      isRotating: false,
      dragStart: { x: 0, y: 0 },
      dragOffset: { x: 0, y: 0 },
      flipX: false,
      flipY: false,
      texts: [],
      initialRotation: 0,
    };
  }

  function createNewText(memeId: string, isMobile = false): MemeText {
    return {
      id: Math.random().toString(36).substr(2, 9),
      content: isMobile ? 'Edit text below' : 'DOUBLE CLICK TO EDIT',
      position: { x: 100, y: 100 },
      rotation: 0,
      scale: 1,
      style: { 
        ...defaultTextStyle,
        strokeWidth: isMobile ? 1 : 2,
      },
      isDragging: false,
      isRotating: false,
      isResizing: false,
      dragStart: { x: 0, y: 0 },
      dragOffset: { x: 0, y: 0 },
      initialRotation: 0,
    };
  }

  const calculateAngle = (center: Position, point: Position) => {
    return Math.atan2(point.y - center.y, point.x - center.x) * (180 / Math.PI);
  };

  const handleMouseDown = (itemId: string, e: React.MouseEvent | React.TouchEvent, action: 'drag' | 'resize' | 'rotate') => {
    const coords = getEventCoordinates(e);
    setMemes(prevMemes => prevMemes.map(meme => {
      // Check if this meme or any of its texts are being interacted with
      const isTargetMeme = meme.id === itemId;
      const hasTargetText = meme.texts.some(text => text.id === itemId);

      if (!isTargetMeme && !hasTargetText) {
        // Reset all states for non-target memes
        return {
          ...meme,
          isDragging: false,
          isResizing: false,
          isRotating: false,
          texts: meme.texts.map(text => ({
            ...text,
            isDragging: false,
            isResizing: false,
            isRotating: false
          }))
        };
      }

      if (hasTargetText) {
        return {
          ...meme,
          texts: meme.texts.map(text => {
            if (text.id !== itemId) return text;

            let updates: Partial<MemeText> = {
              isDragging: action === 'drag',
              isResizing: action === 'resize',
              isRotating: action === 'rotate',
              dragStart: coords,
            };

            if (action === 'rotate') {
              const centerX = text.position.x;
              const centerY = text.position.y;
              const startAngle = calculateAngle({ x: centerX, y: centerY }, coords);
              updates = {
                ...updates,
                initialRotation: text.rotation - startAngle,
              };
            }

            return { ...text, ...updates };
          })
        };
      }

      // Handle meme interaction
      let updates: Partial<MemeState> = {
        isDragging: action === 'drag',
        isResizing: action === 'resize',
        isRotating: action === 'rotate',
        dragStart: coords,
      };

      if (action === 'rotate') {
        const centerX = meme.position.x + 50;
        const centerY = meme.position.y + 50;
        const startAngle = calculateAngle({ x: centerX, y: centerY }, coords);
        updates = {
          ...updates,
          initialRotation: meme.rotation - startAngle,
        };
      }

      return { ...meme, ...updates };
    }));
  };

  const getEventCoordinates = (e: React.MouseEvent | React.TouchEvent): Position => {
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
    return {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const coords = getEventCoordinates(e);
    setMemes(prevMemes => prevMemes.map(meme => {
      const updatedTexts = meme.texts.map(text => {
        if (!text.isDragging && !text.isResizing && !text.isRotating) return text;

        const deltaX = coords.x - text.dragStart.x;
        const deltaY = coords.y - text.dragStart.y;

        if (text.isDragging) {
          return {
            ...text,
            position: {
              x: text.position.x + deltaX,
              y: text.position.y + deltaY
            },
            dragStart: coords
          };
        }

        if (text.isResizing) {
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
          const scaleFactor = deltaX > 0 ? 1 + distance / 200 : 1 - distance / 200;
          const newScale = Math.max(0.2, Math.min(3, text.scale * scaleFactor));
          
          return {
            ...text,
            scale: newScale,
            style: {
              ...text.style,
              fontSize: Math.round(32 * newScale),
              strokeWidth: text.style.strokeWidth
            },
            dragStart: coords
          };
        }

        if (text.isRotating) {
          const centerX = text.position.x;
          const centerY = text.position.y;
          const currentAngle = calculateAngle({ x: centerX, y: centerY }, coords);
          return {
            ...text,
            rotation: text.initialRotation + currentAngle,
            dragStart: coords
          };
        }

        return text;
      });

      if (!meme.isDragging && !meme.isResizing && !meme.isRotating) {
        return { ...meme, texts: updatedTexts };
      }

      const deltaX = coords.x - meme.dragStart.x;
      const deltaY = coords.y - meme.dragStart.y;

      if (meme.isDragging) {
        return {
          ...meme,
          position: {
            x: meme.position.x + deltaX,
            y: meme.position.y + deltaY
          },
          dragStart: coords,
          texts: updatedTexts
        };
      }

      if (meme.isResizing) {
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const scaleFactor = deltaX > 0 ? 1 + distance / 200 : 1 - distance / 200;
        return {
          ...meme,
          scale: Math.max(0.2, Math.min(3, meme.scale * scaleFactor)),
          dragStart: coords,
          texts: updatedTexts
        };
      }

      if (meme.isRotating) {
        const centerX = meme.position.x + 50;
        const centerY = meme.position.y + 50;
        const currentAngle = calculateAngle({ x: centerX, y: centerY }, coords);
        return {
          ...meme,
          rotation: meme.initialRotation + currentAngle,
          dragStart: coords,
          texts: updatedTexts
        };
      }

      return { ...meme, texts: updatedTexts };
    }));
  };

  const handleMouseUp = () => {
    setMemes(prevMemes => prevMemes.map(meme => ({
      ...meme,
      isDragging: false,
      isResizing: false,
      isRotating: false,
      texts: meme.texts.map(text => ({
        ...text,
        isDragging: false,
        isResizing: false,
        isRotating: false
      }))
    })));
  };

  const toggleFlip = (memeId: string, direction: 'x' | 'y') => {
    setMemes(prevMemes => prevMemes.map(meme => {
      if (meme.id !== memeId) return meme;
      return {
        ...meme,
        flipX: direction === 'x' ? !meme.flipX : meme.flipX,
        flipY: direction === 'y' ? !meme.flipY : meme.flipY
      };
    }));
  };

  const addMeme = () => {
    setMemes(prevMemes => [...prevMemes, createNewMeme()]);
  };

  const deleteMeme = (memeId: string) => {
    setMemes(prevMemes => prevMemes.filter(meme => meme.id !== memeId));
  };

  const addText = (memeId: string, isMobile = false) => {
    setMemes(prevMemes => prevMemes.map(meme => {
      if (meme.id !== memeId) return meme;
      return {
        ...meme,
        texts: [...meme.texts, createNewText(memeId, isMobile)]
      };
    }));
  };

  const updateText = (memeId: string, textId: string, updates: Partial<MemeText>) => {
    setMemes(prevMemes => prevMemes.map(meme => {
      if (meme.id !== memeId) return meme;
      return {
        ...meme,
        texts: meme.texts.map(text => 
          text.id === textId ? { ...text, ...updates } : text
        )
      };
    }));
  };

  const deleteText = (memeId: string, textId: string) => {
    setMemes(prevMemes => prevMemes.map(meme => {
      if (meme.id !== memeId) return meme;
      return {
        ...meme,
        texts: meme.texts.filter(text => text.id !== textId)
      };
    }));
  };

  return {
    memes,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    toggleFlip,
    addMeme,
    deleteMeme,
    addText,
    updateText,
    deleteText
  };
}