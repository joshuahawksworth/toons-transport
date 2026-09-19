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
  /** Adds the road, weather and margin notes for the hero. */
  detailed?: boolean;
  /** Animates the strokes drawing themselves in. */
  draw?: boolean;
}

/** A side-on naked bike, facing left. Front wheel centre at the origin, tyres on y = 20. */
function Bike() {
  return (
    <>
      {/* tyres, rims, hubs */}
      <circle cx="0" cy="0" r="20" strokeWidth="4.5" />
      <circle cx="0" cy="0" r="12" strokeWidth="1.6" />
      <circle cx="0" cy="0" r="3" fill="currentColor" />
      <circle cx="84" cy="0" r="20" strokeWidth="4.5" />
      <circle cx="84" cy="0" r="12" strokeWidth="1.6" />
      <circle cx="84" cy="0" r="3" fill="currentColor" />
      {/* forks raked back, front mudguard, headlight, bars */}
      <path d="M-1 -2 L9 -48" strokeWidth="4" />
      <path d="M-19 -9 A 21 21 0 0 1 15 -14" strokeWidth="2.4" />
      <circle cx="-7" cy="-44" r="6" strokeWidth="2.2" />
      <path d="M9 -48 L4 -55 M4 -55 L22 -50" strokeWidth="3" />
      {/* one line from the tank over the seat to the tail */}
      <path d="M12 -46 C 20 -68, 50 -70, 60 -50 L 90 -50 C 102 -50, 106 -40, 100 -34 L 66 -36 L 60 -44 L 12 -42 Z" fill="url(#hatch)" strokeWidth="2.6" />
      {/* frame spine, engine, exhaust */}
      <path d="M12 -44 L60 -14" strokeWidth="2.6" />
      <path d="M30 -30 h24 q4 0 4 4 v16 q0 4 -4 4 h-24 q-4 0 -4 -4 v-16 q0 -4 4 -4 z" fill="url(#hatch)" strokeWidth="2.2" />
      <path d="M32 -20 Q 12 -6, 40 -4 L 64 -6" strokeWidth="2.2" />
      <path d="M62 -6 L 98 -14" strokeWidth="7" />
      {/* shock and swingarm */}
      <path d="M68 -36 L74 -14" strokeWidth="3" />
      <path d="M60 -14 L84 0" strokeWidth="3.4" />
    </>
  );
}

interface VanSketchProps extends SVGProps<SVGSVGElement> {
  /** Animates the strokes drawing themselves in. */
  draw?: boolean;
}

/** The hero drawing: the van with the ramp down and the customer's bike waiting behind it. */
export function VanSketch({ draw = false, ...rest }: VanSketchProps) {
  const g = draw ? "sketch-draw" : undefined;
  const p = (i: number) => ({ style: { ["--i" as string]: i } });
  return (
    <svg viewBox="0 0 470 176" role="img" aria-label="A sketched van with its ramp down and a motorbike waiting behind it" {...rest}>
      <g filter="url(#wobble)" className={g} {...stroke}>
        {/* road, straight under the wheels */}
        <path d="M6 141 H464" strokeWidth="2" {...p(0)} />
        <path d="M30 152 H54 M78 152 H102 M126 152 H150 M174 152 H198 M222 152 H246 M270 152 H294 M318 152 H342 M366 152 H390 M414 152 H438" strokeWidth="1.6" className="pencil" {...p(1)} />
        {/* a bit of weather, because it's the UK */}
        <path d="M196 14 q 6 -12 18 -6 q 6 -10 18 -4 q 12 -2 12 8 q 6 4 0 8 H 198 q -8 -2 -2 -6" strokeWidth="1.8" className="pencil" {...p(2)} />
        <path d="M214 28 l -3 6 M224 28 l -3 6 M234 28 l -3 6" strokeWidth="1.6" className="pencil" {...p(2)} />

        {/* van body, cab on the left: bonnet, windscreen, long roof, square back */}
        <path d="M300 122 V50 Q300 40 290 40 H130 L92 74 H46 Q32 74 32 90 V122 Z" {...p(4)} />
        <path d="M138 46 H288" strokeWidth="1.4" className="pencil" {...p(5)} />
        {/* cab door and its window, narrow at the top where the pillar leans */}
        <path d="M160 44 V120" strokeWidth="1.8" {...p(5)} />
        <path d="M156 50 H124 L98 72 H156 Z" fill="url(#hatch-blue)" {...p(6)} />
        <path d="M146 86 h10" strokeWidth="2" {...p(5)} />
        {/* mirror, headlight, bumper */}
        <path d="M84 60 h8 v10 h-8 z" strokeWidth="1.8" {...p(6)} />
        <path d="M40 88 q -6 0 -6 6 v 6 h 8 z" fill="var(--marker)" strokeWidth="1.6" {...p(6)} />
        <path d="M30 122 H60" strokeWidth="3" {...p(6)} />
        {/* rear door edge and handle */}
        <path d="M292 52 V118" strokeWidth="1.4" className="pencil" {...p(5)} />
        <path d="M286 84 v8" strokeWidth="2" {...p(5)} />
        {/* wheel arches, wheels sitting on the road at y = 141 */}
        <path d="M60 122 a 18 18 0 0 1 36 0 M228 122 a 18 18 0 0 1 36 0" {...p(7)} />
        <circle cx="78" cy="126" r="15" {...p(8)} />
        <circle cx="78" cy="126" r="6" fill="url(#hatch)" {...p(8)} />
        <circle cx="246" cy="126" r="15" {...p(8)} />
        <circle cx="246" cy="126" r="6" fill="url(#hatch)" {...p(8)} />
        <path d="M96 122 H228 M264 122 H300" strokeWidth="2" {...p(8)} />

        {/* the ramp, down and ready */}
        <path d="M302 116 L338 141 M302 121 L336 145" strokeWidth="2" {...p(9)} />

        {/* the bike, waiting on the road behind the van */}
        <g transform="translate(356 121)" {...p(10)}>
          <Bike />
        </g>

        <g className="note" fontFamily="var(--font-hand)" fontSize="15" fill="currentColor" stroke="none" {...p(12)}>
          <text x="372" y="28">your bike</text>
          <path d="M392 32 q 2 10 -4 20" {...stroke} strokeWidth="1.6" className="pencil" />
          <text x="60" y="30">us</text>
          <path d="M78 26 q 22 -6 30 10" {...stroke} strokeWidth="1.6" className="pencil" />
          <text x="14" y="170">fig. 1 - loading up</text>
        </g>
      </g>
    </svg>
  );
}

/** The official mark: two T's in a box. Same drawing as the favicon. */
export function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Toon Transport" {...props}>
      <g filter="url(#wobble)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="42" height="42" rx="4" strokeWidth="2.4" />
        <path d="M8 14 H22 M15 14 V36 M26 14 H40 M33 14 V36" strokeWidth="5" />
      </g>
    </svg>
  );
}

/** Wordmark and mark together. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo${compact ? " logo-compact" : ""}`}>
      <Mark className="logo-mark" />
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
