import * as React from "react";

import { cn } from "@/lib/utils";

export const Checklist = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-col gap-0.5", className)} {...props} />
));
Checklist.displayName = "Checklist";

export interface ChecklistItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  done?: boolean;
  /** Adds a hover background — use when the row is clickable (links to a step). */
  interactive?: boolean;
}

/** A single checklist row — filled success circle + struck-through label when
 *  done, hollow circle otherwise. `interactive` adds a hover affordance. */
export const ChecklistItem = React.forwardRef<
  HTMLLIElement,
  ChecklistItemProps
>(({ done, interactive, className, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm",
      interactive && "-mx-2 cursor-pointer transition hover:bg-secondary",
      className,
    )}
    {...props}
  >
    {done ? (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-success-500 bg-success-500 text-white [&_svg]:h-2.5 [&_svg]:w-2.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    ) : (
      <span className="h-4 w-4 shrink-0 rounded-full border border-neutral-300" />
    )}
    <span className={cn(done && "text-neutral-400 line-through")}>{children}</span>
  </li>
));
ChecklistItem.displayName = "ChecklistItem";
