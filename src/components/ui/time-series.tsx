import * as React from "react";

import { cn } from "@/lib/utils";

export type TimeSeriesPoint = [number, number];

// У SVG свои `format`, `max` и `points` — строковые атрибуты. У нас это
// функция, число и массив точек, поэтому исключаем все три: иначе тип
// молча подменяет смысл атрибута элемента.
export interface TimeSeriesProps
  extends Omit<React.SVGProps<SVGSVGElement>, "children" | "format" | "max" | "points"> {
  points: TimeSeriesPoint[];
  /** Formats a value for the axis label and the hovered readout. */
  format?: (value: number) => string;
  /** Pins the top of the scale — a quota, a limit, 100 %. */
  max?: number;
  tone?: "default" | "success" | "warning" | "danger";
  height?: number;
  /** `area` — a filled line, `bars` — one column per sample. Bars read better
   *  for counts you compare point to point; the line, for a level that drifts. */
  variant?: "area" | "bars";
  /** Index of the sample under the cursor — drawn emphasised. */
  activeIndex?: number | null;
  /** Shown instead of the plot when there is nothing to draw. */
  emptyLabel?: React.ReactNode;
}

/** Поле внутри графика. Экспортируется, потому что подписи и курсор рисуются
 *  снаружи SVG и должны считать ту же геометрию. */
export const TIME_SERIES_PAD = 4;

const TONE: Record<string, { stroke: string; fill: string; bar: string; barActive: string }> = {
  // Спокойное состояние — зелёным: показатель не просто «какой-то», а в
  // пределах нормы, и это видно до чтения подписей.
  success: {
    stroke: "stroke-success-500",
    fill: "fill-success-500/10",
    bar: "fill-success-500/70",
    barActive: "fill-success-500",
  },
  default: {
    stroke: "stroke-neutral-800 dark:stroke-neutral-200",
    fill: "fill-neutral-800/10 dark:fill-neutral-200/10",
    bar: "fill-neutral-800/60 dark:fill-neutral-200/60",
    barActive: "fill-neutral-900 dark:fill-neutral-100",
  },
  warning: {
    stroke: "stroke-warning-500",
    fill: "fill-warning-500/10",
    bar: "fill-warning-500/70",
    barActive: "fill-warning-500",
  },
  danger: {
    stroke: "stroke-negative-500",
    fill: "fill-negative-500/10",
    bar: "fill-negative-500/70",
    barActive: "fill-negative-500",
  },
};

/**
 * A compact time series — one metric, one plot.
 *
 * Deliberately not a chart library. What an operational metric needs is an
 * area under the line (so a glance reads volume, not just direction), an
 * emphasised last point (that is the number people actually came for) and a
 * flat baseline that stays visible when the series is all zeros. Everything
 * else — legends, multiple axes, tooltips that follow the cursor — belongs to
 * dashboards, not to a card that answers a single question.
 *
 * GAPS ARE DRAWN AS GAPS. A missing sample means we do not know what happened,
 * and joining the two neighbours with a straight line would invent the answer.
 */
export const TimeSeries = React.forwardRef<SVGSVGElement, TimeSeriesProps>(
  (
    {
      points,
      format = (v) => String(Math.round(v)),
      max,
      tone = "default",
      height = 72,
      variant = "area",
      activeIndex = null,
      emptyLabel = "нет данных",
      className,
      ...props
    },
    ref,
  ) => {
    const W = 600;
    const H = height;
    const pad = TIME_SERIES_PAD;

    if (!points || points.length === 0) {
      return (
        <div
          className={cn(
            "flex items-center justify-center rounded-lg border border-dashed border-border text-[11px] text-neutral-400",
            className,
          )}
          style={{ height: H }}
        >
          {emptyLabel}
        </div>
      );
    }

    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs) || minX + 1;
    const top = Math.max(max ?? 0, ...ys, 0.0001);
    const x = (t: number) => pad + ((t - minX) / (maxX - minX || 1)) * (W - pad * 2);
    const y = (v: number) => H - pad - (v / top) * (H - pad * 2);

    // Разрыв во времени больше трёх ожидаемых шагов — это пропуск, а не спад.
    const stepGuess =
      points.length > 1
        ? Math.min(...points.slice(1).map((p, i) => p[0] - points[i][0]))
        : 1;
    const segments: TimeSeriesPoint[][] = [];
    let run: TimeSeriesPoint[] = [];
    points.forEach((p, i) => {
      if (i > 0 && p[0] - points[i - 1][0] > stepGuess * 3) {
        if (run.length) segments.push(run);
        run = [];
      }
      run.push(p);
    });
    if (run.length) segments.push(run);

    const last = points[points.length - 1];
    const t = TONE[tone] ?? TONE.default;

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className={cn("w-full", className)}
        style={{ height: H }}
        role="img"
        aria-label={`График: последнее значение ${format(last[1])}`}
        {...props}
      >
        {variant === "bars"
          ? points.map((p, i) => {
              // Ширина столбца — по шагу ряда, с зазором. Так столбцы не
              // слипаются на редком ряде и не исчезают на плотном.
              const w = Math.max(
                1.5,
                ((W - pad * 2) / Math.max(points.length, 1)) * 0.7,
              );
              const top = y(p[1]);
              return (
                <rect
                  key={p[0]}
                  x={x(p[0]) - w / 2}
                  y={top}
                  width={w}
                  height={Math.max(0.5, H - pad - top)}
                  className={cn(t.bar, i === activeIndex && t.barActive)}
                />
              );
            })
          : segments.map((seg, i) => {
              const line = seg.map((p) => `${x(p[0])},${y(p[1])}`).join(" ");
              const area = `${x(seg[0][0])},${H - pad} ${line} ${x(seg[seg.length - 1][0])},${H - pad}`;
              return (
                <g key={i}>
                  <polygon points={area} className={t.fill} />
                  <polyline
                    points={line}
                    fill="none"
                    strokeWidth={1.5}
                    vectorEffect="non-scaling-stroke"
                    className={t.stroke}
                  />
                </g>
              );
            })}
        {variant === "area" && (
          <circle cx={x(last[0])} cy={y(last[1])} r={2.5} className={cn(t.stroke, "fill-current")} />
        )}
      </svg>
    );
  },
);
TimeSeries.displayName = "TimeSeries";
