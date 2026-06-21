import * as React from "react";

import { cn } from "@/lib/utils";
import { Cell } from "./cell";

/** Surface container — rounded-2xl, hairline border, card fill. The base for
 *  every panel/card on the platform. */
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-border bg-card", className)}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1 p-5", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-semibold leading-snug text-foreground", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-neutral-500", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 p-5 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export interface CardSectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  /** Muted suffix next to the title, e.g. "за 24ч" / "2 из 5". */
  meta?: React.ReactNode;
  /** Trailing slot — a chevron link, button, etc. */
  action?: React.ReactNode;
  /** Clickable header — adds a full-row hover (e.g. linking to the section). */
  interactive?: boolean;
}

/** Card header row built on Cell — title + muted meta + optional trailing
 *  action (the "Мониторинг · за 24ч · ›" pattern). With `interactive` the whole
 *  row gets a hover, matching list rows. */
export const CardSectionHeader = React.forwardRef<
  HTMLDivElement,
  CardSectionHeaderProps
>(({ title, meta, action, interactive, className, ...props }, ref) => (
  // Wrapper holds the card padding; the inner Cell gets the exact same inset
  // rounded hover as a list/checklist row (12px inset, px-2 py-1.5).
  <div ref={ref} className={cn("px-3 py-2.5", className)} {...props}>
    <Cell
      interactive={interactive}
      className="gap-2"
      title={
        <span className="text-sm font-semibold text-foreground">
          {title}
          {meta && (
            <span className="ml-2 text-xs font-normal text-neutral-500">
              {meta}
            </span>
          )}
        </span>
      }
      trailing={action}
    />
  </div>
));
CardSectionHeader.displayName = "CardSectionHeader";
