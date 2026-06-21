import * as React from "react";

import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  /** Accent line. Optional — omit for a single muted message (description). */
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  /** Dashed muted variant (e.g. «no items yet» placeholders). */
  dashed?: boolean;
  /** Visual frame. `plain` drops the border/fill — for embedding inside a Card. */
  variant?: "default" | "plain";
  className?: string;
}

/** Centered empty placeholder: optional icon + title + description + action. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  dashed,
  variant = "default",
  className,
}: EmptyStateProps) {
  const framed = variant !== "plain";
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        framed
          ? cn(
              "rounded-xl border px-6 py-10",
              dashed
                ? "border-dashed border-border bg-muted/40"
                : "border-border bg-card",
            )
          : "py-4",
        className,
      )}
    >
      {icon && (
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted text-neutral-600">
          {icon}
        </div>
      )}
      {title && (
        <div className="text-base font-medium text-foreground">{title}</div>
      )}
      {description && (
        <p
          className={cn(
            "mx-auto max-w-[240px] text-sm text-neutral-500",
            title && "mt-1.5",
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
