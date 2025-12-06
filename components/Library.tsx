import React from 'react';
import { PATTERN_LIBRARY } from '../constants';
import { Search } from 'lucide-react';

const Library: React.FC = () => {
  return (
    <div className="h-full w-full p-6 md:p-12 overflow-y-auto flex justify-center">
        <div className="max-w-5xl w-full flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-6 border-b border-zinc-800">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">PATTERN_LIBRARY</h1>
                    <p className="text-zinc-500">A curated archive of recovered logic-circuits.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <input 
                        type="text" 
                        placeholder="Search patterns..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 pl-10 text-sm text-white focus:border-primary focus:outline-none"
                    />
                    <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PATTERN_LIBRARY.map((pattern, i) => (
                    <div key={i} className="group border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 hover:border-primary/50 transition-all p-0 overflow-hidden flex flex-col">
                        <div className="aspect-video bg-black relative overflow-hidden">
                             {/* Abstract Visual representation of logic gate */}
                             <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className={`w-16 h-16 border-2 border-white rounded-full flex items-center justify-center`}>
                                    <div className="w-2 h-full bg-white rotate-45"></div>
                                    <div className="h-2 w-full bg-white rotate-45"></div>
                                </div>
                             </div>
                             <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-[10px] text-primary border border-primary/30 font-mono">
                                COST: {pattern.cost}
                             </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{pattern.name}</h3>
                            <p className="text-zinc-400 text-sm mb-4 flex-1">{pattern.desc}</p>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-white/5 text-xs font-mono text-zinc-500">
                                <span>DELAY: {pattern.delay}ms</span>
                                <button className="text-white hover:text-secondary hover:underline">[ COPY_CODE ]</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Library;
