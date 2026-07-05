"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { prefersReducedMotion, useGrowOnMount } from "@/lib/hooks/useGrowOnMount";

const ANSWER =
  "The AMDR for carbohydrates is 45–65% of total energy intake — established by the DRI framework.";

function AiTutorVisual() {
  const [showAnswer, setShowAnswer] = useState(prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let typingTimer: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setShowAnswer(false);
      typingTimer = setTimeout(() => setShowAnswer(true), 1300);
    }, 4800);
    typingTimer = setTimeout(() => setShowAnswer(true), 1300);
    return () => {
      clearInterval(cycle);
      clearTimeout(typingTimer);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-start gap-2.5">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-bright text-[10px] font-bold text-forest">
          N
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-bold text-white">NutriPath AI</p>
          {showAnswer ? (
            <p className="animate-bento-fade-in mt-1.5 text-[13px] leading-relaxed text-white/80">
              {ANSWER.split("45–65%")[0]}
              <span className="font-semibold text-bright">45–65%</span>
              {ANSWER.split("45–65%")[1]}
            </p>
          ) : (
            <div className="mt-2.5 flex items-center gap-1" aria-hidden="true">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/50" />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-white/50"
                style={{ animationDelay: "200ms" }}
              />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-white/50"
                style={{ animationDelay: "400ms" }}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`mt-3 inline-flex items-center gap-1 transition-opacity duration-300 ${
          showAnswer ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="size-3 text-bright"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 6l3 3 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[11px] font-semibold text-bright">
          RD-verified source
        </span>
      </div>
      <div className="mt-4 self-start rounded-xl rounded-tl-sm bg-white/10 px-3 py-2">
        <p className="text-[12px] text-white/70">
          What is the AMDR for carbohydrates?
        </p>
      </div>
    </div>
  );
}

const WEEK = [
  { day: "M", done: true },
  { day: "T", done: true },
  { day: "W", done: true },
  { day: "T", done: false },
  { day: "F", done: false },
  { day: "S", done: false },
  { day: "S", done: false },
];
const DONE_COUNT = WEEK.filter((item) => item.done).length;

function AdaptiveStudyPlanVisual() {
  const [shown, setShown] = useState(prefersReducedMotion() ? DONE_COUNT : 0);
  const grown = useGrowOnMount(300);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setShown(0);
      for (let index = 0; index < DONE_COUNT; index += 1) {
        timers.push(setTimeout(() => setShown(index + 1), 300 + index * 350));
      }
    }

    runCycle();
    const interval = setInterval(runCycle, 5200);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
        This week
      </p>
      <div className="mt-2.5 flex gap-1.5">
        {WEEK.map((item, index) => {
          const isDoneVisible = item.done && index < shown;
          return (
            <div
              key={`${item.day}-${index}`}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <span className="text-[9px] font-semibold text-white/50">
                {item.day}
              </span>
              <div
                className={`flex size-6 items-center justify-center rounded-full text-[9px] font-bold transition-colors duration-300 ${
                  isDoneVisible ? "bg-bright text-forest" : "bg-white/10 text-white/40"
                }`}
              >
                {isDoneVisible && "✓"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-xl bg-white/10 p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          Today
        </p>
        <p className="mt-1 text-[13px] font-semibold text-white">
          MNT for Cardiovascular Disease
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-bright transition-[width] duration-1000 ease-out"
              style={{ width: grown ? "40%" : "0%" }}
            />
          </div>
          <span className="text-[10px] font-semibold text-white/70">40%</span>
        </div>
      </div>
    </div>
  );
}

const MOCK_TOPICS = [
  { label: "Clinical Nutrition", value: 88 },
  { label: "Population Health", value: 74 },
  { label: "Food Service Mgmt", value: 66 },
];

function useCountUp(target: number, grown: boolean, duration = 900) {
  const reduced = prefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!grown || reduced) return;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [grown, target, duration, reduced]);

  if (reduced) return grown ? target : 0;
  return value;
}

function MockExamsVisual() {
  const grown = useGrowOnMount(300);
  const score = useCountUp(41, grown);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
        Your mock score
      </p>
      <p className="mt-1 font-heading text-3xl font-extrabold text-white">
        {score} <span className="text-lg font-bold text-white/50">/ 50</span>
      </p>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-bright transition-[width] duration-1000 ease-out"
          style={{ width: grown ? "82%" : "0%" }}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2.5">
        {MOCK_TOPICS.map((topic) => (
          <div key={topic.label}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white/70">{topic.label}</span>
              <span className="font-semibold text-white">{topic.value}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-bright transition-[width] duration-1000 ease-out"
                style={{ width: grown ? `${topic.value}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  {
    eyebrow: "AI Tutor",
    title: "Ask anything, get real explanations",
    bg: "bg-forest",
    visual: <AiTutorVisual />,
  },
  {
    eyebrow: "Adaptive Study Plan",
    title: "A personalised path, not a generic schedule",
    bg: "bg-forest",
    visual: <AdaptiveStudyPlanVisual />,
  },
  {
    eyebrow: "Mock Exams",
    title: "Practice under real conditions",
    bg: "bg-charcoal",
    visual: <MockExamsVisual />,
  },
];

export default function FeatureHighlights() {
  return (
    <section aria-labelledby="feature-highlights-heading" className="bg-offwhite py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
            Signature features
          </p>
          <h2
            id="feature-highlights-heading"
            className="mt-3 font-heading text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl"
          >
            The tools candidates actually use every day
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.eyebrow} delay={index * 100}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.28)] ${feature.bg}`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(70%_55%_at_50%_0%,rgba(84,181,27,0.3)_0%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <p className="relative text-[11px] font-bold uppercase tracking-widest text-bright">
                  {feature.eyebrow}
                </p>
                <h3 className="relative mt-2 font-heading text-2xl font-extrabold leading-snug text-white">
                  {feature.title}
                </h3>
                <div className="relative mt-6">{feature.visual}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
