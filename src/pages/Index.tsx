import { useState, useCallback, useRef } from "react";
import FloatingHobbies from "@/components/FloatingHobbies";
import FloatingHearts from "@/components/FloatingHearts";
import CelebrationEffects from "@/components/CelebrationEffects";
import Countdown from "@/components/Countdown";

const ESCAPE_TEXTS = [
  "No 😢",
  "Are you sure? 🥺",
  "Really sure?? 😭",
  "Think again... 💔",
  "Keep Trying 🥹",
];

const YES_GROWING = [1, 1.05, 1.12, 1.2, 1.3];

const Index = () => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [showDateReveal, setShowDateReveal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    const padding = 100;
    const maxX = window.innerWidth - padding * 2;
    const maxY = window.innerHeight - padding * 2;
    const x = Math.random() * maxX + padding;
    const y = Math.random() * maxY + padding;
    setNoPosition({ x, y });
    setNoAttempts((prev) => Math.min(prev + 1, ESCAPE_TEXTS.length - 1));
  }, []);

  const handleYes = () => {
    setAccepted(true);
    setTimeout(() => setShowDateReveal(true), 1500);
  };

  const yesScale = YES_GROWING[Math.min(noAttempts, YES_GROWING.length - 1)];

  if (accepted) {
    return (
      <div className="fixed inset-0 overflow-y-auto celebration-bg">
        <CelebrationEffects />
        <FloatingHobbies celebrate />

        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative z-10">
          {/* Photo with glowing heart frame */}
          <div className="relative mb-6 animate-[scale-in_0.6s_ease-out]">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-dashed border-primary/40 flex items-center justify-center bg-card/60 backdrop-blur-sm shadow-lg glow-frame">
              <span className="text-muted-foreground text-sm text-center px-4">
                Add your photo here 📸
              </span>
            </div>
          </div>

          <div className="animate-bounce text-6xl mb-3">🎉</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
            YAY!!! 💕
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-sm mb-2">
            I'll book the place,
          </p>
          <p className="text-base sm:text-lg font-semibold text-primary mb-8">
            (NOT HARDROCK CAFE TRUST) 😏
          </p>

          {/* Date Reveal */}
          <div
            className={`w-full max-w-sm transition-all duration-1000 ease-out ${
              showDateReveal
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-card/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-primary/15 mb-6">
              <div className="text-3xl mb-2">🎁</div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Our Valentine's Date Plan
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Get ready for the best day ever! ✨
              </p>
            </div>

            <Countdown />
          </div>

          <div className="mt-6 text-4xl flex gap-2">
            {"💖💝💗💘💓".split("").map((e, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: `float 2s ease-in-out ${i * 0.2}s infinite`,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        <footer className="text-center pb-6 text-xs text-muted-foreground/60 relative z-10">
          Made with love and a bit of AI by Tushar 💌
        </footer>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center p-6"
    >
      <FloatingHobbies />
      <FloatingHearts />

      <div className="flex flex-col items-center max-w-md w-full relative z-10">
        {/* Question */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-6 leading-tight">
          Will you be my{" "}
          <span className="text-primary">Valentine</span>? 💕
        </h1>

        {/* Photo placeholder */}
        <div
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden mb-8 shadow-lg border-4 border-dashed border-primary/30 flex items-center justify-center bg-card/50 backdrop-blur-sm"
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          <span className="text-muted-foreground text-sm text-center px-4">
            Add your photo here 📸
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center">
          <button
            onClick={handleYes}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg md:text-xl shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 min-w-[120px] yes-glow"
            style={{
              animation: "heartbeat 1.5s ease-in-out infinite",
              transform: `scale(${yesScale})`,
            }}
          >
            Yes 😍
          </button>

          {/* No button - either in flow or escaped */}
          {noPosition === null ? (
            <button
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              onClick={moveNoButton}
              className="px-6 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold text-base md:text-lg shadow hover:shadow-md min-w-[100px] transition-all duration-300"
            >
              {ESCAPE_TEXTS[noAttempts]}
            </button>
          ) : null}
        </div>
      </div>

      {/* Escaped No button - smooth sliding */}
      {noPosition !== null && (
        <button
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={moveNoButton}
          className="fixed px-6 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold text-base shadow z-50 min-w-[100px]"
          style={{
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.4s ease-out, top 0.4s ease-out",
          }}
        >
          {ESCAPE_TEXTS[noAttempts]}
        </button>
      )}

      <footer className="fixed bottom-4 text-xs text-muted-foreground/50">
        Made with love and a bit of AI by Tushar 💌
      </footer>
    </div>
  );
};

export default Index;
