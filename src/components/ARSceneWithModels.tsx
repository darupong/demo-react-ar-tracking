import { useEffect, useRef, useState } from 'react';
import './ARScene.css';

interface ARSceneWithModelsProps {
  selectedModel?: string;
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

// Available 3D models
const AVAILABLE_MODELS = {
  duck: {
    name: 'Duck',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
    scale: '0.001 0.001 0.001',
    position: '0 0 0.1',
    rotation: '0 0 0',
  },
  robot: {
    name: 'Robot',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF/CesiumMan.gltf',
    scale: '0.2 0.2 0.2',
    position: '0 0 0',
    rotation: '-90 0 0',
  },
  avocado: {
    name: 'Avocado',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf',
    scale: '0.05 0.05 0.05',
    position: '0 0 0.1',
    rotation: '0 0 0',
  },
  brain: {
    name: 'Brain',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem.gltf',
    scale: '0.5 0.5 0.5',
    position: '0 0 0.1',
    rotation: '0 0 0',
  },
  default: {
    name: 'Character',
    url: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/softmind/scene.gltf',
    scale: '0.005 0.005 0.005',
    position: '0 0 0.1',
    rotation: '0 0 0',
  },
};

// Component ตัวอย่างที่มี Model หลายแบบให้เลือก
const ARSceneWithModels: React.FC<ARSceneWithModelsProps> = ({
  selectedModel = 'default',
}) => {
  const sceneRef = useRef<AFrameScene | null>(null);
  const [isARStarted, setIsARStarted] = useState(false);
  const [isARReady, setIsARReady] = useState(false);
  const [currentModel, setCurrentModel] = useState(selectedModel);

  const model = AVAILABLE_MODELS[currentModel as keyof typeof AVAILABLE_MODELS] || AVAILABLE_MODELS.default;

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

  // เปลี่ยน model (ต้อง reload scene)
  const changeModel = (modelKey: string) => {
    stopAR();
    setCurrentModel(modelKey);
    // Reload page เพื่อโหลด model ใหม่
    window.location.reload();
  };

  return (
    <div className="ar-container">
      <a-scene
        ref={(sceneEl: unknown) => {
          sceneRef.current = sceneEl as AFrameScene | null;
        }}
        mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <img
            id="card"
            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png"
            crossOrigin="anonymous"
          />
          <a-asset-item
            id="currentModel"
            src={model.url}
            crossOrigin="anonymous"
          ></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane
            src="#card"
            position="0 0 0"
            height="0.552"
            width="1"
            rotation="0 0 0"
          ></a-plane>
          
          <a-gltf-model
            src="#currentModel"
            position={model.position}
            scale={model.scale}
            rotation={model.rotation}
            animation__rotate="property: rotation; to: 0 360 0; dur: 4000; loop: true; easing: linear"
            animation__float="property: position; to: 0 0.2 0.1; dur: 1500; loop: true; dir: alternate; easing: easeInOutQuad"
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

      {/* Model selector */}
      {!isARStarted && (
        <div className="model-selector">
          <h4>เลือก 3D Model:</h4>
          <div className="model-buttons">
            {Object.entries(AVAILABLE_MODELS).map(([key, { name }]) => (
              <button
                key={key}
                onClick={() => changeModel(key)}
                className={`model-btn ${currentModel === key ? 'active' : ''}`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {isARStarted && (
        <div className="ar-instructions">
          <p>Current Model: <strong>{model.name}</strong></p>
          <p>Point your camera at the target image</p>
          <a
            href="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png"
            target="_blank"
            rel="noopener noreferrer"
            className="target-link"
          >
            Download Target Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ARSceneWithModels;
