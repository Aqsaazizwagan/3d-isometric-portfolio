import React, { useState, useRef } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { FloatingBadge } from './FloatingBadge';

export function PosterMesh({ position = [0, 4.3, -5.25] }) {
  const [hovered, setHovered] = useState(false);
  const focusObject = usePortfolioStore((state) => state.focusObject);
  const setHoveredObject = usePortfolioStore((state) => state.setHoveredObject);
  const activeObject = usePortfolioStore((state) => state.activeObject);
  const isSelected = activeObject === 'poster';

  const pointerDownRef = useRef({ x: 0, y: 0, time: 0 });
  const lastTriggerRef = useRef(0);

  const triggerAction = () => {
    const now = Date.now();
    if (now - lastTriggerRef.current < 350) return;
    lastTriggerRef.current = now;
    focusObject('poster', true);
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
    <group position={position}>
      {/* Floating Holographic Badge */}
      <FloatingBadge
        position={[0, 1.8, 0.4]}
        text="RESUME & CREDENTIALS"
        subtext="Click to View Executive CV"
        color="#38bdf8"
        icon="📜"
        onClick={triggerAction}
      />

      <group
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setHoveredObject('Developer Blueprint Poster (Click to Inspect Resume)');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          setHoveredObject(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Outer Sleek Metallic Frame */}
        <mesh castShadow>
          <boxGeometry args={[3.4, 2.3, 0.08]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#38bdf8' : '#1e293b'}
            metalness={0.9}
            roughness={0.2}
            emissive={hovered || isSelected ? '#00f0ff' : '#000000'}
            emissiveIntensity={hovered || isSelected ? 0.4 : 0}
          />
        </mesh>

        {/* Frame Inset Border */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[3.24, 2.14, 0.02]} />
          <meshStandardMaterial color="#020617" roughness={0.9} />
        </mesh>

        {/* Main High-Tech Poster Canvas */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[3.15, 2.05]} />
          <meshStandardMaterial
            color="#0b1329"
            emissive={hovered ? '#1e3a8a' : '#0d1d3a'}
            emissiveIntensity={hovered ? 0.9 : 0.5}
            roughness={0.3}
          />
        </mesh>

        {/* Top Banner Accent */}
        <mesh position={[0, 0.82, 0.06]}>
          <planeGeometry args={[2.9, 0.14]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Cyber Blueprint Grid Lines in Cyan & Violet */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((x, idx) => (
          <mesh key={`grid-x-${idx}`} position={[x, -0.1, 0.058]}>
            <planeGeometry args={[0.015, 1.4]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        ))}

        {[-0.6, -0.3, 0.1, 0.4].map((y, idx) => (
          <mesh key={`grid-y-${idx}`} position={[0, y, 0.058]}>
            <planeGeometry args={[2.8, 0.015]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        ))}

        {/* Stylized Badge Box */}
        <mesh position={[-1.0, 0.35, 0.06]}>
          <boxGeometry args={[0.65, 0.55, 0.01]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>

        {/* Text simulation stripes */}
        <mesh position={[0.4, 0.48, 0.06]}>
          <planeGeometry args={[1.6, 0.08]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0.4, 0.34, 0.06]}>
          <planeGeometry args={[1.6, 0.05]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[0.4, 0.22, 0.06]}>
          <planeGeometry args={[1.6, 0.05]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* 4 Credentials Badges (DeepLearning.AI, AWS, PyTorch, CS) */}
        {[-1.0, -0.35, 0.35, 1.0].map((bx, bIdx) => (
          <mesh key={`badge-${bIdx}`} position={[bx, -0.58, 0.06]}>
            <boxGeometry args={[0.55, 0.24, 0.01]} />
            <meshBasicMaterial
              color={
                bIdx === 0 ? '#ef4444' : bIdx === 1 ? '#f59e0b' : bIdx === 2 ? '#3b82f6' : '#10b981'
              }
            />
          </mesh>
        ))}

        {/* Glowing Bottom Neon Accent Strip */}
        <mesh position={[0, -1.06, 0.045]}>
          <planeGeometry args={[3.15, 0.04]} />
          <meshBasicMaterial color={hovered ? '#00ff88' : '#00f0ff'} />
        </mesh>
      </group>
    </group>
  );
}
