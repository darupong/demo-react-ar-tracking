import { useState, useEffect } from 'react';
import ARScene from './components/ARScene';
import DebugPanel from './components/DebugPanel';

function App() {
  const [showAR, setShowAR] = useState(false);

  // Toggle body class when AR is active
  useEffect(() => {
    if (showAR) {
      document.body.classList.add('ar-active');
    } else {
      document.body.classList.remove('ar-active');
    }
    
    return () => {
      document.body.classList.remove('ar-active');
    };
  }, [showAR]);

  return (
    <div className="min-h-screen w-full">
      <DebugPanel />
      
      {!showAR ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl w-full">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4 sm:mb-6">
                <svg 
                  className="w-12 h-12 sm:w-16 sm:h-16 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
                MindAR Image Tracking
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
                Web Augmented Reality with React + Vite
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-white mb-2">Image Tracking</h3>
                <p className="text-slate-300 text-sm sm:text-base">Track and augment real-world images</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast & Responsive</h3>
                <p className="text-slate-300 text-sm sm:text-base">Built with React + Vite for optimal performance</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
                <div className="text-4xl sm:text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
                <p className="text-slate-300 text-sm sm:text-base">Simple integration with MindAR.js</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mb-8">
              <button 
                onClick={() => setShowAR(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch AR Experience
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">ℹ️</div>
                  <div className="flex-1">
                    <p className="text-slate-200 text-sm sm:text-base">
                      Make sure to allow camera access when prompted
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📸</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1 text-sm sm:text-base">Using your custom target image</p>
                    <p className="text-slate-300 text-sm">
                      Point your camera at the image you compiled in MindAR Compiler
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔗</div>
                  <div className="flex-1">
                    <p className="text-slate-300 text-sm">
                      Need a target?{' '}
                      <a 
                        href="https://hiukim.github.io/mind-ar-js-doc/tools/compile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline font-medium transition-colors"
                      >
                        Create one here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button 
            onClick={() => setShowAR(false)}
            className="fixed top-4 left-4 z-[9999] flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <ARScene />
        </>
      )}
    </div>
  );
}

export default App;
