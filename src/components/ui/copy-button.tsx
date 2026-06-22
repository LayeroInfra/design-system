import * as React from "react";

import { cn } from "@/lib/utils";

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Text copied to the clipboard. */
  value: string;
  /** Idle label (default "Copy"). Shows a check for ~1.5s after copying. */
  label?: React.ReactNode;
}

/** Small copy-to-clipboard button with a transient ✓ confirmation. */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, label = "Copy", className, onClick, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard?.writeText(value).then(
        () => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        },
        () => {},
      );
      onClick?.(e);
    };
    return (
      <button
        ref={ref}
        type="button"
        onClick={handle}
        aria-label="Скопировать"
        className={cn(
          "rounded-md border border-border px-1.5 py-0.5 text-[10px] text-neutral-600 transition hover:bg-overlay",
          className,
        )}
        {...props}
      >
        {copied ? "✓" : label}
      </button>
    );
  },
);
CopyButton.displayName = "CopyButton";
