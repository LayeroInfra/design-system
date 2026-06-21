import * as React from "react";

import { cn } from "@/lib/utils";

/** Segmented control — a compact toggle group where one item is active.
 *  Compose with <SegmentedItem>. */
export function Segmented({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex rounded-lg border border-border p-0.5",
        className,
      )}
      {...props}
    />
  );
}

export interface SegmentedItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  /** Optional leading icon. */
  icon?: React.ReactNode;
}

export const SegmentedItem = React.forwardRef<
  HTMLButtonElement,
  SegmentedItemProps
>(({ active, icon, className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="tab"
    aria-selected={active}
    className={cn(
      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition",
      active
        ? "bg-primary font-medium text-primary-foreground"
        : "text-neutral-600 hover:text-neutral-900",
      className,
    )}
    {...props}
  >
    {icon}
    {children}
  </button>
));
SegmentedItem.displayName = "SegmentedItem";
