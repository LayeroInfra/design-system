import * as React from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export interface BranchRowProps extends React.HTMLAttributes<HTMLLIElement> {
  name: React.ReactNode;
  /** Deployed host (mono). */
  host: string;
  /** Full URL for the open link + copy (defaults to https://{host}/). */
  url?: string;
  /** Marks the production branch — shows a small tag. */
  production?: boolean;
}

/** A compact branch row for the branches popover: name + production tag, then a
 *  host link with copy / open actions. */
export const BranchRow = React.forwardRef<HTMLLIElement, BranchRowProps>(
  ({ name, host, url, production, className, ...props }, ref) => {
    const href = url ?? `https://${host}/`;
    return (
      <li ref={ref} className={cn("p-2.5 text-xs", className)} {...props}>
        <div className="mb-1 flex items-center gap-1.5">
          <span className="truncate font-mono font-medium text-foreground">{name}</span>
          {production && (
            <span className="rounded bg-success-50 px-1 py-px text-[10px] font-medium text-success-700 dark:bg-success-950/40 dark:text-success-300">
              production
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate font-mono text-[11px] text-neutral-500 hover:text-foreground"
          >
            {host}
          </a>
          <CopyButton value={href} />
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-neutral-600 transition hover:bg-overlay"
          >
            Open
          </a>
        </div>
      </li>
    );
  },
);
BranchRow.displayName = "BranchRow";
