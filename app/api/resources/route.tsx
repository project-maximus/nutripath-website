import { NextResponse } from "next/server";
import { Resend } from "resend";
import { GuideDeliveryEmail } from "@/emails/GuideDeliveryEmail";
import { SITE_URL } from "@/lib/seo";

const GUIDES = {
  cdre: {
    path: "/guides/CDRE-Study-Tips-NutriPath.pdf",
    label: "CDRE Study Tips",
  },
  kcat: {
    path: "/guides/KCAT-Ethics-Study-Guide-NutriPath.pdf",
    label: "KCAT Ethics Study Guide",
  },
} as const;

type GuideKey = keyof typeof GUIDES;

export async function POST(request: Request) {
  let email: string;
  let guide: GuideKey;

  try {
    const body = await request.json();
    email = (body.email ?? "").trim().toLowerCase();
    guide = body.guide as GuideKey;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!guide || !(guide in GUIDES)) {
    return NextResponse.json({ error: "Invalid guide specified." }, { status: 400 });
  }

  const chosen = GUIDES[guide];
  const downloadUrl = `${SITE_URL}${chosen.path}`;

  if (!process.env.RESEND_API_KEY) {
    console.error("[resources] RESEND_API_KEY is not set in this environment.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "NutriPath Canada <resources@nutripath.ca>",
      replyTo: "berin.arikan@nutripath.ca",
      to: email,
      subject: `Your free guide: ${chosen.label}`,
      react: <GuideDeliveryEmail guideLabel={chosen.label} downloadUrl={downloadUrl} />,
    });

    if (error) {
      console.error(`[resources] Resend error for ${email}:`, error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }

    console.log(`[resources] "${chosen.label}" sent to: ${email}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[resources] Unexpected error sending to ${email}:`, err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
