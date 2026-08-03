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
    {/* Ширина пункта считается по ЖИРНОМУ тексту всегда: активный пункт
        полужирный, и без этой распорки переключение двигало соседей на
        пару пикселей — по такому «дрожанию» и заметно, что контрол
        самодельный. Копия под aria-hidden, читалке она не видна. */}
    <span className="inline-grid">
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 font-medium"
      >
        {children}
      </span>
      <span className="col-start-1 row-start-1">{children}</span>
    </span>
  </button>
));
SegmentedItem.displayName = "SegmentedItem";
