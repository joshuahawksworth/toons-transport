"use client";

import { useEffect, useState } from "react";

export const DESIGNS = [
  { key: "sketch", label: "Sketch" },
  { key: "hivis", label: "Hi-vis" },
  { key: "paddock", label: "Paddock" },
] as const;
export type DesignKey = (typeof DESIGNS)[number]["key"];

/**
 * Review-only picker so the three visual directions can be compared on the
 * live site. Delete this component (and the inline script in layout.tsx)
 * once a design is chosen.
 */
export function DesignSwitcher() {
  const [design, setDesign] = useState<DesignKey>("sketch");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current = document.documentElement.dataset.design as DesignKey | undefined;
    if (current && DESIGNS.some((d) => d.key === current)) setDesign(current);
  }, []);

  const choose = (key: DesignKey) => {
    setDesign(key);
    document.documentElement.dataset.design = key;
    try {
      localStorage.setItem("tt-design", key);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set("design", key);
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="design-switch" data-open={open || undefined}>
      <button type="button" className="design-switch-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="design-switch-panel">
        Design: {DESIGNS.find((d) => d.key === design)?.label}
      </button>
      <div id="design-switch-panel" className="design-switch-panel" hidden={!open}>
        {DESIGNS.map((d) => (
          <button key={d.key} type="button" aria-pressed={design === d.key} onClick={() => choose(d.key)}>
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
