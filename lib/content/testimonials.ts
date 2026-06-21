import type { Testimonial } from "@/components/marketing/TestimonialCard";

export const testimonials: Testimonial[] = [
  {
    badge: "KCAT — January 2026 Bootcamp",
    badgeTone: "bright",
    quote: "I only wish I had known about NutriPath before my first KCAT attempt!",
    name: "Jana J.",
    role: "January 2026 KCAT Bootcamp participant",
  },
  {
    badge: "CDRE Candidate",
    badgeTone: "primary",
    quote:
      "NutriPath actually understands the exam. The content is built by people who sat the CDRE. That makes all the difference.",
    name: "CDRE Candidate",
    role: "NutriPath community member",
    featured: true,
  },
  {
    badge: "IED Pathway",
    badgeTone: "mid",
    quote:
      "As an internationally educated dietitian, I finally found prep resources that acknowledged my path — not just the domestic grad experience.",
    name: "IED Candidate",
    role: "NutriPath community member",
  },
];

export const cdreSpotlightTestimonial: Testimonial = {
  badge: "CDRE Prep, Cohort Candidate",
  badgeTone: "primary",
  quote:
    "Studying for the CDRE always felt like a second job nobody trained me for. NutriPath is the first resource that explained why I was getting questions wrong, not just that I was.",
  name: "CDRE Candidate",
  role: "NutriPath community member",
};
