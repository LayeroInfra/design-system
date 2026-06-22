import * as React from "react";

import { cn } from "@/lib/utils";

export type DomainStage =
  | "needs-dns"
  | "checking"
  | "issuing"
  | "live"
  | "failed";

const STAGE: Record<DomainStage, { dot: string; label: string }> = {
  "needs-dns": { dot: "bg-neutral-400", label: "Нужны DNS-записи" },
  checking: { dot: "bg-warning-500", label: "Проверка DNS" },
  issuing: { dot: "bg-warning-500", label: "Выпуск сертификата" },
  live: { dot: "bg-success-500", label: "Активен" },
  failed: { dot: "bg-negative-500", label: "Ошибка" },
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
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-neutral-600">
            <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
            {s.label}
          </span>
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
