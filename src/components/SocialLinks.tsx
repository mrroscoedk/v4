import React from 'react';
import { Twitter, MessageCircle, TrendingUp, Palette } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`py-8 px-4 ${className}`}>
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a 
            href="https://x.com/babatheofficial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            <Twitter className="w-5 h-5 text-[#48B7CD] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Twitter</span>
          </a>
          <a 
            href="https://t.me/babacto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            <MessageCircle className="w-5 h-5 text-[#F8712E] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Telegram</span>
          </a>
          <a 
            href="https://dexscreener.com/solana/b4zric7fzjbazwoh4yxeurwnxqnizrsxlvwtzvvhmvke" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            <TrendingUp className="w-5 h-5 text-[#E33B40] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Chart</span>
          </a>
          <a 
            href="#meme-generator"
            className="group flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            <Palette className="w-5 h-5 text-[#F9DB0E] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Create Meme</span>
          </a>
        </div>
      </div>
    </div>
  );
}