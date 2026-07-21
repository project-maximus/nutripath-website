import { Heading, Text } from "@react-email/components";
import { colors, EmailShell } from "@/emails/EmailShell";

export function NewsletterConfirmEmail() {
  return (
    <EmailShell preview="You're on the list">
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
      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: "0 0 8px" }}>
        Thanks for signing up. You&apos;ll get updates, early access, and
        founding-member pricing as soon as it&apos;s available — nothing else,
        no spam.
      </Text>
      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: "20px 0 0" }}>
        Talk soon,
        <br />
        — The NutriPath Team
      </Text>
    </EmailShell>
  );
}
