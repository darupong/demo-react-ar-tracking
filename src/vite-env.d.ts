/// <reference types="vite/client" />

// A-Frame JSX Elements (React 18 uses React.JSX)
import type { HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-assets': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-asset-item': HTMLAttributes<HTMLElement> & { id?: string; src?: string; crossOrigin?: string };
      'a-camera': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-entity': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-plane': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-gltf-model': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-light': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-box': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-sphere': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-cylinder': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-sky': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-text': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-image': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-video': HTMLAttributes<HTMLElement> & Record<string, unknown>;
      'a-sound': HTMLAttributes<HTMLElement> & Record<string, unknown>;
    }
  }
}
