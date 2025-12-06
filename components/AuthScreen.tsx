import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Lock } from 'lucide-react';

const AuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const [handle, setHandle] = useState('CYBER_WEAVER');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 relative font-display">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 z-20">
            {/* Form Section */}
            <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-white tracking-tight">// TERMINAL_ACCESS //</h2>
                    <p className="text-zinc-500">Identify yourself, stitcher.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 mt-8">
                    <div className="space-y-2">
                        <label className="text-primary text-sm font-bold tracking-widest">&gt; USER_HANDLE:</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-zinc-700 py-3 text-xl text-white focus:outline-none focus:border-primary transition-colors placeholder-zinc-700"
                                placeholder="_"
                            />
                            <Fingerprint className="absolute right-0 top-3 text-zinc-600" size={24} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-primary text-sm font-bold tracking-widest">&gt; ACCESS_KEY:</label>
                         <div className="relative">
                            <input 
                                type="password" 
                                defaultValue="password123"
                                className="w-full bg-transparent border-b-2 border-zinc-700 py-3 text-xl text-white focus:outline-none focus:border-primary transition-colors"
                            />
                            <Lock className="absolute right-0 top-3 text-zinc-600" size={24} />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            disabled={loading}
                            className="w-full bg-primary hover:bg-green-400 text-background-dark font-bold py-4 px-6 rounded-none tracking-widest text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="animate-pulse">SYNCING_THREADS...</span>
                            ) : (
                                <span>[ AUTHENTICATE ]</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Visual Section */}
            <div className="hidden lg:flex flex-col items-center justify-center space-y-4">
                <p className="text-primary text-sm tracking-widest w-full text-left">&gt; GLITCH SIGIL PREVIEW:</p>
                <div className="w-full aspect-square border-2 border-zinc-800 bg-background-dark p-2 relative overflow-hidden group">
                     {/* Generative Art Placeholder */}
                     <div 
                        className="w-full h-full bg-cover bg-center opacity-80 mix-blend-screen transition-all duration-500 group-hover:scale-105 group-hover:contrast-125"
                        style={{ 
                            backgroundImage: `url('https://picsum.photos/800/800?grayscale')`,
                            filter: 'sepia(1) hue-rotate(90deg) saturate(3)'
                        }}
                     ></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                     
                     {/* Overlay Grid */}
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                     <div className="absolute top-4 right-4 text-xs text-primary font-mono border border-primary px-2 py-1">
                        SIG_VERIFIED
                     </div>
                </div>
                <p className="text-zinc-600 text-xs font-mono w-full text-center">
                    Unique identifier generated from biometric resonance.
                </p>
            </div>
        </div>
    </div>
  );
};

export default AuthScreen;
