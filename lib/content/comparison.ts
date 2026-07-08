import type { ComparisonPlan } from "@/components/marketing/ComparisonTable";

export const comparisonPlans: ComparisonPlan[] = [
  {
    name: "KCAT Bootcamp",
    designedFor: "Internationally educated dietitians, first KCAT attempt",
    exam: "KCAT",
    format: "Live cohort + peer groups & study buddy pairing",
    price: "$499 · payment plan available",
    notForYouIf: "You are preparing for the CDRE, or prefer fully self-paced study",
  },
  {
    name: "CDRE Comprehensive Package",
    designedFor:
      "Independent learners who want a full study system with peer accountability",
    exam: "CDRE",
    format: "Self-paced + community channel",
    price: "$499 · payment plan available",
    notForYouIf: "You want adaptive, AI-guided support",
  },
  {
    name: "CDRE Premium Package",
    designedFor: "Learners who want adaptive, personalized support",
    exam: "CDRE",
    format: "Self-paced + community + AI tutor",
    price: "$799 · payment plan available",
    notForYouIf: "You prefer to study without AI-supported tools",
  },
  {
    name: "1-to-1 Dietetic Deep Dive",
    designedFor: "Anyone needing targeted one-on-one help",
    exam: "KCAT or CDRE",
    format: "Live, one-on-one add-on",
    price: "~$100–150/hr",
    notForYouIf: "You are looking for a complete stand-alone program",
  },
];
