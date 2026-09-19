import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Architects_Daughter, Atkinson_Hyperlegible, Permanent_Marker } from "next/font/google";
import { Logo, SketchDefs } from "@/components/Sketches";
import { site, telHref } from "@/lib/site";
import "./globals.css";

const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker", display: "swap" });
const hand = Architects_Daughter({ weight: "400", subsets: ["latin"], variable: "--font-hand", display: "swap" });
const body = Atkinson_Hyperlegible({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} · ${site.slogan}`, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: "/favicon.svg" },
  openGraph: { title: site.name, description: site.slogan, type: "website", locale: "en_GB" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f0eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1e23" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en-GB">
      <body className={`${marker.variable} ${hand.variable} ${body.variable}`}>
        <SketchDefs />
        <a className="skip" href="#main">Skip to content</a>
        <header className="nav">
          <Link href="/" className="nav-logo" aria-label="Toon Transport home">
            <Logo compact />
          </Link>
          <nav aria-label="Main">
            <Link href="/#services">What we do</Link>
            <Link href="/#how">How it works</Link>
            <Link href="/#faq">Questions</Link>
          </nav>
          <Link href="/#book" className="btn btn-primary nav-cta">Book a pickup</Link>
        </header>
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="footer-brand">
            <Logo />
            <p className="footer-slogan">{site.slogan}</p>
            <p className="small">Motorbike recovery, transport and repair across the UK.</p>
          </div>
          <div className="footer-col">
            <p className="eyebrow">Get in touch</p>
            {site.phone ? <a href={telHref(site.phone)}>{site.phone}</a> : <span className="small">Use the booking form and we'll ring you.</span>}
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>}
            <Link href="/#book">Booking form</Link>
          </div>
          <div className="footer-col">
            <p className="eyebrow">The boring bits</p>
            <Link href="/terms">Terms of service</Link>
            <Link href="/privacy">Privacy policy</Link>
            <span className="small">Copyright {year} {site.name}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
