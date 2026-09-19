# Toon Transport

Marketing site and booking form for Toon Transport: motorbike recovery, transport and repair across the UK.

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
| `NEXT_PUBLIC_PHONE` | Phone number shown on the site, e.g. `07700 900123`. Leave unset to hide the call buttons. |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number with country code, digits only, e.g. `447700900123`. |
| `NEXT_PUBLIC_EMAIL` | Public email address shown in the footer. |
| `NEXT_PUBLIC_BASE_AREA` | Where the workshop is, e.g. `West Yorkshire`. Used in the FAQ. |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com). Turns on email delivery of bookings. |
| `BOOKING_TO_EMAIL` | Inbox that receives booking requests. Comma-separate for more than one. |
| `BOOKING_FROM_EMAIL` | Optional sender, e.g. `Toon Transport <bookings@yourdomain.co.uk>`. Needs a verified domain in Resend. Defaults to Resend's onboarding sender. |

## How bookings work

1. The form posts to `/api/booking`, which validates the fields and assigns a reference like `TT-260919-K7PQ`.
2. If `RESEND_API_KEY` and `BOOKING_TO_EMAIL` are set, the booking is emailed to that inbox with the customer's email as reply-to.
3. If they are not set yet, the customer sees the same confirmation plus one-tap WhatsApp, email and call buttons with the booking already written out, so nothing gets lost while the inbox is being set up.

A hidden honeypot field drops most bot submissions.
