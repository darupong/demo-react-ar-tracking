import MainLayout from '../../layouts/MainLayout';
import LandingHeader from './LandingHeader';
import LandingFeatureCards from './LandingFeatureCards';
import LandingCTA from './LandingCTA';
import LandingInfoCards from './LandingInfoCards';

/** Landing page: header, feature cards, CTA (Single Target Tracking), info cards. IMAI-style. */
function LandingPage() {
  return (
    <MainLayout>
      <div className="dark min-h-screen bg-neutral-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl w-full">
          <LandingHeader />
          <LandingFeatureCards />
          <LandingCTA />
          <LandingInfoCards />
        </div>
      </div>
    </MainLayout>
  );
}

export default LandingPage;
