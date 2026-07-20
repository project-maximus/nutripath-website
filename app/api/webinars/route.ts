import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  let email: string;

  try {
    const body = await request.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "NutriPath Canada <webinars@nutripath.ca>",
    to: email,
    subject: "You're on the webinar notify list",
    html: `
      <p>Hi there,</p>
      <p>Thanks for your interest in NutriPath's partner webinars. We'll
      email you the moment the first session is announced.</p>
      <p>— The NutriPath Team</p>
    `,
  });

  if (error) {
    console.error(`[webinars] Resend error for ${email}:`, error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  console.log(`[webinars] notify-me signup: ${email}`);

  return NextResponse.json({ ok: true });
}
