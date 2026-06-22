import * as React from "react";

import { cn } from "@/lib/utils";

export interface FormCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Section title. */
  title: React.ReactNode;
  /** Muted helper text under the title. */
  description?: React.ReactNode;
  /** Trailing action row, e.g. a "Сохранить" button. Rendered in the footer. */
  footer?: React.ReactNode;
}

/** A settings/section card: header (title + description) + body + optional
 *  footer action row. The "форма с шапкой и действиями" pattern used across
 *  настроек / интеграций / доменов / биллинга. Presentational. */
export const FormCard = React.forwardRef<HTMLDivElement, FormCardProps>(
  ({ title, description, footer, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-2xl border border-border bg-card", className)}
      {...props}
    >
      <div className="p-5 pb-0">
        <div className="text-base font-semibold text-foreground">{title}</div>
        {description && (
          <div className="mt-1 text-sm text-neutral-500">{description}</div>
        )}
      </div>
      <div className="p-5">{children}</div>
      {footer && (
        <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
          {footer}
        </div>
      )}
    </div>
  ),
);
FormCard.displayName = "FormCard";
