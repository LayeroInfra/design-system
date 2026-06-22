import * as React from "react";

import { cn } from "@/lib/utils";
import { StatusDot, type StatusTone } from "./status-dot";

export type DomainStage =
  | "needs-dns"
  | "checking"
  | "issuing"
  | "live"
  | "failed";

const STAGE: Record<DomainStage, { tone: StatusTone; label: string }> = {
  "needs-dns": { tone: "neutral", label: "Нужны DNS-записи" },
  checking: { tone: "warning", label: "Проверка DNS" },
  issuing: { tone: "warning", label: "Выпуск сертификата" },
  live: { tone: "success", label: "Активен" },
  failed: { tone: "negative", label: "Ошибка" },
};

export interface DnsRecord {
  type: string;
  name: string;
  value: string;
}

export interface DomainCardProps extends React.HTMLAttributes<HTMLDivElement> {
  domain: React.ReactNode;
  stage?: DomainStage;
  /** DNS records to add, shown as a mono table. */
  records?: DnsRecord[];
  /** Footer action buttons (Verify / Change / Delete). */
  footer?: React.ReactNode;
}

/** Domain status card: domain + stage indicator, optional DNS-records table and
 *  a footer action row. */
export const DomainCard = React.forwardRef<HTMLDivElement, DomainCardProps>(
  ({ domain, stage = "needs-dns", records, footer, className, ...props }, ref) => {
    const s = STAGE[stage];
    return (
      <div
        ref={ref}
        className={cn("rounded-2xl border border-border bg-card", className)}
        {...props}
      >
        <div className="flex items-center justify-between gap-3 p-5 pb-3">
          <span className="truncate font-mono text-sm font-medium text-foreground">
            {domain}
          </span>
          <StatusDot tone={s.tone} className="shrink-0">
            {s.label}
          </StatusDot>
        </div>
        {records && records.length > 0 && (
          <div className="mx-5 mb-3 overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-[auto_1fr_1.4fr] gap-x-4 bg-muted/40 px-3 py-1.5 text-[11px] uppercase tracking-wide text-neutral-400">
              <span>Тип</span>
              <span>Имя</span>
              <span>Значение</span>
            </div>
            {records.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_1fr_1.4fr] gap-x-4 border-t border-border px-3 py-1.5 font-mono text-xs text-neutral-600"
              >
                <span>{r.type}</span>
                <span className="truncate">{r.name}</span>
                <span className="truncate">{r.value}</span>
              </div>
            ))}
          </div>
        )}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
DomainCard.displayName = "DomainCard";
