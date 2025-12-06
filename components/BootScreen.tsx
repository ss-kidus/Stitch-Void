import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BootScreen: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const fullText = "> CONNECTING TO THE NOISE... [ESTABLISHED]";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4 relative">
       {/* Background Image with Overlay */}
       <div 
         className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
         style={{ backgroundImage: `url('https://picsum.photos/1920/1080?grayscale&blur=2')` }}
       ></div>
       <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark/90 to-background-dark z-10"></div>

       <div className="z-20 flex flex-col items-center max-w-2xl w-full text-center space-y-8">
          <h1 className="text-primary text-3xl md:text-5xl font-black tracking-tighter text-glow-green min-h-[60px]">
            {text}<span className="animate-pulse">_</span>
          </h1>
          
          <div className="p-6 border border-white/10 bg-black/40 backdrop-blur-sm rounded-lg max-w-lg">
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-display">
              VOID_STITCH is a logic-puzzle interface where Digital Paleontology meets Cybernetics. 
              Delve into corrupted data voids, healing fractured information using textile-inspired logic gates.
            </p>
          </div>

          <button 
            onClick={() => navigate('/auth')}
            className="group relative px-8 py-3 bg-primary text-background-dark font-bold text-lg tracking-widest overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 group-hover:text-black">[ ENTER_VOID ]</span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
       </div>
    </div>
  );
};

export default BootScreen;
