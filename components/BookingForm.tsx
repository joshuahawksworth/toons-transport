"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { bookingAsText, JOB_KEYS, JOBS, type BookingInput, type Job, type Timing } from "@/lib/booking";
import { Icon } from "./Sketches";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; reference: string; delivered: boolean } | { kind: "error"; message: string };

interface Props {
  phone: string;
  whatsapp: string;
  email: string;
}

const initial: BookingInput = {
  job: "recovery",
  name: "",
  phone: "",
  bike: "",
  pickup: "",
  dropoff: "",
  details: "",
  timing: "asap",
  date: "",
  website: "",
};

export function BookingForm({ phone, whatsapp, email }: Props) {
  const [form, setForm] = useState<BookingInput>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const uid = useId();
  const id = (k: keyof BookingInput) => `booking-${k}`;
  const job = JOBS[form.job];

  // Links like /#book?job=trackday (from the services list) pre-select the job.
  useEffect(() => {
    const pick = () => {
      const m = window.location.hash.match(/job=([a-z]+)/);
      if (m && JOB_KEYS.includes(m[1] as Job)) setForm((f) => ({ ...f, job: m[1] as Job }));
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  const set = <K extends keyof BookingInput>(k: K, v: BookingInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.ok) {
        setErrors(json.errors ?? {});
        setStatus({ kind: "error", message: json.errors?.form ?? "A couple of things need a second look above." });
        const first = Object.keys(json.errors ?? {})[0];
        if (first) document.getElementById(id(first as keyof BookingInput))?.focus();
        return;
      }
      setStatus({ kind: "sent", reference: json.reference, delivered: json.delivered });
    } catch {
      setStatus({ kind: "error", message: "We couldn't send that. Check your connection and try again." });
    }
  }

  if (status.kind === "sent") {
    const summary = bookingAsText({ ...form, reference: status.reference }, true);
    return (
      <div className="sheet sheet-done" role="status" aria-live="polite">
        <div className="stamp">Received</div>
        <h3 className="h-hand">Cheers, {form.name.split(" ")[0]}. We&rsquo;ve got it.</h3>
        <p>
          Reference <strong className="mono">{status.reference}</strong>. We&rsquo;ll ring <strong>{form.phone}</strong> with a price.
        </p>
        {!status.delivered && (
          <>
            <p>Send it straight to us as well, with one tap. The details are already written out.</p>
            <div className="btn-row">
              {whatsapp && (
                <a className="btn btn-primary" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noopener">
                  Send on WhatsApp
                </a>
              )}
              {email && (
                <a className="btn" href={`mailto:${email}?subject=${encodeURIComponent(`Booking request ${status.reference}`)}&body=${encodeURIComponent(summary)}`}>
                  Send by email
                </a>
              )}
              {phone && (
                <a className="btn" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                  Call {phone}
                </a>
              )}
            </div>
            <details className="summary-details">
              <summary>What we&rsquo;ve written out</summary>
              <pre className="summary-pre">{summary}</pre>
            </details>
          </>
        )}
        <button type="button" className="btn btn-ghost" onClick={() => { setForm(initial); setStatus({ kind: "idle" }); }}>
          Book another
        </button>
      </div>
    );
  }

  const field = (k: keyof BookingInput, label: string, input: React.ReactNode, hint?: string) => (
    <div className={`field${errors[k] ? " field-error" : ""}`}>
      <label htmlFor={id(k)}>{label}</label>
      {input}
      {errors[k] ? (
        <p className="field-msg" id={`${id(k)}-msg`} role="alert">{errors[k]}</p>
      ) : hint ? (
        <p className="field-hint" id={`${id(k)}-msg`}>{hint}</p>
      ) : null}
    </div>
  );

  const props = (k: keyof BookingInput) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id(k)}-msg` : undefined,
  });

  return (
    <form className="sheet" onSubmit={onSubmit} noValidate>
      <div className="sheet-head">
        <Icon name="clipboard" />
        <div>
          <p className="eyebrow">Job sheet</p>
          <h3 className="h-hand">Book it</h3>
        </div>
      </div>

      <fieldset>
        <legend>What do you need?</legend>
        <div className="chips" role="radiogroup" aria-label="Type of job">
          {JOB_KEYS.map((k) => (
            <label key={k} className={`chip${form.job === k ? " chip-on" : ""}`}>
              <input type="radio" name="job" value={k} checked={form.job === k} onChange={() => set("job", k)} />
              {JOBS[k].label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>You and the bike</legend>
        <div className="grid-2">
          {field("name", "Your name", <input {...props("name")} type="text" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} />)}
          {field("phone", "Phone", <input {...props("phone")} type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />)}
        </div>
        {field("bike", "Bike", <input {...props("bike")} type="text" placeholder="e.g. Honda CB500F, 2019" value={form.bike} onChange={(e) => set("bike", e.target.value)} />)}
      </fieldset>

      <fieldset>
        <legend>Where and when</legend>
        <div className="grid-2">
          {field("pickup", job.pickup, <input {...props("pickup")} type="text" placeholder="Postcode or town" value={form.pickup} onChange={(e) => set("pickup", e.target.value)} />)}
          {field("dropoff", job.dropoff, <input {...props("dropoff")} type="text" placeholder={form.job === "trackday" ? "e.g. Cadwell Park" : "Postcode or town"} value={form.dropoff} onChange={(e) => set("dropoff", e.target.value)} />)}
        </div>
        <div className="field" role="radiogroup" aria-labelledby={`${uid}-when`}>
          <span className="label" id={`${uid}-when`}>When?</span>
          <div className="radio-row">
            <label className="radio">
              <input type="radio" name="timing" value="asap" checked={form.timing === "asap"} onChange={() => set("timing", "asap" as Timing)} />
              As soon as possible
            </label>
            <label className="radio">
              <input type="radio" name="timing" value="date" checked={form.timing === "date"} onChange={() => set("timing", "date" as Timing)} />
              Pick a date
            </label>
          </div>
        </div>
        {form.timing === "date" && field("date", "Date", <input {...props("date")} type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(e) => set("date", e.target.value)} />)}
        {field("details", job.details, <textarea {...props("details")} rows={3} placeholder={job.placeholder} value={form.details} onChange={(e) => set("details", e.target.value)} />)}
      </fieldset>

      {/* Honeypot for bots. Hidden from people and screen readers. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      {status.kind === "error" && <p className="form-msg" role="alert">{status.message}</p>}

      <div className="sheet-foot">
        <button type="submit" className="btn btn-primary btn-lg" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send it"}
        </button>
        <p className="small">We ring back with a price. Nothing is booked until you say yes.</p>
      </div>
    </form>
  );
}
