import React, { useState } from 'react';

export function Hero() {
  const [copied, setCopied] = useState(false);
  const contractAddress = '6bPSZBFcRd62SYqC84vPFRFBD3pN37WAmsrmwvUepump';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(contractAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }

      const textArea = document.createElement('textarea');
      textArea.value = contractAddress;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        textArea.remove();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        textArea.remove();
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="bg-[#67399B] py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative w-48 md:w-56 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8712E] to-transparent opacity-50 rounded-xl"></div>
          <img 
            src="https://i.imgur.com/ZvW1pC3.png"
            alt="BABA meme" 
            className="w-full relative z-10 rounded-xl shadow-xl"
          />
        </div>
        <h1 className="font-erica text-6xl md:text-8xl mb-3 text-[#F9DB0E] drop-shadow-lg">$BABA</h1>
        <p className="text-xl md:text-2xl mb-2 text-white font-erica">is on the road to billions</p>
        <p className="text-xl md:text-2xl mb-6 text-[#F9DB0E] font-erica">#TheTiaraStaysOn</p>
        <button 
          onClick={handleCopy}
          className="bg-black/20 p-3 rounded-lg inline-block max-w-full overflow-hidden hover:bg-black/30 transition-all relative group"
        >
          <p className="text-sm md:text-base text-[#48B7CD]">
            Contract Address:{' '}
            <span className="font-mono text-xs md:text-sm break-all select-all">
              {contractAddress}
            </span>
          </p>
          <span 
            className={`absolute inset-0 flex items-center justify-center bg-black/60 text-[#F9DB0E] text-sm font-bold transition-opacity ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Copied!
          </span>
          <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-[#F9DB0E] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Click to copy
          </span>
        </button>
      </div>
    </section>
  );
}