import { Heading, Section, Text } from "@react-email/components";
import { colors, EmailShell } from "@/emails/EmailShell";

export function WaitlistConfirmEmail({ email }: { email: string }) {
  return (
    <EmailShell preview="You're on the waitlist">
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: 800,
          color: colors.charcoal,
          margin: "0 0 12px",
        }}
      >
        You&apos;re on the waitlist 🎉
      </Heading>
      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: "0 0 20px" }}>
        Thanks for your patience while we put the finishing touches on the
        NutriPath platform. We&apos;ll email you the moment it&apos;s ready
        to log in.
      </Text>

      <Section
        style={{
          backgroundColor: colors.sage,
          borderRadius: "12px",
          padding: "16px 20px",
          margin: "0 0 24px",
        }}
      >
        <Text style={{ fontSize: "13px", color: colors.primary, fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          You joined the waitlist with
        </Text>
        <Text style={{ fontSize: "16px", color: colors.charcoal, fontWeight: 700, margin: "4px 0 0" }}>
          {email}
        </Text>
      </Section>

      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: 0 }}>
        Not the right email? Just reply to this message and we&apos;ll sort
        it out.
      </Text>

      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: "20px 0 0" }}>
        Talk soon,
        <br />
        — The NutriPath Team
      </Text>
    </EmailShell>
  );
}
