"use client";

import { useEffect, useState } from "react";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Returns false, then flips to true once after `delay`ms — used to trigger a single grow-in transition. */
export function useGrowOnMount(delay = 200) {
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const id = setTimeout(
      () => setGrown(true),
      prefersReducedMotion() ? 0 : delay
    );
    return () => clearTimeout(id);
  }, [delay]);

  return grown;
}
