import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ARSceneVideo from './components/ARSceneVideo';
import DebugPanel from './components/DebugPanel';
import { ROUTES } from '../../routes';

/** Single-target AR with video overlay at /singletracking-video. Same target as singletracking; shows Fish.mp4. */
function SingleTrackingVideoPage() {
  useEffect(() => {
    document.body.classList.add('ar-active');
    return () => document.body.classList.remove('ar-active');
  }, []);

  return (
    <>
      <DebugPanel />
      <Link
        to={ROUTES.home}
        className="fixed top-4 left-4 z-[9999] flex items-center gap-2 px-4 py-2 rounded-[0.75rem] font-medium transition-all duration-200 hover:scale-[1.02] border border-white/10 bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>
      {/* ปรับขนาดวิดีโอได้ที่ videoWidth, videoHeight (หน่วย A-Frame, default 1.6 x 0.9 = 16:9) */}
      <ARSceneVideo videoSrc="/video/Fish.mp4" videoWidth={1.0} videoHeight={0.6} />
    </>
  );
}

export default SingleTrackingVideoPage;
