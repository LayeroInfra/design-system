import * as React from "react";

import { cn } from "@/lib/utils";

export interface PaymentHistoryItem {
  label: React.ReactNode;
  date: React.ReactNode;
  amount: React.ReactNode;
  status?: React.ReactNode;
}

export interface PaymentHistoryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: PaymentHistoryItem[];
}

/** Billing payment-history list: label + date on the left, amount + status on
 *  the right, divided rows. */
export const PaymentHistory = React.forwardRef<
  HTMLDivElement,
  PaymentHistoryProps
>(({ items, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-border bg-card", className)}
    {...props}
  >
    <div className="p-5 pb-3 text-base font-semibold text-foreground">
      История платежей
    </div>
    <div className="divide-y divide-border px-5 pb-2">
      {items.length === 0 && (
        <div className="py-4 text-sm text-neutral-500">Платежей пока нет</div>
      )}
      {items.map((it, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm text-foreground">{it.label}</div>
            <div className="mt-0.5 text-xs text-neutral-500">{it.date}</div>
          </div>
          <div className="flex items-center gap-3 text-right">
            {it.status}
            <span className="font-mono text-sm text-foreground">{it.amount}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
));
PaymentHistory.displayName = "PaymentHistory";
