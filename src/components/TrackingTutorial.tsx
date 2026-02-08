import './TrackingTutorial.css';

/** Public path for the AR tracking target image (same image used to compile .mind). */
export const TRACKING_IMAGE_PATH = '/images-tracking/3cee94ba-38d5-4613-9216-eb72d4b4ba50.jpeg';
const TRACKING_IMAGE_DOWNLOAD_NAME = 'ar-tracking-target.jpeg';

const DEFAULT_TITLE = 'วิธีใช้ AR (Video)';
const DEFAULT_STEPS =
  'ใช้ภาพนี้เป็น Target: พิมพ์หรือเปิดบนอีกเครื่อง แล้วกด Start AR จากนั้นชี้กล้องไปที่ภาพ วิดีโอจะเล่นเมื่อจับ target ได้';

interface TrackingTutorialProps {
  /** Panel title. */
  title?: string;
  /** Instruction text below the image. */
  stepsText?: string;
  /** When provided, show Start AR button below download. Click hides tutorial. */
  onStartAR?: () => void;
  isARReady?: boolean;
}

/** Triggers download of the tracking image. */
function downloadTrackingImage() {
  const a = document.createElement('a');
  a.href = TRACKING_IMAGE_PATH;
  a.download = TRACKING_IMAGE_DOWNLOAD_NAME;
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** Tutorial panel: target image, steps, download, and optional Start AR. Centered; responsive. */
function TrackingTutorial({
  title = DEFAULT_TITLE,
  stepsText = DEFAULT_STEPS,
  onStartAR,
  isARReady = false,
}: TrackingTutorialProps) {
  return (
    <div className="tracking-tutorial tracking-tutorial--center" style={{ zIndex: 1001 }}>
      <p className="tracking-tutorial__title">{title}</p>
      <div className="tracking-tutorial__image-wrap">
        <img
          src={TRACKING_IMAGE_PATH}
          alt="AR tracking target - use this image"
          className="tracking-tutorial__image"
        />
      </div>
      <p className="tracking-tutorial__steps">{stepsText}</p>
      <button type="button" className="tracking-tutorial__download-btn" onClick={downloadTrackingImage}>
        📥 ดาวน์โหลดรูป Target
      </button>
      {onStartAR && (
        <button
          type="button"
          className="tracking-tutorial__start-btn"
          onClick={onStartAR}
          disabled={!isARReady}
        >
          {isARReady ? 'Start AR' : 'Loading...'}
        </button>
      )}
    </div>
  );
}

export default TrackingTutorial;
