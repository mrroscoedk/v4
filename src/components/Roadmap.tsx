import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface RoadmapItem {
  title: string;
  completed: boolean;
}

export function Roadmap() {
  const milestones: RoadmapItem[] = [
    { title: '100 HOLDERS', completed: true },
    { title: '100.000 USD MCAP', completed: true },
    { title: '250 HOLDERS', completed: true },
    { title: '100 TELEGRAM MEMBERS', completed: true },
    { title: 'BABA MEME GENERATOR', completed: true },
    { title: '500 HOLDERS', completed: false },
    { title: '500.000 USD MCAP', completed: false },
    { title: '1000 HOLDERS', completed: false },
    { title: '1 MILLION MCAP', completed: false },
    { title: 'MEME GENERATOR PRODUCT WITH $BABA ADS', completed: false },
    { title: 'NEW BABALISTIC ROADMAP', completed: false },
  ];

  return (
    <section className="pt-16 pb-16 px-4 bg-[#67399B]/60 relative">
      <div className="max-w-4xl mx-auto">
        {/* Decorative Image */}
        <div className="relative w-full max-w-[16rem] mx-auto mb-8">
          <img 
            src="https://i.imgur.com/t5og02a.jpeg"
            alt="BABA in a red convertible with a tiara" 
            className="w-full rounded-xl shadow-xl border-4 border-[#F8712E]"
          />
        </div>

        {/* Section Title with Decorative Elements */}
        <div className="relative mb-16 text-center">
          <h2 className="font-erica text-4xl text-[#F9DB0E] inline-block relative">
            Road(map) to billions
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F8712E] to-transparent"></div>
          </h2>
        </div>
        
        <div className="relative">
          {/* Road Background with Animated Gradient */}
          <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8712E] via-[#F9DB0E] to-[#48B7CD] animate-pulse"></div>
          </div>
          
          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.title}
                className={`relative pl-16 transform transition-all duration-300 hover:translate-x-2 ${
                  milestone.completed ? 'opacity-100' : 'opacity-80'
                }`}
              >
                {/* Milestone Connector Stick */}
                <div className="absolute left-[33px] top-1/2 -translate-y-1/2">
                  <div 
                    className={`h-0.5 w-8 ${
                      milestone.completed ? 'bg-[#F8712E]' : 'bg-[#48B7CD]'
                    }`}
                  />
                </div>
                
                {/* Milestone Content with Enhanced Styling */}
                <div 
                  className={`p-4 rounded-lg backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                    milestone.completed 
                      ? 'bg-[#F8712E]/20 border-2 border-[#F8712E] hover:bg-[#F8712E]/30' 
                      : 'bg-[#48B7CD]/20 border-2 border-[#48B7CD] hover:bg-[#48B7CD]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-erica text-xl">
                      {milestone.completed ? (
                        <span className="text-[#F8712E] drop-shadow-md">{milestone.title}</span>
                      ) : (
                        <span className="text-[#48B7CD] drop-shadow-md">{milestone.title}</span>
                      )}
                    </h3>
                    {milestone.completed && (
                      <CheckCircle2 className="w-5 h-5 text-[#F8712E] ml-4 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}