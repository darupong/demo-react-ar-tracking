import { useEffect, useRef, useState } from 'react';
import '../styles/ARScene.css';
import TrackingTutorial from '../../../components/TrackingTutorial';

/** Same target as singletracking; shows video (Fish.mp4) on the target instead of 3D model. */
interface ARSceneVideoProps {
  imageTargetSrc?: string;
  videoSrc?: string;
  /** Video plane size in A-Frame units (default 1.6 x 0.9 = 16:9). */
  videoWidth?: number;
  videoHeight?: number;
}

/** Get the AR content video element (may be in scene or its shadowRoot). */
function getFishVideoEl(sceneEl: AFrameScene | null): HTMLVideoElement | null {
  if (!sceneEl) return null;
  const inLight = sceneEl.querySelector('#fishVideo');
  if (inLight && inLight.tagName === 'VIDEO') return inLight as HTMLVideoElement;
  const inShadow = sceneEl.shadowRoot?.getElementById('fishVideo');
  return (inShadow?.tagName === 'VIDEO' ? inShadow : null) as HTMLVideoElement | null;
}

interface AFrameScene extends HTMLElement {
  hasLoaded: boolean;
  systems: {
    'mindar-image-system': {
      start: () => void;
      stop: () => void;
    };
  };
}

const ARSceneVideo: React.FC<ARSceneVideoProps> = ({
  imageTargetSrc = '/targets/targets.mind',
  videoSrc = '/video/Fish.mp4',
  videoWidth = 1.6,
  videoHeight = 0.9,
}) => {
  const sceneRef = useRef<AFrameScene | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isARStarted, setIsARStarted] = useState(false);
  const [isARReady, setIsARReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    const checkAFrame = setInterval(() => {
      if (window.AFRAME) clearInterval(checkAFrame);
    }, 500);
    return () => clearInterval(checkAFrame);
  }, []);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;

    const handleLoaded = () => setIsARReady(true);
    const handleARError = (event: Event) => {
      console.error('AR Error:', (event as CustomEvent).detail);
    };
    const handleTargetFound = () => {
      const video = getFishVideoEl(sceneEl);
      if (video) video.play().catch(() => {});
    };
    const handleTargetLost = () => {
      const video = getFishVideoEl(sceneEl);
      if (video) video.pause();
    };

    if (sceneEl.hasLoaded) handleLoaded();
    else sceneEl.addEventListener('loaded', handleLoaded);
    sceneEl.addEventListener('arError', handleARError);
    sceneEl.addEventListener('targetFound', handleTargetFound);
    sceneEl.addEventListener('targetLost', handleTargetLost);

    return () => {
      sceneEl.removeEventListener('loaded', handleLoaded);
      sceneEl.removeEventListener('arError', handleARError);
      sceneEl.removeEventListener('targetFound', handleTargetFound);
      sceneEl.removeEventListener('targetLost', handleTargetLost);
    };
  }, []);

  /** Collect camera feed video/canvas only; skip AR content video (id fishVideo). */
  const getMediaInContainer = (container: HTMLElement): { videos: Element[]; canvases: Element[] } => {
    const videos: Element[] = [];
    const canvases: Element[] = [];
    const walk = (el: Element) => {
      if (el.tagName === 'VIDEO') {
        if (el.id !== 'fishVideo') videos.push(el);
      }
      if (el.tagName === 'CANVAS') canvases.push(el);
      const host = el as HTMLElement;
      if (host.shadowRoot) {
        for (const c of host.shadowRoot.children) walk(c as Element);
      }
      for (const c of el.children) walk(c as Element);
    };
    walk(container);
    return { videos, canvases };
  };

  const injectShadowStyles = (container: HTMLElement) => {
    const scene = container.querySelector('a-scene') as HTMLElement | null;
    const sr = scene?.shadowRoot;
    if (!sr) return;
    const id = 'ar-fullbleed-styles-video';
    if (sr.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      video:not(#fishVideo), canvas {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        min-width: 100% !important;
        min-height: 100% !important;
        object-fit: cover !important;
        object-position: center center !important;
        box-sizing: border-box !important;
      }
    `;
    sr.appendChild(style);
  };

  const applyCameraFeedStyles = () => {
    const container = containerRef.current;
    const vw = window.visualViewport?.width ?? window.innerWidth;
    const vh = window.visualViewport?.height ?? window.innerHeight;
    if (container) {
      container.style.width = `${vw}px`;
      container.style.height = `${vh}px`;
      injectShadowStyles(container);
    }
    if (!container) return;
    const { videos, canvases } = getMediaInContainer(container);
    const toKebab = (s: string) => s.replace(/([A-Z])/g, (_, c) => `-${c.toLowerCase()}`);
    const setStyle = (el: Element, style: Record<string, string>, useImportant = false) => {
      Object.entries(style).forEach(([key, value]) => {
        (el as HTMLElement).style.setProperty(toKebab(key), value, useImportant ? 'important' : '');
      });
    };
    const fullBleedStyle: Record<string, string> = {
      position: 'fixed',
      top: '0', left: '0', right: '0', bottom: '0',
      width: '100%', height: '100%', minWidth: '100%', minHeight: '100%',
      objectFit: 'cover', objectPosition: 'center center',
    };
    const parentFull: Record<string, string> = {
      position: 'fixed',
      top: '0', left: '0', right: '0', bottom: '0',
      width: '100%', height: '100%', overflow: 'hidden', boxSizing: 'border-box',
    };
    [...videos, ...canvases].forEach((el) => {
      setStyle(el, fullBleedStyle, true);
      let p: HTMLElement | null = el.parentElement;
      while (p && p !== container) {
        setStyle(p, parentFull, true);
        p = p.parentElement;
      }
    });
  };

  const startAR = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      setCameraError(`Camera Error: ${(err as Error).message}`);
      return;
    }

    const sceneEl = sceneRef.current;
    if (sceneEl && isARReady) {
      const arSystem = sceneEl.systems['mindar-image-system'];
      if (arSystem) {
        try {
          await arSystem.start();
          setIsARStarted(true);
          requestAnimationFrame(() => applyCameraFeedStyles());
        } catch {
          setCameraError('Failed to start AR. Check console for details.');
        }
      } else {
        setCameraError('AR System not initialized');
      }
    } else {
      setCameraError('AR Scene not ready');
    }
  };

  const stopAR = () => {
    const sceneEl = sceneRef.current;
    if (sceneEl) {
      const arSystem = sceneEl.systems['mindar-image-system'];
      if (arSystem) {
        arSystem.stop();
        setIsARStarted(false);
      }
    }
    const video = getFishVideoEl(sceneRef.current);
    if (video) video.pause();
  };

  useEffect(() => {
    if (!isARStarted) return;
    const container = containerRef.current;
    const apply = () => applyCameraFeedStyles();
    apply();
    const delayed = [0, 50, 150, 300, 500, 1000].map((ms) => setTimeout(apply, ms));
    const observer = new MutationObserver(() => apply());
    if (container) observer.observe(container, { childList: true, subtree: true });
    let rafId: number;
    const loop = () => {
      apply();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    const onViewportResize = () => apply();
    window.visualViewport?.addEventListener('resize', onViewportResize);
    window.visualViewport?.addEventListener('scroll', onViewportResize);
    return () => {
      delayed.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.visualViewport?.removeEventListener('resize', onViewportResize);
      window.visualViewport?.removeEventListener('scroll', onViewportResize);
      if (container) {
        container.style.width = '';
        container.style.height = '';
      }
    };
  }, [isARStarted]);

  return (
    <div
      ref={containerRef}
      className="ar-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: 1,
      }}
    >
      <a-scene
        ref={(el: unknown) => { sceneRef.current = el as AFrameScene | null; }}
        mindar-image={`imageTargetSrc: ${imageTargetSrc}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights, antialias: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        embedded
      >
        <a-assets>
          <video id="fishVideo" src={videoSrc} crossOrigin="anonymous" preload="auto" loop muted playsInline />
        </a-assets>
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          <a-video
            src="#fishVideo"
            position="0 0 0"
            width={String(videoWidth)}
            height={String(videoHeight)}
            rotation="0 0 0"
          ></a-video>
        </a-entity>
      </a-scene>

      {isARStarted && (
        <div className="ar-controls" style={{ zIndex: 1001 }}>
          <button onClick={stopAR} className="btn btn-stop" style={{ position: 'relative', zIndex: 1002 }}>Stop AR</button>
        </div>
      )}

      {cameraError && (
        <div className="ar-instructions ar-error" style={{ zIndex: 1001 }}>
          <p style={{ margin: 0 }}>❌ {cameraError}</p>
        </div>
      )}

      {isARStarted && !cameraError && (
        <div className="ar-instructions" style={{ zIndex: 1001 }}>
          <p>🎯 Point camera at target — video plays on detection</p>
          <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>Using: <strong>targets.mind</strong> · <strong>Fish.mp4</strong></p>
        </div>
      )}

      {!isARStarted && (
        <TrackingTutorial onStartAR={startAR} isARReady={isARReady} />
      )}
    </div>
  );
};

export default ARSceneVideo;
