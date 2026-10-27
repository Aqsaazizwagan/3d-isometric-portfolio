import React from 'react';
import { RoomCanvas } from './components/3d/RoomCanvas';
import { HeaderHUD } from './components/hud/HeaderHUD';
import { NavigationHUD } from './components/hud/NavigationHUD';
import { TooltipHUD } from './components/hud/TooltipHUD';
import { LaptopModal } from './components/modals/LaptopModal';
import { ServerTerminalModal } from './components/modals/ServerTerminalModal';
import { PosterModal } from './components/modals/PosterModal';

export default function App() {
  return (
    <main className="w-full h-screen overflow-hidden relative bg-slate-950 font-sans select-none">
      {/* 3D WebGL Canvas Layer (Background z-0) */}
      <div className="absolute inset-0 z-0">
        <RoomCanvas />
      </div>

      {/* 2D Glassmorphism HUD Overlays (Foreground z-40) */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        <HeaderHUD />
        <NavigationHUD />
        <TooltipHUD />
      </div>

      {/* Interactive Feature Modals (Top Layer z-50) */}
      <div className="relative z-50">
        <LaptopModal />
        <ServerTerminalModal />
        <PosterModal />
      </div>
    </main>
  );
}
