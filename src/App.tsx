import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Roadmap } from './components/Roadmap';
import { MemeGenerator } from './components/MemeGenerator';
import { SocialLinks } from './components/SocialLinks';
import { Footer } from './components/Footer';
import { useMemeState } from './hooks/useMemeState';

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const { 
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
  } = useMemeState();

  const handleDownload = async () => {
    const { default: html2canvas } = await import('html2canvas');
    const element = document.querySelector('.meme-canvas') as HTMLElement;
    
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
        onclone: (doc) => {
          const controls = doc.querySelectorAll('.control-button');
          controls.forEach(control => (control as HTMLElement).style.display = 'none');
        }
      });

      const link = document.createElement('a');
      link.download = 'baba-meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download meme:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <SocialLinks />
      <Roadmap />
      <div id="meme-generator">
        <MemeGenerator
          backgroundImage={backgroundImage}
          memes={memes}
          onImageUpload={setBackgroundImage}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onFlip={toggleFlip}
          onDelete={deleteMeme}
          onAddMeme={addMeme}
          onAddText={addText}
          onUpdateText={updateText}
          onDeleteText={deleteText}
          onDownload={handleDownload}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;