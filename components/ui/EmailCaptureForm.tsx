"use client";

import { useId, useState } from "react";

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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const isDark = variant === "dark";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
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
        className="min-h-[44px] whitespace-nowrap rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-forest"
      >
        {ctaLabel}
      </button>
    </form>
  );
}
