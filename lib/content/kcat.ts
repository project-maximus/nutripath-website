import {
  CalendarIcon,
  UsersIcon,
  ClipboardCheckIcon,
  ChatIcon,
} from "@/components/ui/icons";

export const kcatFeatureIcons = [
  {
    title: "Live bootcamp sessions",
    body: "Structured live sessions running Fall/Winter 2026 — not just a self-paced course.",
    icon: CalendarIcon,
    tone: "sage" as const,
  },
  {
    title: "Community support",
    body: "Study alongside other KCAT candidates who understand exactly what this exam takes.",
    icon: UsersIcon,
    tone: "primary" as const,
  },
  {
    title: "Mock KCAT practice",
    body: "Practice exam-style questions and case-based sets, with instant feedback.",
    icon: ClipboardCheckIcon,
    tone: "sage" as const,
  },
  {
    title: "Live Q&A workshop",
    body: "A 1-hour live session on how to answer practice questions, held at the end of the bootcamp.",
    icon: ChatIcon,
    tone: "primary" as const,
  },
];

export const kcatSpotlights = [
  {
    eyebrow: "Built for IEDs",
    title: "KCAT prep designed around the internationally educated dietitian pathway",
    body: "NutriPath was built with the IED journey in mind from the start. Content acknowledges that you may be navigating the KCAT, document assessment, and an unfamiliar Canadian context all at once — and never assumes a Canadian-born background.",
  },
  {
    eyebrow: "Live, cohort-based",
    title: "A bootcamp, not just another self-paced course",
    body: "The KCAT Bootcamp runs Fall/Winter 2026 as a structured, live cohort experience — scheduled sessions, real accountability, and a community of candidates moving through the same material at the same time.",
  },
  {
    eyebrow: "Practice with purpose",
    title: "Mock KCAT exams organized by competency",
    body: "Practice exam-style questions and case-based sets, with instant feedback — organized by competency area, so you always know what you're working on and how you're improving.",
  },
  {
    eyebrow: "The capstone",
    title: "A live 1-hour session on how to answer practice questions",
    body: "The bootcamp closes with a dedicated 1-hour live session focused entirely on how to approach and answer practice questions — bringing everything from the previous weeks together right before exam day.",
  },
];
