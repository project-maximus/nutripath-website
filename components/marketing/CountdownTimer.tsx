"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-01T00:00:00-04:00").getTime();

function getTimeLeft() {
  const diff = Math.max(TARGET - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4" aria-label="Countdown to launch">
      {units.map((unit) => (
        <div
          key={unit.key}
          className="flex w-16 flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-2 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-sm sm:w-20 sm:py-4"
        >
          <span className="font-heading text-2xl font-extrabold tabular-nums text-bright sm:text-3xl">
            {timeLeft ? String(timeLeft[unit.key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-white/50 sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
