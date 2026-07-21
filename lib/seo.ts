import type { FaqItem } from "@/lib/content/faq";

export const SITE_URL = "https://nutripath.ca";

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NutriPath Canada",
  url: "https://nutripath.ca",
  email: "nutripathcanada@gmail.com",
  description:
    "Accessibility-first CDRE and KCAT exam prep for Canadian dietitian candidates, built by registered dietitians.",
};
