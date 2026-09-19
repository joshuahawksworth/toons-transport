"use client";

import { useEffect, useState } from "react";

export const DESIGNS = [
  { key: "sketch", label: "Sketch", blurb: "Pen and paper, highlighter yellow" },
  { key: "hivis", label: "Hi-vis", blurb: "Asphalt, reflective yellow, big capitals" },
  { key: "paddock", label: "Paddock", blurb: "Bone paper, racing green, orange button" },
] as const;
export type DesignKey = (typeof DESIGNS)[number]["key"];

/**
 * Temporary, review-only: a small button in the bottom-left corner opens a
 * drawer to swap between the three designs. Delete this component and the
 * inline script in layout.tsx once a design is chosen.
 */
export function DesignSwitcher() {
  const [design, setDesign] = useState<DesignKey>("sketch");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current = document.documentElement.dataset.design as DesignKey | undefined;
    if (current && DESIGNS.some((d) => d.key === current)) setDesign(current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const choose = (key: DesignKey) => {
    setDesign(key);
    document.documentElement.dataset.design = key;
    try {
      localStorage.setItem("tt-design", key);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set("design", key);
    window.history.replaceState(null, "", url);
    setOpen(false);
  };

  return (
    <>
      <button type="button" className="design-fab" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-controls="design-drawer">
        Design
      </button>
      <div className="design-scrim" hidden={!open} onClick={() => setOpen(false)} />
      <aside id="design-drawer" className="design-drawer" role="dialog" aria-label="Choose a design" aria-hidden={!open} data-open={open || undefined}>
        <p className="design-drawer-title">Pick a design to preview</p>
        {DESIGNS.map((d) => (
          <button key={d.key} type="button" className="design-option" aria-pressed={design === d.key} onClick={() => choose(d.key)}>
            <span>{d.label}</span>
            <small>{d.blurb}</small>
          </button>
        ))}
        <button type="button" className="design-close" onClick={() => setOpen(false)}>Close</button>
      </aside>
    </>
  );
}
