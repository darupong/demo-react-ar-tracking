interface FeatureItem {
  emoji: string;
  title: string;
  description: string;
  colSpan?: string;
}

const features: FeatureItem[] = [
  {
    emoji: '📱',
    title: 'Image Tracking',
    description: 'Track and augment real-world images',
  },
  {
    emoji: '⚡',
    title: 'Fast & Responsive',
    description: 'Built with React + Vite for optimal performance',
  },
  {
    emoji: '🎯',
    title: 'Easy to Use',
    description: 'Simple integration with MindAR.js',
    colSpan: 'sm:col-span-2 lg:col-span-1',
  },
];

/** Grid of feature cards on the landing page. Glass panel style (IMAI). */
function LandingFeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
      {features.map((item) => (
        <div
          key={item.title}
          className={`group glass-panel rounded-lg p-6 transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.02] ${item.colSpan ?? ''}`}
        >
          <div className="text-4xl sm:text-5xl mb-4">{item.emoji}</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
          <p className="text-muted-foreground text-sm sm:text-base">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default LandingFeatureCards;
