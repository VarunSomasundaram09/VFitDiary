interface BodySilhouetteProps {
  gender: "MALE" | "FEMALE";
  /** 0 = leanest option in the set, 1 = highest body-fat option in the set */
  leannessRank: number;
  selected: boolean;
}

/**
 * A schematic, illustrative silhouette — not a photograph — whose waist
 * width and ab-line definition scale with the leanness rank. Keeps the
 * body-fat picker tasteful and avoids using real body photos entirely.
 */
export function BodySilhouette({ gender, leannessRank, selected }: BodySilhouetteProps) {
  // Interpolate waist width: leaner = narrower waist relative to shoulders/hips
  const waistWidth = 26 + leannessRank * 16; // 26 (lean) -> 42 (higher bf)
  const shoulderWidth = gender === "MALE" ? 46 : 40;
  const hipWidth = gender === "MALE" ? 34 : 42;
  const abLineCount = Math.max(4 - Math.round(leannessRank * 4), 0);

  const color = selected ? "#4F46E5" : "currentColor";
  const opacity = selected ? 1 : 0.55;

  return (
    <svg viewBox="0 0 100 130" className="h-full w-full" aria-hidden="true">
      {/* Head */}
      <circle cx="50" cy="14" r="11" fill={color} opacity={opacity} />
      {/* Neck */}
      <rect x="45" y="23" width="10" height="8" fill={color} opacity={opacity} />
      {/* Torso: shoulders -> waist -> hips, drawn as a smooth polygon */}
      <path
        d={`
          M ${50 - shoulderWidth / 2} 34
          Q 50 30 ${50 + shoulderWidth / 2} 34
          L ${50 + waistWidth / 2 + 4} 68
          Q 50 74 ${50 - waistWidth / 2 - 4} 68
          Z
        `}
        fill={color}
        opacity={opacity}
      />
      {/* Hips */}
      <path
        d={`
          M ${50 - waistWidth / 2 - 4} 66
          L ${50 - hipWidth / 2} 82
          L ${50 + hipWidth / 2} 82
          L ${50 + waistWidth / 2 + 4} 66
          Z
        `}
        fill={color}
        opacity={opacity}
      />
      {/* Legs */}
      <rect x="34" y="82" width="13" height="42" rx="5" fill={color} opacity={opacity} />
      <rect x="53" y="82" width="13" height="42" rx="5" fill={color} opacity={opacity} />
      {/* Arms */}
      <rect
        x={50 - shoulderWidth / 2 - 8}
        y="36"
        width="9"
        height="34"
        rx="4.5"
        fill={color}
        opacity={opacity * 0.85}
      />
      <rect
        x={50 + shoulderWidth / 2 - 1}
        y="36"
        width="9"
        height="34"
        rx="4.5"
        fill={color}
        opacity={opacity * 0.85}
      />
      {/* Ab-line definition, more visible the leaner the rank */}
      {Array.from({ length: abLineCount }).map((_, i) => (
        <line
          key={i}
          x1={50 - (waistWidth / 2 - 6)}
          x2={50 + (waistWidth / 2 - 6)}
          y1={42 + i * 6}
          y2={42 + i * 6}
          stroke="white"
          strokeWidth={1}
          opacity={selected ? 0.5 : 0.35}
        />
      ))}
    </svg>
  );
}
