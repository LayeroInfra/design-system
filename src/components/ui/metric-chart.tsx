import * as React from "react";
import { Activity, BarChart3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  TimeSeries,
  TIME_SERIES_PAD,
  type TimeSeriesPoint,
} from "@/components/ui/time-series";

export interface MetricChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Название показателя. Узел, а не строка: у HTML-атрибута `title` другой
   *  смысл — всплывающая подсказка браузера. */
  title: React.ReactNode;
  /** Rendered right after the title — typically a help tooltip trigger. */
  note?: React.ReactNode;
  /** The current reading, already formatted. */
  value: React.ReactNode;
  points: TimeSeriesPoint[];
  /** Formats axis labels and the hovered readout. */
  format?: (value: number) => string;
  /** Formats the moment under the cursor. Defaults to a local date-time. */
  formatTime?: (seconds: number) => string;
  /** A ceiling the series is measured against — a quota, a connection limit,
   *  100 %. Drawn as a dashed rule and pins the top of the scale. */
  limit?: number;
  /** What the dashed rule is, e.g. «квота». Shown in the hovered readout. */
  limitLabel?: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
  height?: number;
  /** Ends of the time axis, e.g. «16:45» … «17:45». */
  startLabel?: React.ReactNode;
  endLabel?: React.ReactNode;
  /** Legend or a caveat — rendered under the plot. */
  footer?: React.ReactNode;
  emptyLabel?: React.ReactNode;
  /** Which plot the card opens with. The reader switches it themselves. */
  defaultVariant?: "area" | "bars";
}

const VARIANTS = [
  { id: "area" as const, icon: Activity, label: "Линией" },
  { id: "bars" as const, icon: BarChart3, label: "Столбцами" },
];

/**
 * One metric, plotted against what it is allowed to reach.
 *
 * The difference from <TimeSeries> is the frame: a value alone answers «how
 * much», a plot answers «how it changed», and neither answers «is that a lot?»
 * — that is the ceiling, and it is drawn as a dashed rule with its own label.
 * A card without it forces the reader to remember the quota, and they don't.
 *
 * ЗНАЧЕНИЕ ПОД КУРСОРОМ ЧИТАЕТСЯ, А НЕ УГАДЫВАЕТСЯ. График отвечает на «как
 * менялось», но «сколько было в 15:20» по картинке не прочитать — поэтому
 * курсор ведёт вертикаль и показывает точное значение с моментом времени.
 *
 * AXIS LABELS LIVE OUTSIDE THE SVG. The plot stretches to the card width with
 * `preserveAspectRatio="none"`, so any text inside it would stretch with it.
 */
