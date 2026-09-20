import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { Icon, Rule, VanSketch } from "@/components/Sketches";
import { site, telHref } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Motorbike transport and logistics, UK wide</p>
          <h1 className="h-marker">
            Your bike,
            <br />
            <span className="hi">moved properly.</span>
          </h1>
          <p className="lead">
            Fully enclosed van, goods in transit insurance and a driver who rides. Dealer collections, house moves, track days and trade runs, booked for a day that suits you. Broken down? Ring us and we&rsquo;ll get to you where we can.
          </p>
          <div className="btn-row">
            <Link href="#book" className="btn btn-primary btn-lg">Book transport</Link>
            {site.phone && <a href={telHref(site.phone)} className="btn btn-lg">Breakdown? Ring {site.phone}</a>}
            {!site.phone && site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`} className="btn btn-lg">WhatsApp us</a>}
          </div>
          <ul className="margin-notes" aria-label="Quick facts">
            <li>fully enclosed LWB van</li>
            <li>goods in transit insured</li>
            <li>cameras inside and out</li>
            <li>price agreed before we set off</li>
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
              <h3>Bike transport</h3>
              <p>
                Door to door, anywhere in the UK. Dealer and auction collections, eBay buys, a bike to your new house or a mate&rsquo;s garage. Runners, non-runners and seized wheels all welcome, and the price is agreed before we set off.
              </p>
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
          <li>
            <span className="parts-icon"><Icon name="phone" /></span>
            <div>
              <h3>Breakdown pickups</h3>
              <p>
                Stuck at the roadside? Breakdowns are same-day jobs, so they go by phone rather than the form. If the van is free and you&rsquo;re in reach, we&rsquo;ll come out, strap the bike down properly and take you both home or to a garage of your choice.
              </p>
              {site.phone ? (
                <a href={telHref(site.phone)} className="book-link">Ring {site.phone}</a>
              ) : (
                <Link href="#contact" className="book-link">How to reach us</Link>
              )}
            </div>
          </li>
        </ol>
      </section>

      <Rule label="the van" />

      <section id="van" className="section">
        <ol className="parts-list">
          <li>
            <span className="parts-icon"><Icon name="van" /></span>
            <div>
              <h3>Fully enclosed LWB van</h3>
              <p>
                Fully enclosed LWB van setup shields classic, vintage, custom and expensive bikes from road salt, stone chips and weather conditions. Front wheel in a chock, soft-loop ratchet straps on the bars or frame, padded where they touch paint.
              </p>
            </div>
          </li>
          <li>
            <span className="parts-icon"><Icon name="shield" /></span>
            <div>
              <h3>Goods in transit insurance</h3>
              <p>Your bike is covered by our goods in transit insurance from the moment it&rsquo;s loaded until it&rsquo;s off the van. Ask and we&rsquo;ll show you the certificate.</p>
            </div>
          </li>
          <li>
            <span className="parts-icon"><Icon name="camera" /></span>
            <div>
              <h3>Interior and exterior cameras</h3>
              <p>Cameras inside and outside the van for security, recording the whole journey. You get photos when it&rsquo;s loaded and a message when it&rsquo;s dropped off.</p>
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
              <h3>Tell us where it is and where it&rsquo;s going</h3>
              <p>The form takes a minute. Pick a date, or tell us you&rsquo;re flexible.</p>
            </div>
          </li>
          <li>
            <span className="route-stop">2</span>
            <div>
              <h3>We ring back with a price and a slot</h3>
              <p>Distance, whether it rolls, and how flexible you are on the day. That&rsquo;s it. No hidden extras.</p>
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
            <p>{site.baseArea ? `Based in ${site.baseArea}, covering the whole UK.` : "The whole UK."} Long runs are booked for a day that suits you. Flexible dates let us pair jobs on the same route, which usually means a better price.</p>
          </details>
          <details>
            <summary>Is my bike insured while it&rsquo;s with you?</summary>
            <p>Yes. We hold goods in transit insurance and it covers your bike from loading to delivery. Happy to send the certificate over before you book.</p>
          </details>
          <details>
            <summary>Is the van enclosed?</summary>
            <p>Yes, fully. No open trailers. Classic, vintage, custom and expensive bikes travel out of the salt, the stone chips and the weather, and out of sight.</p>
          </details>
          <details>
            <summary>Do you still do breakdowns?</summary>
            <p>Where we can. Pre-booked transport comes first, but if the van is free and you&rsquo;re in reach we&rsquo;ll come and get you. Ring rather than filling in the form, it&rsquo;s quicker.</p>
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
            <summary>What comes with a track day run?</summary>
            <p>Collection the day before or early that morning, delivery to your paddock spot before sign-on, and the run home. Spare wheels, stands, tyre warmers and fuel cans travel with the bike.</p>
          </details>
        </div>
      </section>

      <Rule label="book" />

      <section id="book" className="section book">
        <div className="book-intro">
          <h2 className="h-hand">Get it booked</h2>
          <p className="lead">Transport, track days and trade jobs. One minute to fill in, and we ring you back with a price and a slot.</p>

          <div id="contact" className="contact-card">
            <div className="contact-row">
              <span className="contact-icon"><Icon name="phone" /></span>
              <div>
                <p className="contact-label">Broken down? Ring us</p>
                {site.phone ? (
                  <a href={telHref(site.phone)} className="contact-value">{site.phone}</a>
                ) : (
                  <p className="contact-value contact-soon">Number coming soon</p>
                )}
                <p className="small">Breakdowns are same-day, so they don&rsquo;t go through the form. We&rsquo;ll get to you where we can.</p>
              </div>
            </div>
            <div className="contact-row">
              <span className="contact-icon"><Icon name="mail" /></span>
              <div>
                <p className="contact-label">Anything else? Email us</p>
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="contact-value">{site.email}</a>
                ) : (
                  <p className="contact-value contact-soon">Address coming soon</p>
                )}
                <p className="small">Quotes for odd jobs, trade accounts, insurance questions, or anything that doesn&rsquo;t fit the form.</p>
              </div>
            </div>
            {site.whatsapp && (
              <p className="small contact-extra">
                Prefer WhatsApp? <a href={`https://wa.me/${site.whatsapp}`}>Message us here</a>.
              </p>
            )}
          </div>

          <p className="small">Your details are only used for this job. <Link href="/privacy">Privacy policy</Link>.</p>
        </div>
        <BookingForm phone={site.phone} whatsapp={site.whatsapp} email={site.email} />
      </section>

      {(site.phone || site.whatsapp) && (
        <div className="mobile-bar">
          {site.phone ? (
            <a href={telHref(site.phone)} className="btn">Breakdown? Call {site.phone}</a>
          ) : (
            <a href={`https://wa.me/${site.whatsapp}`} className="btn">WhatsApp us</a>
          )}
        </div>
      )}
    </>
  );
}
