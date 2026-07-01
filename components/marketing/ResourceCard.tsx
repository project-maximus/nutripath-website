"use client";

import { useState } from "react";
import Image from "next/image";

type GuideKey = "cdre" | "kcat";
type Status = "idle" | "open" | "loading" | "success" | "error";

interface Props {
  guide: GuideKey;
  tag: string;
  coverImage: string;
  coverAlt: string;
  title: string;
  description: string;
}

export default function ResourceCard({
  guide,
  coverImage,
  coverAlt,
  title,
  description,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, guide }),
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

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-[#E5E7E0] bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* ── PDF cover (top half of first page) ─────────────────────────── */}
      <div className="relative h-72 overflow-hidden bg-offwhite">
        <Image
          src={coverImage}
          alt={coverAlt}
          fill
          sizes="(min-width: 1024px) 400px, 50vw"
          className="object-cover object-top"
          priority
        />
      </div>

      {/* ── Card body ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sage px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          PDF Guide
        </span>

        <h2 className="mt-3 font-heading text-xl font-bold text-charcoal">
          {title}
        </h2>
        <p className="mt-2 font-body text-sm leading-relaxed text-mid">
          {description}
        </p>

        <div className="mt-auto pt-5">
          {/* Inline form */}
          {status === "open" || status === "loading" || status === "error" ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === "loading"}
                className="w-full rounded-xl border border-[#D1D5C8] px-4 py-3 font-body text-sm text-charcoal placeholder:text-mid focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
              />
              {status === "error" && (
                <p role="alert" className="font-body text-xs text-red-600">
                  {errorMsg}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 rounded-xl bg-charcoal px-5 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Send to my inbox →"}
                </button>
                <button
                  type="button"
                  onClick={() => { setStatus("idle"); setEmail(""); setErrorMsg(""); }}
                  className="rounded-xl border border-[#E5E7E0] px-4 py-3 font-body text-sm text-mid hover:bg-offwhite"
                >
                  Cancel
                </button>
              </div>
              <p className="font-body text-[11px] text-mid">
                Free. No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : status === "success" ? (
            <div className="flex items-start gap-3 rounded-2xl bg-sage p-4">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6.5L4.5 9L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="font-body text-sm font-semibold text-charcoal">
                  Guide sent! Check your inbox.
                </p>
                <p className="mt-0.5 font-body text-xs text-mid">
                  Check spam if you don&rsquo;t see it in a minute.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-mid">
                Free
              </span>
              <button
                type="button"
                onClick={() => setStatus("open")}
                className="flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-forest"
              >
                Get the PDF
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
