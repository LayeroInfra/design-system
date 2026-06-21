import * as React from "react";

import { cn } from "@/lib/utils";

export type SparklineTone = "success" | "info" | "negative" | "warning" | "neutral";

// Colour comes from `currentColor` (a text-* utility) so a single class drives
// both the line stroke and the area fill — no stroke-*/fill-* utilities needed.
const TONE: Record<SparklineTone, string> = {
  success: "text-success-500",
  info: "text-info-500",
  negative: "text-negative-500",
  warning: "text-warning-500",
  neutral: "text-neutral-400",
};

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  /** Series of numbers — scaled to fit the box. */
  data: number[];
  tone?: SparklineTone;
  /** Draw a tinted area under the line. */
  area?: boolean;
  width?: number;
  height?: number;
}

/** Minimal inline trend line (no chart dep). Used in metric/monitoring cards. */
export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  ({ data, tone = "info", area, width = 120, height = 36, className, ...props }, ref) => {
    const pad = 2;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;
    const stepX = (width - pad * 2) / Math.max(data.length - 1, 1);
    const pts = data.map((v, i) => {
      const x = pad + i * stepX;
      const y = pad + (height - pad * 2) * (1 - (v - min) / span);
      return [x, y] as const;
    });
    const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const areaPath =
      `M ${pad},${height - pad} ` +
      pts.map(([x, y]) => `L ${x.toFixed(1)},${y.toFixed(1)}`).join(" ") +
      ` L ${(width - pad).toFixed(1)},${height - pad} Z`;
    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        fill="none"
        className={cn("overflow-visible", TONE[tone], className)}
        aria-hidden="true"
        {...props}
      >
        {area && (
          <path d={areaPath} fill="currentColor" fillOpacity={0.1} stroke="none" />
        )}
        <polyline
          points={line}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  },
);
Sparkline.displayName = "Sparkline";
