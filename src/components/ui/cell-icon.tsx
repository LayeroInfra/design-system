import * as React from "react";

import { cn } from "@/lib/utils";

export interface CellIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "muted" | "plain";
  /** Large tiles are reserved for empty states and summaries. */
  size?: "default" | "large";
}

/** Cell leading icon. The same 36/18 dimensions apply to every surface color. */
export const CellIcon = React.forwardRef<HTMLSpanElement, CellIconProps>(
  ({ tone = "muted", size = "default", className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="cell-icon"
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 place-items-center border border-border",
        size === "large"
          ? "size-[var(--cell-icon-large-size)] rounded-xl [&_svg]:size-[var(--cell-icon-large-glyph-size)] [&_img]:max-h-[var(--cell-icon-large-glyph-size)] [&_img]:max-w-[var(--cell-icon-large-glyph-size)]"
          : "size-[var(--cell-icon-size)] rounded-lg [&_svg]:size-[var(--cell-icon-glyph-size)] [&_img]:max-h-[var(--cell-icon-glyph-size)] [&_img]:max-w-[var(--cell-icon-glyph-size)]",
        tone === "plain" ? "bg-card text-foreground" : "bg-muted text-neutral-600",
        className,
      )}
      {...props}
    />
  ),
);
CellIcon.displayName = "CellIcon";
