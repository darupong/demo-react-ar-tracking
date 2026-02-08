/** Hero header with icon, title and subtitle for the landing page. IMAI-style typography. */
function LandingHeader() {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="inline-flex items-center justify-center p-3 glass-panel rounded-full mb-4 sm:mb-6">
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16 text-foreground"
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
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight">
        Interactive Tracking Demo
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
        Web Augmented Reality development by IMAI GROUP CO.LTD.
      </p>
    </div>
  );
}

export default LandingHeader;
