import { NextResponse } from "next/server";
import { Resend } from "resend";
import { NewsletterConfirmEmail } from "@/emails/NewsletterConfirmEmail";
import { notifyAdmin } from "@/lib/notifyAdmin";

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
    console.error("[newsletter] RESEND_API_KEY is not set in this environment.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "NutriPath Canada <updates@nutripath.ca>",
      replyTo: "berin.arikan@nutripath.ca",
      to: email,
      subject: "You're on the list",
      react: <NewsletterConfirmEmail />,
    });

    if (error) {
      console.error(`[newsletter] Resend error for ${email}:`, error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }

    console.log(`[newsletter] signup: ${email}`);
    await notifyAdmin(resend, "New newsletter signup", [
      `<strong>${email}</strong> just joined the "Stay in the loop" email list.`,
    ]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[newsletter] Unexpected error sending to ${email}:`, err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
