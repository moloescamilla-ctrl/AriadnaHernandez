// Ornamentos originales en SVG inspirados en la estética de las ilustraciones
// del libro (pincel, tinta azul violeta y naranja). No reproducen ninguna
// ilustración: son motivos genéricos (sol con trazos, ondas, trazo de pincel).

// Filtro que "rompe" los bordes para que parezcan pintados a pincel.
// Se monta una sola vez (en Landing) y los demás SVG lo referencian.
export function BrushDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="brush-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

// Sol: disco con pinceladas cortas alrededor.
export function Sunburst({ className = "", rays = 14 }) {
  const strokes = Array.from({ length: rays }, (_, i) => {
    const a = (i / rays) * Math.PI * 2;
    const r1 = 58 + (i % 3) * 3;
    const r2 = r1 + 16 + (i % 2) * 8;
    return (
      <line
        key={i}
        x1={100 + Math.cos(a) * r1}
        y1={100 + Math.sin(a) * r1}
        x2={100 + Math.cos(a) * r2}
        y2={100 + Math.sin(a) * r2}
        strokeWidth={9 - (i % 3) * 2}
      />
    );
  });
  return (
    <svg className={`orn ${className}`} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <g filter="url(#brush)" stroke="var(--orange)" strokeLinecap="round" fill="none">
        {strokes}
      </g>
      <circle cx="100" cy="100" r="40" fill="var(--orange)" opacity="0.92" filter="url(#brush)" />
      <circle cx="92" cy="92" r="16" fill="#fff" opacity="0.35" filter="url(#brush)" />
    </svg>
  );
}

// Ondas concéntricas alternando violeta y naranja.
export function Ripples({ className = "" }) {
  const rings = [
    [180, 48, "var(--lavender)", 10],
    [150, 38, "var(--orange)", 8],
    [118, 29, "var(--blue)", 7],
    [86, 21, "var(--orange)", 6],
    [56, 13, "var(--lavender)", 6],
    [28, 7, "var(--blue)", 5],
  ];
  return (
    <svg className={`orn ${className}`} viewBox="0 0 400 120" aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" filter="url(#brush-soft)">
        {rings.map(([rx, ry, color, w]) => (
          <ellipse key={rx} cx="200" cy="60" rx={rx} ry={ry} stroke={color} strokeWidth={w} opacity="0.85" />
        ))}
      </g>
    </svg>
  );
}

// Trazo de pincel horizontal (subrayados y divisores).
export function BrushStroke({ className = "", color = "var(--orange)" }) {
  return (
    <svg className={`orn ${className}`} viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path
        d="M6 15 C 60 6, 120 18, 180 10 S 270 8, 294 12"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        filter="url(#brush)"
      />
    </svg>
  );
}

// Brújula sencilla cuya aguja apunta a un corazón (motivo de "la brújula").
export function CompassMark({ className = "" }) {
  return (
    <svg className={`orn ${className}`} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <g filter="url(#brush)" strokeLinecap="round">
        <g stroke="var(--lavender)" strokeWidth="5">
          <line x1="60" y1="14" x2="60" y2="106" />
          <line x1="14" y1="60" x2="106" y2="60" />
        </g>
        <line x1="34" y1="88" x2="84" y2="34" stroke="var(--blue)" strokeWidth="7" />
        <path
          d="M84 34 c 2 -10 16 -8 13 2 c 10 -1 10 13 -1 13 l -14 -1 z"
          fill="var(--orange)"
        />
        <circle cx="60" cy="60" r="6" fill="var(--orange)" stroke="#fff" strokeWidth="2" />
      </g>
    </svg>
  );
}
