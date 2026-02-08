import { useMemo } from "react";

const HOBBY_ITEMS = [
  { emoji: "🏸", label: "Badminton" },
  { emoji: "✈️", label: "Travel" },
  { emoji: "🏃‍♀️", label: "Running" },
  { emoji: "🔥", label: "Strava", isStrava: true },
  { emoji: "🥟", label: "Momos" },
  { emoji: "🍫", label: "Chocolate" },
  { emoji: "🛒", label: "Street Food" },
  { emoji: "🎾", label: "Shuttlecock" },
  { emoji: "🌍", label: "Explore" },
  { emoji: "🍬", label: "KinderJoy" },
];

interface FloatingHobbiesProps {
  celebrate?: boolean;
}

const CELEBRATE_EMOJIS = ["💖", "🎉", "💕", "✨", "🥳", "💗", "🎊", "💝", "❤️", "🎀", "💓"];

const FloatingHobbies = ({ celebrate = false }: FloatingHobbiesProps) => {
  const items = useMemo(() => {
    return HOBBY_ITEMS.map((item, i) => {
      const angle = (i / HOBBY_ITEMS.length) * 360;
      const radius = 38 + Math.random() * 18;
      const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
      const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
      const delay = i * 0.4;
      const duration = 3 + Math.random() * 2;
      return { ...item, x, y, delay, duration };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item, i) => (
        <span
          key={i}
          className="absolute text-2xl sm:text-3xl select-none transition-all duration-700"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animation: `hobby-float ${item.duration}s ease-in-out ${item.delay}s infinite`,
            opacity: 0.7,
            filter: celebrate ? "none" : "saturate(0.8)",
            transform: "translate(-50%, -50%)",
          }}
        >
          {celebrate ? CELEBRATE_EMOJIS[i % CELEBRATE_EMOJIS.length] : item.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHobbies;
