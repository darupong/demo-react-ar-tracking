import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

const ctaClass =
  'group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-lg transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** CTA buttons: Single Target and Multi Target Tracking. IMAI-style. */
function LandingCTA() {
  return (
    <div className="text-center mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link to={ROUTES.singleTracking} className={ctaClass}>
        <span className="flex items-center gap-2">
          Single Target Tracking
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </Link>
      <Link to={ROUTES.multiTracking} className={ctaClass}>
        <span className="flex items-center gap-2">
          Multi Target Tracking
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </Link>
    </div>
  );
}

export default LandingCTA;
