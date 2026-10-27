import React, { useRef } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export function Lighting() {
  const isDarkMode = usePortfolioStore((state) => state.isDarkMode);
  const isLampOn = usePortfolioStore((state) => state.isLampOn);
  const deskLampTargetRef = useRef();

  return (
    <>
      {/* Invisible target for the desk lamp spotlight */}
      <object3D ref={deskLampTargetRef} position={[0.2, 1.6, 0.3]} />

      {/* Rich Hemisphere Sky/Ground Light for vibrant ambient fill (Never pitch black!) */}
      <hemisphereLight
        skyColor={isDarkMode ? '#38bdf8' : '#fef08a'}
        groundColor={isDarkMode ? '#4c1d95' : '#fed7aa'}
        intensity={isDarkMode ? 0.9 : 1.4}
      />

      {/* Global Ambient Lighting */}
      <ambientLight
        intensity={isDarkMode ? 0.8 : 1.3}
        color={isDarkMode ? '#6366f1' : '#ffffff'}
      />

      {/* Primary Key Directional Sun Light (High energy & sharp shadows) */}
      <directionalLight
        position={isDarkMode ? [8, 14, 9] : [12, 18, 10]}
        intensity={isDarkMode ? 2.2 : 2.8}
        color={isDarkMode ? '#93c5fd' : '#fffbeb'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.0003}
      />

      {/* Colorful Bruno Simon Fill Lights */}
      {/* Vibrant Neon Magenta accent fill from back-left */}
      <pointLight
        position={[-6, 5, -4]}
        intensity={isDarkMode ? 3.5 : 1.8}
        distance={14}
        color="#ff007f"
      />

      {/* Electric Cyber Cyan fill from front-right */}
      <pointLight
        position={[6, 4, 5]}
        intensity={isDarkMode ? 3.0 : 1.5}
        distance={13}
        color="#00f0ff"
      />

      {/* Neon Purple Shelf Bounce */}
      <pointLight
        position={[0, 5.2, -4.6]}
        intensity={isDarkMode ? 2.8 : 1.2}
        distance={9}
        color="#c084fc"
      />

      {/* Warm Golden Glow above Desk */}
      <pointLight
        position={[0, 3.2, 0.5]}
        intensity={isDarkMode ? 1.4 : 1.0}
        distance={7}
        color="#fbbf24"
      />

      {/* Desk Lamp Articulated Spotlight */}
      {isLampOn && (
        <spotLight
          position={[1.5, 3.4, 0.2]}
          target={deskLampTargetRef.current}
          angle={Math.PI / 4.2}
          penumbra={0.5}
          intensity={isDarkMode ? 5.5 : 3.8}
          color="#ffea9f"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0003}
        />
      )}
    </>
  );
}
