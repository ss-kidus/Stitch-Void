import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_QUEUE } from '../constants';
import { Lock, FileWarning, Play, Cpu } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full p-6 grid grid-cols-12 gap-6 overflow-y-auto">
      
      {/* Left Col: Status */}
      <div className="col-span-12 md:col-span-3 flex flex-col h-full gap-6">
         <div className="flex-1 border border-white/10 bg-black/20 backdrop-blur-md p-4 flex flex-col">
            <h2 className="text-xs tracking-[0.2em] text-zinc-500 mb-4 font-bold border-b border-white/5 pb-2">SYSTEM_STATUS</h2>
            <div className="flex-grow space-y-3 text-xs md:text-sm font-mono leading-relaxed">
                <p className="text-primary">&gt; CONNECTED TO NODE_09</p>
                <p className="text-zinc-400">&gt; AUTHENTICATING STITCHER_ID...</p>
                <p className="text-zinc-400">&gt; ACCESS GRANTED.</p>
                <p className="text-primary">&gt; SYNCING REALM_STATE...</p>
                <p className="text-secondary">&gt; BIOMETRICS: STABLE</p>
                <p className="text-zinc-400">&gt; FETCHING CORRUPTED FRAGMENTS...</p>
                <p className="text-zinc-400">&gt; QUEUE POPULATED: 5 ITEMS</p>
                <p className="text-primary animate-pulse">&gt; SYSTEM READY.</p>
            </div>
         </div>
         
         <div className="h-40 border border-white/10 bg-black/20 backdrop-blur-md p-4 flex flex-col justify-between">
            <h2 className="text-xs tracking-[0.2em] text-zinc-500 font-bold">DAILY_GOAL</h2>
            <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-white">2/5</span>
                <span className="text-xs text-zinc-400 mb-1">PATCHES WOVEN</span>
            </div>
            <div className="w-full bg-zinc-800 h-1 mt-2">
                <div className="bg-primary h-full w-[40%]"></div>
            </div>
         </div>
      </div>

      {/* Center Col: Main Preview */}
      <div className="col-span-12 md:col-span-6 flex flex-col h-full">
         <div className="w-full h-full border border-white/10 bg-black/40 backdrop-blur-md p-1 flex flex-col relative group">
             {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

             <div className="flex-grow relative overflow-hidden bg-zinc-900 m-4 border border-zinc-800">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
                    style={{ 
                        backgroundImage: `url('https://picsum.photos/600/400?grayscale&blur=2')`,
                        filter: 'contrast(1.2) brightness(0.8)'
                    }}
                ></div>
                {/* Glitch Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-black/40">
                    <FileWarning size={64} className="text-zinc-400 opacity-50" />
                    <p className="text-zinc-300 tracking-[0.3em] text-sm animate-pulse">SIGNAL_CORRUPTED</p>
                </div>
             </div>

             <div className="p-6 pt-0 flex justify-between items-end">
                <div className="space-y-1">
                    <p className="text-zinc-400 text-xs">FILE_ID: <span className="text-white">882_CAT.JPG</span></p>
                    <p className="text-zinc-400 text-xs">DAMAGE_LEVEL: <span className="text-red-500 font-bold">CRITICAL (84%)</span></p>
                </div>
                <button 
                    onClick={() => navigate('/loom')}
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold text-sm hover:bg-secondary hover:text-black transition-colors tracking-wider"
                >
                    <Play size={16} fill="currentColor" />
                    [ INITIALIZE_STITCH ]
                </button>
             </div>
         </div>
      </div>

      {/* Right Col: Queue */}
      <div className="col-span-12 md:col-span-3 flex flex-col h-full">
        <div className="w-full h-full border border-white/10 bg-black/20 backdrop-blur-md p-0 flex flex-col">
            <h2 className="text-xs tracking-[0.2em] text-zinc-500 m-4 mb-2 font-bold">THE_QUEUE</h2>
            <div className="flex-grow overflow-y-auto custom-scrollbar">
                {MOCK_QUEUE.map((item) => (
                    <div 
                        key={item.id}
                        className={`p-4 border-b border-white/5 flex items-center gap-4 transition-colors ${
                            item.status === 'LOCKED' 
                                ? 'opacity-50 cursor-not-allowed bg-black/20' 
                                : 'hover:bg-white/5 cursor-pointer bg-black/40'
                        }`}
                    >
                        <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center border border-white/10">
                            {item.status === 'LOCKED' ? <Lock size={16} className="text-zinc-500" /> : <Cpu size={18} className="text-secondary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-zinc-200 truncate">{item.name}</h4>
                            <p className="text-[10px] text-zinc-500 mt-0.5 flex justify-between">
                                <span>{item.status}</span>
                                {item.status !== 'LOCKED' && <span className="text-red-400">{item.damage} DMG</span>}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
