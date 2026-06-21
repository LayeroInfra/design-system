import * as React from "react";

import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  /** Dashed muted variant (e.g. «no items yet» placeholders). */
  dashed?: boolean;
  className?: string;
}

/** Centered empty placeholder: optional icon + title + description + action. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  dashed,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border px-6 py-10 text-center",
        dashed ? "border-dashed border-border bg-muted/40" : "border-border bg-card",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted text-neutral-600">
          {icon}
        </div>
      )}
      <div className="text-base font-medium text-foreground">{title}</div>
      {description && (
        <p className="mx-auto mt-1.5 max-w-md text-sm text-neutral-500">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
