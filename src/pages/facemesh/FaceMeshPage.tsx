import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import './styles/FaceMeshTutorial.css';

const FACE_TEXTURES = {
  prototype: '/face/canonical_face_model_uv_visualization.png',
  image1: '/face/face.png',
} as const;

type TextureOption = keyof typeof FACE_TEXTURES;

/** Face Mesh AR page at /facemesh. Same design as singletracking; controls in React, AR in iframe. */
function FaceMeshPage() {
  const [tutorialDismissed, setTutorialDismissed] = useState(false);
  const [isARStarted, setIsARStarted] = useState(false);
  const [textureOption, setTextureOption] = useState<TextureOption>('prototype');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    document.body.classList.add('ar-active');
    return () => document.body.classList.remove('ar-active');
  }, []);

  const sendToIframe = useCallback((message: string | { type: string; texture: string }) => {
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }, []);

  const startAR = () => {
    sendToIframe({ type: 'mindar-face-start', texture: FACE_TEXTURES[textureOption] });
    setIsARStarted(true);
  };

  const stopAR = () => {
    sendToIframe('mindar-face-stop');
    setIsARStarted(false);
  };

  const openARAndStart = () => {
    setTutorialDismissed(true);
    startAR();
  };

  return (
    <div className="facemesh-page">
      <Link
        to={ROUTES.home}
        className="fixed top-4 left-4 z-[9999] flex items-center gap-2 px-4 py-2 rounded-[0.75rem] font-medium transition-all duration-200 hover:scale-[1.02] border border-white/10 bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      {!tutorialDismissed && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 1000,
            }}
          />
          <div className="facemesh-tutorial">
            <p className="facemesh-tutorial__title">วิธีใช้ AR Face Mesh</p>
            <p className="facemesh-tutorial__steps">
              เลือก texture ด้านล่าง แล้วกด <strong>เปิด AR Face Mesh</strong> กล้องจะเปิดทันที ชี้กล้องที่ใบหน้าเพื่อดู overlay กด <strong>Stop AR</strong> เพื่อหยุด
            </p>
            <div className="facemesh-tutorial__options">
              <button
                type="button"
                className={`facemesh-tutorial__option ${textureOption === 'prototype' ? 'facemesh-tutorial__option--active' : ''}`}
                onClick={() => setTextureOption('prototype')}
              >
                Prototype
              </button>
              <button
                type="button"
                className={`facemesh-tutorial__option ${textureOption === 'image1' ? 'facemesh-tutorial__option--active' : ''}`}
                onClick={() => setTextureOption('image1')}
              >
                Image 1
              </button>
            </div>
            <button
              type="button"
              className="facemesh-tutorial__btn"
              onClick={openARAndStart}
            >
              เปิด AR Face Mesh
            </button>
          </div>
        </>
      )}

      <div className="ar-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
        <iframe
          ref={iframeRef}
          title="MindAR Face Mesh"
          src="/facemesh.html"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>

      <div className="ar-controls facemesh-page__controls" style={{ zIndex: 1001 }}>
        {!isARStarted ? (
          <>
            <button
              type="button"
              className={`btn facemesh-page__texture-btn ${textureOption === 'prototype' ? 'facemesh-page__texture-btn--active' : ''}`}
              onClick={() => setTextureOption('prototype')}
              style={{ position: 'relative', zIndex: 1002 }}
            >
              Prototype
            </button>
            <button
              type="button"
              className={`btn facemesh-page__texture-btn ${textureOption === 'image1' ? 'facemesh-page__texture-btn--active' : ''}`}
              onClick={() => setTextureOption('image1')}
              style={{ position: 'relative', zIndex: 1002 }}
            >
              Image 1
            </button>
            <button type="button" onClick={startAR} className="btn btn-start" style={{ position: 'relative', zIndex: 1002 }}>
              Start AR
            </button>
          </>
        ) : (
          <button type="button" onClick={stopAR} className="btn btn-stop" style={{ position: 'relative', zIndex: 1002 }}>
            Stop AR
          </button>
        )}
      </div>

      {isARStarted && (
        <div className="ar-instructions" style={{ zIndex: 1001 }}>
          <p>🎯 ชี้กล้องที่ใบหน้า — Face Mesh จะแสดง overlay</p>
        </div>
      )}
    </div>
  );
}

export default FaceMeshPage;
