import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ARSceneMulti from './components/ARSceneMulti';
import DebugPanel from './components/DebugPanel';
import { ROUTES } from '../../routes';

/** Multi-target AR tracking page at /multitracking. Target 0 = Crab, Target 1 = Shrimp. */
function MultiTrackingPage() {
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
      <ARSceneMulti imageTargetSrc="/targets/multitarget/targetsm.mind" />
    </>
  );
}

export default MultiTrackingPage;
