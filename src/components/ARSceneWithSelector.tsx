/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import './ARScene.css';
import './ModelSelector.css';

interface ModelConfig {
  name: string;
  src: string;
  scale: string;
  position: string;
  rotation: string;
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

// Available 3D models สำหรับเลือก
const AVAILABLE_MODELS: Record<string, ModelConfig> = {
  crab: {
    name: '🦀 Crab (Your Model)',
    src: '/model/scene.gltf',
    scale: '0.5 0.5 0.5',
    position: '0 0 0.1',
    rotation: '0 0 0',
  },
  duck: {
    name: '🦆 Duck',
    src: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
    scale: '0.001 0.001 0.001',
    position: '0 0 0.1',
    rotation: '0 0 0',
  },
  robot: {
    name: '🤖 Robot',
    src: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF/CesiumMan.gltf',
    scale: '0.2 0.2 0.2',
    position: '0 0 0',
    rotation: '-90 0 0',
  },
  avocado: {
    name: '🥑 Avocado',
    src: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf',
    scale: '0.05 0.05 0.05',
    position: '0 0 0.1',
    rotation: '0 0 0',
  },
};

// Component หลักที่มี Model Selector
const ARSceneWithSelector: React.FC = () => {
  const sceneRef = useRef<AFrameScene | null>(null);
  const [isARStarted, setIsARStarted] = useState(false);
  const [isARReady, setIsARReady] = useState(false);
  const [selectedModelKey, setSelectedModelKey] = useState('crab');

  const currentModel = AVAILABLE_MODELS[selectedModelKey];

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;

    const handleLoaded = () => {
      setIsARReady(true);
      console.log('AR Scene loaded');
    };

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
  const startAR = () => {
    const sceneEl = sceneRef.current;
    if (sceneEl && isARReady) {
      const arSystem = sceneEl.systems['mindar-image-system'];
      if (arSystem) {
        arSystem.start();
        setIsARStarted(true);
      }
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

  // เปลี่ยน model (ต้อง stop AR ก่อน)
  const handleModelChange = (modelKey: string) => {
    if (isARStarted) {
      stopAR();
    }
    setSelectedModelKey(modelKey);
    // Reload เพื่อโหลด model ใหม่
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="ar-container">
      <a-scene
        ref={(sceneEl:any) => {
          sceneRef.current = sceneEl as AFrameScene | null;
        }}
        mindar-image="imageTargetSrc: /targets/targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          {/* 
            ถ้าต้องการแสดงรูป target บน AR:
            <img id="targetImage" src="/targets/your-target-image.png" crossOrigin="anonymous" />
          */}
          <a-asset-item
            id="selectedModel"
            src={currentModel.src}
            crossOrigin="anonymous"
          ></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          {/* 
            ถ้าต้องการแสดงรูป target บน AR:
            <a-plane src="#targetImage" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
          */}
          
          <a-gltf-model
            src="#selectedModel"
            position={currentModel.position}
            scale={currentModel.scale}
            rotation={currentModel.rotation}
            animation__rotate="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"
            animation__float="property: position; to: 0 0.2 0.1; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-gltf-model>
        </a-entity>
      </a-scene>

      {/* Control buttons */}
      <div className="ar-controls">
        {!isARStarted ? (
          <button
            onClick={startAR}
            disabled={!isARReady}
            className="btn btn-start"
          >
            {isARReady ? 'Start AR' : 'Loading...'}
          </button>
        ) : (
          <button onClick={stopAR} className="btn btn-stop">
            Stop AR
          </button>
        )}
      </div>

      {/* Model selector - แสดงตอนยังไม่เริ่ม AR */}
      {!isARStarted && (
        <div className="model-selector">
          <h4>เลือก 3D Model:</h4>
          <div className="model-buttons">
            {Object.entries(AVAILABLE_MODELS).map(([key, model]) => (
              <button
                key={key}
                onClick={() => handleModelChange(key)}
                className={`model-btn ${selectedModelKey === key ? 'active' : ''}`}
                disabled={selectedModelKey === key}
              >
                {model.name}
              </button>
            ))}
          </div>
          <p className="model-info">
            Current: <strong>{currentModel.name}</strong>
          </p>
        </div>
      )}

      {/* Instructions */}
      {isARStarted && (
        <div className="ar-instructions">
          <p>
            Showing: <strong>{currentModel.name}</strong>
          </p>
          <p>🎯 Point your camera at your custom target image</p>
          <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>
            Using: <strong>targets.mind</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ARSceneWithSelector;
