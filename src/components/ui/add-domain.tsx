import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";

export interface AddDomainCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Helper / error text under the field. */
  hint?: React.ReactNode;
  /** Trailing submit button (defaults handled by the call site). */
  action?: React.ReactNode;
  /** Input props passthrough (value/onChange/placeholder). */
  inputProps?: React.ComponentProps<typeof Input>;
}

/** «Add domain» form card: an eyebrow label + a mono domain input + a submit
 *  button, with an optional hint below. */
export const AddDomainCard = React.forwardRef<
  HTMLDivElement,
  AddDomainCardProps
>(({ hint, action, inputProps, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2 rounded-xl border border-border bg-card p-4", className)}
    {...props}
  >
    <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
      Добавить домен
    </div>
    <div className="flex flex-col gap-2 sm:flex-row">
      <Input
        placeholder="mysite.ru или shop.mysite.ru"
        autoComplete="off"
        spellCheck={false}
        {...inputProps}
        className={cn("flex-1 font-mono", inputProps?.className)}
      />
      {action}
    </div>
    {hint && <p className="text-xs text-neutral-500">{hint}</p>}
  </div>
));
AddDomainCard.displayName = "AddDomainCard";
