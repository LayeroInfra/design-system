import { useState } from "react";

import { cn } from "@/lib/utils";

/** Deterministic gradient from a seed string — stable color per entity across
 *  reloads and users (useful for scanning lists of projects/teams). */
export function avatarGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const a = h % 360;
  const b = (a + 38) % 360;
  return `linear-gradient(135deg, hsl(${a} 68% 58%), hsl(${b} 68% 48%))`;
}

export interface AvatarProps {
  /** Source for the fallback initial. */
  name: string;
  /** Gradient seed — defaults to `name`. Pass a stable id/slug for a stable color. */
  seed?: string;
  /** Square (rounded) for projects, circle for accounts/teams. */
  shape?: "square" | "circle";
  /** Optional image (favicon/photo) — falls back to gradient + initial. */
  src?: string | null;
  /** Explicit gradient override (e.g. a fixed brand palette for «your account»). */
  gradient?: string;
  /** Size + text-size utilities, e.g. "h-6 w-6 text-[11px]". */
  className?: string;
}

/** Entity avatar: an image when available, otherwise a deterministic gradient
 *  with the entity's first letter. One primitive for project / team / account. */
export function Avatar({
  name,
  seed,
  shape = "square",
  src,
  gradient,
  className = "h-5 w-5 text-[10px]",
}: AvatarProps) {
  const [broken, setBroken] = useState(false);
  const img = src?.trim() || null;
  const showImg = !!img && !broken;
  const bg = gradient ?? avatarGradient(seed || name);

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden font-semibold uppercase text-white",
        shape === "circle" ? "rounded-full" : "rounded",
        className,
      )}
      style={showImg ? undefined : { background: bg }}
      aria-hidden
    >
      {showImg ? (
        <img
          src={img!}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          className="absolute inset-0 h-full w-full object-contain p-px"
        />
      ) : (
        name.slice(0, 1)
      )}
    </span>
  );
}
