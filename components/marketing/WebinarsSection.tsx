"use client";

import { useId, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import {
  CalendarIcon,
  ChatIcon,
  ClipboardCheckIcon,
  LeafIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { webinars, type Webinar } from "@/lib/content/webinars";

const FEATURES = [
  { icon: ChatIcon, label: "Live Q&A" },
  { icon: UsersIcon, label: "Partner-led" },
  { icon: LeafIcon, label: "Free to attend" },
  { icon: ClipboardCheckIcon, label: "Recorded for later" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function WebinarCard({ webinar }: { webinar: Webinar }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-bright/40 hover:bg-white/[0.08]">
      <div className="flex items-center gap-2.5">
        <span className="rounded-full bg-bright px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-wide text-forest">
          {webinar.format}
        </span>
        <span className="font-body text-xs text-white/50">
          {webinar.date} &middot; {webinar.time}
        </span>
      </div>
      <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-white">
        {webinar.title}
      </h3>
      <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wide text-bright">
        With {webinar.partner}
      </p>
      <p className="mt-2.5 flex-1 font-body text-sm leading-relaxed text-white/70">
        {webinar.description}
      </p>
      {webinar.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {webinar.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-white/10 px-2.5 py-1 font-body text-[11px] text-white/70"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
      <a
        href={webinar.registerHref}
        target="_blank"
        rel="noopener"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 font-body text-sm font-semibold text-primary transition-colors hover:bg-sage"
      >
        Register free
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}

function NotifyForm() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/webinars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-body text-base font-semibold text-bright" role="status">
        You&rsquo;re on the list! We&rsquo;ll email you the moment the first
        webinar is announced.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-md flex-col gap-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          disabled={status === "loading"}
          className={`w-full flex-1 rounded-full border px-5 py-3.5 font-body text-base text-charcoal placeholder:text-mid focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 ${
            status === "error" ? "border-red-400" : "border-transparent bg-white/95"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="relative flex-shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-bright px-6 py-3.5 font-body text-sm font-extrabold text-forest shadow-lg transition-transform duration-300 hover:scale-105 disabled:opacity-70"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-shine bg-white/40"
          />
          <span className="relative">
            {status === "loading" ? "Joining…" : "Notify me"}
          </span>
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-left font-body text-sm text-red-200">
          {errorMsg}
        </p>
      )}
    </form>
  );
}

function ComingSoonSpotlight() {
  return (
    <Reveal className="mx-auto mt-14 max-w-2xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-bright/10 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
        />
        <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-bright/15 text-bright">
          <CalendarIcon className="h-7 w-7" />
        </span>
        <h3 className="relative mt-5 font-heading text-2xl font-bold text-white">
          First webinar announcing soon.
        </h3>
        <p className="relative mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed text-white/70">
          We&rsquo;re lining up our first partner session. Drop your email and
          you&rsquo;ll be the first to know the date, topic, and how to save
          your spot.
        </p>
        <div className="relative mt-7">
          <NotifyForm />
        </div>
      </div>
    </Reveal>
  );
}

export default function WebinarsSection() {
  const hasWebinars = webinars.length > 0;

  return (
    <section className="relative overflow-hidden bg-forest py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(84,181,27,0.16)_0%,transparent_100%)]"
      />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bright/15 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-bright">
            <LeafIcon className="h-3.5 w-3.5" />
            New &middot; Live &amp; free
          </span>
          <h2 className="mt-4 font-heading text-4xl font-extrabold text-white sm:text-5xl">
            Webinars with people who&rsquo;ve actually done this.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg leading-relaxed text-white/70">
            Live sessions with our partner organizations — real strategies,
            real Q&amp;A, and recordings you can revisit anytime.
          </p>
        </Reveal>

        <Reveal className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <span
                key={feature.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-body text-sm font-medium text-white/80"
              >
                <Icon className="h-4 w-4 text-bright" />
                {feature.label}
              </span>
            );
          })}
        </Reveal>

        {hasWebinars ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.map((webinar, index) => (
              <Reveal key={webinar.slug} delay={index * 80}>
                <WebinarCard webinar={webinar} />
              </Reveal>
            ))}
          </div>
        ) : (
          <ComingSoonSpotlight />
        )}
      </div>
    </section>
  );
}
