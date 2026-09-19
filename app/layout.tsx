import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Architects_Daughter, Atkinson_Hyperlegible, Barlow, Barlow_Condensed, Bricolage_Grotesque, IBM_Plex_Sans, Permanent_Marker } from "next/font/google";
import { DesignSwitcher } from "@/components/DesignSwitcher";
import { Logo, SketchDefs } from "@/components/Sketches";
import { site, telHref } from "@/lib/site";
import "./globals.css";
import "./designs.css";

const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker", display: "swap" });
const hand = Architects_Daughter({ weight: "400", subsets: ["latin"], variable: "--font-hand", display: "swap" });
// Hi-vis design
const condensed = Barlow_Condensed({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-condensed", display: "swap" });
const barlow = Barlow({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-barlow", display: "swap" });
// Paddock design
const bricolage = Bricolage_Grotesque({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const plex = IBM_Plex_Sans({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-plex", display: "swap" });
const body = Atkinson_Hyperlegible({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} · ${site.slogan}`, template: `%s · ${site.name}` },
  description: site.description,
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
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        {/* Applies the chosen design before first paint. Remove with DesignSwitcher once a design is picked. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search).get("design");var s=localStorage.getItem("tt-design");var d=q||s||"sketch";if(["sketch","hivis","paddock"].indexOf(d)<0)d="sketch";document.documentElement.dataset.design=d;if(q)localStorage.setItem("tt-design",q);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${marker.variable} ${hand.variable} ${body.variable} ${condensed.variable} ${barlow.variable} ${bricolage.variable} ${plex.variable}`}>
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
            <p className="small">Motorbike recovery and transport across the UK. We move bikes, we don&rsquo;t fix them.</p>
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
        <DesignSwitcher />
      </body>
    </html>
  );
}
