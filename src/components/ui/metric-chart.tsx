import * as React from "react";
import { Activity, BarChart3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  TimeSeries,
  TIME_SERIES_PAD,
  seriesXPadding,
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
  /** Всегда включать предел в шкалу и подписывать линию. */
  keepLimitVisible?: boolean;
  /** Отделяет далёкий лимит явным разрывом от линейной шкалы фактических значений. */
  compressLimitGap?: boolean;
  /** Состояние лимита за расчётный период. */
  limitTone?: "default" | "danger";
  /** What the dashed rule is, e.g. «квота». Shown in the hovered readout. */
  limitLabel?: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
  height?: number;
  /** Доля интервала, занятая столбцом. */
  barRatio?: number;
  /** Промежуточные даты по всей временной оси. */
  timeTicks?: boolean;
  /** Число интервалов горизонтальной сетки. */
  gridIntervals?: 2 | 5;
  /** Фиксированный шаг шкалы: верх округляется до ближайшего деления. */
  axisStep?: number;
  /** Внешний контейнер уже содержит заголовок графика. */
  hideHeader?: boolean;
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
      keepLimitVisible = false,
      compressLimitGap = false,
      limitTone,
      limitLabel,
      tone = "default",
      height = 132,
      gridIntervals = 2,
      axisStep,
      hideHeader = false,
      barRatio = 0.7,
      timeTicks = false,
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
    const separatedLimit = compressLimitGap && keepLimitVisible && typeof limit === "number" && limit > Math.max(peak, 0) * 4 && limit > 0;
    const dataMagnitude = Math.pow(10, Math.floor(Math.log10(Math.max(peak, 0.0001))));
    const zoomedTop = Math.ceil(Math.max(peak, 0.0001) * 1.1 / dataMagnitude) * dataMagnitude;
    const rawTop = separatedLimit ? zoomedTop : Math.max(keepLimitVisible ? (limit ?? 0) * 1.1 : limit ?? 0, peak, 0.0001);
    const step = axisStep && axisStep > 0 ? axisStep : null;
    const top = step ? Math.max(step, Math.ceil(rawTop / step) * step) : rawTop;
    const intervals = step ? Math.round(top / step) : separatedLimit ? 4 : gridIntervals;
    const hasLimit = typeof limit === "number" && limit > 0 && (keepLimitVisible || limit >= peak);
    // Ровный ноль без потолка: шкалы у такого ряда нет, и «0 · 0 · 0» слева
    // выглядит поломкой. Оставляем одно основание — оно и есть весь ответ.
    const flat = !hasLimit && peak <= 0;

    const minX = points.length ? points[0][0] : 0;
    const maxX = points.length ? points[points.length - 1][0] : 1;
    const W = 600;
    const xPad = seriesXPadding(points.length, variant, W);
    const inner = W - xPad * 2;

    /** Доля ширины, на которой стоит точка ряда, — от 0 до 1. */
    const atX = (t: number) =>
      (xPad + ((t - minX) / (maxX - minX || 1)) * inner) / W;

    const track = (e: React.PointerEvent<HTMLDivElement>) => {
      const box = plotRef.current?.getBoundingClientRect();
      if (!box || !points.length) return;
      const rel = (e.clientX - box.left) / box.width;
      const frac = (rel * W - xPad) / inner;
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
        {!hideHeader && <div className="flex items-start gap-3">
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
        </div>}

        {/* Сетка вместо двух рядов: ось значений занимает столько, сколько
            нужно её самой длинной подписи, а подписи времени под графиком
            начинаются ровно от его левого края. Фиксированная колонка
            оставляла на телефоне полосу пустоты в треть ширины карточки. */}
        <div className={cn("grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 sm:gap-x-3", !hideHeader && "mt-4")}>
          {separatedLimit && <>
            <div className="text-right text-[11px] tabular-nums text-neutral-400">{format(limit as number)}</div>
            <div className="relative h-10">
              <div className={cn("absolute inset-x-0 top-2 border-t-2", limitTone === "danger" ? "border-negative-500 text-negative-500" : "border-foreground text-foreground")}>
                <span className="absolute bottom-1 right-0 text-[11px] font-semibold">{limitLabel ?? "Лимит"} · {format(limit as number)}</span>
              </div>
              <div className="absolute bottom-1 left-0 -translate-x-1/2 text-neutral-400" role="img" aria-label="Разрыв шкалы">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" aria-hidden="true"><path d="M2 8 6 4M8 8 12 4" /></svg>
              </div>
            </div>
          </>}
          <div
            className="flex flex-col justify-between text-right text-[11px] tabular-nums text-neutral-400"
            style={{ height }}
            aria-hidden="true"
          >
            {Array.from({ length: intervals + 1 }, (_, i) => (
              <span key={i}>{flat && i < intervals ? "" : format(top * (1 - i / intervals))}</span>
            ))}
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
              {Array.from({ length: intervals + 1 }, (_, i) => (
                (i > 0 || intervals > 2) && <div key={i}
                  className="absolute inset-x-0 border-t border-[color:var(--border-soft)]"
                  style={{ top: `${i / intervals * 100}%` }} />
              ))}

            </div>
            <TimeSeries
              points={points}
              max={keepLimitVisible ? top : limit}
              format={format}
              tone={tone}
              height={height}
              variant={variant}
              barRatio={barRatio}
              activeIndex={hover}
              emptyLabel={emptyLabel}
            />

              {hasLimit && !separatedLimit && (
                <div
                  className={cn("pointer-events-none absolute inset-x-0 z-20", keepLimitVisible ? "border-t-2" : "border-t", limitTone === "danger" ? "border-negative-500 text-negative-500" : limitTone === "default" ? "border-foreground text-foreground" : "border-dashed border-neutral-400/70 text-neutral-500")}
                  style={{ top: keepLimitVisible ? height - TIME_SERIES_PAD - (limit as number) / top * (height - TIME_SERIES_PAD * 2) : 0 }}
                >
                  {keepLimitVisible && <span className="absolute bottom-1 right-0 text-[11px] font-semibold">{limitLabel ?? "Лимит"} · {format(limit as number)}</span>}
                </div>
              )}

            {active && (
              <div className="pointer-events-none absolute inset-0 z-30">
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

          {timeTicks && points.length > 0 ? (
            <><span /><div className="relative mt-1.5 h-4 text-[11px] text-neutral-400">
              {Array.from({ length: Math.min(7, points.length) }, (_, i) => {
                const index = Math.round(i * (points.length - 1) / Math.max(1, Math.min(7, points.length) - 1));
                return <span key={index} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${atX(points[index][0]) * 100}%` }}>{stamp(points[index][0])}</span>;
              })}
            </div></>
          ) : (startLabel || endLabel) && (
            <>
              <span />
              <div className="mt-1.5 flex justify-between text-[11px] text-neutral-400">
                <span>{startLabel}</span>
                <span>{endLabel}</span>
              </div>
            </>
          )}
        </div>

        {footer && <div className="mt-3 text-[11px] text-neutral-500">{footer}</div>}
      </Card>
    );
  },
);
MetricChart.displayName = "MetricChart";
