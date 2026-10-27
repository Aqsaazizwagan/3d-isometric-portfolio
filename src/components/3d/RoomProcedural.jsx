import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export function RoomProcedural() {
  const isDarkMode = usePortfolioStore((state) => state.isDarkMode);
  const steamRef = useRef();

  // Gentle animated rising steam for the coffee mug
  useFrame(({ clock }) => {
    if (steamRef.current) {
      const t = clock.getElapsedTime();
      steamRef.current.position.y = 0.22 + Math.sin(t * 3) * 0.04;
      steamRef.current.scale.setScalar(0.9 + Math.cos(t * 2.5) * 0.15);
    }
  });

  // Bruno Simon Saturated Color Palettes
  // Night: Cyber Tokyo / Synthwave (Rich Indigo, Vibrant Magenta, Cyan, Warm Gold)
  // Day: Warm Toy / Architectural Studio (Terracotta, Mint, Warm Oak, Crisp White)
  const floorBaseColor = isDarkMode ? '#111827' : '#e2e8f0';
  const floorTileColor = isDarkMode ? '#1e1b4b' : '#f8fafc';
  const wallColor = isDarkMode ? '#0f172a' : '#f1f5f9';
  const slatColor = isDarkMode ? '#312e81' : '#cbd5e1';
  const deskTopColor = isDarkMode ? '#1e293b' : '#d97706'; // Rich dark graphite or warm golden honey teak
  const rugColor = isDarkMode ? '#2e1065' : '#0284c7';

  return (
    <group>
      {/* ================= 1. ISOMETRIC ROOM PLATFORM ================= */}
      {/* Beveled Main Platform Base */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <boxGeometry args={[11.4, 0.8, 11.4]} />
        <meshStandardMaterial
          color={floorBaseColor}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Bruno Simon Glowing Neon Platform Bevel Edge Trim */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[11.45, 0.05, 11.45]} />
        <meshBasicMaterial color={isDarkMode ? '#00f0ff' : '#38bdf8'} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[11.5, 0.04, 11.5]} />
        <meshBasicMaterial color={isDarkMode ? '#ff007f' : '#f43f5e'} />
      </mesh>

      {/* Stylized Floor Grid with Contrast */}
      <mesh position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[11.2, 11.2]} />
        <meshStandardMaterial
          color={floorTileColor}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      <gridHelper
        args={[11.2, 22, isDarkMode ? '#a855f7' : '#94a3b8', isDarkMode ? '#38bdf8' : '#e2e8f0']}
        position={[0, 0.015, 0]}
      />

      {/* Bruno Simon Bold Geometric Designer Rug */}
      <group position={[0, 0.02, 0.8]}>
        <mesh receiveShadow>
          <boxGeometry args={[5.2, 0.02, 4.2]} />
          <meshStandardMaterial color={rugColor} roughness={0.8} />
        </mesh>
        {/* Colorful Rug Patterns / Stripes */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[5.0, 0.005, 0.35]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
        <mesh position={[0, 0.015, 0.8]}>
          <boxGeometry args={[5.0, 0.005, 0.2]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.015, -0.8]}>
          <boxGeometry args={[5.0, 0.005, 0.2]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      </group>

      {/* ================= 2. ARCHITECTURAL WALLS ================= */}
      {/* Back Wall */}
      <mesh position={[0, 3.6, -5.5]} receiveShadow>
        <boxGeometry args={[11.4, 7.2, 0.4]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5.5, 3.6, 0]} receiveShadow>
        <boxGeometry args={[0.4, 7.2, 11.4]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* Neon Cyber Sign on Back Wall: "CREATE // INNOVATE" */}
      <group position={[0.2, 6.2, -5.25]}>
        {/* Neon Backing Plate */}
        <mesh>
          <boxGeometry args={[4.8, 0.65, 0.04]} />
          <meshStandardMaterial color="#030712" roughness={0.9} />
        </mesh>
        {/* Glowing Neon Bar Accent Top */}
        <mesh position={[0, 0.26, 0.03]}>
          <boxGeometry args={[4.6, 0.04, 0.02]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        {/* Glowing Neon Bar Accent Bottom */}
        <mesh position={[0, -0.26, 0.03]}>
          <boxGeometry args={[4.6, 0.04, 0.02]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
        {/* Glowing Center Core */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[4.4, 0.35, 0.01]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#a855f7"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Acoustic Vertical Wood Slats on Back Wall */}
      {[-4.8, -4.4, -4.0, -3.6, -3.2, -2.8, -2.4].map((x, idx) => (
        <mesh key={`slat-${idx}`} position={[x, 3.6, -5.25]} castShadow>
          <boxGeometry args={[0.18, 6.8, 0.08]} />
          <meshStandardMaterial color={slatColor} roughness={0.5} />
        </mesh>
      ))}

      {/* Left Wall: Futuristic Skyline Window with Glowing Horizon */}
      <group position={[-5.25, 4.0, 1.2]}>
        {/* Window Deep Frame */}
        <mesh castShadow>
          <boxGeometry args={[0.12, 3.4, 4.6]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Glowing Sunset / Tokyo Cyber Sky Vista */}
        <mesh position={[0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[4.3, 3.1]} />
          <meshBasicMaterial color={isDarkMode ? '#4c1d95' : '#38bdf8'} />
        </mesh>
        {/* Glowing Horizon Neon Strip */}
        <mesh position={[0.05, -0.4, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[4.3, 0.08]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
        {/* Glowing Sun / Moon Orb */}
        <mesh position={[0.05, 0.4, -0.8]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.7, 32]} />
          <meshBasicMaterial color={isDarkMode ? '#00f0ff' : '#fde047'} />
        </mesh>
        {/* Window Horizontal Mullions */}
        <mesh position={[0.07, 0, 0]}>
          <boxGeometry args={[0.04, 0.08, 4.4]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
        <mesh position={[0.07, 0, 0]}>
          <boxGeometry args={[0.04, 3.2, 0.08]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
      </group>

      {/* ================= 3. MODERN WORKSTATION DESK ================= */}
      <group position={[0, 0, 0]}>
        {/* Solid Desktop Surface */}
        <mesh position={[0, 1.76, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[4.6, 0.12, 2.3]} />
          <meshStandardMaterial
            color={deskTopColor}
            metalness={0.15}
            roughness={0.3}
          />
        </mesh>

        {/* Dual Neon Edge Trim along the desk */}
        <mesh position={[0, 1.76, 1.36]}>
          <boxGeometry args={[4.62, 0.03, 0.02]} />
          <meshBasicMaterial color={isDarkMode ? '#00f0ff' : '#0284c7'} />
        </mesh>
        <mesh position={[0, 1.72, 1.36]}>
          <boxGeometry args={[4.62, 0.02, 0.02]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>

        {/* Heavy Industrial Desk Legs with Crossbars */}
        {[-2.1, 2.1].map((x, idx) => (
          <group key={`leg-pair-${idx}`} position={[x, 0, 0]}>
            {/* Front Leg */}
            <mesh position={[0, 0.85, 1.05]} castShadow>
              <boxGeometry args={[0.12, 1.7, 0.12]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Back Leg */}
            <mesh position={[0, 0.85, -0.65]} castShadow>
              <boxGeometry args={[0.12, 1.7, 0.12]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Lower Foot Crossbar */}
            <mesh position={[0, 0.06, 0.2]} castShadow>
              <boxGeometry args={[0.14, 0.1, 1.9]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Giant Cyber Desk Mat */}
        <mesh position={[0, 1.825, 0.35]} receiveShadow>
          <boxGeometry args={[3.2, 0.015, 1.6]} />
          <meshStandardMaterial color="#090d16" roughness={0.8} />
        </mesh>
        {/* Desk Mat Glowing Edge */}
        <mesh position={[0, 1.83, 0.35]}>
          <boxGeometry args={[3.22, 0.01, 1.62]} />
          <meshBasicMaterial color="#a855f7" wireframe />
        </mesh>

        {/* 🖥️ CURVED ULTRAWIDE WORKSTATION MONITOR (Mounted in background) */}
        <group position={[0, 2.75, -0.35]}>
          {/* Heavy Metal Stand */}
          <mesh position={[0, -0.5, -0.1]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 1.0, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.92, -0.05]} castShadow>
            <boxGeometry args={[0.6, 0.04, 0.4]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>

          {/* Ultrawide Monitor Outer Bezel */}
          <mesh castShadow>
            <boxGeometry args={[2.7, 1.0, 0.08]} />
            <meshStandardMaterial color="#090d16" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Glowing Cyber Screen Wallpaper */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[2.62, 0.92]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive={isDarkMode ? '#0369a1' : '#0284c7'}
              emissiveIntensity={1.2}
              roughness={0.2}
            />
          </mesh>

          {/* Monitor Screen Matrix Code Stripes */}
          {[-0.9, -0.4, 0.1, 0.6, 1.0].map((mx, mIdx) => (
            <mesh key={`monitor-code-${mIdx}`} position={[mx, 0, 0.05]}>
              <planeGeometry args={[0.35, 0.8]} />
              <meshBasicMaterial color={mIdx % 2 === 0 ? '#00f0ff' : '#00ff88'} />
            </mesh>
          ))}
        </group>

        {/* RGB Mechanical Keyboard */}
        <group position={[0, 1.84, 0.9]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.035, 0.4]} />
            <meshStandardMaterial color="#0f172a" metalness={0.7} />
          </mesh>
          {/* Glowing Rainbow RGB Lightstrip underneath */}
          <mesh position={[0, -0.01, 0]}>
            <boxGeometry args={[1.12, 0.015, 0.42]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Gaming Mouse */}
        <group position={[0.75, 1.84, 0.88]}>
          <mesh castShadow>
            <boxGeometry args={[0.14, 0.035, 0.22]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Mouse LED Wheel */}
          <mesh position={[0, 0.02, -0.04]}>
            <boxGeometry args={[0.02, 0.01, 0.06]} />
            <meshBasicMaterial color="#ff007f" />
          </mesh>
        </group>

        {/* KRK-Style Studio Monitor Speakers with Vibrant Gold Cones */}
        {[-1.8, 1.8].map((sx, idx) => (
          <group key={`speaker-${idx}`} position={[sx, 2.2, 0.0]} rotation={[0, idx === 0 ? 0.35 : -0.35, 0]}>
            {/* Speaker Cabinet */}
            <mesh castShadow>
              <boxGeometry args={[0.48, 0.75, 0.48]} />
              <meshStandardMaterial color="#090d16" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Tweeter Cone */}
            <mesh position={[0, 0.15, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 24]} />
              <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
            </mesh>
            {/* Iconic Vibrant Yellow Woofer Cone */}
            <mesh position={[0, -0.15, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.02, 24]} />
              <meshStandardMaterial color="#facc15" roughness={0.2} metalness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Steaming Ceramic Coffee Mug */}
        <group position={[-1.1, 1.84, 0.75]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.12, 0.1, 0.26, 24]} />
            <meshStandardMaterial color="#ff007f" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.11, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.02, 24]} />
            <meshStandardMaterial color="#271810" />
          </mesh>
          {/* Animated Rising Steam */}
          <mesh ref={steamRef} position={[0, 0.24, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
          </mesh>
        </group>
      </group>

      {/* ================= 4. WALL SHELVES & DECOR ================= */}
      <group position={[0, 4.4, -5.0]}>
        {/* Floating Shelf Board */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.08, 0.7]} />
          <meshStandardMaterial color={isDarkMode ? '#1e293b' : '#334155'} metalness={0.6} />
        </mesh>
        {/* Neon Under-glow */}
        <mesh position={[0, -0.045, 0.25]}>
          <boxGeometry args={[4.0, 0.02, 0.02]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>

        {/* Stack of Vibrant Tech Books */}
        <group position={[-1.3, 0.26, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.14, 0.46, 0.48]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0.16, 0, 0]} castShadow>
            <boxGeometry args={[0.14, 0.5, 0.5]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
          <mesh position={[0.3, -0.04, 0]} rotation={[0, 0, -0.16]} castShadow>
            <boxGeometry args={[0.12, 0.44, 0.46]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        </group>

        {/* Retro Game Cartridge / Toy Mech */}
        <group position={[0.1, 0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.32, 0.1]} />
            <meshStandardMaterial color="#facc15" />
          </mesh>
          <mesh position={[0, 0.05, 0.06]}>
            <planeGeometry args={[0.22, 0.16]} />
            <meshBasicMaterial color="#ff007f" />
          </mesh>
        </group>

        {/* Potted Bonsai / Plant */}
        <group position={[1.4, 0.2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.18, 0.14, 0.3, 16]} />
            <meshStandardMaterial color="#f97316" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <dodecahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#22c55e" roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* Designer Floor Potted Monstera Plant in Corner */}
      <group position={[4.6, 0, -4.2]}>
        {/* Faceted Geometric Pot */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.3, 1.0, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 12]} />
          <meshStandardMaterial color="#292524" />
        </mesh>
        {/* Lush Green Foliage */}
        {[0, 1.2, 2.4, 3.6, 4.8].map((angle, idx) => (
          <mesh
            key={`leaf-${idx}`}
            position={[Math.cos(angle) * 0.25, 1.4 + idx * 0.12, Math.sin(angle) * 0.25]}
            rotation={[0.3, angle, 0.4]}
            castShadow
          >
            <boxGeometry args={[0.4, 0.02, 0.7]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#16a34a' : '#22c55e'} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
