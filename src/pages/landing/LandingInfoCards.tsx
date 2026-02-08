/** Info/tip cards (camera, target image, compiler link). Glass panel style (IMAI). */
function LandingInfoCards() {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="glass-panel rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">ℹ️</div>
          <div className="flex-1">
            <p className="text-foreground/90 text-sm sm:text-base">
              Make sure to allow camera access when prompted
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">📸</div>
          <div className="flex-1">
            <p className="text-foreground font-semibold mb-1 text-sm sm:text-base">Using your custom target image</p>
            <p className="text-muted-foreground text-sm">
              Point your camera at the image you compiled
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default LandingInfoCards;
