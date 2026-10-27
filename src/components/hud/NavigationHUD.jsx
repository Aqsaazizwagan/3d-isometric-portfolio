import React, { useEffect } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Laptop, Server, FileText, Compass, Lightbulb, PlayCircle, PauseCircle } from 'lucide-react';

export function NavigationHUD() {
  const cameraView = usePortfolioStore((state) => state.cameraView);
  const focusObject = usePortfolioStore((state) => state.focusObject);
  const resetCamera = usePortfolioStore((state) => state.resetCamera);
  const toggleLamp = usePortfolioStore((state) => state.toggleLamp);
  const isLampOn = usePortfolioStore((state) => state.isLampOn);
  const isAutoRotating = usePortfolioStore((state) => state.isAutoRotating);
  const toggleAutoRotate = usePortfolioStore((state) => state.toggleAutoRotate);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'Escape') {
        resetCamera();
      } else if (e.key === '1') {
        focusObject('laptop', true);
      } else if (e.key === '2') {
        focusObject('server', true);
      } else if (e.key === '3') {
        focusObject('poster', true);
      } else if (e.key.toLowerCase() === 'l') {
        toggleLamp();
      } else if (e.key.toLowerCase() === 'r') {
        toggleAutoRotate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusObject, resetCamera, toggleLamp, toggleAutoRotate]);

  const navItems = [
    {
      id: 'isometric',
      label: 'Room View',
      icon: Compass,
      shortcut: 'Esc',
      color: 'from-cyan-500 to-blue-600',
      activeBorder: 'border-cyan-400',
      onClick: () => resetCamera(),
      active: cameraView === 'isometric',
    },
    {
      id: 'laptop',
      label: 'Projects',
      icon: Laptop,
      shortcut: '1',
      color: 'from-cyan-400 to-emerald-500',
      activeBorder: 'border-emerald-400',
      onClick: () => focusObject('laptop', true),
      active: cameraView === 'laptop',
    },
    {
      id: 'server',
      label: 'CLI Terminal',
      icon: Server,
      shortcut: '2',
      color: 'from-purple-500 to-pink-500',
      activeBorder: 'border-pink-400',
      onClick: () => focusObject('server', true),
      active: cameraView === 'server',
    },
    {
      id: 'poster',
      label: 'Resume & CV',
      icon: FileText,
      shortcut: '3',
      color: 'from-amber-400 to-orange-500',
      activeBorder: 'border-amber-400',
      onClick: () => focusObject('poster', true),
      active: cameraView === 'poster',
    },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center space-y-2">
      {/* Floating Action Dock */}
      <nav className="pointer-events-auto flex items-center space-x-1.5 sm:space-x-2.5 glass-panel p-2 sm:p-2.5 rounded-2xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                item.active
                  ? `bg-gradient-to-r ${item.color} text-slate-950 shadow-lg scale-105 border ${item.activeBorder}`
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{item.label}</span>
              <span
                className={`hidden md:inline text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                  item.active
                    ? 'bg-black/20 border-black/30 text-slate-950 font-black'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300'
                }`}
              >
                {item.shortcut}
              </span>
            </button>
          );
        })}

        <div className="h-6 w-px bg-slate-700 my-auto mx-1"></div>

        {/* Quick Auto Rotate Button for Touchpad users */}
        <button
          onClick={toggleAutoRotate}
          title="Auto Rotate 360 (R)"
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            isAutoRotating
              ? 'text-purple-950 bg-gradient-to-r from-purple-400 to-pink-400 border border-purple-300 shadow-md scale-105'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {isAutoRotating ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
          <span className="hidden lg:inline">{isAutoRotating ? 'Spinning' : 'Auto 360°'}</span>
        </button>

        {/* Quick Lamp Toggle */}
        <button
          onClick={toggleLamp}
          title="Toggle Desk Lamp (L)"
          className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            isLampOn
              ? 'text-amber-950 bg-amber-400 border border-amber-300 shadow-md scale-105'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
          }`}
        >
          <Lightbulb size={16} className={isLampOn ? 'fill-amber-950' : ''} />
          <span className="hidden xl:inline">Lamp</span>
        </button>
      </nav>

      {/* Helpful Touchpad Hint */}
      <div className="text-[11px] font-mono text-cyan-300 bg-slate-950/80 backdrop-blur-md px-4 py-1 rounded-full border border-cyan-500/30 hidden md:flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>Touchpad Tip: Click floating 3D tags, use dock buttons, or press 1, 2, 3, Esc</span>
      </div>
    </div>
  );
}
