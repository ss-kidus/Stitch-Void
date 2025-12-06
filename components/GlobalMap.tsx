import React from 'react';
import { MapPin } from 'lucide-react';

const GlobalMap: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-background-dark overflow-hidden">
        {/* Background Map Image */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ 
                backgroundImage: `url('https://cdn.simplemaps.com/static/demos/resources/svg-library/svgs/world.svg')`,
                filter: 'invert(1) hue-rotate(180deg) brightness(0.5)' 
            }}
        ></div>
        
        {/* Overlay Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* UI Overlay */}
        <div className="absolute top-6 left-6 p-6 border border-white/10 bg-black/60 backdrop-blur-md max-w-sm w-full">
            <h2 className="text-white font-bold text-lg mb-4">GLOBAL_TAPESTRY_STATUS</h2>
            
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                        <span>RESTORATION_PROGRESS</span>
                        <span className="text-primary font-bold">78.4%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary w-[78.4%] relative">
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-zinc-900/50 p-3 border-l-2 border-primary">
                        <p className="text-[10px] text-zinc-500 uppercase">Active Stitchers</p>
                        <p className="text-xl font-bold text-white">1,337,420</p>
                    </div>
                    <div className="bg-zinc-900/50 p-3 border-l-2 border-secondary">
                         <p className="text-[10px] text-zinc-500 uppercase">Sectors Healed</p>
                         <p className="text-xl font-bold text-white">2,187</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Floating Pins (Mock Data) */}
        {[
            { x: '20%', y: '30%' }, { x: '45%', y: '40%' }, { x: '70%', y: '25%' }, { x: '60%', y: '60%' }
        ].map((pos, i) => (
            <div 
                key={i}
                className="absolute text-primary"
                style={{ left: pos.x, top: pos.y }}
            >
                <div className="relative">
                    <MapPin size={24} fill="currentColor" className="text-primary drop-shadow-[0_0_10px_rgba(13,242,13,0.8)]" />
                    <div className="absolute -inset-2 bg-primary rounded-full opacity-20 animate-ping"></div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default GlobalMap;
