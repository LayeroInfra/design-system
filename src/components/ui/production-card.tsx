import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProductionCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Project / production title. */
  name: React.ReactNode;
  /** Header action slot (GitHub button, Open / Publish button). */
  actions?: React.ReactNode;
  /** Left preview area — a screenshot, a <WarmupPanel>, or a placeholder. */
  preview?: React.ReactNode;
  /** Right info column — a labeled stack (Адрес / Домены / Статус / Источник). */
  children?: React.ReactNode;
  /** Bottom action bar (push hint + deploy buttons). */
  footer?: React.ReactNode;
}

/** The production hero card on a project's overview: a header (title + actions)
 *  over a 2-column body — preview on the left, a labeled info stack on the
 *  right. Presentational shell; pass the live preview + info as slots. */
export const ProductionCard = React.forwardRef<
  HTMLDivElement,
  ProductionCardProps
>(({ name, actions, preview, children, footer, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden rounded-xl border border-border bg-card",
      className,
    )}
    {...props}
  >
    <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-3">
      <h2 className="min-w-0 truncate text-[15px] font-semibold tracking-tightish text-foreground">
        {name}
      </h2>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="flex items-center justify-center border-b border-border bg-muted lg:border-b-0 lg:border-r">
        <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden">
          {preview}
        </div>
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </div>
    {footer && (
      <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-3">
        {footer}
      </div>
    )}
  </div>
));
ProductionCard.displayName = "ProductionCard";

/** A labeled field in the ProductionCard info column (eyebrow + value). */
export function ProductionField({
  label,
  children,
  className,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </div>
      {children}
    </div>
  );
}
