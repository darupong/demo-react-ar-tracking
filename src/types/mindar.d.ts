/// <reference types="react" />

// Type definitions for MindAR
declare module 'mind-ar/dist/mindar-image.prod.js' {
  export class MindARThree {
    constructor(config: {
      container: HTMLElement;
      imageTargetSrc: string;
      maxTrack?: number;
      uiLoading?: 'yes' | 'no';
      uiScanning?: 'yes' | 'no';
      uiError?: 'yes' | 'no';
    });
    start(): Promise<void>;
    stop(): Promise<void>;
    addAnchor(targetIndex: number): ARAnchor;
  }

  export interface ARAnchor {
    group: THREE.Group;
    onTargetFound?: () => void;
    onTargetLost?: () => void;
  }
}

// Global types for MindAR and A-Frame scripts loaded via CDN
declare global {
  interface Window {
    MINDAR?: {
      IMAGE: {
        MindARThree: unknown;
      };
    };
    AFRAME?: unknown;
  }
}

export {};
