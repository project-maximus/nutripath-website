import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WebinarNotifyEmail } from "@/emails/WebinarNotifyEmail";

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

  if (!process.env.RESEND_API_KEY) {
    console.error("[webinars] RESEND_API_KEY is not set in this environment.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "NutriPath Canada <webinars@nutripath.ca>",
      replyTo: "berin.arikan@nutripath.ca",
      to: email,
      subject: "You're on the webinar notify list",
      react: <WebinarNotifyEmail />,
    });

    if (error) {
      console.error(`[webinars] Resend error for ${email}:`, error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }

    console.log(`[webinars] notify-me signup: ${email}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[webinars] Unexpected error sending to ${email}:`, err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
