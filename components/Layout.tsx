import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Terminal, Map, User, Grid3X3, Database, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isBoot = location.pathname === '/' || location.pathname === '/auth';

  if (isBoot) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-background-dark font-mono text-zinc-300">
        <div className="absolute inset-0 scanlines z-50 opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] animate-flicker bg-white mix-blend-overlay"></div>
        {children}
      </div>
    );
  }

  const navItems = [
    { path: '/dashboard', label: 'WORKSTATION', icon: Terminal },
    { path: '/loom', label: 'LOOM', icon: Grid3X3 },
    { path: '/map', label: 'GLOBAL_TAPESTRY', icon: Map },
    { path: '/library', label: 'LIBRARY', icon: Database },
    { path: '/profile', label: 'PROFILE', icon: User },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background-dark font-mono text-zinc-300 flex flex-col">
       <div className="absolute inset-0 scanlines z-50 opacity-10 pointer-events-none"></div>
       
       {/* Header */}
       <header className="flex-shrink-0 h-14 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 z-40">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-primary">
              <Terminal size={20} />
              <span className="font-bold tracking-tight text-white">VOID_STITCH</span>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold tracking-wider transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <item.icon size={14} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
         </div>
         <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                 <span className="text-xs text-primary font-bold">NODE_09_ONLINE</span>
             </div>
             <Link to="/" className="text-zinc-600 hover:text-red-500 transition-colors">
               <LogOut size={18} />
             </Link>
         </div>
       </header>

       {/* Main Content */}
       <main className="flex-1 overflow-hidden relative">
         {children}
       </main>
    </div>
  );
};

export default Layout;
