import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of service" };

export default function Terms() {
  return (
    <article className="legal">
      <p className="eyebrow">Terms of service</p>
      <h1 className="h-hand">The deal, in plain English</h1>
      <p className="small">Last updated September 2026</p>

      <h2>Who we are</h2>
      <p>{site.name} provides motorcycle recovery and transport services in the United Kingdom. We do not carry out repairs or diagnose faults. These terms apply to every booking made through this website, by phone or by message.</p>

      <h2>Booking and quotes</h2>
      <p>Sending the booking form is a request, not a confirmed booking. We will contact you with a price for the collection and delivery. A booking is confirmed only once you accept that price. The price quoted for transport is fixed unless the details you gave us turn out to be materially different, for example a bike that does not roll when we were told it would, or a different pickup address. If that happens we will tell you the new price before continuing, and you can cancel at no charge.</p>

      <h2>Payment</h2>
      <p>Transport is payable on delivery. We accept bank transfer and card. We may hold a bike until the agreed balance is paid.</p>

      <h2>Cancellations</h2>
      <p>You can cancel a confirmed transport booking free of charge until we set off. If we have already travelled to the pickup point when a booking is cancelled, we may charge for the mileage driven.</p>

      <h2>Your bike while it is with us</h2>
      <p>We take reasonable care of your bike while it is in our van and it is covered by our goods-in-transit insurance. Please remove valuables and tell us about any existing damage before collection; we photograph every bike when it is loaded. We are not responsible for pre-existing faults, or for loose items left on the bike.</p>

      <h2>Storage</h2>
      <p>If a delivery cannot be completed and we have to hold a bike for you, bikes held more than fourteen days after we have asked you to collect them may incur a daily storage charge, which we will tell you about in writing first.</p>

      <h2>Liability</h2>
      <p>Nothing in these terms limits our liability for death or personal injury caused by our negligence, or for anything else that cannot be limited by law. Our liability for loss or damage to your bike is limited to the cost of repairing it or its market value, whichever is lower.</p>

      <h2>Complaints and law</h2>
      <p>If something goes wrong, tell us and we will try to put it right. These terms are governed by the law of England and Wales, and your statutory rights as a consumer are not affected.</p>
    </article>
  );
}
