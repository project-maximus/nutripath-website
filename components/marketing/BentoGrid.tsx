"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { prefersReducedMotion, useGrowOnMount } from "@/lib/hooks/useGrowOnMount";
import {
  CalendarIcon,
  ChatIcon,
  FlashcardIcon,
  ClipboardCheckIcon,
  TargetIcon,
  TrendingUpIcon,
} from "@/components/ui/icons";

const PLAN_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY_DAY_INDEX = 3;
const TIME_SLOTS = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM"];

const PLAN_EVENTS = [
  { day: 1, row: 5, title: "Flashcard Sprint", tone: "sage" as const },
  { day: 3, row: 4, title: "Live AI Review", tone: "primary" as const },
  { day: 4, row: 3, title: "Mock Exam", tone: "sage" as const },
];

const EVENT_STEP_MS = 400;

function StudyPlanVisual() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const id = setTimeout(() => setShown(PLAN_EVENTS.length), 0);
      return () => clearTimeout(id);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setShown(0);
      PLAN_EVENTS.forEach((_, index) => {
        timers.push(
          setTimeout(() => setShown(index + 1), 300 + index * EVENT_STEP_MS)
        );
      });
    }

    runCycle();
    const interval = setInterval(runCycle, 6000);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="mt-6 rounded-2xl border border-[#E5E7E0] bg-white p-3">
      <div
        className="grid"
        style={{
          gridTemplateColumns: "30px repeat(7, 1fr)",
          gridTemplateRows: "22px repeat(6, 34px)",
        }}
      >
        <div />
        {PLAN_DAYS.map((day, index) => {
          const isToday = index === TODAY_DAY_INDEX;
          return (
            <div
              key={day}
              className="flex items-center justify-center gap-1"
            >
              <span
                className={`font-body text-[10px] font-semibold ${
                  isToday ? "text-primary" : "text-mid"
                }`}
              >
                {day}
              </span>
              {isToday && (
                <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
              )}
            </div>
          );
        })}

        {TIME_SLOTS.map((time, rowIndex) => (
          <span
            key={time}
            className="flex items-start justify-end pr-1 pt-0.5 font-body text-[8px] text-mid"
            style={{ gridRow: rowIndex + 2, gridColumn: 1 }}
          >
            {time}
          </span>
        ))}

        {TIME_SLOTS.map((_, rowIndex) =>
          PLAN_DAYS.map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="border-l border-t border-[#F0F1ED]"
              style={{ gridRow: rowIndex + 2, gridColumn: colIndex + 2 }}
            />
          ))
        )}

        {PLAN_EVENTS.map((event, index) => (
          <div
            key={event.title}
            className={`m-0.5 flex flex-col items-center justify-center rounded-md px-0.5 transition-opacity duration-300 ${
              event.tone === "primary"
                ? "bg-primary text-white"
                : "bg-sage text-primary"
            } ${index < shown ? "opacity-100" : "opacity-0"}`}
            style={{ gridRow: event.row + 2, gridColumn: event.day + 2 }}
          >
            <span className="text-center font-body text-[8px] font-semibold leading-tight">
              {event.title}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-offwhite px-3 py-2">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-bright" />
        <p className="font-body text-[11px] text-mid">
          Adjusts automatically as your weak topics change
        </p>
      </div>
    </div>
  );
}

const AI_EXCHANGE = {
  question: "Why is my iron score low?",
  answer:
    "You missed two questions on mineral absorption — let’s review that.",
};

function AiTutorVisual() {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const id = setTimeout(() => setShowAnswer(true), 0);
      return () => clearTimeout(id);
    }
    let typingTimer: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setShowAnswer(false);
      typingTimer = setTimeout(() => setShowAnswer(true), 1300);
    }, 4200);
    typingTimer = setTimeout(() => setShowAnswer(true), 1300);
    return () => {
      clearInterval(cycle);
      clearTimeout(typingTimer);
    };
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-sage px-3.5 py-2.5">
        <p className="font-body text-xs text-charcoal">
          {AI_EXCHANGE.question}
        </p>
      </div>
      <div className="flex max-w-[92%] items-start gap-2">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <ChatIcon className="h-3 w-3" />
        </span>
        {showAnswer ? (
          <div className="animate-bento-fade-in rounded-2xl rounded-tl-sm bg-offwhite px-3.5 py-2.5">
            <p className="font-body text-xs text-charcoal">
              {AI_EXCHANGE.answer}
            </p>
          </div>
        ) : (
          <div
            className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-offwhite px-3.5 py-3"
            aria-hidden="true"
          >
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-mid" />
            <span
              className="typing-dot h-1.5 w-1.5 rounded-full bg-mid"
              style={{ animationDelay: "200ms" }}
            />
            <span
              className="typing-dot h-1.5 w-1.5 rounded-full bg-mid"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const FLASHCARD = {
  front: "What’s the RDA for vitamin D?",
  back: "600 IU/day for most adults.",
};

function FlashcardVisual() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setFlipped((value) => !value), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-6 flex flex-col items-center">
      <div
        className="relative h-[72px] w-full max-w-[200px]"
        style={{ perspective: "800px", WebkitPerspective: "800px" }}
      >
        <div className="absolute inset-x-3 top-2 h-16 rounded-xl bg-sage" />
        <div
          className="flip-card-inner absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}
        >
          <div
            className="flip-card-face absolute inset-0 flex items-center justify-center rounded-xl border border-[#E5E7E0] bg-white px-3 shadow-sm transition-opacity duration-300"
            style={{
              opacity: flipped ? 0 : 1,
              visibility: flipped ? "hidden" : "visible",
            }}
          >
            <p className="text-center font-body text-xs font-semibold text-charcoal">
              {FLASHCARD.front}
            </p>
          </div>
          <div
            className="flip-card-face absolute inset-0 flex items-center justify-center rounded-xl border border-primary bg-sage px-3 shadow-sm transition-opacity duration-300"
            style={{
              transform: "rotateY(180deg)",
              opacity: flipped ? 1 : 0,
              visibility: flipped ? "visible" : "hidden",
            }}
          >
            <p className="text-center font-body text-xs font-semibold text-primary">
              {FLASHCARD.back}
            </p>
          </div>
        </div>
      </div>
      <div
        className="mt-3 flex gap-2 transition-opacity duration-300"
        style={{ opacity: flipped ? 1 : 0.35 }}
      >
        <span className="rounded-full bg-bright px-3 py-1 font-body text-[11px] font-semibold text-white">
          Correct
        </span>
        <span className="rounded-full border border-[#E5E7E0] px-3 py-1 font-body text-[11px] font-semibold text-mid">
          Review Again
        </span>
      </div>
    </div>
  );
}

