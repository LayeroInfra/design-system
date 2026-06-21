import * as React from "react";

import { cn } from "@/lib/utils";

const DOT: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  neutral: "bg-neutral-400",
};

export interface FilterChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  /** Trailing count (e.g. number of items in this filter). */
  count?: number;
  /** Status dot colour. */
  tone?: "blue" | "green" | "amber" | "red";
}

/** Pill-shaped toggle for filtering lists — optional status dot + count. */
export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ active, count, tone, className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-foreground bg-primary text-primary-foreground"
          : "border-border bg-card text-neutral-600 hover:border-neutral-400",
        className,
      )}
      {...props}
    >
      {tone && <span className={cn("h-1.5 w-1.5 rounded-full", DOT[tone])} />}
      {children}
      {count != null && (
        <span
          className={cn(
            "ml-1 font-mono text-[10px]",
            active ? "text-primary-foreground/70" : "text-neutral-400",
          )}
        >
          {count}
        </span>
      )}
    </button>
  ),
);
FilterChip.displayName = "FilterChip";
