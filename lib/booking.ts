export type Job = "recovery" | "transport" | "trackday" | "trade";
export type Timing = "asap" | "date";

export interface BookingInput {
  job: Job;
  name: string;
  phone: string;
  bike: string;
  pickup: string;
  dropoff: string;
  details: string;
  timing: Timing;
  date: string;
  website?: string; // honeypot, must stay empty
}

export interface Booking extends BookingInput {
  reference: string;
  receivedAt: string;
}

export const JOBS: Record<Job, { label: string; pickup: string; dropoff: string; details: string; placeholder: string }> = {
  recovery: {
    label: "Breakdown recovery",
    pickup: "Where is the bike?",
    dropoff: "Where should it go? (optional)",
    details: "What's happened?",
    placeholder: "Cut out on the A1 near junction 45 and won't restart. It rolls fine.",
  },
  transport: {
    label: "Transport",
    pickup: "Collect from",
    dropoff: "Deliver to",
    details: "Anything we should know?",
    placeholder: "Non-runner bought on eBay. Seller is around weekdays. Rear wheel is seized.",
  },
  trackday: {
    label: "Track day",
    pickup: "Collect the bike from",
    dropoff: "Which circuit?",
    details: "Dates, and what's coming with it",
    placeholder: "Donington, Saturday 4 October. Bike plus wheels with wets, paddock stand and a fuel can.",
  },
  trade: {
    label: "Trade job",
    pickup: "Collect from",
    dropoff: "Deliver to",
    details: "Job details",
    placeholder: "Two bikes from our showroom to a customer in Leeds, any day next week. Purchase order on request.",
  },
};

export const JOB_KEYS = Object.keys(JOBS) as Job[];

const UK_PHONE = /^(\+44\s?|0)\d[\d\s]{8,12}$/;

export function validateBooking(raw: unknown): { ok: true; data: BookingInput } | { ok: false; errors: Record<string, string> } {
  const src = (raw ?? {}) as Record<string, unknown>;
  const str = (k: string) => (typeof src[k] === "string" ? (src[k] as string).trim() : "");
  const errors: Record<string, string> = {};

  const data: BookingInput = {
    job: (JOB_KEYS.includes(str("job") as Job) ? str("job") : "recovery") as Job,
    name: str("name"),
    phone: str("phone"),
    bike: str("bike"),
    pickup: str("pickup"),
    dropoff: str("dropoff"),
    details: str("details"),
    timing: str("timing") === "date" ? "date" : "asap",
    date: str("date"),
    website: str("website"),
  };

  const needsDropoff = data.job === "transport" || data.job === "trackday" || data.job === "trade";

  if (data.name.length < 2) errors.name = "Tell us your name so we know who to ask for.";
  if (!UK_PHONE.test(data.phone)) errors.phone = "Enter a UK phone number we can ring you back on.";
  if (data.bike.length < 2) errors.bike = "Make and model, so we bring the right kit.";
  if (data.pickup.length < 3) errors.pickup = "A postcode or town is enough.";
  if (needsDropoff && data.dropoff.length < 3) errors.dropoff = "Where is it going?";
  if (data.details.length < 6) errors.details = "A line or two is plenty.";
  if (data.details.length > 2000) errors.details = "Keep it under 2000 characters.";
  if (data.timing === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.date = "Pick a date, or choose as soon as possible.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data };
}

export function makeReference(date = new Date()): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let tail = "";
  for (let i = 0; i < 4; i++) tail += alphabet[Math.floor(Math.random() * alphabet.length)];
  const d = `${date.getUTCFullYear().toString().slice(2)}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
  return `TT-${d}-${tail}`;
}

export function bookingAsText(b: BookingInput & { reference: string }, greeting = false): string {
  const when = b.timing === "asap" ? "As soon as possible" : b.date;
  return [
    greeting ? `Hi Toon Transport, booking request ${b.reference}` : `Booking request ${b.reference}`,
    `Job: ${JOBS[b.job].label}`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Bike: ${b.bike}`,
    `${JOBS[b.job].pickup} ${b.pickup}`,
    b.dropoff ? `${JOBS[b.job].dropoff.replace(" (optional)", "")} ${b.dropoff}` : null,
    `When: ${when}`,
    `${JOBS[b.job].details}: ${b.details}`,
  ]
    .filter(Boolean)
    .join("\n");
}
