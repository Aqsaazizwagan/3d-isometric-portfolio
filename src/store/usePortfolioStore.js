import { create } from 'zustand';
import { sounds } from '../utils/soundEffects';

export const usePortfolioStore = create((set, get) => ({
  // Active selected interactive element: 'laptop' | 'poster' | 'server' | 'lamp' | null
  activeObject: null,

  // Camera focus preset: 'isometric' | 'laptop' | 'poster' | 'server'
  cameraView: 'isometric',

  // Auto-rotation toggle (great for touchpads and hands-free view)
  isAutoRotating: false,

  // Day / Night mode toggle
  isDarkMode: true,

  // Desk Lamp toggleable state
  isLampOn: true,

  // Active Glassmorphism Modal: null | 'laptop' | 'poster' | 'server'
  activeModal: null,

  // Audio / Sound Effects enabled
  soundEnabled: true,

  // Currently hovered 3D object for HUD tooltip
  hoveredObject: null,

  // Target camera coordinates for each view preset
  cameraPresets: {
    isometric: {
      position: [11, 10, 11],
      target: [0, 1.2, 0],
      fov: 38,
    },
    laptop: {
      position: [0.3, 2.7, 1.8],
      target: [0, 2.15, 0.45],
      fov: 30,
    },
    poster: {
      position: [0.5, 4.4, 4.8],
      target: [0, 4.2, -4.7],
      fov: 35,
    },
    server: {
      position: [-2.1, 3.4, 2.4],
      target: [-4.2, 2.8, -1.2],
      fov: 32,
    },
  },

  // Focus on a 3D object & smoothly transition camera
  focusObject: (objectId, openModalImmediately = false) => {
    const { soundEnabled } = get();
    if (soundEnabled) {
      sounds.playClick();
      sounds.playSwoosh();
    }

    set({
      activeObject: objectId,
      cameraView: objectId,
      activeModal: openModalImmediately ? objectId : null,
      isAutoRotating: false, // pause auto-rotate during focus
    });
  },

  // Open modal directly (e.g. from HUD or after camera transition)
  openModal: (modalId) => {
    const { soundEnabled } = get();
    if (soundEnabled) {
      sounds.playModalOpen();
    }
    set({
      activeModal: modalId,
      activeObject: modalId,
      cameraView: modalId,
      isAutoRotating: false,
    });
  },

  // Close modal and smoothly glide camera back to isometric home view
  closeModal: () => {
    const { soundEnabled } = get();
    if (soundEnabled) {
      sounds.playClick();
      sounds.playSwoosh();
    }
    set({
      activeModal: null,
      activeObject: null,
      cameraView: 'isometric',
    });
  },

  // Smoothly reset camera to default isometric room perspective
  resetCamera: () => {
    const { soundEnabled } = get();
    if (soundEnabled) {
      sounds.playSwoosh();
    }
    set({
      activeObject: null,
      cameraView: 'isometric',
      activeModal: null,
    });
  },

  // Toggle Auto-Rotate Room
  toggleAutoRotate: () => {
    const { soundEnabled, isAutoRotating } = get();
    if (soundEnabled) {
      sounds.playClick();
    }
    set({ isAutoRotating: !isAutoRotating });
  },

  // Toggle Day / Night lighting mode
  toggleDarkMode: () => {
    const nextDark = !get().isDarkMode;
    const { soundEnabled } = get();
    if (soundEnabled) {
      sounds.playToggle(nextDark);
    }
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ isDarkMode: nextDark });
  },

  // Toggle Desk Lamp
  toggleLamp: () => {
    const { soundEnabled, isLampOn } = get();
    if (soundEnabled) {
      sounds.playClick();
    }
    set({ isLampOn: !isLampOn });
  },

  // Toggle Sound FX
  toggleSound: () => {
    const nextSound = !get().soundEnabled;
    if (nextSound) {
      sounds.playClick();
    }
    set({ soundEnabled: nextSound });
  },

  // Hover detection
  setHoveredObject: (objectId) => {
    set({ hoveredObject: objectId });
  },
}));
