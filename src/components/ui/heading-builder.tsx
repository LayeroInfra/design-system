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
    <header
      className={cn(
        "flex flex-wrap items-start justify-between gap-3",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-tightish">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      )}
    </header>
  );
}
