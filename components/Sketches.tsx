import type { SVGProps } from "react";

/** Filters and patterns every sketch on the page shares. Render once, in the layout. */
export function SketchDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="wobble-strong" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        </pattern>
        <pattern id="hatch-blue" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--blue)" strokeWidth="1.2" strokeOpacity="0.55" />
        </pattern>
      </defs>
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

interface TruckSketchProps extends SVGProps<SVGSVGElement> {
  /** Adds the ground, motion lines and margin notes for the hero. */
  detailed?: boolean;
  /** Animates the strokes drawing themselves in. */
  draw?: boolean;
}

/**
 * The logo mark: a broken-down bike (note the plaster on the tank) strapped
 * onto the back of the Toon Transport pickup, ready to go.
 */
export function TruckSketch({ detailed = false, draw = false, ...rest }: TruckSketchProps) {
  const g = draw ? "sketch-draw" : undefined;
  const p = (i: number) => ({ style: { ["--i" as string]: i } });
  return (
    <svg viewBox={detailed ? "0 0 300 170" : "18 30 222 90"} role="img" aria-label="A sketched pickup truck carrying a motorbike with a plaster on its fuel tank" {...rest}>
      <g filter="url(#wobble)" className={g} {...stroke}>
        {detailed && (
          <>
            {/* road */}
            <path d="M6 128 Q 70 124 140 128 T 292 127" strokeWidth="2" {...p(0)} />
            <path d="M24 138 L48 138 M70 138 L94 138 M118 138 L142 138 M166 138 L190 138 M214 138 L238 138 M260 138 L280 138" strokeWidth="1.6" className="pencil" {...p(1)} />
            {/* motion lines */}
            <path d="M10 88 L28 88 M4 98 L26 98 M10 108 L28 108" strokeWidth="2" className="pencil" {...p(2)} />
            {/* a bit of weather, because it's the UK */}
            <path d="M212 26 q 6 -12 18 -6 q 6 -10 18 -4 q 12 -2 12 8 q 6 4 0 8 H 214 q -8 -2 -2 -6" strokeWidth="1.8" className="pencil" {...p(3)} />
            <path d="M230 40 l -3 6 M240 40 l -3 6 M250 40 l -3 6" strokeWidth="1.6" className="pencil" {...p(3)} />
          </>
        )}

        {/* flatbed */}
        <path d="M30 84 L172 84 L172 96 L30 96 Z" {...p(4)} />
        <path d="M30 84 L172 84 L172 96 L30 96 Z" fill="url(#hatch)" stroke="none" {...p(4)} />
        {/* cab */}
        <path d="M172 96 L172 60 L204 60 L226 80 L236 96 Z" {...p(5)} />
        <path d="M178 65 L202 65 L218 80 L178 80 Z" fill="url(#hatch-blue)" {...p(6)} />
        <path d="M226 80 L236 82 L238 96" {...p(6)} />
        <circle cx="230" cy="89" r="2.6" fill="var(--marker)" strokeWidth="1.6" {...p(6)} />
        {/* wheel arches + wheels */}
        <path d="M44 96 a 18 18 0 0 1 36 0 M190 96 a 18 18 0 0 1 36 0" {...p(7)} />
        <circle cx="62" cy="104" r="14" {...p(8)} />
        <circle cx="62" cy="104" r="5" fill="url(#hatch)" {...p(8)} />
        <circle cx="208" cy="104" r="14" {...p(8)} />
        <circle cx="208" cy="104" r="5" fill="url(#hatch)" {...p(8)} />
        {/* underside line */}
        <path d="M78 104 L192 104" strokeWidth="2" {...p(8)} />

        {/* the bike on the bed */}
        <circle cx="66" cy="70" r="14" {...p(9)} />
        <circle cx="66" cy="70" r="4" fill="url(#hatch)" {...p(9)} />
        <circle cx="128" cy="70" r="14" {...p(9)} />
        <circle cx="128" cy="70" r="4" fill="url(#hatch)" {...p(9)} />
        {/* front forks + bars */}
        <path d="M128 70 L118 40 M114 38 L128 32" {...p(10)} />
        {/* frame, tank, seat */}
        <path d="M118 44 L96 42 L84 62 L66 70 M96 42 L74 44 L72 52" {...p(10)} />
        <path d="M96 42 L104 34 L116 40" fill="url(#hatch)" {...p(10)} />
        {/* engine + exhaust */}
        <path d="M90 54 h16 v12 h-16 z" fill="url(#hatch)" {...p(11)} />
        <path d="M100 66 q -10 8 -28 6" strokeWidth="2" {...p(11)} />
        {/* tie-down straps */}
        <path d="M84 60 L72 84 M112 56 L136 84" strokeWidth="1.6" strokeDasharray="4 4" className="pencil" {...p(12)} />
        {/* the plaster on the tank */}
        <g className="red" {...p(13)}>
          <path d="M100 30 L112 42" strokeWidth="5" />
          <path d="M112 30 L100 42" strokeWidth="5" />
          <path d="M100 30 L112 42 M112 30 L100 42" strokeWidth="1.2" stroke="var(--paper)" />
        </g>
        {/* the little sweat drop: it's had a rough day */}
        <path d="M134 26 q 4 6 0 8 q -4 -2 0 -8" strokeWidth="1.6" className="blue" fill="var(--blue)" {...p(13)} />

        {detailed && (
          <g className="note" fontFamily="var(--font-hand)" fontSize="15" fill="currentColor" stroke="none" {...p(14)}>
            <text x="150" y="20">your bike</text>
            <path d="M156 24 q 10 12 -8 18" {...stroke} strokeWidth="1.6" className="pencil" />
            <text x="252" y="66">us</text>
            <path d="M250 62 q -12 -4 -14 6" {...stroke} strokeWidth="1.6" className="pencil" />
            <text x="12" y="160">fig. 1 - recovery in progress</text>
          </g>
        )}
      </g>
    </svg>
  );
}

