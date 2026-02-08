import { useEffect, useMemo } from "react";
import confetti from "canvas-confetti";

const CelebrationEffects = () => {
  useEffect(() => {
    // Initial burst
    const burst = () => {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
      }, 300);
    };
    burst();

    // Ongoing gentle confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 15,
        spread: 60,
        origin: { x: Math.random(), y: -0.1 },
        gravity: 0.8,
        ticks: 200,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Rising hearts
  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 3,
        size: 14 + Math.random() * 18,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            left: `${h.left}%`,
            bottom: "-40px",
            fontSize: `${h.size}px`,
            animation: `heart-rise ${h.duration}s ease-out ${h.delay}s infinite`,
          }}
        >
          {["💖", "💕", "💗", "💝", "❤️"][i % 5]}
        </span>
      ))}
    </div>
  );
};

export default CelebrationEffects;
