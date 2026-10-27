import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { FloatingBadge } from './FloatingBadge';

export function ServerMesh({ position = [-4.2, 0, -1.2], rotation = [0, Math.PI / 4, 0] }) {
  const [hovered, setHovered] = useState(false);
  const focusObject = usePortfolioStore((state) => state.focusObject);
  const setHoveredObject = usePortfolioStore((state) => state.setHoveredObject);
  const activeObject = usePortfolioStore((state) => state.activeObject);
  const isSelected = activeObject === 'server';

  // Refs for animated blinking LEDs
  const ledRef1 = useRef();
  const ledRef2 = useRef();
  const ledRef3 = useRef();
  const crtGlowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ledRef1.current) {
      ledRef1.current.material.opacity = Math.sin(t * 8) > 0.1 ? 1 : 0.2;
    }
    if (ledRef2.current) {
      ledRef2.current.material.opacity = Math.cos(t * 6) > 0 ? 1 : 0.2;
    }
    if (ledRef3.current) {
      ledRef3.current.material.opacity = Math.sin(t * 11) > 0.3 ? 1 : 0.25;
    }
    if (crtGlowRef.current) {
      crtGlowRef.current.intensity = 1.2 + Math.sin(t * 4) * 0.4;
    }
  });

  const pointerDownRef = useRef({ x: 0, y: 0, time: 0 });
  const lastTriggerRef = useRef(0);

  const triggerAction = () => {
    const now = Date.now();
    if (now - lastTriggerRef.current < 350) return;
    lastTriggerRef.current = now;
    focusObject('server', true);
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
    if (Math.hypot(dx, dy) < 22 && dt < 500) {
      triggerAction();
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* 🌟 Bruno Simon Floating Holographic Badge */}
      <FloatingBadge
        position={[0, 5.6, 0.4]}
        text="RETRO CLI ARCADE"
        subtext="Click to Launch Web Terminal"
        color="#00ff88"
        icon="🕹️"
        onClick={triggerAction}
      />

      <group
        onClick={(e) => {
          e.stopPropagation();
          triggerAction();
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setHoveredObject('Arcade Terminal & Server (Click to Open CLI)');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          setHoveredObject(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Main Retro Arcade / Server Body */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 5.0, 1.5]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#1e1b4b' : '#090d16'}
            metalness={0.8}
            roughness={0.2}
            emissive={hovered || isSelected ? '#a855f7' : '#000000'}
            emissiveIntensity={hovered || isSelected ? 0.35 : 0}
          />
        </mesh>

        {/* Side Art / Racing Stripes in Bruno Simon Saturated Magenta & Cyan */}
        {[-0.91, 0.91].map((sideX, sIdx) => (
          <group key={`side-art-${sIdx}`} position={[sideX, 2.6, 0]}>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[1.3, 4.4]} />
              <meshBasicMaterial color="#1e1b4b" />
            </mesh>
            {/* Glowing Bolt / Chevron Stripe */}
            <mesh position={[sideX > 0 ? 0.01 : -0.01, 0, 0]} rotation={[0, Math.PI / 2, 0.4]}>
              <planeGeometry args={[0.2, 3.8]} />
              <meshBasicMaterial color="#ff007f" />
            </mesh>
            <mesh position={[sideX > 0 ? 0.01 : -0.01, 0.3, 0]} rotation={[0, Math.PI / 2, 0.4]}>
              <planeGeometry args={[0.15, 3.8]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
          </group>
        ))}

        {/* Top Marquee Sign: "ALEX ARCADE" */}
        <group position={[0, 4.75, 0.65]}>
          <mesh castShadow>
            <boxGeometry args={[1.65, 0.45, 0.25]} />
            <meshStandardMaterial color="#030712" />
          </mesh>
          <mesh position={[0, 0, 0.13]}>
            <planeGeometry args={[1.55, 0.35]} />
            <meshBasicMaterial color="#00ff88" />
          </mesh>
          {/* Top Marquee Backlight */}
          <pointLight position={[0, 0, 0.3]} intensity={1.5} distance={3} color="#00ff88" />
        </group>

        {/* Angled Retro CRT Screen */}
        <group position={[0, 3.4, 0.6]} rotation={[-0.2, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.2, 0.15]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
          {/* Glowing Green CRT Display */}
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[1.38, 1.08]} />
            <meshStandardMaterial
              color="#022c22"
              emissive="#00ff88"
              emissiveIntensity={hovered ? 1.4 : 0.8}
            />
          </mesh>
          {/* CRT Light Bounce onto Player */}
          <pointLight ref={crtGlowRef} position={[0, 0, 0.5]} distance={4} color="#00ff88" />

          {/* Retro Pixel Art Sim / Scanline Bars */}
          {[-0.3, 0, 0.3].map((py, pIdx) => (
            <mesh key={`crt-line-${pIdx}`} position={[0, py, 0.09]}>
              <planeGeometry args={[1.2, 0.08]} />
              <meshBasicMaterial color="#052e16" />
            </mesh>
          ))}
        </group>

        {/* Slanted Arcade Control Deck */}
        <group position={[0, 2.2, 0.85]} rotation={[0.4, 0, 0]}>
          {/* Deck Table */}
          <mesh castShadow>
            <boxGeometry args={[1.65, 0.1, 0.6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.7} />
          </mesh>

          {/* Glowing Control Panel Surface */}
          <mesh position={[0, 0.055, 0]}>
            <planeGeometry args={[1.58, 0.54]} />
            <meshStandardMaterial color="#1e1b4b" emissive="#ff007f" emissiveIntensity={0.3} />
          </mesh>

          {/* Arcade Joystick (Ball Top) */}
          <group position={[-0.45, 0.14, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.18, 12]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.11, 0]} castShadow>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial color="#ef4444" roughness={0.2} />
            </mesh>
          </group>

          {/* 6 Colorful Arcade Push Buttons */}
          {[
            { x: 0.1, z: -0.1, color: '#ef4444' }, // Red
            { x: 0.3, z: -0.1, color: '#3b82f6' }, // Blue
            { x: 0.5, z: -0.1, color: '#eab308' }, // Yellow
            { x: 0.1, z: 0.1, color: '#10b981' },  // Green
            { x: 0.3, z: 0.1, color: '#a855f7' },  // Purple
            { x: 0.5, z: 0.1, color: '#06b6d4' },  // Cyan
          ].map((btn, bIdx) => (
            <mesh key={`btn-${bIdx}`} position={[btn.x, 0.065, btn.z]} castShadow>
              <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
              <meshStandardMaterial color={btn.color} roughness={0.3} />
            </mesh>
          ))}
        </group>

        {/* Lower Coin Door / Server Blade Ventilation */}
        <group position={[0, 0.95, 0.72]}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.5, 0.1]} />
            <meshStandardMaterial color="#020617" roughness={0.8} />
          </mesh>
          {/* Dual Coin Return Slots with Orange Glow */}
          {[-0.25, 0.25].map((cx, cIdx) => (
            <mesh key={`coin-${cIdx}`} position={[cx, 0.1, 0.06]}>
              <boxGeometry args={[0.16, 0.24, 0.02]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
            </mesh>
          ))}
          {/* Blinking Status LED Stack */}
          <mesh ref={ledRef1} position={[-0.55, -0.4, 0.06]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color="#00ff88" />
          </mesh>
          <mesh ref={ledRef2} position={[-0.45, -0.4, 0.06]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh ref={ledRef3} position={[-0.35, -0.4, 0.06]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color="#ff007f" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
