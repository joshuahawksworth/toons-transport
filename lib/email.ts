import { Booking, bookingAsText, JOBS } from "./booking";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/**
 * Sends the booking to the business inbox through Resend's HTTP API.
 * Returns false (without throwing) when email isn't configured so the
 * site still works before the keys are added.
 *
 *   RESEND_API_KEY       from https://resend.com
 *   BOOKING_TO_EMAIL     where booking requests should land
 *   BOOKING_FROM_EMAIL   optional, defaults to Resend's onboarding sender
 */
export async function sendBookingEmail(booking: Booking): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  if (!apiKey || !to) return { sent: false, reason: "not-configured" };

  const from = process.env.BOOKING_FROM_EMAIL || "Toon Transport <onboarding@resend.dev>";
  const text = bookingAsText(booking);
  const html = `<pre style="font: 15px/1.5 ui-monospace, Menlo, monospace; white-space: pre-wrap">${escapeHtml(text)}</pre>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      subject: `${booking.reference} · ${JOBS[booking.job].label} · ${booking.bike} · ${booking.pickup}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Resend rejected booking email", res.status, body);
    return { sent: false, reason: "provider-error" };
  }
  return { sent: true };
}
