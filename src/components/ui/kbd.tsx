import * as React from "react";

import { cn } from "@/lib/utils";

/** Keyboard key hint (⌘K, Esc, …). */
export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[11px] leading-none text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
