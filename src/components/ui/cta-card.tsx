import * as React from "react";

import { cn } from "@/lib/utils";

export interface CtaCardProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Visual/preview area at the bottom of the card. */
  preview?: React.ReactNode;
  /** Shorter height — for denser grids. */
  compact?: boolean;
}

/** Tall call-to-action tile with a hover lift + reveal arrow — the "add project"
 *  entry cards (upload folder / import repo / CLI / MCP). */
export const CtaCard = React.forwardRef<HTMLButtonElement, CtaCardProps>(
  ({ title, description, preview, compact, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_1px_2px_rgba(20,20,19,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_44px_-14px_rgba(20,20,19,0.18)]",
        compact ? "h-56" : "h-64",
        className,
      )}
      {...props}
    >
      <div className="px-5 pt-5">
        <h3 className="flex items-center gap-1 text-base font-semibold text-foreground">
          {title}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 -translate-x-1 text-neutral-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </h3>
        {description && (
          <p className="mt-1.5 text-sm leading-snug text-neutral-500">
            {description}
          </p>
        )}
      </div>
      {preview && (
        <div className="relative mx-5 mt-4 flex-1 overflow-hidden">{preview}</div>
      )}
    </button>
  ),
);
CtaCard.displayName = "CtaCard";
