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

interface VanSketchProps extends SVGProps<SVGSVGElement> {
  /** Adds the road, motion lines, weather and margin notes for the hero. */
  detailed?: boolean;
  /** Animates the strokes drawing themselves in. */
  draw?: boolean;
}

/**
 * The logo mark: the Toon Transport van, side on, drawn as a cutaway so you
 * can see the customer's bike strapped down inside.
 */
export function VanSketch({ detailed = false, draw = false, ...rest }: VanSketchProps) {
  const g = draw ? "sketch-draw" : undefined;
  const p = (i: number) => ({ style: { ["--i" as string]: i } });
  return (
    <svg viewBox={detailed ? "0 0 320 176" : "14 34 282 106"} role="img" aria-label="A sketched van, drawn as a cutaway, with a motorbike strapped down inside" {...rest}>
      <g filter="url(#wobble)" className={g} {...stroke}>
        {detailed && (
          <>
            {/* road */}
            <path d="M6 140 Q 80 136 160 140 T 314 139" strokeWidth="2" {...p(0)} />
            <path d="M30 150 L54 150 M78 150 L102 150 M126 150 L150 150 M174 150 L198 150 M222 150 L246 150 M270 150 L292 150" strokeWidth="1.6" className="pencil" {...p(1)} />
            {/* motion lines */}
            <path d="M4 70 L16 70 M0 84 L16 84 M4 98 L16 98" strokeWidth="2" className="pencil" {...p(2)} />
            {/* a bit of weather, because it's the UK */}
            <path d="M244 14 q 6 -12 18 -6 q 6 -10 18 -4 q 12 -2 12 8 q 6 4 0 8 H 246 q -8 -2 -2 -6" strokeWidth="1.8" className="pencil" {...p(3)} />
            <path d="M262 28 l -3 6 M272 28 l -3 6 M282 28 l -3 6" strokeWidth="1.6" className="pencil" {...p(3)} />
          </>
        )}

        {/* van body: rear box, sloping windscreen, short bonnet */}
        <path d="M22 122 V50 Q22 40 32 40 H196 L234 74 H276 Q290 74 290 92 V122 Z" {...p(4)} />
        {/* roof rail and the line where the cargo box meets the cab */}
        <path d="M32 46 H192" strokeWidth="1.4" className="pencil" {...p(5)} />
        <path d="M166 44 V120" strokeWidth="1.8" {...p(5)} />
        <path d="M172 86 h10" strokeWidth="2" {...p(5)} />
        {/* door window, narrow at the top where the pillar leans back */}
        <path d="M172 50 H204 L228 72 H172 Z" fill="url(#hatch-blue)" {...p(6)} />
        {/* mirror, headlight, bumper */}
        <path d="M232 60 h8 v10 h-8 z" strokeWidth="1.8" {...p(6)} />
        <path d="M282 88 q 6 0 6 6 v 6 h -8 z" fill="var(--marker)" strokeWidth="1.6" {...p(6)} />
        <path d="M262 122 H292" strokeWidth="3" {...p(6)} />
        {/* wheel arches and wheels */}
        <path d="M50 122 a 18 18 0 0 1 36 0 M226 122 a 18 18 0 0 1 36 0" {...p(7)} />
        <circle cx="68" cy="126" r="15" {...p(8)} />
        <circle cx="68" cy="126" r="6" fill="url(#hatch)" {...p(8)} />
        <circle cx="244" cy="126" r="15" {...p(8)} />
        <circle cx="244" cy="126" r="6" fill="url(#hatch)" {...p(8)} />
        <path d="M86 122 H226" strokeWidth="2" {...p(8)} />

        {/* the cutaway: the bike inside the cargo box */}
        <g transform="translate(10 -3)" {...p(9)}>
          {/* wheels with tyres */}
          <circle cx="58" cy="102" r="14" strokeWidth="3" />
          <circle cx="58" cy="102" r="7" fill="url(#hatch)" strokeWidth="1.6" />
          <circle cx="128" cy="102" r="14" strokeWidth="3" />
          <circle cx="128" cy="102" r="7" fill="url(#hatch)" strokeWidth="1.6" />
        </g>
        <g transform="translate(10 -3)" {...p(10)}>
          {/* swingarm, frame, forks */}
          <path d="M58 102 L88 96" />
          <path d="M88 96 L96 70 L118 64" />
          <path d="M118 64 L128 102" strokeWidth="3" />
          {/* rear shock */}
          <path d="M84 84 L92 70" strokeWidth="1.8" />
          {/* tank and seat */}
          <path d="M96 70 Q104 56 120 64" fill="url(#hatch)" />
          <path d="M96 70 L72 74 Q74 66 96 66" fill="url(#hatch)" />
          {/* engine */}
          <path d="M92 78 h18 q4 0 4 4 v10 h-24 v-10 q0 -4 2 -4 z" fill="url(#hatch)" />
          {/* exhaust */}
          <path d="M112 92 q10 8 -6 12 L70 106" strokeWidth="2" />
          {/* bars, headlight, mudguard */}
          <path d="M118 64 L114 54 M108 54 L124 51" />
          <circle cx="126" cy="60" r="3" strokeWidth="1.6" />
          <path d="M116 92 a 14 14 0 0 1 24 -4" strokeWidth="1.8" />
        </g>
        {/* tie-down straps */}
        <path d="M98 93 L88 118 M122 77 L150 118" strokeWidth="1.6" strokeDasharray="4 4" className="pencil" {...p(11)} />

        {detailed && (
          <g className="note" fontFamily="var(--font-hand)" fontSize="15" fill="currentColor" stroke="none" {...p(12)}>
            <text x="38" y="24">your bike, strapped in</text>
            <path d="M84 28 q 6 14 4 22" {...stroke} strokeWidth="1.6" className="pencil" />
            <text x="212" y="46">us</text>
            <path d="M212 48 q -6 6 -2 12" {...stroke} strokeWidth="1.6" className="pencil" />
            <text x="14" y="170">fig. 1 - the van, cutaway view</text>
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
      <VanSketch className="logo-mark" />
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
