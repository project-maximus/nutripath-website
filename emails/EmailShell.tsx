import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/seo";

const colors = {
  primary: "#3a760d",
  bright: "#54b51b",
  charcoal: "#343433",
  mid: "#767676",
  offwhite: "#f5f7f2",
  forest: "#1a3d06",
  sage: "#e8f4e0",
};

export function EmailShell({
  preview,
  children,
}: {
  preview: string;
  children: ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: colors.offwhite,
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
          margin: 0,
          padding: "32px 16px",
        }}
      >
        <Container
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #e5e7e0",
          }}
        >
          <Section style={{ backgroundColor: colors.forest, padding: "28px 32px" }}>
            <Img
              src={`${SITE_URL}/images/illustrations/nutripath-logo-mark.png`}
              width="40"
              height="29"
              alt="NutriPath"
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            <span
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                marginLeft: "10px",
                fontSize: "18px",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              NutriPath
            </span>
          </Section>

          <Section style={{ padding: "36px 32px 8px" }}>{children}</Section>

          <Hr style={{ borderColor: "#e5e7e0", margin: "8px 32px 0" }} />
          <Section style={{ padding: "20px 32px 28px" }}>
            <Text style={{ fontSize: "12px", color: colors.mid, margin: 0, lineHeight: "18px" }}>
              NutriPath Canada — Your Personal Study Trainer for the CDRE &amp; KCAT.
              <br />
              This email was sent because you requested it at{" "}
              <a href={SITE_URL} style={{ color: colors.mid }}>
                nutripath.ca
              </a>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export { colors };