const TOPICS = [
  { label: "Medical Nutrition Therapy", value: 82 },
  { label: "Food Service Systems", value: 64 },
];

function MockExamVisual() {
  const grown = useGrowOnMount(250);
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const percent = 0.76;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-5 rounded-2xl bg-offwhite p-5 sm:flex-nowrap">
      <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r={radius} fill="none" stroke="#E5E7E0" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="#3A760D"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - (grown ? percent : 0))}
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <span className="absolute font-heading text-base font-extrabold text-charcoal">
          76%
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-body text-xs text-mid">
          Time <span className="font-semibold text-charcoal">142 min</span>
        </p>
        <p className="font-body text-xs text-mid">
          Readiness{" "}
          <span className="font-semibold text-primary">On track</span>
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2 sm:min-w-[160px]">
        {TOPICS.map((topic) => (
          <div key={topic.label}>
            <div className="flex items-center justify-between font-body text-[11px] text-mid">
              <span>{topic.label}</span>
              <span className="font-semibold text-charcoal">
                {topic.value}%
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
                style={{ width: grown ? `${topic.value}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeakAreaVisual() {
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {["Food Safety", "Clinical Nutrition", "Community Nutrition"].map(
        (label) => (
          <span
            key={label}
            className="rounded-full bg-offwhite px-2.5 py-1 font-body text-[11px] font-medium text-charcoal"
          >
            {label}
          </span>
        )
      )}
    </div>
  );
}

function ProgressVisual() {
  const grown = useGrowOnMount(250);
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const percent = 0.72;

  return (
    <div className="mt-5 flex items-center gap-4">
      <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="#E8F4E0"
            strokeWidth="6"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="#3A760D"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - (grown ? percent : 0))}
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <span className="absolute font-heading text-sm font-bold text-charcoal">
          72%
        </span>
      </div>
      <p className="font-body text-xs leading-relaxed text-mid">
        Exam readiness, updated after every session.
      </p>
    </div>
  );
}

const cards = [
  {
    title: "Personalized Study Plan",
    body: "Get a weekly study plan that adjusts based on your progress, weak topics, and exam timeline.",
    icon: CalendarIcon,
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    visual: <StudyPlanVisual />,
  },
  {
    title: "AI Tutor Support",
    body: "Ask questions while studying and receive clear explanations when concepts feel difficult.",
    icon: ChatIcon,
    span: "lg:col-span-1 lg:row-span-1",
    visual: <AiTutorVisual />,
  },
  {
    title: "Smart Flashcards",
    body: "Review high-yield dietetics concepts using quick flashcards and spaced repetition.",
    icon: FlashcardIcon,
    span: "lg:col-span-1 lg:row-span-1",
    visual: <FlashcardVisual />,
  },
  {
    title: "Weak Area Detection",
    body: "See which topics are holding you back so you can study smarter.",
    icon: TargetIcon,
    span: "lg:col-span-1 lg:row-span-1",
    visual: <WeakAreaVisual />,
  },
  {
    title: "Progress Tracking",
    body: "Track completed modules, study streaks, mock scores, and exam readiness.",
    icon: TrendingUpIcon,
    span: "lg:col-span-1 lg:row-span-1",
    visual: <ProgressVisual />,
  },
  {
    title: "Full CDRE Mock Exams",
    body: "Practice with timed mock exams, review your score, and understand where you need improvement.",
    icon: ClipboardCheckIcon,
    span: "sm:col-span-2 lg:col-span-4 lg:row-span-1",
    visual: <MockExamVisual />,
  },
];

export default function BentoGrid() {
  return (
    <section aria-labelledby="bento-heading" className="bg-offwhite py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="bento-heading"
            className="font-heading text-3xl font-bold text-charcoal sm:text-4xl"
          >
            Everything you need to prepare with confidence
          </h2>
          <p className="mt-3 font-body text-lg text-mid">
            NutriPath gives you structured study planning, AI support, mock
            exams, and progress tracking in one focused platform.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 80} className={card.span}>
                <article className="group flex h-full flex-col rounded-3xl border border-[#E5E7E0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sage text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-charcoal">
                    {card.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mid">
                    {card.body}
                  </p>
                  <div className="mt-auto">{card.visual}</div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
