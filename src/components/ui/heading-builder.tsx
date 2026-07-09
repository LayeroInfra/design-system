import * as React from "react";

import { cn } from "@/lib/utils";

export interface HeadingBuilderProps {
  /** Page/section title. Accepts nodes so inline suffixes/links are allowed. */
  title: React.ReactNode;
  /** Optional supporting line under the title. */
  description?: React.ReactNode;
  /** Optional controls aligned to the right of the title row (buttons, links…). */
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Page heading molecule: title + optional description, with optional actions
 * pinned to the right of the title row. The single source for page-title size
 * and the title→description rhythm — use it instead of hand-rolling an
 * `<h2>` + `<p>` so every screen stays visually aligned.
 */
export function HeadingBuilder({
  title,
  description,
  actions,
  className,
}: HeadingBuilderProps) {
  return (
    <header className={cn("flex items-start gap-4", className)}>
      {/* The title column takes all remaining width so the actions stay pinned
          to the right; the description then wraps into a narrower block instead
          of pushing the buttons onto their own line. Capped at 3 lines so a long
          description can't grow the header unbounded. */}
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-semibold tracking-tightish">{title}</h2>
        {description && (
          <p
            className={cn(
              "mt-1 text-sm text-neutral-500",
              // Only cap the height when actions share the row — that's when the
              // column narrows and a long description would otherwise wrap
              // unbounded. Without actions it keeps its natural full width.
              actions && "line-clamp-3",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {actions}
        </div>
      )}
    </header>
  );
}
