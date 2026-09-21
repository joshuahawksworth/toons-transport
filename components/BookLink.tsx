"use client";

import type { Job } from "@/lib/booking";

/** Event the booking form listens for, so a link anywhere on the page can pre-select the job. */
export const JOB_EVENT = "tt:job";

/**
 * A link to the booking form that also picks the job. A plain anchor is used
 * rather than next/link so the browser scrolls even when the hash is already
 * #book, and the job is passed by event because a hash like #book?job=x
 * matches no element and never scrolls.
 */
export function BookLink({ job, className, children }: { job: Job; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={`/?job=${job}#book`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const target = document.getElementById("book");
        if (!target) return; // not on the home page: let the browser navigate
        e.preventDefault();
        window.dispatchEvent(new CustomEvent<Job>(JOB_EVENT, { detail: job }));
        history.replaceState(null, "", `?job=${job}#book`);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}
