import type { Resend } from "resend";

const ADMIN_EMAIL = "berin.arikan@nutripath.ca";

export async function notifyAdmin(
  resend: Resend,
  subject: string,
  lines: string[]
) {
  try {
    await resend.emails.send({
      from: "NutriPath Alerts <alerts@nutripath.ca>",
      to: ADMIN_EMAIL,
      subject,
      html: lines.map((line) => `<p>${line}</p>`).join(""),
    });
  } catch (err) {
    console.error("[notifyAdmin] Failed to send admin notification:", err);
  }
}
