"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import { prefersReducedMotion, useGrowOnMount } from "@/lib/hooks/useGrowOnMount";

type Tone = "primary" | "charcoal" | "bright";

const toneStyles: Record<Tone, { bg: string; title: string; subtitle: string; glow: string }> = {
  primary: {
    bg: "bg-primary",
    title: "text-white",
    subtitle: "text-white/70",
    glow: "bg-[radial-gradient(70%_55%_at_50%_0%,rgba(84,181,27,0.35)_0%,transparent_100%)]",
  },
  charcoal: {
    bg: "bg-charcoal",
    title: "text-white",
    subtitle: "text-white/60",
    glow: "bg-[radial-gradient(70%_55%_at_50%_0%,rgba(84,181,27,0.25)_0%,transparent_100%)]",
  },
  bright: {
    bg: "bg-bright",
    title: "text-forest",
    subtitle: "text-forest/70",
    glow: "bg-[radial-gradient(70%_55%_at_50%_0%,rgba(255,255,255,0.35)_0%,transparent_100%)]",
  },
};

const AI_ANSWER =
  "In pre-dialysis CKD with high potassium, prioritise limiting high-potassium foods — bananas, potatoes, oranges.";

function AiStudyBuddyVisual() {
  const [showAnswer, setShowAnswer] = useState(prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let typingTimer: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setShowAnswer(false);
      typingTimer = setTimeout(() => setShowAnswer(true), 1200);
    }, 4200);
    typingTimer = setTimeout(() => setShowAnswer(true), 1200);
    return () => {
      clearInterval(cycle);
      clearTimeout(typingTimer);
    };
  }, []);

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.18)] rotate-[-2deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <div className="flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary">
          <span className="text-[10px] font-bold text-white">AI</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold text-charcoal">NutriPath AI</p>
          {showAnswer ? (
            <p className="animate-bento-fade-in mt-1 text-[11px] leading-snug text-charcoal/80">
              {AI_ANSWER}
            </p>
          ) : (
            <div className="mt-2 flex items-center gap-1" aria-hidden="true">
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
      <div
        className={`mt-3 inline-flex items-center gap-1 rounded-full bg-sage px-2 py-0.5 transition-opacity duration-300 ${
          showAnswer ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="size-3 text-primary"
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
        <span className="text-[10px] font-semibold text-primary">
          RD-verified source
        </span>
      </div>
    </div>
  );
}

const EXAM_TOPICS = [
  { label: "Clinical Nutrition", value: 84 },
  { label: "Population Health", value: 71 },
];

function MockExamVisual() {
  const grown = useGrowOnMount(250);

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.18)] rotate-[1.5deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <p className="text-[11px] font-semibold text-mid">Your mock score</p>
      <p className="mt-0.5 font-heading text-2xl font-extrabold text-charcoal">
        41 / 50
      </p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-sage">
        <div
          className="h-full rounded-full bg-bright transition-[width] duration-1000 ease-out"
          style={{ width: grown ? "82%" : "0%" }}
        />
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {EXAM_TOPICS.map((topic) => (
          <div key={topic.label} className="flex items-center justify-between text-[11px]">
            <span className="text-charcoal/70">{topic.label}</span>
            <span className="font-semibold text-charcoal">{topic.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const FLASHCARD_QUESTION = "What filters blood in the kidneys?";

function FlashcardsVisual() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setFlipped((value) => !value), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full rounded-2xl border border-sage bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.14)] rotate-[-1.5deg] transition-transform duration-500 ease-out group-hover:rotate-0"
      style={{ perspective: "800px", WebkitPerspective: "800px" }}
    >
      <div
        className="flip-card-inner relative h-[72px] transition-transform duration-500 ease-out"
        style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}
      >
        <div
          className="flip-card-face absolute inset-0 flex flex-col justify-center transition-opacity duration-300"
          style={{
            opacity: flipped ? 0 : 1,
            visibility: flipped ? "hidden" : "visible",
          }}
        >
          <p className="font-heading text-sm font-extrabold text-primary">
            Glomerular filtration
          </p>
          <p className="mt-1 text-[12px] leading-snug text-charcoal/80">
            Rate the kidneys filter blood — key in renal nutrition.
          </p>
        </div>
        <div
          className="flip-card-face absolute inset-0 flex items-center transition-opacity duration-300"
          style={{
            transform: "rotateY(180deg)",
            opacity: flipped ? 1 : 0,
            visibility: flipped ? "visible" : "hidden",
          }}
        >
          <p className="text-center text-[13px] font-semibold text-charcoal">
            {FLASHCARD_QUESTION}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <div className="h-1.5 flex-1 rounded-full bg-sage">
          <div className="h-full w-2/3 rounded-full bg-bright" />
        </div>
        <span className="text-[10px] font-semibold text-primary">
          Card 14 / 20
        </span>
      </div>
    </div>
  );
}

function AudioLessonsVisual() {
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setProgress((value) => (value >= 92 ? 38 : value + 2));
    }, 400);
    return () => clearInterval(id);
  }, []);

  const elapsedSeconds = Math.round((progress / 100) * 18 * 60);
  const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.18)] rotate-[2deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-mid">
        Now playing
      </p>
      <p className="mt-1 text-[12px] font-bold leading-snug text-charcoal">
        Micronutrient Deficiencies — 18 min
      </p>
      <div className="mt-2.5 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-bright">
          <svg
            className="size-3.5 translate-x-[1px] text-white"
            viewBox="0 0 12 14"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M1 1l10 6L1 13V1z" />
          </svg>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-sage">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-mid">
            <span>{minutes}:{seconds}</span>
            <span>18:00</span>
          </div>
        </div>
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
  const grown = useGrowOnMount(250);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setShown(0);
      for (let index = 0; index < DONE_COUNT; index += 1) {
        timers.push(
          setTimeout(() => setShown(index + 1), 300 + index * 350)
        );
      }
    }

    runCycle();
    const interval = setInterval(runCycle, 5000);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.18)] rotate-[-1deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <p className="text-[11px] font-bold text-charcoal">This week</p>
      <div className="mt-2 flex gap-1">
        {WEEK.map((item, index) => {
          const isDoneVisible = item.done && index < shown;
          return (
            <div
              key={`${item.day}-${index}`}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <span className="text-[9px] font-semibold text-mid">
                {item.day}
              </span>
              <div
                className={`flex size-6 items-center justify-center rounded-full text-[9px] font-bold transition-colors duration-300 ${
                  isDoneVisible ? "bg-bright text-white" : "bg-offwhite text-mid"
                }`}
              >
                {isDoneVisible && "✓"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-charcoal/70">Readiness score</span>
        <span className="font-heading text-sm font-extrabold text-primary">
          {grown ? "74%" : "0%"}
        </span>
      </div>
    </div>
  );
}

function CommunityVisual() {
  const [reactions, setReactions] = useState(12);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setPulsing(true);
      setReactions((value) => value + 1);
      setTimeout(() => setPulsing(false), 300);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.18)] rotate-[1deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-primary text-[9px] font-bold text-white">
            S
          </div>
          <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-bright text-[9px] font-bold text-white">
            M
          </div>
          <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-mid text-[9px] font-bold text-white">
            R
          </div>
        </div>
        <p className="text-[11px] font-semibold text-charcoal">
          KCAT cohort — Jan 2026
        </p>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-charcoal/70">
        &ldquo;Thank you Marla! This is really helpful for the IED
        pathway.&rdquo;
      </p>
      <div className="mt-2 flex items-center gap-1">
        <div
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-sage text-[9px] leading-4 text-primary transition-transform duration-300 ${
            pulsing ? "scale-125" : "scale-100"
          }`}
        >
          ♥
        </div>
        <span className="text-[10px] text-mid">{reactions} reactions</span>
      </div>
    </div>
  );
}

const TOOLS: {
  title: string;
  subtitle: string;
  tone: Tone;
  visual: React.ReactNode;
}[] = [
  {
    title: "AI Study Buddy",
    subtitle: "Ask anything. Get RD-verified answers.",
    tone: "primary",
    visual: <AiStudyBuddyVisual />,
  },
  {
    title: "Mock Exam",
    subtitle: "Real exam feel. No surprises.",
    tone: "charcoal",
    visual: <MockExamVisual />,
  },
  {
    title: "Flashcards",
    subtitle: "Learn terms that actually stick.",
    tone: "bright",
    visual: <FlashcardsVisual />,
  },
  {
    title: "Audio Lessons",
    subtitle: "Study while life keeps moving.",
    tone: "primary",
    visual: <AudioLessonsVisual />,
  },
  {
    title: "Adaptive Study Plan",
    subtitle: "Your pace. Your priorities.",
    tone: "charcoal",
    visual: <AdaptiveStudyPlanVisual />,
  },
  {
    title: "Community",
    subtitle: "Peers who truly get the journey.",
    tone: "bright",
    visual: <CommunityVisual />,
  },
];

export default function ToolsShowcase() {
  return (
    <section aria-labelledby="tools-heading" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Pill tone="sage" icon="none" className="uppercase tracking-wide">
            Every tool you need
          </Pill>
          <h2
            id="tools-heading"
            className="mt-4 font-heading text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl"
          >
            Prep smarter, not harder
          </h2>
          <p className="mt-3 font-body text-lg leading-relaxed text-mid">
            One membership unlocks AI tutoring, adaptive plans, flashcards,
            mock exams, video and audio lessons, and a community —
            everything built specifically for the CDRE and KCAT.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, index) => {
            const tone = toneStyles[tool.tone];
            return (
              <Reveal key={tool.title} delay={(index % 3) * 90}>
                <div
                  className={`group relative flex h-full min-h-[300px] w-full flex-col overflow-hidden rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(0,0,0,0.22)] ${tone.bg}`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${tone.glow}`}
                  />
                  <div className="px-6 pb-1 pt-6">
                    <h3
                      className={`font-heading text-xl font-extrabold ${tone.title}`}
                    >
                      {tool.title}
                    </h3>
                    <p
                      className={`mt-1 text-[13px] font-medium leading-snug ${tone.subtitle}`}
                    >
                      {tool.subtitle}
                    </p>
                  </div>
                  <div className="relative mt-auto flex min-h-[160px] items-end px-5 pb-0">
                    <div className="w-full translate-y-[18%] transition-transform duration-500 ease-out group-hover:translate-y-[10%]">
                      {tool.visual}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
