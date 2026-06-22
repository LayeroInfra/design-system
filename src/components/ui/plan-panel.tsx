import * as React from "react";

import { cn } from "@/lib/utils";

export interface PlanPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  planName: React.ReactNode;
  price?: React.ReactNode;
  badge?: React.ReactNode;
  /** Feature lines — rendered as a 2-col check grid. */
  features?: string[];
  /** Footer action buttons row. */
  footer?: React.ReactNode;
}

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-success-500" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/** Subscription plan card: name + badge + price header, a feature check-grid,
 *  and a footer action row. */
export const PlanPanel = React.forwardRef<HTMLDivElement, PlanPanelProps>(
  ({ planName, price, badge, features = [], footer, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-2xl border border-border bg-card p-6", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">{planName}</span>
          {badge}
        </div>
        {price && (
          <div className="text-right text-lg font-semibold text-foreground">{price}</div>
        )}
      </div>
      {features.length > 0 && (
        <div className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-neutral-600">
              <Check />
              <span>{f}</span>
            </div>
          ))}
        </div>
      )}
      {footer && <div className="mt-6 flex flex-wrap gap-2">{footer}</div>}
    </div>
  ),
);
PlanPanel.displayName = "PlanPanel";
