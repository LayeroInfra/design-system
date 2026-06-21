import * as React from "react";

import { cn } from "@/lib/utils";

export type SparklineTone = "success" | "info" | "negative" | "warning" | "neutral";

// Colour comes from `currentColor` (a text-* utility) so a single class drives
// the line, the area fill and the hover marker — no stroke-*/fill-* utilities.
const TONE: Record<SparklineTone, string> = {
  success: "text-success-500",
  info: "text-info-500",
  negative: "text-negative-500",
  warning: "text-warning-500",
  neutral: "text-neutral-400",
};

export interface SparklineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** Series of numbers — scaled to fit the box. */
  data: number[];
  tone?: SparklineTone;
  /** Draw a tinted area under the line. */
  area?: boolean;
  width?: number;
  height?: number;
  /** Provide to enable the hover tooltip — formats the focused value. */
  format?: (value: number) => string;
  /** Optional x-axis labels shown next to the value in the tooltip. */
  labels?: string[];
}

/** Minimal inline trend line (no chart dep). Pass `format` to get a hover
 *  tooltip with a crosshair + dot, like the dashboard monitoring card. */
export const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  (
    { data, tone = "info", area, width = 120, height = 40, format, labels, className, ...props },
    ref,
  ) => {
    const [idx, setIdx] = React.useState<number | null>(null);
    const pad = 3;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;
    const stepX = (width - pad * 2) / Math.max(data.length - 1, 1);
    const xy = (i: number): [number, number] => [
      pad + i * stepX,
      pad + (height - pad * 2) * (1 - (data[i] - min) / span),
    ];
    const line = data.map((_, i) => xy(i).map((n) => n.toFixed(1)).join(",")).join(" ");
    const areaPath =
      `M ${pad},${height - pad} ` +
      data.map((_, i) => `L ${xy(i).map((n) => n.toFixed(1)).join(",")}`).join(" ") +
      ` L ${(width - pad).toFixed(1)},${height - pad} Z`;
    const interactive = !!format;
    const hx = idx != null ? xy(idx) : null;

    const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const rx = ((e.clientX - r.left) / r.width) * width;
      setIdx(Math.max(0, Math.min(data.length - 1, Math.round((rx - pad) / stepX))));
    };

    const svg = (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn("w-full overflow-visible", !interactive && TONE[tone], className)}
        style={{ height }}
        preserveAspectRatio="none"
        aria-hidden="true"
        onMouseMove={interactive ? onMove : undefined}
        onMouseLeave={interactive ? () => setIdx(null) : undefined}
      >
        {area && (
          <path d={areaPath} fill="currentColor" fillOpacity={0.1} stroke="none" />
        )}
        <polyline
          points={line}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {hx && (
          <line
            x1={hx[0]}
            y1={0}
            x2={hx[0]}
            y2={height}
            stroke="currentColor"
            strokeOpacity={0.3}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        )}
        {hx && <circle cx={hx[0]} cy={hx[1]} r={2.5} fill="currentColor" />}
      </svg>
    );

    if (!interactive) {
      return (
        <div ref={ref} className={cn("relative", TONE[tone])} style={{ width }} {...props}>
          {svg}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("relative", TONE[tone])} style={{ width }} {...props}>
        {idx != null && (
          <div
            className="pointer-events-none absolute -top-7 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground"
            style={{ left: `${(idx / Math.max(data.length - 1, 1)) * 100}%` }}
          >
            {format!(data[idx])}
            {labels?.[idx] && <span className="ml-1 opacity-60">{labels[idx]}</span>}
          </div>
        )}
        {svg}
      </div>
    );
  },
);
Sparkline.displayName = "Sparkline";
