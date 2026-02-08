import { useState, useEffect } from "react";
const TARGET = new Date("2025-02-14T00:00:00+05:30").getTime();
const Countdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff % 86400000 / 3600000);
  const mins = Math.floor(diff % 3600000 / 60000);
  const secs = Math.floor(diff % 60000 / 1000);
  if (diff <= 0) {
    return <div className="text-center">
        <p className="text-2xl font-bold text-primary">
      </p>
      </div>;
  }
  const units = [{
    label: "Days",
    value: days
  }, {
    label: "Hours",
    value: hours
  }, {
    label: "Mins",
    value: mins
  }, {
    label: "Secs",
    value: secs
  }];
  return <div className="text-center">
      <p className="text-lg font-semibold text-muted-foreground mb-3">Countdown to Valentine's Day 💕</p>
      <div className="flex gap-3 justify-center">
        {units.map(u => <div key={u.label} className="bg-card/80 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[70px] shadow-md border border-primary/10">
            <div className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground font-medium">{u.label}</div>
          </div>)}
      </div>
    </div>;
};
export default Countdown;