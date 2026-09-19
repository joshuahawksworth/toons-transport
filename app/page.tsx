import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { Icon, Rule, VanSketch } from "@/components/Sketches";
import { site, telHref } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Motorbike recovery and transport, UK wide</p>
          <h1 className="h-marker">
            Broken down?
            <br />
            <span className="hi">We&rsquo;ll pick you up.</span>
          </h1>
          <p className="lead">
            We collect bikes that won&rsquo;t go and take them wherever they need to be: home, a garage, a dealer, or the paddock at your next track day.
          </p>
          <div className="btn-row">
            <Link href="#book" className="btn btn-primary btn-lg">Book a pickup</Link>
            {site.phone && <a href={telHref(site.phone)} className="btn btn-lg">Ring {site.phone}</a>}
            {!site.phone && site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`} className="btn btn-lg">WhatsApp us</a>}
          </div>
          <ul className="margin-notes" aria-label="Quick facts">
            <li>any bike, any state</li>
            <li>price agreed before we set off</li>
            <li>photos when it&rsquo;s loaded</li>
          </ul>
        </div>
        <figure className="hero-art">
          <VanSketch draw className="hero-svg" />
        </figure>
      </section>

      <Rule label="what we do" />

      <section id="services" className="section">
        <ol className="parts-list">
          <li>
            <span className="parts-icon"><Icon name="van" /></span>
            <div>
              <h3>Breakdown recovery</h3>
              <p>Stuck at the roadside? We come out, strap the bike down properly and take you both home or to a garage of your choice.</p>
              <Link href="#book?job=recovery" className="book-link">Book recovery</Link>
            </div>
          </li>
          <li>
            <span className="parts-icon"><Icon name="house" /></span>
            <div>
              <h3>Transport</h3>
              <p>Bike to a dealer, a mate&rsquo;s garage or your new house. Non-runners and eBay buys welcome, seized wheels included.</p>
              <Link href="#book?job=transport" className="book-link">Book transport</Link>
            </div>
          </li>
          <li>
            <span className="parts-icon"><Icon name="flag" /></span>
            <div>
              <h3>Track day logistics</h3>
              <p>
                Track bikes often aren&rsquo;t road legal, so we take yours to the circuit in the van, with tyres, stands and fuel, and bring it home after. Donington, Silverstone, Cadwell, Brands, Oulton, Snetterton, Anglesey, wherever you&rsquo;re booked.
              </p>
              <Link href="#book?job=trackday" className="book-link">Book a track day run</Link>
            </div>
          </li>
          <li>
            <span className="parts-icon"><Icon name="tag" /></span>
            <div>
              <h3>Trade and business</h3>
              <p>Dealers, garages, auction houses and insurers: regular collections, customer deliveries and salvage moves, invoiced monthly if you like.</p>
              <Link href="#book?job=trade" className="book-link">Book a trade job</Link>
            </div>
          </li>
        </ol>
      </section>

      <Rule label="how it works" />

      <section id="how" className="section">
        <ol className="route">
          <li>
            <span className="route-stop">1</span>
            <div>
              <h3>Tell us where the bike is</h3>
              <p>The form takes a minute. Or ring.</p>
            </div>
          </li>
          <li>
            <span className="route-stop">2</span>
            <div>
              <h3>We ring back with a price</h3>
              <p>Distance, whether it rolls, and the time of day. That&rsquo;s it. No call-out fee.</p>
            </div>
          </li>
          <li>
            <span className="route-stop">3</span>
            <div>
              <h3>Loaded and delivered</h3>
              <p>Photos when it&rsquo;s on the van, and a message when it&rsquo;s dropped off.</p>
            </div>
          </li>
        </ol>
      </section>

      <Rule label="questions" />

      <section id="faq" className="section">
        <div className="faq">
          <details>
            <summary>Where do you cover?</summary>
            <p>{site.baseArea ? `Based in ${site.baseArea}, covering the whole UK.` : "The whole UK."} Local jobs are usually same day. Long runs are booked for a day that suits you.</p>
          </details>
          <details>
            <summary>Can I ride in the van?</summary>
            <p>Yes. Passenger seat, room for your helmet and a bag.</p>
          </details>
          <details>
            <summary>Does the bike need tax, MOT or lights?</summary>
            <p>No. It rides on the van, so SORN bikes, non-runners and track bikes are all fine.</p>
          </details>
          <details>
            <summary>How is it secured?</summary>
            <p>Front wheel in a chock, soft-loop ratchet straps on the bars or frame, padded where they touch paint.</p>
          </details>
          <details>
            <summary>What comes with a track day run?</summary>
            <p>Collection the day before or early that morning, delivery to your paddock spot before sign-on, and the run home. Spare wheels, stands, tyre warmers and fuel cans travel with the bike.</p>
          </details>
        </div>
      </section>

      <Rule label="book" />

      <section id="book" className="section book">
        <div className="book-intro">
          <h2 className="h-hand">Get it booked</h2>
          <p className="lead">One minute to fill in. We ring you back with a price.</p>
          {site.phone && (
            <p>
              At the roadside now? Ring <a href={telHref(site.phone)}>{site.phone}</a>, it&rsquo;s quicker.
            </p>
          )}
          <p className="small">Your details are only used for this job. <Link href="/privacy">Privacy policy</Link>.</p>
        </div>
        <BookingForm phone={site.phone} whatsapp={site.whatsapp} email={site.email} />
      </section>

      {(site.phone || site.whatsapp) && (
        <div className="mobile-bar">
          {site.phone ? (
            <a href={telHref(site.phone)} className="btn">Call {site.phone}</a>
          ) : (
            <a href={`https://wa.me/${site.whatsapp}`} className="btn">WhatsApp us</a>
          )}
        </div>
      )}
    </>
  );
}
