import React, { useState, useEffect } from 'react';
import { CellType, GridCell } from '../types';
import { Play, RotateCw, Trash2, Eraser, Info, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Mock Grid Size
const GRID_W = 12;
const GRID_H = 12;

const Loom: React.FC = () => {
  const [grid, setGrid] = useState<GridCell[]>([]);
  const [selectedTool, setSelectedTool] = useState<CellType>(CellType.WIRE);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);

  // Initialize Grid
  useEffect(() => {
    const newGrid: GridCell[] = [];
    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        newGrid.push({
          x,
          y,
          type: CellType.EMPTY,
          rotation: 0,
          locked: false
        });
      }
    }
    // Mock Locked Cells (The "Corrupted" parts)
    const lockIndices = [15, 16, 28, 45, 88, 89, 90];
    lockIndices.forEach(idx => {
        if(newGrid[idx]) {
            newGrid[idx].type = CellType.BLOCKER;
            newGrid[idx].locked = true;
        }
    });

    setGrid(newGrid);
  }, []);

  const handleCellClick = (index: number) => {
    if (isPlaying) return;
    const cell = grid[index];
    if (cell.locked) return;

    const newGrid = [...grid];
    
    // Logic: If same tool, rotate. If different, replace.
    if (cell.type === selectedTool && cell.type !== CellType.EMPTY) {
        newGrid[index].rotation = (newGrid[index].rotation + 90) % 360;
    } else {
        newGrid[index].type = selectedTool;
        newGrid[index].rotation = 0;
    }
    setGrid(newGrid);
  };

  const handleAiAssist = async () => {
    if (!process.env.API_KEY) {
        setAiHint("AI_MODULE_OFFLINE: API Key missing.");
        return;
    }
    
    setAiHint("ANALYZING_PATTERN...");
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a helper for a logic puzzle game called VOID_STITCH. 
            The user is stuck on a level with 12x12 grid. 
            The objective is to route a signal from left to right avoiding corruption blocks.
            Give a cryptic, cyberpunk-themed one-sentence hint about using "Cross-Stitch" (AND gates) effectively.`,
        });
        setAiHint(`> ORACLE_RESPONSE: ${response.text.trim()}`);
    } catch (e) {
        setAiHint("> ERROR: CONNECTION_REFUSED");
    }
  };

  const handleSimulate = () => {
    setIsPlaying(true);
    // Mock Simulation delay
    setTimeout(() => {
        setIsPlaying(false);
        setIsSolving(true); // Show success modal or something
    }, 3000);
  };

  return (
    <div className="flex h-full w-full bg-background-dark font-mono overflow-hidden">
      
      {/* Sidebar: Tools */}
      <div className="w-20 border-r border-white/10 bg-black/30 backdrop-blur flex flex-col items-center py-6 gap-6 z-10">
        <div className="w-12 h-12 flex items-center justify-center mb-4">
            <RotateCw className="text-zinc-600 animate-spin-slow" />
        </div>
        
        {[
            { id: CellType.WIRE, icon: '─', label: 'WIRE' },
            { id: CellType.CROSS_STITCH, icon: '┼', label: 'AND' },
            { id: CellType.KNOT, icon: '○', label: 'NOT' },
            { id: CellType.EMPTY, icon: <Eraser size={20}/>, label: 'DEL' },
        ].map((tool) => (
            <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`w-12 h-12 rounded border flex flex-col items-center justify-center transition-all ${
                    selectedTool === tool.id 
                    ? 'border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(13,242,13,0.3)]' 
                    : 'border-zinc-700 bg-zinc-900/50 text-zinc-500 hover:border-zinc-500'
                }`}
            >
                <span className="text-xl font-bold">{tool.icon}</span>
            </button>
        ))}
        
        <div className="mt-auto">
             <button 
                onClick={() => setGrid(grid.map(c => c.locked ? c : { ...c, type: CellType.EMPTY, rotation: 0 }))}
                className="w-12 h-12 text-red-500 hover:bg-red-500/10 rounded flex items-center justify-center transition-colors"
            >
                <Trash2 size={20} />
             </button>
        </div>
      </div>

      {/* Main Area: Grid */}
      <div className="flex-1 relative flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-zinc-950/80">
            <div className="flex items-center gap-4">
                <span className="text-zinc-500 tracking-widest text-xs">INPUT_STREAM:</span>
                <div className="flex gap-1">
                    {[1,0,1,1,0].map((bit, i) => (
                        <div key={i} className={`w-3 h-3 rounded-sm ${bit ? 'bg-secondary shadow-[0_0_8px_cyan]' : 'bg-zinc-800'}`}></div>
                    ))}
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                 <button 
                    onClick={handleAiAssist}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-secondary border border-secondary/30 hover:bg-secondary/10 transition-colors"
                >
                    <Sparkles size={14} />
                    ORACLE_HINT
                </button>
            </div>
        </div>
        
        {/* Hint Display */}
        {aiHint && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-black/80 border border-secondary/50 text-secondary px-6 py-3 rounded text-sm max-w-lg backdrop-blur text-center animate-pulse">
                {aiHint}
            </div>
        )}

        {/* The Grid */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px]">
            <div 
                className="grid gap-1 relative p-4 border-2 border-zinc-800 bg-zinc-950/80 shadow-2xl"
                style={{ 
                    gridTemplateColumns: `repeat(${GRID_W}, minmax(0, 1fr))`,
                    width: 'fit-content'
                }}
            >
                {grid.map((cell, index) => (
                    <div
                        key={`${cell.x}-${cell.y}`}
                        onClick={() => handleCellClick(index)}
                        className={`
                            w-10 h-10 md:w-12 md:h-12 border border-zinc-800/50 flex items-center justify-center cursor-pointer transition-colors relative
                            ${cell.type === CellType.BLOCKER ? 'bg-zinc-900 pattern-diagonal-lines opacity-50 cursor-not-allowed' : 'hover:bg-zinc-900'}
                            ${cell.type !== CellType.EMPTY && cell.type !== CellType.BLOCKER ? 'bg-zinc-900' : ''}
                        `}
                    >
                         {/* Cell Content */}
                         {cell.type === CellType.WIRE && (
                             <div className="w-full h-1 bg-zinc-500" style={{ transform: `rotate(${cell.rotation}deg)` }}></div>
                         )}
                         {cell.type === CellType.CROSS_STITCH && (
                             <div className="relative w-full h-full flex items-center justify-center" style={{ transform: `rotate(${cell.rotation}deg)` }}>
                                 <div className="absolute w-full h-1 bg-primary shadow-[0_0_5px_rgba(13,242,13,0.5)]"></div>
                                 <div className="absolute h-full w-1 bg-primary shadow-[0_0_5px_rgba(13,242,13,0.5)]"></div>
                             </div>
                         )}
                         {cell.type === CellType.KNOT && (
                             <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-transparent" style={{ transform: `rotate(${cell.rotation}deg)` }}></div>
                         )}
                         {cell.type === CellType.BLOCKER && (
                             <div className="text-zinc-700 text-xs select-none">///</div>
                         )}

                         {/* Sim Packet */}
                         {isPlaying && Math.random() > 0.95 && (
                             <div className="absolute w-2 h-2 bg-white rounded-full animate-ping"></div>
                         )}
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* Right Panel: Controls */}
      <div className="w-64 border-l border-white/10 bg-black/30 backdrop-blur flex flex-col p-6 z-10">
         <div className="mb-8">
            <h3 className="text-xs tracking-widest text-zinc-500 mb-2">TARGET_PATTERN</h3>
            <div className="p-4 border border-white/10 bg-zinc-900/50 flex justify-center gap-2">
                 {[1,1,0,1].map((bit, i) => (
                    <div key={i} className={`w-6 h-6 border-2 flex items-center justify-center font-bold text-sm ${bit ? 'border-secondary text-secondary' : 'border-zinc-700 text-zinc-700'}`}>
                        {bit}
                    </div>
                ))}
            </div>
         </div>

         <div className="mt-auto space-y-4">
             <div className="space-y-2">
                 <div className="flex justify-between text-xs text-zinc-400">
                     <span>THREAD_EFFICIENCY</span>
                     <span>82%</span>
                 </div>
                 <div className="h-1 w-full bg-zinc-800">
                     <div className="h-full bg-yellow-500 w-[82%]"></div>
                 </div>
             </div>
             
             <button 
                onClick={handleSimulate}
                disabled={isPlaying}
                className={`w-full py-4 font-bold text-lg tracking-widest border-2 transition-all flex items-center justify-center gap-2
                    ${isPlaying ? 'border-zinc-700 text-zinc-700' : 'border-secondary text-secondary hover:bg-secondary hover:text-black'}
                `}
             >
                {isPlaying ? 'COMPILING...' : '[ WEAVE_THREAD ]'}
             </button>
         </div>
      </div>
      
      {/* Success Modal (Simple Overlay) */}
      {isSolving && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="bg-zinc-900 border border-primary p-8 max-w-md w-full text-center space-y-6 shadow-[0_0_50px_rgba(13,242,13,0.2)]">
                <h2 className="text-3xl text-primary font-black tracking-widest">PATTERN_RESOLVED</h2>
                <div className="w-full h-40 bg-zinc-800 relative overflow-hidden group">
                     <img src="https://picsum.photos/400/200" alt="Healed" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-white font-bold tracking-widest border-2 border-white px-4 py-1">RESTORED</span>
                     </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setIsSolving(false)} className="flex-1 py-3 bg-zinc-800 text-zinc-400 hover:text-white">REPLAY</button>
                    <button onClick={() => window.location.hash = '#/dashboard'} className="flex-1 py-3 bg-primary text-black font-bold hover:bg-white">NEXT_SEGMENT</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Loom;
