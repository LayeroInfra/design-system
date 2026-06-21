import * as React from "react";

import { cn } from "@/lib/utils";

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Trailing visual — typically a <Sparkline>. */
  chart?: React.ReactNode;
}

/** One stat line: label + big value on the left, an optional trend on the
 *  right. Stack several (with dividers) to build a monitoring card. */
export const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({ label, value, chart, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-end justify-between gap-4", className)}
      {...props}
    >
      <div className="min-w-0">
        <div className="text-sm text-neutral-500">{label}</div>
        <div className="mt-0.5 text-2xl font-semibold tracking-tightish text-foreground">
          {value}
        </div>
      </div>
      {chart && <div className="shrink-0">{chart}</div>}
    </div>
  ),
);
Metric.displayName = "Metric";
