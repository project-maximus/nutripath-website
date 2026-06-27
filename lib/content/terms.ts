export type TermsSection = {
  title: string;
  body?: string;
  bullets?: string[];
};

export const termsIntro =
  "Welcome to NutriPath, an educational platform designed to support individuals preparing for dietetic licensing and competency assessments in Canada.";

export const termsAgreement =
  "By accessing or using NutriPath content, materials, or services, you agree to the following Terms & Conditions:";

export const termsSections: TermsSection[] = [
  {
    title: "1. Educational Purpose Only",
    body: "All NutriPath materials are provided for educational and exam-preparation purposes only. Content is not intended to replace formal academic education, supervised practice, mentorship, or professional judgment, and does not constitute dietetic advice or professional services.",
  },
  {
    title: "2. No Guarantee of Outcomes",
    body: "NutriPath does not guarantee exam results, licensure, employment, timelines, or career outcomes. Individual success depends on personal preparation, effort, and performance.",
  },
  {
    title: "3. Independent Resource",
    body: "NutriPath is an independent educational platform and is not affiliated with, endorsed by, or reviewed by any provincial dietetic regulatory body or national dietetic organization.",
  },
  {
    title: "4. User Responsibility",
    body: "Users are responsible for:",
    bullets: [
      "Confirming their eligibility for exams or registration with their provincial regulatory body",
      "Using NutriPath materials appropriately and ethically",
      "Ensuring their study approach aligns with official exam requirements",
    ],
  },
  {
    title: "5. Intellectual Property",
    body: "All NutriPath content, including study guides, videos, worksheets, and branding, is the intellectual property of NutriPath and may not be copied, shared, resold, or distributed without written permission.",
  },
  {
    title: "6. Access & Use",
    body: "Access to NutriPath materials is granted for personal, non-transferable use only. Account sharing or redistribution of content is not permitted.",
  },
  {
    title: "7. Limitation of Liability",
    body: "NutriPath is not responsible for exam outcomes, registration decisions, financial outcomes, or career results arising from the use of this platform.",
  },
  {
    title: "8. Changes to Content or Terms",
    body: "NutriPath may update content or these Terms & Conditions at any time. Continued use of the platform constitutes acceptance of any changes.",
  },
  {
    title: "9. Governing Law",
    body: "These Terms & Conditions are governed by the laws of Canada.",
  },
];
