import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export function ChairMesh({ position = [0, 0, 1.8], rotation = [0, Math.PI - 0.35, 0] }) {
  const [hovered, setHovered] = useState(false);
  const setHoveredObject = usePortfolioStore((state) => state.setHoveredObject);

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredObject('Racing Dev Gaming Chair');
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredObject(null);
      }}
    >
      {/* 5-Star Caster Base Spokes */}
      {[0, 72, 144, 216, 288].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={idx} rotation={[0, rad, 0]}>
            <mesh position={[0, 0.08, 0.4]} rotation={[0.1, 0, 0]} castShadow>
              <boxGeometry args={[0.08, 0.05, 0.8]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Small wheel caster */}
            <mesh position={[0, 0.05, 0.78]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.05, 12]} />
              <meshStandardMaterial color="#334155" roughness={0.5} />
            </mesh>
          </group>
        );
      })}

      {/* Chrome Hydraulic Cylinder */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.7, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Seat Cushion Base */}
      <mesh position={[0, 0.96, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.14, 1.05]} />
        <meshStandardMaterial
          color={hovered ? '#1e293b' : '#0f172a'}
          roughness={0.6}
        />
      </mesh>

      {/* Racing Cushion Accent Stripe */}
      <mesh position={[0, 1.04, 0]}>
        <boxGeometry args={[0.3, 0.01, 1.02]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Backrest Support Spine */}
      <mesh position={[0, 1.5, -0.48]} castShadow>
        <boxGeometry args={[0.14, 1.1, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>

      {/* Ergonomic Gaming Chair Backrest with Wings */}
      <mesh position={[0, 1.7, -0.44]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[1.0, 1.15, 0.09]} />
        <meshStandardMaterial
          color={hovered ? '#1e1b4b' : '#0f172a'}
          roughness={0.6}
        />
      </mesh>

      {/* Center Racing Stripe on Backrest */}
      <mesh position={[0, 1.7, -0.39]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.26, 1.12, 0.02]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>

      {/* Lumbar Support Pillow */}
      <mesh position={[0, 1.35, -0.37]}>
        <boxGeometry args={[0.75, 0.22, 0.07]} />
        <meshStandardMaterial color="#00f0ff" roughness={0.3} />
      </mesh>

      {/* Headrest Pillow */}
      <mesh position={[0, 2.15, -0.46]}>
        <boxGeometry args={[0.55, 0.2, 0.08]} />
        <meshStandardMaterial color="#a855f7" roughness={0.3} />
      </mesh>

      {/* Left Armrest */}
      <group position={[-0.55, 1.18, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.45, 12]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.23, 0.04]} castShadow>
          <boxGeometry args={[0.13, 0.04, 0.52]} />
          <meshStandardMaterial color="#020617" roughness={0.4} />
        </mesh>
      </group>

      {/* Right Armrest */}
      <group position={[0.55, 1.18, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.45, 12]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.23, 0.04]} castShadow>
          <boxGeometry args={[0.13, 0.04, 0.52]} />
          <meshStandardMaterial color="#020617" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
