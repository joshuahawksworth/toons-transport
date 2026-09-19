import { NextResponse } from "next/server";
import { Booking, makeReference, validateBooking } from "@/lib/booking";
import { sendBookingEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "We couldn't read that. Please try again." } }, { status: 400 });
  }

  const result = validateBooking(body);
  if (!result.ok) return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });

  // Honeypot: bots fill every field. Pretend it worked and drop it.
  if (result.data.website) return NextResponse.json({ ok: true, reference: makeReference(), delivered: true });

  const booking: Booking = { ...result.data, reference: makeReference(), receivedAt: new Date().toISOString() };
  delete booking.website;

  const { sent, reason } = await sendBookingEmail(booking);
  console.log(`[booking] ${booking.reference} delivered=${sent}${reason ? ` (${reason})` : ""}`);

  return NextResponse.json({ ok: true, reference: booking.reference, delivered: sent });
}
