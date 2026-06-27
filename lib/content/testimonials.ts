import type { Testimonial } from "@/components/marketing/TestimonialCard";

export const testimonials: Testimonial[] = [
  {
    badge: "KCAT Bootcamp Participant",
    badgeTone: "bright",
    quote:
      "It was exactly the bridge I needed to align my 13 years of international experience with Canadian requirements. I only wish I had known about NutriPath before my first KCAT attempt!",
    name: "Jana Jardali",
    role: "KCAT Bootcamp participant",
    featured: true,
  },
  {
    badge: "KCAT Bootcamp Participant",
    badgeTone: "primary",
    quote:
      "The recorded sessions were especially valuable in teaching me how to approach KCAT questions strategically. I would highly recommend this bootcamp to anyone going through the same process.",
    name: "R.D.",
    role: "KCAT Bootcamp participant",
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

export const kcatSpotlightTestimonial: Testimonial = {
  badge: "KCAT Bootcamp Participant",
  badgeTone: "bright",
  quote:
    "I truly loved the bootcamp. It was a much needed and incredibly valuable workshop — I only wish I had known about NutriPath before my first KCAT attempt!",
  name: "Jana Jardali",
  role: "KCAT Bootcamp participant",
};
