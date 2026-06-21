import * as React from "react";

import { cn } from "@/lib/utils";

export interface Crumb {
  label: React.ReactNode;
  href?: string;
}

/** Breadcrumb trail; the last item renders as the current (non-link) page. */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="breadcrumb" className={cn("flex items-center gap-1.5 text-sm", className)}>
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {c.href && !last ? (
              <a href={c.href} className="text-muted-foreground transition hover:text-foreground">
                {c.label}
              </a>
            ) : (
              <span className={last ? "font-medium text-foreground" : "text-muted-foreground"} aria-current={last ? "page" : undefined}>
                {c.label}
              </span>
            )}
            {!last && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            )}
          </span>
        );
      })}
    </nav>
  );
}
