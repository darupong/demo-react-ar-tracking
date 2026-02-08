/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import '../styles/DebugPanel.css';

interface DebugInfo {
  userAgent: string;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  hasCamera: boolean;
  isHTTPS: boolean;
  screenWidth: number;
  screenHeight: number;
}

/** Debug panel for AR video page: device, browser, camera. Same as singletracking. */
const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [cameraPermission, setCameraPermission] = useState<string>('unknown');

  useEffect(() => {
    const info: DebugInfo = {
      userAgent: navigator.userAgent,
      isIOS: /iPhone|iPad|iPod/.test(navigator.userAgent),
      isAndroid: /Android/.test(navigator.userAgent),
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      isChrome: /Chrome/.test(navigator.userAgent),
      hasCamera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
      isHTTPS: window.location.protocol === 'https:',
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    };
    setDebugInfo(info);
  }, []);

  const checkCameraPermission = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraPermission('not_supported');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission('granted');
      stream.getTracks().forEach(track => track.stop());
    } catch (error: unknown) {
      const err = error as { name?: string };
      if (err.name === 'NotAllowedError') setCameraPermission('denied');
      else if (err.name === 'NotFoundError') setCameraPermission('no_camera');
      else setCameraPermission('error: ' + (err.name || 'unknown'));
    }
  };

  useEffect(() => {
    if (isOpen) checkCameraPermission();
  }, [isOpen]);

  if (!debugInfo) return null;

  return (
    <>
      <button className="debug-toggle" onClick={() => setIsOpen(!isOpen)} title="Debug Info">🐛</button>
      {isOpen && (
        <div className="debug-panel">
          <div className="debug-header">
            <h3>🐛 Debug Info</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="debug-content">
            <section>
              <h4>Device</h4>
              <div className="debug-item"><span>iOS:</span><span className={debugInfo.isIOS ? 'success' : ''}>{debugInfo.isIOS ? '✅' : '❌'}</span></div>
              <div className="debug-item"><span>Android:</span><span className={debugInfo.isAndroid ? 'success' : ''}>{debugInfo.isAndroid ? '✅' : '❌'}</span></div>
              <div className="debug-item"><span>Screen:</span><span>{debugInfo.screenWidth} × {debugInfo.screenHeight}</span></div>
            </section>
            <section>
              <h4>Browser</h4>
              <div className="debug-item"><span>Safari:</span><span className={debugInfo.isSafari ? 'success' : ''}>{debugInfo.isSafari ? '✅' : '❌'}</span></div>
              <div className="debug-item"><span>Chrome:</span><span className={debugInfo.isChrome ? 'success' : ''}>{debugInfo.isChrome ? '✅' : '❌'}</span></div>
            </section>
            <section>
              <h4>Camera Support</h4>
              <div className="debug-item">
                <span>HTTPS:</span>
                <span className={debugInfo.isHTTPS ? 'success' : 'error'}>{debugInfo.isHTTPS ? '✅ Yes' : '❌ No (Required!)'}</span>
              </div>
              <div className="debug-item">
                <span>Media API:</span>
                <span className={debugInfo.hasCamera ? 'success' : 'error'}>{debugInfo.hasCamera ? '✅ Available' : '❌ Not Available'}</span>
              </div>
              <div className="debug-item">
                <span>Permission:</span>
                <span className={cameraPermission === 'granted' ? 'success' : cameraPermission === 'denied' ? 'error' : ''}>
                  {cameraPermission === 'granted' && '✅ Granted'}
                  {cameraPermission === 'denied' && '❌ Denied'}
                  {cameraPermission === 'no_camera' && '⚠️ No Camera'}
                  {cameraPermission === 'not_supported' && '❌ Not Supported'}
                  {cameraPermission === 'unknown' && '⏳ Checking...'}
                  {cameraPermission.startsWith('error') && '❌ ' + cameraPermission}
                </span>
              </div>
              {!debugInfo.isHTTPS && <div className="debug-warning">⚠️ Camera requires HTTPS on iOS/Android!</div>}
              {cameraPermission === 'denied' && <div className="debug-warning">⚠️ Camera access denied. Go to Settings → Safari → Camera → Allow</div>}
            </section>
            <section>
              <h4>User Agent</h4>
              <div className="debug-item user-agent"><small>{debugInfo.userAgent}</small></div>
            </section>
            <div className="debug-actions">
              <button onClick={checkCameraPermission} className="btn-refresh">🔄 Refresh Camera</button>
              <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(debugInfo, null, 2)); alert('Debug info copied!'); }} className="btn-copy">📋 Copy Info</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DebugPanel;
