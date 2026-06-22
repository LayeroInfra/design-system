import * as React from "react";

import { cn } from "@/lib/utils";
import { StatusDot, type StatusTone } from "./status-dot";

export type DomainStage =
  | "needs_dns"
  | "checking"
  | "issuing"
  | "live"
  | "failed";

const STAGE: Record<DomainStage, { tone: StatusTone; headline: string }> = {
  needs_dns: { tone: "warning", headline: "Ждём DNS-записи" },
  checking: { tone: "warning", headline: "Проверяем DNS" },
  issuing: { tone: "warning", headline: "Выпускаем сертификат" },
  failed: { tone: "negative", headline: "Не удалось подключить" },
  live: { tone: "success", headline: "Работает" },
};

export interface DnsRecord {
  type: string;
  name: string;
  value: string;
}

export interface DomainCardProps extends React.HTMLAttributes<HTMLDivElement> {
  domain: React.ReactNode;
  stage?: DomainStage;
  /** Header actions (Проверить / Изменить). */
  action?: React.ReactNode;
  /** DNS records to add (shown in an expandable area). */
  records?: DnsRecord[];
}

/** Domain card: header with a status dot + domain (mono) + stage headline and
 *  Проверить / Изменить actions; optional DNS-records table below. */
export const DomainCard = React.forwardRef<HTMLDivElement, DomainCardProps>(
  ({ domain, stage = "needs_dns", action, records, className, ...props }, ref) => {
    const s = STAGE[stage];
    const hasBody = !!records?.length;
    return (
      <div
        ref={ref}
        className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}
        {...props}
      >
        <header
          className={cn(
            "flex flex-wrap items-center gap-3 px-5 py-4",
            hasBody && "border-b border-border",
          )}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <StatusDot tone={s.tone} dotClassName="h-2 w-2" />
              <span className="truncate font-mono text-sm font-medium text-foreground">
                {domain}
              </span>
            </div>
            <div className="mt-1 text-xs text-neutral-500">{s.headline}</div>
          </div>
          {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
        </header>
        {hasBody && (
          <div className="overflow-hidden px-5 py-4">
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-[auto_1fr_1.4fr] gap-x-4 bg-muted px-3 py-1.5 text-[11px] uppercase tracking-wide text-neutral-400">
                <span>Тип</span>
                <span>Имя</span>
                <span>Значение</span>
              </div>
              {records!.map((r, i) => (
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
          </div>
        )}
      </div>
    );
  },
);
DomainCard.displayName = "DomainCard";
