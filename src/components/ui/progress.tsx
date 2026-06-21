import { cn } from "@/lib/utils";

export interface ProgressProps {
  /** 0..max */
  value?: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

/** Linear determinate progress bar. */
export function Progress({ value = 0, max = 100, className, indicatorClassName }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full bg-primary transition-[width] duration-300 ease-out", indicatorClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
