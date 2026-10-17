import * as React from "react";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<React.ComponentProps<"input">, "type">;

/** Native input keeps form, keyboard and indeterminate behavior. */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <span className={cn("relative inline-flex h-4 w-4 shrink-0 align-middle has-[:disabled]:opacity-40", className)}>
      <input
        ref={ref}
        type="checkbox"
        className="peer m-0 h-full w-full cursor-pointer appearance-none rounded border border-input bg-card shadow-sm transition-all duration-200 ease-out hover:border-neutral-400 checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed aria-[invalid=true]:border-negative-500 motion-reduce:transition-none"
        {...props}
      />
      <Check aria-hidden="true" strokeWidth={3} className="pointer-events-none absolute inset-0 m-auto h-3 w-3 scale-75 text-primary-foreground opacity-0 transition-all duration-200 ease-out peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:opacity-0 motion-reduce:transition-none" />
      <Minus aria-hidden="true" strokeWidth={3} className="pointer-events-none absolute inset-0 m-auto h-3 w-3 scale-75 text-primary-foreground opacity-0 transition-all duration-200 ease-out peer-indeterminate:scale-100 peer-indeterminate:opacity-100 motion-reduce:transition-none" />
    </span>
  ),
);
Checkbox.displayName = "Checkbox";