/** Wordmark and mark together. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo${compact ? " logo-compact" : ""}`}>
      <TruckSketch className="logo-mark" />
      <span className="logo-word">
        Toon<span className="logo-word-2">Transport</span>
      </span>
    </span>
  );
}

type IconName = "wrench" | "van" | "house" | "tag" | "phone" | "clipboard" | "map" | "clock" | "shield" | "flag";

const ICONS: Record<IconName, string> = {
  wrench: "M14 4 a6 6 0 0 0 -7 8 L3 16 l 3 3 l 4 -4 a6 6 0 0 0 8 -7 l -3 3 l -3 -1 l -1 -3 z",
  van: "M2 15 V7 h11 v8 M13 9 h5 l3 4 v2 h-19 M6 18 a2 2 0 1 0 0.1 0 M17 18 a2 2 0 1 0 0.1 0",
  house: "M3 11 L12 4 L21 11 M5 10 V20 h14 V10 M10 20 v-6 h4 v6",
  tag: "M3 12 L12 3 h8 v8 L11 20 z M16 7 a1 1 0 1 0 0.1 0",
  phone: "M5 3 h4 l2 5 l-2 2 a11 11 0 0 0 5 5 l2 -2 l5 2 v4 a2 2 0 0 1 -2 2 A16 16 0 0 1 3 5 a2 2 0 0 1 2 -2",
  clipboard: "M8 4 h8 v3 h-8 z M6 5 H5 v16 h14 V5 h-1 M8 11 h8 M8 15 h6",
  map: "M3 6 l6 -2 l6 2 l6 -2 v14 l-6 2 l-6 -2 l-6 2 z M9 4 v14 M15 6 v14",
  clock: "M12 3 a9 9 0 1 0 0.1 0 M12 7 v5 l3 3",
  shield: "M12 3 l8 3 v6 c0 5 -4 8 -8 9 c-4 -1 -8 -4 -8 -9 V6 z M9 12 l2 2 l4 -4",
  flag: "M5 21 V4 M5 4 h14 l-3 4 l3 4 H5 M9 4 v8 M13 4 v8 M5 8 h14",
};

export function Icon({ name, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" {...rest}>
      <path d={ICONS[name]} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" filter="url(#wobble)" />
    </svg>
  );
}

/** A hand-ruled divider between sections. */
export function Rule({ label }: { label?: string }) {
  return (
    <div className="rule" aria-hidden="true">
      <svg viewBox="0 0 600 12" preserveAspectRatio="none">
        <path d="M2 6 Q 150 2 300 7 T 598 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" filter="url(#wobble)" />
      </svg>
      {label && <span className="rule-label">{label}</span>}
    </div>
  );
}
