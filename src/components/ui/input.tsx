import * as React from "react";

import { cn } from "@/lib/utils";

const SearchGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export interface InputProps extends React.ComponentProps<"input"> {
  /** Error state — red border/ring and aria-invalid. */
  invalid?: boolean;
  /** Leading icon inside the field (adds left padding). */
  icon?: React.ReactNode;
  /** Shorthand for the search variant — leading magnifier icon. */
  search?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, icon, search, ...props }, ref) => {
    const lead = icon ?? (search ? SearchGlyph : null);
    const field = (
      <input
        type={type ?? (search ? "search" : undefined)}
        aria-invalid={invalid || undefined}
        className={cn(
          // text-base on mobile (≥16px) stops iOS from zooming the viewport
          // when the field is focused; text-sm from sm: up.
          "flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-base sm:text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-neutral-900/10 disabled:cursor-not-allowed disabled:opacity-50",
          lead && "pl-9",
          invalid &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
    if (!lead) return field;
    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
          {lead}
        </span>
        {field}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
