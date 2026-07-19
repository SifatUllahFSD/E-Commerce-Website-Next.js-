"use client";

import { useEffect, useState } from "react";

function getTimeLeft(endTime) {
  const diff = endTime - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ hoursFromNow }) {
  const [endTime] = useState(() => Date.now() + hoursFromNow * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const pad = (num) => String(num).padStart(2, "0");

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="bg-[var(--color-ink)] text-white w-12 h-12 flex items-center justify-center text-lg font-medium rounded-md">
            {pad(unit.value)}
          </div>
          <span className="text-[10px] tracking-wider text-[var(--color-ink-soft)] mr-1">
            {unit.label}
          </span>
          {i < units.length - 1 && <span className="text-[var(--color-ink-soft)]">:</span>}
        </div>
      ))}
    </div>
  );
}
