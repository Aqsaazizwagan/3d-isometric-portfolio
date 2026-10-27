import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { portfolioData } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  X,
  Download,
  Printer,
  GraduationCap,
  Award,
  Github,
  Mail,
  ExternalLink,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  Wrench,
  Terminal,
  MapPin,
  Sparkles,
  Briefcase,
  Star,
  Globe,
  Phone,
  Calendar,
  ChevronRight,
  Bookmark
} from 'lucide-react';

export function PosterModal() {
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);

  // Template Style: 'canva-modern' (Executive Canva dark slate & emerald) or 'canva-clean' (Ivory/White print canvas)
  const [cvTheme, setCvTheme] = useState('canva-modern');

  if (activeModal !== 'poster') return null;

  const handleDownloadCV = () => {
    if (soundEnabled) sounds.playClick();

    const cvContent = `================================================================================
${portfolioData.developer.name.toUpperCase()}
${portfolioData.developer.title}
================================================================================
GitHub:   https://github.com/Aqsaazizwagan
Email:    aqsaaziz.dev@gmail.com
Location: ${portfolioData.developer.location}
Status:   ${portfolioData.developer.status}

--------------------------------------------------------------------------------
EXECUTIVE PROFILE SUMMARY
--------------------------------------------------------------------------------
${portfolioData.developer.bio}

--------------------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------------------
Degree:      ${portfolioData.education[0].degree}
Institution: ${portfolioData.education[0].institution}
Location:    ${portfolioData.education[0].location}
Period:      ${portfolioData.education[0].period}
Honors:      ${portfolioData.education[0].honors}

Academic Highlights:
${portfolioData.education[0].highlights.map((h) => `• ${h}`).join('\n')}

--------------------------------------------------------------------------------
TECHNICAL SKILLS & PROFICIENCIES
--------------------------------------------------------------------------------
Core Stack: ${portfolioData.skillsList.join(', ')}

Categorized Competencies:
• Languages:           ${portfolioData.categorizedSkills.languages.map((s) => `${s.name} (${s.level}%)`).join(', ')}
• Frameworks & Web:    ${portfolioData.categorizedSkills.frameworks.map((s) => `${s.name} (${s.level}%)`).join(', ')}
• Security & Forensics: ${portfolioData.categorizedSkills.securityTools.map((s) => `${s.name} (${s.level}%)`).join(', ')}
• Platform & DevOps:   ${portfolioData.categorizedSkills.platformUtilities.map((s) => `${s.name} (${s.level}%)`).join(', ')}

--------------------------------------------------------------------------------
VERIFIED CERTIFICATIONS
--------------------------------------------------------------------------------
${portfolioData.certifications
  .map(
    (c) =>
      `• ${c.title} — ${c.issuer}\n  Grade: ${c.grade} [${c.badge}]\n  Overview: ${c.description}`
  )
  .join('\n\n')}

--------------------------------------------------------------------------------
FEATURED ENGINEERING & RESEARCH PROJECTS
--------------------------------------------------------------------------------
${portfolioData.projects
  .map(
    (p, idx) =>
      `${idx + 1}. ${p.title} [${p.category}]
   Stack:        ${p.tags.join(', ')}
   GitHub:       ${p.github}
   Summary:      ${p.summary}
   Metrics:      ${p.metrics}
   Architecture: ${p.architecture}
   Features:
${p.features.map((f) => `     - ${f}`).join('\n')}`
  )
  .join('\n\n')}

--------------------------------------------------------------------------------
KEY RESEARCH & TECHNICAL ACHIEVEMENTS
--------------------------------------------------------------------------------
${portfolioData.achievements.map((a) => `• ${a}`).join('\n')}

================================================================================
Generated via Aqsa Aziz Interactive 3D Portfolio • Canva Design Suite
================================================================================
`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Aqsa_Aziz_Executive_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#38bdf8', '#10b981', '#f59e0b', '#a855f7'],
    });
  };

  const handlePrint = () => {
    if (soundEnabled) sounds.playClick();
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 print:p-0 print:bg-white print:static"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] glass-panel rounded-2xl border border-cyan-500/40 flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.2)] text-slate-100 font-sans print:max-h-none print:h-auto print:border-none print:shadow-none print:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Canva Studio Top Toolbar */}
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 shrink-0 print:hidden">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              CANVA RESUME STUDIO
            </div>
            <span className="text-xs text-slate-400 font-mono hidden md:inline">
              Executive Template • 2-Column Professional CV Layout
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme Toggle Button */}
            <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setCvTheme('canva-modern')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  cvTheme === 'canva-modern'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Sleek Slate Executive Theme"
              >
                Slate Canva
              </button>
              <button
                onClick={() => setCvTheme('canva-clean')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  cvTheme === 'canva-clean'
                    ? 'bg-white text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Crisp Ivory Print Theme"
              >
                Ivory Canva
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors border border-slate-700 shadow"
              title="Print to A4 / Save as PDF via Browser"
            >
              <Printer size={14} className="text-cyan-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadCV}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Download size={14} />
              <span>Download CV</span>
            </button>

            <button
              onClick={closeModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Resume & Return to 3D Room (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Canva A4 Document Preview Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-slate-950/80 flex justify-center print:p-0 print:bg-white">
          {/* Canva Document Sheet Canvas */}
          <div
            id="canva-resume-sheet"
            className={`w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 print:shadow-none print:rounded-none ${
              cvTheme === 'canva-clean'
                ? 'bg-[#fcfdfd] text-slate-900 border border-slate-300'
                : 'bg-[#0f172a] text-slate-100 border border-slate-800'
            }`}
          >
            {/* Canva Top Decorative Banner */}
            <div className="h-2.5 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-600"></div>

            {/* Header Area */}
            <div
              className={`p-6 sm:p-8 border-b ${
                cvTheme === 'canva-clean'
                  ? 'bg-gradient-to-r from-slate-50 via-teal-50/30 to-blue-50/20 border-slate-200'
                  : 'bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                      Curriculum Vitae
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck size={11} /> Verified Portfolio
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
                    {portfolioData.developer.name}
                  </h1>

                  <p
                    className={`text-sm sm:text-base font-semibold tracking-wide ${
                      cvTheme === 'canva-clean' ? 'text-teal-700' : 'text-cyan-400'
                    }`}
                  >
                    {portfolioData.developer.title}
                  </p>

                  <p
                    className={`text-xs sm:text-sm max-w-2xl leading-relaxed pt-1 ${
                      cvTheme === 'canva-clean' ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {portfolioData.developer.bio}
                  </p>
                </div>

                {/* Canva Monogram Badge */}
                <div className="shrink-0 flex items-center md:flex-col gap-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 p-1 shadow-xl shadow-cyan-500/20">
                    <div
                      className={`w-full h-full rounded-xl flex flex-col items-center justify-center font-black ${
                        cvTheme === 'canva-clean'
                          ? 'bg-white text-slate-900'
                          : 'bg-slate-950 text-white'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-blue-500">
                        AA
                      </span>
                      <span className="text-[8px] font-mono uppercase tracking-widest opacity-80 text-cyan-400">
                        ENGINEER
                      </span>
                    </div>
                  </div>

                  <div className="text-right md:text-center text-[10px] font-mono opacity-80">
                    <p className="font-bold">IMCS Sindh</p>
                    <p>BS CS Finalist</p>
                  </div>
                </div>
              </div>

              {/* Contact Pill Bar */}
              <div className="flex flex-wrap items-center gap-2.5 pt-5 text-xs font-mono">
                <a
                  href="https://github.com/Aqsaazizwagan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border shadow-sm ${
                    cvTheme === 'canva-clean'
                      ? 'bg-white hover:bg-slate-100 text-teal-800 border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-slate-700'
                  }`}
                >
                  <Github size={13} className="text-cyan-400" />
                  <span>github.com/Aqsaazizwagan</span>
                  <ExternalLink size={10} className="opacity-70" />
                </a>

                <a
                  href="mailto:aqsaaziz.dev@gmail.com"
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border shadow-sm ${
                    cvTheme === 'canva-clean'
                      ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  <Mail size={13} className="text-emerald-400" />
                  <span>aqsaaziz.dev@gmail.com</span>
                </a>

                <span
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 border shadow-sm ${
                    cvTheme === 'canva-clean'
                      ? 'bg-white text-slate-700 border-slate-300'
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                >
                  <MapPin size={13} className="text-rose-400" />
                  <span>{portfolioData.developer.location}</span>
                </span>
              </div>
            </div>

            {/* 2-Column Canva Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Education, Visual Skill Bars, Certifications (5 cols on lg) */}
              <div
                className={`p-6 sm:p-7 lg:col-span-5 space-y-6 border-b lg:border-b-0 lg:border-r ${
                  cvTheme === 'canva-clean'
                    ? 'bg-slate-50/80 border-slate-200'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Section: Education */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    <GraduationCap size={15} />
                    <span>Education</span>
                  </div>

                  {portfolioData.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border space-y-2 ${
                        cvTheme === 'canva-clean'
                          ? 'bg-white border-slate-200 shadow-sm'
                          : 'bg-slate-950/70 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-bold leading-tight">
                          {edu.degree}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0 font-semibold">
                          Final Semester
                        </span>
                      </div>
                      <p
                        className={`text-xs font-medium ${
                          cvTheme === 'canva-clean' ? 'text-teal-700' : 'text-cyan-300'
                        }`}
                      >
                        {edu.institution}
                      </p>
                      <p className="text-[11px] opacity-75 font-mono">
                        {edu.location} • {edu.period}
                      </p>
                      <p className="text-[11px] font-medium text-emerald-400">
                        {edu.honors}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Section: Canva Visual Skills Meters */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    <div className="flex items-center gap-2">
                      <Code2 size={15} />
                      <span>Technical Competencies</span>
                    </div>
                    <span className="text-[10px] opacity-70">Proficiency</span>
                  </div>

                  {/* Languages Visual Bars */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-80">
                      Languages & Scripting
                    </p>
                    {portfolioData.categorizedSkills.languages.map((s) => (
                      <div key={s.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold">{s.name}</span>
                          <span className="text-[10px] font-mono opacity-80">{s.level}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-700/40 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                            style={{ width: `${s.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Frameworks & Security Visual Badges */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-80">
                      Frameworks & AI
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {portfolioData.categorizedSkills.frameworks.map((s) => (
                        <span
                          key={s.name}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border ${
                            cvTheme === 'canva-clean'
                              ? 'bg-white border-slate-300 text-slate-800'
                              : 'bg-slate-950 border-slate-700 text-slate-200'
                          }`}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Security Tools */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-80">
                      Security & Forensics
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {portfolioData.categorizedSkills.securityTools.map((s) => (
                        <span
                          key={s.name}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/60"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-80">
                      DevOps & Infrastructure
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {portfolioData.categorizedSkills.platformUtilities.map((s) => (
                        <span
                          key={s.name}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-cyan-950/50 text-cyan-200 border border-cyan-800/60"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section: Certifications */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    <Award size={15} />
                    <span>Verified Certifications</span>
                  </div>

                  <div className="space-y-2.5">
                    {portfolioData.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border space-y-1.5 ${
                          cvTheme === 'canva-clean'
                            ? 'bg-white border-slate-200 shadow-sm'
                            : 'bg-slate-950/70 border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="text-xs font-bold leading-tight">
                            {cert.title}
                          </h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 font-bold">
                            {cert.grade}
                          </span>
                        </div>
                        <p className="text-[11px] text-cyan-400 font-mono font-medium">
                          {cert.issuer}
                        </p>
                        <p className="text-[11px] opacity-80 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages & Soft Skills */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    <Globe size={15} />
                    <span>Languages</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">English (Professional)</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">Urdu (Native)</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">Sindhi (Native)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Technical Projects Showcase & Research (7 cols on lg) */}
              <div className="p-6 sm:p-7 lg:col-span-7 space-y-6">
                {/* Section: Key Engineering Projects */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                      <Cpu size={15} />
                      <span>Featured Engineering & Research Projects</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      {portfolioData.projects.length} Repositories
                    </span>
                  </div>

                  {/* Project Cards in Canva Format */}
                  <div className="space-y-4">
                    {portfolioData.projects.map((p, idx) => (
                      <div
                        key={p.id}
                        className={`p-4 rounded-xl border transition-all duration-200 space-y-2 relative group ${
                          cvTheme === 'canva-clean'
                            ? 'bg-white border-slate-200 hover:border-teal-500 shadow-sm hover:shadow'
                            : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 shadow-md'
                        }`}
                      >
                        {/* Timeline Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-mono font-bold text-slate-950 shrink-0">
                              {idx + 1}
                            </span>
                            <h4 className="text-sm font-bold tracking-tight">
                              {p.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                              {p.category}
                            </span>
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                              title="Inspect GitHub Source Code"
                            >
                              <Github size={12} />
                              <span className="hidden sm:inline">Repo</span>
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>

                        {/* Summary & Metrics */}
                        <p className="text-xs opacity-90 leading-relaxed font-sans">
                          {p.summary}
                        </p>

                        <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-0.5">
                          <CheckCircle2 size={12} className="shrink-0" />
                          <span>{p.metrics}</span>
                        </div>

                        {/* Architecture Snippet */}
                        <div
                          className={`p-2 rounded-lg text-[10.5px] font-mono leading-relaxed border ${
                            cvTheme === 'canva-clean'
                              ? 'bg-slate-50 border-slate-200 text-slate-700'
                              : 'bg-slate-950/70 border-slate-800/80 text-slate-300'
                          }`}
                        >
                          <span className="text-cyan-400 font-semibold">Architecture: </span>
                          <span>{p.architecture}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1 pt-1">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className={`text-[9.5px] font-mono px-2 py-0.5 rounded border ${
                                cvTheme === 'canva-clean'
                                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                                  : 'bg-slate-950 text-slate-300 border-slate-800'
                              }`}
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: Key Achievements & Research Highlights */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800/80">
                    <Sparkles size={15} />
                    <span>Key Research & Technical Achievements</span>
                  </div>

                  <div className="space-y-2">
                    {portfolioData.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                          cvTheme === 'canva-clean'
                            ? 'bg-white border-slate-200 text-slate-700 shadow-sm'
                            : 'bg-slate-950/70 border-slate-800 text-slate-200'
                        }`}
                      >
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Canva Footer Strip */}
            <div
              className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-2 ${
                cvTheme === 'canva-clean'
                  ? 'bg-slate-100 border-slate-200 text-slate-600'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span>Aqsa Aziz • IMCS, University of Sindh, Jamshoro</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Aqsaazizwagan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1"
                >
                  <Github size={13} /> github.com/Aqsaazizwagan
                </a>
                <span>•</span>
                <span>Verified Candidate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Fixed Action Bar */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/95 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono shrink-0 print:hidden">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Canva Executive Resume Layout • High-Definition Document View</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Printer size={15} className="text-cyan-400" />
              <span>Print A4 / PDF</span>
            </button>

            <button
              onClick={handleDownloadCV}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
            >
              <Download size={15} />
              <span>Download Official CV</span>
            </button>

            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Close [Esc]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
