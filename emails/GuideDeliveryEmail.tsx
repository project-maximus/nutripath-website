import { Button, Heading, Section, Text } from "@react-email/components";
import { colors, EmailShell } from "@/emails/EmailShell";

export function GuideDeliveryEmail({
  guideLabel,
  downloadUrl,
}: {
  guideLabel: string;
  downloadUrl: string;
}) {
  return (
    <EmailShell preview={`Your free guide: ${guideLabel}`}>
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: 800,
          color: colors.charcoal,
          margin: "0 0 12px",
        }}
      >
        Your free guide is ready
      </Heading>
      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: "0 0 20px" }}>
        Thanks for downloading from NutriPath. Your guide is ready whenever you are.
      </Text>

      <Section
        style={{
          backgroundColor: colors.sage,
          borderRadius: "12px",
          padding: "18px 20px",
          margin: "0 0 24px",
        }}
      >
        <Text style={{ fontSize: "13px", color: colors.primary, fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Free guide
        </Text>
        <Text style={{ fontSize: "17px", color: colors.charcoal, fontWeight: 700, margin: "4px 0 0" }}>
          {guideLabel}
        </Text>
      </Section>

      <Button
        href={downloadUrl}
        style={{
          backgroundColor: colors.primary,
          color: "#ffffff",
          fontSize: "15px",
          fontWeight: 700,
          borderRadius: "999px",
          padding: "13px 28px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Download PDF →
      </Button>

      <Text style={{ fontSize: "15px", lineHeight: "24px", color: colors.charcoal, margin: "28px 0 0" }}>
        Good luck with your preparation — we&apos;re rooting for you.
        <br />
        — The NutriPath Team
      </Text>
    </EmailShell>
  );
}
