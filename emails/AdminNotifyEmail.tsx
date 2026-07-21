import { Heading, Section, Text } from "@react-email/components";
import { colors, EmailShell } from "@/emails/EmailShell";

export function AdminNotifyEmail({
  heading,
  leadEmail,
  detail,
}: {
  heading: string;
  leadEmail: string;
  detail: string;
}) {
  return (
    <EmailShell preview={heading}>
      <Heading
        style={{
          fontSize: "20px",
          fontWeight: 800,
          color: colors.charcoal,
          margin: "0 0 16px",
        }}
      >
        {heading}
      </Heading>

      <Section
        style={{
          backgroundColor: colors.sage,
          borderRadius: "12px",
          padding: "16px 20px",
          margin: "0 0 20px",
        }}
      >
        <Text style={{ fontSize: "13px", color: colors.primary, fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Lead email
        </Text>
        <Text style={{ fontSize: "16px", color: colors.charcoal, fontWeight: 700, margin: "4px 0 0" }}>
          {leadEmail}
        </Text>
      </Section>

      <Text style={{ fontSize: "14px", lineHeight: "22px", color: colors.mid, margin: 0 }}>
        {detail}
      </Text>
    </EmailShell>
  );
}
