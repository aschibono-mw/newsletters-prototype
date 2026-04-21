/**
 * Meltwater logomark — inline SVG so no image assets are needed.
 * The mark is the classic Meltwater "eye + drop" shape.
 *
 * Props:
 *   size   — pixel height (width scales proportionally). Default 28.
 *   color  — fill color. Default '#00827F' (Meltwater teal).
 */
export default function MeltwaterLogo({ size = 28, color = '#00827F' }) {
  // viewBox is 48 × 32 (3:2 ratio) — eye is wider than tall
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 32"
      height={size}
      width={size * 1.5}
      aria-label="Meltwater"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Outer eye / lens shape */}
      <path
        d="M24,1 C36,1 47,16 47,16 C47,16 36,31 24,31 C12,31 1,16 1,16 C1,16 12,1 24,1 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Inner water drop — point at top, round at bottom */}
      <path
        d="M24,9 C24,9 30.5,15 30.5,19.5 A6.5,6.5 0 0,1 17.5,19.5 C17.5,15 24,9 24,9 Z"
        fill={color}
      />
    </svg>
  )
}
