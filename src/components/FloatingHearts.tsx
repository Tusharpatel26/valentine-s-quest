import { useMemo } from "react";

const FloatingHearts = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4,
      size: 10 + Math.random() * 14,
      opacity: 0.12 + Math.random() * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            left: `${h.left}%`,
            bottom: "-30px",
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `heart-rise ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        >
          💗
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
