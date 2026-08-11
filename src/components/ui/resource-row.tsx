import * as React from "react";

import { cn } from "@/lib/utils";

// `title` у нас — ReactNode (имя с бейджем рядом), а у div это строка
// подсказки браузера. Исключаем, чтобы не подменять смысл атрибута.
export interface ResourceRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Technical identity under the name — a db name, a host, an id. */
  subtitle?: React.ReactNode;
  /** Where the thing lives: our platform, a partner, the user's own server. */
  origin?: React.ReactNode;
  /** Facts that decide whether it needs attention — usage, counts, status. */
  facts?: React.ReactNode;
  action?: React.ReactNode;
  onOpen?: () => void;
}

/**
 * One provisioned resource in a list — a database, a queue, a bucket.
 *
 * Built around the two questions a list of resources has to answer at a
 * glance: what is this, and whose is it. The origin slot is deliberately
 * separate from the title: once a list mixes resources we run with resources
 * someone else runs, "whose" stops being decoration and starts deciding what
 * the reader may expect from the thing.
 */
export const ResourceRow = React.forwardRef<HTMLDivElement, ResourceRowProps>(
  ({ icon, title, subtitle, origin, facts, action, onOpen, className, ...props }, ref) => {
    const interactive = typeof onOpen === "function";
    return (
      <div
        ref={ref}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={onOpen}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen?.();
                }
              }
            : undefined
        }
        className={cn(
          "flex items-center gap-3 px-4 py-3 transition",
          interactive &&
            "cursor-pointer hover:bg-overlay/60 focus-visible:bg-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0 text-neutral-400">{icon}</span>}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium">{title}</span>
            {origin}
          </div>
          {subtitle && (
            <span className="mt-0.5 block truncate font-mono text-[11px] text-neutral-500">
              {subtitle}
            </span>
          )}
        </div>
        {facts && (
          <div className="hidden shrink-0 items-center gap-4 text-[11px] tabular-nums text-neutral-500 sm:flex">
            {facts}
          </div>
        )}
        {action}
      </div>
    );
  },
);
ResourceRow.displayName = "ResourceRow";
