import * as React from "react";

import { cn } from "@/lib/utils";

/** Filled system-green circle with a check — the success glyph from the spec.
 *  White check on light, dark-green check on the dark fill. */
function SuccessIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white dark:text-green-950">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export interface InformerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  /** Override the leading icon. Defaults to the success check. */
  icon?: React.ReactNode;
  /** Footer row — typically <InformerAction> buttons. */
  actions?: React.ReactNode;
  /** When provided, renders a top-right dismiss button. */
  onDismiss?: () => void;
}

/** Success informer: pale-green fill (solid dark-green in dark mode), neutral
 *  title, muted body, system-green check icon, optional action pills + close.
 *  Matches the design spec for light and dark themes. */
export function Informer({
  title,
  icon,
  actions,
  onDismiss,
  className,
  children,
  ...props
}: InformerProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-green-50 px-4 py-4 dark:bg-green-950 sm:px-5",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon ?? <SuccessIcon />}
        <div className="min-w-0 flex-1">
          {title && (
            <div className="text-base font-semibold leading-snug text-[color:var(--ink)]">
              {title}
            </div>
          )}
          {children && (
            <div
              className={cn(
                "text-sm leading-relaxed text-neutral-500",
                title && "mt-1",
              )}
            >
              {children}
            </div>
          )}
          {actions && (
            <div className="mt-3 flex flex-wrap gap-2">{actions}</div>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Закрыть"
            className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-neutral-400 transition hover:text-neutral-600"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/** Pill button styled for use inside an Informer's `actions` row. */
export function InformerAction({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center rounded-lg bg-green-100 px-3.5 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-green-200 dark:bg-green-900/50 dark:text-white dark:hover:bg-green-900",
        className,
      )}
      {...props}
    />
  );
}
