import { cn } from "@/lib/utils";

export interface ProgressProps {
  /** Activity indicator when the server does not report a percentage. */
  indeterminate?: boolean;
  label?: string;
  /** 0..max */
  value?: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

/** Linear progress or an indeterminate activity indicator. */
export function Progress({ value = 0, max = 100, indeterminate = false, label, className, indicatorClassName }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={indeterminate ? undefined : Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full bg-primary",
          indeterminate ? "mx-auto w-1/3 motion-safe:animate-pulse" : "transition-[width] duration-300 ease-out",
          indicatorClassName)}
        style={indeterminate ? undefined : { width: `${pct}%` }}
      />
    </div>
  );
}
