import * as React from "react";

import { cn } from "@/lib/utils";

export type RadioProps = Omit<React.ComponentProps<"input">, "type">;

/** Styled native radio (accent-color). Use a shared `name` to group radios. */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="radio"
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer accent-[color:var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Radio.displayName = "Radio";
