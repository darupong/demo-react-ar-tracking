import { useEffect, useRef, useState } from 'react';
import './ARScene.css';

interface ARSceneProps {
  imageTargetSrc?: string;
}

// A-Frame scene element interface
interface AFrameScene extends HTMLElement {
  hasLoaded: boolean;
  systems: {
    'mindar-image-system': {
      start: () => void;
      stop: () => void;
    };
  };
}

// Component for AR Scene using AFRAME
const ARScene: React.FC<ARSceneProps> = ({
  imageTargetSrc = '/targets/targets.mind' // ใช้ target ของคุณเอง
}) => {
  const sceneRef = useRef<AFrameScene | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isARStarted, setIsARStarted] = useState(false);
  const [isARReady, setIsARReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  console.log('🎨 ARScene component rendered');
  console.log('📍 imageTargetSrc:', imageTargetSrc);

  // Check if A-Frame is loaded
  useEffect(() => {
    const checkAFrame = setInterval(() => {
      if (window.AFRAME) {
        console.log('✅ A-Frame loaded successfully');
        clearInterval(checkAFrame);
      } else {
        console.log('⏳ Waiting for A-Frame to load...');
      }
    }, 500);

    return () => clearInterval(checkAFrame);
  }, []);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    
    if (!sceneEl) return;

    // Wait for AFRAME scene to be loaded
    const handleLoaded = () => {
      setIsARReady(true);
      console.log('AR Scene loaded');
    };

    // Handle AR events
    const handleARReady = () => {
      console.log('AR is ready');
    };

    const handleARError = (event: Event) => {
      console.error('AR Error:', (event as CustomEvent).detail);
    };

    const handleTargetFound = () => {
      console.log('Target found!');
    };

    const handleTargetLost = () => {
      console.log('Target lost!');
    };

    if (sceneEl.hasLoaded) {
      handleLoaded();
    } else {
      sceneEl.addEventListener('loaded', handleLoaded);
    }

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

  // Start AR tracking
  const startAR = async () => {
    console.log('🎬 Starting AR...');
    setCameraError(null);
    
    // Request camera permission first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      console.log('✅ Camera permission granted');
      stream.getTracks().forEach(track => track.stop()); // Stop test stream
    } catch (err) {
      const error = err as Error;
      console.error('❌ Camera permission denied:', error);
      setCameraError(`Camera Error: ${error.message}`);
      return;
    }
    
    const sceneEl = sceneRef.current;
    console.log('Scene element:', sceneEl);
    console.log('Is AR Ready:', isARReady);
    
    if (sceneEl && isARReady) {
      const arSystem = sceneEl.systems['mindar-image-system'];
      console.log('AR System:', arSystem);
      
      if (arSystem) {
        console.log('✅ Starting AR tracking...');
        try {
          await arSystem.start();
          setIsARStarted(true);
          requestAnimationFrame(() => applyCameraFeedStyles());
          console.log('✅ AR Started!');
        } catch (err) {
          console.error('❌ Failed to start AR:', err);
          setCameraError('Failed to start AR. Check console for details.');
        }
      } else {
        console.error('❌ AR System not found!');
        setCameraError('AR System not initialized');
      }
    } else {
      console.error('❌ Scene not ready:', { sceneEl, isARReady });
      setCameraError('AR Scene not ready');
    }
  };

  // Stop AR tracking
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

  // Collect all video/canvas inside container (traverse into shadow roots)
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

  // Inject CSS into a-scene shadow root so video/canvas get full-bleed (CSS doesn't pierce shadow DOM)
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

  // Force full viewport: style video/canvas and ancestors (query from container so we find MindAR elements)
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
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      width: '100%',
      height: '100%',
      minWidth: '100%',
      minHeight: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
    };
    const parentFull: Record<string, string> = {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
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

  // When AR starts: apply styles, watch for late-added video/canvas, re-apply every frame
  useEffect(() => {
    if (!isARStarted) return;
    const container = containerRef.current;
    const apply = () => applyCameraFeedStyles();
    apply();
    const delayed = [0, 50, 150, 300, 500, 1000].map((ms) => setTimeout(apply, ms));
    const observer = new MutationObserver(() => apply());
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only when isARStarted toggles
  }, [isARStarted]);

  console.log('🎬 Rendering AR container...');

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
      <div style={{ 
        position: 'relative', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '20px',
        zIndex: 999
      }}>

      </div>
      
      <a-scene
        ref={(sceneEl: unknown) => {
          sceneRef.current = sceneEl as AFrameScene | null;
        }}
        mindar-image={`imageTargetSrc: ${imageTargetSrc}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights, antialias: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        embedded
      >
        <a-assets>
          {/* 
            วางรูป target image ของคุณที่นี่ (ถ้าต้องการแสดงบน AR)
            ตัวอย่าง:
            <img id="targetImage" src="/targets/your-target-image.png" />
          */}
          
          {/* Crab Model - โหลดจาก public/model/ */}
          <a-asset-item
            id="crabModel"
            src="/model/scene.gltf"
          ></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          {/* 
            ถ้าต้องการแสดงรูป target บน AR ให้ uncomment บรรทัดด้านล่าง:
            <a-plane src="#targetImage" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
          */}
          
          {/* Crab 3D Model */}
          <a-gltf-model
            src="#crabModel"
            position="0 -0.5 0"
            scale="2 2 2"
            rotation="0 0 0"
            animation__rotate="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"
            // animation__float="property: position; to: 0 00 0; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-gltf-model>
        </a-entity>
      </a-scene>

      {/* Control buttons */}
      <div className="ar-controls" style={{ zIndex: 1001 }}>
        {!isARStarted ? (
          <button
            onClick={startAR}
            disabled={!isARReady}
            className="btn btn-start"
            style={{ position: 'relative', zIndex: 1002 }}
          >
            {isARReady ? 'Start AR' : 'Loading...'}
          </button>
        ) : (
          <button onClick={stopAR} className="btn btn-stop" style={{ position: 'relative', zIndex: 1002 }}>
            Stop AR
          </button>
        )}
      </div>

      {/* Error Message */}
      {cameraError && (
        <div className="ar-instructions" style={{ background: 'rgba(220, 38, 38, 0.9)', zIndex: 1001 }}>
          <p style={{ margin: 0 }}>❌ {cameraError}</p>
        </div>
      )}

      {/* Instructions */}
      {isARStarted && !cameraError && (
        <div className="ar-instructions" style={{ zIndex: 1001 }}>
          <p>🎯 Point your camera at your custom target image</p>
          <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>
            Using: <strong>targets.mind</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ARScene;
