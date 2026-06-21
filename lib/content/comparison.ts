import type { ComparisonRow } from "@/components/marketing/ComparisonTable";

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Created by Registered Dietitians",
    nutripath: true,
    alternatives: "Usually generic test-prep companies",
  },
  { feature: "WCAG 2.1 AA accessibility", nutripath: true, alternatives: false },
  {
    feature: "Multi-format content (video, audio, text, flashcards)",
    nutripath: true,
    alternatives: "Text-only or limited",
  },
  {
    feature: "Full CDRE/KCAT mock exams",
    nutripath: true,
    alternatives: "Limited or unofficial",
  },
  { feature: "AI study tutor", nutripath: true, alternatives: false },
  { feature: "Personalized study plans", nutripath: true, alternatives: false },
  { feature: "Neurodiverse-friendly design", nutripath: true, alternatives: false },
  {
    feature: "Payment flexibility (payment plans)",
    nutripath: true,
    alternatives: "Rarely",
  },
  { feature: "IED pathway support", nutripath: true, alternatives: false },
  {
    feature: "Price",
    nutripath: "Transparent + flexible",
    alternatives: "$900–$1,500+ with less content",
  },
];
