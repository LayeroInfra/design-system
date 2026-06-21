import * as React from "react";

import { cn } from "@/lib/utils";

export const Checklist = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("space-y-3", className)} {...props} />
));
Checklist.displayName = "Checklist";

export interface ChecklistItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  done?: boolean;
}

/** A single checklist row — filled success circle + struck-through label when
 *  done, hollow circle otherwise. */
export const ChecklistItem = React.forwardRef<
  HTMLLIElement,
  ChecklistItemProps
>(({ done, className, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("flex items-center gap-3 text-[15px]", className)}
    {...props}
  >
    {done ? (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-500 text-white [&_svg]:h-3 [&_svg]:w-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    ) : (
      <span className="h-5 w-5 shrink-0 rounded-full border-2 border-neutral-300" />
    )}
    <span className={cn(done && "text-neutral-400 line-through")}>{children}</span>
  </li>
));
ChecklistItem.displayName = "ChecklistItem";
