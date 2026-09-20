/**
 * Site-wide settings. Contact details come from environment variables so the
 * live site never shows a made-up phone number. Set them in Vercel:
 *
 *   NEXT_PUBLIC_PHONE      e.g. "07700 900123" (the number to ring for a breakdown)
 *   NEXT_PUBLIC_WHATSAPP   digits only with country code, e.g. "447700900123"
 *   NEXT_PUBLIC_EMAIL      e.g. "hello@toontransport.co.uk" (for other queries)
 *   NEXT_PUBLIC_BASE_AREA  e.g. "West Yorkshire" (where the van is based)
 */
export const site = {
  name: "Toon Transport",
  slogan: "Your bike, moved properly.",
  description:
    "Toon Transport moves motorbikes anywhere in the UK in a fully enclosed van: dealer collections, house moves, track days and trade work, booked in advance. Breakdown pickups where we can. Goods in transit insured, cameras inside and out.",
  phone: process.env.NEXT_PUBLIC_PHONE?.trim() || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "",
  email: process.env.NEXT_PUBLIC_EMAIL?.trim() || "",
  baseArea: process.env.NEXT_PUBLIC_BASE_AREA?.trim() || "",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "",
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
