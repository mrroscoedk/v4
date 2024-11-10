import React from 'react';

export function Footer() {
  return (
    <footer className="relative bg-[#67399B]/40 mt-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-8">
        {/* Decorative Image */}
        <div className="absolute right-0 bottom-0 w-32 md:w-48 opacity-30 pointer-events-none transform translate-x-1/4">
          <img 
            src="https://i.imgur.com/ZvW1pC3.png"
            alt="BABA decorative"
            className="w-full h-auto"
          />
        </div>

        {/* Lore Section */}
        <div className="relative z-10 max-w-2xl">
          <h3 className="font-erica text-2xl text-[#F9DB0E] mb-4">The Legend of BABA</h3>
          <p className="text-white/80 leading-relaxed mb-16">
            In the mystical realm of Solana, there emerged a peculiar figure known as BABA. 
            Adorned with an ever-present tiara that seemed to defy gravity, BABA's presence 
            became legendary among the meme coins. Some say the tiara holds magical powers, 
            others claim it's simply too stubborn to fall off. But one thing remains certain - 
            #TheTiaraStaysOn, through bull markets and bear markets alike.
          </p>
        </div>

        {/* Copyright */}
        <div className="relative z-10 text-center text-sm text-white/60 pt-8 border-t border-white/10">
          All rights reserved. This page is only for fun and educational purposes
        </div>
      </div>
    </footer>
  );
}