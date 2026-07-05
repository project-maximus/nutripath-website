"use client";

import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import {
  ChatIcon,
  FlashcardIcon,
  TrendingUpIcon,
  ClipboardCheckIcon,
} from "@/components/ui/icons";

function FlameIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
    </svg>
  );
}

function TimerIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 2h4" />
      <path d="M12 14 15 11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
}

function HeadphonesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
      <path d="M21 15a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h3zM3 15a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

const CHECKLIST = [
  "Countdown to your exam date, always visible",
  "Flashcard sets, mock exams, and audio — in one place",
  "AI tutor answers with RD-verified sources",
  "Adaptive plan shifts with your practice results",
  "Community replies from candidates who get it",
];

const FEED = [
  {
    icon: FlameIcon,
    iconBg: "bg-bright",
    iconText: "text-white",
    title: "Study streak — 6 days",
    body: "Showing up consistently. That compounds.",
    time: "just now",
  },
  {
    icon: TimerIcon,
    iconBg: "bg-primary",
    iconText: "text-white",
    title: "47 days until your exam",
    body: "Let's get some mock exams done — you're on track.",
    time: "1m ago",
    highlight: true,
  },
  {
    icon: ChatIcon,
    iconBg: "bg-forest",
    iconText: "text-white",
    title: "NutriPath AI answered your question",
    body: "The AMDR for carbohydrates is 45–65% of total energy intake.",
    time: "3m ago",
  },
  {
    icon: FlashcardIcon,
    iconBg: "bg-primary",
    iconText: "text-white",
    title: "Flashcard set completed",
    body: "Renal Nutrition — 24 / 24 cards reviewed.",
    time: "8m ago",
  },
  {
    icon: TrendingUpIcon,
    iconBg: "bg-forest",
    iconText: "text-white",
    title: "Mock exam score improved",
    body: "Clinical Nutrition: 71% → 84%. Weak spots are shrinking.",
    time: "14m ago",
  },
  {
    icon: HeadphonesIcon,
    iconBg: "bg-charcoal",
    iconText: "text-white",
    title: "Audio lesson saved offline",
    body: "MNT for Diabetes — ready for your commute.",
    time: "22m ago",
  },
  {
    icon: ClipboardCheckIcon,
    iconBg: "bg-mid",
    iconText: "text-white",
    title: "Study plan updated",
    body: "Based on yesterday's practice, we've prioritised Food Service today.",
    time: "30m ago",
    faded: true,
  },
];

export default function StudyFeedSection() {
  return (
    <section aria-labelledby="study-feed-heading" className="bg-offwhite py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Pill tone="sage" icon="none" className="uppercase tracking-wide">
            What studying feels like
          </Pill>
          <h2
            id="study-feed-heading"
            className="mt-4 font-heading text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl"
          >
            A study session that talks back
          </h2>
          <p className="mt-3 font-body text-lg leading-relaxed text-mid">
            Gentle nudges, real-time progress, and an AI tutor on call —
            NutriPath keeps you moving without the overwhelm.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {CHECKLIST.map((item, index) => (
              <Reveal key={item} delay={index * 80} as="li">
                <div className="flex items-start gap-3 text-sm leading-snug text-charcoal">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage">
                    <svg
                      viewBox="0 0 10 10"
                      className="size-3 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="2,5 4,7 8,3" />
                    </svg>
                  </span>
                  {item}
                </div>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        <div className="relative h-[440px] w-full overflow-hidden sm:h-[520px]">
          <div className="flex flex-col gap-2.5">
            {FEED.map((entry, index) => {
              const Icon = entry.icon;
              return (
                <Reveal key={entry.title} direction="down" delay={index * 90}>
                  <div className="relative">
                    {entry.highlight && (
                      <div
                        aria-hidden="true"
                        className="absolute -inset-1 animate-pulse rounded-2xl bg-primary/15 blur-md"
                      />
                    )}
                    <figure
                      className={`group relative flex cursor-default items-start gap-3 rounded-2xl border p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] ${
                        entry.highlight
                          ? "border-primary/40 bg-sage/60"
                          : "border-[#E5E7E0] bg-white"
                      } ${entry.faded ? "opacity-70" : ""}`}
                    >
                      <div
                        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${entry.iconBg} ${entry.iconText}`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-charcoal">
                            {entry.title}
                          </p>
                          <span className="shrink-0 text-xs text-mid">
                            {entry.time}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[13px] leading-snug text-mid">
                          {entry.body}
                        </p>
                      </div>
                    </figure>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-offwhite to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
