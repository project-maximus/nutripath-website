"use client";

import { useId, useState } from "react";
import TermsModal from "@/components/marketing/TermsModal";

type EmailCaptureFormProps = {
  ctaLabel?: string;
  placeholder?: string;
  variant?: "light" | "dark";
  className?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailCaptureForm({
  ctaLabel = "Join the email list",
  placeholder = "you@email.com",
  variant = "light",
  className = "",
}: EmailCaptureFormProps) {
  const inputId = useId();
  const agreeId = useId();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "error" | "agreement-error" | "loading" | "success" | "submit-error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isDark = variant === "dark";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }
    if (!agreed) {
      setStatus("agreement-error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("submit-error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("submit-error");
    }
  }

  if (status === "success") {
    return (
      <p
        className={`font-body text-base font-medium ${
          isDark ? "text-bright" : "text-primary"
        } ${className}`}
        role="status"
      >
        You&rsquo;re on the list! Check your inbox to confirm.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 ${className}`}
      noValidate
    >
      <div className="flex-1">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          placeholder={placeholder}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${inputId}-error` : undefined}
          className={`w-full rounded-full border px-5 py-3.5 text-base text-charcoal placeholder:text-mid focus-visible:outline-2 focus-visible:outline-offset-2 ${
            status === "error"
              ? "border-red-500"
              : isDark
              ? "border-white/20 bg-white/95"
              : "border-[#E5E7E0] bg-white"
          }`}
        />
        {status === "error" && (
          <p
            id={`${inputId}-error`}
            className={`mt-2 text-sm ${isDark ? "text-red-200" : "text-red-600"}`}
          >
            Please enter a valid email address.
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="min-h-[44px] whitespace-nowrap rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-forest disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : ctaLabel}
      </button>
      {status === "submit-error" && (
        <p role="alert" className={`text-sm ${isDark ? "text-red-200" : "text-red-600"}`}>
          {errorMsg}
        </p>
      )}
      <div className="flex items-start gap-2.5">
        <input
          id={agreeId}
          type="checkbox"
          checked={agreed}
          aria-invalid={status === "agreement-error"}
          aria-describedby={
            status === "agreement-error" ? `${agreeId}-error` : undefined
          }
          onChange={(event) => {
            setAgreed(event.target.checked);
            if (status === "agreement-error") setStatus("idle");
          }}
          className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-mid/40 text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        <p
          className={`font-body text-xs leading-relaxed ${
            isDark ? "text-white/50" : "text-mid"
          }`}
        >
          <label htmlFor={agreeId}>I agree to the </label>
          <TermsModal
            triggerClassName={`font-semibold underline underline-offset-2 hover:no-underline ${
              isDark ? "text-white/70" : "text-charcoal"
            }`}
            onAgree={() => {
              setAgreed(true);
              if (status === "agreement-error") setStatus("idle");
            }}
          />
          .
        </p>
      </div>
      {status === "agreement-error" && (
        <p
          id={`${agreeId}-error`}
          className={`-mt-1 text-sm ${isDark ? "text-red-200" : "text-red-600"}`}
          role="alert"
        >
          Please agree to the Terms &amp; Conditions to continue.
        </p>
      )}
    </form>
  );
}
