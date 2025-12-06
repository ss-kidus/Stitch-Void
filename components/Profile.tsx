import React from 'react';
import { User, Activity, Award, Grid } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="h-full w-full p-6 md:p-12 overflow-y-auto flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* ID Card */}
            <div className="md:col-span-1 border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col items-center text-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                
                <div className="w-32 h-32 border-2 border-primary p-1 relative group">
                    <img 
                        src="https://picsum.photos/200" 
                        alt="Avatar" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black px-2 text-primary text-xs font-bold border border-primary">
                        LEVEL 04
                    </div>
                </div>
                
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-widest mb-1">CYBER_WEAVER</h1>
                    <p className="text-zinc-500 text-xs">CLASS: LOGIC_MENDER</p>
                    <p className="text-zinc-600 text-[10px] mt-2">ID: 884-299-X9</p>
                </div>

                <div className="w-full pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Reputation</span>
                        <span className="text-primary">EXALTED</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Joined</span>
                        <span className="text-zinc-300">CYCLE 2024</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 p-6 border border-white/5 hover:border-secondary/50 transition-colors">
                        <Activity className="text-secondary mb-2" size={20} />
                        <p className="text-xs text-zinc-500 uppercase">Avg Efficiency</p>
                        <p className="text-3xl font-bold text-white mt-1">92.7%</p>
                    </div>
                    <div className="bg-zinc-900/50 p-6 border border-white/5 hover:border-primary/50 transition-colors">
                        <Grid className="text-primary mb-2" size={20} />
                        <p className="text-xs text-zinc-500 uppercase">Data Healed</p>
                        <p className="text-3xl font-bold text-white mt-1">1.21 TB</p>
                    </div>
                </div>

                {/* Badges / Library */}
                <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6">
                    <h3 className="text-sm font-bold text-zinc-400 mb-4 flex items-center gap-2">
                        <Award size={16} /> ACQUIRED_LOGIC_FRAGMENTS
                    </h3>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {[
                            { name: 'XOR_GATE', unlocked: true },
                            { name: 'AND_WEAVE', unlocked: true },
                            { name: 'INV_KNOT', unlocked: true },
                            { name: 'BUF_LATCH', unlocked: true },
                            { name: 'MUX_2X1', unlocked: false },
                            { name: 'ALU_CORE', unlocked: false },
                        ].map((badge, i) => (
                            <div 
                                key={i} 
                                className={`aspect-square border flex flex-col items-center justify-center p-2 text-center gap-2 transition-all ${
                                    badge.unlocked 
                                    ? 'border-zinc-700 bg-zinc-800/50 text-zinc-300' 
                                    : 'border-zinc-900 bg-black/50 text-zinc-700 opacity-50'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-full border-2 ${badge.unlocked ? 'border-primary' : 'border-zinc-800'}`}></div>
                                <span className="text-[10px] font-mono leading-tight">{badge.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Profile;
