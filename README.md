# Toon Transport

Marketing site and booking form for Toon Transport: motorbike transport and logistics across the UK, with breakdown pickups where the van is free. They move bikes; they do not repair them.

Built with Next.js (App Router), no UI framework. The sketch look is hand-drawn SVG plus CSS.

## Run it

```bash
npm install
npm run dev
```

## Settings

All settings are environment variables. Add them in Vercel under Project > Settings > Environment Variables, or in a local `.env.local`.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_PHONE` | The breakdown line, e.g. `07700 900123`. Shown in the hero, the contact card next to the form, and the footer. Leave unset to show "Number coming soon" and hide the call buttons. |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number with country code, digits only, e.g. `447700900123`. |
| `NEXT_PUBLIC_EMAIL` | Email for other queries. Shown in the contact card next to the form and in the footer. Leave unset to show "Address coming soon". |
| `NEXT_PUBLIC_BASE_AREA` | Where the van is based, e.g. `West Yorkshire`. Used in the FAQ. |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com). Turns on email delivery of bookings. |
| `BOOKING_TO_EMAIL` | Inbox that receives booking requests. Comma-separate for more than one. |
| `BOOKING_FROM_EMAIL` | Optional sender, e.g. `Toon Transport <bookings@yourdomain.co.uk>`. Needs a verified domain in Resend. Defaults to Resend's onboarding sender. |

## How bookings work

The form is for pre-booked work only: bike transport, track day runs and trade jobs. Breakdowns are same-day, so the site points those at the phone number instead of the form.

1. The form posts to `/api/booking`, which validates the fields and assigns a reference like `TT-260919-K7PQ`.
2. If `RESEND_API_KEY` and `BOOKING_TO_EMAIL` are set, the booking is emailed to that inbox with the customer's email as reply-to.
3. If they are not set yet, the customer sees the same confirmation plus one-tap WhatsApp, email and call buttons with the booking already written out, so nothing gets lost while the inbox is being set up.

A hidden honeypot field drops most bot submissions.

## Comparing designs

Three visual directions ship in the same build: `sketch` (default), `hivis` and `paddock`. The picker in the bottom-left corner swaps between them and remembers the choice in the browser. A link with `?design=hivis` or `?design=paddock` opens that design directly.

Once a design is chosen, delete `components/DesignSwitcher.tsx`, the inline script and `<DesignSwitcher />` in `app/layout.tsx`, and the unused blocks in `app/designs.css`.
