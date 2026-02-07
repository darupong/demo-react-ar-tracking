import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

/** Wraps page content with shared layout. DebugPanel is only shown in AR view to avoid requesting camera on landing. */
function MainLayout({ children }: MainLayoutProps) {
  return <div className="min-h-screen w-full">{children}</div>;
}

export default MainLayout;
