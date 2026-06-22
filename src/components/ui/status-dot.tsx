import * as React from "react";

import { cn } from "@/lib/utils";

export type StatusTone =
  | "success"
  | "info"
  | "warning"
  | "negative"
  | "neutral";

const DOT: Record<StatusTone, string> = {
  success: "bg-success-500",
  info: "bg-info-500",
  warning: "bg-warning-500",
  negative: "bg-negative-500",
  neutral: "bg-neutral-400",
};

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  /** Optional label after the dot. */
  children?: React.ReactNode;
  /** Override dot size/color. */
  dotClassName?: string;
}

/** A coloured status dot with an optional label — the shared status indicator
 *  for project / deploy / domain / branch rows. */
export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ tone = "neutral", children, className, dotClassName, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium leading-none text-neutral-600",
        className,
      )}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT[tone], dotClassName)} />
      {children}
    </span>
  ),
);
StatusDot.displayName = "StatusDot";
