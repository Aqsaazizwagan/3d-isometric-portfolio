import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Sparkles } from '@react-three/drei';
import { Lighting } from './Lighting';
import { RoomProcedural } from './RoomProcedural';
import { LaptopMesh } from './LaptopMesh';
import { ServerMesh } from './ServerMesh';
import { PosterMesh } from './PosterMesh';
import { DeskLampMesh } from './DeskLampMesh';
import { ChairMesh } from './ChairMesh';
import { CameraController } from './CameraController';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export function RoomCanvas() {
  const controlsRef = useRef();
  const isDarkMode = usePortfolioStore((state) => state.isDarkMode);
  const isAutoRotating = usePortfolioStore((state) => state.isAutoRotating);
  const activeModal = usePortfolioStore((state) => state.activeModal);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        camera={{
          position: [11, 10, 11],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Rich Atmospheric Background Tone (Never pitch black!) */}
        <color attach="background" args={[isDarkMode ? '#0d1322' : '#f8fafc']} />
        <fog attach="fog" args={[isDarkMode ? '#0d1322' : '#f8fafc', 16, 36]} />

        <Suspense fallback={null}>
          <Lighting />

          {/* ✨ Floating Stardust / Sparkles in Air */}
          <Sparkles
            count={50}
            scale={12}
            size={isDarkMode ? 3.5 : 2.5}
            speed={0.4}
            opacity={isDarkMode ? 0.75 : 0.4}
            color={isDarkMode ? '#00f0ff' : '#0284c7'}
          />
          <Sparkles
            count={30}
            scale={10}
            size={3.0}
            speed={0.3}
            opacity={0.6}
            color="#ff007f"
          />

          {/* Procedural Isometric Room Meshes */}
          <RoomProcedural />

          {/* Interactive Hardware Objects */}
          <LaptopMesh position={[0, 1.83, 0.35]} rotation={[0, -0.2, 0]} />
          <ServerMesh position={[-4.2, 0, -1.2]} rotation={[0, Math.PI / 4, 0]} />
          <PosterMesh position={[0, 4.3, -5.25]} />
          <DeskLampMesh position={[1.5, 1.82, 0.2]} />
          <ChairMesh position={[0, 0, 1.8]} rotation={[0, Math.PI - 0.35, 0]} />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.79, 0]}
            opacity={isDarkMode ? 0.85 : 0.4}
            scale={22}
            blur={1.8}
            far={10}
            resolution={1024}
            color={isDarkMode ? '#030712' : '#64748b'}
          />

          {/* GSAP Synchronized Camera Transition Controller */}
          <CameraController controlsRef={controlsRef} />

          {/* Damped Isometric OrbitControls optimized for Touchpad, Mouse & Mobile */}
          <OrbitControls
            ref={controlsRef}
            enabled={!activeModal}
            makeDefault
            enableDamping
            dampingFactor={0.06}
            rotateSpeed={0.8}
            zoomSpeed={0.65}
            panSpeed={0.7}
            maxPolarAngle={Math.PI / 2.05} // Do not flip under floor
            minPolarAngle={Math.PI / 6}
            minDistance={3.5}
            maxDistance={22}
            target={[0, 1.2, 0]}
            autoRotate={isAutoRotating && !activeModal}
            autoRotateSpeed={1.2}
            touches={{
              ONE: 1, // Touch rotate
              TWO: 2, // Touch pinch zoom
            }}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
