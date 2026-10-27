import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { MousePointerClick } from 'lucide-react';

export function TooltipHUD() {
  const hoveredObject = usePortfolioStore((state) => state.hoveredObject);

  if (!hoveredObject) return null;

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
      <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/50 shadow-lg text-cyan-300 text-xs font-mono">
        <MousePointerClick size={14} className="text-cyan-400 animate-pulse" />
        <span>{hoveredObject}</span>
      </div>
    </div>
  );
}
