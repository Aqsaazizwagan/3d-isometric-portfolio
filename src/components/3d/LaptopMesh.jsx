import React, { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { portfolioData } from '../../data/portfolioData';
import { FloatingBadge } from './FloatingBadge';
import { Terminal, Code2, ExternalLink, Sparkles } from 'lucide-react';

export function LaptopMesh({ position = [0, 1.83, 0.35], rotation = [0, -0.2, 0] }) {
  const [hovered, setHovered] = useState(false);
  const focusObject = usePortfolioStore((state) => state.focusObject);
  const setHoveredObject = usePortfolioStore((state) => state.setHoveredObject);
  const activeObject = usePortfolioStore((state) => state.activeObject);
  const isSelected = activeObject === 'laptop';

  const pointerDownRef = useRef({ x: 0, y: 0, time: 0 });
  const lastTriggerRef = useRef(0);

  const triggerAction = () => {
    const now = Date.now();
    if (now - lastTriggerRef.current < 350) return;
    lastTriggerRef.current = now;
    focusObject('laptop', true);
  };

  const handleClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    triggerAction();
  };

  const handlePointerDown = (e) => {
    pointerDownRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
  };

  const handlePointerUp = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const dx = Math.abs(e.clientX - pointerDownRef.current.x);
    const dy = Math.abs(e.clientY - pointerDownRef.current.y);
    const dt = Date.now() - pointerDownRef.current.time;
    // Trackpad tap tolerance: small movement within 500ms
    if (Math.hypot(dx, dy) < 22 && dt < 500) {
      triggerAction();
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Floating Holographic Badge */}
      <FloatingBadge
        position={[0, 1.9, 0]}
        text="PROJECTS SHOWCASE"
        subtext={`Click to Inspect ${portfolioData.projects.length} Real Projects`}
        color="#00f0ff"
        icon="💻"
        onClick={triggerAction}
      />

      <group
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setHoveredObject('Developer Laptop (Click to View Projects)');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          setHoveredObject(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Laptop Base Body */}
        <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.65, 0.04, 1.15]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#1e293b' : '#0f172a'}
            metalness={0.9}
            roughness={0.2}
            emissive={hovered || isSelected ? '#00f0ff' : '#000000'}
            emissiveIntensity={hovered || isSelected ? 0.4 : 0}
          />
        </mesh>

        {/* Keyboard Bed / Indentation */}
        <mesh position={[0, 0.042, -0.1]} receiveShadow>
          <boxGeometry args={[1.45, 0.005, 0.68]} />
          <meshStandardMaterial color="#020617" roughness={0.6} />
        </mesh>

        {/* Individual Stylized Key Rows with RGB Glow */}
        {[-0.28, -0.16, -0.04, 0.08, 0.18].map((z, idx) => (
          <mesh key={idx} position={[0, 0.046, z]}>
            <boxGeometry args={[1.4, 0.006, 0.08]} />
            <meshStandardMaterial
              color="#1e293b"
              emissive={idx % 2 === 0 ? '#00f0ff' : '#ff007f'}
              emissiveIntensity={hovered ? 0.7 : 0.25}
            />
          </mesh>
        ))}

        {/* Large Modern Glass Trackpad */}
        <mesh position={[0, 0.042, 0.36]}>
          <boxGeometry args={[0.62, 0.005, 0.38]} />
          <meshStandardMaterial
            color={hovered ? '#00f0ff' : '#1e293b'}
            metalness={0.8}
            roughness={0.1}
            emissive="#00f0ff"
            emissiveIntensity={hovered ? 0.3 : 0.05}
          />
        </mesh>

        {/* Hinge Cylinder */}
        <mesh position={[0, 0.045, -0.56]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.62, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Open Display Lid */}
        <group position={[0, 0.045, -0.56]} rotation={[1.82, 0, 0]}>
          {/* Lid Back Aluminum Shell */}
          <mesh position={[0, 0.58, -0.015]} castShadow>
            <boxGeometry args={[1.65, 1.16, 0.025]} />
            <meshStandardMaterial
              color={isSelected ? '#0284c7' : '#0f172a'}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>

          {/* Glowing Minimal Apple/Cyber Logo on Lid Back */}
          <mesh position={[0, 0.58, -0.03]}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>

          {/* Thin Display Bezel */}
          <mesh position={[0, 0.58, 0.002]}>
            <planeGeometry args={[1.62, 1.12]} />
            <meshStandardMaterial color="#020617" roughness={0.9} />
          </mesh>

          {/* High-Resolution Screen Matrix Plane */}
          <mesh position={[0, 0.58, 0.006]}>
            <planeGeometry args={[1.54, 1.04]} />
            <meshStandardMaterial
              color="#020617"
              emissive="#001829"
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>

          {/* 💻 High-Tech Interactive 3D Screen HTML Overlay */}
          <Html
            transform
            occlude
            position={[0, 0.58, 0.008]}
            distanceFactor={1.38}
            className="pointer-events-none select-none"
          >
            <div
              className={`w-[600px] h-[400px] bg-slate-950/95 text-slate-100 p-4 rounded-lg flex flex-col justify-between font-mono border transition-all duration-300 ${
                hovered
                  ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.4)]'
                  : 'border-slate-800'
              }`}
            >
              {/* Fake IDE Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-slate-400 font-semibold ml-2 flex items-center gap-1">
                    <Terminal size={12} className="text-cyan-400" />
                    portfolioData.js — Antigravity Workspace
                  </span>
                </div>
                <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                  {portfolioData.projects.length} PROJECTS
                </span>
              </div>

              {/* Code Editor Preview */}
              <div className="space-y-1.5 text-xs font-mono my-2 text-slate-300 overflow-hidden leading-relaxed">
                <p className="text-emerald-400 font-bold">
                  const engineer = &quot;{portfolioData.developer.name}&quot;;
                </p>
                <p className="text-cyan-300">
                  // IMCS TaskVault • 3D Campus Navigator • PacketGuard • StegShield • RetroPulse • Smart Traffic
                </p>
                <p className="text-slate-400 text-[11px]">
                  &gt; Stack: Python, C++, JavaScript, PyTorch, FastAPI, React, Three.js, Scapy, Wireshark...
                </p>
                <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200 mt-2">
                  <p className="font-bold text-white flex items-center gap-1">
                    <Code2 size={12} className="text-cyan-400" /> Click to inspect all {portfolioData.projects.length} projects & live demos
                  </p>
                </div>
              </div>

              {/* Bottom IDE Status Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400">● Live 3D Viewport</span>
                  <span>UTF-8</span>
                  <span>React 18</span>
                </div>
                <span className="text-cyan-400 flex items-center gap-1 font-bold">
                  <Sparkles size={11} /> Click to Open Showcase
                </span>
              </div>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}
