import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Privacy() {
  return (
    <article className="legal">
      <p className="eyebrow">Privacy policy</p>
      <h1 className="h-hand">What we do with your details</h1>
      <p className="small">Last updated September 2026</p>

      <h2>What we collect</h2>
      <p>When you fill in the booking form we collect your name, phone number, email address if you give one, the details of your bike, the pickup and drop-off locations, the date you want and anything you tell us about the job. If you ring or message us we keep the details you give us in the same way.</p>

      <h2>Why we collect it</h2>
      <p>To arrange, carry out and invoice the job you have asked for, and to contact you about it. That is the lawful basis: carrying out a contract with you, or taking steps at your request before one exists. We do not use your details for marketing and we do not sell or share them with anyone except where needed to do the job, for example our insurer in the event of a claim.</p>

      <h2>How the form works</h2>
      <p>The booking form sends your details to {site.name} by email. The email is handled by our email provider on our behalf. The website itself does not store your booking in a database, and it does not use advertising cookies or tracking scripts.</p>

      <h2>How long we keep it</h2>
      <p>We keep job records, including your contact details, for six years after the job for accounting and insurance purposes. Booking requests that do not turn into a job are deleted within twelve months.</p>

      <h2>Your rights</h2>
      <p>You can ask to see the information we hold about you, ask us to correct it, or ask us to delete it where we no longer need it. {site.email ? `Email ${site.email} and we will sort it.` : "Contact us using the details on the home page and we will sort it."} If you are unhappy with how we have handled your data you can complain to the Information Commissioner&rsquo;s Office at ico.org.uk.</p>

      <h2>Hosting</h2>
      <p>This website is hosted on Vercel, whose servers may process your IP address and request logs to deliver the site. See Vercel&rsquo;s own privacy policy for details.</p>
    </article>
  );
}
