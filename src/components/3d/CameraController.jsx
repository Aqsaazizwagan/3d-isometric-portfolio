import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export function CameraController({ controlsRef }) {
  const { camera } = useThree();
  const cameraView = usePortfolioStore((state) => state.cameraView);
  const cameraPresets = usePortfolioStore((state) => state.cameraPresets);
  const openModal = usePortfolioStore((state) => state.openModal);

  // Store active GSAP timeline to kill ongoing tween when a new one begins
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!controlsRef.current) return;

    const preset = cameraPresets[cameraView] || cameraPresets.isometric;
    const [posX, posY, posZ] = preset.position;
    const [targetX, targetY, targetZ] = preset.target;

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const duration = cameraView === 'isometric' ? 1.4 : 1.1;
    const ease = 'power3.inOut';

    // Create synchronized GSAP tween for camera position and orbit controls target
    const tl = gsap.timeline({
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.update();
        }
      },
      onComplete: () => {
        const state = usePortfolioStore.getState();
        // If camera focused on an interactive object and modal is not open yet, open modal
        if (cameraView !== 'isometric' && !state.activeModal) {
          openModal(cameraView);
        }
      },
    });

    // Animate camera position
    tl.to(
      camera.position,
      {
        x: posX,
        y: posY,
        z: posZ,
        duration,
        ease,
      },
      0
    );

    // Animate orbit controls target
    tl.to(
      controlsRef.current.target,
      {
        x: targetX,
        y: targetY,
        z: targetZ,
        duration,
        ease,
      },
      0
    );

    tweenRef.current = tl;

    return () => {
      if (tl) tl.kill();
    };
  }, [cameraView, cameraPresets, controlsRef, camera, openModal]);

  return null;
}
