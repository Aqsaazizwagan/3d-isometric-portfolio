import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function FloatingBadge({
  position = [0, 3, 0],
  text = 'CLICK ME',
  subtext = '',
  color = '#00f0ff',
  icon = '✨',
  onClick,
}) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle bouncy hover sine wave
      const t = clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(t * 2.5) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* 3D Pointer Diamond */}
      <mesh position={[0, -0.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Floating 2.5D Badge Tag */}
      <Html center distanceFactor={11} className="pointer-events-none select-none">
        <div
          onClick={onClick}
          className="pointer-events-auto cursor-pointer transform -translate-y-4 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-2xl font-mono border whitespace-nowrap"
            style={{
              backgroundColor: 'rgba(10, 15, 30, 0.88)',
              borderColor: color,
              boxShadow: `0 0 20px ${color}66, inset 0 0 10px ${color}33`,
            }}
          >
            <span className="text-sm animate-bounce">{icon}</span>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-black tracking-wider text-white uppercase drop-shadow">
                {text}
              </span>
              {subtext && (
                <span className="text-[9px] font-medium opacity-80" style={{ color }}>
                  {subtext}
                </span>
              )}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
