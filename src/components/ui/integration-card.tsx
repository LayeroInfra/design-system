import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface IntegrationCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Shows a «Подключено» badge when true. */
  connected?: boolean;
  /** Optional unavailable/notice banner under the header. */
  unavailable?: React.ReactNode;
  /** Setup / config area. */
  children?: React.ReactNode;
  /** Footer action buttons row. */
  footer?: React.ReactNode;
}

/** Integration card: icon + title/description + status badge, optional notice
 *  banner, a setup body and a footer action row. */
export const IntegrationCard = React.forwardRef<
  HTMLDivElement,
  IntegrationCardProps
>(({ icon, title, description, connected, unavailable, children, footer, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-border bg-card", className)}
    {...props}
  >
    <div className="flex items-start gap-3 p-5">
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-neutral-600">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">{title}</span>
          {connected && <Badge variant="success">Подключено</Badge>}
        </div>
        {description && (
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        )}
      </div>
    </div>
    {unavailable && (
      <div className="mx-5 mb-1 rounded-lg bg-muted/40 px-3 py-2 text-sm text-neutral-600">
        {unavailable}
      </div>
    )}
    {children && <div className="px-5 pb-5">{children}</div>}
    {footer && (
      <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
        {footer}
      </div>
    )}
  </div>
));
IntegrationCard.displayName = "IntegrationCard";
