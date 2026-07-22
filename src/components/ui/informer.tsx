import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export type InformerTone = "success" | "warning" | "danger" | "info";

const TONE: Record<
  InformerTone,
  { box: string; badge: string; action: string; glyph: React.ReactNode }
> = {
  success: {
    box: "bg-success-50 dark:bg-success-950",
    badge: "bg-success-500 text-white dark:text-success-950",
    action: "bg-success-100 hover:bg-success-200 dark:bg-success-900/50 dark:text-white dark:hover:bg-success-900",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  warning: {
    box: "bg-warning-50 dark:bg-warning-950/40",
    badge: "bg-warning-500 text-white dark:text-warning-950",
    action: "bg-warning-100 hover:bg-warning-200 dark:bg-warning-900/50 dark:text-white dark:hover:bg-warning-900",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      </svg>
    ),
  },
  danger: {
    box: "bg-negative-50 dark:bg-negative-950/40",
    badge: "bg-negative-500 text-white",
    action: "bg-negative-100 hover:bg-negative-200 dark:bg-negative-900/50 dark:text-white dark:hover:bg-negative-900",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    ),
  },
  info: {
    box: "bg-info-50 dark:bg-info-950/40",
    badge: "bg-info-500 text-white",
    action: "bg-info-100 hover:bg-info-200 dark:bg-info-900/50 dark:text-white dark:hover:bg-info-900",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 11v5M12 8h.01" />
      </svg>
    ),
  },
};

/** Тон текущего информера — чтобы вложенные <InformerAction> красились в его
 *  палитру, а не в захардкоженную. Значение по умолчанию совпадает с
 *  дефолтом Informer, поэтому отдельно стоящая кнопка не ломается. */
const InformerToneContext = React.createContext<InformerTone>("success");

export interface InformerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Semantic tone — sets fill + icon. Defaults to success. */
  tone?: InformerTone;
  title?: React.ReactNode;
  /** Override the leading icon. Defaults to the tone glyph. */
  icon?: React.ReactNode;
  /** Footer row — typically <InformerAction> buttons. */
  actions?: React.ReactNode;
  /** When provided, renders a top-right dismiss button. */
  onDismiss?: () => void;
}

/** Inline notice: tinted fill (solid in dark mode), neutral title, muted body,
 *  a tone icon, optional action pills + close. Works in light and dark themes. */
export function Informer({
  tone = "success",
  title,
  icon,
  actions,
  onDismiss,
  className,
  children,
  ...props
}: InformerProps) {
  const t = TONE[tone];
  return (
    <InformerToneContext.Provider value={tone}>
    <div
      className={cn("relative rounded-2xl px-4 py-4 sm:px-5", t.box, className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon ?? (
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full [&_svg]:h-3 [&_svg]:w-3",
              t.badge,
            )}
          >
            {t.glyph}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {title && (
            <div className="text-base font-semibold leading-snug text-foreground">
              {title}
            </div>
          )}
          {children && (
            <div
              className={cn(
                "text-sm leading-relaxed text-neutral-500",
                title && "mt-1",
              )}
            >
              {children}
            </div>
          )}
          {actions && (
            <div className="mt-3 flex flex-wrap gap-2">{actions}</div>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Закрыть"
            className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-neutral-400 transition hover:text-neutral-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
      </div>
    </div>
    </InformerToneContext.Provider>
  );
}

/** Pill button styled for use inside an Informer's `actions` row. Красится по
 *  тону родительского информера. */
export function InformerAction({
  className,
  asChild = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Отрендерить дочерний элемент вместо <button> — например <a> или <Link>. */
  asChild?: boolean;
}) {
  const tone = React.useContext(InformerToneContext);
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(
        "inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-semibold text-foreground transition",
        TONE[tone].action,
        className,
      )}
      {...props}
    />
  );
}
