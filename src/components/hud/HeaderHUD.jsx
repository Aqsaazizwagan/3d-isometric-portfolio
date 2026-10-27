import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { portfolioData } from '../../data/portfolioData';
import { Sun, Moon, Volume2, VolumeX, RotateCcw, ShieldCheck, PlayCircle, PauseCircle } from 'lucide-react';

export function HeaderHUD() {
  const isDarkMode = usePortfolioStore((state) => state.isDarkMode);
  const toggleDarkMode = usePortfolioStore((state) => state.toggleDarkMode);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);
  const toggleSound = usePortfolioStore((state) => state.toggleSound);
  const resetCamera = usePortfolioStore((state) => state.resetCamera);
  const cameraView = usePortfolioStore((state) => state.cameraView);
  const isAutoRotating = usePortfolioStore((state) => state.isAutoRotating);
  const toggleAutoRotate = usePortfolioStore((state) => state.toggleAutoRotate);

  return (
    <header className="absolute top-4 left-4 right-4 z-30 pointer-events-none flex items-center justify-between">
      {/* Left Branding Card */}
      <div className="pointer-events-auto flex items-center space-x-3 glass-panel px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-mono font-bold text-white shadow-md">
            AA
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse"></span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-wide text-white">
              {portfolioData.developer.name}
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck size={11} /> READY
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
            {portfolioData.developer.title}
          </p>
        </div>
      </div>

      {/* Right Controls HUD */}
      <div className="pointer-events-auto flex items-center space-x-2">
        {/* Auto 360 Spin for Touchpad users */}
        <button
          onClick={toggleAutoRotate}
          title={isAutoRotating ? 'Pause 360 Auto-Rotation' : 'Start 360 Auto-Rotation (Hands-Free)'}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all shadow-md ${
            isAutoRotating
              ? 'bg-purple-600 text-white font-bold shadow-purple-500/30 animate-pulse'
              : 'glass-panel text-slate-300 hover:text-white hover:border-purple-400/50'
          }`}
        >
          {isAutoRotating ? <PauseCircle size={15} /> : <PlayCircle size={15} />}
          <span className="hidden md:inline">{isAutoRotating ? 'Pause Spin' : 'Auto 360°'}</span>
        </button>

        {/* Reset Camera Button */}
        <button
          onClick={resetCamera}
          title="Reset Camera to Isometric Home Angle (Esc)"
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all shadow-md ${
            cameraView !== 'isometric'
              ? 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-cyan-500/30 animate-pulse'
              : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-400/50'
          }`}
        >
          <RotateCcw size={14} className={cameraView !== 'isometric' ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Reset Camera</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Disable UI Sound FX' : 'Enable UI Sound FX'}
          className={`p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all ${
            soundEnabled ? 'text-cyan-400 border-cyan-500/40' : 'text-slate-500'
          }`}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Day / Night Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to Day Mode' : 'Switch to Cyber Night Mode'}
          className="p-2.5 rounded-xl glass-panel text-amber-400 hover:text-amber-300 hover:border-amber-400/50 transition-all"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
