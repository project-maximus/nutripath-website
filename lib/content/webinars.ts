export type Webinar = {
  slug: string;
  title: string;
  partner: string;
  date: string;
  time: string;
  format: "Live" | "Recorded";
  topics: string[];
  description: string;
  registerHref: string;
};

// Empty until the first partner webinar is confirmed — the section below
// renders a "coming soon" spotlight automatically when this array is empty,
// and switches to a full card grid the moment an entry is added here.
export const webinars: Webinar[] = [];
