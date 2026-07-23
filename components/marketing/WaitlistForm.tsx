"use client";

import { useId, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = { variant?: "light" | "dark" };

export default function WaitlistForm({ variant = "dark" }: Props) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isLight = variant === "light";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
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
      <div
        className={`rounded-2xl p-6 text-center ${
          isLight ? "bg-sage" : "bg-white/10"
        }`}
      >
        <p
          className={`font-heading text-lg font-bold ${
            isLight ? "text-charcoal" : "text-white"
          }`}
        >
          You&rsquo;re on the list! 🎉
        </p>
        <p
          className={`mt-2 font-body text-sm leading-relaxed ${
            isLight ? "text-mid" : "text-white/70"
          }`}
        >
          We&rsquo;ll email{" "}
          <span className={`font-semibold ${isLight ? "text-primary" : "text-bright"}`}>
            {email}
          </span>{" "}
          the moment the platform is ready — check your inbox for a
          confirmation now.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-3" noValidate>
      <div className="relative flex-1">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
            isLight ? "text-mid" : "text-charcoal/50"
          }`}
        >
          <path
            d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M4 6.5l8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          id={inputId}
          type="email"
          required
          placeholder={isLight ? "Enter your email address" : "you@email.com"}
          value={email}
          disabled={status === "loading"}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${inputId}-error` : undefined}
          className={`w-full rounded-full border py-3.5 pl-11 pr-5 text-base placeholder:text-mid focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 ${
            status === "error"
              ? "border-red-400"
              : isLight
              ? "border-[#E5E7E0] bg-white text-charcoal"
              : "border-white/20 bg-white/95 text-charcoal"
          }`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={`min-h-[44px] whitespace-nowrap rounded-full px-6 py-3.5 text-base font-semibold transition-colors disabled:opacity-60 ${
          isLight
            ? "bg-primary text-white hover:bg-forest"
            : "bg-bright text-forest hover:bg-white"
        }`}
      >
        {status === "loading" ? "Joining…" : "Join the Waitlist →"}
      </button>
      {status === "error" && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className={`font-body text-sm sm:basis-full ${isLight ? "text-red-600" : "text-red-200"}`}
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
