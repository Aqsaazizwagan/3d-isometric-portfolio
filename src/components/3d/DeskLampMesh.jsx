import React, { useState, useRef } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export function DeskLampMesh({ position = [1.5, 1.82, 0.2] }) {
  const isLampOn = usePortfolioStore((state) => state.isLampOn);
  const toggleLamp = usePortfolioStore((state) => state.toggleLamp);
  const setHoveredObject = usePortfolioStore((state) => state.setHoveredObject);
  const [hovered, setHovered] = useState(false);

  const pointerDownRef = useRef({ x: 0, y: 0, time: 0 });

  const handlePointerDown = (e) => {
    pointerDownRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    const dx = Math.abs(e.clientX - pointerDownRef.current.x);
    const dy = Math.abs(e.clientY - pointerDownRef.current.y);
    const dt = Date.now() - pointerDownRef.current.time;
    if (dx < 12 && dy < 12 && dt < 450) {
      toggleLamp();
    }
  };

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        toggleLamp();
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredObject('Desk Lamp (Click to Toggle Light)');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredObject(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Heavy Circular Base */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.08, 32]} />
        <meshStandardMaterial
          color={hovered ? '#38bdf8' : '#1e293b'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Switch Button */}
      <mesh position={[0.08, 0.085, 0.08]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
        <meshStandardMaterial color={isLampOn ? '#00ff88' : '#64748b'} />
      </mesh>

      {/* Lower Stem */}
      <mesh position={[-0.05, 0.45, -0.05]} rotation={[0.2, 0, -0.25]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.8, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Articulated Joint */}
      <mesh position={[-0.14, 0.85, -0.1]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Upper Angled Arm */}
      <mesh position={[-0.32, 1.15, 0.02]} rotation={[-0.45, 0.2, 0.6]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.75, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Lamp Shade / Cone */}
      <mesh position={[-0.52, 1.25, 0.16]} rotation={[0.6, 0.4, -0.9]} castShadow>
        <coneGeometry args={[0.22, 0.35, 32, 1, true]} />
        <meshStandardMaterial
          color={hovered ? '#0ea5e9' : '#0f172a'}
          metalness={0.7}
          roughness={0.2}
          side={2}
        />
      </mesh>

      {/* Glowing Light Bulb */}
      <mesh position={[-0.54, 1.2, 0.18]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={isLampOn ? '#fffbeb' : '#475569'}
          emissive={isLampOn ? '#fbbf24' : '#000000'}
          emissiveIntensity={isLampOn ? 2.5 : 0}
        />
      </mesh>
    </group>
  );
}
