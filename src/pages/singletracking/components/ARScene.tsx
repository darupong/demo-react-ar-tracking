import { useEffect, useRef, useState } from 'react';
import '../styles/ARScene.css';

interface ARSceneProps {
  imageTargetSrc?: string;
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

const ARScene: React.FC<ARSceneProps> = ({
  imageTargetSrc = '/targets/targets.mind'
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
    const handleARReady = () => {};
    const handleARError = (event: Event) => {
      console.error('AR Error:', (event as CustomEvent).detail);
    };
    const handleTargetFound = () => {};
    const handleTargetLost = () => {};

    if (sceneEl.hasLoaded) handleLoaded();
    else sceneEl.addEventListener('loaded', handleLoaded);
    sceneEl.addEventListener('arReady', handleARReady);
    sceneEl.addEventListener('arError', handleARError);
    sceneEl.addEventListener('targetFound', handleTargetFound);
    sceneEl.addEventListener('targetLost', handleTargetLost);

    return () => {
      sceneEl.removeEventListener('loaded', handleLoaded);
      sceneEl.removeEventListener('arReady', handleARReady);
      sceneEl.removeEventListener('arError', handleARError);
      sceneEl.removeEventListener('targetFound', handleTargetFound);
      sceneEl.removeEventListener('targetLost', handleTargetLost);
    };
  }, []);

  const getMediaInContainer = (container: HTMLElement): { videos: Element[]; canvases: Element[] } => {
    const videos: Element[] = [];
    const canvases: Element[] = [];
    const walk = (el: Element) => {
      if (el.tagName === 'VIDEO') videos.push(el);
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
    const id = 'ar-fullbleed-styles';
    if (sr.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      video, canvas {
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
          <a-asset-item id="crabModel" src="/model/Crab/scene.gltf"></a-asset-item>
        </a-assets>
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            src="#crabModel"
            position="0 -0.5 0"
            scale="2 2 2"
            rotation="0 0 0"
            animation__rotate="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"
          ></a-gltf-model>
        </a-entity>
      </a-scene>

      <div className="ar-controls" style={{ zIndex: 1001 }}>
        {!isARStarted ? (
          <button onClick={startAR} disabled={!isARReady} className="btn btn-start" style={{ position: 'relative', zIndex: 1002 }}>
            {isARReady ? 'Start AR' : 'Loading...'}
          </button>
        ) : (
          <button onClick={stopAR} className="btn btn-stop" style={{ position: 'relative', zIndex: 1002 }}>Stop AR</button>
        )}
      </div>

      {cameraError && (
        <div className="ar-instructions ar-error" style={{ zIndex: 1001 }}>
          <p style={{ margin: 0 }}>❌ {cameraError}</p>
        </div>
      )}

      {isARStarted && !cameraError && (
        <div className="ar-instructions" style={{ zIndex: 1001 }}>
          <p>🎯 Point your camera at your custom target image</p>
          <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>Using: <strong>targets.mind</strong></p>
        </div>
      )}
    </div>
  );
};

export default ARScene;
