import { NextResponse } from "next/server";

const GUIDES = {
  cdre: {
    file: "CDRE Study Tips NutriPath Canada-2.pdf",
    filename: "CDRE-Study-Tips-NutriPath.pdf",
    label: "CDRE Study Tips",
  },
  kcat: {
    file: "KCAT Ethics Study Guide.pdf",
    filename: "KCAT-Ethics-Study-Guide-NutriPath.pdf",
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

  // ─── Resend integration (wire when ready) ────────────────────────────────
  // import { Resend } from "resend";
  // import path from "path";
  // import fs from "fs";
  //
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // const pdf = fs.readFileSync(path.join(process.cwd(), "resourses", chosen.file));
  //
  // await resend.emails.send({
  //   from: "NutriPath Canada <resources@nutripath.ca>",
  //   to: email,
  //   subject: `Your free guide: ${chosen.label}`,
  //   html: `
  //     <p>Hi there,</p>
  //     <p>Thanks for downloading from NutriPath. Your free guide is attached.</p>
  //     <p><strong>${chosen.label}</strong></p>
  //     <p>Good luck with your preparation. We're rooting for you.</p>
  //     <p>— The NutriPath Team</p>
  //   `,
  //   attachments: [{ filename: chosen.filename, content: pdf }],
  // });
  // ─────────────────────────────────────────────────────────────────────────

  console.log(`[resources] "${chosen.label}" requested by: ${email}`);

  return NextResponse.json({ ok: true });
}
