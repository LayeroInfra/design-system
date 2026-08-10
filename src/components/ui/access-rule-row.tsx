import * as React from "react";

import { cn } from "@/lib/utils";

export type AccessRuleTone = "neutral" | "negative";

export interface AccessRuleRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Address or network — always monospace, it is copied and compared by eye. */
  value: React.ReactNode;
  /** Free-form note: what this address is and whether it can go away. */
  comment?: React.ReactNode;
  /** Right-hand facts — expiry, strike count, last seen. */
  meta?: React.ReactNode;
  tone?: AccessRuleTone;
  action?: React.ReactNode;
}

/**
 * A single entry in an address list — an allowlist rule or a ban.
 *
 * Both are the same shape on purpose: an address, a human note about why it is
 * there, and the fact that decides whether it stays (expiry for a rule,
 * remaining ban time for a ban). One component keeps the two lists visually
 * comparable, which is what makes the page readable at a glance.
 */
export const AccessRuleRow = React.forwardRef<HTMLDivElement, AccessRuleRowProps>(
  ({ value, comment, meta, tone = "neutral", action, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 px-4 py-2.5", className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate font-mono text-xs",
            tone === "negative" && "text-negative-600 dark:text-negative-400",
          )}
        >
          {value}
        </span>
        {comment && (
          <span className="mt-0.5 block truncate text-[11px] text-neutral-500">
            {comment}
          </span>
        )}
      </div>
      {meta && (
        <span className="shrink-0 whitespace-nowrap text-[11px] tabular-nums text-neutral-400">
          {meta}
        </span>
      )}
      {action}
    </div>
  ),
);
AccessRuleRow.displayName = "AccessRuleRow";
