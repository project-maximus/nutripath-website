export type FaqIconKey =
  | "exam"
  | "levels"
  | "verified"
  | "accessibility"
  | "trending"
  | "target"
  | "calendar"
  | "users"
  | "formats"
  | "payment";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  iconKey: FaqIconKey;
};

type RawFaqItem = Omit<FaqItem, "id">;

// Order: general homepage FAQ first, then KCAT-specific, then CDRE-specific.
const rawFaqItems: RawFaqItem[] = [
  // ── Homepage FAQ ──────────────────────────────────────────────────
  {
    question: "Which courses & content do you have available?",
    answer:
      "NutriPath offers the Knowledge and Competency Assessment Tool (KCAT) Bootcamp (live cohort format) and Canadian Dietetic Registration Examination (CDRE) prep packages (Comprehensive and Premium), each combining video lectures, practice questions, flashcards, mock exams, and a community portal, with Premium adding 24/7 Artificial Intelligence (AI) tutor support.",
    iconKey: "formats",
  },
  {
    question:
      "Is NutriPath only for Canadian or internationally trained Registered Dietitians (RDs)?",
    answer:
      "No — NutriPath serves Internationally Educated Dietitians (IEDs), new Canadian graduates, neurodivergent learners, and United States (US)-trained dietitians seeking Canadian licensure.",
    iconKey: "users",
  },
  {
    question: "Is NutriPath right for students?",
    answer:
      "Yes — it's built for new graduates, repeat test-takers, and IEDs alike, with flexible formats suited to different learning styles and schedules.",
    iconKey: "users",
  },
  {
    question: "Do you offer a corporate or group practice membership rate?",
    answer:
      "Not yet published, but our small-cohort CDRE and KCAT programs naturally support group enrollment — reach out to discuss a group rate for your team.",
    iconKey: "payment",
  },
  {
    question: "Do I have to jump through hoops to cancel?",
    answer:
      "No — contact our support team directly; since access runs per exam cycle rather than as a recurring subscription, there's nothing complicated to cancel.",
    iconKey: "payment",
  },
  {
    question: "What if I want to upgrade?",
    answer:
      "You can upgrade between CDRE tiers (e.g., Comprehensive to Premium) at any time by paying the price difference — just contact our team to switch.",
    iconKey: "payment",
  },
  {
    question: "What if I have questions about the content?",
    answer:
      "Our RD content team and community portal are available to answer content questions directly through the platform.",
    iconKey: "verified",
  },
  {
    question: "Who are the content creators?",
    answer:
      "All materials are created by practicing Registered Dietitians (RDs), led by founder Berin Arikan, RD, MPH — built by dietitians, for dietitians.",
    iconKey: "verified",
  },
  {
    question:
      "Does NutriPath offer Continuing Education Unit (CEU) credits recognized by the College of Dietitians (CDR)?",
    answer:
      "Not currently — our focus is exam licensing prep, not post-registration continuing education.",
    iconKey: "verified",
  },
  {
    question:
      "Do you only provide handouts, or do you also include summaries of evidence?",
    answer:
      "Content is evidence-mapped to official exam blueprints, not just static handouts — you get the \"why\" behind each concept, not just the fact.",
    iconKey: "formats",
  },
  {
    question:
      "What accessibility features do you include, and how do I find them?",
    answer:
      "NutriPath is built to Web Content Accessibility Guidelines (WCAG) 2.1 AA standards, with dyslexia-friendly fonts, colour-blind-compliant brand colours, keyboard navigation, and subtitles/transcripts on every video — accessible directly from your learner dashboard settings.",
    iconKey: "accessibility",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes — flexible payment plans are available across all packages so cost isn't a barrier to preparing fully.",
    iconKey: "payment",
  },
  {
    question: "Can I share an account?",
    answer:
      "No — accounts and materials are for individual use only to keep pricing fair for everyone.",
    iconKey: "users",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Due to the nature of digital content, no refunds will be issued once access has been granted. Please review all package details carefully before purchasing, and feel free to reach out with any questions before enrolling at nutripathcanada@gmail.com.",
    iconKey: "payment",
  },
  {
    question:
      "If I write the CDRE or KCAT and I'm unsuccessful, can I regain access?",
    answer:
      "Yes. Please reach out to nutripathcanada@gmail.com with evidence of your exam attempt, and we will provide a discounted extension to your access so you can continue preparing for your next attempt, at no extra charge beyond the discounted rate.",
    iconKey: "payment",
  },

  // ── KCAT FAQ ──────────────────────────────────────────────────────
  {
    question:
      "What is the Knowledge and Competency Assessment Tool (KCAT) Bootcamp?",
    answer:
      "A live, small-cohort (5–10 learners) preparation program with structured sessions, mock exams, practice questions, cheat sheets, and study-buddy pairings for Internationally Educated Dietitians (IEDs).",
    iconKey: "levels",
  },
  {
    question: "How long does the Bootcamp run?",
    answer:
      "It runs over two weeks with 10 live sessions plus a mock exam and review, and all sessions are recorded so you can revisit them throughout your prep period.",
    iconKey: "calendar",
  },
  {
    question: "Do I get pre-written study notes?",
    answer:
      "Rather than static notes, you get an interactive, multi-format learning experience — video lectures, practice questions, and flashcards woven into each of the seven competency domains set by the International Competencies for Dietetic Education and Practice (ICDEP), plus a progress dashboard to track your strengths and gaps.",
    iconKey: "formats",
  },
  {
    question: "How much does it cost?",
    answer:
      "Founding-member pricing for Summer 2026 will be shared directly with the waitlist, with rates increasing for future cohorts.",
    iconKey: "payment",
  },
  {
    question: "Do you offer payment plans for the Bootcamp?",
    answer:
      "Yes — flexible payment plans are available to reduce the financial barrier to enrolling.",
    iconKey: "payment",
  },
  {
    question:
      "Can this program help with the Knowledge and Competency Assessment Tool (KCAT) specifically?",
    answer:
      "Yes — the KCAT Bootcamp is designed specifically for this exam, distinct from Canadian Dietetic Registration Examination (CDRE) prep.",
    iconKey: "levels",
  },
  {
    question: "Who is the KCAT Bootcamp best suited for?",
    answer:
      "Internationally Educated Dietitians (IEDs) who already have clinical knowledge but need structured guidance bridging into Canadian standards, plus new grads and neurodivergent learners.",
    iconKey: "users",
  },
  {
    question: "Is there a 1-on-1 coaching add-on?",
    answer:
      "Yes — the 1-to-1 Dietetic Deep Dive is available as an optional per-hour add-on for personalized topic support. Contact us for current rates.",
    iconKey: "target",
  },
  {
    question:
      "Do you include specific lab value ranges in your study materials?",
    answer:
      "Yes — clinical assessment content includes relevant biochemical data, such as HbA1c (Hemoglobin A1c) and cholesterol values, and lab interpretation as part of the Nutrition Care competency domain.",
    iconKey: "exam",
  },
  {
    question:
      "Do you have exam prep for the United States (US) Dietetic Registration Exam?",
    answer:
      "No — NutriPath is built exclusively for the Canadian KCAT and CDRE pathways.",
    iconKey: "trending",
  },

  // ── CDRE FAQ ──────────────────────────────────────────────────────
  {
    question:
      "Is this program affiliated with the Alliance of Canadian Dietetic Regulatory Bodies (Alliance) or my regulatory body?",
    answer:
      "No — NutriPath is an independent learning-support platform, not affiliated with the Alliance or any College of Dietitians.",
    iconKey: "verified",
  },
  {
    question:
      "Does this program guarantee I will pass the Canadian Dietetic Registration Examination (CDRE)?",
    answer:
      "No — no program can guarantee a pass; NutriPath provides structured, evidence-informed support, but results depend on your own preparation.",
    iconKey: "target",
  },
  {
    question: "What is included in the program?",
    answer:
      "CDRE Comprehensive includes study materials, question bank, coaching-led cohort sessions, and mock exams with detailed feedback; CDRE Premium adds 24/7 Artificial Intelligence (AI) tutor support on top.",
    iconKey: "formats",
  },
  {
    question: "Do I get pre-written study notes?",
    answer:
      "Instead of static notes alone, you get an interactive experience — video lectures, practice questions, and flashcards integrated by competency domain, plus a progress dashboard showing your readiness.",
    iconKey: "formats",
  },
  {
    question: "How many practice questions are included?",
    answer:
      "Question volume varies by tier; rather than competing on raw count, materials focus on case-based, application-style questions that mirror actual CDRE reasoning demands.",
    iconKey: "exam",
  },
  {
    question: "How does the mock exam work?",
    answer:
      "Mock exams are full-length and timed to mirror the real CDRE — 185 multiple-choice items over 4 hours, roughly 80% independent items and 20% case-based.",
    iconKey: "exam",
  },
  {
    question: "How long do I have access to the program?",
    answer:
      "Access covers the exam period plus one to two months after your exam date, with discounted extensions available if you don't pass.",
    iconKey: "calendar",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "No monetary refunds currently, but unsuccessful candidates receive a discounted membership extension to keep preparing for their next attempt.",
    iconKey: "payment",
  },
  {
    question: "Who created this program?",
    answer:
      "Created by practicing Registered Dietitians (RDs) led by founder Berin Arikan, RD, Master of Public Health (MPH), mapped directly to the official CDRE Exam Blueprint.",
    iconKey: "verified",
  },
  {
    question: "Can educators recommend this program to their students?",
    answer:
      "Yes — educators are welcome to recommend NutriPath as a supplementary CDRE resource; reach out to discuss a partnership.",
    iconKey: "users",
  },
  {
    question:
      "What's the difference between this program and the Alliance's CDRE Preparation Guide?",
    answer:
      "The Alliance of Canadian Dietetic Regulatory Bodies' (Alliance) guide is the official blueprint reference; NutriPath translates that blueprint into guided learning — video lessons, case-based practice, AI tutoring, and coaching.",
    iconKey: "trending",
  },
  {
    question:
      "Can this program help with the Knowledge and Competency Assessment Tool (KCAT) too?",
    answer:
      "Yes — NutriPath offers a separate, dedicated KCAT Bootcamp built specifically for the competency assessment pathway.",
    iconKey: "levels",
  },
  {
    question: "Can I share my login or materials with a friend?",
    answer: "No — accounts are licensed for individual use only.",
    iconKey: "users",
  },
  {
    question:
      "Do you include specific lab value ranges (like HbA1c or cholesterol) in your study materials?",
    answer:
      "Yes — biochemical data and lab interpretation, including HbA1c (Hemoglobin A1c), are covered within the Nutrition Care domain, the heaviest-weighted section of the exam.",
    iconKey: "exam",
  },
  {
    question:
      "Do you have exam prep for the United States (US) Dietetic Registration Exam?",
    answer: "No — NutriPath focuses exclusively on the Canadian CDRE and KCAT pathways.",
    iconKey: "trending",
  },
];

export const faqItems: FaqItem[] = rawFaqItems.map((item, index) => ({
  ...item,
  id: `faq-${index}`,
}));

/** Index ranges within `faqItems`, for pages that want a topic-specific slice. */
export const FAQ_RANGES = {
  homepage: [0, 15] as const,
  kcat: [15, 25] as const,
  cdre: [25, 40] as const,
};
