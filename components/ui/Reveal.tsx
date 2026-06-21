"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  direction?: "up" | "down" | "scale-x" | "scale-y";
};

const baseClass: Record<"up" | "down" | "scale-x" | "scale-y", string> = {
  up: "reveal",
  down: "reveal-down",
  "scale-x": "reveal-scale-x",
  "scale-y": "reveal-scale-y",
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`${baseClass[direction]} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
