import { NextResponse } from "next/server";
import { Resend } from "resend";

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
  const downloadUrl = new URL(chosen.path, request.url).toString();

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "NutriPath Canada <resources@nutripath.ca>",
    to: email,
    subject: `Your free guide: ${chosen.label}`,
    html: `
      <p>Hi there,</p>
      <p>Thanks for downloading from NutriPath. Here's your free guide:</p>
      <p><a href="${downloadUrl}"><strong>${chosen.label} (PDF)</strong></a></p>
      <p>Good luck with your preparation. We're rooting for you.</p>
      <p>— The NutriPath Team</p>
    `,
  });

  if (error) {
    console.error(`[resources] Resend error for ${email}:`, error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  console.log(`[resources] "${chosen.label}" sent to: ${email}`);

  return NextResponse.json({ ok: true });
}
