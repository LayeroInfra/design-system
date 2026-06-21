import * as React from "react";

import { cn } from "@/lib/utils";

export interface CellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Leading slot — an Avatar, icon tile, status dot, etc. */
  leading?: React.ReactNode;
  title: React.ReactNode;
  /** Secondary line under the title (often a mono path/email). */
  subtitle?: React.ReactNode;
  /** Trailing slot — a Badge, check, chevron, settings button. */
  trailing?: React.ReactNode;
  /** Selected/active row styling. */
  active?: boolean;
  /** Render as a clickable button row (adds hover + focus). */
  interactive?: boolean;
}

/** List row: leading media · title + subtitle · trailing slot. The shared
 *  building block for switchers, pickers and settings lists. */
export const Cell = React.forwardRef<HTMLDivElement, CellProps>(
  (
    { leading, title, subtitle, trailing, active, interactive, className, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      data-active={active || undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-left",
        interactive &&
          "cursor-pointer transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-secondary",
        className,
      )}
      {...props}
    >
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{title}</div>
        {subtitle && (
          <div className="truncate font-mono text-xs text-neutral-500">
            {subtitle}
          </div>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  ),
);
Cell.displayName = "Cell";
