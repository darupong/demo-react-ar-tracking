import '../styles/MultiTrackingTutorial.css';

/** Paths for multi-tracking target images (Crab = target 0, Shrimp = target 1). */
export const CRAB_TRACKING_IMAGE = '/images-tracking/Crab-tracking.png';
export const SHRIMP_TRACKING_IMAGE = '/images-tracking/Shrimp-tracking.png';

interface MultiTrackingTutorialProps {
  onStartAR?: () => void;
  isARReady?: boolean;
}

function downloadImage(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** Tutorial for multi-target AR: Crab + Shrimp images, download each, Start AR. */
function MultiTrackingTutorial({ onStartAR, isARReady = false }: MultiTrackingTutorialProps) {
  return (
    <div className="multi-tracking-tutorial multi-tracking-tutorial--center" style={{ zIndex: 1001 }}>
      <p className="multi-tracking-tutorial__title">วิธีใช้ AR (Multi Target)</p>
      <p className="multi-tracking-tutorial__steps">
        ใช้สองภาพนี้เป็น Target: พิมพ์หรือเปิดบนอีกเครื่อง แล้วกด Start AR ชี้กล้องไปที่ภาพ Crab หรือ Shrimp โมเดล 3D จะแสดงตาม target ที่จับได้
      </p>

      <div className="multi-tracking-tutorial__images">
        <div className="multi-tracking-tutorial__item">
          <div className="multi-tracking-tutorial__image-wrap">
            <img src={CRAB_TRACKING_IMAGE} alt="Crab tracking target" className="multi-tracking-tutorial__image" />
          </div>
          <span className="multi-tracking-tutorial__label">Target 1 — Crab</span>
          <button
            type="button"
            className="multi-tracking-tutorial__download-btn"
            onClick={() => downloadImage(CRAB_TRACKING_IMAGE, 'Crab-tracking.png')}
          >
            📥 ดาวน์โหลด Crab
          </button>
        </div>
        <div className="multi-tracking-tutorial__item">
          <div className="multi-tracking-tutorial__image-wrap">
            <img src={SHRIMP_TRACKING_IMAGE} alt="Shrimp tracking target" className="multi-tracking-tutorial__image" />
          </div>
          <span className="multi-tracking-tutorial__label">Target 2 — Shrimp</span>
          <button
            type="button"
            className="multi-tracking-tutorial__download-btn"
            onClick={() => downloadImage(SHRIMP_TRACKING_IMAGE, 'Shrimp-tracking.png')}
          >
            📥 ดาวน์โหลด Shrimp
          </button>
        </div>
      </div>

      {onStartAR && (
        <button
          type="button"
          className="multi-tracking-tutorial__start-btn"
          onClick={onStartAR}
          disabled={!isARReady}
        >
          {isARReady ? 'Start AR' : 'Loading...'}
        </button>
      )}
    </div>
  );
}

export default MultiTrackingTutorial;
