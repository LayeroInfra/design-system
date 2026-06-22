import * as React from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export interface DiscountBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Days remaining in the offer window. */
  daysLeft?: number;
  /** Promo code shown with a copy button. */
  code?: string;
}

/** Promotional discount banner — a tinted gradient card with a heading,
 *  description, days-left countdown and a copyable promo code. */
export const DiscountBanner = React.forwardRef<
  HTMLDivElement,
  DiscountBannerProps
>(({ title, description, daysLeft, code, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-success-200 bg-gradient-to-br from-success-50 to-info-50 p-6 dark:border-success-900/50 dark:from-success-950 dark:to-info-950/40",
      className,
    )}
    {...props}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="text-lg font-semibold text-foreground">{title}</div>
        {description && (
          <p className="mt-1 max-w-md text-sm text-neutral-600">{description}</p>
        )}
      </div>
      {daysLeft != null && (
        <div className="shrink-0 text-right">
          <div className="text-2xl font-semibold tracking-tightish text-foreground">
            {daysLeft}
          </div>
          <div className="text-[11px] uppercase tracking-wide text-neutral-500">
            дней
          </div>
        </div>
      )}
    </div>
    {code && (
      <div className="mt-4 flex items-center gap-2">
        <code className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-sm text-foreground">
          {code}
        </code>
        <CopyButton
          value={code}
          label="Скопировать"
          className="border-transparent px-2 py-1.5 text-sm"
        />
      </div>
    )}
  </div>
));
DiscountBanner.displayName = "DiscountBanner";
