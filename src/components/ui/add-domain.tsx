import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";

export interface AddDomainCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Helper text under the field. */
  hint?: React.ReactNode;
  /** Trailing action button (defaults handled by the call site). */
  action?: React.ReactNode;
  /** Input props passthrough (value/onChange/placeholder). */
  inputProps?: React.ComponentProps<typeof Input>;
}

/** «Add domain» form card: a domain input + an action button, with an optional
 *  hint below. */
export const AddDomainCard = React.forwardRef<
  HTMLDivElement,
  AddDomainCardProps
>(({ hint, action, inputProps, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-border bg-card p-5", className)}
    {...props}
  >
    <div className="flex items-center gap-2">
      <Input placeholder="example.com" {...inputProps} className={cn("flex-1", inputProps?.className)} />
      {action}
    </div>
    {hint && <p className="mt-2 text-xs text-neutral-500">{hint}</p>}
  </div>
));
AddDomainCard.displayName = "AddDomainCard";
