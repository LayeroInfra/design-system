import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "./badge";

const BranchGlyph = ({ className }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("block", className)}
    aria-hidden="true"
  >
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const CommitGlyph = ({ className }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("block", className)}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <line x1="3" y1="12" x2="9" y2="12" />
    <line x1="15" y1="12" x2="21" y2="12" />
  </svg>
);

export interface DeployRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Status dot colour class (e.g. "bg-success-500") + a label node. */
  status?: { dot: string; label: React.ReactNode };
  /** Build duration, shown in mono under the status. */
  duration?: React.ReactNode;
  /** Git branch name, shown in mono. */
  branch: React.ReactNode;
  /** Environment tag — tiny uppercase suffix next to the branch. */
  env?: "Production" | "Preview";
  /** Short commit SHA, shown in mono. */
  commitSha?: string;
  /** Commit message. */
  commitMessage?: React.ReactNode;
  /** Relative time, e.g. "6 мин назад". */
  timeAgo?: React.ReactNode;
  /** Source label, e.g. "git push". */
  source?: React.ReactNode;
  /** Marks the active production deploy — shows the "Активный" badge. */
  active?: boolean;
  /** Trailing kebab / action slot, pinned top-right. */
  action?: React.ReactNode;
}

/** A single deployment row: status dot + duration · branch + commit · time +
 *  source, with an optional kebab action pinned top-right. Presentational —
 *  drop into an `<ul>` (it renders a self-contained card-like `<div>`). */
export const DeployRow = React.forwardRef<HTMLDivElement, DeployRowProps>(
  (
    {
      status,
      duration,
      branch,
      env,
      commitSha,
      commitMessage,
      timeAgo,
      source,
      active,
      action,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
      {...props}
    >
      <div className="relative px-5 py-4 transition-colors hover:bg-overlay">
        {action && (
          <div className="absolute right-3 top-3">{action}</div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
          {/* Status — label on row 1, build duration on row 2 */}
          <div className="flex flex-col gap-1 pr-12 sm:w-[120px] sm:shrink-0 sm:pr-0">
            <div className="flex items-center gap-2 text-sm">
              {status && (
                <span
                  className={cn(
                    "inline-block h-2 w-2 shrink-0 rounded-full",
                    status.dot,
                  )}
                />
              )}
              {status && (
                <span className="font-medium text-foreground">
                  {status.label}
                </span>
              )}
            </div>
            {duration && (
              <div className="ml-4 font-mono text-sm text-neutral-600">
                {duration}
              </div>
            )}
          </div>

          {/* Source: branch + commit */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <BranchGlyph className="shrink-0 text-neutral-400" />
              <span className="truncate font-mono text-neutral-600">
                {branch}
              </span>
              {env && (
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-400">
                  {env}
                </span>
              )}
              {active && <Badge variant="success">Активный</Badge>}
            </div>
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <CommitGlyph className="shrink-0 text-neutral-400" />
              {commitSha && (
                <span className="shrink-0 font-mono text-neutral-600">
                  {commitSha}
                </span>
              )}
              <span className="truncate text-neutral-600">
                {commitMessage ?? "—"}
              </span>
            </div>
          </div>

          {/* Time + source (right side, next to kebab) */}
          <div className="flex flex-col gap-1 text-sm sm:w-[140px] sm:shrink-0 sm:pr-12 sm:text-right">
            {timeAgo && <span className="text-neutral-600">{timeAgo}</span>}
            {source && <span className="text-neutral-400">{source}</span>}
          </div>
        </div>
      </div>
    </div>
  ),
);
DeployRow.displayName = "DeployRow";
