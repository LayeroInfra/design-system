import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { StatusDot, type StatusTone } from "./status-dot";

export interface BranchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Deployed URL shown in mono. */
  url?: string;
  /** Status dot colour. */
  status?: "ready" | "building" | "error" | "idle";
  /** Footer status label, e.g. "Готов". */
  statusLabel?: string;
  /** Relative time, e.g. "6 мин назад". */
  timestamp?: string;
  /** Show the PRODUCTION badge. */
  production?: boolean;
}

const TONE: Record<NonNullable<BranchCardProps["status"]>, StatusTone> = {
  ready: "success",
  building: "warning",
  error: "negative",
  idle: "neutral",
};

/** A git branch / deployment row: status dot + name + PRODUCTION badge, the
 *  deployed URL, and a status · time footer. */
export const BranchCard = React.forwardRef<HTMLDivElement, BranchCardProps>(
  (
    { name, url, status = "ready", statusLabel, timestamp, production, className, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-border bg-card p-4", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <StatusDot tone={TONE[status]} dotClassName="h-2 w-2" />
        <span className="truncate font-medium text-foreground">{name}</span>
        {production && (
          <Badge variant="secondary" className="ml-auto shrink-0">
            PRODUCTION
          </Badge>
        )}
      </div>
      {url && (
        <div className="mt-1.5 truncate font-mono text-xs text-neutral-500">
          {url}
        </div>
      )}
      {(statusLabel || timestamp) && (
        <div className="mt-1.5 text-xs text-neutral-400">
          {[statusLabel, timestamp].filter(Boolean).join(" · ")}
        </div>
      )}
    </div>
  ),
);
BranchCard.displayName = "BranchCard";
