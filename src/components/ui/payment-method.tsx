import * as React from "react";

import { cn } from "@/lib/utils";
import { Switch } from "./switch";

export interface PaymentMethodCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  card?: { brand: string; last4: string } | null;
  autopay?: boolean;
  onToggleAutopay?: (v: boolean) => void;
  /** Footer action (attach / detach button). */
  footer?: React.ReactNode;
}

/** Billing payment-method card: card display (or empty state) + autopay toggle
 *  with explanation + footer action. */
export const PaymentMethodCard = React.forwardRef<
  HTMLDivElement,
  PaymentMethodCardProps
>(({ card, autopay, onToggleAutopay, footer, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-border bg-card", className)}
    {...props}
  >
    <div className="p-5 pb-0 text-base font-semibold text-foreground">
      Способ оплаты
    </div>
    <div className="p-5">
      {card ? (
        <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
          <span className="flex h-7 w-10 items-center justify-center rounded bg-neutral-900 text-[10px] font-semibold uppercase text-white">
            {card.brand}
          </span>
          <span className="font-mono text-sm text-foreground">
            •••• {card.last4}
          </span>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-muted px-3 py-4 text-center text-sm text-neutral-500">
          Карта не привязана
        </div>
      )}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-medium text-foreground">Автоплатёж</div>
          <div className="mt-0.5 text-xs text-neutral-500">
            Продлевать подписку автоматически в конце периода.
          </div>
        </div>
        <Switch
          checked={autopay}
          onCheckedChange={onToggleAutopay}
          aria-label="Автоплатёж"
        />
      </div>
    </div>
    {footer && (
      <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
        {footer}
      </div>
    )}
  </div>
));
PaymentMethodCard.displayName = "PaymentMethodCard";
