import type { Resend } from "resend";
import { AdminNotifyEmail } from "@/emails/AdminNotifyEmail";

const ADMIN_EMAIL = "berin.arikan@nutripath.ca";

export async function notifyAdmin(
  resend: Resend,
  subject: string,
  leadEmail: string,
  detail: string
) {
  try {
    await resend.emails.send({
      from: "NutriPath Alerts <alerts@nutripath.ca>",
      to: ADMIN_EMAIL,
      subject,
      react: <AdminNotifyEmail heading={subject} leadEmail={leadEmail} detail={detail} />,
    });
  } catch (err) {
    console.error("[notifyAdmin] Failed to send admin notification:", err);
  }
}
