import { useState, useCallback, useRef } from "react";
import puppyImg from "@/assets/puppy.png";

const ESCAPE_TEXTS = [
  "No 😢",
  "Are you sure? 🥺",
  "Really sure?? 😭",
  "Think again... 💔",
  "I'll wait... 🥹",
];

const YES_GROWING = [1, 1.05, 1.12, 1.2, 1.3];

const Index = () => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [accepted, setAccepted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    const padding = 80;
    const maxX = window.innerWidth - padding * 2;
    const maxY = window.innerHeight - padding * 2;
    const x = Math.random() * maxX + padding;
    const y = Math.random() * maxY + padding;
    setNoPosition({ x, y });
    setNoAttempts((prev) => Math.min(prev + 1, ESCAPE_TEXTS.length - 1));
  }, []);

  const yesScale = YES_GROWING[Math.min(noAttempts, YES_GROWING.length - 1)];

  if (accepted) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-bounce text-7xl mb-4">🎉</div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
          Yaaay! 💕
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          I knew you'd say yes! 🥰
        </p>
        <div className="mt-6 text-5xl flex gap-2">
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
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center p-6"
    >
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Question */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-6 leading-tight">
          Will you be my{" "}
          <span className="text-primary">Valentine</span>? 💕
        </h1>

        {/* Puppy */}
        <div
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden mb-8 shadow-lg border-4 border-primary/20"
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          <img
            src={puppyImg}
            alt="Cute pleading puppy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setAccepted(true)}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[120px]"
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
              className="px-6 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold text-base md:text-lg shadow hover:shadow-md transition-all duration-200 min-w-[100px]"
            >
              {ESCAPE_TEXTS[noAttempts]}
            </button>
          ) : null}
        </div>
      </div>

      {/* Escaped No button */}
      {noPosition !== null && (
        <button
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={moveNoButton}
          className="fixed px-6 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold text-base shadow transition-all duration-300 z-50 min-w-[100px]"
          style={{
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {ESCAPE_TEXTS[noAttempts]}
        </button>
      )}
    </div>
  );
};

export default Index;
