import React, { useState, useMemo } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { portfolioData } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  X,
  Search,
  ExternalLink,
  Github,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Terminal,
  Activity,
  Play
} from 'lucide-react';

export function LaptopModal() {
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeDemoProject, setActiveDemoProject] = useState(null);
  const [demoLog, setDemoLog] = useState([]);

  // Filter projects based on search query and category
  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        project.architecture.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  if (activeModal !== 'laptop') return null;

  const handleRunDemo = (project) => {
    if (soundEnabled) sounds.playClick();
    setActiveDemoProject(project);
    setDemoLog([
      `[INIT] Mounting sandbox environment for: ${project.title}`,
      `[STACK] Initialized runtime modules: ${project.tags.join(', ')}`,
      `[TELEMETRY] ${project.metrics}`,
      `[GITHUB] ${project.github}`,
      `[STATUS] Verification completed. All test cases passed.`
    ]);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f0ff', '#00ff88', '#a855f7'],
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] glass-panel rounded-2xl border border-cyan-500/30 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Cpu size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                Engineering Projects Showcase
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {portfolioData.projects.length} Shipped
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Explore hardened cybersecurity engines, PyTorch pipelines, and full-stack systems.
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Close Showcase & Return to 3D Room (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar & Filter Tabs */}
        <div className="p-4 sm:px-6 bg-slate-950/40 border-b border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Live Search Input */}
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tech, keyword, or tag..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {portfolioData.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    if (soundEnabled) sounds.playClick();
                    setSelectedCategory(category);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Project Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 text-slate-500 space-y-2 font-mono">
              <Search size={32} className="mx-auto text-slate-600 mb-2" />
              <p>No projects match "{searchQuery}" in category "{selectedCategory}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs text-cyan-400 underline hover:text-cyan-300"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col justify-between rounded-xl bg-slate-900/75 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 p-5 shadow-lg group hover:shadow-cyan-500/10"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <Activity size={12} />
                        {project.metrics}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Architecture Highlight */}
                    <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-slate-800/80 text-[11px] font-mono text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                        <Layers size={13} /> Architecture Blueprint:
                      </div>
                      <p className="text-slate-400">{project.architecture}</p>
                    </div>

                    {/* Key Features List */}
                    <div className="mt-3 space-y-1">
                      {project.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Live Demo + GitHub */}
                  <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => handleRunDemo(project)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 text-xs font-semibold transition-all"
                    >
                      <Play size={13} /> Live Sandbox
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 text-xs transition-colors flex items-center gap-1.5"
                      title="Inspect Source Code on GitHub"
                    >
                      <Github size={15} />
                    </a>

                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 text-xs transition-colors flex items-center gap-1.5"
                      title="Open Live Deployment"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Interactive Sandbox / Demo Overlay */}
        {activeDemoProject && (
          <div className="p-4 bg-slate-950/95 border-t border-cyan-500/40 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-2 font-semibold">
                <Terminal size={14} /> Sandbox Telemetry Stream: {activeDemoProject.title}
              </span>
              <button
                onClick={() => setActiveDemoProject(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Sandbox
              </button>
            </div>
            <div className="font-mono text-[11px] text-emerald-400 bg-black/60 p-2.5 rounded border border-slate-800 space-y-1 max-h-24 overflow-y-auto">
              {demoLog.map((log, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-slate-500">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Press [Esc] to return to 3D room</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
}
