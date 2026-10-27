import React, { useState, useRef, useEffect } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { portfolioData } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import { Terminal, X, CornerDownLeft, Sparkles, Minimize2 } from 'lucide-react';

export function ServerTerminalModal() {
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const toggleDarkMode = usePortfolioStore((state) => state.toggleDarkMode);
  const isDarkMode = usePortfolioStore((state) => state.isDarkMode);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'AQSA AZIZ SPATIAL OS [Version 3.2-RELEASE-LINUX]' },
    { type: 'system', text: 'Initializing network dissector & PyTorch pipelines...' },
    { type: 'system', text: 'Type "help" to view available terminal commands.' },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto focus terminal input on mount
  useEffect(() => {
    if (activeModal === 'server' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeModal]);

  // Scroll to bottom on new output
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  if (activeModal !== 'server') return null;

  const handleCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    if (soundEnabled) sounds.playClick();

    // Add command to command history
    setCmdHistory((prev) => [raw, ...prev]);
    setHistoryIndex(-1);

    const parts = raw.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ').toLowerCase();

    // Append user input line
    const newLines = [{ type: 'input', text: `aqsa@portfolio:~$ ${raw}` }];

    switch (command) {
      case 'help':
        newLines.push({
          type: 'output',
          text: `AVAILABLE TERMINAL COMMANDS:
  help       - Print this command directory
  skills     - Inspect engineering skill matrix & proficiencies
  projects   - List all production software & research pipelines
  show <id>  - Inspect deep architecture of a project (e.g. "show packet-guard")
  education  - Display academic background at IMCS, University of Sindh
  contact    - Retrieve GitHub and verified contact endpoints
  whoami     - Display active operator profile
  bio        - Read developer background & focus areas
  neofetch   - Display system hardware & stack specifications
  theme      - Toggle Day / Night mode live from CLI
  clear      - Clear terminal screen buffer
  exit       - Return to 3D Isometric Room view`,
        });
        break;

      case 'skills':
        newLines.push({
          type: 'output',
          text: `==== SECURITY & NETWORK SYSTEMS ====
  Python / Scapy Packet Analysis    [███████████████████] 95%
  Wireshark & Lua Dissector Engine  [██████████████████░░] 92%
  802.11 Deauth Detection Engine    [███████████████████] 95%

==== AI & MACHINE LEARNING ====
  PyTorch Deep Neural Networks      [██████████████████░░] 92%
  FastAPI Asynchronous Services     [███████████████████] 94%
  Steganalysis & Media Forensics    [█████████████████░░░] 90%

==== 3D GRAPHICS & FULL-STACK ====
  Three.js & React Three Fiber (R3F) [██████████████████░░] 90%
  React / Modern Frontend UI         [███████████████████] 92%
  JavaScript (ES6+) / Node.js        [███████████████████] 94%
  C++ & CUDA / OpenMP Acceleration   [██████████████████░░] 90%
  Docker & Git Version Control       [███████████████████] 95%`,
        });
        break;

      case 'cert':
      case 'certifications':
        newLines.push({
          type: 'output',
          text: `VERIFIED PROFESSIONAL CERTIFICATIONS:
  * DeepLearning.AI Supervised Machine Learning (Coursera)
    Score: 100% Completion Grade
    Mastered: Regression, Classification, Neural Networks, Cost Functions

  * AWS Cloud Technical Essentials (Coursera / Amazon Web Services)
    Credential: Verified Professional
    Mastered: EC2, S3 Storage, IAM Security, VPC Virtual Networks`,
        });
        break;

      case 'projects':
        {
          const list = portfolioData.projects
            .map((p) => `  * [${p.id.padEnd(16)}] - ${p.title} (${p.category})`)
            .join('\n');
          newLines.push({
            type: 'output',
            text: `AQSA AZIZ REPOSITORIES & SYSTEMS:\n${list}\n\nTip: Type "show <id>" to inspect deep architecture (e.g. "show packet-guard" or "show steg-shield").`,
          });
        }
        break;

      case 'show':
      case 'cat':
      case 'project':
        if (!args) {
          newLines.push({
            type: 'error',
            text: 'Error: Missing project ID. Usage: show <project-id> (e.g. "show packet-guard")',
          });
        } else {
          const found = portfolioData.projects.find(
            (p) => p.id === args || p.id.includes(args) || p.title.toLowerCase().includes(args)
          );
          if (found) {
            newLines.push({
              type: 'output',
              text: `PROJECT DETAILS: ${found.title.toUpperCase()}
Category:     ${found.category}
Metrics:      ${found.metrics}
Tech Stack:   ${found.tags.join(', ')}
GitHub:       ${found.github}
Summary:      ${found.summary}
Architecture: ${found.architecture}
Features:
${found.features.map((f) => `  - ${f}`).join('\n')}`,
            });
          } else {
            newLines.push({
              type: 'error',
              text: `Error: Unknown project "${args}". Run "projects" to view available IDs.`,
            });
          }
        }
        break;

      case 'education':
        newLines.push({
          type: 'output',
          text: `ACADEMIC BACKGROUND:
Degree:      BS in Computer Science (Final Semester)
Institution: Institute of Mathematics and Computer Science (IMCS)
University:  University of Sindh, Jamshoro
Status:      Final Semester / High Academic Standing
Highlights:
  * Engineered IMCS TaskVault assignment & FYP repository portal
  * Built 3D Interactive Campus & Building Navigator with Three.js & R3F
  * Researched 802.11 wireless defense & Scapy packet engine (PacketGuard)
  * Developed deep learning steganalysis defense pipelines (StegShield)`,
        });
        break;

      case 'whoami':
        newLines.push({
          type: 'output',
          text: `OPERATOR:    ${portfolioData.developer.name} (${portfolioData.developer.handle})
TITLE:       ${portfolioData.developer.title}
LOCATION:    ${portfolioData.developer.location}
STATUS:      ${portfolioData.developer.status}
EDUCATION:   BS in Computer Science (Final Semester), IMCS, University of Sindh
GITHUB:      https://github.com/Aqsaazizwagan`,
        });
        break;

      case 'bio':
        newLines.push({
          type: 'output',
          text: portfolioData.developer.bio,
        });
        break;

      case 'contact':
        newLines.push({
          type: 'output',
          text: `COMMUNICATION CHANNELS:
  GitHub:   https://github.com/Aqsaazizwagan
  Email:    aqsaaziz.dev@gmail.com
  LinkedIn: https://linkedin.com/in/Aqsaazizwagan`,
        });
        break;

      case 'neofetch':
      case 'system':
        newLines.push({
          type: 'output',
          text: `  █████╗  ██████╗ ███████╗ █████╗ 
 ██╔══██╗██╔═══██╗██╔════╝██╔══██╗   OS: Linux 6.8 / AqsaStation Hardened
 ███████║██║   ██║███████╗███████║   Host: IMCS Spatial WebGL Environment
 ██╔══██║██║▄▄ ██║╚════██║██╔══██║   Stack: Python, PyTorch, FastAPI, React
 ██║  ██║╚██████╔╝███████║██║  ██║   Core: Scapy, Wireshark Lua, Node.js, Docker
 ╚═╝  ╚═╝ ╚══▀▀═╝ ╚══════╝╚═╝  ╚═╝   Uptime: Active & Ready for Impact
                                     Shell: bash 5.2 / WebGL Terminal CLI
                                     GitHub: github.com/Aqsaazizwagan`,
        });
        break;

      case 'theme':
        toggleDarkMode();
        newLines.push({
          type: 'system',
          text: `[THEME] Active mode set to: ${!isDarkMode ? 'Cyber Dark' : 'Day Mode'}`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
        newLines.push({
          type: 'error',
          text: 'Permission denied: aqsa is the primary administrator. Try commands without sudo.',
        });
        break;

      case 'exit':
      case 'quit':
        closeModal();
        return;

      default:
        newLines.push({
          type: 'error',
          text: `command not found: "${command}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (soundEnabled && e.key.length === 1) {
      sounds.playKeyBlip();
    }

    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        className="relative w-full max-w-4xl h-[85vh] glass-panel rounded-2xl border border-emerald-500/40 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,255,136,0.15)] text-slate-100 font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-emerald-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block cursor-pointer hover:opacity-80" onClick={closeModal}></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block"></span>
            <span className="text-xs text-emerald-400 font-semibold ml-2 flex items-center gap-1.5">
              <Terminal size={14} />
              aqsa@portfolio: ~/cli-session
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-[10px] hidden sm:inline">
              SSH 2.0 CONNECTED
            </span>
            <button
              onClick={closeModal}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Terminal (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body with Scanlines effect */}
        <div
          className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-950/90 text-xs sm:text-sm leading-relaxed space-y-2 crt-screen"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, idx) => (
            <div
              key={idx}
              className={
                line.type === 'input'
                  ? 'text-cyan-300 font-semibold flex items-start gap-1'
                  : line.type === 'error'
                  ? 'text-rose-400 whitespace-pre-wrap'
                  : line.type === 'system'
                  ? 'text-slate-400 italic'
                  : 'text-emerald-400 whitespace-pre-wrap'
              }
            >
              {line.text}
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-1 text-cyan-300">
            <span className="text-emerald-400 font-bold shrink-0">aqsa@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-cyan-200 outline-none border-none font-mono text-xs sm:text-sm caret-cyan-400"
              spellCheck={false}
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Terminal Quick Command Chips Footer */}
        <div className="p-3 bg-slate-950/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 mr-1 hidden sm:inline">Quick chips:</span>
            {['help', 'skills', 'projects', 'education', 'neofetch', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-emerald-950 text-emerald-400 border border-slate-800 hover:border-emerald-600/50 transition-colors font-mono"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <span>[Esc] to return to 3D Room</span>
          </div>
        </div>
      </div>
    </div>
  );
}