export const MetricChart = React.forwardRef<HTMLDivElement, MetricChartProps>(
  (
    {
      title,
      note,
      value,
      points,
      format = (v) => String(Math.round(v)),
      formatTime,
      limit,
      limitLabel,
      tone = "default",
      height = 132,
      startLabel,
      endLabel,
      footer,
      emptyLabel,
      defaultVariant = "area",
      className,
      ...props
    },
    ref,
  ) => {
    const [variant, setVariant] = React.useState<"area" | "bars">(defaultVariant);
    const [hover, setHover] = React.useState<number | null>(null);
    const plotRef = React.useRef<HTMLDivElement>(null);

    // Та же шкала, что внутри графика: иначе подписи слева обещали бы одно, а
    // линия рисовалась по другому.
    const ys = points.map((p) => p[1]);
    const peak = Math.max(...ys, 0);
    const top = Math.max(limit ?? 0, peak, 0.0001);
    const hasLimit = typeof limit === "number" && limit > 0 && limit >= peak;
    // Ровный ноль без потолка: шкалы у такого ряда нет, и «0 · 0 · 0» слева
    // выглядит поломкой. Оставляем одно основание — оно и есть весь ответ.
    const flat = !hasLimit && peak <= 0;

    const minX = points.length ? points[0][0] : 0;
    const maxX = points.length ? points[points.length - 1][0] : 1;
    const W = 600;
    const inner = W - TIME_SERIES_PAD * 2;

    /** Доля ширины, на которой стоит точка ряда, — от 0 до 1. */
    const atX = (t: number) =>
      (TIME_SERIES_PAD + ((t - minX) / (maxX - minX || 1)) * inner) / W;

    const track = (e: React.PointerEvent<HTMLDivElement>) => {
      const box = plotRef.current?.getBoundingClientRect();
      if (!box || !points.length) return;
      const rel = (e.clientX - box.left) / box.width;
      const frac = (rel * W - TIME_SERIES_PAD) / inner;
      const t = minX + frac * (maxX - minX);
      let best = 0;
      for (let i = 1; i < points.length; i += 1) {
        if (Math.abs(points[i][0] - t) < Math.abs(points[best][0] - t)) best = i;
      }
      setHover(best);
    };

    const active = hover !== null ? points[hover] : undefined;
    const activeLeft = active ? atX(active[0]) : 0;
    const activeTop = active
      ? height - TIME_SERIES_PAD - (active[1] / top) * (height - TIME_SERIES_PAD * 2)
      : 0;
    const stamp =
      formatTime ??
      ((seconds: number) =>
        new Date(seconds * 1000).toLocaleString("ru-RU", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }));

    return (
      <Card ref={ref} className={cn("p-5", className)} {...props}>
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-neutral-500">{title}</span>
              {note}
            </div>
            <div className="mt-1 text-2xl font-semibold tabular-nums tracking-tightish">
              {value}
            </div>
          </div>

          {/* Вид графика выбирает читатель: у одного показателя важна форма
              изменения, у другого — сравнение соседних значений. */}
          <div className="flex shrink-0 gap-1">
            {VARIANTS.map((v) => (
              <Button
                key={v.id}
                type="button"
                size="icon-sm"
                variant={variant === v.id ? "outline" : "ghost"}
                aria-pressed={variant === v.id}
                aria-label={v.label}
                onClick={() => setVariant(v.id)}
              >
                <v.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          {/* Подписи уровней: потолок, середина, ноль. Больше делений на карточке
              такой высоты уже не читается. */}
          <div
            className="flex w-14 shrink-0 flex-col justify-between text-right text-[11px] tabular-nums text-neutral-400"
            style={{ height }}
            aria-hidden="true"
          >
            <span>{flat ? "" : format(top)}</span>
            <span>{flat ? "" : format(top / 2)}</span>
            <span>{format(0)}</span>
          </div>

          <div
            ref={plotRef}
            className="relative min-w-0 flex-1"
            style={{ height }}
            onPointerMove={track}
            onPointerLeave={() => setHover(null)}
          >
            {/* Сетка под графиком: середина и основание. Верх занят либо
                пунктиром предела, либо ничем. */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-1/2 border-t border-[color:var(--border-soft)]" />
              <div className="absolute inset-x-0 bottom-0 border-t border-[color:var(--border-soft)]" />
              {hasLimit && (
                <div className="absolute inset-x-0 top-0 border-t border-dashed border-neutral-400/70" />
              )}
            </div>
            <TimeSeries
              points={points}
              max={limit}
              format={format}
              tone={tone}
              height={height}
              variant={variant}
              activeIndex={hover}
              emptyLabel={emptyLabel}
            />

            {active && (
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="absolute top-0 h-full w-px bg-neutral-400"
                  style={{ left: `${activeLeft * 100}%` }}
                />
                {variant === "area" && (
                  <span
                    className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-foreground"
                    style={{ left: `${activeLeft * 100}%`, top: activeTop }}
                  />
                )}
                {/* Плашка держится с той стороны курсора, где есть место: у
                    правого края она иначе уезжает за карточку. */}
                <div
                  className={cn(
                    "absolute top-1 min-w-[9rem] rounded-lg border border-border bg-card p-2 shadow-md",
                    activeLeft > 0.55 ? "-ml-2 -translate-x-full" : "ml-2",
                  )}
                  style={{ left: `${activeLeft * 100}%` }}
                >
                  <div className="text-[11px] text-neutral-500">{stamp(active[0])}</div>
                  <div className="mt-0.5 text-sm font-medium tabular-nums">
                    {format(active[1])}
                  </div>
                  {hasLimit && (
                    <div className="mt-1 flex items-center justify-between gap-3 border-t border-[color:var(--border-soft)] pt-1 text-[11px] text-neutral-500">
                      <span>{limitLabel ?? "предел"}</span>
                      <span className="tabular-nums">
                        {format(limit as number)}
                        {limit ? ` · ${Math.round((active[1] / limit) * 100)}%` : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {(startLabel || endLabel) && (
          <div className="mt-1.5 flex justify-between pl-[4.25rem] text-[11px] text-neutral-400">
            <span>{startLabel}</span>
            <span>{endLabel}</span>
          </div>
        )}

        {footer && <div className="mt-3 text-[11px] text-neutral-500">{footer}</div>}
      </Card>
    );
  },
);
MetricChart.displayName = "MetricChart";
