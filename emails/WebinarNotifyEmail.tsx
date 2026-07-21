import { Heading, Section, Text } from "@react-email/components";
import { colors, EmailShell } from "@/emails/EmailShell";

const chips = ["Live Q&A", "Partner-led", "Free to attend", "Recorded for later"];

export function WebinarNotifyEmail() {
  return (
    <EmailShell preview="You're on the webinar notify list">
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: 800,
          color: colors.charcoal,
          margin: "0 0 12px",
        }}
      >
        You&apos;re on the list 🎉
      </Heading>
      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: "0 0 20px" }}>
        Thanks for your interest in NutriPath&apos;s partner webinars. We&apos;ll email you
        the moment the first session is announced — no need to do anything else.
      </Text>

      <Section style={{ margin: "0 0 24px" }}>
        {chips.map((chip) => (
          <span
            key={chip}
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 700,
              color: colors.primary,
              backgroundColor: colors.sage,
              borderRadius: "999px",
              padding: "6px 12px",
              margin: "0 8px 8px 0",
            }}
          >
            {chip}
          </span>
        ))}
      </Section>

      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: "8px 0 0" }}>
        Talk soon,
        <br />
        — The NutriPath Team
      </Text>
    </EmailShell>
  );
}
