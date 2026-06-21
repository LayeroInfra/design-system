import * as React from "react";

import { cn } from "@/lib/utils";

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
}

/** Card header row with a title, a muted meta suffix and an optional trailing
 *  action (the "Мониторинг · за 24ч · ›" pattern). */
export const CardSectionHeader = React.forwardRef<
  HTMLDivElement,
  CardSectionHeaderProps
>(({ title, meta, action, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between gap-3 p-5", className)}
    {...props}
  >
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-semibold text-foreground">{title}</span>
      {meta && <span className="text-sm text-neutral-400">{meta}</span>}
    </div>
    {action}
  </div>
));
CardSectionHeader.displayName = "CardSectionHeader";
