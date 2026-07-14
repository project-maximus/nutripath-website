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
        <svg className="size-3 text-bright" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[11px] font-semibold text-bright">RD-verified source</span>
      </div>
      <div className="mt-4 self-start rounded-xl rounded-tl-sm bg-white/10 px-3 py-2">
        <p className="text-[12px] text-white/70">What is the AMDR for carbohydrates?</p>
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
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">This week</p>
      <div className="mt-2.5 flex gap-1.5">
        {WEEK.map((item, index) => {
          const isDoneVisible = item.done && index < shown;
          return (
            <div key={`${item.day}-${index}`} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[9px] font-semibold text-white/50">{item.day}</span>
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
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Today</p>
        <p className="mt-1 text-[13px] font-semibold text-white">MNT for Cardiovascular Disease</p>
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
  { label: "Clinical Nutrition", value: 84 },
  { label: "Population Health", value: 71 },
  { label: "Food Service Mgmt", value: 68 },
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
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Your mock score</p>
      <p className="mt-1 font-heading text-3xl font-extrabold text-white">
        {score} <span className="text-lg font-bold text-white/50">/ 50</span>
      </p>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-bright transition-[width] duration-1000 ease-out"
          style={{ width: grown ? "82%" : "0%" }}
        />
      </div>
      <div className="mt-4 flex flex-col">
        {MOCK_TOPICS.map((topic) => (
          <div
            key={topic.label}
            className="flex items-center justify-between border-b border-white/10 py-1.5 last:border-0"
          >
            <span className="text-[12px] text-white/70">{topic.label}</span>
            <span className="text-[12px] font-bold text-bright">{topic.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlashcardVisual() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setFlipped((value) => !value), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="rounded-2xl bg-white p-4 shadow-lg"
      style={{ perspective: "1000px", WebkitPerspective: "1000px" }}
    >
      <div
        className="flip-card-inner relative h-[132px] transition-transform duration-500 ease-out"
        style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}
      >
        <div
          className="flip-card-face absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: flipped ? 0 : 1,
            visibility: flipped ? "hidden" : "visible",
          }}
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">Term</p>
          <p className="font-heading text-[15px] font-extrabold text-charcoal">
            Glomerular Filtration Rate
          </p>
        </div>
        <div
          className="flip-card-face absolute inset-0 transition-opacity duration-300"
          style={{
            transform: "rotateY(180deg)",
            opacity: flipped ? 1 : 0,
            visibility: flipped ? "visible" : "hidden",
          }}
        >
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-charcoal/40">
            Definition
          </p>
          <p className="text-[12px] leading-snug text-charcoal/70">
            Volume of plasma filtered by kidneys per minute. Normal:
            90–120 mL/min/1.73m².
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-3">
        <span className="rounded-full bg-offwhite px-3 py-1 text-[11px] text-mid">Again</span>
        <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white">
          Got it
        </span>
      </div>
    </div>
  );
}

const CHAPTERS = [
  { label: "Intro & Learning Objectives", active: true },
  { label: "Macronutrient Targets", active: false },
  { label: "Glycemic Index Review", active: false },
];

function VideoLessonsVisual() {
  return (
    <div className="overflow-hidden rounded-xl bg-black/30">
      <div className="relative flex h-24 items-center justify-center bg-black/40">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/10" aria-hidden="true" />
        <div className="relative flex size-10 items-center justify-center rounded-full bg-white/90">
          <span className="ml-0.5 text-charcoal">▶</span>
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
          12:34
        </span>
      </div>
      <div className="p-3">
        <p className="text-[12px] font-semibold text-white">MNT for Type 2 Diabetes</p>
        <p className="text-[10px] text-white/50">Module 4 · Clinical Nutrition</p>
      </div>
      <div className="flex flex-col gap-1 px-2 pb-2">
        {CHAPTERS.map((chapter, index) => (
          <div
            key={chapter.label}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
              chapter.active ? "bg-primary/30" : ""
            }`}
          >
            <span className={`text-[10px] font-bold ${chapter.active ? "text-bright" : "text-white/40"}`}>
              {index + 1}
            </span>
            <span className={`text-[11px] ${chapter.active ? "font-semibold text-white" : "text-white/50"}`}>
              {chapter.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudioLessonsVisual() {
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setProgress((value) => (value >= 92 ? 35 : value + 2));
    }, 450);
    return () => clearInterval(id);
  }, []);

  const elapsedSeconds = Math.round((progress / 100) * 18 * 60);
  const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <p className="text-[11px] font-semibold text-white">Renal Nutrition — Part 2</p>
      <p className="mt-1 text-[10px] text-white/50">18 min · RD-narrated</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-white/40">
        <span>{minutes}:{seconds}</span>
        <span>18:00</span>
      </div>
      <div className="mt-4 flex items-center justify-center gap-5">
        <span className="text-lg text-white/40">⏮</span>
        <span className="flex size-10 items-center justify-center rounded-full bg-primary text-base text-white">
          ⏸
        </span>
        <span className="text-lg text-white/40">⏭</span>
      </div>
      <p className="mt-3 text-center text-[10px] text-white/30">1× · CC · Download</p>
    </div>
  );
}

const PARTICIPANTS = ["RD Host", "Maria R.", "Priya K.", "You"];

function LiveSessionsVisual() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
          <span className="size-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
          LIVE
        </span>
        <span className="text-[11px] text-white/60">KCAT Bootcamp · Cohort 3</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {PARTICIPANTS.map((name) => (
          <div key={name} className="flex h-14 items-center justify-center rounded-xl bg-white/10">
            <span className="text-[11px] font-medium text-white/70">{name}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1 rounded-xl bg-white/10 p-2">
        <p className="text-[10px] text-white/70">
          <strong className="text-white">Maria:</strong> This really helped, thank you!
        </p>
        <p className="text-[10px] text-white/50">
          <strong className="text-white/70">RD Host:</strong> Great question — let&rsquo;s break it down…
        </p>
      </div>
    </div>
  );
}

function GuidedQuizVisual() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-white/15" />
        <div className="h-1 flex-1 rounded-full bg-white/15" />
      </div>
      <p className="mb-3 text-[10px] text-white/50">Step 1 of 3</p>
      <p className="mb-4 text-[14px] font-semibold text-white">Which exam are you preparing for?</p>
      <div className="flex flex-col gap-2">
        <span className="rounded-xl border border-primary bg-primary/20 px-3 py-2.5 text-left text-[12px] font-medium text-white">
          CDRE — Canadian Licensure
        </span>
        <span className="rounded-xl border border-white/15 px-3 py-2.5 text-left text-[12px] font-medium text-white/60">
          KCAT — Ontario IED Gate
        </span>
        <span className="rounded-xl border border-white/15 px-3 py-2.5 text-left text-[12px] font-medium text-white/60">
          Not sure yet
        </span>
      </div>
    </div>
  );
}

const CHAT_MESSAGES = [
  { name: "Priya", time: "2m", body: "KCAT tips from the January cohort" },
  { name: "Maria", time: "15m", body: "Thank you, this is really helpful!" },
  { name: "Aisha", time: "1h", body: "Anyone else studying MNT this week?" },
];

function CommunityVisual() {
  const [shown, setShown] = useState(prefersReducedMotion() ? CHAT_MESSAGES.length : 0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setShown(0);
      CHAT_MESSAGES.forEach((_, index) => {
        timers.push(setTimeout(() => setShown(index + 1), 400 + index * 500));
      });
    }

    runCycle();
    const interval = setInterval(runCycle, 5000);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex -space-x-2">
          <span className="size-6 rounded-full border-2 border-forest bg-primary" />
          <span className="size-6 rounded-full border-2 border-forest bg-bright" />
          <span className="size-6 rounded-full border-2 border-forest bg-forest" />
        </div>
        <p className="text-[11px] text-white/60">347 members · IED-focused</p>
      </div>
      <div className="flex flex-col gap-2">
        {CHAT_MESSAGES.map((message, index) => (
          <div
            key={message.name}
            className={`rounded-xl bg-white/10 px-3 py-2 transition-opacity duration-300 ${
              index < shown ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-0.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white">{message.name}</span>
              <span className="text-[10px] text-white/30">{message.time}</span>
            </div>
            <p className="text-[11px] leading-snug text-white/70">{message.body}</p>
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
    bg: "bg-charcoal",
    visual: <AdaptiveStudyPlanVisual />,
  },
  {
    eyebrow: "Mock Exams",
    title: "Practice under real conditions",
    bg: "bg-primary",
    visual: <MockExamsVisual />,
  },
  {
    eyebrow: "Flashcards",
    title: "Spaced repetition that actually works",
    bg: "bg-forest",
    visual: <FlashcardVisual />,
  },
  {
    eyebrow: "Video Lessons",
    title: "Watch every concept explained visually",
    bg: "bg-charcoal",
    visual: <VideoLessonsVisual />,
  },
  {
    eyebrow: "Audio Lessons",
    title: "Study on the go, at your own pace",
    bg: "bg-primary",
    visual: <AudioLessonsVisual />,
  },
  {
    eyebrow: "Live Sessions",
    title: "RD-led live bootcamp sessions",
    bg: "bg-forest",
    visual: <LiveSessionsVisual />,
  },
  {
    eyebrow: "Guided Pathway Quiz",
    title: "Not sure where to start? We help you choose",
    bg: "bg-charcoal",
    visual: <GuidedQuizVisual />,
  },
  {
    eyebrow: "Community",
    title: "A community that gets the IED journey",
    bg: "bg-primary",
    visual: <CommunityVisual />,
  },
];

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  return (
    <div
      className={`group relative flex w-80 shrink-0 flex-col overflow-hidden rounded-[20px] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.28)] ${feature.bg}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(70%_55%_at_50%_0%,rgba(84,181,27,0.3)_0%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <p className="relative text-[11px] font-bold uppercase tracking-widest text-white/50">
        {feature.eyebrow}
      </p>
      <p className="relative mt-2 font-heading text-xl font-extrabold leading-snug text-white">
        {feature.title}
      </p>
      <div className="relative mt-5">{feature.visual}</div>
    </div>
  );
}

type FeatureHighlightsProps = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
};

export default function FeatureHighlights({
  eyebrow = "Signature features",
  heading = "The tools candidates actually use every day",
  subheading,
}: FeatureHighlightsProps) {
  return (
    <section aria-labelledby="feature-highlights-heading" className="bg-offwhite py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          {eyebrow && (
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
              {eyebrow}
            </p>
          )}
          <h2
            id="feature-highlights-heading"
            className="mt-3 font-heading text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl"
          >
            {heading}
          </h2>
          {subheading && (
            <h3 className="mt-3 font-body text-lg font-medium text-mid">
              {subheading}
            </h3>
          )}
        </Reveal>
      </div>

      <div className="feature-marquee-group mt-12 overflow-hidden">
        <div className="feature-marquee-track flex w-max gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={`a-${feature.eyebrow}`} feature={feature} />
          ))}
          {FEATURES.map((feature) => (
            <FeatureCard key={`b-${feature.eyebrow}`} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
